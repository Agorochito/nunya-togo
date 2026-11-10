---
{
  "id": "node-m4-02",
  "title_fr": "Sécurité : ne jamais faire confiance aux entrées",
  "course": "nodejs-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "node-m4-01"
  ],
  "outcomes": [
    "Valider chaque donnée reçue et échapper le texte inséré dans du HTML.",
    "Reconnaître les failles courantes d’un serveur : injection, traversée de chemin, secrets dans le code."
  ],
  "idea_fr": "Tout ce qui arrive de l’extérieur peut être piégé : un serveur sûr vérifie, échappe et limite, sans jamais supposer que le client est honnête.",
  "analogy_fr": "Le caissier d’une banque vérifie chaque billet, même tendu par un client souriant. Ce n’est pas de la méfiance envers la personne, c’est la règle pour tous.",
  "examples": [
    {
      "code": "function echapperHTML(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nconst commentaire = '<script>alert(\"piège\")</script>';\nconsole.log(echapperHTML(commentaire));\nconsole.log(echapperHTML(\"Riz & haricots\"));",
      "expected_output": "&lt;script&gt;alert(&quot;piège&quot;)&lt;/script&gt;\nRiz &amp; haricots\n",
      "inputs": [],
      "trace_fr": [
        "Les chevrons deviennent des entités : plus de balise.",
        "Les guillemets sont échappés aussi.",
        "Le texte s’affichera tel quel, sans s’exécuter."
      ]
    },
    {
      "code": "const NOM_SUR = /^[a-z0-9-]+\\.txt$/;\nfor (const nom of [\"notes-2026.txt\", \"../../config/secret.txt\", \"photo.exe\"]) {\n  console.log(nom, NOM_SUR.test(nom) ? \"accepté\" : \"refusé\");\n}",
      "expected_output": "notes-2026.txt accepté\n../../config/secret.txt refusé\nphoto.exe refusé\n",
      "inputs": [],
      "trace_fr": [
        "La liste d’autorisation décrit les noms acceptés.",
        "La tentative de sortir du dossier est refusée.",
        "Une extension imprévue aussi."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Insérer un texte reçu dans du HTML sans l’échapper",
      "why_fr": "Un script piégé s’exécute chez tous les visiteurs.",
      "fix_fr": "Échappe & < > \" et '."
    },
    {
      "error": "Construire un chemin avec un nom reçu",
      "why_fr": "Traversée de chemin vers des fichiers secrets.",
      "fix_fr": "Accepte seulement des noms sûrs."
    },
    {
      "error": "Écrire une clé secrète dans le code",
      "why_fr": "Elle finit publiée sur GitHub.",
      "fix_fr": "Lis-la dans process.env."
    }
  ],
  "quiz": [
    {
      "question": "Que devient < après échappement HTML ?",
      "options": [
        "<<",
        "&lt;",
        "\\<",
        "rien"
      ],
      "answer": 1,
      "explanation": "Une entité HTML.",
      "id": "node-m4-02-q1"
    },
    {
      "question": "Qu’est-ce qu’une liste d’autorisation ?",
      "options": [
        "La liste des attaques connues",
        "La description de ce qui est accepté, tout le reste étant refusé",
        "Un fichier de mots de passe",
        "Une liste d’utilisateurs"
      ],
      "answer": 1,
      "explanation": "Plus sûr que de lister les dangers.",
      "id": "node-m4-02-q2"
    },
    {
      "question": "Où ranger une clé d’API ?",
      "options": [
        "Dans le code",
        "Dans une variable d’environnement",
        "Dans le README",
        "Dans une page HTML"
      ],
      "answer": 1,
      "explanation": "process.env.",
      "id": "node-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "XSS",
      "definition": "Injection de code dans une page vue par d’autres utilisateurs."
    },
    {
      "term": "échappement",
      "definition": "Remplacement des caractères spéciaux par des entités inoffensives."
    },
    {
      "term": "traversée de chemin",
      "definition": "Faille qui fait sortir un programme du dossier prévu avec ../."
    },
    {
      "term": "variable d’environnement",
      "definition": "Valeur fournie au programme par le système, hors du code."
    }
  ],
  "recap_fr": [
    "Valider chaque donnée reçue et échapper le texte inséré dans du HTML.",
    "Reconnaître les failles courantes d’un serveur : injection, traversée de chemin, secrets dans le code.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "XSS",
    "échappement",
    "traversée de chemin",
    "variable d’environnement"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html"
    }
  ],
  "sources": [
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html",
      "scope": "Créer un serveur et répondre aux requêtes. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un serveur public reçoit des requêtes de n’importe qui, y compris de programmes conçus pour trouver des failles. La liste OWASP Top 10, référence internationale, recense les risques les plus fréquents des applications web. Beaucoup ont la même cause : utiliser une donnée reçue sans la vérifier ni la transformer.

Le premier rempart est la validation, vue au module précédent : type, longueur, format, limites. On définit ce qui est accepté plutôt que d’essayer d’énumérer ce qui est dangereux, ce qu’on appelle une liste d’autorisation. Un nom de fichier, par exemple, n’est accepté que s’il ne contient que des lettres minuscules, des chiffres, des tirets et une extension prévue. Ainsi, un nom comme ../../config/secret.txt, qui tenterait de sortir du dossier autorisé, une faille appelée traversée de chemin, est refusé d’office.

Le deuxième rempart est l’échappement. Quand un serveur insère dans une page HTML un texte venu d’un utilisateur, comme un nom ou un commentaire, ce texte pourrait contenir une balise script. Le navigateur de tous les visiteurs exécuterait alors le code de l’attaquant : c’est le cross-site scripting, ou XSS. Pour l’empêcher, on remplace les caractères spéciaux par leurs entités HTML avant l’insertion : < devient &lt;, > devient &gt;, & devient &amp;, et les guillemets aussi. Le texte s’affiche tel quel, sans jamais être interprété comme du code. Les moteurs de gabarits et les bibliothèques comme React le font automatiquement, mais une concaténation manuelle ne le fait pas.

Le même principe s’applique aux bases de données, avec l’injection SQL, que le cours SQL et le cours de cybersécurité de Nunya présentent : on n’assemble jamais une requête avec du texte reçu, on utilise des requêtes paramétrées.

Les secrets, comme une clé d’API ou le mot de passe d’une base, ne s’écrivent jamais dans le code : il finirait sur GitHub, visible de tous. On les lit dans les variables d’environnement, process.env.CLE_API, fixées sur le serveur, et le programme refuse de démarrer si elles manquent.

Enfin, un serveur sûr répond avec prudence. Les messages d’erreur destinés au client restent généraux : « requête invalide » plutôt que la trace complète de l’erreur, qui révèle des noms de fichiers ou de tables. Le détail va dans les journaux du serveur, lus par l’équipe. Et l’on ne renvoie jamais une donnée telle quelle sans savoir ce qu’elle contient.

## Exemple guidé 1

```javascript
function echapperHTML(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const commentaire = '<script>alert("piège")</script>';
console.log(echapperHTML(commentaire));
console.log(echapperHTML("Riz & haricots"));
```

Affichage attendu :

    &lt;script&gt;alert(&quot;piège&quot;)&lt;/script&gt;
    Riz &amp; haricots

Trace :

- Les chevrons deviennent des entités : plus de balise.
- Les guillemets sont échappés aussi.
- Le texte s’affichera tel quel, sans s’exécuter.

## Exemple guidé 2

```javascript
const NOM_SUR = /^[a-z0-9-]+\.txt$/;
for (const nom of ["notes-2026.txt", "../../config/secret.txt", "photo.exe"]) {
  console.log(nom, NOM_SUR.test(nom) ? "accepté" : "refusé");
}
```

Affichage attendu :

    notes-2026.txt accepté
    ../../config/secret.txt refusé
    photo.exe refusé

Trace :

- La liste d’autorisation décrit les noms acceptés.
- La tentative de sortir du dossier est refusée.
- Une extension imprévue aussi.

## Vérifier et expliquer

Prends un formulaire que tu as déjà créé et liste, pour chaque champ, la règle de validation qui lui conviendrait.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
