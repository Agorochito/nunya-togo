---
{
  "id": "htmi-m1-01",
  "title_fr": "Nommer les régions et préparer un lien d’évitement",
  "course": "html-intermediaire",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [
    "html-m4-03"
  ],
  "outcomes": [
    "Nommer les régions utiles sans multiplier les repères inutiles.",
    "Relier un lien d’évitement initial à un contenu principal identifiable."
  ],
  "idea_fr": "La structure fournit des destinations compréhensibles pour parcourir la page autrement que ligne après ligne.",
  "analogy_fr": "Un bâtiment se parcourt grâce à ses entrées et panneaux ; nommer chaque chaise comme une salle brouillerait le plan.",
  "examples": [
    {
      "code": "<a id=\"evitement\" href=\"#contenu\">Aller au contenu principal</a>\n<header><p>Club Baobab — démonstration</p></header>\n<nav aria-label=\"Principale\"><a href=\"#ateliers\">Ateliers</a></nav>\n<main id=\"contenu\" tabindex=\"-1\">\n  <h1>Les rencontres du club</h1>\n  <h2 id=\"ateliers\">Ateliers</h2>\n  <p>Lecture et jardinage fictifs.</p>\n</main>",
      "expected_output": "Un lien initial annonce la destination principale ; la navigation précède un main identifiable.",
      "inputs": [],
      "trace_fr": [
        "Le premier lien possède une destination locale #contenu.",
        "Le nav est nommé Principale, indépendamment de son apparence.",
        "Le main possède l’id ciblé et tabindex=-1 pour une cible de focus hors de l’ordre normal.",
        "Le texte et le h1 annoncent le sujet après la navigation."
      ],
      "browser_test": {
        "description_fr": "Lien et cible principaux",
        "checks": [
          {
            "selector": "body > a:first-child",
            "attributes": {
              "id": "evitement",
              "href": "#contenu"
            },
            "textIncludes": "Aller au contenu principal"
          },
          {
            "selector": "nav",
            "attributes": {
              "aria-label": "Principale"
            }
          },
          {
            "selector": "main#contenu",
            "attributes": {
              "tabindex": "-1"
            }
          },
          {
            "selector": "main",
            "count": 1
          }
        ]
      }
    },
    {
      "code": "<main aria-labelledby=\"titre-page\">\n  <h1 id=\"titre-page\">Préparer une rencontre</h1>\n  <p>Choisir une activité fictive.</p>\n</main>\n<aside aria-labelledby=\"titre-aide\">\n  <h2 id=\"titre-aide\">Aide pour la préparation</h2>\n  <nav aria-label=\"Ressources de préparation\">\n    <a href=\"#materiel\">Liste du matériel</a>\n  </nav>\n  <p id=\"materiel\">Prévoir des cahiers de démonstration.</p>\n</aside>",
      "expected_output": "Le contenu principal et les conseils possèdent chacun un nom issu d’un titre visible.",
      "inputs": [],
      "trace_fr": [
        "Le main référence titre-page avec aria-labelledby.",
        "Le h1 portant cet id fournit le nom visible.",
        "L’aside est nommé par son h2, sans devenir un second main.",
        "La navigation des ressources possède un nom lié à son objectif."
      ],
      "browser_test": {
        "description_fr": "Deux régions de rôles distincts",
        "checks": [
          {
            "selector": "main",
            "attributes": {
              "aria-labelledby": "titre-page"
            }
          },
          {
            "selector": "main > h1#titre-page",
            "textIncludes": "Préparer une rencontre"
          },
          {
            "selector": "aside",
            "attributes": {
              "aria-labelledby": "titre-aide"
            }
          },
          {
            "selector": "aside > h2#titre-aide",
            "textIncludes": "Aide pour la préparation"
          },
          {
            "selector": "aside nav",
            "attributes": {
              "aria-label": "Ressources de préparation"
            }
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Multiplier les main",
      "why_fr": "Deux zones visibles se présentent comme principales.",
      "fix_fr": "Garde un main et utilise aside pour l’aide complémentaire."
    },
    {
      "error": "Référencer un id absent",
      "why_fr": "La région ne reçoit pas le nom annoncé.",
      "fix_fr": "Vérifie chaque relation aria-labelledby."
    },
    {
      "error": "Cacher le raccourci sans stratégie",
      "why_fr": "Le lien peut devenir introuvable.",
      "fix_fr": "Commence par le laisser visible et examine son usage au clavier."
    }
  ],
  "quiz": [
    {
      "question": "Quel est l’objectif du lien d’évitement ?",
      "options": [
        "Masquer tout le texte de navigation.",
        "Remplacer tous les titres par un menu.",
        "Déclarer automatiquement la page conforme à toutes les règles.",
        "Rejoindre rapidement le contenu principal après des blocs répétés."
      ],
      "answer": 3,
      "explanation": "Le lien fournit un trajet utile ; sa présence n’est pas une certification.",
      "id": "htmi-m1-01-q1"
    },
    {
      "question": "Que doit désigner aria-labelledby=\"titre-aide\" ?",
      "options": [
        "Une page distante.",
        "Un texte arbitraire qui sera affiché automatiquement.",
        "L’id d’un élément qui fournit le nom, ici un titre visible.",
        "Une classe CSS à créer."
      ],
      "answer": 2,
      "explanation": "La relation dépend de l’élément réellement référencé.",
      "id": "htmi-m1-01-q2"
    },
    {
      "question": "À quoi sert tabindex=\"-1\" sur la cible dans ces exemples ?",
      "options": [
        "Masquer main aux technologies d’assistance.",
        "Permettre sa prise de focus sans l’ajouter à la tabulation ordinaire.",
        "Interdire tout focus sur la cible.",
        "La placer avant tous les liens dans Tab."
      ],
      "answer": 1,
      "explanation": "Une cible programmatique peut être hors de l’ordre de tabulation normal.",
      "id": "htmi-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "région",
      "definition": "Grande zone structurante identifiable dans la page."
    },
    {
      "term": "nom accessible",
      "definition": "Nom exposé pour identifier une région ou un contrôle."
    },
    {
      "term": "lien d’évitement",
      "definition": "Lien initial permettant de sauter des blocs répétés."
    },
    {
      "term": "cible de focus",
      "definition": "Élément qui peut recevoir le point de poursuite du parcours clavier."
    }
  ],
  "recap_fr": [
    "Nommer les régions utiles sans multiplier les repères inutiles.",
    "Relier un lien d’évitement initial à un contenu principal identifiable.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "région",
    "nom accessible",
    "lien d’évitement",
    "cible de focus"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "environment_fr": "Document HTML réel, analysé et rendu dans une iframe isolée. Les contrôles inspectent éléments, textes et attributs. Les scripts, médias distants, envois de formulaire et activations de liens sont bloqués dans cet aperçu ; aucun service ni collecte réelle.",
  "references": [
    {
      "title": "W3C WAI — Régions de page",
      "url": "https://www.w3.org/WAI/tutorials/page-structure/regions/"
    },
    {
      "title": "W3C — Technique G1, lien vers le contenu",
      "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1"
    },
    {
      "title": "WHATWG — Sections et régions HTML",
      "url": "https://html.spec.whatwg.org/multipage/sections.html"
    }
  ],
  "sources": [
    {
      "title": "W3C WAI — Régions de page",
      "url": "https://www.w3.org/WAI/tutorials/page-structure/regions/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "W3C — Technique G1, lien vers le contenu",
      "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    },
    {
      "title": "WHATWG — Sections et régions HTML",
      "url": "https://html.spec.whatwg.org/multipage/sections.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une page associative peut commencer par un en-tête et plusieurs liens répétés avant son contenu propre. Une personne qui parcourt tout au clavier risque de retrouver ces éléments à chaque visite. Un lien d’évitement placé au début propose une destination directe vers le contenu principal. Son texte doit annoncer cette action, et son href doit correspondre à un identifiant réellement présent, par exemple href="#contenu" vers main id="contenu".

Le lien reste visible dans nos exercices. Le masquer n’est pas nécessaire pour apprendre la relation et risquerait de le rendre introuvable. La cible main reçoit tabindex="-1" : elle peut ainsi être ciblée par le focus sans s’ajouter à l’ordre ordinaire des tabulations. Dans un document autonome, on vérifie aussi qu’activer le lien place effectivement la poursuite du parcours au bon endroit. Les attributs seuls ne prouvent pas toute cette expérience.

Les régions HTML apportent d’autres raccourcis aux technologies d’assistance. main représente le contenu principal ; nav identifie un groupe important de liens de navigation ; aside contient une information complémentaire. Un header ou un footer au niveau du document peut aussi fournir un repère. Leur rôle dépend de leur contexte : un header placé dans un article décrit cet article, pas forcément l’en-tête global de toute la page.

Quand deux navigations servent des besoins différents, leurs noms doivent permettre de les distinguer. aria-label="Principale" nomme directement une navigation. aria-labelledby="titre-aide" peut nommer une région à partir d’un titre visible portant cet id. Cette seconde relation garde le nom et le texte affiché liés. Vérifie chaque référence : une valeur qui ne correspond à aucun identifiant ne fournit pas le nom prévu.

Préfère l’élément natif qui exprime le besoin. Ajouter role="main" à une autre boîte alors qu’un main existe déjà crée une concurrence inutile. Un document de cette leçon possède un seul contenu principal visible ; des conseils deviennent un aside, pas un deuxième main. Toutes les boîtes de décoration n’ont pas à devenir des régions nommées : trop de destinations nuisent à la compréhension du plan.

Lis le premier exemple comme un trajet : lien initial, navigation, puis cible principale. Dans le second, observe que le nom des conseils vient de leur titre visible et que leur navigation a un objectif distinct. Les liens restent locaux et les textes décrivent un club fictif. Aucun script ou service n’est nécessaire pour construire ces relations.

L’aperçu pédagogique inspecte la structure et neutralise les activations de liens ; il ne simule pas une navigation complète. Les tests vérifient donc noms, cibles et unicité. Pour une revue d’usage dans un document autonome, complète ces contrôles par le clavier et une lecture des régions. Ce travail vérifie une décision de structure précise ; il ne certifie pas à lui seul l’accessibilité entière du document.

## Exemple guidé 1

```html
<a id="evitement" href="#contenu">Aller au contenu principal</a>
<header><p>Club Baobab — démonstration</p></header>
<nav aria-label="Principale"><a href="#ateliers">Ateliers</a></nav>
<main id="contenu" tabindex="-1">
  <h1>Les rencontres du club</h1>
  <h2 id="ateliers">Ateliers</h2>
  <p>Lecture et jardinage fictifs.</p>
</main>
```

Résultat attendu : Un lien initial annonce la destination principale ; la navigation précède un main identifiable.

Trace :

- Le premier lien possède une destination locale #contenu.
- Le nav est nommé Principale, indépendamment de son apparence.
- Le main possède l’id ciblé et tabindex=-1 pour une cible de focus hors de l’ordre normal.
- Le texte et le h1 annoncent le sujet après la navigation.

## Exemple guidé 2

```html
<main aria-labelledby="titre-page">
  <h1 id="titre-page">Préparer une rencontre</h1>
  <p>Choisir une activité fictive.</p>
</main>
<aside aria-labelledby="titre-aide">
  <h2 id="titre-aide">Aide pour la préparation</h2>
  <nav aria-label="Ressources de préparation">
    <a href="#materiel">Liste du matériel</a>
  </nav>
  <p id="materiel">Prévoir des cahiers de démonstration.</p>
</aside>
```

Résultat attendu : Le contenu principal et les conseils possèdent chacun un nom issu d’un titre visible.

Trace :

- Le main référence titre-page avec aria-labelledby.
- Le h1 portant cet id fournit le nom visible.
- L’aside est nommé par son h2, sans devenir un second main.
- La navigation des ressources possède un nom lié à son objectif.

## Vérifier et expliquer

Inspecte les relations du document et relis ses intitulés. Dans un document autonome, examine aussi le clavier et les destinations ; l’aperçu bloque les activations de liens.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [W3C WAI — Régions de page](https://www.w3.org/WAI/tutorials/page-structure/regions/)
- [W3C — Technique G1, lien vers le contenu](https://www.w3.org/WAI/WCAG22/Techniques/general/G1)
- [WHATWG — Sections et régions HTML](https://html.spec.whatwg.org/multipage/sections.html)
