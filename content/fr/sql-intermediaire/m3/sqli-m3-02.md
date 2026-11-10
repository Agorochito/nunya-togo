---
{
  "id": "sqli-m3-02",
  "title_fr": "Cumuls et moyennes glissantes",
  "course": "sql-intermediaire",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "sqli-m3-01"
  ],
  "outcomes": [
    "Calculer un cumul avec SUM() OVER (ORDER BY …) et le recommencer par groupe.",
    "Calculer une moyenne glissante avec un cadre ROWS BETWEEN."
  ],
  "idea_fr": "Avec une fenêtre ordonnée, un agrégat devient progressif : la somme ou la moyenne s’arrête à la ligne en cours.",
  "analogy_fr": "Le carnet de la tontine montre, après chaque réunion, la somme totale collectée depuis le début : chaque ligne ajoute la cotisation du jour au total précédent.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "WITH par_jour AS (\n  SELECT v.jour, SUM(v.quantite * p.prix) AS ca\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n  GROUP BY v.jour\n)\nSELECT jour, ca,\n       SUM(ca) OVER (ORDER BY jour) AS cumul,\n       ROUND(100.0 * ca / SUM(ca) OVER (), 1) AS part\nFROM par_jour\nORDER BY jour;",
      "expected_output": "7 lignes (jour, ca, cumul, part) : 2026-10-01 | 2450 | 2450 | 21.0 ; 2026-10-02 | 1000 | 3450 | 8.6 ; 2026-10-03 | 2400 | 5850 | 20.6 ; 2026-10-05 | 1800 | 7650 | 15.5 ; 2026-10-06 | 2400 | 10050 | 20.6 ; 2026-10-07 | 1000 | 11050 | 8.6 ; 2026-10-08 | 600 | 11650 | 5.2",
      "trace_fr": [
        "par_jour donne une ligne par date.",
        "SUM … OVER (ORDER BY jour) cumule jusqu’à la date de la ligne.",
        "SUM … OVER () donne le total général sur chaque ligne."
      ],
      "expected_result": {
        "columns": [
          "jour",
          "ca",
          "cumul",
          "part"
        ],
        "values": [
          [
            "2026-10-01",
            2450,
            2450,
            21.0
          ],
          [
            "2026-10-02",
            1000,
            3450,
            8.6
          ],
          [
            "2026-10-03",
            2400,
            5850,
            20.6
          ],
          [
            "2026-10-05",
            1800,
            7650,
            15.5
          ],
          [
            "2026-10-06",
            2400,
            10050,
            20.6
          ],
          [
            "2026-10-07",
            1000,
            11050,
            8.6
          ],
          [
            "2026-10-08",
            600,
            11650,
            5.2
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "WITH par_jour AS (\n  SELECT v.jour, SUM(v.quantite * p.prix) AS ca\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n  GROUP BY v.jour\n)\nSELECT jour, ca,\n       ROUND(AVG(ca) OVER (ORDER BY jour ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 1) AS moyenne_3\nFROM par_jour\nORDER BY jour;",
      "expected_output": "7 lignes (jour, ca, moyenne_3) : 2026-10-01 | 2450 | 2450.0 ; 2026-10-02 | 1000 | 1725.0 ; 2026-10-03 | 2400 | 1950.0 ; 2026-10-05 | 1800 | 1733.3 ; 2026-10-06 | 2400 | 2200.0 ; 2026-10-07 | 1000 | 1733.3 ; 2026-10-08 | 600 | 1333.3",
      "trace_fr": [
        "Le cadre prend la ligne en cours et les deux précédentes.",
        "Aux premières lignes, la moyenne porte sur moins de valeurs.",
        "ROUND arrondit à une décimale."
      ],
      "expected_result": {
        "columns": [
          "jour",
          "ca",
          "moyenne_3"
        ],
        "values": [
          [
            "2026-10-01",
            2450,
            2450.0
          ],
          [
            "2026-10-02",
            1000,
            1725.0
          ],
          [
            "2026-10-03",
            2400,
            1950.0
          ],
          [
            "2026-10-05",
            1800,
            1733.3
          ],
          [
            "2026-10-06",
            2400,
            2200.0
          ],
          [
            "2026-10-07",
            1000,
            1733.3
          ],
          [
            "2026-10-08",
            600,
            1333.3
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier que les ex aequo sont cumulés ensemble",
      "why_fr": "Plusieurs lignes reçoivent le même cumul.",
      "fix_fr": "Regroupe par jour d’abord ou ajoute un critère unique."
    },
    {
      "error": "Confondre lignes et jours",
      "why_fr": "Trois lignes peuvent couvrir plus de trois jours.",
      "fix_fr": "Génère un calendrier si le temps compte."
    },
    {
      "error": "Ne pas arrondir une moyenne",
      "why_fr": "L’affichage devient illisible.",
      "fix_fr": "Utilise ROUND(…, 1)."
    }
  ],
  "quiz": [
    {
      "question": "Que donne SUM(x) OVER () ?",
      "options": [
        "Un cumul",
        "Le total de toutes les lignes, sur chaque ligne",
        "Une erreur",
        "Le maximum"
      ],
      "answer": 1,
      "explanation": "Sans ORDER BY, la fenêtre est toute la partition.",
      "id": "sqli-m3-02-q1"
    },
    {
      "question": "Que donne SUM(x) OVER (ORDER BY jour) ?",
      "options": [
        "Le total général",
        "Un cumul jusqu’à la ligne en cours",
        "La moyenne",
        "Le rang"
      ],
      "answer": 1,
      "explanation": "L’ordre limite la fenêtre aux lignes précédentes.",
      "id": "sqli-m3-02-q2"
    },
    {
      "question": "Combien de lignes couvre ROWS BETWEEN 2 PRECEDING AND CURRENT ROW ?",
      "options": [
        "2",
        "3",
        "1",
        "Toutes"
      ],
      "answer": 1,
      "explanation": "Les deux précédentes et la ligne en cours.",
      "id": "sqli-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "cumul",
      "definition": "Somme progressive des valeurs jusqu’à la ligne en cours."
    },
    {
      "term": "moyenne glissante",
      "definition": "Moyenne calculée sur une fenêtre qui se déplace."
    },
    {
      "term": "cadre",
      "definition": "Lignes précises d’une fenêtre, décrites avec ROWS BETWEEN."
    },
    {
      "term": "OVER ()",
      "definition": "Fenêtre qui contient toutes les lignes."
    }
  ],
  "recap_fr": [
    "Calculer un cumul avec SUM() OVER (ORDER BY …) et le recommencer par groupe.",
    "Calculer une moyenne glissante avec un cadre ROWS BETWEEN.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "cumul",
    "moyenne glissante",
    "cadre",
    "OVER ()"
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

Les agrégats SUM, AVG, COUNT, MIN et MAX peuvent aussi s’utiliser comme fonctions de fenêtre, avec OVER. Sans ORDER BY dans la fenêtre, ils portent sur toute la partition : SUM(ca) OVER () affiche sur chaque ligne le total général, ce qui permet de calculer une part en pourcentage sans requête séparée.

Avec un ORDER BY dans la fenêtre, le comportement change : l’agrégat ne porte plus que sur les lignes allant du début jusqu’à la ligne en cours. SUM(ca) OVER (ORDER BY jour) produit ainsi un cumul : le chiffre d’affaires du premier jour, puis celui des deux premiers jours, et ainsi de suite. C’est la courbe que regarde un commerçant pour savoir où il en est de son objectif du mois.

Attention à un détail. Par défaut, quand plusieurs lignes ont la même valeur de tri, elles sont traitées ensemble : toutes reçoivent le cumul qui les inclut toutes. Pour un cumul ligne par ligne, on ajoute un critère de tri unique, comme l’identifiant, ou on regroupe d’abord par jour pour n’avoir qu’une ligne par date. Dans ce cours, on regroupe d’abord le chiffre d’affaires par jour dans une étape WITH, puis on cumule.

Avec PARTITION BY, le cumul recommence dans chaque groupe : SUM(montant) OVER (PARTITION BY client_id ORDER BY jour, id) donne, pour chaque achat, le total dépensé par ce client jusqu’à ce jour.

On peut aussi préciser exactement les lignes de la fenêtre avec un cadre. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW désigne la ligne en cours et les deux précédentes. AVG(ca) OVER (ORDER BY jour ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) donne une moyenne glissante sur trois jours de vente, qui lisse les variations d’un jour à l’autre. Au début, quand il y a moins de deux lignes précédentes, la moyenne porte simplement sur celles qui existent.

Une moyenne donne souvent des nombres à virgule : arrondis-la avec ROUND(…, 1) pour un affichage lisible. Et souviens-toi que le cadre compte des lignes, pas des jours du calendrier : s’il manque des jours sans vente, trois lignes peuvent couvrir plus de trois jours. Pour une moyenne sur trois jours de calendrier, il faudrait d’abord générer le calendrier avec la requête récursive de la leçon précédente.

## Exemple guidé 1

```sql
WITH par_jour AS (
  SELECT v.jour, SUM(v.quantite * p.prix) AS ca
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
  GROUP BY v.jour
)
SELECT jour, ca,
       SUM(ca) OVER (ORDER BY jour) AS cumul,
       ROUND(100.0 * ca / SUM(ca) OVER (), 1) AS part
FROM par_jour
ORDER BY jour;
```

Résultat attendu : 7 lignes (jour, ca, cumul, part) : 2026-10-01 | 2450 | 2450 | 21.0 ; 2026-10-02 | 1000 | 3450 | 8.6 ; 2026-10-03 | 2400 | 5850 | 20.6 ; 2026-10-05 | 1800 | 7650 | 15.5 ; 2026-10-06 | 2400 | 10050 | 20.6 ; 2026-10-07 | 1000 | 11050 | 8.6 ; 2026-10-08 | 600 | 11650 | 5.2

Trace :

- par_jour donne une ligne par date.
- SUM … OVER (ORDER BY jour) cumule jusqu’à la date de la ligne.
- SUM … OVER () donne le total général sur chaque ligne.

## Exemple guidé 2

```sql
WITH par_jour AS (
  SELECT v.jour, SUM(v.quantite * p.prix) AS ca
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
  GROUP BY v.jour
)
SELECT jour, ca,
       ROUND(AVG(ca) OVER (ORDER BY jour ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 1) AS moyenne_3
FROM par_jour
ORDER BY jour;
```

Résultat attendu : 7 lignes (jour, ca, moyenne_3) : 2026-10-01 | 2450 | 2450.0 ; 2026-10-02 | 1000 | 1725.0 ; 2026-10-03 | 2400 | 1950.0 ; 2026-10-05 | 1800 | 1733.3 ; 2026-10-06 | 2400 | 2200.0 ; 2026-10-07 | 1000 | 1733.3 ; 2026-10-08 | 600 | 1333.3

Trace :

- Le cadre prend la ligne en cours et les deux précédentes.
- Aux premières lignes, la moyenne porte sur moins de valeurs.
- ROUND arrondit à une décimale.

## Vérifier et expliquer

Calcule à la main le cumul des trois premiers jours, puis la moyenne glissante du troisième jour, et compare avec SQLite.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — fonctions de fenêtre](https://www.sqlite.org/windowfunctions.html)
- [SQLite — WITH et requêtes récursives](https://www.sqlite.org/lang_with.html)
