---
{
  "id": "term-m2-02",
  "title_fr": "Chercher dans des fichiers avec grep",
  "course": "bash-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "term-m2-01"
  ],
  "outcomes": [
    "Afficher les lignes qui contiennent un motif avec grep.",
    "Utiliser les options -i, -c, -v et -n, et chercher dans plusieurs fichiers."
  ],
  "idea_fr": "grep filtre un texte : il ne garde que les lignes qui contiennent le motif cherché.",
  "analogy_fr": "Dans la liste d’appel, chercher tous les élèves de la classe B : on parcourt les lignes et on ne garde que celles qui portent « B ».",
  "examples": [
    {
      "code": "grep ECHEC journal.log\necho \"==\"\ngrep -c ECHEC journal.log\ngrep -c -i echec journal.log",
      "expected_output": "ECHEC kossi 10.0.0.9\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nECHEC root 10.0.0.12\n==\n4\n4",
      "inputs": [],
      "trace_fr": [
        "grep affiche les quatre lignes contenant ECHEC.",
        "-c affiche seulement leur nombre.",
        "Sans -i, echec en minuscules ne trouverait rien.",
        "Avec -i, la casse est ignorée : 4 aussi."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    },
    {
      "code": "grep -n admin journal.log\necho \"==\"\ngrep -v \"^ECHEC\" journal.log",
      "expected_output": "4:ECHEC admin 10.0.0.9\n5:ECHEC admin 10.0.0.9\n==\nOK afi 10.0.0.5\nOK yawa 10.0.0.7\nOK kossi 10.0.0.5",
      "inputs": [],
      "trace_fr": [
        "-n ajoute le numéro de chaque ligne trouvée.",
        "admin apparaît aux lignes 4 et 5.",
        "^ECHEC désigne les lignes qui commencent par ECHEC.",
        "-v garde toutes les autres : les connexions réussies."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Inverser motif et fichier",
      "why_fr": "grep lit le premier argument comme motif.",
      "fix_fr": "Écris grep motif fichier."
    },
    {
      "error": "Oublier la casse",
      "why_fr": "grep distingue les majuscules.",
      "fix_fr": "Ajoute -i si la casse ne compte pas."
    },
    {
      "error": "Laisser un motif sans guillemets",
      "why_fr": "Bash peut interpréter certains caractères avant grep.",
      "fix_fr": "Mets le motif entre guillemets."
    }
  ],
  "quiz": [
    {
      "question": "Que fait grep -c OK journal.log ?",
      "options": [
        "Affiche les lignes avec OK.",
        "Affiche le nombre de lignes avec OK.",
        "Supprime les lignes OK.",
        "Copie le journal."
      ],
      "answer": 1,
      "explanation": "-c compte les lignes trouvées.",
      "id": "term-m2-02-q1"
    },
    {
      "question": "Quelle option garde les lignes qui ne contiennent pas le motif ?",
      "options": [
        "-i",
        "-n",
        "-v",
        "-c"
      ],
      "answer": 2,
      "explanation": "-v inverse le filtre.",
      "id": "term-m2-02-q2"
    },
    {
      "question": "Que cherche grep \"^root\" ?",
      "options": [
        "Les lignes qui finissent par root.",
        "Les lignes qui commencent par root.",
        "Toutes les lignes sauf root.",
        "Le fichier root."
      ],
      "answer": 1,
      "explanation": "^ désigne le début de la ligne.",
      "id": "term-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "grep",
      "definition": "Commande qui affiche les lignes contenant un motif."
    },
    {
      "term": "motif",
      "definition": "Texte ou expression régulière que grep recherche."
    },
    {
      "term": "expression régulière",
      "definition": "Petit langage de recherche avec des symboles comme ^ et $."
    },
    {
      "term": "code de sortie",
      "definition": "Nombre renvoyé par une commande : 0 signifie le succès."
    }
  ],
  "recap_fr": [
    "Afficher les lignes qui contiennent un motif avec grep.",
    "Utiliser les options -i, -c, -v et -n, et chercher dans plusieurs fichiers.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "grep",
    "motif",
    "expression régulière",
    "code de sortie"
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
      "title": "Manuel GNU grep",
      "url": "https://www.gnu.org/software/grep/manual/grep.html"
    },
    {
      "title": "GNU grep — utilisation",
      "url": "https://www.gnu.org/software/grep/manual/html_node/Usage.html"
    }
  ],
  "sources": [
    {
      "title": "Manuel GNU grep",
      "url": "https://www.gnu.org/software/grep/manual/grep.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU grep — utilisation",
      "url": "https://www.gnu.org/software/grep/manual/html_node/Usage.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

grep est l’une des commandes les plus utilisées sous Linux. Elle parcourt un fichier ligne par ligne et affiche seulement les lignes qui contiennent un motif. grep ECHEC journal.log affiche toutes les lignes du journal où apparaît le mot ECHEC. Le motif vient en premier, puis le ou les fichiers.

La recherche distingue les majuscules : grep echec ne trouve pas ECHEC. L’option -i ignore la différence. Elle est précieuse quand un même mot peut être écrit de plusieurs façons.

Plusieurs options transforment le résultat. -c affiche seulement le nombre de lignes trouvées, au lieu des lignes elles-mêmes : grep -c ECHEC journal.log répond 4. -v inverse le filtre : il garde les lignes qui ne contiennent pas le motif. -n ajoute le numéro de chaque ligne trouvée, utile pour retrouver un événement dans un long fichier. Les options se combinent : grep -in admin journal.log.

Le motif est en réalité une expression régulière, un petit langage de recherche. Deux symboles suffisent pour commencer : ^ désigne le début de la ligne et $ sa fin. grep "^ECHEC" ne garde que les lignes qui commencent par ECHEC, et grep "\.9$" celles qui finissent par .9. Le point seul signifie « n’importe quel caractère » : pour chercher un vrai point, on écrit \. . Mets toujours le motif entre guillemets pour que Bash ne l’interprète pas.

Avec plusieurs fichiers, grep précède chaque ligne trouvée du nom de son fichier : grep -i lecture *.txt indique dans quel fichier se trouve chaque résultat. L’étoile *.txt désigne tous les fichiers dont le nom finit par .txt ; Bash remplace ce motif par la liste des noms correspondants avant de lancer la commande.

grep renvoie un code de sortie : 0 s’il a trouvé au moins une ligne, 1 sinon. Ce code n’affiche rien, mais il permet de prendre des décisions dans un script, comme tu le verras avec les conditions.

En cybersécurité, grep est l’outil de premier tri : chercher toutes les tentatives de connexion échouées, toutes les lignes qui mentionnent une adresse IP suspecte, tous les accès à une page sensible. Un analyste combine ensuite grep avec d’autres commandes pour compter, trier et résumer. C’est le sujet du chapitre suivant.

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
grep ECHEC journal.log
echo "=="
grep -c ECHEC journal.log
grep -c -i echec journal.log
```

Affichage attendu :

    ECHEC kossi 10.0.0.9
    ECHEC admin 10.0.0.9
    ECHEC admin 10.0.0.9
    ECHEC root 10.0.0.12
    ==
    4
    4

Trace :

- grep affiche les quatre lignes contenant ECHEC.
- -c affiche seulement leur nombre.
- Sans -i, echec en minuscules ne trouverait rien.
- Avec -i, la casse est ignorée : 4 aussi.

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
grep -n admin journal.log
echo "=="
grep -v "^ECHEC" journal.log
```

Affichage attendu :

    4:ECHEC admin 10.0.0.9
    5:ECHEC admin 10.0.0.9
    ==
    OK afi 10.0.0.5
    OK yawa 10.0.0.7
    OK kossi 10.0.0.5

Trace :

- -n ajoute le numéro de chaque ligne trouvée.
- admin apparaît aux lignes 4 et 5.
- ^ECHEC désigne les lignes qui commencent par ECHEC.
- -v garde toutes les autres : les connexions réussies.

## Vérifier et expliquer

Pour chaque recherche, prédis d’abord le nombre de lignes trouvées, puis vérifie avec -c.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Manuel GNU grep](https://www.gnu.org/software/grep/manual/grep.html)
- [GNU grep — utilisation](https://www.gnu.org/software/grep/manual/html_node/Usage.html)
