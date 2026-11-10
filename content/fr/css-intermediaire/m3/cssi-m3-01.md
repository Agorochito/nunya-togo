---
{
  "id": "cssi-m3-01",
  "title_fr": "Construire des pistes qui s’adaptent avec minmax()",
  "course": "css-intermediaire",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "cssi-m2-03"
  ],
  "outcomes": [
    "Écrire des pistes de grille bornées avec minmax() et repeat(auto-fit).",
    "Expliquer pourquoi 1fr garde un minimum automatique et quand choisir minmax(0, 1fr)."
  ],
  "idea_fr": "Une piste robuste annonce à la fois sa taille minimale acceptable et la part d’espace qu’elle peut prendre.",
  "analogy_fr": "Sur un marché, chaque étal a besoin d’une largeur minimale ; le placier ajoute des étals par rangée tant que ce minimum reste respecté.",
  "examples": [
    {
      "code": "body { margin: 0; }\n.cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 16px;\n}",
      "expected_output": "À 360px, la grille forme deux colonnes de 172px ; les quatre cartes occupent deux rangées.",
      "inputs": [],
      "trace_fr": [
        "La grille dispose de 360px sans marge extérieure.",
        "Deux pistes de 160px et une gouttière de 16px demandent 336px : elles entrent.",
        "Une troisième piste exigerait 512px : le navigateur s’arrête à deux.",
        "Les 344px hors gouttière sont partagés : 172px par colonne."
      ],
      "browser_test": {
        "description_fr": "Deux colonnes égales à 360px",
        "checks": [
          {
            "selector": "#cartes",
            "style": {
              "display": "grid",
              "grid-template-columns": "172px 172px",
              "column-gap": "16px"
            }
          },
          {
            "selector": ".carte",
            "style": {
              "width": "172px"
            },
            "count": 4
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"cartes\" id=\"cartes\"><article class=\"carte\">Lecture</article><article class=\"carte\">Jardin</article><article class=\"carte\">Échecs</article><article class=\"carte\">Chorale</article></main>"
    },
    {
      "code": "body { margin: 0; }\n.fiche {\n  display: grid;\n  grid-template-columns: 96px minmax(0, 1fr);\n  gap: 8px;\n}\n.reference { overflow-wrap: break-word; }",
      "expected_output": "À 360px, le repère garde 96px et la référence occupe les 256px restants en se coupant sur plusieurs lignes.",
      "inputs": [],
      "trace_fr": [
        "La première piste réserve 96px au repère.",
        "La gouttière retire 8px : il reste 256px.",
        "minmax(0, 1fr) supprime le minimum automatique de la seconde piste.",
        "overflow-wrap: break-word coupe la longue référence à l’intérieur de ces 256px."
      ],
      "browser_test": {
        "description_fr": "Piste flexible sans débordement",
        "checks": [
          {
            "selector": "#fiche",
            "style": {
              "grid-template-columns": "96px 256px"
            }
          },
          {
            "selector": "#reference",
            "style": {
              "width": "256px",
              "overflow-wrap": "break-word"
            },
            "textIncludes": "ReferenceDePreparationDuClubSansEspacePourObserverLeDebordement"
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"fiche\" id=\"fiche\"><span class=\"repere\">Réf.</span><p class=\"reference\" id=\"reference\">ReferenceDePreparationDuClubSansEspacePourObserverLeDebordement</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire trois colonnes fixes pour toutes les largeurs",
      "why_fr": "La somme des pistes dépasse un petit écran.",
      "fix_fr": "Décris un minimum et laisse repeat(auto-fit) choisir le nombre de colonnes."
    },
    {
      "error": "Choisir un minimum plus large que le plus petit écran visé",
      "why_fr": "La piste refuse de rétrécir et la grille déborde.",
      "fix_fr": "Fixe le minimum d’après le contenu lisible le plus étroit."
    },
    {
      "error": "Croire que 1fr rétrécit toujours",
      "why_fr": "1fr conserve un minimum automatique lié au contenu.",
      "fix_fr": "Écris minmax(0, 1fr) quand le texte peut se couper."
    }
  ],
  "quiz": [
    {
      "question": "Que garantit minmax(160px, 1fr) pour une colonne ?",
      "options": [
        "Elle mesure toujours exactement 160px.",
        "Elle ne descend pas sous 160px et peut grandir en partageant l’espace libre.",
        "Elle disparaît sous 160px de large.",
        "Elle impose 160px à toutes les autres colonnes."
      ],
      "answer": 1,
      "explanation": "Le premier argument borne la taille minimale, le second la croissance.",
      "id": "cssi-m3-01-q1"
    },
    {
      "question": "Une grille de 360px utilise repeat(auto-fit, minmax(160px, 1fr)) et gap 16px. Combien de colonnes ?",
      "options": [
        "Une.",
        "Trois.",
        "Deux.",
        "Quatre."
      ],
      "answer": 2,
      "explanation": "Deux pistes et une gouttière demandent 336px ; une troisième exigerait 512px.",
      "id": "cssi-m3-01-q2"
    },
    {
      "question": "Pourquoi écrire minmax(0, 1fr) plutôt que 1fr pour un long texte ?",
      "options": [
        "Pour interdire toute coupure du texte.",
        "Parce que fr ne fonctionne pas avec du texte.",
        "Pour changer la couleur de la piste.",
        "Pour remplacer le minimum automatique lié au contenu par zéro."
      ],
      "answer": 3,
      "explanation": "1fr équivaut à minmax(auto, 1fr) ; le minimum automatique peut élargir la piste.",
      "id": "cssi-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "piste",
      "definition": "Colonne ou rangée d’une grille, délimitée par deux lignes."
    },
    {
      "term": "minmax()",
      "definition": "Fonction qui borne la taille d’une piste entre un minimum et un maximum."
    },
    {
      "term": "auto-fit",
      "definition": "Mot-clé de repeat() qui crée autant de pistes que l’espace le permet."
    },
    {
      "term": "minimum automatique",
      "definition": "Taille minimale qu’une piste tire de son contenu quand aucun minimum n’est précisé."
    }
  ],
  "recap_fr": [
    "Écrire des pistes de grille bornées avec minmax() et repeat(auto-fit).",
    "Expliquer pourquoi 1fr garde un minimum automatique et quand choisir minmax(0, 1fr).",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "piste",
    "minmax()",
    "auto-fit",
    "minimum automatique"
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
      "title": "MDN — minmax()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax"
    },
    {
      "title": "MDN — repeat()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/repeat"
    },
    {
      "title": "MDN — grid-template-columns",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-columns"
    },
    {
      "title": "W3C — CSS Grid Layout",
      "url": "https://www.w3.org/TR/css-grid-1/"
    }
  ],
  "sources": [
    {
      "title": "MDN — minmax()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — repeat()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/repeat",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — grid-template-columns",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-columns",
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

Dans le socle, tu as créé des grilles avec un nombre fixe de colonnes. Cette approche fonctionne tant que l’écran et le contenu ressemblent à ceux que tu as imaginés. Trois colonnes de 160px demandent pourtant plus de 480px : sur un téléphone de 360px, la grille dépasse et une partie du contenu sort de l’écran. Une piste robuste ne fixe pas une taille unique ; elle décrit un intervalle acceptable.

La fonction minmax(minimum, maximum) exprime cet intervalle. Avec minmax(160px, 1fr), une colonne ne descend jamais sous 160px et peut grandir en partageant l’espace libre avec ses voisines. L’unité fr représente une part de l’espace restant après les tailles fixes et les gouttières. Deux pistes de 1fr reçoivent donc la même part, quelle que soit la largeur disponible.

Reste à décider combien de colonnes placer. repeat(auto-fit, minmax(160px, 1fr)) confie ce calcul au navigateur : il crée autant de pistes que la largeur le permet, sans jamais passer sous le minimum. Dans le premier exemple, une grille de 360px avec une gouttière de 16px accepte deux colonnes, car 160 + 16 + 160 = 336. Une troisième exigerait 512px. Les deux pistes se partagent alors les 344px restants : 172px chacune. À 720px, la même règle produit quatre colonnes de 168px, sans aucune autre déclaration.

Le minimum est une décision de conception, pas une valeur magique. Demande-toi quelle largeur garde une carte lisible avec son contenu réel. Un minimum trop grand, par exemple 400px, fait déborder la grille sur un petit écran, puisque la piste refuse de rétrécir. Un minimum trop petit crée des colonnes illisibles. Le débogage de cette leçon corrige précisément ce défaut.

Un second piège concerne 1fr seul. Cette écriture équivaut à minmax(auto, 1fr) : le minimum automatique dépend du contenu. Une longue référence sans espace peut alors élargir sa piste bien au-delà de l’espace prévu, même si overflow-wrap: break-word autorise la coupure. Cette propriété permet de couper le mot, mais elle ne réduit pas la taille minimale que le navigateur calcule pour la piste. En écrivant minmax(0, 1fr), tu remplaces ce minimum automatique par zéro : la piste respecte l’espace restant et le texte se coupe à l’intérieur. Le second exemple réserve 96px à un repère et donne exactement les 256px restants à la référence.

Retiens la différence entre les deux outils. minmax(160px, 1fr) protège une largeur minimale utile pour des cartes comparables. minmax(0, 1fr) autorise au contraire une piste à rétrécir autant que nécessaire, pour un texte qui sait se couper. Les tests mesurent les largeurs calculées à 360px et 720px : une valeur figée pour une seule largeur échoue à l’autre. Complète-les en élargissant lentement la fenêtre pour observer le moment où une colonne apparaît.

## Exemple guidé 1

```css
body { margin: 0; }
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}
```

HTML de cet exemple :

```html
<main class="cartes" id="cartes"><article class="carte">Lecture</article><article class="carte">Jardin</article><article class="carte">Échecs</article><article class="carte">Chorale</article></main>
```

Résultat attendu : À 360px, la grille forme deux colonnes de 172px ; les quatre cartes occupent deux rangées.

Trace :

- La grille dispose de 360px sans marge extérieure.
- Deux pistes de 160px et une gouttière de 16px demandent 336px : elles entrent.
- Une troisième piste exigerait 512px : le navigateur s’arrête à deux.
- Les 344px hors gouttière sont partagés : 172px par colonne.

## Exemple guidé 2

```css
body { margin: 0; }
.fiche {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 8px;
}
.reference { overflow-wrap: break-word; }
```

HTML de cet exemple :

```html
<main class="fiche" id="fiche"><span class="repere">Réf.</span><p class="reference" id="reference">ReferenceDePreparationDuClubSansEspacePourObserverLeDebordement</p></main>
```

Résultat attendu : À 360px, le repère garde 96px et la référence occupe les 256px restants en se coupant sur plusieurs lignes.

Trace :

- La première piste réserve 96px au repère.
- La gouttière retire 8px : il reste 256px.
- minmax(0, 1fr) supprime le minimum automatique de la seconde piste.
- overflow-wrap: break-word coupe la longue référence à l’intérieur de ces 256px.

## Vérifier et expliquer

Mesure les pistes aux deux largeurs annoncées, puis élargis lentement la fenêtre pour repérer l’apparition d’une colonne. Essaie aussi un intitulé plus long dans une carte.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — minmax()](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax)
- [MDN — repeat()](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/repeat)
- [MDN — grid-template-columns](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-columns)
- [W3C — CSS Grid Layout](https://www.w3.org/TR/css-grid-1/)
