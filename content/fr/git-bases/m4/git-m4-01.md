---
{
  "id": "git-m4-01",
  "title_fr": "Comprendre un conflit et enregistrer sa résolution",
  "course": "git-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "git-m3-03"
  ],
  "outcomes": [
    "Résoudre un conflit selon une décision annoncée.",
    "Enregistrer une fusion à deux parents et vérifier son contenu."
  ],
  "idea_fr": "Un conflit demande une décision de contenu ; la résolution doit être relue, indexée puis enregistrée dans la fusion.",
  "analogy_fr": "Deux personnes ont réécrit le même passage depuis une version commune : il faut choisir la formulation finale avant de réunir leurs travaux.",
  "examples": [
    {
      "title_fr": "Proposer une résolution sans encore committer",
      "steps_fr": [
        "main et idee possèdent des changements incompatibles sur notes.txt.",
        "Depuis main, demander la fusion de idee fait apparaître le conflit dans le fichier de travail.",
        "Remplacer le fichier par Version commune, avec un retour final, retire les marqueurs selon la décision de l’exercice.",
        "Indexer notes.txt prépare la résolution ; HEAD contient encore Version main avant le commit final."
      ]
    },
    {
      "title_fr": "Terminer la fusion avec une décision relue",
      "steps_fr": [
        "La résolution retenue est indexée après relecture.",
        "Créer le commit Résoudre le texte partagé termine la fusion en cours.",
        "Ce commit possède deux parents dans ce scénario de divergence.",
        "Le fichier committé contient la décision choisie et l’état final doit être propre."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Effacer les marqueurs sans décider",
      "why_fr": "Le contenu peut perdre une intention importante.",
      "fix_fr": "Lis les deux côtés puis applique une règle explicite."
    },
    {
      "error": "S’arrêter après l’indexation",
      "why_fr": "La résolution n’est pas encore le commit final.",
      "fix_fr": "Termine la fusion et vérifie les parents et l’état."
    }
  ],
  "glossary": [
    {
      "term": "conflit",
      "definition": "Situation où Git ne peut pas combiner automatiquement certains changements."
    },
    {
      "term": "résolution",
      "definition": "Décision de contenu remplaçant les parties en conflit."
    },
    {
      "term": "commit de fusion",
      "definition": "Commit qui relie plusieurs lignes par ses parents."
    }
  ],
  "recap_fr": [
    "Résoudre un conflit selon une décision annoncée.",
    "Enregistrer une fusion à deux parents et vérifier son contenu.",
    "Distinguer résolution préparée et fusion terminée."
  ],
  "quiz": [
    {
      "question": "Pourquoi Git signale-t-il le conflit dans ce scénario ?",
      "options": [
        "Toutes les fusions ont nécessairement un conflit.",
        "Les branches portent des noms différents.",
        "Les deux lignes ont modifié une même partie de façon incompatible automatiquement."
      ],
      "answer": 2,
      "explanation": "La divergence et les modifications concernées empêchent ici de choisir automatiquement un contenu.",
      "id": "git-m4-01-q1"
    },
    {
      "question": "Indexer un fichier résolu termine-t-il la fusion dans cet atelier ?",
      "options": [
        "Non, le commit final reste nécessaire.",
        "Oui, il supprime tous les parents.",
        "Oui, il publie sur GitHub."
      ],
      "answer": 0,
      "explanation": "L’index prépare la version résolue ; le commit enregistre la fusion.",
      "id": "git-m4-01-q2"
    },
    {
      "question": "Que vérifient deux parents sur le commit final ?",
      "options": [
        "La qualité littéraire garantie du texte.",
        "Le lien de ce commit avec les deux lignes réunies.",
        "La présence d’un dépôt GitHub."
      ],
      "answer": 1,
      "explanation": "Les parents décrivent l’historique ; la pertinence du contenu reste à relire.",
      "id": "git-m4-01-q3"
    }
  ],
  "sources": [
    {
      "title": "Git — fusionner des historiques",
      "url": "https://git-scm.com/docs/git-merge",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    },
    {
      "title": "Git — enregistrer un commit",
      "url": "https://git-scm.com/docs/git-commit",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

Dans le scénario précédent, main n’avait pas évolué pendant la préparation de idee. Ici, les deux branches ont reçu un commit depuis leur point commun. Elles ont aussi modifié la même partie de notes.txt de façons incompatibles pour la fusion automatique. Git connaît l’historique, mais il ne peut pas décider à ta place quelle formulation exprime l’intention du groupe. Il signale donc un conflit au lieu de présenter un résultat arbitraire comme une réussite.

Le fichier de travail contient alors des marqueurs qui séparent les versions concernées. Une ligne commençant par plusieurs signes inférieur ouvre une partie ; une séparation de signes égal distingue les contenus ; une ligne de signes supérieur ferme le bloc. Les libellés dépendent de l’outil. Lis les deux versions et leur contexte avant de modifier. Les marqueurs ne sont pas des instructions à conserver dans le document final et ne constituent pas une décision de fond.

Résoudre ne veut pas forcément dire choisir entièrement un côté. Tu peux retenir une version, combiner des passages ou écrire une formulation nouvelle, selon une règle comprise et validée avec les personnes concernées. Dans nos activités, cette règle est donnée explicitement : « Version commune » pour l’une, conservation des deux lignes pour l’autre. Ce sont des décisions pédagogiques sur des données fictives. Le laboratoire ne prétend pas qu’une combinaison mécanique serait correcte dans tous les projets.

Après l’édition, relis le fichier entier et retire tous les marqueurs de conflit. Indexer le fichier indique que cette version est proposée comme résolution. Le commit termine ensuite la fusion dans notre laboratoire et conserve deux parents correspondant aux lignes réunies. Un simple changement de texte sans commit ne termine pas cette intégration. À l’inverse, créer un commit ordinaire sans avoir commencé la fusion ne prouve pas que les deux historiques ont été reliés.

Chaque pratique repart du même scénario de divergence dans un dépôt indépendant. La première s’arrête volontairement après l’indexation pour distinguer version de travail, index et HEAD. Les suivantes demandent une résolution enregistrée et un état propre. Observe les parents dans l’historique, le contenu du commit et les fichiers visibles. Ces contrôles confirment une opération Git réelle ; ils ne garantissent pas que ton choix de rédaction est pertinent hors de la consigne. Termine en expliquant le conflit initial, la décision choisie et les preuves de son enregistrement.

## Exemple guidé 1

Proposer une résolution sans encore committer

1. main et idee possèdent des changements incompatibles sur notes.txt.
2. Depuis main, demander la fusion de idee fait apparaître le conflit dans le fichier de travail.
3. Remplacer le fichier par Version commune, avec un retour final, retire les marqueurs selon la décision de l’exercice.
4. Indexer notes.txt prépare la résolution ; HEAD contient encore Version main avant le commit final.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git switch main
git merge idee
# Lire puis modifier notes.txt pour résoudre le conflit.
git add notes.txt
git status
```

## Exemple guidé 2

Terminer la fusion avec une décision relue

1. La résolution retenue est indexée après relecture.
2. Créer le commit Résoudre le texte partagé termine la fusion en cours.
3. Ce commit possède deux parents dans ce scénario de divergence.
4. Le fichier committé contient la décision choisie et l’état final doit être propre.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git commit -m "Résoudre le texte partagé"
git status
git log --oneline --parents
```

