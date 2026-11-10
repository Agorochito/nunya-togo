---
{
  "id": "java-m4-01",
  "title_fr": "Créer ses propres classes et objets",
  "course": "java-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "java-m3-03"
  ],
  "outcomes": [
    "Définir une classe avec des attributs, un constructeur et des méthodes.",
    "Créer plusieurs objets avec new et appeler leurs méthodes."
  ],
  "idea_fr": "Une classe est un modèle ; chaque objet créé à partir d’elle a ses propres valeurs.",
  "analogy_fr": "Le moule à briques du maçon est unique, mais chaque brique sortie du moule est un objet distinct : l’une peut être posée au mur, l’autre rester au sol.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        Produit riz = new Produit(\"Riz\", 500, 3);\n        Produit huile = new Produit(\"Huile\", 1200, 2);\n        System.out.println(riz.nom + \" : \" + riz.total() + \" FCFA\");\n        System.out.println(huile.nom + \" : \" + huile.total() + \" FCFA\");\n        huile.quantite = 1;\n        System.out.println(\"Nouveau total huile : \" + huile.total());\n    }\n}\n\nclass Produit {\n    String nom;\n    int prix;\n    int quantite;\n\n    Produit(String nom, int prix, int quantite) {\n        this.nom = nom;\n        this.prix = prix;\n        this.quantite = quantite;\n    }\n\n    int total() {\n        return prix * quantite;\n    }\n}",
      "expected_output": "Riz : 1500 FCFA\nHuile : 2400 FCFA\nNouveau total huile : 1200",
      "inputs": [],
      "trace_fr": [
        "Deux objets Produit sont créés avec new.",
        "Chacun calcule son total avec ses propres attributs.",
        "Modifier huile.quantite ne touche pas riz.",
        "Le nouveau total de l’huile est 1200."
      ]
    },
    {
      "code": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Produit> panier = new ArrayList<>();\n        panier.add(new Produit(\"Gari\", 300, 4));\n        panier.add(new Produit(\"Sucre\", 800, 1));\n        int somme = 0;\n        for (Produit p : panier) {\n            somme += p.total();\n        }\n        System.out.println(panier.size() + \" produits, \" + somme + \" FCFA\");\n    }\n}\n\nclass Produit {\n    String nom;\n    int prix;\n    int quantite;\n\n    Produit(String nom, int prix, int quantite) {\n        this.nom = nom;\n        this.prix = prix;\n        this.quantite = quantite;\n    }\n\n    int total() {\n        return prix * quantite;\n    }\n}",
      "expected_output": "2 produits, 2000 FCFA",
      "inputs": [],
      "trace_fr": [
        "La liste contient des objets Produit.",
        "Chaque objet est créé directement dans add.",
        "La boucle additionne 1200 et 800."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire nom = nom; dans le constructeur",
      "why_fr": "Le paramètre se range dans lui-même ; l’attribut reste null.",
      "fix_fr": "Écris this.nom = nom;."
    },
    {
      "error": "Donner un type de retour au constructeur",
      "why_fr": "void Produit(…) devient une méthode ordinaire, jamais appelée par new.",
      "fix_fr": "Le constructeur n’a aucun type de retour."
    },
    {
      "error": "Appeler une méthode sur la classe au lieu d’un objet",
      "why_fr": "Produit.total() ne sait pas de quel produit il s’agit.",
      "fix_fr": "Crée un objet puis appelle riz.total()."
    }
  ],
  "quiz": [
    {
      "question": "Que crée new Produit(\"Riz\", 500, 3) ?",
      "options": [
        "Une nouvelle classe",
        "Un nouvel objet",
        "Une méthode",
        "Un tableau"
      ],
      "answer": 1,
      "explanation": "new crée un objet à partir du modèle qu’est la classe.",
      "id": "java-m4-01-q1"
    },
    {
      "question": "Dans un constructeur, que désigne this.prix ?",
      "options": [
        "Le paramètre prix",
        "L’attribut prix de l’objet en cours de création",
        "Une constante",
        "La classe"
      ],
      "answer": 1,
      "explanation": "this désigne l’objet lui-même.",
      "id": "java-m4-01-q2"
    },
    {
      "question": "Quelle est la valeur par défaut d’un attribut String jamais rempli ?",
      "options": [
        "\"\"",
        "0",
        "null",
        "false"
      ],
      "answer": 2,
      "explanation": "Les attributs objets valent null par défaut.",
      "id": "java-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "classe",
      "definition": "Modèle qui décrit les attributs et les méthodes d’un type d’objet."
    },
    {
      "term": "objet",
      "definition": "Exemplaire créé à partir d’une classe avec new."
    },
    {
      "term": "constructeur",
      "definition": "Méthode spéciale, du nom de la classe, qui prépare un nouvel objet."
    },
    {
      "term": "this",
      "definition": "Mot-clé qui désigne l’objet sur lequel on travaille."
    }
  ],
  "recap_fr": [
    "Définir une classe avec des attributs, un constructeur et des méthodes.",
    "Créer plusieurs objets avec new et appeler leurs méthodes.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "classe",
    "objet",
    "constructeur",
    "this"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "java",
  "runtime": "java",
  "level": "debutant",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "Java 21 (OpenJDK) compilé en ligne sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seuls le programme et les saisies de test sont envoyés, sans nom ni compte. Les leçons, exemples et questions restent lisibles hors ligne. Les données sont fictives.",
  "references": [
    {
      "title": "Créer des classes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/creating-classes/"
    },
    {
      "title": "Classes et objets (dev.java)",
      "url": "https://dev.java/learn/classes-objects/"
    }
  ],
  "sources": [
    {
      "title": "Créer des classes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/creating-classes/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Classes et objets (dev.java)",
      "url": "https://dev.java/learn/classes-objects/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Java est un langage orienté objet. Jusqu’ici, tes programmes manipulaient des valeurs séparées : un nom, un prix, une quantité. Une classe permet de les regrouper dans un nouveau type qui a du sens pour ton problème : un Produit, un Élève, un Compte. Tu as déjà utilisé des classes écrites par d’autres : String, Scanner, ArrayList. Tu vas maintenant écrire les tiennes.

Une classe se déclare avec le mot class, en dehors de Main, dans le même fichier. Dans cet atelier, elle s’écrit sans public, car un seul fichier contient tout le programme. À l’intérieur, les attributs sont des variables qui décrivent chaque objet : String nom; int prix;. Les méthodes décrivent ce que l’objet sait faire : int total() { return prix * quantite; }. Elles s’écrivent sans static, car elles travaillent sur les attributs d’un objet précis.

Le constructeur est une méthode spéciale qui prépare un nouvel objet. Il porte exactement le nom de la classe et n’a pas de type de retour : Produit(String nom, int prix, int quantite) { … }. Quand un paramètre a le même nom qu’un attribut, this.nom désigne l’attribut de l’objet, et nom seul le paramètre. this.nom = nom; range donc la valeur reçue dans l’objet. Écrire nom = nom; ne ferait rien d’utile : l’attribut resterait vide.

On crée un objet avec new : Produit riz = new Produit("Riz", 500, 3);. La variable riz contient une référence vers l’objet, comme pour un tableau. On accède à ses attributs et à ses méthodes avec un point : riz.nom, riz.total(). Chaque objet a ses propres valeurs : modifier riz.prix ne change pas le prix d’un autre produit.

Un attribut sans valeur reçoit une valeur par défaut : 0 pour un nombre, false pour un boolean et null pour un objet, y compris un String. null signifie « aucun objet ». Appeler une méthode sur null provoque une NullPointerException, une erreur que tu croiseras souvent : elle signale presque toujours un objet jamais créé ou un attribut jamais rempli.

Les objets se rangent comme les autres valeurs : dans des variables, des tableaux ou une ArrayList<Produit>. Une méthode peut recevoir un objet en paramètre ou en renvoyer un.

Pourquoi tant d’efforts ? Parce qu’un programme organisé en classes ressemble au domaine qu’il décrit. Le calcul du total vit dans Produit, au même endroit que les données dont il a besoin. Quand la règle change, on sait où la modifier, et main reste courte.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        Produit riz = new Produit("Riz", 500, 3);
        Produit huile = new Produit("Huile", 1200, 2);
        System.out.println(riz.nom + " : " + riz.total() + " FCFA");
        System.out.println(huile.nom + " : " + huile.total() + " FCFA");
        huile.quantite = 1;
        System.out.println("Nouveau total huile : " + huile.total());
    }
}

class Produit {
    String nom;
    int prix;
    int quantite;

    Produit(String nom, int prix, int quantite) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
    }

    int total() {
        return prix * quantite;
    }
}
```

Affichage attendu :

    Riz : 1500 FCFA
    Huile : 2400 FCFA
    Nouveau total huile : 1200

Trace :

- Deux objets Produit sont créés avec new.
- Chacun calcule son total avec ses propres attributs.
- Modifier huile.quantite ne touche pas riz.
- Le nouveau total de l’huile est 1200.

## Exemple guidé 2

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Produit> panier = new ArrayList<>();
        panier.add(new Produit("Gari", 300, 4));
        panier.add(new Produit("Sucre", 800, 1));
        int somme = 0;
        for (Produit p : panier) {
            somme += p.total();
        }
        System.out.println(panier.size() + " produits, " + somme + " FCFA");
    }
}

class Produit {
    String nom;
    int prix;
    int quantite;

    Produit(String nom, int prix, int quantite) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
    }

    int total() {
        return prix * quantite;
    }
}
```

Affichage attendu :

    2 produits, 2000 FCFA

Trace :

- La liste contient des objets Produit.
- Chaque objet est créé directement dans add.
- La boucle additionne 1200 et 800.

## Vérifier et expliquer

Dessine chaque objet comme une boîte avec ses attributs, puis suis chaque instruction en modifiant la bonne boîte.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Créer des classes (dev.java)](https://dev.java/learn/classes-objects/creating-classes/)
- [Classes et objets (dev.java)](https://dev.java/learn/classes-objects/)
