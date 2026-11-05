---
{
  "id": "http-m3-02",
  "title_fr": "Distinguer format invalide, données refusées et conflit",
  "course": "http-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "http-m3-01"
  ],
  "outcomes": [
    "Distinguer les refus de format, syntaxe, valeurs et disponibilité.",
    "Combiner aide locale et validation de l’API."
  ],
  "idea_fr": "Un refus HTTP précise une catégorie de problème ; il ne doit pas être confondu avec une panne réseau.",
  "analogy_fr": "Un dossier peut être illisible, rempli avec de mauvaises valeurs ou incompatible avec la situation actuelle : les corrections diffèrent.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "400\nJSON invalide",
      "trace_fr": [
        "Le corps envoyé n’est pas un texte JSON analysable.",
        "Le format annoncé est correct, mais l’analyse échoue côté API locale.",
        "fetch reçoit quand même une réponse HTTP.",
        "Le client lit le statut 400 puis le message du corps."
      ]
    },
    {
      "inputs": [],
      "expected_output": "false\n409\nComplet",
      "trace_fr": [
        "Le JSON et les valeurs ont la forme attendue.",
        "L’atelier 2 est connu mais possède zéro place.",
        "La réponse est un conflit 409 et ok vaut false.",
        "La lecture du JSON fournit Complet ; aucune réservation n’existe."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Tout appeler panne réseau",
      "why_fr": "Les statuts et messages utiles sont perdus.",
      "fix_fr": "Examine la réponse avant de choisir la catégorie."
    },
    {
      "error": "Convertir arbitrairement les types",
      "why_fr": "Une valeur incorrecte peut être acceptée malgré le contrat.",
      "fix_fr": "Valide les types annoncés puis les limites."
    }
  ],
  "quiz": [
    {
      "question": "Quel cas produit ici 400 ?",
      "options": [
        "Un texte de corps qui ne respecte pas la syntaxe JSON.",
        "Un atelier connu sans place.",
        "Un nom correctement envoyé."
      ],
      "answer": 0,
      "explanation": "Le contrôle de syntaxe est distinct de la validation des valeurs.",
      "id": "http-m3-02-q1"
    },
    {
      "question": "Le statut 409 provoque-t-il automatiquement un rejet de fetch ?",
      "options": [
        "Oui, toutes les réponses non 200 rejettent.",
        "Non, le client reçoit une réponse à examiner.",
        "Seulement si le nom est court."
      ],
      "answer": 1,
      "explanation": "Une erreur HTTP et une panne réseau doivent être distinguées.",
      "id": "http-m3-02-q2"
    },
    {
      "question": "Pourquoi garder une validation du destinataire ?",
      "options": [
        "Le client ne sait jamais comparer une longueur.",
        "Pour éviter tout message précis.",
        "Le contrôle du client ne garantit pas les données reçues ni la situation actuelle."
      ],
      "answer": 2,
      "explanation": "Le service doit appliquer ses règles même si une interface aide déjà la saisie.",
      "id": "http-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "syntaxe JSON",
      "definition": "Règles d’écriture permettant d’analyser le texte JSON."
    },
    {
      "term": "validation",
      "definition": "Contrôle de la conformité des valeurs au contrat."
    },
    {
      "term": "conflit HTTP",
      "definition": "Refus lié ici à l’état actuel de la ressource, annoncé par 409."
    }
  ],
  "recap_fr": [
    "Distinguer les refus de format, syntaxe, valeurs et disponibilité.",
    "Combiner aide locale et validation de l’API.",
    "Préparer des essais qui changent une règle à la fois."
  ],
  "tags": [
    "syntaxe JSON",
    "validation",
    "conflit HTTP"
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
    }
  ]
}
---

## Explication pas à pas

Le client sait envoyer un objet, mais une requête peut être refusée pour plusieurs raisons. Dans notre API, le format annoncé, le texte JSON, les valeurs et la disponibilité sont contrôlés séparément. Le statut permet de distinguer ces catégories. Un code HTTP d’erreur reste une réponse : fetch ne rejette pas simplement parce que le statut est 400, 409 ou 422. Le client doit examiner status ou ok puis utiliser le message fourni par le contrat.

Le statut 415 signale ici que Content-Type n’annonce pas JSON. Un corps parfaitement sérialisé ne suffit donc pas si son format est annoncé autrement. Avec le bon en-tête, un texte qui ne respecte pas la syntaxe JSON produit 400 : l’API ne peut pas l’analyser. Ce n’est pas le même cas qu’un objet analysable mais incomplet. Le texte {} est du JSON valide ; il ne contient cependant pas les valeurs requises pour une inscription.

Le statut 422 indique ici des données qui ne satisfont pas le contrat : un nom vide après nettoyage, un type incorrect ou un identifiant qui n’est pas un entier. Le nom fictif doit comporter de un à quarante caractères après trim. Le statut 404 concerne un atelier inconnu. Le statut 409 concerne un atelier connu mais sans place disponible, comme l’atelier 2. Changer le nom ne corrige pas nécessairement ce dernier conflit ; il faut comprendre la règle du scénario.

Une validation dans le client peut guider avant l’envoi : vérifier un type, une longueur ou une borne. Elle ne remplace pas la validation du destinataire. Un autre client peut envoyer d’autres valeurs, et la situation peut évoluer entre une lecture et une demande. Dans cet atelier, l’API locale applique les règles annoncées sans stocker d’écriture. Nous ne réalisons ni contrôle d’identité, ni sécurité complète, ni traitement d’une vraie réservation.

Les activités utilisent des fonctions qui retournent une catégorie ou un couple statut-message au lieu d’afficher seulement « erreur ». Compare un corps mal formé, un objet mal renseigné et un atelier complet. Ajoute une valeur limite, notamment un nom vide ou composé seulement d’espaces. Les tests attendent de vraies requêtes pour les cas envoyés et des retours dépendant des réponses. Les exemples n’utilisent que des noms inventés. Après correction, explique quelle partie doit changer : en-tête, sérialisation, valeur ou choix d’atelier. Une réponse utile oriente la prochaine tentative sans prétendre qu’un seul contrôle garantit tout le service.

## Exemple guidé 1

```javascript
const r = await fetch("/api-pedagogique/v1/inscriptions", {
  method:"POST", headers:{"Content-Type":"application/json"}, body:"{incomplet"
});
const erreur = await r.json();
console.log(r.status);
console.log(erreur.erreur);
```

## Exemple guidé 2

```javascript
const r = await fetch("/api-pedagogique/v1/inscriptions", {
  method:"POST", headers:{"Content-Type":"application/json"},
  body:JSON.stringify({atelierId:2, nom:"Afi"})
});
console.log(r.ok);
console.log(r.status);
console.log((await r.json()).erreur);
```

