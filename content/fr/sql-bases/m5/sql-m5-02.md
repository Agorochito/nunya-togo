---
{
  "id": "sql-m5-02",
  "title_fr": "Insérer des lignes en respectant les règles",
  "course": "sql-bases",
  "module": "m5",
  "order": 14,
  "minutes": 20,
  "prerequisites": [
    "sql-m5-01"
  ],
  "outcomes": [
    "Ajouter des lignes avec des colonnes et des valeurs explicites.",
    "Écrire un texte avec apostrophe et alimenter un ajout par SELECT."
  ],
  "idea_fr": "Ajouter des lignes avec des colonnes et des valeurs explicites.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "Une ligne : id 10, nom Ama, âge 18.",
      "trace_fr": [
        "Les quatre valeurs correspondent aux quatre colonnes annoncées.",
        "Le nouvel identifiant ne remplace aucun membre initial.",
        "La lecture ciblée retrouve la ligne ajoutée."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom",
          "age"
        ],
        "values": [
          [
            10,
            "Ama",
            18
          ]
        ]
      },
      "fixture": "club"
    },
    {
      "expected_output": "Une ligne : id 10, titre Club d’art avec une apostrophe simple, prix fictif 500.",
      "trace_fr": [
        "Les deux apostrophes SQL représentent un seul caractère dans le titre.",
        "Les places et le prix restent des nombres."
      ],
      "expected_result": {
        "columns": [
          "id",
          "titre",
          "prix"
        ],
        "values": [
          [
            10,
            "Club d'art",
            500
          ]
        ]
      },
      "fixture": "club"
    }
  ],
  "common_mistakes": [
    {
      "error": "Remplacer un texte pour contourner une erreur",
      "why_fr": "La donnée attendue est altérée malgré une instruction désormais valide.",
      "fix_fr": "Échappe l’apostrophe sans changer le titre."
    },
    {
      "error": "Coder une liste de noms figée",
      "why_fr": "La sélection ne suit plus les données de la fixture.",
      "fix_fr": "Utilise INSERT … SELECT et la borne >= 18."
    }
  ],
  "quiz": [
    {
      "question": "À quoi sert la liste des colonnes dans INSERT ?",
      "options": [
        "À effacer les colonnes non citées.",
        "À relier explicitement chaque valeur à son rôle.",
        "À trier automatiquement les lignes."
      ],
      "answer": 1,
      "explanation": "L’ordre des valeurs correspond à l’ordre des colonnes annoncé.",
      "id": "sql-m5-02-q1"
    },
    {
      "question": "Comment représenter une apostrophe à l’intérieur d’un texte SQL ?",
      "options": [
        "En la doublant dans le littéral.",
        "En supprimant tous les guillemets.",
        "Avec une apostrophe typographique obligatoire."
      ],
      "answer": 0,
      "explanation": "Deux apostrophes consécutives à l’intérieur du littéral représentent un seul caractère.",
      "id": "sql-m5-02-q2"
    },
    {
      "question": "Que fait INSERT … SELECT dans cette activité ?",
      "options": [
        "Transforme les noms en commandes.",
        "Ignore toujours le filtre WHERE.",
        "Ajoute les lignes produites par la requête."
      ],
      "answer": 2,
      "explanation": "La requête calcule les lignes à insérer à partir des données présentes.",
      "id": "sql-m5-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "INSERT",
      "definition": "Instruction d’ajout de lignes dans une table."
    },
    {
      "term": "littéral",
      "definition": "Valeur écrite directement dans une instruction."
    },
    {
      "term": "INSERT … SELECT",
      "definition": "Ajout alimenté par les résultats d’une requête."
    }
  ],
  "recap_fr": [
    "Ajouter des lignes avec des colonnes et des valeurs explicites.",
    "Écrire un texte avec apostrophe et alimenter un ajout par SELECT.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "INSERT",
    "littéral",
    "INSERT … SELECT"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
    {
      "title": "SQLite — INSERT",
      "url": "https://www.sqlite.org/lang_insert.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — expressions et littéraux",
      "url": "https://www.sqlite.org/lang_expr.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

INSERT ajoute des lignes dans une table existante. La forme INSERT INTO membres(id,nom,ville,age) VALUES(...) indique précisément les colonnes concernées et fournit une valeur pour chacune, dans le même ordre. Écrire cette liste rend le script plus lisible qu’une dépendance implicite à toutes les colonnes. Un ajout ne remplace pas les autres membres. Nous utilisons des identifiants nouveaux et des personnages fictifs pour que chaque modification soit facile à reconnaître.

Les nombres s’écrivent sans guillemets lorsqu’ils représentent des quantités numériques. Les textes utilisent des apostrophes SQL. Pour placer une apostrophe à l’intérieur d’un texte, double-la : 'Club d''art' représente le titre Club d’art avec une apostrophe simple. Les guillemets typographiques ne remplacent pas les délimiteurs SQL. NULL, sans guillemets, exprime une valeur absente ; le texte 'NULL' serait une chaîne de quatre lettres. Une valeur doit respecter les contraintes de la colonne, par exemple l’âge minimal des membres et la quantité positive ou nulle des places.

Plusieurs parenthèses de valeurs, séparées par des virgules, permettent d’ajouter plusieurs lignes dans une instruction. Chacune utilise la même liste de colonnes. Une erreur sur une ligne peut faire échouer l’instruction ; ne suppose pas qu’un affichage partiel prouve l’ajout complet. La vérification lit l’état obtenu et contrôle toutes les tables. Nous n’utilisons pas INSERT OR REPLACE : sa gestion des conflits pourrait supprimer ou remplacer des données que le contrat demande de conserver.

INSERT peut aussi recevoir les lignes d’un SELECT au lieu d’une liste VALUES. Dans INSERT INTO majeurs(id,nom) SELECT id,nom FROM membres WHERE age >= 18, les deux colonnes sélectionnées alimentent les deux colonnes annoncées. Le filtrage travaille sur les données réelles de la base initiale : les noms ne doivent pas être recopiés à la main. La création de majeurs précède cet ajout, et sa clé étrangère relie chaque identifiant au membre d’origine. Il s’agit d’une table d’exercice, pas d’une recommandation générale de dupliquer des informations personnelles.

Examine enfin le résultat avec un SELECT ciblé et un ORDER BY lorsque plusieurs lignes peuvent apparaître. Ne confonds pas une instruction acceptée et un ajout conforme : un âge ou un prix erroné peut être techniquement valide mais ne pas correspondre à la consigne. Les cas supplémentaires changent le contenu initial, pas la règle demandée. Chaque exécution de l’atelier repart de sa base fictive ; ce sont ton script et tes progrès qui sont sauvegardés, et non une nouvelle liste permanente de membres du club.

## Exemple guidé 1

```sql
-- Ajouter une fiche fictive avec des colonnes explicites.
INSERT INTO membres(id,nom,ville,age) VALUES(10,'Ama','Atakpamé',18);
SELECT id,nom,age FROM membres WHERE id=10;
```

## Exemple guidé 2

```sql
-- Doubler une apostrophe à l’intérieur du texte SQL.
INSERT INTO ateliers(id,titre,places,prix) VALUES(10,'Club d''art',2,500);
SELECT id,titre,prix FROM ateliers WHERE id=10;
```

