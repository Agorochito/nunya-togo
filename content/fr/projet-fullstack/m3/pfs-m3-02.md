---
{
  "id": "pfs-m3-02",
  "title_fr": "Le panier avec un cookie",
  "course": "projet-fullstack",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "pfs-m3-01"
  ],
  "outcomes": [
    "Lire et écrire un cookie pour garder un petit état entre deux pages.",
    "Choisir les attributs de cookie qui protègent l’utilisateur : HttpOnly, SameSite, Path."
  ],
  "idea_fr": "HTTP oublie tout entre deux requêtes ; un cookie est une petite note que le navigateur renvoie à chaque visite, pour que le serveur se souvienne.",
  "analogy_fr": "Au vestiaire, on te donne un ticket numéroté. Tu le présentes en revenant, et l’on retrouve ton manteau. Le ticket ne contient pas le manteau, seulement de quoi le retrouver.",
  "examples": [
    {
      "code": "function lireCookies(entete) {\n  const cookies = {};\n  for (const morceau of (entete || \"\").split(\";\")) {\n    const i = morceau.indexOf(\"=\");\n    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());\n  }\n  return cookies;\n}\n\nconsole.log(lireCookies(\"panier=1%2C3; langue=fr\"));\nconsole.log(lireCookies(undefined));",
      "expected_output": "{ panier: '1,3', langue: 'fr' }\n{}\n",
      "inputs": [],
      "trace_fr": [
        "L’en-tête est découpé en paires nom-valeur.",
        "La valeur est décodée : %2C devient une virgule.",
        "Sans cookie, on obtient un objet vide."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => { texte += m; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction lireCookies(entete) {\n  const cookies = {};\n  for (const morceau of (entete || \"\").split(\";\")) {\n    const i = morceau.indexOf(\"=\");\n    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());\n  }\n  return cookies;\n}\n\nfunction idsPanier(req) {\n  return (lireCookies(req.headers.cookie).panier || \"\").split(\",\").map(Number).filter(id => trouver(id));\n}\n\nconst serveur = http.createServer(async (req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (pathname === \"/panier\" && req.method === \"GET\") {\n    const articles = idsPanier(req).map(trouver);\n    const total = articles.reduce((s, p) => s + p.prix, 0);\n    return envoyer(res, 200, \"text/html\", page(\"Mon panier\", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));\n  }\n  if (pathname === \"/panier\" && req.method === \"POST\") {\n    const id = Number(new URLSearchParams(await lireCorps(req)).get(\"id\"));\n    const ids = idsPanier(req);\n    if (trouver(id)) ids.push(id);\n    res.writeHead(303, { Location: \"/panier\", \"Set-Cookie\": `panier=${ids.join(\",\")}; Path=/; HttpOnly; SameSite=Lax` });\n    return res.end();\n  }\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n});\n\nnunyaEchange(serveur, \"/panier\", { method: \"POST\", headers: { \"Content-Type\": \"application/x-www-form-urlencoded\", Cookie: \"panier=1\" }, body: \"id=3\" })\n  .then(r => console.log(r.statut, r.entetes.location, r.entetes[\"set-cookie\"]));",
      "expected_output": "303 /panier panier=1,3; Path=/; HttpOnly; SameSite=Lax\n",
      "inputs": [],
      "trace_fr": [
        "Le navigateur envoie le panier actuel : 1.",
        "Le serveur ajoute le produit 3 et renvoie le nouveau cookie.",
        "Les attributs protègent le cookie."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Faire confiance au contenu du cookie",
      "why_fr": "L’utilisateur peut le modifier.",
      "fix_fr": "Vérifie les identifiants, prends les prix dans le modèle."
    },
    {
      "error": "Oublier HttpOnly et SameSite",
      "why_fr": "Le cookie est plus exposé aux attaques.",
      "fix_fr": "Ajoute ces attributs."
    },
    {
      "error": "Stocker des données sensibles dans un cookie",
      "why_fr": "Elles voyagent et se lisent en clair.",
      "fix_fr": "Stocke un identifiant, garde les données côté serveur."
    }
  ],
  "quiz": [
    {
      "question": "Comment le serveur dépose-t-il un cookie ?",
      "options": [
        "Avec l’en-tête Cookie",
        "Avec l’en-tête Set-Cookie",
        "Dans le corps",
        "Avec une redirection"
      ],
      "answer": 1,
      "explanation": "Le navigateur le renvoie ensuite dans Cookie.",
      "id": "pfs-m3-02-q1"
    },
    {
      "question": "Que fait HttpOnly ?",
      "options": [
        "Chiffre le cookie",
        "Empêche le JavaScript de la page de le lire",
        "Le supprime",
        "L’envoie en HTTP seulement"
      ],
      "answer": 1,
      "explanation": "Limite l’effet d’une faille XSS.",
      "id": "pfs-m3-02-q2"
    },
    {
      "question": "D’où doivent venir les prix du panier ?",
      "options": [
        "Du cookie",
        "Du modèle du serveur",
        "Du formulaire",
        "De l’URL"
      ],
      "answer": 1,
      "explanation": "Le cookie est modifiable par l’utilisateur.",
      "id": "pfs-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "cookie",
      "definition": "Petite donnée déposée par le serveur et renvoyée par le navigateur."
    },
    {
      "term": "Set-Cookie",
      "definition": "En-tête de réponse qui dépose un cookie."
    },
    {
      "term": "HttpOnly",
      "definition": "Attribut qui cache le cookie au JavaScript de la page."
    },
    {
      "term": "session",
      "definition": "Mémoire côté serveur reliée à un identifiant aléatoire en cookie."
    }
  ],
  "recap_fr": [
    "Lire et écrire un cookie pour garder un petit état entre deux pages.",
    "Choisir les attributs de cookie qui protègent l’utilisateur : HttpOnly, SameSite, Path.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "cookie",
    "Set-Cookie",
    "HttpOnly",
    "session"
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
      "title": "MDN — cookies HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html"
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    }
  ],
  "sources": [
    {
      "title": "MDN — cookies HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies",
      "scope": "Set-Cookie, HttpOnly, SameSite et durée. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html",
      "scope": "Créer un serveur et répondre aux requêtes. Texte, exemples et exercices originaux Nunya.",
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

HTTP est un protocole sans mémoire : chaque requête est indépendante, et le serveur ne sait pas qu’elle vient de la même personne que la précédente. Pour un panier, il faut pourtant se souvenir de ce que la personne a choisi. Le mécanisme standard s’appelle le cookie.

Le serveur dépose un cookie avec l’en-tête de réponse Set-Cookie : panier=1,3. Le navigateur l’enregistre, puis le renvoie automatiquement dans l’en-tête Cookie de chaque requête suivante vers le même site. Le serveur lit cet en-tête, req.headers.cookie, qui ressemble à "panier=1,3; langue=fr", et le découpe en paires nom-valeur. Une petite fonction lireCookies fait ce travail ; les valeurs sont décodées avec decodeURIComponent.

Pour ajouter un produit, le formulaire envoie POST /panier avec l’identifiant ; le serveur lit le panier actuel, vérifie que le produit existe, ajoute l’identifiant, puis redirige en 303 vers /panier avec le nouveau cookie. La page GET /panier relit le cookie, retrouve les produits avec trouver et calcule le total. Comme toujours, le cookie vient du navigateur : il peut être modifié par l’utilisateur. On ne garde donc que des identifiants qui existent, et les prix viennent toujours du modèle, jamais du cookie.

Les attributs du cookie protègent l’utilisateur. HttpOnly interdit au JavaScript de la page de lire le cookie, ce qui limite les dégâts d’une éventuelle faille XSS. SameSite=Lax empêche l’envoi du cookie dans la plupart des requêtes venues d’autres sites, ce qui protège contre certaines attaques par requêtes forgées. Path=/ rend le cookie valable sur tout le site. En production, l’attribut Secure le réserve aux connexions HTTPS. Max-Age fixe une durée de vie ; sans lui, le cookie disparaît à la fermeture du navigateur.

Un cookie doit rester petit, quelques kilo-octets au plus, et ne jamais contenir d’information sensible en clair. Pour un compte utilisateur, on ne stocke pas le mot de passe ou les données dans le cookie : on y place un identifiant de session aléatoire, et les vraies informations restent sur le serveur, comme le ticket du vestiaire.

Enfin, les cookies relèvent de la vie privée : en Europe et dans de nombreux pays, certains cookies demandent le consentement de l’utilisateur. Un cookie strictement nécessaire au fonctionnement, comme ce panier, en est généralement dispensé, mais il doit être mentionné dans les informations du site.

## Exemple guidé 1

```javascript
function lireCookies(entete) {
  const cookies = {};
  for (const morceau of (entete || "").split(";")) {
    const i = morceau.indexOf("=");
    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());
  }
  return cookies;
}

console.log(lireCookies("panier=1%2C3; langue=fr"));
console.log(lireCookies(undefined));
```

Affichage attendu :

    { panier: '1,3', langue: 'fr' }
    {}

Trace :

- L’en-tête est découpé en paires nom-valeur.
- La valeur est décodée : %2C devient une virgule.
- Sans cookie, on obtient un objet vide.

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

function lireCorps(req) {
  return new Promise((ok, ko) => {
    let texte = "";
    req.on("data", m => { texte += m; });
    req.on("end", () => ok(texte));
    req.on("error", ko);
  });
}

function lireCookies(entete) {
  const cookies = {};
  for (const morceau of (entete || "").split(";")) {
    const i = morceau.indexOf("=");
    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());
  }
  return cookies;
}

function idsPanier(req) {
  return (lireCookies(req.headers.cookie).panier || "").split(",").map(Number).filter(id => trouver(id));
}

const serveur = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/panier" && req.method === "GET") {
    const articles = idsPanier(req).map(trouver);
    const total = articles.reduce((s, p) => s + p.prix, 0);
    return envoyer(res, 200, "text/html", page("Mon panier", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));
  }
  if (pathname === "/panier" && req.method === "POST") {
    const id = Number(new URLSearchParams(await lireCorps(req)).get("id"));
    const ids = idsPanier(req);
    if (trouver(id)) ids.push(id);
    res.writeHead(303, { Location: "/panier", "Set-Cookie": `panier=${ids.join(",")}; Path=/; HttpOnly; SameSite=Lax` });
    return res.end();
  }
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
});

nunyaEchange(serveur, "/panier", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: "panier=1" }, body: "id=3" })
  .then(r => console.log(r.statut, r.entetes.location, r.entetes["set-cookie"]));
```

Affichage attendu :

    303 /panier panier=1,3; Path=/; HttpOnly; SameSite=Lax

Trace :

- Le navigateur envoie le panier actuel : 1.
- Le serveur ajoute le produit 3 et renvoie le nouveau cookie.
- Les attributs protègent le cookie.

## Vérifier et expliquer

Ouvre les outils de développement de ton navigateur sur un site marchand et observe les cookies et leurs attributs.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — cookies HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies)
- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
