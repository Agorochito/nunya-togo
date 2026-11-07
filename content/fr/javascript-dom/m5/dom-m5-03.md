---
{
  "id": "dom-m5-03",
  "title_fr": "Composer le calcul et les fonctions de rendu",
  "course": "javascript-dom",
  "module": "m5",
  "order": 15,
  "minutes": 20,
  "prerequisites": [
    "dom-m5-02"
  ],
  "outcomes": [
    "Séparer un calcul de sélection et les opérations sur le DOM.",
    "Réutiliser une coordination pour plusieurs actions sans répéter le rendu."
  ],
  "idea_fr": "Séparer un calcul de sélection et les opérations sur le DOM.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"recherche\">Rechercher un atelier fictif</label><input id=\"recherche\" type=\"search\"><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Une saisie web affiche Web et 1 résultat(s) ; une seconde saisie web conserve exactement une ligne.",
      "trace_fr": [
        "selectionner calcule à partir de ses deux arguments.",
        "afficher remplace les anciennes lignes avant de les construire.",
        "rendre lit la saisie actuelle et relie calcul et présentation."
      ],
      "browser_test": {
        "description_fr": "Répéter un même rendu sans doublon",
        "steps": [
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": "web"
          },
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": "web"
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"recherche\">Rechercher un atelier fictif</label><input id=\"recherche\" type=\"search\"><button id=\"retablir\" type=\"button\">Réinitialiser</button><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Après une recherche absente, Réinitialiser vide le contrôle, retrouve trois ateliers et y replace le focus.",
      "trace_fr": [
        "Le gestionnaire change value, puis appelle rendre explicitement.",
        "Le calcul retrouve la collection source intacte.",
        "focus permet de commencer immédiatement une autre recherche."
      ],
      "browser_test": {
        "description_fr": "Réinitialiser par une action réelle",
        "steps": [
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": []
              },
              {
                "selector": "#compte",
                "text": "0 résultat(s)"
              }
            ],
            "value": "absent"
          },
          {
            "action": "click",
            "selector": "#retablir",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Jardin",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "3 résultat(s)"
              },
              {
                "selector": "#recherche",
                "value": "",
                "focused": true
              },
              {
                "selector": "#vide",
                "attributes": {
                  "hidden": ""
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Lire une saisie une seule fois",
      "why_fr": "La recherche reste bloquée sur sa valeur initiale.",
      "fix_fr": "Relis value à chaque coordination."
    },
    {
      "error": "Dupliquer la présentation dans chaque événement",
      "why_fr": "Les compteurs et messages peuvent diverger.",
      "fix_fr": "Fais appeler une fonction de rendu commune."
    }
  ],
  "quiz": [
    {
      "question": "Quelle fonction peut calculer sans accéder à document ?",
      "options": [
        "selectionner(donnees, texte).",
        "La fonction qui crée les éléments li.",
        "Le gestionnaire qui déplace le focus."
      ],
      "answer": 0,
      "explanation": "Un calcul reçoit les informations nécessaires en arguments et retourne son résultat.",
      "id": "dom-m5-03-q1"
    },
    {
      "question": "Changer value en JavaScript déclenche-t-il automatiquement input ?",
      "options": [
        "Oui, exactement une fois sur tous les contrôles.",
        "Seulement lorsque la valeur devient vide.",
        "Non ; il faut demander le recalcul prévu."
      ],
      "answer": 2,
      "explanation": "Le bouton appelle rendre explicitement après avoir changé le contrôle.",
      "id": "dom-m5-03-q2"
    },
    {
      "question": "Pourquoi remplacer les lignes avant chaque construction ?",
      "options": [
        "Pour désactiver les futurs événements.",
        "Pour rendre le même état sans accumuler des doublons.",
        "Pour détruire le tableau source."
      ],
      "answer": 1,
      "explanation": "La présentation doit correspondre à une sélection, indépendamment du nombre d’appels précédents.",
      "id": "dom-m5-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "composition",
      "definition": "Appels de fonctions aux responsabilités précises pour réaliser un comportement."
    },
    {
      "term": "coordination",
      "definition": "Lecture de l’état actuel, calcul puis mise à jour de la présentation."
    },
    {
      "term": "paramètre",
      "definition": "Nom par lequel une fonction reçoit une information nécessaire."
    }
  ],
  "recap_fr": [
    "Séparer un calcul de sélection et les opérations sur le DOM.",
    "Réutiliser une coordination pour plusieurs actions sans répéter le rendu.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "composition",
    "coordination",
    "paramètre"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — Fonctions",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — replaceChildren",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/replaceChildren",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — événement input",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/input_event",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un programme devient difficile à corriger lorsque chaque événement contient sa propre version du filtrage, du compteur et de la construction des lignes. Une modification peut alors corriger la liste sans corriger le message vide. La composition consiste ici à donner des responsabilités précises à quelques fonctions ordinaires, puis à les appeler dans un ordre lisible. Il ne s’agit pas encore d’importer des fichiers ni d’installer un outil.

La fonction selectionner reçoit un tableau et un texte. Elle nettoie le terme, filtre les objets et retourne le résultat. Elle n’utilise ni document, ni sélecteur, ni valeur de contrôle cachée. Avec les mêmes arguments, elle produit la même sélection sans modifier les objets. Tu peux donc expliquer son résultat avec trois titres écrits sur papier. Le nom des paramètres indique ce dont le calcul a réellement besoin ; la collection source n’est pas reconstruite à partir des lignes déjà filtrées.

La fonction afficher reçoit cette sélection et travaille sur le DOM. Elle vide la liste avec replaceChildren, fabrique les nouveaux éléments avec createElement, puis met à jour le compteur et le message vide. Un même état rendu deux fois doit donner les mêmes lignes, sans les doubler. Les trois sorties dépendent du paramètre lignes. Utiliser par erreur la longueur du tableau complet pour le compteur donne une interface contradictoire, même si les titres sont justes.

Une troisième fonction, rendre, coordonne l’ensemble. Elle lit la valeur actuelle de la recherche, appelle selectionner, puis transmet le résultat à afficher. Lire value dans cette fonction est important : une valeur enregistrée avant toute saisie resterait celle du démarrage. L’écouteur input est installé une fois, en dehors de rendre. Ensuite, chaque saisie appelle la même coordination. Une première exécution explicite initialise la page avant le moindre événement.

Le bouton Réinitialiser illustre une autre entrée vers ce même parcours. Son gestionnaire vide le contrôle, appelle rendre et redonne le focus à la recherche. Changer value par JavaScript ne produit pas automatiquement un événement input ; le recalcul doit donc être demandé. Aucune branche spéciale ne doit recopier manuellement les trois titres d’exemple. Les fiches initiales peuvent être différentes dans un autre essai.

Pour vérifier cette organisation, enchaîne plusieurs recherches, répète une saisie identique, provoque un résultat vide puis réinitialise. Observe les lignes, le nombre, le message et le contrôle. Ces actions testent le comportement, tandis que la lisibilité des responsabilités se discute en relisant les fonctions. Un test réussi ne prouve pas à lui seul la qualité des noms ou de l’explication. Chaque essai recrée une page temporaire : seul le code et la progression sont sauvegardés, pas cette sélection.

## Exemple guidé 1

```javascript
const ateliers = Array.from(document.querySelectorAll('#source li'), el => ({id:Number(el.dataset.id), titre:el.textContent.trim(), categorie:el.dataset.categorie, places:Number(el.dataset.places), duree:Number(el.dataset.duree), prix:Number(el.dataset.prix)}));
function afficher(lignes) {
  const liste = document.querySelector('#liste');
  liste.replaceChildren();
  for (const atelier of lignes) {
    const li = document.createElement('li');
    li.dataset.id = String(atelier.id);
    li.textContent = atelier.titre;
    liste.append(li);
  }
  document.querySelector('#compte').textContent = lignes.length + ' résultat(s)';
  document.querySelector('#vide').hidden = lignes.length !== 0;
}
function selectionner(donnees, texte) {
  const terme = texte.trim().toLowerCase();
  return donnees.filter(a => a.titre.toLowerCase().includes(terme));
}
const recherche = document.querySelector('#recherche');
function rendre() { afficher(selectionner(ateliers, recherche.value)); }
recherche.addEventListener('input', rendre);
rendre();
```

## Exemple guidé 2

```javascript
const ateliers = Array.from(document.querySelectorAll('#source li'), el => ({id:Number(el.dataset.id), titre:el.textContent.trim(), categorie:el.dataset.categorie, places:Number(el.dataset.places), duree:Number(el.dataset.duree), prix:Number(el.dataset.prix)}));
function afficher(lignes) {
  const liste = document.querySelector('#liste');
  liste.replaceChildren();
  for (const atelier of lignes) {
    const li = document.createElement('li');
    li.dataset.id = String(atelier.id);
    li.textContent = atelier.titre;
    liste.append(li);
  }
  document.querySelector('#compte').textContent = lignes.length + ' résultat(s)';
  document.querySelector('#vide').hidden = lignes.length !== 0;
}
function selectionner(donnees, texte) {
  const terme = texte.trim().toLowerCase();
  return donnees.filter(a => a.titre.toLowerCase().includes(terme));
}
const recherche = document.querySelector('#recherche');
function rendre() { afficher(selectionner(ateliers, recherche.value)); }
recherche.addEventListener('input', rendre);
rendre();
document.querySelector('#retablir').addEventListener('click', () => {
  recherche.value = '';
  rendre();
  recherche.focus();
});
```

