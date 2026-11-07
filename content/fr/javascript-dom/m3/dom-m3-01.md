---
{
  "id": "dom-m3-01",
  "title_fr": "Réagir à la saisie et rendre un aperçu cohérent",
  "course": "javascript-dom",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "dom-m2-03"
  ],
  "outcomes": [
    "Relire une saisie à chaque événement input.",
    "Rendre un état initial, modifié puis vide."
  ],
  "idea_fr": "L’événement input signale une modification de saisie ; le rendu doit relire la valeur actuelle du contrôle.",
  "analogy_fr": "Un aperçu est un miroir du formulaire : il reflète la valeur présente, pas une photographie prise avant la saisie.",
  "examples": [
    {
      "fixture_html": "<main><label for=\"nom\">Prénom fictif</label><input id=\"nom\" value=\"\"><p id=\"apercu\" aria-live=\"polite\">Aperçu en attente.</p></main>",
      "expected_output": "L’aperçu commence avec son invitation ; saisir Afi puis Mina affiche successivement Bonjour Afi et Bonjour Mina.",
      "trace_fr": [
        "La fonction rendre lit la valeur courante du champ.",
        "Son appel initial fournit le message du cas vide.",
        "Chaque événement input rappelle cette fonction.",
        "textContent transmet la saisie comme texte."
      ],
      "browser_test": {
        "description_fr": "Deux saisies changent réellement le message",
        "checks": [
          {
            "selector": "#apercu",
            "text": "Ton prénom apparaîtra ici."
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#nom",
            "value": "Afi",
            "checks": [
              {
                "selector": "#apercu",
                "text": "Bonjour Afi"
              }
            ]
          },
          {
            "action": "input",
            "selector": "#nom",
            "value": "Mina",
            "checks": [
              {
                "selector": "#apercu",
                "text": "Bonjour Mina"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><label for=\"texte\">Texte de démonstration</label><textarea id=\"texte\">Semer</textarea><p id=\"compteur\" aria-live=\"polite\"></p></main>",
      "expected_output": "Le compteur vaut 5 / 40 pour Semer, puis 0 / 40 quand on efface et 7 / 40 pour Arroser.",
      "trace_fr": [
        "La saisie préremplie possède cinq unités dans cet exemple.",
        "Le rendu initial lit la propriété value.",
        "Effacer puis écrire rappelle le même calcul.",
        "Le compteur n’enregistre aucun texte."
      ],
      "browser_test": {
        "description_fr": "Le compteur suit les valeurs simples",
        "checks": [
          {
            "selector": "#compteur",
            "text": "5 / 40"
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#texte",
            "value": "",
            "checks": [
              {
                "selector": "#compteur",
                "text": "0 / 40"
              }
            ]
          },
          {
            "action": "input",
            "selector": "#texte",
            "value": "Arroser",
            "checks": [
              {
                "selector": "#compteur",
                "text": "7 / 40"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Garder une valeur lue trop tôt",
      "why_fr": "La chaîne ne change plus alors que le champ évolue.",
      "fix_fr": "Relis la propriété dans la fonction appelée."
    },
    {
      "error": "Écrire du HTML depuis la saisie",
      "why_fr": "Le texte peut être interprété comme structure.",
      "fix_fr": "Utilise textContent pour un aperçu textuel."
    }
  ],
  "quiz": [
    {
      "question": "Quand relire champ.value pour suivre la saisie ?",
      "options": [
        "Une seule fois avant tous les événements.",
        "Jamais, le DOM remplit une variable texte automatiquement.",
        "Dans le traitement rappelé par l’événement."
      ],
      "answer": 2,
      "explanation": "Une variable contenant l’ancienne chaîne ne suit pas seule la propriété du contrôle.",
      "id": "dom-m3-01-q1"
    },
    {
      "question": "Quelle propriété lit l’état d’une checkbox ?",
      "options": [
        "checked.",
        "textContent du champ.",
        "La longueur du label."
      ],
      "answer": 0,
      "explanation": "checked fournit un booléen ; la valeur textuelle du contrôle a un autre rôle.",
      "id": "dom-m3-01-q2"
    },
    {
      "question": "Pourquoi préférer textContent pour cet aperçu ?",
      "options": [
        "Il transforme chaque texte en fichier.",
        "La saisie doit rester du texte sans créer de balises.",
        "Il envoie automatiquement la saisie."
      ],
      "answer": 1,
      "explanation": "La méthode choisie doit respecter l’intention textuelle et le périmètre local.",
      "id": "dom-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "input",
      "definition": "Événement signalant ici une modification de saisie."
    },
    {
      "term": "aperçu",
      "definition": "Présentation temporaire dérivée de valeurs courantes."
    },
    {
      "term": "checked",
      "definition": "Propriété booléenne d’état d’une case ou d’un bouton radio."
    }
  ],
  "recap_fr": [
    "Relire une saisie à chaque événement input.",
    "Rendre un état initial, modifié puis vide.",
    "Préserver les saisies comme textes littéraux."
  ],
  "tags": [
    "input",
    "aperçu",
    "checked"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document isolé du navigateur. HTML fourni et état temporaire recréés à chaque essai ou test. Le code et la progression peuvent être sauvegardés, pas les changements temporaires de cette interface. Données fictives, sans réseau, compte, stockage réel ni module importé.",
  "sources": [
    {
      "title": "MDN — événement input",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/input_event",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

La page de l’association fictive propose un aperçu de présentation. Lorsqu’une personne écrit son prénom, la phrase affichée doit évoluer sans attendre un bouton. L’événement input permet d’être averti des modifications de saisie. Le navigateur déclenche cet événement pendant l’interaction avec un champ adapté. Ton programme écoute le contrôle, relit sa propriété value et met à jour un texte de la page.

La valeur HTML de départ et la valeur actuelle ne sont pas le même instant. Lire champ.value avant de créer l’écouteur puis conserver ce texte ne suffit pas : la variable ne se met pas à jour par magie. Place la lecture à l’intérieur d’une fonction appelée lors de l’événement. Tu peux aussi appeler cette même fonction une fois au démarrage pour rendre l’aperçu cohérent avec une valeur préremplie. L’écouteur reste enregistré une seule fois dans ces exemples.

textContent convient pour transmettre la saisie à un aperçu textuel. Un texte contenant des signes inférieur et supérieur doit rester un texte, pas devenir une balise. Construire une chaîne HTML à partir de la saisie changerait le sens du contenu et pourrait créer des éléments inattendus. Les exercices vérifient donc des textes littéraux ainsi que l’absence d’éléments qui ne devraient jamais être créés. Aucune donnée personnelle réelle n’est nécessaire.

Un contrôle ne se lit pas toujours avec value. Pour une case à cocher, checked indique un booléen : true si elle est cochée, false sinon. Un clic natif peut modifier cette propriété et produire un événement input. Le message associé doit refléter les deux états. Pour un champ textuel, value.length mesure des unités de texte JavaScript ; nos exemples de compteur utilisent des mots simples. Ce nombre n’est pas une règle universelle de comptage des symboles complexes ou des caractères perçus.

Lis l’état initial puis saisis deux valeurs différentes et efface tout. Un rendu correct doit suivre chacune de ces étapes, y compris le retour à une valeur vide. Le code modifiant value lui-même ne déclenche pas automatiquement un événement input : appelle la fonction de rendu si ton propre programme change une valeur. Chaque essai crée une nouvelle page isolée et ses valeurs de départ. L’aperçu n’est ni un enregistrement ni une inscription ; seuls ton code et ta progression peuvent être conservés par Nunya. Explique enfin quel événement est écouté, quelle propriété est relue et quel texte est réellement affiché.

## Exemple guidé 1

```javascript
const champ = document.querySelector("#nom");
const apercu = document.querySelector("#apercu");
function rendre() {
  if (champ.value === "") { apercu.textContent = "Ton prénom apparaîtra ici."; }
  else { apercu.textContent = "Bonjour " + champ.value; }
}
champ.addEventListener("input", rendre);
rendre();
```

## Exemple guidé 2

```javascript
const texte = document.querySelector("#texte");
const compteur = document.querySelector("#compteur");
function rendre() { compteur.textContent = String(texte.value.length) + " / 40"; }
texte.addEventListener("input", rendre);
rendre();
```

