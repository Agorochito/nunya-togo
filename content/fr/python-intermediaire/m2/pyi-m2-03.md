---
{
  "id": "pyi-m2-03",
  "title_fr": "Transformer sans modifier et copier les niveaux utiles",
  "course": "python-intermediaire",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "pyi-m2-02"
  ],
  "outcomes": [
    "Écrire une transformation pure au contrat explicite.",
    "Reconstruire les collections imbriquées pour éviter des alias mutables avec les arguments."
  ],
  "idea_fr": "Une copie extérieure peut garder des objets internes partagés ; l’indépendance se vérifie au niveau où une mutation est possible.",
  "analogy_fr": "Photocopier la couverture d’un classeur ne duplique pas ses feuilles ; il faut identifier ce qui doit réellement devenir indépendant.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "[10, 12]\n[12, 14, 20]\n",
      "trace_fr": [
        "Ligne 1 : source référence la liste de notes initiale.",
        "Lignes 2–3 : la fonction produit une nouvelle liste sans affecter les positions de notes.",
        "Ligne 4 : le bonus deux donne les valeurs 12 et 14.",
        "Ligne 5 : l’ajout se fait seulement sur la nouvelle liste.",
        "Lignes 6–7 : les sorties montrent la source intacte et le résultat modifié."
      ]
    },
    {
      "inputs": [],
      "expected_output": "['Ama']\n['Ama', 'Kossi']\n",
      "trace_fr": [
        "Lignes 1–2 : la source et une liste extérieure vide sont distinctes.",
        "Lignes 3–4 : le dictionnaire de chaque équipe est copié.",
        "Ligne 5 : la liste membres est copiée à son tour, dans ce nouveau dictionnaire.",
        "Ligne 6 : le résultat reçoit la nouvelle structure.",
        "Ligne 7 : ajouter Kossi affecte seulement la liste imbriquée copiée.",
        "Lignes 8–9 : la source garde Ama seul tandis que la copie contient les deux noms."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Affecter un alias",
      "why_fr": "Les deux noms désignent le même objet.",
      "fix_fr": "Construis un nouveau conteneur."
    },
    {
      "error": "Copier seulement l’extérieur",
      "why_fr": "Les éléments imbriqués restent partagés.",
      "fix_fr": "Copie les niveaux mutables décrits par le schéma."
    },
    {
      "error": "Nettoyer pendant la copie",
      "why_fr": "Un tri ou une déduplication non demandé change les données.",
      "fix_fr": "Conserve ordre et répétitions en dehors de la transformation annoncée."
    }
  ],
  "quiz": [
    {
      "question": "Que fait autre = source pour une liste ?",
      "options": [
        "Il copie automatiquement toutes les listes imbriquées.",
        "Il transforme la liste en tuple.",
        "Il crée un autre nom pour le même objet."
      ],
      "answer": 2,
      "explanation": "Une affectation seule n’effectue pas de copie.",
      "id": "pyi-m2-03-q1"
    },
    {
      "question": "Pourquoi equipe.copy() ne suffit-il pas si equipe[\"membres\"] est une liste à rendre indépendante ?",
      "options": [
        "Une liste ne peut jamais être copiée.",
        "La référence vers cette liste reste partagée.",
        "copy transforme tous les membres en chaînes vides."
      ],
      "answer": 1,
      "explanation": "Le nouveau dictionnaire peut encore contenir un objet mutable de la source.",
      "id": "pyi-m2-03-q2"
    },
    {
      "question": "Un résultat de mêmes valeurs peut-il violer le contrat d’indépendance ?",
      "options": [
        "Oui, s’il partage des objets mutables avec l’argument.",
        "Non, une égalité de valeurs prouve toujours l’absence d’alias.",
        "Seulement si le résultat est trié."
      ],
      "answer": 0,
      "explanation": "La comparaison des valeurs et l’identité des objets vérifient des propriétés distinctes.",
      "id": "pyi-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction pure",
      "definition": "Calcul qui dépend de ses arguments sans modifier de données extérieures."
    },
    {
      "term": "alias",
      "definition": "Autre nom ou référence désignant le même objet."
    },
    {
      "term": "copie superficielle",
      "definition": "Nouveau conteneur qui peut garder les objets contenus partagés."
    },
    {
      "term": "indépendance mutable",
      "definition": "Absence de listes ou dictionnaires partagés entre résultat et arguments."
    }
  ],
  "recap_fr": [
    "Écrire une transformation pure au contrat explicite.",
    "Reconstruire les collections imbriquées pour éviter des alias mutables avec les arguments.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "fonction pure",
    "alias",
    "copie superficielle",
    "indépendance mutable"
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
      "title": "Documentation Python — Copies superficielles et récursives",
      "url": "https://docs.python.org/fr/3/library/copy.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — Méthodes de listes",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html#more-on-lists",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une fonction pure calcule son résultat depuis ses arguments sans modifier les données reçues ni un état extérieur. Pour les mêmes valeurs d’entrée, elle produit les mêmes valeurs de sortie. Ajouter un bonus à une liste de notes fictives peut donc retourner [note + bonus for note in notes]. Les nombres initiaux restent en place, tandis qu’une nouvelle liste reçoit les résultats. Cette séparation rend les appels plus simples à tester et à combiner.

Une affectation ne crée pas de copie. autre = source associe un second nom au même objet. Les deux noms deviennent des alias ; un append effectué avec l’un est visible avec l’autre. source.copy() ou list(source) construit bien une liste différente, mais ne recopie pas automatiquement les objets contenus. Si chaque élément est un dictionnaire, ses références restent partagées par les deux listes.

Il faut donc dessiner les niveaux de la structure. Dans une liste d’équipes, chaque équipe est un dictionnaire et sa propriété membres est une liste de textes. Pour obtenir un résultat entièrement indépendant à ces niveaux mutables, crée une nouvelle liste extérieure, un nouveau dictionnaire pour chaque équipe, puis une nouvelle liste pour chaque membres. Les chaînes peuvent rester partagées : elles sont immuables, donc leur contenu ne sera pas changé par append.

La méthode equipe.copy() copie les associations du dictionnaire, mais sa propriété membres désigne encore la liste initiale. L’affectation nouvelle["membres"] = list(equipe["membres"]) remplace cette référence uniquement dans le nouveau dictionnaire. Le second exemple ajoute ensuite un nom à la copie pour montrer que la liste d’origine reste intacte. Copier seulement la première équipe ne suffirait pas si une autre équipe peut aussi être modifiée par l’appelant.

Nos schémas de données sont volontairement limités et annoncés. Une fiche de stock possède uniquement un code textuel et une quantité entière ; recopier chaque dictionnaire suffit. Un groupe de matériel possède un nom et une liste de textes ; il faut recopier cette liste supplémentaire. Ces solutions ne prétendent pas copier n’importe quel graphe d’objets, des cycles ou des instances complexes. Aucun module de copie n’est nécessaire pour les structures de cette leçon.

Le contrat doit préciser l’indépendance souhaitée. Retourner l’argument inchangé évite une mutation pendant l’appel, mais laisse le résultat partagé avec lui. Les tests de ce chapitre vérifient donc aussi qu’aucune liste ni aucun dictionnaire du résultat n’est un objet mutable de l’argument. Cela concerne même une fiche non modifiée ou une entrée vide. Ce contrôle complète la comparaison des valeurs, qui ne révèle pas à elle seule les alias.

Avant de coder, repère les objets modifiables et les champs à transformer. Vérifie ensuite une cible absente, une liste imbriquée vide et une entrée de plusieurs fiches. N’ajoute pas une déduplication ou un tri non demandé pendant la copie. Les notes, noms et stocks sont fictifs ; le résultat constitue une nouvelle proposition en mémoire, sans écriture dans un dossier réel.

## Exemple guidé 1

```python
source = [10, 12]  # 1

def ajouter_bonus(notes, bonus):  # 2
    return [note + bonus for note in notes]  # 3

resultat = ajouter_bonus(source, 2)  # 4
resultat.append(20)  # 5
print(source)  # 6
print(resultat)  # 7
```

Résultat attendu :

```text
[10, 12]
[12, 14, 20]
```

Trace :

- Ligne 1 : source référence la liste de notes initiale.
- Lignes 2–3 : la fonction produit une nouvelle liste sans affecter les positions de notes.
- Ligne 4 : le bonus deux donne les valeurs 12 et 14.
- Ligne 5 : l’ajout se fait seulement sur la nouvelle liste.
- Lignes 6–7 : les sorties montrent la source intacte et le résultat modifié.

## Exemple guidé 2

```python
source = [{"nom": "Lecture", "membres": ["Ama"]}]  # 1
copie = []  # 2
for equipe in source:  # 3
    nouvelle = equipe.copy()  # 4
    nouvelle["membres"] = list(equipe["membres"])  # 5
    copie.append(nouvelle)  # 6
copie[0]["membres"].append("Kossi")  # 7
print(source[0]["membres"])  # 8
print(copie[0]["membres"])  # 9
```

Résultat attendu :

```text
['Ama']
['Ama', 'Kossi']
```

Trace :

- Lignes 1–2 : la source et une liste extérieure vide sont distinctes.
- Lignes 3–4 : le dictionnaire de chaque équipe est copié.
- Ligne 5 : la liste membres est copiée à son tour, dans ce nouveau dictionnaire.
- Ligne 6 : le résultat reçoit la nouvelle structure.
- Ligne 7 : ajouter Kossi affecte seulement la liste imbriquée copiée.
- Lignes 8–9 : la source garde Ama seul tandis que la copie contient les deux noms.
