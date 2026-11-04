# Cours par niveau — état des lieux au 4 novembre 2026

## Référence et périmètre

Les deux fichiers fournis, « NUNYA_Prompt_Maitre_Claude_Code.md » et sa copie « (1).md », ont un contenu identique. Ils définissent le catalogue cible et une réalisation par lots ; ils ne décrivent pas des cours déjà présents. Audit effectué sur le dépôt de la production 5.2.0 (commit c4c548ba), puis rapproché du correctif de navigation 5.2.1. Aucune nouvelle carte de cours vide n’est publiée par cet audit.

## Ce qui existe déjà et doit être réutilisé

| Élément | Preuve dans le dépôt | État |
|---|---|---|
| Cours Python depuis zéro | content/fr/python-bases, data/curriculum/python-bases.json | 4 modules, 22 leçons, 88 exercices et 66 questions ; environ 7 h 20 indicatives. Les 278 cas de référence passent. Brouillons à relire ; programme débutant complet encore inachevé. |
| Éditeur Python et correction | lib/editor/python-editor.mjs, dist/coding-python-worker.js | CodeMirror et Pyodide locaux, saisies simulées, indices, explications d’erreurs, timeout et sortie bornée. Limite mémoire stricte non garantie. |
| Programme, carte, prérequis et recherche | dist/coding-curriculum.js, dist/academy-core.js | Routes et références partagées ; cartes, progression et recherche groupée existent. |
| Personnalisation par niveau | dist/onboarding-flow.js, assessment-engine.js, placement-mapping.js | Questionnaire et scores compréhension/déduction présents ; orientation vers des étapes existantes. Ne constitue pas trois cours complets par technologie. |
| Reprise et hors ligne | dist/localdb.js, dist/sw.js, sauvegarde curriculum | Progrès et brouillons locaux, export et caches ; le moteur Python s’enregistre séparément. Pas de synchronisation multiappareil active dans le parcours inspecté. |
| Aperçus HTML/CSS/JS | content/fr/web.json, javascript.json ; anciens éditeurs dans dist/app.js | 6 leçons web courtes et 4 leçons JavaScript courtes ; supports et moteurs existants à réutiliser, sans les compter comme cours complets par niveau. |
| Repères SQL, Git, algorithmes | content/fr/sql.json, git.json, algorithms.json | 4 leçons courtes par série ; pas d’équivalent aux cours approfondis demandés. |
| Bibliothèque | dist/library, dist/library-explorer.js | Articles et vidéos de référence existent. Leur nombre n’est pas le nombre de cours structurés achevés. |
| Parcours métiers | data/academy_paths.json | 15 parcours référencés, dont 3 initiations techniques ; plusieurs rubriques sont masquées ou « bientôt » par les flags 5.2. |
| Mathématiques | content/fr/maths-seconde.json, data/school_practice.json | Pilote de 8 leçons ; correctif 5.2.1 : 5 questions par leçon, navigation et reprise. Ne vaut pas couverture complète du programme scolaire. |
| Comptes et base | supabase/migrations ; README et .env.example | Provisionnement et migrations documentés dans le commit du collaborateur. L’expérience élève inspectée continue de sauvegarder localement ; ne pas activer ou réécrire l’authentification dans un simple correctif de questions. |

## Ajouts nécessaires, dans l’ordre

1. **Compléter le socle Python débutant** : chaînes/listes, choix des collections, fonctions, résolution de problème, erreurs et projet d’inventaire/réservation, puis bilan et orientation. Garder les 22 leçons actuelles, leurs identifiants et leurs acquis. Le nouveau prompt vise 12 modules débutants, alors que le plan v5 en prévoyait 10 : conserver les identifiants M1–M4 et faire correspondre explicitement les nouveaux modules, sans renumérotation destructive.
2. **Éprouver le second environnement** : module HTML/CSS avec formulaire accessible, aperçu et vérifications du DOM ; leçon étalon fonctions avec arguments/retour, puis leurs variantes et cas limites. Les exemples doivent utiliser uniquement des prérequis enseignés.
3. **Terminer les six cours fondamentaux** : Python, HTML, CSS, JavaScript, SQL et Git débutants, chacun avec programme, exercices, projet, correction et suite. SQL nécessite un moteur réel ; Git nécessite un environnement explicite, sans faux terminal qui prétend exécuter les commandes.
4. **Ajouter les niveaux intermédiaire et avancé** : cours distincts, capacités et projets propres, dépendances reliées aux acquis. Ni le choix de niveau du questionnaire, ni une étiquette de carte ne remplacent ces contenus.
5. **Relier les spécialisations** : React, Node.js/Express, API et données, puis IA, cybersécurité, cloud et mobile. Réutiliser les cours communs et annoncer les exigences d’environnement. Node.js n’est pas le moteur JavaScript du navigateur.
6. **Étendre les familles restantes par groupes compatibles** : C/Java/Rust et autres moteurs doivent être évalués séparément avant de promettre leur exécution dans le navigateur. Aucun abonnement, service payant ou nouvelle infrastructure n’est activé par cet audit.

## Capacités à compléter autour des cours

| Demande du prompt | Écart constaté | Prochaine action |
|---|---|---|
| Catalogue par technologie et niveau | Un seul cours canonique développé ; 11 plans « en préparation » | Modèle de niveaux et fiches de cours complètes, puis filtres combinables et URL partageable. |
| Leçons étalons fonctions / API JS / formulaire | Pas encore présentes comme trois leçons complètes au nouveau standard | Produire les contenus et tests réels, après leurs prérequis. |
| Multi-fichiers et projets | Atelier principal mono-fichier | Définir les fichiers, l’export, les limites et la persistance par projet. |
| Évaluation et recommandations | Quiz, points d’étape et recommandations d’entrée présents | Bilans de cours complets, projet validé, suite principale et alternatives adaptées. |
| Récompenses cohérentes | Compteurs et activités locaux historiques | Règles versionnées sur validations réelles, pas de faux XP ou d’accréditation. |
| Évaluation à intégrité forte | Tests formatifs visibles dans le navigateur | Si nécessaire, correcteur serveur isolé avec cas privés ; ne pas présenter les tests client comme secrets. |
| Administration et relecture | Sources Markdown, schémas et CI ; contenus en brouillon | Workflow de revue/publication et rôles réels, sans panneau public simulé. |
| Accessibilité, matériel et langue | Tests automatiques et thèmes présents | Continuer clavier, lecteur d’écran et appareils réels ; les contrôles automatiques ne certifient pas toute l’application. |

## Matrice des 72 cours cibles

Le JSON associé `data/review/course_coverage_2026-11-04.json` donne les titres, preuves et prochaines actions pour chaque entrée. « Aperçu » désigne un court support historique à enrichir, pas un cours terminé. Aucun cours intermédiaire ou avancé complet n’a été identifié dans le catalogue canonique.

| Famille | Débutant | Intermédiaire | Avancé |
|---|---|---|---|
| PY | Partiel : Python M1–M4 | À construire | À construire |
| HTML | Aperçus courts à développer | À construire | À construire |
| CSS | Aperçus courts à développer | À construire | À construire |
| JS | Aperçus courts à développer | À construire | À construire |
| TS | À construire | À construire | À construire |
| SQL | Aperçus courts à développer | À construire | À construire |
| BASH | À construire | À construire | À construire |
| JAVA | À construire | À construire | À construire |
| C | À construire | À construire | À construire |
| CPP | À construire | À construire | À construire |
| CSHARP | À construire | À construire | À construire |
| GO | À construire | À construire | À construire |
| RUST | À construire | À construire | À construire |
| SWIFT | À construire | À construire | À construire |
| KOTLIN | À construire | À construire | À construire |
| RUBY | À construire | À construire | À construire |
| PHP | À construire | À construire | À construire |
| SCALA | À construire | À construire | À construire |
| PERL | À construire | À construire | À construire |
| R | À construire | À construire | À construire |
| DART | À construire | À construire | À construire |
| LUA | À construire | À construire | À construire |
| MATLAB | À construire | À construire | À construire |
| HASKELL | À construire | À construire | À construire |

Les séries complémentaires demandées sont aussi consignées : React, Node.js et Express, Vue et Angular, Python web, Java, PHP et C# web, Git et collaboration, Algorithmique, HTTP et API REST, GraphQL, Bases de données, Linux, réseaux et systèmes, Docker, CI/CD et cloud, Qualité logicielle, Conception de systèmes, UX/UI pour développeurs, Mobile, Données et apprentissage automatique, IA générative, Objets connectés et robotique, Blockchain. Elles ne sont pas additionnées aux 72 cours comme des formations déjà réalisées.

## Point de reprise

Le correctif 5.2.1 règle les questions scolaires et des étapes métier. L’audit du catalogue est livré avec ses preuves ; il ne réalise pas tous les lots du prompt maître. Le prochain lot de contenus doit commencer par les prérequis manquants de Python et les deux modules pilotes, sans refaire l’orientation, les thèmes ou les moteurs qui fonctionnent. Statut pédagogique : relecture humaine encore nécessaire.
