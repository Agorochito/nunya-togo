---
{
  "id": "pfs-m4-02",
  "title_fr": "En-têtes de sécurité et configuration",
  "course": "projet-fullstack",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "pfs-m4-01"
  ],
  "outcomes": [
    "Ajouter les en-têtes HTTP qui renforcent la sécurité des pages.",
    "Lire la configuration dans les variables d’environnement, avec des valeurs par défaut sûres."
  ],
  "idea_fr": "Quelques en-têtes HTTP ferment des portes que le navigateur laisserait ouvertes, et la configuration vit hors du code, pour que le même programme tourne partout sans secret écrit dedans.",
  "analogy_fr": "Une maison sûre a des serrures sur toutes les portes, pas seulement sur l’entrée. Et la clé n’est pas collée sur la porte : elle est remise à la personne qui habite là.",
  "examples": [
    {
      "code": "const http = require(\"http\");\n\nfunction echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nfunction envoyer(res, statut, type, corps) {\n  res.writeHead(statut, {\n    \"Content-Type\": type + \"; charset=utf-8\",\n    \"X-Content-Type-Options\": \"nosniff\",\n    \"Content-Security-Policy\": \"default-src 'self'\",\n    \"Cache-Control\": \"no-store\",\n  });\n  res.end(corps);\n}\n\nconst serveur = http.createServer((req, res) => envoyer(res, 200, \"text/html\", page(\"Accueil\", \"\")));\n\nnunyaEchange(serveur, \"/\").then(r => console.log(r.entetes));",
      "expected_output": "{\n  'cache-control': 'no-store',\n  'content-security-policy': \"default-src 'self'\",\n  'x-content-type-options': 'nosniff'\n}\n",
      "inputs": [],
      "trace_fr": [
        "envoyer ajoute les en-têtes à toutes les pages.",
        "La CSP n’autorise que les ressources du site.",
        "nosniff empêche de deviner le type."
      ]
    },
    {
      "code": "function configuration(env) {\n  const port = Number.parseInt(env.PORT, 10);\n  return {\n    port: Number.isInteger(port) && port > 0 && port < 65536 ? port : 3000,\n    production: env.NODE_ENV === \"production\",\n    cleApi: env.CLE_API || null,\n  };\n}\n\nconsole.log(configuration({ PORT: \"8080\", NODE_ENV: \"production\" }));\nconsole.log(configuration({ PORT: \"abc\" }));",
      "expected_output": "{ port: 8080, production: true, cleApi: null }\n{ port: 3000, production: false, cleApi: null }\n",
      "inputs": [],
      "trace_fr": [
        "Le port vient de l’environnement.",
        "Une valeur invalide revient à la valeur par défaut.",
        "La clé d’API absente reste null : pas de clé factice."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Ajouter les en-têtes route par route",
      "why_fr": "Une route finit par les oublier.",
      "fix_fr": "Ajoute-les dans la fonction commune."
    },
    {
      "error": "Écrire le port ou une clé dans le code",
      "why_fr": "Le code ne s’adapte pas et le secret fuit.",
      "fix_fr": "Lis les variables d’environnement."
    },
    {
      "error": "Donner une clé factice par défaut",
      "why_fr": "L’application semble marcher mais échoue plus tard.",
      "fix_fr": "Laisse null et refuse clairement."
    }
  ],
  "quiz": [
    {
      "question": "Que fait Content-Security-Policy: default-src 'self' ?",
      "options": [
        "Chiffre la page",
        "N’autorise que les ressources du site lui-même",
        "Bloque les images",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Seconde ligne de défense contre le XSS.",
      "id": "pfs-m4-02-q1"
    },
    {
      "question": "Où lire le port fourni par l’hébergeur ?",
      "options": [
        "Dans le code",
        "Dans process.env.PORT",
        "Dans un cookie",
        "Dans l’URL"
      ],
      "answer": 1,
      "explanation": "Variable d’environnement.",
      "id": "pfs-m4-02-q2"
    },
    {
      "question": "Pourquoi configuration(env) reçoit-elle env en paramètre ?",
      "options": [
        "Pour la vitesse",
        "Pour pouvoir la tester avec un objet de test",
        "C’est obligatoire",
        "Pour la sécurité"
      ],
      "answer": 1,
      "explanation": "Testable sans toucher au système.",
      "id": "pfs-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "en-tête de sécurité",
      "definition": "En-tête de réponse qui demande au navigateur une protection."
    },
    {
      "term": "CSP",
      "definition": "Politique qui limite les ressources qu’une page peut charger."
    },
    {
      "term": "variable d’environnement",
      "definition": "Réglage fourni au programme par le système."
    },
    {
      "term": "valeur par défaut sûre",
      "definition": "Valeur prudente utilisée quand un réglage manque."
    }
  ],
  "recap_fr": [
    "Ajouter les en-têtes HTTP qui renforcent la sécurité des pages.",
    "Lire la configuration dans les variables d’environnement, avec des valeurs par défaut sûres.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "en-tête de sécurité",
    "CSP",
    "variable d’environnement",
    "valeur par défaut sûre"
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
      "title": "MDN — Content Security Policy",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/CSP"
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
      "title": "MDN — Content Security Policy",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/CSP",
      "scope": "Limiter ce qu’une page peut charger et exécuter. Texte, exemples et exercices originaux Nunya.",
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

Les leçons précédentes ont protégé l’application à l’intérieur : validation, échappement, limites. Le navigateur peut aussi participer à la défense, à condition que le serveur le lui demande, par des en-têtes de réponse.

X-Content-Type-Options: nosniff interdit au navigateur de deviner le type d’un fichier : un texte servi comme text/plain ne sera jamais exécuté comme un script. Content-Security-Policy, ou CSP, décrit d’où la page a le droit de charger des scripts, des styles ou des images. La politique default-src 'self' n’autorise que les ressources du site lui-même : même si un attaquant parvenait à injecter une balise script, le navigateur refuserait d’exécuter un code venu d’ailleurs ou écrit directement dans la page. C’est une seconde ligne de défense contre le XSS, qui complète l’échappement sans le remplacer. Cache-Control: no-store demande de ne pas garder en cache des pages personnelles, comme un panier. En production, Strict-Transport-Security impose HTTPS pour les visites suivantes.

Le meilleur endroit pour ajouter ces en-têtes est la fonction commune envoyer : toutes les pages en bénéficient d’un coup. Une route oubliée ne peut plus échapper à la règle.

La configuration est la seconde préoccupation. Le port d’écoute, le mode production ou développement, l’adresse de la base de données et les clés d’API changent d’un environnement à l’autre : l’ordinateur du développeur, le serveur de test, l’hébergeur. On ne les écrit pas dans le code, on les lit dans les variables d’environnement : process.env.PORT, process.env.NODE_ENV. Les hébergeurs modernes fournissent PORT au démarrage ; le serveur doit l’utiliser.

Une fonction configuration(env) centralise cette lecture. Elle convertit et vérifie chaque valeur, et applique une valeur par défaut sûre quand une variable manque ou est invalide : le port 3000 en développement, le mode non-production. Les secrets, comme une clé d’API, ne reçoivent pas de valeur par défaut : s’ils manquent, l’application doit refuser de démarrer la fonction qui en a besoin, plutôt que de fonctionner avec une clé factice.

Recevoir env en paramètre, plutôt que lire process.env partout, rend la configuration testable : on passe un objet de test et l’on vérifie le résultat, sans toucher au vrai système.

Ces réglages ne se voient pas à l’écran, mais ce sont souvent eux qui distinguent une application d’amateur d’une application prête pour de vrais utilisateurs.

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
  res.writeHead(statut, {
    "Content-Type": type + "; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'self'",
    "Cache-Control": "no-store",
  });
  res.end(corps);
}

const serveur = http.createServer((req, res) => envoyer(res, 200, "text/html", page("Accueil", "")));

nunyaEchange(serveur, "/").then(r => console.log(r.entetes));
```

Affichage attendu :

    {
      'cache-control': 'no-store',
      'content-security-policy': "default-src 'self'",
      'x-content-type-options': 'nosniff'
    }

Trace :

- envoyer ajoute les en-têtes à toutes les pages.
- La CSP n’autorise que les ressources du site.
- nosniff empêche de deviner le type.

## Exemple guidé 2

```javascript
function configuration(env) {
  const port = Number.parseInt(env.PORT, 10);
  return {
    port: Number.isInteger(port) && port > 0 && port < 65536 ? port : 3000,
    production: env.NODE_ENV === "production",
    cleApi: env.CLE_API || null,
  };
}

console.log(configuration({ PORT: "8080", NODE_ENV: "production" }));
console.log(configuration({ PORT: "abc" }));
```

Affichage attendu :

    { port: 8080, production: true, cleApi: null }
    { port: 3000, production: false, cleApi: null }

Trace :

- Le port vient de l’environnement.
- Une valeur invalide revient à la valeur par défaut.
- La clé d’API absente reste null : pas de clé factice.

## Vérifier et expliquer

Observe les en-têtes de réponse d’un grand site dans les outils de développement et repère ceux de cette leçon.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — Content Security Policy](https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/CSP)
- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
