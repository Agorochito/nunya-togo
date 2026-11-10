---
{
  "id": "cssi-m1-01",
  "title_fr": "Définir des variables locales et choisir leur repli",
  "course": "css-intermediaire",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "css-m4-03"
  ],
  "outcomes": [
    "Utiliser des propriétés personnalisées qui suivent la cascade et l’héritage.",
    "Prévoir un repli var adapté sans écraser une valeur locale valide."
  ],
  "idea_fr": "Une propriété personnalisée fournit une valeur contextualisée ; var la réutilise à l’endroit où une propriété réelle en a besoin.",
  "analogy_fr": "Une fiche de club peut reprendre les réglages de son groupe tout en gardant une variante locale.",
  "examples": [
    {
      "code": ".carte {\n  --accent: navy;\n  color: var(--accent);\n  border: 2px solid var(--accent);\n}",
      "expected_output": "La carte standard et sa bordure sont bleu marine ; la seconde utilise teal grâce à son accent local.",
      "inputs": [],
      "trace_fr": [
        "La déclaration de --accent fournit le défaut propre à chaque carte.",
        "Les deux propriétés consomment cette valeur avec var.",
        "La valeur en style sur la seconde carte remplace son défaut dans la cascade.",
        "Les titres héritent de la couleur de leur propre carte."
      ],
      "browser_test": {
        "description_fr": "Deux accents pour la même règle",
        "checks": [
          {
            "selector": "#standard",
            "style": {
              "color": "navy",
              "border-top-color": "navy"
            }
          },
          {
            "selector": "#locale",
            "style": {
              "color": "teal",
              "border-top-color": "teal"
            }
          }
        ]
      },
      "fixture_html": "<main><article class=\"carte\" id=\"standard\"><h2>Lecture</h2></article><article class=\"carte\" id=\"locale\" style=\"--accent:teal\"><h2>Jardin</h2></article></main>"
    },
    {
      "code": ".pastille {\n  color: navy;\n  background-color: var(--fond, khaki);\n  padding: 8px;\n}",
      "expected_output": "La première pastille a un fond khaki ; celle du groupe reprend lavender.",
      "inputs": [],
      "trace_fr": [
        "Aucune variable --fond n’est fournie à la première pastille.",
        "Le repli khaki est donc utilisé pour son fond.",
        "La seconde pastille hérite de --fond depuis sa section.",
        "Le padding reste le même, car il n’est pas lié au thème."
      ],
      "browser_test": {
        "description_fr": "Repli et héritage",
        "checks": [
          {
            "selector": "#defaut",
            "style": {
              "background-color": "khaki",
              "padding-top": "8px"
            }
          },
          {
            "selector": "#heritee",
            "style": {
              "background-color": "lavender",
              "padding-top": "8px"
            }
          }
        ]
      },
      "fixture_html": "<main><p class=\"pastille\" id=\"defaut\">Sans thème</p><section style=\"--fond:lavender\"><p class=\"pastille\" id=\"heritee\">Thème du groupe</p></section></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Déclarer sans utiliser",
      "why_fr": "Les couleurs réelles restent des constantes.",
      "fix_fr": "Lis la variable dans les propriétés concernées."
    },
    {
      "error": "Masquer un réglage hérité",
      "why_fr": "Le défaut est redéfini sur chaque enfant.",
      "fix_fr": "Utilise un repli dans var quand le contexte doit fournir la valeur."
    },
    {
      "error": "Corriger seulement le premier usage",
      "why_fr": "La bordure ou l’espace continue à lire le mauvais nom.",
      "fix_fr": "Repère toutes les consommations du même réglage."
    }
  ],
  "quiz": [
    {
      "question": "Une propriété --accent:teal dessine-t-elle seule une bordure ?",
      "options": [
        "Oui, une bordure de 1px apparaît toujours.",
        "Oui, uniquement dans main.",
        "Elle crée plutôt une classe HTML.",
        "Non, une propriété réelle doit utiliser cette valeur."
      ],
      "answer": 3,
      "explanation": "Une propriété personnalisée fournit une donnée que var peut réutiliser.",
      "id": "cssi-m1-01-q1"
    },
    {
      "question": "Pourquoi éviter de redéfinir --accent sur un enfant qui doit hériter du groupe ?",
      "options": [
        "Cela empêcherait tout texte d’exister.",
        "La cascade ignore toujours les déclarations locales.",
        "Sa déclaration locale peut masquer la valeur héritée.",
        "Les propriétés personnalisées ne peuvent jamais être héritées."
      ],
      "answer": 2,
      "explanation": "La portée du réglage doit suivre le contrat du composant.",
      "id": "cssi-m1-01-q2"
    },
    {
      "question": "Le repli de var valide-t-il automatiquement toute valeur pour padding ?",
      "options": [
        "Il convertit toutes les chaînes en nombres.",
        "Non, une valeur fournie peut être inadaptée à padding.",
        "Oui, une couleur devient toujours 12px.",
        "Oui, si le nom commence par deux tirets."
      ],
      "answer": 1,
      "explanation": "Le repli ne remplace pas un contrat de type adapté au contexte.",
      "id": "cssi-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "propriété personnalisée",
      "definition": "Donnée CSS nommée avec deux tirets et soumise à la cascade."
    },
    {
      "term": "var",
      "definition": "Fonction CSS qui utilise une propriété personnalisée et un repli éventuel."
    },
    {
      "term": "portée locale",
      "definition": "Contexte d’élément et de descendants où un réglage est disponible."
    },
    {
      "term": "repli",
      "definition": "Valeur alternative prévue quand var ne dispose pas du réglage utilisable attendu."
    }
  ],
  "recap_fr": [
    "Utiliser des propriétés personnalisées qui suivent la cascade et l’héritage.",
    "Prévoir un repli var adapté sans écraser une valeur locale valide.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "propriété personnalisée",
    "var",
    "portée locale",
    "repli"
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
      "title": "MDN — Propriétés personnalisées CSS",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties"
    }
  ],
  "sources": [
    {
      "title": "MDN — Propriétés personnalisées CSS",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une même carte utilise souvent sa couleur d’accent dans le texte et la bordure. Répéter deux valeurs séparées crée un risque de divergence. Une propriété personnalisée, nommée avec deux tirets comme --accent, peut fournir cette valeur à plusieurs déclarations. color: var(--accent) et border: 2px solid var(--accent) lisent alors le même réglage. La variable ne dessine rien par elle-même : il faut encore une propriété CSS qui utilise sa valeur.

Les propriétés personnalisées ordinaires participent à la cascade et sont héritées. Si un groupe définit --accent: teal, ses descendants peuvent l’utiliser. Une déclaration plus locale peut remplacer cette valeur dans un composant précis. Dans le premier exemple, chaque carte possède un défaut navy, tandis qu’une valeur en style sur la seconde carte remplace ce défaut local. Le changement s’applique à son texte et à sa bordure sans modifier la première carte.

Le lieu de la déclaration constitue une décision importante. Définir systématiquement --accent sur chaque enfant peut empêcher celui-ci de reprendre la valeur héritée du groupe. Si le composant doit accepter un réglage venant d’un ancêtre, il peut simplement utiliser var(--accent, navy). Il lit alors la valeur disponible dans son contexte et ne choisit navy que lorsque la variable manque ou se trouve dans un état où son repli est utilisé.

La seconde valeur de var est une solution de repli, pas une validation générale du sens de la variable. Si --espace contient une couleur valide en tant que donnée personnalisée, padding: var(--espace, 12px) ne transforme pas automatiquement cette couleur en longueur de repli. La déclaration finale peut devenir invalide pour padding. Les exercices fournissent donc des couleurs et longueurs adaptées ; la conception du contrat des réglages reste nécessaire.

Les noms sont sensibles à la casse : --accent et --Accent désignent deux propriétés distinctes. Une faute comme --espacement à la place de --espace peut activer un repli inattendu et masquer le véritable défaut. Pour diagnostiquer, repère d’abord l’élément qui porte la déclaration, puis la valeur héritée ou locale, enfin la propriété qui l’utilise. Modifier directement la couleur de chaque titre contournerait le mécanisme au lieu de le réparer.

Les exemples comparent un réglage absent, un réglage reçu d’un groupe et une variante locale. Les exercices conservent plusieurs cartes dans leur fixture afin de vérifier ces situations ensemble. Les valeurs de couleur sont explicites pour l’apprentissage ; elles ne constituent pas un thème dont le contraste aurait été certifié pour tout usage. Examine encore la lisibilité du texte et la distinction des informations.

Choisis une variable pour une décision réutilisée, comme un accent ou un espacement de composant. Ne transforme pas automatiquement chaque nombre en réglage public. Nomme le rôle plutôt que l’apparence ponctuelle : --accent reste plus utile que --bleu si une variante devient verte. La portée locale et les replis permettent ensuite de réutiliser le composant sans laisser ses choix déborder sur les textes extérieurs.

## Exemple guidé 1

```css
.carte {
  --accent: navy;
  color: var(--accent);
  border: 2px solid var(--accent);
}
```

HTML de cet exemple :

```html
<main><article class="carte" id="standard"><h2>Lecture</h2></article><article class="carte" id="locale" style="--accent:teal"><h2>Jardin</h2></article></main>
```

Résultat attendu : La carte standard et sa bordure sont bleu marine ; la seconde utilise teal grâce à son accent local.

Trace :

- La déclaration de --accent fournit le défaut propre à chaque carte.
- Les deux propriétés consomment cette valeur avec var.
- La valeur en style sur la seconde carte remplace son défaut dans la cascade.
- Les titres héritent de la couleur de leur propre carte.

## Exemple guidé 2

```css
.pastille {
  color: navy;
  background-color: var(--fond, khaki);
  padding: 8px;
}
```

HTML de cet exemple :

```html
<main><p class="pastille" id="defaut">Sans thème</p><section style="--fond:lavender"><p class="pastille" id="heritee">Thème du groupe</p></section></main>
```

Résultat attendu : La première pastille a un fond khaki ; celle du groupe reprend lavender.

Trace :

- Aucune variable --fond n’est fournie à la première pastille.
- Le repli khaki est donc utilisé pour son fond.
- La seconde pastille hérite de --fond depuis sa section.
- Le padding reste le même, car il n’est pas lié au thème.

## Vérifier et expliquer

Observe le résultat aux dimensions annoncées puis à une largeur intermédiaire. Vérifie aussi les textes longs et le parcours clavier sans modifier l’ordre du document.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — Propriétés personnalisées CSS](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
