---
{
  "id": "net-m1-03",
  "title_fr": "Découper un réseau pour une école",
  "course": "reseaux-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "net-m1-02"
  ],
  "outcomes": [
    "Découper un réseau en sous-réseaux de taille égale avec subnets.",
    "Choisir le plus petit préfixe adapté à un besoin et bâtir un plan d’adressage."
  ],
  "idea_fr": "Découper un grand réseau en sous-réseaux sépare les usages : élèves, administration, invités, caméras.",
  "analogy_fr": "Un grand champ se partage en parcelles : une pour le maïs, une pour l’igname, une pour le manioc. Chaque parcelle a sa taille et sa clôture.",
  "examples": [
    {
      "code": "import ipaddress\n\nreseau = ipaddress.ip_network(\"10.10.0.0/24\")\nfor sous in reseau.subnets(new_prefix=26):\n    print(sous)",
      "expected_output": "10.10.0.0/26\n10.10.0.64/26\n10.10.0.128/26\n10.10.0.192/26\n",
      "inputs": [],
      "trace_fr": [
        "Passer de /24 à /26 ajoute deux bits au préfixe.",
        "Le bloc est donc divisé en 4.",
        "Chaque sous-réseau compte 64 adresses."
      ]
    },
    {
      "code": "besoin = 50\nprefixe = 30\nwhile 2 ** (32 - prefixe) - 2 < besoin:\n    prefixe -= 1\nprint(\"/\" + str(prefixe), 2 ** (32 - prefixe) - 2, \"hôtes\")",
      "expected_output": "/26 62 hôtes\n",
      "inputs": [],
      "trace_fr": [
        "On part d’un /30, le plus petit réseau utile.",
        "Tant que les hôtes manquent, on retire un bit au préfixe.",
        "/26 est le premier à offrir au moins 50 hôtes."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Tout mettre dans un seul réseau",
      "why_fr": "Un appareil infecté atteint tous les autres.",
      "fix_fr": "Un sous-réseau par usage, séparés par un pare-feu."
    },
    {
      "error": "Placer les petits blocs en premier",
      "why_fr": "Les grands blocs ne sont plus alignés et se chevauchent.",
      "fix_fr": "Attribue du plus grand au plus petit."
    },
    {
      "error": "Remplir tout l’espace",
      "why_fr": "La moindre extension oblige à tout renuméroter.",
      "fix_fr": "Garde de la marge."
    }
  ],
  "quiz": [
    {
      "question": "Combien de /26 dans un /24 ?",
      "options": [
        "2",
        "4",
        "8",
        "26"
      ],
      "answer": 1,
      "explanation": "Deux bits de plus : 2 × 2 = 4 blocs.",
      "id": "net-m1-03-q1"
    },
    {
      "question": "Quel préfixe pour 100 appareils ?",
      "options": [
        "/24",
        "/25",
        "/26",
        "/27"
      ],
      "answer": 1,
      "explanation": "Un /25 offre 126 hôtes, un /26 seulement 62.",
      "id": "net-m1-03-q2"
    },
    {
      "question": "Pourquoi séparer le Wi-Fi invité ?",
      "options": [
        "Pour aller plus vite",
        "Pour que les visiteurs n’atteignent pas les machines internes",
        "Pour économiser des adresses",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Le cloisonnement limite les contacts entre usages.",
      "id": "net-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "sous-réseau",
      "definition": "Partie d’un réseau découpée par un préfixe plus long."
    },
    {
      "term": "cloisonnement",
      "definition": "Séparation des usages en réseaux distincts filtrés."
    },
    {
      "term": "plan d’adressage",
      "definition": "Document qui attribue un sous-réseau et une passerelle à chaque usage."
    },
    {
      "term": "DHCP",
      "definition": "Service qui distribue automatiquement les adresses aux appareils."
    }
  ],
  "recap_fr": [
    "Découper un réseau en sous-réseaux de taille égale avec subnets.",
    "Choisir le plus petit préfixe adapté à un besoin et bâtir un plan d’adressage.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "sous-réseau",
    "cloisonnement",
    "plan d’adressage",
    "DHCP"
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
      "title": "Python — introduction au module ipaddress",
      "url": "https://docs.python.org/fr/3/howto/ipaddress.html"
    },
    {
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet"
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
      "title": "Python — introduction au module ipaddress",
      "url": "https://docs.python.org/fr/3/howto/ipaddress.html",
      "scope": "Exemples de réseaux et d’hôtes. Texte, exemples et exercices originaux Nunya.",
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

Une école qui branche tous ses appareils dans un seul réseau prend des risques. Un ordinateur d’élève infecté peut alors atteindre directement l’ordinateur de la comptabilité, et le téléphone d’un visiteur voit les imprimantes de l’administration. Découper le réseau en sous-réseaux, un par usage, limite ces contacts : les échanges entre sous-réseaux passent par un routeur ou un pare-feu, qui décide de ce qui est permis. C’est le cloisonnement.

Le découpage le plus simple produit des parts égales. Un /24 de 256 adresses devient deux /25 de 128 adresses, ou quatre /26 de 64 adresses : chaque bit ajouté au préfixe divise le bloc en deux. En Python, ip_network("10.10.0.0/24").subnets(new_prefix=26) énumère les quatre sous-réseaux, du premier au dernier.

Dans la réalité, les besoins ne sont pas égaux : une salle informatique de 50 postes, une administration de 10, un réseau invité qui peut recevoir 100 téléphones. On choisit alors, pour chaque besoin, le plus petit bloc qui suffit. Pour trouver son préfixe, on part d’un petit réseau et on l’agrandit tant que le nombre d’hôtes reste insuffisant. Cinquante appareils demandent un /26, qui offre 62 hôtes ; un /27 n’en offre que 30.

Pour placer des blocs de tailles différentes sans chevauchement, une méthode fiable consiste à les attribuer du plus grand au plus petit, les uns à la suite des autres. Comme chaque bloc est deux fois plus petit ou de même taille que le précédent, il commence toujours à une adresse alignée sur sa taille. Si la somme des blocs dépasse le réseau de départ, le plan est impossible : il faut un réseau plus grand ou des besoins revus.

Dans chaque sous-réseau, on réserve par convention la première adresse utilisable pour la passerelle, le routeur du sous-réseau. Les autres adresses vont aux appareils, souvent distribuées automatiquement par un serveur DHCP. Un plan d’adressage écrit, qui indique pour chaque usage son sous-réseau et sa passerelle, évite les conflits et facilite les dépannages des années plus tard.

Garde enfin de la marge. Une école grandit, ajoute une salle, installe des caméras. Un plan qui remplit tout l’espace dès le premier jour oblige à tout renuméroter à la première extension. Le réseau privé 10.0.0.0/8 est immense : on peut se permettre des blocs généreux.

## Exemple guidé 1

```python
import ipaddress

reseau = ipaddress.ip_network("10.10.0.0/24")
for sous in reseau.subnets(new_prefix=26):
    print(sous)
```

Affichage attendu :

    10.10.0.0/26
    10.10.0.64/26
    10.10.0.128/26
    10.10.0.192/26

Trace :

- Passer de /24 à /26 ajoute deux bits au préfixe.
- Le bloc est donc divisé en 4.
- Chaque sous-réseau compte 64 adresses.

## Exemple guidé 2

```python
besoin = 50
prefixe = 30
while 2 ** (32 - prefixe) - 2 < besoin:
    prefixe -= 1
print("/" + str(prefixe), 2 ** (32 - prefixe) - 2, "hôtes")
```

Affichage attendu :

    /26 62 hôtes

Trace :

- On part d’un /30, le plus petit réseau utile.
- Tant que les hôtes manquent, on retire un bit au préfixe.
- /26 est le premier à offrir au moins 50 hôtes.

## Vérifier et expliquer

Dessine le plan d’adressage de ton école idéale : liste les usages, estime les appareils, puis calcule chaque préfixe.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [Python — introduction au module ipaddress](https://docs.python.org/fr/3/howto/ipaddress.html)
- [ANSSI — Interconnexion d’un SI à Internet](https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet)
