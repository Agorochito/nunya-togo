---
{
  "id": "node-m3-02",
  "title_fr": "Routes, méthodes et paramètres",
  "course": "nodejs-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "node-m3-01"
  ],
  "outcomes": [
    "Analyser l’adresse d’une requête avec URL : chemin et paramètres.",
    "Choisir la réponse selon la méthode et le chemin, et refuser proprement ce qui n’est pas prévu."
  ],
  "idea_fr": "Un serveur répond différemment selon ce qu’on lui demande : la méthode et le chemin forment une route, les paramètres précisent la demande.",
  "analogy_fr": "À la gare routière, le guichet dépend de la destination, et l’agent demande des précisions : quel jour, combien de places. La destination est la route, les précisions sont les paramètres.",
  "examples": [
    {
      "code": "const adresse = new URL(\"/recherche?q=riz&page=2\", \"http://localhost\");\nconsole.log(adresse.pathname);\nconsole.log(adresse.searchParams.get(\"q\"), Number(adresse.searchParams.get(\"page\")) + 1);\nconsole.log(adresse.searchParams.get(\"tri\"));\nconsole.log(\"/produits/riz\".split(\"/\"));",
      "expected_output": "/recherche\nriz 3\nnull\n[ '', 'produits', 'riz' ]\n",
      "inputs": [],
      "trace_fr": [
        "pathname ne contient pas les paramètres.",
        "Les paramètres sont des chaînes : on convertit page avec Number.",
        "Un paramètre absent donne null."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nconst PRIX = { riz: 600, huile: 1500, sel: 150 };\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nconst serveur = http.createServer((req, res) => {\n  if (req.method !== \"GET\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (pathname === \"/produits\") return envoyerJSON(res, 200, Object.keys(PRIX));\n  const parties = pathname.split(\"/\");\n  if (parties.length === 3 && parties[1] === \"produits\" && PRIX[parties[2]] !== undefined) {\n    return envoyerJSON(res, 200, { article: parties[2], prix: PRIX[parties[2]] });\n  }\n  envoyerJSON(res, 404, { erreur: \"introuvable\" });\n});\n\nPromise.all([\n  nunyaRequete(serveur, \"/produits/huile\"),\n  nunyaRequete(http.createServer(serveur.listeners(\"request\")[0]), \"/produits\", { method: \"POST\" }),\n]).then(([a, b]) => console.log(a.corps, b.statut));",
      "expected_output": "{\"article\":\"huile\",\"prix\":1500} 405\n",
      "inputs": [],
      "trace_fr": [
        "La route /produits/:id renvoie le détail.",
        "Une requête POST est refusée avec 405.",
        "Le même gestionnaire sert pour un second serveur d’essai."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer req.url avec des paramètres",
      "why_fr": "/produits?page=2 ne correspond plus à /produits.",
      "fix_fr": "Compare le pathname."
    },
    {
      "error": "Oublier les paramètres absents",
      "why_fr": "null ou NaN se propagent.",
      "fix_fr": "Vérifie et réponds 400 si besoin."
    },
    {
      "error": "Répondre normalement à une méthode non prévue",
      "why_fr": "Le client croit l’opération réussie.",
      "fix_fr": "Réponds 405."
    }
  ],
  "quiz": [
    {
      "question": "Que donne new URL(\"/a?x=1\", \"http://localhost\").pathname ?",
      "options": [
        "/a?x=1",
        "/a",
        "x=1",
        "http://localhost/a"
      ],
      "answer": 1,
      "explanation": "Sans les paramètres.",
      "id": "node-m3-02-q1"
    },
    {
      "question": "Que renvoie searchParams.get(\"page\") pour ?page=3 ?",
      "options": [
        "3 (nombre)",
        "\"3\" (chaîne)",
        "null",
        "undefined"
      ],
      "answer": 1,
      "explanation": "Toujours une chaîne.",
      "id": "node-m3-02-q2"
    },
    {
      "question": "Quel statut pour POST sur une route en lecture seule ?",
      "options": [
        "200",
        "404",
        "405",
        "500"
      ],
      "answer": 2,
      "explanation": "Méthode non autorisée.",
      "id": "node-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "route",
      "definition": "Combinaison d’une méthode et d’un chemin."
    },
    {
      "term": "routage",
      "definition": "Choix du traitement selon la route."
    },
    {
      "term": "paramètre de requête",
      "definition": "Valeur après le ? de l’adresse, comme page=2."
    },
    {
      "term": "pathname",
      "definition": "Chemin de l’adresse, sans les paramètres."
    }
  ],
  "recap_fr": [
    "Analyser l’adresse d’une requête avec URL : chemin et paramètres.",
    "Choisir la réponse selon la méthode et le chemin, et refuser proprement ce qui n’est pas prévu.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "route",
    "routage",
    "paramètre de requête",
    "pathname"
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
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html"
    },
    {
      "title": "MDN — codes de statut HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status"
    }
  ],
  "sources": [
    {
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html",
      "scope": "Analyser une adresse et ses paramètres. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html",
      "scope": "Créer un serveur et répondre aux requêtes. Texte, exemples et exercices originaux Nunya.",
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

Un vrai serveur propose plusieurs services : la liste des produits, le détail d’un produit, la recherche. Chaque combinaison d’une méthode et d’un chemin s’appelle une route : GET /produits, GET /produits/riz, POST /commandes. Le travail qui consiste à choisir le bon traitement pour chaque requête s’appelle le routage.

req.url contient le chemin et les paramètres ensemble : /recherche?q=riz&page=2. Comparer directement req.url à "/recherche" échoue dès qu’il y a des paramètres. On l’analyse donc avec la classe URL, disponible partout dans Node.js : new URL(req.url, "http://localhost") donne un objet dont pathname contient le chemin, /recherche, et searchParams les paramètres. searchParams.get("q") renvoie "riz", ou null si le paramètre est absent. La seconde adresse, http://localhost, sert seulement de base, car req.url ne contient pas le nom du serveur.

Certaines routes contiennent une partie variable : /produits/riz, /produits/huile. On découpe le chemin avec split("/") : "/produits/riz".split("/") donne ["", "produits", "riz"]. On vérifie la forme attendue, puis on lit l’identifiant. Les cadriciels comme Express écrivent ces routes sous la forme /produits/:id, mais font exactement ce découpage.

La méthode compte aussi. GET lit une ressource, POST en crée une, PUT ou PATCH la modifie, DELETE la supprime. Si une route n’accepte que GET, une requête POST doit recevoir le statut 405, méthode non autorisée, plutôt qu’une réponse normale qui laisserait croire que l’opération a eu lieu.

Un serveur bien conçu ne laisse aucun cas sans réponse : à la fin du routage, toute requête qui n’a correspondu à aucune route reçoit un 404. Une fonction utilitaire comme envoyerJSON(res, statut, donnees), qui fixe le type de contenu et convertit les données, évite de répéter les mêmes lignes dans chaque route.

Attention aux valeurs lues dans l’adresse : ce sont toujours des chaînes, et elles viennent du client. searchParams.get("page") renvoie "2", pas 2 ; on convertit avec Number et on vérifie le résultat. Un paramètre absent, vide ou absurde doit donner une réponse claire, souvent un 400, et jamais un plantage du serveur.

Enfin, garde des routes simples et prévisibles : des noms au pluriel pour les collections, des identifiants dans le chemin, des options de filtre ou de page dans les paramètres. Un client, ou un collègue, devine alors l’adresse d’une ressource sans lire de documentation.

## Exemple guidé 1

```javascript
const adresse = new URL("/recherche?q=riz&page=2", "http://localhost");
console.log(adresse.pathname);
console.log(adresse.searchParams.get("q"), Number(adresse.searchParams.get("page")) + 1);
console.log(adresse.searchParams.get("tri"));
console.log("/produits/riz".split("/"));
```

Affichage attendu :

    /recherche
    riz 3
    null
    [ '', 'produits', 'riz' ]

Trace :

- pathname ne contient pas les paramètres.
- Les paramètres sont des chaînes : on convertit page avec Number.
- Un paramètre absent donne null.

## Exemple guidé 2

```javascript
const http = require("http");

const PRIX = { riz: 600, huile: 1500, sel: 150 };

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(donnees));
}

const serveur = http.createServer((req, res) => {
  if (req.method !== "GET") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/produits") return envoyerJSON(res, 200, Object.keys(PRIX));
  const parties = pathname.split("/");
  if (parties.length === 3 && parties[1] === "produits" && PRIX[parties[2]] !== undefined) {
    return envoyerJSON(res, 200, { article: parties[2], prix: PRIX[parties[2]] });
  }
  envoyerJSON(res, 404, { erreur: "introuvable" });
});

Promise.all([
  nunyaRequete(serveur, "/produits/huile"),
  nunyaRequete(http.createServer(serveur.listeners("request")[0]), "/produits", { method: "POST" }),
]).then(([a, b]) => console.log(a.corps, b.statut));
```

Affichage attendu :

    {"article":"huile","prix":1500} 405

Trace :

- La route /produits/:id renvoie le détail.
- Une requête POST est refusée avec 405.
- Le même gestionnaire sert pour un second serveur d’essai.

## Vérifier et expliquer

Dessine les routes d’une petite API de bibliothèque scolaire : méthode, chemin et statut attendu pour chacune.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — URL](https://nodejs.org/docs/latest-v20.x/api/url.html)
- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
