---
{
  "id": "cpp-m4-03",
  "title_fr": "Projet : le bulletin de la classe",
  "course": "cpp-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "cpp-m4-02"
  ],
  "outcomes": [
    "Assembler structures, vecteurs, fonctions et références dans un programme complet.",
    "Valider les données lues et produire un bulletin aligné avec std::setw."
  ],
  "idea_fr": "Un projet réunit tout le cours : des données bien typées, des fonctions courtes et vérifiées, et un affichage soigné.",
  "analogy_fr": "Le conseil de classe : chaque professeur apporte ses notes, le secrétaire calcule les moyennes, le directeur signe le bulletin. Chacun a un rôle précis.",
  "examples": [
    {
      "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nstruct Eleve {\n    std::string nom;\n    std::vector<int> notes;\n};\n\ndouble moyenneEleve(const Eleve& e) {\n    int somme = 0;\n    for (int n : e.notes) {\n        somme += n;\n    }\n    return static_cast<double>(somme) / e.notes.size();\n}\n\nstd::string mention(double moyenne) {\n    if (moyenne >= 16) { return \"Très bien\"; }\n    if (moyenne >= 14) { return \"Bien\"; }\n    if (moyenne >= 12) { return \"Assez bien\"; }\n    if (moyenne >= 10) { return \"Passable\"; }\n    return \"Insuffisant\";\n}\n\nint main() {\n    Eleve afi = {\"Afi\", {14, 16, 15}};\n    double m = moyenneEleve(afi);\n    std::cout << afi.nom << \" : \" << m << \" → \" << mention(m) << \"\\n\";\n    return 0;\n}",
      "expected_output": "Afi : 15 → Bien",
      "inputs": [],
      "trace_fr": [
        "La structure contient un nom et un vecteur de notes.",
        "moyenneEleve additionne 45 et divise par 3 en double.",
        "mention compare 15 aux seuils.",
        "Les deux fonctions sont vérifiées avant d’écrire la lecture."
      ]
    },
    {
      "code": "#include <iostream>\n#include <iomanip>\n#include <string>\n\nint main() {\n    std::cout << std::left << std::setw(8) << \"Nom\" << std::right << std::setw(8) << \"Moyenne\" << \"\\n\";\n    std::cout << std::left << std::setw(8) << \"Afi\" << std::right << std::setw(8) << std::fixed << std::setprecision(2) << 15.0 << \"\\n\";\n    std::cout << std::left << std::setw(8) << \"Kossi\" << std::right << std::setw(8) << 9.5 << \"\\n\";\n    return 0;\n}",
      "expected_output": "Nom      Moyenne\nAfi        15.00\nKossi       9.50",
      "inputs": [],
      "trace_fr": [
        "std::setw(8) fixe la largeur du prochain élément seulement.",
        "std::left aligne les noms à gauche.",
        "std::right aligne les moyennes à droite.",
        "fixed et setprecision(2) restent actifs pour la suite."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Calculer la moyenne d’un élève sans note",
      "why_fr": "Diviser par une taille nulle est une erreur.",
      "fix_fr": "Vérifie que le vecteur de notes n’est pas vide."
    },
    {
      "error": "Accepter une note hors de 0 à 20",
      "why_fr": "Le calcul semble juste mais le résultat est faux.",
      "fix_fr": "Valide chaque note à la lecture."
    },
    {
      "error": "Croire que setw s’applique à tout l’affichage",
      "why_fr": "setw ne règle que l’élément suivant.",
      "fix_fr": "Répète setw devant chaque colonne."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi passer la classe en const std::vector<Eleve>& à major() ?",
      "options": [
        "Pour la trier.",
        "Pour éviter une copie tout en interdisant la modification.",
        "Parce que les vecteurs ne se copient pas.",
        "Pour ajouter un élève."
      ],
      "answer": 1,
      "explanation": "major lit la classe sans la changer.",
      "id": "cpp-m4-03-q1"
    },
    {
      "question": "Combien de caractères occupe std::setw(6) << \"Ama\" ?",
      "options": [
        "3",
        "6",
        "9",
        "Cela dépend de std::left"
      ],
      "answer": 1,
      "explanation": "setw complète avec des espaces jusqu’à 6 caractères.",
      "id": "cpp-m4-03-q2"
    },
    {
      "question": "Que faire d’une note 25 lue pour un élève ?",
      "options": [
        "La garder.",
        "La ramener à 20 sans le dire.",
        "La refuser et la compter comme note ignorée.",
        "Arrêter le programme."
      ],
      "answer": 2,
      "explanation": "Une donnée impossible est refusée et signalée.",
      "id": "cpp-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "découpage",
      "definition": "Division d’un problème en fonctions courtes et nommées."
    },
    {
      "term": "validation",
      "definition": "Contrôle d’une donnée avant son utilisation."
    },
    {
      "term": "std::setw",
      "definition": "Réglage de la largeur du prochain élément affiché."
    },
    {
      "term": "major",
      "definition": "Élève qui a la meilleure moyenne de la classe."
    }
  ],
  "recap_fr": [
    "Assembler structures, vecteurs, fonctions et références dans un programme complet.",
    "Valider les données lues et produire un bulletin aligné avec std::setw.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "découpage",
    "validation",
    "std::setw",
    "major"
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
      "title": "std::setw",
      "url": "https://en.cppreference.com/w/cpp/io/manip/setw"
    },
    {
      "title": "std::left et std::right",
      "url": "https://en.cppreference.com/w/cpp/io/manip/left"
    },
    {
      "title": "struct",
      "url": "https://en.cppreference.com/w/cpp/language/class"
    },
    {
      "title": "std::vector",
      "url": "https://en.cppreference.com/w/cpp/container/vector"
    }
  ],
  "sources": [
    {
      "title": "std::setw",
      "url": "https://en.cppreference.com/w/cpp/io/manip/setw",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::left et std::right",
      "url": "https://en.cppreference.com/w/cpp/io/manip/left",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "struct",
      "url": "https://en.cppreference.com/w/cpp/language/class",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "std::vector",
      "url": "https://en.cppreference.com/w/cpp/container/vector",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Ce dernier chapitre assemble tout le cours dans un programme complet : le bulletin d’une classe. Le programme lit les élèves et leurs notes, refuse les notes impossibles, calcule chaque moyenne, attribue une mention et affiche un tableau aligné avec la moyenne de la classe et le major. Avant d’écrire la moindre ligne, il faut découper le problème.

Commence par les données. Une struct Eleve regroupe le nom et un vecteur de notes : struct Eleve { std::string nom; std::vector<int> notes; };. Une structure peut donc contenir un vecteur, et un vecteur peut contenir des structures : std::vector<Eleve> classe; représente toute la classe.

Viennent ensuite les fonctions de calcul, chacune courte et vérifiable seule. double moyenneEleve(const Eleve& e) additionne les notes et divise en double. std::string mention(double moyenne) choisit le texte selon les seuils déjà rencontrés. const Eleve& major(const std::vector<Eleve>& classe) renvoie une référence vers le meilleur élève sans le copier. Les paramètres sont des références constantes, car aucune de ces fonctions ne modifie la classe.

La validation protège les calculs. Une note doit être comprise entre 0 et 20 ; un élève sans note n’a pas de moyenne et diviser par zéro serait une erreur. La lecture vérifie chaque note et ignore celles qui sont hors limites, en les comptant pour signaler le problème à la fin. Ce principe vaut pour tous les programmes : ne jamais faire confiance à une donnée avant de l’avoir vérifiée.

Pour un affichage en colonnes, <iomanip> fournit std::setw, qui fixe la largeur du prochain élément affiché, et std::left, qui aligne à gauche. std::cout << std::left << std::setw(8) << nom; occupe toujours huit caractères, en complétant par des espaces. Comme pour la longueur des textes, la largeur se compte en octets : les noms de ce projet sont sans accent pour que les colonnes restent droites.

L’ordre de travail compte autant que le code. Écris d’abord la structure et moyenneEleve, vérifie-la sur un élève. Ajoute mention, puis major. Écris ensuite la lecture, en affichant ce qui a été lu. Termine par la mise en forme. À chaque étape le programme compile et fonctionne : tu n’accumules jamais trente lignes non testées.

Ce projet ouvre la suite du parcours. Les classes ajouteront des fonctions membres à la structure Eleve ; la bibliothèque standard offre std::sort pour classer les élèves ; un programme réel lirait les notes depuis un fichier ou une base de données. Les notions que tu maîtrises maintenant, types, conditions, boucles, fonctions, vecteurs, chaînes, références et structures, restent au cœur de tous ces programmes.

Pour finir, relis ton code comme une autre personne le lirait : chaque fonction fait-elle une seule chose ? Une donnée absurde est-elle refusée proprement ?

## Exemple guidé 1

```cpp
#include <iostream>
#include <vector>
#include <string>

struct Eleve {
    std::string nom;
    std::vector<int> notes;
};

double moyenneEleve(const Eleve& e) {
    int somme = 0;
    for (int n : e.notes) {
        somme += n;
    }
    return static_cast<double>(somme) / e.notes.size();
}

std::string mention(double moyenne) {
    if (moyenne >= 16) { return "Très bien"; }
    if (moyenne >= 14) { return "Bien"; }
    if (moyenne >= 12) { return "Assez bien"; }
    if (moyenne >= 10) { return "Passable"; }
    return "Insuffisant";
}

int main() {
    Eleve afi = {"Afi", {14, 16, 15}};
    double m = moyenneEleve(afi);
    std::cout << afi.nom << " : " << m << " → " << mention(m) << "\n";
    return 0;
}
```

Affichage attendu :

    Afi : 15 → Bien

Trace :

- La structure contient un nom et un vecteur de notes.
- moyenneEleve additionne 45 et divise par 3 en double.
- mention compare 15 aux seuils.
- Les deux fonctions sont vérifiées avant d’écrire la lecture.

## Exemple guidé 2

```cpp
#include <iostream>
#include <iomanip>
#include <string>

int main() {
    std::cout << std::left << std::setw(8) << "Nom" << std::right << std::setw(8) << "Moyenne" << "\n";
    std::cout << std::left << std::setw(8) << "Afi" << std::right << std::setw(8) << std::fixed << std::setprecision(2) << 15.0 << "\n";
    std::cout << std::left << std::setw(8) << "Kossi" << std::right << std::setw(8) << 9.5 << "\n";
    return 0;
}
```

Affichage attendu :

    Nom      Moyenne
    Afi        15.00
    Kossi       9.50

Trace :

- std::setw(8) fixe la largeur du prochain élément seulement.
- std::left aligne les noms à gauche.
- std::right aligne les moyennes à droite.
- fixed et setprecision(2) restent actifs pour la suite.

## Vérifier et expliquer

Avance par étapes : structure, puis chaque fonction, puis la lecture, puis l’affichage. Recompile après chaque étape.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [std::setw](https://en.cppreference.com/w/cpp/io/manip/setw)
- [std::left et std::right](https://en.cppreference.com/w/cpp/io/manip/left)
- [struct](https://en.cppreference.com/w/cpp/language/class)
- [std::vector](https://en.cppreference.com/w/cpp/container/vector)
