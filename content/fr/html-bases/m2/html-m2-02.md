---
{
  "id": "html-m2-02",
  "title_fr": "Décrire les images et leur rôle",
  "course": "html-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "html-m2-01"
  ],
  "outcomes": [
    "Choisir une alternative selon le contexte.",
    "Associer une illustration, ses dimensions et sa légende."
  ],
  "idea_fr": "Le texte alternatif d’une image dépend de ce qu’elle apporte dans son contexte.",
  "analogy_fr": "Le texte alternatif est le relais oral d’une image lorsque celle-ci ne peut pas transmettre son message.",
  "examples": [
    {
      "code": "<figure>\n<img src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"240\" height=\"120\"%3E%3Crect width=\"240\" height=\"120\" fill=\"seagreen\"/%3E%3C/svg%3E' alt=\"Rectangle vert représentant la parcelle\" width=\"240\" height=\"120\">\n<figcaption>Schéma simplifié de la parcelle fictive.</figcaption>\n</figure>",
      "expected_output": "Un rectangle vert avec une légende ; l’alternative décrit sa fonction schématique.",
      "trace_fr": [
        "src contient une illustration autonome.",
        "width et height annoncent ses proportions.",
        "figcaption reste un texte visible."
      ],
      "inputs": []
    },
    {
      "code": "<h2>Bienvenue au jardin</h2>\n<img src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"240\" height=\"120\"%3E%3Crect width=\"240\" height=\"120\" fill=\"seagreen\"/%3E%3C/svg%3E' alt=\"\" width=\"240\" height=\"120\">\n<p>Le motif vert est seulement décoratif.</p>",
      "expected_output": "L’image est présente mais son alternative est vide car elle n’ajoute pas d’information.",
      "trace_fr": [
        "Le contexte dit que le motif décore.",
        "alt vide évite de répéter une description sans utilité."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Supprimer alt sur un décor",
      "why_fr": "Absence et alternative vide sont confondues.",
      "fix_fr": "Conserve alt=\"\"."
    },
    {
      "error": "Décrire chaque détail",
      "why_fr": "Une description excessive masque le message.",
      "fix_fr": "Sélectionne l’information nécessaire dans ce contexte."
    }
  ],
  "quiz": [
    {
      "question": "Que signifie alt=\"\" pour une image décorative ?",
      "options": [
        "Le fichier est forcément vide.",
        "L’image devient un lien.",
        "La légende est supprimée.",
        "Son contenu ne doit pas ajouter de texte alternatif."
      ],
      "answer": 3,
      "explanation": "L’image reste visible ; l’alternative vide évite un contenu vocal inutile.",
      "id": "html-m2-02-q1"
    },
    {
      "question": "Une légende visible remplace-t-elle toujours alt ?",
      "options": [
        "Oui, si elle contient trois mots.",
        "Non, car les légendes sont interdites.",
        "Non, il faut encore examiner l’information visuelle utile.",
        "Oui, sans exception."
      ],
      "answer": 2,
      "explanation": "La légende peut donner un contexte sans transmettre ce que l’image apporte.",
      "id": "html-m2-02-q2"
    },
    {
      "question": "Quelle alternative convient à un plan d’accès informatif ?",
      "options": [
        "Une phrase sans rapport avec l’accès.",
        "Une description de l’information d’accès utile.",
        "Le nom technique du fichier.",
        "Toujours le mot Photo."
      ],
      "answer": 1,
      "explanation": "Le contexte et le besoin de l’utilisateur guident la description.",
      "id": "html-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "alternative textuelle",
      "definition": "Texte qui transmet la fonction ou l’information d’une image."
    },
    {
      "term": "légende",
      "definition": "Texte visible associé à une illustration."
    },
    {
      "term": "décoratif",
      "definition": "Qui contribue à l’apparence sans ajouter d’information utile."
    }
  ],
  "recap_fr": [
    "src indique la ressource.",
    "alt dépend du rôle de l’image.",
    "Une légende visible et une alternative sont distinctes."
  ],
  "tags": [
    "html",
    "m2",
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

Une photographie peut montrer l’accès au jardin, un schéma peut expliquer un geste et un motif peut simplement décorer une page. Ces images n’ont pas besoin du même texte alternatif. L’élément img intègre une ressource définie par src. Son attribut alt fournit une alternative textuelle. Lorsque l’image ne s’affiche pas ou qu’une personne utilise certains outils de lecture, cette alternative aide à conserver l’information utile.

Pour une image informative, décris sa contribution au contexte. Si le paragraphe explique comment reconnaître l’entrée, « Portail vert, à gauche de la bibliothèque » est plus utile que « image » ou un nom de fichier. Il ne faut pas réciter chaque détail visible. Le bon choix dépend de la tâche du lecteur. Si la même information est déjà donnée juste à côté et que l’image n’ajoute rien, une alternative vide peut éviter une répétition inutile.

Une image purement décorative reçoit alt="". Cela est différent de supprimer l’attribut : une absence d’alternative laisse sa fonction indéterminée et peut conduire à entendre un nom de ressource peu compréhensible. Si une image constitue à elle seule le contenu d’un lien, son alternative doit annoncer la destination ou l’action utile. Dans ce cours, privilégie des liens textuels explicites ; ils sont plus simples à relire et à vérifier.

Les attributs width et height indiquent des dimensions en nombres de pixels CSS et peuvent aider le navigateur à réserver la place de l’image. Ils ne remplacent pas les règles d’adaptation que nous verrons en CSS. figure regroupe une illustration et, si nécessaire, sa légende figcaption. La légende est visible par tous ; elle ne remplace pas automatiquement alt. Elle peut préciser la provenance ou le contexte, tandis que l’alternative transmet l’information visuelle indispensable.

Les exercices utilisent une petite illustration vectorielle incluse dans l’adresse de la ressource : aucun téléchargement ni droit sur une photographie extérieure n’est nécessaire. L’objectif est de choisir les attributs et les relations, pas de produire une belle image. Les contrôles vérifient src, alt et la structure annoncée. Complète-les par une relecture sans image : peux-tu encore comprendre le passage ? Une alternative peut être techniquement présente et pédagogiquement mauvaise. Justifie donc chaque choix à partir de ce que le lecteur doit apprendre.

## Exemple guidé 1

```html
<figure>
<img src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="120"%3E%3Crect width="240" height="120" fill="seagreen"/%3E%3C/svg%3E' alt="Rectangle vert représentant la parcelle" width="240" height="120">
<figcaption>Schéma simplifié de la parcelle fictive.</figcaption>
</figure>
```

## Exemple guidé 2

```html
<h2>Bienvenue au jardin</h2>
<img src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="120"%3E%3Crect width="240" height="120" fill="seagreen"/%3E%3C/svg%3E' alt="" width="240" height="120">
<p>Le motif vert est seulement décoratif.</p>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
