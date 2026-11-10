---
{
  "id": "java-m4-03",
  "title_fr": "Projet : la boutique du quartier",
  "course": "java-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "java-m4-02"
  ],
  "outcomes": [
    "Combiner classes, ArrayList, méthodes et exceptions dans un programme complet.",
    "Lire des données structurées, appliquer des opérations et produire un rapport."
  ],
  "idea_fr": "Un vrai programme assemble les briques déjà vues : des objets qui gardent leurs règles, une liste qui les range et une boucle qui traite les demandes.",
  "analogy_fr": "La boutiquière tient un cahier : une page par article, avec son prix et son stock. Chaque vente est notée, et le soir elle fait le point.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        Article riz = new Article(\"Riz\", 500, 10);\n        System.out.println(riz.vendre(3));\n        System.out.println(riz.vendre(20));\n        System.out.println(riz);\n        System.out.println(\"Valeur : \" + riz.valeurStock() + \" FCFA\");\n    }\n}\n\nclass Article {\n    private String nom;\n    private int prix;\n    private int stock;\n\n    Article(String nom, int prix, int stock) {\n        this.nom = nom;\n        this.prix = prix;\n        this.stock = stock;\n    }\n\n    String getNom() {\n        return nom;\n    }\n\n    int getStock() {\n        return stock;\n    }\n\n    int valeurStock() {\n        return prix * stock;\n    }\n\n    boolean vendre(int quantite) {\n        if (quantite <= 0 || quantite > stock) {\n            return false;\n        }\n        stock -= quantite;\n        return true;\n    }\n\n    @Override\n    public String toString() {\n        return nom + \" : \" + stock + \" en stock, \" + prix + \" FCFA\";\n    }\n}",
      "expected_output": "true\nfalse\nRiz : 7 en stock, 500 FCFA\nValeur : 3500 FCFA",
      "inputs": [],
      "trace_fr": [
        "La vente de 3 réussit : il reste 7.",
        "La vente de 20 dépasse le stock : refusée.",
        "toString décrit l’article.",
        "La valeur du stock vaut 7 × 500."
      ]
    },
    {
      "code": "import java.util.ArrayList;\n\npublic class Main {\n    static Article lireArticle(String ligne) {\n        String[] p = ligne.split(\";\");\n        return new Article(p[0].trim(), Integer.parseInt(p[1].trim()), Integer.parseInt(p[2].trim()));\n    }\n\n    static Article chercher(ArrayList<Article> liste, String nom) {\n        for (Article a : liste) {\n            if (a.getNom().equalsIgnoreCase(nom)) {\n                return a;\n            }\n        }\n        return null;\n    }\n\n    public static void main(String[] args) {\n        ArrayList<Article> boutique = new ArrayList<>();\n        boutique.add(lireArticle(\"Riz ; 500 ; 10\"));\n        boutique.add(lireArticle(\"Huile;1200;4\"));\n        Article a = chercher(boutique, \"huile\");\n        System.out.println(a);\n        System.out.println(chercher(boutique, \"sel\"));\n    }\n}\n\nclass Article {\n    private String nom;\n    private int prix;\n    private int stock;\n\n    Article(String nom, int prix, int stock) {\n        this.nom = nom;\n        this.prix = prix;\n        this.stock = stock;\n    }\n\n    String getNom() {\n        return nom;\n    }\n\n    int getStock() {\n        return stock;\n    }\n\n    int valeurStock() {\n        return prix * stock;\n    }\n\n    boolean vendre(int quantite) {\n        if (quantite <= 0 || quantite > stock) {\n            return false;\n        }\n        stock -= quantite;\n        return true;\n    }\n\n    @Override\n    public String toString() {\n        return nom + \" : \" + stock + \" en stock, \" + prix + \" FCFA\";\n    }\n}",
      "expected_output": "Huile : 4 en stock, 1200 FCFA\nnull",
      "inputs": [],
      "trace_fr": [
        "lireArticle découpe et nettoie chaque ligne.",
        "chercher trouve Huile malgré la minuscule.",
        "Le sel n’existe pas : chercher renvoie null."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Renvoyer null dans la boucle de recherche",
      "why_fr": "La recherche s’arrête au premier article différent.",
      "fix_fr": "Place return null; après la boucle."
    },
    {
      "error": "Comparer les noms avec ==",
      "why_fr": "Les noms lus au clavier sont des objets différents.",
      "fix_fr": "Utilise equals ou equalsIgnoreCase."
    },
    {
      "error": "Modifier le stock depuis main",
      "why_fr": "Les règles de vente sont contournées.",
      "fix_fr": "Passe toujours par la méthode vendre."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi isoler la lecture d’une ligne dans lireArticle ?",
      "options": [
        "Pour aller plus vite à l’exécution",
        "Pour la tester seule et la modifier sans toucher au reste",
        "Parce que Java l’exige",
        "Pour éviter les objets"
      ],
      "answer": 1,
      "explanation": "Une méthode courte et nommée se teste et se remplace facilement.",
      "id": "java-m4-03-q1"
    },
    {
      "question": "Que doit renvoyer chercher si aucun article ne correspond ?",
      "options": [
        "Le premier article",
        "null",
        "Une liste vide",
        "0"
      ],
      "answer": 1,
      "explanation": "null signale l’absence d’objet ; l’appelant doit le tester.",
      "id": "java-m4-03-q2"
    },
    {
      "question": "Que se passe-t-il si une vente porte sur 0 article ?",
      "options": [
        "Le stock augmente.",
        "vendre renvoie false et rien ne change.",
        "Le programme s’arrête.",
        "Le stock devient négatif."
      ],
      "answer": 1,
      "explanation": "La règle est écrite dans vendre : une quantité nulle est refusée.",
      "id": "java-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "modèle",
      "definition": "Classes qui représentent les objets du domaine, avec leurs règles."
    },
    {
      "term": "null",
      "definition": "Valeur qui signifie qu’aucun objet n’est désigné."
    },
    {
      "term": "rapport",
      "definition": "Résumé affiché à la fin du traitement."
    },
    {
      "term": "réapprovisionnement",
      "definition": "Commande de nouveaux articles quand le stock est bas."
    }
  ],
  "recap_fr": [
    "Combiner classes, ArrayList, méthodes et exceptions dans un programme complet.",
    "Lire des données structurées, appliquer des opérations et produire un rapport.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "modèle",
    "null",
    "rapport",
    "réapprovisionnement"
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
      "title": "Les listes (dev.java)",
      "url": "https://dev.java/learn/api/collections-framework/lists/"
    },
    {
      "title": "Classes et objets (dev.java)",
      "url": "https://dev.java/learn/classes-objects/"
    },
    {
      "title": "Les exceptions (dev.java)",
      "url": "https://dev.java/learn/exceptions/"
    }
  ],
  "sources": [
    {
      "title": "Les listes (dev.java)",
      "url": "https://dev.java/learn/api/collections-framework/lists/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Classes et objets (dev.java)",
      "url": "https://dev.java/learn/classes-objects/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Les exceptions (dev.java)",
      "url": "https://dev.java/learn/exceptions/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Ce projet réunit tout le cours. Tu vas écrire le programme de gestion d’une petite boutique : il lit la liste des articles, enregistre des ventes, refuse celles qui sont impossibles et affiche un rapport. C’est le type de programme que l’on trouve, en beaucoup plus grand, derrière les caisses des supermarchés et les applications de commerçants.

Commence par le modèle. La classe Article garde trois attributs privés : nom, prix et stock. Elle expose des accesseurs, une méthode valeurStock qui renvoie prix × stock, et une méthode vendre(quantite) qui refuse une quantité nulle, négative ou supérieure au stock en renvoyant false, et sinon retire la quantité et renvoie true. Toute la logique d’un article vit à cet endroit : aucune autre partie du programme ne modifie le stock directement.

Viennent ensuite les données. Chaque article arrive sur une ligne de la forme nom;prix;stock. Une méthode static Article lireArticle(String ligne) la découpe avec split(";"), nettoie chaque morceau avec trim, convertit les nombres et renvoie un nouvel objet. Isoler cette lecture dans une méthode permet de la tester seule, et de la modifier sans toucher au reste si le format change.

Le programme range les articles dans une ArrayList<Article>. Pour enregistrer une vente, il faut retrouver un article à partir de son nom : une méthode chercher parcourt la liste et renvoie l’article dont le nom correspond, ou null s’il n’existe pas. Compare les noms avec equalsIgnoreCase, jamais avec ==. Et attention à ne renvoyer null qu’après la boucle : un return null à l’intérieur abandonnerait la recherche dès le premier article différent.

Le traitement suit un schéma en deux phases. D’abord, lire les articles jusqu’à la ligne ventes. Ensuite, lire les ventes, de la forme nom;quantite, jusqu’à fin. Pour chaque vente, on cherche l’article ; s’il est introuvable ou si vendre renvoie false, on affiche un refus clair. Une ligne mal formée ne doit pas arrêter la journée : un try et un catch traitent la NumberFormatException.

Enfin, le rapport parcourt la liste, affiche chaque article avec toString, puis la valeur totale du stock et les articles à réapprovisionner, dont le stock est passé sous un seuil.

Procède par étapes, en vérifiant chacune avant de passer à la suivante : la classe, puis la lecture d’une ligne, puis la recherche, puis le programme complet. C’est exactement ainsi que travaillent les équipes de développement : de petites pièces testées, assemblées une à une.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        Article riz = new Article("Riz", 500, 10);
        System.out.println(riz.vendre(3));
        System.out.println(riz.vendre(20));
        System.out.println(riz);
        System.out.println("Valeur : " + riz.valeurStock() + " FCFA");
    }
}

class Article {
    private String nom;
    private int prix;
    private int stock;

    Article(String nom, int prix, int stock) {
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
    }

    String getNom() {
        return nom;
    }

    int getStock() {
        return stock;
    }

    int valeurStock() {
        return prix * stock;
    }

    boolean vendre(int quantite) {
        if (quantite <= 0 || quantite > stock) {
            return false;
        }
        stock -= quantite;
        return true;
    }

    @Override
    public String toString() {
        return nom + " : " + stock + " en stock, " + prix + " FCFA";
    }
}
```

Affichage attendu :

    true
    false
    Riz : 7 en stock, 500 FCFA
    Valeur : 3500 FCFA

Trace :

- La vente de 3 réussit : il reste 7.
- La vente de 20 dépasse le stock : refusée.
- toString décrit l’article.
- La valeur du stock vaut 7 × 500.

## Exemple guidé 2

```java
import java.util.ArrayList;

public class Main {
    static Article lireArticle(String ligne) {
        String[] p = ligne.split(";");
        return new Article(p[0].trim(), Integer.parseInt(p[1].trim()), Integer.parseInt(p[2].trim()));
    }

    static Article chercher(ArrayList<Article> liste, String nom) {
        for (Article a : liste) {
            if (a.getNom().equalsIgnoreCase(nom)) {
                return a;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        ArrayList<Article> boutique = new ArrayList<>();
        boutique.add(lireArticle("Riz ; 500 ; 10"));
        boutique.add(lireArticle("Huile;1200;4"));
        Article a = chercher(boutique, "huile");
        System.out.println(a);
        System.out.println(chercher(boutique, "sel"));
    }
}

class Article {
    private String nom;
    private int prix;
    private int stock;

    Article(String nom, int prix, int stock) {
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
    }

    String getNom() {
        return nom;
    }

    int getStock() {
        return stock;
    }

    int valeurStock() {
        return prix * stock;
    }

    boolean vendre(int quantite) {
        if (quantite <= 0 || quantite > stock) {
            return false;
        }
        stock -= quantite;
        return true;
    }

    @Override
    public String toString() {
        return nom + " : " + stock + " en stock, " + prix + " FCFA";
    }
}
```

Affichage attendu :

    Huile : 4 en stock, 1200 FCFA
    null

Trace :

- lireArticle découpe et nettoie chaque ligne.
- chercher trouve Huile malgré la minuscule.
- Le sel n’existe pas : chercher renvoie null.

## Vérifier et expliquer

Teste chaque pièce seule : un article, une ligne lue, une recherche, puis le programme complet avec une vente impossible et une ligne mal formée.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Les listes (dev.java)](https://dev.java/learn/api/collections-framework/lists/)
- [Classes et objets (dev.java)](https://dev.java/learn/classes-objects/)
- [Les exceptions (dev.java)](https://dev.java/learn/exceptions/)
