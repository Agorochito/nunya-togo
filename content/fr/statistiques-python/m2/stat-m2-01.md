---
{
  "id": "stat-m2-01",
  "title_fr": "Effectifs et fréquences",
  "course": "statistiques-python",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "stat-m1-03"
  ],
  "outcomes": [
    "Compter les effectifs d’une variable avec collections.Counter.",
    "Calculer des fréquences en pourcentage et des fréquences cumulées."
  ],
  "idea_fr": "Pour des réponses qui se répètent, on ne liste pas les valeurs : on compte combien de fois chacune apparaît, puis on rapporte ce nombre au total.",
  "analogy_fr": "Au dépouillement d’une élection de délégués, on ne relit pas chaque bulletin à voix haute à la fin : on fait des bâtons à côté de chaque nom, puis on compte.",
  "examples": [
    {
      "code": "from collections import Counter\n\ntransport = [\"pied\", \"moto\", \"pied\", \"bus\", \"pied\", \"moto\", \"vélo\"]\neffectifs = Counter(transport)\nprint(effectifs[\"pied\"], effectifs[\"avion\"])\nprint(effectifs.most_common(2))",
      "expected_output": "3 0\n[('pied', 3), ('moto', 2)]\n",
      "inputs": [],
      "trace_fr": [
        "Counter compte chaque modalité.",
        "Une modalité absente a un effectif de 0, sans erreur.",
        "most_common(2) donne les deux plus fréquentes."
      ]
    },
    {
      "code": "from collections import Counter\n\nfreres = [0, 2, 1, 2, 3, 1, 2, 0, 2, 1]\neffectifs = Counter(freres)\ncumul = 0\nfor valeur in sorted(effectifs):\n    cumul += effectifs[valeur]\n    print(valeur, effectifs[valeur], round(100 * cumul / len(freres)), \"%\")",
      "expected_output": "0 2 20 %\n1 3 50 %\n2 4 90 %\n3 1 100 %\n",
      "inputs": [],
      "trace_fr": [
        "Les valeurs sont rangées avant de cumuler.",
        "50 % des élèves ont au plus un frère ou une sœur.",
        "Le cumul final atteint 100 %."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer des effectifs de groupes de tailles différentes",
      "why_fr": "Le plus grand groupe semble toujours dominer.",
      "fix_fr": "Compare des fréquences."
    },
    {
      "error": "Cumuler sans ranger les valeurs",
      "why_fr": "Les fréquences cumulées n’ont plus de sens.",
      "fix_fr": "Parcours sorted(effectifs)."
    },
    {
      "error": "Généraliser un sondage non représentatif",
      "why_fr": "La conclusion est fausse pour la population.",
      "fix_fr": "Précise qui a été interrogé."
    }
  ],
  "quiz": [
    {
      "question": "30 élèves sur 120 viennent à pied. Quelle fréquence ?",
      "options": [
        "30 %",
        "25 %",
        "4 %",
        "0,3 %"
      ],
      "answer": 1,
      "explanation": "30 / 120 = 0,25.",
      "id": "stat-m2-01-q1"
    },
    {
      "question": "Que renvoie Counter(liste)[\"absent\"] pour une valeur absente ?",
      "options": [
        "Une erreur",
        "0",
        "None",
        "1"
      ],
      "answer": 1,
      "explanation": "Counter renvoie 0 pour une clé absente.",
      "id": "stat-m2-01-q2"
    },
    {
      "question": "La somme des fréquences arrondies vaut 99,9 %. Que conclure ?",
      "options": [
        "Une erreur de calcul",
        "Un effet normal des arrondis",
        "Une donnée manque",
        "Le sondage est faux"
      ],
      "answer": 1,
      "explanation": "On le signale dans une note.",
      "id": "stat-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "variable qualitative",
      "definition": "Variable dont les valeurs sont des catégories."
    },
    {
      "term": "effectif",
      "definition": "Nombre de fois qu’une valeur apparaît."
    },
    {
      "term": "fréquence",
      "definition": "Effectif divisé par l’effectif total."
    },
    {
      "term": "effectif cumulé",
      "definition": "Somme des effectifs des valeurs inférieures ou égales."
    }
  ],
  "recap_fr": [
    "Compter les effectifs d’une variable avec collections.Counter.",
    "Calculer des fréquences en pourcentage et des fréquences cumulées.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "variable qualitative",
    "effectif",
    "fréquence",
    "effectif cumulé"
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
      "title": "Python — collections.Counter",
      "url": "https://docs.python.org/fr/3/library/collections.html#collections.Counter"
    },
    {
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability"
    }
  ],
  "sources": [
    {
      "title": "Python — collections.Counter",
      "url": "https://docs.python.org/fr/3/library/collections.html#collections.Counter",
      "scope": "Compter des effectifs. Texte, exemples et exercices originaux Nunya.",
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

Beaucoup de données ne sont pas des mesures mais des catégories : le moyen de transport pour venir au lycée, la langue parlée à la maison, la réponse à une question de sondage. On parle de variable qualitative. Pour la résumer, on compte l’effectif de chaque modalité, c’est-à-dire le nombre de fois où elle apparaît.

En Python, collections.Counter fait ce travail en une ligne. Counter(reponses) renvoie un dictionnaire spécial qui associe à chaque valeur son nombre d’apparitions. Sa méthode most_common donne les modalités de la plus fréquente à la moins fréquente, et most_common(3) les trois premières.

Un effectif seul est difficile à interpréter : 30 élèves qui viennent à pied, est-ce beaucoup ? Tout dépend du total. On calcule donc la fréquence : effectif divisé par l’effectif total. Multipliée par 100, elle s’exprime en pourcentage. 30 élèves sur 120 donnent une fréquence de 0,25, soit 25 %. Les fréquences permettent de comparer des groupes de tailles différentes : 25 % dans un lycée de 120 élèves et 25 % dans un lycée de 2 000 élèves décrivent la même proportion.

La somme des fréquences vaut 1, soit 100 %. Avec des arrondis, elle peut valoir 99,9 % ou 100,1 % : ce n’est pas une erreur, mais il faut le signaler dans un tableau publié, avec une note du type « les totaux peuvent différer de 100 % en raison des arrondis ».

Pour une variable quantitative discrète, comme le nombre de frères et sœurs, on peut aussi calculer les effectifs cumulés : combien d’élèves ont au plus 0, au plus 1, au plus 2 frères et sœurs. Les valeurs doivent alors être rangées dans l’ordre croissant avant de cumuler. La fréquence cumulée permet de répondre directement à des questions comme « quelle proportion des familles a au plus deux enfants ? ». La valeur dont la fréquence cumulée atteint 50 % est la médiane.

Une précaution importante : les fréquences d’un sondage décrivent les personnes interrogées. Pour en tirer une conclusion sur une population plus large, il faut que l’échantillon soit représentatif, une question traitée plus loin dans ce cours. Un sondage fait uniquement à la sortie d’un cours de mathématiques ne décrit pas tout le lycée.

## Exemple guidé 1

```python
from collections import Counter

transport = ["pied", "moto", "pied", "bus", "pied", "moto", "vélo"]
effectifs = Counter(transport)
print(effectifs["pied"], effectifs["avion"])
print(effectifs.most_common(2))
```

Affichage attendu :

    3 0
    [('pied', 3), ('moto', 2)]

Trace :

- Counter compte chaque modalité.
- Une modalité absente a un effectif de 0, sans erreur.
- most_common(2) donne les deux plus fréquentes.

## Exemple guidé 2

```python
from collections import Counter

freres = [0, 2, 1, 2, 3, 1, 2, 0, 2, 1]
effectifs = Counter(freres)
cumul = 0
for valeur in sorted(effectifs):
    cumul += effectifs[valeur]
    print(valeur, effectifs[valeur], round(100 * cumul / len(freres)), "%")
```

Affichage attendu :

    0 2 20 %
    1 3 50 %
    2 4 90 %
    3 1 100 %

Trace :

- Les valeurs sont rangées avant de cumuler.
- 50 % des élèves ont au plus un frère ou une sœur.
- Le cumul final atteint 100 %.

## Vérifier et expliquer

Interroge dix personnes sur leur moyen de transport et calcule effectifs et fréquences.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — collections.Counter](https://docs.python.org/fr/3/library/collections.html#collections.Counter)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
