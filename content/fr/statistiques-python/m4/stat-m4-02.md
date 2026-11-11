---
{
  "id": "stat-m4-02",
  "title_fr": "Échantillons, sondages et marge d’erreur",
  "course": "statistiques-python",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "stat-m4-01"
  ],
  "outcomes": [
    "Estimer une proportion à partir d’un échantillon avec un intervalle de confiance à 95 %.",
    "Choisir une taille d’échantillon et reconnaître un échantillon biaisé."
  ],
  "idea_fr": "Un sondage sur quelques centaines de personnes peut décrire tout un pays, à condition que l’échantillon soit tiré au hasard et qu’on annonce sa marge d’erreur.",
  "analogy_fr": "Pour savoir si la sauce est assez salée, on ne boit pas toute la marmite : une cuillère suffit, à condition d’avoir bien remué avant.",
  "examples": [
    {
      "code": "import math\n\nfor n in [100, 400, 1000, 1600]:\n    print(n, round(1 / math.sqrt(n), 3))",
      "expected_output": "100 0.1\n400 0.05\n1000 0.032\n1600 0.025\n",
      "inputs": [],
      "trace_fr": [
        "100 personnes : marge de 10 points.",
        "400 personnes : 5 points.",
        "Quatre fois plus de personnes divisent la marge par deux."
      ]
    },
    {
      "code": "import math\n\nf, n = 0.52, 400\nmarge = 1 / math.sqrt(n)\nbas, haut = round(f - marge, 2), round(f + marge, 2)\nprint(bas, haut)\nprint(bas <= 0.60 <= haut)",
      "expected_output": "0.47 0.57\nFalse\n",
      "inputs": [],
      "trace_fr": [
        "L’intervalle va de 47 % à 57 %.",
        "60 % n’est pas dans l’intervalle.",
        "L’affirmation de 60 % est peu compatible avec le sondage."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire qu’il faut interroger une grande part de la population",
      "why_fr": "La précision dépend de la taille de l’échantillon, pas de la population.",
      "fix_fr": "Raisonne avec 1/√n."
    },
    {
      "error": "Oublier d’annoncer la marge d’erreur",
      "why_fr": "Une différence de 2 points paraît significative.",
      "fix_fr": "Donne toujours l’intervalle."
    },
    {
      "error": "Corriger un biais en augmentant la taille",
      "why_fr": "Le biais reste entier.",
      "fix_fr": "Tire l’échantillon au hasard."
    }
  ],
  "quiz": [
    {
      "question": "Marge d’erreur approximative pour 2 500 personnes ?",
      "options": [
        "1 %",
        "2 %",
        "5 %",
        "25 %"
      ],
      "answer": 1,
      "explanation": "1/√2500 = 1/50 = 0,02.",
      "id": "stat-m4-02-q1"
    },
    {
      "question": "Pour diviser la marge par deux, il faut…",
      "options": [
        "deux fois plus de personnes",
        "quatre fois plus de personnes",
        "la moitié",
        "un autre questionnaire"
      ],
      "answer": 1,
      "explanation": "La marge varie comme 1/√n.",
      "id": "stat-m4-02-q2"
    },
    {
      "question": "Un sondage à la sortie d’une salle de sport sur l’activité physique est…",
      "options": [
        "représentatif",
        "biaisé",
        "exact",
        "inutile"
      ],
      "answer": 1,
      "explanation": "Les sportifs y sont surreprésentés.",
      "id": "stat-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "échantillon",
      "definition": "Partie de la population effectivement interrogée."
    },
    {
      "term": "fluctuation d’échantillonnage",
      "definition": "Variation de la fréquence d’un échantillon à l’autre."
    },
    {
      "term": "intervalle de confiance",
      "definition": "Intervalle qui contient la vraie proportion avec un niveau de confiance donné."
    },
    {
      "term": "biais",
      "definition": "Erreur systématique due à la façon de choisir l’échantillon."
    }
  ],
  "recap_fr": [
    "Estimer une proportion à partir d’un échantillon avec un intervalle de confiance à 95 %.",
    "Choisir une taille d’échantillon et reconnaître un échantillon biaisé.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "échantillon",
    "fluctuation d’échantillonnage",
    "intervalle de confiance",
    "biais"
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
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    },
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html"
    }
  ],
  "sources": [
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability",
      "scope": "Notions générales de statistique descriptive et de probabilités. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html",
      "scope": "Moyenne, médiane, mode, variance, écart-type et quantiles. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Interroger toute une population coûte cher, parfois c’est impossible. On interroge donc un échantillon et l’on utilise sa fréquence observée pour estimer la proportion dans la population. Si 52 % des 400 élèves interrogés d’une ville veulent une cantine, que peut-on dire de tous les élèves de la ville ?

La fréquence d’un échantillon varie d’un échantillon à l’autre : c’est la fluctuation d’échantillonnage. Deux enquêteurs qui interrogent chacun 400 élèves au hasard n’obtiendront pas exactement le même pourcentage. Cette variation est d’autant plus petite que l’échantillon est grand. Une formule simple, enseignée au lycée, en donne l’ordre de grandeur : pour un échantillon de taille n, la marge d’erreur au niveau de confiance de 95 % vaut environ 1 divisé par la racine carrée de n. Elle est valable pour des échantillons d’au moins 25 personnes et des fréquences qui ne sont pas trop proches de 0 ou de 1.

Avec n = 400, la marge vaut 1/20, soit 0,05, ou 5 points. On en déduit l’intervalle de confiance : de 52 − 5 = 47 % à 52 + 5 = 57 %. On peut affirmer, avec un niveau de confiance de 95 %, que la vraie proportion se situe dans cet intervalle. Concrètement, si l’on répétait l’enquête de nombreuses fois, environ 95 intervalles sur 100 contiendraient la vraie proportion.

Cette formule a une conséquence surprenante : la précision dépend de la taille de l’échantillon, pas de celle de la population. 1 000 personnes bien choisies donnent une marge d’environ 3 points, que la population compte 50 000 ou 8 millions de personnes. En revanche, diviser la marge par deux demande quatre fois plus de personnes : pour 2,5 points, il faut 1 600 personnes.

La formule suppose un échantillon tiré au hasard. Si ce n’est pas le cas, l’échantillon est biaisé, et aucune taille ne corrige le biais. Interroger seulement les élèves présents à la bibliothèque surestime l’intérêt pour la lecture ; un sondage en ligne oublie ceux qui n’ont pas internet ; les personnes qui répondent volontairement sont souvent les plus concernées. Un grand échantillon biaisé donne une réponse précise à la mauvaise question.

L’intervalle de confiance permet aussi de tester une affirmation. Si un candidat annonce que 60 % des élèves le soutiennent et qu’un sondage de 400 élèves tirés au hasard donne 52 %, l’intervalle de 47 % à 57 % ne contient pas 60 % : l’affirmation est peu compatible avec les données.

## Exemple guidé 1

```python
import math

for n in [100, 400, 1000, 1600]:
    print(n, round(1 / math.sqrt(n), 3))
```

Affichage attendu :

    100 0.1
    400 0.05
    1000 0.032
    1600 0.025

Trace :

- 100 personnes : marge de 10 points.
- 400 personnes : 5 points.
- Quatre fois plus de personnes divisent la marge par deux.

## Exemple guidé 2

```python
import math

f, n = 0.52, 400
marge = 1 / math.sqrt(n)
bas, haut = round(f - marge, 2), round(f + marge, 2)
print(bas, haut)
print(bas <= 0.60 <= haut)
```

Affichage attendu :

    0.47 0.57
    False

Trace :

- L’intervalle va de 47 % à 57 %.
- 60 % n’est pas dans l’intervalle.
- L’affirmation de 60 % est peu compatible avec le sondage.

## Vérifier et expliquer

Trouve dans la presse un sondage et vérifie si la marge d’erreur annoncée correspond à 1/√n.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
