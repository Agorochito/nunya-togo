---
{
  "id": "cssi-m3-02",
  "title_fr": "Nommer les zones d’une page et placer ses blocs",
  "course": "css-intermediaire",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "cssi-m3-01"
  ],
  "outcomes": [
    "Décrire une disposition avec grid-template-areas et y rattacher chaque bloc par grid-area.",
    "Étendre un élément sur plusieurs pistes avec span et les numéros de ligne, sans changer l’ordre du document."
  ],
  "idea_fr": "Nommer les zones d’une grille revient à dessiner le plan de la page dans la feuille de style, puis à dire où va chaque bloc.",
  "analogy_fr": "Le plan d’une salle indique « scène », « allée » et « gradins » ; chaque groupe rejoint la zone qui porte son nom.",
  "examples": [
    {
      "code": "body { margin: 0; }\n.page {\n  display: grid;\n  grid-template-columns: 120px minmax(0, 1fr);\n  grid-template-areas:\n    \"entete entete\"\n    \"menu contenu\"\n    \"pied pied\";\n  gap: 8px;\n}\n.entete { grid-area: entete; }\n.menu { grid-area: menu; }\n.contenu { grid-area: contenu; }\n.pied { grid-area: pied; }",
      "expected_output": "À 360px, l’en-tête et le pied couvrent 360px ; le menu mesure 120px et le contenu 232px.",
      "inputs": [],
      "trace_fr": [
        "Le plan compte trois rangées de deux mots chacune.",
        "entete et pied répètent leur nom : ils couvrent les deux colonnes.",
        "Le menu occupe la piste de 120px.",
        "Le contenu reçoit 360 − 120 − 8 = 232px."
      ],
      "browser_test": {
        "description_fr": "Zones nommées à 360px",
        "checks": [
          {
            "selector": "#entete",
            "style": {
              "width": "360px"
            }
          },
          {
            "selector": "#menu",
            "style": {
              "width": "120px"
            }
          },
          {
            "selector": "#contenu",
            "style": {
              "width": "232px"
            }
          },
          {
            "selector": "#pied",
            "style": {
              "width": "360px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<div class=\"page\" id=\"page\"><header class=\"entete\" id=\"entete\">Club fictif</header><nav class=\"menu\" id=\"menu\" aria-label=\"Sections\">Sections</nav><main class=\"contenu\" id=\"contenu\">Programme de démonstration</main><footer class=\"pied\" id=\"pied\">Données fictives</footer></div>"
    },
    {
      "code": "body { margin: 0; }\n.galerie {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n}\n.galerie p { margin: 0; }\n.bandeau { grid-column: 1 / -1; }\n.vedette { grid-column: span 2; }",
      "expected_output": "À 360px, le bandeau couvre 360px, la vedette 176px et une case simple 84px.",
      "inputs": [],
      "trace_fr": [
        "Quatre pistes partagent 360 − 24 = 336px : 84px chacune.",
        "Le bandeau va de la ligne 1 à la dernière ligne, notée -1.",
        "La vedette couvre deux pistes et une gouttière : 84 + 8 + 84 = 176px.",
        "Les autres paragraphes gardent le placement automatique."
      ],
      "browser_test": {
        "description_fr": "Placements par lignes",
        "checks": [
          {
            "selector": "#bandeau",
            "style": {
              "width": "360px"
            }
          },
          {
            "selector": "#vedette",
            "style": {
              "width": "176px"
            }
          },
          {
            "selector": "#simple",
            "style": {
              "width": "84px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"galerie\" id=\"galerie\"><p class=\"bandeau\" id=\"bandeau\">Semaine du club</p><p class=\"vedette\" id=\"vedette\">Lecture</p><p id=\"simple\">Jardin</p><p>Échecs</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier grid-area sur un enfant",
      "why_fr": "Sans rattachement, le bloc suit le placement automatique.",
      "fix_fr": "Donne à chaque bloc le nom exact de sa zone."
    },
    {
      "error": "Écrire des rangées de longueurs différentes",
      "why_fr": "Le plan est invalide et toute la déclaration est ignorée.",
      "fix_fr": "Compte les mots : chaque rangée en possède le même nombre."
    },
    {
      "error": "Réordonner visuellement un contenu important",
      "why_fr": "La lecture et le clavier suivent toujours l’ordre du HTML.",
      "fix_fr": "Garde le document dans l’ordre logique et vérifie le parcours Tab."
    }
  ],
  "quiz": [
    {
      "question": "Que se passe-t-il si une rangée de grid-template-areas contient un mot de plus que les autres ?",
      "options": [
        "Le navigateur ajoute une colonne.",
        "Seule cette rangée est ignorée.",
        "Toute la déclaration est invalide et ignorée.",
        "Le dernier mot est supprimé."
      ],
      "answer": 2,
      "explanation": "Un plan doit être rectangulaire ; sinon la déclaration entière est refusée.",
      "id": "cssi-m3-02-q1"
    },
    {
      "question": "Que signifie grid-column: 1 / -1 ?",
      "options": [
        "De la première ligne à la dernière ligne de la grille explicite.",
        "Une colonne négative hors de l’écran.",
        "La première colonne seulement.",
        "L’élément est retiré de la grille."
      ],
      "answer": 0,
      "explanation": "La ligne -1 désigne toujours la dernière ligne, quel que soit le nombre de colonnes.",
      "id": "cssi-m3-02-q2"
    },
    {
      "question": "Quel ordre suit la touche Tab dans une grille à zones nommées ?",
      "options": [
        "L’ordre des noms dans le plan.",
        "L’ordre alphabétique des zones.",
        "L’ordre visuel de gauche à droite.",
        "L’ordre du document HTML."
      ],
      "answer": 3,
      "explanation": "Les zones déplacent l’affichage, pas l’ordre du document.",
      "id": "cssi-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "zone nommée",
      "definition": "Rectangle de cases auquel grid-template-areas donne un nom."
    },
    {
      "term": "grid-area",
      "definition": "Propriété qui rattache un élément à une zone nommée."
    },
    {
      "term": "ligne de grille",
      "definition": "Séparation numérotée entre deux pistes ; -1 désigne la dernière."
    },
    {
      "term": "span",
      "definition": "Mot-clé qui étend un élément sur un nombre de pistes donné."
    }
  ],
  "recap_fr": [
    "Décrire une disposition avec grid-template-areas et y rattacher chaque bloc par grid-area.",
    "Étendre un élément sur plusieurs pistes avec span et les numéros de ligne, sans changer l’ordre du document.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "zone nommée",
    "grid-area",
    "ligne de grille",
    "span"
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
      "title": "MDN — grid-template-areas",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-areas"
    },
    {
      "title": "MDN — grid-area",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-area"
    },
    {
      "title": "MDN — grid-column",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-column"
    },
    {
      "title": "WAI — Ordre séquentiel logique",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html"
    },
    {
      "title": "W3C — CSS Grid Layout",
      "url": "https://www.w3.org/TR/css-grid-1/"
    }
  ],
  "sources": [
    {
      "title": "MDN — grid-template-areas",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-areas",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — grid-area",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-area",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — grid-column",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-column",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "WAI — Ordre séquentiel logique",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html",
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

Par défaut, une grille place ses enfants un par un, dans l’ordre du document, en remplissant chaque case. Ce placement automatique suffit pour une liste de cartes. Une page complète demande davantage : l’en-tête doit couvrir toute la largeur, le menu rester étroit, le contenu prendre le reste. Tu peux décrire ce plan de deux manières : par des zones nommées ou par des numéros de ligne.

grid-template-areas dessine le plan avec des chaînes de caractères. Chaque chaîne décrit une rangée et chaque mot nomme la zone qui occupe une colonne. Dans le premier exemple, "entete entete" indique que l’en-tête couvre les deux colonnes ; "menu contenu" place le menu à gauche et le contenu à droite ; "pied pied" étend le pied de page. La feuille de style ressemble alors à un schéma de la page, facile à relire.

Chaque élément rejoint ensuite sa zone avec grid-area. La valeur est un nom sans guillemets : .menu { grid-area: menu; }. Sans cette déclaration, le navigateur revient au placement automatique et l’élément occupe simplement la première case libre. Le nom doit correspondre exactement à celui du plan : une faute de frappe ne provoque aucun message, le bloc se retrouve seulement ailleurs.

Le plan obéit à deux règles strictes. Toutes les rangées doivent compter le même nombre de mots, et chaque zone doit former un rectangle. Une rangée plus longue que les autres, ou une zone en forme de L, rend toute la déclaration invalide : le navigateur l’ignore entièrement. Pour laisser une case vide, écris un point à la place du nom. Le débogage de cette leçon part d’un plan refusé de cette façon.

Les numéros de ligne offrent une seconde méthode, pratique pour un élément isolé. Une grille de quatre colonnes possède cinq lignes verticales, numérotées de 1 à 5 ; la ligne -1 désigne toujours la dernière. grid-column: 1 / -1 étend donc un bandeau sur toute la largeur, même si le nombre de colonnes change plus tard. grid-column: span 2 demande deux pistes à partir de la position automatique, sans fixer de point de départ. Dans le second exemple, chaque piste mesure 84px : la vedette couvre deux pistes et la gouttière qui les sépare, soit 176px.

Ces outils changent la position visuelle, jamais l’ordre du document. Un lecteur d’écran et la touche Tab suivent toujours le HTML. Si le plan affiche le menu avant un contenu qui le précède dans le code, la lecture et la navigation au clavier ne correspondent plus à ce que l’on voit. Garde donc un HTML dans l’ordre logique, puis utilise les zones pour l’arranger sans le contredire.

Les tests mesurent la largeur réelle de chaque bloc : une zone mal nommée ou un plan invalide donne immédiatement une autre mesure. Relis aussi ton plan à voix haute, rangée par rangée, comme un tableau.

## Exemple guidé 1

```css
body { margin: 0; }
.page {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  grid-template-areas:
    "entete entete"
    "menu contenu"
    "pied pied";
  gap: 8px;
}
.entete { grid-area: entete; }
.menu { grid-area: menu; }
.contenu { grid-area: contenu; }
.pied { grid-area: pied; }
```

HTML de cet exemple :

```html
<div class="page" id="page"><header class="entete" id="entete">Club fictif</header><nav class="menu" id="menu" aria-label="Sections">Sections</nav><main class="contenu" id="contenu">Programme de démonstration</main><footer class="pied" id="pied">Données fictives</footer></div>
```

Résultat attendu : À 360px, l’en-tête et le pied couvrent 360px ; le menu mesure 120px et le contenu 232px.

Trace :

- Le plan compte trois rangées de deux mots chacune.
- entete et pied répètent leur nom : ils couvrent les deux colonnes.
- Le menu occupe la piste de 120px.
- Le contenu reçoit 360 − 120 − 8 = 232px.

## Exemple guidé 2

```css
body { margin: 0; }
.galerie {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.galerie p { margin: 0; }
.bandeau { grid-column: 1 / -1; }
.vedette { grid-column: span 2; }
```

HTML de cet exemple :

```html
<main class="galerie" id="galerie"><p class="bandeau" id="bandeau">Semaine du club</p><p class="vedette" id="vedette">Lecture</p><p id="simple">Jardin</p><p>Échecs</p></main>
```

Résultat attendu : À 360px, le bandeau couvre 360px, la vedette 176px et une case simple 84px.

Trace :

- Quatre pistes partagent 360 − 24 = 336px : 84px chacune.
- Le bandeau va de la ligne 1 à la dernière ligne, notée -1.
- La vedette couvre deux pistes et une gouttière : 84 + 8 + 84 = 176px.
- Les autres paragraphes gardent le placement automatique.

## Vérifier et expliquer

Relis le plan rangée par rangée, puis parcours la page avec Tab : l’ordre doit rester celui du document. Mesure chaque bloc aux deux largeurs.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — grid-template-areas](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-template-areas)
- [MDN — grid-area](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-area)
- [MDN — grid-column](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/grid-column)
- [WAI — Ordre séquentiel logique](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html)
- [W3C — CSS Grid Layout](https://www.w3.org/TR/css-grid-1/)
