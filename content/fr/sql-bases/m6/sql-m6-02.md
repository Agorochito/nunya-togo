---
{
  "id": "sql-m6-02",
  "title_fr": "Utiliser une sous-requête sans tomber dans le piège NULL",
  "course": "sql-bases",
  "module": "m6",
  "order": 17,
  "minutes": 20,
  "prerequisites": [
    "sql-m6-01"
  ],
  "outcomes": [
    "Exprimer une appartenance et une absence avec des sous-requêtes.",
    "Anticiper le rôle de NULL et calculer un seuil à partir des données."
  ],
  "idea_fr": "Exprimer une appartenance et une absence avec des sous-requêtes.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "Deux membres dans club : 1 Afi, puis 4 Lina.",
      "trace_fr": [
        "La sous-requête rencontre notamment deux confirmations pour Afi.",
        "IN teste l’appartenance sans dupliquer sa fiche.",
        "La requête extérieure retourne une fois chaque membre retenu."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom"
        ],
        "values": [
          [
            1,
            "Afi"
          ],
          [
            4,
            "Lina"
          ]
        ]
      },
      "fixture": "club"
    },
    {
      "expected_output": "Une ligne dans club : 5 Yao.",
      "trace_fr": [
        "Pour chaque membre, la sous-requête cherche une inscription liée.",
        "Yao ne possède aucune ligne correspondante.",
        "NOT EXISTS conserve sa fiche."
      ],
      "expected_result": {
        "columns": [
          "id",
          "nom"
        ],
        "values": [
          [
            5,
            "Yao"
          ]
        ]
      },
      "fixture": "club"
    }
  ],
  "common_mistakes": [
    {
      "error": "Prendre un résultat inconnu pour vrai",
      "why_fr": "NOT IN peut produire NULL lorsque l’ensemble comporte une valeur absente.",
      "fix_fr": "Traite les NULL ou reformule l’absence avec NOT EXISTS."
    },
    {
      "error": "Remplacer une moyenne par une constante",
      "why_fr": "Le seuil ne suit plus les données du cas.",
      "fix_fr": "Calcule AVG(prix) dans une sous-requête."
    }
  ],
  "quiz": [
    {
      "question": "Une sous-requête utilisée par IN fournit ici…",
      "options": [
        "Une colonne d’identifiants.",
        "Une liste de noms de tables à exécuter.",
        "Obligatoirement trois colonnes."
      ],
      "answer": 0,
      "explanation": "Chaque valeur de la colonne est comparée à l’identifiant extérieur.",
      "id": "sql-m6-02-q1"
    },
    {
      "question": "Que vérifie EXISTS ?",
      "options": [
        "L’égalité obligatoire à la constante un.",
        "Le nombre exact de colonnes de la table.",
        "La présence d’au moins une ligne correspondante."
      ],
      "answer": 2,
      "explanation": "La valeur de la projection ne sert pas de verdict ; la présence de lignes est déterminante.",
      "id": "sql-m6-02-q2"
    },
    {
      "question": "Pourquoi NOT IN peut-il échouer avec NULL ?",
      "options": [
        "Les sous-requêtes interdisent toutes les valeurs absentes.",
        "La comparaison peut devenir inconnue et WHERE ne la retient pas.",
        "NULL signifie toujours une correspondance exacte."
      ],
      "answer": 1,
      "explanation": "Il faut traiter les valeurs inconnues selon le besoin ou utiliser NOT EXISTS correctement corrélé.",
      "id": "sql-m6-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "sous-requête",
      "definition": "Requête utilisée à l’intérieur d’une autre instruction."
    },
    {
      "term": "corrélation",
      "definition": "Lien d’une sous-requête avec un alias de la requête extérieure."
    },
    {
      "term": "EXISTS",
      "definition": "Test de présence d’au moins une ligne répondant à une sous-requête."
    }
  ],
  "recap_fr": [
    "Exprimer une appartenance et une absence avec des sous-requêtes.",
    "Anticiper le rôle de NULL et calculer un seuil à partir des données.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "sous-requête",
    "corrélation",
    "EXISTS"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
    {
      "title": "SQLite — expressions, IN, EXISTS et sous-requêtes",
      "url": "https://www.sqlite.org/lang_expr.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Une sous-requête est une requête placée à l’intérieur d’une autre instruction SQL. Elle permet de relier une question à un résultat calculé sur les données. Dans notre club fictif, nous voulons par exemple les membres qui possèdent au moins une inscription confirmée. La sous-requête sélectionne les membre_id concernés ; la requête extérieure conserve les membres dont id appartient à cet ensemble avec IN. La sous-requête utilisée par IN fournit une seule colonne. Des identifiants répétés dans cet ensemble ne répètent pas les lignes de la table extérieure.

EXISTS répond à une autre forme de question : existe-t-il au moins une ligne correspondant à ce membre ? Une sous-requête corrélée peut utiliser l’alias m de la requête extérieure, par exemple i.membre_id = m.id. EXISTS est vrai dès qu’une correspondance existe. NOT EXISTS retient au contraire le membre pour lequel aucune ligne ne convient. Dans SELECT 1, le nombre un n’est pas une réponse constante affichée à l’apprenant : EXISTS s’intéresse à la présence de lignes, pas à la valeur de la projection.

Attention à NOT IN lorsqu’une sous-requête peut produire NULL. Si aucune égalité n’est trouvée mais que l’ensemble contient une valeur absente, le résultat de la comparaison peut être NULL au lieu de vrai. WHERE ne garde pas cette ligne. Un résultat inattendu peut donc provenir d’une valeur inconnue dans la liste, pas d’une absence réelle de candidats. Pour chercher des villes qui ne correspondent à aucune ville connue d’un membre majeur, exclus les villes inconnues du candidat puis utilise NOT EXISTS avec une comparaison explicite. Une autre solution peut filtrer les NULL à l’intérieur du NOT IN, si elle respecte le même besoin.

Une sous-requête peut aussi retourner une valeur scalaire, c’est-à-dire un seul résultat comme AVG(prix). La requête extérieure peut comparer chaque prix à cette moyenne calculée. Pour une table vide, AVG donne NULL ; cette situation ne doit pas être remplacée discrètement par une moyenne inventée. Nous n’enseignons pas encore les sous-requêtes renvoyant plusieurs colonnes ou une architecture d’optimisation.

Choisis la forme qui rend la question compréhensible, sans supposer qu’une sous-requête est toujours meilleure qu’une jointure. Les résultats demandés restent ordonnés explicitement, avec un deuxième critère pour les égalités de prix. Les deux fixtures changent notamment les âges et les villes inconnues : elles vérifient le raisonnement au lieu d’une liste mémorisée. Les requêtes de ce chapitre sont des lectures et doivent conserver toutes les tables et leurs lignes. Comme précédemment, chaque essai repart de la base initiale fictive.

## Exemple guidé 1

```sql
-- Les confirmations sélectionnent les identifiants, sans multiplier les membres.
SELECT id,nom FROM membres WHERE id IN (SELECT membre_id FROM inscriptions WHERE statut='confirmee') ORDER BY id;
```

## Exemple guidé 2

```sql
-- Absence de toute inscription, quel que soit le statut.
SELECT m.id,m.nom FROM membres AS m WHERE NOT EXISTS (SELECT 1 FROM inscriptions AS i WHERE i.membre_id=m.id) ORDER BY m.id;
```

