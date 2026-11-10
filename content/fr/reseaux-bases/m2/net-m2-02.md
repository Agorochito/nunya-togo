---
{
  "id": "net-m2-02",
  "title_fr": "Ports et protocoles",
  "course": "reseaux-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "net-m2-01"
  ],
  "outcomes": [
    "Associer les ports courants à leur service et lire une adresse de la forme ip:port.",
    "Repérer les ports ouverts qui ne devraient pas l’être et expliquer pourquoi."
  ],
  "idea_fr": "L’adresse IP mène à la machine ; le port mène au bon programme sur cette machine.",
  "analogy_fr": "L’adresse mène à l’immeuble ; le numéro de bureau mène à la bonne personne. Plus un immeuble a de portes ouvertes, plus il faut de gardiens.",
  "examples": [
    {
      "code": "SERVICES = {22: \"SSH\", 25: \"SMTP\", 53: \"DNS\", 80: \"HTTP\", 443: \"HTTPS\", 3306: \"MySQL\", 3389: \"RDP\"}\n\nfor port in [443, 22, 8080]:\n    print(port, SERVICES.get(port, \"inconnu\"))",
      "expected_output": "443 HTTPS\n22 SSH\n8080 inconnu\n",
      "inputs": [],
      "trace_fr": [
        "Le dictionnaire associe chaque port courant à son service.",
        "get renvoie \"inconnu\" pour un port absent, sans erreur."
      ]
    },
    {
      "code": "adresse = \"41.207.160.5:443\"\nip, port = adresse.rsplit(\":\", 1)\nprint(ip)\nprint(int(port) + 1)",
      "expected_output": "41.207.160.5\n444\n",
      "inputs": [],
      "trace_fr": [
        "rsplit coupe au dernier deux-points.",
        "Le port est un texte qu’il faut convertir en entier."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Ouvrir des ports « au cas où »",
      "why_fr": "Chaque port ouvert est une porte d’entrée.",
      "fix_fr": "N’ouvre que le nécessaire et vérifie régulièrement."
    },
    {
      "error": "Balayer un réseau sans autorisation",
      "why_fr": "C’est interdit et souvent le début d’une attaque.",
      "fix_fr": "Ne balaie que tes propres réseaux, avec accord écrit."
    },
    {
      "error": "Oublier de convertir le port",
      "why_fr": "\"443\" et 443 ne se comparent pas.",
      "fix_fr": "Convertis avec int et vérifie l’intervalle."
    }
  ],
  "quiz": [
    {
      "question": "Quel port utilise HTTPS ?",
      "options": [
        "80",
        "22",
        "443",
        "53"
      ],
      "answer": 2,
      "explanation": "HTTPS écoute par défaut sur le port 443.",
      "id": "net-m2-02-q1"
    },
    {
      "question": "Quel protocole convient le mieux à un appel vocal ?",
      "options": [
        "TCP",
        "UDP",
        "FTP",
        "SMTP"
      ],
      "answer": 1,
      "explanation": "UDP privilégie la rapidité ; une petite perte est acceptable.",
      "id": "net-m2-02-q2"
    },
    {
      "question": "Quel service ne devrait presque jamais être exposé sur Internet ?",
      "options": [
        "HTTPS",
        "Une base de données MySQL",
        "DNS public",
        "Un site vitrine"
      ],
      "answer": 1,
      "explanation": "Une base de données doit rester interne.",
      "id": "net-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "port",
      "definition": "Numéro qui désigne un service sur une machine."
    },
    {
      "term": "TCP",
      "definition": "Transport fiable avec connexion, ordre et retransmission."
    },
    {
      "term": "UDP",
      "definition": "Transport rapide sans garantie de livraison."
    },
    {
      "term": "balayage de ports",
      "definition": "Test des ports ouverts d’une machine, réservé aux systèmes autorisés."
    }
  ],
  "recap_fr": [
    "Associer les ports courants à leur service et lire une adresse de la forme ip:port.",
    "Repérer les ports ouverts qui ne devraient pas l’être et expliquer pourquoi.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "port",
    "TCP",
    "UDP",
    "balayage de ports"
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
      "title": "IANA — registre des ports",
      "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
    },
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet"
    }
  ],
  "sources": [
    {
      "title": "IANA — registre des ports",
      "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
      "scope": "Numéros de port attribués aux services. Texte, exemples et exercices originaux Nunya.",
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

Une même machine fait tourner plusieurs services réseau : un site web, une messagerie, un accès à distance. Pour savoir à quel programme remettre un paquet, la couche transport utilise un numéro de port, de 0 à 65 535. Un serveur web écoute sur le port 80 pour HTTP et 443 pour HTTPS ; un serveur DNS sur le port 53 ; l’administration à distance sécurisée, SSH, sur le port 22 ; le bureau à distance de Windows, RDP, sur le port 3389 ; une base de données MySQL sur le port 3306. Ces associations sont enregistrées par l’IANA, l’organisme qui gère les numéros d’Internet. Le couple adresse IP et port, écrit 41.207.160.5:443, désigne précisément un service sur une machine.

Deux protocoles de transport se partagent le travail. TCP établit une connexion, numérote les données, renvoie ce qui est perdu et livre tout dans l’ordre : il convient au web, aux courriels, aux transferts de fichiers. UDP envoie des messages indépendants sans garantie, mais avec moins de délai : il convient au DNS, aux appels vocaux et à la vidéo en direct, où une petite perte gêne moins qu’un retard.

Côté sécurité, chaque port ouvert est une porte d’entrée possible. Un service exposé sur Internet est sondé en permanence par des robots qui cherchent des mots de passe faibles ou des failles connues. Certains services ne devraient presque jamais être accessibles depuis Internet : une base de données, le bureau à distance, ou de vieux protocoles qui transmettent tout en clair comme Telnet sur le port 23 et FTP sur le port 21. La règle est de n’ouvrir que ce qui est nécessaire, et de comparer régulièrement la liste des ports réellement ouverts avec la liste des ports autorisés.

Les administrateurs dressent cette liste avec des outils de balayage de ports. Ces outils envoient des tentatives de connexion à chaque port d’une machine. Les utiliser sur un réseau qui ne t’appartient pas, sans autorisation écrite, est interdit : c’est souvent la première étape d’une attaque et la loi la sanctionne. Dans ce cours, les listes de ports sont fournies, comme le serait le résultat d’un balayage mené par l’équipe autorisée.

En Python, un dictionnaire associe un port à son service ; get avec une valeur par défaut évite une erreur pour un port inconnu. Pour lire une adresse ip:port, rsplit(":", 1) coupe au dernier deux-points, ce qui reste juste même pour des formats qui en contiennent d’autres. Un port lu dans un texte doit être converti en entier et vérifié entre 0 et 65 535.

## Exemple guidé 1

```python
SERVICES = {22: "SSH", 25: "SMTP", 53: "DNS", 80: "HTTP", 443: "HTTPS", 3306: "MySQL", 3389: "RDP"}

for port in [443, 22, 8080]:
    print(port, SERVICES.get(port, "inconnu"))
```

Affichage attendu :

    443 HTTPS
    22 SSH
    8080 inconnu

Trace :

- Le dictionnaire associe chaque port courant à son service.
- get renvoie "inconnu" pour un port absent, sans erreur.

## Exemple guidé 2

```python
adresse = "41.207.160.5:443"
ip, port = adresse.rsplit(":", 1)
print(ip)
print(int(port) + 1)
```

Affichage attendu :

    41.207.160.5
    444

Trace :

- rsplit coupe au dernier deux-points.
- Le port est un texte qu’il faut convertir en entier.

## Vérifier et expliquer

Cite trois applications de ton téléphone et devine le port et le protocole de transport qu’elles utilisent probablement.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [IANA — registre des ports](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [ANSSI — Interconnexion d’un SI à Internet](https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet)
