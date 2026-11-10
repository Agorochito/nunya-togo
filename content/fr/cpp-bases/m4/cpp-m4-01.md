---
{
  "id": "cpp-m4-01",
  "title_fr": "Passer par valeur ou par référence",
  "course": "cpp-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "cpp-m3-03"
  ],
  "outcomes": [
    "Distinguer le passage par valeur, par référence (&) et par référence constante (const &).",
    "Écrire une fonction qui modifie les variables de l’appelant."
  ],
  "idea_fr": "Par défaut, une fonction reçoit des copies ; une référence lui donne accès à la variable d’origine.",
  "analogy_fr": "Donner une photocopie d’un document ou l’original : sur la copie, les ratures ne changent rien à l’original.",
  "examples": [
    {
      "code": "#include <iostream>\n\nvoid bonusCopie(int note) {\n    note = note + 2;\n}\n\nvoid bonusReference(int& note) {\n    note = note + 2;\n}\n\nint main() {\n    int maNote = 12;\n    bonusCopie(maNote);\n    std::cout << \"Après la copie : \" << maNote << \"\\n\";\n    bonusReference(maNote);\n    std::cout << \"Après la référence : \" << maNote << \"\\n\";\n    return 0;\n}",
      "expected_output": "Après la copie : 12\nAprès la référence : 14",
      "inputs": [],
      "trace_fr": [
        "bonusCopie reçoit une copie de 12 et la modifie.",
        "maNote vaut toujours 12.",
        "bonusReference travaille sur maNote elle-même.",
        "maNote vaut maintenant 14."
      ]
    },
    {
      "code": "#include <iostream>\n#include <vector>\n\nvoid minMax(const std::vector<int>& t, int& mini, int& maxi) {\n    mini = t[0];\n    maxi = t[0];\n    for (int x : t) {\n        if (x < mini) { mini = x; }\n        if (x > maxi) { maxi = x; }\n    }\n}\n\nint main() {\n    std::vector<int> ventes = {3000, 1200, 4500, 2500};\n    int petite, grande;\n    minMax(ventes, petite, grande);\n    std::cout << \"Écart : \" << grande - petite << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "Écart : 3300 FCFA",
      "inputs": [],
      "trace_fr": [
        "Le vecteur est transmis sans copie et sans modification possible.",
        "mini et maxi désignent petite et grande.",
        "La boucle remplit les deux variables de main.",
        "L’écart vaut 4500 − 1200."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier & quand la fonction doit modifier",
      "why_fr": "Seule une copie est modifiée.",
      "fix_fr": "Déclare le paramètre avec int&."
    },
    {
      "error": "Copier un gros vecteur pour le lire",
      "why_fr": "La copie coûte du temps et de la mémoire.",
      "fix_fr": "Utilise const std::vector<int>&."
    },
    {
      "error": "Échanger sans variable temporaire",
      "why_fr": "La première affectation écrase une valeur.",
      "fix_fr": "Sauve d’abord une valeur dans une variable temporaire."
    }
  ],
  "quiz": [
    {
      "question": "Après void f(int x) { x = 0; } et f(n) avec n = 5, que vaut n ?",
      "options": [
        "0",
        "5",
        "Indéfini",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "f modifie une copie.",
      "id": "cpp-m4-01-q1"
    },
    {
      "question": "Pourquoi écrire const std::string& texte pour un paramètre lu ?",
      "options": [
        "Pour pouvoir modifier le texte.",
        "Pour éviter une copie tout en interdisant la modification.",
        "Parce que std::string ne se copie pas.",
        "Pour le mettre en majuscules."
      ],
      "answer": 1,
      "explanation": "Pas de copie, pas de modification possible.",
      "id": "cpp-m4-01-q2"
    },
    {
      "question": "Peut-on appeler void doubler(int& n) avec doubler(7) ?",
      "options": [
        "Oui, n vaut 14.",
        "Non : 7 n’est pas une variable modifiable.",
        "Oui, mais rien ne change.",
        "Oui, et 7 devient 14."
      ],
      "answer": 1,
      "explanation": "Une référence simple doit désigner une variable.",
      "id": "cpp-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "passage par valeur",
      "definition": "Transmission d’une copie de l’argument."
    },
    {
      "term": "référence",
      "definition": "Autre nom d’une variable existante, déclaré avec &."
    },
    {
      "term": "référence constante",
      "definition": "Référence qui interdit la modification, déclarée avec const et &."
    },
    {
      "term": "variable temporaire",
      "definition": "Variable qui sauve une valeur le temps d’un échange."
    }
  ],
  "recap_fr": [
    "Distinguer le passage par valeur, par référence (&) et par référence constante (const &).",
    "Écrire une fonction qui modifie les variables de l’appelant.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "passage par valeur",
    "référence",
    "référence constante",
    "variable temporaire"
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
      "title": "Références",
      "url": "https://en.cppreference.com/w/cpp/language/reference"
    },
    {
      "title": "const",
      "url": "https://en.cppreference.com/w/cpp/language/cv"
    },
    {
      "title": "std::swap",
      "url": "https://en.cppreference.com/w/cpp/utility/swap"
    }
  ],
  "sources": [
    {
      "title": "Références",
      "url": "https://en.cppreference.com/w/cpp/language/reference",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "const",
      "url": "https://en.cppreference.com/w/cpp/language/cv",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::swap",
      "url": "https://en.cppreference.com/w/cpp/utility/swap",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand on appelle une fonction, ses paramètres reçoivent par défaut une copie des arguments : c’est le passage par valeur. La fonction peut modifier ses paramètres sans toucher aux variables de l’appelant. void ajouterBonus(int note) { note = note + 2; } ne change donc rien à la note de main : seule la copie a augmenté, puis elle disparaît à la fin de l’appel.

Parfois, on veut justement modifier la variable d’origine. On déclare alors le paramètre comme une référence, avec & après le type : void ajouterBonus(int& note) { note = note + 2; }. Une référence est un autre nom pour la même variable : la fonction travaille directement sur la variable de l’appelant. Après ajouterBonus(maNote), maNote a réellement augmenté. L’appel s’écrit exactement de la même façon ; seule la déclaration change.

Une référence doit désigner une variable existante : on ne peut pas appeler ajouterBonus(15), car 15 n’est pas une variable que l’on pourrait modifier. Le compilateur refuse cet appel.

L’exemple classique est l’échange de deux valeurs. void echanger(int& a, int& b) { int temporaire = a; a = b; b = temporaire; } échange réellement les deux variables de l’appelant. Sans les &, la fonction échangerait seulement ses copies, et rien ne changerait. Note la variable temporaire : sans elle, la première affectation écraserait une valeur avant qu’on ait pu la sauver.

Une fonction peut ainsi « renvoyer » plusieurs résultats à travers des références. Une fonction void minMax(const std::vector<int>& t, int& mini, int& maxi) remplit deux variables à la fois. Pour un seul résultat, un return reste plus clair.

La troisième forme, la référence constante, const std::vector<int>& t, combine deux avantages. Comme une référence, elle évite de copier un gros objet, un vecteur ou un long texte, ce qui économise du temps et de la mémoire. Comme const, elle interdit à la fonction de le modifier : toute tentative est refusée à la compilation. C’est la bonne écriture pour transmettre un vecteur, une std::string ou une structure qu’on veut seulement lire.

Pour choisir, pose-toi deux questions. La fonction doit-elle modifier la variable de l’appelant ? Alors référence simple. Sinon, l’objet est-il gros, comme un vecteur, un texte ou une structure ? Alors référence constante. Pour un petit type comme int, double, char ou bool, le passage par valeur suffit. Cette règle simple couvre la grande majorité des cas que tu rencontreras.

Les vérifications de ces exercices appellent tes fonctions sur leurs propres variables, puis lisent ces variables : une fonction qui ne modifie qu’une copie échoue aussitôt.

## Exemple guidé 1

```cpp
#include <iostream>

void bonusCopie(int note) {
    note = note + 2;
}

void bonusReference(int& note) {
    note = note + 2;
}

int main() {
    int maNote = 12;
    bonusCopie(maNote);
    std::cout << "Après la copie : " << maNote << "\n";
    bonusReference(maNote);
    std::cout << "Après la référence : " << maNote << "\n";
    return 0;
}
```

Affichage attendu :

    Après la copie : 12
    Après la référence : 14

Trace :

- bonusCopie reçoit une copie de 12 et la modifie.
- maNote vaut toujours 12.
- bonusReference travaille sur maNote elle-même.
- maNote vaut maintenant 14.

## Exemple guidé 2

```cpp
#include <iostream>
#include <vector>

void minMax(const std::vector<int>& t, int& mini, int& maxi) {
    mini = t[0];
    maxi = t[0];
    for (int x : t) {
        if (x < mini) { mini = x; }
        if (x > maxi) { maxi = x; }
    }
}

int main() {
    std::vector<int> ventes = {3000, 1200, 4500, 2500};
    int petite, grande;
    minMax(ventes, petite, grande);
    std::cout << "Écart : " << grande - petite << " FCFA\n";
    return 0;
}
```

Affichage attendu :

    Écart : 3300 FCFA

Trace :

- Le vecteur est transmis sans copie et sans modification possible.
- mini et maxi désignent petite et grande.
- La boucle remplit les deux variables de main.
- L’écart vaut 4500 − 1200.

## Vérifier et expliquer

Affiche la variable de main avant et après chaque appel pour voir si la fonction a travaillé sur une copie ou sur l’original.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [Références](https://en.cppreference.com/w/cpp/language/reference)
- [const](https://en.cppreference.com/w/cpp/language/cv)
- [std::swap](https://en.cppreference.com/w/cpp/utility/swap)
