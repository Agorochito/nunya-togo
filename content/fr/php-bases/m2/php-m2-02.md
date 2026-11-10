---
{
  "id": "php-m2-02",
  "title_fr": "Répéter avec for et while",
  "course": "php-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "php-m2-01"
  ],
  "outcomes": [
    "Écrire une boucle for avec compteur et une boucle while avec condition d’arrêt.",
    "Accumuler un total ou un compte dans une variable initialisée avant la boucle."
  ],
  "idea_fr": "Une boucle répète un bloc tant qu’une condition reste vraie ; une variable qui change à chaque tour garantit qu’elle s’arrête.",
  "analogy_fr": "Pour remplir une citerne, on verse seau après seau en comptant, et l’on s’arrête quand elle est pleine.",
  "examples": [
    {
      "code": "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo \"Tour $i\\n\";\n}\necho \"Fin\";",
      "expected_output": "Tour 1\nTour 2\nTour 3\nTour 4\nTour 5\nFin",
      "inputs": [],
      "trace_fr": [
        "$i commence à 1.",
        "Tant que $i <= 5, le bloc affiche le tour.",
        "Après chaque tour, $i augmente de 1.",
        "Quand $i vaut 6, la boucle s’arrête et Fin s’affiche."
      ]
    },
    {
      "code": "<?php\n$nombre = (int) trim(fgets(STDIN));\n$total = 0;\nfor ($i = 1; $i <= $nombre; $i++) {\n    $vente = (int) trim(fgets(STDIN));\n    $total += $vente;\n}\necho \"Ventes : $nombre\\n\";\necho \"Total : $total FCFA\";",
      "expected_output": "Ventes : 3\nTotal : 4500 FCFA",
      "inputs": [
        "3",
        "1500",
        "2000",
        "1000"
      ],
      "trace_fr": [
        "La première saisie indique 3 ventes.",
        "$total commence à 0 avant la boucle.",
        "Chaque tour lit une vente et l’ajoute : 1500, 2000 puis 1000.",
        "Le total final vaut 4500."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de modifier la variable d’une boucle while",
      "why_fr": "La condition reste vraie et la boucle ne s’arrête jamais.",
      "fix_fr": "Vérifie qu’une instruction du bloc rapproche la condition de false."
    },
    {
      "error": "Initialiser le total dans la boucle",
      "why_fr": "Il repart de zéro à chaque tour.",
      "fix_fr": "Écris $total = 0; avant la boucle."
    },
    {
      "error": "Faire un tour de trop ou de moins",
      "why_fr": "La condition utilise < au lieu de <=, ou l’inverse.",
      "fix_fr": "Trace les premiers et derniers tours à la main."
    }
  ],
  "quiz": [
    {
      "question": "Combien de fois s’exécute for ($i = 0; $i < 4; $i++) ?",
      "options": [
        "3",
        "5",
        "4",
        "Indéfiniment"
      ],
      "answer": 2,
      "explanation": "$i prend les valeurs 0, 1, 2 et 3.",
      "id": "php-m2-02-q1"
    },
    {
      "question": "Que vaut $t après $t = 0; for ($i = 1; $i <= 3; $i++) { $t += $i; } ?",
      "options": [
        "3",
        "6",
        "4",
        "0"
      ],
      "answer": 1,
      "explanation": "1 + 2 + 3 = 6.",
      "id": "php-m2-02-q2"
    },
    {
      "question": "Pourquoi une boucle while peut-elle ne jamais s’arrêter ?",
      "options": [
        "Parce qu’elle a trop d’instructions.",
        "Parce que la condition reste toujours vraie.",
        "Parce qu’elle commence à 0.",
        "Parce qu’elle affiche du texte."
      ],
      "answer": 1,
      "explanation": "Si aucune variable de la condition ne change, la boucle tourne indéfiniment.",
      "id": "php-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "boucle",
      "definition": "Structure qui répète un bloc d’instructions."
    },
    {
      "term": "compteur",
      "definition": "Variable qui suit le numéro du tour, souvent $i."
    },
    {
      "term": "accumulateur",
      "definition": "Variable initialisée avant une boucle et mise à jour à chaque tour, comme un total."
    },
    {
      "term": "boucle infinie",
      "definition": "Boucle dont la condition ne devient jamais fausse."
    }
  ],
  "recap_fr": [
    "Écrire une boucle for avec compteur et une boucle while avec condition d’arrêt.",
    "Accumuler un total ou un compte dans une variable initialisée avant la boucle.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "débutant",
    "boucle",
    "compteur",
    "accumulateur",
    "boucle infinie"
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
      "title": "for",
      "url": "https://www.php.net/manual/fr/control-structures.for.php"
    },
    {
      "title": "while",
      "url": "https://www.php.net/manual/fr/control-structures.while.php"
    },
    {
      "title": "Incrémentation",
      "url": "https://www.php.net/manual/fr/language.operators.increment.php"
    },
    {
      "title": "Opérateurs d’affectation",
      "url": "https://www.php.net/manual/fr/language.operators.assignment.php"
    }
  ],
  "sources": [
    {
      "title": "for",
      "url": "https://www.php.net/manual/fr/control-structures.for.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "while",
      "url": "https://www.php.net/manual/fr/control-structures.while.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Incrémentation",
      "url": "https://www.php.net/manual/fr/language.operators.increment.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Opérateurs d’affectation",
      "url": "https://www.php.net/manual/fr/language.operators.assignment.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Afficher les nombres de 1 à 100 avec cent echo serait absurde. Une boucle répète un bloc d’instructions autant de fois que nécessaire. PHP en propose plusieurs ; les deux premières à connaître sont for et while.

La boucle for convient quand on connaît le nombre de tours. Sa parenthèse contient trois parties séparées par des points-virgules : l’initialisation, la condition et l’évolution. for ($i = 1; $i <= 5; $i++) se lit ainsi : commence avec $i à 1 ; tant que $i est inférieur ou égal à 5, exécute le bloc ; après chaque tour, augmente $i de 1. L’écriture $i++ est un raccourci pour $i = $i + 1. Le bloc s’exécute donc cinq fois, avec $i valant successivement 1, 2, 3, 4 et 5.

La boucle while convient quand on ne connaît pas le nombre de tours à l’avance. while (condition) { … } répète le bloc tant que la condition est vraie. C’est au programme de modifier, dans le bloc, la variable testée. Si rien ne change, la condition reste vraie pour toujours : c’est une boucle infinie. L’atelier l’arrête au bout de quelques secondes, mais un vrai programme resterait bloqué. Avant de lancer une boucle while, demande-toi quelle instruction rapproche la condition de false.

Une boucle sert souvent à accumuler. Pour additionner des valeurs, on crée une variable $total = 0 avant la boucle, puis on écrit $total += $valeur à chaque tour. L’opérateur += est un raccourci pour $total = $total + $valeur. L’initialisation doit se trouver avant la boucle : placée à l’intérieur, elle remettrait le total à zéro à chaque tour. Le même principe sert à compter : $compte = 0 puis $compte++ quand une condition est remplie.

On combine souvent une boucle et des saisies. Si la première saisie indique combien de valeurs suivent, une boucle for lit exactement ce nombre de lignes. Chaque appel à fgets(STDIN) lit la ligne suivante : placé dans la boucle, il lit une nouvelle valeur à chaque tour.

Pour comprendre une boucle, rien ne remplace une trace à la main. Note dans un tableau la valeur de chaque variable au début de chaque tour. Les erreurs les plus fréquentes apparaissent alors : un tour de trop parce que la condition utilise <= au lieu de <, un premier tour oublié parce que le compteur commence à 1 au lieu de 0, ou un total jamais initialisé.

Enfin, une boucle peut contenir une condition. À chaque tour, if décide quoi faire de la valeur courante : l’ajouter au total, la compter, l’afficher. Ce couple boucle et condition est la base de la plupart des traitements de données que tu écriras ensuite.

## Exemple guidé 1

```php
<?php
for ($i = 1; $i <= 5; $i++) {
    echo "Tour $i\n";
}
echo "Fin";
```

Affichage attendu :

    Tour 1
    Tour 2
    Tour 3
    Tour 4
    Tour 5
    Fin

Trace :

- $i commence à 1.
- Tant que $i <= 5, le bloc affiche le tour.
- Après chaque tour, $i augmente de 1.
- Quand $i vaut 6, la boucle s’arrête et Fin s’affiche.

## Exemple guidé 2

```php
<?php
$nombre = (int) trim(fgets(STDIN));
$total = 0;
for ($i = 1; $i <= $nombre; $i++) {
    $vente = (int) trim(fgets(STDIN));
    $total += $vente;
}
echo "Ventes : $nombre\n";
echo "Total : $total FCFA";
```

Saisies de l’exemple : 3 · 1500 · 2000 · 1000

Affichage attendu :

    Ventes : 3
    Total : 4500 FCFA

Trace :

- La première saisie indique 3 ventes.
- $total commence à 0 avant la boucle.
- Chaque tour lit une vente et l’ajoute : 1500, 2000 puis 1000.
- Le total final vaut 4500.

## Vérifier et expliquer

Trace à la main les deux premiers et le dernier tour de chaque boucle avant de lancer le script.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [for](https://www.php.net/manual/fr/control-structures.for.php)
- [while](https://www.php.net/manual/fr/control-structures.while.php)
- [Incrémentation](https://www.php.net/manual/fr/language.operators.increment.php)
- [Opérateurs d’affectation](https://www.php.net/manual/fr/language.operators.assignment.php)
