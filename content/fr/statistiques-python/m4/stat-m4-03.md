---
{
  "id": "stat-m4-03",
  "title_fr": "Projet : l’enquête du lycée",
  "course": "statistiques-python",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "stat-m4-02"
  ],
  "outcomes": [
    "Mener une petite étude statistique complète : lecture, nettoyage, description, relation et conclusion prudente.",
    "Rédiger des conclusions qui annoncent leurs limites."
  ],
  "idea_fr": "Une étude statistique n’est pas une suite de calculs : c’est une question, des données nettoyées, des résumés choisis et une conclusion honnête.",
  "analogy_fr": "Un médecin ne pose pas un diagnostic sur une seule mesure : il interroge, examine, compare, puis conclut en disant ce qu’il ne sait pas encore.",
  "examples": [
    {
      "code": "import csv\n\n\ndef lire(lignes):\n    eleves = []\n    for ligne in csv.DictReader(lignes, delimiter=\";\"):\n        try:\n            sommeil, note = float(ligne[\"sommeil\"]), float(ligne[\"note\"])\n        except ValueError:\n            continue\n        if 0 < sommeil <= 24 and 0 <= note <= 20:\n            eleves.append({\"sommeil\": sommeil, \"note\": note, \"transport\": ligne[\"transport\"]})\n    return eleves\n\nlignes = ['eleve;sommeil;note;transport', 'A1;8;14;pied', 'A2;6;10;moto', 'A3;7;12;pied', 'A4;NA;11;bus', 'A5;9;15;pied', 'A6;5;9;moto', 'A7;8;13;bus', 'A8;7;13;pied']\neleves = lire(lignes)\nprint(len(lignes) - 1, \"lignes,\", len(eleves), \"élèves gardés\")\nprint(eleves[0])",
      "expected_output": "8 lignes, 7 élèves gardés\n{'sommeil': 8.0, 'note': 14.0, 'transport': 'pied'}\n",
      "inputs": [],
      "trace_fr": [
        "La ligne avec NA est écartée.",
        "Sept élèves restent pour l’analyse.",
        "Chaque élève devient un dictionnaire."
      ]
    },
    {
      "code": "import statistics\n\nsommeil = [8, 6, 7, 9, 5, 8, 7]\nnotes = [14, 10, 12, 15, 9, 13, 13]\nmx, my = statistics.mean(sommeil), statistics.mean(notes)\ncov = sum((x - mx) * (y - my) for x, y in zip(sommeil, notes)) / len(notes)\nprint(round(cov / (statistics.pstdev(sommeil) * statistics.pstdev(notes)), 2))\nprint(statistics.mean([n for s, n in zip(sommeil, notes) if s >= 8]), round(statistics.mean([n for s, n in zip(sommeil, notes) if s < 8]), 2))",
      "expected_output": "0.97\n14 11\n",
      "inputs": [],
      "trace_fr": [
        "Le lien entre sommeil et note est fort : r = 0,97.",
        "Ceux qui ont dormi au moins 8 heures ont 14 de moyenne.",
        "Les autres ont 11 : une association, pas une preuve de cause."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Conclure à une cause",
      "why_fr": "Des facteurs de confusion peuvent expliquer le lien.",
      "fix_fr": "Parle d’association."
    },
    {
      "error": "Généraliser à partir de volontaires",
      "why_fr": "L’échantillon est biaisé.",
      "fix_fr": "Précise qui a répondu."
    },
    {
      "error": "Taire l’effectif final",
      "why_fr": "Le lecteur ne peut pas juger la fiabilité.",
      "fix_fr": "Annonce combien d’individus ont été analysés."
    }
  ],
  "quiz": [
    {
      "question": "Quelle conclusion est correcte pour r = 0,97 entre sommeil et note ?",
      "options": [
        "Dormir fait réussir",
        "Il y a une forte association dans cet échantillon",
        "Tous les élèves du pays",
        "Aucune conclusion possible"
      ],
      "answer": 1,
      "explanation": "Association, pas causalité.",
      "id": "stat-m4-03-q1"
    },
    {
      "question": "Pourquoi l’échantillon des volontaires est-il biaisé ?",
      "options": [
        "Il est trop grand",
        "Les volontaires d’un club ne représentent pas tout le lycée",
        "Les notes sont fausses",
        "Il ne l’est pas"
      ],
      "answer": 1,
      "explanation": "Le choix des répondants n’est pas aléatoire.",
      "id": "stat-m4-03-q2"
    },
    {
      "question": "Que faut-il toujours annoncer dans un rapport ?",
      "options": [
        "Le nom des élèves",
        "L’effectif analysé et les limites",
        "Seulement les chiffres",
        "La couleur des graphiques"
      ],
      "answer": 1,
      "explanation": "Pour que le lecteur juge la fiabilité.",
      "id": "stat-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "étude statistique",
      "definition": "Démarche : question, données, nettoyage, description, analyse, conclusion."
    },
    {
      "term": "association",
      "definition": "Lien observé entre deux variables, sans preuve de cause."
    },
    {
      "term": "effectif analysé",
      "definition": "Nombre d’individus gardés après nettoyage."
    },
    {
      "term": "limites",
      "definition": "Ce que l’étude ne permet pas d’affirmer."
    }
  ],
  "recap_fr": [
    "Mener une petite étude statistique complète : lecture, nettoyage, description, relation et conclusion prudente.",
    "Rédiger des conclusions qui annoncent leurs limites.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "étude statistique",
    "association",
    "effectif analysé",
    "limites"
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
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html"
    },
    {
      "title": "Python — csv",
      "url": "https://docs.python.org/fr/3/library/csv.html"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    }
  ],
  "sources": [
    {
      "title": "Python — statistics",
      "url": "https://docs.python.org/fr/3/library/statistics.html",
      "scope": "Moyenne, médiane, mode, variance, écart-type et quantiles. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — csv",
      "url": "https://docs.python.org/fr/3/library/csv.html",
      "scope": "Lire des données tabulaires. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability",
      "scope": "Notions générales de statistique descriptive et de probabilités. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Le club de sciences d’un lycée a mené une enquête : pour chaque élève volontaire, les heures de sommeil la veille d’un devoir, la note obtenue et le moyen de transport. La question est simple : les élèves qui dorment plus réussissent-ils mieux ? Ce projet suit les étapes d’une étude réelle, chacune avec une fonction courte.

Première étape : lire et nettoyer. Le fichier est au format CSV avec un point-virgule. Certaines heures de sommeil manquent (« NA »), d’autres sont impossibles. On écarte ces lignes et l’on compte combien il en reste, car l’effectif final fait partie du résultat.

Deuxième étape : décrire chaque variable. Pour le sommeil et les notes, la moyenne, la médiane et l’écart-type ; pour le transport, une variable qualitative, le tableau des fréquences. Ces résumés permettent déjà de repérer des anomalies et de présenter l’échantillon : combien d’élèves, quelle répartition.

Troisième étape : étudier la relation. Le coefficient de corrélation entre sommeil et note mesure la force du lien linéaire. Sur nos données, il est fort et positif. On peut aussi comparer deux groupes : la note moyenne des élèves qui ont dormi au moins 8 heures et celle des autres.

Quatrième étape, la plus importante : conclure avec prudence. Les données montrent une association, pas une cause. Un élève qui dort plus est peut-être aussi un élève moins stressé, mieux organisé, ou qui habite plus près : autant de facteurs de confusion possibles. Les volontaires d’un club de sciences ne représentent pas tout le lycée : l’échantillon est probablement biaisé. Et avec moins de dix élèves, un coefficient même élevé reste fragile : la marge d’erreur sur une proportion dépasserait 30 points.

Une bonne conclusion ressemble donc à ceci : « Parmi les 7 élèves volontaires dont les données sont complètes, ceux qui ont dormi davantage ont obtenu de meilleures notes (r = 0,97). Cette association ne prouve pas que le sommeil améliore les notes ; une enquête sur un échantillon tiré au hasard, plus grand, serait nécessaire pour généraliser. »

Cette prudence n’est pas une faiblesse. C’est elle qui distingue une analyse statistique d’une opinion habillée de chiffres. Les métiers de la donnée, analyste, chargé de suivi-évaluation dans une ONG, statisticien, reposent sur cette double compétence : calculer juste, et dire exactement ce que les calculs permettent d’affirmer.

## Exemple guidé 1

```python
import csv


def lire(lignes):
    eleves = []
    for ligne in csv.DictReader(lignes, delimiter=";"):
        try:
            sommeil, note = float(ligne["sommeil"]), float(ligne["note"])
        except ValueError:
            continue
        if 0 < sommeil <= 24 and 0 <= note <= 20:
            eleves.append({"sommeil": sommeil, "note": note, "transport": ligne["transport"]})
    return eleves

lignes = ['eleve;sommeil;note;transport', 'A1;8;14;pied', 'A2;6;10;moto', 'A3;7;12;pied', 'A4;NA;11;bus', 'A5;9;15;pied', 'A6;5;9;moto', 'A7;8;13;bus', 'A8;7;13;pied']
eleves = lire(lignes)
print(len(lignes) - 1, "lignes,", len(eleves), "élèves gardés")
print(eleves[0])
```

Affichage attendu :

    8 lignes, 7 élèves gardés
    {'sommeil': 8.0, 'note': 14.0, 'transport': 'pied'}

Trace :

- La ligne avec NA est écartée.
- Sept élèves restent pour l’analyse.
- Chaque élève devient un dictionnaire.

## Exemple guidé 2

```python
import statistics

sommeil = [8, 6, 7, 9, 5, 8, 7]
notes = [14, 10, 12, 15, 9, 13, 13]
mx, my = statistics.mean(sommeil), statistics.mean(notes)
cov = sum((x - mx) * (y - my) for x, y in zip(sommeil, notes)) / len(notes)
print(round(cov / (statistics.pstdev(sommeil) * statistics.pstdev(notes)), 2))
print(statistics.mean([n for s, n in zip(sommeil, notes) if s >= 8]), round(statistics.mean([n for s, n in zip(sommeil, notes) if s < 8]), 2))
```

Affichage attendu :

    0.97
    14 11

Trace :

- Le lien entre sommeil et note est fort : r = 0,97.
- Ceux qui ont dormi au moins 8 heures ont 14 de moyenne.
- Les autres ont 11 : une association, pas une preuve de cause.

## Vérifier et expliquer

Rédige en trois phrases la conclusion d’une étude imaginaire sur le temps passé au téléphone et les notes, en annonçant l’effectif et deux limites.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Python — csv](https://docs.python.org/fr/3/library/csv.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
