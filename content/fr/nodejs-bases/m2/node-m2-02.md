---
{
  "id": "node-m2-02",
  "title_fr": "Promesses et async/await",
  "course": "nodejs-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "node-m2-01"
  ],
  "outcomes": [
    "Créer et utiliser des promesses, et écrire des fonctions async avec await.",
    "Attraper les erreurs asynchrones et lancer plusieurs opérations en parallèle avec Promise.all."
  ],
  "idea_fr": "Une promesse représente un résultat qui arrivera plus tard ; await permet d’écrire le code asynchrone comme une suite d’étapes lisible.",
  "analogy_fr": "Au pressing, on te donne un ticket. Le ticket n’est pas la chemise, mais il promet que tu la récupéreras, ou qu’on te dira pourquoi elle est perdue.",
  "examples": [
    {
      "code": "function attendre(ms) {\n  return new Promise(resolve => setTimeout(() => resolve(ms), ms));\n}\n\nasync function principal() {\n  console.log(\"début\");\n  const ms = await attendre(5);\n  console.log(\"après\", ms, \"ms\");\n}\n\nprincipal();\nconsole.log(\"pendant l’attente\");",
      "expected_output": "début\npendant l’attente\naprès 5 ms\n",
      "inputs": [],
      "trace_fr": [
        "principal affiche « début » puis attend.",
        "Pendant l’attente, le reste du programme continue.",
        "Après 5 ms, la suite de principal s’exécute."
      ]
    },
    {
      "code": "const STOCK = { riz: { nom: \"Riz\", prix: 600 }, huile: { nom: \"Huile\", prix: 1500 } };\n\nfunction chercherProduit(id) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (STOCK[id]) resolve(STOCK[id]);\n      else reject(new Error(\"produit introuvable : \" + id));\n    }, 2);\n  });\n}\n\nasync function principal() {\n  const [riz, huile] = await Promise.all([chercherProduit(\"riz\"), chercherProduit(\"huile\")]);\n  console.log(riz.nom, huile.prix);\n  try {\n    await chercherProduit(\"sucre\");\n  } catch (erreur) {\n    console.log(\"Erreur :\", erreur.message);\n  }\n}\n\nprincipal();",
      "expected_output": "Riz 1500\nErreur : produit introuvable : sucre\n",
      "inputs": [],
      "trace_fr": [
        "Promise.all lance les deux recherches en parallèle.",
        "La recherche du sucre échoue.",
        "try…catch attrape l’erreur comme du code ordinaire."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier await",
      "why_fr": "On manipule la promesse, pas sa valeur : « [object Promise] ».",
      "fix_fr": "Ajoute await devant l’appel."
    },
    {
      "error": "await en dehors d’une fonction async",
      "why_fr": "Erreur de syntaxe dans un fichier CommonJS.",
      "fix_fr": "Place le code dans une fonction async."
    },
    {
      "error": "Attendre une à une des opérations indépendantes",
      "why_fr": "Le programme est inutilement lent.",
      "fix_fr": "Utilise Promise.all."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie toujours une fonction async ?",
      "options": [
        "Une valeur",
        "Une promesse",
        "undefined",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Même si elle fait return 5.",
      "id": "node-m2-02-q1"
    },
    {
      "question": "Comment attraper l’erreur d’un await ?",
      "options": [
        ".catch seulement",
        "try…catch",
        "if (erreur)",
        "On ne peut pas"
      ],
      "answer": 1,
      "explanation": "Comme une erreur ordinaire.",
      "id": "node-m2-02-q2"
    },
    {
      "question": "Que fait Promise.all si une promesse échoue ?",
      "options": [
        "Ignore l’échec",
        "Échoue dans son ensemble",
        "Recommence",
        "Renvoie null"
      ],
      "answer": 1,
      "explanation": "allSettled donne le détail de chacune.",
      "id": "node-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "promesse",
      "definition": "Objet représentant un résultat futur, tenu ou rompu."
    },
    {
      "term": "async",
      "definition": "Mot-clé qui fait renvoyer une promesse à une fonction."
    },
    {
      "term": "await",
      "definition": "Attend une promesse et donne sa valeur, sans bloquer Node.js."
    },
    {
      "term": "Promise.all",
      "definition": "Attend plusieurs promesses lancées en parallèle."
    }
  ],
  "recap_fr": [
    "Créer et utiliser des promesses, et écrire des fonctions async avec await.",
    "Attraper les erreurs asynchrones et lancer plusieurs opérations en parallèle avec Promise.all.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "promesse",
    "async",
    "await",
    "Promise.all"
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
      "title": "MDN — utiliser les promesses",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises"
    },
    {
      "title": "Node.js — minuteurs",
      "url": "https://nodejs.org/docs/latest-v20.x/api/timers.html"
    }
  ],
  "sources": [
    {
      "title": "MDN — utiliser les promesses",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises",
      "scope": "Promesses, async et await. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — minuteurs",
      "url": "https://nodejs.org/docs/latest-v20.x/api/timers.html",
      "scope": "setTimeout, setImmediate et boucle d’événements. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une promesse est un objet qui représente le résultat d’une opération pas encore terminée. Elle se trouve dans l’un de trois états : en attente, tenue avec une valeur, ou rompue avec une erreur. Les fonctions modernes de Node.js, comme la lecture de fichiers dans fs.promises ou fetch, renvoient des promesses au lieu d’appeler des rappels.

On crée une promesse avec new Promise((resolve, reject) => { … }) : on appelle resolve(valeur) quand l’opération réussit, reject(erreur) quand elle échoue. La fonction attendre(ms), qui tient une promesse après un délai, s’écrit en une ligne autour de setTimeout et sert souvent d’exemple.

Pour utiliser le résultat, on peut écrire promesse.then(valeur => …).catch(erreur => …). Mais la syntaxe async/await est bien plus lisible. Une fonction déclarée async renvoie toujours une promesse. À l’intérieur, await promesse suspend la fonction jusqu’à ce que la promesse soit tenue, puis donne sa valeur ; le reste du programme continue pendant ce temps, la boucle d’événements n’est pas bloquée. Le code se lit alors de haut en bas, comme du code synchrone.

Si la promesse est rompue, await lève l’erreur, qu’on attrape avec un try…catch ordinaire. C’est l’un des grands avantages d’async/await : la gestion d’erreurs redevient familière.

L’oubli de await est l’erreur la plus fréquente. Sans lui, on manipule la promesse elle-même et non sa valeur : additionner une promesse et un nombre donne un texte étrange comme "[object Promise]100", sans erreur. Si un résultat ressemble à [object Promise], cherche un await manquant.

Plusieurs opérations indépendantes n’ont pas besoin d’attendre l’une après l’autre. Promise.all([p1, p2, p3]) les lance en parallèle et donne le tableau de leurs résultats quand toutes sont tenues ; si une seule échoue, l’ensemble échoue. Quand on veut au contraire connaître le sort de chacune, réussite ou échec, on utilise Promise.allSettled, qui donne pour chaque promesse un objet avec status valant fulfilled ou rejected.

Dans un serveur, presque tout devient async : lire une requête, interroger une base, écrire un fichier. Les modules suivants utilisent constamment ces outils ; prends le temps de les maîtriser ici.

## Exemple guidé 1

```javascript
function attendre(ms) {
  return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}

async function principal() {
  console.log("début");
  const ms = await attendre(5);
  console.log("après", ms, "ms");
}

principal();
console.log("pendant l’attente");
```

Affichage attendu :

    début
    pendant l’attente
    après 5 ms

Trace :

- principal affiche « début » puis attend.
- Pendant l’attente, le reste du programme continue.
- Après 5 ms, la suite de principal s’exécute.

## Exemple guidé 2

```javascript
const STOCK = { riz: { nom: "Riz", prix: 600 }, huile: { nom: "Huile", prix: 1500 } };

function chercherProduit(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (STOCK[id]) resolve(STOCK[id]);
      else reject(new Error("produit introuvable : " + id));
    }, 2);
  });
}

async function principal() {
  const [riz, huile] = await Promise.all([chercherProduit("riz"), chercherProduit("huile")]);
  console.log(riz.nom, huile.prix);
  try {
    await chercherProduit("sucre");
  } catch (erreur) {
    console.log("Erreur :", erreur.message);
  }
}

principal();
```

Affichage attendu :

    Riz 1500
    Erreur : produit introuvable : sucre

Trace :

- Promise.all lance les deux recherches en parallèle.
- La recherche du sucre échoue.
- try…catch attrape l’erreur comme du code ordinaire.

## Vérifier et expliquer

Réécris avec async/await un enchaînement de trois rappels imbriqués que tu as déjà rencontré.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [MDN — utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises)
- [Node.js — minuteurs](https://nodejs.org/docs/latest-v20.x/api/timers.html)
