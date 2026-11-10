---
{
  "id": "htmi-m1-03",
  "title_fr": "Donner du sens aux dates, abréviations et liens",
  "course": "html-intermediaire",
  "module": "m1",
  "order": 3,
  "minutes": 20,
  "prerequisites": [
    "htmi-m1-02"
  ],
  "outcomes": [
    "Associer un texte lisible à des éléments sémantiques adaptés.",
    "Écrire des intitulés de liens qui annoncent leur destination et leur sujet."
  ],
  "idea_fr": "La sémantique apporte une information précise au texte sans remplacer son explication visible.",
  "analogy_fr": "Une affiche donne à la fois une date compréhensible, une référence précise et des indications de destination.",
  "examples": [
    {
      "code": "<article>\n  <h2>Rencontre de lecture fictive</h2>\n  <p>Rendez-vous le <time id=\"date\" datetime=\"2026-11-21\">21 novembre 2026</time>\n     à <time id=\"heure\" datetime=\"14:30\">14 h 30</time>, heure locale annoncée.</p>\n  <p><strong>Utiliser uniquement du matériel de démonstration.</strong></p>\n</article>",
      "expected_output": "La date et l’heure visibles possèdent chacune une valeur normalisée concordante ; la consigne importante est marquée strong.",
      "inputs": [],
      "trace_fr": [
        "La date humaine contient le jour, le mois et l’année annoncés.",
        "Son datetime encode la même date dans l’ordre année-mois-jour.",
        "L’heure utilise 14:30 et reste explicitement locale dans le texte.",
        "La consigne importante est distinguée sans créer une action ni un service."
      ],
      "browser_test": {
        "description_fr": "Informations temporelles concordantes",
        "checks": [
          {
            "selector": "time#date",
            "attributes": {
              "datetime": "2026-11-21"
            },
            "textIncludes": "21 novembre 2026"
          },
          {
            "selector": "time#heure",
            "attributes": {
              "datetime": "14:30"
            },
            "textIncludes": "14 h 30"
          },
          {
            "selector": "strong",
            "textIncludes": "Utiliser uniquement du matériel de démonstration."
          }
        ]
      }
    },
    {
      "code": "<main>\n  <h1>Préparer la rencontre</h1>\n  <p>Atelier de lecture et d’écriture (<abbr id=\"sigle\" title=\"Atelier de lecture et d’écriture\">ALE</abbr>).</p>\n  <p><a href=\"#materiel\">Consulter le matériel de l’atelier ALE</a></p>\n  <section id=\"materiel\"><h2>Matériel de l’atelier ALE</h2><p>Un cahier fictif et un livre.</p></section>\n</main>",
      "expected_output": "Le développement du sigle reste visible et le lien annonce une section de matériel réellement présente.",
      "inputs": [],
      "trace_fr": [
        "Le paragraphe fournit d’abord le développement complet en texte.",
        "abbr associe ALE au même développement dans title.",
        "Le lien annonce le matériel et l’atelier concerné.",
        "La cible #materiel possède un titre correspondant à cette annonce."
      ],
      "browser_test": {
        "description_fr": "Sigle expliqué et destination explicite",
        "checks": [
          {
            "selector": "#sigle",
            "attributes": {
              "title": "Atelier de lecture et d’écriture"
            },
            "textIncludes": "ALE"
          },
          {
            "selector": "main > p",
            "textIncludes": "Atelier de lecture et d’écriture"
          },
          {
            "selector": "a[href=\"#materiel\"]",
            "textIncludes": "Consulter le matériel de l’atelier ALE"
          },
          {
            "selector": "section#materiel > h2",
            "textIncludes": "Matériel de l’atelier ALE"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Date visible différente de datetime",
      "why_fr": "Deux représentations du même événement se contredisent.",
      "fix_fr": "Vérifie jour, mois et année ensemble."
    },
    {
      "error": "Sigle expliqué seulement au survol",
      "why_fr": "L’information n’est pas disponible de la même façon pour tous.",
      "fix_fr": "Développe-le à sa première occurrence visible."
    },
    {
      "error": "Lien nommé ici",
      "why_fr": "La destination et son sujet restent flous.",
      "fix_fr": "Nomme ce qui sera consulté."
    }
  ],
  "quiz": [
    {
      "question": "Que doit représenter datetime dans time ?",
      "options": [
        "Une date choisie uniquement pour le style.",
        "Un ordre de téléchargement.",
        "Un rappel automatique créé dans un calendrier.",
        "La même information temporelle que le texte, dans un format valide."
      ],
      "answer": 3,
      "explanation": "L’attribut complète la représentation, sans créer un service.",
      "id": "htmi-m1-03-q1"
    },
    {
      "question": "Pourquoi développer aussi ALE dans le texte visible ?",
      "options": [
        "Parce que title imprime toujours une nouvelle ligne.",
        "Pour envoyer le sigle à un serveur.",
        "Pour ne pas dépendre uniquement de l’accès à title.",
        "Pour interdire l’usage de abbr."
      ],
      "answer": 2,
      "explanation": "Le développement doit rester disponible dans plusieurs modes de consultation.",
      "id": "htmi-m1-03-q2"
    },
    {
      "question": "Quelle différence motive em et strong ?",
      "options": [
        "em est réservé aux dates.",
        "em porte un accent de sens ; strong une importance forte.",
        "Les deux sont uniquement des commandes de taille.",
        "strong transforme toujours le texte en lien."
      ],
      "answer": 1,
      "explanation": "Le choix est sémantique avant d’être visuel.",
      "id": "htmi-m1-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "time",
      "definition": "Élément représentant une information temporelle lisible."
    },
    {
      "term": "datetime",
      "definition": "Valeur normalisée associée à une information temporelle."
    },
    {
      "term": "abbr",
      "definition": "Élément marquant une abréviation ou un sigle."
    },
    {
      "term": "intitulé explicite",
      "definition": "Texte de lien annonçant son objet ou sa destination."
    }
  ],
  "recap_fr": [
    "Associer un texte lisible à des éléments sémantiques adaptés.",
    "Écrire des intitulés de liens qui annoncent leur destination et leur sujet.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "time",
    "datetime",
    "abbr",
    "intitulé explicite"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "environment_fr": "Document HTML réel, analysé et rendu dans une iframe isolée. Les contrôles inspectent éléments, textes et attributs. Les scripts, médias distants, envois de formulaire et activations de liens sont bloqués dans cet aperçu ; aucun service ni collecte réelle.",
  "references": [
    {
      "title": "WHATWG — Sémantique du texte, time, abbr et liens",
      "url": "https://html.spec.whatwg.org/multipage/text-level-semantics.html"
    }
  ],
  "sources": [
    {
      "title": "WHATWG — Sémantique du texte, time, abbr et liens",
      "url": "https://html.spec.whatwg.org/multipage/text-level-semantics.html",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-07"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 7 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---

## Explication pas à pas

Une annonce peut paraître claire visuellement tout en laissant ses relations difficiles à interpréter. Le texte « 12 décembre » ne précise pas nécessairement l’année ; « cliquez ici » n’annonce pas ce qui sera consulté ; un sigle peut rester inconnu à une nouvelle personne. Le HTML sémantique aide à représenter ces informations, mais il ne doit pas servir à cacher les explications qui rendent la phrase compréhensible.

time associe une expression humaine à une valeur exploitable par les logiciels. Pour une date complète, datetime="2026-12-12" utilise année, mois et jour dans un format normalisé, tandis que le contenu peut afficher « 12 décembre 2026 ». Pour une heure locale, datetime="15:00" correspond ici à « 15 h ». Le texte visible et l’attribut doivent décrire la même information. Écrire une autre date uniquement pour passer un contrôle créerait une contradiction dans le document.

Une date et une heure sans décalage ne définissent pas automatiquement un instant universel. Nos annonces précisent qu’il s’agit de l’heure locale indiquée par le club fictif. Aucun calendrier, rappel ou réservation n’est créé dans cet aperçu. Le rôle de time est de représenter l’information annoncée ; le comportement d’un service de calendrier demanderait d’autres choix, notamment sur le fuseau et le contexte de l’événement.

abbr marque une abréviation ou un sigle. Son attribut title peut donner son développement complet. Cependant, cette indication n’est pas toujours aisément disponible sur un écran tactile ou dans tous les usages assistés. À la première occurrence, nous écrivons donc aussi le développement dans le texte visible, puis le sigle. La page reste compréhensible sans dépendre d’un survol ou d’une présentation particulière de title.

em représente une mise en relief qui porte sur l’accent de la phrase ; strong indique une importance forte. Ces éléments peuvent modifier l’apparence par défaut, mais leur choix n’est pas une commande « italique » ou « gras » destinée à tout texte décoratif. Dans le projet, « ensemble » exprime l’accent de la lecture collective, tandis que la limite « sans inscription réelle » est une information importante sur la démonstration.

Un lien gagne à annoncer son objet : « Consulter les horaires de Lecture » est plus précis que « ici ». href indique ensuite la destination réelle. Pour une ancre locale, l’identifiant doit exister une seule fois et le contenu ciblé doit correspondre à l’intitulé. Ne prétends pas télécharger un document ou ouvrir un formulaire distant quand seule une section de la page existe.

Observe les deux exemples en rapprochant chaque attribut de son texte. Les tests inspectent ces relations sémantiques et les cibles locales, sans déclencher une navigation bloquée dans l’aperçu. Complète-les par une relecture des phrases isolées : le sigle est-il expliqué, la date concorde-t-elle, et le lien conserve-t-il un sens hors de son paragraphe ? Ces décisions améliorent l’information disponible sans constituer une vérification complète de tous les usages.

## Exemple guidé 1

```html
<article>
  <h2>Rencontre de lecture fictive</h2>
  <p>Rendez-vous le <time id="date" datetime="2026-11-21">21 novembre 2026</time>
     à <time id="heure" datetime="14:30">14 h 30</time>, heure locale annoncée.</p>
  <p><strong>Utiliser uniquement du matériel de démonstration.</strong></p>
</article>
```

Résultat attendu : La date et l’heure visibles possèdent chacune une valeur normalisée concordante ; la consigne importante est marquée strong.

Trace :

- La date humaine contient le jour, le mois et l’année annoncés.
- Son datetime encode la même date dans l’ordre année-mois-jour.
- L’heure utilise 14:30 et reste explicitement locale dans le texte.
- La consigne importante est distinguée sans créer une action ni un service.

## Exemple guidé 2

```html
<main>
  <h1>Préparer la rencontre</h1>
  <p>Atelier de lecture et d’écriture (<abbr id="sigle" title="Atelier de lecture et d’écriture">ALE</abbr>).</p>
  <p><a href="#materiel">Consulter le matériel de l’atelier ALE</a></p>
  <section id="materiel"><h2>Matériel de l’atelier ALE</h2><p>Un cahier fictif et un livre.</p></section>
</main>
```

Résultat attendu : Le développement du sigle reste visible et le lien annonce une section de matériel réellement présente.

Trace :

- Le paragraphe fournit d’abord le développement complet en texte.
- abbr associe ALE au même développement dans title.
- Le lien annonce le matériel et l’atelier concerné.
- La cible #materiel possède un titre correspondant à cette annonce.

## Vérifier et expliquer

Inspecte les relations du document et relis ses intitulés. Dans un document autonome, examine aussi le clavier et les destinations ; l’aperçu bloque les activations de liens.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [WHATWG — Sémantique du texte, time, abbr et liens](https://html.spec.whatwg.org/multipage/text-level-semantics.html)
