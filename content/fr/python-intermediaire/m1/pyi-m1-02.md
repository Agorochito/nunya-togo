---
{
  "id": "pyi-m1-02",
  "title_fr": "Comparer des ensembles sans conserver les doublons",
  "course": "python-intermediaire",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "pyi-m1-01"
  ],
  "outcomes": [
    "Dédupliquer des valeurs avec set et retourner un résultat ordonné avec sorted.",
    "Utiliser intersection, différence et union selon la question posée."
  ],
  "idea_fr": "Un ensemble conserve l’appartenance, tandis qu’une liste peut conserver l’ordre et les répétitions.",
  "analogy_fr": "Comparer deux listes de participation demande parfois de savoir qui est présent, plutôt que combien de lignes portent son nom.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "['A', 'B', 'C']\n['B', 'A', 'B']\n",
      "trace_fr": [
        "Ligne 1 : la liste contient deux B et conserve son ordre.",
        "Ligne 2 : set déduplique les codes dans une autre collection.",
        "Ligne 3 : C est ajouté à cet ensemble.",
        "Ligne 4 : sorted produit une liste ordonnée de trois codes.",
        "Ligne 5 : la liste initiale possède toujours ses doublons."
      ]
    },
    {
      "inputs": [],
      "expected_output": "['Kossi']\n['Ama']\n['Ama', 'Kossi', 'Yao']\n",
      "trace_fr": [
        "Lignes 1–2 : les ensembles décrivent les appartenances aux deux groupes fictifs.",
        "Ligne 3 : Kossi est le seul membre commun.",
        "Ligne 4 : Ama appartient au premier groupe mais pas au second.",
        "Ligne 5 : l’union regroupe les trois noms sans répétition et sorted choisit leur ordre."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Dédupliquer un besoin de fréquence",
      "why_fr": "Le nombre d’occurrences est perdu.",
      "fix_fr": "Réserve set aux questions d’appartenance."
    },
    {
      "error": "Retourner un set",
      "why_fr": "Le contrat attend une liste ordonnée.",
      "fix_fr": "Applique sorted au résultat."
    },
    {
      "error": "Inverser la différence",
      "why_fr": "Les candidats proviennent du mauvais côté.",
      "fix_fr": "Nomme la collection à conserver avant de soustraire."
    }
  ],
  "quiz": [
    {
      "question": "Que crée {} en Python ?",
      "options": [
        "Un ensemble vide.",
        "Un tuple vide.",
        "Un dictionnaire vide."
      ],
      "answer": 2,
      "explanation": "L’ensemble vide s’écrit set().",
      "id": "pyi-m1-02-q1"
    },
    {
      "question": "Quelle relation exprime a-b ?",
      "options": [
        "Toutes les valeurs, doublons compris.",
        "Les valeurs de a absentes de b.",
        "Les valeurs communes aux deux ensembles."
      ],
      "answer": 1,
      "explanation": "La différence conserve des membres du côté gauche seulement.",
      "id": "pyi-m1-02-q2"
    },
    {
      "question": "Pourquoi retourner sorted(un_ensemble) dans ces exercices ?",
      "options": [
        "Pour fournir une liste avec un ordre reproductible.",
        "Pour compter les occurrences supprimées.",
        "Pour modifier automatiquement les listes d’entrée."
      ],
      "answer": 0,
      "explanation": "Le set ne décrit pas un ordre de présentation garanti.",
      "id": "pyi-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "ensemble",
      "definition": "Collection de valeurs distinctes sans ordre de présentation garanti."
    },
    {
      "term": "intersection",
      "definition": "Valeurs présentes dans les deux ensembles."
    },
    {
      "term": "union",
      "definition": "Valeurs présentes dans au moins un ensemble."
    },
    {
      "term": "différence",
      "definition": "Valeurs d’un ensemble absentes de l’autre."
    }
  ],
  "recap_fr": [
    "Dédupliquer des valeurs avec set et retourner un résultat ordonné avec sorted.",
    "Utiliser intersection, différence et union selon la question posée.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "ensemble",
    "intersection",
    "union",
    "différence"
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
      "title": "Documentation Python — Ensembles",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html#sets",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — sorted",
      "url": "https://docs.python.org/fr/3/library/functions.html#sorted",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un ensemble, ou set, représente des valeurs distinctes. set(["B", "A", "B"]) contient A et B une seule fois. Ce choix répond à une question d’appartenance : quels codes existent ? Il ne conserve pas la fréquence de chaque code. Si le besoin demande trois inscriptions dont deux portent le même titre, enlever les doublons supprimerait une information utile. Choisis donc un ensemble seulement quand la répétition ne doit pas compter.

Pour créer un ensemble vide, écris set(). Les accolades vides {} créent un dictionnaire. Un ensemble non vide peut s’écrire {"A", "B"} ; une entrée n’est pas associée à une valeur comme dans {"A": 2}. La méthode add ajoute un élément si nécessaire ; ajouter une valeur déjà présente ne crée pas un second exemplaire. Les textes et nombres simples utilisés ici peuvent être des éléments d’ensemble, contrairement aux listes mutables.

L’ordre de parcours d’un set ne constitue pas un ordre de présentation garanti. Pour fournir un résultat reproductible au correcteur, retourne sorted(ensemble), qui construit une liste triée. Les exercices utilisent surtout des codes courts afin de rendre cet ordre explicite. Il s’agit de l’ordre Python des valeurs, sans règle locale de classement alphabétique. Les exercices demandent une liste de codes, pas un set.

Deux ensembles permettent d’exprimer des comparaisons courantes. a & b est leur intersection : les valeurs présentes dans les deux. a | b est leur union : toutes les valeurs présentes dans au moins l’un. a - b est leur différence : les valeurs de a absentes de b. Cette dernière opération dépend de l’ordre. Les personnes de Lecture absentes de Jardin ne sont pas nécessairement les personnes de Jardin absentes de Lecture.

Les opérateurs présentés construisent de nouveaux ensembles. Si les entrées sont des listes, on les transforme avec set avant la comparaison, sans changer leurs lignes. La taille des ensembles peut être inférieure à celle des listes à cause des doublons. Un ensemble vide n’empêche pas les opérations : l’intersection avec lui est vide, et l’union conserve les valeurs de l’autre côté.

La différence exprime aussi un besoin de nouveauté. Pour des codes demandés non encore enregistrés, calcule ensemble_demandes - ensemble_anciens. Inverser les opérandes produirait les anciens codes absents des demandes. Donner des noms clairs aux deux variables vaut mieux que choisir un signe au hasard jusqu’à obtenir un exemple correct.

Vérifie une entrée vide, deux collections disjointes, des valeurs répétées et des listes contenant exactement les mêmes membres dans un ordre différent. Les exemples affichent uniquement des listes triées, jamais l’ordre accidentel d’un ensemble. Les activités préparent des bilans de groupes fictifs ; elles ne modifient aucune liste réelle de membres et ne supposent pas que les noms suffisent à identifier des personnes hors de ce laboratoire.

## Exemple guidé 1

```python
codes = ["B", "A", "B"]  # 1
uniques = set(codes)  # 2
uniques.add("C")  # 3
print(sorted(uniques))  # 4
print(codes)  # 5
```

Résultat attendu :

```text
['A', 'B', 'C']
['B', 'A', 'B']
```

Trace :

- Ligne 1 : la liste contient deux B et conserve son ordre.
- Ligne 2 : set déduplique les codes dans une autre collection.
- Ligne 3 : C est ajouté à cet ensemble.
- Ligne 4 : sorted produit une liste ordonnée de trois codes.
- Ligne 5 : la liste initiale possède toujours ses doublons.

## Exemple guidé 2

```python
lecture = {"Ama", "Kossi"}  # 1
jardin = {"Kossi", "Yao"}  # 2
print(sorted(lecture & jardin))  # 3
print(sorted(lecture - jardin))  # 4
print(sorted(lecture | jardin))  # 5
```

Résultat attendu :

```text
['Kossi']
['Ama']
['Ama', 'Kossi', 'Yao']
```

Trace :

- Lignes 1–2 : les ensembles décrivent les appartenances aux deux groupes fictifs.
- Ligne 3 : Kossi est le seul membre commun.
- Ligne 4 : Ama appartient au premier groupe mais pas au second.
- Ligne 5 : l’union regroupe les trois noms sans répétition et sorted choisit leur ordre.
