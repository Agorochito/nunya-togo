---
{
  "id": "sqli-m2-01",
  "title_fr": "Sous-requêtes scalaires et corrélées",
  "course": "sql-intermediaire",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "sqli-m1-03"
  ],
  "outcomes": [
    "Comparer chaque ligne à une valeur calculée par une sous-requête scalaire.",
    "Écrire une sous-requête corrélée qui dépend de la ligne en cours."
  ],
  "idea_fr": "Une sous-requête est une question posée à l’intérieur d’une autre ; corrélée, elle est reposée pour chaque ligne.",
  "analogy_fr": "Le professeur compare chaque copie à la moyenne de la classe : il calcule la moyenne une fois. Pour comparer chaque élève à ses propres notes précédentes, il doit regarder un dossier différent pour chacun.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "SELECT nom, prix\nFROM produits\nWHERE prix > (SELECT AVG(prix) FROM produits)\nORDER BY prix DESC;",
      "expected_output": "3 lignes (nom, prix) : Huile 1 L | 1200 ; Sucre 1 kg | 700 ; Riz 1 kg | 600",
      "trace_fr": [
        "La sous-requête calcule une fois la moyenne des prix.",
        "Chaque produit est comparé à cette valeur.",
        "Seuls les produits plus chers que la moyenne restent."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "prix"
        ],
        "values": [
          [
            "Huile 1 L",
            1200
          ],
          [
            "Sucre 1 kg",
            700
          ],
          [
            "Riz 1 kg",
            600
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT c.nom,\n       (SELECT MAX(v.jour) FROM ventes AS v WHERE v.client_id = c.id) AS dernier_achat\nFROM clients AS c\nORDER BY c.id;",
      "expected_output": "5 lignes (nom, dernier_achat) : Afi | 2026-10-07 ; Kossi | 2026-10-05 ; Mina | 2026-10-08 ; Yao | 2026-10-06 ; Esi | NULL",
      "trace_fr": [
        "Pour chaque client, la sous-requête cherche ses propres ventes.",
        "La corrélation est v.client_id = c.id.",
        "Esi n’a rien acheté : NULL."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "dernier_achat"
        ],
        "values": [
          [
            "Afi",
            "2026-10-07"
          ],
          [
            "Kossi",
            "2026-10-05"
          ],
          [
            "Mina",
            "2026-10-08"
          ],
          [
            "Yao",
            "2026-10-06"
          ],
          [
            "Esi",
            null
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier la corrélation",
      "why_fr": "Toutes les lignes reçoivent la même valeur globale.",
      "fix_fr": "Relie la sous-requête à la ligne extérieure."
    },
    {
      "error": "Réutiliser le même alias",
      "why_fr": "SQLite ne sait pas quelle occurrence est visée.",
      "fix_fr": "Donne un alias distinct à chaque occurrence de la table."
    },
    {
      "error": "Laisser une sous-requête scalaire renvoyer plusieurs lignes",
      "why_fr": "Seule la première est utilisée, en silence.",
      "fix_fr": "Utilise un agrégat ou une condition unique."
    }
  ],
  "quiz": [
    {
      "question": "Combien de valeurs doit renvoyer une sous-requête scalaire ?",
      "options": [
        "Aucune",
        "Une",
        "Plusieurs",
        "Au moins deux"
      ],
      "answer": 1,
      "explanation": "Une ligne, une colonne.",
      "id": "sqli-m2-01-q1"
    },
    {
      "question": "Qu’est-ce qui rend une sous-requête corrélée ?",
      "options": [
        "Un ORDER BY",
        "Une référence à une colonne de la requête extérieure",
        "Un GROUP BY",
        "Un LIMIT"
      ],
      "answer": 1,
      "explanation": "Elle dépend de la ligne en cours.",
      "id": "sqli-m2-01-q2"
    },
    {
      "question": "Que vaut une sous-requête scalaire qui ne trouve aucune ligne ?",
      "options": [
        "0",
        "NULL",
        "Une erreur",
        "Une chaîne vide"
      ],
      "answer": 1,
      "explanation": "L’absence de résultat donne NULL.",
      "id": "sqli-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "sous-requête scalaire",
      "definition": "Sous-requête qui renvoie une seule valeur."
    },
    {
      "term": "sous-requête corrélée",
      "definition": "Sous-requête qui fait référence à la ligne extérieure."
    },
    {
      "term": "corrélation",
      "definition": "Condition qui relie la sous-requête à la ligne en cours."
    },
    {
      "term": "alias de table",
      "definition": "Nom court donné à une occurrence de table avec AS."
    }
  ],
  "recap_fr": [
    "Comparer chaque ligne à une valeur calculée par une sous-requête scalaire.",
    "Écrire une sous-requête corrélée qui dépend de la ligne en cours.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "sous-requête scalaire",
    "sous-requête corrélée",
    "corrélation",
    "alias de table"
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

Une sous-requête est une requête SELECT placée entre parenthèses dans une autre requête. Tu en as déjà utilisé avec IN et NOT EXISTS. Ici, on approfondit deux formes très utiles.

La sous-requête scalaire renvoie une seule valeur : une ligne, une colonne. On peut alors l’utiliser partout où une valeur est attendue. WHERE prix > (SELECT AVG(prix) FROM produits) garde les produits plus chers que la moyenne. Dans SELECT, (SELECT MAX(prix) FROM produits) - prix calcule l’écart de chaque produit avec le plus cher. Si la sous-requête renvoie plusieurs lignes, SQLite prend la première sans prévenir, ce qui peut donner un résultat faux : une sous-requête scalaire doit être construite pour ne renvoyer qu’une valeur, souvent avec un agrégat. Si elle ne renvoie aucune ligne, sa valeur est NULL.

La sous-requête corrélée fait référence à une colonne de la requête extérieure. Elle est conceptuellement recalculée pour chaque ligne. Par exemple, pour chaque client, (SELECT MAX(v.jour) FROM ventes AS v WHERE v.client_id = c.id) donne la date de son dernier achat. Le lien v.client_id = c.id est la corrélation : sans lui, on obtiendrait le dernier achat de toute la boutique, le même pour tous les clients.

Les alias deviennent indispensables. Quand la même table apparaît dans la requête extérieure et dans la sous-requête, comme produits comparé à lui-même, chaque occurrence doit avoir son propre alias, sinon SQLite ne sait pas de quelle ligne tu parles. Pour trouver les produits plus chers que la moyenne de leur propre catégorie, on écrit FROM produits AS p WHERE p.prix > (SELECT AVG(p2.prix) FROM produits AS p2 WHERE p2.categorie = p.categorie).

Une sous-requête corrélée remplace parfois une jointure suivie d’un regroupement, avec une écriture plus proche de la question. Elle peut être plus lente sur de très grandes tables, car elle est évaluée ligne par ligne ; SQLite l’optimise souvent, et le dernier module montrera comment vérifier un plan d’exécution.

Enfin, une remarque sur NULL. Un client sans aucun achat obtient NULL pour son dernier achat, ce qui est une bonne information. Mais si tu compares cette valeur avec <, la condition est inconnue et la ligne disparaît du WHERE. Décide explicitement ce que tu veux faire de ces clients, par exemple avec coalesce ou IS NULL.

## Exemple guidé 1

```sql
SELECT nom, prix
FROM produits
WHERE prix > (SELECT AVG(prix) FROM produits)
ORDER BY prix DESC;
```

Résultat attendu : 3 lignes (nom, prix) : Huile 1 L | 1200 ; Sucre 1 kg | 700 ; Riz 1 kg | 600

Trace :

- La sous-requête calcule une fois la moyenne des prix.
- Chaque produit est comparé à cette valeur.
- Seuls les produits plus chers que la moyenne restent.

## Exemple guidé 2

```sql
SELECT c.nom,
       (SELECT MAX(v.jour) FROM ventes AS v WHERE v.client_id = c.id) AS dernier_achat
FROM clients AS c
ORDER BY c.id;
```

Résultat attendu : 5 lignes (nom, dernier_achat) : Afi | 2026-10-07 ; Kossi | 2026-10-05 ; Mina | 2026-10-08 ; Yao | 2026-10-06 ; Esi | NULL

Trace :

- Pour chaque client, la sous-requête cherche ses propres ventes.
- La corrélation est v.client_id = c.id.
- Esi n’a rien acheté : NULL.

## Vérifier et expliquer

Pour deux clients, calcule à la main la date de leur dernier achat, puis vérifie que la sous-requête corrélée donne la même chose.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — expressions](https://www.sqlite.org/lang_expr.html)
- [SQLite — SELECT](https://www.sqlite.org/lang_select.html)
