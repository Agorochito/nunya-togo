---
{
  "id": "sql-m5-03",
  "title_fr": "Modifier et supprimer uniquement les lignes visées",
  "course": "sql-bases",
  "module": "m5",
  "order": 15,
  "minutes": 20,
  "prerequisites": [
    "sql-m5-02"
  ],
  "outcomes": [
    "Écrire une modification ou une suppression avec une portée explicite.",
    "Conserver les lignes non visées et respecter les références."
  ],
  "idea_fr": "Écrire une modification ou une suppression avec une portée explicite.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "Une ligne : atelier 1, places 5 dans la fixture club.",
      "trace_fr": [
        "La valeur initiale quatre est lue par l’expression places + 1.",
        "WHERE conserve les autres ateliers.",
        "La lecture montre cinq pour l’atelier ciblé."
      ],
      "expected_result": {
        "columns": [
          "id",
          "places"
        ],
        "values": [
          [
            1,
            5
          ]
        ]
      },
      "fixture": "club"
    },
    {
      "expected_output": "Trois inscriptions restent : 1, 3 et 5, toutes confirmées.",
      "trace_fr": [
        "Les inscriptions 2 et 4 sont en attente et sont supprimées.",
        "La table et les trois lignes confirmées restent présentes.",
        "ORDER BY fixe la présentation."
      ],
      "expected_result": {
        "columns": [
          "id",
          "statut"
        ],
        "values": [
          [
            1,
            "confirmee"
          ],
          [
            3,
            "confirmee"
          ],
          [
            5,
            "confirmee"
          ]
        ]
      },
      "fixture": "club"
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier WHERE",
      "why_fr": "L’écriture touche toutes les lignes de la table.",
      "fix_fr": "Prévois d’abord la sélection et conserve sa condition."
    },
    {
      "error": "Supprimer le parent avant les références",
      "why_fr": "Des lignes enfants pointent encore vers cette identité.",
      "fix_fr": "Traite les références ciblées avant l’atelier."
    }
  ],
  "quiz": [
    {
      "question": "Que fait UPDATE sans WHERE ?",
      "options": [
        "Il vise toutes les lignes de la table.",
        "Il ne vise jamais de ligne.",
        "Il choisit seulement la première ligne."
      ],
      "answer": 0,
      "explanation": "WHERE définit la portée ; son absence ne limite pas l’opération à une cible implicite.",
      "id": "sql-m5-03-q1"
    },
    {
      "question": "DELETE retire-t-il ici la structure de la table ?",
      "options": [
        "Oui, toujours.",
        "Il transforme la table en vue.",
        "Non, seulement les lignes visées."
      ],
      "answer": 2,
      "explanation": "La suppression de lignes est distincte d’une suppression de structure.",
      "id": "sql-m5-03-q2"
    },
    {
      "question": "Pourquoi retirer les inscriptions avant leur atelier ?",
      "options": [
        "SQL interdit toujours deux DELETE.",
        "La clé étrangère doit rester cohérente.",
        "Les noms sont triés avant les nombres."
      ],
      "answer": 1,
      "explanation": "La fixture ne déclare pas de cascade ; une référence vers une ligne supprimée serait invalide.",
      "id": "sql-m5-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "UPDATE",
      "definition": "Modification de valeurs dans les lignes sélectionnées."
    },
    {
      "term": "DELETE",
      "definition": "Suppression de lignes sans retirer la table."
    },
    {
      "term": "portée",
      "definition": "Ensemble exact de lignes touchées par une instruction."
    }
  ],
  "recap_fr": [
    "Écrire une modification ou une suppression avec une portée explicite.",
    "Conserver les lignes non visées et respecter les références.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "UPDATE",
    "DELETE",
    "portée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
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
    },
    {
      "title": "SQLite — clés étrangères",
      "url": "https://www.sqlite.org/foreignkeys.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Une table peut évoluer sans être recréée. UPDATE change les valeurs de lignes existantes ; DELETE retire des lignes. Ces instructions utilisent WHERE pour sélectionner les lignes concernées, comme nous l’avons fait dans les lectures. La différence est leur effet : un SELECT observe, tandis qu’une écriture change la base de l’essai. Avant une modification dans une application réelle, il faut vérifier sa portée et disposer des protections adaptées. Ici, les données sont fictives et l’environnement est réinitialisé entre les essais.

Dans UPDATE ateliers SET places = places + 1 WHERE id = 1, l’expression à droite utilise la valeur précédente de chaque ligne retenue. SET indique la nouvelle valeur à associer. La condition sur l’identifiant ne concerne qu’un atelier. Sans WHERE, la même augmentation toucherait tous les ateliers. Cette portée globale peut parfois être voulue, mais elle doit être explicitement annoncée ; elle ne constitue pas un comportement sûr par défaut.

Une condition peut viser plusieurs lignes, par exemple les prix supérieurs ou égaux à mille. Soustraire cent à ces prix fictifs conserve les autres prix, notamment ceux qui valent zéro. Le test de seuil empêche ici un résultat négatif sans inventer une règle de promotion réelle. Un SELECT utilisant le même WHERE aide à prévoir les lignes touchées. Après l’écriture, relis aussi des lignes qui devaient rester inchangées : réussir sur la cible ne prouve pas la conservation du reste.

DELETE FROM inscriptions WHERE statut = 'attente' retire seulement les demandes portant ce statut. DELETE n’enlève pas la structure de la table. Sans condition, il retirerait toutes ses lignes. Une suppression n’est pas une annulation avec historique : les fiches retirées ne restent pas disponibles dans cette base pour une autre lecture. Les systèmes réels peuvent préférer conserver un état ou un journal ; ce choix appartient à leur contrat.

Les clés étrangères imposent aussi un ordre. Pour supprimer l’atelier deux dans notre modèle, il faut d’abord retirer les inscriptions qui le référencent, puis retirer l’atelier lui-même. Aucune suppression en cascade n’est déclarée par les fixtures. La tentative inverse est refusée par le moteur. Nous regrouperons les opérations liées dans une transaction au prochain chapitre ; ne confonds pas encore deux instructions successives avec une garantie d’annulation globale en cas d’erreur. Termine chaque essai par une explication : quelles lignes ont changé, quelles données ont été conservées et quelle lecture permet de le vérifier. Ton script est sauvegardé, mais les modifications de cet essai ne deviennent pas un inventaire durable du club.

## Exemple guidé 1

```sql
-- Une augmentation sur un atelier identifié.
UPDATE ateliers SET places = places + 1 WHERE id = 1;
SELECT id,places FROM ateliers WHERE id=1;
```

## Exemple guidé 2

```sql
-- Retirer uniquement les demandes en attente.
DELETE FROM inscriptions WHERE statut = 'attente';
SELECT id,statut FROM inscriptions ORDER BY id;
```

