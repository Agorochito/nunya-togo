---
{
  "id": "term-m4-03",
  "title_fr": "Projet : analyser un journal de connexions",
  "course": "bash-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "term-m4-02"
  ],
  "outcomes": [
    "Assembler filtres, tubes, variables, conditions et boucles dans un script d’analyse.",
    "Produire un rapport qui signale les adresses suspectes et protéger ce rapport."
  ],
  "idea_fr": "Un analyste transforme un long journal en quelques lignes utiles : combien d’échecs, d’où ils viennent, et quoi faire.",
  "analogy_fr": "Le gardien d’un marché relit le cahier des entrées : il repère qui a essayé plusieurs fois d’entrer sans badge, et prévient le responsable.",
  "examples": [
    {
      "code": "grep ECHEC journal.log | cut -d \" \" -f 3 | sort | uniq -c | sort -rn > comptes.txt\nwhile read -r nombre ip; do\n  if [ \"$nombre\" -ge 3 ]; then\n    echo \"Suspecte : $ip ($nombre échecs)\"\n  fi\ndone < comptes.txt",
      "expected_output": "Suspecte : 10.0.0.9 (3 échecs)",
      "inputs": [],
      "trace_fr": [
        "La chaîne compte les échecs par adresse, classés.",
        "comptes.txt contient une ligne nombre adresse par IP.",
        "read découpe chaque ligne en nombre et ip ; les espaces de uniq -c sont ignorés.",
        "Seule 10.0.0.9 atteint le seuil de 3."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    },
    {
      "code": "echo \"Rapport d’analyse\" > rapport.txt\necho \"Échecs : $(grep -c ECHEC journal.log)\" >> rapport.txt\nchmod 600 rapport.txt\ncat rapport.txt\nstat -c '%A' rapport.txt",
      "expected_output": "Rapport d’analyse\nÉchecs : 4\n-rw-\u002d-\u002d-\u002d-",
      "inputs": [],
      "trace_fr": [
        "Le rapport commence par un titre, écrit avec >.",
        "La mesure s’ajoute avec >>.",
        "chmod 600 réserve la lecture au propriétaire.",
        "stat confirme les droits du rapport."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de trier avant uniq -c",
      "why_fr": "Les adresses non voisines sont comptées séparément.",
      "fix_fr": "Écris sort | uniq -c."
    },
    {
      "error": "Comparer le seuil avec >",
      "why_fr": "Dans [ ], > crée un fichier.",
      "fix_fr": "Utilise -ge."
    },
    {
      "error": "Laisser le rapport lisible par tous",
      "why_fr": "Il contient des informations sensibles.",
      "fix_fr": "chmod 600 rapport.txt."
    }
  ],
  "quiz": [
    {
      "question": "Que signale une même adresse avec de nombreux échecs ?",
      "options": [
        "Un serveur en panne.",
        "Souvent une attaque par force brute.",
        "Une connexion réussie.",
        "Une mise à jour."
      ],
      "answer": 1,
      "explanation": "Elle essaie des mots de passe en série.",
      "id": "term-m4-03-q1"
    },
    {
      "question": "Pourquoi protéger le rapport en 600 ?",
      "options": [
        "Pour le rendre plus rapide.",
        "Il contient des informations sensibles sur l’incident.",
        "Parce que cat l’exige.",
        "Pour pouvoir l’exécuter."
      ],
      "answer": 1,
      "explanation": "Seul l’analyste doit le lire.",
      "id": "term-m4-03-q2"
    },
    {
      "question": "Dans while read -r nombre ip, que contient nombre pour la ligne «       3 10.0.0.9 » ?",
      "options": [
        "      3",
        "3",
        "10.0.0.9",
        "3 10.0.0.9"
      ],
      "answer": 1,
      "explanation": "read ignore les espaces en début de ligne et découpe aux espaces.",
      "id": "term-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "journal de connexions",
      "definition": "Fichier qui enregistre chaque tentative de connexion."
    },
    {
      "term": "force brute",
      "definition": "Attaque qui essaie de nombreux mots de passe à la suite."
    },
    {
      "term": "seuil d’alerte",
      "definition": "Nombre à partir duquel une activité est signalée."
    },
    {
      "term": "rapport d’incident",
      "definition": "Document qui résume les constats d’une analyse."
    }
  ],
  "recap_fr": [
    "Assembler filtres, tubes, variables, conditions et boucles dans un script d’analyse.",
    "Produire un rapport qui signale les adresses suspectes et protéger ce rapport.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "journal de connexions",
    "force brute",
    "seuil d’alerte",
    "rapport d’incident"
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
      "title": "Manuel GNU Bash",
      "url": "https://www.gnu.org/software/bash/manual/bash.html"
    },
    {
      "title": "Manuel GNU grep",
      "url": "https://www.gnu.org/software/grep/manual/grep.html"
    },
    {
      "title": "GNU Coreutils — uniq",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html"
    },
    {
      "title": "GNU Coreutils — chmod",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html"
    }
  ],
  "sources": [
    {
      "title": "Manuel GNU Bash",
      "url": "https://www.gnu.org/software/bash/manual/bash.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Manuel GNU grep",
      "url": "https://www.gnu.org/software/grep/manual/grep.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — uniq",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — chmod",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Ce dernier chapitre réunit tout le cours dans un script que l’on retrouve dans les métiers de l’administration système et de la cybersécurité : l’analyse d’un journal de connexions. Un serveur enregistre chaque tentative de connexion sur une ligne : le résultat, OK ou ECHEC, le compte visé et l’adresse IP d’origine. Quand une même adresse échoue de nombreuses fois, il s’agit souvent d’une attaque qui essaie des mots de passe au hasard, appelée attaque par force brute.

Les journaux de ce projet sont fictifs, mais leur forme est réaliste. Dans un vrai système Linux, ce type d’information se trouve par exemple dans les journaux d’authentification, avec beaucoup plus de détails par ligne. Les mêmes commandes s’y appliquent après une étape d’extraction des colonnes.

Commence par découper le problème. Première question : combien de lignes, combien d’échecs ? grep -c et wc -l y répondent. Deuxième question : quelles adresses échouent, et combien de fois chacune ? C’est la chaîne vue au module 2 : grep, cut, sort, uniq -c, sort -rn. Troisième question : quelles adresses dépassent le seuil d’alerte, par exemple trois échecs ? Une boucle while read lit le résultat de uniq -c, deux nombres par ligne, et un test -ge garde celles qui atteignent le seuil.

Le résultat doit être conservé dans un rapport. On le construit avec > puis >>, comme au module 3, en indiquant les mesures et la liste des adresses à surveiller. Le rapport contient des adresses et des noms de comptes : c’est une information sensible. On le protège donc avec chmod 600, pour que seul l’analyste puisse le lire. Ce dernier geste n’est pas un détail : un rapport d’incident lisible par tous peut aider un attaquant à savoir ce qui a été détecté.

Le script doit aussi rester prudent. Si le journal n’existe pas, il s’arrête avec un message clair au lieu d’afficher des erreurs en cascade. Le seuil peut être lu avec read, pour adapter l’analyse sans modifier le script.

Avance par étapes, en exécutant le script à chaque ajout : d’abord les comptes, puis le classement des adresses, puis la boucle de seuil, enfin le rapport et ses droits. Chaque étape doit fonctionner avant de passer à la suivante.

Ce projet ouvre deux directions. Côté administration système, on apprendrait à planifier ce script chaque nuit et à bloquer automatiquement les adresses suspectes avec un pare-feu. Côté cybersécurité, on étudierait les réseaux, les protocoles et la réponse à incident. Dans les deux cas, le terminal reste l’outil de base que tu maîtrises désormais.

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
grep ECHEC journal.log | cut -d " " -f 3 | sort | uniq -c | sort -rn > comptes.txt
while read -r nombre ip; do
  if [ "$nombre" -ge 3 ]; then
    echo "Suspecte : $ip ($nombre échecs)"
  fi
done < comptes.txt
```

Affichage attendu :

    Suspecte : 10.0.0.9 (3 échecs)

Trace :

- La chaîne compte les échecs par adresse, classés.
- comptes.txt contient une ligne nombre adresse par IP.
- read découpe chaque ligne en nombre et ip ; les espaces de uniq -c sont ignorés.
- Seule 10.0.0.9 atteint le seuil de 3.

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
echo "Rapport d’analyse" > rapport.txt
echo "Échecs : $(grep -c ECHEC journal.log)" >> rapport.txt
chmod 600 rapport.txt
cat rapport.txt
stat -c '%A' rapport.txt
```

Affichage attendu :

    Rapport d’analyse
    Échecs : 4
    -rw-------

Trace :

- Le rapport commence par un titre, écrit avec >.
- La mesure s’ajoute avec >>.
- chmod 600 réserve la lecture au propriétaire.
- stat confirme les droits du rapport.

## Vérifier et expliquer

Exécute le script après chaque étape. Vérifie à la main, sur le journal de départ, le nombre d’échecs de chaque adresse avant de faire confiance au rapport.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Manuel GNU Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [Manuel GNU grep](https://www.gnu.org/software/grep/manual/grep.html)
- [GNU Coreutils — uniq](https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html)
- [GNU Coreutils — chmod](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)
