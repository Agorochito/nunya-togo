---
{
  "id": "dom-m1-01",
  "title_fr": "Relier un arbre HTML à un élément JavaScript",
  "course": "javascript-dom",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Sélectionner un élément précis avec querySelector.",
    "Lire puis remplacer du texte avec textContent."
  ],
  "idea_fr": "Le DOM donne accès à des objets qui représentent les éléments de la page.",
  "analogy_fr": "Comme un plan de salle, un sélecteur indique l’endroit à atteindre avant d’y changer une affiche.",
  "examples": [
    {
      "fixture_html": "<main><h1 id=\"titre\">Ancien titre</h1><p id=\"detail\">Atelier lecture</p></main>",
      "expected_output": "Le titre devient « Bienvenue au club » et le paragraphe « Atelier du samedi ».",
      "trace_fr": [
        "Ligne 1 : la référence vise le h1 identifié, sans encore le modifier.",
        "Ligne 2 : la seconde référence vise le paragraphe.",
        "Ligne 3 : le titre reçoit la nouvelle phrase.",
        "Ligne 4 : le paragraphe reçoit son propre texte."
      ],
      "browser_test": {
        "description_fr": "Deux éléments distincts sont modifiés",
        "checks": [
          {
            "selector": "#titre",
            "text": "Bienvenue au club"
          },
          {
            "selector": "#detail",
            "text": "Atelier du samedi"
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h2 id=\"atelier\">Robotique</h2><p id=\"resume\">À préparer</p></main>",
      "expected_output": "Le résumé affiche « Programme : Robotique » ; le titre reste Robotique.",
      "trace_fr": [
        "Ligne 1 : la recherche retrouve le titre de l’atelier.",
        "Ligne 2 : nom contient la chaîne Robotique.",
        "Ligne 3 : la destination est sélectionnée séparément.",
        "Ligne 4 : la concaténation construit le résumé sans modifier la source."
      ],
      "browser_test": {
        "description_fr": "Copie calculée depuis la source",
        "checks": [
          {
            "selector": "#atelier",
            "text": "Robotique"
          },
          {
            "selector": "#resume",
            "text": "Programme : Robotique"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire sur main",
      "why_fr": "Les enfants du conteneur sont remplacés.",
      "fix_fr": "Cible le paragraphe destiné au message."
    },
    {
      "error": "Oublier le signe #",
      "why_fr": "La recherche vise un type de balise au lieu d’un identifiant.",
      "fix_fr": "Compare le sélecteur avec la fixture."
    },
    {
      "error": "Recopier une valeur fixe",
      "why_fr": "Une autre fixture possède un autre nom.",
      "fix_fr": "Lis le texte source avant la concaténation."
    }
  ],
  "quiz": [
    {
      "question": "Que retourne querySelector si rien ne correspond ?",
      "options": [
        "Une chaîne vide.",
        "Un élément créé automatiquement.",
        "null."
      ],
      "answer": 2,
      "explanation": "L’absence de correspondance est représentée par null.",
      "id": "dom-m1-01-q1"
    },
    {
      "question": "Que fait une affectation à textContent sur un conteneur ?",
      "options": [
        "Elle change le fichier source enregistré.",
        "Elle remplace son contenu textuel et ses descendants par ce texte.",
        "Elle conserve obligatoirement toutes ses balises enfants."
      ],
      "answer": 1,
      "explanation": "Il faut viser l’élément exact pour préserver la structure voisine.",
      "id": "dom-m1-01-q2"
    },
    {
      "question": "Quel sélecteur vise .titre à l’intérieur de #fiche ?",
      "options": [
        "\"#fiche .titre\".",
        "\".fiche #titre\".",
        "\"fiche.titre\"."
      ],
      "answer": 0,
      "explanation": "L’espace exprime ici une relation de descendance.",
      "id": "dom-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "DOM",
      "definition": "Arbre d’objets représentant le document dans le navigateur."
    },
    {
      "term": "sélecteur",
      "definition": "Chaîne CSS qui décrit les éléments recherchés."
    },
    {
      "term": "référence",
      "definition": "Valeur qui permet d’accéder à un objet existant."
    },
    {
      "term": "textContent",
      "definition": "Propriété qui lit ou remplace le contenu textuel d’un nœud."
    }
  ],
  "recap_fr": [
    "Sélectionner un élément précis avec querySelector.",
    "Lire puis remplacer du texte avec textContent.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "DOM",
    "sélecteur",
    "référence",
    "textContent"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — querySelector",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — textContent",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Node/textContent",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le HTML décrit une structure : un élément principal peut contenir un titre, puis plusieurs paragraphes. Le navigateur construit à partir de cette description un arbre d’objets, appelé DOM. Un élément peut avoir un parent, des enfants et des voisins. JavaScript travaille sur ces objets ; il ne réécrit pas automatiquement le fichier HTML source. Dans notre démonstration, modifier le titre change le document affiché pour cet essai seulement.

Le nom document désigne le document courant. L’appel document.querySelector("#titre") cherche le premier élément correspondant au sélecteur CSS donné. Le signe # vise un identifiant ; .annonce vise une classe ; p vise un type de balise. Le résultat est une référence vers un élément, pas son texte. Utiliser un identifiant unique évite qu’une recherche destinée au titre d’un atelier atteigne par hasard un autre titre de la page.

On peut conserver cette référence dans une constante, puis utiliser ses propriétés. Lire titre.textContent fournit son contenu textuel. Affecter titre.textContent = "Bienvenue" remplace ce contenu. Ce remplacement peut supprimer les descendants précédents : écrire sur une section entière ferait aussi disparaître son titre et ses paragraphes. Choisis donc le plus petit élément prévu pour le message, plutôt que le grand conteneur qui l’entoure.

Un sélecteur composé permet de limiter la recherche. "#fiche .titre" vise un élément de classe titre à l’intérieur de la fiche identifiée. La présence d’une autre classe titre ailleurs ne doit pas conduire à la modifier. La précision du sélecteur exprime ici une décision fonctionnelle : quelle affiche doit changer ? Elle ne dépend ni de sa couleur ni de sa position visuelle à l’écran.

Si aucun élément ne correspond, querySelector retourne null. Tenter ensuite null.textContent provoque une erreur. Commence le débogage par la concordance entre la fixture et le sélecteur : orthographe, #, classe et contexte. Si un élément est réellement facultatif dans un besoin, une condition peut vérifier sa présence avant l’écriture. Dans les exercices où un identifiant est garanti, ne masque pas une faute de sélecteur derrière une condition silencieuse.

Pour une simple phrase, textContent traite les caractères comme du texte. Une chaîne contenant des signes < et > reste une phrase ; elle ne devient pas une nouvelle balise. Nous n’avons pas besoin de construire du HTML pour annoncer un atelier. Cette méthode garde le travail centré sur le contenu et limite les interprétations imprévues des chaînes reçues.

Lis les exemples dans l’ordre numéroté et observe la page après l’exécution. Aucun clic n’est attendu dans cette leçon : le script agit une fois sur la fixture déjà présente. Les tests changent parfois l’ordre des éléments ou le texte source. Une bonne solution retrouve l’élément demandé et calcule son message depuis le document, sans supposer que le premier titre est toujours le bon.

## Exemple guidé 1

```javascript
const titre = document.querySelector("#titre"); // 1
const detail = document.querySelector("#detail"); // 2
titre.textContent = "Bienvenue au club"; // 3
detail.textContent = "Atelier du samedi"; // 4
```

Résultat attendu dans la page : Le titre devient « Bienvenue au club » et le paragraphe « Atelier du samedi ».

Trace :

- Ligne 1 : la référence vise le h1 identifié, sans encore le modifier.
- Ligne 2 : la seconde référence vise le paragraphe.
- Ligne 3 : le titre reçoit la nouvelle phrase.
- Ligne 4 : le paragraphe reçoit son propre texte.

## Exemple guidé 2

```javascript
const atelier = document.querySelector("#atelier"); // 1
const nom = atelier.textContent; // 2
const resume = document.querySelector("#resume"); // 3
resume.textContent = "Programme : " + nom; // 4
```

Résultat attendu dans la page : Le résumé affiche « Programme : Robotique » ; le titre reste Robotique.

Trace :

- Ligne 1 : la recherche retrouve le titre de l’atelier.
- Ligne 2 : nom contient la chaîne Robotique.
- Ligne 3 : la destination est sélectionnée séparément.
- Ligne 4 : la concaténation construit le résumé sans modifier la source.

