---
{
  "id": "htmi-m2-01",
  "title_fr": "Nommer les groupes de contrôles",
  "course": "html-intermediaire",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m1-03"
  ],
  "outcomes": [
    "Donner un contexte commun aux choix liés avec fieldset et legend.",
    "Distinguer un choix exclusif de plusieurs choix indépendants."
  ],
  "idea_fr": "Un groupe possède une question commune et chaque contrôle garde son propre libellé.",
  "analogy_fr": "Une feuille d’inscription distingue le titre de chaque question des réponses proposées dessous.",
  "examples": [
    {
      "code": "<form>\n  <fieldset id=\"atelier\">\n    <legend>Choisir un atelier</legend>\n    <label for=\"semis\">Semis</label>\n    <input id=\"semis\" type=\"radio\" name=\"atelier\" value=\"semis\">\n    <label for=\"compost\">Compost</label>\n    <input id=\"compost\" type=\"radio\" name=\"atelier\" value=\"compost\">\n  </fieldset>\n  <p>Exemple fictif, sans inscription.</p>\n  <button type=\"button\">Voir la démonstration</button>\n</form>\n",
      "expected_output": "Un groupe « Choisir un atelier » contient deux radios exclusives correctement nommées.",
      "trace_fr": [
        "Le fieldset pose la frontière du groupe ; son premier enfant legend fournit la question.",
        "Les deux radios partagent name=\"atelier\", mais leurs id et leurs value sont distincts.",
        "Les labels ciblent chaque radio ; le bouton ordinaire ne soumet aucune donnée."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Le groupe et ses deux réponses",
        "checks": [
          {
            "selector": "#atelier > legend:first-child",
            "textIncludes": "Choisir un atelier"
          },
          {
            "selector": "#atelier input[type=\"radio\"][name=\"atelier\"]",
            "count": 2
          },
          {
            "selector": "label[for=\"semis\"]",
            "textIncludes": "Semis"
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<form>\n  <fieldset id=\"materiel\">\n    <legend>Matériel à prévoir</legend>\n    <label for=\"gants\">Gants</label>\n    <input id=\"gants\" type=\"checkbox\" name=\"materiel\" value=\"gants\">\n    <label for=\"arrosoir\">Arrosoir</label>\n    <input id=\"arrosoir\" type=\"checkbox\" name=\"materiel\" value=\"arrosoir\">\n  </fieldset>\n</form>\n",
      "expected_output": "Deux cases à cocher indépendantes sont réunies sous la même question de matériel.",
      "trace_fr": [
        "legend nomme le sujet commun plutôt que chaque réponse.",
        "Chaque checkbox garde son libellé et sa valeur propre.",
        "Le nom partagé représente ici plusieurs réponses possibles ; aucun envoi n’est réalisé."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Deux réponses indépendantes",
        "checks": [
          {
            "selector": "#materiel > legend:first-child",
            "textIncludes": "Matériel à prévoir"
          },
          {
            "selector": "#materiel input[type=\"checkbox\"][name=\"materiel\"]",
            "count": 2
          },
          {
            "selector": "#arrosoir",
            "attributes": {
              "value": "arrosoir"
            }
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
      "error": "Confondre name et id",
      "why_fr": "Le premier regroupe les réponses, le second identifie un élément précis.",
      "fix_fr": "Partage name dans un groupe radio et garde chaque id unique."
    },
    {
      "error": "Utiliser la légende comme seul libellé",
      "why_fr": "La question est connue mais les réponses individuelles restent mal identifiées.",
      "fix_fr": "Associe un label à chaque contrôle."
    }
  ],
  "quiz": [
    {
      "question": "Quel rôle reste au label lorsqu’un fieldset possède une legend ?",
      "options": [
        "Nommer chaque contrôle particulier.",
        "Remplacer le name envoyé.",
        "Masquer les radios.",
        "Créer un second groupe obligatoire."
      ],
      "answer": 0,
      "explanation": "La légende donne le contexte commun ; chaque contrôle doit encore être nommé individuellement.",
      "id": "htmi-m2-01-q1"
    },
    {
      "question": "Deux questions radio distinctes doivent utiliser…",
      "options": [
        "Un id partagé par toutes les réponses.",
        "Un name différent pour chaque question.",
        "La même value pour tous les choix.",
        "Une unique legend hors des groupes."
      ],
      "answer": 1,
      "explanation": "Le name relie les radios exclusives d’une même question ; des questions indépendantes ont des noms différents.",
      "id": "htmi-m2-01-q2"
    },
    {
      "question": "Où placer la légende du groupe ?",
      "options": [
        "Après le formulaire.",
        "Dans chaque input.",
        "Comme premier enfant du fieldset.",
        "Dans un attribut CSS."
      ],
      "answer": 2,
      "explanation": "Cette place associe clairement la légende au groupe selon la structure HTML prévue.",
      "id": "htmi-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "fieldset",
      "definition": "Élément qui regroupe des contrôles liés par une question ou un objectif commun."
    },
    {
      "term": "legend",
      "definition": "Légende qui nomme le groupe représenté par son fieldset."
    },
    {
      "term": "choix exclusif",
      "definition": "Sélection où une seule réponse du groupe radio peut être active."
    }
  ],
  "recap_fr": [
    "La légende nomme la question commune.",
    "Chaque contrôle conserve un label et un id propre.",
    "Le name relie seulement les radios d’une même question."
  ],
  "tags": [
    "html",
    "m2",
    "intermédiaire"
  ],
  "environment_fr": "Aperçu isolé dans le navigateur, sans scripts élèves, réseau ni envoi de formulaire. Données fictives ; images SVG embarquées lorsqu’elles sont nécessaires. Les tests inspectent le DOM et les styles calculés aux dimensions indiquées.",
  "technical_checked_on": "2026-11-07",
  "sources": [
    {
      "title": "MDN — fieldset",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/fieldset",
      "scope": "Regroupement de contrôles et premier enfant legend."
    },
    {
      "title": "WHATWG — Formulaires",
      "url": "https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element",
      "scope": "Relation entre fieldset, legend et contrôles de formulaire."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Un formulaire devient difficile à comprendre lorsque plusieurs réponses courtes se suivent sans contexte. « Samedi », « Dimanche », « Découverte » et « Déjà pratiqué » ne forment pas une seule question. Le lecteur doit percevoir deux groupes : le jour souhaité et l’expérience au jardin. Une séparation visuelle peut aider, mais elle ne suffit pas à exprimer cette relation dans le document. fieldset rassemble les contrôles liés et legend donne leur question commune.

Place legend comme premier enfant du fieldset. Son texte doit être bref et décrire le choix demandé : « Jour préféré » est plus utile que « Groupe 1 ». Chaque réponse conserve ensuite un label associé à son input par for et id. La légende ne remplace pas ces libellés individuels. À l’inverse, répéter toute la question dans chaque label crée une lecture inutilement lourde. Le duo légende commune et réponses précises décrit les deux niveaux de sens.

Les boutons radio partagent le même name lorsqu’ils répondent à une question exclusive dans le même formulaire. Choisir l’un désélectionne l’autre. Leurs id restent distincts, car chaque label vise un contrôle particulier, et leurs value distinguent les réponses. Deux questions différentes utilisent des noms différents. Donner le même name au jour et au niveau relierait quatre radios à une seule sélection : changer de niveau pourrait alors effacer le jour choisi.

Les cases à cocher expriment des réponses indépendantes. On peut avoir besoin de gants et d’un arrosoir, ou d’aucun des deux. Les réunir dans un fieldset explique le sujet sans transformer leur comportement en choix exclusif. Plusieurs cases peuvent partager un name et porter des value différentes pour représenter une collection de réponses ; le traitement serveur éventuel dépendrait du système destinataire. Notre aperçu n’envoie rien et n’annonce aucune inscription effective.

Regrouper ne signifie pas entourer chaque champ d’un fieldset. Un champ isolé bien nommé n’a pas toujours besoin d’un groupe supplémentaire. Utilise cette structure lorsqu’une question commune rend plusieurs contrôles plus compréhensibles, notamment des radios dont les réponses seraient ambiguës seules. Évite aussi les légendes qui contiennent des paragraphes entiers : les explications complémentaires ont leur propre place, que la prochaine leçon sur les aides rendra explicite.

Dans les exemples, lis d’abord la légende puis chaque réponse, sans te fier à la bordure par défaut du navigateur. Les activités vérifient le regroupement, les noms partagés ou distincts et les associations de libellés. Elles ne démontrent pas à elles seules le comportement de tous les lecteurs d’écran. Une revue manuelle complète le contrôle : parcourir au clavier, comprendre la question entendue et reconnaître le caractère fictif de la page. Le bouton de démonstration utilise type="button", car aucune soumission n’est attendue.

## Exemple guidé 1

```html
<form>
  <fieldset id="atelier">
    <legend>Choisir un atelier</legend>
    <label for="semis">Semis</label>
    <input id="semis" type="radio" name="atelier" value="semis">
    <label for="compost">Compost</label>
    <input id="compost" type="radio" name="atelier" value="compost">
  </fieldset>
  <p>Exemple fictif, sans inscription.</p>
  <button type="button">Voir la démonstration</button>
</form>
```

## Exemple guidé 2

```html
<form>
  <fieldset id="materiel">
    <legend>Matériel à prévoir</legend>
    <label for="gants">Gants</label>
    <input id="gants" type="checkbox" name="materiel" value="gants">
    <label for="arrosoir">Arrosoir</label>
    <input id="arrosoir" type="checkbox" name="materiel" value="arrosoir">
  </fieldset>
</form>
```
