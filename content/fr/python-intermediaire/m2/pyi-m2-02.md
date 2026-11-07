---
{
  "id": "pyi-m2-02",
  "title_fr": "Trier par une clé sans modifier la source",
  "course": "python-intermediaire",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "pyi-m2-01"
  ],
  "outcomes": [
    "Définir une fonction clé, y compris une lambda courte, pour sorted.",
    "Expliquer stabilité, ordre de critères et conservation de la collection source."
  ],
  "idea_fr": "Le tri compare les clés calculées, conserve les égalités dans leur ordre initial et produit une nouvelle liste avec sorted.",
  "analogy_fr": "Classer des fiches par durée ne demande pas de réécrire le planning d’origine ni de départager les égalités arbitrairement.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "[('Jardin', 30), ('Lecture', 60), ('Chant', 60)]\n[('Lecture', 60), ('Jardin', 30), ('Chant', 60)]\n",
      "trace_fr": [
        "Ligne 1 : Lecture précède Chant parmi les deux durées égales.",
        "Ligne 2 : la fonction clé retourne les minutes, sans modifier l’activité.",
        "Ligne 3 : sorted reçoit cette fonction et crée une autre liste.",
        "Ligne 4 : Jardin vient d’abord ; Lecture reste avant Chant grâce à la stabilité.",
        "Ligne 5 : l’ordre de la liste initiale est intact."
      ]
    },
    {
      "inputs": [],
      "expected_output": "['a', 'b', 'c']\n",
      "trace_fr": [
        "Ligne 1 : les fiches contiennent des identifiants distincts et deux nombres de places égaux.",
        "Ligne 2 : lambda reçoit une fiche et retourne le tuple de clés (-places, titre).",
        "La clé -3 de a vient avant -2 ; entre b et c, Chant vient avant Lecture.",
        "Ligne 3 : la compréhension extrait seulement les identifiants de la liste classée."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Appeler la clé au lieu de la transmettre",
      "why_fr": "La fonction est évaluée sans l’élément attendu.",
      "fix_fr": "Écris key=cle ou une lambda."
    },
    {
      "error": "Ajouter un critère non demandé",
      "why_fr": "Les égalités ne conservent plus leur ordre.",
      "fix_fr": "Respecte exactement la clé annoncée."
    },
    {
      "error": "Utiliser sort sur l’argument",
      "why_fr": "La source est modifiée en place.",
      "fix_fr": "Utilise la nouvelle liste retournée par sorted."
    }
  ],
  "quiz": [
    {
      "question": "Que reçoit key dans sorted(fiches, key=cle) ?",
      "options": [
        "La valeur cle() calculée sans fiche.",
        "Un nom de colonne reconnu automatiquement.",
        "La fonction qui calcule une clé pour une fiche."
      ],
      "answer": 2,
      "explanation": "sorted appelle la fonction sur chaque élément.",
      "id": "pyi-m2-02-q1"
    },
    {
      "question": "Que garantit la stabilité sur deux clés égales ?",
      "options": [
        "La suppression du second élément.",
        "Le maintien de leur ordre relatif initial.",
        "Un tri alphabétique obligatoire des éléments."
      ],
      "answer": 1,
      "explanation": "Aucun critère supplémentaire n’est inventé pour les égalités.",
      "id": "pyi-m2-02-q2"
    },
    {
      "question": "sorted(source) suffit-il à copier profondément les dictionnaires contenus ?",
      "options": [
        "Non, la nouvelle liste peut partager ses éléments avec source.",
        "Oui, chaque objet imbriqué est recréé.",
        "Oui, sauf si elle est déjà triée."
      ],
      "answer": 0,
      "explanation": "Créer le conteneur extérieur ne signifie pas recopier tous ses descendants.",
      "id": "pyi-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction clé",
      "definition": "Fonction qui produit la valeur utilisée pour comparer un élément."
    },
    {
      "term": "lambda",
      "definition": "Expression définissant une petite fonction à résultat unique."
    },
    {
      "term": "tri stable",
      "definition": "Tri qui conserve l’ordre relatif des éléments de clés égales."
    },
    {
      "term": "critères lexicographiques",
      "definition": "Comparaison des positions d’un tuple l’une après l’autre."
    }
  ],
  "recap_fr": [
    "Définir une fonction clé, y compris une lambda courte, pour sorted.",
    "Expliquer stabilité, ordre de critères et conservation de la collection source.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "fonction clé",
    "lambda",
    "tri stable",
    "critères lexicographiques"
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
      "title": "Documentation Python — Techniques de tri",
      "url": "https://docs.python.org/fr/3/howto/sorting.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — Expressions lambda",
      "url": "https://docs.python.org/fr/3/tutorial/controlflow.html#lambda-expressions",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le tri d’une liste de dictionnaires demande un critère explicite. Les fiches elles-mêmes ne sont pas automatiquement ordonnées selon leurs intitulés. sorted(collection, key=fonction) demande une clé comparable pour chaque élément puis retourne une nouvelle liste classée. Une fonction cle(activite) peut simplement retourner activite["minutes"]. On transmet la fonction avec key=cle, sans l’appeler : sorted se charge de lui fournir chaque élément.

Une lambda écrit une petite fonction sous forme d’expression : lambda mot: len(mot) reçoit mot et retourne sa longueur. Il n’y a ni nom de fonction obligatoire ni instruction return dans cette syntaxe. Elle convient à une clé courte. Si le calcul comporte plusieurs étapes ou règles, une fonction def avec un nom clair reste préférable. Les paramètres se placent avant le deux-points et l’expression retournée après. Une lambda ne contient pas un bloc de plusieurs instructions ; elle reste adaptée à un calcul court.

Le tri est stable. Lorsque deux éléments ont des clés égales, ils conservent leur ordre relatif initial. Trier des mots uniquement par longueur ne les trie donc pas automatiquement par ordre alphabétique au sein de chaque longueur. Pour ["cc", "a", "bb", "d"], les mots de longueur un gardent a avant d et ceux de longueur deux gardent cc avant bb. Ajouter une seconde règle sans que le contrat le demande changerait le résultat.

Le paramètre reverse=True demande un ordre décroissant, tout en préservant la stabilité des égalités. Pour un classement de priorités, la plus grande priorité peut ainsi venir d’abord. sorted renvoie une nouvelle liste ; list.sort, au contraire, modifie la liste existante et retourne None. Une solution peut présenter les bons identifiants tout en violant le contrat de préservation si elle a trié l’argument sur place.

Plusieurs critères peuvent être regroupés dans un tuple de clés. Python compare d’abord la première position, puis la suivante en cas d’égalité. La clé (-places, titre) classe des places numériques décroissantes puis des titres croissants. Le signe moins concerne les nombres, pas les chaînes. Si toutes les clés sont égales, la stabilité conserve encore l’ordre d’origine ; aucun identifiant supplémentaire ne doit intervenir sans consigne.

Une nouvelle liste triée ne recopie pas profondément ses éléments. Si elle contient des dictionnaires, ces références restent celles de la source. Ici, nous lisons les fiches et retournons des identifiants textuels, sans les modifier. Le prochain chapitre étudiera les copies imbriquées quand le besoin demande de transformer les contenus eux-mêmes. Ne présente pas sorted comme une protection générale contre toute mutation ultérieure.

Avant de coder, écris le sens de chaque critère et la règle d’égalité. Teste une liste vide, deux clés égales dans un ordre volontairement non alphabétique, puis une autre taille. Les bilans fictifs sont locaux et leurs classements ne jugent aucune personne réelle. Le correcteur vérifie à la fois l’ordre retourné et l’absence de modification des arguments.

## Exemple guidé 1

```python
activites = [("Lecture", 60), ("Jardin", 30), ("Chant", 60)]  # 1

def duree(activite):  # 2
    return activite[1]

classees = sorted(activites, key=duree)  # 3
print(classees)  # 4
print(activites)  # 5
```

Résultat attendu :

```text
[('Jardin', 30), ('Lecture', 60), ('Chant', 60)]
[('Lecture', 60), ('Jardin', 30), ('Chant', 60)]
```

Trace :

- Ligne 1 : Lecture précède Chant parmi les deux durées égales.
- Ligne 2 : la fonction clé retourne les minutes, sans modifier l’activité.
- Ligne 3 : sorted reçoit cette fonction et crée une autre liste.
- Ligne 4 : Jardin vient d’abord ; Lecture reste avant Chant grâce à la stabilité.
- Ligne 5 : l’ordre de la liste initiale est intact.

## Exemple guidé 2

```python
fiches = [  # 1
    {"id": "b", "places": 2, "titre": "Chant"},
    {"id": "a", "places": 3, "titre": "Jardin"},
    {"id": "c", "places": 2, "titre": "Lecture"},
]
classees = sorted(fiches, key=lambda fiche: (-fiche["places"], fiche["titre"]))  # 2
print([fiche["id"] for fiche in classees])  # 3
```

Résultat attendu :

```text
['a', 'b', 'c']
```

Trace :

- Ligne 1 : les fiches contiennent des identifiants distincts et deux nombres de places égaux.
- Ligne 2 : lambda reçoit une fiche et retourne le tuple de clés (-places, titre).
- La clé -3 de a vient avant -2 ; entre b et c, Chant vient avant Lecture.
- Ligne 3 : la compréhension extrait seulement les identifiants de la liste classée.
