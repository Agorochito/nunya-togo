---
{
  "id": "phpi-m3-01",
  "title_fr": "Exceptions personnalisées et finally",
  "course": "php-intermediaire",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "phpi-m2-03"
  ],
  "outcomes": [
    "Créer ses propres classes d’exception et lever la bonne exception selon le problème.",
    "Intercepter plusieurs types d’exceptions dans le bon ordre, et nettoyer avec finally."
  ],
  "idea_fr": "Une exception nomme précisément ce qui a échoué ; l’appelant choisit alors la réaction adaptée à chaque cas.",
  "analogy_fr": "Au dispensaire, on ne dit pas seulement « ça ne va pas » : on précise fièvre, blessure ou toux, et chaque cas a son traitement.",
  "examples": [
    {
      "code": "<?php\nclass StockInsuffisant extends Exception\n{\n}\n\nfunction vendre(int $stock, int $quantite): int\n{\n    if ($quantite <= 0) {\n        throw new InvalidArgumentException(\"Quantité invalide\");\n    }\n    if ($quantite > $stock) {\n        throw new StockInsuffisant(\"Il reste seulement $stock article(s)\");\n    }\n    return $stock - $quantite;\n}\n\nforeach ([3, 0, 50] as $q) {\n    try {\n        $reste = vendre(10, $q);\n        echo \"Reste : $reste\\n\";\n    } catch (StockInsuffisant $e) {\n        echo \"Stock : \", $e->getMessage(), \"\\n\";\n    } catch (InvalidArgumentException $e) {\n        echo \"Erreur : \", $e->getMessage(), \"\\n\";\n    }\n}",
      "expected_output": "Reste : 7\nErreur : Quantité invalide\nStock : Il reste seulement 10 article(s)",
      "inputs": [],
      "trace_fr": [
        "La vente de 3 réussit.",
        "Une quantité nulle lève InvalidArgumentException.",
        "Une quantité de 50 lève StockInsuffisant, interceptée par son propre catch."
      ]
    },
    {
      "code": "<?php\nfunction traiter(string $texte): string\n{\n    try {\n        if (!is_numeric($texte)) {\n            throw new InvalidArgumentException(\"« $texte » n'est pas un nombre\");\n        }\n        return \"Lu : \" . ($texte * 2);\n    } finally {\n        echo \"[ligne traitée]\\n\";\n    }\n}\n\nforeach ([\"21\", \"abc\"] as $t) {\n    try {\n        echo traiter($t), \"\\n\";\n    } catch (InvalidArgumentException $e) {\n        echo $e->getMessage(), \"\\n\";\n    }\n}",
      "expected_output": "[ligne traitée]\nLu : 42\n[ligne traitée]\n« abc » n'est pas un nombre",
      "inputs": [],
      "trace_fr": [
        "finally s’exécute avant le return de la première ligne.",
        "Il s’exécute aussi quand l’exception remonte.",
        "L’exception est ensuite interceptée par l’appelant."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre catch (Exception) en premier",
      "why_fr": "Il attrape tout ; les catch précis ne servent plus.",
      "fix_fr": "Range les catch du plus précis au plus général."
    },
    {
      "error": "Avaler une exception dans un catch vide",
      "why_fr": "Le programme continue avec des données fausses.",
      "fix_fr": "Traite, journalise ou transforme l’erreur."
    },
    {
      "error": "Afficher pendant un appel qui peut échouer",
      "why_fr": "Une partie du texte s’affiche avant l’erreur.",
      "fix_fr": "Range le résultat dans une variable, puis affiche."
    }
  ],
  "quiz": [
    {
      "question": "Comment crée-t-on une exception personnalisée ?",
      "options": [
        "function MonErreur()",
        "class MonErreur extends Exception {}",
        "new Exception(\"MonErreur\")",
        "throw MonErreur"
      ],
      "answer": 1,
      "explanation": "Une classe qui hérite d’Exception.",
      "id": "phpi-m3-01-q1"
    },
    {
      "question": "Quand s’exécute finally ?",
      "options": [
        "Seulement en cas d’erreur",
        "Seulement sans erreur",
        "Toujours",
        "Jamais avec return"
      ],
      "answer": 2,
      "explanation": "Même avec un return ou une exception.",
      "id": "phpi-m3-01-q2"
    },
    {
      "question": "Dans quel ordre ranger les catch ?",
      "options": [
        "Du plus général au plus précis",
        "Du plus précis au plus général",
        "Peu importe",
        "Par ordre alphabétique"
      ],
      "answer": 1,
      "explanation": "Le premier catch compatible gagne.",
      "id": "phpi-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "exception personnalisée",
      "definition": "Classe d’erreur propre au domaine, qui hérite d’Exception."
    },
    {
      "term": "catch multiple",
      "definition": "Plusieurs blocs catch, essayés dans l’ordre."
    },
    {
      "term": "finally",
      "definition": "Bloc exécuté dans tous les cas après try."
    },
    {
      "term": "getMessage",
      "definition": "Méthode qui renvoie le message d’une exception."
    }
  ],
  "recap_fr": [
    "Créer ses propres classes d’exception et lever la bonne exception selon le problème.",
    "Intercepter plusieurs types d’exceptions dans le bon ordre, et nettoyer avec finally.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "exception personnalisée",
    "catch multiple",
    "finally",
    "getMessage"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "php",
  "runtime": "php",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "PHP 8.3 réel, exécuté sur cet appareil dans un Worker isolé, comme en ligne de commande. Chaque saisie se lit avec trim(fgets(STDIN)). Pas de serveur web, de réseau ni de fichiers conservés : les données JSON sont écrites dans le programme. Les données sont fictives.",
  "references": [
    {
      "title": "La classe Exception",
      "url": "https://www.php.net/manual/fr/class.exception.php"
    },
    {
      "title": "Héritage",
      "url": "https://www.php.net/manual/fr/language.oop5.inheritance.php"
    }
  ],
  "sources": [
    {
      "title": "La classe Exception",
      "url": "https://www.php.net/manual/fr/class.exception.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Héritage",
      "url": "https://www.php.net/manual/fr/language.oop5.inheritance.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Le niveau débutant utilisait les exceptions existantes de PHP. Dans un vrai programme, il est utile de créer ses propres types d’erreurs, qui décrivent les problèmes du domaine : stock insuffisant, inscription en double, paiement refusé. Une exception personnalisée est simplement une classe qui hérite d’Exception : class StockInsuffisant extends Exception {}. Elle n’a souvent besoin d’aucun code : son nom suffit à la distinguer.

On la lève avec throw new StockInsuffisant("Il reste seulement 3 articles"). Le message, lu ensuite avec getMessage(), explique le problème à la personne qui lira l’erreur. Choisis l’exception selon la nature du problème : InvalidArgumentException pour une valeur absurde passée par l’appelant, une exception métier comme StockInsuffisant pour une situation normale du commerce qui empêche l’opération.

Un même bloc try peut être suivi de plusieurs catch, chacun pour un type d’exception. PHP essaie les catch dans l’ordre et utilise le premier dont le type correspond, y compris par héritage. L’ordre compte donc : un catch (Exception $e) placé en premier attrape tout, car toutes les exceptions héritent d’Exception, et les catch plus précis placés après ne servent jamais. Range toujours les catch du plus précis au plus général. On peut aussi regrouper plusieurs types dans un même catch avec une barre verticale : catch (StockInsuffisant | InvalidArgumentException $e).

Le bloc finally s’exécute toujours, que le try réussisse, lève une exception ou contienne un return. Il sert à libérer ou à journaliser : fermer un fichier, remettre un compteur à zéro, écrire « opération terminée » dans un journal. Il ne doit pas cacher l’erreur : si une exception n’est pas interceptée, elle continue sa remontée après le finally.

Une précision sur l’affichage : dans echo "Reste : ", vendre($q);, PHP affiche les arguments un par un. Si vendre lève une exception, « Reste : » a déjà été affiché. Range d’abord le résultat dans une variable, puis affiche-le : l’affichage reste cohérent même en cas d’erreur.

Enfin, une exception interceptée doit être traitée, pas ignorée. Un catch vide, qui avale l’erreur sans rien faire, est l’un des défauts les plus difficiles à dépanner : le programme continue avec des données fausses et personne ne sait pourquoi. Au minimum, journalise le message ou transforme l’erreur en résultat explicite.

## Exemple guidé 1

```php
<?php
class StockInsuffisant extends Exception
{
}

function vendre(int $stock, int $quantite): int
{
    if ($quantite <= 0) {
        throw new InvalidArgumentException("Quantité invalide");
    }
    if ($quantite > $stock) {
        throw new StockInsuffisant("Il reste seulement $stock article(s)");
    }
    return $stock - $quantite;
}

foreach ([3, 0, 50] as $q) {
    try {
        $reste = vendre(10, $q);
        echo "Reste : $reste\n";
    } catch (StockInsuffisant $e) {
        echo "Stock : ", $e->getMessage(), "\n";
    } catch (InvalidArgumentException $e) {
        echo "Erreur : ", $e->getMessage(), "\n";
    }
}
```

Affichage attendu :

    Reste : 7
    Erreur : Quantité invalide
    Stock : Il reste seulement 10 article(s)

Trace :

- La vente de 3 réussit.
- Une quantité nulle lève InvalidArgumentException.
- Une quantité de 50 lève StockInsuffisant, interceptée par son propre catch.

## Exemple guidé 2

```php
<?php
function traiter(string $texte): string
{
    try {
        if (!is_numeric($texte)) {
            throw new InvalidArgumentException("« $texte » n'est pas un nombre");
        }
        return "Lu : " . ($texte * 2);
    } finally {
        echo "[ligne traitée]\n";
    }
}

foreach (["21", "abc"] as $t) {
    try {
        echo traiter($t), "\n";
    } catch (InvalidArgumentException $e) {
        echo $e->getMessage(), "\n";
    }
}
```

Affichage attendu :

    [ligne traitée]
    Lu : 42
    [ligne traitée]
    « abc » n'est pas un nombre

Trace :

- finally s’exécute avant le return de la première ligne.
- Il s’exécute aussi quand l’exception remonte.
- L’exception est ensuite interceptée par l’appelant.

## Vérifier et expliquer

Pour chaque quantité de l’exemple, prédis quel catch s’exécute avant de lancer le programme.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [La classe Exception](https://www.php.net/manual/fr/class.exception.php)
- [Héritage](https://www.php.net/manual/fr/language.oop5.inheritance.php)
