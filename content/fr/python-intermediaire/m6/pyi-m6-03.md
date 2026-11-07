---
{
  "id": "pyi-m6-03",
  "title_fr": "Projet final : bilan du club et exports vérifiés",
  "course": "python-intermediaire",
  "module": "m6",
  "order": 18,
  "minutes": 20,
  "prerequisites": [
    "pyi-m6-02"
  ],
  "outcomes": [
    "Composer des objets validés et produire un bilan aux définitions précises.",
    "Exporter JSON/CSV et vérifier réellement leurs allers-retours avant de rendre le dossier."
  ],
  "idea_fr": "Composer des objets validés et produire un bilan aux définitions précises.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Deux ateliers comptent, mais seul Lecture est ouvert.",
        "La collection vide donne trois zéros.",
        "L’assertion vérifie que le nettoyage n’a pas muté le nom reçu."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Le JSON comporte les fiches puis le bilan sous deux clés annoncées.",
        "Le CSV protège le point-virgule du nom et garde son en-tête.",
        "Le compteur trois n’est retourné qu’après les trois assertions d’aller-retour et de total."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Compter des ateliers à la place des places",
      "why_fr": "Les indicateurs décrivent des quantités différentes.",
      "fix_fr": "Écris et teste la définition de chaque somme."
    },
    {
      "error": "Vérifier seulement que l’export n’est pas vide",
      "why_fr": "Un format incorrect ou incomplet peut quand même contenir du texte.",
      "fix_fr": "Relis avec les vrais parseurs puis compare les données."
    }
  ],
  "quiz": [
    {
      "question": "Une fiche à zéro place compte-t-elle comme atelier ouvert ?",
      "options": [
        "Oui, zéro signifie toujours disponible.",
        "Elle doit disparaître du catalogue.",
        "Non, elle compte comme atelier mais pas comme ouvert."
      ],
      "answer": 2,
      "explanation": "Les trois indicateurs du bilan possèdent des définitions différentes.",
      "id": "pyi-m6-03-q1"
    },
    {
      "question": "Pourquoi relire les exports dans le projet ?",
      "options": [
        "Pour transformer les assertions en validation désactivable des entrées.",
        "Pour comparer leur contenu réel aux données canoniques.",
        "Pour écrire automatiquement un fichier durable."
      ],
      "answer": 1,
      "explanation": "Un texte non vide ne prouve ni ses colonnes ni ses valeurs.",
      "id": "pyi-m6-03-q2"
    },
    {
      "question": "Qu’est-ce que le correcteur reçoit pour ce projet ?",
      "options": [
        "Un bilan et des valeurs primitives, sans instance de classe.",
        "Une réservation confirmée.",
        "Un certificat professionnel automatique."
      ],
      "answer": 0,
      "explanation": "Les classes restent une organisation interne du programme local.",
      "id": "pyi-m6-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "composition",
      "definition": "Organisation d’un objet à partir de plusieurs objets aux rôles définis."
    },
    {
      "term": "aller-retour",
      "definition": "Écriture d’une représentation puis lecture pour comparer les données retrouvées."
    },
    {
      "term": "bilan",
      "definition": "Ensemble de compteurs définis à partir du même catalogue."
    }
  ],
  "recap_fr": [
    "Composer des objets validés et produire un bilan aux définitions précises.",
    "Exporter JSON/CSV et vérifier réellement leurs allers-retours avant de rendre le dossier.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "composition",
    "aller-retour",
    "bilan"
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
      "title": "Python — Classes",
      "url": "https://docs.python.org/3/tutorial/classes.html",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — json.JSONEncoder",
      "url": "https://docs.python.org/3/library/json.html#json.JSONEncoder",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — csv.DictWriter",
      "url": "https://docs.python.org/3/library/csv.html#csv.DictWriter",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — assert statement",
      "url": "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le dernier projet prépare un bilan et deux représentations d’un même catalogue fictif. Il assemble objets, fonctions, formats et assertions. Chaque activité contient tout le code nécessaire : aucune classe n’est chargée depuis une autre leçon. Les objets vivent seulement en mémoire ; les exports sont des chaînes retournées. Ni inscription, ni téléchargement, ni enregistrement de fichier durable ne sont réalisés par ces fonctions.

La classe Atelier construit une instance depuis une fiche validée. Ses attributs id, nom et places respectent les règles déjà annoncées : identifiant entier exact positif, nom nettoyé non vide, places entières exactes entre zéro et vingt. CatalogueClub compose plusieurs instances et refuse les identifiants répétés avant de conserver la collection. Les dictionnaires d’entrée restent inchangés. La méthode en_donnees produit de nouveaux dictionnaires primitifs ; le correcteur reçoit des valeurs simples, jamais une instance de classe à interpréter.

Le bilan distingue trois quantités : nombre d’ateliers, total des places et nombre d’ateliers ouverts, c’est-à-dire ayant au moins une place. Une fiche à zéro place compte donc comme atelier sans augmenter les deux autres valeurs. Pour une collection vide, les trois nombres valent zéro. Cette définition doit être testée avant les exports : une chaîne bien formée ne rend pas un total incorrect acceptable.

L’export JSON rassemble les fiches canoniques sous ateliers et le bilan sous bilan, dans cet ordre. Il est compact et conserve les caractères accentués dans la chaîne. L’export CSV décrit seulement les fiches, avec colonnes id, nom et places, séparateur point-virgule, en-tête et saut de ligne final. Le module csv protège les caractères particuliers. Les deux formats représentent les mêmes données mais n’ont pas exactement la même structure : le bilan est contenu dans le document JSON, pas ajouté comme une fausse ligne CSV.

La fonction dossier_club crée le catalogue et récupère ces résultats. Trois assertions réelles contrôlent un aller-retour JSON, un aller-retour CSV après conversion des nombres, puis le total des places recalculé depuis les données. Elles comparent les données relues aux attentes, au lieu de vérifier seulement que les textes ne sont pas vides. Le nombre verifications vaut trois uniquement après ces comparaisons. Ces tests locaux ne remplacent pas la validation explicite des entrées, qui doit continuer à lever ses exceptions même si des assertions sont désactivées ailleurs.

La grille Fonctionnement vérifie les bornes, l’identité, le bilan et les deux exports. La grille Clarté examine les responsabilités des classes et des fonctions. La grille Tests demande des collections vides, des caractères protégés, des refus et des entrées conservées. La grille Accessibilité des messages demande des refus compréhensibles qui nomment la règle, sans dépendre d’une couleur ou d’un code silencieux. La grille Explication demande de justifier l’état canonique, les compteurs et les limites du flux mémoire. Réussir ces activités apporte un retour formatif, sans certificat professionnel ni maîtrise garantie. Chaque nouvel essai recrée les objets ; Nunya conserve le code et la progression, pas le dossier temporaire.

## Exemple guidé 1

```python
import json
import csv
from io import StringIO
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
class Atelier:
    def __init__(self, fiche):
        propre = preparer_fiche(fiche)
        self.id = propre['id']
        self.nom = propre['nom']
        self.places = propre['places']

    def en_donnees(self):
        return {'id':self.id, 'nom':self.nom, 'places':self.places}

class CatalogueClub:
    def __init__(self, fiches):
        propres = valider_catalogue(fiches)
        self.ateliers = [Atelier(fiche) for fiche in propres]

    def en_donnees(self):
        return [atelier.en_donnees() for atelier in self.ateliers]

    def bilan(self):
        return {
            'ateliers':len(self.ateliers),
            'places':sum(atelier.places for atelier in self.ateliers),
            'ouverts':sum(1 for atelier in self.ateliers if atelier.places > 0)
        }

    def exporter_json(self):
        donnees = {'ateliers':self.en_donnees(), 'bilan':self.bilan()}
        return json.dumps(donnees, ensure_ascii=False, separators=(',', ':'))

    def exporter_csv(self):
        flux = StringIO(newline='')
        auteur = csv.DictWriter(flux, fieldnames=['id', 'nom', 'places'], delimiter=';', lineterminator='\n', quoting=csv.QUOTE_ALL)
        auteur.writeheader()
        auteur.writerows(self.en_donnees())
        return flux.getvalue()
def bilan_club(fiches):
    catalogue = CatalogueClub(fiches)
    return catalogue.bilan()

    fiches = [
        {'id':3, 'nom':' Lecture ', 'places':2},
        {'id':1, 'nom':'Couture', 'places':0}
    ]
    print(bilan_club(fiches))
    print(bilan_club([]))
    assert fiches[0]['nom'] == ' Lecture '
    print('Entrée conservée')
```

## Exemple guidé 2

```python
import json
import csv
from io import StringIO
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
class Atelier:
    def __init__(self, fiche):
        propre = preparer_fiche(fiche)
        self.id = propre['id']
        self.nom = propre['nom']
        self.places = propre['places']

    def en_donnees(self):
        return {'id':self.id, 'nom':self.nom, 'places':self.places}

class CatalogueClub:
    def __init__(self, fiches):
        propres = valider_catalogue(fiches)
        self.ateliers = [Atelier(fiche) for fiche in propres]

    def en_donnees(self):
        return [atelier.en_donnees() for atelier in self.ateliers]

    def bilan(self):
        return {
            'ateliers':len(self.ateliers),
            'places':sum(atelier.places for atelier in self.ateliers),
            'ouverts':sum(1 for atelier in self.ateliers if atelier.places > 0)
        }

    def exporter_json(self):
        donnees = {'ateliers':self.en_donnees(), 'bilan':self.bilan()}
        return json.dumps(donnees, ensure_ascii=False, separators=(',', ':'))

    def exporter_csv(self):
        flux = StringIO(newline='')
        auteur = csv.DictWriter(flux, fieldnames=['id', 'nom', 'places'], delimiter=';', lineterminator='\n', quoting=csv.QUOTE_ALL)
        auteur.writeheader()
        auteur.writerows(self.en_donnees())
        return flux.getvalue()
def dossier_club(fiches):
    catalogue = CatalogueClub(fiches)
    donnees = catalogue.en_donnees()
    bilan = catalogue.bilan()
    texte_json = catalogue.exporter_json()
    texte_csv = catalogue.exporter_csv()
    assert json.loads(texte_json) == {'ateliers':donnees, 'bilan':bilan}, 'aller-retour JSON'
    lecteur = csv.DictReader(StringIO(texte_csv, newline=''), delimiter=';')
    relues = []
    for ligne in lecteur:
        relues.append({'id':int(ligne['id']), 'nom':ligne['nom'], 'places':int(ligne['places'])})
    assert relues == donnees, 'aller-retour CSV'
    assert bilan['places'] == sum(fiche['places'] for fiche in donnees), 'total places'
    return {'bilan':bilan, 'json':texte_json, 'csv':texte_csv, 'verifications':3}

    resultat = dossier_club([{'id':7, 'nom':'École; jardin', 'places':0}])
    print(resultat['json'])
    print(resultat['csv'], end='')
    print(resultat['verifications'])
```
