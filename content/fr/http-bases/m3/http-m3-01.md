---
{
  "id": "http-m3-01",
  "title_fr": "Envoyer un objet JSON avec une requête POST",
  "course": "http-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "http-m2-03"
  ],
  "outcomes": [
    "Envoyer un objet sérialisé avec POST.",
    "Lire séparément statut, en-têtes et corps."
  ],
  "idea_fr": "Le corps d’une requête POST peut transporter un objet sérialisé, dont le format est annoncé par un en-tête.",
  "analogy_fr": "Le corps est le contenu d’un formulaire envoyé ; l’en-tête indique comment le destinataire doit le lire.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "201\nAfi",
      "trace_fr": [
        "La méthode POST et l’URL choisissent la route locale d’inscription.",
        "JSON.stringify produit le corps textuel ; Content-Type en annonce le format.",
        "La première attente reçoit une réponse de statut 201.",
        "La seconde attente analyse son JSON.",
        "La console lit le statut puis le nom fictif ; rien n’est réservé."
      ]
    },
    {
      "inputs": [],
      "expected_output": "3\nKofi",
      "trace_fr": [
        "Headers prépare l’annonce du format JSON.",
        "Request contient méthode, en-têtes et corps pour l’atelier 3.",
        "fetch utilise cette requête réelle locale.",
        "Le JSON reçu contient le nom nettoyé par l’API.",
        "Les affichages montrent 3 puis Kofi, sans espaces extérieurs."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Envoyer directement un objet",
      "why_fr": "Le corps n’est pas le texte JSON attendu.",
      "fix_fr": "Utilise JSON.stringify."
    },
    {
      "error": "Présenter 201 comme une réservation",
      "why_fr": "Le périmètre fictif est oublié.",
      "fix_fr": "Annonce l’acceptation locale et l’absence de persistance."
    }
  ],
  "quiz": [
    {
      "question": "Que fait Content-Type: application/json ?",
      "options": [
        "Il sérialise automatiquement toutes les variables.",
        "Il garantit une place réelle.",
        "Il annonce le format du corps envoyé."
      ],
      "answer": 2,
      "explanation": "L’en-tête décrit le format ; JSON.stringify effectue ici la sérialisation.",
      "id": "http-m3-01-q1"
    },
    {
      "question": "Pourquoi deux await sont-ils fréquents ?",
      "options": [
        "Il faut recevoir la réponse puis lire son corps.",
        "Ils envoient obligatoirement deux inscriptions.",
        "Le premier affiche toujours la réponse."
      ],
      "answer": 0,
      "explanation": "La réponse et l’analyse de son corps sont deux opérations asynchrones distinctes.",
      "id": "http-m3-01-q2"
    },
    {
      "question": "Que prouve un succès 201 dans cet atelier ?",
      "options": [
        "Une place réelle a été réservée.",
        "L’API locale a accepté la démonstration, sans réservation persistante.",
        "Un compte personnel existe."
      ],
      "answer": 1,
      "explanation": "Le contrat local ne conserve pas les écritures et ne doit pas être présenté comme un service de réservation.",
      "id": "http-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "sérialisation",
      "definition": "Transformation d’une valeur en une représentation textuelle."
    },
    {
      "term": "corps de requête",
      "definition": "Données transportées par la requête."
    },
    {
      "term": "en-tête",
      "definition": "Métadonnée décrivant un aspect d’une requête ou d’une réponse."
    }
  ],
  "recap_fr": [
    "Envoyer un objet sérialisé avec POST.",
    "Lire séparément statut, en-têtes et corps.",
    "Expliquer la limite de la confirmation fictive."
  ],
  "tags": [
    "sérialisation",
    "corps de requête",
    "en-tête"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "http",
  "environment_fr": "Worker JavaScript asynchrone ; fetch, Request, Response, Headers et AbortController réels. API pédagogique locale de même origine, fournie par le service worker Nunya et disponible hors ligne après téléchargement. Données fictives ; aucune réservation réelle et aucune écriture persistante entre requêtes. Ni DOM, ni Node.js, ni serveur distant. input est une aide pédagogique Nunya.",
  "sources": [
    {
      "title": "MDN — Utiliser Fetch",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch",
      "scope": "Référence technique ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — Fonctions async",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function",
      "scope": "Référence technique ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "WHATWG — Standard Fetch",
      "url": "https://fetch.spec.whatwg.org/",
      "scope": "Référence technique ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — Request",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Request",
      "scope": "Référence technique ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Jusqu’ici, le client demandait surtout des informations. Pour proposer une inscription fictive à un atelier, il doit maintenant transmettre un identifiant et un nom inventé. Dans notre API locale, cette opération utilise POST sur inscriptions. L’URL indique la ressource, la méthode précise l’opération et le corps transporte les données. Choisir POST n’envoie pas automatiquement toutes les variables du programme : tu dois construire explicitement ce corps.

Un objet JavaScript et du JSON ne sont pas la même chose. JSON est une représentation textuelle de données. JSON.stringify transforme ici { atelierId:1, nom:"Afi" } en texte JSON. Ce texte devient la valeur de body dans les options de fetch. Fournir directement l’objet n’est pas une manière fiable d’envoyer du JSON ; sa conversion peut produire un texte qui ne représente pas les propriétés attendues. Le corps doit correspondre au contrat de l’API.

L’en-tête Content-Type: application/json annonce le format envoyé. Il ne sérialise pas les données à ta place. Tu peux fournir les en-têtes avec un objet simple ou avec Headers. Request permet aussi de préparer une requête, puis de la transmettre à fetch. Ces écritures produisent de vraies requêtes du navigateur dans le laboratoire. Les seules destinations autorisées appartiennent à l’API pédagogique de même origine ; aucune donnée n’est envoyée vers un site extérieur.

L’attente comporte deux moments : await fetch reçoit une réponse, puis await reponse.json lit et analyse son corps. Le statut 201 de notre route indique une création de démonstration acceptée. Le corps contient un identifiant de confirmation fictif, l’atelier et le nom nettoyé. Le statut, les en-têtes et les données du corps restent des informations distinctes. Lire seulement le statut ne récupère pas le nom ; lire le corps ne doit pas faire oublier de vérifier si le statut correspond au cas attendu.

Dans les premiers exercices, les identifiants et noms satisfont le contrat. La leçon suivante étudiera les refus de format et de valeurs. N’utilise jamais de nom réel ni de mot de passe. L’API locale renvoie une confirmation mais ne conserve aucune inscription et ne diminue pas les places. Cette limite reste vraie après plusieurs succès 201. Les tests vérifient les retours et l’observation de requêtes réelles : une valeur constante écrite sans appel ne suffit pas. Après chaque essai, explique quelles données ont circulé et quelles conclusions restent impossibles sur une réservation réelle.

## Exemple guidé 1

```javascript
const reponse = await fetch("/api-pedagogique/v1/inscriptions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ atelierId: 1, nom: "Afi" })
});
const confirmation = await reponse.json();
console.log(reponse.status);
console.log(confirmation.nom);
```

## Exemple guidé 2

```javascript
const entetes = new Headers();
entetes.set("Content-Type", "application/json");
const requete = new Request("/api-pedagogique/v1/inscriptions", {
  method: "POST", headers: entetes,
  body: JSON.stringify({ atelierId: 3, nom: " Kofi " })
});
const reponse = await fetch(requete);
const donnees = await reponse.json();
console.log(donnees.atelierId);
console.log(donnees.nom);
```

