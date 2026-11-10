---
{
  "id": "java-m1-02",
  "title_fr": "Déclarer des variables et choisir leur type",
  "course": "java-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "java-m1-01"
  ],
  "outcomes": [
    "Déclarer et initialiser des variables int, double, boolean, char et String.",
    "Assembler un affichage avec + et protéger une valeur avec final."
  ],
  "idea_fr": "En Java, chaque variable a un type fixé dès sa déclaration ; le compilateur vérifie ensuite chaque usage.",
  "analogy_fr": "Au marché, une bassine sert aux liquides et un panier aux fruits : le contenant est choisi avant d’y mettre quoi que ce soit.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String prenom = \"Afi\";\n        int age = 17;\n        double taille = 1.62;\n        char groupe = 'B';\n        boolean inscrite = true;\n        System.out.println(prenom + \", \" + age + \" ans, \" + taille + \" m\");\n        System.out.println(\"Groupe \" + groupe + \", inscrite : \" + inscrite);\n    }\n}",
      "expected_output": "Afi, 17 ans, 1.62 m\nGroupe B, inscrite : true",
      "inputs": [],
      "trace_fr": [
        "Cinq variables de cinq types sont déclarées et initialisées.",
        "+ assemble textes et valeurs dans l’ordre.",
        "Le char B s’affiche comme une lettre.",
        "Le boolean s’affiche true."
      ]
    },
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        final int PRIX_TICKET = 200;\n        int tickets = 3;\n        System.out.println(\"Total : \" + PRIX_TICKET * tickets + \" FCFA\");\n        tickets = 5;\n        System.out.println(\"Nouveau total : \" + PRIX_TICKET * tickets + \" FCFA\");\n        double moyenne = 12;\n        System.out.println(\"Moyenne : \" + moyenne);\n    }\n}",
      "expected_output": "Total : 600 FCFA\nNouveau total : 1000 FCFA\nMoyenne : 12.0",
      "inputs": [],
      "trace_fr": [
        "PRIX_TICKET est une constante.",
        "La multiplication est faite avant l’assemblage du texte.",
        "tickets reçoit 5 sans répéter son type.",
        "Un double affiche toujours une décimale : 12.0."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire string en minuscules",
      "why_fr": "Le type texte est la classe String, avec une majuscule.",
      "fix_fr": "Écris String nom = \"Afi\";."
    },
    {
      "error": "Confondre 'A' et \"A\"",
      "why_fr": "Le premier est un char, le second un String.",
      "fix_fr": "Apostrophes pour un caractère, guillemets pour un texte."
    },
    {
      "error": "Répéter le type lors d’une réaffectation",
      "why_fr": "Cela déclare une seconde variable du même nom.",
      "fix_fr": "Écris seulement nom = valeur;."
    }
  ],
  "quiz": [
    {
      "question": "Quel type choisir pour une taille de 1.75 m ?",
      "options": [
        "int",
        "char",
        "double",
        "boolean"
      ],
      "answer": 2,
      "explanation": "Un nombre à virgule se range dans un double.",
      "id": "java-m1-02-q1"
    },
    {
      "question": "Qu’affiche System.out.println(\"Note : \" + 15); ?",
      "options": [
        "Note : 15",
        "Note : + 15",
        "Une erreur",
        "15"
      ],
      "answer": 0,
      "explanation": "Avec un String d’un côté, + assemble les textes.",
      "id": "java-m1-02-q2"
    },
    {
      "question": "Que se passe-t-il avec final int MAX = 10; puis MAX = 12; ?",
      "options": [
        "MAX vaut 12.",
        "Le compilateur refuse la modification.",
        "MAX vaut 22.",
        "Le programme s’arrête à l’exécution."
      ],
      "answer": 1,
      "explanation": "Une variable final ne peut recevoir qu’une seule valeur.",
      "id": "java-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "type",
      "definition": "Nature d’une valeur : int, double, boolean, char, String…"
    },
    {
      "term": "déclaration",
      "definition": "Annonce du type et du nom d’une variable."
    },
    {
      "term": "final",
      "definition": "Mot-clé qui interdit de modifier une variable après sa première valeur."
    },
    {
      "term": "concaténation",
      "definition": "Assemblage de textes avec l’opérateur +."
    }
  ],
  "recap_fr": [
    "Déclarer et initialiser des variables int, double, boolean, char et String.",
    "Assembler un affichage avec + et protéger une valeur avec final.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "type",
    "déclaration",
    "final",
    "concaténation"
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
      "title": "Variables (dev.java)",
      "url": "https://dev.java/learn/language-basics/variables/"
    },
    {
      "title": "Types primitifs (dev.java)",
      "url": "https://dev.java/learn/language-basics/primitive-types/"
    }
  ],
  "sources": [
    {
      "title": "Variables (dev.java)",
      "url": "https://dev.java/learn/language-basics/variables/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Types primitifs (dev.java)",
      "url": "https://dev.java/learn/language-basics/primitive-types/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une variable est un emplacement nommé qui contient une valeur. En Java, on déclare une variable en donnant son type puis son nom : int age = 17; crée une variable age de type int qui vaut 17. Le type ne change plus ensuite. Cette rigueur, appelée typage statique, permet au compilateur de repérer beaucoup d’erreurs avant même l’exécution.

Cinq types suffisent pour commencer. int range les nombres entiers, comme 17 ou -3. double range les nombres à virgule, écrits avec un point : 1.62. boolean ne vaut que true ou false. char contient un seul caractère entre apostrophes : 'B'. Enfin, String contient un texte entre guillemets : "Afi". String commence par une majuscule, car ce n’est pas un type de base mais une classe fournie par Java. Les apostrophes et les guillemets ne sont pas interchangeables : 'A' est un caractère, "A" est un texte d’une lettre.

Le compilateur refuse les mélanges dangereux. int prix = "500"; provoque l’erreur incompatible types: String cannot be converted to int. De même, Java refuse d’utiliser une variable locale qui n’a jamais reçu de valeur : variable might not have been initialized. Ces messages sont précieux, car ils désignent la ligne fautive avant l’exécution.

Pour changer la valeur d’une variable, on écrit simplement age = 18;, sans répéter le type. Écrire int age = 18; une seconde fois dans le même bloc déclare une autre variable du même nom, ce que Java refuse : variable age is already defined.

Le mot-clé final crée une valeur qui ne changera plus : final int PRIX_TICKET = 200;. Toute modification ultérieure est refusée à la compilation. Par convention, ces constantes s’écrivent en majuscules avec des tirets bas.

L’opérateur + a deux rôles. Entre deux nombres, il additionne. Dès qu’un des deux côtés est un String, il assemble les textes : "Âge : " + 17 donne le texte Âge : 17. C’est ainsi qu’on construit un affichage : System.out.println(prenom + " a " + age + " ans");. Attention aux espaces : Java n’en ajoute aucun.

À l’affichage, un boolean apparaît sous la forme true ou false, et un double garde toujours au moins une décimale : 2.0 s’affiche 2.0 et non 2.

Les noms de variables commencent par une lettre et ne contiennent ni espace ni tiret. L’usage Java est le camelCase : prixTomate, nombreEleves. Un nom clair vaut mieux qu’un commentaire.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        String prenom = "Afi";
        int age = 17;
        double taille = 1.62;
        char groupe = 'B';
        boolean inscrite = true;
        System.out.println(prenom + ", " + age + " ans, " + taille + " m");
        System.out.println("Groupe " + groupe + ", inscrite : " + inscrite);
    }
}
```

Affichage attendu :

    Afi, 17 ans, 1.62 m
    Groupe B, inscrite : true

Trace :

- Cinq variables de cinq types sont déclarées et initialisées.
- + assemble textes et valeurs dans l’ordre.
- Le char B s’affiche comme une lettre.
- Le boolean s’affiche true.

## Exemple guidé 2

```java
public class Main {
    public static void main(String[] args) {
        final int PRIX_TICKET = 200;
        int tickets = 3;
        System.out.println("Total : " + PRIX_TICKET * tickets + " FCFA");
        tickets = 5;
        System.out.println("Nouveau total : " + PRIX_TICKET * tickets + " FCFA");
        double moyenne = 12;
        System.out.println("Moyenne : " + moyenne);
    }
}
```

Affichage attendu :

    Total : 600 FCFA
    Nouveau total : 1000 FCFA
    Moyenne : 12.0

Trace :

- PRIX_TICKET est une constante.
- La multiplication est faite avant l’assemblage du texte.
- tickets reçoit 5 sans répéter son type.
- Un double affiche toujours une décimale : 12.0.

## Vérifier et expliquer

Pour chaque variable, demande-toi quel type décrit le mieux sa valeur. Essaie ensuite de ranger un texte dans un int pour lire le message du compilateur.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Variables (dev.java)](https://dev.java/learn/language-basics/variables/)
- [Types primitifs (dev.java)](https://dev.java/learn/language-basics/primitive-types/)
