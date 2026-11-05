---
{
  "id": "sql-m3-02",
  "title_fr": "Créer un bilan distinct pour chaque groupe",
  "course": "sql-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "sql-m3-01"
  ],
  "outcomes": [
    "Calculer un bilan par clé avec GROUP BY.",
    "Conserver le sens des groupes NULL et du cas vide."
  ],
  "idea_fr": "GROUP BY rassemble les lignes de même clé afin de calculer un bilan pour chaque ensemble.",
  "analogy_fr": "Tu ranges les fiches dans des piles par ville, puis tu comptes chaque pile sans mélanger leurs résultats.",
  "examples": [
    {
      "fixture": "club",
      "expected_output": "Quatre lignes : NULL→1, Kara→1, Lomé→2, Sokodé→1.",
      "trace_fr": [
        "Les cinq fiches sont regroupées par valeur de ville.",
        "Mina forme le groupe de ville inconnue.",
        "Les deux membres de Lomé partagent un groupe.",
        "ORDER BY fixe le tri au lieu de compter sur celui du regroupement."
      ],
      "expected_result": {
        "columns": [
          "ville",
          "nombre"
        ],
        "values": [
          [
            null,
            1
          ],
          [
            "Kara",
            1
          ],
          [
            "Lomé",
            2
          ],
          [
            "Sokodé",
            1
          ]
        ]
      }
    },
    {
      "fixture": "club",
      "expected_output": "Deux lignes : attente→2, confirmee→3.",
      "trace_fr": [
        "Les inscriptions ont deux valeurs de statut dans club.",
        "Les lignes sont regroupées selon cette valeur textuelle.",
        "COUNT(*) compte les lignes de chaque groupe.",
        "Le résultat est ordonné par statut, sans modifier les inscriptions."
      ],
      "expected_result": {
        "columns": [
          "statut",
          "nombre"
        ],
        "values": [
          [
            "attente",
            2
          ],
          [
            "confirmee",
            3
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Grouper par id au lieu de prix",
      "why_fr": "Chaque identifiant forme son propre groupe.",
      "fix_fr": "Utilise la clé commune annoncée par la question."
    },
    {
      "error": "Compter ville dans son groupe NULL",
      "why_fr": "Le compte obtenu vaut zéro malgré des personnes présentes.",
      "fix_fr": "Utilise COUNT(*) si tu comptes les membres."
    }
  ],
  "quiz": [
    {
      "question": "GROUP BY ville crée-t-il une ligne par membre ?",
      "options": [
        "Non, une ligne par valeur de ville présente dans la sélection.",
        "Oui, même si toutes les villes sont égales.",
        "Non, il supprime les fiches du dépôt."
      ],
      "answer": 0,
      "explanation": "Le regroupement calcule un résultat, sans mutation de la table.",
      "id": "sql-m3-02-q1"
    },
    {
      "question": "Que deviennent les clés NULL dans ce GROUP BY SQLite ?",
      "options": [
        "Chaque NULL devient forcément une ville différente.",
        "Elles appartiennent à un même groupe.",
        "Elles sont toujours supprimées."
      ],
      "answer": 1,
      "explanation": "Cette règle de regroupement est distincte de la comparaison ordinaire avec = NULL.",
      "id": "sql-m3-02-q2"
    },
    {
      "question": "Pourquoi ajouter ORDER BY après GROUP BY ?",
      "options": [
        "Il faut toujours recréer les tables.",
        "ORDER BY augmente automatiquement les effectifs.",
        "Le regroupement ne garantit pas l’ordre de présentation demandé."
      ],
      "answer": 2,
      "explanation": "Un ordre explicite, avec départage des égalités, rend le résultat vérifiable.",
      "id": "sql-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "clé de groupe",
      "definition": "Valeur utilisée pour rassembler des lignes dans un bilan."
    },
    {
      "term": "effectif",
      "definition": "Nombre de lignes d’un groupe selon le compte choisi."
    },
    {
      "term": "tri secondaire",
      "definition": "Critère qui départage des résultats égaux selon le premier tri."
    }
  ],
  "recap_fr": [
    "Calculer un bilan par clé avec GROUP BY.",
    "Conserver le sens des groupes NULL et du cas vide.",
    "Trier les groupes avec un départage explicite."
  ],
  "tags": [
    "clé de groupe",
    "effectif",
    "tri secondaire"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "SQL réel dans SQLite/sql.js, auto-hébergé dans un Worker du navigateur, sans connexion distante. Données fictives. Chaque exemple, essai et test reconstruit sa base initiale ; le code et la progression peuvent être sauvegardés, pas les modifications de la base temporaire. Disponible hors ligne après téléchargement.",
  "sources": [
    {
      "title": "SQLite — SELECT et traitement des résultats",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — Fonctions d’agrégation",
      "url": "https://www.sqlite.org/lang_aggfunc.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — Expressions et NULL",
      "url": "https://www.sqlite.org/lang_expr.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Un total global ne dit pas comment les membres se répartissent entre les villes. GROUP BY permet de créer plusieurs ensembles selon une clé, puis de calculer des agrégats dans chacun. La requête peut ainsi renvoyer une ligne par ville avec son nombre de membres. Les lignes d’origine ne sont pas modifiées ni déplacées dans la table ; le regroupement appartient au calcul du résultat.

La clé de groupe peut être une colonne comme ville ou statut. Toutes les lignes dont la clé est égale sont rassemblées. Dans SQLite, les valeurs NULL d’une clé sont traitées comme appartenant au même groupe pour cette opération. Cela ne change pas la règle des comparaisons ordinaires avec NULL. Le groupe représente ici les villes inconnues, pas une ville portant le texte « NULL ». Il peut contenir plusieurs personnes même si COUNT(ville) y serait égal à zéro.

Dans SELECT, écris la clé que tu souhaites montrer et les agrégats calculés sur chaque groupe. Pour notre règle de rédaction, chaque colonne affichée sans agrégat doit faire partie du GROUP BY. Nous évitons les colonnes isolées dont le lien avec le groupe serait ambigu. Le nombre de lignes du résultat dépend du nombre de clés présentes, pas du nombre de personnes. Avec une table vide, aucun groupe n’existe et la requête groupée ne renvoie aucune ligne.

Le regroupement ne garantit pas un ordre de présentation. Ajoute ORDER BY pour annoncer un résultat déterministe. Pour trier les effectifs du plus grand au plus petit, utilise le compte décroissant, puis la ville croissante en cas d’égalité. Dans notre SQLite, un tri croissant de ville place NULL avant les textes. Cette convention doit rester distincte de l’interprétation métier : une ville inconnue n’est pas plus petite géographiquement qu’une autre.

WHERE peut encore limiter les lignes avant de constituer les groupes, par exemple en gardant les adultes. Les tests utilisent une deuxième base avec des effectifs et des prix différents ; cela révèle les regroupements faits par identifiant à la place de la vraie clé. Les exemples repartent toujours de club et les essais reconstruisent leur propre base temporaire. Lis la consigne comme un contrat : une ligne par quelle clé, quelles mesures, quel ordre ? Trace une petite pile de lignes pour prédire un groupe avant d’exécuter. Cette étape prépare les filtres sur les bilans eux-mêmes.

## Exemple guidé 1

```sql
SELECT ville, COUNT(*) AS nombre
FROM membres
GROUP BY ville
ORDER BY ville ASC;
```

## Exemple guidé 2

```sql
SELECT statut, COUNT(*) AS nombre
FROM inscriptions
GROUP BY statut
ORDER BY statut ASC;
```

