---
{
  "id": "react-m1-03",
  "title_fr": "Transmettre des propriétés et composer des composants",
  "course": "react-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "react-m1-02"
  ],
  "outcomes": [
    "Passer des props explicites d’un parent à ses composants enfants.",
    "Calculer une présentation sans modifier les props reçues."
  ],
  "idea_fr": "Un composant réutilisable reçoit des données en lecture et décrit leur présentation.",
  "analogy_fr": "Un modèle de fiche reste identique quand plusieurs clubs lui fournissent des intitulés différents.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\" data-titre=\"Lecture\" data-ville=\"Lomé\"></div>",
      "expected_output": "Une fiche affiche Lecture et Lomé à partir de props transmises par App.",
      "trace_fr": [
        "Ligne 1 : config fournit les chaînes de la fixture.",
        "Lignes 2–3 : Fiche lit son objet props sans le modifier.",
        "Lignes 4–5 : App compose la fiche et fournit titre et ville.",
        "Ligne 6 : le rendu du parent entraîne celui de l’enfant."
      ],
      "browser_test": {
        "description_fr": "Transmission parent vers enfant",
        "checks": [
          {
            "selector": "#titre",
            "text": "Lecture"
          },
          {
            "selector": "#ville",
            "text": "Lomé"
          },
          {
            "selector": "#app main article",
            "count": 1
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Les deux paragraphes affichent chacun « Atelier : Chant », sans préfixe répété.",
      "trace_fr": [
        "Ligne 1 : la déstructuration fournit id et fiche comme noms locaux.",
        "Ligne 2 : une nouvelle chaîne est calculée, sans affecter fiche.titre.",
        "Ligne 3 : id est transmis au véritable paragraphe.",
        "Lignes 4–6 : deux utilisations partagent les mêmes données en lecture.",
        "Ligne 7 : le rendu produit deux textes identiques, sans mutation cumulative."
      ],
      "browser_test": {
        "description_fr": "Objet partagé mais jamais réécrit",
        "checks": [
          {
            "selector": "#a",
            "text": "Atelier : Chant"
          },
          {
            "selector": "#b",
            "text": "Atelier : Chant"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Noms de props différents",
      "why_fr": "L’enfant lit une propriété qui n’a pas été fournie.",
      "fix_fr": "Aligne les noms dans l’appel et le paramètre."
    },
    {
      "error": "Modifier un objet reçu",
      "why_fr": "Plusieurs enfants peuvent partager cette référence.",
      "fix_fr": "Calcule une valeur locale à la place."
    },
    {
      "error": "Oublier de transmettre id au DOM",
      "why_fr": "Le marqueur demandé n’apparaît pas.",
      "fix_fr": "Place id={id} sur l’élément concerné."
    }
  ],
  "quiz": [
    {
      "question": "Comment un enfant doit-il traiter ses props ?",
      "options": [
        "Comme un objet à réécrire avant chaque rendu.",
        "Comme une copie toujours indépendante même si elle contient un objet partagé.",
        "Comme des données à lire sans les modifier."
      ],
      "answer": 2,
      "explanation": "Une mutation d’un objet reçu peut affecter d’autres composants.",
      "id": "react-m1-03-q1"
    },
    {
      "question": "Que représente function Fiche({titre,ville}) ?",
      "options": [
        "Une lecture directe de tous les titres du document.",
        "Une déstructuration des propriétés du paramètre objet.",
        "Un fragment JSX dans le nom de la fonction."
      ],
      "answer": 1,
      "explanation": "La syntaxe du paramètre appartient à JavaScript.",
      "id": "react-m1-03-q2"
    },
    {
      "question": "La prop id d’un composant personnalisé crée-t-elle seule un attribut sur son article ?",
      "options": [
        "Non, le composant doit la transmettre à l’élément DOM.",
        "Oui, elle crée automatiquement un article portant cet id.",
        "Oui, elle renomme le composant."
      ],
      "answer": 0,
      "explanation": "Le composant choisit les éléments et propriétés qu’il retourne.",
      "id": "react-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "props",
      "definition": "Informations transmises à un composant par son parent."
    },
    {
      "term": "composition",
      "definition": "Assemblage de composants pour former une interface."
    },
    {
      "term": "déstructuration",
      "definition": "Extraction de propriétés d’un objet dans des noms locaux."
    },
    {
      "term": "immutabilité des props",
      "definition": "Règle selon laquelle un composant ne réécrit pas les données reçues."
    }
  ],
  "recap_fr": [
    "Passer des props explicites d’un parent à ses composants enfants.",
    "Calculer une présentation sans modifier les props reçues.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "props",
    "composition",
    "déstructuration",
    "immutabilité des props"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — Passer des props à un composant",
      "url": "https://react.dev/learn/passing-props-to-a-component",
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

Une fiche écrite avec un titre fixe ne peut présenter qu’un atelier. Pour réutiliser sa structure, le parent lui transmet des propriétés, souvent appelées props. L’écriture <Fiche titre="Lecture" ville="Lomé" /> utilise deux noms choisis pour notre composant. React appelle ensuite Fiche avec un objet qui contient ces valeurs. Dans function Fiche(props), on peut lire props.titre et props.ville pour produire le JSX.

Une prop peut contenir une chaîne, un nombre, un objet ou une fonction. titre="Lecture" transmet une chaîne fixe ; places={3} transmet un nombre ; atelier={fiche} transmet la valeur de la variable fiche. Les accolades utilisées dans la leçon précédente servent donc aussi à fournir des données aux composants personnalisés. Les noms de props doivent correspondre entre le parent qui les fournit et l’enfant qui les lit.

On peut écrire function Fiche({ titre, ville }) au lieu de function Fiche(props). Les accolades du paramètre utilisent la déstructuration d’objet JavaScript : elles créent des noms locaux pour les propriétés reçues. Elles ne sont pas du JSX, même si la même ponctuation apparaît dans la description retournée. Les deux écritures donnent accès aux mêmes données ; choisis celle qui rend le petit composant le plus lisible.

La composition assemble plusieurs composants. App peut afficher une entête puis deux Fiche avec des titres différents. Chaque utilisation possède ses propres props ; il n’est pas nécessaire de recopier le code de présentation. Une prop nommée id ne devient un attribut DOM que si le composant la transmet à un élément, par exemple <article id={id}>. Un composant personnalisé n’ajoute pas automatiquement un conteneur portant son nom.

Les props sont des données à lire, pas une mémoire que l’enfant peut réécrire. Si une prop contient un objet, lui affecter fiche.titre = ... modifierait cet objet partagé avec le parent ou d’autres enfants. Dans le second exemple, les deux indications reçoivent volontairement le même objet. Chacune calcule une chaîne locale texte, sans changer fiche.titre. Elles affichent donc exactement un préfixe, indépendamment de leur ordre de rendu.

Cette règle permet de comprendre un rendu à partir de ses entrées. Pour les mêmes valeurs reçues, le composant doit décrire le même résultat sans déformer les données des autres. Une variable locale, comme const texte = "Atelier : " + fiche.titre, est adaptée au calcul de présentation. Pour des informations qui changent après une action, nous introduirons ensuite l’état et sa fonction de mise à jour.

Dans ces ateliers, la configuration vient explicitement des attributs data-* de #app. Le parent la transforme si besoin, puis la transmet ; les petits composants n’ont pas à rechercher leurs données ailleurs dans le document. Teste plusieurs titres et lieux. Une présentation correcte garde sa structure, ses identifiants et son texte associé lorsque les valeurs changent, sans import, service distant ni dépendance à une leçon précédente.

## Exemple guidé 1

```javascript
const config = document.querySelector("#app").dataset; // 1
function Fiche(props) { // 2
  return <article><h2 id="titre">{props.titre}</h2><p id="ville">{props.ville}</p></article>; // 3
}
function App() { // 4
  return <main><Fiche titre={config.titre} ville={config.ville} /></main>; // 5
}
root.render(<App />); // 6
```

Résultat attendu dans l’aperçu : Une fiche affiche Lecture et Lomé à partir de props transmises par App.

Trace :

- Ligne 1 : config fournit les chaînes de la fixture.
- Lignes 2–3 : Fiche lit son objet props sans le modifier.
- Lignes 4–5 : App compose la fiche et fournit titre et ville.
- Ligne 6 : le rendu du parent entraîne celui de l’enfant.

## Exemple guidé 2

```javascript
function Indication({ id, fiche }) { // 1
  const texte = "Atelier : " + fiche.titre; // 2
  return <p id={id}>{texte}</p>; // 3
}
function App() { // 4
  const fiche = { titre: "Chant" }; // 5
  return <main><Indication id="a" fiche={fiche} /><Indication id="b" fiche={fiche} /></main>; // 6
}
root.render(<App />); // 7
```

Résultat attendu dans l’aperçu : Les deux paragraphes affichent chacun « Atelier : Chant », sans préfixe répété.

Trace :

- Ligne 1 : la déstructuration fournit id et fiche comme noms locaux.
- Ligne 2 : une nouvelle chaîne est calculée, sans affecter fiche.titre.
- Ligne 3 : id est transmis au véritable paragraphe.
- Lignes 4–6 : deux utilisations partagent les mêmes données en lecture.
- Ligne 7 : le rendu produit deux textes identiques, sans mutation cumulative.

