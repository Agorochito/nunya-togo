---
{
  "id": "net-m2-03",
  "title_fr": "Le DNS : l’annuaire d’Internet",
  "course": "reseaux-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "net-m2-02"
  ],
  "outcomes": [
    "Résoudre un nom en suivant ses alias jusqu’à une adresse IP.",
    "Expliquer le rôle du cache et du TTL, et les risques d’une réponse DNS falsifiée."
  ],
  "idea_fr": "Les humains retiennent des noms, les machines des adresses ; le DNS traduit les premiers en secondes.",
  "analogy_fr": "Pour appeler quelqu’un, on cherche son nom dans le répertoire du téléphone. Si quelqu’un a modifié le répertoire, on appelle le mauvais numéro sans le savoir.",
  "examples": [
    {
      "code": "zone = {\n    \"www.ecole-avenir.tg\": [\"CNAME\", \"ecole-avenir.tg\"],\n    \"ecole-avenir.tg\": [\"A\", \"41.207.160.5\"],\n}\nnom = \"www.ecole-avenir.tg\"\nwhile zone[nom][0] == \"CNAME\":\n    print(nom, \"est un alias de\", zone[nom][1])\n    nom = zone[nom][1]\nprint(nom, \"->\", zone[nom][1])",
      "expected_output": "www.ecole-avenir.tg est un alias de ecole-avenir.tg\necole-avenir.tg -> 41.207.160.5\n",
      "inputs": [],
      "trace_fr": [
        "www est un CNAME : on suit l’alias.",
        "ecole-avenir.tg est un enregistrement A.",
        "La boucle s’arrête sur l’adresse IP."
      ]
    },
    {
      "code": "nom = \"notes.ecole-avenir.tg\"\nparties = nom.split(\".\")\nfor i in range(len(parties) - 1, -1, -1):\n    print(\".\".join(parties[i:]))",
      "expected_output": "tg\necole-avenir.tg\nnotes.ecole-avenir.tg\n",
      "inputs": [],
      "trace_fr": [
        "On découpe aux points.",
        "On part de la dernière partie : le domaine de premier niveau.",
        "On ajoute une partie à chaque niveau."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Suivre les alias sans limite",
      "why_fr": "Deux alias qui se désignent font tourner le programme sans fin.",
      "fix_fr": "Limite le nombre de redirections."
    },
    {
      "error": "Utiliser une réponse expirée",
      "why_fr": "L’adresse a pu changer.",
      "fix_fr": "Compare l’heure actuelle avec l’expiration."
    },
    {
      "error": "Garder le mot de passe par défaut de la box",
      "why_fr": "Un attaquant peut changer son DNS.",
      "fix_fr": "Change-le dès l’installation."
    }
  ],
  "quiz": [
    {
      "question": "Que contient un enregistrement A ?",
      "options": [
        "Un alias",
        "Une adresse IPv4",
        "Un serveur de courriel",
        "Un mot de passe"
      ],
      "answer": 1,
      "explanation": "A associe un nom à une adresse IPv4.",
      "id": "net-m2-03-q1"
    },
    {
      "question": "Que signifie un TTL de 3600 sur une réponse DNS ?",
      "options": [
        "Elle est valable une heure dans le cache",
        "Elle expire à 36 h",
        "Elle passe 3600 routeurs",
        "Rien"
      ],
      "answer": 0,
      "explanation": "Le TTL DNS est une durée de cache en secondes.",
      "id": "net-m2-03-q2"
    },
    {
      "question": "Comment lire ecole-avenir.tg ?",
      "options": [
        "De gauche à droite",
        "De droite à gauche : tg, puis ecole-avenir",
        "Au hasard",
        "Lettre par lettre"
      ],
      "answer": 1,
      "explanation": "La hiérarchie commence par le domaine de premier niveau.",
      "id": "net-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "DNS",
      "definition": "Système qui traduit les noms de domaine en adresses IP."
    },
    {
      "term": "enregistrement A",
      "definition": "Association d’un nom à une adresse IPv4."
    },
    {
      "term": "CNAME",
      "definition": "Enregistrement qui fait d’un nom l’alias d’un autre."
    },
    {
      "term": "cache DNS",
      "definition": "Mémoire temporaire des réponses, valable pendant leur TTL."
    }
  ],
  "recap_fr": [
    "Résoudre un nom en suivant ses alias jusqu’à une adresse IP.",
    "Expliquer le rôle du cache et du TTL, et les risques d’une réponse DNS falsifiée.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "DNS",
    "enregistrement A",
    "CNAME",
    "cache DNS"
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
      "title": "RFC 1035 — DNS",
      "url": "https://www.rfc-editor.org/rfc/rfc1035"
    },
    {
      "title": "MDN — Qu’est-ce qu’un nom de domaine",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name"
    }
  ],
  "sources": [
    {
      "title": "RFC 1035 — DNS",
      "url": "https://www.rfc-editor.org/rfc/rfc1035",
      "scope": "Enregistrements, alias CNAME et durée de cache TTL. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — Qu’est-ce qu’un nom de domaine",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name",
      "scope": "Structure des noms et résolution. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Personne ne tape 41.207.160.5 pour consulter les notes de son école : on tape un nom, comme ecole-avenir.tg. Le système de noms de domaine, le DNS, traduit ce nom en adresse IP. Chaque fois que tu ouvres un site, ton appareil pose d’abord une question DNS, puis contacte l’adresse obtenue.

Les noms sont organisés en hiérarchie, lue de droite à gauche. Le domaine de premier niveau, comme .tg pour le Togo, .fr ou .com, est géré par un registre. Sous lui, un organisme réserve un nom, comme ecole-avenir.tg, et peut créer des sous-domaines comme www.ecole-avenir.tg ou mail.ecole-avenir.tg. La résolution part de la racine et descend cette hiérarchie, de serveur en serveur, jusqu’au serveur qui fait autorité pour le nom demandé.

Ce serveur publie des enregistrements. Un enregistrement A associe un nom à une adresse IPv4. Un enregistrement CNAME indique qu’un nom est un alias d’un autre nom : pour obtenir l’adresse, il faut résoudre ce second nom, qui peut être lui-même un alias. Un enregistrement MX désigne le serveur qui reçoit les courriels du domaine. Une résolution suit donc parfois une chaîne d’alias ; un résolveur prudent limite le nombre d’étapes, pour ne pas tourner en rond si deux alias se désignent mutuellement par erreur.

Interroger toute la hiérarchie à chaque visite serait lent. Les réponses sont donc conservées dans un cache, chez le résolveur du fournisseur d’accès et sur l’appareil, pendant une durée fixée par le propriétaire du nom : le TTL de l’enregistrement, en secondes. Une réponse dont le TTL est écoulé n’est plus utilisée ; on repose la question. C’est pourquoi un changement d’adresse met parfois quelques heures à se propager.

Le DNS est aussi une cible. Si un attaquant parvient à faire accepter une fausse réponse, par exemple en modifiant la configuration DNS d’une box mal protégée ou en empoisonnant un cache, les victimes tapent le bon nom mais arrivent sur un faux site. Les protections sont l’usage de résolveurs de confiance, le changement des mots de passe par défaut des box et routeurs, le cadenas HTTPS qui vérifie l’identité du site, et DNSSEC, qui signe les réponses DNS.

En Python, un dictionnaire peut représenter une petite zone : chaque nom donne un type d’enregistrement et une valeur. Résoudre, c’est suivre les CNAME jusqu’à un A, en comptant les étapes.

## Exemple guidé 1

```python
zone = {
    "www.ecole-avenir.tg": ["CNAME", "ecole-avenir.tg"],
    "ecole-avenir.tg": ["A", "41.207.160.5"],
}
nom = "www.ecole-avenir.tg"
while zone[nom][0] == "CNAME":
    print(nom, "est un alias de", zone[nom][1])
    nom = zone[nom][1]
print(nom, "->", zone[nom][1])
```

Affichage attendu :

    www.ecole-avenir.tg est un alias de ecole-avenir.tg
    ecole-avenir.tg -> 41.207.160.5

Trace :

- www est un CNAME : on suit l’alias.
- ecole-avenir.tg est un enregistrement A.
- La boucle s’arrête sur l’adresse IP.

## Exemple guidé 2

```python
nom = "notes.ecole-avenir.tg"
parties = nom.split(".")
for i in range(len(parties) - 1, -1, -1):
    print(".".join(parties[i:]))
```

Affichage attendu :

    tg
    ecole-avenir.tg
    notes.ecole-avenir.tg

Trace :

- On découpe aux points.
- On part de la dernière partie : le domaine de premier niveau.
- On ajoute une partie à chaque niveau.

## Vérifier et expliquer

Résous à la main notes.ecole-avenir.tg dans la zone de l’exercice final, en écrivant chaque étape, puis compare avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [RFC 1035 — DNS](https://www.rfc-editor.org/rfc/rfc1035)
- [MDN — Qu’est-ce qu’un nom de domaine](https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name)
