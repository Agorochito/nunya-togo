---
{
  "id": "html-m3-03",
  "title_fr": "Ajouter des contraintes et guider la correction",
  "course": "html-bases",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "html-m3-02"
  ],
  "outcomes": [
    "Exprimer une obligation et des bornes simples.",
    "Associer une aide et expliquer les limites de la validation native."
  ],
  "idea_fr": "Les contraintes natives aident à saisir ; elles ne remplacent ni des instructions claires ni la validation serveur.",
  "analogy_fr": "La validation du navigateur est un premier guichet d’aide, pas une preuve définitive de la demande.",
  "examples": [
    {
      "code": "<form><label for=\"contact\">Adresse de contact, obligatoire</label>\n<input id=\"contact\" name=\"contact\" type=\"email\" required aria-describedby=\"aide-contact\">\n<p id=\"aide-contact\">Adresse fictive uniquement ; aucun message ne sera envoyé.</p>\n<button type=\"submit\">Vérifier</button></form>",
      "expected_output": "Le champ a un nom, une obligation et une description persistante.",
      "trace_fr": [
        "required impose une valeur.",
        "email apporte un contrôle de forme.",
        "aria-describedby référence l’aide, en complément du label."
      ],
      "inputs": []
    },
    {
      "code": "<form><label for=\"places\">Nombre de places, de 1 à 4</label>\n<input id=\"places\" name=\"places\" type=\"number\" min=\"1\" max=\"4\" required>\n<label for=\"atelier\">Atelier, obligatoire</label>\n<select id=\"atelier\" name=\"atelier\" required><option value=\"\">Choisis</option><option value=\"semis\">Semis</option></select>\n<button type=\"submit\">Vérifier</button></form>",
      "expected_output": "Une quantité bornée et une sélection qui ne peut pas rester vide lors de la validation native.",
      "trace_fr": [
        "Les bornes portent sur la quantité.",
        "L’option vide sert d’invitation.",
        "Le bouton submit déclenche la tentative de validation."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Écrire required=\"false\"",
      "why_fr": "Un attribut booléen présent reste actif.",
      "fix_fr": "Retire l’attribut pour désactiver cette obligation."
    },
    {
      "error": "Masquer la règle jusqu’à l’erreur",
      "why_fr": "La personne doit essayer pour comprendre.",
      "fix_fr": "Annonce les obligations et formats avant la saisie."
    }
  ],
  "quiz": [
    {
      "question": "Une validation dans le navigateur sécurise-t-elle le serveur ?",
      "options": [
        "Oui, required suffit.",
        "Oui, si le champ est bleu.",
        "Oui, avec un placeholder.",
        "Non, les données reçues doivent être validées côté serveur."
      ],
      "answer": 3,
      "explanation": "Les contraintes du client peuvent être contournées et ne remplacent pas le traitement du serveur.",
      "id": "html-m3-03-q1"
    },
    {
      "question": "Que fait aria-describedby ici ?",
      "options": [
        "Il transforme le contrôle en titre.",
        "Il envoie un courriel.",
        "Il associe un texte d’aide au contrôle.",
        "Il supprime son label."
      ],
      "answer": 2,
      "explanation": "La description complète le nom du contrôle ; elle ne le remplace pas.",
      "id": "html-m3-03-q2"
    },
    {
      "question": "Quelle valeur donner à l’invitation d’un select required ?",
      "options": [
        "La valeur obligatoire.",
        "Une chaîne vide.",
        "Le nom d’un atelier choisi arbitrairement.",
        "Toujours 1."
      ],
      "answer": 1,
      "explanation": "L’invitation vide permet au navigateur de demander un vrai choix.",
      "id": "html-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "contrainte native",
      "definition": "Règle de saisie comprise par le navigateur."
    },
    {
      "term": "validation serveur",
      "definition": "Vérification des données par le service qui les reçoit."
    },
    {
      "term": "description",
      "definition": "Information complémentaire associée à un contrôle."
    }
  ],
  "recap_fr": [
    "Les règles restent visibles.",
    "L’aide complète le label.",
    "La validation serveur reste nécessaire dans un vrai service."
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

Une personne remplit le formulaire du jardin avec une adresse incomplète ou oublie de choisir un atelier. Le navigateur peut signaler certaines erreurs avant une soumission. Cette aide doit compléter un formulaire compréhensible, pas servir à cacher les règles jusqu’au dernier moment. Dans l’exercice, toute saisie est fictive et aucun serveur n’est connecté. Nous apprenons à exprimer un petit contrat de saisie et à expliquer ses limites.

required indique qu’une valeur est obligatoire selon les règles du contrôle concerné. Écris aussi cette obligation dans un texte visible, par exemple « Adresse de contact, obligatoire ». Ne compte pas uniquement sur un astérisque sans explication. Pour un champ email, le navigateur combine présence obligatoire et contrôle de forme. Une adresse ayant une forme acceptée ne prouve ni sa délivrabilité ni l’identité de la personne. Un véritable service doit encore valider les données reçues sur son serveur.

Pour un select obligatoire, une première option de valeur vide permet de présenter une invitation sans choisir à la place de l’utilisateur. required empêche cette invitation vide de satisfaire le choix. Pour un champ number représentant une quantité, min et max définissent ici des bornes : une réservation peut demander entre une et quatre places. Ces contraintes ne conviennent pas à un téléphone, un code postal ou un identifiant qui ne représente pas une quantité.

Une aide persistante peut préciser le format ou la finalité. Donne-lui un id et référence-le avec aria-describedby sur le contrôle. Cette relation ajoute une description ; elle ne remplace pas le label. Le texte doit rester utile et court. Les messages natifs du navigateur dépendent de son environnement. Dans une application complète, des erreurs textuelles proches des champs et un résumé peuvent compléter ce mécanisme ; nous n’inventons pas ici un traitement serveur ou une gestion d’erreurs dynamique inexistants.

Les tests automatiques vérifient les contraintes et les références de description. Ils ne prouvent pas que toutes les personnes pourront utiliser le formulaire. Fais donc un essai manuel : parcours avec Tab, active le bouton de soumission, lis le retour du navigateur, corrige une valeur à la fois, puis recommence. Utilise uniquement des données de démonstration. Conserve l’ordre logique du document et ne cherche pas à masquer les erreurs par la couleur seule. Une correction réussie doit expliquer ce qui manque et permettre de reprendre la saisie.

## Exemple guidé 1

```html
<form><label for="contact">Adresse de contact, obligatoire</label>
<input id="contact" name="contact" type="email" required aria-describedby="aide-contact">
<p id="aide-contact">Adresse fictive uniquement ; aucun message ne sera envoyé.</p>
<button type="submit">Vérifier</button></form>
```

## Exemple guidé 2

```html
<form><label for="places">Nombre de places, de 1 à 4</label>
<input id="places" name="places" type="number" min="1" max="4" required>
<label for="atelier">Atelier, obligatoire</label>
<select id="atelier" name="atelier" required><option value="">Choisis</option><option value="semis">Semis</option></select>
<button type="submit">Vérifier</button></form>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
