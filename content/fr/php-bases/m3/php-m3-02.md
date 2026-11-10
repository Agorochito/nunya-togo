---
{
  "id": "php-m3-02",
  "title_fr": "Associer des clés et des valeurs",
  "course": "php-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "php-m3-01"
  ],
  "outcomes": [
    "Créer un tableau associatif avec =>, lire et modifier une valeur par sa clé.",
    "Parcourir les paires clé–valeur avec foreach et vérifier une clé avec array_key_exists."
  ],
  "idea_fr": "Un tableau associatif remplace les numéros par des noms : chaque clé donne accès à sa valeur.",
  "analogy_fr": "Le carnet du boutiquier : à chaque nom de client correspond son ardoise. On cherche « Yawa », pas « client numéro 3 ».",
  "examples": [
    {
      "code": "<?php\n$prix = [\"riz\" => 600, \"mil\" => 400, \"maïs\" => 350];\n$prix[\"riz\"] = 650;\n$prix[\"sorgho\"] = 450;\nforeach ($prix as $produit => $montant) {\n    echo \"$produit : $montant FCFA\\n\";\n}\necho \"Riz : {$prix[\"riz\"]} FCFA\";",
      "expected_output": "riz : 650 FCFA\nmil : 400 FCFA\nmaïs : 350 FCFA\nsorgho : 450 FCFA\nRiz : 650 FCFA",
      "inputs": [],
      "trace_fr": [
        "Le prix du riz est remplacé par 650.",
        "La clé sorgho est ajoutée à la fin.",
        "foreach affiche chaque paire dans l’ordre d’ajout.",
        "Les accolades permettent d’interpoler $prix[\"riz\"]."
      ]
    },
    {
      "code": "<?php\n$stock = [\"savon\" => 12, \"huile\" => 5];\n$article = trim(fgets(STDIN));\nif (array_key_exists($article, $stock)) {\n    echo \"$article : {$stock[$article]} en stock\";\n} else {\n    echo \"Article inconnu : $article\";\n}",
      "expected_output": "Article inconnu : sucre",
      "inputs": [
        "sucre"
      ],
      "trace_fr": [
        "La saisie vaut sucre.",
        "array_key_exists cherche la clé sucre dans $stock.",
        "La clé est absente : la condition est fausse.",
        "Le else affiche un message clair au lieu d’un avertissement."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Lire une clé sans vérifier qu’elle existe",
      "why_fr": "Un avertissement s’affiche et la valeur est null.",
      "fix_fr": "Teste array_key_exists avant de lire."
    },
    {
      "error": "Utiliser sort sur un tableau associatif",
      "why_fr": "sort renumérote et perd les clés.",
      "fix_fr": "Utilise ksort, asort ou arsort."
    },
    {
      "error": "Interpoler $t[\"cle\"] sans accolades",
      "why_fr": "PHP lit mal l’expression dans le texte.",
      "fix_fr": "Écris \"{$t[\"cle\"]}\"."
    }
  ],
  "quiz": [
    {
      "question": "Que fait $notes[\"Afi\"] = 15; si la clé Afi existe déjà ?",
      "options": [
        "Ajoute une seconde clé Afi.",
        "Remplace la valeur d’Afi par 15.",
        "Provoque une erreur.",
        "Ne fait rien."
      ],
      "answer": 1,
      "explanation": "Une clé est unique : l’affectation remplace sa valeur.",
      "id": "php-m3-02-q1"
    },
    {
      "question": "Que renvoie array_key_exists(\"thé\", [\"café\" => 2]) ?",
      "options": [
        "true",
        "null",
        "false",
        "2"
      ],
      "answer": 2,
      "explanation": "La clé thé n’existe pas.",
      "id": "php-m3-02-q2"
    },
    {
      "question": "Quelle fonction range un tableau associatif par valeur décroissante en gardant les clés ?",
      "options": [
        "sort",
        "arsort",
        "ksort",
        "count"
      ],
      "answer": 1,
      "explanation": "arsort trie par valeur décroissante et conserve chaque clé.",
      "id": "php-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "tableau associatif",
      "definition": "Tableau dont les éléments sont repérés par des clés choisies."
    },
    {
      "term": "clé",
      "definition": "Nom unique qui donne accès à une valeur."
    },
    {
      "term": "paire",
      "definition": "Association d’une clé et de sa valeur, écrite clé => valeur."
    },
    {
      "term": "array_key_exists",
      "definition": "Fonction qui vérifie la présence d’une clé."
    }
  ],
  "recap_fr": [
    "Créer un tableau associatif avec =>, lire et modifier une valeur par sa clé.",
    "Parcourir les paires clé–valeur avec foreach et vérifier une clé avec array_key_exists.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "tableau associatif",
    "clé",
    "paire",
    "array_key_exists"
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
      "title": "array_key_exists",
      "url": "https://www.php.net/manual/fr/function.array-key-exists.php"
    },
    {
      "title": "arsort",
      "url": "https://www.php.net/manual/fr/function.arsort.php"
    },
    {
      "title": "ksort",
      "url": "https://www.php.net/manual/fr/function.ksort.php"
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
      "title": "array_key_exists",
      "url": "https://www.php.net/manual/fr/function.array-key-exists.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "arsort",
      "url": "https://www.php.net/manual/fr/function.arsort.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "ksort",
      "url": "https://www.php.net/manual/fr/function.ksort.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Les tableaux indexés numérotent leurs éléments. Souvent, un numéro ne veut rien dire : le prix de chaque produit, la note de chaque élève, le stock de chaque article se repèrent mieux par un nom. Un tableau associatif remplace les indices par des clés choisies. Chaque paire s’écrit clé => valeur : $prix = ["riz" => 600, "mil" => 400, "maïs" => 350];.

On lit une valeur par sa clé : $prix["riz"] vaut 600. On la modifie de la même façon : $prix["riz"] = 650;. Si la clé n’existe pas encore, l’affectation l’ajoute : $prix["sorgho"] = 450; crée une nouvelle paire à la fin. Une clé est unique : affecter à nouveau une clé existante remplace sa valeur au lieu de créer un doublon.

Les clés sont le plus souvent des textes, et les majuscules comptent : "Riz" et "riz" sont deux clés différentes. Dans un texte entre guillemets doubles, l’interpolation d’un élément associatif demande des accolades : "Prix : {$prix["riz"]} FCFA". Sans accolades, PHP lit mal l’expression.

foreach parcourt les paires dans l’ordre où elles ont été ajoutées. Avec foreach ($prix as $produit => $montant), $produit reçoit la clé et $montant la valeur. C’est la forme la plus utile : la plupart des traitements ont besoin des deux.

Lire une clé absente provoque un avertissement « Undefined array key » et donne null. Avant de lire une clé qui vient d’une saisie, vérifie qu’elle existe. array_key_exists("riz", $prix) renvoie true ou false. On l’utilise dans une condition : si le produit existe, on affiche son prix ; sinon, on affiche un message clair. Cette vérification est indispensable dès que la clé dépend de la personne qui utilise le programme.

Un tableau associatif peut aussi servir de compteur. Pour compter les votes ou les ventes par catégorie, on part d’un tableau vide. Pour chaque saisie, si la clé n’existe pas encore, on l’initialise à 0, puis on l’augmente de 1. À la fin, le tableau contient une paire par catégorie rencontrée, avec son nombre d’apparitions.

Les fonctions de tri ont leur version associative. ksort range les paires par clé, asort par valeur croissante, arsort par valeur décroissante. Contrairement à sort, ces fonctions conservent le lien entre chaque clé et sa valeur : utiliser sort sur un tableau associatif perdrait les noms.

Dans les exercices, la vérification lit parfois le tableau lui-même. Elle compare alors les clés, les valeurs et l’ordre des paires : en PHP, un tableau associatif est ordonné, et cet ordre fait partie du résultat.

## Exemple guidé 1

```php
<?php
$prix = ["riz" => 600, "mil" => 400, "maïs" => 350];
$prix["riz"] = 650;
$prix["sorgho"] = 450;
foreach ($prix as $produit => $montant) {
    echo "$produit : $montant FCFA\n";
}
echo "Riz : {$prix["riz"]} FCFA";
```

Affichage attendu :

    riz : 650 FCFA
    mil : 400 FCFA
    maïs : 350 FCFA
    sorgho : 450 FCFA
    Riz : 650 FCFA

Trace :

- Le prix du riz est remplacé par 650.
- La clé sorgho est ajoutée à la fin.
- foreach affiche chaque paire dans l’ordre d’ajout.
- Les accolades permettent d’interpoler $prix["riz"].

## Exemple guidé 2

```php
<?php
$stock = ["savon" => 12, "huile" => 5];
$article = trim(fgets(STDIN));
if (array_key_exists($article, $stock)) {
    echo "$article : {$stock[$article]} en stock";
} else {
    echo "Article inconnu : $article";
}
```

Saisies de l’exemple : sucre

Affichage attendu :

    Article inconnu : sucre

Trace :

- La saisie vaut sucre.
- array_key_exists cherche la clé sucre dans $stock.
- La clé est absente : la condition est fausse.
- Le else affiche un message clair au lieu d’un avertissement.

## Vérifier et expliquer

Teste chaque programme avec une clé existante, une clé absente et une clé écrite avec une majuscule.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les tableaux](https://www.php.net/manual/fr/language.types.array.php)
- [array_key_exists](https://www.php.net/manual/fr/function.array-key-exists.php)
- [arsort](https://www.php.net/manual/fr/function.arsort.php)
- [ksort](https://www.php.net/manual/fr/function.ksort.php)
