---
{
  "id": "pfs-m1-03",
  "title_fr": "Des pages HTML générées par le serveur",
  "course": "projet-fullstack",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "pfs-m1-02"
  ],
  "outcomes": [
    "Produire des pages HTML complètes à partir des données, avec un gabarit commun.",
    "Échapper systématiquement les textes insérés pour empêcher l’injection de code."
  ],
  "idea_fr": "Le serveur assemble le HTML à partir des données ; chaque texte inséré passe par l’échappement, sans exception.",
  "analogy_fr": "Un imprimeur garde le même modèle de faire-part et n’y change que les noms et la date, en vérifiant qu’aucun caractère ne déforme la mise en page.",
  "examples": [
    {
      "code": "function echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction page(titre, contenu) {\n  return `<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>${echapper(titre)} · Marché de Bè</title></head>`\n    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;\n}\n\nconsole.log(page(\"Riz & co\", \"<p>Bienvenue</p>\"));",
      "expected_output": "<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><title>Riz &amp; co · Marché de Bè</title></head><body><main><h1>Riz &amp; co</h1><p>Bienvenue</p></main></body></html>\n",
      "inputs": [],
      "trace_fr": [
        "Le gabarit fournit la structure commune.",
        "Le titre est échappé : & devient &amp;.",
        "Le contenu, produit par le code, est inséré tel quel."
      ]
    },
    {
      "code": "function echapper(texte) {\n  return String(texte)\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\")\n    .replaceAll(\"'\", \"&#39;\");\n}\n\nfunction listeHTML(liste) {\n  return \"<ul>\" + liste.map(p => `<li><a href=\"/produits/${p.id}\">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join(\"\") + \"</ul>\";\n}\n\nconsole.log(listeHTML([{ id: 7, nom: \"<script>vol()</script>\", prix: 100 }]));",
      "expected_output": "<ul><li><a href=\"/produits/7\">&lt;script&gt;vol()&lt;/script&gt;</a> — 100 FCFA</li></ul>\n",
      "inputs": [],
      "trace_fr": [
        "Un nom piégé arrive dans les données.",
        "echapper le transforme en texte inoffensif.",
        "Le visiteur voit le texte, rien ne s’exécute."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Insérer un texte saisi sans l’échapper",
      "why_fr": "Un script s’exécute chez tous les visiteurs.",
      "fix_fr": "Passe tout texte extérieur dans echapper."
    },
    {
      "error": "Oublier les guillemets dans un attribut",
      "why_fr": "Un texte peut fermer l’attribut.",
      "fix_fr": "Échappe aussi \" et '."
    },
    {
      "error": "Copier la structure de page dans chaque route",
      "why_fr": "Le site devient incohérent.",
      "fix_fr": "Une fonction page commune."
    }
  ],
  "quiz": [
    {
      "question": "Qu’est-ce que le rendu côté serveur ?",
      "options": [
        "Le navigateur construit la page",
        "Le serveur envoie une page HTML complète",
        "Une base de données",
        "Une API"
      ],
      "answer": 1,
      "explanation": "Simple et rapide à afficher.",
      "id": "pfs-m1-03-q1"
    },
    {
      "question": "Quel texte faut-il échapper ?",
      "options": [
        "Seulement les mots de passe",
        "Tout texte qui ne vient pas du code lui-même",
        "Rien",
        "Seulement les titres"
      ],
      "answer": 1,
      "explanation": "Sans exception.",
      "id": "pfs-m1-03-q2"
    },
    {
      "question": "Pourquoi un gabarit page commun ?",
      "options": [
        "Pour la vitesse",
        "Pour modifier la structure de tout le site en un endroit",
        "C’est obligatoire",
        "Pour le référencement seulement"
      ],
      "answer": 1,
      "explanation": "Une seule source.",
      "id": "pfs-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "rendu côté serveur",
      "definition": "Construction de la page HTML par le serveur."
    },
    {
      "term": "gabarit",
      "definition": "Modèle de page où l’on insère des valeurs."
    },
    {
      "term": "échappement",
      "definition": "Transformation des caractères spéciaux en entités inoffensives."
    },
    {
      "term": "fonction pure",
      "definition": "Fonction dont le résultat ne dépend que de ses arguments."
    }
  ],
  "recap_fr": [
    "Produire des pages HTML complètes à partir des données, avec un gabarit commun.",
    "Échapper systématiquement les textes insérés pour empêcher l’injection de code.",
    "Une application complète relie des pages, des formulaires et une API autour d’un même modèle de données, vérifié à chaque entrée."
  ],
  "tags": [
    "full-stack",
    "node.js",
    "projet",
    "rendu côté serveur",
    "gabarit",
    "échappement",
    "fonction pure"
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
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html"
    }
  ],
  "sources": [
    {
      "title": "OWASP Top 10 (français)",
      "url": "https://owasp.org/Top10/fr/",
      "scope": "Principaux risques de sécurité des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — http",
      "url": "https://nodejs.org/docs/latest-v20.x/api/http.html",
      "scope": "Créer un serveur et répondre aux requêtes. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une application web peut fabriquer ses pages de deux façons. Soit le navigateur reçoit des données et construit la page avec JavaScript, comme dans le cours React ; soit le serveur envoie directement une page HTML complète. Cette seconde méthode, appelée rendu côté serveur, est simple, rapide à afficher même sur un téléphone modeste, et fonctionne sans JavaScript dans le navigateur. C’est celle de ce projet.

Toutes les pages partagent la même structure : doctype, langue, encodage, titre, puis le contenu. Une fonction page(titre, contenu) produit ce gabarit commun ; chaque route ne fournit que son contenu. Changer l’en-tête de tout le site ne demande alors qu’une modification. Les gabarits de chaînes de JavaScript, entre accents graves, rendent ce code lisible.

Le danger principal du rendu côté serveur est l’injection de code, le XSS vu dans le cours Node.js. Le nom d’un produit est saisi par quelqu’un : s’il contient <script>, l’insérer tel quel exécuterait ce script chez tous les visiteurs. La règle est absolue : tout texte qui ne vient pas du code lui-même passe par echapper avant d’être inséré, qu’il s’agisse d’un nom, d’un titre, d’un message d’erreur ou de la valeur d’un champ de formulaire. Dans un attribut, comme value="…", les guillemets doivent aussi être échappés, sinon un texte pourrait fermer l’attribut et en ajouter d’autres.

Les nombres que le serveur a lui-même calculés, comme un identifiant ou un prix converti avec Number, ne présentent pas ce risque. Mais dans le doute, échapper ne coûte rien.

Les petites fonctions de gabarit se composent : listeHTML(produits) produit une liste de liens, carte(produit) un bloc de détail, page(titre, contenu) les enveloppe. Chacune est une fonction pure qui renvoie une chaîne : on la teste sans serveur, en vérifiant le texte produit.

Les moteurs de gabarits comme EJS ou Nunjucks, et les bibliothèques comme React, échappent automatiquement ce qu’on insère, et proposent une syntaxe spéciale, volontairement visible, pour insérer du HTML brut. Comprendre pourquoi permet de ne jamais désactiver cette protection par commodité.

Enfin, le HTML produit doit rester accessible : un seul h1 par page, des liens dont le texte a un sens, la langue déclarée. Ce que tu as appris dans les cours HTML et Projet web s’applique ici, simplement écrit par le serveur.

## Exemple guidé 1

```javascript
function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function page(titre, contenu) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${echapper(titre)} · Marché de Bè</title></head>`
    + `<body><main><h1>${echapper(titre)}</h1>${contenu}</main></body></html>`;
}

console.log(page("Riz & co", "<p>Bienvenue</p>"));
```

Affichage attendu :

    <!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Riz &amp; co · Marché de Bè</title></head><body><main><h1>Riz &amp; co</h1><p>Bienvenue</p></main></body></html>

Trace :

- Le gabarit fournit la structure commune.
- Le titre est échappé : & devient &amp;.
- Le contenu, produit par le code, est inséré tel quel.

## Exemple guidé 2

```javascript
function echapper(texte) {
  return String(texte)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function listeHTML(liste) {
  return "<ul>" + liste.map(p => `<li><a href="/produits/${p.id}">${echapper(p.nom)}</a> — ${p.prix} FCFA</li>`).join("") + "</ul>";
}

console.log(listeHTML([{ id: 7, nom: "<script>vol()</script>", prix: 100 }]));
```

Affichage attendu :

    <ul><li><a href="/produits/7">&lt;script&gt;vol()&lt;/script&gt;</a> — 100 FCFA</li></ul>

Trace :

- Un nom piégé arrive dans les données.
- echapper le transforme en texte inoffensif.
- Le visiteur voit le texte, rien ne s’exécute.

## Vérifier et expliquer

Repère dans une page web que tu utilises trois textes qui viennent d’utilisateurs et devraient donc être échappés.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [OWASP Top 10 (français)](https://owasp.org/Top10/fr/)
- [Node.js — http](https://nodejs.org/docs/latest-v20.x/api/http.html)
