---
{
  "id": "react-m1-02",
  "title_fr": "Insérer des expressions et écrire les attributs JSX",
  "course": "react-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "react-m1-01"
  ],
  "outcomes": [
    "Utiliser les accolades pour insérer une valeur ou un calcul dans le JSX.",
    "Écrire fragments, className et htmlFor sans perdre la structure HTML."
  ],
  "idea_fr": "Les accolades insèrent des valeurs JavaScript ; les noms JSX expriment précisément les propriétés de l’interface.",
  "analogy_fr": "Un modèle d’affiche comporte des emplacements qui reçoivent les données du club sans redessiner toute sa structure.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\" data-club=\"Club Baobab\" data-places=\"4\"></div>",
      "expected_output": "Le titre affiche Club Baobab ; le paragraphe affiche « 5 places après ajout » ; main possède la classe fiche.",
      "trace_fr": [
        "Ligne 1 : la configuration vient du dataset explicitement fourni.",
        "Ligne 2 : \"4\" devient le nombre 4.",
        "Lignes 3–4 : le composant décrit des valeurs dans les accolades et une classe fixe.",
        "Ligne 5 : React monte le document ; le calcul vaut 5."
      ],
      "browser_test": {
        "description_fr": "Expressions et classe",
        "checks": [
          {
            "selector": "#club",
            "text": "Club Baobab"
          },
          {
            "selector": "#places",
            "text": "5 places après ajout"
          },
          {
            "selector": "#app > main",
            "classes": [
              "fiche"
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le label « Titre de l’atelier » est associé à l’input recherche ; aucun conteneur div supplémentaire n’est ajouté.",
      "trace_fr": [
        "Ligne 1 : App est un composant.",
        "Ligne 2 : la chaîne recherche sert à deux propriétés.",
        "Ligne 3 : le fragment regroupe label et input sans élément DOM propre.",
        "Ligne 4 : le rendu produit deux enfants directs de #app, avec for et id concordants."
      ],
      "browser_test": {
        "description_fr": "Fragment et association du label",
        "checks": [
          {
            "selector": "#app > label",
            "text": "Titre de l’atelier",
            "attributes": {
              "for": "recherche"
            }
          },
          {
            "selector": "#app > input#recherche",
            "attributes": {
              "placeholder": "Exemple : lecture"
            }
          },
          {
            "selector": "#app > div",
            "exists": false
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre la variable entre guillemets",
      "why_fr": "La chaîne du nom est affichée.",
      "fix_fr": "Utilise une expression entre accolades."
    },
    {
      "error": "Écrire for au lieu de htmlFor",
      "why_fr": "Le nom JSX attendu est différent du nom HTML.",
      "fix_fr": "Utilise htmlFor et vérifie l’attribut for rendu."
    },
    {
      "error": "Ajouter un div inutile",
      "why_fr": "La structure attendue change.",
      "fix_fr": "Utilise un fragment pour les éléments voisins."
    }
  ],
  "quiz": [
    {
      "question": "Que signifie <p>{nom}</p> ?",
      "options": [
        "Afficher toujours le mot nom.",
        "Créer une balise nom.",
        "Afficher la valeur de la variable nom."
      ],
      "answer": 2,
      "explanation": "Les accolades évaluent l’expression JavaScript.",
      "id": "react-m1-02-q1"
    },
    {
      "question": "Quel couple relie un label et un input en JSX ?",
      "options": [
        "Deux textes identiques sans identifiant.",
        "htmlFor sur label et id correspondant sur input.",
        "className sur label et name identique sur main."
      ],
      "answer": 1,
      "explanation": "L’association rend le contrôle identifiable par son label.",
      "id": "react-m1-02-q2"
    },
    {
      "question": "Quel effet possède un fragment <>...</> sur le DOM ?",
      "options": [
        "Il regroupe le JSX sans ajouter un élément parent.",
        "Il ajoute une balise fragment visible.",
        "Il remplace automatiquement chaque enfant par une div."
      ],
      "answer": 0,
      "explanation": "Le groupe JSX n’impose pas un conteneur DOM supplémentaire.",
      "id": "react-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "expression JSX",
      "definition": "Expression JavaScript insérée entre accolades dans le balisage."
    },
    {
      "term": "fragment",
      "definition": "Groupe de plusieurs éléments sans parent DOM ajouté."
    },
    {
      "term": "className",
      "definition": "Propriété JSX correspondant à la classe HTML."
    },
    {
      "term": "htmlFor",
      "definition": "Propriété JSX du label associant son contrôle par id."
    }
  ],
  "recap_fr": [
    "Utiliser les accolades pour insérer une valeur ou un calcul dans le JSX.",
    "Écrire fragments, className et htmlFor sans perdre la structure HTML.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "expression JSX",
    "fragment",
    "className",
    "htmlFor"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — Écrire du balisage avec JSX",
      "url": "https://fr.react.dev/learn/writing-markup-with-jsx",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — JavaScript dans JSX",
      "url": "https://fr.react.dev/learn/javascript-in-jsx-with-curly-braces",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une interface fixe devient plus utile quand elle présente des données. Dans le contenu JSX, le texte écrit directement est littéral : <h1>club</h1> affiche le mot club. Avec <h1>{club}</h1>, les accolades demandent l’évaluation de la variable JavaScript club. Cette variable doit exister dans le contexte du composant. Les accolades ne sont pas des caractères à afficher ; elles relient la structure de présentation aux valeurs du programme.

Une expression peut être une lecture de propriété, une addition ou un appel de fonction qui calcule une valeur. Par exemple, {places + 1} affiche un calcul numérique si places est un nombre. Les données dataset restent des chaînes et doivent être converties avec Number pour les additions numériques. Les fixtures garantissent ici des entiers valides. Dans ces exercices, une lecture initiale du dataset de #app fournit la configuration du laboratoire ; elle ne sert pas à modifier manuellement les enfants gérés par React.

Les guillemets et les accolades jouent aussi des rôles distincts dans les attributs. id="titre" fournit une chaîne fixe. id={identifiant} fournit la valeur d’une variable. Écrire id="identifiant" créerait littéralement cet identifiant, sans lire la variable. Ne place pas un nom de variable entre des guillemets lorsque l’objectif est d’utiliser sa valeur. Les attributs aria-* et data-* gardent leurs tirets habituels.

Certains noms diffèrent du HTML écrit dans un fichier. La classe CSS s’écrit className="fiche". Pour associer un label au contrôle dont l’id vaut recherche, on écrit htmlFor="recherche". Le DOM rendu possède ensuite les attributs class et for attendus. Le nom JSX n’oblige pas à inventer un nouveau rôle pour l’élément : un label reste un label et un input reste un véritable contrôle du navigateur.

Un composant doit retourner une seule description racine. Un fragment, écrit <> puis </>, groupe plusieurs éléments voisins sans ajouter de div au DOM. Il est utile quand un label et son input doivent rester voisins. Il ne faut donc pas attendre un élément nommé fragment dans l’inspecteur. Les balises sans enfant, comme input, se ferment explicitement dans le JSX.

Les propriétés booléennes reçoivent une expression booléenne : disabled={restantes === 0}. React rend alors l’attribut correspondant quand la valeur est vraie. La chaîne "false" n’est pas le booléen false. Pour les phrases, insérer une chaîne contenant des signes de balise affiche du texte ; nous n’injectons pas du HTML depuis les données.

Exécute les exemples, puis compare la structure réellement présente aux noms du JSX. Le champ de cette leçon est simplement présenté avec son label et son indication ; nous ne pilotons pas encore sa saisie. Les tests changent les données de configuration et vérifient les relations label/id, les classes et les calculs. Les événements et les champs contrôlés viendront dans leurs modules respectifs.

## Exemple guidé 1

```javascript
const donnees = document.querySelector("#app").dataset; // 1
const places = Number(donnees.places); // 2
function App() { // 3
  return <main className="fiche"><h1 id="club">{donnees.club}</h1><p id="places">{places + 1} places après ajout</p></main>; // 4
}
root.render(<App />); // 5
```

Résultat attendu dans l’aperçu : Le titre affiche Club Baobab ; le paragraphe affiche « 5 places après ajout » ; main possède la classe fiche.

Trace :

- Ligne 1 : la configuration vient du dataset explicitement fourni.
- Ligne 2 : "4" devient le nombre 4.
- Lignes 3–4 : le composant décrit des valeurs dans les accolades et une classe fixe.
- Ligne 5 : React monte le document ; le calcul vaut 5.

## Exemple guidé 2

```javascript
function App() { // 1
  const identifiant = "recherche"; // 2
  return ( // 3
    <>
      <label id="etiquette" htmlFor={identifiant}>Titre de l’atelier</label>
      <input id={identifiant} type="text" placeholder="Exemple : lecture" />
    </>
  );
}
root.render(<App />); // 4
```

Résultat attendu dans l’aperçu : Le label « Titre de l’atelier » est associé à l’input recherche ; aucun conteneur div supplémentaire n’est ajouté.

Trace :

- Ligne 1 : App est un composant.
- Ligne 2 : la chaîne recherche sert à deux propriétés.
- Ligne 3 : le fragment regroupe label et input sans élément DOM propre.
- Ligne 4 : le rendu produit deux enfants directs de #app, avec for et id concordants.

