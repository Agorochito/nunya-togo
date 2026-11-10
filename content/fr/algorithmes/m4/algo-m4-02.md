---
{
  "id": "algo-m4-02",
  "title_fr": "Parcours en profondeur et ordre des cours",
  "course": "algorithmes",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "algo-m4-01"
  ],
  "outcomes": [
    "Explorer un graphe en profondeur, récursivement, et compter ses composantes.",
    "Ordonner des tâches qui dépendent les unes des autres : le tri topologique."
  ],
  "idea_fr": "Le parcours en profondeur va le plus loin possible sur un chemin avant de revenir en arrière ; il révèle ce qui est atteignable et ce qui dépend de quoi.",
  "analogy_fr": "Pour explorer une grotte, on suit un couloir jusqu’au bout, puis on revient au dernier embranchement pour essayer le couloir suivant, en marquant les salles déjà vues.",
  "examples": [
    {
      "code": "def accessibles(graphe, depart):\n    vus = set()\n\n    def explorer(sommet):\n        vus.add(sommet)\n        for voisin in graphe[sommet]:\n            if voisin not in vus:\n                explorer(voisin)\n\n    explorer(depart)\n    return sorted(vus)\n\ngraphe = {\"A\": [\"B\", \"C\"], \"B\": [\"A\", \"D\"], \"C\": [\"A\"], \"D\": [\"B\"], \"E\": []}\nprint(accessibles(graphe, \"A\"))\nprint(accessibles(graphe, \"E\"))",
      "expected_output": "['A', 'B', 'C', 'D']\n['E']\n",
      "inputs": [],
      "trace_fr": [
        "L’exploration part de A, va à B, puis à D.",
        "Elle revient ensuite à A pour explorer C.",
        "E n’est relié à rien : seul lui-même est atteignable."
      ]
    },
    {
      "code": "prerequis = {\"python\": [], \"algo\": [\"python\"], \"web\": [], \"projet\": [\"algo\", \"web\"]}\nrestants = {cours: len(p) for cours, p in prerequis.items()}\nordre = []\nwhile True:\n    prets = sorted(c for c, n in restants.items() if n == 0 and c not in ordre)\n    if not prets:\n        break\n    cours = prets[0]\n    ordre.append(cours)\n    for autre, p in prerequis.items():\n        if cours in p:\n            restants[autre] -= 1\nprint(ordre)",
      "expected_output": "['python', 'algo', 'web', 'projet']\n",
      "inputs": [],
      "trace_fr": [
        "python et web n’ont pas de prérequis.",
        "python, premier par ordre alphabétique, libère algo.",
        "projet arrive en dernier, après algo et web."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de marquer les sommets vus",
      "why_fr": "Les cycles provoquent une récursion sans fin.",
      "fix_fr": "Ajoute chaque sommet à un ensemble avant d’explorer ses voisins."
    },
    {
      "error": "Ignorer les dépendances circulaires",
      "why_fr": "Le tri topologique tourne sans fin ou oublie des cours.",
      "fix_fr": "Vérifie que tous les cours ont été placés."
    },
    {
      "error": "Choisir au hasard parmi les tâches prêtes",
      "why_fr": "L’ordre change d’une exécution à l’autre.",
      "fix_fr": "Trie les tâches prêtes pour un résultat stable."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi marquer les sommets vus ?",
      "options": [
        "Pour aller plus vite seulement",
        "Pour ne pas tourner en rond dans les cycles",
        "Pour trier",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Sans marquage, un cycle provoque une récursion infinie.",
      "id": "algo-m4-02-q1"
    },
    {
      "question": "Que compte-t-on en lançant une exploration depuis chaque sommet non vu ?",
      "options": [
        "Les arêtes",
        "Les composantes connexes",
        "Les cycles",
        "Les degrés"
      ],
      "answer": 1,
      "explanation": "Chaque nouvelle exploration découvre une île.",
      "id": "algo-m4-02-q2"
    },
    {
      "question": "Que révèle un tri topologique incomplet ?",
      "options": [
        "Un graphe vide",
        "Une dépendance circulaire",
        "Un graphe non orienté",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Des tâches s’attendent mutuellement.",
      "id": "algo-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "parcours en profondeur",
      "definition": "Exploration qui suit un chemin jusqu’au bout avant de revenir."
    },
    {
      "term": "composante connexe",
      "definition": "Groupe de sommets reliés entre eux et séparés des autres."
    },
    {
      "term": "graphe orienté",
      "definition": "Graphe dont les arêtes ont un sens."
    },
    {
      "term": "tri topologique",
      "definition": "Ordre où chaque tâche vient après ses prérequis."
    }
  ],
  "recap_fr": [
    "Explorer un graphe en profondeur, récursivement, et compter ses composantes.",
    "Ordonner des tâches qui dépendent les unes des autres : le tri topologique.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "parcours en profondeur",
    "composante connexe",
    "graphe orienté",
    "tri topologique"
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
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    },
    {
      "title": "Python — structures de données",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html"
    }
  ],
  "sources": [
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms",
      "scope": "Notions de recherche, tri, récursivité et graphes (ressource gratuite en français). Texte, exemples et exercices originaux Nunya.",
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

Le parcours en profondeur, ou DFS, explore un graphe en suivant un chemin aussi loin que possible. Arrivé à un sommet dont tous les voisins sont déjà connus, il revient en arrière au dernier sommet qui a encore un voisin inexploré. La récursivité l’exprime naturellement : explorer un sommet, c’est le marquer comme vu, puis explorer chacun de ses voisins non encore vus.

Le marquage est indispensable. Un graphe contient souvent des cycles : Lomé, Tsévié, Kpalimé, puis de nouveau Lomé. Sans mémoire des sommets vus, la récursion tournerait dans ce cycle jusqu’à l’erreur RecursionError. Un ensemble, vus, fait ce travail en O(1) par test.

Le parcours en profondeur répond vite à la question : quels sommets sont atteignables depuis un départ ? Il sert aussi à compter les composantes connexes, c’est-à-dire les groupes de sommets reliés entre eux mais séparés des autres, comme des îles. On parcourt tous les sommets ; chaque fois qu’on en trouve un pas encore vu, on lance une exploration à partir de lui et on compte une composante de plus. Dans un réseau électrique ou informatique, plusieurs composantes signalent des zones isolées du reste.

Une application très utile concerne les dépendances. Dans Nunya, certains cours en exigent d’autres : le cours de cybersécurité demande Python et les réseaux. Ces exigences forment un graphe orienté : une flèche va d’un prérequis vers le cours qui l’exige. Pour proposer un ordre d’apprentissage, il faut un ordre où chaque cours vient après tous ses prérequis : c’est un tri topologique.

Une méthode simple, dite de Kahn, compte pour chaque cours le nombre de prérequis non encore placés. On place d’abord les cours sans prérequis restant ; chaque cours placé diminue le compteur des cours qui en dépendaient, et ceux qui tombent à zéro deviennent disponibles. Pour obtenir un ordre stable, on choisit à chaque étape le premier disponible par ordre alphabétique. Si des cours restent impossibles à placer, c’est qu’il existe une dépendance circulaire : A exige B qui exige A. L’ordre est alors impossible, et le programme doit le signaler plutôt que de tourner indéfiniment.

Le même raisonnement ordonne les étapes d’un chantier, les tâches d’un projet ou la compilation de fichiers qui s’importent les uns les autres. Les graphes sont partout dès que des choses dépendent d’autres choses.

## Exemple guidé 1

```python
def accessibles(graphe, depart):
    vus = set()

    def explorer(sommet):
        vus.add(sommet)
        for voisin in graphe[sommet]:
            if voisin not in vus:
                explorer(voisin)

    explorer(depart)
    return sorted(vus)

graphe = {"A": ["B", "C"], "B": ["A", "D"], "C": ["A"], "D": ["B"], "E": []}
print(accessibles(graphe, "A"))
print(accessibles(graphe, "E"))
```

Affichage attendu :

    ['A', 'B', 'C', 'D']
    ['E']

Trace :

- L’exploration part de A, va à B, puis à D.
- Elle revient ensuite à A pour explorer C.
- E n’est relié à rien : seul lui-même est atteignable.

## Exemple guidé 2

```python
prerequis = {"python": [], "algo": ["python"], "web": [], "projet": ["algo", "web"]}
restants = {cours: len(p) for cours, p in prerequis.items()}
ordre = []
while True:
    prets = sorted(c for c, n in restants.items() if n == 0 and c not in ordre)
    if not prets:
        break
    cours = prets[0]
    ordre.append(cours)
    for autre, p in prerequis.items():
        if cours in p:
            restants[autre] -= 1
print(ordre)
```

Affichage attendu :

    ['python', 'algo', 'web', 'projet']

Trace :

- python et web n’ont pas de prérequis.
- python, premier par ordre alphabétique, libère algo.
- projet arrive en dernier, après algo et web.

## Vérifier et expliquer

Dessine les prérequis de quelques cours de Nunya et trouve à la main un ordre valide avant de lancer le programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
- [Python — structures de données](https://docs.python.org/fr/3/tutorial/datastructures.html)
