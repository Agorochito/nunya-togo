---
{
  "id": "css-m2-01",
  "title_fr": "Mesurer une boîte et distinguer ses espaces",
  "course": "css-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "css-m1-03"
  ],
  "outcomes": [
    "Calculer une largeur simple de boîte.",
    "Choisir des espaces intérieurs et extérieurs adaptés."
  ],
  "idea_fr": "Une boîte CSS possède un contenu, un espace intérieur, une bordure et un espace extérieur.",
  "analogy_fr": "Le contenu est un objet dans une boîte : padding est la protection intérieure, border la paroi et margin la distance avec les autres boîtes.",
  "examples": [
    {
      "code": ".carte { width:200px; padding:16px; border:2px solid navy; box-sizing:content-box; }",
      "expected_output": "La boîte mesure 236px de large hors marges : 200 + 32 + 4.",
      "trace_fr": [
        "width mesure le contenu dans content-box.",
        "Deux paddings de 16 et deux bordures de 2 s’ajoutent."
      ],
      "inputs": [],
      "fixture_html": "<div class=\"cadre\"><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></div>"
    },
    {
      "code": ".carte { width:200px; padding:16px; border:2px solid navy; box-sizing:border-box; }",
      "expected_output": "La largeur extérieure de la bordure est 200px ; le contenu dispose de 164px.",
      "trace_fr": [
        "border-box inclut padding et border dans width.",
        "200 moins 32 moins 4 laisse 164px au contenu."
      ],
      "inputs": [],
      "fixture_html": "<div class=\"cadre\"><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></div>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Inverser padding et margin",
      "why_fr": "Les zones intérieures et extérieures sont confondues.",
      "fix_fr": "Identifie d’abord les deux bords à séparer."
    },
    {
      "error": "Additionner toutes les marges verticales",
      "why_fr": "Certaines marges de blocs fusionnent.",
      "fix_fr": "Vérifie la disposition réelle avant de conclure."
    }
  ],
  "quiz": [
    {
      "question": "Avec content-box, que mesure width ?",
      "options": [
        "Toujours la largeur avec marges.",
        "La hauteur du paragraphe.",
        "Seulement la bordure.",
        "La largeur du contenu."
      ],
      "answer": 3,
      "explanation": "Padding et bordure s’ajoutent normalement à la largeur de contenu.",
      "id": "css-m2-01-q1"
    },
    {
      "question": "Quel espace est intérieur à la bordure ?",
      "options": [
        "outline-offset",
        "gap dans tous les cas",
        "padding",
        "margin"
      ],
      "answer": 2,
      "explanation": "padding sépare le contenu de sa bordure ; margin est extérieur.",
      "id": "css-m2-01-q2"
    },
    {
      "question": "Pourquoi border:2px peut-il rester invisible ?",
      "options": [
        "Il faut toujours une image.",
        "Le style de bordure peut rester none.",
        "Toutes les bordures sont interdites.",
        "Le texte est trop court."
      ],
      "answer": 1,
      "explanation": "Une bordure visible a besoin notamment d’un style tel que solid.",
      "id": "css-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "padding",
      "definition": "Espace intérieur entre contenu et bordure."
    },
    {
      "term": "margin",
      "definition": "Espace extérieur à une boîte."
    },
    {
      "term": "border-box",
      "definition": "Convention incluant padding et bordure dans la dimension indiquée."
    }
  ],
  "recap_fr": [
    "Les espaces ont des rôles différents.",
    "La bordure possède un style.",
    "box-sizing précise ce que mesure width."
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

La fiche Semis touche son bord et semble collée à la fiche voisine. Avant d’ajouter des valeurs au hasard, distingue les espaces. Dans le modèle de boîte, le contenu est entouré par padding, puis par border. margin se trouve à l’extérieur de la bordure. Ces zones jouent des rôles différents. Le fond de la boîte s’étend généralement sur le contenu et l’espace intérieur ; la marge ne devient pas une bande colorée appartenant à son fond.

padding crée de l’air entre le texte et la bordure. margin règle une distance extérieure. Pour une première carte, padding:16px et margin:24px produisent deux effets séparés. Les versions top, right, bottom et left permettent de régler un seul côté. Une écriture courte avec deux valeurs signifie haut/bas puis gauche/droite. Avec quatre valeurs, l’ordre suit les côtés haut, droite, bas, gauche. Ne mémorise pas seulement la forme : observe les côtés concernés dans l’aperçu.

border associe une épaisseur, un style et une couleur. Une épaisseur seule peut ne rien montrer si le style reste none. Avec border:2px solid navy, les quatre côtés sont visibles. border-radius peut arrondir les coins, mais ne change pas le sens de la carte. Pour cette leçon, concentre-toi sur les dimensions ; les effets décoratifs ne doivent pas masquer une erreur de calcul ou un contenu trop proche du bord.

Par défaut, width décrit souvent la largeur du contenu avec box-sizing:content-box. Une largeur de 200px avec 16px de padding à gauche et à droite et une bordure de 2px de chaque côté occupe donc 236px hors marges. Avec box-sizing:border-box, les 200px incluent contenu, padding et bordure. La largeur disponible pour le contenu devient plus petite. Cette convention rend souvent les dispositions plus faciles à prévoir, mais il faut savoir ce que le nombre annoncé mesure.

Les marges verticales de certains blocs peuvent fusionner ; additionner toutes les valeurs écrites n’est donc pas une méthode universelle de mesure. Nous évitons ce piège dans les activités en observant des propriétés explicites et une carte isolée. Prédis les dimensions, teste, puis explique où se trouvent les espaces. Les contrôles comparent les propriétés calculées de la boîte. Termine par une lecture du texte : une mesure correcte ne suffit pas si les mots débordent ou si la carte n’offre pas assez d’espace pour leur compréhension.

## Exemple guidé 1

```css
.carte { width:200px; padding:16px; border:2px solid navy; box-sizing:content-box; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.carte { width:200px; padding:16px; border:2px solid navy; box-sizing:border-box; }
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
