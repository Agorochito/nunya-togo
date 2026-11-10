---
{
  "id": "java-m4-02",
  "title_fr": "Protéger ses objets : encapsulation et exceptions",
  "course": "java-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "java-m4-01"
  ],
  "outcomes": [
    "Rendre des attributs private, exposer des méthodes et refuser une opération invalide avec throw.",
    "Intercepter une exception avec try et catch pour que le programme continue."
  ],
  "idea_fr": "Un objet garde ses données privées et décide lui-même des changements acceptés ; une exception signale ce qui ne peut pas être fait.",
  "analogy_fr": "À la tontine, personne ne prend l’argent directement dans la caisse : on passe par la trésorière, qui vérifie chaque demande et refuse celles qui ne respectent pas les règles.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(1000);\n        System.out.println(c.retirer(1500));\n        c.deposer(500);\n        System.out.println(c.getSolde());\n        try {\n            c.deposer(-200);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Refusé : \" + e.getMessage());\n        }\n        System.out.println(c);\n    }\n}\n\nclass Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    int getSolde() {\n        return solde;\n    }\n\n    void deposer(int montant) {\n        if (montant <= 0) {\n            throw new IllegalArgumentException(\"montant invalide\");\n        }\n        solde += montant;\n    }\n\n    boolean retirer(int montant) {\n        if (montant > solde) {\n            return false;\n        }\n        solde -= montant;\n        return true;\n    }\n\n    @Override\n    public String toString() {\n        return \"Compte : \" + solde + \" FCFA\";\n    }\n}",
      "expected_output": "false\n1500\nRefusé : montant invalide\nCompte : 1500 FCFA",
      "inputs": [],
      "trace_fr": [
        "retirer refuse 1500 sur 1000 et renvoie false.",
        "Le dépôt de 500 porte le solde à 1500.",
        "Le dépôt négatif lève une exception, interceptée par catch.",
        "println appelle toString."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int total = 0;\n        String ligne = sc.nextLine();\n        while (!ligne.equals(\"fin\")) {\n            try {\n                total += Integer.parseInt(ligne.trim());\n            } catch (NumberFormatException e) {\n                System.out.println(\"Ligne ignorée : \" + ligne);\n            }\n            ligne = sc.nextLine();\n        }\n        System.out.println(\"Total : \" + total);\n    }\n}",
      "expected_output": "Ligne ignorée : deux cents\nTotal : 800",
      "inputs": [
        "500",
        "deux cents",
        "300",
        "fin"
      ],
      "trace_fr": [
        "500 est ajouté.",
        "deux cents n’est pas un nombre : le catch affiche un message.",
        "La boucle continue avec 300.",
        "Le total vaut 800."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Laisser les attributs publics",
      "why_fr": "N’importe quel code peut y mettre une valeur absurde.",
      "fix_fr": "Déclare-les private et passe par des méthodes qui vérifient."
    },
    {
      "error": "Attraper le mauvais type d’exception",
      "why_fr": "L’exception réelle n’est pas interceptée et arrête le programme.",
      "fix_fr": "Indique dans catch le type exact, par exemple NumberFormatException."
    },
    {
      "error": "Modifier avant de vérifier",
      "why_fr": "L’objet change même quand la demande est refusée.",
      "fix_fr": "Vérifie d’abord, puis modifie."
    }
  ],
  "quiz": [
    {
      "question": "Que provoque compte.solde depuis Main si solde est private ?",
      "options": [
        "La valeur 0",
        "Une erreur de compilation",
        "null",
        "Une exception à l’exécution"
      ],
      "answer": 1,
      "explanation": "Un attribut private n’est accessible que dans sa classe.",
      "id": "java-m4-02-q1"
    },
    {
      "question": "Que fait throw new IllegalArgumentException(\"x\") ?",
      "options": [
        "Il affiche x et continue.",
        "Il arrête la méthode et lance une exception vers l’appelant.",
        "Il ignore l’erreur.",
        "Il recommence la méthode."
      ],
      "answer": 1,
      "explanation": "L’exception remonte jusqu’à un catch, ou arrête le programme.",
      "id": "java-m4-02-q2"
    },
    {
      "question": "Un catch (ArithmeticException e) attrape-t-il une NumberFormatException ?",
      "options": [
        "Oui, toujours",
        "Non",
        "Seulement dans une boucle",
        "Seulement si le message est vide"
      ],
      "answer": 1,
      "explanation": "catch n’attrape que le type indiqué et ses sous-types.",
      "id": "java-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "encapsulation",
      "definition": "Principe qui cache les données d’un objet derrière ses méthodes."
    },
    {
      "term": "private",
      "definition": "Modificateur qui limite l’accès à la classe elle-même."
    },
    {
      "term": "exception",
      "definition": "Objet qui signale une situation anormale et interrompt le déroulement normal."
    },
    {
      "term": "try-catch",
      "definition": "Blocs qui exécutent du code risqué et traitent une exception précise."
    }
  ],
  "recap_fr": [
    "Rendre des attributs private, exposer des méthodes et refuser une opération invalide avec throw.",
    "Intercepter une exception avec try et catch pour que le programme continue.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "encapsulation",
    "private",
    "exception",
    "try-catch"
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
      "title": "Contrôler l’accès aux membres (dev.java)",
      "url": "https://dev.java/learn/classes-objects/more-on-classes/"
    },
    {
      "title": "Intercepter les exceptions (dev.java)",
      "url": "https://dev.java/learn/exceptions/catching-handling/"
    },
    {
      "title": "Lever une exception (dev.java)",
      "url": "https://dev.java/learn/exceptions/throwing/"
    }
  ],
  "sources": [
    {
      "title": "Contrôler l’accès aux membres (dev.java)",
      "url": "https://dev.java/learn/classes-objects/more-on-classes/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Intercepter les exceptions (dev.java)",
      "url": "https://dev.java/learn/exceptions/catching-handling/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Lever une exception (dev.java)",
      "url": "https://dev.java/learn/exceptions/throwing/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Dans la leçon précédente, n’importe quelle partie du programme pouvait écrire riz.prix = -500;. Rien n’empêchait une valeur absurde. L’encapsulation corrige ce défaut : les attributs deviennent private, et seules les méthodes de la classe peuvent les modifier. private int solde; n’est plus accessible depuis Main : compte.solde provoque l’erreur solde has private access.

Pour lire une valeur privée, la classe propose un accesseur, souvent nommé getSolde(). Pour la modifier, elle propose des méthodes qui ont un sens métier, comme deposer et retirer, plutôt qu’un simple setSolde. Chacune vérifie sa demande avant d’agir. Ainsi, la règle « le solde ne devient jamais négatif » est écrite à un seul endroit, et aucun autre code ne peut la contourner.

Que faire quand une demande est invalide ? Une méthode peut renvoyer false, comme retirer quand le solde est insuffisant : c’est un refus prévu, que l’appelant teste. Pour une erreur de programmation ou une donnée absurde, comme un dépôt négatif, on lève une exception : throw new IllegalArgumentException("Montant invalide");. La méthode s’arrête aussitôt, sans rien modifier.

Une exception remonte vers l’appelant. Si personne ne l’intercepte, le programme s’arrête et affiche son nom : tu as déjà rencontré ArithmeticException, NumberFormatException ou NullPointerException. Pour l’intercepter, on entoure le code risqué d’un bloc try, suivi d’un bloc catch qui précise le type d’exception attendu : try { … } catch (NumberFormatException e) { … }. Si une exception de ce type survient dans le try, l’exécution saute directement dans le catch, puis continue après. e.getMessage() renvoie le message fourni au moment du throw.

Le type indiqué dans catch compte. Un catch (ArithmeticException e) n’attrape pas une NumberFormatException : celle-ci continue sa remontée. Attrape le type précis que tu sais traiter, plutôt que tout, pour ne pas cacher de vraies erreurs.

Un usage courant est la saisie robuste : Integer.parseInt dans un try, et dans le catch un message clair pour l’utilisateur, au lieu d’un arrêt brutal. Le programme peut alors ignorer la ligne fautive et passer à la suivante.

Enfin, une classe peut définir sa méthode toString(), qui renvoie le texte qui la représente. System.out.println(compte) l’appelle automatiquement. On l’écrit public String toString(), avec @Override sur la ligne précédente pour demander au compilateur de vérifier qu’on remplace bien la version par défaut, qui affiche un nom technique peu lisible.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        Compte c = new Compte(1000);
        System.out.println(c.retirer(1500));
        c.deposer(500);
        System.out.println(c.getSolde());
        try {
            c.deposer(-200);
        } catch (IllegalArgumentException e) {
            System.out.println("Refusé : " + e.getMessage());
        }
        System.out.println(c);
    }
}

class Compte {
    private int solde;

    Compte(int solde) {
        this.solde = solde;
    }

    int getSolde() {
        return solde;
    }

    void deposer(int montant) {
        if (montant <= 0) {
            throw new IllegalArgumentException("montant invalide");
        }
        solde += montant;
    }

    boolean retirer(int montant) {
        if (montant > solde) {
            return false;
        }
        solde -= montant;
        return true;
    }

    @Override
    public String toString() {
        return "Compte : " + solde + " FCFA";
    }
}
```

Affichage attendu :

    false
    1500
    Refusé : montant invalide
    Compte : 1500 FCFA

Trace :

- retirer refuse 1500 sur 1000 et renvoie false.
- Le dépôt de 500 porte le solde à 1500.
- Le dépôt négatif lève une exception, interceptée par catch.
- println appelle toString.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = 0;
        String ligne = sc.nextLine();
        while (!ligne.equals("fin")) {
            try {
                total += Integer.parseInt(ligne.trim());
            } catch (NumberFormatException e) {
                System.out.println("Ligne ignorée : " + ligne);
            }
            ligne = sc.nextLine();
        }
        System.out.println("Total : " + total);
    }
}
```

Saisies de l’exemple : 500 · deux cents · 300 · fin

Affichage attendu :

    Ligne ignorée : deux cents
    Total : 800

Trace :

- 500 est ajouté.
- deux cents n’est pas un nombre : le catch affiche un message.
- La boucle continue avec 300.
- Le total vaut 800.

## Vérifier et expliquer

Pour chaque méthode qui modifie un objet, cherche une valeur qui devrait être refusée et vérifie qu’elle l’est sans rien changer.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Contrôler l’accès aux membres (dev.java)](https://dev.java/learn/classes-objects/more-on-classes/)
- [Intercepter les exceptions (dev.java)](https://dev.java/learn/exceptions/catching-handling/)
- [Lever une exception (dev.java)](https://dev.java/learn/exceptions/throwing/)
