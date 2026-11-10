---
{
  "id": "htmi-m2-02",
  "title_fr": "Choisir les attributs selon la donnée",
  "course": "html-intermediaire",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m2-01"
  ],
  "outcomes": [
    "Distinguer identifiant, nom de donnée, type de champ et indication de clavier.",
    "Choisir des jetons autocomplete et préserver les zéros d’un identifiant."
  ],
  "idea_fr": "Le rôle de la donnée guide chaque attribut ; un clavier proposé ne remplace jamais un contrat de validation.",
  "analogy_fr": "Une fiche distingue son numéro de case, le nom de l’information attendue et le format d’écriture conseillé.",
  "examples": [
    {
      "code": "<form>\n  <label for=\"courriel\">Adresse électronique</label>\n  <input id=\"courriel\" name=\"courriel\" type=\"email\" autocomplete=\"email\">\n</form>\n",
      "expected_output": "Un champ courriel possède un nom de donnée, un type spécialisé et un libellé permanent.",
      "trace_fr": [
        "for=\"courriel\" vise l’unique id du champ.",
        "name identifie la donnée ; type=\"email\" choisit son comportement natif.",
        "autocomplete=\"email\" décrit le sens du remplissage proposé, sans vérifier l’existence de l’adresse."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Le contrat du courriel",
        "checks": [
          {
            "selector": "label[for=\"courriel\"]",
            "textIncludes": "Adresse électronique"
          },
          {
            "selector": "#courriel",
            "attributes": {
              "name": "courriel",
              "type": "email",
              "autocomplete": "email"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<form>\n  <label for=\"telephone\">Téléphone</label>\n  <input id=\"telephone\" name=\"telephone\" type=\"tel\" autocomplete=\"tel\" inputmode=\"tel\">\n  <label for=\"code-postal\">Code postal français</label>\n  <input id=\"code-postal\" name=\"code_postal\" type=\"text\" autocomplete=\"postal-code\" inputmode=\"numeric\" maxlength=\"5\" pattern=\"[0-9]{5}\" value=\"01000\">\n</form>\n",
      "expected_output": "Le téléphone accepte un format textuel ; le code postal garde son zéro initial.",
      "trace_fr": [
        "Le téléphone utilise tel pour son type et son autocomplete.",
        "Le code postal reste un texte, même si inputmode propose un clavier numérique.",
        "La valeur « 01000 » conserve cinq caractères ; le contexte annoncé est français."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Deux données distinctes",
        "checks": [
          {
            "selector": "#telephone",
            "attributes": {
              "type": "tel",
              "autocomplete": "tel",
              "inputmode": "tel"
            }
          },
          {
            "selector": "#code-postal",
            "attributes": {
              "type": "text",
              "value": "01000",
              "inputmode": "numeric",
              "autocomplete": "postal-code"
            }
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Choisir number pour tout texte composé de chiffres",
      "why_fr": "Les zéros et le rôle d’identifiant risquent d’être mal représentés.",
      "fix_fr": "Distingue quantité calculable et code textuel."
    },
    {
      "error": "Prendre autocomplete pour une vérification",
      "why_fr": "Le remplissage proposé ne prouve pas la validité ou la possession de la donnée.",
      "fix_fr": "Décris séparément aide à la saisie et règles de validité."
    }
  ],
  "quiz": [
    {
      "question": "Quel attribut nomme une donnée lors d’une soumission normale ?",
      "options": [
        "id",
        "name",
        "inputmode",
        "placeholder"
      ],
      "answer": 1,
      "explanation": "name nomme la donnée ; id sert notamment de cible au label.",
      "id": "htmi-m2-02-q1"
    },
    {
      "question": "Pourquoi garder un code postal français en type text ?",
      "options": [
        "Pour garantir une adresse existante.",
        "Pour supprimer tout contrôle de format.",
        "Parce qu’il s’agit d’un identifiant pouvant commencer par zéro.",
        "Parce que les champs textuels envoient automatiquement les données."
      ],
      "answer": 2,
      "explanation": "Le code n’est pas une quantité ; inputmode et pattern peuvent aider sans changer sa nature textuelle.",
      "id": "htmi-m2-02-q2"
    },
    {
      "question": "Que garantit inputmode=\"numeric\" ?",
      "options": [
        "Que seules les touches numériques sont toujours possibles.",
        "Qu’un serveur accepte la valeur.",
        "Que le champ est obligatoire.",
        "Rien de tout cela : il suggère surtout un mode de saisie adapté."
      ],
      "answer": 3,
      "explanation": "Le clavier proposé dépend de l’appareil et ne remplace ni validation ni contrat de traitement.",
      "id": "htmi-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "name",
      "definition": "Nom d’une donnée associée à un contrôle de formulaire."
    },
    {
      "term": "autocomplete",
      "definition": "Indication sémantique utilisée pour proposer un remplissage adapté."
    },
    {
      "term": "inputmode",
      "definition": "Suggestion de mode de saisie ou de clavier, distincte d’une règle de validation."
    }
  ],
  "recap_fr": [
    "id relie un élément, name nomme sa donnée.",
    "Le type correspond au rôle réel de la valeur.",
    "Les aides de saisie ne prouvent pas la validité de l’information."
  ],
  "tags": [
    "html",
    "m2",
    "intermédiaire"
  ],
  "environment_fr": "Aperçu isolé dans le navigateur, sans scripts élèves, réseau ni envoi de formulaire. Données fictives ; images SVG embarquées lorsqu’elles sont nécessaires. Les tests inspectent le DOM et les styles calculés aux dimensions indiquées.",
  "technical_checked_on": "2026-11-07",
  "sources": [
    {
      "title": "MDN — autocomplete",
      "url": "https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Attributes/autocomplete",
      "scope": "Jetons de remplissage, notamment name, email, tel et postal-code."
    },
    {
      "title": "WHATWG — Saisie",
      "url": "https://html.spec.whatwg.org/multipage/input.html",
      "scope": "Types des champs, name, valeurs et contrôles natifs."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Un contrôle de formulaire porte plusieurs informations qui ne sont pas interchangeables. id permet à un label et à des liens internes de viser un élément précis. name nomme la donnée dans une éventuelle soumission. type choisit le comportement du contrôle. autocomplete indique le sens d’une information pour le remplissage proposé par le navigateur. inputmode suggère un clavier adapté sur les appareils qui en disposent. Une page robuste attribue à chacun un rôle clair au lieu de répéter une même valeur par habitude.

Commençons par l’adresse électronique. Le champ garde un label visible « Adresse électronique », un id unique et un name explicite. type="email" apporte un contrôle de format natif, mais ne prouve ni que l’adresse existe ni qu’une personne la possède. autocomplete="email" décrit cette donnée au navigateur. Un placeholder ne remplacerait pas le label : il peut disparaître pendant la saisie et son rôle principal reste un exemple ou une indication, pas le nom durable du champ.

Un numéro de téléphone se traite comme du texte spécialisé avec type="tel". Les espaces, les préfixes et le signe plus ne forment pas une quantité à additionner. Le jeton autocomplete="tel" signale un téléphone complet. L’apparition d’un clavier téléphonique dépend de l’appareil ; elle n’est pas une validation universelle du numéro. Les formats internationaux ne peuvent pas être réduits à une longueur unique simplement parce qu’un exemple local utilise dix chiffres.

Le code postal montre une autre différence importante. Un code français de cinq chiffres peut commencer par zéro et n’a pas vocation à être augmenté avec des flèches. Choisissons type="text", inputmode="numeric" et autocomplete="postal-code". Pour notre contexte français annoncé, maxlength="5" limite la longueur et pattern="[0-9]{5}" décrit cinq chiffres. inputmode ne bloque pas à lui seul les lettres ; pattern n’oblige pas à remplir un champ vide sans required. Ces règles locales ne conviendraient pas automatiquement à tous les pays.

Une valeur name absente ne rend pas forcément le contrôle invisible ou inutilisable au clavier ; elle change la présence de sa donnée dans une soumission normale. À l’inverse, deux id identiques cassent les références même si leurs name sont différents. Relis donc séparément l’association du libellé et le contrat des données. Choisis des noms stables et compréhensibles, tels que courriel ou code_postal, sans les confondre avec le texte affiché au lecteur.

Les exemples restent des démonstrations sans envoi. Ils permettent d’inspecter les attributs, pas de confirmer le fonctionnement d’un serveur ou de certifier une identité. Les tests vérifient les choix structurels et la conservation du zéro dans une valeur textuelle. Une revue sur appareil réel reste utile pour observer le clavier et le remplissage proposés. L’objectif est d’aider la saisie sans présenter une suggestion d’interface comme une garantie sur la donnée reçue.

## Exemple guidé 1

```html
<form>
  <label for="courriel">Adresse électronique</label>
  <input id="courriel" name="courriel" type="email" autocomplete="email">
</form>
```

## Exemple guidé 2

```html
<form>
  <label for="telephone">Téléphone</label>
  <input id="telephone" name="telephone" type="tel" autocomplete="tel" inputmode="tel">
  <label for="code-postal">Code postal français</label>
  <input id="code-postal" name="code_postal" type="text" autocomplete="postal-code" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" value="01000">
</form>
```
