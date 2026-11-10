---
{
  "id": "cyb-m2-01",
  "title_fr": "Reconnaître un message d’hameçonnage",
  "course": "cyber-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "cyb-m1-03"
  ],
  "outcomes": [
    "Extraire le vrai domaine d’un lien et repérer un domaine sosie.",
    "Repérer les signaux d’alerte d’un message et en déduire un verdict prudent."
  ],
  "idea_fr": "Un message frauduleux joue sur l’urgence et imite une source de confiance ; le vrai domaine du lien trahit presque toujours l’imitation.",
  "analogy_fr": "Un faux billet ressemble au vrai de loin ; de près, on vérifie le filigrane. Pour un lien, le filigrane est la fin du nom de domaine.",
  "examples": [
    {
      "code": "from urllib.parse import urlparse\n\nfor lien in [\"https://ecole-avenir.tg/notes\", \"https://ecole-avenir.tg.verif-compte.com/notes\"]:\n    hote = urlparse(lien).hostname\n    print(hote, \"->\", \".\".join(hote.split(\".\")[-2:]))",
      "expected_output": "ecole-avenir.tg -> ecole-avenir.tg\necole-avenir.tg.verif-compte.com -> verif-compte.com\n",
      "inputs": [],
      "trace_fr": [
        "hostname ne garde que le nom d’hôte.",
        "split(\".\") découpe aux points.",
        "[-2:] garde les deux dernières parties : le domaine réel."
      ]
    },
    {
      "code": "message = \"URGENT : votre compte sera bloqué. Envoyez votre code secret avant 18 h.\"\nsignaux = [\"urgent\", \"bloqué\", \"code secret\", \"gagné\"]\ntrouves = [s for s in signaux if s in message.lower()]\nprint(len(trouves), trouves)",
      "expected_output": "3 ['urgent', 'bloqué', 'code secret']\n",
      "inputs": [],
      "trace_fr": [
        "lower() met le message en minuscules.",
        "La compréhension garde chaque signal présent.",
        "Trois signaux sur quatre : message très suspect."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Lire le début du lien",
      "why_fr": "Le vrai domaine est à la fin du nom d’hôte.",
      "fix_fr": "Lis le nom d’hôte de droite à gauche."
    },
    {
      "error": "Comparer sans normaliser la casse",
      "why_fr": "URGENT n’est pas trouvé en cherchant urgent.",
      "fix_fr": "Compare message.lower()."
    },
    {
      "error": "Faire confiance à un verdict automatique",
      "why_fr": "Un message bien écrit peut tromper le score.",
      "fix_fr": "En cas de doute, contacte l’organisation par un moyen connu."
    }
  ],
  "quiz": [
    {
      "question": "Quel est le domaine réel de https://banque.tg.securite-client.net/login ?",
      "options": [
        "banque.tg",
        "securite-client.net",
        "login",
        "tg"
      ],
      "answer": 1,
      "explanation": "Le domaine réel est la fin du nom d’hôte.",
      "id": "cyb-m2-01-q1"
    },
    {
      "question": "Quel domaine est un sosie de ecole-avenir.tg ?",
      "options": [
        "ecole-avenir.tg",
        "ec0le-avenir.tg",
        "ecole-futur.tg",
        "avenir.tg"
      ],
      "answer": 1,
      "explanation": "Le zéro imite la lettre o.",
      "id": "cyb-m2-01-q2"
    },
    {
      "question": "Un SMS demande le code reçu pour « débloquer » ton compte. Que fais-tu ?",
      "options": [
        "Je l’envoie vite",
        "Je ne réponds pas et j’appelle le numéro officiel",
        "Je clique pour vérifier",
        "Je transfère à mes amis"
      ],
      "answer": 1,
      "explanation": "Aucun service sérieux ne demande un code secret par message.",
      "id": "cyb-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "hameçonnage",
      "definition": "Message qui imite une source de confiance pour obtenir un secret ou un paiement."
    },
    {
      "term": "nom d’hôte",
      "definition": "Partie d’une adresse web qui désigne le serveur, comme ecole-avenir.tg."
    },
    {
      "term": "domaine sosie",
      "definition": "Domaine qui imite un vrai domaine par des caractères ressemblants."
    },
    {
      "term": "signal d’alerte",
      "definition": "Indice typique d’une fraude : urgence, menace, demande de secret."
    }
  ],
  "recap_fr": [
    "Extraire le vrai domaine d’un lien et repérer un domaine sosie.",
    "Repérer les signaux d’alerte d’un message et en déduire un verdict prudent.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "hameçonnage",
    "nom d’hôte",
    "domaine sosie",
    "signal d’alerte"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "debutant",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Journaux, comptes, adresses et messages sont fictifs ; aucun réseau, aucun système réel n’est sondé ni attaqué.",
  "references": [
    {
      "title": "Cybermalveillance.gouv.fr — Hameçonnage",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing"
    },
    {
      "title": "Python — urllib.parse",
      "url": "https://docs.python.org/fr/3/library/urllib.parse.html"
    }
  ],
  "sources": [
    {
      "title": "Cybermalveillance.gouv.fr — Hameçonnage",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing",
      "scope": "Signes d’un message frauduleux et réflexes. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — urllib.parse",
      "url": "https://docs.python.org/fr/3/library/urllib.parse.html",
      "scope": "Extraire le nom d’hôte d’une adresse web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

L’hameçonnage, ou phishing, consiste à se faire passer pour une source de confiance afin d’obtenir un mot de passe, un code ou un paiement. Il arrive par courriel, par SMS, par WhatsApp ou par appel. Au Togo comme ailleurs, les arnaques visent souvent le mobile money : « votre compte sera bloqué, envoyez le code reçu », « vous avez gagné un lot, payez les frais de livraison ». Aucune organisation sérieuse ne demande un code secret par message.

Les signaux d’alerte se ressemblent d’un message à l’autre. L’urgence : il faut agir avant ce soir. La menace ou la récompense : blocage, amende, gain. La demande d’un secret : mot de passe, code reçu par SMS, code PIN. Un lien ou une pièce jointe inattendus. Une adresse d’expéditeur ou un domaine légèrement différents du vrai.

Le lien est souvent l’indice décisif. Dans une adresse web comme https://ecole-avenir.tg/notes, le nom d’hôte est ecole-avenir.tg. Ce qui compte est la fin du nom d’hôte : le domaine enregistré, ici ecole-avenir.tg. Un fraudeur peut écrire https://ecole-avenir.tg.verif-compte.com/notes : le début ressemble au vrai site, mais le domaine réel est verif-compte.com, qui lui appartient. Lis toujours un nom d’hôte de droite à gauche.

En Python, urlparse(lien).hostname extrait le nom d’hôte. Pour obtenir le domaine, ce cours garde les deux dernières parties séparées par des points. C’est une simplification : certains pays utilisent des suffixes en deux parties, comme co.uk, que les vrais outils gèrent avec une liste officielle de suffixes.

Les domaines sosies remplacent une lettre par un caractère qui lui ressemble : un zéro à la place d’un o, le chiffre 1 à la place d’un l, rn à la place de m. ec0le-avenir.tg et ecole-avenir.tg se confondent d’un coup d’œil. Pour les repérer, on normalise ces substitutions et on compare au domaine officiel.

Enfin, un score de signaux aide à trier, mais il ne remplace pas le bon réflexe : en cas de doute, on ne clique pas, on ne répond pas, et on contacte l’organisation par un moyen connu, son numéro officiel ou son site tapé à la main. On signale le message à la personne chargée du numérique. Un outil qui classe un message « fiable » ne garantit rien : il réduit seulement le bruit.

## Exemple guidé 1

```python
from urllib.parse import urlparse

for lien in ["https://ecole-avenir.tg/notes", "https://ecole-avenir.tg.verif-compte.com/notes"]:
    hote = urlparse(lien).hostname
    print(hote, "->", ".".join(hote.split(".")[-2:]))
```

Affichage attendu :

    ecole-avenir.tg -> ecole-avenir.tg
    ecole-avenir.tg.verif-compte.com -> verif-compte.com

Trace :

- hostname ne garde que le nom d’hôte.
- split(".") découpe aux points.
- [-2:] garde les deux dernières parties : le domaine réel.

## Exemple guidé 2

```python
message = "URGENT : votre compte sera bloqué. Envoyez votre code secret avant 18 h."
signaux = ["urgent", "bloqué", "code secret", "gagné"]
trouves = [s for s in signaux if s in message.lower()]
print(len(trouves), trouves)
```

Affichage attendu :

    3 ['urgent', 'bloqué', 'code secret']

Trace :

- lower() met le message en minuscules.
- La compréhension garde chaque signal présent.
- Trois signaux sur quatre : message très suspect.

## Vérifier et expliquer

Pour chaque lien d’exemple, écris le nom d’hôte puis le domaine réel. Invente ensuite trois sosies de ecole-avenir.tg et vérifie que ta fonction les repère.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Cybermalveillance.gouv.fr — Hameçonnage](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing)
- [Python — urllib.parse](https://docs.python.org/fr/3/library/urllib.parse.html)
