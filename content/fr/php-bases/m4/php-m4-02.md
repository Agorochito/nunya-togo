---
{
  "id": "php-m4-02",
  "title_fr": "Mettre en forme du texte",
  "course": "php-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "php-m4-01"
  ],
  "outcomes": [
    "Formater un affichage avec sprintf, str_pad et number_format.",
    "Nettoyer et transformer du texte avec trim, strtoupper, ucfirst, str_replace et str_contains."
  ],
  "idea_fr": "Un programme utile produit un affichage lisible ; les fonctions de texte transforment les données brutes en résultat présentable.",
  "analogy_fr": "Le tailleur ne livre pas le tissu tel qu’il l’a acheté : il le coupe, l’ajuste et le repasse avant de le rendre.",
  "examples": [
    {
      "code": "<?php\n$nom = ucfirst(strtolower(trim(fgets(STDIN))));\n$ticket = str_pad(\"7\", 3, \"0\", STR_PAD_LEFT);\necho sprintf(\"Ticket %s : %s\", $ticket, $nom), \"\\n\";\necho str_contains(\"Lomé-Kara-Dapaong\", \"Kara\") ? \"Arrêt à Kara\" : \"Direct\", \"\\n\";\necho str_replace(\"-\", \" → \", \"Lomé-Kara\");",
      "expected_output": "Ticket 007 : Komlan\nArrêt à Kara\nLomé → Kara",
      "inputs": [
        "   KOMLAN "
      ],
      "trace_fr": [
        "La saisie «   KOMLAN » est nettoyée puis mise en forme.",
        "str_pad complète 7 avec des zéros à gauche.",
        "str_contains trouve Kara dans l’itinéraire.",
        "str_replace remplace le tiret par une flèche."
      ]
    },
    {
      "code": "<?php\n$articles = [\"Riz\" => 600, \"Huile\" => 1250, \"Sel\" => 100];\nforeach ($articles as $article => $prix) {\n    printf(\"%-8s%6d FCFA\\n\", $article, $prix);\n}\nprintf(\"Moyenne : %.2f FCFA\", array_sum($articles) / count($articles));",
      "expected_output": "Riz        600 FCFA\nHuile     1250 FCFA\nSel        100 FCFA\nMoyenne : 650.00 FCFA",
      "inputs": [],
      "trace_fr": [
        "%-8s aligne chaque nom à gauche sur 8 caractères.",
        "%6d aligne chaque prix à droite sur 6 caractères.",
        "Les colonnes sont alignées car les noms sont sans accent.",
        "%.2f affiche la moyenne avec deux décimales."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Additionner des montants formatés",
      "why_fr": "number_format renvoie un texte.",
      "fix_fr": "Calcule d’abord, formate seulement à l’affichage."
    },
    {
      "error": "Mettre en majuscules un texte accentué",
      "why_fr": "strtoupper ne transforme que les lettres sans accent.",
      "fix_fr": "Réserve ces fonctions aux textes sans accent dans cet atelier."
    },
    {
      "error": "Confondre %d et %s",
      "why_fr": "%d convertit en entier et perd les décimales.",
      "fix_fr": "Utilise %s pour un texte, %.2f pour un décimal."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie sprintf(\"%03d\", 5) ?",
      "options": [
        "5",
        "500",
        "005",
        "  5"
      ],
      "answer": 2,
      "explanation": "Le 0 indique un remplissage par des zéros sur 3 caractères.",
      "id": "php-m4-02-q1"
    },
    {
      "question": "Que vaut strlen(\"thé\") dans cet atelier ?",
      "options": [
        "3",
        "4",
        "2",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "é occupe deux octets : t, h, puis deux octets.",
      "id": "php-m4-02-q2"
    },
    {
      "question": "Que renvoie str_contains(\"Atakpamé\", \"pam\") ?",
      "options": [
        "true",
        "false",
        "4",
        "\"pam\""
      ],
      "answer": 0,
      "explanation": "Le texte pam apparaît dans Atakpamé.",
      "id": "php-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "casse",
      "definition": "Distinction entre majuscules et minuscules."
    },
    {
      "term": "sprintf",
      "definition": "Fonction qui construit un texte à partir d’un modèle et de marqueurs %."
    },
    {
      "term": "marqueur de format",
      "definition": "Code comme %s, %d ou %.2f remplacé par une valeur."
    },
    {
      "term": "octet",
      "definition": "Unité de stockage ; une lettre accentuée en occupe deux en UTF-8."
    }
  ],
  "recap_fr": [
    "Formater un affichage avec sprintf, str_pad et number_format.",
    "Nettoyer et transformer du texte avec trim, strtoupper, ucfirst, str_replace et str_contains.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "casse",
    "sprintf",
    "marqueur de format",
    "octet"
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
      "title": "sprintf",
      "url": "https://www.php.net/manual/fr/function.sprintf.php"
    },
    {
      "title": "str_pad",
      "url": "https://www.php.net/manual/fr/function.str-pad.php"
    },
    {
      "title": "str_replace",
      "url": "https://www.php.net/manual/fr/function.str-replace.php"
    },
    {
      "title": "str_contains",
      "url": "https://www.php.net/manual/fr/function.str-contains.php"
    },
    {
      "title": "strlen",
      "url": "https://www.php.net/manual/fr/function.strlen.php"
    },
    {
      "title": "ucfirst",
      "url": "https://www.php.net/manual/fr/function.ucfirst.php"
    }
  ],
  "sources": [
    {
      "title": "sprintf",
      "url": "https://www.php.net/manual/fr/function.sprintf.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "str_pad",
      "url": "https://www.php.net/manual/fr/function.str-pad.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "str_replace",
      "url": "https://www.php.net/manual/fr/function.str-replace.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "str_contains",
      "url": "https://www.php.net/manual/fr/function.str-contains.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "strlen",
      "url": "https://www.php.net/manual/fr/function.strlen.php",
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

Les données arrivent rarement sous la forme voulue. Une saisie contient des espaces en trop, un nom est écrit en minuscules, un montant n’a pas de séparateur de milliers. PHP offre de nombreuses fonctions de texte pour nettoyer et présenter ces données.

Pour nettoyer, trim retire les espaces au début et à la fin, tu l’utilises déjà avec chaque saisie. strtolower et strtoupper changent la casse, ucfirst met une majuscule à la première lettre et ucwords à chaque mot. Attention : ces fonctions ne transforment que les lettres sans accent. strtoupper("été") donne éTé. Pour des textes accentués, PHP propose l’extension mbstring, absente de cet atelier ; tiens-en compte et applique ces fonctions à des codes ou à des noms sans accent.

Pour chercher et remplacer, str_contains("Lomé-Kara", "Kara") renvoie true si le second texte apparaît dans le premier. str_replace("-", " ", $texte) remplace chaque tiret par un espace. str_starts_with et str_ends_with testent le début et la fin d’un texte. Ces fonctions distinguent les majuscules ; mets les deux textes dans la même casse si la différence ne compte pas.

Pour mesurer, strlen renvoie la longueur en octets, pas en lettres. Un caractère accentué occupe deux octets en UTF-8 : strlen("é") vaut 2. Pour vérifier la longueur d’un code ou d’un numéro composé de chiffres et de lettres simples, strlen convient parfaitement.

Pour présenter, sprintf construit un texte à partir d’un modèle. Chaque marqueur % est remplacé par un argument : %s pour un texte, %d pour un entier, %.2f pour un décimal avec deux chiffres après la virgule. sprintf("%s a %d ans", "Afi", 17) renvoie Afi a 17 ans. Un nombre placé après % fixe une largeur minimale : %5d aligne un entier à droite sur cinq caractères, %-10s aligne un texte à gauche sur dix. printf fonctionne comme sprintf mais affiche directement le résultat.

str_pad complète un texte jusqu’à une longueur donnée : str_pad("7", 3, "0", STR_PAD_LEFT) donne 007, pratique pour un numéro de ticket. number_format, déjà rencontrée, formate un montant avec ses séparateurs.

Ces outils permettent d’aligner des colonnes : un reçu, un tableau de scores ou une liste de prix deviennent lisibles quand chaque valeur occupe la même largeur. Le point délicat reste l’accent : la largeur de sprintf se compte aussi en octets. Un nom accentué paraît alors décalé d’un caractère. Pour des colonnes parfaitement alignées, préfère des libellés sans accent, ou place la colonne accentuée en dernier.

Enfin, garde une séparation nette : les fonctions de calcul renvoient des nombres, et la mise en forme intervient au moment d’afficher. Un montant formaté avec number_format est un texte ; on ne peut plus l’additionner correctement.

## Exemple guidé 1

```php
<?php
$nom = ucfirst(strtolower(trim(fgets(STDIN))));
$ticket = str_pad("7", 3, "0", STR_PAD_LEFT);
echo sprintf("Ticket %s : %s", $ticket, $nom), "\n";
echo str_contains("Lomé-Kara-Dapaong", "Kara") ? "Arrêt à Kara" : "Direct", "\n";
echo str_replace("-", " → ", "Lomé-Kara");
```

Saisies de l’exemple :    KOMLAN 

Affichage attendu :

    Ticket 007 : Komlan
    Arrêt à Kara
    Lomé → Kara

Trace :

- La saisie «   KOMLAN » est nettoyée puis mise en forme.
- str_pad complète 7 avec des zéros à gauche.
- str_contains trouve Kara dans l’itinéraire.
- str_replace remplace le tiret par une flèche.

## Exemple guidé 2

```php
<?php
$articles = ["Riz" => 600, "Huile" => 1250, "Sel" => 100];
foreach ($articles as $article => $prix) {
    printf("%-8s%6d FCFA\n", $article, $prix);
}
printf("Moyenne : %.2f FCFA", array_sum($articles) / count($articles));
```

Affichage attendu :

    Riz        600 FCFA
    Huile     1250 FCFA
    Sel        100 FCFA
    Moyenne : 650.00 FCFA

Trace :

- %-8s aligne chaque nom à gauche sur 8 caractères.
- %6d aligne chaque prix à droite sur 6 caractères.
- Les colonnes sont alignées car les noms sont sans accent.
- %.2f affiche la moyenne avec deux décimales.

## Vérifier et expliquer

Compare l’affichage caractère par caractère, espaces compris. Essaie aussi un texte avec des espaces en trop et des majuscules.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [sprintf](https://www.php.net/manual/fr/function.sprintf.php)
- [str_pad](https://www.php.net/manual/fr/function.str-pad.php)
- [str_replace](https://www.php.net/manual/fr/function.str-replace.php)
- [str_contains](https://www.php.net/manual/fr/function.str-contains.php)
- [strlen](https://www.php.net/manual/fr/function.strlen.php)
- [ucfirst](https://www.php.net/manual/fr/function.ucfirst.php)
