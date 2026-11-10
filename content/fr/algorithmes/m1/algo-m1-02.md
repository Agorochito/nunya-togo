---
{
  "id": "algo-m1-02",
  "title_fr": "Chercher vite : la recherche dichotomique",
  "course": "algorithmes",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "algo-m1-01"
  ],
  "outcomes": [
    "Écrire une recherche linéaire et une recherche dichotomique, et comparer leurs coûts.",
    "Utiliser bisect pour trouver une position dans une liste triée."
  ],
  "idea_fr": "Dans une liste triée, chaque comparaison au milieu élimine la moitié des possibilités : on trouve en quelques étapes ce qu’une lecture complète cherchait longtemps.",
  "analogy_fr": "Au jeu « devine mon nombre entre 1 et 100 », on propose 50, puis 25 ou 75 : sept questions suffisent toujours.",
  "examples": [
    {
      "code": "def dichotomie(liste, cible):\n    gauche, droite = 0, len(liste) - 1\n    while gauche <= droite:\n        milieu = (gauche + droite) // 2\n        if liste[milieu] == cible:\n            return milieu\n        if liste[milieu] < cible:\n            gauche = milieu + 1\n        else:\n            droite = milieu - 1\n    return -1\n\nnotes = [4, 8, 10, 12, 15, 17, 19]\nprint(dichotomie(notes, 15))\nprint(dichotomie(notes, 4), dichotomie(notes, 19))\nprint(dichotomie(notes, 11))",
      "expected_output": "4\n0 6\n-1\n",
      "inputs": [],
      "trace_fr": [
        "Le milieu de départ est l’indice 3, la note 12.",
        "15 est plus grand : on cherche à droite et on le trouve à l’indice 4.",
        "11 n’existe pas : la zone devient vide, on renvoie -1."
      ]
    },
    {
      "code": "import bisect\n\nnotes = [4, 8, 10, 12, 15]\nprint(bisect.bisect_left(notes, 11))\ncopie = list(notes)\nbisect.insort(copie, 11)\nprint(copie)\nprint(notes)",
      "expected_output": "3\n[4, 8, 10, 11, 12, 15]\n[4, 8, 10, 12, 15]\n",
      "inputs": [],
      "trace_fr": [
        "11 se placerait à l’indice 3.",
        "insort insère dans la copie en gardant le tri.",
        "La liste originale est intacte."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire while gauche < droite",
      "why_fr": "La dernière case possible n’est jamais examinée.",
      "fix_fr": "Utilise <=."
    },
    {
      "error": "Oublier + 1 ou - 1",
      "why_fr": "La zone ne rétrécit plus : boucle sans fin.",
      "fix_fr": "Écris milieu + 1 et milieu - 1."
    },
    {
      "error": "Chercher par dichotomie dans une liste non triée",
      "why_fr": "Le résultat est faux sans avertissement.",
      "fix_fr": "Trie d’abord, ou utilise la recherche linéaire."
    }
  ],
  "quiz": [
    {
      "question": "Combien de comparaisons au plus pour 1 000 000 d’éléments triés par dichotomie ?",
      "options": [
        "Environ 20",
        "Environ 1 000",
        "Environ 500 000",
        "1 000 000"
      ],
      "answer": 0,
      "explanation": "On divise par deux une vingtaine de fois.",
      "id": "algo-m1-02-q1"
    },
    {
      "question": "Quelle condition faut-il à la dichotomie ?",
      "options": [
        "Une liste courte",
        "Une liste triée",
        "Des nombres entiers",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "Sans tri, éliminer une moitié n’a pas de sens.",
      "id": "algo-m1-02-q2"
    },
    {
      "question": "Que fait bisect.insort(liste, x) ?",
      "options": [
        "Renvoie une copie triée",
        "Insère x à sa place dans la liste elle-même",
        "Supprime x",
        "Trie la liste"
      ],
      "answer": 1,
      "explanation": "Elle modifie la liste reçue.",
      "id": "algo-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "recherche linéaire",
      "definition": "Parcours élément par élément jusqu’à la cible."
    },
    {
      "term": "dichotomie",
      "definition": "Recherche qui divise par deux la zone à chaque étape."
    },
    {
      "term": "O(log n)",
      "definition": "Croissance logarithmique : une étape de plus quand n double."
    },
    {
      "term": "bisect",
      "definition": "Module Python de recherche dichotomique dans une liste triée."
    }
  ],
  "recap_fr": [
    "Écrire une recherche linéaire et une recherche dichotomique, et comparer leurs coûts.",
    "Utiliser bisect pour trouver une position dans une liste triée.",
    "Tester un algorithme sur une liste vide, un seul élément et des valeurs égales avant de le croire juste."
  ],
  "tags": [
    "algorithmes",
    "python",
    "structures de données",
    "recherche linéaire",
    "dichotomie",
    "O(log n)",
    "bisect"
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
      "title": "Python — bisect",
      "url": "https://docs.python.org/fr/3/library/bisect.html"
    },
    {
      "title": "Khan Academy — Algorithmes",
      "url": "https://fr.khanacademy.org/computing/computer-science/algorithms"
    }
  ],
  "sources": [
    {
      "title": "Python — bisect",
      "url": "https://docs.python.org/fr/3/library/bisect.html",
      "scope": "Recherche dichotomique dans une liste triée. Texte, exemples et exercices originaux Nunya.",
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

La recherche linéaire parcourt la liste du début à la fin jusqu’à trouver la cible. Elle fonctionne sur n’importe quelle liste, triée ou non, mais coûte jusqu’à n comparaisons. Pour la liste des 300 élèves d’un collège, c’est acceptable ; pour les millions de transactions d’un opérateur de mobile money, non.

Quand la liste est triée, on peut faire beaucoup mieux. La recherche dichotomique compare la cible à l’élément du milieu. S’ils sont égaux, c’est fini. Si la cible est plus grande, elle ne peut être que dans la moitié droite ; sinon, dans la moitié gauche. On recommence sur la moitié restante. À chaque étape, l’espace de recherche est divisé par deux : pour un million d’éléments, une vingtaine de comparaisons suffisent. C’est une croissance logarithmique, O(log n).

L’écriture demande de la rigueur. On garde deux indices, gauche et droite, qui délimitent la zone encore possible. Tant que gauche est inférieur ou égal à droite, on calcule milieu = (gauche + droite) // 2. Si l’élément du milieu est trop petit, gauche devient milieu + 1 ; s’il est trop grand, droite devient milieu - 1. Les + 1 et - 1 sont essentiels : sans eux, la zone peut cesser de rétrécir et la boucle tourner sans fin. La condition <= est tout aussi importante : avec <, la recherche abandonne quand il ne reste qu’un élément, et ne trouve pas une cible située à cet endroit.

Le prix à payer est le tri préalable. Trier coûte plus qu’une recherche linéaire ; la dichotomie n’est donc rentable que si l’on cherche souvent dans la même liste, ou si les données arrivent déjà triées, comme un annuaire ou des dates de transactions.

Python fournit ce mécanisme dans le module bisect. bisect.bisect_left(liste, valeur) renvoie la position où insérer la valeur pour garder la liste triée, en cherchant par dichotomie. bisect.insort insère directement à la bonne place. Attention, insort modifie la liste qu’on lui donne : pour garder l’originale intacte, travaille sur une copie.

Enfin, une habitude d’ingénieur : teste les cas limites. Une liste vide, une liste d’un seul élément, une cible plus petite que tout ou plus grande que tout, une cible en première et en dernière position. Les erreurs de dichotomie se cachent presque toujours dans ces cas-là.

## Exemple guidé 1

```python
def dichotomie(liste, cible):
    gauche, droite = 0, len(liste) - 1
    while gauche <= droite:
        milieu = (gauche + droite) // 2
        if liste[milieu] == cible:
            return milieu
        if liste[milieu] < cible:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return -1

notes = [4, 8, 10, 12, 15, 17, 19]
print(dichotomie(notes, 15))
print(dichotomie(notes, 4), dichotomie(notes, 19))
print(dichotomie(notes, 11))
```

Affichage attendu :

    4
    0 6
    -1

Trace :

- Le milieu de départ est l’indice 3, la note 12.
- 15 est plus grand : on cherche à droite et on le trouve à l’indice 4.
- 11 n’existe pas : la zone devient vide, on renvoie -1.

## Exemple guidé 2

```python
import bisect

notes = [4, 8, 10, 12, 15]
print(bisect.bisect_left(notes, 11))
copie = list(notes)
bisect.insort(copie, 11)
print(copie)
print(notes)
```

Affichage attendu :

    3
    [4, 8, 10, 11, 12, 15]
    [4, 8, 10, 12, 15]

Trace :

- 11 se placerait à l’indice 3.
- insort insère dans la copie en gardant le tri.
- La liste originale est intacte.

## Vérifier et expliquer

Joue à « devine mon nombre » avec un camarade en appliquant la dichotomie, et compte les questions.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — bisect](https://docs.python.org/fr/3/library/bisect.html)
- [Khan Academy — Algorithmes](https://fr.khanacademy.org/computing/computer-science/algorithms)
