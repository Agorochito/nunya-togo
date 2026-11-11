---
{
  "id": "pgs-m3-03",
  "title_fr": "Politiques d’écriture : WITH CHECK",
  "course": "postgres-supabase",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "pgs-m3-02"
  ],
  "outcomes": [
    "Écrire des politiques d’insertion, de modification et de suppression.",
    "Distinguer USING, qui choisit les lignes existantes, et WITH CHECK, qui contrôle les nouvelles valeurs."
  ],
  "idea_fr": "Lire ses données ne suffit pas : il faut aussi empêcher chacun d’écrire au nom d’un autre, ou de transformer une ligne en ligne qu’il n’aurait pas le droit d’avoir.",
  "analogy_fr": "Un employé peut remplir les bons de commande de son rayon. Le contrôleur vérifie deux choses : que le bon qu’il modifie est bien à son rayon, et qu’après modification il l’est toujours.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "alter table commandes enable row level security;\ncreate policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());\ncreate policy commander on commandes for insert to authenticated with check (client_id = auth.uid());\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);\ninsert into commandes (client_id, produit_id, quantite) values ('11111111-1111-1111-1111-111111111111', 1, 1) returning id, quantite;\nreset role;",
      "expected_output": "1 ligne (id, quantite) : 4 | 1",
      "trace_fr": [
        "Afi commande à son propre nom : accepté.",
        "with check vérifie la nouvelle ligne.",
        "Au nom de Yao, la même insertion serait refusée."
      ],
      "expected_result": {
        "columns": [
          "id",
          "quantite"
        ],
        "values": [
          [
            4,
            1
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "alter table produits enable row level security;\ncreate policy catalogue_public on produits for select to anon, authenticated using (true);\ncreate policy modifier_mes_produits on produits for update to authenticated\n  using (vendeur_id = auth.uid())\n  with check (vendeur_id = auth.uid());\nset role authenticated;\nselect set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);\nwith m as (update produits set prix = prix + 100 returning id) select id from m order by id;\nreset role;",
      "expected_output": "2 lignes (id) : 1 ; 2",
      "trace_fr": [
        "Ama augmente tous les prix… qu’elle a le droit de modifier.",
        "using limite la modification à ses produits.",
        "Les produits de Kofi ne bougent pas."
      ],
      "expected_result": {
        "columns": [
          "id"
        ],
        "values": [
          [
            1
          ],
          [
            2
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier with check sur une mise à jour",
      "why_fr": "On peut transférer une ligne à quelqu’un d’autre.",
      "fix_fr": "Ajoute with check avec la même condition."
    },
    {
      "error": "using (true) pour une suppression",
      "why_fr": "Tout le monde peut tout supprimer.",
      "fix_fr": "Limite au propriétaire."
    },
    {
      "error": "Tester une politique avec une seule identité",
      "why_fr": "Les accès détournés passent inaperçus.",
      "fix_fr": "Teste aussi une autre personne et un visiteur."
    }
  ],
  "quiz": [
    {
      "question": "Quelle clause contrôle les valeurs d’une nouvelle ligne ?",
      "options": [
        "using",
        "with check",
        "to",
        "for"
      ],
      "answer": 1,
      "explanation": "Elle s’applique après l’écriture.",
      "id": "pgs-m3-03-q1"
    },
    {
      "question": "Afi insère une commande au nom de Yao avec la politique commander. Résultat ?",
      "options": [
        "Acceptée",
        "Refusée : new row violates row-level security policy",
        "Ignorée sans erreur",
        "Transformée"
      ],
      "answer": 1,
      "explanation": "with check échoue.",
      "id": "pgs-m3-03-q2"
    },
    {
      "question": "Pourquoi with check sur une mise à jour de produit ?",
      "options": [
        "Pour la vitesse",
        "Pour empêcher de changer le vendeur d’un produit",
        "Pour lire",
        "Inutile"
      ],
      "answer": 1,
      "explanation": "La nouvelle valeur doit rester conforme.",
      "id": "pgs-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "with check",
      "definition": "Condition imposée aux nouvelles valeurs d’une ligne."
    },
    {
      "term": "using",
      "definition": "Condition qui choisit les lignes existantes concernées."
    },
    {
      "term": "politique d’écriture",
      "definition": "Politique for insert, update ou delete."
    },
    {
      "term": "accès détourné",
      "definition": "Tentative d’agir au nom ou sur les données d’autrui."
    }
  ],
  "recap_fr": [
    "Écrire des politiques d’insertion, de modification et de suppression.",
    "Distinguer USING, qui choisit les lignes existantes, et WITH CHECK, qui contrôle les nouvelles valeurs.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "with check",
    "using",
    "politique d’écriture",
    "accès détourné"
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

Les politiques de lecture protègent ce que chacun voit. Les écritures demandent la même attention, avec une nuance importante : une écriture crée ou transforme des lignes. PostgreSQL distingue donc deux conditions.

La clause using choisit les lignes existantes sur lesquelles une opération peut porter. Pour update et delete, une personne ne peut modifier ou supprimer que les lignes que using lui accorde ; les autres sont ignorées, sans erreur, comme pour la lecture.

La clause with check contrôle les nouvelles valeurs, après l’insertion ou la modification. Pour insert, c’est la seule condition : create policy commander on commandes for insert to authenticated with check (client_id = auth.uid()) autorise chaque client à créer des commandes, mais seulement à son propre nom. Si Afi tente d’insérer une commande au nom de Yao, PostgreSQL refuse toute l’instruction avec le message new row violates row-level security policy.

Pour update, on utilise souvent les deux : using (vendeur_id = auth.uid()) limite un vendeur à ses produits, et with check (vendeur_id = auth.uid()) l’empêche de les transférer à un autre vendeur en changeant vendeur_id. Sans with check, la modification serait possible, et le produit échapperait à son propriétaire légitime.

Une politique de suppression n’a que using : on ne supprime que ce que la condition accorde. Une politique using (true) pour delete, écrite par commodité pendant un essai, permet à n’importe quelle personne connectée de vider la table : c’est une faille classique.

Les opérations de modification lisent aussi les lignes, par exemple pour appliquer un where ou renvoyer un returning : il faut donc souvent une politique de lecture en plus de la politique d’écriture. Dans la boutique, le catalogue public fournit déjà cette lecture pour les produits.

Une bonne méthode consiste à écrire une politique par opération et par profil d’utilisateur, avec un nom explicite : commander, modifier_mes_produits, supprimer_mes_produits. Puis à les tester systématiquement : l’action permise par la bonne personne, la même action par une autre personne, et une action détournée, comme écrire au nom d’autrui. C’est ainsi que procèdent les vérifications de l’atelier.

Enfin, garde à l’esprit que les politiques ne remplacent pas les contraintes : un prix positif reste une contrainte check de la table, valable pour tout le monde, y compris le service.

## Exemple guidé 1

```sql
alter table commandes enable row level security;
create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());
create policy commander on commandes for insert to authenticated with check (client_id = auth.uid());
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', false);
insert into commandes (client_id, produit_id, quantite) values ('11111111-1111-1111-1111-111111111111', 1, 1) returning id, quantite;
reset role;
```

Résultat attendu : 1 ligne (id, quantite) : 4 | 1

Trace :

- Afi commande à son propre nom : accepté.
- with check vérifie la nouvelle ligne.
- Au nom de Yao, la même insertion serait refusée.

## Exemple guidé 2

```sql
alter table produits enable row level security;
create policy catalogue_public on produits for select to anon, authenticated using (true);
create policy modifier_mes_produits on produits for update to authenticated
  using (vendeur_id = auth.uid())
  with check (vendeur_id = auth.uid());
set role authenticated;
select set_config('request.jwt.claim.sub', '33333333-3333-3333-3333-333333333333', false);
with m as (update produits set prix = prix + 100 returning id) select id from m order by id;
reset role;
```

Résultat attendu : 2 lignes (id) : 1 ; 2

Trace :

- Ama augmente tous les prix… qu’elle a le droit de modifier.
- using limite la modification à ses produits.
- Les produits de Kofi ne bougent pas.

## Vérifier et expliquer

Liste trois tentatives d’accès détourné sur la boutique et la clause qui empêche chacune.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — CREATE POLICY](https://www.postgresql.org/docs/18/sql-createpolicy.html)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
