---
{
  "id": "git-m3-03",
  "title_fr": "Intégrer par avance rapide et lire l’ancêtre commun",
  "course": "git-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "git-m3-02"
  ],
  "outcomes": [
    "Intégrer une proposition par avance rapide.",
    "Expliquer la relation d’ancêtre qui rend cette intégration possible."
  ],
  "idea_fr": "Une avance rapide déplace la branche courante vers un descendant déjà existant lorsque son historique n’a pas divergé.",
  "analogy_fr": "Si un signet est simplement resté en arrière dans le même récit, il peut rejoindre la dernière page sans écrire un nouveau chapitre de raccord.",
  "examples": [
    {
      "title_fr": "Intégrer la proposition déjà prête",
      "steps_fr": [
        "Le scénario fast-forward commence propre sur main au commit Départ.",
        "idee pointe vers le descendant Idée qui contient projet.txt.",
        "Fusionner idee depuis main fait avancer main vers ce commit existant.",
        "projet.txt devient suivi sur main ; aucun nouveau commit de fusion n’est nécessaire."
      ]
    },
    {
      "title_fr": "Créer puis intégrer une documentation",
      "steps_fr": [
        "Depuis le même point de départ, documentation reçoit un nouveau fichier et un commit.",
        "Aucun commit n’a été ajouté à main pendant cette préparation.",
        "Après retour sur main, son commit est un ancêtre de documentation.",
        "La fusion peut avancer main jusqu’au commit Documenter le parcours."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Fusionner dans la mauvaise direction",
      "why_fr": "La destination est confondue avec la source.",
      "fix_fr": "Sélectionne d’abord la branche qui doit recevoir l’évolution."
    },
    {
      "error": "Attendre toujours un nouveau commit",
      "why_fr": "Avance rapide et fusion avec divergence sont mélangées.",
      "fix_fr": "Lis les liens d’historique et le commit atteint."
    }
  ],
  "glossary": [
    {
      "term": "avance rapide",
      "definition": "Déplacement d’une référence vers un descendant déjà existant."
    },
    {
      "term": "ancêtre",
      "definition": "Commit accessible en remontant les liens de parents."
    },
    {
      "term": "divergence",
      "definition": "Situation où plusieurs lignes possèdent des commits nouveaux depuis un point commun."
    }
  ],
  "recap_fr": [
    "Intégrer une proposition par avance rapide.",
    "Expliquer la relation d’ancêtre qui rend cette intégration possible.",
    "Vérifier la direction, les fichiers et l’état final."
  ],
  "quiz": [
    {
      "question": "Depuis quelle branche intégrer idee dans main ?",
      "options": [
        "Depuis n’importe quelle branche avec le même effet.",
        "Depuis main, en demandant la fusion de idee.",
        "Depuis idee, en effaçant main."
      ],
      "answer": 1,
      "explanation": "La branche courante est la destination de l’opération.",
      "id": "git-m3-03-q1"
    },
    {
      "question": "Qu’est-ce qui peut empêcher une avance rapide normale ?",
      "options": [
        "Une branche au nom court.",
        "Un fichier nommé README.md.",
        "Des nouveaux commits sur les deux lignes depuis leur ancêtre commun."
      ],
      "answer": 2,
      "explanation": "Une divergence change la relation d’ancêtre ; elle peut nécessiter une vraie fusion.",
      "id": "git-m3-03-q2"
    },
    {
      "question": "La fusion supprime-t-elle automatiquement le nom de la branche source ?",
      "options": [
        "Non.",
        "Oui, toujours.",
        "Seulement si elle contient un fichier texte."
      ],
      "answer": 0,
      "explanation": "Intégrer une ligne et supprimer son nom sont des opérations distinctes.",
      "id": "git-m3-03-q3"
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
      "title": "Git — branches",
      "url": "https://git-scm.com/docs/git-branch",
      "scope": "Référence technique vérifiée ; explications, exemples et activités originaux Nunya.",
      "last_checked": "2026-11-04"
    }
  ],
  "status": "brouillon",
  "reviewer": null
}
---

## Explication pas à pas

La proposition idee est prête et main n’a reçu aucun nouveau commit depuis leur départ commun. L’intégration peut alors prendre la forme d’une avance rapide, souvent nommée fast-forward. Le commit courant de main est déjà un ancêtre du dernier commit de idee. Il existe donc un chemin direct dans l’historique : Git peut déplacer main vers ce descendant sans fabriquer un commit de fusion supplémentaire.

Un ancêtre est un commit que l’on peut atteindre en remontant les liens de parents. L’ancêtre commun explique d’où partent les deux lignes. Dans notre scénario, le commit Départ précède le commit Idée et constitue encore la position de main avant l’intégration. Les noms des branches n’indiquent pas leur ancienneté ; ce sont les liens de l’historique qui permettent de comprendre cette relation. Une branche appelée principale ne gagne pas automatiquement en cas de divergence.

La direction de l’intégration compte. Pour intégrer idee dans main, commence par sélectionner main, puis demande de fusionner idee. La branche sélectionnée est la destination. L’autre nom désigne la source de l’évolution proposée. Après une avance rapide réussie, les deux branches peuvent pointer vers le même commit. Le nom idee n’est pas supprimé automatiquement. Les fichiers suivis de main correspondent maintenant au commit atteint, notamment projet.txt dans notre exemple.

L’avance rapide n’est pas une propriété de toutes les fusions. Si chaque ligne possède de nouveaux commits depuis leur ancêtre commun, leurs historiques ont divergé. Une intégration peut alors demander un commit ayant plusieurs parents, et parfois une résolution de conflit. Nous étudierons cette situation ensuite. Dans les activités présentes, les scénarios sont choisis pour permettre l’avance rapide normale ; nous ne forçons ni la réécriture de l’historique ni un mode de fusion particulier.

Avant d’intégrer, vérifie le nom courant et un état propre, puis relis l’historique et les fichiers attendus après l’opération. Compter seulement les commits ne suffit pas : un fichier peut être incorrect même si l’historique est plus long. Le laboratoire contrôle donc le contenu enregistré et l’état final. Les deux pratiques repartent de dépôts distincts : l’une utilise une proposition déjà préparée, l’autre te fait créer puis intégrer une documentation. Explique finalement pourquoi aucun nouveau commit de raccord n’était nécessaire et quel nom a réellement avancé. Cette explication prépare la compréhension d’une fusion avec divergence.

## Exemple guidé 1

Intégrer la proposition déjà prête

1. Le scénario fast-forward commence propre sur main au commit Départ.
2. idee pointe vers le descendant Idée qui contient projet.txt.
3. Fusionner idee depuis main fait avancer main vers ce commit existant.
4. projet.txt devient suivi sur main ; aucun nouveau commit de fusion n’est nécessaire.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git switch main
git merge idee
git status
git log --oneline
```

## Exemple guidé 2

Créer puis intégrer une documentation

1. Depuis le même point de départ, documentation reçoit un nouveau fichier et un commit.
2. Aucun commit n’a été ajouté à main pendant cette préparation.
3. Après retour sur main, son commit est un ancêtre de documentation.
4. La fusion peut avancer main jusqu’au commit Documenter le parcours.

Repères de commandes pour un environnement Git local. Ce bloc est une référence ; le laboratoire Nunya utilise ses boutons et ne simule pas un terminal natif.

```bash
git branch documentation
git switch documentation
# Écrire puis relire parcours.txt.
git add parcours.txt
git commit -m "Documenter le parcours"
git switch main
git merge documentation
```

