---
{
  "id": "pgs-m1-01",
  "title_fr": "De SQLite à PostgreSQL",
  "course": "postgres-supabase",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Situer PostgreSQL : un serveur de base de données utilisé par Supabase et par une grande partie du web.",
    "Écrire des requêtes avec les types stricts de PostgreSQL, les conversions :: et la recherche ILIKE."
  ],
  "idea_fr": "PostgreSQL parle le même SQL que SQLite, mais en plus strict et en plus riche : il est fait pour servir des milliers d’utilisateurs en même temps.",
  "analogy_fr": "SQLite est le cahier de caisse d’une boutique ; PostgreSQL est le registre central d’un grand marché, avec des gardiens, des règles d’accès et plusieurs guichets ouverts en même temps.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "select nom, prix, round(prix * 1.18)::integer as prix_ttc\nfrom produits\nwhere stock > 0\norder by prix, id;",
      "expected_output": "3 lignes (nom, prix, prix_ttc) : Savon noir | 350 | 413 ; Riz parfumé | 600 | 708 ; Huile de palme | 1500 | 1770",
      "trace_fr": [
        "Le prix TTC est calculé, arrondi puis converti en entier.",
        "Le gari, en rupture de stock, est exclu.",
        "Les produits sont triés du moins cher au plus cher."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "prix",
          "prix_ttc"
        ],
        "values": [
          [
            "Savon noir",
            350,
            413
          ],
          [
            "Riz parfumé",
            600,
            708
          ],
          [
            "Huile de palme",
            1500,
            1770
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "select nom || ' (' || role || ')' as libelle\nfrom profils\nwhere nom ilike 'a%'\norder by nom;",
      "expected_output": "2 lignes (libelle) : Afi (client) ; Ama (vendeur)",
      "trace_fr": [
        "|| assemble des textes.",
        "ILIKE trouve « Afi » et « Ama », quelle que soit la casse.",
        "Le rôle vient d’une colonne contrôlée par un CHECK."
      ],
      "expected_result": {
        "columns": [
          "libelle"
        ],
        "values": [
          [
            "Afi (client)"
          ],
          [
            "Ama (vendeur)"
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Additionner un nombre et un texte",
      "why_fr": "PostgreSQL refuse : opérateur inexistant.",
      "fix_fr": "Convertis avec ::text et assemble avec ||."
    },
    {
      "error": "Utiliser LIKE pour une recherche sans casse",
      "why_fr": "Les majuscules ne correspondent plus.",
      "fix_fr": "Utilise ILIKE."
    },
    {
      "error": "Nommer une table avec des majuscules entre guillemets",
      "why_fr": "Il faut les guillemets partout ensuite.",
      "fix_fr": "Noms en minuscules, sans guillemets."
    }
  ],
  "quiz": [
    {
      "question": "Quel service est construit sur PostgreSQL ?",
      "options": [
        "Vercel",
        "Supabase",
        "GitHub",
        "Groq"
      ],
      "answer": 1,
      "explanation": "Chaque projet Supabase est une base PostgreSQL.",
      "id": "pgs-m1-01-q1"
    },
    {
      "question": "Que fait prix::text ?",
      "options": [
        "Supprime le prix",
        "Convertit le prix en texte",
        "Compare deux prix",
        "Rien"
      ],
      "answer": 1,
      "explanation": "L’opérateur :: convertit un type.",
      "id": "pgs-m1-01-q2"
    },
    {
      "question": "Quelle comparaison ignore les majuscules ?",
      "options": [
        "LIKE",
        "ILIKE",
        "=",
        "IN"
      ],
      "answer": 1,
      "explanation": "Le I signifie insensible à la casse.",
      "id": "pgs-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "PostgreSQL",
      "definition": "Serveur de base de données relationnelle libre."
    },
    {
      "term": "uuid",
      "definition": "Identifiant universel de 128 bits, écrit en hexadécimal."
    },
    {
      "term": "conversion de type",
      "definition": "Transformation d’une valeur d’un type à un autre avec ::."
    },
    {
      "term": "ILIKE",
      "definition": "Comparaison de motif qui ignore les majuscules."
    }
  ],
  "recap_fr": [
    "Situer PostgreSQL : un serveur de base de données utilisé par Supabase et par une grande partie du web.",
    "Écrire des requêtes avec les types stricts de PostgreSQL, les conversions :: et la recherche ILIKE.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "PostgreSQL",
    "uuid",
    "conversion de type",
    "ILIKE"
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
      "title": "PostgreSQL — types de données",
      "url": "https://www.postgresql.org/docs/18/datatype.html"
    },
    {
      "title": "PostgreSQL — expressions de table",
      "url": "https://www.postgresql.org/docs/18/queries-table-expressions.html"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — types de données",
      "url": "https://www.postgresql.org/docs/18/datatype.html",
      "scope": "Types numériques, texte, booléens, dates, uuid et jsonb. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "PostgreSQL — expressions de table",
      "url": "https://www.postgresql.org/docs/18/queries-table-expressions.html",
      "scope": "Jointures, regroupements et agrégats. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Tu connais déjà SQL grâce aux cours SQL de Nunya, qui utilisent SQLite : une base contenue dans un seul fichier, parfaite pour apprendre ou pour une application installée sur un téléphone. Les applications web ont souvent besoin d’autre chose : un serveur de base de données, auquel des milliers de personnes se connectent en même temps, avec des comptes, des droits et des sauvegardes. PostgreSQL est le plus utilisé des serveurs libres. Il est gratuit, développé depuis plus de trente ans, et c’est lui qui se trouve derrière Supabase : chaque projet Supabase est d’abord une base PostgreSQL.

Dans ce cours, un vrai PostgreSQL tourne dans ton navigateur, sans serveur. Il reproduit les rôles et les fonctions de Supabase pour que tu puisses apprendre la sécurité des données sans risque. La base fictive est celle d’une petite boutique en ligne : profils (clients et vendeurs), produits et commandes. Les identifiants des profils sont des uuid, de longues valeurs comme 11111111-1111-1111-1111-111111111111, comme ceux que Supabase donne aux utilisateurs inscrits.

La première différence visible est la rigueur des types. SQLite accepte presque tout dans n’importe quelle colonne ; PostgreSQL refuse un texte dans une colonne integer et refuse d’additionner un nombre et un texte. Pour assembler un nombre et un texte, on convertit avec l’opérateur :: , par exemple prix::text, puis on concatène avec ||. Cette rigueur évite des erreurs silencieuses.

PostgreSQL offre aussi davantage de types : integer et bigint pour les entiers, numeric pour les montants décimaux exacts, text, boolean avec true et false, date, timestamptz pour un instant précis avec fuseau horaire, uuid, et jsonb pour des données structurées. Choisir le bon type, c’est déjà protéger les données.

Quelques outils pratiques : ILIKE compare un texte sans tenir compte des majuscules, là où LIKE en tient compte ; round arrondit ; la conversion ::integer transforme un résultat décimal en entier. Les requêtes SELECT, WHERE, ORDER BY, GROUP BY et les jointures fonctionnent exactement comme tu les connais.

Les noms de tables et de colonnes s’écrivent en minuscules, sans accents ni espaces : PostgreSQL convertit en minuscules les noms non entourés de guillemets, et les guillemets obligent ensuite à respecter la casse partout, ce qui complique tout. Supabase suit cette convention.

Enfin, l’ordre des résultats n’est jamais garanti sans ORDER BY, comme en SQLite. Les exercices te demandent toujours un ordre précis, avec un critère de départage.

## Exemple guidé 1

```sql
select nom, prix, round(prix * 1.18)::integer as prix_ttc
from produits
where stock > 0
order by prix, id;
```

Résultat attendu : 3 lignes (nom, prix, prix_ttc) : Savon noir | 350 | 413 ; Riz parfumé | 600 | 708 ; Huile de palme | 1500 | 1770

Trace :

- Le prix TTC est calculé, arrondi puis converti en entier.
- Le gari, en rupture de stock, est exclu.
- Les produits sont triés du moins cher au plus cher.

## Exemple guidé 2

```sql
select nom || ' (' || role || ')' as libelle
from profils
where nom ilike 'a%'
order by nom;
```

Résultat attendu : 2 lignes (libelle) : Afi (client) ; Ama (vendeur)

Trace :

- || assemble des textes.
- ILIKE trouve « Afi » et « Ama », quelle que soit la casse.
- Le rôle vient d’une colonne contrôlée par un CHECK.

## Vérifier et expliquer

Compare une requête de ce cours avec la même dans SQLite et note ce que PostgreSQL refuse de plus.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — types de données](https://www.postgresql.org/docs/18/datatype.html)
- [PostgreSQL — expressions de table](https://www.postgresql.org/docs/18/queries-table-expressions.html)
