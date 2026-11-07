---
{
  "id": "react-m3-02",
  "title_fr": "Rendre des listes avec des clés qui gardent le sens",
  "course": "react-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "react-m3-01"
  ],
  "outcomes": [
    "Rendre des données répétées avec map et des clés stables.",
    "Vérifier l’identité au travers d’une réorganisation."
  ],
  "idea_fr": "map décrit plusieurs éléments et une clé stable permet à React de suivre l’identité d’un composant lorsque la liste change.",
  "analogy_fr": "Une étiquette de dossier suit son dossier ; la position sur l’étagère peut changer sans changer son identité.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "La liste commence par Semis et Compost ; Ajouter Lecture donne trois lignes, puis Retirer Lecture revient à deux.",
      "trace_fr": [
        "Les données de base sont des objets avec id et titre.",
        "Le booléen choisit les données à présenter.",
        "map crée une ligne JSX par objet avec key=id.",
        "Le compte est dérivé des données visibles."
      ],
      "browser_test": {
        "description_fr": "Faire varier la collection",
        "checks": [
          {
            "selector": "#liste li",
            "texts": [
              "Semis",
              "Compost"
            ]
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#bonus",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Semis",
                  "Compost",
                  "Lecture"
                ]
              },
              {
                "selector": "#total",
                "text": "Activités : 3"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#bonus",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Semis",
                  "Compost"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Un choix sur Semis reste sur Semis après inversion, lorsque la fiche devient la dernière.",
      "trace_fr": [
        "Chaque fiche garde un compteur local.",
        "L’action de Semis modifie son compteur.",
        "L’ordre des données est inversé sans changer leurs ids.",
        "La clé stable permet de retrouver la même identité de composant."
      ],
      "browser_test": {
        "description_fr": "Un état suit son activité",
        "checks": [],
        "steps": [
          {
            "action": "click",
            "selector": "#liste li[data-id=\"a\"] button",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste li[data-id=\"a\"] [data-role=\"compte\"]",
                "text": "1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#inverser",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#liste .titre",
                "texts": [
                  "Lecture",
                  "Compost",
                  "Semis"
                ]
              },
              {
                "selector": "#liste li[data-id=\"a\"] [data-role=\"compte\"]",
                "text": "1"
              },
              {
                "selector": "#liste li[data-id=\"c\"] [data-role=\"compte\"]",
                "text": "0"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser la position comme identité d’une liste changeante",
      "why_fr": "Les états peuvent se retrouver associés à une autre donnée.",
      "fix_fr": "Utilise un id stable."
    },
    {
      "error": "Confondre key et prop reçue",
      "why_fr": "Le composant ne lit pas automatiquement une prop key.",
      "fix_fr": "Passe les données nécessaires dans des props explicites."
    }
  ],
  "quiz": [
    {
      "question": "À quoi sert key dans cette liste ?",
      "options": [
        "À aider React à suivre l’identité des enfants entre rendus.",
        "À créer automatiquement un attribut HTML secret à lire.",
        "À publier une activité."
      ],
      "answer": 0,
      "explanation": "La clé concerne la correspondance des composants ; un id utile au composant doit être passé séparément.",
      "id": "react-m3-02-q1"
    },
    {
      "question": "Pourquoi une clé d’indice peut-elle poser problème ici ?",
      "options": [
        "Un indice ne peut jamais être numérique.",
        "La position change après un retrait ou une réorganisation.",
        "Elle transforme les titres en nombres."
      ],
      "answer": 1,
      "explanation": "Les exemples possèdent un état local qui doit suivre la donnée et non l’emplacement.",
      "id": "react-m3-02-q2"
    },
    {
      "question": "Que produit map dans notre rendu ?",
      "options": [
        "Une mutation obligatoire du tableau source.",
        "Un dépôt de données permanent.",
        "Un tableau d’éléments décrits à partir des données."
      ],
      "answer": 2,
      "explanation": "Chaque appel de la fonction fournit un résultat ; React peut rendre cette collection de descriptions.",
      "id": "react-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "map",
      "definition": "Méthode produisant un tableau à partir du résultat calculé pour chaque entrée."
    },
    {
      "term": "key",
      "definition": "Clé de correspondance des enfants React d’une même série."
    },
    {
      "term": "identité de composant",
      "definition": "Correspondance qui permet de conserver un état local à travers les rendus."
    }
  ],
  "recap_fr": [
    "Rendre des données répétées avec map et des clés stables.",
    "Vérifier l’identité au travers d’une réorganisation.",
    "Retirer ou déplacer sans modifier un tableau d’état en place."
  ],
  "tags": [
    "map",
    "key",
    "identité de composant"
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

Écrire plusieurs fiches presque identiques à la main devient répétitif. Un tableau d’objets peut porter leurs données et map peut transformer chaque objet en élément JSX. Cette méthode appelle une fonction sur chaque entrée et produit un nouveau tableau de résultats. Dans JSX, ce tableau peut être placé entre accolades à l’intérieur d’une liste. La variable de chaque tour représente les données de la fiche, pas automatiquement un composant déjà rendu.

Chaque enfant créé dans cette série doit recevoir une key adaptée. La clé aide React à reconnaître les éléments entre les rendus d’une même liste. Elle doit être stable et unique parmi les éléments frères concernés ; elle n’a pas besoin d’être unique sur tout le site. Un identifiant de données est souvent approprié. La clé ne se lit pas comme un attribut HTML ni comme une prop ordinaire : passe l’identifiant séparément si le composant doit l’utiliser.

Un indice indique une position. Si la liste est réordonnée ou qu’une ligne précédente disparaît, cette position peut désormais désigner une autre activité. Utiliser l’indice comme clé dans ce contexte peut faire suivre un état local à la position au lieu de l’activité attendue. Nos fiches possèdent donc un petit compteur local : après une inversion ou un retrait, le compte de Semis doit rester attaché à Semis, pas au premier emplacement de la liste.

Les tableaux d’état restent à traiter comme des valeurs en lecture seule. slice et la construction d’un nouveau tableau permettent ici de retirer ou déplacer des entrées sans modifier l’ancien en place. Les compteurs locaux des fiches servent à illustrer l’identité des composants ; le nombre global d’activités est calculé depuis la longueur de la liste, sans deuxième état redondant. Nous ne remontons pas encore ces compteurs vers un parent dans cette leçon.

Exécute les exemples puis retiens une activité avant de modifier l’ordre. Vérifie le titre et son compteur ensemble. Supprime ensuite une autre ligne et recommence sur les composants restants. Les tests observent ce comportement rendu, plutôt que prétendre lire key dans le DOM. Ils partent chaque fois d’une interface neuve ; aucun choix n’est enregistré sur un serveur et aucune inscription n’existe. Explique finalement la différence entre position, identifiant de données et clé React. La prochaine leçon ajoutera des critères de sélection et un tri tout en préservant la source.

## Exemple guidé 1

```javascript
function App() {
  const [bonus, setBonus] = useState(false);
  const ateliers = [{id:"s",titre:"Semis"},{id:"c",titre:"Compost"}];
  const visibles = bonus ? [...ateliers,{id:"l",titre:"Lecture"}] : ateliers;
  return <main><button id="bonus" type="button" onClick={() => setBonus(v => !v)}>{bonus ? "Retirer Lecture" : "Ajouter Lecture"}</button><ul id="liste">{visibles.map(atelier => <li key={atelier.id} data-id={atelier.id}>{atelier.titre}</li>)}</ul><p id="total">Activités : {visibles.length}</p></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
function Fiche({ atelier }) {
  const [choix, setChoix] = useState(0);
  return <li data-id={atelier.id}><span className="titre">{atelier.titre}</span><span data-role="compte">{choix}</span><button data-action="retenir" type="button" onClick={() => setChoix(n => n + 1)}>Retenir</button></li>;
}
function App() {
  const [inverse, setInverse] = useState(false);
  const initial = [{id:"a",titre:"Semis"},{id:"b",titre:"Compost"},{id:"c",titre:"Lecture"}];
  const ateliers = inverse ? [initial[2],initial[1],initial[0]] : initial;
  return <main><button id="inverser" type="button" onClick={() => setInverse(v => !v)}>Inverser l’ordre</button><ul id="liste">{ateliers.map((atelier,index) => <Fiche key={atelier.id} atelier={atelier} />)}</ul></main>;
}
root.render(<App />);
```

