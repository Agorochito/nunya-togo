---
{
  "id": "node-m1-03",
  "title_fr": "JSON : lire et écrire des données",
  "course": "nodejs-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "node-m1-02"
  ],
  "outcomes": [
    "Convertir des données entre objets JavaScript et texte JSON.",
    "Traiter proprement un texte JSON invalide au lieu de laisser le programme planter."
  ],
  "idea_fr": "JSON est la langue commune des programmes : un serveur reçoit et renvoie du texte, que JSON.parse et JSON.stringify transforment en objets et inversement.",
  "analogy_fr": "Un formulaire papier standard permet à deux administrations qui ne se connaissent pas d’échanger des informations : chacune sait où chercher chaque case.",
  "examples": [
    {
      "code": "const texte = '{\"nom\":\"riz\",\"prix\":600,\"tags\":[\"céréale\",\"local\"]}';\nconst produit = JSON.parse(texte);\nconsole.log(produit.nom, produit.prix * 2, produit.tags.length);\nconsole.log(JSON.stringify({ nom: \"huile\", prix: 1500 }));",
      "expected_output": "riz 1200 2\n{\"nom\":\"huile\",\"prix\":1500}\n",
      "inputs": [],
      "trace_fr": [
        "JSON.parse donne un objet utilisable.",
        "Les nombres restent des nombres.",
        "JSON.stringify produit le texte inverse."
      ]
    },
    {
      "code": "function lire(texte) {\n  try {\n    return JSON.parse(texte);\n  } catch (erreur) {\n    return null;\n  }\n}\n\nconsole.log(lire('{\"ok\":true}'));\nconsole.log(lire(\"{nom:'riz'}\"));",
      "expected_output": "{ ok: true }\nnull\n",
      "inputs": [],
      "trace_fr": [
        "Le premier texte est du JSON valide.",
        "Le second utilise des guillemets simples et un nom sans guillemets : invalide.",
        "L’erreur est attrapée au lieu de planter."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "JSON.parse sans try sur des données extérieures",
      "why_fr": "Une donnée abîmée fait tomber le serveur.",
      "fix_fr": "Entoure de try…catch."
    },
    {
      "error": "Guillemets simples ou virgule finale",
      "why_fr": "Le texte n’est pas du JSON valide.",
      "fix_fr": "Guillemets doubles, pas de virgule finale."
    },
    {
      "error": "Utiliser eval pour lire des données",
      "why_fr": "Le texte peut exécuter du code malveillant.",
      "fix_fr": "Utilise JSON.parse."
    }
  ],
  "quiz": [
    {
      "question": "Que donne JSON.stringify({ a: 1 }) ?",
      "options": [
        "{ a: 1 }",
        "{\"a\":1}",
        "a=1",
        "[1]"
      ],
      "answer": 1,
      "explanation": "Un texte JSON.",
      "id": "node-m1-03-q1"
    },
    {
      "question": "Que fait JSON.parse sur un texte invalide ?",
      "options": [
        "Renvoie null",
        "Lève une SyntaxError",
        "Renvoie {}",
        "Rien"
      ],
      "answer": 1,
      "explanation": "D’où le try…catch.",
      "id": "node-m1-03-q2"
    },
    {
      "question": "Lequel est du JSON valide ?",
      "options": [
        "{'a': 1}",
        "{\"a\": 1,}",
        "{\"a\": 1}",
        "{a: 1}"
      ],
      "answer": 2,
      "explanation": "Guillemets doubles, pas de virgule finale.",
      "id": "node-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "JSON",
      "definition": "Format texte d’échange de données."
    },
    {
      "term": "JSON.parse",
      "definition": "Transforme un texte JSON en valeur JavaScript."
    },
    {
      "term": "JSON.stringify",
      "definition": "Transforme une valeur en texte JSON."
    },
    {
      "term": "validation",
      "definition": "Vérification de la forme des données reçues."
    }
  ],
  "recap_fr": [
    "Convertir des données entre objets JavaScript et texte JSON.",
    "Traiter proprement un texte JSON invalide au lieu de laisser le programme planter.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "JSON",
    "JSON.parse",
    "JSON.stringify",
    "validation"
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
      "title": "MDN — JSON",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON"
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    }
  ],
  "sources": [
    {
      "title": "MDN — JSON",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON",
      "scope": "JSON.parse et JSON.stringify. Texte, exemples et exercices originaux Nunya.",
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

JSON, pour JavaScript Object Notation, est un format de texte pour représenter des données : objets entre accolades, tableaux entre crochets, chaînes entre guillemets doubles, nombres, true, false et null. Presque toutes les API du web l’utilisent, ainsi que de nombreux fichiers de configuration. Un serveur Node.js passe une grande partie de son temps à lire et écrire du JSON.

JSON.parse transforme un texte JSON en valeur JavaScript : JSON.parse('{"nom":"riz","prix":600}') donne un objet dont on lit prix avec .prix. JSON.stringify fait l’inverse et produit le texte. Avec deux arguments supplémentaires, JSON.stringify(objet, null, 2), le texte est indenté de deux espaces, ce qui le rend lisible dans un fichier.

JSON est plus strict que JavaScript. Les noms de propriétés doivent être entre guillemets doubles, les guillemets simples sont interdits, les virgules finales aussi, et il n’y a ni commentaires, ni fonctions, ni valeur undefined. Les dates n’existent pas : on les écrit comme des chaînes, par exemple "2026-11-10".

Un texte reçu de l’extérieur peut être invalide : un fichier abîmé, une requête mal formée, un utilisateur malveillant. JSON.parse lève alors une SyntaxError. Dans un serveur, une exception non traitée peut faire tomber tout le service. On entoure donc toujours JSON.parse d’un try…catch quand le texte vient de l’extérieur, et on répond par un message clair, ou une valeur par défaut, au lieu de planter.

Même un JSON valide peut contenir autre chose que ce qu’on attend : un objet à la place d’un tableau, un prix écrit "600" en texte, un champ manquant. Un programme robuste vérifie la forme des données après les avoir lues : Array.isArray pour un tableau, typeof pour un nombre. Les erreurs sont signalées avec throw new Error("message explicite"), que le code appelant peut attraper.

N’utilise jamais eval pour lire des données : eval exécute le texte comme du code, et un texte malveillant pourrait faire n’importe quoi sur ton serveur. JSON.parse, lui, ne fait que lire des données.

Ces réflexes, attraper l’erreur, vérifier la forme, refuser clairement, reviendront dans tout le cours : un serveur reçoit en permanence des données qu’il ne contrôle pas.

## Exemple guidé 1

```javascript
const texte = '{"nom":"riz","prix":600,"tags":["céréale","local"]}';
const produit = JSON.parse(texte);
console.log(produit.nom, produit.prix * 2, produit.tags.length);
console.log(JSON.stringify({ nom: "huile", prix: 1500 }));
```

Affichage attendu :

    riz 1200 2
    {"nom":"huile","prix":1500}

Trace :

- JSON.parse donne un objet utilisable.
- Les nombres restent des nombres.
- JSON.stringify produit le texte inverse.

## Exemple guidé 2

```javascript
function lire(texte) {
  try {
    return JSON.parse(texte);
  } catch (erreur) {
    return null;
  }
}

console.log(lire('{"ok":true}'));
console.log(lire("{nom:'riz'}"));
```

Affichage attendu :

    { ok: true }
    null

Trace :

- Le premier texte est du JSON valide.
- Le second utilise des guillemets simples et un nom sans guillemets : invalide.
- L’erreur est attrapée au lieu de planter.

## Vérifier et expliquer

Écris à la main le JSON d’un petit catalogue de trois produits, puis vérifie-le avec JSON.parse.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
