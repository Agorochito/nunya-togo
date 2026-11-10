---
{
  "id": "term-m4-02",
  "title_fr": "Protéger ses fichiers avec les droits",
  "course": "bash-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "term-m4-01"
  ],
  "outcomes": [
    "Lire les droits d’un fichier (rwx pour propriétaire, groupe, autres).",
    "Modifier les droits avec chmod en notation symbolique et en nombres, en appliquant le moindre privilège."
  ],
  "idea_fr": "Linux décide qui peut lire, modifier ou exécuter chaque fichier ; bien régler ces droits est une première mesure de sécurité.",
  "analogy_fr": "Les clés d’une boutique : le propriétaire a toutes les clés, l’employé ouvre seulement la réserve, le client n’entre que dans le magasin.",
  "examples": [
    {
      "code": "stat -c '%A %n' rapport.txt cle.txt\nchmod 600 cle.txt\nchmod u+x sauvegarde.sh\nstat -c '%A %n' cle.txt sauvegarde.sh",
      "expected_output": "-rw-r-\u002dr-\u002d rapport.txt\n-rw-r-\u002dr-\u002d cle.txt\n-rw-\u002d-\u002d-\u002d- cle.txt\n-rwxr-\u002dr-\u002d sauvegarde.sh",
      "inputs": [],
      "trace_fr": [
        "Au départ, les fichiers sont en 644 : lisibles par tous.",
        "chmod 600 rend cle.txt privé.",
        "u+x ajoute l’exécution au propriétaire seulement.",
        "stat affiche les nouveaux droits."
      ],
      "files": {
        "rapport.txt": "r\n",
        "cle.txt": "k\n",
        "sauvegarde.sh": "echo ok\n"
      }
    },
    {
      "code": "chmod 755 outil.sh\n./outil.sh\nchmod o+w partage.txt\nfind . -type f -perm -o=w",
      "expected_output": "Outil lancé\n./partage.txt",
      "inputs": [],
      "trace_fr": [
        "755 donne rwx au propriétaire et r-x aux autres.",
        "Avec le droit x, ./outil.sh se lance directement.",
        "o+w rend partage.txt modifiable par tous : une mauvaise idée.",
        "find -perm -o=w repère ce fichier trop ouvert."
      ],
      "files": {
        "outil.sh": "echo \"Outil lancé\"\n",
        "partage.txt": "p\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Donner 777 pour « régler » un problème",
      "why_fr": "Tout le monde peut alors modifier et exécuter le fichier.",
      "fix_fr": "Donne seulement le droit nécessaire."
    },
    {
      "error": "Lancer un script sans le droit x",
      "why_fr": "Le terminal répond Permission denied.",
      "fix_fr": "chmod u+x script.sh, puis ./script.sh."
    },
    {
      "error": "Laisser un fichier secret en 644",
      "why_fr": "Tous les utilisateurs peuvent le lire.",
      "fix_fr": "Passe-le en 600."
    }
  ],
  "quiz": [
    {
      "question": "Que signifie -rw-r-\u002d-\u002d-  ?",
      "options": [
        "Tout le monde lit.",
        "Le propriétaire lit et écrit, le groupe lit, les autres rien.",
        "Le fichier est exécutable.",
        "C’est un dossier."
      ],
      "answer": 1,
      "explanation": "rw- / r-\u002d / -\u002d- pour propriétaire, groupe, autres.",
      "id": "term-m4-02-q1"
    },
    {
      "question": "Quel nombre donne rwxr-xr-x ?",
      "options": [
        "644",
        "755",
        "600",
        "777"
      ],
      "answer": 1,
      "explanation": "7 = rwx, 5 = r-x.",
      "id": "term-m4-02-q2"
    },
    {
      "question": "Que dit le principe du moindre privilège ?",
      "options": [
        "Donner tous les droits pour éviter les blocages.",
        "Donner seulement les droits nécessaires.",
        "Retirer tous les droits.",
        "Partager les mots de passe."
      ],
      "answer": 1,
      "explanation": "Chaque droit inutile est une ouverture de plus.",
      "id": "term-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "droits",
      "definition": "Autorisations r, w et x d’un fichier pour propriétaire, groupe et autres."
    },
    {
      "term": "chmod",
      "definition": "Commande qui modifie les droits d’un fichier."
    },
    {
      "term": "notation octale",
      "definition": "Droits écrits en chiffres, comme 644 ou 755."
    },
    {
      "term": "moindre privilège",
      "definition": "Principe qui accorde seulement les droits nécessaires."
    }
  ],
  "recap_fr": [
    "Lire les droits d’un fichier (rwx pour propriétaire, groupe, autres).",
    "Modifier les droits avec chmod en notation symbolique et en nombres, en appliquant le moindre privilège.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "droits",
    "chmod",
    "notation octale",
    "moindre privilège"
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
      "title": "GNU Coreutils — chmod",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html"
    },
    {
      "title": "GNU Coreutils — droits des fichiers",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html"
    },
    {
      "title": "GNU Coreutils — stat",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html"
    }
  ],
  "sources": [
    {
      "title": "GNU Coreutils — chmod",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — droits des fichiers",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — stat",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Sous Linux, chaque fichier appartient à un utilisateur et à un groupe, et porte des droits qui disent qui peut faire quoi. Trois droits existent : r pour lire, w pour écrire, c’est-à-dire modifier, et x pour exécuter un programme ou entrer dans un dossier. Ils s’appliquent à trois catégories : le propriétaire, le groupe et tous les autres.

ls -l affiche ces droits au début de chaque ligne, sous la forme -rw-r--r--. Le premier caractère indique le type : - pour un fichier, d pour un dossier. Viennent ensuite trois groupes de trois lettres : rw- pour le propriétaire, r-- pour le groupe, r-- pour les autres. Un tiret signifie que le droit est absent. Ici, seul le propriétaire peut modifier ; tout le monde peut lire. stat -c '%A %n' fichier affiche les mêmes droits sans les autres colonnes de ls -l ; les exercices l’utilisent pour vérifier ton travail.

chmod modifie les droits. La notation symbolique dit à qui on ajoute ou retire quoi : chmod u+x script.sh ajoute l’exécution au propriétaire (u pour user), chmod go-r secret.txt retire la lecture au groupe et aux autres (g pour group, o pour others), chmod a+r ajoute la lecture à tous (a pour all).

La notation en nombres fixe tous les droits d’un coup. Chaque droit vaut un nombre : r = 4, w = 2, x = 1 ; on additionne pour chaque catégorie. 7 signifie rwx, 6 signifie rw-, 5 signifie r-x, 4 signifie r--, 0 aucun droit. chmod 644 donne -rw-r--r--, le réglage courant d’un document ; chmod 755 donne -rwxr-xr-x pour un script que tout le monde peut lancer ; chmod 600 donne -rw------- pour un fichier privé.

Un script doit avoir le droit x pour être lancé directement par son nom : ./sauvegarde.sh. Sans ce droit, le terminal répond Permission denied.

Le principe du moindre privilège guide la sécurité : chacun reçoit seulement les droits dont il a besoin, rien de plus. Un fichier de mots de passe ou de clés doit être en 600 ; un dossier de rapports partagé peut être lisible par le groupe ; aucun fichier ne devrait être modifiable par tous, avec un droit w pour les autres. En cybersécurité, un audit commence souvent par chercher ces fichiers trop ouverts : find . -perm -o=w liste ceux que n’importe qui peut modifier.

Dans l’atelier, tu es le propriétaire de tous les fichiers ; les droits s’appliquent donc à toi. Sur un vrai serveur partagé, ils protègent le travail de chacun.

## Exemple guidé 1

Fichier de départ `rapport.txt` :

    r

Fichier de départ `cle.txt` :

    k

Fichier de départ `sauvegarde.sh` :

    echo ok

```bash
stat -c '%A %n' rapport.txt cle.txt
chmod 600 cle.txt
chmod u+x sauvegarde.sh
stat -c '%A %n' cle.txt sauvegarde.sh
```

Affichage attendu :

    -rw-r--r-- rapport.txt
    -rw-r--r-- cle.txt
    -rw------- cle.txt
    -rwxr--r-- sauvegarde.sh

Trace :

- Au départ, les fichiers sont en 644 : lisibles par tous.
- chmod 600 rend cle.txt privé.
- u+x ajoute l’exécution au propriétaire seulement.
- stat affiche les nouveaux droits.

## Exemple guidé 2

Fichier de départ `outil.sh` :

    echo "Outil lancé"

Fichier de départ `partage.txt` :

    p

```bash
chmod 755 outil.sh
./outil.sh
chmod o+w partage.txt
find . -type f -perm -o=w
```

Affichage attendu :

    Outil lancé
    ./partage.txt

Trace :

- 755 donne rwx au propriétaire et r-x aux autres.
- Avec le droit x, ./outil.sh se lance directement.
- o+w rend partage.txt modifiable par tous : une mauvaise idée.
- find -perm -o=w repère ce fichier trop ouvert.

## Vérifier et expliquer

Avant chaque chmod, écris les droits attendus avec rwx, puis vérifie avec stat -c '%A %n'.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [GNU Coreutils — chmod](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)
- [GNU Coreutils — droits des fichiers](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)
- [GNU Coreutils — stat](https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html)
