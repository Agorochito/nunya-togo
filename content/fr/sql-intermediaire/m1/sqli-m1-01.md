---
{
  "id": "sqli-m1-01",
  "title_fr": "Décider dans une requête avec CASE",
  "course": "sql-intermediaire",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "sql-m6-03"
  ],
  "outcomes": [
    "Classer chaque ligne avec CASE WHEN … THEN … ELSE … END.",
    "Compter par catégorie avec une agrégation conditionnelle SUM(CASE …)."
  ],
  "idea_fr": "CASE apporte le « si… alors… sinon » à l’intérieur d’une requête : une colonne calculée peut changer selon les données.",
  "analogy_fr": "Au marché, la vendeuse range ses tomates en trois paniers selon leur taille. La règle est la même pour chaque tomate ; seul le résultat change.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "SELECT nom, stock,\n  CASE WHEN stock = 0 THEN 'rupture'\n       WHEN stock < 20 THEN 'faible'\n       ELSE 'suffisant' END AS etat_stock\nFROM produits\nORDER BY id;",
      "expected_output": "6 lignes (nom, stock, etat_stock) : Riz 1 kg | 40 | suffisant ; Huile 1 L | 12 | faible ; Savon | 60 | suffisant ; Sucre 1 kg | 0 | rupture ; Cahier | 25 | suffisant ; Stylo | 80 | suffisant",
      "trace_fr": [
        "Chaque produit est testé dans l’ordre des WHEN.",
        "Le sucre, à 0, tombe dans rupture.",
        "L’huile, à 12, est faible.",
        "Les autres reçoivent la valeur du ELSE."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "stock",
          "etat_stock"
        ],
        "values": [
          [
            "Riz 1 kg",
            40,
            "suffisant"
          ],
          [
            "Huile 1 L",
            12,
            "faible"
          ],
          [
            "Savon",
            60,
            "suffisant"
          ],
          [
            "Sucre 1 kg",
            0,
            "rupture"
          ],
          [
            "Cahier",
            25,
            "suffisant"
          ],
          [
            "Stylo",
            80,
            "suffisant"
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT\n  SUM(CASE WHEN categorie = 'épicerie' THEN 1 ELSE 0 END) AS epicerie,\n  SUM(CASE WHEN categorie = 'papeterie' THEN 1 ELSE 0 END) AS papeterie,\n  SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS en_rupture\nFROM produits;",
      "expected_output": "1 ligne (epicerie, papeterie, en_rupture) : 3 | 2 | 1",
      "trace_fr": [
        "Chaque CASE vaut 1 ou 0 pour chaque produit.",
        "SUM additionne ces 1 : c’est un comptage conditionnel.",
        "Trois compteurs sont calculés en une seule lecture."
      ],
      "expected_result": {
        "columns": [
          "epicerie",
          "papeterie",
          "en_rupture"
        ],
        "values": [
          [
            3,
            2,
            1
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Mal ordonner les WHEN",
      "why_fr": "La première condition vraie gagne.",
      "fix_fr": "Teste du cas le plus précis au plus général."
    },
    {
      "error": "Oublier le ELSE",
      "why_fr": "Les lignes non prévues reçoivent NULL.",
      "fix_fr": "Écris un ELSE explicite."
    },
    {
      "error": "Mélanger texte et nombres dans les branches",
      "why_fr": "Les tris et comparaisons deviennent imprévisibles.",
      "fix_fr": "Renvoie le même type dans toutes les branches."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut CASE WHEN 5 > 3 THEN 'a' WHEN 5 > 1 THEN 'b' END ?",
      "options": [
        "'a'",
        "'b'",
        "'ab'",
        "NULL"
      ],
      "answer": 0,
      "explanation": "La première condition vraie gagne.",
      "id": "sqli-m1-01-q1"
    },
    {
      "question": "Sans ELSE, que reçoit une ligne qui ne vérifie aucun WHEN ?",
      "options": [
        "0",
        "''",
        "NULL",
        "Une erreur"
      ],
      "answer": 2,
      "explanation": "L’absence de ELSE produit NULL.",
      "id": "sqli-m1-01-q2"
    },
    {
      "question": "Que compte SUM(CASE WHEN prix > 500 THEN 1 ELSE 0 END) ?",
      "options": [
        "La somme des prix",
        "Le nombre de produits à plus de 500",
        "Le prix maximal",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Chaque produit concerné apporte 1.",
      "id": "sqli-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "CASE",
      "definition": "Expression qui choisit une valeur selon des conditions."
    },
    {
      "term": "agrégation conditionnelle",
      "definition": "Agrégat appliqué à un CASE pour compter ou sommer par catégorie."
    },
    {
      "term": "alias",
      "definition": "Nom donné à une colonne produite avec AS."
    },
    {
      "term": "ELSE",
      "definition": "Valeur par défaut quand aucune condition n’est vraie."
    }
  ],
  "recap_fr": [
    "Classer chaque ligne avec CASE WHEN … THEN … ELSE … END.",
    "Compter par catégorie avec une agrégation conditionnelle SUM(CASE …).",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "CASE",
    "agrégation conditionnelle",
    "alias",
    "ELSE"
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
      "title": "SQLite — expressions",
      "url": "https://www.sqlite.org/lang_expr.html"
    },
    {
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — expressions",
      "url": "https://www.sqlite.org/lang_expr.html",
      "scope": "CASE, sous-requêtes scalaires et EXISTS. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
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

Bienvenue dans le niveau intermédiaire. Le cours précédent t’a appris à lire, filtrer, regrouper, joindre et modifier des tables. Ici, tu vas écrire des requêtes plus expressives, comme le font les personnes qui préparent des tableaux de bord. Toutes les leçons utilisent une nouvelle base fictive : la boutique d’un quartier de Lomé, avec trois tables. produits contient le nom, la catégorie, le prix en FCFA et le stock. clients contient le nom, le quartier et l’éventuel parrain, c’est-à-dire le client qui a recommandé la boutique. ventes enregistre chaque vente : le client, parfois absent pour une vente anonyme, le produit, la quantité et le jour.

Première notion : l’expression CASE. Elle choisit une valeur selon des conditions, testées dans l’ordre. CASE WHEN stock = 0 THEN 'rupture' WHEN stock < 20 THEN 'faible' ELSE 'suffisant' END produit une étiquette pour chaque produit. Comme pour if et else if, la première condition vraie gagne, et les suivantes ne sont pas testées. L’ordre des WHEN compte donc : tester stock < 20 avant stock = 0 classerait un produit en rupture comme simplement faible.

Le ELSE est facultatif. Sans lui, une ligne qui ne vérifie aucune condition reçoit NULL. Cette valeur silencieuse est une source d’erreurs : mieux vaut écrire un ELSE explicite, même pour dire 'autre'.

CASE peut apparaître partout où une valeur est attendue : dans SELECT pour créer une colonne, dans ORDER BY pour imposer un ordre qui n’est pas alphabétique, ou à l’intérieur d’une fonction d’agrégat. Cette dernière forme est très utilisée. SUM(CASE WHEN categorie = 'épicerie' THEN 1 ELSE 0 END) compte les produits d’épicerie, et une seule requête peut ainsi calculer plusieurs compteurs côte à côte, sans faire une requête par catégorie. On parle d’agrégation conditionnelle.

Attention au type des résultats : toutes les branches d’un CASE devraient renvoyer le même genre de valeur, du texte ou des nombres. Mélanger les deux rend les comparaisons et les tris imprévisibles.

Enfin, pense à la lisibilité. Une requête avec CASE devient vite longue. Aligne chaque WHEN sur sa propre ligne et donne un alias clair à la colonne produite, comme etat_stock. Le correcteur de ce cours compare le nom des colonnes : respecte les alias demandés dans chaque consigne.

## Exemple guidé 1

```sql
SELECT nom, stock,
  CASE WHEN stock = 0 THEN 'rupture'
       WHEN stock < 20 THEN 'faible'
       ELSE 'suffisant' END AS etat_stock
FROM produits
ORDER BY id;
```

Résultat attendu : 6 lignes (nom, stock, etat_stock) : Riz 1 kg | 40 | suffisant ; Huile 1 L | 12 | faible ; Savon | 60 | suffisant ; Sucre 1 kg | 0 | rupture ; Cahier | 25 | suffisant ; Stylo | 80 | suffisant

Trace :

- Chaque produit est testé dans l’ordre des WHEN.
- Le sucre, à 0, tombe dans rupture.
- L’huile, à 12, est faible.
- Les autres reçoivent la valeur du ELSE.

## Exemple guidé 2

```sql
SELECT
  SUM(CASE WHEN categorie = 'épicerie' THEN 1 ELSE 0 END) AS epicerie,
  SUM(CASE WHEN categorie = 'papeterie' THEN 1 ELSE 0 END) AS papeterie,
  SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS en_rupture
FROM produits;
```

Résultat attendu : 1 ligne (epicerie, papeterie, en_rupture) : 3 | 2 | 1

Trace :

- Chaque CASE vaut 1 ou 0 pour chaque produit.
- SUM additionne ces 1 : c’est un comptage conditionnel.
- Trois compteurs sont calculés en une seule lecture.

## Vérifier et expliquer

Avant de lancer, écris à la main l’étiquette attendue pour chaque produit, puis compare avec le résultat.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — expressions](https://www.sqlite.org/lang_expr.html)
- [SQLite — SELECT](https://www.sqlite.org/lang_select.html)
