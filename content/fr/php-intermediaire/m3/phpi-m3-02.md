---
{
  "id": "phpi-m3-02",
  "title_fr": "Lire et écrire du JSON",
  "course": "php-intermediaire",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "phpi-m3-01"
  ],
  "outcomes": [
    "Transformer du JSON en tableaux PHP avec json_decode et des tableaux en JSON avec json_encode.",
    "Détecter un JSON invalide avec JSON_THROW_ON_ERROR et garder les accents avec JSON_UNESCAPED_UNICODE."
  ],
  "idea_fr": "JSON est la langue commune des applications : PHP le lit pour obtenir des tableaux, et l’écrit pour répondre aux autres programmes.",
  "analogy_fr": "Un formulaire officiel a des cases toujours au même endroit : n’importe quel guichet peut le lire. JSON est ce formulaire pour les programmes.",
  "examples": [
    {
      "code": "<?php\n$json = '[{\"produit\": \"Riz\", \"prix\": 600, \"quantite\": 2}, {\"produit\": \"Thé\", \"prix\": 400, \"quantite\": 3}, {\"produit\": \"Riz\", \"prix\": 600, \"quantite\": 1}]';\n$ventes = json_decode($json, true);\necho count($ventes), \" ventes, première : \", $ventes[0][\"produit\"], \"\\n\";\necho json_encode([\"produit\" => \"Thé\", \"prix\" => 400]), \"\\n\";\necho json_encode([\"produit\" => \"Thé\", \"prix\" => 400], JSON_UNESCAPED_UNICODE), \"\\n\";",
      "expected_output": "3 ventes, première : Riz\n{\"produit\":\"Th\\u00e9\",\"prix\":400}\n{\"produit\":\"Thé\",\"prix\":400}",
      "inputs": [],
      "trace_fr": [
        "json_decode avec true donne un tableau de tableaux.",
        "Sans option, é devient \\u00e9.",
        "JSON_UNESCAPED_UNICODE garde l’accent."
      ]
    },
    {
      "code": "<?php\nforeach (['{\"stock\": 12}', '{\"stock\": 12'] as $texte) {\n    try {\n        $donnees = json_decode($texte, true, 512, JSON_THROW_ON_ERROR);\n        echo \"Stock : \", $donnees[\"stock\"], \"\\n\";\n    } catch (JsonException $e) {\n        echo \"JSON invalide\\n\";\n    }\n}\nvar_dump(json_decode('{\"stock\": 12', true));",
      "expected_output": "Stock : 12\nJSON invalide\nNULL",
      "inputs": [],
      "trace_fr": [
        "Le premier texte est valide.",
        "Il manque l’accolade fermante au second : JsonException.",
        "Sans l’option, json_decode renvoie NULL en silence."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier true dans json_decode",
      "why_fr": "On obtient des objets stdClass, pas des tableaux.",
      "fix_fr": "Écris json_decode($texte, true)."
    },
    {
      "error": "Ignorer les erreurs de décodage",
      "why_fr": "Un JSON invalide devient null en silence.",
      "fix_fr": "Utilise JSON_THROW_ON_ERROR et intercepte JsonException."
    },
    {
      "error": "Encoder sans JSON_UNESCAPED_UNICODE",
      "why_fr": "Les accents deviennent des codes illisibles.",
      "fix_fr": "Ajoute l’option quand des humains liront le JSON."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie json_decode sur un texte invalide, sans option ?",
      "options": [
        "Une exception",
        "null",
        "false",
        "Un tableau vide"
      ],
      "answer": 1,
      "explanation": "Il échoue en silence.",
      "id": "phpi-m3-02-q1"
    },
    {
      "question": "Que devient une liste PHP [1, 2] avec json_encode ?",
      "options": [
        "{\"0\":1,\"1\":2}",
        "[1,2]",
        "\"1,2\"",
        "null"
      ],
      "answer": 1,
      "explanation": "Une liste aux clés 0, 1 devient un tableau JSON.",
      "id": "phpi-m3-02-q2"
    },
    {
      "question": "À quoi sert JSON_UNESCAPED_UNICODE ?",
      "options": [
        "À compresser",
        "À garder les caractères accentués lisibles",
        "À trier les clés",
        "À valider"
      ],
      "answer": 1,
      "explanation": "é reste é au lieu de \\u00e9.",
      "id": "phpi-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "JSON",
      "definition": "Format texte d’échange de données entre programmes."
    },
    {
      "term": "json_decode",
      "definition": "Transforme un texte JSON en valeurs PHP."
    },
    {
      "term": "json_encode",
      "definition": "Transforme des valeurs PHP en texte JSON."
    },
    {
      "term": "JsonException",
      "definition": "Exception levée par un JSON invalide avec JSON_THROW_ON_ERROR."
    }
  ],
  "recap_fr": [
    "Transformer du JSON en tableaux PHP avec json_decode et des tableaux en JSON avec json_encode.",
    "Détecter un JSON invalide avec JSON_THROW_ON_ERROR et garder les accents avec JSON_UNESCAPED_UNICODE.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "JSON",
    "json_decode",
    "json_encode",
    "JsonException"
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
      "title": "json_decode",
      "url": "https://www.php.net/manual/fr/function.json-decode.php"
    },
    {
      "title": "json_encode",
      "url": "https://www.php.net/manual/fr/function.json-encode.php"
    }
  ],
  "sources": [
    {
      "title": "json_decode",
      "url": "https://www.php.net/manual/fr/function.json-decode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "json_encode",
      "url": "https://www.php.net/manual/fr/function.json-encode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Quand une application mobile envoie une commande à un serveur PHP, ou qu’un service de paiement répond à une boutique en ligne, les données voyagent presque toujours au format JSON. C’est un texte qui ressemble aux tableaux de PHP : des listes entre crochets, des objets entre accolades avec des clés entre guillemets, des nombres, des textes, true, false et null.

json_decode($texte, true) transforme un texte JSON en tableau PHP. Le second argument, true, est important : il demande des tableaux associatifs. Sans lui, les objets JSON deviennent des objets stdClass, qu’on lit avec -> et non avec des crochets ; écrire $vente['prix'] sur un tel objet provoque une erreur.

En sens inverse, json_encode($tableau) produit un texte JSON. Une liste PHP, aux clés 0, 1, 2, devient un tableau JSON ; un tableau associatif devient un objet JSON. Attention au piège déjà vu avec array_filter : une liste avec des trous dans ses clés devient un objet ; array_values la remet en liste.

Par défaut, json_encode remplace les lettres accentuées par des codes, comme \u00e9 pour é. Le résultat reste valide, mais il est illisible pour un humain. L’option JSON_UNESCAPED_UNICODE garde les caractères tels quels. JSON_PRETTY_PRINT ajoute des retours à la ligne et une indentation, utile pour un fichier lu par des personnes. Les options se combinent avec une barre verticale : JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT.

Le plus grand piège concerne les erreurs. Si le texte n’est pas du JSON valide, json_decode renvoie simplement null, sans rien signaler. Un programme qui continue avec null produit des erreurs plus loin, difficiles à comprendre. L’option JSON_THROW_ON_ERROR change ce comportement : un JSON invalide lève une JsonException, qu’on intercepte pour répondre clairement « JSON invalide ». C’est la bonne pratique dès que les données viennent de l’extérieur.

Ne fais jamais confiance à la structure reçue. Un JSON valide peut manquer d’une clé ou contenir un texte là où l’on attend un nombre. Vérifie avec isset, is_int ou is_string avant d’utiliser une valeur, exactement comme pour une saisie de formulaire. Les données de ce cours sont écrites dans le programme : l’atelier n’a ni réseau ni fichier, mais le traitement serait le même pour une réponse reçue d’un vrai service.

## Exemple guidé 1

```php
<?php
$json = '[{"produit": "Riz", "prix": 600, "quantite": 2}, {"produit": "Thé", "prix": 400, "quantite": 3}, {"produit": "Riz", "prix": 600, "quantite": 1}]';
$ventes = json_decode($json, true);
echo count($ventes), " ventes, première : ", $ventes[0]["produit"], "\n";
echo json_encode(["produit" => "Thé", "prix" => 400]), "\n";
echo json_encode(["produit" => "Thé", "prix" => 400], JSON_UNESCAPED_UNICODE), "\n";
```

Affichage attendu :

    3 ventes, première : Riz
    {"produit":"Th\u00e9","prix":400}
    {"produit":"Thé","prix":400}

Trace :

- json_decode avec true donne un tableau de tableaux.
- Sans option, é devient \u00e9.
- JSON_UNESCAPED_UNICODE garde l’accent.

## Exemple guidé 2

```php
<?php
foreach (['{"stock": 12}', '{"stock": 12'] as $texte) {
    try {
        $donnees = json_decode($texte, true, 512, JSON_THROW_ON_ERROR);
        echo "Stock : ", $donnees["stock"], "\n";
    } catch (JsonException $e) {
        echo "JSON invalide\n";
    }
}
var_dump(json_decode('{"stock": 12', true));
```

Affichage attendu :

    Stock : 12
    JSON invalide
    NULL

Trace :

- Le premier texte est valide.
- Il manque l’accolade fermante au second : JsonException.
- Sans l’option, json_decode renvoie NULL en silence.

## Vérifier et expliquer

Supprime volontairement une virgule ou une accolade dans le JSON d’un exemple et observe la différence avec et sans JSON_THROW_ON_ERROR.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [json_decode](https://www.php.net/manual/fr/function.json-decode.php)
- [json_encode](https://www.php.net/manual/fr/function.json-encode.php)
