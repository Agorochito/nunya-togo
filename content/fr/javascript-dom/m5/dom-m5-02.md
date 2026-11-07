---
{
  "id": "dom-m5-02",
  "title_fr": "Trier une copie et retrouver l’ordre source",
  "course": "javascript-dom",
  "module": "m5",
  "order": 14,
  "minutes": 20,
  "prerequisites": [
    "dom-m5-01"
  ],
  "outcomes": [
    "Trier une copie avec des comparaisons numériques explicites.",
    "Conserver l’ordre source et combiner un tri avec une recherche."
  ],
  "idea_fr": "Trier une copie avec des comparaisons numériques explicites.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"tri\">Ordre</label><select id=\"tri\"><option value=\"source\">Ordre initial</option><option value=\"duree\">Durée croissante</option><option value=\"prix\">Prix décroissant</option></select><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Durée croissante : Jardin, Web, Python ; retour initial : Python, Jardin, Web.",
      "trace_fr": [
        "slice copie le tableau de références.",
        "Les durées vingt sont départagées par les identifiants deux et trois.",
        "La source conserve son ordre pour le retour."
      ],
      "browser_test": {
        "description_fr": "Trier puis revenir",
        "steps": [
          {
            "action": "input",
            "selector": "#tri",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Jardin",
                  "Web",
                  "Python"
                ]
              }
            ],
            "value": "duree"
          },
          {
            "action": "input",
            "selector": "#tri",
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
            "value": "source"
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Durées fictives</h1><button id=\"trier\" type=\"button\">Trier</button><button id=\"origine\" type=\"button\">Ordre initial</button><ul id=\"liste\"></ul><ul id=\"source\" hidden><li>10</li><li>2</li><li>1</li></ul></main>",
      "expected_output": "Le clic Trier affiche 1, 2, 10 ; Ordre initial rétablit 10, 2, 1.",
      "trace_fr": [
        "Les textes sont convertis en nombres.",
        "Le comparateur effectue une différence numérique.",
        "Le retour utilise le tableau source intact."
      ],
      "browser_test": {
        "description_fr": "Vrai tri numérique",
        "steps": [
          {
            "action": "click",
            "selector": "#trier",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "1",
                  "2",
                  "10"
                ]
              }
            ]
          },
          {
            "action": "click",
            "selector": "#origine",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "10",
                  "2",
                  "1"
                ]
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Trier la source en place",
      "why_fr": "Le retour initial retrouve un tableau déjà réordonné.",
      "fix_fr": "Copie le tableau avant sort."
    },
    {
      "error": "Inverser tous les critères",
      "why_fr": "Les égalités suivent le mauvais ordre d’identifiants.",
      "fix_fr": "Traite séparément le sens du prix et celui de l’identité."
    }
  ],
  "quiz": [
    {
      "question": "Que fait sort au tableau reçu ?",
      "options": [
        "Il transforme les objets en chaînes dans la source.",
        "Il le modifie.",
        "Il crée toujours une copie indépendante."
      ],
      "answer": 1,
      "explanation": "Une copie préalable est nécessaire lorsque la source doit conserver son ordre.",
      "id": "dom-m5-02-q1"
    },
    {
      "question": "Pourquoi ajouter un comparateur pour des nombres ?",
      "options": [
        "Le tri par défaut suit des représentations textuelles.",
        "Les nombres ne peuvent pas être triés.",
        "Le DOM trie automatiquement les entiers."
      ],
      "answer": 0,
      "explanation": "Le comparateur précise le sens numérique voulu.",
      "id": "dom-m5-02-q2"
    },
    {
      "question": "Une copie avec slice copie-t-elle aussi tous les objets intérieurs ?",
      "options": [
        "Oui, à toutes les profondeurs.",
        "Seulement les objets dont le prix vaut zéro.",
        "Non, les objets intérieurs restent partagés."
      ],
      "answer": 2,
      "explanation": "La copie superficielle sépare l’ordre des éléments sans dupliquer leur contenu modifiable.",
      "id": "dom-m5-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "comparateur",
      "definition": "Fonction qui détermine l’ordre relatif de deux éléments."
    },
    {
      "term": "copie superficielle",
      "definition": "Nouveau tableau dont les éléments intérieurs restent partagés."
    },
    {
      "term": "critère secondaire",
      "definition": "Règle utilisée pour départager une égalité du premier critère."
    }
  ],
  "recap_fr": [
    "Trier une copie avec des comparaisons numériques explicites.",
    "Conserver l’ordre source et combiner un tri avec une recherche.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "comparateur",
    "copie superficielle",
    "critère secondaire"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — Array.sort",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — Array.slice",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le filtrage décide quelles fiches apparaissent ; le tri décide dans quel ordre elles apparaissent. Ces choix sont distincts. Un catalogue peut présenter les mêmes ateliers par durée croissante, par prix décroissant ou dans l’ordre fourni au départ. Si l’interface promet de retrouver cet ordre initial, le programme doit le conserver réellement, pas tenter de le deviner à partir des titres.

La méthode sort modifie le tableau sur lequel elle est appelée et retourne ce même tableau. Pour garder la source, commence par ateliers.slice(), qui crée ici une autre liste d’éléments, puis trie cette copie. Les objets intérieurs sont encore partagés : cette copie superficielle suffit pour changer leur ordre, mais pas pour modifier leurs propriétés sans toucher aux objets source. Dans ce chapitre, les comparateurs lisent les données et ne changent ni les titres, ni les prix, ni les durées.

Sans comparateur, sort compare des représentations textuelles. Les nombres dix, deux et un ne suivent donc pas automatiquement l’ordre numérique attendu. Le comparateur (a,b) => a-b convient pour une liste de nombres croissants. Pour nos objets, a.duree-b.duree compare leur propriété numérique. Un résultat négatif place a avant b, un positif le place après et zéro indique une égalité pour ce critère. Les champs numériques lus dans dataset doivent avoir été convertis avec Number.

Les égalités demandent une règle annoncée. Nous utilisons l’identifiant croissant comme second critère : a.duree-b.duree || a.id-b.id. Ici, || fournit la seconde différence lorsque la première vaut zéro. Pour un prix décroissant, inverse la différence des prix, pas celle des identifiants. Les titres restent seulement les textes affichés. Le tri ne change pas les identités et ne doit pas inventer un nouvel identifiant à partir de la position visible.

Teste ensuite un aller-retour : ordre initial, tri, retour initial. Ce parcours révèle une source triée en place alors qu’un seul écran trié aurait semblé correct. Essaie aussi des valeurs de tailles différentes et deux durées égales. Lorsque recherche et tri sont combinés, chaque changement doit relire les deux contrôles : saisir un nouveau terme ne désactive pas le tri choisi. Le rendu conserve les messages vides et le compteur déjà étudiés. Les données de chaque essai restent fictives et temporaires ; la sauvegarde du code ne doit pas être présentée comme une mémorisation des tris ou des changements de ce document entre deux lancements.

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
const tri = document.querySelector('#tri');
function rendre() {
  let selection = ateliers;
  if (tri.value === 'duree') selection = ateliers.slice().sort((a,b) => a.duree - b.duree || a.id - b.id);
  afficher(selection);
}
tri.addEventListener('change', rendre);
rendre();
```

## Exemple guidé 2

```javascript
const durees = Array.from(document.querySelectorAll('#source li'), el => Number(el.textContent));
function afficher(valeurs) {
  const liste = document.querySelector('#liste');
  liste.replaceChildren();
  for (const valeur of valeurs) {
    const li = document.createElement('li');
    li.textContent = String(valeur);
    liste.append(li);
  }
}
document.querySelector('#trier').addEventListener('click', () => afficher(durees.slice().sort((a,b) => a-b)));
document.querySelector('#origine').addEventListener('click', () => afficher(durees));
afficher(durees);
```

