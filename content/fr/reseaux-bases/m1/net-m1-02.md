---
{
  "id": "net-m1-02",
  "title_fr": "Masques et notation CIDR",
  "course": "reseaux-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "net-m1-01"
  ],
  "outcomes": [
    "Lire un réseau en notation CIDR : adresse de réseau, masque, diffusion et nombre d’hôtes.",
    "Décider si deux adresses sont dans le même réseau et vérifier une passerelle."
  ],
  "idea_fr": "Une adresse IP se lit en deux parties : le réseau, puis la machine dans ce réseau ; le masque indique où passe la frontière.",
  "analogy_fr": "Dans « Lomé, quartier Bè, maison 12 », la ville et le quartier désignent la zone, le numéro désigne la maison. Le masque dit combien de mots appartiennent à la zone.",
  "examples": [
    {
      "code": "import ipaddress\n\nreseau = ipaddress.ip_network(\"192.168.1.0/24\")\nprint(reseau.netmask, reseau.network_address, reseau.broadcast_address)\nprint(reseau.num_addresses - 2, \"hôtes\")",
      "expected_output": "255.255.255.0 192.168.1.0 192.168.1.255\n254 hôtes\n",
      "inputs": [],
      "trace_fr": [
        "/24 correspond au masque 255.255.255.0.",
        "Le réseau commence à .0 et diffuse sur .255.",
        "256 adresses moins 2 réservées : 254 hôtes."
      ]
    },
    {
      "code": "import ipaddress\n\nreseau = ipaddress.ip_network(\"10.0.0.0/26\")\nfor texte in [\"10.0.0.20\", \"10.0.0.70\"]:\n    print(texte, ipaddress.ip_address(texte) in reseau)",
      "expected_output": "10.0.0.20 True\n10.0.0.70 False\n",
      "inputs": [],
      "trace_fr": [
        "Un /26 couvre 64 adresses : de 10.0.0.0 à 10.0.0.63.",
        "20 est dans le bloc.",
        "70 appartient au bloc suivant, même avec les mêmes trois premiers octets."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer les trois premiers octets",
      "why_fr": "Faux dès que le préfixe n’est pas /24.",
      "fix_fr": "Teste l’appartenance avec ip_network et in."
    },
    {
      "error": "Oublier les deux adresses réservées",
      "why_fr": "On annonce 256 machines dans un /24.",
      "fix_fr": "Retire l’adresse de réseau et la diffusion."
    },
    {
      "error": "Placer la passerelle hors du réseau",
      "why_fr": "L’appareil ne peut plus sortir.",
      "fix_fr": "La passerelle doit appartenir au même réseau."
    }
  ],
  "quiz": [
    {
      "question": "Combien d’hôtes dans un /26 ?",
      "options": [
        "64",
        "62",
        "26",
        "254"
      ],
      "answer": 1,
      "explanation": "2 puissance 6 = 64, moins 2 adresses réservées.",
      "id": "net-m1-02-q1"
    },
    {
      "question": "Quelle est l’adresse de diffusion de 192.168.5.0/24 ?",
      "options": [
        "192.168.5.0",
        "192.168.5.1",
        "192.168.5.255",
        "255.255.255.0"
      ],
      "answer": 2,
      "explanation": "Tous les bits machine à 1 : .255.",
      "id": "net-m1-02-q2"
    },
    {
      "question": "À quoi sert la passerelle ?",
      "options": [
        "À diffuser",
        "À joindre les autres réseaux",
        "À nommer les sites",
        "À chiffrer"
      ],
      "answer": 1,
      "explanation": "Elle relaie les paquets vers l’extérieur du réseau.",
      "id": "net-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "masque",
      "definition": "Indique quels bits de l’adresse désignent le réseau."
    },
    {
      "term": "CIDR",
      "definition": "Notation adresse/préfixe, comme 192.168.1.0/24."
    },
    {
      "term": "diffusion",
      "definition": "Adresse qui atteint toutes les machines du réseau."
    },
    {
      "term": "passerelle",
      "definition": "Routeur qui relie le réseau aux autres réseaux."
    }
  ],
  "recap_fr": [
    "Lire un réseau en notation CIDR : adresse de réseau, masque, diffusion et nombre d’hôtes.",
    "Décider si deux adresses sont dans le même réseau et vérifier une passerelle.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "masque",
    "CIDR",
    "diffusion",
    "passerelle"
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
      "title": "RFC 4632 — CIDR",
      "url": "https://www.rfc-editor.org/rfc/rfc4632"
    },
    {
      "title": "Python — introduction au module ipaddress",
      "url": "https://docs.python.org/fr/3/howto/ipaddress.html"
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
      "title": "RFC 4632 — CIDR",
      "url": "https://www.rfc-editor.org/rfc/rfc4632",
      "scope": "Notation /n et agrégation des réseaux. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — introduction au module ipaddress",
      "url": "https://docs.python.org/fr/3/howto/ipaddress.html",
      "scope": "Exemples de réseaux et d’hôtes. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une adresse IP seule ne suffit pas : il faut savoir quelle partie désigne le réseau et quelle partie désigne la machine. C’est le rôle du masque de sous-réseau. Le masque 255.255.255.0 signifie que les 24 premiers bits désignent le réseau et les 8 derniers la machine. On l’écrit plus simplement avec la notation CIDR : 192.168.1.0/24. Le nombre après la barre oblique, le préfixe, compte les bits du réseau.

Dans un réseau, deux adresses sont réservées. L’adresse de réseau, où tous les bits de la partie machine valent 0, désigne le réseau lui-même : 192.168.1.0. L’adresse de diffusion, où ils valent tous 1, sert à envoyer un message à toutes les machines du réseau : 192.168.1.255. Il reste donc 2 puissance (32 moins le préfixe), moins 2, adresses utilisables pour des appareils. Un /24 offre 254 hôtes, un /26 en offre 62, un /30 seulement 2, ce qui suffit pour relier deux routeurs.

Pourquoi cette frontière compte-t-elle ? Un appareil compare l’adresse du destinataire avec son propre réseau. Si elle est dans le même réseau, il envoie directement. Sinon, il confie le paquet à la passerelle, le routeur qui mène vers les autres réseaux et vers Internet. Une passerelle mal configurée, hors du réseau de l’appareil, empêche toute sortie : c’est une panne fréquente quand on saisit une configuration à la main.

En Python, ipaddress.ip_network("192.168.1.0/24") crée un objet réseau qui connaît netmask, network_address, broadcast_address et num_addresses. L’opérateur in teste si une adresse appartient au réseau. Si tu donnes une adresse de machine avec son préfixe, comme 192.168.1.77/24, ajoute strict=False : Python calcule alors le réseau qui la contient au lieu de refuser une écriture qui n’est pas une adresse de réseau.

Les préfixes ne tombent pas toujours sur des multiples de 8. Un /26 coupe le dernier octet en quatre blocs de 64 adresses : 0 à 63, 64 à 127, 128 à 191, 192 à 255. Deux machines en 10.0.0.20 et 10.0.0.70 partagent alors les trois premiers octets mais ne sont pas dans le même réseau. Comparer les trois premiers nombres d’une adresse est donc une méthode fausse, qu’il faut remplacer par le calcul.

## Exemple guidé 1

```python
import ipaddress

reseau = ipaddress.ip_network("192.168.1.0/24")
print(reseau.netmask, reseau.network_address, reseau.broadcast_address)
print(reseau.num_addresses - 2, "hôtes")
```

Affichage attendu :

    255.255.255.0 192.168.1.0 192.168.1.255
    254 hôtes

Trace :

- /24 correspond au masque 255.255.255.0.
- Le réseau commence à .0 et diffuse sur .255.
- 256 adresses moins 2 réservées : 254 hôtes.

## Exemple guidé 2

```python
import ipaddress

reseau = ipaddress.ip_network("10.0.0.0/26")
for texte in ["10.0.0.20", "10.0.0.70"]:
    print(texte, ipaddress.ip_address(texte) in reseau)
```

Affichage attendu :

    10.0.0.20 True
    10.0.0.70 False

Trace :

- Un /26 couvre 64 adresses : de 10.0.0.0 à 10.0.0.63.
- 20 est dans le bloc.
- 70 appartient au bloc suivant, même avec les mêmes trois premiers octets.

## Vérifier et expliquer

Pour 10.0.0.0/26, écris à la main l’adresse de réseau, la diffusion et le nombre d’hôtes, puis vérifie avec ip_network.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [RFC 4632 — CIDR](https://www.rfc-editor.org/rfc/rfc4632)
- [Python — introduction au module ipaddress](https://docs.python.org/fr/3/howto/ipaddress.html)
