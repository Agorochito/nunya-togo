---
{
  "id": "react-m4-01",
  "title_fr": "Contrôler les champs par un état React",
  "course": "react-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "react-m3-03"
  ],
  "outcomes": [
    "Piloter une saisie avec value ou checked et onChange.",
    "Conserver les labels et les relations HTML utiles."
  ],
  "idea_fr": "Un champ contrôlé reçoit sa valeur depuis l’état et son événement onChange transmet les modifications à cet état.",
  "analogy_fr": "Le champ et l’aperçu lisent le même carnet de brouillon : une mise à jour du carnet remet les deux en accord.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Saisir Afi affiche Bonjour Afi ; Effacer vide le champ et rend En attente.",
      "trace_fr": [
        "La valeur initiale de l’état est une chaîne vide.",
        "onChange transmet le texte à setNom.",
        "Le nouveau rendu décrit ensemble le champ et l’aperçu.",
        "Le bouton remet l’état à vide."
      ],
      "browser_test": {
        "description_fr": "Saisie et remise à zéro",
        "checks": [
          {
            "selector": "#nom",
            "value": ""
          },
          {
            "selector": "#apercu",
            "text": "En attente."
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#nom",
            "wait_ms": 40,
            "value": "Afi",
            "checks": [
              {
                "selector": "#apercu",
                "text": "Bonjour Afi"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#effacer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#nom",
                "value": ""
              },
              {
                "selector": "#apercu",
                "text": "En attente."
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "La case cochée annonce Rappel actif ; Annuler le rappel la décoche et remet Rappel inactif.",
      "trace_fr": [
        "checked reçoit un booléen d’état.",
        "L’événement lit la nouvelle propriété checked.",
        "Le même état choisit le message.",
        "Une action indépendante peut aussi remettre l’état à false."
      ],
      "browser_test": {
        "description_fr": "Cocher puis annuler",
        "checks": [
          {
            "selector": "#rappel",
            "checked": false
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#rappel",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#rappel",
                "checked": true
              },
              {
                "selector": "#retour",
                "text": "Rappel actif"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#annuler",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#rappel",
                "checked": false
              },
              {
                "selector": "#retour",
                "text": "Rappel inactif"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Passer value sans mise à jour",
      "why_fr": "Le rendu réimpose une valeur figée.",
      "fix_fr": "Relie onChange au setter de l’état."
    },
    {
      "error": "Lire value pour une checkbox",
      "why_fr": "Une chaîne est confondue avec un booléen de sélection.",
      "fix_fr": "Lis checked et stocke un booléen."
    }
  ],
  "quiz": [
    {
      "question": "Que doit accompagner value dans ces champs contrôlés ?",
      "options": [
        "Un effet réseau obligatoire.",
        "Un tableau de textes anciens.",
        "Un gestionnaire qui met l’état à jour depuis la saisie."
      ],
      "answer": 2,
      "explanation": "Sans mise à jour de l’état, le rendu continue d’imposer la valeur précédente.",
      "id": "react-m4-01-q1"
    },
    {
      "question": "Quelle propriété contrôle la sélection d’une checkbox ?",
      "options": [
        "checked.",
        "value dans tous les cas.",
        "La longueur de son label."
      ],
      "answer": 0,
      "explanation": "checked est un booléen de sélection ; value sert à une autre donnée du contrôle.",
      "id": "react-m4-01-q2"
    },
    {
      "question": "Pourquoi commencer un texte contrôlé par une chaîne vide ?",
      "options": [
        "Pour interdire ensuite toute saisie.",
        "Pour conserver un mode de valeur cohérent dès le premier rendu.",
        "Pour créer un compte anonyme."
      ],
      "answer": 1,
      "explanation": "Le passage involontaire d’une valeur absente à une chaîne mélange deux modes de contrôle.",
      "id": "react-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "champ contrôlé",
      "definition": "Contrôle dont la valeur affichée est pilotée par l’état du composant."
    },
    {
      "term": "onChange",
      "definition": "Prop de gestion des changements du contrôle React."
    },
    {
      "term": "brouillon",
      "definition": "Valeurs temporaires en cours d’édition, sans enregistrement réel ici."
    }
  ],
  "recap_fr": [
    "Piloter une saisie avec value ou checked et onChange.",
    "Conserver les labels et les relations HTML utiles.",
    "Dériver l’aperçu depuis le même brouillon."
  ],
  "tags": [
    "champ contrôlé",
    "onChange",
    "brouillon"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrai React 19.3.1 et ReactDOM 19.3.1 auto-hébergés, JSX transformé dans un document isolé. React, useState, useEffect, useRef et root sont fournis, sans import ni paquet à installer. Chaque essai recrée son interface et son état temporaire. Code et progression sauvegardables ; aucune inscription, requête ou donnée personnelle réelle.",
  "sources": [
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

Le module précédent choisissait des critères avec des boutons. Un champ de texte permet maintenant une saisie libre. En React, un input contrôlé reçoit value depuis une variable d’état et un onChange qui met cette variable à jour. L’interface décrit alors la valeur voulue à chaque rendu. Écrire seulement value sans traitement de changement peut rendre le champ figé, même si sa présentation ressemble à une zone modifiable.

Le gestionnaire peut lire e.target.value pendant l’événement puis appeler la fonction de mise à jour. React déclenche onChange pour les modifications de saisie prises en charge par ce contrôle. Le prochain rendu utilise le nouvel état pour le champ et pour l’aperçu. Il n’est pas nécessaire de rechercher le paragraphe et de réécrire textContent manuellement : cette présentation reste décrite par le composant.

Un texte contrôlé doit garder une valeur textuelle cohérente au fil des rendus, notamment une chaîne vide au départ si aucune donnée n’existe. Passer de undefined à une chaîne mélange les modes non contrôlé et contrôlé. defaultValue convient à une autre intention, celle d’une valeur initiale non pilotée ensuite de la même façon. Nos exercices utilisent value et des états de chaîne pour rendre leurs règles explicites.

Pour une checkbox, la propriété contrôlée est checked et le gestionnaire lit e.target.checked, un booléen. Sa propriété value ne signifie pas qu’elle est cochée. Un bouton peut aussi remettre l’état à false et faire évoluer le champ par le prochain rendu. Les labels restent nécessaires : JSX utilise htmlFor pour relier leur attribut au contrôle identifié. Une interface React ne remplace pas ces relations HTML par une logique d’état.

Les aperçus utilisent les valeurs comme expressions textuelles JSX. Un texte ressemblant à une balise doit rester une donnée visible, sans création de HTML issu de saisie. Les jeux de départ sont fictifs et parfois fournis par les attributs data-nom ou data-ville de #app, annoncés dans la consigne. Chaque test recrée son interface ; effacer le brouillon ne supprime pas un compte ni un fichier réel. Saisis deux textes, efface avec le bouton, puis recommence. Explique enfin la boucle événement, mise à jour d’état et rendu, ainsi que la raison pour laquelle le champ et l’aperçu ne doivent pas conserver deux copies concurrentes du même texte.

## Exemple guidé 1

```javascript
function App() {
  const [nom, setNom] = useState("");
  return <main><label htmlFor="nom">Prénom fictif</label><input id="nom" value={nom} onChange={e => setNom(e.target.value)} aria-describedby="apercu" /><p id="apercu" aria-live="polite">{nom === "" ? "En attente." : "Bonjour " + nom}</p><button id="effacer" type="button" onClick={() => setNom("")}>Effacer</button></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
function App() {
  const [rappel, setRappel] = useState(false);
  return <main><label htmlFor="rappel"><input id="rappel" type="checkbox" checked={rappel} onChange={e => setRappel(e.target.checked)} /> Rappel fictif</label><p id="retour" aria-live="polite">{rappel ? "Rappel actif" : "Rappel inactif"}</p><button id="annuler" type="button" onClick={() => setRappel(false)}>Annuler le rappel</button></main>;
}
root.render(<App />);
```

