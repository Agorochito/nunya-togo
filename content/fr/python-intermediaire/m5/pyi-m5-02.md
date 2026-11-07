---
{
  "id": "pyi-m5-02",
  "title_fr": "Lire du CSV avec un vrai flux texte en mémoire",
  "course": "python-intermediaire",
  "module": "m5",
  "order": 14,
  "minutes": 20,
  "prerequisites": [
    "pyi-m5-01"
  ],
  "outcomes": [
    "Lire CSV avec reader et DictReader sur StringIO.",
    "Contrôler en-tête, colonnes et conversions sans perdre les caractères protégés."
  ],
  "idea_fr": "Lire CSV avec reader et DictReader sur StringIO.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Le point-virgule dans le nom protégé ne crée pas une colonne supplémentaire.",
        "Les deux guillemets doublés représentent des guillemets littéraux.",
        "La quantité reste str après la lecture CSV."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "DictReader donne deux champs nommés par ligne.",
        "Le programme nettoie le nom et convertit explicitement les places.",
        "Un en-tête sans données représente une liste vide valide."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Découper manuellement au séparateur",
      "why_fr": "Un nom protégé contenant ce séparateur serait mal interprété.",
      "fix_fr": "Laisse csv lire les champs."
    },
    {
      "error": "Supposer des nombres déjà convertis",
      "why_fr": "Les cellules restent des chaînes après DictReader.",
      "fix_fr": "Convertis puis valide les bornes."
    }
  ],
  "quiz": [
    {
      "question": "Quel type reader donne-t-il pour une quantité ordinaire ?",
      "options": [
        "Un booléen si la valeur vaut zéro.",
        "Un texte, à convertir explicitement.",
        "Un entier dès que le champ ne contient que des chiffres."
      ],
      "answer": 1,
      "explanation": "La lecture CSV ne devine pas nos types métier.",
      "id": "pyi-m5-02-q1"
    },
    {
      "question": "Que représente StringIO ici ?",
      "options": [
        "Un flux texte en mémoire sans fichier durable.",
        "Un téléchargement enregistré dans le navigateur.",
        "Un chemin de fichier du club."
      ],
      "answer": 0,
      "explanation": "Le parseur lit une source de caractères déjà fournie par la chaîne.",
      "id": "pyi-m5-02-q2"
    },
    {
      "question": "Pourquoi éviter splitlines avant le parseur ?",
      "options": [
        "CSV n’autorise jamais de guillemets.",
        "DictReader exige un réseau actif.",
        "Un retour peut appartenir à un champ protégé."
      ],
      "answer": 2,
      "explanation": "Le parseur doit encore pouvoir distinguer ces retours des séparations entre fiches.",
      "id": "pyi-m5-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "CSV",
      "definition": "Format de tableau textuel utilisant séparateur et règles de protection des champs."
    },
    {
      "term": "flux mémoire",
      "definition": "Source ou destination de caractères conservée seulement en mémoire."
    },
    {
      "term": "en-tête",
      "definition": "Première ligne qui nomme les colonnes attendues."
    }
  ],
  "recap_fr": [
    "Lire CSV avec reader et DictReader sur StringIO.",
    "Contrôler en-tête, colonnes et conversions sans perdre les caractères protégés.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "CSV",
    "flux mémoire",
    "en-tête"
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
      "title": "Python — csv.reader et DictReader",
      "url": "https://docs.python.org/3/library/csv.html",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — io.StringIO",
      "url": "https://docs.python.org/3/library/io.html#io.StringIO",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un tableau CSV n’est pas une suite de morceaux à couper simplement sur un point-virgule. Un champ peut contenir le séparateur, des guillemets ou même un retour à la ligne, à condition de respecter les règles du format. Le module csv sait lire ces formes. Dans notre convention pédagogique, le séparateur est le point-virgule ; il est annoncé explicitement et n’est pas deviné depuis les données.

L’instruction import csv donne accès au module. from io import StringIO importe un nom précis de la bibliothèque standard. StringIO crée un flux texte en mémoire : il se comporte comme une source de caractères pour le lecteur CSV, sans ouvrir ni fabriquer un fichier durable. Nous utilisons StringIO(texte, newline='') afin de laisser csv interpréter les fins de ligne. Le texte est déjà une chaîne Python ; nous ne réalisons ici aucun décodage d’octets.

csv.reader produit des lignes qui sont des listes de textes. Un champ contenant 2 ne devient pas automatiquement un entier. Les guillemets qui protègent le séparateur sont retirés de la valeur ; des guillemets doublés dans un champ protégé représentent un guillemet littéral. Une ligne vide peut apparaître comme une liste vide avec reader. Le premier exercice conserve exactement les lignes produites, sans les nettoyer ni leur imposer de colonnes.

csv.DictReader utilise une ligne d’en-tête pour nommer les colonnes. Dans nos contrats, cet en-tête doit être exactement celui annoncé, dans le même ordre, sans nettoyage implicite. DictReader ignore les lignes totalement vides après l’en-tête. Si une ligne possède trop de champs, une entrée de clé None porte les valeurs supplémentaires ; s’il en manque, certaines valeurs deviennent None. Nous refusons explicitement les deux situations au lieu de les confondre avec un texte vide valable.

Les valeurs métier sont ensuite converties. strip nettoie le nom et les nombres textuels ; int accepte notamment des espaces extérieurs, un signe plus et des zéros initiaux, mais refuse une écriture comme 1.5. La conversion précède les comparaisons de bornes. Les activités demandent des places de zéro à vingt et, dans le catalogue, des identifiants positifs uniques. Un échec de conversion et un dépassement doivent produire le refus annoncé, sans liste partiellement acceptée.

Ne commence pas par splitlines pour alimenter le lecteur : tu risques de perdre les retours à la ligne qui font partie d’un champ protégé. Le flux conserve ces caractères pour le parseur. Avec strict=True, certaines erreurs de guillemets deviennent csv.Error ; nous les traduisons en ValueError CSV invalide. Cette option ne valide pas nos colonnes ni nos règles métier. Les exemples et tests comprennent donc séparateurs protégés, messages sur deux lignes, guillemets doublés, en-tête seul et lignes irrégulières. Tous les noms et tableaux sont fictifs et restent dans les flux temporaires de cet essai.

## Exemple guidé 1

```python
import csv
from io import StringIO

def lire_table_csv(texte):
    if type(texte) is not str:
        raise TypeError('texte attendu')
    try:
        return list(csv.reader(StringIO(texte, newline=''), delimiter=';', strict=True))
    except csv.Error:
        raise ValueError('CSV invalide')

    texte = '"Club; lecture";2\n"Atelier ""A""";0\n'
    lignes = lire_table_csv(texte)
    print(lignes)
    print(type(lignes[0][1]).__name__)
```

## Exemple guidé 2

```python
import csv
from io import StringIO

def lire_dicts_csv(texte, colonnes):
    if type(texte) is not str:
        raise TypeError('texte attendu')
    try:
        lecteur = csv.DictReader(StringIO(texte, newline=''), delimiter=';', strict=True)
        if lecteur.fieldnames != colonnes:
            raise ValueError('en-tete invalide')
        lignes = list(lecteur)
    except csv.Error:
        raise ValueError('CSV invalide')
    for ligne in lignes:
        if None in ligne or any(valeur is None for valeur in ligne.values()):
            raise ValueError('colonnes invalides')
    return lignes
def lire_inscriptions_csv(texte):
    lignes = lire_dicts_csv(texte, ['nom', 'places'])
    resultat = []
    for ligne in lignes:
        nom = ligne['nom'].strip()
        if not nom:
            raise ValueError('nom invalide')
        try:
            places = int(ligne['places'].strip())
        except ValueError:
            raise ValueError('places invalides')
        if not 0 <= places <= 20:
            raise ValueError('places invalides')
        resultat.append({'nom':nom, 'places':places})
    return resultat

    texte = 'nom;places\n  École ; +2 \nCouture;0\n'
    print(lire_inscriptions_csv(texte))
    print(lire_inscriptions_csv('nom;places\n'))
```
