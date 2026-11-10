---
{
  "id": "php-m2-01",
  "title_fr": "Prendre des décisions avec if",
  "course": "php-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "php-m1-03"
  ],
  "outcomes": [
    "Écrire if, elseif et else avec des comparaisons strictes === et !==.",
    "Combiner des conditions avec && et || et tester les cas limites."
  ],
  "idea_fr": "Une condition choisit quel bloc exécuter ; seul le premier bloc dont la condition est vraie s’exécute.",
  "analogy_fr": "Au poste de péage, l’agent regarde le véhicule : moto, voiture ou camion. Il applique un seul tarif, le premier qui correspond.",
  "examples": [
    {
      "code": "<?php\n$note = (int) trim(fgets(STDIN));\nif ($note >= 16) {\n    echo \"Très bien\";\n} elseif ($note >= 10) {\n    echo \"Admis\";\n} else {\n    echo \"À reprendre\";\n}",
      "expected_output": "Très bien",
      "inputs": [
        "17"
      ],
      "trace_fr": [
        "La saisie 17 devient l’entier 17.",
        "17 >= 16 est vrai : le premier bloc s’exécute.",
        "Les blocs elseif et else sont ignorés.",
        "Une seule mention est affichée."
      ]
    },
    {
      "code": "<?php\n$age = (int) trim(fgets(STDIN));\n$membre = trim(fgets(STDIN)) === \"oui\";\nif ($age >= 13 && $age <= 17 && $membre) {\n    echo \"Tarif jeune membre : 500 FCFA\";\n} else {\n    echo \"Tarif normal : 1000 FCFA\";\n}",
      "expected_output": "Tarif jeune membre : 500 FCFA",
      "inputs": [
        "15",
        "oui"
      ],
      "trace_fr": [
        "L’âge 15 se trouve dans l’intervalle 13 à 17.",
        "La comparaison stricte avec \"oui\" donne true.",
        "Les trois conditions reliées par && sont vraies.",
        "Le tarif jeune membre s’affiche."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire = au lieu de === dans une condition",
      "why_fr": "Un seul = affecte une valeur au lieu de comparer.",
      "fix_fr": "Utilise === pour tester une égalité."
    },
    {
      "error": "Tester la condition la plus large en premier",
      "why_fr": "Le premier bloc vrai cache les suivants.",
      "fix_fr": "Classe les conditions de la plus restrictive à la plus large."
    },
    {
      "error": "Confondre > et >= à la borne",
      "why_fr": "La valeur exacte de la borne est mal classée.",
      "fix_fr": "Relis la consigne : « à partir de » correspond à >=."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut \"5\" === 5 ?",
      "options": [
        "true",
        "false",
        "5",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "=== exige le même type : un texte n’est pas un entier.",
      "id": "php-m2-01-q1"
    },
    {
      "question": "Avec $n = 12, quel bloc s’exécute ? if ($n > 5) {A} elseif ($n > 10) {B} else {C}",
      "options": [
        "A",
        "B",
        "A puis B",
        "C"
      ],
      "answer": 0,
      "explanation": "Le premier bloc vrai est retenu ; les suivants sont ignorés.",
      "id": "php-m2-01-q2"
    },
    {
      "question": "Quelle condition accepte les âges de 13 à 17 inclus ?",
      "options": [
        "$a > 13 && $a < 17",
        "$a >= 13 || $a <= 17",
        "$a >= 13 && $a <= 17",
        "$a === 13 && $a === 17"
      ],
      "answer": 2,
      "explanation": "&& exige les deux bornes, et >= / <= incluent 13 et 17.",
      "id": "php-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "condition",
      "definition": "Expression vraie ou fausse qui décide si un bloc s’exécute."
    },
    {
      "term": "comparaison stricte",
      "definition": "Test === ou !== qui compare la valeur et le type."
    },
    {
      "term": "opérateur logique",
      "definition": "Opérateur && (et), || (ou) ou ! (non) qui combine des conditions."
    },
    {
      "term": "cas limite",
      "definition": "Valeur située exactement sur une borne de condition."
    }
  ],
  "recap_fr": [
    "Écrire if, elseif et else avec des comparaisons strictes === et !==.",
    "Combiner des conditions avec && et || et tester les cas limites.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "condition",
    "comparaison stricte",
    "opérateur logique",
    "cas limite"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "php",
  "runtime": "php",
  "level": "debutant",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "PHP 8.3 réel, exécuté sur cet appareil dans un Worker isolé, comme en ligne de commande. Chaque saisie se lit avec trim(fgets(STDIN)). Pas de serveur web, de réseau, de fichiers conservés ni de base de données dans ce cours. Les données sont fictives.",
  "references": [
    {
      "title": "if",
      "url": "https://www.php.net/manual/fr/control-structures.if.php"
    },
    {
      "title": "elseif",
      "url": "https://www.php.net/manual/fr/control-structures.elseif.php"
    },
    {
      "title": "Opérateurs de comparaison",
      "url": "https://www.php.net/manual/fr/language.operators.comparison.php"
    },
    {
      "title": "Opérateurs logiques",
      "url": "https://www.php.net/manual/fr/language.operators.logical.php"
    }
  ],
  "sources": [
    {
      "title": "if",
      "url": "https://www.php.net/manual/fr/control-structures.if.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "elseif",
      "url": "https://www.php.net/manual/fr/control-structures.elseif.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Opérateurs de comparaison",
      "url": "https://www.php.net/manual/fr/language.operators.comparison.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Opérateurs logiques",
      "url": "https://www.php.net/manual/fr/language.operators.logical.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Jusqu’ici, toutes les instructions s’exécutaient l’une après l’autre. Une condition permet au programme de choisir. if (condition) { … } exécute le bloc entre accolades seulement si la condition est vraie. Le mot else ajoute un bloc exécuté dans le cas contraire. Entre les deux, elseif teste une autre condition. PHP lit les conditions de haut en bas et exécute uniquement le premier bloc dont la condition est vraie ; les suivants sont ignorés, même s’ils seraient vrais aussi.

Les comparaisons produisent un booléen. < et > comparent strictement, <= et >= incluent l’égalité. Pour tester l’égalité, PHP propose deux opérateurs. == compare les valeurs après une conversion automatique : "5" == 5 est vrai. === exige en plus le même type : "5" === 5 est faux. Préfère === et son contraire !== : ils évitent des surprises liées aux conversions. N’écris jamais un seul = dans une condition : c’est une affectation, qui change la variable au lieu de la comparer.

L’ordre des conditions compte. Pour attribuer une mention selon une note, teste d’abord la plus exigeante : si la note vaut 17, la condition $note >= 16 doit passer avant $note >= 10, sinon la mention « Passable » serait retenue. Relis toujours ta suite de elseif en partant de la valeur la plus haute ou la plus restrictive.

Plusieurs conditions se combinent. && signifie « et » : les deux côtés doivent être vrais. || signifie « ou » : un seul côté suffit. ! inverse une condition. Les parenthèses clarifient les combinaisons : ($age >= 13 && $age <= 17) décrit un intervalle. Un même test peut souvent s’écrire de plusieurs façons ; choisis celle qui se lit le mieux à voix haute.

Les erreurs de condition se cachent dans les cas limites. Si la consigne dit « à partir de 10 », la valeur 10 elle-même doit être acceptée : il faut >=, pas >. Les exercices de ce chapitre testent systématiquement ces bornes avec des cas cachés. Pour chaque condition que tu écris, imagine trois saisies : une en dessous de la borne, la borne exacte et une au-dessus.

Les accolades délimitent les blocs. PHP accepte de les omettre pour une seule instruction, mais cette écriture favorise les erreurs quand on ajoute une ligne plus tard. Écris-les toujours, et décale le contenu des blocs de quatre espaces : l’indentation ne change pas l’exécution en PHP, contrairement à Python, mais elle rend la structure visible.

Une condition peut aussi protéger un calcul. Avant de diviser, vérifie que le diviseur n’est pas nul ; avant d’appliquer une réduction, vérifie que la quantité est positive. Ces vérifications transforment une erreur fatale en message compréhensible pour la personne qui utilise le programme.

## Exemple guidé 1

```php
<?php
$note = (int) trim(fgets(STDIN));
if ($note >= 16) {
    echo "Très bien";
} elseif ($note >= 10) {
    echo "Admis";
} else {
    echo "À reprendre";
}
```

Saisies de l’exemple : 17

Affichage attendu :

    Très bien

Trace :

- La saisie 17 devient l’entier 17.
- 17 >= 16 est vrai : le premier bloc s’exécute.
- Les blocs elseif et else sont ignorés.
- Une seule mention est affichée.

## Exemple guidé 2

```php
<?php
$age = (int) trim(fgets(STDIN));
$membre = trim(fgets(STDIN)) === "oui";
if ($age >= 13 && $age <= 17 && $membre) {
    echo "Tarif jeune membre : 500 FCFA";
} else {
    echo "Tarif normal : 1000 FCFA";
}
```

Saisies de l’exemple : 15 · oui

Affichage attendu :

    Tarif jeune membre : 500 FCFA

Trace :

- L’âge 15 se trouve dans l’intervalle 13 à 17.
- La comparaison stricte avec "oui" donne true.
- Les trois conditions reliées par && sont vraies.
- Le tarif jeune membre s’affiche.

## Vérifier et expliquer

Pour chaque condition, essaie une saisie juste en dessous de la borne, la borne exacte et une saisie au-dessus.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [if](https://www.php.net/manual/fr/control-structures.if.php)
- [elseif](https://www.php.net/manual/fr/control-structures.elseif.php)
- [Opérateurs de comparaison](https://www.php.net/manual/fr/language.operators.comparison.php)
- [Opérateurs logiques](https://www.php.net/manual/fr/language.operators.logical.php)
