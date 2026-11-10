---
{
  "id": "phpi-m1-01",
  "title_fr": "Des fonctions typées et sûres",
  "course": "php-intermediaire",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "php-m4-03"
  ],
  "outcomes": [
    "Déclarer les types des paramètres et du retour, avec strict_types, valeurs par défaut et types nullables.",
    "Appeler une fonction avec des arguments nommés et intercepter une TypeError."
  ],
  "idea_fr": "Un type annoncé est un contrat : la fonction promet ce qu’elle accepte et ce qu’elle rend, et PHP vérifie ce contrat à chaque appel.",
  "analogy_fr": "Un guichet de la mairie n’accepte que certains formulaires. Écrit sur la porte, le règlement évite les files d’attente inutiles.",
  "examples": [
    {
      "code": "<?php\ndeclare(strict_types=1);\n\nfunction prixTtc(int $prixHt, float $taux = 0.18): int\n{\n    return (int) round($prixHt * (1 + $taux));\n}\n\necho prixTtc(1000), \"\\n\";\necho prixTtc(1000, 0.10), \"\\n\";\necho prixTtc(taux: 0.0, prixHt: 500), \"\\n\";",
      "expected_output": "1180\n1100\n500",
      "inputs": [],
      "trace_fr": [
        "Sans taux, la valeur par défaut 0.18 s’applique.",
        "Le deuxième appel fournit 0.10.",
        "Les arguments nommés s’écrivent dans n’importe quel ordre."
      ]
    },
    {
      "code": "<?php\ndeclare(strict_types=1);\n\nfunction double(int $n): int\n{\n    return $n * 2;\n}\n\ntry {\n    echo double(\"21\"), \"\\n\";\n} catch (TypeError $e) {\n    echo \"Refusé : un texte n'est pas un entier\\n\";\n}\necho double(21), \"\\n\";",
      "expected_output": "Refusé : un texte n'est pas un entier\n42",
      "inputs": [],
      "trace_fr": [
        "strict_types interdit la conversion du texte \"21\".",
        "La TypeError est interceptée.",
        "L’appel avec un vrai entier fonctionne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier declare(strict_types=1)",
      "why_fr": "PHP convertit en silence et masque les erreurs.",
      "fix_fr": "Place-le en première instruction du fichier."
    },
    {
      "error": "Mettre un paramètre optionnel avant un obligatoire",
      "why_fr": "L’appel devient ambigu.",
      "fix_fr": "Range les paramètres avec valeur par défaut à la fin."
    },
    {
      "error": "Oublier un cas limite dans une fonction typée",
      "why_fr": "Une branche renvoie un mauvais type ou divise par zéro.",
      "fix_fr": "Traite chaque cas, comme la liste vide."
    }
  ],
  "quiz": [
    {
      "question": "Que fait declare(strict_types=1) ?",
      "options": [
        "Accélère le programme",
        "Interdit les conversions automatiques de types aux appels",
        "Ajoute des types",
        "Masque les erreurs"
      ],
      "answer": 1,
      "explanation": "Un mauvais type provoque une TypeError.",
      "id": "phpi-m1-01-q1"
    },
    {
      "question": "Que signifie ?string ?",
      "options": [
        "Un texte obligatoire",
        "Un texte ou null",
        "Un texte vide",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Le point d’interrogation autorise null.",
      "id": "phpi-m1-01-q2"
    },
    {
      "question": "Avec strict_types, peut-on passer 5 à un paramètre float ?",
      "options": [
        "Non",
        "Oui, un int est accepté pour un float",
        "Seulement avec un cast",
        "Seulement en argument nommé"
      ],
      "answer": 1,
      "explanation": "C’est la seule conversion tolérée.",
      "id": "phpi-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "déclaration de type",
      "definition": "Type annoncé pour un paramètre ou un retour."
    },
    {
      "term": "strict_types",
      "definition": "Mode qui refuse les conversions automatiques aux appels."
    },
    {
      "term": "type nullable",
      "definition": "Type précédé de ?, qui accepte aussi null."
    },
    {
      "term": "argument nommé",
      "definition": "Argument passé avec le nom du paramètre."
    }
  ],
  "recap_fr": [
    "Déclarer les types des paramètres et du retour, avec strict_types, valeurs par défaut et types nullables.",
    "Appeler une fonction avec des arguments nommés et intercepter une TypeError.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "déclaration de type",
    "strict_types",
    "type nullable",
    "argument nommé"
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
      "title": "Déclarations de types",
      "url": "https://www.php.net/manual/fr/language.types.declarations.php"
    },
    {
      "title": "Arguments de fonctions et arguments nommés",
      "url": "https://www.php.net/manual/fr/functions.arguments.php"
    }
  ],
  "sources": [
    {
      "title": "Déclarations de types",
      "url": "https://www.php.net/manual/fr/language.types.declarations.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Arguments de fonctions et arguments nommés",
      "url": "https://www.php.net/manual/fr/functions.arguments.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Au niveau débutant, tes fonctions acceptaient n’importe quelle valeur. Un appel avec un texte au lieu d’un nombre passait parfois sans erreur, et le problème apparaissait bien plus loin. Le niveau intermédiaire commence par rendre les fonctions plus sûres grâce aux déclarations de types.

On écrit le type devant chaque paramètre et après la parenthèse, précédé de deux-points, pour le retour : function prixTtc(int $prixHt, float $taux): int. Les types courants sont int, float, string, bool et array. Le type void indique qu’une fonction ne renvoie rien. Un point d’interrogation devant un type, comme ?string, autorise aussi la valeur null.

Par défaut, PHP essaie de convertir : passer le texte "21" à un paramètre int fonctionne silencieusement. La ligne declare(strict_types=1);, placée tout en haut du fichier, juste après <?php, désactive ces conversions. Un mauvais type provoque alors une TypeError immédiate, avec le nom de la fonction et du paramètre. Ce mode strict est recommandé : il transforme des erreurs discrètes en erreurs visibles, trouvées dès les premiers essais. Seule exception tolérée : un int peut toujours être passé à un paramètre float.

Un paramètre peut avoir une valeur par défaut : float $taux = 0.18. L’appelant peut alors l’omettre. Les paramètres avec valeur par défaut se placent après les paramètres obligatoires.

Depuis PHP 8, les arguments nommés rendent les appels plus lisibles : prixTtc(prixHt: 500, taux: 0.0). On peut les donner dans n’importe quel ordre et sauter les paramètres optionnels qui précèdent. Ils documentent l’appel : un lecteur sait immédiatement que 0.0 est un taux et non un prix.

Une TypeError est un objet qu’on peut intercepter avec try et catch, comme les autres erreurs. Mais dans un programme bien typé, on la corrige plutôt qu’on ne l’intercepte : elle signale une erreur de programmation, pas une saisie à valider. Les saisies de l’utilisateur restent des textes à convertir et à vérifier explicitement, comme au niveau débutant.

Dernier point : un type de retour oblige toutes les branches de la fonction à renvoyer ce type. Une fonction déclarée float qui pourrait diviser par zéro doit traiter ce cas, par exemple en renvoyant 0.0 pour une liste vide. Le contrat vaut pour tous les appels, même les cas limites.

## Exemple guidé 1

```php
<?php
declare(strict_types=1);

function prixTtc(int $prixHt, float $taux = 0.18): int
{
    return (int) round($prixHt * (1 + $taux));
}

echo prixTtc(1000), "\n";
echo prixTtc(1000, 0.10), "\n";
echo prixTtc(taux: 0.0, prixHt: 500), "\n";
```

Affichage attendu :

    1180
    1100
    500

Trace :

- Sans taux, la valeur par défaut 0.18 s’applique.
- Le deuxième appel fournit 0.10.
- Les arguments nommés s’écrivent dans n’importe quel ordre.

## Exemple guidé 2

```php
<?php
declare(strict_types=1);

function double(int $n): int
{
    return $n * 2;
}

try {
    echo double("21"), "\n";
} catch (TypeError $e) {
    echo "Refusé : un texte n'est pas un entier\n";
}
echo double(21), "\n";
```

Affichage attendu :

    Refusé : un texte n'est pas un entier
    42

Trace :

- strict_types interdit la conversion du texte "21".
- La TypeError est interceptée.
- L’appel avec un vrai entier fonctionne.

## Vérifier et expliquer

Ajoute declare(strict_types=1) à un ancien exercice du niveau débutant et observe quelles erreurs deviennent visibles.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Déclarations de types](https://www.php.net/manual/fr/language.types.declarations.php)
- [Arguments de fonctions et arguments nommés](https://www.php.net/manual/fr/functions.arguments.php)
