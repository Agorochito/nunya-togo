---
{
  "id": "cssi-m6-03",
  "title_fr": "Livrer le tableau : états accessibles et revue finale",
  "course": "css-intermediaire",
  "module": "m6",
  "order": 18,
  "minutes": 20,
  "prerequisites": [
    "cssi-m6-02"
  ],
  "outcomes": [
    "Signaler la page courante, le focus et l’indisponibilité sans dépendre de la seule couleur.",
    "Ajouter un thème sombre local et relire le projet à deux largeurs avant de le livrer."
  ],
  "idea_fr": "Livrer, c’est vérifier que chaque état reste compréhensible pour toutes les personnes, dans chaque thème et à chaque largeur.",
  "analogy_fr": "Avant d’ouvrir une salle au public, on vérifie chaque porte, chaque éclairage et chaque panneau, de jour comme de nuit.",
  "examples": [
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.nav a {\n  display: block;\n  padding: 12px 16px;\n  color: #164e63;\n  border-bottom: 3px solid transparent;\n}\n.nav a[aria-current=\"page\"] {\n  font-weight: 700;\n  border-bottom-color: #164e63;\n}\n.nav a:focus {\n  outline: 3px solid #9a3412;\n  outline-offset: 2px;\n}",
      "expected_output": "Le lien courant est gras et souligné d’une bordure de 3px ; le lien focalisé reçoit un contour de 3px.",
      "inputs": [],
      "trace_fr": [
        "Tous les liens réservent une bordure inférieure transparente de 3px.",
        "Le sélecteur d’attribut repère le lien portant aria-current=\"page\".",
        "Ce lien reçoit une graisse de 700 et une bordure colorée.",
        "Le contrôle focalise l’autre lien : son contour apparaît."
      ],
      "browser_test": {
        "description_fr": "Page courante et focus",
        "checks": [
          {
            "selector": "#actuel",
            "style": {
              "font-weight": "700",
              "border-bottom-color": "#164e63",
              "border-bottom-width": "3px"
            },
            "attributes": {
              "aria-current": "page"
            }
          },
          {
            "selector": "#autre",
            "style": {
              "border-bottom-color": "transparent",
              "border-bottom-width": "3px"
            }
          },
          {
            "selector": "#autre:focus",
            "style": {
              "outline-style": "solid",
              "outline-width": "3px",
              "outline-color": "#9a3412",
              "outline-offset": "2px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        },
        "focus_selector": "#autre"
      },
      "fixture_html": "<nav aria-label=\"Rubriques du club\"><ul class=\"nav\" id=\"nav\"><li><a id=\"actuel\" href=\"#ateliers\" aria-current=\"page\">Ateliers</a></li><li><a id=\"autre\" href=\"#calendrier\">Calendrier</a></li></ul></nav><main><h1 id=\"ateliers\">Ateliers</h1><h2 id=\"calendrier\">Calendrier</h2></main>"
    },
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.tableau {\n  --espace: 16px;\n  --surface: #ffffff;\n  --texte: #172a3a;\n  --ligne: #475569;\n  --focus: #9a3412;\n  color: var(--texte);\n  background-color: var(--surface);\n  padding: var(--espace);\n}\n.tableau[data-theme=\"sombre\"] {\n  --surface: #172a3a;\n  --texte: #f8fafc;\n  --ligne: #94a3b8;\n  --focus: #fbbf24;\n}\n.cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--espace);\n}\n.carte {\n  min-width: 0;\n  padding: var(--espace);\n  border: 1px solid var(--ligne);\n}",
      "expected_output": "À 720px, le tableau sombre affiche un texte clair sur fond bleu nuit et quatre cartes de 160px aux bordures éclaircies.",
      "inputs": [],
      "trace_fr": [
        "L’attribut data-theme=\"sombre\" active la seconde règle.",
        "Elle redéfinit quatre rôles, sans toucher aux composants.",
        "Le tableau et les cartes lisent les nouvelles valeurs.",
        "La grille automatique reste identique : quatre colonnes de 160px."
      ],
      "browser_test": {
        "description_fr": "Thème sombre local à 720px",
        "checks": [
          {
            "selector": "#tableau",
            "style": {
              "color": "#f8fafc",
              "background-color": "#172a3a",
              "--focus": "#fbbf24"
            }
          },
          {
            "selector": "#carte",
            "style": {
              "border-top-color": "#94a3b8",
              "padding-top": "16px"
            }
          },
          {
            "selector": "#cartes",
            "style": {
              "grid-template-columns": "160px 160px 160px 160px"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"tableau\" id=\"tableau\" data-theme=\"sombre\"><h1>Tableau du club fictif</h1><div class=\"cartes\" id=\"cartes\"><article class=\"carte\" id=\"carte\">Lecture</article><article class=\"carte\">Jardin</article><article class=\"carte\">Échecs</article><article class=\"carte\">Chorale</article></div></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Signaler la page courante par la seule couleur",
      "why_fr": "L’information échappe aux personnes qui distinguent mal les teintes.",
      "fix_fr": "Ajoute une graisse, une bordure ou un autre indice indépendant de la couleur."
    },
    {
      "error": "Supprimer le contour de focus",
      "why_fr": "La navigation au clavier devient impossible à suivre.",
      "fix_fr": "Garde un contour net, ou remplace-le par un indicateur aussi visible."
    },
    {
      "error": "Oublier un rôle dans le thème sombre",
      "why_fr": "Un élément garde une couleur prévue pour le fond clair.",
      "fix_fr": "Reconsidère chaque rôle, y compris celui du focus."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi cibler a[aria-current=\"page\"] plutôt qu’une classe ajoutée à la main ?",
      "options": [
        "Les classes ne fonctionnent pas sur les liens.",
        "L’attribut change automatiquement la couleur.",
        "Le sélecteur d’attribut est toujours plus rapide.",
        "Le style suit le sens déjà exprimé dans le HTML pour les technologies d’assistance."
      ],
      "answer": 3,
      "explanation": "Une seule information, portée par le document, sert à la fois l’annonce et l’apparence.",
      "id": "cssi-m6-03-q1"
    },
    {
      "question": "Quel défaut pose * { outline: none; } ?",
      "options": [
        "Il supprime l’indicateur de focus de tous les éléments.",
        "Il agrandit toutes les bordures.",
        "Il désactive les liens.",
        "Il empêche le thème sombre."
      ],
      "answer": 0,
      "explanation": "Sans indicateur, une personne au clavier ne sait plus où elle se trouve.",
      "id": "cssi-m6-03-q2"
    },
    {
      "question": "Pourquoi redéfinir --focus dans le thème sombre ?",
      "options": [
        "Parce que les propriétés personnalisées ne sont pas héritées.",
        "Parce qu’une teinte foncée lisible sur fond clair se voit mal sur fond sombre.",
        "Pour désactiver le focus la nuit.",
        "Parce que outline ne lit pas var()."
      ],
      "answer": 1,
      "explanation": "Chaque rôle doit rester visible sur la surface de son thème.",
      "id": "cssi-m6-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "aria-current",
      "definition": "Attribut HTML qui désigne l’élément courant, par exemple la page affichée."
    },
    {
      "term": "indicateur de focus",
      "definition": "Marque visible sur l’élément qui recevra la prochaine action du clavier."
    },
    {
      "term": "état indisponible",
      "definition": "État d’un contrôle portant disabled, ciblé en CSS par :disabled."
    },
    {
      "term": "thème local",
      "definition": "Jeu de valeurs appliqué à un conteneur grâce à un attribut."
    }
  ],
  "recap_fr": [
    "Signaler la page courante, le focus et l’indisponibilité sans dépendre de la seule couleur.",
    "Ajouter un thème sombre local et relire le projet à deux largeurs avant de le livrer.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "aria-current",
    "indicateur de focus",
    "état indisponible",
    "thème local"
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
      "title": "MDN — aria-current",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current"
    },
    {
      "title": "MDN — :focus-visible",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:focus-visible"
    },
    {
      "title": "MDN — :disabled",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:disabled"
    },
    {
      "title": "WAI — Focus visible",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"
    },
    {
      "title": "WAI — Utilisation de la couleur",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    },
    {
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties"
    }
  ],
  "sources": [
    {
      "title": "MDN — aria-current",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — :focus-visible",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:focus-visible",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — :disabled",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:disabled",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "WAI — Focus visible",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "WAI — Utilisation de la couleur",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Le tableau est structuré et adaptable. Il reste à le rendre compréhensible dans toutes les situations d’usage, puis à le relire avant de le livrer. Cette dernière leçon réunit les états du module 5 et les fondations du module 6.

Premier état : la page courante. Dans le HTML, le lien de la rubrique affichée porte aria-current="page". Cet attribut annonce l’information aux technologies d’assistance ; le CSS peut s’appuyer dessus avec le sélecteur d’attribut a[aria-current="page"]. Le style suit ainsi le sens du document, sans classe supplémentaire à tenir à jour. Changer seulement la couleur du lien ne suffirait pas : une personne qui distingue mal les teintes ne verrait aucune différence. Le premier exemple ajoute donc deux indices indépendants de la teinte : une graisse de 700 et une bordure inférieure de 3px. Cette bordure existe déjà sur tous les liens, en transparent : le lien courant ne change pas de hauteur et rien ne saute.

Deuxième état : le focus. Toute personne qui navigue au clavier doit voir où elle se trouve. Les liens et les boutons reçoivent un contour net de 3px, détaché par outline-offset. Ne supprime jamais ce contour sans le remplacer. Une règle globale comme * { outline: none; } rend le tableau inutilisable au clavier, et !important la rend difficile à corriger. Les contrôles focalisent réellement un élément, puis lisent son contour. Ils utilisent :focus pour rester prévisibles ; dans un vrai projet, :focus-visible laisse le navigateur décider quand afficher l’indicateur.

Troisième état : l’indisponibilité. Un bouton portant l’attribut disabled ne peut être ni activé ni focalisé. Le sélecteur :disabled permet de le signaler. Là encore, évite de tout confier à une teinte pâle ou à l’opacité : le texte deviendrait difficile à lire. Une bordure en tirets et un libellé explicite, comme « Atelier complet », disent la même chose de deux manières.

Vient le thème sombre. Les rôles déclarés dans la première leçon rendent ce travail court : la règle .tableau[data-theme="sombre"] redéfinit --surface, --texte, --ligne et --focus, et tous les composants suivent. Chaque rôle doit être reconsidéré. Un contour de focus brun foncé, lisible sur fond blanc, disparaît presque sur un fond bleu nuit : le thème sombre lui donne une teinte claire. Oublier un seul rôle crée un défaut que l’on ne remarque qu’en utilisant vraiment le thème. Le second exemple applique ce thème à un tableau complet. Le thème reste local : il dépend d’un attribut du conteneur, et aucun script n’est nécessaire pour l’étudier.

Termine par une revue. À 360px puis à 720px, vérifie que rien ne déborde, que le titre reste lisible et que les cartes se répartissent correctement. Parcours ensuite tout le tableau avec Tab et Maj+Tab, dans chaque thème. Lis enfin la feuille elle-même : valeurs répétées, sélecteurs trop spécifiques, conditions inutiles.

Les contrôles automatiques prouvent des valeurs précises ; ils ne certifient pas l’accessibilité du projet. Seul un essai par de vraies personnes, avec leurs réglages et leurs outils, confirme qu’une interface est utilisable. Garde cette modestie : elle fait partie du métier.

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
  color: #164e63;
  border-bottom: 3px solid transparent;
}
.nav a[aria-current="page"] {
  font-weight: 700;
  border-bottom-color: #164e63;
}
.nav a:focus {
  outline: 3px solid #9a3412;
  outline-offset: 2px;
}
```

HTML de cet exemple :

```html
<nav aria-label="Rubriques du club"><ul class="nav" id="nav"><li><a id="actuel" href="#ateliers" aria-current="page">Ateliers</a></li><li><a id="autre" href="#calendrier">Calendrier</a></li></ul></nav><main><h1 id="ateliers">Ateliers</h1><h2 id="calendrier">Calendrier</h2></main>
```

Résultat attendu : Le lien courant est gras et souligné d’une bordure de 3px ; le lien focalisé reçoit un contour de 3px.

Trace :

- Tous les liens réservent une bordure inférieure transparente de 3px.
- Le sélecteur d’attribut repère le lien portant aria-current="page".
- Ce lien reçoit une graisse de 700 et une bordure colorée.
- Le contrôle focalise l’autre lien : son contour apparaît.

## Exemple guidé 2

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.tableau {
  --espace: 16px;
  --surface: #ffffff;
  --texte: #172a3a;
  --ligne: #475569;
  --focus: #9a3412;
  color: var(--texte);
  background-color: var(--surface);
  padding: var(--espace);
}
.tableau[data-theme="sombre"] {
  --surface: #172a3a;
  --texte: #f8fafc;
  --ligne: #94a3b8;
  --focus: #fbbf24;
}
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--espace);
}
.carte {
  min-width: 0;
  padding: var(--espace);
  border: 1px solid var(--ligne);
}
```

HTML de cet exemple :

```html
<main class="tableau" id="tableau" data-theme="sombre"><h1>Tableau du club fictif</h1><div class="cartes" id="cartes"><article class="carte" id="carte">Lecture</article><article class="carte">Jardin</article><article class="carte">Échecs</article><article class="carte">Chorale</article></div></main>
```

Résultat attendu : À 720px, le tableau sombre affiche un texte clair sur fond bleu nuit et quatre cartes de 160px aux bordures éclaircies.

Trace :

- L’attribut data-theme="sombre" active la seconde règle.
- Elle redéfinit quatre rôles, sans toucher aux composants.
- Le tableau et les cartes lisent les nouvelles valeurs.
- La grille automatique reste identique : quatre colonnes de 160px.

## Vérifier et expliquer

Parcours le tableau avec Tab et Maj+Tab dans chaque thème, puis relis-le à 360px et à 720px. Note ce que les contrôles automatiques ne peuvent pas prouver.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — aria-current](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current)
- [MDN — :focus-visible](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:focus-visible)
- [MDN — :disabled](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:disabled)
- [WAI — Focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [WAI — Utilisation de la couleur](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [MDN — Utiliser les propriétés personnalisées](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
