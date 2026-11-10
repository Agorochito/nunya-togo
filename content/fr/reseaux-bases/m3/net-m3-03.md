---
{
  "id": "net-m3-03",
  "title_fr": "Lire et vérifier une configuration réseau",
  "course": "reseaux-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "net-m3-02"
  ],
  "outcomes": [
    "Lire une configuration écrite en lignes clé = valeur, en ignorant commentaires et lignes vides.",
    "Détecter les erreurs courantes : adresse invalide, passerelle hors du réseau, DNS invalide et adresses en double."
  ],
  "idea_fr": "La plupart des pannes réseau d’une petite structure viennent d’une configuration mal saisie ; la vérifier automatiquement évite des heures de recherche.",
  "analogy_fr": "Avant un long voyage, le chauffeur vérifie une liste : pneus, huile, freins. Il ne devine pas la panne, il contrôle chaque point.",
  "examples": [
    {
      "code": "def lire_config(texte):\n    config = {}\n    for ligne in texte.split(\"\\n\"):\n        ligne = ligne.strip()\n        if not ligne or ligne.startswith(\"#\"):\n            continue\n        cle, valeur = ligne.split(\"=\", 1)\n        config[cle.strip()] = valeur.strip()\n    return config\n\ntexte = \"# imprimante\\nadresse = 192.168.1.50\\n\\nprefixe = 24\\n\"\nprint(lire_config(texte))",
      "expected_output": "{'adresse': '192.168.1.50', 'prefixe': '24'}\n",
      "inputs": [],
      "trace_fr": [
        "La ligne de commentaire et la ligne vide sont ignorées.",
        "strip retire les espaces autour des clés et des valeurs.",
        "Le résultat est un dictionnaire."
      ]
    },
    {
      "code": "import ipaddress\n\nreseau = ipaddress.ip_network(\"192.168.1.0/24\")\ntry:\n    print(\"192.168.1.1\" in reseau)\nexcept AttributeError:\n    print(\"erreur : un texte n’est pas une adresse\")\nprint(ipaddress.ip_address(\"192.168.1.1\") in reseau)",
      "expected_output": "erreur : un texte n’est pas une adresse\nTrue\n",
      "inputs": [],
      "trace_fr": [
        "Tester un texte dans un réseau provoque AttributeError.",
        "Il faut d’abord le convertir en adresse.",
        "La comparaison devient alors correcte."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Comparer un texte et un réseau",
      "why_fr": "Python s’arrête sur AttributeError.",
      "fix_fr": "Convertis avec ip_address avant d’utiliser in."
    },
    {
      "error": "Couper à chaque signe égal",
      "why_fr": "Une valeur contenant = est tronquée.",
      "fix_fr": "Utilise split(\"=\", 1)."
    },
    {
      "error": "Laisser l’analyse planter",
      "why_fr": "Les machines suivantes ne sont jamais vérifiées.",
      "fix_fr": "Transforme chaque erreur en constat signalé."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie \"a = b = c\".split(\"=\", 1) ?",
      "options": [
        "['a ', ' b = c']",
        "['a', 'b', 'c']",
        "['a = b', 'c']",
        "Une erreur"
      ],
      "answer": 0,
      "explanation": "Une seule coupure, au premier signe égal.",
      "id": "net-m3-03-q1"
    },
    {
      "question": "Deux imprimantes ont la même adresse. Comment s’appelle ce problème ?",
      "options": [
        "Une boucle DNS",
        "Un conflit d’adresses",
        "Une perte de paquets",
        "Un port ouvert"
      ],
      "answer": 1,
      "explanation": "Les deux appareils se disputent la même adresse.",
      "id": "net-m3-03-q2"
    },
    {
      "question": "Quelles informations faut-il au minimum à un appareil ?",
      "options": [
        "Un port et un nom",
        "Adresse, préfixe, passerelle et DNS",
        "Un mot de passe",
        "Une adresse MAC seulement"
      ],
      "answer": 1,
      "explanation": "Ce sont les quatre réglages d’une configuration IP.",
      "id": "net-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "configuration fixe",
      "definition": "Réglages saisis à la main sur un appareil, sans DHCP."
    },
    {
      "term": "conflit d’adresses",
      "definition": "Deux appareils utilisant la même adresse IP."
    },
    {
      "term": "strip",
      "definition": "Méthode qui retire les espaces au début et à la fin d’un texte."
    },
    {
      "term": "constat",
      "definition": "Problème précis signalé par une vérification."
    }
  ],
  "recap_fr": [
    "Lire une configuration écrite en lignes clé = valeur, en ignorant commentaires et lignes vides.",
    "Détecter les erreurs courantes : adresse invalide, passerelle hors du réseau, DNS invalide et adresses en double.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "configuration fixe",
    "conflit d’adresses",
    "strip",
    "constat"
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
    }
  ]
}
---


## Explication pas à pas

Chaque appareil d’un réseau a besoin de quatre informations : son adresse, son préfixe, sa passerelle et au moins un serveur DNS. Le plus souvent, un serveur DHCP les distribue automatiquement. Mais les imprimantes, les serveurs, les caméras et certains postes reçoivent une configuration fixe, saisie à la main. Une seule faute de frappe suffit alors à isoler l’appareil.

Ces configurations sont souvent conservées dans des fichiers texte simples, une information par ligne, sous la forme clé = valeur. On y trouve aussi des lignes vides et des commentaires, qui commencent par #, pour expliquer à quoi sert la machine. Pour les lire, on découpe le texte en lignes, on retire les espaces au début et à la fin avec strip, on ignore les lignes vides et les commentaires, puis on coupe chaque ligne au premier signe égal. split("=", 1) coupe une seule fois, ce qui préserve une valeur qui contiendrait elle-même un signe égal.

Viennent ensuite les vérifications, reprises des leçons précédentes. L’adresse et le préfixe doivent former un réseau valide. La passerelle doit appartenir à ce réseau. Le serveur DNS doit être une adresse valide. Attention à un piège courant en Python : tester si le texte "192.168.1.1" appartient à un objet réseau ne fonctionne pas, car on compare un texte et un réseau ; Python s’arrête sur une erreur AttributeError. Il faut d’abord transformer le texte en adresse avec ip_address.

Un autre problème ne se voit qu’en regardant plusieurs machines ensemble : le conflit d’adresses. Deux appareils configurés avec la même adresse se gênent mutuellement, et les symptômes sont étranges : connexions qui coupent par moments, impression qui part sur la mauvaise machine. Pour le détecter, on regroupe les machines par adresse et on signale celles qui partagent la même.

Un bon outil de vérification ne plante jamais sur une configuration incomplète ou fantaisiste. Une clé absente ou une adresse illisible deviennent des problèmes signalés, pas des erreurs Python qui arrêtent l’analyse de toutes les machines suivantes. C’est le rôle des blocs try et except autour de chaque contrôle.

Le résultat final est une liste de constats précis, triés, avec le nom de la machine concernée. Le technicien peut alors corriger directement, sans tester chaque appareil un par un. Ce type de contrôle se lance aussi avant toute modification, pour comparer l’état avant et après.

## Exemple guidé 1

```python
def lire_config(texte):
    config = {}
    for ligne in texte.split("\n"):
        ligne = ligne.strip()
        if not ligne or ligne.startswith("#"):
            continue
        cle, valeur = ligne.split("=", 1)
        config[cle.strip()] = valeur.strip()
    return config

texte = "# imprimante\nadresse = 192.168.1.50\n\nprefixe = 24\n"
print(lire_config(texte))
```

Affichage attendu :

    {'adresse': '192.168.1.50', 'prefixe': '24'}

Trace :

- La ligne de commentaire et la ligne vide sont ignorées.
- strip retire les espaces autour des clés et des valeurs.
- Le résultat est un dictionnaire.

## Exemple guidé 2

```python
import ipaddress

reseau = ipaddress.ip_network("192.168.1.0/24")
try:
    print("192.168.1.1" in reseau)
except AttributeError:
    print("erreur : un texte n’est pas une adresse")
print(ipaddress.ip_address("192.168.1.1") in reseau)
```

Affichage attendu :

    erreur : un texte n’est pas une adresse
    True

Trace :

- Tester un texte dans un réseau provoque AttributeError.
- Il faut d’abord le convertir en adresse.
- La comparaison devient alors correcte.

## Vérifier et expliquer

Écris la configuration fixe d’une imprimante de ton école idéale avec une erreur volontaire, et vérifie que ton programme la trouve.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Python — ipaddress](https://docs.python.org/fr/3/library/ipaddress.html)
- [Python — introduction au module ipaddress](https://docs.python.org/fr/3/howto/ipaddress.html)
