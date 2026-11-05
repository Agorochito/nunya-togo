---
{
  "id": "git-m4-03",
  "title_fr": "Projet : livrer un dépôt cohérent et expliquer son historique",
  "course": "git-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "git-m4-02"
  ],
  "outcomes": [
    "Livrer un dépôt local cohérent avec une fusion enregistrée.",
    "Vérifier les contenus, le message, les parents et la propreté."
  ],
  "idea_fr": "Un dépôt prêt à être examiné réunit des fichiers cohérents, un historique explicable et un état final vérifié.",
  "analogy_fr": "Tu remets un dossier accompagné de son carnet de décisions : les pages et leur histoire doivent se comprendre ensemble.",
  "examples": [
    {
      "title_fr": "Construire une première documentation vérifiable",
      "steps_fr": [
        "Initialiser le dossier vide crée le dépôt sur main.",
        "Écrire README.md avec un titre donne un point d’entrée au livrable.",
        "Indexer puis committer avec Présenter l’atelier enregistre ce document.",
        "Le contenu de HEAD, le message et un état propre montrent une première étape cohérente."
      ]
    },
    {
      "title_fr": "Consolider après une vraie divergence",
      "steps_fr": [
        "La fusion de idee depuis main rencontre le conflit fourni.",
        "La décision commune remplace les marqueurs et les documents sont relus.",
        "Indexer notes.txt, README.md et projet.txt prépare un ensemble cohérent.",
        "Le commit Consolider l’atelier partagé termine la fusion avec deux parents ; les fichiers et l’état sont ensuite inspectés."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier un fichier dans l’index",
      "why_fr": "Le commit final ne contient pas tout le livrable.",
      "fix_fr": "Relis les trois contenus puis indexe chacun avant le commit."
    },
    {
      "error": "Surinterpréter le succès automatique",
      "why_fr": "Les contrôles locaux sont présentés comme une revue ou une publication.",
      "fix_fr": "Explique les preuves réelles et leur limite."
    }
  ],
  "glossary": [
    {
      "term": "livrable",
      "definition": "Ensemble concret remis pour être examiné."
    },
    {
      "term": "critère d’acceptation",
      "definition": "Condition observable attendue pour considérer une étape satisfaite."
    },
    {
      "term": "preuve",
      "definition": "Observation qui appuie une affirmation précise sur le résultat."
    }
  ],
  "recap_fr": [
    "Livrer un dépôt local cohérent avec une fusion enregistrée.",
    "Vérifier les contenus, le message, les parents et la propreté.",
    "Expliquer les décisions et les limites du livrable."
  ],
  "quiz": [
    {
      "question": "Pourquoi vérifier les fichiers dans HEAD plutôt que seulement dans l’espace de travail ?",
      "options": [
        "HEAD publie automatiquement les fichiers.",
        "Le livrable annoncé doit être réellement enregistré dans le commit.",
        "Les fichiers de travail n’existent jamais."
      ],
      "answer": 1,
      "explanation": "Une édition non committée ne prouve pas que le livrable est dans l’historique.",
      "id": "git-m4-03-q1"
    },
    {
      "question": "Quelles preuves distinguent le projet d’une fusion simplement commencée ?",
      "options": [
        "Uniquement les marqueurs de conflit visibles.",
        "Seulement le nom idee.",
        "Le contenu final committé, deux parents et un état propre."
      ],
      "answer": 2,
      "explanation": "Le projet exige la résolution enregistrée et la fin de l’opération.",
      "id": "git-m4-03-q2"
    },
    {
      "question": "Quelle suite reste distincte de cette réussite locale ?",
      "options": [
        "Une véritable publication et revue sur GitHub dans un environnement autorisé.",
        "Une pull request automatiquement ouverte par le laboratoire.",
        "Une approbation déjà reçue de toute équipe."
      ],
      "answer": 0,
      "explanation": "Le périmètre de l’atelier s’arrête au dépôt privé local et aux vérifications annoncées.",
      "id": "git-m4-03-q3"
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
    },
    {
      "title": "GitHub — pull requests et revue",
      "url": "https://docs.github.com/fr/pull-requests/reference/pull-requests",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

Le dernier projet prépare le dépôt d’un atelier collectif fictif. Il doit contenir une courte documentation, une décision partagée et une prochaine étape. Ce livrable reste dans le laboratoire privé du navigateur. Aucun compte GitHub, envoi distant ou avis extérieur n’est créé. Tu dois pouvoir montrer ce que les fichiers contiennent et expliquer comment les lignes de développement ont été réunies, sans confondre ce résultat local avec une publication.

Les deux premières activités sont des préparations indépendantes. L’une part d’un dossier vide et te fait enregistrer un README. L’autre intègre une proposition par avance rapide puis documente son parcours. Elles ne s’additionnent pas automatiquement dans un même dépôt : chaque activité possède son scénario. Le projet complet, dans la troisième, repart d’une divergence fournie afin de vérifier une véritable résolution et un commit à deux parents.

Dans ce projet complet, commence sur main et demande la fusion de idee. Lis le conflit de notes.txt. La décision du scénario est d’écrire « Décision commune : préparer un atelier découverte. » puis un retour à la ligne. Ajoute projet.txt avec « Prochaine étape : relire le programme. » et un retour final. Le README demandé décrit les fichiers, la vérification locale et la limite de publication. Relis ces trois contenus avant de les indexer : un message de commit précis ne corrige pas un fichier incohérent.

Crée ensuite le commit « Consolider l’atelier partagé ». Les critères obligatoires portent sur les trois contenus enregistrés, ce message, les deux parents du commit et l’absence de changements locaux restants. Une fusion seulement commencée, une résolution non indexée ou un fichier laissé hors du commit ne satisfait pas ces critères. Les contrôles évaluent des propriétés du dépôt réel, sans se contenter d’un bouton par lequel tu déclarerais avoir terminé.

La revue finale comporte aussi une explication humaine. Raconte le point de départ commun, la divergence, le choix de résolution et la preuve d’enregistrement. Distingue fonctionnement, clarté des fichiers, vérification et explication : pour chaque dimension, note « à reprendre », « satisfait » ou « expliqué et vérifié ». Le succès automatique n’évalue pas toute la qualité d’une collaboration réelle. Termine en indiquant une limite et une suite possible, comme une revue sur GitHub dans un environnement autorisé. Ce cours valide les premières pratiques locales ; les opérations avancées et les politiques d’équipe demanderont d’autres apprentissages.

## Exemple guidé 1

Construire une première documentation vérifiable

1. Initialiser le dossier vide crée le dépôt sur main.
2. Écrire README.md avec un titre donne un point d’entrée au livrable.
3. Indexer puis committer avec Présenter l’atelier enregistre ce document.
4. Le contenu de HEAD, le message et un état propre montrent une première étape cohérente.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git init -b main
# Écrire puis relire README.md.
git add README.md
git commit -m "Présenter l’atelier"
git status
```

## Exemple guidé 2

Consolider après une vraie divergence

1. La fusion de idee depuis main rencontre le conflit fourni.
2. La décision commune remplace les marqueurs et les documents sont relus.
3. Indexer notes.txt, README.md et projet.txt prépare un ensemble cohérent.
4. Le commit Consolider l’atelier partagé termine la fusion avec deux parents ; les fichiers et l’état sont ensuite inspectés.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git merge idee
# Résoudre notes.txt, puis écrire et relire README.md et projet.txt.
git add notes.txt README.md projet.txt
git commit -m "Consolider l’atelier partagé"
git status
git log --oneline --parents
```

