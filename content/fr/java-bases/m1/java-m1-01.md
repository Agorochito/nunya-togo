---
{
  "id": "java-m1-01",
  "title_fr": "Compiler et afficher un premier programme Java",
  "course": "java-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Écrire un programme Java complet : class Main et public static void main(String[] args).",
    "Afficher du texte avec System.out.println et System.out.print, et lire un message du compilateur."
  ],
  "idea_fr": "Un programme Java est d’abord compilé en bytecode, puis exécuté par la machine virtuelle Java.",
  "analogy_fr": "Un discours écrit en français est traduit une fois dans une langue commune, puis chaque interprète du pays peut le lire à voix haute : le texte n’est traduit qu’une fois, mais il est compris partout.",
  "examples": [
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour depuis Lomé !\");\n        System.out.println(\"Bienvenue au club de code.\");\n    }\n}",
      "expected_output": "Bonjour depuis Lomé !\nBienvenue au club de code.",
      "inputs": [],
      "trace_fr": [
        "La classe Main contient la méthode main.",
        "L’exécution commence à la première ligne de main.",
        "Chaque println affiche son texte puis passe à la ligne."
      ]
    },
    {
      "code": "public class Main {\n    public static void main(String[] args) {\n        // print ne passe pas à la ligne\n        System.out.print(\"Marché \");\n        System.out.print(\"de \");\n        System.out.println(\"Kara\");\n        System.out.println(\"Ouvert le samedi\");\n    }\n}",
      "expected_output": "Marché de Kara\nOuvert le samedi",
      "inputs": [],
      "trace_fr": [
        "Le commentaire est ignoré.",
        "Les deux print collent leurs textes sur la même ligne.",
        "println termine la ligne après Kara.",
        "Le dernier println affiche une seconde ligne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier le point-virgule",
      "why_fr": "Le compilateur ne sait pas où l’instruction se termine : ';' expected.",
      "fix_fr": "Ajoute ; à la fin de chaque instruction."
    },
    {
      "error": "Écrire system ou Println",
      "why_fr": "Java distingue les majuscules : le nom n’existe pas.",
      "fix_fr": "Écris System.out.println exactement."
    },
    {
      "error": "Utiliser print au lieu de println",
      "why_fr": "Les textes se collent sur la même ligne.",
      "fix_fr": "println passe à la ligne après le texte."
    }
  ],
  "quiz": [
    {
      "question": "Que fait la machine virtuelle Java (JVM) ?",
      "options": [
        "Elle écrit le code à ta place.",
        "Elle exécute le bytecode produit par le compilateur.",
        "Elle corrige les fautes de frappe.",
        "Elle remplace le système d’exploitation."
      ],
      "answer": 1,
      "explanation": "javac produit du bytecode ; la JVM l’exécute sur chaque système.",
      "id": "java-m1-01-q1"
    },
    {
      "question": "Qu’affichent System.out.print(\"A\"); puis System.out.print(\"B\"); ?",
      "options": [
        "A puis B sur deux lignes",
        "AB",
        "A B",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "print ne passe pas à la ligne et n’ajoute pas d’espace.",
      "id": "java-m1-01-q2"
    },
    {
      "question": "Que se passe-t-il si une ligne contient une faute de syntaxe ?",
      "options": [
        "Les autres lignes s’exécutent.",
        "Seule cette ligne est ignorée.",
        "La compilation échoue et rien ne s’exécute.",
        "Le programme s’exécute plus lentement."
      ],
      "answer": 2,
      "explanation": "Sans compilation réussie, il n’y a pas de programme à exécuter.",
      "id": "java-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "JVM",
      "definition": "Machine virtuelle Java : programme qui exécute le bytecode."
    },
    {
      "term": "bytecode",
      "definition": "Code intermédiaire produit par javac, compris par la JVM."
    },
    {
      "term": "classe",
      "definition": "Bloc qui regroupe le code Java ; ici, la classe Main."
    },
    {
      "term": "main",
      "definition": "Méthode principale par laquelle commence l’exécution."
    }
  ],
  "recap_fr": [
    "Écrire un programme Java complet : class Main et public static void main(String[] args).",
    "Afficher du texte avec System.out.println et System.out.print, et lire un message du compilateur.",
    "Lire le premier message du compilateur ou de l’exception, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "java",
    "débutant",
    "JVM",
    "bytecode",
    "classe",
    "main"
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
      "title": "Premiers pas avec Java (dev.java)",
      "url": "https://dev.java/learn/getting-started/"
    },
    {
      "title": "PrintStream : print et println",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html"
    }
  ],
  "sources": [
    {
      "title": "Premiers pas avec Java (dev.java)",
      "url": "https://dev.java/learn/getting-started/",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "PrintStream : print et println",
      "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html",
      "scope": "Documentation officielle Java (dev.java et API Java SE 21) ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Java est un langage compilé, mais d’une façon particulière. Le compilateur, javac, lit ton texte en entier et le traduit en bytecode, un code intermédiaire. Ce bytecode est ensuite exécuté par la machine virtuelle Java, la JVM, qui existe pour Windows, Linux, macOS et même pour les téléphones. C’est ce qui a fait le succès de Java : le même programme compilé fonctionne partout où une JVM est installée. Java fait tourner des applications Android, des serveurs de banques et d’opérateurs téléphoniques, et de nombreux logiciels d’entreprise.

Dans ce cours, la compilation se fait en ligne, sur le service gratuit Wandbox, avec Java 21. Il faut une connexion pour exécuter ton code, et chaque essai prend quelques secondes. Les leçons et les questions restent lisibles hors ligne.

Un programme Java est toujours rangé dans une classe. Dans cet atelier, la classe principale s’appelle Main : public class Main, suivi d’accolades. À l’intérieur se trouve la méthode principale, public static void main(String[] args). L’exécution commence toujours à la première instruction de main. Chaque mot de cette ligne a un sens que tu découvriras dans les modules suivants ; pour l’instant, recopie-la telle quelle.

Pour afficher, on écrit System.out.println("Bonjour");. System.out désigne la sortie standard, l’écran du terminal, et println affiche le texte puis passe à la ligne. Sa cousine System.out.print affiche sans passer à la ligne : deux print successifs collent leurs textes. Le texte s’écrit entre guillemets droits.

Chaque instruction se termine par un point-virgule. Java distingue les majuscules : system.out ou Println ne sont pas reconnus. Les accolades vont toujours par paires : une accolade ouvrante oubliée ou en trop empêche la compilation.

Si une seule faute existe, javac refuse tout le programme : rien ne s’exécute. Le message est en anglais, par exemple ';' expected ou cannot find symbol. L’atelier affiche le premier message avec sa ligne. Lis seulement le premier : une erreur en entraîne souvent d’autres, et la corriger suffit fréquemment à faire disparaître les suivantes.

Sur ton propre ordinateur, avec un JDK installé, ce programme s’enregistre dans un fichier Main.java. On le compile avec javac Main.java puis on l’exécute avec java Main ; depuis Java 11, java Main.java fait les deux à la fois.

Les commentaires commencent par // pour une ligne, ou s’écrivent entre /* et */ sur plusieurs lignes. Le compilateur les ignore ; ils expliquent une intention à la personne qui lira le code.

## Exemple guidé 1

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour depuis Lomé !");
        System.out.println("Bienvenue au club de code.");
    }
}
```

Affichage attendu :

    Bonjour depuis Lomé !
    Bienvenue au club de code.

Trace :

- La classe Main contient la méthode main.
- L’exécution commence à la première ligne de main.
- Chaque println affiche son texte puis passe à la ligne.

## Exemple guidé 2

```java
public class Main {
    public static void main(String[] args) {
        // print ne passe pas à la ligne
        System.out.print("Marché ");
        System.out.print("de ");
        System.out.println("Kara");
        System.out.println("Ouvert le samedi");
    }
}
```

Affichage attendu :

    Marché de Kara
    Ouvert le samedi

Trace :

- Le commentaire est ignoré.
- Les deux print collent leurs textes sur la même ligne.
- println termine la ligne après Kara.
- Le dernier println affiche une seconde ligne.

## Vérifier et expliquer

Lance ton programme et compare chaque ligne avec l’affichage attendu. Retire ensuite volontairement un point-virgule pour apprendre à lire le message du compilateur.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans la documentation officielle Java :

- [Premiers pas avec Java (dev.java)](https://dev.java/learn/getting-started/)
- [PrintStream : print et println](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html)
