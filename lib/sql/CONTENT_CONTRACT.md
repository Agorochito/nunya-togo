# SQL débutant — contrat de rédaction et de vérification

Cours original `sql-bases` :6 modules×3 leçons =18 leçons,72 exercices. Français, public13+, sans prérequis de programmation. Moteur réel SQLite/sql.js auto-hébergé dans un Worker ; aucune connexion distante. Même format Markdown/frontmatter JSON et `.exercises.json` que content/fr/http-bases. 300–700 mots d’explication par leçon, deux exemples SQL commentés avec `trace_fr`, `expected_output` (texte descriptif du résultat),3 QCM, erreurs fréquentes, glossaire et récapitulatif. Tous sont `status:brouillon`, `reviewer:null`. Identifiants `sql-m1-01`…`sql-m6-03`, exercices `-e1`…`-e4`, quiz `-q1`…`-q3`. `order`1…18,20 minutes par leçon. Le premier prérequis est vide, puis chaîne continue.

Ne recopier aucun cours tiers. Sources primaires : sqlite.org/lang_select.html,lang_expr.html,lang_aggfunc.html,lang_createtable.html,lang_insert.html,lang_update.html,lang_delete.html,lang_transaction.html ; sql.js fournit le moteur, pas les textes Nunya.

## Environnement

L’élève écrit du SQL, pas JavaScript. Les mots-clés restent en SQL ; toute explication et consigne est en français. Les données sont fictives. Chaque essai et chaque test commence avec sa base initiale : les scripts SQL et la progression sont sauvegardés, pas les modifications de cette base temporaire. Les exemples doivent annoncer cette remise à zéro, sans suggérer un serveur ou une base de production. Les valeurs monétaires sont des montants fictifs entiers en FCFA ; pour AVG/ratios, demander ROUND si pertinent. Pas d’assurance de maîtrise professionnelle ni diplôme.

## Fixtures stables

`club` et `variation` ont exactement ce schéma, clés étrangères activées :

```
CREATE TABLE membres(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,ville TEXT,age INTEGER NOT NULL CHECK(age>=13));
CREATE TABLE ateliers(id INTEGER PRIMARY KEY,titre TEXT NOT NULL,places INTEGER NOT NULL CHECK(places>=0),prix INTEGER NOT NULL CHECK(prix>=0));
CREATE TABLE inscriptions(id INTEGER PRIMARY KEY,membre_id INTEGER NOT NULL REFERENCES membres(id),atelier_id INTEGER NOT NULL REFERENCES ateliers(id),statut TEXT NOT NULL CHECK(statut IN ('confirmee','attente')));
```

Fixture `club` :
- membres : (1,'Afi','Lomé',16),(2,'Kossi','Kara',19),(3,'Mina',NULL,17),(4,'Lina','Lomé',22),(5,'Yao','Sokodé',15)
- ateliers : (1,'Python',4,1000),(2,'Jardin',0,500),(3,'Web',2,1500),(4,'Dessin',5,0)
- inscriptions : (1,1,1,'confirmee'),(2,2,3,'attente'),(3,1,3,'confirmee'),(4,3,1,'attente'),(5,4,2,'confirmee')

Fixture `variation` :
- membres : (1,'Afi','Kara',20),(2,'Kossi','Lomé',15),(3,'Mina',NULL,24),(4,'Lina','Sokodé',17),(5,'Yao','Lomé',18),(6,'Ama',NULL,13)
- ateliers : (1,'Python',0,1200),(2,'Jardin',3,700),(3,'Web',6,1200),(4,'Dessin',0,0),(5,'Lecture',2,300)
- inscriptions : (1,2,2,'confirmee'),(2,1,1,'attente'),(3,3,2,'confirmee'),(4,2,3,'attente'),(5,5,3,'confirmee'),(6,6,2,'attente')

Fixture `vide` : même schéma, zéro ligne.

Fixtures `boutique` et `boutique-variation` (cours `sql-intermediaire`, 5.17.0) : schéma distinct, clés étrangères activées.

```
CREATE TABLE produits(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,categorie TEXT NOT NULL,prix INTEGER NOT NULL CHECK(prix>0),stock INTEGER NOT NULL CHECK(stock>=0));
CREATE TABLE clients(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,quartier TEXT,parrain_id INTEGER REFERENCES clients(id));
CREATE TABLE ventes(id INTEGER PRIMARY KEY,client_id INTEGER REFERENCES clients(id),produit_id INTEGER NOT NULL REFERENCES produits(id),quantite INTEGER NOT NULL CHECK(quantite>0),jour TEXT NOT NULL);
```

Les données exactes sont dans `lib/sql/fixtures.mjs` ; chaque base déclare son schéma, et `preview` comme `createFixture` les traitent toutes de la même façon. Fixture `vierge` : aucune table. Ces quatre fixtures sont préparées par le moteur, jamais par un faux interpréteur. Les explications/exemples utilisent `club`, sauf indication explicite `fixture:'vierge'` ou `'vide'` dans les métadonnées de l’exemple. Si utile ajouter un champ `expected_result` à un exemple pour afficher son tableau prévu ; sinon `expected_output` décrit précisément le résultat humainement.

## Exercices et tests

Chaque exercice possède les champs existants `kind`, `title_fr`, `instruction_fr`, `starter_code`, `solution`, `visible_tests`, `hidden_tests`, `hints` (3), `explanation_fr`, `common_wrong_answers:[]`. Privilégier quatre tâches différentes : guidée, variation, débogage, mini-projet. Un test visible et au moins un cas supplémentaire. Les tests utilisent :

```
{ "fixture":"club", "reference_sql":"SELECT nom FROM membres ORDER BY id;", "mode":"query", "compare_results":"last", "description_fr":"Les cinq noms dans l’ordre des identifiants." }
```

- `reference_sql` est exécuté dans une base SQLite sœur pour obtenir le résultat et l’état attendus ; il n’est jamais montré comme correction avant les deux tentatives de l’interface.
- `mode:'query'` : on compare le dernier tableau de résultat (colonnes ET valeurs, ordre inclus) et on vérifie que toutes les tables initiales restent inchangées. Le résultat attendu doit provenir des données, pas d’un SELECT de constantes qui passe tous les cas.
- `mode:'mutation'` : on compare l’état sémantique de TOUTES les tables après les deux scripts (noms/colonnes/types/clé primaire/NOT NULL, clés étrangères, toutes les lignes). L’ordre des insertions et la mise en forme du SQL ne comptent pas ; les données comptent. `compare_results:'none'` par défaut ici, ou `'last'`/`'all'` pour vérifier aussi les sorties.
- Pour les créations avec CHECK/UNIQUE/defaults/contraintes, ajouter `probes:[{"sql":"INSERT INTO ...;","error_includes":"CHECK constraint failed","description_fr":"Un prix négatif doit être refusé."}]`. Chaque sonde est exécutée dans un savepoint puis annulée sur la base réelle de l’élève. Le correcteur ne lit pas des commentaires pour deviner une contrainte. Une sonde valide avec `error_includes:null` doit réussir.
- Les transactions enseignées doivent être fermées (COMMIT/ROLLBACK). Pour un exercice ROLLBACK dont l’état final retrouve l’original, exiger `compare_results:'all'` et des SELECT avant/après montrant l’effet temporaire : le script vide ne doit pas passer.
- Chaque résultat comparé possède un ORDER BY explicite, sauf agrégat scalaire ou requête ne pouvant renvoyer qu’une ligne. Pour des égalités, ajouter un deuxième critère déterministe. Fixer les alias demandés dans la consigne.
- La fixture cachée est généralement `variation` avec la MÊME requête de référence. Pour une tâche sur fixture vierge, le second cas peut tester d’autres sondes/valeurs après création ; une duplication exacte d’un test n’est pas un vrai cas supplémentaire. Les exercices débutants ne connaissent que les notions déjà expliquées ; les requêtes de sondes peuvent être internes au correcteur.
- Pas de syntaxe SQL inventée, pas d’input() ni de terminal. Toute leçon fonctionne dans le navigateur et hors ligne après téléchargement.

## Progression (3 leçons par module)

M1 :01 tables/lignes/colonnes et SELECT * ;02 projection/alias et expressions simples ;03 ORDER BY + LIMIT et ex aequo.
M2 :01 WHERE comparaisons + AND/OR/parenthèses ;02 IN/BETWEEN/LIKE (expliquer sensibilité ASCII de LIKE, pas d’affirmation fausse sur les accents) ;03 NULL,IS NULL,COALESCE.
M3 :01 COUNT/SUM/AVG/MIN/MAX et ensemble vide ;02 GROUP BY ;03 HAVING vs WHERE, agrégats sans colonne nue.
M4 :01 clés et INNER JOIN ;02 jointure de trois tables et doublons ;03 LEFT JOIN et lignes sans correspondance, placement du filtre ON/WHERE.
M5 :01 CREATE TABLE et contraintes (table `livres` sur fixture `vierge`) ;02 INSERT valeurs explicites et contraintes (tables `club` existantes ou création indépendante claire) ;03 UPDATE/DELETE avec WHERE et état préservé.
M6 :01 BEGIN/COMMIT/ROLLBACK ;02 sous-requête IN/NOT EXISTS, absence et piège NOT IN avec NULL ;03 projet bilan d’un club : recherches, jointures, statistiques et mises à jour contrôlées. Les niveaux intermédiaire/avancé restent distincts et futurs.
