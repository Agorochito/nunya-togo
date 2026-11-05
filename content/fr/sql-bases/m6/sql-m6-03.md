---
{
  "id": "sql-m6-03",
  "title_fr": "Projet : préparer et expliquer le bilan d’un club",
  "course": "sql-bases",
  "module": "m6",
  "order": 18,
  "minutes": 20,
  "prerequisites": [
    "sql-m6-02"
  ],
  "outcomes": [
    "Assembler recherches, relations et agrégats dans un bilan fidèle.",
    "Appliquer des écritures contrôlées et expliquer les limites du projet."
  ],
  "idea_fr": "Assembler recherches, relations et agrégats dans un bilan fidèle.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "Dans club : Python 1, Jardin 1, Web 1, Dessin 0 ; colonnes id,titre,confirmees.",
      "trace_fr": [
        "La jointure garde les quatre ateliers.",
        "Le filtre de confirmation reste dans ON.",
        "COUNT(i.id) donne zéro à Dessin ; le second critère ordonne les égalités."
      ],
      "expected_result": {
        "columns": [
          "id",
          "titre",
          "confirmees"
        ],
        "values": [
          [
            1,
            "Python",
            1
          ],
          [
            2,
            "Jardin",
            1
          ],
          [
            3,
            "Web",
            1
          ],
          [
            4,
            "Dessin",
            0
          ]
        ]
      },
      "fixture": "club"
    },
    {
      "expected_output": "Deux lignes dans club : inscriptions 2 et 3, désormais toutes deux confirmées.",
      "trace_fr": [
        "L’inscription 2 est la seule attente de Web dans cette fixture.",
        "La confirmation existante de l’inscription 3 reste conservée.",
        "Le SELECT final observe le groupe après COMMIT."
      ],
      "expected_result": {
        "columns": [
          "id",
          "statut"
        ],
        "values": [
          [
            2,
            "confirmee"
          ],
          [
            3,
            "confirmee"
          ]
        ]
      },
      "fixture": "club"
    }
  ],
  "common_mistakes": [
    {
      "error": "Compter la ligne extérieure sans correspondance",
      "why_fr": "COUNT(*) attribue un compte à un atelier sans inscription liée.",
      "fix_fr": "Compte i.id et garde le filtre de statut dans ON."
    },
    {
      "error": "Inventer une réservation complète",
      "why_fr": "Le changement de statut ne gère pas à lui seul places, priorité et concurrence.",
      "fix_fr": "Présente exactement la règle limitée et garde places inchangé."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi COUNT(i.id) dans le bilan extérieur ?",
      "options": [
        "Il supprime les ateliers vides.",
        "Il compte tous les membres sans lien.",
        "Il ne compte pas la correspondance absente."
      ],
      "answer": 2,
      "explanation": "Une ligne extérieure sans inscription possède un identifiant lié NULL, ignoré par COUNT(colonne).",
      "id": "sql-m6-03-q1"
    },
    {
      "question": "La confirmation pédagogique décrémente-t-elle places ?",
      "options": [
        "Oui, dans toutes les autres tables.",
        "Non ; cette opération est exclue du contrat.",
        "Oui, automatiquement par UPDATE du statut."
      ],
      "answer": 1,
      "explanation": "Le projet n’invente pas une règle métier qui n’a pas été implémentée.",
      "id": "sql-m6-03-q2"
    },
    {
      "question": "Que garde la sauvegarde de cet atelier ?",
      "options": [
        "Le script SQL et la progression.",
        "Toutes les modifications entre les tests.",
        "Une réservation réelle sur un serveur."
      ],
      "answer": 0,
      "explanation": "La base est temporaire et réinitialisée ; persistance du travail et persistance des données sont distinctes.",
      "id": "sql-m6-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "bilan de données",
      "definition": "Présentation calculée à partir des lignes selon des règles annoncées."
    },
    {
      "term": "règle métier",
      "definition": "Décision propre au besoin représenté par les données."
    },
    {
      "term": "état final",
      "definition": "Ensemble des structures et lignes après l’exécution du script."
    }
  ],
  "recap_fr": [
    "Assembler recherches, relations et agrégats dans un bilan fidèle.",
    "Appliquer des écritures contrôlées et expliquer les limites du projet.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "bilan de données",
    "règle métier",
    "état final"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
    {
      "title": "SQLite — SELECT",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — transactions",
      "url": "https://www.sqlite.org/lang_transaction.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — UPDATE",
      "url": "https://www.sqlite.org/lang_update.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — DELETE",
      "url": "https://www.sqlite.org/lang_delete.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Le projet réunit les compétences du cours dans un club fictif : présenter les activités, repérer les demandes en attente et appliquer des changements précisément annoncés. Commence par séparer une lecture d’un changement d’état. Un tableau de bilan n’a pas besoin de modifier les données qui l’alimentent. Une mise à jour doit, au contraire, annoncer les lignes visées et permettre de relire le résultat. Le même schéma de départ est utilisé pour chaque exercice, mais les données supplémentaires varient.

Pour compter les confirmations de chaque atelier, conserve aussi ceux qui n’ont aucune inscription. La jointure extérieure part des ateliers et place le filtre de statut dans ON, afin de ne pas supprimer ces ateliers dans WHERE. COUNT(i.id) compte les inscriptions correspondantes ; COUNT(*) compterait aussi la ligne de jointure produite pour un atelier sans correspondance. Regroupe les colonnes non agrégées demandées et donne au compteur l’alias confirmees. Un ordre par compteur décroissant puis identifiant croissant permet de comparer les résultats, même en cas d’égalité.

Un second bilan relie trois tables pour retrouver le nom du membre et le titre de l’atelier associés à chaque attente. Il ne faut pas joindre un identifiant de membre à un identifiant d’atelier simplement parce qu’ils sont tous deux numériques. Les clés étrangères donnent le sens des liens. Plusieurs demandes légitimes peuvent produire plusieurs lignes : la consigne ne demande pas une suppression arbitraire des doublons. Les critères de tri incluent l’identité des inscriptions pour fixer l’ordre.

La préparation des confirmations applique ensuite une règle volontairement limitée : les inscriptions en attente liées à un atelier dont places est positif deviennent confirmées. Ce n’est pas un logiciel complet de réservation. La colonne places n’est pas décrémentée par cet exercice et aucune politique de concurrence ou de priorité n’est inventée. Ce contrat simple sert à combiner une sous-requête, un filtre et une écriture contrôlée. Le dernier exercice propose une autre préparation : ajouter une activité, réduire certains prix fictifs et retirer les attentes avant d’établir le bilan final.

Explique les conséquences de chaque instruction avant de l’exécuter. Une suppression ne constitue pas un archivage et ne conserve pas l’historique des demandes retirées. Dans un service réel, ces choix demanderaient des règles métier, des permissions et une conservation adaptée. Notre projet reste un laboratoire de données fictives et utilise une transaction fermée pour les groupes d’écritures. La sauvegarde Nunya garde le script et la progression ; chaque nouveau test reconstruit la base initiale. Après ce bilan, les transactions avancées, les index, les migrations et l’optimisation auront leurs propres prérequis et ne sont pas présentés comme déjà maîtrisés.

## Exemple guidé 1

```sql
-- Garder tous les ateliers, même sans confirmation.
SELECT a.id,a.titre,COUNT(i.id) AS confirmees FROM ateliers AS a LEFT JOIN inscriptions AS i ON i.atelier_id=a.id AND i.statut='confirmee' GROUP BY a.id,a.titre ORDER BY confirmees DESC,a.id ASC;
```

## Exemple guidé 2

```sql
-- Préparer seulement les attentes de Web, puis relire.
BEGIN;
UPDATE inscriptions SET statut='confirmee' WHERE atelier_id=3 AND statut='attente';
COMMIT;
SELECT id,statut FROM inscriptions WHERE atelier_id=3 ORDER BY id;
```

