# Couverture des cours — livraison 5.15.0, 10 novembre 2026

Le prompt maître impose une réalisation par lots, avec une cible finale de 72 cours répartis sur trois niveaux et des séries complémentaires. Cette livraison ne termine pas cette cible. L’audit initial est conservé dans [BASELINE_COURSE_AUDIT_5.2.1.md](BASELINE_COURSE_AUDIT_5.2.1.md).

## Contenu réel de ce lot

| Programme | Modules | Leçons | Exercices | Périmètre |
|---|---:|---:|---:|---|
| Python : les bases | 12 | 53 | 212 | Contenu original rédigé ; relecture pédagogique en cours. |
| Python intermédiaire : construire et traiter des données | 6 | 18 | 72 | Collections, fonctions, exceptions, objets, JSON/CSV et projet original ; relecture en cours. |
| CSS : premières interfaces | 4 | 12 | 48 | Contenu original rédigé ; relecture pédagogique en cours. |
| HTML : premières pages accessibles | 4 | 12 | 48 | Contenu original rédigé ; relecture pédagogique en cours. |
| JavaScript : les fondamentaux en pratique | 8 | 24 | 96 | Socle synchrone de console rédigé, jusqu’au projet final ; relecture pédagogique en cours. |
| SQL : des premières requêtes au projet de données | 6 | 18 | 72 | SQLite réel, données fictives, tableaux de résultats, contraintes et transactions ; relecture en cours. |
| HTTP et API : construire un client JavaScript | 4 | 12 | 48 | Requêtes et réponses natives sur une API pédagogique locale ; cours original à relire. |
| JavaScript : interfaces DOM | 6 | 18 | 72 | DOM natif, événements, formulaires, recherche/tri et projet ; contenu à relire. |
| React : composants et application interactive | 6 | 18 | 72 | React/ReactDOM réels, JSX, état, formulaires, effets et service de démonstration simulé ; contenu à relire. |
| HTML : documents et formulaires accessibles | 4 | 12 | 48 | Niveau intermédiaire : régions, formulaires reliés, tableaux, images, langue et annuaire ; vrai navigateur, contenu à relire. |
| Cybersécurité : défendre une petite organisation | 4 | 12 | 48 | Python hors ligne, données fictives : risques, mots de passe, hachage, hameçonnage, journaux, droits, entrées, intégrité, sauvegardes, incidents et audit ; contenu à relire. |
| Java : premiers programmes | 4 | 12 | 48 | OpenJDK 21 en ligne (Wandbox) : types, boucles, méthodes, tableaux, String, ArrayList, classes, exceptions et boutique ; contenu à relire. |
| Terminal et Linux : les bases | 4 | 12 | 48 | Bash 5.2 en ligne (Wandbox) : fichiers, grep, tubes, redirections, scripts, droits et analyse de journal ; contenu à relire. |
| C++ : les fondamentaux | 4 | 12 | 48 | GCC 13 en ligne (Wandbox) : types, boucles, fonctions, vecteurs, références, structures et bulletin ; contenu à relire. |
| PHP : les bases de la programmation | 4 | 12 | 48 | Vrai PHP 8.3 hors ligne : variables, conditions, boucles, tableaux, fonctions et caisse de boutique ; contenu à relire. |
| CSS : interfaces robustes et adaptatives | 6 | 18 | 72 | Niveau intermédiaire : cascade, Flexbox, grilles, media queries, typographie, états et thème ; styles calculés à deux largeurs, contenu à relire. |

Seize programmes principaux : 86 modules, 275 leçons, 1 100 exercices et 825 QCM. Git/GitHub et Découverte sont comptés séparément ci-dessous. DOM est une suite intermédiaire aux fondamentaux JavaScript ; ce cours ne prétend pas couvrir à lui seul tout le niveau intermédiaire.

Les leçons possèdent chacune 300–700 mots d’explication, deux exemples commentés, quatre exercices, trois questions de compréhension, des erreurs fréquentes, un glossaire et un récapitulatif. Elles sont des brouillons originaux : aucun enseignant réviseur, partenariat ou certificat externe n’est inventé. Les 22 chapitres Python antérieurs, leurs identifiants et leurs questions de fin de chapitre restent conservés.

Les 42 unités historiques de découverte possèdent maintenant 91 modules nommés qui répartissent leurs 182 leçons dans l’ordre. Une banque de 348 questions supplémentaires porte ces unités à 562 questions, en incluant les cinq questions de chaque leçon du pilote de maths. Ces introductions restent signalées comme découvertes ; elles ne deviennent pas des formations professionnelles complètes. Les 15 parcours métier et la bibliothèque gardent leur fonction propre. Les collections de ressources possèdent désormais un choix d’unité avec lien partageable.

Le niveau 0 « Découverte du numérique » ajouté par le collaborateur est conservé : 4 modules, 20 leçons et 80 activités. La bibliothèque en lecture libre, les pages Études à l’étranger et Opportunités et le panneau Nunya Aide existants sont préservés ; aucune activation de service IA ni modification de secret n’a été effectuée. Le questionnaire devient facultatif et les liens partagés restent ouverts. Les sauvegardes complètes restaurent aussi Python et Découverte, sans prétendre avoir téléchargé des fichiers sur un nouvel appareil.

Le socle Git/GitHub compte séparément 4 modules, 12 leçons, 48 activités (32 ateliers Git exécutés et 16 QCM), 36 questions de compréhension et 24 exemples. Le moteur local `isomorphic-git` et LightningFS conserve de vrais dépôts dans IndexedDB. Les opérations de branche, index, commit, fusion et résolution de conflit sont vérifiées sur leurs états réels. L’archive Git transfère aussi les objets et fichiers ; la sauvegarde générale conserve les validations et les positions. La publication sur GitHub n’est ni simulée ni validée hors ligne. Tout reste en relecture.

Le socle HTTP/API utilise le vrai fetch et les vrais objets Request/Response d’un Worker JavaScript, avec une API pédagogique stateless servie par le service worker. Les 12 leçons expliquent aussi async/await. GET/POST/PUT/DELETE, JSON, encodage, statuts, validation, erreurs et annulation sont pratiqués. L’atelier n’est pas un serveur Node ; ses réponses de démonstration n’enregistrent aucune réservation. Le catalogue relie JavaScript au cours HTTP. Un ancien service worker sans API est refusé par message avant toute requête de diagnostic.

## Ce qui reste à construire

SQL possède maintenant le socle progressif de 18 leçons décrit ci-dessus, incluant une première approche des jointures et transactions. Ce contenu ne remplace pas des niveaux intermédiaire et avancé distincts. Git/GitHub dispose désormais du socle débutant décrit ci-dessus, sans niveau intermédiaire ou avancé annoncé. Node.js et les autres familles ne possèdent pas encore leurs cours complets. Python dispose maintenant d’une série intermédiaire distincte, décrite ci-dessus ; ses 18 leçons restent en relecture. Aucun niveau avancé n’est annoncé terminé. Le socle JavaScript synchrone est rédigé ; DOM, événements et asynchronisme appartiennent à une suite distincte.

La suite doit approfondir les séries DOM et React, et produire TypeScript, asynchronisme approfondi et Node.js après leurs prérequis et avec un moteur réel adapté. Les niveaux intermédiaire et avancé doivent avoir leurs propres leçons, projets et évaluations ; une sélection de niveau ne doit pas réutiliser artificiellement le même contenu. Les autres familles restent suivies dans la matrice JSON de 72 entrées, avec les 20 séries complémentaires. Aucun cours vide n’est ajouté pour augmenter le compteur.

## Vérifications et limites

- Git : 32 situations initiales rejetées, 32 objectifs atteints par 101 opérations réelles ; reprise, archives et restauration invalide sans écraser le dépôt vérifiées. Les 48 activités et 36 questions parcourues sur 360 et 1440 px, y compris à froid hors ligne ; axe : zéro violation sur les vues testées.
- HTTP : 162 cas de référence, 48 solutions acceptées et 48 codes de départ rejetés, 24 exemples. API froide hors ligne, AbortController, erreur réseau, refus d’une URL Request masquée et import externe bloqué par CSP vérifiés. Les 12 leçons, 48 exercices et 36 questions sont parcourus sur 360 et 1440 px puis repris à froid hors ligne ; axe : zéro violation sur les vues testées. Voir `HTTP_ENGINE_RESULTS.json` et `HTTP_UI_RESULTS.json`.
- Audit initial de 78 écrans de production avant les changements.
- SQL : 36 exemples et 176 cas de référence exécutés avec SQLite/sql.js réel ; 72 solutions acceptées, 72 codes de départ et scripts vides rejetés. Arrêt du Worker, résultat vide avec colonnes, erreurs, limite de l’allocateur SQLite et redémarrage à froid hors ligne vérifiés. Voir `SQL_ENGINE_RESULTS.json` et `SQL_UI_RESULTS.json`.
- 202 tests unitaires ; schémas, ordre des prérequis, propriété des modules et liens internes contrôlés.
- 1 022 cas Python en CPython, exemples et solutions ; 274 cas JavaScript dans le même protocole que le Worker.
- 96 solutions HTML/CSS acceptées et 96 codes de départ rejetés par le vrai vérificateur de navigateur.
- 42 unités / 182 leçons / 562 questions parcourues sur 360 et 1440 px ; aucun saut vers une leçon suivante avant la fin des questions.
- Neuf séries / 185 leçons affichées ; navigation des exercices et mini-quiz, mauvaise réponse, retour, rechargement, ancien chapitre revu et reprise hors ligne testés. Axe : zéro violation sur les vues de leçon testées, sans prétention de certification complète.
- Fonctions Python, absence de mutation/copie, réservation et JavaScript vérifiés dans les vrais Workers. Délai et arrêt JavaScript testés. Les tests sont formatifs, livrés au navigateur ; ils ne sont pas une frontière d’intégrité d’examen.

Les correspondances aux programmes scolaires, la relecture des nouveaux contenus et les essais avec de vrais élèves restent nécessaires. Les ateliers DOM/React sont décrits dans `INTERACTIVE_WORKSHOPS.md` ; leurs rapports distinguent vérification technique et relecture pédagogique. Les contrôles de liens externes sous réseau restreint retournent des liens non confirmés ; cela ne prouve pas que tous les fournisseurs sont joignables. Comptes et synchronisation distante restent hors de ce lot, conformément au choix de conservation locale.

Les 16 exercices de variables, conversions, chaînes et booléens du module Python 2 vérifient aussi les valeurs et types réellement créés. Le module 1 enseigne précisément l’affichage de textes : produire ces textes y est un objectif valide, pas un contournement. Ces contrôles locaux sont formatifs et ne constituent pas un système d’examen sécurisé.
