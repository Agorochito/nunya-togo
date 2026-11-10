---
{
  "id": "sqli-m3-03",
  "title_fr": "Comparer à la ligne précédente avec LAG et LEAD",
  "course": "sql-intermediaire",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "sqli-m3-02"
  ],
  "outcomes": [
    "Lire la valeur de la ligne précédente ou suivante avec LAG et LEAD.",
    "Calculer des écarts dans le temps : jours entre deux achats, évolution d’un jour à l’autre."
  ],
  "idea_fr": "LAG regarde en arrière, LEAD regarde en avant ; ensemble, ils transforment une liste d’événements en histoire avec des écarts.",
  "analogy_fr": "Pour savoir si un enfant grandit vite, on compare sa taille à celle de la visite précédente, pas seulement à la moyenne de la classe.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "WITH par_jour AS (\n  SELECT v.jour, SUM(v.quantite * p.prix) AS ca\n  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id\n  GROUP BY v.jour\n)\nSELECT jour, ca,\n       LAG(ca) OVER (ORDER BY jour) AS veille,\n       ca - LAG(ca) OVER (ORDER BY jour) AS ecart\nFROM par_jour\nORDER BY jour;",
      "expected_output": "7 lignes (jour, ca, veille, ecart) : 2026-10-01 | 2450 | NULL | NULL ; 2026-10-02 | 1000 | 2450 | -1450 ; 2026-10-03 | 2400 | 1000 | 1400 ; 2026-10-05 | 1800 | 2400 | -600 ; 2026-10-06 | 2400 | 1800 | 600 ; 2026-10-07 | 1000 | 2400 | -1400 ; 2026-10-08 | 600 | 1000 | -400",
      "trace_fr": [
        "LAG lit le chiffre de la ligne précédente.",
        "La première ligne n’a pas de précédente : NULL.",
        "L’écart montre la hausse ou la baisse."
      ],
      "expected_result": {
        "columns": [
          "jour",
          "ca",
          "veille",
          "ecart"
        ],
        "values": [
          [
            "2026-10-01",
            2450,
            null,
            null
          ],
          [
            "2026-10-02",
            1000,
            2450,
            -1450
          ],
          [
            "2026-10-03",
            2400,
            1000,
            1400
          ],
          [
            "2026-10-05",
            1800,
            2400,
            -600
          ],
          [
            "2026-10-06",
            2400,
            1800,
            600
          ],
          [
            "2026-10-07",
            1000,
            2400,
            -1400
          ],
          [
            "2026-10-08",
            600,
            1000,
            -400
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT client_id, jour,\n       LAG(jour) OVER (PARTITION BY client_id ORDER BY jour, id) AS achat_precedent\nFROM ventes\nWHERE client_id IS NOT NULL\nORDER BY client_id, jour, id;",
      "expected_output": "8 lignes (client_id, jour, achat_precedent) : 1 | 2026-10-01 | NULL ; 1 | 2026-10-03 | 2026-10-01 ; 1 | 2026-10-07 | 2026-10-03 ; 2 | 2026-10-01 | NULL ; 2 | 2026-10-05 | 2026-10-01 ; 3 | 2026-10-03 | NULL ; 3 | 2026-10-08 | 2026-10-03 ; 4 | 2026-10-06 | NULL",
      "trace_fr": [
        "La fenêtre est découpée par client.",
        "Chaque achat reçoit la date du précédent du même client.",
        "Le premier achat de chaque client reçoit NULL."
      ],
      "expected_result": {
        "columns": [
          "client_id",
          "jour",
          "achat_precedent"
        ],
        "values": [
          [
            1,
            "2026-10-01",
            null
          ],
          [
            1,
            "2026-10-03",
            "2026-10-01"
          ],
          [
            1,
            "2026-10-07",
            "2026-10-03"
          ],
          [
            2,
            "2026-10-01",
            null
          ],
          [
            2,
            "2026-10-05",
            "2026-10-01"
          ],
          [
            3,
            "2026-10-03",
            null
          ],
          [
            3,
            "2026-10-08",
            "2026-10-03"
          ],
          [
            4,
            "2026-10-06",
            null
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser LAG sans PARTITION BY pour des clients",
      "why_fr": "On compare des achats de clients différents.",
      "fix_fr": "Ajoute PARTITION BY client_id."
    },
    {
      "error": "Filtrer LAG dans WHERE",
      "why_fr": "SQLite refuse les fenêtres dans WHERE.",
      "fix_fr": "Calcule dans une étape WITH, filtre ensuite."
    },
    {
      "error": "Ordre ambigu",
      "why_fr": "Deux lignes de même date s’échangent au hasard.",
      "fix_fr": "Ajoute un critère unique, comme id."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie LAG pour la première ligne de sa fenêtre ?",
      "options": [
        "0",
        "NULL",
        "La même valeur",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Il n’y a pas de ligne précédente.",
      "id": "sqli-m3-03-q1"
    },
    {
      "question": "Que fait LEAD(x) ?",
      "options": [
        "Lit la ligne précédente",
        "Lit la ligne suivante",
        "Classe les lignes",
        "Calcule un cumul"
      ],
      "answer": 1,
      "explanation": "LEAD regarde vers l’avant.",
      "id": "sqli-m3-03-q2"
    },
    {
      "question": "Que fait le troisième argument de LAG(ca, 1, 0) ?",
      "options": [
        "Décale de 0",
        "Remplace NULL par 0",
        "Trie",
        "Rien"
      ],
      "answer": 1,
      "explanation": "C’est la valeur par défaut.",
      "id": "sqli-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "LAG",
      "definition": "Fonction de fenêtre qui lit une ligne précédente."
    },
    {
      "term": "LEAD",
      "definition": "Fonction de fenêtre qui lit une ligne suivante."
    },
    {
      "term": "écart",
      "definition": "Différence entre une valeur et la valeur précédente."
    },
    {
      "term": "fidélité",
      "definition": "Régularité des achats d’un même client."
    }
  ],
  "recap_fr": [
    "Lire la valeur de la ligne précédente ou suivante avec LAG et LEAD.",
    "Calculer des écarts dans le temps : jours entre deux achats, évolution d’un jour à l’autre.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "LAG",
    "LEAD",
    "écart",
    "fidélité"
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
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html"
    },
    {
      "title": "SQLite — dates et heures",
      "url": "https://www.sqlite.org/lang_datefunc.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — fonctions de fenêtre",
      "url": "https://www.sqlite.org/windowfunctions.html",
      "scope": "OVER, PARTITION BY, cadres et fonctions de rang. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
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

Beaucoup de questions portent sur l’évolution. Le chiffre d’affaires a-t-il augmenté par rapport à la veille ? Combien de jours séparent deux achats d’un même client ? Sans fonctions de fenêtre, il faudrait joindre la table à elle-même avec des conditions compliquées. LAG et LEAD règlent cela en une ligne.

LAG(colonne) OVER (ORDER BY …) renvoie la valeur de la colonne dans la ligne précédente, selon l’ordre de la fenêtre. Pour la première ligne, il n’y a pas de précédente : LAG renvoie NULL. LEAD fait la même chose avec la ligne suivante, et renvoie NULL pour la dernière. Un deuxième argument indique de combien de lignes regarder : LAG(ca, 7) regarde sept lignes en arrière. Un troisième fournit une valeur par défaut à la place de NULL : LAG(ca, 1, 0).

Avec PARTITION BY, la comparaison reste dans le groupe. LAG(jour) OVER (PARTITION BY client_id ORDER BY jour, id) donne, pour chaque achat, la date de l’achat précédent du même client ; le premier achat de chaque client reçoit NULL. Associé à julianday, on obtient le nombre de jours entre deux achats, un indicateur de fidélité utile pour une boutique.

Pour calculer un écart, on soustrait : ca - LAG(ca) OVER (ORDER BY jour). Le premier jour obtient NULL, ce qui est juste : il n’y a pas d’évolution à mesurer. Pour une évolution en pourcentage, on divise l’écart par la valeur précédente, en pensant à 100.0 pour obtenir une division décimale, et à ROUND pour l’affichage.

Comme pour les rangs, LAG et LEAD ne peuvent pas apparaître dans WHERE. Pour garder seulement les jours en baisse, on calcule l’écart dans une étape WITH, puis on filtre dans la requête finale. Et comme toujours, un ORDER BY final fixe l’ordre affiché.

Ces fonctions supposent que l’ordre de la fenêtre a un sens. Si deux lignes ont la même date, l’ordre entre elles est arbitraire et le résultat peut changer d’une exécution à l’autre ; ajoute un second critère, comme l’identifiant de vente. Et souviens-toi que la ligne précédente n’est pas forcément le jour précédent du calendrier : s’il n’y a pas eu de vente le 4, la ligne précédant le 5 est le 3. C’est souvent ce qu’on veut ; sinon, joins d’abord un calendrier complet.

## Exemple guidé 1

```sql
WITH par_jour AS (
  SELECT v.jour, SUM(v.quantite * p.prix) AS ca
  FROM ventes AS v JOIN produits AS p ON p.id = v.produit_id
  GROUP BY v.jour
)
SELECT jour, ca,
       LAG(ca) OVER (ORDER BY jour) AS veille,
       ca - LAG(ca) OVER (ORDER BY jour) AS ecart
FROM par_jour
ORDER BY jour;
```

Résultat attendu : 7 lignes (jour, ca, veille, ecart) : 2026-10-01 | 2450 | NULL | NULL ; 2026-10-02 | 1000 | 2450 | -1450 ; 2026-10-03 | 2400 | 1000 | 1400 ; 2026-10-05 | 1800 | 2400 | -600 ; 2026-10-06 | 2400 | 1800 | 600 ; 2026-10-07 | 1000 | 2400 | -1400 ; 2026-10-08 | 600 | 1000 | -400

Trace :

- LAG lit le chiffre de la ligne précédente.
- La première ligne n’a pas de précédente : NULL.
- L’écart montre la hausse ou la baisse.

## Exemple guidé 2

```sql
SELECT client_id, jour,
       LAG(jour) OVER (PARTITION BY client_id ORDER BY jour, id) AS achat_precedent
FROM ventes
WHERE client_id IS NOT NULL
ORDER BY client_id, jour, id;
```

Résultat attendu : 8 lignes (client_id, jour, achat_precedent) : 1 | 2026-10-01 | NULL ; 1 | 2026-10-03 | 2026-10-01 ; 1 | 2026-10-07 | 2026-10-03 ; 2 | 2026-10-01 | NULL ; 2 | 2026-10-05 | 2026-10-01 ; 3 | 2026-10-03 | NULL ; 3 | 2026-10-08 | 2026-10-03 ; 4 | 2026-10-06 | NULL

Trace :

- La fenêtre est découpée par client.
- Chaque achat reçoit la date du précédent du même client.
- Le premier achat de chaque client reçoit NULL.

## Vérifier et expliquer

Pour un client, liste ses achats à la main avec la date précédente, puis compare avec ta requête.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — fonctions de fenêtre](https://www.sqlite.org/windowfunctions.html)
- [SQLite — dates et heures](https://www.sqlite.org/lang_datefunc.html)
