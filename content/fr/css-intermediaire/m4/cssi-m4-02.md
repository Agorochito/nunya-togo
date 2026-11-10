---
{
  "id": "cssi-m4-02",
  "title_fr": "Régler une typographie fluide et une ligne lisible",
  "course": "css-intermediaire",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "cssi-m4-01"
  ],
  "outcomes": [
    "Exprimer les tailles de texte en rem et les faire varier avec clamp().",
    "Limiter la longueur des lignes et choisir un interligne sans unité."
  ],
  "idea_fr": "Une typographie adaptable respecte le réglage du lecteur, grandit avec l’écran dans des limites choisies et garde des lignes courtes.",
  "analogy_fr": "Un tailleur ne coud pas une taille unique : il part des mesures de la personne et fixe une longueur minimale et maximale.",
  "examples": [
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.titre {\n  font-size: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);\n  line-height: 1.2;\n  margin: 0;\n}",
      "expected_output": "À 360px, le titre mesure 25px avec un interligne de 30px.",
      "inputs": [],
      "trace_fr": [
        "La valeur préférée vaut 1rem + 2.5vw : 16 + 9 = 25px.",
        "25px se situe entre le minimum de 24px et le maximum de 40px.",
        "clamp() retient donc 25px.",
        "L’interligne vaut 1,2 × 25 = 30px."
      ],
      "browser_test": {
        "description_fr": "Titre fluide à 360px",
        "checks": [
          {
            "selector": "#titre",
            "style": {
              "font-size": "25px",
              "line-height": "30px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main><h1 class=\"titre\" id=\"titre\">Programme du club fictif</h1><p>Informations de démonstration.</p></main>"
    },
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.article {\n  max-width: 34rem;\n  margin-inline: auto;\n  padding-inline: 1rem;\n}\n.article p { margin-block: 0 1rem; }",
      "expected_output": "À 720px, le bloc de texte mesure 544px, garde 16px de marge intérieure et se centre avec 72px de chaque côté.",
      "inputs": [],
      "trace_fr": [
        "34rem valent 544px avec le réglage par défaut.",
        "Les marges intérieures ajoutent 16px de chaque côté : 576px au total.",
        "Il reste 720 − 576 = 144px, répartis par margin-inline: auto.",
        "Chaque marge extérieure mesure 72px."
      ],
      "browser_test": {
        "description_fr": "Bloc de lecture centré à 720px",
        "checks": [
          {
            "selector": "#article",
            "style": {
              "max-width": "544px",
              "width": "544px",
              "margin-left": "72px",
              "padding-left": "16px"
            }
          },
          {
            "selector": "#texte",
            "style": {
              "line-height": "24px"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"article\" id=\"article\"><h1 class=\"titre\" id=\"titre\">Programme du club fictif</h1><p id=\"texte\">Le club se réunit chaque mardi pour une lecture à voix haute, puis chaque jeudi pour entretenir un petit jardin partagé. Ces informations sont fictives.</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Fixer les tailles de texte en px",
      "why_fr": "Le réglage de taille du lecteur est ignoré.",
      "fix_fr": "Exprime les tailles en rem."
    },
    {
      "error": "Utiliser vw seul pour un titre",
      "why_fr": "Le texte devient trop petit ou trop grand et ne suit plus le réglage du lecteur.",
      "fix_fr": "Encadre la variation avec clamp() et garde une part en rem."
    },
    {
      "error": "Donner un interligne en px",
      "why_fr": "Il ne suit pas la taille du texte et les lignes se chevauchent.",
      "fix_fr": "Écris un nombre sans unité, par exemple 1.5."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi exprimer une taille de texte en rem plutôt qu’en px ?",
      "options": [
        "rem est toujours plus grand.",
        "px n’est pas reconnu sur téléphone.",
        "rem empêche le texte de changer de taille.",
        "rem suit le réglage de taille choisi par le lecteur."
      ],
      "answer": 3,
      "explanation": "rem dépend de la taille de l’élément racine, donc du réglage du navigateur.",
      "id": "cssi-m4-02-q1"
    },
    {
      "question": "Que vaut clamp(1.5rem, 1rem + 2.5vw, 2.5rem) dans une fenêtre de 1200px, avec 1rem = 16px ?",
      "options": [
        "46px.",
        "40px.",
        "24px.",
        "30px."
      ],
      "answer": 1,
      "explanation": "La valeur préférée atteint 46px ; le maximum de 2.5rem, soit 40px, s’applique.",
      "id": "cssi-m4-02-q2"
    },
    {
      "question": "Quel interligne suit correctement un titre dont la taille varie ?",
      "options": [
        "line-height: 1.2",
        "line-height: 24px",
        "line-height: 0",
        "line-height: 100vw"
      ],
      "answer": 0,
      "explanation": "Un nombre sans unité est un rapport calculé à partir de la taille du texte.",
      "id": "cssi-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "rem",
      "definition": "Unité égale à la taille de texte de l’élément racine, 16px par défaut."
    },
    {
      "term": "clamp()",
      "definition": "Fonction qui encadre une valeur préférée entre un minimum et un maximum."
    },
    {
      "term": "interligne",
      "definition": "Hauteur d’une ligne de texte, réglée par line-height."
    },
    {
      "term": "longueur de ligne",
      "definition": "Nombre de caractères par ligne ; environ 45 à 75 pour une lecture confortable."
    }
  ],
  "recap_fr": [
    "Exprimer les tailles de texte en rem et les faire varier avec clamp().",
    "Limiter la longueur des lignes et choisir un interligne sans unité.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "rem",
    "clamp()",
    "interligne",
    "longueur de ligne"
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
      "title": "MDN — clamp()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/clamp"
    },
    {
      "title": "MDN — font-size",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/font-size"
    },
    {
      "title": "MDN — line-height",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/line-height"
    },
    {
      "title": "WAI — Redimensionnement du texte",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html"
    },
    {
      "title": "W3C — CSS Values and Units",
      "url": "https://www.w3.org/TR/css-values-4/"
    }
  ],
  "sources": [
    {
      "title": "MDN — clamp()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/clamp",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — font-size",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/font-size",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — line-height",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/line-height",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "WAI — Redimensionnement du texte",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "W3C — CSS Values and Units",
      "url": "https://www.w3.org/TR/css-values-4/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Un texte confortable sur un téléphone peut paraître minuscule sur un grand écran, et un titre imposant sur ordinateur peut occuper tout un petit écran. La typographie fait donc partie de l’adaptation, au même titre que les colonnes. Trois décisions suffisent pour un résultat solide : l’unité des tailles, leur variation selon la largeur, et la longueur des lignes.

Commence par l’unité. 1rem correspond à la taille de texte de l’élément racine, c’est-à-dire au réglage du navigateur : 16px par défaut. Une personne qui lit difficilement peut augmenter ce réglage. Les tailles exprimées en rem suivent son choix ; les tailles en px l’ignorent. Écris donc les tailles de texte en rem. Les contrôles de cette leçon supposent le réglage par défaut de 16px : 1,5rem y vaut 24px.

Un titre peut ensuite grandir avec l’écran. L’unité vw représente un centième de la largeur de la fenêtre : 2.5vw vaut 9px à 360px et 18px à 720px. Utilisée seule, elle pose deux problèmes : le texte devient illisible sur un petit écran, démesuré sur un grand, et il ne réagit plus au réglage du lecteur. La fonction clamp(minimum, valeur préférée, maximum) encadre cette variation. Dans le premier exemple, clamp(1.5rem, 1rem + 2.5vw, 2.5rem) calcule 1rem + 2.5vw, sans jamais descendre sous 24px ni dépasser 40px. À 360px, le calcul donne 16 + 9 = 25px. À 720px, 34px. À 1200px, il donnerait 46px : le maximum de 40px s’applique. La partie en rem de la valeur préférée garde le lien avec le réglage du lecteur.

L’interligne se règle avec line-height. Écris un nombre sans unité : 1.5 signifie une fois et demie la taille du texte de l’élément. Ce rapport suit automatiquement la taille. Une valeur fixe comme 24px ne suit rien : appliquée à un titre de 40px, elle fait se chevaucher les lignes. Un texte courant se lit bien autour de 1.5 ; un grand titre supporte un interligne plus serré, vers 1.2.

Reste la longueur des lignes. Sur un écran large, un paragraphe qui s’étire d’un bord à l’autre fatigue : l’œil perd le début de la ligne suivante. Une ligne confortable compte à peu près 45 à 75 caractères. max-width limite la largeur du bloc de texte sans l’empêcher de rétrécir sur un petit écran. Tu rencontreras souvent l’unité ch, liée à la largeur du chiffre zéro : max-width: 60ch approche soixante caractères. Comme elle dépend de la police, les contrôles utilisent ici des rem, plus prévisibles : 34rem valent 544px. margin-inline: auto centre ensuite le bloc, et padding-inline garde une marge intérieure sur un téléphone.

Le second exemple réunit ces règles : à 720px, le bloc mesure 544px et se centre ; à 360px, il occupe la largeur disponible moins ses marges intérieures. Aucune media query n’est nécessaire : les limites sont inscrites dans les valeurs elles-mêmes.

## Exemple guidé 1

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.titre {
  font-size: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
  line-height: 1.2;
  margin: 0;
}
```

HTML de cet exemple :

```html
<main><h1 class="titre" id="titre">Programme du club fictif</h1><p>Informations de démonstration.</p></main>
```

Résultat attendu : À 360px, le titre mesure 25px avec un interligne de 30px.

Trace :

- La valeur préférée vaut 1rem + 2.5vw : 16 + 9 = 25px.
- 25px se situe entre le minimum de 24px et le maximum de 40px.
- clamp() retient donc 25px.
- L’interligne vaut 1,2 × 25 = 30px.

## Exemple guidé 2

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.article {
  max-width: 34rem;
  margin-inline: auto;
  padding-inline: 1rem;
}
.article p { margin-block: 0 1rem; }
```

HTML de cet exemple :

```html
<main class="article" id="article"><h1 class="titre" id="titre">Programme du club fictif</h1><p id="texte">Le club se réunit chaque mardi pour une lecture à voix haute, puis chaque jeudi pour entretenir un petit jardin partagé. Ces informations sont fictives.</p></main>
```

Résultat attendu : À 720px, le bloc de texte mesure 544px, garde 16px de marge intérieure et se centre avec 72px de chaque côté.

Trace :

- 34rem valent 544px avec le réglage par défaut.
- Les marges intérieures ajoutent 16px de chaque côté : 576px au total.
- Il reste 720 − 576 = 144px, répartis par margin-inline: auto.
- Chaque marge extérieure mesure 72px.

## Vérifier et expliquer

Contrôle les tailles aux largeurs annoncées, puis agrandis le texte dans les réglages du navigateur : les tailles en rem doivent suivre. Compte aussi les caractères d’une ligne sur un écran large.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — clamp()](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/clamp)
- [MDN — font-size](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/font-size)
- [MDN — line-height](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/line-height)
- [WAI — Redimensionnement du texte](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [W3C — CSS Values and Units](https://www.w3.org/TR/css-values-4/)
