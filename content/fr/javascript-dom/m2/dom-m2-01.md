---
{
  "id": "dom-m2-01",
  "title_fr": "Déclencher une action au clic et conserver son contexte",
  "course": "javascript-dom",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "dom-m1-03"
  ],
  "outcomes": [
    "Enregistrer une fonction avec addEventListener sans l’appeler immédiatement.",
    "Utiliser une fermeture pour retrouver les références et l’état entre deux clics."
  ],
  "idea_fr": "Un écouteur prépare une réaction future ; sa fonction garde accès au contexte dans lequel elle a été créée.",
  "analogy_fr": "Préparer une consigne pour une personne à l’accueil ne l’exécute pas : la demande doit encore arriver.",
  "examples": [
    {
      "fixture_html": "<main><button id=\"annoncer\" type=\"button\" data-message=\"Atelier prêt\">Annoncer</button><p id=\"message\">En attente</p></main>",
      "expected_output": "Au lancement : « En attente ». Après un clic sur Annoncer : « Atelier prêt » ; le clic suivant conserve ce message.",
      "trace_fr": [
        "Lignes 1–2 : les références vers le bouton et le paragraphe sont conservées.",
        "Ligne 3 : annonce reçoit la chaîne du dataset.",
        "Ligne 4 : la fonction est enregistrée sans exécuter sa ligne 5.",
        "Au premier clic, ligne 5 : la fermeture retrouve annonce et sortie.",
        "Au second clic : la même affectation écrit la même chaîne."
      ],
      "browser_test": {
        "description_fr": "L’enregistrement attend le clic",
        "checks": [
          {
            "selector": "#message",
            "text": "En attente"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#annoncer",
            "checks": [
              {
                "selector": "#message",
                "text": "Atelier prêt"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#annoncer",
            "checks": [
              {
                "selector": "#message",
                "text": "Atelier prêt"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><button id=\"basculer\" type=\"button\">Changer le mode</button><p id=\"mode\">Lecture</p></main>",
      "expected_output": "Le mode passe de Lecture à Discussion au premier clic, puis revient à Lecture au second.",
      "trace_fr": [
        "Lignes 1–2 : le bouton et la destination sont sélectionnés.",
        "Ligne 3 : discussion est initialisée une seule fois.",
        "Ligne 4 : le navigateur conserve la fonction pour les clics futurs.",
        "Premier clic, lignes 5–6 : false devient true et Discussion est écrit.",
        "Second clic, lignes 5–6 : true devient false et Lecture est écrit."
      ],
      "browser_test": {
        "description_fr": "État conservé par la fermeture",
        "checks": [
          {
            "selector": "#mode",
            "text": "Lecture"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#mode",
                "text": "Discussion"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#mode",
                "text": "Lecture"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Appeler lors de l’enregistrement",
      "why_fr": "Le message change avant l’action.",
      "fix_fr": "Passe une fonction sans parenthèses d’appel."
    },
    {
      "error": "Réinitialiser dans le clic",
      "why_fr": "Chaque action repart de la même valeur.",
      "fix_fr": "Initialise l’état une seule fois avant les écouteurs."
    },
    {
      "error": "Mélanger les destinations",
      "why_fr": "Deux boutons écrivent dans le même retour.",
      "fix_fr": "Associe leurs références dans une fonction de préparation."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi passer afficher plutôt que afficher() ?",
      "options": [
        "Pour exécuter la fonction deux fois.",
        "Pour transformer le bouton en chaîne.",
        "Pour transmettre la fonction et attendre le clic."
      ],
      "answer": 2,
      "explanation": "Les parenthèses appellent immédiatement la fonction.",
      "id": "dom-m2-01-q1"
    },
    {
      "question": "Où initialiser un booléen qui doit alterner entre plusieurs clics ?",
      "options": [
        "Uniquement dans le texte du bouton.",
        "Dans le contexte extérieur à la fonction de clic.",
        "Au début de chaque clic avec false."
      ],
      "answer": 1,
      "explanation": "Une variable extérieure peut conserver sa valeur entre les appels.",
      "id": "dom-m2-01-q2"
    },
    {
      "question": "Que permet une fermeture dans ces exemples ?",
      "options": [
        "Retrouver les références et variables du contexte de création.",
        "Sauvegarder automatiquement une inscription distante.",
        "Empêcher tous les événements du document."
      ],
      "answer": 0,
      "explanation": "Le contexte reste accessible à la fonction enregistrée.",
      "id": "dom-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "écouteur",
      "definition": "Fonction enregistrée pour réagir à un événement."
    },
    {
      "term": "événement click",
      "definition": "Signal produit par l’activation d’un élément comme un bouton."
    },
    {
      "term": "fermeture",
      "definition": "Accès d’une fonction aux variables de son contexte de création."
    },
    {
      "term": "état",
      "definition": "Valeur conservée qui décrit la situation actuelle de l’interface."
    }
  ],
  "recap_fr": [
    "Enregistrer une fonction avec addEventListener sans l’appeler immédiatement.",
    "Utiliser une fermeture pour retrouver les références et l’état entre deux clics.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "écouteur",
    "événement click",
    "fermeture",
    "état"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — addEventListener",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — Fermetures",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Closures",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Jusqu’ici, nos scripts modifiaient la page dès leur lancement. Une interface doit aussi réagir à une action ultérieure. La méthode bouton.addEventListener("click", fonction) enregistre une fonction à exécuter quand le bouton reçoit un événement click. Le navigateur continue ensuite son travail. Le paragraphe ne change donc pas pendant cet enregistrement ; il changera au moment où la fonction sera appelée par le navigateur.

Le deuxième argument doit être une fonction. Écrire addEventListener("click", afficher) transmet la fonction afficher. Écrire afficher() l’appelle immédiatement et transmet sa valeur de retour. Cette différence explique un défaut fréquent : le message apparaît avant le clic, puis le bouton semble ne rien faire. Une fonction anonyme, écrite directement dans l’appel, est également possible. Son corps reste en attente jusqu’à l’événement.

Une fonction peut retrouver les variables de l’endroit où elle a été créée : c’est une fermeture. Si le script sélectionne sortie et lit annonce avant d’enregistrer l’écouteur, la fonction pourra utiliser ces noms lors du clic. Une référence DOM désigne toujours le même élément ; une chaîne lue dans dataset constitue une valeur conservée. Changer ensuite la donnée source ne recalcule pas cette chaîne déjà copiée. Il faut choisir consciemment le moment où une information doit être lue.

Une variable déclarée avec let peut aussi garder un état entre deux appels. Dans le second exemple, discussion commence à false. Le premier clic l’inverse, puis le message devient Discussion. Au deuxième clic, la même variable devient false et le message redevient Lecture. Déclarer discussion à false à l’intérieur de la fonction la réinitialiserait à chaque clic ; le programme ne pourrait plus alterner correctement.

On peut fabriquer plusieurs petits comportements avec une fonction de préparation. Ses paramètres représentent un bouton et une destination. Chaque appel crée son propre contexte : l’écouteur du jardin écrit dans son retour, celui de la lecture dans le sien. Cela évite qu’une variable commune mal choisie fasse pointer tous les boutons vers la dernière destination. Les exercices changent les messages pour contrôler cette association, et pas seulement la présence d’un clic.

Utilise de vrais éléments button avec type="button". Ils portent déjà les comportements d’un bouton et évitent une soumission involontaire lorsqu’un formulaire apparaît autour d’eux. Il n’est pas nécessaire de rendre une div cliquable. Nous étudierons séparément la saisie, les formulaires et le clavier ; cette leçon porte uniquement sur l’enregistrement du clic et le contexte de la fonction.

Observe toujours la page avant la première action, après un clic, puis après un autre. Une valeur finale écrite directement au lancement peut imiter un seul résultat attendu. Elle ne reproduit pas une alternance ni des destinations indépendantes. Chaque essai repart de la fixture initiale : les états de cette petite interface sont temporaires et ne constituent aucune inscription réelle.

## Exemple guidé 1

```javascript
const bouton = document.querySelector("#annoncer"); // 1
const sortie = document.querySelector("#message"); // 2
const annonce = bouton.dataset.message; // 3
bouton.addEventListener("click", function () { // 4
  sortie.textContent = annonce; // 5
});
```

Résultat attendu dans la page : Au lancement : « En attente ». Après un clic sur Annoncer : « Atelier prêt » ; le clic suivant conserve ce message.

Trace :

- Lignes 1–2 : les références vers le bouton et le paragraphe sont conservées.
- Ligne 3 : annonce reçoit la chaîne du dataset.
- Ligne 4 : la fonction est enregistrée sans exécuter sa ligne 5.
- Au premier clic, ligne 5 : la fermeture retrouve annonce et sortie.
- Au second clic : la même affectation écrit la même chaîne.

## Exemple guidé 2

```javascript
const bouton = document.querySelector("#basculer"); // 1
const sortie = document.querySelector("#mode"); // 2
let discussion = false; // 3
bouton.addEventListener("click", function () { // 4
  discussion = !discussion; // 5
  sortie.textContent = discussion ? "Discussion" : "Lecture"; // 6
});
```

Résultat attendu dans la page : Le mode passe de Lecture à Discussion au premier clic, puis revient à Lecture au second.

Trace :

- Lignes 1–2 : le bouton et la destination sont sélectionnés.
- Ligne 3 : discussion est initialisée une seule fois.
- Ligne 4 : le navigateur conserve la fonction pour les clics futurs.
- Premier clic, lignes 5–6 : false devient true et Discussion est écrit.
- Second clic, lignes 5–6 : true devient false et Lecture est écrit.

