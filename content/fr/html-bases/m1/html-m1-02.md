---
{
  "id": "html-m1-02",
  "title_fr": "Organiser titres, paragraphes et importance",
  "course": "html-bases",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "html-m1-01"
  ],
  "outcomes": [
    "Écrire un plan de titres cohérent.",
    "Choisir entre paragraphe, importance et insistance."
  ],
  "idea_fr": "Une hiérarchie de titres rend le contenu navigable sans dépendre de sa taille visuelle.",
  "analogy_fr": "Les titres jouent le rôle d’un sommaire : ils indiquent les sujets et leurs sous-parties.",
  "examples": [
    {
      "code": "<h1>Les ateliers du jardin</h1>\n<h2>Participer</h2>\n<p>Les débutants sont les bienvenus.</p>\n<h2>Préparer sa visite</h2>\n<h3>Matériel</h3>\n<p>Apporte des chaussures fermées.</p>",
      "expected_output": "Un sujet principal, deux rubriques de même niveau et une sous-partie Matériel.",
      "trace_fr": [
        "h1 présente le sujet.",
        "Les deux h2 sont des rubriques voisines.",
        "h3 dépend de Préparer sa visite."
      ],
      "inputs": []
    },
    {
      "code": "<h1>La visite</h1>\n<p><strong>Inscription obligatoire.</strong> Apporte <em>ton propre</em> gobelet.</p>",
      "expected_output": "La phrase signale l’importance de l’inscription et l’insistance sur ton propre.",
      "trace_fr": [
        "strong concerne seulement la consigne d’inscription.",
        "em insiste sur deux mots sans créer une nouvelle rubrique."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Choisir un titre pour sa taille",
      "why_fr": "L’apparence par défaut est prise pour le sens.",
      "fix_fr": "Choisis le niveau du plan puis règle la taille en CSS."
    },
    {
      "error": "Empiler br pour espacer",
      "why_fr": "Les sauts de ligne remplacent une structure claire.",
      "fix_fr": "Utilise des paragraphes et, plus tard, des marges CSS."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi choisir h2 ?",
      "options": [
        "Parce qu’on veut forcément du texte bleu.",
        "Parce que h1 est interdit.",
        "Parce que tout texte court est un titre.",
        "Parce que le texte est une rubrique du sujet principal."
      ],
      "answer": 3,
      "explanation": "Le niveau dépend de la structure du contenu, pas de la couleur ou de la longueur.",
      "id": "html-m1-02-q1"
    },
    {
      "question": "Quel élément exprime une importance particulière ?",
      "options": [
        "title",
        "em",
        "strong",
        "br"
      ],
      "answer": 2,
      "explanation": "strong exprime une importance ; em correspond à une insistance.",
      "id": "html-m1-02-q2"
    },
    {
      "question": "Comment séparer deux idées en paragraphes ?",
      "options": [
        "Avec un commentaire.",
        "Avec deux éléments p.",
        "Avec dix espaces dans le fichier.",
        "Avec un h6 vide."
      ],
      "answer": 1,
      "explanation": "Les éléments p rendent la séparation explicite ; les espaces du fichier sont généralement regroupés au rendu.",
      "id": "html-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "hiérarchie",
      "definition": "Organisation de sujets et de sous-parties."
    },
    {
      "term": "paragraphe",
      "definition": "Unité de texte correspondant à une idée."
    },
    {
      "term": "insistance",
      "definition": "Accent porté sur une partie d’une phrase."
    }
  ],
  "recap_fr": [
    "Les titres forment un plan.",
    "p sépare les idées.",
    "strong et em expriment une intention."
  ],
  "tags": [
    "html",
    "m1",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
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

Une annonce peut être courte et pourtant difficile à parcourir. Imagine une page où la date, les règles et les horaires sont écrits dans un seul bloc. Pour aider le lecteur, commence par identifier le sujet principal, puis ses parties. HTML fournit des titres de h1 à h6 et des paragraphes p. Ces éléments donnent une organisation au texte ; leur apparence pourra changer ensuite avec CSS sans modifier leur rôle.

Dans notre petite page, h1 nomme le sujet principal : « Les ateliers du jardin ». Les rubriques « Participer » et « Préparer sa visite » sont des h2. Si la seconde rubrique contient « Matériel » et « Accès », ces sous-parties peuvent recevoir des h3. Choisis le niveau selon la relation entre les sujets. Prendre h4 parce qu’il paraît plus petit mélange le plan et la décoration. Pour ce cours, nous adoptons un seul h1 explicite et une descente sans saut afin de garder un plan simple.

Un paragraphe exprime une idée ou un petit groupe de phrases. Un retour à la ligne dans le fichier ne crée pas un nouveau paragraphe dans la page. Pour passer à une autre idée, ferme p puis ouvre un autre p. br produit un saut de ligne à l’intérieur d’un même contenu ; il peut convenir aux lignes d’une adresse, mais il ne doit pas servir à fabriquer des espaces entre toutes les rubriques. Des paragraphes bien séparés seront plus faciles à styliser.

Deux éléments permettent d’indiquer une intention dans une phrase. strong signale une importance particulière, par exemple une consigne de sécurité. em marque une insistance qui influence la lecture, comme « apporte ton propre gobelet ». Ils ne remplacent pas les titres. Le navigateur présente généralement strong en gras et em en italique, mais ces rendus peuvent être modifiés. Leur sens reste donc plus durable que leur forme actuelle. Garde les informations importantes dans des mots compréhensibles, sans dépendre uniquement d’un effet graphique.

Avant de coder, écris le plan de la page en quelques mots. Compare ensuite ce plan à l’ordre des titres dans l’aperçu. Dans les exercices, les sélecteurs vérifient les niveaux et les contenus annoncés ; ils n’imposent pas la mise en forme par défaut. Après chaque essai, lis uniquement les titres : le sujet et les rubriques doivent rester compréhensibles. Lis enfin les phrases sans leur présentation : une annonce claire doit encore transmettre son message.

## Exemple guidé 1

```html
<h1>Les ateliers du jardin</h1>
<h2>Participer</h2>
<p>Les débutants sont les bienvenus.</p>
<h2>Préparer sa visite</h2>
<h3>Matériel</h3>
<p>Apporte des chaussures fermées.</p>
```

## Exemple guidé 2

```html
<h1>La visite</h1>
<p><strong>Inscription obligatoire.</strong> Apporte <em>ton propre</em> gobelet.</p>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
