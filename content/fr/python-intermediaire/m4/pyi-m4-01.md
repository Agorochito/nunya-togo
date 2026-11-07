---
{
  "id": "pyi-m4-01",
  "course": "python-intermediaire",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Construire des instances indépendantes",
  "prerequisites": [
    "pyi-m3-03"
  ],
  "outcomes": [
    "Définir une classe simple avec __init__ et des attributs d’instance.",
    "Éviter le partage involontaire de listes entre instances et arguments."
  ],
  "idea_fr": "Une classe décrit des objets ; chaque instance doit posséder l’état qui lui appartient.",
  "analogy_fr": "Le modèle de fiche du club est commun, mais chaque adhérent reçoit sa propre fiche et ses propres notes.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "Awa 2027\nNoé 2025\n",
      "trace_fr": [
        "Le premier appel construit une instance dont nom vaut « Awa » et annee vaut 2026.",
        "Le second appel crée un autre objet ; ses attributs appartiennent à cette seconde instance.",
        "L’affectation premier.annee = 2027 ne change pas second.annee, qui reste 2025."
      ]
    },
    {
      "inputs": [],
      "expected_output": "['Préparer les cartes']\n[]\nTrue\n",
      "trace_fr": [
        "Chaque appel de Carnet exécute [] et prépare sa propre liste.",
        "alias = premier lie un nouveau nom au premier objet sans construire de carnet supplémentaire.",
        "La note apparaît dans premier, atteint via alias ; second reste vide et is confirme l’identité du premier objet."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Retourner une valeur depuis __init__",
      "why_fr": "Cette méthode prépare l’instance ; elle n’est pas la fonction qui produit le bilan attendu.",
      "fix_fr": "Affecte les attributs dans __init__ et retourne les données depuis la fonction de contrat."
    },
    {
      "error": "Confondre deux noms avec deux objets",
      "why_fr": "Un alias partage encore les attributs et les listes de son objet d’origine.",
      "fix_fr": "Appelle deux fois la classe et copie les collections reçues quand le contrat l’exige."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne self pendant __init__ ?",
      "options": [
        "La classe entière et toutes ses instances",
        "L’instance en cours d’initialisation",
        "Le dictionnaire retourné au correcteur"
      ],
      "answer": 1,
      "explanation": "Python fournit l’instance comme premier argument ; self.nom appartient à cet objet.",
      "id": "pyi-m4-01-q1"
    },
    {
      "question": "Après second = premier, combien de nouvelles instances ont été créées par cette affectation ?",
      "options": [
        "Deux",
        "Une",
        "Aucune"
      ],
      "answer": 2,
      "explanation": "L’affectation ajoute un nom pour le même objet. Un appel de la classe serait nécessaire pour construire une autre instance.",
      "id": "pyi-m4-01-q2"
    },
    {
      "question": "Où créer une liste propre à chaque carnet ?",
      "options": [
        "Dans __init__, avec self.notes = []",
        "Dans le corps de class, avec notes = []",
        "Dans une unique liste globale"
      ],
      "answer": 0,
      "explanation": "Cette ligne est exécutée à chaque construction et attribue une liste nouvelle à chaque instance.",
      "id": "pyi-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "classe",
      "definition": "Définition d’un type d’objets et des opérations associées."
    },
    {
      "term": "instance",
      "definition": "Objet particulier construit par un appel de la classe."
    },
    {
      "term": "attribut d’instance",
      "definition": "Valeur attachée à un objet, accessible notamment par self.nom dans sa classe."
    },
    {
      "term": "alias",
      "definition": "Autre nom qui désigne le même objet, sans le copier."
    }
  ],
  "recap_fr": [
    "L’appel de la classe construit une instance ; __init__ prépare ses attributs.",
    "self désigne l’instance utilisée par la méthode.",
    "Une liste indépendante se crée ou se copie pour chaque instance."
  ],
  "tags": [
    "classes",
    "__init__",
    "self",
    "instances",
    "copies"
  ],
  "sources": [
    {
      "title": "Python — Classes",
      "url": "https://docs.python.org/fr/3/tutorial/classes.html",
      "scope": "Instances, attributs, méthodes et données mutables propres à chaque instance.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Erreurs et exceptions",
      "url": "https://docs.python.org/fr/3/tutorial/errors.html",
      "scope": "try/except ciblé, propagation et levée explicite des exceptions.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Exceptions natives",
      "url": "https://docs.python.org/fr/3/library/exceptions.html",
      "scope": "Différence entre TypeError, ValueError et KeyError.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Fonctions natives",
      "url": "https://docs.python.org/fr/3/library/functions.html",
      "scope": "int, type, isinstance et lien entre bool et int.",
      "last_checked": "2026-11-06"
    }
  ],
  "environment_fr": "Python exécuté localement dans le navigateur. Données fictives en mémoire ; aucun réseau, fichier durable ou package tiers.",
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Nous avons représenté des données avec des dictionnaires et écrit des fonctions pour les traiter. Une classe propose une autre organisation : elle rassemble une forme d’état et les opérations qui lui sont associées. Le mot-clé class suivi d’un nom définit un nouveau type. L’appel de ce nom crée une instance. Deux appels construisent deux objets distincts, même si les arguments fournis sont égaux. La classe n’est donc pas la fiche d’un membre particulier ; c’est la définition commune utilisée pour créer des fiches.

Une fonction spéciale nommée __init__ prépare une instance venant d’être créée. Dans sa définition, le premier paramètre est appelé self par convention. Il représente l’instance en cours de préparation. L’affectation self.nom = nom place la valeur reçue dans un attribut de cet objet. À l’appel Membre("Awa"), nous n’écrivons pas nous-mêmes l’argument self : Python fournit l’instance. __init__ initialise l’objet et ne doit pas retourner un bilan ou une autre valeur ; la création fournit ensuite l’instance à l’appelant.

L’accès membre.nom lit un attribut. Modifier membre.nom concerne cette instance, pas toutes celles de la classe. Attention toutefois aux références : écrire second = premier ne crée aucun nouvel objet. Les deux noms désignent alors la même instance. Pour obtenir deux fiches indépendantes, il faut bien appeler deux fois la classe. Les activités utilisent une fonction de contrat qui crée les objets, effectue les opérations demandées et retourne un dictionnaire ou une liste : le correcteur reçoit des données simples plutôt qu’une instance.

Les listes demandent la même vigilance qu’au module sur les copies. Une liste définie directement dans le corps de la classe serait un attribut commun, partagé tant qu’aucun attribut d’instance ne le remplace. Pour les notes propres à chaque fiche, créons self.notes = [] dans __init__. Chaque appel fabrique ainsi une liste nouvelle. Si le constructeur reçoit une liste de chaînes, list(notes) en fait une copie superficielle suffisante ici, puisque les éléments sont des chaînes immuables. Nous ne promettons pas une copie profonde de structures arbitraires.

Les premiers exercices restent volontairement simples. Les types et les valeurs fournis sont garantis par leurs consignes ; la prochaine leçon ajoutera des validations et des méthodes qui protègent l’état. Une classe n’apporte aucune protection automatique contre une mauvaise affectation extérieure. Nous apprenons d’abord à localiser les données et à reconnaître les objets qui les possèdent.

Pour vérifier l’indépendance, ne compare pas seulement deux valeurs initiales identiques. Change la première instance puis observe la seconde. Fais aussi varier une liste vide, des notes répétées et les noms reçus. Les arguments d’entrée doivent rester intacts : ajouter une note au dossier créé ne doit pas réécrire la liste de l’appelant. Cette expérience rend visibles les liens entre noms, objets et collections sans utiliser de stockage permanent.

## Exemple guidé 1

```python
class Membre:

    def __init__(self, nom, annee):
        self.nom = nom
        self.annee = annee

premier = Membre("Awa", 2026)
second = Membre("Noé", 2025)
premier.annee = 2027
print(premier.nom, premier.annee)
print(second.nom, second.annee)
```

## Exemple guidé 2

```python
class Carnet:

    def __init__(self):
        self.notes = []

premier = Carnet()
second = Carnet()
alias = premier
alias.notes.append("Préparer les cartes")
print(premier.notes)
print(second.notes)
print(alias is premier)
```
