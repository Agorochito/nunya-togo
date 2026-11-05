---
{
  "id": "http-m4-02",
  "title_fr": "Annuler une attente avec AbortController",
  "course": "http-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "http-m4-01"
  ],
  "outcomes": [
    "Relier puis annuler une requête avec un signal réel.",
    "Distinguer annulation et autres erreurs."
  ],
  "idea_fr": "Un contrôleur expose un signal d’annulation ; fetch doit recevoir ce signal pour pouvoir réagir à la demande.",
  "analogy_fr": "Le contrôleur est une commande d’arrêt et le signal est le fil qui la relie au traitement en cours.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "false\nlocale-v1",
      "trace_fr": [
        "Un contrôleur neuf fournit un signal non annulé.",
        "fetch reçoit ce signal mais aucune annulation n’est demandée.",
        "Après le délai local, la réponse est reçue.",
        "aborted reste false et le JSON annonce locale-v1."
      ]
    },
    {
      "inputs": [],
      "expected_output": "AbortError\ntrue",
      "trace_fr": [
        "fetch démarre avec le signal du contrôleur.",
        "abort demande l’arrêt avant la réponse lente.",
        "await observe un rejet nommé AbortError dans ce scénario.",
        "Le signal conserve l’état annulé true."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Annuler après avoir attendu la réponse",
      "why_fr": "L’action arrive trop tard pour l’attente déjà terminée.",
      "fix_fr": "Conserve la promesse, demande l’annulation puis observe son résultat."
    },
    {
      "error": "Réutiliser un signal déjà annulé",
      "why_fr": "Les tentatives suivantes sont annulées immédiatement.",
      "fix_fr": "Crée un contrôleur neuf pour chaque opération indépendante."
    }
  ],
  "quiz": [
    {
      "question": "Que faut-il passer à fetch pour relier le contrôleur ?",
      "options": [
        "Sa propriété signal dans les options.",
        "La propriété status du contrôleur.",
        "Seulement le nom du contrôleur dans un commentaire."
      ],
      "answer": 0,
      "explanation": "L’annulation agit sur les opérations qui ont reçu le signal concerné.",
      "id": "http-m4-02-q1"
    },
    {
      "question": "Peut-on remettre aborted à false pour réutiliser le signal ?",
      "options": [
        "Oui, en répétant await.",
        "Non, une nouvelle opération indépendante demande un nouveau contrôleur.",
        "Oui, en changeant le titre du corps."
      ],
      "answer": 1,
      "explanation": "Le signal conserve son annulation ; un contrôleur neuf évite de propager un ancien abandon.",
      "id": "http-m4-02-q2"
    },
    {
      "question": "Annuler côté client prouve-t-il qu’aucune écriture réelle n’a eu lieu ?",
      "options": [
        "Oui, toujours.",
        "Oui, si le statut du journal vaut zéro.",
        "Non, un destinataire peut avoir déjà traité la demande."
      ],
      "answer": 2,
      "explanation": "Le client et l’effet distant sont distincts ; le journal ne constitue pas une garantie d’annulation métier.",
      "id": "http-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrôleur",
      "definition": "Objet permettant ici de demander une annulation."
    },
    {
      "term": "signal",
      "definition": "Objet transmis à l’opération pour relier une demande d’annulation."
    },
    {
      "term": "AbortError",
      "definition": "Nom de l’erreur observée ici après une annulation sans raison personnalisée."
    }
  ],
  "recap_fr": [
    "Relier puis annuler une requête avec un signal réel.",
    "Distinguer annulation et autres erreurs.",
    "Créer des contrôleurs indépendants pour de nouveaux appels."
  ],
  "tags": [
    "contrôleur",
    "signal",
    "AbortError"
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
      "title": "MDN — AbortController",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/AbortController",
      "scope": "Référence technique ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — try…catch",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch",
      "scope": "Référence technique vérifiée ; aucune reprise de texte.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Un utilisateur peut abandonner une recherche ou changer de choix pendant une attente. Le client doit alors pouvoir arrêter le travail devenu inutile. AbortController fournit un mécanisme d’annulation utilisé par fetch. Créer un contrôleur ne modifie pas automatiquement toutes les requêtes. Il faut transmettre sa propriété signal dans les options de la requête concernée. L’annulation devient ainsi une relation explicite entre une demande et une opération.

Le signal possède notamment aborted, initialement false. Appeler controller.abort() demande l’annulation et fait passer cet état à true. Avec l’appel sans raison personnalisée utilisé ici, un fetch interrompu rejette généralement avec une erreur nommée AbortError. Il faut la traiter comme une annulation attendue, distincte d’un problème de connexion ou d’un refus HTTP. La fonction peut retourner un état « annulé » au lieu d’afficher un message alarmant et imprécis.

Un signal peut être annulé avant le lancement. Une tentative fetch utilisant ce signal rejette alors sans recevoir de réponse HTTP ordinaire. Le journal de l’atelier note la tentative avec un statut pédagogique zéro. Ce zéro ne vient pas d’un serveur. Un signal déjà annulé ne redevient pas actif : pour une nouvelle tentative indépendante, construis un nouveau contrôleur. Réutiliser le même signal ferait échouer immédiatement une demande qui devait pourtant continuer.

La route lent renvoie la même information que ping après un délai local de 250 millisecondes. Elle permet de lancer la requête puis d’appeler abort avant sa réponse. Aucun serveur extérieur n’est sollicité et aucun minuteur de réservation n’existe. Nous annulons immédiatement après le lancement pour rendre l’essai reproductible, sans dépendre d’un petit délai choisi au hasard. L’attente et le traitement du rejet restent de vraies opérations asynchrones du navigateur.

L’annulation d’un client ne garantit pas l’annulation d’un effet déjà produit sur un vrai service. Le destinataire peut avoir reçu et traité une écriture avant la coupure. Notre API ne conserve aucune écriture ; elle ne permet donc pas de conclure sur cette situation réelle. Dans les exercices, sépare réussite, annulation et autres erreurs, et n’utilise que les routes annoncées. Observe un appel annulé puis un appel qui réussit : cette succession vérifie la création de contrôleurs indépendants. Tu pourras ensuite intégrer ce mécanisme à un client plus complet, en gardant un état final compréhensible dans tous les cas.

## Exemple guidé 1

```javascript
const controleur = new AbortController();
const r = await fetch("/api-pedagogique/v1/lent", {signal:controleur.signal});
console.log(controleur.signal.aborted);
console.log((await r.json()).version);
```

## Exemple guidé 2

```javascript
const controleur = new AbortController();
const attente = fetch("/api-pedagogique/v1/lent", {signal:controleur.signal});
controleur.abort();
try {
  await attente;
} catch (erreur) {
  console.log(erreur.name);
}
console.log(controleur.signal.aborted);
```

