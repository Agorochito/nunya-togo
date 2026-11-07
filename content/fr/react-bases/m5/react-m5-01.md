---
{
  "id": "react-m5-01",
  "title_fr": "Utiliser une référence pour guider le focus",
  "course": "react-bases",
  "module": "m5",
  "order": 13,
  "minutes": 20,
  "prerequisites": [
    "react-m4-03"
  ],
  "outcomes": [
    "Utiliser useRef pour atteindre un nœud dans un gestionnaire.",
    "Conserver dans useState les données qui déterminent l’affichage."
  ],
  "idea_fr": "Utiliser useRef pour atteindre un nœud dans un gestionnaire.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Saisir Lecture puis cliquer Atteindre la note conserve Lecture et place le focus dans le champ.",
      "trace_fr": [
        "useState porte la valeur visible.",
        "ref associe la référence au nœud réel.",
        "Le gestionnaire appelle focus après le rendu."
      ],
      "browser_test": {
        "description_fr": "Valeur conservée et focus réel",
        "steps": [
          {
            "action": "input",
            "selector": "#note",
            "checks": [
              {
                "selector": "#apercu",
                "text": "Lecture"
              }
            ],
            "value": "Lecture"
          },
          {
            "action": "focus",
            "selector": "#atteindre",
            "checks": []
          },
          {
            "action": "click",
            "selector": "#atteindre",
            "checks": [
              {
                "selector": "#note",
                "value": "Lecture",
                "focused": true
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Soumettre vide indique une erreur ; saisir Afi et soumettre confirme la note, vide le champ et y remet le focus.",
      "trace_fr": [
        "La règle se calcule depuis l’état contrôlé.",
        "Le même nœud est atteint pour corriger ou continuer.",
        "Les textes et attributs viennent du JSX."
      ],
      "browser_test": {
        "description_fr": "Échec puis réussite",
        "steps": [
          {
            "action": "focus",
            "selector": "#formulaire button[type=\"submit\"]",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#erreur",
                "text": "Écris au moins 2 caractères."
              },
              {
                "selector": "#nom",
                "focused": true,
                "attributes": {
                  "aria-invalid": "true"
                }
              }
            ]
          },
          {
            "action": "input",
            "selector": "#nom",
            "checks": [],
            "value": " Afi "
          },
          {
            "action": "focus",
            "selector": "#formulaire button[type=\"submit\"]",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#retour",
                "text": "Note ajoutée : Afi"
              },
              {
                "selector": "#nom",
                "value": "",
                "focused": true,
                "attributes": {
                  "aria-invalid": null
                }
              },
              {
                "selector": "#erreur",
                "text": ""
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Placer un compteur visible dans une référence",
      "why_fr": "L’interface ne suit pas les changements de current.",
      "fix_fr": "Utilise useState pour les données affichées."
    },
    {
      "error": "Déplacer le focus pendant le rendu",
      "why_fr": "Le nœud peut ne pas exister et les frappes sont perturbées.",
      "fix_fr": "Déplace le focus dans une action explicite."
    }
  ],
  "quiz": [
    {
      "question": "Modifier ref.current provoque-t-il un rendu ?",
      "options": [
        "Oui, comme setState dans tous les cas.",
        "Seulement si current est un nombre.",
        "Non, il faut un état pour une valeur affichée qui change."
      ],
      "answer": 2,
      "explanation": "Une référence conserve une valeur technique sans notifier React d’une mise à jour visible.",
      "id": "react-m5-01-q1"
    },
    {
      "question": "Quand appeler focus dans cet exercice ?",
      "options": [
        "Avant que le composant soit monté.",
        "Dans le gestionnaire d’une action après la création du champ.",
        "À chaque calcul du JSX."
      ],
      "answer": 1,
      "explanation": "Le nœud existe au moment de l’action et le déplacement répond à une intention explicite.",
      "id": "react-m5-01-q2"
    },
    {
      "question": "Quelle propriété donne accès au nœud associé ?",
      "options": [
        "current.",
        "value directement sur la référence.",
        "innerHTML sur le composant."
      ],
      "answer": 0,
      "explanation": "React place le nœud DOM dans la propriété current de la référence.",
      "id": "react-m5-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "référence",
      "definition": "Objet persistant dont current peut désigner un nœud ou une valeur non affichée."
    },
    {
      "term": "focus",
      "definition": "Position active du clavier dans l’interface."
    },
    {
      "term": "état visible",
      "definition": "Donnée dont la modification doit entraîner une nouvelle présentation."
    }
  ],
  "recap_fr": [
    "Utiliser useRef pour atteindre un nœud dans un gestionnaire.",
    "Conserver dans useState les données qui déterminent l’affichage.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "référence",
    "focus",
    "état visible"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrais React19.3.1 et ReactDOM19.3.1 auto-hébergés ; JSX transformé localement dans une interface isolée. React, useState, useEffect, useRef et root sont fournis. Sans import, installation, serveur ni compte. Le service chargerAteliers de M6 est simulé et local, sans requête HTTP. Chaque essai recrée l’interface ; source et progression sont conservées, pas l’état temporaire des composants.",
  "sources": [
    {
      "title": "React — Manipulating the DOM with Refs",
      "url": "https://react.dev/learn/manipulating-the-dom-with-refs",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — useRef",
      "url": "https://react.dev/reference/react/useRef",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un composant décrit son interface avec JSX et laisse React mettre le document à jour. Certaines actions demandent pourtant un accès précis à un élément déjà créé : placer le focus dans un champ, par exemple. useRef donne un objet conservé entre les rendus. Pour une référence de champ, initialise-le avec null, puis passe cet objet à l’attribut ref du contrôle. Après la création du nœud, React place ce nœud dans la propriété current.

Dans le premier exemple, la saisie est contrôlée par un état texte. Le bouton Atteindre la note appelle saisie.current.focus dans son gestionnaire onClick. Clique ailleurs, tape une note, puis utilise ce bouton : le focus rejoint le champ sans effacer la valeur. Le gestionnaire s’exécute après l’apparition du contrôle. Au moment du calcul initial du JSX, current peut encore valoir null ; ne cherche donc pas à donner le focus pendant le rendu.

Une référence n’est pas un remplacement de useState. Modifier ref.current ne demande pas de nouveau rendu. C’est utile pour conserver un accès technique dont la valeur n’a pas besoin d’être affichée, mais un compteur visible doit rester dans l’état. Les exercices distinguent ces deux responsabilités : une référence pour l’élément à atteindre, un état pour le nombre que l’interface doit suivre. Lire ou modifier une référence pendant le rendu, en dehors de son initialisation appropriée, rend le comportement difficile à raisonner.

Le formulaire du second exemple réutilise la référence dans deux branches. Une soumission invalide conserve la saisie, affiche une correction et replace le focus sur le champ concerné. Une soumission valide met à jour le retour, vide l’état contrôlé et replace aussi le focus pour préparer une autre note. Le déplacement est provoqué par une action explicite ; il ne doit pas voler le focus à chaque frappe. L’aide, l’erreur reliée par aria-describedby et aria-invalid restent nécessaires : le focus seul n’explique pas la règle.

Avec deux contrôles, utilise deux références distinctes et décide quel champ est le premier invalide. Les règles sont calculées à partir des états contrôlés. La référence sert ensuite uniquement à atteindre le bon nœud. Le DOM affiché doit toujours venir du JSX : évite de remplacer toi-même les enfants que React gère ou d’écrire un compteur directement dans textContent.

Les tests alternent saisie, erreur, correction et actions répétées. Ils vérifient la valeur conservée, le texte rendu et le champ réellement focalisé. Ils ne mesurent pas l’expérience complète d’un lecteur d’écran, qui demande une vérification humaine supplémentaire. Les notes sont fictives et temporaires : chaque essai recrée les composants. Nunya conserve le code et la progression, pas les valeurs de cet aperçu.

## Exemple guidé 1

```jsx
function App() {
  const [texte, setTexte] = useState('');
  const saisie = useRef(null);
  return <main><h1>Note fictive</h1><label htmlFor="note">Note</label><input id="note" ref={saisie} value={texte} onChange={e => setTexte(e.target.value)} /><button id="atteindre" type="button" onClick={() => saisie.current.focus()}>Atteindre la note</button><p id="apercu">{texte}</p></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
function App() {
  const [nom, setNom] = useState('');
  const [erreur, setErreur] = useState('');
  const [retour, setRetour] = useState('');
  const champ = useRef(null);
  function soumettre(event) {
    event.preventDefault();
    const texte = nom.trim();
    if (texte.length < 2) {
      setErreur('Écris au moins 2 caractères.');
      setRetour('');
      champ.current.focus();
      return;
    }
    setErreur('');
    setRetour('Note ajoutée : ' + texte);
    setNom('');
    champ.current.focus();
  }
  return <main><h1>Ajout fictif</h1><form id="formulaire" noValidate onSubmit={soumettre}><label htmlFor="nom">Note</label><input id="nom" ref={champ} value={nom} onChange={e => setNom(e.target.value)} aria-invalid={erreur ? 'true' : undefined} aria-describedby={erreur ? 'aide erreur' : 'aide'} /><p id="aide">Au moins 2 caractères après retrait des espaces extérieurs.</p><p id="erreur" aria-live="polite">{erreur}</p><button type="submit">Ajouter à l’essai</button></form><p id="retour" role="status">{retour}</p></main>;
}
root.render(<App />);
```

