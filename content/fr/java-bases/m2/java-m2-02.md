---
{
  "id": "java-m2-02",
  "title_fr": "Choisir avec switch et répéter avec while",
  "course": "java-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "java-m2-01"
  ],
  "outcomes": [
    "Choisir parmi des valeurs précises avec switch et ses cas en flèche.",
    "Répéter des instructions avec while et do-while, et arrêter une boucle sur une valeur sentinelle."
  ],
  "idea_fr": "switch aiguille vers un cas selon une valeur exacte ; while répète tant qu’une condition reste vraie.",
  "analogy_fr": "Le gardien d’un immeuble a un trousseau : une clé par numéro de porte. Le soir, il fait sa ronde et recommence tant qu’il reste une porte à vérifier.",
  "examples": [
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int jour = Integer.parseInt(sc.nextLine());\n        String nom = switch (jour) {\n            case 1 -> \"Lundi\";\n            case 3 -> \"Mercredi\";\n            case 6, 7 -> \"Week-end\";\n            default -> \"Jour de classe\";\n        };\n        System.out.println(nom);\n    }\n}",
      "expected_output": "Week-end",
      "inputs": [
        "7"
      ],
      "trace_fr": [
        "jour vaut 7.",
        "Le cas 6, 7 correspond.",
        "switch produit le texte Week-end, rangé dans nom."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int total = 0;\n        int articles = 0;\n        String ligne = sc.nextLine();\n        while (!ligne.equals(\"fin\")) {\n            total += Integer.parseInt(ligne);\n            articles++;\n            ligne = sc.nextLine();\n        }\n        System.out.println(articles + \" articles, total \" + total + \" FCFA\");\n    }\n}",
      "expected_output": "3 articles, total 1450 FCFA",
      "inputs": [
        "500",
        "750",
        "200",
        "fin"
      ],
      "trace_fr": [
        "La première ligne, 500, est lue avant la boucle.",
        "Chaque tour ajoute le prix et compte l’article.",
        "La lecture de fin arrête la boucle.",
        "Total : 500 + 750 + 200."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de faire évoluer la variable de boucle",
      "why_fr": "La condition reste vraie : boucle infinie.",
      "fix_fr": "Modifie la variable dans le bloc, par exemple compteur++."
    },
    {
      "error": "Oublier de relire la saisie dans une boucle sentinelle",
      "why_fr": "La même ligne est traitée sans fin.",
      "fix_fr": "Termine chaque tour par ligne = sc.nextLine();."
    },
    {
      "error": "Oublier default dans un switch qui produit une valeur",
      "why_fr": "Le compilateur exige un résultat pour toute valeur.",
      "fix_fr": "Ajoute default -> … ;."
    }
  ],
  "quiz": [
    {
      "question": "Avec n = 2, que produit switch (n) { case 1, 2 -> \"A\"; case 3 -> \"B\"; default -> \"C\"; } ?",
      "options": [
        "A",
        "B",
        "C",
        "Une erreur"
      ],
      "answer": 0,
      "explanation": "Le cas 1, 2 couvre la valeur 2.",
      "id": "java-m2-02-q1"
    },
    {
      "question": "Combien de fois s’exécute le bloc de while (i < 3) si i vaut 5 au départ ?",
      "options": [
        "0",
        "1",
        "3",
        "5"
      ],
      "answer": 0,
      "explanation": "La condition est fausse dès le départ : while teste avant le premier tour.",
      "id": "java-m2-02-q2"
    },
    {
      "question": "Quelle boucle exécute toujours son bloc au moins une fois ?",
      "options": [
        "while",
        "do-while",
        "switch",
        "if"
      ],
      "answer": 1,
      "explanation": "do-while teste la condition après le bloc.",
      "id": "java-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "switch",
      "definition": "Instruction qui choisit un cas selon la valeur exacte d’une expression."
    },
    {
      "term": "while",
      "definition": "Boucle qui répète un bloc tant que sa condition est vraie."
    },
    {
      "term": "sentinelle",
      "definition": "Valeur convenue qui signale la fin des saisies."
    },
    {
      "term": "boucle infinie",
      "definition": "Boucle dont la condition ne devient jamais fausse."
    }
  ],
  "recap_fr": [
    "Choisir parmi des valeurs précises avec switch et ses cas en flèche.",
    "Répéter des instructions avec while et do-while, et arrêter une boucle sur une valeur sentinelle.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "switch",
    "while",
    "sentinelle",
    "boucle infinie"
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
      "title": "Expressions switch (dev.java)",
      "url": "https://dev.java/learn/language-basics/switch-expression/"
    },
    {
      "title": "Boucles while et do-while (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/"
    }
  ],
  "sources": [
    {
      "title": "Expressions switch (dev.java)",
      "url": "https://dev.java/learn/language-basics/switch-expression/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Boucles while et do-while (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand une même variable doit être comparée à plusieurs valeurs précises, une longue suite de else if devient lourde. switch la remplace. Depuis Java 14, on écrit chaque cas avec une flèche : case 1 -> System.out.println("Lundi");. Plusieurs valeurs peuvent partager un cas, séparées par des virgules : case 6, 7 -> System.out.println("Week-end");. Le cas default s’applique à toutes les autres valeurs. switch fonctionne avec les int, les char et les String.

switch peut aussi produire une valeur. On l’écrit alors à droite d’une affectation, et chaque cas donne le résultat : String jour = switch (n) { case 1 -> "Lundi"; case 2 -> "Mardi"; default -> "Inconnu"; };. Remarque le point-virgule après l’accolade finale : toute l’expression est une seule instruction. Le compilateur exige ici un default, car une valeur doit être produite dans tous les cas.

Tu croiseras dans du code ancien une autre forme, avec deux-points et break : case 1: … break;. Sans break, l’exécution continue dans le cas suivant, source d’erreurs fréquentes. La forme en flèche n’a pas ce défaut ; ce cours l’utilise.

Pour répéter, la boucle while exécute son bloc tant que sa condition est vraie : while (compteur <= 5) { … }. La condition est testée avant chaque tour. Trois éléments doivent donc être présents : une variable initialisée avant la boucle, une condition qui la teste, et une instruction dans le bloc qui la fait évoluer, par exemple compteur++, qui ajoute 1. Si la variable n’évolue jamais, la condition reste vraie pour toujours : c’est une boucle infinie. L’atelier arrête alors le programme après 5 secondes.

while est idéal quand on ne sait pas à l’avance combien de tours seront nécessaires. Un cas classique est la valeur sentinelle : on lit des saisies jusqu’à recevoir un mot convenu, comme fin. On lit une première ligne avant la boucle, on teste la condition, puis on lit la ligne suivante à la fin de chaque tour : while (!ligne.equals("fin")) { …; ligne = sc.nextLine(); }.

La boucle do-while teste sa condition après le bloc : do { … } while (condition);. Son bloc s’exécute donc au moins une fois, ce qui convient pour redemander une saisie tant qu’elle est invalide.

Les raccourcis +=, -= et *= modifient une variable à partir de sa valeur : total += prix; équivaut à total = total + prix;. De même, i++ ajoute 1 et i-- retire 1.

## Exemple guidé 1

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int jour = Integer.parseInt(sc.nextLine());
        String nom = switch (jour) {
            case 1 -> "Lundi";
            case 3 -> "Mercredi";
            case 6, 7 -> "Week-end";
            default -> "Jour de classe";
        };
        System.out.println(nom);
    }
}
```

Saisies de l’exemple : 7

Affichage attendu :

    Week-end

Trace :

- jour vaut 7.
- Le cas 6, 7 correspond.
- switch produit le texte Week-end, rangé dans nom.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = 0;
        int articles = 0;
        String ligne = sc.nextLine();
        while (!ligne.equals("fin")) {
            total += Integer.parseInt(ligne);
            articles++;
            ligne = sc.nextLine();
        }
        System.out.println(articles + " articles, total " + total + " FCFA");
    }
}
```

Saisies de l’exemple : 500 · 750 · 200 · fin

Affichage attendu :

    3 articles, total 1450 FCFA

Trace :

- La première ligne, 500, est lue avant la boucle.
- Chaque tour ajoute le prix et compte l’article.
- La lecture de fin arrête la boucle.
- Total : 500 + 750 + 200.

## Vérifier et expliquer

Pour chaque boucle, écris sur papier la valeur de la variable à chaque tour et vérifie qu’elle finit par rendre la condition fausse.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Expressions switch (dev.java)](https://dev.java/learn/language-basics/switch-expression/)
- [Boucles while et do-while (dev.java)](https://dev.java/learn/language-basics/controlling-flow/)
