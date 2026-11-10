---
{
  "id": "algo-m2-02",
  "title_fr": "Diviser pour régner : le tri fusion",
  "course": "algorithmes",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "algo-m2-01"
  ],
  "outcomes": [
    "Fusionner deux listes triées en une seule liste triée en temps linéaire.",
    "Écrire le tri fusion récursif et expliquer sa complexité en n log n."
  ],
  "idea_fr": "Diviser un gros problème en deux moitiés, les résoudre, puis combiner les solutions : cette stratégie rend le tri beaucoup plus rapide.",
  "analogy_fr": "Deux files d’élèves déjà rangées par taille se fusionnent facilement : on compare les premiers de chaque file et on fait passer le plus petit, encore et encore.",
  "examples": [
    {
      "code": "def fusionner(a, b):\n    resultat = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            resultat.append(a[i])\n            i += 1\n        else:\n            resultat.append(b[j])\n            j += 1\n    resultat += a[i:]\n    resultat += b[j:]\n    return resultat\n\nprint(fusionner([2, 9, 14], [4, 5, 20, 21]))",
      "expected_output": "[2, 4, 5, 9, 14, 20, 21]\n",
      "inputs": [],
      "trace_fr": [
        "On compare 2 et 4 : 2 passe.",
        "Puis 9 et 4, 9 et 5, 9 et 20…",
        "Quand la première liste est épuisée, 20 et 21 sont ajoutés."
      ]
    },
    {
      "code": "def fusionner(a, b):\n    resultat = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            resultat.append(a[i])\n            i += 1\n        else:\n            resultat.append(b[j])\n            j += 1\n    resultat += a[i:]\n    resultat += b[j:]\n    return resultat\n\ndef tri_fusion(liste):\n    if len(liste) <= 1:\n        return list(liste)\n    milieu = len(liste) // 2\n    return fusionner(tri_fusion(liste[:milieu]), tri_fusion(liste[milieu:]))\n\nprint(tri_fusion([38, 27, 43, 3, 9, 82, 10]))",
      "expected_output": "[3, 9, 10, 27, 38, 43, 82]\n",
      "inputs": [],
      "trace_fr": [
        "La liste est coupée en [38, 27, 43] et [3, 9, 82, 10].",
        "Chaque moitié est triée récursivement.",
        "La fusion finale combine les deux moitiés triées."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier les éléments restants",
      "why_fr": "La fin d’une des listes disparaît.",
      "fix_fr": "Ajoute a[i:] et b[j:] après la boucle."
    },
    {
      "error": "Utiliser < au lieu de <= dans la fusion",
      "why_fr": "Le tri perd sa stabilité.",
      "fix_fr": "Prends l’élément de gauche en cas d’égalité."
    },
    {
      "error": "Pas de cas de base",
      "why_fr": "La découpe ne s’arrête jamais.",
      "fix_fr": "Une liste de 0 ou 1 élément est déjà triée."
    }
  ],
  "quiz": [
    {
      "question": "Quel est le coût de la fusion de deux listes de taille totale n ?",
      "options": [
        "O(1)",
        "O(n)",
        "O(n²)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "Chaque élément est examiné une fois.",
      "id": "algo-m2-02-q1"
    },
    {
      "question": "Quelle est la complexité du tri fusion ?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "n opérations par niveau, log n niveaux.",
      "id": "algo-m2-02-q2"
    },
    {
      "question": "Quel est le principal coût caché du tri fusion ?",
      "options": [
        "Il est instable",
        "Il utilise de la mémoire supplémentaire",
        "Il ne trie pas les nombres",
        "Il est quadratique"
      ],
      "answer": 1,
      "explanation": "Il crée de nouvelles listes.",
      "id": "algo-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "diviser pour régner",
      "definition": "Stratégie qui découpe un problème, résout les parties et combine."
    },
    {
      "term": "fusion",
      "definition": "Combinaison de deux listes triées en une liste triée."
    },
    {
      "term": "O(n log n)",
      "definition": "Complexité des meilleurs tris par comparaison."
    },
    {
      "term": "compromis temps-mémoire",
      "definition": "Gain de vitesse obtenu en utilisant plus de mémoire."
    }
  ],
  "recap_fr": [
    "Fusionner deux listes triées en une seule liste triée en temps linéaire.",
    "Écrire le tri fusion récursif et expliquer sa complexité en n log n.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "diviser pour régner",
    "fusion",
    "O(n log n)",
    "compromis temps-mémoire"
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

Les tris de la leçon précédente sont quadratiques. Pour trier un million d’éléments, il leur faudrait de l’ordre de mille milliards d’opérations. La stratégie « diviser pour régner » fait bien mieux : on coupe le problème en deux moitiés, on résout chaque moitié séparément, puis on combine les deux solutions.

Pour le tri, la combinaison est la fusion. Fusionner deux listes déjà triées est simple et rapide. On garde un indice dans chaque liste. À chaque étape, on compare les deux éléments indiqués et on ajoute le plus petit au résultat, puis on avance dans sa liste. Quand une liste est épuisée, on ajoute tout le reste de l’autre, déjà trié. Chaque élément est examiné une seule fois : la fusion est linéaire.

Le tri fusion s’écrit alors en trois lignes récursives. Une liste de zéro ou un élément est déjà triée : c’est le cas de base. Sinon, on coupe la liste en deux au milieu, on trie récursivement chaque moitié, et on fusionne les deux moitiés triées.

Pourquoi est-ce rapide ? À chaque niveau de découpage, la fusion de toutes les morceaux coûte n opérations au total. Et comme on divise par deux à chaque niveau, il y a environ log₂ n niveaux, comme pour la dichotomie. Le coût total est donc n × log n. Pour un million d’éléments, cela fait environ vingt millions d’opérations au lieu de mille milliards : la différence entre une seconde et des heures.

Deux détails comptent dans la fusion. D’abord, il ne faut pas oublier les éléments restants : quand une liste est épuisée, l’autre peut encore contenir plusieurs éléments, à ajouter tels quels. Ensuite, en cas d’égalité, prendre l’élément de la liste de gauche, avec <=, garde l’ordre d’origine des éléments égaux : le tri fusion est stable.

Le tri fusion a un défaut : il crée de nouvelles listes à chaque niveau, et utilise donc de la mémoire supplémentaire. C’est un compromis classique entre temps et mémoire. L’algorithme de sorted en Python, Timsort, combine des idées de la fusion et du tri par insertion pour profiter des morceaux déjà triés des données réelles.

La fusion est utile bien au-delà du tri : réunir les classements de deux classes, les listes triées de deux agences, ou les journaux de deux serveurs rangés par date, sans tout retrier.

## Exemple guidé 1

```python
def fusionner(a, b):
    resultat = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            resultat.append(a[i])
            i += 1
        else:
            resultat.append(b[j])
            j += 1
    resultat += a[i:]
    resultat += b[j:]
    return resultat

print(fusionner([2, 9, 14], [4, 5, 20, 21]))
```

Affichage attendu :

    [2, 4, 5, 9, 14, 20, 21]

Trace :

- On compare 2 et 4 : 2 passe.
- Puis 9 et 4, 9 et 5, 9 et 20…
- Quand la première liste est épuisée, 20 et 21 sont ajoutés.

## Exemple guidé 2

```python
def fusionner(a, b):
    resultat = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            resultat.append(a[i])
            i += 1
        else:
            resultat.append(b[j])
            j += 1
    resultat += a[i:]
    resultat += b[j:]
    return resultat

def tri_fusion(liste):
    if len(liste) <= 1:
        return list(liste)
    milieu = len(liste) // 2
    return fusionner(tri_fusion(liste[:milieu]), tri_fusion(liste[milieu:]))

print(tri_fusion([38, 27, 43, 3, 9, 82, 10]))
```

Affichage attendu :

    [3, 9, 10, 27, 38, 43, 82]

Trace :

- La liste est coupée en [38, 27, 43] et [3, 9, 82, 10].
- Chaque moitié est triée récursivement.
- La fusion finale combine les deux moitiés triées.

## Vérifier et expliquer

Trie à la main sept cartes par fusion, en dessinant l’arbre des découpages puis des fusions.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — guide du tri](https://docs.python.org/fr/3/howto/sorting.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
