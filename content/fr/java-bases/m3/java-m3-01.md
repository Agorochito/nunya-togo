---
{
  "id": "java-m3-01",
  "title_fr": "Découper un programme en méthodes",
  "course": "java-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "java-m2-03"
  ],
  "outcomes": [
    "Écrire des méthodes static avec des paramètres et une valeur de retour, ou void.",
    "Appeler une méthode, réutiliser son résultat et surcharger un nom de méthode."
  ],
  "idea_fr": "Une méthode donne un nom à un calcul : on l’écrit une fois, on l’appelle autant de fois que nécessaire.",
  "analogy_fr": "La vendeuse de pain ne refait pas la recette à chaque client : elle a une recette, et la quantité de farine change selon la commande.",
  "examples": [
    {
      "code": "public class Main {\n    static int carre(int n) {\n        return n * n;\n    }\n\n    static int aire(int largeur, int longueur) {\n        return largeur * longueur;\n    }\n\n    static int max(int a, int b) {\n        if (a > b) {\n            return a;\n        }\n        return b;\n    }\n\n    static int max(int a, int b, int c) {\n        return max(max(a, b), c);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(carre(7));\n        System.out.println(aire(20, 30) + \" m²\");\n        System.out.println(max(4, 9) + \" \" + max(4, 9, 2));\n    }\n}",
      "expected_output": "49\n600 m²\n9 9",
      "inputs": [],
      "trace_fr": [
        "carre(7) renvoie 49.",
        "aire reçoit 20 et 30 et renvoie 600.",
        "max à deux paramètres renvoie 9.",
        "La version à trois paramètres réutilise la première."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    static int avecTva(int prixHt) {\n        return prixHt + prixHt * 18 / 100;\n    }\n\n    static void afficherLigne(String libelle, int montant) {\n        System.out.println(libelle + \" : \" + montant + \" FCFA\");\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int prix = Integer.parseInt(sc.nextLine());\n        afficherLigne(\"Prix\", prix);\n        afficherLigne(\"Avec TVA\", avecTva(prix));\n    }\n}",
      "expected_output": "Prix : 1000 FCFA\nAvec TVA : 1180 FCFA",
      "inputs": [
        "1000"
      ],
      "trace_fr": [
        "avecTva calcule 1000 + 180.",
        "afficherLigne est void : elle affiche sans rien renvoyer.",
        "Le résultat de avecTva devient l’argument de afficherLigne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier return",
      "why_fr": "Le compilateur signale missing return statement.",
      "fix_fr": "Chaque chemin d’une méthode non void doit finir par return."
    },
    {
      "error": "Afficher au lieu de renvoyer",
      "why_fr": "Une méthode void ne peut pas servir dans un calcul.",
      "fix_fr": "Renvoie la valeur avec return et affiche-la dans main."
    },
    {
      "error": "Changer l’ordre ou le type des paramètres",
      "why_fr": "L’appel ne correspond plus à la méthode.",
      "fix_fr": "Respecte la signature demandée."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie une méthode déclarée static void saluer() ?",
      "options": [
        "Un texte",
        "Un int",
        "Rien",
        "true"
      ],
      "answer": 2,
      "explanation": "void signifie qu’aucune valeur n’est renvoyée.",
      "id": "java-m3-01-q1"
    },
    {
      "question": "Que se passe-t-il après return dans une méthode ?",
      "options": [
        "La méthode continue.",
        "La méthode se termine immédiatement.",
        "Le programme s’arrête.",
        "La méthode recommence."
      ],
      "answer": 1,
      "explanation": "return renvoie la valeur et termine la méthode.",
      "id": "java-m3-01-q2"
    },
    {
      "question": "Deux méthodes max(int a, int b) et max(int a, int b, int c) peuvent-elles coexister ?",
      "options": [
        "Non, jamais.",
        "Oui, c’est la surcharge.",
        "Seulement si l’une est void.",
        "Seulement dans deux classes différentes."
      ],
      "answer": 1,
      "explanation": "Les paramètres diffèrent : Java choisit selon l’appel.",
      "id": "java-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "méthode",
      "definition": "Bloc de code nommé, appelé autant de fois que nécessaire."
    },
    {
      "term": "paramètre",
      "definition": "Variable qui reçoit une valeur au moment de l’appel."
    },
    {
      "term": "return",
      "definition": "Instruction qui renvoie un résultat et termine la méthode."
    },
    {
      "term": "surcharge",
      "definition": "Plusieurs méthodes de même nom avec des paramètres différents."
    }
  ],
  "recap_fr": [
    "Écrire des méthodes static avec des paramètres et une valeur de retour, ou void.",
    "Appeler une méthode, réutiliser son résultat et surcharger un nom de méthode.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "méthode",
    "paramètre",
    "return",
    "surcharge"
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
      "title": "Définir des méthodes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/defining-methods/"
    },
    {
      "title": "Appeler des méthodes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/calling-methods-constructors/"
    }
  ],
  "sources": [
    {
      "title": "Définir des méthodes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/defining-methods/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Appeler des méthodes (dev.java)",
      "url": "https://dev.java/learn/classes-objects/calling-methods-constructors/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand un programme grandit, main devient longue et difficile à relire. On découpe alors le travail en méthodes, de petits blocs nommés qui réalisent une tâche précise. Une méthode s’écrit dans la classe Main, à côté de main : static int carre(int n) { return n * n; }.

Lis cette première ligne de gauche à droite. static indique que la méthode appartient à la classe elle-même ; tu comprendras ce mot avec les objets, au module suivant. int est le type de la valeur renvoyée. carre est le nom, en général un verbe ou une description du résultat. Entre parenthèses viennent les paramètres, chacun avec son type, séparés par des virgules : static int aire(int largeur, int longueur).

L’instruction return renvoie le résultat et termine immédiatement la méthode. Celui qui appelle récupère la valeur et l’utilise comme n’importe quelle autre : int c = carre(7); ou System.out.println(carre(3) + 1);. Le compilateur vérifie que chaque chemin se termine par un return du bon type ; s’il en manque un, par exemple dans un else oublié, il affiche missing return statement.

Une méthode qui ne renvoie rien a le type void. Elle agit, par exemple en affichant, mais on ne peut pas utiliser son résultat dans un calcul. Préfère les méthodes qui renvoient une valeur : elles se combinent, se testent et se réutilisent plus facilement. Garde l’affichage dans main.

À l’appel, les valeurs passées, appelées arguments, sont copiées dans les paramètres. Modifier un paramètre int dans la méthode ne change donc pas la variable de l’appelant. Les variables déclarées dans une méthode n’existent que pendant son exécution : deux méthodes peuvent utiliser le même nom de variable sans se gêner.

Java autorise plusieurs méthodes du même nom si leurs paramètres diffèrent : c’est la surcharge. static int max(int a, int b) et static int max(int a, int b, int c) peuvent coexister ; Java choisit selon le nombre et le type des arguments.

Dans cet atelier, les vérifications appellent tes méthodes depuis l’extérieur, par exemple Main.carre(4). Écris-les donc avec static, sans le mot private. Respecte aussi exactement le nom, les types et l’ordre des paramètres demandés : les vérifications en dépendent, comme le ferait un collègue qui utilise ta méthode.

Une bonne méthode fait une seule chose, porte un nom qui la décrit et tient sur quelques lignes. Si tu dois copier-coller un calcul, c’est le signe qu’il mérite sa propre méthode.

## Exemple guidé 1

```java
public class Main {
    static int carre(int n) {
        return n * n;
    }

    static int aire(int largeur, int longueur) {
        return largeur * longueur;
    }

    static int max(int a, int b) {
        if (a > b) {
            return a;
        }
        return b;
    }

    static int max(int a, int b, int c) {
        return max(max(a, b), c);
    }

    public static void main(String[] args) {
        System.out.println(carre(7));
        System.out.println(aire(20, 30) + " m²");
        System.out.println(max(4, 9) + " " + max(4, 9, 2));
    }
}
```

Affichage attendu :

    49
    600 m²
    9 9

Trace :

- carre(7) renvoie 49.
- aire reçoit 20 et 30 et renvoie 600.
- max à deux paramètres renvoie 9.
- La version à trois paramètres réutilise la première.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    static int avecTva(int prixHt) {
        return prixHt + prixHt * 18 / 100;
    }

    static void afficherLigne(String libelle, int montant) {
        System.out.println(libelle + " : " + montant + " FCFA");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int prix = Integer.parseInt(sc.nextLine());
        afficherLigne("Prix", prix);
        afficherLigne("Avec TVA", avecTva(prix));
    }
}
```

Saisies de l’exemple : 1000

Affichage attendu :

    Prix : 1000 FCFA
    Avec TVA : 1180 FCFA

Trace :

- avecTva calcule 1000 + 180.
- afficherLigne est void : elle affiche sans rien renvoyer.
- Le résultat de avecTva devient l’argument de afficherLigne.

## Vérifier et expliquer

Pour chaque méthode, écris deux appels et leur résultat attendu avant de lancer. Vérifie aussi un cas limite, comme 0 ou un nombre négatif.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Définir des méthodes (dev.java)](https://dev.java/learn/classes-objects/defining-methods/)
- [Appeler des méthodes (dev.java)](https://dev.java/learn/classes-objects/calling-methods-constructors/)
