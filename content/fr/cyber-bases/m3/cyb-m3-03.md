---
{
  "id": "cyb-m3-03",
  "title_fr": "Encoder, chiffrer, hacher : vérifier l’intégrité",
  "course": "cyber-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "cyb-m3-02"
  ],
  "outcomes": [
    "Distinguer encodage, chiffrement et hachage, et expliquer pourquoi le chiffrement de César est faible.",
    "Vérifier l’intégrité de fichiers en comparant leurs empreintes avec un manifeste."
  ],
  "idea_fr": "Encoder rend lisible par une machine, chiffrer cache avec une clé, hacher résume sans retour possible ; chacun répond à un besoin différent.",
  "analogy_fr": "Traduire une lettre en anglais n’est pas la cacher ; la mettre dans un coffre l’est. Et le sceau sur l’enveloppe ne cache rien, mais montre si on l’a ouverte.",
  "examples": [
    {
      "code": "import base64\n\ncode = base64.b64encode(\"motdepasse\".encode(\"utf-8\")).decode()\nprint(code)\nprint(base64.b64decode(code).decode(\"utf-8\"))",
      "expected_output": "bW90ZGVwYXNzZQ==\nmotdepasse\n",
      "inputs": [],
      "trace_fr": [
        "b64encode transforme les octets en texte Base64.",
        "b64decode retrouve le texte d’origine sans aucune clé.",
        "Base64 n’offre donc aucune confidentialité."
      ]
    },
    {
      "code": "def cesar(texte, decalage):\n    resultat = \"\"\n    for c in texte:\n        if \"a\" <= c <= \"z\":\n            resultat += chr((ord(c) - ord(\"a\") + decalage) % 26 + ord(\"a\"))\n        else:\n            resultat += c\n    return resultat\n\nsecret = cesar(\"rendez-vous au zoo\", 3)\nprint(secret)\nprint(cesar(secret, -3))",
      "expected_output": "uhqghc-yrxv dx crr\nrendez-vous au zoo\n",
      "inputs": [],
      "trace_fr": [
        "ord donne le rang d’une lettre ; % 26 fait revenir après z.",
        "z décalé de 3 devient c.",
        "Le décalage inverse retrouve le message."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Croire que Base64 protège",
      "why_fr": "C’est un encodage, sans clé.",
      "fix_fr": "Chiffre avec une bibliothèque reconnue si la confidentialité compte."
    },
    {
      "error": "Inventer son propre chiffrement",
      "why_fr": "Les algorithmes maison se cassent vite.",
      "fix_fr": "Utilise AES via une bibliothèque éprouvée."
    },
    {
      "error": "Garder le manifeste à côté des fichiers",
      "why_fr": "L’intrus modifie aussi les empreintes.",
      "fix_fr": "Range le manifeste hors ligne ou en lecture seule."
    }
  ],
  "quiz": [
    {
      "question": "Lequel est réversible sans clé ?",
      "options": [
        "Le hachage",
        "Le chiffrement AES",
        "L’encodage Base64",
        "Aucun"
      ],
      "answer": 2,
      "explanation": "Base64 se décode sans aucun secret.",
      "id": "cyb-m3-03-q1"
    },
    {
      "question": "Combien de clés possibles pour le chiffrement de César sur 26 lettres ?",
      "options": [
        "26",
        "256",
        "Des milliards",
        "Une infinité"
      ],
      "answer": 0,
      "explanation": "Un programme les essaie toutes instantanément.",
      "id": "cyb-m3-03-q2"
    },
    {
      "question": "Un fichier présent sur le disque mais absent du manifeste est…",
      "options": [
        "Intact",
        "Modifié",
        "Nouveau, à examiner",
        "Manquant"
      ],
      "answer": 2,
      "explanation": "Un fichier inattendu peut avoir été déposé par un intrus.",
      "id": "cyb-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "encodage",
      "definition": "Changement de représentation d’une donnée, sans clé ni secret."
    },
    {
      "term": "chiffrement",
      "definition": "Transformation réversible avec une clé, pour la confidentialité."
    },
    {
      "term": "intégrité",
      "definition": "Garantie qu’une donnée n’a pas été modifiée."
    },
    {
      "term": "manifeste",
      "definition": "Liste de fichiers et de leurs empreintes de référence."
    }
  ],
  "recap_fr": [
    "Distinguer encodage, chiffrement et hachage, et expliquer pourquoi le chiffrement de César est faible.",
    "Vérifier l’intégrité de fichiers en comparant leurs empreintes avec un manifeste.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "encodage",
    "chiffrement",
    "intégrité",
    "manifeste"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "debutant",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Journaux, comptes, adresses et messages sont fictifs ; aucun réseau, aucun système réel n’est sondé ni attaqué.",
  "references": [
    {
      "title": "Python — hashlib",
      "url": "https://docs.python.org/fr/3/library/hashlib.html"
    },
    {
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique"
    }
  ],
  "sources": [
    {
      "title": "Python — hashlib",
      "url": "https://docs.python.org/fr/3/library/hashlib.html",
      "scope": "Empreintes SHA-256 et encodage des octets. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique",
      "scope": "Mesures de base pour une petite organisation. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Trois opérations sont souvent confondues, et cette confusion provoque de vraies failles. L’encodage change seulement la représentation d’une donnée pour qu’une machine la transporte : Base64, par exemple, transforme des octets en lettres et chiffres. Il n’y a aucune clé ; n’importe qui décode en une ligne. Un mot de passe « protégé » en Base64 est en réalité écrit en clair.

Le chiffrement transforme un message pour qu’il soit illisible sans une clé. Il est réversible pour qui possède la clé. On l’utilise pour la confidentialité : les sites en https chiffrent les échanges, les téléphones chiffrent leur stockage, les messageries chiffrent les conversations.

Le chiffrement de César, utilisé dans l’Antiquité, décale chaque lettre d’un nombre fixe de positions : avec un décalage de 3, a devient d, b devient e. Il illustre bien l’idée de clé, mais il est trivial à casser : il n’existe que 26 décalages possibles, et un programme les essaie tous en un instant. C’est une attaque par force brute sur un espace de clés minuscule. Les algorithmes modernes, comme AES, ont des clés de 128 ou 256 bits : le nombre de clés possibles dépasse tout ce qu’on peut essayer. Règle d’or : on n’invente jamais son propre chiffrement, on utilise des bibliothèques reconnues.

Le hachage, vu au premier module, produit une empreinte à sens unique. Il ne sert pas à cacher mais à vérifier. Au-delà des mots de passe, il protège l’intégrité : si un fichier change d’un seul caractère, son empreinte change complètement.

Cette propriété permet de détecter des modifications. On calcule une fois l’empreinte de chaque fichier important et on l’enregistre dans un manifeste, rangé à l’abri. Plus tard, on recalcule les empreintes et on compare. Un fichier dont l’empreinte diffère a été modifié ; un fichier du manifeste qui a disparu est manquant ; un fichier présent mais absent du manifeste est nouveau, ce qui peut révéler un programme malveillant déposé par un intrus. Les éditeurs de logiciels publient aussi l’empreinte de leurs fichiers à télécharger : on vérifie ainsi que le fichier reçu n’a pas été altéré en chemin.

Attention : le manifeste doit être conservé là où l’attaquant ne peut pas le modifier, par exemple sur un support hors ligne. Sinon, un intrus qui change un fichier change aussi son empreinte dans le manifeste, et la vérification ne voit plus rien.

## Exemple guidé 1

```python
import base64

code = base64.b64encode("motdepasse".encode("utf-8")).decode()
print(code)
print(base64.b64decode(code).decode("utf-8"))
```

Affichage attendu :

    bW90ZGVwYXNzZQ==
    motdepasse

Trace :

- b64encode transforme les octets en texte Base64.
- b64decode retrouve le texte d’origine sans aucune clé.
- Base64 n’offre donc aucune confidentialité.

## Exemple guidé 2

```python
def cesar(texte, decalage):
    resultat = ""
    for c in texte:
        if "a" <= c <= "z":
            resultat += chr((ord(c) - ord("a") + decalage) % 26 + ord("a"))
        else:
            resultat += c
    return resultat

secret = cesar("rendez-vous au zoo", 3)
print(secret)
print(cesar(secret, -3))
```

Affichage attendu :

    uhqghc-yrxv dx crr
    rendez-vous au zoo

Trace :

- ord donne le rang d’une lettre ; % 26 fait revenir après z.
- z décalé de 3 devient c.
- Le décalage inverse retrouve le message.

## Vérifier et expliquer

Chiffre une phrase avec César, échange-la avec un camarade sans donner le décalage, et chronomètre combien de temps il faut pour la casser avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — hashlib](https://docs.python.org/fr/3/library/hashlib.html)
- [ANSSI — Guide d’hygiène informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
