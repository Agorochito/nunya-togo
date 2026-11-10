---
{
  "id": "term-m2-03",
  "title_fr": "Trier, compter et découper avec les tubes",
  "course": "bash-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "term-m2-02"
  ],
  "outcomes": [
    "Enchaîner des commandes avec le tube |.",
    "Trier avec sort, compter les doublons avec uniq -c et extraire des colonnes avec cut."
  ],
  "idea_fr": "Le tube | envoie la sortie d’une commande à l’entrée de la suivante : chaque commande fait une petite tâche, la chaîne résout le problème.",
  "analogy_fr": "Une chaîne de transformation du manioc : l’un épluche, l’autre râpe, un troisième presse. Chacun reçoit le travail du précédent.",
  "examples": [
    {
      "code": "cut -d \" \" -f 2 ventes.txt | sort -n | tail -n 1\necho \"==\"\nsort -k2 -n -r ventes.txt | head -n 3",
      "expected_output": "6200\n==\nsamedi 6200\nmercredi 4500\nvendredi 3800",
      "inputs": [],
      "trace_fr": [
        "cut garde la deuxième colonne : les montants.",
        "sort -n les trie par valeur ; tail -n 1 garde le plus grand.",
        "sort -k2 -n -r trie les lignes entières sur la colonne 2, en décroissant.",
        "head -n 3 garde les trois meilleures journées."
      ],
      "files": {
        "ventes.txt": "lundi 3000\nmardi 1200\nmercredi 4500\njeudi 2500\nvendredi 3800\nsamedi 6200\ndimanche 900\n"
      }
    },
    {
      "code": "grep ECHEC journal.log | cut -d \" \" -f 3 | sort | uniq -c | sort -rn",
      "expected_output": "      3 10.0.0.9\n      1 10.0.0.12",
      "inputs": [],
      "trace_fr": [
        "grep garde les quatre échecs.",
        "cut extrait la troisième colonne : l’adresse IP.",
        "sort regroupe les adresses identiques ; uniq -c les compte.",
        "sort -rn classe de la plus fréquente à la moins fréquente."
      ],
      "files": {
        "journal.log": "OK afi 10.0.0.5\nECHEC kossi 10.0.0.9\nOK yawa 10.0.0.7\nECHEC admin 10.0.0.9\nECHEC admin 10.0.0.9\nOK kossi 10.0.0.5\nECHEC root 10.0.0.12\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser uniq sans trier",
      "why_fr": "uniq ne fusionne que les lignes voisines.",
      "fix_fr": "Écris toujours sort | uniq."
    },
    {
      "error": "Trier des nombres sans -n",
      "why_fr": "Le tri alphabétique place 10 avant 9.",
      "fix_fr": "Ajoute -n pour un tri numérique."
    },
    {
      "error": "Écrire toute la chaîne d’un coup",
      "why_fr": "Une erreur devient difficile à localiser.",
      "fix_fr": "Ajoute un maillon à la fois et vérifie."
    }
  ],
  "quiz": [
    {
      "question": "Que fait grep OK journal.log | wc -l ?",
      "options": [
        "Supprime les lignes OK.",
        "Compte les lignes qui contiennent OK.",
        "Trie le journal.",
        "Affiche OK."
      ],
      "answer": 1,
      "explanation": "Le tube envoie les lignes trouvées à wc -l.",
      "id": "term-m2-03-q1"
    },
    {
      "question": "Pourquoi écrire sort avant uniq -c ?",
      "options": [
        "Pour aller plus vite.",
        "Parce que uniq ne regroupe que les lignes identiques voisines.",
        "Parce que uniq supprime les nombres.",
        "Ce n’est pas nécessaire."
      ],
      "answer": 1,
      "explanation": "Le tri rend voisines les lignes identiques.",
      "id": "term-m2-03-q2"
    },
    {
      "question": "Que garde cut -d \",\" -f 2 sur la ligne Afi,15,B ?",
      "options": [
        "Afi",
        "15",
        "B",
        "Afi,15"
      ],
      "answer": 1,
      "explanation": "La deuxième colonne séparée par des virgules.",
      "id": "term-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "tube",
      "definition": "Symbole | qui envoie la sortie d’une commande à la suivante."
    },
    {
      "term": "sort",
      "definition": "Commande qui trie des lignes ; -n numérique, -r décroissant, -k colonne."
    },
    {
      "term": "uniq -c",
      "definition": "Commande qui compte les lignes identiques voisines."
    },
    {
      "term": "cut",
      "definition": "Commande qui extrait des colonnes selon un séparateur."
    }
  ],
  "recap_fr": [
    "Enchaîner des commandes avec le tube |.",
    "Trier avec sort, compter les doublons avec uniq -c et extraire des colonnes avec cut.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "tube",
    "sort",
    "uniq -c",
    "cut"
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
      "title": "GNU Coreutils — sort",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html"
    },
    {
      "title": "GNU Coreutils — uniq",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html"
    },
    {
      "title": "GNU Coreutils — cut",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html"
    },
    {
      "title": "Bash — tubes",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Pipelines.html"
    }
  ],
  "sources": [
    {
      "title": "GNU Coreutils — sort",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html",
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
      "title": "GNU Coreutils — cut",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — tubes",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Pipelines.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

La force du terminal vient de la combinaison de petites commandes. Le tube, noté |, relie la sortie d’une commande à l’entrée de la suivante. grep ECHEC journal.log | wc -l envoie les lignes trouvées par grep à wc, qui les compte. Aucune n’a besoin de connaître l’autre : chaque commande lit du texte et produit du texte.

sort trie les lignes par ordre alphabétique. sort -n trie selon la valeur numérique : sans -n, 10 passerait avant 9, car le caractère 1 vient avant 9. sort -r inverse l’ordre. Pour trier selon une colonne, -k indique laquelle : sort -k2 -n trie numériquement sur la deuxième colonne.

cut extrait des colonnes. -d choisit le séparateur et -f les numéros de colonnes : cut -d " " -f 2 garde le deuxième mot de chaque ligne, séparé par des espaces. Avec un fichier CSV, on écrit cut -d "," -f 1,3 pour garder la première et la troisième colonne.

uniq supprime les lignes répétées, mais seulement quand elles se suivent. C’est pourquoi on trie toujours avant : sort | uniq. L’option -c ajoute devant chaque ligne le nombre de répétitions. La chaîne sort | uniq -c | sort -rn est un classique : elle compte chaque valeur, puis classe du plus fréquent au moins fréquent. uniq -c aligne ses nombres à droite avec des espaces : ce décalage fait partie de son affichage.

Prends l’habitude de construire une chaîne pas à pas. Lance d’abord la première commande et regarde son résultat, ajoute la deuxième, regarde à nouveau, et ainsi de suite. Une longue chaîne écrite d’un seul coup est difficile à corriger ; une chaîne construite étape par étape se vérifie à chaque maillon.

Ces chaînes répondent à de vraies questions. Quelles adresses IP ont échoué le plus souvent à se connecter ? Quel produit s’est le mieux vendu ? Combien de membres par ville ? Chaque fois, le schéma est le même : filtrer avec grep, extraire la colonne utile avec cut, trier avec sort, compter avec uniq -c, classer avec sort -rn et garder le début avec head.

Le tube ne modifie aucun fichier : il fait circuler du texte entre commandes. Pour conserver le résultat dans un fichier, il faudra une redirection, sujet du module suivant.

## Exemple guidé 1

Fichier de départ `ventes.txt` :

    lundi 3000
    mardi 1200
    mercredi 4500
    jeudi 2500
    vendredi 3800
    samedi 6200
    dimanche 900

```bash
cut -d " " -f 2 ventes.txt | sort -n | tail -n 1
echo "=="
sort -k2 -n -r ventes.txt | head -n 3
```

Affichage attendu :

    6200
    ==
    samedi 6200
    mercredi 4500
    vendredi 3800

Trace :

- cut garde la deuxième colonne : les montants.
- sort -n les trie par valeur ; tail -n 1 garde le plus grand.
- sort -k2 -n -r trie les lignes entières sur la colonne 2, en décroissant.
- head -n 3 garde les trois meilleures journées.

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
grep ECHEC journal.log | cut -d " " -f 3 | sort | uniq -c | sort -rn
```

Affichage attendu :

          3 10.0.0.9
          1 10.0.0.12

Trace :

- grep garde les quatre échecs.
- cut extrait la troisième colonne : l’adresse IP.
- sort regroupe les adresses identiques ; uniq -c les compte.
- sort -rn classe de la plus fréquente à la moins fréquente.

## Vérifier et expliquer

Construis chaque chaîne maillon par maillon, en lançant le script à chaque ajout pour voir le texte qui circule.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [GNU Coreutils — sort](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)
- [GNU Coreutils — uniq](https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html)
- [GNU Coreutils — cut](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)
- [Bash — tubes](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html)
