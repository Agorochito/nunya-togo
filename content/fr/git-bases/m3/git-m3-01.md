---
{
  "id": "git-m3-01",
  "title_fr": "Créer une branche puis choisir où travailler",
  "course": "git-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "git-m2-03"
  ],
  "outcomes": [
    "Distinguer création et sélection d’une branche.",
    "Vérifier la branche et les fichiers réellement courants."
  ],
  "idea_fr": "Une branche nomme une ligne de développement ; la créer et la sélectionner sont deux opérations différentes.",
  "analogy_fr": "Une branche est un signet mobile dans un historique, plutôt qu’un nouveau dossier copié à la main.",
  "examples": [
    {
      "title_fr": "Créer sans encore changer de position",
      "steps_fr": [
        "Le dépôt commence propre sur main avec le commit Départ.",
        "Créer contact ajoute un nom qui pointe vers le même commit.",
        "La branche active reste main tant que tu ne demandes pas de bascule.",
        "Après le changement vers contact, les mêmes fichiers restent visibles car aucun commit différent n’existe encore."
      ]
    },
    {
      "title_fr": "Retrouver les fichiers de main",
      "steps_fr": [
        "Le scénario feature commence sur idee avec un projet.txt enregistré.",
        "La branche main ne possède pas ce commit supplémentaire.",
        "Changer vers main affiche sa version des fichiers suivis.",
        "projet.txt n’est plus dans la vue courante, mais le commit Idée demeure dans l’historique de idee."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Créer puis oublier de basculer",
      "why_fr": "Le nom courant reste celui de départ.",
      "fix_fr": "Lis la branche active avant de modifier."
    },
    {
      "error": "Croire qu’un fichier disparu est effacé de tout Git",
      "why_fr": "Seule la vue de la branche a changé.",
      "fix_fr": "Reviens sur la branche qui possède son commit pour vérifier."
    }
  ],
  "glossary": [
    {
      "term": "branche",
      "definition": "Référence nommée qui suit une ligne de développement."
    },
    {
      "term": "HEAD",
      "definition": "Position de travail qui suit ici la branche courante."
    },
    {
      "term": "bascule",
      "definition": "Changement de la branche sélectionnée et préparation de sa vue des fichiers."
    }
  ],
  "recap_fr": [
    "Distinguer création et sélection d’une branche.",
    "Vérifier la branche et les fichiers réellement courants.",
    "Conserver un état propre avant de basculer."
  ],
  "quiz": [
    {
      "question": "Que fait la création seule dans cet atelier ?",
      "options": [
        "Elle copie tous les fichiers dans un deuxième dossier.",
        "Elle publie sur GitHub.",
        "Elle ajoute un nom sans changer la branche courante."
      ],
      "answer": 2,
      "explanation": "La création pose une référence ; la sélection nécessite une action distincte.",
      "id": "git-m3-01-q1"
    },
    {
      "question": "Pourquoi les fichiers restent-ils identiques juste après une création et une bascule ?",
      "options": [
        "Les branches désignent encore le même commit.",
        "Git n’enregistre jamais les fichiers.",
        "La nouvelle branche est forcément vide."
      ],
      "answer": 0,
      "explanation": "Aucun nouveau commit ne distingue encore les deux lignes.",
      "id": "git-m3-01-q2"
    },
    {
      "question": "Pourquoi vérifier l’état avant une bascule ?",
      "options": [
        "La bascule supprime toujours toutes les données.",
        "Des changements non enregistrés peuvent influencer ou empêcher l’opération.",
        "Un commit est envoyé en ligne à chaque fois."
      ],
      "answer": 1,
      "explanation": "Le cours choisit un état propre pour rendre le résultat prévisible sans demander une opération forcée.",
      "id": "git-m3-01-q3"
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

Le dépôt de l’atelier fictif possède déjà un commit sur main. Tu veux préparer une nouvelle idée sans déplacer immédiatement le travail principal. Une branche permet de nommer une ligne de développement. Dans Git, elle correspond à une référence vers un commit, appelée à avancer avec les nouveaux commits enregistrés sur cette branche. Elle n’est pas une copie indépendante de tout le dossier sur ton ordinateur.

Créer une branche et basculer dessus sont deux actions distinctes. Dans notre laboratoire, « Créer une branche » ajoute le nom demandé sans changer la branche active. Pour commencer à y enregistrer des commits, utilise ensuite l’action de changement de branche. Le nom courant est affiché dans l’atelier. Prends l’habitude de le lire avant chaque modification importante et avant chaque commit : un bon contenu enregistré sur la mauvaise branche peut compliquer la suite.

HEAD désigne ici la position de travail courante en suivant la branche sélectionnée. Lorsque deux branches viennent d’être créées au même commit, leurs fichiers suivis sont identiques. Leurs noms sont distincts mais aucun nouveau contenu n’a encore été enregistré. La création seule ne prouve donc pas que tu as développé une fonctionnalité, ni qu’un nouveau commit existe. L’historique permet de distinguer le nom d’une branche et les changements réellement enregistrés.

Basculer vers une autre branche prépare ses fichiers suivis dans l’espace de travail. Dans le scénario fourni, idee possède un commit qui ajoute projet.txt ; main est restée au commit de départ. Revenir sur main fait disparaître ce fichier suivi de la vue courante, sans supprimer le commit qui le contient sur idee. Cette observation ne signifie pas que tous les fichiers non suivis changent ainsi. Les modifications non enregistrées peuvent aussi empêcher un changement de branche ou accompagner celui-ci selon le cas.

Pour apprendre sans ambiguïté, les activités demandent un état propre avant de basculer. Nous ne pratiquons pas ici les changements forcés, les suppressions de branche ou la mise de côté temporaire. Chaque activité initialise son propre dépôt virtuel et sa propre situation ; réinitialiser l’activité reconstruit cette situation. Les boutons réalisent des opérations Git sur les fichiers privés du laboratoire. Les commandes présentées dans les exemples sont des repères pour un environnement Git local, pas un terminal natif simulé. Vérifie le nom courant, les fichiers et l’historique pour expliquer chaque résultat.

## Exemple guidé 1

Créer sans encore changer de position

1. Le dépôt commence propre sur main avec le commit Départ.
2. Créer contact ajoute un nom qui pointe vers le même commit.
3. La branche active reste main tant que tu ne demandes pas de bascule.
4. Après le changement vers contact, les mêmes fichiers restent visibles car aucun commit différent n’existe encore.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git branch contact
git switch contact
git status
```

## Exemple guidé 2

Retrouver les fichiers de main

1. Le scénario feature commence sur idee avec un projet.txt enregistré.
2. La branche main ne possède pas ce commit supplémentaire.
3. Changer vers main affiche sa version des fichiers suivis.
4. projet.txt n’est plus dans la vue courante, mais le commit Idée demeure dans l’historique de idee.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git switch main
git status
git log --oneline
```

