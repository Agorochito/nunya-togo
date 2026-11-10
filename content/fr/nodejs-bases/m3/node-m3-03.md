---
{
  "id": "node-m3-03",
  "title_fr": "Une API JSON qui reçoit des données",
  "course": "nodejs-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "node-m3-02"
  ],
  "outcomes": [
    "Lire le corps d’une requête POST et le convertir depuis JSON.",
    "Valider les données reçues et répondre 201, 400 ou 405 selon le cas."
  ],
  "idea_fr": "Une API qui reçoit des données doit les lire en entier, les vérifier toutes, puis créer la ressource ou expliquer précisément ce qui ne va pas.",
  "analogy_fr": "Au guichet de l’état civil, l’agent lit tout le formulaire, vérifie chaque case obligatoire, puis enregistre la demande ou rend le formulaire en entourant ce qui manque.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", morceau => { texte += morceau; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nconst serveur = http.createServer(async (req, res) => {\n  const texte = await lireCorps(req);\n  res.writeHead(200, { \"Content-Type\": \"text/plain; charset=utf-8\" });\n  res.end(\"Reçu \" + texte.length + \" caractères\");\n});\n\nnunyaRequete(serveur, \"/\", { method: \"POST\", body: \"{\\\"produit\\\":\\\"riz\\\"}\" }).then(r => console.log(r.corps));",
      "expected_output": "Reçu 17 caractères\n",
      "inputs": [],
      "trace_fr": [
        "lireCorps assemble les morceaux du corps.",
        "Le gestionnaire async attend la fin de la lecture.",
        "Le serveur répond seulement après avoir tout reçu."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", morceau => { texte += morceau; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nconst commandes = [];\n\nconst serveur = http.createServer(async (req, res) => {\n  if (req.url !== \"/commandes\") return envoyerJSON(res, 404, { erreur: \"introuvable\" });\n  if (req.method === \"GET\") return envoyerJSON(res, 200, commandes);\n  if (req.method !== \"POST\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n  let donnees;\n  try {\n    donnees = JSON.parse(await lireCorps(req));\n  } catch (erreur) {\n    return envoyerJSON(res, 400, { erreur: \"JSON invalide\" });\n  }\n  const { produit, quantite } = donnees || {};\n  if (typeof produit !== \"string\" || produit.trim() === \"\" || !Number.isInteger(quantite) || quantite < 1) {\n    return envoyerJSON(res, 400, { erreur: \"produit et quantité valides requis\" });\n  }\n  const commande = { id: commandes.length + 1, produit: produit.trim(), quantite };\n  commandes.push(commande);\n  envoyerJSON(res, 201, commande);\n});\n\n(async () => {\n  const a = await nunyaRequete(serveur, \"/commandes\", { method: \"POST\", body: \"{\\\"produit\\\":\\\"riz\\\",\\\"quantite\\\":2}\" });\n  const b = await nunyaRequete(http.createServer(serveur.listeners(\"request\")[0]), \"/commandes\", { method: \"POST\", body: \"{\\\"produit\\\":\\\"\\\",\\\"quantite\\\":-1}\" });\n  console.log(a.statut, a.corps);\n  console.log(b.statut, b.corps);\n})();",
      "expected_output": "201 {\"id\":1,\"produit\":\"riz\",\"quantite\":2}\n400 {\"erreur\":\"produit et quantité valides requis\"}\n",
      "inputs": [],
      "trace_fr": [
        "Une commande valide est créée : statut 201 et identifiant.",
        "Une commande au produit vide et à la quantité négative est refusée.",
        "Le message d’erreur explique quoi corriger."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "JSON.parse sans try",
      "why_fr": "Un corps mal formé fait échouer la requête.",
      "fix_fr": "Réponds 400 « JSON invalide »."
    },
    {
      "error": "Faire confiance au formulaire du navigateur",
      "why_fr": "Une requête directe contourne ses contrôles.",
      "fix_fr": "Valide tout sur le serveur."
    },
    {
      "error": "Répondre 200 après une création",
      "why_fr": "Le client ne sait pas qu’une ressource est née.",
      "fix_fr": "Réponds 201 avec la ressource."
    }
  ],
  "quiz": [
    {
      "question": "Quel événement signale la fin du corps d’une requête ?",
      "options": [
        "data",
        "end",
        "close",
        "finish"
      ],
      "answer": 1,
      "explanation": "Après tous les data.",
      "id": "node-m3-03-q1"
    },
    {
      "question": "Quel statut pour des données invalides ?",
      "options": [
        "200",
        "201",
        "400",
        "500"
      ],
      "answer": 2,
      "explanation": "La requête est mal formée.",
      "id": "node-m3-03-q2"
    },
    {
      "question": "Pourquoi valider sur le serveur même si le formulaire valide déjà ?",
      "options": [
        "Par habitude",
        "Une requête peut être envoyée sans le formulaire",
        "C’est plus rapide",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Le client n’est pas sous ton contrôle.",
      "id": "node-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "API",
      "definition": "Serveur qui échange des données plutôt que des pages."
    },
    {
      "term": "corps de requête",
      "definition": "Données envoyées avec une requête POST ou PUT."
    },
    {
      "term": "validation",
      "definition": "Vérification de chaque champ reçu."
    },
    {
      "term": "201 Created",
      "definition": "Statut d’une ressource créée."
    }
  ],
  "recap_fr": [
    "Lire le corps d’une requête POST et le convertir depuis JSON.",
    "Valider les données reçues et répondre 201, 400 ou 405 selon le cas.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "API",
    "corps de requête",
    "validation",
    "201 Created"
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
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
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
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une API, pour interface de programmation, est un serveur qui échange des données plutôt que des pages. Une application mobile, un site ou un autre serveur lui envoient des requêtes et reçoivent du JSON. Les routes GET lisent des données ; les routes POST en reçoivent pour créer quelque chose : une commande, une inscription, un message.

Le corps d’une requête POST n’arrive pas d’un bloc : il circule en morceaux sur le réseau. L’objet req émet un événement data pour chaque morceau et un événement end quand tout est reçu. Une petite fonction lireCorps(req) assemble ces morceaux dans une promesse, qu’on attend ensuite avec await dans un gestionnaire déclaré async. Les cadriciels comme Express font ce travail pour toi, mais le principe est le même.

Le texte reçu est ensuite converti avec JSON.parse, toujours dans un try…catch : un client peut envoyer un JSON mal formé, par erreur ou volontairement. Dans ce cas, on répond 400, requête invalide, avec un message clair, au lieu de laisser une exception faire échouer la requête.

Vient la validation, l’étape la plus importante. Un JSON bien formé peut contenir n’importe quoi : un produit vide, une quantité négative, du texte à la place d’un nombre, des champs manquants. On vérifie chaque champ : son type avec typeof ou Number.isInteger, ses limites, son format. Si une seule vérification échoue, on répond 400 et on ne crée rien. Ne fais jamais confiance aux vérifications faites dans le navigateur : n’importe qui peut envoyer une requête directement au serveur, sans passer par ton formulaire.

Quand tout est valide, on crée la ressource, on lui attribue un identifiant et on répond 201, Created, avec la ressource créée dans le corps. Le client connaît ainsi son identifiant, utile pour la consulter ensuite. Ne renvoie que ce qui est nécessaire : jamais de mot de passe ni de donnée interne.

Dans ces exercices, les données sont gardées dans un tableau en mémoire : elles disparaissent quand le serveur s’arrête. Une vraie application les enregistre dans un fichier, comme au module 2, ou mieux, dans une base de données. La structure du gestionnaire, elle, ne change pas : lire, convertir, valider, enregistrer, répondre.

Un dernier réflexe : chaque route vérifie aussi la méthode. GET /commandes liste, POST /commandes crée, et toute autre méthode reçoit 405. Ainsi, aucun client ne peut déclencher une action par une requête inattendue.

## Exemple guidé 1

```javascript
const http = require("http");

function lireCorps(req) {
  return new Promise((ok, ko) => {
    let texte = "";
    req.on("data", morceau => { texte += morceau; });
    req.on("end", () => ok(texte));
    req.on("error", ko);
  });
}

const serveur = http.createServer(async (req, res) => {
  const texte = await lireCorps(req);
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Reçu " + texte.length + " caractères");
});

nunyaRequete(serveur, "/", { method: "POST", body: "{\"produit\":\"riz\"}" }).then(r => console.log(r.corps));
```

Affichage attendu :

    Reçu 17 caractères

Trace :

- lireCorps assemble les morceaux du corps.
- Le gestionnaire async attend la fin de la lecture.
- Le serveur répond seulement après avoir tout reçu.

## Exemple guidé 2

```javascript
const http = require("http");

function lireCorps(req) {
  return new Promise((ok, ko) => {
    let texte = "";
    req.on("data", morceau => { texte += morceau; });
    req.on("end", () => ok(texte));
    req.on("error", ko);
  });
}

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(donnees));
}

const commandes = [];

const serveur = http.createServer(async (req, res) => {
  if (req.url !== "/commandes") return envoyerJSON(res, 404, { erreur: "introuvable" });
  if (req.method === "GET") return envoyerJSON(res, 200, commandes);
  if (req.method !== "POST") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
  let donnees;
  try {
    donnees = JSON.parse(await lireCorps(req));
  } catch (erreur) {
    return envoyerJSON(res, 400, { erreur: "JSON invalide" });
  }
  const { produit, quantite } = donnees || {};
  if (typeof produit !== "string" || produit.trim() === "" || !Number.isInteger(quantite) || quantite < 1) {
    return envoyerJSON(res, 400, { erreur: "produit et quantité valides requis" });
  }
  const commande = { id: commandes.length + 1, produit: produit.trim(), quantite };
  commandes.push(commande);
  envoyerJSON(res, 201, commande);
});

(async () => {
  const a = await nunyaRequete(serveur, "/commandes", { method: "POST", body: "{\"produit\":\"riz\",\"quantite\":2}" });
  const b = await nunyaRequete(http.createServer(serveur.listeners("request")[0]), "/commandes", { method: "POST", body: "{\"produit\":\"\",\"quantite\":-1}" });
  console.log(a.statut, a.corps);
  console.log(b.statut, b.corps);
})();
```

Affichage attendu :

    201 {"id":1,"produit":"riz","quantite":2}
    400 {"erreur":"produit et quantité valides requis"}

Trace :

- Une commande valide est créée : statut 201 et identifiant.
- Une commande au produit vide et à la quantité négative est refusée.
- Le message d’erreur explique quoi corriger.

## Vérifier et expliquer

Écris la liste des vérifications à faire sur une inscription à un club : nom, classe, âge et téléphone d’un parent.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
