# Décisions — extension de Nunya

Date : 1er novembre 2026.

- Les demandes directes du propriétaire priment sur le périmètre du cahier de route et du brief : développer les domaines dès maintenant et ne pas limiter la bibliothèque à 17 cours.
- Deux entrées distinctes : Mes cours (révision scolaire) et Mon avenir (métiers et compétences). Les ressources tierces sont identifiées comme telles, jamais comptées comme des cours originaux validés.
- Le nombre affiché provient de données réelles. Un cours contient des modules/leçons ; une vidéo n’est pas artificiellement renommée « parcours complet ».
- Seuls les contenus dont les droits le permettent peuvent être adaptés ou enregistrés hors ligne. Les vidéos YouTube restent intégrées dans leur lecteur officiel.
- Le programme et les calendriers français/belges de Khan Academy ne sont pas le programme ni le calendrier togolais. Les correspondances scolaires nécessitent une relecture.
- Âge minimum configurable 13 ans ; le niveau guide les recommandations, jamais l’âge. Primaire modélisé pour la suite, comptes supervisés non activés.
- Par défaut : pilote scolaire Mathématiques, seconde, rédaction originale à relire. Aucun sujet d’annale n’est redistribué.
- Dates 2027 et coefficients fournis dans le brief : non vérifiés ; aucun calcul de réussite ou compte à rebours officiel fondé sur ces valeurs. Une date personnelle de révision reste possible.
- Conserver l’application statique publiée pendant cette extension : légère, partageable et déjà hors ligne. La migration Next.js/Supabase ne doit pas casser les progrès existants ; schéma et contrats préparés séparément. L’authentification Google/email, une IA distante et la synchronisation réelle exigent une configuration serveur et des services identifiés. Ne pas afficher de succès simulé.
- Ne pas présenter des cours rédigés par Codex comme relus par un enseignant. Métadonnées status=brouillon, reviewer=null tant que personne ne les a relus.
- Les fonctions enseignant/admin ne sont pas exposées aux élèves. Le générateur d’exercices produit des brouillons locaux et exige une validation humaine ; aucune promotion automatique en « validé ».
- Sources officielles d’abord : ministères togolais et portails institutionnels. Une annonce ancienne prouve l’existence d’une filière, pas l’ouverture actuelle des inscriptions.
- L’intégration de milliers de ressources passe par des exports/catalogues publics autorisés, dédupliqués et segmentés ; pas par des milliers de cartes vides ou des leçons génériques dupliquées.

## Questions non bloquantes

Relecteurs togolais à identifier ; calendrier officiel à obtenir ; établissements et conditions d’accès à vérifier ; sens éwé et disponibilité de la marque à confirmer ; fournisseur/budget IA à choisir après évaluation ; projet Supabase à provisionner avant synchronisation.

## Décisions directes ultérieures

- Le propriétaire ne possède aucun projet Supabase et demande de garder la base locale : IndexedDB, profils locaux et sauvegardes ; pas de création de compte fournisseur ni de coût engagé. Supabase reste une option pour plus tard.
- L’éditeur de code doit être dans les cours de programmation et les articles concernés. Suppression de l’entrée « atelier de code » à l’échelle du site ; résultat affiché dans la leçon.
- BAC II : recherche élargie au portail des compositions régionales et à l’Office du Bac. 28 documents de Terminale trouvés dans le dossier officiel régional, dont des corrigés. Leur nature reste visible ; ils ne sont pas présentés comme des annales nationales.

## Académie 5 — décisions du 2 novembre

- Demande directe : plusieurs domaines développés simultanément. Trois initiations en six étapes (0 découverte puis cinq étapes) et douze parcours courts de découverte ; durées calculées sur les séances réelles (~4,4 h pour chacune des trois initiations), jamais les 40 h illustratives.
- Les deux thèmes et tous leurs fonds suivent une seule couleur d’accent. Personnalisation discrète dans Profil & confort, système clair/sombre respecté lors de la première visite.
- LearnFree : huit références manuelles et accompagnements Nunya originaux. Ses conditions ne donnent pas un droit clair de traduction intégrale et interdisent l’aspiration ; aucune collecte automatique du catalogue. Class Central reste une piste de découverte, pas le propriétaire des cours ni une licence de republication.
- La mention « source consultée » qualifie la recherche, jamais la validation pédagogique, l’ouverture d’une offre ou l’admissibilité. Les contenus nouveaux et métiers restent en brouillon.
- L’outil interne de génération APC reste hors de l’application élève. Sans empreintes autorisées ni relecteur humain, `publishable:false`.
- Dépôt GitHub public demandé par le propriétaire, configuration Vercel prête. Les sessions locales, fichiers d’environnement, identifiants Sites et historique de travail ne sont pas nécessaires au dépôt public ; publier un instantané de source nettoyé. Les données des élèves n’existent que dans leur navigateur.

## Brief v5 — priorité du 2 novembre

- Le brief v5 remplace la priorité d’élargissement par la profondeur : un seul nouveau cours ouvert, Python : les bases, M1–M4 (22 leçons). M5–M10 et les autres langages sont des plans en préparation, pas des cours complets annoncés. Les anciens cours de code courts ne sont plus les destinations par défaut.
- Les 18 adaptations historiques freeCodeCamp préparées avant ce brief ne sont pas publiées : v5 demande des contenus originaux uniquement. Structure pédagogique inspirée de pratiques générales, aucune affiliation ni certification freeCodeCamp.
- Chaque nouvelle leçon possède une seule source Markdown et un JSON d’exercices adjacent ; catalogue, recherche et packs sont des dérivés. Les anciens contenus restent des repères historiques, à migrer et relire progressivement ; ils ne sont pas comptés comme le nouveau programme complet.
- Routes : apprendre pour le code, mes-cours pour le scolaire, parcours pour les métiers. Les anciens liens sont redirigés. Une fiche de glossaire Python propose le véritable cours au lieu de se présenter comme ce cours.
- Les contrôles de code et de structure ne remplacent pas la revue de compréhension par un élève débutant. Le moteur possède un timeout ; la limite mémoire stricte demandée ne peut pas être garantie par le runtime Pyodide actuellement embarqué. Repli lecture, traces et quiz disponible.

- Les prérequis conditionnent la progression, sans empêcher une lecture ou un essai libre. Un test de module permet de valider des acquis ; le questionnaire de départ conseille seulement et ne valide rien.
- Le contrôle sémantique complet du vocabulaire et de la difficulté demeure humain. Les validateurs garantissent des champs, bornes, références et sorties de programmes, pas l’absence de tout jargon.

## Interface 5.2 — décisions du 3 novembre

- Le test d’accueil, pour le domaine « Programmation & données », recommande le cours Python : les bases (module 1) au lieu du parcours métier Données & IA. Les parcours métiers restent proposés dans Mon avenir ; l’élève n’y est plus inscrit d’office. Création web et Culture numérique gardent leurs parcours.
- Les résultats du test s’affichent en mots (Bases solides ≥ 70, En progrès ≥ 35, À découvrir), seuils identiques au choix du point de départ ; aucun pourcentage n’est montré.
- Un seul test de départ (accueil). Le test Python de 10 questions n’est plus proposé ; son adresse reste valide. Les modules se valident par leur test de 5 questions.
- L’ancien cours court « Premiers pas avec Python » est remplacé par « Python : les bases » partout où il était listé ; les progrès anciens restent stockés.
- Supabase : projet « nunya » créé le 3 novembre dans l’organisation du propriétaire (offre gratuite, région eu-west-3 Paris, la plus proche du Togo parmi celles proposées). Migrations 001 à 003 appliquées : schéma, RLS, fonction de rôle déplacée dans un schéma privé, quota d’IA réservé aux utilisateurs connectés, index. Le site reste entièrement local : aucune connexion, synchronisation ou authentification n’est encore branchée dans `dist/`. Les clés publiques sont dans `.env` (ignoré par git).
- Niveau 0 : un seul cours « Découverte du numérique » en 4 modules (ordinateur et téléphone ; Internet et le web ; fichiers, logiciels et sécurité de base ; penser comme un programmeur) remplace les deux entrées prévues « ordinateur » et « logique ». Leçons de 5 à 10 minutes, 120 à 300 mots, 4 activités corrigées sans IA, réponse libre non notée gardée sur l’appareil. Il précède Python sans le bloquer. Module 1 livré d’abord et validé par l’équipe le 3 novembre ; modules 2 à 4 rédigés ensuite dans le même format, à relire. Format et plan : `docs/NIVEAU0_PLAN.md`.
- Sécurité numérique (niveau 0, module 3) : les conseils suivent les recommandations générales valables partout (hameçonnage, mots de passe, double vérification, sauvegarde), sans particularité nationale ni service local nommé. Décision de l’équipe du 3 novembre.
- Nunya Aide (3 novembre) : IA open source via Groq (offre gratuite), modèles à poids ouverts gpt-oss-120b puis gpt-oss-20b ; Kimi K2 et DeepSeek V3 écartés pour l’instant (retirés ou absents de Groq, payants ailleurs) mais possibles plus tard en changeant les secrets. Accès sans compte par session anonyme Supabase ; 15 questions par jour et par appareil, 300 par jour au total ; aucune question stockée. Présent dans les leçons (contexte de la leçon, indices sans solution) et en aide générale (bouton en haut, page Aide). Le panneau est chargé à la demande pour respecter le budget JavaScript.
