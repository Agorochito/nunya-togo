---
{
  "id": "pgs-m4-01",
  "title_fr": "De la table à l’API",
  "course": "postgres-supabase",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "pgs-m3-03"
  ],
  "outcomes": [
    "Comprendre comment Supabase transforme les tables en API REST, interrogée par supabase-js.",
    "Traduire des appels supabase-js en SQL et prévoir leur résultat selon le rôle."
  ],
  "idea_fr": "Chaque appel supabase-js devient une requête SQL exécutée avec le rôle de la personne : si tu sais écrire le SQL, tu sais ce que l’API renverra.",
  "analogy_fr": "Le serveur de restaurant traduit ta commande pour la cuisine. Le plat ne dépend pas de la façon dont tu as demandé, mais de ce que la cuisine sait et a le droit de servir.",
  "examples": [
    {
      "fixture": "pg-boutique",
      "code": "set role anon;\nselect nom, prix from produits where stock > 0 order by prix limit 2 offset 0;\nreset role;",
      "expected_output": "2 lignes (nom, prix) : Savon noir | 350 ; Riz parfumé | 600",
      "trace_fr": [
        "Équivaut à from('produits').select('nom, prix').gt('stock', 0).order('prix').range(0, 1).",
        "La requête s’exécute avec le rôle anon.",
        "range(0, 1) renvoie deux lignes : limit 2."
      ],
      "expected_result": {
        "columns": [
          "nom",
          "prix"
        ],
        "values": [
          [
            "Savon noir",
            350
          ],
          [
            "Riz parfumé",
            600
          ]
        ]
      }
    },
    {
      "fixture": "pg-boutique",
      "code": "select c.id, c.quantite, p.nom\nfrom commandes c\njoin produits p on p.id = c.produit_id\nwhere c.client_id = '11111111-1111-1111-1111-111111111111'\norder by c.id;",
      "expected_output": "2 lignes (id, quantite, nom) : 1 | 2 | Riz parfumé ; 3 | 3 | Savon noir",
      "trace_fr": [
        "Équivaut à select('id, quantite, produits(nom)').eq('client_id', …).",
        "La relation suit la clé étrangère produit_id.",
        "Supabase présenterait le nom dans un objet imbriqué."
      ],
      "expected_result": {
        "columns": [
          "id",
          "quantite",
          "nom"
        ],
        "values": [
          [
            1,
            2,
            "Riz parfumé"
          ],
          [
            3,
            3,
            "Savon noir"
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire que le navigateur peut contourner la RLS",
      "why_fr": "On ajoute des vérifications inutiles côté site.",
      "fix_fr": "La base applique les règles à chaque requête."
    },
    {
      "error": "Oublier .order",
      "why_fr": "L’ordre des résultats change.",
      "fix_fr": "Précise toujours l’ordre."
    },
    {
      "error": "Confondre range et limit",
      "why_fr": "Une ligne de trop ou de moins.",
      "fix_fr": "range(0, 9) donne 10 lignes."
    }
  ],
  "quiz": [
    {
      "question": "Que devient .gt('stock', 0) ?",
      "options": [
        "where stock < 0",
        "where stock > 0",
        "order by stock",
        "limit 0"
      ],
      "answer": 1,
      "explanation": "gt signifie greater than.",
      "id": "pgs-m4-01-q1"
    },
    {
      "question": "Avec quel rôle s’exécute l’appel d’un visiteur non connecté ?",
      "options": [
        "service_role",
        "authenticated",
        "anon",
        "postgres"
      ],
      "answer": 2,
      "explanation": "Celui de la clé publique.",
      "id": "pgs-m4-01-q2"
    },
    {
      "question": "Que renvoie .range(0, 9) ?",
      "options": [
        "9 lignes",
        "10 lignes",
        "0 ligne",
        "Toutes"
      ],
      "answer": 1,
      "explanation": "Les bornes sont incluses.",
      "id": "pgs-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "PostgREST",
      "definition": "Logiciel qui transforme une base PostgreSQL en API REST."
    },
    {
      "term": "supabase-js",
      "definition": "Bibliothèque JavaScript pour appeler l’API de Supabase."
    },
    {
      "term": "filtre",
      "definition": "Méthode comme eq ou gt, traduite en condition where."
    },
    {
      "term": "relation imbriquée",
      "definition": "Données d’une table liée, renvoyées dans un objet."
    }
  ],
  "recap_fr": [
    "Comprendre comment Supabase transforme les tables en API REST, interrogée par supabase-js.",
    "Traduire des appels supabase-js en SQL et prévoir leur résultat selon le rôle.",
    "Dans Supabase, la sécurité des données repose sur PostgreSQL : rôles, privilèges et politiques de sécurité par ligne."
  ],
  "tags": [
    "sql",
    "postgresql",
    "supabase",
    "PostgREST",
    "supabase-js",
    "filtre",
    "relation imbriquée"
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
      "title": "Supabase — API REST",
      "url": "https://supabase.com/docs/guides/api"
    },
    {
      "title": "Supabase — clés d’API",
      "url": "https://supabase.com/docs/guides/api/api-keys"
    }
  ],
  "sources": [
    {
      "title": "Supabase — API REST",
      "url": "https://supabase.com/docs/guides/api",
      "scope": "API générée automatiquement à partir des tables. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
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

Supabase génère automatiquement une API REST à partir des tables, des vues et des fonctions du schéma public, grâce à un logiciel libre appelé PostgREST. Une application n’a donc pas besoin d’écrire un serveur pour lire ou créer des produits : elle utilise la bibliothèque supabase-js, qui envoie des requêtes HTTP à cette API.

Chaque appel se traduit en SQL. supabase.from('produits').select('nom, prix') devient select nom, prix from produits. Les filtres s’enchaînent : .gt('stock', 0) devient where stock > 0, .eq('statut', 'payee') where statut = 'payee', .ilike('nom', '%riz%') where nom ilike '%riz%'. .order('prix') ajoute order by prix, et .order('id', { ascending: false }) order by id desc. .range(0, 9) renvoie les dix premières lignes, soit limit 10 offset 0. insert, update et delete suivent la même logique, et .rpc('nom_de_fonction', { … }) appelle une fonction de la base.

Le point capital : la requête est exécutée avec le rôle de la personne. Un visiteur utilise anon, une personne connectée authenticated avec son identifiant dans auth.uid(). Toutes les protections des leçons précédentes s’appliquent donc automatiquement : privilèges et politiques de sécurité par ligne. Deux personnes qui font exactement le même appel obtiennent des résultats différents si les politiques le prévoient. Il n’existe aucun moyen, côté navigateur, de contourner ces règles ; c’est pourquoi la clé publique peut être visible sans danger, à condition que la sécurité par ligne soit active.

Les relations entre tables se suivent dans l’appel : select('id, quantite, produits(nom)') renvoie chaque commande avec le nom de son produit, grâce à la clé étrangère. Côté SQL, c’est une jointure ; Supabase présente le résultat sous forme d’objets imbriqués en JSON.

Comprendre cette traduction aide à concevoir et à déboguer. Si une liste est vide dans l’application, il faut se demander quelle requête SQL a été exécutée, avec quel rôle, et quelles politiques la filtrent. Le tableau de bord de Supabase permet d’ailleurs d’exécuter du SQL en se faisant passer pour un rôle donné.

Dans les exercices, tu écris le SQL équivalent à un appel supabase-js. L’atelier l’exécute avec le rôle indiqué, comme le ferait l’API, et compare au résultat attendu.

## Exemple guidé 1

```sql
set role anon;
select nom, prix from produits where stock > 0 order by prix limit 2 offset 0;
reset role;
```

Résultat attendu : 2 lignes (nom, prix) : Savon noir | 350 ; Riz parfumé | 600

Trace :

- Équivaut à from('produits').select('nom, prix').gt('stock', 0).order('prix').range(0, 1).
- La requête s’exécute avec le rôle anon.
- range(0, 1) renvoie deux lignes : limit 2.

## Exemple guidé 2

```sql
select c.id, c.quantite, p.nom
from commandes c
join produits p on p.id = c.produit_id
where c.client_id = '11111111-1111-1111-1111-111111111111'
order by c.id;
```

Résultat attendu : 2 lignes (id, quantite, nom) : 1 | 2 | Riz parfumé ; 3 | 3 | Savon noir

Trace :

- Équivaut à select('id, quantite, produits(nom)').eq('client_id', …).
- La relation suit la clé étrangère produit_id.
- Supabase présenterait le nom dans un objet imbriqué.

## Vérifier et expliquer

Écris trois appels supabase-js que ferait la page d’accueil de la boutique, et leur traduction SQL.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans la documentation officielle de PostgreSQL et de Supabase :

- [Supabase — API REST](https://supabase.com/docs/guides/api)
- [Supabase — clés d’API](https://supabase.com/docs/guides/api/api-keys)
