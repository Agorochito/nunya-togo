---
{
  "id": "htmi-m4-01",
  "title_fr": "Distinguer langue, direction et isolation des noms",
  "course": "html-intermediaire",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "htmi-m3-03"
  ],
  "outcomes": [
    "Déclarer séparément langue et direction aux bons niveaux.",
    "Isoler des noms insérés sans forcer l’ordre de leurs caractères."
  ],
  "idea_fr": "Déclarer séparément langue et direction aux bons niveaux.",
  "analogy_fr": "Le club fictif prépare un document dont les repères doivent rester compréhensibles lorsque la langue, la largeur ou l’état des contrôles changent.",
  "examples": [
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Directions — Club Rivage</title>\n  <meta name=\"description\" content=\"Annuaire fictif du club, sans collecte de données.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<main id=\"contenu\">\n  <h1>Deux sens de lecture</h1>\n  <p id=\"texte-fr\">Présentation du club fictif.</p>\n  <section id=\"invitation\" lang=\"ar\" dir=\"rtl\" aria-labelledby=\"titre-ar\">\n    <h2 id=\"titre-ar\">أهلاً وسهلاً</h2>\n    <p id=\"message-ar\">مرحباً</p>\n  </section>\n  <p id=\"reference\">Référence : <bdi id=\"code\" dir=\"ltr\">CLUB-12</bdi></p>\n</main>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "La page reste française et de gauche à droite ; une section arabe possède son propre sens, et CLUB-12 reste un fragment latin.",
      "trace_fr": [
        "lang et dir sont deux attributs indépendants.",
        "La section limite la direction rtl à son propre contenu.",
        "Le code annonce explicitement ltr."
      ],
      "browser_test": {
        "description_fr": "Langue et direction locales",
        "checks": [
          {
            "selector": "html",
            "attributes": {
              "lang": "fr",
              "dir": "ltr"
            }
          },
          {
            "selector": "#invitation",
            "attributes": {
              "lang": "ar",
              "dir": "rtl"
            },
            "style": {
              "direction": "rtl"
            }
          },
          {
            "selector": "#code",
            "attributes": {
              "dir": "ltr"
            },
            "textIncludes": "CLUB-12"
          }
        ]
      }
    },
    {
      "code": "<!doctype html>\n<html lang=\"fr\" dir=\"ltr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Noms — Club Rivage</title>\n  <meta name=\"description\" content=\"Annuaire fictif du club, sans collecte de données.\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n<main id=\"contenu\">\n  <h1>Contacts fictifs</h1>\n  <p id=\"fiche\">Contact : <bdi id=\"nom\" dir=\"auto\" lang=\"ar\">أمل</bdi> — 12 ateliers.</p>\n  <p id=\"note\">Le nom est isolé ; la phrase reste en français.</p>\n</main>\n</body>\n</html>",
      "inputs": [],
      "expected_output": "Le nom fictif arabe est isolé dans une phrase française, sans inclure le tiret ni le nombre dans bdi.",
      "trace_fr": [
        "bdi crée la frontière d’isolation.",
        "dir=auto laisse le contenu choisir son sens.",
        "La phrase environnante et le compteur restent hors du nom."
      ],
      "browser_test": {
        "description_fr": "Isolation ciblée",
        "checks": [
          {
            "selector": "#nom",
            "attributes": {
              "dir": "auto",
              "lang": "ar"
            },
            "textIncludes": "أمل"
          },
          {
            "selector": "#fiche > bdi",
            "count": 1
          },
          {
            "selector": "#fiche",
            "textIncludes": "12 ateliers"
          },
          {
            "selector": "bdo",
            "exists": false
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser lang pour changer le sens visuel",
      "why_fr": "Une langue et une direction ne sont pas interchangeables.",
      "fix_fr": "Déclare dir séparément quand le contexte le demande."
    },
    {
      "error": "Utiliser bdo pour un nom ordinaire",
      "why_fr": "L’ordre est forcé au lieu d’être isolé.",
      "fix_fr": "Choisis bdi avec une direction automatique lorsque c’est le besoin."
    }
  ],
  "quiz": [
    {
      "question": "Que décrit lang ?",
      "options": [
        "Une traduction à télécharger.",
        "Le pays de résidence du contact.",
        "La langue du contenu.",
        "Le sens de toutes les marges."
      ],
      "answer": 2,
      "explanation": "Langue et direction répondent à deux questions distinctes.",
      "id": "htmi-m4-01-q1"
    },
    {
      "question": "Pourquoi choisir bdi pour un nom inséré ?",
      "options": [
        "Pour rendre la phrase entière arabe.",
        "Pour isoler sa direction du contexte.",
        "Pour inverser obligatoirement chaque caractère.",
        "Pour valider l’identité du contact."
      ],
      "answer": 1,
      "explanation": "L’isolation permet au fragment et à son voisinage de garder des comportements indépendants.",
      "id": "htmi-m4-01-q2"
    },
    {
      "question": "Que garantit le contrôle automatique de cette leçon ?",
      "options": [
        "Les attributs et frontières explicitement vérifiés.",
        "La prononciation de tous les lecteurs d’écran.",
        "Une traduction exacte de toutes les langues.",
        "La sécurité d’un annuaire réel."
      ],
      "answer": 0,
      "explanation": "Les vérifications de structure doivent être complétées par une lecture humaine.",
      "id": "htmi-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "lang",
      "definition": "Attribut qui annonce la langue du contenu."
    },
    {
      "term": "dir",
      "definition": "Attribut qui annonce ou détermine une direction de présentation."
    },
    {
      "term": "isolation bidirectionnelle",
      "definition": "Frontière qui limite l’influence directionnelle d’un fragment sur son contexte."
    }
  ],
  "recap_fr": [
    "Déclarer séparément langue et direction aux bons niveaux.",
    "Isoler des noms insérés sans forcer l’ordre de leurs caractères.",
    "Compléter les contrôles automatiques par une revue humaine expliquée."
  ],
  "tags": [
    "html",
    "intermédiaire",
    "lang",
    "dir",
    "isolation bidirectionnelle"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "html",
  "runtime": "html",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-07",
  "references": [
    {
      "title": "WHATWG — lang et dir",
      "url": "https://html.spec.whatwg.org/multipage/dom.html#the-lang-and-xml:lang-attributes"
    },
    {
      "title": "MDN — bdi",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi"
    }
  ],
  "technical_scope_fr": "HTML Living Standard et CSS des modules cités ; documentation primaire consultée le 7 novembre 2026. Explications et activités originales Nunya.",
  "environment_fr": "Aperçu réel de navigateur isolé. HTML/CSS seulement : scripts, réseau et envois de formulaires bloqués ; aucune collecte, compte ou inscription. Les relations de navigation sont inspectées, les liens de l’aperçu sont neutralisés. Code et progression sauvegardés, pas l’état temporaire du document."
}
---

## Explication pas à pas

Un annuaire peut être principalement français tout en contenant un slogan anglais ou un nom qui se lit de droite à gauche. Trois décisions différentes sont nécessaires : déclarer la langue, annoncer le sens de lecture et isoler un fragment dont la direction ne doit pas perturber son voisinage. Les confondre produit parfois une page visuellement plausible mais mal décrite pour les outils qui la parcourent.

L’attribut lang sur html déclare la langue principale du document. Avec fr, les textes héritent du français, sauf indication locale. Une expression anglaise connue reçoit lang="en" sur l’élément qui la contient. Cela aide notamment les outils de prononciation et certains traitements linguistiques. Ce n’est ni une traduction automatique ni un choix de drapeau. La langue d’un nom propre ne se devine pas toujours ; indique une langue locale lorsque cette information est réellement connue.

L’attribut dir répond à une autre question : le sens de présentation. ltr signifie de gauche à droite et rtl de droite à gauche. Une section arabe peut donc porter lang="ar" et dir="rtl". Un code latin placé dans cette section peut demander sa propre direction ltr. Le document français garde ltr à sa racine ; ne retourne pas toute la page pour un seul fragment. Les marges logiques en CSS pourront ensuite suivre cette direction sans changer la structure HTML.

Les textes mixtes posent surtout problème autour des nombres et de la ponctuation. L’algorithme bidirectionnel du navigateur détermine l’ordre visuel à partir des caractères et de leur contexte. bdi crée une isolation : le fragment ne doit pas imposer sa direction aux caractères extérieurs. Avec dir="auto", le navigateur détermine son sens à partir de son contenu. C’est utile pour un nom inséré dans une phrase française dont les autres morceaux doivent rester stables.

Dans l’exemple des contacts, le nom arabe est placé dans bdi, tandis que le tiret et le nombre d’ateliers restent hors du fragment. Lis la structure avant de juger uniquement l’écran : la phrase est française, le nom possède une langue connue et son sens est isolé. bdo répondrait à un autre besoin, celui d’imposer un ordre de caractères ; il n’est pas la réparation adaptée à cet annuaire. L’isolation n’est pas non plus une protection contre des données dangereuses.

Les activités passent du document à une section, puis à plusieurs noms. Les contrôles vérifient les attributs et les frontières choisies, sans prétendre tester toutes les langues ni la prononciation d’un lecteur d’écran. Complète-les par une lecture de phrases comprenant nom, ponctuation et nombre, puis explique pourquoi chaque attribut est placé à cet endroit. Tous les contacts sont fictifs et aucun message n’est envoyé depuis l’aperçu.

## Exemple guidé 1

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Directions — Club Rivage</title>
  <meta name="description" content="Annuaire fictif du club, sans collecte de données.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<main id="contenu">
  <h1>Deux sens de lecture</h1>
  <p id="texte-fr">Présentation du club fictif.</p>
  <section id="invitation" lang="ar" dir="rtl" aria-labelledby="titre-ar">
    <h2 id="titre-ar">أهلاً وسهلاً</h2>
    <p id="message-ar">مرحباً</p>
  </section>
  <p id="reference">Référence : <bdi id="code" dir="ltr">CLUB-12</bdi></p>
</main>
</body>
</html>
```

## Exemple guidé 2

```html
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Noms — Club Rivage</title>
  <meta name="description" content="Annuaire fictif du club, sans collecte de données.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<main id="contenu">
  <h1>Contacts fictifs</h1>
  <p id="fiche">Contact : <bdi id="nom" dir="auto" lang="ar">أمل</bdi> — 12 ateliers.</p>
  <p id="note">Le nom est isolé ; la phrase reste en français.</p>
</main>
</body>
</html>
```

