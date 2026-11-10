---
{
  "id": "term-m4-01",
  "title_fr": "Répéter avec for et while",
  "course": "bash-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "term-m3-03"
  ],
  "outcomes": [
    "Parcourir une liste de valeurs ou de fichiers avec for.",
    "Lire un fichier ligne par ligne avec while read."
  ],
  "idea_fr": "Une boucle applique les mêmes commandes à chaque élément d’une liste : fichiers, valeurs ou lignes.",
  "analogy_fr": "Le facteur suit sa tournée : pour chaque maison de la liste, il dépose le courrier, puis passe à la suivante.",
  "examples": [
    {
      "code": "for ville in Lome Kara Sokode; do\n  echo \"Livraison à $ville\"\ndone\nfor f in *.txt; do\n  echo \"$f : $(wc -l < \"$f\") lignes\"\ndone",
      "expected_output": "Livraison à Lome\nLivraison à Kara\nLivraison à Sokode\nagenda.txt : 2 lignes\nmembres.txt : 3 lignes",
      "inputs": [],
      "trace_fr": [
        "La première boucle prend trois valeurs écrites dans la liste.",
        "*.txt est remplacé par les fichiers .txt, dans l’ordre alphabétique.",
        "Pour chaque fichier, wc compte les lignes.",
        "Le fichier photo.jpg n’est pas concerné."
      ],
      "files": {
        "membres.txt": "Afi\nKossi\nYawa\n",
        "agenda.txt": "mardi\njeudi\n",
        "photo.jpg": "x"
      }
    },
    {
      "code": "total=0\nwhile read -r jour montant; do\n  total=$(( total + montant ))\ndone < ventes.txt\necho \"Total de la semaine : $total FCFA\"",
      "expected_output": "Total de la semaine : 22100 FCFA",
      "inputs": [],
      "trace_fr": [
        "total commence à 0 avant la boucle.",
        "Chaque tour lit un jour et un montant.",
        "Le montant s’ajoute au total.",
        "Après done, total contient la somme des sept jours."
      ],
      "files": {
        "ventes.txt": "lundi 3000\nmardi 1200\nmercredi 4500\njeudi 2500\nvendredi 3800\nsamedi 6200\ndimanche 900\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier do ou done",
      "why_fr": "La boucle n’est pas correctement délimitée.",
      "fix_fr": "Écris for … ; do … done."
    },
    {
      "error": "Placer < fichier au début de while",
      "why_fr": "La redirection doit suivre done.",
      "fix_fr": "Écris done < fichier."
    },
    {
      "error": "Ne pas protéger *.txt sans fichier",
      "why_fr": "La boucle tourne une fois avec le motif littéral.",
      "fix_fr": "Ajoute [ -f \"$f\" ] || continue au début."
    }
  ],
  "quiz": [
    {
      "question": "Combien de tours fait for x in a b c; do … done ?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "answer": 2,
      "explanation": "Une fois par valeur de la liste.",
      "id": "term-m4-01-q1"
    },
    {
      "question": "Où place-t-on < fichier pour lire avec while read ?",
      "options": [
        "Avant while",
        "Après done",
        "Après read",
        "Nulle part"
      ],
      "answer": 1,
      "explanation": "La redirection alimente toute la boucle.",
      "id": "term-m4-01-q2"
    },
    {
      "question": "Que vaut i au troisième tour de for i in $(seq 1 5) ?",
      "options": [
        "1",
        "2",
        "3",
        "5"
      ],
      "answer": 2,
      "explanation": "seq produit 1, 2, 3, 4, 5.",
      "id": "term-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "for",
      "definition": "Boucle qui parcourt une liste de valeurs."
    },
    {
      "term": "while read",
      "definition": "Boucle qui lit un fichier ligne par ligne."
    },
    {
      "term": "motif de fichiers",
      "definition": "Écriture comme *.txt, remplacée par les noms correspondants."
    },
    {
      "term": "seq",
      "definition": "Commande qui produit une suite de nombres."
    }
  ],
  "recap_fr": [
    "Parcourir une liste de valeurs ou de fichiers avec for.",
    "Lire un fichier ligne par ligne avec while read.",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "for",
    "while read",
    "motif de fichiers",
    "seq"
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
      "title": "Bash — boucles",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html"
    },
    {
      "title": "Bash — motifs de fichiers",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html"
    },
    {
      "title": "GNU Coreutils — seq",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html"
    }
  ],
  "sources": [
    {
      "title": "Bash — boucles",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — motifs de fichiers",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "GNU Coreutils — seq",
      "url": "https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Automatiser, c’est faire répéter le travail par l’ordinateur. La boucle for exécute un bloc pour chaque élément d’une liste : for ville in Lome Kara Sokode; do echo "$ville"; done. La variable ville prend successivement chaque valeur. do ouvre le bloc et done le ferme.

La liste peut venir d’un motif de fichiers. for f in *.txt; do … done parcourt tous les fichiers du dossier courant dont le nom finit par .txt, dans l’ordre alphabétique. C’est la manière la plus sûre de traiter des fichiers un par un : renommer, compter, copier. Attention : si aucun fichier ne correspond, Bash laisse le motif tel quel et la boucle tourne une fois avec la valeur *.txt. Un test [ -f "$f" ] au début du bloc protège contre ce cas.

Pour compter, la commande seq produit une suite de nombres : for i in $(seq 1 5) parcourt 1 à 5. On peut aussi écrire for i in {1..5}.

while répète un bloc tant qu’une condition est vraie. Son usage le plus courant est la lecture d’un fichier ligne par ligne : while read -r ligne; do … done < fichier.txt. La redirection < à la fin, après done, fournit le fichier à la boucle entière ; chaque tour lit la ligne suivante dans la variable ligne. read peut aussi découper la ligne en plusieurs variables : while read -r etat compte ip; do … done < journal.log range le premier mot dans etat, le deuxième dans compte et le reste dans ip.

Les accumulateurs fonctionnent comme dans les autres langages : total=0 avant la boucle, puis total=$(( total + montant )) dans le bloc. Les variables modifiées dans une boucle while alimentée par < restent disponibles après done.

Une boucle qui ne s’arrête pas bloque le script. L’atelier l’arrête au bout de cinq secondes et l’indique ; sur un vrai serveur, Ctrl+C interrompt une commande en cours. Vérifie qu’une boucle while finit par rendre sa condition fausse.

Les boucles sont la base de l’automatisation. Un administrateur sauvegarde chaque nuit tous les fichiers modifiés ; un analyste en sécurité vérifie chaque adresse IP d’une liste ; un développeur renomme d’un coup des centaines de photos. Chaque fois, une boucle de quelques lignes remplace des heures de travail répétitif et sans erreur de frappe.

## Exemple guidé 1

Fichier de départ `membres.txt` :

    Afi
    Kossi
    Yawa

Fichier de départ `agenda.txt` :

    mardi
    jeudi

Fichier de départ `photo.jpg` :

    x

```bash
for ville in Lome Kara Sokode; do
  echo "Livraison à $ville"
done
for f in *.txt; do
  echo "$f : $(wc -l < "$f") lignes"
done
```

Affichage attendu :

    Livraison à Lome
    Livraison à Kara
    Livraison à Sokode
    agenda.txt : 2 lignes
    membres.txt : 3 lignes

Trace :

- La première boucle prend trois valeurs écrites dans la liste.
- *.txt est remplacé par les fichiers .txt, dans l’ordre alphabétique.
- Pour chaque fichier, wc compte les lignes.
- Le fichier photo.jpg n’est pas concerné.

## Exemple guidé 2

Fichier de départ `ventes.txt` :

    lundi 3000
    mardi 1200
    mercredi 4500
    jeudi 2500
    vendredi 3800
    samedi 6200
    dimanche 900

```bash
total=0
while read -r jour montant; do
  total=$(( total + montant ))
done < ventes.txt
echo "Total de la semaine : $total FCFA"
```

Affichage attendu :

    Total de la semaine : 22100 FCFA

Trace :

- total commence à 0 avant la boucle.
- Chaque tour lit un jour et un montant.
- Le montant s’ajoute au total.
- Après done, total contient la somme des sept jours.

## Vérifier et expliquer

Ajoute un echo dans chaque boucle pour voir la valeur de la variable à chaque tour, puis retire-le.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Bash — boucles](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)
- [Bash — motifs de fichiers](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)
- [GNU Coreutils — seq](https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html)
