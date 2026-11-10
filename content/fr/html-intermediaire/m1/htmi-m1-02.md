---
{
  "id": "htmi-m1-02",
  "title_fr": "Choisir article ou section et construire un plan de titres",
  "course": "html-intermediaire",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "htmi-m1-01"
  ],
  "outcomes": [
    "Distinguer contenu autonome et regroupement thématique.",
    "Construire une hiérarchie explicite de titres cohérente avec les emboîtements."
  ],
  "idea_fr": "La structure traduit les relations entre les contenus ; les titres ne sont pas de simples tailles de texte.",
  "analogy_fr": "Une rubrique réunit plusieurs fiches, et une fiche peut contenir ses propres sous-parties sans devenir un nouveau livre.",
  "examples": [
    {
      "code": "<main>\n  <h1>Rencontres du club</h1>\n  <section aria-labelledby=\"titre-ateliers\">\n    <h2 id=\"titre-ateliers\">Ateliers proposés</h2>\n    <article><h3>Lecture partagée</h3><p>Lire un conte ensemble.</p></article>\n    <article><h3>Jardin collectif</h3><p>Observer des semis fictifs.</p></article>\n  </section>\n</main>",
      "expected_output": "Un h1 introduit la page ; une rubrique h2 contient deux fiches de niveau h3.",
      "inputs": [],
      "trace_fr": [
        "Le main possède le sujet général au niveau h1.",
        "La section nommée regroupe le thème des ateliers.",
        "Les deux articles sont des fiches sœurs, avec des h3 de même rang.",
        "Le plan reste compréhensible sans changer la taille visuelle des titres."
      ],
      "browser_test": {
        "description_fr": "Rubrique et fiches sœurs",
        "checks": [
          {
            "selector": "main > h1",
            "textIncludes": "Rencontres du club"
          },
          {
            "selector": "section > h2#titre-ateliers",
            "textIncludes": "Ateliers proposés"
          },
          {
            "selector": "section > article",
            "count": 2
          },
          {
            "selector": "section > article > h3",
            "count": 2
          }
        ]
      }
    },
    {
      "code": "<main>\n  <h1>Bulletin du quartier</h1>\n  <article id=\"actualite\">\n    <header><h2>Une bibliothèque de démonstration</h2></header>\n    <p>Le club prépare un espace fictif de lecture.</p>\n    <section>\n      <h3>Matériel prévu</h3>\n      <p>Des livres et des cahiers.</p>\n    </section>\n    <footer><p>Rédaction : équipe fictive du club.</p></footer>\n  </article>\n</main>",
      "expected_output": "Un article de bulletin possède une introduction, une sous-partie de matériel et un pied d’article.",
      "inputs": [],
      "trace_fr": [
        "Le h1 décrit le bulletin complet.",
        "L’article porte son propre sujet avec un h2 dans header.",
        "La section interne utilise h3 car elle dépend du sujet de cet article.",
        "Le footer appartient à l’article et indique sa rédaction fictive."
      ],
      "browser_test": {
        "description_fr": "Une sous-partie dans un article autonome",
        "checks": [
          {
            "selector": "article#actualite > header > h2",
            "textIncludes": "Une bibliothèque de démonstration"
          },
          {
            "selector": "#actualite > section > h3",
            "textIncludes": "Matériel prévu"
          },
          {
            "selector": "#actualite > footer p",
            "textIncludes": "Rédaction : équipe fictive du club."
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Choisir un rang pour sa taille",
      "why_fr": "La présentation dicte un plan trompeur.",
      "fix_fr": "Choisis le niveau de contenu puis règle la taille en CSS."
    },
    {
      "error": "Croire que article réinitialise les titres",
      "why_fr": "Des h1 répétés ne décrivent pas la hiérarchie souhaitée.",
      "fix_fr": "Écris les rangs cohérents explicitement."
    },
    {
      "error": "Utiliser section pour toute décoration",
      "why_fr": "Le thème et son titre manquent.",
      "fix_fr": "Garde une div pour un regroupement purement visuel."
    }
  ],
  "quiz": [
    {
      "question": "Quand article est-il un choix pertinent ?",
      "options": [
        "Pour toute boîte qui aura une bordure.",
        "Seulement pour un texte contenant une image.",
        "Pour imposer un nouveau h1 à chaque bloc.",
        "Pour un ensemble de contenu autonome et réutilisable avec son contexte essentiel."
      ],
      "answer": 3,
      "explanation": "L’autonomie du contenu guide ce choix sémantique.",
      "id": "htmi-m1-02-q1"
    },
    {
      "question": "Quel rang convient au titre d’une fiche sous une rubrique h2 dans ces exercices ?",
      "options": [
        "h6 pour rendre le texte petit.",
        "Un simple p sans rapport avec le plan.",
        "h3.",
        "h1 parce que article réinitialise toujours le plan."
      ],
      "answer": 2,
      "explanation": "Le rang décrit la dépendance à la rubrique, pas l’apparence.",
      "id": "htmi-m1-02-q2"
    },
    {
      "question": "Que représente le footer placé dans un article ?",
      "options": [
        "Un groupe de liens obligatoire.",
        "La conclusion ou des informations associées à cet article.",
        "Forcément le pied global du document.",
        "Un second contenu principal."
      ],
      "answer": 1,
      "explanation": "Le contexte d’emboîtement donne son sens à cet élément.",
      "id": "htmi-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "article",
      "definition": "Ensemble autonome de contenu pouvant être réutilisé ou distribué séparément."
    },
    {
      "term": "section",
      "definition": "Regroupement thématique au sein d’un document ou d’un article."
    },
    {
      "term": "rang de titre",
      "definition": "Niveau h1 à h6 indiquant une relation hiérarchique."
    },
    {
      "term": "plan de titres",
      "definition": "Organisation des sujets et sous-parties lue à partir des titres."
    }
  ],
  "recap_fr": [
    "Distinguer contenu autonome et regroupement thématique.",
    "Construire une hiérarchie explicite de titres cohérente avec les emboîtements.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "article",
    "section",
    "rang de titre",
    "plan de titres"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "environment_fr": "Document HTML réel, analysé et rendu dans une iframe isolée. Les contrôles inspectent éléments, textes et attributs. Les scripts, médias distants, envois de formulaire et activations de liens sont bloqués dans cet aperçu ; aucun service ni collecte réelle.",
  "references": [
    {
      "title": "WHATWG — Article, section et titres",
      "url": "https://html.spec.whatwg.org/multipage/sections.html"
    },
    {
      "title": "W3C WAI — Structure des régions",
      "url": "https://www.w3.org/WAI/tutorials/page-structure/regions/"
    }
  ],
  "sources": [
    {
      "title": "WHATWG — Article, section et titres",
      "url": "https://html.spec.whatwg.org/multipage/sections.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "W3C WAI — Structure des régions",
      "url": "https://www.w3.org/WAI/tutorials/page-structure/regions/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une page de club peut présenter plusieurs ateliers, un bulletin d’actualité et des informations pratiques. Toutes ces boîtes ne représentent pas le même type de contenu. Un article correspond à un ensemble autonome qui pourrait être réutilisé ou distribué séparément avec son contexte essentiel : une fiche d’atelier ou une nouvelle du bulletin. Une section regroupe un thème à l’intérieur d’un document ou d’un article. Son titre explique le sujet de ce regroupement.

Le choix dépend du sens, pas de la bordure ou du fond prévu en CSS. Deux colonnes purement visuelles peuvent être de simples div. À l’inverse, une rubrique « Ateliers proposés » reste une section même si elle n’a aucune décoration. Elle peut contenir des articles « Lecture » et « Jardin », chacun comprenant un titre et une description qui forment une fiche compréhensible. Leur appartenance à la rubrique reste visible dans le plan.

Les titres expriment les niveaux de cette organisation. Dans notre programme, h1 annonce le sujet de la page, h2 la rubrique et h3 les fiches qu’elle contient. Si une fiche possède une sous-partie « Matériel », celle-ci peut avoir un h4. Choisir h4 parce que son style paraît plus petit mélange la structure et la présentation. La taille visuelle se règle avec CSS ; le rang répond à la relation de contenu.

N’attends pas qu’un article ou une section réinitialise automatiquement le niveau d’un h1 pour les usages réels. Écris les rangs de titres de manière explicite et cohérente. Deux fiches sœurs ont le même rang. Une rubrique suivante au même niveau reprend un h2, elle ne continue pas forcément vers h5 parce que c’est le prochain nombre disponible. Le plan ressemble à une table des matières, pas à un compteur qui monte à chaque titre rencontré.

Un article peut avoir son propre header et son propre footer. Le premier rassemble son introduction et son titre ; le second peut indiquer sa rédaction fictive. Ces éléments décrivent l’article dans ce contexte. Ils ne deviennent pas un second en-tête global de page. L’exemple du bulletin montre aussi une section interne : l’article reste autonome tout en comportant une sous-partie de préparation.

Relis d’abord tous les titres sans leurs paragraphes. Peut-on expliquer où se trouvent les ateliers, quelles fiches appartiennent à leur rubrique et à quoi se rattache le matériel ? Ensuite, lis chaque article séparément. Si son sujet devient incompréhensible sans la fiche voisine, le choix d’un article autonome mérite d’être réexaminé. Un groupe thématique n’a pas toujours besoin de devenir une fiche indépendante.

Les exercices comparent les éléments, les rangs et leurs relations, sans imposer une apparence. Les textes et rubriques attendus sont précisés pour rendre ces relations observables. Les contrôles n’évaluent pas toute la qualité éditoriale : il reste à vérifier que chaque titre annonce honnêtement le contenu. Aucun plan de page ne garantit à lui seul l’accessibilité ; il fournit une base à examiner et à utiliser.

## Exemple guidé 1

```html
<main>
  <h1>Rencontres du club</h1>
  <section aria-labelledby="titre-ateliers">
    <h2 id="titre-ateliers">Ateliers proposés</h2>
    <article><h3>Lecture partagée</h3><p>Lire un conte ensemble.</p></article>
    <article><h3>Jardin collectif</h3><p>Observer des semis fictifs.</p></article>
  </section>
</main>
```

Résultat attendu : Un h1 introduit la page ; une rubrique h2 contient deux fiches de niveau h3.

Trace :

- Le main possède le sujet général au niveau h1.
- La section nommée regroupe le thème des ateliers.
- Les deux articles sont des fiches sœurs, avec des h3 de même rang.
- Le plan reste compréhensible sans changer la taille visuelle des titres.

## Exemple guidé 2

```html
<main>
  <h1>Bulletin du quartier</h1>
  <article id="actualite">
    <header><h2>Une bibliothèque de démonstration</h2></header>
    <p>Le club prépare un espace fictif de lecture.</p>
    <section>
      <h3>Matériel prévu</h3>
      <p>Des livres et des cahiers.</p>
    </section>
    <footer><p>Rédaction : équipe fictive du club.</p></footer>
  </article>
</main>
```

Résultat attendu : Un article de bulletin possède une introduction, une sous-partie de matériel et un pied d’article.

Trace :

- Le h1 décrit le bulletin complet.
- L’article porte son propre sujet avec un h2 dans header.
- La section interne utilise h3 car elle dépend du sujet de cet article.
- Le footer appartient à l’article et indique sa rédaction fictive.

## Vérifier et expliquer

Inspecte les relations du document et relis ses intitulés. Dans un document autonome, examine aussi le clavier et les destinations ; l’aperçu bloque les activations de liens.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [WHATWG — Article, section et titres](https://html.spec.whatwg.org/multipage/sections.html)
- [W3C WAI — Structure des régions](https://www.w3.org/WAI/tutorials/page-structure/regions/)
