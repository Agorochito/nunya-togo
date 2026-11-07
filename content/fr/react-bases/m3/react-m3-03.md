---
{
  "id": "react-m3-03",
  "title_fr": "Dériver les résultats et copier avant de trier",
  "course": "react-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "react-m3-02"
  ],
  "outcomes": [
    "Dériver une sélection et son compte depuis les critères.",
    "Représenter le vide sans l’appeler panne."
  ],
  "idea_fr": "Les critères appartiennent à l’état ; la collection visible peut être recalculée depuis ces critères et la source sans état supplémentaire.",
  "analogy_fr": "Un filtre est une fenêtre sur le catalogue : changer la fenêtre ne doit pas découper le catalogue lui-même.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Disponibles seulement passe de trois activités à Python et Web ; désactiver le filtre retrouve Jardin.",
      "trace_fr": [
        "Le critère booléen est la seule donnée d’état de ce calcul.",
        "filter sélectionne les objets dont les places conviennent.",
        "Le rendu mappe la liste dérivée et compte sa longueur.",
        "La source reste disponible lors d’une nouvelle sélection."
      ],
      "browser_test": {
        "description_fr": "Filtrer sans détruire",
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
            "action": "click",
            "selector": "#disponibles",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#total",
                "text": "Résultats : 2"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#disponibles",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Jardin",
                  "Web"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le tri donne Jardin, Python, Web, puis la désactivation retrouve Web, Python, Jardin ; le texte Source ne change pas.",
      "trace_fr": [
        "L’état choisit si le tri est appliqué.",
        "Une copie est créée avant sort.",
        "La source conserve son ordre de référence.",
        "Un autre rendu sans tri peut donc la présenter de nouveau."
      ],
      "browser_test": {
        "description_fr": "Tri réversible et source intacte",
        "checks": [
          {
            "selector": "#liste li",
            "texts": [
              "Web",
              "Python",
              "Jardin"
            ]
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#trier",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Jardin",
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#source",
                "text": "Source : Web, Python, Jardin"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#trier",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Web",
                  "Python",
                  "Jardin"
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
      "error": "Stocker un filtre dans un état concurrent",
      "why_fr": "Un critère peut changer sans la copie correspondante.",
      "fix_fr": "Calcule les résultats pendant le rendu."
    },
    {
      "error": "Trier la source en place",
      "why_fr": "L’ordre original est perdu.",
      "fix_fr": "Trie une copie créée pour le rendu."
    }
  ],
  "quiz": [
    {
      "question": "Que faut-il stocker ici dans l’état ?",
      "options": [
        "Toujours trois copies différentes de la même liste.",
        "Les critères modifiables ; la liste visible peut être dérivée.",
        "Uniquement le nombre affiché, sans données."
      ],
      "answer": 1,
      "explanation": "Éviter l’état redondant réduit les risques de divergence entre critères, lignes et compte.",
      "id": "react-m3-03-q1"
    },
    {
      "question": "Pourquoi copier avant sort ?",
      "options": [
        "map supprime toujours la source.",
        "Les clés React imposent des prix différents.",
        "sort réordonne son tableau en place."
      ],
      "answer": 2,
      "explanation": "Le tableau d’origine doit rester disponible pour un autre rendu.",
      "id": "react-m3-03-q2"
    },
    {
      "question": "Une recherche vide dans cet exercice doit-elle afficher Aucun résultat ?",
      "options": [
        "Non, le critère vide permet de revoir toutes les entrées.",
        "Oui, toute chaîne vide est une panne.",
        "Oui, le catalogue doit être effacé."
      ],
      "answer": 0,
      "explanation": "La règle est annoncée et le résultat dépend des critères courants.",
      "id": "react-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "calcul dérivé",
      "definition": "Résultat recalculé depuis les données et critères disponibles."
    },
    {
      "term": "filtrage",
      "definition": "Sélection des entrées respectant une condition."
    },
    {
      "term": "copie superficielle",
      "definition": "Nouvelle collection contenant ici les mêmes objets, suffisante pour un changement d’ordre."
    }
  ],
  "recap_fr": [
    "Dériver une sélection et son compte depuis les critères.",
    "Représenter le vide sans l’appeler panne.",
    "Trier sans altérer l’ordre source."
  ],
  "tags": [
    "calcul dérivé",
    "filtrage",
    "copie superficielle"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrai React 19.3.1 et ReactDOM 19.3.1 auto-hébergés, JSX transformé dans un document isolé. React, useState, useEffect, useRef et root sont fournis, sans import ni paquet à installer. Chaque essai recrée son interface et son état temporaire. Code et progression sauvegardables ; aucune inscription, requête ou donnée personnelle réelle.",
  "sources": [
    {
      "title": "React — Afficher des listes",
      "url": "https://react.dev/learn/rendering-lists",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Mettre à jour les tableaux d’état",
      "url": "https://react.dev/learn/updating-arrays-in-state",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une liste de données peut être sélectionnée selon une ville, une recherche ou une disponibilité. Le catalogue source et les critères ne jouent pas le même rôle. Garde le critère qui change dans l’état, puis calcule la liste visible pendant le rendu. La liste filtrée et son nombre sont des résultats dérivés. Les stocker aussi dans des états indépendants risquerait de laisser un ancien résultat quand un critère change.

filter crée un tableau contenant les entrées pour lesquelles la fonction de sélection retourne true. Il ne retire pas ces entrées du tableau source. Une recherche textuelle peut nettoyer un critère avec trim et comparer des versions en minuscules avec toLowerCase. Cette règle ignore la casse dans nos exemples ; elle ne promet pas une normalisation de tous les alphabets ou accents. Les recherches de ce module sont choisies par boutons pour isoler le calcul ; les champs contrôlés seront introduits dans le module suivant.

Une sélection vide n’est pas forcément une erreur. Elle peut simplement signifier qu’aucune activité ne respecte les critères. Rends alors un message clair et un compte zéro, sans créer une ligne fictive. Si le critère redevient vide, toutes les entrées doivent revenir selon le contrat. Le compte doit être calculé depuis le tableau effectivement mappé, pas depuis la source ou un état plus ancien.

Le tri nécessite une autre précaution. sort modifie le tableau sur lequel on l’appelle. Pour préserver une source ou un tableau d’état, construis d’abord une copie, par exemple [...catalogue], puis trie cette copie. Cette copie est superficielle ; elle convient ici parce que nous changeons l’ordre sans modifier les objets contenus. localeCompare fournit la comparaison textuelle demandée. Un retour à l’ordre original doit rester possible sans avoir détruit cet ordre.

Les exercices combinent ces calculs sans effet de synchronisation ni stockage réseau. Les clés des fiches restent leurs identifiants, même quand leur position change. Essaie un critère avec plusieurs résultats, un résultat vide puis une remise à zéro ; active et désactive ensuite le tri. Observe aussi l’ordre source affiché comme preuve de conservation. Chaque essai recrée sa démonstration et ses données fictives. Explique enfin ce qui est réellement stocké dans l’état et ce qui est recalculé : cette distinction prépare des formulaires de recherche cohérents sans accumuler des copies concurrentes des mêmes données.

## Exemple guidé 1

```javascript
const catalogue = [{id:"py",titre:"Python",places:4},{id:"ja",titre:"Jardin",places:0},{id:"we",titre:"Web",places:2}];
function App() {
  const [uniquement, setUniquement] = useState(false);
  const visibles = catalogue.filter(a => !uniquement || a.places > 0);
  return <main><button id="disponibles" type="button" aria-pressed={uniquement} onClick={() => setUniquement(v => !v)}>Disponibles seulement</button><ul id="liste">{visibles.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="total">Résultats : {visibles.length}</p></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
const catalogue = [{id:"we",titre:"Web"},{id:"py",titre:"Python"},{id:"ja",titre:"Jardin"}];
function App() {
  const [tri, setTri] = useState(false);
  const visibles = [...catalogue];
  if (tri) { visibles.sort((a,b) => a.titre.localeCompare(b.titre,"fr")); }
  return <main><button id="trier" type="button" aria-pressed={tri} onClick={() => setTri(v => !v)}>Basculer le tri alphabétique</button><ul id="liste">{visibles.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="source">Source : {catalogue.map(a => a.titre).join(", ")}</p></main>;
}
root.render(<App />);
```

