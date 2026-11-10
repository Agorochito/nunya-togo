---
{
  "id": "net-m2-01",
  "title_fr": "Couches et encapsulation",
  "course": "reseaux-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "net-m1-03"
  ],
  "outcomes": [
    "Décrire les quatre couches du modèle TCP/IP et ce que chacune ajoute au message.",
    "Manipuler un paquet encapsulé : fragmentation, durée de vie (TTL) et lecture des en-têtes."
  ],
  "idea_fr": "Un message voyage emballé dans plusieurs enveloppes, chacune ajoutée par une couche qui ne s’occupe que de son propre travail.",
  "analogy_fr": "Pour envoyer un colis au village, on écrit une lettre, on la met dans une enveloppe avec le nom du destinataire, puis dans un sac du transporteur avec l’adresse de la gare. Chaque intermédiaire ne lit que l’étiquette qui le concerne.",
  "examples": [
    {
      "code": "message = \"GET /notes\"\nsegment = {\"port_source\": 50432, \"port_destination\": 443, \"donnees\": message}\npaquet = {\"ip_source\": \"192.168.1.20\", \"ip_destination\": \"41.207.160.5\", \"ttl\": 64, \"donnees\": segment}\ntrame = {\"mac_source\": \"aa:bb:cc:00:00:01\", \"mac_destination\": \"aa:bb:cc:00:00:fe\", \"donnees\": paquet}\nprint(trame[\"donnees\"][\"donnees\"][\"donnees\"])\nprint(trame[\"donnees\"][\"ttl\"])",
      "expected_output": "GET /notes\n64\n",
      "inputs": [],
      "trace_fr": [
        "Le message est enveloppé trois fois.",
        "Chaque [\"donnees\"] retire une enveloppe.",
        "Le TTL est un champ de la couche internet."
      ]
    },
    {
      "code": "import math\n\ntaille, mtu = 4000, 1500\nprint(math.ceil(taille / mtu), \"fragments\")\nprint(taille // mtu, \"avec une division entière : faux\")",
      "expected_output": "3 fragments\n2 avec une division entière : faux\n",
      "inputs": [],
      "trace_fr": [
        "4000 / 1500 vaut environ 2,67.",
        "math.ceil arrondit vers le haut : 3 fragments.",
        "La division entière oublie le dernier morceau."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Arrondir le nombre de fragments vers le bas",
      "why_fr": "Le dernier morceau est oublié.",
      "fix_fr": "Utilise math.ceil."
    },
    {
      "error": "Modifier le paquet reçu",
      "why_fr": "L’appelant voit son paquet changé sans le savoir.",
      "fix_fr": "Renvoie une copie modifiée."
    },
    {
      "error": "Confondre adresse MAC et adresse IP",
      "why_fr": "La MAC sert entre voisins, l’IP de bout en bout.",
      "fix_fr": "Situe chaque adresse dans sa couche."
    }
  ],
  "quiz": [
    {
      "question": "Quelle couche ajoute les numéros de port ?",
      "options": [
        "Application",
        "Transport",
        "Internet",
        "Accès réseau"
      ],
      "answer": 1,
      "explanation": "TCP et UDP désignent le programme destinataire par un port.",
      "id": "net-m2-01-q1"
    },
    {
      "question": "Que se passe-t-il quand le TTL atteint 0 ?",
      "options": [
        "Le paquet accélère",
        "Le paquet est détruit",
        "Le paquet est chiffré",
        "Rien"
      ],
      "answer": 1,
      "explanation": "Cela évite les paquets qui tournent sans fin.",
      "id": "net-m2-01-q2"
    },
    {
      "question": "Combien de fragments pour 3 001 octets avec une MTU de 1 500 ?",
      "options": [
        "2",
        "3",
        "1",
        "4"
      ],
      "answer": 1,
      "explanation": "3001 / 1500 ≈ 2,0007, arrondi vers le haut : 3.",
      "id": "net-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "encapsulation",
      "definition": "Ajout d’un en-tête par chaque couche autour des données."
    },
    {
      "term": "MTU",
      "definition": "Taille maximale qu’un lien transmet en une fois."
    },
    {
      "term": "TTL",
      "definition": "Durée de vie d’un paquet, diminuée de 1 par routeur."
    },
    {
      "term": "adresse MAC",
      "definition": "Identifiant d’une carte réseau, utilisé entre appareils voisins."
    }
  ],
  "recap_fr": [
    "Décrire les quatre couches du modèle TCP/IP et ce que chacune ajoute au message.",
    "Manipuler un paquet encapsulé : fragmentation, durée de vie (TTL) et lecture des en-têtes.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "encapsulation",
    "MTU",
    "TTL",
    "adresse MAC"
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
      "title": "RFC 791 — IPv4",
      "url": "https://www.rfc-editor.org/rfc/rfc791"
    },
    {
      "title": "MDN — Comment fonctionne Internet",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work"
    }
  ],
  "sources": [
    {
      "title": "RFC 791 — IPv4",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "scope": "En-tête, fragmentation et durée de vie (TTL). Texte, exemples et exercices originaux Nunya.",
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

Envoyer une page web à travers le monde est un problème énorme. Les réseaux le découpent en couches, chacune chargée d’une seule partie du travail. Le modèle TCP/IP en compte quatre. La couche application contient le message lui-même et son langage : une requête HTTP, une question DNS. La couche transport découpe et numérote les données, et désigne le programme destinataire par un numéro de port ; TCP garantit l’arrivée complète et dans l’ordre, UDP envoie plus vite sans garantie. La couche internet ajoute les adresses IP de l’expéditeur et du destinataire, que les routeurs lisent pour acheminer le paquet. La couche accès réseau transporte le tout sur le support physique, câble ou Wi-Fi, entre deux appareils voisins identifiés par leur adresse MAC.

À l’envoi, chaque couche enveloppe ce qu’elle reçoit de la couche du dessus en y ajoutant son en-tête : c’est l’encapsulation. Le message devient un segment, puis un paquet, puis une trame. À l’arrivée, chaque couche retire son enveloppe et passe le contenu à la couche du dessus. En Python, des dictionnaires imbriqués représentent bien cette structure : la trame contient le paquet, qui contient le segment, qui contient le message.

Deux contraintes de la couche internet méritent d’être connues. La première est la taille maximale qu’un lien accepte, la MTU, souvent 1 500 octets. Des données plus grosses sont découpées en fragments, et il faut arrondir vers le haut : 4 000 octets demandent trois fragments, pas deux et demi. La deuxième est la durée de vie, le TTL. Chaque routeur traversé diminue le TTL de 1 ; s’il atteint 0, le paquet est détruit. Cette règle empêche un paquet de tourner indéfiniment quand des routeurs sont mal configurés, et c’est elle que l’outil traceroute exploite pour révéler le chemin suivi.

Cette organisation explique beaucoup de pannes et d’attaques. Un câble débranché touche la couche accès réseau ; une mauvaise passerelle, la couche internet ; un port bloqué par un pare-feu, la couche transport ; une erreur dans l’adresse du site, la couche application. Un bon diagnostic remonte les couches dans l’ordre, du câble jusqu’au programme.

Retiens aussi qu’un intermédiaire qui ne fait que transmettre ne devrait pas modifier le contenu des couches supérieures. En programmation, cela se traduit par une règle simple : une fonction qui calcule le passage d’un paquet renvoie un nouveau paquet au lieu de modifier celui qu’on lui a confié.

## Exemple guidé 1

```python
message = "GET /notes"
segment = {"port_source": 50432, "port_destination": 443, "donnees": message}
paquet = {"ip_source": "192.168.1.20", "ip_destination": "41.207.160.5", "ttl": 64, "donnees": segment}
trame = {"mac_source": "aa:bb:cc:00:00:01", "mac_destination": "aa:bb:cc:00:00:fe", "donnees": paquet}
print(trame["donnees"]["donnees"]["donnees"])
print(trame["donnees"]["ttl"])
```

Affichage attendu :

    GET /notes
    64

Trace :

- Le message est enveloppé trois fois.
- Chaque ["donnees"] retire une enveloppe.
- Le TTL est un champ de la couche internet.

## Exemple guidé 2

```python
import math

taille, mtu = 4000, 1500
print(math.ceil(taille / mtu), "fragments")
print(taille // mtu, "avec une division entière : faux")
```

Affichage attendu :

    3 fragments
    2 avec une division entière : faux

Trace :

- 4000 / 1500 vaut environ 2,67.
- math.ceil arrondit vers le haut : 3 fragments.
- La division entière oublie le dernier morceau.

## Vérifier et expliquer

Prends un exemple de ton quotidien, comme ouvrir un site, et décris ce que fait chaque couche, de ton message jusqu’au Wi-Fi.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [RFC 791 — IPv4](https://www.rfc-editor.org/rfc/rfc791)
- [MDN — Comment fonctionne Internet](https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
