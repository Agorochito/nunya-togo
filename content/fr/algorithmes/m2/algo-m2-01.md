---
{
  "id": "algo-m2-01",
  "title_fr": "Penser récursif",
  "course": "algorithmes",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "algo-m1-03"
  ],
  "outcomes": [
    "Écrire une fonction récursive avec un cas de base et un cas récursif qui se rapproche du cas de base.",
    "Traiter récursivement des listes et des structures imbriquées."
  ],
  "idea_fr": "Une fonction récursive résout un problème en s’appelant sur une version plus petite du même problème, jusqu’à un cas si simple qu’il se résout directement.",
  "analogy_fr": "Pour compter les marches d’un escalier, on peut dire : une marche, plus les marches qui restent. Quand il n’en reste plus, on a fini.",
  "examples": [
    {
      "code": "def factorielle(n):\n    if n == 0:\n        return 1\n    return n * factorielle(n - 1)\n\nprint(factorielle(0), factorielle(3), factorielle(10))",
      "expected_output": "1 6 3628800\n",
      "inputs": [],
      "trace_fr": [
        "Le cas de base n == 0 renvoie 1 directement.",
        "factorielle(3) attend 3 × factorielle(2), et ainsi de suite.",
        "Les multiplications se font au retour des appels."
      ]
    },
    {
      "code": "def somme(liste):\n    if not liste:\n        return 0\n    return liste[0] + somme(liste[1:])\n\nprint(somme([4, 8, 15]))\nprint(somme([]))",
      "expected_output": "27\n0\n",
      "inputs": [],
      "trace_fr": [
        "Une liste vide est le cas de base.",
        "Sinon : premier élément plus somme du reste.",
        "liste[1:] raccourcit la liste à chaque appel."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le cas de base",
      "why_fr": "Les appels ne s’arrêtent jamais : RecursionError.",
      "fix_fr": "Écris d’abord le cas le plus simple."
    },
    {
      "error": "Un appel qui ne réduit pas le problème",
      "why_fr": "On n’atteint jamais le cas de base.",
      "fix_fr": "Vérifie que chaque appel se rapproche du cas de base."
    },
    {
      "error": "Récursivité pour une simple boucle",
      "why_fr": "Plus de mémoire, profondeur limitée.",
      "fix_fr": "Garde la récursivité pour les structures imbriquées."
    }
  ],
  "quiz": [
    {
      "question": "Que se passe-t-il sans cas de base ?",
      "options": [
        "La fonction renvoie 0",
        "Les appels continuent jusqu’à RecursionError",
        "Python ajoute un cas de base",
        "Rien"
      ],
      "answer": 1,
      "explanation": "La pile d’appels déborde.",
      "id": "algo-m2-01-q1"
    },
    {
      "question": "Dans quel ordre se terminent factorielle(3), (2), (1), (0) ?",
      "options": [
        "3, 2, 1, 0",
        "0, 1, 2, 3",
        "Au hasard",
        "Tous en même temps"
      ],
      "answer": 1,
      "explanation": "Le dernier appelé se termine en premier.",
      "id": "algo-m2-01-q2"
    },
    {
      "question": "Que vaut [7, 8, 9][1:] ?",
      "options": [
        "[7]",
        "[8, 9]",
        "[7, 8]",
        "9"
      ],
      "answer": 1,
      "explanation": "Tout sauf le premier élément.",
      "id": "algo-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "récursivité",
      "definition": "Technique où une fonction s’appelle sur un problème plus petit."
    },
    {
      "term": "cas de base",
      "definition": "Cas résolu directement, sans nouvel appel."
    },
    {
      "term": "pile d’appels",
      "definition": "Appels en attente, empilés jusqu’au cas de base."
    },
    {
      "term": "RecursionError",
      "definition": "Erreur levée quand les appels imbriqués sont trop nombreux."
    }
  ],
  "recap_fr": [
    "Écrire une fonction récursive avec un cas de base et un cas récursif qui se rapproche du cas de base.",
    "Traiter récursivement des listes et des structures imbriquées.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "récursivité",
    "cas de base",
    "pile d’appels",
    "RecursionError"
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
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
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
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms",
      "scope": "Notions de recherche, tri, récursivité et graphes (ressource gratuite en français). Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une fonction récursive est une fonction qui s’appelle elle-même. Cela peut sembler circulaire, mais c’est une façon très naturelle de décrire certains problèmes. La factorielle de n, le produit 1 × 2 × … × n, se définit ainsi : la factorielle de 0 vaut 1 ; la factorielle de n vaut n multiplié par la factorielle de n - 1. En Python, ces deux phrases deviennent presque mot pour mot une fonction.

Toute fonction récursive a deux parties. Le cas de base est un cas assez simple pour être résolu sans nouvel appel : ici, n == 0. Le cas récursif ramène le problème à un problème plus petit du même type : factorielle(n - 1). La condition indispensable est que chaque appel se rapproche du cas de base. Si l’on oublie le cas de base, ou si l’appel ne réduit pas le problème, la fonction s’appelle indéfiniment. Python l’arrête au bout d’environ mille appels imbriqués avec une erreur RecursionError.

Pour comprendre une exécution, imagine une pile d’appels. factorielle(3) attend factorielle(2), qui attend factorielle(1), qui attend factorielle(0). Ce dernier renvoie 1 ; puis chaque appel en attente termine son calcul, dans l’ordre inverse : 1, puis 2, puis 6. Dessiner cette pile est la meilleure façon de déboguer une fonction récursive.

Les listes se prêtent bien à la récursivité : une liste est soit vide, soit un premier élément suivi du reste. La somme d’une liste vide vaut 0 ; sinon, c’est le premier élément plus la somme du reste, liste[0] + somme(liste[1:]). Le découpage liste[1:] crée une nouvelle liste plus courte : l’appel se rapproche bien de la liste vide.

La récursivité devient indispensable pour les structures imbriquées : une liste qui contient des listes, qui contiennent des listes, à une profondeur inconnue. Aplatir une telle structure avec des boucles est pénible ; avec la récursivité, il suffit de dire : pour chaque élément, si c’est une liste, aplatis-le et ajoute le résultat ; sinon, ajoute l’élément. isinstance(x, list) teste si un élément est une liste.

La récursivité a un coût : chaque appel occupe de la mémoire tant qu’il attend, et Python limite la profondeur. Pour un simple compteur, une boucle reste préférable. Mais pour les tris rapides des leçons suivantes, les arbres et les graphes, la récursivité rend les algorithmes beaucoup plus clairs.

## Exemple guidé 1

```python
def factorielle(n):
    if n == 0:
        return 1
    return n * factorielle(n - 1)

print(factorielle(0), factorielle(3), factorielle(10))
```

Affichage attendu :

    1 6 3628800

Trace :

- Le cas de base n == 0 renvoie 1 directement.
- factorielle(3) attend 3 × factorielle(2), et ainsi de suite.
- Les multiplications se font au retour des appels.

## Exemple guidé 2

```python
def somme(liste):
    if not liste:
        return 0
    return liste[0] + somme(liste[1:])

print(somme([4, 8, 15]))
print(somme([]))
```

Affichage attendu :

    27
    0

Trace :

- Une liste vide est le cas de base.
- Sinon : premier élément plus somme du reste.
- liste[1:] raccourcit la liste à chaque appel.

## Vérifier et expliquer

Dessine la pile d’appels de somme([4, 8, 15]) et écris la valeur renvoyée par chaque appel.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — structures de données](https://docs.python.org/fr/3/tutorial/datastructures.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
