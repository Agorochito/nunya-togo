---
{
  "id": "phpi-m1-02",
  "title_fr": "Transformer des tableaux : map, filter, reduce et tri",
  "course": "php-intermediaire",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "phpi-m1-01"
  ],
  "outcomes": [
    "Transformer, filtrer et résumer un tableau avec array_map, array_filter et array_reduce.",
    "Trier un tableau de tableaux avec usort et l’opérateur <=>."
  ],
  "idea_fr": "Au lieu d’écrire une boucle pour chaque besoin, on décrit l’opération à appliquer et PHP la répète sur chaque élément.",
  "analogy_fr": "À la chaîne d’emballage, chaque poste fait une seule chose : trier les fruits, enlever les abîmés, compter les caisses. Mis bout à bout, les postes produisent la commande.",
  "examples": [
    {
      "code": "<?php\n$prix = [600, 250, 1200];\n$ttc = array_map(fn($p) => (int) round($p * 1.18), $prix);\n$chers = array_filter($prix, fn($p) => $p > 500);\n$total = array_reduce($prix, fn($s, $p) => $s + $p, 0);\necho implode(\", \", $ttc), \"\\n\";\necho json_encode($chers), \" puis \", json_encode(array_values($chers)), \"\\n\";\necho $total, \"\\n\";",
      "expected_output": "708, 295, 1416\n{\"0\":600,\"2\":1200} puis [600,1200]\n2050",
      "inputs": [],
      "trace_fr": [
        "array_map applique la TVA à chaque prix.",
        "array_filter retire le savon mais garde les clés 0 et 2 ; array_values renumérote.",
        "array_reduce additionne en partant de 0."
      ]
    },
    {
      "code": "<?php\n$produits = [\n    [\"nom\" => \"Savon\", \"prix\" => 250],\n    [\"nom\" => \"Riz\", \"prix\" => 600],\n    [\"nom\" => \"Cahier\", \"prix\" => 250],\n];\nusort($produits, fn($a, $b) => ($a[\"prix\"] <=> $b[\"prix\"]) ?: strcmp($a[\"nom\"], $b[\"nom\"]));\necho implode(\", \", array_column($produits, \"nom\")), \"\\n\";",
      "expected_output": "Cahier, Savon, Riz",
      "inputs": [],
      "trace_fr": [
        "<=> compare les prix.",
        "À prix égal, strcmp départage par nom.",
        "array_column extrait la colonne nom."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier array_values après array_filter",
      "why_fr": "Les clés gardent des trous et le JSON devient un objet.",
      "fix_fr": "Entoure le résultat de array_values."
    },
    {
      "error": "Écrire $tries = usort(…)",
      "why_fr": "usort renvoie true, pas le tableau trié.",
      "fix_fr": "Trie le tableau sur place, puis utilise-le."
    },
    {
      "error": "Oublier la valeur initiale de array_reduce",
      "why_fr": "L’accumulateur commence à null.",
      "fix_fr": "Donne 0 ou [] en troisième argument."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie array_map ?",
      "options": [
        "Le tableau modifié sur place",
        "Un nouveau tableau de résultats",
        "true",
        "Un nombre"
      ],
      "answer": 1,
      "explanation": "Le tableau d’origine ne change pas.",
      "id": "phpi-m1-02-q1"
    },
    {
      "question": "Que vaut 3 <=> 5 ?",
      "options": [
        "-1",
        "0",
        "1",
        "true"
      ],
      "answer": 0,
      "explanation": "Négatif quand le premier est plus petit.",
      "id": "phpi-m1-02-q2"
    },
    {
      "question": "Pourquoi array_values après array_filter ?",
      "options": [
        "Pour trier",
        "Pour renuméroter les clés",
        "Pour copier",
        "Pour supprimer les doublons"
      ],
      "answer": 1,
      "explanation": "array_filter garde les clés d’origine.",
      "id": "phpi-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction fléchée",
      "definition": "Fonction courte fn($x) => expression, qui voit les variables extérieures."
    },
    {
      "term": "array_map",
      "definition": "Applique une fonction à chaque élément."
    },
    {
      "term": "array_reduce",
      "definition": "Résume un tableau en une valeur avec un accumulateur."
    },
    {
      "term": "<=>",
      "definition": "Opérateur de comparaison qui renvoie -1, 0 ou 1."
    }
  ],
  "recap_fr": [
    "Transformer, filtrer et résumer un tableau avec array_map, array_filter et array_reduce.",
    "Trier un tableau de tableaux avec usort et l’opérateur <=>.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "fonction fléchée",
    "array_map",
    "array_reduce",
    "<=>"
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
      "title": "Fonctions fléchées",
      "url": "https://www.php.net/manual/fr/functions.arrow.php"
    },
    {
      "title": "array_map",
      "url": "https://www.php.net/manual/fr/function.array-map.php"
    },
    {
      "title": "array_filter",
      "url": "https://www.php.net/manual/fr/function.array-filter.php"
    },
    {
      "title": "usort",
      "url": "https://www.php.net/manual/fr/function.usort.php"
    }
  ],
  "sources": [
    {
      "title": "Fonctions fléchées",
      "url": "https://www.php.net/manual/fr/functions.arrow.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "array_map",
      "url": "https://www.php.net/manual/fr/function.array-map.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "array_filter",
      "url": "https://www.php.net/manual/fr/function.array-filter.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "usort",
      "url": "https://www.php.net/manual/fr/function.usort.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Beaucoup de boucles suivent trois schémas : transformer chaque élément, garder certains éléments, ou résumer tout le tableau en une valeur. PHP fournit une fonction pour chacun, et une syntaxe courte pour écrire l’opération : la fonction fléchée.

Une fonction fléchée s’écrit fn($p) => $p * 2. Elle prend des paramètres et renvoie l’expression après la flèche. Elle voit automatiquement les variables du code qui l’entoure : fn($p) => $p * $taux utilise $taux sans rien déclarer. Pour un corps de plusieurs instructions, on utilise une fonction anonyme classique, function ($p) { … }, avec use pour les variables extérieures.

array_map($fonction, $tableau) applique la fonction à chaque élément et renvoie un nouveau tableau de résultats, dans le même ordre. Le tableau d’origine ne change pas. array_filter($tableau, $fonction) garde les éléments pour lesquels la fonction renvoie vrai. Attention : array_filter conserve les clés d’origine. Après avoir retiré l’élément d’indice 1, les clés restantes sont 0 et 2, et le tableau ressemble à un dictionnaire une fois encodé en JSON. Entoure le résultat de array_values pour obtenir une liste renumérotée.

array_reduce($tableau, $fonction, $initial) parcourt le tableau en accumulant : la fonction reçoit l’accumulateur et l’élément, et renvoie le nouvel accumulateur. Pour une somme, fn($total, $p) => $total + $p['prix'], en partant de 0. N’oublie pas la valeur initiale : sans elle, l’accumulateur commence à null.

Pour trier selon un critère, usort($tableau, $fonction) utilise une fonction de comparaison qui renvoie un nombre négatif, zéro ou positif. L’opérateur vaisseau spatial <=> fait exactement cela : $a['prix'] <=> $b['prix'] trie par prix croissant, $b['prix'] <=> $a['prix'] par prix décroissant. Pour départager les ex aequo, on compare un second critère avec ?: : ($a['prix'] <=> $b['prix']) ?: strcmp($a['nom'], $b['nom']). usort modifie le tableau qu’on lui passe et renvoie seulement true : il ne faut pas écrire $tries = usort(…).

Ces fonctions se combinent en chaîne, du plus intérieur au plus extérieur : array_map pour extraire les noms, appliqué au résultat d’array_filter pour garder les produits en stock. Lis une telle ligne de l’intérieur vers l’extérieur, et n’hésite pas à la découper en variables intermédiaires nommées : la lisibilité compte plus que la longueur.

## Exemple guidé 1

```php
<?php
$prix = [600, 250, 1200];
$ttc = array_map(fn($p) => (int) round($p * 1.18), $prix);
$chers = array_filter($prix, fn($p) => $p > 500);
$total = array_reduce($prix, fn($s, $p) => $s + $p, 0);
echo implode(", ", $ttc), "\n";
echo json_encode($chers), " puis ", json_encode(array_values($chers)), "\n";
echo $total, "\n";
```

Affichage attendu :

    708, 295, 1416
    {"0":600,"2":1200} puis [600,1200]
    2050

Trace :

- array_map applique la TVA à chaque prix.
- array_filter retire le savon mais garde les clés 0 et 2 ; array_values renumérote.
- array_reduce additionne en partant de 0.

## Exemple guidé 2

```php
<?php
$produits = [
    ["nom" => "Savon", "prix" => 250],
    ["nom" => "Riz", "prix" => 600],
    ["nom" => "Cahier", "prix" => 250],
];
usort($produits, fn($a, $b) => ($a["prix"] <=> $b["prix"]) ?: strcmp($a["nom"], $b["nom"]));
echo implode(", ", array_column($produits, "nom")), "\n";
```

Affichage attendu :

    Cahier, Savon, Riz

Trace :

- <=> compare les prix.
- À prix égal, strcmp départage par nom.
- array_column extrait la colonne nom.

## Vérifier et expliquer

Pour chaque exemple, écris à la main le tableau obtenu à chaque étape, clés comprises, avant de lancer.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Fonctions fléchées](https://www.php.net/manual/fr/functions.arrow.php)
- [array_map](https://www.php.net/manual/fr/function.array-map.php)
- [array_filter](https://www.php.net/manual/fr/function.array-filter.php)
- [usort](https://www.php.net/manual/fr/function.usort.php)
