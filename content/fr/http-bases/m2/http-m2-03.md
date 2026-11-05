---
{
  "id": "http-m2-03",
  "title_fr": "Construire des fonctions clientes et transformer les données",
  "course": "http-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "http-m2-02"
  ],
  "outcomes": [
    "Définir une fonction cliente au contrat explicite.",
    "Transformer sans confondre somme, comptage et sélection."
  ],
  "idea_fr": "Une fonction cliente relie une requête explicite à une valeur de retour utile et vérifiable.",
  "analogy_fr": "Le relevé reçu d’un club peut devenir un total ou une liste de titres, sans changer le document d’origine.",
  "common_mistakes": [
    {
      "error": "Comptage pris pour somme",
      "why_fr": "length est retourné à la place du total de places.",
      "fix_fr": "Relie le calcul à la question du besoin."
    },
    {
      "error": "Zéro accepté comme disponible",
      "why_fr": "Le test inclut la borne qui devait être exclue.",
      "fix_fr": "Vérifie le cas de Jardin et le signe strict."
    },
    {
      "error": "Réponse brute retournée",
      "why_fr": "La fonction ne construit pas les propriétés annoncées.",
      "fix_fr": "Crée la forme prévue par le contrat."
    }
  ],
  "quiz": [
    {
      "question": "Que précise le contrat d’une fonction cliente ?",
      "options": [
        "Uniquement son nombre de lignes.",
        "Les entrées prévues et la forme de la valeur retournée.",
        "Le nom d’un service qu’elle ne contacte pas."
      ],
      "answer": 1,
      "explanation": "Le contrat relie demande, traitement et résultat.",
      "id": "http-m2-03-q1"
    },
    {
      "question": "Que donne la somme de places pour un tableau vide avec total initialisé à 0 ?",
      "options": [
        "Le nombre de propriétés du service.",
        "Une réservation automatique.",
        "0."
      ],
      "answer": 2,
      "explanation": "Aucun passage ne modifie l’accumulateur initial.",
      "id": "http-m2-03-q2"
    },
    {
      "question": "Pourquoi construire un nouvel objet de résumé ?",
      "options": [
        "Pour distinguer données reçues et forme calculée pour le besoin.",
        "Pour supprimer obligatoirement les propriétés de la réponse initiale.",
        "Pour transformer chaque réponse en chaîne."
      ],
      "answer": 0,
      "explanation": "Le client peut produire une autre forme sans modifier l’objet reçu.",
      "id": "http-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction cliente",
      "definition": "Fonction qui formule une demande et retourne un résultat défini pour son appelant."
    },
    {
      "term": "transformation",
      "definition": "Calcul d’une nouvelle forme à partir des données reçues."
    },
    {
      "term": "contrat de retour",
      "definition": "Description de la valeur que la fonction doit fournir."
    }
  ],
  "recap_fr": [
    "Définir une fonction cliente au contrat explicite.",
    "Transformer sans confondre somme, comptage et sélection.",
    "Vérifier les valeurs structurées et les requêtes locales."
  ],
  "tags": [
    "fonction cliente",
    "transformation",
    "contrat de retour"
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
      "title": "MDN — URLSearchParams",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams",
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
      "expected_output": "2\nPython",
      "trace_fr": [
        "La fonction prépare la recherche réelle de Lomé.",
        "La lecture JSON fournit Python avec quatre places puis Web avec deux places.",
        "Les deux fiches passent le test strict et leurs titres sont ajoutés dans l’ordre.",
        "La valeur retournée est un tableau ; l’appelant affiche sa longueur puis son premier titre."
      ]
    },
    {
      "inputs": [],
      "expected_output": "0",
      "trace_fr": [
        "La recherche de Kara fournit la fiche Jardin.",
        "Le total commence à zéro et ajoute les zéro places de cette fiche.",
        "La fonction retourne le nombre zéro, ce qui ne signifie pas que la fiche est absente.",
        "L’appelant attend ce nombre puis l’affiche."
      ]
    }
  ]
}
---

## Explication pas à pas

Une fonction cliente regroupe les étapes nécessaires à un besoin : préparer une demande, attendre la réponse, lire son contenu puis retourner une valeur choisie. Elle ne doit pas seulement porter un nom pratique. Son contrat précise les paramètres acceptés, les situations prévues et la forme du résultat. Par exemple, titresDisponibles(ville) promet une liste de titres pour les fiches de cette ville dont les places sont strictement positives.

Le filtre de ville appartient à la requête dans ces exercices. Il doit donc être transmis au service avec URLSearchParams, même si les données fictives sont connues. Le client lit ensuite le tableau renvoyé et applique une autre règle locale. Cette séparation rend visibles deux décisions : quelle collection a été demandée et quelle transformation a été réalisée sur cette collection.

Une transformation peut sélectionner des éléments, additionner une propriété ou construire de nouvelles fiches résumées. Pour une somme de places, commence total à zéro et ajoute atelier.places à chaque passage. Pour compter des ateliers, ajoute un par atelier concerné. Les deux résultats ne répondent pas à la même question : deux fiches peuvent représenter six places. Choisis le calcul correspondant au besoin annoncé.

Pour produire des fiches de présentation, crée de nouveaux objets avec les propriétés nécessaires. Un résumé {id,titre,disponible} peut conserver l’identifiant et le titre tout en calculant un booléen depuis places > 0. Il n’est pas nécessaire d’effacer ville ou places dans les objets reçus. Préserver les données d’origine rend plus clair ce qui vient du service et ce qui résulte d’une décision du client.

Une liste vide reste une réponse de collection cohérente dans ce contrat. La somme initiale reste zéro et un tableau résultat reste vide. L’atelier Jardin existe pourtant avec zéro place ; ne confonds pas son existence avec sa disponibilité. Un test strict places > 0 le refuse pour une sélection disponible, tandis que places >= 0 le conserverait à tort dans cette sélection. Cette frontière mérite son propre cas de vérification.

Les routes de collection utilisées ici répondent avec un succès pour les paramètres prévus. Les fonctions de cette leçon sont délimitées à ce contrat ; elles ne garantissent pas la validité de toute API possible. Le traitement des réponses inattendues, des erreurs de lecture et des annulations sera développé plus tard. Ne présente pas une petite fonction comme un client de production complet.

Les tests appellent les fonctions avec plusieurs villes et comparent des tableaux, objets ou nombres. Ils contrôlent aussi la requête réelle et ses paramètres. Le simple affichage d’un résultat attendu ne suffit donc pas. Comme l’API locale ne conserve aucune écriture entre requêtes, ces calculs ne modifient aucune réservation réelle. Termine en expliquant la forme retournée et la règle qui transforme les données, plutôt qu’en annonçant seulement que le code a fonctionné.

## Exemple guidé 1

```javascript
async function titresDisponibles(ville) {
  const p = new URLSearchParams();
  p.set("ville", ville);
  const r = await fetch("/api-pedagogique/v1/ateliers?" + p.toString());
  const ateliers = await r.json();
  const titres = [];
  for (const atelier of ateliers) {
    if (atelier.places > 0) { titres.push(atelier.titre); }
  }
  return titres;
}
const titres = await titresDisponibles("Lomé");
console.log(titres.length);
console.log(titres[0]);
```

Résultat attendu :

```text
2
Python
```

Trace :

- La fonction prépare la recherche réelle de Lomé.
- La lecture JSON fournit Python avec quatre places puis Web avec deux places.
- Les deux fiches passent le test strict et leurs titres sont ajoutés dans l’ordre.
- La valeur retournée est un tableau ; l’appelant affiche sa longueur puis son premier titre.

## Exemple guidé 2

```javascript
async function totalPlaces(ville) {
  const p = new URLSearchParams();
  p.set("ville", ville);
  const r = await fetch("/api-pedagogique/v1/ateliers?" + p.toString());
  const ateliers = await r.json();
  let total = 0;
  for (const atelier of ateliers) { total = total + atelier.places; }
  return total;
}
console.log(await totalPlaces("Kara"));
```

Résultat attendu :

```text
0
```

Trace :

- La recherche de Kara fournit la fiche Jardin.
- Le total commence à zéro et ajoute les zéro places de cette fiche.
- La fonction retourne le nombre zéro, ce qui ne signifie pas que la fiche est absente.
- L’appelant attend ce nombre puis l’affiche.

