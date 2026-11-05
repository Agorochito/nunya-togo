---
{
  "id": "sql-m3-03",
  "title_fr": "Filtrer les groupes avec HAVING",
  "course": "sql-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "sql-m3-02"
  ],
  "outcomes": [
    "Séparer filtre de lignes et filtre de groupes.",
    "Choisir un agrégat conforme à l’unité du seuil."
  ],
  "idea_fr": "WHERE sélectionne les lignes qui entrent dans les groupes ; HAVING sélectionne les groupes selon leur bilan.",
  "analogy_fr": "Tu peux écarter des fiches avant de faire les piles, puis écarter certaines piles après leur comptage.",
  "examples": [
    {
      "fixture": "club",
      "expected_output": "Une ligne : Lomé, nombre=2.",
      "trace_fr": [
        "Chaque ville produit d’abord un bilan de membres.",
        "Les groupes à un seul membre sont exclus par HAVING.",
        "Le groupe de Lomé satisfait la borne incluse de deux.",
        "Le tri est annoncé même si club ne conserve ici qu’un groupe."
      ],
      "expected_result": {
        "columns": [
          "ville",
          "nombre"
        ],
        "values": [
          [
            "Lomé",
            2
          ]
        ]
      }
    },
    {
      "fixture": "club",
      "expected_output": "Deux lignes : attente→2 puis confirmee→2.",
      "trace_fr": [
        "WHERE garde seulement les inscriptions aux ateliers 1 ou 3.",
        "Les lignes restantes forment les deux groupes de statut.",
        "Chacun atteint le seuil de deux inscriptions.",
        "Le tri par statut départage les effectifs égaux."
      ],
      "expected_result": {
        "columns": [
          "statut",
          "nombre"
        ],
        "values": [
          [
            "attente",
            2
          ],
          [
            "confirmee",
            2
          ]
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre COUNT dans WHERE",
      "why_fr": "Le filtre est placé avant le calcul du groupe.",
      "fix_fr": "Utilise HAVING pour cette mesure."
    },
    {
      "error": "Tester COUNT pour une règle de somme",
      "why_fr": "Le nombre d’ateliers est confondu avec les places.",
      "fix_fr": "Nomme l’unité du seuil et choisis le bon agrégat."
    }
  ],
  "quiz": [
    {
      "question": "Où filtrer un nombre de lignes calculé par groupe ?",
      "options": [
        "Dans une comparaison WHERE COUNT(*) sans regroupement.",
        "Dans HAVING après le regroupement logique.",
        "Dans le nom de la table."
      ],
      "answer": 1,
      "explanation": "Le compte dépend du groupe ; WHERE intervient sur les lignes avant ce calcul.",
      "id": "sql-m3-03-q1"
    },
    {
      "question": "Que faut-il vérifier avant de déplacer une condition ?",
      "options": [
        "Seulement la longueur du code.",
        "Si le résultat actuel contient un accent.",
        "Si elle concerne une ligne ou un bilan de groupe."
      ],
      "answer": 2,
      "explanation": "Déplacer une condition peut changer les lignes qui participent au calcul.",
      "id": "sql-m3-03-q2"
    },
    {
      "question": "Pourquoi éviter une colonne individuelle non groupée ?",
      "options": [
        "Elle peut ne pas représenter clairement le groupe annoncé.",
        "Tous les moteurs refusent toujours cette syntaxe.",
        "Elle transforme automatiquement le texte en nombre."
      ],
      "answer": 0,
      "explanation": "SQLite tolère certains cas, mais le cours exige une relation explicite entre clé et mesures.",
      "id": "sql-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "HAVING",
      "definition": "Clause qui filtre les groupes selon les conditions du bilan."
    },
    {
      "term": "colonne nue",
      "definition": "Colonne affichée hors agrégat sans appartenir aux clés du groupe."
    },
    {
      "term": "seuil",
      "definition": "Valeur limite utilisée pour conserver ou exclure un résultat."
    }
  ],
  "recap_fr": [
    "Séparer filtre de lignes et filtre de groupes.",
    "Choisir un agrégat conforme à l’unité du seuil.",
    "Éviter les colonnes ambiguës dans un bilan."
  ],
  "tags": [
    "HAVING",
    "colonne nue",
    "seuil"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "sql",
  "runtime": "sql",
  "environment_fr": "SQL réel dans SQLite/sql.js, auto-hébergé dans un Worker du navigateur, sans connexion distante. Données fictives. Chaque exemple, essai et test reconstruit sa base initiale ; le code et la progression peuvent être sauvegardés, pas les modifications de la base temporaire. Disponible hors ligne après téléchargement.",
  "sources": [
    {
      "title": "SQLite — SELECT et traitement des résultats",
      "url": "https://www.sqlite.org/lang_select.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    },
    {
      "title": "SQLite — Fonctions d’agrégation",
      "url": "https://www.sqlite.org/lang_aggfunc.html",
      "scope": "Documentation primaire vérifiée ; explications, requêtes et exercices originaux Nunya.",
      "last_checked": "2026-11-05"
    }
  ]
}
---

## Explication pas à pas

Le club veut montrer seulement les villes comptant au moins deux membres. Le nombre recherché n’existe pas comme valeur dans une fiche individuelle : il doit être calculé sur le groupe. HAVING permet de filtrer les groupes selon ce résultat. Il complète WHERE au lieu de le remplacer. Écrire la question en deux étapes aide à décider où placer chaque règle : qui participe au calcul, puis quels bilans sont conservés ?

Pour compter les membres d’au moins seize ans par ville, WHERE age>=16 écarte d’abord les plus jeunes. GROUP BY ville réunit ensuite les fiches retenues. HAVING COUNT(*)>=2 garde enfin les groupes possédant au moins deux fiches dans cette sélection. Le comptage ne porte donc pas sur tous les membres de la ville. Déplacer le filtre d’âge ou le supprimer change le sens du bilan, même si un petit jeu de données donne parfois le même résultat.

HAVING peut utiliser COUNT, SUM ou AVG selon la mesure demandée. Le seuil doit représenter la même unité que cette mesure : un total de places ne se teste pas en comptant les ateliers. Pour un seuil « au moins », l’égalité est incluse. Des cas proches de la borne sont utiles pour vérifier la comparaison. Les alias rendent les sorties lisibles, mais nous écrivons ici les agrégats dans HAVING pour garder le calcul concerné visible.

Respecte aussi la cohérence de SELECT : affiche les clés de groupe et les mesures agrégées. SQLite tolère certaines colonnes dites nues, absentes du GROUP BY et des agrégats, avec des règles particulières. Elles peuvent donner un nom individuel qui ne représente pas clairement le groupe. Pour ce cours, n’utilise pas cette possibilité. Un résultat accepté par le moteur n’est pas automatiquement une bonne réponse à une question de bilan.

Après HAVING, ORDER BY fixe la présentation des groupes restants. Ajoute un second critère lorsque les mesures sont égales. Une table vide ne produit aucun groupe, et un seuil peut aussi écarter tous les groupes d’une table remplie : ces deux résultats vides sont possibles. Chaque essai repart de sa base initiale. Les tests changent les données pour distinguer une règle correcte d’un nombre appris par cœur. Avant d’exécuter, décris une ligne retenue, le groupe auquel elle contribue, le calcul obtenu et la raison de conservation ou d’exclusion de ce groupe.

## Exemple guidé 1

```sql
SELECT ville, COUNT(*) AS nombre
FROM membres
GROUP BY ville
HAVING COUNT(*) >= 2
ORDER BY nombre DESC, ville ASC;
```

## Exemple guidé 2

```sql
SELECT statut, COUNT(*) AS nombre
FROM inscriptions
WHERE atelier_id IN (1,3)
GROUP BY statut
HAVING COUNT(*) >= 2
ORDER BY nombre DESC, statut ASC;
```

