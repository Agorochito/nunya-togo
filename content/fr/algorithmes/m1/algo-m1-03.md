---
{
  "id": "algo-m1-03",
  "title_fr": "Trier : sélection, insertion et sorted",
  "course": "algorithmes",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "algo-m1-02"
  ],
  "outcomes": [
    "Écrire un tri par sélection et un tri par insertion, et expliquer pourquoi ils sont quadratiques.",
    "Trier avec sorted et une clé, sur plusieurs critères."
  ],
  "idea_fr": "Trier, c’est ranger pas à pas : les tris simples sont faciles à comprendre mais lents ; sorted applique un algorithme bien plus efficace.",
  "analogy_fr": "Pour classer des copies, on peut chercher la meilleure et la poser en premier, puis recommencer ; ou prendre les copies une à une et glisser chacune à sa place dans la pile déjà rangée.",
  "examples": [
    {
      "code": "def tri_selection(liste):\n    resultat = list(liste)\n    for i in range(len(resultat)):\n        mini = i\n        for j in range(i + 1, len(resultat)):\n            if resultat[j] < resultat[mini]:\n                mini = j\n        resultat[i], resultat[mini] = resultat[mini], resultat[i]\n    return resultat\n\nprint(tri_selection([15, 8, 12, 4]))",
      "expected_output": "[4, 8, 12, 15]\n",
      "inputs": [],
      "trace_fr": [
        "Premier tour : 4 est le plus petit, il passe en tête.",
        "Deuxième tour : 8 parmi le reste.",
        "La liste reçue n’est pas modifiée : on trie une copie."
      ]
    },
    {
      "code": "eleves = [[\"Afi\", 14], [\"Kofi\", 9], [\"Esi\", 14], [\"Yao\", 17]]\nprint(sorted(eleves, key=lambda e: e[1]))\nprint(sorted(eleves, key=lambda e: (-e[1], e[0])))",
      "expected_output": "[['Kofi', 9], ['Afi', 14], ['Esi', 14], ['Yao', 17]]\n[['Yao', 17], ['Afi', 14], ['Esi', 14], ['Kofi', 9]]\n",
      "inputs": [],
      "trace_fr": [
        "La clé e[1] trie par note croissante.",
        "Afi et Esi gardent leur ordre : le tri est stable.",
        "Le tuple (-note, nom) trie par note décroissante puis par nom."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Trier la liste reçue sur place",
      "why_fr": "L’appelant voit sa liste modifiée.",
      "fix_fr": "Travaille sur une copie ou utilise sorted."
    },
    {
      "error": "Écrire son propre tri en production",
      "why_fr": "Il est plus lent et risque d’être faux.",
      "fix_fr": "Utilise sorted ou list.sort."
    },
    {
      "error": "Oublier le signe moins pour un tri décroissant multi-critères",
      "why_fr": "Les deux critères vont dans le même sens.",
      "fix_fr": "Utilise (-note, nom)."
    }
  ],
  "quiz": [
    {
      "question": "Combien de comparaisons environ pour trier 1 000 éléments par sélection ?",
      "options": [
        "1 000",
        "10 000",
        "500 000",
        "20"
      ],
      "answer": 2,
      "explanation": "Environ n²/2.",
      "id": "algo-m1-03-q1"
    },
    {
      "question": "Sur quelle liste le tri par insertion est-il rapide ?",
      "options": [
        "Rangée à l’envers",
        "Presque triée",
        "Aléatoire",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "Chaque élément se déplace peu.",
      "id": "algo-m1-03-q2"
    },
    {
      "question": "Que signifie un tri stable ?",
      "options": [
        "Il ne plante jamais",
        "Les éléments égaux gardent leur ordre d’origine",
        "Il est rapide",
        "Il trie sur place"
      ],
      "answer": 1,
      "explanation": "La stabilité préserve l’ordre des ex aequo.",
      "id": "algo-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "tri par sélection",
      "definition": "Tri qui place à chaque tour le plus petit élément restant."
    },
    {
      "term": "tri par insertion",
      "definition": "Tri qui glisse chaque élément à sa place parmi les éléments déjà triés."
    },
    {
      "term": "clé de tri",
      "definition": "Fonction qui donne la valeur à comparer pour chaque élément."
    },
    {
      "term": "stabilité",
      "definition": "Propriété d’un tri qui garde l’ordre des éléments égaux."
    }
  ],
  "recap_fr": [
    "Écrire un tri par sélection et un tri par insertion, et expliquer pourquoi ils sont quadratiques.",
    "Trier avec sorted et une clé, sur plusieurs critères.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "tri par sélection",
    "tri par insertion",
    "clé de tri",
    "stabilité"
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
      "title": "Python — guide du tri",
      "url": "https://docs.python.org/fr/3/howto/sorting.html"
    },
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    }
  ],
  "sources": [
    {
      "title": "Python — guide du tri",
      "url": "https://docs.python.org/fr/3/howto/sorting.html",
      "scope": "sorted, key et stabilité du tri. Texte, exemples et exercices originaux Nunya.",
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

Trier est l’une des opérations les plus fréquentes en informatique : classer des élèves, des prix, des dates. Un tri bien choisi rend aussi possible la dichotomie de la leçon précédente. Commençons par deux tris simples, faciles à suivre à la main.

Le tri par sélection cherche le plus petit élément de la liste et le place en première position, en l’échangeant avec l’élément qui s’y trouvait. Puis il cherche le plus petit parmi les éléments restants et le place en deuxième position, et ainsi de suite. Pour chaque position, il parcourt tout le reste de la liste : environ n²/2 comparaisons au total. C’est un algorithme quadratique.

Le tri par insertion fonctionne comme une personne qui range des cartes dans sa main. Il prend les éléments un à un et glisse chacun vers la gauche jusqu’à sa place, parmi les éléments déjà triés. Dans le pire cas, une liste rangée à l’envers, il est lui aussi quadratique. Mais sur une liste presque triée, il est très rapide, car chaque élément ne se déplace que de peu : c’est pourquoi on l’utilise pour de petites listes ou des données qui arrivent presque dans l’ordre.

En Python, on écrit ces tris sur une copie, resultat = list(liste), pour ne pas modifier la liste reçue. Un échange de deux cases s’écrit en une ligne : a[i], a[j] = a[j], a[i].

Dans un vrai programme, on n’écrit pas son propre tri : on utilise sorted(liste), qui renvoie une nouvelle liste triée, ou liste.sort(), qui trie sur place. Ils utilisent Timsort, un algorithme en O(n log n), bien plus rapide que les tris simples sur de grandes listes, et rapide aussi sur des données presque triées.

sorted accepte une clé : une fonction qui donne, pour chaque élément, la valeur à comparer. sorted(eleves, key=lambda e: e[1]) trie par note. Pour trier par note décroissante puis par nom, on renvoie un tuple : key=lambda e: (-e[1], e[0]). Le signe moins inverse l’ordre des nombres. Le tri de Python est stable : deux éléments égaux pour la clé gardent leur ordre d’origine.

Écrire soi-même un tri reste un excellent exercice : il apprend à raisonner sur des indices, des boucles imbriquées et des invariants, ces propriétés qui restent vraies à chaque tour, comme « le début de la liste est déjà trié ».

## Exemple guidé 1

```python
def tri_selection(liste):
    resultat = list(liste)
    for i in range(len(resultat)):
        mini = i
        for j in range(i + 1, len(resultat)):
            if resultat[j] < resultat[mini]:
                mini = j
        resultat[i], resultat[mini] = resultat[mini], resultat[i]
    return resultat

print(tri_selection([15, 8, 12, 4]))
```

Affichage attendu :

    [4, 8, 12, 15]

Trace :

- Premier tour : 4 est le plus petit, il passe en tête.
- Deuxième tour : 8 parmi le reste.
- La liste reçue n’est pas modifiée : on trie une copie.

## Exemple guidé 2

```python
eleves = [["Afi", 14], ["Kofi", 9], ["Esi", 14], ["Yao", 17]]
print(sorted(eleves, key=lambda e: e[1]))
print(sorted(eleves, key=lambda e: (-e[1], e[0])))
```

Affichage attendu :

    [['Kofi', 9], ['Afi', 14], ['Esi', 14], ['Yao', 17]]
    [['Yao', 17], ['Afi', 14], ['Esi', 14], ['Kofi', 9]]

Trace :

- La clé e[1] trie par note croissante.
- Afi et Esi gardent leur ordre : le tri est stable.
- Le tuple (-note, nom) trie par note décroissante puis par nom.

## Vérifier et expliquer

Trie à la main quatre cartes avec chaque méthode, en notant l’état de la main après chaque tour.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — guide du tri](https://docs.python.org/fr/3/howto/sorting.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
