---
{
  "id": "css-m3-02",
  "title_fr": "Composer une grille de cartes avec Grid",
  "course": "css-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "css-m3-01"
  ],
  "outcomes": [
    "Créer une grille de cartes à deux colonnes.",
    "Expliquer la largeur des pistes et leur écart."
  ],
  "idea_fr": "Grid définit des pistes de lignes et de colonnes pour organiser une composition en deux dimensions.",
  "analogy_fr": "Une grille de rangement définit ses cases avant de répartir les objets, tout en gardant un ordre de lecture.",
  "examples": [
    {
      "code": ".grille { display:grid; width:600px; gap:16px; grid-template-columns:repeat(2, minmax(0, 1fr)); }",
      "expected_output": "Deux colonnes de 292px séparées par 16px, puis une seconde ligne.",
      "trace_fr": [
        "600 moins 16 laisse 584px.",
        "Les deux pistes se partagent cette largeur à parts égales."
      ],
      "inputs": [],
      "fixture_html": "<div class=\"grille\"><article class=\"carte\">Semis</article><article class=\"carte\">Compost</article><article class=\"carte\">Arrosage</article><article class=\"carte\">Récolte</article></div>"
    },
    {
      "code": ".grille { display:grid; width:600px; gap:16px; grid-template-columns:1fr 2fr; }",
      "expected_output": "Avec les textes courts fournis, les pistes se partagent l’espace disponible selon une proportion de un à deux.",
      "trace_fr": [
        "gap est retiré avant le partage de l’espace flexible.",
        "La deuxième colonne reçoit deux parts au lieu d’une."
      ],
      "inputs": [],
      "fixture_html": "<div class=\"grille\"><article class=\"carte\">Semis</article><article class=\"carte\">Compost</article><article class=\"carte\">Arrosage</article><article class=\"carte\">Récolte</article></div>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier les écarts dans le calcul",
      "why_fr": "Les colonnes sont supposées prendre toute la largeur chacune.",
      "fix_fr": "Retire les gouttières avant le partage."
    },
    {
      "error": "Réordonner les cartes pour dessiner",
      "why_fr": "La lecture logique diverge de la vue.",
      "fix_fr": "Conserve l’ordre source autant que possible."
    }
  ],
  "quiz": [
    {
      "question": "Que mesure fr ?",
      "options": [
        "Un nombre fixe de pixels.",
        "Toujours un pour cent de la fenêtre.",
        "La taille d’un caractère français.",
        "Une part de l’espace flexible disponible."
      ],
      "answer": 3,
      "explanation": "Le calcul tient compte notamment des pistes et des écarts ; fr n’est pas un pourcentage universel.",
      "id": "css-m3-02-q1"
    },
    {
      "question": "Dans 600px avec deux colonnes égales et gap:16px, quelle largeur obtient chaque piste ici ?",
      "options": [
        "316px.",
        "584px.",
        "292px.",
        "300px."
      ],
      "answer": 2,
      "explanation": "On retire l’écart puis on divise : (600 − 16) / 2 = 292.",
      "id": "css-m3-02-q2"
    },
    {
      "question": "Que fait repeat(2,1fr) ?",
      "options": [
        "Il anime deux cartes.",
        "Il répète deux fois la description de piste 1fr.",
        "Il duplique le HTML.",
        "Il crée toujours deux lignes."
      ],
      "answer": 1,
      "explanation": "repeat est une écriture de pistes ; les éléments HTML restent inchangés.",
      "id": "css-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "piste",
      "definition": "Bande de ligne ou de colonne d’une grille."
    },
    {
      "term": "fr",
      "definition": "Unité représentant une part d’espace flexible."
    },
    {
      "term": "auto-placement",
      "definition": "Placement des éléments selon les règles de la grille et leur ordre."
    }
  ],
  "recap_fr": [
    "Grid décrit lignes et colonnes.",
    "fr partage un espace flexible.",
    "Les cartes gardent leur ordre logique."
  ],
  "tags": [
    "css",
    "m3",
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

La page possède quatre fiches d’atelier. Une grille avec des colonnes alignées facilite leur comparaison. CSS Grid permet de définir des pistes de colonnes et de lignes dans un conteneur. Il se distingue de Flexbox par son contrôle direct de ces deux dimensions, même si les deux systèmes peuvent résoudre certains problèmes proches. Choisis le mécanisme qui rend la disposition simple à expliquer ; il n’est pas nécessaire de remplacer systématiquement l’un par l’autre.

display:grid active le système sur le conteneur. grid-template-columns décrit les pistes de colonnes. Dans une boîte de 600px, deux colonnes 1fr 1fr avec un écart de 16px se partagent ici les 584px restants : chacune mesure 292px. fr représente une part de l’espace flexible disponible, après certains calculs de taille. Ce n’est pas simplement un pourcentage de la largeur totale. Le contenu peut imposer des tailles minimales dans d’autres situations.

repeat(2, 1fr) répète deux fois la même description de piste. Il s’agit d’une écriture pratique, pas d’un autre type de grille. gap fournit les espaces entre pistes. Les enfants directs sont placés automatiquement dans l’ordre du document, ligne après ligne dans notre configuration. Quatre cartes produisent donc deux lignes de deux cartes. Le navigateur peut créer les lignes nécessaires sans que tu écrives une ligne de CSS pour chaque carte.

Pour des contenus susceptibles de déborder, minmax(0, 1fr) permet ici à la limite minimale d’une piste flexible de descendre à zéro. Cela ne rend pas automatiquement tous les contenus sécables : une longue adresse peut encore demander une règle de coupure. Nous utilisons des noms courts pour comprendre le partage des pistes, puis nous testons un texte plus long pendant la revue. Une carte qui dépasse n’est pas un simple défaut esthétique ; elle peut empêcher de lire une information.

Les exercices fixent la largeur de la grille afin de vérifier un calcul reproductible. Leur code peut utiliser repeat ou une liste de pistes équivalente, car les tests lisent les dimensions calculées. Ne change pas l’ordre des fiches pour obtenir un dessin : garde une séquence logique et laisse l’auto-placement travailler. Après les tests, lis les cartes dans l’ordre et réduis la largeur. La leçon suivante ajoutera une condition de largeur pour passer à une colonne lorsque deux deviennent trop étroites.

## Exemple guidé 1

```css
.grille { display:grid; width:600px; gap:16px; grid-template-columns:repeat(2, minmax(0, 1fr)); }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.grille { display:grid; width:600px; gap:16px; grid-template-columns:1fr 2fr; }
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
