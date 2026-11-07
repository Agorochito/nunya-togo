# Point de reprise — 7 novembre 2026, livraison 5.8.0

## Livré

Python intermédiaire distinct : 6 modules, 18 leçons originales détaillées, 72 exercices, 54 QCM, 36 exemples et projet de bilan de club JSON/CSV. Collections, fonctions et copies, erreurs/validation, objets/invariants, formats et tests. Tous les contenus restent en brouillon/reviewer:null.

Catalogue principal : 9 programmes, 56 modules, 185 leçons, 740 exercices et 555 questions. Git/GitHub (12 leçons) et niveau 0 (20 leçons) restent séparés. Deux niveaux Python visibles dans les raccourcis.

Quatre parcours entre cours réellement disponibles : front-end, analyse de données, fondations back-end et prérequis cybersécurité. Choix explicite, reprise du premier cours inachevé, brouillons et positions conservés ; objectif inclus dans les sauvegardes. Bilan local de progression après validations, sans diplôme ou certification externe.

Fiches HTML autonomes d’une leçon ou d’un cours : textes, exemples, exercices, corrigés, quiz, données SQL et références ; sans moteur ni progression intégrés au fichier. Impression PDF depuis le navigateur. Anciennes révisions téléchargées accessibles hors ligne après une mise à jour du catalogue, sans sacrifier la validation de la révision actuelle en ligne.

## Vérifications

202 tests unitaires ; build/typecheck/lint/structure/prérequis/liens/budget réussis. 1 022 cas Python natifs sur 71 leçons. Pyodide : 36 exemples, 72 solutions et 72 codes initiaux rejetés pour la nouvelle série, puis projet final à froid hors ligne. Les 18 leçons/72 exercices/54 QCM parcourus sur 360 et 1440 px ; aucun saut d’exercice vers une autre leçon et aucune erreur JavaScript. Sauvegardes, catalogue, 185 leçons rendues, migrations depuis 5.7, parcours et fiches hors ligne contrôlés. Rapports et captures dans docs ; voir TEST_RESULTS.md.

Le changement JSON 3.0→3.5 dans un test évite la perte de distinction int/float lors de JSON.stringify, sans affaiblir le contrat de refus des flottants. Les exceptions sont vérifiées par type exact et message, les constructions par AST ; aucune sortie attendue codée en dur ne valide ces fonctions.

## Suite

Le prompt Qwen est suivi dans PROMPT_QWEN_5.8_COVERAGE.md. La cible globale de 72 cours n’est pas terminée. Node/Express et TypeScript nécessitent encore un moteur réel compatible avec les appareils et le hors-ligne ; ne pas les simuler avec le Worker JavaScript. Les autres familles et niveaux supérieurs restent suivis dans data/review/course_coverage_2026-11-04.json. La traduction intégrale de l’interface anglaise n’est pas terminée ; l’enseignement est français en priorité.

Préserver les IDs, les travaux du collaborateur, Nunya Aide, les sauvegardes et les autres secteurs. Ne pas réécrire Next.js/Prisma : l’existant statique répond aux fonctions locales demandées. Faire relire les cours par des enseignants et poursuivre les essais avec des élèves.
