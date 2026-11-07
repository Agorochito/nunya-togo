---
{
  "id": "react-m2-03",
  "title_fr": "Garder les états utiles et calculer leurs conséquences",
  "course": "react-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "react-m2-02"
  ],
  "outcomes": [
    "Choisir plusieurs états lorsque des informations changent indépendamment.",
    "Dériver totaux et résumés au rendu pour éviter les mémoires redondantes."
  ],
  "idea_fr": "Mémorise les décisions indépendantes ; recalcule les conséquences qui se déduisent déjà de ces décisions.",
  "analogy_fr": "Deux colonnes de comptage sont des informations de base ; leur somme se recalcule sans tenir un troisième registre.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Les deux compteurs commencent à 0 ; après Lecture puis Jardin, chacun vaut 1 et le total vaut « 2 groupes ».",
      "trace_fr": [
        "Lignes 2–3 : deux mémoires indépendantes sont initialisées.",
        "Ligne 4 : total est une somme locale recalculée au rendu.",
        "Clic Lecture : lecture devient 1, jardin reste 0 et total vaut 1.",
        "Clic Jardin : jardin devient 1, lecture reste 1 et total vaut 2.",
        "Lignes 5–6 : le JSX présente ces valeurs, sans troisième état pour la somme."
      ],
      "browser_test": {
        "description_fr": "Somme dérivée",
        "checks": [
          {
            "selector": "#lecture-total",
            "text": "0"
          },
          {
            "selector": "#jardin-total",
            "text": "0"
          },
          {
            "selector": "#total",
            "text": "0 groupes"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#lecture-plus",
            "checks": [
              {
                "selector": "#lecture-total",
                "text": "1"
              },
              {
                "selector": "#jardin-total",
                "text": "0"
              },
              {
                "selector": "#total",
                "text": "1 groupes"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#jardin-plus",
            "checks": [
              {
                "selector": "#lecture-total",
                "text": "1"
              },
              {
                "selector": "#jardin-total",
                "text": "1"
              },
              {
                "selector": "#total",
                "text": "2 groupes"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le résumé part de « Lecture : 0 tours », devient « Lecture : 1 tours », puis « Jardin : 1 tours ».",
      "trace_fr": [
        "Lignes 2–3 : le titre choisi et les tours ont chacun leur mémoire.",
        "Ligne 4 : la phrase est un calcul local, sans useState supplémentaire.",
        "Clic sur Ajouter un tour : tours passe à 1 et le résumé est recalculé.",
        "Clic sur Choisir Jardin : seul atelier change, le compteur reste à 1.",
        "Lignes 5–6 : le rendu conserve une phrase cohérente avec les deux états."
      ],
      "browser_test": {
        "description_fr": "Deux décisions et un résumé",
        "checks": [
          {
            "selector": "#resume",
            "text": "Lecture : 0 tours"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#resume",
                "text": "Lecture : 1 tours"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#jardin",
            "checks": [
              {
                "selector": "#resume",
                "text": "Jardin : 1 tours"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#resume",
                "text": "Jardin : 2 tours"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer un état pour chaque sortie",
      "why_fr": "Des valeurs calculables sont dupliquées.",
      "fix_fr": "Identifie d’abord les informations de base."
    },
    {
      "error": "Lire l’ancien nombre pour un double mémorisé",
      "why_fr": "Le second état peut prendre un clic de retard.",
      "fix_fr": "Calcule le double depuis nombre au rendu."
    },
    {
      "error": "Réinitialiser seulement une partie",
      "why_fr": "Un résumé ou un bouton garde un état périmé.",
      "fix_fr": "Réinitialise les états de base puis laisse le rendu dériver toutes les conséquences."
    }
  ],
  "quiz": [
    {
      "question": "Faut-il un état séparé pour lecture+jardin si ces deux états existent déjà ?",
      "options": [
        "Oui, chaque paragraphe exige son propre état.",
        "Oui, mais seulement pour les nombres nuls.",
        "Non, la somme se calcule pendant le rendu."
      ],
      "answer": 2,
      "explanation": "La somme est une conséquence des informations déjà conservées.",
      "id": "react-m2-03-q1"
    },
    {
      "question": "Pourquoi un résumé mémorisé peut-il prendre du retard ?",
      "options": [
        "React efface toujours les textes après un clic.",
        "Sa mise à jour manuelle peut lire un ancien instantané ou être oubliée.",
        "Les chaînes ne peuvent pas être affichées dans JSX."
      ],
      "answer": 1,
      "explanation": "Une phrase dérivée évite cette synchronisation supplémentaire.",
      "id": "react-m2-03-q2"
    },
    {
      "question": "Que faut-il vérifier quand une action ne change qu’un des deux comptes ?",
      "options": [
        "Le compte concerné, le compte préservé et les valeurs dérivées.",
        "Uniquement la couleur du bouton.",
        "Uniquement le nombre de lignes de code."
      ],
      "answer": 0,
      "explanation": "Les sorties non concernées et la somme révèlent les incohérences.",
      "id": "react-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "états indépendants",
      "definition": "Informations dont les changements peuvent être déclenchés séparément."
    },
    {
      "term": "calcul dérivé",
      "definition": "Résultat recalculé depuis les props ou états déjà disponibles."
    },
    {
      "term": "état redondant",
      "definition": "Mémoire qui duplique une information déjà calculable."
    },
    {
      "term": "cohérence",
      "definition": "Accord entre toutes les représentations d’une même situation."
    }
  ],
  "recap_fr": [
    "Choisir plusieurs états lorsque des informations changent indépendamment.",
    "Dériver totaux et résumés au rendu pour éviter les mémoires redondantes.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "états indépendants",
    "calcul dérivé",
    "état redondant",
    "cohérence"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — Choisir la structure de l’état",
      "url": "https://fr.react.dev/learn/choosing-the-state-structure",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — L’état comme instantané",
      "url": "https://react.dev/learn/state-as-a-snapshot",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — L’état, mémoire d’un composant",
      "url": "https://fr.react.dev/learn/state-a-components-memory",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un composant peut avoir plusieurs variables d’état. Si les groupes Lecture et Jardin augmentent indépendamment, deux appels useState permettent de conserver leurs nombres. Chaque commande met à jour la mémoire qui la concerne. Ces appels restent au niveau supérieur du composant et gardent leur ordre. Le choix du nombre de mémoires vient du besoin, pas du nombre de paragraphes que l’interface doit afficher.

Le total des groupes se calcule avec lecture + jardin pendant le rendu. Une constante locale suffit : const total = lecture + jardin. Au prochain rendu, les deux états courants produisent automatiquement un nouveau total. Créer aussi useState(total) introduirait une seconde représentation de la même information à synchroniser après chaque action. Un oubli pourrait alors afficher Lecture=2, Jardin=1 et Total=2, une contradiction visible.

Une information dérivée peut être un nombre, un booléen ou une phrase. Le résumé atelier + " : " + tours + " tours" se déduit d’un atelier sélectionné et du compteur. Ces deux états peuvent changer indépendamment : choisir Jardin ne remet pas forcément les tours à zéro si la règle métier demande de les conserver. Le résumé, lui, doit toujours refléter leurs valeurs actuelles. Il ne possède pas sa propre décision à mémoriser.

La même distinction aide à appliquer une capacité commune. La capacité fournie par la fixture est une configuration fixe, lecture et jardin évoluent, total est leur somme et reste vaut capacite - total. Les textes et les propriétés disabled des deux boutons utilisent ces calculs. Quand reste vaut zéro, les deux ajouts deviennent indisponibles. Une remise au départ met les deux comptes à zéro ; les autres informations se recalculent sans quatre commandes supplémentaires.

Les règles doivent rester explicites dans les gestionnaires. Vérifier total < capacite avant un ajout exprime la limite ; présenter disabled informe l’utilisateur sur l’action disponible. Les clics séparés utilisent les gestionnaires du dernier rendu. Nous ne simulons pas un système de réservation partagé entre personnes : ces limites concernent seulement les données fictives de cette interface locale.

Plusieurs états ne sont pas toujours préférables. Deux informations qui changeraient obligatoirement ensemble peuvent parfois être réunies, tandis qu’un résultat calculable ne demande souvent aucune mémoire. Dans ce module, nous utilisons des nombres et chaînes simples pour rendre ces choix visibles. Les tableaux d’état, les formulaires et les remontées de callbacks seront étudiés plus tard, avec leurs besoins propres.

Pour vérifier un modèle, écris les informations de base, les événements qui les changent, puis les valeurs calculées. Après chaque clic, contrôle aussi les sorties que l’action ne devait pas modifier. Les tests mélangent plusieurs boutons et des remises au départ, avec des capacités alternatives. Si un double ou un résumé prend du retard d’un clic, cherche d’abord une mémoire redondante calculée depuis l’ancien instantané avant d’ajouter un effet ou une écriture directe dans le DOM.

## Exemple guidé 1

```javascript
function App() { // 1
  const [lecture, setLecture] = useState(0); // 2
  const [jardin, setJardin] = useState(0); // 3
  const total = lecture + jardin; // 4
  return <main><p id="lecture-total">{lecture}</p><p id="jardin-total">{jardin}</p><p id="total">{total} groupes</p><button id="lecture-plus" type="button" onClick={() => setLecture(n => n + 1)}>Lecture</button><button id="jardin-plus" type="button" onClick={() => setJardin(n => n + 1)}>Jardin</button></main>; // 5
}
root.render(<App />); // 6
```

Résultat attendu dans l’aperçu : Les deux compteurs commencent à 0 ; après Lecture puis Jardin, chacun vaut 1 et le total vaut « 2 groupes ».

Trace :

- Lignes 2–3 : deux mémoires indépendantes sont initialisées.
- Ligne 4 : total est une somme locale recalculée au rendu.
- Clic Lecture : lecture devient 1, jardin reste 0 et total vaut 1.
- Clic Jardin : jardin devient 1, lecture reste 1 et total vaut 2.
- Lignes 5–6 : le JSX présente ces valeurs, sans troisième état pour la somme.

## Exemple guidé 2

```javascript
function App() { // 1
  const [atelier, setAtelier] = useState("Lecture"); // 2
  const [tours, setTours] = useState(0); // 3
  const resume = atelier + " : " + tours + " tours"; // 4
  return <main><p id="resume">{resume}</p><button id="jardin" type="button" onClick={() => setAtelier("Jardin")}>Choisir Jardin</button><button id="plus" type="button" onClick={() => setTours(t => t + 1)}>Ajouter un tour</button></main>; // 5
}
root.render(<App />); // 6
```

Résultat attendu dans l’aperçu : Le résumé part de « Lecture : 0 tours », devient « Lecture : 1 tours », puis « Jardin : 1 tours ».

Trace :

- Lignes 2–3 : le titre choisi et les tours ont chacun leur mémoire.
- Ligne 4 : la phrase est un calcul local, sans useState supplémentaire.
- Clic sur Ajouter un tour : tours passe à 1 et le résumé est recalculé.
- Clic sur Choisir Jardin : seul atelier change, le compteur reste à 1.
- Lignes 5–6 : le rendu conserve une phrase cohérente avec les deux états.

