---
{
  "id": "pfs-m3-01",
  "title_fr": "Une API JSON à côté des pages",
  "course": "projet-fullstack",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "pfs-m2-03"
  ],
  "outcomes": [
    "Exposer les mêmes données en JSON pour d’autres programmes, comme une application mobile.",
    "Ajouter une recherche par paramètre et réutiliser le modèle de données sans le dupliquer."
  ],
  "idea_fr": "Les pages sont faites pour les personnes, l’API pour les programmes : les deux lisent le même modèle de données, chacune dans son format.",
  "analogy_fr": "Un marché affiche ses prix au tableau pour les clients et envoie la même liste, sur un formulaire standard, au service des statistiques. Les prix sont les mêmes ; seule la présentation change.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nconst serveur = http.createServer((req, res) => {\n  const adresse = new URL(req.url, \"http://localhost\");\n  if (req.method !== \"GET\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n  if (adresse.pathname === \"/api/produits\") {\n    const q = (adresse.searchParams.get(\"q\") || \"\").trim().toLowerCase();\n    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));\n  }\n  const m = /^\\/api\\/produits\\/(\\d+)$/.exec(adresse.pathname);\n  const p = m && trouver(Number(m[1]));\n  if (p) return envoyerJSON(res, 200, p);\n  envoyerJSON(res, 404, { erreur: \"introuvable\" });\n});\n\nnunyaRequete(serveur, \"/api/produits?q=RI\").then(r => console.log(r.statut, r.type, r.corps));",
      "expected_output": "200 application/json [{\"id\":1,\"nom\":\"Riz parfumé\",\"prix\":600},{\"id\":3,\"nom\":\"Gari\",\"prix\":400}]\n",
      "inputs": [],
      "trace_fr": [
        "La recherche ignore les majuscules.",
        "« RI » se trouve dans Riz et dans Gari.",
        "Les données viennent du même modèle que les pages."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\" });\n  res.end(JSON.stringify(donnees));\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nconst serveur = http.createServer((req, res) => {\n  const adresse = new URL(req.url, \"http://localhost\");\n  if (req.method !== \"GET\") return envoyerJSON(res, 405, { erreur: \"méthode non autorisée\" });\n  if (adresse.pathname === \"/api/produits\") {\n    const q = (adresse.searchParams.get(\"q\") || \"\").trim().toLowerCase();\n    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));\n  }\n  const m = /^\\/api\\/produits\\/(\\d+)$/.exec(adresse.pathname);\n  const p = m && trouver(Number(m[1]));\n  if (p) return envoyerJSON(res, 200, p);\n  envoyerJSON(res, 404, { erreur: \"introuvable\" });\n});\n\nnunyaRequete(serveur, \"/api/produits/9\").then(r => console.log(r.statut, r.corps));",
      "expected_output": "404 {\"erreur\":\"introuvable\"}\n",
      "inputs": [],
      "trace_fr": [
        "Le produit 9 n’existe pas.",
        "L’erreur est aussi en JSON.",
        "Le statut 404 reste la première information."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Dupliquer les données pour l’API",
      "why_fr": "Les pages et l’API divergent.",
      "fix_fr": "Appelle les mêmes fonctions du modèle."
    },
    {
      "error": "Renvoyer une page HTML pour une erreur d’API",
      "why_fr": "Le client programmé ne sait pas la lire.",
      "fix_fr": "Réponds en JSON avec un statut clair."
    },
    {
      "error": "Exposer des données internes",
      "why_fr": "Fuite d’informations.",
      "fix_fr": "Construis l’objet renvoyé avec les seules propriétés publiques."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi un préfixe /api ?",
      "options": [
        "Pour la vitesse",
        "Pour séparer les routes des programmes de celles des pages",
        "C’est obligatoire",
        "Pour le référencement"
      ],
      "answer": 1,
      "explanation": "Deux usages distincts.",
      "id": "pfs-m3-01-q1"
    },
    {
      "question": "Que renvoie /api/produits?q= (vide) ?",
      "options": [
        "Rien",
        "Tous les produits",
        "Une erreur",
        "404"
      ],
      "answer": 1,
      "explanation": "Un filtre vide ne filtre rien.",
      "id": "pfs-m3-01-q2"
    },
    {
      "question": "Pourquoi versionner une API, comme /api/v1 ?",
      "options": [
        "Pour décorer",
        "Pour changer le format sans casser les clients existants",
        "Pour la sécurité",
        "C’est inutile"
      ],
      "answer": 1,
      "explanation": "Une API publique est un engagement.",
      "id": "pfs-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "API",
      "definition": "Interface par laquelle des programmes échangent des données."
    },
    {
      "term": "client",
      "definition": "Programme qui appelle l’API."
    },
    {
      "term": "filtre",
      "definition": "Paramètre qui restreint les résultats."
    },
    {
      "term": "version d’API",
      "definition": "Numéro qui permet des changements sans casser les clients."
    }
  ],
  "recap_fr": [
    "Exposer les mêmes données en JSON pour d’autres programmes, comme une application mobile.",
    "Ajouter une recherche par paramètre et réutiliser le modèle de données sans le dupliquer.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "API",
    "client",
    "filtre",
    "version d’API"
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

La boutique a maintenant un site. Une association de livreurs voudrait afficher ses produits dans son application mobile, et un tableau de bord voudrait suivre les prix. Ces programmes n’ont que faire d’une page HTML : ils veulent des données. On ajoute donc une API JSON à côté des pages, sous un préfixe distinct, /api, pour séparer clairement les deux usages.

GET /api/produits renvoie la liste des produits en JSON, GET /api/produits/3 le détail d’un produit, avec le statut 404 et un objet { erreur } s’il n’existe pas. Ces routes appellent exactement les mêmes fonctions lister et trouver que les pages. Le modèle reste unique : si un produit est ajouté par le formulaire, il apparaît aussitôt dans l’API.

Une API utile permet de filtrer. Le paramètre q, dans /api/produits?q=riz, ne garde que les produits dont le nom contient le texte cherché, sans tenir compte des majuscules. On le lit avec searchParams.get, on le nettoie avec trim et toLowerCase, et un paramètre absent revient à ne pas filtrer.

Les réponses de l’API sont toujours du JSON, y compris les erreurs : un client programmé lit plus facilement { "erreur": "introuvable" } qu’une page HTML d’erreur. Le statut HTTP reste la première information : 200, 404, 405. C’est une convention que les développeurs de l’application mobile apprécieront.

Une API publique est un engagement. Une fois que des programmes l’utilisent, changer le nom d’une propriété, par exemple prix en tarif, les casse tous. Les équipes documentent donc leurs routes et ajoutent une version dans l’adresse, comme /api/v1/produits, quand un changement incompatible est inévitable.

Ce que l’API renvoie mérite autant d’attention que ce que la page affiche. Si le modèle contenait un coût d’achat, il ne devrait pas apparaître dans l’API publique : on construit l’objet renvoyé avec seulement les propriétés prévues. Les données internes restent internes.

Enfin, une API ne dépend pas d’un navigateur : on peut la tester avec des outils en ligne de commande comme curl, ou depuis un programme Python, ce qui en fait aussi un excellent moyen de tester l’application elle-même. Dans l’atelier, nunyaRequete joue ce rôle de client programmé.

## Exemple guidé 1

```javascript
const http = require("http");

function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function page(titre, contenu) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${echapper(titre)} · Marché de Bè</title></head>`
    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;
}

const produits = [
  { id: 1, nom: "Riz parfumé", prix: 600 },
  { id: 2, nom: "Huile de palme", prix: 1500 },
  { id: 3, nom: "Gari", prix: 400 },
];
let prochainId = 4;

function lister() {
  return produits.map(p => ({ ...p }));
}

function trouver(id) {
  const p = produits.find(x => x.id === id);
  return p ? { ...p } : undefined;
}

function valider(d) {
  const erreurs = [];
  const nom = typeof d.nom === "string" ? d.nom.trim() : "";
  if (nom.length < 2 || nom.length > 40) erreurs.push("Le nom doit contenir 2 à 40 caractères.");
  const prix = Number(d.prix);
  if (d.prix === undefined || d.prix === "" || !Number.isInteger(prix) || prix <= 0) erreurs.push("Le prix doit être un nombre entier positif.");
  return erreurs;
}

function ajouter(d) {
  const erreurs = valider(d);
  if (erreurs.length) return { ok: false, erreurs };
  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };
  produits.push(produit);
  return { ok: true, produit };
}

function envoyer(res, statut, type, corps) {
  res.writeHead(statut, { "Content-Type": type + "; charset=utf-8" });
  res.end(corps);
}

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(donnees));
}

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

const serveur = http.createServer((req, res) => {
  const adresse = new URL(req.url, "http://localhost");
  if (req.method !== "GET") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
  if (adresse.pathname === "/api/produits") {
    const q = (adresse.searchParams.get("q") || "").trim().toLowerCase();
    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));
  }
  const m = /^\/api\/produits\/(\d+)$/.exec(adresse.pathname);
  const p = m && trouver(Number(m[1]));
  if (p) return envoyerJSON(res, 200, p);
  envoyerJSON(res, 404, { erreur: "introuvable" });
});

nunyaRequete(serveur, "/api/produits?q=RI").then(r => console.log(r.statut, r.type, r.corps));
```

Affichage attendu :

    200 application/json [{"id":1,"nom":"Riz parfumé","prix":600},{"id":3,"nom":"Gari","prix":400}]

Trace :

- La recherche ignore les majuscules.
- « RI » se trouve dans Riz et dans Gari.
- Les données viennent du même modèle que les pages.

## Exemple guidé 2

```javascript
const http = require("http");

function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function page(titre, contenu) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${echapper(titre)} · Marché de Bè</title></head>`
    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;
}

const produits = [
  { id: 1, nom: "Riz parfumé", prix: 600 },
  { id: 2, nom: "Huile de palme", prix: 1500 },
  { id: 3, nom: "Gari", prix: 400 },
];
let prochainId = 4;

function lister() {
  return produits.map(p => ({ ...p }));
}

function trouver(id) {
  const p = produits.find(x => x.id === id);
  return p ? { ...p } : undefined;
}

function valider(d) {
  const erreurs = [];
  const nom = typeof d.nom === "string" ? d.nom.trim() : "";
  if (nom.length < 2 || nom.length > 40) erreurs.push("Le nom doit contenir 2 à 40 caractères.");
  const prix = Number(d.prix);
  if (d.prix === undefined || d.prix === "" || !Number.isInteger(prix) || prix <= 0) erreurs.push("Le prix doit être un nombre entier positif.");
  return erreurs;
}

function ajouter(d) {
  const erreurs = valider(d);
  if (erreurs.length) return { ok: false, erreurs };
  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };
  produits.push(produit);
  return { ok: true, produit };
}

function envoyer(res, statut, type, corps) {
  res.writeHead(statut, { "Content-Type": type + "; charset=utf-8" });
  res.end(corps);
}

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(donnees));
}

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

const serveur = http.createServer((req, res) => {
  const adresse = new URL(req.url, "http://localhost");
  if (req.method !== "GET") return envoyerJSON(res, 405, { erreur: "méthode non autorisée" });
  if (adresse.pathname === "/api/produits") {
    const q = (adresse.searchParams.get("q") || "").trim().toLowerCase();
    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));
  }
  const m = /^\/api\/produits\/(\d+)$/.exec(adresse.pathname);
  const p = m && trouver(Number(m[1]));
  if (p) return envoyerJSON(res, 200, p);
  envoyerJSON(res, 404, { erreur: "introuvable" });
});

nunyaRequete(serveur, "/api/produits/9").then(r => console.log(r.statut, r.corps));
```

Affichage attendu :

    404 {"erreur":"introuvable"}

Trace :

- Le produit 9 n’existe pas.
- L’erreur est aussi en JSON.
- Le statut 404 reste la première information.

## Vérifier et expliquer

Écris les trois routes d’API dont aurait besoin une application mobile de livraison pour cette boutique.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [Node.js — URL](https://nodejs.org/docs/latest-v20.x/api/url.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
