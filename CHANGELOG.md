# Historique

## 5.5.0 — 4 novembre 2026

- Réparation commune de la navigation, positions d’exercice et de quiz persistantes, retour à la leçon adjacente lors des révisions.
- Modules nommés pour 42 unités et 348 questions originales supplémentaires ; couverture mobile et ordinateur de toutes leurs questions.
- Python étendu aux collections, fonctions, résolution de problèmes, débogage, inventaire et réservation : 31 nouvelles leçons, 124 exercices.
- Nouveaux socles HTML/CSS et JavaScript synchrone (24 leçons, 96 exercices, questionnaire final), avec aperçus et moteurs réels ; suites DOM/Node et niveaux supérieurs distincts.
- Registre et compilation multi-cours ; assertions Python sur retours, types et copies ; ancien contrôle de conversion par commentaire rejeté.
- Unités de collections partageables, cache de packs par révision, bilan de parcours métier à la fin.
- Ressources sans rafraîchissement manuel, écran clair pour un lien invalide ; visite d’un guide sans écraser la page d’accueil hors ligne.
- 16 anciens exercices Python sur variables et types renforcés ; 274 cas JavaScript et 743 cas Python vérifiés.
- Sauvegardes v1/v2 complètes et de code restaurées sans perdre Python ou Découverte ; préférences et niveaux conservés.
- Questionnaire facultatif, diagnostic quittable et liens partagés directs ; consultation libre sans validation artificielle.
- Fusion des ajouts du collaborateur : niveau 0, bibliothèque libre, opportunités, études à l’étranger et Nunya Aide préservés sans activation serveur.
- Choix de quiz mélangés avec identités de réponses conservées ; demande de stockage persistant lors du téléchargement.
- Tests de navigateur portables ajoutés à la CI ; relecture pédagogique et autres niveaux toujours à poursuivre.


## 5.4.0 — compléments du 4 novembre 2026

- Bibliothèque : nouvelle page **Tous les cours Nunya** (`#/bibliotheque/cours`), avec les 42 cours en lecture libre, sans programme ni test, en trois familles (programmation et numérique, révisions scolaires, métiers et compétences pratiques). Entrée « Voir tous les cours » sur l’accueil de la bibliothèque. Les cours restent des brouillons à relire.
- Intègre la 5.2.1 publiée sur `main` (navigation question par question, séries de maths). Cache `nunya-v5.4.0` pour l’ensemble.
- **Études à l’étranger** et **Opportunités** réouvertes dans le menu (`FEATURES.showAbroad`, `FEATURES.showOpportunities`). Le portfolio reste masqué.
- Poids du site : les vues de la Découverte et les pages de la bibliothèque (compétences, thèmes, collections, tous les cours) sont chargées à la demande et précachées. Bundle principal : 148 677 octets gzip pour un budget unique de 150 000 (`scripts/js-budget.mjs`).

## 5.4.0 — 3 novembre 2026 · Nunya Aide

- Nouvel assistant **Nunya Aide**, IA open source (Groq, modèles à poids ouverts gpt-oss) : explique une notion floue, reformule la leçon, donne un autre exemple et des indices pour les exercices, sans donner la solution complète.
- Accès sans compte (session anonyme), écran d’information avant la première question, 15 questions par jour et par appareil ; aucune question enregistrée par Nunya.
- Bouton en haut de chaque page, carte sur la page Aide, appels dans les leçons Découverte et Python (après l’explication, après une activité ratée, dans l’atelier de code avec le code joint si l’élève le veut).
- Serveur : fonction Supabase `nunya-aide`, migrations 004 à 006 (plafond global, quota réservé côté serveur, question rendue si le modèle ne répond pas).
- Le panneau est chargé au premier clic pour garder le site léger. Cache `nunya-v5.4.0`.
- À activer par l’équipe : clé Groq dans les secrets Supabase et connexion anonyme (voir `docs/AI_STRATEGY.md`).

## 5.3.0 — 3 novembre 2026 · niveau 0 (brouillon, module 1 validé par l’équipe)

- Nouveau cours « Découverte du numérique » (niveau 0, aucun prérequis), en tête d’Apprendre à coder. 4 modules et 20 leçons de 8 à 10 minutes (≈ 2 h 50) : Ordinateur et téléphone ; Internet et le web ; Fichiers, logiciels et sécurité de base ; Penser comme un programmeur. Les leçons s’ouvrent dans l’ordre.
- Chaque leçon : idée en 30 secondes, comparaison du quotidien, explication courte, exemple guidé, 4 activités corrigées (choix unique, vrai ou faux, remettre dans l’ordre, associer), « Explique avec tes mots » gardé sur l’appareil avec une réponse possible, récapitulatif et mots nouveaux. La leçon suivante s’ouvre quand les 4 activités sont réussies.
- Les anciennes entrées « Bien démarrer avec l’ordinateur » et « Penser comme un programmeur » sont remplacées par ce cours ; leurs adresses redirigent vers lui. Leçons trouvables dans la recherche ; progression visible dans Ma progression ; « Emporter le cours » pour lire hors ligne.
- Les choix des questions sont mélangés (ordre fixe par question) ; la ponctuation française ne se retrouve plus seule en début de ligne dans les leçons.
- Correction : après le test d’accueil, tant que l’élève n’avait pas cliqué « Terminer », les cartes principales d’Apprendre à coder étaient masquées sur toutes les pages.
- Cache `nunya-v5.3.0` et ressources `?v=5.3.0`.
## 5.2.1 — 4 novembre 2026

- Une question à la fois, compteur, vérification, précédent et suivant dans la même leçon.
- Série de cinq questions pour chacune des huit leçons du pilote de maths : 32 questions originales supplémentaires.
- Sauvegarde des réponses et de la position, préservation des validations précédentes, progression scolaire correctement indiquée dans le sommaire.
- Passage explicite à la leçon suivante uniquement après la série ; parcours métier utilisant la même navigation.
- Audit du nouveau prompt maître et matrice interne des cours cibles par niveau, sans publier de formations vides.

## 5.2.0 — 3 novembre 2026

- Navigation mobile : « Coder » dans la barre du bas, Bibliothèque dans « Plus » ; loupe avec curseur dans le champ ; titres de page corrigés (Confidentialité, page introuvable).
- Leçons : en-tête compact sur téléphone, bandeau « Mon parcours » limité à Mon avenir, résultat de vérification rendu visible, onglets collés en haut.
- Mini-quiz et question de fin de chapitre : options en cartes avec bouton radio aligné ; variables de couleur manquantes définies.
- Orientation : Programmation & données → Python : les bases (module 1, mini-test proposé si les bases sont solides) ; résultats en mots ; second test de départ retiré ; ancien cours Python remplacé dans les listes ; recherche « Cours » enrichie.
- Carte du cours : leçons verrouillées alignées avec cadenas, règle expliquée une fois ; « Prochains cours » non cliquables ; page du mini-test centrée sur les questions. Correction : le mini-test ouvert directement restait bloqué.
- Cohérence visuelle : test de départ, révision et Mes cours alignés sur la palette ; césure des titres de compétences ; recherche vide avec suggestions ; espaces insécables avant ? ! : ; dans les titres.
- Textes : sous-titre de Mon avenir, leçon 1, Aide, carnet d’erreurs, apostrophes du test, message moins de 13 ans.
- Cache `nunya-v5.2.0` et ressources `?v=5.2.0`.

## 5.1.0 — 2 novembre 2026

- Programme de code distinct du scolaire et de l’orientation ; liens historiques redirigés.
- Python original M1–M4 : 22 leçons, 44 exemples, 88 exercices, 66 quiz, projets et points d’étape.
- Éditeur local, exécution Pyodide, saisies, indices, erreurs expliquées et progression exportable.
- Carte des modules, reprise en un clic, recherche groupée et point de départ adaptatif.
- Correction du chargement des articles sans actualisation.
- Markdown canonique, exercices JSON, schémas, contrôles et tests de code intégrés à CI.
- Brouillons à relire ; M5–M10 et autres langages en préparation.
