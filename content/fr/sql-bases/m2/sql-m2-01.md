---
{
  "id": "sql-m2-01",
  "title_fr": "Filtrer les lignes et combiner les critères",
  "course": "sql-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "sql-m1-03"
  ],
  "outcomes": [
    "Filtrer sans modifier les lignes de la table.",
    "Combiner les critères avec un groupement explicite."
  ],
  "idea_fr": "WHERE retient les lignes pour lesquelles une condition est vraie.",
  "analogy_fr": "Une recherche du registre combine des rubriques sans changer les fiches.",
  "common_mistakes": [
    {
      "error": "Borne trop stricte",
      "why_fr": "Une valeur autorisée est exclue.",
      "fix_fr": "Teste exactement la frontière."
    },
    {
      "error": "OU au lieu de ET",
      "why_fr": "Une seule règle suffit.",
      "fix_fr": "Relis le besoin simultané."
    },
    {
      "error": "Groupe oublié",
      "why_fr": "Un seuil ne concerne qu’une branche.",
      "fix_fr": "Écris explicitement les parenthèses."
    }
  ],
  "quiz": [
    {
      "question": "Que choisit WHERE ?",
      "options": [
        "Le nouveau nom de toutes les tables.",
        "Les colonnes seulement.",
        "Les lignes satisfaisant la condition."
      ],
      "answer": 2,
      "explanation": "Projection et filtre ont des rôles distincts.",
      "id": "sql-m2-01-q1"
    },
    {
      "question": "Que signifie AND ?",
      "options": [
        "Les deux critères doivent être vrais.",
        "Un seul doit être vrai obligatoirement.",
        "Les deux doivent être faux."
      ],
      "answer": 0,
      "explanation": "Il impose les exigences simultanément.",
      "id": "sql-m2-01-q2"
    },
    {
      "question": "Pourquoi parenthéser les alternatives avec OR ?",
      "options": [
        "Pour créer une table.",
        "Pour préciser à quel groupe s’applique un autre critère.",
        "Pour transformer tous les nombres en texte."
      ],
      "answer": 1,
      "explanation": "Le groupement empêche une autre interprétation des priorités.",
      "id": "sql-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "filtre",
      "definition": "Condition choisissant des lignes."
    },
    {
      "term": "comparaison",
      "definition": "Test sans modification de la donnée."
    },
    {
      "term": "littéral",
      "definition": "Valeur directement écrite, comme un texte entre apostrophes."
    },
    {
      "term": "priorité logique",
      "definition": "Groupement appliqué aux opérateurs de conditions."
    }
  ],
  "recap_fr": [
    "Filtrer sans modifier les lignes de la table.",
    "Combiner les critères avec un groupement explicite.",
    "Vérifier les frontières sur plusieurs fixtures."
  ],
  "tags": [
    "filtre",
    "comparaison",
    "littéral",
    "priorité logique"
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
        "FROM fournit les membres de club.",
        "WHERE conserve Kossi 19 et Lina 22.",
        "La projection garde id, nom, age, puis le tri stabilise les lignes."
      ],
      "expected_output": "Colonnes : id | nom | age\n2 | Kossi | 19\n4 | Lina | 22"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "Les parenthèses réunissent les deux villes.",
        "La borne commune est appliquée à tout ce groupe.",
        "Kossi à Kara et Lina à Lomé sont retenus dans club."
      ],
      "expected_output": "Colonnes : id | nom | ville\n2 | Kossi | Kara\n4 | Lina | Lomé"
    }
  ]
}
---

## Explication pas à pas

La projection choisit les colonnes ; un filtre choisit les lignes. WHERE place une condition après la source FROM. SELECT nom FROM membres WHERE age >= 18 garde les noms des lignes dont l’âge atteint la borne annoncée. C’est une recherche sur des données fictives, pas une décision réelle concernant une personne. Les lignes non retenues restent dans la table.

Les comparaisons numériques utilisent = pour l’égalité, <> pour la différence, puis <, >, <= et >= pour les bornes. Le signe égal d’une condition ne modifie pas une donnée. Une borne incluse accepte la valeur égale ; une borne stricte l’exclut. Teste juste avant, exactement sur la frontière et juste après pour vérifier la traduction de la consigne.

Pour comparer un texte connu, écris un littéral entre apostrophes simples, par exemple ville = 'Lomé'. Le nom ville désigne une colonne tandis que 'Lomé' est la valeur recherchée. Ne remplace pas cette écriture par un nom approximatif. Certains membres ont une ville non renseignée ; leur recherche particulière sera expliquée dans la troisième leçon.

AND demande que les deux critères soient vrais. places > 0 AND prix <= 1000 retient uniquement les ateliers qui respectent simultanément ces règles fictives. Un petit montant ne suffit pas si aucune place n’est disponible ; une place disponible ne suffit pas si le montant dépasse la borne. OR accepte une ligne lorsqu’au moins un des critères réunis convient.

Quand AND et OR apparaissent ensemble, les parenthèses expriment les groupes. Sans elles, AND est prioritaire sur OR dans SQLite. ville = 'Lomé' OR ville = 'Kara' AND age >= 18 n’impose donc pas la limite d’âge au groupe de Lomé. Pour appliquer cette limite aux deux villes, écris (ville = 'Lomé' OR ville = 'Kara') AND age >= 18. Lis chaque branche avant d’exécuter.

Le tri reste une autre étape : WHERE se place avant ORDER BY et LIMIT. Les rubriques conservées dans SELECT ne changent pas automatiquement quand le filtre utilise une colonne supplémentaire. Tu peux afficher seulement id et nom tout en testant age. La sortie doit conserver exactement les colonnes et les alias annoncés par l’exercice.

Chaque essai repart de son jeu initial. Vérifie la même requête sur club et variation : une borne absente du premier jeu peut devenir décisive dans le second. Une recherche vide reste un résultat possible avec ses colonnes. Elle n’autorise pas à inventer une fiche. Explique la condition appliquée et distingue-la toujours d’une suppression ou d’une mise à jour.

## Exemple guidé 1

```sql
-- Borne incluse, sans modifier les fiches.
SELECT id, nom, age FROM membres WHERE age >= 18 ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | age
2 | Kossi | 19
4 | Lina | 22
```

Trace :

- FROM fournit les membres de club.
- WHERE conserve Kossi 19 et Lina 22.
- La projection garde id, nom, age, puis le tri stabilise les lignes.

## Exemple guidé 2

```sql
-- Les deux villes partagent la même borne.
SELECT id, nom, ville FROM membres WHERE (ville = 'Lomé' OR ville = 'Kara') AND age >= 18 ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | ville
2 | Kossi | Kara
4 | Lina | Lomé
```

Trace :

- Les parenthèses réunissent les deux villes.
- La borne commune est appliquée à tout ce groupe.
- Kossi à Kara et Lina à Lomé sont retenus dans club.

