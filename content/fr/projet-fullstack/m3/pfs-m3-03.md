---
{
  "id": "pfs-m3-03",
  "title_fr": "Pagination et tri",
  "course": "projet-fullstack",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "pfs-m3-02"
  ],
  "outcomes": [
    "Découper une longue liste en pages et la trier selon un paramètre.",
    "Borner les paramètres reçus pour qu’aucune valeur ne dérègle le serveur."
  ],
  "idea_fr": "Une liste longue se sert par pages ; chaque paramètre reçu est converti et ramené dans des limites raisonnables avant d’être utilisé.",
  "analogy_fr": "Un catalogue papier est découpé en pages numérotées, avec un sommaire. Personne n’imprime mille produits sur une seule feuille.",
  "examples": [
    {
      "code": "function paginer(liste, options) {\n  const tri = options.tri === \"prix\" ? \"prix\" : \"nom\";\n  const t = Number.parseInt(options.taille, 10);\n  const taille = Math.min(Math.max(Number.isNaN(t) ? 10 : t, 1), 50);\n  const triee = [...liste].sort((a, b) => tri === \"prix\" ? a.prix - b.prix : a.nom.localeCompare(b.nom, \"fr\"));\n  const pages = Math.max(1, Math.ceil(triee.length / taille));\n  const n = Number.parseInt(options.page, 10);\n  const page = Math.min(Math.max(Number.isNaN(n) ? 1 : n, 1), pages);\n  return { page, pages, total: triee.length, produits: triee.slice((page - 1) * taille, page * taille) };\n}\n\nconst liste = [{ nom: \"Riz\", prix: 600 }, { nom: \"Gari\", prix: 400 }, { nom: \"Huile\", prix: 1500 }];\nconsole.log(paginer(liste, { page: \"1\", taille: \"2\", tri: \"prix\" }));",
      "expected_output": "{\n  page: 1,\n  pages: 2,\n  total: 3,\n  produits: [ { nom: 'Gari', prix: 400 }, { nom: 'Riz', prix: 600 } ]\n}\n",
      "inputs": [],
      "trace_fr": [
        "La liste est triée par prix croissant.",
        "Deux produits par page : deux pages.",
        "La première page contient les deux moins chers."
      ]
    },
    {
      "code": "function paginer(liste, options) {\n  const tri = options.tri === \"prix\" ? \"prix\" : \"nom\";\n  const t = Number.parseInt(options.taille, 10);\n  const taille = Math.min(Math.max(Number.isNaN(t) ? 10 : t, 1), 50);\n  const triee = [...liste].sort((a, b) => tri === \"prix\" ? a.prix - b.prix : a.nom.localeCompare(b.nom, \"fr\"));\n  const pages = Math.max(1, Math.ceil(triee.length / taille));\n  const n = Number.parseInt(options.page, 10);\n  const page = Math.min(Math.max(Number.isNaN(n) ? 1 : n, 1), pages);\n  return { page, pages, total: triee.length, produits: triee.slice((page - 1) * taille, page * taille) };\n}\n\nconst liste = [{ nom: \"Riz\", prix: 600 }, { nom: \"Gari\", prix: 400 }];\nconst r = paginer(liste, { page: \"-3\", taille: \"1000000\", tri: \"constructor\" });\nconsole.log(r.page, r.pages, r.produits.map(p => p.nom));",
      "expected_output": "1 1 [ 'Gari', 'Riz' ]\n",
      "inputs": [],
      "trace_fr": [
        "Une page négative est ramenée à 1.",
        "Une taille démesurée est bornée à 50.",
        "Un tri inconnu revient au tri par nom."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser les paramètres sans les borner",
      "why_fr": "Une seule requête peut surcharger le serveur.",
      "fix_fr": "Borne taille et page."
    },
    {
      "error": "Trier la liste d’origine",
      "why_fr": "Les données changent d’ordre pour tout le monde.",
      "fix_fr": "Trie une copie."
    },
    {
      "error": "Découper avant de filtrer",
      "why_fr": "Des pages incomplètes.",
      "fix_fr": "Filtre, trie, puis découpe."
    }
  ],
  "quiz": [
    {
      "question": "Avec taille = 10, quels indices pour la page 3 ?",
      "options": [
        "10 à 20",
        "20 à 30 exclu",
        "30 à 40",
        "0 à 10"
      ],
      "answer": 1,
      "explanation": "slice(20, 30).",
      "id": "pfs-m3-03-q1"
    },
    {
      "question": "Que faire de taille=1000000 ?",
      "options": [
        "L’accepter",
        "La borner, par exemple à 50",
        "Planter",
        "L’ignorer et renvoyer 404"
      ],
      "answer": 1,
      "explanation": "Protection contre les abus.",
      "id": "pfs-m3-03-q2"
    },
    {
      "question": "Dans quel ordre combiner recherche, tri et pagination ?",
      "options": [
        "Découper, trier, filtrer",
        "Filtrer, trier, découper",
        "Trier, découper, filtrer",
        "Peu importe"
      ],
      "answer": 1,
      "explanation": "Sinon les pages sont incomplètes.",
      "id": "pfs-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "pagination",
      "definition": "Découpage d’une liste en pages."
    },
    {
      "term": "borne",
      "definition": "Limite minimale ou maximale imposée à une valeur."
    },
    {
      "term": "valeur par défaut",
      "definition": "Valeur utilisée quand le paramètre manque ou est invalide."
    },
    {
      "term": "liste d’autorisation",
      "definition": "Ensemble des seules valeurs acceptées."
    }
  ],
  "recap_fr": [
    "Découper une longue liste en pages et la trier selon un paramètre.",
    "Borner les paramètres reçus pour qu’aucune valeur ne dérègle le serveur.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "pagination",
    "borne",
    "valeur par défaut",
    "liste d’autorisation"
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
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html"
    },
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    }
  ],
  "sources": [
    {
      "title": "Node.js — URL",
      "url": "https://nodejs.org/docs/latest-v20.x/api/url.html",
      "scope": "Analyser une adresse et ses paramètres. Texte, exemples et exercices originaux Nunya.",
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

Avec trois produits, renvoyer toute la liste ne pose aucun problème. Avec trois mille, la page deviendrait lourde, lente à charger sur un téléphone, et le serveur travaillerait pour rien. On découpe donc les résultats en pages : /api/produits?page=2&taille=10 renvoie les produits 11 à 20.

Le calcul est simple. Les éléments de la page n vont de l’indice (n − 1) × taille inclus à n × taille exclu : slice((page − 1) * taille, page * taille). Le nombre total de pages vaut Math.ceil(total / taille), au moins 1 pour une liste vide. La réponse indique ces informations, page, pages et total, pour que le client puisse afficher « page 2 sur 5 » et des boutons précédent et suivant.

Le tri se choisit aussi par paramètre : tri=prix trie par prix croissant, et tout autre valeur, ou l’absence de valeur, par nom. Le tri par nom utilise localeCompare avec la langue française, qui range correctement les accents. On trie une copie de la liste, avec [...liste], pour ne pas modifier les données.

Le point essentiel est la défense contre les paramètres absurdes. Un client peut envoyer page=-3, taille=1000000, page=abc ou rien du tout. Chaque paramètre est converti avec Number.parseInt, remplacé par une valeur par défaut s’il n’est pas un nombre, puis borné : la taille entre 1 et 50, la page entre 1 et le nombre de pages. Sans cette borne, une seule requête avec taille=1000000 pourrait obliger le serveur à produire une réponse énorme ; répétée, elle le ferait tomber. Borner les paramètres est une protection simple contre ce genre d’abus.

Le tri, lui, n’accepte que des valeurs prévues : une liste d’autorisation, comme pour les noms de fichiers dans le cours Node.js. On n’utilise jamais directement un texte reçu comme nom de propriété ou de colonne.

La pagination se combine avec la recherche : on filtre d’abord, puis on trie, puis on découpe. L’ordre compte : découper avant de filtrer donnerait des pages incomplètes.

Dans les vraies applications, la pagination se fait souvent dans la base de données, avec LIMIT et OFFSET en SQL, pour ne jamais charger toute la liste. Le principe et les précautions restent les mêmes.

## Exemple guidé 1

```javascript
function paginer(liste, options) {
  const tri = options.tri === "prix" ? "prix" : "nom";
  const t = Number.parseInt(options.taille, 10);
  const taille = Math.min(Math.max(Number.isNaN(t) ? 10 : t, 1), 50);
  const triee = [...liste].sort((a, b) => tri === "prix" ? a.prix - b.prix : a.nom.localeCompare(b.nom, "fr"));
  const pages = Math.max(1, Math.ceil(triee.length / taille));
  const n = Number.parseInt(options.page, 10);
  const page = Math.min(Math.max(Number.isNaN(n) ? 1 : n, 1), pages);
  return { page, pages, total: triee.length, produits: triee.slice((page - 1) * taille, page * taille) };
}

const liste = [{ nom: "Riz", prix: 600 }, { nom: "Gari", prix: 400 }, { nom: "Huile", prix: 1500 }];
console.log(paginer(liste, { page: "1", taille: "2", tri: "prix" }));
```

Affichage attendu :

    {
      page: 1,
      pages: 2,
      total: 3,
      produits: [ { nom: 'Gari', prix: 400 }, { nom: 'Riz', prix: 600 } ]
    }

Trace :

- La liste est triée par prix croissant.
- Deux produits par page : deux pages.
- La première page contient les deux moins chers.

## Exemple guidé 2

```javascript
function paginer(liste, options) {
  const tri = options.tri === "prix" ? "prix" : "nom";
  const t = Number.parseInt(options.taille, 10);
  const taille = Math.min(Math.max(Number.isNaN(t) ? 10 : t, 1), 50);
  const triee = [...liste].sort((a, b) => tri === "prix" ? a.prix - b.prix : a.nom.localeCompare(b.nom, "fr"));
  const pages = Math.max(1, Math.ceil(triee.length / taille));
  const n = Number.parseInt(options.page, 10);
  const page = Math.min(Math.max(Number.isNaN(n) ? 1 : n, 1), pages);
  return { page, pages, total: triee.length, produits: triee.slice((page - 1) * taille, page * taille) };
}

const liste = [{ nom: "Riz", prix: 600 }, { nom: "Gari", prix: 400 }];
const r = paginer(liste, { page: "-3", taille: "1000000", tri: "constructor" });
console.log(r.page, r.pages, r.produits.map(p => p.nom));
```

Affichage attendu :

    1 1 [ 'Gari', 'Riz' ]

Trace :

- Une page négative est ramenée à 1.
- Une taille démesurée est bornée à 50.
- Un tri inconnu revient au tri par nom.

## Vérifier et expliquer

Calcule à la main les pages d’une liste de 23 produits avec une taille de 10, puis ce que doit renvoyer page=4.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — URL](https://nodejs.org/docs/latest-v20.x/api/url.html)
- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
