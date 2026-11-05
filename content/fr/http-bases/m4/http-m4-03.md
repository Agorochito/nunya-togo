---
{
  "id": "http-m4-03",
  "title_fr": "Projet : construire un client de catalogue et de demande fictive",
  "course": "http-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "http-m4-02"
  ],
  "outcomes": [
    "Assembler un client asynchrone de catalogue et demande fictive.",
    "Vérifier les chemins de succès, vide, refus, erreur et annulation."
  ],
  "idea_fr": "Un client relie chargement, choix, demande et diagnostics sans transformer une démonstration en service réel.",
  "analogy_fr": "Le client est un guichet d’orientation : il consulte le catalogue, examine le choix puis présente clairement le résultat de la demande.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "Python, Web",
      "trace_fr": [
        "URL sert seulement à construire correctement le chemin et la recherche.",
        "Seuls pathname et search sont envoyés à l’API locale, jamais au domaine illustratif.",
        "La réponse de Lomé contient Python et Web.",
        "Le filtre conserve les activités avec des places et l’affichage présente leurs titres."
      ]
    },
    {
      "inputs": [],
      "expected_output": "Confirmation fictive pour Lina\nAucune réservation réelle.",
      "trace_fr": [
        "La demande porte sur une activité connue avec des places.",
        "Le client lit le vrai corps et contrôle ok.",
        "Le statut 201 mène au message de confirmation fictive.",
        "La dernière phrase précise la limite persistante du projet."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Envoyer avant d’examiner le choix",
      "why_fr": "Un atelier absent ou complet est traité comme disponible.",
      "fix_fr": "Vérifie le catalogue avant la demande selon le contrat."
    },
    {
      "error": "Omettre la limite de persistance",
      "why_fr": "Le client est présenté comme une réservation réelle.",
      "fix_fr": "Explique les observations et la portée exacte de la démonstration."
    }
  ],
  "quiz": [
    {
      "question": "Une liste sans activité disponible doit-elle automatiquement être classée réseau ?",
      "options": [
        "Oui, tout tableau vide signifie une panne.",
        "Non, c’est un état de données à expliquer séparément.",
        "Oui, il faut inventer une activité."
      ],
      "answer": 1,
      "explanation": "Un succès de chargement peut fournir un résultat vide ou sans place.",
      "id": "http-m4-03-q1"
    },
    {
      "question": "Pourquoi le contrôle de disponibilité avant POST ne suffit-il pas à une vraie réservation ?",
      "options": [
        "Le client ne peut jamais lire un tableau.",
        "Un GET réserve toujours les places.",
        "La situation pourrait changer et le destinataire doit encore appliquer ses règles."
      ],
      "answer": 2,
      "explanation": "Le contrôle préalable guide l’utilisateur sans remplacer le traitement final du service.",
      "id": "http-m4-03-q2"
    },
    {
      "question": "Que doit affirmer le bilan de ce projet ?",
      "options": [
        "Les requêtes et états vérifiés, avec la limite locale et fictive.",
        "Une inscription réelle durable.",
        "Une interface DOM et un serveur Node inexistants."
      ],
      "answer": 0,
      "explanation": "Le résultat se mesure dans son périmètre réel, sans lui attribuer des fonctionnalités non construites.",
      "id": "http-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "état client",
      "definition": "Résultat explicite indiquant où en est un traitement."
    },
    {
      "term": "confirmation fictive",
      "definition": "Réponse pédagogique acceptée sans réservation persistante."
    },
    {
      "term": "bilan",
      "definition": "Explication des capacités, preuves et limites du livrable."
    }
  ],
  "recap_fr": [
    "Assembler un client asynchrone de catalogue et demande fictive.",
    "Vérifier les chemins de succès, vide, refus, erreur et annulation.",
    "Présenter un bilan honnête des preuves et des limites."
  ],
  "tags": [
    "état client",
    "confirmation fictive",
    "bilan"
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
      "title": "MDN — try…catch",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch",
      "scope": "Référence technique vérifiée ; aucune reprise de texte.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Tu vas réunir les premières capacités HTTP dans un client de catalogue et d’inscription fictive. Le livrable est constitué de fonctions asynchrones utilisables dans le Worker, avec des résultats structurés que l’on peut vérifier. Il ne contient pas d’interface DOM, de serveur Node.js, de compte ni de réservation réelle. L’API locale possède un catalogue stable et ne conserve aucune écriture entre requêtes ; cette limite doit figurer dans ton explication finale.

La première étape charge les ateliers d’une ville en construisant correctement les paramètres d’URL. Les données reçues permettent de produire une liste d’activités disponibles. Un tableau vide ou une liste sans place disponible n’est pas automatiquement une panne ni un statut 404. Le résultat doit annoncer cet état sans inventer une activité. La seconde étape prépare une demande JSON avec un identifiant choisi et un nom entièrement fictif ; le client conserve le statut et le message utiles.

La troisième étape vérifie les chemins difficiles : réponse HTTP de refus, JSON illisible, interruption et annulation. Le client distingue ces diagnostics et ne reste pas dans une attente sans issue. Un contrôleur neuf permet une annulation indépendante. Ces essais servent de preuves de fonctionnement sur des scénarios contrôlés, pas de garantie universelle sur tous les services. Les réponses et les tentatives sont réellement observées par l’atelier.

Dans le parcours complet, charge d’abord le catalogue filtré. Si l’identifiant n’y figure pas, retourne un état absent. S’il figure mais n’a aucune place, retourne complet sans envoyer une demande inutile. Sinon, envoie POST inscriptions et utilise la confirmation ou le refus réel. Cette lecture préalable aide l’utilisateur mais ne remplace pas le contrôle du destinataire : dans un vrai système, la disponibilité pourrait changer avant l’envoi. Aucune décrémentation de places ne doit être inventée ici.

Les quatre activités sont des jalons vérifiables puis une synthèse. Le dernier contrat annonce aussi des routes de diagnostic afin de provoquer les erreurs au lieu de supposer leur traitement. La revue examine fonctionnement, clarté des états, preuves de tests et explication des limites. Pour chaque dimension, note « à reprendre », « satisfait » ou « expliqué et vérifié ». Raconte une réussite, un résultat vide, un refus, une erreur et une annulation. Les modules avancés pourront ensuite ajouter interface, authentification, persistance et garanties de reprise ; ce projet valide seulement le client débutant décrit dans le contrat.

## Exemple guidé 1

```javascript
const url = new URL("/api-pedagogique/v1/ateliers", "https://exemple.invalid");
url.searchParams.set("ville", "Lomé");
const r = await fetch(url.pathname + url.search);
const ateliers = await r.json();
const titres = [];
for (const atelier of ateliers) { if (atelier.places > 0) { titres.push(atelier.titre); } }
console.log(titres.join(", "));
```

## Exemple guidé 2

```javascript
const r = await fetch("/api-pedagogique/v1/inscriptions", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({atelierId:3,nom:"Lina"})});
const corps = await r.json();
if (r.ok) {
  console.log("Confirmation fictive pour " + corps.nom);
} else {
  console.log("Demande refusée : " + corps.erreur);
}
console.log("Aucune réservation réelle.");
```

