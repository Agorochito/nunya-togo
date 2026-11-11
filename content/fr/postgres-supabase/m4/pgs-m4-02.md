---
{
  "id": "pgs-m4-02",
  "title_fr": "Des fonctions sécurisées pour les actions sensibles",
  "course": "postgres-supabase",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "pgs-m4-01"
  ],
  "outcomes": [
    "Écrire une fonction SECURITY DEFINER qui réalise une action que les politiques interdisent en direct.",
    "Protéger une telle fonction : vérifier l’identité, valider les paramètres, fixer search_path."
  ],
  "idea_fr": "Certaines actions touchent des données que la personne ne peut pas modifier elle-même ; une fonction de confiance les réalise pour elle, après avoir tout vérifié.",
  "analogy_fr": "Un client ne peut pas entrer dans la réserve pour prendre un sac de riz. Il le demande au comptoir : le vendeur vérifie, prend le sac, met à jour le registre et établit le reçu.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "create function mes_commandes_count() returns integer\nlanguage sql stable\nas $$ select count(*)::int from commandes where client_id = auth.uid() $$;\n\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);\nselect mes_commandes_count() as total;\nreset role;",
      "expected_output": "1 ligne (total) : 2",
      "trace_fr": [
        "Une fonction invoker ordinaire : elle utilise les droits de l’appelant.",
        "auth.uid() y donne l’identité d’Afi.",
        "Elle compte ses commandes."
      ],
      "expected_result": {
        "columns": [
          "total"
        ],
        "values": [
          [
            2
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "alter table produits enable row level security;\ncreate policy catalogue_public on produits for select to anon, authenticated using (true);\nalter table commandes enable row level security;\ncreate policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());\ncreate function passer_commande(p_produit bigint, p_quantite integer) returns bigint\nlanguage plpgsql\nsecurity definer\nset search_path = public\nas $$\ndeclare\n  nouvel_id bigint;\nbegin\n  if auth.uid() is null then\n    raise exception 'connexion requise';\n  end if;\n  if p_quantite < 1 or (select stock from produits where id = p_produit) < p_quantite then\n    raise exception 'stock insuffisant';\n  end if;\n  update produits set stock = stock - p_quantite where id = p_produit;\n  insert into commandes (client_id, produit_id, quantite) values (auth.uid(), p_produit, p_quantite)\n  returning id into nouvel_id;\n  return nouvel_id;\nend;\n$$;\n\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);\nselect passer_commande(1, 2) as commande;\nreset role;\nselect stock from produits where id = 1;",
      "expected_output": "1 ligne (stock) : 38",
      "trace_fr": [
        "Afi ne peut pas modifier les produits directement.",
        "La fonction security definer le fait pour elle, après vérification.",
        "Le stock du riz passe de 40 à 38."
      ],
      "expected_result": {
        "columns": [
          "stock"
        ],
        "values": [
          [
            38
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de vérifier auth.uid()",
      "why_fr": "Un visiteur anonyme agit sans compte.",
      "fix_fr": "Refuse si auth.uid() est null."
    },
    {
      "error": "Prendre l’identifiant du client en paramètre",
      "why_fr": "On commande au nom d’autrui.",
      "fix_fr": "Utilise auth.uid() dans la fonction."
    },
    {
      "error": "Omettre set search_path",
      "why_fr": "Un objet piégé peut se substituer à une table.",
      "fix_fr": "set search_path = public."
    }
  ],
  "quiz": [
    {
      "question": "Avec quels droits s’exécute une fonction security definer ?",
      "options": [
        "Ceux de l’appelant",
        "Ceux de son propriétaire",
        "Aucun",
        "Ceux du rôle anon"
      ],
      "answer": 1,
      "explanation": "D’où les précautions.",
      "id": "pgs-m4-02-q1"
    },
    {
      "question": "Que doit vérifier en premier une telle fonction ?",
      "options": [
        "Le prix",
        "L’identité de l’appelant avec auth.uid()",
        "La date",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Refuser les anonymes.",
      "id": "pgs-m4-02-q2"
    },
    {
      "question": "Comment l’application appelle-t-elle passer_commande ?",
      "options": [
        "supabase.from()",
        "supabase.rpc()",
        "Par e-mail",
        "Impossible"
      ],
      "answer": 1,
      "explanation": "Remote procedure call.",
      "id": "pgs-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "security definer",
      "definition": "Fonction exécutée avec les droits de son propriétaire."
    },
    {
      "term": "security invoker",
      "definition": "Fonction exécutée avec les droits de l’appelant."
    },
    {
      "term": "search_path",
      "definition": "Liste des schémas où PostgreSQL cherche les objets."
    },
    {
      "term": "RPC",
      "definition": "Appel d’une fonction de la base depuis l’application."
    }
  ],
  "recap_fr": [
    "Écrire une fonction SECURITY DEFINER qui réalise une action que les politiques interdisent en direct.",
    "Protéger une telle fonction : vérifier l’identité, valider les paramètres, fixer search_path.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "security definer",
    "security invoker",
    "search_path",
    "RPC"
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
      "title": "PostgreSQL — CREATE FUNCTION",
      "url": "https://www.postgresql.org/docs/18/sql-createfunction.html"
    },
    {
      "title": "Supabase — fonctions de base de données",
      "url": "https://supabase.com/docs/guides/database/functions"
    },
    {
      "title": "Supabase — Row Level Security",
      "url": "https://supabase.com/docs/guides/database/postgres/row-level-security"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — CREATE FUNCTION",
      "url": "https://www.postgresql.org/docs/18/sql-createfunction.html",
      "scope": "SECURITY DEFINER et search_path. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — fonctions de base de données",
      "url": "https://supabase.com/docs/guides/database/functions",
      "scope": "Fonctions appelées par RPC, security definer. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
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

Passer une commande touche deux tables : il faut baisser le stock du produit et créer la commande. Or un client ne doit surtout pas pouvoir modifier les stocks directement : avec un accès en écriture à produits, il pourrait se donner un stock infini ou changer les prix. Les politiques interdisent donc la modification des produits aux clients. Comment passer commande, alors ?

La réponse est une fonction de la base déclarée security definer. Une telle fonction s’exécute avec les droits de son propriétaire, et non avec ceux de la personne qui l’appelle. Elle peut donc baisser le stock, ce que le client ne peut pas faire, mais seulement de la façon prévue par son code. Le client l’appelle par RPC : supabase.rpc('passer_commande', { p_produit: 1, p_quantite: 2 }). Toutes les instructions de la fonction forment une seule transaction : stock et commande changent ensemble ou pas du tout.

Ce pouvoir exige des précautions, car la fonction contourne les politiques. Première règle : vérifier l’identité. auth.uid() reste disponible dans la fonction ; s’il est null, l’appel vient d’un visiteur non connecté, et la fonction doit refuser. Deuxième règle : valider chaque paramètre, comme une quantité positive et un stock suffisant, avec des messages clairs levés par raise exception. Troisième règle : n’utiliser que l’identité vérifiée, jamais un identifiant de client fourni en paramètre, sinon n’importe qui commanderait au nom d’autrui. Quatrième règle : fixer set search_path = public, pour qu’un objet malveillant créé dans un autre schéma ne puisse pas se substituer à une table.

Une fonction security invoker, le comportement par défaut, s’exécute au contraire avec les droits de l’appelant : les politiques s’appliquent normalement. Elle convient aux calculs et aux lectures qui ne doivent rien contourner.

Supabase recommande de garder ces fonctions courtes, de les regrouper dans un schéma clairement identifié quand elles sont nombreuses, et de retirer le droit d’exécution aux rôles qui n’en ont pas besoin, avec revoke execute on function … from anon.

Les messages levés par raise exception remontent jusqu’à l’application, qui peut les afficher : « stock insuffisant », « connexion requise ». C’est la base qui garde la règle ; l’application se contente d’informer.

## Exemple guidé 1

```sql
create function mes_commandes_count() returns integer
language sql stable
as $$ select count(*)::int from commandes where client_id = auth.uid() $$;

set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
select mes_commandes_count() as total;
reset role;
```

Résultat attendu : 1 ligne (total) : 2

Trace :

- Une fonction invoker ordinaire : elle utilise les droits de l’appelant.
- auth.uid() y donne l’identité d’Afi.
- Elle compte ses commandes.

## Exemple guidé 2

```sql
alter table produits enable row level security;
create policy catalogue_public on produits for select to anon, authenticated using (true);
alter table commandes enable row level security;
create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());
create function passer_commande(p_produit bigint, p_quantite integer) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  nouvel_id bigint;
begin
  if auth.uid() is null then
    raise exception 'connexion requise';
  end if;
  if p_quantite < 1 or (select stock from produits where id = p_produit) < p_quantite then
    raise exception 'stock insuffisant';
  end if;
  update produits set stock = stock - p_quantite where id = p_produit;
  insert into commandes (client_id, produit_id, quantite) values (auth.uid(), p_produit, p_quantite)
  returning id into nouvel_id;
  return nouvel_id;
end;
$$;

set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
select passer_commande(1, 2) as commande;
reset role;
select stock from produits where id = 1;
```

Résultat attendu : 1 ligne (stock) : 38

Trace :

- Afi ne peut pas modifier les produits directement.
- La fonction security definer le fait pour elle, après vérification.
- Le stock du riz passe de 40 à 38.

## Vérifier et expliquer

Liste les vérifications que ferait une fonction de réservation de place pour un atelier, dans l’ordre.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — CREATE FUNCTION](https://www.postgresql.org/docs/18/sql-createfunction.html)
- [Supabase — fonctions de base de données](https://supabase.com/docs/guides/database/functions)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
