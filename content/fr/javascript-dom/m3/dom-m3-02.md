---
{
  "id": "dom-m3-02",
  "title_fr": "Traiter un formulaire sans perdre la saisie",
  "course": "javascript-dom",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "dom-m3-01"
  ],
  "outcomes": [
    "Traiter submit et empêcher explicitement son action native.",
    "Valider présence, type et bornes sans confondre leurs rôles."
  ],
  "idea_fr": "submit est l’événement de la demande de formulaire ; preventDefault permet un traitement local explicite et un retour compréhensible.",
  "analogy_fr": "La vérification locale ressemble à un accueil qui relit la fiche et explique ce qui manque avant de poursuivre.",
  "examples": [
    {
      "fixture_html": "<main><form id=\"inscription\" novalidate><label for=\"nom\">Prénom fictif</label><input id=\"nom\" aria-describedby=\"retour\"><button type=\"submit\">Vérifier la démonstration</button></form><p id=\"retour\" role=\"status\" aria-live=\"polite\">En attente.</p></main>",
      "expected_output": "Soumettre vide annonce Prénom requis. ; après la saisie Afi avec espaces extérieurs, la demande fictive affiche Afi.",
      "trace_fr": [
        "Le listener appartient au formulaire.",
        "preventDefault maintient ce traitement dans la page.",
        "trim révèle le cas vide ou fournit le nom nettoyé.",
        "Le message et aria-invalid suivent chaque nouvelle soumission."
      ],
      "browser_test": {
        "description_fr": "Erreur puis correction",
        "checks": [],
        "steps": [
          {
            "action": "submit",
            "selector": "#inscription",
            "checks": [
              {
                "selector": "#retour",
                "text": "Prénom requis."
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": "true"
                }
              }
            ]
          },
          {
            "action": "input",
            "selector": "#nom",
            "value": " Afi ",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#inscription",
            "checks": [
              {
                "selector": "#retour",
                "text": "Demande fictive : Afi"
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": "false"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><form id=\"quantite\" novalidate><label for=\"places\">Places de démonstration, entier de 1 à 4</label><input id=\"places\" inputmode=\"numeric\" aria-describedby=\"retour\"><button type=\"submit\">Vérifier</button></form><p id=\"retour\" role=\"status\" aria-live=\"polite\">En attente.</p></main>",
      "expected_output": "2.5 est refusé ; 4 est accepté comme borne supérieure et reste une quantité fictive.",
      "trace_fr": [
        "La lecture du texte précède la conversion numérique.",
        "Un nombre décimal échoue à Number.isInteger.",
        "La borne quatre est incluse dans la règle.",
        "Le retour ne crée aucune réservation."
      ],
      "browser_test": {
        "description_fr": "Décimale puis borne",
        "checks": [],
        "steps": [
          {
            "action": "input",
            "selector": "#places",
            "value": "2.5",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#quantite",
            "checks": [
              {
                "selector": "#retour",
                "text": "Choisis un entier de 1 à 4."
              }
            ]
          },
          {
            "action": "input",
            "selector": "#places",
            "value": "4",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#quantite",
            "checks": [
              {
                "selector": "#retour",
                "text": "Places fictives : 4"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Écouter seulement un clic de bouton",
      "why_fr": "D’autres modes de soumission peuvent être oubliés.",
      "fix_fr": "Écoute submit sur le formulaire."
    },
    {
      "error": "Conserver un succès malgré une nouvelle erreur",
      "why_fr": "Le retour ne décrit plus la dernière demande.",
      "fix_fr": "Remplace le message dans chaque chemin du traitement."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi écouter submit sur le form ?",
      "options": [
        "L’intention de soumission ne dépend pas seulement d’un clic sur son bouton.",
        "Pour supprimer tous les labels.",
        "Parce que submit envoie toujours un compte réel."
      ],
      "answer": 0,
      "explanation": "Le formulaire est la cible du traitement de la demande, quel que soit son mode d’activation.",
      "id": "dom-m3-02-q1"
    },
    {
      "question": "Que garantit preventDefault seul ?",
      "options": [
        "Une réservation réussie.",
        "L’action par défaut de cet événement est empêchée, pas la validité des données.",
        "Toutes les règles métier du destinataire."
      ],
      "answer": 1,
      "explanation": "Le programme doit encore vérifier et expliquer son propre résultat.",
      "id": "dom-m3-02-q2"
    },
    {
      "question": "Pourquoi tester le texte vide avant d’accepter un nombre ?",
      "options": [
        "Number rejette toujours les espaces.",
        "Un entier est forcément entre 1 et 4.",
        "Number du vide peut produire zéro sans réponse réelle."
      ],
      "answer": 2,
      "explanation": "Présence, type numérique et bornes sont des questions distinctes.",
      "id": "dom-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "soumission",
      "definition": "Intention de traiter les données d’un formulaire."
    },
    {
      "term": "action par défaut",
      "definition": "Comportement natif associé à un événement s’il n’est pas empêché."
    },
    {
      "term": "validation locale",
      "definition": "Vérification programmée ici dans la page isolée."
    }
  ],
  "recap_fr": [
    "Traiter submit et empêcher explicitement son action native.",
    "Valider présence, type et bornes sans confondre leurs rôles.",
    "Rendre un retour visible dépendant de la dernière demande."
  ],
  "tags": [
    "soumission",
    "action par défaut",
    "validation locale"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document isolé du navigateur. HTML fourni et état temporaire recréés à chaque essai ou test. Le code et la progression peuvent être sauvegardés, pas les changements temporaires de cette interface. Données fictives, sans réseau, compte, stockage réel ni module importé.",
  "sources": [
    {
      "title": "MDN — événement submit",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit_event",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une saisie en direct ne signifie pas encore qu’une demande a été présentée. Le formulaire possède une action native de soumission. Écouter submit sur le form permet de traiter cette intention, plutôt que d’écouter seulement le clic d’un bouton. Un formulaire peut aussi être soumis par certains gestes du clavier. Le traitement doit donc être attaché à l’élément qui représente la demande et rester indépendant du moyen d’activation.

evenement.preventDefault() empêche l’action par défaut de cette soumission, ici pour garder la démonstration locale. Cela ne valide pas les données et ne les enregistre pas. Après cet appel, ton code doit fournir le comportement annoncé : lire les contrôles, appliquer les règles et écrire un retour. Les HTML de cette leçon utilisent novalidate pour isoler les règles programmées dans les exercices. Cela désactive l’étape automatique de contraintes du navigateur, pas la nécessité d’expliquer et de vérifier les valeurs.

trim() produit une nouvelle chaîne sans espaces au début et à la fin. Une saisie composée seulement d’espaces devient donc vide. Relis la propriété dans le traitement de submit, puis nettoie la valeur à cet instant. Garder une chaîne lue au chargement ferait vérifier un ancien état. Les limites sont celles de la consigne ; elles ne forment pas une validation universelle de toutes les données possibles.

Pour une quantité entière, sépare présence et conversion. Number d’un texte vide peut donner zéro ; la règle doit donc conserver un test sur le texte nettoyé. Number.isInteger vérifie ensuite la forme numérique entière et les bornes vérifient la plage autorisée. Le message doit dire ce qu’il faut corriger. Un attribut aria-invalid peut signaler l’état du champ et le texte de retour reste visible. Les régions role=status et aria-live fournies dans les exemples préparent une annonce des changements sans déplacer le focus à chaque phrase.

Teste une demande refusée, une demande acceptée puis une nouvelle erreur. Le retour précédent ne doit pas survivre comme si la dernière saisie était encore correcte. Aucune requête réseau ni réservation n’est réalisée ; les noms et ateliers sont fictifs. Chaque essai reconstruit le document de départ. Les tests automatiques vérifient les textes et propriétés annoncés ; une vérification manuelle de la lecture et du clavier reste utile. Explique enfin la différence entre empêcher la navigation, vérifier une règle locale et soumettre réellement des données à un service, qui est hors de cette leçon.

## Exemple guidé 1

```javascript
const formulaire = document.querySelector("#inscription");
const nom = document.querySelector("#nom");
const retour = document.querySelector("#retour");
formulaire.addEventListener("submit", function(evenement) {
  evenement.preventDefault();
  const valeur = nom.value.trim();
  if (valeur === "") {
    nom.setAttribute("aria-invalid", "true");
    retour.textContent = "Prénom requis.";
    return;
  }
  nom.setAttribute("aria-invalid", "false");
  retour.textContent = "Demande fictive : " + valeur;
});
```

## Exemple guidé 2

```javascript
const formulaire = document.querySelector("#quantite");
const places = document.querySelector("#places");
const retour = document.querySelector("#retour");
formulaire.addEventListener("submit", function(evenement) {
  evenement.preventDefault();
  const texte = places.value.trim();
  const nombre = Number(texte);
  if (texte === "" || !Number.isInteger(nombre) || nombre < 1 || nombre > 4) {
    places.setAttribute("aria-invalid", "true");
    retour.textContent = "Choisis un entier de 1 à 4.";
    return;
  }
  places.setAttribute("aria-invalid", "false");
  retour.textContent = "Places fictives : " + String(nombre);
});
```

