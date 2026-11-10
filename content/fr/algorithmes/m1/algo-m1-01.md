---
{
  "id": "algo-m1-01",
  "title_fr": "Compter les opérations : la complexité",
  "course": "algorithmes",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "py-m12-03"
  ],
  "outcomes": [
    "Compter les opérations d’un algorithme et prévoir comment ce nombre grandit avec la taille des données.",
    "Reconnaître les croissances constante, logarithmique, linéaire et quadratique."
  ],
  "idea_fr": "Un bon algorithme ne se juge pas à la vitesse d’un ordinateur, mais à la façon dont son travail grandit quand les données grandissent.",
  "analogy_fr": "Chercher un nom dans un cahier non trié oblige à lire page après page ; dans un répertoire alphabétique, on ouvre au milieu et on élimine la moitié à chaque fois.",
  "examples": [
    {
      "code": "def recherche_avec_compteur(liste, cible):\n    comparaisons = 0\n    for valeur in liste:\n        comparaisons += 1\n        if valeur == cible:\n            break\n    return comparaisons\n\nnotes = [12, 8, 15, 10, 17]\nprint(recherche_avec_compteur(notes, 15))\nprint(recherche_avec_compteur(notes, 20))",
      "expected_output": "3\n5\n",
      "inputs": [],
      "trace_fr": [
        "15 est trouvé à la troisième comparaison.",
        "20 est absent : la boucle compare les cinq notes.",
        "Le pire cas coûte n comparaisons."
      ]
    },
    {
      "code": "def paires(n):\n    operations = 0\n    for i in range(n):\n        for j in range(n):\n            operations += 1\n    return operations\n\nfor n in [10, 20, 40]:\n    print(n, paires(n))",
      "expected_output": "10 100\n20 400\n40 1600\n",
      "inputs": [],
      "trace_fr": [
        "Deux boucles imbriquées font n × n tours.",
        "Doubler n multiplie le travail par 4.",
        "C’est la signature d’une croissance quadratique."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Juger un algorithme au chronomètre",
      "why_fr": "Le temps dépend de la machine et du moment.",
      "fix_fr": "Compte les opérations en fonction de n."
    },
    {
      "error": "Chercher dans une liste au lieu d’un ensemble",
      "why_fr": "Chaque test in parcourt toute la liste.",
      "fix_fr": "Utilise un set pour des tests d’appartenance répétés."
    },
    {
      "error": "Oublier le pire cas",
      "why_fr": "Un test sur des données faciles cache la lenteur.",
      "fix_fr": "Essaie aussi la cible absente ou en dernière position."
    }
  ],
  "quiz": [
    {
      "question": "Deux boucles imbriquées sur n éléments font environ…",
      "options": [
        "n opérations",
        "n² opérations",
        "log n opérations",
        "2n opérations"
      ],
      "answer": 1,
      "explanation": "Chaque élément est combiné avec chaque autre.",
      "id": "algo-m1-01-q1"
    },
    {
      "question": "En doublant n, le travail d’un algorithme linéaire…",
      "options": [
        "Reste le même",
        "Double",
        "Est multiplié par 4",
        "Augmente d’une étape"
      ],
      "answer": 1,
      "explanation": "O(n) grandit proportionnellement.",
      "id": "algo-m1-01-q2"
    },
    {
      "question": "Quel coût moyen pour tester x in un_ensemble ?",
      "options": [
        "O(1)",
        "O(n)",
        "O(n²)",
        "O(log n)"
      ],
      "answer": 0,
      "explanation": "Le hachage trouve directement la case.",
      "id": "algo-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "algorithme",
      "definition": "Méthode précise pour résoudre un problème."
    },
    {
      "term": "complexité",
      "definition": "Façon dont le travail grandit avec la taille des données."
    },
    {
      "term": "O(n)",
      "definition": "Croissance linéaire : proportionnelle à n."
    },
    {
      "term": "pire cas",
      "definition": "Situation qui demande le plus de travail."
    }
  ],
  "recap_fr": [
    "Compter les opérations d’un algorithme et prévoir comment ce nombre grandit avec la taille des données.",
    "Reconnaître les croissances constante, logarithmique, linéaire et quadratique.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "algorithme",
    "complexité",
    "O(n)",
    "pire cas"
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
      "title": "Python Wiki — complexité des opérations",
      "url": "https://wiki.python.org/moin/TimeComplexity"
    },
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    }
  ],
  "sources": [
    {
      "title": "Python Wiki — complexité des opérations",
      "url": "https://wiki.python.org/moin/TimeComplexity",
      "scope": "Coût des opérations sur listes, dictionnaires et ensembles. Texte, exemples et exercices originaux Nunya.",
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

Un algorithme est une méthode précise pour résoudre un problème : chercher un élève dans une liste, trier des notes, trouver le trajet le plus court. Pour un même problème, plusieurs méthodes existent, et certaines deviennent inutilisables quand les données grandissent. Ce cours t’apprend à les comparer, puis à choisir les bonnes structures de données.

Mesurer le temps d’exécution est trompeur : il dépend de l’ordinateur, du téléphone et de ce qui tourne en même temps. On compte plutôt les opérations élémentaires, comme les comparaisons, en fonction de la taille n des données. Une recherche qui compare la cible à chaque élément fait jusqu’à n comparaisons : son travail grandit comme n. On dit qu’elle est linéaire, et on note O(n).

Quatre croissances reviennent sans cesse. Constante, O(1) : le travail ne dépend pas de n, comme lire le premier élément d’une liste. Logarithmique, O(log n) : on divise le problème par deux à chaque étape ; pour un million d’éléments, une vingtaine d’étapes suffisent. Linéaire, O(n) : on regarde chaque élément une fois. Quadratique, O(n²) : on compare chaque élément à tous les autres, avec deux boucles imbriquées.

Une expérience simple révèle la croissance : on double n et on observe le travail. S’il reste identique, la croissance est constante ; s’il double, linéaire ; s’il est multiplié par quatre, quadratique ; s’il augmente seulement d’une étape, logarithmique. Avec 1 000 élèves, un algorithme quadratique fait un million d’opérations ; avec 100 000 clients d’un service de paiement, dix milliards. La différence entre une réponse instantanée et un téléphone bloqué se joue là.

Le choix de la structure de données compte autant que l’algorithme. Chercher si une valeur est dans une liste coûte O(n) ; dans un ensemble Python, set, le coût moyen est O(1), grâce au hachage. Détecter des doublons avec deux boucles est quadratique ; avec un ensemble, c’est linéaire.

On s’intéresse surtout au pire cas, celui qui demande le plus de travail, car c’est lui qui fait attendre les utilisateurs. Et on ignore les constantes : 3n et n sont tous deux linéaires. Ce qui compte, c’est la forme de la croissance quand n devient grand. Dans ce cours, tu vas souvent ajouter un compteur à un algorithme pour mesurer son travail toi-même.

## Exemple guidé 1

```python
def recherche_avec_compteur(liste, cible):
    comparaisons = 0
    for valeur in liste:
        comparaisons += 1
        if valeur == cible:
            break
    return comparaisons

notes = [12, 8, 15, 10, 17]
print(recherche_avec_compteur(notes, 15))
print(recherche_avec_compteur(notes, 20))
```

Affichage attendu :

    3
    5

Trace :

- 15 est trouvé à la troisième comparaison.
- 20 est absent : la boucle compare les cinq notes.
- Le pire cas coûte n comparaisons.

## Exemple guidé 2

```python
def paires(n):
    operations = 0
    for i in range(n):
        for j in range(n):
            operations += 1
    return operations

for n in [10, 20, 40]:
    print(n, paires(n))
```

Affichage attendu :

    10 100
    20 400
    40 1600

Trace :

- Deux boucles imbriquées font n × n tours.
- Doubler n multiplie le travail par 4.
- C’est la signature d’une croissance quadratique.

## Vérifier et expliquer

Ajoute un compteur à l’un de tes anciens programmes et mesure son travail pour n, 2n et 4n.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python Wiki — complexité des opérations](https://wiki.python.org/moin/TimeComplexity)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
