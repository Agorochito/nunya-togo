---
{
  "id": "cssi-m5-03",
  "title_fr": "Définir des thèmes locaux avec des rôles de couleur",
  "course": "css-intermediaire",
  "module": "m5",
  "order": 15,
  "minutes": 20,
  "prerequisites": [
    "cssi-m5-02"
  ],
  "outcomes": [
    "Définir des palettes locales par rôles hérités et variantes explicites.",
    "Examiner couleurs, fonds et états sans confondre tests de valeurs et évaluation de contraste."
  ],
  "idea_fr": "Définir des palettes locales par rôles hérités et variantes explicites.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": "body { font: 16px/1.5 sans-serif; }\n.theme {\n  --surface: #ffffff;\n  --texte: #172a3a;\n  --secondaire: #334155;\n  --accent: #164e63;\n  --ligne: #475569;\n  --action-fond: #164e63;\n  --action-texte: #ffffff;\n  --focus: #9a3412;\n  color: var(--texte);\n  background-color: var(--surface);\n  padding: 16px;\n}\n.theme[data-theme=\"sombre\"] {\n  --surface: #172a3a;\n  --texte: #f8fafc;\n  --secondaire: #cbd5e1;\n  --accent: #bae6fd;\n  --ligne: #94a3b8;\n  --action-fond: #bae6fd;\n  --action-texte: #172a3a;\n  --focus: #fbbf24;\n}\n.theme .resume { color: var(--secondaire); }\n.theme .lien { color: var(--accent); text-decoration: underline; }",
      "inputs": [],
      "expected_output": "Le panneau clair a un fond blanc et un texte sombre ; le panneau sombre inverse ces rôles de manière locale sans modifier son voisin.",
      "trace_fr": [
        "Les rôles sont définis sur .theme.",
        "La variante sombre ne redéfinit que ses propres valeurs héritées.",
        "Les liens et textes secondaires consomment les rôles correspondants."
      ],
      "browser_test": {
        "description_fr": "Deux portées locales",
        "checks": [
          {
            "selector": "#clair",
            "style": {
              "color": "#172a3a",
              "background-color": "#ffffff"
            }
          },
          {
            "selector": "#sombre",
            "style": {
              "color": "#f8fafc",
              "background-color": "#172a3a"
            }
          },
          {
            "selector": "#sombre .resume",
            "style": {
              "color": "#cbd5e1"
            }
          }
        ]
      },
      "fixture_html": "<main><h1>Deux présentations du même club fictif</h1><section id=\"clair\" class=\"theme\" data-theme=\"clair\" aria-labelledby=\"titre-clair\"><h2 id=\"titre-clair\">Thème clair</h2><p class=\"resume\">Rencontres de lecture et de jardinage.</p><article class=\"carte\"><h3>Lecture</h3><p>Une activité fictive.</p></article><a id=\"lien-clair\" class=\"lien\" href=\"#suite\">Lire les détails</a><button class=\"commande\" type=\"button\">Examiner l’essai</button></section><section id=\"sombre\" class=\"theme\" data-theme=\"sombre\" aria-labelledby=\"titre-sombre\"><h2 id=\"titre-sombre\">Thème sombre</h2><p class=\"resume\">Les mêmes informations dans une autre palette.</p><article class=\"carte\"><h3>Lecture</h3><p>Une activité fictive.</p></article><a id=\"lien-sombre\" class=\"lien\" href=\"#suite\">Lire les détails</a><button class=\"commande\" type=\"button\">Examiner l’essai</button></section><p id=\"suite\">Contenu local ; aucun bouton ne change automatiquement le thème.</p></main>"
    },
    {
      "code": "body { font: 16px/1.5 sans-serif; }\n.theme {\n  --surface: #ffffff;\n  --texte: #172a3a;\n  --secondaire: #334155;\n  --accent: #164e63;\n  --ligne: #475569;\n  --action-fond: #164e63;\n  --action-texte: #ffffff;\n  --focus: #9a3412;\n  color: var(--texte);\n  background-color: var(--surface);\n  padding: 16px;\n}\n.theme[data-theme=\"sombre\"] {\n  --surface: #172a3a;\n  --texte: #f8fafc;\n  --secondaire: #cbd5e1;\n  --accent: #bae6fd;\n  --ligne: #94a3b8;\n  --action-fond: #bae6fd;\n  --action-texte: #172a3a;\n  --focus: #fbbf24;\n}\n.theme .resume { color: var(--secondaire); }\n.theme .lien { color: var(--accent); text-decoration: underline; }.commande { color: var(--action-texte); background-color: var(--action-fond); border: 2px solid var(--ligne); padding: 8px 12px; }.carte { color: var(--texte); background-color: var(--surface); border: 1px solid var(--ligne); padding: 16px; }\n.lien:focus, .commande:focus { outline: 3px solid var(--focus, #9a3412); outline-offset: 3px; }",
      "inputs": [],
      "expected_output": "Les commandes utilisent des paires texte/fond propres à chaque thème ; le lien sombre focalisé reçoit un contour jaune distinct.",
      "trace_fr": [
        "Le bouton a deux rôles dédiés qui changent ensemble.",
        "La carte reprend la surface et le texte hérités.",
        "Le focus sombre vient de son rôle local, pas d’une couleur globale."
      ],
      "browser_test": {
        "description_fr": "Commande et focus sombre",
        "checks": [
          {
            "selector": "#sombre .commande",
            "style": {
              "color": "#172a3a",
              "background-color": "#bae6fd"
            }
          },
          {
            "selector": "#lien-sombre:focus",
            "style": {
              "outline-style": "solid",
              "outline-width": "3px",
              "outline-color": "#fbbf24",
              "outline-offset": "3px"
            }
          }
        ],
        "focus_selector": "#lien-sombre"
      },
      "fixture_html": "<main><h1>Deux présentations du même club fictif</h1><section id=\"clair\" class=\"theme\" data-theme=\"clair\" aria-labelledby=\"titre-clair\"><h2 id=\"titre-clair\">Thème clair</h2><p class=\"resume\">Rencontres de lecture et de jardinage.</p><article class=\"carte\"><h3>Lecture</h3><p>Une activité fictive.</p></article><a id=\"lien-clair\" class=\"lien\" href=\"#suite\">Lire les détails</a><button class=\"commande\" type=\"button\">Examiner l’essai</button></section><section id=\"sombre\" class=\"theme\" data-theme=\"sombre\" aria-labelledby=\"titre-sombre\"><h2 id=\"titre-sombre\">Thème sombre</h2><p class=\"resume\">Les mêmes informations dans une autre palette.</p><article class=\"carte\"><h3>Lecture</h3><p>Une activité fictive.</p></article><a id=\"lien-sombre\" class=\"lien\" href=\"#suite\">Lire les détails</a><button class=\"commande\" type=\"button\">Examiner l’essai</button></section><p id=\"suite\">Contenu local ; aucun bouton ne change automatiquement le thème.</p></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Changer seulement le fond d’un bouton",
      "why_fr": "La couleur de son texte peut devenir inadaptée au nouveau fond.",
      "fix_fr": "Définis et évalue les deux rôles ensemble."
    },
    {
      "error": "Déclarer une certification depuis quelques styles",
      "why_fr": "Les tests ne calculent pas le contraste ni tous les critères.",
      "fix_fr": "Distingue valeurs vérifiées, mesures et expérience humaine."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi utiliser des noms de rôles plutôt que couleur1/couleur2 ?",
      "options": [
        "Ils certifient automatiquement WCAG.",
        "Ils déclenchent une préférence système.",
        "Ils empêchent tout héritage.",
        "Ils décrivent l’usage et les paires à évaluer."
      ],
      "answer": 3,
      "explanation": "Les rôles rendent les décisions de palette compréhensibles et réutilisables.",
      "id": "cssi-m5-03-q1"
    },
    {
      "question": "Les tests de cette leçon mesurent-ils un rapport de contraste ?",
      "options": [
        "Seulement dans le thème sombre.",
        "Ils remplacent les revues au clavier.",
        "Non, ils inspectent seulement les valeurs calculées demandées.",
        "Oui, tout code hexadécimal valide garantit4,5:1."
      ],
      "answer": 2,
      "explanation": "Une vraie évaluation du contraste doit mesurer les couleurs effectives dans leur contexte.",
      "id": "cssi-m5-03-q2"
    },
    {
      "question": "Que change data-theme=sombre dans le projet ?",
      "options": [
        "Le texte de toutes les pages ouvertes.",
        "La portée locale ciblée par les règles CSS.",
        "Un compte de préférence enregistré sur serveur.",
        "Le thème du système d’exploitation."
      ],
      "answer": 1,
      "explanation": "L’attribut est fourni dans le HTML ; il n’existe aucun changement programmé ici.",
      "id": "cssi-m5-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "token de thème",
      "definition": "Propriété personnalisée représentant un rôle de présentation."
    },
    {
      "term": "portée locale",
      "definition": "Sous-arbre dans lequel une valeur est définie puis héritée."
    },
    {
      "term": "contraste",
      "definition": "Relation de luminance entre un premier plan et son arrière-plan effectif."
    }
  ],
  "recap_fr": [
    "Définir des palettes locales par rôles hérités et variantes explicites.",
    "Examiner couleurs, fonds et états sans confondre tests de valeurs et évaluation de contraste.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "token de thème",
    "portée locale",
    "contraste"
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
      "title": "MDN — Custom properties",
      "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
    },
    {
      "title": "WAI — Contrast Minimum",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
    },
    {
      "title": "WAI — Non-text Contrast",
      "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document."
}
---

## Explication pas à pas

Un thème est un ensemble de choix cohérents, pas un filtre qui inverse toute la page. La couleur de fond, le texte, les liens, les bordures et les indicateurs d’état doivent rester compatibles. Le club présente ici deux panneaux portant un attribut data-theme différent. Ils montrent le même type de contenu sans JavaScript, sans préférence système simulée et sans bouton qui prétend changer cet attribut.

Les propriétés personnalisées représentent des rôles : surface, texte, secondaire, accent et focus. Elles sont définies sur .theme puis héritées par ses descendants. La variante [data-theme="sombre"] redéfinit les rôles dans son propre sous-arbre. Ainsi une carte utilise var(--texte) et var(--surface), sans décider elle-même quel thème est actif. Le panneau voisin conserve ses valeurs claires. La portée locale permet aussi d’insérer plus tard un encart sombre dans une page claire.

Les actions demandent deux rôles complémentaires. Un bouton à fond bleu profond porte ici un texte blanc dans le thème clair ; dans le thème sombre, le fond devient bleu clair et le texte bleu très sombre. Changer seulement le fond en laissant un texte blanc donnerait une paire différente, potentiellement difficile à lire. Les liens, eux, restent soulignés : leur reconnaissance ne doit pas dépendre uniquement de la différence de teinte avec le paragraphe.

Le contraste est une relation entre un premier plan et son arrière-plan effectif. Pour le texte courant, le critère WCAG2.2 de niveau AA utilise généralement un rapport minimal de4,5:1 ; le grand texte et certains cas particuliers ont d’autres règles. Ce rapport ne se lit pas dans la différence numérique de deux codes hexadécimaux. Une vraie évaluation doit tenir compte des couleurs composées, des fonds, des états et des contenus concernés. Les petits tests de cet atelier ne calculent pas ce rapport et n’accordent aucune certification.

Dans le débogage, une carte semble correcte en clair mais garde des couleurs codées en dur à l’intérieur du panneau sombre. La réparation consiste à lui faire consommer les rôles hérités, pas à recopier deux grands blocs de style pour toutes les cartes. Vérifie le texte secondaire aussi : il reste un contenu à lire, même s’il est moins saillant. L’opacité peut modifier le résultat final ; elle n’est pas utilisée ici pour atténuer arbitrairement les informations.

Le projet ajoute un contour de focus dont le rôle change avec le thème. Les tests focalisent un lien de chaque panneau et inspectent les couleurs réellement calculées. Ils prouvent la portée des variables et les valeurs sélectionnées, pas toute la lisibilité de l’interface. Complète cette revue par une mesure de contraste appropriée et un parcours humain avec zoom et clavier. Explique pourquoi chaque couleur existe et avec quel fond elle doit être évaluée ; c’est plus transférable qu’une collection de noms décoratifs.

## Exemple guidé 1

```css
body { font: 16px/1.5 sans-serif; }
.theme {
  --surface: #ffffff;
  --texte: #172a3a;
  --secondaire: #334155;
  --accent: #164e63;
  --ligne: #475569;
  --action-fond: #164e63;
  --action-texte: #ffffff;
  --focus: #9a3412;
  color: var(--texte);
  background-color: var(--surface);
  padding: 16px;
}
.theme[data-theme="sombre"] {
  --surface: #172a3a;
  --texte: #f8fafc;
  --secondaire: #cbd5e1;
  --accent: #bae6fd;
  --ligne: #94a3b8;
  --action-fond: #bae6fd;
  --action-texte: #172a3a;
  --focus: #fbbf24;
}
.theme .resume { color: var(--secondaire); }
.theme .lien { color: var(--accent); text-decoration: underline; }
```

## Exemple guidé 2

```css
body { font: 16px/1.5 sans-serif; }
.theme {
  --surface: #ffffff;
  --texte: #172a3a;
  --secondaire: #334155;
  --accent: #164e63;
  --ligne: #475569;
  --action-fond: #164e63;
  --action-texte: #ffffff;
  --focus: #9a3412;
  color: var(--texte);
  background-color: var(--surface);
  padding: 16px;
}
.theme[data-theme="sombre"] {
  --surface: #172a3a;
  --texte: #f8fafc;
  --secondaire: #cbd5e1;
  --accent: #bae6fd;
  --ligne: #94a3b8;
  --action-fond: #bae6fd;
  --action-texte: #172a3a;
  --focus: #fbbf24;
}
.theme .resume { color: var(--secondaire); }
.theme .lien { color: var(--accent); text-decoration: underline; }.commande { color: var(--action-texte); background-color: var(--action-fond); border: 2px solid var(--ligne); padding: 8px 12px; }.carte { color: var(--texte); background-color: var(--surface); border: 1px solid var(--ligne); padding: 16px; }
.lien:focus, .commande:focus { outline: 3px solid var(--focus, #9a3412); outline-offset: 3px; }
```

