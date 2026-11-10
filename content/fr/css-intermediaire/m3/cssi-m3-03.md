---
{
  "id": "cssi-m3-03",
  "title_fr": "Imbriquer des grilles avec des espacements cohérents",
  "course": "css-intermediaire",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "cssi-m3-02"
  ],
  "outcomes": [
    "Imbriquer une grille dans un élément de grille en distinguant les pistes de chaque niveau.",
    "Piloter les espacements de plusieurs niveaux avec gap et une seule propriété personnalisée."
  ],
  "idea_fr": "Chaque grille ne gouverne que ses enfants directs ; un espacement partagé garde les niveaux visuellement accordés.",
  "analogy_fr": "Un classeur contient des intercalaires, qui contiennent des feuilles : chaque niveau a sa propre mise en page, mais tous respectent la même marge.",
  "examples": [
    {
      "code": "body { margin: 0; }\n.tableau {\n  --espace: 16px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--espace);\n  padding: var(--espace);\n}\n.carte {\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr);\n  gap: calc(var(--espace) / 2);\n}\n.texte { margin: 0; }",
      "expected_output": "À 360px, chaque carte mesure 156px ; à l’intérieur, le sigle garde 48px et le texte reçoit 100px.",
      "inputs": [],
      "trace_fr": [
        "Le tableau retire deux fois 16px de padding : il reste 328px.",
        "Deux pistes partagent 328 − 16 = 312px : 156px par carte.",
        "La carte calcule sa gouttière : 16 / 2 = 8px.",
        "Le texte reçoit 156 − 48 − 8 = 100px."
      ],
      "browser_test": {
        "description_fr": "Deux niveaux accordés",
        "checks": [
          {
            "selector": "#tableau",
            "style": {
              "column-gap": "16px",
              "padding-left": "16px"
            }
          },
          {
            "selector": "#carte",
            "style": {
              "display": "grid",
              "width": "156px",
              "column-gap": "8px"
            }
          },
          {
            "selector": "#texte",
            "style": {
              "width": "100px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"tableau\" id=\"tableau\"><article class=\"carte\" id=\"carte\"><span class=\"sigle\">Le</span><p class=\"texte\" id=\"texte\">Lecture du mardi</p></article><article class=\"carte\"><span class=\"sigle\">Ja</span><p class=\"texte\">Jardin du jeudi</p></article></main>"
    },
    {
      "code": "body { margin: 0; }\n.tableau {\n  --espace: 16px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--espace);\n  padding: var(--espace);\n}\n.carte {\n  display: grid;\n  grid-template-columns: 48px minmax(0, 1fr);\n  gap: calc(var(--espace) / 2);\n}\n.texte { margin: 0; }\n.tableau.compact { --espace: 8px; }",
      "expected_output": "Avec la variante compacte à 360px, les cartes mesurent 168px, leur gouttière 4px et leur texte 116px.",
      "inputs": [],
      "trace_fr": [
        "La variante redéfinit uniquement --espace à 8px.",
        "Le padding et la gouttière du tableau passent à 8px : 360 − 16 − 8 = 336px pour deux cartes.",
        "Chaque carte mesure 168px et calcule une gouttière de 4px.",
        "Le texte reçoit 168 − 48 − 4 = 116px."
      ],
      "browser_test": {
        "description_fr": "Une seule propriété modifie tous les niveaux",
        "checks": [
          {
            "selector": "#tableau",
            "style": {
              "column-gap": "8px",
              "padding-left": "8px"
            }
          },
          {
            "selector": "#carte",
            "style": {
              "width": "168px",
              "column-gap": "4px"
            }
          },
          {
            "selector": "#texte",
            "style": {
              "width": "116px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"tableau compact\" id=\"tableau\"><article class=\"carte\" id=\"carte\"><span class=\"sigle\">Le</span><p class=\"texte\" id=\"texte\">Lecture du mardi</p></article><article class=\"carte\"><span class=\"sigle\">Ja</span><p class=\"texte\">Jardin du jeudi</p></article></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Attendre que la grille extérieure aligne le contenu des cartes",
      "why_fr": "Une grille ne place que ses enfants directs.",
      "fix_fr": "Transforme la carte en grille pour organiser son contenu."
    },
    {
      "error": "Écrire un espacement différent à chaque niveau",
      "why_fr": "Les valeurs isolées divergent et se corrigent une à une.",
      "fix_fr": "Dérive tous les espacements d’une propriété personnalisée."
    },
    {
      "error": "Ajouter des marges en plus de gap",
      "why_fr": "Les deux espaces s’additionnent et réduisent la largeur utile.",
      "fix_fr": "Confie les intervalles à gap et les bords au padding du conteneur."
    }
  ],
  "quiz": [
    {
      "question": "Quels éléments une grille place-t-elle ?",
      "options": [
        "Tous ses descendants.",
        "Uniquement ses enfants directs.",
        "Seulement les éléments portant une classe.",
        "Uniquement les paragraphes."
      ],
      "answer": 1,
      "explanation": "Les descendants plus profonds dépendent de leur propre conteneur.",
      "id": "cssi-m3-03-q1"
    },
    {
      "question": "Le tableau déclare --espace: 16px et la carte gap: calc(var(--espace) / 2). Que vaut la gouttière de la carte ?",
      "options": [
        "16px.",
        "32px.",
        "0px.",
        "8px."
      ],
      "answer": 3,
      "explanation": "La carte hérite de la propriété et la divise par deux.",
      "id": "cssi-m3-03-q2"
    },
    {
      "question": "Pourquoi éviter margin: 16px sur les cartes d’une grille qui possède déjà gap: 16px ?",
      "options": [
        "Les deux espaces s’additionnent et réduisent les cartes.",
        "margin est interdit dans une grille.",
        "gap annule automatiquement les marges.",
        "Les marges changent l’ordre du document."
      ],
      "answer": 0,
      "explanation": "La marge s’ajoute autour de chaque élément, en plus de la gouttière.",
      "id": "cssi-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "grille imbriquée",
      "definition": "Grille dont le conteneur est lui-même un élément d’une autre grille."
    },
    {
      "term": "gouttière",
      "definition": "Espace entre deux pistes, défini par gap."
    },
    {
      "term": "propriété personnalisée",
      "definition": "Valeur nommée, comme --espace, lue avec var() et héritée par les descendants."
    },
    {
      "term": "subgrid",
      "definition": "Valeur qui fait réutiliser à une grille intérieure les pistes de son parent, sur les navigateurs récents."
    }
  ],
  "recap_fr": [
    "Imbriquer une grille dans un élément de grille en distinguant les pistes de chaque niveau.",
    "Piloter les espacements de plusieurs niveaux avec gap et une seule propriété personnalisée.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "grille imbriquée",
    "gouttière",
    "propriété personnalisée",
    "subgrid"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "css",
  "runtime": "css",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "Feuille CSS réelle appliquée à la fixture HTML fournie dans une iframe isolée. Les contrôles lisent les styles calculés du navigateur aux dimensions annoncées. Aucun script, média distant, police distante, requête réseau ni envoi de formulaire. Les textes et structures sont fictifs.",
  "references": [
    {
      "title": "MDN — gap",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/gap"
    },
    {
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties"
    },
    {
      "title": "MDN — Subgrid",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Grid_layout/Subgrid"
    },
    {
      "title": "W3C — CSS Grid Layout",
      "url": "https://www.w3.org/TR/css-grid-1/"
    }
  ],
  "sources": [
    {
      "title": "MDN — gap",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/gap",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — Subgrid",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Grid_layout/Subgrid",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "W3C — CSS Grid Layout",
      "url": "https://www.w3.org/TR/css-grid-1/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Une grille n’organise que ses enfants directs. Dans un tableau de cartes, la grille extérieure place les cartes ; elle ne sait rien du sigle et du texte rangés à l’intérieur de chacune. Pour aligner ce contenu, la carte devient à son tour un conteneur de grille. Un même élément joue alors deux rôles : il est un élément de la grille extérieure et le conteneur d’une grille intérieure.

Ces deux niveaux sont indépendants. La grille intérieure ne reprend ni les colonnes ni les gouttières de la grille extérieure : elle calcule ses pistes dans la largeur que sa carte a reçue. Dans le premier exemple, le tableau de 360px possède un padding de 16px et une gouttière de 16px ; chaque carte reçoit donc 156px. À l’intérieur, le sigle garde 48px, la gouttière vaut 8px et le texte obtient les 100px restants. Calcule toujours de l’extérieur vers l’intérieur.

Sans précaution, chaque niveau reçoit un espacement choisi au hasard : 16px ici, 10px là, 14px ailleurs. L’ensemble paraît désordonné sans que l’on comprenne pourquoi. Une propriété personnalisée règle ce problème. Le tableau déclare --espace: 16px ; son padding et sa gouttière la lisent avec var(--espace). Les cartes héritent de cette propriété et en dérivent leur propre gouttière avec calc(var(--espace) / 2). Tous les espacements découlent ainsi d’une seule décision.

L’avantage apparaît quand on change d’échelle. Dans le second exemple, la variante .compact redéfinit seulement --espace: 8px. Le padding, la gouttière extérieure et la gouttière intérieure suivent ensemble : les cartes passent à 168px et leur texte à 116px, sans réécrire aucune autre règle. Une variante dense devient une seule déclaration au lieu d’une série de corrections.

Préfère gap aux marges pour espacer les éléments d’une grille. gap ne s’insère qu’entre les pistes, jamais sur les bords. Une marge s’ajoute au contraire autour de chaque élément : combinée à gap, elle double l’espace et réduit la largeur utile. Dans le débogage, des cartes dotées de margin: 16px ne mesurent plus que 124px au lieu de 156px. Le padding du conteneur gère les bords, gap gère l’intervalle : chaque espace a un seul responsable.

Les pistes intérieures ne sont pas alignées d’une carte à l’autre par magie. Elles le sont ici parce que chaque carte a la même largeur et les mêmes pistes. Il existe une valeur subgrid qui permet à une grille intérieure de réutiliser les pistes de son parent ; elle est prise en charge par les navigateurs récents, mais pas par tous les anciens appareils. Cette leçon ne s’appuie donc pas sur elle : des pistes identiques et un espacement partagé suffisent pour un résultat régulier.

N’imbrique pas sans raison. Chaque niveau supplémentaire rend le calcul plus difficile à suivre. Ajoute une grille intérieure quand un groupe d’éléments a réellement besoin de sa propre disposition.

## Exemple guidé 1

```css
body { margin: 0; }
.tableau {
  --espace: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espace);
  padding: var(--espace);
}
.carte {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: calc(var(--espace) / 2);
}
.texte { margin: 0; }
```

HTML de cet exemple :

```html
<main class="tableau" id="tableau"><article class="carte" id="carte"><span class="sigle">Le</span><p class="texte" id="texte">Lecture du mardi</p></article><article class="carte"><span class="sigle">Ja</span><p class="texte">Jardin du jeudi</p></article></main>
```

Résultat attendu : À 360px, chaque carte mesure 156px ; à l’intérieur, le sigle garde 48px et le texte reçoit 100px.

Trace :

- Le tableau retire deux fois 16px de padding : il reste 328px.
- Deux pistes partagent 328 − 16 = 312px : 156px par carte.
- La carte calcule sa gouttière : 16 / 2 = 8px.
- Le texte reçoit 156 − 48 − 8 = 100px.

## Exemple guidé 2

```css
body { margin: 0; }
.tableau {
  --espace: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espace);
  padding: var(--espace);
}
.carte {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: calc(var(--espace) / 2);
}
.texte { margin: 0; }
.tableau.compact { --espace: 8px; }
```

HTML de cet exemple :

```html
<main class="tableau compact" id="tableau"><article class="carte" id="carte"><span class="sigle">Le</span><p class="texte" id="texte">Lecture du mardi</p></article><article class="carte"><span class="sigle">Ja</span><p class="texte">Jardin du jeudi</p></article></main>
```

Résultat attendu : Avec la variante compacte à 360px, les cartes mesurent 168px, leur gouttière 4px et leur texte 116px.

Trace :

- La variante redéfinit uniquement --espace à 8px.
- Le padding et la gouttière du tableau passent à 8px : 360 − 16 − 8 = 336px pour deux cartes.
- Chaque carte mesure 168px et calcule une gouttière de 4px.
- Le texte reçoit 168 − 48 − 4 = 116px.

## Vérifier et expliquer

Refais le calcul de l’extérieur vers l’intérieur avant de lire les mesures. Change ensuite la valeur de la propriété partagée et observe tous les niveaux.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — gap](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/gap)
- [MDN — Utiliser les propriétés personnalisées](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN — Subgrid](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Grid_layout/Subgrid)
- [W3C — CSS Grid Layout](https://www.w3.org/TR/css-grid-1/)
