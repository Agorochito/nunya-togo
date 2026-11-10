---
{
  "id": "cpp-m1-01",
  "title_fr": "Compiler et afficher un premier programme",
  "course": "cpp-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Écrire un programme complet avec #include, int main() et return 0.",
    "Afficher du texte avec std::cout, << et \"\\n\", et comprendre ce que fait la compilation."
  ],
  "idea_fr": "Un programme C++ est d’abord traduit par un compilateur ; seul le programme traduit s’exécute.",
  "analogy_fr": "Avant d’être construite, une maison existe sur un plan. Si le plan contient une erreur, l’architecte le refuse : rien n’est bâti tant qu’il n’est pas corrigé.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint main() {\n    std::cout << \"Bonjour depuis Lomé !\\n\";\n    std::cout << \"Bienvenue au club de code.\\n\";\n    return 0;\n}",
      "expected_output": "Bonjour depuis Lomé !\nBienvenue au club de code.",
      "inputs": [],
      "trace_fr": [
        "#include <iostream> rend std::cout disponible.",
        "L’exécution commence dans main.",
        "Chaque std::cout affiche une ligne terminée par \\n.",
        "return 0; termine le programme normalement."
      ]
    },
    {
      "code": "#include <iostream>\n\nint main() {\n    // Trois morceaux envoyés à la suite\n    std::cout << \"Marché \" << \"de \" << \"Kara\" << \"\\n\";\n    std::cout << \"Ouvert le samedi\";\n    return 0;\n}",
      "expected_output": "Marché de Kara\nOuvert le samedi",
      "inputs": [],
      "trace_fr": [
        "Le commentaire est ignoré par le compilateur.",
        "Les quatre morceaux s’affichent dans l’ordre des flèches.",
        "Aucun espace n’est ajouté : il faut les écrire.",
        "La seconde ligne n’a pas besoin de \\n final."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le point-virgule",
      "why_fr": "Le compilateur ne sait pas où l’instruction se termine.",
      "fix_fr": "Ajoute ; à la fin de chaque instruction."
    },
    {
      "error": "Écrire cout sans std::",
      "why_fr": "Le nom cout n’est pas connu sans son préfixe.",
      "fix_fr": "Écris std::cout, ou ajoute using namespace std; après les #include."
    },
    {
      "error": "Oublier #include <iostream>",
      "why_fr": "std::cout n’est pas déclaré.",
      "fix_fr": "Commence le programme par #include <iostream>."
    }
  ],
  "quiz": [
    {
      "question": "Que se passe-t-il si une seule ligne contient une erreur de syntaxe ?",
      "options": [
        "Les autres lignes s’exécutent quand même.",
        "Le programme n’est pas compilé et rien ne s’exécute.",
        "Seule la ligne fautive est ignorée.",
        "Le programme s’exécute deux fois."
      ],
      "answer": 1,
      "explanation": "La compilation échoue : il n’y a aucun programme à exécuter.",
      "id": "cpp-m1-01-q1"
    },
    {
      "question": "Où commence l’exécution d’un programme C++ ?",
      "options": [
        "À la première ligne du fichier.",
        "Au premier commentaire.",
        "Dans la fonction main.",
        "Au dernier return."
      ],
      "answer": 2,
      "explanation": "L’exécution commence toujours dans main.",
      "id": "cpp-m1-01-q2"
    },
    {
      "question": "Qu’affiche std::cout << \"A\" << \"B\"; ?",
      "options": [
        "A B",
        "AB",
        "A puis B sur deux lignes",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Les morceaux sont collés : aucun espace ni retour à la ligne n’est ajouté.",
      "id": "cpp-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "compilateur",
      "definition": "Programme qui traduit le code C++ en instructions exécutables."
    },
    {
      "term": "main",
      "definition": "Fonction principale par laquelle commence l’exécution."
    },
    {
      "term": "std::cout",
      "definition": "Flux de sortie standard, utilisé avec << pour afficher."
    },
    {
      "term": "bibliothèque standard",
      "definition": "Ensemble d’outils fournis avec C++, désignés par std::."
    }
  ],
  "recap_fr": [
    "Écrire un programme complet avec #include, int main() et return 0.",
    "Afficher du texte avec std::cout, << et \"\\n\", et comprendre ce que fait la compilation.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "compilateur",
    "main",
    "std::cout",
    "bibliothèque standard"
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
      "title": "std::cout",
      "url": "https://en.cppreference.com/w/cpp/io/cout"
    },
    {
      "title": "La fonction main",
      "url": "https://en.cppreference.com/w/cpp/language/main_function"
    },
    {
      "title": "#include",
      "url": "https://en.cppreference.com/w/cpp/preprocessor/include"
    }
  ],
  "sources": [
    {
      "title": "std::cout",
      "url": "https://en.cppreference.com/w/cpp/io/cout",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "La fonction main",
      "url": "https://en.cppreference.com/w/cpp/language/main_function",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "#include",
      "url": "https://en.cppreference.com/w/cpp/preprocessor/include",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

C++ est un langage compilé. Avant de s’exécuter, ton texte est lu en entier par un programme appelé compilateur, qui le traduit en instructions que le processeur comprend directement. Cette étape apporte deux choses. D’abord, le programme obtenu est très rapide : C++ fait tourner des jeux, des navigateurs, des logiciels bancaires et des systèmes embarqués. Ensuite, beaucoup d’erreurs sont détectées avant même l’exécution. En contrepartie, un texte qui contient une seule faute de syntaxe n’est pas exécuté du tout : le compilateur affiche un message, et il faut corriger avant de relancer.

Dans ce cours, la compilation se fait en ligne, sur un service gratuit nommé Wandbox, avec le compilateur GCC. Il faut donc une connexion pour exécuter ton code, et chaque essai prend quelques secondes. Les leçons et les questions restent lisibles hors ligne.

Tout programme C++ suit le même squelette. La ligne #include <iostream> donne accès aux outils d’affichage et de saisie de la bibliothèque standard. Vient ensuite la fonction principale, int main(), suivie d’accolades qui contiennent les instructions. L’exécution commence toujours à la première instruction de main. Le programme se termine par return 0;, qui signale au système que tout s’est bien passé.

Pour afficher, on utilise std::cout, le flux de sortie standard, suivi de l’opérateur <<. On peut l’imaginer comme une flèche qui envoie le texte vers l’écran : std::cout << "Bonjour"; affiche Bonjour. Plusieurs morceaux s’enchaînent avec plusieurs flèches : std::cout << "Lomé" << " " << "Kara";. Le préfixe std:: signifie que cout appartient à la bibliothèque standard ; tu rencontreras souvent la ligne using namespace std; qui permet de l’omettre, mais ce cours garde std:: pour que l’origine de chaque nom reste visible.

Rien n’impose de retour à la ligne. Pour passer à la ligne suivante, ajoute "\n" dans le texte. std::endl produit aussi un saut de ligne, mais il force en plus l’écriture immédiate ; pour un simple affichage, "\n" suffit.

Chaque instruction se termine par un point-virgule. Oublier un point-virgule est l’erreur la plus fréquente : le compilateur s’arrête et indique souvent la ligne suivante, car c’est là qu’il découvre que l’instruction précédente ne s’était pas terminée. C++ distingue aussi les majuscules : Main ou Cout ne sont pas reconnus.

Les messages du compilateur sont en anglais et parfois longs. Ne lis que le premier : l’atelier te l’affiche avec sa ligne et une explication en français. Une erreur en entraîne souvent d’autres ; corriger la première suffit fréquemment à faire disparaître les suivantes.

Les commentaires commencent par // et sont ignorés par le compilateur. Ils servent à expliquer une intention à la personne qui lira le programme, y compris toi-même dans quelques semaines.

## Exemple guidé 1

```cpp
#include <iostream>

int main() {
    std::cout << "Bonjour depuis Lomé !\n";
    std::cout << "Bienvenue au club de code.\n";
    return 0;
}
```

Affichage attendu :

    Bonjour depuis Lomé !
    Bienvenue au club de code.

Trace :

- #include <iostream> rend std::cout disponible.
- L’exécution commence dans main.
- Chaque std::cout affiche une ligne terminée par \n.
- return 0; termine le programme normalement.

## Exemple guidé 2

```cpp
#include <iostream>

int main() {
    // Trois morceaux envoyés à la suite
    std::cout << "Marché " << "de " << "Kara" << "\n";
    std::cout << "Ouvert le samedi";
    return 0;
}
```

Affichage attendu :

    Marché de Kara
    Ouvert le samedi

Trace :

- Le commentaire est ignoré par le compilateur.
- Les quatre morceaux s’affichent dans l’ordre des flèches.
- Aucun espace n’est ajouté : il faut les écrire.
- La seconde ligne n’a pas besoin de \n final.

## Vérifier et expliquer

Lance ton programme, compare chaque ligne avec l’affichage attendu, puis retire volontairement un point-virgule pour apprendre à lire le message du compilateur.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [std::cout](https://en.cppreference.com/w/cpp/io/cout)
- [La fonction main](https://en.cppreference.com/w/cpp/language/main_function)
- [#include](https://en.cppreference.com/w/cpp/preprocessor/include)
