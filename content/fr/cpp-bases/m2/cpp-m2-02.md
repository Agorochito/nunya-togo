---
{
  "id": "cpp-m2-02",
  "title_fr": "Répéter avec while et for",
  "course": "cpp-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "cpp-m2-01"
  ],
  "outcomes": [
    "Écrire une boucle for avec compteur et une boucle while avec condition d’arrêt.",
    "Accumuler un total ou un compte dans une variable initialisée avant la boucle."
  ],
  "idea_fr": "Une boucle répète un bloc tant qu’une condition reste vraie ; une variable qui change à chaque tour garantit l’arrêt.",
  "analogy_fr": "Pour remplir une citerne, on verse seau après seau en comptant, et l’on s’arrête quand elle est pleine.",
  "examples": [
    {
      "code": "#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        std::cout << \"Tour \" << i << \"\\n\";\n    }\n    std::cout << \"Fin\\n\";\n    return 0;\n}",
      "expected_output": "Tour 1\nTour 2\nTour 3\nTour 4\nTour 5\nFin",
      "inputs": [],
      "trace_fr": [
        "i commence à 1.",
        "Tant que i <= 5, le bloc affiche le tour.",
        "Après chaque tour, i augmente de 1.",
        "Quand i vaut 6, la boucle s’arrête et Fin s’affiche."
      ]
    },
    {
      "code": "#include <iostream>\n\nint main() {\n    int nombre;\n    std::cin >> nombre;\n    int total = 0;\n    for (int i = 0; i < nombre; i++) {\n        int vente;\n        std::cin >> vente;\n        total += vente;\n    }\n    std::cout << \"Ventes : \" << nombre << \"\\n\";\n    std::cout << \"Total : \" << total << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "Ventes : 3\nTotal : 4500 FCFA",
      "inputs": [
        "3",
        "1500",
        "2000",
        "1000"
      ],
      "trace_fr": [
        "La première saisie annonce 3 ventes.",
        "total vaut 0 avant la boucle.",
        "Chaque tour lit une vente et l’ajoute : 1500, 2000, 1000.",
        "Le total final vaut 4500."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de modifier la variable d’une boucle while",
      "why_fr": "La condition reste vraie indéfiniment.",
      "fix_fr": "Vérifie qu’une instruction du bloc rapproche la condition de false."
    },
    {
      "error": "Initialiser le total dans la boucle",
      "why_fr": "Il repart de zéro à chaque tour.",
      "fix_fr": "Déclare int total = 0; avant la boucle."
    },
    {
      "error": "Faire un tour de trop",
      "why_fr": "La condition utilise <= au lieu de <.",
      "fix_fr": "Trace le premier et le dernier tour à la main."
    }
  ],
  "quiz": [
    {
      "question": "Combien de tours fait for (int i = 0; i < 4; i++) ?",
      "options": [
        "3",
        "5",
        "4",
        "Indéfiniment"
      ],
      "answer": 2,
      "explanation": "i prend 0, 1, 2 et 3.",
      "id": "cpp-m2-02-q1"
    },
    {
      "question": "Que vaut t après int t = 0; for (int i = 1; i <= 3; i++) { t += i; } ?",
      "options": [
        "3",
        "6",
        "4",
        "0"
      ],
      "answer": 1,
      "explanation": "1 + 2 + 3 = 6.",
      "id": "cpp-m2-02-q2"
    },
    {
      "question": "Quand le bloc d’un while ne s’exécute-t-il jamais ?",
      "options": [
        "Quand la condition est fausse dès le départ.",
        "Quand la boucle contient un if.",
        "Quand le compteur vaut 1.",
        "Jamais : il s’exécute toujours une fois."
      ],
      "answer": 0,
      "explanation": "while teste la condition avant chaque tour, y compris le premier.",
      "id": "cpp-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "boucle",
      "definition": "Structure qui répète un bloc d’instructions."
    },
    {
      "term": "compteur",
      "definition": "Variable qui suit le numéro du tour, souvent i."
    },
    {
      "term": "accumulateur",
      "definition": "Variable initialisée avant une boucle et mise à jour à chaque tour."
    },
    {
      "term": "boucle infinie",
      "definition": "Boucle dont la condition ne devient jamais fausse."
    }
  ],
  "recap_fr": [
    "Écrire une boucle for avec compteur et une boucle while avec condition d’arrêt.",
    "Accumuler un total ou un compte dans une variable initialisée avant la boucle.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "boucle",
    "compteur",
    "accumulateur",
    "boucle infinie"
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
      "title": "while",
      "url": "https://en.cppreference.com/w/cpp/language/while"
    },
    {
      "title": "for",
      "url": "https://en.cppreference.com/w/cpp/language/for"
    },
    {
      "title": "Affectation composée",
      "url": "https://en.cppreference.com/w/cpp/language/operator_assignment"
    }
  ],
  "sources": [
    {
      "title": "while",
      "url": "https://en.cppreference.com/w/cpp/language/while",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "for",
      "url": "https://en.cppreference.com/w/cpp/language/for",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Affectation composée",
      "url": "https://en.cppreference.com/w/cpp/language/operator_assignment",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une boucle répète un bloc d’instructions. C++ en propose plusieurs ; les deux essentielles sont while et for.

while (condition) { … } répète le bloc tant que la condition est vraie. La condition est testée avant chaque tour : si elle est fausse dès le départ, le bloc ne s’exécute jamais. C’est au bloc de modifier la variable testée ; sinon, la condition reste vraie pour toujours. Une telle boucle infinie bloque le programme : l’atelier l’arrête au bout d’un délai, mais un vrai programme resterait figé. Avant d’écrire une boucle while, repère l’instruction qui rapproche la condition de false.

La boucle for convient quand on connaît le nombre de tours. Sa parenthèse contient trois parties séparées par des points-virgules : l’initialisation, la condition et l’évolution. for (int i = 1; i <= 5; i++) se lit : commence avec i à 1 ; tant que i <= 5, exécute le bloc ; après chaque tour, augmente i de 1. i++ est un raccourci pour i = i + 1. La variable i déclarée dans la parenthèse n’existe que dans la boucle.

Une boucle sert souvent à accumuler. Pour additionner des valeurs, on déclare int total = 0; avant la boucle, puis on écrit total += valeur; à chaque tour. += est un raccourci pour total = total + valeur. L’initialisation doit précéder la boucle : placée à l’intérieur, elle remettrait le total à zéro à chaque tour. Le même principe sert à compter les valeurs qui respectent une condition, avec compte++.

On combine souvent boucle et saisies. Si la première saisie indique combien de valeurs suivent, une boucle for lit exactement ce nombre de valeurs : chaque std::cin >> placé dans la boucle lit la valeur suivante.

Pour comprendre une boucle, trace-la à la main. Note dans un petit tableau la valeur de chaque variable au début de chaque tour. Les erreurs typiques apparaissent alors : un tour de trop parce que la condition utilise <= au lieu de <, un compteur qui commence à 1 au lieu de 0, un total jamais initialisé. Les compteurs commencent souvent à 0 en C++ : for (int i = 0; i < n; i++) fait exactement n tours.

Une boucle peut contenir des conditions : à chaque tour, if décide quoi faire de la valeur courante. Ce couple boucle et condition est la base de la plupart des traitements de données. Enfin, break quitte immédiatement la boucle, et continue passe au tour suivant ; utilise-les avec modération, car une condition claire se lit souvent mieux.

## Exemple guidé 1

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        std::cout << "Tour " << i << "\n";
    }
    std::cout << "Fin\n";
    return 0;
}
```

Affichage attendu :

    Tour 1
    Tour 2
    Tour 3
    Tour 4
    Tour 5
    Fin

Trace :

- i commence à 1.
- Tant que i <= 5, le bloc affiche le tour.
- Après chaque tour, i augmente de 1.
- Quand i vaut 6, la boucle s’arrête et Fin s’affiche.

## Exemple guidé 2

```cpp
#include <iostream>

int main() {
    int nombre;
    std::cin >> nombre;
    int total = 0;
    for (int i = 0; i < nombre; i++) {
        int vente;
        std::cin >> vente;
        total += vente;
    }
    std::cout << "Ventes : " << nombre << "\n";
    std::cout << "Total : " << total << " FCFA\n";
    return 0;
}
```

Saisies de l’exemple : 3 · 1500 · 2000 · 1000

Affichage attendu :

    Ventes : 3
    Total : 4500 FCFA

Trace :

- La première saisie annonce 3 ventes.
- total vaut 0 avant la boucle.
- Chaque tour lit une vente et l’ajoute : 1500, 2000, 1000.
- Le total final vaut 4500.

## Vérifier et expliquer

Trace à la main le premier, le deuxième et le dernier tour avant de lancer le programme.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [while](https://en.cppreference.com/w/cpp/language/while)
- [for](https://en.cppreference.com/w/cpp/language/for)
- [Affectation composée](https://en.cppreference.com/w/cpp/language/operator_assignment)
