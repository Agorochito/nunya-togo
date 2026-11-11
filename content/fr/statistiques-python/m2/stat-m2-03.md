---
{
  "id": "stat-m2-03",
  "title_fr": "Nettoyer les données avant de calculer",
  "course": "statistiques-python",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "stat-m2-02"
  ],
  "outcomes": [
    "Repérer et traiter les valeurs manquantes, les saisies incohérentes et les doublons.",
    "Lire des données tabulaires avec le module csv et calculer sur les seules valeurs valides."
  ],
  "idea_fr": "Des calculs justes sur des données sales donnent des résultats faux : le nettoyage est souvent la plus grande partie du travail d’un analyste.",
  "analogy_fr": "Avant de cuisiner, on trie le riz : on retire les petits cailloux et les grains abîmés. Personne ne goûte le plat pour vérifier après coup.",
  "examples": [
    {
      "code": "textes = [\"12,5\", \" 14 \", \"NA\", \"\", \"9.5\"]\nnotes = []\nfor texte in textes:\n    texte = texte.strip()\n    if texte in (\"\", \"NA\"):\n        continue\n    notes.append(float(texte.replace(\",\", \".\")))\nprint(notes, len(textes) - len(notes), \"manquantes\")",
      "expected_output": "[12.5, 14.0, 9.5] 2 manquantes\n",
      "inputs": [],
      "trace_fr": [
        "La virgule est remplacée par un point.",
        "Les cases vides et NA sont exclues.",
        "Le nombre de valeurs manquantes est annoncé."
      ]
    },
    {
      "code": "import csv\n\ndonnees = [\"nom;classe;note\", \"Afi;1A;14\", \"Yao;1A;NA\", \"Ama;1B;125\", \"Afi;1A;14\"]\nvus = set()\nfor ligne in csv.DictReader(donnees, delimiter=\";\"):\n    cle = (ligne[\"nom\"], ligne[\"classe\"])\n    if cle in vus:\n        print(\"doublon :\", ligne[\"nom\"])\n        continue\n    vus.add(cle)\n    print(ligne[\"nom\"], ligne[\"note\"])",
      "expected_output": "Afi 14\nYao NA\nAma 125\ndoublon : Afi\n",
      "inputs": [],
      "trace_fr": [
        "DictReader lit l’en-tête et donne des dictionnaires.",
        "Le séparateur est le point-virgule.",
        "La deuxième ligne d’Afi est repérée comme doublon ; NA et 125 restent à traiter."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Remplacer une valeur manquante par zéro",
      "why_fr": "La moyenne baisse à tort.",
      "fix_fr": "Exclus-la et annonce combien il y en a."
    },
    {
      "error": "Convertir « 12,5 » directement",
      "why_fr": "float lève ValueError.",
      "fix_fr": "Remplace la virgule par un point."
    },
    {
      "error": "Nettoyer sans laisser de trace",
      "why_fr": "Personne ne peut juger les résultats.",
      "fix_fr": "Compte les lignes gardées et écartées."
    }
  ],
  "quiz": [
    {
      "question": "Que donne float(\"12,5\") en Python ?",
      "options": [
        "12.5",
        "125",
        "ValueError",
        "12"
      ],
      "answer": 2,
      "explanation": "Python attend un point décimal.",
      "id": "stat-m2-03-q1"
    },
    {
      "question": "Un élève absent a « NA ». Que faire pour la moyenne de la classe ?",
      "options": [
        "Compter 0",
        "L’exclure et le signaler",
        "Compter 10",
        "Supprimer la classe"
      ],
      "answer": 1,
      "explanation": "Zéro fausserait la moyenne.",
      "id": "stat-m2-03-q2"
    },
    {
      "question": "Pourquoi les fichiers CSV français utilisent-ils souvent le point-virgule ?",
      "options": [
        "Par habitude",
        "Parce que la virgule sert aux décimales",
        "Pour aller plus vite",
        "C’est obligatoire"
      ],
      "answer": 1,
      "explanation": "La virgule décimale entrerait en conflit.",
      "id": "stat-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "valeur manquante",
      "definition": "Information absente, à exclure ou à traiter explicitement."
    },
    {
      "term": "valeur impossible",
      "definition": "Valeur hors des bornes possibles, erreur certaine."
    },
    {
      "term": "doublon",
      "definition": "Même enregistrement présent plusieurs fois."
    },
    {
      "term": "CSV",
      "definition": "Format texte de tableau, une ligne par enregistrement."
    }
  ],
  "recap_fr": [
    "Repérer et traiter les valeurs manquantes, les saisies incohérentes et les doublons.",
    "Lire des données tabulaires avec le module csv et calculer sur les seules valeurs valides.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "valeur manquante",
    "valeur impossible",
    "doublon",
    "CSV"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne, avec le module statistics de la bibliothèque standard. Les données (notes, ventes, relevés, enquêtes) sont fictives et inventées pour l’exercice.",
  "references": [
    {
      "title": "Python — csv",
      "url": "https://docs.python.org/fr/3/library/csv.html"
    },
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html"
    }
  ],
  "sources": [
    {
      "title": "Python — csv",
      "url": "https://docs.python.org/fr/3/library/csv.html",
      "scope": "Lire des données tabulaires. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html",
      "scope": "Moyenne, médiane, mode, variance, écart-type et quantiles. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Les données réelles sont rarement propres. Une note est saisie « 12,5 » avec une virgule, une autre « NA » parce que l’élève était absent, une troisième « 125 » parce qu’une virgule a été oubliée. Une ligne est répétée deux fois parce que le fichier a été fusionné avec une copie. Si l’on calcule directement, Python plante sur le texte, ou pire, il calcule quelque chose de faux sans prévenir.

Le premier problème est la conversion. Les tableurs français écrivent les décimales avec une virgule, alors que Python attend un point : float("12,5") lève ValueError. On remplace la virgule par un point avant de convertir. On retire aussi les espaces autour avec strip.

Le deuxième est la valeur manquante. Une case vide, « NA », « - » ou « absent » signifie que l’information n’existe pas. La pire erreur est de la remplacer par zéro : un élève absent compterait comme un élève qui a eu zéro, et la moyenne de la classe baisserait à tort. En général, on exclut les valeurs manquantes du calcul et l’on indique combien il y en avait : « moyenne sur 28 élèves, 2 absents ». Les remplacer par une estimation est possible, mais c’est une décision d’analyse qui doit être justifiée et signalée.

Le troisième est la valeur impossible. Une note doit être entre 0 et 20, un âge positif, un prix supérieur à zéro. Une valeur hors de ces bornes est une erreur de saisie certaine ; on l’écarte et on la signale pour correction, sans la deviner. Ce contrôle diffère des valeurs aberrantes de la leçon sur les quartiles : une valeur aberrante est surprenante mais possible, une valeur impossible est forcément fausse.

Le quatrième est le doublon : la même ligne présente deux fois. On le repère en comparant les identifiants, par exemple le nom et la classe d’un élève, et l’on n’en garde qu’un exemplaire.

Pour lire un fichier de données, le module csv découpe chaque ligne selon un séparateur. Les fichiers produits par des tableurs en français utilisent souvent le point-virgule, car la virgule sert aux décimales : on écrit csv.reader(lignes, delimiter=";"). csv.DictReader utilise la première ligne comme en-tête et donne chaque ligne sous forme de dictionnaire, ce qui rend le code plus lisible : ligne["note"] plutôt que ligne[2].

Un bon nettoyage laisse une trace : combien de lignes lues, combien gardées, combien écartées et pourquoi. Sans ce compte rendu, personne ne peut juger la fiabilité des résultats.

## Exemple guidé 1

```python
textes = ["12,5", " 14 ", "NA", "", "9.5"]
notes = []
for texte in textes:
    texte = texte.strip()
    if texte in ("", "NA"):
        continue
    notes.append(float(texte.replace(",", ".")))
print(notes, len(textes) - len(notes), "manquantes")
```

Affichage attendu :

    [12.5, 14.0, 9.5] 2 manquantes

Trace :

- La virgule est remplacée par un point.
- Les cases vides et NA sont exclues.
- Le nombre de valeurs manquantes est annoncé.

## Exemple guidé 2

```python
import csv

donnees = ["nom;classe;note", "Afi;1A;14", "Yao;1A;NA", "Ama;1B;125", "Afi;1A;14"]
vus = set()
for ligne in csv.DictReader(donnees, delimiter=";"):
    cle = (ligne["nom"], ligne["classe"])
    if cle in vus:
        print("doublon :", ligne["nom"])
        continue
    vus.add(cle)
    print(ligne["nom"], ligne["note"])
```

Affichage attendu :

    Afi 14
    Yao NA
    Ama 125
    doublon : Afi

Trace :

- DictReader lit l’en-tête et donne des dictionnaires.
- Le séparateur est le point-virgule.
- La deuxième ligne d’Afi est repérée comme doublon ; NA et 125 restent à traiter.

## Vérifier et expliquer

Ouvre un tableau de notes réel ou inventé, et compte les cases vides, les virgules et les valeurs impossibles avant tout calcul.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — csv](https://docs.python.org/fr/3/library/csv.html)
- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
