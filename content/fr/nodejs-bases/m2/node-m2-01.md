---
{
  "id": "node-m2-01",
  "title_fr": "La boucle d’événements : rappels et minuteurs",
  "course": "nodejs-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "node-m1-03"
  ],
  "outcomes": [
    "Comprendre pourquoi Node.js n’attend pas sans rien faire : la boucle d’événements.",
    "Prévoir l’ordre d’exécution du code synchrone et des rappels, et respecter la convention erreur d’abord."
  ],
  "idea_fr": "Node.js ne fait qu’une chose à la fois, mais n’attend jamais : il lance les tâches lentes, continue, et revient quand elles sont prêtes.",
  "analogy_fr": "Une serveuse de maquis prend la commande d’une table, la transmet à la cuisine et va servir une autre table. Elle ne reste pas plantée devant le four.",
  "examples": [
    {
      "code": "console.log(\"A\");\nsetTimeout(() => console.log(\"C\"), 0);\nconsole.log(\"B\");",
      "expected_output": "A\nB\nC\n",
      "inputs": [],
      "trace_fr": [
        "A et B font partie du code synchrone.",
        "Le rappel du minuteur attend que ce code soit terminé.",
        "C s’affiche donc en dernier, malgré un délai de 0."
      ]
    },
    {
      "code": "setTimeout(() => console.log(\"lent\"), 10);\nsetTimeout(() => console.log(\"rapide\"), 1);\nconsole.log(\"tout de suite\");",
      "expected_output": "tout de suite\nrapide\nlent\n",
      "inputs": [],
      "trace_fr": [
        "Le code synchrone passe d’abord.",
        "Le minuteur de 1 ms se déclenche avant celui de 10 ms.",
        "L’ordre d’écriture ne compte pas, seul le délai compte."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire que setTimeout(f, 0) s’exécute tout de suite",
      "why_fr": "L’ordre du programme surprend.",
      "fix_fr": "Le code synchrone finit toujours d’abord."
    },
    {
      "error": "Une longue boucle dans un serveur",
      "why_fr": "Tout le serveur se fige.",
      "fix_fr": "Découpe ou délègue les calculs lourds."
    },
    {
      "error": "Ignorer l’erreur d’un rappel",
      "why_fr": "Le programme continue avec une valeur absente.",
      "fix_fr": "Teste toujours le premier argument."
    }
  ],
  "quiz": [
    {
      "question": "Qu’affiche : console.log(1); setTimeout(() => console.log(2), 0); console.log(3) ?",
      "options": [
        "1 2 3",
        "1 3 2",
        "2 1 3",
        "3 2 1"
      ],
      "answer": 1,
      "explanation": "Le rappel passe après le code synchrone.",
      "id": "node-m2-01-q1"
    },
    {
      "question": "Dans la convention erreur d’abord, comment signaler un succès ?",
      "options": [
        "rappel(resultat)",
        "rappel(null, resultat)",
        "rappel(true)",
        "return resultat"
      ],
      "answer": 1,
      "explanation": "Pas d’erreur : null.",
      "id": "node-m2-01-q2"
    },
    {
      "question": "Que provoque une boucle de calcul de dix secondes dans un serveur Node.js ?",
      "options": [
        "Rien",
        "Le serveur ne répond plus pendant ce temps",
        "Il est plus rapide",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Un seul morceau de JavaScript à la fois.",
      "id": "node-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "boucle d’événements",
      "definition": "Mécanisme qui exécute les rappels quand les opérations sont prêtes."
    },
    {
      "term": "rappel",
      "definition": "Fonction appelée plus tard, quand une opération se termine."
    },
    {
      "term": "synchrone",
      "definition": "Exécuté immédiatement, dans l’ordre du code."
    },
    {
      "term": "erreur d’abord",
      "definition": "Convention : le premier argument d’un rappel est l’erreur ou null."
    }
  ],
  "recap_fr": [
    "Comprendre pourquoi Node.js n’attend pas sans rien faire : la boucle d’événements.",
    "Prévoir l’ordre d’exécution du code synchrone et des rappels, et respecter la convention erreur d’abord.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "boucle d’événements",
    "rappel",
    "synchrone",
    "erreur d’abord"
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
      "title": "Node.js — minuteurs",
      "url": "https://nodejs.org/docs/latest-v20.x/api/timers.html"
    },
    {
      "title": "MDN — utiliser les promesses",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises"
    }
  ],
  "sources": [
    {
      "title": "Node.js — minuteurs",
      "url": "https://nodejs.org/docs/latest-v20.x/api/timers.html",
      "scope": "setTimeout, setImmediate et boucle d’événements. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — utiliser les promesses",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises",
      "scope": "Promesses, async et await. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un serveur passe l’essentiel de son temps à attendre : la lecture d’un fichier, la réponse d’une base de données, l’arrivée d’une requête. Si le programme restait bloqué pendant chaque attente, il ne pourrait servir qu’une personne à la fois. Node.js adopte une autre stratégie : il n’exécute qu’un seul morceau de JavaScript à la fois, mais ne bloque jamais en attendant. Il confie les opérations lentes au système, continue son travail, puis exécute une fonction de rappel quand l’opération est terminée. Ce mécanisme s’appelle la boucle d’événements.

Le minuteur setTimeout illustre ce fonctionnement. setTimeout(rappel, 0) ne lance pas le rappel immédiatement : il le place dans la file d’attente, et Node.js l’exécutera seulement quand tout le code synchrone en cours sera terminé. Le programme console.log("A"); setTimeout(() => console.log("C"), 0); console.log("B") affiche donc A, B, puis C. Entre deux minuteurs, celui dont le délai est le plus court passe en premier.

Une conséquence importante : une boucle de calcul très longue bloque tout le serveur. Pendant qu’elle tourne, aucune autre requête n’est traitée, aucun minuteur ne se déclenche. Les calculs lourds se découpent ou se confient à d’autres processus.

Historiquement, Node.js signalait la fin d’une opération en appelant une fonction de rappel, ou callback. Une convention s’est imposée : le premier argument du rappel est l’erreur, ou null si tout s’est bien passé, et les suivants contiennent le résultat. On écrit donc rappel(null, resultat) en cas de succès et rappel(new Error("message")) en cas d’échec. Le code qui reçoit le rappel teste d’abord l’erreur. Cette convention « erreur d’abord » se retrouve dans tous les anciens modules de Node.js.

Les rappels imbriqués deviennent vite illisibles quand plusieurs opérations se suivent : on parle de pyramide de rappels. La leçon suivante présente les promesses et async/await, qui résolvent ce problème. Mais les rappels restent présents partout, par exemple dans les gestionnaires de requêtes d’un serveur HTTP, et comprendre la boucle d’événements reste indispensable pour prévoir l’ordre d’exécution d’un programme.

Dans l’atelier, les vérifications attendent la fin de tes rappels quand elles reçoivent une promesse ; garde des délais courts, quelques millisecondes, dans tes essais.

## Exemple guidé 1

```javascript
console.log("A");
setTimeout(() => console.log("C"), 0);
console.log("B");
```

Affichage attendu :

    A
    B
    C

Trace :

- A et B font partie du code synchrone.
- Le rappel du minuteur attend que ce code soit terminé.
- C s’affiche donc en dernier, malgré un délai de 0.

## Exemple guidé 2

```javascript
setTimeout(() => console.log("lent"), 10);
setTimeout(() => console.log("rapide"), 1);
console.log("tout de suite");
```

Affichage attendu :

    tout de suite
    rapide
    lent

Trace :

- Le code synchrone passe d’abord.
- Le minuteur de 1 ms se déclenche avant celui de 10 ms.
- L’ordre d’écriture ne compte pas, seul le délai compte.

## Vérifier et expliquer

Écris un programme de trois lignes avec deux minuteurs et devine l’ordre d’affichage avant de l’exécuter.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — minuteurs](https://nodejs.org/docs/latest-v20.x/api/timers.html)
- [MDN — utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises)
