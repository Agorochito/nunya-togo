# Nunya — apprendre en français au Togo

[Site public](https://nunya-togo.vercel.app/) · [Programme Python](https://nunya-togo.vercel.app/#/apprendre/python-bases) · [Première leçon](https://nunya-togo.vercel.app/#/apprendre/python-bases/m1/py-m1-01)

## Version 5.5.0 — modules et pratique dans chaque cours

Les 42 unités de découverte possèdent 91 modules et 562 questions. Le bouton suivant distingue une question, un exercice et une leçon ; il conserve la position, les réponses et le travail existant.

Le catalogue de code propose Python (12 modules, 53 leçons, 212 exercices), HTML et CSS (12 leçons et 48 exercices chacun), et une première série JavaScript (6 leçons, 24 exercices ; suite en préparation). Les ateliers HTML/CSS ont un vrai aperçu avec contrôles du DOM et des styles. Python vérifie aussi les valeurs retournées, les copies et les cas limites ; JavaScript s’exécute dans son propre Worker.

Les collections de la bibliothèque se filtrent par unité avec un lien partageable. Les téléchargements suivent la révision du cours afin de ne pas mélanger un programme récent et un ancien fichier hors ligne. Le cache est `nunya-v5.5.0`.

**Le catalogue complet sur trois niveaux n’est pas terminé.** Git/GitHub et SQL restent des introductions courtes ; Node.js, HTTP et les autres cours approfondis sont à construire. [Couverture exacte et suite des lots](docs/COURSE_COVERAGE_AUDIT.md). Les contenus sont en relecture ; aucun diplôme accrédité n’est promis.

Le niveau 0 Découverte (20 leçons, 80 activités) et les ajouts du collaborateur sont conservés. La personnalisation et son diagnostic sont facultatifs ; les liens partagés ouvrent directement les cours. Les sauvegardes v1/v2 et de code restaurent les progrès Python et Découverte. Les validations restent distinctes de la consultation libre.

Les sections de version suivantes décrivent l’historique, pas les compteurs actuels.

## Version 5.4.0 — Nunya Aide

Assistant d’apprentissage par IA open source (Groq, modèles à poids ouverts gpt-oss), sans compte : il explique autrement, donne des exemples et des indices sans solution complète. Accessible depuis chaque page et dans les leçons. Fonction serveur `supabase/functions/nunya-aide/`, réglages et activation dans [docs/AI_STRATEGY.md](docs/AI_STRATEGY.md).

## Version 5.3.0 — niveau 0 « Découverte du numérique » (brouillon)

Nouveau cours d’entrée, sans prérequis ni code à écrire : [programme](https://nunya-togo.vercel.app/#/apprendre/decouverte). 4 modules, 20 leçons de 8 à 10 minutes : appareils, Internet et le web, fichiers et sécurité, logique de programmation. Chaque leçon a 4 activités corrigées et « Explique avec tes mots », gardé sur l’appareil. Contenu en `content/fr/decouverte/`, vérifié et généré par `scripts/prepare-discovery.py` pendant `npm run build`. Tout est en relecture : voir [le plan du niveau 0](docs/NIVEAU0_PLAN.md). Cache `nunya-v5.3.0`.

## Version 5.2.0 — interface revue sur téléphone

Corrections d’interface du 3 novembre 2026, vérifiées sur téléphone (360 px) et ordinateur, en thème clair et sombre :

- Barre du bas : **Accueil · Coder · Mes cours · Mon avenir · Plus**. La loupe place le curseur dans le champ de recherche.
- Leçons : premier écran compact, résultat de « Vérifier mon code » ramené à l’écran, mini-quiz avec de vraies cartes de réponse.
- Test d’accueil : le domaine « Programmation & données » mène au cours **Python : les bases** ; les résultats s’affichent en mots (Bases solides, En progrès, À découvrir), sans pourcentage. Un seul test de départ ; les modules se valident avec leur test de 5 questions.
- L’ancien cours court « Premiers pas avec Python » n’apparaît plus dans les listes ; ses liens mènent au nouveau programme.
- Une seule palette (couleur d’accent) partout, y compris le test de départ en thème sombre ; plus de restes du thème vert.
- Textes revus (Mon avenir, Aide, leçon 1, apostrophes typographiques, message « Moins de 13 ans » affiché dès le choix).
- Version du cache du service worker : `nunya-v5.2.0`. Les téléphones qui ont déjà ouvert Nunya reçoivent la mise à jour au rechargement suivant.

Détails et preuves : [historique](CHANGELOG.md), [résultats](docs/TEST_RESULTS.md), [décisions](docs/DECISIONS.md).

## Version 5.1.0 — programme depuis zéro

Trois entrées : **Apprendre à coder**, **Mes cours & examens**, **Mon avenir**. Le nouveau cours Python comprend les modules 1 à 4 : 22 leçons originales en français, 7 301 mots d’explication, 44 exemples avec traces, 88 exercices de code et 66 questions. Les quatre projets et points d’étape font partie de ces modules. Les modules 5 à 10 et les autres langages restent explicitement en préparation ; ce n’est pas encore le cours Python complet de 25–30 heures.

Les leçons associent lecture et atelier CodeMirror. Pyodide s’exécute dans un Worker local, avec saisies simulées, tests visibles et autres cas, indices gradués, erreurs expliquées, arrêt et console bornée. Le moteur facultatif s’enregistre séparément pour le hors ligne. Aucune limite stricte de mémoire n’est garantie par le navigateur.

À la première visite, un accueil guidé demande le domaine, un prénom ou pseudo facultatif, une tranche d’âge, la situation scolaire et l’expérience. La navigation reste inaccessible jusqu’à la fin du test ; les moins de 13 ans voient une information adaptée et ne poursuivent pas le parcours. Dix questions adaptatives évaluent le domaine choisi et le raisonnement-déduction. Le bilan recommande l’un des parcours disponibles et son point de départ selon le plus faible des deux résultats : sous 35 %, consolider les premières notions ; de 35 à 70 %, pratiquer les bases ; au-dessus de 70 %, approfondir. Le parcours reste progressif : ses points d’étape vérifient les acquis avant de débloquer la suite. Il s’agit d’une recommandation de départ, pas d’une génération de cours différente ni d’une note scolaire. Le profil, les réponses et la progression restent sur l’appareil, sans compte ni collecte distante. Lire un chapitre et répondre correctement à son mini-quiz permet de continuer, avec des essais illimités. Pour un module déjà connu, un test de cinq questions le valide à partir de quatre bonnes réponses. La recherche classe cours, leçons, parcours et ressources, accepte les accents et certaines fautes.

Chaque leçon Python comporte une question de compréhension de fin de chapitre, une réponse personnelle facultative et une explication de référence statique. Les questions sont adaptées au contenu de chaque chapitre ; réponses et textes restent enregistrés localement. Aucune correction par IA n’est utilisée.

Source des nouvelles leçons : `content/fr/python-bases/<module>/*.md`, exercices JSON voisins. Les fichiers de `data/curriculum` et `dist/data/curriculum` sont générés par `scripts/prepare-curriculum.py`. Aucun doublon de source de rédaction. Les trois parcours métiers techniques référencent ce programme. Les anciennes notices et unités courtes restent des repères à migrer, pas des cours complets équivalents.

Tous les nouveaux contenus sont des brouillons : `status:brouillon`, `reviewer:null`. Contrôles automatiques réussis ; relecture humaine et essais avec des débutants encore nécessaires. Voir [audit](docs/AUDIT_V2.md), [résultats](docs/TEST_RESULTS.md), [style](docs/CONTENT_STYLE_GUIDE.md) et [relecture](docs/REVIEW_CHECKLIST.md).

```sh
npm ci
npm run build
npm run lint
npm run typecheck
npm test
npm run lint:content
npm run check:prereqs
npm run test:code
npm run check:curriculum-links
```

Le build utilise Node et Python 3. Les tests navigateur utilisent Chrome local macOS : adapter `executablePath` sur une autre machine. `npm run check-links` ajoute le contrôle de disponibilité des sources institutionnelles ; `--all` sur `check:links` inclut toute la bibliothèque. Un statut HTTP ne garantit pas la lecture d’une vidéo ni un certificat gratuit.

## Fonctions et ressources conservées


[Ouvrir le site](https://nunya-togo.vercel.app) · [Dépôt public](https://github.com/Agorochito/nunya-togo)

Apprendre en français, réviser ses cours et explorer des métiers, d’abord pour les lycéens, puis les étudiants. Les élèves plus jeunes restent une étape ultérieure du déploiement, même si les classes du primaire et le CEPD sont modélisés.

## Démarrer et vérifier

Le dossier dist/ est prêt à servir. Après modification du JavaScript/CSS, exécuter `npm run build`. Pour servir dist/ : `python3 -m http.server 4173 --directory dist`. Ouvrir http://localhost:4173. HTTPS ou localhost est nécessaire au service worker. Les outils de développement utilisent `npm ci`, puis `npm run lint`, `npm run typecheck`, `npm test` et `npm run check:content`.

## Fonctions du pilote

- 42 cours guidés : 40 originaux et 2 adaptations françaises partielles OpenLearn ; 182 leçons avec articles, exemples, raisonnement pas à pas et QCM. Contenus à relire par des enseignants.
- 11 181 ressources tierces réelles : 7 066 articles français MDN lisibles dans Nunya et 4 115 vidéos françaises Khan Academy, dédupliquées. Recherche, sujets, formats, niveaux et pagination.
- Mathématiques, physique, chimie, SVT, économie, numérique ; parcours guidés aussi en langues, humanités, commerce, agriculture, santé, transport, énergie, design, télécoms, finance numérique, éducation, environnement et bâtiment. La profondeur varie selon les domaines.
- 13 domaines métiers, 30 chemins composés de cours ouvrables dans Nunya, avec références institutionnelles togolaises et matières scolaires associées.
- Mes cours / Mon avenir ; profil, classe et série ; 492 documents officiels consultables depuis le site : CEPD 64, BEPC 118, BAC I 282, Terminale / préparation BAC II 28. Ces derniers sont des compositions régionales et corrigés, distincts des annales nationales.
- Lancement centré sur l’informatique : études à l’étranger, opportunités et portfolio sont masqués par défaut ; les autres domaines sont indiqués « bientôt ». Les interrupteurs réversibles sont dans `dist/feature-flags.js`.
- Deux parcours ciblés de Terminale en analyse et mécanique, inspirés des rubriques du portail officiel. Couverture partielle, à relire ; pas un programme complet garanti.
- Espace de ressource : lecteur vidéo facultatif, texte, étapes et pratique dans une même page. Articles MDN complets découpés en sections. Les vidéos utilisent leur présentation française et, pour 1 267 vidéos, une fiche de notion associée parmi 61 fiches originales avec QCM corrigé. Les autres proposent une pratique écrite avec repère et auto-évaluation ; pas de transcription intégrale ni de correction automatique inventée. Miniatures YouTube chargées à la demande dans le catalogue.
- Éditeur et résultat dans les leçons Python, JavaScript et HTML/CSS ; aucun onglet de code global. Dans les articles MDN, un éditeur contextualisé permet d’essayer un exemple. SQL, pseudocode, dépendances et input() ne sont pas exécutés par le pilote.
- Python local facultatif (~12 Mo), JavaScript dans un Worker éphémère, HTML en iframe sandbox sans script ni réseau. Arrêt des boucles : Python 8 secondes après démarrage, JavaScript 2 secondes. Aucune limite stricte de mémoire WASM garantie.
- Accueil obligatoire à la première visite ; test adaptatif de 10 questions sur le domaine choisi et le raisonnement, bilan local et parcours conseillé. Les questions et le niveau de départ s’adaptent aux réponses ; les leçons et parcours disponibles restent les mêmes pour tous.
- Progression séquentielle, mini-tests pour sauter les acquis, notes, révisions espacées et carnet d’erreurs.
- Palette complète (fonds, cartes et textes) coordonnée à une seule couleur en clair et sombre ; cuivre par défaut. Couleur d’accent personnalisable dans les réglages (préréglages et code hexadécimal), thème sombre, taille de texte, police espacée, voix française locale si installée, profils locaux séparés et glossaire FR/EN.
- 13 mini-projets liés aux domaines, portfolio local, canevas et simulation de budget. Activités originales fondées sur l’analyse de 9 plateformes et organismes togolais, dont ADACE/FAIEJ, AED/IFAD et FOCEN.
- Deux adaptations françaises partielles de cours gratuits OpenLearn : électronique et préparation de projet. Cours source en anglais, attribution visible ; aucune traduction complète, attestation ou certification Open University revendiquée.
- Données locales : IndexedDB et compatibilité localStorage. Export/restauration JSON, partage de parcours originaux par fichier, avis anonymes locaux exportables. Aucun compte ni serveur de données actif.
- Ouverture directe des notices sans charger tout le catalogue ; index compact de 1,08 Mo au lieu de 3,72 Mo. Cœur hors ligne, fiches vidéo et articles enregistrables et moteur Python facultatif enregistrable. Les vidéos et PDF distants ne sont pas téléchargés par Nunya. L’iframe PDF dépend du navigateur ; le lecteur de l’IAB est resté vide lors du test, donc une ouverture directe du document officiel reste proposée.

## Tester avec des élèves

Pour vérifier l’accueil de première visite, effacer les données du site dans le navigateur ou utiliser un profil vierge, puis recharger : l’accueil personnalisé doit apparaître avant les autres rubriques. Choisir un domaine, compléter le profil et le test de 10 questions ; vérifier que le bilan montre les résultats de compréhension et de déduction, recommande un point de départ, puis ouvre bien le parcours conseillé. Refaire le test avec des réponses différentes pour comparer les recommandations. Les réponses et le profil étant enregistrés localement, un rechargement reprend l’étape enregistrée ; effacer les données réinitialise le parcours.

Pour le reste du pilote, ouvrir le site avec une connexion ; choisir un parcours scolaire ou métier ; lire puis pratiquer sans vidéo ; ouvrir éventuellement une vidéo ; exécuter une petite modification de code dans une leçon de programmation ; enregistrer un parcours et un article ; activer le mode avion et rouvrir le même site dans le même navigateur ; vérifier les progrès après rechargement. Exporter un avis pour le remettre à l’équipe et conserver une sauvegarde de progression.

Les profils locaux sont pratiques sur un appareil partagé, mais ne sont pas des comptes protégés par mot de passe. Les avis ne sont pas automatiquement transmis. Les téléchargements doivent être recréés sur un nouvel appareil. L’éviction des données du navigateur reste possible ; exporter régulièrement.

## Préparation de la suite

Le propriétaire a demandé une base locale pour commencer. Aucune infrastructure payante n’a été créée. Le schéma Supabase, les politiques RLS et le contrat serveur d’aide IA sont préparés, sans activation ni clé. Le guide actuel donne des indices prédéfinis et ne se présente pas comme une IA. Une migration doit préserver les profils et exiger une vraie confirmation serveur avant d’indiquer une synchronisation.

Les outils d’équipe dans tools/ et scripts/generate-exercise.mjs produisent uniquement des brouillons locaux à valider, sans interface d’administration publique. Voir docs/DECISIONS.md, docs/OFFLINE_PLAN.md, docs/VERIFICATION_CHECKLIST.md et docs/SOURCES_AND_LICENSES.md.

Après chaque modification déployée, changer la version du cache dans dist/sw.js. Les packs explicitement enregistrés sont préservés lors de la mise à jour du cœur.

## Académie 5.0.2

Deux espaces : Mes cours & examens et Mon avenir. Quinze parcours dans treize domaines, 43 métiers documentés, quatre destinations d’études et neuf portes d’entrée d’opportunités. Trois initiations approfondies et douze découvertes courtes, toutes à relire. Le nombre de séances réassemblées n’augmente pas artificiellement les cours uniques.

Dans Bibliothèque → Explorer les compétences : douze thèmes, 91 collections ou références de cours, sources et langues visibles. Les accompagnements originaux français incluent lecture, étapes et pratique ; les vidéos sont facultatives. LearnFree et Class Central ne sont pas aspirés ou traduits intégralement. Voir `docs/SOURCES_AND_LICENSES.md`.

Construire : `npm ci`, `npm run build`. Vérifier : `npm run lint`, `npm run typecheck`, `npm test`, `npm run check:content`, `npm run check:academy`. Les scripts navigateur utilisent Chrome local sur macOS ; adapter `executablePath` sur une autre machine avant de les lancer. `npm run check:links -- --all` contrôle aussi les URL de la bibliothèque et conserve un rapport ; ce n’est pas un test de lecture de toutes les vidéos.

Publier sur Vercel : voir [le guide](docs/DEPLOY_VERCEL.md). `vercel.json` fournit le build et le dossier `dist`, aucune clé ni base externe requise. Contribuer : voir [CONTRIBUTING](docs/CONTRIBUTING.md), [résultats](docs/TEST_RESULTS.md) et [travail restant](docs/CONTENT_TODO.md). Les contenus tiers conservent leurs licences ; aucune licence unique ne remplace les attributions MDN, Khan Academy, OpenLearn ou Pyodide.
