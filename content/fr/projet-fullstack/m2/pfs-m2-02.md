---
{
  "id": "pfs-m2-02",
  "title_fr": "Recevoir un formulaire",
  "course": "projet-fullstack",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "pfs-m2-01"
  ],
  "outcomes": [
    "Lire les données d’un formulaire HTML envoyé en POST.",
    "Rediriger après l’enregistrement avec le statut 303, selon le modèle Post/Redirect/Get."
  ],
  "idea_fr": "Un formulaire envoie ses champs encodés dans le corps de la requête ; après l’enregistrement, le serveur redirige vers la nouvelle page au lieu de répondre directement.",
  "analogy_fr": "Après avoir payé à la caisse, on te remet un ticket et on t’envoie au comptoir de retrait. Si tu reviens à la caisse, on ne te fait pas payer une deuxième fois.",
  "examples": [
    {
      "code": "console.log(Object.fromEntries(new URLSearchParams(\"nom=Mangue&prix=300\")));\nconsole.log(new URLSearchParams(\"nom=Pain+de+mie\").get(\"nom\"));",
      "expected_output": "{ nom: 'Mangue', prix: '300' }\nPain de mie\n",
      "inputs": [],
      "trace_fr": [
        "URLSearchParams décode le corps du formulaire.",
        "Les valeurs restent des chaînes.",
        "Les + redeviennent des espaces."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => { texte += m; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction formulaire(valeurs, erreurs) {\n  const liste = erreurs.length ? \"<ul class=\\\"erreurs\\\">\" + erreurs.map(e => `<li>${echapper(e)}</li>`).join(\"\") + \"</ul>\" : \"\";\n  return liste + `<form method=\"post\" action=\"/produits\">`\n    + `<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" value=\"${echapper(valeurs.nom ?? \"\")}\" required>`\n    + `<label for=\"prix\">Prix (FCFA)</label><input id=\"prix\" name=\"prix\" type=\"number\" value=\"${echapper(valeurs.prix ?? \"\")}\" required>`\n    + `<button type=\"submit\">Ajouter</button></form>`;\n}\n\nconst serveur = http.createServer(async (req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (pathname === \"/produits/nouveau\" && req.method === \"GET\") {\n    return envoyer(res, 200, \"text/html\", page(\"Nouveau produit\", formulaire({}, [])));\n  }\n  if (pathname === \"/produits\" && req.method === \"POST\") {\n    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req)));\n    const resultat = ajouter(donnees);\n    if (!resultat.ok) {\n      return envoyer(res, 400, \"text/html\", page(\"Nouveau produit\", formulaire(donnees, resultat.erreurs)));\n    }\n    res.writeHead(303, { Location: \"/produits/\" + resultat.produit.id });\n    return res.end();\n  }\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n});\n\nnunyaEchange(serveur, \"/produits\", { method: \"POST\", headers: { \"Content-Type\": \"application/x-www-form-urlencoded\" }, body: \"nom=Mangue&prix=300\" })\n  .then(r => console.log(r.statut, r.entetes.location, JSON.stringify(r.corps)));",
      "expected_output": "303 /produits/4 \"\"\n",
      "inputs": [],
      "trace_fr": [
        "Le produit est enregistré avec l’identifiant 4.",
        "Le serveur répond 303 et Location.",
        "Le corps est vide : le navigateur ira chercher la page."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Répondre 200 avec la page après un POST",
      "why_fr": "Actualiser recrée le produit.",
      "fix_fr": "Redirige avec 303."
    },
    {
      "error": "Lire le prix comme un nombre directement",
      "why_fr": "Les champs sont toujours des textes.",
      "fix_fr": "Valide et convertis."
    },
    {
      "error": "Faire confiance au formulaire",
      "why_fr": "Une requête peut arriver sans lui.",
      "fix_fr": "Valide côté serveur."
    }
  ],
  "quiz": [
    {
      "question": "Comment sont encodés les champs d’un formulaire POST classique ?",
      "options": [
        "En JSON",
        "En application/x-www-form-urlencoded",
        "En XML",
        "En binaire"
      ],
      "answer": 1,
      "explanation": "nom=Mangue&prix=300.",
      "id": "pfs-m2-02-q1"
    },
    {
      "question": "Que répond le serveur après un enregistrement réussi ?",
      "options": [
        "200 avec la page",
        "303 avec Location",
        "404",
        "500"
      ],
      "answer": 1,
      "explanation": "Post/Redirect/Get.",
      "id": "pfs-m2-02-q2"
    },
    {
      "question": "Pourquoi rediriger ?",
      "options": [
        "Pour la vitesse",
        "Pour qu’actualiser ne renvoie pas le formulaire",
        "Pour le référencement",
        "C’est obligatoire"
      ],
      "answer": 1,
      "explanation": "Pas de double enregistrement.",
      "id": "pfs-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "POST",
      "definition": "Méthode qui envoie des données à enregistrer."
    },
    {
      "term": "URLSearchParams",
      "definition": "Classe qui lit les paires clé=valeur encodées."
    },
    {
      "term": "303 See Other",
      "definition": "Redirection à suivre avec GET."
    },
    {
      "term": "Post/Redirect/Get",
      "definition": "Modèle : traiter le POST, rediriger, afficher en GET."
    }
  ],
  "recap_fr": [
    "Lire les données d’un formulaire HTML envoyé en POST.",
    "Rediriger après l’enregistrement avec le statut 303, selon le modèle Post/Redirect/Get.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "POST",
    "URLSearchParams",
    "303 See Other",
    "Post/Redirect/Get"
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
      "title": "MDN — envoyer les données d’un formulaire",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data"
    },
    {
      "title": "MDN — 303 See Other",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status/303"
    },
    {
      "title": "MDN — codes de statut HTTP",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status"
    }
  ],
  "sources": [
    {
      "title": "MDN — envoyer les données d’un formulaire",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data",
      "scope": "GET, POST et encodage application/x-www-form-urlencoded. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — 303 See Other",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status/303",
      "scope": "Rediriger après un envoi de formulaire. Texte, exemples et exercices originaux Nunya.",
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

Un formulaire HTML avec method="post" et action="/produits" envoie, quand on clique sur le bouton, une requête POST vers /produits. Ses champs voyagent dans le corps, encodés au format application/x-www-form-urlencoded : nom=Mangue&prix=300. Les espaces deviennent des + ou des %20, les accents des suites de %.

Côté serveur, on lit le corps avec lireCorps, puis on le décode avec URLSearchParams, la même classe que pour les paramètres d’adresse. Object.fromEntries(new URLSearchParams(texte)) donne un objet ordinaire : { nom: "Mangue", prix: "300" }. Toutes les valeurs sont des chaînes : c’est le rôle de la validation, déjà écrite, de les vérifier et de les convertir.

Une fois le produit enregistré, que répondre ? On pourrait renvoyer directement la page du nouveau produit. Mais si la personne actualise alors la page, le navigateur renvoie le formulaire : le produit est créé une deuxième fois. La bonne pratique s’appelle Post/Redirect/Get. Le serveur répond par une redirection : statut 303 See Other, avec l’en-tête Location: /produits/4 et un corps vide. Le navigateur charge alors cette adresse avec un GET. Actualiser recharge simplement la page du produit, sans rien recréer.

Le statut 303 signifie précisément « va voir à cette adresse, avec GET ». Les statuts 301 et 302 existent aussi, mais leur comportement avec POST est moins clair ; 303 est le bon choix après un formulaire.

Une route de formulaire comporte donc deux parties : GET /produits/nouveau affiche le formulaire vide, et POST /produits traite l’envoi. Cette séparation se retrouve dans tous les cadriciels.

La sécurité ne change pas : les données reçues sont validées avant d’être enregistrées, et tout texte réaffiché est échappé. Un formulaire n’apporte aucune garantie : n’importe qui peut envoyer une requête POST sans passer par la page, avec des champs manquants ou inventés.

Dans l’atelier, nunyaEchange permet de voir la redirection elle-même : le statut 303 et l’en-tête location, sans la suivre. Un navigateur la suivrait automatiquement.

Ce module traite le cas où tout va bien. La leçon suivante traite le cas, très fréquent, où la saisie contient des erreurs.

## Exemple guidé 1

```javascript
console.log(Object.fromEntries(new URLSearchParams("nom=Mangue&prix=300")));
console.log(new URLSearchParams("nom=Pain+de+mie").get("nom"));
```

Affichage attendu :

    { nom: 'Mangue', prix: '300' }
    Pain de mie

Trace :

- URLSearchParams décode le corps du formulaire.
- Les valeurs restent des chaînes.
- Les + redeviennent des espaces.

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

function formulaire(valeurs, erreurs) {
  const liste = erreurs.length ? "<ul class=\"erreurs\">" + erreurs.map(e => `<li>${echapper(e)}</li>`).join("") + "</ul>" : "";
  return liste + `<form method="post" action="/produits">`
    + `<label for="nom">Nom</label><input id="nom" name="nom" value="${echapper(valeurs.nom ?? "")}" required>`
    + `<label for="prix">Prix (FCFA)</label><input id="prix" name="prix" type="number" value="${echapper(valeurs.prix ?? "")}" required>`
    + `<button type="submit">Ajouter</button></form>`;
}

const serveur = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/produits/nouveau" && req.method === "GET") {
    return envoyer(res, 200, "text/html", page("Nouveau produit", formulaire({}, [])));
  }
  if (pathname === "/produits" && req.method === "POST") {
    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req)));
    const resultat = ajouter(donnees);
    if (!resultat.ok) {
      return envoyer(res, 400, "text/html", page("Nouveau produit", formulaire(donnees, resultat.erreurs)));
    }
    res.writeHead(303, { Location: "/produits/" + resultat.produit.id });
    return res.end();
  }
  envoyer(res, 404, "text/html", page("Introuvable", "<p>Cette page n’existe pas.</p>"));
});

nunyaEchange(serveur, "/produits", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "nom=Mangue&prix=300" })
  .then(r => console.log(r.statut, r.entetes.location, JSON.stringify(r.corps)));
```

Affichage attendu :

    303 /produits/4 ""

Trace :

- Le produit est enregistré avec l’identifiant 4.
- Le serveur répond 303 et Location.
- Le corps est vide : le navigateur ira chercher la page.

## Vérifier et expliquer

Observe, dans les outils de développement de ton navigateur, la redirection après l’envoi d’un formulaire sur un site réel.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — envoyer les données d’un formulaire](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
- [MDN — 303 See Other](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status/303)
- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
