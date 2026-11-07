---
{
  "id": "pyi-m5-03",
  "title_fr": "Produire un CSV déterministe avec DictWriter",
  "course": "python-intermediaire",
  "module": "m5",
  "order": 15,
  "minutes": 20,
  "prerequisites": [
    "pyi-m5-02"
  ],
  "outcomes": [
    "Exporter des dictionnaires avec colonnes et fins de ligne explicites.",
    "Récupérer un texte CSV complet et réutilisable sans fichier durable."
  ],
  "idea_fr": "Exporter des dictionnaires avec colonnes et fins de ligne explicites.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "L’en-tête nom apparaît même lorsque la liste est vide.",
        "Le nom contenant le séparateur est protégé par des guillemets.",
        "Les guillemets du dernier nom sont doublés par le module csv."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "fieldnames impose nom puis places malgré l’ordre différent des clés reçues.",
        "La normalisation produit de nouveaux objets.",
        "Le nom dans l’argument conserve ses espaces initiaux."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier l’en-tête pour un tableau vide",
      "why_fr": "Le destinataire ne connaît plus les colonnes.",
      "fix_fr": "Écris writeheader avant les données."
    },
    {
      "error": "Lire depuis la fin du flux",
      "why_fr": "read peut retourner une chaîne vide après écriture.",
      "fix_fr": "Utilise getvalue pour récupérer tout le contenu."
    }
  ],
  "quiz": [
    {
      "question": "Qu’est-ce qui décide de l’ordre des colonnes de DictWriter ?",
      "options": [
        "La liste fieldnames.",
        "La première recherche effectuée dans le catalogue.",
        "La taille du nom le plus long."
      ],
      "answer": 0,
      "explanation": "L’export annonce explicitement ses colonnes et leur ordre.",
      "id": "pyi-m5-03-q1"
    },
    {
      "question": "Quelle méthode récupère tout le texte du StringIO ?",
      "options": [
        "read() depuis sa fin sans déplacement.",
        "writeheader() sans writer.",
        "getvalue()."
      ],
      "answer": 2,
      "explanation": "getvalue exprime directement l’intention de récupérer le contenu complet.",
      "id": "pyi-m5-03-q2"
    },
    {
      "question": "Qui protège les séparateurs présents dans les noms ?",
      "options": [
        "Le navigateur après un téléchargement.",
        "Le writer CSV selon ses règles de quoting.",
        "Une concaténation sans guillemets."
      ],
      "answer": 1,
      "explanation": "Le module réel écrit les guillemets nécessaires et double les guillemets intérieurs.",
      "id": "pyi-m5-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "DictWriter",
      "definition": "Auteur CSV qui organise des dictionnaires selon fieldnames."
    },
    {
      "term": "getvalue",
      "definition": "Méthode qui retourne tout le contenu textuel d’un StringIO."
    },
    {
      "term": "quoting",
      "definition": "Protection des valeurs contenant des caractères particuliers du format."
    }
  ],
  "recap_fr": [
    "Exporter des dictionnaires avec colonnes et fins de ligne explicites.",
    "Récupérer un texte CSV complet et réutilisable sans fichier durable.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "DictWriter",
    "getvalue",
    "quoting"
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
      "title": "Python — csv.DictWriter",
      "url": "https://docs.python.org/3/library/csv.html#csv.DictWriter",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — StringIO.getvalue",
      "url": "https://docs.python.org/3/library/io.html#io.StringIO.getvalue",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

L’export transforme nos données validées en texte pour un destinataire. csv.DictWriter écrit des dictionnaires selon une liste de colonnes explicite. Le flux StringIO reste en mémoire : l’export retourne une chaîne, sans créer de fichier, ouvrir une boîte de téléchargement ou envoyer le catalogue. Cette limite fait partie du contrat du laboratoire et ne doit pas être confondue avec une sauvegarde durable des données.

Commence par choisir fieldnames, par exemple nom puis places. L’ordre des clés dans les objets reçus ne décide pas de celui des colonnes : c’est cette liste qui le fixe. writeheader écrit l’en-tête ; writerow écrit une fiche ; writerows parcourt plusieurs fiches. Même avec zéro donnée, l’en-tête doit être présent. Le lecteur reçoit ainsi le nom des colonnes et peut distinguer un tableau vide d’un document sans structure.

Le séparateur annoncé est le point-virgule. Avec lineterminator='\n', chaque ligne produite se termine par un saut de ligne, y compris la dernière. Ce choix explicite évite de dépendre du terminateur par défaut du dialecte CSV. Il s’agit d’une convention de notre export, pas d’une preuve que tous les CSV utilisent la même fin de ligne. Les tests comparent précisément la chaîne produite, sans retirer arbitrairement les retours.

Demande quoting=csv.QUOTE_ALL : DictWriter protège tous les champs et l’en-tête par des guillemets, puis double les guillemets intérieurs. Ce choix protège aussi un retour chariot isolé, pas seulement le saut de ligne choisi comme terminateur. Une construction par concaténation risquerait de fabriquer des colonnes supplémentaires ou des fiches incomplètes. Les valeurs numériques validées sont écrites sous forme textuelle ; à la lecture, il faudra toujours les convertir selon le contrat métier. Les caractères accentués restent des caractères de la chaîne Python, sans étape d’encodage en octets.

Après l’écriture, getvalue retourne l’ensemble du texte du flux. read, au contraire, lit à partir de sa position courante ; après avoir écrit à la fin, il ne retrouve rien sans déplacement préalable. L’exercice de débogage compare ces deux idées. Ici, getvalue exprime directement l’intention de récupérer tout l’export. Nous ne demandons pas de manipuler un chemin ou un fichier réel pour observer cette différence.

Valide les données avant de les transmettre à l’auteur CSV. Un booléen ne devient pas une quantité acceptable parce que l’exporteur sait en écrire une représentation. Construis des objets propres avec les colonnes retenues ; les champs supplémentaires sont alors ignorés selon la règle annoncée, sans modifier les arguments. Le mini-projet relie JSON, validation et CSV dans une fonction autonome. Teste l’en-tête seul, l’ordre des fiches, les guillemets, un retour dans un nom et un refus tardif. L’export réussi doit être réutilisable par un vrai lecteur CSV ; une erreur de contenu doit rester une vraie exception.

## Exemple guidé 1

```python
import csv
from io import StringIO

def exporter_noms_csv(noms):
    if type(noms) is not list:
        raise TypeError('liste attendue')
    if any(type(nom) is not str for nom in noms):
        raise TypeError('noms textuels attendus')
    flux = StringIO(newline='')
    auteur = csv.DictWriter(flux, fieldnames=['nom'], delimiter=';', lineterminator='\n', quoting=csv.QUOTE_ALL)
    auteur.writeheader()
    for nom in noms:
        auteur.writerow({'nom':nom})
    return flux.getvalue()

    texte = exporter_noms_csv(['École', 'Club; lecture', 'Atelier "A"'])
    print(texte, end='')
    print(repr(exporter_noms_csv([])))
```

## Exemple guidé 2

```python
import csv
from io import StringIO

def exporter_places_csv(fiches):
    if type(fiches) is not list:
        raise ValueError('liste attendue')
    propres = []
    for fiche in fiches:
        if type(fiche) is not dict or 'nom' not in fiche or 'places' not in fiche:
            raise ValueError('fiche invalide')
        nom = fiche['nom']
        places = fiche['places']
        if type(nom) is not str or not nom.strip():
            raise ValueError('nom invalide')
        if type(places) is not int or not 0 <= places <= 20:
            raise ValueError('places invalides')
        propres.append({'nom':nom.strip(), 'places':places})
    flux = StringIO(newline='')
    auteur = csv.DictWriter(flux, fieldnames=['nom', 'places'], delimiter=';', lineterminator='\n', quoting=csv.QUOTE_ALL)
    auteur.writeheader()
    auteur.writerows(propres)
    return flux.getvalue()

    fiches = [{'places':0, 'nom':' Couture '}, {'nom':'Lecture', 'places':2}]
    texte = exporter_places_csv(fiches)
    print(texte, end='')
    print(fiches[0]['nom'] == ' Couture ')
```
