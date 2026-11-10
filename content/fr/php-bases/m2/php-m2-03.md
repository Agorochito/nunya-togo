---
{
  "id": "php-m2-03",
  "title_fr": "Choisir parmi plusieurs cas avec match",
  "course": "php-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "php-m2-02"
  ],
  "outcomes": [
    "Remplacer une longue suite de elseif par une expression match.",
    "Prévoir un cas default et valider une saisie avant de l’utiliser."
  ],
  "idea_fr": "match compare une valeur à une liste de cas et renvoie le résultat du premier cas identique.",
  "analogy_fr": "Le guichetier de la gare lit la destination sur le ticket et indique le quai correspondant ; une destination inconnue renvoie au bureau d’information.",
  "examples": [
    {
      "code": "<?php\n$jour = strtolower(trim(fgets(STDIN)));\n$ouverture = match ($jour) {\n    \"lundi\", \"mercredi\", \"vendredi\" => \"Ouvert de 8 h à 17 h\",\n    \"samedi\" => \"Ouvert de 8 h à 12 h\",\n    default => \"Fermé\",\n};\necho ucfirst($jour), \" : \", $ouverture;",
      "expected_output": "Samedi : Ouvert de 8 h à 12 h",
      "inputs": [
        "Samedi"
      ],
      "trace_fr": [
        "La saisie Samedi devient samedi en minuscules.",
        "match ne trouve pas samedi dans la première ligne.",
        "Le cas \"samedi\" correspond : son texte est renvoyé.",
        "ucfirst remet une majuscule pour l’affichage."
      ]
    },
    {
      "code": "<?php\n$mois = (int) trim(fgets(STDIN));\nif ($mois < 1 || $mois > 12) {\n    echo \"Mois invalide\";\n} else {\n    $saison = match (true) {\n        $mois >= 4 && $mois <= 10 => \"Saison des pluies\",\n        default => \"Saison sèche\",\n    };\n    echo \"Mois $mois : $saison\";\n}",
      "expected_output": "Mois 7 : Saison des pluies",
      "inputs": [
        "7"
      ],
      "trace_fr": [
        "Le mois 7 est valide : le else s’exécute.",
        "match (true) teste chaque condition de haut en bas.",
        "7 est compris entre 4 et 10 : la première condition est vraie.",
        "Le texte de la saison est affiché."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier default",
      "why_fr": "Une valeur imprévue arrête le script avec UnhandledMatchError.",
      "fix_fr": "Ajoute toujours un cas default."
    },
    {
      "error": "Comparer une saisie texte à des cas entiers",
      "why_fr": "match compare strictement : \"2\" n’est pas 2.",
      "fix_fr": "Convertis la saisie avec (int) avant match."
    },
    {
      "error": "Oublier le point-virgule après l’accolade",
      "why_fr": "match est une expression rangée dans une variable.",
      "fix_fr": "Termine l’affectation par };."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie match (\"3\") { 3 => \"A\", default => \"B\" } ?",
      "options": [
        "A",
        "Une erreur",
        "3",
        "B"
      ],
      "answer": 3,
      "explanation": "Le texte \"3\" n’est pas identique à l’entier 3 : default s’applique.",
      "id": "php-m2-03-q1"
    },
    {
      "question": "Que se passe-t-il si aucun cas ne correspond et qu’il n’y a pas de default ?",
      "options": [
        "match renvoie null.",
        "Le script s’arrête avec UnhandledMatchError.",
        "Le premier cas est choisi.",
        "Rien ne s’affiche mais le script continue."
      ],
      "answer": 1,
      "explanation": "match exige qu’un cas corresponde.",
      "id": "php-m2-03-q2"
    },
    {
      "question": "Quand préférer if à match ?",
      "options": [
        "Quand chaque cas renvoie une seule valeur.",
        "Quand on compare à une liste de textes.",
        "Quand une branche doit exécuter plusieurs instructions.",
        "Jamais."
      ],
      "answer": 2,
      "explanation": "match produit une valeur ; if exécute des blocs.",
      "id": "php-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "match",
      "definition": "Expression qui renvoie le résultat du premier cas identique à une valeur."
    },
    {
      "term": "default",
      "definition": "Cas de match utilisé quand aucun autre ne correspond."
    },
    {
      "term": "validation",
      "definition": "Vérification qu’une saisie est acceptable avant de l’utiliser."
    },
    {
      "term": "UnhandledMatchError",
      "definition": "Erreur levée quand aucun cas de match ne correspond."
    }
  ],
  "recap_fr": [
    "Remplacer une longue suite de elseif par une expression match.",
    "Prévoir un cas default et valider une saisie avant de l’utiliser.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "match",
    "default",
    "validation",
    "UnhandledMatchError"
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
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php"
    },
    {
      "title": "strtolower",
      "url": "https://www.php.net/manual/fr/function.strtolower.php"
    },
    {
      "title": "ucfirst",
      "url": "https://www.php.net/manual/fr/function.ucfirst.php"
    }
  ],
  "sources": [
    {
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "strtolower",
      "url": "https://www.php.net/manual/fr/function.strtolower.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "ucfirst",
      "url": "https://www.php.net/manual/fr/function.ucfirst.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand une variable peut prendre une valeur parmi une liste connue, une suite de elseif devient vite répétitive : if ($jour === "lundi") … elseif ($jour === "mardi") … PHP 8 propose une écriture plus compacte, l’expression match.

match ($valeur) { cas1 => résultat1, cas2 => résultat2, default => résultatParDéfaut } compare $valeur à chaque cas, de haut en bas, avec une comparaison stricte, comme ===. Dès qu’un cas est identique, match renvoie le résultat associé. Comme match est une expression, on range directement son résultat dans une variable : $quai = match ($ville) { … };. Remarque le point-virgule final, après l’accolade fermante : il termine l’instruction d’affectation.

Plusieurs cas peuvent partager le même résultat : "samedi", "dimanche" => "Week-end". Les cas sont séparés par des virgules, et chaque ligne se termine aussi par une virgule.

Le cas default s’applique quand aucun autre ne correspond. Il est fortement conseillé : sans lui, une valeur imprévue provoque une erreur fatale UnhandledMatchError qui arrête le script. Cette sévérité est volontaire. Elle oblige à décider ce qui doit se passer pour une valeur inattendue, au lieu de laisser le programme continuer avec une variable vide.

La comparaison stricte de match a une conséquence importante avec les saisies. trim(fgets(STDIN)) renvoie toujours un texte. Si les cas sont des entiers, match ("2") { 2 => … } ne trouve aucune correspondance, car le texte "2" n’est pas l’entier 2. Convertis d’abord la saisie avec (int), ou écris des cas sous forme de texte. Les majuscules comptent aussi : "Kara" et "kara" sont différents. strtolower met un texte en minuscules avant la comparaison ; elle ne transforme correctement que les lettres sans accent, ce qui suffit pour des codes ou des noms de ville simples.

match peut aussi tester des conditions grâce à match (true). Chaque cas est alors une condition, et le premier cas vrai l’emporte : match (true) { $n >= 16 => "Très bien", $n >= 10 => "Admis", default => "À reprendre" }. Cette forme remplace une suite de elseif quand chaque branche se contente de produire une valeur.

Avant d’utiliser une saisie, il est prudent de la valider. Une quantité négative, un mois supérieur à 12 ou un code inconnu doivent produire un message clair plutôt qu’un calcul absurde. Le schéma est toujours le même : tester d’abord les cas invalides, afficher un message et ne faire le calcul que dans le cas valide. match et if se complètent : if pour rejeter, match pour classer les valeurs valides.

match ne remplace pas toutes les conditions. Quand une branche doit exécuter plusieurs instructions, comme afficher puis modifier plusieurs variables, if reste plus lisible. Réserve match aux situations où chaque cas produit une seule valeur.

## Exemple guidé 1

```php
<?php
$jour = strtolower(trim(fgets(STDIN)));
$ouverture = match ($jour) {
    "lundi", "mercredi", "vendredi" => "Ouvert de 8 h à 17 h",
    "samedi" => "Ouvert de 8 h à 12 h",
    default => "Fermé",
};
echo ucfirst($jour), " : ", $ouverture;
```

Saisies de l’exemple : Samedi

Affichage attendu :

    Samedi : Ouvert de 8 h à 12 h

Trace :

- La saisie Samedi devient samedi en minuscules.
- match ne trouve pas samedi dans la première ligne.
- Le cas "samedi" correspond : son texte est renvoyé.
- ucfirst remet une majuscule pour l’affichage.

## Exemple guidé 2

```php
<?php
$mois = (int) trim(fgets(STDIN));
if ($mois < 1 || $mois > 12) {
    echo "Mois invalide";
} else {
    $saison = match (true) {
        $mois >= 4 && $mois <= 10 => "Saison des pluies",
        default => "Saison sèche",
    };
    echo "Mois $mois : $saison";
}
```

Saisies de l’exemple : 7

Affichage attendu :

    Mois 7 : Saison des pluies

Trace :

- Le mois 7 est valide : le else s’exécute.
- match (true) teste chaque condition de haut en bas.
- 7 est compris entre 4 et 10 : la première condition est vraie.
- Le texte de la saison est affiché.

## Vérifier et expliquer

Essaie chaque programme avec une valeur prévue, une valeur écrite avec des majuscules et une valeur inconnue.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [match](https://www.php.net/manual/fr/control-structures.match.php)
- [strtolower](https://www.php.net/manual/fr/function.strtolower.php)
- [ucfirst](https://www.php.net/manual/fr/function.ucfirst.php)
