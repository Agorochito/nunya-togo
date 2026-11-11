---
{
  "id": "stat-m1-02",
  "title_fr": "Mesurer la dispersion : étendue et écart-type",
  "course": "statistiques-python",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "stat-m1-01"
  ],
  "outcomes": [
    "Calculer l’étendue, la variance et l’écart-type d’une série.",
    "Distinguer l’écart-type d’une population entière de celui d’un échantillon."
  ],
  "idea_fr": "Deux classes peuvent avoir la même moyenne et être très différentes : la dispersion mesure à quel point les valeurs s’écartent du centre.",
  "analogy_fr": "Deux bus mettent en moyenne une heure pour aller de Lomé à Tsévié. L’un arrive toujours entre 55 et 65 minutes ; l’autre entre 30 minutes et deux heures. La moyenne ne dit pas lequel prendre pour un rendez-vous.",
  "examples": [
    {
      "code": "import statistics\n\nclasse_a = [9, 10, 10, 10, 11]\nclasse_b = [2, 6, 10, 14, 18]\nfor notes in [classe_a, classe_b]:\n    print(statistics.mean(notes), max(notes) - min(notes), round(statistics.pstdev(notes), 2))",
      "expected_output": "10 2 0.63\n10 16 5.66\n",
      "inputs": [],
      "trace_fr": [
        "Même moyenne pour les deux classes.",
        "L’étendue et l’écart-type révèlent la différence.",
        "pstdev, car on a toute la classe."
      ]
    },
    {
      "code": "import statistics\n\nnotes = [2, 6, 10, 14, 18]\nmoyenne = statistics.mean(notes)\ncarres = [(n - moyenne) ** 2 for n in notes]\nprint(carres)\nprint(sum(carres) / len(notes), statistics.pvariance(notes))\nprint(sum(carres) / (len(notes) - 1), statistics.variance(notes))",
      "expected_output": "[64, 16, 0, 16, 64]\n32.0 32\n40.0 40\n",
      "inputs": [],
      "trace_fr": [
        "Chaque écart à la moyenne est élevé au carré.",
        "Diviser par n donne la variance de population.",
        "Diviser par n − 1 donne la variance d’échantillon."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Résumer une série par sa seule moyenne",
      "why_fr": "Deux séries très différentes paraissent identiques.",
      "fix_fr": "Ajoute toujours une mesure de dispersion."
    },
    {
      "error": "Confondre variance et écart-type",
      "why_fr": "La variance est en unités au carré.",
      "fix_fr": "Prends la racine carrée pour l’écart-type."
    },
    {
      "error": "Utiliser stdev pour une population complète",
      "why_fr": "On divise par n − 1 au lieu de n.",
      "fix_fr": "pstdev pour toute la population, stdev pour un échantillon."
    }
  ],
  "quiz": [
    {
      "question": "Étendue de 4, 12, 7, 15 ?",
      "options": [
        "11",
        "15",
        "9,5",
        "4"
      ],
      "answer": 0,
      "explanation": "15 − 4 = 11.",
      "id": "stat-m1-02-q1"
    },
    {
      "question": "Pourquoi prend-on la racine de la variance ?",
      "options": [
        "Pour aller plus vite",
        "Pour revenir à l’unité des données",
        "Pour éviter les négatifs",
        "Pour arrondir"
      ],
      "answer": 1,
      "explanation": "L’écart-type est dans la même unité que les données.",
      "id": "stat-m1-02-q2"
    },
    {
      "question": "Quelle fonction pour l’écart-type de toute une classe ?",
      "options": [
        "statistics.stdev",
        "statistics.pstdev",
        "statistics.mean",
        "statistics.median"
      ],
      "answer": 1,
      "explanation": "p pour population.",
      "id": "stat-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "étendue",
      "definition": "Différence entre la plus grande et la plus petite valeur."
    },
    {
      "term": "variance",
      "definition": "Moyenne des carrés des écarts à la moyenne."
    },
    {
      "term": "écart-type",
      "definition": "Racine carrée de la variance, dans l’unité des données."
    },
    {
      "term": "échantillon",
      "definition": "Partie d’une population, observée pour en estimer les caractéristiques."
    }
  ],
  "recap_fr": [
    "Calculer l’étendue, la variance et l’écart-type d’une série.",
    "Distinguer l’écart-type d’une population entière de celui d’un échantillon.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "étendue",
    "variance",
    "écart-type",
    "échantillon"
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

Une moyenne ne suffit pas à décrire une série. Prenons deux classes de cinq élèves : la première a les notes 9, 10, 10, 10 et 11 ; la seconde 2, 6, 10, 14 et 18. Les deux ont une moyenne de 10. Pourtant, dans la première, tous les élèves ont un niveau proche ; dans la seconde, certains sont en grande difficulté et d’autres excellent. Un enseignant n’organiserait pas ses cours de la même façon. Les indicateurs de dispersion mesurent cette différence.

Le plus simple est l’étendue : la plus grande valeur moins la plus petite. Elle vaut 2 pour la première classe et 16 pour la seconde. Elle est facile à calculer, mais elle ne dépend que de deux valeurs : un seul élève absent qui a eu zéro suffit à la faire exploser.

La variance tient compte de toutes les valeurs. Pour chaque valeur, on calcule son écart à la moyenne, on l’élève au carré, puis on fait la moyenne de ces carrés. Le carré rend tous les écarts positifs et donne plus de poids aux grands écarts. Pour la seconde classe, les écarts sont −8, −4, 0, 4 et 8, leurs carrés 64, 16, 0, 16 et 64, et la variance vaut 160 divisé par 5, soit 32.

La variance s’exprime en « points au carré », une unité peu parlante. On prend donc sa racine carrée : l’écart-type, ici environ 5,66 points. Il s’exprime dans la même unité que les données et se lit comme un écart typique à la moyenne. Pour la première classe, l’écart-type vaut environ 0,63 point.

Une subtilité compte en pratique. Si l’on dispose de toutes les valeurs, toute la classe, tous les clients du mois, on parle de population, et l’on divise par n. Si l’on n’a qu’un échantillon, par exemple 50 élèves interrogés sur tout un lycée, on divise par n − 1 pour ne pas sous-estimer la dispersion de la population entière. Le module statistics propose les deux versions : pvariance et pstdev pour une population, variance et stdev pour un échantillon. Se tromper de version donne un résultat un peu différent, surtout pour de petites séries.

Un écart-type se compare toujours à la moyenne et au contexte. Un écart-type de 2 points pour des notes sur 20 indique une classe homogène ; un écart-type de 2 000 FCFA pour des prix autour de 2 500 FCFA indique une très forte variabilité.

## Exemple guidé 1

```python
import statistics

classe_a = [9, 10, 10, 10, 11]
classe_b = [2, 6, 10, 14, 18]
for notes in [classe_a, classe_b]:
    print(statistics.mean(notes), max(notes) - min(notes), round(statistics.pstdev(notes), 2))
```

Affichage attendu :

    10 2 0.63
    10 16 5.66

Trace :

- Même moyenne pour les deux classes.
- L’étendue et l’écart-type révèlent la différence.
- pstdev, car on a toute la classe.

## Exemple guidé 2

```python
import statistics

notes = [2, 6, 10, 14, 18]
moyenne = statistics.mean(notes)
carres = [(n - moyenne) ** 2 for n in notes]
print(carres)
print(sum(carres) / len(notes), statistics.pvariance(notes))
print(sum(carres) / (len(notes) - 1), statistics.variance(notes))
```

Affichage attendu :

    [64, 16, 0, 16, 64]
    32.0 32
    40.0 40

Trace :

- Chaque écart à la moyenne est élevé au carré.
- Diviser par n donne la variance de population.
- Diviser par n − 1 donne la variance d’échantillon.

## Vérifier et expliquer

Calcule à la main la variance de 2, 4, 6, puis vérifie avec pvariance.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
