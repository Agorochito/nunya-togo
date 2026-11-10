---
{
  "id": "algo-m3-02",
  "title_fr": "Les files : premier arrivé, premier servi",
  "course": "algorithmes",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "algo-m3-01"
  ],
  "outcomes": [
    "Utiliser collections.deque comme file avec append et popleft.",
    "Simuler une file d’attente et un partage du temps à tour de rôle."
  ],
  "idea_fr": "Une file sert les éléments dans leur ordre d’arrivée : on ajoute à la fin et on retire au début.",
  "analogy_fr": "La file devant le guichet de la poste : la personne arrivée en premier est servie en premier, les nouveaux se placent à la fin.",
  "examples": [
    {
      "code": "from collections import deque\n\nfile = deque([\"Afi\", \"Kofi\"])\nfile.append(\"Esi\")\nprint(file.popleft())\nprint(list(file))\nderniers = deque(maxlen=3)\nfor n in range(1, 6):\n    derniers.append(n)\nprint(list(derniers))",
      "expected_output": "Afi\n['Kofi', 'Esi']\n[3, 4, 5]\n",
      "inputs": [],
      "trace_fr": [
        "Afi, arrivée la première, est servie la première.",
        "Esi s’est placée à la fin.",
        "Avec maxlen=3, seuls les trois derniers nombres restent."
      ]
    },
    {
      "code": "def attentes(clients):\n    fin = 0\n    resultat = []\n    for arrivee, duree in clients:\n        debut = max(arrivee, fin)\n        resultat.append(debut - arrivee)\n        fin = debut + duree\n    return resultat\n\nprint(attentes([(0, 5), (1, 3), (10, 2)]))",
      "expected_output": "[0, 4, 0]\n",
      "inputs": [],
      "trace_fr": [
        "Le premier client est servi à son arrivée.",
        "Le deuxième arrive à 1 mais attend la fin du premier, à 5 : 4 minutes.",
        "Le troisième arrive après la fin : aucune attente."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Retirer avec pop(0) sur une grande liste",
      "why_fr": "Chaque retrait décale tous les éléments.",
      "fix_fr": "Utilise deque et popleft."
    },
    {
      "error": "Retirer avec pop() au lieu de popleft()",
      "why_fr": "On sert le dernier arrivé : c’est une pile.",
      "fix_fr": "Une file retire au début."
    },
    {
      "error": "Commencer le service à l’arrivée sans regarder le guichet",
      "why_fr": "Deux clients seraient servis en même temps.",
      "fix_fr": "Le service commence à max(arrivée, fin précédente)."
    }
  ],
  "quiz": [
    {
      "question": "Quelle règle suit une file ?",
      "options": [
        "Dernier arrivé, premier sorti",
        "Premier arrivé, premier sorti",
        "Le plus petit sort d’abord",
        "Au hasard"
      ],
      "answer": 1,
      "explanation": "C’est l’ordre d’arrivée.",
      "id": "algo-m3-02-q1"
    },
    {
      "question": "Pourquoi deque plutôt qu’une liste pour une file ?",
      "options": [
        "Pour trier",
        "popleft est en O(1)",
        "Pour économiser une ligne",
        "Il n’y a pas de différence"
      ],
      "answer": 1,
      "explanation": "pop(0) d’une liste est en O(n).",
      "id": "algo-m3-02-q2"
    },
    {
      "question": "Que garde deque(maxlen=3) après six ajouts ?",
      "options": [
        "Les trois premiers",
        "Les trois derniers",
        "Rien",
        "Les six"
      ],
      "answer": 1,
      "explanation": "Les plus anciens sont supprimés automatiquement.",
      "id": "algo-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "file",
      "definition": "Structure où le premier élément ajouté sort en premier."
    },
    {
      "term": "deque",
      "definition": "File à double extrémité du module collections."
    },
    {
      "term": "simulation",
      "definition": "Reproduction pas à pas d’un fonctionnement réel."
    },
    {
      "term": "tourniquet",
      "definition": "Partage du temps où chaque tâche avance à tour de rôle."
    }
  ],
  "recap_fr": [
    "Utiliser collections.deque comme file avec append et popleft.",
    "Simuler une file d’attente et un partage du temps à tour de rôle.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "file",
    "deque",
    "simulation",
    "tourniquet"
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
      "title": "Python — structures de données",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html"
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
      "title": "Python — structures de données",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html",
      "scope": "Listes, piles, files, ensembles et dictionnaires. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une file suit la règle inverse de la pile : premier arrivé, premier sorti. On ajoute à la fin et on retire au début. C’est la structure naturelle de tout ce qui attend son tour : clients à un guichet, documents envoyés à une imprimante, messages à traiter, tâches d’un serveur.

On pourrait utiliser une liste et retirer avec pop(0). Mais retirer le premier élément d’une liste oblige Python à décaler tous les autres : O(n) à chaque retrait, et une file de 100 000 éléments devient lente. Le module collections fournit deque, une file à double extrémité conçue pour cela : append ajoute à droite, popleft retire à gauche, tous deux en O(1). deque permet aussi appendleft et pop, et accepte une longueur maximale, maxlen, qui supprime automatiquement les plus anciens éléments quand elle est pleine : pratique pour garder les dix derniers événements d’un journal.

Les files servent à simuler. Imagine un guichet de mobile money : chaque client arrive à une heure donnée et demande une certaine durée de service. Le guichet sert les clients dans l’ordre d’arrivée. Pour chaque client, le service commence au plus tard des deux moments suivants : son arrivée, ou la fin du client précédent. Son attente est la différence entre le début du service et son arrivée. Une telle simulation aide à décider s’il faut ouvrir un deuxième guichet aux heures de pointe.

Un autre usage est le partage du temps à tour de rôle, ou tourniquet. Un ordinateur qui exécute plusieurs programmes donne à chacun une petite tranche de temps, puis passe au suivant. Un programme qui n’a pas fini retourne à la fin de la file avec ce qui lui reste à faire. Aucun programme n’attend indéfiniment, et chacun avance régulièrement.

Les files sont aussi au cœur du parcours en largeur des graphes, au module suivant : on y range les villes à visiter dans l’ordre où on les découvre, ce qui donne les trajets avec le moins d’étapes.

Une file vide est fausse dans un test : while file: s’arrête quand il ne reste plus rien à traiter. Et comme pour la pile, retirer d’une file vide provoque une erreur, IndexError : teste toujours avant de retirer quand ce cas peut arriver.

## Exemple guidé 1

```python
from collections import deque

file = deque(["Afi", "Kofi"])
file.append("Esi")
print(file.popleft())
print(list(file))
derniers = deque(maxlen=3)
for n in range(1, 6):
    derniers.append(n)
print(list(derniers))
```

Affichage attendu :

    Afi
    ['Kofi', 'Esi']
    [3, 4, 5]

Trace :

- Afi, arrivée la première, est servie la première.
- Esi s’est placée à la fin.
- Avec maxlen=3, seuls les trois derniers nombres restent.

## Exemple guidé 2

```python
def attentes(clients):
    fin = 0
    resultat = []
    for arrivee, duree in clients:
        debut = max(arrivee, fin)
        resultat.append(debut - arrivee)
        fin = debut + duree
    return resultat

print(attentes([(0, 5), (1, 3), (10, 2)]))
```

Affichage attendu :

    [0, 4, 0]

Trace :

- Le premier client est servi à son arrivée.
- Le deuxième arrive à 1 mais attend la fin du premier, à 5 : 4 minutes.
- Le troisième arrive après la fin : aucune attente.

## Vérifier et expliquer

Simule à la main un guichet avec quatre clients, puis vérifie les attentes avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — collections](https://docs.python.org/fr/3/library/collections.html)
- [Python — structures de données](https://docs.python.org/fr/3/tutorial/datastructures.html)
