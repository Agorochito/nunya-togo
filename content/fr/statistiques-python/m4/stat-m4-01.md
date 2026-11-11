---
{
  "id": "stat-m4-01",
  "title_fr": "Probabilités et simulation",
  "course": "statistiques-python",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "stat-m3-03"
  ],
  "outcomes": [
    "Calculer une probabilité simple comme rapport de cas favorables et de cas possibles.",
    "Simuler une expérience aléatoire reproductible avec random.seed et observer la loi des grands nombres."
  ],
  "idea_fr": "Une probabilité prévoit la fréquence d’un événement sur un grand nombre d’essais ; une simulation permet de la vérifier.",
  "analogy_fr": "Une pièce lancée dix fois peut donner sept fois pile. Lancée dix mille fois, elle donnera presque exactement la moitié de piles.",
  "examples": [
    {
      "code": "from fractions import Fraction\n\nprint(Fraction(1, 6), round(1 / 6, 3))\nprint(Fraction(3, 6), 1 - Fraction(1, 6))\nsommes = [a + b for a in range(1, 7) for b in range(1, 7)]\nprint(sommes.count(7), \"sur\", len(sommes))",
      "expected_output": "1/6 0.167\n1/2 5/6\n6 sur 36\n",
      "inputs": [],
      "trace_fr": [
        "Un six : 1 cas favorable sur 6.",
        "Un nombre pair : 3 sur 6 ; pas de six : 5 sur 6.",
        "La somme 7 apparaît dans 6 des 36 cas."
      ]
    },
    {
      "code": "import random\n\n\ndef lancer(n, graine):\n    random.seed(graine)\n    return [random.randint(1, 6) for _ in range(n)]\n\nprint(lancer(5, 1) == lancer(5, 1))\ntirages = lancer(6000, 7)\nprint(len(tirages), abs(tirages.count(6) / 6000 - 1 / 6) < 0.02)",
      "expected_output": "True\n6000 True\n",
      "inputs": [],
      "trace_fr": [
        "Même graine, mêmes tirages : la simulation est reproductible.",
        "Sur 6000 lancers, la fréquence des six s’écarte de moins de 0,02 de 1/6.",
        "Sur 60 lancers, l’écart serait souvent bien plus grand : essaie."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire qu’un six « doit » sortir après cinq échecs",
      "why_fr": "Les lancers sont indépendants.",
      "fix_fr": "Chaque lancer a toujours 1 chance sur 6."
    },
    {
      "error": "Simuler sans fixer la graine",
      "why_fr": "Les résultats changent à chaque exécution.",
      "fix_fr": "Utilise random.seed pour la reproductibilité."
    },
    {
      "error": "Utiliser random pour un mot de passe",
      "why_fr": "Les tirages sont prévisibles.",
      "fix_fr": "Utilise le module secrets."
    }
  ],
  "quiz": [
    {
      "question": "Probabilité d’obtenir 5 ou 6 avec un dé ?",
      "options": [
        "1/6",
        "1/3",
        "1/2",
        "2/3"
      ],
      "answer": 1,
      "explanation": "2 cas sur 6.",
      "id": "stat-m4-01-q1"
    },
    {
      "question": "Que fait random.seed(42) ?",
      "options": [
        "Tire 42 nombres",
        "Fixe la graine : mêmes tirages à chaque exécution",
        "Rend les tirages sûrs",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Pour des simulations reproductibles.",
      "id": "stat-m4-01-q2"
    },
    {
      "question": "Que dit la loi des grands nombres ?",
      "options": [
        "Les grands nombres sortent plus souvent",
        "La fréquence observée se rapproche de la probabilité quand les essais se multiplient",
        "Il faut lancer un dé six fois",
        "Le hasard n’existe pas"
      ],
      "answer": 1,
      "explanation": "Lien entre fréquence et probabilité.",
      "id": "stat-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "probabilité",
      "definition": "Nombre entre 0 et 1 qui mesure la chance qu’un événement se produise."
    },
    {
      "term": "événement contraire",
      "definition": "Événement qui se produit quand l’autre ne se produit pas."
    },
    {
      "term": "loi des grands nombres",
      "definition": "Rapprochement de la fréquence et de la probabilité sur beaucoup d’essais."
    },
    {
      "term": "graine",
      "definition": "Valeur de départ qui détermine une suite pseudo-aléatoire."
    }
  ],
  "recap_fr": [
    "Calculer une probabilité simple comme rapport de cas favorables et de cas possibles.",
    "Simuler une expérience aléatoire reproductible avec random.seed et observer la loi des grands nombres.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "probabilité",
    "événement contraire",
    "loi des grands nombres",
    "graine"
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
      "title": "Python — random",
      "url": "https://docs.python.org/fr/3/library/random.html"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    }
  ],
  "sources": [
    {
      "title": "Python — random",
      "url": "https://docs.python.org/fr/3/library/random.html",
      "scope": "Tirages pseudo-aléatoires reproductibles avec seed. Texte, exemples et exercices originaux Nunya.",
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

Une expérience est aléatoire quand on connaît les résultats possibles sans pouvoir prévoir lequel se produira : lancer un dé, tirer une carte, interroger une personne au hasard. Quand tous les résultats sont également probables, la probabilité d’un événement est le nombre de cas favorables divisé par le nombre de cas possibles. Obtenir un six avec un dé équilibré a une probabilité de 1 sur 6, environ 0,167 ; obtenir un nombre pair, 3 sur 6, soit 0,5.

Une probabilité est toujours comprise entre 0, l’événement impossible, et 1, l’événement certain. La probabilité de l’événement contraire vaut 1 moins celle de l’événement : ne pas obtenir de six a une probabilité de 5 sur 6.

Que signifie concrètement 1 sur 6 ? Pas qu’un six sortira exactement une fois tous les six lancers : sur six lancers, on peut n’en avoir aucun ou en avoir trois. Mais sur un très grand nombre de lancers, la fréquence observée des six se rapproche de 1/6. C’est la loi des grands nombres, qui fait le lien entre la probabilité, une valeur théorique, et la fréquence, une valeur observée.

Un ordinateur permet de répéter une expérience des milliers de fois en une seconde : c’est la simulation. Le module random fournit randint(1, 6) pour un lancer de dé et random() pour un nombre entre 0 et 1. Ces nombres sont pseudo-aléatoires : calculés par une formule à partir d’une valeur de départ, la graine. En fixant la graine avec random.seed(42), on obtient toujours la même suite de tirages, ce qui rend une simulation reproductible : un collègue qui relance le programme obtient les mêmes résultats et peut vérifier l’analyse.

La simulation est précieuse quand le calcul exact est difficile. Pour la somme de deux dés, on peut compter les 36 cas possibles à la main : 6 d’entre eux donnent 7, d’où une probabilité de 6/36 = 1/6. Pour des situations plus compliquées, une file d’attente au guichet, la propagation d’une rumeur, on simule et l’on observe les fréquences.

Une simulation ne donne qu’une approximation, d’autant meilleure que le nombre d’essais est grand. Elle dépend aussi du modèle : simuler un dé équilibré ne dit rien d’un dé truqué. Comparer la fréquence observée sur un vrai dé à la probabilité théorique est d’ailleurs une façon de détecter un dé truqué, une idée développée dans la leçon suivante.

Attention : le module random ne convient pas pour la sécurité, mots de passe ou jetons ; on utilise alors le module secrets, présenté dans le cours de cybersécurité.

## Exemple guidé 1

```python
from fractions import Fraction

print(Fraction(1, 6), round(1 / 6, 3))
print(Fraction(3, 6), 1 - Fraction(1, 6))
sommes = [a + b for a in range(1, 7) for b in range(1, 7)]
print(sommes.count(7), "sur", len(sommes))
```

Affichage attendu :

    1/6 0.167
    1/2 5/6
    6 sur 36

Trace :

- Un six : 1 cas favorable sur 6.
- Un nombre pair : 3 sur 6 ; pas de six : 5 sur 6.
- La somme 7 apparaît dans 6 des 36 cas.

## Exemple guidé 2

```python
import random


def lancer(n, graine):
    random.seed(graine)
    return [random.randint(1, 6) for _ in range(n)]

print(lancer(5, 1) == lancer(5, 1))
tirages = lancer(6000, 7)
print(len(tirages), abs(tirages.count(6) / 6000 - 1 / 6) < 0.02)
```

Affichage attendu :

    True
    6000 True

Trace :

- Même graine, mêmes tirages : la simulation est reproductible.
- Sur 6000 lancers, la fréquence des six s’écarte de moins de 0,02 de 1/6.
- Sur 60 lancers, l’écart serait souvent bien plus grand : essaie.

## Vérifier et expliquer

Lance une vraie pièce vingt fois, note la fréquence des piles, puis compare avec une simulation de 10 000 lancers.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — random](https://docs.python.org/fr/3/library/random.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
