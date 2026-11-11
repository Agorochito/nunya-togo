---
{
  "id": "pfs-m2-03",
  "title_fr": "Les erreurs de formulaire",
  "course": "projet-fullstack",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "pfs-m2-02"
  ],
  "outcomes": [
    "Réafficher un formulaire refusé avec les messages d’erreur et les valeurs déjà saisies.",
    "Choisir le bon statut et garder la page accessible et sûre."
  ],
  "idea_fr": "Quand une saisie est refusée, on renvoie le même formulaire, rempli avec ce que la personne avait tapé, et une explication précise de ce qu’il faut corriger.",
  "analogy_fr": "Un agent de guichet qui refuse un dossier rend la feuille en entourant les cases à corriger. Il ne la déchire pas pour en donner une vierge.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconst produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nfunction lireCorps(req) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => { texte += m; });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction formulaire(valeurs, erreurs) {\n  const liste = erreurs.length ? \"<ul class=\\\"erreurs\\\">\" + erreurs.map(e => `<li>${echapper(e)}</li>`).join(\"\") + \"</ul>\" : \"\";\n  return liste + `<form method=\"post\" action=\"/produits\">`\n    + `<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" value=\"${echapper(valeurs.nom ?? \"\")}\" required>`\n    + `<label for=\"prix\">Prix (FCFA)</label><input id=\"prix\" name=\"prix\" type=\"number\" value=\"${echapper(valeurs.prix ?? \"\")}\" required>`\n    + `<button type=\"submit\">Ajouter</button></form>`;\n}\n\nconst serveur = http.createServer(async (req, res) => {\n  const { pathname } = new URL(req.url, \"http://localhost\");\n  if (pathname === \"/produits/nouveau\" && req.method === \"GET\") {\n    return envoyer(res, 200, \"text/html\", page(\"Nouveau produit\", formulaire({}, [])));\n  }\n  if (pathname === \"/produits\" && req.method === \"POST\") {\n    const donnees = Object.fromEntries(new URLSearchParams(await lireCorps(req)));\n    const resultat = ajouter(donnees);\n    if (!resultat.ok) {\n      return envoyer(res, 400, \"text/html\", page(\"Nouveau produit\", formulaire(donnees, resultat.erreurs)));\n    }\n    res.writeHead(303, { Location: \"/produits/\" + resultat.produit.id });\n    return res.end();\n  }\n  envoyer(res, 404, \"text/html\", page(\"Introuvable\", \"<p>Cette page n’existe pas.</p>\"));\n});\n\nnunyaRequete(serveur, \"/produits\", { method: \"POST\", headers: { \"Content-Type\": \"application/x-www-form-urlencoded\" }, body: \"nom=M&prix=12%2C5\" })\n  .then(r => console.log(r.statut, (r.corps.match(/<li>/g) || []).length, r.corps.includes('value=\"12,5\"')));",
      "expected_output": "400 2 true\n",
      "inputs": [],
      "trace_fr": [
        "Le nom est trop court et le prix contient une virgule.",
        "Deux messages s’affichent, statut 400.",
        "Le prix saisi est réaffiché pour être corrigé."
      ]
    },
    {
      "code": "function echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction formulaire(valeurs, erreurs) {\n  const liste = erreurs.length ? \"<ul class=\\\"erreurs\\\">\" + erreurs.map(e => `<li>${echapper(e)}</li>`).join(\"\") + \"</ul>\" : \"\";\n  return liste + `<form method=\"post\" action=\"/produits\">`\n    + `<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" value=\"${echapper(valeurs.nom ?? \"\")}\" required>`\n    + `<label for=\"prix\">Prix (FCFA)</label><input id=\"prix\" name=\"prix\" type=\"number\" value=\"${echapper(valeurs.prix ?? \"\")}\" required>`\n    + `<button type=\"submit\">Ajouter</button></form>`;\n}\n\nconsole.log(formulaire({ nom: '\"><b>' }, [\"Nom trop court\"]).includes('value=\"&quot;&gt;&lt;b&gt;\"'));",
      "expected_output": "true\n",
      "inputs": [],
      "trace_fr": [
        "Une valeur piégée est réaffichée.",
        "Ses guillemets et chevrons sont échappés.",
        "Elle ne peut pas sortir de l’attribut."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Renvoyer un formulaire vide",
      "why_fr": "Il faut tout ressaisir.",
      "fix_fr": "Réaffiche les valeurs reçues."
    },
    {
      "error": "Message « Erreur » sans détail",
      "why_fr": "La personne ne sait pas quoi corriger.",
      "fix_fr": "Un message précis par problème."
    },
    {
      "error": "Réafficher les valeurs sans échapper",
      "why_fr": "Injection de code dans la page.",
      "fix_fr": "Échappe, guillemets compris."
    }
  ],
  "quiz": [
    {
      "question": "Quel statut pour un formulaire refusé ?",
      "options": [
        "200",
        "303",
        "400",
        "404"
      ],
      "answer": 2,
      "explanation": "Requête invalide.",
      "id": "pfs-m2-03-q1"
    },
    {
      "question": "Que doit contenir le formulaire réaffiché ?",
      "options": [
        "Rien",
        "Les erreurs et les valeurs saisies",
        "Seulement les erreurs",
        "Un nouveau formulaire vide"
      ],
      "answer": 1,
      "explanation": "Pour corriger sans ressaisir.",
      "id": "pfs-m2-03-q2"
    },
    {
      "question": "La validation du navigateur suffit-elle ?",
      "options": [
        "Oui",
        "Non, le serveur doit toujours valider",
        "Seulement en HTTPS",
        "Seulement sur téléphone"
      ],
      "answer": 1,
      "explanation": "Elle se contourne.",
      "id": "pfs-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "400 Bad Request",
      "definition": "Statut d’une requête invalide."
    },
    {
      "term": "message d’erreur",
      "definition": "Explication précise de ce qu’il faut corriger."
    },
    {
      "term": "valeur réaffichée",
      "definition": "Saisie renvoyée dans le formulaire pour correction."
    },
    {
      "term": "validation côté serveur",
      "definition": "Vérification faite par le serveur, impossible à contourner."
    }
  ],
  "recap_fr": [
    "Réafficher un formulaire refusé avec les messages d’erreur et les valeurs déjà saisies.",
    "Choisir le bon statut et garder la page accessible et sûre.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "400 Bad Request",
    "message d’erreur",
    "valeur réaffichée",
    "validation côté serveur"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Les erreurs de saisie sont normales : un nom trop court, un prix tapé avec une virgule, un champ oublié. La façon dont l’application les traite fait toute la différence pour la personne qui l’utilise. Le pire comportement est de renvoyer un formulaire vide, ou une page « Erreur » sans explication : il faut tout ressaisir, sans savoir ce qui n’allait pas.

La bonne réponse réaffiche le même formulaire avec trois éléments. D’abord, la liste des erreurs, en haut, rédigées pour être comprises : « Le prix doit être un nombre entier positif ». Ensuite, les valeurs déjà saisies, dans les attributs value des champs, pour que la personne n’ait qu’à corriger. Enfin, un statut 400, requête invalide, qui signale aux outils que l’enregistrement n’a pas eu lieu.

Les valeurs réaffichées viennent directement de la saisie : elles doivent être échappées, y compris les guillemets, puisqu’elles sont placées dans des attributs. Sinon, une valeur comme "><script>… fermerait l’attribut et injecterait du code dans la page. La fonction formulaire écrite au module 1 le fait déjà ; il suffit de lui passer les données reçues et les erreurs.

Pour l’accessibilité, la liste des erreurs se place avant le formulaire, et chaque champ garde son étiquette. Dans une application plus soignée, on relierait chaque message à son champ avec aria-describedby et l’on placerait le focus sur la liste ; les cours HTML intermédiaire et Projet web de Nunya montrent ces techniques.

La validation du navigateur, avec required ou type="number", aide la personne avant l’envoi, mais ne remplace jamais celle du serveur : elle peut être contournée, et elle ne connaît pas toutes les règles. Le serveur reste l’autorité. Les deux se complètent : le navigateur évite les allers-retours inutiles, le serveur garantit la qualité des données.

Après une saisie refusée, rien n’est enregistré. Le compteur d’identifiants n’avance pas, la liste ne change pas. Une fois les erreurs corrigées, l’envoi suivant suit le chemin normal : enregistrement, puis redirection 303.

Ce traitement complète le cycle d’un formulaire : afficher, recevoir, valider, enregistrer ou réafficher. C’est le cœur de presque toutes les applications de gestion, des inscriptions scolaires aux commandes en ligne.

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

nunyaRequete(serveur, "/produits", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "nom=M&prix=12%2C5" })
  .then(r => console.log(r.statut, (r.corps.match(/<li>/g) || []).length, r.corps.includes('value="12,5"')));
```

Affichage attendu :

    400 2 true

Trace :

- Le nom est trop court et le prix contient une virgule.
- Deux messages s’affichent, statut 400.
- Le prix saisi est réaffiché pour être corrigé.

## Exemple guidé 2

```javascript
function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formulaire(valeurs, erreurs) {
  const liste = erreurs.length ? "<ul class=\"erreurs\">" + erreurs.map(e => `<li>${echapper(e)}</li>`).join("") + "</ul>" : "";
  return liste + `<form method="post" action="/produits">`
    + `<label for="nom">Nom</label><input id="nom" name="nom" value="${echapper(valeurs.nom ?? "")}" required>`
    + `<label for="prix">Prix (FCFA)</label><input id="prix" name="prix" type="number" value="${echapper(valeurs.prix ?? "")}" required>`
    + `<button type="submit">Ajouter</button></form>`;
}

console.log(formulaire({ nom: '"><b>' }, ["Nom trop court"]).includes('value="&quot;&gt;&lt;b&gt;"'));
```

Affichage attendu :

    true

Trace :

- Une valeur piégée est réaffichée.
- Ses guillemets et chevrons sont échappés.
- Elle ne peut pas sortir de l’attribut.

## Vérifier et expliquer

Remplis un formulaire en ligne avec des erreurs volontaires et note ce que le site fait bien ou mal.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — envoyer les données d’un formulaire](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
