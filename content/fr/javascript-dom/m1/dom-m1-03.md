---
{
  "id": "dom-m1-03",
  "title_fr": "Parcourir une collection et prévoir le cas vide",
  "course": "javascript-dom",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "dom-m1-02"
  ],
  "outcomes": [
    "Parcourir une NodeList avec for...of.",
    "Produire un résultat correct quand la sélection est vide."
  ],
  "idea_fr": "Une sélection multiple demande un traitement de collection, même lorsqu’elle ne contient aucun élément.",
  "analogy_fr": "Une liste de présence peut avoir plusieurs lignes ou aucune ; le bilan doit rester compréhensible.",
  "examples": [
    {
      "fixture_html": "<main><ul id=\"liste\"><li class=\"materiel\">Cahier</li><li class=\"materiel\">Crayon</li></ul><p id=\"bilan\">À calculer</p></main>",
      "expected_output": "Les lignes deviennent « Cahier : prêt », « Crayon : prêt » ; le bilan affiche « 2 objets ».",
      "trace_fr": [
        "Ligne 1 : lignes contient les deux éléments de matériel, dans l’ordre.",
        "Ligne 2 : le premier puis le second élément sont parcourus.",
        "Ligne 3 : chaque texte existant reçoit le suffixe, une seule fois.",
        "Ligne 4 : length vaut 2 et le bilan est écrit hors de la boucle."
      ],
      "browser_test": {
        "description_fr": "Traitement de toute la liste",
        "checks": [
          {
            "selector": "#liste .materiel",
            "texts": [
              "Cahier : prêt",
              "Crayon : prêt"
            ]
          },
          {
            "selector": "#bilan",
            "text": "2 objets"
          }
        ]
      }
    },
    {
      "fixture_html": "<main><ul id=\"inscrits\"></ul><p id=\"bilan\">Ancien message</p></main>",
      "expected_output": "La liste reste vide et le bilan affiche « Aucun membre ».",
      "trace_fr": [
        "Ligne 1 : la recherche fournit une NodeList de longueur 0.",
        "Ligne 2 : l’accumulateur commence comme chaîne vide.",
        "Lignes 3–4 : aucun tour ne s’exécute.",
        "Ligne 5 : la branche vide remplace le message.",
        "Ligne 6 : le bilan est écrit même sans membre."
      ],
      "browser_test": {
        "description_fr": "Cas vide explicite",
        "checks": [
          {
            "selector": "#inscrits .membre",
            "count": 0
          },
          {
            "selector": "#bilan",
            "text": "Aucun membre"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser querySelector pour tout traiter",
      "why_fr": "Une seule référence est obtenue.",
      "fix_fr": "Utilise querySelectorAll puis une boucle."
    },
    {
      "error": "Écrire uniquement dans la boucle",
      "why_fr": "Le cas vide ne produit aucun bilan.",
      "fix_fr": "Initialise puis écris le bilan après le parcours."
    },
    {
      "error": "Confondre taille et filtre",
      "why_fr": "Tous les éléments ne satisfont pas la condition.",
      "fix_fr": "Garde un compteur conditionnel distinct."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut la longueur d’une NodeList sans correspondance ?",
      "options": [
        "null.",
        "1, avec un élément vide.",
        "0."
      ],
      "answer": 2,
      "explanation": "Une sélection multiple vide reste une collection utilisable.",
      "id": "dom-m1-03-q1"
    },
    {
      "question": "Quel objet reçoit textContent dans une boucle for...of ?",
      "options": [
        "Le sélecteur CSS lui-même.",
        "Chaque élément courant.",
        "La variable length."
      ],
      "answer": 1,
      "explanation": "La collection permet de parcourir les références vers les éléments.",
      "id": "dom-m1-03-q2"
    },
    {
      "question": "Une NodeList obtenue par querySelectorAll ajoute-t-elle automatiquement un futur élément correspondant ?",
      "options": [
        "Non, la sélection est statique.",
        "Oui, elle surveille toutes les modifications.",
        "Seulement si son texte est vide."
      ],
      "answer": 0,
      "explanation": "Une nouvelle recherche est nécessaire pour obtenir les nouvelles correspondances.",
      "id": "dom-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "NodeList",
      "definition": "Collection de nœuds retournée ici par querySelectorAll."
    },
    {
      "term": "collection statique",
      "definition": "Sélection qui ne reçoit pas automatiquement les nouveaux éléments."
    },
    {
      "term": "état vide",
      "definition": "Situation où une collection ne contient aucun élément."
    },
    {
      "term": "accumulateur",
      "definition": "Variable initialisée puis mise à jour au fil d’un parcours."
    }
  ],
  "recap_fr": [
    "Parcourir une NodeList avec for...of.",
    "Produire un résultat correct quand la sélection est vide.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "NodeList",
    "collection statique",
    "état vide",
    "accumulateur"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — querySelectorAll",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — textContent",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Node/textContent",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — dataset",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

querySelector fournit au maximum un élément. Pour traiter toutes les lignes d’une liste, document.querySelectorAll renvoie une NodeList : une collection d’éléments correspondant au sélecteur. On peut lire sa longueur avec length, puis la parcourir avec for...of. Chaque tour fournit une référence vers un élément réel. L’affectation de sa propriété textContent modifie donc cette ligne de la page, et pas une copie isolée de son texte.

La collection respecte l’ordre du document. Si le matériel contient Cahier puis Crayon, la boucle rencontre Cahier avant Crayon. Le nom choisi après const dans la boucle représente un seul élément à la fois. Il est ainsi plus clair d’appeler la collection lignes et la valeur courante ligne. Affecter lignes.textContent ne remplace pas le contenu de tous les éléments : la collection ne joue pas le rôle d’un paragraphe.

Le sélecteur délimite toujours le travail. "#groupe .membre" ignore une fiche membre placée hors du groupe. On peut ensuite lire dataset.nom sur chaque élément ou ajouter une indication à son texte. Les attributs et les propriétés appris précédemment restent les mêmes ; la nouveauté est leur répétition sur un nombre d’éléments déterminé par la fixture, plutôt que sur deux éléments nommés à l’avance.

Cette NodeList est statique : elle décrit les correspondances au moment de la recherche. Modifier le texte des éléments ne remplace pas leurs références. Si plus tard du code ajoute ou retire des éléments, la collection déjà obtenue ne se met pas automatiquement à jour. Nous ne créons ni ne supprimons de nœuds dans cette leçon ; retiens simplement qu’une nouvelle recherche pourra être nécessaire après un changement de structure.

Une sélection sans correspondance donne une collection vide, avec length égal à zéro. Le corps d’une boucle for...of n’est alors jamais exécuté. Le programme n’a pas besoin d’inventer une ligne pour fonctionner. Un accumulateur initialisé avant la boucle conserve sa valeur initiale. Pour un bilan lisible, on peut choisir explicitement le message "Aucun membre" quand la longueur est nulle, puis l’écrire dans un paragraphe qui existe indépendamment de la liste.

Compter la collection entière et compter une partie de ses éléments sont deux besoins différents. Pour connaître les ateliers ouverts, commence un compteur à zéro et augmente-le seulement si dataset.ouvert vaut "oui". Une collection de trois ateliers peut ainsi produire deux ouverts. Le cas zéro peut signifier qu’il n’existe aucun atelier, ou qu’aucun de ceux présents n’est ouvert ; le texte demandé par la consigne précise le sens à afficher.

Teste le résultat global, puis chaque ligne concernée. Une correction qui ne transforme que le premier élément peut sembler acceptable sur une liste d’une seule ligne. Les exercices comprennent donc plusieurs tailles, des états mélangés et une liste vide. Le script reste une préparation unique de la page : aucun clic ni événement n’est nécessaire pour effectuer ces parcours.

## Exemple guidé 1

```javascript
const lignes = document.querySelectorAll("#liste .materiel"); // 1
for (const ligne of lignes) { // 2
  ligne.textContent = ligne.textContent + " : prêt"; // 3
}
document.querySelector("#bilan").textContent = lignes.length + " objets"; // 4
```

Résultat attendu dans la page : Les lignes deviennent « Cahier : prêt », « Crayon : prêt » ; le bilan affiche « 2 objets ».

Trace :

- Ligne 1 : lignes contient les deux éléments de matériel, dans l’ordre.
- Ligne 2 : le premier puis le second élément sont parcourus.
- Ligne 3 : chaque texte existant reçoit le suffixe, une seule fois.
- Ligne 4 : length vaut 2 et le bilan est écrit hors de la boucle.

## Exemple guidé 2

```javascript
const inscrits = document.querySelectorAll("#inscrits .membre"); // 1
let noms = ""; // 2
for (const membre of inscrits) { // 3
  noms = noms + membre.textContent + "; "; // 4
}
if (inscrits.length === 0) { noms = "Aucun membre"; } // 5
document.querySelector("#bilan").textContent = noms; // 6
```

Résultat attendu dans la page : La liste reste vide et le bilan affiche « Aucun membre ».

Trace :

- Ligne 1 : la recherche fournit une NodeList de longueur 0.
- Ligne 2 : l’accumulateur commence comme chaîne vide.
- Lignes 3–4 : aucun tour ne s’exécute.
- Ligne 5 : la branche vide remplace le message.
- Ligne 6 : le bilan est écrit même sans membre.

