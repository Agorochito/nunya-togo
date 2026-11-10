---
{
  "id": "term-m2-01",
  "title_fr": "Lire et mesurer des fichiers",
  "course": "bash-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "term-m1-03"
  ],
  "outcomes": [
    "Afficher un fichier avec cat, son début avec head et sa fin avec tail.",
    "Compter les lignes et les mots avec wc."
  ],
  "idea_fr": "Quelques commandes suffisent à lire un fichier de texte, entier ou en partie, et à le mesurer.",
  "analogy_fr": "Devant un grand registre, on peut tout lire, regarder seulement les premières pages, ou compter les lignes remplies.",
  "examples": [
    {
      "code": "cat membres.txt\necho \"==\"\nhead -n 2 ventes.txt\necho \"==\"\ntail -n 1 ventes.txt",
      "expected_output": "Afi\nKossi\nYawa\n==\nlundi 3000\nmardi 1200\n==\ndimanche 900",
      "inputs": [],
      "trace_fr": [
        "cat affiche les trois membres.",
        "head -n 2 affiche les deux premières ventes.",
        "tail -n 1 affiche la dernière ligne.",
        "Les lignes == séparent les affichages."
      ],
      "files": {
        "ventes.txt": "lundi 3000\nmardi 1200\nmercredi 4500\njeudi 2500\nvendredi 3800\nsamedi 6200\ndimanche 900\n",
        "membres.txt": "Afi\nKossi\nYawa\n"
      }
    },
    {
      "code": "wc -l ventes.txt\nwc -l < ventes.txt\nwc -w < membres.txt",
      "expected_output": "7 ventes.txt\n7\n3",
      "inputs": [],
      "trace_fr": [
        "wc -l affiche le nombre de lignes et le nom du fichier.",
        "Avec <, wc ne connaît pas le nom : il affiche seulement 7.",
        "wc -w compte les mots : un prénom par ligne, donc 3.",
        "Aucun fichier n’est modifié."
      ],
      "files": {
        "ventes.txt": "lundi 3000\nmardi 1200\nmercredi 4500\njeudi 2500\nvendredi 3800\nsamedi 6200\ndimanche 900\n",
        "membres.txt": "Afi\nKossi\nYawa\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Afficher un énorme fichier avec cat",
      "why_fr": "L’affichage défile sans fin.",
      "fix_fr": "Commence par head ou tail."
    },
    {
      "error": "Lire wc -l fichier comme un nombre seul",
      "why_fr": "Le nom du fichier suit le nombre.",
      "fix_fr": "Écris wc -l < fichier pour obtenir seulement le nombre."
    },
    {
      "error": "Oublier -n avec head ou tail",
      "why_fr": "Le nombre de lignes par défaut est 10.",
      "fix_fr": "Précise -n suivi du nombre voulu."
    }
  ],
  "quiz": [
    {
      "question": "Quelle commande montre les 5 dernières lignes de journal.log ?",
      "options": [
        "head -n 5 journal.log",
        "tail -n 5 journal.log",
        "cat -5 journal.log",
        "wc -l journal.log"
      ],
      "answer": 1,
      "explanation": "tail lit la fin du fichier.",
      "id": "term-m2-01-q1"
    },
    {
      "question": "Qu’affiche wc -l < notes.txt si le fichier a 4 lignes ?",
      "options": [
        "4 notes.txt",
        "notes.txt 4",
        "4",
        "Rien"
      ],
      "answer": 2,
      "explanation": "Avec <, wc affiche seulement le nombre.",
      "id": "term-m2-01-q2"
    },
    {
      "question": "Pourquoi tail est-il utile pour un journal ?",
      "options": [
        "Il supprime les vieilles lignes.",
        "Les événements récents sont à la fin du fichier.",
        "Il trie les lignes.",
        "Il chiffre le fichier."
      ],
      "answer": 1,
      "explanation": "Un journal ajoute ses lignes à la fin.",
      "id": "term-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "cat",
      "definition": "Commande qui affiche le contenu complet d’un ou plusieurs fichiers."
    },
    {
      "term": "head et tail",
      "definition": "Commandes qui affichent le début ou la fin d’un fichier."
    },
    {
      "term": "wc",
      "definition": "Commande qui compte lignes, mots ou octets."
    },
    {
      "term": "journal",
      "definition": "Fichier où un programme écrit ses événements, ligne par ligne."
    }
  ],
  "recap_fr": [
    "Afficher un fichier avec cat, son début avec head et sa fin avec tail.",
    "Compter les lignes et les mots avec wc.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "cat",
    "head et tail",
    "wc",
    "journal"
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
      "title": "GNU Coreutils — head",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html"
    },
    {
      "title": "GNU Coreutils — tail",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html"
    },
    {
      "title": "GNU Coreutils — wc",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html"
    }
  ],
  "sources": [
    {
      "title": "GNU Coreutils — head",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — tail",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — wc",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Sous Linux, beaucoup d’informations sont rangées dans des fichiers de texte : configurations, listes, journaux d’activité, données exportées. Savoir les lire rapidement au terminal est une compétence de base pour les développeurs comme pour les analystes en sécurité, qui examinent chaque jour des journaux de plusieurs milliers de lignes.

cat affiche le contenu complet d’un fichier : cat membres.txt. Avec plusieurs fichiers, il les affiche à la suite : cat janvier.txt fevrier.txt. Son nom vient de concatenate, « mettre bout à bout ». Pour un petit fichier, c’est le moyen le plus simple de le lire ; pour un fichier de dix mille lignes, l’affichage défilerait sans fin.

head affiche le début d’un fichier, par défaut les dix premières lignes. L’option -n choisit le nombre : head -n 3 ventes.txt affiche les trois premières lignes. tail fait de même avec la fin : tail -n 2 ventes.txt affiche les deux dernières. Les journaux ajoutent leurs nouvelles lignes à la fin : tail est donc l’outil naturel pour voir les événements les plus récents. Dans un vrai terminal, tail -f suit même un fichier en direct, au fur et à mesure qu’il grandit.

wc, pour word count, mesure un fichier. wc -l compte les lignes, wc -w les mots, wc -c les octets. wc -l ventes.txt affiche le nombre suivi du nom du fichier. Pour obtenir seulement le nombre, on lui donne le fichier par redirection : wc -l < ventes.txt. Cette écriture, que tu approfondiras au module 3, fait lire le fichier par la commande sans qu’elle connaisse son nom.

Attention : wc -l compte en réalité les caractères de fin de ligne. Un fichier dont la dernière ligne ne se termine pas par un retour à la ligne paraît avoir une ligne de moins. Les fichiers de l’atelier se terminent toujours par un retour à la ligne, mais garde ce détail en tête sur de vrais fichiers.

Pour lire un extrait au milieu d’un fichier, on combine head et tail : les lignes 3 à 5 sont les trois dernières des cinq premières. Ce type de combinaison sera beaucoup plus simple avec les tubes, vus au chapitre 6.

Ces commandes ne modifient jamais le fichier qu’elles lisent. Tu peux donc les utiliser sans crainte pour explorer un dossier inconnu : c’est souvent la première étape d’une investigation, avant toute action.

## Exemple guidé 1

Fichier de départ `ventes.txt` :

    lundi 3000
    mardi 1200
    mercredi 4500
    jeudi 2500
    vendredi 3800
    samedi 6200
    dimanche 900

Fichier de départ `membres.txt` :

    Afi
    Kossi
    Yawa

```bash
cat membres.txt
echo "=="
head -n 2 ventes.txt
echo "=="
tail -n 1 ventes.txt
```

Affichage attendu :

    Afi
    Kossi
    Yawa
    ==
    lundi 3000
    mardi 1200
    ==
    dimanche 900

Trace :

- cat affiche les trois membres.
- head -n 2 affiche les deux premières ventes.
- tail -n 1 affiche la dernière ligne.
- Les lignes == séparent les affichages.

## Exemple guidé 2

Fichier de départ `ventes.txt` :

    lundi 3000
    mardi 1200
    mercredi 4500
    jeudi 2500
    vendredi 3800
    samedi 6200
    dimanche 900

Fichier de départ `membres.txt` :

    Afi
    Kossi
    Yawa

```bash
wc -l ventes.txt
wc -l < ventes.txt
wc -w < membres.txt
```

Affichage attendu :

    7 ventes.txt
    7
    3

Trace :

- wc -l affiche le nombre de lignes et le nom du fichier.
- Avec <, wc ne connaît pas le nom : il affiche seulement 7.
- wc -w compte les mots : un prénom par ligne, donc 3.
- Aucun fichier n’est modifié.

## Vérifier et expliquer

Avant de lancer chaque commande, prédis le nombre de lignes affichées. Ouvre la liste des fichiers de départ pour vérifier.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [GNU Coreutils — head](https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html)
- [GNU Coreutils — tail](https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html)
- [GNU Coreutils — wc](https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html)
