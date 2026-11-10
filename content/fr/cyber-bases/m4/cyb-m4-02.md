---
{
  "id": "cyb-m4-02",
  "title_fr": "Réagir à un incident",
  "course": "cyber-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "cyb-m4-01"
  ],
  "outcomes": [
    "Suivre les étapes d’une réponse à incident et estimer sa gravité.",
    "Construire une chronologie triée des événements, base de tout rapport d’incident."
  ],
  "idea_fr": "Face à un incident, la pire réaction est l’improvisation ; un plan simple, suivi dans l’ordre, limite les dégâts et préserve les preuves.",
  "analogy_fr": "Quand un feu prend dans une cuisine, on coupe le gaz, on fait sortir les gens, on éteint, puis on répare et on se demande comment éviter le prochain. Dans cet ordre.",
  "examples": [
    {
      "code": "evenements = [\n    [\"10:40\", \"Ordinateur débranché du réseau\"],\n    [\"09:55\", \"Fichiers renommés en .lock\"],\n    [\"10:05\", \"Message de rançon affiché\"],\n]\nfor heure, texte in sorted(evenements):\n    print(heure, texte)",
      "expected_output": "09:55 Fichiers renommés en .lock\n10:05 Message de rançon affiché\n10:40 Ordinateur débranché du réseau\n",
      "inputs": [],
      "trace_fr": [
        "Les notes sont dans le désordre.",
        "Des heures au format HH:MM se trient correctement comme des textes.",
        "sorted trie les paires par leur premier élément : l’heure."
      ]
    },
    {
      "code": "phases = [\"préparation\", \"détection\", \"confinement\", \"éradication\", \"rétablissement\", \"retour d’expérience\"]\nposition = phases.index(\"confinement\")\nprint(position, \"->\", phases[position + 1])",
      "expected_output": "2 -> éradication\n",
      "inputs": [],
      "trace_fr": [
        "index renvoie la position de la phase : 2.",
        "La phase suivante est à la position 3 : éradication."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Éteindre la machine infectée",
      "why_fr": "Des traces utiles en mémoire disparaissent.",
      "fix_fr": "Débranche-la du réseau et préviens la personne responsable."
    },
    {
      "error": "Ne rien noter pendant l’incident",
      "why_fr": "Impossible ensuite de comprendre ou de prouver.",
      "fix_fr": "Note l’heure de chaque constat et de chaque action."
    },
    {
      "error": "Sauter le retour d’expérience",
      "why_fr": "Le même incident se reproduit.",
      "fix_fr": "Réunis l’équipe et décide des changements."
    }
  ],
  "quiz": [
    {
      "question": "Que faire en premier sur un ordinateur qui chiffre ses fichiers ?",
      "options": [
        "Payer",
        "Le débrancher du réseau",
        "Formater le disque",
        "Attendre"
      ],
      "answer": 1,
      "explanation": "Le confinement empêche la propagation aux autres machines.",
      "id": "cyb-m4-02-q1"
    },
    {
      "question": "Quelle étape vient après l’éradication ?",
      "options": [
        "Détection",
        "Rétablissement",
        "Préparation",
        "Confinement"
      ],
      "answer": 1,
      "explanation": "On remet le service en marche une fois la cause supprimée.",
      "id": "cyb-m4-02-q2"
    },
    {
      "question": "Pourquoi tenir une chronologie ?",
      "options": [
        "Pour remplir un formulaire",
        "Pour comprendre l’attaque, informer et prouver",
        "Pour ralentir la réponse",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Elle est la base du rapport et des décisions.",
      "id": "cyb-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "incident",
      "definition": "Événement qui compromet la confidentialité, l’intégrité ou la disponibilité."
    },
    {
      "term": "confinement",
      "definition": "Mesures qui empêchent un incident de s’étendre."
    },
    {
      "term": "chronologie",
      "definition": "Liste ordonnée des constats et des actions avec leur heure."
    },
    {
      "term": "retour d’expérience",
      "definition": "Analyse après incident pour éviter qu’il se reproduise."
    }
  ],
  "recap_fr": [
    "Suivre les étapes d’une réponse à incident et estimer sa gravité.",
    "Construire une chronologie triée des événements, base de tout rapport d’incident.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "incident",
    "confinement",
    "chronologie",
    "retour d’expérience"
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
      "title": "NIST SP 800-61 r3 — Réponse aux incidents",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
    },
    {
      "title": "CERT.tg — centre national de réponse aux incidents",
      "url": "https://cert.tg/"
    },
    {
      "title": "Cybermalveillance.gouv.fr — Sauvegardes",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes"
    }
  ],
  "sources": [
    {
      "title": "NIST SP 800-61 r3 — Réponse aux incidents",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "scope": "Étapes de la réponse à un incident. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "CERT.tg — centre national de réponse aux incidents",
      "url": "https://cert.tg/",
      "scope": "Organisme togolais à qui signaler un incident. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Cybermalveillance.gouv.fr — Sauvegardes",
      "url": "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes",
      "scope": "Copies régulières, hors ligne et testées. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un incident de sécurité arrive tôt ou tard : un ordinateur infecté, un compte piraté, une clé USB perdue, des fichiers chiffrés par un rançongiciel. L’organisation qui s’en sort le mieux n’est pas celle qui n’a jamais d’incident, mais celle qui sait quoi faire. Les guides de référence, comme celui du NIST, décrivent une suite d’étapes que ce cours simplifie en six.

La préparation a lieu avant l’incident : savoir qui prévenir, avoir des sauvegardes testées, garder les journaux, noter les numéros utiles. La détection consiste à remarquer l’incident et à confirmer qu’il est réel : une alerte du journal, un message de rançon, un collègue qui signale un courriel étrange. Le confinement limite la propagation : on débranche du réseau l’ordinateur touché, on bloque le compte piraté, on change les mots de passe exposés. Couper le réseau vaut souvent mieux qu’éteindre la machine, car éteindre efface des traces utiles en mémoire.

L’éradication supprime la cause : logiciel malveillant, accès laissé par l’attaquant, faille non corrigée. Le rétablissement remet le service en marche, souvent depuis une sauvegarde saine, puis surveille de près que l’attaquant ne revient pas. Le retour d’expérience, enfin, réunit les personnes concernées pour comprendre ce qui s’est passé et décider de ce qui doit changer. Sans cette dernière étape, le même incident se reproduit.

Pendant tout ce temps, on note tout : l’heure de chaque constat et de chaque action, ce qui a été vu, ce qui a été fait, par qui. Cette chronologie sert à comprendre l’attaque, à informer la direction, et parfois à porter plainte. Les notes prises à la main dans l’urgence sont rarement dans l’ordre : un programme qui trie les événements par heure produit une chronologie lisible.

La gravité guide l’urgence et les personnes à prévenir. Trois questions suffisent pour une première estimation : des données sensibles sont-elles touchées ? Le service est-il arrêté ? Combien de personnes sont concernées ? Un incident critique justifie de prévenir immédiatement la direction et, si nécessaire, les autorités. Au Togo, le CERT.tg accompagne la réponse aux incidents ; une plainte peut être déposée auprès des services de police ou de gendarmerie.

Deux règles enfin. Ne pas payer de rançon. Et ne pas chercher à « contre-attaquer » : riposter contre un système, même celui d’un attaquant, est illégal et peut toucher des victimes innocentes dont l’ordinateur a été détourné.

## Exemple guidé 1

```python
evenements = [
    ["10:40", "Ordinateur débranché du réseau"],
    ["09:55", "Fichiers renommés en .lock"],
    ["10:05", "Message de rançon affiché"],
]
for heure, texte in sorted(evenements):
    print(heure, texte)
```

Affichage attendu :

    09:55 Fichiers renommés en .lock
    10:05 Message de rançon affiché
    10:40 Ordinateur débranché du réseau

Trace :

- Les notes sont dans le désordre.
- Des heures au format HH:MM se trient correctement comme des textes.
- sorted trie les paires par leur premier élément : l’heure.

## Exemple guidé 2

```python
phases = ["préparation", "détection", "confinement", "éradication", "rétablissement", "retour d’expérience"]
position = phases.index("confinement")
print(position, "->", phases[position + 1])
```

Affichage attendu :

    2 -> éradication

Trace :

- index renvoie la position de la phase : 2.
- La phase suivante est à la position 3 : éradication.

## Vérifier et expliquer

Imagine un incident dans une école : écris six événements dans le désordre, puis produis la chronologie et la fiche avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [NIST SP 800-61 r3 — Réponse aux incidents](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [CERT.tg — centre national de réponse aux incidents](https://cert.tg/)
- [Cybermalveillance.gouv.fr — Sauvegardes](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/sauvegardes)
