---
{
  "id": "java-m3-02",
  "title_fr": "Ranger des séries de valeurs dans des tableaux",
  "course": "java-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "java-m3-01"
  ],
  "outcomes": [
    "Créer un tableau, lire et modifier ses cases, parcourir avec for et for-each.",
    "Calculer somme, maximum et moyenne d’un tableau, et formater un nombre avec String.format."
  ],
  "idea_fr": "Un tableau range plusieurs valeurs du même type sous un seul nom, chacune repérée par un indice à partir de 0.",
  "analogy_fr": "Un casier de bouteilles a des cases numérotées : on sait combien il y en a, et on retrouve chaque bouteille par son numéro.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 17};\n        int total = 0;\n        int max = notes[0];\n        for (int n : notes) {\n            total += n;\n            if (n > max) {\n                max = n;\n            }\n        }\n        double moyenne = (double) total / notes.length;\n        System.out.println(\"Notes : \" + notes.length);\n        System.out.println(\"Maximum : \" + max);\n        System.out.println(\"Moyenne : \" + String.format(\"%.1f\", moyenne));\n    }\n}",
      "expected_output": "Notes : 4\nMaximum : 17\nMoyenne : 13.3",
      "inputs": [],
      "trace_fr": [
        "Le tableau contient 4 notes.",
        "for-each passe sur 12, 15, 9 puis 17.",
        "max devient 15 puis 17.",
        "53 / 4 = 13.25, arrondi à 13.3 par String.format."
      ]
    },
    {
      "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine());\n        int[] ventes = new int[n];\n        for (int i = 0; i < n; i++) {\n            ventes[i] = Integer.parseInt(sc.nextLine());\n        }\n        ventes[0] = ventes[0] * 2;\n        System.out.println(java.util.Arrays.toString(ventes));\n    }\n}",
      "expected_output": "[10, 4, 7]",
      "inputs": [
        "3",
        "5",
        "4",
        "7"
      ],
      "trace_fr": [
        "La taille 3 est lue d’abord.",
        "La boucle range 5, 4 et 7 dans les cases 0, 1 et 2.",
        "La case 0 est doublée.",
        "Arrays.toString affiche tout le tableau."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser i <= t.length",
      "why_fr": "La dernière case a l’indice length - 1 : on sort du tableau.",
      "fix_fr": "Écris i < t.length."
    },
    {
      "error": "Commencer le maximum à 0",
      "why_fr": "Avec des valeurs toutes négatives, 0 reste le maximum.",
      "fix_fr": "Pars de la première case : max = t[0]."
    },
    {
      "error": "Écrire t.length()",
      "why_fr": "Pour un tableau, length est un attribut, sans parenthèses.",
      "fix_fr": "Écris t.length."
    }
  ],
  "quiz": [
    {
      "question": "Quel est l’indice de la dernière case d’un tableau de 5 cases ?",
      "options": [
        "5",
        "4",
        "6",
        "0"
      ],
      "answer": 1,
      "explanation": "Les indices vont de 0 à length - 1.",
      "id": "java-m3-02-q1"
    },
    {
      "question": "Que contient new int[3] juste après sa création ?",
      "options": [
        "Rien",
        "Trois 0",
        "Des valeurs au hasard",
        "null"
      ],
      "answer": 1,
      "explanation": "Les cases int d’un nouveau tableau valent 0.",
      "id": "java-m3-02-q2"
    },
    {
      "question": "Une méthode reçoit un tableau et modifie t[0]. Que voit l’appelant ?",
      "options": [
        "L’ancienne valeur",
        "La nouvelle valeur",
        "Une erreur",
        "null"
      ],
      "answer": 1,
      "explanation": "Le tableau est partagé : la méthode travaille sur le même.",
      "id": "java-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "tableau",
      "definition": "Suite de valeurs du même type, de taille fixe."
    },
    {
      "term": "indice",
      "definition": "Numéro d’une case, à partir de 0."
    },
    {
      "term": "for-each",
      "definition": "Boucle for (type x : tableau) qui lit chaque valeur à son tour."
    },
    {
      "term": "référence",
      "definition": "Lien vers un tableau ou un objet, partagé entre plusieurs variables."
    }
  ],
  "recap_fr": [
    "Créer un tableau, lire et modifier ses cases, parcourir avec for et for-each.",
    "Calculer somme, maximum et moyenne d’un tableau, et formater un nombre avec String.format.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "tableau",
    "indice",
    "for-each",
    "référence"
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
      "title": "Tableaux (dev.java)",
      "url": "https://dev.java/learn/language-basics/arrays/"
    },
    {
      "title": "java.util.Arrays",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html"
    }
  ],
  "sources": [
    {
      "title": "Tableaux (dev.java)",
      "url": "https://dev.java/learn/language-basics/arrays/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "java.util.Arrays",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Pour garder les notes de trente élèves, trente variables seraient ingérables. Un tableau les range sous un seul nom. int[] notes = {12, 15, 9}; crée un tableau de trois int. Les crochets après le type signalent un tableau. On peut aussi créer un tableau vide d’une taille donnée : int[] ventes = new int[7]; contient sept cases qui valent toutes 0 au départ.

Chaque case est repérée par un indice, qui commence à 0. notes[0] vaut 12 et notes[2] vaut 9. On modifie une case par affectation : notes[1] = 16;. La taille s’obtient avec notes.length, sans parenthèses, et elle ne change jamais après la création. Le dernier indice valide est donc notes.length - 1. Lire notes[3] dans un tableau de trois cases provoque une ArrayIndexOutOfBoundsException : le programme s’arrête et l’atelier indique la ligne.

Pour parcourir un tableau, la boucle for classique utilise l’indice : for (int i = 0; i < notes.length; i++). Elle convient quand on a besoin de la position ou qu’on modifie les cases. Pour simplement lire chaque valeur, la boucle for-each est plus courte : for (int n : notes) se lit « pour chaque n dans notes ».

Les calculs habituels suivent des schémas à connaître. La somme utilise un accumulateur. Le maximum part de la première case, int max = notes[0];, puis la remplace chaque fois qu’une case est plus grande ; partir de 0 serait faux si toutes les valeurs étaient négatives. La moyenne divise la somme par notes.length, en pensant à convertir en double pour garder les décimales.

Pour afficher un nombre à virgule avec un nombre fixe de décimales, String.format("%.1f", moyenne) renvoie un texte arrondi à une décimale. Dans cet atelier, le séparateur décimal est le point ; sur un ordinateur réglé en français, Java peut afficher une virgule. Pour afficher tout un tableau d’un coup, java.util.Arrays.toString(notes) produit [12, 15, 9].

Une méthode peut recevoir un tableau : static int somme(int[] t). Attention : le tableau n’est pas copié. La méthode travaille sur le même tableau que l’appelant, donc si elle modifie une case, la modification est visible après l’appel. On dit que la variable contient une référence vers le tableau.

Enfin, pour remplir un tableau à partir de saisies, on lit d’abord la taille, on crée le tableau avec new, puis une boucle range chaque valeur lue dans sa case.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        int[] notes = {12, 15, 9, 17};
        int total = 0;
        int max = notes[0];
        for (int n : notes) {
            total += n;
            if (n > max) {
                max = n;
            }
        }
        double moyenne = (double) total / notes.length;
        System.out.println("Notes : " + notes.length);
        System.out.println("Maximum : " + max);
        System.out.println("Moyenne : " + String.format("%.1f", moyenne));
    }
}
```

Affichage attendu :

    Notes : 4
    Maximum : 17
    Moyenne : 13.3

Trace :

- Le tableau contient 4 notes.
- for-each passe sur 12, 15, 9 puis 17.
- max devient 15 puis 17.
- 53 / 4 = 13.25, arrondi à 13.3 par String.format.

## Exemple guidé 2

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());
        int[] ventes = new int[n];
        for (int i = 0; i < n; i++) {
            ventes[i] = Integer.parseInt(sc.nextLine());
        }
        ventes[0] = ventes[0] * 2;
        System.out.println(java.util.Arrays.toString(ventes));
    }
}
```

Saisies de l’exemple : 3 · 5 · 4 · 7

Affichage attendu :

    [10, 4, 7]

Trace :

- La taille 3 est lue d’abord.
- La boucle range 5, 4 et 7 dans les cases 0, 1 et 2.
- La case 0 est doublée.
- Arrays.toString affiche tout le tableau.

## Vérifier et expliquer

Écris le contenu du tableau sur papier, case par case avec ses indices, puis suis la boucle tour par tour.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Tableaux (dev.java)](https://dev.java/learn/language-basics/arrays/)
- [java.util.Arrays](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html)
