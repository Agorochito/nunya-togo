---
{
  "id": "cyb-m1-02",
  "title_fr": "Mots de passe : la longueur avant tout",
  "course": "cyber-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "cyb-m1-01"
  ],
  "outcomes": [
    "Expliquer pourquoi la longueur protège mieux que des règles de composition compliquées.",
    "Refuser un mot de passe trop court ou présent dans une liste de mots de passe courants."
  ],
  "idea_fr": "Un mot de passe résiste quand il est long, unique et absent des listes que les attaquants essaient en premier.",
  "analogy_fr": "Un cadenas à quatre chiffres s’ouvre en essayant toutes les combinaisons un après-midi ; un cadenas à seize chiffres, jamais.",
  "examples": [
    {
      "code": "print(26 ** 8)\nprint(26 ** 16)\nprint(2000 ** 4)",
      "expected_output": "208827064576\n43608742899428874059776\n16000000000000\n",
      "inputs": [],
      "trace_fr": [
        "26 lettres, 8 caractères : environ 209 milliards de combinaisons.",
        "Doubler la longueur multiplie ce nombre par 26 puissance 8.",
        "Quatre mots tirés d’une liste de 2 000 : 16 000 milliards de combinaisons."
      ]
    },
    {
      "code": "interdits = [\"123456\", \"azerty\", \"togo2026\"]\nfor essai in [\"Azerty\", \"soleil-kara-mangue-17\"]:\n    if essai.lower() in interdits:\n        print(essai, \": interdit\")\n    else:\n        print(essai, \":\", len(essai), \"caractères\")",
      "expected_output": "Azerty : interdit\nsoleil-kara-mangue-17 : 21 caractères\n",
      "inputs": [],
      "trace_fr": [
        "Azerty en minuscules figure dans la liste : refusé.",
        "La phrase de passe n’y est pas.",
        "len compte 21 caractères, tirets compris."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Imposer des symboles plutôt que de la longueur",
      "why_fr": "Les gens choisissent alors des variantes prévisibles comme Azerty1!.",
      "fix_fr": "Demande de la longueur et vérifie une liste interdite."
    },
    {
      "error": "Réutiliser le même mot de passe",
      "why_fr": "Une seule fuite ouvre tous les comptes.",
      "fix_fr": "Un mot de passe par compte, gardé dans un gestionnaire."
    },
    {
      "error": "Comparer sans normaliser la casse",
      "why_fr": "AZERTY passe le filtre alors que azerty est interdit.",
      "fix_fr": "Compare mdp.lower() avec la liste."
    }
  ],
  "quiz": [
    {
      "question": "Qu’est-ce qui augmente le plus le nombre de combinaisons ?",
      "options": [
        "Ajouter un symbole",
        "Ajouter des caractères",
        "Mettre une majuscule au début",
        "Remplacer o par 0"
      ],
      "answer": 1,
      "explanation": "Chaque caractère multiplie le nombre de combinaisons par la taille de l’alphabet.",
      "id": "cyb-m1-02-q1"
    },
    {
      "question": "Qu’est-ce que le bourrage d’identifiants ?",
      "options": [
        "Essayer toutes les combinaisons",
        "Réutiliser des identifiants volés sur un autre site",
        "Envoyer de faux messages",
        "Bloquer un serveur"
      ],
      "answer": 1,
      "explanation": "Il exploite la réutilisation des mots de passe.",
      "id": "cyb-m1-02-q2"
    },
    {
      "question": "Quelle phrase de passe est la meilleure ?",
      "options": [
        "Togo2026!",
        "jesuisleroi",
        "pirogue-cactus-lampe-orage",
        "P@ssw0rd"
      ],
      "answer": 2,
      "explanation": "Quatre mots pris au hasard : long, mémorisable, absent des listes.",
      "id": "cyb-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "attaque par dictionnaire",
      "definition": "Essai des mots de passe les plus courants en premier."
    },
    {
      "term": "force brute",
      "definition": "Essai de toutes les combinaisons possibles."
    },
    {
      "term": "phrase de passe",
      "definition": "Suite de plusieurs mots choisis au hasard."
    },
    {
      "term": "double authentification",
      "definition": "Deuxième preuve d’identité en plus du mot de passe."
    }
  ],
  "recap_fr": [
    "Expliquer pourquoi la longueur protège mieux que des règles de composition compliquées.",
    "Refuser un mot de passe trop court ou présent dans une liste de mots de passe courants.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "attaque par dictionnaire",
    "force brute",
    "phrase de passe",
    "double authentification"
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
      "title": "NIST SP 800-63B",
      "url": "https://pages.nist.gov/800-63-4/sp800-63b.html"
    },
    {
      "title": "Cybermalveillance.gouv.fr — Mots de passe",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/mots-de-passe"
    }
  ],
  "sources": [
    {
      "title": "NIST SP 800-63B",
      "url": "https://pages.nist.gov/800-63-4/sp800-63b.html",
      "scope": "Longueur minimale, listes de mots de passe compromis. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Cybermalveillance.gouv.fr — Mots de passe",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/mots-de-passe",
      "scope": "Longueur, phrases de passe et gestionnaires. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

La plupart des comptes ne sont pas « piratés » par génie : on devine leur mot de passe. Trois attaques dominent. L’attaque par dictionnaire essaie d’abord les mots de passe les plus courants : 123456, azerty, le nom de la ville suivi de l’année. Le bourrage d’identifiants réutilise les mots de passe volés sur un autre site : si tu utilises le même partout, une seule fuite ouvre tous tes comptes. Enfin, la force brute essaie toutes les combinaisons possibles, ce qui ne fonctionne que contre les mots de passe courts.

Le nombre de combinaisons dépend de deux choses : la taille de l’alphabet utilisé et la longueur. Avec les 26 lettres minuscules, 8 caractères donnent 26 puissance 8, environ 209 milliards de possibilités : un ordinateur moderne les parcourt vite si le mot de passe est mal stocké. Chaque caractère supplémentaire multiplie ce nombre par 26. La longueur est donc le levier le plus puissant : passer de 8 à 16 caractères compte bien plus qu’ajouter un symbole obligatoire.

C’est pourquoi les recommandations récentes, comme celles du NIST américain, demandent au moins 15 caractères quand le mot de passe est le seul moyen de connexion, la vérification contre une liste de mots de passe déjà compromis ou trop courants, et l’abandon des règles qui forcent une majuscule, un chiffre et un symbole : ces règles produisent des mots de passe comme Azerty1!, prévisibles et vite oubliés.

Une phrase de passe répond à tout cela. Quatre ou cinq mots choisis au hasard, par exemple soleil-kara-mangue-pirogue, forment un secret long, facile à retenir et difficile à deviner, à condition que les mots soient vraiment pris au hasard et non tirés d’une phrase célèbre.

Deux habitudes complètent la longueur. Un mot de passe différent pour chaque compte, ce qui devient simple avec un gestionnaire de mots de passe. Et une double authentification quand le service la propose : un code reçu par SMS ou généré par une application. Même si le mot de passe fuit, l’attaquant reste bloqué.

En Python, vérifier ces règles est simple. len(mdp) donne la longueur. mdp.lower() in interdits teste la présence dans une liste, sans tenir compte des majuscules. Les exercices utilisent des mots de passe fictifs : n’écris jamais un vrai mot de passe dans un programme.

## Exemple guidé 1

```python
print(26 ** 8)
print(26 ** 16)
print(2000 ** 4)
```

Affichage attendu :

    208827064576
    43608742899428874059776
    16000000000000

Trace :

- 26 lettres, 8 caractères : environ 209 milliards de combinaisons.
- Doubler la longueur multiplie ce nombre par 26 puissance 8.
- Quatre mots tirés d’une liste de 2 000 : 16 000 milliards de combinaisons.

## Exemple guidé 2

```python
interdits = ["123456", "azerty", "togo2026"]
for essai in ["Azerty", "soleil-kara-mangue-17"]:
    if essai.lower() in interdits:
        print(essai, ": interdit")
    else:
        print(essai, ":", len(essai), "caractères")
```

Affichage attendu :

    Azerty : interdit
    soleil-kara-mangue-17 : 21 caractères

Trace :

- Azerty en minuscules figure dans la liste : refusé.
- La phrase de passe n’y est pas.
- len compte 21 caractères, tirets compris.

## Vérifier et expliquer

Calcule le nombre de combinaisons pour 10, 12 et 15 caractères minuscules, et compare l’effet d’un caractère de plus avec celui d’un symbole obligatoire.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [Cybermalveillance.gouv.fr — Mots de passe](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/mots-de-passe)
