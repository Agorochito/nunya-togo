---
{
  "id": "cpp-m4-02",
  "title_fr": "Regrouper des données avec struct",
  "course": "cpp-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "cpp-m4-01"
  ],
  "outcomes": [
    "Définir une struct avec plusieurs champs et accéder à ses champs avec le point.",
    "Ranger des structures dans un std::vector et les traiter avec des fonctions."
  ],
  "idea_fr": "Une struct regroupe plusieurs valeurs qui décrivent une même chose sous un seul type.",
  "analogy_fr": "Une fiche d’inscription réunit le nom, l’âge et la classe d’un élève sur une seule feuille, au lieu de trois carnets séparés.",
  "examples": [
    {
      "code": "#include <iostream>\n#include <string>\n\nstruct Eleve {\n    std::string nom;\n    int note;\n    char classe;\n};\n\nint main() {\n    Eleve e = {\"Afi\", 15, 'B'};\n    e.note = e.note + 1;\n    std::cout << e.nom << \" (\" << e.classe << \") : \" << e.note << \"/20\\n\";\n    return 0;\n}",
      "expected_output": "Afi (B) : 16/20",
      "inputs": [],
      "trace_fr": [
        "Le type Eleve regroupe trois champs.",
        "e est initialisé dans l’ordre des champs.",
        "Le champ note est modifié avec le point.",
        "L’affichage lit chaque champ."
      ]
    },
    {
      "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nstruct Produit {\n    std::string nom;\n    int prix;\n    int stock;\n};\n\nint valeurStock(const std::vector<Produit>& produits) {\n    int total = 0;\n    for (const Produit& p : produits) {\n        total += p.prix * p.stock;\n    }\n    return total;\n}\n\nint main() {\n    std::vector<Produit> boutique = {{\"Savon\", 350, 12}, {\"Huile\", 1250, 4}};\n    boutique.push_back({\"Riz\", 600, 10});\n    std::cout << boutique.size() << \" produits, valeur : \" << valeurStock(boutique) << \" FCFA\\n\";\n    return 0;\n}",
      "expected_output": "3 produits, valeur : 15200 FCFA",
      "inputs": [],
      "trace_fr": [
        "Le vecteur commence avec deux produits complets.",
        "push_back ajoute un troisième produit.",
        "valeurStock lit chaque produit sans le copier.",
        "4200 + 5000 + 6000 = 15 200."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le point-virgule après la struct",
      "why_fr": "La définition n’est pas terminée.",
      "fix_fr": "Termine par };."
    },
    {
      "error": "Utiliser des vecteurs parallèles",
      "why_fr": "Un tri ou une suppression désaligne les données.",
      "fix_fr": "Regroupe les champs dans une struct."
    },
    {
      "error": "Initialiser dans le mauvais ordre",
      "why_fr": "Les valeurs vont dans les mauvais champs, ou ne compilent pas.",
      "fix_fr": "Respecte l’ordre de déclaration des champs."
    }
  ],
  "quiz": [
    {
      "question": "Comment lire le champ note de la variable e ?",
      "options": [
        "e->note",
        "e.note",
        "note(e)",
        "e[note]"
      ],
      "answer": 1,
      "explanation": "Le point accède à un champ.",
      "id": "cpp-m4-02-q1"
    },
    {
      "question": "Que vaut p.stock après Produit p = {\"Sel\", 100, 7}; ?",
      "options": [
        "100",
        "7",
        "\"Sel\"",
        "0"
      ],
      "answer": 1,
      "explanation": "Les valeurs suivent l’ordre des champs : nom, prix, stock.",
      "id": "cpp-m4-02-q2"
    },
    {
      "question": "Pourquoi préférer std::vector<Eleve> à deux vecteurs noms et notes ?",
      "options": [
        "Pour économiser une ligne.",
        "Pour que chaque nom reste attaché à sa note.",
        "Parce que les vecteurs de texte n’existent pas.",
        "Pour trier plus vite."
      ],
      "answer": 1,
      "explanation": "La struct garde les données d’un élève ensemble.",
      "id": "cpp-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "struct",
      "definition": "Type défini par le programmeur qui regroupe plusieurs champs."
    },
    {
      "term": "champ",
      "definition": "Variable faisant partie d’une structure, lue avec le point."
    },
    {
      "term": "initialisation par accolades",
      "definition": "Création d’une structure en donnant ses champs dans l’ordre."
    },
    {
      "term": "vecteurs parallèles",
      "definition": "Plusieurs vecteurs alignés par indice, fragiles à manipuler."
    }
  ],
  "recap_fr": [
    "Définir une struct avec plusieurs champs et accéder à ses champs avec le point.",
    "Ranger des structures dans un std::vector et les traiter avec des fonctions.",
    "Lire le premier message du compilateur, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "c++",
    "cpp",
    "débutant",
    "struct",
    "champ",
    "initialisation par accolades",
    "vecteurs parallèles"
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
      "title": "struct et class",
      "url": "https://en.cppreference.com/w/cpp/language/class"
    },
    {
      "title": "Initialisation d’agrégat",
      "url": "https://en.cppreference.com/w/cpp/language/aggregate_initialization"
    },
    {
      "title": "std::vector",
      "url": "https://en.cppreference.com/w/cpp/container/vector"
    }
  ],
  "sources": [
    {
      "title": "struct et class",
      "url": "https://en.cppreference.com/w/cpp/language/class",
      "scope": "Référence technique de la bibliothèque et du langage C++ ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Initialisation d’agrégat",
      "url": "https://en.cppreference.com/w/cpp/language/aggregate_initialization",
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

Un élève a un nom, une note et une classe. Avec ce que tu sais déjà, il faudrait trois vecteurs parallèles : un pour les noms, un pour les notes, un pour les classes, en espérant que les indices restent toujours alignés. Une seule erreur de tri, et les notes ne correspondent plus aux noms. La struct résout ce problème : elle crée un nouveau type qui regroupe plusieurs champs.

struct Eleve { std::string nom; int note; char classe; }; déclare le type Eleve. Ne manque pas le point-virgule après l’accolade finale : son oubli provoque une erreur de compilation souvent signalée plus loin. On place la définition au-dessus des fonctions qui l’utilisent.

On crée ensuite des variables de ce type comme d’habitude : Eleve e;. On accède à chaque champ avec un point : e.nom = "Afi"; e.note = 15;. On peut aussi tout initialiser d’un coup, dans l’ordre des champs : Eleve e = {"Afi", 15, 'B'};. Chaque champ se comporte comme une variable de son type : on l’affiche, on le compare, on le modifie.

La force des structures apparaît avec les vecteurs. std::vector<Eleve> classe; range une liste d’élèves complets. classe.push_back({"Kossi", 12, 'A'}); ajoute un élève ; classe[0].nom lit le nom du premier. La boucle for (const Eleve& e : classe) parcourt chaque élève sans le copier. Chaque fiche reste entière : trier ou filtrer la liste ne peut plus séparer un nom de sa note.

Les fonctions reçoivent et renvoient des structures. Pour lire une structure, passe-la en référence constante : double moyenne(const std::vector<Eleve>& classe). Pour la modifier, en référence simple : void ajouterPoint(Eleve& e). Une fonction peut aussi renvoyer une structure entière, par exemple le meilleur élève d’une classe.

Choisis les types des champs avec soin : int pour une note entière, double pour une moyenne, std::string pour un nom. Donne au type un nom au singulier, avec une majuscule, comme Eleve, Produit ou Trajet ; la variable qui contient une liste porte plutôt un nom au pluriel ou collectif, comme classe ou produits.

Les structures préparent la programmation orientée objet, que tu rencontreras dans la suite du parcours avec les classes. Une classe ajoute aux champs des fonctions membres et des règles d’accès. L’idée de départ reste la même : regrouper ce qui va ensemble.

Dans les exercices, les vérifications créent leurs propres structures et appellent tes fonctions dessus. Respecte exactement les noms et l’ordre des champs demandés : la vérification initialise les structures avec des accolades, dans cet ordre.

## Exemple guidé 1

```cpp
#include <iostream>
#include <string>

struct Eleve {
    std::string nom;
    int note;
    char classe;
};

int main() {
    Eleve e = {"Afi", 15, 'B'};
    e.note = e.note + 1;
    std::cout << e.nom << " (" << e.classe << ") : " << e.note << "/20\n";
    return 0;
}
```

Affichage attendu :

    Afi (B) : 16/20

Trace :

- Le type Eleve regroupe trois champs.
- e est initialisé dans l’ordre des champs.
- Le champ note est modifié avec le point.
- L’affichage lit chaque champ.

## Exemple guidé 2

```cpp
#include <iostream>
#include <vector>
#include <string>

struct Produit {
    std::string nom;
    int prix;
    int stock;
};

int valeurStock(const std::vector<Produit>& produits) {
    int total = 0;
    for (const Produit& p : produits) {
        total += p.prix * p.stock;
    }
    return total;
}

int main() {
    std::vector<Produit> boutique = {{"Savon", 350, 12}, {"Huile", 1250, 4}};
    boutique.push_back({"Riz", 600, 10});
    std::cout << boutique.size() << " produits, valeur : " << valeurStock(boutique) << " FCFA\n";
    return 0;
}
```

Affichage attendu :

    3 produits, valeur : 15200 FCFA

Trace :

- Le vecteur commence avec deux produits complets.
- push_back ajoute un troisième produit.
- valeurStock lit chaque produit sans le copier.
- 4200 + 5000 + 6000 = 15 200.

## Vérifier et expliquer

Affiche chaque structure après l’avoir créée, puis vérifie que l’ordre des valeurs entre accolades correspond à l’ordre des champs.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la référence C++ :

- [struct et class](https://en.cppreference.com/w/cpp/language/class)
- [Initialisation d’agrégat](https://en.cppreference.com/w/cpp/language/aggregate_initialization)
- [std::vector](https://en.cppreference.com/w/cpp/container/vector)
