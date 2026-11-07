---
{
  "id": "dom-m5-01",
  "title_fr": "Filtrer un tableau et expliquer un résultat vide",
  "course": "javascript-dom",
  "module": "m5",
  "order": 13,
  "minutes": 20,
  "prerequisites": [
    "dom-m4-03"
  ],
  "outcomes": [
    "Filtrer des objets sans détruire leur collection source.",
    "Rendre cohérents sélection, compteur et état vide."
  ],
  "idea_fr": "Filtrer des objets sans détruire leur collection source.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"recherche\">Rechercher un atelier fictif</label><input id=\"recherche\" type=\"search\"><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Au départ trois ateliers ; en tapant py, seul Python reste ; en effaçant, les trois reviennent.",
      "trace_fr": [
        "La source est lue une fois en objets.",
        "input relance le calcul de sélection.",
        "Le rendu met à jour ensemble les lignes, le compte et le message vide."
      ],
      "browser_test": {
        "description_fr": "Recherche puis retour à la collection entière",
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
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": " py "
          },
          {
            "action": "input",
            "selector": "#recherche",
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
              }
            ],
            "value": ""
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"categorie\">Catégorie</label><select id=\"categorie\"><option value=\"toutes\">Toutes</option><option value=\"code\">Code</option><option value=\"nature\">Nature</option><option value=\"creation\">Création</option></select><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Le choix Code montre Python et Web ; Nature montre Jardin.",
      "trace_fr": [
        "La catégorie est lue dans les données.",
        "Toutes désactive seulement ce filtre.",
        "Une égalité sélectionne les autres catégories."
      ],
      "browser_test": {
        "description_fr": "Deux catégories réellement différentes",
        "checks": [
          {
            "selector": "#liste li",
            "texts": [
              "Python",
              "Jardin",
              "Web"
            ]
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#categorie",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "2 résultat(s)"
              }
            ],
            "value": "code"
          },
          {
            "action": "input",
            "selector": "#categorie",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Jardin"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": "nature"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Ne pas relancer le calcul sur input",
      "why_fr": "Le texte change sans que les résultats le suivent.",
      "fix_fr": "Écoute la saisie et relis le critère à chaque rendu."
    },
    {
      "error": "Garder les anciennes lignes pour zéro résultat",
      "why_fr": "L’interface affiche une réponse au critère précédent.",
      "fix_fr": "Remplace aussi la liste lorsque la sélection est vide."
    }
  ],
  "quiz": [
    {
      "question": "Que produit filter ?",
      "options": [
        "La suppression automatique des éléments source.",
        "Un ordre obligatoirement trié.",
        "Un nouveau tableau des éléments retenus."
      ],
      "answer": 2,
      "explanation": "Le tableau source reste disponible et l’ordre relatif des éléments retenus est conservé.",
      "id": "dom-m5-01-q1"
    },
    {
      "question": "Que doit montrer une recherche sans résultat ?",
      "options": [
        "Un faux atelier de remplacement.",
        "Une liste vide, zéro et un message explicite.",
        "Les anciens résultats sans changement."
      ],
      "answer": 1,
      "explanation": "Le rendu doit refléter le nouveau critère, même quand aucune fiche ne convient.",
      "id": "dom-m5-01-q2"
    },
    {
      "question": "Comment combiner deux critères obligatoires ?",
      "options": [
        "Avec ET entre leurs conditions.",
        "En oubliant le premier au second changement.",
        "Avec le texte du titre comme catégorie."
      ],
      "answer": 0,
      "explanation": "Chaque fiche doit satisfaire tous les critères actifs.",
      "id": "dom-m5-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "filtrage",
      "definition": "Construction d’une sélection à partir de critères explicites."
    },
    {
      "term": "état vide",
      "definition": "Présentation prévue lorsqu’aucune donnée ne correspond."
    },
    {
      "term": "filter",
      "definition": "Méthode de tableau qui conserve les éléments dont le test est vrai."
    }
  ],
  "recap_fr": [
    "Filtrer des objets sans détruire leur collection source.",
    "Rendre cohérents sélection, compteur et état vide.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "filtrage",
    "état vide",
    "filter"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — Array.filter",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
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

Une interface de catalogue peut montrer une partie des données sans supprimer le reste. Le tableau ateliers représente la collection source ; le texte recherché représente un critère choisi par la personne. La méthode filter parcourt le tableau et produit un nouveau tableau contenant les éléments pour lesquels sa fonction de test renvoie vrai. Les éléments retenus gardent leur ordre. Cette opération ne retire pas les éléments du tableau source.

Dans les exemples, les données fictives sont fournies par les éléments de la liste cachée source. Array.from transforme la collection renvoyée par querySelectorAll en tableau et applique ici une fonction qui construit un objet par fiche. dataset donne les attributs data-id ou data-places ; Number interprète les quantités numériques. Cette lecture est réalisée une fois au démarrage. La liste visible est ensuite construite à partir des objets, avec createElement et textContent, sans recopier une saisie dans du HTML.

Une fonction fléchée est une écriture courte de fonction. Dans a => a.places > 0, a est le paramètre et l’expression à droite est le résultat retourné. Cela correspond ici à function(a) { return a.places > 0; }. Avec plusieurs paramètres, on écrit (a, b) => a.duree - b.duree. Avec un corps entre accolades, il faut écrire return pour renvoyer un résultat. Le nom du paramètre est libre ; il représente successivement chaque fiche examinée.

Pour une recherche simple, trim retire les espaces extérieurs et toLowerCase rend comparables certaines différences de casse. includes teste si le titre contient le terme. Ce choix ne retire pas les accents et ne constitue pas une recherche linguistique complète. Une recherche vide est contenue dans tous les titres et permet de retrouver le catalogue entier. Le résultat doit être recalculé à chaque événement input, pas seulement lors de l’ouverture de la page.

Un résultat vide est un état normal. Remplace les anciens éléments par une liste vide, donne un compte égal à zéro et rends visible le message Aucun atelier. Ne laisse pas les résultats précédents à l’écran, car ils sembleraient répondre à la nouvelle demande. Le compteur et le message doivent provenir de la même sélection que les lignes. La propriété hidden est vraie lorsque le message doit disparaître ; elle est fausse pour l’afficher.

Un filtre de catégorie suit une règle différente : une égalité exacte, avec une option Toutes qui désactive ce critère. Une case Avec des places se combine à la recherche avec ET : chaque atelier doit respecter les deux conditions actives. Une catégorie ne doit pas être devinée à partir de son titre. Essaie une recherche avec des espaces, une absence de résultat puis un retour au critère vide. Les variantes de données vérifient que les noms affichés viennent des fiches réelles de l’essai. La page reste un laboratoire temporaire : Nunya sauvegarde ton code et ta progression, mais pas les filtres ou ajouts de cette page entre deux essais.

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
const recherche = document.querySelector('#recherche');
function rendre() {
  const terme = recherche.value.trim().toLowerCase();
  const selection = ateliers.filter(a => a.titre.toLowerCase().includes(terme));
  afficher(selection);
}
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
const categorie = document.querySelector('#categorie');
function rendre() {
  afficher(ateliers.filter(a => categorie.value === 'toutes' || a.categorie === categorie.value));
}
categorie.addEventListener('change', rendre);
rendre();
```

