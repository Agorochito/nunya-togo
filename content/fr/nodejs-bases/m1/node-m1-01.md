---
{
  "id": "node-m1-01",
  "title_fr": "Node.js : JavaScript hors du navigateur",
  "course": "nodejs-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "js-m8-03"
  ],
  "outcomes": [
    "Expliquer ce qu’est Node.js et ce qui change par rapport au JavaScript du navigateur.",
    "Écrire et exécuter un premier programme Node.js avec des fonctions et des affichages."
  ],
  "idea_fr": "Node.js fait tourner JavaScript sur un ordinateur ou un serveur, sans navigateur : on garde le langage, on change d’outils.",
  "analogy_fr": "Un cuisinier qui passe d’un restaurant à un traiteur garde ses recettes. Il perd la salle et les clients assis, mais gagne un grand four et un camion de livraison.",
  "examples": [
    {
      "code": "const nom = \"Afi\";\nconsole.log(`Bonjour ${nom} !`);\nconsole.log(typeof document, typeof require);",
      "expected_output": "Bonjour Afi !\nundefined function\n",
      "inputs": [],
      "trace_fr": [
        "Le gabarit insère le nom dans la phrase.",
        "document n’existe pas dans Node.js.",
        "require, propre à Node.js, est une fonction."
      ]
    },
    {
      "code": "function prixTTC(prixHT) {\n  return Math.round(prixHT * 1.18);\n}\n\nconst articles = [1000, 2500, 333];\nfor (const prix of articles) {\n  console.log(prix, \"→\", prixTTC(prix));\n}",
      "expected_output": "1000 → 1180\n2500 → 2950\n333 → 393\n",
      "inputs": [],
      "trace_fr": [
        "La fonction renvoie le prix avec 18 % de TVA.",
        "La boucle for…of parcourt le tableau.",
        "Le même code fonctionnerait dans un navigateur."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser document ou window",
      "why_fr": "Ces objets n’existent pas dans Node.js.",
      "fix_fr": "Affiche avec console.log et renvoie avec return."
    },
    {
      "error": "Afficher au lieu de renvoyer",
      "why_fr": "La fonction ne peut pas être testée ni réutilisée.",
      "fix_fr": "Renvoie le résultat avec return."
    },
    {
      "error": "Croire que Node.js est un autre langage",
      "why_fr": "On réapprend inutilement.",
      "fix_fr": "C’est le même JavaScript, avec d’autres outils."
    }
  ],
  "quiz": [
    {
      "question": "Qu’est-ce que Node.js ?",
      "options": [
        "Un navigateur",
        "Un environnement qui exécute JavaScript hors du navigateur",
        "Un nouveau langage",
        "Une base de données"
      ],
      "answer": 1,
      "explanation": "Il utilise le moteur V8 de Chrome.",
      "id": "node-m1-01-q1"
    },
    {
      "question": "Que vaut typeof document dans Node.js ?",
      "options": [
        "\"object\"",
        "\"undefined\"",
        "\"function\"",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Il n’y a pas de page.",
      "id": "node-m1-01-q2"
    },
    {
      "question": "Quelle commande exécute programme.js ?",
      "options": [
        "run programme.js",
        "node programme.js",
        "npm programme.js",
        "js programme.js"
      ],
      "answer": 1,
      "explanation": "Dans un terminal.",
      "id": "node-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "Node.js",
      "definition": "Environnement qui exécute JavaScript sur un ordinateur ou un serveur."
    },
    {
      "term": "V8",
      "definition": "Moteur JavaScript de Chrome, utilisé par Node.js."
    },
    {
      "term": "npm",
      "definition": "Gestionnaire de paquets fourni avec Node.js."
    },
    {
      "term": "gabarit de chaîne",
      "definition": "Texte entre accents graves qui insère des valeurs avec ${}."
    }
  ],
  "recap_fr": [
    "Expliquer ce qu’est Node.js et ce qui change par rapport au JavaScript du navigateur.",
    "Écrire et exécuter un premier programme Node.js avec des fonctions et des affichages.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "Node.js",
    "V8",
    "npm",
    "gabarit de chaîne"
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
      "title": "MDN — littéraux de gabarits",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals"
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
      "title": "MDN — littéraux de gabarits",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals",
      "scope": "Composer des chaînes avec ${}. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Jusqu’ici, ton JavaScript s’exécutait dans un navigateur : il manipulait une page, réagissait aux clics, affichait des fenêtres. Node.js, créé en 2009, prend le moteur JavaScript du navigateur Chrome, appelé V8, et le fait fonctionner seul, sur un ordinateur ou un serveur. Le langage est exactement le même : variables, fonctions, tableaux, objets, classes, promesses. Ce qui change, ce sont les outils disponibles autour du langage.

Dans Node.js, il n’y a ni page ni fenêtre : document et window n’existent pas, et un programme qui les utilise s’arrête sur une ReferenceError. En échange, Node.js donne accès à ce qu’un navigateur interdit pour des raisons de sécurité : lire et écrire des fichiers, ouvrir des connexions réseau, créer un serveur web, lancer d’autres programmes. C’est pourquoi Node.js sert surtout à écrire des serveurs, des outils en ligne de commande et des scripts d’automatisation.

Beaucoup de services que tu utilises reposent sur Node.js côté serveur, et il est très demandé dans les offres d’emploi de développeur web. Son grand avantage : un seul langage pour le navigateur et pour le serveur. Une équipe peut partager du code, comme des fonctions de validation, entre les deux.

Sur un ordinateur, on installe Node.js depuis son site officiel, puis on exécute un fichier avec la commande node programme.js dans un terminal. Le gestionnaire de paquets npm, installé avec Node.js, permet d’ajouter des bibliothèques écrites par d’autres développeurs. Dans ce cours, ton code s’exécute sur Node.js 20 en ligne, sur le service Wandbox : une connexion est nécessaire pour vérifier les exercices, mais les leçons restent lisibles hors ligne.

console.log fonctionne comme dans le navigateur, mais affiche dans le terminal. Les gabarits de chaînes, entre accents graves, restent la façon la plus lisible de composer un message : `Bonjour ${nom} !`.

Les exercices de ce cours vérifient deux choses : ce que ton programme affiche, et ce que renvoient tes fonctions quand l’atelier les appelle avec différentes valeurs. Écris donc des fonctions qui renvoient leur résultat avec return, plutôt que de seulement l’afficher : une fonction qui renvoie une valeur peut être testée, réutilisée et combinée.

Le premier module pose les bases : fonctions, modules et données JSON. Le deuxième aborde l’asynchrone, cœur de Node.js. Le troisième construit de vrais serveurs HTTP, et le dernier les organise et les sécurise.

## Exemple guidé 1

```javascript
const nom = "Afi";
console.log(`Bonjour ${nom} !`);
console.log(typeof document, typeof require);
```

Affichage attendu :

    Bonjour Afi !
    undefined function

Trace :

- Le gabarit insère le nom dans la phrase.
- document n’existe pas dans Node.js.
- require, propre à Node.js, est une fonction.

## Exemple guidé 2

```javascript
function prixTTC(prixHT) {
  return Math.round(prixHT * 1.18);
}

const articles = [1000, 2500, 333];
for (const prix of articles) {
  console.log(prix, "→", prixTTC(prix));
}
```

Affichage attendu :

    1000 → 1180
    2500 → 2950
    333 → 393

Trace :

- La fonction renvoie le prix avec 18 % de TVA.
- La boucle for…of parcourt le tableau.
- Le même code fonctionnerait dans un navigateur.

## Vérifier et expliquer

Explique avec tes mots deux choses que Node.js peut faire et qu’un navigateur interdit.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — modules CommonJS](https://nodejs.org/docs/latest-v20.x/api/modules.html)
- [MDN — littéraux de gabarits](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals)
