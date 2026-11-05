---
{
  "id": "sql-m1-02",
  "title_fr": "Choisir des colonnes, des alias et des expressions",
  "course": "sql-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "sql-m1-01"
  ],
  "outcomes": [
    "Choisir les rubriques utiles dans leur ordre.",
    "Nommer un calcul avec un alias explicite."
  ],
  "idea_fr": "La liste SELECT définit les colonnes du résultat et peut calculer sans modifier la source.",
  "analogy_fr": "Une fiche de consultation peut montrer seulement les rubriques utiles du registre.",
  "common_mistakes": [
    {
      "error": "Alias absent",
      "why_fr": "La valeur est bonne mais son nom de sortie ne respecte pas le contrat.",
      "fix_fr": "Ajoute AS avec le nom demandé."
    },
    {
      "error": "Texte à la place d’une colonne",
      "why_fr": "Une rubrique est mise entre apostrophes.",
      "fix_fr": "Lis la colonne par son nom."
    },
    {
      "error": "Calcul pris pour écriture",
      "why_fr": "La sortie est supposée remplacer la source.",
      "fix_fr": "Distingue lecture et modification."
    }
  ],
  "quiz": [
    {
      "question": "Une projection de deux colonnes retire-t-elle forcément des lignes ?",
      "options": [
        "Non, elle choisit les rubriques.",
        "Oui, elle garde deux lignes.",
        "Oui, elle supprime la source."
      ],
      "answer": 0,
      "explanation": "Colonnes affichées et lignes retenues sont deux choix distincts.",
      "id": "sql-m1-02-q1"
    },
    {
      "question": "Que fait prix AS prix_fcfa ?",
      "options": [
        "Renommer la table.",
        "Nommer prix_fcfa la colonne du résultat.",
        "Transformer le prix en texte forcément."
      ],
      "answer": 1,
      "explanation": "L’alias concerne la sortie de la requête.",
      "id": "sql-m1-02-q2"
    },
    {
      "question": "Que signifie * dans prix * 2 ?",
      "options": [
        "Toutes les tables.",
        "Une suppression.",
        "Une multiplication."
      ],
      "answer": 2,
      "explanation": "Son rôle diffère de l’étoile isolée dans SELECT *.",
      "id": "sql-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "projection",
      "definition": "Choix des rubriques affichées par SELECT."
    },
    {
      "term": "alias",
      "definition": "Nom d’une colonne du résultat."
    },
    {
      "term": "expression",
      "definition": "Calcul à partir de valeurs et d’opérateurs."
    }
  ],
  "recap_fr": [
    "Choisir les rubriques utiles dans leur ordre.",
    "Nommer un calcul avec un alias explicite.",
    "Distinguer lecture calculée et modification."
  ],
  "tags": [
    "projection",
    "alias",
    "expression"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "SQLite réel via sql.js dans un Worker local, sans serveur distant. Chaque essai et test reconstruit sa fixture : les modifications de la base temporaire ne sont pas conservées. Scripts et progression peuvent être sauvegardés. Données et montants FCFA fictifs. Pas de JavaScript, terminal ou input().",
  "sources": [
    {
      "title": "SQLite — SELECT",
      "url": "https://sqlite.org/lang_select.html",
      "scope": "Référence technique ; explications et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — Expressions",
      "url": "https://sqlite.org/lang_expr.html",
      "scope": "Référence technique ; aucune reprise de cours tiers.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "fixture": "club",
      "trace_fr": [
        "FROM choisit membres.",
        "La projection conserve nom puis age.",
        "Les cinq lignes de club sont présentes, dans l’ordre des identifiants."
      ],
      "expected_output": "Colonnes : nom | age\nAfi | 16\nKossi | 19\nMina | 17\nLina | 22\nYao | 15"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "titre prend l’alias atelier dans la sortie.",
        "Chaque prix est multiplié par deux.",
        "Les montants sont 2000, 1000, 3000 et 0 ; la table conserve ses prix initiaux."
      ],
      "expected_output": "Colonnes : atelier | prix_deux\nPython | 2000\nJardin | 1000\nWeb | 3000\nDessin | 0"
    }
  ]
}
---

## Explication pas à pas

Lire toutes les colonnes aide à découvrir une table. Pour une recherche précise, une liste explicite est souvent plus claire. SELECT nom, age FROM membres choisit deux rubriques dans cet ordre. On appelle projection ce choix de colonnes. Les lignes ne sont pas encore filtrées : la requête produit une ligne de résultat pour chaque ligne source, avec seulement les informations demandées.

L’ordre écrit dans SELECT devient celui des colonnes du résultat. SELECT age, nom n’a donc pas la même présentation que SELECT nom, age. Les tests vérifient les noms et l’ordre des colonnes, pas uniquement quelques valeurs présentes. Le repère ORDER BY id stabilise encore les lignes. Il est possible de trier selon id sans l’afficher dans la projection.

Un alias donne un nom de sortie à une colonne ou une expression. prix AS prix_fcfa conserve les valeurs de prix mais nomme la colonne obtenue prix_fcfa. Cette écriture ne renomme pas la rubrique enregistrée dans la table. Le mot AS rend l’intention visible. Les alias demandés dans les exercices font partie du contrat et expliquent le sens d’un calcul.

Une expression peut utiliser plusieurs opérateurs. prix * 2 calcule ici le montant fictif de deux unités. places + 1 produit un nombre calculé, sans attribuer une place réelle et sans l’enregistrer dans ateliers. Les multiplications et divisions passent avant les additions et soustractions. Des parenthèses permettent un autre groupement. Nos premiers calculs utilisent des entiers pour rester faciles à vérifier.

Attention au rôle de l’étoile. Placée seule dans SELECT *, elle demande toutes les colonnes. Dans prix * 2, elle représente une multiplication entre deux valeurs. Le contexte change son sens. Une expression calculée doit également recevoir un alias lisible : le lecteur doit comprendre la formule et l’unité, plutôt qu’un titre technique laissé au hasard par l’outil.

Les noms de colonnes comme prix ou titre désignent les rubriques du schéma. Un texte littéral s’écrit entre apostrophes simples en SQL ; nous l’utiliserons dans les recherches du prochain module. Ne mets pas une colonne entre apostrophes pour tenter de la lire : tu demanderais un texte constant. Les nombres d’une formule servent au calcul, pas à remplacer toutes les données de la source.

Chaque essai reconstruit sa base et ces SELECT doivent la laisser intacte. Un autre jeu peut contenir plus de lignes ou des prix différents. Vérifie le calcul sur une première ligne, puis laisse SQLite l’appliquer à toute la table. Le résultat n’est pas un tarif réel : les montants FCFA sont fictifs, et une expression sans écriture reste seulement une lecture calculée.

## Exemple guidé 1

```sql
-- Projection de deux rubriques, sans filtre de lignes.
SELECT nom, age FROM membres ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : nom | age
Afi | 16
Kossi | 19
Mina | 17
Lina | 22
Yao | 15
```

Trace :

- FROM choisit membres.
- La projection conserve nom puis age.
- Les cinq lignes de club sont présentes, dans l’ordre des identifiants.

## Exemple guidé 2

```sql
-- Montants fictifs pour deux unités, sans modification.
SELECT titre AS atelier, prix * 2 AS prix_deux FROM ateliers ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : atelier | prix_deux
Python | 2000
Jardin | 1000
Web | 3000
Dessin | 0
```

Trace :

- titre prend l’alias atelier dans la sortie.
- Chaque prix est multiplié par deux.
- Les montants sont 2000, 1000, 3000 et 0 ; la table conserve ses prix initiaux.

