---
{
  "id": "pyi-m3-02",
  "course": "python-intermediaire",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Définir un contrat et lever une exception",
  "prerequisites": [
    "pyi-m3-01"
  ],
  "outcomes": [
    "Choisir TypeError ou ValueError selon le refus.",
    "Valider des entiers stricts en excluant les booléens avant tout calcul."
  ],
  "idea_fr": "Un contrat décrit ce que la fonction accepte, retourne et refuse par une vraie exception.",
  "analogy_fr": "Un ticket de stock précise l’unité attendue et la quantité autorisée avant que la sortie de matériel soit calculée.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "0\nTypeError quantité : entier attendu\n",
      "trace_fr": [
        "Le premier appel accepte le type int et la borne zéro ; il retourne 0.",
        "type(True) est bool : le premier contrôle lève TypeError avant toute comparaison métier.",
        "except récupère l’exception dans erreur ; type(erreur).__name__ donne son nom et str(erreur) son message."
      ]
    },
    {
      "inputs": [],
      "expected_output": "0\nstock insuffisant\n",
      "trace_fr": [
        "La demande égale au stock respecte le contrat : le résultat est zéro.",
        "Pour 2 et 3, les types et les bornes passent, mais la relation demande <= stock échoue.",
        "raise interrompt la fonction avant la soustraction ; l’appelant affiche le motif reçu."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Convertir les mauvais types dans le validateur",
      "why_fr": "Une chaîne passée par erreur serait acceptée malgré le contrat annoncé.",
      "fix_fr": "Réserve int à la lecture textuelle ; refuse le mauvais type ici."
    },
    {
      "error": "Lever une exception après le calcul",
      "why_fr": "La division ou la comparaison pourrait échouer avant le message choisi.",
      "fix_fr": "Contrôle types, bornes et relations avant de calculer."
    }
  ],
  "quiz": [
    {
      "question": "Quel refus correspond à TypeError dans ce contrat ?",
      "options": [
        "La quantité entière -2",
        "La quantité entière 0",
        "La chaîne \"2\" utilisée comme quantité"
      ],
      "answer": 2,
      "explanation": "Le contrat exige un int natif : une chaîne est du mauvais type, même si elle serait convertible ailleurs.",
      "id": "pyi-m3-02-q1"
    },
    {
      "question": "Pourquoi isinstance(True, int) ne suffit-il pas ici ?",
      "options": [
        "Parce que bool est une sous-classe de int",
        "Parce que True vaut toujours None",
        "Parce que int refuse toutes les valeurs positives"
      ],
      "answer": 0,
      "explanation": "Python considère True comme une instance de int via bool. Le contrat strict doit exclure les booléens.",
      "id": "pyi-m3-02-q2"
    },
    {
      "question": "Que fait raise ValueError(\"stock insuffisant\") ?",
      "options": [
        "Retourne cette chaîne au calcul suivant",
        "Interrompt le chemin normal avec une exception ValueError",
        "Met automatiquement le stock à zéro"
      ],
      "answer": 1,
      "explanation": "L’exception remonte vers un gestionnaire compatible. Aucun retour normal ou changement de stock n’est implicite.",
      "id": "pyi-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrat",
      "definition": "Description explicite des arguments admis, du retour, des refus et des effets d’une fonction."
    },
    {
      "term": "raise",
      "definition": "Instruction qui lève une exception et quitte le chemin normal courant."
    },
    {
      "term": "TypeError",
      "definition": "Exception adaptée à un argument dont le type ne convient pas à l’opération."
    }
  ],
  "recap_fr": [
    "TypeError distingue un mauvais type de la valeur interdite signalée par ValueError.",
    "Le contrat strict des quantités exclut bool malgré sa relation avec int.",
    "Une validation précède le calcul et laisse les arguments intacts."
  ],
  "tags": [
    "contrat",
    "raise",
    "TypeError",
    "validation"
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

Une fonction fiable n’essaie pas de deviner toutes les intentions de son appelant. Elle annonce un contrat : quels arguments sont admis, quel résultat est produit, et quels refus sont possibles. Pour une quantité de stock, nous demandons ici un entier positif ou nul. Une chaîne telle que « 4 » ne devient pas automatiquement un nombre : la conversion textuelle appartient à une autre fonction. Cette séparation évite qu’une erreur de branchement soit discrètement corrigée au mauvais endroit.

Deux exceptions expriment deux situations différentes. TypeError signifie que la catégorie de l’argument ne convient pas ; ValueError indique que son type est accepté mais que sa valeur sort du domaine autorisé. Ainsi, une quantité fournie comme chaîne relève de TypeError. Un entier égal à moins un relève de ValueError. L’instruction raise, suivie par exemple de ValueError("quantité négative"), crée puis lève une exception. Retourner ce message comme une chaîne ne produit pas le même comportement : le programme continuerait avec un résultat d’un type inattendu.

Les booléens demandent une attention particulière. En Python, bool est une sous-classe de int : isinstance(True, int) vaut True et True peut participer à un calcul comme un. Notre contrat refuse pourtant True et False, car une réponse oui ou non n’est pas une quantité. Dans ce module, « type(valeur) is int » exprime le choix strict des entiers natifs. Contrôlons ce type avant la comparaison avec zéro : comparer une chaîne à un entier produirait sinon une exception technique moins précise.

Après le type viennent les bornes et les relations entre arguments. Une capacité de lot doit être strictement positive, tandis que le nombre d’articles à ranger peut être nul. Pour une sortie de stock, la demande ne peut pas dépasser la disponibilité. L’ordre des validations rend chaque message compréhensible et empêche un calcul intermédiaire invalide. Un message court nomme l’argument et la règle violée ; nous n’utilisons pas de coordonnées personnelles ou de données sensibles dans ces exemples fictifs.

L’appelant choisira plus tard s’il doit corriger la donnée, afficher une explication ou arrêter son traitement. La fonction de calcul n’a donc pas besoin de capturer sa propre exception pour renvoyer None. Laisser remonter un refus annoncé est souvent la manière la plus claire de respecter le contrat. Les activités vérifient le type exact de l’exception et un fragment significatif de son message, en plus des résultats réussis.

Un lot peut aussi nécessiter une validation complète avant de produire son bilan. Nous parcourons ses lignes sans modifier les dictionnaires reçus. Zéro, une liste vide et des quantités répétées sont des situations ordinaires. Un refus situé au milieu du lot ne doit jamais laisser des arguments partiellement réécrits. Le contrat porte donc autant sur les effets évités que sur le nombre retourné.

## Exemple guidé 1

```python
def verifier_quantite(valeur):
    if type(valeur) is not int:
        raise TypeError("quantité : entier attendu")
    if valeur < 0:
        raise ValueError("quantité négative")
    return valeur

print(verifier_quantite(0))
try:
    verifier_quantite(True)
except TypeError as erreur:
    print(type(erreur).__name__, str(erreur))
```

## Exemple guidé 2

```python
def reste_stock(stock, demande):
    if type(stock) is not int or type(demande) is not int:
        raise TypeError("stock et demande : entiers attendus")
    if stock < 0 or demande < 0:
        raise ValueError("quantité négative")
    if demande > stock:
        raise ValueError("stock insuffisant")
    return stock - demande

print(reste_stock(5, 5))
try:
    reste_stock(2, 3)
except ValueError as erreur:
    print(str(erreur))
```
