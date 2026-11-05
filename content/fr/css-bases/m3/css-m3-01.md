---
{
  "id": "css-m3-01",
  "title_fr": "Aligner une rangée avec Flexbox",
  "course": "css-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "css-m2-03"
  ],
  "outcomes": [
    "Organiser une navigation avec Flexbox.",
    "Expliquer axes, espacement et retour à la ligne."
  ],
  "idea_fr": "Flexbox organise les enfants directs d’un conteneur selon un axe principal et un axe transversal.",
  "analogy_fr": "Une rangée de panneaux sur un rail peut répartir les espaces et revenir sur une nouvelle ligne quand la place manque.",
  "examples": [
    {
      "code": ".navigation { display:flex; gap:16px; align-items:center; flex-wrap:wrap; }",
      "expected_output": "Les liens sont disposés en rangée, espacés de 16px, avec retour à la ligne possible.",
      "trace_fr": [
        "display:flex agit sur les liens enfants directs.",
        "gap sépare les voisins.",
        "wrap autorise plusieurs lignes."
      ],
      "inputs": [],
      "fixture_html": "<nav class=\"navigation\" aria-label=\"Ateliers\"><a href=\"#semis\">Semis</a><a href=\"#compost\">Compost</a><a href=\"#contact\">Contact</a></nav><div class=\"fiches\"><article class=\"carte\">Semis</article><article class=\"carte\">Compost</article><article class=\"carte\">Arrosage</article></div>"
    },
    {
      "code": ".fiches { display:flex; gap:16px; flex-wrap:wrap; }\n.fiches > .carte { flex:1 1 160px; }",
      "expected_output": "Les trois cartes partagent l’espace et peuvent revenir à la ligne selon la place.",
      "trace_fr": [
        "La base de 160px sert au calcul de flexibilité.",
        "Les facteurs 1 autorisent agrandissement et rétrécissement."
      ],
      "inputs": [],
      "fixture_html": "<nav class=\"navigation\" aria-label=\"Ateliers\"><a href=\"#semis\">Semis</a><a href=\"#compost\">Compost</a><a href=\"#contact\">Contact</a></nav><div class=\"fiches\"><article class=\"carte\">Semis</article><article class=\"carte\">Compost</article><article class=\"carte\">Arrosage</article></div>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre display:flex sur chaque lien seulement",
      "why_fr": "Le groupe à organiser n’est pas ciblé.",
      "fix_fr": "Active le système sur leur conteneur."
    },
    {
      "error": "Confondre gap et space-between",
      "why_fr": "Un espace fixe et une distribution de place sont mélangés.",
      "fix_fr": "Choisis selon l’effet demandé."
    }
  ],
  "quiz": [
    {
      "question": "Quels éléments deviennent flexibles après display:flex ?",
      "options": [
        "Tous les éléments du document.",
        "Seulement le conteneur lui-même.",
        "Les métadonnées.",
        "Les enfants directs du conteneur."
      ],
      "answer": 3,
      "explanation": "Flexbox organise d’abord les enfants directs, pas tous les descendants.",
      "id": "css-m3-01-q1"
    },
    {
      "question": "Que règle justify-content ?",
      "options": [
        "La police.",
        "Les attributs HTML.",
        "La répartition sur l’axe principal.",
        "Toujours l’axe vertical."
      ],
      "answer": 2,
      "explanation": "L’axe dépend notamment de flex-direction ; il faut le nommer avant de régler l’alignement.",
      "id": "css-m3-01-q2"
    },
    {
      "question": "Pourquoi préserver l’ordre logique HTML ?",
      "options": [
        "Pour remplacer les labels.",
        "Le clavier et la lecture doivent suivre une séquence compréhensible.",
        "Pour interdire toute couleur.",
        "Pour empêcher les retours à la ligne."
      ],
      "answer": 1,
      "explanation": "Une réorganisation purement visuelle peut diverger de l’ordre de navigation ou de lecture.",
      "id": "css-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "conteneur flexible",
      "definition": "Élément sur lequel Flexbox est activé."
    },
    {
      "term": "axe principal",
      "definition": "Direction dans laquelle les éléments flexibles sont distribués."
    },
    {
      "term": "retour à la ligne",
      "definition": "Passage sur une nouvelle ligne quand la disposition l’autorise."
    }
  ],
  "recap_fr": [
    "Flexbox agit sur les enfants directs.",
    "Les axes dépendent de la direction.",
    "L’ordre HTML reste cohérent."
  ],
  "tags": [
    "css",
    "m3",
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

La navigation du jardin contient trois liens. Nous voulons les placer en rangée, avec un espace régulier, sans utiliser des espaces tapés dans le HTML. Flexbox est un système de disposition adapté à l’organisation sur un axe principal. Il s’active sur un conteneur avec display:flex. Ses enfants directs deviennent des éléments flexibles. Les petits-enfants ne reçoivent pas automatiquement ce statut : il faut toujours identifier le conteneur et les éléments réellement disposés.

Avec flex-direction:row dans notre écriture de gauche à droite, l’axe principal suit la rangée. flex-direction:column organise une colonne. justify-content répartit les éléments le long de l’axe principal ; align-items agit sur l’axe transversal. Les expressions « horizontal » et « vertical » ne décrivent donc pas universellement ces propriétés. Quand la direction change, il faut relire les axes. Commence par nommer l’axe principal avant de choisir un alignement.

gap crée un espace entre les éléments, sans ajouter une marge extérieure autour de tout le groupe. Un gap de 16px sépare les liens voisins. justify-content:space-between répartit l’espace disponible entre les éléments ; ce mécanisme dépend de la place restante et n’est pas une taille d’écart fixe. Les deux propriétés répondent à des besoins différents. Il est souvent plus simple de commencer avec gap, puis d’ajouter une répartition si la composition le demande.

Les éléments peuvent manquer de place. flex-wrap:wrap autorise leur passage sur plusieurs lignes. Une valeur flex comme 1 1 160px indique ici une possibilité d’agrandir, de rétrécir et une base de départ. Cette base n’est pas une largeur garantie dans toutes les circonstances. La taille minimale automatique du contenu peut aussi limiter le rétrécissement ; min-width:0 est parfois nécessaire dans des compositions plus complexes. Nous gardons des textes courts pour apprendre le mécanisme avant ces cas avancés.

Les exercices vérifient le conteneur, les axes, les espaces et quelques paramètres des enfants. Ils ne modifient pas l’ordre logique du HTML. Évite d’utiliser order pour maquiller une structure mal organisée : l’ordre visuel peut alors diverger de la lecture et du clavier. Après les tests, réduis la largeur et parcours les liens. Une navigation qui revient sur plusieurs lignes tout en gardant son ordre reste souvent plus utile qu’une rangée forcée qui déborde.

## Exemple guidé 1

```css
.navigation { display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.fiches { display:flex; gap:16px; flex-wrap:wrap; }
.fiches > .carte { flex:1 1 160px; }
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
