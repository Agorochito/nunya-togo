---
{
  "id": "algo-m3-01",
  "title_fr": "Les piles : dernier arrivé, premier servi",
  "course": "algorithmes",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "algo-m2-03"
  ],
  "outcomes": [
    "Utiliser une liste Python comme pile avec append et pop.",
    "Résoudre avec une pile les problèmes d’imbrication : parenthèses, annulation, calcul en notation postfixée."
  ],
  "idea_fr": "Une pile ne donne accès qu’à son sommet : on empile, on dépile, et c’est toujours le dernier élément ajouté qui sort en premier.",
  "analogy_fr": "Une pile d’assiettes à la cantine : on pose la propre sur le dessus, et c’est celle du dessus qu’on reprend.",
  "examples": [
    {
      "code": "pile = []\nfor page in [\"accueil\", \"cours\", \"leçon 3\"]:\n    pile.append(page)\nprint(pile[-1])\nprint(pile.pop(), pile.pop())\nprint(pile)",
      "expected_output": "leçon 3\nleçon 3 cours\n['accueil']\n",
      "inputs": [],
      "trace_fr": [
        "Chaque page visitée est empilée.",
        "Le sommet est la dernière page.",
        "Deux retours dépilent les deux pages les plus récentes."
      ]
    },
    {
      "code": "def equilibre(texte):\n    paires = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    pile = []\n    for c in texte:\n        if c in \"([{\":\n            pile.append(c)\n        elif c in paires:\n            if not pile or pile.pop() != paires[c]:\n                return False\n    return not pile\n\nfor t in [\"([{}])\", \"([)]\", \")(\", \"((\"]:\n    print(t, equilibre(t))",
      "expected_output": "([{}]) True\n([)] False\n)( False\n(( False\n",
      "inputs": [],
      "trace_fr": [
        "Les ouvrantes sont empilées.",
        "Chaque fermante doit correspondre au sommet.",
        "Une pile non vide à la fin signale une ouvrante jamais fermée."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Dépiler avec pop(0)",
      "why_fr": "On retire le plus ancien, et c’est coûteux.",
      "fix_fr": "Utilise pop() sans argument."
    },
    {
      "error": "Dépiler une pile vide",
      "why_fr": "pop() lève IndexError.",
      "fix_fr": "Teste if not pile avant de dépiler."
    },
    {
      "error": "Compter au lieu d’empiler",
      "why_fr": ")( a autant d’ouvrantes que de fermantes.",
      "fix_fr": "Vérifie l’ordre avec une pile."
    }
  ],
  "quiz": [
    {
      "question": "Quelle opération retire le sommet d’une pile Python ?",
      "options": [
        "pop(0)",
        "pop()",
        "remove()",
        "del pile"
      ],
      "answer": 1,
      "explanation": "pop() retire le dernier élément.",
      "id": "algo-m3-01-q1"
    },
    {
      "question": "Que vaut 5 1 2 + * en notation postfixée ?",
      "options": [
        "8",
        "15",
        "7",
        "11"
      ],
      "answer": 1,
      "explanation": "1 + 2 = 3, puis 5 × 3 = 15.",
      "id": "algo-m3-01-q2"
    },
    {
      "question": "Pourquoi ([)] est-il mal formé ?",
      "options": [
        "Trop de parenthèses",
        ") ferme alors que le sommet est [",
        "Il manque une accolade",
        "Il est bien formé"
      ],
      "answer": 1,
      "explanation": "L’ordre de fermeture compte.",
      "id": "algo-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "structure de données",
      "definition": "Organisation des valeurs adaptée à certaines opérations."
    },
    {
      "term": "pile",
      "definition": "Structure où le dernier élément ajouté sort en premier."
    },
    {
      "term": "sommet",
      "definition": "Élément accessible d’une pile, le plus récent."
    },
    {
      "term": "notation postfixée",
      "definition": "Écriture où l’opérateur suit ses opérandes."
    }
  ],
  "recap_fr": [
    "Utiliser une liste Python comme pile avec append et pop.",
    "Résoudre avec une pile les problèmes d’imbrication : parenthèses, annulation, calcul en notation postfixée.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "structure de données",
    "pile",
    "sommet",
    "notation postfixée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Les données des exercices sont fictives ; les distances entre villes sont indicatives et servent seulement d’exemple.",
  "references": [
    {
      "title": "Python — structures de données",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html"
    },
    {
      "title": "Python Wiki — complexité des opérations",
      "url": "https://wiki.python.org/moin/TimeComplexity"
    }
  ],
  "sources": [
    {
      "title": "Python — structures de données",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html",
      "scope": "Listes, piles, files, ensembles et dictionnaires. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python Wiki — complexité des opérations",
      "url": "https://wiki.python.org/moin/TimeComplexity",
      "scope": "Coût des opérations sur listes, dictionnaires et ensembles. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une structure de données est une façon d’organiser des valeurs pour certaines opérations. Le choix d’une bonne structure rend un algorithme simple et rapide ; un mauvais choix le rend compliqué et lent. Ce module présente trois structures essentielles : la pile, la file et le dictionnaire.

Une pile suit la règle « dernier arrivé, premier sorti ». On ajoute au sommet et on retire au sommet, jamais au milieu. En Python, une liste fait une excellente pile : append ajoute à la fin, pop() retire et renvoie le dernier élément, et liste[-1] permet de regarder le sommet sans le retirer. Ces opérations coûtent O(1). Attention à ne pas écrire pop(0), qui retire le premier élément : c’est une autre structure, et c’est coûteux, car tous les éléments suivants doivent être décalés.

Les piles sont partout où les choses s’imbriquent. La fonction annuler d’un éditeur de texte empile chaque action ; annuler dépile la plus récente. La pile d’appels, vue avec la récursivité, empile les appels de fonctions en attente. Le bouton retour d’un navigateur empile les pages visitées.

Exemple classique : vérifier que les parenthèses d’une expression sont bien équilibrées, comme ([{}]). On parcourt les caractères. Une parenthèse ouvrante est empilée. Une fermante doit correspondre au sommet de la pile : si la pile est vide ou si le sommet n’est pas l’ouvrante correspondante, l’expression est mal formée ; sinon, on dépile. À la fin, la pile doit être vide, sinon une ouvrante n’a jamais été fermée. Compter simplement les ouvrantes et les fermantes ne suffit pas : )( a autant des deux mais reste faux, et l’ordre ([)] aussi.

Autre usage : calculer une expression écrite en notation postfixée, où l’opérateur suit ses deux opérandes : 3 4 + 2 * signifie (3 + 4) × 2. On lit les éléments un à un. Un nombre est empilé. Un opérateur dépile deux nombres, calcule, et empile le résultat. À la fin, la pile contient le résultat. C’est ainsi que fonctionnaient certaines calculatrices, et c’est ainsi que les ordinateurs évaluent souvent les expressions.

Un dictionnaire associant chaque fermante à son ouvrante, comme {')': '(', ']': '[', '}': '{'}, rend la vérification des parenthèses courte et lisible. Choisir une structure, c’est souvent en combiner deux.

## Exemple guidé 1

```python
pile = []
for page in ["accueil", "cours", "leçon 3"]:
    pile.append(page)
print(pile[-1])
print(pile.pop(), pile.pop())
print(pile)
```

Affichage attendu :

    leçon 3
    leçon 3 cours
    ['accueil']

Trace :

- Chaque page visitée est empilée.
- Le sommet est la dernière page.
- Deux retours dépilent les deux pages les plus récentes.

## Exemple guidé 2

```python
def equilibre(texte):
    paires = {")": "(", "]": "[", "}": "{"}
    pile = []
    for c in texte:
        if c in "([{":
            pile.append(c)
        elif c in paires:
            if not pile or pile.pop() != paires[c]:
                return False
    return not pile

for t in ["([{}])", "([)]", ")(", "(("]:
    print(t, equilibre(t))
```

Affichage attendu :

    ([{}]) True
    ([)] False
    )( False
    (( False

Trace :

- Les ouvrantes sont empilées.
- Chaque fermante doit correspondre au sommet.
- Une pile non vide à la fin signale une ouvrante jamais fermée.

## Vérifier et expliquer

Trace à la main l’état de la pile pour ([{}]) puis pour ([)], caractère par caractère.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — structures de données](https://docs.python.org/fr/3/tutorial/datastructures.html)
- [Python Wiki — complexité des opérations](https://wiki.python.org/moin/TimeComplexity)
