---
{
  "id": "dom-m4-01",
  "title_fr": "Synchroniser classes, visibilité et état annoncé",
  "course": "javascript-dom",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "dom-m3-03"
  ],
  "outcomes": [
    "Piloter classes et visibilité depuis un état explicite.",
    "Synchroniser hidden et l’annonce de la commande."
  ],
  "idea_fr": "Un état explicite doit piloter ensemble le contenu visible, les classes et les attributs qui l’annoncent.",
  "analogy_fr": "Un panneau possède un interrupteur : le voyant, le texte de la commande et l’ouverture doivent raconter la même position.",
  "examples": [
    {
      "fixture_html": "<main><button id=\"basculer\" class=\"commande\" type=\"button\" aria-controls=\"details\" aria-expanded=\"false\">Afficher les détails</button><section id=\"details\" hidden><h2>Détails de démonstration</h2><p>Activité fictive.</p></section></main>",
      "expected_output": "Deux activations ouvrent puis replient les détails, avec texte du bouton, classe actif et aria-expanded cohérents.",
      "trace_fr": [
        "L’état initial est lu depuis hidden.",
        "La fonction applique une même variable à la visibilité et à l’annonce.",
        "Le clic inverse la variable puis appelle le rendu.",
        "La classe commande reste présente pendant les deux transitions."
      ],
      "browser_test": {
        "description_fr": "Déplier puis replier",
        "checks": [
          {
            "selector": "#details",
            "attributes": {
              "hidden": ""
            }
          },
          {
            "selector": "#basculer",
            "text": "Afficher les détails",
            "attributes": {
              "aria-expanded": "false"
            },
            "classes": [
              "commande"
            ]
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#details",
                "attributes": {
                  "hidden": null
                }
              },
              {
                "selector": "#basculer",
                "text": "Masquer les détails",
                "attributes": {
                  "aria-expanded": "true"
                },
                "classes": [
                  "commande",
                  "actif"
                ]
              }
            ]
          },
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#details",
                "attributes": {
                  "hidden": ""
                }
              },
              {
                "selector": "#basculer.actif",
                "exists": false
              },
              {
                "selector": "#basculer",
                "attributes": {
                  "aria-expanded": "false"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><div id=\"bloc\" class=\"section\"><button id=\"ouvrir\" type=\"button\" aria-controls=\"aide\" aria-expanded=\"false\">Aide</button><section id=\"aide\" hidden><h2>Aide locale</h2><p>Aucune donnée envoyée.</p><button id=\"fermer\" type=\"button\">Fermer l’aide</button></section></div></main>",
      "expected_output": "L’aide s’ouvre depuis son bouton ; Fermer l’aide la masque puis rend le focus à Aide.",
      "trace_fr": [
        "Le rendu annonce l’état sur le bouton qui commande la région.",
        "La classe ouvert suit la même variable.",
        "Le bouton intérieur ferme explicitement.",
        "Le focus revient au contrôle toujours visible."
      ],
      "browser_test": {
        "description_fr": "Fermer depuis le panneau",
        "checks": [],
        "steps": [
          {
            "action": "click",
            "selector": "#ouvrir",
            "checks": [
              {
                "selector": "#aide",
                "attributes": {
                  "hidden": null
                }
              }
            ]
          },
          {
            "action": "click",
            "selector": "#fermer",
            "checks": [
              {
                "selector": "#aide",
                "attributes": {
                  "hidden": ""
                }
              },
              {
                "selector": "#ouvrir",
                "focused": true,
                "attributes": {
                  "aria-expanded": "false"
                }
              },
              {
                "selector": "#bloc.ouvert",
                "exists": false
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Effacer className pour une seule classe",
      "why_fr": "Les classes de base disparaissent.",
      "fix_fr": "Ajoute ou retire la classe ciblée avec classList."
    },
    {
      "error": "Faire évoluer visibilité et annonce séparément",
      "why_fr": "Le bouton peut annoncer l’inverse du contenu.",
      "fix_fr": "Utilise une seule variable et une fonction de rendu commune."
    }
  ],
  "quiz": [
    {
      "question": "Quel effet a classList.toggle(\"actif\", false) ?",
      "options": [
        "Toute la liste des classes est supprimée.",
        "La classe devient le texte false.",
        "La classe actif est retirée sans effacer les autres classes."
      ],
      "answer": 2,
      "explanation": "Le deuxième argument impose un état plutôt qu’une inversion indépendante du modèle.",
      "id": "dom-m4-01-q1"
    },
    {
      "question": "hidden=\"false\" rend-il visible ce panneau simple ?",
      "options": [
        "Non, l’attribut reste présent.",
        "Oui, le texte false désactive toute règle HTML.",
        "Oui, s’il existe un bouton."
      ],
      "answer": 0,
      "explanation": "La propriété booléenne ou le retrait d’attribut convient pour cette intention.",
      "id": "dom-m4-01-q2"
    },
    {
      "question": "aria-expanded=true ouvre-t-il une région ?",
      "options": [
        "Oui, il remplace hidden.",
        "Non, il annonce un état que le programme doit rendre cohérent.",
        "Oui, il déplace aussi tous les titres."
      ],
      "answer": 1,
      "explanation": "Annonce et visibilité sont des dimensions liées mais distinctes.",
      "id": "dom-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "classList",
      "definition": "Accès aux classes d’un élément sans réécrire toute leur chaîne."
    },
    {
      "term": "hidden",
      "definition": "Propriété utilisée ici pour masquer ou montrer une région."
    },
    {
      "term": "état annoncé",
      "definition": "Information accessible décrivant la position d’une commande."
    }
  ],
  "recap_fr": [
    "Piloter classes et visibilité depuis un état explicite.",
    "Synchroniser hidden et l’annonce de la commande.",
    "Restaurer un focus utile après fermeture."
  ],
  "tags": [
    "classList",
    "hidden",
    "état annoncé"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document isolé du navigateur. HTML fourni et état temporaire recréés à chaque essai ou test. Le code et la progression peuvent être sauvegardés, pas les changements temporaires de cette interface. Données fictives, sans réseau, compte, stockage réel ni module importé.",
  "sources": [
    {
      "title": "MDN — classList",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/classList",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — hidden",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/hidden",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — focus()",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une interface peut afficher ou replier une aide, retenir une fiche ou signaler une option. Modifier seulement une couleur ne suffit pas : le résultat visible, le texte et l’état annoncé doivent rester cohérents. Nous allons conserver une variable booléenne puis utiliser une fonction de rendu pour appliquer ce même état à plusieurs propriétés du DOM. Les données sont fictives et l’état n’est pas enregistré entre les essais.

classList donne accès aux classes d’un élément. add ajoute un nom, remove le retire et toggle peut le basculer. Avec un deuxième argument booléen, classList.toggle("actif", ouvert) impose la présence de la classe lorsque ouvert est vrai et son absence sinon. Cette forme est utile dans un rendu : elle dépend de l’état voulu plutôt que d’un nombre supposé de bascules passées. Les autres classes de l’élément restent présentes, contrairement à un remplacement maladroit de toute la chaîne className.

La propriété hidden de nos éléments exprime ici une visibilité simple. hidden=true cache le contenu ; hidden=false retire cette demande. L’attribut HTML hidden est booléen dans ce cas : écrire hidden="false" le laisse présent et ne signifie donc pas « visible ». Il faut distinguer le texte de la valeur d’attribut et la propriété booléenne utilisée par le programme. Ces exercices n’emploient pas les variantes avancées de masquage.

Pour un bouton qui contrôle une région, aria-controls identifie sa cible et aria-expanded annonce si elle est dépliée. L’attribut prend une chaîne "true" ou "false". Il n’affiche ni ne cache lui-même le contenu ; la propriété hidden reste à synchroniser. Pour un bouton d’option pressée, aria-pressed décrit une autre intention et ne remplace pas aria-expanded. Choisis le sens adapté à la commande, puis rends tous les éléments concernés.

Teste ouverture, fermeture et nouvelle ouverture. Ajoute une situation déjà ouverte au départ pour vérifier que le code lit correctement l’état initial. Un panneau caché ne doit pas garder inutilement le focus à l’intérieur ; après une fermeture demandée depuis son contenu, revenir au bouton d’ouverture permet de poursuivre. Il ne s’agit pas ici d’une fenêtre modale ni d’un piège de focus. Chaque essai reconstruit le HTML fourni. Les contrôles automatiques inspectent classes et attributs, mais une visite manuelle reste nécessaire pour vérifier la lisibilité, le clavier et le sens des libellés.

## Exemple guidé 1

```javascript
const bouton = document.querySelector("#basculer");
const details = document.querySelector("#details");
let ouvert = !details.hidden;
function rendre() {
  details.hidden = !ouvert;
  bouton.setAttribute("aria-expanded", String(ouvert));
  bouton.classList.toggle("actif", ouvert);
  if (ouvert) { bouton.textContent = "Masquer les détails"; }
  else { bouton.textContent = "Afficher les détails"; }
}
bouton.addEventListener("click", function() { ouvert = !ouvert; rendre(); });
rendre();
```

## Exemple guidé 2

```javascript
const ouvrir = document.querySelector("#ouvrir");
const fermer = document.querySelector("#fermer");
const aide = document.querySelector("#aide");
const bloc = document.querySelector("#bloc");
let ouvert = !aide.hidden;
function rendre() {
  aide.hidden = !ouvert;
  bloc.classList.toggle("ouvert", ouvert);
  ouvrir.setAttribute("aria-expanded", String(ouvert));
}
ouvrir.addEventListener("click", function() { ouvert = !ouvert; rendre(); });
fermer.addEventListener("click", function() { ouvert = false; rendre(); ouvrir.focus(); });
rendre();
```

