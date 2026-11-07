---
{
  "id": "react-m5-02",
  "title_fr": "Synchroniser un titre externe avec useEffect",
  "course": "react-bases",
  "module": "m5",
  "order": 14,
  "minutes": 20,
  "prerequisites": [
    "react-m5-01"
  ],
  "outcomes": [
    "Synchroniser document.title avec des dépendances complètes.",
    "Calculer les sélections directement sans effet ni état redondant."
  ],
  "idea_fr": "Synchroniser document.title avec des dépendances complètes.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Départ donne Note : Départ ; saisir Afi donne Note : Afi ; Vider donne Note : Sans nom.",
      "trace_fr": [
        "L’état pilote le champ contrôlé.",
        "L’effet synchronise le titre après le rendu.",
        "La dépendance nom suit saisie et remise à vide."
      ],
      "browser_test": {
        "description_fr": "Titre initial puis deux changements",
        "checks": [
          {
            "selector": "title",
            "text": "Note : Départ"
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#nom",
            "checks": [
              {
                "selector": "title",
                "text": "Note : Afi"
              },
              {
                "selector": "#affiche",
                "text": "Afi"
              }
            ],
            "value": "Afi"
          },
          {
            "action": "click",
            "selector": "#vider",
            "checks": [
              {
                "selector": "title",
                "text": "Note : Sans nom"
              },
              {
                "selector": "#nom",
                "value": ""
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Changer seulement le préfixe pour Liste synchronise aussi le titre ; le nom peut ensuite être modifié séparément.",
      "trace_fr": [
        "Les deux valeurs sont des propriétés de l’enfant.",
        "La liste de dépendances doit mentionner les deux.",
        "Le JSX et le titre externe suivent les mêmes valeurs."
      ],
      "browser_test": {
        "description_fr": "Deux propriétés indépendantes",
        "steps": [
          {
            "action": "input",
            "selector": "#prefixe",
            "checks": [
              {
                "selector": "#affiche",
                "text": "Liste : Départ"
              },
              {
                "selector": "title",
                "text": "Liste : Départ"
              }
            ],
            "value": "Liste"
          },
          {
            "action": "input",
            "selector": "#nom",
            "checks": [
              {
                "selector": "#affiche",
                "text": "Liste : Ko"
              },
              {
                "selector": "title",
                "text": "Liste : Ko"
              }
            ],
            "value": "Ko"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier une propriété dans les dépendances",
      "why_fr": "Le titre ne suit pas son changement isolé.",
      "fix_fr": "Déclare toutes les valeurs réactives lues."
    },
    {
      "error": "Stocker un filtre dérivé dans un état séparé",
      "why_fr": "La présentation peut conserver une sélection ancienne.",
      "fix_fr": "Calcule le filtre pendant le rendu."
    }
  ],
  "quiz": [
    {
      "question": "Un filtre utilisé seulement pour afficher une liste demande-t-il un effet ?",
      "options": [
        "Seulement si la recherche devient vide.",
        "Non, il peut être calculé pendant le rendu.",
        "Oui, chaque tableau impose useEffect."
      ],
      "answer": 1,
      "explanation": "Le résultat est déjà dérivé de données disponibles au rendu.",
      "id": "react-m5-02-q1"
    },
    {
      "question": "Quelles valeurs réactives déclarer dans les dépendances ?",
      "options": [
        "Celles réellement lues par l’effet.",
        "Uniquement celles dont on veut autoriser le changement.",
        "Aucune si le JSX est correct."
      ],
      "answer": 0,
      "explanation": "Une propriété oubliée peut laisser un système externe avec une valeur ancienne.",
      "id": "react-m5-02-q2"
    },
    {
      "question": "Quel titre est modifié dans cet atelier ?",
      "options": [
        "Celui de tous les onglets du navigateur.",
        "Celui sauvegardé sur un serveur.",
        "Celui du document enfant isolé."
      ],
      "answer": 2,
      "explanation": "Les effets restent dans l’interface temporaire du laboratoire.",
      "id": "react-m5-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "effet",
      "definition": "Synchronisation après rendu avec un système extérieur à la description JSX."
    },
    {
      "term": "dépendance",
      "definition": "Valeur réactive utilisée par un effet et déclarée pour sa synchronisation."
    },
    {
      "term": "calcul dérivé",
      "definition": "Résultat obtenu depuis des données déjà disponibles sans nouvel état."
    }
  ],
  "recap_fr": [
    "Synchroniser document.title avec des dépendances complètes.",
    "Calculer les sélections directement sans effet ni état redondant.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "effet",
    "dépendance",
    "calcul dérivé"
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
      "title": "React — You Might Not Need an Effect",
      "url": "https://react.dev/learn/you-might-not-need-an-effect",
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

Le calcul du JSX décrit les éléments du composant. Le titre du document de démonstration appartient, lui, à un système extérieur à cette description. useEffect permet de synchroniser ce système avec les valeurs du composant après que React a validé son rendu. Dans notre atelier isolé, document.title modifie le titre du document enfant, pas celui de toute l’application Nunya. Les tests peuvent lire son élément title sans sortir de la page d’essai.

Le premier exemple possède un état nom. Son effet met le titre à « Note : » suivi du nom nettoyé, ou de « Sans nom » si le texte est vide. L’effet reçoit une fonction et une liste de dépendances. Le tableau [nom] signifie que cette synchronisation dépend de la valeur nom du rendu. Saisis une nouvelle valeur, puis utilise Vider : l’interface et le titre doivent suivre les deux changements. Un tableau vide ne signifie pas « devine les données utilisées » ; il n’annonce aucune dépendance réactive.

Les propriétés comptent aussi. Dans le second exemple, un enfant reçoit prefixe et nom. Son effet lit les deux et doit donc déclarer les deux. Le parent peut changer le préfixe sans modifier le nom. Oublier prefixe donne un texte JSX correct mais un titre externe périmé : ce décalage rend le défaut observable. Les dépendances ne sont pas une liste d’événements désirés ; elles décrivent les valeurs réactives réellement utilisées par l’effet.

Toute opération ne demande pourtant pas un effet. Filtrer un tableau pour fabriquer les lignes affichées est un calcul de rendu. Il suffit de le faire à partir de la recherche actuelle, puis de retourner le JSX. Conserver aussi cette sélection dans un autre état ajoute une donnée à maintenir et peut produire une vue ancienne. L’effet reste utile pour synchroniser document.title avec le nombre retenu ; il n’est pas nécessaire pour obtenir ce nombre.

Le mini-projet combine une recherche et un préfixe choisi dans un select. Les états représentent les contrôles. La sélection est dérivée directement, et un seul effet synchronise le titre avec le préfixe et la longueur retenue. Cette longueur est une valeur numérique ; la comparer est plus simple que d’utiliser comme dépendance un nouveau tableau de sélection fabriqué à chaque rendu. Aucune optimisation ni bibliothèque supplémentaire n’est nécessaire ici.

Pour vérifier le programme, change séparément chaque contrôle, provoque zéro résultat, puis reviens à une recherche vide. Observe les lignes, le compteur et le titre du document enfant. Les essais vérifient des comportements ; la relecture permet ensuite de justifier pourquoi le calcul du filtre n’a pas d’effet et pourquoi toutes les valeurs lues par la synchronisation sont déclarées. Le catalogue reste fictif, sans réseau ni stockage de ces états. Chaque nouvel essai recrée le document et les composants.

## Exemple guidé 1

```jsx
function App() {
  const [nom, setNom] = useState('Départ');
  useEffect(() => { document.title = 'Note : ' + (nom.trim() || 'Sans nom'); }, [nom]);
  return <main><h1>Note fictive</h1><label htmlFor="nom">Nom de la note</label><input id="nom" value={nom} onChange={e => setNom(e.target.value)} /><p id="affiche">{nom}</p><button id="vider" type="button" onClick={() => setNom('')}>Vider</button></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
function TitreDocument({prefixe, nom}) {
  useEffect(() => { document.title = prefixe + ' : ' + (nom.trim() || 'Sans nom'); }, [prefixe, nom]);
  return <p id="affiche">{prefixe} : {nom.trim() || 'Sans nom'}</p>;
}
function App() {
  const [nom, setNom] = useState('Départ');
  const [prefixe, setPrefixe] = useState('Note');
  return <main><h1>Titre de démonstration</h1><label htmlFor="nom">Nom</label><input id="nom" value={nom} onChange={e => setNom(e.target.value)} /><label htmlFor="prefixe">Préfixe</label><select id="prefixe" value={prefixe} onChange={e => setPrefixe(e.target.value)}><option value="Note">Note</option><option value="Liste">Liste</option></select><TitreDocument prefixe={prefixe} nom={nom} /></main>;
}
root.render(<App />);
```

