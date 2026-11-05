---
{
  "id": "css-m2-02",
  "title_fr": "Combiner unités relatives et limites de largeur",
  "course": "css-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "css-m2-01"
  ],
  "outcomes": [
    "Calculer des dimensions simples en rem et pourcentage.",
    "Limiter une largeur sans couper le contenu."
  ],
  "idea_fr": "Une taille adaptable dépend de son contexte et possède parfois une limite supérieure.",
  "analogy_fr": "Une étagère peut prendre la largeur disponible tout en gardant une largeur maximale pour rester pratique.",
  "examples": [
    {
      "code": "html { font-size:16px; }\n.carte { padding:1rem; max-width:20rem; box-sizing:border-box; }",
      "expected_output": "Le padding vaut 16px et la largeur maximale 320px.",
      "trace_fr": [
        "rem utilise ici la racine de 16px.",
        "20 × 16 donne 320px."
      ],
      "inputs": [],
      "fixture_html": "<style>.cadre{width:400px;max-width:100%}</style><div class=\"cadre\"><article class=\"carte\"><h2>Semis</h2><p>Un texte de démonstration assez long pour lire la largeur de la carte.</p></article></div>"
    },
    {
      "code": ".carte { width:50%; box-sizing:border-box; }",
      "expected_output": "Dans le cadre fourni de 400px, la carte mesure 200px.",
      "trace_fr": [
        "Le pourcentage se rapporte au cadre contenant.",
        "La fenêtre peut être plus large sans changer cette mesure du cadre."
      ],
      "inputs": [],
      "fixture_html": "<style>.cadre{width:400px;max-width:100%}</style><div class=\"cadre\"><article class=\"carte\"><h2>Semis</h2><p>Un texte de démonstration assez long pour lire la largeur de la carte.</p></article></div>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre pourcentage et largeur de fenêtre",
      "why_fr": "Le bloc contenant est oublié.",
      "fix_fr": "Identifie d’abord le parent de référence."
    },
    {
      "error": "Forcer une hauteur pour aligner",
      "why_fr": "Le texte plus grand n’a plus de place.",
      "fix_fr": "Laisse le contenu déterminer la hauteur quand c’est possible."
    }
  ],
  "quiz": [
    {
      "question": "Quelle référence utilise rem ?",
      "options": [
        "Toujours la largeur de l’écran.",
        "Le dernier paragraphe.",
        "Le nombre de cartes.",
        "La taille de police de l’élément racine."
      ],
      "answer": 3,
      "explanation": "rem se rapporte à la racine ; cette référence peut varier avec les réglages.",
      "id": "css-m2-02-q1"
    },
    {
      "question": "Une carte width:50% dans un cadre de 400px mesure ici…",
      "options": [
        "400px.",
        "La moitié de chaque écran sans regarder le parent.",
        "200px.",
        "50px."
      ],
      "answer": 2,
      "explanation": "Le pourcentage prend ici le bloc contenant comme référence.",
      "id": "css-m2-02-q2"
    },
    {
      "question": "Quel risque porte une petite hauteur fixe avec overflow:hidden ?",
      "options": [
        "La largeur se double toujours.",
        "Du texte peut devenir invisible quand il grossit.",
        "Le texte est automatiquement traduit.",
        "La page devient forcément accessible."
      ],
      "answer": 1,
      "explanation": "La taille du contenu doit pouvoir évoluer ; une boîte trop petite peut le couper.",
      "id": "css-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "unité relative",
      "definition": "Mesure définie par rapport à une autre grandeur."
    },
    {
      "term": "racine",
      "definition": "Élément html servant notamment de référence à rem."
    },
    {
      "term": "largeur maximale",
      "definition": "Limite au-delà de laquelle une boîte ne s’agrandit plus."
    }
  ],
  "recap_fr": [
    "Les unités possèdent une référence.",
    "width et max-width peuvent se combiner.",
    "Le contenu doit pouvoir grandir."
  ],
  "tags": [
    "css",
    "m2",
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

Une carte parfaitement ajustée à ton ordinateur peut déborder sur un téléphone. Pour l’éviter, il faut comprendre ce que mesurent les unités et quels éléments servent de référence. Les pixels CSS donnent une mesure de mise en page ; ils ne correspondent pas toujours à un pixel physique de l’écran. Les unités relatives permettent d’exprimer une relation, par exemple avec la taille du texte ou l’espace disponible dans un conteneur.

rem se rapporte à la taille de police de l’élément racine, généralement html. Avec une racine fixée à 16px dans notre exercice, 1rem vaut 16px et 2rem valent 32px. em dépend de la taille de police de l’élément pour de nombreuses propriétés ; son usage dans font-size dépend de la taille héritée. Pour cette première approche, utilise surtout rem pour des espaces cohérents et ne suppose pas que les préférences réelles de tous les navigateurs sont identiques à notre mesure de test.

Une largeur en pourcentage se rapporte généralement à la largeur du bloc contenant. Si .cadre mesure 400px, width:50% donne ici 200px à la carte avec la convention prévue. Il faut donc lire le parent, pas seulement la fenêtre. width:100% avec box-sizing:border-box peut remplir l’espace sans ajouter padding et bordure au-delà de la largeur annoncée. Une largeur fixe trop grande ou une hauteur fixe trop petite peut couper le contenu lorsque le texte grossit.

max-width fixe une limite supérieure. La combinaison width:100% et max-width:32rem permet à une carte de prendre la largeur disponible tout en s’arrêtant à une taille raisonnable. Des marges horizontales auto peuvent la centrer dans son conteneur. Pour les images, max-width:100% et height:auto aident à conserver les proportions sans dépasser la place disponible. Cette adaptation ne résout pas toutes les situations, mais elle prépare une page qui respecte mieux les petits écrans.

Les exercices fixent parfois la largeur d’un cadre et la taille racine pour obtenir des calculs reproductibles. Ces choix de laboratoire ne doivent pas devenir des contraintes imposées à chaque vrai utilisateur. Prédis d’abord une dimension, puis compare le style calculé et l’aperçu. Agrandis ensuite le texte et réduis la largeur. Vérifie que le contenu reste lisible, qu’il ne disparaît pas derrière une hauteur forcée et qu’une barre de défilement horizontale inutile ne remplace pas une adaptation possible.

## Exemple guidé 1

```css
html { font-size:16px; }
.carte { padding:1rem; max-width:20rem; box-sizing:border-box; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.carte { width:50%; box-sizing:border-box; }
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
