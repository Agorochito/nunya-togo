---
{
  "id": "pyi-m6-01",
  "title_fr": "Écrire des assertions qui peuvent réellement échouer",
  "course": "python-intermediaire",
  "module": "m6",
  "order": 16,
  "minutes": 20,
  "prerequisites": [
    "pyi-m5-03"
  ],
  "outcomes": [
    "Écrire des assertions d’égalité et des bilans de cas réellement exécutés.",
    "Tester les frontières, les refus et l’absence de mutation avec des attentes indépendantes."
  ],
  "idea_fr": "Écrire des assertions d’égalité et des bilans de cas réellement exécutés.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Les deux premières assertions confirment des attentes calculables indépendamment.",
        "La troisième lève AssertionError puis la fonction de test retourne False.",
        "Une attente fausse démontre que le test peut détecter une différence."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Le taux zéro conserve le prix et le calcul entier de101 à50% donne50.",
        "Le dernier attendu est volontairement faux : une remise de100% donne zéro.",
        "Le bilan signale le troisième cas au lieu de compter tout comme réussi."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire assert True",
      "why_fr": "Aucune différence de résultat ne peut être détectée.",
      "fix_fr": "Compare le calcul à une attente indépendante."
    },
    {
      "error": "Copier seulement le nom d’une liste",
      "why_fr": "L’instantané change avec l’objet testé.",
      "fix_fr": "Copie les données à la profondeur nécessaire."
    }
  ],
  "quiz": [
    {
      "question": "Une assertion convient-elle pour une validation métier essentielle ?",
      "options": [
        "Seulement si le message est en français.",
        "Non, elle peut être retirée en mode optimisé.",
        "Oui, elle remplace toujours raise ValueError."
      ],
      "answer": 1,
      "explanation": "Les règles essentielles gardent des contrôles explicites ; assert sert ici aux tests.",
      "id": "pyi-m6-01-q1"
    },
    {
      "question": "Pourquoi tester aussi un attendu volontairement faux ?",
      "options": [
        "Pour prouver que la batterie détecte une différence.",
        "Pour rendre tous les tests rouges définitivement.",
        "Pour modifier les données jusqu’à l’obtenir."
      ],
      "answer": 0,
      "explanation": "Un test qui ne peut jamais échouer ne fournit pas la preuve demandée.",
      "id": "pyi-m6-01-q2"
    },
    {
      "question": "Pourquoi avant=travail ne prouve pas la non-mutation ?",
      "options": [
        "Une liste ne peut jamais être comparée.",
        "sorted modifie toujours l’argument.",
        "Les deux noms désignent le même objet."
      ],
      "answer": 2,
      "explanation": "Un instantané indépendant est nécessaire pour comparer avant et après.",
      "id": "pyi-m6-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "assertion",
      "definition": "Condition de test qui lève AssertionError lorsqu’elle est fausse."
    },
    {
      "term": "cas limite",
      "definition": "Situation choisie près d’une frontière du contrat."
    },
    {
      "term": "instantané",
      "definition": "Copie d’un état antérieur permettant une comparaison indépendante."
    }
  ],
  "recap_fr": [
    "Écrire des assertions d’égalité et des bilans de cas réellement exécutés.",
    "Tester les frontières, les refus et l’absence de mutation avec des attentes indépendantes.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "assertion",
    "cas limite",
    "instantané"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "environment_fr": "CPython/Pyodide réel, bibliothèque standard json/csv/io uniquement. Les textes et StringIO restent en mémoire : aucun fichier durable, réseau, terminal ou téléchargement. Le code et la progression sont sauvegardés, pas les flux temporaires.",
  "sources": [
    {
      "title": "Python — assert statement",
      "url": "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — unittest, basic example",
      "url": "https://docs.python.org/3/library/unittest.html#basic-example",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — copy",
      "url": "https://docs.python.org/3/library/copy.html",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un test compare un résultat calculé à une attente choisie avant l’exécution. L’instruction assert exprime cette comparaison : si sa condition est fausse, Python lève AssertionError. Un message facultatif précise ce qui diffère. Si la condition est vraie, l’exécution continue. L’exemple du total teste plusieurs fiches et une liste vide ; il ne se contente pas d’afficher des nombres à comparer visuellement.

Les attentes doivent venir du contrat, pas être recopiées automatiquement depuis la fonction testée. Pour des places deux puis zéro, le total attendu est deux. Pour une remise exprimée en centimes entiers, l’activité annonce un arrondi inférieur avec la division entière. Les bornes zéro et cent pour le taux produisent des cas simples à calculer. Un prix indivisible vérifie en plus la convention d’arrondi. Un tableau de cas rend ces choix visibles et réutilisables.

Dans les exercices, une petite fonction de batterie capture AssertionError afin de retourner un bilan lisible : nombre de réussites et positions des échecs, numérotées à partir de un. Cette capture appartient au programme de tests, pas à la fonction métier. Un cas volontairement faux doit apparaître dans les échecs. Le remplacer par assert True, ou vérifier seulement que le résultat est positif, ne teste pas la valeur attendue. La batterie vide retourne zéro réussite et aucun échec.

Les assertions ne remplacent pas la validation des entrées d’une application. Python peut les retirer en mode optimisé, par exemple avec son option d’optimisation. Une règle métier essentielle doit donc rester un contrôle explicite avec une exception adaptée, comme dans les leçons précédentes. Ici, l’atelier exécute normalement les assertions pour apprendre à tester ; nous n’en faisons ni une protection contre un usage malveillant ni un examen anti-triche.

Vérifier l’absence de mutation demande aussi une attente indépendante. avant = travail crée seulement un alias : après un tri en place, les deux noms désignent la même liste et la comparaison ne révèle rien. L’activité d’audit crée une copie avant l’opération, puis compare la source de travail à cette copie. Les fiches sont ici plates, composées uniquement de textes et d’entiers ; une copie de chaque dictionnaire suffit. Avec des objets imbriqués, il faudrait reconsidérer cette profondeur.

Enfin, une batterie d’import contrôle aussi les refus attendus. Elle appelle réellement le parseur, distingue ValueError d’un succès et compare les noms lorsqu’une valeur est attendue. Une syntaxe invalide ne doit pas compter comme réussite d’un cas qui demandait des noms ; une exception attendue doit pouvoir réussir son propre cas. Les tests incluent donc des attentes vraies et fausses, des vides et des doublons. Ces preuves restent locales et limitées aux scénarios choisis : complète-les par la relecture du contrat et par une explication des frontières couvertes.

## Exemple guidé 1

```python
def total_places(fiches):
    return sum(fiche['places'] for fiche in fiches)

def verifier_total(fiches, attendu):
    obtenu = total_places(fiches)
    try:
        assert obtenu == attendu, 'total different'
    except AssertionError:
        return False
    return True

    print(verifier_total([{'places':2}, {'places':0}], 2))
    print(verifier_total([], 0))
    print(verifier_total([{'places':3}], 9))
```

## Exemple guidé 2

```python
def calculer_remise(prix, taux):
    return prix * (100 - taux) // 100

def tester_remises(cas):
    reussis = 0
    echecs = []
    for numero, exemple in enumerate(cas, start=1):
        obtenu = calculer_remise(exemple['prix'], exemple['taux'])
        try:
            assert obtenu == exemple['attendu'], 'prix different'
        except AssertionError:
            echecs.append(numero)
        else:
            reussis += 1
    return {'reussis':reussis, 'echecs':echecs}

    cas = [
        {'prix':1000, 'taux':0, 'attendu':1000},
        {'prix':101, 'taux':50, 'attendu':50},
        {'prix':1000, 'taux':100, 'attendu':1}
    ]
    print(tester_remises(cas))
```
