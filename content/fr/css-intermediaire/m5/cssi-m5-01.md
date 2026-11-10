---
{
  "id": "cssi-m5-01",
  "title_fr": "Rendre le focus visible sans perturber son parcours",
  "course": "css-intermediaire",
  "module": "m5",
  "order": 13,
  "minutes": 20,
  "prerequisites": [
    "cssi-m4-03"
  ],
  "outcomes": [
    "Construire un focus visible conditionnel et cohérent sur plusieurs contrôles.",
    "Associer le repère précis du champ à un contexte de groupe sans changer l’ordre de navigation."
  ],
  "idea_fr": "Construire un focus visible conditionnel et cohérent sur plusieurs contrôles.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": "body { font: 16px/1.5 sans-serif; }\n#programme { color: #164e63; text-decoration: underline; outline: none; }\n#programme:focus { outline: 3px solid #9a3412; outline-offset: 3px; }",
      "inputs": [],
      "expected_output": "Le lien reste souligné ; lorsqu’il reçoit le focus, un contour brun de3px apparaît à3px de distance.",
      "trace_fr": [
        "Le soulignement décrit le lien au repos.",
        "La règle :focus ajoute un repère d’état séparé.",
        "Le contour ne remplace pas le texte ni la cible du lien."
      ],
      "browser_test": {
        "description_fr": "Lien réellement focalisé",
        "checks": [
          {
            "selector": "#programme:focus",
            "style": {
              "outline-style": "solid",
              "outline-width": "3px",
              "outline-color": "#9a3412",
              "outline-offset": "3px"
            }
          },
          {
            "selector": "#programme",
            "style": {
              "text-decoration-line": "underline"
            }
          }
        ],
        "focus_selector": "#programme"
      },
      "fixture_html": "<main><h1>Commandes du club fictif</h1><a id=\"programme\" class=\"action\" href=\"#suite\">Lire le programme</a><button id=\"ajouter\" class=\"action\" type=\"button\">Ajouter à l’essai</button><div class=\"groupe\"><label for=\"note\">Note fictive</label><input id=\"note\" class=\"champ\" type=\"text\"><label for=\"autre\">Autre note fictive</label><input id=\"autre\" class=\"champ\" type=\"text\"></div><p id=\"suite\">Programme de démonstration, sans envoi.</p></main>"
    },
    {
      "code": "body { font: 16px/1.5 sans-serif; }\n.groupe { border: 2px solid #64748b; padding: 16px; }\n.champ { display: block; margin-block: 8px 16px; outline: none; }\n.groupe:focus-within { border-color: #164e63; }\n.champ:focus { outline: 3px solid #9a3412; outline-offset: 2px; }",
      "inputs": [],
      "expected_output": "Le champ focalisé a son contour ; la bordure de son groupe devient bleu profond sans créer un autre arrêt clavier.",
      "trace_fr": [
        ":focus vise le contrôle précis.",
        "Le même état déclenche :focus-within sur son groupe.",
        "Le conteneur reste un simple repère de contexte."
      ],
      "browser_test": {
        "description_fr": "Champ et groupe actifs",
        "checks": [
          {
            "selector": "#note:focus",
            "style": {
              "outline-style": "solid",
              "outline-width": "3px",
              "outline-color": "#9a3412",
              "outline-offset": "2px"
            }
          },
          {
            "selector": ".groupe:focus-within",
            "style": {
              "border-top-color": "#164e63"
            }
          }
        ],
        "focus_selector": "#note"
      },
      "fixture_html": "<main><h1>Commandes du club fictif</h1><a id=\"programme\" class=\"action\" href=\"#suite\">Lire le programme</a><button id=\"ajouter\" class=\"action\" type=\"button\">Ajouter à l’essai</button><div class=\"groupe\"><label for=\"note\">Note fictive</label><input id=\"note\" class=\"champ\" type=\"text\"><label for=\"autre\">Autre note fictive</label><input id=\"autre\" class=\"champ\" type=\"text\"></div><p id=\"suite\">Programme de démonstration, sans envoi.</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Effacer globalement tous les contours",
      "why_fr": "Les contrôles focalisés perdent leur repère.",
      "fix_fr": "Prévois un indicateur explicite et cohérent."
    },
    {
      "error": "Confondre groupe actif et champ actif",
      "why_fr": "La personne sait où elle est mais pas quel champ reçoit la saisie.",
      "fix_fr": "Garde aussi le contour du contrôle précis."
    }
  ],
  "quiz": [
    {
      "question": "Que fait outline-offset ici ?",
      "options": [
        "Il déclenche automatiquement un événement clavier.",
        "Il espace le contour de son élément sans déplacer les voisins.",
        "Il déplace l’élément dans l’ordre de Tab.",
        "Il modifie l’adresse du lien."
      ],
      "answer": 1,
      "explanation": "Le contour est un repère visuel, pas une modification de navigation.",
      "id": "cssi-m5-01-q1"
    },
    {
      "question": "Que signifie :focus-within ?",
      "options": [
        "Le conteneur ou un de ses descendants possède le focus.",
        "Le conteneur est forcément un bouton.",
        "La souris survole un texte.",
        "Tous les champs sont valides."
      ],
      "answer": 0,
      "explanation": "La pseudo-classe peut situer un groupe tout en gardant le contrôle précis identifiable.",
      "id": "cssi-m5-01-q2"
    },
    {
      "question": "Quelle preuve donne focus_selector dans ces tests ?",
      "options": [
        "Un parcours clavier complet avec toutes les aides techniques.",
        "Une certification de contraste.",
        "L’activation des liens bloqués.",
        "Un élément est réellement focalisé et ses styles sont inspectés."
      ],
      "answer": 3,
      "explanation": "La vérification cible un état précis ; elle doit être complétée par l’usage humain.",
      "id": "cssi-m5-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "outline",
      "definition": "Contour visuel extérieur distinct d’une bordure de mise en page."
    },
    {
      "term": "focus-within",
      "definition": "État d’un conteneur qui possède ou contient le focus."
    },
    {
      "term": "focus-visible",
      "definition": "Heuristique du navigateur signalant qu’un indicateur de focus est nécessaire."
    }
  ],
  "recap_fr": [
    "Construire un focus visible conditionnel et cohérent sur plusieurs contrôles.",
    "Associer le repère précis du champ à un contexte de groupe sans changer l’ordre de navigation.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "outline",
    "focus-within",
    "focus-visible"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "css",
  "runtime": "css",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "references": [
    {
      "title": "MDN — :focus",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus"
    },
    {
      "title": "MDN — :focus-visible",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible"
    },
    {
      "title": "MDN — :focus-within",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within"
    },
    {
      "title": "WAI — Focus Visible",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document."
}
---

## Explication pas à pas

Une interface peut sembler claire à la souris tout en devenant difficile à parcourir au clavier. Le focus indique le contrôle actuellement prêt à recevoir une action ou une saisie. Le rendre visible n’ajoute pas un nouveau comportement : il donne un repère à un état qui existe déjà. Notre objectif est de repérer un lien, un bouton et un champ sans changer leur ordre dans le document ni déplacer le focus avec CSS.

La pseudo-classe :focus correspond à l’élément focalisé. Un contour avec outline apporte un repère extérieur qui ne consomme pas la place d’une bordure dans le calcul de mise en page. outline-offset laisse ici trois pixels entre le contrôle et le contour. L’exemple conserve aussi le soulignement du lien au repos : reconnaître un lien et reconnaître sa position active sont deux informations différentes. Évite qu’un parent avec overflow:hidden coupe ce contour autour des bords.

:focus-visible exprime un choix plus contextuel du navigateur : il apparaît quand celui-ci estime qu’un indicateur de focus est nécessaire, notamment dans de nombreux parcours au clavier. Ce n’est pas un synonyme strict de « l’utilisateur vient d’appuyer sur Tab ». Les champs de saisie et les déplacements programmatiques peuvent avoir leurs propres règles. Dans ces activités, nous choisissons un indicateur robuste sur :focus pour tout contrôle ciblé. Cette décision peut afficher aussi un contour après certaines interactions à la souris, sans empêcher l’usage.

Le groupe de saisie illustre :focus-within. La classe correspond à un conteneur qui possède lui-même le focus ou contient un descendant focalisé. Quand une note reçoit le focus, la bordure du groupe aide à situer l’ensemble, mais le champ garde son propre contour. Le changement du groupe ne remplace pas l’indication précise du contrôle actif. Le conteneur n’a pas besoin de recevoir un tabindex supplémentaire pour être coloré de cette manière.

Un défaut fréquent vient de la cascade. Une règle globale qui supprime outline avec !important peut effacer une bonne règle locale placée plus tôt. Ajouter toujours plus de spécificité masque alors le problème au lieu de clarifier la responsabilité. Dans le débogage, retire la suppression générale et définis une règle commune aux contrôles. Le lien et le bouton doivent conserver un comportement cohérent, même si leur apparence de base diffère.

Les tests focalisent réellement un élément du document puis lisent ses styles calculés. Des contrôles séparés examinent aussi le repos : un contour permanent ne doit pas passer pour une réaction au focus. Cette preuve ne remplace pas un parcours Tab et Maj+Tab complet, ni un examen de visibilité quand le zoom ou le contenu changent. L’aperçu neutralise l’activation des liens ; il permet néanmoins d’inspecter leur état focalisé. Justifie la forme, la couleur et l’espace choisis, sans annoncer une certification globale d’accessibilité à partir de ces quelques propriétés.

## Exemple guidé 1

```css
body { font: 16px/1.5 sans-serif; }
#programme { color: #164e63; text-decoration: underline; outline: none; }
#programme:focus { outline: 3px solid #9a3412; outline-offset: 3px; }
```

## Exemple guidé 2

```css
body { font: 16px/1.5 sans-serif; }
.groupe { border: 2px solid #64748b; padding: 16px; }
.champ { display: block; margin-block: 8px 16px; outline: none; }
.groupe:focus-within { border-color: #164e63; }
.champ:focus { outline: 3px solid #9a3412; outline-offset: 2px; }
```

