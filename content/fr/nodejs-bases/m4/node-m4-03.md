---
{
  "id": "node-m4-03",
  "title_fr": "Projet : l’API d’une boutique",
  "course": "nodejs-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "node-m4-02"
  ],
  "outcomes": [
    "Assembler une petite API complète : logique séparée, routes, validation et erreurs claires.",
    "Tester l’API de bout en bout et comprendre ce qu’il resterait à faire pour la mettre en ligne."
  ],
  "idea_fr": "Une bonne API sépare le calcul, testable seul, de la couche HTTP qui reçoit, vérifie et répond.",
  "analogy_fr": "Dans une boutique, le comptable calcule et le caissier accueille les clients. Le caissier ne refait pas les calculs : il transmet, vérifie les billets et rend la monnaie.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", morceau => { texte += morceau; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nconst PRODUITS = { riz: 600, huile: 1500, sel: 150 };\n\nfunction totalPanier(articles) {\n  if (!Array.isArray(articles) || articles.length === 0) throw new Error(\"panier vide\");\n  let total = 0;\n  for (const a of articles) {\n    if (PRODUITS[a.produit] === undefined) throw new Error(\"produit inconnu : \" + a.produit);\n    if (!Number.isInteger(a.quantite) || a.quantite < 1) throw new Error(\"quantité invalide\");\n    total += PRODUITS[a.produit] * a.quantite;\n  }\n  return total;\n}\n\n\nconsole.log(totalPanier([{ produit: \"riz\", quantite: 2 }, { produit: \"sel\", quantite: 1 }]));\ntry {\n  totalPanier([{ produit: \"sucre\", quantite: 1 }]);\n} catch (erreur) {\n  console.log(erreur.message);\n}",
      "expected_output": "1350\nproduit inconnu : sucre\n",
      "inputs": [],
      "trace_fr": [
        "La logique se teste sans serveur.",
        "Les prix viennent du serveur, pas du client.",
        "Une erreur explicite décrit le problème."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", morceau => { texte += morceau; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nconst PRODUITS = { riz: 600, huile: 1500, sel: 150 };\n\nfunction totalPanier(articles) {\n  if (!Array.isArray(articles) || articles.length === 0) throw new Error(\"panier vide\");\n  let total = 0;\n  for (const a of articles) {\n    if (PRODUITS[a.produit] === undefined) throw new Error(\"produit inconnu : \" + a.produit);\n    if (!Number.isInteger(a.quantite) || a.quantite < 1) throw new Error(\"quantité invalide\");\n    total += PRODUITS[a.produit] * a.quantite;\n  }\n  return total;\n}\n\nconst serveur = http.createServer(async (req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (pathname === \"/produits\") {\n    if (req.method !== \"GET\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n    return envoyerJSON(res, 200, PRODUITS);\n  }\n  if (pathname === \"/panier/total\") {\n    if (req.method !== \"POST\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n    try {\n      const total = totalPanier(JSON.parse(await lireCorps(req)));\n      return envoyerJSON(res, 200, { total });\n    } catch (erreur) {\n      return envoyerJSON(res, 400, { erreur: erreur instanceof SyntaxError ? \"JSON invalide\" : erreur.message });\n    }\n  }\n  envoyerJSON(res, 404, { erreur: \"introuvable\" });\n});\n\nnunyaRequete(serveur, \"/panier/total\", { method: \"POST\", body: '[{\"produit\":\"huile\",\"quantite\":2}]' }).then(r => console.log(r.statut, r.corps));",
      "expected_output": "200 {\"total\":3000}\n",
      "inputs": [],
      "trace_fr": [
        "La route POST lit le panier.",
        "Elle confie le calcul à totalPanier.",
        "Elle répond 200 avec le total."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Accepter un prix envoyé par le client",
      "why_fr": "N’importe qui fixe son propre prix.",
      "fix_fr": "Recalcule avec les prix du serveur."
    },
    {
      "error": "Mélanger calcul et HTTP",
      "why_fr": "La logique devient difficile à tester.",
      "fix_fr": "Isole une fonction pure."
    },
    {
      "error": "Renvoyer la trace complète d’une erreur",
      "why_fr": "Elle révèle l’intérieur du serveur.",
      "fix_fr": "Renvoie un message prévu pour le client."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi isoler totalPanier ?",
      "options": [
        "Pour la vitesse",
        "Pour la tester et la réutiliser sans HTTP",
        "C’est obligatoire",
        "Pour les événements"
      ],
      "answer": 1,
      "explanation": "Une fonction pure se teste seule.",
      "id": "node-m4-03-q1"
    },
    {
      "question": "Que doit envoyer le client pour un panier ?",
      "options": [
        "Produits, quantités et prix",
        "Produits et quantités seulement",
        "Le total",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Les prix sont côté serveur.",
      "id": "node-m4-03-q2"
    },
    {
      "question": "Où un hébergeur indique-t-il le port à utiliser ?",
      "options": [
        "Dans le code",
        "Dans process.env.PORT",
        "Dans package.json",
        "Dans l’URL"
      ],
      "answer": 1,
      "explanation": "Une variable d’environnement.",
      "id": "node-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction pure",
      "definition": "Fonction sans effet de bord, dont le résultat dépend seulement des arguments."
    },
    {
      "term": "test de bout en bout",
      "definition": "Test qui envoie de vraies requêtes au serveur."
    },
    {
      "term": "cadriciel",
      "definition": "Bibliothèque qui structure une application, comme Express."
    },
    {
      "term": "process.env.PORT",
      "definition": "Port fourni par l’hébergeur au moment du lancement."
    }
  ],
  "recap_fr": [
    "Assembler une petite API complète : logique séparée, routes, validation et erreurs claires.",
    "Tester l’API de bout en bout et comprendre ce qu’il resterait à faire pour la mettre en ligne.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "fonction pure",
    "test de bout en bout",
    "cadriciel",
    "process.env.PORT"
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
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html",
      "scope": "Analyser une adresse et ses paramètres. Texte, exemples et exercices originaux Nunya.",
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

Ce projet réunit tout le cours dans une API de boutique. Elle propose deux routes : GET /produits renvoie le catalogue et ses prix, POST /panier/total reçoit un panier en JSON et renvoie son total. Une application mobile ou le site de la boutique pourraient l’appeler pour afficher les prix et calculer une commande.

La première décision est l’architecture. Le calcul du total ne dépend pas de HTTP : on l’écrit dans une fonction pure, totalPanier(articles), qui reçoit un tableau et renvoie un nombre, ou lève une erreur explicite : panier vide, produit inconnu, quantité invalide. Cette fonction se teste directement, sans serveur, avec des appels simples. Dans un vrai projet, elle vivrait dans son propre module, exporté avec module.exports.

La couche HTTP, elle, fait le travail de réception. Pour chaque requête : analyser le chemin avec URL, vérifier la méthode et répondre 405 sinon, lire le corps avec lireCorps, le convertir avec JSON.parse, appeler totalPanier, et répondre 200 avec le total. Toutes les erreurs sont attrapées au même endroit : une SyntaxError devient « JSON invalide », les erreurs de la logique deviennent des réponses 400 avec leur message, qui a été écrit pour être montré au client. Toute adresse inconnue reçoit un 404.

Remarque l’importance des prix côté serveur. Le client envoie seulement les produits et les quantités, jamais les prix : si le serveur acceptait un prix envoyé par le client, n’importe qui pourrait s’accorder une remise. C’est une règle générale : le serveur recalcule tout ce qui a de la valeur à partir de ses propres données.

Les tests de bout en bout, comme ceux de l’atelier, envoient de vraies requêtes au serveur et vérifient statut, type et corps. Ils complètent les tests de la fonction pure, comme expliqué dans le cours Qualité logicielle de Nunya.

Que manque-t-il pour une mise en ligne ? Appeler listen avec le port fourni par l’hébergeur, process.env.PORT. Garder les données dans une base plutôt qu’en mémoire. Écrire des journaux. Limiter la taille des corps reçus, pour qu’un client ne puisse pas envoyer un fichier énorme. Servir le tout en HTTPS, ce que font les hébergeurs modernes. Et souvent, adopter un cadriciel comme Express ou Fastify, qui fournit routage, lecture du JSON et bonnes pratiques. Le cours Docker et déploiement, prévu dans le parcours back-end, montrera cette étape.

Tu sais maintenant comment fonctionne un serveur de l’intérieur. Les cadriciels te feront gagner du temps ; ils ne te cacheront plus rien.

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

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(donnees));
}

const PRODUITS = { riz: 600, huile: 1500, sel: 150 };

function totalPanier(articles) {
  if (!Array.isArray(articles) || articles.length === 0) throw new Error("panier vide");
  let total = 0;
  for (const a of articles) {
    if (PRODUITS[a.produit] === undefined) throw new Error("produit inconnu : " + a.produit);
    if (!Number.isInteger(a.quantite) || a.quantite < 1) throw new Error("quantité invalide");
    total += PRODUITS[a.produit] * a.quantite;
  }
  return total;
}


console.log(totalPanier([{ produit: "riz", quantite: 2 }, { produit: "sel", quantite: 1 }]));
try {
  totalPanier([{ produit: "sucre", quantite: 1 }]);
} catch (erreur) {
  console.log(erreur.message);
}
```

Affichage attendu :

    1350
    produit inconnu : sucre

Trace :

- La logique se teste sans serveur.
- Les prix viennent du serveur, pas du client.
- Une erreur explicite décrit le problème.

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

const PRODUITS = { riz: 600, huile: 1500, sel: 150 };

function totalPanier(articles) {
  if (!Array.isArray(articles) || articles.length === 0) throw new Error("panier vide");
  let total = 0;
  for (const a of articles) {
    if (PRODUITS[a.produit] === undefined) throw new Error("produit inconnu : " + a.produit);
    if (!Number.isInteger(a.quantite) || a.quantite < 1) throw new Error("quantité invalide");
    total += PRODUITS[a.produit] * a.quantite;
  }
  return total;
}

const serveur = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/produits") {
    if (req.method !== "GET") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
    return envoyerJSON(res, 200, PRODUITS);
  }
  if (pathname === "/panier/total") {
    if (req.method !== "POST") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
    try {
      const total = totalPanier(JSON.parse(await lireCorps(req)));
      return envoyerJSON(res, 200, { total });
    } catch (erreur) {
      return envoyerJSON(res, 400, { erreur: erreur instanceof SyntaxError ? "JSON invalide" : erreur.message });
    }
  }
  envoyerJSON(res, 404, { erreur: "introuvable" });
});

nunyaRequete(serveur, "/panier/total", { method: "POST", body: '[{"produit":"huile","quantite":2}]' }).then(r => console.log(r.statut, r.corps));
```

Affichage attendu :

    200 {"total":3000}

Trace :

- La route POST lit le panier.
- Elle confie le calcul à totalPanier.
- Elle répond 200 avec le total.

## Vérifier et expliquer

Ajoute sur papier une route GET /produits/:nom à cette API : écris ses réponses pour un produit connu et inconnu.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [Node.js — URL](https://nodejs.org/docs/latest-v20.x/api/url.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
