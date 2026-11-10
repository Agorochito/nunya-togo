---
{
  "id": "cssi-m2-03",
  "title_fr": "Composer plusieurs axes sans désordonner le parcours",
  "course": "css-intermediaire",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "cssi-m2-02"
  ],
  "outcomes": [
    "Raisonner sur axe principal et axe transversal dans chaque conteneur flex.",
    "Imbriquer des alignements tout en conservant l’ordre logique des éléments."
  ],
  "idea_fr": "Chaque conteneur choisit ses axes et alignements ; la disposition visuelle doit rester cohérente avec le document et son parcours.",
  "analogy_fr": "Une fiche peut empiler ses rubriques tandis qu’une barre intérieure aligne des commandes, sans changer l’ordre des étapes.",
  "examples": [
    {
      "code": ".barre {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.titre { margin: 0; }\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}",
      "expected_output": "La barre aligne le titre et le groupe d’actions au centre, avec une répartition entre les deux groupes.",
      "inputs": [],
      "trace_fr": [
        "La barre porte un axe principal de rangée et un alignement transversal centré.",
        "space-between répartit l’espace entre le titre et le groupe, sans transformer les boutons en enfants directs de la barre.",
        "Le groupe d’actions possède sa propre rangée et son gap de 8px.",
        "L’ordre Préparer puis Examiner reste celui du document."
      ],
      "browser_test": {
        "description_fr": "Deux conteneurs et deux espaces",
        "checks": [
          {
            "selector": ".barre",
            "style": {
              "display": "flex",
              "align-items": "center",
              "justify-content": "space-between",
              "column-gap": "16px"
            }
          },
          {
            "selector": ".actions",
            "style": {
              "display": "flex",
              "align-items": "center",
              "column-gap": "8px"
            }
          },
          {
            "selector": ".actions > button:first-child",
            "attributes": {
              "id": "preparer"
            },
            "style": {
              "order": "0"
            }
          },
          {
            "selector": ".actions > button:last-child",
            "attributes": {
              "id": "examiner"
            },
            "style": {
              "order": "0"
            }
          }
        ]
      },
      "fixture_html": "<header class=\"barre\"><h2 class=\"titre\">Programme</h2><div class=\"actions\"><button id=\"preparer\" type=\"button\">Préparer</button><button id=\"examiner\" type=\"button\">Examiner</button></div></header>"
    },
    {
      "code": ".carte { display: flex; flex-direction: column; gap: 12px; }\n.informations {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n}\n.actions {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n}",
      "expected_output": "La carte et ses informations sont des colonnes ; les deux actions restent une rangée justifiée vers la fin.",
      "inputs": [],
      "trace_fr": [
        "La carte empile le groupe d’informations puis les actions.",
        "Le groupe d’informations possède son propre axe de colonne et un alignement au début.",
        "Les actions choisissent un axe de rangée et une répartition flex-end.",
        "Les boutons restent Retour puis Continuer dans le document et dans leur ordre flex."
      ],
      "browser_test": {
        "description_fr": "Axes composés sans inversion",
        "checks": [
          {
            "selector": ".carte",
            "style": {
              "display": "flex",
              "flex-direction": "column",
              "row-gap": "12px"
            }
          },
          {
            "selector": ".informations",
            "style": {
              "flex-direction": "column",
              "align-items": "flex-start",
              "row-gap": "4px"
            }
          },
          {
            "selector": ".actions",
            "style": {
              "flex-direction": "row",
              "justify-content": "flex-end",
              "align-items": "center",
              "column-gap": "8px"
            }
          },
          {
            "selector": "#retour",
            "style": {
              "order": "0"
            }
          },
          {
            "selector": "#suite",
            "style": {
              "order": "0"
            }
          }
        ]
      },
      "fixture_html": "<article class=\"carte\"><div class=\"informations\"><h2>Lecture</h2><p>Rencontre fictive.</p></div><div class=\"actions\"><button id=\"retour\" type=\"button\">Retour</button><button id=\"suite\" type=\"button\">Continuer</button></div></article>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Mémoriser justify comme horizontal",
      "why_fr": "La colonne change l’interprétation de l’axe.",
      "fix_fr": "Décris d’abord principal et transversal."
    },
    {
      "error": "Utiliser order pour réparer le sens",
      "why_fr": "Le parcours du document peut rester discordant.",
      "fix_fr": "Commence par une structure logique et conserve-la visuellement."
    },
    {
      "error": "Aligner tous les descendants comme des frères",
      "why_fr": "Plusieurs groupes de parenté sont confondus.",
      "fix_fr": "Règle chaque conteneur et ses seuls enfants directs."
    }
  ],
  "quiz": [
    {
      "question": "Dans une colonne flex, que concerne justify-content ?",
      "options": [
        "Toujours l’axe horizontal physique.",
        "La couleur de justification des paragraphes.",
        "Uniquement les éléments positionnés en absolu.",
        "L’axe principal de la colonne."
      ],
      "answer": 3,
      "explanation": "Il faut définir l’axe avec flex-direction avant d’interpréter l’alignement.",
      "id": "cssi-m2-03-q1"
    },
    {
      "question": "order modifie-t-il automatiquement l’ordre de tabulation du document ?",
      "options": [
        "Oui, seulement avec des boutons.",
        "Il supprime plutôt tous les liens.",
        "Non, réorganiser visuellement peut créer une discordance de parcours.",
        "Oui, chaque valeur order devient un tabindex."
      ],
      "answer": 2,
      "explanation": "La structure logique et l’ordre graphique doivent être examinés ensemble.",
      "id": "cssi-m2-03-q2"
    },
    {
      "question": "Pourquoi imbriquer deux conteneurs flex dans une fiche ?",
      "options": [
        "Pour imposer la même direction partout.",
        "Pour donner à chaque groupe ses propres axes et alignements.",
        "Pour rendre chaque texte cliquable.",
        "Pour supprimer les éléments HTML sémantiques."
      ],
      "answer": 1,
      "explanation": "Un groupe de texte et une barre d’actions n’ont pas nécessairement la même organisation.",
      "id": "cssi-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "axe principal",
      "definition": "Axe choisi par flex-direction pour disposer les éléments."
    },
    {
      "term": "axe transversal",
      "definition": "Axe perpendiculaire à l’axe principal du conteneur."
    },
    {
      "term": "alignement de groupe",
      "definition": "Répartition ou position des enfants d’un conteneur donné."
    },
    {
      "term": "ordre documentaire",
      "definition": "Séquence des éléments dans le HTML, indépendante d’un tri visuel CSS."
    }
  ],
  "recap_fr": [
    "Raisonner sur axe principal et axe transversal dans chaque conteneur flex.",
    "Imbriquer des alignements tout en conservant l’ordre logique des éléments.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "axe principal",
    "axe transversal",
    "alignement de groupe",
    "ordre documentaire"
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
      "title": "W3C — Flexbox, alignement et ordre",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    },
    {
      "title": "MDN — Aligner les éléments flexibles",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items"
    },
    {
      "title": "MDN — Ordonner les éléments flexibles",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Flexible_box_layout/Ordering_items"
    }
  ],
  "sources": [
    {
      "title": "W3C — Flexbox, alignement et ordre",
      "url": "https://www.w3.org/TR/css-flexbox-1/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "MDN — Aligner les éléments flexibles",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "MDN — Ordonner les éléments flexibles",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Flexible_box_layout/Ordering_items",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Un composant possède souvent plusieurs besoins de disposition. Son texte s’empile, son en-tête place un état à côté du titre, puis ses actions forment une rangée. Chercher une seule règle d’alignement globale rend ces objectifs contradictoires. Flexbox peut être utilisé à plusieurs niveaux : chaque conteneur définit ses axes, et ses enfants directs participent à cette disposition particulière.

flex-direction:row place l’axe principal dans la direction de la ligne ; column le place selon l’empilement. justify-content répartit l’espace sur cet axe principal. align-items règle l’alignement sur l’axe transversal. Il est donc trompeur de mémoriser « justify signifie horizontal » : dans une colonne, la même propriété concerne l’axe vertical de notre mode d’écriture. Décris les axes avant de choisir la valeur.

Dans une barre horizontale, align-items:center peut aligner les éléments de hauteurs différentes sur l’axe transversal. justify-content:space-between répartit l’espace disponible entre les groupes, tandis que gap fournit une distance minimale entre eux. Un groupe d’actions intérieur devient à son tour un conteneur flex avec son propre gap. Le titre et chaque bouton ne sont pas tous des frères du même conteneur.

Une carte verticale peut utiliser align-items:stretch pour que ses groupes prennent la largeur disponible. À l’intérieur, la zone d’informations peut rester une colonne alignée au début, tandis que les actions utilisent une rangée justifiée vers la fin. Ces réglages se composent : ils ne nécessitent pas une série de marges calculées à partir de la hauteur d’un texte. Les textes restent dans leur structure HTML initiale.

La propriété order et les directions inversées peuvent changer l’ordre visuel sans changer l’ordre du document. Le parcours au clavier et les lectures assistées ne suivent pas simplement ce nouvel arrangement graphique. Une barre qui présente Continuer avant Retour tout en parcourant Retour d’abord risque de surprendre. Pour une séquence d’actions, commence par un HTML dans l’ordre utile et conserve cet ordre visuel au lieu de le corriger avec des nombres.

Les exercices de débogage remettent donc flex-direction:row et order:0 sur les deux actions. Zéro ne numérote pas leur étape : des valeurs order égales laissent leur ordre documentaire agir. Un espace disponible ou un alignement vers la fin de la rangée ne demande pas de permuter les éléments. Si le besoin exige réellement un autre ordre de sens, la structure elle-même doit être revue.

Observe les exemples conteneur par conteneur, puis suis les boutons dans leur ordre. Les contrôles vérifient axes, alignements, espaces et ordre de base ; ils ne remplacent pas un parcours complet au clavier. À faible largeur, le retour à la ligne des actions évite d’imposer une seule ligne trop serrée. Relis enfin les titres et messages : une composition correcte doit servir une séquence compréhensible, et non déplacer les éléments pour remplir une forme abstraite.

## Exemple guidé 1

```css
.barre {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.titre { margin: 0; }
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

HTML de cet exemple :

```html
<header class="barre"><h2 class="titre">Programme</h2><div class="actions"><button id="preparer" type="button">Préparer</button><button id="examiner" type="button">Examiner</button></div></header>
```

Résultat attendu : La barre aligne le titre et le groupe d’actions au centre, avec une répartition entre les deux groupes.

Trace :

- La barre porte un axe principal de rangée et un alignement transversal centré.
- space-between répartit l’espace entre le titre et le groupe, sans transformer les boutons en enfants directs de la barre.
- Le groupe d’actions possède sa propre rangée et son gap de 8px.
- L’ordre Préparer puis Examiner reste celui du document.

## Exemple guidé 2

```css
.carte { display: flex; flex-direction: column; gap: 12px; }
.informations {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
```

HTML de cet exemple :

```html
<article class="carte"><div class="informations"><h2>Lecture</h2><p>Rencontre fictive.</p></div><div class="actions"><button id="retour" type="button">Retour</button><button id="suite" type="button">Continuer</button></div></article>
```

Résultat attendu : La carte et ses informations sont des colonnes ; les deux actions restent une rangée justifiée vers la fin.

Trace :

- La carte empile le groupe d’informations puis les actions.
- Le groupe d’informations possède son propre axe de colonne et un alignement au début.
- Les actions choisissent un axe de rangée et une répartition flex-end.
- Les boutons restent Retour puis Continuer dans le document et dans leur ordre flex.

## Vérifier et expliquer

Observe le résultat aux dimensions annoncées puis à une largeur intermédiaire. Vérifie aussi les textes longs et le parcours clavier sans modifier l’ordre du document.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [W3C — Flexbox, alignement et ordre](https://www.w3.org/TR/css-flexbox-1/)
- [MDN — Aligner les éléments flexibles](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items)
- [MDN — Ordonner les éléments flexibles](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Flexible_box_layout/Ordering_items)
