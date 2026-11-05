---
{
  "id": "http-m3-03",
  "title_fr": "Utiliser PUT et DELETE sans inventer une persistance",
  "course": "http-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "http-m3-02"
  ],
  "outcomes": [
    "Employer PUT et DELETE selon leurs contrats de réponse.",
    "Traiter un succès sans corps."
  ],
  "idea_fr": "La méthode décrit l’intention ; le contrat de l’API précise le résultat et ce qui est réellement conservé.",
  "analogy_fr": "Un brouillon de démonstration peut être vérifié et renvoyé comme un écho, sans devenir un dossier enregistré.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "Club fictif\n0",
      "trace_fr": [
        "PUT transporte un objet de brouillon valide.",
        "La réponse 200 contient le titre sans espaces extérieurs.",
        "La valeur zéro est acceptée dans la borne annoncée.",
        "Le résultat est un écho validé, sans stockage."
      ]
    },
    {
      "inputs": [],
      "expected_output": "204\ntrue",
      "trace_fr": [
        "La méthode choisit la réponse de suppression pédagogique.",
        "Le statut vaut 204 et le corps est vide.",
        "text() peut observer ce vide ; json() ne convient pas.",
        "Aucun brouillon réel n’était conservé par ce service local."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Analyser tous les corps en JSON",
      "why_fr": "Le contrat du statut 204 est ignoré.",
      "fix_fr": "Traite explicitement l’absence de corps."
    },
    {
      "error": "Inventer un stockage",
      "why_fr": "Un écho est pris pour une ressource durable.",
      "fix_fr": "Décris uniquement la persistance promise par le contrat."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi éviter json() après ce DELETE 204 ?",
      "options": [
        "DELETE interdit toute réponse HTTP.",
        "Le corps est vide et n’est pas un document JSON.",
        "Le statut est forcément une panne réseau."
      ],
      "answer": 1,
      "explanation": "Le choix du lecteur doit respecter le contrat du corps.",
      "id": "http-m3-03-q1"
    },
    {
      "question": "Que conserve PUT brouillon dans cette API ?",
      "options": [
        "Un document durable dans une base cachée.",
        "Une inscription réelle.",
        "Aucune écriture entre requêtes ; il renvoie un écho validé."
      ],
      "answer": 2,
      "explanation": "La méthode ne permet pas de déduire une persistance que le contrat exclut.",
      "id": "http-m3-03-q2"
    },
    {
      "question": "Pourquoi ne pas transposer les places inchangées à une API réelle ?",
      "options": [
        "Ce résultat dépend de la limite explicite du service pédagogique.",
        "Tous les POST sont toujours sans effet.",
        "Toute API partage automatiquement les mêmes données."
      ],
      "answer": 0,
      "explanation": "La démonstration locale n’énonce pas le comportement de tous les services.",
      "id": "http-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "PUT",
      "definition": "Méthode utilisée ici pour envoyer un brouillon complet à valider."
    },
    {
      "term": "204",
      "definition": "Statut de succès sans corps dans cette route."
    },
    {
      "term": "persistance",
      "definition": "Conservation d’une donnée au-delà de l’opération courante."
    }
  ],
  "recap_fr": [
    "Employer PUT et DELETE selon leurs contrats de réponse.",
    "Traiter un succès sans corps.",
    "Distinguer méthode HTTP et persistance du service."
  ],
  "tags": [
    "PUT",
    "204",
    "persistance"
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
      "title": "IETF — RFC 9110, méthodes idempotentes",
      "url": "https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2",
      "scope": "Référence normative vérifiée ; explication originale Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Une application réelle peut proposer la création, le remplacement et la suppression de ressources. Les méthodes HTTP expriment des intentions, mais elles ne disent pas à elles seules quelle base de données existe ni combien de temps les valeurs sont gardées. Notre route brouillon est volontairement limitée : PUT vérifie un objet et en renvoie une version nettoyée ; DELETE renvoie un succès sans contenu. Aucun brouillon n’est stocké entre ces requêtes.

Pour PUT brouillon, le corps doit être du JSON contenant titre et places. Le titre est un texte de un à soixante caractères après trim. places est un entier de zéro à vingt inclus. Le zéro est valide : il ne doit pas être confondu avec une propriété manquante. Un objet accepté revient avec ses valeurs nettoyées. Les mêmes catégories de format, syntaxe et validation que précédemment peuvent produire 415, 400 ou 422. Les exercices commencent par des valeurs valides, puis testent les bornes annoncées.

DELETE brouillon renvoie ici 204. Ce statut indique une réponse sans corps : appeler json() sur ce contenu vide demanderait une analyse impossible. Selon le contrat, tu peux simplement examiner le statut, ou lire text() pour observer une chaîne vide. La lecture du corps doit donc être choisie après avoir compris le statut et le format attendus. Une méthode différente ne signifie pas que toutes les réponses contiennent automatiquement un objet JSON.

PUT et DELETE sont généralement définies comme des méthodes idempotentes au niveau de leur effet attendu : répéter la même demande doit viser le même état final, sans exiger que chaque réponse soit identique dans tout service. Dans notre laboratoire, l’absence de stockage rend les réponses particulièrement simples. Cela ne prouve pas qu’une API extérieure partage cette limitation. POST n’offre pas en général cette garantie ; le répéter sur un vrai service peut produire plusieurs créations.

Les activités observent des requêtes réelles et des valeurs reçues, sans prétendre exercer une base de données cachée. Pour vérifier la limite de l’inscription, un client lit les places, reçoit une confirmation fictive, puis relit le catalogue : les places restent inchangées selon le contrat local. Ce test décrit l’atelier, pas une anomalie à corriger en écrivant une variable globale. Termine en séparant trois affirmations : l’opération demandée, la réponse observée et la persistance réellement promise. Cette distinction évite de présenter une démonstration de protocole comme une réservation ou une suppression réelle.

## Exemple guidé 1

```javascript
const r = await fetch("/api-pedagogique/v1/brouillon", {
  method:"PUT", headers:{"Content-Type":"application/json"},
  body:JSON.stringify({titre:" Club fictif ", places:0})
});
const brouillon = await r.json();
console.log(brouillon.titre);
console.log(brouillon.places);
```

## Exemple guidé 2

```javascript
const r = await fetch("/api-pedagogique/v1/brouillon", {method:"DELETE"});
const texte = await r.text();
console.log(r.status);
console.log(texte === "");
```

