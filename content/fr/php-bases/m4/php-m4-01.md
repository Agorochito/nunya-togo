---
{
  "id": "php-m4-01",
  "title_fr": "Écrire ses propres fonctions",
  "course": "php-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "php-m3-03"
  ],
  "outcomes": [
    "Définir une fonction avec des paramètres typés, une valeur de retour et un paramètre par défaut.",
    "Distinguer return et echo, et la portée locale des variables."
  ],
  "idea_fr": "Une fonction donne un nom à un calcul réutilisable : elle reçoit des données, renvoie un résultat et ne touche pas au reste du programme.",
  "analogy_fr": "Le moulin du quartier : on y apporte du maïs, on récupère de la farine. Peu importe comment il tourne à l’intérieur, il rend toujours le même service.",
  "examples": [
    {
      "code": "<?php\nfunction prixTotal(int $prix, int $quantite): int\n{\n    return $prix * $quantite;\n}\n\n$tomates = prixTotal(500, 3);\n$oignons = prixTotal(250, 2);\necho \"Tomates : $tomates FCFA\\n\";\necho \"Panier : \", $tomates + $oignons, \" FCFA\";",
      "expected_output": "Tomates : 1500 FCFA\nPanier : 2000 FCFA",
      "inputs": [],
      "trace_fr": [
        "La fonction est définie une fois.",
        "Le premier appel renvoie 500 × 3 = 1500.",
        "Le second renvoie 250 × 2 = 500.",
        "Les deux résultats renvoyés s’additionnent dans le programme principal."
      ]
    },
    {
      "code": "<?php\nfunction saluer(string $nom, string $formule = \"Bonjour\"): string\n{\n    return \"$formule $nom !\";\n}\n\nfunction estMajeur(int $age): bool\n{\n    return $age >= 18;\n}\n\necho saluer(\"Afi\"), \"\\n\";\necho saluer(\"Kossi\", \"Akwaba\"), \"\\n\";\nvar_dump(estMajeur(17));",
      "expected_output": "Bonjour Afi !\nAkwaba Kossi !\nbool(false)",
      "inputs": [],
      "trace_fr": [
        "Le premier appel utilise la formule par défaut.",
        "Le second remplace la formule par Akwaba.",
        "estMajeur renvoie directement le résultat de la comparaison.",
        "17 >= 18 est faux : var_dump affiche bool(false)."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Afficher avec echo au lieu de renvoyer",
      "why_fr": "La valeur ne peut pas être réutilisée dans un calcul.",
      "fix_fr": "Termine la fonction par return."
    },
    {
      "error": "Utiliser une variable du programme principal dans la fonction",
      "why_fr": "Les variables d’une fonction sont locales.",
      "fix_fr": "Passe la valeur en paramètre."
    },
    {
      "error": "Écrire du code après return en attendant qu’il s’exécute",
      "why_fr": "return termine immédiatement la fonction.",
      "fix_fr": "Place return à la fin du calcul."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie une fonction sans return ?",
      "options": [
        "0",
        "null",
        "Une erreur",
        "Le dernier echo"
      ],
      "answer": 1,
      "explanation": "Sans return, la valeur renvoyée est null.",
      "id": "php-m4-01-q1"
    },
    {
      "question": "Avec function f(int $a, int $b = 2): int { return $a * $b; }, que vaut f(5) ?",
      "options": [
        "5",
        "7",
        "10",
        "Une erreur"
      ],
      "answer": 2,
      "explanation": "$b prend sa valeur par défaut, 2.",
      "id": "php-m4-01-q2"
    },
    {
      "question": "Pourquoi une fonction ne voit-elle pas $taux défini dans le programme principal ?",
      "options": [
        "Parce que $taux est un mot réservé.",
        "Parce que les variables d’une fonction sont locales.",
        "Parce que $taux n’est pas typé.",
        "Elle le voit toujours."
      ],
      "answer": 1,
      "explanation": "Une fonction ne connaît que ses paramètres et ses propres variables.",
      "id": "php-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction",
      "definition": "Bloc de code nommé, appelé avec des arguments."
    },
    {
      "term": "paramètre",
      "definition": "Variable d’une fonction qui reçoit une valeur lors de l’appel."
    },
    {
      "term": "valeur de retour",
      "definition": "Résultat renvoyé par return à l’endroit de l’appel."
    },
    {
      "term": "portée locale",
      "definition": "Règle qui limite les variables d’une fonction à son bloc."
    }
  ],
  "recap_fr": [
    "Définir une fonction avec des paramètres typés, une valeur de retour et un paramètre par défaut.",
    "Distinguer return et echo, et la portée locale des variables.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "fonction",
    "paramètre",
    "valeur de retour",
    "portée locale"
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
      "title": "Les fonctions",
      "url": "https://www.php.net/manual/fr/language.functions.php"
    },
    {
      "title": "Arguments des fonctions",
      "url": "https://www.php.net/manual/fr/functions.arguments.php"
    },
    {
      "title": "Valeurs de retour",
      "url": "https://www.php.net/manual/fr/functions.returning-values.php"
    },
    {
      "title": "Déclarations de type",
      "url": "https://www.php.net/manual/fr/language.types.declarations.php"
    }
  ],
  "sources": [
    {
      "title": "Les fonctions",
      "url": "https://www.php.net/manual/fr/language.functions.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Arguments des fonctions",
      "url": "https://www.php.net/manual/fr/functions.arguments.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Valeurs de retour",
      "url": "https://www.php.net/manual/fr/functions.returning-values.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Déclarations de type",
      "url": "https://www.php.net/manual/fr/language.types.declarations.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand un même calcul revient plusieurs fois, le recopier multiplie les risques d’erreur : une correction oubliée à un endroit suffit à fausser le résultat. Une fonction regroupe ce calcul sous un nom. On l’écrit une fois, puis on l’appelle autant de fois que nécessaire.

La définition commence par le mot function, suivi du nom et de la liste des paramètres entre parenthèses : function prixTotal(int $prix, int $quantite): int { return $prix * $quantite; }. Les paramètres sont des variables qui reçoivent les valeurs passées lors de l’appel. L’appel prixTotal(500, 3) place 500 dans $prix et 3 dans $quantite, exécute le bloc et renvoie 1500.

return renvoie une valeur à l’endroit de l’appel et termine immédiatement la fonction. Il ne faut pas le confondre avec echo, qui affiche sans rien renvoyer. Une fonction qui fait echo au lieu de return ne peut pas être réutilisée dans un calcul : $total = prixTotal(500, 3) + 200; exige une valeur renvoyée. Règle pratique : une fonction calcule et renvoie, le programme principal décide de l’affichage. Les exercices vérifient directement les valeurs renvoyées par tes fonctions.

PHP permet de déclarer le type des paramètres et du retour : int, float, string, bool ou array. Ces déclarations documentent la fonction et protègent contre les erreurs : appeler prixTotal("abc", 3) provoque une erreur TypeError claire au lieu d’un calcul absurde. Le type de retour, écrit après les parenthèses et deux-points, garantit ce que la fonction renvoie.

Un paramètre peut avoir une valeur par défaut : function saluer(string $nom, string $formule = "Bonjour"). L’appel saluer("Afi") utilise alors Bonjour, tandis que saluer("Afi", "Akwaba") remplace la formule. Les paramètres avec valeur par défaut se placent après les paramètres obligatoires. Appeler une fonction avec trop peu d’arguments provoque une erreur ArgumentCountError.

Les variables d’une fonction sont locales : elles n’existent qu’à l’intérieur. Une variable $taux définie dans le programme principal n’est pas visible dans la fonction, et une variable créée dans la fonction disparaît à sa sortie. Cette séparation est une protection : une fonction ne dépend que de ses paramètres, et l’on peut la comprendre sans lire tout le programme. Si la fonction a besoin d’une valeur, passe-la en paramètre.

Une fonction peut appeler d’autres fonctions. On découpe ainsi un problème en petites étapes nommées : calculer le sous-total, appliquer une réduction, formater le montant. Chaque fonction se teste séparément, puis le programme principal les assemble. Ce découpage prépare le projet final du cours.

Le nom d’une fonction décrit ce qu’elle renvoie ou ce qu’elle fait, en commençant souvent par un verbe ou un nom précis : prixTotal, estMajeur, formaterMontant. Une fonction dont le nom commence par est ou a renvoie habituellement un booléen.

## Exemple guidé 1

```php
<?php
function prixTotal(int $prix, int $quantite): int
{
    return $prix * $quantite;
}

$tomates = prixTotal(500, 3);
$oignons = prixTotal(250, 2);
echo "Tomates : $tomates FCFA\n";
echo "Panier : ", $tomates + $oignons, " FCFA";
```

Affichage attendu :

    Tomates : 1500 FCFA
    Panier : 2000 FCFA

Trace :

- La fonction est définie une fois.
- Le premier appel renvoie 500 × 3 = 1500.
- Le second renvoie 250 × 2 = 500.
- Les deux résultats renvoyés s’additionnent dans le programme principal.

## Exemple guidé 2

```php
<?php
function saluer(string $nom, string $formule = "Bonjour"): string
{
    return "$formule $nom !";
}

function estMajeur(int $age): bool
{
    return $age >= 18;
}

echo saluer("Afi"), "\n";
echo saluer("Kossi", "Akwaba"), "\n";
var_dump(estMajeur(17));
```

Affichage attendu :

    Bonjour Afi !
    Akwaba Kossi !
    bool(false)

Trace :

- Le premier appel utilise la formule par défaut.
- Le second remplace la formule par Akwaba.
- estMajeur renvoie directement le résultat de la comparaison.
- 17 >= 18 est faux : var_dump affiche bool(false).

## Vérifier et expliquer

Appelle chaque fonction avec plusieurs arguments et vérifie le type renvoyé avec var_dump avant d’écrire le programme principal.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les fonctions](https://www.php.net/manual/fr/language.functions.php)
- [Arguments des fonctions](https://www.php.net/manual/fr/functions.arguments.php)
- [Valeurs de retour](https://www.php.net/manual/fr/functions.returning-values.php)
- [Déclarations de type](https://www.php.net/manual/fr/language.types.declarations.php)
