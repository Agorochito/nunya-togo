---
{
  "id": "stat-m3-02",
  "title_fr": "Le coefficient de corrélation et ses pièges",
  "course": "statistiques-python",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "stat-m3-01"
  ],
  "outcomes": [
    "Calculer le coefficient de corrélation linéaire et interpréter sa valeur entre −1 et 1.",
    "Éviter les pièges : corrélation n’est pas causalité, relations non linéaires, valeurs extrêmes."
  ],
  "idea_fr": "Le coefficient de corrélation mesure la force d’un lien linéaire, sans unité ; il ne dit jamais qui cause quoi.",
  "analogy_fr": "Quand il y a beaucoup de parapluies dans les rues, il y a beaucoup de flaques. Les parapluies ne créent pas les flaques : la pluie cause les deux.",
  "examples": [
    {
      "code": "import statistics\n\n\ndef covariance(xs, ys):\n    mx = sum(xs) / len(xs)\n    my = sum(ys) / len(ys)\n    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / len(xs)\n\n\ndef correlation(xs, ys):\n    return round(covariance(xs, ys) / (statistics.pstdev(xs) * statistics.pstdev(ys)), 3)\n\nprint(correlation([1, 2, 2, 3, 4, 5], [8, 9, 11, 12, 14, 15]))\nprint(correlation([1, 2, 3, 4], [2, 4, 6, 8]))",
      "expected_output": "0.967\n1.0\n",
      "inputs": [],
      "trace_fr": [
        "Révisions et notes sont fortement liées : r ≈ 0,97.",
        "Des points exactement alignés donnent r = 1.",
        "Le résultat ne dépend pas des unités."
      ]
    },
    {
      "code": "import statistics\n\n\ndef covariance(xs, ys):\n    mx = sum(xs) / len(xs)\n    my = sum(ys) / len(ys)\n    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / len(xs)\n\n\ndef correlation(xs, ys):\n    return round(covariance(xs, ys) / (statistics.pstdev(xs) * statistics.pstdev(ys)), 3)\n\narrosage = [1, 2, 3, 4, 5]\nrendement = [2, 6, 8, 6, 2]\nprint(correlation(arrosage, rendement))\nx = [1, 2, 3, 4, 5, 20]\ny = [3, 1, 4, 2, 3, 20]\nprint(correlation(x, y))",
      "expected_output": "0.0\n0.974\n",
      "inputs": [],
      "trace_fr": [
        "Relation en U : r est nul, pourtant le lien est net.",
        "Cinq points sans lien et un point extrême.",
        "Le point extrême fabrique un r de 0,97."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Conclure à une cause à partir d’une corrélation",
      "why_fr": "Un facteur caché peut expliquer les deux.",
      "fix_fr": "Cherche un facteur de confusion et un mécanisme."
    },
    {
      "error": "Calculer r sans regarder le nuage",
      "why_fr": "Une relation en U ou un point extrême trompe.",
      "fix_fr": "Dessine ou décris le nuage d’abord."
    },
    {
      "error": "Se fier à r sur très peu de points",
      "why_fr": "Le hasard peut créer une corrélation.",
      "fix_fr": "Augmente l’échantillon."
    }
  ],
  "quiz": [
    {
      "question": "Entre quelles valeurs est compris r ?",
      "options": [
        "0 et 1",
        "−1 et 1",
        "0 et 100",
        "Sans limite"
      ],
      "answer": 1,
      "explanation": "Le signe donne le sens, la valeur absolue la force.",
      "id": "stat-m3-02-q1"
    },
    {
      "question": "Ventes de ventilateurs et paludisme sont corrélés. Pourquoi ?",
      "options": [
        "Les ventilateurs transmettent le paludisme",
        "Une saison chaude et pluvieuse augmente les deux",
        "Par erreur de calcul",
        "Le paludisme fait acheter des ventilateurs"
      ],
      "answer": 1,
      "explanation": "Un facteur de confusion.",
      "id": "stat-m3-02-q2"
    },
    {
      "question": "r ≈ 0 signifie…",
      "options": [
        "aucun lien d’aucune sorte",
        "aucun lien linéaire",
        "un lien parfait",
        "une erreur"
      ],
      "answer": 1,
      "explanation": "Une relation en U peut donner r ≈ 0.",
      "id": "stat-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "coefficient de corrélation",
      "definition": "Covariance divisée par le produit des écarts-types, entre −1 et 1."
    },
    {
      "term": "causalité",
      "definition": "Relation où une variable provoque l’autre."
    },
    {
      "term": "facteur de confusion",
      "definition": "Variable cachée qui influence les deux variables étudiées."
    },
    {
      "term": "relation linéaire",
      "definition": "Relation résumée par une droite."
    }
  ],
  "recap_fr": [
    "Calculer le coefficient de corrélation linéaire et interpréter sa valeur entre −1 et 1.",
    "Éviter les pièges : corrélation n’est pas causalité, relations non linéaires, valeurs extrêmes.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "coefficient de corrélation",
    "causalité",
    "facteur de confusion",
    "relation linéaire"
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

Pour mesurer la force d’une relation sans dépendre des unités, on divise la covariance par le produit des deux écarts-types. On obtient le coefficient de corrélation linéaire, noté r. Il est toujours compris entre −1 et 1. Il vaut 1 quand tous les points sont exactement sur une droite croissante, −1 sur une droite décroissante, et il est proche de 0 quand aucune droite ne résume le nuage.

Entre ces extrêmes, on lit souvent la force du lien ainsi : au-delà de 0,7 en valeur absolue, le lien est fort ; entre 0,3 et 0,7, il est modéré ; en dessous de 0,3, il est faible. Ces seuils sont des repères, pas des lois : en physique, un r de 0,9 peut être décevant ; en sciences sociales, un r de 0,4 peut être important.

Le premier piège est le plus célèbre : corrélation n’est pas causalité. Dans les villages, le nombre de ventes de ventilateurs et le nombre de cas de paludisme peuvent être fortement corrélés. Les ventilateurs ne transmettent pas le paludisme : la saison chaude et pluvieuse augmente les deux. Cette troisième variable cachée s’appelle un facteur de confusion. Pour établir une cause, il faut une expérience contrôlée, ou au moins un raisonnement sur le mécanisme, jamais une corrélation seule.

Le deuxième piège concerne les relations non linéaires. r ne mesure que l’alignement sur une droite. Une relation en U, comme le rendement d’une culture en fonction de l’arrosage, trop peu ou trop d’eau étant néfastes, peut donner un r proche de 0 alors que le lien est très fort. D’où la règle : toujours regarder le nuage de points avant de calculer r.

Le troisième piège vient des valeurs extrêmes. Un seul point très éloigné peut créer une forte corrélation dans un nuage sans lien, ou en détruire une. Une série de dix points sans relation, plus un point extrême en haut à droite, peut afficher un r supérieur à 0,8.

Enfin, une corrélation calculée sur peu d’individus est fragile : avec cinq points, un r de 0,6 peut apparaître par simple hasard. Plus l’échantillon est grand, plus le coefficient est fiable.

Python 3.10 et les versions suivantes proposent statistics.correlation ; le calcul à la main, covariance divisée par le produit des écarts-types de population, donne le même résultat et reste disponible partout.

## Exemple guidé 1

```python
import statistics


def covariance(xs, ys):
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / len(xs)


def correlation(xs, ys):
    return round(covariance(xs, ys) / (statistics.pstdev(xs) * statistics.pstdev(ys)), 3)

print(correlation([1, 2, 2, 3, 4, 5], [8, 9, 11, 12, 14, 15]))
print(correlation([1, 2, 3, 4], [2, 4, 6, 8]))
```

Affichage attendu :

    0.967
    1.0

Trace :

- Révisions et notes sont fortement liées : r ≈ 0,97.
- Des points exactement alignés donnent r = 1.
- Le résultat ne dépend pas des unités.

## Exemple guidé 2

```python
import statistics


def covariance(xs, ys):
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / len(xs)


def correlation(xs, ys):
    return round(covariance(xs, ys) / (statistics.pstdev(xs) * statistics.pstdev(ys)), 3)

arrosage = [1, 2, 3, 4, 5]
rendement = [2, 6, 8, 6, 2]
print(correlation(arrosage, rendement))
x = [1, 2, 3, 4, 5, 20]
y = [3, 1, 4, 2, 3, 20]
print(correlation(x, y))
```

Affichage attendu :

    0.0
    0.974

Trace :

- Relation en U : r est nul, pourtant le lien est net.
- Cinq points sans lien et un point extrême.
- Le point extrême fabrique un r de 0,97.

## Vérifier et expliquer

Trouve deux grandeurs de ta vie quotidienne qui varient ensemble sans que l’une cause l’autre, et nomme le facteur de confusion.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
