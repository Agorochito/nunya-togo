---
{
  "id": "java-m3-03",
  "title_fr": "Travailler avec les textes et les listes",
  "course": "java-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "java-m3-02"
  ],
  "outcomes": [
    "Utiliser les méthodes de String : length, charAt, substring, indexOf, toUpperCase, trim, split.",
    "Créer une ArrayList, ajouter, lire, retirer et parcourir ses éléments."
  ],
  "idea_fr": "Un String est un objet avec ses propres méthodes ; une ArrayList est un tableau qui s’agrandit tout seul.",
  "analogy_fr": "Le cahier de la tontine s’allonge à chaque nouveau membre, sans qu’on ait besoin de prévoir le nombre de pages à l’avance.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        String ville = \"  Atakpamé \";\n        ville = ville.trim();\n        System.out.println(ville.length());\n        System.out.println(ville.substring(0, 4).toUpperCase());\n        System.out.println(ville.indexOf(\"pa\"));\n        String[] morceaux = \"Afi,15,12\".split(\",\");\n        int total = Integer.parseInt(morceaux[1]) + Integer.parseInt(morceaux[2]);\n        System.out.println(morceaux[0] + \" : \" + total);\n    }\n}",
      "expected_output": "8\nATAK\n4\nAfi : 27",
      "inputs": [],
      "trace_fr": [
        "trim retire les espaces : Atakpamé fait 8 caractères.",
        "substring(0, 4) donne Atak, mis en majuscules.",
        "pa commence à la position 4.",
        "split découpe la ligne en trois morceaux."
      ]
    },
    {
      "code": "import java.util.ArrayList;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        ArrayList<String> courses = new ArrayList<>();\n        String ligne = sc.nextLine();\n        while (!ligne.equals(\"fin\")) {\n            courses.add(ligne.trim());\n            ligne = sc.nextLine();\n        }\n        courses.remove(0);\n        System.out.println(courses.size() + \" articles\");\n        for (int i = 0; i < courses.size(); i++) {\n            System.out.println((i + 1) + \". \" + courses.get(i));\n        }\n        System.out.println(courses.contains(\"gari\"));\n    }\n}",
      "expected_output": "2 articles\n1. huile\n2. gari\ntrue",
      "inputs": [
        "riz",
        "huile",
        " gari",
        "fin"
      ],
      "trace_fr": [
        "Trois articles sont ajoutés.",
        "remove(0) retire riz, le premier.",
        "size vaut 2 ; get lit chaque élément.",
        "contains trouve gari."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de récupérer le résultat d’une méthode de String",
      "why_fr": "Un String est immuable : l’original ne change pas.",
      "fix_fr": "Écris texte = texte.trim();."
    },
    {
      "error": "Confondre length, length() et size()",
      "why_fr": "Chaque type a sa propre façon de mesurer.",
      "fix_fr": "Tableau : length ; String : length() ; ArrayList : size()."
    },
    {
      "error": "Écrire ArrayList<int>",
      "why_fr": "Une liste ne contient que des objets.",
      "fix_fr": "Utilise ArrayList<Integer>."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie \"Lomé\".charAt(1) ?",
      "options": [
        "L",
        "o",
        "m",
        "é"
      ],
      "answer": 1,
      "explanation": "Les positions commencent à 0 : la position 1 est o.",
      "id": "java-m3-03-q1"
    },
    {
      "question": "Que donne \"Kara\".substring(1, 3) ?",
      "options": [
        "Kar",
        "ar",
        "ara",
        "Ka"
      ],
      "answer": 1,
      "explanation": "De la position 1 incluse à 3 exclue : a et r.",
      "id": "java-m3-03-q2"
    },
    {
      "question": "Comment connaître le nombre d’éléments d’une ArrayList liste ?",
      "options": [
        "liste.length",
        "liste.length()",
        "liste.size()",
        "liste.count"
      ],
      "answer": 2,
      "explanation": "Une ArrayList se mesure avec size().",
      "id": "java-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "immuable",
      "definition": "Qui ne peut pas être modifié : chaque méthode de String renvoie un nouveau texte."
    },
    {
      "term": "split",
      "definition": "Méthode qui découpe un texte en tableau selon un séparateur."
    },
    {
      "term": "ArrayList",
      "definition": "Liste de taille variable du paquet java.util."
    },
    {
      "term": "classe enveloppe",
      "definition": "Integer, Double… : version objet d’un type de base."
    }
  ],
  "recap_fr": [
    "Utiliser les méthodes de String : length, charAt, substring, indexOf, toUpperCase, trim, split.",
    "Créer une ArrayList, ajouter, lire, retirer et parcourir ses éléments.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "immuable",
    "split",
    "ArrayList",
    "classe enveloppe"
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
      "title": "Les chaînes de caractères (dev.java)",
      "url": "https://dev.java/learn/numbers-strings/strings/"
    },
    {
      "title": "String",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
    },
    {
      "title": "ArrayList",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html"
    }
  ],
  "sources": [
    {
      "title": "Les chaînes de caractères (dev.java)",
      "url": "https://dev.java/learn/numbers-strings/strings/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "String",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "ArrayList",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un String n’est pas une simple valeur : c’est un objet qui sait faire des choses. On appelle ses méthodes avec un point : nom.length() renvoie le nombre de caractères, avec parenthèses cette fois. nom.charAt(0) renvoie le premier caractère, de type char. Comme pour les tableaux, les positions commencent à 0.

Les méthodes les plus utiles sont à connaître. substring(debut, fin) extrait un morceau, du caractère debut inclus jusqu’à fin exclu : "Atakpamé".substring(0, 4) donne Atak. indexOf("a") renvoie la position de la première occurrence, ou -1 si le texte est absent. toUpperCase() et toLowerCase() changent la casse. trim() retire les espaces au début et à la fin, très utile sur une saisie. contains, startsWith et endsWith répondent par true ou false. replace("a", "e") remplace toutes les occurrences.

Un String ne se modifie jamais : on dit qu’il est immuable. Chaque méthode renvoie un nouveau texte et laisse l’original intact. Écrire nom.toUpperCase(); seul ne sert donc à rien : il faut récupérer le résultat, nom = nom.toUpperCase();.

split découpe un texte selon un séparateur et renvoie un tableau de String : "Afi,15,12".split(",") donne un tableau de trois cases, Afi, 15 et 12. C’est la façon la plus simple de lire une ligne qui contient plusieurs informations. Pense ensuite à convertir les morceaux numériques avec Integer.parseInt, après un trim si des espaces peuvent traîner.

Pour parcourir un texte caractère par caractère, on combine une boucle et charAt : for (int i = 0; i < mot.length(); i++). Un char se compare avec ==, entre apostrophes : if (c == 'a').

Les tableaux ont une taille fixe. Quand on ne sait pas d’avance combien d’éléments on aura, on utilise une ArrayList. Après import java.util.ArrayList;, on écrit ArrayList<String> noms = new ArrayList<>();. Le type entre chevrons indique ce que contient la liste. add ajoute à la fin, get(i) lit l’élément d’indice i, set(i, valeur) le remplace, remove(i) le retire, size() donne la taille et contains teste la présence. La boucle for-each fonctionne comme pour un tableau.

Une ArrayList ne contient que des objets. Pour des nombres, on écrit ArrayList<Integer> ou ArrayList<Double>, avec les classes enveloppes Integer et Double. Java convertit automatiquement entre int et Integer : liste.add(5) et int x = liste.get(0) fonctionnent directement.

Ne confonds pas les trois façons de mesurer : t.length pour un tableau, texte.length() pour un String, liste.size() pour une ArrayList. Le compilateur te le rappellera si tu te trompes.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        String ville = "  Atakpamé ";
        ville = ville.trim();
        System.out.println(ville.length());
        System.out.println(ville.substring(0, 4).toUpperCase());
        System.out.println(ville.indexOf("pa"));
        String[] morceaux = "Afi,15,12".split(",");
        int total = Integer.parseInt(morceaux[1]) + Integer.parseInt(morceaux[2]);
        System.out.println(morceaux[0] + " : " + total);
    }
}
```

Affichage attendu :

    8
    ATAK
    4
    Afi : 27

Trace :

- trim retire les espaces : Atakpamé fait 8 caractères.
- substring(0, 4) donne Atak, mis en majuscules.
- pa commence à la position 4.
- split découpe la ligne en trois morceaux.

## Exemple guidé 2

```java
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> courses = new ArrayList<>();
        String ligne = sc.nextLine();
        while (!ligne.equals("fin")) {
            courses.add(ligne.trim());
            ligne = sc.nextLine();
        }
        courses.remove(0);
        System.out.println(courses.size() + " articles");
        for (int i = 0; i < courses.size(); i++) {
            System.out.println((i + 1) + ". " + courses.get(i));
        }
        System.out.println(courses.contains("gari"));
    }
}
```

Saisies de l’exemple : riz · huile ·  gari · fin

Affichage attendu :

    2 articles
    1. huile
    2. gari
    true

Trace :

- Trois articles sont ajoutés.
- remove(0) retire riz, le premier.
- size vaut 2 ; get lit chaque élément.
- contains trouve gari.

## Vérifier et expliquer

Pour chaque méthode de String, prédis le résultat sur un petit mot avant de lancer, en comptant les positions à partir de 0.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Les chaînes de caractères (dev.java)](https://dev.java/learn/numbers-strings/strings/)
- [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- [ArrayList](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html)
