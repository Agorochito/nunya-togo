---
{
  "id": "java-m1-03",
  "title_fr": "Calculer et lire des saisies avec Scanner",
  "course": "java-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "java-m1-02"
  ],
  "outcomes": [
    "Calculer avec + - * / %, distinguer division entière et division décimale.",
    "Lire des saisies avec Scanner et nextLine, puis les convertir avec Integer.parseInt et Double.parseDouble."
  ],
  "idea_fr": "Les calculs suivent les types : deux int donnent un int ; une saisie arrive toujours comme un texte qu’il faut convertir.",
  "analogy_fr": "Le caissier compte les billets en nombres entiers ; pour partager une facture au centime près, il lui faut une calculatrice qui garde les décimales.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int total = 7;\n        int personnes = 2;\n        System.out.println(total / personnes);\n        System.out.println((double) total / personnes);\n        System.out.println(17 % 5);\n        System.out.println(\"Somme : \" + 2 + 3);\n        System.out.println(\"Somme : \" + (2 + 3));\n    }\n}",
      "expected_output": "3\n3.5\n2\nSomme : 23\nSomme : 5",
      "inputs": [],
      "trace_fr": [
        "7 / 2 entre deux int donne 3.",
        "Le cast en double garde la décimale : 3.5.",
        "17 % 5 donne le reste, 2.",
        "Sans parenthèses, + colle 2 puis 3 au texte.",
        "Avec parenthèses, l’addition est faite d’abord."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String nom = sc.nextLine();\n        int quantite = Integer.parseInt(sc.nextLine());\n        double prix = Double.parseDouble(sc.nextLine());\n        System.out.println(nom + \" paie \" + quantite * prix + \" FCFA\");\n    }\n}",
      "expected_output": "Yao paie 750.0 FCFA",
      "inputs": [
        "Yao",
        "3",
        "250"
      ],
      "trace_fr": [
        "nextLine lit Yao.",
        "La deuxième ligne, 3, devient un int.",
        "La troisième, 250, devient un double.",
        "Un int multiplié par un double donne un double : 750.0."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Diviser deux int en attendant des décimales",
      "why_fr": "7 / 2 entre int vaut 3.",
      "fix_fr": "Convertis une des valeurs : (double) a / b."
    },
    {
      "error": "Additionner une saisie sans la convertir",
      "why_fr": "nextLine renvoie un String : + colle les textes.",
      "fix_fr": "Utilise Integer.parseInt(sc.nextLine())."
    },
    {
      "error": "Mélanger nextInt() et nextLine()",
      "why_fr": "nextInt laisse la fin de ligne, que nextLine lit ensuite comme une ligne vide.",
      "fix_fr": "Lis chaque ligne avec nextLine puis convertis-la."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut 9 / 2 en Java, avec deux int ?",
      "options": [
        "4.5",
        "4",
        "5",
        "4.0"
      ],
      "answer": 1,
      "explanation": "La division entre deux int abandonne la partie décimale.",
      "id": "java-m1-03-q1"
    },
    {
      "question": "Que vaut 23 % 4 ?",
      "options": [
        "5",
        "3",
        "5.75",
        "0"
      ],
      "answer": 1,
      "explanation": "23 = 4 × 5 + 3 : le reste est 3.",
      "id": "java-m1-03-q2"
    },
    {
      "question": "Quel type renvoie sc.nextLine() ?",
      "options": [
        "int",
        "double",
        "String",
        "char"
      ],
      "answer": 2,
      "explanation": "Une saisie est toujours lue comme un texte.",
      "id": "java-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "modulo",
      "definition": "Opérateur % : reste de la division entière."
    },
    {
      "term": "cast",
      "definition": "Conversion explicite d’une valeur vers un autre type, comme (double)."
    },
    {
      "term": "Scanner",
      "definition": "Outil de java.util qui lit les saisies du clavier."
    },
    {
      "term": "Integer.parseInt",
      "definition": "Méthode qui convertit un texte en int."
    }
  ],
  "recap_fr": [
    "Calculer avec + - * / %, distinguer division entière et division décimale.",
    "Lire des saisies avec Scanner et nextLine, puis les convertir avec Integer.parseInt et Double.parseDouble.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "modulo",
    "cast",
    "Scanner",
    "Integer.parseInt"
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
      "title": "Opérateurs (dev.java)",
      "url": "https://dev.java/learn/language-basics/using-operators/"
    },
    {
      "title": "Scanner",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html"
    },
    {
      "title": "Integer.parseInt",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html"
    }
  ],
  "sources": [
    {
      "title": "Opérateurs (dev.java)",
      "url": "https://dev.java/learn/language-basics/using-operators/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Scanner",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Integer.parseInt",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Java connaît les opérateurs habituels : + pour additionner, - pour soustraire, * pour multiplier et / pour diviser. La multiplication et la division passent avant l’addition, comme en mathématiques ; les parenthèses imposent un autre ordre. L’opérateur %, appelé modulo, donne le reste d’une division entière : 17 % 5 vaut 2. Il sert à savoir si un nombre est pair, avec n % 2 == 0, ou à répartir des objets en groupes.

La division dépend des types. Entre deux int, / donne un int et la partie décimale est perdue : 7 / 2 vaut 3, pas 3.5. Si l’un des deux nombres est un double, le résultat est un double : 7 / 2.0 vaut 3.5. Pour diviser deux variables entières en gardant les décimales, on convertit l’une d’elles : (double) total / nombre. Ce (double) placé devant s’appelle un cast. Il s’applique à la valeur qui suit immédiatement : (double) (total / nombre) arrive trop tard, car la division entière a déjà eu lieu.

Attention aussi à + dans un affichage. "Total : " + 2 + 3 affiche Total : 23, car Java lit de gauche à droite : il colle d’abord 2 au texte, puis 3. Pour additionner d’abord, mets le calcul entre parenthèses : "Total : " + (2 + 3).

Pour lire ce que tape l’utilisateur, on utilise un Scanner. La première ligne du fichier devient import java.util.Scanner;, puis dans main on crée l’outil : Scanner sc = new Scanner(System.in);. Ensuite, sc.nextLine() lit une ligne entière et la renvoie sous forme de String. Dans cet atelier, chaque saisie de test correspond à une ligne.

Une saisie est toujours un texte, même si elle contient des chiffres. Pour calculer, on la convertit : int n = Integer.parseInt(sc.nextLine()); ou double prix = Double.parseDouble(sc.nextLine());. Si le texte n’est pas un nombre, par exemple dix, la conversion lève une NumberFormatException : le programme s’arrête et l’atelier t’indique la ligne.

Le Scanner propose aussi nextInt(), mais il laisse la fin de ligne en attente : un nextLine() appelé juste après renvoie un texte vide. Pour éviter ce piège classique, ce cours lit toujours une ligne entière avec nextLine(), puis la convertit.

Math complète ces opérateurs : Math.max(a, b) renvoie le plus grand, Math.abs(x) la valeur absolue et Math.round(x) arrondit à l’entier le plus proche, sous la forme d’un long, un grand entier qui s’affiche comme un int.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        int total = 7;
        int personnes = 2;
        System.out.println(total / personnes);
        System.out.println((double) total / personnes);
        System.out.println(17 % 5);
        System.out.println("Somme : " + 2 + 3);
        System.out.println("Somme : " + (2 + 3));
    }
}
```

Affichage attendu :

    3
    3.5
    2
    Somme : 23
    Somme : 5

Trace :

- 7 / 2 entre deux int donne 3.
- Le cast en double garde la décimale : 3.5.
- 17 % 5 donne le reste, 2.
- Sans parenthèses, + colle 2 puis 3 au texte.
- Avec parenthèses, l’addition est faite d’abord.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nom = sc.nextLine();
        int quantite = Integer.parseInt(sc.nextLine());
        double prix = Double.parseDouble(sc.nextLine());
        System.out.println(nom + " paie " + quantite * prix + " FCFA");
    }
}
```

Saisies de l’exemple : Yao · 3 · 250

Affichage attendu :

    Yao paie 750.0 FCFA

Trace :

- nextLine lit Yao.
- La deuxième ligne, 3, devient un int.
- La troisième, 250, devient un double.
- Un int multiplié par un double donne un double : 750.0.

## Vérifier et expliquer

Calcule à la main le résultat attendu avant de lancer, surtout pour les divisions. Teste ensuite une saisie qui n’est pas un nombre pour voir l’exception.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Opérateurs (dev.java)](https://dev.java/learn/language-basics/using-operators/)
- [Scanner](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html)
- [Integer.parseInt](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html)
