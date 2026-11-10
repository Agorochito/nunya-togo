---
{
  "id": "term-m3-03",
  "title_fr": "Décider dans un script avec if",
  "course": "bash-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "term-m3-02"
  ],
  "outcomes": [
    "Tester l’existence de fichiers et de dossiers avec [ -f ], [ -d ] et [ -e ].",
    "Comparer des nombres (-eq, -lt, -ge…) et des textes, et utiliser le code de sortie d’une commande."
  ],
  "idea_fr": "if exécute un bloc selon le résultat d’un test ; en Bash, ce résultat est un code de sortie : 0 signifie vrai.",
  "analogy_fr": "Avant de livrer, le livreur vérifie l’adresse : si la maison existe, il dépose le colis ; sinon, il appelle le client.",
  "examples": [
    {
      "code": "if [ -f journal.log ]; then\n  echo \"Journal trouvé\"\nelse\n  echo \"Journal absent\"\nfi\nif grep -q root journal.log; then\n  echo \"Alerte : tentative sur root\"\nfi",
      "expected_output": "Journal trouvé\nAlerte : tentative sur root",
      "inputs": [],
      "trace_fr": [
        "[ -f journal.log ] est vrai : le premier bloc s’exécute.",
        "grep -q cherche root sans rien afficher.",
        "Son code de sortie 0 rend la condition vraie.",
        "Le message d’alerte s’affiche."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    },
    {
      "code": "read -r echecs\nif [ \"$echecs\" -ge 3 ]; then\n  echo \"Bloquer l’adresse\"\nelif [ \"$echecs\" -ge 1 ]; then\n  echo \"Surveiller l’adresse\"\nelse\n  echo \"Rien à signaler\"\nfi",
      "expected_output": "Bloquer l’adresse",
      "inputs": [
        "3"
      ],
      "trace_fr": [
        "read lit 3.",
        "3 -ge 3 est vrai : la borne est incluse.",
        "Le premier bloc s’exécute ; elif et else sont ignorés.",
        "fi ferme la structure."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier les espaces dans [ ]",
      "why_fr": "[-f fichier] est lu comme un nom de commande.",
      "fix_fr": "Écris [ -f fichier ] avec des espaces."
    },
    {
      "error": "Comparer des nombres avec > dans [ ]",
      "why_fr": "> est une redirection : un fichier est créé.",
      "fix_fr": "Utilise -gt, -lt, -ge ou -le."
    },
    {
      "error": "Oublier fi",
      "why_fr": "La structure if reste ouverte.",
      "fix_fr": "Ferme chaque if par fi."
    }
  ],
  "quiz": [
    {
      "question": "Quand if cmd; then … est-il exécuté ?",
      "options": [
        "Quand cmd affiche quelque chose.",
        "Quand le code de sortie de cmd vaut 0.",
        "Quand cmd échoue.",
        "Toujours."
      ],
      "answer": 1,
      "explanation": "En Bash, 0 signifie le succès, donc vrai.",
      "id": "term-m3-03-q1"
    },
    {
      "question": "Quel test vérifie qu’un dossier existe ?",
      "options": [
        "[ -f nom ]",
        "[ -d nom ]",
        "[ -n nom ]",
        "[ nom ]"
      ],
      "answer": 1,
      "explanation": "-d teste un dossier.",
      "id": "term-m3-03-q2"
    },
    {
      "question": "Que teste [ \"$n\" -lt 10 ] ?",
      "options": [
        "n plus grand que 10",
        "n plus petit que 10",
        "n égal à 10",
        "n différent de 10"
      ],
      "answer": 1,
      "explanation": "-lt signifie less than.",
      "id": "term-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "if … fi",
      "definition": "Structure qui exécute un bloc selon une condition."
    },
    {
      "term": "[ ]",
      "definition": "Commande de test, écrite avec des espaces de chaque côté."
    },
    {
      "term": "-eq, -lt, -ge",
      "definition": "Opérateurs de comparaison de nombres dans [ ]."
    },
    {
      "term": "grep -q",
      "definition": "Recherche silencieuse dont seul le code de sortie compte."
    }
  ],
  "recap_fr": [
    "Tester l’existence de fichiers et de dossiers avec [ -f ], [ -d ] et [ -e ].",
    "Comparer des nombres (-eq, -lt, -ge…) et des textes, et utiliser le code de sortie d’une commande.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "if … fi",
    "[ ]",
    "-eq, -lt, -ge",
    "grep -q"
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
      "title": "Bash — if",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html"
    },
    {
      "title": "Bash — expressions conditionnelles",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html"
    }
  ],
  "sources": [
    {
      "title": "Bash — if",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — expressions conditionnelles",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Un script devient prudent quand il vérifie avant d’agir. La structure if teste une condition et exécute un bloc seulement si elle est vraie : if condition; then … fi. else ajoute un bloc pour le cas contraire, et elif une autre condition. Le mot fi, if à l’envers, ferme la structure ; l’oublier provoque l’erreur syntax error: unexpected end of file.

En Bash, une condition est une commande. if regarde son code de sortie : 0 signifie vrai, toute autre valeur signifie faux. C’est l’inverse de beaucoup de langages, mais logique : 0 veut dire « aucune erreur ». if grep -q ECHEC journal.log; then … teste directement si grep trouve le motif ; l’option -q rend grep silencieux.

Pour les autres tests, on utilise la commande [ ], qui s’écrit avec des espaces obligatoires de chaque côté : [ -f notes.txt ] est vrai si notes.txt existe et est un fichier ordinaire. [ -d archives ] teste un dossier, [ -e chemin ] l’existence de n’importe quoi. Sans les espaces, [-f notes.txt] est un nom de commande inconnu.

Les nombres se comparent avec des mots : -eq égal, -ne différent, -lt plus petit, -le plus petit ou égal, -gt plus grand, -ge plus grand ou égal. [ "$age" -ge 18 ] teste si l’âge vaut au moins 18. Les signes < et > ne conviennent pas ici : dans [ ], > est une redirection et créerait un fichier ! Les textes se comparent avec = et != : [ "$reponse" = "oui" ]. Mets toujours les variables entre guillemets dans un test : une variable vide sans guillemets provoquerait une erreur.

! inverse un test : [ ! -d sauvegarde ] est vrai si le dossier n’existe pas. && et || enchaînent deux commandes selon le résultat de la première : mkdir -p sauvegarde && echo "Prêt" n’affiche Prêt que si mkdir a réussi.

Un script robuste vérifie systématiquement ses hypothèses : le fichier à analyser existe-t-il ? Le nombre saisi est-il positif ? Le dossier de destination est-il là ? Chaque vérification transforme une erreur obscure en message clair pour la personne qui lance le script.

Comme pour les autres langages, teste les bornes : si la consigne dit « à partir de 3 échecs », la valeur 3 doit être acceptée, avec -ge et non -gt.

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
if [ -f journal.log ]; then
  echo "Journal trouvé"
else
  echo "Journal absent"
fi
if grep -q root journal.log; then
  echo "Alerte : tentative sur root"
fi
```

Affichage attendu :

    Journal trouvé
    Alerte : tentative sur root

Trace :

- [ -f journal.log ] est vrai : le premier bloc s’exécute.
- grep -q cherche root sans rien afficher.
- Son code de sortie 0 rend la condition vraie.
- Le message d’alerte s’affiche.

## Exemple guidé 2

```bash
read -r echecs
if [ "$echecs" -ge 3 ]; then
  echo "Bloquer l’adresse"
elif [ "$echecs" -ge 1 ]; then
  echo "Surveiller l’adresse"
else
  echo "Rien à signaler"
fi
```

Saisies de l’exemple : 3

Affichage attendu :

    Bloquer l’adresse

Trace :

- read lit 3.
- 3 -ge 3 est vrai : la borne est incluse.
- Le premier bloc s’exécute ; elif et else sont ignorés.
- fi ferme la structure.

## Vérifier et expliquer

Pour chaque test, essaie une valeur juste sous la borne, la borne exacte et une valeur au-dessus ; pour les fichiers, un cas où il existe et un où il manque.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Bash — if](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)
- [Bash — expressions conditionnelles](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)
