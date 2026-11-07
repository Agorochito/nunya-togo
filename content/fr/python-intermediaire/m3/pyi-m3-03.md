---
{
  "id": "pyi-m3-03",
  "course": "python-intermediaire",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Séparer lecture, validation et calcul",
  "prerequisites": [
    "pyi-m3-02"
  ],
  "outcomes": [
    "Composer une lecture contrôlée avec un calcul sans masquer les refus.",
    "Produire un rapport ordonné de lignes acceptées et refusées."
  ],
  "idea_fr": "Chaque fonction porte une responsabilité ; le niveau qui connaît le contexte décide comment présenter les erreurs.",
  "analogy_fr": "Un atelier vérifie les étiquettes, mesure les quantités et prépare un bilan : chaque poste garde un rôle précis.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "12\nquantité négative\n",
      "trace_fr": [
        "parser_quantite convertit « 3 » puis accepte sa borne ; montant_ligne calcule 3 × 4.",
        "Pour « -2 », la conversion réussit mais la validation lève ValueError.",
        "montant_ligne ne capture pas ce refus : il remonte vers le try de l’appelant, sans effectuer la multiplication."
      ]
    },
    {
      "inputs": [],
      "expected_output": "{'valeurs': [0, 2], 'erreurs': [{'ligne': 2, 'motif': 'texte illisible'}, {'ligne': 3, 'motif': 'quantité négative'}]}\n",
      "trace_fr": [
        "La ligne 1 produit 0, qui rejoint la liste des réussites.",
        "Les lignes 2 et 3 échouent à deux étapes distinctes ; le rapport conserve le message correspondant et leur position.",
        "La ligne 4 est encore traitée après les refus ; valeurs finit à [0, 2]."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Capturer un refus pour retourner un faux montant",
      "why_fr": "Le résultat zéro ne dit plus si la ligne était réellement valable.",
      "fix_fr": "Laisse remonter le refus vers le niveau capable de produire un rapport."
    },
    {
      "error": "Perdre la suite après le premier refus",
      "why_fr": "Un try autour de tout le parcours quitte la boucle sur la première exception.",
      "fix_fr": "Capture chaque erreur attendue à l’intérieur du parcours."
    }
  ],
  "quiz": [
    {
      "question": "Quel niveau connaît le numéro de la ligne à inclure dans le rapport ?",
      "options": [
        "Le traitement du lot qui parcourt les textes",
        "int automatiquement",
        "La multiplication seule"
      ],
      "answer": 0,
      "explanation": "La boucle possède la position ; le parseur n’a reçu qu’un texte et doit rester réutilisable.",
      "id": "pyi-m3-03-q1"
    },
    {
      "question": "Que devient une exception non capturée dans total_ligne ?",
      "options": [
        "Elle est automatiquement remplacée par zéro",
        "Elle disparaît au return suivant",
        "Elle remonte vers l’appelant jusqu’à un gestionnaire compatible"
      ],
      "answer": 2,
      "explanation": "La propagation conserve le refus annoncé. Le calcul n’a pas à inventer une réussite de remplacement.",
      "id": "pyi-m3-03-q2"
    },
    {
      "question": "Une ligne \"0\" au prix 4 doit apparaître où ?",
      "options": [
        "Dans les erreurs de conversion",
        "Dans les lignes acceptées, avec un montant nul",
        "Nulle part car zéro est faux"
      ],
      "answer": 1,
      "explanation": "La quantité zéro respecte le contrat. Un montant nul n’est pas un indice d’échec.",
      "id": "pyi-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "parseur",
      "definition": "Fonction qui interprète une représentation textuelle et fournit ici une quantité au contrat annoncé."
    },
    {
      "term": "propagation",
      "definition": "Remontée d’une exception vers les fonctions appelantes tant qu’elle n’est pas traitée."
    },
    {
      "term": "responsabilité",
      "definition": "Rôle précis attribué à une fonction pour rendre ses décisions compréhensibles et vérifiables."
    }
  ],
  "recap_fr": [
    "Le parseur retourne une quantité valable ou lève un refus explicite.",
    "Un calcul peut laisser remonter l’exception sans la transformer.",
    "Le traitement du lot ajoute les positions et conserve toutes les réussites."
  ],
  "tags": [
    "composition",
    "validation",
    "rapport",
    "exceptions"
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

Un traitement utile combine souvent plusieurs étapes. Une ligne du club arrive avec une quantité écrite comme texte et un prix entier déjà connu. Il faut d’abord interpréter le texte, vérifier que la quantité est autorisée, puis calculer un montant. Une seule longue fonction peut accomplir cela, mais les règles deviennent difficiles à relire et les erreurs difficiles à localiser. Séparer les responsabilités permet de vérifier chaque décision indépendamment.

Notre fonction parser_quantite reçoit une chaîne. Elle appelle int dans un try ciblé ; si la conversion échoue, elle lève ValueError avec le message stable « texte illisible ». Une fois la lecture réussie, elle refuse les nombres négatifs avec « quantité négative ». Zéro reste autorisé. Le résultat normal est donc toujours un entier positif ou nul. Cette fonction n’affiche rien, ne connaît pas le numéro de ligne et ne décide pas comment l’interface doit présenter le refus.

Un calcul peut ensuite appeler ce parseur et utiliser son résultat. La multiplication n’a pas besoin d’un second try si elle ne sait pas quoi faire d’une donnée invalide. Une exception traverse les appels tant qu’aucun gestionnaire compatible ne la capture. En laissant le refus remonter, le calcul évite de fabriquer un montant nul ou une chaîne qui ressemblerait à une réussite. Le prix des exercices est garanti entier positif ou nul : nous ne mélangeons pas ici une nouvelle règle de conversion des prix.

Le traitement d’un lot possède davantage de contexte. Il connaît le numéro de ligne et peut construire un rapport utile. Il appelle le parseur pour chaque texte, capture seulement ValueError à ce niveau, puis ajoute soit une valeur acceptée, soit une erreur. « except ValueError as erreur » donne accès à l’objet exception ; str(erreur) fournit son message. La boucle continue ensuite avec la ligne suivante. Un refus ne fait donc disparaître ni les lignes déjà acceptées ni celles qui restent à lire.

Les responsabilités ne sont pas des barrières artificielles. Un petit parseur rassemble ici conversion et validation de quantité parce que son contrat est court ; le calcul reste séparé, ainsi que la présentation du rapport. Si une règle change, nous savons quelle fonction relire. Les activités recopient leurs auxiliaires dans chaque programme pour rester autonomes : aucun exercice ne dépend du code enregistré dans la page précédente.

Le rapport conserve l’ordre des réussites et celui des erreurs, ainsi que les doublons. Deux lignes portant le même nom restent deux lignes distinctes. Une quantité égale à zéro produit bien une réussite de montant nul ; elle ne doit pas être classée parmi les refus. Le lot vide retourne un total nul et deux listes vides. Les entrées demeurent inchangées, ce qui permet à une interface de les représenter après une correction. Nous traiterons les erreurs attendues sans intercepter un défaut de programmation étranger au contrat.

## Exemple guidé 1

```python
def parser_quantite(texte):
    try:
        quantite = int(texte)
    except ValueError:
        raise ValueError("texte illisible")
    if quantite < 0:
        raise ValueError("quantité négative")
    return quantite


def montant_ligne(texte, prix):
    quantite = parser_quantite(texte)
    return quantite * prix

print(montant_ligne(" 3 ", 4))
try:
    montant_ligne("-2", 4)
except ValueError as erreur:
    print(str(erreur))
```

## Exemple guidé 2

```python
def parser_quantite(texte):
    try:
        quantite = int(texte)
    except ValueError:
        raise ValueError("texte illisible")
    if quantite < 0:
        raise ValueError("quantité négative")
    return quantite


def analyser(textes):
    valeurs = []
    erreurs = []
    for numero, texte in enumerate(textes, start=1):
        try:
            quantite = parser_quantite(texte)
        except ValueError as erreur:
            erreurs.append({"ligne": numero, "motif": str(erreur)})
        else:
            valeurs.append(quantite)
    return {"valeurs": valeurs, "erreurs": erreurs}

print(analyser(["0", "?", "-1", "2"]))
```
