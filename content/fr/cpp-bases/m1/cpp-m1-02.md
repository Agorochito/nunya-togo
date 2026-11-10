---
{
  "id": "cpp-m1-02",
  "title_fr": "Déclarer des variables et choisir leur type",
  "course": "cpp-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "cpp-m1-01"
  ],
  "outcomes": [
    "Déclarer et initialiser des variables int, double, bool, char et std::string.",
    "Utiliser const pour une valeur qui ne doit pas changer."
  ],
  "idea_fr": "En C++, chaque variable a un type fixé dès sa déclaration ; le compilateur vérifie ensuite chaque usage.",
  "analogy_fr": "Au marché, une bassine sert aux liquides, un panier aux fruits : le contenant est choisi avant d’y mettre quoi que ce soit.",
  "examples": [
    {
      "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string prenom = \"Afi\";\n    int age = 17;\n    double taille = 1.62;\n    char groupe = 'B';\n    bool inscrite = true;\n    std::cout << prenom << \", \" << age << \" ans, \" << taille << \" m\\n\";\n    std::cout << \"Groupe \" << groupe << \", inscrite : \" << inscrite << \"\\n\";\n    return 0;\n}",
      "expected_output": "Afi, 17 ans, 1.62 m\nGroupe B, inscrite : 1",
      "inputs": [],
      "trace_fr": [
        "Cinq variables de cinq types différents sont déclarées et initialisées.",
        "std::cout affiche chaque valeur à son tour.",
        "Le char B s’affiche comme une lettre.",
        "Le booléen true s’affiche 1."
      ]
    },
    {
      "code": "#include <iostream>\n\nint main() {\n    const int PRIX_TICKET = 200;\n    int tickets = 3;\n    std::cout << \"Total : \" << PRIX_TICKET * tickets << \" FCFA\\n\";\n    tickets = 5;\n    std::cout << \"Nouveau total : \" << PRIX_TICKET * tickets << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "Total : 600 FCFA\nNouveau total : 1000 FCFA",
      "inputs": [],
      "trace_fr": [
        "PRIX_TICKET est constant : il ne changera pas.",
        "Le premier total vaut 200 × 3.",
        "tickets reçoit 5 sans répéter son type.",
        "Le second total vaut 200 × 5."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser une variable non initialisée",
      "why_fr": "Sa valeur est imprévisible.",
      "fix_fr": "Initialise toujours : int total = 0;."
    },
    {
      "error": "Confondre 'A' et \"A\"",
      "why_fr": "Le premier est un char, le second un texte.",
      "fix_fr": "Apostrophes pour un caractère, guillemets pour un texte."
    },
    {
      "error": "Répéter le type lors d’une nouvelle affectation",
      "why_fr": "Cela déclare une seconde variable du même nom.",
      "fix_fr": "Écris seulement nom = valeur;."
    }
  ],
  "quiz": [
    {
      "question": "Quel type choisir pour un prix de 1.5 dollar ?",
      "options": [
        "int",
        "char",
        "double",
        "bool"
      ],
      "answer": 2,
      "explanation": "Un nombre à virgule se range dans un double.",
      "id": "cpp-m1-02-q1"
    },
    {
      "question": "Que fait const int MAX = 10; puis MAX = 12; ?",
      "options": [
        "MAX vaut 12.",
        "Le compilateur refuse la modification.",
        "MAX vaut 22.",
        "Le programme s’arrête pendant l’exécution."
      ],
      "answer": 1,
      "explanation": "Une constante ne peut pas être modifiée : l’erreur apparaît à la compilation.",
      "id": "cpp-m1-02-q2"
    },
    {
      "question": "Comment s’affiche par défaut un bool qui vaut false ?",
      "options": [
        "false",
        "faux",
        "0",
        "rien"
      ],
      "answer": 2,
      "explanation": "std::cout affiche les booléens sous forme de 1 et 0.",
      "id": "cpp-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "déclaration",
      "definition": "Annonce du type et du nom d’une variable."
    },
    {
      "term": "initialisation",
      "definition": "Valeur donnée à une variable au moment de sa déclaration."
    },
    {
      "term": "type",
      "definition": "Nature d’une valeur : int, double, bool, char, std::string…"
    },
    {
      "term": "const",
      "definition": "Mot-clé qui interdit de modifier une variable après sa création."
    }
  ],
  "recap_fr": [
    "Déclarer et initialiser des variables int, double, bool, char et std::string.",
    "Utiliser const pour une valeur qui ne doit pas changer.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "déclaration",
    "initialisation",
    "type",
    "const"
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
      "title": "Types fondamentaux",
      "url": "https://en.cppreference.com/w/cpp/language/types"
    },
    {
      "title": "std::string",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string"
    },
    {
      "title": "const",
      "url": "https://en.cppreference.com/w/cpp/language/cv"
    }
  ],
  "sources": [
    {
      "title": "Types fondamentaux",
      "url": "https://en.cppreference.com/w/cpp/language/types",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::string",
      "url": "https://en.cppreference.com/w/cpp/string/basic_string",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "const",
      "url": "https://en.cppreference.com/w/cpp/language/cv",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une variable est un emplacement nommé qui contient une valeur. En C++, on ne peut pas utiliser une variable sans l’avoir déclarée, c’est-à-dire avoir annoncé son type et son nom. int age = 17; déclare une variable nommée age, de type int, et lui donne la valeur 17. Cette précision distingue C++ de langages comme Python ou PHP, où le type se devine au moment de l’exécution.

Les types de base à connaître sont : int pour les nombres entiers, comme 17 ou -3 ; double pour les nombres à virgule, écrits avec un point, comme 1.62 ; bool pour une valeur vraie ou fausse, true ou false ; char pour un seul caractère, entre apostrophes, comme 'A' ; et std::string pour un texte, entre guillemets, qui demande #include <string>. Les apostrophes et les guillemets ne sont pas interchangeables : 'A' est un caractère, "A" est un texte d’une lettre.

Le type décide de ce qu’on peut faire. On additionne deux int, on assemble deux std::string avec +. Le compilateur refuse de ranger un texte dans un int : int prix = "500"; provoque une erreur de compilation. Cette sévérité est une aide, car l’erreur apparaît avant l’exécution, avec sa ligne.

Une variable déclarée sans valeur initiale contient, pour les types de base, n’importe quoi : les restes de la mémoire. Lire une telle variable donne un résultat imprévisible, différent d’un ordinateur à l’autre. Prends l’habitude de toujours initialiser : int total = 0;. std::string, elle, commence par un texte vide.

Une variable peut recevoir une nouvelle valeur plus tard, avec = seul, sans répéter le type : age = 18;. Répéter le type, int age = 18;, déclarerait une seconde variable du même nom, ce que le compilateur refuse dans le même bloc.

Le mot-clé const déclare une valeur qui ne changera pas : const int PRIX_TICKET = 200;. Toute tentative de modification ultérieure est refusée à la compilation. On l’utilise pour les taux, les tarifs ou les limites : le nom explique la valeur, et l’on ne risque pas de la modifier par erreur. Par convention, beaucoup de programmeurs écrivent ces constantes en majuscules.

Pour afficher une variable, on l’envoie à std::cout comme un texte : std::cout << "Âge : " << age;. Un bool s’affiche 1 ou 0 par défaut. Un double s’affiche avec ses décimales utiles : 1.5 s’affiche 1.5, et 2.0 s’affiche 2.

Les noms de variables commencent par une lettre ou un tiret bas, sans espace ni accent. Choisis des noms qui décrivent le contenu : prixTomate se comprend mieux que p. Enfin, n’utilise pas un mot réservé du langage, comme int ou return, comme nom de variable.

## Exemple guidé 1

```cpp
#include <iostream>
#include <string>

int main() {
    std::string prenom = "Afi";
    int age = 17;
    double taille = 1.62;
    char groupe = 'B';
    bool inscrite = true;
    std::cout << prenom << ", " << age << " ans, " << taille << " m\n";
    std::cout << "Groupe " << groupe << ", inscrite : " << inscrite << "\n";
    return 0;
}
```

Affichage attendu :

    Afi, 17 ans, 1.62 m
    Groupe B, inscrite : 1

Trace :

- Cinq variables de cinq types différents sont déclarées et initialisées.
- std::cout affiche chaque valeur à son tour.
- Le char B s’affiche comme une lettre.
- Le booléen true s’affiche 1.

## Exemple guidé 2

```cpp
#include <iostream>

int main() {
    const int PRIX_TICKET = 200;
    int tickets = 3;
    std::cout << "Total : " << PRIX_TICKET * tickets << " FCFA\n";
    tickets = 5;
    std::cout << "Nouveau total : " << PRIX_TICKET * tickets << " FCFA\n";
    return 0;
}
```

Affichage attendu :

    Total : 600 FCFA
    Nouveau total : 1000 FCFA

Trace :

- PRIX_TICKET est constant : il ne changera pas.
- Le premier total vaut 200 × 3.
- tickets reçoit 5 sans répéter son type.
- Le second total vaut 200 × 5.

## Vérifier et expliquer

Pour chaque variable, demande-toi quel type décrit le mieux sa valeur. Essaie ensuite de ranger un texte dans un int pour lire le message du compilateur.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [Types fondamentaux](https://en.cppreference.com/w/cpp/language/types)
- [std::string](https://en.cppreference.com/w/cpp/string/basic_string)
- [const](https://en.cppreference.com/w/cpp/language/cv)
