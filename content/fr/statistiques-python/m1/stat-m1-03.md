---
{
  "id": "stat-m1-03",
  "title_fr": "Quartiles et valeurs aberrantes",
  "course": "statistiques-python",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "stat-m1-02"
  ],
  "outcomes": [
    "Calculer les quartiles et l’écart interquartile d’une série.",
    "Repérer les valeurs aberrantes avec la règle de 1,5 écart interquartile."
  ],
  "idea_fr": "Les quartiles coupent la série rangée en quatre parts égales ; ils décrivent le centre et la dispersion sans se laisser tromper par les extrêmes.",
  "analogy_fr": "Dans une file d’attente rangée par taille, on pourrait placer trois piquets qui séparent quatre groupes de même effectif. Le piquet du milieu est la médiane.",
  "examples": [
    {
      "code": "import statistics\n\nnotes = [6, 8, 9, 10, 11, 12, 13, 14, 19]\nprint(statistics.quantiles(notes, n=4, method=\"inclusive\"))",
      "expected_output": "[9.0, 11.0, 13.0]\n",
      "inputs": [],
      "trace_fr": [
        "Q1 vaut 9, la médiane 11 et Q3 13.",
        "La moitié centrale des notes est entre 9 et 13.",
        "L’écart interquartile vaut 4."
      ]
    },
    {
      "code": "import statistics\n\nventes = [12, 15, 14, 13, 16, 15, 14, 60]\nq1, _, q3 = statistics.quantiles(ventes, n=4, method=\"inclusive\")\necart = q3 - q1\nbas, haut = q1 - 1.5 * ecart, q3 + 1.5 * ecart\nprint(bas, haut)\nprint([v for v in ventes if v < bas or v > haut])",
      "expected_output": "11.5 17.5\n[60]\n",
      "inputs": [],
      "trace_fr": [
        "Q1 vaut 13,75 et Q3 15,25 : écart interquartile 1,5.",
        "Les bornes sont 11,5 et 17,5.",
        "La vente de 60 est signalée : à vérifier, pas à effacer."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Calculer Q3 − Q2 comme écart interquartile",
      "why_fr": "On ne mesure que la moitié haute.",
      "fix_fr": "L’écart interquartile est Q3 − Q1."
    },
    {
      "error": "Supprimer une valeur aberrante sans vérifier",
      "why_fr": "On perd une information réelle.",
      "fix_fr": "Vérifie d’abord : erreur de saisie ou fait réel ?"
    },
    {
      "error": "Ne pas préciser la méthode des quartiles",
      "why_fr": "Deux outils donnent des résultats différents.",
      "fix_fr": "Indique la méthode utilisée."
    }
  ],
  "quiz": [
    {
      "question": "Entre Q1 et Q3 se trouve…",
      "options": [
        "un quart des valeurs",
        "la moitié centrale des valeurs",
        "toutes les valeurs",
        "la moyenne seulement"
      ],
      "answer": 1,
      "explanation": "Deux quarts : de Q1 à Q3.",
      "id": "stat-m1-03-q1"
    },
    {
      "question": "Avec Q1 = 10 et Q3 = 14, quelle est la borne haute de Tukey ?",
      "options": [
        "14",
        "16",
        "20",
        "24"
      ],
      "answer": 2,
      "explanation": "14 + 1,5 × 4 = 20.",
      "id": "stat-m1-03-q2"
    },
    {
      "question": "Que faire d’une valeur aberrante ?",
      "options": [
        "La supprimer",
        "La vérifier avant toute décision",
        "La remplacer par la moyenne",
        "L’ignorer"
      ],
      "answer": 1,
      "explanation": "Elle peut être une erreur ou un fait réel.",
      "id": "stat-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "quartile",
      "definition": "Valeur qui coupe la série rangée en quarts."
    },
    {
      "term": "écart interquartile",
      "definition": "Différence Q3 − Q1, largeur de la moitié centrale."
    },
    {
      "term": "valeur aberrante",
      "definition": "Valeur très éloignée des autres, à vérifier."
    },
    {
      "term": "boîte à moustaches",
      "definition": "Dessin du résumé en cinq valeurs."
    }
  ],
  "recap_fr": [
    "Calculer les quartiles et l’écart interquartile d’une série.",
    "Repérer les valeurs aberrantes avec la règle de 1,5 écart interquartile.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "quartile",
    "écart interquartile",
    "valeur aberrante",
    "boîte à moustaches"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne, avec le module statistics de la bibliothèque standard. Les données (notes, ventes, relevés, enquêtes) sont fictives et inventées pour l’exercice.",
  "references": [
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    }
  ],
  "sources": [
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html",
      "scope": "Moyenne, médiane, mode, variance, écart-type et quantiles. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability",
      "scope": "Notions générales de statistique descriptive et de probabilités. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

La médiane coupe une série rangée en deux moitiés. Les quartiles vont plus loin : ils la coupent en quatre parts d’effectifs égaux. Le premier quartile, Q1, laisse environ un quart des valeurs au-dessous de lui ; le deuxième quartile est la médiane ; le troisième, Q3, laisse environ trois quarts des valeurs au-dessous. Entre Q1 et Q3 se trouve la moitié centrale des valeurs.

L’écart interquartile, Q3 − Q1, mesure la largeur de cette moitié centrale. Comme la médiane, il est robuste : les valeurs extrêmes n’ont aucune influence sur lui. C’est un bon complément à l’écart-type quand la série contient des valeurs exceptionnelles.

Il existe plusieurs conventions de calcul des quartiles, qui donnent des résultats légèrement différents sur de petites séries. Au lycée, on utilise souvent une définition par rang ; les tableurs et les logiciels de statistique en proposent d’autres. Le module statistics de Python fournit la fonction quantiles, qui renvoie les trois points de coupure avec n=4. Son option method="inclusive" correspond à la méthode des tableurs les plus courants ; la méthode par défaut, "exclusive", est pensée pour des échantillons. Dans ce cours, on utilise "inclusive", et l’important est de toujours préciser la méthode choisie.

Les quartiles servent à repérer les valeurs aberrantes, c’est-à-dire très éloignées des autres. Une règle très répandue, due au statisticien John Tukey, considère comme suspecte toute valeur inférieure à Q1 − 1,5 × (Q3 − Q1) ou supérieure à Q3 + 1,5 × (Q3 − Q1). Une valeur aberrante n’est pas forcément une erreur : un très bon élève, une très grosse commande, une journée de fête au marché. Mais elle mérite toujours d’être vérifiée : faute de frappe, unité différente, capteur défaillant. On ne la supprime jamais sans raison.

Ces cinq nombres, minimum, Q1, médiane, Q3 et maximum, forment le résumé en cinq valeurs. On le représente souvent par une boîte à moustaches : une boîte de Q1 à Q3 coupée par la médiane, et des traits jusqu’aux extrêmes. Ce dessin permet de comparer plusieurs séries d’un coup d’œil, par exemple les notes de plusieurs classes ou les prix de plusieurs marchés.

En pratique, on commence presque toujours une analyse en calculant ce résumé : il montre le centre, la dispersion, l’asymétrie et les valeurs suspectes, avant tout calcul plus élaboré.

## Exemple guidé 1

```python
import statistics

notes = [6, 8, 9, 10, 11, 12, 13, 14, 19]
print(statistics.quantiles(notes, n=4, method="inclusive"))
```

Affichage attendu :

    [9.0, 11.0, 13.0]

Trace :

- Q1 vaut 9, la médiane 11 et Q3 13.
- La moitié centrale des notes est entre 9 et 13.
- L’écart interquartile vaut 4.

## Exemple guidé 2

```python
import statistics

ventes = [12, 15, 14, 13, 16, 15, 14, 60]
q1, _, q3 = statistics.quantiles(ventes, n=4, method="inclusive")
ecart = q3 - q1
bas, haut = q1 - 1.5 * ecart, q3 + 1.5 * ecart
print(bas, haut)
print([v for v in ventes if v < bas or v > haut])
```

Affichage attendu :

    11.5 17.5
    [60]

Trace :

- Q1 vaut 13,75 et Q3 15,25 : écart interquartile 1,5.
- Les bornes sont 11,5 et 17,5.
- La vente de 60 est signalée : à vérifier, pas à effacer.

## Vérifier et expliquer

Calcule les quartiles d’une série de 8 valeurs avec les deux méthodes de quantiles et compare les résultats.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
