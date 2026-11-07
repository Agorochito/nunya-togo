---
{
  "id": "dom-m4-02",
  "title_fr": "Créer et remplacer des éléments sans interpréter les saisies",
  "course": "javascript-dom",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "dom-m4-01"
  ],
  "outcomes": [
    "Construire et insérer des éléments avec du texte littéral.",
    "Remplacer un rendu sans l’accumuler."
  ],
  "idea_fr": "createElement construit un nœud, append le place dans le document et textContent lui donne du texte littéral.",
  "analogy_fr": "Créer un élément ressemble à préparer une fiche vierge ; il faut ensuite la remplir et la ranger dans le bon dossier.",
  "examples": [
    {
      "fixture_html": "<main><button id=\"ajouter\" type=\"button\">Ajouter une ligne fictive</button><ul id=\"liste\"></ul></main>",
      "expected_output": "Chaque activation ajoute un nouveau li Atelier fictif ; deux activations donnent deux lignes.",
      "trace_fr": [
        "Le listener est enregistré sur le bouton.",
        "Chaque clic construit un nouveau li détaché.",
        "textContent le remplit sans interpréter du HTML.",
        "append ajoute cette nouvelle ligne dans le document."
      ],
      "browser_test": {
        "description_fr": "Deux créations distinctes",
        "checks": [
          {
            "selector": "#liste li",
            "count": 0
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#ajouter",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Atelier fictif"
                ]
              }
            ]
          },
          {
            "action": "click",
            "selector": "#ajouter",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Atelier fictif",
                  "Atelier fictif"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><ul id=\"source\" hidden><li>Semis</li><li>Compost</li></ul><button id=\"rendre\" type=\"button\">Afficher la liste fournie</button><ul id=\"liste\"><li>Ancien contenu</li></ul></main>",
      "expected_output": "Afficher remplace Ancien contenu par Semis et Compost ; un second clic garde exactement deux lignes.",
      "trace_fr": [
        "La source cachée fournit les textes de départ.",
        "replaceChildren retire seulement les anciens enfants de destination.",
        "Chaque texte reçoit un nouveau li dans la liste rendue.",
        "Le bouton réexécute un rendu complet sans dupliquer son résultat."
      ],
      "browser_test": {
        "description_fr": "Reconstruire sans accumulation",
        "checks": [],
        "steps": [
          {
            "action": "click",
            "selector": "#rendre",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Semis",
                  "Compost"
                ]
              }
            ]
          },
          {
            "action": "click",
            "selector": "#rendre",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Semis",
                  "Compost"
                ]
              },
              {
                "selector": "#source li",
                "count": 2
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer sans insérer",
      "why_fr": "Le nœud reste détaché.",
      "fix_fr": "Ajoute-le au conteneur prévu."
    },
    {
      "error": "Reconstruire sans remplacer",
      "why_fr": "Chaque action duplique l’ancien résultat.",
      "fix_fr": "Vide la destination avant un rendu complet."
    }
  ],
  "quiz": [
    {
      "question": "createElement rend-il le nœud immédiatement visible dans #liste ?",
      "options": [
        "Non, il faut aussi l’insérer dans le document.",
        "Oui, tout élément créé apparaît automatiquement.",
        "Oui, si son nom contient li."
      ],
      "answer": 0,
      "explanation": "La création et l’insertion sont des étapes distinctes.",
      "id": "dom-m4-02-q1"
    },
    {
      "question": "Que fait liste.replaceChildren() sans argument ?",
      "options": [
        "Il détruit tout le document.",
        "Il retire les enfants de liste en gardant le conteneur.",
        "Il copie automatiquement toutes les listes."
      ],
      "answer": 1,
      "explanation": "Le conteneur peut ensuite recevoir un nouveau rendu.",
      "id": "dom-m4-02-q2"
    },
    {
      "question": "Comment conserver <b>Jeu</b> comme titre littéral ?",
      "options": [
        "Le traiter comme une chaîne HTML.",
        "L’envoyer vers un serveur.",
        "Affecter ce texte à textContent du nouveau li."
      ],
      "answer": 2,
      "explanation": "Le contenu est une donnée textuelle, pas du balisage à créer.",
      "id": "dom-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "nœud détaché",
      "definition": "Élément créé mais pas encore placé dans le document visible."
    },
    {
      "term": "append",
      "definition": "Méthode ajoutant ici un nœud comme enfant du conteneur."
    },
    {
      "term": "reconstruction",
      "definition": "Nouveau rendu complet remplaçant un résultat précédent."
    }
  ],
  "recap_fr": [
    "Construire et insérer des éléments avec du texte littéral.",
    "Remplacer un rendu sans l’accumuler.",
    "Synchroniser une liste, son compte et son état vide."
  ],
  "tags": [
    "nœud détaché",
    "append",
    "reconstruction"
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
    }
  ]
}
---

## Explication pas à pas

Une liste interactive doit parfois recevoir de nouvelles lignes après le chargement. Écrire seulement textContent sur toute la liste ne construit pas les éléments li attendus. document.createElement("li") crée un nouvel élément, encore détaché du document. Tu peux lui donner du texte puis utiliser liste.append(ligne) pour le placer comme enfant de la liste. Les trois intentions sont distinctes : construire, remplir et insérer.

Le nouvel élément existe même avant d’être visible dans la page. Le créer sans l’insérer ne suffit donc pas à montrer une activité. À l’inverse, réutiliser le même élément avec append le déplace ; cela ne fabrique pas automatiquement plusieurs copies indépendantes. Pour ajouter une ligne par action, crée un nouvel élément à chaque fois. Un formulaire peut fournir son texte, à condition de lire et de vérifier la saisie au moment de la demande.

textContent conserve la saisie comme contenu textuel. Un titre fictif tel que « <b>Jeu</b> » doit rester ces caractères si l’objectif est un titre écrit par la personne. Il ne faut pas transformer ce contenu en balisage. Cette méthode facilite aussi la lecture du code : les balises utiles viennent des appels createElement connus et les textes viennent des valeurs. Une chaîne HTML construite à la main mêlerait ces deux responsabilités.

replaceChildren remplace les enfants d’un conteneur. Sans argument, il les retire tous en gardant le conteneur lui-même. Cela convient à une remise à zéro ou au début d’un rendu complet. Si un bouton « afficher » reconstruit une liste à partir des mêmes données, il doit d’abord remplacer son ancien résultat ; sinon les activations empilent les copies. Les événements délégués sur un conteneur stable pourront continuer à servir après un remplacement, ce que nous approfondirons ensuite.

Dans cette leçon, quelques listes simples utilisent leurs éléments actuels pour calculer un compte avec querySelectorAll("li").length. Un message vide et son attribut hidden doivent suivre ce compte. Chaque exemple et chaque essai reconstruit le HTML fourni ; aucune activité réelle n’est inscrite et aucune ligne créée ici n’est conservée entre les tests. Essaie deux ajouts, une saisie vide, un titre ressemblant à une balise et un effacement complet. Explique à quel endroit un nouvel élément devient visible et pourquoi répéter une reconstruction ne doit pas multiplier accidentellement le contenu. La prochaine leçon donnera aux données un état distinct du DOM rendu.

## Exemple guidé 1

```javascript
const liste = document.querySelector("#liste");
document.querySelector("#ajouter").addEventListener("click", function() {
  const ligne = document.createElement("li");
  ligne.textContent = "Atelier fictif";
  liste.append(ligne);
});
```

## Exemple guidé 2

```javascript
const source = document.querySelector("#source");
const liste = document.querySelector("#liste");
document.querySelector("#rendre").addEventListener("click", function() {
  liste.replaceChildren();
  for (const entree of source.querySelectorAll("li")) {
    const ligne = document.createElement("li");
    ligne.textContent = entree.textContent;
    liste.append(ligne);
  }
});
```

