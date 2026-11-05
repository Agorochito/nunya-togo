---
{
  "id": "html-m2-01",
  "title_fr": "Choisir listes et grandes régions de page",
  "course": "html-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "html-m1-03"
  ],
  "outcomes": [
    "Choisir une liste selon le rôle de l’ordre.",
    "Découper une page en régions sémantiques."
  ],
  "idea_fr": "Les listes décrivent des ensembles ; les régions nomment les fonctions des grandes parties de page.",
  "analogy_fr": "Une page est comme un lieu d’accueil : entrée, panneaux de direction, espace principal et informations de sortie.",
  "examples": [
    {
      "code": "<h2>À apporter</h2>\n<ul><li>Gants</li><li>Gourde</li></ul>\n<h2>Pour participer</h2>\n<ol><li>Choisir un atelier</li><li>Remplir le formulaire</li></ol>",
      "expected_output": "Une liste de matériel sans ordre imposé et deux étapes numérotées.",
      "trace_fr": [
        "ul représente un ensemble.",
        "ol représente une succession.",
        "Chaque entrée est un li."
      ],
      "inputs": []
    },
    {
      "code": "<header><h1>Graines ensemble</h1></header>\n<nav aria-label=\"Principale\"><a href=\"#ateliers\">Ateliers</a></nav>\n<main><section id=\"ateliers\"><h2>Nos ateliers</h2><p>Une activité chaque samedi.</p></section></main>\n<footer><p>Association fictive.</p></footer>",
      "expected_output": "Une introduction, une navigation, un contenu principal et un pied de page.",
      "trace_fr": [
        "Les éléments nomment les fonctions des régions.",
        "section réunit le titre et sa présentation thématique."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire les puces au clavier",
      "why_fr": "La liste reste une suite de phrases sans relation structurée.",
      "fix_fr": "Utilise ul et li."
    },
    {
      "error": "Ajouter main pour chaque carte",
      "why_fr": "Le contenu principal est confondu avec ses sous-parties.",
      "fix_fr": "Garde un main et utilise section ou article selon le sens."
    }
  ],
  "quiz": [
    {
      "question": "Quel élément convient à des étapes successives ?",
      "options": [
        "ul dans tous les cas",
        "Un tableau de mise en page",
        "br",
        "ol"
      ],
      "answer": 3,
      "explanation": "ol encode une succession, tandis que ul encode un ensemble sans ordre essentiel.",
      "id": "html-m2-01-q1"
    },
    {
      "question": "Où se place une sous-liste ?",
      "options": [
        "Dans head.",
        "Dans un attribut.",
        "Dans le li auquel elle se rapporte.",
        "Après la fermeture de ul, toujours."
      ],
      "answer": 2,
      "explanation": "L’imbrication exprime la dépendance à une entrée précise.",
      "id": "html-m2-01-q2"
    },
    {
      "question": "Que garantit main ?",
      "options": [
        "Un fond blanc.",
        "Le rôle de contenu principal.",
        "Une colonne centrée.",
        "Une taille de police précise."
      ],
      "answer": 1,
      "explanation": "main possède une fonction sémantique ; la disposition appartient à CSS.",
      "id": "html-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "région",
      "definition": "Grande partie identifiable d’une page."
    },
    {
      "term": "sémantique",
      "definition": "Sens porté par le choix des éléments."
    },
    {
      "term": "imbrication",
      "definition": "Placement d’un élément à l’intérieur d’un autre."
    }
  ],
  "recap_fr": [
    "ul et ol répondent à des besoins distincts.",
    "li porte chaque entrée.",
    "Les régions expriment des fonctions sans imposer un style."
  ],
  "tags": [
    "html",
    "m2",
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

Une association présente souvent des activités, des étapes et des liens de navigation. Tout écrire dans des paragraphes séparés cache les relations entre ces informations. Une liste non ordonnée ul convient lorsque l’ordre n’est pas essentiel, comme une liste de matériel. Une liste ordonnée ol convient lorsque la succession compte, comme les étapes d’une inscription. Chaque élément de ces listes est un li. Les puces et numéros visibles ne doivent pas être tapés à la main.

Une liste peut contenir une autre liste, par exemple plusieurs détails pour une activité. La liste imbriquée se place à l’intérieur du li concerné. Elle ne devient pas sa sœur directe simplement parce qu’elle est indentée. Lis les balises fermantes pour comprendre cette relation. Pour commencer, garde des listes courtes et ne transforme pas toutes les phrases de la page en listes : un paragraphe reste adapté à une explication continue.

Les grandes régions donnent ensuite un cadre au document. header peut contenir l’introduction ou le titre de la page. nav regroupe une navigation importante. main contient le contenu principal ; notre page en possède un seul visible. footer accueille des informations de fin, comme un contact ou une mention. Ces noms ne créent pas automatiquement une disposition en colonnes. Ils expriment des rôles qui demeurent utiles lorsque les styles changent.

section rassemble une partie thématique, généralement accompagnée d’un titre. article convient à un contenu pouvant être compris ou réutilisé de façon autonome, comme une fiche d’atelier. Un div est un conteneur neutre utile lorsqu’aucun sens plus précis ne convient. Il n’est pas nécessaire de choisir une nouvelle section pour chaque petite boîte visuelle. Avant d’ajouter un élément, demande-toi quelle relation il exprime réellement pour un lecteur.

Dans les exercices, les adresses et les ateliers sont fictifs. Tu assembleras une navigation et des régions avant de travailler sur la décoration. Les tests contrôlent la présence des régions demandées, le nombre d’éléments et les liens de la navigation. Ils ne certifient pas à eux seuls toute l’accessibilité de la page. Termine en lisant les titres et les listes sans regarder l’apparence : les activités sont-elles distinguées des étapes ? Le contenu principal reste-t-il facile à identifier ? Cette relecture prépare le projet final.

## Exemple guidé 1

```html
<h2>À apporter</h2>
<ul><li>Gants</li><li>Gourde</li></ul>
<h2>Pour participer</h2>
<ol><li>Choisir un atelier</li><li>Remplir le formulaire</li></ol>
```

## Exemple guidé 2

```html
<header><h1>Graines ensemble</h1></header>
<nav aria-label="Principale"><a href="#ateliers">Ateliers</a></nav>
<main><section id="ateliers"><h2>Nos ateliers</h2><p>Une activité chaque samedi.</p></section></main>
<footer><p>Association fictive.</p></footer>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
