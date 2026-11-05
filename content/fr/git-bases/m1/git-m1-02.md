---
{
  "id": "git-m1-02",
  "course": "git-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "title_fr": "Séparer le dossier de travail et l’index",
  "prerequisites": [
    "git-m1-01"
  ],
  "outcomes": [
    "Identifier le contenu du dossier de travail, de l’index et de HEAD.",
    "Préparer ou retirer un chemin sans supprimer le fichier de travail."
  ],
  "idea_fr": "L’index prépare le contenu du prochain commit ; il peut différer du fichier actuellement ouvert.",
  "analogy_fr": "On peut préparer une sélection pour une archive, puis continuer à écrire sur la feuille de travail.",
  "examples": [
    {
      "title_fr": "Indexer un nouveau fichier",
      "steps_fr": [
        "Le scénario untracked contient notes.txt avec Bonjour et aucun commit.",
        "Ajouter notes.txt à l’index : son contenu est maintenant préparé pour un futur commit.",
        "Vérifier que le fichier de travail reste Bonjour et que le statut indique un nouvel ajout indexé."
      ]
    },
    {
      "title_fr": "Retirer une sélection déjà suivie",
      "steps_fr": [
        "Le scénario staged contient trois versions distinctes de notes.txt.",
        "Utiliser l’action de retrait de l’index pour notes.txt, sans supprimer le fichier.",
        "L’index revient à Bonjour comme HEAD ; le dossier de travail conserve Version de travail."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Index supposé automatique",
      "why_fr": "Une édition ultérieure est prise pour une mise à jour de l’index.",
      "fix_fr": "Vérifie la version préparée ou indexe à nouveau si c’est voulu."
    },
    {
      "error": "Retrait confondu avec suppression",
      "why_fr": "La préparation d’un chemin et l’existence du fichier sont mélangées.",
      "fix_fr": "Contrôle séparément index et dossier de travail."
    }
  ],
  "glossary": [
    {
      "term": "dossier de travail",
      "definition": "Fichiers actuellement ouverts et modifiables du projet."
    },
    {
      "term": "index",
      "definition": "État préparé pour le prochain commit."
    },
    {
      "term": "HEAD",
      "definition": "Repère courant permettant ici de retrouver le dernier commit de la branche."
    }
  ],
  "recap_fr": [
    "Distinguer travail actuel, préparation et dernier état enregistré.",
    "Indexer capture le contenu au moment de l’action.",
    "Retirer de l’index conserve le fichier de travail."
  ],
  "quiz": [
    {
      "question": "Que prépare l’index ?",
      "options": [
        "Le contenu du prochain commit.",
        "Uniquement le nom du service distant.",
        "La liste des fenêtres ouvertes."
      ],
      "answer": 0,
      "explanation": "L’index décrit l’état qui sera enregistré par commit.",
      "id": "git-m1-02-q1"
    },
    {
      "question": "Après une modification suivant l’indexation, que contient l’index ?",
      "options": [
        "Forcément le nouveau texte en direct.",
        "La version préparée avant cette dernière modification.",
        "Une copie de tous les fichiers personnels."
      ],
      "answer": 1,
      "explanation": "L’index ne suit pas automatiquement les nouvelles modifications du dossier de travail.",
      "id": "git-m1-02-q2"
    },
    {
      "question": "Retirer un chemin de l’index efface-t-il son fichier de travail ?",
      "options": [
        "Oui, dans tous les cas.",
        "Oui, et tous les commits aussi.",
        "Non, le fichier de travail est conservé."
      ],
      "answer": 2,
      "explanation": "L’opération change la préparation, sans supprimer le fichier de travail.",
      "id": "git-m1-02-q3"
    }
  ],
  "sources": [
    {
      "title": "Pro Git — Enregistrer des modifications",
      "url": "https://git-scm.com/book/fr/v2/Les-bases-de-Git-Enregistrer-des-modifications-dans-le-d%C3%A9p%C3%B4t",
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

Un dépôt ne possède pas une seule version de chaque fichier. Le dossier de travail, aussi appelé working tree, contient les fichiers que tu lis et modifies maintenant. L’index prépare le contenu qui sera enregistré au prochain commit. Quand un historique existe, HEAD désigne le repère courant qui permet de retrouver le dernier état enregistré. Ces trois niveaux peuvent contenir des textes différents pour le même chemin.

Indexer un chemin copie son contenu actuel dans la préparation du prochain commit. Cette action ne crée pas encore de commit. Après avoir indexé notes.txt, tu peux continuer à modifier le fichier de travail. L’index conserve alors le contenu préparé au moment de l’ajout, tandis que le dossier de travail montre la modification plus récente. Le prochain commit ne doit pas être imaginé comme une photographie automatique de tout ce qui est ouvert.

Le scénario staged rend cette distinction visible. HEAD conserve une ligne Bonjour. L’index contient une ligne Version indexée. Le fichier de travail contient une ligne Version de travail. Les retours à la ligne finaux font partie de ces contenus. Avant toute opération, note ces trois textes séparément. Le statut résume des différences, mais il ne remplace pas la lecture du contenu exact à chaque niveau.

Si tu veux inclure la dernière rédaction dans le prochain commit, il faut indexer de nouveau le chemin. Cette nouvelle préparation remplace la version indexée par le contenu actuel du fichier. Si tu veux au contraire conserver la sélection précédente, ne réindexe pas après la dernière modification. Le choix dépend de l’état que tu souhaites enregistrer, pas du nom que tu as donné au fichier.

Retirer un chemin de l’index ne supprime pas son fichier de travail. Pour un chemin déjà présent dans HEAD, le bouton du laboratoire remet son entrée d’index à la version de HEAD. Pour un nouveau fichier dans un dépôt sans commit, il retire simplement son entrée d’index ; le fichier redevient non suivi. Dans les deux cas, le contenu du dossier de travail demeure disponible.

Cette opération ne déplace pas HEAD et n’efface pas un ancien commit. Elle corrige seulement ce qui est préparé pour la suite. Il faut la distinguer de supprimer le fichier de travail et de restaurer ce fichier depuis une version enregistrée. Nous étudierons cette restauration dans le module suivant. Chaque opération possède une cible et une source : apprendre à les nommer évite de remplacer une version que l’on souhaitait garder.

Dans les activités, prépare une action puis vérifie le résultat réel. Un contrôle peut demander le texte du fichier, celui de l’index et celui de HEAD. C’est plus précis qu’un seul symbole de statut, notamment lorsqu’un fichier a été indexé puis modifié de nouveau. Si le résultat n’est pas celui prévu, reviens à la trace des trois niveaux avant d’effectuer une autre action.

## Exemple guidé 1 — Indexer un nouveau fichier

1. Le scénario untracked contient notes.txt avec Bonjour et aucun commit.
2. Ajouter notes.txt à l’index : son contenu est maintenant préparé pour un futur commit.
3. Vérifier que le fichier de travail reste Bonjour et que le statut indique un nouvel ajout indexé.

## Exemple guidé 2 — Retirer une sélection déjà suivie

1. Le scénario staged contient trois versions distinctes de notes.txt.
2. Utiliser l’action de retrait de l’index pour notes.txt, sans supprimer le fichier.
3. L’index revient à Bonjour comme HEAD ; le dossier de travail conserve Version de travail.

