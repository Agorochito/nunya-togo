---
{
  "id": "sqli-m4-02",
  "title_fr": "UPSERT et déclencheurs",
  "course": "sql-intermediaire",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "sqli-m4-01"
  ],
  "outcomes": [
    "Insérer ou mettre à jour en une instruction avec INSERT … ON CONFLICT DO UPDATE.",
    "Automatiser une règle avec un déclencheur : mise à jour du stock et refus d’une vente impossible."
  ],
  "idea_fr": "La base peut faire respecter ses propres règles : fusionner une arrivée de marchandise, retirer du stock à chaque vente, refuser ce qui est impossible.",
  "analogy_fr": "Dans un magasin bien tenu, chaque vente retire automatiquement l’article de l’inventaire, et la caisse refuse de vendre ce qui n’est plus en rayon. Personne n’a besoin d’y penser.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "INSERT INTO produits(id, nom, categorie, prix, stock)\nVALUES (3, 'Savon', 'hygiène', 250, 20), (7, 'Allumettes', 'épicerie', 50, 100)\nON CONFLICT(id) DO UPDATE SET stock = stock + excluded.stock;\nSELECT id, nom, stock FROM produits WHERE id IN (3, 7) ORDER BY id;",
      "expected_output": "2 lignes (id, nom, stock) : 3 | Savon | 80 ; 7 | Allumettes | 100",
      "trace_fr": [
        "Le savon existe : son stock passe de 60 à 80.",
        "Les allumettes n’existent pas : elles sont créées.",
        "excluded.stock désigne la quantité reçue."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom",
          "stock"
        ],
        "values": [
          [
            3,
            "Savon",
            80
          ],
          [
            7,
            "Allumettes",
            100
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "CREATE TRIGGER maj_stock AFTER INSERT ON ventes\nBEGIN\n  UPDATE produits SET stock = stock - NEW.quantite WHERE id = NEW.produit_id;\nEND;\nINSERT INTO ventes(client_id, produit_id, quantite, jour) VALUES (5, 1, 4, '2026-10-09');\nSELECT id, nom, stock FROM produits WHERE id = 1;",
      "expected_output": "1 ligne (id, nom, stock) : 1 | Riz 1 kg | 36",
      "trace_fr": [
        "Le déclencheur s’exécute après chaque insertion dans ventes.",
        "NEW.quantite vaut 4 et NEW.produit_id vaut 1.",
        "Le stock du riz passe de 40 à 36."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom",
          "stock"
        ],
        "values": [
          [
            1,
            "Riz 1 kg",
            36
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser INSERT OR REPLACE pour ajouter du stock",
      "why_fr": "L’ancienne ligne est remplacée : le stock existant est perdu.",
      "fix_fr": "Utilise ON CONFLICT DO UPDATE avec excluded."
    },
    {
      "error": "Confondre NEW et excluded",
      "why_fr": "NEW sert dans les déclencheurs, excluded dans l’UPSERT.",
      "fix_fr": "Utilise chaque mot dans son contexte."
    },
    {
      "error": "Écrire une condition de refus à l’envers",
      "why_fr": "Les ventes possibles sont bloquées.",
      "fix_fr": "Refuse quand le stock est inférieur à la quantité."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne excluded dans un UPSERT ?",
      "options": [
        "La ligne déjà en base",
        "La ligne qu’on essayait d’insérer",
        "Une table supprimée",
        "Rien"
      ],
      "answer": 1,
      "explanation": "excluded contient les valeurs proposées.",
      "id": "sqli-m4-02-q1"
    },
    {
      "question": "Quand s’exécute un déclencheur AFTER INSERT ON ventes ?",
      "options": [
        "Avant chaque vente",
        "Après chaque insertion dans ventes",
        "Une fois par jour",
        "Jamais seul"
      ],
      "answer": 1,
      "explanation": "Il réagit à chaque insertion.",
      "id": "sqli-m4-02-q2"
    },
    {
      "question": "Que fait RAISE(ABORT, …) dans un déclencheur BEFORE ?",
      "options": [
        "Il affiche un message et continue",
        "Il annule l’instruction et renvoie l’erreur",
        "Il supprime la table",
        "Il ralentit"
      ],
      "answer": 1,
      "explanation": "L’opération est refusée.",
      "id": "sqli-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "UPSERT",
      "definition": "Insertion qui devient une mise à jour en cas de conflit."
    },
    {
      "term": "excluded",
      "definition": "Ligne proposée dans un UPSERT."
    },
    {
      "term": "déclencheur",
      "definition": "Action exécutée automatiquement lors d’un événement sur une table."
    },
    {
      "term": "RAISE",
      "definition": "Fonction qui annule une opération depuis un déclencheur."
    }
  ],
  "recap_fr": [
    "Insérer ou mettre à jour en une instruction avec INSERT … ON CONFLICT DO UPDATE.",
    "Automatiser une règle avec un déclencheur : mise à jour du stock et refus d’une vente impossible.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "UPSERT",
    "excluded",
    "déclencheur",
    "RAISE"
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
      "title": "SQLite — UPSERT",
      "url": "https://www.sqlite.org/lang_upsert.html"
    },
    {
      "title": "SQLite — CREATE TRIGGER",
      "url": "https://www.sqlite.org/lang_createtrigger.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — UPSERT",
      "url": "https://www.sqlite.org/lang_upsert.html",
      "scope": "INSERT … ON CONFLICT DO UPDATE. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — CREATE TRIGGER",
      "url": "https://www.sqlite.org/lang_createtrigger.html",
      "scope": "Déclencheurs et RAISE. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une arrivée de marchandise pose une question simple : si le produit existe déjà, on ajoute au stock ; sinon, on le crée. Écrire d’abord un SELECT pour vérifier, puis un INSERT ou un UPDATE, demande trois instructions et peut se tromper si deux personnes travaillent en même temps. L’UPSERT le fait en une seule : INSERT INTO produits(…) VALUES (…) ON CONFLICT(id) DO UPDATE SET stock = stock + excluded.stock.

ON CONFLICT(id) désigne la contrainte qui détecte le doublon : ici la clé primaire, mais ce peut être une colonne UNIQUE. DO UPDATE indique quoi faire dans ce cas. Le mot excluded désigne la ligne qu’on essayait d’insérer : excluded.stock est la quantité reçue, stock seul est la quantité déjà en base. Une variante, DO NOTHING, ignore simplement le doublon.

Méfie-toi d’INSERT OR REPLACE, qui ressemble à l’UPSERT. Il supprime l’ancienne ligne et la remplace entièrement : le stock existant est perdu au lieu d’être augmenté, et les colonnes non fournies reprennent leur valeur par défaut.

Un déclencheur, ou trigger, est une action que la base exécute automatiquement lors d’un événement sur une table : insertion, modification ou suppression. CREATE TRIGGER maj_stock AFTER INSERT ON ventes BEGIN UPDATE produits SET stock = stock - NEW.quantite WHERE id = NEW.produit_id; END; retire du stock chaque quantité vendue. NEW désigne la ligne qui vient d’être insérée ; pour une modification ou une suppression, OLD désigne l’ancienne.

Un déclencheur BEFORE peut aussi refuser une opération. Avec une clause WHEN, il ne s’active que si une condition est vraie, par exemple quand la quantité demandée dépasse le stock. Son corps appelle alors RAISE(ABORT, 'stock insuffisant') : l’instruction est annulée et le message d’erreur est renvoyé au programme. La vente impossible n’est jamais enregistrée.

Les déclencheurs sont puissants mais invisibles : quelqu’un qui lit seulement l’instruction INSERT ne voit pas qu’elle modifie aussi le stock. Documente-les, donne-leur des noms explicites et garde-les courts. Une règle métier essentielle, comme ne jamais vendre plus que le stock, a toute sa place dans un déclencheur ; un calcul de présentation, non.

Dans les exercices, tu crées le déclencheur puis tu insères une vente pour observer son effet. Le correcteur compare l’état final de toutes les tables et essaie aussi des insertions qui doivent réussir ou être refusées.

## Exemple guidé 1

```sql
INSERT INTO produits(id, nom, categorie, prix, stock)
VALUES (3, 'Savon', 'hygiène', 250, 20), (7, 'Allumettes', 'épicerie', 50, 100)
ON CONFLICT(id) DO UPDATE SET stock = stock + excluded.stock;
SELECT id, nom, stock FROM produits WHERE id IN (3, 7) ORDER BY id;
```

Résultat attendu : 2 lignes (id, nom, stock) : 3 | Savon | 80 ; 7 | Allumettes | 100

Trace :

- Le savon existe : son stock passe de 60 à 80.
- Les allumettes n’existent pas : elles sont créées.
- excluded.stock désigne la quantité reçue.

## Exemple guidé 2

```sql
CREATE TRIGGER maj_stock AFTER INSERT ON ventes
BEGIN
  UPDATE produits SET stock = stock - NEW.quantite WHERE id = NEW.produit_id;
END;
INSERT INTO ventes(client_id, produit_id, quantite, jour) VALUES (5, 1, 4, '2026-10-09');
SELECT id, nom, stock FROM produits WHERE id = 1;
```

Résultat attendu : 1 ligne (id, nom, stock) : 1 | Riz 1 kg | 36

Trace :

- Le déclencheur s’exécute après chaque insertion dans ventes.
- NEW.quantite vaut 4 et NEW.produit_id vaut 1.
- Le stock du riz passe de 40 à 36.

## Vérifier et expliquer

Avant chaque exercice, écris le stock attendu du produit concerné, puis compare avec le SELECT final.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — UPSERT](https://www.sqlite.org/lang_upsert.html)
- [SQLite — CREATE TRIGGER](https://www.sqlite.org/lang_createtrigger.html)
