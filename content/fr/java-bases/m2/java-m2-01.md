---
{
  "id": "java-m2-01",
  "title_fr": "Décider avec if, else et les comparaisons",
  "course": "java-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "java-m1-03"
  ],
  "outcomes": [
    "Comparer des valeurs avec ==, !=, <, <=, >, >= et combiner des conditions avec &&, || et !.",
    "Choisir entre plusieurs cas avec if, else if et else, et comparer des textes avec equals."
  ],
  "idea_fr": "Une condition est une expression qui vaut true ou false ; if exécute un bloc seulement quand elle vaut true.",
  "analogy_fr": "Au poste de péage, l’agent regarde le véhicule : moto, voiture ou camion. Selon la réponse, il annonce un tarif différent ; une seule règle s’applique à chaque passage.",
  "examples": [
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int note = Integer.parseInt(sc.nextLine());\n        if (note >= 16) {\n            System.out.println(\"Très bien\");\n        } else if (note >= 10) {\n            System.out.println(\"Admis\");\n        } else {\n            System.out.println(\"À retravailler\");\n        }\n    }\n}",
      "expected_output": "Admis",
      "inputs": [
        "12"
      ],
      "trace_fr": [
        "La note lue vaut 12.",
        "12 >= 16 est faux : le premier bloc est ignoré.",
        "12 >= 10 est vrai : Admis s’affiche.",
        "Le bloc else n’est pas exécuté."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String reponse = sc.nextLine();\n        int age = Integer.parseInt(sc.nextLine());\n        if (reponse.equalsIgnoreCase(\"oui\") && age >= 15) {\n            System.out.println(\"Inscription acceptée\");\n        } else {\n            System.out.println(\"Inscription refusée\");\n        }\n    }\n}",
      "expected_output": "Inscription acceptée",
      "inputs": [
        "OUI",
        "16"
      ],
      "trace_fr": [
        "reponse vaut OUI, age vaut 16.",
        "equalsIgnoreCase ignore les majuscules : vrai.",
        "16 >= 15 est vrai.",
        "Les deux côtés de && sont vrais."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer deux String avec ==",
      "why_fr": "== compare l’emplacement des objets, pas le texte.",
      "fix_fr": "Utilise texte.equals(\"valeur\")."
    },
    {
      "error": "Mal ordonner les else if",
      "why_fr": "Le premier cas vrai gagne : un seuil bas placé en premier masque les autres.",
      "fix_fr": "Teste du cas le plus exigeant au moins exigeant."
    },
    {
      "error": "Écrire = au lieu de ==",
      "why_fr": "= range une valeur ; Java refuse ce test dans un if.",
      "fix_fr": "Compare avec ==."
    }
  ],
  "quiz": [
    {
      "question": "Que vaut 5 > 3 && 2 > 4 ?",
      "options": [
        "true",
        "false",
        "5",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Le second côté est faux, donc le && est faux.",
      "id": "java-m2-01-q1"
    },
    {
      "question": "Comment tester qu’un String rep contient oui ?",
      "options": [
        "rep == \"oui\"",
        "rep.equals(\"oui\")",
        "rep = \"oui\"",
        "equals(rep, oui)"
      ],
      "answer": 1,
      "explanation": "equals compare le contenu des textes.",
      "id": "java-m2-01-q2"
    },
    {
      "question": "Avec note = 18, combien de blocs s’exécutent dans if (note >= 10) … else if (note >= 16) … else … ?",
      "options": [
        "Aucun",
        "Un seul, celui de note >= 10",
        "Deux",
        "Les trois"
      ],
      "answer": 1,
      "explanation": "Seul le premier bloc vrai s’exécute ; ici, l’ordre des tests est d’ailleurs mal choisi.",
      "id": "java-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "condition",
      "definition": "Expression qui vaut true ou false."
    },
    {
      "term": "else if",
      "definition": "Cas supplémentaire testé seulement si les précédents sont faux."
    },
    {
      "term": "&&",
      "definition": "Opérateur et : vrai si les deux conditions sont vraies."
    },
    {
      "term": "equals",
      "definition": "Méthode qui compare le contenu de deux textes."
    }
  ],
  "recap_fr": [
    "Comparer des valeurs avec ==, !=, <, <=, >, >= et combiner des conditions avec &&, || et !.",
    "Choisir entre plusieurs cas avec if, else if et else, et comparer des textes avec equals.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "condition",
    "else if",
    "&&",
    "equals"
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
      "title": "Contrôler le déroulement (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/"
    },
    {
      "title": "String.equals",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
    }
  ],
  "sources": [
    {
      "title": "Contrôler le déroulement (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "String.equals",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un programme devient utile quand il réagit aux données. L’instruction if exécute un bloc d’instructions seulement si une condition est vraie : if (note >= 10) { System.out.println("Admis"); }. La condition s’écrit entre parenthèses et vaut true ou false. Le bloc entre accolades peut contenir plusieurs instructions.

Les comparaisons produisent des boolean : == teste l’égalité, != la différence, puis <, <=, > et >=. Ne confonds pas == avec =, qui range une valeur : en Java, if (note = 10) est même refusé par le compilateur, car une affectation à un int ne donne pas un boolean.

else ajoute le bloc à exécuter dans le cas contraire. Pour plus de deux cas, on enchaîne else if. Java teste les conditions dans l’ordre et exécute seulement le premier bloc dont la condition est vraie ; les suivants sont ignorés. L’ordre compte donc : pour attribuer une mention, on teste d’abord la note la plus haute, if (note >= 16), puis else if (note >= 14), et ainsi de suite.

Trois opérateurs combinent les conditions. && signifie et : les deux côtés doivent être vrais. || signifie ou : au moins un côté doit être vrai. ! inverse une condition. Pour vérifier qu’une note est valide, on écrit note >= 0 && note <= 20. Java évalue de gauche à droite et s’arrête dès que le résultat est connu : dans b != 0 && a / b > 2, la division n’est jamais faite si b vaut 0.

Les textes demandent une attention particulière. Un String est un objet, et == compare l’emplacement des objets en mémoire, pas leur contenu. Deux textes identiques lus au clavier peuvent donc être déclarés différents par ==. Pour comparer le contenu, utilise toujours equals : if (reponse.equals("oui")). equalsIgnoreCase ignore en plus les majuscules : "OUI".equalsIgnoreCase("oui") vaut true.

Une variable déclarée dans un bloc n’existe que dans ce bloc. Si tu as besoin d’une valeur après le if, déclare la variable avant, puis donne-lui sa valeur dans chaque branche. Le compilateur vérifie qu’elle reçoit bien une valeur dans tous les cas.

Enfin, indente le contenu de chaque bloc. Java ignore l’indentation, mais elle montre à l’œil quelles instructions dépendent de quelle condition. Garde aussi les accolades même pour une seule instruction : c’est plus sûr quand on ajoute une ligne plus tard.

## Exemple guidé 1

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int note = Integer.parseInt(sc.nextLine());
        if (note >= 16) {
            System.out.println("Très bien");
        } else if (note >= 10) {
            System.out.println("Admis");
        } else {
            System.out.println("À retravailler");
        }
    }
}
```

Saisies de l’exemple : 12

Affichage attendu :

    Admis

Trace :

- La note lue vaut 12.
- 12 >= 16 est faux : le premier bloc est ignoré.
- 12 >= 10 est vrai : Admis s’affiche.
- Le bloc else n’est pas exécuté.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String reponse = sc.nextLine();
        int age = Integer.parseInt(sc.nextLine());
        if (reponse.equalsIgnoreCase("oui") && age >= 15) {
            System.out.println("Inscription acceptée");
        } else {
            System.out.println("Inscription refusée");
        }
    }
}
```

Saisies de l’exemple : OUI · 16

Affichage attendu :

    Inscription acceptée

Trace :

- reponse vaut OUI, age vaut 16.
- equalsIgnoreCase ignore les majuscules : vrai.
- 16 >= 15 est vrai.
- Les deux côtés de && sont vrais.

## Vérifier et expliquer

Pour chaque programme, choisis une valeur qui passe par chaque branche et vérifie laquelle s’exécute. Teste aussi les valeurs limites, comme 10 pour un seuil >= 10.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Contrôler le déroulement (dev.java)](https://dev.java/learn/language-basics/controlling-flow/)
- [String.equals](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
