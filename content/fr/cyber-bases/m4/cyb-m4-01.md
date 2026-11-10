---
{
  "id": "cyb-m4-01",
  "title_fr": "Sauvegarder pour survivre à un rançongiciel",
  "course": "cyber-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "cyb-m3-03"
  ],
  "outcomes": [
    "Vérifier qu’un plan de sauvegarde respecte la règle 3-2-1.",
    "Calculer la perte de données maximale et repérer les sauvegardes en retard avec datetime."
  ],
  "idea_fr": "Une sauvegarde n’existe vraiment que si elle est séparée, récente et testée ; c’est la dernière défense quand tout le reste a échoué.",
  "analogy_fr": "Le paysan garde des semences dans le grenier, chez son frère au village voisin et dans une jarre enterrée : un incendie ne lui enlève pas toute la récolte suivante.",
  "examples": [
    {
      "code": "copies = [\n    {\"support\": \"disque\", \"lieu\": \"bureau\"},\n    {\"support\": \"clé\", \"lieu\": \"bureau\"},\n    {\"support\": \"nuage\", \"lieu\": \"hors site\"},\n]\nsupports = {c[\"support\"] for c in copies}\nhors_site = any(c[\"lieu\"] != \"bureau\" for c in copies)\nprint(len(copies), len(supports), hors_site)",
      "expected_output": "3 3 True\n",
      "inputs": [],
      "trace_fr": [
        "Trois copies.",
        "Un ensemble compte les supports distincts : trois.",
        "any trouve au moins une copie hors du bureau."
      ]
    },
    {
      "code": "from datetime import datetime\n\nderniere = datetime.strptime(\"2026-11-08 02:00\", \"%Y-%m-%d %H:%M\")\nmaintenant = datetime.strptime(\"2026-11-09 18:00\", \"%Y-%m-%d %H:%M\")\nprint((maintenant - derniere).total_seconds() / 3600)",
      "expected_output": "40.0\n",
      "inputs": [],
      "trace_fr": [
        "La soustraction de deux dates donne une durée.",
        "total_seconds / 3600 convertit en heures.",
        "Le changement de jour est compté : 40 heures."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Laisser le disque de sauvegarde branché",
      "why_fr": "Le rançongiciel le chiffre avec le reste.",
      "fix_fr": "Débranche-le après chaque sauvegarde."
    },
    {
      "error": "Ne jamais tester la restauration",
      "why_fr": "La sauvegarde peut être vide ou illisible.",
      "fix_fr": "Fais une restauration d’essai régulièrement."
    },
    {
      "error": "Soustraire seulement les heures affichées",
      "why_fr": "Le changement de jour est oublié.",
      "fix_fr": "Soustrais des objets datetime complets."
    }
  ],
  "quiz": [
    {
      "question": "Que signifie le « 1 » de la règle 3-2-1 ?",
      "options": [
        "Une sauvegarde par jour",
        "Une copie hors site",
        "Un seul support",
        "Une personne responsable"
      ],
      "answer": 1,
      "explanation": "Une copie ailleurs protège contre l’incendie ou le vol.",
      "id": "cyb-m4-01-q1"
    },
    {
      "question": "Sauvegarde chaque jour à 2 h, panne à 20 h : combien d’heures perdues au plus ?",
      "options": [
        "2",
        "18",
        "20",
        "24"
      ],
      "answer": 1,
      "explanation": "Tout ce qui a été fait depuis 2 h, soit 18 heures.",
      "id": "cyb-m4-01-q2"
    },
    {
      "question": "Faut-il payer la rançon d’un rançongiciel ?",
      "options": [
        "Oui, c’est plus rapide",
        "Non : rien ne garantit la restitution et cela finance les attaquants",
        "Oui si le montant est faible",
        "Seulement en mobile money"
      ],
      "answer": 1,
      "explanation": "On restaure depuis une sauvegarde et on signale l’incident.",
      "id": "cyb-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "rançongiciel",
      "definition": "Logiciel malveillant qui chiffre les données et réclame une rançon."
    },
    {
      "term": "règle 3-2-1",
      "definition": "Trois copies, deux supports, une copie hors site."
    },
    {
      "term": "restauration",
      "definition": "Récupération des données à partir d’une sauvegarde."
    },
    {
      "term": "timedelta",
      "definition": "Durée obtenue en soustrayant deux dates en Python."
    }
  ],
  "recap_fr": [
    "Vérifier qu’un plan de sauvegarde respecte la règle 3-2-1.",
    "Calculer la perte de données maximale et repérer les sauvegardes en retard avec datetime.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "rançongiciel",
    "règle 3-2-1",
    "restauration",
    "timedelta"
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
      "title": "Cybermalveillance.gouv.fr — Sauvegardes",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes"
    },
    {
      "title": "Python — datetime",
      "url": "https://docs.python.org/fr/3/library/datetime.html"
    },
    {
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique"
    }
  ],
  "sources": [
    {
      "title": "Cybermalveillance.gouv.fr — Sauvegardes",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes",
      "scope": "Copies régulières, hors ligne et testées. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — datetime",
      "url": "https://docs.python.org/fr/3/library/datetime.html",
      "scope": "Lire et comparer des dates et heures. Texte, exemples et exercices originaux Nunya.",
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

Un rançongiciel chiffre les fichiers d’un ordinateur, puis de tout le réseau qu’il peut atteindre, et réclame une rançon pour les rendre. Payer ne garantit rien et finance les attaquants. La vraie protection est d’avoir une copie récente et intacte de ses données. Les pannes de disque, les vols d’ordinateur, les incendies et les erreurs humaines rendent les sauvegardes tout aussi nécessaires.

La règle 3-2-1 résume un bon plan. Trois copies des données : l’original et deux sauvegardes. Deux supports différents : par exemple un disque externe et un service en ligne, pour qu’un même défaut ne détruise pas tout. Une copie hors site : chez une autre personne de confiance, dans un autre bâtiment ou dans un service distant, pour survivre à un incendie ou à un vol. Face aux rançongiciels, on ajoute une exigence : une copie hors ligne, débranchée après la sauvegarde. Un disque resté branché en permanence sera chiffré avec le reste.

La fréquence décide de ce qu’on peut perdre. Si on sauvegarde chaque nuit à 2 h, une panne à 18 h fait perdre seize heures de travail. La perte de données maximale est le plus long intervalle entre deux sauvegardes. Pour une boutique qui enregistre des ventes toute la journée, une sauvegarde par jour peut suffire ; pour un service de paiement, non.

En Python, datetime.strptime transforme une date écrite en objet date. La différence de deux dates donne une durée, un timedelta, dont total_seconds() divisé par 3600 donne des heures. Ce calcul tient compte du changement de jour, contrairement à une simple soustraction des heures affichées.

La règle la plus oubliée est la plus importante : tester la restauration. Beaucoup d’organisations découvrent le jour de la panne que leurs sauvegardes étaient vides, incomplètes ou illisibles. Une restauration d’essai, au moins tous les trois mois, prouve que la sauvegarde fonctionne et que quelqu’un sait la mener.

Enfin, les sauvegardes contiennent les mêmes données sensibles que l’original. Elles doivent être protégées avec le même soin : un disque de sauvegarde volé dans un sac est une fuite de données. Le chiffrement de la sauvegarde et le rangement sous clé de la copie hors site complètent le plan.

## Exemple guidé 1

```python
copies = [
    {"support": "disque", "lieu": "bureau"},
    {"support": "clé", "lieu": "bureau"},
    {"support": "nuage", "lieu": "hors site"},
]
supports = {c["support"] for c in copies}
hors_site = any(c["lieu"] != "bureau" for c in copies)
print(len(copies), len(supports), hors_site)
```

Affichage attendu :

    3 3 True

Trace :

- Trois copies.
- Un ensemble compte les supports distincts : trois.
- any trouve au moins une copie hors du bureau.

## Exemple guidé 2

```python
from datetime import datetime

derniere = datetime.strptime("2026-11-08 02:00", "%Y-%m-%d %H:%M")
maintenant = datetime.strptime("2026-11-09 18:00", "%Y-%m-%d %H:%M")
print((maintenant - derniere).total_seconds() / 3600)
```

Affichage attendu :

    40.0

Trace :

- La soustraction de deux dates donne une durée.
- total_seconds / 3600 convertit en heures.
- Le changement de jour est compté : 40 heures.

## Vérifier et expliquer

Décris le plan de sauvegarde de ton téléphone ou de l’ordinateur familial, puis vérifie-le avec respecte_321. Que manque-t-il ?

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Cybermalveillance.gouv.fr — Sauvegardes](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes)
- [Python — datetime](https://docs.python.org/fr/3/library/datetime.html)
- [ANSSI — Guide d’hygiène informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
