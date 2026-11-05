---
{
  "id": "sql-m4-03",
  "title_fr": "Conserver les lignes sans correspondance avec LEFT JOIN",
  "course": "sql-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "sql-m4-02"
  ],
  "outcomes": [
    "Conserver les lignes sans correspondance avec LEFT JOIN.",
    "Compter une clé droite pour obtenir les zéros exacts."
  ],
  "idea_fr": "LEFT JOIN garde les lignes de gauche ; un compte de la clé droite distingue les vraies correspondances des lignes complétées par NULL.",
  "analogy_fr": "Tu gardes la liste complète des personnes et tu joins leurs participations, même lorsque la colonne des participations reste vide.",
  "examples": [
    {
      "fixture": "club",
      "expected_output": "Cinq bilans : Afi→2, Kossi→1, Mina→1, Lina→1, Yao→0.",
      "trace_fr": [
        "LEFT JOIN conserve les cinq membres.",
        "Deux inscriptions correspondent à Afi.",
        "Aucune inscription ne correspond à Yao ; les colonnes i sont NULL sur sa ligne.",
        "COUNT(i.id) mesure les inscriptions réelles et donne zéro pour Yao."
      ],
      "expected_result": {
        "columns": [
          "membre_id",
          "membre",
          "inscriptions"
        ],
        "values": [
          [
            1,
            "Afi",
            2
          ],
          [
            2,
            "Kossi",
            1
          ],
          [
            3,
            "Mina",
            1
          ],
          [
            4,
            "Lina",
            1
          ],
          [
            5,
            "Yao",
            0
          ]
        ]
      }
    },
    {
      "fixture": "club",
      "expected_output": "Cinq bilans : Afi→2, Kossi→0, Mina→0, Lina→1, Yao→0.",
      "trace_fr": [
        "La condition de jointure cherche uniquement des confirmations.",
        "Les membres avec des attentes seulement restent dans le résultat.",
        "Leurs colonnes droites sont NULL faute de confirmation correspondante.",
        "Le compte de clé donne zéro sans supprimer ces membres."
      ],
      "expected_result": {
        "columns": [
          "membre_id",
          "membre",
          "confirmations"
        ],
        "values": [
          [
            1,
            "Afi",
            2
          ],
          [
            2,
            "Kossi",
            0
          ],
          [
            3,
            "Mina",
            0
          ],
          [
            4,
            "Lina",
            1
          ],
          [
            5,
            "Yao",
            0
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Compter * après LEFT JOIN",
      "why_fr": "La ligne NULL conservée est comptée comme une inscription.",
      "fix_fr": "Compte la clé de l’inscription."
    },
    {
      "error": "Déplacer le statut de ON vers WHERE",
      "why_fr": "Les membres sans confirmation sont éliminés.",
      "fix_fr": "Place le filtre selon l’intention de conservation de la table gauche."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi COUNT(*) peut-il donner un à un membre sans inscription ?",
      "options": [
        "Une inscription est automatiquement créée.",
        "LEFT JOIN conserve une ligne complétée par NULL, que COUNT(*) compte.",
        "COUNT ignore toujours les clés primaires."
      ],
      "answer": 1,
      "explanation": "La ligne du résultat n’est pas forcément une ligne réelle de la table droite.",
      "id": "sql-m4-03-q1"
    },
    {
      "question": "Quelle expression compte ici les inscriptions réelles ?",
      "options": [
        "COUNT(m.nom) pour chaque groupe de membre.",
        "COUNT(*) dans tous les cas.",
        "COUNT(i.id), la clé droite non NULL sur une vraie inscription."
      ],
      "answer": 2,
      "explanation": "Le compte de clé distingue une correspondance de la ligne NULL conservée.",
      "id": "sql-m4-03-q2"
    },
    {
      "question": "Où placer le statut confirmé pour conserver tous les membres avec un compte éventuellement nul ?",
      "options": [
        "Dans ON avec la relation de clé.",
        "Dans WHERE sur i.statut sans autre modification.",
        "Dans le titre de la table."
      ],
      "answer": 0,
      "explanation": "Le filtre de correspondance doit laisser LEFT JOIN produire une ligne sans confirmation pour les personnes concernées.",
      "id": "sql-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "jointure externe gauche",
      "definition": "Association conservant toutes les lignes gauches, même sans correspondance droite."
    },
    {
      "term": "absence de correspondance",
      "definition": "Situation où la condition de jointure ne trouve aucune ligne droite."
    },
    {
      "term": "clé droite",
      "definition": "Identifiant de la table jointe, utilisé ici pour reconnaître une vraie correspondance."
    }
  ],
  "recap_fr": [
    "Conserver les lignes sans correspondance avec LEFT JOIN.",
    "Compter une clé droite pour obtenir les zéros exacts.",
    "Choisir ON ou WHERE selon l’intention du résultat."
  ],
  "tags": [
    "jointure externe gauche",
    "absence de correspondance",
    "clé droite"
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

Une jointure interne ne montre pas les membres sans inscription. Pour faire un bilan complet, nous voulons pourtant les conserver et leur attribuer un compte égal à zéro. LEFT JOIN garde toutes les lignes de la table placée à gauche. Lorsque sa condition ne trouve aucune ligne correspondante à droite, le résultat contient une ligne avec des valeurs NULL pour les colonnes droites. Cela n’insère pas une nouvelle inscription dans la table.

Cette ligne supplémentaire explique un piège de comptage. COUNT(*) compte les lignes du résultat de jointure, y compris celle construite pour un membre sans correspondance. Il donnerait donc un au lieu de zéro dans ce cas. COUNT(i.id) compte seulement les identifiants d’inscription non NULL. Comme i.id est une clé primaire qui identifie chaque inscription réelle, cette expression mesure correctement le nombre recherché après la jointure externe.

Pour montrer uniquement les membres sans inscription, ajoute WHERE i.id IS NULL après le LEFT JOIN. Ce test vise la clé droite, pas une information facultative comme la ville du membre. Une ville inconnue ne signifie pas absence d’inscription. Le schéma et le rôle des clés permettent donc de distinguer une absence de correspondance et une donnée inconnue présente dans une vraie ligne.

Le placement d’un filtre est également décisif. Pour compter les confirmations tout en gardant tous les membres, écris i.statut='confirmee' dans ON, avec la relation de clé. La jointure cherche alors des confirmations correspondantes et construit une ligne NULL si elle n’en trouve pas. Placer ce filtre dans WHERE éliminerait les lignes NULL après la jointure. Il éliminerait aussi un membre ayant seulement des inscriptions en attente, au lieu de le garder avec zéro confirmation.

ON et WHERE ne sont donc pas interchangeables. Un filtre dans WHERE peut être volontaire si tu veux seulement certaines correspondances ; il devient incorrect quand la question exige de garder toute la table gauche. Les exercices annoncent cette intention précisément et utilisent deux bases avec des personnes ou ateliers sans participation. Chaque exemple, essai et test reconstruit sa base temporaire ; rien n’est enregistré dans un serveur. Prédis d’abord une personne avec deux correspondances, puis une personne avec aucune. Pour chaque résultat, explique si la ligne vient d’une inscription réelle ou de la conservation de la ligne gauche, puis justifie le COUNT et le filtre choisis.

## Exemple guidé 1

```sql
SELECT m.id AS membre_id, m.nom AS membre, COUNT(i.id) AS inscriptions
FROM membres AS m
LEFT JOIN inscriptions AS i ON i.membre_id = m.id
GROUP BY m.id, m.nom
ORDER BY m.id ASC;
```

## Exemple guidé 2

```sql
SELECT m.id AS membre_id, m.nom AS membre, COUNT(i.id) AS confirmations
FROM membres AS m
LEFT JOIN inscriptions AS i
  ON i.membre_id = m.id AND i.statut = 'confirmee'
GROUP BY m.id, m.nom
ORDER BY m.id ASC;
```

