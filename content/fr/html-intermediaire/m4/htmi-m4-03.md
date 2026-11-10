---
{
  "id": "htmi-m4-03",
  "title_fr": "Projet : un annuaire associatif complet à relire",
  "course": "html-intermediaire",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "htmi-m4-02"
  ],
  "outcomes": [
    "Assembler une structure autonome avec régions, données et formulaire localisés.",
    "Présenter honnêtement les états statiques et justifier les limites de la preuve automatique."
  ],
  "idea_fr": "Assembler une structure autonome avec régions, données et formulaire localisés.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Annuaire associatif — Club Rivage</title>\n  <meta name=\"description\" content=\"Deux clubs fictifs à Lomé, avec repères de navigation et préparation locale sans envoi.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<a id=\"evitement\" href=\"#contenu\">Aller au contenu</a>\n<header><h1 id=\"titre-page\">Annuaire associatif fictif</h1><p>Deux clubs inventés à Lomé.</p></header>\n<nav aria-label=\"Rubriques de l’annuaire\">\n  <a id=\"vers-annuaire\" href=\"#annuaire\">Clubs et rencontres</a>\n  <a id=\"vers-preparation\" href=\"#preparation\">Préparer un contact fictif</a>\n</nav>\n<main id=\"contenu\" tabindex=\"-1\">\n  <section id=\"annuaire\" aria-labelledby=\"titre-annuaire\">\n    <h2 id=\"titre-annuaire\">Clubs et rencontres</h2>\n    <article id=\"rivage\"><h3>Club Rivage</h3><p>Contact inventé : <bdi dir=\"auto\">Afi</bdi>.</p><p>Devise invitée : <span lang=\"en\">Learning together</span>.</p></article>\n    <article id=\"lecture\"><h3>Club Lecture</h3><p>Contact inventé : <bdi id=\"contact-ar\" dir=\"auto\" lang=\"ar\">أمل</bdi>.</p></article>\n\n<table id=\"horaires\">\n  <caption>Rencontres fictives à Lomé</caption>\n  <thead><tr>\n    <th id=\"col-association\" scope=\"col\">Association</th>\n    <th id=\"col-jour\" scope=\"col\">Jour</th>\n    <th id=\"col-lieu\" scope=\"col\">Lieu</th>\n  </tr></thead>\n  <tbody>\n    <tr><th id=\"asso-rivage\" scope=\"row\">Club Rivage</th><td headers=\"asso-rivage col-jour\"><time datetime=\"2026-11-14\">14 novembre 2026</time></td><td headers=\"asso-rivage col-lieu\">Lomé — salle A</td></tr>\n    <tr><th id=\"asso-lecture\" scope=\"row\">Club Lecture</th><td headers=\"asso-lecture col-jour\"><time datetime=\"2026-11-21\">21 novembre 2026</time></td><td headers=\"asso-lecture col-lieu\">Lomé — salle B</td></tr>\n  </tbody>\n</table>\n\n  </section>\n  <section id=\"preparation\" aria-labelledby=\"titre-preparation\">\n    <h2 id=\"titre-preparation\">Préparer un contact fictif</h2>\n    <p id=\"etat-demo\">État d’erreur statique fourni pour la revue ; aucun contrôle programmé.</p>\n\n<form id=\"demande\" aria-labelledby=\"titre-formulaire\">\n  <fieldset>\n    <legend id=\"titre-formulaire\">Préparer un contact fictif</legend>\n    <p id=\"aide-mail\">Données fictives uniquement ; aucun message n’est envoyé.</p>\n    <label for=\"courriel\">Adresse fictive, obligatoire</label>\n    <input id=\"courriel\" name=\"courriel\" type=\"email\" autocomplete=\"email\" inputmode=\"email\" required value=\"adresse-incomplete\" aria-invalid=\"true\" aria-describedby=\"aide-mail erreur-mail\">\n    <p id=\"erreur-mail\">Exemple d’erreur statique : écris une adresse au format nom@example.test.</p>\n    <label for=\"association\">Association fictive, obligatoire</label>\n    <select id=\"association\" name=\"association\" required>\n      <option value=\"\" selected>Choisir une association</option>\n      <option value=\"rivage\">Club Rivage</option>\n      <option value=\"lecture\">Club Lecture</option>\n    </select>\n    <button id=\"bouton-demo\" type=\"button\">Aucun envoi — démonstration</button>\n  </fieldset>\n</form>\n\n  </section>\n</main>\n<footer><p id=\"limite\">Annuaire inventé : aucune collecte et aucune inscription réelle.</p></footer>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "Un annuaire complet rassemble deux fiches fictives, leurs rencontres et un formulaire dont l’état d’erreur est explicitement statique.",
      "trace_fr": [
        "Le plan h1/h2/h3 distingue page, rubriques et fiches.",
        "Le tableau associe ses données aux noms de club et aux colonnes.",
        "Le formulaire n’annonce aucun envoi ni correction programmée."
      ],
      "browser_test": {
        "description_fr": "Annuaire intégré",
        "checks": [
          {
            "selector": "html",
            "attributes": {
              "lang": "fr",
              "dir": "ltr"
            }
          },
          {
            "selector": "head title",
            "textIncludes": "Annuaire associatif — Club Rivage"
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
            "selector": "#annuaire",
            "attributes": {
              "aria-labelledby": "titre-annuaire"
            }
          },
          {
            "selector": "#preparation",
            "attributes": {
              "aria-labelledby": "titre-preparation"
            }
          },
          {
            "selector": "#contact-ar",
            "attributes": {
              "dir": "auto",
              "lang": "ar"
            },
            "textIncludes": "أمل"
          },
          {
            "selector": "#demande fieldset > legend",
            "textIncludes": "Préparer un contact fictif"
          },
          {
            "selector": "label[for=\"courriel\"]",
            "textIncludes": "obligatoire"
          },
          {
            "selector": "#courriel",
            "attributes": {
              "name": "courriel",
              "type": "email",
              "autocomplete": "email",
              "inputmode": "email",
              "required": "",
              "aria-describedby": "aide-mail erreur-mail",
              "aria-invalid": "true"
            }
          },
          {
            "selector": "#erreur-mail",
            "textIncludes": "statique"
          },
          {
            "selector": "#bouton-demo",
            "attributes": {
              "type": "button"
            },
            "textIncludes": "Aucun envoi"
          },
          {
            "selector": "#horaires > caption",
            "textIncludes": "Rencontres fictives à Lomé"
          },
          {
            "selector": "#horaires thead th[scope=\"col\"]",
            "count": 3
          },
          {
            "selector": "#horaires tbody th[scope=\"row\"]",
            "count": 2
          },
          {
            "selector": "td[headers=\"asso-rivage col-jour\"] time",
            "attributes": {
              "datetime": "2026-11-14"
            }
          },
          {
            "selector": "td[headers=\"asso-lecture col-lieu\"]",
            "textIncludes": "Lomé — salle B"
          }
        ]
      }
    },
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Rencontres — Club Rivage</title>\n  <meta name=\"description\" content=\"Annuaire fictif du club, sans collecte de données.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<main><h1>Rencontres fictives</h1>\n<table id=\"horaires\">\n  <caption>Rencontres fictives à Lomé</caption>\n  <thead><tr>\n    <th id=\"col-association\" scope=\"col\">Association</th>\n    <th id=\"col-jour\" scope=\"col\">Jour</th>\n    <th id=\"col-lieu\" scope=\"col\">Lieu</th>\n  </tr></thead>\n  <tbody>\n    <tr><th id=\"asso-rivage\" scope=\"row\">Club Rivage</th><td headers=\"asso-rivage col-jour\"><time datetime=\"2026-11-14\">14 novembre 2026</time></td><td headers=\"asso-rivage col-lieu\">Lomé — salle A</td></tr>\n    <tr><th id=\"asso-lecture\" scope=\"row\">Club Lecture</th><td headers=\"asso-lecture col-jour\"><time datetime=\"2026-11-21\">21 novembre 2026</time></td><td headers=\"asso-lecture col-lieu\">Lomé — salle B</td></tr>\n  </tbody>\n</table>\n</main>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "Deux rencontres fictives possèdent un sujet, des en-têtes de ligne et colonne, et des dates lisibles avec leur valeur machine.",
      "trace_fr": [
        "caption donne le contexte commun.",
        "headers relie chaque cellule aux deux axes du tableau.",
        "time conserve un texte humain et un datetime normalisé."
      ],
      "browser_test": {
        "description_fr": "Relations de données",
        "checks": [
          {
            "selector": "#horaires > caption",
            "textIncludes": "Rencontres fictives à Lomé"
          },
          {
            "selector": "#horaires thead th[scope=\"col\"]",
            "count": 3
          },
          {
            "selector": "#horaires tbody th[scope=\"row\"]",
            "count": 2
          },
          {
            "selector": "td[headers=\"asso-rivage col-jour\"] time",
            "attributes": {
              "datetime": "2026-11-14"
            }
          },
          {
            "selector": "td[headers=\"asso-lecture col-lieu\"]",
            "textIncludes": "Lomé — salle B"
          },
          {
            "selector": "#horaires tbody tr",
            "count": 2
          },
          {
            "selector": "#asso-lecture",
            "attributes": {
              "scope": "row"
            }
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Présenter une valeur erronée comme une validation complète",
      "why_fr": "Le document décrit une situation mais ne réalise pas tout son traitement.",
      "fix_fr": "Nomme l’état statique et sa limite."
    },
    {
      "error": "Oublier les relations entre parties",
      "why_fr": "Les éléments peuvent exister sans être reliés correctement.",
      "fix_fr": "Contrôle destinations, labels, descriptions et en-têtes ensemble."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi garder les messages d’erreur explicitement statiques ?",
      "options": [
        "HTML seul ne met pas automatiquement aria-invalid à jour selon notre scénario.",
        "Pour annoncer un envoi sécurisé.",
        "Pour empêcher toute lecture au clavier.",
        "Parce que les labels deviennent inutiles."
      ],
      "answer": 0,
      "explanation": "L’exemple décrit un état fourni et ne prétend pas exécuter une validation programmée.",
      "id": "htmi-m4-03-q1"
    },
    {
      "question": "Qu’apporte headers dans le tableau ?",
      "options": [
        "Une règle de couleur.",
        "Un changement automatique de langue.",
        "Un téléchargement des rencontres.",
        "Une référence explicite aux en-têtes associés à la cellule."
      ],
      "answer": 3,
      "explanation": "Les identifiants relient la cellule au club de sa ligne et à la catégorie de sa colonne.",
      "id": "htmi-m4-03-q2"
    },
    {
      "question": "Quand la livraison est-elle suffisamment examinée ?",
      "options": [
        "Quand le formulaire contient un courriel réel.",
        "Quand un compteur donne une certification.",
        "Après les contrôles et une revue humaine des choix et de l’usage.",
        "Dès qu’une capture montre des bordures."
      ],
      "answer": 2,
      "explanation": "Les relations automatisées ne couvrent pas toute la compréhension ni toute l’expérience accessible.",
      "id": "htmi-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "livraison intégrée",
      "definition": "Document autonome qui réunit les parties prévues dans le même périmètre."
    },
    {
      "term": "headers",
      "definition": "Attribut qui référence les en-têtes associés à une cellule de données."
    },
    {
      "term": "état statique",
      "definition": "Situation décrite dans le document sans mise à jour programmée de son cycle."
    }
  ],
  "recap_fr": [
    "Assembler une structure autonome avec régions, données et formulaire localisés.",
    "Présenter honnêtement les états statiques et justifier les limites de la preuve automatique.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "livraison intégrée",
    "headers",
    "état statique"
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
      "title": "WHATWG — sections et régions",
      "url": "https://html.spec.whatwg.org/multipage/sections.html"
    },
    {
      "title": "WHATWG — formulaires",
      "url": "https://html.spec.whatwg.org/multipage/forms.html"
    },
    {
      "title": "WHATWG — tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html"
    },
    {
      "title": "WAI — form instructions",
      "url": "https://www.w3.org/WAI/tutorials/forms/instructions/"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document.",
  "project": {
    "context_fr": "Annuaire de clubs fictifs, sans collecte ni envoi.",
    "deliverables_fr": [
      "Document HTML autonome",
      "Tableau et formulaire reliés",
      "Explication de trois choix et revue humaine"
    ],
    "acceptance_criteria_fr": [
      "Régions et cibles uniques",
      "Localisation explicite",
      "En-têtes de données associés",
      "Labels/aides/erreurs reliés",
      "Limites de démonstration visibles"
    ],
    "rubric": [
      {
        "criterion_fr": "Structure",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Données et localisation",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Formulaire et limites",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Explication et usage humain",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      }
    ]
  }
}
---

## Explication pas à pas

Le livrable est un annuaire de deux clubs inventés à Lomé. Il réunit un document identifié, des rubriques navigables, des fiches localisées, un tableau de rencontres et un formulaire de démonstration. Ce projet HTML décrit des relations et des états ; il ne contacte aucune personne, ne stocke aucun courriel et ne réalise aucune inscription. Cette limite doit rester lisible dans la page, pas seulement dans la consigne.

Commence par le plan. Le h1 annonce Annuaire associatif fictif ; les sections Clubs et rencontres puis Préparer un contact fictif possèdent des h2 et des identifiants uniques. Les fiches sont des articles avec h3. La navigation nommée vise ces deux sections, et le lien d’évitement précède l’en-tête pour pointer vers le contenu principal. Le titre du document et sa description situent l’annuaire dans head ; lang et dir décrivent le document français.

Les contacts fictifs remobilisent la localisation. Le nom arabe connu reçoit lang="ar" et une isolation bdi avec dir="auto" ; la phrase autour reste française. Une devise anglaise déclare sa propre langue. Il ne faut ni retourner tout l’annuaire ni supposer qu’une langue modifie automatiquement le sens de présentation. Vérifie ces frontières avant d’ajouter des styles : une couleur ou un alignement ne remplace pas cette information.

Le tableau décrit des données, pas la mise en page. Sa caption donne le sujet ; les en-têtes de colonnes ont scope=col et les noms de clubs scope=row. Les cellules de données précisent aussi leurs en-têtes avec headers et les identifiants correspondants. Cette relation explicite est un exercice de lecture du modèle déjà étudié ; elle ne dispense pas de choisir des intitulés compréhensibles. Les dates utilisent time et datetime, tandis que le lieu reste un texte visible.

Le formulaire possède un fieldset et sa legend, des labels, des noms de champs et les contraintes annoncées. Une valeur de courriel incorrecte est fournie pour examiner un état d’erreur statique. L’aide et l’erreur sont reliées par aria-describedby ; aria-invalid indique cet exemple d’état. HTML seul ne met pas automatiquement cet attribut à jour après une correction. Le bouton est explicitement de type button et annonce qu’il n’envoie rien : il ne promet donc aucune validation programmée.

La grille Structure vérifie régions, titres et destinations. La grille Données examine tableau, dates et localisation. La grille Formulaire examine noms, labels, aides et limites de l’état statique. La grille Explication demande de justifier trois choix et de distinguer les preuves automatiques de l’usage humain. Les quatre activités construisent ces parties puis les réunissent sans dépendre d’un fichier précédent. Les tests inspectent les relations et peuvent focaliser main ; l’activation des liens reste bloquée dans l’aperçu. Avant une utilisation hors du laboratoire, il faudrait encore parcourir le document au clavier, écouter ses annonces et relire son contenu avec des personnes concernées.

## Exemple guidé 1

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Annuaire associatif — Club Rivage</title>
  <meta name="description" content="Deux clubs fictifs à Lomé, avec repères de navigation et préparation locale sans envoi.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<a id="evitement" href="#contenu">Aller au contenu</a>
<header><h1 id="titre-page">Annuaire associatif fictif</h1><p>Deux clubs inventés à Lomé.</p></header>
<nav aria-label="Rubriques de l’annuaire">
  <a id="vers-annuaire" href="#annuaire">Clubs et rencontres</a>
  <a id="vers-preparation" href="#preparation">Préparer un contact fictif</a>
</nav>
<main id="contenu" tabindex="-1">
  <section id="annuaire" aria-labelledby="titre-annuaire">
    <h2 id="titre-annuaire">Clubs et rencontres</h2>
    <article id="rivage"><h3>Club Rivage</h3><p>Contact inventé : <bdi dir="auto">Afi</bdi>.</p><p>Devise invitée : <span lang="en">Learning together</span>.</p></article>
    <article id="lecture"><h3>Club Lecture</h3><p>Contact inventé : <bdi id="contact-ar" dir="auto" lang="ar">أمل</bdi>.</p></article>

<table id="horaires">
  <caption>Rencontres fictives à Lomé</caption>
  <thead><tr>
    <th id="col-association" scope="col">Association</th>
    <th id="col-jour" scope="col">Jour</th>
    <th id="col-lieu" scope="col">Lieu</th>
  </tr></thead>
  <tbody>
    <tr><th id="asso-rivage" scope="row">Club Rivage</th><td headers="asso-rivage col-jour"><time datetime="2026-11-14">14 novembre 2026</time></td><td headers="asso-rivage col-lieu">Lomé — salle A</td></tr>
    <tr><th id="asso-lecture" scope="row">Club Lecture</th><td headers="asso-lecture col-jour"><time datetime="2026-11-21">21 novembre 2026</time></td><td headers="asso-lecture col-lieu">Lomé — salle B</td></tr>
  </tbody>
</table>

  </section>
  <section id="preparation" aria-labelledby="titre-preparation">
    <h2 id="titre-preparation">Préparer un contact fictif</h2>
    <p id="etat-demo">État d’erreur statique fourni pour la revue ; aucun contrôle programmé.</p>

<form id="demande" aria-labelledby="titre-formulaire">
  <fieldset>
    <legend id="titre-formulaire">Préparer un contact fictif</legend>
    <p id="aide-mail">Données fictives uniquement ; aucun message n’est envoyé.</p>
    <label for="courriel">Adresse fictive, obligatoire</label>
    <input id="courriel" name="courriel" type="email" autocomplete="email" inputmode="email" required value="adresse-incomplete" aria-invalid="true" aria-describedby="aide-mail erreur-mail">
    <p id="erreur-mail">Exemple d’erreur statique : écris une adresse au format nom@example.test.</p>
    <label for="association">Association fictive, obligatoire</label>
    <select id="association" name="association" required>
      <option value="" selected>Choisir une association</option>
      <option value="rivage">Club Rivage</option>
      <option value="lecture">Club Lecture</option>
    </select>
    <button id="bouton-demo" type="button">Aucun envoi — démonstration</button>
  </fieldset>
</form>

  </section>
</main>
<footer><p id="limite">Annuaire inventé : aucune collecte et aucune inscription réelle.</p></footer>
</body>
</html>
```

## Exemple guidé 2

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Rencontres — Club Rivage</title>
  <meta name="description" content="Annuaire fictif du club, sans collecte de données.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<main><h1>Rencontres fictives</h1>
<table id="horaires">
  <caption>Rencontres fictives à Lomé</caption>
  <thead><tr>
    <th id="col-association" scope="col">Association</th>
    <th id="col-jour" scope="col">Jour</th>
    <th id="col-lieu" scope="col">Lieu</th>
  </tr></thead>
  <tbody>
    <tr><th id="asso-rivage" scope="row">Club Rivage</th><td headers="asso-rivage col-jour"><time datetime="2026-11-14">14 novembre 2026</time></td><td headers="asso-rivage col-lieu">Lomé — salle A</td></tr>
    <tr><th id="asso-lecture" scope="row">Club Lecture</th><td headers="asso-lecture col-jour"><time datetime="2026-11-21">21 novembre 2026</time></td><td headers="asso-lecture col-lieu">Lomé — salle B</td></tr>
  </tbody>
</table>
</main>
</body>
</html>
```

