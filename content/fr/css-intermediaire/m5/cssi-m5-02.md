---
{
  "id": "cssi-m5-02",
  "title_fr": "Distinguer les états sans dépendre seulement de la couleur",
  "course": "css-intermediaire",
  "module": "m5",
  "order": 14,
  "minutes": 20,
  "prerequisites": [
    "cssi-m5-01"
  ],
  "outcomes": [
    "Faire dépendre les styles des états natifs checked, disabled et invalid.",
    "Préserver texte, formes et descriptions en complément des couleurs."
  ],
  "idea_fr": "Faire dépendre les styles des états natifs checked, disabled et invalid.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": ".option { display: block; margin-block: 12px; }\n.badge { display: none; margin-inline-start: 8px; padding-inline-start: 8px; border-inline-start: 4px solid #164e63; font-weight: 700; }\n.option input:checked ~ .badge { display: inline; }",
      "inputs": [],
      "expected_output": "Lecture affiche une marque textuelle Choisi ; Jardin conserve sa case non cochée sans cette marque supplémentaire.",
      "trace_fr": [
        "Le HTML fournit checked uniquement pour Lecture.",
        "Le sélecteur :checked contrôle la marque qui suit la case.",
        "Le mot Choisi complète le signe natif, sans dépendre d’une couleur seule."
      ],
      "browser_test": {
        "description_fr": "Deux états de sélection",
        "checks": [
          {
            "selector": "#lecture",
            "attributes": {
              "checked": ""
            }
          },
          {
            "selector": "#lecture ~ .badge",
            "style": {
              "display": "inline",
              "font-weight": "700"
            }
          },
          {
            "selector": "#jardin ~ .badge",
            "style": {
              "display": "none"
            }
          }
        ]
      },
      "fixture_html": "<main><h1>Préparation fictive du club</h1><section aria-label=\"Choix\"><label class=\"option\"><input id=\"lecture\" type=\"checkbox\" checked><span>Lecture</span><span class=\"badge\">Choisi</span></label><label class=\"option\"><input id=\"jardin\" type=\"checkbox\"><span>Jardin</span><span class=\"badge\">Choisi</span></label></section><form><label for=\"courriel-erreur\">Courriel fictif à corriger</label><input id=\"courriel-erreur\" class=\"champ\" type=\"email\" required value=\"incomplet\" aria-describedby=\"erreur\"><p id=\"erreur\" class=\"erreur\">Format à corriger : exemple nom@example.test.</p><label for=\"courriel-valide\">Autre courriel fictif</label><input id=\"courriel-valide\" class=\"champ\" type=\"email\" required value=\"afi@example.test\" aria-describedby=\"erreur-valide\"><p id=\"erreur-valide\" class=\"erreur\">Format à corriger : exemple nom@example.test.</p><button id=\"disponible\" class=\"commande\" type=\"button\">Examiner l’essai</button><button id=\"indisponible\" class=\"commande\" type=\"button\" disabled aria-describedby=\"raison\">Envoi indisponible</button><p id=\"raison\">Aucun service d’envoi n’est connecté à cette démonstration.</p></form></main>"
    },
    {
      "code": ".champ { display: block; border: 1px solid #64748b; padding: 8px; }\n.erreur { display: none; color: #9a3412; font-weight: 700; }\n.champ:invalid { border: 3px solid #9a3412; }\n.champ:invalid + .erreur { display: block; }",
      "inputs": [],
      "expected_output": "Le champ incomplet a une bordure3px et un message visible ; le champ syntaxiquement valide garde sa bordure1px sans ce message.",
      "trace_fr": [
        "La pseudo-classe vient des contraintes HTML, pas d’une classe ajoutée artificiellement.",
        "Le message existe comme texte relié au contrôle.",
        "Le test compare deux valeurs initiales, sans vérifier un service d’adresse."
      ],
      "browser_test": {
        "description_fr": "Validité native et repères",
        "checks": [
          {
            "selector": "#courriel-erreur:invalid",
            "style": {
              "border-top-width": "3px",
              "border-top-color": "#9a3412"
            }
          },
          {
            "selector": "#erreur",
            "style": {
              "display": "block"
            }
          },
          {
            "selector": "#courriel-valide:valid",
            "style": {
              "border-top-width": "1px"
            }
          },
          {
            "selector": "#erreur-valide",
            "style": {
              "display": "none"
            }
          }
        ]
      },
      "fixture_html": "<main><h1>Préparation fictive du club</h1><section aria-label=\"Choix\"><label class=\"option\"><input id=\"lecture\" type=\"checkbox\" checked><span>Lecture</span><span class=\"badge\">Choisi</span></label><label class=\"option\"><input id=\"jardin\" type=\"checkbox\"><span>Jardin</span><span class=\"badge\">Choisi</span></label></section><form><label for=\"courriel-erreur\">Courriel fictif à corriger</label><input id=\"courriel-erreur\" class=\"champ\" type=\"email\" required value=\"incomplet\" aria-describedby=\"erreur\"><p id=\"erreur\" class=\"erreur\">Format à corriger : exemple nom@example.test.</p><label for=\"courriel-valide\">Autre courriel fictif</label><input id=\"courriel-valide\" class=\"champ\" type=\"email\" required value=\"afi@example.test\" aria-describedby=\"erreur-valide\"><p id=\"erreur-valide\" class=\"erreur\">Format à corriger : exemple nom@example.test.</p><button id=\"disponible\" class=\"commande\" type=\"button\">Examiner l’essai</button><button id=\"indisponible\" class=\"commande\" type=\"button\" disabled aria-describedby=\"raison\">Envoi indisponible</button><p id=\"raison\">Aucun service d’envoi n’est connecté à cette démonstration.</p></form></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser pointer-events:none comme disabled",
      "why_fr": "Le blocage de pointeur n’établit pas le même état sémantique.",
      "fix_fr": "Conserve disabled dans HTML et style :disabled."
    },
    {
      "error": "Montrer la même erreur sur tous les champs",
      "why_fr": "La présentation ne distingue plus valeur valide et invalide.",
      "fix_fr": "Compare les états opposés et cible :invalid."
    }
  ],
  "quiz": [
    {
      "question": "Une couleur grise rend-elle un bouton désactivé ?",
      "options": [
        "Non, l’état natif doit être défini dans HTML.",
        "Oui, toute teinte grise bloque le clavier.",
        "Seulement si opacity vaut zéro.",
        "CSS supprime alors automatiquement le formulaire."
      ],
      "answer": 0,
      "explanation": "La présentation et la sémantique du contrôle sont distinctes.",
      "id": "cssi-m5-02-q1"
    },
    {
      "question": "Que prouve :valid sur une adresse email ici ?",
      "options": [
        "L’existence et la réception de messages de cette adresse.",
        "L’accord d’une personne réelle.",
        "Une inscription réussie.",
        "La satisfaction des contraintes natives applicables."
      ],
      "answer": 3,
      "explanation": "La validation de format ne vérifie pas un service de messagerie.",
      "id": "cssi-m5-02-q2"
    },
    {
      "question": "Pourquoi ajouter un texte Choisi ou Format à corriger ?",
      "options": [
        "Pour certifier toute la page automatiquement.",
        "Pour envoyer la sélection au serveur.",
        "Pour transmettre l’état sans dépendre seulement de la couleur.",
        "Pour remplacer les labels."
      ],
      "answer": 2,
      "explanation": "Les textes et formes fournissent des repères complémentaires.",
      "id": "cssi-m5-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "pseudo-classe d’état",
      "definition": "Sélecteur lié à une situation du contrôle, comme :checked ou :invalid."
    },
    {
      "term": "état natif",
      "definition": "Situation définie par le contrôle HTML et ses contraintes."
    },
    {
      "term": "repère complémentaire",
      "definition": "Indice textuel ou de forme qui ajoute une information à la couleur."
    }
  ],
  "recap_fr": [
    "Faire dépendre les styles des états natifs checked, disabled et invalid.",
    "Préserver texte, formes et descriptions en complément des couleurs.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "pseudo-classe d’état",
    "état natif",
    "repère complémentaire"
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
      "title": "MDN — :checked",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:checked"
    },
    {
      "title": "MDN — :disabled",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled"
    },
    {
      "title": "MDN — :invalid",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid"
    },
    {
      "title": "WAI — Use of Color",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document."
}
---

## Explication pas à pas

Un état de contrôle doit rester compréhensible lorsque les couleurs sont mal distinguées, lorsque la page est imprimée ou lorsque la personne parcourt rapidement les éléments. CSS peut renforcer un état déjà présent dans HTML ; il ne doit pas devenir l’unique source de sa signification. Les exemples du club utilisent donc des libellés, une marque textuelle et des styles de bordure, en plus des couleurs.

:checked correspond à une case ou une option cochée selon le contrôle. Le sélecteur input:checked suivi du combinateur ~ permet ici de montrer une marque Choisi située après la case dans le même label. La marque existe déjà comme texte dans le HTML ; CSS règle seulement son affichage. La case native conserve également son propre signe de sélection. Une bordure et une graisse différente ajoutent des repères, mais ne remplacent pas le nom de l’option.

:disabled décrit un contrôle réellement désactivé par HTML. Une simple couleur grise ou pointer-events:none ne crée pas cet état : cette dernière propriété peut bloquer une interaction de pointeur sans fournir la même sémantique ni la même règle clavier. Le bouton indisponible de la fixture porte disabled et une description visible expliquant l’absence de service. Nous gardons le texte lisible et l’opacité à un, avec bordure pointillée. Le curseur n’est qu’un indice supplémentaire pour certains usages.

:invalid reflète les contraintes natives d’un contrôle, par exemple type=email et required. Dans notre exemple, incomplet échoue au format d’adresse, tandis que afi@example.test réussit ce contrôle syntaxique. Cela ne vérifie ni l’existence ni la délivrabilité d’une adresse. Le message Format à corriger est relié au champ par aria-describedby. La bordure épaissie et le texte rendent le problème perceptible sans demander d’interpréter seulement une teinte brune.

Le choix de :invalid a une conséquence de conception : un champ requis vide peut être invalide dès l’ouverture, avant toute action. Les activités montrent volontairement des valeurs initiales pour étudier les styles. Elles ne prétendent pas définir le meilleur moment d’affichage des erreurs dans tout produit. Une expérience qui attend une soumission ou une interaction demanderait une politique supplémentaire. CSS ne met pas non plus automatiquement à jour des attributs ARIA écrits comme un scénario statique.

Vérifie les états par paires : sélectionné et non sélectionné, disponible et désactivé, valide et invalide. C’est plus probant qu’une règle unique donnant une apparence d’erreur à tous les champs. Le mini-projet ajoute le focus visible du module précédent au bouton disponible. Les contrôles automatiques lisent les états initiaux et les styles calculés ; une revue humaine doit encore examiner l’ordre, la compréhension et le déclenchement des messages. Les formulaires et commandes restent fictifs : aucun envoi ni traitement métier n’est connecté à l’aperçu.

## Exemple guidé 1

```css
.option { display: block; margin-block: 12px; }
.badge { display: none; margin-inline-start: 8px; padding-inline-start: 8px; border-inline-start: 4px solid #164e63; font-weight: 700; }
.option input:checked ~ .badge { display: inline; }
```

## Exemple guidé 2

```css
.champ { display: block; border: 1px solid #64748b; padding: 8px; }
.erreur { display: none; color: #9a3412; font-weight: 700; }
.champ:invalid { border: 3px solid #9a3412; }
.champ:invalid + .erreur { display: block; }
```

