---
{
  "id": "term-m3-01",
  "title_fr": "Rediriger les entrées et les sorties",
  "course": "bash-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "term-m2-03"
  ],
  "outcomes": [
    "Écrire le résultat d’une commande dans un fichier avec > et >>.",
    "Lire un fichier avec <, et séparer les erreurs avec 2> /dev/null."
  ],
  "idea_fr": "Par défaut, une commande lit le clavier et écrit à l’écran ; les redirections branchent ces flux sur des fichiers.",
  "analogy_fr": "Un robinet coule dans l’évier ; un tuyau permet de diriger l’eau vers un seau. Les redirections sont ces tuyaux.",
  "examples": [
    {
      "code": "echo \"Rapport du jour\" > rapport.txt\ngrep -c ECHEC journal.log >> rapport.txt\ngrep ECHEC journal.log | cut -d \" \" -f 3 | sort -u >> rapport.txt\ncat rapport.txt",
      "expected_output": "Rapport du jour\n4\n10.0.0.12\n10.0.0.9",
      "inputs": [],
      "trace_fr": [
        "> crée rapport.txt avec un titre.",
        ">> ajoute le nombre d’échecs.",
        "sort -u trie et retire les doublons ; >> ajoute les adresses.",
        "cat relit le rapport construit."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    },
    {
      "code": "ls absent.txt 2> /dev/null\necho \"Code de sortie : $?\"\nls journal.log",
      "expected_output": "Code de sortie : 2\njournal.log",
      "inputs": [],
      "trace_fr": [
        "ls échoue, mais son message d’erreur part dans /dev/null.",
        "$? contient le code de sortie de la dernière commande : 2, une erreur.",
        "La seconde commande ls réussit.",
        "Rien n’indique l’erreur à l’écran : seul le code la révèle."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser > au lieu de >>",
      "why_fr": "> remplace tout le contenu du fichier.",
      "fix_fr": "Utilise >> pour ajouter à la fin."
    },
    {
      "error": "Rediriger vers le fichier qu’on lit",
      "why_fr": "Bash vide le fichier avant que la commande le lise.",
      "fix_fr": "Écris dans un fichier temporaire, ou utilise sort -o."
    },
    {
      "error": "Faire taire toutes les erreurs",
      "why_fr": "Les vrais problèmes deviennent invisibles.",
      "fix_fr": "Réserve 2> /dev/null aux erreurs attendues et comprises."
    }
  ],
  "quiz": [
    {
      "question": "Que contient liste.txt après echo A > liste.txt puis echo B > liste.txt ?",
      "options": [
        "A puis B",
        "B seulement",
        "A seulement",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Le second > remplace le contenu.",
      "id": "term-m3-01-q1"
    },
    {
      "question": "À quoi sert 2> /dev/null ?",
      "options": [
        "À supprimer un fichier.",
        "À faire disparaître les messages d’erreur.",
        "À doubler l’affichage.",
        "À lire un fichier."
      ],
      "answer": 1,
      "explanation": "/dev/null avale ce qu’on y écrit.",
      "id": "term-m3-01-q2"
    },
    {
      "question": "Pourquoi sort notes.txt > notes.txt est-il dangereux ?",
      "options": [
        "Il trie deux fois.",
        "Le fichier est vidé avant d’être lu.",
        "Il ajoute des doublons.",
        "Il est interdit."
      ],
      "answer": 1,
      "explanation": "La redirection est préparée avant l’exécution de sort.",
      "id": "term-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "sortie standard",
      "definition": "Flux où une commande écrit ses résultats."
    },
    {
      "term": "sortie d’erreur",
      "definition": "Flux numéro 2, où une commande écrit ses messages d’erreur."
    },
    {
      "term": "redirection",
      "definition": "Branchement d’un flux sur un fichier avec >, >> ou <."
    },
    {
      "term": "/dev/null",
      "definition": "Fichier spécial qui avale tout ce qu’on y écrit."
    }
  ],
  "recap_fr": [
    "Écrire le résultat d’une commande dans un fichier avec > et >>.",
    "Lire un fichier avec <, et séparer les erreurs avec 2> /dev/null.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "sortie standard",
    "sortie d’erreur",
    "redirection",
    "/dev/null"
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
      "title": "Bash — redirections",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Redirections.html"
    },
    {
      "title": "Bash — paramètres spéciaux ($?)",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html"
    }
  ],
  "sources": [
    {
      "title": "Bash — redirections",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Redirections.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — paramètres spéciaux ($?)",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Chaque commande dispose de trois flux. L’entrée standard, d’où elle lit ; la sortie standard, où elle écrit ses résultats ; et la sortie d’erreur, où elle écrit ses messages d’erreur. Dans un terminal, l’entrée est le clavier, et les deux sorties s’affichent à l’écran. Les redirections branchent ces flux sur des fichiers.

> envoie la sortie standard dans un fichier : ls -1 > liste.txt écrit la liste dans liste.txt au lieu de l’afficher. Si le fichier n’existe pas, il est créé ; s’il existe, il est entièrement remplacé. Cette perte est silencieuse : une redirection > sur le mauvais fichier efface son contenu sans prévenir.

>> ajoute à la fin du fichier au lieu de le remplacer : echo "nouvelle ligne" >> journal.txt. C’est la redirection naturelle pour un journal ou un rapport qui se construit étape par étape. On commence souvent un rapport par > pour repartir d’un fichier vide, puis on ajoute les lignes suivantes avec >>.

< branche l’entrée standard sur un fichier : wc -l < ventes.txt lit le fichier comme si on le tapait au clavier. Tu l’as déjà utilisé pour obtenir un nombre sans nom de fichier.

La sortie d’erreur porte le numéro 2. 2> erreurs.txt envoie les messages d’erreur dans un fichier, et 2> /dev/null les fait disparaître. /dev/null est un fichier spécial qui avale tout ce qu’on y écrit. On l’utilise quand une erreur est attendue et sans intérêt, par exemple chercher un fichier qui peut ne pas exister. À l’inverse, faire taire toutes les erreurs par habitude cache les vrais problèmes : réserve-le aux cas compris.

Les redirections se combinent avec les tubes. grep ECHEC journal.log | cut -d " " -f 3 | sort -u > suspects.txt filtre, extrait, trie sans doublon grâce à sort -u, puis enregistre le résultat. Le fichier peut ensuite être relu, envoyé ou comparé.

Attention à une erreur classique : sort notes.txt > notes.txt vide le fichier. Bash prépare la redirection, et donc vide notes.txt, avant que sort ait commencé à lire. Pour trier un fichier sur place, écris dans un fichier temporaire puis renomme-le avec mv, ou utilise sort -o notes.txt notes.txt, prévu pour ce cas.

En cybersécurité, conserver une trace écrite de chaque étape d’une analyse est essentiel : on redirige les résultats importants vers un fichier de rapport, avec la date et la commande utilisée, pour pouvoir justifier ses conclusions.

## Exemple guidé 1

Fichier de départ `journal.log` :

    OK afi 10.0.0.5
    ECHEC kossi 10.0.0.9
    OK yawa 10.0.0.7
    ECHEC admin 10.0.0.9
    ECHEC admin 10.0.0.9
    OK kossi 10.0.0.5
    ECHEC root 10.0.0.12

```bash
echo "Rapport du jour" > rapport.txt
grep -c ECHEC journal.log >> rapport.txt
grep ECHEC journal.log | cut -d " " -f 3 | sort -u >> rapport.txt
cat rapport.txt
```

Affichage attendu :

    Rapport du jour
    4
    10.0.0.12
    10.0.0.9

Trace :

- > crée rapport.txt avec un titre.
- >> ajoute le nombre d’échecs.
- sort -u trie et retire les doublons ; >> ajoute les adresses.
- cat relit le rapport construit.

## Exemple guidé 2

Fichier de départ `journal.log` :

    OK afi 10.0.0.5
    ECHEC kossi 10.0.0.9
    OK yawa 10.0.0.7
    ECHEC admin 10.0.0.9
    ECHEC admin 10.0.0.9
    OK kossi 10.0.0.5
    ECHEC root 10.0.0.12

```bash
ls absent.txt 2> /dev/null
echo "Code de sortie : $?"
ls journal.log
```

Affichage attendu :

    Code de sortie : 2
    journal.log

Trace :

- ls échoue, mais son message d’erreur part dans /dev/null.
- $? contient le code de sortie de la dernière commande : 2, une erreur.
- La seconde commande ls réussit.
- Rien n’indique l’erreur à l’écran : seul le code la révèle.

## Vérifier et expliquer

Après chaque redirection, relis le fichier avec cat pour vérifier qu’il contient ce que tu attends, ni plus ni moins.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Bash — redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
- [Bash — paramètres spéciaux ($?)](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)
