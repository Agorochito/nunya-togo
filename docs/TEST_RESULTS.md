# Vérifications 5.24.0 — 10 novembre 2026

- Projet complet : dans le contrôle de construction, 24 exemples, 96 cas de référence, 48 solutions acceptées et 48 codes de départ refusés, avec le même enveloppement que le navigateur exécuté par Node en local ; pages, formulaires, redirections 303, cookies, erreurs 400, 404, 413 et 500 et en-têtes de sécurité vérifiés par de vraies requêtes. Interface (`PROJET_FULLSTACK_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, une requête par vérification plus une erreur volontaire expliquée en français, lecture hors ligne à froid, zéro violation axe.
- Atelier Node.js : nouvel outil d’essai nunyaEchange (statut, type, en-têtes Location, Set-Cookie et de sécurité, sans suivre les redirections), couvert par un test unitaire ; le cours Node.js revérifié sans changement.
- 235 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; grille de contenu : 27 programmes, 407 leçons, 1 628 exercices. Catalogue (27 programmes, 28 raccourcis, 12 cours intermédiaires), parcours, ancien pack enregistré et migration depuis 5.23.0 réussis. Bundle principal : 149 273 octets gzip (149 561 selon le contrôle de l’académie), sous 150 000.

# Vérifications 5.23.0 — 10 novembre 2026

- TypeScript : dans le contrôle de construction, 24 exemples, 96 cas de référence, 48 solutions acceptées et 48 codes de départ refusés, compilés par le même TypeScript 5.6.2 que le service Wandbox (mode strict, noEmitOnError) ; les vérifications « refusé par les types » échouent bien quand les types de l’élève sont trop larges. Interface (`TYPESCRIPT_BASES_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, une requête par vérification plus une erreur de type volontaire expliquée en français avec sa ligne, lecture hors ligne à froid, zéro violation axe. Lancé juste après d’autres tests, ce parcours a dépassé un délai une fois, puis a réussi relancé seul.
- 234 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; grille de contenu : 26 programmes, 395 leçons, 1 580 exercices. Catalogue (26 programmes, 27 raccourcis, 11 cours intermédiaires ; « JS » trouve aussi TypeScript), domaines repliables, parcours, ancien pack enregistré et migration depuis 5.22.0 réussis. Bundle principal : 149 274 octets gzip (149 562 selon le contrôle de l’académie), sous 150 000.

# Vérifications 5.22.0 — 10 novembre 2026

- Node.js : dans le contrôle de construction, 24 exemples, 96 cas de référence, 48 solutions acceptées et 48 codes de départ refusés, avec le même enveloppement que le navigateur exécuté par Node en local ; GitHub Actions refait ce contrôle. Les serveurs écrits par l’élève sont réellement démarrés sur un port local temporaire et interrogés. Interface (`NODEJS_BASES_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, une requête par vérification plus une erreur volontaire expliquée en français (« Nom inconnu »), lecture hors ligne à froid et exécution hors ligne expliquée, zéro violation axe. Une requête réelle au service Wandbox (Node 20.17) a confirmé l’enveloppement.
- Moteur TypeScript 5.6 en ligne préparé pour le prochain cours : 5 tests unitaires avec le même compilateur que Wandbox (typescript 5.6.2 installé sous l’alias typescript-wandbox) — mode strict, erreurs de type en français avec la ligne de l’élève, vérifications « cet appel doit être refusé par les types », promesses attendues — puis deux requêtes réelles au service Wandbox. Aucun cours ne l’utilise encore.
- 234 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; grille de contenu : 25 programmes, 383 leçons, 1 532 exercices. Catalogue (25 programmes, 26 raccourcis, 10 cours intermédiaires ; la recherche « JS » trouve désormais aussi Node.js), domaines repliables, parcours, ancien pack enregistré, atelier C++ et migration depuis 5.21.0 réussis ; le test du catalogue a dépassé un délai une fois juste après le test Node.js, puis a réussi relancé seul. Bundle principal : 149 273 octets gzip (149 561 selon le contrôle de l’académie), sous 150 000.

# Vérifications 5.21.0 — 10 novembre 2026

- Intelligence artificielle : 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai Pyodide 3.14 du site (120 contrôles, tous les départs refusés) et rejoués sous Python 3.9 (120 contrôles) ; contrôle Python de la construction réussi (143 leçons Python, 1 742 cas). Liens de référence (UNESCO, CNIL, OWASP, ANSSI, Cybermalveillance.gouv.fr, Khan Academy) vérifiés en ligne. Interface (`IA_BASES_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe.
- Moteur Node.js 20 en ligne préparé pour le prochain cours (aucun cours ne l’utilise encore) : 5 tests unitaires exécutés avec Node en local (contexte partagé, promesses attendues, serveur HTTP testé sur un port local temporaire, erreurs en français avec la ligne de l’élève, boucle infinie arrêtée), puis une requête réelle au service Wandbox (Node 20.17) avec le même enveloppement. Atelier C++ revérifié avec le Worker partagé.
- ESLint, TypeScript, 227 tests unitaires, schémas, prérequis et liens réussis ; grille de contenu : 24 programmes, 371 leçons, 1 484 exercices. Catalogue (24 programmes, 25 raccourcis), domaines repliables, parcours, ancien pack enregistré et migration depuis 5.20.0 réussis. Bundle principal : 149 235 octets gzip (149 523 selon le contrôle de l’académie), sous 150 000.

# Vérifications 5.20.0 — 10 novembre 2026

- Projet web : 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai vérificateur de rendu de Nunya (styles calculés, dont variables CSS, requêtes média à 360 et 1 000 px et focus clavier) : tous les exemples et solutions passent, tous les départs échouent. Le contrôle commun des cours HTML et CSS couvre désormais 84 exemples et 264 solutions et départs (un exercice CSS intermédiaire, mesuré avant la fin de la mise en page pendant une passe chargée, a réussi relancé seul). Interface (`PROJET_WEB_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe ; HTML intermédiaire revérifié avec le test d’interface désormais commun.
- Liens de référence vérifiés en ligne ; une page MDN déplacée (requêtes média) a été remplacée par son équivalent français actuel.
- ESLint, TypeScript, 222 tests unitaires, schémas, prérequis et liens réussis ; grille de contenu : 23 programmes, 359 leçons, 1 436 exercices. Catalogue (23 programmes, 24 raccourcis), domaines repliables, parcours, ancien pack enregistré et migration depuis 5.19.0 réussis. Bundle principal : 149 224 octets gzip, sous 150 000.

# Vérifications 5.19.0 — 10 novembre 2026

- Statistiques avec Python : 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai Pyodide 3.14 du site (120 contrôles, tous les départs refusés) et rejoués sous Python 3.9 (120 contrôles) ; les simulations aléatoires sont vérifiées par des propriétés stables (bornes, fréquence proche de la probabilité), pas par des tirages exacts. Contrôle Python de la construction réussi (131 leçons Python, 1 622 cas). Interface (`STATISTIQUES_PYTHON_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe.
- Domaines repliables du catalogue (`CATALOGUE_DOMAINS_UI_RESULTS.json`) : à 360 et 1440 px, repli d’un domaine à la souris et au clavier, `aria-expanded` et `aria-controls`, choix conservé après rechargement, « Tout replier » puis « Tout déplier », vue filtrée sans domaines, zéro violation axe, aucun défilement horizontal.
- Barre repliée : liens du bas réduits en icônes ; test des ambiances relancé (52 audits axe, zéro violation).
- 222 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; grille de contenu : 22 programmes, 347 leçons, 1 388 exercices. Catalogue (22 programmes, 23 raccourcis, 9 cours intermédiaires), parcours, ancien pack enregistré, Qualité logicielle et migration depuis 5.18.0 réussis. Bundle principal : 149 224 octets gzip (149 512 selon le contrôle de l’académie), sous 150 000.

# Vérifications 5.18.0 — 10 novembre 2026

- PHP intermédiaire : avec PHP : les bases, 48 exemples et 233 cas de référence exécutés dans le vrai PHP 8.3 (php-wasm) ; 96 solutions acceptées et 96 codes de départ ou scripts vides refusés pour les deux cours PHP. Interface (`PHP_INTERMEDIAIRE_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe. Test unitaire ajouté pour `declare(strict_types=1)` sur la ligne qui suit `<?php`.
- Algorithmes et Qualité logicielle : pour chacun, 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai Pyodide 3.14 du site (120 contrôles chacun, tous les départs refusés) ; contrôle Python de la construction réussi (119 leçons Python, 1 502 cas, Python 3.9). Dans Qualité logicielle, chaque exercice de test est éprouvé par des versions défectueuses du code : la solution doit les détecter toutes, le code de départ en laisse passer. Interfaces (`ALGORITHMES_UI_RESULTS.json`, `QUALITE_LOGICIELLE_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe.
- Verre liquide recoloré sans vert : le générateur refuse toute paire sous 4,5:1, contrôlée sur le fond et sur chacune des quatre zones de couleur dans les deux modes.
- Barre latérale repliable (`AMBIANCES_UI_RESULTS.json`) : à 1440 px, repli en rail de 76 px, état `aria-expanded`, nom accessible et info-bulle sur chaque lien, choix conservé après rechargement, zéro violation axe, aucun défilement horizontal. Une première passe a détecté des liens sans nom accessible une fois le texte masqué ; le texte est désormais masqué visuellement mais reste lu par les lecteurs d’écran.
- 222 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; grille de contenu : 21 programmes, 335 leçons, 1 340 exercices. Catalogue (21 programmes, 22 raccourcis, 8 cours intermédiaires), parcours, ancien pack enregistré et migration depuis 5.17.0 réussis. Bundle principal : 149 213 (149 501 selon le contrôle de l’académie) octets gzip, sous 150 000.
- Tests navigateur : la suite complète (44 tests) a été passée sur la version de départ de 5.18.0 ; HTTP et SQL, en échec pendant un calcul lourd sur la même machine, ont réussi relancés seuls. Après l’ajout des deux cours, de la barre repliable et du nouveau Verre liquide : ambiances (52 audits axe, zéro violation), Algorithmes, Qualité logicielle, PHP intermédiaire, catalogue, parcours, ancien pack enregistré et migration depuis 5.17.0 réussis. GitHub Actions exécute la suite entière.
- Docker Desktop était en pause sur la machine de vérification : Terminal et Java restent vérifiés par GitHub Actions.

# Vérifications 5.17.0 — 10 novembre 2026

- SQL intermédiaire : 24 exemples, 48 solutions acceptées et 48 codes de départ et scripts vides refusés dans le vrai SQLite 3.54 (sql.js), dans le contrôle de construction désormais commun à tous les cours SQL ; résultats d’exemples recalculés et comparés. Interface (`SQL_INTERMEDIAIRE_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, base initiale affichée, lecture hors ligne, zéro violation axe. Le cours SQL débutant reste vérifié sur ses bases d’origine.
- 222 tests unitaires et contrôles de contenu réussis ; 42 tests navigateur réussis. Huit d’entre eux ont dépassé leurs délais lors d’une première passe menée pendant un autre calcul lourd sur la même machine, puis ont réussi relancés seuls (découverte, Git, HTTP, SQL, DOM, React, Python intermédiaire, HTML intermédiaire).

# Vérifications 5.16.0 — 10 novembre 2026

- Réseaux : 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai Pyodide 3.14 du site (120 contrôles, tous les départs refusés) ; contrôle Python de la construction réussi (1 262 cas, Python 3.9). Interface (`RESEAUX_BASES_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe.
- 222 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; 40 tests navigateur réussis, dont catalogue (17 programmes, 18 raccourcis), parcours, rendu des 287 leçons, ambiances, cybersécurité et migrations depuis 5.12.0 à 5.15.0. Bundle principal : 148 941 octets gzip.
- GitHub Actions : la tâche navigateur de 5.15.0 a été arrêtée par sa limite de 45 minutes, sans échec de test (la précédente durait déjà 42 minutes). Limite portée à 90 minutes. Bash et Java restent vérifiés par GitHub Actions ; Docker était en pause localement.

# Vérifications 5.15.0 — 10 novembre 2026

- Ambiances (`AMBIANCES_UI_RESULTS.json`) : choix depuis l’écran d’accueil et depuis les réglages, enregistrement sur l’appareil, Nuit qui active le thème sombre, Verre léger, couleur personnalisée conservée ; 26 audits axe par largeur (7 ambiances × clair/sombre × réglages et catalogue) à 360 et 1440 px, zéro violation, aucun défilement horizontal. Le générateur de palettes refuse tout texte sous 4,5:1 (plus faible : 4,93:1, texte secondaire du verre sombre au-dessus de sa couleur la plus vive).
- Cybersécurité : 24 exemples, 48 solutions et 48 codes de départ vérifiés dans le vrai Pyodide 3.14 du site (120 contrôles, tous les départs refusés) ; contrôle Python de la construction réussi (1 142 cas). Interface (`CYBER_BASES_UI_RESULTS.json`) : 12 leçons, 48 exercices et 36 questions à 360 et 1440 px, lecture hors ligne à froid, zéro violation axe.
- 222 tests unitaires, ESLint, TypeScript, schémas, prérequis et liens réussis ; 38 tests navigateur réussis, dont catalogue (16 programmes, 17 raccourcis), parcours, rendu des 275 leçons, ancien pack enregistré et migrations depuis 5.12.0, 5.13.0 et 5.14.0. Bundle principal : 148 941 octets gzip (149 229 selon le contrôle de l’académie), sous 150 000.
- Docker Desktop était en pause sur la machine de vérification : les parcours Terminal et Java et leur contrôle de construction n’ont pas été relancés localement (contenus inchangés) ; GitHub Actions les exécute avec Bash et Temurin 21 natifs. Le simulateur local détecte désormais un Docker en pause (`docker ps`) au lieu d’échouer.

# Vérifications 5.14.0 — 10 novembre 2026

- Java dans le contrôle de compilation, compilé par OpenJDK 21 dans un conteneur `eclipse-temurin:21-jdk` sans réseau, au format de Wandbox : 24 exemples et 131 cas de référence ; 48 solutions acceptées et 48 codes de départ refusés. GitHub Actions exécute le même contrôle avec Temurin 21 natif.
- Interface Java : 12 leçons, 48 exercices et 36 questions résolus à 360 puis 1440 px, une requête par vérification (48) plus une erreur de compilation volontaire expliquée avec sa ligne, cours relu à froid hors ligne et exécution hors ligne expliquée, zéro violation axe (`JAVA_BASES_UI_RESULTS.json`). Interfaces C++ et Terminal revérifiées avec le Worker partagé.
- Service réel : le projet final (`java-m4-03-e4`, quatre cas) accepté par OpenJDK 21 sur wandbox.org en une requête, en 48,3 s puis 18,9 s ; un programme minimal prend 8 à 12 s. Le délai d’attente Java passe à 90 s.
- 222 tests unitaires, dont l’enveloppe Java ; ESLint et TypeScript réussis. Catalogue (15 programmes, 16 raccourcis), parcours, rendu des 263 leçons, ancien pack enregistré et migration depuis 5.13.0 réussis. Le rendu global a dépassé son délai une fois, lancé juste après d’autres tests, puis réussi seul. Bundle principal : 147 936 octets gzip, sous 150 000.
- Docker Desktop s’était arrêté pendant la session : le simulateur local réessaie désormais `docker info` une fois avant de conclure qu’il n’y a pas de JDK.

# Vérifications 5.13.0 — 9 novembre 2026

- Terminal dans le contrôle de compilation, exécuté dans un conteneur Debian sans réseau (Bash 5.2, GNU coreutils), au format de Wandbox : 24 exemples et 105 cas de référence ; 48 solutions acceptées et 48 scripts de départ refusés. GitHub Actions exécute le même contrôle avec Bash natif.
- Interface Terminal : 12 leçons, 48 exercices et 36 questions résolus à 360 puis 1440 px, une requête par vérification (48), cours relu à froid hors ligne et exécution hors ligne expliquée, zéro violation axe (`BASH_BASES_UI_RESULTS.json`). Interface C++ revérifiée avec le Worker partagé.
- Service réel : le projet final (`term-m4-03-e4`, trois cas, fichiers et droits vérifiés) accepté par Bash sur wandbox.org en 3,4 s, en une requête.
- 217 tests unitaires, dont l’enveloppe Bash ; ESLint et TypeScript réussis. Catalogue (14 programmes, 15 raccourcis), parcours, rendu des 251 leçons et migration depuis 5.12.0 réussis. Comme en 5.11.0, la migration a échoué à sa première exécution puis réussi à la suivante ; cause non identifiée.

# Vérifications 5.12.0 — 9 novembre 2026

- Parcours et fiches (`JOURNEYS_READING_RESULTS.json`) : six parcours ; la fenêtre du parcours front-end compte ses 9 cours et ses 2 étapes en préparation ; confirmation, annulation, Échap, reprise du premier cours inachevé, sauvegarde et restauration de l’objectif, bilan local et fiches hors ligne réussis à 360 et 1440 px, zéro violation axe.
- Catalogue groupé par domaine (`COURSE_CATALOGUE_RESULTS.json`) : 13 cours, 14 raccourcis, filtres, saisie conservée, catalogue hors ligne, zéro violation axe aux deux tailles.

# Vérifications 5.11.0 — 9 novembre 2026

- C++ compilé par g++ local au format de Wandbox, dans le contrôle de compilation : 24 exemples et 132 cas de référence ; 48 solutions acceptées et 48 codes de départ refusés.
- Interface C++ : 12 leçons, 48 exercices et 36 questions résolus à 360 puis 1440 px, exactement une requête de compilation par vérification (48), cours relu à froid hors ligne et exécution hors ligne expliquée, zéro violation axe (`CPP_BASES_UI_RESULTS.json`). Les requêtes vers Wandbox sont servies par le compilateur local pendant ce test.
- Service réel : le projet final (`cpp-m4-03-e4`, trois cas) accepté par GCC 13 sur wandbox.org en 6,4 s, en une requête.
- 212 tests unitaires, dont l’enveloppe C++ ; ESLint et TypeScript réussis. Catalogue (13 programmes, 14 raccourcis), parcours et fiches, rendu des 239 leçons, PHP, ancien pack enregistré et migration depuis 5.10.0 revérifiés. La migration depuis 5.10.0 a échoué une fois sur quatre exécutions, sans cause identifiée ; les trois autres ont réussi.

# Vérifications 5.10.0 — 9 novembre 2026

- PHP réel dans le contrôle de compilation : 24 exemples et 137 cas de référence exécutés ; 48 solutions acceptées, 48 codes de départ et 48 scripts vides refusés.
- Moteur PHP dans un vrai Worker de navigateur (`PHP_ENGINE_RESULTS.json`) : PHP 8.3, démarrage local en environ 0,1 s une fois le moteur en cache, état neuf à chaque cas, saisies par STDIN, `readline()` expliqué au lieu de bloquer, `strict_types` conservé, erreurs de syntaxe et erreurs fatales lues avec leur ligne, avertissements visibles, boucle infinie arrêtée, affichage limité, `fetch`, IndexedDB et caches inaccessibles depuis PHP.
- Interface PHP : 12 leçons, 48 exercices et 36 questions résolus à 360 puis 1440 px, reprise à froid hors ligne, aucune erreur JavaScript et zéro violation axe sur les vues testées (`PHP_BASES_UI_RESULTS.json`).
- 207 tests unitaires, dont les auxiliaires du moteur PHP ; ESLint, TypeScript, schémas, prérequis et liens internes réussis. Bundle principal : 147 453 octets gzip, sous 150 000.
- Revérifiés avec 12 programmes : catalogue, parcours et fiches de lecture, rendu des 227 leçons, Python et JavaScript réels, SQL (18 leçons à deux tailles), 216 solutions HTML/CSS, ancien pack enregistré, migrations depuis 5.9.0, 5.8.0 et 5.4.3.

Le moteur pèse 3,1 Mo compressés : il n’est téléchargé qu’à l’ouverture du cours PHP. Ces contrôles ne remplacent ni une relecture pédagogique ni un essai sur les téléphones des élèves.

# Vérifications 5.9.0 — 9 novembre 2026

- 202 tests unitaires réussis ; TypeScript, ESLint, compilation, schémas, prérequis de leçons et de cours, liens internes et budget JavaScript réussis. Bundle principal : 147 404 octets gzip, sous 150 000.
- HTML/CSS dans un vrai navigateur : 60 exemples, 216 solutions acceptées et 216 codes de départ refusés pour les quatre programmes (`WEB_EXERCISE_RESULTS.json`). Les 30 nouvelles leçons représentent 60 exemples, 120 solutions et 120 codes de départ.
- Interface HTML intermédiaire : 12 leçons, 48 exercices et 36 questions résolus à 360 puis 1440 px. CSS intermédiaire : 18 leçons, 72 exercices et 54 questions aux deux tailles. Exercice suivant dans la même leçon, rechargement, leçon suivante, reprise à froid hors ligne, aucune erreur JavaScript, aucun débordement et zéro violation axe sur les vues testées (`HTML_INTERMEDIAIRE_UI_RESULTS.json`, `CSS_INTERMEDIAIRE_UI_RESULTS.json`).
- Catalogue : 11 programmes et 12 raccourcis, filtres technologie et niveau, saisie conservée, catalogue hors ligne (`COURSE_CATALOGUE_RESULTS.json`). Les 215 leçons ont été rendues (`GLOBAL_CURRICULUM_UI_RESULTS.json`).
- Parcours et fiches de lecture revérifiés avec 11 programmes (`JOURNEYS_READING_RESULTS.json`).
- Migration réelle depuis 5.8.0 (`ae5f349e`) : 9→11 cours sans second rechargement, SQL ouvert, brouillon et position conservés (`RELEASE_UPGRADE_ae5f349e_RESULTS.json`). Migration depuis `2df60ddf` et ancien pack téléchargé (`SAVED_COURSE_UPGRADE_RESULTS.json`) également revérifiés.
- Non réexécutés pour ce lot : les moteurs Git, HTTP, SQL, DOM, React et Python intermédiaire dans le navigateur, dont le code n’a pas changé. La CI les relance à chaque envoi.

Les contrôles lisent des valeurs calculées précises ; ils ne certifient pas l’accessibilité et ne remplacent ni une relecture pédagogique humaine ni un essai sur les téléphones des élèves. Les tailles en rem supposent le réglage par défaut de 16 px du navigateur.

# Vérifications 5.8.0 — 7 novembre 2026

- 202 tests unitaires réussis ; TypeScript, ESLint, compilation, schémas, prérequis, liens internes et budget JavaScript réussis. Bundle principal avec garde de démarrage : 147 656 octets gzip, sous 150 000.
- Python natif : 71 leçons et 1 022 cas exécutés pour exemples et solutions. Nouvelle série intermédiaire : 18 leçons, 36 exemples, 72 solutions acceptées, 72 codes initiaux incomplets refusés, 243 cas de référence.
- Pyodide réel : mêmes 36 exemples et 72 solutions acceptés, 72 codes initiaux refusés ; projet final JSON/CSV/objets exécuté dans une nouvelle page et un nouveau Worker sans connexion (`PYTHON_INTERMEDIATE_ENGINE_RESULTS.json`). Un cas flottant intégral `3.0` a été remplacé par `3.5` pour préserver la distinction de type à travers JSON JavaScript/Python.
- Interface Python intermédiaire : 18 leçons, 72 exercices et 54 questions résolus à 360 puis 1440 px ; progression, rechargement, exercice suivant dans la même leçon, leçon suivante après validation et reprise à froid hors ligne vérifiés. Aucune erreur JavaScript, zéro violation axe sur les vues testées (`PYTHON_INTERMEDIATE_UI_RESULTS.json`).
- Catalogue : 9 programmes et 10 raccourcis, filtres, préservation des préférences saisies et catalogue hors ligne vérifiés. Les 185 leçons ont été rendues ; exercices/mini-quiz restent dans la leçon, retour et rechargement conservés (`GLOBAL_CURRICULUM_UI_RESULTS.json`, `COURSE_CATALOGUE_RESULTS.json`).
- Parcours : confirmation, annulation et Échap, premier cours inachevé, codes/positions conservés, sauvegarde et restauration de l’objectif aux deux tailles. Bilan local refusé avant la fin et proposé après les validations. Export natif d’une leçon et d’un cours déjà téléchargé en mode hors ligne ; fichier HTML ouvert sans connexion, aucune requête HTTP ni script actif (`JOURNEYS_READING_RESULTS.json`). Les fiches comprennent aussi les données SQL, contrats d’interaction et anciennes questions de fin de chapitre.
- Migration réelle depuis 5.7 (`0c959e4b`) : 8→9 cours sans deuxième rechargement ; SQL ouvert, brouillon et position conservés. L’ancien pack Python téléchargé s’ouvre dans une nouvelle page hors ligne malgré la révision récente du catalogue, puis la dernière version redevient disponible en ligne (`SAVED_COURSE_UPGRADE_RESULTS.json`).
- Sauvegardes Python/niveau 0, questionnaire facultatif, liens directs et moteurs Python/JavaScript existants revérifiés. Les contrôles précédents DOM/React/SQL/Git/HTTP restent documentés ci-dessous ; ils ne sont pas présentés comme une nouvelle exécution intégrale de tous les moteurs.

Les vérifications techniques ne remplacent pas une relecture pédagogique humaine ni un essai sur les téléphones des élèves. Tous les nouveaux contenus restent en brouillon, reviewer:null. Le rapport de progression local n’est ni un diplôme ni une certification professionnelle.

# Vérifications 5.7.0 — 6 novembre 2026

- 182 tests unitaires, TypeScript et ESLint réussis ; compilation et schémas/prérequis cohérents.
- DOM :18leçons,36exemples,72solutions acceptées et72codes initiaux rejetés ;920assertions réellement exécutées dans Chrome.
- React :18leçons,36exemples,72solutions acceptées et72codes initiaux rejetés ;977assertions Chrome, dont états contrôlés, identité des clés, nettoyage d’écouteurs et réponse obsolète180ms→40ms.
- Isolation CSP HTTP, refus réseau/accès parent, arrêt, boucles/récursion et redémarrage à froid hors ligne DOM/React vérifiés par `INTERACTIVE_ENGINE_RESULTS.json`.
- Le bundle principal reste sous150000octets gzip ; les moteurs supplémentaires sont à la demande.
- DOM et React :72exercices et54QCM par programme exécutés dans le site à360px puis1440px ; reprise à froid hors ligne réussie,0erreurJavaScript et0violationaxe sur les vues contrôlées. Le dernier allègement visuel a aussi été revérifié aux deux tailles.
- Les rapports `DOM_UI_RESULTS.json`, `REACT_UI_RESULTS.json`, `INTERACTIVE_VIEW_RESULTS.json` et les rapports de régression indiquent les derniers résultats de l’interface. Les vérifications automatiques ne remplacent pas la relecture pédagogique ou les essais sur appareils réels au Togo.

# Vérifications 5.6.1 — 6 novembre 2026

Le bug utilisateur a été reproduit avec le vrai site 5.4.3 (`2df60ddf`) et son service worker : après passage à la version 5.6, un navigateur gardait un catalogue à un seul cours. La version corrigée lie les métadonnées et vues à la version de la page, puis actualise au changement de contrôleur. Les tests `test-release-upgrade.mjs` partent des versions `2df60ddf` et `842013e5`, vérifient les six cours, leurs raccourcis, l’ouverture de SQL et la conservation du brouillon Python et de sa position. Rapports `RELEASE_UPGRADE_*_RESULTS.json`. Les métadonnées de catalogue hors ligne sont aussi éprouvées après suppression de leur entrée avec paramètre de version, pour tester le vrai repli sur la copie canonique enregistrée.

# Vérifications 5.6.0 — 5 novembre 2026

Le catalogue modernisé est testé en 360/1440 px : filtres par technologie, recherche JS, état vide, feuille de route React et liens vers le programme SQL ; aucune erreur JavaScript, aucun débordement et zéro violation axe sur ces vues. Voir `COURSE_CATALOGUE_RESULTS.json`.

177 tests unitaires passent après intégration des correctifs du collaborateur et du moteur SQL. Les 36 exemples, 176 cas de référence et 72 solutions SQL sont exécutés dans SQLite WebAssembly ; les 72 codes initiaux échouent sur leur série de cas, de même que les scripts vides. Le moteur redémarre à froid hors ligne après téléchargement. Les 18 leçons, 72 exercices et 54 questions sont parcourus en 360 et 1440 px ; zéro erreur JavaScript, aucun débordement horizontal et zéro violation axe sur les vues finales testées. Résultats, contraintes, transactions, limites et arrêt sont contrôlés ; voir `SQL_ENGINE_RESULTS.json`. `GLOBAL_CURRICULUM_UI_RESULTS.json` couvre les 6 cours et 131 leçons, navigation et reprise mobile/ordinateur sans erreur.

# Vérifications 5.5.0 — 5 novembre 2026

163 tests unitaires réussis ; build, lint, TypeScript, contenus, prérequis et liens internes validés. Les rapports de navigateur suivent dans `GLOBAL_CURRICULUM_UI_RESULTS.json`, `ALL_DISCOVERY_COURSES_RESULTS.json`, `BACKUP_ONBOARDING_RESULTS.json`, `CODE_RUNTIME_RESULTS.json` et `WEB_EXERCISE_RESULTS.json` et `LIBRARY_OFFLINE_RESULTS.json`, avec les rapports Git et HTTP décrits ci-dessous. Les vérifications automatisées ne remplacent pas la relecture pédagogique.

La bibliothèque et deux articles MDN s’ouvrent sans rafraîchissement manuel. Une unité de collection est partageable et reste sélectionnée après rechargement. Le projet JavaScript final est accessible hors ligne après téléchargement, y compris après visite du guide public : celle-ci ne remplace plus la page d’accueil mise en cache. Un lien de ressource invalide affiche une issue claire.

Les liens partagés Python M12, Découverte M4 et bibliothèque sont ouverts dans des profils neufs. Le questionnaire peut être passé et le diagnostic fermé sans résultat inventé. La restauration depuis le sélecteur natif de fichier conserve code, positions et réflexion après rechargement ; un fichier mal formé ne change pas la progression. Les autres preuves et limites sont détaillées dans `COURSE_COVERAGE_AUDIT.md`.

L’atelier Git est vérifié dans `GIT_ENGINE_RESULTS.json` et `GIT_UI_RESULTS.json` : 32 situations initiales rejetées, 32 objectifs atteints par 101 opérations réelles ; persistance IndexedDB après fermeture, transfert des objets Git par archive et échec atomique d’une archive invalide. Les 12 leçons, 48 activités et 36 questions sont parcourues dans l’interface à 360 et 1440 px, sans sortie prématurée de la série, puis rechargées hors ligne. Axe : zéro violation sur les vues testées.

HTTP : `HTTP_ENGINE_RESULTS.json` contient 162 cas réussis, 48 solutions acceptées, 48 codes de départ rejetés et 24 exemples ; vrais fetch/Request/Response, annulation et erreurs dans Chrome. Refus d’un ancien service worker sans requête de diagnostic au serveur ; imports externes bloqués par la CSP du Worker et URL interne de Request contrôlée malgré une propriété JS masquée. Le serveur de QA `scripts/serve-test.py` reproduit ces en-têtes Vercel. Ces restrictions ne constituent pas un service de compilation isolé pour un examen sécurisé.

`HTTP_UI_RESULTS.json` confirme les 12 leçons, 48 exercices et 36 questions parcourus dans l’interface à 360 et 1440 px, puis la reprise froide hors ligne avec les requêtes encore exécutables. Aucun débordement et zéro violation axe sur les vues testées. Le catalogue complet de code affiche maintenant 5 programmes et 113 leçons ; Git et Découverte sont suivis séparément.

---

# Vérifications — version 5.4.0, 3 novembre 2026 (Nunya Aide)

- Fonction serveur : 8 tests avec un faux Supabase et un faux fournisseur (origines autorisées, session obligatoire, requête invalide, service non configuré, quotas élève et global, consignes et contexte envoyés, repli vers gpt-oss-20b, nouvel essai sans options de raisonnement, question rendue si tout échoue, troncature des entrées). Déployée sur Supabase (`nunya-aide`, version 1).
- Base : quotas testés en SQL dans une transaction annulée (14 → 0 puis refus, plafond global, refus sans session ; fonction appelable seulement par le rôle serveur). Aucune alerte de sécurité Supabase nouvelle.
- Site, avec un faux Supabase, téléphone 360 px et ordinateur 1280 px, clair et sombre : 110 vérifications, 0 erreur JavaScript (écran d’information, contexte de la leçon, réponse en markdown sans HTML du modèle, retrait du contexte, quota atteint, fournisseur indisponible, service non activé, aide après une activité ratée, indice Python avec code joint, page Aide, focus rendu à la fermeture, panneau chargé seulement au clic).
- Bundle principal (avec boot-guard) : 149 686 octets gzip, sous le budget unique de 150 000 (`scripts/js-budget.mjs`, lu par `check:content` et `check:academy`). Le 3 novembre, 153 511 octets dépassaient ce budget : les vues du cours Découverte sont désormais chargées à la demande (`runtime/discovery-views.js`, 5,3 Ko gzip, précaché par le service worker). Panneau Nunya Aide à part : 3,9 Ko gzip.
- Vérifié dans un navigateur le 4 novembre (serveur local) : programme Découverte, leçon 1 (4 activités : QCM, association, ordre, vrai/faux ; retour « Pas encore », lien Nunya Aide, leçon terminée et sauvegardée), ouverture de la leçon 2 et panneau de progression. Le service worker n’a pas pu être testé dans ce navigateur ; les 45 fichiers précachés existent.
- Non-régression : 34 adresses × 3 configurations, parcours Découverte (208 vérifications), 80 activités résolues, passage de `nunya-v5.2.0` à `nunya-v5.4.0`, cours hors ligne.

Non mesuré : appel réel à Groq et à la connexion anonyme (réseau fermé depuis l’environnement de vérification) ; qualité des réponses du modèle en français, à évaluer avec des enseignants.

# Vérifications — version 5.3.0, 3 novembre 2026 (niveau 0)

- Construction (`npm run build`) : `prepare-discovery.py` valide les 20 leçons (151 à 188 mots d’explication, 8 à 10 minutes, 4 activités chacune, réponses et identifiants cohérents) ; le reste de la chaîne Python inchangé (278 cas réussis).
- Les 80 activités ont été résolues une à une dans l’interface, dans l’ordre : chaque leçon s’ouvre après la précédente, 20/20 terminées à la fin. Bonne réponse des QCM répartie à l’écran sur les 4 rangs (8, 8, 8, 9) ; vrai ou faux : 8 vrais, 11 faux.
- Tests unitaires : 79 réussis dont 5 nouveaux (`tests/discovery.test.ts`) ; le test `study` qui demande la bibliothèque complète reste à lancer sur la machine de développement.
- `tsc --noEmit`, `check:academy`, `check:curriculum-links` : réussis.
- Parcours complet automatisé dans 4 configurations (téléphone 360 px et ordinateur 1280 px, clair et sombre) : 208 vérifications, 0 erreur JavaScript. Leçon 2 verrouillée au départ ; mauvaise réponse → « Pas encore » avec le nombre d’éléments justes ; changer de réponse efface l’ancien verdict ; remise en ordre au clavier avec le focus conservé ; leçon terminée → leçon suivante ouverte et persistance après rechargement ; « Explique avec tes mots » : réponse possible affichée après une phrase écrite ; recherche, Ma progression, redirection de `#/apprendre/ordinateur` et `#/apprendre/logique`.
- 34 adresses × 3 configurations sans erreur ni débordement horizontal.
- Mise à jour : un navigateur en `nunya-v5.2.0` passe à `nunya-v5.3.0` ; après « Emporter le cours », la leçon 1 s’ouvre hors connexion avec ses 4 activités.

Non mesuré : durée réelle des leçons avec des élèves, compréhension du vocabulaire, relecture par un enseignant.

# Vérifications — version 5.2.0, 3 novembre 2026

Corrections d’interface en huit étapes, chacune comparée avant/après par captures (360 px et 1440 px, clair et sombre).

- Construction (`npm run build`) : lint du programme, graphe des prérequis et 278 cas de code Python réussis ; 22 leçons, 7 301 mots d’explication.
- Tests unitaires : 74 réussis (academy, curriculum, platform, study, assessment-engine, placement-mapping). Le registre npm n’étant pas joignable depuis l’environnement de vérification, ils ont été lancés avec un exécuteur minimal compatible ; un test de `study` demande la bibliothèque complète, absente de cette copie. À relancer avec `npm test` sur la machine de développement.
- `tsc --noEmit`, `check:academy`, `check:curriculum-links` : réussis. Syntaxe de tous les fichiers `dist/*.js` et `scripts/*.mjs` vérifiée.
- Parcours navigateur : 30 adresses × 3 configurations (téléphone clair, téléphone sombre, ordinateur) sans erreur JavaScript, sans débordement horizontal, sans page bloquée sur « Préparation de ton espace… ».
- Mise à jour hors ligne : un navigateur ayant le cache `nunya-v5.1.7` passe à `nunya-v5.2.0` et charge le nouveau bundle après rechargement.
- Couleurs : aucune surface verte de l’ancien thème mesurée sur 11 pages (clair et sombre).

Non mesuré : essais sur téléphones réels, lecteur d’écran, relecture humaine des textes.

## Historique 5.1.0

# Vérifications — version 5.1.0, 2 novembre 2026

32 tests Vitest, lint et TypeScript réussis. 22 leçons passent les contrôles de structure (300–700 mots par explication, deux exemples, quatre exercices, trois quiz, erreurs, glossaire et récapitulatif), le graphe de prérequis et les références du catalogue. Les 278 cas d’exécution des exemples et solutions passent avec Python 3. Les solutions sont vérifiées avec les saisies et sorties attendues ; ce contrôle ne prétend pas juger toute la pédagogie.

Chrome anonyme : première leçon depuis l’accueil et reprise en un clic ; réponse Python incorrecte puis correcte ; quatre exercices et quiz avant progression ; saisies `input()` et cas supplémentaires ; ancien lien physique redirigé dans le scolaire ; articles CSS puis Python ouverts depuis la bibliothèque sans actualisation. Zéro erreur JavaScript pendant ce scénario après correction des éléments historiques de navigation et de la recherche asynchrone.

Après téléchargement : contexte passé hors ligne, recherche et lecture accessibles, éditeur chargé, code Python exécuté avec moteur déjà enregistré. Le moteur reste facultatif et distinct du texte. Les vidéos ne sont pas téléchargées.

Seize vues axe A/AA : programme, carte du cours, première leçon et recherche, en 360/1440 px et clair/sombre. Zéro violation détectée et zéro débordement horizontal ; voir `AXE_CURRICULUM.json`. Ce n’est pas une certification d’accessibilité. Les tests sur téléphone réel restent à faire.

Navigation ralentie : viewport 360×640, CDP latence 150 ms, débit 200 Ko/s, CPU ×4. Les comptes de clics et temps sont dans `FINDABILITY_V5.json`. Temps synthétiques sur serveur local, après affichage de l’accueil et avec caches progressivement chauds : pas une mesure du réseau d’un élève togolais. Le questionnaire adaptatif de dix questions et les conditions de progression sont aussi testés. Les recherches vérifient les adresses des premières leçons : boucle → for/range ; variable et varible → nommer une valeur ; if → if/else ; FCFA → conversion avec f-string.

Captures avant : site public 5.0.2, visiteur anonyme. Captures après : version 5.1.0 locale. `docs/screenshots/v5-360-*` et `v5-1440-*` contiennent accueil, carte et leçon, dont des captures de page complète.

Relecture humaine, réussite M1–M2 en trois heures et maîtrise d’un débutant : non mesurées. Les contenus restent brouillons. La limite mémoire stricte du runtime navigateur n’est pas garantie. Les modules 5–10, les autres langages et la mise au niveau v5 complète du pilote de mathématiques restent à développer.

## Historique 5.0.2

# Vérifications — version 5.0.2, 2 novembre 2026

Lint, TypeScript, 27 tests Vitest et contrôles de contenu réussis. Les réponses des 27 questions numériques des trois nouvelles initiations sont vérifiées indépendamment, en plus des schémas, bornes des QCM, durées et identifiants.

Inventaire : 38 cours existants / 166 leçons, plus quatre cours originaux différés / 16 leçons = 42 cours uniques / 182 leçons. Les quinze parcours de métiers réemploient aussi ces contenus ; leurs 188 séances et 364 occurrences de questions ne sont pas autant de cours ou questions indépendants. Bibliothèque existante : 7 066 articles et 4 115 vidéos françaises uniques. Explorateur : 91 collections ou références avec sources, dont 77 groupes Khan.

## Parcours et navigation

Tests Playwright à 360 × 640, réseau limité à 200 000 octets/s, latence 150 ms et CPU ralenti ×4 : nouveau visiteur → parcours cybersécurité en deux clics, prérequis et cinq étapes après découverte ; réponse incorrecte puis correcte, déverrouillage et prochaine séance ; reprise depuis l’accueil en un clic ; redirections des liens partagés, entrée scolaire active. Aucun débordement horizontal ou erreur JavaScript détecté. Enregistrement vidéo local de la session : `/private/tmp/nunya-e2e-videos/page@072d8f15fdbf0d065835fa8a2bfeee9b.webm` (ne contient que des données fictives de test).

Autres tests : domaine santé → vrai parcours de découverte → leçon ; mini-test de cinq questions ; KaTeX local en mathématiques ; Python `print(6 * 7)` produit 42 après retrait de `unsafe-eval` ; checklist France et brouillon CV conservés après rechargement.

Nouvel explorateur : les 12 vues (trois routes × deux tailles × deux thèmes) passent axe A/AA sans violation et sans débordement. Les quatre cours pratiques s’ouvrent directement ; sélection Terminale et matières conservées ; lecteur officiel LearnFree présent à la demande ; recherche paginée change effectivement les résultats ; guide public lisible sans JavaScript. La présence de l’iframe ne prouve pas la lecture de chaque vidéo chez chaque élève.

## Hors ligne et présentation

Parcours et unité scolaire téléchargés, contexte navigateur passé hors ligne puis rechargé : textes et pratique accessibles. Les vidéos restent en ligne. Les caches de ressources et de Python ne sont pas supprimés par la mise à jour du shell.

44 vues finales supplémentaires (11 routes × deux tailles × deux thèmes) : zéro violation axe A/AA détectée, zéro débordement horizontal. Captures et rapports dans `docs/screenshots/`, `AXE_FINAL.json`, `AXE_SKILLS.json`. L’audit automatique ne remplace pas des essais avec lecteur d’écran et appareils physiques.

Lighthouse mobile local sur serveur Python sans compression : performance 80, accessibilité 100, bonnes pratiques 100 ; LCP 4,7 s, TBT 120 ms, CLS 0,095. Le seuil du brief de 80/95 est atteint ; la cible LCP < 3 s n’est pas atteinte. `LIGHTHOUSE_RESULTS.json` conserve la mesure et son contexte. Mesure ultérieure sur Vercel : performance 96, accessibilité 100, bonnes pratiques 100, LCP 1,8 s. Aucun essai Android physique n’est prétendu.

## Sources et outils internes

Rapport de disponibilité HTTP terminé le 2 novembre : 11 733 URL, 11 707 réponses concluantes, zéro 404/410 confirmé, 26 incertaines (réseau / limitation serveur). Un ancien PDF ANPE mort a été remplacé par le portail officiel. HEAD ne contrôle pas la qualité pédagogique, la lecture de chaque vidéo ou l’accès gratuit à une certification.

Générateur APC : schéma et somme des points réussis sur un exemple original, calculs déterministes testés ; absence d’empreintes de référence signalée, `publishable:false`, relecture obligatoire. 2 925 propositions lexicales de rapprochement ressources / parcours sont des CSV de revue, non publiés automatiquement.

## Limites

Relecture togolaise et alignement au programme à réaliser ; admissions, dates et coefficients non validés ; aucune collecte de vrais dossiers élèves. Pas de compte, de synchronisation cloud, d’IA distante ni d’envoi de candidature. Les brouillons métiers et contenus restent identifiés. Changer de domaine nécessite export/import des progrès locaux. GitHub et Vercel sont documentés séparément dans `DEPLOY_VERCEL.md` ; la préparation du fichier de configuration ne vaut pas un déploiement Vercel réussi.


Vercel production vérifiée le 2 novembre : https://nunya-togo.vercel.app, accès anonyme HTTP 200, 12 compétences présentes, ouverture d’un accompagnement français sans erreur JavaScript. Dépôt public : https://github.com/Agorochito/nunya-togo ; contrôle GitHub Actions réussi.
