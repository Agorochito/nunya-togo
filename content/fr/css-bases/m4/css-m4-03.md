---
{
  "id": "css-m4-03",
  "title_fr": "Projet : livrer une feuille de style adaptable",
  "course": "css-bases",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "css-m4-02"
  ],
  "outcomes": [
    "Livrer une feuille de style adaptable pour une page associative.",
    "Justifier les boîtes, la disposition et les états de focus."
  ],
  "idea_fr": "Une feuille de style réussie respecte le contenu, la place disponible et les différents modes de navigation.",
  "analogy_fr": "Tu habilles maintenant un lieu déjà organisé : les choix visuels doivent rendre ses usages plus faciles.",
  "examples": [
    {
      "code": "html { font-size:16px; }\nbody { margin:0; font-family:system-ui,sans-serif; line-height:1.5; color:navy; background-color:white; }\n.page { box-sizing:border-box; width:100%; max-width:960px; margin:0 auto; padding:16px; }",
      "expected_output": "À 375px, la page mesure 375px avec 16px d’espace intérieur de chaque côté ; à 1100px, elle se limite à 960px.",
      "trace_fr": [
        "width:100% prend l’espace du parent.",
        "max-width fixe la limite.",
        "border-box inclut le padding dans la largeur."
      ],
      "inputs": [],
      "fixture_html": "<a class=\"evitement\" href=\"#contenu\">Aller au contenu</a><div class=\"page\"><header><h1>Graines ensemble</h1><p>Association fictive de jardinage.</p></header><nav class=\"navigation\" aria-label=\"Principale\"><a href=\"#ateliers\">Ateliers</a><a href=\"#inscription\">Inscription</a></nav><main id=\"contenu\"><section id=\"ateliers\"><h2>Ateliers</h2><div class=\"grille\"><article class=\"carte\"><h3>Semis</h3><p>Découvrir les graines.</p></article><article class=\"carte\"><h3>Compost</h3><p>Comprendre les matières organiques.</p></article></div></section><section id=\"inscription\"><h2>Inscription fictive</h2><form><p class=\"aide\" id=\"aide\">Données fictives uniquement ; aucun envoi réel.</p><div class=\"champ\"><label for=\"prenom\">Prénom</label><input id=\"prenom\" name=\"prenom\" type=\"text\"></div><div class=\"champ\"><label for=\"contact\">Contact, obligatoire</label><input id=\"contact\" name=\"contact\" type=\"email\" required aria-describedby=\"aide\"></div><div class=\"champ\"><label for=\"atelier\">Atelier, obligatoire</label><select id=\"atelier\" name=\"atelier\" required><option value=\"\">Choisir</option><option value=\"semis\">Semis</option><option value=\"compost\">Compost</option></select></div><button class=\"action\" type=\"button\">Vérifier la démonstration</button></form></section></main><footer><p>Projet d’apprentissage fictif.</p></footer></div>"
    },
    {
      "code": ".navigation { display:flex; flex-wrap:wrap; gap:16px; }\n.grille { display:grid; gap:16px; grid-template-columns:minmax(0,1fr); }\n@media (min-width:700px) { .grille { grid-template-columns:repeat(2,minmax(0,1fr)); } }\n.carte { padding:16px; border:1px solid navy; overflow-wrap:anywhere; }",
      "expected_output": "Les cartes s’empilent sous 700px et se partagent deux colonnes au-dessus ; la navigation peut revenir à la ligne.",
      "trace_fr": [
        "Flexbox organise les liens.",
        "Grid organise les cartes.",
        "La condition ne modifie pas l’ordre du document."
      ],
      "inputs": [],
      "fixture_html": "<a class=\"evitement\" href=\"#contenu\">Aller au contenu</a><div class=\"page\"><header><h1>Graines ensemble</h1><p>Association fictive de jardinage.</p></header><nav class=\"navigation\" aria-label=\"Principale\"><a href=\"#ateliers\">Ateliers</a><a href=\"#inscription\">Inscription</a></nav><main id=\"contenu\"><section id=\"ateliers\"><h2>Ateliers</h2><div class=\"grille\"><article class=\"carte\"><h3>Semis</h3><p>Découvrir les graines.</p></article><article class=\"carte\"><h3>Compost</h3><p>Comprendre les matières organiques.</p></article></div></section><section id=\"inscription\"><h2>Inscription fictive</h2><form><p class=\"aide\" id=\"aide\">Données fictives uniquement ; aucun envoi réel.</p><div class=\"champ\"><label for=\"prenom\">Prénom</label><input id=\"prenom\" name=\"prenom\" type=\"text\"></div><div class=\"champ\"><label for=\"contact\">Contact, obligatoire</label><input id=\"contact\" name=\"contact\" type=\"email\" required aria-describedby=\"aide\"></div><div class=\"champ\"><label for=\"atelier\">Atelier, obligatoire</label><select id=\"atelier\" name=\"atelier\" required><option value=\"\">Choisir</option><option value=\"semis\">Semis</option><option value=\"compost\">Compost</option></select></div><button class=\"action\" type=\"button\">Vérifier la démonstration</button></form></section></main><footer><p>Projet d’apprentissage fictif.</p></footer></div>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Cacher les aides pour gagner de la place",
      "why_fr": "La compréhension de la saisie diminue.",
      "fix_fr": "Réorganise les espaces en gardant l’information."
    },
    {
      "error": "Valider seulement la grande largeur",
      "why_fr": "La petite interface et le zoom ne sont pas observés.",
      "fix_fr": "Teste plusieurs contextes et le clavier."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi le projet conserve-t-il le HTML fourni ?",
      "options": [
        "Parce que HTML n’a aucun sens.",
        "Parce que CSS crée les labels.",
        "Parce que les titres sont seulement décoratifs.",
        "Pour vérifier la présentation sans perdre les relations sémantiques déjà établies."
      ],
      "answer": 3,
      "explanation": "La feuille de style complète une structure existante et doit préserver son usage.",
      "id": "css-m4-03-q1"
    },
    {
      "question": "Que vérifient les trois largeurs automatiques ?",
      "options": [
        "Tous les handicaps.",
        "Un serveur d’inscription.",
        "Des contrats de disposition et de dimensions dans ces contextes précis.",
        "Toutes les tailles possibles."
      ],
      "answer": 2,
      "explanation": "Les mesures sont réelles mais limitées ; la revue élargit les situations observées.",
      "id": "css-m4-03-q2"
    },
    {
      "question": "Quand l’interface débutante est-elle prête pour une revue ?",
      "options": [
        "Quand le formulaire est caché sur mobile.",
        "Quand les contrats sont satisfaits, le clavier vérifié et les choix expliqués.",
        "Quand on a seulement consulté la correction.",
        "Quand toutes les règles utilisent !important."
      ],
      "answer": 1,
      "explanation": "Le projet combine résultat technique, usage et explication, sans promettre un niveau avancé.",
      "id": "css-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "livrable",
      "definition": "Résultat concret remis à la fin d’un projet."
    },
    {
      "term": "adaptation",
      "definition": "Ajustement de la présentation aux contraintes d’usage."
    },
    {
      "term": "largeur utile",
      "definition": "Place restante pour le contenu après les espaces prévus."
    }
  ],
  "recap_fr": [
    "Le contenu reste utilisable.",
    "La disposition suit un contrat vérifiable.",
    "Les tests et la revue se complètent."
  ],
  "tags": [
    "css",
    "m4",
    "débutant"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "technical_checked_on": "2026-11-04",
  "project": {
    "context_fr": "Feuille CSS d’une association fictive, HTML fourni, sans envoi réel.",
    "deliverables_fr": [
      "Feuille CSS",
      "Revue de trois largeurs et d’un texte agrandi",
      "Parcours clavier et explication de trois choix"
    ],
    "acceptance_criteria_fr": [
      "Page fluide limitée à 960px",
      "Une puis deux colonnes selon le seuil",
      "Navigation avec retour à la ligne",
      "Champs et labels visibles",
      "Focus visible sur tous les contrôles",
      "Aucun contenu utile masqué"
    ],
    "rubric": [
      {
        "criterion_fr": "Respect et lisibilité du contenu",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Adaptation des boîtes et de la disposition",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Usage clavier et états",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      },
      {
        "criterion_fr": "Explication et limites des vérifications",
        "levels_fr": [
          "À reprendre",
          "Satisfait",
          "Expliqué et vérifié"
        ]
      }
    ],
    "extensions_fr": [
      "Définir une palette avec propriétés personnalisées",
      "Ajouter un thème local vérifié",
      "Ajouter un effet facultatif avec préférence de réduction"
    ]
  },
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

Le dernier projet reprend la page de l’association fictive Graines ensemble. Le HTML est fourni et ne doit pas être réécrit dans l’éditeur CSS. Ton livrable est une feuille de style qui améliore la lecture, organise les ateliers et rend le formulaire confortable sur plusieurs largeurs. Aucune inscription réelle n’est créée. Le projet évalue une première interface débutante, pas une maîtrise complète du design ou de l’accessibilité.

Établis une base de lecture : texte bleu marine sur fond blanc, police système et interligne de 1,5. La page prend la largeur disponible avec une limite de 960px, des espaces intérieurs de 16px et une convention border-box. Cette limite n’est pas une recette universelle ; elle rend ici les calculs et la comparaison reproductibles. Le contenu doit rester visible à 375px, sans largeur fixe trop grande ni hauteur qui coupe les paragraphes.

La navigation utilise Flexbox, un espace de 16px et un retour à la ligne autorisé. Les fiches utilisent Grid : une colonne à petite largeur, deux colonnes égales à partir de 700px. Chaque carte conserve un espace intérieur de 16px et une bordure de 1px. Les textes longs peuvent se couper si nécessaire. Le changement de disposition ne modifie pas l’ordre HTML ; les titres et destinations restent ceux de la page fournie.

Le formulaire conserve des labels visibles, des champs occupant la largeur disponible et un espace de 16px entre ses groupes. Les contrôles prennent la police du contexte. Le bouton possède une paire de couleurs contrastée et un texte lisible. Les liens restent soulignés. Un contour visible apparaît lorsque les liens, champs, listes et boutons reçoivent le focus. Aucun effet de mouvement n’est nécessaire pour ce projet ; tu peux en proposer un ensuite si tu vérifies aussi la préférence de réduction.

Les jalons isolent la base, la disposition et le formulaire, puis la dernière activité rassemble les contrats. La revue examine quatre dimensions : respect du contenu, adaptation, usage clavier et explication des choix. Pour chacune, distingue « à reprendre », « satisfait » et « expliqué et vérifié ». Les tests calculés couvrent plusieurs largeurs et un focus ; termine par un parcours complet au clavier, un texte agrandi et une inspection de la page à des largeurs intermédiaires. Les niveaux suivants et la programmation des interactions viendront dans des cours séparés.

## Exemple guidé 1

```css
html { font-size:16px; }
body { margin:0; font-family:system-ui,sans-serif; line-height:1.5; color:navy; background-color:white; }
.page { box-sizing:border-box; width:100%; max-width:960px; margin:0 auto; padding:16px; }
```

La structure HTML utilisée dans cet exemple est fournie dans ses données et dans l’atelier.

## Exemple guidé 2

```css
.navigation { display:flex; flex-wrap:wrap; gap:16px; }
.grille { display:grid; gap:16px; grid-template-columns:minmax(0,1fr); }
@media (min-width:700px) { .grille { grid-template-columns:repeat(2,minmax(0,1fr)); } }
.carte { padding:16px; border:1px solid navy; overflow-wrap:anywhere; }
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
