---
{
  "id": "term-m3-02",
  "title_fr": "Variables, saisies et calculs",
  "course": "bash-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "term-m3-01"
  ],
  "outcomes": [
    "Créer des variables, les lire avec \"$nom\" et saisir une valeur avec read.",
    "Insérer le résultat d’une commande avec $( … ) et calculer avec $(( … ))."
  ],
  "idea_fr": "Un script retient des valeurs dans des variables, les reçoit de la personne qui l’utilise et calcule avec elles.",
  "analogy_fr": "Le carnet du commerçant : il note le prix du jour sous un nom, puis s’en sert pour chaque client.",
  "examples": [
    {
      "code": "read -r nom\nread -r age\nville=\"Lomé\"\necho \"$nom a $(( age + 1 )) ans l’an prochain et vit à $ville\"",
      "expected_output": "Afi a 18 ans l’an prochain et vit à Lomé",
      "inputs": [
        "Afi",
        "17"
      ],
      "trace_fr": [
        "read lit Afi, puis 17.",
        "ville est affectée sans espace autour de =.",
        "$(( age + 1 )) calcule 18.",
        "Les guillemets doubles laissent les variables se remplacer."
      ]
    },
    {
      "code": "jours=$(wc -l < ventes.txt)\ntotal=0\nmeilleure=$(cut -d \" \" -f 2 ventes.txt | sort -n | tail -n 1)\necho \"Jours : $jours\"\necho \"Meilleure vente : $meilleure FCFA\"\necho \"Moyenne entière : $(( (3000 + 1200 + 4500) / 3 )) FCFA\"",
      "expected_output": "Jours : 7\nMeilleure vente : 6200 FCFA\nMoyenne entière : 2900 FCFA",
      "inputs": [],
      "trace_fr": [
        "$( … ) range le nombre de lignes dans jours.",
        "Une chaîne entière de commandes peut remplir une variable.",
        "Les variables s’affichent dans les textes.",
        "La division de $(( )) est entière."
      ],
      "files": {
        "ventes.txt": "lundi 3000\nmardi 1200\nmercredi 4500\njeudi 2500\nvendredi 3800\nsamedi 6200\ndimanche 900\n"
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre des espaces autour de =",
      "why_fr": "Bash lit le nom comme une commande.",
      "fix_fr": "Écris nom=valeur, collé."
    },
    {
      "error": "Oublier les guillemets autour d’une variable",
      "why_fr": "Une valeur avec espaces est découpée.",
      "fix_fr": "Écris \"$variable\"."
    },
    {
      "error": "Attendre des décimales de $(( ))",
      "why_fr": "Bash ne calcule qu’avec des entiers.",
      "fix_fr": "Utilise un autre outil pour les nombres à virgule."
    }
  ],
  "quiz": [
    {
      "question": "Quelle affectation est correcte ?",
      "options": [
        "prix = 500",
        "prix=500",
        "$prix=500",
        "prix==500"
      ],
      "answer": 1,
      "explanation": "Pas d’espace autour de =.",
      "id": "term-m3-02-q1"
    },
    {
      "question": "Qu’affiche echo $(( 17 / 5 )) ?",
      "options": [
        "3.4",
        "3",
        "4",
        "2"
      ],
      "answer": 1,
      "explanation": "La division est entière.",
      "id": "term-m3-02-q2"
    },
    {
      "question": "Qu’affiche echo '$HOME' ?",
      "options": [
        "Le dossier personnel.",
        "$HOME",
        "Une erreur.",
        "Rien."
      ],
      "answer": 1,
      "explanation": "Les guillemets simples empêchent la substitution.",
      "id": "term-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "variable",
      "definition": "Nom associé à une valeur, lu avec $nom."
    },
    {
      "term": "read",
      "definition": "Commande qui lit une ligne saisie dans une variable."
    },
    {
      "term": "substitution de commande",
      "definition": "Écriture $( … ) remplacée par le résultat de la commande."
    },
    {
      "term": "arithmétique",
      "definition": "Calcul entier écrit $(( … ))."
    }
  ],
  "recap_fr": [
    "Créer des variables, les lire avec \"$nom\" et saisir une valeur avec read.",
    "Insérer le résultat d’une commande avec $( … ) et calculer avec $(( … )).",
    "Lire le message d’erreur du terminal, retrouver la ligne indiquée et corriger la commande."
  ],
  "tags": [
    "terminal",
    "linux",
    "bash",
    "débutant",
    "variable",
    "read",
    "substitution de commande",
    "arithmétique"
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
      "title": "Bash — paramètres et variables",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Shell-Parameters.html"
    },
    {
      "title": "Bash — substitution de commande",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html"
    },
    {
      "title": "Bash — arithmétique",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html"
    }
  ],
  "sources": [
    {
      "title": "Bash — paramètres et variables",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Shell-Parameters.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — substitution de commande",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "Bash — arithmétique",
      "url": "https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html",
      "scope": "Manuel officiel GNU ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ]
}
---


## Explication pas à pas

Une variable donne un nom à une valeur. En Bash, on l’affecte sans espace autour du signe égal : ville=Kara. Avec des espaces, ville = Kara, Bash croirait que ville est une commande et afficherait command not found. Pour lire la variable, on écrit un dollar devant son nom : echo "Ville : $ville".

Mets toujours les variables entre guillemets doubles quand tu les utilises : "$ville". Sans guillemets, une valeur qui contient des espaces serait découpée en plusieurs arguments, et un nom de fichier comme mon rapport.txt deviendrait deux fichiers. Les guillemets simples, au contraire, empêchent toute substitution : '$ville' affiche le texte $ville tel quel.

read lit une ligne saisie et la range dans une variable : read nom. Dans l’atelier, les saisies sont écrites à l’avance, une par ligne, comme pour les autres langages. Chaque read lit la ligne suivante. read -r est conseillé : il garde les barres obliques inverses telles quelles.

$( commande ) exécute une commande et la remplace par son résultat. total=$(wc -l < ventes.txt) range le nombre de lignes dans la variable total. On peut l’utiliser directement dans un texte : echo "Il y a $(wc -l < ventes.txt) jours". C’est ce que tu as utilisé au chapitre précédent pour construire un rapport.

Bash calcule avec $(( … )), sur des nombres entiers seulement : echo $(( 3 * 4 + 2 )) affiche 14. Dans les doubles parenthèses, les variables peuvent s’écrire sans dollar : $(( prix * quantite )). La division est entière : $(( 7 / 2 )) vaut 3, et % donne le reste. Pour des nombres à virgule, on utilise d’autres outils, comme awk ou un langage comme Python.

Les variables d’environnement sont des variables déjà définies par le système. $HOME désigne le dossier personnel et $USER le nom de l’utilisateur. Par convention, elles sont écrites en majuscules ; utilise des minuscules pour tes propres variables, afin de ne pas en écraser une par erreur.

Un script qui demande des valeurs, vérifie leur forme et calcule devient un petit outil réutilisable. Garde l’ordre lire, calculer, afficher : il rend le script facile à suivre et à corriger.

## Exemple guidé 1

```bash
read -r nom
read -r age
ville="Lomé"
echo "$nom a $(( age + 1 )) ans l’an prochain et vit à $ville"
```

Saisies de l’exemple : Afi · 17

Affichage attendu :

    Afi a 18 ans l’an prochain et vit à Lomé

Trace :

- read lit Afi, puis 17.
- ville est affectée sans espace autour de =.
- $(( age + 1 )) calcule 18.
- Les guillemets doubles laissent les variables se remplacer.

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
jours=$(wc -l < ventes.txt)
total=0
meilleure=$(cut -d " " -f 2 ventes.txt | sort -n | tail -n 1)
echo "Jours : $jours"
echo "Meilleure vente : $meilleure FCFA"
echo "Moyenne entière : $(( (3000 + 1200 + 4500) / 3 )) FCFA"
```

Affichage attendu :

    Jours : 7
    Meilleure vente : 6200 FCFA
    Moyenne entière : 2900 FCFA

Trace :

- $( … ) range le nombre de lignes dans jours.
- Une chaîne entière de commandes peut remplir une variable.
- Les variables s’affichent dans les textes.
- La division de $(( )) est entière.

## Vérifier et expliquer

Affiche chaque variable juste après l’avoir remplie pour vérifier sa valeur, puis retire ces affichages de contrôle.

## Références techniques

Explications et activités originales Nunya. Commandes vérifiées dans les manuels GNU :

- [Bash — paramètres et variables](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameters.html)
- [Bash — substitution de commande](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)
- [Bash — arithmétique](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html)
