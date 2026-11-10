---
{
  "id": "sqli-m1-03",
  "title_fr": "Combiner des résultats : UNION, INTERSECT, EXCEPT",
  "course": "sql-intermediaire",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "sqli-m1-02"
  ],
  "outcomes": [
    "Empiler deux résultats avec UNION ou UNION ALL.",
    "Trouver ce qui est commun avec INTERSECT et ce qui manque avec EXCEPT."
  ],
  "idea_fr": "Les opérateurs composés combinent des résultats entiers, comme des ensembles : réunir, garder le commun, retirer.",
  "analogy_fr": "Deux listes d’invités pour un mariage : on peut les fusionner, chercher les personnes présentes sur les deux, ou rayer de la première ceux qui figurent sur la seconde.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "SELECT quartier FROM clients WHERE quartier IS NOT NULL\nUNION\nSELECT 'Bè'\nORDER BY quartier;",
      "expected_output": "3 lignes (quartier) : Adidogomé ; Bè ; Tokoin",
      "trace_fr": [
        "La première requête donne les quartiers des clients.",
        "La seconde ajoute Bè, déjà présent.",
        "UNION retire le doublon ; le tri final s’applique à tout."
      ],
      "expected_result": {
        "columns": [
          "quartier"
        ],
        "values": [
          [
            "Adidogomé"
          ],
          [
            "Bè"
          ],
          [
            "Tokoin"
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT id FROM produits\nEXCEPT\nSELECT produit_id FROM ventes\nORDER BY id;",
      "expected_output": "1 ligne (id) : 4",
      "trace_fr": [
        "La première requête liste tous les produits.",
        "La seconde liste les produits vendus.",
        "EXCEPT garde ceux qui ne sont jamais vendus : le sucre."
      ],
      "expected_result": {
        "columns": [
          "id"
        ],
        "values": [
          [
            4
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser UNION pour un journal",
      "why_fr": "Les ventes identiques disparaissent.",
      "fix_fr": "Utilise UNION ALL quand chaque ligne compte."
    },
    {
      "error": "Mettre ORDER BY dans la première requête",
      "why_fr": "SQLite refuse : le tri vient après la combinaison.",
      "fix_fr": "Place un seul ORDER BY à la fin."
    },
    {
      "error": "Comparer des colonnes différentes",
      "why_fr": "Le nombre ou le sens des colonnes ne correspond pas.",
      "fix_fr": "Renvoie les mêmes colonnes des deux côtés."
    }
  ],
  "quiz": [
    {
      "question": "UNION ou UNION ALL : lequel garde les doublons ?",
      "options": [
        "UNION",
        "UNION ALL",
        "Les deux",
        "Aucun"
      ],
      "answer": 1,
      "explanation": "UNION ALL empile tout sans filtrer.",
      "id": "sqli-m1-03-q1"
    },
    {
      "question": "Que renvoie A EXCEPT B ?",
      "options": [
        "Ce qui est dans A et B",
        "Ce qui est dans A mais pas dans B",
        "Tout A et B",
        "Ce qui est dans B mais pas dans A"
      ],
      "answer": 1,
      "explanation": "EXCEPT retire de A ce que contient B.",
      "id": "sqli-m1-03-q2"
    },
    {
      "question": "Où placer ORDER BY dans une requête composée ?",
      "options": [
        "Dans chaque requête",
        "Une fois, à la fin",
        "Avant UNION",
        "Nulle part"
      ],
      "answer": 1,
      "explanation": "Le tri s’applique au résultat combiné.",
      "id": "sqli-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "UNION",
      "definition": "Réunion de deux résultats sans doublons."
    },
    {
      "term": "UNION ALL",
      "definition": "Réunion de deux résultats en gardant les doublons."
    },
    {
      "term": "INTERSECT",
      "definition": "Lignes présentes dans les deux résultats."
    },
    {
      "term": "EXCEPT",
      "definition": "Lignes du premier résultat absentes du second."
    }
  ],
  "recap_fr": [
    "Empiler deux résultats avec UNION ou UNION ALL.",
    "Trouver ce qui est commun avec INTERSECT et ce qui manque avec EXCEPT.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "UNION",
    "UNION ALL",
    "INTERSECT",
    "EXCEPT"
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
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Requêtes, sous-requêtes et opérateurs composés. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Jusqu’ici, une requête produisait un seul résultat. Les opérateurs composés combinent les résultats de deux requêtes SELECT, placées l’une après l’autre. Ils exigent que les deux requêtes aient le même nombre de colonnes, avec des types compatibles ; les noms des colonnes du résultat viennent de la première requête.

UNION empile les deux résultats et retire les doublons. UNION ALL empile tout, doublons compris, et va donc plus vite. Choisis selon la question : la liste des quartiers où la boutique a des clients ou des livraisons ne doit pas répéter Bè, alors qu’un journal qui réunit les ventes de deux caisses doit garder chaque vente, même identique.

INTERSECT garde les lignes présentes dans les deux résultats : par exemple, les clients qui ont acheté à la fois de l’épicerie et de la papeterie. EXCEPT garde les lignes du premier résultat absentes du second : les produits qui n’ont jamais été vendus, ou les clients qui n’ont rien acheté. INTERSECT et EXCEPT retirent aussi les doublons.

Une seule clause ORDER BY peut trier le résultat combiné, et elle se place à la toute fin, après la seconde requête. Elle s’applique à l’ensemble. Elle utilise les noms des colonnes de la première requête, ou leur numéro de position.

Ces opérateurs comparent des lignes entières. Pour EXCEPT, une ligne n’est retirée que si toutes ses colonnes sont identiques à une ligne du second résultat. Si la première requête renvoie id et nom et la seconde seulement id, SQLite refuse ; et si les deux renvoient id et nom mais avec des noms écrits différemment, les lignes ne correspondent pas. Garde les requêtes simples : souvent, les deux côtés ne renvoient qu’un identifiant.

Ces mêmes questions peuvent aussi s’écrire avec des jointures ou des sous-requêtes, comme NOT EXISTS vu au niveau précédent. Les opérateurs composés ont l’avantage de la lisibilité : produits du catalogue EXCEPT produits vendus se lit presque comme la question elle-même. NOT EXISTS reste préférable quand on a besoin de plusieurs colonnes ou de conditions plus fines.

Enfin, attention à NULL : pour ces opérateurs, deux valeurs NULL sont considérées comme égales, contrairement à la comparaison avec =. Une vente anonyme, sans client, peut donc apparaître une seule fois dans un UNION de client_id.

## Exemple guidé 1

```sql
SELECT quartier FROM clients WHERE quartier IS NOT NULL
UNION
SELECT 'Bè'
ORDER BY quartier;
```

Résultat attendu : 3 lignes (quartier) : Adidogomé ; Bè ; Tokoin

Trace :

- La première requête donne les quartiers des clients.
- La seconde ajoute Bè, déjà présent.
- UNION retire le doublon ; le tri final s’applique à tout.

## Exemple guidé 2

```sql
SELECT id FROM produits
EXCEPT
SELECT produit_id FROM ventes
ORDER BY id;
```

Résultat attendu : 1 ligne (id) : 4

Trace :

- La première requête liste tous les produits.
- La seconde liste les produits vendus.
- EXCEPT garde ceux qui ne sont jamais vendus : le sucre.

## Vérifier et expliquer

Pour chaque opérateur, écris à la main les deux listes d’identifiants puis le résultat combiné, avant de lancer la requête.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — SELECT](https://www.sqlite.org/lang_select.html)
