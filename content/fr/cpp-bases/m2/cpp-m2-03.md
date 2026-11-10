---
{
  "id": "cpp-m2-03",
  "title_fr": "Choisir avec switch et valider avec do-while",
  "course": "cpp-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "cpp-m2-02"
  ],
  "outcomes": [
    "Remplacer une suite de comparaisons d’un entier ou d’un caractère par switch.",
    "Redemander une saisie invalide avec une boucle do-while."
  ],
  "idea_fr": "switch aiguille une valeur entière vers le bon cas ; do-while répète une saisie jusqu’à ce qu’elle soit acceptable.",
  "analogy_fr": "Le guichetier lit le numéro du ticket et indique le guichet ; si le ticket est illisible, il demande d’en reprendre un.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint main() {\n    int jour;\n    std::cin >> jour;\n    switch (jour) {\n        case 1: case 3: case 5:\n            std::cout << \"Ouvert de 8 h à 17 h\\n\";\n            break;\n        case 6:\n            std::cout << \"Ouvert de 8 h à 12 h\\n\";\n            break;\n        default:\n            std::cout << \"Fermé\\n\";\n    }\n    return 0;\n}",
      "expected_output": "Ouvert de 8 h à 12 h",
      "inputs": [
        "6"
      ],
      "trace_fr": [
        "La saisie 6 correspond au samedi.",
        "switch saute directement au case 6.",
        "Le texte s’affiche, puis break sort du switch.",
        "Le cas default n’est pas exécuté."
      ]
    },
    {
      "code": "#include <iostream>\n\nint main() {\n    int mois;\n    int essais = 0;\n    do {\n        std::cin >> mois;\n        essais++;\n    } while (mois < 1 || mois > 12);\n    std::cout << \"Mois \" << mois << \" accepté après \" << essais << \" essai(s)\\n\";\n    return 0;\n}",
      "expected_output": "Mois 7 accepté après 3 essai(s)",
      "inputs": [
        "0",
        "14",
        "7"
      ],
      "trace_fr": [
        "Le bloc lit 0 : invalide, la boucle recommence.",
        "Il lit 14 : invalide aussi.",
        "Il lit 7 : la condition devient fausse.",
        "Trois saisies ont été nécessaires."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier break",
      "why_fr": "L’exécution continue dans le cas suivant.",
      "fix_fr": "Termine chaque cas par break."
    },
    {
      "error": "Utiliser switch avec une std::string",
      "why_fr": "switch n’accepte que des entiers et des caractères.",
      "fix_fr": "Utilise if / else if pour comparer des textes."
    },
    {
      "error": "Oublier le point-virgule après while (…) d’un do-while",
      "why_fr": "La syntaxe de do-while l’exige.",
      "fix_fr": "Écris } while (condition);"
    }
  ],
  "quiz": [
    {
      "question": "Que se passe-t-il si un case ne se termine pas par break ?",
      "options": [
        "Le programme s’arrête.",
        "L’exécution continue dans le cas suivant.",
        "Le compilateur ajoute break.",
        "Le cas est ignoré."
      ],
      "answer": 1,
      "explanation": "C’est le passage à travers.",
      "id": "cpp-m2-03-q1"
    },
    {
      "question": "Combien de fois s’exécute au minimum le bloc d’un do-while ?",
      "options": [
        "0",
        "1",
        "2",
        "Cela dépend de break"
      ],
      "answer": 1,
      "explanation": "La condition est testée après le bloc.",
      "id": "cpp-m2-03-q2"
    },
    {
      "question": "Quelle valeur peut-on utiliser dans switch ?",
      "options": [
        "Une std::string",
        "Un double",
        "Un char",
        "Une condition comme note >= 10"
      ],
      "answer": 2,
      "explanation": "switch accepte des entiers et des caractères.",
      "id": "cpp-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "switch",
      "definition": "Instruction qui saute au cas correspondant à une valeur entière ou un caractère."
    },
    {
      "term": "break",
      "definition": "Instruction qui quitte un switch ou une boucle."
    },
    {
      "term": "default",
      "definition": "Cas utilisé quand aucun autre ne correspond."
    },
    {
      "term": "do-while",
      "definition": "Boucle dont le bloc s’exécute au moins une fois avant le test."
    }
  ],
  "recap_fr": [
    "Remplacer une suite de comparaisons d’un entier ou d’un caractère par switch.",
    "Redemander une saisie invalide avec une boucle do-while.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "switch",
    "break",
    "default",
    "do-while"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "cpp",
  "runtime": "cpp",
  "level": "debutant",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "C++17 compilé en ligne par GCC 13 sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seuls le programme et les saisies de test sont envoyés, sans nom ni compte. Les leçons, exemples et questions restent lisibles hors ligne. Les données sont fictives.",
  "references": [
    {
      "title": "switch",
      "url": "https://en.cppreference.com/w/cpp/language/switch"
    },
    {
      "title": "do-while",
      "url": "https://en.cppreference.com/w/cpp/language/do"
    },
    {
      "title": "break",
      "url": "https://en.cppreference.com/w/cpp/language/break"
    }
  ],
  "sources": [
    {
      "title": "switch",
      "url": "https://en.cppreference.com/w/cpp/language/switch",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "do-while",
      "url": "https://en.cppreference.com/w/cpp/language/do",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "break",
      "url": "https://en.cppreference.com/w/cpp/language/break",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand une variable entière ou un caractère peut prendre une valeur parmi une liste connue, une suite de else if devient répétitive. L’instruction switch l’écrit plus clairement. switch (jour) { case 1: … break; case 2: … break; default: … } compare jour à chaque case et saute directement au cas correspondant.

Le mot break termine le cas. Sans lui, l’exécution continue dans le cas suivant : c’est le « passage à travers », une source d’erreurs fréquente. On l’utilise parfois volontairement pour regrouper plusieurs valeurs : case 6: case 7: std::cout << "Week-end"; break; traite le samedi et le dimanche ensemble. Hors de ce regroupement, termine chaque cas par break.

Le cas default s’applique quand aucun autre ne correspond. Il est fortement conseillé : il traite les valeurs imprévues avec un message clair. Contrairement à certains langages, C++ ne signale rien si une valeur n’a pas de cas : sans default, le programme continue simplement sans rien faire.

switch a une limite : il ne fonctionne qu’avec des valeurs entières ou des caractères, comparées à des constantes. On ne peut pas l’utiliser avec une std::string, ni écrire une condition comme case note >= 16. Pour des intervalles ou des textes, if et else if restent l’outil adapté.

Les caractères se prêtent bien à switch. Un menu propose souvent des choix comme a, b ou q : char choix; std::cin >> choix; switch (choix) { case 'a': … }. Note les apostrophes autour des caractères.

Une saisie doit souvent être validée : un mois doit être compris entre 1 et 12, une quantité doit être positive. La boucle do { … } while (condition); convient parfaitement : son bloc s’exécute au moins une fois, puis se répète tant que la condition est vraie. On lit donc la saisie dans le bloc, et l’on recommence tant qu’elle est invalide : do { std::cin >> mois; } while (mois < 1 || mois > 12);. Le point-virgule après la parenthèse finale est obligatoire.

Dans l’atelier, toutes les saisies sont écrites à l’avance. Si ton programme redemande une valeur, il lit simplement la ligne suivante. Les exercices fournissent donc d’abord des valeurs invalides, puis une valeur correcte : ta boucle doit ignorer les premières et garder la bonne. Pense aussi au cas où les saisies s’épuisent : std::cin échoue alors, et une boucle de validation pourrait tourner sans fin. Un test std::cin.fail() permet de sortir proprement ; les exercices de ce chapitre fournissent toujours une valeur valide à la fin.

switch et do-while se combinent souvent dans un menu : on lit un choix valide, puis switch exécute l’action correspondante.

## Exemple guidé 1

```cpp
#include <iostream>

int main() {
    int jour;
    std::cin >> jour;
    switch (jour) {
        case 1: case 3: case 5:
            std::cout << "Ouvert de 8 h à 17 h\n";
            break;
        case 6:
            std::cout << "Ouvert de 8 h à 12 h\n";
            break;
        default:
            std::cout << "Fermé\n";
    }
    return 0;
}
```

Saisies de l’exemple : 6

Affichage attendu :

    Ouvert de 8 h à 12 h

Trace :

- La saisie 6 correspond au samedi.
- switch saute directement au case 6.
- Le texte s’affiche, puis break sort du switch.
- Le cas default n’est pas exécuté.

## Exemple guidé 2

```cpp
#include <iostream>

int main() {
    int mois;
    int essais = 0;
    do {
        std::cin >> mois;
        essais++;
    } while (mois < 1 || mois > 12);
    std::cout << "Mois " << mois << " accepté après " << essais << " essai(s)\n";
    return 0;
}
```

Saisies de l’exemple : 0 · 14 · 7

Affichage attendu :

    Mois 7 accepté après 3 essai(s)

Trace :

- Le bloc lit 0 : invalide, la boucle recommence.
- Il lit 14 : invalide aussi.
- Il lit 7 : la condition devient fausse.
- Trois saisies ont été nécessaires.

## Vérifier et expliquer

Essaie chaque programme avec une valeur prévue, une valeur sans cas et, pour la validation, plusieurs valeurs invalides avant la bonne.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [switch](https://en.cppreference.com/w/cpp/language/switch)
- [do-while](https://en.cppreference.com/w/cpp/language/do)
- [break](https://en.cppreference.com/w/cpp/language/break)
