---
{
  "id": "css-m4-02",
  "title_fr": "Réduire les mouvements et faire une revue visuelle",
  "course": "css-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "css-m4-01"
  ],
  "outcomes": [
    "Décrire une transition limitée et son alternative réduite.",
    "Effectuer une revue de contenu long et de focus."
  ],
  "idea_fr": "Les effets visuels restent facultatifs et ne doivent pas empêcher l’accès aux informations.",
  "analogy_fr": "Une transition est un accompagnement discret, pas un passage obligé pour atteindre le contenu.",
  "examples": [
    {
      "code": ".carte { background-color:white; transition:background-color 200ms ease; }\n.carte:hover { background-color:#eef4ff; }\n@media (prefers-reduced-motion:reduce) { .carte { transition:none; } }",
      "expected_output": "Le survol peut adoucir le fond ; la préférence de réduction supprime cette transition.",
      "trace_fr": [
        "La règle de base définit la propriété et la durée.",
        "Le survol fournit une autre valeur de fond.",
        "La condition retire une animation non essentielle sans retirer le contenu."
      ],
      "inputs": [],
      "fixture_html": "<article class=\"carte\"><h2>Semis</h2><p class=\"description\">Atelier fictif de découverte des graines.</p><a class=\"action\" href=\"#details\">Voir les détails</a></article><p id=\"details\">Informations textuelles toujours disponibles.</p>"
    },
    {
      "code": ".description { overflow-wrap:anywhere; }\n.action:focus { outline:3px solid navy; outline-offset:2px; }",
      "expected_output": "Un texte très long peut être coupé si nécessaire ; le lien conserve un repère de focus.",
      "trace_fr": [
        "La coupure évite certains débordements sans supprimer le texte.",
        "Le contour indique l’action active au clavier."
      ],
      "inputs": [],
      "fixture_html": "<article class=\"carte\"><h2>Semis</h2><p class=\"description\">Atelier fictif de découverte des graines.</p><a class=\"action\" href=\"#details\">Voir les détails</a></article><p id=\"details\">Informations textuelles toujours disponibles.</p>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Animer all sans intention",
      "why_fr": "Des propriétés futures reçoivent un effet imprévu.",
      "fix_fr": "Nomme les propriétés concernées."
    },
    {
      "error": "Valider reduce sans l’avoir activé",
      "why_fr": "La condition n’a pas été observée.",
      "fix_fr": "Émule-la en test et réalise un contrôle manuel."
    }
  ],
  "quiz": [
    {
      "question": "transition suffit-il à créer un changement de fond ?",
      "options": [
        "Oui, il invente une couleur.",
        "Oui, il déplace le HTML.",
        "Oui, il envoie le formulaire.",
        "Non, il faut aussi deux états avec des valeurs différentes."
      ],
      "answer": 3,
      "explanation": "La transition décrit le passage ; elle ne fournit pas à elle seule l’état d’arrivée.",
      "id": "css-m4-02-q1"
    },
    {
      "question": "Que faut-il conserver en réduisant les mouvements ?",
      "options": [
        "Un survol obligatoire.",
        "Les erreurs cachées.",
        "Le contenu et les actions utiles.",
        "Seulement une page vide."
      ],
      "answer": 2,
      "explanation": "La préférence adapte la présentation sans retirer l’information ni la fonctionnalité.",
      "id": "css-m4-02-q2"
    },
    {
      "question": "Pourquoi combiner tests calculés et revue humaine ?",
      "options": [
        "Le contenu est toujours identique.",
        "Les propriétés attendues ne prouvent pas toute la lisibilité et l’usage.",
        "La revue remplace forcément toute structure.",
        "Les tests ne peuvent jamais rien vérifier."
      ],
      "answer": 1,
      "explanation": "Les deux méthodes apportent des observations complémentaires et leurs limites doivent être explicites.",
      "id": "css-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "transition",
      "definition": "Interpolation entre deux valeurs d’une propriété lors d’un changement."
    },
    {
      "term": "préférence de réduction",
      "definition": "Choix de l’environnement demandant moins de mouvements."
    },
    {
      "term": "revue visuelle",
      "definition": "Examen du rendu dans plusieurs situations d’usage."
    }
  ],
  "recap_fr": [
    "L’effet reste facultatif.",
    "La préférence adapte le mouvement sans retirer l’information.",
    "La revue précise ce qui a été réellement vérifié."
  ],
  "tags": [
    "css",
    "m4",
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

Une petite transition peut rendre un changement d’état plus doux. Elle peut aussi distraire, gêner certaines personnes ou allonger inutilement une action. Avant d’ajouter un effet, demande-toi quelle information il apporte. La fiche d’atelier doit rester lisible et le lien doit rester utilisable même sans aucun mouvement. Dans cette leçon, nous travaillons une transition de couleur simple et une revue qui examine le résultat au-delà des propriétés calculées.

transition décrit comment une propriété peut évoluer entre deux valeurs. Avec transition:background-color 200ms ease, une modification de fond peut être interpolée pendant deux cents millisecondes. Cette déclaration ne change pas le fond à elle seule : il faut un état de départ et un état d’arrivée. Éviter transition:all rend l’intention plus précise et limite les effets inattendus lorsque d’autres propriétés changent. Nous ne déplaçons pas automatiquement le texte ou le formulaire.

La requête prefers-reduced-motion:reduce détecte une préférence de réduction des mouvements signalée par l’environnement. Un bloc conditionnel peut alors supprimer une transition non indispensable. Ce choix ne doit pas supprimer l’information finale ni désactiver les actions. Pour un effet décoratif simple, transition:none dans ce contexte conserve le contenu sans interpolation. La préférence n’exige pas que tout changement visuel disparaisse ; il faut distinguer le mouvement inutile et l’information nécessaire.

Une revue visuelle examine ensuite plusieurs situations : petite largeur, texte agrandi, contenu long, focus au clavier et thème éventuel. Un test trouvant display:grid ou une couleur attendue ne prouve pas que le texte peut être lu confortablement. Vérifie aussi les débordements, les contours coupés et les messages qui dépendent uniquement d’une couleur. Pour une longue adresse ou un mot sans espaces, overflow-wrap:anywhere peut permettre une coupure ; il ne faut pas masquer le contenu pour cacher le problème.

Les vérifications ordinaires de l’atelier portent sur l’état de base. Les conditions liées aux préférences sont aussi fournies pour la revue technique, mais leur validation dans l’aperçu dépend de l’environnement. Active manuellement la réduction des mouvements pour compléter l’essai, puis reviens au réglage habituel. Note ce que tu as réellement vérifié : une préférence émule une situation, elle ne résume pas l’expérience de toutes les personnes. Le projet final reprendra cette démarche de tests automatiques et de revue humaine.

## Exemple guidé 1

```css
.carte { background-color:white; transition:background-color 200ms ease; }
.carte:hover { background-color:#eef4ff; }
@media (prefers-reduced-motion:reduce) { .carte { transition:none; } }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.description { overflow-wrap:anywhere; }
.action:focus { outline:3px solid navy; outline-offset:2px; }
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
