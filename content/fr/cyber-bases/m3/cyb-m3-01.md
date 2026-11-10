---
{
  "id": "cyb-m3-01",
  "title_fr": "Donner le moins de droits possible",
  "course": "cyber-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "cyb-m2-03"
  ],
  "outcomes": [
    "Vérifier une autorisation avec un refus par défaut et calculer les permissions issues de plusieurs rôles.",
    "Repérer un cumul de droits interdit par la séparation des tâches."
  ],
  "idea_fr": "Chaque personne doit pouvoir faire son travail, et rien de plus ; tout ce qui n’est pas explicitement permis est refusé.",
  "analogy_fr": "Le gardien a la clé du portail, la cuisinière celle de la réserve. Personne n’a besoin du trousseau complet, et si une clé est perdue, une seule porte est exposée.",
  "examples": [
    {
      "code": "roles = {\n    \"enseignant\": [\"lire_notes\", \"saisir_notes\"],\n    \"comptable\": [\"valider_paiement\", \"lire_paiements\"],\n}\nmes_roles = [\"enseignant\", \"comptable\"]\npermissions = set()\nfor role in mes_roles:\n    permissions |= set(roles.get(role, []))\nprint(sorted(permissions))",
      "expected_output": "['lire_notes', 'lire_paiements', 'saisir_notes', 'valider_paiement']\n",
      "inputs": [],
      "trace_fr": [
        "Chaque rôle apporte sa liste de permissions.",
        "|= ajoute les éléments à l’ensemble, sans doublon.",
        "sorted rend l’affichage stable."
      ]
    },
    {
      "code": "roles = {\"eleve\": [\"lire_ses_notes\"]}\nfor role, action in [(\"eleve\", \"lire_ses_notes\"), (\"eleve\", \"saisir_notes\"), (\"visiteur\", \"lire_ses_notes\")]:\n    autorise = action in roles.get(role, [])\n    print(role, action, \"->\", \"accordé\" if autorise else \"refusé\")",
      "expected_output": "eleve lire_ses_notes -> accordé\neleve saisir_notes -> refusé\nvisiteur lire_ses_notes -> refusé\n",
      "inputs": [],
      "trace_fr": [
        "L’action figure dans la liste de l’élève : accordé.",
        "Saisir des notes n’y figure pas : refusé.",
        "Un rôle inconnu donne une liste vide : refusé par défaut."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Accorder par défaut",
      "why_fr": "Une erreur de frappe ou un rôle inconnu ouvre l’accès.",
      "fix_fr": "Refuse tout ce qui n’est pas explicitement permis."
    },
    {
      "error": "Utiliser le compte administrateur au quotidien",
      "why_fr": "Un seul piège donne tous les droits.",
      "fix_fr": "Un compte ordinaire pour le travail courant."
    },
    {
      "error": "Planter sur une personne inconnue",
      "why_fr": "Le service devient indisponible.",
      "fix_fr": "Utilise get avec une valeur par défaut."
    }
  ],
  "quiz": [
    {
      "question": "Quel principe dit « tout ce qui n’est pas permis est interdit » ?",
      "options": [
        "Moindre privilège",
        "Refus par défaut",
        "Chiffrement",
        "Sauvegarde"
      ],
      "answer": 1,
      "explanation": "Le refus par défaut ferme l’accès en cas de doute.",
      "id": "cyb-m3-01-q1"
    },
    {
      "question": "Pourquoi séparer la saisie et la validation d’un paiement ?",
      "options": [
        "Pour aller plus vite",
        "Pour qu’une seule personne ne puisse pas frauder sans contrôle",
        "Pour économiser des licences",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Deux personnes différentes créent un contrôle naturel.",
      "id": "cyb-m3-01-q2"
    },
    {
      "question": "Que renvoie {\"a\": [1]}.get(\"b\", []) ?",
      "options": [
        "None",
        "[1]",
        "[]",
        "Une erreur"
      ],
      "answer": 2,
      "explanation": "La clé est absente : la valeur par défaut est renvoyée.",
      "id": "cyb-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "autorisation",
      "definition": "Décision sur ce qu’une personne identifiée a le droit de faire."
    },
    {
      "term": "moindre privilège",
      "definition": "Principe qui accorde seulement les droits nécessaires."
    },
    {
      "term": "rôle",
      "definition": "Ensemble nommé de permissions attribué à des personnes."
    },
    {
      "term": "séparation des tâches",
      "definition": "Règle qui interdit de cumuler des actions sensibles complémentaires."
    }
  ],
  "recap_fr": [
    "Vérifier une autorisation avec un refus par défaut et calculer les permissions issues de plusieurs rôles.",
    "Repérer un cumul de droits interdit par la séparation des tâches.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "autorisation",
    "moindre privilège",
    "rôle",
    "séparation des tâches"
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
      "title": "OWASP — Autorisation",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    },
    {
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique"
    }
  ],
  "sources": [
    {
      "title": "OWASP — Autorisation",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
      "scope": "Moindre privilège et refus par défaut. Texte, exemples et exercices originaux Nunya.",
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

L’authentification répond à la question « qui es-tu ? » ; l’autorisation répond à « qu’as-tu le droit de faire ? ». Un mot de passe solide ne sert à rien si chaque compte peut tout faire. Dans beaucoup de petites structures, tout le monde utilise le compte administrateur de l’ordinateur ou du logiciel de gestion, par commodité. Le jour où ce compte est piégé, l’attaquant obtient tout.

Le principe du moindre privilège corrige cela : chaque personne reçoit exactement les droits nécessaires à sa mission. L’enseignante lit et saisit les notes de ses classes ; elle n’a pas accès aux paiements. Le secrétariat gère les inscriptions ; il ne modifie pas les notes. Même l’administrateur informatique utilise un compte ordinaire pour son travail quotidien et ne passe sur le compte administrateur que pour les tâches qui l’exigent.

Pour gérer les droits sans s’y perdre, on les regroupe en rôles. Un rôle est une liste de permissions : enseignant, secrétariat, comptable. Une personne reçoit un ou plusieurs rôles, et ses permissions sont l’union des permissions de ses rôles. En Python, un dictionnaire associe chaque rôle à sa liste de permissions, et un ensemble calcule facilement l’union sans doublon.

Le second principe est le refus par défaut. Une demande est acceptée seulement si une règle l’autorise explicitement. Un rôle inconnu, une personne absente de la liste ou une action mal orthographiée doivent mener à un refus, jamais à un accès. Dans le code, cela se traduit par dictionnaire.get(cle, []) : une clé absente donne une liste vide, donc aucune permission. Un programme qui plante sur une personne inconnue est aussi un défaut : il peut rendre le service indisponible.

Le troisième principe est la séparation des tâches. Certaines actions ne doivent jamais être réunies dans les mains d’une seule personne : saisir un paiement et le valider, créer un fournisseur et le payer. Si la même personne fait les deux, une fraude ou une erreur passe sans second regard. Un audit liste ces paires interdites et cherche les comptes qui les cumulent, souvent par accumulation de rôles au fil des années.

Enfin, les droits vieillissent. Un stagiaire part, une enseignante change de classe, mais leurs accès restent ouverts. Une revue régulière, au moins chaque trimestre, compare la liste des comptes et de leurs rôles avec la réalité de l’organisation, et retire ce qui n’a plus lieu d’être.

## Exemple guidé 1

```python
roles = {
    "enseignant": ["lire_notes", "saisir_notes"],
    "comptable": ["valider_paiement", "lire_paiements"],
}
mes_roles = ["enseignant", "comptable"]
permissions = set()
for role in mes_roles:
    permissions |= set(roles.get(role, []))
print(sorted(permissions))
```

Affichage attendu :

    ['lire_notes', 'lire_paiements', 'saisir_notes', 'valider_paiement']

Trace :

- Chaque rôle apporte sa liste de permissions.
- |= ajoute les éléments à l’ensemble, sans doublon.
- sorted rend l’affichage stable.

## Exemple guidé 2

```python
roles = {"eleve": ["lire_ses_notes"]}
for role, action in [("eleve", "lire_ses_notes"), ("eleve", "saisir_notes"), ("visiteur", "lire_ses_notes")]:
    autorise = action in roles.get(role, [])
    print(role, action, "->", "accordé" if autorise else "refusé")
```

Affichage attendu :

    eleve lire_ses_notes -> accordé
    eleve saisir_notes -> refusé
    visiteur lire_ses_notes -> refusé

Trace :

- L’action figure dans la liste de l’élève : accordé.
- Saisir des notes n’y figure pas : refusé.
- Un rôle inconnu donne une liste vide : refusé par défaut.

## Vérifier et expliquer

Dessine un tableau personnes × permissions pour une école fictive, puis entoure les cases qui ne correspondent à aucune mission réelle.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [OWASP — Autorisation](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [ANSSI — Guide d’hygiène informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
