---
{
  "id": "phpi-m1-03",
  "title_fr": "Mettre en forme : sprintf, number_format et match",
  "course": "php-intermediaire",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "phpi-m1-02"
  ],
  "outcomes": [
    "Formater des nombres et aligner des colonnes avec number_format et sprintf.",
    "Choisir une valeur avec l’expression match, plus sûre qu’un switch."
  ],
  "idea_fr": "Un programme utile ne calcule pas seulement juste : il présente ses résultats clairement, comme un ticket de caisse lisible.",
  "analogy_fr": "Un bon ticket de caisse aligne les articles à gauche et les prix à droite, avec des espaces entre les milliers. La même information devient lisible d’un coup d’œil.",
  "examples": [
    {
      "code": "<?php\necho number_format(1234567, 0, \",\", \" \"), \" FCFA\\n\";\necho number_format(1234.567, 2, \",\", \" \"), \"\\n\";\nprintf(\"%-8s|%6d|\\n\", \"Riz\", 600);\nprintf(\"%-8s|%6d|\\n\", \"Huile\", 1200);",
      "expected_output": "1 234 567 FCFA\n1 234,57\nRiz     |   600|\nHuile   |  1200|",
      "inputs": [],
      "trace_fr": [
        "number_format ajoute les espaces entre milliers.",
        "Avec 2 décimales, 1234.567 devient 1 234,57.",
        "%-8s aligne à gauche, %6d à droite."
      ]
    },
    {
      "code": "<?php\nforeach ([\"P\", \"A\", \"X\"] as $code) {\n    $statut = match ($code) {\n        \"P\" => \"payé\",\n        \"A\" => \"en attente\",\n        default => \"inconnu\",\n    };\n    echo $code, \" : \", $statut, \"\\n\";\n}",
      "expected_output": "P : payé\nA : en attente\nX : inconnu",
      "inputs": [],
      "trace_fr": [
        "match compare chaque code avec ===.",
        "Pas de break : chaque branche renvoie une valeur.",
        "default couvre les codes imprévus."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Concaténer un nombre brut",
      "why_fr": "Les grands montants deviennent illisibles.",
      "fix_fr": "Utilise number_format."
    },
    {
      "error": "Oublier default dans match",
      "why_fr": "Une valeur imprévue provoque UnhandledMatchError.",
      "fix_fr": "Ajoute default si tous les cas ne sont pas couverts."
    },
    {
      "error": "Aligner des noms accentués",
      "why_fr": "Les largeurs comptent des octets.",
      "fix_fr": "Garde des noms sans accent dans les colonnes alignées."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie number_format(2500, 0, \",\", \" \") ?",
      "options": [
        "'2500'",
        "'2 500'",
        "'2,500'",
        "'2 500,00'"
      ],
      "answer": 1,
      "explanation": "Une espace sépare les milliers.",
      "id": "phpi-m1-03-q1"
    },
    {
      "question": "Quelle différence entre match et switch ?",
      "options": [
        "Aucune",
        "match compare avec === et renvoie une valeur",
        "match est plus lent",
        "switch renvoie une valeur"
      ],
      "answer": 1,
      "explanation": "match est strict et sans break.",
      "id": "phpi-m1-03-q2"
    },
    {
      "question": "Que fait %6d dans sprintf ?",
      "options": [
        "Six décimales",
        "Un entier aligné à droite sur 6 caractères",
        "Six entiers",
        "Un texte"
      ],
      "answer": 1,
      "explanation": "La largeur aligne les colonnes.",
      "id": "phpi-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "number_format",
      "definition": "Fonction qui met en forme un nombre avec séparateurs."
    },
    {
      "term": "sprintf",
      "definition": "Fonction qui assemble un texte selon un modèle."
    },
    {
      "term": "match",
      "definition": "Expression qui choisit une valeur avec une comparaison stricte."
    },
    {
      "term": "UnhandledMatchError",
      "definition": "Erreur levée quand match ne trouve aucune branche."
    }
  ],
  "recap_fr": [
    "Formater des nombres et aligner des colonnes avec number_format et sprintf.",
    "Choisir une valeur avec l’expression match, plus sûre qu’un switch.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "number_format",
    "sprintf",
    "match",
    "UnhandledMatchError"
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
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php"
    },
    {
      "title": "sprintf",
      "url": "https://www.php.net/manual/fr/function.sprintf.php"
    },
    {
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php"
    }
  ],
  "sources": [
    {
      "title": "number_format",
      "url": "https://www.php.net/manual/fr/function.number-format.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "sprintf",
      "url": "https://www.php.net/manual/fr/function.sprintf.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Afficher 1234567 n’aide personne ; afficher 1 234 567 FCFA, si. La fonction number_format met en forme un nombre : number_format($montant, 0, ',', ' ') l’écrit sans décimale, avec une virgule comme séparateur décimal et une espace entre les milliers, selon l’usage français. Avec 2 en deuxième argument, on obtient deux décimales arrondies.

Pour assembler un texte à partir de valeurs, sprintf utilise un modèle avec des marqueurs. %s insère un texte, %d un entier, %.2f un nombre à deux décimales. On peut fixer une largeur : %-10s aligne un texte à gauche sur 10 caractères, %6d aligne un entier à droite sur 6. C’est ainsi qu’on produit des colonnes bien alignées dans un ticket ou un rapport en texte. printf fait la même chose, mais affiche directement le résultat au lieu de le renvoyer.

Attention aux caractères accentués. Les fonctions de largeur de sprintf, comme strlen, comptent des octets, pas des lettres : un é occupe deux octets en UTF-8. Un nom accentué semble donc décalé d’un cran dans une colonne. Les fonctions mb_*, qui comptent les vraies lettres, ne sont pas disponibles dans l’atelier ; on garde des noms sans accent dans les colonnes alignées, ou l’on accepte ce petit décalage.

Les fonctions explode et implode découpent et recollent : explode(' ', 'Kossi Mensah') donne un tableau de deux mots, implode(', ', $noms) les assemble avec une virgule. str_contains, str_starts_with et str_ends_with, apparues en PHP 8, testent la présence d’un morceau de texte, plus lisiblement que strpos.

L’expression match, aussi apparue en PHP 8, choisit une valeur selon une autre. match($code) { 'P' => 'payé', 'A' => 'en attente', default => 'inconnu' } renvoie directement la valeur correspondante. Contrairement à switch, match compare avec ===, sans conversion de type, n’a pas besoin de break, et renvoie une valeur qu’on peut ranger dans une variable. Sans branche default, une valeur imprévue provoque une erreur UnhandledMatchError, ce qui est préférable à un résultat silencieusement faux.

Pour des intervalles, on écrit match(true) avec des conditions comme clés : match(true) { $note >= 16 => 'Très bien', $note >= 10 => 'Admis', default => 'Ajourné' }. La première condition vraie gagne, comme pour une suite de if.

## Exemple guidé 1

```php
<?php
echo number_format(1234567, 0, ",", " "), " FCFA\n";
echo number_format(1234.567, 2, ",", " "), "\n";
printf("%-8s|%6d|\n", "Riz", 600);
printf("%-8s|%6d|\n", "Huile", 1200);
```

Affichage attendu :

    1 234 567 FCFA
    1 234,57
    Riz     |   600|
    Huile   |  1200|

Trace :

- number_format ajoute les espaces entre milliers.
- Avec 2 décimales, 1234.567 devient 1 234,57.
- %-8s aligne à gauche, %6d à droite.

## Exemple guidé 2

```php
<?php
foreach (["P", "A", "X"] as $code) {
    $statut = match ($code) {
        "P" => "payé",
        "A" => "en attente",
        default => "inconnu",
    };
    echo $code, " : ", $statut, "\n";
}
```

Affichage attendu :

    P : payé
    A : en attente
    X : inconnu

Trace :

- match compare chaque code avec ===.
- Pas de break : chaque branche renvoie une valeur.
- default couvre les codes imprévus.

## Vérifier et expliquer

Imprime un petit ticket avec trois articles et vérifie que les prix tombent exactement les uns sous les autres.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [number_format](https://www.php.net/manual/fr/function.number-format.php)
- [sprintf](https://www.php.net/manual/fr/function.sprintf.php)
- [match](https://www.php.net/manual/fr/control-structures.match.php)
