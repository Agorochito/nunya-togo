---
{
  "id": "cyb-m4-03",
  "title_fr": "Projet : audit de sécurité d’une coopérative",
  "course": "cyber-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "cyb-m4-02"
  ],
  "outcomes": [
    "Assembler les contrôles du cours — mots de passe, journaux, sauvegardes — dans un audit complet.",
    "Produire un rapport classé par priorité, compréhensible par une direction non technique."
  ],
  "idea_fr": "Un audit utile ne liste pas tout ce qui pourrait mal tourner : il mesure, classe et dit quoi faire en premier.",
  "analogy_fr": "Le médecin du village ne récite pas tout son manuel : il examine, puis dit au patient ce qui est urgent, ce qui peut attendre et ce qu’il faut surveiller.",
  "examples": [
    {
      "code": "def evaluer(mdp, interdits):\n    if mdp.lower() in interdits:\n        return \"interdit\"\n    if len(mdp) < 15:\n        return \"trop court\"\n    return \"acceptable\"\n\ndef niveau(score):\n    if score >= 15:\n        return \"critique\"\n    if score >= 8:\n        return \"élevé\"\n    if score >= 4:\n        return \"moyen\"\n    return \"faible\"\n\ncomptes = {\"admin\": \"azerty\", \"ama\": \"pirogue-cactus-lampe\", \"kofi\": \"Kofi1990\"}\nfaibles = [nom for nom, mdp in comptes.items() if evaluer(mdp, [\"azerty\"]) != \"acceptable\"]\nscore = min(5, len(faibles)) * 3\nprint(len(faibles), \"faibles, score\", score, \"->\", niveau(score))",
      "expected_output": "2 faibles, score 6 -> moyen\n",
      "inputs": [],
      "trace_fr": [
        "evaluer classe chaque mot de passe sans l’afficher.",
        "Deux comptes ne sont pas acceptables.",
        "Le score 6 correspond au niveau moyen."
      ]
    },
    {
      "code": "constats = [\n    {\"texte\": \"sauvegardes non conformes à 3-2-1\", \"score\": 15},\n    {\"texte\": \"comptes compromis : admin\", \"score\": 25},\n    {\"texte\": \"mots de passe faibles : 2\", \"score\": 6},\n]\nfor c in sorted(constats, key=lambda c: -c[\"score\"]):\n    print(c[\"score\"], c[\"texte\"])",
      "expected_output": "25 comptes compromis : admin\n15 sauvegardes non conformes à 3-2-1\n6 mots de passe faibles : 2\n",
      "inputs": [],
      "trace_fr": [
        "Chaque constat a un texte et un score.",
        "La clé -score trie du plus grave au moins grave.",
        "La direction lit d’abord le compte compromis."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Afficher les mots de passe dans le rapport",
      "why_fr": "Le rapport devient une fuite.",
      "fix_fr": "Donne des nombres et des noms, jamais les secrets."
    },
    {
      "error": "Lister les constats sans ordre",
      "why_fr": "L’urgent se perd parmi le reste.",
      "fix_fr": "Trie par score, du plus grave au moins grave."
    },
    {
      "error": "Auditer sans autorisation écrite",
      "why_fr": "C’est un accès frauduleux, même avec de bonnes intentions.",
      "fix_fr": "Obtiens un accord écrit qui précise le périmètre."
    }
  ],
  "quiz": [
    {
      "question": "Que doit contenir en premier un rapport d’audit ?",
      "options": [
        "La liste des logiciels",
        "Le constat le plus grave",
        "Les mots de passe faibles",
        "Le nom de l’auditeur"
      ],
      "answer": 1,
      "explanation": "Le classement par gravité guide les décisions.",
      "id": "cyb-m4-03-q1"
    },
    {
      "question": "Pourquoi réutiliser les fonctions des leçons précédentes ?",
      "options": [
        "Pour écrire plus de code",
        "Parce qu’elles sont déjà testées et se combinent",
        "Par obligation",
        "Pour ralentir le programme"
      ],
      "answer": 1,
      "explanation": "Des fonctions courtes et testées se combinent en un programme fiable.",
      "id": "cyb-m4-03-q2"
    },
    {
      "question": "Quelle condition rend un audit légitime ?",
      "options": [
        "Être discret",
        "Avoir une autorisation écrite et un périmètre défini",
        "Travailler la nuit",
        "Utiliser des outils payants"
      ],
      "answer": 1,
      "explanation": "L’autorisation transforme une intrusion en mission.",
      "id": "cyb-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "audit",
      "definition": "Examen méthodique de la sécurité d’un système, avec autorisation."
    },
    {
      "term": "constat",
      "definition": "Observation notée d’un score de risque et d’un texte clair."
    },
    {
      "term": "périmètre",
      "definition": "Ce que l’audit a le droit d’examiner."
    },
    {
      "term": "CTF",
      "definition": "Compétition légale de sécurité informatique sur des systèmes d’entraînement."
    }
  ],
  "recap_fr": [
    "Assembler les contrôles du cours — mots de passe, journaux, sauvegardes — dans un audit complet.",
    "Produire un rapport classé par priorité, compréhensible par une direction non technique.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "audit",
    "constat",
    "périmètre",
    "CTF"
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
      "title": "NIST SP 800-61 r3 — Réponse aux incidents",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
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
    }
  ]
}
---


## Explication pas à pas

Ce projet réunit tout le cours dans une mission réaliste. Une coopérative fictive de maraîchers, à Kpalimé, te demande un audit de sécurité de son petit système informatique : quelques comptes sur le logiciel de gestion, un journal de connexions et un plan de sauvegarde. Elle a donné son accord écrit ; tu travailles sur une copie de ses données, rendues fictives. Ces deux conditions — autorisation et données protégées — sont la base de tout audit légitime.

Un audit suit trois temps. D’abord, collecter et mesurer : combien de mots de passe sont faibles, quels comptes semblent compromis, si les sauvegardes respectent la règle 3-2-1. Chaque mesure réutilise une fonction déjà écrite et testée dans le cours : evaluer pour les mots de passe, compromis pour le journal, respecte_321 pour les sauvegardes. C’est l’intérêt des petites fonctions : elles se combinent sans être réécrites.

Ensuite, transformer chaque mesure en constat noté. Un constat associe un texte clair et un score de risque, calculé comme au premier module par probabilité × impact. Un compte probablement compromis est presque certain et grave : score 25, critique. Des mots de passe faibles sont probables, et le risque augmente avec leur nombre. Des sauvegardes non conformes sont moins probables à causer une perte immédiate, mais l’impact d’un rançongiciel serait majeur.

Enfin, rédiger le rapport. Une direction lit rarement plus d’une page. Le rapport classe donc les constats du plus grave au moins grave, et chaque ligne commence par son niveau entre crochets, comme [critique], pour être comprise d’un coup d’œil. Il n’affiche jamais un mot de passe, même faible : seulement le nombre de comptes concernés, et les noms quand une action individuelle est nécessaire, comme bloquer un compte compromis.

Un bon rapport se termine par des actions. Pour un compte compromis : le bloquer, changer son mot de passe, vérifier ce qui a été fait avec. Pour des mots de passe faibles : imposer la longueur et une liste interdite, proposer un gestionnaire. Pour les sauvegardes : ajouter une copie hors ligne et hors site, et tester une restauration. Dans ce projet, le programme produit les lignes du rapport ; les actions découlent directement de leur texte.

Après ce cours, tu sais penser comme une personne qui défend : identifier ce qui compte, détecter, protéger, sauvegarder, réagir. La suite naturelle est d’apprendre les réseaux, Linux plus en profondeur avec le cours Terminal et Linux, et les failles du web, toujours dans un cadre légal : laboratoires d’entraînement, compétitions de type CTF et environnements qui t’appartiennent.

## Exemple guidé 1

```python
def evaluer(mdp, interdits):
    if mdp.lower() in interdits:
        return "interdit"
    if len(mdp) < 15:
        return "trop court"
    return "acceptable"

def niveau(score):
    if score >= 15:
        return "critique"
    if score >= 8:
        return "élevé"
    if score >= 4:
        return "moyen"
    return "faible"

comptes = {"admin": "azerty", "ama": "pirogue-cactus-lampe", "kofi": "Kofi1990"}
faibles = [nom for nom, mdp in comptes.items() if evaluer(mdp, ["azerty"]) != "acceptable"]
score = min(5, len(faibles)) * 3
print(len(faibles), "faibles, score", score, "->", niveau(score))
```

Affichage attendu :

    2 faibles, score 6 -> moyen

Trace :

- evaluer classe chaque mot de passe sans l’afficher.
- Deux comptes ne sont pas acceptables.
- Le score 6 correspond au niveau moyen.

## Exemple guidé 2

```python
constats = [
    {"texte": "sauvegardes non conformes à 3-2-1", "score": 15},
    {"texte": "comptes compromis : admin", "score": 25},
    {"texte": "mots de passe faibles : 2", "score": 6},
]
for c in sorted(constats, key=lambda c: -c["score"]):
    print(c["score"], c["texte"])
```

Affichage attendu :

    25 comptes compromis : admin
    15 sauvegardes non conformes à 3-2-1
    6 mots de passe faibles : 2

Trace :

- Chaque constat a un texte et un score.
- La clé -score trie du plus grave au moins grave.
- La direction lit d’abord le compte compromis.

## Vérifier et expliquer

Lance ton audit sur les données fictives, puis modifie-les pour obtenir « aucun constat ». Quelles mesures as-tu dû prendre ?

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [ANSSI — Guide d’hygiène informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
- [NIST SP 800-61 r3 — Réponse aux incidents](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [CERT.tg — centre national de réponse aux incidents](https://cert.tg/)
