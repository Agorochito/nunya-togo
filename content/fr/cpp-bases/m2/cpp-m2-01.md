---
{
  "id": "cpp-m2-01",
  "title_fr": "Décider avec if et else",
  "course": "cpp-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "cpp-m1-03"
  ],
  "outcomes": [
    "Écrire if, else if et else avec les comparaisons == != < > <= >=.",
    "Combiner des conditions avec && et || et tester les cas limites."
  ],
  "idea_fr": "Une condition choisit quel bloc exécuter ; seul le premier bloc dont la condition est vraie s’exécute.",
  "analogy_fr": "Au poste de péage, l’agent regarde le véhicule et applique un seul tarif : le premier qui correspond.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint main() {\n    int note;\n    std::cin >> note;\n    if (note >= 16) {\n        std::cout << \"Très bien\\n\";\n    } else if (note >= 10) {\n        std::cout << \"Admis\\n\";\n    } else {\n        std::cout << \"À reprendre\\n\";\n    }\n    return 0;\n}",
      "expected_output": "Admis",
      "inputs": [
        "12"
      ],
      "trace_fr": [
        "La saisie 12 est lue dans note.",
        "12 >= 16 est faux : le premier bloc est ignoré.",
        "12 >= 10 est vrai : Admis s’affiche.",
        "Le bloc else n’est pas exécuté."
      ]
    },
    {
      "code": "#include <iostream>\n#include <string>\n\nint main() {\n    int age;\n    std::string membre;\n    std::cin >> age >> membre;\n    if (age >= 13 && age <= 17 && membre == \"oui\") {\n        std::cout << \"Tarif jeune membre : 500 FCFA\\n\";\n    } else {\n        std::cout << \"Tarif normal : 1000 FCFA\\n\";\n    }\n    return 0;\n}",
      "expected_output": "Tarif jeune membre : 500 FCFA",
      "inputs": [
        "15",
        "oui"
      ],
      "trace_fr": [
        "L’âge 15 est entre 13 et 17.",
        "Le texte lu vaut oui.",
        "Les trois conditions reliées par && sont vraies.",
        "Le tarif jeune membre s’affiche."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire = au lieu de ==",
      "why_fr": "Un seul = affecte une valeur au lieu de comparer.",
      "fix_fr": "Utilise == pour tester une égalité."
    },
    {
      "error": "Écrire 13 <= age <= 17",
      "why_fr": "Cette écriture compare un booléen à 17 et reste toujours vraie.",
      "fix_fr": "Écris age >= 13 && age <= 17."
    },
    {
      "error": "Tester la condition la plus large en premier",
      "why_fr": "Le premier bloc vrai cache les suivants.",
      "fix_fr": "Classe les conditions de la plus restrictive à la plus large."
    }
  ],
  "quiz": [
    {
      "question": "Avec n = 12, quel bloc s’exécute ? if (n > 5) {A} else if (n > 10) {B} else {C}",
      "options": [
        "A",
        "B",
        "A puis B",
        "C"
      ],
      "answer": 0,
      "explanation": "Le premier bloc vrai est retenu.",
      "id": "cpp-m2-01-q1"
    },
    {
      "question": "Quelle condition accepte 13 à 17 inclus ?",
      "options": [
        "13 <= a <= 17",
        "a >= 13 || a <= 17",
        "a >= 13 && a <= 17",
        "a > 13 && a < 17"
      ],
      "answer": 2,
      "explanation": "&& exige les deux bornes, incluses avec >= et <=.",
      "id": "cpp-m2-01-q2"
    },
    {
      "question": "Que fait if (x = 0) ?",
      "options": [
        "Compare x à 0.",
        "Range 0 dans x puis teste la valeur 0, donc faux.",
        "Provoque toujours une erreur de compilation.",
        "Affiche 0."
      ],
      "answer": 1,
      "explanation": "C’est une affectation : x est modifié.",
      "id": "cpp-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "condition",
      "definition": "Expression vraie ou fausse qui décide si un bloc s’exécute."
    },
    {
      "term": "opérateur de comparaison",
      "definition": "Opérateur ==, !=, <, >, <= ou >= qui produit un bool."
    },
    {
      "term": "opérateur logique",
      "definition": "Opérateur && (et), || (ou) ou ! (non)."
    },
    {
      "term": "cas limite",
      "definition": "Valeur située exactement sur une borne."
    }
  ],
  "recap_fr": [
    "Écrire if, else if et else avec les comparaisons == != < > <= >=.",
    "Combiner des conditions avec && et || et tester les cas limites.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "condition",
    "opérateur de comparaison",
    "opérateur logique",
    "cas limite"
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
      "title": "if",
      "url": "https://en.cppreference.com/w/cpp/language/if"
    },
    {
      "title": "Comparaisons",
      "url": "https://en.cppreference.com/w/cpp/language/operator_comparison"
    },
    {
      "title": "Opérateurs logiques",
      "url": "https://en.cppreference.com/w/cpp/language/operator_logical"
    }
  ],
  "sources": [
    {
      "title": "if",
      "url": "https://en.cppreference.com/w/cpp/language/if",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Comparaisons",
      "url": "https://en.cppreference.com/w/cpp/language/operator_comparison",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Opérateurs logiques",
      "url": "https://en.cppreference.com/w/cpp/language/operator_logical",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une condition permet au programme de choisir entre plusieurs chemins. if (condition) { … } exécute le bloc entre accolades seulement si la condition est vraie. else ajoute un bloc pour le cas contraire, et else if teste une autre condition entre les deux. Le programme lit les conditions de haut en bas et n’exécute que le premier bloc vrai ; les suivants sont ignorés.

Les comparaisons produisent un bool. == teste l’égalité et != la différence ; <, >, <= et >= comparent les valeurs. N’écris jamais un seul = dans une condition : if (note = 10) range 10 dans note au lieu de comparer, et la condition devient presque toujours vraie. Le compilateur ne le refuse pas toujours, d’où l’intérêt de relire chaque comparaison.

L’ordre des conditions compte. Pour attribuer une mention, teste la plus exigeante d’abord : si la note vaut 17, la condition note >= 16 doit passer avant note >= 10, sinon c’est « Admis » qui serait retenu. Range les conditions de la plus restrictive à la plus large.

Les conditions se combinent. && signifie « et » : les deux côtés doivent être vrais. || signifie « ou » : un seul suffit. ! inverse une condition. age >= 13 && age <= 17 décrit un intervalle, bornes comprises. En mathématiques on écrirait 13 ≤ age ≤ 17 ; en C++, l’écriture 13 <= age <= 17 compile mais ne fait pas ce que l’on croit : elle compare d’abord 13 <= age, qui donne 0 ou 1, puis compare ce résultat à 17, ce qui est toujours vrai. Écris toujours deux comparaisons reliées par &&.

Les erreurs de condition se cachent aux bornes. Si la consigne dit « à partir de 10 », la valeur 10 doit être acceptée : il faut >=. Pour chaque condition, imagine trois saisies : juste en dessous de la borne, la borne exacte et juste au-dessus. Les exercices testent ces bornes avec des cas cachés.

Les accolades délimitent les blocs. C++ accepte de les omettre pour une seule instruction, mais ajouter une ligne plus tard sans accolades crée une erreur discrète : la nouvelle ligne s’exécute toujours. Écris-les systématiquement et décale le contenu de quatre espaces pour rendre la structure visible.

Les textes std::string se comparent aussi avec == : reponse == "oui" est vrai si les textes sont identiques, majuscules comprises. Une condition peut enfin protéger un calcul : avant de diviser, vérifie que le diviseur n’est pas nul et affiche un message clair dans le cas contraire.

## Exemple guidé 1

```cpp
#include <iostream>

int main() {
    int note;
    std::cin >> note;
    if (note >= 16) {
        std::cout << "Très bien\n";
    } else if (note >= 10) {
        std::cout << "Admis\n";
    } else {
        std::cout << "À reprendre\n";
    }
    return 0;
}
```

Saisies de l’exemple : 12

Affichage attendu :

    Admis

Trace :

- La saisie 12 est lue dans note.
- 12 >= 16 est faux : le premier bloc est ignoré.
- 12 >= 10 est vrai : Admis s’affiche.
- Le bloc else n’est pas exécuté.

## Exemple guidé 2

```cpp
#include <iostream>
#include <string>

int main() {
    int age;
    std::string membre;
    std::cin >> age >> membre;
    if (age >= 13 && age <= 17 && membre == "oui") {
        std::cout << "Tarif jeune membre : 500 FCFA\n";
    } else {
        std::cout << "Tarif normal : 1000 FCFA\n";
    }
    return 0;
}
```

Saisies de l’exemple : 15 · oui

Affichage attendu :

    Tarif jeune membre : 500 FCFA

Trace :

- L’âge 15 est entre 13 et 17.
- Le texte lu vaut oui.
- Les trois conditions reliées par && sont vraies.
- Le tarif jeune membre s’affiche.

## Vérifier et expliquer

Pour chaque condition, essaie la borne exacte et les valeurs juste avant et juste après.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [if](https://en.cppreference.com/w/cpp/language/if)
- [Comparaisons](https://en.cppreference.com/w/cpp/language/operator_comparison)
- [Opérateurs logiques](https://en.cppreference.com/w/cpp/language/operator_logical)
