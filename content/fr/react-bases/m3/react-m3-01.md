---
{
  "id": "react-m3-01",
  "title_fr": "Choisir un affichage et ne rien rendre avec null",
  "course": "react-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "react-m2-03"
  ],
  "outcomes": [
    "Choisir une branche de rendu à partir de l’état.",
    "Distinguer contenu absent et contenu caché."
  ],
  "idea_fr": "Un composant décrit l’interface correspondant à son état ; une condition peut choisir du JSX ou aucun nœud à rendre.",
  "analogy_fr": "Un panneau d’information peut présenter plusieurs fiches selon la situation, sans conserver toutes les fiches visibles à la fois.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Afficher crée le paragraphe de bienvenue ; Masquer le retire du DOM.",
      "trace_fr": [
        "Le booléen commence à false.",
        "La branche initiale choisit null.",
        "Le clic met à jour l’état, puis le nouveau rendu choisit un paragraphe.",
        "Une seconde activation choisit de nouveau l’absence de nœud."
      ],
      "browser_test": {
        "description_fr": "Créer puis retirer la branche",
        "checks": [
          {
            "selector": "#message",
            "exists": false
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#basculer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#message",
                "text": "Bienvenue dans l’atelier fictif."
              }
            ]
          },
          {
            "action": "click",
            "selector": "#basculer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#message",
                "exists": false
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Deux retraits affichent Places : 0 et Complet ; Rétablir revient à deux places disponibles.",
      "trace_fr": [
        "Le nombre commence à deux.",
        "Chaque activation recalcule la quantité à partir de la précédente.",
        "La condition places>0 devient fausse à zéro.",
        "Le résultat annonce Complet sans ajouter un zéro isolé."
      ],
      "browser_test": {
        "description_fr": "Atteindre zéro puis revenir",
        "checks": [
          {
            "selector": "#ligne",
            "text": "Places : 2 Disponible"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#retirer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#nombre",
                "text": "Places : 1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#retirer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#ligne",
                "text": "Places : 0 Complet"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#retablir",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#ligne",
                "text": "Places : 2 Disponible"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Retourner \"null\"",
      "why_fr": "Une absence est transformée en texte visible.",
      "fix_fr": "Retourne null sans guillemets."
    },
    {
      "error": "Utiliser un nombre comme condition courte",
      "why_fr": "Zéro peut être rendu au lieu de disparaître.",
      "fix_fr": "Écris une comparaison booléenne explicite."
    }
  ],
  "quiz": [
    {
      "question": "Que signifie return null dans ce contexte ?",
      "options": [
        "Le mot null est affiché.",
        "Le navigateur entier est fermé.",
        "Aucun nœud n’est rendu par cette branche."
      ],
      "answer": 2,
      "explanation": "La valeur null se distingue d’une chaîne et n’efface pas automatiquement les autres composants.",
      "id": "react-m3-01-q1"
    },
    {
      "question": "Pourquoi préférer places>0 à places dans une condition && ?",
      "options": [
        "La question booléenne évite de rendre le nombre zéro involontairement.",
        "React interdit tous les nombres.",
        "Les places sont enregistrées sur internet."
      ],
      "answer": 0,
      "explanation": "Une expression numérique peut devenir un contenu ; le test doit traduire la règle.",
      "id": "react-m3-01-q2"
    },
    {
      "question": "Les boutons de cette leçon chargent-ils un serveur ?",
      "options": [
        "Oui, toute condition crée une requête.",
        "Non, ils choisissent des états locaux explicitement fictifs.",
        "Oui, dès que le texte contient catalogue."
      ],
      "answer": 1,
      "explanation": "Le rendu d’un état et une opération réseau sont deux sujets distincts.",
      "id": "react-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "rendu conditionnel",
      "definition": "Choix du contenu décrit selon une condition."
    },
    {
      "term": "branche",
      "definition": "Chemin de résultat choisi par une condition."
    },
    {
      "term": "null",
      "definition": "Valeur utilisée ici pour ne rendre aucun nœud."
    }
  ],
  "recap_fr": [
    "Choisir une branche de rendu à partir de l’état.",
    "Distinguer contenu absent et contenu caché.",
    "Vérifier les transitions et le cas zéro."
  ],
  "tags": [
    "rendu conditionnel",
    "branche",
    "null"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrai React 19.3.1 et ReactDOM 19.3.1 auto-hébergés, JSX transformé dans un document isolé. React, useState, useEffect, useRef et root sont fournis, sans import ni paquet à installer. Chaque essai recrée son interface et son état temporaire. Code et progression sauvegardables ; aucune inscription, requête ou donnée personnelle réelle.",
  "sources": [
    {
      "title": "React — Rendu conditionnel",
      "url": "https://react.dev/learn/conditional-rendering",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une interface n’affiche pas toujours la même chose. Une aide peut être absente, une activité peut devenir complète et un résultat vide doit être expliqué. React utilise les conditions JavaScript pour décrire ces situations. Le composant est rappelé lors d’un changement d’état ; il choisit alors le JSX correspondant à cette nouvelle situation. Il n’est pas nécessaire de chercher manuellement les éléments pour leur imposer un texte après chaque clic.

Tu peux utiliser if avant le return pour choisir une valeur, ou l’opérateur conditionnel dans une expression JSX. La forme condition ? contenuA : contenuB choisit l’un des deux contenus. Les accolades permettent d’utiliser cette expression dans JSX ; elles ne créent pas une condition à elles seules. Garde les branches courtes et lisibles. Pour une interface comportant plusieurs situations, une variable de contenu ou un petit composant dédié peut rendre le choix plus clair.

null représente ici une absence de rendu pour cette branche. Le texte "null" serait au contraire une chaîne visible. Un composant peut donc retourner null lorsqu’il n’a rien à présenter. Cela ne supprime pas automatiquement son parent ni les autres parties de la page. Il faut distinguer cette absence de nœud et un élément toujours présent mais caché avec une propriété ou du CSS.

La forme condition && contenu est aussi possible, mais le côté gauche mérite de l’attention. Une expression numérique égale à zéro peut afficher zéro au lieu de ne rien rendre. Pour une quantité, écris une vraie question booléenne comme places>0. Un message Complet doit être choisi explicitement si la quantité vaut zéro. La condition décrit une règle d’affichage ; elle ne réserve aucune place et ne prouve aucune donnée de serveur.

Les exemples proposent des boutons natifs pour explorer plusieurs états locaux. Active-les dans l’aperçu, reviens à un état précédent et vérifie que seul le contenu demandé apparaît. Les tests commencent chaque fois avec une interface React neuve et attendent son rendu après les interactions. Ton code et ta progression peuvent être sauvegardés, pas ces changements temporaires. Aucune requête n’est envoyée. Explique quelle variable choisit la branche, ce qui apparaît à zéro et ce qu’un retour null retire réellement du résultat. Les chargements asynchrones seront abordés dans un module distinct.

## Exemple guidé 1

```javascript
function App() {
  const [visible, setVisible] = useState(false);
  return <main>
    <button id="basculer" type="button" onClick={() => setVisible(v => !v)}>{visible ? "Masquer" : "Afficher"}</button>
    {visible ? <p id="message">Bienvenue dans l’atelier fictif.</p> : null}
  </main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
function App() {
  const [places, setPlaces] = useState(2);
  return <main>
    <button id="retirer" type="button" onClick={() => setPlaces(n => Math.max(0, n - 1))}>Retirer une place fictive</button>
    <button id="retablir" type="button" onClick={() => setPlaces(2)}>Rétablir</button>
    <section id="ligne"><p id="nombre">Places : {places}</p>{" "}{places > 0 ? <p id="etat">Disponible</p> : <p id="etat">Complet</p>}</section>
  </main>;
}
root.render(<App />);
```

