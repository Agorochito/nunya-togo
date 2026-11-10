---
{
  "id": "net-m3-02",
  "title_fr": "Suivre le chemin des paquets avec traceroute",
  "course": "reseaux-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "net-m3-01"
  ],
  "outcomes": [
    "Lire le résultat d’un traceroute : sauts, adresses, latences et absences de réponse.",
    "Repérer où la latence augmente et où le chemin s’interrompt."
  ],
  "idea_fr": "traceroute révèle chaque routeur traversé jusqu’à la destination ; c’est la carte du trajet d’un paquet.",
  "analogy_fr": "Pour savoir où un colis s’est perdu, on regarde les tampons de chaque bureau de poste traversé : le dernier tampon indique où chercher.",
  "examples": [
    {
      "code": "sauts = [[1, \"192.168.1.1\", 2], [2, \"10.20.0.1\", 9], [3, None, None], [4, \"41.207.160.5\", 101]]\nfor numero, ip, ms in sauts:\n    print(numero, ip if ip else \"*\", str(ms) + \" ms\" if ms is not None else \"\")",
      "expected_output": "1 192.168.1.1 2 ms\n2 10.20.0.1 9 ms\n3 * \n4 41.207.160.5 101 ms\n",
      "inputs": [],
      "trace_fr": [
        "Chaque saut a un numéro, une adresse et une latence.",
        "Le saut 3 ne répond pas : on affiche une étoile.",
        "La destination est atteinte au saut 4."
      ]
    },
    {
      "code": "import ipaddress\n\nsauts = [[1, \"192.168.1.1\", 2], [2, \"10.20.0.1\", 9], [3, \"41.207.0.1\", 14]]\nfor numero, ip, ms in sauts:\n    print(numero, ipaddress.ip_address(ip).is_private)",
      "expected_output": "1 True\n2 True\n3 False\n",
      "inputs": [],
      "trace_fr": [
        "Les deux premiers sauts sont dans des réseaux privés.",
        "Le saut 3 est le premier en adresse publique : la sortie vers Internet."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Prendre le dernier élément de la liste",
      "why_fr": "Il peut ne pas avoir répondu.",
      "fix_fr": "Cherche le dernier saut dont l’adresse n’est pas None."
    },
    {
      "error": "Voir une panne dans chaque étoile",
      "why_fr": "Certains routeurs ne répondent jamais à traceroute.",
      "fix_fr": "Regarde si des sauts suivants répondent."
    },
    {
      "error": "Repérer le public avec un préfixe de texte",
      "why_fr": "10.x et 172.16.x sont aussi privés.",
      "fix_fr": "Utilise ipaddress et is_private."
    }
  ],
  "quiz": [
    {
      "question": "Sur quel mécanisme repose traceroute ?",
      "options": [
        "Le DNS",
        "Le TTL qui expire à chaque routeur",
        "Le chiffrement",
        "Les ports"
      ],
      "answer": 1,
      "explanation": "Chaque routeur qui détruit le paquet révèle son adresse.",
      "id": "net-m3-02-q1"
    },
    {
      "question": "Les sauts 5 et 6 ne répondent pas, puis le 7 répond. Que conclure ?",
      "options": [
        "Panne au saut 5",
        "Ces routeurs ne répondent pas, le chemin continue",
        "La destination est éteinte",
        "Le câble est coupé"
      ],
      "answer": 1,
      "explanation": "Des sauts répondent après eux : le chemin fonctionne.",
      "id": "net-m3-02-q2"
    },
    {
      "question": "La latence passe de 14 à 95 ms entre deux sauts. Que suggère ce bond ?",
      "options": [
        "Un lien lent ou lointain",
        "Une erreur DNS",
        "Un mauvais mot de passe",
        "Rien"
      ],
      "answer": 0,
      "explanation": "C’est souvent un lien long ou saturé.",
      "id": "net-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "saut",
      "definition": "Routeur traversé par un paquet, numéroté dans l’ordre."
    },
    {
      "term": "traceroute",
      "definition": "Outil qui révèle les routeurs traversés grâce au TTL."
    },
    {
      "term": "ICMP",
      "definition": "Protocole de messages de contrôle et d’erreur du réseau."
    },
    {
      "term": "fournisseur d’accès",
      "definition": "Entreprise qui relie un réseau local à Internet."
    }
  ],
  "recap_fr": [
    "Lire le résultat d’un traceroute : sauts, adresses, latences et absences de réponse.",
    "Repérer où la latence augmente et où le chemin s’interrompt.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "saut",
    "traceroute",
    "ICMP",
    "fournisseur d’accès"
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
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792"
    },
    {
      "title": "RFC 791 — IPv4",
      "url": "https://www.rfc-editor.org/rfc/rfc791"
    }
  ],
  "sources": [
    {
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "scope": "Messages echo utilisés par ping et traceroute. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "RFC 791 — IPv4",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "scope": "En-tête, fragmentation et durée de vie (TTL). Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ping dit si une destination répond ; traceroute dit par où passent les paquets pour l’atteindre. L’outil exploite la durée de vie, le TTL, vue au module précédent. Il envoie un premier paquet avec un TTL de 1 : le premier routeur le détruit et renvoie un message d’erreur ICMP qui révèle son adresse. Il recommence avec un TTL de 2, puis 3, et ainsi de suite. Chaque routeur qui répond devient un saut de la liste, avec le temps de réponse mesuré.

Un résultat typique commence par la passerelle de l’école ou de la maison, en adresse privée, souvent 192.168.1.1. Viennent ensuite des routeurs du fournisseur d’accès, parfois encore en adresses privées internes, puis des routeurs aux adresses publiques, à mesure que le paquet traverse Internet, jusqu’à la destination. Le premier saut en adresse publique marque à peu près la sortie du réseau local et de son fournisseur.

La latence de chaque saut se lit comme une suite de bornes kilométriques. Elle augmente normalement au fil du trajet. Un saut où elle bondit, par exemple de 14 à 95 ms, signale un lien lent ou lointain : un câble sous-marin, une liaison satellite ou un lien saturé. Ce saut est souvent le meilleur endroit où chercher un problème de lenteur.

Les étoiles, ou absences de réponse, demandent de l’interprétation. Un saut isolé sans réponse, suivi de sauts qui répondent, n’est pas une panne : ce routeur choisit simplement de ne pas renvoyer de message d’erreur. En revanche, si plus rien ne répond à partir d’un saut jusqu’à la fin, le chemin s’interrompt probablement juste après le dernier routeur qui a répondu. C’est l’information à transmettre au fournisseur d’accès.

Dans ce cours, un traceroute est une liste de sauts, chacun écrit [numéro, adresse, latence], avec None quand le saut ne répond pas. Pour trouver le dernier saut atteint, il faut chercher le dernier élément dont l’adresse n’est pas None, et non simplement prendre le dernier élément de la liste. Pour repérer le plus grand bond, on compare les latences de deux sauts consécutifs qui ont répondu.

Comme pour les autres outils, traceroute envoie des paquets vers une destination réelle. Il est banal pour vérifier sa propre connexion, mais lancé de façon répétée et massive contre un réseau tiers, il devient une forme de reconnaissance. Les exercices utilisent des résultats fictifs.

## Exemple guidé 1

```python
sauts = [[1, "192.168.1.1", 2], [2, "10.20.0.1", 9], [3, None, None], [4, "41.207.160.5", 101]]
for numero, ip, ms in sauts:
    print(numero, ip if ip else "*", str(ms) + " ms" if ms is not None else "")
```

Affichage attendu :

    1 192.168.1.1 2 ms
    2 10.20.0.1 9 ms
    3 * 
    4 41.207.160.5 101 ms

Trace :

- Chaque saut a un numéro, une adresse et une latence.
- Le saut 3 ne répond pas : on affiche une étoile.
- La destination est atteinte au saut 4.

## Exemple guidé 2

```python
import ipaddress

sauts = [[1, "192.168.1.1", 2], [2, "10.20.0.1", 9], [3, "41.207.0.1", 14]]
for numero, ip, ms in sauts:
    print(numero, ipaddress.ip_address(ip).is_private)
```

Affichage attendu :

    1 True
    2 True
    3 False

Trace :

- Les deux premiers sauts sont dans des réseaux privés.
- Le saut 3 est le premier en adresse publique : la sortie vers Internet.

## Vérifier et expliquer

À partir du traceroute de l’exemple, dessine le trajet sur papier : réseau local, fournisseur, Internet, destination.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [RFC 792 — ICMP](https://www.rfc-editor.org/rfc/rfc792)
- [RFC 791 — IPv4](https://www.rfc-editor.org/rfc/rfc791)
