---
{
  "id": "node-m2-03",
  "title_fr": "Lire et écrire des fichiers",
  "course": "nodejs-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "node-m2-02"
  ],
  "outcomes": [
    "Lire et écrire des fichiers texte et JSON avec fs.promises.",
    "Traiter l’absence d’un fichier et construire des chemins sûrs."
  ],
  "idea_fr": "Un programme Node.js garde ses données dans des fichiers : on les lit et les écrit sans bloquer, et on prévoit le cas où ils n’existent pas encore.",
  "analogy_fr": "Un commerçant tient un cahier de ventes. Le premier jour, le cahier n’existe pas : il en ouvre un neuf au lieu de fermer boutique.",
  "examples": [
    {
      "code": "const fs = require(\"fs\").promises;\nconst os = require(\"os\");\nconst path = require(\"path\");\n\nasync function principal() {\n  const dossier = await fs.mkdtemp(path.join(os.tmpdir(), \"boutique-\"));\n  const fichier = path.join(dossier, \"ventes.txt\");\n  await fs.writeFile(fichier, \"riz;2\\n\");\n  await fs.appendFile(fichier, \"huile;1\\n\");\n  const texte = await fs.readFile(fichier, \"utf8\");\n  console.log(texte.trim().split(\"\\n\"));\n}\n\nprincipal();",
      "expected_output": "[ 'riz;2', 'huile;1' ]\n",
      "inputs": [],
      "trace_fr": [
        "Un dossier temporaire unique est créé.",
        "writeFile crée le fichier, appendFile ajoute une ligne.",
        "readFile avec \"utf8\" renvoie le texte."
      ]
    },
    {
      "code": "const fs = require(\"fs\").promises;\n\nasync function principal() {\n  try {\n    await fs.readFile(\"/dossier/inexistant/notes.txt\", \"utf8\");\n  } catch (erreur) {\n    console.log(erreur.code === \"ENOENT\" ? \"fichier absent\" : \"autre erreur\");\n  }\n}\n\nprincipal();",
      "expected_output": "fichier absent\n",
      "inputs": [],
      "trace_fr": [
        "Le fichier n’existe pas.",
        "L’erreur porte le code ENOENT.",
        "Le programme choisit quoi faire au lieu de planter."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser readFileSync dans un serveur",
      "why_fr": "Toutes les requêtes attendent pendant la lecture.",
      "fix_fr": "Utilise fs.promises avec await."
    },
    {
      "error": "Oublier \"utf8\"",
      "why_fr": "On reçoit des octets bruts.",
      "fix_fr": "Passe l’encodage à readFile."
    },
    {
      "error": "Masquer toutes les erreurs",
      "why_fr": "Un vrai problème de droits passe inaperçu.",
      "fix_fr": "N’attrape que ENOENT, relance le reste."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie readFile(chemin, \"utf8\") ?",
      "options": [
        "Un Buffer",
        "Une promesse du texte",
        "Le nombre de lignes",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Avec await, on obtient le texte.",
      "id": "node-m2-03-q1"
    },
    {
      "question": "Que signifie le code ENOENT ?",
      "options": [
        "Accès refusé",
        "Fichier ou dossier inexistant",
        "Disque plein",
        "Fichier trop gros"
      ],
      "answer": 1,
      "explanation": "Error NO ENTry.",
      "id": "node-m2-03-q2"
    },
    {
      "question": "Pourquoi éviter un chemin construit avec le texte d’un utilisateur ?",
      "options": [
        "C’est lent",
        "Il pourrait sortir du dossier prévu avec ../",
        "C’est interdit en JavaScript",
        "Il manque l’extension"
      ],
      "answer": 1,
      "explanation": "Une faille classique.",
      "id": "node-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fs.promises",
      "definition": "Version à promesses du module des fichiers."
    },
    {
      "term": "ENOENT",
      "definition": "Code d’erreur d’un fichier ou dossier inexistant."
    },
    {
      "term": "Buffer",
      "definition": "Suite d’octets bruts."
    },
    {
      "term": "dossier temporaire",
      "definition": "Dossier jetable fourni par le système."
    }
  ],
  "recap_fr": [
    "Lire et écrire des fichiers texte et JSON avec fs.promises.",
    "Traiter l’absence d’un fichier et construire des chemins sûrs.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "fs.promises",
    "ENOENT",
    "Buffer",
    "dossier temporaire"
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
      "title": "Node.js — système de fichiers",
      "url": "https://nodejs.org/docs/latest-v20.x/api/fs.html"
    },
    {
      "title": "Node.js — path",
      "url": "https://nodejs.org/docs/latest-v20.x/api/path.html"
    }
  ],
  "sources": [
    {
      "title": "Node.js — système de fichiers",
      "url": "https://nodejs.org/docs/latest-v20.x/api/fs.html",
      "scope": "Lire et écrire des fichiers, version promesses. Texte, exemples et exercices originaux Nunya.",
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

Le module fs, pour file system, donne accès aux fichiers. Sa version promesses, require("fs").promises ou require("fs/promises"), s’utilise avec await. readFile(chemin, "utf8") lit un fichier texte et renvoie son contenu ; writeFile(chemin, texte) crée ou remplace un fichier ; appendFile(chemin, texte) ajoute à la fin. Sans l’encodage "utf8", readFile renvoie des octets bruts, un Buffer, au lieu d’un texte.

Il existe aussi des versions synchrones, comme readFileSync. Elles sont pratiques dans un petit script, mais bloquent la boucle d’événements : dans un serveur, pendant la lecture, plus aucune requête n’est servie. On les évite donc dans tout code qui répond à des utilisateurs.

Les chemins se construisent avec path.join, jamais par concaténation de chaînes, pour obtenir le bon séparateur et éviter les doubles barres. Le module os donne os.tmpdir(), le dossier temporaire du système, et fs.promises.mkdtemp crée un dossier temporaire unique, pratique pour des essais qui ne laissent pas de traces : les exercices l’utilisent.

Un fichier peut ne pas exister : premier lancement, mauvais chemin, fichier supprimé. readFile lève alors une erreur dont la propriété code vaut "ENOENT", pour error no entry. Un programme robuste attrape cette erreur précise et choisit un comportement : créer le fichier, utiliser une valeur par défaut, ou signaler clairement le problème. Les autres erreurs, comme un manque de droits ("EACCES"), doivent être relancées avec throw : les masquer cacherait un vrai problème.

Un fichier JSON peut servir de petite base de données : on le lit, on fait JSON.parse, on modifie le tableau, puis on réécrit JSON.stringify(donnees, null, 2). Cette méthode convient à un prototype ou à une petite association. Elle montre vite ses limites : deux requêtes simultanées peuvent écraser mutuellement leurs modifications, et tout le fichier est relu à chaque fois. Les vraies applications utilisent une base de données, comme celles du cours SQL de Nunya.

Enfin, la sécurité : ne construis jamais un chemin directement à partir d’un texte envoyé par un utilisateur. Un nom de fichier comme ../../secret pourrait faire sortir ton programme du dossier prévu. On vérifie le nom, ou on choisit soi-même le nom du fichier. Le dernier module y reviendra.

Dans l’atelier, chaque vérification travaille dans un dossier temporaire neuf : tes fichiers d’essai disparaissent à la fin.

## Exemple guidé 1

```javascript
const fs = require("fs").promises;
const os = require("os");
const path = require("path");

async function principal() {
  const dossier = await fs.mkdtemp(path.join(os.tmpdir(), "boutique-"));
  const fichier = path.join(dossier, "ventes.txt");
  await fs.writeFile(fichier, "riz;2\n");
  await fs.appendFile(fichier, "huile;1\n");
  const texte = await fs.readFile(fichier, "utf8");
  console.log(texte.trim().split("\n"));
}

principal();
```

Affichage attendu :

    [ 'riz;2', 'huile;1' ]

Trace :

- Un dossier temporaire unique est créé.
- writeFile crée le fichier, appendFile ajoute une ligne.
- readFile avec "utf8" renvoie le texte.

## Exemple guidé 2

```javascript
const fs = require("fs").promises;

async function principal() {
  try {
    await fs.readFile("/dossier/inexistant/notes.txt", "utf8");
  } catch (erreur) {
    console.log(erreur.code === "ENOENT" ? "fichier absent" : "autre erreur");
  }
}

principal();
```

Affichage attendu :

    fichier absent

Trace :

- Le fichier n’existe pas.
- L’erreur porte le code ENOENT.
- Le programme choisit quoi faire au lieu de planter.

## Vérifier et expliquer

Décris le comportement que devrait avoir une application de notes le jour où son fichier de sauvegarde a disparu.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — système de fichiers](https://nodejs.org/docs/latest-v20.x/api/fs.html)
- [Node.js — path](https://nodejs.org/docs/latest-v20.x/api/path.html)
