---
{
  "id": "php-m3-03",
  "title_fr": "Transformer des tableaux avec les fonctions natives",
  "course": "php-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "php-m3-02"
  ],
  "outcomes": [
    "Utiliser array_sum, max, min, in_array et round pour résumer un tableau.",
    "Passer d’un texte à un tableau avec explode et d’un tableau à un texte avec implode."
  ],
  "idea_fr": "PHP fournit des fonctions prêtes pour les traitements courants ; les connaître évite d’écrire des boucles inutiles.",
  "analogy_fr": "Plutôt que de compter chaque grain à la main, le commerçant pose le sac sur la balance : l’outil adapté donne le résultat directement.",
  "examples": [
    {
      "code": "<?php\n$notes = [12, 15, 9, 17];\n$moyenne = array_sum($notes) / count($notes);\necho \"Moyenne : \", round($moyenne, 1), \"\\n\";\necho \"Meilleure : \", max($notes), \" · Plus basse : \", min($notes), \"\\n\";\necho in_array(17, $notes, true) ? \"Un 17 existe\" : \"Aucun 17\";",
      "expected_output": "Moyenne : 13.3\nMeilleure : 17 · Plus basse : 9\nUn 17 existe",
      "inputs": [],
      "trace_fr": [
        "array_sum vaut 53 et count vaut 4.",
        "La moyenne 13.25 est arrondie à une décimale : 13.3.",
        "max et min donnent 17 et 9.",
        "in_array trouve 17 avec une comparaison stricte."
      ]
    },
    {
      "code": "<?php\n$ligne = trim(fgets(STDIN));\n$produits = explode(\",\", $ligne);\n$produits[] = \"fonio\";\necho count($produits), \" produits : \", implode(\", \", $produits), \"\\n\";\n$prix = array_map(\"intval\", explode(\" \", \"600 400 350\"));\necho \"Somme des prix : \", array_sum($prix);",
      "expected_output": "4 produits : riz, mil, maïs, fonio\nSomme des prix : 1350",
      "inputs": [
        "riz,mil,maïs"
      ],
      "trace_fr": [
        "explode découpe la saisie aux virgules.",
        "fonio est ajouté à la fin du tableau.",
        "implode assemble la liste avec une virgule et un espace.",
        "array_map convertit les trois prix en entiers avant la somme."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Diviser par count d’un tableau vide",
      "why_fr": "count vaut 0 : la division provoque une erreur.",
      "fix_fr": "Vérifie count($t) > 0 avant de calculer une moyenne."
    },
    {
      "error": "Calculer avec les morceaux de explode",
      "why_fr": "Ce sont des textes, pas des nombres.",
      "fix_fr": "Convertis-les avec array_map(\"intval\", …)."
    },
    {
      "error": "Inverser les arguments de in_array",
      "why_fr": "La valeur cherchée vient avant le tableau.",
      "fix_fr": "Écris in_array($valeur, $tableau, true)."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie explode(\"-\", \"a-b-c\") ?",
      "options": [
        "\"abc\"",
        "[\"a\", \"b\", \"c\"]",
        "[\"a-b-c\"]",
        "3"
      ],
      "answer": 1,
      "explanation": "explode découpe le texte à chaque séparateur.",
      "id": "php-m3-03-q1"
    },
    {
      "question": "Qu’affiche echo implode(\" / \", [1, 2, 3]); ?",
      "options": [
        "1 / 2 / 3",
        "1 / 2 / 3 /",
        "123",
        "[1, 2, 3]"
      ],
      "answer": 0,
      "explanation": "implode place le séparateur seulement entre les éléments.",
      "id": "php-m3-03-q2"
    },
    {
      "question": "Que renvoie in_array(\"5\", [5], true) ?",
      "options": [
        "true",
        "5",
        "false",
        "Une erreur"
      ],
      "answer": 2,
      "explanation": "Avec true, la comparaison est stricte : un texte n’est pas un entier.",
      "id": "php-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction native",
      "definition": "Fonction fournie par PHP, comme array_sum ou implode."
    },
    {
      "term": "explode",
      "definition": "Fonction qui découpe un texte en tableau selon un séparateur."
    },
    {
      "term": "implode",
      "definition": "Fonction qui assemble un tableau en texte avec un séparateur."
    },
    {
      "term": "arrondi",
      "definition": "Valeur raccourcie à un nombre de décimales avec round."
    }
  ],
  "recap_fr": [
    "Utiliser array_sum, max, min, in_array et round pour résumer un tableau.",
    "Passer d’un texte à un tableau avec explode et d’un tableau à un texte avec implode.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "fonction native",
    "explode",
    "implode",
    "arrondi"
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
      "title": "array_sum",
      "url": "https://www.php.net/manual/fr/function.array-sum.php"
    },
    {
      "title": "max",
      "url": "https://www.php.net/manual/fr/function.max.php"
    },
    {
      "title": "in_array",
      "url": "https://www.php.net/manual/fr/function.in-array.php"
    },
    {
      "title": "explode",
      "url": "https://www.php.net/manual/fr/function.explode.php"
    },
    {
      "title": "implode",
      "url": "https://www.php.net/manual/fr/function.implode.php"
    },
    {
      "title": "array_map",
      "url": "https://www.php.net/manual/fr/function.array-map.php"
    },
    {
      "title": "round",
      "url": "https://www.php.net/manual/fr/function.round.php"
    }
  ],
  "sources": [
    {
      "title": "array_sum",
      "url": "https://www.php.net/manual/fr/function.array-sum.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "max",
      "url": "https://www.php.net/manual/fr/function.max.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "in_array",
      "url": "https://www.php.net/manual/fr/function.in-array.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "explode",
      "url": "https://www.php.net/manual/fr/function.explode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "implode",
      "url": "https://www.php.net/manual/fr/function.implode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "array_map",
      "url": "https://www.php.net/manual/fr/function.array-map.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "round",
      "url": "https://www.php.net/manual/fr/function.round.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Au chapitre précédent, tu as écrit des boucles pour additionner, compter et trouver un maximum. Ces exercices étaient utiles pour comprendre le principe. Dans un vrai programme, PHP propose des fonctions natives qui font ces traitements en une ligne, sans risque d’oublier d’initialiser un accumulateur.

array_sum renvoie la somme des valeurs d’un tableau. max et min renvoient la plus grande et la plus petite valeur. count, déjà connue, donne le nombre d’éléments. Une moyenne s’écrit donc array_sum($notes) / count($notes). Attention au tableau vide : count vaut alors 0 et la division provoque une erreur. Vérifie d’abord que le tableau contient au moins une valeur. Appelée sur un tableau vide, max provoque elle aussi une erreur.

Une moyenne donne souvent un décimal long, comme 13.333333333333. round arrondit : round(13.3333, 1) vaut 13.3. Le second argument indique le nombre de décimales à garder. Pour l’affichage d’un montant, number_format reste préférable, car il gère aussi les séparateurs.

in_array vérifie si une valeur se trouve dans un tableau : in_array("Kara", $villes) renvoie true ou false. Par défaut, la comparaison est souple, comme ==. Ajoute true en troisième argument pour une comparaison stricte, comme === : in_array("5", [5], true) renvoie false. Cette version stricte évite les surprises avec les saisies, toujours lues sous forme de texte.

Deux fonctions font le lien entre textes et tableaux. explode découpe un texte selon un séparateur : explode(",", "riz,mil,maïs") renvoie ["riz", "mil", "maïs"]. C’est la manière la plus simple de lire plusieurs valeurs écrites sur une seule ligne de saisie. Les morceaux obtenus sont des textes : pour calculer, convertis chacun en nombre. array_map applique une fonction à chaque élément et renvoie un nouveau tableau ; array_map("intval", $morceaux) convertit tous les morceaux en entiers d’un coup.

implode fait l’inverse : elle assemble les éléments d’un tableau en un seul texte, avec un séparateur choisi. implode(", ", $fruits) produit mangue, papaye, ananas. C’est le moyen le plus simple d’afficher une liste sur une ligne, sans virgule en trop après le dernier élément, ce qu’une boucle avec echo rend délicat.

Retenir le nom exact et l’ordre des arguments de chaque fonction n’est pas nécessaire. Le manuel PHP, disponible en français, décrit chacune avec ses paramètres et des exemples. Prends l’habitude de le consulter : c’est ce que font les développeurs expérimentés, chaque jour. Remarque aussi que certaines fonctions sont un peu irrégulières : explode reçoit le séparateur en premier, comme implode, mais in_array reçoit la valeur cherchée avant le tableau.

Choisir entre une fonction native et une boucle reste une décision. Les fonctions conviennent aux traitements standards ; une boucle s’impose quand le traitement combine plusieurs conditions particulières.

## Exemple guidé 1

```php
<?php
$notes = [12, 15, 9, 17];
$moyenne = array_sum($notes) / count($notes);
echo "Moyenne : ", round($moyenne, 1), "\n";
echo "Meilleure : ", max($notes), " · Plus basse : ", min($notes), "\n";
echo in_array(17, $notes, true) ? "Un 17 existe" : "Aucun 17";
```

Affichage attendu :

    Moyenne : 13.3
    Meilleure : 17 · Plus basse : 9
    Un 17 existe

Trace :

- array_sum vaut 53 et count vaut 4.
- La moyenne 13.25 est arrondie à une décimale : 13.3.
- max et min donnent 17 et 9.
- in_array trouve 17 avec une comparaison stricte.

## Exemple guidé 2

```php
<?php
$ligne = trim(fgets(STDIN));
$produits = explode(",", $ligne);
$produits[] = "fonio";
echo count($produits), " produits : ", implode(", ", $produits), "\n";
$prix = array_map("intval", explode(" ", "600 400 350"));
echo "Somme des prix : ", array_sum($prix);
```

Saisies de l’exemple : riz,mil,maïs

Affichage attendu :

    4 produits : riz, mil, maïs, fonio
    Somme des prix : 1350

Trace :

- explode découpe la saisie aux virgules.
- fonio est ajouté à la fin du tableau.
- implode assemble la liste avec une virgule et un espace.
- array_map convertit les trois prix en entiers avant la somme.

## Vérifier et expliquer

Pour chaque fonction utilisée, ouvre sa page du manuel PHP et vérifie l’ordre de ses arguments.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [array_sum](https://www.php.net/manual/fr/function.array-sum.php)
- [max](https://www.php.net/manual/fr/function.max.php)
- [in_array](https://www.php.net/manual/fr/function.in-array.php)
- [explode](https://www.php.net/manual/fr/function.explode.php)
- [implode](https://www.php.net/manual/fr/function.implode.php)
- [array_map](https://www.php.net/manual/fr/function.array-map.php)
- [round](https://www.php.net/manual/fr/function.round.php)
