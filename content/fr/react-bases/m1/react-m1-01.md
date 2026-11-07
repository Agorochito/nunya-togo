---
{
  "id": "react-m1-01",
  "title_fr": "Décrire une interface avec un composant fonction",
  "course": "react-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Définir un composant fonction qui retourne du JSX.",
    "Afficher ce composant dans le root fourni par l’atelier."
  ],
  "idea_fr": "Un composant décrit une partie d’interface ; React transforme cette description en éléments du navigateur.",
  "analogy_fr": "Un modèle d’affiche décrit la disposition souhaitée ; il faut encore le placer dans son panneau de présentation.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Un titre « Club des curieux » et le paragraphe « Une rencontre pour apprendre ensemble. » apparaissent.",
      "trace_fr": [
        "Ligne 1 : App est déclarée ; rien n’est encore monté.",
        "Ligne 2 : son appel par React fournira une description avec un parent main.",
        "Ligne 3 : root.render demande ce rendu dans #app.",
        "React crée le titre et le paragraphe visibles à partir de la description retournée."
      ],
      "browser_test": {
        "description_fr": "Premier montage",
        "checks": [
          {
            "selector": "#app h1#titre",
            "text": "Club des curieux"
          },
          {
            "selector": "#message",
            "text": "Une rencontre pour apprendre ensemble."
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Une fiche article affiche « Lecture partagée » et « Salle du club ».",
      "trace_fr": [
        "Ligne 1 : FicheLecture nomme un composant personnalisé.",
        "Ligne 2 : la fonction retourne un article contenant deux éléments.",
        "Ligne 3 : le composant est utilisé avec une majuscule et une balise fermée.",
        "La fiche apparaît dans le conteneur de l’atelier, sans recherche manuelle de ses enfants."
      ],
      "browser_test": {
        "description_fr": "Une fiche autonome",
        "checks": [
          {
            "selector": "#app > article#fiche",
            "count": 1
          },
          {
            "selector": "#atelier",
            "text": "Lecture partagée"
          },
          {
            "selector": "#lieu",
            "text": "Salle du club"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier root.render",
      "why_fr": "Le composant est défini mais jamais monté.",
      "fix_fr": "Ajoute la demande de rendu finale."
    },
    {
      "error": "Nom en minuscule",
      "why_fr": "JSX interprète un nom de balise au lieu de la fonction.",
      "fix_fr": "Commence le composant et son usage par une majuscule."
    },
    {
      "error": "Mettre un saut de ligne après return seul",
      "why_fr": "La fonction peut retourner undefined.",
      "fix_fr": "Ouvre les parenthèses sur la même ligne que return."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne <Accueil /> lorsque Accueil est une fonction composant ?",
      "options": [
        "Une nouvelle balise native ajoutée au navigateur.",
        "Un import automatique depuis internet.",
        "Un composant personnalisé que React peut rendre."
      ],
      "answer": 2,
      "explanation": "La majuscule permet à JSX de référencer notre composant.",
      "id": "react-m1-01-q1"
    },
    {
      "question": "Que fait root.render(<App />) dans cet atelier ?",
      "options": [
        "Il sauvegarde les données du club sur un serveur.",
        "Il demande le montage de App dans le conteneur préparé.",
        "Il installe React sur l’ordinateur."
      ],
      "answer": 1,
      "explanation": "Le root est déjà créé ; render demande l’interface à afficher.",
      "id": "react-m1-01-q2"
    },
    {
      "question": "Pourquoi placer les parenthèses juste après return pour un JSX sur plusieurs lignes ?",
      "options": [
        "Pour éviter qu’un saut de ligne termine return avant la description.",
        "Pour transformer le JSX en commentaire.",
        "Pour rendre tous les éléments cliquables."
      ],
      "answer": 0,
      "explanation": "La syntaxe JavaScript de return reste applicable.",
      "id": "react-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "composant",
      "definition": "Fonction utilisée par React pour décrire une partie d’interface."
    },
    {
      "term": "JSX",
      "definition": "Extension de syntaxe transformée en JavaScript avant l’exécution."
    },
    {
      "term": "root",
      "definition": "Point de montage React préparé sur le conteneur #app."
    },
    {
      "term": "montage",
      "definition": "Première mise en place de l’interface dans le document."
    }
  ],
  "recap_fr": [
    "Définir un composant fonction qui retourne du JSX.",
    "Afficher ce composant dans le root fourni par l’atelier.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "composant",
    "JSX",
    "root",
    "montage"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — Votre premier composant",
      "url": "https://react.dev/learn/your-first-component",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Écrire du balisage avec JSX",
      "url": "https://fr.react.dev/learn/writing-markup-with-jsx",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Rendu et commit",
      "url": "https://fr.react.dev/learn/render-and-commit",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

React est une bibliothèque JavaScript pour construire des interfaces à partir de composants. Un composant fonction est une fonction dont React utilise le résultat pour décrire une partie de l’écran. Dans cette leçon, il produit un titre et un paragraphe ou une petite fiche d’atelier. Le navigateur affiche finalement des éléments HTML ordinaires. Le composant n’est pas une nouvelle sorte de balise native du navigateur.

Le nom d’un composant commence par une majuscule, par exemple App ou FicheLecture. Une balise JSX en minuscule, comme main ou h1, désigne un élément du navigateur. Une balise commençant par une majuscule, comme App, permet à React de retrouver notre fonction. Cette différence ne relève pas seulement du style du nom : elle change la manière dont la description est interprétée.

JSX est une extension de syntaxe utilisée dans le code JavaScript. Elle ressemble à du HTML, mais le navigateur ne l’exécute pas directement comme un fichier HTML. L’atelier transforme cette syntaxe avant son exécution. Tu restes dans le langage JavaScript : la fonction possède une déclaration, un corps et une instruction return. Les règles de variables et de fonctions apprises auparavant continuent de s’appliquer.

return fournit la description de l’interface. Pour répartir le JSX sur plusieurs lignes, ouvre les parenthèses juste après return et ferme-les à la fin. Sans ces parenthèses, un saut de ligne placé immédiatement après return peut terminer l’instruction trop tôt. Ferme également toutes les balises ; une balise sans enfant s’écrit avec une fermeture adaptée. Pour commencer, nous retournons un seul élément parent qui contient les autres.

L’atelier fournit déjà root, un véritable point de montage React attaché au div identifié app. L’appel root.render(<App />) demande à React d’afficher notre composant dans ce conteneur. Déclarer App sans cet appel ne suffit pas à rendre l’interface visible. Ne crée pas un second root et ne recopie pas les imports d’un tutoriel extérieur : les bibliothèques et le conteneur sont préparés pour ce laboratoire.

React gère ensuite le contenu de ce conteneur. Nous ne sélectionnons pas son titre avec querySelector pour lui affecter textContent pendant le rendu. Le composant décrit directement le résultat souhaité. Les éléments situés hors de app restent en dehors de cette interface. Les tests placent parfois un ancien paragraphe dans app et un repère à côté pour vérifier que le montage remplace bien la bonne zone.

Lance les exemples et observe le titre, la structure et le texte dans l’aperçu. Aucun clic n’est attendu pour l’instant ; les composants de cette leçon décrivent un écran fixe. Les prochains cours introduiront les données et les interactions. Ces premières fiches sont fictives et ne chargent aucun catalogue distant : leur intérêt est de comprendre le trajet fonction, JSX, rendu et DOM visible.

## Exemple guidé 1

```javascript
function App() { // 1
  return ( // 2
    <main>
      <h1 id="titre">Club des curieux</h1>
      <p id="message">Une rencontre pour apprendre ensemble.</p>
    </main>
  );
}
root.render(<App />); // 3
```

Résultat attendu dans l’aperçu : Un titre « Club des curieux » et le paragraphe « Une rencontre pour apprendre ensemble. » apparaissent.

Trace :

- Ligne 1 : App est déclarée ; rien n’est encore monté.
- Ligne 2 : son appel par React fournira une description avec un parent main.
- Ligne 3 : root.render demande ce rendu dans #app.
- React crée le titre et le paragraphe visibles à partir de la description retournée.

## Exemple guidé 2

```javascript
function FicheLecture() { // 1
  return ( // 2
    <article id="fiche">
      <h2 id="atelier">Lecture partagée</h2>
      <p id="lieu">Salle du club</p>
    </article>
  );
}
root.render(<FicheLecture />); // 3
```

Résultat attendu dans l’aperçu : Une fiche article affiche « Lecture partagée » et « Salle du club ».

Trace :

- Ligne 1 : FicheLecture nomme un composant personnalisé.
- Ligne 2 : la fonction retourne un article contenant deux éléments.
- Ligne 3 : le composant est utilisé avec une majuscule et une balise fermée.
- La fiche apparaît dans le conteneur de l’atelier, sans recherche manuelle de ses enfants.

