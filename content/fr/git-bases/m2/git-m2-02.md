---
{
  "id": "git-m2-02",
  "course": "git-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "title_fr": "Restaurer un seul fichier sans déplacer l’histoire",
  "prerequisites": [
    "git-m2-01"
  ],
  "outcomes": [
    "Restaurer le seul fichier choisi depuis HEAD.",
    "Distinguer restauration du travail, retrait de l’index et déplacement d’une référence."
  ],
  "idea_fr": "Restaurer le fichier choisi depuis HEAD change son contenu de travail sans déplacer HEAD ni changer l’index.",
  "analogy_fr": "On peut reprendre une page depuis une archive sans remplacer tout le classeur ni sa sélection préparée.",
  "examples": [
    {
      "title_fr": "Abandonner une édition non préparée",
      "steps_fr": [
        "Charger modified : notes.txt contient À compléter dans le dossier de travail, mais Bonjour dans HEAD.",
        "Choisir notes.txt pour la restauration depuis HEAD.",
        "Vérifier que le fichier reprend Bonjour et que le dépôt redevient propre."
      ]
    },
    {
      "title_fr": "Conserver la sélection pendant une restauration",
      "steps_fr": [
        "Charger staged et relever les trois contenus distincts.",
        "Restaurer uniquement notes.txt depuis HEAD dans le dossier de travail.",
        "Vérifier Bonjour dans le fichier et HEAD, tandis que l’index conserve Version indexée."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Index supposé remplacé",
      "why_fr": "La restauration du travail est prise pour une remise à zéro de la préparation.",
      "fix_fr": "Vérifie le texte de l’index séparément."
    },
    {
      "error": "Tous les chemins supposés restaurés",
      "why_fr": "Un fichier choisi est confondu avec le projet entier.",
      "fix_fr": "Contrôle explicitement un autre chemin."
    },
    {
      "error": "Édition perdue supposée enregistrée",
      "why_fr": "Un texte abandonné est considéré comme un commit existant.",
      "fix_fr": "Vérifie s’il a réellement rejoint un enregistrement auparavant."
    }
  ],
  "glossary": [
    {
      "term": "restauration ciblée",
      "definition": "Remplacement d’un contenu annoncé à partir d’une source précise."
    },
    {
      "term": "source",
      "definition": "État dans lequel le contenu à reprendre est lu."
    },
    {
      "term": "portée",
      "definition": "Ensemble des chemins concernés par une opération."
    }
  ],
  "recap_fr": [
    "Nommer la source, la cible et le chemin.",
    "La restauration HEAD du laboratoire préserve l’index.",
    "Restaurer un fichier ne déplace pas l’historique."
  ],
  "quiz": [
    {
      "question": "Quelle source le bouton de restauration de cette leçon utilise-t-il ?",
      "options": [
        "HEAD.",
        "Toujours le dernier texte saisi dans l’éditeur.",
        "Le dépôt GitHub d’un autre compte."
      ],
      "answer": 0,
      "explanation": "Le laboratoire annonce explicitement une reprise du contenu enregistré dans HEAD.",
      "id": "git-m2-02-q1"
    },
    {
      "question": "L’index contient B et HEAD contient A. Après restauration du travail depuis HEAD, quel texte reste dans l’index ?",
      "options": [
        "A forcément.",
        "B.",
        "Une chaîne vide forcément."
      ],
      "answer": 1,
      "explanation": "L’action ne modifie pas l’index.",
      "id": "git-m2-02-q2"
    },
    {
      "question": "Restaurer notes.txt répare-t-il automatiquement README.md ?",
      "options": [
        "Oui, tout le projet est réinitialisé.",
        "Oui, et tous les commits disparaissent.",
        "Non, seul le chemin choisi est concerné."
      ],
      "answer": 2,
      "explanation": "La portée est limitée au fichier annoncé.",
      "id": "git-m2-02-q3"
    }
  ],
  "sources": [
    {
      "title": "Git — git-restore",
      "url": "https://git-scm.com/docs/git-restore",
      "scope": "Référence technique ; explications et activités originales Nunya.",
      "last_checked": "2026-11-04"
    },
    {
      "title": "Git — git-reset",
      "url": "https://git-scm.com/docs/git-reset",
      "scope": "Référence technique ; explications et activités originales Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

Restaurer demande de préciser ce qui est remplacé et d’où vient la version reprise. Dans ce laboratoire, l’action de restauration d’un chemin lit son contenu dans HEAD et réécrit uniquement le fichier de travail choisi. Elle ne crée pas de commit, ne déplace pas la branche et ne remet pas tous les fichiers à zéro. L’index est conservé. Cette précision fait partie du contrat de l’action, pas d’une règle universelle sur tous les outils portant le mot restaurer.

Une modification non enregistrée peut ainsi être abandonnée sur un fichier précis. Le scénario modified contient Bonjour dans HEAD et À compléter dans le dossier de travail. Restaurer notes.txt depuis HEAD réécrit Bonjour dans ce fichier. Comme l’index était déjà à cette même version, le chemin redevient propre. Le texte À compléter n’a pas été transformé en ancien commit : s’il n’a jamais été conservé, il ne faut pas supposer qu’un historique Git permet de le retrouver.

L’index peut néanmoins contenir une autre sélection. Dans staged, il conserve Version indexée, tandis que HEAD conserve Bonjour. La restauration depuis HEAD remplace le fichier de travail par Bonjour, mais laisse Version indexée dans l’index. Un commit réalisé ensuite sans autre action enregistrerait toujours Version indexée. Lire le fichier ouvert ne suffit donc pas à prédire le prochain commit après cette restauration.

La documentation native de Git distingue elle aussi la source et la cible. Une restauration sans source explicite peut reprendre l’index selon les options utilisées. L’action Nunya annonce au contraire la source HEAD et la seule cible dossier de travail. Les exemples de cette leçon suivent cette définition précise. Ils n’assimilent pas tous les usages de git restore, git checkout ou git reset à une opération identique.

Retirer un chemin de l’index répond à une autre intention. Dans le cas suivi, il remet sa préparation à l’état de HEAD et laisse le fichier ouvert intact. Certaines formes de reset peuvent déplacer une référence de branche ; d’autres ne concernent que la sélection de chemins. Des modes peuvent aussi remplacer le dossier de travail. Le laboratoire n’offre pas un bouton général reset de l’histoire dans ces activités : ne transforme pas une restauration locale en instruction de réécriture globale.

Vérifie enfin la portée du chemin. Si notes.txt est choisi, README.md ne doit pas être réparé ou supprimé par cette action. L’exercice peut laisser volontairement un autre fichier supprimé dans le dossier de travail pour observer cette limite. La version enregistrée de ce second fichier demeure dans HEAD même lorsqu’elle n’est plus présente localement.

Avant une restauration, lis le texte actuel et décide si tu souhaites vraiment le remplacer. Dans l’atelier, tout est virtuel et fictif, et la remise à zéro reconstruit le scénario. Cette possibilité pédagogique ne rend pas une édition jamais enregistrée automatiquement récupérable dans un projet réel. Nomme source, cible et portée avant d’agir, puis contrôle les trois niveaux après l’opération.

## Exemple guidé 1 — Abandonner une édition non préparée

1. Charger modified : notes.txt contient À compléter dans le dossier de travail, mais Bonjour dans HEAD.
2. Choisir notes.txt pour la restauration depuis HEAD.
3. Vérifier que le fichier reprend Bonjour et que le dépôt redevient propre.

## Exemple guidé 2 — Conserver la sélection pendant une restauration

1. Charger staged et relever les trois contenus distincts.
2. Restaurer uniquement notes.txt depuis HEAD dans le dossier de travail.
3. Vérifier Bonjour dans le fichier et HEAD, tandis que l’index conserve Version indexée.

