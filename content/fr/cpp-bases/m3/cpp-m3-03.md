---
{
  "id": "cpp-m3-03",
  "title_fr": "Manipuler du texte avec std::string",
  "course": "cpp-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "cpp-m3-02"
  ],
  "outcomes": [
    "Mesurer, parcourir et découper une std::string avec size(), [], substr et find.",
    "Transformer des caractères avec std::toupper et comparer des textes."
  ],
  "idea_fr": "Une std::string est une suite de caractères : on la mesure, on la parcourt et on en extrait des morceaux comme avec un vecteur.",
  "analogy_fr": "Un collier de perles : chaque perle a sa place, on peut les compter, en remplacer une ou détacher un morceau du collier.",
  "examples": [
    {
      "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string trajet = \"LOME-KARA\";\n    std::size_t tiret = trajet.find(\"-\");\n    std::string depart = trajet.substr(0, tiret);\n    std::string arrivee = trajet.substr(tiret + 1);\n    std::cout << \"Départ : \" << depart << \"\\n\";\n    std::cout << \"Arrivée : \" << arrivee << \" (\" << arrivee.size() << \" lettres)\\n\";\n    return 0;\n}",
      "expected_output": "Départ : LOME\nArrivée : KARA (4 lettres)",
      "inputs": [],
      "trace_fr": [
        "find trouve le tiret à la position 4.",
        "substr(0, 4) extrait les quatre premiers caractères.",
        "substr(5) extrait tout ce qui suit le tiret.",
        "size() compte quatre caractères dans KARA."
      ]
    },
    {
      "code": "#include <iostream>\n#include <string>\n#include <cctype>\n\nint main() {\n    std::string code;\n    std::cin >> code;\n    int chiffres = 0;\n    for (char& c : code) {\n        c = std::toupper(c);\n        if (std::isdigit(c)) {\n            chiffres++;\n        }\n    }\n    std::cout << code << \" contient \" << chiffres << \" chiffres\\n\";\n    return 0;\n}",
      "expected_output": "TG2026AB contient 4 chiffres",
      "inputs": [
        "tg2026ab"
      ],
      "trace_fr": [
        "La saisie tg2026ab est lue dans code.",
        "La boucle par référence modifie chaque caractère du texte.",
        "std::toupper met les lettres en majuscules ; les chiffres ne changent pas.",
        "std::isdigit compte les quatre chiffres."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser la position de find sans tester npos",
      "why_fr": "Si le morceau est absent, la position n’a pas de sens.",
      "fix_fr": "Compare d’abord le résultat à std::string::npos."
    },
    {
      "error": "Parcourir sans & pour modifier",
      "why_fr": "La boucle modifie une copie du caractère.",
      "fix_fr": "Écris for (char& c : texte)."
    },
    {
      "error": "Mesurer un texte accentué avec size()",
      "why_fr": "size() compte des octets : é en vaut deux.",
      "fix_fr": "Réserve ces mesures aux textes sans accent."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut std::string(\"BANANE\").substr(2, 3) ?",
      "options": [
        "BAN",
        "NAN",
        "ANA",
        "NANE"
      ],
      "answer": 1,
      "explanation": "Trois caractères à partir de la position 2.",
      "id": "cpp-m3-03-q1"
    },
    {
      "question": "Que renvoie find si le morceau est absent ?",
      "options": [
        "0",
        "-1 dans un int",
        "std::string::npos",
        "Une erreur de compilation"
      ],
      "answer": 2,
      "explanation": "npos signale l’absence.",
      "id": "cpp-m3-03-q2"
    },
    {
      "question": "Pourquoi écrire char& dans for (char& c : texte) pour mettre en majuscules ?",
      "options": [
        "Pour aller plus vite.",
        "Pour modifier les caractères du texte lui-même.",
        "Parce que char est interdit.",
        "Pour lire le texte à l’envers."
      ],
      "answer": 1,
      "explanation": "Sans &, la boucle travaille sur des copies.",
      "id": "cpp-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "std::string",
      "definition": "Texte de la bibliothèque standard, suite de caractères."
    },
    {
      "term": "substr",
      "definition": "Méthode qui extrait un morceau de texte."
    },
    {
      "term": "find",
      "definition": "Méthode qui renvoie la position d’un morceau, ou npos s’il est absent."
    },
    {
      "term": "npos",
      "definition": "Valeur spéciale qui signifie « position introuvable »."
    }
  ],
  "recap_fr": [
    "Mesurer, parcourir et découper une std::string avec size(), [], substr et find.",
    "Transformer des caractères avec std::toupper et comparer des textes.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "std::string",
    "substr",
    "find",
    "npos"
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
      "title": "substr",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/substr"
    },
    {
      "title": "find",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/find"
    },
    {
      "title": "std::toupper",
      "url": "https://en.cppreference.com/w/cpp/string/byte/toupper"
    },
    {
      "title": "std::to_string",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/to_string"
    }
  ],
  "sources": [
    {
      "title": "substr",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/substr",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "find",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/find",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::toupper",
      "url": "https://en.cppreference.com/w/cpp/string/byte/toupper",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::to_string",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string/to_string",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une std::string se comporte beaucoup comme un vecteur de caractères. size() renvoie le nombre de caractères, et texte[0] désigne le premier caractère, de type char. On peut donc parcourir un texte caractère par caractère : for (char c : texte) { … }. Les textes s’assemblent avec + et +=, et se comparent avec == et !=.

Attention aux lettres accentuées. En C++, une std::string compte des octets, pas des lettres : é occupe deux octets en UTF-8, donc std::string("été").size() vaut 5. Les exercices de cette leçon utilisent des textes sans accent pour les mesures et les transformations caractère par caractère.

substr extrait un morceau : texte.substr(debut, longueur). Avec texte = "LOME-KARA", texte.substr(0, 4) vaut LOME et texte.substr(5) vaut KARA : sans longueur, l’extraction va jusqu’à la fin. find cherche un morceau et renvoie la position de sa première occurrence : texte.find("-") vaut 4. Si le morceau est absent, find renvoie une valeur spéciale, std::string::npos ; il faut toujours la tester avant d’utiliser la position. Le couple find et substr permet de découper un code comme LOME-KARA en deux villes.

Pour transformer des caractères, la bibliothèque <cctype> fournit std::toupper et std::tolower, qui passent un caractère en majuscule ou en minuscule, et std::isdigit, qui teste si un caractère est un chiffre. Pour mettre tout un texte en majuscules, on parcourt ses caractères par référence et on remplace chacun : for (char& c : texte) { c = std::toupper(c); }. Le & permet de modifier le caractère dans le texte lui-même au lieu d’une copie ; tu approfondiras ce mécanisme à la leçon suivante.

Les fonctions std::to_string et std::stoi font le lien avec les nombres. std::to_string(42) produit le texte "42", utile pour construire un code. std::stoi("42") convertit un texte en entier ; si le texte ne contient pas de nombre, le programme s’arrête avec une erreur.

Comparer des textes distingue les majuscules : "Kara" et "kara" sont différents. Pour une comparaison qui ignore la casse, transforme d’abord les deux textes en majuscules. Les textes peuvent aussi se comparer avec < et >, dans l’ordre des codes de caractères, ce qui correspond à l’ordre alphabétique pour des mots sans accent écrits dans la même casse.

Ces outils servent partout : valider un numéro de téléphone composé de chiffres, extraire l’indicatif d’un code, compter les voyelles d’un mot, masquer un mot de passe à l’affichage. Dans chaque cas, on combine une boucle sur les caractères, des tests sur chacun et la construction d’un nouveau texte.

## Exemple guidé 1

```cpp
#include <iostream>
#include <string>

int main() {
    std::string trajet = "LOME-KARA";
    std::size_t tiret = trajet.find("-");
    std::string depart = trajet.substr(0, tiret);
    std::string arrivee = trajet.substr(tiret + 1);
    std::cout << "Départ : " << depart << "\n";
    std::cout << "Arrivée : " << arrivee << " (" << arrivee.size() << " lettres)\n";
    return 0;
}
```

Affichage attendu :

    Départ : LOME
    Arrivée : KARA (4 lettres)

Trace :

- find trouve le tiret à la position 4.
- substr(0, 4) extrait les quatre premiers caractères.
- substr(5) extrait tout ce qui suit le tiret.
- size() compte quatre caractères dans KARA.

## Exemple guidé 2

```cpp
#include <iostream>
#include <string>
#include <cctype>

int main() {
    std::string code;
    std::cin >> code;
    int chiffres = 0;
    for (char& c : code) {
        c = std::toupper(c);
        if (std::isdigit(c)) {
            chiffres++;
        }
    }
    std::cout << code << " contient " << chiffres << " chiffres\n";
    return 0;
}
```

Saisies de l’exemple : tg2026ab

Affichage attendu :

    TG2026AB contient 4 chiffres

Trace :

- La saisie tg2026ab est lue dans code.
- La boucle par référence modifie chaque caractère du texte.
- std::toupper met les lettres en majuscules ; les chiffres ne changent pas.
- std::isdigit compte les quatre chiffres.

## Vérifier et expliquer

Teste chaque programme avec un texte attendu, un texte sans le séparateur cherché et un texte en minuscules.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [substr](https://en.cppreference.com/w/cpp/string/basic_string/substr)
- [find](https://en.cppreference.com/w/cpp/string/basic_string/find)
- [std::toupper](https://en.cppreference.com/w/cpp/string/byte/toupper)
- [std::to_string](https://en.cppreference.com/w/cpp/string/basic_string/to_string)
