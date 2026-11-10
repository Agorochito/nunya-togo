---
{
  "id": "htmi-m4-02",
  "title_fr": "Décrire le document et relier une navigation locale",
  "course": "html-intermediaire",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "htmi-m4-01"
  ],
  "outcomes": [
    "Écrire un head descriptif sans limiter artificiellement le zoom.",
    "Relier des fragments locaux à des cibles uniques et compréhensibles."
  ],
  "idea_fr": "Écrire un head descriptif sans limiter artificiellement le zoom.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Annuaire — Club Rivage</title>\n  <meta name=\"description\" content=\"Associations et horaires fictifs du Club Rivage, à consulter localement.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<a id=\"evitement\" href=\"#contenu\">Aller au contenu</a>\n<header><h1>Club Rivage</h1></header>\n<nav id=\"rubriques\" aria-label=\"Rubriques de la page\">\n  <a id=\"lien-associations\" href=\"#associations\">Associations fictives</a>\n  <a id=\"lien-horaires\" href=\"#horaires\">Horaires de démonstration</a>\n</nav>\n<main id=\"contenu\" tabindex=\"-1\">\n  <section id=\"associations\" aria-labelledby=\"titre-associations\">\n    <h2 id=\"titre-associations\">Associations fictives</h2>\n    <p>Deux associations inventées pour apprendre.</p>\n  </section>\n  <section id=\"horaires\" aria-labelledby=\"titre-horaires\">\n    <h2 id=\"titre-horaires\">Horaires de démonstration</h2>\n    <p>Aucune participation réelle n’est enregistrée.</p>\n  </section>\n</main>\n<footer><p>Document pédagogique local.</p></footer>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "Un document nommé Annuaire — Club Rivage, avec résumé, viewport souple et deux destinations locales uniques.",
      "trace_fr": [
        "Les métadonnées sont dans head, distinctes du h1 visible.",
        "Les deux href pointent vers des ids présents dans le corps.",
        "Le lien initial propose une entrée directe vers main."
      ],
      "browser_test": {
        "description_fr": "Document et destinations",
        "checks": [
          {
            "selector": "head > title",
            "count": 1,
            "textIncludes": "Annuaire — Club Rivage"
          },
          {
            "selector": "meta[charset]",
            "count": 1,
            "attributes": {
              "charset": "UTF-8"
            }
          },
          {
            "selector": "meta[name=\"description\"]",
            "count": 1,
            "attributes": {
              "content": "Associations et horaires fictifs du Club Rivage, à consulter localement."
            }
          },
          {
            "selector": "meta[name=\"viewport\"]",
            "count": 1,
            "attributes": {
              "content": "width=device-width, initial-scale=1"
            }
          },
          {
            "selector": "#evitement",
            "attributes": {
              "href": "#contenu"
            }
          },
          {
            "selector": "main#contenu",
            "count": 1,
            "attributes": {
              "tabindex": "-1"
            }
          },
          {
            "selector": "#lien-associations",
            "attributes": {
              "href": "#associations"
            }
          },
          {
            "selector": "#lien-horaires",
            "attributes": {
              "href": "#horaires"
            }
          },
          {
            "selector": "#associations",
            "count": 1
          },
          {
            "selector": "#horaires",
            "count": 1
          }
        ]
      }
    },
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Accès direct — Club Rivage</title>\n  <meta name=\"description\" content=\"Annuaire fictif du club, sans collecte de données.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<a id=\"evitement\" href=\"#contenu\">Aller au contenu</a>\n<header><h1>Accès direct</h1></header>\n<main id=\"contenu\" tabindex=\"-1\"><h2>Informations fictives</h2><p>Contenu principal.</p></main>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "Le conteneur principal peut recevoir le focus programmatique sans devenir un arrêt supplémentaire de Tab.",
      "trace_fr": [
        "tabindex=-1 autorise ce focus ciblé.",
        "Le lien conserve une référence de fragment compréhensible.",
        "Le test focalise main directement ; il ne simule pas l’activation du lien bloqué."
      ],
      "browser_test": {
        "description_fr": "Cible focalisable",
        "checks": [
          {
            "selector": "#evitement",
            "attributes": {
              "href": "#contenu"
            }
          },
          {
            "selector": "#contenu",
            "attributes": {
              "tabindex": "-1"
            }
          },
          {
            "selector": "main:focus",
            "count": 1
          }
        ],
        "focus_selector": "#contenu"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre title et h1",
      "why_fr": "Le nom du document et son titre visible ne jouent pas le même rôle.",
      "fix_fr": "Rédige les deux de manière complémentaire."
    },
    {
      "error": "Réutiliser un même id pour deux cibles",
      "why_fr": "La référence ne distingue plus une destination unique.",
      "fix_fr": "Donne un identifiant propre à chaque section."
    }
  ],
  "quiz": [
    {
      "question": "La meta viewport remplace-t-elle les styles adaptatifs ?",
      "options": [
        "Elle crée une deuxième version mobile du document.",
        "Non, elle configure un contexte de présentation mais le contenu doit encore s’adapter.",
        "Oui, tous les éléments deviennent automatiquement fluides.",
        "Seulement les tableaux sont transformés."
      ],
      "answer": 1,
      "explanation": "Le réglage et la mise en page responsive répondent à des responsabilités complémentaires.",
      "id": "htmi-m4-02-q1"
    },
    {
      "question": "Que doit désigner href=\"#horaires\" ?",
      "options": [
        "Un id horaires unique dans le même document.",
        "Un fichier qui sera téléchargé automatiquement.",
        "Tous les h2 de la page.",
        "Un nom de classe CSS quelconque."
      ],
      "answer": 0,
      "explanation": "Un fragment est une référence précise à une cible locale.",
      "id": "htmi-m4-02-q2"
    },
    {
      "question": "Quel résultat les tests de navigation prouvent-ils ici ?",
      "options": [
        "Un saut activé malgré le blocage des liens.",
        "Une inscription enregistrée.",
        "Le classement de la page dans un moteur de recherche.",
        "La présence des références et des cibles annoncées."
      ],
      "answer": 3,
      "explanation": "L’environnement neutralise les liens et les envois ; la preuve reste une inspection structurale.",
      "id": "htmi-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "métadonnée",
      "definition": "Information qui décrit le document ou son contexte de présentation."
    },
    {
      "term": "fragment",
      "definition": "Partie d’une URL introduite par # et utilisée ici pour viser un id local."
    },
    {
      "term": "viewport",
      "definition": "Zone de présentation dont les paramètres influencent notamment les navigateurs mobiles."
    }
  ],
  "recap_fr": [
    "Écrire un head descriptif sans limiter artificiellement le zoom.",
    "Relier des fragments locaux à des cibles uniques et compréhensibles.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "métadonnée",
    "fragment",
    "viewport"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "references": [
    {
      "title": "WHATWG — métadonnées du document",
      "url": "https://html.spec.whatwg.org/multipage/semantics.html#document-metadata"
    },
    {
      "title": "MDN — viewport meta element",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Viewport_meta_element"
    },
    {
      "title": "WHATWG — hyperlinks",
      "url": "https://html.spec.whatwg.org/multipage/links.html#hyperlinks"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document."
}
---

## Explication pas à pas

Un titre visible ne suffit pas à identifier un document dans l’historique, un onglet ou une liste de résultats. La page possède aussi des métadonnées dans head. Elles ne remplacent pas les textes du corps : elles décrivent le document et certains paramètres de présentation. Dans cette leçon, l’annuaire du Club Rivage reste un fichier autonome de démonstration, sans script ni ressource distante nécessaire.

L’élément title donne un nom au document. Choisis un intitulé qui distingue la page et son contexte, comme Annuaire — Club Rivage, plutôt que Page sans autre précision. Le h1 visible annonce le sujet dans le corps ; les deux éléments sont complémentaires. Une meta name="description" contient un résumé utile et fidèle. Elle ne doit pas annoncer une inscription ou des associations réelles que l’exemple ne fournit pas. Sa présence ne garantit ni position dans un moteur de recherche ni reprise exacte de son texte.

La déclaration meta charset="UTF-8" annonce l’encodage du document ; dans un fichier réel elle doit être placée très tôt dans head. Elle n’est pas un attribut de traduction et ne remplace pas lang. Le navigateur reçoit ici une chaîne déjà préparée par l’atelier, mais nous conservons la structure d’un document réutilisable. Ne demande aucune redirection ou actualisation automatique par http-equiv : ces comportements sortent du projet et sont bloqués dans l’aperçu.

La meta viewport exprime une autre intention. width=device-width et initial-scale=1 permettent une correspondance adaptée avec la largeur de l’appareil sur les navigateurs mobiles concernés. Ce réglage ne crée pas à lui seul une mise en page responsive : les styles et le contenu doivent encore s’adapter. N’ajoute pas user-scalable=no pour tenter de stabiliser une capture ; la possibilité de zoom est importante pour lire. Une largeur fixe de trois cent soixante pixels ne représente pas tous les écrans.

La navigation locale repose sur des fragments. Un lien href="#horaires" désigne l’élément dont id vaut horaires dans le même document. Chaque cible doit être unique. Donne aussi au lien un texte qui explique sa destination et nomme la région nav lorsque son rôle doit être distingué. Le lien d’évitement initial vise main#contenu ; tabindex=-1 rend ce conteneur focalisable sans l’ajouter comme étape ordinaire de Tab. Le comportement exact d’un saut mérite une vérification dans la page finale.

Dans cet atelier, les activations de liens sont neutralisées. Les tests inspectent donc les références, les cibles et les attributs ; ils ne prétendent pas prouver un défilement réellement effectué ici. Le premier exemple montre le document complet, le second focalise le conteneur pour vérifier sa capacité à recevoir le focus. Relis ensuite les destinations, le nom de l’onglet et le résumé. Une description précise, des identifiants uniques et une navigation compréhensible rendent le document explicable avant même sa mise en forme CSS.

## Exemple guidé 1

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Annuaire — Club Rivage</title>
  <meta name="description" content="Associations et horaires fictifs du Club Rivage, à consulter localement.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<a id="evitement" href="#contenu">Aller au contenu</a>
<header><h1>Club Rivage</h1></header>
<nav id="rubriques" aria-label="Rubriques de la page">
  <a id="lien-associations" href="#associations">Associations fictives</a>
  <a id="lien-horaires" href="#horaires">Horaires de démonstration</a>
</nav>
<main id="contenu" tabindex="-1">
  <section id="associations" aria-labelledby="titre-associations">
    <h2 id="titre-associations">Associations fictives</h2>
    <p>Deux associations inventées pour apprendre.</p>
  </section>
  <section id="horaires" aria-labelledby="titre-horaires">
    <h2 id="titre-horaires">Horaires de démonstration</h2>
    <p>Aucune participation réelle n’est enregistrée.</p>
  </section>
</main>
<footer><p>Document pédagogique local.</p></footer>
</body>
</html>
```

## Exemple guidé 2

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Accès direct — Club Rivage</title>
  <meta name="description" content="Annuaire fictif du club, sans collecte de données.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<a id="evitement" href="#contenu">Aller au contenu</a>
<header><h1>Accès direct</h1></header>
<main id="contenu" tabindex="-1"><h2>Informations fictives</h2><p>Contenu principal.</p></main>
</body>
</html>
```

