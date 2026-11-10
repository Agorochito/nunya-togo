---
{
  "id": "sqli-m2-03",
  "title_fr": "Requêtes récursives : chaînes et calendriers",
  "course": "sql-intermediaire",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "sqli-m2-02"
  ],
  "outcomes": [
    "Écrire une CTE récursive avec une partie de départ et une partie qui se répète.",
    "Remonter une chaîne de parrainage et générer une suite de jours."
  ],
  "idea_fr": "Une requête récursive se nourrit de ses propres résultats : elle part d’une ligne, puis ajoute à chaque tour les lignes qui en découlent.",
  "analogy_fr": "Pour retrouver ses ancêtres, on part de soi, puis de ses parents, puis des parents de ses parents, jusqu’à ce que personne ne soit plus connu.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "WITH RECURSIVE chaine(id, nom, parrain_id, niveau) AS (\n  SELECT id, nom, parrain_id, 0 FROM clients WHERE nom = 'Yao'\n  UNION ALL\n  SELECT c.id, c.nom, c.parrain_id, chaine.niveau + 1\n  FROM clients AS c JOIN chaine ON c.id = chaine.parrain_id\n)\nSELECT niveau, nom FROM chaine ORDER BY niveau;",
      "expected_output": "3 lignes (niveau, nom) : 0 | Yao ; 1 | Kossi ; 2 | Afi",
      "trace_fr": [
        "Départ : Yao, au niveau 0.",
        "Premier tour : son parrain Kossi.",
        "Deuxième tour : le parrain de Kossi, Afi.",
        "Afi n’a pas de parrain : la récursion s’arrête."
      ],
      "expected_result": {
        "columns": [
          "niveau",
          "nom"
        ],
        "values": [
          [
            0,
            "Yao"
          ],
          [
            1,
            "Kossi"
          ],
          [
            2,
            "Afi"
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "WITH RECURSIVE calendrier(jour) AS (\n  SELECT '2026-10-01'\n  UNION ALL\n  SELECT date(jour, '+1 day') FROM calendrier WHERE jour < '2026-10-05'\n)\nSELECT c.jour, COUNT(v.id) AS nb_ventes\nFROM calendrier AS c LEFT JOIN ventes AS v ON v.jour = c.jour\nGROUP BY c.jour\nORDER BY c.jour;",
      "expected_output": "5 lignes (jour, nb_ventes) : 2026-10-01 | 2 ; 2026-10-02 | 1 ; 2026-10-03 | 2 ; 2026-10-04 | 0 ; 2026-10-05 | 1",
      "trace_fr": [
        "Le calendrier produit cinq jours, du 1er au 5.",
        "LEFT JOIN garde les jours sans vente.",
        "COUNT(v.id) vaut 0 le 4 octobre."
      ],
      "expected_result": {
        "columns": [
          "jour",
          "nb_ventes"
        ],
        "values": [
          [
            "2026-10-01",
            2
          ],
          [
            "2026-10-02",
            1
          ],
          [
            "2026-10-03",
            2
          ],
          [
            "2026-10-04",
            0
          ],
          [
            "2026-10-05",
            1
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier ou mal placer la condition d’arrêt",
      "why_fr": "La requête tourne sans fin ou fait un tour de trop.",
      "fix_fr": "Écris une condition précise dans la partie récursive."
    },
    {
      "error": "Joindre dans le mauvais sens",
      "why_fr": "On descend vers les filleuls au lieu de remonter.",
      "fix_fr": "Remonter : c.id = chaine.parrain_id."
    },
    {
      "error": "Compter COUNT(*) après LEFT JOIN",
      "why_fr": "Un jour sans vente compte 1.",
      "fix_fr": "Compte une colonne de la table jointe, COUNT(v.id)."
    }
  ],
  "quiz": [
    {
      "question": "Que contient la partie de départ ?",
      "options": [
        "La condition d’arrêt",
        "Les premières lignes",
        "Le tri",
        "La jointure finale"
      ],
      "answer": 1,
      "explanation": "Elle amorce la récursion.",
      "id": "sqli-m2-03-q1"
    },
    {
      "question": "Quand la récursion s’arrête-t-elle ?",
      "options": [
        "Après 10 tours",
        "Quand la partie récursive ne produit plus de lignes",
        "Jamais",
        "Au premier NULL"
      ],
      "answer": 1,
      "explanation": "Sans nouvelles lignes, il n’y a plus de tour.",
      "id": "sqli-m2-03-q2"
    },
    {
      "question": "Pourquoi générer un calendrier ?",
      "options": [
        "Pour décorer",
        "Pour faire apparaître les jours sans vente",
        "Pour supprimer des ventes",
        "Pour trier"
      ],
      "answer": 1,
      "explanation": "Les jours absents des tables apparaissent avec zéro.",
      "id": "sqli-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "CTE récursive",
      "definition": "Expression WITH RECURSIVE qui réutilise ses propres résultats."
    },
    {
      "term": "partie de départ",
      "definition": "Requête qui fournit les premières lignes de la récursion."
    },
    {
      "term": "condition d’arrêt",
      "definition": "Condition qui empêche la récursion de continuer sans fin."
    },
    {
      "term": "parrainage",
      "definition": "Lien entre un client et celui qui l’a recommandé."
    }
  ],
  "recap_fr": [
    "Écrire une CTE récursive avec une partie de départ et une partie qui se répète.",
    "Remonter une chaîne de parrainage et générer une suite de jours.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "CTE récursive",
    "partie de départ",
    "condition d’arrêt",
    "parrainage"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "SQL réel dans SQLite/sql.js, auto-hébergé dans un Worker du navigateur, sans connexion distante. Données fictives de la boutique d’un quartier. Chaque exemple, essai et test reconstruit sa base initiale ; le code et la progression sont sauvegardés, pas les modifications de la base temporaire. Disponible hors ligne après téléchargement.",
  "references": [
    {
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html"
    },
    {
      "title": "SQLite — dates et heures",
      "url": "https://www.sqlite.org/lang_datefunc.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — WITH et requêtes récursives",
      "url": "https://www.sqlite.org/lang_with.html",
      "scope": "Expressions de table communes. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "SQLite — dates et heures",
      "url": "https://www.sqlite.org/lang_datefunc.html",
      "scope": "date, strftime et julianday. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Certaines questions ont une profondeur inconnue. Dans la boutique, un client peut avoir été recommandé par un parrain, lui-même recommandé par un autre client. Qui est à l’origine de la chaîne de recommandation de Yao ? Une jointure ne remonte qu’un niveau ; deux jointures, deux niveaux. On ne sait pas combien il en faut. La CTE récursive résout ce problème.

Elle s’écrit WITH RECURSIVE nom(colonnes) AS (partie de départ UNION ALL partie récursive). La partie de départ est une requête ordinaire qui fournit les premières lignes, par exemple le client Yao. La partie récursive fait référence au nom de la CTE elle-même : elle prend les lignes produites au tour précédent et calcule les suivantes, par exemple le parrain de chaque client trouvé. SQLite répète cette partie tant qu’elle produit de nouvelles lignes ; quand elle n’en produit plus, la récursion s’arrête.

Pour remonter une chaîne, la partie récursive joint la table des clients à la CTE : clients.id = chaine.parrain_id. On ajoute souvent une colonne niveau, qui vaut 0 au départ et augmente de 1 à chaque tour. Elle indique la distance dans la chaîne et permet de trier le résultat.

Le second usage classique est de générer des données. Une CTE qui part du 2026-10-01 et ajoute un jour tant que la date reste inférieure au 2026-10-10 produit un calendrier de dix jours. On peut ensuite le joindre à gauche avec les ventes pour voir aussi les jours sans vente, qui n’apparaissent dans aucune table. C’est une technique précieuse pour les graphiques : un jour sans vente doit figurer avec zéro, pas disparaître.

La condition d’arrêt est essentielle. Une partie récursive sans limite tourne sans fin, et SQLite finit par atteindre une limite de mémoire ou de temps. Il faut une condition dans le WHERE de la partie récursive, comme jour < '2026-10-10', ou une donnée qui finit par manquer, comme un parrain NULL. Par prudence, on ajoute souvent une limite de profondeur, niveau < 20, qui protège aussi contre des données circulaires : deux clients qui seraient par erreur parrains l’un de l’autre.

Utilise UNION ALL entre les deux parties : il est plus rapide que UNION, et les données d’une chaîne ou d’un calendrier ne produisent pas de doublons. UNION, qui retire les doublons, peut toutefois servir à arrêter une boucle sur des données circulaires.

## Exemple guidé 1

```sql
WITH RECURSIVE chaine(id, nom, parrain_id, niveau) AS (
  SELECT id, nom, parrain_id, 0 FROM clients WHERE nom = 'Yao'
  UNION ALL
  SELECT c.id, c.nom, c.parrain_id, chaine.niveau + 1
  FROM clients AS c JOIN chaine ON c.id = chaine.parrain_id
)
SELECT niveau, nom FROM chaine ORDER BY niveau;
```

Résultat attendu : 3 lignes (niveau, nom) : 0 | Yao ; 1 | Kossi ; 2 | Afi

Trace :

- Départ : Yao, au niveau 0.
- Premier tour : son parrain Kossi.
- Deuxième tour : le parrain de Kossi, Afi.
- Afi n’a pas de parrain : la récursion s’arrête.

## Exemple guidé 2

```sql
WITH RECURSIVE calendrier(jour) AS (
  SELECT '2026-10-01'
  UNION ALL
  SELECT date(jour, '+1 day') FROM calendrier WHERE jour < '2026-10-05'
)
SELECT c.jour, COUNT(v.id) AS nb_ventes
FROM calendrier AS c LEFT JOIN ventes AS v ON v.jour = c.jour
GROUP BY c.jour
ORDER BY c.jour;
```

Résultat attendu : 5 lignes (jour, nb_ventes) : 2026-10-01 | 2 ; 2026-10-02 | 1 ; 2026-10-03 | 2 ; 2026-10-04 | 0 ; 2026-10-05 | 1

Trace :

- Le calendrier produit cinq jours, du 1er au 5.
- LEFT JOIN garde les jours sans vente.
- COUNT(v.id) vaut 0 le 4 octobre.

## Vérifier et expliquer

Dessine la chaîne de parrainage de la base sous forme d’arbre, puis vérifie que ta requête retrouve les mêmes niveaux.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — WITH et requêtes récursives](https://www.sqlite.org/lang_with.html)
- [SQLite — dates et heures](https://www.sqlite.org/lang_datefunc.html)
