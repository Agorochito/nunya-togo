---
{
  "id": "net-m1-01",
  "title_fr": "Les adresses IP : l’adresse postale des appareils",
  "course": "reseaux-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Lire une adresse IPv4 comme quatre octets et la valider.",
    "Distinguer adresse privée, publique et de bouclage avec le module ipaddress."
  ],
  "idea_fr": "Chaque appareil connecté reçoit une adresse IP ; c’est elle qui permet aux paquets de trouver leur destinataire.",
  "analogy_fr": "Une lettre arrive grâce à l’adresse écrite sur l’enveloppe. Dans une concession, le portail a une adresse dans la rue, et chaque chambre a son propre nom à l’intérieur.",
  "examples": [
    {
      "code": "adresse = \"192.168.1.20\"\noctets = [int(x) for x in adresse.split(\".\")]\nprint(octets)\nprint(\".\".join(format(o, \"08b\") for o in octets))",
      "expected_output": "[192, 168, 1, 20]\n11000000.10101000.00000001.00010100\n",
      "inputs": [],
      "trace_fr": [
        "split(\".\") donne quatre textes, convertis en entiers.",
        "format(o, \"08b\") écrit un octet sur 8 chiffres binaires.",
        "L’adresse complète compte 32 bits."
      ]
    },
    {
      "code": "import ipaddress\n\nfor texte in [\"10.0.0.5\", \"172.20.3.4\", \"8.8.8.8\", \"127.0.0.1\"]:\n    ip = ipaddress.ip_address(texte)\n    print(texte, ip.is_private, ip.is_loopback)",
      "expected_output": "10.0.0.5 True False\n172.20.3.4 True False\n8.8.8.8 False False\n127.0.0.1 True True\n",
      "inputs": [],
      "trace_fr": [
        "10.x et 172.16 à 172.31 sont des plages privées.",
        "8.8.8.8 est une adresse publique d’Internet.",
        "127.0.0.1 est l’adresse de bouclage, classée aussi comme non publique."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Accepter un octet au-delà de 255",
      "why_fr": "Un octet ne contient que 8 bits.",
      "fix_fr": "Vérifie que chaque nombre est entre 0 et 255."
    },
    {
      "error": "Croire qu’une adresse privée est joignable depuis Internet",
      "why_fr": "Elle n’existe que dans le réseau interne.",
      "fix_fr": "Seule l’adresse publique de la box est visible de l’extérieur."
    },
    {
      "error": "Convertir sans vérifier que ce sont des chiffres",
      "why_fr": "int(\"a\") lève une erreur.",
      "fix_fr": "Teste isdigit() avant de convertir."
    }
  ],
  "quiz": [
    {
      "question": "Combien de bits compte une adresse IPv4 ?",
      "options": [
        "8",
        "16",
        "32",
        "128"
      ],
      "answer": 2,
      "explanation": "Quatre octets de 8 bits.",
      "id": "net-m1-01-q1"
    },
    {
      "question": "Laquelle est une adresse privée ?",
      "options": [
        "8.8.8.8",
        "172.20.1.1",
        "41.207.160.5",
        "1.1.1.1"
      ],
      "answer": 1,
      "explanation": "172.16.0.0 à 172.31.255.255 est une plage privée.",
      "id": "net-m1-01-q2"
    },
    {
      "question": "À quoi sert 127.0.0.1 ?",
      "options": [
        "À joindre la box",
        "À parler à sa propre machine",
        "À joindre Google",
        "À rien"
      ],
      "answer": 1,
      "explanation": "C’est l’adresse de bouclage.",
      "id": "net-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "adresse IP",
      "definition": "Identifiant numérique d’un appareil sur un réseau."
    },
    {
      "term": "octet",
      "definition": "Groupe de 8 bits, valeur de 0 à 255."
    },
    {
      "term": "adresse privée",
      "definition": "Adresse réservée aux réseaux internes (RFC 1918)."
    },
    {
      "term": "NAT",
      "definition": "Traduction des adresses privées vers l’adresse publique de la box."
    }
  ],
  "recap_fr": [
    "Lire une adresse IPv4 comme quatre octets et la valider.",
    "Distinguer adresse privée, publique et de bouclage avec le module ipaddress.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "adresse IP",
    "octet",
    "adresse privée",
    "NAT"
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
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html"
    },
    {
      "title": "RFC 1918 — adresses privées",
      "url": "https://www.rfc-editor.org/rfc/rfc1918"
    },
    {
      "title": "MDN — Comment fonctionne Internet",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work"
    }
  ],
  "sources": [
    {
      "title": "Python — ipaddress",
      "url": "https://docs.python.org/fr/3/library/ipaddress.html",
      "scope": "Adresses, réseaux, masques et sous-réseaux IPv4. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "RFC 1918 — adresses privées",
      "url": "https://www.rfc-editor.org/rfc/rfc1918",
      "scope": "Plages 10/8, 172.16/12 et 192.168/16. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — Comment fonctionne Internet",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
      "scope": "Paquets, routeurs et adresses. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Quand ton téléphone ouvre un site, il n’envoie pas un long fichier d’un bloc : il envoie de petits paquets de données. Chaque paquet porte l’adresse de l’expéditeur et celle du destinataire. Ces adresses sont des adresses IP, pour Internet Protocol. Les routeurs, les appareils qui relient les réseaux entre eux, lisent l’adresse de destination et transmettent le paquet de proche en proche jusqu’au bon réseau.

Une adresse IPv4 s’écrit avec quatre nombres séparés par des points, comme 192.168.1.20. Chaque nombre est un octet, c’est-à-dire 8 bits : il va donc de 0 à 255. Une adresse entière compte 32 bits. En binaire, 192 s’écrit 11000000. Regarder les adresses en binaire n’est pas un exercice gratuit : c’est ainsi que les machines découpent les réseaux, comme on le verra dans la leçon suivante.

Toutes les adresses ne se valent pas. Les adresses privées, définies par la RFC 1918, sont réservées aux réseaux internes : 10.0.0.0 à 10.255.255.255, 172.16.0.0 à 172.31.255.255 et 192.168.0.0 à 192.168.255.255. La même adresse privée existe dans des milliers de maisons et d’écoles sans conflit, car elle ne circule jamais sur Internet. La box ou le routeur du fournisseur d’accès possède une adresse publique, unique sur Internet, et traduit les adresses privées de tous les appareils de la maison vers cette adresse : c’est la traduction d’adresses, ou NAT.

L’adresse 127.0.0.1 est spéciale : c’est l’adresse de bouclage. Un programme qui l’appelle parle à sa propre machine, sans passer par le réseau. Les développeurs l’utilisent pour tester un serveur sur leur ordinateur.

Les adresses IPv4 sont presque épuisées : 32 bits ne donnent qu’environ 4,3 milliards de possibilités. IPv6, avec 128 bits et une écriture en hexadécimal comme 2001:db8::1, prend progressivement le relais. Ce cours travaille en IPv4, plus simple à lire, mais les mêmes idées s’appliquent.

En Python, le module ipaddress transforme un texte en objet adresse. Il refuse les adresses invalides avec ValueError et répond à des questions utiles : is_private, is_loopback, is_global. Pour comprendre le mécanisme, tu vas d’abord valider une adresse à la main, en découpant le texte et en vérifiant chaque octet, puis tu laisseras le module faire ce travail.

## Exemple guidé 1

```python
adresse = "192.168.1.20"
octets = [int(x) for x in adresse.split(".")]
print(octets)
print(".".join(format(o, "08b") for o in octets))
```

Affichage attendu :

    [192, 168, 1, 20]
    11000000.10101000.00000001.00010100

Trace :

- split(".") donne quatre textes, convertis en entiers.
- format(o, "08b") écrit un octet sur 8 chiffres binaires.
- L’adresse complète compte 32 bits.

## Exemple guidé 2

```python
import ipaddress

for texte in ["10.0.0.5", "172.20.3.4", "8.8.8.8", "127.0.0.1"]:
    ip = ipaddress.ip_address(texte)
    print(texte, ip.is_private, ip.is_loopback)
```

Affichage attendu :

    10.0.0.5 True False
    172.20.3.4 True False
    8.8.8.8 False False
    127.0.0.1 True True

Trace :

- 10.x et 172.16 à 172.31 sont des plages privées.
- 8.8.8.8 est une adresse publique d’Internet.
- 127.0.0.1 est l’adresse de bouclage, classée aussi comme non publique.

## Vérifier et expliquer

Trouve l’adresse IP de ton téléphone dans ses réglages Wi-Fi : est-elle privée ou publique ? Explique pourquoi.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [RFC 1918 — adresses privées](https://www.rfc-editor.org/rfc/rfc1918)
- [MDN — Comment fonctionne Internet](https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
