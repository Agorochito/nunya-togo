---
{
  "id": "cpp-m3-01",
  "title_fr": "Découper un programme en fonctions",
  "course": "cpp-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "cpp-m2-03"
  ],
  "outcomes": [
    "Définir une fonction avec un type de retour, des paramètres typés et return.",
    "Distinguer une fonction qui renvoie une valeur d’une fonction void qui agit."
  ],
  "idea_fr": "Une fonction donne un nom à un calcul réutilisable : elle reçoit des paramètres, renvoie un résultat et ne dépend pas du reste du programme.",
  "analogy_fr": "Le moulin du quartier : on y apporte du maïs, on récupère de la farine. Peu importe comment il tourne à l’intérieur.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint prixTotal(int prix, int quantite) {\n    return prix * quantite;\n}\n\nint main() {\n    int tomates = prixTotal(500, 3);\n    int oignons = prixTotal(250, 2);\n    std::cout << \"Tomates : \" << tomates << \" FCFA\\n\";\n    std::cout << \"Panier : \" << tomates + oignons << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "Tomates : 1500 FCFA\nPanier : 2000 FCFA",
      "inputs": [],
      "trace_fr": [
        "La fonction est définie au-dessus de main.",
        "Le premier appel renvoie 1500.",
        "Le second renvoie 500.",
        "main additionne et affiche les résultats."
      ]
    },
    {
      "code": "#include <iostream>\n#include <string>\n\nbool estMajeur(int age) {\n    return age >= 18;\n}\n\nvoid saluer(std::string nom, int age) {\n    if (estMajeur(age)) {\n        std::cout << \"Bonjour \" << nom << \"\\n\";\n    } else {\n        std::cout << \"Salut \" << nom << \"\\n\";\n    }\n}\n\nint main() {\n    saluer(\"Afi\", 17);\n    saluer(\"Kossi\", 25);\n    return 0;\n}",
      "expected_output": "Salut Afi\nBonjour Kossi",
      "inputs": [],
      "trace_fr": [
        "estMajeur renvoie directement le résultat de la comparaison.",
        "saluer est void : elle affiche sans renvoyer.",
        "Pour 17, estMajeur renvoie false.",
        "Pour 25, elle renvoie true."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Afficher au lieu de renvoyer",
      "why_fr": "La valeur ne peut pas être réutilisée.",
      "fix_fr": "Termine la fonction par return et affiche dans main."
    },
    {
      "error": "Appeler une fonction définie plus bas sans prototype",
      "why_fr": "Le compilateur ne la connaît pas encore.",
      "fix_fr": "Écris la fonction au-dessus de main ou ajoute un prototype."
    },
    {
      "error": "Oublier return sur un chemin",
      "why_fr": "La valeur renvoyée est imprévisible.",
      "fix_fr": "Vérifie que chaque branche renvoie une valeur."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie prixTotal(200, 4) si la fonction renvoie prix * quantite ?",
      "options": [
        "204",
        "800",
        "50",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Les arguments sont copiés dans les paramètres : 200 × 4.",
      "id": "cpp-m3-01-q1"
    },
    {
      "question": "Que signifie void dans void afficher(int n) ?",
      "options": [
        "La fonction ne prend pas de paramètre.",
        "La fonction ne renvoie pas de valeur.",
        "La fonction est vide.",
        "La fonction renvoie 0."
      ],
      "answer": 1,
      "explanation": "void indique l’absence de valeur de retour.",
      "id": "cpp-m3-01-q2"
    },
    {
      "question": "Pourquoi une fonction ne voit-elle pas les variables de main ?",
      "options": [
        "Les variables d’une fonction sont locales.",
        "main est toujours la dernière.",
        "Les variables doivent être en majuscules.",
        "Elle les voit toujours."
      ],
      "answer": 0,
      "explanation": "Chaque fonction a ses propres variables ; on transmet les valeurs par paramètres.",
      "id": "cpp-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "fonction",
      "definition": "Bloc de code nommé, appelé avec des arguments."
    },
    {
      "term": "paramètre",
      "definition": "Variable d’une fonction qui reçoit une valeur lors de l’appel."
    },
    {
      "term": "valeur de retour",
      "definition": "Résultat renvoyé par return."
    },
    {
      "term": "prototype",
      "definition": "Déclaration d’une fonction sans son corps, terminée par un point-virgule."
    }
  ],
  "recap_fr": [
    "Définir une fonction avec un type de retour, des paramètres typés et return.",
    "Distinguer une fonction qui renvoie une valeur d’une fonction void qui agit.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "fonction",
    "paramètre",
    "valeur de retour",
    "prototype"
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
      "title": "Les fonctions",
      "url": "https://en.cppreference.com/w/cpp/language/functions"
    },
    {
      "title": "return",
      "url": "https://en.cppreference.com/w/cpp/language/return"
    },
    {
      "title": "Déclaration de fonction",
      "url": "https://en.cppreference.com/w/cpp/language/function"
    }
  ],
  "sources": [
    {
      "title": "Les fonctions",
      "url": "https://en.cppreference.com/w/cpp/language/functions",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "return",
      "url": "https://en.cppreference.com/w/cpp/language/return",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Déclaration de fonction",
      "url": "https://en.cppreference.com/w/cpp/language/function",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand un même calcul revient plusieurs fois, le recopier multiplie les risques : une correction oubliée à un endroit suffit à fausser le résultat. Une fonction regroupe ce calcul sous un nom. Tu en utilises déjà une : main.

Une fonction se définit par son type de retour, son nom, ses paramètres entre parenthèses et son corps entre accolades : int prixTotal(int prix, int quantite) { return prix * quantite; }. Le type de retour, ici int, annonce ce que la fonction renvoie. Chaque paramètre a son propre type. L’appel prixTotal(500, 3) copie 500 dans prix et 3 dans quantite, exécute le corps et renvoie 1500 à l’endroit de l’appel. On peut ranger ce résultat dans une variable, l’afficher ou l’utiliser dans un autre calcul.

return renvoie la valeur et termine immédiatement la fonction. Une fonction dont le type de retour n’est pas void doit renvoyer une valeur sur tous les chemins : si un if renvoie dans un cas et pas dans l’autre, le résultat est imprévisible. Le compilateur te prévient souvent par un avertissement ; prends-le au sérieux.

Une fonction de type void ne renvoie rien : elle agit, par exemple en affichant. void afficherTicket(int numero) { std::cout << "Ticket " << numero << "\n"; }. On l’appelle seule sur sa ligne. Règle pratique : une fonction qui calcule renvoie une valeur sans afficher ; c’est le programme principal qui décide de l’affichage. Les exercices vérifient directement ce que renvoient tes fonctions, avec d’autres valeurs que celles de l’énoncé.

Le compilateur lit le fichier de haut en bas : une fonction doit être déclarée avant d’être appelée. Le plus simple est de l’écrire au-dessus de main. Dans les grands programmes, on place en haut un prototype, c’est-à-dire la première ligne suivie d’un point-virgule : int prixTotal(int prix, int quantite); et l’on écrit le corps plus loin.

Les variables d’une fonction sont locales : elles n’existent que pendant l’appel. Une variable de main n’est pas visible dans une autre fonction, et inversement. Si une fonction a besoin d’une valeur, on la lui passe en paramètre. Cette séparation est une protection : chaque fonction se lit et se teste seule.

Les types comptent aussi pour les paramètres et le retour. Une fonction double moyenne(int a, int b) doit convertir avant de diviser, comme tu l’as appris : return (a + b) / 2.0;. Le 2.0 suffit à rendre la division décimale.

Une fonction peut appeler d’autres fonctions. On découpe ainsi un problème en petites étapes nommées. Choisis des noms qui décrivent ce que la fonction renvoie ou fait : prixTotal, estMajeur, afficherRecu. Une fonction dont le nom commence par est renvoie habituellement un bool.

## Exemple guidé 1

```cpp
#include <iostream>

int prixTotal(int prix, int quantite) {
    return prix * quantite;
}

int main() {
    int tomates = prixTotal(500, 3);
    int oignons = prixTotal(250, 2);
    std::cout << "Tomates : " << tomates << " FCFA\n";
    std::cout << "Panier : " << tomates + oignons << " FCFA\n";
    return 0;
}
```

Affichage attendu :

    Tomates : 1500 FCFA
    Panier : 2000 FCFA

Trace :

- La fonction est définie au-dessus de main.
- Le premier appel renvoie 1500.
- Le second renvoie 500.
- main additionne et affiche les résultats.

## Exemple guidé 2

```cpp
#include <iostream>
#include <string>

bool estMajeur(int age) {
    return age >= 18;
}

void saluer(std::string nom, int age) {
    if (estMajeur(age)) {
        std::cout << "Bonjour " << nom << "\n";
    } else {
        std::cout << "Salut " << nom << "\n";
    }
}

int main() {
    saluer("Afi", 17);
    saluer("Kossi", 25);
    return 0;
}
```

Affichage attendu :

    Salut Afi
    Bonjour Kossi

Trace :

- estMajeur renvoie directement le résultat de la comparaison.
- saluer est void : elle affiche sans renvoyer.
- Pour 17, estMajeur renvoie false.
- Pour 25, elle renvoie true.

## Vérifier et expliquer

Appelle chaque fonction depuis main avec plusieurs valeurs avant de passer à la suite, puis vérifie les cas limites.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [Les fonctions](https://en.cppreference.com/w/cpp/language/functions)
- [return](https://en.cppreference.com/w/cpp/language/return)
- [Déclaration de fonction](https://en.cppreference.com/w/cpp/language/function)
