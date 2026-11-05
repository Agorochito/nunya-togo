---
{
  "id": "css-m1-01",
  "title_fr": "Écrire des règles et cibler les éléments",
  "course": "css-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Écrire une déclaration et choisir un sélecteur simple.",
    "Vérifier les éléments ciblés et leurs voisins."
  ],
  "idea_fr": "Une règle CSS associe un sélecteur à des déclarations de présentation.",
  "analogy_fr": "Le sélecteur est une adresse de livraison : il indique à quels éléments remettre une consigne de présentation.",
  "examples": [
    {
      "code": "p { color: navy; }\n.intro { font-weight: 700; }",
      "expected_output": "Tous les paragraphes sont bleu marine ; le paragraphe intro est aussi gras.",
      "trace_fr": [
        "p sélectionne trois paragraphes dans la structure fournie.",
        ".intro ajoute une propriété au paragraphe d’introduction."
      ],
      "inputs": [],
      "fixture_html": "<main><h1>Le jardin</h1><p class=\"intro\">Bienvenue au jardin fictif.</p><p>Une activité par semaine.</p><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></main>"
    },
    {
      "code": ".carte p { color: green; }\nh1, h2 { color: navy; }",
      "expected_output": "Le paragraphe de carte est vert ; les deux niveaux de titres sont bleu marine.",
      "trace_fr": [
        "L’espace limite le paragraphe à un descendant de carte.",
        "La virgule applique la couleur aux deux sélecteurs de titres."
      ],
      "inputs": [],
      "fixture_html": "<main><h1>Le jardin</h1><p class=\"intro\">Bienvenue au jardin fictif.</p><p>Une activité par semaine.</p><article class=\"carte\"><h2>Semis</h2><p>Découvrir les graines.</p></article></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire intro sans point",
      "why_fr": "Un type d’élément est visé au lieu de la classe.",
      "fix_fr": "Utilise .intro."
    },
    {
      "error": "Coller une balise style dans cet éditeur",
      "why_fr": "L’atelier attend une feuille CSS seule.",
      "fix_fr": "Écris directement les règles."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne .intro ?",
      "options": [
        "Un élément HTML nommé intro.",
        "Le premier paragraphe obligatoirement.",
        "Un identifiant unique intro.",
        "Les éléments possédant la classe intro."
      ],
      "answer": 3,
      "explanation": "Le point introduit un sélecteur de classe ; il ne figure pas dans la valeur HTML de class.",
      "id": "css-m1-01-q1"
    },
    {
      "question": "Que signifie .carte p ?",
      "options": [
        "Le parent de chaque carte.",
        "Un p dont l’id est carte.",
        "Les p descendants d’un élément .carte.",
        "Toutes les cartes et tous les paragraphes."
      ],
      "answer": 2,
      "explanation": "L’espace exprime une relation de descendant ; une virgule aurait regroupé deux sélections.",
      "id": "css-m1-01-q2"
    },
    {
      "question": "Pourquoi observer le résultat après une modification ?",
      "options": [
        "Le HTML est supprimé à chaque règle.",
        "Une déclaration invalide peut être ignorée sans message évident.",
        "CSS envoie un courriel.",
        "Les propriétés corrigent automatiquement les fautes."
      ],
      "answer": 1,
      "explanation": "CSS tolère certaines erreurs ; l’aperçu et le style calculé aident à vérifier l’effet réel.",
      "id": "css-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "sélecteur",
      "definition": "Expression désignant les éléments auxquels appliquer une règle."
    },
    {
      "term": "déclaration",
      "definition": "Association d’une propriété CSS et d’une valeur."
    },
    {
      "term": "style calculé",
      "definition": "Valeur déterminée par le navigateur après application des règles."
    }
  ],
  "recap_fr": [
    "Un sélecteur désigne les éléments.",
    "Une déclaration associe propriété et valeur.",
    "Le résultat calculé permet plusieurs écritures valides."
  ],
  "tags": [
    "css",
    "m1",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "references": [
    {
      "title": "W3C — cascade et héritage",
      "url": "https://www.w3.org/TR/css-cascade-5/"
    },
    {
      "title": "W3C — modèle de boîte",
      "url": "https://www.w3.org/TR/css-box-3/"
    },
    {
      "title": "W3C — Flexbox",
      "url": "https://www.w3.org/TR/css-flexbox-1/"
    },
    {
      "title": "W3C — Grid",
      "url": "https://www.w3.org/TR/css-grid-1/"
    },
    {
      "title": "W3C — requêtes de média",
      "url": "https://www.w3.org/TR/mediaqueries-5/"
    }
  ],
  "technical_scope_fr": "CSS, sous-ensemble débutant des modules cités ; faits vérifiés le 4 novembre 2026."
}
---

## Explication pas à pas

La page du jardin possède déjà des titres, des paragraphes et des fiches. CSS est un langage de styles qui règle leur présentation. Il ne remplace pas leur sens HTML. Un h2 reste un titre de rubrique même si sa taille change. Dans cet atelier, le HTML est fourni et tu écris seulement la feuille de style. Cela permet d’observer ce qui dépend du contenu et ce qui dépend des règles visuelles.

Une règle comporte un sélecteur, puis des accolades contenant des déclarations. Dans p { color: navy; }, p choisit tous les paragraphes et color indique la couleur de leur texte. Une déclaration associe une propriété à une valeur grâce aux deux-points. Le point-virgule sépare les déclarations ; le conserver après la dernière facilite les ajouts. Une valeur inconnue peut être ignorée sans que toute la page affiche une erreur, ce qui rend l’observation indispensable.

Le sélecteur de type vise un nom d’élément, comme h1. Un sélecteur de classe commence par un point : .intro correspond à un élément dont l’attribut class contient intro. Plusieurs éléments peuvent partager cette classe. Le point ne fait pas partie de la valeur de class. Un sélecteur d’identifiant commence par un dièse, mais nous privilégions les classes pour les styles réutilisables. L’id sert déjà à identifier une cible unique et peut rendre les priorités de style moins faciles à gérer.

Une espace dans un sélecteur exprime une relation de descendant : .carte p vise les paragraphes contenus dans une carte, même avec un conteneur intermédiaire. La virgule regroupe plusieurs sélecteurs qui reçoivent les mêmes déclarations. Elle ne signifie pas une relation entre parent et enfant. Tu découvriras progressivement d’autres sélecteurs ; il vaut mieux commencer avec des intentions simples, nommées d’après le rôle du contenu.

Dans une page complète, une feuille externe peut être reliée depuis head avec link. L’atelier effectue ce raccordement pour toi : ne colle pas de balise style ni de HTML dans l’éditeur CSS. Prédis les éléments touchés, lance l’aperçu, puis regarde les contrôles. Ils inspectent les styles calculés dans le navigateur. Deux écritures différentes peuvent donc réussir si elles produisent les mêmes propriétés demandées. Observe aussi les éléments qui devaient rester inchangés : une sélection trop large est un résultat incorrect même si la carte ciblée semble réussie.

## Exemple guidé 1

```css
p { color: navy; }
.intro { font-weight: 700; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.carte p { color: green; }
h1, h2 { color: navy; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Vérifier et expliquer

Observe l’aperçu à petite et grande largeur, puis parcours les contrôles avec Tab. Explique la règle qui produit chaque résultat. Les tests de style ne remplacent pas la revue de lisibilité et d’usage.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [W3C — cascade et héritage](https://www.w3.org/TR/css-cascade-5/)
- [W3C — modèle de boîte](https://www.w3.org/TR/css-box-3/)
- [W3C — Flexbox](https://www.w3.org/TR/css-flexbox-1/)
- [W3C — Grid](https://www.w3.org/TR/css-grid-1/)
- [W3C — requêtes de média](https://www.w3.org/TR/mediaqueries-5/)
