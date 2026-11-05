# Contribuer aux contenus

Nunya est un projet propriétaire : le dépôt est public, mais le code et les contenus originaux ne sont pas sous licence libre (voir « Droits et réutilisation » dans le README). Les contributions se font sur invitation de l’équipe ; une contribution acceptée est intégrée à Nunya selon ces mêmes conditions.

Créer une branche puis une proposition de changement avec : identifiant stable, langue, public, objectifs, prérequis, durée, texte original, exercices, corrigés, sources exactes, licences et statut brouillon. Ne jamais s’attribuer une relecture qui n’a pas eu lieu.

Un enseignant vérifie le fond et l’alignement, une autre personne vérifie la clarté et l’accessibilité. La validation comporte le nom/rôle du relecteur et une date. Les contenus générés restent des brouillons ; vérifier calculs, barème et originalité avant publication comme validés.

Commandes : npm run lint ; npm run typecheck ; npm test ; npm run check:content. Les catalogues importés sont régénérés par les scripts d’import, avec versions et sources consignées. Les scripts n’exécutent pas le contenu importé.

## Revue depuis GitHub

Le projet s’exécute depuis `dist/` après `npm ci` et `npm run build`. Proposer une issue avec route, écran, appareil, résultat attendu et résultat observé, sans nom d’élève ni CV. Pour une modification, attendre l’accord de l’équipe sur l’issue, puis proposer une pull request sur la branche indiquée ; lancer les contrôles du README. Les leçons restent en brouillon jusqu’à la relecture humaine. Une correction de source ou de programme doit inclure URL institutionnelle, date et portée de la preuve.

Les fichiers générés `dist/runtime/academy.bundle.*` proviennent de `scripts/build-academy.mjs`. Modifier les sources, puis construire. Ne pas supprimer les licences MDN, OpenLearn ou du moteur Python. Ne jamais ajouter un export de progression personnel ou une clé de service au dépôt public.
