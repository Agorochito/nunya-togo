---
{
  "id": "sql-m1-01",
  "title_fr": "Lire des tables, des lignes et des colonnes",
  "course": "sql-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Distinguer table, ligne et colonne.",
    "Lire toutes les colonnes avec SELECT *."
  ],
  "idea_fr": "SELECT lit des données d’une table ; le résultat possède des lignes et des colonnes.",
  "analogy_fr": "Le registre d’un club rassemble plusieurs fiches dont chaque rubrique garde le même sens.",
  "common_mistakes": [
    {
      "error": "Rubriques confondues avec fiches",
      "why_fr": "Colonnes et lignes sont mélangées.",
      "fix_fr": "Repère une personne puis ses propriétés."
    },
    {
      "error": "Nom approximatif",
      "why_fr": "La table demandée n’existe pas sous ce nom.",
      "fix_fr": "Vérifie le schéma."
    },
    {
      "error": "Ordre supposé garanti",
      "why_fr": "Un ordre observé sans tri est tenu pour permanent.",
      "fix_fr": "Conserve ORDER BY id dans ces lectures."
    }
  ],
  "quiz": [
    {
      "question": "Que représente une ligne de membres ?",
      "options": [
        "Le nombre de colonnes.",
        "Toute la base forcément.",
        "Une fiche de personne fictive."
      ],
      "answer": 2,
      "explanation": "Chaque ligne réunit les valeurs décrivant une fiche.",
      "id": "sql-m1-01-q1"
    },
    {
      "question": "Quel rôle joue FROM ?",
      "options": [
        "Désigner la table lue.",
        "Créer la table manquante.",
        "Supprimer les lignes affichées."
      ],
      "answer": 0,
      "explanation": "Le nom choisi doit correspondre à une source existante.",
      "id": "sql-m1-01-q2"
    },
    {
      "question": "Que doit produire la lecture d’une table vide ?",
      "options": [
        "Des lignes inventées.",
        "Les colonnes demandées et zéro ligne.",
        "Une connexion distante."
      ],
      "answer": 1,
      "explanation": "Le schéma existe même en l’absence de données.",
      "id": "sql-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "table",
      "definition": "Lignes décrites par les mêmes colonnes."
    },
    {
      "term": "ligne",
      "definition": "Enregistrement représentant ici une fiche."
    },
    {
      "term": "colonne",
      "definition": "Rubrique de valeurs du même rôle."
    },
    {
      "term": "fixture",
      "definition": "Schéma et données de départ reconstruits pour un essai."
    }
  ],
  "recap_fr": [
    "Distinguer table, ligne et colonne.",
    "Lire toutes les colonnes avec SELECT *.",
    "Vérifier la fixture et la remise à zéro."
  ],
  "tags": [
    "table",
    "ligne",
    "colonne",
    "fixture"
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
        "FROM désigne membres de la fixture club.",
        "L’étoile demande ses quatre colonnes dans leur ordre de définition.",
        "Le tri par id présente cinq lignes ; la ville de Mina est NULL."
      ],
      "expected_output": "Colonnes : id | nom | ville | age\n1 | Afi | Lomé | 16\n2 | Kossi | Kara | 19\n3 | Mina | NULL | 17\n4 | Lina | Lomé | 22\n5 | Yao | Sokodé | 15"
    },
    {
      "fixture": "club",
      "trace_fr": [
        "La source est ateliers.",
        "Ses colonnes décrivent id, titre, places et prix fictif.",
        "Quatre lignes sont lues ; zéro place et prix zéro restent des valeurs présentes."
      ],
      "expected_output": "Colonnes : id | titre | places | prix\n1 | Python | 4 | 1000\n2 | Jardin | 0 | 500\n3 | Web | 2 | 1500\n4 | Dessin | 5 | 0"
    }
  ]
}
---

## Explication pas à pas

Une base de données organise des informations pour permettre des recherches et des mises à jour. Une table rassemble des lignes décrites par les mêmes colonnes. Dans la table membres de notre club fictif, une ligne correspond à une personne inventée. Les colonnes id, nom, ville et age décrivent cette ligne. Le nombre de colonnes n’est donc pas le nombre de personnes.

Le laboratoire utilise un vrai moteur SQLite, exécuté localement dans le navigateur grâce à sql.js. Tu écris du SQL, pas du JavaScript et pas des commandes de terminal. Aucun serveur extérieur n’est contacté. Chaque essai et chaque test reconstruit sa base de départ. Le script et la progression peuvent être sauvegardés, mais les modifications de cette base temporaire ne sont pas conservées entre deux essais.

La fixture club contient trois tables. membres décrit les personnes fictives ; ateliers décrit des activités avec leurs places et leur prix fictif ; inscriptions contient des références aux personnes et activités ainsi qu’un statut. Nous lirons d’abord ces tables séparément. Il n’est pas nécessaire de comprendre déjà comment les relier pour observer leurs colonnes. Le mot fixture désigne le jeu de départ choisi par l’atelier.

Une instruction SELECT demande un résultat de lecture. SELECT * FROM membres signifie ici : lire toutes les colonnes des lignes de membres. L’étoile remplace la liste complète des colonnes ; FROM indique la table. Le point-virgule termine l’instruction. Les noms doivent correspondre au schéma fourni. Une faute comme inscription ne crée pas une autre table et ne désigne pas automatiquement inscriptions.

Pour rendre les résultats comparables, nos premiers exemples ajoutent ORDER BY id. Cette clause demande un ordre croissant selon l’identifiant. Nous la développons dans la troisième leçon du module ; retiens déjà qu’un ordre n’est pas garanti sans demande explicite. Dans ces tables, id distingue chaque ligne et sert de repère stable. Ce n’est pas le numéro changeant d’une ligne après tri.

Un résultat possède des colonnes même lorsque la table ne contient aucune ligne. La fixture vide garde le même schéma mais aucun membre, atelier ou inscription. Une lecture correcte doit alors renvoyer un tableau vide, pas une liste mémorisée. Les tests variation changent aussi les données : le script doit lire la table réelle au lieu de recopier le premier exemple.

Une lecture SELECT ne modifie pas les tables. Plusieurs SELECT terminés par un point-virgule peuvent produire plusieurs tableaux successifs. Dans une activité qui les demande, leur ordre et leurs colonnes comptent. Une ville non renseignée peut apparaître avec la valeur NULL ; nous apprendrons plus tard à la rechercher correctement. Pour l’instant, distingue ce contenu d’une ligne absente et vérifie la table, ses colonnes et son ordre.

## Exemple guidé 1

```sql
-- Chaque essai repart de club.
SELECT * FROM membres ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | nom | ville | age
1 | Afi | Lomé | 16
2 | Kossi | Kara | 19
3 | Mina | NULL | 17
4 | Lina | Lomé | 22
5 | Yao | Sokodé | 15
```

Trace :

- FROM désigne membres de la fixture club.
- L’étoile demande ses quatre colonnes dans leur ordre de définition.
- Le tri par id présente cinq lignes ; la ville de Mina est NULL.

## Exemple guidé 2

```sql
-- Lecture indépendante sans modifier la fixture.
SELECT * FROM ateliers ORDER BY id;
```

Résultat attendu sur club :

```text
Colonnes : id | titre | places | prix
1 | Python | 4 | 1000
2 | Jardin | 0 | 500
3 | Web | 2 | 1500
4 | Dessin | 5 | 0
```

Trace :

- La source est ateliers.
- Ses colonnes décrivent id, titre, places et prix fictif.
- Quatre lignes sont lues ; zéro place et prix zéro restent des valeurs présentes.

