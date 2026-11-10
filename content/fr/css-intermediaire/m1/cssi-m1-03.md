---
{
  "id": "cssi-m1-03",
  "title_fr": "Suivre le sens de lecture avec les propriétés logiques",
  "course": "css-intermediaire",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "cssi-m1-02"
  ],
  "outcomes": [
    "Distinguer côtés physiques et axes logiques du document.",
    "Adapter espaces et bordures au sens LTR ou RTL sans dupliquer le composant."
  ],
  "idea_fr": "Les propriétés logiques suivent les axes et la direction du texte plutôt qu’un côté fixe de l’écran.",
  "analogy_fr": "Une marge située au début d’une phrase change de côté selon son sens de lecture ; son rôle reste pourtant le même.",
  "examples": [
    {
      "code": ".carte {\n  writing-mode: horizontal-tb;\n  padding-inline-start: 24px;\n  padding-inline-end: 8px;\n  text-align: start;\n}",
      "expected_output": "Les 24px se trouvent au début de lecture : à gauche en LTR, à droite en RTL ; la fin reste à 8px.",
      "inputs": [],
      "trace_fr": [
        "writing-mode garde les deux exemples dans une écriture horizontale.",
        "dir=ltr place inline-start à gauche.",
        "dir=rtl place inline-start à droite.",
        "text-align:start garde l’alignement lié au sens sans changer le texte."
      ],
      "browser_test": {
        "description_fr": "Même intention dans deux directions",
        "checks": [
          {
            "selector": "#ltr",
            "style": {
              "padding-left": "24px",
              "padding-right": "8px",
              "text-align": "start",
              "direction": "ltr"
            }
          },
          {
            "selector": "#rtl",
            "style": {
              "padding-left": "8px",
              "padding-right": "24px",
              "text-align": "start",
              "direction": "rtl"
            }
          }
        ]
      },
      "fixture_html": "<main><article class=\"carte\" id=\"ltr\" dir=\"ltr\"><p>Carte en lecture de gauche à droite</p></article><article class=\"carte\" id=\"rtl\" dir=\"rtl\" lang=\"ar\"><p>بطاقة النادي</p></article></main>"
    },
    {
      "code": ".note {\n  writing-mode: horizontal-tb;\n  border: 0;\n  border-inline-start: 4px solid navy;\n  margin-inline-start: 0;\n  margin-inline-end: 12px;\n}",
      "expected_output": "Le repère de 4px change de côté avec la lecture ; la marge de fin devient gauche en RTL.",
      "inputs": [],
      "trace_fr": [
        "La remise border:0 évite un repère simultané sur les autres côtés.",
        "En LTR, la bordure de début est à gauche et la marge de fin à droite.",
        "En RTL, ces côtés s’inversent.",
        "Le même composant conserve les mêmes valeurs logiques."
      ],
      "browser_test": {
        "description_fr": "Bordure et marge de fin",
        "checks": [
          {
            "selector": "#ltr",
            "style": {
              "border-left-width": "4px",
              "border-right-width": "0px",
              "margin-left": "0px",
              "margin-right": "12px"
            }
          },
          {
            "selector": "#rtl",
            "style": {
              "border-left-width": "0px",
              "border-right-width": "4px",
              "margin-left": "12px",
              "margin-right": "0px"
            }
          }
        ]
      },
      "fixture_html": "<main><p class=\"note\" id=\"ltr\" dir=\"ltr\">Préparation</p><p class=\"note\" id=\"rtl\" dir=\"rtl\" lang=\"ar\">التحضير</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre début et gauche",
      "why_fr": "Le rôle ne suit plus le contexte RTL.",
      "fix_fr": "Utilise inline-start quand l’intention dépend de la lecture."
    },
    {
      "error": "Cumuler ancien et nouveau réglages",
      "why_fr": "Une propriété physique peut contredire le résultat logique.",
      "fix_fr": "Remplace les décisions concernées plutôt que superposer des correctifs."
    },
    {
      "error": "Forcer LTR pour réussir une mesure",
      "why_fr": "Le contenu perd son sens de lecture.",
      "fix_fr": "Garde dir et vérifie les deux mappages de côtés."
    }
  ],
  "quiz": [
    {
      "question": "En écriture horizontale RTL, où se trouve inline-start ?",
      "options": [
        "Toujours à gauche.",
        "Toujours en bas.",
        "Sur la première balise du document.",
        "À droite."
      ],
      "answer": 3,
      "explanation": "Le début inline suit ici le sens de lecture de droite à gauche.",
      "id": "cssi-m1-03-q1"
    },
    {
      "question": "Que signifie text-align:start dans ces exemples ?",
      "options": [
        "Toujours aligner physiquement à gauche.",
        "Inverser les caractères du texte.",
        "Aligner vers le début de la ligne selon sa direction.",
        "Toujours centrer le texte."
      ],
      "answer": 2,
      "explanation": "L’alignement suit le contexte sans réécrire la phrase.",
      "id": "cssi-m1-03-q2"
    },
    {
      "question": "Pourquoi conserver dir dans le HTML plutôt que forcer direction:ltr en CSS ?",
      "options": [
        "Parce que CSS ne connaît aucune propriété de direction.",
        "Le sens de lecture appartient au contenu et doit rester correct.",
        "Parce que RTL interdit tous les paddings.",
        "Pour supprimer les marges block."
      ],
      "answer": 1,
      "explanation": "Une mesure ne doit pas être obtenue au prix d’un sens de lecture faux.",
      "id": "cssi-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "axe inline",
      "definition": "Axe de progression du texte dans une ligne."
    },
    {
      "term": "axe block",
      "definition": "Axe d’empilement des lignes dans le mode d’écriture."
    },
    {
      "term": "propriété logique",
      "definition": "Propriété décrivant un côté ou une dimension selon ces axes."
    },
    {
      "term": "RTL",
      "definition": "Direction de lecture de droite à gauche."
    }
  ],
  "recap_fr": [
    "Distinguer côtés physiques et axes logiques du document.",
    "Adapter espaces et bordures au sens LTR ou RTL sans dupliquer le composant.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "axe inline",
    "axe block",
    "propriété logique",
    "RTL"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "css",
  "runtime": "css",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "environment_fr": "Feuille CSS réelle appliquée à la fixture HTML fournie dans une iframe isolée. Les contrôles lisent les styles calculés du navigateur aux dimensions annoncées. Aucun script, média distant, police distante, requête réseau ni envoi de formulaire. Les textes et structures sont fictifs.",
  "references": [
    {
      "title": "MDN — Concepts des propriétés logiques",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values"
    }
  ],
  "sources": [
    {
      "title": "MDN — Concepts des propriétés logiques",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Un composant peut présenter du français de gauche à droite et, dans un autre contexte, un texte écrit de droite à gauche. Une bordure placée physiquement à gauche reste à gauche dans les deux cas, même si elle devait signaler le début du contenu. La décision utile n’est donc pas toujours « gauche ou droite ». Elle peut être « début ou fin de l’axe de lecture ». Les propriétés logiques permettent de formuler cette intention.

L’axe inline suit la progression du texte dans une ligne ; l’axe block suit l’empilement des lignes. Dans les exemples, writing-mode:horizontal-tb fixe une écriture horizontale. inline-start correspond alors à gauche en LTR et à droite en RTL. inline-end correspond au côté opposé. Le sens provient de dir dans le HTML fourni. La feuille ne force pas direction:ltr pour obtenir artificiellement les mesures souhaitées.

padding-inline-start et padding-inline-end remplacent des espaces physiques quand leur rôle dépend de la lecture. Une carte peut recevoir 24px au début et 8px à la fin. La même déclaration produit donc 24px à gauche dans la première carte et 24px à droite dans la seconde. Le texte, les identifiants et l’ordre du document restent inchangés ; seul le lien entre rôle et côté est adapté.

Les bordures et marges disposent aussi de versions logiques. border-inline-start:4px solid navy indique un repère au début du contenu. margin-inline-end:12px fournit une distance à sa fin. Dans une écriture horizontale, margin-block-start et margin-block-end correspondent au haut et au bas, indépendamment de LTR ou RTL. Les propriétés inline-size et block-size expriment les dimensions selon ces mêmes axes, au lieu de supposer que largeur et hauteur sont toujours les intentions pertinentes.

text-align:start aligne le texte vers le début de la ligne. Il ne doit pas être remplacé partout par left. À l’inverse, une propriété logique n’est pas une obligation pour toute décoration : un repère réellement attaché au bord physique d’une image peut garder une propriété physique. Identifie d’abord ce qui doit suivre la langue ou le contexte, puis choisis le vocabulaire CSS approprié.

Évite de mélanger padding-left et padding-inline-start pour régler la même décision sans comprendre leur interaction dans la cascade. Une ancienne déclaration physique peut gagner par son ordre et contredire l’effet attendu dans une direction. Les exercices de débogage demandent donc de remplacer les côtés fixes, plutôt que d’empiler des corrections supplémentaires réservées à RTL.

Compare les deux cartes des exemples. Les contrôles inspectent les côtés calculés dans chaque direction, avec des valeurs simples en pixels ; ils ne traduisent pas les textes et ne certifient pas leur qualité linguistique. Les fragments arabes sont fournis uniquement pour représenter un contexte RTL. La revue doit encore porter sur la lecture du contenu, ses espacements et les contrôles réels. La propriété logique exprime une décision de disposition, sans modifier la sémantique de la page.

## Exemple guidé 1

```css
.carte {
  writing-mode: horizontal-tb;
  padding-inline-start: 24px;
  padding-inline-end: 8px;
  text-align: start;
}
```

HTML de cet exemple :

```html
<main><article class="carte" id="ltr" dir="ltr"><p>Carte en lecture de gauche à droite</p></article><article class="carte" id="rtl" dir="rtl" lang="ar"><p>بطاقة النادي</p></article></main>
```

Résultat attendu : Les 24px se trouvent au début de lecture : à gauche en LTR, à droite en RTL ; la fin reste à 8px.

Trace :

- writing-mode garde les deux exemples dans une écriture horizontale.
- dir=ltr place inline-start à gauche.
- dir=rtl place inline-start à droite.
- text-align:start garde l’alignement lié au sens sans changer le texte.

## Exemple guidé 2

```css
.note {
  writing-mode: horizontal-tb;
  border: 0;
  border-inline-start: 4px solid navy;
  margin-inline-start: 0;
  margin-inline-end: 12px;
}
```

HTML de cet exemple :

```html
<main><p class="note" id="ltr" dir="ltr">Préparation</p><p class="note" id="rtl" dir="rtl" lang="ar">التحضير</p></main>
```

Résultat attendu : Le repère de 4px change de côté avec la lecture ; la marge de fin devient gauche en RTL.

Trace :

- La remise border:0 évite un repère simultané sur les autres côtés.
- En LTR, la bordure de début est à gauche et la marge de fin à droite.
- En RTL, ces côtés s’inversent.
- Le même composant conserve les mêmes valeurs logiques.

## Vérifier et expliquer

Observe le résultat aux dimensions annoncées puis à une largeur intermédiaire. Vérifie aussi les textes longs et le parcours clavier sans modifier l’ordre du document.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — Concepts des propriétés logiques](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_logical_properties_and_values/Basic_concepts_of_logical_properties_and_values)
