---
{
  "id": "cpp-m1-03",
  "title_fr": "Calculer et lire des saisies",
  "course": "cpp-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "cpp-m1-02"
  ],
  "outcomes": [
    "Lire des saisies avec std::cin >> et std::getline.",
    "Calculer avec + - * / %, éviter le piège de la division entière et formater les décimales."
  ],
  "idea_fr": "Un programme reçoit des données, les range dans des variables du bon type, puis calcule.",
  "analogy_fr": "La caissière lit la quantité sur le bon de commande, la multiplie par le prix et écrit le total : lire, ranger, calculer.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint main() {\n    int mangues = 23;\n    int parSac = 5;\n    std::cout << \"Sacs pleins : \" << mangues / parSac << \"\\n\";\n    std::cout << \"Reste : \" << mangues % parSac << \"\\n\";\n    std::cout << \"Division entière : \" << 7 / 2 << \", décimale : \" << 7.0 / 2 << \"\\n\";\n    return 0;\n}",
      "expected_output": "Sacs pleins : 4\nReste : 3\nDivision entière : 3, décimale : 3.5",
      "inputs": [],
      "trace_fr": [
        "23 / 5 entre deux int donne 4.",
        "23 % 5 donne le reste 3.",
        "7 / 2 donne 3 : la partie décimale est perdue.",
        "7.0 / 2 contient un double : le résultat vaut 3.5."
      ]
    },
    {
      "code": "#include <iostream>\n#include <iomanip>\n#include <string>\n\nint main() {\n    std::string nom;\n    std::getline(std::cin, nom);\n    int a, b, c;\n    std::cin >> a >> b >> c;\n    double moyenne = static_cast<double>(a + b + c) / 3;\n    std::cout << nom << \" : \" << std::fixed << std::setprecision(2) << moyenne << \"\\n\";\n    return 0;\n}",
      "expected_output": "Kofi Mensah : 13.67",
      "inputs": [
        "Kofi Mensah",
        "12",
        "14",
        "15"
      ],
      "trace_fr": [
        "getline lit le nom complet, espace compris.",
        "std::cin >> lit les trois notes à la suite.",
        "static_cast<double> évite la division entière : 41 / 3 vaut 13.666…",
        "fixed et setprecision(2) arrondissent l’affichage à 13.67."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Calculer une moyenne entre int",
      "why_fr": "La division entière perd la partie décimale.",
      "fix_fr": "Convertis avec static_cast<double> avant de diviser."
    },
    {
      "error": "Lire un nom composé avec std::cin >>",
      "why_fr": "La lecture s’arrête au premier espace.",
      "fix_fr": "Utilise std::getline(std::cin, nom)."
    },
    {
      "error": "Afficher directement le résultat de l’exemple",
      "why_fr": "Les cas cachés utilisent d’autres saisies.",
      "fix_fr": "Calcule toujours à partir des variables lues."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut 9 / 4 en C++ si les deux sont des int ?",
      "options": [
        "2.25",
        "2",
        "3",
        "1"
      ],
      "answer": 1,
      "explanation": "La division entière ne garde que le quotient.",
      "id": "cpp-m1-03-q1"
    },
    {
      "question": "Quelle écriture donne 2.25 ?",
      "options": [
        "9 / 4",
        "static_cast<double>(9) / 4",
        "9 % 4",
        "int(9 / 4)"
      ],
      "answer": 1,
      "explanation": "La conversion en double avant la division conserve les décimales.",
      "id": "cpp-m1-03-q2"
    },
    {
      "question": "Pourquoi utiliser std::getline pour un nom ?",
      "options": [
        "Pour lire toute la ligne, espaces compris.",
        "Pour lire un nombre plus vite.",
        "Pour mettre le nom en majuscules.",
        "Parce que std::cin ne lit pas le texte."
      ],
      "answer": 0,
      "explanation": "std::cin >> s’arrête au premier espace.",
      "id": "cpp-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "std::cin",
      "definition": "Flux d’entrée standard, utilisé avec >> pour lire."
    },
    {
      "term": "division entière",
      "definition": "Division entre deux int qui ne garde que le quotient."
    },
    {
      "term": "static_cast",
      "definition": "Conversion explicite d’une valeur vers un autre type."
    },
    {
      "term": "setprecision",
      "definition": "Réglage du nombre de chiffres affichés, combiné avec std::fixed."
    }
  ],
  "recap_fr": [
    "Lire des saisies avec std::cin >> et std::getline.",
    "Calculer avec + - * / %, éviter le piège de la division entière et formater les décimales.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "std::cin",
    "division entière",
    "static_cast",
    "setprecision"
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
      "title": "std::cin",
      "url": "https://en.cppreference.com/w/cpp/io/cin"
    },
    {
      "title": "std::getline",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/getline"
    },
    {
      "title": "Opérateurs arithmétiques",
      "url": "https://en.cppreference.com/w/cpp/language/operator_arithmetic"
    },
    {
      "title": "std::setprecision",
      "url": "https://en.cppreference.com/w/cpp/io/manip/setprecision"
    },
    {
      "title": "static_cast",
      "url": "https://en.cppreference.com/w/cpp/language/static_cast"
    }
  ],
  "sources": [
    {
      "title": "std::cin",
      "url": "https://en.cppreference.com/w/cpp/io/cin",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::getline",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/getline",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Opérateurs arithmétiques",
      "url": "https://en.cppreference.com/w/cpp/language/operator_arithmetic",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::setprecision",
      "url": "https://en.cppreference.com/w/cpp/io/manip/setprecision",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "static_cast",
      "url": "https://en.cppreference.com/w/cpp/language/static_cast",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un programme devient utile quand il travaille sur des données fournies par la personne qui l’utilise. std::cin, le flux d’entrée standard, lit ces données. L’opérateur >> les range dans une variable : int age; std::cin >> age; lit un entier. Le type de la variable décide de la lecture : un int lit des chiffres, un double accepte une virgule écrite avec un point, une std::string lit un mot. Dans l’atelier, tu écris les saisies à l’avance, une par ligne.

std::cin >> s’arrête au premier espace. Pour lire un nom composé comme Kofi Mensah dans une std::string, utilise std::getline(std::cin, nom), qui lit toute la ligne. Attention au mélange des deux : après std::cin >> age, le retour à la ligne reste en attente, et un std::getline placé juste après lirait une ligne vide. Lis les lignes de texte avant les nombres, ou ajoute std::cin.ignore() pour sauter ce retour à la ligne.

Les opérateurs de calcul sont +, -, * et /. % donne le reste d’une division entière : 23 % 5 vaut 3. Les priorités sont celles des mathématiques, et les parenthèses changent l’ordre.

La division est le piège classique de C++. Quand ses deux opérandes sont des int, elle donne un résultat entier : 7 / 2 vaut 3, la partie décimale est perdue. Ce comportement est voulu et utile pour répartir des objets, mais il surprend pour une moyenne. Pour obtenir 3.5, au moins un opérande doit être un double : 7.0 / 2, ou static_cast<double>(somme) / nombre. static_cast<double> convertit une valeur entière en double avant le calcul. Diviser un entier par zéro arrête le programme avec une erreur à l’exécution : vérifie le diviseur avant de diviser.

Pour afficher un nombre à virgule avec un nombre fixe de décimales, deux outils de <iomanip> se combinent : std::fixed impose l’écriture à virgule fixe et std::setprecision(2) choisit deux décimales. std::cout << std::fixed << std::setprecision(2) << 3.14159; affiche 3.14. Ce réglage reste actif pour la suite de l’affichage.

Les montants en FCFA sont entiers : utilise int, et garde les double pour les mesures, les moyennes ou les taux. Un int peut contenir des valeurs jusqu’à environ deux milliards ; au-delà, le calcul déborde et donne un résultat faux.

Calcule toujours à partir des variables, jamais à partir des valeurs du premier exemple. Les exercices utilisent des cas cachés avec d’autres saisies : un programme qui affiche directement 500 ne passera que le premier cas.

## Exemple guidé 1

```cpp
#include <iostream>

int main() {
    int mangues = 23;
    int parSac = 5;
    std::cout << "Sacs pleins : " << mangues / parSac << "\n";
    std::cout << "Reste : " << mangues % parSac << "\n";
    std::cout << "Division entière : " << 7 / 2 << ", décimale : " << 7.0 / 2 << "\n";
    return 0;
}
```

Affichage attendu :

    Sacs pleins : 4
    Reste : 3
    Division entière : 3, décimale : 3.5

Trace :

- 23 / 5 entre deux int donne 4.
- 23 % 5 donne le reste 3.
- 7 / 2 donne 3 : la partie décimale est perdue.
- 7.0 / 2 contient un double : le résultat vaut 3.5.

## Exemple guidé 2

```cpp
#include <iostream>
#include <iomanip>
#include <string>

int main() {
    std::string nom;
    std::getline(std::cin, nom);
    int a, b, c;
    std::cin >> a >> b >> c;
    double moyenne = static_cast<double>(a + b + c) / 3;
    std::cout << nom << " : " << std::fixed << std::setprecision(2) << moyenne << "\n";
    return 0;
}
```

Saisies de l’exemple : Kofi Mensah · 12 · 14 · 15

Affichage attendu :

    Kofi Mensah : 13.67

Trace :

- getline lit le nom complet, espace compris.
- std::cin >> lit les trois notes à la suite.
- static_cast<double> évite la division entière : 41 / 3 vaut 13.666…
- fixed et setprecision(2) arrondissent l’affichage à 13.67.

## Vérifier et expliquer

Essaie chaque programme avec plusieurs saisies, dont 0 et un nombre qui ne tombe pas juste. Calcule d’abord le résultat de tête.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [std::cin](https://en.cppreference.com/w/cpp/io/cin)
- [std::getline](https://en.cppreference.com/w/cpp/string/basic_string/getline)
- [Opérateurs arithmétiques](https://en.cppreference.com/w/cpp/language/operator_arithmetic)
- [std::setprecision](https://en.cppreference.com/w/cpp/io/manip/setprecision)
- [static_cast](https://en.cppreference.com/w/cpp/language/static_cast)
