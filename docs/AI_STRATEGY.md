# Nunya Aide

Assistant d’apprentissage par IA open source, en place depuis la version 5.4.0. Il aide l’élève à comprendre une notion floue, reformule une leçon, donne un autre exemple et des indices pour les exercices, sans donner la solution complète.

## Fonctionnement

1. Le site ouvre une **session anonyme Supabase** au premier message : aucun nom, e-mail ni numéro n’est demandé. La session reste sur l’appareil (`localStorage`, clé `nunya-aide-session`), hors de la sauvegarde de progression.
2. Le site envoie la question à la fonction **`nunya-aide`** (Supabase Edge Function, `supabase/functions/nunya-aide/`), avec si l’élève le veut le contexte de la page : extrait de la leçon, consigne de l’exercice, code de l’élève et nombre de tentatives. Les pages personnelles (profil, progression, portfolio, révision…) ne sont jamais envoyées.
3. La fonction vérifie la session auprès de Supabase Auth, réserve une question (`reserve_ai_request_for`, rôle serveur uniquement), puis interroge le fournisseur.
4. **Fournisseur : Groq**, offre gratuite, **modèles à poids ouverts** `openai/gpt-oss-120b` puis `openai/gpt-oss-20b` en secours (licence Apache 2.0). Le fournisseur est compatible OpenAI : on peut passer à un autre modèle ouvert (Qwen, DeepSeek, Kimi…) ou un autre hébergeur en changeant les secrets, sans toucher au site.
5. Si aucun modèle ne répond, la question est rendue à l’élève (`release_ai_request_for`).

Nunya n’enregistre pas les questions ni les réponses ; seul un compteur par élève et par jour existe (`public.ai_usage`). Les conversations restent en mémoire dans la page et disparaissent à sa fermeture. Les journaux de la fonction ne contiennent que le modèle, le mode et la durée.

## Limites

- **15 questions par jour et par appareil**, **300 par jour pour tout Nunya** (`private.ai_limits`, modifiable en SQL sans nouvelle migration : `update private.ai_limits set per_user_daily = 20, global_daily = 500;`).
- Offre gratuite de Groq : limites par organisation et par modèle (environ 1 000 requêtes et 200 000 jetons par jour pour gpt-oss-120b selon la documentation de Groq, à vérifier dans la console). Une question consomme environ 2 000 à 3 000 jetons : compter **quelques dizaines à une centaine de questions par jour et par modèle**. Au-delà, le palier payant coûte environ 0,15 $ / 0,60 $ par million de jetons pour gpt-oss-120b, soit moins d’un dixième de centime par question.
- Sessions anonymes : Supabase limite leur création à 30 par heure et par adresse IP. Le plafond global protège le budget. À ajouter si des abus apparaissent : CAPTCHA (Turnstile) sur la connexion anonyme.

## Règles données au modèle

Voir `SYSTEM_PROMPT` dans `supabase/functions/nunya-aide/handler.ts` : français simple, exemple concret, indice avant solution et jamais la solution complète, domaine limité aux apprentissages et à l’orientation, aucune donnée personnelle demandée, renvoi vers un adulte de confiance en cas de détresse, honnêteté quand le modèle ne sait pas, contexte de la page traité comme des données et non comme des instructions. Réponses en markdown simple, affiché sans aucun HTML venant du modèle.

## Dans le site

- Bouton **Nunya Aide** en haut de chaque page (questions générales, ou sur le contenu de la page).
- Dans les leçons Découverte et Python : « Un passage n’est pas clair ? », « Demander de l’aide » après une activité ratée, « Un indice de Nunya Aide » dans l’atelier de code.
- Carte sur la page Aide.
- Avant la première question : écran d’information (ce qui est envoyé, à qui, ne pas partager d’informations personnelles, l’IA peut se tromper).
- Le panneau (`dist/aide-panel.js` → `runtime/aide-panel.js`) est chargé seulement au premier clic : le bundle principal reste sous le budget de 150 000 octets gzip (`scripts/js-budget.mjs` ; marge actuelle : environ 0,3 Ko après le chargement à la demande des vues Découverte ; les prochaines fonctions devront aussi être chargées à la demande).
- `FEATURES.aide` (dist/feature-flags.js) permet de masquer toute l’IA.

## Activer en production (à faire par l’équipe)

1. Créer un compte sur https://console.groq.com, puis une clé dans **API Keys**.
2. Supabase › projet nunya › **Edge Functions › Secrets** : ajouter `NUNYA_AI_KEY` = la clé Groq. Facultatif : `NUNYA_AI_MODELS` (liste séparée par des virgules), `NUNYA_AI_BASE_URL`, `NUNYA_ALLOWED_ORIGINS` (par défaut : nunya-togo.vercel.app, ses aperçus Vercel et localhost).
3. Supabase › **Authentication › Sign In / Providers** : activer **Allow anonymous sign-ins**.
4. Déployer le site (5.4.0) : la politique de sécurité de la page autorise déjà les appels vers le projet Supabase.

Tant que l’étape 2 ou 3 manque, le panneau affiche honnêtement « Nunya Aide n’est pas encore activé » et la leçon reste utilisable.

## Suite

Évaluer les réponses sur une vingtaine de vraies questions d’élèves en français (relues par un enseignant), comparer gpt-oss avec d’autres modèles ouverts, puis ajuster les limites et le texte des consignes. L’ancien contrat `lib/ai/provider.ts` reste une référence de types ; la fonction en production est `supabase/functions/nunya-aide/handler.ts`.
