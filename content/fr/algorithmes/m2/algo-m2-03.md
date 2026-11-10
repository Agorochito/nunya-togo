---
{
  "id": "algo-m2-03",
  "title_fr": "Le tri rapide et la sélection",
  "course": "algorithmes",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "algo-m2-02"
  ],
  "outcomes": [
    "Partitionner une liste autour d’un pivot et écrire le tri rapide récursif.",
    "Trouver le k-ième plus petit élément sans trier toute la liste."
  ],
  "idea_fr": "Le tri rapide range autour d’un pivot : les plus petits d’un côté, les plus grands de l’autre, puis recommence dans chaque groupe.",
  "analogy_fr": "Pour ranger des élèves par taille, on choisit un élève de référence : les plus petits vont à sa gauche, les plus grands à sa droite. Il reste à ranger chaque groupe de la même façon.",
  "examples": [
    {
      "code": "def partition(liste, pivot):\n    petits = [x for x in liste if x < pivot]\n    egaux = [x for x in liste if x == pivot]\n    grands = [x for x in liste if x > pivot]\n    return [petits, egaux, grands]\n\nprint(partition([7, 2, 9, 4, 7, 1], 7))",
      "expected_output": "[[2, 4, 1], [7, 7], [9]]\n",
      "inputs": [],
      "trace_fr": [
        "Les éléments plus petits que 7 gardent leur ordre.",
        "Les deux 7 forment le groupe des égaux.",
        "9 est le seul plus grand."
      ]
    },
    {
      "code": "def tri_rapide(liste):\n    if len(liste) <= 1:\n        return list(liste)\n    pivot = liste[len(liste) // 2]\n    petits = [x for x in liste if x < pivot]\n    egaux = [x for x in liste if x == pivot]\n    grands = [x for x in liste if x > pivot]\n    return tri_rapide(petits) + egaux + tri_rapide(grands)\n\nprint(tri_rapide([33, 10, 55, 71, 29, 3, 18, 42]))",
      "expected_output": "[3, 10, 18, 29, 33, 42, 55, 71]\n",
      "inputs": [],
      "trace_fr": [
        "Le pivot est l’élément du milieu : 29.",
        "Les petits et les grands sont triés récursivement.",
        "Le résultat recolle petits, égaux et grands."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le groupe des égaux",
      "why_fr": "Les doublons du pivot disparaissent.",
      "fix_fr": "Garde un groupe pour les éléments égaux au pivot."
    },
    {
      "error": "Prendre toujours le premier élément comme pivot",
      "why_fr": "Une liste déjà triée devient un cas quadratique.",
      "fix_fr": "Choisis le pivot au milieu ou au hasard."
    },
    {
      "error": "Mettre les égaux avec les petits",
      "why_fr": "Une liste de valeurs identiques ne rétrécit jamais.",
      "fix_fr": "Sépare strictement petits, égaux et grands."
    }
  ],
  "quiz": [
    {
      "question": "Quelle est la complexité moyenne du tri rapide ?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "Avec des partitions équilibrées.",
      "id": "algo-m2-03-q1"
    },
    {
      "question": "Quand le tri rapide devient-il quadratique ?",
      "options": [
        "Jamais",
        "Quand le pivot coupe toujours très mal la liste",
        "Sur de petites listes",
        "Avec des doublons"
      ],
      "answer": 1,
      "explanation": "Une part vide à chaque niveau donne n niveaux.",
      "id": "algo-m2-03-q2"
    },
    {
      "question": "Que cherche quickselect ?",
      "options": [
        "La liste triée",
        "Le k-ième plus petit élément",
        "Le pivot idéal",
        "Les doublons"
      ],
      "answer": 1,
      "explanation": "Sans trier toute la liste.",
      "id": "algo-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "pivot",
      "definition": "Élément de référence autour duquel on partitionne."
    },
    {
      "term": "partition",
      "definition": "Répartition des éléments en plus petits, égaux et plus grands que le pivot."
    },
    {
      "term": "tri rapide",
      "definition": "Tri récursif par partitions successives."
    },
    {
      "term": "quickselect",
      "definition": "Recherche du k-ième plus petit élément par partitions."
    }
  ],
  "recap_fr": [
    "Partitionner une liste autour d’un pivot et écrire le tri rapide récursif.",
    "Trouver le k-ième plus petit élément sans trier toute la liste.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "pivot",
    "partition",
    "tri rapide",
    "quickselect"
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

Le tri rapide, ou quicksort, applique lui aussi la stratégie diviser pour régner, mais il fait le travail avant les appels récursifs plutôt qu’après. On choisit un élément, le pivot. On répartit les autres éléments en trois groupes : ceux qui sont plus petits que le pivot, ceux qui lui sont égaux et ceux qui sont plus grands. Cette étape s’appelle la partition. Il reste à trier récursivement les petits et les grands, puis à les recoller autour des égaux : petits triés, égaux, grands triés.

Le groupe des égaux est important. Si l’on ne garde que deux groupes, strictement plus petits et strictement plus grands, les doublons du pivot disparaissent du résultat. Si l’on met les égaux avec les petits, une liste remplie de la même valeur ne rétrécit jamais, et la récursion ne s’arrête pas.

La vitesse dépend du pivot. Si chaque partition coupe la liste en deux parts à peu près égales, on retrouve log n niveaux de n opérations : O(n log n) en moyenne. Mais avec un mauvais pivot, par exemple toujours le plus petit élément sur une liste déjà triée, une part est vide et l’autre ne perd qu’un élément : le tri devient quadratique. On choisit donc le pivot au milieu, ou au hasard, pour éviter ce cas sur des données déjà rangées, très fréquentes en pratique.

La version de ce cours crée de nouvelles listes avec des compréhensions : elle est claire mais consomme de la mémoire. Les bibliothèques utilisent une partition sur place, qui échange les éléments dans la liste elle-même ; l’idée reste la même.

La partition sert aussi à un autre problème : trouver le k-ième plus petit élément, par exemple la médiane d’une série de notes, sans trier toute la liste. Après une partition, on sait combien d’éléments sont plus petits que le pivot. Si k tombe dans les petits, on cherche seulement dans les petits ; s’il tombe dans les égaux, le pivot est la réponse ; sinon, on cherche dans les grands, en retirant de k le nombre d’éléments écartés. On ne poursuit qu’un seul côté à chaque fois : en moyenne, le travail est linéaire. Cet algorithme s’appelle quickselect.

Dans tes propres programmes, sorted reste le bon choix pour trier. Comprendre le tri rapide sert à raisonner sur les algorithmes, à lire du code existant et à résoudre des problèmes voisins comme la sélection.

## Exemple guidé 1

```python
def partition(liste, pivot):
    petits = [x for x in liste if x < pivot]
    egaux = [x for x in liste if x == pivot]
    grands = [x for x in liste if x > pivot]
    return [petits, egaux, grands]

print(partition([7, 2, 9, 4, 7, 1], 7))
```

Affichage attendu :

    [[2, 4, 1], [7, 7], [9]]

Trace :

- Les éléments plus petits que 7 gardent leur ordre.
- Les deux 7 forment le groupe des égaux.
- 9 est le seul plus grand.

## Exemple guidé 2

```python
def tri_rapide(liste):
    if len(liste) <= 1:
        return list(liste)
    pivot = liste[len(liste) // 2]
    petits = [x for x in liste if x < pivot]
    egaux = [x for x in liste if x == pivot]
    grands = [x for x in liste if x > pivot]
    return tri_rapide(petits) + egaux + tri_rapide(grands)

print(tri_rapide([33, 10, 55, 71, 29, 3, 18, 42]))
```

Affichage attendu :

    [3, 10, 18, 29, 33, 42, 55, 71]

Trace :

- Le pivot est l’élément du milieu : 29.
- Les petits et les grands sont triés récursivement.
- Le résultat recolle petits, égaux et grands.

## Vérifier et expliquer

Trie à la main huit nombres par tri rapide en notant le pivot et les trois groupes à chaque étape.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — guide du tri](https://docs.python.org/fr/3/howto/sorting.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
