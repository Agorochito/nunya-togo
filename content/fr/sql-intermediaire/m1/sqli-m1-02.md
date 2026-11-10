---
{
  "id": "sqli-m1-02",
  "title_fr": "Transformer textes et dates",
  "course": "sql-intermediaire",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "sqli-m1-01"
  ],
  "outcomes": [
    "Utiliser les fonctions de texte : upper, lower, length, substr, replace et l’opérateur ||.",
    "Lire et calculer des dates avec date, strftime et julianday."
  ],
  "idea_fr": "Les fonctions transforment une valeur avant de l’afficher, de la comparer ou de la regrouper ; les dates s’y manipulent comme des textes au format AAAA-MM-JJ.",
  "analogy_fr": "Le couturier ne change pas le tissu de son client : il l’ajuste, le raccourcit, le coud avec un autre. Les fonctions ajustent les valeurs sans toucher la table.",
  "examples": [
    {
      "fixture": "boutique",
      "code": "SELECT nom || ' (' || categorie || ')' AS etiquette,\n       upper(substr(nom, 1, 3)) AS code,\n       length(nom) AS longueur\nFROM produits\nORDER BY id\nLIMIT 3;",
      "expected_output": "3 lignes (etiquette, code, longueur) : Riz 1 kg (épicerie) | RIZ | 8 ; Huile 1 L (épicerie) | HUI | 9 ; Savon (hygiène) | SAV | 5",
      "trace_fr": [
        "|| assemble le nom et la catégorie.",
        "substr garde les trois premiers caractères, upper les met en capitales.",
        "length compte les caractères du nom."
      ],
      "expected_result": {
        "columns": [
          "etiquette",
          "code",
          "longueur"
        ],
        "values": [
          [
            "Riz 1 kg (épicerie)",
            "RIZ",
            8
          ],
          [
            "Huile 1 L (épicerie)",
            "HUI",
            9
          ],
          [
            "Savon (hygiène)",
            "SAV",
            5
          ]
        ]
      }
    },
    {
      "fixture": "boutique",
      "code": "SELECT jour,\n       strftime('%m', jour) AS mois,\n       date(jour, '+7 days') AS une_semaine_plus_tard,\n       julianday('2026-10-08') - julianday(jour) AS jours_avant_le_8\nFROM ventes\nWHERE id IN (1, 6, 10)\nORDER BY id;",
      "expected_output": "3 lignes (jour, mois, une_semaine_plus_tard, jours_avant_le_8) : 2026-10-01 | 10 | 2026-10-08 | 7.0 ; 2026-10-05 | 10 | 2026-10-12 | 3.0 ; 2026-10-08 | 10 | 2026-10-15 | 0.0",
      "trace_fr": [
        "strftime extrait le mois sous forme de texte.",
        "date ajoute 7 jours.",
        "julianday donne un écart en jours, à virgule."
      ],
      "expected_result": {
        "columns": [
          "jour",
          "mois",
          "une_semaine_plus_tard",
          "jours_avant_le_8"
        ],
        "values": [
          [
            "2026-10-01",
            "10",
            "2026-10-08",
            7.0
          ],
          [
            "2026-10-05",
            "10",
            "2026-10-12",
            3.0
          ],
          [
            "2026-10-08",
            "10",
            "2026-10-15",
            0.0
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Coller une valeur NULL",
      "why_fr": "Tout le texte devient NULL.",
      "fix_fr": "Entoure la colonne de coalesce."
    },
    {
      "error": "Croire que strftime renvoie un nombre",
      "why_fr": "Il renvoie du texte : '10' et non 10.",
      "fix_fr": "Compare avec du texte ou convertis avec CAST."
    },
    {
      "error": "Stocker des dates en JJ/MM/AAAA",
      "why_fr": "L’ordre alphabétique n’est plus chronologique.",
      "fix_fr": "Utilise le format ISO AAAA-MM-JJ."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie substr('Lomé', 2, 2) ?",
      "options": [
        "'Lo'",
        "'om'",
        "'mé'",
        "'o'"
      ],
      "answer": 1,
      "explanation": "On compte à partir de 1 : positions 2 et 3.",
      "id": "sqli-m1-02-q1"
    },
    {
      "question": "Que vaut 'Afi' || NULL ?",
      "options": [
        "'Afi'",
        "NULL",
        "'AfiNULL'",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Coller NULL donne NULL.",
      "id": "sqli-m1-02-q2"
    },
    {
      "question": "Que renvoie strftime('%Y-%m', '2026-10-03') ?",
      "options": [
        "'2026-10'",
        "202610",
        "'10-2026'",
        "'2026'"
      ],
      "answer": 0,
      "explanation": "Le format demande l’année et le mois.",
      "id": "sqli-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction",
      "definition": "Calcul qui renvoie une nouvelle valeur sans modifier la table."
    },
    {
      "term": "||",
      "definition": "Opérateur de concaténation de textes en SQL."
    },
    {
      "term": "format ISO",
      "definition": "Écriture AAAA-MM-JJ, triable comme du texte."
    },
    {
      "term": "julianday",
      "definition": "Fonction qui transforme une date en nombre de jours."
    }
  ],
  "recap_fr": [
    "Utiliser les fonctions de texte : upper, lower, length, substr, replace et l’opérateur ||.",
    "Lire et calculer des dates avec date, strftime et julianday.",
    "Toujours fixer l’ordre des résultats avec ORDER BY, y compris un critère de départage."
  ],
  "tags": [
    "sql",
    "sqlite",
    "intermédiaire",
    "fonction",
    "||",
    "format ISO",
    "julianday"
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
      "title": "SQLite — fonctions de base",
      "url": "https://www.sqlite.org/lang_corefunc.html"
    },
    {
      "title": "SQLite — dates et heures",
      "url": "https://www.sqlite.org/lang_datefunc.html"
    }
  ],
  "sources": [
    {
      "title": "SQLite — fonctions de base",
      "url": "https://www.sqlite.org/lang_corefunc.html",
      "scope": "Fonctions de texte et de nombres. Documentation primaire ; explications, requêtes et exercices originaux Nunya.",
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

Une fonction prend une ou plusieurs valeurs et en renvoie une nouvelle, sans modifier la table. Les fonctions de texte servent à présenter et à nettoyer. upper et lower changent la casse ; length compte les caractères ; substr(texte, debut, longueur) extrait un morceau, en comptant à partir de 1 ; replace(texte, ancien, nouveau) remplace toutes les occurrences ; instr(texte, morceau) donne la position d’un morceau, ou 0 s’il est absent. L’opérateur || colle deux textes : nom || ' (' || categorie || ')' produit Riz 1 kg (épicerie).

Attention à NULL : coller NULL à un texte donne NULL. Si un client n’a pas de quartier, nom || ' - ' || quartier disparaît entièrement. La fonction coalesce, vue au niveau précédent, remplace NULL par une valeur de secours : coalesce(quartier, 'inconnu').

SQLite n’a pas de type date à part. Dans cette base, les jours sont des textes au format ISO, AAAA-MM-JJ, comme 2026-10-03. Ce format a un grand avantage : l’ordre alphabétique est aussi l’ordre chronologique. On peut donc trier par jour et comparer avec < ou BETWEEN directement.

Pour calculer, SQLite fournit des fonctions de date. date(jour, '+7 days') ajoute sept jours ; date(jour, 'start of month') donne le premier jour du mois. strftime(format, jour) extrait une partie : '%Y' pour l’année, '%m' pour le mois, '%d' pour le jour, '%w' pour le jour de la semaine, de 0 pour dimanche à 6 pour samedi. Ces fonctions renvoient du texte : strftime('%m', '2026-10-03') donne '10', pas le nombre 10. Pour calculer un écart, julianday transforme une date en nombre de jours : julianday('2026-10-08') - julianday('2026-10-01') vaut 7.0.

Ces fonctions sont précieuses pour regrouper. GROUP BY strftime('%Y-%m', jour) regroupe les ventes par mois ; GROUP BY strftime('%w', jour) par jour de la semaine, pour savoir quel jour la boutique vend le plus.

Deux précautions. Une fonction appliquée à une colonne dans WHERE empêche souvent l’utilisation d’un index, comme on le verra au dernier module : sur de grosses tables, on préfère comparer la colonne brute à des bornes. Et les fonctions de texte de SQLite ne traitent la casse que pour les lettres sans accent : upper('é') reste é. Pour des comparaisons fiables sur des noms accentués, compare des valeurs déjà normalisées à la saisie.

## Exemple guidé 1

```sql
SELECT nom || ' (' || categorie || ')' AS etiquette,
       upper(substr(nom, 1, 3)) AS code,
       length(nom) AS longueur
FROM produits
ORDER BY id
LIMIT 3;
```

Résultat attendu : 3 lignes (etiquette, code, longueur) : Riz 1 kg (épicerie) | RIZ | 8 ; Huile 1 L (épicerie) | HUI | 9 ; Savon (hygiène) | SAV | 5

Trace :

- || assemble le nom et la catégorie.
- substr garde les trois premiers caractères, upper les met en capitales.
- length compte les caractères du nom.

## Exemple guidé 2

```sql
SELECT jour,
       strftime('%m', jour) AS mois,
       date(jour, '+7 days') AS une_semaine_plus_tard,
       julianday('2026-10-08') - julianday(jour) AS jours_avant_le_8
FROM ventes
WHERE id IN (1, 6, 10)
ORDER BY id;
```

Résultat attendu : 3 lignes (jour, mois, une_semaine_plus_tard, jours_avant_le_8) : 2026-10-01 | 10 | 2026-10-08 | 7.0 ; 2026-10-05 | 10 | 2026-10-12 | 3.0 ; 2026-10-08 | 10 | 2026-10-15 | 0.0

Trace :

- strftime extrait le mois sous forme de texte.
- date ajoute 7 jours.
- julianday donne un écart en jours, à virgule.

## Vérifier et expliquer

Prends une date de vente et calcule à la main son mois, son jour de semaine et la date une semaine plus tard, puis vérifie avec SQLite.

## Références techniques

Explications et activités originales Nunya. Syntaxe vérifiée dans la documentation officielle de SQLite :

- [SQLite — fonctions de base](https://www.sqlite.org/lang_corefunc.html)
- [SQLite — dates et heures](https://www.sqlite.org/lang_datefunc.html)
