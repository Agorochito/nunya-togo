---
{
  "id": "react-m6-01",
  "title_fr": "Attendre un service simulé sans confondre les états",
  "course": "react-bases",
  "module": "m6",
  "order": 16,
  "minutes": 20,
  "prerequisites": [
    "react-m5-03"
  ],
  "outcomes": [
    "Distinguer attente, données, réponse vide et rejet.",
    "Garder une recherche dérivée cohérente avec une réponse asynchrone."
  ],
  "idea_fr": "Distinguer attente, données, réponse vide et rejet.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Chargement... est d’abord affiché ; la Promise simulée donne ensuite Python et Web avec Catalogue prêt.",
      "trace_fr": [
        "L’effet demande le service local une fois au montage.",
        "then met les données résolues dans l’état.",
        "React rend la liste à partir de ce nouvel état."
      ],
      "browser_test": {
        "description_fr": "Attente puis succès",
        "checks": [
          {
            "selector": "#etat",
            "text": "Chargement..."
          },
          {
            "selector": "#liste li",
            "texts": []
          }
        ],
        "steps": [
          {
            "action": "focus",
            "selector": "#titre",
            "checks": [
              {
                "selector": "#etat",
                "text": "Catalogue prêt."
              },
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "2 atelier(s)"
              },
              {
                "selector": "#vide",
                "exists": false
              },
              {
                "selector": "#erreur",
                "exists": false
              }
            ],
            "wait_ms": 200
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\" data-mode=\"erreur\"></div>",
      "expected_output": "Le chargement se termine par Catalogue indisponible. et le message de rejet, sans fiche inventée.",
      "trace_fr": [
        "Le mode vient des données de la fixture.",
        "catch reçoit l’erreur réelle de la Promise simulée.",
        "Une erreur et une réponse vide utilisent deux états distincts."
      ],
      "browser_test": {
        "description_fr": "Attente puis rejet",
        "checks": [
          {
            "selector": "#etat",
            "text": "Chargement..."
          }
        ],
        "steps": [
          {
            "action": "focus",
            "selector": "#titre",
            "checks": [
              {
                "selector": "#etat",
                "text": "Catalogue indisponible."
              },
              {
                "selector": "#liste li",
                "texts": []
              },
              {
                "selector": "#compte",
                "text": "0 atelier(s)"
              },
              {
                "selector": "#erreur",
                "text": "Le catalogue est indisponible."
              },
              {
                "selector": "#vide",
                "exists": false
              }
            ],
            "wait_ms": 200
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre Promise et tableau immédiat",
      "why_fr": "Le code ne lit pas la valeur future au bon moment.",
      "fix_fr": "Traite la résolution dans then et le rejet dans catch."
    },
    {
      "error": "Masquer un rejet avec une fausse liste prête",
      "why_fr": "Le message de réussite contredit l’échec.",
      "fix_fr": "Rends un état d’erreur explicite sans données inventées."
    }
  ],
  "quiz": [
    {
      "question": "chargerAteliers effectue-t-il une requête HTTP ici ?",
      "options": [
        "Seulement en mode erreur.",
        "Non, le service est simulé et local avec une vraie Promise.",
        "Oui, vers un serveur de réservation."
      ],
      "answer": 1,
      "explanation": "Le délai pédagogique ne doit pas être présenté comme un réseau réel.",
      "id": "react-m6-01-q1"
    },
    {
      "question": "Une Promise résolue avec [] correspond-elle à un rejet ?",
      "options": [
        "Non, c’est une réponse réussie sans élément.",
        "Oui, tous les tableaux vides sont des erreurs.",
        "Seulement si le champ de recherche est vide."
      ],
      "answer": 0,
      "explanation": "La branche de succès doit encore distinguer zéro élément d’une collection non vide.",
      "id": "react-m6-01-q2"
    },
    {
      "question": "Où calculer le filtre des données reçues ?",
      "options": [
        "Dans un autre service asynchrone obligatoire.",
        "Une seule fois avant la réponse.",
        "Pendant le rendu à partir de la recherche actuelle."
      ],
      "answer": 2,
      "explanation": "Le filtre est une vue dérivée et peut suivre la réponse comme les saisies.",
      "id": "react-m6-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "Promise",
      "definition": "Objet représentant une valeur future ou un rejet."
    },
    {
      "term": "chargement",
      "definition": "État pendant lequel une opération attend encore son résultat."
    },
    {
      "term": "service simulé",
      "definition": "Fonction locale qui reproduit des issues pédagogiques sans requête réelle."
    }
  ],
  "recap_fr": [
    "Distinguer attente, données, réponse vide et rejet.",
    "Garder une recherche dérivée cohérente avec une réponse asynchrone.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "Promise",
    "chargement",
    "service simulé"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrais React19.3.1 et ReactDOM19.3.1 auto-hébergés ; JSX transformé localement dans une interface isolée. React, useState, useEffect, useRef et root sont fournis. Sans import, installation, serveur ni compte. Le service chargerAteliers de M6 est simulé et local, sans requête HTTP. Chaque essai recrée l’interface ; source et progression sont conservées, pas l’état temporaire des composants.",
  "sources": [
    {
      "title": "React — Synchronizing with Effects",
      "url": "https://react.dev/learn/synchronizing-with-effects",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — useEffect",
      "url": "https://react.dev/reference/react/useEffect",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une opération asynchrone produit son résultat plus tard, après le retour de l’appel qui la déclenche. Le service fourni chargerAteliers est pédagogique et simulé : il ne fait aucun fetch, ne contacte aucun serveur et ne représente aucune réservation. Il renvoie une vraie Promise locale. Par défaut, elle répond après environ cent cinquante millisecondes. L’atelier reste utilisable sans compte ni requête internet ; les bibliothèques React sont déjà présentes.

Une Promise peut se résoudre avec une valeur ou être rejetée avec une erreur. then reçoit les lignes disponibles au succès ; catch traite le rejet. L’effet du composant déclenche le service au montage. L’état initial annonce Chargement et porte une liste vide. Le programme ne peut pas lire immédiatement un tableau en remplaçant la Promise par des titres écrits à la main : il doit mettre à jour l’état lorsque la réponse arrive. Ce chapitre prépare les différents états ; le suivant traite les tentatives et les résultats devenus obsolètes.

Les fixtures choisissent trois modes locaux. Le mode succes renvoie les ateliers fictifs, Python et Web par défaut. Une fixture peut fournir d’autres identifiants et titres. Le mode vide résout la Promise avec un tableau vide. Le mode erreur rejette avec le message « Le catalogue est indisponible. ». Ces trois issues se distinguent d’un chargement toujours en cours. Les exercices vérifient donc la liste, le texte d’état et les messages conditionnels, pas seulement la présence d’un titre de page.

Un état objet rassemble ici statut, ateliers et message. Au succès, une liste non vide donne succes ; une liste vide donne vide. Au rejet, la liste est vide et le message contient l’erreur. Les éléments d’erreur ne doivent pas rester visibles après un succès, et une réponse vide n’est pas une erreur. Le paragraphe d’état possède role=status et aria-live=polite. Le message d’échec utilise un retour explicite. Les annonces réelles varient selon les aides techniques ; le test contrôle la structure rendue.

Dans le dernier exercice, la recherche est un état contrôlé indépendant du chargement. Tu peux saisir un terme pendant l’attente. Dès que les données arrivent, la sélection est calculée pendant le rendu, à partir du terme actuel. Distingue alors deux cas : aucun atelier reçu du service, ou des ateliers reçus mais aucun titre correspondant. Le compteur visible/reçu et les deux messages évitent de les confondre. Aucune opération asynchrone n’est nécessaire pour ce filtre.

Observe d’abord Chargement, attends un court instant, puis examine la réponse. Les tests attendent suffisamment avant les vérifications finales et changent aussi le mode ou les données. Le délai n’imite pas une connexion réelle : il rend seulement l’attente observable. Chaque essai recrée cette interface et son service simulé ; Nunya conserve le code et la progression, pas les états temporaires ni les titres du catalogue.

## Exemple guidé 1

```jsx
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  useEffect(() => {
    chargerAteliers().then(lignes => {
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
  }, []);
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><ul id="liste">{resultat.ateliers.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="compte">{resultat.ateliers.length} atelier(s)</p>{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  useEffect(() => {
    chargerAteliers().then(lignes => {
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
  }, []);
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><ul id="liste">{resultat.ateliers.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="compte">{resultat.ateliers.length} atelier(s)</p>{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

