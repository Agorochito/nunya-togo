---
{
  "id": "pyi-m5-01",
  "title_fr": "Lire et produire du JSON sans oublier le contrat",
  "course": "python-intermediaire",
  "module": "m5",
  "order": 13,
  "minutes": 20,
  "prerequisites": [
    "pyi-m4-03"
  ],
  "outcomes": [
    "Décoder et encoder du JSON avec la bibliothèque standard.",
    "Valider les structures, les types exacts et l’identité avant normalisation."
  ],
  "idea_fr": "Décoder et encoder du JSON avec la bibliothèque standard.",
  "analogy_fr": "Un club fictif prépare des fiches, les contrôle puis les échange sans modifier ses documents de départ.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "École\n3\n[\"École\",\"Couture\",\"École\"]\n",
      "trace_fr": [
        "loads retourne une liste, avec ses trois éléments et leur ordre.",
        "Les deux occurrences École restent distinctes dans la liste.",
        "dumps retourne du texte compact en conservant le caractère accentué."
      ]
    },
    {
      "inputs": [],
      "expected_output": "",
      "trace_fr": [
        "Le zéro entier est une quantité valable.",
        "strip nettoie le nom dans un nouvel objet.",
        "Le booléen true devient True et est refusé comme entier exact."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre syntaxe et contenu",
      "why_fr": "Un texte bien formé peut contenir le mauvais type de racine.",
      "fix_fr": "Valide les données après loads."
    },
    {
      "error": "Confondre Unicode et octets UTF-8",
      "why_fr": "dumps retourne str, pas un fichier ni des octets.",
      "fix_fr": "Garde l’encodage comme une étape distincte."
    }
  ],
  "quiz": [
    {
      "question": "Un JSON valide garantit-il le bon schéma métier ?",
      "options": [
        "Oui, loads vérifie tous les champs de notre club.",
        "Seulement si ensure_ascii vaut False.",
        "Non, la structure et les valeurs doivent encore être validées."
      ],
      "answer": 2,
      "explanation": "La syntaxe et le contrat de données sont deux vérifications distinctes.",
      "id": "pyi-m5-01-q1"
    },
    {
      "question": "Que produit json.dumps ?",
      "options": [
        "Une requête réseau.",
        "Une chaîne de texte.",
        "Un fichier déjà écrit en UTF-8."
      ],
      "answer": 1,
      "explanation": "L’encodage en octets et l’écriture seraient d’autres opérations, absentes ici.",
      "id": "pyi-m5-01-q2"
    },
    {
      "question": "Pourquoi refuser True comme quantité avec un test exact ?",
      "options": [
        "bool est une sous-classe de int.",
        "True n’est jamais lisible depuis JSON.",
        "Les quantités nulles sont interdites."
      ],
      "answer": 0,
      "explanation": "Un isinstance trop large accepterait un booléen malgré le contrat.",
      "id": "pyi-m5-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "JSON",
      "definition": "Format textuel d’échange de valeurs structurées."
    },
    {
      "term": "schéma",
      "definition": "Contrat décrivant les champs, leurs types et leurs règles."
    },
    {
      "term": "sérialisation",
      "definition": "Transformation de données en représentation textuelle."
    }
  ],
  "recap_fr": [
    "Décoder et encoder du JSON avec la bibliothèque standard.",
    "Valider les structures, les types exacts et l’identité avant normalisation.",
    "Distinguer les données en mémoire, leurs formats et les limites des vérifications."
  ],
  "tags": [
    "JSON",
    "schéma",
    "sérialisation"
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
      "title": "Python — json",
      "url": "https://docs.python.org/3/library/json.html",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Boolean type",
      "url": "https://docs.python.org/3/library/stdtypes.html#boolean-type-bool",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un format d’échange décrit comment représenter des données pour un autre programme. JSON représente notamment des objets, tableaux, textes, nombres, booléens et valeurs nulles. Ce n’est pas du code Python à exécuter. Une chaîne JSON utilise des guillemets doubles pour ses textes ; true, false et null deviennent respectivement True, False et None après lecture. Un document syntaxiquement correct peut pourtant décrire autre chose que le catalogue attendu.

La bibliothèque standard fournit le module json. L’instruction import json rend son nom disponible ; json.loads transforme un texte en données Python. Elle ne lit ici aucun fichier. Inversement, json.dumps produit une chaîne depuis des données compatibles. La lettre s rappelle que ces opérations utilisent une chaîne, contrairement à d’autres variantes destinées aux flux. Nous restons entièrement en mémoire, sans création de fichier durable ni téléchargement.

Une syntaxe incorrecte provoque json.JSONDecodeError. Notre petite fonction decoder_json capture précisément cette exception et l’expose comme ValueError avec le message JSON invalide. Elle refuse aussi un argument qui n’est pas un texte avec TypeError. Cette traduction donne un contrat stable à l’appelant sans cacher les autres défauts du programme. N’utilise ni eval ni une capture générale de toutes les exceptions pour interpréter le document.

Après la syntaxe, vérifie la structure puis les valeurs. Une liste de noms doit réellement être une liste, chaque élément un texte non vide après strip. Une fiche de stock demande un objet avec les champs annoncés. Le nombre zéro peut être valable, mais True ne doit pas être accepté comme quantité : bool est une sous-classe de int. Pour exiger un entier exact dans ce contrat, teste type(valeur) is int. Un nombre écrit entre guillemets reste un texte ; il n’est pas converti silencieusement.

Pour produire le JSON, ensure_ascii=False conserve les caractères comme é dans la chaîne retournée. Ce paramètre ne transforme pas cette chaîne en octets UTF-8 : l’encodage serait une étape distincte, absente de cet atelier. separators=(',', ':') demande une représentation compacte sans espaces supplémentaires entre les éléments. L’ordre des listes est conservé ; les objets canoniques sont construits avec les champs dans l’ordre annoncé.

Le mini-projet normalise des fiches id, nom et places. Il contrôle toute la liste, refuse les identifiants dupliqués, nettoie les noms et produit uniquement ces trois champs ; les champs supplémentaires sont ignorés explicitement. Les données initiales ne sont pas modifiées. Vérifie une liste vide, des accents, un zéro, un booléen et une erreur située après une fiche valide. Réussir la lecture syntaxique ne constitue pas une validation métier. Les noms et stocks sont fictifs ; Nunya conserve ton code et ta progression, pas un document exporté sur disque.

## Exemple guidé 1

```python
import json

texte = '["École", "Couture", "École"]'
noms = json.loads(texte)
print(noms[0])
print(len(noms))
print(json.dumps(noms, ensure_ascii=False, separators=(',', ':')))
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
def lire_stock_json(texte):
    fiche = decoder_json(texte)
    if type(fiche) is not dict:
        raise ValueError('objet attendu')
    if 'nom' not in fiche or 'quantite' not in fiche:
        raise ValueError('champs manquants')
    if type(fiche['nom']) is not str or not fiche['nom'].strip():
        raise ValueError('nom invalide')
    quantite = fiche['quantite']
    if type(quantite) is not int or quantite < 0:
        raise ValueError('quantite invalide')
    return {'nom':fiche['nom'].strip(), 'quantite':quantite}

    print(lire_stock_json('{"nom":"  Cahiers  ","quantite":0}'))
    try:
        lire_stock_json('{"nom":"Cahiers","quantite":true}')
    except ValueError as erreur:
        print(str(erreur))
```
