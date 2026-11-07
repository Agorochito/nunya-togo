---
{
  "id": "dom-m2-03",
  "title_fr": "Comprendre la cible et déléguer les clics",
  "course": "javascript-dom",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "dom-m2-02"
  ],
  "outcomes": [
    "Distinguer target de currentTarget pendant un événement.",
    "Retrouver une commande avec closest et vérifier sa présence dans la zone avec contains."
  ],
  "idea_fr": "Un écouteur sur une zone peut traiter ses commandes, à condition de retrouver et contrôler la cible pertinente.",
  "analogy_fr": "L’accueil reçoit une demande venue d’une personne : le lieu de réception et l’origine de la demande sont distincts.",
  "examples": [
    {
      "fixture_html": "<main><section id=\"zone\"><button id=\"bouton\" type=\"button\"><span id=\"mot\">Lire</span></button></section><p id=\"trace\">Aucun clic</p></main>",
      "expected_output": "Cliquer sur le mot donne « zone / mot » ; cliquer directement le bouton donne « zone / bouton ».",
      "trace_fr": [
        "Ligne 1 : zone référence le conteneur.",
        "Ligne 2 : l’écouteur est enregistré sur cette zone.",
        "Premier clic sur #mot, ligne 3 : l’origine porte id=mot.",
        "Ligne 4 : currentTarget reste la zone qui porte l’écouteur.",
        "Ligne 5 : les deux identifiants sont affichés ; le clic sur #bouton change seulement le second."
      ],
      "browser_test": {
        "description_fr": "Origine et écouteur distincts",
        "checks": [
          {
            "selector": "#trace",
            "text": "Aucun clic"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#mot",
            "checks": [
              {
                "selector": "#trace",
                "text": "zone / mot"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#bouton",
            "checks": [
              {
                "selector": "#trace",
                "text": "zone / bouton"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><section data-choix=\"Extérieur\"><div id=\"choix\"><p id=\"fond\">Zone de choix</p><button id=\"lecture\" type=\"button\" data-choix=\"Lecture\"><span id=\"icone\">Livre</span></button><button id=\"jardin\" type=\"button\" data-choix=\"Jardin\">Graine</button></div></section><p id=\"resultat\">Aucun choix</p></main>",
      "expected_output": "Cliquer sur Livre choisit Lecture ; cliquer sur le fond conserve Lecture ; cliquer sur Graine choisit Jardin.",
      "trace_fr": [
        "Lignes 1–2 : une seule fonction écoute la zone des choix.",
        "Clic sur #icone, ligne 3 : closest remonte du span au bouton Lecture.",
        "Ligne 4 : le bouton appartient bien à la zone.",
        "Ligne 5 : le titre de commande est affiché.",
        "Clic sur #fond : closest trouve la section extérieure ; contains la refuse.",
        "Clic sur #jardin : le bouton lui-même correspond et Jardin est affiché."
      ],
      "browser_test": {
        "description_fr": "Délégation et garde de périmètre",
        "checks": [
          {
            "selector": "#resultat",
            "text": "Aucun choix"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#icone",
            "checks": [
              {
                "selector": "#resultat",
                "text": "Lecture"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#fond",
            "checks": [
              {
                "selector": "#resultat",
                "text": "Lecture"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#jardin",
            "checks": [
              {
                "selector": "#resultat",
                "text": "Jardin"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Lire uniquement target.dataset",
      "why_fr": "Un enfant décoratif ne porte pas la donnée.",
      "fix_fr": "Retrouve la commande avec closest."
    },
    {
      "error": "Oublier contains",
      "why_fr": "Un ancêtre extérieur peut correspondre.",
      "fix_fr": "Refuse la commande si elle n’appartient pas à la zone."
    },
    {
      "error": "Traiter tous les clics comme commandes",
      "why_fr": "Le fond doit rester sans effet.",
      "fix_fr": "Quitte la fonction avant toute mutation quand aucune commande valide n’est trouvée."
    }
  ],
  "quiz": [
    {
      "question": "Un span dans un bouton est cliqué ; l’écouteur est sur la zone. Que désigne currentTarget ?",
      "options": [
        "Toujours le span.",
        "Toujours le premier bouton du document.",
        "La zone portant l’écouteur en cours."
      ],
      "answer": 2,
      "explanation": "currentTarget décrit le lieu d’exécution de l’écouteur.",
      "id": "dom-m2-03-q1"
    },
    {
      "question": "Que cherche closest(\"[data-action]\") ?",
      "options": [
        "Uniquement ses frères suivants.",
        "Le premier élément correspondant parmi lui-même puis ses ancêtres.",
        "Tous ses enfants correspondants."
      ],
      "answer": 1,
      "explanation": "La recherche remonte et peut dépasser le conteneur voulu.",
      "id": "dom-m2-03-q2"
    },
    {
      "question": "Pourquoi vérifier zone.contains(commande) ?",
      "options": [
        "Pour refuser une correspondance trouvée hors de la zone.",
        "Pour désactiver tous les boutons de la page.",
        "Pour empêcher toute remontée d’événement."
      ],
      "answer": 0,
      "explanation": "La garde limite l’action à la zone ; elle ne modifie pas la propagation.",
      "id": "dom-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "target",
      "definition": "Cible d’origine de l’événement dans ces documents simples."
    },
    {
      "term": "currentTarget",
      "definition": "Élément dont l’écouteur est en cours d’exécution."
    },
    {
      "term": "délégation",
      "definition": "Traitement des commandes enfants par un écouteur sur une zone commune."
    },
    {
      "term": "closest",
      "definition": "Recherche d’une correspondance sur un élément puis ses ancêtres."
    },
    {
      "term": "contains",
      "definition": "Test d’appartenance d’un nœud à un conteneur, inclusif."
    }
  ],
  "recap_fr": [
    "Distinguer target de currentTarget pendant un événement.",
    "Retrouver une commande avec closest et vérifier sa présence dans la zone avec contains.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "target",
    "currentTarget",
    "délégation",
    "closest",
    "contains"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — target",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Event/target",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — currentTarget",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Event/currentTarget",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — closest",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/closest",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — contains",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Node/contains",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Lorsqu’un clic touche un span placé dans un bouton, l’événement peut remonter vers les ancêtres du span. Un écouteur enregistré sur le conteneur peut donc recevoir ce clic. Le navigateur fournit à la fonction un objet événement. Son nom de paramètre est libre ; nous choisissons evenement. Cet objet décrit notamment l’origine du signal et l’élément dont l’écouteur est actuellement en train de s’exécuter.

evenement.target désigne la cible d’origine dans nos documents simples : le span si l’on clique son texte, le bouton si l’on clique sa surface. evenement.currentTarget désigne l’élément qui porte l’écouteur en cours, donc le conteneur dans le premier exemple. Ce sont des références DOM, pas des identifiants ; on lit leur propriété id pour produire une trace. Ces deux valeurs peuvent être différentes sans qu’aucune erreur se soit produite.

La délégation consiste à installer un écouteur sur une zone commune, puis à reconnaître la commande concernée à partir de la cible. Lire directement evenement.target.dataset.atelier est fragile : l’attribut appartient au bouton et peut manquer sur son enfant. La méthode closest("[data-atelier]") cherche d’abord sur l’élément lui-même, puis remonte ses ancêtres jusqu’à trouver une correspondance. Elle retourne l’élément trouvé, ou null si elle n’en trouve pas.

Cette remontée ne s’arrête pas toute seule à notre zone de travail. Un ancêtre extérieur pourrait porter le même attribut. Vérifie donc que la commande existe puis que zone.contains(commande) vaut true. Sinon, return quitte la fonction sans effet. contains est inclusif : un élément se contient lui-même. Nos zones ne portent pas l’attribut de commande ; seuls leurs boutons utiles le portent. Dans les exemples, les cibles des clics sont des éléments du document.

Le fond d’une zone reste aussi cliquable. Il peut ne correspondre à aucune commande, ce qui est normal et doit laisser l’interface intacte. Un bouton extérieur ne doit pas agir sur l’état local. Ces cas justifient les retours précoces : la fonction commence par reconnaître les événements qu’elle sait traiter, puis seulement elle lit les données ou modifie l’état. Éviter une erreur ne suffit pas ; il faut également éviter une action sur la mauvaise rubrique.

Une fois la commande validée, ses données alimentent les calculs habituels. data-action peut distinguer choisir et effacer ; data-titre fournit le titre à afficher. Le compteur et le dernier choix restent des variables d’état, présentées par une fonction de rendu. Il n’est pas nécessaire d’ajouter un écouteur à chaque span ou d’utiliser son texte comme identifiant. Les éléments imbriqués servent à la présentation ; le bouton porte la commande.

Trace d’abord target et currentTarget, puis teste un clic sur un enfant, sur un bouton, sur le fond et à l’extérieur. Change aussi l’ordre des actions. Les exercices gardent une structure HTML complète dans chaque fixture. Ils n’ajoutent pas encore de nouveaux éléments et ne bloquent pas la propagation : comprendre le trajet du clic et filtrer sa commande suffit pour ces interfaces.

## Exemple guidé 1

```javascript
const zone = document.querySelector("#zone"); // 1
zone.addEventListener("click", function (evenement) { // 2
  const origine = evenement.target.id; // 3
  const ecoute = evenement.currentTarget.id; // 4
  document.querySelector("#trace").textContent = ecoute + " / " + origine; // 5
});
```

Résultat attendu dans la page : Cliquer sur le mot donne « zone / mot » ; cliquer directement le bouton donne « zone / bouton ».

Trace :

- Ligne 1 : zone référence le conteneur.
- Ligne 2 : l’écouteur est enregistré sur cette zone.
- Premier clic sur #mot, ligne 3 : l’origine porte id=mot.
- Ligne 4 : currentTarget reste la zone qui porte l’écouteur.
- Ligne 5 : les deux identifiants sont affichés ; le clic sur #bouton change seulement le second.

## Exemple guidé 2

```javascript
const zone = document.querySelector("#choix"); // 1
zone.addEventListener("click", function (evenement) { // 2
  const commande = evenement.target.closest("[data-choix]"); // 3
  if (!commande || !zone.contains(commande)) { return; } // 4
  document.querySelector("#resultat").textContent = commande.dataset.choix; // 5
});
```

Résultat attendu dans la page : Cliquer sur Livre choisit Lecture ; cliquer sur le fond conserve Lecture ; cliquer sur Graine choisit Jardin.

Trace :

- Lignes 1–2 : une seule fonction écoute la zone des choix.
- Clic sur #icone, ligne 3 : closest remonte du span au bouton Lecture.
- Ligne 4 : le bouton appartient bien à la zone.
- Ligne 5 : le titre de commande est affiché.
- Clic sur #fond : closest trouve la section extérieure ; contains la refuse.
- Clic sur #jardin : le bouton lui-même correspond et Jardin est affiché.

