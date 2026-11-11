---
{
  "id": "pgs-m3-02",
  "title_fr": "La sécurité par ligne (RLS)",
  "course": "postgres-supabase",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "pgs-m3-01"
  ],
  "outcomes": [
    "Activer la sécurité par ligne et comprendre qu’elle refuse tout par défaut.",
    "Écrire une politique de lecture qui limite chaque personne à ses propres lignes avec auth.uid()."
  ],
  "idea_fr": "La sécurité par ligne ajoute, à chaque requête, une condition invisible : chacun ne voit que les lignes que les politiques lui accordent.",
  "analogy_fr": "Dans une banque, tous les clients utilisent le même guichet automatique, mais chacun ne voit que son propre compte, quelle que soit sa demande.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "alter table commandes enable row level security;\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);\nselect count(*)::int as commandes_vues from commandes;\nreset role;",
      "expected_output": "1 ligne (commandes_vues) : 0",
      "trace_fr": [
        "La RLS est activée, mais aucune politique n’existe encore.",
        "Afi, connectée, ne voit aucune commande.",
        "Refus par défaut : un oubli ferme l’accès."
      ],
      "expected_result": {
        "columns": [
          "commandes_vues"
        ],
        "values": [
          [
            0
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "alter table commandes enable row level security;\ncreate policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);\nselect id, statut from commandes order by id;\nreset role;",
      "expected_output": "2 lignes (id, statut) : 1 | payee ; 3 | livree",
      "trace_fr": [
        "La politique accorde à chacun ses propres commandes.",
        "Afi voit ses deux commandes.",
        "La commande de Yao reste invisible pour elle."
      ],
      "expected_result": {
        "columns": [
          "id",
          "statut"
        ],
        "values": [
          [
            1,
            "payee"
          ],
          [
            3,
            "livree"
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Activer la RLS sans politique",
      "why_fr": "Plus personne ne voit rien, sauf le service.",
      "fix_fr": "Ajoute les politiques nécessaires."
    },
    {
      "error": "Politique to anon au lieu de to authenticated",
      "why_fr": "Les personnes connectées ne sont pas concernées.",
      "fix_fr": "Vise le bon rôle."
    },
    {
      "error": "Oublier d’activer la RLS",
      "why_fr": "Les politiques existent mais ne servent à rien.",
      "fix_fr": "alter table … enable row level security."
    }
  ],
  "quiz": [
    {
      "question": "Avec la RLS activée et aucune politique, que voit un client connecté ?",
      "options": [
        "Tout",
        "Rien",
        "Ses lignes",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Refus par défaut.",
      "id": "pgs-m3-02-q1"
    },
    {
      "question": "Que fait using (client_id = auth.uid()) ?",
      "options": [
        "Supprime des lignes",
        "Limite la lecture aux lignes de la personne connectée",
        "Crée un index",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Une condition ajoutée à chaque requête.",
      "id": "pgs-m3-02-q2"
    },
    {
      "question": "Quel rôle contourne la RLS dans Supabase ?",
      "options": [
        "anon",
        "authenticated",
        "service_role",
        "Aucun"
      ],
      "answer": 2,
      "explanation": "D’où le secret absolu de sa clé.",
      "id": "pgs-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "RLS",
      "definition": "Sécurité par ligne : politiques qui filtrent les lignes visibles et modifiables."
    },
    {
      "term": "politique",
      "definition": "Règle qui accorde un accès sous condition."
    },
    {
      "term": "using",
      "definition": "Condition qui décide quelles lignes existantes sont accessibles."
    },
    {
      "term": "refus par défaut",
      "definition": "Principe : tout est interdit tant qu’une politique ne l’autorise pas."
    }
  ],
  "recap_fr": [
    "Activer la sécurité par ligne et comprendre qu’elle refuse tout par défaut.",
    "Écrire une politique de lecture qui limite chaque personne à ses propres lignes avec auth.uid().",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "RLS",
    "politique",
    "using",
    "refus par défaut"
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
      "title": "PostgreSQL — sécurité par ligne",
      "url": "https://www.postgresql.org/docs/18/ddl-rowsecurity.html"
    },
    {
      "title": "PostgreSQL — CREATE POLICY",
      "url": "https://www.postgresql.org/docs/18/sql-createpolicy.html"
    },
    {
      "title": "Supabase — Row Level Security",
      "url": "https://supabase.com/docs/guides/database/postgres/row-level-security"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — sécurité par ligne",
      "url": "https://www.postgresql.org/docs/18/ddl-rowsecurity.html",
      "scope": "Activation et fonctionnement des politiques. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "PostgreSQL — CREATE POLICY",
      "url": "https://www.postgresql.org/docs/18/sql-createpolicy.html",
      "scope": "USING, WITH CHECK, rôles et commandes. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — Row Level Security",
      "url": "https://supabase.com/docs/guides/database/postgres/row-level-security",
      "scope": "Politiques avec auth.uid() et rôles de l’API. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Les privilèges agissent sur des tables entières. Mais une boutique a besoin d’une règle plus fine : chaque client doit voir ses propres commandes, et seulement les siennes, dans la même table. C’est le rôle de la sécurité par ligne, Row Level Security en anglais, souvent abrégée RLS. C’est la protection centrale de Supabase.

On l’active table par table : alter table commandes enable row level security. À partir de ce moment, pour les rôles de l’API, une table protégée n’affiche plus aucune ligne et refuse toute écriture, tant qu’aucune politique ne les autorise. Ce refus par défaut est précieux : un oubli ferme l’accès au lieu de l’ouvrir. Le rôle service_role, lui, contourne la RLS, comme le propriétaire de la base.

Une politique accorde un accès sous condition : create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid()). Elle se lit ainsi : pour la lecture, les personnes connectées voient les lignes dont le client est elles-mêmes. La condition après using est ajoutée par PostgreSQL à chaque requête : si Afi demande select * from commandes, elle obtient seulement ses commandes, sans erreur ni message. Pour les autres lignes, tout se passe comme si elles n’existaient pas.

La clause to précise les rôles concernés. Une politique to authenticated ne s’applique pas aux visiteurs anonymes, qui continuent de ne rien voir. Une politique peut viser plusieurs rôles, to anon, authenticated, et sa condition peut être simplement true pour une lecture publique, comme un catalogue de produits.

Plusieurs politiques sur la même opération s’additionnent : une ligne est visible si au moins une politique l’accorde. Il vaut donc mieux des politiques simples et lisibles, chacune avec un nom qui dit ce qu’elle permet.

Deux conseils de Supabase. Indexe les colonnes utilisées dans les conditions, comme client_id, car la condition s’ajoute à chaque requête. Et écris (select auth.uid()) plutôt que auth.uid() dans les grandes tables : PostgreSQL calcule alors la valeur une seule fois par requête au lieu d’une fois par ligne.

Pour vérifier une politique, il faut l’essayer avec plusieurs identités : la personne concernée, une autre personne, un visiteur anonyme. C’est exactement ce que font les vérifications de l’atelier, avec Afi, Yao et un visiteur.

## Exemple guidé 1

```sql
alter table commandes enable row level security;
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
select count(*)::int as commandes_vues from commandes;
reset role;
```

Résultat attendu : 1 ligne (commandes_vues) : 0

Trace :

- La RLS est activée, mais aucune politique n’existe encore.
- Afi, connectée, ne voit aucune commande.
- Refus par défaut : un oubli ferme l’accès.

## Exemple guidé 2

```sql
alter table commandes enable row level security;
create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
select id, statut from commandes order by id;
reset role;
```

Résultat attendu : 2 lignes (id, statut) : 1 | payee ; 3 | livree

Trace :

- La politique accorde à chacun ses propres commandes.
- Afi voit ses deux commandes.
- La commande de Yao reste invisible pour elle.

## Vérifier et expliquer

Pour une table de notes scolaires, écris en français les politiques de lecture des élèves, des parents et des enseignants.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — sécurité par ligne](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)
- [PostgreSQL — CREATE POLICY](https://www.postgresql.org/docs/18/sql-createpolicy.html)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
