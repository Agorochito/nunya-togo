---
{
  "id": "net-m4-03",
  "title_fr": "Projet : diagnostiquer le réseau d’une école",
  "course": "reseaux-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "net-m4-02"
  ],
  "outcomes": [
    "Combiner les outils du cours — configuration, mesures et ports — dans un diagnostic complet.",
    "Produire un rapport classé par gravité, utile à la direction comme au technicien."
  ],
  "idea_fr": "Un diagnostic réseau utile part de mesures objectives, les classe par gravité et désigne pour chaque problème la machine à traiter.",
  "analogy_fr": "Le mécanicien branche son appareil, lit chaque capteur, puis remet au chauffeur une fiche : à réparer tout de suite, à surveiller, en bon état.",
  "examples": [
    {
      "code": "ORDRE = {\"critique\": 0, \"élevé\": 1, \"moyen\": 2}\nconstats = [[\"moyen\", \"serveur : connexion mauvaise\"], [\"critique\", \"camera : connexion coupée\"], [\"élevé\", \"serveur : 3306\"]]\nprint(sorted(c[0] for c in constats))\nfor niveau, texte in sorted(constats, key=lambda c: (ORDRE[c[0]], c[1])):\n    print(\"[\" + niveau + \"] \" + texte)",
      "expected_output": "['critique', 'moyen', 'élevé']\n[critique] camera : connexion coupée\n[élevé] serveur : 3306\n[moyen] serveur : connexion mauvaise\n",
      "inputs": [],
      "trace_fr": [
        "L’ordre alphabétique place moyen avant élevé : faux.",
        "Le dictionnaire ORDRE donne le rang de chaque niveau.",
        "Le tri par rang place le critique en premier."
      ]
    },
    {
      "code": "import ipaddress\n\ndef diagnostic(ip, prefixe, passerelle):\n    reseau = ipaddress.ip_network(ip + \"/\" + str(prefixe), strict=False)\n    if ipaddress.ip_address(ip) in (reseau.network_address, reseau.broadcast_address):\n        return \"adresse réservée\"\n    if ip == passerelle:\n        return \"passerelle identique à l’adresse\"\n    if ipaddress.ip_address(passerelle) not in reseau:\n        return \"passerelle hors du réseau\"\n    return \"ok\"\n\nprint(diagnostic(\"192.168.1.70\", 26, \"192.168.1.1\"))\nprint(diagnostic(\"192.168.1.20\", 24, \"192.168.1.1\"))",
      "expected_output": "passerelle hors du réseau\nok\n",
      "inputs": [],
      "trace_fr": [
        "En /26, 192.168.1.70 appartient au bloc 64 à 127.",
        "La passerelle 192.168.1.1 est dans le bloc 0 à 63 : la caméra ne peut pas sortir.",
        "La caisse, en /24, est correcte."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Trier les niveaux par ordre alphabétique",
      "why_fr": "élevé passe après moyen.",
      "fix_fr": "Associe chaque niveau à un rang numérique."
    },
    {
      "error": "Réécrire chaque contrôle",
      "why_fr": "Plus de code, plus d’erreurs.",
      "fix_fr": "Réutilise les fonctions déjà testées."
    },
    {
      "error": "Diagnostiquer sans accord",
      "why_fr": "Mesurer un réseau tiers est une intrusion.",
      "fix_fr": "Travaille avec l’accord écrit du responsable."
    }
  ],
  "quiz": [
    {
      "question": "Quel constat doit apparaître en premier ?",
      "options": [
        "Connexion moyenne",
        "Caméra coupée",
        "Serveur lent",
        "Port 443 ouvert"
      ],
      "answer": 1,
      "explanation": "Un service inutilisable est critique.",
      "id": "net-m4-03-q1"
    },
    {
      "question": "Pourquoi un dictionnaire ORDRE pour trier ?",
      "options": [
        "Pour aller plus vite",
        "Parce que l’ordre alphabétique des niveaux ne suit pas leur gravité",
        "Par obligation",
        "Pour économiser de la mémoire"
      ],
      "answer": 1,
      "explanation": "Le rang numérique traduit la gravité.",
      "id": "net-m4-03-q2"
    },
    {
      "question": "La caméra en 192.168.1.70/26 a pour passerelle 192.168.1.1. Pourquoi ne sort-elle pas ?",
      "options": [
        "Le câble est coupé",
        "La passerelle est hors de son réseau",
        "Le DNS est faux",
        "Le port est fermé"
      ],
      "answer": 1,
      "explanation": "En /26, la caméra est dans le bloc 64 à 127.",
      "id": "net-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "diagnostic",
      "definition": "Analyse méthodique qui relie des symptômes à leurs causes."
    },
    {
      "term": "gravité",
      "definition": "Niveau d’urgence d’un constat : critique, élevé, moyen."
    },
    {
      "term": "rang",
      "definition": "Valeur numérique qui fixe l’ordre de tri des niveaux."
    },
    {
      "term": "synthèse",
      "definition": "Rapport court qui ne garde que les constats à traiter."
    }
  ],
  "recap_fr": [
    "Combiner les outils du cours — configuration, mesures et ports — dans un diagnostic complet.",
    "Produire un rapport classé par gravité, utile à la direction comme au technicien.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "diagnostic",
    "gravité",
    "rang",
    "synthèse"
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
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet"
    },
    {
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792"
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
      "title": "ANSSI — Interconnexion d’un SI à Internet",
      "url": "https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet",
      "scope": "Filtrage et cloisonnement. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "scope": "Messages echo utilisés par ping et traceroute. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ce projet réunit le cours dans une mission concrète. Un collège fictif de Sokodé se plaint : la caisse de la cantine fonctionne, la caméra de l’entrée ne transmet plus, et le serveur pédagogique semble lent. La direction te confie un diagnostic, avec l’accord écrit de son responsable informatique, qui t’a transmis trois relevés : les configurations fixes de quelques machines, des séries de ping vers chacune, et la liste des ports ouverts relevée par son propre outil.

La méthode tient en trois étapes, déjà pratiquées séparément. Vérifier les configurations : pour chaque machine, l’adresse, le préfixe et la passerelle forment-ils une configuration cohérente ? La fonction diagnostic du premier module répond. Mesurer la qualité des connexions : la fonction qualite du troisième module transforme chaque série de ping en verdict. Contrôler l’exposition : la liste des ports risqués du deuxième module signale les services qui ne devraient pas être ouverts.

Chaque observation devient ensuite un constat avec un niveau de gravité. Une configuration incohérente ou une connexion coupée rendent un service inutilisable : niveau critique. Un service dangereux exposé, comme une base de données ou un bureau à distance, n’empêche rien de fonctionner aujourd’hui mais ouvre la porte à une attaque : niveau élevé. Une connexion mauvaise dégrade le travail : niveau moyen. Une connexion simplement moyenne est notée par le technicien mais ne figure pas dans ce rapport de synthèse.

Le tri du rapport demande une attention particulière. Les niveaux sont des mots, et l’ordre alphabétique de critique, élevé et moyen ne correspond pas à leur gravité. On associe donc chaque niveau à un rang numérique dans un dictionnaire, puis on trie selon ce rang, et à rang égal selon le texte du constat. Ce petit dictionnaire évite une erreur classique qui placerait un problème moyen avant un problème élevé.

Dans le cas du collège, le rapport révélera probablement une caméra mal configurée, avec une passerelle hors de son réseau, qui explique qu’elle ne réponde plus ; un serveur lent ; et une base de données exposée sur ce même serveur. Chacun de ces constats appelle une action claire : corriger la configuration de la caméra, examiner la charge du serveur, fermer le port de la base de données au reste du réseau.

Après ce cours, tu sais lire un réseau comme un technicien : adresses et sous-réseaux, chemin des paquets, services, mesures, filtrage et zones. La suite naturelle est la pratique encadrée : le cours Terminal et Linux pour les outils en ligne de commande, le cours de cybersécurité pour la défense, et des laboratoires où tu as le droit de tout casser.

## Exemple guidé 1

```python
ORDRE = {"critique": 0, "élevé": 1, "moyen": 2}
constats = [["moyen", "serveur : connexion mauvaise"], ["critique", "camera : connexion coupée"], ["élevé", "serveur : 3306"]]
print(sorted(c[0] for c in constats))
for niveau, texte in sorted(constats, key=lambda c: (ORDRE[c[0]], c[1])):
    print("[" + niveau + "] " + texte)
```

Affichage attendu :

    ['critique', 'moyen', 'élevé']
    [critique] camera : connexion coupée
    [élevé] serveur : 3306
    [moyen] serveur : connexion mauvaise

Trace :

- L’ordre alphabétique place moyen avant élevé : faux.
- Le dictionnaire ORDRE donne le rang de chaque niveau.
- Le tri par rang place le critique en premier.

## Exemple guidé 2

```python
import ipaddress

def diagnostic(ip, prefixe, passerelle):
    reseau = ipaddress.ip_network(ip + "/" + str(prefixe), strict=False)
    if ipaddress.ip_address(ip) in (reseau.network_address, reseau.broadcast_address):
        return "adresse réservée"
    if ip == passerelle:
        return "passerelle identique à l’adresse"
    if ipaddress.ip_address(passerelle) not in reseau:
        return "passerelle hors du réseau"
    return "ok"

print(diagnostic("192.168.1.70", 26, "192.168.1.1"))
print(diagnostic("192.168.1.20", 24, "192.168.1.1"))
```

Affichage attendu :

    passerelle hors du réseau
    ok

Trace :

- En /26, 192.168.1.70 appartient au bloc 64 à 127.
- La passerelle 192.168.1.1 est dans le bloc 0 à 63 : la caméra ne peut pas sortir.
- La caisse, en /24, est correcte.

## Vérifier et expliquer

Modifie les relevés du collège pour corriger chaque problème, et vérifie que ton rapport finit par « réseau en bon état ».

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [ANSSI — Interconnexion d’un SI à Internet](https://cyber.gouv.fr/publications/recommandations-relatives-linterconnexion-dun-si-internet)
- [RFC 792 — ICMP](https://www.rfc-editor.org/rfc/rfc792)
