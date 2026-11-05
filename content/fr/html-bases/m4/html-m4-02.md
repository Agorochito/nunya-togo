---
{
  "id": "html-m4-02",
  "title_fr": "Intégrer des médias et des informations repliables",
  "course": "html-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "html-m4-01"
  ],
  "outcomes": [
    "Décrire la structure d’un média avec texte complémentaire.",
    "Créer et vérifier une question repliable native."
  ],
  "idea_fr": "Un média doit conserver un accès à son information ; un détail repliable garde une question explicite.",
  "analogy_fr": "Une vidéo et sa transcription offrent deux chemins vers le même contenu, comme une visite guidée et son carnet.",
  "examples": [
    {
      "code": "<video controls preload=\"none\">\n<source src=\"medias/semis.mp4\" type=\"video/mp4\">\n<track kind=\"captions\" src=\"medias/semis-fr.vtt\" srclang=\"fr\" label=\"Français\">\n</video>\n<p>Fichiers de démonstration non fournis.</p>\n<section><h2>Transcription</h2><p>Remplir un godet de terre, puis déposer une graine.</p></section>",
      "expected_output": "Structure d’un lecteur vidéo avec piste française et transcription indépendante ; les fichiers ne sont pas fournis.",
      "trace_fr": [
        "controls propose les commandes natives.",
        "track indique une piste de sous-titres.",
        "La transcription reste visible hors du lecteur."
      ],
      "inputs": []
    },
    {
      "code": "<details><summary>Faut-il apporter des outils ?</summary>\n<p>Non, les outils de cet atelier fictif sont fournis.</p>\n</details>",
      "expected_output": "Une question peut être développée pour lire sa réponse.",
      "trace_fr": [
        "summary annonce le sujet.",
        "Le paragraphe est dans details et peut être dévoilé par activation."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Confondre une piste déclarée et une piste vérifiée",
      "why_fr": "Le fichier réel n’a pas été testé.",
      "fix_fr": "Contrôle le média et ses textes avant publication."
    },
    {
      "error": "Cacher une instruction essentielle dans details",
      "why_fr": "La personne peut ne pas la découvrir.",
      "fix_fr": "Laisse les règles nécessaires visibles au moment utile."
    }
  ],
  "quiz": [
    {
      "question": "Que prouve un test trouvant track ?",
      "options": [
        "La synchronisation parfaite des sous-titres.",
        "L’existence garantie du fichier.",
        "La compréhension de toute la vidéo.",
        "La présence de la structure de piste, pas sa qualité."
      ],
      "answer": 3,
      "explanation": "Le fichier, sa synchronisation et sa pertinence exigent un contrôle supplémentaire.",
      "id": "html-m4-02-q1"
    },
    {
      "question": "Quel élément annonce une information repliable native ?",
      "options": [
        "caption dans audio",
        "label dans table",
        "summary dans details",
        "title dans video"
      ],
      "answer": 2,
      "explanation": "summary nomme le contenu que details permet de développer.",
      "id": "html-m4-02-q2"
    },
    {
      "question": "Pourquoi placer une transcription hors de video ?",
      "options": [
        "Parce que les paragraphes sont interdits.",
        "Pour qu’elle reste visible indépendamment du lecteur.",
        "Pour la transformer en image.",
        "Pour démarrer automatiquement le média."
      ],
      "answer": 1,
      "explanation": "Un navigateur peut reconnaître le lecteur sans afficher son contenu de repli, même si le média ne charge pas.",
      "id": "html-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "transcription",
      "definition": "Version textuelle du contenu pertinent d’un média."
    },
    {
      "term": "sous-titres",
      "definition": "Texte synchronisé avec un média, comprenant ici paroles et sons utiles."
    },
    {
      "term": "préchargement",
      "definition": "Chargement anticipé suggéré au navigateur."
    }
  ],
  "recap_fr": [
    "controls laisse la main à l’utilisateur.",
    "Les médias exigent une vérification de contenu.",
    "details conserve un summary explicite."
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

Le jardin souhaite expliquer une activité avec un court média et répondre à des questions fréquentes. Ajouter un lecteur n’est pas suffisant : le contenu doit rester accessible à des personnes qui ne voient pas, n’entendent pas ou ne peuvent pas lancer la lecture. Nous allons découvrir audio, video et une section de transcription, puis details pour une information complémentaire. Les fichiers cités dans les exemples sont des chemins de démonstration ; aucun média fictivement fonctionnel n’est promis.

audio et video peuvent recevoir l’attribut controls pour proposer les commandes du navigateur. source indique un fichier et peut préciser son type. Une vidéo possède aussi des informations visuelles qui doivent être rendues compréhensibles selon le contenu. Des sous-titres avec track peuvent transmettre la parole et les sons pertinents ; une transcription textuelle apporte un autre accès. Une transcription ne remplace pas automatiquement toutes les adaptations d’une vidéo, notamment lorsque l’image porte une information essentielle.

L’attribut preload est une indication de chargement, pas une garantie absolue. La valeur none peut éviter de demander le téléchargement initial d’un fichier avant que l’utilisateur ne manifeste son intention. Nous évitons autoplay : un média qui commence seul peut gêner et consommer des données. Un texte placé à l’intérieur de video comme solution de repli n’est pas nécessairement visible dans un navigateur qui reconnaît le lecteur mais ne charge pas le fichier. Un lien et une transcription placés en dehors restent donc utiles.

details contient une information que l’on peut développer. Son premier summary fournit le libellé visible qui annonce le sujet. Le navigateur propose un mécanisme natif utilisable au clavier. L’attribut open affiche le contenu dès le départ ; comme required, il est booléen. Ne cache pas dans details les seules instructions indispensables pour remplir un champ. Ce composant convient ici à une question fréquente, pas à une manière d’éviter d’écrire une explication importante.

Les exercices vérifient la structure du lecteur, les pistes et la présence d’une transcription indépendante. Ils ne prouvent ni l’existence des fichiers ni la qualité des sous-titres. C’est indiqué dans leur contrat. Fais aussi un essai manuel sur details : rejoins summary avec Tab, active-le, puis vérifie que l’information devient disponible et peut être repliée. Pour un vrai média, il faudra ensuite vérifier le fichier, la synchronisation des textes et les informations visuelles avant toute publication.

## Exemple guidé 1

```html
<video controls preload="none">
<source src="medias/semis.mp4" type="video/mp4">
<track kind="captions" src="medias/semis-fr.vtt" srclang="fr" label="Français">
</video>
<p>Fichiers de démonstration non fournis.</p>
<section><h2>Transcription</h2><p>Remplir un godet de terre, puis déposer une graine.</p></section>
```

## Exemple guidé 2

```html
<details><summary>Faut-il apporter des outils ?</summary>
<p>Non, les outils de cet atelier fictif sont fournis.</p>
</details>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
