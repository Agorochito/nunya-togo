# Point de reprise — 5 novembre 2026

**Mise à jour :** ce document décrit le point de contrôle `cff26bac`, avant la reprise. Depuis, SQL a été intégré avec 18 leçons et un moteur réel, et les changements du collaborateur jusqu’à `2df60ddf` ont été fusionnés. Le propriétaire a ensuite demandé la publication Vercel. Consulter `COURSE_COVERAGE_AUDIT.md`, `TEST_RESULTS.md` et les rapports SQL pour l’état courant. Les paragraphes suivants sont conservés comme historique.

Branche de revue : `review/offline-courses-2026-11-05`.
Cette sauvegarde répond à la demande de partager le travail avant une interruption liée au quota. Elle ne doit pas être fusionnée automatiquement : elle contient des améliorations testées et un prototype SQL non intégré. Aucune mise à jour de la production Vercel n'est demandée par ce point de contrôle.

## Changements terminés et testés

Le dernier commit fonctionnel avant le prototype SQL est `d86f24d5`.

- Navigation des exercices corrigée dans les cours partagés : question suivante, vérification, nouvelle tentative et leçon suivante sont des actions distinctes. Progression et travail sont conservés localement.
- Cinq programmes de code intégrés : Python, HTML, CSS, JavaScript et HTTP/API, soit 113 leçons et 452 exercices. Explications détaillées en français, exemples, mini-quiz et pratique dans le navigateur.
- Git/GitHub : 12 leçons, 48 activités dont 32 ateliers exécutant de vraies opérations Git locales. Archives des dépôts, branches, commits et conflits testés.
- HTTP/API : 12 leçons, 48 exercices et 36 questions ; vrais appels `fetch` vers une API pédagogique locale, utilisable hors ligne. Aucun serveur Node.js n'est simulé ou annoncé comme disponible.
- Réparations de sauvegarde/restauration, ouverture des ressources, téléchargements et navigation mobile. Les améliorations d'accueil du collaborateur connues à `6488b35c` ont été conservées.

Les rapports de tests navigateur sont dans `docs/*RESULTS.json`, notamment `GIT_ENGINE_RESULTS.json`, `GIT_UI_RESULTS.json`, `HTTP_ENGINE_RESULTS.json` et `HTTP_UI_RESULTS.json`. Ils couvrent notamment les solutions et codes initiaux, la navigation, le rechargement, le hors-ligne et les formats mobile/ordinateur. Les contrôles pédagogiques automatiques ne remplacent pas une relecture humaine : les nouveaux contenus restent signalés comme brouillons.

Vérification au moment du point de contrôle : `npm test` réussit, 163 tests dans 14 fichiers. `npm run build` réussit aussi avec la dépendance SQL installée : 5 programmes et 113 leçons préparés, 743 cas Python et 274 cas JavaScript validés, 96 codes initiaux JavaScript rejetés. Le prototype SQL n'est pas inclus dans ces résultats.

## Prototype SQL sauvegardé, non disponible dans le site

Fichiers : `lib/sql/CONTENT_CONTRACT.md`, `fixtures.mjs`, `core.mjs`, `worker.mjs`. Dépendance épinglée : `sql.js@1.15.2` dans `package.json` et le verrou npm.

Le prototype utilise réellement SQLite : jeux de données fictifs, résultats tabulaires, comparaison avec une requête de référence, contrôle des mutations et sondes de contraintes. Un essai Node minimal a confirmé SELECT vide, agrégat et UPDATE. Cela ne constitue pas une validation complète du moteur.

**Aucune leçon SQL n'a été enregistrée et aucun manifeste SQL n'est activé.** La rédaction a été interrompue par la limite d'utilisation. Les modules ne sont donc pas exposés comme un cours prêt à suivre.

À terminer, dans cet ordre :

1. Relire le contrat et écrire les 18 leçons prévues (6 modules, 72 activités, 54 questions), avec solutions et variantes réelles, sans contenu de remplissage.
2. Tester et corriger le moteur : schémas équivalents, contraintes, transactions, résultats vides, erreurs, limites, annulation et boucles longues.
3. Compiler le Worker, copier le WASM et la licence dans les ressources auto-hébergées ; définir sa CSP et le téléchargement hors ligne à la demande.
4. Brancher le moteur et les tableaux de résultats dans l'éditeur, expliquer la remise à zéro de la base à chaque exécution et proposer l'export `.sql`.
5. Ajouter le manifeste seulement lorsque les leçons et l'exécution sont prêtes ; vérifier tous les exercices, leurs codes initiaux, les exemples et les variantes.
6. Tester le parcours entier sur mobile et ordinateur, y compris reprise, sauvegarde, navigation, accessibilité et démarrage hors ligne. Mettre à jour l'audit de couverture.

## Autres travaux et intégration GitHub/Vercel

`docs/COURSE_COVERAGE_AUDIT.md`, `data/review/course_coverage_2026-11-04.json` et `docs/NEXT_RUNTIME_DECISIONS.md` décrivent les lacunes restantes. Node.js et les parcours intermédiaires/avancés non réalisés ne sont pas des cours complets. Ne pas assimiler une ressource documentaire à un parcours terminé.

Lors du contrôle distant, `main` était à `2df60ddfbd77b0cf21fa41710c030c00498d59b6`, plus récent que la base locale `6488b35c`. Avant toute fusion, récupérer les derniers changements du collaborateur, examiner les différences, résoudre les conflits et refaire les contrôles. Cette branche de sauvegarde ne remplace pas son travail.

Commandes de vérification : `npm ci`, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Pour les tests navigateur, lancer `python3 scripts/serve-test.py --port 4176`, puis les scripts indiqués dans `test:browser` avec un navigateur compatible. Prévisualiser sur Vercel avant une éventuelle fusion vers la branche de production.
