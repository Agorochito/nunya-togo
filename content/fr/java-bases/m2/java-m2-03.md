---
{
  "id": "java-m2-03",
  "title_fr": "Répéter un nombre connu de fois avec for",
  "course": "java-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "java-m2-02"
  ],
  "outcomes": [
    "Écrire une boucle for avec son initialisation, sa condition et son pas.",
    "Accumuler un total, compter des cas, imbriquer deux boucles et utiliser break et continue."
  ],
  "idea_fr": "for regroupe sur une ligne les trois éléments d’une boucle : départ, condition et évolution.",
  "analogy_fr": "Pour distribuer les cahiers, le délégué passe de la table 1 à la table 30, une par une : il sait d’avance où il commence, où il s’arrête et de combien il avance.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int total = 0;\n        for (int i = 1; i <= 5; i++) {\n            total += i;\n        }\n        System.out.println(\"Somme de 1 à 5 : \" + total);\n        for (int i = 10; i > 0; i -= 3) {\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n    }\n}",
      "expected_output": "Somme de 1 à 5 : 15\n10 7 4 1 ",
      "inputs": [],
      "trace_fr": [
        "La première boucle ajoute 1, 2, 3, 4 et 5.",
        "total vaut 15 après la boucle.",
        "La seconde part de 10 et retire 3 à chaque tour.",
        "println() sans texte termine la ligne."
      ]
    },
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= 4; j++) {\n                if (j > 1) System.out.print(\" \");\n                System.out.print(i * j);\n            }\n            System.out.println();\n        }\n    }\n}",
      "expected_output": "1 2 3 4\n2 4 6 8\n3 6 9 12",
      "inputs": [],
      "trace_fr": [
        "La boucle extérieure choisit la ligne i.",
        "La boucle intérieure calcule i × j pour j de 1 à 4.",
        "L’espace est ajouté avant chaque valeur sauf la première.",
        "println termine chaque ligne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Se tromper d’un tour",
      "why_fr": "< et <= ne s’arrêtent pas au même endroit.",
      "fix_fr": "Vérifie la première et la dernière valeur de la variable."
    },
    {
      "error": "Mettre un point-virgule après for (…)",
      "why_fr": "La boucle tourne à vide ; le bloc ne s’exécute qu’une fois.",
      "fix_fr": "Ouvre l’accolade directement après la parenthèse."
    },
    {
      "error": "Déclarer l’accumulateur dans la boucle",
      "why_fr": "Il repart de 0 à chaque tour.",
      "fix_fr": "Déclare le total avant la boucle."
    }
  ],
  "quiz": [
    {
      "question": "Combien de tours fait for (int i = 0; i < 4; i++) ?",
      "options": [
        "3",
        "4",
        "5",
        "Une infinité"
      ],
      "answer": 1,
      "explanation": "i prend les valeurs 0, 1, 2 et 3.",
      "id": "java-m2-03-q1"
    },
    {
      "question": "Que fait continue dans une boucle ?",
      "options": [
        "Il quitte la boucle.",
        "Il passe directement au tour suivant.",
        "Il recommence la boucle depuis le début.",
        "Il arrête le programme."
      ],
      "answer": 1,
      "explanation": "continue saute la fin du tour en cours.",
      "id": "java-m2-03-q2"
    },
    {
      "question": "Avec deux boucles imbriquées de 3 et 4 tours, combien de fois s’exécute le bloc intérieur ?",
      "options": [
        "7",
        "12",
        "3",
        "4"
      ],
      "answer": 1,
      "explanation": "La boucle intérieure fait 4 tours pour chacun des 3 tours extérieurs.",
      "id": "java-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "for",
      "definition": "Boucle qui regroupe initialisation, condition et évolution."
    },
    {
      "term": "accumulateur",
      "definition": "Variable qui cumule une valeur au fil des tours."
    },
    {
      "term": "break",
      "definition": "Instruction qui quitte immédiatement une boucle."
    },
    {
      "term": "boucle imbriquée",
      "definition": "Boucle placée dans le bloc d’une autre boucle."
    }
  ],
  "recap_fr": [
    "Écrire une boucle for avec son initialisation, sa condition et son pas.",
    "Accumuler un total, compter des cas, imbriquer deux boucles et utiliser break et continue.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "for",
    "accumulateur",
    "break",
    "boucle imbriquée"
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
      "title": "Boucles for, break et continue (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/"
    }
  ],
  "sources": [
    {
      "title": "Boucles for, break et continue (dev.java)",
      "url": "https://dev.java/learn/language-basics/controlling-flow/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Quand le nombre de tours est connu d’avance, la boucle for est plus lisible que while. Sa première ligne contient trois parties séparées par des points-virgules : for (int i = 1; i <= 5; i++). L’initialisation, int i = 1, s’exécute une seule fois au départ. La condition, i <= 5, est testée avant chaque tour. L’évolution, i++, s’exécute à la fin de chaque tour. Cette boucle fait donc cinq tours, avec i valant 1, 2, 3, 4 puis 5.

La variable i n’existe que dans la boucle. On peut compter à l’envers, for (int i = 10; i >= 0; i--), ou avancer de plusieurs pas, i += 2. Beaucoup de boucles commencent à 0 avec la condition i < n : elles font exactement n tours. Cette habitude prépare les tableaux, dont les cases sont numérotées à partir de 0.

Un premier usage est l’accumulateur. On déclare un total à 0 avant la boucle, puis chaque tour y ajoute une valeur : total += i;. Après la boucle, total contient la somme. Le même schéma sert à compter : un compteur à 0, augmenté seulement quand une condition est vraie, par exemple if (i % 3 == 0) compteur++;.

Une boucle peut en contenir une autre. Pour chaque tour de la boucle extérieure, la boucle intérieure fait tous ses tours. Une table de multiplication, un tableau de places ou un motif d’étoiles s’écrivent ainsi. Donne des noms différents aux deux variables, souvent i et j.

Deux instructions modifient le déroulement. break quitte immédiatement la boucle, par exemple dès qu’on a trouvé ce qu’on cherchait. continue saute la fin du tour en cours et passe directement au suivant. Utilise-les avec modération : une condition de boucle claire reste souvent plus lisible.

Pour construire une ligne en plusieurs morceaux, combine System.out.print à l’intérieur de la boucle et un System.out.println après elle. Quand des valeurs doivent être séparées par un espace mais sans espace final, ajoute le séparateur seulement à partir du deuxième élément : if (i > 1) System.out.print(" ");.

Le piège le plus fréquent est l’erreur d’un tour : écrire i < 5 au lieu de i <= 5, ou commencer à 0 au lieu de 1. Pour l’éviter, vérifie la première et la dernière valeur de la variable, et compte les tours sur un petit exemple. Un autre piège consiste à poser un point-virgule juste après la parenthèse du for : la boucle tourne alors à vide, et le bloc qui suit ne s’exécute qu’une seule fois.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total += i;
        }
        System.out.println("Somme de 1 à 5 : " + total);
        for (int i = 10; i > 0; i -= 3) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

Affichage attendu :

    Somme de 1 à 5 : 15
    10 7 4 1 

Trace :

- La première boucle ajoute 1, 2, 3, 4 et 5.
- total vaut 15 après la boucle.
- La seconde part de 10 et retire 3 à chaque tour.
- println() sans texte termine la ligne.

## Exemple guidé 2

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 4; j++) {
                if (j > 1) System.out.print(" ");
                System.out.print(i * j);
            }
            System.out.println();
        }
    }
}
```

Affichage attendu :

    1 2 3 4
    2 4 6 8
    3 6 9 12

Trace :

- La boucle extérieure choisit la ligne i.
- La boucle intérieure calcule i × j pour j de 1 à 4.
- L’espace est ajouté avant chaque valeur sauf la première.
- println termine chaque ligne.

## Vérifier et expliquer

Avant de lancer, écris le tableau des valeurs de la variable pour les deux premiers et le dernier tour. Compare ensuite avec l’affichage.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Boucles for, break et continue (dev.java)](https://dev.java/learn/language-basics/controlling-flow/)
