---
{
  "id": "pgs-m1-02",
  "title_fr": "Des tables solides",
  "course": "postgres-supabase",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "pgs-m1-01"
  ],
  "outcomes": [
    "Créer des tables avec identifiants automatiques, valeurs par défaut et contraintes.",
    "Laisser la base refuser les données invalides plutôt que de compter sur l’application."
  ],
  "idea_fr": "Une contrainte dans la base protège les données quelle que soit l’application qui écrit : site, application mobile ou script oublié.",
  "analogy_fr": "Une serrure sur la porte du magasin protège mieux qu’une affiche « merci de ne pas entrer » : elle marche même si personne ne la lit.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "create table avis (\n  id bigint generated always as identity primary key,\n  produit_id bigint not null references produits (id) on delete cascade,\n  note integer not null check (note between 1 and 5),\n  commentaire text\n);\ninsert into avis (produit_id, note, commentaire) values (1, 5, 'Très bon riz'), (4, 4, null);\nselect id, produit_id, note from avis order by id;",
      "expected_output": "2 lignes (id, produit_id, note) : 1 | 1 | 5 ; 2 | 4 | 4",
      "trace_fr": [
        "La base attribue les id 1 et 2.",
        "La note est contrôlée entre 1 et 5.",
        "Chaque avis vise un produit existant."
      ],
      "expected_result": {
        "columns": [
          "id",
          "produit_id",
          "note"
        ],
        "values": [
          [
            1,
            1,
            5
          ],
          [
            2,
            4,
            4
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "create table categories (\n  id bigint generated always as identity primary key,\n  nom text not null unique\n);\ninsert into categories (nom) values ('épicerie'), ('hygiène');\nselect * from categories order by id;",
      "expected_output": "2 lignes (id, nom) : 1 | épicerie ; 2 | hygiène",
      "trace_fr": [
        "nom est obligatoire et unique.",
        "Insérer « épicerie » une seconde fois serait refusé.",
        "Les identifiants sont automatiques."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom"
        ],
        "values": [
          [
            1,
            "épicerie"
          ],
          [
            2,
            "hygiène"
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Valider seulement dans l’application",
      "why_fr": "Un autre programme écrit des données invalides.",
      "fix_fr": "Ajoute des contraintes dans la base."
    },
    {
      "error": "Utiliser integer pour des identifiants",
      "why_fr": "Limite d’environ deux milliards.",
      "fix_fr": "Utilise bigint generated always as identity."
    },
    {
      "error": "Oublier on delete",
      "why_fr": "Supprimer un produit est refusé ou laisse des orphelins.",
      "fix_fr": "Choisis cascade, restrict ou set null."
    }
  ],
  "quiz": [
    {
      "question": "Que garantit references produits (id) ?",
      "options": [
        "Que le prix est positif",
        "Que le produit référencé existe",
        "Que l’id est unique",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Une clé étrangère.",
      "id": "pgs-m1-02-q1"
    },
    {
      "question": "Que fait on delete cascade ?",
      "options": [
        "Refuse la suppression",
        "Supprime aussi les lignes liées",
        "Met le lien à null",
        "Rien"
      ],
      "answer": 1,
      "explanation": "La suppression se propage.",
      "id": "pgs-m1-02-q2"
    },
    {
      "question": "Quel message signale un doublon ?",
      "options": [
        "violates check constraint",
        "duplicate key value violates unique constraint",
        "permission denied",
        "syntax error"
      ],
      "answer": 1,
      "explanation": "Contrainte UNIQUE.",
      "id": "pgs-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrainte",
      "definition": "Règle vérifiée par la base à chaque écriture."
    },
    {
      "term": "identity",
      "definition": "Colonne dont la base génère les valeurs."
    },
    {
      "term": "clé étrangère",
      "definition": "Colonne qui doit correspondre à une ligne d’une autre table."
    },
    {
      "term": "migration",
      "definition": "Fichier SQL versionné qui fait évoluer la structure de la base."
    }
  ],
  "recap_fr": [
    "Créer des tables avec identifiants automatiques, valeurs par défaut et contraintes.",
    "Laisser la base refuser les données invalides plutôt que de compter sur l’application.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "contrainte",
    "identity",
    "clé étrangère",
    "migration"
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
      "title": "PostgreSQL — contraintes",
      "url": "https://www.postgresql.org/docs/18/ddl-constraints.html"
    },
    {
      "title": "PostgreSQL — types de données",
      "url": "https://www.postgresql.org/docs/18/datatype.html"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — contraintes",
      "url": "https://www.postgresql.org/docs/18/ddl-constraints.html",
      "scope": "NOT NULL, CHECK, UNIQUE, clés primaires et étrangères. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "PostgreSQL — types de données",
      "url": "https://www.postgresql.org/docs/18/datatype.html",
      "scope": "Types numériques, texte, booléens, dates, uuid et jsonb. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Dans une application, plusieurs programmes écrivent dans la même base : le site, l’application mobile, un script d’import, un collègue qui corrige une donnée à la main. Si les règles ne vivent que dans le code d’un seul de ces programmes, les autres peuvent les contourner. La bonne pratique consiste à placer les règles essentielles dans la base elle-même, sous forme de contraintes : elle refusera toute donnée invalide, d’où qu’elle vienne.

PostgreSQL propose un identifiant automatique standard : id bigint generated always as identity primary key. La base attribue 1, 2, 3… et interdit d’imposer une autre valeur ; generated by default permettrait de la fournir, par exemple lors d’un import. bigint évite d’atteindre la limite d’integer, environ deux milliards. Pour les profils d’utilisateurs, Supabase utilise plutôt des uuid, que la fonction gen_random_uuid() sait produire.

Les contraintes de colonne se combinent. not null interdit l’absence de valeur. default fournit une valeur quand on n’en donne pas, par exemple default 0 pour un stock ou default now() pour une date de création. check impose une condition : check (note between 1 and 5), check (prix > 0). unique interdit les doublons, comme deux catégories de même nom.

Les clés étrangères relient les tables : produit_id bigint references produits (id) garantit que chaque avis porte sur un produit qui existe. L’option on delete précise ce qui se passe quand le produit est supprimé : cascade supprime aussi ses avis, restrict, le comportement par défaut, refuse la suppression tant que des avis existent, set null efface seulement le lien.

Quand une contrainte est violée, PostgreSQL refuse toute l’instruction et explique pourquoi, en anglais : violates check constraint, violates foreign key constraint, duplicate key value violates unique constraint, null value in column violates not-null constraint. Ces messages sont précis ; apprends à les lire.

Une table existante se modifie avec alter table : add column, add constraint, alter column … set not null. Dans Supabase, l’éditeur de tables génère ce SQL pour toi, mais les équipes sérieuses l’écrivent dans des fichiers de migration, versionnés avec Git, pour pouvoir reconstruire la base à l’identique. Le dossier supabase/migrations de Nunya en est un exemple réel.

Dans les exercices, l’atelier compare la structure de tes tables avec l’objectif, puis essaie des insertions interdites pour vérifier que tes contraintes les refusent vraiment.

## Exemple guidé 1

```sql
create table avis (
  id bigint generated always as identity primary key,
  produit_id bigint not null references produits (id) on delete cascade,
  note integer not null check (note between 1 and 5),
  commentaire text
);
insert into avis (produit_id, note, commentaire) values (1, 5, 'Très bon riz'), (4, 4, null);
select id, produit_id, note from avis order by id;
```

Résultat attendu : 2 lignes (id, produit_id, note) : 1 | 1 | 5 ; 2 | 4 | 4

Trace :

- La base attribue les id 1 et 2.
- La note est contrôlée entre 1 et 5.
- Chaque avis vise un produit existant.

## Exemple guidé 2

```sql
create table categories (
  id bigint generated always as identity primary key,
  nom text not null unique
);
insert into categories (nom) values ('épicerie'), ('hygiène');
select * from categories order by id;
```

Résultat attendu : 2 lignes (id, nom) : 1 | épicerie ; 2 | hygiène

Trace :

- nom est obligatoire et unique.
- Insérer « épicerie » une seconde fois serait refusé.
- Les identifiants sont automatiques.

## Vérifier et expliquer

Liste les contraintes que tu ajouterais à une table d’inscriptions scolaires, et le message que chacune produirait.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — contraintes](https://www.postgresql.org/docs/18/ddl-constraints.html)
- [PostgreSQL — types de données](https://www.postgresql.org/docs/18/datatype.html)
