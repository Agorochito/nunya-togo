---
{
  "id": "algo-m4-03",
  "title_fr": "Projet : le plus court chemin entre villes",
  "course": "algorithmes",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "algo-m4-02"
  ],
  "outcomes": [
    "Calculer les plus courtes distances dans un graphe pondéré avec l’algorithme de Dijkstra et heapq.",
    "Retrouver l’itinéraire le plus court et le comparer au trajet avec le moins d’étapes."
  ],
  "idea_fr": "Quand les routes ont des longueurs, le chemin le plus court se trouve en explorant toujours la ville la plus proche non encore fixée : c’est l’algorithme de Dijkstra.",
  "analogy_fr": "Pour aller de Lomé à Kara, le chauffeur ne compte pas les villes traversées mais les kilomètres : un détour par une bonne route peut être plus court qu’un raccourci.",
  "examples": [
    {
      "code": "import heapq\n\ntas = []\nfor km, ville in [(120, \"Kpalimé\"), (35, \"Tsévié\"), (45, \"Aného\")]:\n    heapq.heappush(tas, (km, ville))\nwhile tas:\n    print(heapq.heappop(tas))",
      "expected_output": "(35, 'Tsévié')\n(45, 'Aného')\n(120, 'Kpalimé')\n",
      "inputs": [],
      "trace_fr": [
        "Les couples sont poussés dans le désordre.",
        "heappop retire toujours la plus petite distance.",
        "Les villes sortent de la plus proche à la plus lointaine."
      ]
    },
    {
      "code": "import heapq\n\ndef dijkstra(graphe, depart):\n    dist = {depart: 0}\n    tas = [(0, depart)]\n    while tas:\n        d, ville = heapq.heappop(tas)\n        if d > dist[ville]:\n            continue\n        for voisin, km in graphe[ville].items():\n            nouvelle = d + km\n            if voisin not in dist or nouvelle < dist[voisin]:\n                dist[voisin] = nouvelle\n                heapq.heappush(tas, (nouvelle, voisin))\n    return dist\n\ngraphe = {\"Lomé\": {\"Tsévié\": 35, \"Kpalimé\": 120}, \"Tsévié\": {\"Lomé\": 35, \"Kpalimé\": 90}, \"Kpalimé\": {\"Lomé\": 120, \"Tsévié\": 90}}\nprint(dijkstra(graphe, \"Lomé\"))",
      "expected_output": "{'Lomé': 0, 'Tsévié': 35, 'Kpalimé': 120}\n",
      "inputs": [],
      "trace_fr": [
        "Tsévié, la plus proche, est fixée à 35 km.",
        "Passer par Tsévié donnerait 125 km pour Kpalimé.",
        "La route directe de 120 km reste plus courte."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser une file simple au lieu d’un tas",
      "why_fr": "La première distance trouvée n’est pas forcément la plus courte.",
      "fix_fr": "Retire toujours la ville la plus proche avec heappop."
    },
    {
      "error": "Ne pas ignorer les entrées périmées",
      "why_fr": "Des villes sont retraitées inutilement.",
      "fix_fr": "Ignore un couple dont la distance dépasse la meilleure connue."
    },
    {
      "error": "Appliquer Dijkstra avec des longueurs négatives",
      "why_fr": "Une distance fixée peut redevenir plus courte.",
      "fix_fr": "Réserve Dijkstra aux longueurs positives."
    }
  ],
  "quiz": [
    {
      "question": "Que retire heapq.heappop ?",
      "options": [
        "Le dernier élément ajouté",
        "Le plus petit élément",
        "Le premier ajouté",
        "Un élément au hasard"
      ],
      "answer": 1,
      "explanation": "Un tas garde le minimum accessible.",
      "id": "algo-m4-03-q1"
    },
    {
      "question": "Quand la distance d’une ville devient-elle définitive dans Dijkstra ?",
      "options": [
        "À sa découverte",
        "Quand elle est retirée du tas en étant la plus proche",
        "À la fin seulement",
        "Jamais"
      ],
      "answer": 1,
      "explanation": "Aucun autre chemin ne peut alors être plus court.",
      "id": "algo-m4-03-q2"
    },
    {
      "question": "Pourquoi le parcours en largeur ne suffit-il pas ici ?",
      "options": [
        "Il est trop lent",
        "Il compte les étapes, pas les kilomètres",
        "Il ne marche pas avec des villes",
        "Il suffit"
      ],
      "answer": 1,
      "explanation": "Moins d’étapes ne veut pas dire moins de kilomètres.",
      "id": "algo-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "graphe pondéré",
      "definition": "Graphe dont chaque arête porte une longueur."
    },
    {
      "term": "Dijkstra",
      "definition": "Algorithme des plus courtes distances pour des longueurs positives."
    },
    {
      "term": "tas",
      "definition": "Structure qui donne toujours accès au plus petit élément."
    },
    {
      "term": "file de priorité",
      "definition": "File où l’on retire l’élément de plus haute priorité."
    }
  ],
  "recap_fr": [
    "Calculer les plus courtes distances dans un graphe pondéré avec l’algorithme de Dijkstra et heapq.",
    "Retrouver l’itinéraire le plus court et le comparer au trajet avec le moins d’étapes.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "graphe pondéré",
    "Dijkstra",
    "tas",
    "file de priorité"
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
      "title": "Python — heapq",
      "url": "https://docs.python.org/fr/3/library/heapq.html"
    },
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    }
  ],
  "sources": [
    {
      "title": "Python — heapq",
      "url": "https://docs.python.org/fr/3/library/heapq.html",
      "scope": "Files de priorité pour le plus court chemin. Texte, exemples et exercices originaux Nunya.",
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

Le parcours en largeur trouve le trajet avec le moins d’étapes. Mais un car qui va de Lomé à Sokodé se soucie des kilomètres, pas du nombre de villes traversées. Le graphe devient pondéré : chaque route porte une longueur. Dans ce projet, la liste d’adjacence associe chaque ville à un dictionnaire voisine → kilomètres. Les distances sont indicatives et servent seulement d’exemple.

L’algorithme de Dijkstra, publié en 1959, calcule les plus courtes distances depuis une ville de départ vers toutes les autres, tant que les longueurs sont positives. Son idée : traiter les villes dans l’ordre de leur distance au départ. On garde pour chaque ville la meilleure distance connue. On choisit la ville non traitée la plus proche ; sa distance est alors définitive, car tout autre chemin passerait par une ville plus lointaine. On regarde ses voisines : si passer par elle raccourcit la distance d’une voisine, on met à jour cette distance. On recommence jusqu’à ce qu’il ne reste plus de ville à traiter.

Choisir la ville la plus proche doit être rapide. Le module heapq gère une file de priorité : un tas, dont heappop retire toujours le plus petit élément, en O(log n). On y pousse des couples (distance, ville). Une même ville peut y figurer plusieurs fois, avec des distances de plus en plus courtes ; quand on retire un couple dont la distance dépasse la meilleure distance connue, il est périmé et on l’ignore.

Remplacer le tas par une simple file, comme dans le parcours en largeur, donne de mauvais résultats : la première distance trouvée n’est plus forcément la plus courte. C’est une erreur fréquente, et l’un des exercices te la fait corriger.

Pour obtenir l’itinéraire, on note comme au parcours en largeur le parent de chaque ville, mis à jour chaque fois que sa distance diminue. On remonte ensuite les parents depuis l’arrivée.

Ce projet réunit tout le cours : un dictionnaire de dictionnaires pour le graphe, un tas pour la priorité, un dictionnaire des distances, la reconstruction d’un chemin et des cas limites, comme une ville inaccessible ou un départ égal à l’arrivée. Les applications de navigation, les réseaux téléphoniques et les livraisons utilisent des variantes de cet algorithme sur des graphes de millions de sommets.

Après ce cours, tu sais choisir une structure, estimer le coût d’un algorithme et reconnaître les grands schémas : recherche, tri, récursivité, piles, files, hachage et graphes. Ce sont les bases demandées dans les entretiens techniques d’ingénieur logiciel et dans les compétitions de programmation.

## Exemple guidé 1

```python
import heapq

tas = []
for km, ville in [(120, "Kpalimé"), (35, "Tsévié"), (45, "Aného")]:
    heapq.heappush(tas, (km, ville))
while tas:
    print(heapq.heappop(tas))
```

Affichage attendu :

    (35, 'Tsévié')
    (45, 'Aného')
    (120, 'Kpalimé')

Trace :

- Les couples sont poussés dans le désordre.
- heappop retire toujours la plus petite distance.
- Les villes sortent de la plus proche à la plus lointaine.

## Exemple guidé 2

```python
import heapq

def dijkstra(graphe, depart):
    dist = {depart: 0}
    tas = [(0, depart)]
    while tas:
        d, ville = heapq.heappop(tas)
        if d > dist[ville]:
            continue
        for voisin, km in graphe[ville].items():
            nouvelle = d + km
            if voisin not in dist or nouvelle < dist[voisin]:
                dist[voisin] = nouvelle
                heapq.heappush(tas, (nouvelle, voisin))
    return dist

graphe = {"Lomé": {"Tsévié": 35, "Kpalimé": 120}, "Tsévié": {"Lomé": 35, "Kpalimé": 90}, "Kpalimé": {"Lomé": 120, "Tsévié": 90}}
print(dijkstra(graphe, "Lomé"))
```

Affichage attendu :

    {'Lomé': 0, 'Tsévié': 35, 'Kpalimé': 120}

Trace :

- Tsévié, la plus proche, est fixée à 35 km.
- Passer par Tsévié donnerait 125 km pour Kpalimé.
- La route directe de 120 km reste plus courte.

## Vérifier et expliquer

Calcule à la main les distances depuis Lomé avec le tableau des meilleures distances connues, ville par ville, puis compare avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — heapq](https://docs.python.org/fr/3/library/heapq.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
