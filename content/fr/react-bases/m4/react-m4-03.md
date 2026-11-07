---
{
  "id": "react-m4-03",
  "title_fr": "Partager un état et transmettre des intentions par callbacks",
  "course": "react-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "react-m4-02"
  ],
  "outcomes": [
    "Partager une donnée depuis le parent commun.",
    "Transmettre des intentions avec des callbacks explicites."
  ],
  "idea_fr": "Un parent commun peut posséder l’état partagé, fournir les valeurs aux enfants et recevoir leurs intentions grâce à des fonctions passées en props.",
  "analogy_fr": "Un carnet commun coordonne deux guichets : chacun consulte la même version et transmet ses demandes au responsable du carnet.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Deux activations du composant Commande mettent à jour Choix : 2 et Résumé : 2 depuis le même état du parent.",
      "trace_fr": [
        "App possède le nombre de choix.",
        "La fonction ajouter est transmise sans être appelée pendant le rendu.",
        "L’enfant la relie à son bouton natif.",
        "Les deux composants d’affichage reçoivent la même nouvelle valeur."
      ],
      "browser_test": {
        "description_fr": "Deux affichages restent en accord",
        "checks": [
          {
            "selector": "#principal",
            "text": "Choix : 0"
          },
          {
            "selector": "#copie",
            "text": "Résumé : 0"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#ajouter",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#principal",
                "text": "Choix : 1"
              },
              {
                "selector": "#copie",
                "text": "Résumé : 1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#ajouter",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#principal",
                "text": "Choix : 2"
              },
              {
                "selector": "#copie",
                "text": "Résumé : 2"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Saisir Atelier fictif dans Saisie actualise Apercu ; Effacer le titre depuis le parent vide le champ et remet Sans titre.",
      "trace_fr": [
        "Le parent garde le seul état titre.",
        "Le champ enfant reçoit sa valeur et la fonction à prévenir.",
        "L’aperçu reçoit la même donnée en prop.",
        "Une commande du parent se répercute dans les deux enfants."
      ],
      "browser_test": {
        "description_fr": "Saisie enfant et effacement parent",
        "checks": [],
        "steps": [
          {
            "action": "input",
            "selector": "#titre",
            "wait_ms": 40,
            "value": "Atelier fictif",
            "checks": [
              {
                "selector": "#apercu",
                "text": "Atelier fictif"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#effacer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#titre",
                "value": ""
              },
              {
                "selector": "#apercu",
                "text": "Sans titre."
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer deux états pour une même valeur partagée",
      "why_fr": "Les composants peuvent diverger.",
      "fix_fr": "Fais vivre cette valeur dans le parent commun."
    },
    {
      "error": "Appeler le callback pendant le rendu",
      "why_fr": "L’intention se produit avant l’action de l’utilisateur.",
      "fix_fr": "Transmets une fonction au gestionnaire d’événement."
    }
  ],
  "quiz": [
    {
      "question": "Où placer l’état commun à deux composants frères ?",
      "options": [
        "Dans deux copies locales forcément synchronisées.",
        "Dans leur plus proche parent commun adapté.",
        "Dans une prop modifiée directement par un enfant."
      ],
      "answer": 1,
      "explanation": "Le parent fournit ensuite les valeurs et fonctions nécessaires.",
      "id": "react-m4-03-q1"
    },
    {
      "question": "Quelle différence entre surAjouter et surAjouter() dans une prop onClick ?",
      "options": [
        "Aucune différence.",
        "La seconde ajoute automatiquement une clé stable.",
        "La première transmet une fonction ; la seconde l’appelle immédiatement lors de l’évaluation."
      ],
      "answer": 2,
      "explanation": "Le gestionnaire doit être appelé à l’action annoncée, pas pendant la construction du rendu.",
      "id": "react-m4-03-q2"
    },
    {
      "question": "Un enfant doit-il modifier directement la prop atelier reçue ?",
      "options": [
        "Non, il peut transmettre une intention au responsable de l’état.",
        "Oui, toute prop est un stockage partagé modifiable.",
        "Oui, pour empêcher un nouveau rendu."
      ],
      "answer": 0,
      "explanation": "Le sens de circulation des valeurs et des intentions doit rester explicite.",
      "id": "react-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "remontée d’état",
      "definition": "Placement d’un état partagé dans un parent commun."
    },
    {
      "term": "callback",
      "definition": "Fonction transmise pour être appelée lors d’une intention ou d’un événement."
    },
    {
      "term": "source commune",
      "definition": "Donnée unique lue par plusieurs affichages au lieu de copies concurrentes."
    }
  ],
  "recap_fr": [
    "Partager une donnée depuis le parent commun.",
    "Transmettre des intentions avec des callbacks explicites.",
    "Dériver les bilans sans modifier les props."
  ],
  "tags": [
    "remontée d’état",
    "callback",
    "source commune"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrai React 19.3.1 et ReactDOM 19.3.1 auto-hébergés, JSX transformé dans un document isolé. React, useState, useEffect, useRef et root sont fournis, sans import ni paquet à installer. Chaque essai recrée son interface et son état temporaire. Code et progression sauvegardables ; aucune inscription, requête ou donnée personnelle réelle.",
  "sources": [
    {
      "title": "React — Partager l’état entre composants",
      "url": "https://react.dev/learn/sharing-state-between-components",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Répondre aux événements",
      "url": "https://react.dev/learn/responding-to-events",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Champs input contrôlés",
      "url": "https://react.dev/reference/react-dom/components/input",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Deux composants peuvent avoir besoin de changer ensemble : un champ et son aperçu, une liste de choix et son bilan. Créer une copie indépendante de la même information dans chacun risque de les désynchroniser. Le plus proche parent commun peut posséder l’état nécessaire et transmettre les valeurs aux enfants par leurs props. Les enfants continuent de décrire leur présentation, sans devenir propriétaires de plusieurs vérités concurrentes.

Les données descendent donc du parent vers ses enfants. Pour demander une modification, le parent peut aussi fournir une fonction comme prop. Dans Commande({surAjouter}), le bouton utilise onClick={surAjouter}. Cette prop est une fonction de rappel, ou callback. Elle sera appelée lors de l’action ; écrire surAjouter() pendant le rendu l’appellerait immédiatement au mauvais moment. Le nom personnalisé ne devient pas automatiquement un événement DOM : l’enfant doit le relier à sa vraie commande.

Une intention peut transporter une valeur. ChoixVille peut appeler surChoisir("Kara") lors de son bouton, puis le parent met à jour sa ville. Un champ peut transmettre son texte actuel via surChanger. Le parent choisit le traitement et reste responsable de la donnée partagée. Il n’est pas nécessaire qu’un enfant cherche le paragraphe d’un autre composant dans le DOM ou tente de modifier ses props.

Fais remonter seulement l’état qui doit être commun. Un détail vraiment indépendant peut rester local. Pour une liste de choix partagés, le parent peut garder les identifiants retenus, puis dériver les titres et le compte. Un enfant reçoit le booléen retenu et un callback auquel il transmet l’id de l’activité. La mise à jour fonctionnelle du parent construit une nouvelle liste, sans modifier les props ou l’ancien tableau en place.

Les exercices possèdent tous leurs composants dans un seul script JSX et terminent par root.render. Aucune fonction n’est importée et aucun choix n’est enregistré sur un serveur. Teste plusieurs actions depuis les enfants puis une remise à zéro décidée par le parent ; tous les affichages concernés doivent suivre. Les messages et labels restent explicites et les contenus saisis restent des textes. Chaque essai reconstruit son état temporaire. Explique enfin où vit l’état, quelles valeurs descendent et quelle intention remonte. Cette organisation prépare des formulaires et catalogues plus grands sans introduire prématurément un stockage global ou un système externe.

## Exemple guidé 1

```javascript
function Commande({ surAjouter }) {
  return <button id="ajouter" type="button" onClick={surAjouter}>Ajouter un choix fictif</button>;
}
function Principal({ valeur }) { return <p id="principal">Choix : {valeur}</p>; }
function Copie({ valeur }) { return <p id="copie">Résumé : {valeur}</p>; }
function App() {
  const [choix, setChoix] = useState(0);
  function ajouter() { setChoix(n => n + 1); }
  return <main><Commande surAjouter={ajouter} /><Principal valeur={choix} /><Copie valeur={choix} /></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
function Saisie({ valeur, surChanger }) {
  return <div><label htmlFor="titre">Titre fictif</label><input id="titre" value={valeur} onChange={e => surChanger(e.target.value)} aria-describedby="apercu" /></div>;
}
function Apercu({ titre }) { return <p id="apercu" aria-live="polite">{titre || "Sans titre."}</p>; }
function App() {
  const [titre, setTitre] = useState("");
  return <main><Saisie valeur={titre} surChanger={setTitre} /><Apercu titre={titre} /><button id="effacer" type="button" onClick={() => setTitre("")}>Effacer le titre</button></main>;
}
root.render(<App />);
```

