---
{
  "id": "net-m4-01",
  "title_fr": "Filtrer avec un pare-feu",
  "course": "reseaux-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "net-m3-03"
  ],
  "outcomes": [
    "Évaluer des règles de pare-feu dans l’ordre, avec la première règle applicable et un refus par défaut.",
    "Repérer les règles inutiles, jamais atteintes par le trafic."
  ],
  "idea_fr": "Un pare-feu lit ses règles de haut en bas et applique la première qui correspond ; tout ce qui n’est pas autorisé est refusé.",
  "analogy_fr": "Le vigile d’un événement a une liste : les invités du premier rang entrent par la porte A, les journalistes par la B. Il lit sa liste dans l’ordre et refuse tous ceux qui n’y figurent pas.",
  "examples": [
    {
      "code": "import ipaddress\n\ndef correspond(regle, ip, port):\n    action, source, port_regle = regle\n    dans = ipaddress.ip_address(ip) in ipaddress.ip_network(source)\n    return dans and (port_regle == \"*\" or port_regle == port)\n\nregle = [\"autoriser\", \"192.168.10.0/24\", 443]\nprint(correspond(regle, \"192.168.10.7\", 443))\nprint(correspond(regle, \"192.168.10.7\", 22))\nprint(correspond([\"refuser\", \"192.168.20.0/24\", \"*\"], \"192.168.20.4\", 22))",
      "expected_output": "True\nFalse\nTrue\n",
      "inputs": [],
      "trace_fr": [
        "L’adresse et le port correspondent : True.",
        "Le port 22 ne correspond pas : False.",
        "Une étoile accepte tous les ports."
      ]
    },
    {
      "code": "import ipaddress\n\ndef correspond(regle, ip, port):\n    action, source, port_regle = regle\n    dans = ipaddress.ip_address(ip) in ipaddress.ip_network(source)\n    return dans and (port_regle == \"*\" or port_regle == port)\n\nregles = [[\"autoriser\", \"192.168.10.0/24\", 443], [\"refuser\", \"192.168.0.0/16\", \"*\"]]\nfor ip, port in [(\"192.168.10.7\", 443), (\"192.168.10.7\", 22), (\"8.8.8.8\", 53)]:\n    action = \"refuser\"\n    for regle in regles:\n        if correspond(regle, ip, port):\n            action = regle[0]\n            break\n    print(ip, port, action)",
      "expected_output": "192.168.10.7 443 autoriser\n192.168.10.7 22 refuser\n8.8.8.8 53 refuser\n",
      "inputs": [],
      "trace_fr": [
        "La première règle autorise le web chiffré de la salle.",
        "Le port 22 tombe sur la deuxième règle : refusé.",
        "Aucune règle pour 8.8.8.8 : refus par défaut."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Placer une règle large en premier",
      "why_fr": "Elle masque les règles précises en dessous.",
      "fix_fr": "Les règles précises d’abord, les générales ensuite."
    },
    {
      "error": "Autoriser par défaut",
      "why_fr": "Tout ce qui est oublié passe, y compris les attaques.",
      "fix_fr": "Refuse ce qui n’est pas explicitement permis."
    },
    {
      "error": "Garder la dernière correspondance",
      "why_fr": "C’est la dernière règle qui s’applique au lieu de la première.",
      "fix_fr": "Renvoie l’action dès la première correspondance."
    }
  ],
  "quiz": [
    {
      "question": "Deux règles correspondent à une connexion. Laquelle s’applique ?",
      "options": [
        "La dernière",
        "La première de la liste",
        "La plus précise",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "Le pare-feu s’arrête à la première règle applicable.",
      "id": "net-m4-01-q1"
    },
    {
      "question": "Que fait un pare-feu en refus par défaut face à une connexion imprévue ?",
      "options": [
        "Il l’autorise",
        "Il la bloque",
        "Il demande à l’utilisateur",
        "Il la ralentit"
      ],
      "answer": 1,
      "explanation": "Ce qui n’est pas autorisé est refusé.",
      "id": "net-m4-01-q2"
    },
    {
      "question": "Que signifie une règle jamais appliquée ?",
      "options": [
        "Elle protège bien",
        "Elle est peut-être inutile ou masquée",
        "Elle est obligatoire",
        "Elle bloque tout"
      ],
      "answer": 1,
      "explanation": "Elle mérite d’être examinée, puis supprimée si elle ne sert pas.",
      "id": "net-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "pare-feu",
      "definition": "Équipement ou logiciel qui filtre les connexions selon des règles."
    },
    {
      "term": "première correspondance",
      "definition": "Règle d’évaluation : la première règle applicable décide."
    },
    {
      "term": "politique par défaut",
      "definition": "Décision appliquée quand aucune règle ne correspond."
    },
    {
      "term": "règle masquée",
      "definition": "Règle jamais atteinte car une règle plus haute s’applique avant."
    }
  ],
  "recap_fr": [
    "Évaluer des règles de pare-feu dans l’ordre, avec la première règle applicable et un refus par défaut.",
    "Repérer les règles inutiles, jamais atteintes par le trafic.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "pare-feu",
    "première correspondance",
    "politique par défaut",
    "règle masquée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "debutant",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Les réseaux, mesures et configurations sont des données fictives : aucun paquet n’est envoyé et aucun appareil réel n’est sondé.",
  "references": [
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet"
    },
    {
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html"
    }
  ],
  "sources": [
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet",
      "scope": "Filtrage et cloisonnement. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html",
      "scope": "Adresses, réseaux, masques et sous-réseaux IPv4. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un pare-feu se place entre deux réseaux, par exemple entre le réseau des élèves et celui de l’administration, ou entre l’école et Internet. Il examine chaque connexion et décide de la laisser passer ou de la bloquer. Ses décisions suivent une liste de règles écrite par l’administrateur.

Une règle simple contient trois éléments : une action, autoriser ou refuser ; une source, souvent un réseau en notation CIDR ; et un port de destination, ou une étoile pour dire « tous les ports ». Une règle autoriser 192.168.10.0/24 443 laisse les machines de la salle informatique ouvrir des sites web chiffrés ; une règle refuser 192.168.20.0/24 * bloque tout le réseau invité.

L’ordre des règles est essentiel. Le pare-feu les lit de haut en bas et applique la première qui correspond à la connexion ; il ignore toutes les suivantes. Une règle très large placée en haut masque donc les règles plus précises placées dessous. Les règles précises vont en premier, les règles générales ensuite.

Quand aucune règle ne correspond, le pare-feu applique sa politique par défaut. La bonne pratique est le refus par défaut : tout ce qui n’a pas été explicitement autorisé est bloqué. C’est le même principe que pour les droits d’accès. Une politique d’autorisation par défaut, plus confortable au départ, laisse passer tout ce qu’on a oublié de prévoir, y compris les attaques.

Au fil des années, les listes de règles s’allongent. Certaines ne servent plus : elles ne correspondent jamais à aucune connexion, ou elles sont toujours masquées par une règle placée plus haut. Ces règles inutiles compliquent la relecture et cachent parfois des erreurs. Les administrateurs les repèrent en rejouant le trafic observé et en notant quelles règles ont été appliquées. Une règle jamais appliquée est candidate à la suppression, après vérification.

En Python, une règle est une liste de trois éléments. Pour savoir si elle correspond, on vérifie que l’adresse source appartient au réseau de la règle, grâce à ipaddress, et que le port est égal ou que la règle porte une étoile. Pour décider, on parcourt les règles dans l’ordre et on renvoie l’action de la première qui correspond, dès qu’on la trouve. Une boucle qui continue après avoir trouvé et garde la dernière correspondance applique en réalité la dernière règle, ce qui inverse la logique du pare-feu.

## Exemple guidé 1

```python
import ipaddress

def correspond(regle, ip, port):
    action, source, port_regle = regle
    dans = ipaddress.ip_address(ip) in ipaddress.ip_network(source)
    return dans and (port_regle == "*" or port_regle == port)

regle = ["autoriser", "192.168.10.0/24", 443]
print(correspond(regle, "192.168.10.7", 443))
print(correspond(regle, "192.168.10.7", 22))
print(correspond(["refuser", "192.168.20.0/24", "*"], "192.168.20.4", 22))
```

Affichage attendu :

    True
    False
    True

Trace :

- L’adresse et le port correspondent : True.
- Le port 22 ne correspond pas : False.
- Une étoile accepte tous les ports.

## Exemple guidé 2

```python
import ipaddress

def correspond(regle, ip, port):
    action, source, port_regle = regle
    dans = ipaddress.ip_address(ip) in ipaddress.ip_network(source)
    return dans and (port_regle == "*" or port_regle == port)

regles = [["autoriser", "192.168.10.0/24", 443], ["refuser", "192.168.0.0/16", "*"]]
for ip, port in [("192.168.10.7", 443), ("192.168.10.7", 22), ("8.8.8.8", 53)]:
    action = "refuser"
    for regle in regles:
        if correspond(regle, ip, port):
            action = regle[0]
            break
    print(ip, port, action)
```

Affichage attendu :

    192.168.10.7 443 autoriser
    192.168.10.7 22 refuser
    8.8.8.8 53 refuser

Trace :

- La première règle autorise le web chiffré de la salle.
- Le port 22 tombe sur la deuxième règle : refusé.
- Aucune règle pour 8.8.8.8 : refus par défaut.

## Vérifier et expliquer

Écris trois règles pour le réseau de ton école idéale, puis cherche une connexion que tu as oubliée et vérifie qu’elle est refusée.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [ANSSI — Interconnexion d’un SI à Internet](https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet)
- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
