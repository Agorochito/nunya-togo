---
{
  "id": "sql-m2-02",
  "title_fr": "Chercher une liste, un intervalle ou un motif",
  "course": "sql-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "sql-m2-01"
  ],
  "outcomes": [
    "Choisir liste, intervalle ou motif selon le besoin.",
    "Vérifier frontières et positions des caractères."
  ],
  "idea_fr": "IN, BETWEEN et LIKE expriment trois recherches différentes.",
  "analogy_fr": "Une liste de villes, une plage d’âges et un début de nom ne se vérifient pas de la même manière.",
  "common_mistakes": [
    {
      "error": "Frontières exclues",
      "why_fr": "Des comparaisons strictes ne respectent pas inclus.",
      "fix_fr": "Vérifie BETWEEN sur chaque borne."
    },
    {
      "error": "Motif trop large",
      "why_fr": "Une occurrence interne est acceptée.",
      "fix_fr": "Place les symboles selon le besoin."
    },
    {
      "error": "Accents supposés normalisés",
      "why_fr": "Le comportement ASCII est étendu à tout Unicode.",
      "fix_fr": "Vérifie le moteur exact."
    }
  ],
  "quiz": [
    {
      "question": "BETWEEN 16 AND 19 inclut-il les deux bornes ?",
      "options": [
        "Oui.",
        "Seulement 16.",
        "Aucune des deux."
      ],
      "answer": 0,
      "explanation": "L’intervalle numérique est inclusif.",
      "id": "sql-m2-02-q1"
    },
    {
      "question": "Que cherche LIKE 'A%' ?",
      "options": [
        "Un texte finissant forcément par A.",
        "Un texte commençant par A selon la règle de comparaison.",
        "Un seul caractère quelconque."
      ],
      "answer": 1,
      "explanation": "% permet une suite après la lettre.",
      "id": "sql-m2-02-q2"
    },
    {
      "question": "LIKE normalise-t-il par défaut tous les accents Unicode ?",
      "options": [
        "Oui, tous les accents sont supprimés.",
        "Oui, toutes les lettres deviennent identiques.",
        "Non, la souplesse de casse décrite ici concerne ASCII."
      ],
      "answer": 2,
      "explanation": "Ne généralise pas une règle ASCII à toutes les écritures.",
      "id": "sql-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "appartenance",
      "definition": "Présence dans une liste de valeurs."
    },
    {
      "term": "intervalle inclusif",
      "definition": "Plage comprenant ses frontières."
    },
    {
      "term": "motif",
      "definition": "Forme textuelle décrite pour une recherche."
    },
    {
      "term": "ASCII",
      "definition": "Plage comprenant notamment les lettres latines non accentuées."
    }
  ],
  "recap_fr": [
    "Choisir liste, intervalle ou motif selon le besoin.",
    "Vérifier frontières et positions des caractères.",
    "Distinguer souplesse ASCII et normalisation des accents."
  ],
  "tags": [
    "appartenance",
    "intervalle inclusif",
    "motif",
    "ASCII"
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
        "IN réunit les deux valeurs recherchées.",
        "Les autres villes ne sont pas retenues.",
        "Afi, Kossi et Lina sont affichés selon id dans club."
      ],
      "expected_output": "Colonnes : id | nom | ville\n1 | Afi | Lomé\n2 | Kossi | Kara\n4 | Lina | Lomé"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "Le motif demande une lettre initiale puis une suite.",
        "Le LIKE par défaut considère a et A comme équivalents dans ce cas ASCII.",
        "Afi est le seul nom correspondant de club."
      ],
      "expected_output": "Colonnes : id | nom\n1 | Afi"
    }
  ]
}
---

## Explication pas à pas

Des recherches courantes peuvent être écrites sans multiplier les mêmes comparaisons. IN teste l’appartenance à une liste explicite. ville IN ('Lomé', 'Kara') retient les lignes dont la ville correspond à l’une de ces valeurs. Les apostrophes délimitent les textes et les virgules séparent les éléments. La liste ne crée aucune ligne et ne trie pas le résultat selon l’ordre de ses valeurs.

BETWEEN décrit un intervalle incluant ses deux bornes. age BETWEEN 16 AND 19 accepte seize et dix-neuf, ainsi que les valeurs intermédiaires. Le mot AND appartient ici à la syntaxe de l’intervalle. Pour nos nombres, cela revient à age >= 16 AND age <= 19, pas à deux signes stricts. Vérifie les frontières au même titre que le milieu de la plage.

LIKE compare un texte à un motif. Le symbole % représente zéro, un ou plusieurs caractères. Le symbole _ représente exactement un caractère. nom LIKE 'A%' cherche donc un nom commençant par A ; '%A%' cherche une occurrence n’importe où dans le nom. La position des symboles modifie la question. Contenir une lettre ne signifie pas forcément commencer par cette lettre.

Dans la configuration SQLite enseignée ici, LIKE ne distingue pas les majuscules et minuscules des lettres ASCII ordinaires : 'a%' peut trouver Afi. Il ne s’agit pas d’une normalisation Unicode complète. Les lettres accentuées ne doivent pas être supposées équivalentes entre majuscule et minuscule, et l’accent n’est pas supprimé. Des extensions ou réglages peuvent modifier un autre environnement ; nous nous appuyons sur celui du moteur fourni.

Ces opérateurs peuvent être associés à AND, OR et aux parenthèses. Une liste de titres et une plage de prix peuvent décrire un extrait de catalogue fictif. La condition se place avant ORDER BY, puis LIMIT si nécessaire. Aucun de ces opérateurs ne garantit un ordre de sortie à lui seul. Garde un classement explicite et un départage déterministe lorsque des valeurs sont égales.

Une absence de correspondance ne prouve pas que la table est vide. Examine la liste, les bornes et le motif avant d’élargir la recherche. Les villes non renseignées utilisent NULL et demandent un traitement particulier, étudié dans la prochaine leçon. Pour l’instant, ne remplace pas une valeur absente par une ville inventée afin de la faire entrer dans un ensemble.

Variation ajoute notamment Ama et l’atelier Lecture. Une requête limitée aux fiches mémorisées de club ne répondrait plus à la règle. Teste les frontières de BETWEEN, le début exact d’un motif et les colonnes de sortie. Chaque essai reconstruit le jeu initial : la sélection d’un sous-ensemble ne retire aucune fiche du registre.

## Exemple guidé 1

```sql
-- Liste de villes puis ordre explicite.
SELECT id, nom, ville FROM membres WHERE ville IN ('Lomé', 'Kara') ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | ville
1 | Afi | Lomé
2 | Kossi | Kara
4 | Lina | Lomé
```

Trace :

- IN réunit les deux valeurs recherchées.
- Les autres villes ne sont pas retenues.
- Afi, Kossi et Lina sont affichés selon id dans club.

## Exemple guidé 2

```sql
-- Le a minuscule appartient à la plage ASCII.
SELECT id, nom FROM membres WHERE nom LIKE 'a%' ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom
1 | Afi
```

Trace :

- Le motif demande une lettre initiale puis une suite.
- Le LIKE par défaut considère a et A comme équivalents dans ce cas ASCII.
- Afi est le seul nom correspondant de club.

