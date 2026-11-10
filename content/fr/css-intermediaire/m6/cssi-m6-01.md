---
{
  "id": "cssi-m6-01",
  "title_fr": "Poser les fondations : valeurs partagées et composants",
  "course": "css-intermediaire",
  "module": "m6",
  "order": 16,
  "minutes": 20,
  "prerequisites": [
    "cssi-m5-03"
  ],
  "outcomes": [
    "Regrouper les décisions du projet dans des propriétés personnalisées déclarées sur le conteneur.",
    "Écrire un composant réutilisable et sa variante sans dupliquer ses règles."
  ],
  "idea_fr": "Un projet tient dans le temps quand chaque décision est écrite une seule fois et que chaque composant porte ses propres règles.",
  "analogy_fr": "Avant de bâtir, le maçon fixe ses mesures et prépare un moule : toutes les briques en sortent identiques, et une seule mesure à changer suffit.",
  "examples": [
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.tableau {\n  --espace: 16px;\n  --surface: #ffffff;\n  --texte: #172a3a;\n  --ligne: #475569;\n  color: var(--texte);\n  background-color: var(--surface);\n  padding: var(--espace);\n}\n.carte {\n  border: 1px solid var(--ligne);\n  border-radius: 8px;\n  padding: var(--espace);\n}",
      "expected_output": "Le tableau et la carte partagent un espacement de 16px ; la carte porte une bordure de 1px de la couleur --ligne.",
      "inputs": [],
      "trace_fr": [
        "Quatre décisions sont déclarées sur .tableau.",
        "Le tableau lit --texte, --surface et --espace.",
        "La carte hérite de ces propriétés.",
        "Son padding et sa bordure lisent --espace et --ligne."
      ],
      "browser_test": {
        "description_fr": "Valeurs partagées",
        "checks": [
          {
            "selector": "#tableau",
            "style": {
              "--espace": "16px",
              "color": "#172a3a",
              "background-color": "#ffffff",
              "padding-left": "16px"
            }
          },
          {
            "selector": "#carte",
            "style": {
              "border-top-color": "#475569",
              "border-top-width": "1px",
              "border-top-left-radius": "8px",
              "padding-top": "16px"
            }
          }
        ]
      },
      "fixture_html": "<main class=\"tableau\" id=\"tableau\"><h1>Tableau du club fictif</h1><article class=\"carte\" id=\"carte\"><h2>Lecture</h2><p>Mardi, salle 2.</p></article></main>"
    },
    {
      "code": "body { margin: 0; font: 1rem/1.5 sans-serif; }\n.badge {\n  --badge-fond: #e0f2fe;\n  --badge-texte: #0c4a6e;\n  display: inline-block;\n  padding: 2px 8px;\n  border: 1px solid var(--badge-texte);\n  border-radius: 4px;\n  color: var(--badge-texte);\n  background-color: var(--badge-fond);\n}\n.badge.complet {\n  --badge-fond: #ffedd5;\n  --badge-texte: #7c2d12;\n}",
      "expected_output": "Les deux badges partagent forme et espacement ; « Complet » redéfinit seulement ses deux couleurs.",
      "inputs": [],
      "trace_fr": [
        ".badge déclare ses couleurs comme propriétés locales.",
        "Couleur, fond et bordure lisent ces propriétés.",
        ".badge.complet redéfinit les deux propriétés.",
        "Le padding et l’arrondi restent ceux du composant."
      ],
      "browser_test": {
        "description_fr": "Composant et variante",
        "checks": [
          {
            "selector": "#ouvert",
            "style": {
              "color": "#0c4a6e",
              "background-color": "#e0f2fe",
              "padding-left": "8px"
            },
            "textIncludes": "Ouvert"
          },
          {
            "selector": "#complet",
            "style": {
              "color": "#7c2d12",
              "background-color": "#ffedd5",
              "border-top-color": "#7c2d12",
              "padding-left": "8px",
              "border-top-left-radius": "4px"
            },
            "textIncludes": "Complet"
          }
        ]
      },
      "fixture_html": "<main><p><span class=\"badge\" id=\"ouvert\">Ouvert</span> <span class=\"badge complet\" id=\"complet\">Complet</span></p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Recopier la même valeur dans plusieurs règles",
      "why_fr": "Un changement oblige à retrouver chaque occurrence.",
      "fix_fr": "Déclare la décision une fois et lis-la avec var()."
    },
    {
      "error": "Nommer une propriété d’après sa couleur",
      "why_fr": "Le nom devient faux dès que la valeur change.",
      "fix_fr": "Nomme le rôle : --texte, --surface, --ligne."
    },
    {
      "error": "Cibler un composant par son emplacement ou un identifiant",
      "why_fr": "La règle n’est plus réutilisable et sa spécificité bloque les variantes.",
      "fix_fr": "Utilise une classe unique par composant."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi déclarer --espace sur le conteneur du projet ?",
      "options": [
        "Pour que chaque règle lise la même décision, modifiable en une ligne.",
        "Pour accélérer le chargement des images.",
        "Parce que padding n’accepte pas de valeur en px.",
        "Pour empêcher les cartes d’hériter du style."
      ],
      "answer": 0,
      "explanation": "La propriété est héritée ; toutes les règles qui la lisent suivent sa valeur.",
      "id": "cssi-m6-01-q1"
    },
    {
      "question": "Quel nom de propriété résiste le mieux à un changement de thème ?",
      "options": [
        "--gris-475569",
        "--bleu-fonce",
        "--texte",
        "--couleur2"
      ],
      "answer": 2,
      "explanation": "Un nom de rôle reste juste quelle que soit la valeur.",
      "id": "cssi-m6-01-q2"
    },
    {
      "question": "Que doit contenir une variante comme .badge.complet ?",
      "options": [
        "Toutes les règles du badge, recopiées.",
        "Un sélecteur d’identifiant.",
        "Une media query.",
        "Seulement ce qui diffère, par exemple deux propriétés redéfinies."
      ],
      "answer": 3,
      "explanation": "La variante redéfinit les propriétés locales ; le reste vient du composant de base.",
      "id": "cssi-m6-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "décision partagée",
      "definition": "Valeur du projet déclarée une fois, sous forme de propriété personnalisée."
    },
    {
      "term": "composant",
      "definition": "Bloc autonome et réutilisable dont une classe porte toutes les règles."
    },
    {
      "term": "variante",
      "definition": "Version d’un composant qui ne redéfinit que ses différences."
    },
    {
      "term": "spécificité",
      "definition": "Poids d’un sélecteur, qui décide quelle règle l’emporte."
    }
  ],
  "recap_fr": [
    "Regrouper les décisions du projet dans des propriétés personnalisées déclarées sur le conteneur.",
    "Écrire un composant réutilisable et sa variante sans dupliquer ses règles.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "décision partagée",
    "composant",
    "variante",
    "spécificité"
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
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties"
    },
    {
      "title": "MDN — :where()",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where"
    },
    {
      "title": "WAI — Utilisation de la couleur",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    },
    {
      "title": "W3C — CSS Custom Properties",
      "url": "https://www.w3.org/TR/css-variables-1/"
    }
  ],
  "sources": [
    {
      "title": "MDN — Utiliser les propriétés personnalisées",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — :where()",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where",
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
      "title": "W3C — CSS Custom Properties",
      "url": "https://www.w3.org/TR/css-variables-1/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Ce module final rassemble tout le cours dans un seul projet : le tableau de bord d’un club fictif, avec un en-tête, une navigation, des cartes d’ateliers et des états accessibles. Avant de disposer quoi que ce soit, cette première leçon pose les fondations de la feuille de style. Un projet qui grandit sans méthode accumule des valeurs presque identiques et des règles qui se contredisent ; deux habitudes évitent ce désordre.

La première habitude consiste à écrire chaque décision une seule fois. Un espacement, une couleur de texte, une couleur de bordure sont des décisions du projet, pas des détails propres à une règle. Déclare-les comme propriétés personnalisées sur le conteneur : --espace, --surface, --texte, --ligne. Chaque règle les lit ensuite avec var(). Dans le premier exemple, le padding du tableau et celui des cartes lisent tous deux var(--espace). Modifier la décision revient à changer une ligne, et non à chercher chaque occurrence de 16px dans le fichier.

Nomme ces propriétés d’après leur rôle, pas d’après leur apparence. --texte reste juste si la couleur change ; --bleu-fonce deviendrait faux le jour où le thème passe à une autre teinte. Cette précaution prépare aussi le thème sombre de la dernière leçon, qui redéfinira les mêmes rôles avec d’autres valeurs.

La seconde habitude est de penser en composants. Un composant est un bloc autonome et réutilisable : une carte, un badge, un bouton. Une classe unique, comme .carte, porte toutes ses règles. Évite les sélecteurs qui dépendent de l’emplacement, par exemple #tableau main .carte : ils ne fonctionnent qu’à un endroit, et leur spécificité élevée rend toute modification ultérieure difficile. Un sélecteur d’identifiant l’emporte sur n’importe quel nombre de classes ; un composant écrit avec une seule classe reste au contraire facile à ajuster.

Un composant a souvent besoin de variantes : un badge « Ouvert » et un badge « Complet », une carte normale et une carte compacte. Recopier toutes les règles pour chaque variante crée des doublons qui finissent par diverger. Donne plutôt au composant ses propres propriétés locales. Dans le second exemple, .badge déclare --badge-fond et --badge-texte, puis les utilise pour sa couleur, son fond et sa bordure. La variante .badge.complet ne contient que deux déclarations : elle redéfinit ces deux propriétés. Le padding, la bordure et l’arrondi restent ceux du composant de base.

Les deux badges se distinguent aussi par leur texte, « Ouvert » et « Complet ». La couleur renforce l’information, elle ne la porte pas seule : une personne qui distingue mal les teintes lit le mot.

Les contrôles lisent les styles calculés : couleurs, bordures, espacements, ainsi que la valeur de --espace. Ils vérifient en outre qu’une variante modifie réellement le composant. Une variante qui recopie les règles de base peut réussir aujourd’hui ; elle te coûtera cher à la première évolution. Relis donc ta feuille en cherchant les valeurs répétées.

## Exemple guidé 1

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.tableau {
  --espace: 16px;
  --surface: #ffffff;
  --texte: #172a3a;
  --ligne: #475569;
  color: var(--texte);
  background-color: var(--surface);
  padding: var(--espace);
}
.carte {
  border: 1px solid var(--ligne);
  border-radius: 8px;
  padding: var(--espace);
}
```

HTML de cet exemple :

```html
<main class="tableau" id="tableau"><h1>Tableau du club fictif</h1><article class="carte" id="carte"><h2>Lecture</h2><p>Mardi, salle 2.</p></article></main>
```

Résultat attendu : Le tableau et la carte partagent un espacement de 16px ; la carte porte une bordure de 1px de la couleur --ligne.

Trace :

- Quatre décisions sont déclarées sur .tableau.
- Le tableau lit --texte, --surface et --espace.
- La carte hérite de ces propriétés.
- Son padding et sa bordure lisent --espace et --ligne.

## Exemple guidé 2

```css
body { margin: 0; font: 1rem/1.5 sans-serif; }
.badge {
  --badge-fond: #e0f2fe;
  --badge-texte: #0c4a6e;
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid var(--badge-texte);
  border-radius: 4px;
  color: var(--badge-texte);
  background-color: var(--badge-fond);
}
.badge.complet {
  --badge-fond: #ffedd5;
  --badge-texte: #7c2d12;
}
```

HTML de cet exemple :

```html
<main><p><span class="badge" id="ouvert">Ouvert</span> <span class="badge complet" id="complet">Complet</span></p></main>
```

Résultat attendu : Les deux badges partagent forme et espacement ; « Complet » redéfinit seulement ses deux couleurs.

Trace :

- .badge déclare ses couleurs comme propriétés locales.
- Couleur, fond et bordure lisent ces propriétés.
- .badge.complet redéfinit les deux propriétés.
- Le padding et l’arrondi restent ceux du composant.

## Vérifier et expliquer

Cherche dans ta feuille les valeurs écrites plusieurs fois. Change ensuite une propriété partagée et vérifie que tous les composants suivent.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — Utiliser les propriétés personnalisées](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN — :where()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where)
- [WAI — Utilisation de la couleur](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [W3C — CSS Custom Properties](https://www.w3.org/TR/css-variables-1/)
