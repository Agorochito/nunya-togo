---
{
  "id": "sql-m2-03",
  "title_fr": "Rechercher NULL et présenter un remplacement",
  "course": "sql-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "sql-m2-02"
  ],
  "outcomes": [
    "Rechercher une absence avec IS NULL.",
    "Présenter un remplacement sans changer la source."
  ],
  "idea_fr": "IS NULL cherche une valeur absente ; COALESCE calcule un remplacement de présentation.",
  "analogy_fr": "Une rubrique inconnue peut rester inconnue dans le registre tout en portant une mention claire sur une fiche de lecture.",
  "common_mistakes": [
    {
      "error": "Égalité à NULL",
      "why_fr": "La comparaison ne devient pas vraie pour les absences.",
      "fix_fr": "Utilise les tests IS NULL et IS NOT NULL."
    },
    {
      "error": "COALESCE inversé",
      "why_fr": "Une constante masque les villes connues.",
      "fix_fr": "Place la rubrique avant son remplacement."
    },
    {
      "error": "Affichage pris pour saisie",
      "why_fr": "Une mention calculée est supposée compléter la table.",
      "fix_fr": "Distingue SELECT et modification."
    }
  ],
  "quiz": [
    {
      "question": "NULL est-il identique au texte 'NULL' ?",
      "options": [
        "Oui, ce sont les mêmes valeurs.",
        "Non, c’est un marqueur de valeur absente.",
        "Oui, et ils valent toujours zéro."
      ],
      "answer": 1,
      "explanation": "Texte, nombre et absence sont distincts.",
      "id": "sql-m2-03-q1"
    },
    {
      "question": "Quelle condition trouve une ville non renseignée ?",
      "options": [
        "ville = NULL",
        "ville <> NULL",
        "ville IS NULL"
      ],
      "answer": 2,
      "explanation": "IS NULL est le test de présence adapté.",
      "id": "sql-m2-03-q2"
    },
    {
      "question": "Quel effet produit COALESCE dans cette lecture SELECT ?",
      "options": [
        "Il calcule une valeur de sortie sans modifier la table.",
        "Il remplace les valeurs dans la colonne de la table.",
        "Il supprime les lignes dont la valeur est NULL."
      ],
      "answer": 0,
      "explanation": "La source reste intacte pendant cette lecture.",
      "id": "sql-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "NULL",
      "definition": "Marqueur de valeur non renseignée."
    },
    {
      "term": "IS NULL",
      "definition": "Test spécifique d’absence d’une valeur."
    },
    {
      "term": "COALESCE",
      "definition": "Fonction choisissant son premier argument non NULL."
    },
    {
      "term": "présentation calculée",
      "definition": "Valeur de sortie qui ne change pas la source."
    }
  ],
  "recap_fr": [
    "Rechercher une absence avec IS NULL.",
    "Présenter un remplacement sans changer la source.",
    "Combiner présence, filtre et tri."
  ],
  "tags": [
    "NULL",
    "IS NULL",
    "COALESCE",
    "présentation calculée"
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
    },
    {
      "title": "SQLite — COALESCE et fonctions scalaires",
      "url": "https://sqlite.org/lang_corefunc.html#coalesce",
      "scope": "Référence technique ; contenu pédagogique original Nunya.",
      "last_checked": "2026-11-05"
    }
  ],
  "examples": [
    {
      "fixture": "club",
      "trace_fr": [
        "IS NULL teste la rubrique ville.",
        "Mina correspond dans club.",
        "Son id et son nom sont conservés, sans ville inventée."
      ],
      "expected_output": "Colonnes : id | nom\n3 | Mina"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "Toutes les fiches restent lues.",
        "Les villes connues restent inchangées ; NULL reçoit la mention de présentation.",
        "L’alias appartient au résultat ; Mina garde NULL dans la table."
      ],
      "expected_output": "Colonnes : id | nom | ville_affichee\n1 | Afi | Lomé\n2 | Kossi | Kara\n3 | Mina | Non renseignée\n4 | Lina | Lomé\n5 | Yao | Sokodé"
    }
  ]
}
---

## Explication pas à pas

La colonne ville de membres peut ne pas être renseignée. Le marqueur NULL représente cette situation dans nos données. Il n’est ni le texte 'NULL', ni une chaîne vide, ni le nombre zéro. La fiche de Mina existe avec son nom et son âge ; seule sa ville est absente. Confondre une rubrique manquante et une ligne manquante conduit à une mauvaise question.

Une comparaison ordinaire avec NULL ne fonctionne pas comme une comparaison entre textes connus. ville = NULL ne devient pas vraie pour sélectionner les villes absentes. ville <> NULL ne fournit pas non plus la liste des villes connues. WHERE retient les conditions vraies ; un résultat inconnu à cause de NULL ne répond pas à cette exigence.

Utilise IS NULL pour chercher une valeur absente, et IS NOT NULL pour chercher une valeur renseignée. Ces tests portent sur la présence, sans inventer le contenu. SELECT id, nom FROM membres WHERE ville IS NULL montre les fiches à compléter, triées par id si cet ordre est annoncé. L’écriture du test est distincte de celle d’un texte littéral.

COALESCE choisit la première valeur non NULL parmi ses arguments. Dans COALESCE(ville, 'Non renseignée'), une ville connue est conservée ; sinon le texte de remplacement est retourné. L’ordre compte : si une constante connue est placée en premier, elle est toujours choisie et masque les villes présentes. L’objectif n’est pas de remplacer toutes les données par la même étiquette.

L’expression peut recevoir l’alias ville_affichee dans la projection. Elle ne remplit pas la colonne ville dans la table. Une présentation lisible et une mise à jour sont deux intentions différentes. Une chaîne vide resterait vide avec ce COALESCE, puisqu’elle n’est pas NULL. Nos fixtures fournissent des villes connues ou NULL ; aucune règle implicite ne doit être inventée pour les convertir.

Les tests de présence se combinent aux critères précédents. Pour chercher des villes absentes ou Lomé avec une borne d’âge commune, parenthèse les deux alternatives avant AND age >= 16. Sans ce groupe, la branche NULL pourrait échapper au seuil. Une fiche sans ville située sous la borne met cette erreur en évidence, même si le premier jeu ne contient pas ce cas.

Chaque résultat reste une lecture dans la base temporaire reconstruite au début de l’essai. L’ordre doit être explicite même lorsque plusieurs fiches partagent une absence. Club et variation ne possèdent pas le même nombre de NULL. Décris ce qui est connu, conserve l’inconnu dans la source et limite le remplacement à l’affichage annoncé. Une mention honnête vaut mieux qu’une ville inventée pour obtenir une sortie plus complète.

## Exemple guidé 1

```sql
-- Chercher une rubrique absente, pas une fiche absente.
SELECT id, nom FROM membres WHERE ville IS NULL ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom
3 | Mina
```

Trace :

- IS NULL teste la rubrique ville.
- Mina correspond dans club.
- Son id et son nom sont conservés, sans ville inventée.

## Exemple guidé 2

```sql
-- Une expression de présentation ne met pas la source à jour.
SELECT id, nom, COALESCE(ville, 'Non renseignée') AS ville_affichee FROM membres ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | ville_affichee
1 | Afi | Lomé
2 | Kossi | Kara
3 | Mina | Non renseignée
4 | Lina | Lomé
5 | Yao | Sokodé
```

Trace :

- Toutes les fiches restent lues.
- Les villes connues restent inchangées ; NULL reçoit la mention de présentation.
- L’alias appartient au résultat ; Mina garde NULL dans la table.

