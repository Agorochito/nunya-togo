---
{
  "id": "html-m2-03",
  "title_fr": "Présenter des données dans un tableau",
  "course": "html-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "html-m2-02"
  ],
  "outcomes": [
    "Construire un tableau simple avec titre et en-têtes.",
    "Lire une donnée avec sa ligne et sa colonne."
  ],
  "idea_fr": "Un tableau relie des données à des en-têtes ; il ne sert pas à dessiner la mise en page.",
  "analogy_fr": "Le tableau est une grille de lecture : chaque valeur prend son sens grâce à sa ligne et sa colonne.",
  "examples": [
    {
      "code": "<table>\n<caption>Programme fictif</caption>\n<thead><tr><th scope=\"col\">Atelier</th><th scope=\"col\">Jour</th></tr></thead>\n<tbody><tr><td>Semis</td><td>Samedi</td></tr></tbody>\n</table>",
      "expected_output": "Un tableau de deux colonnes avec une ligne de données : Semis, Samedi.",
      "trace_fr": [
        "caption annonce le sujet.",
        "Les th de colonne nomment les deux catégories.",
        "Les td de la ligne suivent le même ordre."
      ],
      "inputs": []
    },
    {
      "code": "<table>\n<caption>Capacités fictives</caption>\n<tr><th scope=\"col\">Atelier</th><th scope=\"col\">Places</th></tr>\n<tr><th scope=\"row\">Compost</th><td>12</td></tr>\n</table>",
      "expected_output": "La valeur 12 est reliée à la colonne Places et à la ligne Compost.",
      "trace_fr": [
        "Le premier th de la ligne nomme l’atelier.",
        "scope=\"row\" indique qu’il concerne la ligne."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre toutes les cellules dans th",
      "why_fr": "Les données deviennent de faux en-têtes.",
      "fix_fr": "Réserve th aux catégories et td aux valeurs."
    },
    {
      "error": "Utiliser table pour aligner la page",
      "why_fr": "Des relations de données sont inventées.",
      "fix_fr": "Utilise CSS pour la disposition générale."
    }
  ],
  "quiz": [
    {
      "question": "À quoi sert table dans ce cours ?",
      "options": [
        "À placer le menu à gauche.",
        "À remplacer tous les paragraphes.",
        "À colorer une page.",
        "À relier des données organisées en lignes et colonnes."
      ],
      "answer": 3,
      "explanation": "Le tableau porte des relations de données ; CSS gère la mise en page.",
      "id": "html-m2-03-q1"
    },
    {
      "question": "Quel élément porte un en-tête ?",
      "options": [
        "caption dans chaque cellule",
        "br",
        "th",
        "td gras uniquement"
      ],
      "answer": 2,
      "explanation": "th exprime le rôle d’en-tête, complété ici par scope.",
      "id": "html-m2-03-q2"
    },
    {
      "question": "Pourquoi un tbody peut-il apparaître sans avoir été écrit ?",
      "options": [
        "Les attributs le remplacent.",
        "Le navigateur peut le construire pendant l’analyse HTML.",
        "Le réseau ajoute les données.",
        "Un tableau est du JavaScript."
      ],
      "answer": 1,
      "explanation": "Le DOM construit n’est pas toujours une copie littérale du fichier, d’où les tests structurels.",
      "id": "html-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "cellule",
      "definition": "Case d’un tableau contenant un en-tête ou une donnée."
    },
    {
      "term": "en-tête",
      "definition": "Cellule qui nomme une catégorie ou une ligne."
    },
    {
      "term": "scope",
      "definition": "Attribut indiquant ici la portée d’un en-tête."
    }
  ],
  "recap_fr": [
    "table est réservé aux données tabulaires.",
    "th et td ont des rôles différents.",
    "caption et scope clarifient les relations."
  ],
  "tags": [
    "html",
    "m2",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "references": [
    {
      "title": "Standard HTML — structure et métadonnées",
      "url": "https://html.spec.whatwg.org/multipage/semantics.html"
    },
    {
      "title": "Standard HTML — formulaires",
      "url": "https://html.spec.whatwg.org/multipage/forms.html"
    },
    {
      "title": "Standard HTML — images et médias",
      "url": "https://html.spec.whatwg.org/multipage/embedded-content.html"
    },
    {
      "title": "Standard HTML — tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard, sous-ensemble débutant ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

Les ateliers du jardin possèdent un jour, une heure et une capacité. Une suite de phrases peut suffire pour deux événements, mais un tableau facilite certaines comparaisons. Utilise table lorsque les informations ont de véritables relations de lignes et de colonnes. Ne l’emploie pas pour placer un menu à gauche d’un texte : cette disposition relève de CSS. La structure du tableau doit servir les données, même si tous les styles sont retirés.

Une ligne se note tr. À l’intérieur, th représente une cellule d’en-tête et td une cellule de données. Dans un tableau simple, les noms des colonnes peuvent être des th portant scope="col". Si la première cellule d’une ligne nomme cette ligne, elle peut être un th portant scope="row". Ces indications rendent les relations explicites, notamment pour les outils d’assistance. Un texte en gras dans td n’exprime pas à lui seul le rôle d’en-tête.

caption donne un titre au tableau. Il explique le sujet de l’ensemble, comme « Programme fictif des ateliers ». thead peut regrouper les lignes d’en-tête et tbody les lignes de données. Ces groupes aident à organiser le document ; ils ne remplacent pas les cellules th. Le navigateur peut ajouter un tbody dans le DOM même si tu ne l’as pas écrit. C’est une raison supplémentaire pour vérifier les éléments construits plutôt que comparer exactement le texte du fichier.

Pour ce premier cours, chaque ligne suit la même organisation et nous évitons les cellules fusionnées. Le jardin a deux colonnes : Atelier et Jour. La première ligne annonce ces catégories. Chaque ligne suivante fournit une paire de données. Avant de coder, lis une valeur avec son contexte complet : « Semis a lieu samedi ». Si tu ne peux pas retrouver ce sens avec la ligne et la colonne, la structure mérite d’être revue.

Les exercices inspectent le titre, les cellules et les attributs scope. Ils ne demandent ni bordures ni couleurs. En complément, lis le tableau ligne par ligne, puis colonne par colonne. Vérifie que les textes sont clairs et que les informations ne sont pas déduites uniquement d’une position visuelle. Les tableaux complexes et leur adaptation avancée viendront plus tard. Aujourd’hui, l’objectif est une petite structure fiable, dont les relations restent compréhensibles avant toute décoration.

## Exemple guidé 1

```html
<table>
<caption>Programme fictif</caption>
<thead><tr><th scope="col">Atelier</th><th scope="col">Jour</th></tr></thead>
<tbody><tr><td>Semis</td><td>Samedi</td></tr></tbody>
</table>
```

## Exemple guidé 2

```html
<table>
<caption>Capacités fictives</caption>
<tr><th scope="col">Atelier</th><th scope="col">Places</th></tr>
<tr><th scope="row">Compost</th><td>12</td></tr>
</table>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
