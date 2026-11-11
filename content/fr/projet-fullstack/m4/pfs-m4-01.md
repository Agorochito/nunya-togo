---
{
  "id": "pfs-m4-01",
  "title_fr": "Gérer les erreurs de bout en bout",
  "course": "projet-fullstack",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "pfs-m3-03"
  ],
  "outcomes": [
    "Attraper toutes les erreurs du serveur à un seul endroit et répondre proprement.",
    "Limiter la taille des données reçues et ne jamais montrer de détails techniques au visiteur."
  ],
  "idea_fr": "Un serveur fiable prévoit l’imprévu : toute erreur est attrapée, notée dans les journaux pour l’équipe, et transformée en réponse claire et sans détail technique pour le visiteur.",
  "analogy_fr": "Quand une machine tombe en panne dans un restaurant, le serveur ne va pas expliquer au client le schéma du moteur : il s’excuse, propose autre chose, et le chef note la panne pour le réparateur.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction gestionnaireSur(traiter) {\n  return async (req, res) => {\n    try {\n      await traiter(req, res);\n    } catch (erreur) {\n      console.error(\"Erreur :\", erreur.message);\n      if (!res.headersSent) {\n        const statut = erreur.statut === 413 ? 413 : 500;\n        envoyer(res, statut, \"text/html\", page(statut === 413 ? \"Envoi trop volumineux\" : \"Erreur\", \"<p>Une erreur est survenue. Réessaie plus tard.</p>\"));\n      }\n    }\n  };\n}\n\nconst serveur = http.createServer(gestionnaireSur(async (req, res) => {\n  const donnees = JSON.parse(\"pas du json\");\n  envoyer(res, 200, \"text/plain\", \"ok\");\n}));\n\nnunyaRequete(serveur, \"/\").then(r => console.log(r.statut, r.corps.includes(\"Une erreur est survenue\"), r.corps.includes(\"JSON\")));",
      "expected_output": "500 true false\n",
      "inputs": [],
      "trace_fr": [
        "Le gestionnaire lève une erreur.",
        "Le filet répond 500 avec une page générique.",
        "Le détail technique n’apparaît pas dans la page."
      ]
    },
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, { \"Content-Type\": type + \"; charset=utf-8\" });\n  res.end(corps);\n}\n\nfunction lireCorps(req, limite = 10000) {\n  return new Promise((ok, ko) => {\n    let texte = \"\";\n    req.on(\"data\", m => {\n      texte += m;\n      if (texte.length > limite) {\n        const e = new Error(\"corps trop volumineux\");\n        e.statut = 413;\n        ko(e);\n        req.removeAllListeners(\"data\");\n        req.resume();\n      }\n    });\n    req.on(\"end\", () => ok(texte));\n    req.on(\"error\", ko);\n  });\n}\n\nfunction gestionnaireSur(traiter) {\n  return async (req, res) => {\n    try {\n      await traiter(req, res);\n    } catch (erreur) {\n      console.error(\"Erreur :\", erreur.message);\n      if (!res.headersSent) {\n        const statut = erreur.statut === 413 ? 413 : 500;\n        envoyer(res, statut, \"text/html\", page(statut === 413 ? \"Envoi trop volumineux\" : \"Erreur\", \"<p>Une erreur est survenue. Réessaie plus tard.</p>\"));\n      }\n    }\n  };\n}\n\nconst serveur = http.createServer(gestionnaireSur(async (req, res) => {\n  const texte = await lireCorps(req, 20);\n  envoyer(res, 200, \"text/plain\", \"reçu \" + texte.length);\n}));\n\nnunyaRequete(serveur, \"/\", { method: \"POST\", body: \"x\".repeat(5000) }).then(r => console.log(r.statut));",
      "expected_output": "413\n",
      "inputs": [],
      "trace_fr": [
        "La limite est de 20 caractères.",
        "Le corps envoyé en contient 5 000.",
        "Le serveur arrête la lecture et répond 413."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Laisser une erreur sans try dans un gestionnaire async",
      "why_fr": "La requête reste sans réponse.",
      "fix_fr": "Enveloppe tout le gestionnaire dans un filet."
    },
    {
      "error": "Afficher la trace d’erreur au visiteur",
      "why_fr": "Elle révèle le fonctionnement interne.",
      "fix_fr": "Message générique, détail dans les journaux."
    },
    {
      "error": "Lire un corps sans limite",
      "why_fr": "Un envoi énorme épuise la mémoire.",
      "fix_fr": "Limite la taille et réponds 413."
    }
  ],
  "quiz": [
    {
      "question": "Que voit le visiteur lors d’une erreur interne ?",
      "options": [
        "La trace complète",
        "Une page 500 générique",
        "Une page blanche",
        "Le code source"
      ],
      "answer": 1,
      "explanation": "Sans détail technique.",
      "id": "pfs-m4-01-q1"
    },
    {
      "question": "Quel statut pour un corps trop volumineux ?",
      "options": [
        "400",
        "404",
        "413",
        "500"
      ],
      "answer": 2,
      "explanation": "Payload Too Large.",
      "id": "pfs-m4-01-q2"
    },
    {
      "question": "Où va le détail de l’erreur ?",
      "options": [
        "Dans la page",
        "Dans les journaux du serveur",
        "Dans un cookie",
        "Nulle part"
      ],
      "answer": 1,
      "explanation": "Pour l’équipe.",
      "id": "pfs-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "filet de sécurité",
      "definition": "Gestion d’erreurs commune à toutes les routes."
    },
    {
      "term": "500 Internal Server Error",
      "definition": "Statut d’une erreur du serveur."
    },
    {
      "term": "413 Payload Too Large",
      "definition": "Statut d’un envoi trop volumineux."
    },
    {
      "term": "journal",
      "definition": "Trace écrite des événements et erreurs du serveur."
    }
  ],
  "recap_fr": [
    "Attraper toutes les erreurs du serveur à un seul endroit et répondre proprement.",
    "Limiter la taille des données reçues et ne jamais montrer de détails techniques au visiteur.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "filet de sécurité",
    "500 Internal Server Error",
    "413 Payload Too Large",
    "journal"
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

Malgré tous les soins, un serveur rencontre des erreurs : un cas oublié, une donnée inattendue, un fichier absent, une base de données momentanément injoignable. La question n’est pas de les éviter toutes, mais de les traiter correctement. Une erreur non attrapée dans un gestionnaire async laisse la requête sans réponse : le visiteur voit une page qui charge indéfiniment. Pire, dans certaines versions de Node.js, elle peut arrêter tout le serveur.

La solution est un filet de sécurité unique. Une fonction gestionnaireSur(traiter) enveloppe le gestionnaire de l’application dans un try…catch. Si une erreur survient, elle est notée dans le journal du serveur avec console.error, et le visiteur reçoit une page d’erreur 500 générique : « Une erreur est survenue ». Ce filet couvre toutes les routes d’un coup, y compris celles qu’on ajoutera plus tard.

Le message montré au visiteur ne contient aucun détail technique : ni trace d’erreur, ni nom de fichier, ni requête SQL. Ces informations aideraient un attaquant à comprendre le fonctionnement interne. Le détail va dans les journaux, consultés par l’équipe. Une bonne pratique consiste à attribuer à chaque erreur un identifiant affiché au visiteur et noté dans le journal, pour faire le lien quand il contacte le support.

Avant d’envoyer la page d’erreur, on vérifie res.headersSent : si une partie de la réponse est déjà partie, on ne peut plus changer le statut. Dans ce cas, on se contente de noter l’erreur.

Certaines erreurs méritent un statut plus précis que 500. Une donnée invalide relève du 400, déjà traité dans les formulaires. Un corps de requête trop volumineux relève du 413. Sans limite, un client pourrait envoyer des centaines de mégaoctets à un formulaire de dix caractères et épuiser la mémoire du serveur. La fonction lireCorps compte donc les caractères reçus et s’arrête au-delà d’une limite raisonnable, en levant une erreur portant le statut 413, que le filet de sécurité transforme en réponse adaptée.

Les journaux eux-mêmes demandent de la discipline : on y note ce qui aide à comprendre, l’heure, la route, le message, mais jamais de mot de passe, de numéro de carte ou de donnée personnelle inutile.

Avec ce filet, l’application devient robuste : une erreur reste une erreur, mais elle ne laisse plus personne devant une page blanche, et l’équipe sait qu’elle a eu lieu.

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

function envoyer(res, statut, type, corps) {
  res.writeHead(statut, { "Content-Type": type + "; charset=utf-8" });
  res.end(corps);
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
  const donnees = JSON.parse("pas du json");
  envoyer(res, 200, "text/plain", "ok");
}));

nunyaRequete(serveur, "/").then(r => console.log(r.statut, r.corps.includes("Une erreur est survenue"), r.corps.includes("JSON")));
```

Affichage attendu :

    500 true false

Trace :

- Le gestionnaire lève une erreur.
- Le filet répond 500 avec une page générique.
- Le détail technique n’apparaît pas dans la page.

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

function envoyer(res, statut, type, corps) {
  res.writeHead(statut, { "Content-Type": type + "; charset=utf-8" });
  res.end(corps);
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
  const texte = await lireCorps(req, 20);
  envoyer(res, 200, "text/plain", "reçu " + texte.length);
}));

nunyaRequete(serveur, "/", { method: "POST", body: "x".repeat(5000) }).then(r => console.log(r.statut));
```

Affichage attendu :

    413

Trace :

- La limite est de 20 caractères.
- Le corps envoyé en contient 5 000.
- Le serveur arrête la lecture et répond 413.

## Vérifier et expliquer

Imagine trois erreurs possibles dans cette boutique et le message que verrait le visiteur pour chacune.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
