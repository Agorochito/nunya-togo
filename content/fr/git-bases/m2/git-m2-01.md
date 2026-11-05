---
{
  "id": "git-m2-01",
  "course": "git-bases",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "title_fr": "Lire l’historique et nommer les différences",
  "prerequisites": [
    "git-m1-03"
  ],
  "outcomes": [
    "Relier un commit récent à son état précédent.",
    "Nommer les deux états comparés avant d’interpréter une différence."
  ],
  "idea_fr": "L’historique décrit les états enregistrés ; une différence n’a de sens qu’entre deux états nommés.",
  "analogy_fr": "Comparer deux archives du club ne revient pas à comparer une archive avec le brouillon encore ouvert.",
  "examples": [
    {
      "title_fr": "Comparer deux états enregistrés",
      "steps_fr": [
        "Charger le scénario two et consulter les messages Départ puis Suite dans l’histoire.",
        "Comparer les contenus annoncés de notes.txt : Bonjour dans Départ, Bonjour Nunya dans Suite.",
        "Constater que README.md reste présent et inchangé dans les deux états."
      ]
    },
    {
      "title_fr": "Distinguer deux comparaisons locales",
      "steps_fr": [
        "Charger le scénario staged sans modifier ses fichiers.",
        "Identifier Bonjour dans HEAD, Version indexée dans l’index et Version de travail dans le fichier ouvert.",
        "Décrire séparément la modification préparée par rapport à HEAD et l’édition locale par rapport à l’index."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Message pris pour preuve",
      "why_fr": "La description est considérée comme le contenu du commit.",
      "fix_fr": "Vérifie également les fichiers enregistrés."
    },
    {
      "error": "Comparaison non nommée",
      "why_fr": "Le mot modifié mélange travail, index et HEAD.",
      "fix_fr": "Écris les deux états que tu compares."
    }
  ],
  "glossary": [
    {
      "term": "historique",
      "definition": "Enregistrements Git reliés entre eux."
    },
    {
      "term": "parent",
      "definition": "Commit auquel un enregistrement est relié dans son histoire."
    },
    {
      "term": "différence",
      "definition": "Résultat d’une comparaison entre deux états nommés."
    }
  ],
  "recap_fr": [
    "Lire un message avec son contexte d’historique.",
    "Un commit conserve aussi les fichiers suivis inchangés.",
    "Nommer les deux états de toute comparaison."
  ],
  "quiz": [
    {
      "question": "Que désigne le parent dans cette histoire linéaire ?",
      "options": [
        "Le dossier extérieur au navigateur.",
        "Le nom obligatoire du compte GitHub.",
        "Le commit précédent auquel le nouvel état est relié."
      ],
      "answer": 2,
      "explanation": "Le lien de parenté relie les étapes de l’historique.",
      "id": "git-m2-01-q1"
    },
    {
      "question": "Quelle comparaison répond à « que vais-je enregistrer par rapport au dernier commit ? » ?",
      "options": [
        "Index par rapport à HEAD.",
        "Dossier de travail par rapport au seul nom du fichier.",
        "Message par rapport au titre du navigateur."
      ],
      "answer": 0,
      "explanation": "Le contenu préparé dans l’index est comparé au dernier état enregistré.",
      "id": "git-m2-01-q2"
    },
    {
      "question": "Un message de commit suffit-il à prouver le contenu d’un changement ?",
      "options": [
        "Oui, le message crée automatiquement les fichiers annoncés.",
        "Non, il faut aussi examiner les versions concernées.",
        "Oui, s’il contient le mot correction."
      ],
      "answer": 1,
      "explanation": "Le message décrit une intention, tandis que les fichiers montrent le résultat.",
      "id": "git-m2-01-q3"
    }
  ],
  "sources": [
    {
      "title": "Pro Git — Visualiser l’historique des validations",
      "url": "https://git-scm.com/book/fr/v2/Les-bases-de-Git-Visualiser-l%E2%80%99historique-des-validations",
      "scope": "Référence technique ; explications et activités originales Nunya.",
      "last_checked": "2026-11-04"
    },
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

L’historique Git relie des commits identifiés. Dans notre parcours linéaire, le commit récent suit un état précédent appelé son parent. Lire les messages aide à retrouver l’intention de chaque étape, mais un message n’est pas son contenu. Pour comprendre un changement, il faut aussi savoir quels fichiers et quelles versions sont concernés. Un titre peut être imprécis ou annoncer davantage que le travail réellement enregistré.

Le scénario two contient un premier commit Départ puis un deuxième commit Suite. Dans Départ, notes.txt conserve une ligne Bonjour. Dans Suite, cette ligne devient Bonjour Nunya. Le fichier README.md est toujours présent avec son titre initial. Le deuxième commit ne fait donc pas disparaître les fichiers inchangés : il décrit un nouvel état du projet avec son lien vers le précédent.

Une différence, souvent appelée diff, est une comparaison entre deux états. Elle ne désigne pas une propriété isolée d’un fichier. Comparer le dossier de travail à l’index montre ce qui a été modifié depuis la préparation. Comparer l’index à HEAD montre ce qui est prêt à être enregistré par rapport au dernier commit. Comparer le dossier de travail à HEAD rassemble encore une autre question, qui peut inclure les deux catégories de changements.

Dans le scénario staged, ces comparaisons sont particulièrement importantes. Le fichier ouvert contient Version de travail, l’index contient Version indexée et HEAD contient Bonjour. Dire seulement « notes.txt est modifié » ne précise pas quelle comparaison on lit. Avant d’agir, nomme la source et la destination de ton observation. Le statut constitue un repère synthétique, pas une description complète du texte de chaque version.

Le laboratoire propose de consulter le statut et l’historique, ainsi que les fichiers virtuels. Les exemples décrivent les contenus connus de leurs scénarios pour que tu puisses les comparer. Ils ne prétendent pas exécuter un terminal natif. Une commande vue dans la documentation Git ne devient pas une fonction disponible dans cet atelier ; utilise les opérations réellement proposées par les boutons.

Pour ajouter une étape cohérente, commence par lire l’histoire existante. Change ensuite le fichier annoncé, prépare le chemin et crée un commit dont le message correspond à cette modification. Relis l’historique après l’enregistrement. Le nouveau commit doit s’ajouter à la suite ; renommer un fichier ou réécrire son texte ne supprime pas les états déjà conservés.

Les activités contrôlent le nombre minimal de commits, le message courant et les contenus de HEAD. Ces propriétés établissent qu’un nouvel état réel a été enregistré. Elles ne prouvent pas à elles seules que la personne a interprété chaque ligne de l’historique ; les questions de compréhension complètent cette pratique. Présente ce que tu observes et les limites de ce que le seul message permet de conclure.

## Exemple guidé 1 — Comparer deux états enregistrés

1. Charger le scénario two et consulter les messages Départ puis Suite dans l’histoire.
2. Comparer les contenus annoncés de notes.txt : Bonjour dans Départ, Bonjour Nunya dans Suite.
3. Constater que README.md reste présent et inchangé dans les deux états.

## Exemple guidé 2 — Distinguer deux comparaisons locales

1. Charger le scénario staged sans modifier ses fichiers.
2. Identifier Bonjour dans HEAD, Version indexée dans l’index et Version de travail dans le fichier ouvert.
3. Décrire séparément la modification préparée par rapport à HEAD et l’édition locale par rapport à l’index.

