---
{
  "id": "git-m3-02",
  "title_fr": "Enregistrer une évolution sur une ligne isolée",
  "course": "git-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "git-m3-01"
  ],
  "outcomes": [
    "Créer un commit cohérent sur une branche de travail.",
    "Observer que main ne reçoit pas automatiquement ce commit."
  ],
  "idea_fr": "Un commit fait avancer la branche courante sans déplacer automatiquement les autres branches.",
  "analogy_fr": "Deux carnets peuvent partager un début commun puis recevoir des pages différentes sans réécrire leur introduction.",
  "examples": [
    {
      "title_fr": "Ajouter une documentation sur contenu",
      "steps_fr": [
        "Créer contenu depuis le dépôt de départ conserve un ancêtre commun avec main.",
        "Basculer sur contenu choisit la ligne qui recevra les nouveaux commits.",
        "Écrire guide.txt puis l’indexer prépare le changement voulu.",
        "Le commit Décrire l’atelier enregistre guide.txt sur contenu ; main reste au point de départ."
      ]
    },
    {
      "title_fr": "Observer les deux vues après un commit",
      "steps_fr": [
        "La branche idee contient déjà projet.txt grâce au commit Idée.",
        "Modifier ce fichier puis le committer fait avancer idee une seconde fois.",
        "Un état propre permet de revenir sur main.",
        "main affiche encore sa version de départ ; le nouvel historique demeure disponible sur idee."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Commiter sur main par oubli",
      "why_fr": "La branche a été créée mais pas sélectionnée.",
      "fix_fr": "Contrôle le nom courant avant le commit."
    },
    {
      "error": "Confondre propre et approuvé",
      "why_fr": "Une propriété technique est prise pour une revue du contenu.",
      "fix_fr": "Relis et explique la modification en plus du statut."
    }
  ],
  "glossary": [
    {
      "term": "parent",
      "definition": "Commit précédent relié à un commit dans l’historique."
    },
    {
      "term": "proposition",
      "definition": "Évolution préparée sur une ligne de travail."
    },
    {
      "term": "état propre",
      "definition": "Absence des différences locales contrôlées par rapport au commit courant."
    }
  ],
  "recap_fr": [
    "Créer un commit cohérent sur une branche de travail.",
    "Observer que main ne reçoit pas automatiquement ce commit.",
    "Écrire un message qui exprime une intention."
  ],
  "quiz": [
    {
      "question": "Quelle branche avance après un commit ordinaire ?",
      "options": [
        "La branche courante dans ce scénario.",
        "Toutes les branches.",
        "Seulement la branche nommée main."
      ],
      "answer": 0,
      "explanation": "Le commit est ajouté à la ligne sélectionnée, sans déplacer les autres références.",
      "id": "git-m3-02-q1"
    },
    {
      "question": "Pourquoi indexer après une modification sur une branche ?",
      "options": [
        "Pour créer automatiquement GitHub.",
        "La branche ne remplace pas la préparation du contenu du commit.",
        "Pour supprimer le parent du commit."
      ],
      "answer": 1,
      "explanation": "L’espace de travail, l’index et le commit restent distincts sur toutes les branches.",
      "id": "git-m3-02-q2"
    },
    {
      "question": "Quel message décrit le mieux une intention ?",
      "options": [
        "Changement",
        "Final final",
        "Préciser les conditions de participation"
      ],
      "answer": 2,
      "explanation": "Un message concret aide à retrouver le rôle d’une évolution dans l’historique.",
      "id": "git-m3-02-q3"
    }
  ],
  "sources": [
    {
      "title": "Git — branches",
      "url": "https://git-scm.com/docs/git-branch",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    },
    {
      "title": "Git — enregistrer un commit",
      "url": "https://git-scm.com/docs/git-commit",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    },
    {
      "title": "Git — changer de branche",
      "url": "https://git-scm.com/docs/git-switch",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

La branche existe ; il faut maintenant y enregistrer une évolution utile. Le but n’est pas de multiplier les noms mais de garder une proposition identifiable. Une petite branche de travail peut porter une correction ou une documentation cohérente. Dans le laboratoire, main représente la version principale et une branche comme contenu porte une proposition. Ces noms sont des conventions de l’exercice, pas des rôles imposés universellement par Git.

Après la création et la bascule, modifie un fichier, vérifie son contenu, prépare son indexation puis crée un commit. Les étapes espace de travail, index et commit restent les mêmes que sur main. Un changement de branche ne remplace pas l’indexation. Un message précis comme « Décrire l’atelier » explique l’intention ; « changement » ou « version finale » renseigne beaucoup moins un futur lecteur de l’historique.

Le nouveau commit possède ici un parent : le commit précédent de cette ligne. La branche courante avance vers lui. L’autre branche continue de désigner son ancien commit tant qu’une opération ne la fait pas avancer. Un commit sur contenu n’ajoute donc pas automatiquement le même fichier dans main. Les fichiers deviennent visibles dans la version principale après une intégration appropriée, que nous pratiquerons dans la prochaine leçon.

Un état propre signifie ici que les fichiers suivis et l’index correspondent au commit courant, sans modification ou fichier nouveau restant à préparer. Cela ne prouve pas que le texte est juste, qu’une fonctionnalité est testée ou qu’une revue a eu lieu. Relis le fichier avant le commit puis le message dans l’historique. Pour nos petits dépôts, une modification courte et une intention claire suffisent à rendre l’évolution inspectable.

Chaque activité repart d’un scénario indépendant. Certaines commencent déjà sur idee avec un premier commit de proposition ; tu y ajoutes une précision. D’autres te demandent de créer ta propre ligne puis de revenir sur main pour constater l’isolation. Ne réinitialise pas pour changer de branche : la réinitialisation du laboratoire reconstruit tout le scénario et remplace ton essai. Utilise la bascule normale après un commit propre. À la fin, raconte trois faits observables : quelle branche a reçu le commit, quel fichier il contient et pourquoi main ne l’a pas reçu automatiquement. Cette explication relie l’historique à ce que tu vois réellement dans les fichiers.

## Exemple guidé 1

Ajouter une documentation sur contenu

1. Créer contenu depuis le dépôt de départ conserve un ancêtre commun avec main.
2. Basculer sur contenu choisit la ligne qui recevra les nouveaux commits.
3. Écrire guide.txt puis l’indexer prépare le changement voulu.
4. Le commit Décrire l’atelier enregistre guide.txt sur contenu ; main reste au point de départ.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git branch contenu
git switch contenu
# Écrire puis relire guide.txt dans un éditeur.
git add guide.txt
git commit -m "Décrire l’atelier"
```

## Exemple guidé 2

Observer les deux vues après un commit

1. La branche idee contient déjà projet.txt grâce au commit Idée.
2. Modifier ce fichier puis le committer fait avancer idee une seconde fois.
3. Un état propre permet de revenir sur main.
4. main affiche encore sa version de départ ; le nouvel historique demeure disponible sur idee.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git add projet.txt
git commit -m "Préciser le projet"
git switch main
git log --oneline
```

