---
{
  "id": "cyb-m1-03",
  "title_fr": "Stocker un mot de passe : hachage et sel",
  "course": "cyber-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "cyb-m1-02"
  ],
  "outcomes": [
    "Calculer une empreinte SHA-256 et expliquer pourquoi on ne peut pas la « déchiffrer ».",
    "Ajouter un sel unique par compte et vérifier un mot de passe sans jamais le stocker en clair."
  ],
  "idea_fr": "Un site ne devrait jamais connaître ton mot de passe : il garde seulement une empreinte qui permet de vérifier, pas de retrouver.",
  "analogy_fr": "Au tampon de la mairie, on reconnaît un document authentique sans pouvoir reconstituer le document à partir du tampon.",
  "examples": [
    {
      "code": "import hashlib\n\nfor mot in [\"mangue\", \"mangue\", \"Mangue\"]:\n    print(hashlib.sha256(mot.encode(\"utf-8\")).hexdigest()[:16])",
      "expected_output": "6689a82b97c3fba4\n6689a82b97c3fba4\n8c29d3502159568d\n",
      "inputs": [],
      "trace_fr": [
        "Le même mot donne deux fois la même empreinte.",
        "Une seule majuscule change tout le résultat.",
        "Seuls les 16 premiers caractères sont affichés ici."
      ]
    },
    {
      "code": "import hashlib\n\ndef empreinte(mot_de_passe, sel):\n    return hashlib.sha256((sel + mot_de_passe).encode(\"utf-8\")).hexdigest()\n\na = empreinte(\"mangue\", \"k3f9\")\nb = empreinte(\"mangue\", \"x7q2\")\nprint(a == b)\nprint(empreinte(\"mangue\", \"k3f9\") == a)",
      "expected_output": "False\nTrue\n",
      "inputs": [],
      "trace_fr": [
        "Le même mot de passe avec deux sels donne deux empreintes différentes.",
        "Avec le même sel, l’empreinte est identique : la vérification fonctionne."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Stocker le mot de passe en clair",
      "why_fr": "Une seule fuite expose tous les comptes.",
      "fix_fr": "Ne garde que le sel et l’empreinte."
    },
    {
      "error": "Utiliser le même sel pour tous",
      "why_fr": "Deux mots de passe identiques donnent la même empreinte.",
      "fix_fr": "Un sel aléatoire par compte."
    },
    {
      "error": "Dire qu’on « déchiffre » une empreinte",
      "why_fr": "Le hachage est à sens unique.",
      "fix_fr": "On vérifie en hachant la saisie, puis on compare."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi ajoute-t-on un sel ?",
      "options": [
        "Pour cacher le mot de passe",
        "Pour que deux mots de passe identiques n’aient pas la même empreinte",
        "Pour accélérer le hachage",
        "Pour pouvoir déchiffrer"
      ],
      "answer": 1,
      "explanation": "Le sel rend chaque empreinte unique, même pour des mots de passe identiques.",
      "id": "cyb-m1-03-q1"
    },
    {
      "question": "Le sel doit-il rester secret ?",
      "options": [
        "Oui, comme le mot de passe",
        "Non, il est stocké à côté de l’empreinte",
        "Il doit être envoyé par SMS",
        "Il n’existe pas"
      ],
      "answer": 1,
      "explanation": "Sa valeur vient de son unicité, pas du secret.",
      "id": "cyb-m1-03-q2"
    },
    {
      "question": "Quelle fonction choisir pour un vrai site ?",
      "options": [
        "SHA-256 seul",
        "Argon2id ou scrypt",
        "Base64",
        "Le mot de passe en clair"
      ],
      "answer": 1,
      "explanation": "Les fonctions lentes et salées freinent les attaques par essais massifs.",
      "id": "cyb-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "hachage",
      "definition": "Transformation à sens unique d’un texte en empreinte de taille fixe."
    },
    {
      "term": "empreinte",
      "definition": "Résultat du hachage, aussi appelé condensat."
    },
    {
      "term": "sel",
      "definition": "Valeur aléatoire propre à chaque compte, ajoutée avant le hachage."
    },
    {
      "term": "compare_digest",
      "definition": "Comparaison en temps constant de deux empreintes."
    }
  ],
  "recap_fr": [
    "Calculer une empreinte SHA-256 et expliquer pourquoi on ne peut pas la « déchiffrer ».",
    "Ajouter un sel unique par compte et vérifier un mot de passe sans jamais le stocker en clair.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "hachage",
    "empreinte",
    "sel",
    "compare_digest"
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
      "title": "OWASP — Stockage des mots de passe",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
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
      "title": "OWASP — Stockage des mots de passe",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
      "scope": "Hachage lent et salé : Argon2id, scrypt, PBKDF2. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Imagine la base de données d’une école où les mots de passe sont écrits en clair. Le jour où un ordinateur est volé ou une sauvegarde fuit, tous les comptes sont ouverts, et souvent d’autres comptes des mêmes personnes, puisque beaucoup réutilisent leurs mots de passe. Stocker un mot de passe en clair est donc une faute grave.

La solution est le hachage. Une fonction de hachage, comme SHA-256, transforme n’importe quel texte en une empreinte de taille fixe : 64 caractères hexadécimaux. Elle a trois propriétés utiles. Elle est déterministe : le même texte donne toujours la même empreinte. Elle est à sens unique : on ne peut pas remonter de l’empreinte au texte. Et une infime différence, une seule majuscule, change complètement le résultat. Au moment de la connexion, le site hache le mot de passe saisi et compare avec l’empreinte enregistrée : il vérifie sans jamais conserver le secret.

En Python, hashlib.sha256 travaille sur des octets. On convertit d’abord le texte avec encode("utf-8"), puis hexdigest() renvoie l’empreinte lisible.

Le hachage seul ne suffit pas. Comme il est déterministe, deux personnes qui ont le même mot de passe ont la même empreinte, et un attaquant peut préparer à l’avance les empreintes de millions de mots de passe courants. On ajoute donc un sel : une petite valeur aléatoire, différente pour chaque compte, collée au mot de passe avant le hachage. Le sel n’est pas secret ; il est stocké à côté de l’empreinte. Mais il oblige l’attaquant à recommencer tout son travail pour chaque compte.

Pour comparer deux empreintes, préfère hmac.compare_digest à ==. Cette fonction met toujours le même temps à répondre, ce qui empêche de deviner une empreinte caractère par caractère en mesurant le temps de réponse.

Une précision honnête : SHA-256 est très rapide, ce qui avantage aussi l’attaquant qui essaie des milliards de mots de passe. En production, on utilise des fonctions volontairement lentes et salées, conçues pour cet usage : Argon2id, scrypt ou PBKDF2, comme le recommande l’OWASP. Ce cours utilise SHA-256 avec un sel pour comprendre le mécanisme, qui est exactement le même.

Retiens enfin le vocabulaire. Hacher n’est pas chiffrer : un texte chiffré peut être déchiffré avec une clé, une empreinte ne se déchiffre pas. Si un service est capable de t’envoyer ton ancien mot de passe par message, c’est qu’il le stocke mal.

## Exemple guidé 1

```python
import hashlib

for mot in ["mangue", "mangue", "Mangue"]:
    print(hashlib.sha256(mot.encode("utf-8")).hexdigest()[:16])
```

Affichage attendu :

    6689a82b97c3fba4
    6689a82b97c3fba4
    8c29d3502159568d

Trace :

- Le même mot donne deux fois la même empreinte.
- Une seule majuscule change tout le résultat.
- Seuls les 16 premiers caractères sont affichés ici.

## Exemple guidé 2

```python
import hashlib

def empreinte(mot_de_passe, sel):
    return hashlib.sha256((sel + mot_de_passe).encode("utf-8")).hexdigest()

a = empreinte("mangue", "k3f9")
b = empreinte("mangue", "x7q2")
print(a == b)
print(empreinte("mangue", "k3f9") == a)
```

Affichage attendu :

    False
    True

Trace :

- Le même mot de passe avec deux sels donne deux empreintes différentes.
- Avec le même sel, l’empreinte est identique : la vérification fonctionne.

## Vérifier et expliquer

Calcule l’empreinte d’un même mot avec et sans majuscule, puis avec deux sels différents. Explique pourquoi un attaquant ne peut pas « remonter » de l’empreinte au mot.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — hashlib](https://docs.python.org/fr/3/library/hashlib.html)
- [OWASP — Stockage des mots de passe](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
