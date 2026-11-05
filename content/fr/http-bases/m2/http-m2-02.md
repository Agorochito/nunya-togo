---
{
  "id": "http-m2-02",
  "title_fr": "Distinguer status, ok et une réponse d’erreur",
  "course": "http-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "http-m2-01"
  ],
  "outcomes": [
    "Lire status et ok sans les confondre.",
    "Distinguer une réponse d’erreur et une absence de réponse."
  ],
  "idea_fr": "Un code d’erreur HTTP reste une réponse ; fetch ne rejette pas pour ce seul code.",
  "analogy_fr": "Recevoir une réponse disant « introuvable » diffère de ne recevoir aucune réponse.",
  "common_mistakes": [
    {
      "error": "Statut converti en succès",
      "why_fr": "Un nombre non nul est confondu avec un code réussi.",
      "fix_fr": "Lis ok ou une comparaison explicite adaptée."
    },
    {
      "error": "Erreur supposée rejetée",
      "why_fr": "Le code attend un rejet pour tout statut 404.",
      "fix_fr": "Examine la réponse obtenue."
    },
    {
      "error": "Même forme supposée",
      "why_fr": "titre est lu dans un objet d’erreur.",
      "fix_fr": "Choisis le champ selon le contrat de réponse."
    }
  ],
  "quiz": [
    {
      "question": "fetch rejette-t-il uniquement parce qu’un statut 404 est reçu ?",
      "options": [
        "Non, une réponse HTTP peut être examinée.",
        "Oui, aucun objet réponse n’existe jamais pour 404.",
        "Oui, et le service change forcément le code en 200."
      ],
      "answer": 0,
      "explanation": "Une erreur HTTP et une erreur de communication restent distinctes.",
      "id": "http-m2-02-q1"
    },
    {
      "question": "Pour quels codes ok vaut-il true ?",
      "options": [
        "Pour tous les nombres non nuls.",
        "De 200 à 299.",
        "Uniquement pour 404 et 503."
      ],
      "answer": 1,
      "explanation": "ok indique la plage de réussite de la réponse.",
      "id": "http-m2-02-q2"
    },
    {
      "question": "Une recherche de ville renvoie [] avec 200. Quelle lecture respecte ce contrat ?",
      "options": [
        "Le réseau est forcément interrompu.",
        "Le JSON est forcément invalide.",
        "La requête réussit mais aucune fiche ne correspond."
      ],
      "answer": 2,
      "explanation": "Un résultat vide n’est pas à lui seul une erreur HTTP.",
      "id": "http-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "status",
      "definition": "Code numérique du résultat HTTP."
    },
    {
      "term": "ok",
      "definition": "Booléen vrai pour une réponse de statut 200 à 299."
    },
    {
      "term": "erreur HTTP",
      "definition": "Réponse dont le code indique que la demande n’a pas réussi comme attendu."
    }
  ],
  "recap_fr": [
    "Lire status et ok sans les confondre.",
    "Distinguer une réponse d’erreur et une absence de réponse.",
    "Adapter le résultat client au code reçu."
  ],
  "tags": [
    "status",
    "ok",
    "erreur HTTP"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "http",
  "environment_fr": "Worker JavaScript asynchrone avec vraies API fetch et Response. Seules les URL locales /api-pedagogique/v1/ sont autorisées. API fournie par le service worker, données fictives, fonctionnement hors ligne après téléchargement ; aucune écriture conservée entre requêtes. input est une aide pédagogique Nunya, pas une API standard. Aucun DOM, Node.js ou serveur distant.",
  "sources": [
    {
      "title": "MDN — Utiliser l’API Fetch",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "MDN — Propriété Response.ok",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "WHATWG — Fetch Standard",
      "url": "https://fetch.spec.whatwg.org/",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "inputs": [],
      "expected_output": "404\nfalse\nAtelier introuvable",
      "trace_fr": [
        "La première ligne reçoit une vraie réponse HTTP, sans fiche correspondante.",
        "Les deux lectures de métadonnées donnent 404 puis false.",
        "json() analyse le corps d’erreur prévu par le contrat.",
        "La propriété erreur contient Atelier introuvable."
      ]
    },
    {
      "inputs": [],
      "expected_output": "Indisponible",
      "trace_fr": [
        "fetch aboutit à une réponse de statut 503.",
        "ok vaut false : la branche Disponible est ignorée.",
        "Le test suivant reconnaît précisément 503 et affiche Indisponible.",
        "Aucune seconde requête n’a été lancée."
      ]
    }
  ]
}
---

## Explication pas à pas

Une requête peut aboutir à une réponse sans fournir la ressource espérée. status donne le code HTTP. Dans ce cours, 200 signale une lecture réussie, 404 une ressource ou une route introuvable et 503 une indisponibilité volontaire du service pédagogique. Il faut lire le code réellement reçu, pas seulement constater que la ligne await fetch a terminé.

La propriété ok est un booléen qui vaut vrai pour les codes de 200 à 299. Un code 404 ou 503 donne donc false. Ce n’est pas le booléen obtenu en convertissant le nombre du statut : 404 est un nombre non nul, mais ne représente pas un succès HTTP. Utiliser if(reponse.status) revient à poser une autre question et accepte à tort plusieurs erreurs.

fetch ne rejette pas une promesse uniquement parce qu’un code HTTP d’erreur a été reçu. Avec la route locale /erreur, une réponse 503 est disponible et peut être examinée. Une panne de réseau, une annulation ou une lecture JSON impossible relèvent d’autres situations, étudiées plus tard. Confondre ces catégories mène à annoncer une absence de réponse alors que le service a fourni un résultat explicite.

Le corps d’une erreur peut être utile. La route /ateliers/99 renvoie un objet contenant erreur:"Atelier introuvable". La route /erreur renvoie erreur:"Indisponible". Ces deux documents sont du JSON dans le contrat local. La présence d’un objet analysé ne signifie donc pas qu’il s’agit d’une fiche d’atelier : la forme peut dépendre du résultat HTTP. Lire directement .titre dans tous les cas ne respecte pas ce contrat.

Une fonction cliente peut choisir une branche selon ok, puis retourner le titre pour les succès ou le message d’erreur pour les cas prévus. Elle peut aussi distinguer explicitement 404 de 503 lorsque son besoin l’exige. La réponse « absent » décrit une recherche infructueuse, tandis que l’indisponibilité suggère un état du service. Écrire « à réessayer » dans un exercice n’exécute pas automatiquement une nouvelle tentative.

Le besoin de classification reste limité aux codes annoncés. Un else peut nommer les autres cas sans leur inventer une signification. Il ne faut ni masquer toutes les erreurs derrière une liste vide, ni considérer qu’un tableau vide est forcément une erreur. Le filtre de ville étudié précédemment peut fournir zéro fiche avec ok vrai. C’est le contrat de la route et son statut qui permettent d’interpréter ce résultat.

Tous les codes observés ici proviennent de la même API locale fictive. Ils servent à apprendre une distinction réelle de HTTP, sans simuler un accès à un organisme extérieur. Les tests imposent des requêtes avec plusieurs résultats afin de détecter une fonction qui retournerait toujours vrai. Vérifie ensemble le code, le booléen et la forme de valeur que ton client promet de retourner.

## Exemple guidé 1

```javascript
const reponse = await fetch("/api-pedagogique/v1/ateliers/99");
console.log(reponse.status);
console.log(reponse.ok);
const donnees = await reponse.json();
console.log(donnees.erreur);
```

Résultat attendu :

```text
404
false
Atelier introuvable
```

Trace :

- La première ligne reçoit une vraie réponse HTTP, sans fiche correspondante.
- Les deux lectures de métadonnées donnent 404 puis false.
- json() analyse le corps d’erreur prévu par le contrat.
- La propriété erreur contient Atelier introuvable.

## Exemple guidé 2

```javascript
const reponse = await fetch("/api-pedagogique/v1/erreur");
if (reponse.ok) {
  console.log("Disponible");
} else if (reponse.status === 503) {
  console.log("Indisponible");
} else {
  console.log("Autre réponse");
}
```

Résultat attendu :

```text
Indisponible
```

Trace :

- fetch aboutit à une réponse de statut 503.
- ok vaut false : la branche Disponible est ignorée.
- Le test suivant reconnaît précisément 503 et affiche Indisponible.
- Aucune seconde requête n’a été lancée.

