---
{
  "id": "sql-m3-01",
  "title_fr": "Résumer une sélection avec des agrégats",
  "course": "sql-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "sql-m2-03"
  ],
  "outcomes": [
    "Choisir COUNT, SUM, AVG, MIN ou MAX selon la question.",
    "Expliquer le résultat d’un agrégat sur vide ou avec NULL."
  ],
  "idea_fr": "Un agrégat combine plusieurs lignes ; la fonction choisie détermine notamment ce qui arrive avec NULL ou un ensemble vide.",
  "analogy_fr": "Au lieu de recopier chaque fiche, tu prépares un bilan : combien de fiches, quel total et quelles limites.",
  "examples": [
    {
      "fixture": "club",
      "expected_output": "Une ligne : membres=5, villes_renseignees=4.",
      "trace_fr": [
        "La table fournit cinq lignes.",
        "COUNT(*) conserve chaque ligne dans le compte.",
        "COUNT(ville) ignore la valeur NULL de Mina.",
        "Les deux nombres décrivent des questions différentes."
      ],
      "expected_result": {
        "columns": [
          "membres",
          "villes_renseignees"
        ],
        "values": [
          [
            5,
            4
          ]
        ]
      }
    },
    {
      "fixture": "club",
      "expected_output": "Une ligne : nombre=0, total=NULL, moyenne=NULL.",
      "trace_fr": [
        "La sélection ne garde aucun atelier car les places ne sont jamais négatives.",
        "L’agrégat global produit néanmoins une ligne de bilan.",
        "COUNT vaut zéro ; SUM et AVG n’ont aucune valeur à combiner.",
        "ROUND ne transforme pas la moyenne absente en zéro."
      ],
      "expected_result": {
        "columns": [
          "nombre",
          "total",
          "moyenne"
        ],
        "values": [
          [
            0,
            null,
            null
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Compter une colonne facultative pour compter les lignes",
      "why_fr": "Les NULL sont omis du compte.",
      "fix_fr": "Choisis COUNT(*) pour les membres."
    },
    {
      "error": "Remplacer toute moyenne NULL par zéro",
      "why_fr": "Une absence est prise pour une observation nulle.",
      "fix_fr": "Applique seulement la convention explicitement demandée."
    }
  ],
  "quiz": [
    {
      "question": "COUNT(ville) compte-t-il un membre dont ville est NULL ?",
      "options": [
        "Oui, toujours comme COUNT(*).",
        "Non, et le membre est supprimé de la table.",
        "Non, cette expression ne compte que les villes non NULL."
      ],
      "answer": 2,
      "explanation": "La fonction choisit ce qu’elle compte sans modifier les données.",
      "id": "sql-m3-01-q1"
    },
    {
      "question": "Que donne SUM sur aucune valeur dans SQLite ?",
      "options": [
        "NULL.",
        "Toujours zéro.",
        "Une ligne supprimée du schéma."
      ],
      "answer": 0,
      "explanation": "SUM n’a aucune valeur à combiner ; COALESCE peut exprimer une autre convention si la consigne la demande.",
      "id": "sql-m3-01-q2"
    },
    {
      "question": "Pourquoi garder un prix zéro dans AVG(prix) ?",
      "options": [
        "AVG ignore automatiquement tous les zéros.",
        "C’est une valeur renseignée, distincte d’une absence.",
        "Le zéro indique toujours un prix inconnu."
      ],
      "answer": 1,
      "explanation": "La moyenne doit respecter le sens des données et la distinction entre zéro et NULL.",
      "id": "sql-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "agrégat",
      "definition": "Fonction qui combine des valeurs de plusieurs lignes."
    },
    {
      "term": "moyenne",
      "definition": "Somme des valeurs divisée par leur nombre dans le calcul considéré."
    },
    {
      "term": "ensemble vide",
      "definition": "Sélection ne contenant aucune ligne."
    }
  ],
  "recap_fr": [
    "Choisir COUNT, SUM, AVG, MIN ou MAX selon la question.",
    "Expliquer le résultat d’un agrégat sur vide ou avec NULL.",
    "Nommer les colonnes et appliquer un arrondi annoncé."
  ],
  "tags": [
    "agrégat",
    "moyenne",
    "ensemble vide"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "SQL réel dans SQLite/sql.js, auto-hébergé dans un Worker du navigateur, sans connexion distante. Données fictives. Chaque exemple, essai et test reconstruit sa base initiale ; le code et la progression peuvent être sauvegardés, pas les modifications de la base temporaire. Disponible hors ligne après téléchargement.",
  "sources": [
    {
      "title": "SQLite — Fonctions d’agrégation",
      "url": "https://www.sqlite.org/lang_aggfunc.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — SELECT et traitement des résultats",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Le club fictif possède des membres et des ateliers. Une recherche détaillée renvoie leurs lignes ; un bilan pose une autre question : combien de membres existent, combien de places sont annoncées ou quel est le prix moyen ? Les fonctions d’agrégation combinent les valeurs de plusieurs lignes. Dans cette première leçon, nous les utilisons sans GROUP BY : le résultat est un bilan global, généralement une seule ligne, même lorsque la sélection ne contient aucune donnée.

COUNT(*) compte les lignes sélectionnées. COUNT(ville) compte seulement les lignes où ville n’est pas NULL. La différence est importante : une ville inconnue n’efface pas le membre. Sur les données de départ, cinq membres existent mais quatre villes seulement sont renseignées. La même distinction vaut pour toute expression donnée à COUNT. Choisis donc ce que le nombre est censé représenter avant de choisir sa forme.

SUM additionne des valeurs ; AVG calcule leur moyenne ; MIN et MAX trouvent une plus petite ou une plus grande valeur. Ces fonctions ignorent les valeurs NULL parmi leurs entrées. Avec nos colonnes places et prix, les contraintes fournies interdisent NULL. Un prix égal à zéro reste une vraie valeur : il participe à la moyenne et ne signifie pas un prix inconnu. Les montants de l’atelier sont des entiers fictifs en FCFA, sans paiement ni conseil financier.

Sur un ensemble vide, COUNT produit zéro. Dans SQLite, SUM, AVG, MIN et MAX produisent NULL quand aucune valeur non NULL n’est disponible. Cette absence n’a pas toujours le même sens qu’un zéro. COALESCE(SUM(places),0) peut traduire une décision explicite de bilan, mais remplacer automatiquement une moyenne absente par zéro inventerait une observation. ROUND(AVG(prix),2) arrondit l’affichage numérique à deux décimales selon la consigne ; il ne crée pas de données manquantes.

WHERE continue de choisir les lignes avant le calcul. Pour le minimum d’âge des adultes, filtre d’abord age>=18 puis agrège. Donne des alias précis aux colonnes pour que le résultat soit compréhensible et vérifiable. Une seule ligne d’agrégats ne nécessite pas de tri ; les résultats à plusieurs lignes demanderont toujours un ordre explicite. Chaque exemple et chaque test reconstruit sa base temporaire : tes requêtes ne se connectent pas à un serveur et ne changent pas durablement les données. Prédis les cas normal et vide, puis explique ce que chaque nombre compte réellement.

## Exemple guidé 1

```sql
SELECT COUNT(*) AS membres, COUNT(ville) AS villes_renseignees
FROM membres;
```

## Exemple guidé 2

```sql
SELECT COUNT(*) AS nombre, SUM(places) AS total,
       ROUND(AVG(prix),2) AS moyenne
FROM ateliers
WHERE places < 0;
```

