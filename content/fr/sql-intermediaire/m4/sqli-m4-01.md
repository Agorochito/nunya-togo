---
{
  "id": "sqli-m4-01",
  "title_fr": "Vues et index",
  "course": "sql-intermediaire",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "sqli-m3-03"
  ],
  "outcomes": [
    "Enregistrer une requête réutilisable sous forme de vue.",
    "Créer un index, dont un index unique, et expliquer ce qu’il accélère et ce qu’il coûte."
  ],
  "idea_fr": "Une vue donne un nom à une requête ; un index est un sommaire qui permet de retrouver vite des lignes.",
  "analogy_fr": "Au marché, le registre des commerçants est trié par numéro d’étal : on retrouve un étal sans feuilleter tout le cahier. Le sommaire coûte un peu de travail à tenir à jour, mais fait gagner du temps à chaque recherche.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "CREATE VIEW lignes_ventes AS\n  SELECT v.id, v.jour, p.nom, v.quantite * p.prix AS montant\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id;\nSELECT nom, SUM(montant) AS total\nFROM lignes_ventes\nGROUP BY nom\nORDER BY total DESC, nom;",
      "expected_output": "5 lignes (nom, total) : Huile 1 L | 3600 ; Riz 1 kg | 3600 ; Savon | 1750 ; Stylo | 1500 ; Cahier | 1200",
      "trace_fr": [
        "La vue lignes_ventes enregistre la jointure et le calcul du montant.",
        "On l’interroge ensuite comme une table.",
        "Le regroupement par nom donne le chiffre d’affaires par produit."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "total"
        ],
        "values": [
          [
            "Huile 1 L",
            3600
          ],
          [
            "Riz 1 kg",
            3600
          ],
          [
            "Savon",
            1750
          ],
          [
            "Stylo",
            1500
          ],
          [
            "Cahier",
            1200
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "CREATE INDEX idx_ventes_jour ON ventes(jour);\nSELECT name, tbl_name FROM sqlite_master WHERE type = 'index' ORDER BY name;",
      "expected_output": "1 ligne (name, tbl_name) : idx_ventes_jour | ventes",
      "trace_fr": [
        "CREATE INDEX crée un sommaire trié par jour.",
        "sqlite_master liste les objets de la base.",
        "L’index apparaît avec la table qu’il accélère."
      ],
      "expected_result": {
        "columns": [
          "name",
          "tbl_name"
        ],
        "values": [
          [
            "idx_ventes_jour",
            "ventes"
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire qu’une vue copie les données",
      "why_fr": "Elle relit les tables à chaque utilisation.",
      "fix_fr": "Utilise-la comme une requête nommée."
    },
    {
      "error": "Indexer toutes les colonnes",
      "why_fr": "Les écritures ralentissent et la base grossit.",
      "fix_fr": "Indexe les colonnes souvent filtrées, jointes ou triées."
    },
    {
      "error": "Créer un index simple pour interdire les doublons",
      "why_fr": "Un index simple accepte les doublons.",
      "fix_fr": "Utilise CREATE UNIQUE INDEX."
    }
  ],
  "quiz": [
    {
      "question": "Une vue stocke-t-elle des lignes ?",
      "options": [
        "Oui, une copie",
        "Non, elle exécute sa requête à chaque utilisation",
        "Seulement la première fois",
        "Seulement les index"
      ],
      "answer": 1,
      "explanation": "Une vue est une requête nommée.",
      "id": "sqli-m4-01-q1"
    },
    {
      "question": "Quel est le coût d’un index ?",
      "options": [
        "Aucun",
        "Des écritures plus lentes et de la place",
        "Des lectures plus lentes",
        "Il supprime des lignes"
      ],
      "answer": 1,
      "explanation": "Chaque modification doit aussi mettre l’index à jour.",
      "id": "sqli-m4-01-q2"
    },
    {
      "question": "Que fait CREATE UNIQUE INDEX en plus d’un index ?",
      "options": [
        "Il trie le résultat",
        "Il interdit les doublons dans la colonne",
        "Il crée une vue",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Les doublons sont refusés.",
      "id": "sqli-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "vue",
      "definition": "Requête enregistrée sous un nom, interrogée comme une table."
    },
    {
      "term": "index",
      "definition": "Structure triée qui accélère la recherche de lignes."
    },
    {
      "term": "index unique",
      "definition": "Index qui interdit deux valeurs identiques."
    },
    {
      "term": "plan d’exécution",
      "definition": "Description de la façon dont SQLite exécute une requête."
    }
  ],
  "recap_fr": [
    "Enregistrer une requête réutilisable sous forme de vue.",
    "Créer un index, dont un index unique, et expliquer ce qu’il accélère et ce qu’il coûte.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "vue",
    "index",
    "index unique",
    "plan d’exécution"
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
      "title": "SQLite — CREATE VIEW",
      "url": "https://www.sqlite.org/lang_createview.html"
    },
    {
      "title": "SQLite — CREATE INDEX",
      "url": "https://www.sqlite.org/lang_createindex.html"
    },
    {
      "title": "SQLite — EXPLAIN QUERY PLAN",
      "url": "https://www.sqlite.org/eqp.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — CREATE VIEW",
      "url": "https://www.sqlite.org/lang_createview.html",
      "scope": "Vues nommées. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — CREATE INDEX",
      "url": "https://www.sqlite.org/lang_createindex.html",
      "scope": "Index et unicité. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — EXPLAIN QUERY PLAN",
      "url": "https://www.sqlite.org/eqp.html",
      "scope": "Lire l’utilisation d’un index. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Certaines requêtes reviennent sans cesse. Dans la boutique, le montant de chaque vente, quantité multipliée par prix, apparaît dans presque toutes les analyses. Une vue enregistre une requête sous un nom : CREATE VIEW lignes_ventes AS SELECT …. On l’interroge ensuite comme une table : SELECT * FROM lignes_ventes WHERE montant > 2000. La vue ne stocke pas de données : elle exécute sa requête à chaque utilisation, et reflète donc toujours l’état actuel des tables.

Les vues apportent trois avantages. Elles évitent de recopier la même jointure partout, source d’erreurs. Elles donnent un vocabulaire métier : lignes_ventes parle davantage qu’une jointure. Et elles peuvent limiter ce qu’on montre, par exemple une vue sans les colonnes sensibles, donnée à des utilisateurs qui n’ont pas besoin de tout voir. Une vue se supprime avec DROP VIEW, sans toucher aux tables.

Un index est une autre structure, stockée cette fois. Sans index, pour trouver les ventes du 3 octobre, SQLite parcourt toute la table, ligne par ligne. Sur dix lignes, c’est instantané ; sur dix millions, c’est long. CREATE INDEX idx_ventes_jour ON ventes(jour) crée une structure triée par jour, qui permet d’aller directement aux bonnes lignes, comme un sommaire. Un index peut porter sur plusieurs colonnes, dans un ordre qui compte : un index sur (client_id, jour) aide pour chercher les achats d’un client, triés par date.

Les index ont un coût. Chaque insertion ou modification doit aussi mettre à jour les index, et ils occupent de la place. On en crée donc pour les colonnes souvent utilisées dans WHERE, dans les jointures ou dans ORDER BY, pas sur toutes les colonnes. La commande EXPLAIN QUERY PLAN, placée devant une requête, montre si SQLite utilise un index : on y lit USING INDEX lorsqu’il le fait. Ce cours ne compare pas son texte exact, qui varie selon les versions, mais tu peux l’essayer dans l’atelier.

Un index unique, CREATE UNIQUE INDEX, ajoute une règle : deux lignes ne peuvent pas avoir la même valeur dans la colonne indexée. Une insertion qui créerait un doublon est refusée avec l’erreur UNIQUE constraint failed. C’est une façon d’ajouter une contrainte à une table existante, par exemple pour interdire deux clients portant exactement le même nom.

Comme au niveau précédent, chaque essai repart de la base initiale : tes vues et index disparaissent à l’essai suivant. Le correcteur vérifie leur effet en essayant des instructions sur ta base, sans les garder.

## Exemple guidé 1

```sql
CREATE VIEW lignes_ventes AS
  SELECT v.id, v.jour, p.nom, v.quantite * p.prix AS montant
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id;
SELECT nom, SUM(montant) AS total
FROM lignes_ventes
GROUP BY nom
ORDER BY total DESC, nom;
```

Résultat attendu : 5 lignes (nom, total) : Huile 1 L | 3600 ; Riz 1 kg | 3600 ; Savon | 1750 ; Stylo | 1500 ; Cahier | 1200

Trace :

- La vue lignes_ventes enregistre la jointure et le calcul du montant.
- On l’interroge ensuite comme une table.
- Le regroupement par nom donne le chiffre d’affaires par produit.

## Exemple guidé 2

```sql
CREATE INDEX idx_ventes_jour ON ventes(jour);
SELECT name, tbl_name FROM sqlite_master WHERE type = 'index' ORDER BY name;
```

Résultat attendu : 1 ligne (name, tbl_name) : idx_ventes_jour | ventes

Trace :

- CREATE INDEX crée un sommaire trié par jour.
- sqlite_master liste les objets de la base.
- L’index apparaît avec la table qu’il accélère.

## Vérifier et expliquer

Essaie EXPLAIN QUERY PLAN SELECT * FROM ventes WHERE jour = '2026-10-03'; avant et après avoir créé l’index, et compare les deux lignes affichées.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — CREATE VIEW](https://www.sqlite.org/lang_createview.html)
- [SQLite — CREATE INDEX](https://www.sqlite.org/lang_createindex.html)
- [SQLite — EXPLAIN QUERY PLAN](https://www.sqlite.org/eqp.html)
