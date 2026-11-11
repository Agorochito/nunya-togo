---
{
  "id": "pgs-m2-03",
  "title_fr": "UPSERT et transactions",
  "course": "postgres-supabase",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "pgs-m2-02"
  ],
  "outcomes": [
    "Insérer ou mettre à jour en une seule instruction avec ON CONFLICT.",
    "Regrouper plusieurs écritures dans une transaction qui réussit ou échoue en bloc."
  ],
  "idea_fr": "Certaines opérations doivent être atomiques : tout ou rien. PostgreSQL le garantit avec les transactions et avec ON CONFLICT.",
  "analogy_fr": "Un virement mobile money retire l’argent d’un compte et le crédite sur l’autre. Si le second geste échoue, le premier doit être annulé : sinon l’argent disparaît.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "insert into produits (id, nom, prix, stock) values (1, 'Riz parfumé', 600, 10)\non conflict (id) do update set stock = produits.stock + excluded.stock\nreturning id, nom, stock;",
      "expected_output": "1 ligne (id, nom, stock) : 1 | Riz parfumé | 50",
      "trace_fr": [
        "Le produit 1 existe déjà : il y a conflit.",
        "Le stock importé, 10, s’ajoute aux 40 existants.",
        "RETURNING montre la ligne finale."
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
            "Riz parfumé",
            50
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "begin;\nupdate produits set stock = stock - 2 where id = 2;\ninsert into commandes (client_id, produit_id, quantite) values ('22222222-2222-2222-2222-222222222222', 2, 2);\ncommit;\nselect (select stock from produits where id = 2) as stock, (select count(*)::int from commandes) as commandes;",
      "expected_output": "1 ligne (stock, commandes) : 10 | 4",
      "trace_fr": [
        "Les deux écritures forment un bloc.",
        "commit les valide ensemble.",
        "Si l’insertion avait échoué, le stock n’aurait pas bougé."
      ],
      "expected_result": {
        "columns": [
          "stock",
          "commandes"
        ],
        "values": [
          [
            10,
            4
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "select puis insert pour « créer si absent »",
      "why_fr": "Une autre requête peut s’intercaler.",
      "fix_fr": "Utilise insert … on conflict."
    },
    {
      "error": "Cible de conflit sans contrainte unique",
      "why_fr": "PostgreSQL refuse l’instruction.",
      "fix_fr": "Vise une clé primaire ou une colonne unique."
    },
    {
      "error": "Écritures liées sans transaction",
      "why_fr": "Une demi-opération peut rester.",
      "fix_fr": "Regroupe-les entre begin et commit."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne excluded dans on conflict do update ?",
      "options": [
        "La ligne existante",
        "La ligne qu’on tentait d’insérer",
        "Une table supprimée",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Les nouvelles valeurs proposées.",
      "id": "pgs-m2-03-q1"
    },
    {
      "question": "Que fait rollback ?",
      "options": [
        "Valide les écritures",
        "Annule toutes les écritures de la transaction",
        "Supprime la base",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Tout ou rien.",
      "id": "pgs-m2-03-q2"
    },
    {
      "question": "Comment regrouper plusieurs écritures dans Supabase ?",
      "options": [
        "Plusieurs requêtes HTTP",
        "Une fonction de la base appelée par RPC",
        "Un cookie",
        "Impossible"
      ],
      "answer": 1,
      "explanation": "Elle s’exécute en une transaction.",
      "id": "pgs-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "UPSERT",
      "definition": "Insertion qui met à jour la ligne si elle existe déjà."
    },
    {
      "term": "ON CONFLICT",
      "definition": "Clause qui décide quoi faire en cas de doublon."
    },
    {
      "term": "transaction",
      "definition": "Groupe d’instructions validé ou annulé en bloc."
    },
    {
      "term": "atomicité",
      "definition": "Propriété d’une opération réalisée entièrement ou pas du tout."
    }
  ],
  "recap_fr": [
    "Insérer ou mettre à jour en une seule instruction avec ON CONFLICT.",
    "Regrouper plusieurs écritures dans une transaction qui réussit ou échoue en bloc.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "UPSERT",
    "ON CONFLICT",
    "transaction",
    "atomicité"
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
      "title": "PostgreSQL — INSERT",
      "url": "https://www.postgresql.org/docs/18/sql-insert.html"
    },
    {
      "title": "PostgreSQL — transactions",
      "url": "https://www.postgresql.org/docs/18/tutorial-transactions.html"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — INSERT",
      "url": "https://www.postgresql.org/docs/18/sql-insert.html",
      "scope": "ON CONFLICT et insertion avec retour. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "PostgreSQL — transactions",
      "url": "https://www.postgresql.org/docs/18/tutorial-transactions.html",
      "scope": "BEGIN, COMMIT et ROLLBACK. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une application doit souvent « créer si absent, sinon mettre à jour » : enregistrer les préférences d’un utilisateur, ajouter un produit à un panier, mettre à jour un stock importé. Écrire d’abord un select puis un insert ou un update ne suffit pas : entre les deux, une autre requête peut avoir créé la ligne, et l’insertion échoue sur un doublon. PostgreSQL offre une instruction unique et sûre : insert … on conflict (colonne) do update set ….

La cible du conflit, entre parenthèses, doit être une colonne ou un groupe de colonnes protégé par une contrainte unique ou une clé primaire ; sinon PostgreSQL refuse avec le message there is no unique or exclusion constraint matching the ON CONFLICT specification. Dans la partie do update, le mot excluded désigne la ligne qu’on tentait d’insérer : set stock = produits.stock + excluded.stock ajoute la quantité importée au stock existant. La variante on conflict do nothing ignore simplement la ligne en double. Avec returning, on récupère la ligne finale, créée ou modifiée.

Quand une opération demande plusieurs instructions, la transaction les regroupe. Entre begin et commit, toutes les écritures sont provisoires ; commit les valide d’un coup, rollback les annule toutes. Si une instruction échoue, la transaction entière est annulée : il n’y a jamais de demi-commande, avec un stock retiré sans commande enregistrée.

PostgreSQL exécute même une instruction isolée comme une petite transaction : un update qui échoue au milieu de mille lignes n’en modifie aucune. Et un script de plusieurs instructions envoyé d’un bloc, comme dans cet atelier, est annulé en entier si l’une échoue.

Dans Supabase, l’application parle à la base par des requêtes HTTP indépendantes : chacune est sa propre transaction. Pour regrouper plusieurs écritures, on les place dans une fonction de la base, appelée par RPC, qui s’exécute en une seule transaction. Le module 4 construit une telle fonction pour passer une commande en toute sécurité.

Enfin, les transactions protègent aussi les lectures : pendant qu’une transaction travaille, les autres connexions voient l’état d’avant, jamais un état intermédiaire. C’est ce qui permet à des milliers de personnes d’utiliser la même base sans se gêner.

## Exemple guidé 1

```sql
insert into produits (id, nom, prix, stock) values (1, 'Riz parfumé', 600, 10)
on conflict (id) do update set stock = produits.stock + excluded.stock
returning id, nom, stock;
```

Résultat attendu : 1 ligne (id, nom, stock) : 1 | Riz parfumé | 50

Trace :

- Le produit 1 existe déjà : il y a conflit.
- Le stock importé, 10, s’ajoute aux 40 existants.
- RETURNING montre la ligne finale.

## Exemple guidé 2

```sql
begin;
update produits set stock = stock - 2 where id = 2;
insert into commandes (client_id, produit_id, quantite) values ('22222222-2222-2222-2222-222222222222', 2, 2);
commit;
select (select stock from produits where id = 2) as stock, (select count(*)::int from commandes) as commandes;
```

Résultat attendu : 1 ligne (stock, commandes) : 10 | 4

Trace :

- Les deux écritures forment un bloc.
- commit les valide ensemble.
- Si l’insertion avait échoué, le stock n’aurait pas bougé.

## Vérifier et expliquer

Écris le scénario d’un import de stock qui doit créer les nouveaux produits et compléter les existants, sans doublons.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — INSERT](https://www.postgresql.org/docs/18/sql-insert.html)
- [PostgreSQL — transactions](https://www.postgresql.org/docs/18/tutorial-transactions.html)
