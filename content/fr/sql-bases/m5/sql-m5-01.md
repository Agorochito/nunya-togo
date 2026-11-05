---
{
  "id": "sql-m5-01",
  "title_fr": "Créer une table et éprouver ses contraintes",
  "course": "sql-bases",
  "module": "m5",
  "order": 13,
  "minutes": 20,
  "prerequisites": [
    "sql-m4-03"
  ],
  "outcomes": [
    "Créer une structure et distinguer présence, unicité et condition.",
    "Expliquer le rôle d’un défaut et d’une référence réellement vérifiés."
  ],
  "idea_fr": "Créer une structure et distinguer présence, unicité et condition.",
  "analogy_fr": "Une association fictive prépare les données de son club, puis vérifie les changements avant de les utiliser.",
  "examples": [
    {
      "expected_output": "La table livres existe avec id, titre et stock ; elle ne contient aucune ligne.",
      "trace_fr": [
        "CREATE TABLE définit trois colonnes.",
        "NOT NULL et CHECK jouent des rôles distincts.",
        "Le défaut de stock vaut zéro pour une colonne omise lors d’un ajout futur."
      ],
      "fixture": "vierge"
    },
    {
      "expected_output": "Les tables genres et livres existent, sans lignes, avec une référence livres.genre_id vers genres.id.",
      "trace_fr": [
        "genres est créée avant la table qui la référence.",
        "Le nom de genre est obligatoire et unique.",
        "La clé étrangère sera vérifiée lors des écritures."
      ],
      "fixture": "vierge"
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre CHECK et présence",
      "why_fr": "NULL peut satisfaire le mécanisme de CHECK sans être une quantité présente.",
      "fix_fr": "Combine CHECK avec NOT NULL."
    },
    {
      "error": "Croire qu’un défaut remplace toute entrée",
      "why_fr": "Une valeur explicitement fournie suit ses propres règles.",
      "fix_fr": "Teste séparément colonne omise et NULL explicite."
    }
  ],
  "quiz": [
    {
      "question": "CHECK(stock >= 0) interdit-il seul un stock NULL ?",
      "options": [
        "Oui, toujours.",
        "CHECK crée automatiquement une valeur zéro.",
        "Non ; NOT NULL est nécessaire pour cette autre règle."
      ],
      "answer": 2,
      "explanation": "SQLite accepte une condition CHECK évaluée à NULL ; présence et comparaison doivent être distinguées.",
      "id": "sql-m5-01-q1"
    },
    {
      "question": "Quand DEFAULT 0 intervient-il ici ?",
      "options": [
        "À chaque lecture SELECT.",
        "Quand la colonne est omise lors de l’ajout.",
        "Quand n’importe quelle valeur est négative."
      ],
      "answer": 1,
      "explanation": "Un défaut remplace une valeur non fournie, pas toute valeur explicitement envoyée.",
      "id": "sql-m5-01-q2"
    },
    {
      "question": "Comment vérifier une clé étrangère ?",
      "options": [
        "Tenter une référence inexistante avec le contrôle activé.",
        "Chercher REFERENCES dans un commentaire.",
        "Compter seulement les colonnes."
      ],
      "answer": 0,
      "explanation": "La sonde exécute une écriture réelle qui doit être refusée.",
      "id": "sql-m5-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrainte",
      "definition": "Règle vérifiée par le moteur pendant une écriture."
    },
    {
      "term": "valeur par défaut",
      "definition": "Valeur fournie pour une colonne omise lors d’un ajout."
    },
    {
      "term": "clé étrangère",
      "definition": "Référence qui exige une correspondance dans une autre table."
    }
  ],
  "recap_fr": [
    "Créer une structure et distinguer présence, unicité et condition.",
    "Expliquer le rôle d’un défaut et d’une référence réellement vérifiés.",
    "Distinguer le script sauvegardé et les données temporaires de chaque essai."
  ],
  "tags": [
    "contrainte",
    "valeur par défaut",
    "clé étrangère"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "Moteur SQLite/sql.js réel, auto-hébergé et exécuté dans un Worker. Base fictive temporaire réinitialisée à chaque essai et à chaque test ; clés étrangères activées. Le SQL et la progression sont sauvegardés, pas les modifications de la base. Disponible hors ligne après téléchargement, sans serveur distant.",
  "sources": [
    {
      "title": "SQLite — CREATE TABLE",
      "url": "https://www.sqlite.org/lang_createtable.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — clés étrangères",
      "url": "https://www.sqlite.org/foreignkeys.html",
      "scope": "Référence technique primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Jusqu’ici, nous avons interrogé des tables déjà préparées. CREATE TABLE définit maintenant une nouvelle structure : son nom, ses colonnes et les règles qui s’appliqueront aux écritures. Les exemples de ce chapitre utilisent la base vierge, sans aucune table au départ. Une création réussie ne contient encore aucune ligne. Les instructions se terminent par un point-virgule ; une liste de définitions est placée entre parenthèses, avec une virgule entre les colonnes.

Pour notre médiathèque fictive, id INTEGER PRIMARY KEY donne un identifiant entier à chaque livre. Dans SQLite, cette forme précise de clé primaire a un rôle particulier ; elle n’est pas une promesse générale applicable à tous les moteurs SQL. titre TEXT NOT NULL exige une valeur présente. NOT NULL refuse l’absence de valeur, mais ne refuse pas à lui seul un texte vide : cette autre règle demanderait une condition explicite. Les noms INTEGER et TEXT expriment ici les types déclarés et les préférences de conversion de SQLite. Ils ne constituent pas, à eux seuls, une validation stricte de toutes les valeurs possibles.

CHECK(stock >= 0) impose une condition sur une quantité. Attention : dans SQLite, une condition CHECK évaluée à NULL ne refuse pas la ligne. Pour une quantité obligatoire, combine donc CHECK et NOT NULL. DEFAULT 0 fournit zéro lorsque la colonne est omise lors d’un ajout ; ce n’est ni une règle d’arrondi ni une manière de remplacer toute valeur NULL explicite. Nous pratiquerons les ajouts au prochain chapitre, mais ces distinctions expliquent déjà le rôle de chaque contrainte.

UNIQUE interdit la répétition d’un code non nul. Plusieurs NULL peuvent toutefois être admis par une contrainte UNIQUE de SQLite ; une colonne de code obligatoire combine UNIQUE et NOT NULL. Une clé étrangère s’écrit avec REFERENCES et relie la colonne à une clé existante d’une autre table. Le moteur de l’atelier active réellement ces vérifications. L’exemple avec genres crée d’abord la table référencée, puis livres. Nous n’enseignons pas une suppression en cascade : aucune n’est déclarée ici.

Les exercices vérifient les structures et essaient de vraies écritures de contrôle. Une contrainte écrite uniquement dans un commentaire ne protège rien. Les sondes temporaires cherchent une quantité négative, un code répété, une clé étrangère inexistante et la valeur réellement produite par le défaut. Elles sont annulées après chaque contrôle et ne deviennent pas les données de ton exercice. Ne mémorise pas seulement la déclaration : explique quelle erreur chaque règle empêche et ce qu’elle n’empêche pas. À chaque nouvel essai, la base repart vierge ; seul ton script reste enregistré dans Nunya.

## Exemple guidé 1

```sql
-- Structure sans lignes initiales.
CREATE TABLE livres(id INTEGER PRIMARY KEY, titre TEXT NOT NULL, stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0));
```

## Exemple guidé 2

```sql
-- Deux structures reliées, sans écriture de données.
CREATE TABLE genres(id INTEGER PRIMARY KEY, nom TEXT NOT NULL UNIQUE);
CREATE TABLE livres(id INTEGER PRIMARY KEY, titre TEXT NOT NULL, genre_id INTEGER NOT NULL REFERENCES genres(id));
```

