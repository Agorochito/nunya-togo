---
{
  "id": "htmi-m3-01",
  "title_fr": "Donner un titre et des en-têtes aux tableaux",
  "course": "html-intermediaire",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m2-03"
  ],
  "outcomes": [
    "Reconnaître des données tabulaires et nommer leur sujet avec caption.",
    "Associer les mesures aux en-têtes de colonnes et de lignes avec scope."
  ],
  "idea_fr": "Une valeur de tableau se comprend au croisement de sa ligne et de sa colonne.",
  "analogy_fr": "Une feuille de comptes conserve ses intitulés : le nombre 8 n’a de sens que si l’on sait quoi compter et pour quel atelier.",
  "examples": [
    {
      "code": "<table id=\"places\">\n  <caption>Places fictives des ateliers</caption>\n  <thead>\n    <tr><th scope=\"col\">Atelier</th><th scope=\"col\">Places</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Semis</td><td>8</td></tr>\n    <tr><td>Compost</td><td>4</td></tr>\n  </tbody>\n</table>\n",
      "expected_output": "Le sujet du tableau et les deux colonnes sont nommés.",
      "trace_fr": [
        "caption annonce que les places sont fictives.",
        "Les cellules th de thead portent scope=\"col\".",
        "Les deux lignes du corps conservent les paires Semis/8 et Compost/4."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Une grille simple nommée",
        "checks": [
          {
            "selector": "#places > caption",
            "textIncludes": "Places fictives des ateliers"
          },
          {
            "selector": "#places thead th[scope=\"col\"]",
            "count": 2
          },
          {
            "selector": "#places tbody tr",
            "count": 2
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<table id=\"places\">\n  <caption>Places fictives des ateliers</caption>\n  <thead>\n    <tr><th scope=\"col\">Atelier</th><th scope=\"col\">Places</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope=\"row\">Semis</th><td>8</td></tr>\n    <tr><th scope=\"row\">Compost</th><td>4</td></tr>\n  </tbody>\n</table>\n",
      "expected_output": "Chaque nombre possède maintenant un en-tête de ligne en plus de son en-tête de colonne.",
      "trace_fr": [
        "Semis et Compost deviennent des th scope=\"row\".",
        "Places reste un en-tête de colonne distinct des valeurs 8 et 4.",
        "La mise en gras éventuelle est un effet de présentation ; les scopes portent la relation."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Deux axes explicites",
        "checks": [
          {
            "selector": "#places tbody th[scope=\"row\"]",
            "count": 2
          },
          {
            "selector": "#places tbody tr:nth-child(1) th",
            "textIncludes": "Semis"
          },
          {
            "selector": "#places tbody tr:nth-child(2) td",
            "textIncludes": "4"
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Choisir th uniquement pour le gras",
      "why_fr": "Le choix sémantique ne peut pas être déduit d’un effet visuel.",
      "fix_fr": "Demande-toi quelles données la cellule nomme."
    },
    {
      "error": "Oublier le sujet de la grille",
      "why_fr": "Les axes ne suffisent pas toujours à comprendre ce qui est comparé.",
      "fix_fr": "Ajoute une caption précise."
    }
  ],
  "quiz": [
    {
      "question": "Que nomme caption ?",
      "options": [
        "Une colonne seulement.",
        "Le sujet du tableau.",
        "Le fichier CSS.",
        "Chaque valeur numérique."
      ],
      "answer": 1,
      "explanation": "La légende est associée au tableau entier ; les th nomment les axes.",
      "id": "htmi-m3-01-q1"
    },
    {
      "question": "Que signifie scope=\"row\" sur Semis ?",
      "options": [
        "Le texte est obligatoirement rouge.",
        "La cellule doit être déplacée en pied de page.",
        "Semis est l’en-tête de sa ligne.",
        "Toute la ligne est un formulaire."
      ],
      "answer": 2,
      "explanation": "Ce scope explicite la portée de l’en-tête pour les données de la ligne.",
      "id": "htmi-m3-01-q2"
    },
    {
      "question": "Un td placé dans thead devient-il automatiquement un en-tête ?",
      "options": [
        "Oui, dans tous les cas.",
        "Oui s’il est en gras.",
        "Oui s’il contient un nombre.",
        "Non, le rôle d’en-tête utilise th."
      ],
      "answer": 3,
      "explanation": "thead groupe les lignes ; th identifie les cellules d’en-tête.",
      "id": "htmi-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "caption",
      "definition": "Légende directement associée au tableau entier."
    },
    {
      "term": "scope",
      "definition": "Attribut qui indique la portée d’une cellule d’en-tête."
    },
    {
      "term": "donnée tabulaire",
      "definition": "Information dont le sens dépend de croisements cohérents entre lignes et colonnes."
    }
  ],
  "recap_fr": [
    "Un tableau sert à comparer des données selon des axes.",
    "caption nomme le sujet, th nomme les axes.",
    "scope distingue ici colonnes et lignes."
  ],
  "tags": [
    "html",
    "m3",
    "intermédiaire"
  ],
  "environment_fr": "Aperçu isolé dans le navigateur, sans scripts élèves, réseau ni envoi de formulaire. Données fictives ; images SVG embarquées lorsqu’elles sont nécessaires. Les tests inspectent le DOM et les styles calculés aux dimensions indiquées.",
  "technical_checked_on": "2026-11-07",
  "sources": [
    {
      "title": "WHATWG — Tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html",
      "scope": "caption, cellules d’en-tête, scope et associations id/headers."
    },
    {
      "title": "WAI — Tables Tutorial",
      "url": "https://www.w3.org/WAI/tutorials/tables/",
      "scope": "Choix de structures simples et associations explicites pour les données complexes."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Un tableau convient lorsque le lecteur compare des informations selon deux axes. Dans le programme du club, chaque ligne représente un atelier et chaque colonne une propriété, comme le jour ou le nombre de places. Le nombre 8 seul est ambigu ; « Semis, Places, 8 » porte un sens complet. Cette relation doit apparaître dans le HTML, sans dépendre de bordures, de couleurs ou d’un alignement obtenu avec des espaces.

Commence par caption, enfant du tableau, qui annonce son sujet. « Places fictives des ateliers » est plus informatif que « Tableau ». La légende aide à décider si cette grille contient la réponse recherchée. Elle ne remplace pas les en-têtes des colonnes, tout comme le titre d’un livre ne remplace pas les titres de ses chapitres. Une phrase placée à côté peut apporter un contexte, mais caption reste directement associé au tableau.

Utilise th pour une cellule d’en-tête et td pour une donnée. Le navigateur peut afficher th en gras ; ce rendu par défaut n’est pas la raison du choix. scope="col" indique qu’un en-tête porte sur sa colonne, scope="row" qu’il porte sur sa ligne. Le nom « Semis » peut donc être un en-tête de ligne, tandis que « Places » décrit une colonne de nombres. Le lecteur peut alors rattacher une donnée à ces deux axes.

thead rassemble les lignes d’en-tête et tbody les lignes de données. Ces éléments organisent le tableau mais n’attribuent pas à eux seuls le rôle d’en-tête à toutes leurs cellules. Un td dans thead reste un td. De même, rendre un mot gras dans le corps du tableau ne crée pas un th. La structure doit exprimer les relations avant que CSS choisisse la présentation.

Pour un petit tableau régulier, des en-têtes simples avec scope suffisent généralement ; il n’est pas utile d’ajouter partout des associations manuelles complexes. La prochaine leçon traitera les tableaux qui cumulent plusieurs niveaux d’intitulés. Avant cela, vérifie que la grille pourrait être simplifiée : une longue liste de coordonnées sans vraie comparaison ne mérite pas forcément un tableau, et un tableau ne doit pas servir à disposer les régions d’une page.

Les exemples gardent deux ateliers et des valeurs fictives pour rendre les croisements faciles à relire. Parcours une cellule en formulant mentalement ses intitulés : « Compost, Places, 4 ». Les tests vérifient caption, la distinction th/td, les scopes et la présence des données. Ils ne certifient pas l’annonce de chaque combinaison navigateur et lecteur d’écran. Une revue humaine doit encore contrôler l’ordre de lecture et la lisibilité lorsque l’espace est réduit. Conserver le tableau dans sa structure native est le point de départ de cette vérification.

## Exemple guidé 1

```html
<table id="places">
  <caption>Places fictives des ateliers</caption>
  <thead>
    <tr><th scope="col">Atelier</th><th scope="col">Places</th></tr>
  </thead>
  <tbody>
    <tr><td>Semis</td><td>8</td></tr>
    <tr><td>Compost</td><td>4</td></tr>
  </tbody>
</table>
```

## Exemple guidé 2

```html
<table id="places">
  <caption>Places fictives des ateliers</caption>
  <thead>
    <tr><th scope="col">Atelier</th><th scope="col">Places</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Semis</th><td>8</td></tr>
    <tr><th scope="row">Compost</th><td>4</td></tr>
  </tbody>
</table>
```
