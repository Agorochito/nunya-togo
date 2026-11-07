---
{
  "id": "dom-m4-03",
  "title_fr": "Garder un état de liste et cibler des identifiants stables",
  "course": "javascript-dom",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "dom-m4-02"
  ],
  "outcomes": [
    "Modifier une liste à partir de données identifiées de façon stable.",
    "Rendre et gérer des commandes reconstruites avec une délégation."
  ],
  "idea_fr": "Les données décrivent la liste ; les événements modifient cet état puis un rendu reconstruit le DOM selon des identifiants stables.",
  "analogy_fr": "Un numéro de dossier reste attaché à une fiche même lorsqu’on retire la fiche située avant elle dans la pile.",
  "examples": [
    {
      "fixture_html": "<main><h2 id=\"titre-liste\" tabindex=\"-1\">Activités fictives</h2><ul id=\"liste\"><li data-id=\"a\" data-fait=\"false\"><span class=\"nom\">Semis</span></li><li data-id=\"b\" data-fait=\"false\"><span class=\"nom\">Compost</span></li><li data-id=\"c\" data-fait=\"false\"><span class=\"nom\">Lecture</span></li></ul><p>Total : <span id=\"total\"></span></p><p id=\"vide\">Aucune activité.</p><p id=\"bilan\" role=\"status\" aria-live=\"polite\"></p></main>",
      "expected_output": "Retirer Compost conserve Semis et Lecture ; retirer ensuite Semis fonctionne encore après la reconstruction.",
      "trace_fr": [
        "Les données de départ sont lues une fois depuis les lignes fournies.",
        "Chaque commande porte l’identifiant stable de son activité.",
        "filter retire l’objet ciblé puis rendre reconstruit la liste.",
        "L’écouteur du conteneur continue de traiter les nouveaux boutons."
      ],
      "browser_test": {
        "description_fr": "Deux retraits après rendus",
        "checks": [
          {
            "selector": "#total",
            "text": "3"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#liste button[data-id=\"b\"] span",
            "checks": [
              {
                "selector": "#liste .nom",
                "texts": [
                  "Semis",
                  "Lecture"
                ]
              },
              {
                "selector": "#total",
                "text": "2"
              },
              {
                "selector": "#titre-liste",
                "focused": true
              }
            ]
          },
          {
            "action": "click",
            "selector": "#liste button[data-id=\"a\"]",
            "checks": [
              {
                "selector": "#liste .nom",
                "texts": [
                  "Lecture"
                ]
              },
              {
                "selector": "#total",
                "text": "1"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h2 id=\"titre-liste\" tabindex=\"-1\">Activités fictives</h2><ul id=\"liste\"><li data-id=\"a\" data-fait=\"false\"><span class=\"nom\">Semis</span></li><li data-id=\"b\" data-fait=\"false\"><span class=\"nom\">Compost</span></li><li data-id=\"c\" data-fait=\"false\"><span class=\"nom\">Lecture</span></li></ul><p>Total : <span id=\"total\"></span></p><p id=\"vide\">Aucune activité.</p><p id=\"bilan\" role=\"status\" aria-live=\"polite\"></p></main>",
      "expected_output": "Terminer Semis change son état, annonce une activité terminée et rend le focus à son nouveau bouton ; Rouvrir revient à zéro.",
      "trace_fr": [
        "L’objet ciblé est retrouvé par son id, pas sa position.",
        "Son booléen fait est inversé.",
        "Le rendu remet en accord classe, bouton et bilan.",
        "Le nouveau bouton de cette même activité récupère le focus."
      ],
      "browser_test": {
        "description_fr": "Modifier puis remettre à faire",
        "checks": [
          {
            "selector": "#bilan",
            "text": "Terminées : 0"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#liste button[data-id=\"a\"]",
            "checks": [
              {
                "selector": "#liste li[data-id=\"a\"]",
                "classes": [
                  "termine"
                ]
              },
              {
                "selector": "#liste button[data-id=\"a\"]",
                "text": "Rouvrir",
                "attributes": {
                  "aria-pressed": "true"
                },
                "focused": true
              },
              {
                "selector": "#bilan",
                "text": "Terminées : 1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#liste button[data-id=\"a\"]",
            "checks": [
              {
                "selector": "#liste li[data-id=\"a\"].termine",
                "exists": false
              },
              {
                "selector": "#bilan",
                "text": "Terminées : 0"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Réutiliser la longueur comme nouvel id",
      "why_fr": "Une suppression peut provoquer une collision.",
      "fix_fr": "Attribue un identifiant local croissant indépendant de la longueur."
    },
    {
      "error": "Écouter les anciens boutons seulement",
      "why_fr": "Les commandes reconstruites ne réagissent plus.",
      "fix_fr": "Délègue depuis la liste et enregistre cet écouteur hors du rendu."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi ne pas utiliser la position de tableau comme identité stable ?",
      "options": [
        "Les tableaux n’ont jamais de position.",
        "Les positions changent après un retrait.",
        "Une position est automatiquement un identifiant de serveur."
      ],
      "answer": 1,
      "explanation": "Un id attaché à l’objet évite de viser une autre activité quand l’ordre change.",
      "id": "dom-m4-03-q1"
    },
    {
      "question": "Pourquoi un écouteur sur le conteneur survit-il au rendu ?",
      "options": [
        "replaceChildren copie tous les écouteurs de boutons.",
        "Le navigateur garde forcément chaque ancien bouton.",
        "Le conteneur reste tandis que ses enfants sont remplacés."
      ],
      "answer": 2,
      "explanation": "La délégation dépend d’un ancêtre stable et de la remontée d’événement.",
      "id": "dom-m4-03-q2"
    },
    {
      "question": "Que doit lire le compteur de cette architecture ?",
      "options": [
        "Le même état que celui utilisé pour créer les lignes.",
        "Un nombre fixe écrit au chargement.",
        "Le dernier texte cliqué sans référence aux données."
      ],
      "answer": 0,
      "explanation": "Une source commune évite que le compte et la liste divergent.",
      "id": "dom-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "identifiant stable",
      "definition": "Valeur conservant le sens d’un objet malgré les changements de position."
    },
    {
      "term": "état de liste",
      "definition": "Données utilisées pour produire la liste rendue et ses indicateurs."
    },
    {
      "term": "délégation",
      "definition": "Traitement d’événements depuis un conteneur stable en retrouvant la commande ciblée."
    }
  ],
  "recap_fr": [
    "Modifier une liste à partir de données identifiées de façon stable.",
    "Rendre et gérer des commandes reconstruites avec une délégation.",
    "Garder compte, vide, messages et focus cohérents."
  ],
  "tags": [
    "identifiant stable",
    "état de liste",
    "délégation"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document isolé du navigateur. HTML fourni et état temporaire recréés à chaque essai ou test. Le code et la progression peuvent être sauvegardés, pas les changements temporaires de cette interface. Données fictives, sans réseau, compte, stockage réel ni module importé.",
  "sources": [
    {
      "title": "MDN — createElement",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Document/createElement",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — replaceChildren",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/replaceChildren",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — closest",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/closest",
      "scope": "Référence primaire vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une liste peut maintenant recevoir des lignes, mais elle devient difficile à suivre si chaque action modifie séparément des textes et des comptes. Un tableau d’objets peut décrire l’état : identifiant, titre et éventuellement état terminé. La fonction rendre lit ce tableau pour construire les éléments et calculer les indicateurs. Le DOM rendu est une présentation des données ; il n’est plus nécessaire d’y rechercher à nouveau toute la logique après chaque modification.

Un identifiant n’est pas une position de tableau. Après un retrait, la deuxième ligne peut devenir la première, tandis que son identité doit rester la même. Conserve donc une propriété id stable et place-la dans data-id sur les commandes rendues. Pour les nouveaux éléments, un compteur croissant fournit ici des identifiants locaux uniques. Utiliser la longueur du tableau comme nouvel identifiant peut réutiliser un numéro après suppression et rendre une commande ambiguë.

Retirer peut produire un nouveau tableau. elements.filter(function(element) { return element.id !== id; }) garde les éléments dont l’identifiant diffère de celui demandé. filter appelle la petite fonction sur chaque élément et conserve ceux pour lesquels elle retourne true. Cette opération ne reconstruit pas profondément les objets ; elle suffit pour cette sélection sans modification des fiches retirées. Une mise à jour peut aussi trouver un objet par son id et changer sa propriété booléenne, puis rappeler rendre.

replaceChildren reconstruit les lignes et retire leurs anciens boutons. Des écouteurs attachés uniquement à ces boutons de départ ne suivraient pas les nouvelles créations. Une délégation sur la liste stable évite ce problème : le clic remonte au conteneur, closest retrouve le bouton même si un span intérieur a été visé, et contains vérifie qu’il appartient bien à cette liste. Enregistre cet écouteur hors de rendre pour ne pas le multiplier à chaque reconstruction.

Le compte et l’état vide proviennent du même tableau que les lignes. Lorsqu’une commande disparaît après un rendu, prévois un focus utile : le titre de liste, le nouveau bouton de la même activité ou le champ d’ajout selon la tâche annoncée. Les identifiants sont locaux à la démonstration, pas des références de serveur. Chaque essai et chaque test redémarre son document et ses données fictives. Vérifie une suppression au milieu, une autre après reconstruction, puis un ajout après retrait. Explique quelle donnée change, comment l’élément ciblé est retrouvé et pourquoi ni les positions ni les anciens nœuds ne doivent devenir des références fragiles.

## Exemple guidé 1

```javascript
const liste = document.querySelector("#liste");
const total = document.querySelector("#total");
const vide = document.querySelector("#vide");
let elements = [];
for (const ligne of liste.querySelectorAll("li[data-id]")) {
  elements.push({id:ligne.dataset.id, titre:ligne.querySelector(".nom").textContent});
}
function rendre() {
  liste.replaceChildren();
  for (const element of elements) {
    const ligne = document.createElement("li");
    ligne.dataset.id = element.id;
    const nom = document.createElement("span");
    nom.classList.add("nom");
    nom.textContent = element.titre;
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.dataset.action = "retirer";
    bouton.dataset.id = element.id;
    const libelle = document.createElement("span");
    libelle.textContent = "Retirer";
    bouton.append(libelle);
    ligne.append(nom, bouton);
    liste.append(ligne);
  }
  total.textContent = String(elements.length);
  vide.hidden = elements.length !== 0;
}
function retirer(id) {
  elements = elements.filter(function(element) { return element.id !== id; });
  rendre();
  document.querySelector("#titre-liste").focus();
}
liste.addEventListener("click", function(evenement) {
  const bouton = evenement.target.closest('button[data-action="retirer"]');
  if (!bouton || !liste.contains(bouton)) { return; }
  retirer(bouton.dataset.id);
});
rendre();
```

## Exemple guidé 2

```javascript
const liste = document.querySelector("#liste");
const total = document.querySelector("#total");
const vide = document.querySelector("#vide");
const bilan = document.querySelector("#bilan");
const elements = [];
for (const ligne of liste.querySelectorAll("li[data-id]")) {
  elements.push({id:ligne.dataset.id,titre:ligne.querySelector(".nom").textContent,fait:ligne.dataset.fait === "true"});
}
function rendre() {
  liste.replaceChildren();
  let terminees = 0;
  for (const element of elements) {
    const ligne = document.createElement("li");
    ligne.dataset.id = element.id;
    ligne.classList.toggle("termine", element.fait);
    const nom = document.createElement("span");
    nom.classList.add("nom");
    nom.textContent = element.titre;
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.dataset.id = element.id;
    bouton.dataset.action = "basculer";
    bouton.setAttribute("aria-pressed", String(element.fait));
    if (element.fait) { bouton.textContent = "Rouvrir"; terminees = terminees + 1; }
    else { bouton.textContent = "Terminer"; }
    ligne.append(nom, bouton);
    liste.append(ligne);
  }
  total.textContent = String(elements.length);
  vide.hidden = elements.length !== 0;
  bilan.textContent = "Terminées : " + String(terminees);
}
liste.addEventListener("click", function(evenement) {
  const bouton = evenement.target.closest('button[data-action="basculer"]');
  if (!bouton || !liste.contains(bouton)) { return; }
  const id = bouton.dataset.id;
  for (const element of elements) { if (element.id === id) { element.fait = !element.fait; } }
  rendre();
  liste.querySelector('button[data-id="' + id + '"]').focus();
});
rendre();
```

