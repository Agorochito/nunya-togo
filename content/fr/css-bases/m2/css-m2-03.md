---
{
  "id": "css-m2-03",
  "title_fr": "Garder des états et un focus visibles",
  "course": "css-bases",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "css-m2-02"
  ],
  "outcomes": [
    "Présenter un contrôle et son état de focus.",
    "Conserver des messages et des liens compréhensibles sans couleur seule."
  ],
  "idea_fr": "Un contrôle doit rester identifiable au repos, au survol et pendant la navigation au clavier.",
  "analogy_fr": "Le focus est le repère lumineux d’une visite au clavier : il indique où aura lieu la prochaine action.",
  "examples": [
    {
      "code": ".action { color:white; background-color:navy; padding:8px 16px; }\n.action:focus { outline:3px solid navy; outline-offset:2px; }",
      "expected_output": "Le bouton possède un fond bleu marine et un contour décalé lorsqu’il reçoit le focus.",
      "trace_fr": [
        "La règle de base fournit l’apparence au repos.",
        "La pseudo-classe ajoute un indicateur pendant le focus."
      ],
      "inputs": [],
      "fixture_html": "<form><label for=\"contact\">Contact fictif</label><input id=\"contact\" type=\"email\" aria-describedby=\"erreur\"><p id=\"erreur\" class=\"erreur\">Exemple d’erreur : vérifie le format.</p><button class=\"action\" type=\"button\">Vérifier</button><button class=\"indisponible\" type=\"button\" disabled>Envoyer indisponible</button><a href=\"#aide\">Aide</a></form><p id=\"aide\">Aucune donnée réelle.</p>"
    },
    {
      "code": "a { text-decoration:underline; }\n.erreur { color:maroon; font-weight:700; }\nbutton:disabled { opacity:0.6; }",
      "expected_output": "Le lien reste souligné, le message d’erreur est renforcé et le bouton désactivé est atténué.",
      "trace_fr": [
        "Le texte du message conserve l’information d’erreur.",
        "disabled décrit un comportement HTML déjà présent, pas une apparence inventée."
      ],
      "inputs": [],
      "fixture_html": "<form><label for=\"contact\">Contact fictif</label><input id=\"contact\" type=\"email\" aria-describedby=\"erreur\"><p id=\"erreur\" class=\"erreur\">Exemple d’erreur : vérifie le format.</p><button class=\"action\" type=\"button\">Vérifier</button><button class=\"indisponible\" type=\"button\" disabled>Envoyer indisponible</button><a href=\"#aide\">Aide</a></form><p id=\"aide\">Aucune donnée réelle.</p>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Supprimer outline sans remplacement",
      "why_fr": "Le repère clavier disparaît.",
      "fix_fr": "Crée un indicateur visible et vérifie-le."
    },
    {
      "error": "Simuler une désactivation seulement en gris",
      "why_fr": "L’apparence annonce un comportement qui n’existe pas.",
      "fix_fr": "Relie le style à l’état HTML réel."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi un effet :hover seul est-il insuffisant ?",
      "options": [
        "Il remplace tous les labels.",
        "Il supprime toujours les liens.",
        "Il ne peut jamais changer une couleur.",
        "Le clavier et certains écrans tactiles n’offrent pas le même survol."
      ],
      "answer": 3,
      "explanation": "Les actions doivent rester compréhensibles par plusieurs modes d’interaction.",
      "id": "css-m2-03-q1"
    },
    {
      "question": "Quel est le rôle du focus visible ?",
      "options": [
        "Envoyer une saisie.",
        "Choisir la langue.",
        "Montrer où se trouve la navigation active.",
        "Agrandir chaque image."
      ],
      "answer": 2,
      "explanation": "Sans repère de focus, il devient difficile de savoir quelle action sera activée au clavier.",
      "id": "css-m2-03-q2"
    },
    {
      "question": "Une erreur doit-elle être signalée seulement en rouge ?",
      "options": [
        "Oui, sans label.",
        "Non, un message textuel doit expliquer le problème.",
        "Oui, toujours.",
        "Oui, si le champ est obligatoire."
      ],
      "answer": 1,
      "explanation": "La couleur peut renforcer un message, mais elle n’en transmet pas toute la signification.",
      "id": "css-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "pseudo-classe",
      "definition": "Condition ajoutée à un sélecteur, comme un état de focus."
    },
    {
      "term": "contour",
      "definition": "Trait de repérage pouvant être tracé avec outline."
    },
    {
      "term": "désactivé",
      "definition": "État dans lequel un contrôle n’accepte pas l’interaction habituelle."
    }
  ],
  "recap_fr": [
    "Les états sont fonctionnels.",
    "Le focus reste visible.",
    "Le parcours clavier complète les styles calculés."
  ],
  "tags": [
    "css",
    "m2",
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

Une feuille de style peut embellir un bouton et rendre pourtant le formulaire inutilisable au clavier. Le risque apparaît souvent quand une bordure ou un contour natif est supprimé sans remplacement. Une personne qui utilise Tab doit pouvoir repérer le contrôle actif. Les états sont donc des informations fonctionnelles. Nous allons distinguer le repos, le survol du pointeur, le focus et l’indisponibilité.

Une pseudo-classe exprime un état ou une condition de sélection. :hover correspond au survol par un dispositif qui le permet. :focus vise l’élément qui possède le focus. :focus-visible permet au navigateur de décider dans quelles situations montrer un indicateur de focus renforcé. Pour apprendre un mécanisme robuste, les activités utilisent :focus et demandent ensuite un parcours clavier. Un effet disponible uniquement au survol ne peut pas être la seule manière de découvrir une action sur un écran tactile ou au clavier.

outline trace un contour sans prendre la place d’une bordure dans le modèle de boîte ordinaire. outline-offset peut l’écarter du contrôle. Un contour de 3px solid navy avec un décalage de 2px constitue notre convention de test. Il faut ensuite vérifier qu’il reste visible sur les fonds voisins et qu’il n’est pas coupé par un conteneur. La simple présence d’une propriété dans le code ne prouve pas son utilité visuelle.

Le style d’une erreur peut renforcer un message textuel déjà présent dans le HTML. Une couleur rouge seule ne dit pas quel champ corriger ni pourquoi. L’état :disabled sélectionne les contrôles réellement désactivés ; leur apparence doit refléter ce comportement, sans faire croire qu’ils fonctionnent. Pour un lien, conserver un soulignement est une manière simple de le distinguer du texte courant. La couleur peut compléter ce repère plutôt que le remplacer.

Les contrôles automatiques focalisent le bouton pour inspecter son contour et vérifient les propriétés annoncées. Ils ne remplacent pas les gestes réels : clique dans l’aperçu, utilise Tab puis Maj+Tab, active le bouton et repère le lien. Vérifie également que le message d’erreur peut être compris sans couleur. Nous ne programmons pas encore une validation dynamique ; le message fourni est un exemple explicitement statique. L’objectif est de garder des états compréhensibles avant d’ajouter des comportements plus complexes.

## Exemple guidé 1

```css
.action { color:white; background-color:navy; padding:8px 16px; }
.action:focus { outline:3px solid navy; outline-offset:2px; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
a { text-decoration:underline; }
.erreur { color:maroon; font-weight:700; }
button:disabled { opacity:0.6; }
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
