---
{
  "id": "stat-m2-02",
  "title_fr": "Regrouper en classes et histogrammes",
  "course": "statistiques-python",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "stat-m2-01"
  ],
  "outcomes": [
    "Regrouper des valeurs continues en classes de même largeur.",
    "Dessiner un histogramme en texte et lire la forme d’une distribution."
  ],
  "idea_fr": "Quand presque toutes les valeurs sont différentes, on les range dans des intervalles, puis on compte : la forme de la série apparaît.",
  "analogy_fr": "Au marché, personne ne range les ignames gramme par gramme : on fait des tas de petites, de moyennes et de grosses, et l’on voit tout de suite quel tas domine.",
  "examples": [
    {
      "code": "trajets = [4, 7, 12, 13, 9, 22, 11, 14, 8, 10]\nlargeur = 5\nfor v in [4, 10, 13]:\n    print(v, \"→ classe\", (v // largeur) * largeur)",
      "expected_output": "4 → classe 0\n10 → classe 10\n13 → classe 10\n",
      "inputs": [],
      "trace_fr": [
        "La division entière donne le numéro de la classe.",
        "10 appartient à [10 ; 15[, pas à [5 ; 10[.",
        "On multiplie par la largeur pour retrouver la borne."
      ]
    },
    {
      "code": "from collections import Counter\n\ntrajets = [4, 7, 12, 13, 9, 22, 11, 14, 8, 10]\nlargeur = 5\neffectifs = Counter((v // largeur) * largeur for v in trajets)\nfor borne in range(0, max(trajets) + 1, largeur):\n    print(f\"{borne:>2}-{borne + largeur - 1:<2} | \" + \"#\" * effectifs[borne])",
      "expected_output": " 0-4  | #\n 5-9  | ###\n10-14 | #####\n15-19 | \n20-24 | #\n",
      "inputs": [],
      "trace_fr": [
        "Chaque trajet est compté dans sa classe.",
        "La classe 15-19 reste affichée, même vide.",
        "La plupart des élèves mettent entre 10 et 14 minutes."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier les classes vides",
      "why_fr": "Un trou dans la distribution disparaît.",
      "fix_fr": "Parcours toutes les bornes du minimum au maximum."
    },
    {
      "error": "Mettre une valeur frontière dans la classe du dessous",
      "why_fr": "Les effectifs sont décalés.",
      "fix_fr": "Une classe [a ; b[ contient a, pas b."
    },
    {
      "error": "Choisir une seule largeur sans essayer",
      "why_fr": "La forme peut être masquée.",
      "fix_fr": "Compare plusieurs largeurs."
    }
  ],
  "quiz": [
    {
      "question": "Avec une largeur de 10, dans quelle classe tombe 30 ?",
      "options": [
        "[20 ; 30[",
        "[30 ; 40[",
        "[25 ; 35[",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "30 // 10 * 10 = 30.",
      "id": "stat-m2-02-q1"
    },
    {
      "question": "Que suggère un histogramme à deux bosses ?",
      "options": [
        "Une erreur",
        "Deux groupes mélangés",
        "Une moyenne nulle",
        "Trop de classes"
      ],
      "answer": 1,
      "explanation": "Par exemple deux quartiers éloignés.",
      "id": "stat-m2-02-q2"
    },
    {
      "question": "Pour une distribution étirée vers la droite, quel indicateur de centre préférer ?",
      "options": [
        "La moyenne",
        "La médiane",
        "Le maximum",
        "L’étendue"
      ],
      "answer": 1,
      "explanation": "Les grandes valeurs tirent la moyenne.",
      "id": "stat-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "classe",
      "definition": "Intervalle [a ; b[ qui regroupe des valeurs."
    },
    {
      "term": "largeur",
      "definition": "Différence entre les bornes d’une classe."
    },
    {
      "term": "histogramme",
      "definition": "Barres collées dont la hauteur représente l’effectif de chaque classe."
    },
    {
      "term": "distribution",
      "definition": "Façon dont les valeurs se répartissent."
    }
  ],
  "recap_fr": [
    "Regrouper des valeurs continues en classes de même largeur.",
    "Dessiner un histogramme en texte et lire la forme d’une distribution.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "classe",
    "largeur",
    "histogramme",
    "distribution"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne, avec le module statistics de la bibliothèque standard. Les données (notes, ventes, relevés, enquêtes) sont fictives et inventées pour l’exercice.",
  "references": [
    {
      "title": "Python — collections.Counter",
      "url": "https://docs.python.org/fr/3/library/collections.html#collections.Counter"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    }
  ],
  "sources": [
    {
      "title": "Python — collections.Counter",
      "url": "https://docs.python.org/fr/3/library/collections.html#collections.Counter",
      "scope": "Compter des effectifs. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability",
      "scope": "Notions générales de statistique descriptive et de probabilités. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Pour une variable continue, comme la taille, le temps de trajet ou le montant d’un achat, presque toutes les valeurs sont différentes. Un tableau d’effectifs valeur par valeur serait aussi long que les données elles-mêmes. On regroupe donc les valeurs en classes, des intervalles de même largeur, puis on compte l’effectif de chaque classe.

Par convention, une classe s’écrit [a ; b[ : elle contient a mais pas b. Avec une largeur de 5 minutes, les classes de temps de trajet sont [0 ; 5[, [5 ; 10[, [10 ; 15[, et ainsi de suite. Un trajet de 10 minutes tombe dans [10 ; 15[, pas dans [5 ; 10[. En Python, la borne inférieure de la classe d’une valeur v se calcule avec une division entière : (v // largeur) * largeur. Pour v = 13 et une largeur de 5, on obtient 10.

Le choix de la largeur compte. Des classes trop larges écrasent l’information : avec une seule classe de 0 à 60 minutes, on ne voit rien. Des classes trop étroites dispersent les effectifs : chaque classe contient zéro ou un élève, et la forme disparaît. On essaie souvent plusieurs largeurs. Une règle simple de départ consiste à viser entre 5 et 15 classes.

Il faut aussi garder les classes vides entre le minimum et le maximum. Si personne ne met entre 25 et 30 minutes, l’absence de barre à cet endroit est une information : elle peut révéler deux groupes distincts, ceux qui habitent près et ceux qui viennent d’un autre quartier.

L’histogramme représente chaque classe par une barre de hauteur proportionnelle à son effectif, les barres étant collées puisque les classes se suivent. En texte, on peut le dessiner avec un caractère répété : "#" * effectif. Ce dessin rudimentaire suffit pour voir la forme de la distribution. Une forme en cloche, symétrique autour du centre, est fréquente pour des mesures comme les tailles. Une forme étirée vers la droite est typique des revenus ou des montants d’achat : beaucoup de petites valeurs et quelques très grandes. Deux bosses signalent souvent deux populations mélangées.

La forme guide le choix des indicateurs : pour une distribution en cloche, moyenne et écart-type décrivent bien la série ; pour une distribution étirée, médiane et quartiles sont plus fidèles. Regarder un histogramme avant de calculer est une habitude des bons analystes.

## Exemple guidé 1

```python
trajets = [4, 7, 12, 13, 9, 22, 11, 14, 8, 10]
largeur = 5
for v in [4, 10, 13]:
    print(v, "→ classe", (v // largeur) * largeur)
```

Affichage attendu :

    4 → classe 0
    10 → classe 10
    13 → classe 10

Trace :

- La division entière donne le numéro de la classe.
- 10 appartient à [10 ; 15[, pas à [5 ; 10[.
- On multiplie par la largeur pour retrouver la borne.

## Exemple guidé 2

```python
from collections import Counter

trajets = [4, 7, 12, 13, 9, 22, 11, 14, 8, 10]
largeur = 5
effectifs = Counter((v // largeur) * largeur for v in trajets)
for borne in range(0, max(trajets) + 1, largeur):
    print(f"{borne:>2}-{borne + largeur - 1:<2} | " + "#" * effectifs[borne])
```

Affichage attendu :

     0-4  | #
     5-9  | ###
    10-14 | #####
    15-19 | 
    20-24 | #

Trace :

- Chaque trajet est compté dans sa classe.
- La classe 15-19 reste affichée, même vide.
- La plupart des élèves mettent entre 10 et 14 minutes.

## Vérifier et expliquer

Dessine l’histogramme des trajets de l’exemple avec une largeur de 3, puis de 10, et compare.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — collections.Counter](https://docs.python.org/fr/3/library/collections.html#collections.Counter)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
