---
{
  "id": "stat-m1-01",
  "title_fr": "Moyenne, médiane et mode",
  "course": "statistiques-python",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "py-m12-03"
  ],
  "outcomes": [
    "Calculer la moyenne, la médiane et le mode d’une série, à la main et avec le module statistics.",
    "Choisir l’indicateur adapté quand une valeur extrême déforme la moyenne."
  ],
  "idea_fr": "Un seul nombre peut résumer une série, mais chaque résumé raconte une histoire différente : il faut savoir lequel choisir.",
  "analogy_fr": "Pour décrire le prix du maïs au marché, on peut donner le prix moyen, le prix du milieu ou le prix le plus souvent affiché. Les trois sont vrais ; ils ne disent pas la même chose.",
  "examples": [
    {
      "code": "import statistics\n\nsalaires = [60000, 60000, 60000, 60000, 600000]\nprint(statistics.mean(salaires))\nprint(statistics.median(salaires))",
      "expected_output": "168000\n60000\n",
      "inputs": [],
      "trace_fr": [
        "La moyenne est tirée vers le haut par le salaire du directeur.",
        "La médiane reste au niveau des quatre salariés.",
        "L’écart entre les deux signale une valeur extrême."
      ]
    },
    {
      "code": "import statistics\n\nnotes = [12, 8, 15, 10]\nrangees = sorted(notes)\nprint(rangees)\nprint((rangees[1] + rangees[2]) / 2, statistics.median(notes))\nprint(statistics.multimode([\"riz\", \"maïs\", \"riz\", \"igname\", \"maïs\"]))",
      "expected_output": "[8, 10, 12, 15]\n11.0 11.0\n['riz', 'maïs']\n",
      "inputs": [],
      "trace_fr": [
        "Avec quatre valeurs, la médiane est la moyenne des deux centrales.",
        "Le calcul manuel et statistics.median donnent 11.",
        "Deux réponses sont à égalité : multimode les renvoie toutes les deux."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier de trier avant de prendre le milieu",
      "why_fr": "On obtient la valeur centrale de la liste, pas de la série.",
      "fix_fr": "Trie avec sorted d’abord."
    },
    {
      "error": "Prendre une seule valeur centrale pour un nombre pair de valeurs",
      "why_fr": "La médiane est fausse.",
      "fix_fr": "Fais la moyenne des deux valeurs centrales."
    },
    {
      "error": "Résumer par la moyenne une série très asymétrique",
      "why_fr": "On décrit une situation qui ne correspond à personne.",
      "fix_fr": "Donne aussi la médiane."
    }
  ],
  "quiz": [
    {
      "question": "Médiane de 3, 9, 4, 1, 7 ?",
      "options": [
        "4",
        "7",
        "4,8",
        "9"
      ],
      "answer": 0,
      "explanation": "Rangée : 1, 3, 4, 7, 9 ; la valeur centrale est 4.",
      "id": "stat-m1-01-q1"
    },
    {
      "question": "Quel indicateur résiste le mieux à une valeur extrême ?",
      "options": [
        "La moyenne",
        "La médiane",
        "La somme",
        "Le maximum"
      ],
      "answer": 1,
      "explanation": "La médiane ne dépend que de l’ordre.",
      "id": "stat-m1-01-q2"
    },
    {
      "question": "Que renvoie statistics.multimode ?",
      "options": [
        "La moyenne",
        "La liste de toutes les valeurs les plus fréquentes",
        "La plus grande valeur",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Utile quand plusieurs valeurs sont à égalité.",
      "id": "stat-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "moyenne",
      "definition": "Somme des valeurs divisée par leur nombre."
    },
    {
      "term": "médiane",
      "definition": "Valeur du milieu de la série rangée."
    },
    {
      "term": "mode",
      "definition": "Valeur la plus fréquente."
    },
    {
      "term": "robuste",
      "definition": "Peu sensible aux valeurs extrêmes."
    }
  ],
  "recap_fr": [
    "Calculer la moyenne, la médiane et le mode d’une série, à la main et avec le module statistics.",
    "Choisir l’indicateur adapté quand une valeur extrême déforme la moyenne.",
    "Un chiffre seul ne suffit jamais : on le compare, on le situe et on dit d’où il vient."
  ],
  "tags": [
    "statistiques",
    "données",
    "python",
    "moyenne",
    "médiane",
    "mode",
    "robuste"
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
      "title": "Khan Academy — statistiques et probabilités",
      "url": "https://fr.khanacademy.org/math/statistics-probability",
      "scope": "Notions générales de statistique descriptive et de probabilités. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

La statistique descriptive cherche à résumer une série de valeurs : les notes d’une classe, les ventes d’une boutique, les salaires d’une entreprise. Trois indicateurs de position répondent à la question « autour de quelle valeur se situe la série ? ».

La moyenne est la somme des valeurs divisée par leur nombre. Elle utilise toutes les valeurs, ce qui est une force et une faiblesse : une seule valeur extrême la déplace beaucoup. Dans une petite entreprise où quatre employés gagnent 60 000 FCFA par mois et le directeur 600 000, le salaire moyen est de 168 000 FCFA. Ce nombre ne correspond à personne : quatre salariés sur cinq gagnent bien moins.

La médiane est la valeur du milieu quand la série est rangée dans l’ordre. Pour un nombre impair de valeurs, c’est celle du centre ; pour un nombre pair, on prend la moyenne des deux valeurs centrales. La moitié des valeurs est au-dessous, l’autre moitié au-dessus. Dans l’entreprise, la médiane vaut 60 000 FCFA : elle n’est pas influencée par le salaire du directeur. On dit qu’elle est robuste. C’est pourquoi les instituts de statistique publient souvent le revenu médian plutôt que le revenu moyen.

Le mode est la valeur la plus fréquente. Il a un sens même pour des données qui ne sont pas des nombres : la couleur préférée, la ville d’origine, la réponse la plus choisie dans un sondage. Une série peut avoir plusieurs modes, ou aucun mode utile si toutes les valeurs sont différentes.

Python fournit ces calculs dans le module statistics : mean pour la moyenne, median pour la médiane, mode pour la valeur la plus fréquente et multimode pour la liste de tous les modes. Le calcul à la main reste instructif : trier avec sorted, trouver le milieu avec une division entière, distinguer le cas pair du cas impair.

Le choix de l’indicateur dépend de la question. Pour répartir un budget total, la moyenne est la bonne mesure, puisque somme et moyenne sont liées. Pour décrire une situation typique quand il existe des valeurs extrêmes, la médiane est plus honnête. Quand moyenne et médiane sont très différentes, c’est un signal : la série est asymétrique, ou elle contient des valeurs aberrantes, et il faut le dire. Donner les deux est souvent la meilleure réponse.

## Exemple guidé 1

```python
import statistics

salaires = [60000, 60000, 60000, 60000, 600000]
print(statistics.mean(salaires))
print(statistics.median(salaires))
```

Affichage attendu :

    168000
    60000

Trace :

- La moyenne est tirée vers le haut par le salaire du directeur.
- La médiane reste au niveau des quatre salariés.
- L’écart entre les deux signale une valeur extrême.

## Exemple guidé 2

```python
import statistics

notes = [12, 8, 15, 10]
rangees = sorted(notes)
print(rangees)
print((rangees[1] + rangees[2]) / 2, statistics.median(notes))
print(statistics.multimode(["riz", "maïs", "riz", "igname", "maïs"]))
```

Affichage attendu :

    [8, 10, 12, 15]
    11.0 11.0
    ['riz', 'maïs']

Trace :

- Avec quatre valeurs, la médiane est la moyenne des deux centrales.
- Le calcul manuel et statistics.median donnent 11.
- Deux réponses sont à égalité : multimode les renvoie toutes les deux.

## Vérifier et expliquer

Calcule à la main la moyenne et la médiane des âges de ta famille, puis vérifie avec statistics.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — statistics](https://docs.python.org/fr/3/library/statistics.html)
- [Khan Academy — statistiques et probabilités](https://fr.khanacademy.org/math/statistics-probability)
