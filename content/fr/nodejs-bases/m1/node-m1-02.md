---
{
  "id": "node-m1-02",
  "title_fr": "Modules : require et module.exports",
  "course": "nodejs-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "node-m1-01"
  ],
  "outcomes": [
    "Utiliser les modules intégrés de Node.js avec require.",
    "Exporter des fonctions avec module.exports pour les réutiliser dans d’autres fichiers."
  ],
  "idea_fr": "Un module est un fichier qui expose quelques fonctions et cache le reste : on assemble un programme comme un meuble en kit.",
  "analogy_fr": "Dans un marché, chaque vendeur a son étal et sa spécialité. On va chez le vendeur d’épices pour les épices, sans connaître son arrière-boutique.",
  "examples": [
    {
      "code": "const path = require(\"path\");\n\nconst fichier = path.join(\"donnees\", \"ventes\", \"janvier.csv\");\nconsole.log(fichier);\nconsole.log(path.extname(fichier), path.basename(fichier, \".csv\"));",
      "expected_output": "donnees/ventes/janvier.csv\n.csv janvier\n",
      "inputs": [],
      "trace_fr": [
        "path.join assemble le chemin avec le bon séparateur.",
        "extname donne l’extension.",
        "basename donne le nom, ici sans extension."
      ]
    },
    {
      "code": "function aire(l, h) {\n  return l * h;\n}\n\nfunction perimetre(l, h) {\n  return 2 * (l + h);\n}\n\nconst UNITE = \"m\";\nmodule.exports = { aire, perimetre };\nconsole.log(Object.keys(module.exports));",
      "expected_output": "[ 'aire', 'perimetre' ]\n",
      "inputs": [],
      "trace_fr": [
        "Deux fonctions sont exportées.",
        "UNITE reste privée au module.",
        "Un autre fichier ferait require(\"./geometrie\")."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire module.export sans s",
      "why_fr": "Le module exporte un objet vide, sans erreur.",
      "fix_fr": "Écris module.exports."
    },
    {
      "error": "Oublier ./ pour un fichier du projet",
      "why_fr": "Node.js cherche un module intégré ou installé.",
      "fix_fr": "require(\"./mon-module\")."
    },
    {
      "error": "Ajouter un paquet pour trois lignes",
      "why_fr": "Plus de code étranger à maintenir et surveiller.",
      "fix_fr": "Écris toi-même les petites fonctions."
    }
  ],
  "quiz": [
    {
      "question": "Comment charger le module intégré path ?",
      "options": [
        "import path",
        "require(\"path\")",
        "load(\"path\")",
        "include path"
      ],
      "answer": 1,
      "explanation": "require renvoie le module.",
      "id": "node-m1-02-q1"
    },
    {
      "question": "Que reçoit un fichier si le module a écrit module.export = { f } ?",
      "options": [
        "f",
        "Un objet vide",
        "Une erreur",
        "undefined"
      ],
      "answer": 1,
      "explanation": "La propriété correcte est exports.",
      "id": "node-m1-02-q2"
    },
    {
      "question": "Où npm note-t-il les dépendances ?",
      "options": [
        "index.js",
        "package.json",
        "README",
        "node.config"
      ],
      "answer": 1,
      "explanation": "Avec leurs versions.",
      "id": "node-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "module",
      "definition": "Fichier qui expose certaines fonctions et cache le reste."
    },
    {
      "term": "require",
      "definition": "Fonction qui charge un module."
    },
    {
      "term": "module.exports",
      "definition": "Objet qui contient ce qu’un module rend visible."
    },
    {
      "term": "dépendance",
      "definition": "Paquet externe dont le projet a besoin."
    }
  ],
  "recap_fr": [
    "Utiliser les modules intégrés de Node.js avec require.",
    "Exporter des fonctions avec module.exports pour les réutiliser dans d’autres fichiers.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "module",
    "require",
    "module.exports",
    "dépendance"
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
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html"
    },
    {
      "title": "Node.js — path",
      "url": "https://nodejs.org/docs/latest-v20.x/api/path.html"
    }
  ],
  "sources": [
    {
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html",
      "scope": "require, module.exports et organisation en fichiers. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — path",
      "url": "https://nodejs.org/docs/latest-v20.x/api/path.html",
      "scope": "Manipuler des chemins de fichiers. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un vrai programme ne tient pas dans un seul fichier : on le découpe en modules, chacun chargé d’une partie du travail. Un module calcule les prix, un autre lit les fichiers, un autre répond aux requêtes. Ce découpage rend le code plus lisible, plus facile à tester et à réutiliser.

Node.js fournit de nombreux modules intégrés, disponibles sans installation. On les charge avec la fonction require : const path = require("path"). Le module path manipule les chemins de fichiers : path.join("donnees", "ventes.csv") assemble un chemin avec le bon séparateur pour le système, path.extname donne l’extension, path.basename le nom du fichier. D’autres modules intégrés servent aux fichiers (fs), au réseau (http), au système (os) ou au chiffrement (crypto).

Pour créer ton propre module, tu écris des fonctions dans un fichier, puis tu indiques lesquelles sont visibles de l’extérieur en les plaçant dans module.exports : module.exports = { aire, perimetre }. Un autre fichier les récupère avec const geometrie = require("./geometrie"), le ./ indiquant un fichier du projet plutôt qu’un module intégré. Tout ce qui n’est pas exporté reste privé au module : ses variables internes ne peuvent pas être modifiées de l’extérieur par erreur.

Attention à l’orthographe : module.exports, avec un s. Écrire module.export crée une propriété sans effet, et le fichier qui fait require reçoit un objet vide, sans aucune erreur. C’est une source classique de « fonction introuvable ».

Les bibliothèques écrites par d’autres développeurs s’installent avec npm : npm install nom-du-paquet les télécharge dans un dossier node_modules et les note dans le fichier package.json, qui décrit le projet et ses dépendances. Chaque dépendance est du code que tu n’as pas écrit : choisis des paquets maintenus et populaires, et n’en ajoute pas pour une fonction de trois lignes.

Il existe aussi une seconde syntaxe, plus récente, les modules ECMAScript : import et export, comme dans le navigateur. Node.js accepte les deux. Ce cours utilise require et module.exports, qu’on rencontre encore dans une grande partie du code existant.

Dans l’atelier, tout ton code tient dans un seul fichier : l’atelier lit directement module.exports pour vérifier ce que ton module expose, comme le ferait un autre fichier avec require.

## Exemple guidé 1

```javascript
const path = require("path");

const fichier = path.join("donnees", "ventes", "janvier.csv");
console.log(fichier);
console.log(path.extname(fichier), path.basename(fichier, ".csv"));
```

Affichage attendu :

    donnees/ventes/janvier.csv
    .csv janvier

Trace :

- path.join assemble le chemin avec le bon séparateur.
- extname donne l’extension.
- basename donne le nom, ici sans extension.

## Exemple guidé 2

```javascript
function aire(l, h) {
  return l * h;
}

function perimetre(l, h) {
  return 2 * (l + h);
}

const UNITE = "m";
module.exports = { aire, perimetre };
console.log(Object.keys(module.exports));
```

Affichage attendu :

    [ 'aire', 'perimetre' ]

Trace :

- Deux fonctions sont exportées.
- UNITE reste privée au module.
- Un autre fichier ferait require("./geometrie").

## Vérifier et expliquer

Découpe sur papier un programme de boutique en trois modules et liste les fonctions que chacun exporterait.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — modules CommonJS](https://nodejs.org/docs/latest-v20.x/api/modules.html)
- [Node.js — path](https://nodejs.org/docs/latest-v20.x/api/path.html)
