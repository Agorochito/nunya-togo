---
{
  "id": "pyi-m1-03",
  "title_fr": "Construire une collection par compréhension lisible",
  "course": "python-intermediaire",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "pyi-m1-02"
  ],
  "outcomes": [
    "Écrire une compréhension de liste avec transformation et filtre.",
    "Construire un dictionnaire par compréhension en distinguant clés et valeurs."
  ],
  "idea_fr": "Une compréhension décrit une nouvelle collection à partir d’un parcours, avec une transformation et un filtre éventuel.",
  "analogy_fr": "Une grille de préparation indique quelles lignes conserver et quelle information reporter pour chacune.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "[1, 1]\n[30, 60, 90, 0]\n",
      "trace_fr": [
        "Ligne 1 : les valeurs sont des minutes, avec un seuil exact et deux valeurs insuffisantes.",
        "Ligne 2 : 30 est refusé ; 60 produit 1 ; 90 produit encore 1 ; 0 est refusé.",
        "Ligne 3 : la liste garde les deux résultats égaux, dans l’ordre.",
        "Ligne 4 : la liste initiale est intacte."
      ]
    },
    {
      "inputs": [],
      "expected_output": "{'A': 6, 'B': 4}\n{}\n",
      "trace_fr": [
        "Ligne 1 : le stock contient un zéro à exclure.",
        "Ligne 2 : items fournit chaque code avec sa quantité ; seules les quantités positives produisent un champ.",
        "Ligne 3 : A vaut 6 et B vaut 4 dans le nouveau dictionnaire.",
        "Ligne 4 : aucun élément n’est parcouru dans le dictionnaire vide, donc le résultat est {}."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Filtrer dans la mauvaise unité",
      "why_fr": "Le critère utilise déjà la valeur transformée.",
      "fix_fr": "Nomme l’unité du seuil avant de comparer."
    },
    {
      "error": "Confondre compréhension et déduplication",
      "why_fr": "Les répétitions d’une liste restent présentes.",
      "fix_fr": "Choisis set seulement si le besoin demande des valeurs distinctes."
    },
    {
      "error": "Condensation excessive",
      "why_fr": "Le calcul devient difficile à expliquer.",
      "fix_fr": "Répartis les clauses sur plusieurs lignes ou conserve une boucle."
    }
  ],
  "quiz": [
    {
      "question": "Dans [x*2 for x in valeurs if x>0], que fait if x>0 ?",
      "options": [
        "Il supprime les doublons du résultat.",
        "Il trie les doubles obtenus.",
        "Il sélectionne les valeurs avant de produire leur double."
      ],
      "answer": 2,
      "explanation": "Le filtre décide si un élément produit une valeur.",
      "id": "pyi-m1-03-q1"
    },
    {
      "question": "Que produit une compréhension de liste sur une collection vide ?",
      "options": [
        "Une liste contenant un zéro.",
        "Une liste vide.",
        "None."
      ],
      "answer": 1,
      "explanation": "Aucun tour ne produit de valeur.",
      "id": "pyi-m1-03-q2"
    },
    {
      "question": "Que se passe-t-il si une compréhension de dictionnaire produit plusieurs fois la même clé ?",
      "options": [
        "La dernière valeur produite pour cette clé est conservée.",
        "Les valeurs sont automatiquement additionnées.",
        "Un set remplace le dictionnaire."
      ],
      "answer": 0,
      "explanation": "Une clé de dictionnaire n’associe qu’une valeur à la fois.",
      "id": "pyi-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "compréhension de liste",
      "definition": "Expression construisant une liste depuis un parcours et un filtre éventuel."
    },
    {
      "term": "compréhension de dictionnaire",
      "definition": "Expression produisant des couples clé-valeur dans un nouveau dictionnaire."
    },
    {
      "term": "filtre",
      "definition": "Condition qui décide quels éléments sont retenus."
    },
    {
      "term": "transformation",
      "definition": "Calcul de la valeur produite pour un élément retenu."
    }
  ],
  "recap_fr": [
    "Écrire une compréhension de liste avec transformation et filtre.",
    "Construire un dictionnaire par compréhension en distinguant clés et valeurs.",
    "Vérifier les cas limites, le contrat de retour et la préservation des arguments."
  ],
  "tags": [
    "compréhension de liste",
    "compréhension de dictionnaire",
    "filtre",
    "transformation"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "environment_fr": "Python local dans le moteur Pyodide auto-hébergé. Données fictives en mémoire ; aucune installation, requête réseau ni écriture de fichier durable. Les exercices vérifient les valeurs retournées et la préservation des arguments. Chaque cas repart d’un programme neuf ; les appels d’un même cas partagent ce programme.",
  "sources": [
    {
      "title": "Documentation Python — Compréhensions de listes",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html#list-comprehensions",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Documentation Python — Dictionnaires",
      "url": "https://docs.python.org/fr/3/tutorial/datastructures.html#dictionaries",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une compréhension rassemble un parcours et la construction d’une collection dans une expression. La forme [expression for element in collection] construit une nouvelle liste. On peut ajouter if condition à la fin pour ne retenir que certains éléments. Dans [minutes // 60 for minutes in durees if minutes >= 60], on parcourt les minutes, on vérifie le seuil, puis on calcule les heures pour les valeurs retenues.

L’ordre de lecture visuel place l’expression produite en premier, mais le sens reste celui d’une boucle avec un filtre. Pour une valeur 30, la condition est fausse et rien n’est ajouté. Pour 90, elle est vraie et 90//60 donne 1. Ne confonds pas l’unité du critère avec celle du résultat : comparer minutes // 60 à un seuil exprimé en minutes changerait le problème. Une trace de deux valeurs suffit souvent à révéler cette erreur.

La liste produite respecte l’ordre du parcours et conserve les répétitions retenues. Une compréhension ne déduplique pas comme un set et ne trie pas automatiquement. Si la collection est vide, aucune expression de production n’est évaluée et le résultat est simplement []. Une compréhension de dictionnaire vide donne {}, sans qu’une première ligne artificielle soit nécessaire.

La forme {cle: valeur for element in collection} produit un dictionnaire. Pour parcourir un dictionnaire existant en récupérant ses deux parties, stock.items() fournit ses paires clé-valeur, que code, quantite déballe. On peut ainsi conserver code comme clé et calculer quantite * 2 comme valeur. Les clés du résultat doivent être uniques : si une même clé est produite plusieurs fois, sa dernière valeur remplace les précédentes. Un tel résultat ne constitue pas un comptage des occurrences.

La compréhension doit rendre le besoin plus clair, pas transformer toute boucle en une seule ligne dense. Écris ses parties sur plusieurs lignes quand le résultat contient un dictionnaire ou plusieurs accès. Une expression simple convient ; une succession de règles difficiles à expliquer appelle plutôt une boucle ou une fonction nommée. Ne place pas un append uniquement pour provoquer un effet de bord dans la partie résultat.

Les exercices de cette leçon demandent explicitement une compréhension de liste ou de dictionnaire. Leur vérification porte sur cette construction étudiée, en plus des valeurs retournées. Un commentaire mentionnant le mot compréhension ne suffit pas. Le résultat doit rester juste sur les cas vides, les seuils et les données répétées. Une construction correcte en syntaxe peut conserver les mauvaises lignes.

Ces exemples ne modifient que des valeurs simples ou construisent de nouveaux dictionnaires de résumé. Une compréhension n’effectue pas automatiquement une copie profonde des objets qu’elle réutilise ; ce point sera approfondi dans le module suivant. Pour l’instant, lis les arguments et produis les champs annoncés. Les bilans de places et de stock sont des calculs fictifs en mémoire, sans écriture dans un inventaire réel.

## Exemple guidé 1

```python
durees = [30, 60, 90, 0]  # 1
heures = [minutes // 60 for minutes in durees if minutes >= 60]  # 2
print(heures)  # 3
print(durees)  # 4
```

Résultat attendu :

```text
[1, 1]
[30, 60, 90, 0]
```

Trace :

- Ligne 1 : les valeurs sont des minutes, avec un seuil exact et deux valeurs insuffisantes.
- Ligne 2 : 30 est refusé ; 60 produit 1 ; 90 produit encore 1 ; 0 est refusé.
- Ligne 3 : la liste garde les deux résultats égaux, dans l’ordre.
- Ligne 4 : la liste initiale est intacte.

## Exemple guidé 2

```python
stock = {"C": 0, "A": 3, "B": 2}  # 1
doubles = {code: quantite * 2 for code, quantite in stock.items() if quantite > 0}  # 2
print(doubles)  # 3
print({code: quantite for code, quantite in {}.items()})  # 4
```

Résultat attendu :

```text
{'A': 6, 'B': 4}
{}
```

Trace :

- Ligne 1 : le stock contient un zéro à exclure.
- Ligne 2 : items fournit chaque code avec sa quantité ; seules les quantités positives produisent un champ.
- Ligne 3 : A vaut 6 et B vaut 4 dans le nouveau dictionnaire.
- Ligne 4 : aucun élément n’est parcouru dans le dictionnaire vide, donc le résultat est {}.
