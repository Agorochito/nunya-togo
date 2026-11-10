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

## PHP, C, C++ et Java — relevé du 9 novembre 2026

Demande du propriétaire : ouvrir de nouveaux langages (PHP, C++, Java…) du niveau débutant au niveau avancé. La règle du projet reste inchangée : pas de cours sans moteur réel, utilisable hors ligne et vérifié. Ce relevé provient des métadonnées du registre npm et de la mesure des fichiers publiés. **Aucun de ces moteurs n’a encore été exécuté ni intégré** : chaque ligne reste à confirmer par un prototype avant toute rédaction de cours.

| Langage | Candidat | Licence | Poids mesuré ou publié | Avis |
|---|---|---|---|---|
| PHP | `php-wasm` 0.2.0 (interpréteur PHP 8.0 à 8.5 compilé en WebAssembly) | Apache-2.0 ou GPL-2.0 au choix | PHP 8.3 : 12,2 Mo, soit 3,1 Mo gzip ; Worker de 134 Ko gzip | **Intégré en 5.10.0** (voir ci-dessous). Utilisé sous l’option Apache-2.0. |
| PHP | `@php-wasm/web` 3.1 (WordPress Playground) | GPL-2.0-or-later | paquet de 31 à 50 Mo | Écarté par prudence : licence à réciprocité, à faire examiner avant tout usage dans un projet propriétaire. |
| C++ | `@yowasp/clang`, `browsercc` (vrai compilateur Clang) | ISC, MIT | 105 à 114 Mo décompressés | Vrai compilateur, mais trop lourd pour les connexions visées. À réévaluer seulement avec un téléchargement facultatif et annoncé. |
| C++ | `JSCPP` 2.0.9 | MIT | interpréteur JavaScript, bien plus léger | Interprète un **sous-ensemble** de C++ et n’est plus mis à jour depuis 2022. Utilisable seulement si le cours est nommé honnêtement et borné aux constructions réellement vérifiées. |
| C | `picoc-js` 1.0.12 | MIT | 1,6 Mo | Interpréteur d’un sous-ensemble de C, non mis à jour depuis 2022. Même réserve que JSCPP. |
| Java | aucun paquet auto-hébergeable trouvé sur npm sous les noms cherchés (CheerpJ, TeaVM javac) | — | — | Recherche séparée nécessaire : compilateur et machine virtuelle dans le navigateur, licence, poids et fonctionnement hors ligne. Aucun cours annoncé avant ce choix. |

Étapes pour PHP, dans l’ordre : prototype dans un Worker avec capture de la sortie, des erreurs et arrêt d’une boucle infinie ; vérification du démarrage à froid hors ligne ; mesure sur un téléphone d’entrée de gamme ; puis rédaction d’un premier cours « PHP : les bases » sur le même contrat que les autres programmes (deux exemples, quatre exercices et trois questions par leçon). PHP s’exécuterait ici comme un interpréteur en ligne de commande : les pages dynamiques servies par un vrai serveur ne doivent pas être annoncées tant qu’elles ne sont pas réellement disponibles.

Sans moteur supplémentaire, les suites suivantes peuvent être rédigées dès maintenant avec les moteurs déjà vérifiés : SQL intermédiaire (SQLite), JavaScript intermédiaire et asynchrone (Worker), Python avancé (Pyodide), HTML et CSS avancés (vérificateur de navigateur).

### PHP intégré — 5.10.0

Le moteur tourne dans `coding-php-worker.js` (sources `lib/php/`), avec la même politique de sécurité de contenu que le Worker SQL. Le paquet publié vise une page : il nomme `window` et `document` au chargement, d’où des substituts inertes dans le Worker. L’interface « embed » de cette version ne définit pas `STDIN` et `readline()` attend un clavier : l’atelier définit `STDIN` comme PHP en ligne de commande, sur la ligne de la balise d’ouverture pour garder les numéros de ligne, et refuse `readline()` avec une explication. L’extension mbstring est absente : le cours le dit et évite les fonctions de texte sur des lettres accentuées. Les vérifications de valeurs sont faites en PHP par un épilogue ajouté après le script, puis comparées en JSON, ordre des clés compris. Résultats : `PHP_ENGINE_RESULTS.json` et `PHP_BASES_UI_RESULTS.json`.

### Ateliers compilés en ligne — 5.11.0

Le propriétaire a accepté le 9 novembre 2026 que les langages compilés s’exécutent en ligne. Service retenu : Wandbox (wandbox.org), gratuit, sans clé, réponses CORS ouvertes ; sa FAQ autorise l’usage en cours et commercial, avec des limites par adresse IP et sans engagement de disponibilité. Le service Piston public est réservé sur liste blanche depuis février 2026 ; l’API de Compiler Explorer n’est pas prévue pour cet usage. Une classe entière derrière une même adresse IP peut atteindre les limites de Wandbox : c’est pourquoi chaque vérification regroupe tous ses cas en une requête. Si la charge augmente, l’alternative est d’héberger notre propre instance Wandbox ou Piston (`lib/remote/` ne dépend que du format de requête). Java (OpenJDK 21), C, Go, Rust et un terminal Bash sont disponibles sur le même service et réutiliseront `lib/remote/worker.mjs`.

### Terminal — 5.13.0

Bash 5.2 sur Wandbox, avec les commandes GNU usuelles (vérifiées : ls, mkdir, cp, mv, rm, cat, head, tail, wc, sort, uniq, grep, cut, tr, find, chmod, stat, sed, awk, timeout). Chaque cas reçoit un dossier neuf, ses fichiers et leurs droits de départ ; `LC_ALL=C` rend les tris identiques sur Wandbox et en local. Les tests locaux utilisent Bash natif sous Linux, sinon un conteneur `debian:bookworm-slim` sans réseau (Docker). awk diffère entre Debian (mawk) et d’autres systèmes : le cours ne l’utilise pas.

