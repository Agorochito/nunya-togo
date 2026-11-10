---
{
  "id": "cyb-m1-01",
  "title_fr": "Ce qu’on protège : confidentialité, intégrité, disponibilité",
  "course": "cyber-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Reconnaître quelle propriété — confidentialité, intégrité ou disponibilité — un incident menace.",
    "Calculer un score de risque (probabilité × impact) et classer les risques pour décider par où commencer."
  ],
  "idea_fr": "La sécurité ne consiste pas à tout protéger pareil, mais à protéger d’abord ce qui compte le plus face aux menaces les plus probables.",
  "analogy_fr": "Le gardien d’un marché ne surveille pas chaque étal avec la même attention : il commence par la caisse, puis les marchandises chères, puis le reste.",
  "examples": [
    {
      "code": "risques = [\n    (\"Mot de passe Wi-Fi partagé\", 4, 2),\n    (\"Caisse sans sauvegarde\", 3, 5),\n    (\"Clé USB perdue avec les notes\", 2, 4),\n]\nfor nom, probabilite, impact in risques:\n    print(nom, \":\", probabilite * impact)",
      "expected_output": "Mot de passe Wi-Fi partagé : 8\nCaisse sans sauvegarde : 15\nClé USB perdue avec les notes : 8\n",
      "inputs": [],
      "trace_fr": [
        "Chaque risque est un tuple : nom, probabilité, impact.",
        "La boucle décompose le tuple en trois variables.",
        "La caisse sans sauvegarde obtient le score le plus élevé : 15."
      ]
    },
    {
      "code": "def propriete_touchee(incident):\n    if incident in (\"fuite\", \"vol de données\"):\n        return \"confidentialité\"\n    if incident in (\"modification\", \"falsification\"):\n        return \"intégrité\"\n    return \"disponibilité\"\n\nfor cas in [\"fuite\", \"falsification\", \"panne\"]:\n    print(cas, \"->\", propriete_touchee(cas))",
      "expected_output": "fuite -> confidentialité\nfalsification -> intégrité\npanne -> disponibilité\n",
      "inputs": [],
      "trace_fr": [
        "Une fuite expose des données : confidentialité.",
        "Une falsification change des données : intégrité.",
        "Tout autre cas de cette liste empêche l’accès : disponibilité."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Vouloir tout protéger en même temps",
      "why_fr": "Les efforts se dispersent et les risques graves restent ouverts.",
      "fix_fr": "Classe les risques par score et commence par le plus élevé."
    },
    {
      "error": "Confondre menace et vulnérabilité",
      "why_fr": "On ne corrige pas une menace ; on réduit une faiblesse.",
      "fix_fr": "Demande-toi : quelle faiblesse permet à la menace d’agir ?"
    },
    {
      "error": "Tester un système sans autorisation",
      "why_fr": "C’est une infraction, même sans intention de nuire.",
      "fix_fr": "Travaille sur tes propres systèmes ou avec un accord écrit."
    }
  ],
  "quiz": [
    {
      "question": "Un élève modifie sa note dans le fichier du professeur. Quelle propriété est violée ?",
      "options": [
        "Confidentialité",
        "Intégrité",
        "Disponibilité",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "La donnée a été modifiée sans autorisation : c’est l’intégrité.",
      "id": "cyb-m1-01-q1"
    },
    {
      "question": "Probabilité 3, impact 5 : quel score ?",
      "options": [
        "8",
        "15",
        "2",
        "35"
      ],
      "answer": 1,
      "explanation": "Le score est le produit : 3 × 5 = 15.",
      "id": "cyb-m1-01-q2"
    },
    {
      "question": "Que faire si tu découvres par hasard qu’un site d’école laisse voir les notes de tous ?",
      "options": [
        "Télécharger les notes pour prouver la faille",
        "Prévenir l’école sans aller plus loin",
        "Publier la faille sur les réseaux",
        "Modifier une note pour tester"
      ],
      "answer": 1,
      "explanation": "On signale sans exploiter : aller plus loin serait un accès frauduleux.",
      "id": "cyb-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "actif",
      "definition": "Bien numérique qui a de la valeur pour l’organisation : données, service, appareil."
    },
    {
      "term": "CID",
      "definition": "Confidentialité, intégrité, disponibilité : les trois propriétés à protéger."
    },
    {
      "term": "vulnérabilité",
      "definition": "Faiblesse qui permet à une menace d’agir."
    },
    {
      "term": "risque",
      "definition": "Combinaison de la probabilité d’un événement et de son impact."
    }
  ],
  "recap_fr": [
    "Reconnaître quelle propriété — confidentialité, intégrité ou disponibilité — un incident menace.",
    "Calculer un score de risque (probabilité × impact) et classer les risques pour décider par où commencer.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "actif",
    "CID",
    "vulnérabilité",
    "risque"
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
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique"
    },
    {
      "title": "CERT.tg — centre national de réponse aux incidents",
      "url": "https://cert.tg/"
    }
  ],
  "sources": [
    {
      "title": "ANSSI — Guide d’hygiène informatique",
      "url": "https://cyber.gouv.fr/publications/guide-dhygiene-informatique",
      "scope": "Mesures de base pour une petite organisation. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "CERT.tg — centre national de réponse aux incidents",
      "url": "https://cert.tg/",
      "scope": "Organisme togolais à qui signaler un incident. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

La cybersécurité protège des informations et des services numériques. Dans une petite organisation — une école, une coopérative agricole, un cybercafé à Lomé, une boutique qui encaisse par mobile money — ces biens, appelés actifs, sont concrets : les notes des élèves, la liste des membres, le compte de caisse, l’ordinateur de la comptable, le Wi-Fi.

Trois propriétés résument ce qu’on veut garantir. La confidentialité : seules les personnes autorisées peuvent lire une information. Une fuite des numéros de téléphone des parents la viole. L’intégrité : l’information n’est pas modifiée sans autorisation. Une note falsifiée ou un montant changé dans un tableau la viole. La disponibilité : le service fonctionne quand on en a besoin. Une panne de l’ordinateur de caisse sans sauvegarde, ou un rançongiciel qui chiffre tous les fichiers, la viole. On résume souvent ces trois mots par le sigle CID.

Trois autres mots reviennent sans cesse. Une menace est ce qui peut arriver : un voleur, un virus, une coupure de courant, une erreur humaine. Une vulnérabilité est une faiblesse qui permet à la menace d’agir : un mot de passe partagé, un logiciel jamais mis à jour. Le risque combine les deux avec les conséquences.

Comme on ne peut pas tout corriger le même jour, on évalue chaque risque. Une méthode simple note la probabilité de 1 (rare) à 5 (presque certain) et l’impact de 1 (gênant) à 5 (grave), puis multiplie les deux. Un mot de passe Wi-Fi partagé est probable mais peu grave ; un ordinateur de caisse sans sauvegarde est moins probable mais catastrophique. Le score aide à classer, puis à décider : on traite d’abord les scores les plus élevés.

Ce score n’est pas une vérité scientifique. Il sert à discuter et à justifier un ordre de priorité, que l’on revoit quand la situation change.

Un dernier point, essentiel. Ce cours est défensif : tu apprends à protéger des systèmes qui t’appartiennent ou que tu as le droit d’examiner. Au Togo, la loi n° 2018-026 du 7 décembre 2018 sur la cybersécurité et la lutte contre la cybercriminalité punit notamment l’accès frauduleux à un système informatique, même « pour voir ». Toutes les données des exercices sont fictives. Si tu constates un incident réel, signale-le au responsable de l’organisation et, si nécessaire, au CERT.tg, le centre national de réponse aux incidents.

## Exemple guidé 1

```python
risques = [
    ("Mot de passe Wi-Fi partagé", 4, 2),
    ("Caisse sans sauvegarde", 3, 5),
    ("Clé USB perdue avec les notes", 2, 4),
]
for nom, probabilite, impact in risques:
    print(nom, ":", probabilite * impact)
```

Affichage attendu :

    Mot de passe Wi-Fi partagé : 8
    Caisse sans sauvegarde : 15
    Clé USB perdue avec les notes : 8

Trace :

- Chaque risque est un tuple : nom, probabilité, impact.
- La boucle décompose le tuple en trois variables.
- La caisse sans sauvegarde obtient le score le plus élevé : 15.

## Exemple guidé 2

```python
def propriete_touchee(incident):
    if incident in ("fuite", "vol de données"):
        return "confidentialité"
    if incident in ("modification", "falsification"):
        return "intégrité"
    return "disponibilité"

for cas in ["fuite", "falsification", "panne"]:
    print(cas, "->", propriete_touchee(cas))
```

Affichage attendu :

    fuite -> confidentialité
    falsification -> intégrité
    panne -> disponibilité

Trace :

- Une fuite expose des données : confidentialité.
- Une falsification change des données : intégrité.
- Tout autre cas de cette liste empêche l’accès : disponibilité.

## Vérifier et expliquer

Pour chaque risque, explique à voix haute pourquoi tu as choisi sa probabilité et son impact. Un score se défend par des arguments, pas seulement par un calcul.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [ANSSI — Guide d’hygiène informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
- [CERT.tg — centre national de réponse aux incidents](https://cert.tg/)
