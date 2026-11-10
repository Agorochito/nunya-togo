---
{
  "id": "php-m1-03",
  "title_fr": "Calculer et lire des saisies",
  "course": "php-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "php-m1-02"
  ],
  "outcomes": [
    "Calculer avec + - * / % et intdiv(), en prévoyant le type du résultat.",
    "Lire une saisie avec trim(fgets(STDIN)) et la convertir en nombre avec (int)."
  ],
  "idea_fr": "Un script devient utile quand il calcule à partir de données saisies, après les avoir converties dans le bon type.",
  "analogy_fr": "La caissière reçoit des billets (la saisie), vérifie leur valeur (la conversion), puis rend la monnaie (le calcul).",
  "examples": [
    {
      "code": "<?php\n$mangues = 23;\n$parSac = 5;\necho \"Sacs pleins : \", intdiv($mangues, $parSac), \"\\n\";\necho \"Reste : \", $mangues % $parSac, \"\\n\";\necho \"Moyenne : \", 7 / 2;",
      "expected_output": "Sacs pleins : 4\nReste : 3\nMoyenne : 3.5",
      "inputs": [],
      "trace_fr": [
        "intdiv donne le quotient entier : 4.",
        "Le modulo donne le reste : 23 − 20 = 3.",
        "7 / 2 ne tombe pas juste : le résultat est le décimal 3.5.",
        "echo affiche chaque nombre comme un texte."
      ]
    },
    {
      "code": "<?php\n$prix = (int) trim(fgets(STDIN));\n$quantite = (int) trim(fgets(STDIN));\n$total = $prix * $quantite;\necho \"Total : \" . number_format($total, 0, \",\", \" \") . \" FCFA\";",
      "expected_output": "Total : 12 500 FCFA",
      "inputs": [
        "2500",
        "5"
      ],
      "trace_fr": [
        "La première saisie, 2500, devient l’entier 2500.",
        "La seconde saisie, 5, devient l’entier 5.",
        "Le total vaut 12500.",
        "number_format ajoute l’espace des milliers."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Calculer avec la saisie brute",
      "why_fr": "La saisie est un texte qui contient encore son retour à la ligne.",
      "fix_fr": "Écris (int) trim(fgets(STDIN))."
    },
    {
      "error": "Croire que / donne toujours un entier",
      "why_fr": "7 / 2 vaut 3.5.",
      "fix_fr": "Utilise intdiv() pour un quotient entier."
    },
    {
      "error": "Afficher directement le résultat attendu",
      "why_fr": "Les cas cachés utilisent d’autres saisies.",
      "fix_fr": "Calcule toujours à partir des variables."
    }
  ],
  "quiz": [
    {
      "question": "Combien vaut 17 % 5 ?",
      "options": [
        "3",
        "2",
        "3.4",
        "12"
      ],
      "answer": 1,
      "explanation": "17 = 3 × 5 + 2 : le reste vaut 2.",
      "id": "php-m1-03-q1"
    },
    {
      "question": "Pourquoi écrire trim(fgets(STDIN)) ?",
      "options": [
        "Pour lire une ligne puis retirer le retour à la ligne final.",
        "Pour transformer le texte en nombre.",
        "Pour afficher la saisie.",
        "Pour lire toutes les lignes d’un coup."
      ],
      "answer": 0,
      "explanation": "fgets garde le retour à la ligne ; trim le retire.",
      "id": "php-m1-03-q2"
    },
    {
      "question": "Quel est le type de 9 / 3 ?",
      "options": [
        "float",
        "string",
        "int",
        "bool"
      ],
      "answer": 2,
      "explanation": "La division tombe juste : PHP renvoie l’entier 3.",
      "id": "php-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "opérateur",
      "definition": "Signe qui effectue une opération, comme + ou %."
    },
    {
      "term": "modulo",
      "definition": "Reste de la division entière, calculé avec %."
    },
    {
      "term": "entrée standard",
      "definition": "Canal STDIN par lequel le script reçoit les saisies."
    },
    {
      "term": "conversion",
      "definition": "Changement de type, par exemple avec (int)."
    }
  ],
  "recap_fr": [
    "Calculer avec + - * / % et intdiv(), en prévoyant le type du résultat.",
    "Lire une saisie avec trim(fgets(STDIN)) et la convertir en nombre avec (int).",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "opérateur",
    "modulo",
    "entrée standard",
    "conversion"
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
      "title": "Opérateurs arithmétiques",
      "url": "https://www.php.net/manual/fr/language.operators.arithmetic.php"
    },
    {
      "title": "intdiv",
      "url": "https://www.php.net/manual/fr/function.intdiv.php"
    },
    {
      "title": "fgets",
      "url": "https://www.php.net/manual/fr/function.fgets.php"
    },
    {
      "title": "trim",
      "url": "https://www.php.net/manual/fr/function.trim.php"
    },
    {
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php"
    }
  ],
  "sources": [
    {
      "title": "Opérateurs arithmétiques",
      "url": "https://www.php.net/manual/fr/language.operators.arithmetic.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "intdiv",
      "url": "https://www.php.net/manual/fr/function.intdiv.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "fgets",
      "url": "https://www.php.net/manual/fr/function.fgets.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "trim",
      "url": "https://www.php.net/manual/fr/function.trim.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

PHP calcule avec les opérateurs habituels : + pour l’addition, - pour la soustraction, * pour la multiplication et / pour la division. Les priorités sont celles des mathématiques : la multiplication passe avant l’addition, et les parenthèses changent l’ordre. 2 + 3 * 4 vaut 14, mais (2 + 3) * 4 vaut 20.

La division mérite attention. 10 / 2 donne l’entier 5, mais 7 / 2 donne le décimal 3.5 : le résultat change de type quand la division ne tombe pas juste. Pour obtenir seulement le quotient entier, utilise intdiv(7, 2), qui vaut 3. L’opérateur %, appelé modulo, donne le reste : 7 % 2 vaut 1. Ces deux outils servent souvent ensemble, par exemple pour répartir des objets en paquets : 23 mangues en sacs de 5 donnent intdiv(23, 5) = 4 sacs pleins et 23 % 5 = 3 mangues restantes. Diviser par zéro arrête le script avec une erreur DivisionByZeroError.

Un programme reçoit souvent des données de la personne qui l’utilise. Dans PHP lancé en ligne de commande, comme ici, chaque saisie se lit sur l’entrée standard, nommée STDIN. fgets(STDIN) lit une ligne entière, y compris le retour à la ligne final. trim retire ces espaces et retours à la ligne aux deux extrémités. La formule complète, trim(fgets(STDIN)), revient dans tous les exercices de saisie. Chaque appel lit la ligne suivante : deux appels lisent deux réponses. Dans l’atelier, tu écris ces réponses à l’avance, une par ligne, dans la zone « Saisies du programme ».

Une saisie est toujours un texte, même quand la personne tape des chiffres. Pour calculer, convertis-la : (int) transforme le texte en entier, (float) en décimal. PHP sait parfois convertir seul, mais compter sur cette conversion automatique cache des erreurs ; une conversion explicite rend ton intention claire et le type certain.

Pour afficher un montant lisible, number_format formate un nombre : number_format(12500, 0, ",", " ") affiche 12 500, avec un espace entre les milliers, comme on l’écrit en français. Le deuxième argument fixe le nombre de décimales ; les deux derniers choisissent le séparateur décimal et celui des milliers.

Un calcul se vérifie toujours avec plusieurs données. Les exercices de ce chapitre utilisent des cas cachés avec d’autres saisies : un programme qui affiche directement le résultat du premier cas, sans calculer, échoue aussitôt. Avant de lancer, calcule de tête le résultat attendu pour une saisie simple, puis compare-le à l’affichage.

## Exemple guidé 1

```php
<?php
$mangues = 23;
$parSac = 5;
echo "Sacs pleins : ", intdiv($mangues, $parSac), "\n";
echo "Reste : ", $mangues % $parSac, "\n";
echo "Moyenne : ", 7 / 2;
```

Affichage attendu :

    Sacs pleins : 4
    Reste : 3
    Moyenne : 3.5

Trace :

- intdiv donne le quotient entier : 4.
- Le modulo donne le reste : 23 − 20 = 3.
- 7 / 2 ne tombe pas juste : le résultat est le décimal 3.5.
- echo affiche chaque nombre comme un texte.

## Exemple guidé 2

```php
<?php
$prix = (int) trim(fgets(STDIN));
$quantite = (int) trim(fgets(STDIN));
$total = $prix * $quantite;
echo "Total : " . number_format($total, 0, ",", " ") . " FCFA";
```

Saisies de l’exemple : 2500 · 5

Affichage attendu :

    Total : 12 500 FCFA

Trace :

- La première saisie, 2500, devient l’entier 2500.
- La seconde saisie, 5, devient l’entier 5.
- Le total vaut 12500.
- number_format ajoute l’espace des milliers.

## Vérifier et expliquer

Essaie chaque exercice avec plusieurs saisies dans la zone dédiée, dont 0 et un grand nombre. Calcule d’abord le résultat de tête.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
- [intdiv](https://www.php.net/manual/fr/function.intdiv.php)
- [fgets](https://www.php.net/manual/fr/function.fgets.php)
- [trim](https://www.php.net/manual/fr/function.trim.php)
- [number_format](https://www.php.net/manual/fr/function.number-format.php)
