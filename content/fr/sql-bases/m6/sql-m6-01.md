---
{
  "id": "sql-m6-01",
  "title_fr": "Valider ou annuler un groupe d’écritures",
  "course": "sql-bases",
  "module": "m6",
  "order": 16,
  "minutes": 20,
  "prerequisites": [
    "sql-m5-03"
  ],
  "outcomes": [
    "Délimiter et fermer une transaction avec une décision explicite.",
    "Observer un état provisoire puis sa validation ou son annulation."
  ],
  "idea_fr": "Délimiter et fermer une transaction avec une décision explicite.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "Après COMMIT, l’atelier 1 possède 5 places dans cet essai.",
      "trace_fr": [
        "BEGIN ouvre le groupe.",
        "La quantité passe de quatre à cinq.",
        "COMMIT conserve cet état pour la lecture qui suit."
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
      "expected_output": "Trois tableaux successifs pour id 1 : places 4, puis 7, puis 4.",
      "trace_fr": [
        "La première lecture constate quatre.",
        "L’augmentation provisoire donne sept.",
        "ROLLBACK restaure quatre, ce que confirme la dernière lecture."
      ],
      "fixture": "club"
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire que BEGIN neutralise les contraintes",
      "why_fr": "Les références immédiates restent vérifiées pendant les écritures.",
      "fix_fr": "Crée la ligne référencée avant la ligne qui la référence."
    },
    {
      "error": "Valider au lieu d’annuler",
      "why_fr": "COMMIT conserve les changements alors que le contrat exige le retour initial.",
      "fix_fr": "Choisis ROLLBACK et relis les données après cette décision."
    }
  ],
  "quiz": [
    {
      "question": "COMMIT sauvegarde-t-il les lignes pour le prochain essai Nunya ?",
      "options": [
        "Oui, dans tous les autres cours.",
        "Non ; la prochaine base est réinitialisée.",
        "Oui, sur un serveur distant."
      ],
      "answer": 1,
      "explanation": "COMMIT valide dans la base courante ; la remise à zéro pédagogique reste une règle distincte.",
      "id": "sql-m6-01-q1"
    },
    {
      "question": "Pourquoi exiger trois SELECT dans l’exercice ROLLBACK ?",
      "options": [
        "Pour observer la modification provisoire puis la restauration.",
        "Pour compter trois transactions.",
        "Pour éviter une vraie écriture."
      ],
      "answer": 0,
      "explanation": "Un état final inchangé pourrait aussi provenir d’un script qui ne fait rien.",
      "id": "sql-m6-01-q2"
    },
    {
      "question": "Une erreur annule-t-elle toujours toute la transaction ?",
      "options": [
        "Oui, sans exception.",
        "Elle force toujours COMMIT.",
        "Non, cela dépend de l’erreur et de sa politique."
      ],
      "answer": 2,
      "explanation": "Il faut examiner l’erreur et ne pas confondre annulation d’une instruction et annulation du groupe.",
      "id": "sql-m6-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "transaction",
      "definition": "Groupe d’opérations délimité par une validation ou une annulation."
    },
    {
      "term": "COMMIT",
      "definition": "Validation des changements de la transaction courante."
    },
    {
      "term": "ROLLBACK",
      "definition": "Annulation des changements de la transaction courante."
    }
  ],
  "recap_fr": [
    "Délimiter et fermer une transaction avec une décision explicite.",
    "Observer un état provisoire puis sa validation ou son annulation.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "transaction",
    "COMMIT",
    "ROLLBACK"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
    {
      "title": "SQLite — transactions",
      "url": "https://www.sqlite.org/lang_transaction.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — savepoints",
      "url": "https://www.sqlite.org/lang_savepoint.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Une opération de gestion peut réunir plusieurs écritures liées. Pour préparer une nouvelle activité fictive, on crée un atelier puis une inscription qui le référence. Il serait gênant de garder seulement une partie de ce travail si l’on décide de l’abandonner. Une transaction délimite un groupe de changements. BEGIN ouvre une transaction explicite ; COMMIT valide le groupe ; ROLLBACK annule ses modifications depuis le début de cette transaction.

SQLite utilise aussi des transactions automatiques : une instruction qui accède à la base démarre normalement une transaction si aucune n’existe, puis cette transaction se termine lorsque l’instruction est achevée. L’intérêt du BEGIN explicite est de réunir plusieurs instructions dans le même groupe. Il ne faut donc pas dire que des écritures sans BEGIN ne sont jamais transactionnelles. Nous utilisons ici une seule connexion dans une base temporaire ; nous n’étudions pas encore les accès simultanés de plusieurs personnes.

Pendant la transaction, un SELECT sur cette même connexion peut voir les changements provisoires. Pour comprendre ROLLBACK, lis une quantité avant la modification, augmente-la, puis relis-la avant l’annulation. Après ROLLBACK, une dernière lecture retrouve la quantité initiale. Trois résultats successifs montrent une expérience réelle : état de départ, état provisoire et état restauré. Un script vide aurait certes laissé la base intacte, mais il n’aurait produit aucun de ces constats.

Une transaction de cette leçon doit toujours être fermée par COMMIT ou ROLLBACK. N’ouvre pas un second BEGIN à l’intérieur du premier : ces transactions ne s’emboîtent pas ainsi dans SQLite. Les savepoints utilisés intérieurement par le correcteur ont un mécanisme distinct ; tu n’as pas besoin de les écrire dans les exercices. Les contraintes continuent de s’appliquer pendant les opérations. Une erreur ne signifie pas automatiquement que toutes les instructions antérieures ont été annulées : la réaction dépend du type d’erreur et de sa politique. Ne valide pas aveuglément une transaction après un échec.

Les exercices fournissent des écritures valides et demandent une décision explicite sur leur fin. COMMIT conserve les changements dans la base de cet essai, pas sur un serveur et pas dans le prochain essai Nunya. ROLLBACK annule les écritures provisoires, mais ne retire pas les tableaux que tu as déjà observés dans la console. Les cas supplémentaires changent les valeurs initiales afin de vérifier que la trace suit réellement les données. Ton SQL et tes progrès restent sauvegardés ; la base temporaire, elle, est reconstruite à chaque lancement.

## Exemple guidé 1

```sql
-- Validation explicite dans la base de cet essai.
BEGIN;
UPDATE ateliers SET places=places+1 WHERE id=1;
COMMIT;
SELECT id,places FROM ateliers WHERE id=1;
```

## Exemple guidé 2

```sql
-- Trois observations : avant, provisoire, restauré.
BEGIN;
SELECT id,places FROM ateliers WHERE id=1 ORDER BY id;
UPDATE ateliers SET places = places + 3 WHERE id=1;
SELECT id,places FROM ateliers WHERE id=1 ORDER BY id;
ROLLBACK;
SELECT id,places FROM ateliers WHERE id=1 ORDER BY id;
```

