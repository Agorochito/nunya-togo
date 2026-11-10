---
{
  "id": "php-m1-01",
  "title_fr": "Écrire un premier script PHP",
  "course": "php-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Écrire un script qui commence par <?php et affiche des lignes avec echo.",
    "Terminer chaque instruction par un point-virgule et produire un retour à la ligne avec \"\\n\"."
  ],
  "idea_fr": "Un script PHP est une suite d’instructions exécutées de haut en bas ; echo envoie du texte vers l’affichage.",
  "analogy_fr": "Un crieur de marché annonce les prix un par un, dans l’ordre de sa liste : le script fait de même avec ses instructions.",
  "examples": [
    {
      "code": "<?php\necho \"Bonjour depuis Lomé !\\n\";\necho \"Bienvenue au club de code.\";",
      "expected_output": "Bonjour depuis Lomé !\nBienvenue au club de code.",
      "inputs": [],
      "trace_fr": [
        "La balise <?php ouvre le script.",
        "Le premier echo affiche une phrase puis \\n passe à la ligne.",
        "Le second echo affiche la deuxième ligne.",
        "Chaque instruction se termine par un point-virgule."
      ]
    },
    {
      "code": "<?php\n// Trois morceaux sur une seule ligne\necho \"Marché \", \"de \", \"Kara\", \"\\n\";\necho \"Ouvert le samedi\";",
      "expected_output": "Marché de Kara\nOuvert le samedi",
      "inputs": [],
      "trace_fr": [
        "Le commentaire est ignoré par PHP.",
        "echo affiche ses trois morceaux à la suite, sans séparateur ajouté.",
        "Les espaces placés dans les textes séparent les mots.",
        "La seconde ligne suit le saut de ligne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le point-virgule",
      "why_fr": "PHP ne sait pas où l’instruction se termine.",
      "fix_fr": "Ajoute ; à la fin de chaque instruction."
    },
    {
      "error": "Écrire \\n entre guillemets simples",
      "why_fr": "Les guillemets simples affichent \\n tel quel.",
      "fix_fr": "Utilise des guillemets doubles pour un saut de ligne."
    },
    {
      "error": "Oublier la balise <?php",
      "why_fr": "Le texte n’est pas exécuté comme du code.",
      "fix_fr": "Commence toujours le script par <?php."
    }
  ],
  "quiz": [
    {
      "question": "Que fait echo \"A\"; echo \"B\"; ?",
      "options": [
        "Affiche A puis B sur deux lignes.",
        "Affiche AB.",
        "Provoque une erreur.",
        "Affiche A seulement."
      ],
      "answer": 1,
      "explanation": "echo n’ajoute aucun retour à la ligne.",
      "id": "php-m1-01-q1"
    },
    {
      "question": "Pourquoi PHP signale-t-il une erreur de syntaxe sur la ligne 3 alors que la faute est à la ligne 2 ?",
      "options": [
        "La ligne 3 est toujours fausse.",
        "Le numéro est choisi au hasard.",
        "Il manque souvent un point-virgule à la ligne précédente.",
        "PHP compte les lignes à partir de 2."
      ],
      "answer": 2,
      "explanation": "L’instruction non terminée se poursuit jusqu’à la ligne suivante, où PHP détecte le problème.",
      "id": "php-m1-01-q2"
    },
    {
      "question": "Quelle écriture affiche un saut de ligne ?",
      "options": [
        "echo '\\n';",
        "echo \"\\n\";",
        "echo n;",
        "echo \"/n\";"
      ],
      "answer": 1,
      "explanation": "Seuls les guillemets doubles interprètent \\n.",
      "id": "php-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "script",
      "definition": "Fichier d’instructions exécutées par l’interpréteur PHP."
    },
    {
      "term": "echo",
      "definition": "Instruction qui affiche un ou plusieurs textes."
    },
    {
      "term": "point-virgule",
      "definition": "Signe qui termine une instruction PHP."
    },
    {
      "term": "commentaire",
      "definition": "Texte ignoré par PHP, écrit après //."
    }
  ],
  "recap_fr": [
    "Écrire un script qui commence par <?php et affiche des lignes avec echo.",
    "Terminer chaque instruction par un point-virgule et produire un retour à la ligne avec \"\\n\".",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "script",
    "echo",
    "point-virgule",
    "commentaire"
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
      "title": "Balises PHP",
      "url": "https://www.php.net/manual/fr/language.basic-syntax.phptags.php"
    },
    {
      "title": "echo",
      "url": "https://www.php.net/manual/fr/function.echo.php"
    },
    {
      "title": "Les chaînes de caractères",
      "url": "https://www.php.net/manual/fr/language.types.string.php"
    }
  ],
  "sources": [
    {
      "title": "Balises PHP",
      "url": "https://www.php.net/manual/fr/language.basic-syntax.phptags.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "echo",
      "url": "https://www.php.net/manual/fr/function.echo.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Les chaînes de caractères",
      "url": "https://www.php.net/manual/fr/language.types.string.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

PHP est un langage de programmation créé pour fabriquer des pages web. Il fonctionne d’habitude sur un serveur : quand une personne ouvre une page, le serveur exécute un script PHP qui prépare le texte envoyé au navigateur. De nombreux sites, boutiques en ligne et outils de gestion reposent encore sur lui. Dans ce cours, tu n’as pas besoin de serveur : un vrai interpréteur PHP 8.3 tourne directement sur ton appareil, comme le ferait PHP lancé dans un terminal. Tu te concentres ainsi sur le langage lui-même.

Tout script commence par la balise d’ouverture <?php. Elle indique à l’interpréteur que la suite est du code PHP. Sans elle, le texte serait simplement recopié tel quel, sans être exécuté. L’atelier exige donc cette balise sur la première ligne. La balise de fermeture ?> existe aussi, mais elle est inutile, et même déconseillée, à la fin d’un fichier qui ne contient que du PHP.

L’instruction echo affiche du texte. Le texte s’écrit entre guillemets : echo "Bonjour"; affiche Bonjour. Chaque instruction se termine par un point-virgule. C’est l’oubli le plus fréquent chez les débutants : sans point-virgule, PHP ne sait pas où l’instruction s’arrête et signale une erreur de syntaxe, en indiquant souvent la ligne suivante.

echo n’ajoute pas de retour à la ligne de lui-même. Deux echo successifs collent leurs textes : echo "Lo"; echo "mé"; affiche Lomé. Pour passer à la ligne, écris \n à l’intérieur de guillemets doubles. Ce couple de caractères représente un saut de ligne. Dans des guillemets simples, en revanche, \n reste deux caractères ordinaires : le premier exemple utilise donc toujours des guillemets doubles quand il faut changer de ligne.

echo accepte aussi plusieurs morceaux séparés par des virgules : echo "Kara", "\n"; affiche Kara puis passe à la ligne. Cette écriture évite de répéter echo pour une même ligne.

Un commentaire est un texte destiné aux humains, ignoré par l’interpréteur. Il commence par // et s’arrête à la fin de la ligne. Utilise-le pour expliquer une intention, pas pour répéter ce que le code dit déjà.

Quand le script contient une erreur, l’atelier affiche le message de PHP traduit en explication, avec le numéro de ligne. Prends l’habitude de lire ce numéro, puis de regarder cette ligne et celle qui la précède : c’est souvent là que manque un point-virgule ou un guillemet. Les exercices comparent ensuite ton affichage, caractère par caractère, avec l’affichage attendu. Un espace en trop au milieu d’une ligne suffit à faire échouer un cas.

## Exemple guidé 1

```php
<?php
echo "Bonjour depuis Lomé !\n";
echo "Bienvenue au club de code.";
```

Affichage attendu :

    Bonjour depuis Lomé !
    Bienvenue au club de code.

Trace :

- La balise <?php ouvre le script.
- Le premier echo affiche une phrase puis \n passe à la ligne.
- Le second echo affiche la deuxième ligne.
- Chaque instruction se termine par un point-virgule.

## Exemple guidé 2

```php
<?php
// Trois morceaux sur une seule ligne
echo "Marché ", "de ", "Kara", "\n";
echo "Ouvert le samedi";
```

Affichage attendu :

    Marché de Kara
    Ouvert le samedi

Trace :

- Le commentaire est ignoré par PHP.
- echo affiche ses trois morceaux à la suite, sans séparateur ajouté.
- Les espaces placés dans les textes séparent les mots.
- La seconde ligne suit le saut de ligne.

## Vérifier et expliquer

Exécute ton script, compare l’affichage ligne par ligne, puis provoque volontairement une erreur (retire un point-virgule) pour apprendre à lire le message.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Balises PHP](https://www.php.net/manual/fr/language.basic-syntax.phptags.php)
- [echo](https://www.php.net/manual/fr/function.echo.php)
- [Les chaînes de caractères](https://www.php.net/manual/fr/language.types.string.php)
