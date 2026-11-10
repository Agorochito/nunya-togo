---
{
  "id": "php-m3-01",
  "title_fr": "Ranger une liste dans un tableau",
  "course": "php-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "php-m2-03"
  ],
  "outcomes": [
    "Créer un tableau indexé, lire un élément par son indice et ajouter un élément avec [].",
    "Parcourir un tableau avec foreach et utiliser count() et sort()."
  ],
  "idea_fr": "Un tableau range plusieurs valeurs sous un seul nom ; chaque valeur est repérée par un indice qui commence à 0.",
  "analogy_fr": "Une rangée de casiers numérotés à partir de zéro : on trouve le contenu d’un casier par son numéro, et l’on peut ajouter un casier au bout de la rangée.",
  "examples": [
    {
      "code": "<?php\n$fruits = [\"mangue\", \"papaye\", \"ananas\"];\n$fruits[] = \"goyave\";\necho \"Premier : $fruits[0]\\n\";\necho \"Nombre : \", count($fruits), \"\\n\";\nforeach ($fruits as $i => $fruit) {\n    echo $i + 1, \". $fruit\\n\";\n}",
      "expected_output": "Premier : mangue\nNombre : 4\n1. mangue\n2. papaye\n3. ananas\n4. goyave",
      "inputs": [],
      "trace_fr": [
        "Le tableau contient trois fruits, puis goyave est ajoutée à l’indice 3.",
        "$fruits[0] désigne le premier élément.",
        "count renvoie 4.",
        "foreach numérote chaque fruit à partir de l’indice + 1."
      ]
    },
    {
      "code": "<?php\n$ventes = [];\n$jours = (int) trim(fgets(STDIN));\nfor ($i = 0; $i < $jours; $i++) {\n    $ventes[] = (int) trim(fgets(STDIN));\n}\nsort($ventes);\necho \"Plus faible : $ventes[0]\\n\";\necho \"Plus forte : \", $ventes[count($ventes) - 1];",
      "expected_output": "Plus faible : 1200\nPlus forte : 4500",
      "inputs": [
        "4",
        "3000",
        "1200",
        "4500",
        "2500"
      ],
      "trace_fr": [
        "Le tableau commence vide.",
        "Quatre saisies sont ajoutées à la fin : 3000, 1200, 4500, 2500.",
        "sort les range : 1200, 2500, 3000, 4500.",
        "Le premier et le dernier indice donnent les extrêmes."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Commencer à compter à 1",
      "why_fr": "Le premier élément est à l’indice 0.",
      "fix_fr": "Le dernier se trouve à count($t) - 1."
    },
    {
      "error": "Écrire $tries = sort($t);",
      "why_fr": "sort modifie le tableau et renvoie seulement true.",
      "fix_fr": "Appelle sort($t); puis utilise $t."
    },
    {
      "error": "Afficher un tableau avec echo",
      "why_fr": "echo affiche Array et un avertissement.",
      "fix_fr": "Parcours-le avec foreach ou utilise print_r pour déboguer."
    }
  ],
  "quiz": [
    {
      "question": "Avec $t = [5, 8, 2], que vaut $t[1] ?",
      "options": [
        "5",
        "8",
        "2",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Les indices commencent à 0 : $t[1] est le deuxième élément.",
      "id": "php-m3-01-q1"
    },
    {
      "question": "Que fait $t[] = 9; ?",
      "options": [
        "Remplace le premier élément par 9.",
        "Vide le tableau.",
        "Ajoute 9 à la fin du tableau.",
        "Crée une variable $t9."
      ],
      "answer": 2,
      "explanation": "Des crochets vides ajoutent un élément à la fin.",
      "id": "php-m3-01-q2"
    },
    {
      "question": "Que renvoie count([\"a\", \"b\", \"c\"]) ?",
      "options": [
        "2",
        "3",
        "\"c\"",
        "0"
      ],
      "answer": 1,
      "explanation": "count renvoie le nombre d’éléments.",
      "id": "php-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "tableau",
      "definition": "Variable qui range plusieurs valeurs, écrite entre crochets."
    },
    {
      "term": "indice",
      "definition": "Position d’un élément dans un tableau, à partir de 0."
    },
    {
      "term": "foreach",
      "definition": "Boucle qui parcourt chaque élément d’un tableau."
    },
    {
      "term": "count",
      "definition": "Fonction qui renvoie le nombre d’éléments d’un tableau."
    }
  ],
  "recap_fr": [
    "Créer un tableau indexé, lire un élément par son indice et ajouter un élément avec [].",
    "Parcourir un tableau avec foreach et utiliser count() et sort().",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "tableau",
    "indice",
    "foreach",
    "count"
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
      "title": "Les tableaux",
      "url": "https://www.php.net/manual/fr/language.types.array.php"
    },
    {
      "title": "foreach",
      "url": "https://www.php.net/manual/fr/control-structures.foreach.php"
    },
    {
      "title": "count",
      "url": "https://www.php.net/manual/fr/function.count.php"
    },
    {
      "title": "sort",
      "url": "https://www.php.net/manual/fr/function.sort.php"
    }
  ],
  "sources": [
    {
      "title": "Les tableaux",
      "url": "https://www.php.net/manual/fr/language.types.array.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "foreach",
      "url": "https://www.php.net/manual/fr/control-structures.foreach.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "count",
      "url": "https://www.php.net/manual/fr/function.count.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "sort",
      "url": "https://www.php.net/manual/fr/function.sort.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une variable contient une valeur. Pour gérer la liste des membres d’un club ou les ventes d’une semaine, il faudrait des dizaines de variables. Un tableau range toutes ces valeurs sous un seul nom. On l’écrit entre crochets, valeurs séparées par des virgules : $fruits = ["mangue", "papaye", "ananas"];.

Chaque élément possède un indice, sa position dans le tableau. Le premier indice vaut 0, pas 1 : $fruits[0] vaut "mangue", $fruits[2] vaut "ananas". Cette numérotation surprend au début mais concerne presque tous les langages. Lire un indice qui n’existe pas, comme $fruits[3], produit un avertissement « Undefined array key » et une valeur nulle.

La fonction count donne le nombre d’éléments : count($fruits) vaut 3. Le dernier élément se trouve donc à l’indice count($fruits) - 1. Pour ajouter un élément à la fin, écris des crochets vides : $fruits[] = "goyave"; place goyave à l’indice 3. Pour modifier un élément existant, affecte une nouvelle valeur à son indice : $fruits[0] = "orange";.

Pour traiter tous les éléments, la boucle foreach est la plus simple : foreach ($fruits as $fruit) { … } exécute le bloc une fois par élément, en plaçant chaque valeur dans $fruit, dans l’ordre du tableau. Elle évite de gérer un compteur et ne risque pas de dépasser la fin. Quand l’indice est aussi utile, par exemple pour numéroter une liste, écris foreach ($fruits as $i => $fruit) : $i reçoit l’indice et $fruit la valeur.

Les traitements vus avec les boucles s’appliquent directement aux tableaux : additionner des ventes, compter les valeurs qui respectent une condition, chercher la plus grande. Le principe reste le même : initialiser un accumulateur avant foreach, puis le mettre à jour à chaque tour.

sort range les valeurs par ordre croissant : nombres du plus petit au plus grand, textes par ordre alphabétique. Attention, sort modifie le tableau lui-même et renumérote ses indices ; elle ne renvoie pas un nouveau tableau. Écrire $tries = sort($notes); ne fonctionne donc pas : $tries recevrait seulement true. rsort range dans l’ordre décroissant.

Pour afficher le contenu d’un tableau pendant la mise au point, print_r est pratique : elle montre chaque indice et sa valeur. echo, en revanche, ne sait pas afficher un tableau entier : il écrit seulement Array accompagné d’un avertissement. Les fonctions implode et explode, vues au prochain chapitre, offriront un affichage plus soigné.

Enfin, un tableau peut se remplir à partir de saisies : une boucle lit chaque valeur et l’ajoute avec $tableau[] = …. On sépare ainsi la lecture des données de leur traitement, ce qui rend le programme plus clair.

## Exemple guidé 1

```php
<?php
$fruits = ["mangue", "papaye", "ananas"];
$fruits[] = "goyave";
echo "Premier : $fruits[0]\n";
echo "Nombre : ", count($fruits), "\n";
foreach ($fruits as $i => $fruit) {
    echo $i + 1, ". $fruit\n";
}
```

Affichage attendu :

    Premier : mangue
    Nombre : 4
    1. mangue
    2. papaye
    3. ananas
    4. goyave

Trace :

- Le tableau contient trois fruits, puis goyave est ajoutée à l’indice 3.
- $fruits[0] désigne le premier élément.
- count renvoie 4.
- foreach numérote chaque fruit à partir de l’indice + 1.

## Exemple guidé 2

```php
<?php
$ventes = [];
$jours = (int) trim(fgets(STDIN));
for ($i = 0; $i < $jours; $i++) {
    $ventes[] = (int) trim(fgets(STDIN));
}
sort($ventes);
echo "Plus faible : $ventes[0]\n";
echo "Plus forte : ", $ventes[count($ventes) - 1];
```

Saisies de l’exemple : 4 · 3000 · 1200 · 4500 · 2500

Affichage attendu :

    Plus faible : 1200
    Plus forte : 4500

Trace :

- Le tableau commence vide.
- Quatre saisies sont ajoutées à la fin : 3000, 1200, 4500, 2500.
- sort les range : 1200, 2500, 3000, 4500.
- Le premier et le dernier indice donnent les extrêmes.

## Vérifier et expliquer

Utilise print_r pour afficher le tableau après chaque étape, puis retire-le avant la vérification finale.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les tableaux](https://www.php.net/manual/fr/language.types.array.php)
- [foreach](https://www.php.net/manual/fr/control-structures.foreach.php)
- [count](https://www.php.net/manual/fr/function.count.php)
- [sort](https://www.php.net/manual/fr/function.sort.php)
