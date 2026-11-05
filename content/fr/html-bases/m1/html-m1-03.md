---
{
  "id": "html-m1-03",
  "title_fr": "Relier pages et rubriques avec des liens",
  "course": "html-bases",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "html-m1-02"
  ],
  "outcomes": [
    "Créer des liens absolus, relatifs et internes.",
    "Vérifier une destination et son texte."
  ],
  "idea_fr": "Un lien associe un texte compréhensible à une destination indiquée par href.",
  "analogy_fr": "Le lien est un panneau directionnel : son texte annonce la destination et son adresse indique le chemin.",
  "examples": [
    {
      "code": "<p><a href=\"programme.html\">Consulter le programme</a></p>\n<p><a href=\"https://example.org/\">Découvrir le site de démonstration</a></p>",
      "expected_output": "Deux liens : un vers une page relative et un vers une adresse absolue.",
      "trace_fr": [
        "Le navigateur affiche le texte entre les balises a.",
        "Il conserve chaque href comme destination à résoudre lors de la navigation."
      ],
      "inputs": []
    },
    {
      "code": "<a href=\"#horaires\">Voir les horaires</a>\n<h2 id=\"horaires\">Horaires des ateliers</h2>\n<p>Chaque samedi à 9 h.</p>",
      "expected_output": "Le lien vise le titre identifié par horaires dans cette page.",
      "trace_fr": [
        "Le fragment #horaires correspond à id=\"horaires\".",
        "La cible garde son rôle de titre h2."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Mettre src sur a",
      "why_fr": "Le nom d’attribut d’une image est utilisé pour un lien.",
      "fix_fr": "Utilise href."
    },
    {
      "error": "Répéter le même id",
      "why_fr": "Plusieurs cibles deviennent ambiguës.",
      "fix_fr": "Attribue un identifiant unique à chaque cible."
    }
  ],
  "quiz": [
    {
      "question": "Quel attribut contient la destination d’un lien ?",
      "options": [
        "src",
        "lang",
        "charset",
        "href"
      ],
      "answer": 3,
      "explanation": "href associe l’élément a à sa destination ; src sera utilisé pour certaines ressources intégrées.",
      "id": "html-m1-03-q1"
    },
    {
      "question": "Quelle cible correspond à href=\"#contact\" ?",
      "options": [
        "N’importe quel paragraphe.",
        "Une classe contact seulement.",
        "Un élément portant id=\"contact\".",
        "Un élément portant id=\"#contact\"."
      ],
      "answer": 2,
      "explanation": "Le dièse introduit le fragment dans l’adresse ; la valeur de l’identifiant ne le contient pas.",
      "id": "html-m1-03-q2"
    },
    {
      "question": "Quel texte de lien aide le plus une lecture isolée ?",
      "options": [
        "Plus",
        "Consulter les horaires des ateliers",
        "Ici",
        "Clique"
      ],
      "answer": 1,
      "explanation": "Le texte annonce le contenu de la destination sans dépendre d’une phrase voisine.",
      "id": "html-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "URL",
      "definition": "Adresse d’une ressource."
    },
    {
      "term": "fragment",
      "definition": "Partie d’une adresse qui peut viser un emplacement du document."
    },
    {
      "term": "focus",
      "definition": "Position active de navigation au clavier."
    }
  ],
  "recap_fr": [
    "a et href construisent un lien.",
    "Un fragment correspond à un identifiant unique.",
    "Le texte annonce la destination."
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

La page du jardin doit conduire vers un programme, une rubrique d’inscription et une information extérieure. Un lien HTML s’écrit avec l’élément a et un attribut href. Le texte placé entre les balises doit annoncer ce que l’utilisateur trouvera. « Voir les horaires » est plus utile que « Clique ici », surtout lorsqu’une personne parcourt uniquement la liste des liens avec une technologie d’assistance.

La destination peut être une adresse absolue, comme https://example.org/ateliers, ou une adresse relative, comme programme.html. Une adresse absolue indique notamment le protocole et le domaine. Une adresse relative se résout depuis l’adresse du document courant. Si une page est déplacée dans un autre dossier, le résultat peut changer. Un chemin qui commence par une barre oblique part de la racine du site ; il ne désigne pas automatiquement le dossier contenant ton fichier.

Pour aller vers une partie de la page, donne un identifiant unique à l’élément cible : id="inscription". Le lien href="#inscription" demande au navigateur de rejoindre cette cible. Le signe dièse appartient au fragment de l’adresse. Il ne fait pas partie de la valeur de id. Choisis des identifiants courts, stables et sans espaces. Deux éléments portant le même identifiant rendent les références ambiguës et compliquent la navigation.

Un lien permet de naviguer ; un bouton déclenche une action dans l’interface. Tu découvriras les boutons avec les formulaires. Un texte qui ressemble à un lien mais ne possède pas de destination n’offre pas le même service. Par défaut, un vrai lien peut recevoir le focus au clavier et être activé avec Entrée. Le soulignement et le focus visibles aident à le repérer ; nous apprendrons en CSS à préserver ces indices même en changeant les couleurs.

Ouvrir un nouvel onglet n’est pas nécessaire pour chaque site externe. Pour cette initiation, garde le comportement habituel afin que l’utilisateur décide lui-même de sa navigation. Dans l’atelier isolé, les destinations extérieures ne servent pas à collecter des informations et peuvent être bloquées. Les contrôles vérifient les adresses et les cibles, pas la disponibilité d’un serveur. Après les tests, fais une relecture humaine : les textes de liens se comprennent-ils sans la phrase qui les entoure ? Le lien interne mène-t-il à la bonne rubrique ?

## Exemple guidé 1

```html
<p><a href="programme.html">Consulter le programme</a></p>
<p><a href="https://example.org/">Découvrir le site de démonstration</a></p>
```

## Exemple guidé 2

```html
<a href="#horaires">Voir les horaires</a>
<h2 id="horaires">Horaires des ateliers</h2>
<p>Chaque samedi à 9 h.</p>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
