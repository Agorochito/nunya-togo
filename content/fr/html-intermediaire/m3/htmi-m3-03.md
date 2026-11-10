---
{
  "id": "htmi-m3-03",
  "title_fr": "Préparer des images utiles et autonomes",
  "course": "html-intermediaire",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m3-02"
  ],
  "outcomes": [
    "Choisir un texte alternatif selon le rôle de l’image dans son contexte.",
    "Prévoir dimensions, légende et stratégie de chargement sans dépendance distante."
  ],
  "idea_fr": "Une image utile possède un rôle, une place prévisible et une alternative adaptée à son message.",
  "analogy_fr": "Un document illustré distingue le message porté par le dessin, sa légende de contexte et l’espace réservé à son impression.",
  "examples": [
    {
      "code": "<figure id=\"schema\">\n  <img id=\"plan\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNGYxZTgiLz48cmVjdCB4PSI0MCIgeT0iNzAiIHdpZHRoPSIxMzAiIGhlaWdodD0iOTAiIGZpbGw9IiMyODYzNGQiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSI4MCIgcj0iNDUiIGZpbGw9IiNiMjZiMjgiLz48cGF0aCBkPSJNMjIwIDE3MEwyODAgMTEwTDM0MCAxNzBaIiBmaWxsPSIjMjg2MzRkIi8+PC9zdmc+\" width=\"400\" height=\"200\" alt=\"Potager à gauche, espace de rencontre circulaire à droite\">\n  <figcaption>Plan simplifié et fictif du jardin du club.</figcaption>\n</figure>\n",
      "expected_output": "Une figure contient un plan autonome, son alternative et une légende de contexte fictif.",
      "trace_fr": [
        "Le src embarque le SVG : le dessin ne dépend pas d’une ressource distante.",
        "width et height réservent le rapport 400/200 ; alt décrit la relation utile.",
        "figcaption précise le contexte sans remplacer l’alternative."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Figure et information du plan",
        "checks": [
          {
            "selector": "#schema > img#plan[src^=\"data:image/svg+xml;base64,\"]",
            "attributes": {
              "width": "400",
              "height": "200",
              "alt": "Potager à gauche, espace de rencontre circulaire à droite"
            }
          },
          {
            "selector": "#schema > figcaption",
            "textIncludes": "fictif"
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<main>\n  <h1>Le jardin du club</h1>\n  <img id=\"motif\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNGYxZTgiLz48cmVjdCB4PSI0MCIgeT0iNzAiIHdpZHRoPSIxMzAiIGhlaWdodD0iOTAiIGZpbGw9IiMyODYzNGQiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSI4MCIgcj0iNDUiIGZpbGw9IiNiMjZiMjgiLz48cGF0aCBkPSJNMjIwIDE3MEwyODAgMTEwTDM0MCAxNzBaIiBmaWxsPSIjMjg2MzRkIi8+PC9zdmc+\" width=\"400\" height=\"200\" alt=\"\">\n  <p>Les formes ci-dessus sont un motif décoratif.</p>\n</main>\n",
      "expected_output": "Le même dessin est décoratif dans ce contexte et possède une alternative vide explicite.",
      "trace_fr": [
        "Le titre et le paragraphe portent ici toute l’information utile.",
        "alt=\"\" est présent : ce n’est pas une absence d’attribut.",
        "Le document annonce le rôle décoratif ; aucun lien ni action n’est attaché au motif."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Une décoration assumée",
        "checks": [
          {
            "selector": "#motif[src^=\"data:image/svg+xml;base64,\"]",
            "attributes": {
              "alt": "",
              "width": "400",
              "height": "200"
            }
          },
          {
            "selector": "main p",
            "textIncludes": "décoratif"
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Faire de figcaption le remplacement systématique de alt",
      "why_fr": "Le contexte de la figure ne transmet pas toujours l’information visuelle.",
      "fix_fr": "Répartis message de l’image et contexte de la légende."
    },
    {
      "error": "Différer toutes les images",
      "why_fr": "Le visuel nécessaire immédiatement peut perdre sa priorité.",
      "fix_fr": "Choisis lazy pour les compléments et garde le principal prioritaire."
    }
  ],
  "quiz": [
    {
      "question": "Quand alt=\"\" est-il adapté ?",
      "options": [
        "Quand on ne connaît pas le fichier.",
        "Quand le dessin est uniquement décoratif dans son contexte.",
        "Pour toutes les images lazy.",
        "Pour éviter d’écrire une légende."
      ],
      "answer": 1,
      "explanation": "L’alternative vide est un choix de rôle ; elle ne dépend pas de la stratégie de chargement.",
      "id": "htmi-m3-03-q1"
    },
    {
      "question": "Que font width=\"400\" et height=\"200\" ?",
      "options": [
        "Ils assurent une largeur fluide dans toutes les fenêtres.",
        "Ils compressent le fichier.",
        "Ils indiquent dimensions et proportions de référence.",
        "Ils prouvent que le dessin est accessible."
      ],
      "answer": 2,
      "explanation": "Les dimensions aident à prévoir la place ; CSS et la relecture du contenu restent nécessaires.",
      "id": "htmi-m3-03-q2"
    },
    {
      "question": "Que prouve loading=\"lazy\" dans cet aperçu embarqué ?",
      "options": [
        "Une baisse de trafic mesurée.",
        "Un chargement interdit avant défilement.",
        "Une absence d’alternative.",
        "Une stratégie déclarée que le navigateur peut appliquer."
      ],
      "answer": 3,
      "explanation": "Le navigateur conserve ses décisions de chargement ; la donnée embarquée ne démontre pas une économie réseau.",
      "id": "htmi-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "alternative textuelle",
      "definition": "Texte transmettant la fonction ou l’information utile d’une image dans son contexte."
    },
    {
      "term": "rapport de dimensions",
      "definition": "Relation entre largeur et hauteur utilisée pour conserver les proportions."
    },
    {
      "term": "chargement différé",
      "definition": "Stratégie permettant au navigateur de reporter une image non prioritaire."
    }
  ],
  "recap_fr": [
    "Le même fichier peut être informatif ou décoratif selon son contexte.",
    "Dimensions et légende complètent le rôle de alt.",
    "lazy décrit une stratégie, pas une garantie de chronologie."
  ],
  "tags": [
    "html",
    "m3",
    "intermédiaire"
  ],
  "environment_fr": "Aperçu isolé dans le navigateur, sans scripts élèves, réseau ni envoi de formulaire. Données fictives ; images SVG embarquées lorsqu’elles sont nécessaires. Les tests inspectent le DOM et les styles calculés aux dimensions indiquées.",
  "technical_checked_on": "2026-11-07",
  "sources": [
    {
      "title": "MDN — img",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/img",
      "scope": "Texte alternatif, dimensions, loading et disponibilité des images."
    },
    {
      "title": "WHATWG — Images",
      "url": "https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element",
      "scope": "Rôle du texte alternatif et attributs de l’image."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Ajouter une image ne se résume pas à fournir une adresse. Le document doit expliquer son rôle, prévoir l’espace qu’elle occupe et rester compréhensible lorsque son contenu visuel n’est pas disponible. Dans cette leçon, le dessin est un SVG embarqué dans une URL de données : aucun fichier externe n’est nécessaire. Il représente des formes simples utilisées comme plan fictif ou comme décoration selon le contexte. Ce choix permet de travailler hors ligne sans prétendre afficher une photographie réelle du club.

alt fournit une alternative textuelle dépendant du message de l’image. Pour le plan simplifié, « Potager à gauche, espace de rencontre circulaire à droite » transmet une relation utile. Une description de tous les pixels serait moins pertinente. Évite aussi « image de » répété sans information. Si le même dessin sert uniquement de motif et n’ajoute rien au texte, alt="" annonce cette absence d’information à restituer. Omettre alt n’exprime pas le même choix et peut conduire à l’annonce d’un nom de fichier ou d’une adresse peu utile.

figure rassemble un contenu autonome et sa légende éventuelle figcaption. La légende peut donner le contexte, la nature fictive du document ou une réserve sur sa précision. Elle ne remplace pas automatiquement l’alternative de l’image : le lecteur peut avoir besoin de savoir ce que montre le dessin, en plus de connaître sa provenance. Inversement, recopier exactement une longue légende dans alt crée souvent une répétition inutile. Répartis les informations selon leur fonction.

Les attributs width et height indiquent les dimensions de référence en nombres entiers, sans unité px. Pour notre SVG de quatre cents sur deux cents, ils expriment un rapport de deux pour un. Le navigateur peut prévoir un espace cohérent avant l’affichage de l’image, ce qui réduit les changements de mise en page. Ces attributs ne suffisent pas à rendre l’image fluide sur toutes les largeurs : une feuille CSS pourra ensuite limiter sa taille en conservant ses proportions.

loading="lazy" permet de différer une image non prioritaire selon les décisions du navigateur. Il ne signifie ni « invisible » ni « jamais chargée avant défilement ». Pour un visuel principal nécessaire immédiatement, garde le comportement normal ou demande eager. Dans notre aperçu, les images sont déjà embarquées et aucune économie réseau réelle n’est démontrée ; les exercices vérifient la stratégie déclarée, pas une chronologie de téléchargement.

Lis les exemples comme des documents complets : qu’apporte le dessin, que précise la légende, et que saurait une personne qui ne voit que le texte ? Les tests inspectent la source embarquée, les dimensions et les alternatives attendues. Ils ne peuvent pas juger automatiquement toute la pertinence éditoriale d’un alt. Cette relecture humaine reste essentielle, notamment lorsque le même fichier change de rôle entre une information principale et une simple décoration.

## Exemple guidé 1

```html
<figure id="schema">
  <img id="plan" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNGYxZTgiLz48cmVjdCB4PSI0MCIgeT0iNzAiIHdpZHRoPSIxMzAiIGhlaWdodD0iOTAiIGZpbGw9IiMyODYzNGQiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSI4MCIgcj0iNDUiIGZpbGw9IiNiMjZiMjgiLz48cGF0aCBkPSJNMjIwIDE3MEwyODAgMTEwTDM0MCAxNzBaIiBmaWxsPSIjMjg2MzRkIi8+PC9zdmc+" width="400" height="200" alt="Potager à gauche, espace de rencontre circulaire à droite">
  <figcaption>Plan simplifié et fictif du jardin du club.</figcaption>
</figure>
```

## Exemple guidé 2

```html
<main>
  <h1>Le jardin du club</h1>
  <img id="motif" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNGYxZTgiLz48cmVjdCB4PSI0MCIgeT0iNzAiIHdpZHRoPSIxMzAiIGhlaWdodD0iOTAiIGZpbGw9IiMyODYzNGQiLz48Y2lyY2xlIGN4PSIyODAiIGN5PSI4MCIgcj0iNDUiIGZpbGw9IiNiMjZiMjgiLz48cGF0aCBkPSJNMjIwIDE3MEwyODAgMTEwTDM0MCAxNzBaIiBmaWxsPSIjMjg2MzRkIi8+PC9zdmc+" width="400" height="200" alt="">
  <p>Les formes ci-dessus sont un motif décoratif.</p>
</main>
```
