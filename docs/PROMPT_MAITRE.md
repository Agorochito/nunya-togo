# NUNYA — Prompt maître pour Claude Code

## Refonte de « Apprendre à Coder » : catalogue, parcours et apprentissage interactif en français

Version 1.1 : 4 novembre 2026. Version 1.0 du 3 novembre (auteur : collaborateur du propriétaire), complétée par la section 0 après inspection du dépôt et décisions du propriétaire. Livrable : instructions de réalisation, sans implémentation du site.

### Mode d’emploi pour le propriétaire de Nunya

Transmets ce fichier entier à Claude Code dans le dépôt de Nunya. Tu peux aussi joindre les captures d’origine si elles sont disponibles sur l’ordinateur de ton ami. Le document reste exploitable sans elles : leurs caractéristiques utiles sont décrites dans l’annexe A. La première tâche de Claude Code consiste à comprendre l’existant ; aucune technologie, base de données ni fonctionnalité existante n’est présumée ici.

Le texte entre « DÉBUT DU PROMPT » et « FIN DU PROMPT » constitue la consigne complète. Il décrit le produit final et son exécution par lots. Un premier lot terminé ne signifie pas que toute la vision est réalisée. La couverture restante doit rester visible dans les documents de suivi.

Les durées proposées sont des hypothèses éditoriales à calibrer, pas des promesses de maîtrise. Les seuils pédagogiques, règles de récompense et priorités ci-dessous sont des choix proposés pour rendre la demande exécutable ; ils restent configurables. Le français, l’identité Nunya, les niveaux progressifs, la pratique intégrée et les recommandations sont des exigences centrales.

---

# DÉBUT DU PROMPT

## 0. Contexte réel de Nunya et décisions du propriétaire (v1.1, 4 novembre 2026)

Cette section a été ajoutée après l’inspection du dépôt. **En cas de contradiction avec les sections suivantes, elle prévaut.** Les sections 1 à 26 restent valables pour tout le reste.

### 0.1 Public et positionnement

- Nunya est conçu au Togo et pensé d’abord pour les jeunes Togolais, mais il s’adresse à **tous les francophones**. Les exemples peuvent venir de contextes francophones variés ; des repères locaux (FCFA, villes, situations du quotidien) restent bienvenus.
- Les cours, progressions et validations **ne s’appuient pas sur un système d’enseignement national** (ni togolais, ni autre). Aucune autorisation ministérielle n’est requise pour « Apprendre à Coder ». L’espace « Mes cours & examens » (documents officiels togolais) existe déjà : ne le modifie pas dans cette mission.
- Âge minimum : 13 ans (décision existante). Les contenus et l’assistant IA doivent donc rester adaptés à des mineurs.

### 0.2 Ce qui existe déjà : ne pas le refaire

- **L’audit du lot 0 est fait** : lis `docs/REVIEW_2026-11-04.md`, `docs/DECISIONS.md` et `CHANGELOG.md` avant toute chose. Ne recommence pas l’état des lieux ; vérifie seulement ce qui a changé depuis.
- Application statique et hors ligne (PWA, service worker), sans framework : sources JavaScript dans `dist/*.js`, regroupées par `scripts/build-academy.mjs` (esbuild). Pas de React, pas de Next.js.
- **Python : les bases**, modules 1 à 4 (22 leçons, 88 exercices) dans `content/fr/python-bases/`, avec éditeur CodeMirror, Pyodide dans un Worker, tests visibles et cachés, indices et erreurs expliquées. Les modules 5 à 10 manquent.
- **Découverte du numérique** (niveau 0, 20 leçons) dans `content/fr/decouverte/` : c’est le point d’entrée « Découvrir la programmation » du §11.
- 42 cours courts plus anciens, désormais tous lisibles librement dans la bibliothèque (`#/bibliotheque/cours`) ; 11 000 ressources MDN et Khan Academy ; explorateur de compétences.
- Nunya Aide (assistant IA, Groq, fonction Supabase `nunya-aide`), déployé mais pas encore activé ; voir `docs/AI_STRATEGY.md`.
- Tout le contenu est en statut `brouillon`, `reviewer: null`.

### 0.3 Contraintes techniques non négociables

- **Hors ligne d’abord**, pour des téléphones Android d’entrée de gamme et des données mobiles chères. Le hors-ligne n’est pas une amélioration « progressive » : il ne doit jamais régresser.
- **Budget JavaScript** du bundle principal : 150 000 octets gzip (`scripts/js-budget.mjs`), vérifié en CI. Toute nouvelle page ou fonction se charge à la demande, sur le modèle de `runtime/aide-panel.js`, `runtime/discovery-views.js` et `runtime/library-views.js`, et doit être ajoutée à la liste de précache de `dist/sw.js`.
- **Pas de comptes ni de synchronisation à ce jour** : la progression reste sur l’appareil (localStorage / IndexedDB, export JSON). Les fonctions qui supposent un compte dans ce document (synchronisation entre appareils, tests privés côté serveur, XP vérifiés par un serveur, classements) sont **reportées**. Les XP, séries et badges sont calculés localement ; sans classement public, aucune protection anti-triche n’est nécessaire.
- **Langages exécutables** : seuls ceux qui tournent dans le navigateur et hors ligne entrent dans le catalogue publié (aujourd’hui Python, JavaScript, HTML/CSS ; SQL possible avec un moteur WebAssembly comme sql.js, à évaluer). Java, C, C++, C#, Go, Rust, Swift, Kotlin, Ruby, PHP, Scala, Perl, R, Dart, Lua, MATLAB et Haskell restent dans la matrice cible du §10 mais **ne sont pas planifiés** tant que la matrice de capacités (§9) n’a pas trouvé de moteur réel. Pas de faux terminal ni de faux compilateur.

### 0.4 Programme personnalisé et questionnaire facultatif

- « Apprendre à Coder » propose un **programme personnalisé** pour les débutants et pour ceux qui le souhaitent : 3 à 5 questions (expérience, objectif, temps disponible), comme au §5.
- Le questionnaire **peut toujours être passé** (« Passer et choisir moi-même »). Passer ne bloque aucune page et ne pénalise rien. Le test d’accueil actuel de 10 questions, obligatoire, qui bloque toute la navigation (`dist/onboarding-flow.js`) doit devenir facultatif, conserver les liens partagés (deep links) et proposer « J’ai déjà une sauvegarde ».
- Le programme personnalisé est une **recommandation d’ordre**, jamais un verrou : tous les cours restent consultables.

### 0.5 Références d’organisation

- GeeksforGeeks (tutoriel HTML), TutorialsPoint et OpenClassrooms (catalogue français) servent de **références de structure** : catégories, programmes détaillés par notion, filtres, articles reliés aux cours. Les règles du §23 s’appliquent : aucun texte, exercice, visuel ou nom de cours repris.
- Les captures d’origine de l’interface Nunya sont dans `docs/screenshots/`.

### 0.6 Bibliothèque, études à l’étranger et opportunités

- La bibliothèque garde les deux usages : **programmes guidés** et **lecture libre** (« Tous les cours Nunya »). Quand un cours ancien est remplacé par un programme plus complet, la carte renvoie vers ce programme, comme pour Python.
- « Études à l’étranger » et « Opportunités » sont réouvertes avec leurs fonctions existantes. Leur contenu reste daté, sourcé et marqué « non officiel ».

### 0.7 Ordre de réalisation (remplace le lot 0 et précise le lot 1 du §24)

1. **Corriger les défauts connus** relevés dans la revue avant d’ajouter des écrans :
   - le service worker enregistre n’importe quelle page visitée comme page d’accueil hors ligne ;
   - les cours enregistrés hors ligne ne sont jamais mis à jour ;
   - `navigator.storage.persist()` n’est jamais appelé ;
   - la restauration d’une sauvegarde perd la progression Python et Découverte ;
   - les réponses des quiz et du test de placement ne sont pas mélangées ;
   - 36 exercices sur 88 se valident en affichant simplement le texte attendu.
2. **Questionnaire facultatif et programme personnalisé** (0.4), sur les contenus existants.
3. **Terminer Python débutant** : modules 5 à 10, projet de synthèse (§12) et révision espacée (§18).
4. **HTML, CSS et JavaScript débutant** au même niveau de profondeur, puis le parcours front-end.
5. Le reste du §24 ensuite, sans ouvrir de cours vide.

### 0.8 Relecture humaine

Aucun cours n’est présenté comme validé sans relecteur nommé (nom, rôle, date). Les contrôles automatiques ne remplacent pas une relecture par un enseignant ni un essai avec de vrais débutants.

### 0.9 Pistes à concevoir, pas à construire maintenant

- **Espace équipes et projets.** Il demande des comptes, une protection des données de mineurs et de la modération. Prépare une conception avant tout code :
  - équipes créées par un enseignant, un animateur ou un club, sur invitation par code ;
  - aucun profil public ni messagerie libre au départ ;
  - travail organisé par projet : énoncé, rôles, tâches, livrables, commentaires liés aux tâches et bouton de signalement ;
  - données sur Supabase avec RLS par appartenance à l’équipe.

  En attendant, une version locale reste possible : un « kit de projet d’équipe » (énoncé, rôles, liste de tâches, grille d’évaluation) exportable et partageable par fichier, sans serveur.
- **Actualités et nouveautés tech.** Pas de flux automatique (fraîcheur, droits sur les textes, modération, besoin d’un serveur). Si la rubrique est retenue : une sélection éditoriale datée, avec titre, résumé original, lien vers la source et lien vers le cours Nunya concerné, publiée par l’équipe dans un fichier JSON versionné.


## 1. Mission et résultat attendu

Tu interviens sur un projet existant nommé **Nunya**. Tu combines les responsabilités de développeur expérimenté, concepteur de produit éducatif, designer d’interface et auteur pédagogique francophone. Ta mission est de transformer l’espace **« Apprendre à Coder »** en une plateforme cohérente permettant de découvrir une technologie, comprendre ses notions, pratiquer dans le navigateur, construire des projets et choisir une suite adaptée à son niveau et à ses objectifs.

Le problème actuel, tel que décrit par le propriétaire, est un ensemble de cours insuffisamment organisé, peu approfondi et limité dans son accompagnement et sa présentation. Vérifie cet état dans le dépôt : ce constat utilisateur ne prouve pas la structure technique actuelle.

Le résultat doit permettre à un débutant de répondre simplement à ces questions : « Par quoi commencer ? », « Que vais-je apprendre ? », « De quoi ai-je besoin ? », « Où en suis-je ? », « Pourquoi mon programme échoue-t-il ? » et « Que faire ensuite ? ».

Construis une expérience colorée et accueillante, avec une vraie profondeur pédagogique. La qualité d’un cours se mesure par les capacités acquises et vérifiées, pas par le nombre de cartes affichées. Nunya doit proposer ses propres explications, exercices, projets et repères visuels. Les sites de référence fournissent des idées d’organisation ; leurs textes, illustrations, marques et évaluations ne doivent pas être repris comme contenu Nunya.

Précision du propriétaire : les cours peuvent combiner une création originale et des éléments externes dont la réutilisation est effectivement autorisée. L’objectif est de retrouver une structure aussi claire et un contenu aussi complet que les références, puis d’enrichir l’apprentissage pour le public Nunya. Il n’est pas demandé de tout réinventer ni de recopier un site. Utilise les connaissances techniques communes et les documentations fiables pour concevoir une progression originale. Tout texte, visuel, vidéo ou exercice repris directement doit avoir une provenance et des conditions compatibles avec l’usage prévu ; une traduction ou une mention de source ne remplace pas à elle seule cette vérification. Les principes détaillés figurent en section 23.

Les cours, parcours, articles, consignes, indices, corrections pédagogiques, notifications et interfaces destinés aux apprenants doivent être en français. Les mots-clés du langage et les noms officiels de technologies conservent leur orthographe. Le contenu doit rester compréhensible par une personne qui ne connaît pas encore l’anglais technique.

## 2. Commencer par un audit du projet réel

Avant toute modification, lis les instructions du dépôt et inspecte son organisation. Identifie les composants, routes, styles, modèles de données, mécanismes d’authentification, contenus, tests et services déjà présents. Observe les changements non validés et protège le travail en cours du collaborateur. Ne supprime, n’écrase et ne réinitialise aucun travail pour faciliter la refonte.

Recherche notamment la route associée à « Apprendre à Coder », la provenance des cours, les relations entre chapitres et exercices, la persistance de la progression, l’existence éventuelle d’un éditeur et les rôles d’administration. Vérifie les dépendances réellement utilisées et leurs versions installées. Ne présume ni React, ni Next.js, ni Supabase, ni une solution d’exécution de code particulière.

Produis d’abord un état des lieux court comprenant : ce qui existe et fonctionne ; ce qui existe partiellement ; ce qui manque ; les contraintes techniques observées ; les adaptations proposées. Décris les fichiers ou zones concernés. Préserve la navigation générale, l’identité visuelle et les autres espaces de Nunya, sauf adaptation indispensable et explicitement expliquée.

Si le dépôt n’est pas accessible, fournis uniquement un diagnostic des informations manquantes et le plan d’intégration. Ne prétends pas avoir inspecté ou modifié un projet absent. Si un choix coûteux, une nouvelle dépendance commerciale ou une migration irréversible devient nécessaire, prépare une proposition concrète et demande la décision avant cette action. Les choix ordinaires et réversibles peuvent avancer en respectant l’existant.

Ne transforme pas cette mission en réécriture générale. Réutilise les bons composants. Refactorise là où cela réduit réellement la duplication ou permet la progression pédagogique. Les chemins de fichiers de suivi suggérés dans ce document doivent être adaptés aux conventions du dépôt.

## 3. Périmètre, hypothèses et exigences non négociables

Le périmètre principal couvre le catalogue, les pages par technologie, les parcours par domaine, les fiches de cours, les programmes détaillés, les leçons, les exercices interactifs, les projets, le suivi personnel, les recommandations, les récompenses et les outils d’édition pédagogique.

Le public est francophone, du débutant complet à l’apprenant avancé. Ne limite pas implicitement le produit à un pays, un âge ou un type d’établissement. Des exemples issus de contextes francophones variés sont bienvenus : associations, commerces, études, culture, environnement, sport et services numériques. Les données d’exercice sont fictives et leur caractère fictif est indiqué.

Le modèle économique n’est pas fourni. Conserve celui du projet s’il existe ; sinon, n’invente ni paiement, ni abonnement, ni prix. De même, n’invente ni formateur célèbre, ni partenariat, ni nombre d’inscrits, ni avis, ni popularité mesurée. Une attestation interne Nunya ne doit jamais être présentée comme un diplôme accrédité.

La demande finale porte sur plusieurs technologies et niveaux, avec des spécialisations. Il faut donc une architecture de contenus extensible et un plan de couverture complet. Cela ne justifie pas de publier des milliers de leçons superficielles. Chaque cours publié doit être achevé et vérifié ; chaque cours non achevé reste explicitement en préparation. La livraison par lots est obligatoire pour maîtriser la qualité, mais ne réduit pas la cible finale.

## 4. Architecture pédagogique : ce qui est un cours, un parcours ou un article

Adopte la hiérarchie suivante et rends-la cohérente dans l’interface et les données.

| Élément | Fonction dans Nunya | Exemple |
|---|---|---|
| Domaine | Objectif général ou famille de compétences | Développement web, cybersécurité défensive, données et IA |
| Technologie | Langage, format, outil ou environnement identifiable | Python, HTML, CSS, React, Node.js |
| Parcours | Suite ordonnée de cours et projets orientée vers un objectif | Construire une première application web complète |
| Cours | Ensemble cohérent avec niveau, objectifs et évaluation finale | Python — les fondamentaux |
| Module | Groupe de notions contribuant à une capacité | Concevoir et utiliser des fonctions |
| Leçon | Explication courte et activité sur une notion précise | Distinguer un paramètre d’un argument |
| Exercice | Vérification active d’une capacité | Compléter une fonction à partir d’un contrat |
| Atelier | Mise en pratique guidée de plusieurs notions | Construire un convertisseur d’unités |
| Projet | Production plus autonome évaluée avec une grille | Développer un gestionnaire de réservations |
| Article ou guide | Ressource autonome consultable au besoin | Comprendre une erreur d’indice en Python |
| Fiche de référence | Aide concise liée à une notion | Choisir entre liste, dictionnaire, ensemble et tuple |

Une même technologie peut servir plusieurs domaines. Un cours commun doit être référencé dans plusieurs parcours sans être dupliqué. L’apprenant conserve ses acquis lorsqu’il change de parcours. Les versions de contenus doivent permettre d’ajouter un chapitre sans effacer son historique.

HTML est un langage de balisage, CSS un langage de styles, React une bibliothèque et Node.js un environnement d’exécution. Ne les présente pas tous comme des langages de programmation. Propose une entrée « Technologies » ou « Langages et outils » assez claire pour accueillir ces différences.

## 5. Navigation et page d’accueil « Apprendre à Coder »

Conserve le libellé « Apprendre à Coder ». Cet espace propose des entrées explicites : **Découvrir**, **Tous les cours**, **Parcours**, **Pratiquer**, **Articles et guides** et, pour les utilisateurs concernés, **Ma progression**. Réutilise le système de navigation existant au lieu de superposer une seconde navigation générale.

La page d’accueil présente dans cet ordre logique : une introduction courte avec recherche ; une orientation « Je débute » ; une reprise de l’apprentissage si un historique existe ; les parcours par objectif ; les technologies ; une sélection éditoriale ; une pratique du jour ; les guides utiles. L’ordre peut s’adapter à l’écran et à l’état de connexion, mais l’accès à un premier cours doit rester évident.

Un débutant voit une proposition simple : « Tu ne sais pas par où commencer ? Découvre les bases, puis choisis Python ou le développement web. » Propose une orientation facultative de trois à cinq questions sur son expérience, son objectif et le temps qu’il souhaite consacrer. Permets de la passer. Ce questionnaire ne prétend pas établir une aptitude professionnelle et n’enferme jamais la personne dans un parcours.

L’utilisateur ayant déjà commencé voit « Reprendre ma leçon », le titre exact du cours, la prochaine activité utile et sa progression réelle. Le bouton revient au dernier état enregistré. Si aucune activité n’existe, affiche une invitation adaptée plutôt qu’un pourcentage inventé.

Utilise une grille lisible pour le catalogue complet. Des rangées horizontales peuvent servir à découvrir quelques sélections, mais elles ne doivent pas cacher la majorité des cours ni imposer le défilement horizontal sur téléphone. Chaque rangée offre « Tout voir ». Les flèches restent accessibles au clavier et les cartes ne se déplacent pas automatiquement.

## 6. Catalogue : recherche, filtres et cartes

Le catalogue doit être réellement navigable avec des centaines de cours sans devenir une longue page désordonnée. La recherche porte sur le titre, la description, les compétences et les technologies associées. Tolère les accents, la casse et des variantes fréquentes telles que « JS », « JavaScript », « API REST » et « REST ». N’assimile pas Java à JavaScript.

Les filtres comprennent : niveau ; technologie ; domaine ; objectif ; format ; durée indicative ; état personnel si connecté. Les niveaux sont « Débutant », « Intermédiaire » et « Avancé ». Le format distingue cours, atelier, projet et guide lorsque ces ressources partagent une même recherche. Un filtre « Disponible » permet de distinguer les contenus publiés de la feuille de route.

Pour les filtres multisélections, applique un OU à l’intérieur d’une famille et un ET entre familles. Par exemple, Python OU JavaScript, combiné à Débutant ET moins de cinq heures. Affiche les filtres actifs sous forme de libellés supprimables, le nombre de résultats, « Tout effacer » et un état vide proposant de modifier la recherche. Conserve les paramètres dans l’URL ou le mécanisme de navigation adapté pour permettre le retour arrière et le partage.

Propose un tri par pertinence, ordre conseillé, mise à jour et durée. « Populaire » ou « Tendance » n’est disponible que si des données et une méthode définie l’étayent. Sinon, écris « À découvrir » ou « Sélection Nunya ». Distingue une date de révision technique d’une date de création.

Chaque carte affiche un titre français précis, une phrase d’objectif, la technologie, le niveau, les prérequis essentiels, une durée indicative et un bouton cohérent : « Découvrir le cours », « Commencer » ou « Reprendre ». Les modules et exercices annoncés sont comptés depuis les contenus réels. Une progression personnelle apparaît uniquement si elle est connue.

Prévois une illustration ou icône cohérente, un accent de couleur par famille et un état survol/focus. Les cartes restent alignées malgré des titres de tailles différentes. Évite les grandes zones vides, les textes tronqués indispensables et les boutons de hauteur variable. Affiche trois ou quatre colonnes selon l’espace disponible, puis deux et une colonne, sans sacrifier la lisibilité pour respecter un nombre fixe.

La durée doit exprimer ce qui est inclus. Une initiation de deux heures peut faire découvrir des notions et réaliser un petit exercice ; elle ne promet pas de « maîtriser Python ». Sépare, lorsque c’est pertinent, lecture, pratique et projet. Tant que les estimations ne sont pas calibrées, indique « durée indicative » et explique que le rythme varie.

## 7. Page technologie et fiche de cours

Une page technologie telle que « Apprendre Python » présente son usage, les trois niveaux, les prérequis, les spécialisations et les parcours qui la mobilisent. Elle propose aussi les guides, exercices et projets associés. Un débutant ne doit pas devoir choisir entre quinze cartes Python indifférenciées : affiche clairement l’ordre conseillé et les usages de chaque branche.

La fiche d’un cours présente une promesse vérifiable, le public visé, les compétences de sortie, les prérequis obligatoires ou simplement recommandés, le programme, la durée indicative, les formats d’activité, le projet final et les conditions de validation. Elle indique si un navigateur suffit ou si certaines activités nécessitent un environnement local.

Le programme est un accordéon accessible : chaque module affiche son titre, son objectif, ses leçons, ses activités et son état. L’apprenant peut chercher une notion dans le programme. Au sein d’un module, les leçons ont un titre explicite, un type d’activité, une durée indicative et un statut textuel accompagné d’une icône. Les compteurs proviennent des données. Un module replié ne doit pas cacher l’information essentielle sur les prérequis.

N’impose pas partout des cadenas artificiels. L’ordre est recommandé. Les dépendances réellement nécessaires sont expliquées et, lorsque raisonnable, un diagnostic permet de passer une étape déjà connue. Un accès restreint existant doit être distingué d’un prérequis pédagogique. L’apprenant peut consulter le programme complet et comprendre la cause d’une restriction.

En bas de page, propose une suite principale et deux alternatives pertinentes : approfondir la technologie, l’appliquer dans un domaine ou revoir un prérequis. Chaque recommandation explique son utilité en une phrase. Ne suggère pas React à un débutant qui vient seulement de découvrir les balises HTML sans signaler les bases CSS et JavaScript nécessaires.

## 8. Espace de leçon : lire, comprendre et agir

Sur grand écran, propose une zone de programme rétractable, une zone de contenu et un atelier de pratique redimensionnable. La disposition exacte doit respecter la place disponible : ne force pas trois colonnes étroites sur un petit ordinateur. Sur mobile, utilise des onglets ou panneaux clairs « Leçon », « Code » et « Résultats », avec conservation des états et accès permanent à l’activité suivante.

Un mode concentration réduit les éléments secondaires. Un fil d’Ariane et un accès au programme permettent de se situer. Affiche un titre clair, l’objectif observable, le temps indicatif, les ressources utiles, puis le contenu et les activités. La largeur de lecture doit rester confortable ; l’espace de code peut être plus large. Évite les bandeaux publicitaires, les carrousels et les animations qui interrompent la lecture.

Une leçon suit normalement cette progression : une situation concrète ; une explication simple ; un exemple commenté ; une prédiction ou question ; une manipulation ; un exercice autonome ; un retour expliqué ; un résumé ; la suite. Adapte cette structure au sujet sans la transformer en répétition mécanique. Les notions difficiles disposent d’un encadré « En clair » et d’un glossaire accessible depuis le texte.

Inclure des exercices de lecture et de traçage, pas seulement de rédaction de code. L’apprenant doit pouvoir prédire une sortie, suivre une variable dans une boucle, reconnaître une erreur, remettre des étapes en ordre et expliquer pourquoi une solution fonctionne. Les tableaux de traçage et visualisations se construisent à partir de l’exécution ou de données contrôlées ; ils ne présentent pas une animation décorative comme une preuve.

Les indices sont progressifs : question de compréhension, piste conceptuelle, indication plus précise, puis correction expliquée à la demande. Ne donne pas immédiatement la solution complète. Consulter un indice n’empêche pas d’apprendre ni de continuer. Après une correction révélée, distingue « correction consultée » d’une réussite autonome et propose une variante pour vérifier le transfert.

Les actions « Exécuter », « Vérifier ma réponse », « Réinitialiser » et « Continuer » ont des effets distincts. Exécuter ne valide pas automatiquement. La réinitialisation du travail demande une confirmation locale si elle remplace du code modifié ; une restauration est souhaitable. Un simple clic sur « Continuer » ne prouve pas la maîtrise.

## 9. Éditeur et exécution dans le navigateur

L’éditeur propose la coloration syntaxique, les numéros de ligne, les erreurs utiles, les raccourcis essentiels, la taille de police réglable, un thème clair et sombre, la sauvegarde automatique et une solution accessible si le composant avancé pose problème. Prévois des fichiers multiples pour les projets concernés, une console, les sorties et un aperçu web adapté. Les actions doivent rester utilisables sans souris.

Avant de choisir une solution d’exécution, établis une matrice de capacités : technologie, moteur disponible, coût, limites, isolation, prise en charge des bibliothèques et exigences de connexion. Une interface d’éditeur ne suffit pas à prouver qu’un langage peut réellement s’exécuter. N’affiche jamais un bouton qui simule une réussite pour un environnement absent.

Pour HTML/CSS, utilise un aperçu isolé. Pour JavaScript côté navigateur, isole l’exécution de l’application principale et prévois l’arrêt d’une boucle infinie. Pour Python et SQL, évalue un moteur adapté au navigateur et ses limites de paquets, de fichiers et de performances. Pour Node.js, Java, C, C++, Go, Rust et les autres environnements, vérifie la faisabilité d’un environnement isolé ou d’un service d’exécution réellement disponible ; sinon, propose clairement une activité locale ou une simulation pédagogique identifiée comme telle.

Le code de l’apprenant est non fiable. Il ne doit jamais accéder aux secrets, aux cookies Nunya, aux fichiers de l’hôte, aux données d’autres utilisateurs ni au réseau interne. Prévois des limites de temps, mémoire, sortie, taille de fichiers et fréquence. Interromps puis recrée l’environnement après un dépassement. L’isolement ne se résume pas à désactiver un bouton : il doit être défini et testé au niveau du moteur et de l’infrastructure.

Pour les aperçus web, sépare les origines lorsque nécessaire ; évite les combinaisons de permissions qui annulent l’isolement. Filtre les messages entre fenêtres et valide leur origine et leur structure. Les exercices HTML/JavaScript ne doivent pas pouvoir modifier le parent, ouvrir des fenêtres intempestives ou lire la session utilisateur. Les contenus pédagogiques eux-mêmes doivent être rendus sans injection de scripts non autorisés.

Une vérification côté navigateur peut fournir un retour formatif, mais des tests livrés au navigateur ne sont pas secrets. Pour une évaluation exigeant de l’intégrité, utilise un correcteur isolé approprié et conserve les cas privés côté serveur. Ne remplace pas l’évaluation par une comparaison exacte du texte source : plusieurs solutions correctes doivent être acceptées.

Affiche les erreurs techniques originales lorsqu’elles aident à retrouver le problème, puis leur explication française et une piste. Exemple de ton : « Cet indice dépasse les positions disponibles dans la liste. Vérifie le nombre d’éléments et la valeur de ton indice. » Distingue une mauvaise réponse, un plantage du programme, une limite d’exécution et une panne de l’outil.

Les exercices API débutants utilisent un service pédagogique contrôlé ou des réponses fictives documentées, avec scénarios de réussite, absence de données et erreur. Évite qu’un cours dépende d’une clé payante ou d’un service public instable. Une clé privée ne doit jamais être demandée dans un éditeur partagé ni envoyée au navigateur par Nunya.

La sauvegarde indique « Enregistrement… », « Enregistré » ou « En attente de connexion ». Préserve les modifications en cas de navigation accidentelle ou de panne. Pour un visiteur, explique les limites de la sauvegarde locale ; pour un compte, synchronise sans écraser silencieusement une version plus récente d’un autre appareil. Les projets permettent un export adapté et une reprise ultérieure.

## 10. Catalogue cible : trois niveaux par technologie

La matrice suivante définit le catalogue à construire, pas une liste de contenus déjà disponibles. Chaque cellule de niveau correspond à un cours distinct, avec son programme, ses activités et son projet. Les identifiants proposés sont des repères stables ; adapte leur forme au modèle existant. D signifie débutant, I intermédiaire et A avancé. Les niveaux ne doivent pas être de simples copies avec un titre différent.

Pour chaque cours, explicite au moins quatre capacités observables, les prérequis, les modules, les évaluations, le projet final et les suites possibles. Les cours fondamentaux demandent généralement plusieurs heures de pratique ; les cours avancés peuvent demander beaucoup plus. Calcule une estimation à partir des activités réellement écrites. Ne fixe pas la même durée à tous les cours.

### 10.1 Fondamentaux et technologies web

| Série | Cours débutant | Cours intermédiaire | Cours avancé |
|---|---|---|---|
| PY | **Python — les fondamentaux** : valeurs, variables, conditions, boucles, collections, fonctions et débogage. Projet : gérer des réservations simples. | **Python — écrire des applications structurées** : modules, fichiers, exceptions, objets, tests, API et SQLite. Projet : application de suivi avec persistance. | **Python — conception et performance** : itérateurs, générateurs, décorateurs, typage, concurrence adaptée aux tâches, profilage et distribution. Projet : bibliothèque testée et documentée. |
| HTML | **HTML — créer sa première page** : structure, texte, liens, images, listes et sémantique. Projet : page d’une association. | **HTML — formulaires et contenus accessibles** : libellés, regroupements, tableaux, médias, navigation et validation native. Projet : inscription à un événement. | **HTML — architecture de documents web** : structure complexe, internationalisation, intégrations isolées, métadonnées et audit. Projet : site documentaire accessible ; CSS et JavaScript recommandés selon les activités. |
| CSS | **CSS — mettre en forme une page** : sélecteurs, cascade, couleurs, unités, boîtes et typographie. Projet : styliser une page HTML. | **CSS — interfaces adaptatives** : Flexbox, Grid, formulaires, points de rupture et états interactifs. Projet : tableau de bord utilisable sur mobile. | **CSS — systèmes d’interface** : variables, couches de cascade, composants, requêtes de conteneur lorsque supportées, thèmes et mouvements accessibles. Projet : bibliothèque de styles documentée. |
| JS | **JavaScript — les fondamentaux** : types, conditions, boucles, fonctions, tableaux, objets et erreurs. Projet : questionnaire interactif. | **JavaScript — interfaces et API** : DOM, événements, modules, promesses, requêtes, états de chargement et tests. Projet : catalogue alimenté par API pédagogique. | **JavaScript — applications robustes** : modèle d’exécution, concurrence asynchrone, workers, performance, architecture et tests d’intégration. Projet : application modulaire tolérante aux erreurs. |
| TS | **TypeScript — démarrer avec les types** : types usuels, fonctions, objets, unions et configuration. JavaScript requis. Projet : typer une petite application existante. | **TypeScript — modéliser un domaine** : rétrécissement, unions discriminées, génériques et validation des entrées. Projet : moteur de réservation typé. | **TypeScript — concevoir des bibliothèques** : types avancés justifiés, API publiques, compatibilité, tests et distribution. Projet : paquet réutilisable sans complexité gratuite. |
| SQL | **SQL — interroger des données** : tables, clés, sélection, filtres, tri et agrégations. Projet : explorer une médiathèque fictive. | **SQL — relier et modifier les données** : jointures, sous-requêtes, contraintes, transactions et modèle relationnel. Projet : base de réservations cohérente. | **SQL — analyser et optimiser** : fonctions de fenêtre, index, plans d’exécution, isolation et migrations. Projet : diagnostiquer puis améliorer des requêtes ; préciser le moteur et ses différences. |
| BASH | **Bash — découvrir le terminal** : navigation, chemins, fichiers, commandes, flux et précautions. Projet : organiser un dossier fictif dans un bac à sable. | **Bash — automatiser des tâches** : variables, conditions, boucles, fonctions, codes de sortie et traitements de texte. Projet : rapport sur des journaux synthétiques. | **Bash — scripts fiables** : gestion des erreurs, guillemets, signaux, portabilité, tests et automatisation. Projet : chaîne de traitement reproductible sans commandes dangereuses implicites. |

### 10.2 Autres langages visibles dans les références

| Série | Cours débutant | Cours intermédiaire | Cours avancé |
|---|---|---|---|
| JAVA | **Java — premiers programmes** : types, contrôle, méthodes et classes. Projet : gestion d’une bibliothèque. | **Java — applications structurées** : collections, exceptions, interfaces, tests et entrées-sorties. Projet : service de réservation. | **Java — architecture et concurrence** : génériques, concurrence, profilage et conception. Projet : service testé ; framework web abordé dans une spécialisation distincte. |
| C | **C — comprendre les bases** : compilation, types, contrôle, fonctions et tableaux. Projet : analyse de mesures. | **C — mémoire et structures** : pointeurs, allocation, chaînes, fichiers et structures. Projet : stockage de données avec gestion explicite de la mémoire. | **C — programmation système robuste** : comportements indéfinis, outils d’analyse, structures de données, interfaces système et portabilité. Projet : utilitaire vérifié dans un environnement isolé. |
| CPP | **C++ — les fondamentaux modernes** : types, fonctions, conteneurs et objets. Projet : gestionnaire de tâches. | **C++ — ressources et abstraction** : durée de vie, RAII, références, bibliothèque standard et tests. Projet : moteur de simulation. | **C++ — conception générique et performance** : templates, contraintes adaptées à la version, déplacements, concurrence et profilage. Projet : composant réutilisable mesuré et documenté. |
| CSHARP | **C# — premiers programmes** : types, collections, méthodes et classes. Projet : suivi de dépenses fictives. | **C# — applications avec .NET** : interfaces, LINQ, asynchronisme, données et tests. Projet : application de gestion. | **C# — services maintenables** : architecture, concurrence, performance, injection de dépendances et observabilité. Projet : API robuste avec un framework compatible avec le dépôt ou l’environnement pédagogique. |
| GO | **Go — les fondamentaux** : types, contrôle, fonctions, structures, modules et erreurs. Projet : outil en ligne de commande. | **Go — services et concurrence** : interfaces, goroutines, canaux, contexte, HTTP et tests. Projet : service de consultation. | **Go — systèmes fiables** : annulation, limitations de concurrence, profilage, concurrence sûre et conception d’API. Projet : traitement de tâches avec arrêt propre. |
| RUST | **Rust — démarrer** : types, fonctions, structures, ownership et emprunts simples. Projet : utilitaire de texte. | **Rust — modéliser et sécuriser** : enums, traits, durées de vie nécessaires, erreurs, collections et tests. Projet : analyseur de fichiers. | **Rust — applications avancées** : concurrence, asynchronisme, profilage et interfaces. Projet : service fiable ; expliquer les limites avant toute introduction de code non sûr. |
| SWIFT | **Swift — les fondamentaux** : types, optionnels, contrôle, fonctions et structures. Projet : modèle d’un carnet personnel. | **Swift — construire une application** : protocoles, états, persistance et interface adaptée à l’outillage disponible. Projet : carnet de lecture. | **Swift — architecture et concurrence** : isolation, tâches, performance, tests et accessibilité. Projet : application structurée ; préciser les contraintes d’un environnement Apple. |
| KOTLIN | **Kotlin — les fondamentaux** : types, nullabilité, fonctions et classes. Projet : gestion de tâches. | **Kotlin — applications et données** : collections, coroutines, tests et architecture. Projet : application de suivi. | **Kotlin — conception avancée** : flux, concurrence structurée, modularisation et performance. Projet : application robuste ; séparer le langage du parcours Android. |
| RUBY | **Ruby — les fondamentaux** : objets, chaînes, collections, conditions et blocs. Projet : catalogue personnel. | **Ruby — structurer un projet** : modules, classes, exceptions, fichiers et tests. Projet : outil d’automatisation. | **Ruby — conception et web** : API de bibliothèques, métaprogrammation raisonnée, performance et intégration. Projet : service ; Rails fait l’objet d’une spécialisation. |
| PHP | **PHP — créer des pages dynamiques** : syntaxe, tableaux, fonctions, requêtes et formulaires. Projet : formulaire avec validation serveur. | **PHP — applications structurées** : objets, dépendances, accès aux données, sessions et tests. Projet : outil de gestion. | **PHP — architecture web fiable** : sécurité applicative, séparation des responsabilités, files de tâches et performance. Projet : API testée ; Laravel dans un cours dédié. |
| SCALA | **Scala — démarrer** : valeurs, types, fonctions, collections et correspondance de motifs. Projet : transformation de données. | **Scala — objets et programmation fonctionnelle** : types algébriques, immutabilité, erreurs et tests. Projet : moteur de règles. | **Scala — applications composables** : abstractions, concurrence et pipelines. Projet : traitement de données ; Spark proposé séparément avec prérequis. |
| PERL | **Perl — scripts et texte** : variables, contrôle, collections, fichiers et expressions régulières. Projet : rapport de texte. | **Perl — automatiser proprement** : modules, références, validation, exceptions et tests. Projet : outil d’analyse de journaux. | **Perl — maintenir des outils existants** : organisation, performance, compatibilité et interfaces. Projet : modernisation contrôlée d’un utilitaire pédagogique. |
| R | **R — analyser ses premières données** : vecteurs, tableaux, valeurs manquantes, import et graphiques. Projet : bilan d’un jeu de données fictif. | **R — analyses reproductibles** : nettoyage, regroupement, visualisation, fonctions et statistiques descriptives. Projet : rapport documenté. | **R — modèles et applications analytiques** : validation, reproductibilité, performance et présentation interactive. Projet : analyse dont les limites sont explicites. |
| DART | **Dart — les fondamentaux** : types, fonctions, collections, classes et nullabilité. Projet : suivi d’habitudes. | **Dart — applications structurées** : asynchronisme, flux, sérialisation et tests. Projet : client d’une API pédagogique. | **Dart — conception avancée** : architecture, isolates lorsque adaptés, performance et paquets. Projet : bibliothèque testée ; Flutter dans un cours distinct. |
| LUA | **Lua — les fondamentaux** : valeurs, contrôle, fonctions et tables. Projet : petit jeu textuel. | **Lua — modules et événements** : métatables, modules, coroutines et tests. Projet : simulation interactive. | **Lua — intégration et performance** : API d’intégration, mémoire et architecture de scripts. Projet : système de scénarios dans un environnement pédagogique identifié. |
| MATLAB | **MATLAB — calculer et visualiser** : matrices, scripts, fonctions et graphiques. Projet : analyse de mesures synthétiques. | **MATLAB — méthodes numériques** : structures de données, simulation, erreurs numériques et validation. Projet : modèle documenté. | **MATLAB — calcul scientifique structuré** : optimisation, reproductibilité et traitement adapté au domaine. Projet : étude comparative ; signaler les licences et ne pas confondre compatibilité partielle avec un substitut exact. |
| HASKELL | **Haskell — penser en fonctions** : types, fonctions pures, listes, motifs et récursivité. Projet : transformations de texte. | **Haskell — composer des programmes** : types algébriques, fonctions d’ordre supérieur, erreurs et entrées-sorties. Projet : analyseur simple. | **Haskell — abstractions et fiabilité** : composition d’effets, évaluation, propriétés et performance. Projet : application testée avec documentation des choix. |

Cette matrice représente **24 familles et 72 cours de niveau** : sept familles dans le premier tableau et dix-sept dans le second. Les spécialisations et parcours ci-dessous s’y ajoutent ; ne les compte pas deux fois comme s’il s’agissait de cours déjà écrits.

### 10.3 Frameworks, environnements et compétences transversales

Ces séries complètent la matrice sans brouiller les prérequis. Un cours débutant React est débutant dans React ; il ne suppose pas zéro connaissance de JavaScript.

| Série complémentaire | Progression attendue | Production finale possible |
|---|---|---|
| React | Composants et propriétés ; état et événements ; formulaires ; effets lorsque nécessaires ; données distantes ; tests ; architecture et accessibilité à un niveau avancé. | Application de suivi avec états vide, chargement, réussite et erreur. |
| Node.js et Express | Environnement serveur ; HTTP ; routes ; validation ; erreurs ; données ; authentification ; tests ; exploitation et performance. | API de réservations documentée avec autorisations réelles. |
| Vue et Angular | Deux séries séparées : prérequis web, composants, état, routage, formulaires, données, tests et architecture selon l’écosystème. | Application de gestion réalisée dans le framework choisi. |
| Python web | Flask, Django et FastAPI constituent des spécialisations séparées ; expliquer leurs approches et vérifier leurs versions au moment de rédaction. | Application web ou API avec validation et tests. |
| Java, PHP et C# web | Spring, Laravel et ASP.NET : séries distinctes après le langage, HTTP et les bases de données. | Service avec persistance, contrôle d’accès et documentation. |
| Git et collaboration | Suivre les changements ; commits ; branches ; fusion ; conflits ; revue ; collaboration ; erreurs courantes et récupération expliquée. | Historique de projet lisible et exercice de conflit résolu. |
| Algorithmique | Raisonnement ; traçage ; tableaux et chaînes ; dictionnaires ; piles et files ; recherche et tri ; récursivité ; arbres, graphes et complexité. | Résolution expliquée de problèmes avec justification des choix. |
| HTTP et API REST | Requête/réponse ; méthodes ; statuts ; JSON ; contrats ; pagination ; validation ; authentification ; autorisation ; idempotence ; limites. | Client puis serveur d’un petit catalogue pédagogique. |
| GraphQL | Pré requis API ; schéma ; requêtes ; mutations ; erreurs ; contrôle d’accès et coût des requêtes. | Service pédagogique dont les permissions sont testées. |
| Bases de données | Modélisation relationnelle ; SQL ; PostgreSQL ou moteur retenu ; découverte de MongoDB et Redis dans leurs usages adaptés. | Choix de stockage argumenté et application cohérente. |
| Linux, réseaux et systèmes | Fichiers et permissions ; processus ; terminal ; notions TCP/IP, DNS et HTTP ; diagnostic ; administration dans un laboratoire contrôlé. | Diagnostic documenté d’un service pédagogique. |
| Docker, CI/CD et cloud | Conteneurs ; configurations ; tests automatisés ; chaînes de livraison ; secrets ; coûts ; surveillance ; notions Kubernetes en spécialisation avancée. | Déploiement pédagogique reproductible avec procédure d’arrêt. |
| Qualité logicielle | Tests unitaires et d’intégration ; débogage ; refactorisation ; lisibilité ; revue ; accessibilité ; mesure de performance. | Amélioration justifiée d’un projet imparfait. |
| Conception de systèmes | Besoins ; API ; données ; limites ; cache ; files ; disponibilité ; observabilité et compromis. | Dossier de conception simple confronté à plusieurs scénarios. |
| UX/UI pour développeurs | Hiérarchie ; navigation ; formulaires ; contraste ; composants ; tests d’usage et adaptation mobile. | Interface accessible évaluée sur des tâches concrètes. |
| Mobile | Séries séparées Android/Kotlin, iOS/Swift, Flutter/Dart et React Native ; garder leurs contraintes d’environnement explicites. | Application de terrain avec persistance et états de connexion. |
| Données et apprentissage automatique | Python ou R ; nettoyage ; visualisation ; statistiques ; découpage des données ; modèles ; validation ; biais ; reproductibilité. | Rapport et modèle évalués sans fuite de données. |
| IA générative | Fonctionnement et limites ; formulation d’instructions ; API ; sorties structurées ; recherche documentaire augmentée ; évaluations ; sécurité et coûts. | Assistant fondé sur un petit corpus pédagogique et évalué. |
| Objets connectés et robotique | Programmation adaptée ; capteurs ; événements ; simulation ; protocoles ; limites matérielles et tests. | Simulation de suivi de capteurs ; matériel facultatif clairement indiqué. |
| Blockchain | Principes de registres ; hachage ; signatures ; contrats ; tests et sécurité dans un environnement de démonstration. | Contrat pédagogique testé sans argent réel. |

Pour React, Node.js, les API, les données, la cybersécurité et l’IA, crée aussi une progression débutant/intermédiaire/avancé adaptée au sujet, en réutilisant les cours communs. Ne présente pas RAG ou MCP comme un point de départ avant de comprendre les API, les modèles et les données. Leur introduction avancée doit être motivée par un usage concret, documentée et vérifiée à partir des sources officielles au moment de la rédaction.

Les captures montrent également du marketing, SAP, de la gestion, des télécommunications et du VLSI. Cela signale un catalogue de domaines étendu, mais ne crée pas automatiquement une obligation de reproduire tous les secteurs d’un autre site dans « Apprendre à Coder ». Réserve des catégories d’extension pour les sujets qui impliquent réellement la programmation : calcul scientifique, traitement de données marketing, électronique programmable et automatisation. Le contenu purement commercial ou administratif doit rester dans un autre espace si Nunya le prévoit. Consigne cette décision dans la matrice de couverture au lieu de l’ignorer.

## 11. Parcours par objectif et métier

Un parcours est une orientation pédagogique, pas une garantie d’emploi. Affiche son point d’entrée, les compétences visées, les cours réutilisés, les jalons et le projet de synthèse. Les apprenants peuvent changer de parcours en conservant les activités communes validées.

| Parcours | Ordre conseillé | Projet de synthèse |
|---|---|---|
| Découvrir la programmation | Bases numériques facultatives → logique → Python débutant ou JavaScript débutant → débogage → petit projet. | Outil simple dont l’apprenant explique les entrées, les traitements et les sorties. |
| Développement front-end | HTML → CSS → JavaScript → DOM et API → accessibilité → Git → TypeScript → React, Vue ou Angular. | Site interactif adaptatif avec données, formulaires et tests. |
| Développement back-end JavaScript | JavaScript → HTTP → Node.js → Express → SQL → authentification et autorisation → tests → exploitation. | API de réservation robuste et documentée. |
| Développement back-end Python | Python → HTTP/API → SQL → framework Python choisi → sécurité applicative → tests → déploiement. | Service de gestion avec données persistantes. |
| Développement full-stack | Tronc commun front-end → un parcours back-end → intégration → permissions → tests de parcours utilisateur → déploiement. | Application complète avec rôle utilisateur et rôle de gestion. |
| Automatisation avec Python | Python → fichiers et formats → modules → API → tests → planification et journaux. | Rapport automatisé à partir de fichiers et données fictives. |
| Analyse de données | Python ou R → nettoyage → SQL → visualisation → statistiques descriptives → communication des limites. | Tableau de bord et note d’analyse reproductibles. |
| Apprentissage automatique | Analyse de données → statistiques utiles → modèles simples → validation → comparaison → reproductibilité. | Modèle accompagné d’une évaluation honnête et d’une fiche de limites. |
| Applications d’IA générative | Python ou JavaScript → API → bases des modèles → recherche documentaire → évaluations → sécurité → coûts. | Assistant documentaire avec réponses sourcées et jeux de tests. |
| Cybersécurité défensive | Réseaux → Linux → Python → modélisation des menaces → identité et accès → journaux → sécurité web → réponse aux incidents. | Analyse de journaux synthétiques et plan de remédiation. |
| Cloud et DevOps | Linux → réseaux → Git → tests → Docker → CI/CD → cloud → observabilité → gestion des secrets et coûts. | Chaîne de livraison d’un service pédagogique avec procédure de récupération. |
| Développement mobile | Fondamentaux → langage choisi → framework mobile → interface → données → connexion → tests → accessibilité. | Carnet ou outil de terrain avec synchronisation expliquée. |
| Programmation système | C ou Rust → mémoire → systèmes → structures de données → concurrence → profilage → tests. | Utilitaire de traitement de fichiers dans un environnement contrôlé. |
| Préparation technique et portfolio | Fondamentaux acquis → algorithmique → débogage → explication de solutions → Git → projets → présentation du portfolio. | Projet documenté et résolution argumentée d’un problème. |

Le parcours cybersécurité doit être concret et défensif. Couvre confidentialité, intégrité et disponibilité ; gestion des permissions ; moindre privilège ; mots de passe, MFA et sessions ; principes de chiffrement et de hachage ; TLS et certificats ; validation des entrées ; analyse des journaux ; dépendances ; sauvegardes ; réponse aux incidents. Toute manipulation s’effectue sur des systèmes de laboratoire, des jeux de données synthétiques ou des ressources explicitement autorisées. Ne fais pas d’un exercice un outil qui scanne des cibles publiques.

Les notions de modélisation des menaces, STRIDE ou cadres de techniques adverses peuvent être introduites avec leur utilité et leurs limites, sans noyer le débutant dans des acronymes. Les exercices de cryptographie utilisent des bibliothèques reconnues et expliquent pourquoi inventer son propre mécanisme n’est pas une compétence attendue.

## 12. Programme de référence détaillé : Python

Utilise cette série comme étalon de profondeur. Chaque ligne est un module avec plusieurs leçons et activités, pas une unique page contenant un résumé de tout le sujet. Les notions avancées ne doivent pas être déplacées dans l’introduction pour gonfler artificiellement le programme.

### Python débutant — construire des bases solides

| Module | Notions et capacités | Mise en pratique attendue |
|---|---|---|
| 1. Premier programme | Exécution, instructions, affichage, valeurs et erreurs simples. | Modifier un programme court et prédire son résultat. |
| 2. Variables et types | Nombres, chaînes, booléens, affectation, conversion et lecture d’entrée si le moteur la permet. | Convertisseur de mesures avec hypothèses explicites. |
| 3. Conditions | Comparaisons, opérateurs logiques, branches et cas limites. | Appliquer une règle de réduction à des montants fictifs. |
| 4. Répéter avec des boucles | Parcours, compteur, accumulateur, condition d’arrêt et boucle infinie. | Tracer puis corriger une boucle ; traiter une série de valeurs. |
| 5. Chaînes et listes | Positions, longueurs, tranches, mutation et parcours. | Nettoyer une petite liste de noms sans dépasser les indices. |
| 6. Choisir une collection | Listes, tuples, dictionnaires et ensembles, différences d’usage. | Compter des catégories et éliminer des doublons lorsque pertinent. |
| 7. Définir des fonctions | Appel, paramètre, argument, retour, affichage et portée locale simple. | Décomposer un calcul en fonctions testables. |
| 8. Résoudre un problème | Reformulation, exemples, décomposition, contrat et vérification. | Passer d’une consigne en français à une petite solution. |
| 9. Comprendre les erreurs | Erreurs de syntaxe, de type, d’indice et erreurs logiques. | Expliquer puis réparer plusieurs programmes courts. |
| 10. Atelier guidé | Collections, conditions, boucles et fonctions réunies. | Gérer un inventaire fictif en mémoire. |
| 11. Projet de synthèse | Conception, cas limites et explication des choix. | Réservations d’équipements avec détection de chevauchement. |
| 12. Bilan et orientation | Révision, exercice de transfert et choix d’une suite. | Variante autonome du projet puis recommandation expliquée. |

Pour le projet de réservation, précise le modèle d’intervalle, par exemple début inclus et fin exclue. Une réservation qui finit à 10 h et une autre qui commence à 10 h ne se chevauchent pas. Un début égal ou supérieur à la fin est invalide. Deux équipements différents ne se bloquent pas. L’annulation d’une réservation active libère le créneau. Ces règles doivent être enseignées et testées, et non apparaître seulement comme des tests cachés surprenants.

### Python intermédiaire — passer à une application structurée

Prévois des modules distincts sur les fichiers et chemins ; CSV et JSON ; exceptions ; modules et paquets ; environnements et dépendances ; classes et objets ; composition et interfaces simples ; tests ; débogage ; requêtes HTTP ; données SQLite ; documentation et projet final. Une activité traitant de fichiers se déroule dans un système de fichiers pédagogique, sans prétendre accéder au disque personnel depuis le navigateur.

L’apprenant doit savoir transformer des données, traiter une erreur prévue, isoler une fonction, écrire et interpréter un test, consommer une API pédagogique et conserver des données. Le projet final peut être un outil de suivi de lecture ou de réservations avec import, validation et persistance. Évite de faire dépendre sa réussite d’un service externe payant.

### Python avancé — concevoir, mesurer et distribuer

Sépare itérateurs et générateurs ; fonctions comme valeurs ; fermetures ; décorateurs ; gestionnaires de contexte ; annotations et vérification de types ; architecture ; profilage ; asynchronisme ; concurrence selon la nature du travail ; empaquetage ; qualité et maintenance. La mémorisation de syntaxes rares n’est pas un objectif en soi.

Pour chaque mécanisme avancé, montre le problème qu’il résout, une solution simple de référence, le compromis introduit et un exercice où il apporte une valeur réelle. Le projet final est une bibliothèque ou un service dont les contrats, tests, performances pertinentes et limites sont documentés.

### Spécialisations Python

Propose ensuite « Python pour automatiser », « Python pour analyser des données », « Python pour le web et les API », « Python pour la cybersécurité défensive » et « Python pour les applications d’IA ». Ces cours référencent les bases communes et se concentrent sur leur usage. Ils ne recopient pas douze fois les variables et les boucles.

## 13. Profondeur attendue pour les autres séries centrales

Pour **HTML/CSS**, distingue la structure et la présentation. Le programme HTML aborde les documents, les liens, les images et textes alternatifs, les listes, la sémantique, les formulaires, les tableaux de données et les médias. Le programme CSS aborde les sélecteurs, la cascade, l’héritage, les boîtes, les unités, la typographie, Flexbox, Grid, l’adaptation, les états, les thèmes et l’accessibilité. Ne présente pas les tableaux HTML comme une méthode de mise en page.

Pour **JavaScript**, distingue les bases du langage, la manipulation du DOM et l’asynchronisme. Le débutant apprend d’abord à raisonner sur des valeurs et des fonctions. Viennent ensuite événements, formulaires, modules, promesses, données et tests. Les projets doivent inclure chargement, erreur, absence de données et nouvelle tentative. Introduis les différences entre mutation et copie, ainsi que les erreurs de conversion, au moment où elles deviennent utiles.

Pour **React**, exige les bases JavaScript, HTML et CSS nécessaires. Commence par décomposer une interface en composants, passer des données et gérer une interaction. Ajoute état, formulaires, listes, clés, requêtes et accessibilité. Explique quand un effet est nécessaire plutôt que d’en ajouter à chaque composant. À un niveau plus avancé, aborde architecture, tests, performance mesurée et limites des outils employés.

Pour **Node.js et les API**, pars du cycle requête-réponse. Construis progressivement une route, un contrat, une validation, une erreur exploitable, une persistance, puis un contrôle d’accès. Distingue authentification et autorisation. Le projet final doit démontrer qu’un utilisateur ne peut pas lire ou modifier les ressources d’un autre en changeant un identifiant.

Pour **IA et IA générative**, distingue une application qui appelle un modèle d’un cours qui entraîne un modèle. Enseigne la vérification des sorties, les erreurs plausibles, les limites du contexte, la confidentialité, les coûts, les sorties structurées et les évaluations. Une démonstration peut utiliser un mode fictif clairement identifié lorsque le service réel n’est pas configuré ; elle ne doit jamais être présentée comme une réponse réellement générée. Les cours de recherche documentaire doivent tester les réponses absentes du corpus, les sources contradictoires et les instructions malveillantes contenues dans des documents.

## 14. Trois leçons étalons à produire intégralement

Les descriptions suivantes sont des spécifications de leçons. Lors de l’implémentation, écris leurs explications originales, activités, indices, corrections et vérifications réelles. Elles fixent un niveau de qualité à appliquer à tout le catalogue ; ne te contente pas de recopier leurs titres.

### 14.1 Python : paramètres, arguments et valeur de retour

**Place dans le cours.** Module sur les fonctions, après variables, conditions et boucles simples. Durée initialement envisagée : environ vingt à trente minutes avec pratique, à recalibrer après rédaction et essai.

**Objectif observable.** À la fin, l’apprenant sait expliquer les rôles de paramètre et argument, écrire une fonction qui produit un résultat et distinguer ce résultat de ce qui est affiché dans la console.

**Situation de départ.** Une petite association souhaite calculer la réduction appliquée à plusieurs cotisations. Le même calcul doit être réutilisé sans copier plusieurs fois les instructions. Présente la fonction comme un traitement nommé recevant des informations, et non comme une boîte magique.

**Explication attendue.** Définis chaque mot avec une analogie courte, puis reviens immédiatement au programme. Explique que définir une fonction ne lance pas son contenu ; qu’un paramètre est un nom dans la définition ; qu’un argument est une valeur fournie lors de l’appel ; que le retour transmet une valeur à l’appelant ; que l’affichage sert à montrer une information. Montre l’ordre d’exécution et le rôle du contexte local. N’introduis pas encore tous les paramètres avancés.

**Activité de prédiction.** Présente une fonction qui calcule un montant et demande où la valeur sera disponible. Une seconde version ne fait qu’afficher. L’apprenant compare les deux et explique pourquoi réutiliser le résultat n’a pas le même comportement. Le retour explique l’erreur conceptuelle, sans seulement afficher « Faux ».

**Exercice principal.** Écrire une fonction de calcul de montant après remise, recevant un montant non négatif et un pourcentage compris entre zéro et cent. Énonce le contrat : le résultat est retourné, le montant original n’est pas modifié, aucun affichage n’est nécessaire. Les entrées non valides sont exclues de cet exercice et seront étudiées plus tard, afin de ne pas exiger silencieusement la gestion d’exceptions.

**Cas visibles.** Pour 100 et 10, le résultat attendu est 90. Pour 80 et 0, il est 80. Pour 50 et 100, il est 0. Ajoute un cas décimal et explique la comparaison numérique adaptée, sans imposer une égalité fragile de représentation flottante. Si la leçon traite ensuite de monnaie réelle, introduis séparément une représentation et une règle d’arrondi adaptées.

**Indices.** Premier indice : « Quelles informations changent d’un calcul à l’autre ? » Deuxième : « Calcule d’abord la part retirée. » Troisième : « Le programme qui appelle la fonction doit recevoir la réponse. » La correction complète comprend le raisonnement, les erreurs fréquentes et une variante à refaire sans regarder.

**Transfert.** Une fonction de conversion de durée réutilise l’idée de paramètres et de retour dans un nouveau contexte. La validation de la leçon dépend d’une activité réellement réussie ; une correction simplement consultée apparaît comme telle.

### 14.2 JavaScript : demander des données et gérer les états

**Prérequis.** Fonctions, objets, tableaux, événements et première explication des promesses. Le navigateur et l’API pédagogique sont déjà présentés.

**Objectif observable.** Afficher des données issues d’une requête contrôlée, puis traiter chargement, réponse vide et échec sans laisser une interface bloquée.

**Situation.** Afficher la liste des ateliers proposés par une association fictive. L’interface commence par une action de chargement et doit rester compréhensible si aucune activité n’est disponible.

**Contenu.** Explique requête et réponse, attente asynchrone, statut de réponse, lecture du JSON et mise à jour de l’affichage. Distingue un échec réseau d’une réponse HTTP indiquant une erreur. Explique qu’attendre une requête ne signifie pas immobiliser toute l’interface. Présente les données externes comme des entrées à valider et à afficher sans injection HTML.

**Exercices.** Remettre les étapes dans l’ordre ; identifier un état oublié ; compléter la logique de traitement ; gérer une nouvelle tentative. Pour le niveau intermédiaire, ajouter une stratégie empêchant une ancienne réponse tardive d’écraser la plus récente.

**Scénarios vérifiés.** Une réponse avec trois ateliers ; une liste vide ; une erreur HTTP ; une absence de réseau ; un JSON inattendu ; deux requêtes dont l’ordre de résolution est inversé lorsque cette difficulté a été enseignée. Les tests correspondent au niveau de la leçon et les outils permettent de provoquer volontairement chaque état.

**Retour pédagogique.** Expliquer quel état manque et son effet sur l’utilisateur. Évaluer le comportement, pas le nom exact des variables ni une unique manière d’écrire le programme. La suite recommandée peut être un atelier de catalogue filtrable ou le cours HTTP/API REST, selon les acquis.

### 14.3 HTML/CSS : un formulaire d’inscription accessible

**Prérequis.** Document HTML simple, liens et premiers styles. Aucun framework requis.

**Objectif observable.** Créer un formulaire dont les champs, regroupements, indications et erreurs sont compréhensibles au clavier et avec les technologies d’assistance.

**Situation.** S’inscrire à un atelier Nunya à partir d’un prénom, d’une adresse de contact et d’un choix d’atelier fictif. Aucune donnée réelle n’est envoyée pendant l’exercice.

**Contenu.** Enseigner le rôle des libellés, types de champs, groupes, indications, boutons et contraintes natives. Expliquer pourquoi un texte indicatif dans un champ ne remplace pas son libellé. Distinguer validation navigateur, validation serveur et finalité de la collecte. Enseigner un ordre de navigation logique et un focus visible.

**Pratique.** Réparer d’abord un formulaire imparfait, puis en construire une variante. Le panneau d’aperçu permet une vérification clavier. Les contrôles automatiques inspectent les relations et propriétés pertinentes ; ils sont complétés par une courte vérification manuelle guidée. Ne prétends pas qu’un score automatique garantit à lui seul l’accessibilité.

**Projet.** Appliquer les styles CSS avec contraste suffisant, erreurs textuelles, adaptation mobile et préférence de réduction des mouvements. Le résultat est évalué sur la structure, l’usage et la clarté, sans imposer une copie au pixel d’un modèle.

## 15. Modèle éditorial et exigences minimales de contenu

Chaque fiche de cours contient une description concrète, le public, les prérequis, les compétences de sortie, le plan, la version technique ciblée, les formats de pratique, le projet et les règles d’achèvement. Les documents de préparation peuvent prévoir au moins six modules pour un cours de niveau complet, mais un atelier court ne doit pas être artificiellement étiré pour atteindre un quota.

Chaque module possède un objectif, une progression logique, au moins une activité de vérification et un bilan. Chaque leçon importante contient une explication, un exemple, une activité et un retour. Chaque exercice de code possède une consigne complète, un contrat d’entrée/sortie, des exemples, des cas limites pertinents, des indices progressifs, une correction justifiée, un moteur compatible et une stratégie de vérification.

Varie les activités : prédiction, traçage, compréhension, choix de structure de données, complétion, correction, écriture autonome, lecture d’erreur, revue de code et projet. Les QCM servent à repérer des conceptions erronées ; ils ne remplacent pas les compétences pratiques. Chaque mauvaise option doit conduire à une explication utile.

Les exercices ne demandent pas une notion encore non enseignée, sauf défi facultatif clairement identifié. Les tests privés couvrent des variations du contrat annoncé. Les consignes précisent notamment les cas vides, doublons, valeurs négatives ou bornes quand ils comptent. Un échec ne doit pas être causé par une ambiguïté de l’énoncé.

Le projet final comprend un contexte, les capacités mobilisées, les étapes possibles, les critères d’acceptation, une grille d’évaluation et des pistes d’extension. La grille distingue fonctionnement, clarté, tests et explication des choix. Les exigences de sécurité ou d’accessibilité sont ajoutées lorsqu’elles correspondent au projet et au niveau.

Révise le français : tutoiement cohérent, phrases directes, termes définis, pas de traduction littérale maladroite. Les termes anglais utiles sont introduits une fois avec leur équivalent français puis restent cohérents. Les messages d’exécution peuvent conserver un texte technique original accompagné d’une explication française. Les noms d’API ne sont pas traduits.

Les versions et fonctionnalités techniques doivent être vérifiées auprès des documentations officielles lors de la rédaction effective. Mentionne la date de révision. Ne qualifie pas une technique de « moderne » uniquement parce que son nom apparaît dans une capture. Les références externes complètent le cours ; l’explication essentielle et les activités restent disponibles dans Nunya.

## 16. Progression, validation et reprise

Distingue au minimum : non commencé, en cours, contenu consulté, activité tentée, activité validée et cours terminé. Une notion peut être « à revoir » après une difficulté sans retirer brutalement tout progrès antérieur. N’assimile pas le défilement d’une page à une compétence acquise.

La progression d’un cours est calculée sur des activités obligatoires identifiées. Une règle initiale possible est le nombre d’activités obligatoires terminées divisé par leur nombre total. Si une pondération est utilisée, rends-la explicite, versionnée et compréhensible. Les activités facultatives n’empêchent pas l’achèvement. Ne mélange pas pourcentage d’avancement et estimation de maîtrise.

Un cours est terminé lorsque ses activités obligatoires et son projet ou évaluation finale sont validés selon les critères publiés. Pour un quiz, un seuil initial de 80 % peut être proposé et configuré, avec possibilité de recommencer et de revoir ses erreurs. Une réussite en quiz ne valide pas automatiquement un projet. Une validation manuelle doit indiquer qui ou quel rôle peut la réaliser.

Conserve les tentatives utiles, résultats, indices consultés, brouillons et versions de contenu. Prévois une reprise après déconnexion. Un exercice déjà terminé conserve son état après un rafraîchissement. Si le contenu évolue, indique les nouvelles activités et distingue « terminé dans la version précédente » d’un cours entièrement réinitialisé.

Une attestation interne peut récapituler le cours, sa version, la date et les capacités évaluées. Si un lien de partage existe, il est volontaire et ne révèle pas d’autres données personnelles. Ne crée aucune attestation pour une simple ouverture de cours ni aucune mention d’accréditation absente.

## 17. Recommandations : expliquer la prochaine étape

Commence par un moteur de règles transparent ; une IA de recommandation n’est pas nécessaire au lancement. Utilise les prérequis, capacités validées, objectif choisi, niveau, cours suivis et temps souhaité si l’utilisateur l’a fourni.

Après une leçon, recommande la prochaine activité et, en cas de difficulté, une courte révision ciblée. Après un module, propose une pratique de consolidation. Après un cours, présente une suite principale et deux alternatives maximum. Chaque proposition contient une raison lisible : « Tu sais utiliser les fonctions et les collections ; ce cours te permettra maintenant d’enregistrer tes données. »

Filtre d’abord les contenus publiés et compatibles avec les prérequis. Privilégie ensuite la continuité du parcours, l’objectif et une difficulté raisonnable. Évite de renvoyer vers un contenu déjà terminé, sauf révision expliquée. Si aucune suite n’est disponible, propose un projet autonome ou annonce une préparation réelle sans lien cassé.

Exemples de règles : Python débutant → Python intermédiaire ou automatisation d’initiation compatible ; HTML débutant → CSS débutant ; JavaScript et CSS acquis → première série React ; Node.js/API → SQL, sécurité applicative ou projet full-stack ; analyse de données acquise → statistiques ou initiation à l’apprentissage automatique. Un article lu une fois ne suffit pas à attribuer automatiquement une compétence.

L’utilisateur peut ignorer les recommandations, modifier son objectif et continuer à explorer. N’utilise pas de données sensibles ni de caractéristiques personnelles inutiles pour décider de ses capacités.

## 18. Motivation : XP, séries, badges et révisions

Inspire-toi des mécanismes de progression quotidienne, avec une identité Nunya et sans copier les personnages ou écrans d’un autre produit. Les récompenses encouragent la pratique régulière et la compréhension ; elles ne doivent pas interrompre chaque action ni culpabiliser l’apprenant.

Définis une activité quotidienne significative : terminer une activité pédagogique reconnue, réussir une révision ou soumettre un travail de projet validé. Ouvrir le site, laisser une vidéo tourner ou cliquer plusieurs fois sur un bouton ne suffit pas. Une courte activité doit rester possible pour une personne disposant de peu de temps.

Proposition initiale d’XP : première validation d’un exercice standard, 10 XP ; bilan de module, 30 XP ; projet validé, 100 XP. Ces valeurs sont des paramètres de départ à tester, pas une exigence métier figée. Les répétitions utiles peuvent apporter une récompense limitée selon une règle explicite, sans permettre de produire des points à l’infini sur le même exercice. L’affichage et la progression ne doivent jamais dépendre d’un montant d’XP envoyé sans vérification par le client.

Une récompense repose sur un événement identifié de manière unique. Une double soumission, une nouvelle tentative de requête réseau ou une synchronisation hors ligne ne doit pas la compter deux fois. Une consultation de correction ne doit pas être présentée comme une preuve de résolution autonome. Les indices ne doivent pas déclencher de pénalité qui pousse à refuser l’aide.

La série quotidienne utilise le fuseau de l’utilisateur, avec repli explicite et possibilité de réglage. Conserve l’heure de l’événement et le fuseau applicable ; teste les changements d’heure, les soumissions autour de minuit et les changements de fuseau. Définis le traitement des activités hors ligne synchronisées tardivement sans prétendre pouvoir vérifier parfaitement une horloge locale modifiable.

Propose une tolérance transparente et configurable, par exemple une journée de pause disponible selon une règle expliquée. Une série interrompue ne supprime ni les cours, ni les badges obtenus, ni les compétences. Préfère « Reprends à ton rythme » aux messages de honte ou de menace. Les notifications sont facultatives, limitées et contrôlables.

Badges suggérés : premier programme ; première fonction réutilisée ; premier débogage expliqué ; projet terminé ; trois jours de pratique ; première semaine régulière ; premier formulaire accessible ; première API consommée ; revue de connaissances réussie. Chaque badge affiche les conditions exactes. Un badge ne prouve pas à lui seul une compétence professionnelle.

Ajoute un tableau personnel montrant les cours en cours, jalons, projets, activités récentes, badges et révisions utiles. Une carte visuelle de parcours peut compléter une liste accessible ; elle ne doit pas devenir l’unique navigation. Les classements publics sont une extension facultative, désactivée par défaut tant que les besoins de confidentialité et d’équité ne sont pas traités.

La révision espacée commence avec une file simple d’activités à revoir et des intervalles configurables. Évite de présenter ces intervalles comme une mesure scientifique personnalisée non démontrée. Permets « Revoir maintenant », « Plus tard » et un petit mélange de notions anciennes et récentes. Explique pourquoi une notion est proposée à nouveau.

## 19. Articles, références et boîte à outils

Crée une bibliothèque éditoriale française liée aux cours. Les articles ne remplacent pas le catalogue et ne doivent pas servir de remplissage. Chaque article indique son niveau, ses prérequis, sa date de révision, ses liens vers les leçons concernées et une activité ou un exemple utile lorsque pertinent.

Le socle comprend des guides sur REST, conception d’API, GraphQL, JavaScript, TypeScript, classes JavaScript, Python, exemples Python, passage de JavaScript à Python, React, bibliothèques front-end, Node.js, Express, PHP, Java, Go, Linux, terminal, Docker, CI/CD, contrôle d’accès, code lisible, architecture logicielle, développement full-stack, fondamentaux, regroupement de données avec Python, assistants IA, portfolio et préparation technique. Un guide de « regroupement de données » distingue une agrégation classique d’un regroupement statistique non supervisé.

Évite de qualifier tous ces guides de « tendance ». Si une sélection est éditoriale, nomme-la ainsi. Une éventuelle tendance calculée doit utiliser une fenêtre temporelle définie, des lectures ou activités réelles et une protection contre les rafraîchissements répétés.

La boîte à outils prioritaire comprend l’éditeur de code, un explorateur de JSON, un client d’API pédagogique, des références de syntaxe, un visualiseur de collections ou de traces et un espace de brouillon. Chaque outil doit servir une activité réelle. Évite d’ajouter immédiatement un générateur de CV, un éditeur d’images ou une multitude d’utilitaires sans lien avec l’apprentissage simplement parce qu’ils apparaissent dans les captures.

Un glossaire recherche les termes français et anglais utiles. Des fiches répondent à des questions concrètes : « Quelle boucle choisir ? », « Pourquoi le dernier indice vaut-il longueur moins un ? », « Afficher ou retourner ? », « Quel est le rôle d’un test ? » et « Comment lire une réponse HTTP ? ».

## 20. Accompagnement facultatif par un tuteur IA

Le tuteur IA est une amélioration, pas un prérequis à l’accès aux cours ni un substitut aux corrections déterministes. Ne le présente pas comme disponible si aucun service n’est configuré. Les leçons, indices et tests doivent continuer à fonctionner indépendamment.

Le tuteur intervient dans le contexte de la leçon et du travail que l’apprenant choisit de partager. Il pose une question, propose une piste, aide à lire une erreur puis offre une explication plus directe si demandée. Il ne doit pas prétendre avoir exécuté le programme si aucun outil ne l’a fait, ni affirmer que des tests passent sur la base de son seul jugement.

Prévois des limites de requêtes et de coût, une gestion des pannes, des règles de conservation et une information claire sur les éléments transmis au service. Les clés restent côté serveur. Les documents, commentaires et sorties du programme sont des données non fiables ; leurs instructions ne peuvent pas modifier les règles du tuteur ni lui faire révéler des informations d’un autre utilisateur.

Un contrôle pédagogique doit vérifier les explications, pas seulement leur fluidité. Prévois des cas d’évaluation où le tuteur rencontre une solution valide inhabituelle, une erreur de débutant, un énoncé ambigu et une demande de correction complète. Une aide générique ne doit pas être présentée comme une correction personnalisée validée.

## 21. Données, comptes et outils éditoriaux

Adapte le modèle existant au lieu d’imposer un second système parallèle. Il doit représenter les technologies, domaines, parcours, cours, modules, leçons, activités, exercices, projets, compétences, prérequis, ressources et versions. Les comptes portent uniquement les données personnelles nécessaires. Les tentatives, brouillons, validations, récompenses et préférences sont distincts des contenus pédagogiques.

### 21.1 Informations et relations essentielles

| Objet | Informations indispensables et contraintes |
|---|---|
| Technologie | Identifiant stable, nom, type, description, catégories, icône autorisée et cours associés. |
| Cours | Identifiant stable, URL lisible, titre, niveau, objectifs, langue, technologies, prérequis, modules ordonnés, projet, statut, version et révision technique. |
| Module et leçon | Identifiant stable, position, objectifs, contenu structuré, activités, ressources, version et statut de publication. |
| Exercice | Type, consigne, contrat, exemples, capacités requises, environnement compatible, fichiers initiaux, vérifications, indices et correction. |
| Projet | Contexte, livrables, jalons, grille, critères obligatoires, méthode de validation et prolongements facultatifs. |
| Parcours | Objectif, public, étapes ordonnées, alternatives possibles, prérequis, projet de synthèse et règles d’achèvement. |
| Compétence | Libellé observable, liens vers enseignement et évaluation ; distinguer une compétence simplement rencontrée d’une capacité validée. |
| Tentative | Utilisateur, activité, version, statut, horodatage, résultat, aide consultée et traces utiles dans une limite définie. |
| Brouillon | Propriétaire, activité et version, fichiers, date de sauvegarde, révision de concurrence et politique de conservation. |
| Progression | Utilisateur, cours ou parcours, version, activités obligatoires terminées, dates et état. |
| Récompense | Propriétaire, règle, événement d’origine unique, montant ou badge et date d’attribution. |
| Ressource externe | URL, titre, auteur lorsque connu, rôle, licence ou autorisation vérifiée, date, modifications et attribution exigée. |

Valide les relations : aucune leçon orpheline, aucun doublon d’URL, aucun prérequis absent, aucune boucle dans les dépendances de cours. Les comptes de modules et durées affichés doivent découler du contenu. Distingue les estimations éditoriales des statistiques réellement mesurées.

### 21.2 Publication et révision

Prévois un cycle brouillon → révision → publié → archivé. Une donnée de catalogue en préparation peut avoir un programme visible, mais son état doit être clair et aucun bouton « Commencer » ne doit conduire à un contenu vide. Un cours publié ne contient ni faux exercice, ni texte de remplissage, ni correction absente. Évite la génération d’articles à chaque chargement de page.

L’outil éditorial, existant ou ajouté progressivement, permet de modifier le plan, prévisualiser une leçon, vérifier un exercice avec sa solution de référence, contrôler les liens et consulter la couverture des objectifs. Chaque changement garde une trace de version et un auteur ou rôle responsable lorsqu’il est disponible. Une modification importante de consigne ne doit pas invalider silencieusement une ancienne tentative.

Si aucun CMS n’existe, un format de contenu structuré et versionné peut convenir au départ. Le rendu doit rester indépendant du texte d’un cours particulier. L’équipe doit pouvoir ajouter une nouvelle série sans réécrire les composants d’interface. Le choix entre fichiers, CMS et base dépend de l’architecture observée et des besoins réels d’édition.

### 21.3 Comptes et protection des données

Un visiteur peut découvrir le catalogue et, si l’architecture le permet, essayer une première leçon. Les limites de sauvegarde sont expliquées avant qu’il investisse du temps. Un compte apporte la reprise multiappareil et l’historique. Ne modifie pas les règles d’inscription ou d’accès existantes sans raison liée à cette mission.

Vérifie les autorisations sur le serveur ou le service de données, pas seulement dans l’interface. Un apprenant ne doit pas publier un cours, lire un brouillon privé d’un autre compte ni attribuer ses propres récompenses. Les évaluations réservées et les secrets restent dans leur périmètre autorisé.

Ne journalise pas automatiquement chaque caractère tapé. Collecte des événements utiles et limités : début d’activité, exécution, soumission, catégorie d’erreur, validation, reprise et recommandation ouverte. Définis la durée de conservation des tentatives et fichiers. Les options de suppression et d’export s’intègrent aux fonctions de compte existantes.

Les informations techniques destinées aux administrateurs ne doivent pas encombrer le parcours d’apprentissage. Une erreur utilisateur mérite un message français exploitable ; une trace détaillée est conservée dans l’outil adapté sans exposer de secret.

## 22. Direction visuelle, accessibilité et connexions limitées

Le style doit être Nunya : commence par relever ses couleurs, sa typographie, ses espacements, ses icônes, ses composants et son ton. Propose une extension de ce langage visuel pour l’apprentissage. Si l’identité existante est incomplète, définis quelques règles cohérentes plutôt que de combiner les styles vert, orange, violet et brun des différents sites de référence.

L’interface peut utiliser plusieurs accents par domaine, des cartes illustrées, des barres de progression et des célébrations discrètes. Le contenu reste sobre pendant la leçon. Les couleurs servent de repères et ne doivent pas être la seule manière de communiquer un état, un niveau ou une erreur.

Élabore des composants réutilisables pour recherche, filtres, carte de cours, badge de niveau, accordéon, progression, fil d’Ariane, panneau d’exercice, résultat de test, encadré pédagogique et recommandation. Prévois pour chacun les états normal, focus, chargement, vide, erreur et indisponibilité lorsque pertinents. Un composant ne doit pas sembler actif si son action n’existe pas.

Cible une accessibilité conforme aux critères WCAG 2.2 de niveau AA pertinents pour les parcours livrés, à vérifier avec la documentation normative. Vérifie notamment navigation clavier, ordre du focus, libellés, contrastes, sémantique, réorganisation à fort zoom et annonces des résultats. N’annonce pas une conformité globale uniquement sur la base d’un outil automatique.

Teste les vues autour de 360–390 px, tablette, petit ordinateur et grand écran, ainsi qu’un agrandissement du texte à 200 %. Les barres fixes ne masquent pas les contenus ou le focus. La zone de code peut défiler horizontalement, mais le reste de la page doit se réorganiser. Une police de code plus grande ne doit pas rendre les boutons inaccessibles.

Les thèmes clair et sombre suivent la préférence de l’utilisateur si le projet les propose, avec choix manuel persistant. Respecte la réduction des mouvements. Les célébrations ne se déclenchent pas en boucle et peuvent être désactivées. Les erreurs et résultats doivent être compréhensibles sans son ni animation.

Les vidéos sont facultatives et ne constituent pas l’unique support. Prévois une explication textuelle et, lorsqu’une vidéo existe, une transcription ou un équivalent adapté. Charge les moteurs de code seulement quand ils sont nécessaires ; informe l’utilisateur de leur chargement et de leurs limites.

Optimise les images, évite les polices inutiles et conserve un catalogue utilisable sur connexion modeste. Une panne de moteur ne doit pas faire disparaître le texte de la leçon. L’interface différencie absence de réseau, chargement du moteur et réponse incorrecte.

L’accès hors ligne est progressif : si le projet le permet, enregistrer les leçons déjà consultées et les brouillons, puis synchroniser les activités avec des identifiants uniques. N’annonce pas « tout fonctionne hors ligne » lorsque les compilateurs, l’IA ou certaines évaluations ont besoin d’un serveur. Si cette fonction n’est pas livrée, les travaux locaux doivent au minimum être protégés contre une perte de connexion et exportables quand cela est possible.

Établis des mesures de performance sur une configuration de test décrite. Observe le catalogue, l’ouverture d’une leçon et le premier lancement de moteur séparément. N’invente pas de score ou de délai universel. Une lourde bibliothèque d’édition ne doit pas être chargée sur une page qui n’en a pas besoin.

## 23. Sources, réutilisation et identité éditoriale

Les références visuelles servent à retrouver des mécanismes utiles : catégories visibles, filtres, programmes détaillés, progression, cartes lisibles et liens entre cours et pratique. Il faut produire une composition Nunya cohérente, pas une reproduction globale d’un site ou un habillage de son contenu.

Pour écrire un cours, pars des objectifs, des prérequis et des connaissances techniques vérifiées. Tu peux consulter des sources fiables pour comprendre et contrôler l’exactitude, puis rédiger tes propres explications, exemples et activités. Les notions techniques communes n’exigent pas de réinventer le fonctionnement d’une boucle ou d’une requête HTTP. En revanche, ne copie pas un ensemble de paragraphes, d’exercices distinctifs ou de visuels en changeant seulement quelques mots.

Une reprise directe est possible lorsqu’une licence, une autorisation ou une autre base applicable permet effectivement l’usage prévu. Vérifie la ressource précise : la licence d’un dépôt de code ne couvre pas nécessairement tous les articles ou images du site associé. Distingue l’usage du logiciel d’une plateforme et celui de ses contenus de cours. Le caractère gratuit à consulter n’établit pas une autorisation de republier.

En cas de reprise, conserve la source, le titulaire indiqué, la licence exacte, les conditions utiles, l’éventuelle obligation d’attribution, les modifications et la date de vérification. Vérifie la compatibilité avec le mode de diffusion et le modèle économique réel de Nunya, y compris les éventuelles limites commerciales ou obligations de partage. Ne suppose pas que toutes les licences ouvertes ont les mêmes conditions.

Une traduction est une adaptation de texte ; elle ne doit pas être utilisée comme moyen automatique de contourner les conditions de réutilisation. Une simple attribution ne suffit pas non plus si la reprise n’est pas autorisée. Quand les droits restent incertains, préfère une rédaction et des exercices indépendants ou un lien vers la ressource. Ne promets jamais une absence absolue de risque juridique sur la seule base de cette consigne.

Les documentations officielles constituent les sources techniques prioritaires : documentation du langage, normes web, guides du framework, documentation du moteur de données et outils concernés. Vérifie aussi leurs conditions avant de reproduire un extrait ou une illustration. Les liens de sources peuvent être présentés discrètement à la fin des leçons sans détourner l’utilisateur de Nunya.

Crée un registre éditorial des sources et éléments repris, intégré aux conventions du dépôt. Les contenus entièrement originaux y sont identifiables sans revendiquer une exclusivité sur les concepts enseignés. Ne réutilise pas les logos, mascottes, captures ou noms de cours distinctifs d’autres plateformes comme identité Nunya. Les captures fournies au projet servent de références internes sauf autorisation supplémentaire.

## 24. Plan de réalisation par lots et conservation du contexte

L’objectif est étendu : un seul changement massif ne permet pas de garantir simultanément intégration, profondeur pédagogique et vérification. Travaille par lots avec un état de couverture persistant. Ne confonds pas la liste du catalogue cible, les contenus préparés, les contenus révisés et les contenus publiés.

### Lot 0 — diagnostic et contrat d’intégration

Inspecter le dépôt ; identifier les composants réutilisables, données et contraintes ; établir l’écart avec ce document ; proposer la structure cible ; préparer la matrice de couverture et les décisions nécessaires. Faire fonctionner les vérifications de référence lorsque l’environnement le permet. Distinguer les défauts préexistants de ceux introduits ensuite.

Livrables attendus dans les conventions du dépôt : un audit, un plan de réalisation et une matrice qui relie chaque exigence à son état et à sa méthode de vérification. Ne marque aucune fonction comme réalisée à ce stade sur la seule base d’une maquette.

### Lot 1 — une expérience complète de bout en bout

Construire le socle catalogue → fiche → programme → leçon → exercice exécuté → vérification → sauvegarde → reprise → recommandation. Préparer un module Python sur les fonctions et un module web HTML/CSS pour éprouver deux environnements différents, avec toutes leurs leçons et activités complètes. Intégrer les états d’erreur et l’accessibilité dès ce lot.

Ces modules pilotes servent à vérifier l’architecture et le niveau pédagogique. Ils ne doivent pas être étiquetés comme cours entiers de 20 heures. Dans un environnement de travail, ils peuvent être des aperçus ou extraits explicitement identifiés ; leur publication comme cours complets attend l’achèvement des cours correspondants.

### Lot 2 — les six cours fondamentaux entièrement publiables

Terminer Python débutant, HTML débutant, CSS débutant, JavaScript débutant, SQL débutant et Git débutant. Chacun doit avoir un programme complet, des leçons rédigées, une pratique régulière, un projet final, des corrections, des vérifications et une suite recommandée. Intégrer le parcours découverte et le début du parcours front-end. Ajouter les mécanismes de progression et récompenses éprouvés sur ces activités réelles.

Le tronc commun numérique et l’orientation peuvent être des modules séparés de préparation. Le cours Git peut nécessiter un environnement particulier : ne simule pas des commandes réussies dans un faux terminal sans le signaler et sans expliquer la portée pédagogique de l’activité.

### Lot 3 — approfondissement des séries centrales

Compléter Python, HTML, CSS et JavaScript aux niveaux intermédiaire et avancé ; ajouter TypeScript, React, Node.js, HTTP/API REST et les bases de données nécessaires. Construire des projets qui relient ces cours. Fournir les guides directement utiles et les parcours front-end, back-end et full-stack cohérents.

Livrer les autres frameworks et spécialisations web en sous-lots distincts pour éviter de dupliquer les notions et d’ouvrir trop de cours incomplets. Le catalogue cible reste visible dans le suivi interne.

### Lot 4 — données, IA, cybersécurité, cloud et mobile

Construire les séries et parcours correspondants avec leurs prérequis, environnements adaptés et projets. Introduire le tuteur IA seulement lorsque le service, les coûts et l’évaluation sont traités. Un projet cloud payant ou une fonctionnalité nécessitant un compte externe doit avoir une alternative pédagogique ou une exigence clairement annoncée.

### Lot 5 — extension complète des familles de langages

Achever les trois niveaux des autres familles de la matrice et les spécialisations associées, par groupes compatibles avec les moteurs d’exécution. Vérifier chaque environnement au lieu d’extrapoler à partir de Python et JavaScript. Enrichir les cours avec des projets propres à chaque écosystème, sans répéter les mêmes pages sous des noms différents.

### Règles de suivi entre lots

Pour chaque cours et fonction, tenir un état : prévu, en cours, à réviser, vérifié, publié ou bloqué. Ajouter l’identifiant, le responsable ou rôle si connu, les livrables existants, la prochaine action et la preuve de validation. Une limite de contexte ne justifie pas de prétendre que le reste est terminé.

En fin de session, enregistrer un point de reprise : état actuel, fichiers concernés, commandes utiles, derniers résultats de vérification, décisions prises, contraintes et prochain sous-lot. En reprenant, relire ce suivi et vérifier le dépôt avant de continuer. Ne recrée pas ce qui est déjà achevé et ne modifie pas les décisions établies sans justification.

Si une capacité d’exécution manque, nommer précisément le blocage, ce qui reste utilisable et ce qu’il faut décider. Un blocage de compilateur pour un langage ne doit pas empêcher d’avancer sur le contenu ou les autres environnements indépendants. Les alternatives doivent être clairement présentées, jamais maquillées en fonctions opérationnelles.

## 25. Critères d’acceptation et vérifications

Ces critères s’appliquent aux périmètres effectivement livrés. Le rapport final précise ce qui passe, ce qui reste à vérifier et ce qui appartient à un prochain lot. Exécute les outils appropriés au dépôt. Ne déclare pas un test réussi parce qu’un fichier de test existe.

| Référence | Critère vérifiable | Preuve attendue |
|---|---|---|
| NAV-01 | « Apprendre à Coder » est accessible depuis la navigation existante. | Parcours réel sans lien cassé ni régression sur les autres espaces. |
| CAT-01 | Recherche et filtres combinés renvoient les contenus attendus. | Cas avec plusieurs technologies, un niveau, accents, aucun résultat et remise à zéro. |
| CAT-02 | L’état des filtres survit au retour arrière et est partageable. | Ouverture d’un lien filtré et navigation aller-retour. |
| CAT-03 | Les cartes affichent des données vraies et un état de disponibilité clair. | Comparaison avec les contenus, compteurs et durées enregistrés. |
| CRS-01 | Chaque cours publié contient le programme annoncé et ses évaluations. | Contrôle des objectifs, leçons, exercices, corrections et projet. |
| LES-01 | Une leçon relie explication, activité, aide et retour. | Réalisation d’une activité complète par un utilisateur de test. |
| RUN-01 | Exécuter et vérifier ont des comportements distincts et réels. | Programme correct, programme incorrect et solution valide différente. |
| RUN-02 | Les limites d’exécution sont appliquées. | Boucle infinie interrompue, sortie excessive maîtrisée et moteur récupérable. |
| RUN-03 | Le programme ne peut pas accéder à la session ou au système de Nunya. | Vérifications adaptées à l’isolation choisie, avec périmètre documenté. |
| ERR-01 | Les erreurs de programme et pannes d’outil sont distinguées en français. | Cas d’erreur de syntaxe, réponse fausse, moteur indisponible et panne réseau. |
| SAV-01 | Un brouillon et sa progression sont retrouvés après rechargement. | Reprise locale et, si livrée, multiappareil ; conflit de versions traité. |
| PRG-01 | L’achèvement suit les règles pédagogiques publiées. | Une lecture seule ne valide pas un projet ; activité obligatoire manquante détectée. |
| PRG-02 | Les mises à jour de cours préservent l’historique. | Cas d’un cours terminé dont une nouvelle activité est ajoutée. |
| REC-01 | Les recommandations respectent les prérequis et leur disponibilité. | Cas d’un débutant, d’un cours terminé et d’une absence de suite publiée. |
| XP-01 | Les récompenses ne sont attribuées qu’une fois par événement éligible. | Double clic, nouvelle tentative réseau et synchronisation répétée. |
| STK-01 | La série respecte la règle de journée et de pause affichée. | Minuit, fuseau, changement d’heure et activité tardivement synchronisée. |
| SEC-01 | Les comptes n’accèdent pas aux données et actions privées d’autrui. | Tentatives contrôlées de lecture, modification, publication et attribution de points. |
| FR-01 | L’expérience publiée est en français et techniquement exacte. | Relecture des écrans, erreurs, indices, corrections et références de versions. |
| A11Y-01 | Le parcours essentiel fonctionne au clavier et avec les aides prévues. | Contrôle manuel du focus, accordéons, filtres, éditeur et annonces de résultat. |
| MOB-01 | Catalogue et leçon restent utilisables sur mobile et avec texte agrandi. | Vérifications aux tailles prévues, sans masque par les éléments fixes. |
| SRC-01 | Les reprises directes disposent d’une provenance et de conditions vérifiées. | Registre de sources et attributions présentes où nécessaires. |
| ADM-01 | Un contenu incomplet ne peut pas apparaître comme cours achevé. | Publication refusée ou statut d’aperçu explicite ; permissions vérifiées. |
| REG-01 | La refonte préserve les fonctions voisines pertinentes. | Vérifications de navigation, connexion et espaces adjacents selon les changements. |

Pour les cours, vérifie la solution de référence sur tous les cas prévus, puis au moins une solution alternative valide lorsque pertinent. Contrôle aussi qu’une solution manifestement incorrecte ne passe pas. Les contrôles de DOM ou de style ne doivent pas imposer arbitrairement une seule structure si plusieurs réponses satisfont l’objectif.

Pour les programmes et les parcours, vérifie automatiquement lorsque raisonnable les identifiants, liens, états de publication, prérequis et cycles. Complète par une revue humaine des explications et de la progression. Un programme qui compile peut enseigner une mauvaise notion ; un beau texte ne prouve pas qu’un exercice fonctionne.

Rends compte des limites honnêtement. Les vérifications automatiques, manuelles et non exécutées sont distinguées. Si aucun navigateur ou service requis n’est disponible, prépare les vérifications possibles et signale précisément ce qui reste, sans inventer de capture, résultat ou mesure.

## 26. Résultat de chaque livraison et ordre de démarrage

À chaque livraison, fournis une explication brève du comportement obtenu, les zones du projet modifiées, le contenu pédagogique réellement terminé, les vérifications exécutées et leurs résultats, les limites connues et le prochain sous-lot. Mets à jour le suivi avant de conclure. La documentation doit suffire à ton collaborateur pour reprendre le travail.

Ne présente pas une page avec soixante-douze cartes comme un catalogue terminé si ses leçons n’existent pas. Ne présente pas une maquette comme un environnement de programmation opérationnel. Ne masque pas la différence entre texte rédigé, correction vérifiée et publication réelle.

Commence maintenant par le lot 0 dans le dépôt fourni. Si l’inspection confirme que les choix nécessaires sont ordinaires et réversibles, poursuis avec le premier sous-lot d’intégration. Si une décision réellement bloquante apparaît, formule une question ciblée avec le choix à faire et sa conséquence concrète. Le but est une évolution exécutable et suivie de Nunya, avec une progression constante vers l’ensemble du catalogue cible.

---

## Annexe A — Couverture des 20 captures fournies

Les captures sont datées du 3 novembre 2026. Les heures ci-dessous identifient leurs noms de fichiers ; elles n’indiquent pas des statistiques du produit. Chaque image a été examinée comme référence d’organisation ou de présentation. Les éléments périphériques ne constituent pas tous des fonctions à reproduire.

| Capture | Observation utile | Traduction dans Nunya | Sections |
|---|---|---|---|
| 8.18.04 PM | Cartes colorées de technologies, étiquettes et accès à des outils de pratique. | Cartes identifiables, catégories lisibles, accès aux exercices et aperçu des outils. | 5, 6, 19, 22 |
| 8.18.26 PM | Rubriques HTML repliables et liens vers des ressources complémentaires. | Programme structuré, accordéons accessibles et références par notion. | 7, 13, 19 |
| 8.19.30 PM | Cartes Python, bases informatiques, Java, C++, HTML et CSS avec volumes annoncés. | Catalogue par niveaux ; compteurs issus des contenus, sans reprendre les prix ni promesses. | 6, 10, 15 |
| 8.19.45 PM | Chapitre Python consacré aux fonctions avec sous-notions et atelier. | Granularité réelle des modules, progression entre fonctions simples et concepts avancés. | 8, 12, 14 |
| 8.20.02 PM | Séparation entre Python avancé et applications pratiques : fichiers, API, données et tests. | Cours intermédiaires, avancés et spécialisations reliés sans mélange de niveaux. | 10, 12 |
| 8.20.23 PM | Arborescence Python, étapes terminées et projets répartis dans le programme. | Programme hiérarchique, progression persistante, projets et bilans. | 7, 12, 16 |
| 8.20.44 PM | Article pédagogique sur les listes avec texte explicatif et exemples successifs. | Leçons françaises approfondies, exemples commentés, traçage et exercices liés. | 8, 14, 15 |
| 8.21.17 PM | Parcours recommandés par domaines et défi quotidien. | Parcours front-end, back-end, Python, bases de données et pratique du jour. | 5, 11, 18 |
| 8.22.10 PM | Grille de cours avec catégories, niveaux et durées. | Cartes comparables, durée indicative et objectifs observables. | 6, 10 |
| 8.22.33 PM | Page de bases informatiques et recherche dans le programme. | Entrée pour débutant complet et recherche au sein des leçons. | 5, 7, 11 |
| 8.22.56 PM | Cours plus ciblés : formulaires, boîtes CSS, Bash, typographie et structures de données. | Ateliers spécialisés reliés aux cours de niveau ; ne pas tout fusionner en un cours géant. | 4, 10, 13 |
| 8.23.13 PM | Filtre multisélection par sujet. | Recherche technologique et filtres combinés avec états actifs visibles. | 6 |
| 8.23.30 PM | Filtre par niveau et présence de guides associés. | Trois niveaux explicites et bibliothèque de guides reliée au catalogue. | 6, 19 |
| 8.24.01 PM | Liste élargie de guides : API, code lisible, architecture, Docker, IA et autres technologies. | Taxonomie de guides français et liens vers les cours correspondants. | 10, 19 |
| 8.24.50 PM | Cartes d’API/Express/Spring montrant niveaux, durée et attestations. | Métadonnées utiles et transparence sur une attestation interne ; absence d’avis inventés. | 6, 10, 16 |
| 8.25.27 PM | Distinction tutoriels, cours et préparation technique. | Séparer référence rapide, cours guidé et préparation de portfolio/entretien. | 4, 11, 19 |
| 8.26.15 PM | Domaines spécialisés : IA générative, apprentissage automatique, cloud, blockchain et VLSI. | Parcours spécialisés avec prérequis ; extensions de programmation identifiées. | 10, 11, 13 |
| 8.26.41 PM | Programme cybersécurité : défense, Python/Linux, menaces, chiffrement et accès. | Parcours défensif structuré, laboratoires contrôlés et projet vérifiable. | 11, 25 |
| 8.27.01 PM | Bibliothèque de vingt langages et outils annexes. | Couverture des vingt langages visibles, plus HTML/CSS/SQL/Bash, et outils pédagogiques prioritaires. | 10, 19 |
| 8.27.46 PM | Organisation par grandes familles : web, programmation, données, mobile, DevOps, qualité et secteurs voisins. | Navigation par domaines et distinction entre programmation et extensions hors périmètre. | 4, 10, 11 |

## Annexe B — Matrice des demandes du propriétaire

| Demande | Réponse prévue | Condition de réussite |
|---|---|---|
| Comprendre le travail déjà réalisé par le collaborateur | Audit et intégration à l’existant. | Aucune architecture inventée ni écrasement du travail en cours. |
| Réorganiser « Apprendre à Coder » | Accueil, catalogue, technologies, parcours et filtres. | Un débutant trouve un point de départ et un utilisateur expérimenté une notion précise. |
| Offrir des cours de plusieurs niveaux | Matrice de 24 familles avec trois niveaux et séries complémentaires. | Profondeur propre à chaque niveau ; état réel des contenus visible. |
| Apprendre entièrement en français | Français sur contenus, consignes, aide et interface. | Parcours complet compréhensible sans anglais technique préalable. |
| S’inspirer des sites sans recopier leurs contenus | Réemploi de principes d’organisation ; créations propres et reprises autorisées documentées. | Sources vérifiées et identité Nunya cohérente. |
| Avoir articles, exercices et code dans le navigateur | Leçon, éditeur, vérifications, console et guides associés. | Activité réelle, retour utile et sauvegarde récupérable. |
| Savoir quoi apprendre après un cours | Recommandations fondées sur les prérequis et objectifs. | Suite disponible, adaptée et expliquée. |
| Organiser les compétences par métier ou domaine | Parcours web, données, IA, sécurité, cloud, mobile et autres objectifs. | Ordre réaliste, cours communs partagés et projet de synthèse. |
| Encourager une pratique quotidienne | XP, séries, badges, défis et révisions. | Récompenses fiables et motivation sans pénalité sur les acquis. |
| Obtenir une interface interactive et colorée | Système visuel Nunya, activités variées et mode concentration. | Lisibilité, accessibilité, mobile et états d’erreur cohérents. |
| Donner une consigne complète à Claude Code | Plan par lots, suivi persistant et critères d’acceptation. | Distinguer clairement vision finale, lot terminé et travail restant. |

## Annexe C — Références et portée de l’analyse

Les références visuelles principales sont les vingt captures fournies par le propriétaire. Les propositions pédagogiques, catalogues et règles produit de ce document sont une synthèse originale pour Nunya ; elles ne prétendent pas décrire le fonctionnement interne des plateformes citées.

Liens de repérage :

- [GeeksforGeeks — tutoriel HTML](https://www.geeksforgeeks.org/html/html-tutorial/) : page consultée pour confirmer les familles de notions et les rubriques de navigation visibles dans les captures.
- [TutorialsPoint](https://www.tutorialspoint.com) : page consultée pour confirmer la distinction entre catégories, technologies, pratique et outils. Les listes Nunya ont été conçues à partir de la demande et des captures, sans reprise des textes promotionnels.
- [OpenClassrooms — catalogue français, page 2](https://openclassrooms.com/fr/courses?page=2) : référence indiquée par le propriétaire ; la consultation textuelle n’a renvoyé qu’un écran demandant un navigateur avec JavaScript. Aucune caractéristique détaillée de cette page n’est donc présentée comme vérifiée.
- [freeCodeCamp — catalogue](https://www.freecodecamp.org/catalog) : la consultation textuelle n’a pas fourni de contenu exploitable ; les observations sur la grille, les niveaux, les durées, les programmes et la progression reposent sur les captures fournies.
- [Tutorix — cours](https://ai.tutorix.com/courses) : référence identifiée dans les captures ; les observations qui lui sont associées proviennent de ces images.
- [OMPI — questions fréquentes sur le droit d’auteur](https://www.wipo.int/en/web/copyright/faq-copyright) : repère général pour distinguer idées et expression, autorisation de réutilisation et adaptation. La licence de chaque élément reste à vérifier pour l’usage concret de Nunya.

Les documentations officielles des technologies et les recommandations d’accessibilité devront être consultées pendant l’implémentation et la rédaction effective des cours. Ce document ne fige pas des versions techniques qui n’ont pas été inspectées dans le projet.

# FIN DU PROMPT
