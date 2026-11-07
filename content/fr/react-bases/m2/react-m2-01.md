---
{
  "id": "react-m2-01",
  "title_fr": "Relier un clic à la mémoire locale du composant",
  "course": "react-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "react-m1-03"
  ],
  "outcomes": [
    "Passer une fonction à onClick pour traiter une action.",
    "Mettre à jour un état local avec useState pour demander un nouveau rendu."
  ],
  "idea_fr": "Une action modifie l’état avec sa fonction de mise à jour ; React redécrit alors l’interface.",
  "analogy_fr": "Chaque compteur de table possède sa propre mémoire, même si les compteurs partagent le même modèle.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le total commence à 0, devient 1 après un clic puis 2 après un second.",
      "trace_fr": [
        "Ligne 1 : React appelle App pour le premier rendu.",
        "Ligne 2 : la mémoire locale est initialisée à zéro.",
        "Lignes 3–4 : le bouton reçoit une fonction sans l’appeler.",
        "Premier clic : ajouter demande la valeur 1 ; React rend à nouveau App.",
        "Second clic : le gestionnaire du nouveau rendu demande 2.",
        "Ligne 5 : le montage initial a placé App dans le root fourni."
      ],
      "browser_test": {
        "description_fr": "Un état réellement interactif",
        "checks": [
          {
            "selector": "#total",
            "text": "0"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "1"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "2"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Lecture et Jardin commencent non appuyés. Cliquer Lecture change seulement ce bouton ; Jardin possède son propre état.",
      "trace_fr": [
        "Lignes 1–2 : chaque utilisation de Choix dispose de son propre useState.",
        "Ligne 3 : aria-pressed présente le booléen et le clic demande son inverse.",
        "Lignes 4–5 : App compose deux instances distinctes.",
        "Après Lecture : seule sa mémoire vaut true.",
        "Après Jardin puis Lecture : Jardin reste true et Lecture revient à false.",
        "Ligne 6 : App est monté une fois au lancement."
      ],
      "browser_test": {
        "description_fr": "Deux mémoires locales",
        "checks": [
          {
            "selector": "#lecture",
            "attributes": {
              "aria-pressed": "false"
            }
          },
          {
            "selector": "#jardin",
            "attributes": {
              "aria-pressed": "false"
            }
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#lecture",
            "checks": [
              {
                "selector": "#lecture",
                "attributes": {
                  "aria-pressed": "true"
                }
              },
              {
                "selector": "#jardin",
                "attributes": {
                  "aria-pressed": "false"
                }
              }
            ]
          },
          {
            "action": "click",
            "selector": "#jardin",
            "checks": [
              {
                "selector": "#jardin",
                "attributes": {
                  "aria-pressed": "true"
                }
              }
            ]
          },
          {
            "action": "click",
            "selector": "#lecture",
            "checks": [
              {
                "selector": "#lecture",
                "attributes": {
                  "aria-pressed": "false"
                }
              },
              {
                "selector": "#jardin",
                "attributes": {
                  "aria-pressed": "true"
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Appeler le gestionnaire dans le JSX",
      "why_fr": "La mise à jour se produit pendant le rendu.",
      "fix_fr": "Passe la fonction à onClick."
    },
    {
      "error": "Utiliser seulement let",
      "why_fr": "L’affectation ne planifie pas le rendu attendu.",
      "fix_fr": "Utilise la paire fournie par useState."
    },
    {
      "error": "Placer useState dans le clic",
      "why_fr": "L’appel ne suit plus les règles du composant.",
      "fix_fr": "Déclare le Hook au niveau supérieur du composant."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie useState dans const [total,setTotal] = useState(0) ?",
      "options": [
        "Deux copies du même nombre à modifier directement.",
        "Un paragraphe DOM et son sélecteur.",
        "La valeur du rendu et une fonction pour demander sa mise à jour."
      ],
      "answer": 2,
      "explanation": "La paire sépare lecture de l’état et demande de changement.",
      "id": "react-m2-01-q1"
    },
    {
      "question": "Quelle écriture attend un clic avant d’appeler ajouter ?",
      "options": [
        "onClick=\"ajouter()\".",
        "onClick={ajouter}.",
        "onClick={ajouter()}."
      ],
      "answer": 1,
      "explanation": "Le gestionnaire doit être passé comme fonction.",
      "id": "react-m2-01-q2"
    },
    {
      "question": "Deux utilisations d’un composant avec useState partagent-elles forcément leur état local ?",
      "options": [
        "Non, chaque instance possède sa mémoire.",
        "Oui, si la fonction porte le même nom.",
        "Oui, toutes les variables React sont globales."
      ],
      "answer": 0,
      "explanation": "Le code est réutilisé tandis que les instances gardent leurs états locaux.",
      "id": "react-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "onClick",
      "definition": "Prop JSX qui reçoit la fonction de réaction au clic."
    },
    {
      "term": "useState",
      "definition": "Hook fournissant une mémoire locale et sa fonction de mise à jour."
    },
    {
      "term": "instance",
      "definition": "Utilisation particulière d’un composant dans l’interface."
    },
    {
      "term": "nouveau rendu",
      "definition": "Nouvel appel de composant pour décrire son interface actuelle."
    }
  ],
  "recap_fr": [
    "Passer une fonction à onClick pour traiter une action.",
    "Mettre à jour un état local avec useState pour demander un nouveau rendu.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "onClick",
    "useState",
    "instance",
    "nouveau rendu"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — Réagir aux événements",
      "url": "https://fr.react.dev/learn/responding-to-events",
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

Un composant peut décrire un bouton, mais il doit recevoir une fonction pour réagir à son activation. En JSX, onClick={ajouter} transmet la fonction ajouter. onClick={ajouter()} l’exécuterait pendant le rendu, ce qui n’est pas l’action demandée. Une fonction fléchée comme onClick={() => setTotal(total + 1)} constitue également un gestionnaire. Le nom onClick porte une majuscule au milieu, contrairement à l’attribut HTML écrit dans une chaîne.

Pour afficher une valeur qui change au fil des actions, nous utilisons useState. L’appel const [total, setTotal] = useState(0) fournit deux valeurs : total décrit l’état de ce rendu ; setTotal permet de demander la prochaine valeur. Les crochets emploient la déstructuration de tableau JavaScript : la première position récupère la valeur, la seconde récupère la fonction. Autrement dit, useState renvoie une paire et [total, setTotal] donne un nom local à chacun de ses deux éléments, dans cet ordre. Le nom setTotal est une convention claire, pas un mot-clé imposé. useState est déjà fourni dans cet atelier ; aucun import n’est nécessaire.

L’appel useState doit rester au niveau supérieur de la fonction composant, avant le retour, et non dans un clic, une boucle ou une condition. React retrouve ainsi les mémoires du composant dans un ordre stable. La valeur initiale, ici zéro, sert à son premier montage. Lors des rendus suivants, React conserve la mémoire courante au lieu de remettre ce zéro parce que la fonction est appelée à nouveau.

Le gestionnaire demande une nouvelle valeur avec setTotal. React appelle ensuite le composant pour obtenir une nouvelle description, puis met le DOM en accord avec elle. Nous ne réécrivons pas le paragraphe par textContent. Une variable locale ordinaire, déclarée let total = 0, ne demande pas ce rendu quand on lui affecte total + 1 et se recrée lors d’un prochain appel. Ce n’est pas la mémoire visible recherchée.

L’état appartient à une instance du composant. Si App utilise deux fois Choix, chaque bouton conserve son propre booléen choisi. Cliquer sur Lecture ne doit pas sélectionner Jardin. Les deux instances peuvent partager le même code, tout en ayant des mémoires distinctes. Leurs props donnent leurs identifiants et titres ; elles ne deviennent pas une mémoire à modifier par l’enfant.

Un booléen peut alimenter à la fois une phrase et aria-pressed sur un bouton de bascule. Ce dernier attribut expose un état appuyé vrai ou faux. Le bouton reste natif, nommé et de type button. Une commande Annuler peut demander false, tandis que Basculer demande l’inverse de la valeur actuelle. Nous étudierons dans la prochaine leçon les demandes successives fondées sur un même instantané.

Observe le premier rendu puis plusieurs clics, en alternant les deux boutons quand il y en a deux. Les tests vérifient des départs et des séquences différents pour détecter un texte final écrit d’avance. La mémoire décrite ici appartient uniquement à l’interface isolée ; ni choix ni présence ne sont envoyés à un compte et l’état temporaire repart de sa valeur initiale à chaque nouvel essai.

## Exemple guidé 1

```javascript
function App() { // 1
  const [total, setTotal] = useState(0); // 2
  function ajouter() { setTotal(total + 1); } // 3
  return <main><p id="total">{total}</p><button id="plus" type="button" onClick={ajouter}>Une présence de plus</button></main>; // 4
}
root.render(<App />); // 5
```

Résultat attendu dans l’aperçu : Le total commence à 0, devient 1 après un clic puis 2 après un second.

Trace :

- Ligne 1 : React appelle App pour le premier rendu.
- Ligne 2 : la mémoire locale est initialisée à zéro.
- Lignes 3–4 : le bouton reçoit une fonction sans l’appeler.
- Premier clic : ajouter demande la valeur 1 ; React rend à nouveau App.
- Second clic : le gestionnaire du nouveau rendu demande 2.
- Ligne 5 : le montage initial a placé App dans le root fourni.

## Exemple guidé 2

```javascript
function Choix({ id, titre }) { // 1
  const [choisi, setChoisi] = useState(false); // 2
  return <button id={id} type="button" aria-pressed={choisi} onClick={() => setChoisi(!choisi)}>{titre}</button>; // 3
}
function App() { // 4
  return <main><Choix id="lecture" titre="Lecture" /><Choix id="jardin" titre="Jardin" /></main>; // 5
}
root.render(<App />); // 6
```

Résultat attendu dans l’aperçu : Lecture et Jardin commencent non appuyés. Cliquer Lecture change seulement ce bouton ; Jardin possède son propre état.

Trace :

- Lignes 1–2 : chaque utilisation de Choix dispose de son propre useState.
- Ligne 3 : aria-pressed présente le booléen et le clic demande son inverse.
- Lignes 4–5 : App compose deux instances distinctes.
- Après Lecture : seule sa mémoire vaut true.
- Après Jardin puis Lecture : Jardin reste true et Lecture revient à false.
- Ligne 6 : App est monté une fois au lancement.

