---
{
  "id": "sql-m1-03",
  "title_fr": "Trier, limiter et départager les ex æquo",
  "course": "sql-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "sql-m1-02"
  ],
  "outcomes": [
    "Définir le sens et les critères d’un tri.",
    "Départager les ex æquo avant de limiter."
  ],
  "idea_fr": "ORDER BY fixe un classement ; LIMIT prend ensuite un nombre maximal de ses lignes.",
  "analogy_fr": "Une liste courte a besoin d’un ordre et d’une règle en cas d’égalité.",
  "common_mistakes": [
    {
      "error": "Sens inversé",
      "why_fr": "Les petits nombres arrivent au lieu des grands.",
      "fix_fr": "Relie ASC ou DESC au besoin."
    },
    {
      "error": "Égalités oubliées",
      "why_fr": "Le classement reste incomplet.",
      "fix_fr": "Ajoute un repère stable comme id."
    },
    {
      "error": "Limite prise pour filtre",
      "why_fr": "Taille de sortie et valeur recherchée sont mélangées.",
      "fix_fr": "Distingue combien de lignes et quelle ligne."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi ajouter id après prix ?",
      "options": [
        "Pour additionner prix et id.",
        "Pour départager des prix égaux.",
        "Pour supprimer les doublons."
      ],
      "answer": 1,
      "explanation": "Un second critère complète le classement.",
      "id": "sql-m1-03-q1"
    },
    {
      "question": "Que fait LIMIT 2 après le tri ?",
      "options": [
        "Chercher id=2.",
        "Créer deux lignes.",
        "Garder au maximum deux lignes triées."
      ],
      "answer": 2,
      "explanation": "La limite borne la taille de sortie.",
      "id": "sql-m1-03-q2"
    },
    {
      "question": "Un tri modifie-t-il définitivement la table ?",
      "options": [
        "Non, il organise la lecture.",
        "Oui, les identifiants changent.",
        "Oui, les autres lignes sont effacées."
      ],
      "answer": 0,
      "explanation": "SELECT reste une opération de lecture.",
      "id": "sql-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "tri",
      "definition": "Ordre demandé pour les lignes du résultat."
    },
    {
      "term": "ex æquo",
      "definition": "Lignes égales selon un premier critère."
    },
    {
      "term": "départage",
      "definition": "Critère supplémentaire pour ordonner les égalités."
    },
    {
      "term": "limite",
      "definition": "Nombre maximal de lignes retournées."
    }
  ],
  "recap_fr": [
    "Définir le sens et les critères d’un tri.",
    "Départager les ex æquo avant de limiter.",
    "Vérifier un ordre déterministe sur plusieurs jeux."
  ],
  "tags": [
    "tri",
    "ex æquo",
    "départage",
    "limite"
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
        "prix est le premier critère.",
        "Dans club, Dessin 0 précède Jardin 500, Python 1000 et Web 1500.",
        "id fixerait l’ordre de lignes ayant le même prix."
      ],
      "expected_output": "Colonnes : id | titre | prix\n4 | Dessin | 0\n2 | Jardin | 500\n1 | Python | 1000\n3 | Web | 1500"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "Les âges sont classés en ordre décroissant.",
        "Lina 22 précède Kossi 19 puis Mina 17 dans club.",
        "La limite retient ces trois lignes sans effacer les autres."
      ],
      "expected_output": "Colonnes : id | nom | age\n4 | Lina | 22\n2 | Kossi | 19\n3 | Mina | 17"
    }
  ]
}
---

## Explication pas à pas

Les tables ne garantissent pas un ordre naturel de présentation. Les premiers exemples demandaient ORDER BY id pour fixer un repère. Nous pouvons maintenant choisir d’autres critères. ORDER BY prix ASC range les montants du plus petit au plus grand ; DESC demande l’ordre inverse. Si le sens est omis, le tri est croissant. Cela organise le résultat sans déplacer durablement les données.

Un premier critère peut produire des ex æquo. Deux ateliers de variation possèdent le même prix. ORDER BY prix ne définit pas lequel vient avant l’autre. Pour obtenir un résultat déterministe, ajoute un second critère : ORDER BY prix ASC, id ASC. On compare d’abord les prix, puis les identifiants si les prix sont égaux. Ici, id unique termine le départage.

Les sens peuvent différer selon les colonnes. ORDER BY age DESC, id ASC place les âges élevés en premier, puis les petits identifiants parmi les âges égaux. Le deuxième sens ne modifie pas le premier : il sert seulement aux égalités. Lis les critères de gauche à droite. Une rubrique peut servir au tri sans être affichée, mais les exercices montrent souvent id pour faciliter le contrôle.

LIMIT impose ensuite un maximum de lignes de sortie. Avec un tri déjà défini, LIMIT 3 garde les trois premiers résultats. Si la source contient seulement deux lignes, il ne crée pas une troisième ligne. Si elle est vide, le résultat reste vide. Le nombre demandé n’est pas une condition sur une colonne : LIMIT 3 ne signifie pas chercher id égal à trois.

Pour les deux montants les plus élevés, demande un tri décroissant des prix avant la limite. Un LIMIT sans ordre explicite pourrait changer les lignes retenues sans contredire la demande SQL. Un classement incomplet parmi des ex æquo pourrait également modifier leur sélection près de la frontière. Le départage n’est donc pas un détail décoratif ; il appartient au sens de la liste courte.

L’ordre des colonnes affichées reste celui de SELECT. Trier par prix ne déplace pas cette colonne au début du résultat. Une formule et son alias peuvent aussi rester dans la projection tout en étant présentés dans un ordre choisi. Nous travaillons ici des nombres et des identifiants : il ne faut pas déduire de ces exemples toutes les règles particulières du tri des textes.

Les données restent fictives et chaque essai repart de sa fixture. Une liste appelée premiers ateliers n’est pas une recommandation commerciale ou un classement mesuré de popularité. Les tests utilisent variation pour créer des égalités absentes de club. Vérifie le sens, le départage et la taille du résultat plutôt que mémoriser l’ordre aperçu une seule fois. Aucune ligne non retenue dans la sortie n’a été effacée de la table.

## Exemple guidé 1

```sql
-- Prix croissants puis identifiants pour les égalités.
SELECT id, titre, prix FROM ateliers ORDER BY prix ASC, id ASC;
```

Résultat attendu sur club :

```text
Colonnes : id | titre | prix
4 | Dessin | 0
2 | Jardin | 500
1 | Python | 1000
3 | Web | 1500
```

Trace :

- prix est le premier critère.
- Dans club, Dessin 0 précède Jardin 500, Python 1000 et Web 1500.
- id fixerait l’ordre de lignes ayant le même prix.

## Exemple guidé 2

```sql
-- Trois âges élevés avec un départage explicite.
SELECT id, nom, age FROM membres ORDER BY age DESC, id ASC LIMIT 3;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | age
4 | Lina | 22
2 | Kossi | 19
3 | Mina | 17
```

Trace :

- Les âges sont classés en ordre décroissant.
- Lina 22 précède Kossi 19 puis Mina 17 dans club.
- La limite retient ces trois lignes sans effacer les autres.

