---
{
  "id": "node-m3-01",
  "title_fr": "Un premier serveur HTTP",
  "course": "nodejs-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "node-m2-03"
  ],
  "outcomes": [
    "Créer un serveur HTTP avec le module http et répondre à une requête.",
    "Choisir le code de statut et le type de contenu de la réponse."
  ],
  "idea_fr": "Un serveur web est un programme qui attend des requêtes et renvoie, pour chacune, une réponse : un code de statut, des en-têtes et un corps.",
  "analogy_fr": "Un guichet de poste reçoit des demandes une à une. Pour chacune, l’agent répond : « voici votre colis », « revenez demain » ou « ce colis n’existe pas ». Il ne laisse jamais quelqu’un sans réponse.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nconst serveur = http.createServer((req, res) => {\n  res.writeHead(200, { \"Content-Type\": \"text/plain; charset=utf-8\" });\n  res.end(\"Bienvenue au marché\");\n});\n\nnunyaRequete(serveur, \"/\").then(r => console.log(r.statut, r.type, r.corps));",
      "expected_output": "200 text/plain Bienvenue au marché\n",
      "inputs": [],
      "trace_fr": [
        "Le gestionnaire reçoit req et res pour chaque requête.",
        "writeHead fixe le statut et le type de contenu.",
        "nunyaRequete joue le rôle du navigateur."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nconst serveur = http.createServer((req, res) => {\n  if (req.url === \"/\") {\n    res.writeHead(200, { \"Content-Type\": \"text/plain; charset=utf-8\" });\n    res.end(\"Accueil\");\n  } else {\n    res.writeHead(404, { \"Content-Type\": \"text/plain; charset=utf-8\" });\n    res.end(\"Page introuvable\");\n  }\n});\n\nnunyaRequete(serveur, \"/inconnue\").then(r => console.log(r.statut, r.corps));",
      "expected_output": "404 Page introuvable\n",
      "inputs": [],
      "trace_fr": [
        "Le chemin demandé est dans req.url.",
        "Une page inconnue reçoit le statut 404.",
        "Le client reçoit quand même une réponse claire."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier res.end",
      "why_fr": "Le client attend sans fin.",
      "fix_fr": "Termine chaque réponse avec res.end."
    },
    {
      "error": "Statut 200 pour une erreur",
      "why_fr": "Le client croit que tout va bien.",
      "fix_fr": "Utilise 404, 400 ou 500 selon le cas."
    },
    {
      "error": "Oublier le type de contenu",
      "why_fr": "Le client lit mal la réponse et les accents.",
      "fix_fr": "Précise Content-Type avec charset=utf-8."
    }
  ],
  "quiz": [
    {
      "question": "Que contient req.url ?",
      "options": [
        "Le corps",
        "Le chemin demandé",
        "Le statut",
        "Le port"
      ],
      "answer": 1,
      "explanation": "Par exemple /produits?page=2.",
      "id": "node-m3-01-q1"
    },
    {
      "question": "Quel statut pour une page introuvable ?",
      "options": [
        "200",
        "201",
        "404",
        "500"
      ],
      "answer": 2,
      "explanation": "Not Found.",
      "id": "node-m3-01-q2"
    },
    {
      "question": "Que se passe-t-il sans res.end ?",
      "options": [
        "La réponse part quand même",
        "Le client attend indéfiniment",
        "Le serveur s’arrête",
        "Rien"
      ],
      "answer": 1,
      "explanation": "La réponse n’est jamais terminée.",
      "id": "node-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "serveur HTTP",
      "definition": "Programme qui répond aux requêtes HTTP."
    },
    {
      "term": "gestionnaire",
      "definition": "Fonction appelée pour chaque requête."
    },
    {
      "term": "code de statut",
      "definition": "Nombre qui résume le résultat de la requête."
    },
    {
      "term": "Content-Type",
      "definition": "En-tête qui indique le type du corps."
    }
  ],
  "recap_fr": [
    "Créer un serveur HTTP avec le module http et répondre à une requête.",
    "Choisir le code de statut et le type de contenu de la réponse.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "serveur HTTP",
    "gestionnaire",
    "code de statut",
    "Content-Type"
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
      "title": "MDN — codes de statut HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status",
      "scope": "200, 201, 400, 404, 405, 500. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Quand ton navigateur affiche une page, il envoie une requête HTTP à un serveur, comme tu l’as vu dans le cours HTTP et API de Nunya. Avec Node.js, tu peux écrire ce serveur toi-même. Le module intégré http suffit : http.createServer(gestionnaire) crée un serveur, et la fonction gestionnaire est appelée pour chaque requête reçue, avec deux objets : req, la requête, et res, la réponse à construire.

req décrit ce que demande le client : req.method donne la méthode, comme GET ou POST, req.url le chemin demandé, comme /produits?page=2, et req.headers les en-têtes. res sert à répondre. res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" }) fixe le code de statut et les en-têtes ; res.end(texte) envoie le corps et termine la réponse.

Le code de statut résume le résultat : 200 pour une réponse normale, 201 pour une ressource créée, 400 pour une requête mal formée, 404 pour une ressource introuvable, 405 pour une méthode non autorisée, 500 pour une erreur du serveur. Le type de contenu dit au client comment lire le corps : text/plain pour du texte, text/html pour une page, application/json pour des données. Le paramètre charset=utf-8 garantit l’affichage correct des accents.

Règle d’or : chaque requête doit recevoir exactement une réponse, terminée par res.end. Oublier res.end laisse le client attendre indéfiniment, jusqu’à ce que sa connexion expire. Appeler res.end deux fois provoque une erreur.

Pour qu’un serveur reçoive réellement des requêtes, on l’attache à un port avec serveur.listen(3000), puis on visite http://localhost:3000 dans un navigateur. Le serveur tourne alors jusqu’à ce qu’on l’arrête, avec Ctrl+C dans le terminal. Dans l’atelier de Nunya, ne l’appelle pas : l’outil d’essai nunyaRequete(serveur, chemin) démarre ton serveur sur un port temporaire, envoie une requête comme le ferait un navigateur, puis l’arrête et donne le statut, le type de contenu et le corps de la réponse. C’est l’équivalent d’une visite dans le navigateur, en automatique.

Ce module intégré est volontairement minimal. En entreprise, on utilise souvent des cadriciels comme Express ou Fastify, qui simplifient les routes et la lecture des données. Ils reposent tous sur ce module http : comprendre req et res, c’est comprendre ce qu’ils font pour toi.

## Exemple guidé 1

```javascript
const http = require("http");

const serveur = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Bienvenue au marché");
});

nunyaRequete(serveur, "/").then(r => console.log(r.statut, r.type, r.corps));
```

Affichage attendu :

    200 text/plain Bienvenue au marché

Trace :

- Le gestionnaire reçoit req et res pour chaque requête.
- writeHead fixe le statut et le type de contenu.
- nunyaRequete joue le rôle du navigateur.

## Exemple guidé 2

```javascript
const http = require("http");

const serveur = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Accueil");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Page introuvable");
  }
});

nunyaRequete(serveur, "/inconnue").then(r => console.log(r.statut, r.corps));
```

Affichage attendu :

    404 Page introuvable

Trace :

- Le chemin demandé est dans req.url.
- Une page inconnue reçoit le statut 404.
- Le client reçoit quand même une réponse claire.

## Vérifier et expliquer

Liste cinq adresses d’un site que tu connais et le code de statut que devrait renvoyer chacune.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
