---
{
  "id": "css-m4-01",
  "title_fr": "Réutiliser une palette avec des propriétés personnalisées",
  "course": "css-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "css-m3-03"
  ],
  "outcomes": [
    "Définir et réutiliser des propriétés personnalisées.",
    "Expliquer une redéfinition locale de palette."
  ],
  "idea_fr": "Une propriété personnalisée donne un nom réutilisable à une valeur et suit la cascade.",
  "analogy_fr": "Une palette nommée est comme un carnet de recettes : modifier un ingrédient commun peut ajuster plusieurs préparations.",
  "examples": [
    {
      "code": ":root { --accent:navy; }\na { color:var(--accent); }\n.panneau { border:2px solid var(--accent); }",
      "expected_output": "Les liens et bordures utilisent la même valeur bleu marine.",
      "trace_fr": [
        "La valeur est définie sur la racine.",
        "Les déclarations réutilisent cette valeur avec var."
      ],
      "inputs": [],
      "fixture_html": "<section class=\"panneau\"><h2>Thème clair</h2><p>Une activité accessible.</p><a href=\"#atelier\">Voir l’atelier</a></section><section class=\"theme-sombre\"><div class=\"panneau\"><h2>Thème sombre local</h2><p>Les variables peuvent changer selon le contexte.</p><a href=\"#atelier\">Voir l’atelier</a></div></section>"
    },
    {
      "code": ":root { --texte:navy; --surface:white; }\n.theme-sombre { --texte:white; --surface:navy; }\n.panneau { color:var(--texte); background-color:var(--surface); }",
      "expected_output": "Le premier panneau est bleu marine sur blanc ; le panneau local est blanc sur bleu marine.",
      "trace_fr": [
        "Les propriétés personnalisées sont héritées selon le contexte.",
        "Les mêmes règles de panneau consomment des valeurs différentes."
      ],
      "inputs": [],
      "fixture_html": "<section class=\"panneau\"><h2>Thème clair</h2><p>Une activité accessible.</p><a href=\"#atelier\">Voir l’atelier</a></section><section class=\"theme-sombre\"><div class=\"panneau\"><h2>Thème sombre local</h2><p>Les variables peuvent changer selon le contexte.</p><a href=\"#atelier\">Voir l’atelier</a></div></section>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Nommer les valeurs par leur couleur uniquement",
      "why_fr": "Le nom devient trompeur quand le thème change.",
      "fix_fr": "Privilégie un rôle comme --texte."
    },
    {
      "error": "Croire que le thème est interactif",
      "why_fr": "Aucun événement ne modifie les classes.",
      "fix_fr": "Décris le thème local comme statique."
    }
  ],
  "quiz": [
    {
      "question": "Comment commence un nom de propriété personnalisée ?",
      "options": [
        "Par un point obligatoire.",
        "Par un dièse obligatoire.",
        "Par une balise ouvrante.",
        "Par deux tirets."
      ],
      "answer": 3,
      "explanation": "--accent est une propriété personnalisée ; .accent serait un sélecteur de classe.",
      "id": "css-m4-01-q1"
    },
    {
      "question": "Que permet une redéfinition dans .theme-sombre ?",
      "options": [
        "Créer un bouton fonctionnel sans autre code.",
        "Garantir tous les contrastes.",
        "Changer les valeurs héritées dans ce contexte.",
        "Modifier automatiquement tous les textes HTML."
      ],
      "answer": 2,
      "explanation": "Les valeurs changent localement ; l’interaction et la qualité de la palette restent à traiter.",
      "id": "css-m4-01-q2"
    },
    {
      "question": "Les noms --accent et --Accent sont-ils identiques ?",
      "options": [
        "Seulement dans body.",
        "Non, leur casse les distingue.",
        "Oui, toujours.",
        "Oui, si le fond est blanc."
      ],
      "answer": 1,
      "explanation": "Une différence de casse produit deux propriétés personnalisées différentes.",
      "id": "css-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "propriété personnalisée",
      "definition": "Valeur CSS nommée avec un nom commençant par --."
    },
    {
      "term": "palette",
      "definition": "Ensemble de décisions de couleur."
    },
    {
      "term": "valeur de repli",
      "definition": "Valeur proposée lorsque la valeur attendue n’est pas disponible dans le mécanisme prévu."
    }
  ],
  "recap_fr": [
    "Les noms commencent par --.",
    "var utilise une valeur selon la cascade.",
    "Chaque thème exige une revue de lisibilité."
  ],
  "tags": [
    "css",
    "m4",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "references": [
    {
      "title": "W3C — cascade et héritage",
      "url": "https://www.w3.org/TR/css-cascade-5/"
    },
    {
      "title": "W3C — modèle de boîte",
      "url": "https://www.w3.org/TR/css-box-3/"
    },
    {
      "title": "W3C — Flexbox",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    },
    {
      "title": "W3C — Grid",
      "url": "https://www.w3.org/TR/css-grid-1/"
    },
    {
      "title": "W3C — requêtes de média",
      "url": "https://www.w3.org/TR/mediaqueries-5/"
    }
  ],
  "technical_scope_fr": "CSS, sous-ensemble débutant des modules cités ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

La page du jardin utilise une même couleur pour ses liens, ses bordures et certains repères. Copier la valeur à de nombreux endroits rend les changements difficiles à relire. Les propriétés personnalisées CSS permettent de nommer des valeurs. Un nom commence par deux tirets, comme --accent. La fonction var(--accent) demande cette valeur dans une déclaration. Ce mécanisme aide à exprimer des choix communs, mais il ne choisit pas automatiquement une palette lisible.

:root sélectionne la racine du document HTML et constitue un emplacement pratique pour des valeurs générales. Dans :root { --accent:navy; }, la propriété personnalisée peut être héritée par les descendants. On peut ensuite écrire color:var(--accent). Ces noms sont sensibles à la casse : --accent et --Accent ne sont pas le même nom. Choisis des termes stables qui décrivent une fonction, comme --texte ou --surface, plutôt qu’une couleur qui pourrait changer.

Une propriété personnalisée peut être redéfinie dans un contexte plus local. Une section .theme-sombre peut fournir --texte:white et --surface:navy, pendant que les panneaux continuent d’utiliser color:var(--texte) et background-color:var(--surface). Le résultat dépend de la valeur héritée par chaque panneau. Ce thème local ne change ni les titres ni les labels HTML. Il ne constitue pas non plus un bouton de thème : une interaction de changement demanderait un comportement supplémentaire.

var peut recevoir une valeur de repli, par exemple var(--accent, navy), lorsque la propriété attendue n’est pas disponible dans les conditions prévues par le mécanisme. Ce repli ne corrige pas toutes les valeurs mal adaptées à la propriété finale. Pour cette initiation, définis les valeurs dont tu as besoin et vérifie leur résultat calculé. Un navigateur peut conserver le texte d’une propriété personnalisée tout en ne pouvant pas l’utiliser comme une couleur valide.

Les exercices comparent les valeurs définies et les couleurs obtenues dans deux contextes. Ils n’imposent pas un nom de classe décoratif supplémentaire. Une revue humaine doit aussi vérifier que les valeurs ne sont pas répétées inutilement et que les noms expliquent leur rôle. Termine par un contrôle des liens, du focus et des messages dans chaque thème. Un fond sombre n’est pas une certification d’accessibilité ; il faut réexaminer chaque paire de couleurs et chaque information visuelle.

## Exemple guidé 1

```css
:root { --accent:navy; }
a { color:var(--accent); }
.panneau { border:2px solid var(--accent); }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
:root { --texte:navy; --surface:white; }
.theme-sombre { --texte:white; --surface:navy; }
.panneau { color:var(--texte); background-color:var(--surface); }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Vérifier et expliquer

Observe l’aperçu à petite et grande largeur, puis parcours les contrôles avec Tab. Explique la règle qui produit chaque résultat. Les tests de style ne remplacent pas la revue de lisibilité et d’usage.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [W3C — cascade et héritage](https://www.w3.org/TR/css-cascade-5/)
- [W3C — modèle de boîte](https://www.w3.org/TR/css-box-3/)
- [W3C — Flexbox](https://www.w3.org/TR/css-flexbox-1/)
- [W3C — Grid](https://www.w3.org/TR/css-grid-1/)
- [W3C — requêtes de média](https://www.w3.org/TR/mediaqueries-5/)
