---
{
  "id": "pfs-m1-02",
  "title_fr": "Le modèle de données",
  "course": "projet-fullstack",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "pfs-m1-01"
  ],
  "outcomes": [
    "Ranger les données de l’application dans un module avec des fonctions d’accès.",
    "Valider les données avant de les enregistrer et renvoyer des erreurs lisibles."
  ],
  "idea_fr": "Les données vivent derrière quelques fonctions : lister, trouver, valider, ajouter. Le reste de l’application ne touche jamais directement au tableau.",
  "analogy_fr": "Dans une pharmacie, le client ne fouille pas les tiroirs : il demande au comptoir, et le pharmacien vérifie l’ordonnance avant de délivrer.",
  "examples": [
    {
      "code": "const produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction lister() {\n  return produits.map(p => ({ ...p }));\n}\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nfunction valider(d) {\n  const erreurs = [];\n  const nom = typeof d.nom === \"string\" ? d.nom.trim() : \"\";\n  if (nom.length < 2 || nom.length > 40) erreurs.push(\"Le nom doit contenir 2 à 40 caractères.\");\n  const prix = Number(d.prix);\n  if (d.prix === undefined || d.prix === \"\" || !Number.isInteger(prix) || prix <= 0) erreurs.push(\"Le prix doit être un nombre entier positif.\");\n  return erreurs;\n}\n\nfunction ajouter(d) {\n  const erreurs = valider(d);\n  if (erreurs.length) return { ok: false, erreurs };\n  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };\n  produits.push(produit);\n  return { ok: true, produit };\n}\n\nconsole.log(lister().length, trouver(2).nom, trouver(9));\nconsole.log(ajouter({ nom: \"Mangue\", prix: \"300\" }));\nconsole.log(ajouter({ nom: \"\", prix: \"abc\" }).erreurs.length);",
      "expected_output": "3 Huile de palme undefined\n{ ok: true, produit: { id: 4, nom: 'Mangue', prix: 300 } }\n2\n",
      "inputs": [],
      "trace_fr": [
        "trouver renvoie undefined pour un identifiant inconnu.",
        "Le prix venu d’un formulaire est un texte, converti en nombre.",
        "Deux erreurs sont renvoyées pour une saisie vide et absurde."
      ]
    },
    {
      "code": "const produits = [\n  { id: 1, nom: \"Riz parfumé\", prix: 600 },\n  { id: 2, nom: \"Huile de palme\", prix: 1500 },\n  { id: 3, nom: \"Gari\", prix: 400 },\n];\nlet prochainId = 4;\n\nfunction trouver(id) {\n  const p = produits.find(x => x.id === id);\n  return p ? { ...p } : undefined;\n}\n\nconst copie = trouver(1);\ncopie.prix = 1;\nconsole.log(trouver(1).prix);",
      "expected_output": "600\n",
      "inputs": [],
      "trace_fr": [
        "trouver renvoie une copie.",
        "Modifier la copie ne touche pas le produit enregistré.",
        "Le prix reste 600."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Manipuler le tableau directement partout",
      "why_fr": "Changer de stockage oblige à tout réécrire.",
      "fix_fr": "Passe par des fonctions d’accès."
    },
    {
      "error": "Identifiant = longueur du tableau",
      "why_fr": "Doublons après une suppression.",
      "fix_fr": "Utilise un compteur qui ne fait qu’augmenter."
    },
    {
      "error": "Valider à deux endroits différents",
      "why_fr": "Les règles divergent entre formulaire et API.",
      "fix_fr": "Une seule fonction valider."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi renvoyer des copies des produits ?",
      "options": [
        "Pour la vitesse",
        "Pour qu’une modification accidentelle ne touche pas les données enregistrées",
        "C’est obligatoire",
        "Pour économiser la mémoire"
      ],
      "answer": 1,
      "explanation": "Protection contre les effets de bord.",
      "id": "pfs-m1-02-q1"
    },
    {
      "question": "Que renvoie ajouter en cas d’erreur de saisie ?",
      "options": [
        "Une exception",
        "{ ok: false, erreurs }",
        "null",
        "Le produit"
      ],
      "answer": 1,
      "explanation": "Les erreurs de saisie sont attendues.",
      "id": "pfs-m1-02-q2"
    },
    {
      "question": "Pourquoi un compteur pour les identifiants ?",
      "options": [
        "C’est plus court",
        "Pour ne jamais réutiliser un identifiant",
        "Pour trier",
        "Pour la sécurité"
      ],
      "answer": 1,
      "explanation": "Pas de doublons après suppression.",
      "id": "pfs-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "modèle de données",
      "definition": "Description des données conservées et de leurs règles."
    },
    {
      "term": "fonction d’accès",
      "definition": "Fonction qui lit ou modifie les données à la place du reste du code."
    },
    {
      "term": "validation",
      "definition": "Vérification des données avant enregistrement."
    },
    {
      "term": "identifiant",
      "definition": "Valeur unique qui désigne un enregistrement."
    }
  ],
  "recap_fr": [
    "Ranger les données de l’application dans un module avec des fonctions d’accès.",
    "Valider les données avant de les enregistrer et renvoyer des erreurs lisibles.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "modèle de données",
    "fonction d’accès",
    "validation",
    "identifiant"
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
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html"
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    }
  ],
  "sources": [
    {
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html",
      "scope": "require, module.exports et organisation en fichiers. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Le modèle de données décrit ce que l’application conserve et comment on y accède. Pour le Marché de Bè, un produit a un identifiant, un nom et un prix en francs CFA. Dans ce projet, les produits sont gardés dans un tableau en mémoire ; une vraie application utiliserait une base de données, comme dans le cours SQL, mais l’organisation du code serait la même.

La règle principale : le reste de l’application ne manipule jamais le tableau directement. Il passe par des fonctions d’accès. lister() renvoie la liste, trouver(id) un produit ou undefined, ajouter(donnees) crée un produit. Ce point de passage unique permet de changer plus tard la façon de stocker les données, par exemple passer à une base, sans toucher aux pages ni à l’API.

Ces fonctions renvoient des copies des produits, créées avec la syntaxe de décomposition { ...p }. Ainsi, un code qui modifie l’objet reçu, par erreur, ne modifie pas le produit enregistré. C’est une protection simple contre une classe entière de bugs difficiles à trouver.

La validation est le deuxième pilier. Les données arrivent d’un formulaire ou d’une API : ce sont des textes, parfois vides, parfois absurdes. valider(donnees) renvoie la liste des erreurs, en français, prêtes à être affichées : « Le nom doit contenir 2 à 40 caractères », « Le prix doit être un nombre entier positif ». Une liste vide signifie que tout est correct. Cette fonction sert à la fois au formulaire HTML et à l’API : la règle n’est écrite qu’une fois.

ajouter(donnees) appelle valider. En cas d’erreur, elle renvoie { ok: false, erreurs } et n’enregistre rien. Sinon, elle crée le produit avec un nouvel identifiant et renvoie { ok: true, produit }. Ce format de résultat, plutôt qu’une exception, convient bien aux erreurs de saisie, qui sont attendues et normales.

Les identifiants viennent d’un compteur, prochainId, qui ne fait qu’augmenter. Calculer l’identifiant à partir de la longueur du tableau est une erreur classique : après une suppression, deux produits pourraient recevoir le même identifiant, et un lien vers l’un afficherait l’autre.

Ce module de données sera réutilisé tel quel dans les leçons suivantes. Garder ses fonctions courtes et prévisibles rend tout le reste du projet plus simple.

## Exemple guidé 1

```javascript
const produits = [
  { id: 1, nom: "Riz parfumé", prix: 600 },
  { id: 2, nom: "Huile de palme", prix: 1500 },
  { id: 3, nom: "Gari", prix: 400 },
];
let prochainId = 4;

function lister() {
  return produits.map(p => ({ ...p }));
}

function trouver(id) {
  const p = produits.find(x => x.id === id);
  return p ? { ...p } : undefined;
}

function valider(d) {
  const erreurs = [];
  const nom = typeof d.nom === "string" ? d.nom.trim() : "";
  if (nom.length < 2 || nom.length > 40) erreurs.push("Le nom doit contenir 2 à 40 caractères.");
  const prix = Number(d.prix);
  if (d.prix === undefined || d.prix === "" || !Number.isInteger(prix) || prix <= 0) erreurs.push("Le prix doit être un nombre entier positif.");
  return erreurs;
}

function ajouter(d) {
  const erreurs = valider(d);
  if (erreurs.length) return { ok: false, erreurs };
  const produit = { id: prochainId++, nom: d.nom.trim(), prix: Number(d.prix) };
  produits.push(produit);
  return { ok: true, produit };
}

console.log(lister().length, trouver(2).nom, trouver(9));
console.log(ajouter({ nom: "Mangue", prix: "300" }));
console.log(ajouter({ nom: "", prix: "abc" }).erreurs.length);
```

Affichage attendu :

    3 Huile de palme undefined
    { ok: true, produit: { id: 4, nom: 'Mangue', prix: 300 } }
    2

Trace :

- trouver renvoie undefined pour un identifiant inconnu.
- Le prix venu d’un formulaire est un texte, converti en nombre.
- Deux erreurs sont renvoyées pour une saisie vide et absurde.

## Exemple guidé 2

```javascript
const produits = [
  { id: 1, nom: "Riz parfumé", prix: 600 },
  { id: 2, nom: "Huile de palme", prix: 1500 },
  { id: 3, nom: "Gari", prix: 400 },
];
let prochainId = 4;

function trouver(id) {
  const p = produits.find(x => x.id === id);
  return p ? { ...p } : undefined;
}

const copie = trouver(1);
copie.prix = 1;
console.log(trouver(1).prix);
```

Affichage attendu :

    600

Trace :

- trouver renvoie une copie.
- Modifier la copie ne touche pas le produit enregistré.
- Le prix reste 600.

## Vérifier et expliquer

Liste les données d’une petite application d’inscription à un club et les règles de validation de chacune.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — modules CommonJS](https://nodejs.org/docs/latest-v20.x/api/modules.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
