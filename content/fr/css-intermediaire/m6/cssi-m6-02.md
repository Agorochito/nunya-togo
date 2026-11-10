---
{
  "id": "cssi-m6-02",
  "title_fr": "Rendre la navigation et les cartes adaptatives",
  "course": "css-intermediaire",
  "module": "m6",
  "order": 17,
  "minutes": 20,
  "prerequisites": [
    "cssi-m6-01"
  ],
  "outcomes": [
    "Construire une navigation qui passe à la ligne et garde des zones d’appui confortables.",
    "Combiner grille automatique, minimum nul et une seule media query pour adapter le tableau."
  ],
  "idea_fr": "Chaque composant du tableau s’adapte avec l’outil le plus simple possible ; la media query n’intervient que pour une vraie décision.",
  "analogy_fr": "Dans un taxi-brousse, les bagages souples se tassent d’eux-mêmes ; on ne réorganise le chargement que lorsqu’un nouveau passager monte.",
  "examples": [
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.nav a {\n  display: block;\n  padding: 12px 16px;\n}",
      "expected_output": "À 360px, la navigation est une rangée flexible autorisée à passer à la ligne ; chaque lien offre 12px par 16px de marge intérieure.",
      "inputs": [],
      "trace_fr": [
        "La liste devient une rangée flexible sans puces ni marges.",
        "flex-wrap: wrap autorise le passage à la ligne.",
        "gap espace les liens dans les deux directions.",
        "Chaque lien est un bloc entièrement actif."
      ],
      "browser_test": {
        "description_fr": "Navigation qui passe à la ligne",
        "checks": [
          {
            "selector": "#nav",
            "style": {
              "display": "flex",
              "flex-wrap": "wrap",
              "row-gap": "8px",
              "column-gap": "8px"
            }
          },
          {
            "selector": "#lien",
            "style": {
              "display": "block",
              "padding-top": "12px",
              "padding-left": "16px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<nav aria-label=\"Rubriques du club\"><ul class=\"nav\" id=\"nav\"><li><a id=\"lien\" href=\"#ateliers\">Ateliers</a></li><li><a href=\"#calendrier\">Calendrier</a></li><li><a href=\"#membres\">Membres</a></li></ul></nav><main><h2 id=\"ateliers\">Ateliers</h2><h2 id=\"calendrier\">Calendrier</h2><h2 id=\"membres\">Membres</h2></main>"
    },
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.tableau {\n  --espace: 16px;\n  padding: var(--espace);\n}\n.cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--espace);\n}\n.carte {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}",
      "expected_output": "À 720px, le tableau affiche quatre cartes de 160px sur une seule rangée.",
      "inputs": [],
      "trace_fr": [
        "Le padding retire 32px : il reste 688px.",
        "Quatre pistes de 150px et trois gouttières demandent 648px : elles entrent.",
        "Les pistes se partagent 688 − 48 = 640px.",
        "Chaque carte mesure 160px."
      ],
      "browser_test": {
        "description_fr": "Cartes automatiques à 720px",
        "checks": [
          {
            "selector": "#cartes",
            "style": {
              "grid-template-columns": "160px 160px 160px 160px",
              "column-gap": "16px"
            }
          },
          {
            "selector": "#carte",
            "style": {
              "width": "160px",
              "min-width": "0px",
              "overflow-wrap": "anywhere"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"tableau\" id=\"tableau\"><div class=\"cartes\" id=\"cartes\"><article class=\"carte\" id=\"carte\">Lecture</article><article class=\"carte\">Jardin</article><article class=\"carte\">Échecs</article><article class=\"carte\">Chorale</article></div></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Garder la navigation sur une seule ligne",
      "why_fr": "Les derniers liens sortent de l’écran.",
      "fix_fr": "Autorise le passage à la ligne avec flex-wrap: wrap."
    },
    {
      "error": "Réduire le texte ou les marges pour tout faire tenir",
      "why_fr": "Les liens deviennent difficiles à lire et à toucher.",
      "fix_fr": "Garde une zone d’appui confortable et laisse la rangée s’étendre sur deux lignes."
    },
    {
      "error": "Ajouter une media query par composant",
      "why_fr": "Chaque condition est un cas de plus à vérifier.",
      "fix_fr": "Utilise d’abord wrap, auto-fit et clamp() ; réserve la condition à un changement de disposition."
    }
  ],
  "quiz": [
    {
      "question": "Quelle déclaration évite que les derniers liens d’une navigation sortent de l’écran ?",
      "options": [
        "overflow: hidden",
        "flex-wrap: wrap",
        "font-size: 8px",
        "position: fixed"
      ],
      "answer": 1,
      "explanation": "La rangée passe à la ligne quand la place manque, sans masquer aucun lien.",
      "id": "cssi-m6-02-q1"
    },
    {
      "question": "Pourquoi donner du padding au lien plutôt que de la marge à son élément de liste ?",
      "options": [
        "La marge est interdite dans une liste.",
        "Le padding change la couleur du lien.",
        "Le padding agrandit la zone réellement active du lien.",
        "La marge supprime le soulignement."
      ],
      "answer": 2,
      "explanation": "Tout le rectangle du lien réagit au toucher, pas seulement son texte.",
      "id": "cssi-m6-02-q2"
    },
    {
      "question": "Dans ce tableau, à quoi sert l’unique media query ?",
      "options": [
        "À placer le titre et la navigation côte à côte sur un écran large.",
        "À créer les colonnes des cartes.",
        "À faire passer les liens à la ligne.",
        "À régler la taille du titre."
      ],
      "answer": 0,
      "explanation": "Les autres adaptations sont assurées par wrap, auto-fit et clamp().",
      "id": "cssi-m6-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "passage à la ligne",
      "definition": "Capacité d’une rangée flexible à répartir ses éléments sur plusieurs lignes."
    },
    {
      "term": "zone d’appui",
      "definition": "Surface active d’un lien ou d’un bouton, que le doigt doit pouvoir viser."
    },
    {
      "term": "grille automatique",
      "definition": "Grille dont le nombre de colonnes est calculé par repeat(auto-fit, minmax())."
    },
    {
      "term": "minimum nul",
      "definition": "min-width: 0 ou minmax(0, 1fr), qui autorise un élément à rétrécir sous la taille de son contenu."
    }
  ],
  "recap_fr": [
    "Construire une navigation qui passe à la ligne et garde des zones d’appui confortables.",
    "Combiner grille automatique, minimum nul et une seule media query pour adapter le tableau.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "passage à la ligne",
    "zone d’appui",
    "grille automatique",
    "minimum nul"
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
      "title": "MDN — flex-wrap",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/flex-wrap"
    },
    {
      "title": "MDN — minmax()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax"
    },
    {
      "title": "MDN — @media",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media"
    },
    {
      "title": "WAI — Redistribution du contenu",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"
    },
    {
      "title": "W3C — CSS Flexible Box Layout",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    }
  ],
  "sources": [
    {
      "title": "MDN — flex-wrap",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/flex-wrap",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — minmax()",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — @media",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "WAI — Redistribution du contenu",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "W3C — CSS Flexible Box Layout",
      "url": "https://www.w3.org/TR/css-flexbox-1/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Les fondations sont posées : cette leçon rend le tableau utilisable du petit téléphone au grand écran. Tu connais déjà tous les outils nécessaires. L’enjeu est maintenant de choisir, pour chaque composant, le plus simple qui suffit. Un composant qui s’adapte seul vaut mieux qu’une condition supplémentaire à maintenir.

Commence par la navigation. Une liste de liens placée dans une rangée flexible reste par défaut sur une seule ligne : sur un petit écran, les derniers liens sortent de la page. flex-wrap: wrap autorise la rangée à passer à la ligne, et gap espace les liens dans les deux directions. Aucune media query n’est nécessaire : le navigateur renvoie un lien à la ligne quand la place manque. Résiste à la tentation de cacher le débordement ou de réduire la taille du texte : un lien masqué n’est plus utilisable, et un texte minuscule ne se lit plus.

Pense ensuite au doigt. Un lien de navigation se touche autant qu’il se clique. Avec display: block et un padding de 12px par 16px, chaque lien offre une zone d’appui d’environ 48px de haut, facile à viser sans toucher son voisin. Cet espace appartient au lien lui-même : tout le rectangle est actif, pas seulement le texte. Le premier exemple applique ces deux règles.

Viennent les cartes. La grille automatique du module 3 fait l’essentiel : repeat(auto-fit, minmax(150px, 1fr)) crée autant de colonnes que la largeur le permet. Le tableau possède un padding de 16px : à 360px, il reste 328px, soit deux colonnes de 156px ; à 720px, quatre colonnes de 160px. La gouttière lit la propriété --espace déclarée dans la leçon précédente.

Protège ensuite les cartes contre les contenus longs. Un nom d’atelier sans espace peut élargir sa colonne et pousser la grille hors de l’écran. Deux déclarations corrigent ce défaut : min-width: 0 sur la carte lui permet de rétrécir, et overflow-wrap: anywhere autorise la coupure du mot. Si la grille utilise des pistes 1fr écrites à la main, remplace-les par minmax(0, 1fr), comme tu l’as vu au module 3. Le débogage de cette leçon part d’un titre qui déforme toute la grille.

Reste une vraie décision de disposition : sur un écran large, le titre et la navigation tiennent côte à côte. C’est le rôle de la media query. La base empile le titre et la navigation ; à partir de 600px, l’en-tête devient une rangée flexible avec justify-content: space-between. Le titre lui-même s’adapte sans condition grâce à clamp(). Une seule media query suffit donc pour tout le tableau.

Retiens l’ordre des choix : d’abord ce que le contenu règle seul, comme le passage à la ligne et la grille automatique ; ensuite les limites inscrites dans les valeurs, comme clamp() et minmax() ; en dernier, une condition pour un changement de disposition. Les contrôles mesurent chaque composant à 360px et à 720px. Vérifie aussi le parcours au clavier : l’ordre des liens doit rester celui du document.

## Exemple guidé 1

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav a {
  display: block;
  padding: 12px 16px;
}
```

HTML de cet exemple :

```html
<nav aria-label="Rubriques du club"><ul class="nav" id="nav"><li><a id="lien" href="#ateliers">Ateliers</a></li><li><a href="#calendrier">Calendrier</a></li><li><a href="#membres">Membres</a></li></ul></nav><main><h2 id="ateliers">Ateliers</h2><h2 id="calendrier">Calendrier</h2><h2 id="membres">Membres</h2></main>
```

Résultat attendu : À 360px, la navigation est une rangée flexible autorisée à passer à la ligne ; chaque lien offre 12px par 16px de marge intérieure.

Trace :

- La liste devient une rangée flexible sans puces ni marges.
- flex-wrap: wrap autorise le passage à la ligne.
- gap espace les liens dans les deux directions.
- Chaque lien est un bloc entièrement actif.

## Exemple guidé 2

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.tableau {
  --espace: 16px;
  padding: var(--espace);
}
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--espace);
}
.carte {
  min-width: 0;
  overflow-wrap: anywhere;
}
```

HTML de cet exemple :

```html
<main class="tableau" id="tableau"><div class="cartes" id="cartes"><article class="carte" id="carte">Lecture</article><article class="carte">Jardin</article><article class="carte">Échecs</article><article class="carte">Chorale</article></div></main>
```

Résultat attendu : À 720px, le tableau affiche quatre cartes de 160px sur une seule rangée.

Trace :

- Le padding retire 32px : il reste 688px.
- Quatre pistes de 150px et trois gouttières demandent 648px : elles entrent.
- Les pistes se partagent 688 − 48 = 640px.
- Chaque carte mesure 160px.

## Vérifier et expliquer

Réduis la fenêtre jusqu’à 320px : aucun lien ni aucune carte ne doit sortir de l’écran. Parcours ensuite la navigation avec Tab.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — flex-wrap](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/flex-wrap)
- [MDN — minmax()](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Values/minmax)
- [MDN — @media](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/At-rules/@media)
- [WAI — Redistribution du contenu](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [W3C — CSS Flexible Box Layout](https://www.w3.org/TR/css-flexbox-1/)
