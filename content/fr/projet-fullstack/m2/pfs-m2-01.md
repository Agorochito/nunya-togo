---
{
  "id": "pfs-m2-01",
  "title_fr": "Servir les pages",
  "course": "projet-fullstack",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "pfs-m1-03"
  ],
  "outcomes": [
    "Assembler routeur, données et gabarits dans un serveur qui sert de vraies pages.",
    "Répondre par une page d’erreur 404 lisible pour toute adresse inconnue."
  ],
  "idea_fr": "Le serveur relie les briques du module 1 : pour chaque requête, il trouve la route, lit les données et renvoie une page complète.",
  "analogy_fr": "Le vendeur reçoit la demande, va au bon rayon, emballe le produit dans le papier de la boutique, et répond poliment s’il n’en a pas.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nconst serveur = http.createServer((req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (req.method === \"GET\" && pathname === \"/\") {\n    return envoyer(res, 200, \"text/html\", page(\"Nos produits\", listeHTML(lister())));\n  }\n  const m = /^\\/produits\\/(\\d+)$/.exec(pathname);\n  const p = m && trouver(Number(m[1]));\n  if (req.method === \"GET\" && p) {\n    return envoyer(res, 200, \"text/html\", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href=\"/\">Retour</a></p>`));\n  }\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n});\n\nnunyaRequete(serveur, \"/\").then(r => console.log(r.statut, r.type, (r.corps.match(/<li>/g) || []).length, r.corps.includes(\"Gari\")));",
      "expected_output": "200 text/html 3 true\n",
      "inputs": [],
      "trace_fr": [
        "L’accueil liste les trois produits.",
        "Le type est text/html.",
        "Le nom de chaque produit apparaît."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nconst serveur = http.createServer((req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (req.method === \"GET\" && pathname === \"/\") {\n    return envoyer(res, 200, \"text/html\", page(\"Nos produits\", listeHTML(lister())));\n  }\n  const m = /^\\/produits\\/(\\d+)$/.exec(pathname);\n  const p = m && trouver(Number(m[1]));\n  if (req.method === \"GET\" && p) {\n    return envoyer(res, 200, \"text/html\", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href=\"/\">Retour</a></p>`));\n  }\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n});\n\nnunyaRequete(serveur, \"/produits/99\").then(r => console.log(r.statut, r.corps.includes(\"<h1>Introuvable</h1>\")));",
      "expected_output": "404 true\n",
      "inputs": [],
      "trace_fr": [
        "Le produit 99 n’existe pas.",
        "Le serveur répond 404 avec une vraie page.",
        "Le visiteur garde un lien vers l’accueil."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Répondre 200 avec une page vide pour un produit absent",
      "why_fr": "Les moteurs et les visiteurs sont trompés.",
      "fix_fr": "Réponds 404 avec une page claire."
    },
    {
      "error": "Accepter n’importe quel texte comme identifiant",
      "why_fr": "Confusion avec /produits/nouveau.",
      "fix_fr": "Exige des chiffres."
    },
    {
      "error": "Répéter writeHead dans chaque route",
      "why_fr": "Un type oublié ici ou là.",
      "fix_fr": "Une fonction envoyer."
    }
  ],
  "quiz": [
    {
      "question": "Quel statut pour /produits/99 si ce produit n’existe pas ?",
      "options": [
        "200",
        "301",
        "404",
        "500"
      ],
      "answer": 2,
      "explanation": "Introuvable.",
      "id": "pfs-m2-01-q1"
    },
    {
      "question": "Pourquoi /^\\/produits\\/(\\d+)$/ ?",
      "options": [
        "Pour la vitesse",
        "Pour n’accepter que des identifiants en chiffres",
        "Pour le référencement",
        "Par habitude"
      ],
      "answer": 1,
      "explanation": "« nouveau » ne correspond pas.",
      "id": "pfs-m2-01-q2"
    },
    {
      "question": "Que joue nunyaRequete dans l’atelier ?",
      "options": [
        "Le serveur",
        "Le navigateur qui demande une page",
        "La base de données",
        "Le pare-feu"
      ],
      "answer": 1,
      "explanation": "Il envoie la requête.",
      "id": "pfs-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "gestionnaire",
      "definition": "Fonction qui reçoit chaque requête."
    },
    {
      "term": "page d’erreur",
      "definition": "Page renvoyée quand la demande ne peut pas aboutir."
    },
    {
      "term": "expression régulière",
      "definition": "Motif qui décrit la forme d’un texte."
    },
    {
      "term": "rendu côté serveur",
      "definition": "Pages HTML complètes envoyées par le serveur."
    }
  ],
  "recap_fr": [
    "Assembler routeur, données et gabarits dans un serveur qui sert de vraies pages.",
    "Répondre par une page d’erreur 404 lisible pour toute adresse inconnue.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "gestionnaire",
    "page d’erreur",
    "expression régulière",
    "rendu côté serveur"
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

Les briques du premier module sont prêtes : le modèle de données, les gabarits HTML et l’échappement. Il reste à les relier dans un serveur HTTP. Le gestionnaire de requêtes analyse l’adresse avec URL, puis décide quoi répondre.

La page d’accueil, GET /, affiche la liste des produits : le gestionnaire appelle lister(), passe le résultat à listeHTML, enveloppe le tout avec page("Nos produits", …) et répond avec le statut 200 et le type text/html; charset=utf-8. Une fonction envoyer(res, statut, type, corps) évite de répéter ces trois lignes dans chaque route.

La page de détail, GET /produits/3, reconnaît le paramètre, ici avec une expression régulière, /^\/produits\/(\d+)$/, qui n’accepte que des chiffres. Elle convertit l’identifiant avec Number, appelle trouver, et affiche le produit. Si le produit n’existe pas, ou si l’adresse ne correspond à aucune route, le serveur répond 404 avec une vraie page : un titre « Introuvable », une phrase d’explication et un lien vers l’accueil. Une page d’erreur soignée garde le visiteur sur le site au lieu de le perdre.

L’ordre des vérifications compte. Une route fixe comme /produits/nouveau, ajoutée dans la leçon suivante, ressemble à /produits/:id. L’expression régulière qui exige des chiffres évite toute confusion : « nouveau » ne sera jamais pris pour un identifiant.

Les liens entre pages se construisent avec les identifiants : href="/produits/3". Le serveur ne fait confiance qu’à ses propres données pour les construire ; aucun texte saisi n’entre dans une adresse sans contrôle.

Dans l’atelier, nunyaRequete joue le rôle du navigateur. Les vérifications regardent le statut, le type de contenu et des morceaux du corps : la présence du nom d’un produit, le nombre d’éléments de la liste, la balise h1. Sur ton ordinateur, tu ajouterais serveur.listen(3000) et ouvrirais http://localhost:3000 dans un navigateur pour voir les mêmes pages.

Ce serveur est déjà un vrai site, rendu côté serveur, sans JavaScript dans le navigateur. Il s’affiche vite, même avec une connexion lente, et fonctionne sur tous les téléphones. Les leçons suivantes y ajoutent les formulaires, l’API et le panier.

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

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

const serveur = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (req.method === "GET" && pathname === "/") {
    return envoyer(res, 200, "text/html", page("Nos produits", listeHTML(lister())));
  }
  const m = /^\/produits\/(\d+)$/.exec(pathname);
  const p = m && trouver(Number(m[1]));
  if (req.method === "GET" && p) {
    return envoyer(res, 200, "text/html", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href="/">Retour</a></p>`));
  }
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
});

nunyaRequete(serveur, "/").then(r => console.log(r.statut, r.type, (r.corps.match(/<li>/g) || []).length, r.corps.includes("Gari")));
```

Affichage attendu :

    200 text/html 3 true

Trace :

- L’accueil liste les trois produits.
- Le type est text/html.
- Le nom de chaque produit apparaît.

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

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

const serveur = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (req.method === "GET" && pathname === "/") {
    return envoyer(res, 200, "text/html", page("Nos produits", listeHTML(lister())));
  }
  const m = /^\/produits\/(\d+)$/.exec(pathname);
  const p = m && trouver(Number(m[1]));
  if (req.method === "GET" && p) {
    return envoyer(res, 200, "text/html", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href="/">Retour</a></p>`));
  }
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
});

nunyaRequete(serveur, "/produits/99").then(r => console.log(r.statut, r.corps.includes("<h1>Introuvable</h1>")));
```

Affichage attendu :

    404 true

Trace :

- Le produit 99 n’existe pas.
- Le serveur répond 404 avec une vraie page.
- Le visiteur garde un lien vers l’accueil.

## Vérifier et expliquer

Dessine les trois pages de ce module et les liens qui les relient.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
