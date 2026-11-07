---
{
  "id": "pyi-m2-01",
  "title_fr": "Définir des options sans partager un défaut mutable",
  "course": "python-intermediaire",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "pyi-m1-03"
  ],
  "outcomes": [
    "Utiliser valeurs par défaut et arguments nommés pour rendre un appel explicite.",
    "Créer une nouvelle collection par appel plutôt que modifier un défaut partagé."
  ],
  "idea_fr": "Un défaut est évalué à la définition ; une collection de travail indépendante se crée à l’intérieur de l’appel.",
  "analogy_fr": "Une fiche modèle fournit des options habituelles, mais chaque préparation doit recevoir sa propre feuille de travail.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "['Lecture']\n['Jardin']\n['Chant', 'Dessin']\n['Chant']\n",
      "trace_fr": [
        "Ligne 1 : None est le marqueur de l’option non fournie.",
        "Ligne 5 : la branche de la ligne 2 crée une liste propre au premier appel.",
        "Ligne 6 : le second appel crée une autre liste, sans Lecture.",
        "Ligne 7 : la liste origine est copiée à la ligne 3 avant l’ajout.",
        "Ligne 8 : origine contient encore uniquement Chant."
      ]
    },
    {
      "inputs": [],
      "expected_output": "Chant — Lomé : 0\nJardin — Kara : 4\n",
      "trace_fr": [
        "Ligne 1 : ville et places possèdent des défauts immuables.",
        "Ligne 2 : la chaîne formatée présente les valeurs effectivement reçues.",
        "Ligne 3 : seul titre est fourni, les deux défauts s’appliquent.",
        "Ligne 4 : les noms places et ville associent les options sans dépendre de leur ordre dans cet appel."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Défaut mutable modifié",
      "why_fr": "Une liste ou un dictionnaire est partagé entre appels.",
      "fix_fr": "Choisis None puis crée la collection dans le corps."
    },
    {
      "error": "Copier seulement la référence",
      "why_fr": "Le résultat et l’argument sont le même objet.",
      "fix_fr": "Construis une nouvelle liste ou un nouveau dictionnaire."
    },
    {
      "error": "Remplacer un zéro présent",
      "why_fr": "Une règle de vérité est prise pour un test de clé absente.",
      "fix_fr": "Utilise get avec le défaut annoncé."
    }
  ],
  "quiz": [
    {
      "question": "Quand une liste utilisée comme valeur par défaut est-elle créée ?",
      "options": [
        "À chaque entrée dans la fonction.",
        "Seulement au deuxième appel.",
        "Quand la définition de fonction est exécutée."
      ],
      "answer": 2,
      "explanation": "L’objet mutable peut donc être partagé par plusieurs appels.",
      "id": "pyi-m2-01-q1"
    },
    {
      "question": "Que distingue if noms is None ?",
      "options": [
        "Uniquement les listes vides et les chaînes vides.",
        "Le marqueur None, précisément.",
        "Toutes les listes courtes."
      ],
      "answer": 1,
      "explanation": "Le test ne confond pas absence d’argument et collection fournie.",
      "id": "pyi-m2-01-q2"
    },
    {
      "question": "Quel effet produit une option nommée ville=\"Kara\" dans un appel ?",
      "options": [
        "Elle fournit la valeur au paramètre ville.",
        "Elle réécrit le défaut de la définition pour tous les appels suivants.",
        "Elle crée un dictionnaire global nommé ville."
      ],
      "answer": 0,
      "explanation": "Le nom explicite l’association de l’argument au paramètre.",
      "id": "pyi-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "valeur par défaut",
      "definition": "Valeur utilisée lorsqu’un argument n’est pas fourni."
    },
    {
      "term": "argument nommé",
      "definition": "Argument associé explicitement à un paramètre dans l’appel."
    },
    {
      "term": "défaut mutable",
      "definition": "Objet modifiable pouvant rester partagé entre plusieurs appels."
    },
    {
      "term": "marqueur None",
      "definition": "Valeur utilisée ici pour représenter l’absence d’une collection fournie."
    }
  ],
  "recap_fr": [
    "Utiliser valeurs par défaut et arguments nommés pour rendre un appel explicite.",
    "Créer une nouvelle collection par appel plutôt que modifier un défaut partagé.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "valeur par défaut",
    "argument nommé",
    "défaut mutable",
    "marqueur None"
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
      "title": "Documentation Python — Valeurs par défaut",
      "url": "https://docs.python.org/fr/3/tutorial/controlflow.html#default-argument-values",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — Arguments nommés",
      "url": "https://docs.python.org/fr/3/tutorial/controlflow.html#keyword-arguments",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une fonction peut proposer une valeur par défaut pour certains paramètres. Dans def etiquette(titre, ville="Lomé", places=0), titre reste obligatoire ; les deux autres valeurs peuvent être omises. etiquette("Chant") utilise alors la ville et le nombre prévus. Une valeur par défaut ne vérifie pas un type et n’oblige pas les autres appels à conserver cette valeur. Elle décrit seulement ce qui se passe quand cet argument n’est pas fourni.

Un argument nommé précise le paramètre concerné dans l’appel. etiquette("Jardin", places=4, ville="Kara") reste clair même si les deux options sont écrites dans un autre ordre. Place les arguments positionnels avant les arguments nommés. Un même paramètre ne doit pas recevoir deux valeurs au cours d’un appel. Les exercices utilisent des noms explicites plutôt qu’une longue suite de valeurs dont il faudrait deviner le sens.

Le moment d’évaluation d’un défaut compte. Dans def ajouter(nom, noms=[]), la liste est créée quand la définition est exécutée, pas à chaque appel. Si la fonction lui ajoute un nom, l’appel suivant sans argument retrouve la même liste modifiée. Le problème ne vient pas de append lui-même : il vient du partage durable d’un objet mutable alors que le besoin demande un résultat indépendant pour chaque préparation.

Le patron noms=None évite ce partage involontaire. Au début de la fonction, if noms is None reconnaît l’absence d’une collection fournie et crée une nouvelle liste. Si une liste a été fournie, list(noms) construit une nouvelle liste extérieure avant l’ajout. Le test is None désigne précisément le marqueur choisi ; un test comme if not noms confondrait aussi ce marqueur avec une liste vide, même si ces deux situations peuvent avoir des significations différentes.

La même idée vaut pour un dictionnaire de comptages. dict(comptes) copie ses associations avant de changer une quantité ; elle ne copie pas récursivement les objets imbriqués. Cette leçon manipule des nombres et des textes simples. Les copies imbriquées auront leur propre explication dans deux chapitres. Pour l’instant, annonce clairement si une fonction retourne une nouvelle collection ou modifie volontairement celle de l’appelant ; nos contrats demandent la première possibilité.

Les options reçues dans un dictionnaire peuvent être transmises avec des arguments nommés. options.get("places", 0) utilise zéro seulement si la clé est absente. Une valeur présente égale à zéro doit être conservée ; utiliser une chaîne vide comme donnée ne signifie pas automatiquement que la clé manque. Cette fidélité au contrat évite d’inventer une règle de normalisation.

Teste plusieurs appels successifs sans collection explicite, puis un appel avec une collection existante. Un test isolé peut manquer le défaut partagé, car un programme neuf crée une nouvelle définition. Les appels d’un même cas partagent volontairement cette définition pour rendre la fuite visible. Tout reste en mémoire sur des fiches fictives, sans enregistrement extérieur.

## Exemple guidé 1

```python
def ajouter_nom(nom, noms=None):  # 1
    if noms is None:  # 2
        resultat = []
    else:
        resultat = list(noms)  # 3
    resultat.append(nom)  # 4
    return resultat

print(ajouter_nom("Lecture"))  # 5
print(ajouter_nom("Jardin"))  # 6
origine = ["Chant"]
print(ajouter_nom("Dessin", origine))  # 7
print(origine)  # 8
```

Résultat attendu :

```text
['Lecture']
['Jardin']
['Chant', 'Dessin']
['Chant']
```

Trace :

- Ligne 1 : None est le marqueur de l’option non fournie.
- Ligne 5 : la branche de la ligne 2 crée une liste propre au premier appel.
- Ligne 6 : le second appel crée une autre liste, sans Lecture.
- Ligne 7 : la liste origine est copiée à la ligne 3 avant l’ajout.
- Ligne 8 : origine contient encore uniquement Chant.

## Exemple guidé 2

```python
def etiquette(titre, ville="Lomé", places=0):  # 1
    return f"{titre} — {ville} : {places}"  # 2

print(etiquette("Chant"))  # 3
print(etiquette("Jardin", places=4, ville="Kara"))  # 4
```

Résultat attendu :

```text
Chant — Lomé : 0
Jardin — Kara : 4
```

Trace :

- Ligne 1 : ville et places possèdent des défauts immuables.
- Ligne 2 : la chaîne formatée présente les valeurs effectivement reçues.
- Ligne 3 : seul titre est fourni, les deux défauts s’appliquent.
- Ligne 4 : les noms places et ville associent les options sans dépendre de leur ordre dans cet appel.
