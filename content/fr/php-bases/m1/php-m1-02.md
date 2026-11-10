---
{
  "id": "php-m1-02",
  "title_fr": "Ranger des valeurs dans des variables",
  "course": "php-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "php-m1-01"
  ],
  "outcomes": [
    "Créer des variables avec $ et choisir entre entier, décimal, texte et booléen.",
    "Assembler du texte avec le point et l’interpolation entre guillemets doubles."
  ],
  "idea_fr": "Une variable donne un nom à une valeur pour la réutiliser ; son type décide des opérations possibles.",
  "analogy_fr": "Au marché, chaque bassine porte une étiquette : on retrouve les mangues en lisant l’étiquette, pas en fouillant tout l’étal.",
  "examples": [
    {
      "code": "<?php\n$prenom = \"Afi\";\n$age = 17;\n$taille = 1.62;\n$inscrite = true;\necho \"Bonjour $prenom\\n\";\nvar_dump($age, $taille, $inscrite);",
      "expected_output": "Bonjour Afi\nint(17)\nfloat(1.62)\nbool(true)",
      "inputs": [],
      "trace_fr": [
        "Quatre variables reçoivent quatre types différents.",
        "L’interpolation remplace $prenom par Afi.",
        "var_dump affiche le type puis la valeur de chaque variable.",
        "Chaque résultat de var_dump occupe sa propre ligne."
      ]
    },
    {
      "code": "<?php\n$ville = \"Kara\";\n$distance = 420;\necho \"De Lomé à \" . $ville . \" : \" . $distance . \" km\\n\";\n$distance = 410;\necho \"Nouvelle route : {$distance}km\";",
      "expected_output": "De Lomé à Kara : 420 km\nNouvelle route : 410km",
      "inputs": [],
      "trace_fr": [
        "Le point colle textes et valeurs dans l’ordre.",
        "Un entier est converti en texte pour être affiché.",
        "La seconde affectation remplace 420 par 410.",
        "Les accolades séparent la variable du mot km collé."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le $ devant le nom",
      "why_fr": "PHP lit alors un nom de constante inconnu.",
      "fix_fr": "Écris toujours $nom pour une variable."
    },
    {
      "error": "Coller du texte avec +",
      "why_fr": "En PHP, + additionne des nombres et ne colle pas les textes.",
      "fix_fr": "Utilise le point ou l’interpolation."
    },
    {
      "error": "Écrire 2,5 pour un décimal",
      "why_fr": "La virgule sépare des valeurs en PHP.",
      "fix_fr": "Écris 2.5 avec un point."
    }
  ],
  "quiz": [
    {
      "question": "Que contient $x après $x = 4; $x = 9; ?",
      "options": [
        "4",
        "13",
        "9",
        "4 et 9"
      ],
      "answer": 2,
      "explanation": "La seconde affectation remplace la première.",
      "id": "php-m1-02-q1"
    },
    {
      "question": "Qu’affiche echo 'Prix : $prix'; ?",
      "options": [
        "Prix : $prix",
        "Prix : 500",
        "Une erreur",
        "Prix :"
      ],
      "answer": 0,
      "explanation": "Les guillemets simples n’interprètent pas les variables.",
      "id": "php-m1-02-q2"
    },
    {
      "question": "Quel est le type de 3.0 ?",
      "options": [
        "int",
        "string",
        "bool",
        "float"
      ],
      "answer": 3,
      "explanation": "Un nombre écrit avec un point est un décimal, même si sa partie décimale est nulle.",
      "id": "php-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "variable",
      "definition": "Nom commençant par $ qui désigne une valeur."
    },
    {
      "term": "type",
      "definition": "Nature d’une valeur : int, float, string ou bool."
    },
    {
      "term": "concaténation",
      "definition": "Assemblage de textes avec l’opérateur point."
    },
    {
      "term": "interpolation",
      "definition": "Remplacement d’une variable par sa valeur dans un texte entre guillemets doubles."
    }
  ],
  "recap_fr": [
    "Créer des variables avec $ et choisir entre entier, décimal, texte et booléen.",
    "Assembler du texte avec le point et l’interpolation entre guillemets doubles.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "variable",
    "type",
    "concaténation",
    "interpolation"
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
      "title": "Les variables",
      "url": "https://www.php.net/manual/fr/language.variables.basics.php"
    },
    {
      "title": "Les chaînes de caractères",
      "url": "https://www.php.net/manual/fr/language.types.string.php"
    },
    {
      "title": "var_dump",
      "url": "https://www.php.net/manual/fr/function.var-dump.php"
    }
  ],
  "sources": [
    {
      "title": "Les variables",
      "url": "https://www.php.net/manual/fr/language.variables.basics.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Les chaînes de caractères",
      "url": "https://www.php.net/manual/fr/language.types.string.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "var_dump",
      "url": "https://www.php.net/manual/fr/function.var-dump.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un programme manipule des valeurs : un prénom, un prix, une quantité. Pour les réutiliser, on les range dans des variables. En PHP, le nom d’une variable commence toujours par le signe dollar : $prenom, $prix, $quantite. Le signe = ne veut pas dire « est égal » comme en mathématiques ; il signifie « range cette valeur dans cette variable ». $prix = 500; crée la variable $prix et y place 500.

Un nom de variable commence par une lettre ou un tiret bas après le dollar, sans espace ni accent. PHP distingue les majuscules : $Prix et $prix sont deux variables différentes. Choisis des noms qui disent ce que la variable contient : $prixTomate se comprend mieux que $p.

Chaque valeur possède un type. Les quatre types de base sont l’entier (int), comme 500 ; le nombre décimal (float), comme 2.5, écrit avec un point et non une virgule ; la chaîne de caractères (string), c’est-à-dire du texte entre guillemets ; et le booléen (bool), qui vaut true ou false. La fonction var_dump affiche à la fois le type et la valeur : var_dump(2.5); affiche float(2.5). C’est un outil précieux pour comprendre ce que contient réellement une variable.

Pour assembler du texte, PHP utilise le point, appelé opérateur de concaténation : "Bonjour " . $prenom colle les deux morceaux. Attention à l’espace : il faut le placer dans l’un des textes, sinon les mots se touchent. Le signe + ne colle pas des textes en PHP ; il additionne des nombres.

Les guillemets doubles offrent une seconde méthode, l’interpolation : une variable écrite directement dans le texte est remplacée par sa valeur. "Bonjour $prenom" affiche Bonjour Afi si $prenom vaut "Afi". Les guillemets simples, eux, n’interprètent rien : 'Bonjour $prenom' affiche le texte tel quel, dollar compris. Quand la variable est collée à d’autres lettres, entoure-la d’accolades : "{$quantite}kg".

Une variable peut changer de valeur au cours du script. $stock = 10; puis $stock = 8; : la seconde affectation remplace la première. La dernière valeur rangée est celle qui compte au moment où l’on lit la variable. Utiliser une variable qui n’a jamais reçu de valeur provoque un avertissement « Undefined variable » : PHP continue, mais le résultat est faux.

Les exercices vérifient parfois directement la valeur d’une variable après l’exécution, et pas seulement l’affichage. Une variable $prix qui contient le texte "500" au lieu de l’entier 500 échoue alors, même si l’affichage paraît identique : le type fait partie de la réponse.

## Exemple guidé 1

```php
<?php
$prenom = "Afi";
$age = 17;
$taille = 1.62;
$inscrite = true;
echo "Bonjour $prenom\n";
var_dump($age, $taille, $inscrite);
```

Affichage attendu :

    Bonjour Afi
    int(17)
    float(1.62)
    bool(true)

Trace :

- Quatre variables reçoivent quatre types différents.
- L’interpolation remplace $prenom par Afi.
- var_dump affiche le type puis la valeur de chaque variable.
- Chaque résultat de var_dump occupe sa propre ligne.

## Exemple guidé 2

```php
<?php
$ville = "Kara";
$distance = 420;
echo "De Lomé à " . $ville . " : " . $distance . " km\n";
$distance = 410;
echo "Nouvelle route : {$distance}km";
```

Affichage attendu :

    De Lomé à Kara : 420 km
    Nouvelle route : 410km

Trace :

- Le point colle textes et valeurs dans l’ordre.
- Un entier est converti en texte pour être affiché.
- La seconde affectation remplace 420 par 410.
- Les accolades séparent la variable du mot km collé.

## Vérifier et expliquer

Utilise var_dump pour vérifier le type de chaque variable avant de l’afficher. Change ensuite une valeur et observe l’affichage.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les variables](https://www.php.net/manual/fr/language.variables.basics.php)
- [Les chaînes de caractères](https://www.php.net/manual/fr/language.types.string.php)
- [var_dump](https://www.php.net/manual/fr/function.var-dump.php)
