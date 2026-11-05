---
{
  "id": "html-m3-02",
  "title_fr": "Proposer des choix et des boutons explicites",
  "course": "html-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "html-m3-01"
  ],
  "outcomes": [
    "Choisir entre sélection unique et préférences indépendantes.",
    "Grouper et nommer les contrôles et les actions."
  ],
  "idea_fr": "Les contrôles de choix et leurs groupes doivent exprimer le nombre de réponses attendu.",
  "analogy_fr": "Un formulaire ressemble à une conversation : certaines questions appellent une seule réponse, d’autres plusieurs.",
  "examples": [
    {
      "code": "<form><label for=\"atelier\">Atelier</label>\n<select id=\"atelier\" name=\"atelier\">\n<option value=\"\">Choisis un atelier</option>\n<option value=\"semis\">Semis</option><option value=\"compost\">Compost</option>\n</select></form>",
      "expected_output": "Une liste de choix nommée Atelier avec une invitation puis deux ateliers.",
      "trace_fr": [
        "Le label nomme le select.",
        "Le texte Compost correspond à la valeur compost."
      ],
      "inputs": []
    },
    {
      "code": "<form><fieldset><legend>Créneau souhaité</legend>\n<label for=\"matin\"><input id=\"matin\" name=\"creneau\" type=\"radio\" value=\"matin\"> Matin</label>\n<label for=\"apres\"><input id=\"apres\" name=\"creneau\" type=\"radio\" value=\"apres-midi\"> Après-midi</label>\n</fieldset><button type=\"button\">Aperçu local</button></form>",
      "expected_output": "Un choix unique de créneau et un bouton sans soumission.",
      "trace_fr": [
        "Les radios partagent name=\"creneau\".",
        "Leurs valeurs et ids restent distincts.",
        "Le bouton annonce une action locale de démonstration."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Partager le même id",
      "why_fr": "Les labels deviennent ambigus.",
      "fix_fr": "Partage name pour les radios mais garde des ids uniques."
    },
    {
      "error": "Oublier le type d’un bouton",
      "why_fr": "Le bouton peut soumettre sans intention.",
      "fix_fr": "Indique submit ou button selon l’action."
    }
  ],
  "quiz": [
    {
      "question": "Quel attribut réunit des radios en choix unique ?",
      "options": [
        "Le même id.",
        "La même value obligatoire.",
        "La même couleur.",
        "Le même name."
      ],
      "answer": 3,
      "explanation": "Les radios partagent un name ; leurs ids restent uniques et leurs values distinguent les réponses.",
      "id": "html-m3-02-q1"
    },
    {
      "question": "À quoi sert legend ?",
      "options": [
        "À envoyer le formulaire.",
        "À désactiver les labels.",
        "À nommer un groupe fieldset.",
        "À remplacer toutes les options."
      ],
      "answer": 2,
      "explanation": "La légende exprime la question commune aux contrôles regroupés.",
      "id": "html-m3-02-q2"
    },
    {
      "question": "Quel type donne à un bouton une action sans soumission native ?",
      "options": [
        "email",
        "button",
        "submit",
        "reset"
      ],
      "answer": 1,
      "explanation": "type=\"button\" évite une soumission ; un comportement doit ensuite être programmé si nécessaire.",
      "id": "html-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "option",
      "definition": "Choix d’un contrôle select."
    },
    {
      "term": "radio",
      "definition": "Contrôle permettant un seul choix dans un groupe."
    },
    {
      "term": "fieldset",
      "definition": "Regroupement de contrôles liés à une même question."
    }
  ],
  "recap_fr": [
    "Les radios partagent name.",
    "fieldset et legend posent une question commune.",
    "Les boutons ont un type explicite."
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

Le formulaire du jardin propose maintenant un atelier et des préférences. Avant de choisir un contrôle, précise la question. Si l’utilisateur doit retenir un seul atelier dans une petite liste, un select ou un groupe de boutons radio peut convenir. Si plusieurs préférences indépendantes sont possibles, des cases à cocher conviennent mieux. Le contrôle doit représenter la règle, au lieu d’obliger la personne à la deviner dans un long paragraphe.

Un select contient des option. Chaque option possède un texte visible et peut avoir une value destinée aux données du formulaire. Le label du select reste nécessaire. Une première option de valeur vide peut inviter à choisir sans faire passer cette invitation pour une vraie réponse. Nous verrons avec required comment empêcher que cette valeur vide soit conservée lorsqu’un choix est obligatoire. Pour l’instant, observe la différence entre le texte proposé à la personne et la valeur technique choisie pour la donnée.

Les boutons radio d’un même groupe partagent le même name et possèdent des values différentes. Ce nom commun permet un seul choix dans le groupe. Chaque contrôle garde son id et son propre label. fieldset regroupe les contrôles associés et legend pose la question commune. Les cases à cocher de type checkbox peuvent, elles, être activées indépendamment. Une case unique peut exprimer une préférence facultative ; elle ne doit pas prétendre obtenir un accord que la personne n’a pas réellement donné.

button affiche une action formulée avec des mots clairs. Dans un formulaire, précise son type pour éviter une soumission accidentelle : submit tente de soumettre, button sert à une action programmée séparément, reset remet les valeurs initiales et peut effacer le travail. Nous n’ajoutons pas de bouton de réinitialisation à cette inscription. Les démonstrations restent locales, avec des informations fictives ; aucun service d’inscription n’est connecté.

Les exercices contrôlent les groupes, les valeurs et les libellés, puis demandent une vérification d’usage. Dans un groupe radio, essaie deux choix successifs : le premier doit se désactiver. Avec deux cases à cocher, vérifie que les deux peuvent rester actives. Parcours enfin le formulaire au clavier et annonce à voix haute la question puis la réponse. Les contrôles automatiques ne remplacent pas cette expérience, mais ils aident à trouver une relation oubliée avant le projet final.

## Exemple guidé 1

```html
<form><label for="atelier">Atelier</label>
<select id="atelier" name="atelier">
<option value="">Choisis un atelier</option>
<option value="semis">Semis</option><option value="compost">Compost</option>
</select></form>
```

## Exemple guidé 2

```html
<form><fieldset><legend>Créneau souhaité</legend>
<label for="matin"><input id="matin" name="creneau" type="radio" value="matin"> Matin</label>
<label for="apres"><input id="apres" name="creneau" type="radio" value="apres-midi"> Après-midi</label>
</fieldset><button type="button">Aperçu local</button></form>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
