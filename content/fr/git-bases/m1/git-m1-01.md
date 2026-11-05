---
{
  "id": "git-m1-01",
  "course": "git-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "title_fr": "Distinguer les fichiers, le dépôt Git et GitHub",
  "prerequisites": [],
  "outcomes": [
    "Distinguer un fichier de travail et un dépôt initialisé.",
    "Expliquer pourquoi Git et GitHub sont distincts."
  ],
  "idea_fr": "Git conserve un historique dans un dépôt ; GitHub est un service distinct de partage et de collaboration.",
  "analogy_fr": "Le cahier du club et le lieu où il serait partagé ne sont pas le même objet.",
  "examples": [
    {
      "title_fr": "Préparer un dépôt vide",
      "steps_fr": [
        "Partir du scénario empty : aucun fichier ni dépôt Git n’existe.",
        "Utiliser l’action d’initialisation avec la branche main.",
        "Consulter la branche courante : main est préparée, sans premier commit ni fichier de travail."
      ]
    },
    {
      "title_fr": "Créer une note sans l’enregistrer",
      "steps_fr": [
        "Partir d’un nouveau scénario empty et initialiser main.",
        "Écrire notes.txt avec une ligne Projet de lecture suivie d’un retour à la ligne.",
        "Observer que le fichier existe et apparaît non suivi ; aucune opération de commit n’a encore été faite."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Git confondu avec GitHub",
      "why_fr": "L’outil local est assimilé au service en ligne.",
      "fix_fr": "Sépare gestion des versions et hébergement distant."
    },
    {
      "error": "Initialisation prise pour un commit",
      "why_fr": "La préparation du dépôt est prise pour un enregistrement de travail.",
      "fix_fr": "Consulte l’historique pour distinguer un dépôt vide d’un premier commit."
    }
  ],
  "glossary": [
    {
      "term": "dépôt",
      "definition": "Projet associé aux informations nécessaires au suivi Git."
    },
    {
      "term": "initialisation",
      "definition": "Préparation de la structure Git d’un dossier."
    },
    {
      "term": "non suivi",
      "definition": "Fichier présent qui n’a pas encore été ajouté au suivi préparé."
    }
  ],
  "recap_fr": [
    "Initialiser ne crée pas automatiquement de commit.",
    "Git fonctionne localement et reste distinct de GitHub.",
    "Observer le statut après chaque opération."
  ],
  "quiz": [
    {
      "question": "Que crée l’initialisation seule ?",
      "options": [
        "Un dépôt GitHub public.",
        "Un enregistrement de chaque fichier futur.",
        "La structure d’un dépôt, sans premier commit automatique."
      ],
      "answer": 2,
      "explanation": "Initialiser prépare le dépôt ; l’enregistrement d’un état est une autre étape.",
      "id": "git-m1-01-q1"
    },
    {
      "question": "Quel objet représente GitHub dans cette introduction ?",
      "options": [
        "Un service en ligne distinct de Git.",
        "Le nom obligatoire de tous les dossiers Git.",
        "Un fichier automatiquement ajouté à main."
      ],
      "answer": 0,
      "explanation": "GitHub peut héberger des dépôts, tandis que Git assure la gestion de versions.",
      "id": "git-m1-01-q2"
    },
    {
      "question": "Où les boutons du laboratoire travaillent-ils ?",
      "options": [
        "Sur tous les documents personnels de l’ordinateur.",
        "Dans les fichiers virtuels privés du navigateur.",
        "Dans un dépôt distant créé sans connexion."
      ],
      "answer": 1,
      "explanation": "Le laboratoire agit sur son propre système de fichiers virtuel.",
      "id": "git-m1-01-q3"
    }
  ],
  "sources": [
    {
      "title": "Pro Git — À propos de la gestion de version",
      "url": "https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-%C3%80-propos-de-la-gestion-de-version",
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

Un fichier contient un travail : quelques notes, une présentation ou le texte d’un projet. Modifier ce fichier change son contenu actuel. Si plusieurs versions portent des noms comme final, final2 et vraiment-final, il devient difficile de savoir ce qui a changé. La gestion de versions organise des états du travail et les liens entre eux. Elle ne devine pas quels changements sont utiles ; l’auteur doit choisir ce qu’il veut conserver.

Git est un outil de gestion de versions. Un dépôt Git associe des fichiers de projet à des informations d’historique. L’initialisation prépare ce suivi dans un dossier. Elle ne crée pas encore de premier commit, c’est-à-dire d’état enregistré dans l’historique. Un dépôt peut donc être initialisé tout en ne contenant aucun enregistrement de travail. Nous construirons ces enregistrements dans les leçons suivantes.

Git et GitHub ne désignent pas la même chose. Git fonctionne localement pour suivre des versions. GitHub est un service en ligne qui peut héberger des dépôts et accueillir des échanges entre contributeurs. Créer un dépôt local ne crée pas un compte ou un dépôt distant. Faire un enregistrement avec Git n’envoie pas automatiquement les fichiers à GitHub. Une publication en ligne demanderait une connexion, des accès et une action distincte.

Le laboratoire Nunya réalise de vraies opérations Git grâce à une bibliothèque appelée isomorphic-git. Les boutons agissent sur un système de fichiers virtuel privé stocké dans le navigateur. Ce n’est pas un terminal natif et les activités ne lisent pas les fichiers personnels de l’ordinateur. Tous les noms, textes et éventuels secrets des scénarios sont fictifs. Aucune activité de ce module ne publie un dépôt sur un service extérieur.

Le nom main désigne ici la branche initiale préparée par le laboratoire. Nous étudierons les branches plus tard ; pour l’instant, retiens simplement ce repère affiché. Dans un dossier vide, l’action d’initialisation doit préparer le dépôt sur main. Écrire ensuite notes.txt crée un fichier de travail, mais ne suffit toujours pas à l’inscrire dans un commit. Le statut indique alors qu’il n’est pas encore suivi.

Le statut est une observation de la situation du dépôt à un moment donné. Il faut le consulter après une action plutôt que supposer qu’un bouton a produit l’état voulu. Une activité vérifie donc des propriétés réelles : dépôt initialisé, branche courante et contenu d’un fichier. L’état propre d’un dossier vide ne signifie pas qu’un travail a déjà été enregistré.

La remise à zéro d’une activité reconstruit son scénario de départ. Utilise-la pour recommencer un exercice, en sachant qu’elle remplace les fichiers virtuels de ce scénario. Dans un véritable projet personnel, la gestion de versions ne remplace pas une sauvegarde indépendante du dépôt. Ici, nous apprenons d’abord à nommer les objets et à reconnaître ce qui existe réellement avant de conserver une première version.

## Exemple guidé 1 — Préparer un dépôt vide

1. Partir du scénario empty : aucun fichier ni dépôt Git n’existe.
2. Utiliser l’action d’initialisation avec la branche main.
3. Consulter la branche courante : main est préparée, sans premier commit ni fichier de travail.

## Exemple guidé 2 — Créer une note sans l’enregistrer

1. Partir d’un nouveau scénario empty et initialiser main.
2. Écrire notes.txt avec une ligne Projet de lecture suivie d’un retour à la ligne.
3. Observer que le fichier existe et apparaît non suivi ; aucune opération de commit n’a encore été faite.

