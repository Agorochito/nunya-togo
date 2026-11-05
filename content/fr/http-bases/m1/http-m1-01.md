---
{
  "id": "http-m1-01",
  "title_fr": "Distinguer la requête, la réponse et son texte",
  "course": "http-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Distinguer requête, réponse et corps.",
    "Lire un texte et une métadonnée de réponse."
  ],
  "idea_fr": "Une requête demande une ressource ; une réponse fournit des métadonnées et un corps à lire.",
  "analogy_fr": "Une demande au bureau d’un club et le document remis en réponse restent deux objets différents.",
  "common_mistakes": [
    {
      "error": "Réponse traitée comme une chaîne",
      "why_fr": "L’objet Response est utilisé à la place de son corps.",
      "fix_fr": "Lis le contenu avec la méthode adaptée."
    },
    {
      "error": "Méthode non appelée",
      "why_fr": "text est lu sans parenthèses.",
      "fix_fr": "Appelle text() puis attends son résultat."
    },
    {
      "error": "Phrase connue prise pour requête",
      "why_fr": "Un texte est affiché sans l’échange attendu.",
      "fix_fr": "Vérifie la requête observée et les valeurs reçues."
    }
  ],
  "quiz": [
    {
      "question": "Que contient la variable reponse après await fetch ?",
      "options": [
        "Forcément le texte complet de la route.",
        "Un élément du DOM.",
        "Un objet réponse avec métadonnées et accès au corps."
      ],
      "answer": 2,
      "explanation": "Il faut choisir ensuite comment lire le corps.",
      "id": "http-m1-01-q1"
    },
    {
      "question": "Quelle expression lit le corps comme une chaîne ?",
      "options": [
        "await reponse.text()",
        "reponse.text",
        "reponse.status"
      ],
      "answer": 0,
      "explanation": "text() doit être appelée et son résultat attendu.",
      "id": "http-m1-01-q2"
    },
    {
      "question": "Pourquoi l’API de cet atelier peut-elle fonctionner hors ligne après téléchargement ?",
      "options": [
        "Toutes les API distantes sont copiées automatiquement.",
        "Elle est fournie localement par le service worker de Nunya.",
        "fetch n’utilise jamais de réseau."
      ],
      "answer": 1,
      "explanation": "Il s’agit d’une propriété de ce dispositif local, pas d’une garantie générale de fetch.",
      "id": "http-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "requête",
      "definition": "Demande adressée à un service selon une méthode et un chemin."
    },
    {
      "term": "réponse",
      "definition": "Objet décrivant le résultat HTTP et donnant accès au corps."
    },
    {
      "term": "en-tête",
      "definition": "Métadonnée nommée de la requête ou de la réponse."
    },
    {
      "term": "corps",
      "definition": "Contenu transmis dans un échange."
    }
  ],
  "recap_fr": [
    "Distinguer requête, réponse et corps.",
    "Lire un texte et une métadonnée de réponse.",
    "Présenter honnêtement les limites de l’API locale."
  ],
  "tags": [
    "requête",
    "réponse",
    "en-tête",
    "corps"
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
      "title": "WHATWG — Fetch Standard",
      "url": "https://fetch.spec.whatwg.org/",
      "scope": "Référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "inputs": [],
      "expected_output": "Bonjour depuis l’API locale.",
      "trace_fr": [
        "Ligne 1 : GET demande la route locale /texte et attend son objet réponse.",
        "Ligne 2 : text() lit le corps et fournit la chaîne avec son retour final.",
        "Ligne 3 : trim prépare seulement l’affichage, puis console.log montre la phrase."
      ]
    },
    {
      "inputs": [],
      "expected_output": "200\nlocale-v1",
      "trace_fr": [
        "Ligne 1 : une vraie réponse de l’API locale est obtenue.",
        "Ligne 2 : la propriété status fournit le nombre 200.",
        "Ligne 3 : la lecture d’un en-tête fournit locale-v1 ; le corps n’a pas été lu ici."
      ]
    }
  ]
}
---

## Explication pas à pas

Une API est une interface qui propose des opérations selon un contrat. Le programme client prépare une demande ; un service y répond. HTTP organise cet échange en requête et réponse. La requête indique notamment une adresse et une méthode. Dans cette première leçon, nous utilisons GET pour demander une lecture. Nous n’envoyons aucun formulaire et ne créons aucune inscription.

Le laboratoire possède une API pédagogique locale sous le préfixe /api-pedagogique/v1/. Le chemin /texte fournit une courte phrase et /ping permet de vérifier une réponse du service. Ces adresses restent sur la même origine que Nunya. Les requêtes vers les autres destinations sont refusées par l’atelier. Les données sont fictives et aucun serveur distant n’est contacté par les exemples.

fetch lance la requête. Pour lire sa réponse dans l’ordre, nous écrivons const reponse = await fetch(adresse). await indique ici que la suite doit disposer du résultat attendu avant de l’utiliser. Le mécanisme des promesses sera détaillé dans la leçon suivante. Pour commencer, conserve ce squelette : obtenir la réponse, puis lire ce qu’elle contient au lieu de deviner le résultat.

La réponse est un objet, pas directement le texte demandé. Sa propriété status contient un code numérique. Ses en-têtes, accessibles avec headers.get, décrivent des informations comme le type du contenu ou l’identifiant pédagogique du service. Le nom d’un en-tête est distinct de sa valeur. Un en-tête présent ne prouve pas à lui seul la qualité des données ; il fait partie de la description de la réponse.

Le corps est le contenu transmis. Pour cette route textuelle, await reponse.text() lit le corps sous forme de chaîne. Il faut bien les parenthèses de l’appel : reponse.text désigne la méthode, pas son résultat. Le texte annoncé contient un retour à la ligne final. Nous conservons ce texte exact dans les données et utilisons éventuellement trim pour une présentation sur une seule ligne. Nettoyer l’affichage ne change pas ce qui a été reçu.

Il existe plusieurs codes de réponse. Nous pouvons déjà observer leur nombre sans leur attribuer la même signification. Le module suivant expliquera les succès, les ressources absentes et les indisponibilités. Dans cette leçon, obtenir un objet réponse et lire un corps sont deux étapes différentes ; ni l’une ni l’autre ne garantit encore que toutes les conditions du besoin sont satisfaites.

L’API locale est fournie par le service worker du site et peut fonctionner hors ligne une fois téléchargée. Cela ne signifie pas que toutes les API du Web sont disponibles sans connexion. Ici, aucune écriture n’est conservée entre requêtes et aucune réservation réelle n’existe. Pour vérifier un exercice, les tests contrôlent les valeurs obtenues et la requête réellement observée : afficher simplement la phrase connue ne remplace pas l’échange demandé.

## Exemple guidé 1

```javascript
const reponse = await fetch("/api-pedagogique/v1/texte");
const texte = await reponse.text();
console.log(texte.trim());
```

Résultat attendu :

```text
Bonjour depuis l’API locale.
```

Trace :

- Ligne 1 : GET demande la route locale /texte et attend son objet réponse.
- Ligne 2 : text() lit le corps et fournit la chaîne avec son retour final.
- Ligne 3 : trim prépare seulement l’affichage, puis console.log montre la phrase.

## Exemple guidé 2

```javascript
const reponse = await fetch("/api-pedagogique/v1/texte");
console.log(reponse.status);
console.log(reponse.headers.get("X-Nunya-Api"));
```

Résultat attendu :

```text
200
locale-v1
```

Trace :

- Ligne 1 : une vraie réponse de l’API locale est obtenue.
- Ligne 2 : la propriété status fournit le nombre 200.
- Ligne 3 : la lecture d’un en-tête fournit locale-v1 ; le corps n’a pas été lu ici.

