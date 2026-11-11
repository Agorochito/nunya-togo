---
{
  "id": "pfs-m4-03",
  "title_fr": "Projet final : la boutique complète",
  "course": "projet-fullstack",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "pfs-m4-02"
  ],
  "outcomes": [
    "Assembler pages, formulaire, API, panier et protections dans une application complète.",
    "Vérifier l’application de bout en bout et savoir ce qu’il faut pour la mettre en ligne."
  ],
  "idea_fr": "Une application complète n’est pas une somme de morceaux : c’est un ensemble cohérent où chaque requête trouve une réponse sûre, quelle que soit la porte par laquelle elle entre.",
  "analogy_fr": "Une boutique qui ouvre ses portes a une vitrine, une caisse, un registre, des serrures et un règlement intérieur. Il suffit qu’un seul manque pour que tout le reste soit fragilisé.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, {\n    \"Content-Type\": type + \"; charset=utf-8\",\n    \"X-Content-Type-Options\": \"nosniff\",\n    \"Content-Security-Policy\": \"default-src 'self'\",\n    \"Cache-Control\": \"no-store\",\n  });\n  res.end(corps);\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\", \"X-Content-Type-Options\": \"nosniff\" });\n  res.end(JSON.stringify(donnees));\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nfunction lireCorps(req, limite = 10000) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => {\n      texte += m;\n      if (texte.length > limite) {\n        const e = new Error(\"corps trop volumineux\");\n        e.statut = 413;\n        ko(e);\n        req.removeAllListeners(\"data\");\n        req.resume();\n      }\n    });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction formulaire(valeurs, erreurs) {\n  const liste = erreurs.length ? \"<ul class=\\\"erreurs\\\">\" + erreurs.map(e => `<li>${echapper(e)}</li>`).join(\"\") + \"</ul>\" : \"\";\n  return liste + `<form method=\"post\" action=\"/produits\">`\n    + `<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" value=\"${echapper(valeurs.nom ?? \"\")}\" required>`\n    + `<label for=\"prix\">Prix (FCFA)</label><input id=\"prix\" name=\"prix\" type=\"number\" value=\"${echapper(valeurs.prix ?? \"\")}\" required>`\n    + `<button type=\"submit\">Ajouter</button></form>`;\n}\n\nfunction lireCookies(entete) {\n  const cookies = {};\n  for (const morceau of (entete || \"\").split(\";\")) {\n    const i = morceau.indexOf(\"=\");\n    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());\n  }\n  return cookies;\n}\n\nfunction idsPanier(req) {\n  return (lireCookies(req.headers.cookie).panier || \"\").split(\",\").map(Number).filter(id => trouver(id));\n}\n\nfunction gestionnaireSur(traiter) {\n  return async (req, res) => {\n    try {\n      await traiter(req, res);\n    } catch (erreur) {\n      console.error(\"Erreur :\", erreur.message);\n      if (!res.headersSent) {\n        const statut = erreur.statut === 413 ? 413 : 500;\n        envoyer(res, statut, \"text/html\", page(statut === 413 ? \"Envoi trop volumineux\" : \"Erreur\", \"<p>Une erreur est survenue. Réessaie plus tard.</p>\"));\n      }\n    }\n  };\n}\n\nconst serveur = http.createServer(gestionnaireSur(async (req, res) => {\n  const adresse = new URL(req.url, \"http://localhost\");\n  const chemin = adresse.pathname;\n  if (chemin === \"/api/produits\" && req.method === \"GET\") {\n    const q = (adresse.searchParams.get(\"q\") || \"\").trim().toLowerCase();\n    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));\n  }\n  if (chemin.startsWith(\"/api/\")) return envoyerJSON(res, 404, { erreur: \"introuvable\" });\n  if (req.method === \"GET\" && chemin === \"/\") return envoyer(res, 200, \"text/html\", page(\"Nos produits\", listeHTML(lister())));\n  if (req.method === \"GET\" && chemin === \"/produits/nouveau\") return envoyer(res, 200, \"text/html\", page(\"Nouveau produit\", formulaire({}, [])));\n  if (req.method === \"POST\" && chemin === \"/produits\") {\n    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req, 2000)));\n    const r = ajouter(donnees);\n    if (!r.ok) return envoyer(res, 400, \"text/html\", page(\"Nouveau produit\", formulaire(donnees, r.erreurs)));\n    res.writeHead(303, { Location: \"/produits/\" + r.produit.id });\n    return res.end();\n  }\n  if (chemin === \"/panier\" && req.method === \"GET\") {\n    const articles = idsPanier(req).map(trouver);\n    const total = articles.reduce((s, p) => s + p.prix, 0);\n    return envoyer(res, 200, \"text/html\", page(\"Mon panier\", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));\n  }\n  if (chemin === \"/panier\" && req.method === \"POST\") {\n    const id = Number(new URLSearchParams(await lireCorps(req, 200)).get(\"id\"));\n    const ids = idsPanier(req);\n    if (trouver(id)) ids.push(id);\n    res.writeHead(303, { Location: \"/panier\", \"Set-Cookie\": `panier=${ids.join(\",\")}; Path=/; HttpOnly; SameSite=Lax` });\n    return res.end();\n  }\n  const m = /^\\/produits\\/(\\d+)$/.exec(chemin);\n  const p = m && trouver(Number(m[1]));\n  if (req.method === \"GET\" && p) return envoyer(res, 200, \"text/html\", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href=\"/\">Retour</a></p>`));\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n}));\n\n(async () => {\n  const a = await nunyaEchange(serveur, \"/produits\", { method: \"POST\", headers: { \"Content-Type\": \"application/x-www-form-urlencoded\" }, body: \"nom=Mangue&prix=300\" });\n  const b = await nunyaRequete(http.createServer(serveur.listeners(\"request\")[0]), \"/api/produits?q=mangue\");\n  console.log(a.statut, a.entetes.location, b.corps);\n})();",
      "expected_output": "303 /produits/4 [{\"id\":4,\"nom\":\"Mangue\",\"prix\":300}]\n",
      "inputs": [],
      "trace_fr": [
        "La commerçante ajoute un produit par le formulaire.",
        "L’application mobile le trouve aussitôt dans l’API.",
        "Un seul modèle de données sert les deux portes."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, {\n    \"Content-Type\": type + \"; charset=utf-8\",\n    \"X-Content-Type-Options\": \"nosniff\",\n    \"Content-Security-Policy\": \"default-src 'self'\",\n    \"Cache-Control\": \"no-store\",\n  });\n  res.end(corps);\n}\n\nfunction envoyerJSON(res, statut, donnees) {\n  res.writeHead(statut, { \"Content-Type\": \"application/json; charset=utf-8\", \"X-Content-Type-Options\": \"nosniff\" });\n  res.end(JSON.stringify(donnees));\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nfunction lireCorps(req, limite = 10000) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => {\n      texte += m;\n      if (texte.length > limite) {\n        const e = new Error(\"corps trop volumineux\");\n        e.statut = 413;\n        ko(e);\n        req.removeAllListeners(\"data\");\n        req.resume();\n      }\n    });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction formulaire(valeurs, erreurs) {\n  const liste = erreurs.length ? \"<ul class=\\\"erreurs\\\">\" + erreurs.map(e => `<li>${echapper(e)}</li>`).join(\"\") + \"</ul>\" : \"\";\n  return liste + `<form method=\"post\" action=\"/produits\">`\n    + `<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" value=\"${echapper(valeurs.nom ?? \"\")}\" required>`\n    + `<label for=\"prix\">Prix (FCFA)</label><input id=\"prix\" name=\"prix\" type=\"number\" value=\"${echapper(valeurs.prix ?? \"\")}\" required>`\n    + `<button type=\"submit\">Ajouter</button></form>`;\n}\n\nfunction lireCookies(entete) {\n  const cookies = {};\n  for (const morceau of (entete || \"\").split(\";\")) {\n    const i = morceau.indexOf(\"=\");\n    if (i > 0) cookies[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());\n  }\n  return cookies;\n}\n\nfunction idsPanier(req) {\n  return (lireCookies(req.headers.cookie).panier || \"\").split(\",\").map(Number).filter(id => trouver(id));\n}\n\nfunction gestionnaireSur(traiter) {\n  return async (req, res) => {\n    try {\n      await traiter(req, res);\n    } catch (erreur) {\n      console.error(\"Erreur :\", erreur.message);\n      if (!res.headersSent) {\n        const statut = erreur.statut === 413 ? 413 : 500;\n        envoyer(res, statut, \"text/html\", page(statut === 413 ? \"Envoi trop volumineux\" : \"Erreur\", \"<p>Une erreur est survenue. Réessaie plus tard.</p>\"));\n      }\n    }\n  };\n}\n\nconst serveur = http.createServer(gestionnaireSur(async (req, res) => {\n  const adresse = new URL(req.url, \"http://localhost\");\n  const chemin = adresse.pathname;\n  if (chemin === \"/api/produits\" && req.method === \"GET\") {\n    const q = (adresse.searchParams.get(\"q\") || \"\").trim().toLowerCase();\n    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));\n  }\n  if (chemin.startsWith(\"/api/\")) return envoyerJSON(res, 404, { erreur: \"introuvable\" });\n  if (req.method === \"GET\" && chemin === \"/\") return envoyer(res, 200, \"text/html\", page(\"Nos produits\", listeHTML(lister())));\n  if (req.method === \"GET\" && chemin === \"/produits/nouveau\") return envoyer(res, 200, \"text/html\", page(\"Nouveau produit\", formulaire({}, [])));\n  if (req.method === \"POST\" && chemin === \"/produits\") {\n    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req, 2000)));\n    const r = ajouter(donnees);\n    if (!r.ok) return envoyer(res, 400, \"text/html\", page(\"Nouveau produit\", formulaire(donnees, r.erreurs)));\n    res.writeHead(303, { Location: \"/produits/\" + r.produit.id });\n    return res.end();\n  }\n  if (chemin === \"/panier\" && req.method === \"GET\") {\n    const articles = idsPanier(req).map(trouver);\n    const total = articles.reduce((s, p) => s + p.prix, 0);\n    return envoyer(res, 200, \"text/html\", page(\"Mon panier\", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));\n  }\n  if (chemin === \"/panier\" && req.method === \"POST\") {\n    const id = Number(new URLSearchParams(await lireCorps(req, 200)).get(\"id\"));\n    const ids = idsPanier(req);\n    if (trouver(id)) ids.push(id);\n    res.writeHead(303, { Location: \"/panier\", \"Set-Cookie\": `panier=${ids.join(\",\")}; Path=/; HttpOnly; SameSite=Lax` });\n    return res.end();\n  }\n  const m = /^\\/produits\\/(\\d+)$/.exec(chemin);\n  const p = m && trouver(Number(m[1]));\n  if (req.method === \"GET\" && p) return envoyer(res, 200, \"text/html\", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href=\"/\">Retour</a></p>`));\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n}));\n\nnunyaRequete(serveur, \"/panier\", { headers: { Cookie: \"panier=1,2,999\" } }).then(r => console.log(r.statut, r.corps.includes(\"Total : 2100 FCFA\"), (r.corps.match(/<li>/g) || []).length));",
      "expected_output": "200 true 2\n",
      "inputs": [],
      "trace_fr": [
        "Le cookie contient un identifiant inventé, 999.",
        "Il est ignoré.",
        "Le total utilise les prix du modèle."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Router les erreurs d’API vers une page HTML",
      "why_fr": "Les clients programmés ne savent pas la lire.",
      "fix_fr": "Réponds en JSON sous /api/."
    },
    {
      "error": "Tester seulement le parcours idéal",
      "why_fr": "Les erreurs et les abus passent inaperçus.",
      "fix_fr": "Rejoue aussi les parcours d’erreur et malveillants."
    },
    {
      "error": "Mettre en ligne avec des données en mémoire",
      "why_fr": "Tout disparaît au redémarrage.",
      "fix_fr": "Utilise une base de données."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi traiter /api/ avant les pages ?",
      "options": [
        "Pour la vitesse",
        "Pour que toute erreur d’API soit en JSON",
        "C’est obligatoire",
        "Pour le référencement"
      ],
      "answer": 1,
      "explanation": "Chaque porte garde son format.",
      "id": "pfs-m4-03-q1"
    },
    {
      "question": "Que manque-t-il pour une vraie mise en ligne ?",
      "options": [
        "Rien",
        "Une base de données, HTTPS, listen sur le port configuré, des comptes sécurisés",
        "Des couleurs",
        "Un cookie de plus"
      ],
      "answer": 1,
      "explanation": "Le projet isole déjà ces changements.",
      "id": "pfs-m4-03-q2"
    },
    {
      "question": "Que doit faire un cookie trafiqué ?",
      "options": [
        "Changer les prix",
        "Être ignoré pour ce qui n’existe pas",
        "Planter le serveur",
        "Créer des produits"
      ],
      "answer": 1,
      "explanation": "Les données font foi.",
      "id": "pfs-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "application full-stack",
      "definition": "Application qui couvre données, serveur et pages."
    },
    {
      "term": "test de bout en bout",
      "definition": "Test qui rejoue un parcours complet par de vraies requêtes."
    },
    {
      "term": "mise en ligne",
      "definition": "Publication d’une application pour de vrais utilisateurs."
    },
    {
      "term": "cadriciel",
      "definition": "Bibliothèque qui structure une application, comme Express."
    }
  ],
  "recap_fr": [
    "Assembler pages, formulaire, API, panier et protections dans une application complète.",
    "Vérifier l’application de bout en bout et savoir ce qu’il faut pour la mettre en ligne.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "application full-stack",
    "test de bout en bout",
    "mise en ligne",
    "cadriciel"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    },
    {
      "title": "MDN — cookies HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — cookies HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies",
      "scope": "Set-Cookie, HttpOnly, SameSite et durée. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ce dernier chapitre assemble tout le projet dans un seul serveur : la page d’accueil et les pages de produits, le formulaire avec ses erreurs et sa redirection, l’API JSON avec recherche, le panier en cookie, le filet de sécurité, la limite de taille et les en-têtes de sécurité. Le modèle de données, unique, est partagé par toutes ces portes d’entrée.

L’ordre du routage mérite une dernière attention. Les routes d’API sont traitées d’abord, et tout chemin commençant par /api/ qui ne correspond à rien reçoit une erreur JSON, jamais une page HTML. Les routes fixes, comme /produits/nouveau, passent avant les routes à paramètres. La dernière ligne répond 404 à tout le reste. Le filet de sécurité, autour de l’ensemble, garantit une réponse même en cas d’erreur imprévue.

Pour vérifier l’application, on la parcourt comme les différents utilisateurs le feraient. Une cliente consulte l’accueil, ouvre un produit, l’ajoute au panier et voit le total. Une commerçante ajoute un produit, se trompe, corrige grâce aux messages, puis voit le nouveau produit dans la liste et dans l’API. Une application mobile cherche « riz » dans l’API. Un visiteur malveillant envoie un nom piégé, un cookie trafiqué, un corps énorme. Chaque parcours doit aboutir à une réponse correcte et sûre. Les tests de l’atelier rejouent ces parcours automatiquement, comme le ferait une suite de tests de bout en bout en entreprise.

Pour une vraie mise en ligne, il resterait plusieurs étapes. Remplacer le tableau en mémoire par une base de données, pour que les produits survivent à un redémarrage : le cours SQL fournit les bases, et le module de données isole déjà ce changement. Appeler serveur.listen avec le port de la configuration. Servir l’application en HTTPS, ce que font les hébergeurs modernes. Ajouter des comptes pour la commerçante, avec des mots de passe hachés et des sessions, comme expliqué dans le cours de cybersécurité. Mettre en place des sauvegardes et une surveillance des journaux.

Beaucoup d’équipes adopteraient aussi un cadriciel comme Express ou Fastify, et un moteur de gabarits. Tu reconnaîtras dans leur documentation chacune des idées de ce projet : routes, corps de requête, redirections, cookies, gestion d’erreurs, en-têtes. Tu sauras ce qu’ils font pour toi et pourquoi.

Tu as construit une application web complète, de la donnée à la page, sans boîte noire. C’est exactement ce qu’on attend d’un développeur full-stack débutant.

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
  res.writeHead(statut, {
    "Content-Type": type + "; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'self'",
    "Cache-Control": "no-store",
  });
  res.end(corps);
}

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8", "X-Content-Type-Options": "nosniff" });
  res.end(JSON.stringify(donnees));
}

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

function lireCorps(req, limite = 10000) {
  return new Promise((ok, ko) => {
    let texte = "";
    req.on("data", m => {
      texte += m;
      if (texte.length > limite) {
        const e = new Error("corps trop volumineux");
        e.statut = 413;
        ko(e);
        req.removeAllListeners("data");
        req.resume();
      }
    });
    req.on("end", () => ok(texte));
    req.on("error", ko);
  });
}

function formulaire(valeurs, erreurs) {
  const liste = erreurs.length ? "<ul class=\"erreurs\">" + erreurs.map(e => `<li>${echapper(e)}</li>`).join("") + "</ul>" : "";
  return liste + `<form method="post" action="/produits">`
    + `<label for="nom">Nom</label><input id="nom" name="nom" value="${echapper(valeurs.nom ?? "")}" required>`
    + `<label for="prix">Prix (FCFA)</label><input id="prix" name="prix" type="number" value="${echapper(valeurs.prix ?? "")}" required>`
    + `<button type="submit">Ajouter</button></form>`;
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

function gestionnaireSur(traiter) {
  return async (req, res) => {
    try {
      await traiter(req, res);
    } catch (erreur) {
      console.error("Erreur :", erreur.message);
      if (!res.headersSent) {
        const statut = erreur.statut === 413 ? 413 : 500;
        envoyer(res, statut, "text/html", page(statut === 413 ? "Envoi trop volumineux" : "Erreur", "<p>Une erreur est survenue. Réessaie plus tard.</p>"));
      }
    }
  };
}

const serveur = http.createServer(gestionnaireSur(async (req, res) => {
  const adresse = new URL(req.url, "http://localhost");
  const chemin = adresse.pathname;
  if (chemin === "/api/produits" && req.method === "GET") {
    const q = (adresse.searchParams.get("q") || "").trim().toLowerCase();
    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));
  }
  if (chemin.startsWith("/api/")) return envoyerJSON(res, 404, { erreur: "introuvable" });
  if (req.method === "GET" && chemin === "/") return envoyer(res, 200, "text/html", page("Nos produits", listeHTML(lister())));
  if (req.method === "GET" && chemin === "/produits/nouveau") return envoyer(res, 200, "text/html", page("Nouveau produit", formulaire({}, [])));
  if (req.method === "POST" && chemin === "/produits") {
    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req, 2000)));
    const r = ajouter(donnees);
    if (!r.ok) return envoyer(res, 400, "text/html", page("Nouveau produit", formulaire(donnees, r.erreurs)));
    res.writeHead(303, { Location: "/produits/" + r.produit.id });
    return res.end();
  }
  if (chemin === "/panier" && req.method === "GET") {
    const articles = idsPanier(req).map(trouver);
    const total = articles.reduce((s, p) => s + p.prix, 0);
    return envoyer(res, 200, "text/html", page("Mon panier", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));
  }
  if (chemin === "/panier" && req.method === "POST") {
    const id = Number(new URLSearchParams(await lireCorps(req, 200)).get("id"));
    const ids = idsPanier(req);
    if (trouver(id)) ids.push(id);
    res.writeHead(303, { Location: "/panier", "Set-Cookie": `panier=${ids.join(",")}; Path=/; HttpOnly; SameSite=Lax` });
    return res.end();
  }
  const m = /^\/produits\/(\d+)$/.exec(chemin);
  const p = m && trouver(Number(m[1]));
  if (req.method === "GET" && p) return envoyer(res, 200, "text/html", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href="/">Retour</a></p>`));
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
}));

(async () => {
  const a = await nunyaEchange(serveur, "/produits", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "nom=Mangue&prix=300" });
  const b = await nunyaRequete(http.createServer(serveur.listeners("request")[0]), "/api/produits?q=mangue");
  console.log(a.statut, a.entetes.location, b.corps);
})();
```

Affichage attendu :

    303 /produits/4 [{"id":4,"nom":"Mangue","prix":300}]

Trace :

- La commerçante ajoute un produit par le formulaire.
- L’application mobile le trouve aussitôt dans l’API.
- Un seul modèle de données sert les deux portes.

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
  res.writeHead(statut, {
    "Content-Type": type + "; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'self'",
    "Cache-Control": "no-store",
  });
  res.end(corps);
}

function envoyerJSON(res, statut, donnees) {
  res.writeHead(statut, { "Content-Type": "application/json; charset=utf-8", "X-Content-Type-Options": "nosniff" });
  res.end(JSON.stringify(donnees));
}

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

function lireCorps(req, limite = 10000) {
  return new Promise((ok, ko) => {
    let texte = "";
    req.on("data", m => {
      texte += m;
      if (texte.length > limite) {
        const e = new Error("corps trop volumineux");
        e.statut = 413;
        ko(e);
        req.removeAllListeners("data");
        req.resume();
      }
    });
    req.on("end", () => ok(texte));
    req.on("error", ko);
  });
}

function formulaire(valeurs, erreurs) {
  const liste = erreurs.length ? "<ul class=\"erreurs\">" + erreurs.map(e => `<li>${echapper(e)}</li>`).join("") + "</ul>" : "";
  return liste + `<form method="post" action="/produits">`
    + `<label for="nom">Nom</label><input id="nom" name="nom" value="${echapper(valeurs.nom ?? "")}" required>`
    + `<label for="prix">Prix (FCFA)</label><input id="prix" name="prix" type="number" value="${echapper(valeurs.prix ?? "")}" required>`
    + `<button type="submit">Ajouter</button></form>`;
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

function gestionnaireSur(traiter) {
  return async (req, res) => {
    try {
      await traiter(req, res);
    } catch (erreur) {
      console.error("Erreur :", erreur.message);
      if (!res.headersSent) {
        const statut = erreur.statut === 413 ? 413 : 500;
        envoyer(res, statut, "text/html", page(statut === 413 ? "Envoi trop volumineux" : "Erreur", "<p>Une erreur est survenue. Réessaie plus tard.</p>"));
      }
    }
  };
}

const serveur = http.createServer(gestionnaireSur(async (req, res) => {
  const adresse = new URL(req.url, "http://localhost");
  const chemin = adresse.pathname;
  if (chemin === "/api/produits" && req.method === "GET") {
    const q = (adresse.searchParams.get("q") || "").trim().toLowerCase();
    return envoyerJSON(res, 200, lister().filter(p => p.nom.toLowerCase().includes(q)));
  }
  if (chemin.startsWith("/api/")) return envoyerJSON(res, 404, { erreur: "introuvable" });
  if (req.method === "GET" && chemin === "/") return envoyer(res, 200, "text/html", page("Nos produits", listeHTML(lister())));
  if (req.method === "GET" && chemin === "/produits/nouveau") return envoyer(res, 200, "text/html", page("Nouveau produit", formulaire({}, [])));
  if (req.method === "POST" && chemin === "/produits") {
    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req, 2000)));
    const r = ajouter(donnees);
    if (!r.ok) return envoyer(res, 400, "text/html", page("Nouveau produit", formulaire(donnees, r.erreurs)));
    res.writeHead(303, { Location: "/produits/" + r.produit.id });
    return res.end();
  }
  if (chemin === "/panier" && req.method === "GET") {
    const articles = idsPanier(req).map(trouver);
    const total = articles.reduce((s, p) => s + p.prix, 0);
    return envoyer(res, 200, "text/html", page("Mon panier", listeHTML(articles) + `<p>Total : ${total} FCFA</p>`));
  }
  if (chemin === "/panier" && req.method === "POST") {
    const id = Number(new URLSearchParams(await lireCorps(req, 200)).get("id"));
    const ids = idsPanier(req);
    if (trouver(id)) ids.push(id);
    res.writeHead(303, { Location: "/panier", "Set-Cookie": `panier=${ids.join(",")}; Path=/; HttpOnly; SameSite=Lax` });
    return res.end();
  }
  const m = /^\/produits\/(\d+)$/.exec(chemin);
  const p = m && trouver(Number(m[1]));
  if (req.method === "GET" && p) return envoyer(res, 200, "text/html", page(p.nom, `<p>Prix : ${p.prix} FCFA</p><p><a href="/">Retour</a></p>`));
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
}));

nunyaRequete(serveur, "/panier", { headers: { Cookie: "panier=1,2,999" } }).then(r => console.log(r.statut, r.corps.includes("Total : 2100 FCFA"), (r.corps.match(/<li>/g) || []).length));
```

Affichage attendu :

    200 true 2

Trace :

- Le cookie contient un identifiant inventé, 999.
- Il est ignoré.
- Le total utilise les prix du modèle.

## Vérifier et expliquer

Écris trois parcours d’utilisateurs, dont un malveillant, et vérifie que l’application répond correctement à chacun.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
- [MDN — cookies HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies)
