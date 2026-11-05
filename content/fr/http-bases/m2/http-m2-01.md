---
{
  "id": "http-m2-01",
  "title_fr": "Construire et encoder les paramètres d’une URL",
  "course": "http-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "http-m1-03"
  ],
  "outcomes": [
    "Construire des paramètres sans ambiguïté.",
    "Distinguer un résultat vide et une demande mal formée."
  ],
  "idea_fr": "Un paramètre est une donnée de la requête ; son encodage doit préserver sa valeur exacte.",
  "analogy_fr": "Les rubriques d’une fiche de recherche doivent rester distinctes du texte écrit dans chaque rubrique.",
  "common_mistakes": [
    {
      "error": "Concaténation brute",
      "why_fr": "Une valeur contenant un séparateur modifie la structure de la demande.",
      "fix_fr": "Prépare les paramètres avec URLSearchParams."
    },
    {
      "error": "Paramètre oublié",
      "why_fr": "La fonction reçoit ville mais ne la transmet pas.",
      "fix_fr": "Inspecte la requête réellement observée."
    },
    {
      "error": "Base illustrative envoyée",
      "why_fr": "Une URL de construction est prise pour une destination autorisée.",
      "fix_fr": "Transmets seulement pathname et search dans cet atelier."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi encoder une valeur contenant & ?",
      "options": [
        "Pour rendre automatiquement la ville existante.",
        "Pour supprimer l’accent de Lomé.",
        "Pour ne pas la confondre avec la séparation de paramètres."
      ],
      "answer": 2,
      "explanation": "L’encodage préserve le rôle de donnée de la valeur.",
      "id": "http-m2-01-q1"
    },
    {
      "question": "Quel ordre l’API applique-t-elle à ville et limite ?",
      "options": [
        "Filtre de ville, puis limite.",
        "Suppression des fiches, puis réécriture de la ville.",
        "Limite toujours avant tout filtre."
      ],
      "answer": 0,
      "explanation": "Cet ordre appartient au contrat local annoncé.",
      "id": "http-m2-01-q2"
    },
    {
      "question": "Dans l’exemple URL avec exemple.invalid, que transmet-on à fetch ?",
      "options": [
        "Obligatoirement l’adresse distante complète.",
        "Seulement le chemin local et les paramètres.",
        "Le texte de la base sans chemin."
      ],
      "answer": 1,
      "explanation": "pathname+search maintient la demande sur l’API locale autorisée.",
      "id": "http-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "paramètre",
      "definition": "Valeur nommée ajoutée à une requête."
    },
    {
      "term": "encodage",
      "definition": "Représentation qui préserve une valeur dans la structure d’une URL."
    },
    {
      "term": "URLSearchParams",
      "definition": "Interface permettant de préparer et de lire des paramètres d’URL."
    }
  ],
  "recap_fr": [
    "Construire des paramètres sans ambiguïté.",
    "Distinguer un résultat vide et une demande mal formée.",
    "Vérifier les paramètres réellement transmis."
  ],
  "tags": [
    "paramètre",
    "encodage",
    "URLSearchParams"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "http",
  "environment_fr": "Worker JavaScript asynchrone avec vraies API fetch et Response. Seules les URL locales /api-pedagogique/v1/ sont autorisées. API fournie par le service worker, données fictives, fonctionnement hors ligne après téléchargement ; aucune écriture conservée entre requêtes. input est une aide pédagogique Nunya, pas une API standard. Aucun DOM, Node.js ou serveur distant.",
  "sources": [
    {
      "title": "MDN — URLSearchParams",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "WHATWG — URL Standard",
      "url": "https://url.spec.whatwg.org/",
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
      "expected_output": "2\nWeb",
      "trace_fr": [
        "Les deux premières lignes préparent une valeur de ville encodée.",
        "La troisième ligne transmet un chemin local avec ces paramètres.",
        "json() fournit les deux fiches de Lomé.",
        "La longueur vaut 2 et le deuxième titre vaut Web."
      ]
    },
    {
      "inputs": [],
      "expected_output": "Jardin",
      "trace_fr": [
        "URL prépare des composants sans effectuer de requête.",
        "Les paramètres demandent Kara et une limite de un.",
        "Seuls pathname et search sont envoyés à fetch sur l’origine locale.",
        "Le service filtre avant de limiter ; la première fiche est Jardin."
      ]
    }
  ]
}
---

## Explication pas à pas

Un chemin choisit une ressource, tandis que des paramètres peuvent préciser une recherche. Dans notre API, /ateliers donne toute la collection. Le paramètre ville demande une égalité exacte avec la propriété ville des fiches. La valeur Lomé sélectionne Python et Web ; Kara sélectionne Jardin. Une valeur vide ou l’absence du paramètre conserve tous les ateliers, selon le contrat de ce service précis.

La partie des paramètres suit le point d’interrogation de l’URL. Plusieurs rubriques sont séparées par une esperluette. Ces caractères ont donc un rôle de structure. Si une valeur contient elle-même une esperluette, l’assembler directement dans une chaîne peut changer le sens de la demande. Le texte « Lomé&limite=1 » doit rester une seule valeur de ville lorsqu’il est fourni comme tel, et non devenir deux consignes différentes.

URLSearchParams prépare cette représentation. Crée un objet, puis utilise set avec le nom du paramètre et sa valeur. Sa méthode toString fournit la forme encodée à placer après le point d’interrogation. Les accents, espaces et séparateurs sont représentés de manière à préserver la valeur reçue. N’encode pas manuellement certaines lettres en espérant couvrir tous les cas et n’ajoute pas une deuxième couche d’encodage à une valeur déjà préparée.

Le paramètre limite accepte ici un entier de un à trois. Il est transmis sous forme textuelle dans l’URL, même si la fonction cliente reçoit un nombre. Le service applique d’abord le filtre de ville, puis la limite. Pour ville=Lomé et limite=1, il fournit donc Python. Une liste courte ne signifie pas que les autres fiches ont été supprimées ; elle décrit seulement le résultat de cette requête.

L’objet URL constitue une autre façon de préparer les composants. Il peut être construit avec un chemin et une base. Dans nos exemples, https://exemple.invalid est uniquement une base de construction illustrative. Nous transmettons à fetch seulement url.pathname + url.search, donc le chemin local et ses paramètres. La base fictive ne doit jamais devenir la destination d’une requête de l’atelier.

Un résultat vide peut être parfaitement cohérent. Si la ville exacte ne correspond à aucune fiche, la route renvoie un tableau vide avec un succès HTTP. Cela se distingue d’une route inexistante. Le service ne corrige ni les accents ni la casse à notre place. Il ne faut pas présenter une recherche vide comme une panne de communication sans examiner la demande qui a réellement été envoyée.

Les tests montrent les paramètres attendus après lecture de l’URL. Ils vérifient par exemple que la ville demandée contient bien toute la chaîne fournie, même lorsqu’elle ressemble à une syntaxe de paramètres. Cette vérification complète la valeur retournée : deux mauvaises requêtes pourraient parfois produire le même tableau vide. Construis d’abord la demande sans ambiguïté, puis lis et transforme la réponse locale.

## Exemple guidé 1

```javascript
const parametres = new URLSearchParams();
parametres.set("ville", "Lomé");
const reponse = await fetch("/api-pedagogique/v1/ateliers?" + parametres.toString());
const ateliers = await reponse.json();
console.log(ateliers.length);
console.log(ateliers[1].titre);
```

Résultat attendu :

```text
2
Web
```

Trace :

- Les deux premières lignes préparent une valeur de ville encodée.
- La troisième ligne transmet un chemin local avec ces paramètres.
- json() fournit les deux fiches de Lomé.
- La longueur vaut 2 et le deuxième titre vaut Web.

## Exemple guidé 2

```javascript
const url = new URL("/api-pedagogique/v1/ateliers", "https://exemple.invalid");
url.searchParams.set("ville", "Kara");
url.searchParams.set("limite", "1");
const reponse = await fetch(url.pathname + url.search);
const ateliers = await reponse.json();
console.log(ateliers[0].titre);
```

Résultat attendu :

```text
Jardin
```

Trace :

- URL prépare des composants sans effectuer de requête.
- Les paramètres demandent Kara et une limite de un.
- Seuls pathname et search sont envoyés à fetch sur l’origine locale.
- Le service filtre avant de limiter ; la première fiche est Jardin.

