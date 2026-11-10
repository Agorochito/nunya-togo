---
{
  "id": "cssi-m1-02",
  "title_fr": "Réduire la spécificité sans élargir les effets",
  "course": "css-intermediaire",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "cssi-m1-01"
  ],
  "outcomes": [
    "Distinguer la sélection réalisée de la spécificité portée par :where et :is.",
    "Écrire une base de composant qui laisse les variantes locales agir."
  ],
  "idea_fr": "Deux sélecteurs peuvent viser les mêmes éléments tout en ayant des poids différents dans la cascade.",
  "analogy_fr": "Une règle de base facile à ajuster évite de transformer chaque variante de fiche en compétition de priorités.",
  "examples": [
    {
      "code": ".message.important {\n  color: maroon;\n}\n:where(.message) {\n  color: navy;\n  background-color: lavender;\n}",
      "expected_output": "Le message normal est navy ; le message important garde maroon malgré la base écrite après lui.",
      "inputs": [],
      "trace_fr": [
        "La variante possède deux classes dans son sélecteur.",
        "La pseudo-classe :where vise les deux messages mais ajoute une spécificité nulle.",
        "La base fournit le fond commun aux deux éléments.",
        "La couleur plus spécifique de la variante reste gagnante."
      ],
      "browser_test": {
        "description_fr": "Base légère et variante",
        "checks": [
          {
            "selector": "#normal",
            "style": {
              "color": "navy",
              "background-color": "lavender"
            }
          },
          {
            "selector": "#important",
            "style": {
              "color": "maroon",
              "background-color": "lavender"
            }
          }
        ]
      },
      "fixture_html": "<main><p class=\"message\" id=\"normal\">Information</p><p class=\"message important\" id=\"important\">Priorité locale</p></main>"
    },
    {
      "code": "/* :is garde la spécificité de son argument le plus fort. */\n:is(.carte, #urgence) .titre {\n  color: navy;\n}\n.carte .titre {\n  color: teal;\n}",
      "expected_output": "Le titre reste navy : l’alternative #urgence de :is augmente sa spécificité même quand .carte suffit à correspondre.",
      "inputs": [],
      "trace_fr": [
        "La première règle correspond au titre via son ancêtre .carte.",
        "La liste de :is contient aussi un identifiant, qui fournit son poids maximal.",
        "La seconde règle possède deux classes mais aucun identifiant.",
        "Sa position plus tardive ne suffit pas à faire gagner teal dans ce contexte."
      ],
      "browser_test": {
        "description_fr": "Poids maximal des arguments de is",
        "checks": [
          {
            "selector": "#titre",
            "style": {
              "color": "navy"
            }
          }
        ]
      },
      "fixture_html": "<main><article class=\"carte\"><h2 class=\"titre\" id=\"titre\">Lecture</h2></article></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Prendre la dernière règle comme gagnante universelle",
      "why_fr": "La spécificité et d’autres étapes interviennent avant l’ordre.",
      "fix_fr": "Compare le contexte puis le poids des sélecteurs."
    },
    {
      "error": "Glisser un id dans is",
      "why_fr": "Toute la liste peut recevoir ce poids maximal.",
      "fix_fr": "Utilise where pour une base destinée à rester facilement remplaçable."
    },
    {
      "error": "Colorer chaque enfant en dur",
      "why_fr": "L’héritage de la variante ne peut plus agir.",
      "fix_fr": "Utilise inherit lorsque le rôle du contrôle doit suivre son composant."
    }
  ],
  "quiz": [
    {
      "question": "Quelle spécificité apporte :where(.carte,#urgence) ?",
      "options": [
        "Toujours celle de #urgence.",
        "Celle de toutes les classes additionnées à tous les ids.",
        "Une priorité !important automatique.",
        "Zéro pour cette pseudo-classe et ses arguments."
      ],
      "answer": 3,
      "explanation": "Le sélecteur à l’extérieur de :where peut toutefois encore ajouter son propre poids.",
      "id": "cssi-m1-02-q1"
    },
    {
      "question": "Quelle spécificité utilise :is(.carte,#urgence) ?",
      "options": [
        "Uniquement celle de l’argument qui a permis la correspondance.",
        "Celle du premier argument seulement.",
        "Celle de son argument le plus spécifique.",
        "Toujours zéro."
      ],
      "answer": 2,
      "explanation": "L’alternative contenant un id peut donc peser sur l’ensemble du groupe.",
      "id": "cssi-m1-02-q2"
    },
    {
      "question": "Pourquoi color:inherit est-il utile sur les contrôles du projet ?",
      "options": [
        "Il masque les textes en alerte.",
        "Il suit la couleur calculée de leur carte.",
        "Il transforme un lien en bouton.",
        "Il annule toutes les règles de cascade."
      ],
      "answer": 1,
      "explanation": "La même règle permet aux contrôles de reprendre les deux variantes locales.",
      "id": "cssi-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "spécificité",
      "definition": "Poids d’un sélecteur utilisé dans le départage de déclarations comparables."
    },
    {
      "term": "where",
      "definition": "Regroupement de sélecteurs dont la contribution de spécificité est nulle."
    },
    {
      "term": "is",
      "definition": "Regroupement de sélecteurs utilisant le poids de son argument le plus spécifique."
    },
    {
      "term": "variante",
      "definition": "Règle locale modifiant une décision de présentation d’un composant."
    }
  ],
  "recap_fr": [
    "Distinguer la sélection réalisée de la spécificité portée par :where et :is.",
    "Écrire une base de composant qui laisse les variantes locales agir.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "spécificité",
    "where",
    "is",
    "variante"
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
      "title": "MDN — :where",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where"
    },
    {
      "title": "MDN — :is",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:is"
    },
    {
      "title": "W3C — Selectors Level 4",
      "url": "https://www.w3.org/TR/selectors-4/"
    }
  ],
  "sources": [
    {
      "title": "MDN — :where",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "MDN — :is",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:is",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "W3C — Selectors Level 4",
      "url": "https://www.w3.org/TR/selectors-4/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une feuille de style de club peut posséder une base commune et des variantes. Si chaque règle de base utilise plusieurs identifiants, les variantes deviennent difficiles à appliquer sans sélecteurs toujours plus lourds. La spécificité aide à comprendre cette concurrence, mais elle n’est qu’une étape de la cascade : origine, importance et autres mécanismes interviennent aussi. Nous comparons ici des déclarations normales d’une même feuille, sans couche ni style en ligne concurrent.

Les sélecteurs :is et :where permettent tous deux de regrouper des alternatives. :is(.action, .lien) vise les éléments qui correspondent à l’une des deux classes. On peut ainsi donner des espaces cohérents à un bouton et à un lien sans les traiter comme des éléments identiques dans le HTML. Regrouper la sélection ne justifie pas de supprimer leur sémantique ni leurs comportements natifs.

La différence importante concerne leur poids. :where(...) contribue une spécificité nulle, quels que soient ses arguments. Une règle de base :where(.message) est donc facile à remplacer par une classe de variante. Dans le premier exemple, .message.important reste maroon même si la base :where est écrite après elle. La règle « la dernière ligne gagne » n’est vraie qu’après avoir tenu compte des critères de cascade qui départagent ces déclarations.

:is(...) prend la spécificité de l’argument le plus spécifique de sa liste. Dans :is(.carte, #urgence) .titre, la présence de #urgence augmente le poids, même pour un élément qui correspond à .carte. Une règle plus tardive .carte .titre peut alors perdre. Le second exemple montre volontairement cet effet : le titre reste navy. Le but est d’identifier la cause avant d’essayer une couleur supplémentaire.

Pour une base qui doit rester ajustable, remplacer ce regroupement par :where(.carte, #urgence) .titre retire le poids des alternatives, mais la classe .titre située à l’extérieur compte encore. La spécificité ne disparaît donc pas forcément de tout le sélecteur. Les exercices demandent de comparer les parties, puis de choisir l’écriture adaptée à une base ou à une variante.

Évite de résoudre systématiquement les conflits avec !important. Cela change le niveau de priorité et rend le problème suivant moins lisible. Commence par lire la règle gagnante, les alternatives et les propriétés réellement héritées. Un color:inherit sur un lien peut volontairement suivre la couleur de sa carte ; une couleur fixe sur chaque enfant empêcherait cette réutilisation.

Les fixtures présentent plusieurs éléments ciblés et un texte extérieur pour observer la portée. Les contrôles comparent leurs styles calculés ; ils ne valident pas la maintenabilité de toute une feuille. Termine par une explication : quelle règle fournit la base, quelle règle décrit la variante et pourquoi l’une gagne-t-elle ? Une cascade compréhensible permet de modifier un composant sans étendre accidentellement ses effets à la page entière.

## Exemple guidé 1

```css
.message.important {
  color: maroon;
}
:where(.message) {
  color: navy;
  background-color: lavender;
}
```

HTML de cet exemple :

```html
<main><p class="message" id="normal">Information</p><p class="message important" id="important">Priorité locale</p></main>
```

Résultat attendu : Le message normal est navy ; le message important garde maroon malgré la base écrite après lui.

Trace :

- La variante possède deux classes dans son sélecteur.
- La pseudo-classe :where vise les deux messages mais ajoute une spécificité nulle.
- La base fournit le fond commun aux deux éléments.
- La couleur plus spécifique de la variante reste gagnante.

## Exemple guidé 2

```css
/* :is garde la spécificité de son argument le plus fort. */
:is(.carte, #urgence) .titre {
  color: navy;
}
.carte .titre {
  color: teal;
}
```

HTML de cet exemple :

```html
<main><article class="carte"><h2 class="titre" id="titre">Lecture</h2></article></main>
```

Résultat attendu : Le titre reste navy : l’alternative #urgence de :is augmente sa spécificité même quand .carte suffit à correspondre.

Trace :

- La première règle correspond au titre via son ancêtre .carte.
- La liste de :is contient aussi un identifiant, qui fournit son poids maximal.
- La seconde règle possède deux classes mais aucun identifiant.
- Sa position plus tardive ne suffit pas à faire gagner teal dans ce contexte.

## Vérifier et expliquer

Observe le résultat aux dimensions annoncées puis à une largeur intermédiaire. Vérifie aussi les textes longs et le parcours clavier sans modifier l’ordre du document.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — :where](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where)
- [MDN — :is](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:is)
- [W3C — Selectors Level 4](https://www.w3.org/TR/selectors-4/)
