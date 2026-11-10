---
{
  "id": "algo-m4-01",
  "title_fr": "Graphes et parcours en largeur",
  "course": "algorithmes",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "algo-m3-03"
  ],
  "outcomes": [
    "Représenter un réseau de villes par un graphe en liste d’adjacence.",
    "Calculer avec un parcours en largeur le nombre minimal d’étapes et retrouver le chemin."
  ],
  "idea_fr": "Un graphe relie des points par des liens ; le parcours en largeur l’explore par cercles successifs et trouve les trajets avec le moins d’étapes.",
  "analogy_fr": "Une nouvelle se répand au marché : d’abord aux voisins directs, puis aux voisins des voisins. Le nombre de bouches à oreille indique la distance.",
  "examples": [
    {
      "code": "graphe = {\"Lomé\": [\"Tsévié\", \"Aného\"], \"Tsévié\": [\"Lomé\", \"Notsé\"], \"Aného\": [\"Lomé\"], \"Notsé\": [\"Tsévié\"]}\nfor ville, voisins in graphe.items():\n    print(ville, \"->\", \", \".join(voisins), \"(\", len(voisins), \")\")",
      "expected_output": "Lomé -> Tsévié, Aného ( 2 )\nTsévié -> Lomé, Notsé ( 2 )\nAného -> Lomé ( 1 )\nNotsé -> Tsévié ( 1 )\n",
      "inputs": [],
      "trace_fr": [
        "Chaque ville donne la liste de ses voisines.",
        "Une route à double sens apparaît dans les deux listes.",
        "La longueur de la liste est le degré de la ville."
      ]
    },
    {
      "code": "from collections import deque\n\ndef distances(graphe, depart):\n    dist = {depart: 0}\n    file = deque([depart])\n    while file:\n        ville = file.popleft()\n        for voisin in graphe[ville]:\n            if voisin not in dist:\n                dist[voisin] = dist[ville] + 1\n                file.append(voisin)\n    return dist\n\ngraphe = {\"Lomé\": [\"Tsévié\", \"Aného\"], \"Tsévié\": [\"Lomé\", \"Notsé\"], \"Aného\": [\"Lomé\"], \"Notsé\": [\"Tsévié\"]}\nprint(distances(graphe, \"Lomé\"))",
      "expected_output": "{'Lomé': 0, 'Tsévié': 1, 'Aného': 1, 'Notsé': 2}\n",
      "inputs": [],
      "trace_fr": [
        "Lomé est à 0 étape.",
        "Ses voisines sont à 1 étape.",
        "Notsé, voisine de Tsévié, est à 2 étapes."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de mémoriser les sommets vus",
      "why_fr": "Les routes à double sens font tourner le parcours en rond.",
      "fix_fr": "Teste si le voisin est déjà dans le dictionnaire."
    },
    {
      "error": "Utiliser pop() au lieu de popleft()",
      "why_fr": "Le parcours devient en profondeur : les étapes ne sont plus minimales.",
      "fix_fr": "Utilise une file et popleft."
    },
    {
      "error": "Confondre étapes et kilomètres",
      "why_fr": "Le moins d’étapes n’est pas forcément le plus court.",
      "fix_fr": "Utilise Dijkstra pour des distances."
    }
  ],
  "quiz": [
    {
      "question": "Quelle structure utilise le parcours en largeur ?",
      "options": [
        "Une pile",
        "Une file",
        "Un ensemble seul",
        "Une liste triée"
      ],
      "answer": 1,
      "explanation": "La file garantit l’exploration par niveaux.",
      "id": "algo-m4-01-q1"
    },
    {
      "question": "Que donne le parcours en largeur ?",
      "options": [
        "Le chemin le plus court en kilomètres",
        "Le plus petit nombre d’étapes",
        "Le chemin le plus long",
        "Un tri des villes"
      ],
      "answer": 1,
      "explanation": "Il compte des arêtes.",
      "id": "algo-m4-01-q2"
    },
    {
      "question": "Comment retrouver le chemin, pas seulement sa longueur ?",
      "options": [
        "Trier les villes",
        "Noter le parent de chaque ville découverte",
        "Relancer le parcours",
        "Impossible"
      ],
      "answer": 1,
      "explanation": "On remonte les parents depuis la destination.",
      "id": "algo-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "graphe",
      "definition": "Ensemble de sommets reliés par des arêtes."
    },
    {
      "term": "liste d’adjacence",
      "definition": "Dictionnaire qui associe chaque sommet à ses voisins."
    },
    {
      "term": "parcours en largeur",
      "definition": "Exploration par niveaux à l’aide d’une file."
    },
    {
      "term": "parent",
      "definition": "Sommet depuis lequel un sommet a été découvert."
    }
  ],
  "recap_fr": [
    "Représenter un réseau de villes par un graphe en liste d’adjacence.",
    "Calculer avec un parcours en largeur le nombre minimal d’étapes et retrouver le chemin.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "graphe",
    "liste d’adjacence",
    "parcours en largeur",
    "parent"
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
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html"
    },
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    }
  ],
  "sources": [
    {
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html",
      "scope": "deque pour les files, Counter pour compter. Texte, exemples et exercices originaux Nunya.",
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

Beaucoup de problèmes parlent de relations : des villes reliées par des routes, des élèves amis entre eux, des pages web reliées par des liens, des cours qui en exigent d’autres. On les représente par un graphe : des sommets, comme les villes, et des arêtes, comme les routes qui les relient.

En Python, la représentation la plus pratique est la liste d’adjacence : un dictionnaire qui associe à chaque sommet la liste de ses voisins. graphe["Lomé"] donne ["Tsévié", "Aného", "Kpalimé"]. Pour une route à double sens, chaque ville apparaît dans la liste de l’autre. Ce cours utilise un graphe simplifié de quelques villes du Togo ; les liaisons sont indicatives et servent seulement d’exemple.

Le parcours en largeur, en anglais BFS, explore le graphe à partir d’un sommet de départ, par niveaux. On visite d’abord tous les voisins directs, à une étape ; puis tous leurs voisins non encore vus, à deux étapes ; et ainsi de suite. Une file, deque, garantit cet ordre : on retire une ville au début, on ajoute ses voisins nouveaux à la fin. Un dictionnaire des distances sert à la fois à noter le nombre d’étapes et à mémoriser les villes déjà découvertes, pour ne jamais les traiter deux fois. Sans cette mémoire, les routes à double sens feraient tourner l’algorithme en rond.

Grâce à l’ordre de la file, la première fois qu’on découvre une ville, c’est par un chemin d’étapes minimal. Le parcours en largeur donne donc le plus petit nombre d’étapes, c’est-à-dire de routes à emprunter, depuis le départ vers chaque ville atteignable. Chaque ville et chaque route sont examinées une fois : le coût est linéaire en taille du graphe.

Pour retrouver le chemin lui-même, et pas seulement sa longueur, on note pour chaque ville découverte la ville d’où l’on vient : son parent. À la fin, on remonte de la destination jusqu’au départ en suivant les parents, puis on inverse la liste obtenue. Si la destination n’a jamais été découverte, aucun chemin n’existe.

Attention : le parcours en largeur compte des étapes, pas des kilomètres. Deux routes courtes peuvent être plus longues qu’une seule longue route, ou l’inverse. Pour tenir compte des distances, il faudra l’algorithme de Dijkstra, au projet final. Si on remplace la file par une pile, en retirant le dernier élément, on obtient un autre parcours, en profondeur, qui ne garantit plus le minimum d’étapes : c’est l’objet de la leçon suivante.

## Exemple guidé 1

```python
graphe = {"Lomé": ["Tsévié", "Aného"], "Tsévié": ["Lomé", "Notsé"], "Aného": ["Lomé"], "Notsé": ["Tsévié"]}
for ville, voisins in graphe.items():
    print(ville, "->", ", ".join(voisins), "(", len(voisins), ")")
```

Affichage attendu :

    Lomé -> Tsévié, Aného ( 2 )
    Tsévié -> Lomé, Notsé ( 2 )
    Aného -> Lomé ( 1 )
    Notsé -> Tsévié ( 1 )

Trace :

- Chaque ville donne la liste de ses voisines.
- Une route à double sens apparaît dans les deux listes.
- La longueur de la liste est le degré de la ville.

## Exemple guidé 2

```python
from collections import deque

def distances(graphe, depart):
    dist = {depart: 0}
    file = deque([depart])
    while file:
        ville = file.popleft()
        for voisin in graphe[ville]:
            if voisin not in dist:
                dist[voisin] = dist[ville] + 1
                file.append(voisin)
    return dist

graphe = {"Lomé": ["Tsévié", "Aného"], "Tsévié": ["Lomé", "Notsé"], "Aného": ["Lomé"], "Notsé": ["Tsévié"]}
print(distances(graphe, "Lomé"))
```

Affichage attendu :

    {'Lomé': 0, 'Tsévié': 1, 'Aného': 1, 'Notsé': 2}

Trace :

- Lomé est à 0 étape.
- Ses voisines sont à 1 étape.
- Notsé, voisine de Tsévié, est à 2 étapes.

## Vérifier et expliquer

Dessine le graphe des villes de l’exercice et colorie les villes niveau par niveau depuis Lomé.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — collections](https://docs.python.org/fr/3/library/collections.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
