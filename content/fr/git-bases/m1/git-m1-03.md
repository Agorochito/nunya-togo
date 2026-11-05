---
{
  "id": "git-m1-03",
  "course": "git-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "title_fr": "Enregistrer un instantané avec un message utile",
  "prerequisites": [
    "git-m1-02"
  ],
  "outcomes": [
    "Créer un commit correspondant au contenu indexé.",
    "Rédiger et vérifier un message décrivant un changement cohérent."
  ],
  "idea_fr": "Un commit enregistre l’état préparé dans l’index et le relie à l’historique.",
  "analogy_fr": "Une archive du club conserve une sélection relue avec une légende qui explique sa raison.",
  "examples": [
    {
      "title_fr": "Conserver un premier état",
      "steps_fr": [
        "Dans le scénario untracked, indexer notes.txt contenant Bonjour.",
        "Créer un commit avec le message Enregistrer les notes.",
        "Consulter l’historique : le message existe et le fichier enregistré contient Bonjour."
      ]
    },
    {
      "title_fr": "Conserver une sélection antérieure",
      "steps_fr": [
        "Dans le scénario staged, ne pas réindexer notes.txt après avoir comparé les trois niveaux.",
        "Créer un commit avec le message Conserver la version indexée.",
        "Le nouveau HEAD contient Version indexée, tandis que le fichier de travail reste Version de travail."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Travail pris pour sélection",
      "why_fr": "Le contenu ouvert est supposé forcément enregistré.",
      "fix_fr": "Relis l’index avant le commit."
    },
    {
      "error": "Message vague",
      "why_fr": "Le texte ne permet pas de comprendre le changement.",
      "fix_fr": "Nomme l’action et son objet."
    },
    {
      "error": "Propre pris pour vérifié",
      "why_fr": "Un statut Git est confondu avec un contrôle du fond.",
      "fix_fr": "Examine aussi le résultat du travail."
    }
  ],
  "glossary": [
    {
      "term": "commit",
      "definition": "Enregistrement identifié d’un état préparé du projet."
    },
    {
      "term": "instantané",
      "definition": "État des fichiers du projet conservé à une étape."
    },
    {
      "term": "message",
      "definition": "Description humaine du changement enregistré."
    }
  ],
  "recap_fr": [
    "Un commit conserve l’état préparé dans l’index.",
    "Un message doit correspondre à un changement réel.",
    "Contrôler historique et fichiers après l’enregistrement."
  ],
  "quiz": [
    {
      "question": "Quel état un commit enregistre-t-il ?",
      "options": [
        "Toujours tout le dossier de travail sans sélection.",
        "L’état préparé dans l’index.",
        "Seulement le texte de son message."
      ],
      "answer": 1,
      "explanation": "La préparation détermine les contenus du nouvel instantané.",
      "id": "git-m1-03-q1"
    },
    {
      "question": "Quel message décrit le mieux une correction de titre ?",
      "options": [
        "Encore mieux.",
        "Tout est parfait.",
        "Corriger le titre de la fiche."
      ],
      "answer": 2,
      "explanation": "Un message concret identifie le changement sans promettre autre chose.",
      "id": "git-m1-03-q2"
    },
    {
      "question": "Un fichier suivi inchangé peut-il être présent dans le nouveau commit ?",
      "options": [
        "Oui, l’instantané conserve le projet suivi, pas seulement les lignes changées.",
        "Non, seuls les fichiers retapés existent.",
        "Non, il est automatiquement supprimé."
      ],
      "answer": 0,
      "explanation": "Un commit représente un état du projet complet selon l’index.",
      "id": "git-m1-03-q3"
    }
  ],
  "sources": [
    {
      "title": "Pro Git — Enregistrer des modifications",
      "url": "https://git-scm.com/book/fr/v2/Les-bases-de-Git-Enregistrer-des-modifications-dans-le-d%C3%A9p%C3%B4t",
      "scope": "Référence technique ; explications et activités originales Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

Un commit est un enregistrement dans l’historique Git. Il conserve un instantané du projet suivi à partir de l’index, avec des informations comme un message et des liens vers l’histoire précédente. Ce n’est pas simplement le texte d’un fichier renommé. L’identifiant du commit permet de le distinguer des autres enregistrements ; son message aide une personne à comprendre l’intention du changement.

Pour préparer un commit, commence par examiner les fichiers et leur statut. Ajoute à l’index les chemins dont tu veux conserver l’état actuel. Relis la sélection, puis choisis un message précis. L’action de commit enregistre cette préparation. Dans notre branche simple, HEAD permet ensuite de retrouver le nouveau commit. Aucun envoi à GitHub n’est réalisé par cette opération locale.

Le mot instantané ne signifie pas que tout le disque est copié. Seuls les fichiers du projet pris en compte dans l’état préparé appartiennent à cet enregistrement. Un fichier non suivi, non ajouté à l’index, ne rejoint pas automatiquement le commit. Un fichier suivi et inchangé demeure présent dans l’instantané du projet, même si son contenu n’a pas été réécrit pour cette étape.

Une modification postérieure à l’indexation reste une autre version. Dans le scénario staged, l’index conserve Version indexée tandis que le fichier ouvert montre Version de travail. Si tu crées directement un commit, le texte enregistré est Version indexée. Le fichier de travail ne se transforme pas magiquement en cette version ; il peut encore montrer une modification locale après l’enregistrement.

Un message utile décrit un changement cohérent. « Préciser le rendez-vous du club » explique davantage que « mieux » ou « final ». Il ne faut pas inventer une validation : un message annonçant des tests réussis ne prouve pas qu’ils ont été exécutés. La cohérence se vérifie aussi dans les fichiers. Si une seule intention demande deux fichiers, il peut être pertinent de les préparer ensemble puis de relire l’ensemble.

Après le commit, consulte l’historique et les contenus enregistrés. Vérifie le message exact et l’état attendu du projet. Un statut propre signifie ici qu’aucune différence pertinente n’est détectée entre les fichiers suivis, la préparation et l’état courant, en tenant compte des exclusions. Il ne certifie ni l’exactitude pédagogique d’un texte ni le fonctionnement d’un programme.

Les exercices demandent parfois un message exact pour rendre leur objectif vérifiable. Ce choix ne signifie pas que tous les projets utilisent ces mêmes formulations. Hors de l’activité, choisis un message fidèle à l’action réellement effectuée. Dans le laboratoire, garde les données fictives et les fichiers virtuels : aucun enregistrement ne doit contenir un secret réel ou un document personnel, même pour illustrer un scénario privé.

## Exemple guidé 1 — Conserver un premier état

1. Dans le scénario untracked, indexer notes.txt contenant Bonjour.
2. Créer un commit avec le message Enregistrer les notes.
3. Consulter l’historique : le message existe et le fichier enregistré contient Bonjour.

## Exemple guidé 2 — Conserver une sélection antérieure

1. Dans le scénario staged, ne pas réindexer notes.txt après avoir comparé les trois niveaux.
2. Créer un commit avec le message Conserver la version indexée.
3. Le nouveau HEAD contient Version indexée, tandis que le fichier de travail reste Version de travail.

