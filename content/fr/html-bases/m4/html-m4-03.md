---
{
  "id": "html-m4-03",
  "title_fr": "Projet : publier la structure d’une page associative",
  "course": "html-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "html-m4-02"
  ],
  "outcomes": [
    "Assembler une page associative avec navigation et formulaire.",
    "Évaluer le livrable avec des critères et une revue humaine."
  ],
  "idea_fr": "Le projet rassemble une page informative et un formulaire local dont les relations sont explicables.",
  "analogy_fr": "Tu passes du montage de pièces à la visite complète d’un lieu : chaque chemin doit mener quelque part.",
  "examples": [
    {
      "code": "<header><h1>Graines ensemble</h1><p>Association fictive de jardinage.</p></header>\n<nav aria-label=\"Principale\"><a href=\"#activites\">Activités</a><a href=\"#inscription\">Inscription</a></nav>\n<main id=\"contenu\"><section id=\"activites\"><h2>Activités</h2><article><h3>Semis</h3><p>Découvrir les graines.</p></article><article><h3>Compost</h3><p>Comprendre les matières organiques.</p></article></section><section id=\"inscription\"><h2>Inscription</h2><p>Formulaire de démonstration.</p></section></main>\n<footer><p>Aucune inscription réelle.</p></footer>",
      "expected_output": "Un plan complet sans style, avec deux rubriques et deux activités fictives.",
      "trace_fr": [
        "La navigation correspond aux ids des rubriques.",
        "Les deux ateliers sont des articles au même niveau.",
        "Le pied de page annonce la limite de la démonstration."
      ],
      "inputs": []
    },
    {
      "code": "<form><p id=\"aide\">Données fictives uniquement.</p>\n<label for=\"contact\">Adresse de contact, obligatoire</label><input type=\"email\" id=\"contact\" name=\"contact\" required aria-describedby=\"aide\">\n<label for=\"atelier\">Atelier, obligatoire</label><select id=\"atelier\" name=\"atelier\" required><option value=\"\">Choisir</option><option value=\"semis\">Semis</option><option value=\"compost\">Compost</option></select>\n<button type=\"submit\">Vérifier la demande fictive</button></form>",
      "expected_output": "Le fragment de formulaire possède des noms et des contraintes explicites ; aucun service n’est connecté.",
      "trace_fr": [
        "L’aide reste visible.",
        "L’email et le choix vide sont soumis aux contraintes natives.",
        "Le bouton annonce une vérification de démonstration."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Présenter la démonstration comme un service réel",
      "why_fr": "La structure est confondue avec le traitement des données.",
      "fix_fr": "Affiche clairement la limite locale."
    },
    {
      "error": "S’arrêter au test automatique",
      "why_fr": "La clarté et l’usage n’ont pas été examinés.",
      "fix_fr": "Relis, teste au clavier et explique trois choix."
    }
  ],
  "quiz": [
    {
      "question": "Que réalise réellement ce projet ?",
      "options": [
        "Un système d’inscription complet.",
        "Une base de données sécurisée.",
        "Un diplôme de développeur.",
        "Une structure de page et un formulaire local de démonstration."
      ],
      "answer": 3,
      "explanation": "Le projet est limité à HTML et n’intègre ni serveur ni persistance.",
      "id": "html-m4-03-q1"
    },
    {
      "question": "Quand le projet est-il prêt pour une revue ?",
      "options": [
        "Quand les titres sont colorés.",
        "Quand la correction a seulement été ouverte.",
        "Quand les critères obligatoires sont satisfaits et les choix peuvent être expliqués.",
        "Quand le fichier est long."
      ],
      "answer": 2,
      "explanation": "Les activités, la vérification manuelle et l’explication sont nécessaires pour examiner les capacités acquises.",
      "id": "html-m4-03-q2"
    },
    {
      "question": "Quelle suite convient après cette première structure ?",
      "options": [
        "Transformer tous les éléments en tableaux.",
        "Les bases CSS pour présenter et adapter la page.",
        "Une application React sans autre prérequis.",
        "Ignorer le clavier."
      ],
      "answer": 1,
      "explanation": "CSS apporte la présentation et l’adaptation ; JavaScript et les niveaux supérieurs demandent une progression séparée.",
      "id": "html-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "critère d’acceptation",
      "definition": "Condition observable attendue dans le livrable."
    },
    {
      "term": "jalon",
      "definition": "Étape vérifiable d’un projet."
    },
    {
      "term": "revue",
      "definition": "Examen du résultat et des choix qui le construisent."
    }
  ],
  "recap_fr": [
    "Le projet possède un périmètre explicite.",
    "Les relations HTML sont vérifiées.",
    "La suite CSS améliore la présentation sans remplacer la structure."
  ],
  "tags": [
    "html",
    "m4",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "project": {
    "context_fr": "Page de l’association fictive Graines ensemble, sans envoi réel.",
    "deliverables_fr": [
      "Document HTML complet",
      "Parcours clavier vérifié",
      "Explication de trois choix de structure"
    ],
    "acceptance_criteria_fr": [
      "Plan de titres et régions cohérents",
      "Liens internes sans cible manquante",
      "Labels et descriptions reliés",
      "Contraintes annoncées",
      "Démonstration explicitement fictive"
    ],
    "rubric": [
      {
        "criterion_fr": "Navigation et fonctionnement",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Clarté des textes",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Relations HTML et usage clavier",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Explication des choix",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      }
    ],
    "extensions_fr": [
      "Ajouter un tableau d’horaires avec en-têtes",
      "Ajouter une figure dont l’alternative est justifiée",
      "Poursuivre avec CSS : premières interfaces"
    ]
  },
  "references": [
    {
      "title": "Standard HTML — structure et métadonnées",
      "url": "https://html.spec.whatwg.org/multipage/semantics.html"
    },
    {
      "title": "Standard HTML — formulaires",
      "url": "https://html.spec.whatwg.org/multipage/forms.html"
    },
    {
      "title": "Standard HTML — images et médias",
      "url": "https://html.spec.whatwg.org/multipage/embedded-content.html"
    },
    {
      "title": "Standard HTML — tableaux",
      "url": "https://html.spec.whatwg.org/multipage/tables.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard, sous-ensemble débutant ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

Graines ensemble, une association entièrement fictive, veut une page qui présente ses ateliers et prépare une demande de participation. Ton livrable est un document HTML autonome. Il ne crée aucun compte, ne stocke aucune donnée et ne réalise aucune inscription réelle. Ce périmètre est volontaire : il permet de vérifier la structure, la navigation et la saisie avant d’apprendre les styles et la programmation d’un service.

Prépare d’abord le contenu. La page doit annoncer le nom de l’association, expliquer son activité en un paragraphe et présenter deux ateliers fictifs. Une navigation mène aux activités et à l’inscription. Un lien initial permet de rejoindre main. Les titres forment un plan continu : un h1 pour le sujet, des h2 pour les rubriques et des h3 pour les fiches d’atelier si tu utilises article. Le pied de page rappelle qu’il s’agit d’une démonstration.

Le formulaire demande un prénom, une adresse de contact et un atelier. Chaque contrôle possède un label explicite, un id unique, un name et un type approprié. L’adresse de contact et le choix d’atelier sont obligatoires ; cette règle apparaît dans les textes visibles. Une aide indique que seules des données fictives doivent être utilisées. La sélection commence par une option vide. Le bouton porte un intitulé clair et un type submit ; l’environnement d’apprentissage bloque tout envoi réel.

Construis par étapes : régions et titres, liens et cibles, fiches d’atelier, puis formulaire. Les quatre activités servent de jalons ; la dernière rassemble les critères essentiels. Les contrôles portent sur le DOM et les relations annoncées, sans exiger la même indentation que la correction. Une réussite automatique ne garantit pas une page accessible pour tout le monde. Il reste à relire les textes, activer les liens et parcourir chaque contrôle au clavier.

Évalue ton résultat avec quatre critères : fonctionnement des destinations, clarté des textes, qualité des relations HTML et explication de tes choix. Pour chaque critère, note « à reprendre », « satisfait » ou « expliqué et vérifié ». Le projet est prêt pour une revue lorsque tous les critères obligatoires sont satisfaits et que tu peux justifier au moins le choix des titres, des labels et des contraintes. Le parcours CSS permettra ensuite de rendre la page adaptable. Les niveaux intermédiaire et avancé restent à construire ; ce projet valide uniquement une première structure débutante.

## Exemple guidé 1

```html
<header><h1>Graines ensemble</h1><p>Association fictive de jardinage.</p></header>
<nav aria-label="Principale"><a href="#activites">Activités</a><a href="#inscription">Inscription</a></nav>
<main id="contenu"><section id="activites"><h2>Activités</h2><article><h3>Semis</h3><p>Découvrir les graines.</p></article><article><h3>Compost</h3><p>Comprendre les matières organiques.</p></article></section><section id="inscription"><h2>Inscription</h2><p>Formulaire de démonstration.</p></section></main>
<footer><p>Aucune inscription réelle.</p></footer>
```

## Exemple guidé 2

```html
<form><p id="aide">Données fictives uniquement.</p>
<label for="contact">Adresse de contact, obligatoire</label><input type="email" id="contact" name="contact" required aria-describedby="aide">
<label for="atelier">Atelier, obligatoire</label><select id="atelier" name="atelier" required><option value="">Choisir</option><option value="semis">Semis</option><option value="compost">Compost</option></select>
<button type="submit">Vérifier la demande fictive</button></form>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
