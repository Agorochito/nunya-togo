---
{
  "id": "dom-m6-02",
  "title_fr": "Déboguer les écouteurs répétés et l’état oublié",
  "course": "javascript-dom",
  "module": "m6",
  "order": 17,
  "minutes": 20,
  "prerequisites": [
    "dom-m6-01"
  ],
  "outcomes": [
    "Installer les écouteurs une fois et rendre sans effet sur les branchements.",
    "Distinguer une modification d’état, son rendu et sa réinitialisation."
  ],
  "idea_fr": "Installer les écouteurs une fois et rendre sans effet sur les branchements.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Compteur fictif</h1><p id=\"total\" role=\"status\" aria-live=\"polite\">0</p><button id=\"plus\" type=\"button\" data-pas=\"1\">Ajouter</button></main>",
      "expected_output": "Trois clics donnent successivement 1, 2 et 3, sans accélération.",
      "trace_fr": [
        "L’écouteur est installé avant les actions, une seule fois.",
        "Chaque clic augmente la variable numérique d’une unité.",
        "rendre écrit seulement la valeur actuelle."
      ],
      "browser_test": {
        "description_fr": "Trois incréments réguliers",
        "checks": [
          {
            "selector": "#total",
            "text": "0"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "2"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "3"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Aperçu fictif</h1><label for=\"saisie\">Texte</label><input id=\"saisie\" value=\"\"><p id=\"apercu\"></p><p id=\"modifications\" role=\"status\" aria-live=\"polite\">0</p><button id=\"rafraichir\" type=\"button\">Rafraîchir</button></main>",
      "expected_output": "Après deux rafraîchissements, saisir A puis AB donne exactement 1 puis 2 modifications.",
      "trace_fr": [
        "Le rafraîchissement n’installe aucun écouteur.",
        "Seul input augmente modifications.",
        "Le même rendu actualise aperçu et compteur."
      ],
      "browser_test": {
        "description_fr": "Rafraîchir puis saisir",
        "checks": [
          {
            "selector": "#modifications",
            "text": "0"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#rafraichir",
            "checks": [
              {
                "selector": "#modifications",
                "text": "0"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#rafraichir",
            "checks": [
              {
                "selector": "#modifications",
                "text": "0"
              }
            ]
          },
          {
            "action": "input",
            "selector": "#saisie",
            "checks": [
              {
                "selector": "#apercu",
                "text": "A"
              },
              {
                "selector": "#modifications",
                "text": "1"
              }
            ],
            "value": "A"
          },
          {
            "action": "input",
            "selector": "#saisie",
            "checks": [
              {
                "selector": "#apercu",
                "text": "AB"
              },
              {
                "selector": "#modifications",
                "text": "2"
              }
            ],
            "value": "AB"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer un écouteur anonyme dans chaque rendu",
      "why_fr": "Plusieurs fonctions réagissent à la même action.",
      "fix_fr": "Installe le gestionnaire une fois hors du rendu."
    },
    {
      "error": "Corriger uniquement textContent lors d’un retour initial",
      "why_fr": "La variable repart de son ancienne valeur au clic suivant.",
      "fix_fr": "Réinitialise la donnée puis rends cette donnée."
    }
  ],
  "quiz": [
    {
      "question": "Deux flèches identiques écrites dans deux appels sont-elles la même fonction ?",
      "options": [
        "Non, ce sont deux objets fonction distincts.",
        "Oui, leur texte identique les fusionne toujours.",
        "Uniquement si elles écoutent click."
      ],
      "answer": 0,
      "explanation": "Les réinscrire à chaque rendu peut donc empiler des gestionnaires.",
      "id": "dom-m6-02-q1"
    },
    {
      "question": "Que doit faire une fonction qui rafraîchit seulement la vue ?",
      "options": [
        "Réinitialiser toutes les variables.",
        "Ajouter une nouvelle flèche pour chaque bouton.",
        "Présenter l’état actuel sans le changer ni ajouter d’écouteur."
      ],
      "answer": 2,
      "explanation": "Séparer ces responsabilités évite les actions multiples et les pertes d’état.",
      "id": "dom-m6-02-q2"
    },
    {
      "question": "Quel test révèle une réinitialisation seulement visuelle ?",
      "options": [
        "Changer le titre de la page.",
        "Réinitialiser puis incrémenter à nouveau.",
        "Regarder seulement la valeur juste après réinitialisation."
      ],
      "answer": 1,
      "explanation": "La reprise utilise la variable réelle et révèle une quantité ancienne restée en mémoire.",
      "id": "dom-m6-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "écouteur",
      "definition": "Fonction inscrite pour réagir à un type d’événement."
    },
    {
      "term": "identité de fonction",
      "definition": "Fait que deux références désignent le même objet fonction."
    },
    {
      "term": "état",
      "definition": "Données en mémoire dont la vue représente la valeur actuelle."
    }
  ],
  "recap_fr": [
    "Installer les écouteurs une fois et rendre sans effet sur les branchements.",
    "Distinguer une modification d’état, son rendu et sa réinitialisation.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "écouteur",
    "identité de fonction",
    "état"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — addEventListener",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — currentTarget",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Event/currentTarget",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — fonctions fléchées",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un compteur qui avance de un au premier clic puis de deux au suivant donne un indice : une action utilisateur déclenche peut-être plusieurs gestionnaires. Commence par une séquence courte et reproductible, en notant la valeur initiale et le résultat après chaque clic. Un écran correct juste après l’ouverture ne montre pas ce problème. Il faut observer l’évolution, puis relire où les écouteurs sont installés.

addEventListener reçoit un type d’événement et une fonction. Si on lui redonne la même fonction, pour le même type et les mêmes paramètres de capture, le navigateur ne l’inscrit pas plusieurs fois. En revanche, deux fonctions anonymes créées lors d’appels différents sont des objets fonction distincts, même si leur texte se ressemble. Ajouter une nouvelle flèche dans rendre à chaque mise à jour peut donc empiler des gestionnaires. Chaque gestionnaire modifie alors le même état et peut en ajouter encore.

La réparation proposée est structurelle : installer les écouteurs une seule fois au démarrage, puis leur faire appeler une fonction de rendu qui ne fait qu’afficher l’état actuel. Le gestionnaire du clic augmente le nombre ; rendre copie ce nombre dans textContent. Cliquer ne recrée pas les branchements. Nous conservons les mêmes boutons dans le document : remplacer un bouton entier poserait une autre question, traitée avec une délégation ou un nouveau branchement raisonné.

Un second défaut ressemble à un souci d’affichage. Le bouton Valeur initiale remet le texte visible à zéro, mais le clic suivant repart d’une ancienne valeur. Le programme possède alors deux vérités : une variable numérique et un texte corrigé directement. Réinitialiser doit affecter la variable à la valeur initiale, puis appeler rendre. La valeur initiale vient du document fourni, pas forcément du nombre zéro. Cette distinction permet de transférer la correction à une autre fiche d’essai.

Le bouton Rafraîchir la vue a une autre responsabilité : réafficher l’état actuel sans le modifier et sans installer d’écouteurs. Une recherche ou un aperçu peut connaître la même erreur. Compte uniquement les événements input si telle est la règle annoncée ; écouter aussi change et compter les deux serait une décision différente, pas une preuve automatique de duplication. Les exercices envoient de véritables actions et précisent quel événement doit compter.

Après la réparation, vérifie des actions répétées, une remise à l’initial puis une nouvelle action. Essaie aussi un autre nombre initial et un autre pas d’incrément lu dans dataset. Les tests contrôlent le comportement obtenu ; la relecture explique pourquoi les branchements ne se multiplient plus. Cette page reste un laboratoire sans serveur : rafraîchir la vue conserve la variable de cet essai, tandis que lancer un nouvel essai recrée tout le document temporaire. Nunya sauvegarde ton code et ta progression, pas cette valeur de compteur.

## Exemple guidé 1

```javascript
const plus = document.querySelector('#plus');
let total = Number(document.querySelector('#total').textContent);
function rendre() { document.querySelector('#total').textContent = String(total); }
plus.addEventListener('click', () => { total += 1; rendre(); });
rendre();
```

## Exemple guidé 2

```javascript
const saisie = document.querySelector('#saisie');
let modifications = 0;
function rendre() {
  document.querySelector('#apercu').textContent = saisie.value;
  document.querySelector('#modifications').textContent = String(modifications);
}
saisie.addEventListener('input', () => { modifications += 1; rendre(); });
document.querySelector('#rafraichir').addEventListener('click', rendre);
rendre();
```

