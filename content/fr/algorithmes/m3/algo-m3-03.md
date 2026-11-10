---
{
  "id": "algo-m3-03",
  "title_fr": "Dictionnaires et ensembles : trouver en un instant",
  "course": "algorithmes",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "algo-m3-02"
  ],
  "outcomes": [
    "Utiliser dictionnaires et ensembles pour compter, regrouper et rechercher en temps constant moyen.",
    "Remplacer une double boucle par un dictionnaire dans des problèmes classiques."
  ],
  "idea_fr": "Un dictionnaire range chaque valeur dans une case calculée à partir de sa clé : on la retrouve directement, sans parcourir.",
  "analogy_fr": "Dans un bureau de poste, chaque boîte porte un numéro : le facteur va droit à la bonne boîte au lieu de fouiller toutes les lettres.",
  "examples": [
    {
      "code": "from collections import Counter\n\ntexte = \"riz huile riz savon riz huile\"\ncompte = {}\nfor mot in texte.split():\n    compte[mot] = compte.get(mot, 0) + 1\nprint(compte)\nprint(Counter(texte.split()).most_common(1))",
      "expected_output": "{'riz': 3, 'huile': 2, 'savon': 1}\n[('riz', 3)]\n",
      "inputs": [],
      "trace_fr": [
        "get(mot, 0) donne 0 pour un mot nouveau.",
        "Le dictionnaire garde l’ordre de première apparition.",
        "Counter fait le même comptage et trouve le plus fréquent."
      ]
    },
    {
      "code": "def deux_sommes(nombres, cible):\n    vus = {}\n    for i, n in enumerate(nombres):\n        if cible - n in vus:\n            return [vus[cible - n], i]\n        vus[n] = i\n    return None\n\nprint(deux_sommes([1200, 300, 650, 900], 1550))\nprint(deux_sommes([1, 2], 10))",
      "expected_output": "[2, 3]\nNone\n",
      "inputs": [],
      "trace_fr": [
        "Pour 900, le complément 650 a déjà été vu à l’indice 2.",
        "Chaque nombre est examiné une seule fois.",
        "Aucune paire ne fait 10 : None."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser une liste comme clé",
      "why_fr": "Python refuse : unhashable type.",
      "fix_fr": "Convertis en tuple ou en texte."
    },
    {
      "error": "Lire une clé absente avec des crochets",
      "why_fr": "KeyError.",
      "fix_fr": "Utilise get(cle, defaut) ou setdefault."
    },
    {
      "error": "Comparer toutes les paires",
      "why_fr": "O(n²) quand O(n) suffit.",
      "fix_fr": "Mémorise ce qui a déjà été vu dans un dictionnaire."
    }
  ],
  "quiz": [
    {
      "question": "Quel coût moyen pour lire une valeur par sa clé dans un dictionnaire ?",
      "options": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      "answer": 0,
      "explanation": "Le hachage trouve directement la case.",
      "id": "algo-m3-03-q1"
    },
    {
      "question": "Laquelle peut servir de clé ?",
      "options": [
        "[1, 2]",
        "{1, 2}",
        "(1, 2)",
        "{\"a\": 1}"
      ],
      "answer": 2,
      "explanation": "Un tuple est immuable.",
      "id": "algo-m3-03-q2"
    },
    {
      "question": "Que donne {1, 2, 3} & {2, 3, 4} ?",
      "options": [
        "{1, 2, 3, 4}",
        "{2, 3}",
        "{1}",
        "{4}"
      ],
      "answer": 1,
      "explanation": "& donne l’intersection.",
      "id": "algo-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "hachage",
      "definition": "Calcul qui transforme une clé en emplacement de rangement."
    },
    {
      "term": "clé immuable",
      "definition": "Clé qui ne peut pas changer : nombre, texte, tuple."
    },
    {
      "term": "Counter",
      "definition": "Dictionnaire spécialisé du module collections pour compter."
    },
    {
      "term": "complément",
      "definition": "Valeur qui manque pour atteindre une cible : cible moins n."
    }
  ],
  "recap_fr": [
    "Utiliser dictionnaires et ensembles pour compter, regrouper et rechercher en temps constant moyen.",
    "Remplacer une double boucle par un dictionnaire dans des problèmes classiques.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "hachage",
    "clé immuable",
    "Counter",
    "complément"
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
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html"
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
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html",
      "scope": "deque pour les files, Counter pour compter. Texte, exemples et exercices originaux Nunya.",
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

Les dictionnaires et les ensembles de Python reposent sur le hachage. À partir d’une clé, une fonction de hachage calcule un nombre qui indique directement où ranger et retrouver la valeur. Chercher une clé, ajouter ou supprimer coûte donc O(1) en moyenne, quelle que soit la taille. C’est ce qui les rend si puissants pour les algorithmes.

Une clé doit être immuable : un nombre, un texte ou un tuple peuvent servir de clé ; une liste ou un ensemble, non, car ils peuvent changer et leur case deviendrait fausse. Python refuse avec l’erreur unhashable type. Pour utiliser une liste comme clé, on la convertit en tuple, ou en texte.

Premier schéma : compter. Pour compter les mots d’un texte, on parcourt les mots et on augmente le compteur de chacun : compte[mot] = compte.get(mot, 0) + 1. collections.Counter fait la même chose en une ligne et fournit most_common.

Deuxième schéma : regrouper. Pour regrouper des mots qui sont des anagrammes, comme tissu et suits, on choisit une clé commune à tout le groupe : les lettres triées, ''.join(sorted(mot)). Chaque mot est ajouté à la liste de sa clé, avec setdefault ou un defaultdict. Une seule passe suffit, au lieu de comparer chaque mot à tous les autres.

Troisième schéma : se souvenir de ce qu’on a vu. Le problème des deux sommes demande deux nombres d’une liste dont la somme vaut une cible, par exemple deux articles qui font exactement le budget d’un client. La méthode naïve essaie toutes les paires : O(n²). La méthode avec dictionnaire parcourt la liste une seule fois ; pour chaque nombre, elle cherche si son complément, cible moins le nombre, a déjà été vu, et sinon elle mémorise le nombre avec son indice. O(n).

Les ensembles servent à tester l’appartenance, à retirer les doublons et à comparer des groupes : & donne les éléments communs, | la réunion, - la différence. Les élèves inscrits à deux clubs sont l’intersection de deux ensembles.

Un dictionnaire conserve l’ordre d’insertion de ses clés depuis Python 3.7 : on peut donc trouver le premier élément unique d’une liste en comptant d’abord, puis en reparcourant la liste dans l’ordre. Deux passages linéaires restent bien plus rapides qu’une double boucle. Ce cours a commencé par compter les opérations : voici la récompense, des structures qui transforment des problèmes quadratiques en problèmes linéaires.

## Exemple guidé 1

```python
from collections import Counter

texte = "riz huile riz savon riz huile"
compte = {}
for mot in texte.split():
    compte[mot] = compte.get(mot, 0) + 1
print(compte)
print(Counter(texte.split()).most_common(1))
```

Affichage attendu :

    {'riz': 3, 'huile': 2, 'savon': 1}
    [('riz', 3)]

Trace :

- get(mot, 0) donne 0 pour un mot nouveau.
- Le dictionnaire garde l’ordre de première apparition.
- Counter fait le même comptage et trouve le plus fréquent.

## Exemple guidé 2

```python
def deux_sommes(nombres, cible):
    vus = {}
    for i, n in enumerate(nombres):
        if cible - n in vus:
            return [vus[cible - n], i]
        vus[n] = i
    return None

print(deux_sommes([1200, 300, 650, 900], 1550))
print(deux_sommes([1, 2], 10))
```

Affichage attendu :

    [2, 3]
    None

Trace :

- Pour 900, le complément 650 a déjà été vu à l’indice 2.
- Chaque nombre est examiné une seule fois.
- Aucune paire ne fait 10 : None.

## Vérifier et expliquer

Résous deux_sommes à la main avec un tableau des valeurs déjà vues, puis compte combien de paires la méthode naïve aurait testées.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — structures de données](https://docs.python.org/fr/3/tutorial/datastructures.html)
- [Python — collections](https://docs.python.org/fr/3/library/collections.html)
- [Python Wiki — complexité des opérations](https://wiki.python.org/moin/TimeComplexity)
