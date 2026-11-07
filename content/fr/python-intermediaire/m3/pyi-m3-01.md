---
{
  "id": "pyi-m3-01",
  "course": "python-intermediaire",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Convertir un texte et traiter ValueError",
  "prerequisites": [
    "pyi-m2-03"
  ],
  "outcomes": [
    "Capturer uniquement l’échec attendu d’une conversion entière.",
    "Conserver les valeurs valides, dont zéro, et repérer les textes refusés."
  ],
  "idea_fr": "Une erreur de saisie attendue peut devenir une donnée explicite, sans masquer les autres erreurs.",
  "analogy_fr": "À l’accueil du club, une case illisible est signalée ; elle ne transforme pas toute la feuille en une page vide.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "0\nNone\n-3\n",
      "trace_fr": [
        "L’appel avec « 0 » convertit la chaîne : valeur reçoit 0 et except est ignoré.",
        "« trois » déclenche ValueError dans int ; le gestionnaire retourne None.",
        "« -3 » est une écriture entière : la fonction retourne -3 sans décider de sa validité métier."
      ]
    },
    {
      "inputs": [],
      "expected_output": "{'valides': 3, 'erreurs': [2]}\n",
      "trace_fr": [
        "enumerate attribue les numéros 1 à 4 sans changer la liste.",
        "La conversion de la ligne 2 échoue ; seul son numéro rejoint erreurs.",
        "Le bloc else de try s’exécute uniquement après une tentative réussie : les deux 4 et le 0 comptent, soit trois réussites."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Capturer toutes les exceptions",
      "why_fr": "Un défaut de programmation serait présenté comme une simple saisie illisible.",
      "fix_fr": "Nomme ValueError et limite la tentative à int."
    },
    {
      "error": "Remplacer zéro par le défaut",
      "why_fr": "La valeur logique de zéro vaut False sans être une erreur de conversion.",
      "fix_fr": "Teste explicitement None ou retourne directement le résultat réussi."
    }
  ],
  "quiz": [
    {
      "question": "Quel texte int peut-il convertir directement en entier ?",
      "options": [
        "\"3.5\"",
        "\" -3 \"",
        "\"trois\""
      ],
      "answer": 1,
      "explanation": "Les espaces autour et le signe sont admis ; un point décimal ou un mot ne constitue pas ici une écriture entière.",
      "id": "pyi-m3-01-q1"
    },
    {
      "question": "Pourquoi écrire « valeur is None » plutôt que « not valeur » après une lecture ?",
      "options": [
        "Pour distinguer une absence du nombre zéro",
        "Parce que None est un entier négatif",
        "Pour convertir le texte une deuxième fois"
      ],
      "answer": 0,
      "explanation": "Zéro est faux en contexte booléen mais peut provenir d’une conversion réussie. None représente le refus annoncé.",
      "id": "pyi-m3-01-q2"
    },
    {
      "question": "Où placer try pour poursuivre après chaque ligne illisible ?",
      "options": [
        "Autour de toute la boucle uniquement",
        "Après le return final",
        "Dans la boucle, autour de la conversion de chaque ligne"
      ],
      "answer": 2,
      "explanation": "Chaque itération possède alors sa tentative et son traitement. Après un refus, l’itération suivante reste accessible.",
      "id": "pyi-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "exception",
      "definition": "Événement qui interrompt le chemin normal d’exécution et peut être traité par un gestionnaire adapté."
    },
    {
      "term": "ValueError",
      "definition": "Exception signalant ici qu’un texte ne représente pas une valeur entière interprétable."
    },
    {
      "term": "gestionnaire",
      "definition": "Bloc except exécuté lorsque le type de l’exception correspond à celui annoncé."
    }
  ],
  "recap_fr": [
    "Convertir et décider si une valeur est autorisée sont deux étapes différentes.",
    "Un except ciblé traite la saisie attendue et laisse remonter les autres défauts.",
    "Un lot se traite ligne par ligne, sans perdre les positions ni les zéros."
  ],
  "tags": [
    "exceptions",
    "try",
    "ValueError",
    "conversion"
  ],
  "sources": [
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

Une saisie textuelle n’est pas encore un nombre. La chaîne « 12 » et l’entier 12 ont des comportements différents : multiplier la première répète du texte, multiplier le second effectue un calcul. La fonction int convertit une chaîne entière, avec éventuellement des espaces autour et un signe. Elle accepte « -3 », mais pas « 3.5 », car ce dernier texte décrit une écriture décimale. Les exercices reçoivent toujours des chaînes ; reconnaître d’autres types appartient à la prochaine leçon.

Quand int ne peut pas interpréter le texte, Python lève ValueError. Une exception interrompt le chemin normal à l’endroit où elle survient. Avec try, nous délimitons une tentative ; avec except ValueError, nous décrivons le traitement de cet échec précis. Si la conversion réussit, le bloc except est ignoré. Si elle échoue, l’affectation qui devait recevoir le résultat n’a pas lieu, et Python passe au gestionnaire correspondant.

Gardons le bloc try court : la conversion seule suffit ici. Un calcul, un accès à un dictionnaire ou une mise à jour ajoutés dans ce bloc pourraient produire une autre erreur, dont le sens serait différent. Capturer Exception, ou utiliser except sans type, ferait disparaître des défauts de programmation derrière un message de saisie. Un except ValueError laisse au contraire les erreurs d’un autre type remonter vers l’appelant.

Une première convention consiste à retourner None pour une conversion impossible. Ce choix convient parce que toute conversion réussie retourne un entier. Il faut ensuite comparer le résultat avec None, au moyen de « is None ». Tester seulement sa valeur logique confondrait zéro avec une absence : bool(0) vaut False, alors que « 0 » est une saisie entière parfaitement lisible. Un entier négatif est lui aussi lisible ; décider s’il est autorisé est une règle distincte de la conversion.

Pour une liste de textes, chaque élément mérite sa propre tentative. Une seule chaîne invalide ne doit pas empêcher la lecture des suivantes. Nous conservons l’ordre d’arrivée, les doublons et une numérotation humaine commençant à un. Un rapport peut réunir une liste de valeurs et une liste d’erreurs contenant le numéro de ligne et le texte original. Le numéro aide à corriger la source, tandis que conserver le texte évite d’inventer ce que la personne voulait écrire.

Les fonctions proposées n’affichent rien et ne modifient pas la liste reçue. Elles construisent des résultats nouveaux, que l’interface pourrait afficher plus tard. Un lot vide donne des listes vides et un total nul. Cette séparation entre lecture et présentation permet de vérifier les réussites, les refus et les bornes sans dépendre d’une interaction réelle au clavier.

## Exemple guidé 1

```python
def lire_entier(texte):
    try:
        valeur = int(texte)
    except ValueError:
        return None
    return valeur

print(lire_entier(" 0 "))
print(lire_entier("trois"))
print(lire_entier("-3"))
```

## Exemple guidé 2

```python
def compter_lectures(textes):
    valides = 0
    erreurs = []
    for numero, texte in enumerate(textes, start=1):
        try:
            int(texte)
        except ValueError:
            erreurs.append(numero)
        else:
            valides += 1
    return {"valides": valides, "erreurs": erreurs}

print(compter_lectures(["4", "?", "0", "4"]))
```
