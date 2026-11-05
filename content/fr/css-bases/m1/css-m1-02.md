---
{
  "id": "css-m1-02",
  "title_fr": "Comprendre cascade, spécificité et héritage",
  "course": "css-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "css-m1-01"
  ],
  "outcomes": [
    "Expliquer un conflit simple entre type et classe.",
    "Distinguer cascade et héritage."
  ],
  "idea_fr": "Le navigateur choisit une déclaration selon la cascade ; certaines propriétés peuvent aussi être héritées.",
  "analogy_fr": "La cascade ressemble à des consignes classées par priorité : la dernière n’est décisive que lorsque les priorités précédentes sont égales.",
  "examples": [
    {
      "code": "p { color: navy; }\n.intro { color: green; }\np { color: maroon; }",
      "expected_output": "intro est vert ; les autres p sont bordeaux.",
      "trace_fr": [
        ".intro est plus spécifique que p dans ces règles ordinaires.",
        "Les deux règles p ont la même spécificité : la dernière gagne pour color."
      ],
      "inputs": [],
      "fixture_html": "<main><h1>Le jardin</h1><p class=\"intro\">Bienvenue au jardin fictif.</p><p>Une activité par semaine.</p><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></main>"
    },
    {
      "code": "main { color: navy; border: 2px solid green; }\n.intro { color: green; }",
      "expected_output": "Les textes héritent du bleu marine sauf intro ; la bordure appartient seulement à main.",
      "trace_fr": [
        "color est normalement hérité.",
        ".intro reçoit une couleur directement.",
        "border ne se propage pas normalement aux paragraphes."
      ],
      "inputs": [],
      "fixture_html": "<main><h1>Le jardin</h1><p class=\"intro\">Bienvenue au jardin fictif.</p><p>Une activité par semaine.</p><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire que la dernière règle gagne toujours",
      "why_fr": "Les autres priorités sont ignorées.",
      "fix_fr": "Compare d’abord le cadre de cascade et la spécificité."
    },
    {
      "error": "Attendre une bordure sur tous les enfants",
      "why_fr": "L’héritage est généralisé à toutes les propriétés.",
      "fix_fr": "Vérifie si la propriété est héritée."
    }
  ],
  "quiz": [
    {
      "question": "Dans ce cadre, quand l’ordre départage-t-il deux règles ?",
      "options": [
        "Dès qu’une ligne est plus courte.",
        "Toujours avant la spécificité.",
        "Uniquement si les sélecteurs sont des ids.",
        "Lorsqu’elles ont notamment la même spécificité et la même priorité de cascade."
      ],
      "answer": 3,
      "explanation": "L’ordre est un critère de départage après d’autres priorités ; la leçon limite volontairement le contexte.",
      "id": "css-m1-02-q1"
    },
    {
      "question": "Quelle propriété s’hérite normalement ?",
      "options": [
        "margin-top",
        "padding-left",
        "color",
        "border-top-width"
      ],
      "answer": 2,
      "explanation": "La couleur du texte peut être héritée ; les espaces et bordures ne le sont pas normalement.",
      "id": "css-m1-02-q2"
    },
    {
      "question": "Une nouvelle règle efface-t-elle toutes les propriétés d’une ancienne règle ?",
      "options": [
        "Oui, après un commentaire.",
        "Non, les déclarations sont arbitrées propriété par propriété.",
        "Oui, toutes.",
        "Oui, si le sélecteur est court."
      ],
      "answer": 1,
      "explanation": "Une règle peut fournir color et une autre font-weight sans supprimer la première propriété.",
      "id": "css-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "cascade",
      "definition": "Mécanisme de choix des déclarations applicables."
    },
    {
      "term": "spécificité",
      "definition": "Priorité liée à la composition d’un sélecteur."
    },
    {
      "term": "héritage",
      "definition": "Transmission de certaines valeurs du parent à l’enfant."
    }
  ],
  "recap_fr": [
    "L’ordre ne décide pas de tous les conflits.",
    "L’arbitrage est fait par propriété.",
    "Seules certaines propriétés s’héritent normalement."
  ],
  "tags": [
    "css",
    "m1",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "references": [
    {
      "title": "W3C — cascade et héritage",
      "url": "https://www.w3.org/TR/css-cascade-5/"
    },
    {
      "title": "W3C — modèle de boîte",
      "url": "https://www.w3.org/TR/css-box-3/"
    },
    {
      "title": "W3C — Flexbox",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    },
    {
      "title": "W3C — Grid",
      "url": "https://www.w3.org/TR/css-grid-1/"
    },
    {
      "title": "W3C — requêtes de média",
      "url": "https://www.w3.org/TR/mediaqueries-5/"
    }
  ],
  "technical_scope_fr": "CSS, sous-ensemble débutant des modules cités ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

Deux règles peuvent demander des couleurs différentes pour le même paragraphe. Le navigateur doit décider laquelle s’applique. Cet arbitrage s’appelle la cascade. Il ne se résume pas à « la dernière ligne gagne » : plusieurs critères interviennent. Dans cette leçon, nous comparons des règles ordinaires de la même feuille, sans couches de cascade, animation ni déclaration importante. Ce cadre réduit permet de comprendre les premiers conflits sans apprendre tous les cas avancés.

La spécificité mesure une partie de la précision d’un sélecteur. Dans notre cadre, une classe comme .intro l’emporte sur un sélecteur de type comme p. Un identifiant possède une priorité plus élevée qu’une classe. Plusieurs sélecteurs se comparent selon leurs composantes ; ce n’est pas un simple total de points interchangeables. Si deux règles ont la même spécificité dans ce cadre, celle placée plus tard départage le conflit pour la propriété concernée.

La décision se fait propriété par propriété. Une règle peut fournir la couleur et une autre la graisse du texte ; la seconde n’efface pas nécessairement la première. C’est pourquoi ajouter une nouvelle règle ne remplace pas automatiquement toute la présentation précédente. Avant de corriger, trouve l’élément concerné, repère les déclarations de la propriété et compare leurs priorités. Ajouter des sélecteurs toujours plus longs rend souvent la prochaine correction plus difficile.

L’héritage est un autre mécanisme. Certaines propriétés, comme color, se transmettent normalement du parent à l’enfant lorsqu’aucune valeur plus directe ne s’y oppose. D’autres, comme border, ne s’héritent pas normalement. Donner une bordure à main n’en donne donc pas une à chaque paragraphe. Une propriété héritée est une valeur de repli ; une règle qui s’applique directement à l’enfant peut définir une autre valeur. La valeur inherit permet de demander explicitement celle du parent lorsque c’est utile.

Prédis les couleurs des exemples avant de lancer l’aperçu. Dans les activités, les tests inspectent aussi des propriétés qui ne doivent pas se propager. Tu n’as pas besoin d’utiliser !important pour réussir. Préfère une règle simple placée au bon niveau et supprime les conflits inutiles. Explique enfin la provenance de chaque valeur : règle directe, départage entre deux règles ou héritage. Cette explication est plus utile que mémoriser une couleur aperçue une fois.

## Exemple guidé 1

```css
p { color: navy; }
.intro { color: green; }
p { color: maroon; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
main { color: navy; border: 2px solid green; }
.intro { color: green; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Vérifier et expliquer

Observe l’aperçu à petite et grande largeur, puis parcours les contrôles avec Tab. Explique la règle qui produit chaque résultat. Les tests de style ne remplacent pas la revue de lisibilité et d’usage.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [W3C — cascade et héritage](https://www.w3.org/TR/css-cascade-5/)
- [W3C — modèle de boîte](https://www.w3.org/TR/css-box-3/)
- [W3C — Flexbox](https://www.w3.org/TR/css-flexbox-1/)
- [W3C — Grid](https://www.w3.org/TR/css-grid-1/)
- [W3C — requêtes de média](https://www.w3.org/TR/mediaqueries-5/)
