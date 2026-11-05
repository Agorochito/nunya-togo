---
{
  "id": "http-m1-03",
  "title_fr": "Lire du JSON et retrouver ses objets et tableaux",
  "course": "http-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "http-m1-02"
  ],
  "outcomes": [
    "Attendre l’analyse JSON du corps.",
    "Distinguer fiche unique et tableau de fiches."
  ],
  "idea_fr": "json() analyse le corps pour fournir une valeur JavaScript, dont il faut connaître la forme.",
  "analogy_fr": "Une enveloppe peut contenir une fiche unique ou une liste de fiches : on ne les parcourt pas de la même manière.",
  "common_mistakes": [
    {
      "error": "Tableau pris pour fiche",
      "why_fr": "Une propriété de fiche est cherchée directement sur la collection.",
      "fix_fr": "Choisis une position ou un parcours avant la propriété."
    },
    {
      "error": "Analyse non attendue",
      "why_fr": "Une propriété est lue dans la promesse de json().",
      "fix_fr": "Attends json() avant d’utiliser les données."
    },
    {
      "error": "Type de retour différent",
      "why_fr": "Une chaîne remplace l’objet résumé demandé.",
      "fix_fr": "Construis explicitement la forme annoncée."
    }
  ],
  "quiz": [
    {
      "question": "Le résultat de json() peut-il être un tableau ?",
      "options": [
        "Non, toujours une chaîne brute.",
        "Oui, selon le corps reçu.",
        "Non, toujours un objet avec la même forme."
      ],
      "answer": 1,
      "explanation": "JSON peut représenter plusieurs formes de valeurs.",
      "id": "http-m1-03-q1"
    },
    {
      "question": "Comment lire le titre de la première fiche du tableau ateliers ?",
      "options": [
        "ateliers.titre",
        "ateliers[1] dans tous les cas",
        "ateliers[0].titre"
      ],
      "answer": 2,
      "explanation": "On choisit une position puis une propriété de la fiche.",
      "id": "http-m1-03-q2"
    },
    {
      "question": "Pourquoi conserver places:0 dans un résumé ?",
      "options": [
        "Zéro est une valeur prévue, pas une propriété absente.",
        "Zéro doit toujours être remplacé par null.",
        "Toute valeur JSON vaut true."
      ],
      "answer": 0,
      "explanation": "Il faut respecter les valeurs et leur sens contractuel.",
      "id": "http-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "JSON",
      "definition": "Format textuel de données structurées."
    },
    {
      "term": "analyse",
      "definition": "Transformation du texte JSON en une valeur JavaScript."
    },
    {
      "term": "collection",
      "definition": "Ensemble de fiches présenté ici sous forme de tableau."
    }
  ],
  "recap_fr": [
    "Attendre l’analyse JSON du corps.",
    "Distinguer fiche unique et tableau de fiches.",
    "Retourner une forme structurée fidèle au contrat."
  ],
  "tags": [
    "JSON",
    "analyse",
    "collection"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "http",
  "environment_fr": "Worker JavaScript asynchrone avec vraies API fetch et Response. Seules les URL locales /api-pedagogique/v1/ sont autorisées. API fournie par le service worker, données fictives, fonctionnement hors ligne après téléchargement ; aucune écriture conservée entre requêtes. input est une aide pédagogique Nunya, pas une API standard. Aucun DOM, Node.js ou serveur distant.",
  "sources": [
    {
      "title": "MDN — Response.json()",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Response/json",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — Utiliser l’API Fetch",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "WHATWG — Fetch Standard",
      "url": "https://fetch.spec.whatwg.org/",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "inputs": [],
      "expected_output": "Python\n4",
      "trace_fr": [
        "La première ligne demande la fiche d’identifiant 1.",
        "La seconde attend l’analyse JSON et fournit un objet.",
        "La propriété titre vaut Python et la propriété places vaut le nombre 4.",
        "Les deux lectures sont affichées dans l’ordre."
      ]
    },
    {
      "inputs": [],
      "expected_output": "3\nWeb",
      "trace_fr": [
        "La route de collection fournit un tableau.",
        "json() aboutit à trois objets rangés dans l’ordre contractuel.",
        "length vaut 3 ; l’indice 2 désigne le troisième objet.",
        "Le titre lu dans cet objet est Web."
      ]
    }
  ]
}
---

## Explication pas à pas

Le texte convient à une phrase, mais un service peut transmettre des données structurées. JSON est un format textuel qui représente notamment des objets, des tableaux, des nombres et des chaînes. Il ne s’agit pas d’un objet JavaScript déjà présent dans le programme. La méthode json() de Response lit le corps et l’analyse pour produire une valeur JavaScript utilisable.

Cette méthode est asynchrone. Après await fetch, écris const donnees = await reponse.json(). Le résultat peut ensuite être parcouru avec les outils JavaScript appris auparavant. Il n’est pas nécessaire de convertir manuellement chaque propriété numérique en texte puis de la reconvertir. Dans le contrat de notre API, places est déjà un nombre et titre est une chaîne une fois la lecture réussie.

La forme dépend de la route. /ateliers/1 fournit une fiche unique avec id, titre, ville et places. Lire fiche.titre donne Python. La route /ateliers fournit un tableau de trois fiches. Lire ateliers.length donne le nombre de fiches ; ateliers[0] donne la première fiche, dont le titre se lit ensuite avec .titre. ateliers.titre chercherait au contraire une propriété directement sur le tableau et ne signifie pas « tous les titres ».

Une fiche contenant zéro place reste une donnée présente et complète au sens du format. Il ne faut pas traiter le nombre zéro comme l’absence de propriété. De même, un tableau vide est une valeur structurée valable ; il indique ici qu’aucun élément n’a été retenu par une recherche, lorsque cette règle sera introduite. Les propriétés attendues viennent du contrat du service, pas du seul fait que le document utilise JSON.

Le corps d’une réponse est normalement consommé par sa lecture. N’appelle pas text() puis json() sur la même réponse pour demander deux lectures ordinaires successives du même flux. Choisis la méthode adaptée dès le départ. Nous reviendrons plus tard sur les erreurs : annoncer un type JSON dans un en-tête ne garantit pas qu’un texte mal formé pourra être analysé.

Une fonction cliente peut lire une fiche et en retourner seulement un résumé, par exemple un nouvel objet contenant titre et places. Le changement de forme doit rester explicite. Si le contrat demande une fiche, ne retourne pas seulement sa phrase d’affichage ; si le contrat demande une liste, ne retourne pas uniquement le premier élément. Les tests examinent ces valeurs structurées, et non une apparence de console.

Tous les ateliers décrits ici sont fictifs. Leurs places ne correspondent à aucun événement ouvert à une inscription réelle. Les opérations de lecture montrent une interface locale dont le contrat est stable pour les exercices ; elles ne construisent pas une base persistante. Lis la route, identifie la forme reçue, puis trace les accès aux propriétés et aux indices avant d’écrire une transformation plus importante.

## Exemple guidé 1

```javascript
const reponse = await fetch("/api-pedagogique/v1/ateliers/1");
const fiche = await reponse.json();
console.log(fiche.titre);
console.log(fiche.places);
```

Résultat attendu :

```text
Python
4
```

Trace :

- La première ligne demande la fiche d’identifiant 1.
- La seconde attend l’analyse JSON et fournit un objet.
- La propriété titre vaut Python et la propriété places vaut le nombre 4.
- Les deux lectures sont affichées dans l’ordre.

## Exemple guidé 2

```javascript
const reponse = await fetch("/api-pedagogique/v1/ateliers");
const ateliers = await reponse.json();
console.log(ateliers.length);
console.log(ateliers[2].titre);
```

Résultat attendu :

```text
3
Web
```

Trace :

- La route de collection fournit un tableau.
- json() aboutit à trois objets rangés dans l’ordre contractuel.
- length vaut 3 ; l’indice 2 désigne le troisième objet.
- Le titre lu dans cet objet est Web.

