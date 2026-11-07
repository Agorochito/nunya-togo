---
{
  "id": "react-m5-03",
  "title_fr": "Nettoyer un abonnement et respecter le démontage",
  "course": "react-bases",
  "module": "m5",
  "order": 15,
  "minutes": 20,
  "prerequisites": [
    "react-m5-02"
  ],
  "outcomes": [
    "Associer chaque abonnement externe à son nettoyage symétrique.",
    "Vérifier démontage, remontage et mises à jour fonctionnelles répétées."
  ],
  "idea_fr": "Associer chaque abonnement externe à son nettoyage symétrique.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Deux flèches droites donnent 1 puis 2 ; une flèche gauche est ignorée.",
      "trace_fr": [
        "L’effet inscrit un seul gestionnaire.",
        "La mise à jour fonctionnelle utilise le total précédent.",
        "Le nettoyage retirera ce même gestionnaire."
      ],
      "browser_test": {
        "description_fr": "Touche attendue et autre touche",
        "checks": [
          {
            "selector": "#total",
            "text": "0"
          }
        ],
        "steps": [
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ],
            "key": "ArrowRight"
          },
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ],
            "key": "ArrowLeft"
          },
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "2"
              }
            ],
            "key": "ArrowRight"
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Après une touche le compteur vaut 1 ; démonté il reste 1 ; remonté il avance à 2 exactement.",
      "trace_fr": [
        "Le parent conserve l’état visible pendant le démontage.",
        "Le nettoyage retire l’écoute de document.",
        "Le remontage installe un nouvel abonnement unique."
      ],
      "browser_test": {
        "description_fr": "Monter, démonter et remonter",
        "steps": [
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ],
            "key": "ArrowRight"
          },
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#abonnement",
                "exists": false
              }
            ]
          },
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ],
            "key": "ArrowRight"
          },
          {
            "action": "click",
            "selector": "#basculer",
            "checks": [
              {
                "selector": "#abonnement",
                "text": "Écoute active"
              }
            ]
          },
          {
            "action": "keydown",
            "selector": "#zone",
            "checks": [
              {
                "selector": "#total",
                "text": "2"
              }
            ],
            "key": "ArrowRight"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Retirer une autre flèche que celle inscrite",
      "why_fr": "L’ancien écouteur reste actif.",
      "fix_fr": "Conserve la même référence de fonction pour le retrait."
    },
    {
      "error": "Capturer un état pour des incréments successifs",
      "why_fr": "Les actions repartent d’une valeur ancienne.",
      "fix_fr": "Utilise une mise à jour fonctionnelle quand le nouvel état dépend du précédent."
    }
  ],
  "quiz": [
    {
      "question": "Quand le nettoyage d’un effet est-il exécuté ?",
      "options": [
        "Avant sa réinstallation liée aux dépendances et au démontage.",
        "Seulement quand le navigateur entier ferme.",
        "Après chaque touche, même sans changement."
      ],
      "answer": 0,
      "explanation": "L’opération inverse accompagne le cycle de vie de la synchronisation.",
      "id": "react-m5-03-q1"
    },
    {
      "question": "Comment retirer un gestionnaire correctement ?",
      "options": [
        "Avec une nouvelle flèche qui a le même texte.",
        "En retirant seulement le paragraphe de l’enfant.",
        "Avec la même référence de fonction et le même type."
      ],
      "answer": 2,
      "explanation": "L’identité du gestionnaire est nécessaire pour retirer le branchement prévu.",
      "id": "react-m5-03-q2"
    },
    {
      "question": "Pourquoi utiliser setTotal(n => n + 1) ici ?",
      "options": [
        "Pour transformer le compteur en référence.",
        "Pour calculer depuis l’état précédent sans relire un ancien total capturé.",
        "Pour empêcher tous les rendus."
      ],
      "answer": 1,
      "explanation": "La mise à jour fonctionnelle utilise la donnée fournie par React au moment du traitement.",
      "id": "react-m5-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "nettoyage",
      "definition": "Opération inverse retournée par un effet pour libérer sa synchronisation."
    },
    {
      "term": "démontage",
      "definition": "Retrait d’un composant de l’arbre rendu."
    },
    {
      "term": "fermeture",
      "definition": "Fonction qui conserve l’accès aux valeurs de son environnement de création."
    }
  ],
  "recap_fr": [
    "Associer chaque abonnement externe à son nettoyage symétrique.",
    "Vérifier démontage, remontage et mises à jour fonctionnelles répétées.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "nettoyage",
    "démontage",
    "fermeture"
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
    },
    {
      "title": "React — Queueing a Series of State Updates",
      "url": "https://react.dev/learn/queueing-a-series-of-state-updates",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un écouteur installé sur document appartient à un système extérieur au JSX. React ne peut pas deviner qu’il doit le retirer quand un composant disparaît. useEffect permet de regrouper le branchement et son opération inverse. Dans le premier exemple, l’effet crée une fonction repondre, l’inscrit pour keydown, puis retourne une fonction qui retire exactement cette même référence. Le tableau vide convient ici parce que le gestionnaire utilise seulement une touche constante et la fonction de mise à jour stable de l’état.

La fonction retournée est appelée lors du nettoyage. React l’exécute avant de réinstaller cet effet après un changement de dépendances, et lors du démontage du composant. Il faut retourner une fonction, pas appeler immédiatement removeEventListener à la place. Le type d’événement et la référence du gestionnaire doivent correspondre au branchement. Deux flèches qui se ressemblent restent deux fonctions distinctes ; une nouvelle flèche passée au retrait ne supprime pas l’ancienne.

Le second exemple garde le compteur dans le parent et affiche l’enfant Abonnement de façon conditionnelle. L’enfant appelle une propriété onCompter quand la touche attendue arrive. Clique Démonter, puis envoie encore la touche dans la zone clavier : le parent reste présent, mais le nombre ne doit plus augmenter. Clique Monter : une seule nouvelle inscription doit réagir. Cette séquence rend le nettoyage observable, contrairement à une variable disparue avec son composant.

Le parent fournit une fonction callback qui peut changer d’identité à ses rendus. L’effet enfant lit onCompter et la déclare donc comme dépendance. React nettoie l’ancien branchement avant le suivant. À ce stade, aucune mémorisation supplémentaire n’est nécessaire pour obtenir un comportement correct. La responsabilité essentielle est de donner à chaque inscription une désinscription correspondante.

Une fermeture peut aussi conserver un ancien état. Avec un effet installé une fois, setTotal(total + 1) relit le total du rendu qui a créé le gestionnaire. Deux touches peuvent alors afficher un puis encore un. La mise à jour fonctionnelle setTotal(n => n + 1) utilise la valeur précédente fournie par React ; elle évite d’avoir besoin de lire total dans cette fermeture. Ce choix est différent d’une suppression arbitraire de dépendance.

Le mini-projet permet de choisir touche et pas d’incrément, puis de monter et démonter l’écoute. Vérifie les touches ignorées, les changements de configuration et les retours après démontage. Les événements clavier sont réels dans le document de démonstration ; aucun raccourci global du système n’est installé. En développement, React peut effectuer un cycle supplémentaire de branchement et nettoyage pour révéler des défauts. Un effet correctement symétrique le supporte sans multiplier les réactions. Tout reste temporaire : chaque nouvel essai recrée les composants, les états et les abonnements du laboratoire.

## Exemple guidé 1

```jsx
function App() {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    function repondre(event) { if (event.key === 'ArrowRight') setTotal(n => n + 1); }
    document.addEventListener('keydown', repondre);
    return () => document.removeEventListener('keydown', repondre);
  }, []);
  return <main><h1>Clavier fictif</h1><label htmlFor="zone">Zone clavier</label><input id="zone" readOnly value="Flèche droite pour compter" /><p id="total" role="status">{total}</p></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
function Abonnement({onCompter}) {
  useEffect(() => {
    function repondre(event) { if (event.key === 'ArrowRight') onCompter(); }
    document.addEventListener('keydown', repondre);
    return () => document.removeEventListener('keydown', repondre);
  }, [onCompter]);
  return <p id="abonnement">Écoute active</p>;
}
function App() {
  const [visible, setVisible] = useState(true);
  const [total, setTotal] = useState(0);
  return <main><h1>Abonnement temporaire</h1><label htmlFor="zone">Zone clavier</label><input id="zone" readOnly value="Flèche droite" /><button id="basculer" type="button" onClick={() => setVisible(v => !v)}>{visible ? 'Démonter' : 'Monter'}</button><p id="total" role="status">{total}</p>{visible && <Abonnement onCompter={() => setTotal(n => n + 1)} />}</main>;
}
root.render(<App />);
```

