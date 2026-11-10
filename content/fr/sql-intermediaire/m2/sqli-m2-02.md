---
{
  "id": "sqli-m2-02",
  "title_fr": "Écrire en étapes avec WITH",
  "course": "sql-intermediaire",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "sqli-m2-01"
  ],
  "outcomes": [
    "Nommer des résultats intermédiaires avec une expression de table commune (WITH).",
    "Enchaîner plusieurs étapes et les réutiliser dans la requête finale."
  ],
  "idea_fr": "WITH découpe une requête complexe en étapes nommées, lisibles de haut en bas, comme les étapes d’une recette.",
  "analogy_fr": "Pour préparer un plat, on lave d’abord les légumes, puis on prépare la sauce, puis on assemble. Écrire tout en une seule phrase serait illisible.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "WITH lignes AS (\n  SELECT v.client_id, v.quantite * p.prix AS montant\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n)\nSELECT client_id, SUM(montant) AS total\nFROM lignes\nWHERE client_id IS NOT NULL\nGROUP BY client_id\nORDER BY total DESC;",
      "expected_output": "4 lignes (client_id, total) : 2 | 3050 ; 1 | 2900 ; 4 | 2400 ; 3 | 1800",
      "trace_fr": [
        "L’étape lignes calcule le montant de chaque vente.",
        "La requête finale regroupe ces montants par client.",
        "Les ventes anonymes sont écartées."
      ],
      "expected_result": {
        "columns": [
          "client_id",
          "total"
        ],
        "values": [
          [
            2,
            3050
          ],
          [
            1,
            2900
          ],
          [
            4,
            2400
          ],
          [
            3,
            1800
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "WITH lignes AS (\n  SELECT v.client_id, v.quantite * p.prix AS montant\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n  WHERE v.client_id IS NOT NULL\n),\ntotaux AS (\n  SELECT client_id, SUM(montant) AS total FROM lignes GROUP BY client_id\n)\nSELECT client_id, total\nFROM totaux\nWHERE total > (SELECT AVG(total) FROM totaux)\nORDER BY client_id;",
      "expected_output": "2 lignes (client_id, total) : 1 | 2900 ; 2 | 3050",
      "trace_fr": [
        "Deux étapes : les lignes, puis les totaux.",
        "totaux est réutilisée deux fois.",
        "On garde les clients au-dessus de la moyenne des totaux."
      ],
      "expected_result": {
        "columns": [
          "client_id",
          "total"
        ],
        "values": [
          [
            1,
            2900
          ],
          [
            2,
            3050
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Répéter WITH devant chaque étape",
      "why_fr": "SQLite refuse la syntaxe.",
      "fix_fr": "Un seul WITH, puis des étapes séparées par des virgules."
    },
    {
      "error": "Nommer une étape comme une table",
      "why_fr": "L’étape masque la vraie table.",
      "fix_fr": "Choisis un nom différent et parlant."
    },
    {
      "error": "Croire qu’une CTE est enregistrée",
      "why_fr": "Elle disparaît à la fin de la requête.",
      "fix_fr": "Crée une vue pour la conserver."
    }
  ],
  "quiz": [
    {
      "question": "Combien de fois écrit-on le mot WITH pour trois étapes ?",
      "options": [
        "Trois",
        "Une",
        "Deux",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "Un WITH, puis des étapes séparées par des virgules.",
      "id": "sqli-m2-02-q1"
    },
    {
      "question": "Une CTE modifie-t-elle la base ?",
      "options": [
        "Oui",
        "Non, elle n’existe que pendant la requête",
        "Seulement avec GROUP BY",
        "Seulement la première fois"
      ],
      "answer": 1,
      "explanation": "Elle est temporaire et en lecture.",
      "id": "sqli-m2-02-q2"
    },
    {
      "question": "Comment déboguer une étape ?",
      "options": [
        "La supprimer",
        "Afficher SELECT * FROM l’étape à la place de la requête finale",
        "Ajouter LIMIT 0",
        "Redémarrer"
      ],
      "answer": 1,
      "explanation": "On examine chaque étape séparément.",
      "id": "sqli-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "CTE",
      "definition": "Expression de table commune : résultat intermédiaire nommé avec WITH."
    },
    {
      "term": "étape",
      "definition": "Requête nommée dans une clause WITH."
    },
    {
      "term": "chiffre d’affaires",
      "definition": "Somme des montants vendus, quantité × prix."
    },
    {
      "term": "requête finale",
      "definition": "SELECT qui suit les étapes et produit le résultat."
    }
  ],
  "recap_fr": [
    "Nommer des résultats intermédiaires avec une expression de table commune (WITH).",
    "Enchaîner plusieurs étapes et les réutiliser dans la requête finale.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "CTE",
    "étape",
    "chiffre d’affaires",
    "requête finale"
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
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html"
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
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Requêtes, sous-requêtes et opérateurs composés. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Les requêtes réelles empilent vite plusieurs idées : calculer le chiffre d’affaires de chaque vente, le regrouper par client, puis comparer chaque client à la moyenne. En imbriquant des sous-requêtes, on obtient des parenthèses dans des parenthèses, difficiles à relire et à corriger. La clause WITH apporte une solution : elle nomme des résultats intermédiaires, appelés expressions de table communes, ou CTE.

La syntaxe place les étapes avant la requête principale. WITH lignes AS (SELECT …), totaux AS (SELECT … FROM lignes …) SELECT … FROM totaux. Chaque étape est une requête complète, entre parenthèses, avec un nom. Une étape peut utiliser les étapes déclarées avant elle, et la requête finale peut toutes les utiliser, comme si c’étaient des tables. On les sépare par des virgules, et le mot WITH n’apparaît qu’une fois.

L’intérêt principal est la lisibilité. Chaque étape répond à une petite question, et son nom l’explique : lignes, ventes_par_client, moyenne. Pour corriger une requête, on peut exécuter une étape seule en remplaçant la requête finale par SELECT * FROM l’étape : c’est une excellente méthode de débogage.

Une CTE peut être utilisée plusieurs fois dans la requête finale, ce qui évite de recopier la même sous-requête. Par exemple, une étape totaux sert à la fois à lister chaque client et, dans une sous-requête scalaire, à calculer la moyenne des totaux.

Les CTE ne créent rien dans la base : elles n’existent que le temps de la requête. Elles ne modifient pas les tables, et le correcteur vérifie d’ailleurs que la base initiale reste intacte. Pour conserver une requête et la réutiliser plus tard, on crée une vue, comme on le verra au dernier module.

Dans cette base, le chiffre d’affaires d’une vente est la quantité multipliée par le prix du produit, obtenu par jointure. Ce calcul revient dans presque toutes les leçons suivantes : c’est un bon candidat pour une première étape nommée.

Enfin, garde les noms d’étapes en minuscules, sans accent et parlants. Évite d’utiliser le nom d’une table existante : une étape nommée ventes masquerait la vraie table ventes dans la suite de la requête, et le résultat deviendrait trompeur.

## Exemple guidé 1

```sql
WITH lignes AS (
  SELECT v.client_id, v.quantite * p.prix AS montant
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
)
SELECT client_id, SUM(montant) AS total
FROM lignes
WHERE client_id IS NOT NULL
GROUP BY client_id
ORDER BY total DESC;
```

Résultat attendu : 4 lignes (client_id, total) : 2 | 3050 ; 1 | 2900 ; 4 | 2400 ; 3 | 1800

Trace :

- L’étape lignes calcule le montant de chaque vente.
- La requête finale regroupe ces montants par client.
- Les ventes anonymes sont écartées.

## Exemple guidé 2

```sql
WITH lignes AS (
  SELECT v.client_id, v.quantite * p.prix AS montant
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
  WHERE v.client_id IS NOT NULL
),
totaux AS (
  SELECT client_id, SUM(montant) AS total FROM lignes GROUP BY client_id
)
SELECT client_id, total
FROM totaux
WHERE total > (SELECT AVG(total) FROM totaux)
ORDER BY client_id;
```

Résultat attendu : 2 lignes (client_id, total) : 1 | 2900 ; 2 | 3050

Trace :

- Deux étapes : les lignes, puis les totaux.
- totaux est réutilisée deux fois.
- On garde les clients au-dessus de la moyenne des totaux.

## Vérifier et expliquer

Exécute chaque étape seule en remplaçant la requête finale par SELECT * FROM l’étape, et vérifie qu’elle produit ce que son nom annonce.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — WITH et requêtes récursives](https://www.sqlite.org/lang_with.html)
- [SQLite — SELECT](https://www.sqlite.org/lang_select.html)
