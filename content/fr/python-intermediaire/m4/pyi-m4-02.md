---
{
  "id": "pyi-m4-02",
  "course": "python-intermediaire",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Protéger l’état avec des méthodes",
  "prerequisites": [
    "pyi-m4-01"
  ],
  "outcomes": [
    "Définir des méthodes qui préservent les invariants d’un objet.",
    "Valider une opération avant toute mutation et observer l’état après un refus."
  ],
  "idea_fr": "Une méthode protège une règle d’état en contrôlant tous ses arguments avant de modifier l’objet.",
  "analogy_fr": "Le registre du club débite une réserve après avoir validé le ticket, jamais avant de découvrir qu’il est impossible.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "places insuffisantes\n1\n0\n",
      "trace_fr": [
        "La construction prépare 3 places, puis la première réservation réduit restantes à 1.",
        "La deuxième demande dépasse 1 : la méthode lève ValueError avant la soustraction, donc restantes demeure 1.",
        "La dernière demande est égale à la disponibilité et réussit ; l’invariant restantes >= 0 est conservé."
      ]
    },
    {
      "inputs": [],
      "expected_output": "[3, 3, 2]\n",
      "trace_fr": [
        "L’objet commence à 5 ; retirer 2 réussit et le pilote mémorise 3.",
        "Retirer 9 échoue avant mutation. La capture groupée vise seulement TypeError et ValueError ; pass laisse ensuite relever le solde inchangé, 3.",
        "Le troisième retrait utilise ce solde conservé et laisse 2. Le pilote retourne la trace des états, sans modifier la liste reçue."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Modifier puis valider",
      "why_fr": "Le refus laisse un état négatif, car raise ne revient pas en arrière.",
      "fix_fr": "Effectue tous les contrôles avant la première mutation."
    },
    {
      "error": "Réparer l’objet depuis le pilote",
      "why_fr": "Les règles se dispersent et une autre utilisation de la méthode reste incorrecte.",
      "fix_fr": "Garantis l’invariant dans la méthode ; le pilote se limite au rapport et à la poursuite."
    }
  ],
  "quiz": [
    {
      "question": "Quand une méthode doit-elle soustraire le montant demandé ?",
      "options": [
        "Avant les contrôles pour connaître le résultat",
        "Après tous les contrôles qui peuvent refuser cette opération",
        "Dans le bloc except du pilote"
      ],
      "answer": 1,
      "explanation": "Une exception n’annule pas une mutation déjà faite ; valider d’abord préserve l’état en cas de refus.",
      "id": "pyi-m4-02-q1"
    },
    {
      "question": "Quel invariant vérifie notre réserve de places ?",
      "options": [
        "La quantité restante ne devient jamais négative",
        "Chaque réservation doit réussir",
        "Deux objets doivent partager leur disponibilité"
      ],
      "answer": 0,
      "explanation": "L’invariant doit rester vrai après la construction, les réussites et les refus.",
      "id": "pyi-m4-02-q2"
    },
    {
      "question": "Dans places.reserver(2), qui fournit self ?",
      "options": [
        "Le nombre 2",
        "Le message de ValueError",
        "Python, avec l’objet places"
      ],
      "answer": 2,
      "explanation": "L’appel lié à l’objet fournit l’instance comme premier argument de la méthode.",
      "id": "pyi-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "méthode",
      "definition": "Fonction définie dans une classe qui reçoit l’instance comme premier argument lors d’un appel lié."
    },
    {
      "term": "invariant",
      "definition": "Règle d’état devant rester vraie après la construction et chaque opération annoncée."
    },
    {
      "term": "mutation",
      "definition": "Modification de l’état d’un objet existant, par exemple d’un attribut ou d’une liste."
    }
  ],
  "recap_fr": [
    "Le constructeur établit l’invariant et les méthodes le préservent.",
    "Une exception ne supprime pas les modifications déjà effectuées.",
    "Après un refus, observe l’état et vérifie qu’une opération valable suivante fonctionne."
  ],
  "tags": [
    "méthodes",
    "invariants",
    "mutation",
    "exceptions"
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

Un objet peut conserver un état entre plusieurs opérations. Un stock contient une quantité ; une réserve de places contient une disponibilité. Pour que ces données restent cohérentes, nous choisissons un invariant : une règle qui doit être vraie après la construction et après chaque opération publique. Ici, une quantité disponible ne devient jamais négative. Le constructeur établit cet invariant, puis les méthodes doivent le préserver.

Une méthode se définit comme une fonction dans la classe, avec self en premier paramètre. Lorsqu’on écrit reserve.ajouter(3), Python fournit automatiquement reserve comme self. La méthode lit et modifie les attributs de cette instance. Elle n’a pas besoin de recevoir à nouveau la quantité actuelle en argument. Dans nos exercices, les méthodes effectuent une action et ne retournent pas de bilan ; l’appelant lit ensuite les attributs utiles pour préparer une réponse simple.

L’ordre des instructions est essentiel. Avant un retrait, contrôlons le type du montant, sa borne puis sa compatibilité avec le solde. La soustraction arrive seulement après ces vérifications. Une méthode qui soustrait d’abord et lève ensuite ValueError laisse l’objet dans un état interdit. Lever une exception n’annule pas automatiquement les affectations ou les modifications de listes déjà effectuées. Python ne transforme pas une méthode ordinaire en transaction avec retour en arrière.

Le constructeur suit la même discipline. Il refuse une quantité initiale du mauvais type avec TypeError et une quantité négative avec ValueError. Les booléens restent exclus du contrat des entiers stricts. Certaines méthodes demandent un ajout strictement positif ; d’autres activités annoncent explicitement que zéro est autorisé et ne change rien. Il n’existe pas de borne universelle : il faut appliquer celle de chaque consigne et produire un message correspondant à l’argument concerné.

Le niveau qui pilote une suite d’actions peut capturer les refus attendus et continuer. Après chaque tentative, il peut relever le solde ou mémoriser un message. Ce pilote ne modifie pas directement l’attribut pour réparer un retrait mal écrit : c’est la méthode qui garantit l’invariant. Un essai refusé doit laisser exactement le même état qu’avant l’appel. Un essai valable suivant doit donc encore utiliser la véritable disponibilité.

Les attributs présentés restent accessibles ; cette organisation ne les rend pas secrets et ne bloque pas une affectation extérieure incorrecte. Nous choisissons de passer par les méthodes pour conserver les règles au même endroit. Les tests se concentrent sur le comportement demandé : opération réussie, borne exacte, mauvais type, refus pour insuffisance, puis nouvelle réussite. Les fonctions de contrat créent leurs propres instances, conservent les listes d’actions reçues et retournent uniquement des nombres, listes et dictionnaires décrivant le résultat observable.

## Exemple guidé 1

```python
class Places:

    def __init__(self, capacite):
        if type(capacite) is not int:
            raise TypeError("capacité : entier attendu")
        if capacite < 0:
            raise ValueError("capacité négative")
        self.restantes = capacite

    def reserver(self, nombre):
        if type(nombre) is not int:
            raise TypeError("réservation : entier attendu")
        if nombre <= 0:
            raise ValueError("réservation strictement positive attendue")
        if nombre > self.restantes:
            raise ValueError("places insuffisantes")
        self.restantes -= nombre
places = Places(3)
places.reserver(2)
try:
    places.reserver(2)
except ValueError as erreur:
    print(str(erreur))
print(places.restantes)
places.reserver(1)
print(places.restantes)
```

## Exemple guidé 2

```python
class PorteMonnaie:

    def __init__(self, initial):
        if type(initial) is not int:
            raise TypeError("solde : entier attendu")
        if initial < 0:
            raise ValueError("solde négatif")
        self.solde = initial

    def retirer(self, montant):
        if type(montant) is not int:
            raise TypeError("retrait : entier attendu")
        if montant <= 0:
            raise ValueError("retrait strictement positif attendu")
        if montant > self.solde:
            raise ValueError("solde insuffisant")
        self.solde -= montant


def suivre_retraits(initial, retraits):
    porte_monnaie = PorteMonnaie(initial)
    soldes = []
    for montant in retraits:
        try:
            porte_monnaie.retirer(montant)
        except (TypeError, ValueError):
            pass
        soldes.append(porte_monnaie.solde)
    return soldes

print(suivre_retraits(5, [2, 9, 1]))
```
