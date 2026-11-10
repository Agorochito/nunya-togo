---
{
  "id": "htmi-m2-03",
  "title_fr": "Relier aides et erreurs sans simuler une validation",
  "course": "html-intermediaire",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "prerequisites": [
    "htmi-m2-02"
  ],
  "outcomes": [
    "Relier un contrôle à une ou plusieurs descriptions par leurs identifiants.",
    "Distinguer un état aria-invalid statique d’une validation interactive réelle."
  ],
  "idea_fr": "Le libellé nomme le champ ; les descriptions précisent la règle et expliquent le refus.",
  "analogy_fr": "Une correction sur une fiche pointe la case concernée et explique ce qu’il faut modifier, sans renommer la question.",
  "examples": [
    {
      "code": "<form>\n  <label for=\"courriel\">Adresse électronique</label>\n  <input id=\"courriel\" name=\"courriel\" type=\"email\" aria-describedby=\"courriel-aide\">\n  <p id=\"courriel-aide\">Exemple de format : membre@example.test.</p>\n</form>\n",
      "expected_output": "Le champ garde son label et reçoit une description de format reliée.",
      "trace_fr": [
        "label donne le nom du contrôle, indépendamment de sa description.",
        "aria-describedby cite courriel-aide, sans # ; le paragraphe correspondant existe.",
        "Aucun état invalide n’est annoncé sur ce premier instantané."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Aide reliée, état neutre",
        "checks": [
          {
            "selector": "label[for=\"courriel\"]",
            "textIncludes": "Adresse électronique"
          },
          {
            "selector": "#courriel[aria-describedby~=\"courriel-aide\"]",
            "attributes": {
              "aria-invalid": null
            }
          },
          {
            "selector": "#courriel-aide",
            "textIncludes": "Exemple de format"
          }
        ],
        "viewport": {
          "width": 720,
          "height": 600
        }
      }
    },
    {
      "code": "<form>\n  <label for=\"courriel\">Adresse électronique</label>\n  <input id=\"courriel\" name=\"courriel\" type=\"email\" value=\"adresse-incomplete\" aria-describedby=\"courriel-aide courriel-erreur\" aria-invalid=\"true\">\n  <p id=\"courriel-aide\">Utilise le format nom@exemple.test.</p>\n  <p id=\"courriel-erreur\">Erreur : ajoute un domaine après le signe @.</p>\n  <button type=\"button\">Examiner l’état</button>\n</form>\n",
      "expected_output": "Une adresse fictive est marquée invalide et reliée à son aide ainsi qu’à une correction textuelle.",
      "trace_fr": [
        "Deux identifiants sont présents dans describedby ; chacun vise un paragraphe existant.",
        "aria-invalid=\"true\" décrit cet état statique sans valider automatiquement une nouvelle saisie.",
        "Le message visible précise une correction ; le bouton ne soumet pas le formulaire."
      ],
      "inputs": [],
      "browser_test": {
        "description_fr": "Erreur et aide cohérentes",
        "checks": [
          {
            "selector": "#courriel[aria-describedby~=\"courriel-aide\"][aria-describedby~=\"courriel-erreur\"]",
            "attributes": {
              "aria-invalid": "true"
            }
          },
          {
            "selector": "#courriel-erreur",
            "textIncludes": "Erreur : ajoute un domaine"
          },
          {
            "selector": "button",
            "attributes": {
              "type": "button"
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
      "error": "Ajouter # dans describedby",
      "why_fr": "L’attribut attend des identifiants, pas des URL de fragments.",
      "fix_fr": "Écris courriel-aide, tandis qu’un lien utilise href=\"#courriel\"."
    },
    {
      "error": "Prétendre valider avec aria-invalid",
      "why_fr": "L’attribut représente un état mais n’exécute aucune règle.",
      "fix_fr": "Annonce l’instantané statique et prévois séparément la logique interactive."
    }
  ],
  "quiz": [
    {
      "question": "Que contient aria-describedby ?",
      "options": [
        "Une couleur d’erreur.",
        "Le texte complet du label.",
        "Une liste d’identifiants du même document.",
        "Une fonction JavaScript."
      ],
      "answer": 2,
      "explanation": "Les identifiants désignent les descriptions, sans préfixe # et séparés par des espaces.",
      "id": "htmi-m2-03-q1"
    },
    {
      "question": "Que fait aria-invalid=\"true\" tout seul ?",
      "options": [
        "Il annonce un état invalide.",
        "Il corrige la donnée.",
        "Il vérifie l’existence d’une adresse.",
        "Il déclenche un envoi sécurisé."
      ],
      "answer": 0,
      "explanation": "Cet attribut expose un état ; la règle qui l’a déterminé et sa mise à jour sont d’autres responsabilités.",
      "id": "htmi-m2-03-q2"
    },
    {
      "question": "Une description remplace-t-elle le label ?",
      "options": [
        "Oui si elle est longue.",
        "Oui si le champ est requis.",
        "Oui sur mobile seulement.",
        "Non : elle ajoute des précisions au nom du contrôle."
      ],
      "answer": 3,
      "explanation": "Le nom reste nécessaire ; aide et erreur expliquent le format ou le refus sans renommer le champ.",
      "id": "htmi-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "description accessible",
      "definition": "Texte complémentaire associé au contrôle, distinct de son nom."
    },
    {
      "term": "aria-describedby",
      "definition": "Attribut qui référence les éléments décrivant un autre élément."
    },
    {
      "term": "état statique",
      "definition": "Situation écrite dans le document qui ne se recalcule pas automatiquement après une action."
    }
  ],
  "recap_fr": [
    "Le label nomme, les descriptions expliquent.",
    "Chaque id référencé doit exister de façon unique.",
    "aria-invalid décrit un état ; il ne remplace pas une validation."
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
      "title": "MDN — aria-describedby",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby",
      "scope": "Liste de références vers des descriptions complémentaires."
    },
    {
      "title": "MDN — aria-invalid",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid",
      "scope": "État de validité annoncé, distinct de la validation réelle."
    }
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Un libellé répond à la question « quelle information faut-il saisir ? ». Une aide répond plutôt à « sous quelle forme ? » ou « à quoi servira-t-elle ? ». Une erreur explique pourquoi la valeur actuelle n’est pas acceptée et comment la corriger. Mélanger ces rôles dans un seul placeholder rend le formulaire fragile : le texte disparaît pendant la saisie et ne décrit pas durablement l’état. Nous allons garder le label, puis relier les informations complémentaires au contrôle concerné.

aria-describedby contient une liste d’identifiants séparés par des espaces. Chaque identifiant désigne un élément du même document dont le texte décrit le champ. Pour une adresse électronique, courriel-aide peut annoncer un exemple de format. Le champ conserve son label explicite : describedby ajoute une description à son nom, il ne remplace pas ce nom. Les références n’utilisent pas le signe dièse, contrairement à href dans un lien interne.

Plusieurs descriptions peuvent être nécessaires. Un champ déjà relu peut référencer à la fois une aide et un message d’erreur visible. Vérifie que chaque id existe une seule fois, que le texte décrit bien ce contrôle et que l’information n’est pas annoncée uniquement par une couleur. Une phrase telle que « Erreur : ajoute un domaine après le signe @ » rend le problème compréhensible dans le contenu lui-même. Elle reste utile lorsque la présentation visuelle change.

aria-invalid="true" annonce que la valeur est actuellement considérée comme invalide. Cet attribut ne vérifie pas la saisie, ne lance pas de calcul et ne bloque pas automatiquement une action. Inversement, son absence ou la valeur false n’est pas une preuve que toutes les données ont été contrôlées. Sur un champ neuf, il est généralement préférable de ne pas annoncer une erreur avant qu’une règle ait été évaluée. Nos exercices distinguent donc un état neutre et un état refusé explicitement fourni.

Les exemples représentent des instantanés statiques. Modifier le texte dans leur aperçu ne mettra pas les descriptions et aria-invalid à jour : aucun script de validation n’est exécuté. Une interface réelle devrait recalculer l’état au bon moment, présenter les corrections sans perdre la saisie et permettre de revenir au champ concerné. Un résumé peut référencer ce champ avec un lien interne, mais notre aperçu isolé bloque les navigations et les envois ; les tests contrôlent la relation du lien, pas un parcours de soumission inexistant.

Pour relire le document, suis les références dans les deux sens : pars du contrôle vers chaque description, puis vérifie à quel contrôle appartient chaque message. Le lecteur ne doit pas rencontrer un id cassé, une erreur attachée au voisin ou une indication de réussite contradictoire. Les tests DOM assurent cette cohérence structurelle. L’annonce effective avec différentes technologies d’assistance demande encore une vérification humaine. Ce niveau de précision prépare une validation interactive future tout en décrivant honnêtement ce que le HTML seul peut représenter.

## Exemple guidé 1

```html
<form>
  <label for="courriel">Adresse électronique</label>
  <input id="courriel" name="courriel" type="email" aria-describedby="courriel-aide">
  <p id="courriel-aide">Exemple de format : membre@example.test.</p>
</form>
```

## Exemple guidé 2

```html
<form>
  <label for="courriel">Adresse électronique</label>
  <input id="courriel" name="courriel" type="email" value="adresse-incomplete" aria-describedby="courriel-aide courriel-erreur" aria-invalid="true">
  <p id="courriel-aide">Utilise le format nom@exemple.test.</p>
  <p id="courriel-erreur">Erreur : ajoute un domaine après le signe @.</p>
  <button type="button">Examiner l’état</button>
</form>
```
