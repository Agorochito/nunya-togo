---
{
  "id": "git-m2-03",
  "course": "git-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "title_fr": "Ignorer les fichiers locaux sans oublier ceux déjà suivis",
  "prerequisites": [
    "git-m2-02"
  ],
  "outcomes": [
    "Enregistrer une règle pour exclure un nouveau fichier local.",
    "Expliquer pourquoi une exclusion ne retire pas les fichiers déjà suivis."
  ],
  "idea_fr": ".gitignore décrit des exclusions pour les fichiers non suivis ; il ne retire pas les versions déjà enregistrées.",
  "analogy_fr": "Une liste de documents à laisser hors de l’archive ne retire pas les documents déjà archivés.",
  "examples": [
    {
      "title_fr": "Ignorer un cache recréable",
      "steps_fr": [
        "Partir de first, écrire .gitignore avec une ligne cache/ et créer cache/temp.txt avec le texte temporaire.",
        "Indexer seulement .gitignore puis enregistrer la règle dans un commit.",
        "Le cache reste présent localement et ignoré ; HEAD conserve la règle et les fichiers déjà suivis."
      ]
    },
    {
      "title_fr": "Observer la limite sur un fichier suivi",
      "steps_fr": [
        "Partir du scénario ignored : notes.txt est déjà enregistré et cache/ est déjà exclu.",
        "Ajouter notes.txt comme deuxième motif, puis modifier le contenu du fichier suivi.",
        "Constater que le motif ne retire pas le suivi ; une indexation et un commit peuvent toujours conserver sa nouvelle version."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Ignoré pris pour supprimé",
      "why_fr": "La règle est interprétée comme un effacement du fichier.",
      "fix_fr": "Vérifie aussi sa présence dans le dossier de travail."
    },
    {
      "error": "Suivi oublié",
      "why_fr": "Un motif est supposé retirer un contenu déjà enregistré.",
      "fix_fr": "Examine HEAD et l’index avant de conclure."
    },
    {
      "error": "Vrai secret utilisé pour tester",
      "why_fr": "La sécurité est testée en exposant une donnée réelle.",
      "fix_fr": "Garde uniquement les valeurs fictives fournies par l’activité."
    }
  ],
  "glossary": [
    {
      "term": ".gitignore",
      "definition": "Fichier de motifs décrivant des exclusions de chemins non suivis."
    },
    {
      "term": "motif",
      "definition": "Règle textuelle indiquant quels chemins correspondent à une exclusion."
    },
    {
      "term": "fichier suivi",
      "definition": "Chemin déjà pris en compte dans l’état préparé ou enregistré du dépôt."
    }
  ],
  "recap_fr": [
    "Ignorer concerne les nouveaux chemins non suivis.",
    "Le motif ne retire pas un fichier déjà enregistré.",
    "Conserver les règles et exclure les données sensibles avant leur ajout."
  ],
  "quiz": [
    {
      "question": "Quel rôle joue .gitignore ici ?",
      "options": [
        "Effacer automatiquement tous les fichiers nommés.",
        "Décrire des exclusions pour des fichiers non suivis.",
        "Supprimer les commits qui contiennent un mot privé."
      ],
      "answer": 1,
      "explanation": "Ignorer et supprimer sont des opérations différentes.",
      "id": "git-m2-03-q1"
    },
    {
      "question": "Ajouter notes.txt à .gitignore retire-t-il ce fichier de HEAD s’il était déjà suivi ?",
      "options": [
        "Oui, immédiatement.",
        "Oui, seulement si le nom contient secret.",
        "Non."
      ],
      "answer": 2,
      "explanation": "Un motif ne retire pas les données déjà enregistrées.",
      "id": "git-m2-03-q2"
    },
    {
      "question": "Pourquoi indexer et enregistrer .gitignore lui-même ?",
      "options": [
        "Pour conserver la règle dans l’état du projet.",
        "Pour publier automatiquement le dépôt.",
        "Pour copier le cache dans tous les commits."
      ],
      "answer": 0,
      "explanation": "La règle est aussi un contenu de projet à suivre.",
      "id": "git-m2-03-q3"
    }
  ],
  "sources": [
    {
      "title": "Git — gitignore",
      "url": "https://git-scm.com/docs/gitignore",
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

Un projet contient souvent des fichiers utiles localement mais inutiles à l’historique partagé. Un cache temporaire peut être recréé ; un brouillon privé peut ne pas appartenir au projet. Le fichier .gitignore décrit des motifs pour ignorer des chemins non suivis. Il s’agit d’un fichier texte du projet, généralement suivi lui-même pour partager les règles. L’orthographe, le point initial et les retours à la ligne de son nom et de son contenu comptent.

Dans notre scénario, une ligne cache/ vise le dossier cache et son contenu. Le fichier cache/temp.txt peut rester présent dans le dossier de travail sans être proposé comme nouvel ajout ordinaire. Ignorer ne veut pas dire supprimer. Le laboratoire vérifie donc deux choses différentes : la règle enregistrée et l’exclusion du chemin. Une collection de fichiers ignorés n’est pas un nouvel instantané enregistré de leurs contenus.

Un fichier déjà suivi obéit à une autre situation. Si notes.txt figure dans HEAD, ajouter son nom à .gitignore ne l’efface ni de HEAD ni de l’index et ne met pas fin à son suivi. Ses modifications restent des changements de fichier suivi. Cette règle évite qu’une simple ligne de motif fasse disparaître silencieusement une partie de l’histoire. Le message « je l’ai mis dans ignore » n’est pas une preuve qu’un contenu sensible a été retiré des versions antérieures.

Les données à exclure doivent être examinées avant la préparation d’un commit. Un secret réel, une clé d’accès ou un document personnel n’a pas sa place dans les activités. Les fichiers nommés secrets-demo.txt du laboratoire contiennent uniquement un texte manifestement fictif et inutilisable. Ils sont conservés dans le système de fichiers virtuel privé ; aucune activité ne demande de copier un véritable identifiant pour tester une exclusion.

La confidentialité du laboratoire et la règle d’ignorance sont deux propriétés distinctes. Un fichier ignoré existe encore sur le support local. Inversement, un dépôt utilisé localement peut contenir un fichier suivi qui serait inclus dans un partage futur. Il faut donc vérifier les contenus sélectionnés et les versions enregistrées, même si aucune publication n’est prévue à cet instant. Le nom privé d’un fichier ne suffit pas à le protéger.

Pour préparer une règle, écris .gitignore, garde les fichiers visés non suivis et ajoute seulement la règle à l’index. Crée un commit dont le message explique cette exclusion. Vérifie le contenu de .gitignore dans HEAD et le statut réel du fichier concerné. Une règle non enregistrée peut fonctionner pour ton dossier actuel sans appartenir au projet conservé dans le dernier commit.

Si une activité demande de modifier un fichier déjà suivi malgré un motif correspondant, prépare sa nouvelle version normalement. L’instantané final doit conserver ce fichier et la règle. Ce cas ne recommande pas d’archiver des secrets : il sert à comprendre la limite d’une exclusion. La bonne démarche consiste à prévenir l’ajout de données sensibles, puis à vérifier les faits plutôt qu’à attendre qu’un motif répare automatiquement l’histoire.

## Exemple guidé 1 — Ignorer un cache recréable

1. Partir de first, écrire .gitignore avec une ligne cache/ et créer cache/temp.txt avec le texte temporaire.
2. Indexer seulement .gitignore puis enregistrer la règle dans un commit.
3. Le cache reste présent localement et ignoré ; HEAD conserve la règle et les fichiers déjà suivis.

## Exemple guidé 2 — Observer la limite sur un fichier suivi

1. Partir du scénario ignored : notes.txt est déjà enregistré et cache/ est déjà exclu.
2. Ajouter notes.txt comme deuxième motif, puis modifier le contenu du fichier suivi.
3. Constater que le motif ne retire pas le suivi ; une indexation et un commit peuvent toujours conserver sa nouvelle version.

