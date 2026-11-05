# Prochains moteurs : décision technique avant les cours

Recherche du 4 novembre 2026. La recherche décrit les contraintes des prochains moteurs. Mise à jour du 5 novembre : Git est maintenant implémenté localement, sans publication, avec les dépendances épinglées décrites ci-dessous. Aucun service payant, compte ni secret ajouté.

## Git et GitHub

Le moteur implémenté et vérifié utilise `isomorphic-git`, avec un système de fichiers local en IndexedDB comme LightningFS. Ce sont de vraies opérations sur les objets, l’index, les commits et les branches Git, sans inventer un terminal ou déclarer qu’une commande native a tourné. Les bibliothèques sont sous licence MIT. Les fichiers sont épinglés et auto-hébergés, les opérations sérialisées et les écritures vidées avant accusé de réception. Le moteur pèse environ 79 Ko gzip à la demande. Les rapports `GIT_ENGINE_RESULTS.json` et `GIT_UI_RESULTS.json` vérifient les 32 ateliers, la sauvegarde, le rechargement, les branches, les conflits et le hors-ligne.

Sources primaires : [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git), [LightningFS](https://github.com/isomorphic-git/lightning-fs), [merge API](https://isomorphic-git.org/docs/en/merge). L’implémentation a des limites de stratégies de fusion ; le cours doit rester dans les capacités réellement vérifiées.

Git local ne demande pas de compte. Publier un dépôt ou une pull request sur GitHub est une extension en ligne qui requiert un compte ; elle ne peut pas être déclarée réussie hors ligne. [Prérequis GitHub](https://docs.github.com/en/get-started/using-github/hello-world).

## HTTP

Un atelier HTTP peut utiliser les vrais objets `Request`, `Response` et `fetch`, avec une **API pédagogique locale** identifiée comme telle dans un service worker. Il faut annoncer qu’aucun serveur distant n’est contacté, puis vérifier méthodes, statuts, en-têtes, corps, erreurs et JSON sur les données fictives de cette API. Cela enseigne la logique du client, sans prétendre exécuter un serveur Node.js. [Contrat de l’événement fetch](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event).

## Node.js

Le Worker JavaScript actuel est un moteur JavaScript synchrone, pas Node.js. Il ne doit jamais être renommé pour faire croire à la présence du système de fichiers, des modules ou du serveur Node.

WebContainers exécute réellement des applications Node dans le navigateur, mais exige l’isolation d’origine et ses contraintes de navigateur. Aucune garantie de démarrage à froid entièrement hors ligne avec un ensemble figé de fichiers n’a été établie. Son runtime et ses conditions de production doivent être vérifiés séparément du paquet API. [Démarrage](https://webcontainers.io/guides/quickstart), [en-têtes](https://webcontainers.io/guides/configuring-headers), [compatibilité](https://webcontainers.io/guides/browser-support), [conditions](https://stackblitz.com/terms-of-service).

Wasmer/Edge.js offre un environnement compatible avec certaines API Node, mais ce n’est pas le runtime Node.js natif. Il impose lui aussi une isolation et des moteurs plus lourds ; la prévisualisation d’un serveur et le réseau local doivent être éprouvés sur les appareils ciblés. [Wasmer SDK](https://docs.wasmer.io/runtime/js/), [Edge.js](https://github.com/wasmerio/edgejs).

Le cours Node exécutable reste donc fermé tant qu’un prototype réel, honnêtement nommé, ne passe pas les vérifications de compatibilité, de stockage et de hors-ligne. La matrice des niveaux intermédiaire et avancé demeure dans `data/review/course_coverage_2026-11-04.json`.
