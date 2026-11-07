---
{
  "id": "pyi-m1-01",
  "title_fr": "Nommer une structure et numéroter son parcours",
  "course": "python-intermediaire",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "py-m12-03"
  ],
  "outcomes": [
    "Déballer une paire ou un triplet en respectant son contrat.",
    "Numéroter un parcours avec enumerate, y compris en présence de doublons."
  ],
  "idea_fr": "Le déballage donne un nom à chaque position ; enumerate distingue la position d’un élément de sa valeur.",
  "analogy_fr": "Une ligne de planning possède des colonnes définies, tandis que son numéro dépend de sa place dans le planning.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "Lecture\n1 15\n",
      "trace_fr": [
        "Ligne 1 : le tuple associe le titre puis les 75 minutes.",
        "Ligne 2 : les deux valeurs sont distribuées dans titre et duree.",
        "Ligne 3 : le premier nom contient la chaîne Lecture.",
        "Ligne 4 : 75//60 donne 1 heure complète et 75%60 donne 15 minutes."
      ]
    },
    {
      "inputs": [],
      "expected_output": "1 Chant\n2 Chant\n3 Jardin\n",
      "trace_fr": [
        "Ligne 1 : la liste conserve deux occurrences de Chant.",
        "Ligne 2, premier tour : enumerate fournit (1, \"Chant\").",
        "Deuxième tour : la valeur est encore Chant, mais le rang devient 2.",
        "Troisième tour : le rang vaut 3 et la valeur Jardin.",
        "Ligne 3 : chaque paire est affichée dans l’ordre du parcours."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Permuter les champs",
      "why_fr": "Un nombre et un titre reçoivent de mauvais noms.",
      "fix_fr": "Écris le contrat positionnel avant le déballage."
    },
    {
      "error": "Utiliser index pour le rang",
      "why_fr": "Un doublon retrouve sa première occurrence.",
      "fix_fr": "Utilise enumerate pour le parcours."
    },
    {
      "error": "Commencer au mauvais rang",
      "why_fr": "enumerate commence par défaut à zéro.",
      "fix_fr": "Précise start=1 lorsque le besoin le demande."
    }
  ],
  "quiz": [
    {
      "question": "Que fait titre, minutes = [\"Lecture\", 75] ?",
      "options": [
        "Il trie les deux valeurs.",
        "Il crée automatiquement deux copies profondes.",
        "Il associe Lecture à titre et 75 à minutes."
      ],
      "answer": 2,
      "explanation": "Le déballage distribue les positions dans leur ordre.",
      "id": "pyi-m1-01-q1"
    },
    {
      "question": "Deux noms identiques apparaissent à des positions différentes. Pourquoi enumerate convient-il ?",
      "options": [
        "Il cherche toujours la première occurrence.",
        "Il fournit un compteur distinct pour chaque passage.",
        "Il retire les doublons avant le parcours."
      ],
      "answer": 1,
      "explanation": "La position du passage est indépendante de l’égalité des valeurs.",
      "id": "pyi-m1-01-q2"
    },
    {
      "question": "Un tuple contenant une liste rend-il cette liste immuable ?",
      "options": [
        "Non, le tuple ne peut pas remplacer ses éléments mais la liste peut rester mutable.",
        "Oui, tous les objets contenus deviennent immuables.",
        "Oui, sauf si le tuple a une seule valeur."
      ],
      "answer": 0,
      "explanation": "L’immutabilité du conteneur n’est pas une copie récursive de ses contenus.",
      "id": "pyi-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "tuple",
      "definition": "Séquence ordonnée dont les éléments ne peuvent pas être remplacés."
    },
    {
      "term": "déballage",
      "definition": "Association des valeurs d’une séquence à plusieurs noms."
    },
    {
      "term": "enumerate",
      "definition": "Parcours fournissant compteur et valeur courante."
    },
    {
      "term": "contrat positionnel",
      "definition": "Sens annoncé de chaque position dans une structure."
    }
  ],
  "recap_fr": [
    "Déballer une paire ou un triplet en respectant son contrat.",
    "Numéroter un parcours avec enumerate, y compris en présence de doublons.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "tuple",
    "déballage",
    "enumerate",
    "contrat positionnel"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "environment_fr": "Python local dans le moteur Pyodide auto-hébergé. Données fictives en mémoire ; aucune installation, requête réseau ni écriture de fichier durable. Les exercices vérifient les valeurs retournées et la préservation des arguments. Chaque cas repart d’un programme neuf ; les appels d’un même cas partagent ce programme.",
  "sources": [
    {
      "title": "Documentation Python — Tuples et séquences",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html#tuples-and-sequences",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — enumerate",
      "url": "https://docs.python.org/fr/3/library/functions.html#enumerate",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une collection structurée n’est pas seulement une suite de valeurs : chaque position peut avoir un sens précis. La paire ("Lecture", 75) représente ici un titre puis une durée en minutes. Le tuple est une séquence ordonnée dont les éléments ne peuvent pas être remplacés après sa création. La virgule construit le tuple ; pour un seul élément, on écrit par exemple ("Lecture",). Un tuple contenant un objet mutable ne rend pas cet objet lui-même immuable.

Le déballage permet d’écrire titre, duree = atelier. Python distribue les valeurs dans les noms de gauche, dans leur ordre. Cette écriture donne une signification locale aux positions, plus lisible qu’une longue répétition de atelier[0] et atelier[1]. Elle fonctionne aussi avec une liste de même longueur. Dans les exercices, une paire peut donc être représentée par une liste sans changer le sens de ses deux positions.

Le nombre de noms doit correspondre au nombre de valeurs dans les formes utilisées ici. Un triplet code, titre, places demande trois noms, dans cet ordre. Permuter titre et places ne provoque pas forcément une erreur immédiate : le résultat peut simplement associer un nombre au mauvais champ. Les tests comparent les propriétés retournées, et pas seulement la possibilité d’exécuter la fonction. La validation des structures incorrectes sera abordée dans un autre module.

Pour obtenir la position pendant un parcours, enumerate fournit une paire composée du compteur puis de l’élément courant. On peut la déballer directement dans for rang, titre in enumerate(activites, start=1). L’argument nommé start choisit la valeur initiale du compteur, ici un rang humain commençant à un. Sans cet argument, enumerate commence à zéro. Il ne change ni les éléments ni leur ordre.

Une valeur répétée conserve plusieurs positions. Si Chant apparaît deux fois, enumerate produit deux rangs distincts. Chercher activites.index(titre) dans la boucle retrouverait toujours la première occurrence correspondante ; ce ne serait donc pas un remplacement fiable du compteur. De même, transformer la collection en ensemble ferait perdre les répétitions utiles au planning. Le choix de structure dépend de ce que le besoin veut conserver.

Les exercices combinent parfois les deux mécanismes : enumerate fournit rang et activite, puis titre, minutes = activite nomme les deux champs internes. Séparer ces étapes rend la trace plus facile à suivre. Les calculs de quotient et de reste réutilisent les acquis du cours débutant. Le résultat est une nouvelle liste de dictionnaires, composée de valeurs simples utiles pour transmettre ce bilan à un autre traitement.

Avant de coder, annonce les colonnes et le rang initial. Vérifie une durée nulle, une heure exacte, deux titres identiques et une liste vide. Dans ce dernier cas, aucun tour n’ajoute de résultat et la nouvelle liste reste vide. Les données du programme sont fictives ; le traitement prépare un planning en mémoire sans modifier ses lignes de départ.

## Exemple guidé 1

```python
atelier = ("Lecture", 75)  # 1 : paire de valeurs
titre, duree = atelier  # 2 : déballage dans deux noms
print(titre)  # 3
print(duree // 60, duree % 60)  # 4
```

Résultat attendu :

```text
Lecture
1 15
```

Trace :

- Ligne 1 : le tuple associe le titre puis les 75 minutes.
- Ligne 2 : les deux valeurs sont distribuées dans titre et duree.
- Ligne 3 : le premier nom contient la chaîne Lecture.
- Ligne 4 : 75//60 donne 1 heure complète et 75%60 donne 15 minutes.

## Exemple guidé 2

```python
activites = ["Chant", "Chant", "Jardin"]  # 1
for rang, titre in enumerate(activites, start=1):  # 2
    print(rang, titre)  # 3
```

Résultat attendu :

```text
1 Chant
2 Chant
3 Jardin
```

Trace :

- Ligne 1 : la liste conserve deux occurrences de Chant.
- Ligne 2, premier tour : enumerate fournit (1, "Chant").
- Deuxième tour : la valeur est encore Chant, mais le rang devient 2.
- Troisième tour : le rang vaut 3 et la valeur Jardin.
- Ligne 3 : chaque paire est affichée dans l’ordre du parcours.
