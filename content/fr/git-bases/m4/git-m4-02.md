---
{
  "id": "git-m4-02",
  "title_fr": "Préparer une revue et comprendre une pull request GitHub",
  "course": "git-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "git-m4-01"
  ],
  "outcomes": [
    "Préparer une proposition locale documentée et propre.",
    "Distinguer cette préparation d’une vraie pull request en ligne."
  ],
  "idea_fr": "Git enregistre localement ; GitHub permet notamment de proposer et discuter une intégration en ligne avec une pull request.",
  "analogy_fr": "Le commit est un document préparé ; la pull request est une demande de discussion et d’intégration adressée dans un espace partagé.",
  "examples": [
    {
      "title_fr": "Préparer le contexte local",
      "steps_fr": [
        "Créer proposition puis basculer dessus isole une évolution documentaire.",
        "Écrire et relire README.md précise l’objectif et la limite locale.",
        "Indexer puis committer enregistre cette préparation dans le dépôt virtuel.",
        "Aucun dépôt distant ni aucune pull request n’existe du fait de ces seules actions."
      ]
    },
    {
      "title_fr": "Décrire honnêtement la suite en ligne",
      "steps_fr": [
        "La proposition locale est propre et ses changements peuvent être expliqués.",
        "Dans un environnement distinct autorisé, les commits doivent être rendus disponibles sur GitHub avec l’authentification appropriée.",
        "Une vraie pull request choisit ensuite une branche source et une branche cible puis présente le contexte aux personnes chargées de la revue.",
        "Une revue ou des vérifications peuvent encore demander des modifications ; l’intégration n’est pas automatique."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre commit et publication",
      "why_fr": "Une opération locale est prise pour un envoi.",
      "fix_fr": "Nomme séparément enregistrement, disponibilité distante et proposition."
    },
    {
      "error": "Inventer une validation de revue",
      "why_fr": "La propreté est confondue avec l’accord des personnes chargées de relire.",
      "fix_fr": "Décris les vérifications réellement effectuées et les retours reçus."
    }
  ],
  "glossary": [
    {
      "term": "dépôt distant",
      "definition": "Dépôt accessible par un service ou une autre adresse, distinct du dépôt local."
    },
    {
      "term": "pull request",
      "definition": "Proposition de changements et espace de revue sur GitHub."
    },
    {
      "term": "branche cible",
      "definition": "Branche qui recevrait les changements proposés après intégration."
    }
  ],
  "recap_fr": [
    "Préparer une proposition locale documentée et propre.",
    "Distinguer cette préparation d’une vraie pull request en ligne.",
    "Expliquer le rôle de la revue et des preuves."
  ],
  "quiz": [
    {
      "question": "Une pull request est-elle un commit Git local ?",
      "options": [
        "Non, c’est une proposition et un espace de collaboration du service GitHub.",
        "Oui, ce sont deux noms du même objet.",
        "Oui, dès que README existe."
      ],
      "answer": 0,
      "explanation": "Git et la fonctionnalité de revue hébergée ont des rôles distincts.",
      "id": "git-m4-02-q1"
    },
    {
      "question": "Que doit annoncer une description de proposition ?",
      "options": [
        "Des tests inventés pour rassurer.",
        "Le problème, le changement, les vérifications et les limites.",
        "Uniquement un numéro de version."
      ],
      "answer": 1,
      "explanation": "Le contexte doit permettre un examen réel du changement et de ses preuves.",
      "id": "git-m4-02-q2"
    },
    {
      "question": "Une branche propre dans Nunya prouve-t-elle son envoi sur GitHub ?",
      "options": [
        "Oui, si la branche s’appelle idee.",
        "Oui, si le message est long.",
        "Non, aucune opération réseau n’est réalisée par ces labs."
      ],
      "answer": 2,
      "explanation": "Le laboratoire vérifie un dépôt local ; il ne doit pas présenter une préparation comme une publication.",
      "id": "git-m4-02-q3"
    }
  ],
  "sources": [
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

Git et GitHub remplissent des rôles différents. Les commits, les branches et les fusions étudiés jusque-là existent dans un dépôt Git local. GitHub est un service qui peut héberger un dépôt et fournir des outils de collaboration. Un état propre dans le laboratoire ne signifie pas qu’un dépôt a été créé sur GitHub. Nos fichiers virtuels ne sont pas envoyés en ligne et aucune demande de revue n’est réellement créée ici.

Une pull request propose d’intégrer les changements d’une branche dans une branche cible sur GitHub. Elle permet de décrire l’objectif, examiner les différences, discuter et consulter les vérifications disponibles. Elle n’est pas un simple synonyme de commit ni une commande fondamentale de Git. La branche proposée et la branche cible doivent être choisies avec soin : une proposition vers la mauvaise destination ne remplit pas le même objectif, même si ses fichiers sont corrects.

Pour créer une vraie proposition en ligne, il faut accéder à GitHub, s’authentifier et disposer des droits adaptés au dépôt ou au modèle de contribution choisi. Les commits de la proposition doivent être disponibles sur le dépôt hébergé concerné, généralement après un envoi approprié. Les accès, les règles de revue et les protections de branche dépendent du projet. L’atelier présent n’offre ni connexion distante ni envoi : ses activités réalisent uniquement une préparation locale vérifiable.

Une bonne préparation possède un périmètre clair, des fichiers relus, des commits compréhensibles et une explication des vérifications réalisées. Le README peut aider à poser le contexte, mais il ne remplace pas la description d’une future pull request. Cette description devrait expliquer le problème traité, le changement proposé, les essais et les limites connues. Évite d’affirmer que des tests ont réussi si tu as seulement lu le fichier. Une revue peut demander des corrections avant toute intégration.

Les deux pratiques locales demandent donc des commits propres et documentés, sans prétendre publier. Les deux questions de workflow vérifient ensuite ce qui manquerait pour passer sur GitHub et comment interpréter une demande de revue. Chaque pratique possède son dépôt indépendant. À la fin, distingue ce que tu as réellement fait dans Nunya et ce que tu devrais faire dans un environnement GitHub autorisé. L’objectif débutant est de comprendre cette frontière et de préparer un travail examinable ; il n’est pas de recevoir un succès de publication fictif.

## Exemple guidé 1

Préparer le contexte local

1. Créer proposition puis basculer dessus isole une évolution documentaire.
2. Écrire et relire README.md précise l’objectif et la limite locale.
3. Indexer puis committer enregistre cette préparation dans le dépôt virtuel.
4. Aucun dépôt distant ni aucune pull request n’existe du fait de ces seules actions.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git branch proposition
git switch proposition
git add README.md
git commit -m "Documenter une proposition"
```

## Exemple guidé 2

Décrire honnêtement la suite en ligne

1. La proposition locale est propre et ses changements peuvent être expliqués.
2. Dans un environnement distinct autorisé, les commits doivent être rendus disponibles sur GitHub avec l’authentification appropriée.
3. Une vraie pull request choisit ensuite une branche source et une branche cible puis présente le contexte aux personnes chargées de la revue.
4. Une revue ou des vérifications peuvent encore demander des modifications ; l’intégration n’est pas automatique.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
# Repères Git locaux, sans action réseau dans le laboratoire.
git status
git log --oneline
```

