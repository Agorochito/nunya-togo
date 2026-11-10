---
{
  "id": "php-m4-03",
  "title_fr": "Projet : la caisse de la boutique",
  "course": "php-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "php-m4-02"
  ],
  "outcomes": [
    "Découper un programme complet en fonctions testées séparément.",
    "Lire des données structurées, valider chaque ligne et produire un reçu lisible."
  ],
  "idea_fr": "Un projet assemble tout le cours : lire, valider, calculer avec des fonctions et présenter le résultat.",
  "analogy_fr": "Une boutique bien tenue a un cahier des prix, une balance juste et un carnet de reçus : chaque outil fait une seule chose, et tout s’enchaîne.",
  "examples": [
    {
      "code": "<?php\nfunction ligneTotal(int $prix, int $quantite): int\n{\n    return $prix * $quantite;\n}\n\nfunction remise(int $montant): int\n{\n    return match (true) {\n        $montant >= 25000 => 10,\n        $montant >= 10000 => 5,\n        default => 0,\n    };\n}\n\nfunction montantFinal(int $montant): int\n{\n    return $montant - intdiv($montant * remise($montant), 100);\n}\n\nforeach ([8000, 12000, 30000] as $m) {\n    echo \"$m → remise \", remise($m), \" % → \", montantFinal($m), \"\\n\";\n}",
      "expected_output": "8000 → remise 0 % → 8000\n12000 → remise 5 % → 11400\n30000 → remise 10 % → 27000",
      "inputs": [],
      "trace_fr": [
        "Les trois fonctions de calcul sont écrites d’abord.",
        "remise renvoie 0, 5 ou 10 selon le montant.",
        "montantFinal retire le pourcentage calculé.",
        "Une boucle vérifie trois cas avant d’écrire la caisse."
      ]
    },
    {
      "code": "<?php\n$catalogue = [\"SAV\" => 350, \"HUI\" => 1250];\n\nfunction ligneValide(string $ligne, array $catalogue): bool\n{\n    $morceaux = explode(\":\", $ligne);\n    if (count($morceaux) !== 2) {\n        return false;\n    }\n    return array_key_exists($morceaux[0], $catalogue) && (int) $morceaux[1] > 0;\n}\n\nforeach ([\"SAV:3\", \"THE:2\", \"HUI:0\", \"HUI\"] as $ligne) {\n    echo str_pad($ligne, 6), ligneValide($ligne, $catalogue) ? \"acceptée\" : \"refusée\", \"\\n\";\n}",
      "expected_output": "SAV:3 acceptée\nTHE:2 refusée\nHUI:0 refusée\nHUI   refusée",
      "inputs": [],
      "trace_fr": [
        "Une ligne valide contient exactement deux morceaux.",
        "Le code doit exister dans le catalogue.",
        "La quantité doit être strictement positive.",
        "Chaque ligne fausse est refusée sans faire planter le programme."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire tout le programme d’un seul bloc",
      "why_fr": "Une erreur devient très difficile à localiser.",
      "fix_fr": "Écris et vérifie chaque fonction avant de les assembler."
    },
    {
      "error": "Faire confiance aux saisies",
      "why_fr": "Un code inconnu ou une quantité négative fausse le total.",
      "fix_fr": "Valide chaque ligne avant de l’utiliser."
    },
    {
      "error": "Formater les montants avant de les additionner",
      "why_fr": "Un montant formaté est un texte.",
      "fix_fr": "Calcule avec des entiers, formate à l’affichage."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi tester chaque fonction séparément avant de les assembler ?",
      "options": [
        "Pour que le programme soit plus long.",
        "Pour localiser une erreur dans un petit morceau de code.",
        "Parce que PHP l’exige.",
        "Pour éviter d’utiliser return."
      ],
      "answer": 1,
      "explanation": "Une fonction testée seule réduit la zone où une erreur peut se cacher.",
      "id": "php-m4-03-q1"
    },
    {
      "question": "Que doit faire le programme avec la ligne THE:2 si THE n’est pas au catalogue ?",
      "options": [
        "Planter avec une erreur.",
        "Compter 0 FCFA sans prévenir.",
        "Refuser la ligne et la signaler.",
        "Inventer un prix."
      ],
      "answer": 2,
      "explanation": "Une ligne invalide est refusée et signalée.",
      "id": "php-m4-03-q2"
    },
    {
      "question": "Avec 5 % de remise dès 10 000 FCFA, que vaut montantFinal(10000) ?",
      "options": [
        "10000",
        "9500",
        "9000",
        "500"
      ],
      "answer": 1,
      "explanation": "10 000 atteint le seuil : 5 % de remise, soit 500 FCFA.",
      "id": "php-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "découpage",
      "definition": "Division d’un problème en fonctions courtes et nommées."
    },
    {
      "term": "validation",
      "definition": "Contrôle d’une donnée avant son utilisation."
    },
    {
      "term": "catalogue",
      "definition": "Tableau associatif qui relie un code d’article à son prix."
    },
    {
      "term": "reçu",
      "definition": "Affichage final récapitulant les achats et le total."
    }
  ],
  "recap_fr": [
    "Découper un programme complet en fonctions testées séparément.",
    "Lire des données structurées, valider chaque ligne et produire un reçu lisible.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "découpage",
    "validation",
    "catalogue",
    "reçu"
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
      "title": "explode",
      "url": "https://www.php.net/manual/fr/function.explode.php"
    },
    {
      "title": "printf",
      "url": "https://www.php.net/manual/fr/function.printf.php"
    },
    {
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php"
    },
    {
      "title": "array_key_exists",
      "url": "https://www.php.net/manual/fr/function.array-key-exists.php"
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
      "title": "explode",
      "url": "https://www.php.net/manual/fr/function.explode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "printf",
      "url": "https://www.php.net/manual/fr/function.printf.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "array_key_exists",
      "url": "https://www.php.net/manual/fr/function.array-key-exists.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Ce dernier chapitre réunit tout le cours dans un programme complet : la caisse de la boutique de Yawa. La caissière saisit les achats d’un client, le programme vérifie chaque ligne, calcule le total, applique une remise de fidélité et affiche un reçu. Avant d’écrire la moindre ligne, il faut découper le problème.

Commence par les données. Un tableau associatif $catalogue relie chaque code d’article à son prix : ["SAV" => 350, "HUI" => 1250, …]. Chaque achat arrive sous la forme CODE:QUANTITE, une ligne par article, précédée du nombre de lignes. explode(":") sépare le code et la quantité, comme au chapitre précédent.

Vient ensuite la validation. Une ligne peut être fausse : un code inconnu, une quantité nulle ou négative, un séparateur oublié. Le programme ne doit ni planter ni compter une ligne invalide. Chaque ligne passe par une fonction de validation qui renvoie true ou false. Les lignes refusées sont comptées et signalées à la fin, pour que la caissière les corrige. C’est un principe général : ne jamais faire confiance à une saisie avant de l’avoir vérifiée.

Le calcul se découpe à son tour en petites fonctions. ligneTotal multiplie un prix par une quantité. remise décide du pourcentage de réduction : 5 % à partir de 10 000 FCFA, 10 % à partir de 25 000 FCFA. montantFinal applique cette remise. Chaque fonction est courte, porte un nom clair et se vérifie seule, avec quelques appels choisis. Une fois testées, on les assemble sans crainte : une erreur dans le reçu se trouve alors dans le programme principal, pas dans les calculs.

Le reçu enfin doit être lisible. printf aligne les colonnes : code, quantité et montant. number_format ajoute les espaces des milliers. Les codes d’articles sont sans accent, ce qui garantit des colonnes droites.

L’ordre de travail compte autant que le code. Écris d’abord les fonctions de calcul et vérifie-les avec des valeurs simples. Ajoute ensuite la lecture des lignes, en affichant chaque ligne lue. Puis ajoute la validation, et enfin la mise en forme. À chaque étape, le programme fonctionne : tu n’accumules pas vingt lignes non testées. Les deux exemples suivent cette progression.

Ce projet n’est qu’un début. Un vrai logiciel de caisse enregistrerait les ventes dans une base de données, présenterait une page web au lieu d’un affichage en console et protégerait l’accès par un mot de passe. Ces sujets appartiennent à la suite du parcours : bases de données avec SQL, pages dynamiques avec PHP côté serveur. Les notions que tu maîtrises maintenant, variables, conditions, boucles, tableaux, fonctions et validation, restent le cœur de tous ces programmes.

Pour terminer le cours, relis ton code comme une autre personne le lirait : les noms sont-ils clairs ? Chaque fonction fait-elle une seule chose ? Une saisie absurde est-elle refusée proprement ?

## Exemple guidé 1

```php
<?php
function ligneTotal(int $prix, int $quantite): int
{
    return $prix * $quantite;
}

function remise(int $montant): int
{
    return match (true) {
        $montant >= 25000 => 10,
        $montant >= 10000 => 5,
        default => 0,
    };
}

function montantFinal(int $montant): int
{
    return $montant - intdiv($montant * remise($montant), 100);
}

foreach ([8000, 12000, 30000] as $m) {
    echo "$m → remise ", remise($m), " % → ", montantFinal($m), "\n";
}
```

Affichage attendu :

    8000 → remise 0 % → 8000
    12000 → remise 5 % → 11400
    30000 → remise 10 % → 27000

Trace :

- Les trois fonctions de calcul sont écrites d’abord.
- remise renvoie 0, 5 ou 10 selon le montant.
- montantFinal retire le pourcentage calculé.
- Une boucle vérifie trois cas avant d’écrire la caisse.

## Exemple guidé 2

```php
<?php
$catalogue = ["SAV" => 350, "HUI" => 1250];

function ligneValide(string $ligne, array $catalogue): bool
{
    $morceaux = explode(":", $ligne);
    if (count($morceaux) !== 2) {
        return false;
    }
    return array_key_exists($morceaux[0], $catalogue) && (int) $morceaux[1] > 0;
}

foreach (["SAV:3", "THE:2", "HUI:0", "HUI"] as $ligne) {
    echo str_pad($ligne, 6), ligneValide($ligne, $catalogue) ? "acceptée" : "refusée", "\n";
}
```

Affichage attendu :

    SAV:3 acceptée
    THE:2 refusée
    HUI:0 refusée
    HUI   refusée

Trace :

- Une ligne valide contient exactement deux morceaux.
- Le code doit exister dans le catalogue.
- La quantité doit être strictement positive.
- Chaque ligne fausse est refusée sans faire planter le programme.

## Vérifier et expliquer

Avance par étapes : fonctions, puis lecture, puis validation, puis mise en forme. Relance le programme après chaque étape.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les fonctions](https://www.php.net/manual/fr/language.functions.php)
- [explode](https://www.php.net/manual/fr/function.explode.php)
- [printf](https://www.php.net/manual/fr/function.printf.php)
- [number_format](https://www.php.net/manual/fr/function.number-format.php)
- [array_key_exists](https://www.php.net/manual/fr/function.array-key-exists.php)
