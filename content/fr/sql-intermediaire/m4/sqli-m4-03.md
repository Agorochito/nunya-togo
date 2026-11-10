---
{
  "id": "sqli-m4-03",
  "title_fr": "Projet : le tableau de bord de la boutique",
  "course": "sql-intermediaire",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "sqli-m4-02"
  ],
  "outcomes": [
    "Combiner étapes WITH, fonctions de fenêtre et CASE dans une requête d’analyse complète.",
    "Produire des indicateurs utiles à une décision : parts, meilleurs produits, ruptures et tendance."
  ],
  "idea_fr": "Un tableau de bord répond à quelques questions précises avec des requêtes fiables : il se construit étape par étape, comme un rapport.",
  "analogy_fr": "Le tableau de bord d’un taxi-moto montre la vitesse, le carburant et les voyants : peu d’indicateurs, mais ceux qui servent à décider.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "WITH ca_cat AS (\n  SELECT p.categorie, SUM(v.quantite * p.prix) AS ca\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n  GROUP BY p.categorie\n)\nSELECT categorie, ca, ROUND(100.0 * ca / SUM(ca) OVER (), 1) AS part\nFROM ca_cat\nORDER BY ca DESC;",
      "expected_output": "3 lignes (categorie, ca, part) : épicerie | 7200 | 61.8 ; papeterie | 2700 | 23.2 ; hygiène | 1750 | 15.0",
      "trace_fr": [
        "ca_cat donne le chiffre d’affaires de chaque catégorie.",
        "SUM(ca) OVER () donne le total sur chaque ligne.",
        "La part est arrondie à une décimale."
      ],
      "expected_result": {
        "columns": [
          "categorie",
          "ca",
          "part"
        ],
        "values": [
          [
            "épicerie",
            7200,
            61.8
          ],
          [
            "papeterie",
            2700,
            23.2
          ],
          [
            "hygiène",
            1750,
            15.0
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT categorie,\n       COUNT(*) AS produits,\n       SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS ruptures\nFROM produits\nGROUP BY categorie\nORDER BY categorie;",
      "expected_output": "3 lignes (categorie, produits, ruptures) : hygiène | 1 | 0 ; papeterie | 2 | 0 ; épicerie | 3 | 1",
      "trace_fr": [
        "Une ligne par catégorie.",
        "COUNT compte les produits.",
        "Le CASE compte les ruptures."
      ],
      "expected_result": {
        "columns": [
          "categorie",
          "produits",
          "ruptures"
        ],
        "values": [
          [
            "hygiène",
            1,
            0
          ],
          [
            "papeterie",
            2,
            0
          ],
          [
            "épicerie",
            3,
            1
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Diviser par SUM sans OVER",
      "why_fr": "La requête devient un agrégat d’une seule ligne.",
      "fix_fr": "Utilise SUM(ca) OVER ()."
    },
    {
      "error": "Perdre les produits jamais vendus",
      "why_fr": "Une jointure interne les écarte.",
      "fix_fr": "Utilise LEFT JOIN et coalesce."
    },
    {
      "error": "Nommer les colonnes au hasard",
      "why_fr": "Le lecteur ne comprend pas le tableau.",
      "fix_fr": "Donne des alias clairs."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi tester chaque étape séparément ?",
      "options": [
        "Pour aller plus vite",
        "Pour localiser une erreur dans une seule étape",
        "Par obligation",
        "Pour créer des tables"
      ],
      "answer": 1,
      "explanation": "Une étape à la fois, on sait où se trouve le problème.",
      "id": "sqli-m4-03-q1"
    },
    {
      "question": "Comment garder une ligne par catégorie tout en connaissant le total ?",
      "options": [
        "GROUP BY seul",
        "SUM(ca) OVER ()",
        "LIMIT 1",
        "DISTINCT"
      ],
      "answer": 1,
      "explanation": "La fenêtre donne le total sans fusionner les lignes.",
      "id": "sqli-m4-03-q2"
    },
    {
      "question": "Que faire d’un produit jamais vendu dans un tableau de bord ?",
      "options": [
        "L’écarter",
        "L’afficher avec un chiffre d’affaires nul",
        "Le supprimer",
        "Lui donner NULL sans explication"
      ],
      "answer": 1,
      "explanation": "Un produit qui ne se vend pas est une information utile.",
      "id": "sqli-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "tableau de bord",
      "definition": "Ensemble réduit d’indicateurs qui aident à décider."
    },
    {
      "term": "indicateur",
      "definition": "Mesure chiffrée qui répond à une question précise."
    },
    {
      "term": "part",
      "definition": "Pourcentage d’un total, calculé avec une division décimale."
    },
    {
      "term": "cas limite",
      "definition": "Situation rare qui casse souvent les requêtes : vide, ex aequo, NULL."
    }
  ],
  "recap_fr": [
    "Combiner étapes WITH, fonctions de fenêtre et CASE dans une requête d’analyse complète.",
    "Produire des indicateurs utiles à une décision : parts, meilleurs produits, ruptures et tendance.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "tableau de bord",
    "indicateur",
    "part",
    "cas limite"
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
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html"
    },
    {
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html"
    },
    {
      "title": "SQLite — expressions",
      "url": "https://www.sqlite.org/lang_expr.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html",
      "scope": "Expressions de table communes. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html",
      "scope": "OVER, PARTITION BY, cadres et fonctions de rang. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — expressions",
      "url": "https://www.sqlite.org/lang_expr.html",
      "scope": "CASE, sous-requêtes scalaires et EXISTS. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

La gérante de la boutique veut, chaque fin de semaine, une vue claire de son activité. Elle ne veut pas des tables brutes, mais quelques indicateurs : quelle part du chiffre d’affaires vient de chaque catégorie, quel est le meilleur produit de chaque catégorie, combien de produits sont en rupture, et si les ventes progressent. Ce projet assemble tout le cours pour y répondre.

La méthode reste celle des étapes. D’abord une étape lignes qui calcule le montant de chaque vente par jointure. Ensuite des étapes d’agrégation : chiffre d’affaires par produit, par catégorie, par jour. Puis des fonctions de fenêtre : part de chaque catégorie avec SUM() OVER (), classement des produits dans leur catégorie avec ROW_NUMBER et PARTITION BY, cumul avec SUM() OVER (ORDER BY …). Enfin, une requête finale qui assemble et présente.

Chaque indicateur se teste séparément. En remplaçant la requête finale par SELECT * FROM l’étape, tu vérifies une étape à la fois. C’est aussi ainsi que l’on maintient une analyse : quand la gérante demandera un indicateur de plus, il suffira d’ajouter une étape.

Les cas limites demandent de l’attention. Un produit jamais vendu doit apparaître avec un chiffre d’affaires nul, pas disparaître : utilise LEFT JOIN et coalesce. Une catégorie sans aucune vente doit-elle figurer ? Décide-le et écris-le clairement. Les ex aequo d’un classement doivent être départagés par un critère stable, par exemple le nom. Et un pourcentage doit être calculé avec une division décimale, puis arrondi.

Une erreur fréquente concerne la part en pourcentage. Diviser par SUM(ca) sans OVER transforme la requête en agrégat global : SQLite regroupe toutes les lignes en une seule, et la part n’a plus de sens. La fenêtre OVER () garde chaque ligne tout en donnant accès au total.

Enfin, pense à la personne qui lira le résultat. Des noms de colonnes clairs, comme categorie, ca, part et meilleur_produit, un tri qui place l’essentiel en haut et des nombres arrondis valent mieux que des colonnes nommées col1 ou des pourcentages à quinze décimales. Ce projet est un exemple réaliste de ce que fait au quotidien une analyste de données dans une entreprise, une ONG ou une administration.

## Exemple guidé 1

```sql
WITH ca_cat AS (
  SELECT p.categorie, SUM(v.quantite * p.prix) AS ca
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
  GROUP BY p.categorie
)
SELECT categorie, ca, ROUND(100.0 * ca / SUM(ca) OVER (), 1) AS part
FROM ca_cat
ORDER BY ca DESC;
```

Résultat attendu : 3 lignes (categorie, ca, part) : épicerie | 7200 | 61.8 ; papeterie | 2700 | 23.2 ; hygiène | 1750 | 15.0

Trace :

- ca_cat donne le chiffre d’affaires de chaque catégorie.
- SUM(ca) OVER () donne le total sur chaque ligne.
- La part est arrondie à une décimale.

## Exemple guidé 2

```sql
SELECT categorie,
       COUNT(*) AS produits,
       SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS ruptures
FROM produits
GROUP BY categorie
ORDER BY categorie;
```

Résultat attendu : 3 lignes (categorie, produits, ruptures) : hygiène | 1 | 0 ; papeterie | 2 | 0 ; épicerie | 3 | 1

Trace :

- Une ligne par catégorie.
- COUNT compte les produits.
- Le CASE compte les ruptures.

## Vérifier et expliquer

Vérifie ton tableau de bord en recalculant à la main la part d’une catégorie et le meilleur produit d’une autre.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — WITH et requêtes récursives](https://www.sqlite.org/lang_with.html)
- [SQLite — fonctions de fenêtre](https://www.sqlite.org/windowfunctions.html)
- [SQLite — expressions](https://www.sqlite.org/lang_expr.html)
