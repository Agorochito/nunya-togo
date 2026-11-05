# Prochains moteurs : décision technique avant les cours

Recherche du 4 novembre 2026. La recherche décrit les contraintes des prochains moteurs. Mise à jour du 5 novembre : Git et HTTP sont maintenant implémentés localement, sans publication, avec les dépendances épinglées décrites ci-dessous. Aucun service payant, compte ni secret ajouté.

## Git et GitHub

Le moteur implémenté et vérifié utilise `isomorphic-git`, avec un système de fichiers local en IndexedDB comme LightningFS. Ce sont de vraies opérations sur les objets, l’index, les commits et les branches Git, sans inventer un terminal ou déclarer qu’une commande native a tourné. Les bibliothèques sont sous licence MIT. Les fichiers sont épinglés et auto-hébergés, les opérations sérialisées et les écritures vidées avant accusé de réception. Le moteur pèse environ 79 Ko gzip à la demande. Les rapports `GIT_ENGINE_RESULTS.json` et `GIT_UI_RESULTS.json` vérifient les 32 ateliers, la sauvegarde, le rechargement, les branches, les conflits et le hors-ligne.

Sources primaires : [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git), [LightningFS](https://github.com/isomorphic-git/lightning-fs), [merge API](https://isomorphic-git.org/docs/en/merge). L’implémentation a des limites de stratégies de fusion ; le cours doit rester dans les capacités réellement vérifiées.

Git local ne demande pas de compte. Publier un dépôt ou une pull request sur GitHub est une extension en ligne qui requiert un compte ; elle ne peut pas être déclarée réussie hors ligne. [Prérequis GitHub](https://docs.github.com/en/get-started/using-github/hello-world).

## HTTP

Le cours HTTP/API est implémenté : 12 leçons, 48 exercices, 24 exemples et 36 questions. Les vrais objets `Request`, `Response` et `fetch` travaillent sur une **API pédagogique locale** dans le service worker ; données fictives et aucune persistance. Le moteur asynchrone pèse environ 1,8 Ko gzip, son client de confirmation 0,7 Ko et son API 1,5 Ko. Le pack de cours pèse environ 39 Ko gzip.

Le client confirme le protocole `locale-v1` par MessageChannel avant de démarrer le Worker, sans sonde réseau. Une version ancienne du service worker refuse l’atelier proprement. Les requêtes natives sont limitées au préfixe local, sans cookies ; le statut et la forme des échanges sont vérifiés et visibles. Le Worker possède une CSP propre, reproduite par le serveur de QA, qui refuse les imports de modules tout en permettant l’évaluation du code de l’élève. Les références et codes initiaux passent dans `HTTP_ENGINE_RESULTS.json`, y compris à froid hors ligne. La relecture humaine reste nécessaire.

Sources primaires : [Fetch en français](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch), [événement fetch du service worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event), [await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await), [CSP des Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#content_security_policy). Le laboratoire enseigne le client HTTP, sans prétendre exécuter un serveur Node.js.

## Node.js

Le Worker JavaScript actuel est un moteur JavaScript synchrone, pas Node.js. Il ne doit jamais être renommé pour faire croire à la présence du système de fichiers, des modules ou du serveur Node.

WebContainers exécute réellement des applications Node dans le navigateur, mais exige l’isolation d’origine et ses contraintes de navigateur. Aucune garantie de démarrage à froid entièrement hors ligne avec un ensemble figé de fichiers n’a été établie. Son runtime et ses conditions de production doivent être vérifiés séparément du paquet API. [Démarrage](https://webcontainers.io/guides/quickstart), [en-têtes](https://webcontainers.io/guides/configuring-headers), [compatibilité](https://webcontainers.io/guides/browser-support), [conditions](https://stackblitz.com/terms-of-service).

Wasmer/Edge.js offre un environnement compatible avec certaines API Node, mais ce n’est pas le runtime Node.js natif. Il impose lui aussi une isolation et des moteurs plus lourds ; la prévisualisation d’un serveur et le réseau local doivent être éprouvés sur les appareils ciblés. [Wasmer SDK](https://docs.wasmer.io/runtime/js/), [Edge.js](https://github.com/wasmerio/edgejs).

Le cours Node exécutable reste donc fermé tant qu’un prototype réel, honnêtement nommé, ne passe pas les vérifications de compatibilité, de stockage et de hors-ligne. La matrice des niveaux intermédiaire et avancé demeure dans `data/review/course_coverage_2026-11-04.json`.
