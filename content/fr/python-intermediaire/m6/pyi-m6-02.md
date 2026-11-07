---
{
  "id": "pyi-m6-02",
  "title_fr": "Projet autonome : préparer et importer deux formats",
  "course": "python-intermediaire",
  "module": "m6",
  "order": 17,
  "minutes": 20,
  "prerequisites": [
    "pyi-m6-01"
  ],
  "outcomes": [
    "Partager une représentation canonique entre adaptateurs JSON et CSV.",
    "Fusionner des sources avec validation complète et politique d’identité explicite."
  ],
  "idea_fr": "Partager une représentation canonique entre adaptateurs JSON et CSV.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "L’adaptateur JSON fournit un nom nettoyé avec une quantité déjà numérique.",
        "Le parseur CSV conserve le point-virgule dans le champ protégé puis convertit les nombres.",
        "Les deux sources vides produisent une seule liste vide."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Chaque source est valide séparément, mais leur réunion contient deux fois id2.",
        "La fusion refuse explicitement cet identifiant au lieu d’écraser une fiche.",
        "La chaîne reçue reste inchangée après le refus."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Valider seulement chaque source séparément",
      "why_fr": "Un doublon partagé reste invisible à chaque import.",
      "fix_fr": "Valide aussi leur réunion."
    },
    {
      "error": "Écraser une fiche sans règle annoncée",
      "why_fr": "Des données disparaissent sans refus explicable.",
      "fix_fr": "Applique explicitement la politique choisie de refus."
    }
  ],
  "quiz": [
    {
      "question": "Quel rôle appartient à l’adaptateur CSV ?",
      "options": [
        "Convertir ses nombres textuels avant la validation commune.",
        "Changer silencieusement tous les ids pour éviter les erreurs.",
        "Écrire un fichier sur disque."
      ],
      "answer": 0,
      "explanation": "Le format et la règle métier sont traités à deux niveaux identifiables.",
      "id": "pyi-m6-02-q1"
    },
    {
      "question": "Deux ateliers peuvent-ils porter le même nom dans ce projet ?",
      "options": [
        "Non, le nom est obligatoirement unique ici.",
        "Seulement si leurs places sont égales.",
        "Oui, si leurs identifiants sont différents."
      ],
      "answer": 2,
      "explanation": "Le contrat choisit id comme identité, sans imposer l’unicité des noms.",
      "id": "pyi-m6-02-q2"
    },
    {
      "question": "Que faire d’un id présent dans les deux sources ?",
      "options": [
        "Additionner automatiquement leurs places.",
        "Refuser la fusion avec l’exception annoncée.",
        "Garder toujours la seconde fiche sans le signaler."
      ],
      "answer": 1,
      "explanation": "Le projet n’autorise aucune politique d’écrasement implicite.",
      "id": "pyi-m6-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "adaptateur",
      "definition": "Fonction qui transforme la représentation d’un format vers le modèle commun."
    },
    {
      "term": "canonique",
      "definition": "Forme de données précise et stable choisie par le programme."
    },
    {
      "term": "conflit d’identité",
      "definition": "Présence de plusieurs fiches portant l’identifiant censé être unique."
    }
  ],
  "recap_fr": [
    "Partager une représentation canonique entre adaptateurs JSON et CSV.",
    "Fusionner des sources avec validation complète et politique d’identité explicite.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "adaptateur",
    "canonique",
    "conflit d’identité"
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
      "title": "Python — json.loads",
      "url": "https://docs.python.org/3/library/json.html#json.loads",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — csv.DictReader",
      "url": "https://docs.python.org/3/library/csv.html#csv.DictReader",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Built-in Exceptions",
      "url": "https://docs.python.org/3/library/exceptions.html",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le club fictif reçoit des fiches décrivant des ateliers. Deux bénévoles peuvent utiliser des formats différents : JSON pour l’un, CSV pour l’autre. Le projet doit accepter leurs représentations sans inventer deux versions des règles métier. Chaque activité contient ses propres fonctions et imports ; elle reste exécutable sans fichier d’une leçon précédente. Aucun document n’est lu sur disque : les deux sources sont des chaînes passées en arguments.

Définis d’abord une représentation commune. Une fiche propre contient id, nom et places. L’identifiant est un entier exact positif, le nom un texte non vide nettoyé avec strip, les places un entier exact de zéro à vingt. Les booléens sont refusés pour les deux nombres. Les champs supplémentaires sont ignorés, mais les trois champs requis doivent être présents. preparer_fiche retourne un nouveau dictionnaire canonique ; cette fonction ne décide pas encore si un autre atelier possède le même identifiant.

La validation du catalogue traite ensuite une liste entière. Elle prépare chaque fiche et suit les identifiants dans un ensemble. Deux fiches peuvent avoir le même nom, car le nom n’est pas leur identité ; deux occurrences d’un même id sont en revanche refusées. L’ordre source est conservé. Une liste vide est un catalogue valide. Si une fiche tardive échoue, la fonction lève une exception et ne retourne pas le début du résultat comme si l’import était complet.

L’adaptateur JSON décode la chaîne puis appelle cette validation commune. Il conserve la distinction entre texte incorrect, syntaxe JSON invalide et contenu métier refusé. L’adaptateur CSV contrôle son en-tête id;nom;places et ses colonnes, puis convertit les deux nombres textuels. Ce n’est qu’après cette conversion qu’il présente les objets au même validateur. Une racine JSON qui contient le texte "2" à la place d’un entier n’est pas convertie silencieusement : le contrat des deux formats explique leurs différences de représentation.

La fusion prépare les deux sources séparément, puis valide leur réunion. Les fiches JSON viennent d’abord et les fiches CSV ensuite. Le second passage détecte un identifiant présent dans les deux sources, même lorsque les noms et les places sont identiques. Nous choisissons de refuser ce doublon plutôt que d’écraser une fiche ou de deviner une priorité. Cette politique est explicite et testable ; un autre produit pourrait choisir une autre règle, mais devrait l’annoncer.

Construis les tests avant de modifier la fusion : deux sources vides, des identifiants non consécutifs, un nom contenant le séparateur, une égalité de noms avec des id distincts, un doublon partagé et une erreur dans la seconde source. Compare aussi les arguments avant et après. Le programme crée ses listes et dictionnaires de travail sans modifier les textes reçus. Les messages simples désignent la règle refusée ; ils ne prouvent pas un enregistrement durable. L’ensemble reste un laboratoire local, dont Nunya conserve le code et la progression plutôt que ces catalogues temporaires.

## Exemple guidé 1

```python
import json

def decoder_json(texte):
    if type(texte) is not str:
        raise TypeError('texte attendu')
    try:
        return json.loads(texte)
    except json.JSONDecodeError:
        raise ValueError('JSON invalide')
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
def preparer_fiche(fiche):
    if type(fiche) is not dict:
        raise ValueError('fiche invalide')
    if not all(cle in fiche for cle in ['id', 'nom', 'places']):
        raise ValueError('champs manquants')
    identifiant = fiche['id']
    nom = fiche['nom']
    places = fiche['places']
    if type(identifiant) is not int or identifiant < 1:
        raise ValueError('id invalide')
    if type(nom) is not str or not nom.strip():
        raise ValueError('nom invalide')
    if type(places) is not int or not 0 <= places <= 20:
        raise ValueError('places invalides')
    return {'id':identifiant, 'nom':nom.strip(), 'places':places}

def valider_catalogue(fiches):
    if type(fiches) is not list:
        raise ValueError('liste attendue')
    resultat = []
    identifiants = set()
    for fiche in fiches:
        propre = preparer_fiche(fiche)
        if propre['id'] in identifiants:
            raise ValueError('identifiant duplique')
        identifiants.add(propre['id'])
        resultat.append(propre)
    return resultat
def importer_json(texte):
    return valider_catalogue(decoder_json(texte))
def importer_csv(texte):
    lignes = lire_dicts_csv(texte, ['id', 'nom', 'places'])
    fiches = []
    for ligne in lignes:
        try:
            identifiant = int(ligne['id'].strip())
            places = int(ligne['places'].strip())
        except ValueError:
            raise ValueError('nombres invalides')
        fiches.append({'id':identifiant, 'nom':ligne['nom'], 'places':places})
    return valider_catalogue(fiches)
def fusionner_catalogues(texte_json, texte_csv):
    fiches_json = importer_json(texte_json)
    fiches_csv = importer_csv(texte_csv)
    return valider_catalogue(fiches_json + fiches_csv)

    source_json = '[{"id":3,"nom":" Lecture ","places":2}]'
    source_csv = 'id;nom;places\n1;"Club; couture";0\n'
    print(fusionner_catalogues(source_json, source_csv))
    print(fusionner_catalogues('[]', 'id;nom;places\n'))
```

## Exemple guidé 2

```python
import json

def decoder_json(texte):
    if type(texte) is not str:
        raise TypeError('texte attendu')
    try:
        return json.loads(texte)
    except json.JSONDecodeError:
        raise ValueError('JSON invalide')
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
def preparer_fiche(fiche):
    if type(fiche) is not dict:
        raise ValueError('fiche invalide')
    if not all(cle in fiche for cle in ['id', 'nom', 'places']):
        raise ValueError('champs manquants')
    identifiant = fiche['id']
    nom = fiche['nom']
    places = fiche['places']
    if type(identifiant) is not int or identifiant < 1:
        raise ValueError('id invalide')
    if type(nom) is not str or not nom.strip():
        raise ValueError('nom invalide')
    if type(places) is not int or not 0 <= places <= 20:
        raise ValueError('places invalides')
    return {'id':identifiant, 'nom':nom.strip(), 'places':places}

def valider_catalogue(fiches):
    if type(fiches) is not list:
        raise ValueError('liste attendue')
    resultat = []
    identifiants = set()
    for fiche in fiches:
        propre = preparer_fiche(fiche)
        if propre['id'] in identifiants:
            raise ValueError('identifiant duplique')
        identifiants.add(propre['id'])
        resultat.append(propre)
    return resultat
def importer_json(texte):
    return valider_catalogue(decoder_json(texte))
def importer_csv(texte):
    lignes = lire_dicts_csv(texte, ['id', 'nom', 'places'])
    fiches = []
    for ligne in lignes:
        try:
            identifiant = int(ligne['id'].strip())
            places = int(ligne['places'].strip())
        except ValueError:
            raise ValueError('nombres invalides')
        fiches.append({'id':identifiant, 'nom':ligne['nom'], 'places':places})
    return valider_catalogue(fiches)
def fusionner_catalogues(texte_json, texte_csv):
    fiches_json = importer_json(texte_json)
    fiches_csv = importer_csv(texte_csv)
    return valider_catalogue(fiches_json + fiches_csv)

    source_json = '[{"id":2,"nom":"Lecture","places":1}]'
    source_csv = 'id;nom;places\n2;Autre;3\n'
    try:
        fusionner_catalogues(source_json, source_csv)
    except ValueError as erreur:
        print(str(erreur))
    print(source_csv.startswith('id;nom;places'))
```
