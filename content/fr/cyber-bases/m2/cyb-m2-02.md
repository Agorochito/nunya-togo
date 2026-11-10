---
{
  "id": "cyb-m2-02",
  "title_fr": "Lire un journal de connexions",
  "course": "cyber-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "cyb-m2-01"
  ],
  "outcomes": [
    "Découper une ligne de journal en champs et compter les échecs par adresse IP.",
    "Repérer une attaque par force brute et un succès suspect après une série d’échecs."
  ],
  "idea_fr": "Un journal raconte ce qui s’est passé ; compter et regrouper ses lignes fait apparaître les attaques.",
  "analogy_fr": "Le cahier du gardien note chaque entrée. Une seule tentative ratée ne dit rien ; vingt essais de clés à la même porte en cinq minutes, si.",
  "examples": [
    {
      "code": "ligne = \"2026-11-09 08:15:02 ECHEC kodjo 10.0.0.7\"\ndate, heure, statut, compte, ip = ligne.split()\nprint(statut, compte, ip)",
      "expected_output": "ECHEC kodjo 10.0.0.7\n",
      "inputs": [],
      "trace_fr": [
        "split() découpe aux espaces.",
        "Les cinq morceaux vont dans cinq variables, dans l’ordre.",
        "On affiche le statut, le compte et l’adresse."
      ]
    },
    {
      "code": "from collections import Counter\n\njournal = [\n    \"2026-11-09 08:15:02 ECHEC kodjo 10.0.0.7\",\n    \"2026-11-09 08:15:09 ECHEC kodjo 10.0.0.7\",\n    \"2026-11-09 08:16:40 SUCCES ama 10.0.0.12\",\n    \"2026-11-09 08:17:03 ECHEC admin 10.0.0.7\",\n]\nechecs = Counter(l.split()[4] for l in journal if l.split()[2] == \"ECHEC\")\nprint(echecs.most_common())",
      "expected_output": "[('10.0.0.7', 3)]\n",
      "inputs": [],
      "trace_fr": [
        "Seules les lignes ECHEC sont gardées.",
        "Counter compte chaque adresse IP.",
        "most_common trie de la plus fréquente à la moins fréquente."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser des indices partout",
      "why_fr": "ligne[4] est illisible et source d’erreurs.",
      "fix_fr": "Range les champs dans un dictionnaire nommé."
    },
    {
      "error": "Ignorer l’ordre des lignes",
      "why_fr": "Un succès avant les échecs n’a pas le même sens qu’après.",
      "fix_fr": "Parcours le journal dans l’ordre et tiens les comptes à jour."
    },
    {
      "error": "Journaliser les mots de passe essayés",
      "why_fr": "Le journal devient lui-même une fuite.",
      "fix_fr": "Note le compte et l’adresse, jamais le secret."
    }
  ],
  "quiz": [
    {
      "question": "Que révèle une adresse IP avec 40 échecs en deux minutes ?",
      "options": [
        "Une panne",
        "Une attaque probable par force brute",
        "Un utilisateur normal",
        "Rien"
      ],
      "answer": 1,
      "explanation": "La répétition rapide est la signature d’essais automatisés.",
      "id": "cyb-m2-02-q1"
    },
    {
      "question": "Que renvoie Counter([\"a\", \"b\", \"a\"]).most_common() ?",
      "options": [
        "[('a', 2), ('b', 1)]",
        "['a', 'b']",
        "{'a': 2}",
        "2"
      ],
      "answer": 0,
      "explanation": "Une liste de paires (élément, compte), de la plus fréquente à la moins fréquente.",
      "id": "cyb-m2-02-q2"
    },
    {
      "question": "Quel événement est le plus grave ?",
      "options": [
        "Un échec isolé",
        "Un succès après dix échecs depuis la même IP",
        "Un succès habituel",
        "Une déconnexion"
      ],
      "answer": 1,
      "explanation": "Le mot de passe a probablement été trouvé.",
      "id": "cyb-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "journal",
      "definition": "Fichier où un système note ses événements, une ligne par événement."
    },
    {
      "term": "adresse IP",
      "definition": "Identifiant numérique d’un appareil sur un réseau."
    },
    {
      "term": "Counter",
      "definition": "Dictionnaire de collections qui compte des éléments."
    },
    {
      "term": "seuil",
      "definition": "Valeur à partir de laquelle un comptage déclenche une alerte."
    }
  ],
  "recap_fr": [
    "Découper une ligne de journal en champs et compter les échecs par adresse IP.",
    "Repérer une attaque par force brute et un succès suspect après une série d’échecs.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "journal",
    "adresse IP",
    "Counter",
    "seuil"
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
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html"
    },
    {
      "title": "OWASP — Journalisation",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
    }
  ],
  "sources": [
    {
      "title": "Python — collections",
      "url": "https://docs.python.org/fr/3/library/collections.html",
      "scope": "Counter et defaultdict pour compter des événements. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "OWASP — Journalisation",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
      "scope": "Événements à journaliser et à surveiller. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un journal, ou log, est un fichier où un système note ses événements, une ligne par événement. Les journaux de connexion sont les plus utiles pour la défense : chaque tentative y apparaît avec sa date, son heure, son résultat, le compte visé et l’adresse IP d’origine. Dans ce cours, une ligne a la forme 2026-11-09 08:15:02 ECHEC kodjo 10.0.0.7. Les vrais formats varient, mais la méthode reste la même.

La première étape est de découper. Comme les champs sont séparés par des espaces, ligne.split() renvoie une liste de cinq éléments, que l’on peut ranger directement dans cinq variables. Il est souvent plus clair de construire un dictionnaire avec des clés nommées : statut, compte, ip. Le reste du programme lit alors ligne["ip"] au lieu de ligne[4], ce qui évite les erreurs d’indice.

La deuxième étape est de compter. Une connexion ratée est banale : une faute de frappe suffit. Ce qui alerte, c’est la répétition. Le module collections fournit Counter, un dictionnaire spécialisé qui compte les éléments qu’on lui donne. Compter les échecs par adresse IP fait ressortir celles qui essaient sans relâche : c’est la signature d’une attaque par force brute ou par dictionnaire. most_common() les trie de la plus active à la moins active.

Un seuil transforme ces comptes en alertes : par exemple, cinq échecs ou plus depuis la même adresse. Le choix du seuil est un compromis. Trop bas, il déclenche des alertes pour des utilisateurs distraits ; trop haut, il laisse passer des attaques lentes. On l’ajuste en observant le journal habituel de l’organisation.

Le signal le plus grave est un succès qui suit une série d’échecs depuis la même adresse : l’attaquant a probablement fini par trouver le mot de passe. Pour le repérer, on parcourt le journal dans l’ordre en tenant à jour le nombre d’échecs de chaque adresse ; quand un succès arrive d’une adresse qui dépasse déjà le seuil, on signale le compte concerné. L’ordre des lignes compte : un échec arrivé après le succès ne prouve rien sur ce succès.

Un journal n’est utile que s’il existe, s’il est conservé assez longtemps et s’il ne peut pas être effacé facilement par un intrus. Il doit aussi éviter de contenir des secrets : on journalise le nom du compte, jamais le mot de passe essayé. Ces règles viennent des recommandations de l’OWASP sur la journalisation.

## Exemple guidé 1

```python
ligne = "2026-11-09 08:15:02 ECHEC kodjo 10.0.0.7"
date, heure, statut, compte, ip = ligne.split()
print(statut, compte, ip)
```

Affichage attendu :

    ECHEC kodjo 10.0.0.7

Trace :

- split() découpe aux espaces.
- Les cinq morceaux vont dans cinq variables, dans l’ordre.
- On affiche le statut, le compte et l’adresse.

## Exemple guidé 2

```python
from collections import Counter

journal = [
    "2026-11-09 08:15:02 ECHEC kodjo 10.0.0.7",
    "2026-11-09 08:15:09 ECHEC kodjo 10.0.0.7",
    "2026-11-09 08:16:40 SUCCES ama 10.0.0.12",
    "2026-11-09 08:17:03 ECHEC admin 10.0.0.7",
]
echecs = Counter(l.split()[4] for l in journal if l.split()[2] == "ECHEC")
print(echecs.most_common())
```

Affichage attendu :

    [('10.0.0.7', 3)]

Trace :

- Seules les lignes ECHEC sont gardées.
- Counter compte chaque adresse IP.
- most_common trie de la plus fréquente à la moins fréquente.

## Vérifier et expliquer

Recopie le journal de l’exemple sur papier, compte les échecs par adresse, puis vérifie que ton programme trouve les mêmes nombres.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — collections](https://docs.python.org/fr/3/library/collections.html)
- [OWASP — Journalisation](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
