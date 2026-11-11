---
{
  "id": "pgs-m1-03",
  "title_fr": "RETURNING, FILTER et agrégats",
  "course": "postgres-supabase",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "pgs-m1-02"
  ],
  "outcomes": [
    "Récupérer les lignes créées ou modifiées avec RETURNING.",
    "Compter selon plusieurs conditions avec FILTER et assembler des listes avec string_agg."
  ],
  "idea_fr": "PostgreSQL ajoute au SQL de petits outils qui évitent des allers-retours : renvoyer ce qu’on vient d’écrire, compter plusieurs choses en une requête.",
  "analogy_fr": "Au guichet, l’agent qui enregistre ton colis te tend directement le reçu avec son numéro : tu n’as pas besoin de revenir le demander.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "insert into produits (nom, prix, stock, vendeur_id)\nvalues ('Mangue', 300, 50, '33333333-3333-3333-3333-333333333333')\nreturning id, nom, stock;",
      "expected_output": "1 ligne (id, nom, stock) : 5 | Mangue | 50",
      "trace_fr": [
        "La base attribue l’identifiant suivant.",
        "RETURNING renvoie la ligne créée.",
        "Pas besoin d’une seconde requête."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom",
          "stock"
        ],
        "values": [
          [
            5,
            "Mangue",
            50
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "select pr.nom as vendeur,\n       count(*) as produits,\n       count(*) filter (where p.stock = 0) as en_rupture\nfrom produits p\njoin profils pr on pr.id = p.vendeur_id\ngroup by pr.nom\norder by pr.nom;",
      "expected_output": "2 lignes (vendeur, produits, en_rupture) : Ama | 2 | 0 ; Kofi | 2 | 1",
      "trace_fr": [
        "Chaque vendeur forme un groupe.",
        "count(*) compte tous ses produits.",
        "FILTER ne compte que ceux en rupture."
      ],
      "expected_result": {
        "columns": [
          "vendeur",
          "produits",
          "en_rupture"
        ],
        "values": [
          [
            "Ama",
            2,
            0
          ],
          [
            "Kofi",
            2,
            1
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Relancer une recherche après un INSERT",
      "why_fr": "Deux allers-retours, et risque de retrouver la mauvaise ligne.",
      "fix_fr": "Utilise RETURNING."
    },
    {
      "error": "Plusieurs requêtes pour plusieurs comptages",
      "why_fr": "Plus lent et plus long.",
      "fix_fr": "Utilise count(*) filter (where …)."
    },
    {
      "error": "string_agg sans ordre",
      "why_fr": "La liste change d’ordre au hasard.",
      "fix_fr": "Ajoute order by dans la fonction."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie insert … returning id ?",
      "options": [
        "Rien",
        "L’identifiant de la ligne créée",
        "Le nombre de lignes de la table",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Les valeurs calculées par la base.",
      "id": "pgs-m1-03-q1"
    },
    {
      "question": "Que compte count(*) filter (where stock = 0) ?",
      "options": [
        "Toutes les lignes",
        "Seulement les lignes avec stock nul",
        "Les stocks",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Un agrégat filtré.",
      "id": "pgs-m1-03-q2"
    },
    {
      "question": "Que vaut 7 / 2 entre entiers en PostgreSQL ?",
      "options": [
        "3.5",
        "3",
        "4",
        "Erreur"
      ],
      "answer": 1,
      "explanation": "Division entière.",
      "id": "pgs-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "RETURNING",
      "definition": "Clause qui renvoie les lignes insérées, modifiées ou supprimées."
    },
    {
      "term": "FILTER",
      "definition": "Restreint les lignes prises en compte par un agrégat."
    },
    {
      "term": "string_agg",
      "definition": "Assemble les textes d’un groupe avec un séparateur."
    },
    {
      "term": "aller-retour",
      "definition": "Échange complet entre l’application et le serveur."
    }
  ],
  "recap_fr": [
    "Récupérer les lignes créées ou modifiées avec RETURNING.",
    "Compter selon plusieurs conditions avec FILTER et assembler des listes avec string_agg.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "RETURNING",
    "FILTER",
    "string_agg",
    "aller-retour"
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
      "title": "PostgreSQL — RETURNING",
      "url": "https://www.postgresql.org/docs/18/dml-returning.html"
    },
    {
      "title": "PostgreSQL — expressions de table",
      "url": "https://www.postgresql.org/docs/18/queries-table-expressions.html"
    }
  ],
  "sources": [
    {
      "title": "PostgreSQL — RETURNING",
      "url": "https://www.postgresql.org/docs/18/dml-returning.html",
      "scope": "Récupérer les lignes modifiées. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
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

Quand une application crée une commande, elle a souvent besoin de son identifiant aussitôt, par exemple pour afficher « commande n° 4 ». Sans outil particulier, il faudrait insérer, puis relancer une recherche pour retrouver la ligne. PostgreSQL ajoute la clause RETURNING à INSERT, UPDATE et DELETE : insert into produits (…) values (…) returning id, nom renvoie la ligne créée, avec les valeurs calculées par la base, comme l’identifiant ou les valeurs par défaut. Supabase s’en sert à chaque fois que tu crées une ligne depuis l’application et que tu demandes la ligne en retour.

RETURNING fonctionne aussi après une modification : update produits set prix = prix + 50 where nom = 'Gari' returning nom, prix montre les nouvelles valeurs. C’est un excellent moyen de vérifier qu’une modification a touché les bonnes lignes, et seulement elles. Un UPDATE sans WHERE modifie toute la table : RETURNING le révèle immédiatement par le nombre de lignes renvoyées.

Pour les statistiques, la clause FILTER, placée après une fonction d’agrégat, ne compte que certaines lignes : count(*) filter (where stock = 0) compte les produits en rupture, pendant que count(*) compte tous les produits, dans le même GROUP BY. On évite ainsi plusieurs requêtes ou des expressions CASE plus longues. FILTER s’applique à toutes les fonctions d’agrégat : sum, avg, max.

La fonction string_agg assemble des textes d’un groupe en une seule chaîne, avec un séparateur : string_agg(p.nom, ', ' order by p.nom) produit « Riz parfumé, Savon noir ». L’ordre à l’intérieur de la liste se précise dans la fonction elle-même ; sans lui, il n’est pas garanti. array_agg fait la même chose mais produit un tableau PostgreSQL.

Pour les montants, rappelle-toi que la division de deux entiers donne un entier : 7 / 2 vaut 3. Pour une moyenne exacte, utilise avg, qui renvoie un numeric, puis round(…, 2).

Ces outils réduisent le nombre de requêtes entre l’application et la base, ce qui compte quand la base est sur un serveur distant : chaque aller-retour sur le réseau prend du temps, surtout avec une connexion mobile. Une requête bien construite qui renvoie tout ce dont l’écran a besoin est souvent la meilleure optimisation.

## Exemple guidé 1

```sql
insert into produits (nom, prix, stock, vendeur_id)
values ('Mangue', 300, 50, '33333333-3333-3333-3333-333333333333')
returning id, nom, stock;
```

Résultat attendu : 1 ligne (id, nom, stock) : 5 | Mangue | 50

Trace :

- La base attribue l’identifiant suivant.
- RETURNING renvoie la ligne créée.
- Pas besoin d’une seconde requête.

## Exemple guidé 2

```sql
select pr.nom as vendeur,
       count(*) as produits,
       count(*) filter (where p.stock = 0) as en_rupture
from produits p
join profils pr on pr.id = p.vendeur_id
group by pr.nom
order by pr.nom;
```

Résultat attendu : 2 lignes (vendeur, produits, en_rupture) : Ama | 2 | 0 ; Kofi | 2 | 1

Trace :

- Chaque vendeur forme un groupe.
- count(*) compte tous ses produits.
- FILTER ne compte que ceux en rupture.

## Vérifier et expliquer

Écris une seule requête qui donne, par statut de commande, le nombre de commandes et la quantité totale.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [PostgreSQL — RETURNING](https://www.postgresql.org/docs/18/dml-returning.html)
- [PostgreSQL — expressions de table](https://www.postgresql.org/docs/18/queries-table-expressions.html)
