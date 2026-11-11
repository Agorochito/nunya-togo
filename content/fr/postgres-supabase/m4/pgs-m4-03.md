---
{
  "id": "pgs-m4-03",
  "title_fr": "Projet : une boutique prête pour la production",
  "course": "postgres-supabase",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "pgs-m4-02"
  ],
  "outcomes": [
    "Écrire la migration de sécurité complète d’une application Supabase.",
    "Préparer la mise en ligne : clés, variables d’environnement, migrations et tests des politiques."
  ],
  "idea_fr": "Mettre une application en ligne, c’est surtout s’assurer qu’aucune table n’est ouverte par oubli, que les secrets restent secrets et que la base peut être reconstruite à l’identique.",
  "analogy_fr": "Avant l’ouverture d’une boutique, on vérifie chaque porte, on confie les clés aux bonnes personnes et on garde le plan des lieux. L’inauguration ne vient qu’après.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "alter table produits enable row level security;\ncreate policy catalogue_public on produits for select to anon, authenticated using (true);\ncreate policy vendeur_ajoute on produits for insert to authenticated with check (vendeur_id = auth.uid());\ncreate policy modifier_mes_produits on produits for update to authenticated\n  using (vendeur_id = auth.uid())\n  with check (vendeur_id = auth.uid());\nalter table commandes enable row level security;\ncreate policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());\ncreate policy commander on commandes for insert to authenticated with check (client_id = auth.uid());\nalter table profils enable row level security;\ncreate policy profils_visibles on profils for select to authenticated using (true);\ncreate policy mon_profil on profils for update to authenticated using (id = auth.uid()) with check (id = auth.uid());\n\nset role anon;\nselect (select count(*)::int from produits) as produits_visibles, (select count(*)::int from commandes) as commandes_visibles;\nreset role;",
      "expected_output": "1 ligne (produits_visibles, commandes_visibles) : 4 | 0",
      "trace_fr": [
        "La migration complète est appliquée.",
        "Un visiteur voit tout le catalogue…",
        "… et aucune commande."
      ],
      "expected_result": {
        "columns": [
          "produits_visibles",
          "commandes_visibles"
        ],
        "values": [
          [
            4,
            0
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "alter table produits enable row level security;\ncreate policy catalogue_public on produits for select to anon, authenticated using (true);\ncreate policy vendeur_ajoute on produits for insert to authenticated with check (vendeur_id = auth.uid());\ncreate policy modifier_mes_produits on produits for update to authenticated\n  using (vendeur_id = auth.uid())\n  with check (vendeur_id = auth.uid());\nalter table commandes enable row level security;\ncreate policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());\ncreate policy commander on commandes for insert to authenticated with check (client_id = auth.uid());\nalter table profils enable row level security;\ncreate policy profils_visibles on profils for select to authenticated using (true);\ncreate policy mon_profil on profils for update to authenticated using (id = auth.uid()) with check (id = auth.uid());\n\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '44444444-4444-4444-4444-444444444444', false);\nwith m as (update produits set prix = prix + 1 returning id) select id as produits_modifies from m order by id;\nreset role;",
      "expected_output": "2 lignes (produits_modifies) : 3 ; 4",
      "trace_fr": [
        "Kofi, vendeur, tente de modifier tous les prix.",
        "Seuls ses propres produits sont modifiés.",
        "La politique fait le tri, sans erreur."
      ],
      "expected_result": {
        "columns": [
          "produits_modifies"
        ],
        "values": [
          [
            3
          ],
          [
            4
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Une table exposée sans RLS",
      "why_fr": "Elle est lisible et modifiable avec la clé publique.",
      "fix_fr": "Active la RLS sur toutes les tables du schéma public."
    },
    {
      "error": "La clé service_role dans une variable du site",
      "why_fr": "Elle se retrouve dans le navigateur.",
      "fix_fr": "Garde-la dans les secrets serveur."
    },
    {
      "error": "Modifier la base de production à la main",
      "why_fr": "Impossible de la reconstruire ou de relire les changements.",
      "fix_fr": "Passe par des migrations versionnées."
    }
  ],
  "quiz": [
    {
      "question": "Quelle clé peut apparaître dans le site ?",
      "options": [
        "service_role",
        "La clé publique (anon), si la RLS est active",
        "Aucune",
        "Les deux"
      ],
      "answer": 1,
      "explanation": "La RLS protège les données.",
      "id": "pgs-m4-03-q1"
    },
    {
      "question": "Où vivent les changements de structure d’une base de production ?",
      "options": [
        "Dans la tête de l’équipe",
        "Dans des fichiers de migration versionnés",
        "Dans un tableur",
        "Nulle part"
      ],
      "answer": 1,
      "explanation": "Reproductibles et relus.",
      "id": "pgs-m4-03-q2"
    },
    {
      "question": "Faut-il Docker pour utiliser Supabase ?",
      "options": [
        "Oui, toujours",
        "Non : seul le développement local complet l’utilise",
        "Oui, pour la RLS",
        "Oui, pour Vercel"
      ],
      "answer": 1,
      "explanation": "Un projet de développement distant suffit.",
      "id": "pgs-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "migration de sécurité",
      "definition": "Fichier SQL qui active la RLS et crée les politiques."
    },
    {
      "term": "variable d’environnement",
      "definition": "Réglage fourni au site par l’hébergeur, hors du code."
    },
    {
      "term": "conseiller de sécurité",
      "definition": "Outil de Supabase qui signale les tables mal protégées."
    },
    {
      "term": "production",
      "definition": "Version de l’application utilisée par les vrais utilisateurs."
    }
  ],
  "recap_fr": [
    "Écrire la migration de sécurité complète d’une application Supabase.",
    "Préparer la mise en ligne : clés, variables d’environnement, migrations et tests des politiques.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "migration de sécurité",
    "variable d’environnement",
    "conseiller de sécurité",
    "production"
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
      "title": "Supabase — Row Level Security",
      "url": "https://supabase.com/docs/guides/database/postgres/row-level-security"
    },
    {
      "title": "Supabase — clés d’API",
      "url": "https://supabase.com/docs/guides/api/api-keys"
    },
    {
      "title": "Supabase — migrations",
      "url": "https://supabase.com/docs/guides/deployment/database-migrations"
    }
  ],
  "sources": [
    {
      "title": "Supabase — Row Level Security",
      "url": "https://supabase.com/docs/guides/database/postgres/row-level-security",
      "scope": "Politiques avec auth.uid() et rôles de l’API. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — clés d’API",
      "url": "https://supabase.com/docs/guides/api/api-keys",
      "scope": "Clé publique et clé de service. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Supabase — migrations",
      "url": "https://supabase.com/docs/guides/deployment/database-migrations",
      "scope": "Faire évoluer la base avec des fichiers versionnés. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ce dernier chapitre réunit le cours dans la migration de sécurité de la boutique : un seul fichier SQL qui active la sécurité par ligne sur toutes les tables exposées et crée exactement les politiques nécessaires. Le catalogue est public en lecture ; chaque vendeur ajoute et modifie ses produits ; chaque client lit et crée ses commandes ; chaque personne connectée lit les profils et modifie le sien. Rien d’autre n’est permis. Les actions sensibles, comme passer commande, passent par des fonctions sécurisées.

Une bonne migration se relit comme une liste de règles métier : chaque politique porte un nom qui dit ce qu’elle permet. Avant de la publier, on la teste avec plusieurs identités : un vendeur sur ses produits et sur ceux d’un autre, un client sur ses commandes et sur celles d’un autre, un visiteur sur toutes les tables. Supabase fournit d’ailleurs un conseiller de sécurité qui signale les tables du schéma public sans RLS ; un projet prêt pour la production n’en a aucune.

Côté déploiement, l’architecture d’un projet comme Nunya est simple et ne demande aucun serveur à installer. Le site est hébergé par Vercel, qui le reconstruit à chaque envoi sur la branche principale de GitHub. La base et les fonctions serveur sont chez Supabase. Le site reçoit deux valeurs par des variables d’environnement : l’adresse du projet et la clé publique, qui correspond au rôle anon. Cette clé peut être visible dans le navigateur, précisément parce que la sécurité par ligne protège les données. La clé service_role, elle, ne va jamais dans le site ni dans GitHub : seulement dans les secrets d’un serveur de confiance, comme les fonctions de Supabase.

Les migrations rendent la base reproductible. Chaque modification de structure ou de sécurité est un fichier daté dans un dossier comme supabase/migrations, versionné avec Git et relu comme du code. L’outil en ligne de commande de Supabase applique ces fichiers à un projet distant. Le développement local complet de Supabase utilise Docker ; on peut s’en passer en travaillant sur un projet de développement distant, gratuit, séparé de la production.

Enfin, préparer la production, c’est aussi prévoir les incidents : sauvegardes automatiques de la base, alertes, et une procédure si une clé secrète a fuité, qu’il faut alors révoquer et remplacer aussitôt.

Tu sais maintenant concevoir le backend d’une application réelle avec PostgreSQL et Supabase, sans serveur à administrer, et surtout le sécuriser. C’est une compétence très recherchée chez les développeurs web.

## Exemple guidé 1

```sql
alter table produits enable row level security;
create policy catalogue_public on produits for select to anon, authenticated using (true);
create policy vendeur_ajoute on produits for insert to authenticated with check (vendeur_id = auth.uid());
create policy modifier_mes_produits on produits for update to authenticated
  using (vendeur_id = auth.uid())
  with check (vendeur_id = auth.uid());
alter table commandes enable row level security;
create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());
create policy commander on commandes for insert to authenticated with check (client_id = auth.uid());
alter table profils enable row level security;
create policy profils_visibles on profils for select to authenticated using (true);
create policy mon_profil on profils for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

set role anon;
select (select count(*)::int from produits) as produits_visibles, (select count(*)::int from commandes) as commandes_visibles;
reset role;
```

Résultat attendu : 1 ligne (produits_visibles, commandes_visibles) : 4 | 0

Trace :

- La migration complète est appliquée.
- Un visiteur voit tout le catalogue…
- … et aucune commande.

## Exemple guidé 2

```sql
alter table produits enable row level security;
create policy catalogue_public on produits for select to anon, authenticated using (true);
create policy vendeur_ajoute on produits for insert to authenticated with check (vendeur_id = auth.uid());
create policy modifier_mes_produits on produits for update to authenticated
  using (vendeur_id = auth.uid())
  with check (vendeur_id = auth.uid());
alter table commandes enable row level security;
create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());
create policy commander on commandes for insert to authenticated with check (client_id = auth.uid());
alter table profils enable row level security;
create policy profils_visibles on profils for select to authenticated using (true);
create policy mon_profil on profils for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

set role authenticated;
select set_config('request.jwt.claim.sub', '44444444-4444-4444-4444-444444444444', false);
with m as (update produits set prix = prix + 1 returning id) select id as produits_modifies from m order by id;
reset role;
```

Résultat attendu : 2 lignes (produits_modifies) : 3 ; 4

Trace :

- Kofi, vendeur, tente de modifier tous les prix.
- Seuls ses propres produits sont modifiés.
- La politique fait le tri, sans erreur.

## Vérifier et expliquer

Pour l’application d’une coopérative de ton choix, liste les tables exposées et, pour chacune, les politiques de sécurité par ligne nécessaires.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase — clés d’API](https://supabase.com/docs/guides/api/api-keys)
- [Supabase — migrations](https://supabase.com/docs/guides/deployment/database-migrations)
