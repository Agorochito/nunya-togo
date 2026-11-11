---
{
  "id": "pgs-m3-01",
  "title_fr": "Rôles et privilèges : qui peut faire quoi",
  "course": "postgres-supabase",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "pgs-m2-03"
  ],
  "outcomes": [
    "Comprendre les rôles de Supabase : anon, authenticated et service_role.",
    "Accorder et retirer des privilèges avec GRANT et REVOKE."
  ],
  "idea_fr": "Dans Supabase, chaque requête de l’application arrive avec un rôle PostgreSQL ; les privilèges de ce rôle décident de ce qu’il peut lire et écrire.",
  "analogy_fr": "Dans une école, l’élève, l’enseignant et le directeur n’ont pas les mêmes clés. Le badge décide des portes qui s’ouvrent, pas la bonne volonté de la personne.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "set role anon;\nselect count(*)::int as commandes_visibles from commandes;\nreset role;",
      "expected_output": "1 ligne (commandes_visibles) : 3",
      "trace_fr": [
        "Le visiteur anonyme prend le rôle anon.",
        "Sans protection, il voit toutes les commandes de tous les clients.",
        "C’est le comportement par défaut d’une nouvelle table."
      ],
      "expected_result": {
        "columns": [
          "commandes_visibles"
        ],
        "values": [
          [
            3
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "revoke all on commandes from anon;\nset role anon;\nselect has_table_privilege('commandes', 'select') as peut_lire;\nreset role;",
      "expected_output": "1 ligne (peut_lire) : false",
      "trace_fr": [
        "revoke retire tous les privilèges du rôle anon sur commandes.",
        "has_table_privilege vérifie le droit du rôle courant.",
        "Le visiteur ne peut plus lire la table."
      ],
      "expected_result": {
        "columns": [
          "peut_lire"
        ],
        "values": [
          [
            false
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer une table sans rien protéger",
      "why_fr": "Avec la clé publique, n’importe qui la lit et la modifie.",
      "fix_fr": "Retire les privilèges inutiles et active la sécurité par ligne."
    },
    {
      "error": "Mettre la clé service_role dans le site",
      "why_fr": "Elle contourne toutes les protections.",
      "fix_fr": "Garde-la sur un serveur, dans un secret."
    },
    {
      "error": "Retirer select pour bloquer une écriture",
      "why_fr": "La lecture, utile, devient impossible.",
      "fix_fr": "Retire précisément insert, update ou delete."
    }
  ],
  "quiz": [
    {
      "question": "Quel rôle utilise un visiteur non connecté ?",
      "options": [
        "authenticated",
        "anon",
        "service_role",
        "postgres"
      ],
      "answer": 1,
      "explanation": "La clé publique correspond au rôle anon.",
      "id": "pgs-m3-01-q1"
    },
    {
      "question": "Que renvoie auth.uid() ?",
      "options": [
        "Le nom de la table",
        "L’identifiant de la personne connectée",
        "La clé publique",
        "Le rôle"
      ],
      "answer": 1,
      "explanation": "Il vient du jeton signé de la requête.",
      "id": "pgs-m3-01-q2"
    },
    {
      "question": "Où doit rester la clé service_role ?",
      "options": [
        "Dans le code du site",
        "Sur un serveur, dans un secret",
        "Dans un dépôt public",
        "Dans un cookie"
      ],
      "answer": 1,
      "explanation": "Elle contourne toute la sécurité par ligne.",
      "id": "pgs-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "rôle",
      "definition": "Identité PostgreSQL avec laquelle une requête s’exécute."
    },
    {
      "term": "privilège",
      "definition": "Droit d’effectuer une opération sur une table."
    },
    {
      "term": "anon",
      "definition": "Rôle des visiteurs non connectés dans Supabase."
    },
    {
      "term": "service_role",
      "definition": "Rôle de serveur qui contourne la sécurité par ligne."
    }
  ],
  "recap_fr": [
    "Comprendre les rôles de Supabase : anon, authenticated et service_role.",
    "Accorder et retirer des privilèges avec GRANT et REVOKE.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "rôle",
    "privilège",
    "anon",
    "service_role"
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
      "title": "PostgreSQL — privilèges",
      "url": "https://www.postgresql.org/docs/18/ddl-priv.html"
    },
    {
      "title": "Supabase — rôles PostgreSQL",
      "url": "https://supabase.com/docs/guides/database/postgres/roles"
    },
    {
      "title": "Supabase — clés d’API",
      "url": "https://supabase.com/docs/guides/api/api-keys"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — privilèges",
      "url": "https://www.postgresql.org/docs/18/ddl-priv.html",
      "scope": "GRANT, REVOKE et privilèges par défaut. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — rôles PostgreSQL",
      "url": "https://supabase.com/docs/guides/database/postgres/roles",
      "scope": "anon, authenticated et service_role. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — clés d’API",
      "url": "https://supabase.com/docs/guides/api/api-keys",
      "scope": "Clé publique et clé de service. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Quand une application web utilise Supabase, le navigateur de chaque visiteur parle directement à la base, à travers l’API que Supabase génère. Cela paraît dangereux, et ce serait le cas sans les mécanismes de sécurité de PostgreSQL. Tout repose sur une idée simple : chaque requête est exécutée avec un rôle PostgreSQL, et ce rôle n’a que les droits qu’on lui a donnés.

Supabase utilise trois rôles principaux. anon correspond à un visiteur non connecté : l’application l’utilise avec la clé publique du projet, visible par tous dans le code du site. authenticated correspond à une personne connectée : sa requête porte un jeton signé qui contient son identifiant, que la fonction auth.uid() renvoie dans la base. service_role est le rôle des serveurs de confiance : il contourne toutes les protections par ligne, et sa clé ne doit jamais apparaître dans le navigateur, ni dans un dépôt Git.

Les privilèges disent quelles opérations un rôle peut effectuer sur une table : select, insert, update, delete. On les accorde avec grant select on produits to anon et on les retire avec revoke delete on produits from anon. Une opération interdite échoue avec le message permission denied for table.

Attention à un point essentiel : par défaut, Supabase accorde tous les privilèges sur les nouvelles tables du schéma public aux rôles de l’API. Une table créée sans autre précaution est donc lisible et modifiable par n’importe quel visiteur, avec la clé publique. Cet atelier reproduit ce comportement, pour que tu le constates toi-même : le rôle anon y lit toutes les commandes.

Il existe deux défenses complémentaires. Les privilèges agissent table par table : ils conviennent pour fermer complètement une table à un rôle, ou pour interdire un type d’opération, comme toute suppression par les visiteurs. La sécurité par ligne, vue dans la leçon suivante, décide quelles lignes chaque personne voit : ses propres commandes, et pas celles des autres. Les projets Supabase sérieux activent la sécurité par ligne sur toutes les tables exposées, et utilisent les privilèges en complément.

Pour vérifier un privilège, on peut aussi interroger la base : has_table_privilege('commandes', 'select') indique si le rôle courant peut lire la table. Dans les exercices, l’atelier essaie lui-même des opérations sous différents rôles et vérifie qu’elles sont acceptées ou refusées comme demandé.

## Exemple guidé 1

```sql
set role anon;
select count(*)::int as commandes_visibles from commandes;
reset role;
```

Résultat attendu : 1 ligne (commandes_visibles) : 3

Trace :

- Le visiteur anonyme prend le rôle anon.
- Sans protection, il voit toutes les commandes de tous les clients.
- C’est le comportement par défaut d’une nouvelle table.

## Exemple guidé 2

```sql
revoke all on commandes from anon;
set role anon;
select has_table_privilege('commandes', 'select') as peut_lire;
reset role;
```

Résultat attendu : 1 ligne (peut_lire) : false

Trace :

- revoke retire tous les privilèges du rôle anon sur commandes.
- has_table_privilege vérifie le droit du rôle courant.
- Le visiteur ne peut plus lire la table.

## Vérifier et expliquer

Pour une application de bibliothèque scolaire, écris ce que chaque rôle doit pouvoir faire sur chaque table.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — privilèges](https://www.postgresql.org/docs/18/ddl-priv.html)
- [Supabase — rôles PostgreSQL](https://supabase.com/docs/guides/database/postgres/roles)
- [Supabase — clés d’API](https://supabase.com/docs/guides/api/api-keys)
