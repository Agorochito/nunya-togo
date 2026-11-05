---
{
  "id": "http-m1-02",
  "title_fr": "Attendre une promesse et retourner une valeur asynchrone",
  "course": "http-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "http-m1-01"
  ],
  "outcomes": [
    "Distinguer une promesse de son résultat.",
    "Attendre puis retourner une valeur depuis une fonction async."
  ],
  "idea_fr": "fetch et la lecture du corps produisent des promesses ; await permet d’utiliser leurs résultats.",
  "analogy_fr": "Un récépissé de demande n’est pas encore le document attendu.",
  "common_mistakes": [
    {
      "error": "Promesse prise pour réponse",
      "why_fr": "status est lu avant d’obtenir Response.",
      "fix_fr": "Attends fetch avant cette lecture."
    },
    {
      "error": "Promesse de corps prise pour texte",
      "why_fr": "Une méthode de chaîne est appelée sur text() non attendue.",
      "fix_fr": "Attends la lecture du corps."
    },
    {
      "error": "Retour manquant",
      "why_fr": "La fonction affiche mais ne fournit pas la valeur attendue.",
      "fix_fr": "Utilise return selon son contrat."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie l’appel d’une fonction async ?",
      "options": [
        "Une promesse de son résultat.",
        "Toujours immédiatement son nombre final.",
        "Uniquement une ligne de console."
      ],
      "answer": 0,
      "explanation": "Le résultat doit être attendu par le code qui veut l’utiliser.",
      "id": "http-m1-02-q1"
    },
    {
      "question": "Le premier await fetch suffit-il à fournir automatiquement le texte du corps ?",
      "options": [
        "Oui, Response est une chaîne.",
        "Non, text() doit aussi être appelée et attendue.",
        "Oui, headers contient toujours le texte complet."
      ],
      "answer": 1,
      "explanation": "Réponse et lecture du corps restent deux étapes.",
      "id": "http-m1-02-q2"
    },
    {
      "question": "Pourquoi ne pas remplacer await par une boucle d’attente active ?",
      "options": [
        "Elle accélère forcément le service.",
        "Elle transforme tous les codes HTTP en 200.",
        "Elle ne récupère pas correctement la promesse et bloque inutilement le calcul."
      ],
      "answer": 2,
      "explanation": "L’attente asynchrone doit laisser l’environnement poursuivre son travail.",
      "id": "http-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "promesse",
      "definition": "Objet représentant l’aboutissement ou le rejet d’une opération."
    },
    {
      "term": "await",
      "definition": "Expression qui permet d’obtenir la valeur attendue d’une promesse dans un contexte autorisé."
    },
    {
      "term": "async",
      "definition": "Mot déclarant une fonction qui fournit une promesse."
    }
  ],
  "recap_fr": [
    "Distinguer une promesse de son résultat.",
    "Attendre puis retourner une valeur depuis une fonction async.",
    "Tracer chaque opération avant d’interpréter sa sortie."
  ],
  "tags": [
    "promesse",
    "await",
    "async"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "http",
  "environment_fr": "Worker JavaScript asynchrone avec vraies API fetch et Response. Seules les URL locales /api-pedagogique/v1/ sont autorisées. API fournie par le service worker, données fictives, fonctionnement hors ligne après téléchargement ; aucune écriture conservée entre requêtes. input est une aide pédagogique Nunya, pas une API standard. Aucun DOM, Node.js ou serveur distant.",
  "sources": [
    {
      "title": "MDN — await",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — async function",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — Utiliser l’API Fetch",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "inputs": [],
      "expected_output": "200",
      "trace_fr": [
        "La déclaration prépare une fonction asynchrone sans requête immédiate.",
        "L’appel lance GET /ping ; son await obtient une réponse.",
        "return transmet le nombre 200, puis l’await appelant obtient ce nombre.",
        "La dernière ligne affiche 200."
      ]
    },
    {
      "inputs": [],
      "expected_output": "Bonjour depuis l’API locale.",
      "trace_fr": [
        "La première ligne obtient la réponse.",
        "text() renvoie une promesse conservée dans attenteTexte.",
        "await fournit ensuite la chaîne dans texte.",
        "L’affichage utilise le texte reçu, pas la promesse."
      ]
    }
  ]
}
---

## Explication pas à pas

Certaines opérations ne fournissent pas immédiatement leur résultat. fetch renvoie une promesse, un objet qui représente une opération encore en cours ou déjà terminée. La promesse peut aboutir à une valeur ou être rejetée. Elle n’est pas elle-même l’objet Response attendu. Une variable peut donc exister sans contenir encore les données que l’on veut lire. Confondre ces deux niveaux produit souvent une propriété undefined ou un calcul sur le mauvais objet.

await attend l’aboutissement dans le déroulement de la fonction qui l’utilise. Si la promesse réussit, l’expression fournit sa valeur ; si elle est rejetée, une erreur se propage. Le reste du navigateur n’est pas transformé en attente active. Il ne faut pas remplacer await par une boucle qui vérifie sans cesse une variable : cette boucle empêcherait le programme de travailler correctement et ne récupérerait pas la valeur de la promesse.

La lecture du corps constitue une seconde opération asynchrone. Après const reponse = await fetch(chemin), le programme possède une réponse. const texte = await reponse.text() fournit ensuite le texte. Le premier await ne réalise pas automatiquement toutes les lectures futures. Prends l’habitude de décrire précisément ce qui est disponible après chaque ligne : promesse, réponse, puis contenu lu.

Une fonction qui utilise await est déclarée avec async. Par exemple, async function lireStatut(chemin) peut attendre fetch puis retourner reponse.status. Appeler cette fonction produit à son tour une promesse. Le code appelant doit attendre pour utiliser le nombre retourné. return reste essentiel : afficher une valeur dans la console n’en fait pas la valeur fournie à l’appelant.

Dans l’atelier, await est autorisé au niveau principal des exemples et des exercices. Cette possibilité dépend de l’environnement d’exécution fourni par Nunya ; elle ne signifie pas que le mot peut être placé n’importe où dans tout programme JavaScript. À l’intérieur d’une fonction ordinaire, ajoute async lorsque le contrat demande un travail asynchrone. Les tests attendent également les fonctions clientes qu’ils appellent.

Deux requêtes écrites avec deux await successifs commencent ici dans l’ordre du programme. La deuxième instruction n’est exécutée qu’après le résultat attendu de la première. Ce comportement suffit pour nos premiers exemples. Nous n’introduisons pas encore la concurrence ni les stratégies de parallélisation : annoncer deux opérations ne garantit pas qu’elles sont simultanées.

Ces exercices distinguent aussi recevoir une réponse HTTP et réussir une demande au sens du métier. Une route locale peut répondre avec un code 404 ou 503 sans que fetch rejette pour cette seule raison. Nous étudierons ces codes dans le prochain module, puis les véritables erreurs de réseau et de lecture plus tard. Pour l’instant, attends le bon résultat, retourne la valeur promise par le contrat et vérifie l’ordre de lecture.

## Exemple guidé 1

```javascript
async function lireStatut(chemin) {
  const reponse = await fetch(chemin);
  return reponse.status;
}
const statut = await lireStatut("/api-pedagogique/v1/ping");
console.log(statut);
```

Résultat attendu :

```text
200
```

Trace :

- La déclaration prépare une fonction asynchrone sans requête immédiate.
- L’appel lance GET /ping ; son await obtient une réponse.
- return transmet le nombre 200, puis l’await appelant obtient ce nombre.
- La dernière ligne affiche 200.

## Exemple guidé 2

```javascript
const reponse = await fetch("/api-pedagogique/v1/texte");
const attenteTexte = reponse.text();
const texte = await attenteTexte;
console.log(texte.trim());
```

Résultat attendu :

```text
Bonjour depuis l’API locale.
```

Trace :

- La première ligne obtient la réponse.
- text() renvoie une promesse conservée dans attenteTexte.
- await fournit ensuite la chaîne dans texte.
- L’affichage utilise le texte reçu, pas la promesse.

