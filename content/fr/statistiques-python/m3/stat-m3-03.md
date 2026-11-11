---
{
  "id": "stat-m3-03",
  "title_fr": "La droite de régression et les prévisions",
  "course": "statistiques-python",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "stat-m3-02"
  ],
  "outcomes": [
    "Calculer la droite des moindres carrés y = ax + b d’un nuage de points.",
    "Faire une prévision raisonnable et calculer les résidus, en se méfiant de l’extrapolation."
  ],
  "idea_fr": "Quand un nuage s’aligne, une droite le résume : elle permet de prévoir, à condition de rester dans la zone observée.",
  "analogy_fr": "Un vendeur de pain remarque que chaque degré de plus le matin fait vendre un peu moins de pain chaud. Il ne connaît pas l’avenir, mais sa droite lui donne une bonne estimation pour demain.",
  "examples": [
    {
      "code": "import statistics\n\n\ndef droite(xs, ys):\n    mx, my = statistics.mean(xs), statistics.mean(ys)\n    a = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\n    b = my - a * mx\n    return [round(a, 2), round(b, 2)]\n\nheures = [1, 2, 2, 3, 4, 5]\nnotes = [8, 9, 11, 12, 14, 15]\na, b = droite(heures, notes)\nprint(a, b)\nprint(round(a * 3.5 + b, 1))",
      "expected_output": "1.8 6.4\n12.7\n",
      "inputs": [],
      "trace_fr": [
        "La pente vaut 1,8 point par heure.",
        "La droite passe par le point moyen.",
        "Pour 3,5 heures, on prévoit environ 12,7."
      ]
    },
    {
      "code": "import statistics\n\n\ndef droite(xs, ys):\n    mx, my = statistics.mean(xs), statistics.mean(ys)\n    a = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\n    b = my - a * mx\n    return [round(a, 2), round(b, 2)]\n\nheures = [1, 2, 2, 3, 4, 5]\nnotes = [8, 9, 11, 12, 14, 15]\na, b = droite(heures, notes)\nprint([round(n - (a * h + b), 2) for h, n in zip(heures, notes)])\nprint(round(a * 15 + b, 1))",
      "expected_output": "[-0.2, -1.0, 1.0, 0.2, 0.4, -0.4]\n33.4\n",
      "inputs": [],
      "trace_fr": [
        "Les résidus sont les écarts à la droite.",
        "Le troisième élève fait mieux que prévu, le deuxième moins bien.",
        "À 15 heures, la droite prévoit 33,4 sur 20 : l’extrapolation est absurde."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Extrapoler loin des données",
      "why_fr": "La prévision peut devenir impossible.",
      "fix_fr": "Reste dans l’intervalle observé."
    },
    {
      "error": "Oublier la moyenne de x dans b",
      "why_fr": "La droite ne passe plus par le point moyen.",
      "fix_fr": "b = moyenne de y − a × moyenne de x."
    },
    {
      "error": "Prendre une prévision pour une certitude",
      "why_fr": "Les résidus montrent l’incertitude.",
      "fix_fr": "Présente la prévision comme une estimation."
    }
  ],
  "quiz": [
    {
      "question": "Comment se calcule la pente a ?",
      "options": [
        "moyenne de y / moyenne de x",
        "covariance / variance de x",
        "r × 100",
        "max − min"
      ],
      "answer": 1,
      "explanation": "Formule des moindres carrés.",
      "id": "stat-m3-03-q1"
    },
    {
      "question": "Que signifie un résidu négatif ?",
      "options": [
        "Une erreur",
        "Le point est sous la droite : moins que prévu",
        "Une pente négative",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Observé − prévu < 0.",
      "id": "stat-m3-03-q2"
    },
    {
      "question": "Pourquoi éviter l’extrapolation ?",
      "options": [
        "Le calcul est faux",
        "La relation peut changer hors des données",
        "C’est interdit",
        "La pente change"
      ],
      "answer": 1,
      "explanation": "Rien ne garantit la même relation.",
      "id": "stat-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "régression linéaire",
      "definition": "Recherche de la droite qui résume un nuage de points."
    },
    {
      "term": "moindres carrés",
      "definition": "Méthode qui minimise la somme des carrés des résidus."
    },
    {
      "term": "résidu",
      "definition": "Valeur observée moins valeur prévue par la droite."
    },
    {
      "term": "extrapolation",
      "definition": "Prévision en dehors de l’intervalle des données."
    }
  ],
  "recap_fr": [
    "Calculer la droite des moindres carrés y = ax + b d’un nuage de points.",
    "Faire une prévision raisonnable et calculer les résidus, en se méfiant de l’extrapolation.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "régression linéaire",
    "moindres carrés",
    "résidu",
    "extrapolation"
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

Quand le coefficient de corrélation est fort, les points s’alignent à peu près sur une droite. On peut chercher la droite qui les résume le mieux, y = ax + b. Pour chaque point, l’écart vertical entre la valeur observée et la valeur donnée par la droite s’appelle le résidu. La méthode des moindres carrés choisit la droite qui rend la somme des carrés des résidus la plus petite possible.

Les formules sont simples. La pente a est la covariance divisée par la variance de x. L’ordonnée à l’origine b est telle que la droite passe par le point moyen : b = moyenne de y − a × moyenne de x. Pour nos élèves, la pente vaut 1,8 : chaque heure de révision supplémentaire s’accompagne en moyenne de 1,8 point de plus. Les versions récentes de Python proposent statistics.linear_regression, qui renvoie la pente et l’ordonnée à l’origine.

La pente se lit dans les unités du problème : « points par heure », « bouteilles vendues par degré », « kilogrammes de récolte par millimètre de pluie ». Cette lecture fait le lien entre le calcul et la réalité, et permet de vérifier qu’il a du sens.

La droite sert à prévoir. Pour un élève qui révise 3,5 heures, on calcule a × 3,5 + b. Cette prévision est une estimation moyenne, pas une promesse : les résidus montrent que les vrais points s’écartent de la droite. Un résidu positif signifie que l’individu fait mieux que prévu, un résidu négatif moins bien. Le plus grand résidu en valeur absolue désigne l’individu le plus surprenant, qui mérite qu’on s’y intéresse : erreur de saisie, ou situation particulière.

Le danger principal est l’extrapolation : utiliser la droite loin des valeurs observées. Si les données vont de 1 à 5 heures, rien ne dit que la relation reste la même à 15 heures. La droite prévoirait alors une note supérieure à 20, ce qui est impossible. De même, une tendance de ventes observée sur six mois ne se prolonge pas forcément sur dix ans. On limite donc les prévisions à l’intervalle des données, et l’on reste prudent même à l’intérieur.

Enfin, la droite de régression hérite des pièges de la corrélation : elle n’établit aucune cause, et un point extrême peut la faire basculer. Les résidus aident justement à repérer ce point.

## Exemple guidé 1

```python
import statistics


def droite(xs, ys):
    mx, my = statistics.mean(xs), statistics.mean(ys)
    a = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    b = my - a * mx
    return [round(a, 2), round(b, 2)]

heures = [1, 2, 2, 3, 4, 5]
notes = [8, 9, 11, 12, 14, 15]
a, b = droite(heures, notes)
print(a, b)
print(round(a * 3.5 + b, 1))
```

Affichage attendu :

    1.8 6.4
    12.7

Trace :

- La pente vaut 1,8 point par heure.
- La droite passe par le point moyen.
- Pour 3,5 heures, on prévoit environ 12,7.

## Exemple guidé 2

```python
import statistics


def droite(xs, ys):
    mx, my = statistics.mean(xs), statistics.mean(ys)
    a = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    b = my - a * mx
    return [round(a, 2), round(b, 2)]

heures = [1, 2, 2, 3, 4, 5]
notes = [8, 9, 11, 12, 14, 15]
a, b = droite(heures, notes)
print([round(n - (a * h + b), 2) for h, n in zip(heures, notes)])
print(round(a * 15 + b, 1))
```

Affichage attendu :

    [-0.2, -1.0, 1.0, 0.2, 0.4, -0.4]
    33.4

Trace :

- Les résidus sont les écarts à la droite.
- Le troisième élève fait mieux que prévu, le deuxième moins bien.
- À 15 heures, la droite prévoit 33,4 sur 20 : l’extrapolation est absurde.

## Vérifier et expliquer

Avec la droite de l’exemple, calcule la prévision pour 0 heure de révision et explique pourquoi elle est prudente ou non.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
