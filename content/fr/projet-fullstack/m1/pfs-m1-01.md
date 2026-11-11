---
{
  "id": "pfs-m1-01",
  "title_fr": "Du besoin aux routes",
  "course": "projet-fullstack",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "node-m4-03"
  ],
  "outcomes": [
    "Transformer les besoins des utilisateurs en une liste de pages et de routes.",
    "Écrire un petit routeur qui reconnaît les chemins à paramètres comme /produits/:id."
  ],
  "idea_fr": "Une application commence par une liste de besoins ; chaque besoin devient une route, et un routeur relie chaque requête à son traitement.",
  "analogy_fr": "Avant d’ouvrir une boutique, la commerçante décide de ce qu’on y trouvera et à quel rayon. Le plan des rayons vient avant les étagères.",
  "examples": [
    {
      "code": "function correspondre(motif, chemin) {\n  const a = motif.split(\"/\"), b = chemin.split(\"/\");\n  if (a.length !== b.length) return null;\n  const params = {};\n  for (let i = 0; i < a.length; i++) {\n    if (a[i].startsWith(\":\")) params[a[i].slice(1)] = b[i];\n    else if (a[i] !== b[i]) return null;\n  }\n  return params;\n}\n\nconsole.log(correspondre(\"/produits/:id\", \"/produits/3\"));\nconsole.log(correspondre(\"/produits/:id\", \"/produits\"));\nconsole.log(correspondre(\"/\", \"/\"));",
      "expected_output": "{ id: '3' }\nnull\n{}\n",
      "inputs": [],
      "trace_fr": [
        "Le morceau :id capture la valeur 3, sous forme de texte.",
        "Un nombre de morceaux différent ne correspond pas.",
        "La racine correspond sans paramètre."
      ]
    },
    {
      "code": "function correspondre(motif, chemin) {\n  const a = motif.split(\"/\"), b = chemin.split(\"/\");\n  if (a.length !== b.length) return null;\n  const params = {};\n  for (let i = 0; i < a.length; i++) {\n    if (a[i].startsWith(\":\")) params[a[i].slice(1)] = b[i];\n    else if (a[i] !== b[i]) return null;\n  }\n  return params;\n}\n\nfunction router(routes, methode, chemin) {\n  let autreMethode = false;\n  for (const r of routes) {\n    const params = correspondre(r.chemin, chemin);\n    if (!params) continue;\n    if (r.methode === methode) return { nom: r.nom, params };\n    autreMethode = true;\n  }\n  return { nom: autreMethode ? \"non autorisée\" : \"introuvable\", params: {} };\n}\n\nconst ROUTES = [\n  { methode: \"GET\", chemin: \"/\", nom: \"accueil\" },\n  { methode: \"GET\", chemin: \"/produits/:id\", nom: \"produit\" },\n  { methode: \"POST\", chemin: \"/produits\", nom: \"creer\" },\n];\n\nconsole.log(router(ROUTES, \"GET\", \"/produits/2\"));\nconsole.log(router(ROUTES, \"DELETE\", \"/produits/2\").nom, router(ROUTES, \"GET\", \"/clients\").nom);",
      "expected_output": "{ nom: 'produit', params: { id: '2' } }\nnon autorisée introuvable\n",
      "inputs": [],
      "trace_fr": [
        "La route produit est trouvée avec son paramètre.",
        "Le chemin existe, mais pas pour DELETE : non autorisée.",
        "Aucun motif ne correspond : introuvable."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Coder les routes au fil de l’eau",
      "why_fr": "Des pages manquent ou les adresses sont incohérentes.",
      "fix_fr": "Écris d’abord le tableau des routes."
    },
    {
      "error": "Oublier que les paramètres sont des textes",
      "why_fr": "\"3\" === 3 est faux.",
      "fix_fr": "Convertis avec Number."
    },
    {
      "error": "Répondre 404 à une mauvaise méthode",
      "why_fr": "Le client ne comprend pas son erreur.",
      "fix_fr": "Distingue 404 et 405."
    }
  ],
  "quiz": [
    {
      "question": "Quel chemin correspond à /produits/:id ?",
      "options": [
        "/produits",
        "/produits/7",
        "/produits/7/avis",
        "/produit/7"
      ],
      "answer": 1,
      "explanation": "Même nombre de morceaux, préfixe identique.",
      "id": "pfs-m1-01-q1"
    },
    {
      "question": "Que contient params pour /produits/:id et /produits/12 ?",
      "options": [
        "{ id: 12 }",
        "{ id: \"12\" }",
        "12",
        "null"
      ],
      "answer": 1,
      "explanation": "Toujours une chaîne.",
      "id": "pfs-m1-01-q2"
    },
    {
      "question": "DELETE sur un chemin qui n’accepte que GET doit répondre…",
      "options": [
        "404",
        "405",
        "200",
        "500"
      ],
      "answer": 1,
      "explanation": "Méthode non autorisée.",
      "id": "pfs-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "full-stack",
      "definition": "Qui couvre serveur, données et pages."
    },
    {
      "term": "besoin utilisateur",
      "definition": "Action qu’une personne veut accomplir, formulée de son point de vue."
    },
    {
      "term": "routeur",
      "definition": "Fonction qui associe une requête à son traitement."
    },
    {
      "term": "paramètre de route",
      "definition": "Partie variable d’un chemin, comme :id."
    }
  ],
  "recap_fr": [
    "Transformer les besoins des utilisateurs en une liste de pages et de routes.",
    "Écrire un petit routeur qui reconnaît les chemins à paramètres comme /produits/:id.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "full-stack",
    "besoin utilisateur",
    "routeur",
    "paramètre de route"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "node",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Node.js 20 exécuté en ligne sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seul le code du programme est envoyé. Les serveurs sont démarrés par l’atelier sur un port local temporaire : n’appelle pas listen() dans les exercices.",
  "references": [
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html"
    },
    {
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html"
    },
    {
      "title": "MDN — codes de statut HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status"
    }
  ],
  "sources": [
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html",
      "scope": "Créer un serveur et répondre aux requêtes. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html",
      "scope": "Analyser une adresse et ses paramètres. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — codes de statut HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status",
      "scope": "200, 201, 400, 404, 405, 500. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ce projet construit, du début à la fin, l’application web d’une boutique fictive, le Marché de Bè : une page d’accueil qui liste les produits, une page par produit, un formulaire pour en ajouter, une API JSON pour une future application mobile et un panier. Il réunit ce que tu as appris en HTML, en HTTP et en Node.js, dans un seul serveur. On dit d’une telle application qu’elle est full-stack : elle couvre le serveur, les données et les pages vues par l’utilisateur.

Tout commence par les besoins, formulés du point de vue des personnes : « en tant que cliente, je veux voir la liste des produits et leurs prix » ; « en tant que commerçante, je veux ajouter un produit ». Chaque besoin devient une ou plusieurs routes : GET / pour la liste, GET /produits/:id pour le détail, GET /produits/nouveau pour le formulaire, POST /produits pour l’enregistrer. Écrire ce tableau avant le code évite d’oublier une page ou d’inventer des adresses incohérentes.

Le routage consiste à trouver, pour une requête, la route qui lui correspond. Pour les chemins fixes, une comparaison suffit. Pour les chemins à paramètres, comme /produits/:id, on découpe le motif et le chemin en morceaux avec split("/"), on vérifie qu’ils ont le même nombre de morceaux, puis on compare morceau par morceau : un morceau qui commence par deux-points accepte n’importe quelle valeur et la range dans un objet de paramètres. /produits/3 donne ainsi { id: "3" }. Les paramètres sont toujours des chaînes ; on les convertit ensuite.

Un bon routeur distingue deux échecs. Si aucun motif ne correspond au chemin, la ressource est introuvable : 404. Si le chemin existe mais pas avec cette méthode, par exemple un DELETE sur /produits/3, la méthode n’est pas autorisée : 405. Cette différence aide le client à comprendre son erreur.

Les cadriciels comme Express font exactement ce travail avec app.get("/produits/:id", …). L’écrire soi-même une fois permet de comprendre ce qu’ils font, et de lire leurs messages d’erreur.

Dans ce premier module, on écrit les briques indépendantes du serveur : le routeur, le modèle de données, les gabarits HTML. Ce sont des fonctions pures, faciles à tester une par une. Le module 2 les assemble dans un vrai serveur HTTP, que l’atelier interrogera comme un navigateur.

## Exemple guidé 1

```javascript
function correspondre(motif, chemin) {
  const a = motif.split("/"), b = chemin.split("/");
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = b[i];
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

console.log(correspondre("/produits/:id", "/produits/3"));
console.log(correspondre("/produits/:id", "/produits"));
console.log(correspondre("/", "/"));
```

Affichage attendu :

    { id: '3' }
    null
    {}

Trace :

- Le morceau :id capture la valeur 3, sous forme de texte.
- Un nombre de morceaux différent ne correspond pas.
- La racine correspond sans paramètre.

## Exemple guidé 2

```javascript
function correspondre(motif, chemin) {
  const a = motif.split("/"), b = chemin.split("/");
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = b[i];
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

function router(routes, methode, chemin) {
  let autreMethode = false;
  for (const r of routes) {
    const params = correspondre(r.chemin, chemin);
    if (!params) continue;
    if (r.methode === methode) return { nom: r.nom, params };
    autreMethode = true;
  }
  return { nom: autreMethode ? "non autorisée" : "introuvable", params: {} };
}

const ROUTES = [
  { methode: "GET", chemin: "/", nom: "accueil" },
  { methode: "GET", chemin: "/produits/:id", nom: "produit" },
  { methode: "POST", chemin: "/produits", nom: "creer" },
];

console.log(router(ROUTES, "GET", "/produits/2"));
console.log(router(ROUTES, "DELETE", "/produits/2").nom, router(ROUTES, "GET", "/clients").nom);
```

Affichage attendu :

    { nom: 'produit', params: { id: '2' } }
    non autorisée introuvable

Trace :

- La route produit est trouvée avec son paramètre.
- Le chemin existe, mais pas pour DELETE : non autorisée.
- Aucun motif ne correspond : introuvable.

## Vérifier et expliquer

Écris quatre besoins utilisateur pour une application de bibliothèque scolaire, puis la route de chacun.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [Node.js — URL](https://nodejs.org/docs/latest-v20.x/api/url.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
