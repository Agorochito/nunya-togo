# Nunya

Apprendre en français, à son rythme, même hors connexion : coder depuis zéro, réviser ses cours et explorer des métiers. Conçu au Togo, pensé d’abord pour les lycéens togolais, ouvert à tous les francophones de 13 ans et plus.

**Site :** [nunya-togo.vercel.app](https://nunya-togo.vercel.app)

> **Projet propriétaire.** Le code est consultable sur GitHub, mais Nunya n’est pas un logiciel libre : aucune licence open source n’est accordée. Voir [Droits et réutilisation](#droits-et-réutilisation).

## État du projet

Pilote en cours ; version 5.18. Tous les contenus sont des **brouillons** rédigés avec assistance et pas encore relus par des enseignants (`status: brouillon`, `reviewer: null`). Les changements de chaque version sont dans le [CHANGELOG](CHANGELOG.md).

## Ce que propose Nunya

- **Apprendre à coder**
  - *Découverte du numérique* (niveau 0, 20 leçons) ;
  - *Python : les bases* (12 modules, 53 leçons, 212 exercices) ;
  - *Python intermédiaire* (6 modules, 18 leçons, 72 exercices) : collections, exceptions, objets, JSON/CSV et projet ;
   - HTML et CSS (12 leçons, 48 exercices chacun), JavaScript (24 leçons, 96 exercices), HTTP/API (12 leçons, 48 exercices) ;
   - *HTML intermédiaire* (4 modules, 12 leçons, 48 exercices) : structure accessible, formulaires, tableaux, localisation et annuaire associatif ;
   - *CSS intermédiaire* (6 modules, 18 leçons, 72 exercices) : cascade, Flexbox et grilles robustes, interfaces adaptatives, états accessibles et tableau de club ;
   - *PHP : les bases* (4 modules, 12 leçons, 48 exercices) avec un vrai interpréteur PHP 8.3 sur l’appareil : variables, conditions, boucles, tableaux, fonctions et caisse de boutique ;
   - *C++ : les fondamentaux* (4 modules, 12 leçons, 48 exercices), compilé en ligne par GCC 13 sur Wandbox : types, boucles, fonctions, vecteurs, textes, références, structures et bulletin de classe ;
   - *SQL intermédiaire : analyser les données d’une boutique* (4 modules, 12 leçons, 48 exercices), vrai SQLite hors ligne : CASE, fonctions de texte et de dates, opérateurs ensemblistes, sous-requêtes corrélées, WITH et requêtes récursives, fonctions de fenêtre, vues, index, UPSERT, déclencheurs et tableau de bord ;
   - *Réseaux informatiques : comprendre et diagnostiquer* (4 modules, 12 leçons, 48 exercices), en Python hors ligne : adresses IP, masques et sous-réseaux, couches, ports, DNS, ping, traceroute, configurations, pare-feu, Wi-Fi et segmentation, puis diagnostic du réseau d’un collège ;
   - *Cybersécurité : défendre une petite organisation* (4 modules, 12 leçons, 48 exercices), en Python hors ligne : risques, mots de passe et hachage salé, hameçonnage, journaux de connexion, droits d’accès, validation des entrées, intégrité, sauvegardes 3-2-1, réponse aux incidents et audit complet ;
   - *Java : premiers programmes* (4 modules, 12 leçons, 48 exercices), compilé en ligne par OpenJDK 21 sur Wandbox : types, conditions, boucles, méthodes, tableaux, textes et listes, classes, encapsulation, exceptions et gestion d’une boutique ;
   - *Terminal et Linux : les bases* (4 modules, 12 leçons, 48 exercices), dans un vrai Linux en ligne : fichiers, grep, tubes, redirections, scripts Bash, droits d’accès et analyse d’un journal de connexions ;
   - Git/GitHub (12 leçons, 48 activités, dont 32 ateliers Git locaux) ;
   - SQL (18 leçons, 72 exercices) avec SQLite réel et tableaux de résultats ;
   - JavaScript DOM (18 leçons, 72 exercices) : événements, formulaires et interfaces ;
   - React (18 leçons, 72 exercices) : composants, état, effets et projet interactif ;
  - le code s’exécute dans le navigateur, et l’élève a des indices gradués et des erreurs expliquées.
- **Parcours métiers** : développeur·se web front-end, back-end, full-stack, ingénieur·e logiciel, analyste de données et cybersécurité. Chaque parcours indique les métiers visés, ordonne les cours disponibles, montre leurs modules et annonce les étapes encore en préparation. Changer d’objectif conserve les brouillons et les positions de chaque cours.
- **Catalogue par domaine** : Web, langages de programmation et données, avec recherche et filtres.
- **Fiches de lecture HTML** : une leçon ou un cours, téléchargeables et imprimables sans connexion ; l’exécution du code reste dans Nunya.
- **Mes cours & examens** : révisions par classe et liens vers 492 documents officiels d’examen (CEPD, BEPC, BAC), consultés depuis leur source.
- **Mon avenir** : 15 parcours dans 13 domaines, 43 fiches métiers, études à l’étranger et opportunités.
- **Bibliothèque**
  - 42 cours Nunya en lecture libre ;
  - un explorateur de compétences ;
  - 11 181 ressources tierces : articles MDN et vidéos Khan Academy en français.
- **Nunya Aide** : assistant d’apprentissage par IA, qui donne des indices sans donner la solution, avec 15 questions par jour et par appareil.
- **Personnalisation facultative** : quelques questions au départ, que l’on peut passer et reprendre plus tard.

## Données et confidentialité

La progression, le profil et les notes restent **sur l’appareil** (localStorage et IndexedDB), sans compte. Ils peuvent être exportés et restaurés.

Sept ambiances visuelles se choisissent dès l’accueil ou dans « Mon profil & confort » : Nunya, Lagune, Kente, Sauge, Prune, Nuit et Verre liquide, chacune en clair et en sombre, avec un contraste vérifié automatiquement à la construction. Le verre liquide passe en version légère sur les téléphones modestes.

Deux fonctions utilisent un service en ligne. Les ateliers C++, Java et Terminal envoient le programme ou les commandes, les saisies de test et les fichiers fictifs de l’exercice au service Wandbox (Japon), sans pseudo ni progression. Nunya Aide utilise un serveur :
- une session anonyme Supabase (Union européenne) ;
- un modèle à poids ouverts *gpt-oss* hébergé par Groq (États-Unis) ;
- aucune question n’est enregistrée par Nunya.

Le détail est sur la page *Tes données, en clair* du site et dans [docs/AI_STRATEGY.md](docs/AI_STRATEGY.md).

## Développement

Prérequis : Node.js 22 et Python 3.

```sh
npm ci
npm run build          # prépare les contenus et produit dist/runtime/
python3 scripts/serve-test.py --port 4173   # puis http://localhost:4173
```

Contrôles, identiques à ceux de la CI :

```sh
npm run lint && npm run typecheck && npm test
npm run check:content && npm run check:academy
npm run lint:content && npm run check:prereqs && npm run check:curriculum-links && npm run test:code
```

**Organisation du dépôt :**
- `content/fr/` : sources des cours. Les leçons sont en Markdown, avec leurs exercices en JSON.
- `dist/` : le site statique servi tel quel, avec les sources JavaScript et CSS.
  - `dist/runtime/` est généré par `scripts/build-academy.mjs` : ne pas le modifier à la main.
- `supabase/` : la fonction serveur `nunya-aide` et les migrations de la base.
- `scripts/` : construction, imports et contrôles.
- `tests/` : tests Vitest.

**Contraintes à respecter :**
- le site fonctionne d’abord **hors ligne** ;
- le bundle principal reste sous **150 000 octets gzip** (`scripts/js-budget.mjs`) ;
- toute nouvelle page lourde se charge à la demande ;
- à chaque mise en ligne, on change la version du cache, dans `dist/sw.js` et dans la chaîne de versions de `scripts/build-academy.mjs`.

Les ateliers DOM/React et leurs limites sont décrits dans [docs/INTERACTIVE_WORKSHOPS.md](docs/INTERACTIVE_WORKSHOPS.md). React utilise une bibliothèque réelle ; son service asynchrone de démonstration reste explicitement simulé.

Les tests navigateur utilisent le sélecteur portable `lib/test/browser.mjs` : Chrome macOS ou Chromium Playwright. Voir `docs/COURSE_COVERAGE_AUDIT.md` pour les programmes disponibles, la relecture et les technologies encore à construire.

## Mise en ligne

Vercel construit et publie `main` automatiquement ([docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)). La fonction Supabase se déploie à part. Elle lit ses secrets dans *Edge Functions › Secrets* : `NUNYA_AI_KEY`, et en option `NUNYA_AI_MODELS` et `NUNYA_ALLOWED_ORIGINS`. Aucune clé ne doit figurer dans le dépôt ni dans `dist/`.

## Documentation

- [Décisions](docs/DECISIONS.md)
- [Revue du projet et actions à mener](docs/REVIEW_2026-11-04.md)
- [Prompt maître « Apprendre à Coder »](docs/PROMPT_MAITRE.md)
- [Stratégie IA](docs/AI_STRATEGY.md)
- [Sources et licences des contenus tiers](docs/SOURCES_AND_LICENSES.md)
- [Guide de rédaction](docs/CONTENT_STYLE_GUIDE.md) et [grille de relecture](docs/REVIEW_CHECKLIST.md)
- [Résultats des vérifications](docs/TEST_RESULTS.md)

## Droits et réutilisation

- **Code et contenus originaux de Nunya :** © les auteurs de Nunya, tous droits réservés. Le dépôt est public pour faciliter la relecture et le suivi du projet. Cela ne donne aucun droit de copier, modifier, redistribuer ou réutiliser le code ou les cours sans autorisation écrite.
- **Contenus tiers :** ils gardent leur propre licence et leur attribution. C’est le cas des articles MDN (CC BY-SA), des vidéos et descriptions Khan Academy (CC BY-NC-SA), des adaptations OpenLearn, du moteur Python Pyodide (MPL 2.0) et des bibliothèques comme CodeMirror et KaTeX (MIT). Le détail est dans [docs/SOURCES_AND_LICENSES.md](docs/SOURCES_AND_LICENSES.md).
- **« IA open source »** dans l’application désigne les modèles d’IA à poids ouverts utilisés par Nunya Aide, pas le projet Nunya.

## Contribuer

Les contributions se font **sur invitation**. Pour proposer une correction ou relire des cours, ouvre d’abord une *issue* sur GitHub, sans nom d’élève ni donnée personnelle : l’équipe te répondra. Les règles de rédaction et de relecture sont dans [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
