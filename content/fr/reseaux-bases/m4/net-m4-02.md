---
{
  "id": "net-m4-02",
  "title_fr": "Wi-Fi et segmentation : chacun dans sa zone",
  "course": "reseaux-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "net-m4-01"
  ],
  "outcomes": [
    "Vérifier la configuration de sécurité d’un réseau Wi-Fi.",
    "Associer une adresse à sa zone et décider si un flux entre zones est autorisé par une matrice."
  ],
  "idea_fr": "Un bon réseau sépare les usages en zones et n’autorise que les échanges nécessaires entre elles ; le Wi-Fi invité n’atteint jamais le reste.",
  "analogy_fr": "Dans une école, les élèves vont en classe, les visiteurs restent à l’accueil, et seule la direction entre au secrétariat. Les couloirs existent, mais les portes ne s’ouvrent pas pour tout le monde.",
  "examples": [
    {
      "code": "import ipaddress\n\nzones = {\"eleves\": \"10.10.1.0/24\", \"invites\": \"10.10.3.0/24\"}\nfor ip in [\"10.10.1.25\", \"10.10.3.7\", \"10.10.7.1\"]:\n    trouve = \"inconnue\"\n    for nom, cidr in zones.items():\n        if ipaddress.ip_address(ip) in ipaddress.ip_network(cidr):\n            trouve = nom\n    print(ip, trouve)",
      "expected_output": "10.10.1.25 eleves\n10.10.3.7 invites\n10.10.7.1 inconnue\n",
      "inputs": [],
      "trace_fr": [
        "Chaque zone est un sous-réseau.",
        "On teste l’appartenance de l’adresse à chaque zone.",
        "Une adresse hors de toute zone est inconnue."
      ]
    },
    {
      "code": "matrice = {\"eleves\": [\"serveurs\"], \"invites\": []}\nfor source, destination in [(\"eleves\", \"serveurs\"), (\"invites\", \"serveurs\"), (\"eleves\", \"eleves\")]:\n    ok = source == destination or destination in matrice.get(source, [])\n    print(source, \"->\", destination, ok)",
      "expected_output": "eleves -> serveurs True\ninvites -> serveurs False\neleves -> eleves True\n",
      "inputs": [],
      "trace_fr": [
        "Le flux élèves vers serveurs est prévu.",
        "Les invités n’ont aucun flux interne.",
        "À l’intérieur d’une même zone, le flux ne traverse pas le pare-feu."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Garder WEP ou WPA",
      "why_fr": "Ces protocoles se cassent en quelques minutes.",
      "fix_fr": "Passe en WPA2 ou WPA3."
    },
    {
      "error": "Mettre les invités sur le réseau interne",
      "why_fr": "Un téléphone infecté atteint tous les postes.",
      "fix_fr": "Active un réseau invité séparé."
    },
    {
      "error": "Autoriser les adresses inconnues",
      "why_fr": "Un appareil non autorisé passe inaperçu.",
      "fix_fr": "Refuse les flux des adresses hors zone."
    }
  ],
  "quiz": [
    {
      "question": "Quel chiffrement Wi-Fi choisir ?",
      "options": [
        "WEP",
        "WPA",
        "WPA2 ou WPA3",
        "Aucun"
      ],
      "answer": 2,
      "explanation": "WEP et WPA sont cassés depuis longtemps.",
      "id": "net-m4-02-q1"
    },
    {
      "question": "Que doit atteindre le Wi-Fi invité ?",
      "options": [
        "Tout le réseau",
        "Internet seulement",
        "Les imprimantes",
        "Les caméras"
      ],
      "answer": 1,
      "explanation": "Les invités n’ont aucun accès aux zones internes.",
      "id": "net-m4-02-q2"
    },
    {
      "question": "Qu’est-ce qu’un déplacement latéral ?",
      "options": [
        "Changer de Wi-Fi",
        "Passer d’une machine compromise à d’autres machines du réseau",
        "Un câble mal branché",
        "Une mise à jour"
      ],
      "answer": 1,
      "explanation": "La segmentation l’empêche.",
      "id": "net-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "WPA2/WPA3",
      "definition": "Protocoles de chiffrement actuels des réseaux Wi-Fi."
    },
    {
      "term": "réseau invité",
      "definition": "Réseau Wi-Fi séparé qui ne donne accès qu’à Internet."
    },
    {
      "term": "segmentation",
      "definition": "Découpage du réseau en zones séparées par un filtrage."
    },
    {
      "term": "matrice de flux",
      "definition": "Tableau des échanges autorisés entre zones."
    }
  ],
  "recap_fr": [
    "Vérifier la configuration de sécurité d’un réseau Wi-Fi.",
    "Associer une adresse à sa zone et décider si un flux entre zones est autorisé par une matrice.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "WPA2/WPA3",
    "réseau invité",
    "segmentation",
    "matrice de flux"
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
      "title": "ANSSI — Sécurisation des réseaux Wi-Fi",
      "url": "https://cyber.gouv.fr/publications/recommandations-pour-la-securisation-des-reseaux-wi-fi"
    },
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet"
    }
  ],
  "sources": [
    {
      "title": "ANSSI — Sécurisation des réseaux Wi-Fi",
      "url": "https://cyber.gouv.fr/publications/recommandations-pour-la-securisation-des-reseaux-wi-fi",
      "scope": "Réseau invité séparé et chiffrement. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet",
      "scope": "Filtrage et cloisonnement. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Le Wi-Fi est souvent la porte d’entrée la plus facile d’un réseau, car il traverse les murs. Trois réglages font la différence. Le chiffrement d’abord : WPA2 au minimum, WPA3 si les appareils le permettent. Les anciens protocoles WEP et WPA se cassent en quelques minutes et doivent être abandonnés ; un réseau ouvert, sans chiffrement, laisse lire le trafic par n’importe qui à portée. La clé ensuite : une phrase longue, au moins douze caractères, jamais celle imprimée sous la box et jamais affichée sur un mur. Enfin, l’interface d’administration de la box ou du point d’accès doit avoir un mot de passe changé, différent de celui d’origine.

Le réglage le plus utile dans une école ou une boutique est un réseau invité séparé. Les visiteurs, les téléphones des élèves et les appareils inconnus s’y connectent ; ils accèdent à Internet, mais pas aux ordinateurs de l’administration, aux imprimantes ou aux caméras. La plupart des points d’accès proposent cette option en un clic.

Ce principe se généralise : la segmentation. On découpe le réseau en zones, chacune dans son propre sous-réseau, comme dans le plan d’adressage du premier module : élèves, administration, invités, serveurs. Puis on décide, zone par zone, quels échanges sont nécessaires. Les postes des élèves doivent atteindre le serveur pédagogique ; l’administration doit atteindre le serveur et peut-être les postes des élèves pour les maintenir ; les invités n’atteignent aucune zone interne. Ces décisions se résument dans une matrice de flux, qu’un pare-feu entre les zones applique.

La matrice suit le refus par défaut : un flux absent est interdit. Une machine qui parle à une autre machine de sa propre zone ne traverse pas le pare-feu interne ; ce flux est donc permis dans ce modèle simplifié. Une adresse qui n’appartient à aucune zone connue est suspecte : un appareil branché sans autorisation ou mal configuré. Ses flux sont refusés.

Pourquoi tant de soin ? Parce qu’une intrusion commence rarement là où se trouvent les données précieuses. Un attaquant entre par un appareil faible, un téléphone infecté sur le Wi-Fi ou une caméra jamais mise à jour, puis cherche à se déplacer latéralement vers les machines importantes. La segmentation transforme ce déplacement en mur. En Python, retrouver la zone d’une adresse revient à tester son appartenance à chaque sous-réseau, puis la matrice répond à la question : ce flux est-il prévu ?

## Exemple guidé 1

```python
import ipaddress

zones = {"eleves": "10.10.1.0/24", "invites": "10.10.3.0/24"}
for ip in ["10.10.1.25", "10.10.3.7", "10.10.7.1"]:
    trouve = "inconnue"
    for nom, cidr in zones.items():
        if ipaddress.ip_address(ip) in ipaddress.ip_network(cidr):
            trouve = nom
    print(ip, trouve)
```

Affichage attendu :

    10.10.1.25 eleves
    10.10.3.7 invites
    10.10.7.1 inconnue

Trace :

- Chaque zone est un sous-réseau.
- On teste l’appartenance de l’adresse à chaque zone.
- Une adresse hors de toute zone est inconnue.

## Exemple guidé 2

```python
matrice = {"eleves": ["serveurs"], "invites": []}
for source, destination in [("eleves", "serveurs"), ("invites", "serveurs"), ("eleves", "eleves")]:
    ok = source == destination or destination in matrice.get(source, [])
    print(source, "->", destination, ok)
```

Affichage attendu :

    eleves -> serveurs True
    invites -> serveurs False
    eleves -> eleves True

Trace :

- Le flux élèves vers serveurs est prévu.
- Les invités n’ont aucun flux interne.
- À l’intérieur d’une même zone, le flux ne traverse pas le pare-feu.

## Vérifier et expliquer

Dessine la matrice de flux de ton école idéale : une ligne et une colonne par zone, une croix pour chaque échange nécessaire.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [ANSSI — Sécurisation des réseaux Wi-Fi](https://cyber.gouv.fr/publications/recommandations-pour-la-securisation-des-reseaux-wi-fi)
- [ANSSI — Interconnexion d’un SI à Internet](https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet)
