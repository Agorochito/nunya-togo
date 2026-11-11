---
{
  "id": "pgs-m2-01",
  "title_fr": "Vues et fonctions SQL",
  "course": "postgres-supabase",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "pgs-m1-03"
  ],
  "outcomes": [
    "Créer des vues pour donner un nom à une requête souvent utilisée.",
    "Écrire des fonctions SQL réutilisables, appelables depuis l’API de Supabase."
  ],
  "idea_fr": "Une vue est une requête enregistrée qui se lit comme une table ; une fonction est un calcul enregistré dans la base, que toutes les applications partagent.",
  "analogy_fr": "Plutôt que de réexpliquer à chaque nouveau vendeur comment calculer le prix TTC, on affiche la règle au mur de la boutique : tout le monde applique la même.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "create view produits_disponibles as\nselect id, nom, prix from produits where stock > 0;\nselect * from produits_disponibles order by prix;",
      "expected_output": "3 lignes (id, nom, prix) : 4 | Savon noir | 350 ; 1 | Riz parfumé | 600 ; 2 | Huile de palme | 1500",
      "trace_fr": [
        "La vue enregistre la requête.",
        "On la lit comme une table.",
        "Le gari, en rupture, n’y figure pas."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom",
          "prix"
        ],
        "values": [
          [
            4,
            "Savon noir",
            350
          ],
          [
            1,
            "Riz parfumé",
            600
          ],
          [
            2,
            "Huile de palme",
            1500
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "create function prix_ttc(prix integer) returns integer\nlanguage sql immutable\nas $$ select round(prix * 1.18)::integer $$;\nselect nom, prix_ttc(prix) as ttc from produits order by id;",
      "expected_output": "4 lignes (nom, ttc) : Riz parfumé | 708 ; Huile de palme | 1770 ; Gari | 472 ; Savon noir | 413",
      "trace_fr": [
        "La fonction calcule le prix TTC.",
        "Elle s’utilise comme une fonction intégrée.",
        "Toutes les applications partagent le même calcul."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "ttc"
        ],
        "values": [
          [
            "Riz parfumé",
            708
          ],
          [
            "Huile de palme",
            1770
          ],
          [
            "Gari",
            472
          ],
          [
            "Savon noir",
            413
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Recopier une requête dans chaque application",
      "why_fr": "Les versions divergent.",
      "fix_fr": "Crée une vue ou une fonction."
    },
    {
      "error": "Diviser deux entiers pour une moyenne",
      "why_fr": "Le résultat est tronqué.",
      "fix_fr": "Utilise avg ou convertis en numeric."
    },
    {
      "error": "Croire qu’une vue stocke les données",
      "why_fr": "On s’attend à des données figées.",
      "fix_fr": "Une vue relit les tables à chaque fois."
    }
  ],
  "quiz": [
    {
      "question": "Que stocke une vue ?",
      "options": [
        "Une copie des données",
        "Seulement la requête",
        "Un index",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Elle relit les tables à chaque lecture.",
      "id": "pgs-m2-01-q1"
    },
    {
      "question": "Comment Supabase appelle-t-il une fonction depuis l’application ?",
      "options": [
        "supabase.view()",
        "supabase.rpc()",
        "supabase.exec()",
        "Impossible"
      ],
      "answer": 1,
      "explanation": "Remote procedure call.",
      "id": "pgs-m2-01-q2"
    },
    {
      "question": "Que signifie immutable pour une fonction ?",
      "options": [
        "Elle modifie la base",
        "Son résultat ne dépend que des arguments",
        "Elle est privée",
        "Elle est lente"
      ],
      "answer": 1,
      "explanation": "PostgreSQL peut l’optimiser.",
      "id": "pgs-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "vue",
      "definition": "Requête enregistrée qui se lit comme une table."
    },
    {
      "term": "fonction",
      "definition": "Calcul ou requête enregistré dans la base, avec des paramètres."
    },
    {
      "term": "RPC",
      "definition": "Appel d’une fonction de la base depuis l’application."
    },
    {
      "term": "immutable",
      "definition": "Fonction dont le résultat ne dépend que de ses arguments."
    }
  ],
  "recap_fr": [
    "Créer des vues pour donner un nom à une requête souvent utilisée.",
    "Écrire des fonctions SQL réutilisables, appelables depuis l’API de Supabase.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "vue",
    "fonction",
    "RPC",
    "immutable"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "PostgreSQL réel (PGlite, WebAssembly) dans un Worker du navigateur, sans serveur ni connexion après téléchargement. Les rôles anon, authenticated et service_role et la fonction auth.uid() reproduisent le fonctionnement de Supabase. Données fictives d’une boutique ; chaque exemple, essai et test reconstruit sa base initiale.",
  "references": [
    {
      "title": "PostgreSQL — CREATE VIEW",
      "url": "https://www.postgresql.org/docs/18/sql-createview.html"
    },
    {
      "title": "PostgreSQL — CREATE FUNCTION",
      "url": "https://www.postgresql.org/docs/18/sql-createfunction.html"
    },
    {
      "title": "Supabase — fonctions de base de données",
      "url": "https://supabase.com/docs/guides/database/functions"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — CREATE VIEW",
      "url": "https://www.postgresql.org/docs/18/sql-createview.html",
      "scope": "Vues nommées. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "PostgreSQL — CREATE FUNCTION",
      "url": "https://www.postgresql.org/docs/18/sql-createfunction.html",
      "scope": "Fonctions SQL et PL/pgSQL, volatilité. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — fonctions de base de données",
      "url": "https://supabase.com/docs/guides/database/functions",
      "scope": "Fonctions appelables depuis l’API. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Certaines requêtes reviennent sans cesse : la liste des produits disponibles, le total d’une commande, le prix TTC. Les recopier dans chaque application multiplie les risques d’écart. PostgreSQL permet de les enregistrer dans la base.

Une vue, create view nom as select …, donne un nom à une requête. On l’interroge ensuite comme une table : select * from produits_disponibles. La vue ne stocke rien : à chaque lecture, PostgreSQL exécute la requête sur les données du moment. Si un produit tombe en rupture, il disparaît aussitôt de la vue. Dans Supabase, une vue apparaît dans l’API comme une table : l’application peut la lire sans connaître la requête qui se trouve derrière.

Une fonction enregistre un calcul ou une requête paramétrée. create function prix_ttc(prix integer) returns integer language sql as $$ … $$ déclare son nom, ses paramètres, le type du résultat et son corps entre doubles dollars. On l’appelle comme une fonction intégrée : select prix_ttc(1000). Une fonction peut aussi renvoyer plusieurs lignes, avec returns table (…) : elle devient alors une sorte de vue paramétrée, par exemple les commandes d’un client donné.

Le mot immutable indique que le résultat ne dépend que des arguments, ce qui permet à PostgreSQL de l’optimiser. stable signale qu’elle lit la base sans la modifier. volatile, la valeur par défaut, convient aux fonctions qui modifient des données.

Dans Supabase, ces fonctions s’appellent depuis l’application par une requête RPC, pour remote procedure call : supabase.rpc('prix_ttc', { prix: 1000 }). C’est la façon recommandée de placer une logique métier dans la base, et le module 4 y reviendra pour la sécurité.

Attention aux divisions : entre deux entiers, PostgreSQL fait une division entière. Pour une moyenne, utilise avg, ou convertis une des valeurs en numeric. Et choisis le type de retour avec soin : une fonction déclarée returns integer arrondit ou refuse un résultat décimal, selon le cas.

Pour modifier une vue ou une fonction, on utilise create or replace. Comme les tables, vues et fonctions s’écrivent dans des fichiers de migration versionnés, pour que la base de test, celle de production et celle d’un nouveau développeur soient identiques.

## Exemple guidé 1

```sql
create view produits_disponibles as
select id, nom, prix from produits where stock > 0;
select * from produits_disponibles order by prix;
```

Résultat attendu : 3 lignes (id, nom, prix) : 4 | Savon noir | 350 ; 1 | Riz parfumé | 600 ; 2 | Huile de palme | 1500

Trace :

- La vue enregistre la requête.
- On la lit comme une table.
- Le gari, en rupture, n’y figure pas.

## Exemple guidé 2

```sql
create function prix_ttc(prix integer) returns integer
language sql immutable
as $$ select round(prix * 1.18)::integer $$;
select nom, prix_ttc(prix) as ttc from produits order by id;
```

Résultat attendu : 4 lignes (nom, ttc) : Riz parfumé | 708 ; Huile de palme | 1770 ; Gari | 472 ; Savon noir | 413

Trace :

- La fonction calcule le prix TTC.
- Elle s’utilise comme une fonction intégrée.
- Toutes les applications partagent le même calcul.

## Vérifier et expliquer

Choisis trois requêtes de l’application Nunya que tu imaginerais en vues ou en fonctions, et justifie chaque choix.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — CREATE VIEW](https://www.postgresql.org/docs/18/sql-createview.html)
- [PostgreSQL — CREATE FUNCTION](https://www.postgresql.org/docs/18/sql-createfunction.html)
- [Supabase — fonctions de base de données](https://supabase.com/docs/guides/database/functions)
