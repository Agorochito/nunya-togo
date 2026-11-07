---
{
  "id": "dom-m3-03",
  "title_fr": "Préserver les commandes natives et orienter le focus",
  "course": "javascript-dom",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "dom-m3-02"
  ],
  "outcomes": [
    "Orienter le focus après une action explicite.",
    "Gérer une touche précise sans bloquer le clavier."
  ],
  "idea_fr": "Le focus indique la position active au clavier ; un déplacement programmé doit correspondre à une intention compréhensible.",
  "analogy_fr": "Le focus est le repère d’une visite : il aide à savoir où agir maintenant et où reprendre après une étape.",
  "examples": [
    {
      "fixture_html": "<main><button id=\"aller\" type=\"button\">Aller à la recherche</button><label for=\"recherche\">Recherche fictive</label><input id=\"recherche\" value=\"Semis\"><label for=\"autre\">Autre champ</label><input id=\"autre\"></main>",
      "expected_output": "Activer Aller à la recherche place le focus dans #recherche sans changer Semis.",
      "trace_fr": [
        "Le bouton est un contrôle natif.",
        "Son listener de clic vise le champ identifié.",
        "focus() déplace la position active sans réécrire la valeur.",
        "La suite de la saisie peut reprendre dans ce champ."
      ],
      "browser_test": {
        "description_fr": "Déplacer depuis un autre champ",
        "checks": [],
        "steps": [
          {
            "action": "focus",
            "selector": "#autre",
            "checks": [
              {
                "selector": "#autre",
                "focused": true
              }
            ]
          },
          {
            "action": "click",
            "selector": "#aller",
            "checks": [
              {
                "selector": "#recherche",
                "focused": true,
                "value": "Semis"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><label for=\"recherche\">Recherche fictive</label><input id=\"recherche\" value=\"Semis\"><p id=\"retour\" role=\"status\" aria-live=\"polite\">Recherche prête.</p></main>",
      "expected_output": "Escape efface le champ et annonce Recherche effacée. ; une autre touche ne déclenche pas ce traitement.",
      "trace_fr": [
        "keydown donne accès à key.",
        "La comparaison limite la commande à Escape.",
        "Le texte est vidé et un message précise l’effet.",
        "Le focus reste au bon endroit pour recommencer."
      ],
      "browser_test": {
        "description_fr": "Autre touche puis Escape",
        "checks": [],
        "steps": [
          {
            "action": "focus",
            "selector": "#recherche",
            "checks": []
          },
          {
            "action": "keydown",
            "selector": "#recherche",
            "key": "ArrowDown",
            "checks": [
              {
                "selector": "#recherche",
                "value": "Semis"
              }
            ]
          },
          {
            "action": "keydown",
            "selector": "#recherche",
            "key": "Escape",
            "checks": [
              {
                "selector": "#recherche",
                "value": "",
                "focused": true
              },
              {
                "selector": "#retour",
                "text": "Recherche effacée."
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Déplacer le focus à chaque caractère",
      "why_fr": "La personne perd sa position pendant l’écriture.",
      "fix_fr": "Réserve le déplacement à une action justifiée."
    },
    {
      "error": "Viser un paragraphe non focalisable",
      "why_fr": "L’appel ne fournit pas le résultat attendu.",
      "fix_fr": "Choisis un contrôle adapté ou une cible volontairement focalisable."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi utiliser un vrai button pour une commande ?",
      "options": [
        "Il évite d’écrire un texte visible.",
        "Il apporte des comportements natifs de focus et d’activation.",
        "Il interdit toutes les autres touches."
      ],
      "answer": 1,
      "explanation": "Un conteneur cliquable n’apporte pas automatiquement les mêmes services.",
      "id": "dom-m3-03-q1"
    },
    {
      "question": "Que fait focus() seul ?",
      "options": [
        "Il envoie le formulaire.",
        "Il rend toute balise visible même si elle est cachée.",
        "Il demande le focus, sans cliquer ni soumettre automatiquement."
      ],
      "answer": 2,
      "explanation": "La méthode concerne la position active, pas l’ensemble du comportement métier.",
      "id": "dom-m3-03-q2"
    },
    {
      "question": "Pourquoi ne pas effacer la recherche sur chaque keydown ?",
      "options": [
        "Les touches non réservées doivent garder leur usage normal.",
        "Escape ne peut jamais être détectée.",
        "Le clavier doit être désactivé dans une page."
      ],
      "answer": 0,
      "explanation": "Un raccourci explicite ne doit pas empêcher la saisie ou la navigation normale.",
      "id": "dom-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "focus",
      "definition": "Position active indiquant notamment où agit le clavier."
    },
    {
      "term": "keydown",
      "definition": "Événement associé à l’appui d’une touche."
    },
    {
      "term": "tabindex=-1",
      "definition": "Valeur permettant ici un focus programmé sans étape Tab supplémentaire."
    }
  ],
  "recap_fr": [
    "Orienter le focus après une action explicite.",
    "Gérer une touche précise sans bloquer le clavier.",
    "Conserver et vérifier les commandes natives."
  ],
  "tags": [
    "focus",
    "keydown",
    "tabindex=-1"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document isolé du navigateur. HTML fourni et état temporaire recréés à chaque essai ou test. Le code et la progression peuvent être sauvegardés, pas les changements temporaires de cette interface. Données fictives, sans réseau, compte, stockage réel ni module importé.",
  "sources": [
    {
      "title": "MDN — focus()",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — KeyboardEvent.key",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une interface qui réagit à la souris doit aussi offrir un parcours compréhensible au clavier. Les contrôles natifs donnent déjà des comportements utiles : un bouton peut recevoir le focus et être activé avec les commandes habituelles. Remplacer ce bouton par un div cliquable obligerait à reconstruire plusieurs de ces services. Dans cette leçon, le HTML fourni utilise donc de vrais boutons et des labels explicites.

La méthode focus() demande au navigateur de donner le focus à un élément qui peut le recevoir. Elle ne clique pas et ne soumet pas automatiquement un formulaire. Un champ ou un bouton est normalement concerné ; un paragraphe ordinaire ne devient pas focalisable parce que tu appelles sa méthode. Un titre portant tabindex="-1" peut être visé par programme sans ajouter une étape normale au parcours Tab. Cela peut aider après une action explicite qui ouvre une nouvelle étape de lecture.

Évite de déplacer le focus à chaque frappe ou à chaque petit rendu : la personne perdrait sa position pendant la saisie. Un déplacement doit servir une action annoncée, par exemple aller à la recherche, revenir au champ après une remise à zéro ou rejoindre le résumé demandé. En cas d’erreur, orienter vers le contrôle à corriger peut être utile, avec un message qui explique le problème. Le mouvement seul ne remplace pas ce texte.

Pour une commande particulière, keydown fournit un événement dont key indique la touche, comme "Escape". Compare cette valeur avant de modifier l’interface. Les autres touches doivent conserver leur effet habituel. preventDefault ne doit pas bloquer aveuglément Tab, les flèches ou toute la saisie. Ici Escape efface une recherche fictive, maintient le focus dans son champ et annonce ce qui a été fait ; cette convention est donnée dans la consigne.

Les tests de navigateur vérifient une touche explicitement gérée et les cibles de focus après des actions précises. Ils ne supposent pas qu’un simple événement de touche artificiel recrée tous les comportements natifs : la soumission est testée comme une demande de formulaire et les boutons comme des activations. Complète par un parcours manuel avec Tab, Maj+Tab, Entrée et Espace. Vérifie que le repère visuel du focus reste visible et qu’aucune boucle ne piège la navigation. Chaque essai repart du document fourni, sans enregistrement de ces valeurs fictives. Explique la raison de chaque déplacement et ce que les commandes non prises en charge continuent de faire normalement.

## Exemple guidé 1

```javascript
const aller = document.querySelector("#aller");
const recherche = document.querySelector("#recherche");
aller.addEventListener("click", function() { recherche.focus(); });
```

## Exemple guidé 2

```javascript
const recherche = document.querySelector("#recherche");
const retour = document.querySelector("#retour");
recherche.addEventListener("keydown", function(evenement) {
  if (evenement.key === "Escape") {
    evenement.preventDefault();
    recherche.value = "";
    retour.textContent = "Recherche effacée.";
    recherche.focus();
  }
});
```

