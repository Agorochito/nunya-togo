---
{
  "id": "htmi-m3-02",
  "title_fr": "Relier une cellule à plusieurs en-têtes",
  "course": "html-intermediaire",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m3-01"
  ],
  "outcomes": [
    "Décrire les niveaux d’un tableau sans croiser les associations.",
    "Utiliser des id uniques et headers comme liste de références explicites."
  ],
  "idea_fr": "Une cellule complexe doit conserver tous les intitulés nécessaires à son interprétation.",
  "analogy_fr": "Une étiquette de classement peut nommer à la fois l’atelier, la saison et le public : oublier un niveau change le sens du nombre.",
  "examples": [
    {
      "code": "<table id=\"matin-table\">\n  <caption>Effectif fictif du matin</caption>\n  <thead>\n    <tr>\n      <th rowspan=\"2\">Atelier</th>\n      <th id=\"matin\" colspan=\"2\">Matin</th>\n    </tr>\n    <tr>\n      <th id=\"inscrits\" scope=\"col\">Inscrits</th>\n      <th id=\"capacite\" scope=\"col\">Capacité</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th id=\"semis\" scope=\"row\">Semis</th>\n      <td id=\"semis-inscrits\" headers=\"semis matin inscrits\">3</td>\n      <td id=\"semis-capacite\" headers=\"semis matin capacite\">8</td>\n    </tr>\n  </tbody>\n</table>\n",
      "expected_output": "Les deux mesures de Semis sont reliées à leur atelier, au groupe Matin et à leur sous-colonne.",
      "trace_fr": [
        "Matin couvre deux colonnes ; Atelier couvre les deux lignes d’intitulés.",
        "Les th ont des identifiants distincts ; les deux td citent semis et matin.",
        "Le dernier identifiant de chaque headers distingue Inscrits et Capacité."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Trois références par mesure",
        "checks": [
          {
            "selector": "#semis-inscrits[headers~=\"semis\"][headers~=\"matin\"][headers~=\"inscrits\"]",
            "textIncludes": "3"
          },
          {
            "selector": "#semis-capacite[headers~=\"semis\"][headers~=\"matin\"][headers~=\"capacite\"]",
            "textIncludes": "8"
          },
          {
            "selector": "#matin",
            "attributes": {
              "colspan": "2"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<table id=\"saisons\">\n  <caption>Inscriptions fictives par saison</caption>\n  <thead>\n    <tr>\n      <th rowspan=\"2\">Atelier</th>\n      <th id=\"printemps\" colspan=\"2\">Printemps</th>\n      <th id=\"ete\" colspan=\"2\">Été</th>\n    </tr>\n    <tr>\n      <th id=\"p-enfants\" scope=\"col\">Enfants</th>\n      <th id=\"p-adultes\" scope=\"col\">Adultes</th>\n      <th id=\"e-enfants\" scope=\"col\">Enfants</th>\n      <th id=\"e-adultes\" scope=\"col\">Adultes</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th id=\"semis\" scope=\"row\">Semis</th>\n      <td id=\"semis-p-enfants\" headers=\"semis printemps p-enfants\">2</td>\n      <td id=\"semis-p-adultes\" headers=\"semis printemps p-adultes\">4</td>\n      <td id=\"semis-e-enfants\" headers=\"semis ete e-enfants\">3</td>\n      <td id=\"semis-e-adultes\" headers=\"semis ete e-adultes\">5</td>\n    </tr>\n  </tbody>\n</table>\n",
      "expected_output": "Les sous-colonnes Enfants et Adultes restent distinctes entre les deux saisons.",
      "trace_fr": [
        "Printemps et Été reçoivent chacun un id et une étendue de deux colonnes.",
        "p-enfants et e-enfants gardent des identités distinctes malgré leur texte commun.",
        "Chaque cellule cite l’atelier, la bonne saison et le bon public."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Deux saisons sans croisement",
        "checks": [
          {
            "selector": "#semis-p-enfants[headers~=\"semis\"][headers~=\"printemps\"][headers~=\"p-enfants\"]",
            "textIncludes": "2"
          },
          {
            "selector": "#semis-p-adultes[headers~=\"semis\"][headers~=\"printemps\"][headers~=\"p-adultes\"]",
            "textIncludes": "4"
          },
          {
            "selector": "#semis-e-enfants[headers~=\"semis\"][headers~=\"ete\"][headers~=\"e-enfants\"]",
            "textIncludes": "3"
          },
          {
            "selector": "#semis-e-adultes[headers~=\"semis\"][headers~=\"ete\"][headers~=\"e-adultes\"]",
            "textIncludes": "5"
          },
          {
            "selector": "#p-enfants",
            "count": 1
          },
          {
            "selector": "#e-enfants",
            "count": 1
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre fusion et association",
      "why_fr": "Une cellule étendue n’énumère pas automatiquement tous les en-têtes pertinents dans le code explicite.",
      "fix_fr": "Identifie les th puis compose headers pour chaque mesure."
    },
    {
      "error": "Dupliquer un id sur des textes identiques",
      "why_fr": "Les références ne peuvent plus distinguer les saisons.",
      "fix_fr": "Donne des id uniques comme p-enfants et e-enfants."
    }
  ],
  "quiz": [
    {
      "question": "Que contient headers sur un td ?",
      "options": [
        "Les identifiants des th applicables.",
        "Une règle CSS.",
        "Le nombre de colonnes.",
        "Une liste de valeurs à sommer."
      ],
      "answer": 0,
      "explanation": "headers référence les cellules d’en-tête par leur id, pas leur texte ou leur emplacement visuel.",
      "id": "htmi-m3-02-q1"
    },
    {
      "question": "Deux sous-colonnes nommées Enfants dans des saisons différentes peuvent-elles partager le même id ?",
      "options": [
        "Oui si elles sont en gras.",
        "Oui si le tableau est large.",
        "Non, les id doivent rester uniques dans le document.",
        "Seulement avec colspan=\"2\"."
      ],
      "answer": 2,
      "explanation": "Le texte peut se répéter, mais les références doivent distinguer les éléments.",
      "id": "htmi-m3-02-q2"
    },
    {
      "question": "Que garantit colspan=\"2\" à lui seul ?",
      "options": [
        "Toutes les associations headers.",
        "Une meilleure annonce dans tous les lecteurs d’écran.",
        "L’unicité des identifiants.",
        "Une étendue horizontale sur deux colonnes."
      ],
      "answer": 3,
      "explanation": "colspan décrit la géométrie ; les associations et la qualité d’usage se vérifient séparément.",
      "id": "htmi-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "headers",
      "definition": "Liste d’identifiants des cellules d’en-tête associées à une cellule de tableau."
    },
    {
      "term": "colspan",
      "definition": "Nombre de colonnes occupées par une cellule."
    },
    {
      "term": "rowspan",
      "definition": "Nombre de lignes occupées par une cellule."
    }
  ],
  "recap_fr": [
    "Simplifier le tableau reste une option de conception.",
    "Les id des en-têtes doivent être uniques.",
    "Chaque mesure cite tous les niveaux nécessaires à son sens."
  ],
  "tags": [
    "html",
    "m3",
    "intermédiaire"
  ],
  "environment_fr": "Aperçu isolé dans le navigateur, sans scripts élèves, réseau ni envoi de formulaire. Données fictives ; images SVG embarquées lorsqu’elles sont nécessaires. Les tests inspectent le DOM et les styles calculés aux dimensions indiquées.",
  "technical_checked_on": "2026-11-07",
  "sources": [
    {
      "title": "WHATWG — Tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html",
      "scope": "caption, cellules d’en-tête, scope et associations id/headers."
    },
    {
      "title": "WAI — Tables Tutorial",
      "url": "https://www.w3.org/WAI/tutorials/tables/",
      "scope": "Choix de structures simples et associations explicites pour les données complexes."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Les tableaux simples possèdent souvent une ligne d’intitulés et un en-tête pour chaque ligne de données. Certaines comparaisons ajoutent un niveau : pour chaque atelier, on distingue le printemps et l’été, puis les enfants et les adultes dans chaque saison. Le nombre 3 ne signifie plus seulement « Semis, Enfants » ; il faut aussi connaître la saison. Avant de coder, vérifie qu’une telle grille est vraiment utile. Deux tableaux plus simples peuvent parfois être plus faciles à lire.

Lorsque la structure complexe est justifiée, le document doit exprimer ces niveaux. colspan fusionne horizontalement plusieurs emplacements, par exemple la cellule « Printemps » au-dessus de deux sous-colonnes. rowspan étend une cellule sur plusieurs lignes, comme « Atelier » à gauche des deux rangées d’en-têtes. Ces attributs décrivent la géométrie du tableau ; ils ne constituent pas à eux seuls une liste explicite de tous les en-têtes applicables à chaque mesure.

L’association manuelle utilise deux outils. Les cellules th pertinentes reçoivent des id uniques. Chaque td porte ensuite headers, une liste de ces identifiants séparés par des espaces, sans signe dièse. Pour une mesure de semis concernant les enfants au printemps, la liste peut contenir semis, printemps et p-enfants. Ces trois références apportent respectivement l’atelier, la saison et le public. L’ordre des noms dans l’attribut ne change pas les éléments référencés ; nous gardons un ordre cohérent pour faciliter la relecture du code.

Des textes identiques ne doivent pas conduire à des identifiants partagés. « Enfants » apparaît sous deux saisons, mais p-enfants et e-enfants désignent deux en-têtes distincts. Un seul id enfants dupliqué rendrait les références ambiguës. La même vigilance vaut pour les en-têtes de lignes : chaque atelier possède son propre identifiant et chaque donnée cite celui de sa ligne, pas celui de l’atelier précédent.

Les exemples conservent scope sur les sous-en-têtes de colonnes et sur les ateliers, tout en donnant aux données leurs associations headers complètes. Il ne s’agit pas d’empiler des attributs par réflexe. Les références explicites servent ici à décrire le niveau supplémentaire. Un changement de colonne, de saison ou de structure oblige à relire les headers concernés. Une grille encore correcte visuellement peut porter des relations devenues fausses dans le code.

Pour contrôler ton travail, choisis une cellule et prononce tous ses intitulés avant sa valeur. Fais-le pour plusieurs lignes et pour les deux saisons. Les tests vérifient les identifiants, les étendues et les références attendues, indépendamment de leur ordre dans headers. Ils ne remplacent pas l’essai avec un lecteur d’écran ni le jugement sur la complexité du document. Si la grille réclame une longue explication pour chaque cellule, simplifier les données peut être une meilleure décision qu’ajouter un niveau supplémentaire.

## Exemple guidé 1

```html
<table id="matin-table">
  <caption>Effectif fictif du matin</caption>
  <thead>
    <tr>
      <th rowspan="2">Atelier</th>
      <th id="matin" colspan="2">Matin</th>
    </tr>
    <tr>
      <th id="inscrits" scope="col">Inscrits</th>
      <th id="capacite" scope="col">Capacité</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="semis" scope="row">Semis</th>
      <td id="semis-inscrits" headers="semis matin inscrits">3</td>
      <td id="semis-capacite" headers="semis matin capacite">8</td>
    </tr>
  </tbody>
</table>
```

## Exemple guidé 2

```html
<table id="saisons">
  <caption>Inscriptions fictives par saison</caption>
  <thead>
    <tr>
      <th rowspan="2">Atelier</th>
      <th id="printemps" colspan="2">Printemps</th>
      <th id="ete" colspan="2">Été</th>
    </tr>
    <tr>
      <th id="p-enfants" scope="col">Enfants</th>
      <th id="p-adultes" scope="col">Adultes</th>
      <th id="e-enfants" scope="col">Enfants</th>
      <th id="e-adultes" scope="col">Adultes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="semis" scope="row">Semis</th>
      <td id="semis-p-enfants" headers="semis printemps p-enfants">2</td>
      <td id="semis-p-adultes" headers="semis printemps p-adultes">4</td>
      <td id="semis-e-enfants" headers="semis ete e-enfants">3</td>
      <td id="semis-e-adultes" headers="semis ete e-adultes">5</td>
    </tr>
  </tbody>
</table>
```
