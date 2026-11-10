---
{
  "id": "cyb-m2-03",
  "title_fr": "Repérer les connexions inhabituelles",
  "course": "cyber-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "cyb-m2-02"
  ],
  "outcomes": [
    "Lire une heure avec datetime et une adresse avec ipaddress pour qualifier une connexion.",
    "Combiner plusieurs règles simples pour produire des alertes expliquées."
  ],
  "idea_fr": "Une attaque réussie ressemble à une connexion normale ; c’est le contexte — heure, provenance, appareil — qui la rend inhabituelle.",
  "analogy_fr": "Le directeur entre tous les matins par le portail. S’il entre un jour à trois heures du matin par la fenêtre arrière, le gardien s’interroge, même s’il a la bonne clé.",
  "examples": [
    {
      "code": "from datetime import datetime\n\nmoment = datetime.strptime(\"2026-11-09 02:47:10\", \"%Y-%m-%d %H:%M:%S\")\nprint(moment.hour, moment.minute)\nprint(moment.weekday())",
      "expected_output": "2 47\n0\n",
      "inputs": [],
      "trace_fr": [
        "strptime lit le texte selon le format donné.",
        "hour vaut 2 et minute 47.",
        "Le 9 novembre 2026 est un lundi : weekday renvoie 0."
      ]
    },
    {
      "code": "import ipaddress\n\nfor texte in [\"192.168.1.20\", \"41.207.160.5\", \"300.1.1.1\"]:\n    try:\n        ip = ipaddress.ip_address(texte)\n        print(texte, \"privée\" if ip.is_private else \"publique\")\n    except ValueError:\n        print(texte, \"invalide\")",
      "expected_output": "192.168.1.20 privée\n41.207.160.5 publique\n300.1.1.1 invalide\n",
      "inputs": [],
      "trace_fr": [
        "192.168.x.x appartient à un réseau privé.",
        "41.207.160.5 est une adresse publique d’Internet.",
        "300 dépasse 255 : ip_address lève ValueError."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer avec toutes les adresses de l’organisation",
      "why_fr": "Une adresse connue pour un collègue paraît normale pour un autre compte.",
      "fix_fr": "Compare avec les adresses habituelles de ce compte."
    },
    {
      "error": "Alerter sans expliquer",
      "why_fr": "Personne ne sait quoi vérifier.",
      "fix_fr": "Indique le compte, l’heure et chaque raison."
    },
    {
      "error": "Traiter un texte invalide comme une adresse",
      "why_fr": "Une ligne corrompue fausse l’analyse.",
      "fix_fr": "Valide avec ipaddress et attrape ValueError."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie datetime(2026, 11, 9).weekday() si le 9 novembre 2026 est un lundi ?",
      "options": [
        "1",
        "0",
        "7",
        "lundi"
      ],
      "answer": 1,
      "explanation": "weekday commence à 0 pour le lundi.",
      "id": "cyb-m2-03-q1"
    },
    {
      "question": "Laquelle est une adresse privée ?",
      "options": [
        "8.8.8.8",
        "41.207.160.5",
        "192.168.1.20",
        "102.64.0.1"
      ],
      "answer": 2,
      "explanation": "192.168.0.0/16 est réservé aux réseaux privés.",
      "id": "cyb-m2-03-q2"
    },
    {
      "question": "Pourquoi expliquer chaque alerte ?",
      "options": [
        "Pour faire joli",
        "Pour que la personne qui la lit sache quoi vérifier",
        "Parce que Python l’exige",
        "Pour ralentir l’attaquant"
      ],
      "answer": 1,
      "explanation": "Une alerte expliquée se vérifie vite et s’écarte vite si elle est fausse.",
      "id": "cyb-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "anomalie",
      "definition": "Événement qui s’écarte des habitudes observées."
    },
    {
      "term": "adresse privée",
      "definition": "Adresse réservée aux réseaux internes, non joignable depuis Internet."
    },
    {
      "term": "strptime",
      "definition": "Méthode de datetime qui lit une date à partir d’un texte et d’un format."
    },
    {
      "term": "SIEM",
      "definition": "Outil qui collecte les journaux et applique des règles de détection."
    }
  ],
  "recap_fr": [
    "Lire une heure avec datetime et une adresse avec ipaddress pour qualifier une connexion.",
    "Combiner plusieurs règles simples pour produire des alertes expliquées.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "anomalie",
    "adresse privée",
    "strptime",
    "SIEM"
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
      "title": "Python — datetime",
      "url": "https://docs.python.org/fr/3/library/datetime.html"
    },
    {
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html"
    },
    {
      "title": "OWASP — Journalisation",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
    }
  ],
  "sources": [
    {
      "title": "Python — datetime",
      "url": "https://docs.python.org/fr/3/library/datetime.html",
      "scope": "Lire et comparer des dates et heures. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html",
      "scope": "Valider une adresse IP et reconnaître une adresse privée. Texte, exemples et exercices originaux Nunya.",
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

Quand un attaquant connaît le bon mot de passe, sa connexion réussit comme celle de la vraie personne. La leçon précédente cherchait des échecs ; celle-ci cherche des succès qui ne ressemblent pas aux habitudes. On parle de détection d’anomalies. Trois indices simples couvrent beaucoup de cas dans une petite organisation.

Le premier indice est l’heure. Le personnel d’une école ou d’une boutique travaille en journée. Une connexion à 2 h 47 n’est pas forcément malveillante, mais elle mérite un regard. Le module datetime lit un texte daté avec strptime, en précisant son format : "%Y-%m-%d %H:%M:%S" pour 2026-11-09 02:47:10. L’objet obtenu donne ensuite moment.hour, moment.minute ou moment.weekday(), qui vaut 0 le lundi et 6 le dimanche.

Le deuxième indice est l’adresse. Chaque compte se connecte en général depuis quelques adresses connues : l’ordinateur du bureau, le téléphone de la personne. Une adresse jamais vue pour ce compte précis est un signal. Attention à comparer avec les adresses de ce compte, pas avec toutes les adresses connues de l’organisation : l’adresse habituelle de la directrice n’est pas « connue » pour le compte du comptable.

Le troisième indice est la provenance. Les adresses privées, comme 10.0.0.12 ou 192.168.1.20, appartiennent au réseau interne. Une adresse publique signifie que la connexion vient d’Internet. Pour un service qui ne devrait être utilisé qu’au bureau, c’est inhabituel. Le module ipaddress transforme un texte en adresse, refuse un texte invalide avec ValueError et indique is_private. Valider ainsi évite aussi de traiter comme une adresse une ligne de journal corrompue ou falsifiée.

Aucune de ces règles ne suffit seule, et chacune produit des fausses alertes : une enseignante qui corrige des copies le soir, un responsable en déplacement. C’est pourquoi une bonne alerte est expliquée : elle dit quel compte, quand, et pour quelles raisons. La personne qui la lit peut alors vérifier rapidement, par exemple en appelant le collègue concerné.

Les grandes organisations utilisent des outils spécialisés, appelés SIEM, qui appliquent des milliers de règles de ce genre à des millions de lignes. Le principe reste celui que tu vas programmer : lire, enrichir chaque événement, appliquer des règles claires et produire des alertes que des humains peuvent vérifier.

## Exemple guidé 1

```python
from datetime import datetime

moment = datetime.strptime("2026-11-09 02:47:10", "%Y-%m-%d %H:%M:%S")
print(moment.hour, moment.minute)
print(moment.weekday())
```

Affichage attendu :

    2 47
    0

Trace :

- strptime lit le texte selon le format donné.
- hour vaut 2 et minute 47.
- Le 9 novembre 2026 est un lundi : weekday renvoie 0.

## Exemple guidé 2

```python
import ipaddress

for texte in ["192.168.1.20", "41.207.160.5", "300.1.1.1"]:
    try:
        ip = ipaddress.ip_address(texte)
        print(texte, "privée" if ip.is_private else "publique")
    except ValueError:
        print(texte, "invalide")
```

Affichage attendu :

    192.168.1.20 privée
    41.207.160.5 publique
    300.1.1.1 invalide

Trace :

- 192.168.x.x appartient à un réseau privé.
- 41.207.160.5 est une adresse publique d’Internet.
- 300 dépasse 255 : ip_address lève ValueError.

## Vérifier et expliquer

Pour chaque ligne du journal de l’exercice final, décide à la main quelles raisons s’appliquent, puis compare avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — datetime](https://docs.python.org/fr/3/library/datetime.html)
- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [OWASP — Journalisation](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
