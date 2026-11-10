---
{
  "id": "term-m1-03",
  "title_fr": "Créer, copier, déplacer et supprimer",
  "course": "bash-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "term-m1-02"
  ],
  "outcomes": [
    "Créer des dossiers et des fichiers avec mkdir -p et touch.",
    "Copier, renommer et supprimer avec cp, mv et rm, en mesurant le risque de rm."
  ],
  "idea_fr": "Quelques commandes suffisent à organiser des fichiers ; rm supprime définitivement, sans corbeille.",
  "analogy_fr": "Ranger un bureau : créer des chemises, y glisser des copies, déplacer des feuilles. Mais au terminal, jeter un papier le détruit aussitôt.",
  "examples": [
    {
      "code": "mkdir -p rapports/2026\ntouch rapports/2026/janvier.txt rapports/2026/fevrier.txt\ncp notes.txt rapports/\nfind . | sort",
      "expected_output": ".\n./notes.txt\n./rapports\n./rapports/2026\n./rapports/2026/fevrier.txt\n./rapports/2026/janvier.txt\n./rapports/notes.txt",
      "inputs": [],
      "trace_fr": [
        "mkdir -p crée rapports et 2026 d’un coup.",
        "touch crée deux fichiers vides.",
        "cp copie notes.txt dans rapports, sous le même nom.",
        "find . | sort affiche l’arbre trié : l’original reste en place."
      ],
      "files": {
        "notes.txt": "notes\n"
      }
    },
    {
      "code": "mv brouillon.txt final.txt\nmkdir archives\nmv final.txt archives/\nrm vieux.txt\nfind . | sort",
      "expected_output": ".\n./archives\n./archives/final.txt",
      "inputs": [],
      "trace_fr": [
        "mv renomme brouillon.txt en final.txt.",
        "mkdir crée le dossier archives.",
        "mv déplace final.txt dans archives.",
        "rm supprime vieux.txt définitivement."
      ],
      "files": {
        "brouillon.txt": "b\n",
        "vieux.txt": "v\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier -p avec mkdir",
      "why_fr": "mkdir refuse de créer plusieurs niveaux d’un coup.",
      "fix_fr": "Écris mkdir -p chemin/complet."
    },
    {
      "error": "Copier un dossier sans -r",
      "why_fr": "cp refuse de copier un dossier.",
      "fix_fr": "Utilise cp -r pour un dossier."
    },
    {
      "error": "Lancer rm sans relire",
      "why_fr": "La suppression est définitive, sans corbeille.",
      "fix_fr": "Relis la commande et vérifie avec find avant de supprimer."
    }
  ],
  "quiz": [
    {
      "question": "Que fait mv notes.txt notes_2026.txt ?",
      "options": [
        "Copie le fichier.",
        "Renomme le fichier.",
        "Supprime notes.txt.",
        "Crée un dossier."
      ],
      "answer": 1,
      "explanation": "mv change le chemin du fichier : ici, son nom.",
      "id": "term-m1-03-q1"
    },
    {
      "question": "Que se passe-t-il après rm rapport.txt ?",
      "options": [
        "Le fichier part dans la corbeille.",
        "Le fichier est supprimé définitivement.",
        "Le fichier est vidé mais conservé.",
        "Rien sans confirmation."
      ],
      "answer": 1,
      "explanation": "rm ne passe pas par une corbeille.",
      "id": "term-m1-03-q2"
    },
    {
      "question": "Quelle commande crée a/b/c d’un coup ?",
      "options": [
        "mkdir a/b/c",
        "touch a/b/c",
        "mkdir -p a/b/c",
        "cp -r a/b/c"
      ],
      "answer": 2,
      "explanation": "-p crée les dossiers parents manquants.",
      "id": "term-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "mkdir",
      "definition": "Commande qui crée un dossier ; -p crée aussi les parents."
    },
    {
      "term": "touch",
      "definition": "Commande qui crée un fichier vide ou met à jour sa date."
    },
    {
      "term": "récursif",
      "definition": "Qui s’applique à un dossier et à tout son contenu, comme cp -r ou rm -r."
    },
    {
      "term": "arbre de fichiers",
      "definition": "Organisation des dossiers et fichiers les uns dans les autres."
    }
  ],
  "recap_fr": [
    "Créer des dossiers et des fichiers avec mkdir -p et touch.",
    "Copier, renommer et supprimer avec cp, mv et rm, en mesurant le risque de rm.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "mkdir",
    "touch",
    "récursif",
    "arbre de fichiers"
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
      "title": "GNU Coreutils — mkdir",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html"
    },
    {
      "title": "GNU Coreutils — cp",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html"
    },
    {
      "title": "GNU Coreutils — rm",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html"
    },
    {
      "title": "Manuel GNU findutils",
      "url": "https://www.gnu.org/software/findutils/manual/html_mono/find.html"
    }
  ],
  "sources": [
    {
      "title": "GNU Coreutils — mkdir",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — cp",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — rm",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Manuel GNU findutils",
      "url": "https://www.gnu.org/software/findutils/manual/html_mono/find.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Organiser des fichiers au terminal repose sur cinq commandes courtes. mkdir crée un dossier : mkdir rapports. Pour créer plusieurs niveaux d’un coup, l’option -p crée aussi les dossiers parents manquants : mkdir -p rapports/2026/janvier. Sans -p, mkdir refuse si rapports n’existe pas encore. -p a un second avantage : il ne signale aucune erreur si le dossier existe déjà, ce qui rend un script relançable sans erreur.

touch crée un fichier vide s’il n’existe pas, ou met à jour sa date de modification s’il existe. touch notes.txt suffit pour préparer un fichier. Plusieurs noms peuvent suivre une même commande : touch a.txt b.txt c.txt.

cp copie un fichier : cp source destination. Si la destination est un dossier existant, la copie y est placée sous le même nom : cp notes.txt sauvegarde/. Pour copier un dossier entier avec son contenu, il faut l’option -r, pour récursif : cp -r photos photos_copie. Attention : si un fichier du même nom existe déjà à la destination, cp l’écrase sans prévenir.

mv déplace ou renomme. mv brouillon.txt final.txt renomme le fichier ; mv final.txt archives/ le déplace dans le dossier archives. Renommer et déplacer sont la même opération pour Linux : changer le chemin d’un fichier. Comme cp, mv écrase une destination existante sans demander.

rm supprime un fichier ; rm -r supprime un dossier avec tout son contenu. Il n’y a pas de corbeille : un fichier supprimé est perdu. C’est pourquoi on relit toujours une commande rm avant de la lancer, on évite les motifs trop larges et on n’exécute jamais une commande rm trouvée sur internet sans la comprendre. rmdir, plus prudent, ne supprime qu’un dossier vide.

Pour vérifier le résultat de ces commandes, qui sont silencieuses quand tout va bien, on liste l’arbre des fichiers. find . affiche tous les chemins à partir du dossier courant ; find . | sort les range dans l’ordre alphabétique. Les vérifications des exercices utilisent exactement cette commande après ton script : elles comparent l’arbre obtenu à l’arbre attendu.

Une bonne habitude consiste à organiser avant d’agir : créer d’abord les dossiers de destination, puis copier ou déplacer, puis vérifier, et seulement ensuite supprimer ce qui ne sert plus. Dans une entreprise, ce soin évite de perdre des données ; en cybersécurité, conserver une copie intacte des fichiers d’un incident avant de les toucher est une règle de base.

## Exemple guidé 1

Fichier de départ `notes.txt` :

    notes

```bash
mkdir -p rapports/2026
touch rapports/2026/janvier.txt rapports/2026/fevrier.txt
cp notes.txt rapports/
find . | sort
```

Affichage attendu :

    .
    ./notes.txt
    ./rapports
    ./rapports/2026
    ./rapports/2026/fevrier.txt
    ./rapports/2026/janvier.txt
    ./rapports/notes.txt

Trace :

- mkdir -p crée rapports et 2026 d’un coup.
- touch crée deux fichiers vides.
- cp copie notes.txt dans rapports, sous le même nom.
- find . | sort affiche l’arbre trié : l’original reste en place.

## Exemple guidé 2

Fichier de départ `brouillon.txt` :

    b

Fichier de départ `vieux.txt` :

    v

```bash
mv brouillon.txt final.txt
mkdir archives
mv final.txt archives/
rm vieux.txt
find . | sort
```

Affichage attendu :

    .
    ./archives
    ./archives/final.txt

Trace :

- mv renomme brouillon.txt en final.txt.
- mkdir crée le dossier archives.
- mv déplace final.txt dans archives.
- rm supprime vieux.txt définitivement.

## Vérifier et expliquer

Termine chaque script par find . | sort et compare l’arbre obtenu avec ce que tu voulais construire.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [GNU Coreutils — mkdir](https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html)
- [GNU Coreutils — cp](https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html)
- [GNU Coreutils — rm](https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html)
- [Manuel GNU findutils](https://www.gnu.org/software/findutils/manual/html_mono/find.html)
