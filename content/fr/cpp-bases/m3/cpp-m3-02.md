---
{
  "id": "cpp-m3-02",
  "title_fr": "Ranger des valeurs dans un std::vector",
  "course": "cpp-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "cpp-m3-01"
  ],
  "outcomes": [
    "Créer un std::vector, ajouter avec push_back et lire avec [] et size().",
    "Parcourir un vecteur avec une boucle for et calculer somme, maximum et compte."
  ],
  "idea_fr": "Un vecteur range une liste de valeurs du même type, repérées par un indice qui commence à 0.",
  "analogy_fr": "Une rangée de casiers numérotés à partir de zéro, à laquelle on peut ajouter un casier au bout.",
  "examples": [
    {
      "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> notes = {12, 15, 9};\n    notes.push_back(17);\n    std::cout << \"Première : \" << notes[0] << \"\\n\";\n    std::cout << \"Nombre : \" << notes.size() << \"\\n\";\n    for (int i = 0; i < (int) notes.size(); i++) {\n        std::cout << i + 1 << \". \" << notes[i] << \"\\n\";\n    }\n    return 0;\n}",
      "expected_output": "Première : 12\nNombre : 4\n1. 12\n2. 15\n3. 9\n4. 17",
      "inputs": [],
      "trace_fr": [
        "Le vecteur commence avec trois notes.",
        "push_back ajoute 17 à la fin.",
        "notes[0] désigne la première note.",
        "La boucle numérote chaque note à partir de l’indice + 1."
      ]
    },
    {
      "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> ventes;\n    for (int i = 0; i < n; i++) {\n        int v;\n        std::cin >> v;\n        ventes.push_back(v);\n    }\n    int total = 0;\n    int meilleure = ventes[0];\n    for (int v : ventes) {\n        total += v;\n        if (v > meilleure) {\n            meilleure = v;\n        }\n    }\n    std::cout << \"Total : \" << total << \" FCFA\\n\";\n    std::cout << \"Meilleure vente : \" << meilleure << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "Total : 11200 FCFA\nMeilleure vente : 4500 FCFA",
      "inputs": [
        "4",
        "3000",
        "1200",
        "4500",
        "2500"
      ],
      "trace_fr": [
        "La première boucle lit quatre ventes dans le vecteur.",
        "Le record commence avec la première vente.",
        "La seconde boucle additionne et compare chaque vente.",
        "Le total vaut 11 200 et le record 4 500."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Commencer à compter à 1",
      "why_fr": "Le premier élément est à l’indice 0.",
      "fix_fr": "Le dernier est à size() - 1."
    },
    {
      "error": "Lire un indice hors du vecteur",
      "why_fr": "[] ne vérifie rien : le résultat est imprévisible.",
      "fix_fr": "Vérifie l’indice, ou utilise at() pendant la mise au point."
    },
    {
      "error": "Initialiser le maximum à 0",
      "why_fr": "Le résultat est faux si toutes les valeurs sont négatives.",
      "fix_fr": "Initialise avec le premier élément."
    }
  ],
  "quiz": [
    {
      "question": "Avec std::vector<int> t = {5, 8, 2}, que vaut t[1] ?",
      "options": [
        "5",
        "8",
        "2",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Les indices commencent à 0.",
      "id": "cpp-m3-02-q1"
    },
    {
      "question": "Que fait t.push_back(9) ?",
      "options": [
        "Remplace le premier élément.",
        "Ajoute 9 à la fin.",
        "Supprime 9.",
        "Vide le vecteur."
      ],
      "answer": 1,
      "explanation": "push_back ajoute un élément à la fin.",
      "id": "cpp-m3-02-q2"
    },
    {
      "question": "Pourquoi t[10] est-il dangereux sur un vecteur de 3 éléments ?",
      "options": [
        "Il renvoie toujours 0.",
        "[] ne vérifie pas l’indice : la lecture est imprévisible.",
        "Il ajoute 7 éléments.",
        "Il ne compile pas."
      ],
      "answer": 1,
      "explanation": "Un accès hors limites n’est pas détecté par [].",
      "id": "cpp-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "std::vector",
      "definition": "Liste de valeurs du même type, de taille variable."
    },
    {
      "term": "indice",
      "definition": "Position d’un élément, à partir de 0."
    },
    {
      "term": "push_back",
      "definition": "Méthode qui ajoute un élément à la fin d’un vecteur."
    },
    {
      "term": "accès hors limites",
      "definition": "Lecture d’un indice qui n’existe pas, non détectée par []."
    }
  ],
  "recap_fr": [
    "Créer un std::vector, ajouter avec push_back et lire avec [] et size().",
    "Parcourir un vecteur avec une boucle for et calculer somme, maximum et compte.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "std::vector",
    "indice",
    "push_back",
    "accès hors limites"
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
      "title": "std::vector",
      "url": "https://en.cppreference.com/w/cpp/container/vector"
    },
    {
      "title": "push_back",
      "url": "https://en.cppreference.com/w/cpp/container/vector/push_back"
    },
    {
      "title": "Boucle for sur un intervalle",
      "url": "https://en.cppreference.com/w/cpp/language/range-for"
    }
  ],
  "sources": [
    {
      "title": "std::vector",
      "url": "https://en.cppreference.com/w/cpp/container/vector",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "push_back",
      "url": "https://en.cppreference.com/w/cpp/container/vector/push_back",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Boucle for sur un intervalle",
      "url": "https://en.cppreference.com/w/cpp/language/range-for",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Pour gérer les notes d’une classe ou les ventes d’une semaine, il faudrait des dizaines de variables. Un std::vector range toutes ces valeurs sous un seul nom. Il demande #include <vector>, et l’on précise le type des éléments entre chevrons : std::vector<int> ventes; crée un vecteur vide d’entiers. On peut aussi l’initialiser directement : std::vector<int> notes = {12, 15, 9};.

Chaque élément a un indice, sa position, qui commence à 0. notes[0] vaut 12 et notes[2] vaut 9. size() renvoie le nombre d’éléments : notes.size() vaut 3. Le dernier élément se trouve donc à l’indice size() - 1. push_back ajoute un élément à la fin : notes.push_back(17); fait passer la taille à 4.

Attention : lire un indice qui n’existe pas, comme notes[10], n’est pas détecté par []. Le programme lit alors une zone mémoire quelconque, ou s’arrête brutalement. C’est l’une des erreurs les plus dangereuses en C++, et la source de nombreuses failles de sécurité. La méthode at, notes.at(10), vérifie l’indice et signale l’erreur ; pendant l’apprentissage, elle aide à repérer ces fautes.

Pour parcourir un vecteur, deux formes de for sont courantes. La forme classique utilise un indice : for (int i = 0; i < (int) notes.size(); i++). La conversion (int) évite un avertissement, car size() renvoie un entier non signé. La forme « pour chaque élément », plus simple, ne demande pas d’indice : for (int note : notes) { … } place chaque valeur à son tour dans note. Utilise-la quand l’indice n’est pas utile.

Les traitements vus avec les boucles s’appliquent directement : additionner dans un total initialisé à 0, compter les valeurs qui respectent une condition, chercher le maximum. Pour le maximum, initialise le record avec le premier élément, notes[0], plutôt qu’avec 0 : sinon, un vecteur de valeurs négatives donnerait un résultat faux. Cette initialisation suppose que le vecteur n’est pas vide ; vérifie-le avant.

On remplit souvent un vecteur à partir de saisies : une boucle lit chaque valeur et l’ajoute avec push_back. Séparer la lecture du traitement rend le programme plus clair : une première boucle lit, une seconde calcule.

Un vecteur se passe aussi en paramètre d’une fonction. Écris alors const std::vector<int>& notes : ce paramètre évite de copier tout le vecteur et interdit de le modifier. La leçon sur les références explique en détail ce & ; pour l’instant, retiens cette écriture comme la bonne façon de transmettre une liste à lire.

## Exemple guidé 1

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> notes = {12, 15, 9};
    notes.push_back(17);
    std::cout << "Première : " << notes[0] << "\n";
    std::cout << "Nombre : " << notes.size() << "\n";
    for (int i = 0; i < (int) notes.size(); i++) {
        std::cout << i + 1 << ". " << notes[i] << "\n";
    }
    return 0;
}
```

Affichage attendu :

    Première : 12
    Nombre : 4
    1. 12
    2. 15
    3. 9
    4. 17

Trace :

- Le vecteur commence avec trois notes.
- push_back ajoute 17 à la fin.
- notes[0] désigne la première note.
- La boucle numérote chaque note à partir de l’indice + 1.

## Exemple guidé 2

```cpp
#include <iostream>
#include <vector>

int main() {
    int n;
    std::cin >> n;
    std::vector<int> ventes;
    for (int i = 0; i < n; i++) {
        int v;
        std::cin >> v;
        ventes.push_back(v);
    }
    int total = 0;
    int meilleure = ventes[0];
    for (int v : ventes) {
        total += v;
        if (v > meilleure) {
            meilleure = v;
        }
    }
    std::cout << "Total : " << total << " FCFA\n";
    std::cout << "Meilleure vente : " << meilleure << " FCFA\n";
    return 0;
}
```

Saisies de l’exemple : 4 · 3000 · 1200 · 4500 · 2500

Affichage attendu :

    Total : 11200 FCFA
    Meilleure vente : 4500 FCFA

Trace :

- La première boucle lit quatre ventes dans le vecteur.
- Le record commence avec la première vente.
- La seconde boucle additionne et compare chaque vente.
- Le total vaut 11 200 et le record 4 500.

## Vérifier et expliquer

Affiche la taille du vecteur après chaque étape, et essaie at() avec un indice trop grand pour voir l’erreur signalée.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [std::vector](https://en.cppreference.com/w/cpp/container/vector)
- [push_back](https://en.cppreference.com/w/cpp/container/vector/push_back)
- [Boucle for sur un intervalle](https://en.cppreference.com/w/cpp/language/range-for)
