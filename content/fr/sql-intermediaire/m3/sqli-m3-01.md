---
{
  "id": "sqli-m3-01",
  "title_fr": "Classer avec les fonctions de fenêtre",
  "course": "sql-intermediaire",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "sqli-m2-03"
  ],
  "outcomes": [
    "Numéroter et classer des lignes avec ROW_NUMBER, RANK et DENSE_RANK.",
    "Classer à l’intérieur de groupes avec PARTITION BY et garder les premiers de chaque groupe."
  ],
  "idea_fr": "Une fonction de fenêtre calcule une valeur pour chaque ligne en regardant d’autres lignes, sans les fusionner comme GROUP BY.",
  "analogy_fr": "Au classement d’une course, chaque coureur garde son nom et son temps ; on ajoute seulement sa place. Pour les catégories d’âge, on refait un classement par catégorie.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "SELECT nom, prix,\n       ROW_NUMBER() OVER (ORDER BY prix DESC) AS numero,\n       RANK() OVER (ORDER BY prix DESC) AS rang,\n       DENSE_RANK() OVER (ORDER BY prix DESC) AS rang_dense\nFROM produits\nORDER BY prix DESC, nom;",
      "expected_output": "6 lignes (nom, prix, numero, rang, rang_dense) : Huile 1 L | 1200 | 1 | 1 | 1 ; Sucre 1 kg | 700 | 2 | 2 | 2 ; Riz 1 kg | 600 | 3 | 3 | 3 ; Cahier | 300 | 4 | 4 | 4 ; Savon | 250 | 5 | 5 | 5 ; Stylo | 100 | 6 | 6 | 6",
      "trace_fr": [
        "Chaque produit garde sa ligne.",
        "ROW_NUMBER numérote sans ex aequo.",
        "RANK et DENSE_RANK diffèrent seulement après des ex aequo."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "prix",
          "numero",
          "rang",
          "rang_dense"
        ],
        "values": [
          [
            "Huile 1 L",
            1200,
            1,
            1,
            1
          ],
          [
            "Sucre 1 kg",
            700,
            2,
            2,
            2
          ],
          [
            "Riz 1 kg",
            600,
            3,
            3,
            3
          ],
          [
            "Cahier",
            300,
            4,
            4,
            4
          ],
          [
            "Savon",
            250,
            5,
            5,
            5
          ],
          [
            "Stylo",
            100,
            6,
            6,
            6
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "WITH classes AS (\n  SELECT nom, categorie, prix,\n         ROW_NUMBER() OVER (PARTITION BY categorie ORDER BY prix DESC, nom) AS rang\n  FROM produits\n)\nSELECT categorie, nom, prix FROM classes WHERE rang = 1 ORDER BY categorie;",
      "expected_output": "3 lignes (categorie, nom, prix) : hygiène | Savon | 250 ; papeterie | Cahier | 300 ; épicerie | Huile 1 L | 1200",
      "trace_fr": [
        "Le classement recommence dans chaque catégorie.",
        "L’étape classes calcule le rang.",
        "La requête finale garde le premier de chaque catégorie."
      ],
      "expected_result": {
        "columns": [
          "categorie",
          "nom",
          "prix"
        ],
        "values": [
          [
            "hygiène",
            "Savon",
            250
          ],
          [
            "papeterie",
            "Cahier",
            300
          ],
          [
            "épicerie",
            "Huile 1 L",
            1200
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Filtrer un rang dans WHERE",
      "why_fr": "Les fenêtres sont calculées après WHERE.",
      "fix_fr": "Calcule le rang dans une étape WITH, puis filtre."
    },
    {
      "error": "Oublier le ORDER BY final",
      "why_fr": "L’ordre affiché n’est pas garanti.",
      "fix_fr": "Ajoute ORDER BY à la requête finale."
    },
    {
      "error": "Confondre RANK et ROW_NUMBER",
      "why_fr": "Les ex aequo ne sont pas traités pareil.",
      "fix_fr": "RANK pour un podium, ROW_NUMBER pour un numéro unique."
    }
  ],
  "quiz": [
    {
      "question": "Trois produits ont des prix 900, 900, 500. Quel RANK reçoit le produit à 500 ?",
      "options": [
        "2",
        "3",
        "1",
        "4"
      ],
      "answer": 1,
      "explanation": "Deux ex aequo premiers, puis la troisième place.",
      "id": "sqli-m3-01-q1"
    },
    {
      "question": "Et son DENSE_RANK ?",
      "options": [
        "2",
        "3",
        "1",
        "4"
      ],
      "answer": 0,
      "explanation": "DENSE_RANK ne saute pas de place.",
      "id": "sqli-m3-01-q2"
    },
    {
      "question": "À quoi sert PARTITION BY ?",
      "options": [
        "À trier le résultat",
        "À recommencer le calcul dans chaque groupe",
        "À supprimer des lignes",
        "À joindre des tables"
      ],
      "answer": 1,
      "explanation": "Chaque partition a sa propre fenêtre.",
      "id": "sqli-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction de fenêtre",
      "definition": "Calcul par ligne qui regarde un ensemble de lignes, introduit par OVER."
    },
    {
      "term": "PARTITION BY",
      "definition": "Découpage des lignes en groupes indépendants pour une fenêtre."
    },
    {
      "term": "RANK",
      "definition": "Rang avec ex aequo et places sautées."
    },
    {
      "term": "ROW_NUMBER",
      "definition": "Numéro unique de chaque ligne dans sa fenêtre."
    }
  ],
  "recap_fr": [
    "Numéroter et classer des lignes avec ROW_NUMBER, RANK et DENSE_RANK.",
    "Classer à l’intérieur de groupes avec PARTITION BY et garder les premiers de chaque groupe.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "fonction de fenêtre",
    "PARTITION BY",
    "RANK",
    "ROW_NUMBER"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "SQL réel dans SQLite/sql.js, auto-hébergé dans un Worker du navigateur, sans connexion distante. Données fictives de la boutique d’un quartier. Chaque exemple, essai et test reconstruit sa base initiale ; le code et la progression sont sauvegardés, pas les modifications de la base temporaire. Disponible hors ligne après téléchargement.",
  "references": [
    {
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html"
    },
    {
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html",
      "scope": "OVER, PARTITION BY, cadres et fonctions de rang. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html",
      "scope": "Expressions de table communes. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

GROUP BY fusionne les lignes d’un groupe en une seule : on obtient un total, mais on perd le détail. Les fonctions de fenêtre font l’inverse : chaque ligne reste là, et reçoit en plus une valeur calculée à partir d’un ensemble de lignes, sa fenêtre. On les reconnaît au mot OVER, suivi entre parenthèses de la description de la fenêtre.

Les fonctions de rang sont les plus simples. ROW_NUMBER() OVER (ORDER BY prix DESC) numérote les produits du plus cher au moins cher : 1, 2, 3… RANK() fait de même, mais donne le même rang aux ex aequo et saute ensuite des places : deux produits premiers ex aequo, puis le suivant troisième. DENSE_RANK() donne aussi le même rang aux ex aequo, mais sans saut : le suivant est deuxième. Choisis selon la question : un podium suit RANK, un numéro de ligne unique suit ROW_NUMBER.

Le ORDER BY à l’intérieur de OVER décide de l’ordre du classement ; il ne trie pas le résultat affiché. Pour afficher les lignes dans l’ordre du rang, il faut toujours un ORDER BY final. Et avec ROW_NUMBER, des ex aequo reçoivent des numéros dans un ordre arbitraire : ajoute un second critère, par exemple le nom, pour que le résultat soit stable.

PARTITION BY découpe les lignes en groupes indépendants, et le classement recommence à 1 dans chaque groupe. ROW_NUMBER() OVER (PARTITION BY categorie ORDER BY prix DESC) classe les produits à l’intérieur de leur catégorie. C’est la base d’une question très fréquente : le meilleur, ou les trois meilleurs, de chaque groupe.

Une fonction de fenêtre ne peut pas apparaître dans WHERE, car WHERE filtre les lignes avant que les fenêtres soient calculées. Pour garder seulement les premiers, on calcule le rang dans une étape WITH, puis on filtre dans la requête finale : WHERE rang = 1. C’est un schéma à retenir.

Les fenêtres se combinent avec tout ce que tu connais : on peut classer le résultat d’une jointure ou d’une étape qui calcule un chiffre d’affaires par client. Elles sont disponibles dans SQLite depuis 2018 et dans tous les grands systèmes de bases de données ; leur syntaxe est presque identique partout, ce qui en fait une compétence très demandée pour l’analyse de données.

## Exemple guidé 1

```sql
SELECT nom, prix,
       ROW_NUMBER() OVER (ORDER BY prix DESC) AS numero,
       RANK() OVER (ORDER BY prix DESC) AS rang,
       DENSE_RANK() OVER (ORDER BY prix DESC) AS rang_dense
FROM produits
ORDER BY prix DESC, nom;
```

Résultat attendu : 6 lignes (nom, prix, numero, rang, rang_dense) : Huile 1 L | 1200 | 1 | 1 | 1 ; Sucre 1 kg | 700 | 2 | 2 | 2 ; Riz 1 kg | 600 | 3 | 3 | 3 ; Cahier | 300 | 4 | 4 | 4 ; Savon | 250 | 5 | 5 | 5 ; Stylo | 100 | 6 | 6 | 6

Trace :

- Chaque produit garde sa ligne.
- ROW_NUMBER numérote sans ex aequo.
- RANK et DENSE_RANK diffèrent seulement après des ex aequo.

## Exemple guidé 2

```sql
WITH classes AS (
  SELECT nom, categorie, prix,
         ROW_NUMBER() OVER (PARTITION BY categorie ORDER BY prix DESC, nom) AS rang
  FROM produits
)
SELECT categorie, nom, prix FROM classes WHERE rang = 1 ORDER BY categorie;
```

Résultat attendu : 3 lignes (categorie, nom, prix) : hygiène | Savon | 250 ; papeterie | Cahier | 300 ; épicerie | Huile 1 L | 1200

Trace :

- Le classement recommence dans chaque catégorie.
- L’étape classes calcule le rang.
- La requête finale garde le premier de chaque catégorie.

## Vérifier et expliquer

Classe les produits à la main par prix décroissant, en notant ROW_NUMBER, RANK et DENSE_RANK, puis compare avec la requête.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — fonctions de fenêtre](https://www.sqlite.org/windowfunctions.html)
- [SQLite — WITH et requêtes récursives](https://www.sqlite.org/lang_with.html)
