---
{
  "id": "html-m4-01",
  "title_fr": "Assembler une page navigable et relire son plan",
  "course": "html-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "html-m3-03"
  ],
  "outcomes": [
    "Assembler un plan et une navigation cohérents.",
    "Faire une revue structurelle puis un contrôle clavier."
  ],
  "idea_fr": "Une page cohérente relie son plan de titres, ses régions et ses destinations internes.",
  "analogy_fr": "Assembler la page ressemble à installer une signalétique cohérente dans tout un bâtiment.",
  "examples": [
    {
      "code": "<a href=\"#contenu\">Aller au contenu</a>\n<header><h1>Graines ensemble</h1></header>\n<nav aria-label=\"Principale\"><a href=\"#ateliers\">Ateliers</a><a href=\"#contact\">Contact</a></nav>\n<main id=\"contenu\"><section id=\"ateliers\"><h2>Ateliers</h2><p>Découvrir le jardin.</p></section><section id=\"contact\"><h2>Contact</h2><p>Démonstration sans envoi.</p></section></main>",
      "expected_output": "Les destinations contenu, ateliers et contact existent une seule fois.",
      "trace_fr": [
        "Le premier lien offre un accès au main.",
        "Les liens de navigation correspondent aux deux rubriques."
      ],
      "inputs": []
    },
    {
      "code": "<main><h1>Participer au jardin</h1>\n<section><h2>Ateliers à venir</h2><article><h3>Découvrir le compost</h3><p>Activité fictive du samedi.</p></article></section>\n<section><h2>Préparer sa venue</h2><ul><li>Prendre une gourde</li><li>Porter des chaussures fermées</li></ul></section></main>",
      "expected_output": "Deux rubriques et une fiche d’atelier de niveau trois.",
      "trace_fr": [
        "Le h3 dépend du h2 Ateliers à venir.",
        "La liste rassemble le matériel sans créer de faux titres."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer un lien sans cible",
      "why_fr": "Le plan et la navigation ont évolué séparément.",
      "fix_fr": "Vérifie chaque fragment après une modification."
    },
    {
      "error": "Multiplier les rubriques vagues",
      "why_fr": "Les titres ne décrivent plus le contenu.",
      "fix_fr": "Renomme ou réunis les parties selon leur objectif."
    }
  ],
  "quiz": [
    {
      "question": "À quoi sert un lien d’évitement ?",
      "options": [
        "À supprimer la navigation.",
        "À cacher le formulaire.",
        "À changer de langue automatiquement.",
        "À accéder directement à une région importante comme main."
      ],
      "answer": 3,
      "explanation": "Il offre une voie rapide, particulièrement utile au clavier.",
      "id": "html-m4-01-q1"
    },
    {
      "question": "Comment contrôler un lien interne ?",
      "options": [
        "Ajouter toujours un nouvel onglet.",
        "Compter uniquement les paragraphes.",
        "Comparer href, la cible unique et le texte annoncé.",
        "Vérifier seulement sa couleur."
      ],
      "answer": 2,
      "explanation": "Une destination correcte et un libellé clair sont tous deux nécessaires.",
      "id": "html-m4-01-q2"
    },
    {
      "question": "Que faire avant d’ajouter une section ?",
      "options": [
        "Y placer un tableau de mise en page.",
        "Identifier la relation thématique et son titre utile.",
        "Choisir sa couleur.",
        "Lui donner automatiquement un h6."
      ],
      "answer": 1,
      "explanation": "Le rôle du contenu guide la structure, puis CSS peut régler la présentation.",
      "id": "html-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "lien d’évitement",
      "definition": "Lien donnant un accès rapide à une région de page."
    },
    {
      "term": "plan",
      "definition": "Organisation des titres et des rubriques."
    },
    {
      "term": "cible",
      "definition": "Élément ou ressource atteint par une navigation."
    }
  ],
  "recap_fr": [
    "Les liens correspondent aux rubriques réelles.",
    "Les ids restent uniques.",
    "La vérification humaine complète les tests."
  ],
  "tags": [
    "html",
    "m4",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "references": [
    {
      "title": "Standard HTML — structure et métadonnées",
      "url": "https://html.spec.whatwg.org/multipage/semantics.html"
    },
    {
      "title": "Standard HTML — formulaires",
      "url": "https://html.spec.whatwg.org/multipage/forms.html"
    },
    {
      "title": "Standard HTML — images et médias",
      "url": "https://html.spec.whatwg.org/multipage/embedded-content.html"
    },
    {
      "title": "Standard HTML — tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard, sous-ensemble débutant ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

Tu connais maintenant les éléments nécessaires à une première page d’association. Le prochain travail consiste à les combiner sans perdre leur sens. Une accumulation de balises correctes ne garantit pas une bonne page. Le lecteur doit comprendre le sujet, trouver les informations importantes et atteindre une action. Nous allons relier une introduction, une navigation courte, des rubriques thématiques et une zone de contact.

Commence par le contenu avant le code : qui parle, quelles activités sont proposées, comment participer ? Donne à la page un h1 précis. Place ensuite des h2 pour les grandes rubriques. Une fiche autonome dans une rubrique peut avoir un h3. Les titres doivent décrire ce qui suit. « Informations » répété partout aide moins que « Prochains ateliers » ou « Conditions de participation ». La clarté du plan facilite aussi la recherche d’un passage lorsque la page devient plus longue.

Une navigation interne possède des liens vers des ids uniques. Vérifie chaque relation dans les deux sens : chaque lien doit avoir une cible ; chaque destination importante doit être nommée par un texte utile. Un lien d’évitement, placé au début du body, permet d’aller directement au contenu principal. Il peut viser un main identifié. Le comportement exact du focus peut varier selon la cible et le navigateur ; il faut donc vérifier au clavier que la suite de navigation rejoint bien la zone attendue.

Les régions doivent rester lisibles sans mise en page sophistiquée. Un header introduit le site, nav réunit les principaux liens, main rassemble l’objectif de la page et footer conclut. Le formulaire se place dans une rubrique dont le titre annonce son rôle. Évite les sections sans raison et les conteneurs neutres en cascade. Le meilleur élément est celui qui explique la relation, pas celui qui semble donner une boîte pratique à colorer.

Les exercices inspectent ces relations et les titres, mais tu dois compléter le contrôle par une visite manuelle. Lis la page dans l’ordre du document, active les liens au clavier, puis trouve le formulaire sans utiliser la souris. Demande-toi aussi si une personne comprend que les données sont fictives et qu’aucune inscription réelle n’est créée. Ce bilan est une étape de conception : corriger un texte ou simplifier une rubrique peut améliorer davantage la page qu’ajouter une nouvelle balise.

## Exemple guidé 1

```html
<a href="#contenu">Aller au contenu</a>
<header><h1>Graines ensemble</h1></header>
<nav aria-label="Principale"><a href="#ateliers">Ateliers</a><a href="#contact">Contact</a></nav>
<main id="contenu"><section id="ateliers"><h2>Ateliers</h2><p>Découvrir le jardin.</p></section><section id="contact"><h2>Contact</h2><p>Démonstration sans envoi.</p></section></main>
```

## Exemple guidé 2

```html
<main><h1>Participer au jardin</h1>
<section><h2>Ateliers à venir</h2><article><h3>Découvrir le compost</h3><p>Activité fictive du samedi.</p></article></section>
<section><h2>Préparer sa venue</h2><ul><li>Prendre une gourde</li><li>Porter des chaussures fermées</li></ul></section></main>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
