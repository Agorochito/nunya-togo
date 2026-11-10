---
{
  "id": "term-m1-02",
  "title_fr": "Se déplacer dans les dossiers",
  "course": "bash-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "term-m1-01"
  ],
  "outcomes": [
    "Lister le contenu d’un dossier avec ls, ls -1 et ls -a.",
    "Se déplacer avec cd en utilisant des chemins relatifs, . et .."
  ],
  "idea_fr": "Les fichiers sont rangés dans un arbre de dossiers ; un chemin indique comment aller d’un dossier à un autre.",
  "analogy_fr": "Une adresse à Lomé : quartier, rue, maison. Depuis chez toi, tu peux aussi dire « deux maisons plus loin » : c’est un chemin relatif.",
  "examples": [
    {
      "code": "ls -1\necho \"==\"\nls -a",
      "expected_output": "agenda.txt\nmembres.txt\nphotos\n==\n.\n..\n.secret\nagenda.txt\nmembres.txt\nphotos",
      "inputs": [],
      "trace_fr": [
        "ls -1 liste un élément par ligne, sans les fichiers cachés.",
        "La ligne == sépare les deux affichages.",
        "ls -a montre aussi ., .. et le fichier caché .secret.",
        "Sans -1, ls a pourtant affiché un élément par ligne : c’est son comportement quand la sortie n’est pas un écran."
      ],
      "files": {
        "membres.txt": "Afi\nKossi\nYawa\n",
        "agenda.txt": "mardi : lecture\njeudi : jardin\n",
        "photos/": "",
        ".secret": "code fictif\n"
      }
    },
    {
      "code": "cd documents/2026\nls -1\ncd ../..\nls -1",
      "expected_output": "janvier.txt\nmars.txt\ndocuments\nnotes.txt",
      "inputs": [],
      "trace_fr": [
        "cd entre dans documents puis dans 2026.",
        "ls -1 liste les deux fichiers de 2026.",
        "cd ../.. remonte de deux niveaux, au dossier de départ.",
        "ls -1 liste à nouveau le dossier de départ."
      ],
      "files": {
        "documents/2026/janvier.txt": "j\n",
        "documents/2026/mars.txt": "m\n",
        "notes.txt": "n\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier dans quel dossier on se trouve",
      "why_fr": "Les commandes suivantes travaillent dans le dernier dossier atteint.",
      "fix_fr": "Note chaque cd et utilise pwd en cas de doute."
    },
    {
      "error": "Croire que ls montre tout",
      "why_fr": "Les fichiers commençant par un point sont cachés.",
      "fix_fr": "Utilise ls -a pour tout voir."
    },
    {
      "error": "Mettre un espace dans un nom sans guillemets",
      "why_fr": "Bash lit deux arguments au lieu d’un.",
      "fix_fr": "Évite les espaces ou mets le nom entre guillemets."
    }
  ],
  "quiz": [
    {
      "question": "Que fait cd .. ?",
      "options": [
        "Entre dans un dossier nommé ..",
        "Remonte au dossier parent.",
        "Revient à la racine.",
        "Liste les fichiers cachés."
      ],
      "answer": 1,
      "explanation": ".. désigne le dossier qui contient le dossier courant.",
      "id": "term-m1-02-q1"
    },
    {
      "question": "Quel chemin est absolu ?",
      "options": [
        "photos/2026",
        "../notes.txt",
        "/home/afi/notes.txt",
        "./agenda.txt"
      ],
      "answer": 2,
      "explanation": "Un chemin absolu commence par /.",
      "id": "term-m1-02-q2"
    },
    {
      "question": "Pourquoi ls n’affiche-t-il pas .config ?",
      "options": [
        "Le fichier est vide.",
        "Son nom commence par un point : il est caché.",
        "Il est trop gros.",
        "ls ne liste que les dossiers."
      ],
      "answer": 1,
      "explanation": "ls -a affiche les fichiers cachés.",
      "id": "term-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "dossier courant",
      "definition": "Dossier depuis lequel les commandes travaillent."
    },
    {
      "term": "chemin relatif",
      "definition": "Chemin qui part du dossier courant."
    },
    {
      "term": "chemin absolu",
      "definition": "Chemin qui part de la racine /."
    },
    {
      "term": "fichier caché",
      "definition": "Fichier dont le nom commence par un point."
    }
  ],
  "recap_fr": [
    "Lister le contenu d’un dossier avec ls, ls -1 et ls -a.",
    "Se déplacer avec cd en utilisant des chemins relatifs, . et ..",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "dossier courant",
    "chemin relatif",
    "chemin absolu",
    "fichier caché"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "bash",
  "runtime": "bash",
  "level": "debutant",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "Bash 5.2 dans un vrai système Linux en ligne, sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Chaque essai démarre dans un dossier neuf avec ses fichiers de départ. Seuls tes commandes, les saisies et ces fichiers fictifs sont envoyés, sans nom ni compte.",
  "references": [
    {
      "title": "GNU Coreutils — ls",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html"
    },
    {
      "title": "Bash — cd et commandes internes",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html"
    }
  ],
  "sources": [
    {
      "title": "GNU Coreutils — ls",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — cd et commandes internes",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un système Linux range tous ses fichiers dans un arbre de dossiers. Tout en haut se trouve la racine, notée /. Chaque utilisateur possède un dossier personnel, et chaque programme lancé travaille depuis un dossier courant. Dans l’atelier, ton script démarre dans un dossier de travail préparé avec les fichiers de l’exercice.

pwd, pour print working directory, affiche le chemin complet du dossier courant. Dans l’atelier, ce chemin change à chaque essai ; c’est pourquoi les exercices ne vérifient pas son affichage, mais tu peux l’utiliser pour t’orienter.

ls liste le contenu d’un dossier. Sans argument, il liste le dossier courant ; avec un argument, il liste le dossier indiqué : ls photos. L’option -1 affiche un élément par ligne, ce qui facilite la lecture et les vérifications. L’ordre est alphabétique ; dans l’atelier, les majuscules passent avant les minuscules, et les noms sont triés caractère par caractère.

Les fichiers dont le nom commence par un point sont cachés : ls ne les montre pas. L’option -a les affiche tous, y compris deux entrées spéciales : . désigne le dossier courant et .. le dossier parent, celui qui le contient. Les fichiers cachés servent souvent à la configuration ; en cybersécurité, c’est aussi un endroit où un programme malveillant peut tenter de se dissimuler, d’où l’habitude de vérifier avec ls -a.

cd, pour change directory, change de dossier courant. cd photos entre dans le dossier photos ; cd .. remonte d’un niveau. Ces chemins sont relatifs : ils partent du dossier courant. Un chemin absolu commence par / et part de la racine, quel que soit l’endroit où l’on se trouve. On peut enchaîner plusieurs niveaux avec / : cd documents/2026 entre dans documents puis dans 2026, et ../.. remonte de deux niveaux.

Le déplacement dure jusqu’à la fin du script. Après cd photos, toutes les commandes suivantes travaillent dans photos, jusqu’au prochain cd. Une erreur fréquente est d’oublier où l’on se trouve : ls affiche alors un contenu inattendu. Si un cd échoue, par exemple parce que le dossier n’existe pas, Bash affiche No such file or directory et reste dans le dossier précédent.

Un nom de fichier ne devrait contenir ni espace ni accent : rapport_janvier.txt se manipule plus facilement que Rapport Janvier.txt. Si un nom contient un espace, il faut le mettre entre guillemets dans chaque commande.

La touche Tab complète les noms dans un vrai terminal, ce qui évite les fautes de frappe ; dans l’atelier, tu écris tes commandes dans l’éditeur, mais garde cette astuce pour ton propre ordinateur.

## Exemple guidé 1

Fichier de départ `membres.txt` :

    Afi
    Kossi
    Yawa

Fichier de départ `agenda.txt` :

    mardi : lecture
    jeudi : jardin

Fichier de départ `photos/` :

    

Fichier de départ `.secret` :

    code fictif

```bash
ls -1
echo "=="
ls -a
```

Affichage attendu :

    agenda.txt
    membres.txt
    photos
    ==
    .
    ..
    .secret
    agenda.txt
    membres.txt
    photos

Trace :

- ls -1 liste un élément par ligne, sans les fichiers cachés.
- La ligne == sépare les deux affichages.
- ls -a montre aussi ., .. et le fichier caché .secret.
- Sans -1, ls a pourtant affiché un élément par ligne : c’est son comportement quand la sortie n’est pas un écran.

## Exemple guidé 2

Fichier de départ `documents/2026/janvier.txt` :

    j

Fichier de départ `documents/2026/mars.txt` :

    m

Fichier de départ `notes.txt` :

    n

```bash
cd documents/2026
ls -1
cd ../..
ls -1
```

Affichage attendu :

    janvier.txt
    mars.txt
    documents
    notes.txt

Trace :

- cd entre dans documents puis dans 2026.
- ls -1 liste les deux fichiers de 2026.
- cd ../.. remonte de deux niveaux, au dossier de départ.
- ls -1 liste à nouveau le dossier de départ.

## Vérifier et expliquer

Avant chaque cd, prédis le contenu que ls affichera ensuite. Ajoute ls -a pour vérifier qu’aucun fichier caché ne t’échappe.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [GNU Coreutils — ls](https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html)
- [Bash — cd et commandes internes](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html)
