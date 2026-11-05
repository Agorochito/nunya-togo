---
{
  "id": "sql-m4-02",
  "title_fr": "Combiner trois tables et comprendre les répétitions",
  "course": "sql-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "sql-m4-01"
  ],
  "outcomes": [
    "Construire une lecture à trois tables en suivant les clés.",
    "Distinguer répétition normale et besoin de résultat unique."
  ],
  "idea_fr": "La table d’inscriptions relie membres et ateliers ; chaque ligne de résultat représente une relation qu’il faut nommer.",
  "analogy_fr": "Une fiche de participation sert de pont entre la personne et l’activité, comme un ticket portant deux références.",
  "examples": [
    {
      "fixture": "club",
      "expected_output": "Cinq inscriptions enrichies : Afi/Python, Kossi/Web, Afi/Web, Mina/Python, Lina/Jardin, avec leur id et leur statut.",
      "trace_fr": [
        "Chaque ligne part d’une inscription distincte.",
        "La première référence retrouve le membre ; la seconde retrouve l’atelier.",
        "Le nom Afi se répète car deux inscriptions existent.",
        "Le tri garde les inscriptions 1 à 5 dans leur ordre."
      ],
      "expected_result": {
        "columns": [
          "inscription_id",
          "membre",
          "atelier",
          "statut"
        ],
        "values": [
          [
            1,
            "Afi",
            "Python",
            "confirmee"
          ],
          [
            2,
            "Kossi",
            "Web",
            "attente"
          ],
          [
            3,
            "Afi",
            "Web",
            "confirmee"
          ],
          [
            4,
            "Mina",
            "Python",
            "attente"
          ],
          [
            5,
            "Lina",
            "Jardin",
            "confirmee"
          ]
        ]
      }
    },
    {
      "fixture": "club",
      "expected_output": "Deux bilans : Afi/2500 puis Lina/500, en FCFA fictifs.",
      "trace_fr": [
        "La sélection retient les trois inscriptions confirmées.",
        "Les deux lignes d’Afi contribuent 1000 et 1500.",
        "La ligne de Lina contribue 500.",
        "Le regroupement et le tri produisent un bilan par personne, sans attester un paiement."
      ],
      "expected_result": {
        "columns": [
          "membre_id",
          "membre",
          "montant_fictif"
        ],
        "values": [
          [
            1,
            "Afi",
            2500
          ],
          [
            4,
            "Lina",
            500
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Relier les tables par les noms de colonnes seuls",
      "why_fr": "Deux colonnes id n’expriment pas automatiquement une relation.",
      "fix_fr": "Suis les clés étrangères de la table de liaison."
    },
    {
      "error": "Ajouter DISTINCT pour cacher une mauvaise jointure",
      "why_fr": "Le symptôme disparaît parfois mais les relations restent fausses.",
      "fix_fr": "Vérifie ON puis définis la granularité avant de dédupliquer."
    }
  ],
  "quiz": [
    {
      "question": "Quel rôle joue inscriptions entre les deux autres tables ?",
      "options": [
        "Elle relie une référence de membre à une référence d’atelier.",
        "Elle rend tous les membres et ateliers identiques.",
        "Elle remplace automatiquement les prix par des paiements."
      ],
      "answer": 0,
      "explanation": "Les deux clés étrangères donnent les relations nécessaires à la lecture.",
      "id": "sql-m4-02-q1"
    },
    {
      "question": "Que compare DISTINCT ?",
      "options": [
        "Seulement la première lettre du nom.",
        "Toutes les colonnes projetées d’une ligne de résultat.",
        "Le nombre de tables du FROM."
      ],
      "answer": 1,
      "explanation": "Ajouter une colonne comme i.id peut changer la granularité et empêcher les suppressions attendues.",
      "id": "sql-m4-02-q2"
    },
    {
      "question": "Deux lignes portant le nom Afi sont-elles forcément un doublon incorrect ?",
      "options": [
        "Oui, toute répétition de texte est une erreur.",
        "Oui, il faut supprimer une ligne de membres.",
        "Non, elles peuvent représenter deux inscriptions distinctes."
      ],
      "answer": 2,
      "explanation": "La correction dépend de ce qu’une ligne de résultat est censée représenter.",
      "id": "sql-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "table de liaison",
      "definition": "Table qui enregistre ici des relations entre membres et ateliers."
    },
    {
      "term": "granularité",
      "definition": "Unité représentée par une ligne du résultat."
    },
    {
      "term": "DISTINCT",
      "definition": "Mot-clé qui conserve seulement les lignes projetées distinctes."
    }
  ],
  "recap_fr": [
    "Construire une lecture à trois tables en suivant les clés.",
    "Distinguer répétition normale et besoin de résultat unique.",
    "Produire un bilan avec une unité et un tri explicites."
  ],
  "tags": [
    "table de liaison",
    "granularité",
    "DISTINCT"
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
    }
  ]
}
---

## Explication pas à pas

Pour afficher à la fois le nom d’un membre et le titre de son atelier, une seule relation ne suffit plus. La table inscriptions sert de pont : membre_id désigne une personne et atelier_id désigne une activité. Deux INNER JOIN peuvent suivre ces références. La requête reste une lecture ; elle ne copie pas durablement les noms ou les titres dans la table d’inscriptions et ne modifie aucun paiement.

Lis chaque ON séparément. Le premier relie i.membre_id à m.id ; le second relie i.atelier_id à a.id. Relier directement membres.id à ateliers.id parce que les deux s’appellent id inventerait une relation sans justification. Le prix n’est pas non plus une clé d’atelier : deux activités peuvent partager le même montant. Les alias m, i et a rendent ces rôles courts mais explicites dans les colonnes et les filtres.

La granularité indique ce que représente une ligne du résultat. Avec i.id, m.nom, a.titre et i.statut, elle représente une inscription enrichie. Un même nom peut donc revenir pour plusieurs activités. Ces répétitions ne sont pas automatiquement des erreurs ou des lignes à supprimer. Avant d’ajouter DISTINCT, demande si tu veux une liste d’inscriptions, une liste de personnes ou une liste de paires personne-atelier.

DISTINCT élimine les lignes identiques du résultat selon toutes les colonnes projetées. Pour une liste de membres uniques, affiche m.id et m.nom puis applique DISTINCT. Ajouter i.id rendrait les inscriptions distinctes et empêcherait la réduction recherchée. À l’inverse, supprimer le nom ou l’identifiant sans comprendre les relations peut fusionner des personnes différentes. Les données du cours ont des noms simples ; la règle ne doit pas dépendre de leur unicité accidentelle.

Les agrégats peuvent ensuite résumer cette lecture à trois tables. SUM(a.prix) sur les inscriptions confirmées donne ici un montant fictif associé aux lignes retenues, pas une preuve de facture ou de paiement. Regroupe selon la personne et trie la somme puis son identifiant pour les égalités. Les exemples et les tests reconstruisent les bases temporaires. La variante change les villes, les prix et les participations pour vérifier la vraie relation. Prédis une inscription, suis ses deux références puis annonce l’unité de ton résultat : une inscription, une personne unique ou un bilan. Cette précision prévient beaucoup de « doublons » seulement apparents.

## Exemple guidé 1

```sql
SELECT i.id AS inscription_id, m.nom AS membre,
       a.titre AS atelier, i.statut AS statut
FROM inscriptions AS i
INNER JOIN membres AS m ON m.id = i.membre_id
INNER JOIN ateliers AS a ON a.id = i.atelier_id
ORDER BY i.id ASC;
```

## Exemple guidé 2

```sql
SELECT m.id AS membre_id, m.nom AS membre, SUM(a.prix) AS montant_fictif
FROM membres AS m
INNER JOIN inscriptions AS i ON i.membre_id = m.id
INNER JOIN ateliers AS a ON a.id = i.atelier_id
WHERE i.statut = 'confirmee'
GROUP BY m.id, m.nom
ORDER BY montant_fictif DESC, m.id ASC;
```

