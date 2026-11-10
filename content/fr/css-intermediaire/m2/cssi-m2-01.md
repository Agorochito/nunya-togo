---
{
  "id": "cssi-m2-01",
  "title_fr": "Choisir une base flexible et autoriser le retour à la ligne",
  "course": "css-intermediaire",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "cssi-m1-03"
  ],
  "outcomes": [
    "Distinguer base, croissance et réduction des éléments flex.",
    "Choisir entre réduction sur une ligne et retour à la ligne selon le composant."
  ],
  "idea_fr": "flex-basis fournit une base de calcul ; grow et shrink gèrent l’espace, tandis que wrap choisit la possibilité de nouvelles lignes.",
  "analogy_fr": "Des fiches ont une place de départ, peuvent partager le surplus et parfois passer sur une nouvelle rangée.",
  "examples": [
    {
      "code": "body { margin: 0; }\n.ligne {\n  display: flex;\n  gap: 16px;\n}\n.carte {\n  box-sizing: border-box;\n  flex: 1 1 160px;\n}",
      "expected_output": "Les deux cartes partagent l’espace : 172px chacune à une largeur de 360px.",
      "inputs": [],
      "trace_fr": [
        "body retire sa marge pour rendre la largeur disponible explicite.",
        "La rangée crée un espace de 16px entre les cartes.",
        "Chaque carte propose une base de 160px et accepte croissance et réduction.",
        "Les 344px restants pour les deux cartes sont partagés en 172px chacun."
      ],
      "browser_test": {
        "description_fr": "Partage égal sans largeur fixe",
        "checks": [
          {
            "selector": ".ligne",
            "style": {
              "display": "flex",
              "column-gap": "16px"
            }
          },
          {
            "selector": "#a",
            "style": {
              "flex-grow": "1",
              "flex-shrink": "1",
              "flex-basis": "160px",
              "width": "172px"
            }
          },
          {
            "selector": "#b",
            "style": {
              "width": "172px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"ligne\"><article class=\"carte\" id=\"a\"><p>Lecture</p></article><article class=\"carte\" id=\"b\"><p>Jardin</p></article></main>"
    },
    {
      "code": "body { margin: 0; }\n.outils {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.outil {\n  box-sizing: border-box;\n  flex: 0 0 120px;\n}",
      "expected_output": "À 360px, les trois boutons de 120px ne tiennent pas sur une ligne et peuvent se répartir sur deux.",
      "inputs": [],
      "trace_fr": [
        "La barre autorise le retour à la ligne et un gap de 8px.",
        "Les boutons gardent une base de 120px, sans croissance ni réduction.",
        "Trois bases et deux gaps demanderaient 376px, au-delà des 360px disponibles.",
        "La disposition crée donc une nouvelle ligne tout en gardant chaque largeur à 120px."
      ],
      "browser_test": {
        "description_fr": "Bases préservées et retour autorisé",
        "checks": [
          {
            "selector": ".outils",
            "style": {
              "display": "flex",
              "flex-wrap": "wrap",
              "column-gap": "8px",
              "row-gap": "8px"
            }
          },
          {
            "selector": "#a",
            "style": {
              "flex-grow": "0",
              "flex-shrink": "0",
              "flex-basis": "120px",
              "width": "120px"
            }
          },
          {
            "selector": "#c",
            "style": {
              "width": "120px"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<nav class=\"outils\" aria-label=\"Préparation\"><button class=\"outil\" id=\"a\" type=\"button\">Lire</button><button class=\"outil\" id=\"b\" type=\"button\">Préparer</button><button class=\"outil\" id=\"c\" type=\"button\">Examiner</button></nav>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Prendre la base pour une largeur finale",
      "why_fr": "Le surplus ou la réduction sont ignorés.",
      "fix_fr": "Observe ensemble grow, shrink et basis."
    },
    {
      "error": "Corriger le manque de place par une taille de police minuscule",
      "why_fr": "La stratégie de disposition reste inadaptée.",
      "fix_fr": "Choisis d’abord réduction ou retour à la ligne."
    },
    {
      "error": "Interdire shrink partout",
      "why_fr": "Les bases peuvent dépasser le conteneur.",
      "fix_fr": "Autorise une réduction quand le composant peut l’accepter."
    }
  ],
  "quiz": [
    {
      "question": "Que représentent les valeurs de flex:1 1 160px ?",
      "options": [
        "Largeur, hauteur, puis couleur.",
        "Ordre, marge, puis taille de police.",
        "Nombre de lignes, colonnes, puis gap.",
        "Croissance, réduction, puis base."
      ],
      "answer": 3,
      "explanation": "Le raccourci exprime trois décisions distinctes sur le dimensionnement.",
      "id": "cssi-m2-01-q1"
    },
    {
      "question": "flex-basis:160px signifie-t-il que la largeur finale sera toujours 160px ?",
      "options": [
        "Oui, uniquement avec un texte court.",
        "Cela signifie plutôt une hauteur obligatoire.",
        "Non, croissance, réduction et contraintes peuvent la modifier.",
        "Oui, quel que soit le conteneur."
      ],
      "answer": 2,
      "explanation": "La base participe au calcul, elle n’est pas toujours la taille finale.",
      "id": "cssi-m2-01-q2"
    },
    {
      "question": "Quel rôle possède flex-wrap:wrap ?",
      "options": [
        "Interdire tout espacement entre cartes.",
        "Autoriser la création de plusieurs lignes.",
        "Trier les éléments par leur texte.",
        "Changer automatiquement les titres HTML."
      ],
      "answer": 1,
      "explanation": "Le retour à la ligne est un choix du conteneur flexible.",
      "id": "cssi-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "flex-basis",
      "definition": "Base de calcul de taille d’un élément sur l’axe principal."
    },
    {
      "term": "flex-grow",
      "definition": "Facteur de partage de l’espace positif disponible."
    },
    {
      "term": "flex-shrink",
      "definition": "Facteur participant à la réduction des bases lorsque la place manque."
    },
    {
      "term": "wrap",
      "definition": "Possibilité de créer plusieurs lignes dans le conteneur flex."
    }
  ],
  "recap_fr": [
    "Distinguer base, croissance et réduction des éléments flex.",
    "Choisir entre réduction sur une ligne et retour à la ligne selon le composant.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "flex-basis",
    "flex-grow",
    "flex-shrink",
    "wrap"
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
      "title": "W3C — Flexbox, flexibilité et lignes",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    }
  ],
  "sources": [
    {
      "title": "W3C — Flexbox, flexibilité et lignes",
      "url": "https://www.w3.org/TR/css-flexbox-1/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une rangée Flexbox ne distribue pas seulement des largeurs fixes. Chaque enfant direct peut disposer d’une base, accepter une part d’espace supplémentaire et participer à une réduction si la place manque. La forme flex:1 1 160px réunit flex-grow, flex-shrink et flex-basis, dans cet ordre. Dans nos rangées horizontales, la base concerne la largeur principale ; ce n’est pas une promesse que la boîte restera exactement à 160px.

flex-grow décrit la répartition de l’espace positif disponible après les bases et les espaces entre éléments. Deux cartes de même base avec grow égal à un partagent ce surplus à parts égales. Avec un conteneur de 360px et un gap de 16px, deux cartes identiques disposent ici de 172px chacune. À 720px, elles disposent de 352px. La fixture et la remise à zéro des marges rendent ce calcul volontairement simple.

flex-shrink intervient lorsque les bases dépassent la place disponible et que les éléments restent sur la même ligne. Son effet tient compte du facteur et de la taille de base ; deux facteurs égaux ne signifient donc pas toujours le même nombre de pixels retirés si les bases diffèrent. Dans l’exercice de débogage, les deux bases sont identiques et shrink doit passer de zéro à un pour permettre leur réduction. Les minima liés au contenu seront étudiés dans la leçon suivante.

flex-wrap:wrap autorise plusieurs lignes. Le placement des éléments sur les lignes se décide à partir de leurs tailles de base et contraintes ; l’espace de chaque ligne est ensuite réparti. Avec trois boutons de base 120px, sans croissance ni réduction et avec deux gaps de 8px, une largeur de 360px ne suffit pas pour tout aligner. Le dernier bouton passe à la ligne au lieu d’écraser son libellé.

Réduire et revenir à la ligne sont donc deux choix différents. Une paire de cartes courtes peut accepter la réduction dans une rangée. Un groupe d’actions peut préférer garder des boutons lisibles et se répartir sur plusieurs lignes. Un repère latéral fixe et un contenu flexible peuvent aussi rester ensemble tant que leurs bases tiennent, puis se placer sur deux lignes quand la largeur diminue.

Utilise gap pour l’espacement entre éléments plutôt qu’ajouter une marge arbitraire au dernier. Dans les calculs de cette leçon, body n’a aucune marge et les enfants utilisent border-box ; les fixtures n’ajoutent ni bordure ni padding concurrent aux cartes. Cela permet de vérifier quelques largeurs entières sans dépendre du choix de police ou d’un arrondi de division en trois colonnes.

Observe les exemples à plusieurs largeurs. Les tests contrôlent les facteurs, la base, wrap et les dimensions déterministes annoncées, tout en conservant le contenu HTML. Ils ne remplacent pas une lecture des libellés longs ni des variantes de contenu. Choisir la stratégie revient à décider ce qui peut diminuer, ce qui doit garder sa base et quand une nouvelle ligne devient préférable.

## Exemple guidé 1

```css
body { margin: 0; }
.ligne {
  display: flex;
  gap: 16px;
}
.carte {
  box-sizing: border-box;
  flex: 1 1 160px;
}
```

HTML de cet exemple :

```html
<main class="ligne"><article class="carte" id="a"><p>Lecture</p></article><article class="carte" id="b"><p>Jardin</p></article></main>
```

Résultat attendu : Les deux cartes partagent l’espace : 172px chacune à une largeur de 360px.

Trace :

- body retire sa marge pour rendre la largeur disponible explicite.
- La rangée crée un espace de 16px entre les cartes.
- Chaque carte propose une base de 160px et accepte croissance et réduction.
- Les 344px restants pour les deux cartes sont partagés en 172px chacun.

## Exemple guidé 2

```css
body { margin: 0; }
.outils {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.outil {
  box-sizing: border-box;
  flex: 0 0 120px;
}
```

HTML de cet exemple :

```html
<nav class="outils" aria-label="Préparation"><button class="outil" id="a" type="button">Lire</button><button class="outil" id="b" type="button">Préparer</button><button class="outil" id="c" type="button">Examiner</button></nav>
```

Résultat attendu : À 360px, les trois boutons de 120px ne tiennent pas sur une ligne et peuvent se répartir sur deux.

Trace :

- La barre autorise le retour à la ligne et un gap de 8px.
- Les boutons gardent une base de 120px, sans croissance ni réduction.
- Trois bases et deux gaps demanderaient 376px, au-delà des 360px disponibles.
- La disposition crée donc une nouvelle ligne tout en gardant chaque largeur à 120px.

## Vérifier et expliquer

Observe le résultat aux dimensions annoncées puis à une largeur intermédiaire. Vérifie aussi les textes longs et le parcours clavier sans modifier l’ordre du document.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [W3C — Flexbox, flexibilité et lignes](https://www.w3.org/TR/css-flexbox-1/)
