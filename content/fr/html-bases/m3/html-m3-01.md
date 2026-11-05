---
{
  "id": "html-m3-01",
  "title_fr": "Relier chaque champ à un libellé",
  "course": "html-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "html-m2-03"
  ],
  "outcomes": [
    "Associer explicitement un label à un contrôle.",
    "Distinguer id, name et type."
  ],
  "idea_fr": "Un champ compréhensible possède un libellé associé et un type adapté à la donnée demandée.",
  "analogy_fr": "Le libellé est l’étiquette d’un récipient : il reste utile même quand ce récipient est rempli.",
  "examples": [
    {
      "code": "<form>\n<p><label for=\"prenom\">Prénom</label><input id=\"prenom\" name=\"prenom\" type=\"text\"></p>\n<p><label for=\"courriel\">Adresse de contact</label><input id=\"courriel\" name=\"courriel\" type=\"email\"></p>\n</form>",
      "expected_output": "Deux champs dont les libellés visibles sont associés aux contrôles.",
      "trace_fr": [
        "for=\"prenom\" vise id=\"prenom\".",
        "Le type email décrit la forme attendue pour le contact.",
        "name désigne les futures données du formulaire."
      ],
      "inputs": []
    },
    {
      "code": "<form>\n<label for=\"contact\">Adresse de contact</label>\n<input type=\"email\" id=\"contact\" name=\"contact\" placeholder=\"exemple@example.org\">\n<p>Utilise une adresse fictive dans cet exercice.</p>\n</form>",
      "expected_output": "Le libellé reste visible même lorsque le texte indicatif disparaît pendant la saisie.",
      "trace_fr": [
        "placeholder donne un exemple.",
        "Le nom visible reste dans label.",
        "Le paragraphe précise la règle de démonstration."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Faire correspondre for à name",
      "why_fr": "La relation explicite repose sur id.",
      "fix_fr": "Compare for et id."
    },
    {
      "error": "Remplacer label par placeholder",
      "why_fr": "Le nom disparaît pendant la saisie.",
      "fix_fr": "Conserve un libellé visible et associé."
    }
  ],
  "quiz": [
    {
      "question": "Que doit remplacer un placeholder ?",
      "options": [
        "Le label dans tous les cas.",
        "L’id obligatoire du document.",
        "L’élément form.",
        "Il ne remplace pas le libellé visible."
      ],
      "answer": 3,
      "explanation": "Le texte indicatif disparaît pendant la saisie et ne donne pas un nom persistant au contrôle.",
      "id": "html-m3-01-q1"
    },
    {
      "question": "À quoi sert name ?",
      "options": [
        "À remplacer toujours for.",
        "À créer une rubrique.",
        "À nommer une donnée lors d’une soumission.",
        "À régler la couleur."
      ],
      "answer": 2,
      "explanation": "name concerne les données transmises ; id identifie un élément dans la page.",
      "id": "html-m3-01-q2"
    },
    {
      "question": "Que prouve type=\"email\" ?",
      "options": [
        "Il sécurise le serveur.",
        "Il permet un contrôle natif de forme, pas l’existence de l’adresse.",
        "Il envoie un courriel de confirmation.",
        "Il vérifie l’identité de la personne."
      ],
      "answer": 1,
      "explanation": "Le navigateur ne peut pas garantir que la boîte existe ou appartient à la personne.",
      "id": "html-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrôle",
      "definition": "Élément permettant une saisie ou un choix."
    },
    {
      "term": "libellé",
      "definition": "Nom visible d’un contrôle."
    },
    {
      "term": "soumission",
      "definition": "Tentative d’envoyer les données d’un formulaire."
    }
  ],
  "recap_fr": [
    "Chaque contrôle a un nom visible.",
    "for correspond à id.",
    "Le type adapté ne remplace pas les autres validations."
  ],
  "tags": [
    "html",
    "m3",
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

Le jardin prépare une inscription à un atelier fictif. Il demande un prénom et une adresse de contact, sans collecter de données réelles pendant l’apprentissage. Un formulaire n’est pas seulement un rectangle avec des cases. Chaque contrôle doit permettre de comprendre ce qui est attendu, comment le fournir et à quoi cela servira. Nous commençons avec form, label et input, avant d’ajouter les choix et les contraintes dans les prochaines leçons.

Un input représente un contrôle de saisie. Son type précise une partie du comportement : text convient à un prénom ; email demande une adresse ayant une forme compatible avec ce type. Le type ne garantit pas l’existence de la boîte de messagerie. Il peut aussi aider un appareil à proposer un clavier adapté. Choisir number pour un numéro de téléphone serait trompeur : un téléphone n’est pas une quantité à calculer, et son écriture peut contenir un signe plus ou des espaces.

Le label fournit le nom visible du champ. Dans la forme explicite étudiée ici, son attribut for correspond exactement à l’id de input. Lorsque l’utilisateur active ce libellé, le navigateur peut donner le focus au contrôle associé. L’identifiant doit rester unique dans le document. Une autre forme valide consiste à inclure le contrôle dans le label ; nos exercices demandent la relation explicite pour apprendre à inspecter ses deux extrémités.

L’attribut name nomme la donnée lors d’une future soumission ; id identifie l’élément dans la page. Ils peuvent avoir le même texte, mais leurs fonctions sont différentes. Un placeholder donne un exemple temporaire dans certains champs. Il disparaît pendant la saisie et ne remplace donc pas le libellé visible. Si tu fournis un exemple d’adresse, utilise une donnée de démonstration, et garde l’instruction essentielle en dehors du champ.

Les aperçus sont isolés et servent à pratiquer : aucun compte ni inscription réelle n’est créé. Les tests inspectent le type, name et la relation for/id annoncée. Après leur réussite, clique sur chaque libellé et vérifie que le bon champ reçoit le focus. Parcours ensuite les contrôles avec Tab dans l’ordre du document. Écris seulement des valeurs fictives, puis efface-les. Cette double vérification, structure et usage, prépare un formulaire qui reste compréhensible lorsque l’apparence change.

## Exemple guidé 1

```html
<form>
<p><label for="prenom">Prénom</label><input id="prenom" name="prenom" type="text"></p>
<p><label for="courriel">Adresse de contact</label><input id="courriel" name="courriel" type="email"></p>
</form>
```

## Exemple guidé 2

```html
<form>
<label for="contact">Adresse de contact</label>
<input type="email" id="contact" name="contact" placeholder="exemple@example.org">
<p>Utilise une adresse fictive dans cet exercice.</p>
</form>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
