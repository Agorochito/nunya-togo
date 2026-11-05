---
{
  "id": "html-m1-01",
  "title_fr": "Créer un document et lire son aperçu",
  "course": "html-bases",
  "module": "m1",
  "order": 1,
  "minutes": 20,
  "prerequisites": [],
  "outcomes": [
    "Construire un squelette HTML en français.",
    "Distinguer contenu visible et métadonnées."
  ],
  "idea_fr": "HTML décrit le rôle et la structure des contenus ; le navigateur en construit une page.",
  "analogy_fr": "Le document ressemble au plan d’une maison : chaque partie a une fonction avant de recevoir une décoration.",
  "examples": [
    {
      "code": "<!doctype html>\n<html lang=\"fr\">\n<head><meta charset=\"utf-8\"><title>Graines ensemble</title></head>\n<body><p>Bienvenue au jardin.</p></body>\n</html>",
      "expected_output": "Dans la page : Bienvenue au jardin. Dans l’onglet : Graines ensemble.",
      "trace_fr": [
        "Le navigateur lit le type de document et la langue.",
        "Il lit les métadonnées dans head.",
        "Il affiche le paragraphe du body."
      ],
      "inputs": []
    },
    {
      "code": "<!doctype html>\n<html lang=\"fr\">\n<head><meta charset=\"utf-8\"><title>Nos ateliers</title></head>\n<body>\n<p>Semer ensemble.</p>\n<p>Partager les récoltes.</p>\n</body></html>",
      "expected_output": "Deux paragraphes distincts : Semer ensemble. puis Partager les récoltes.",
      "trace_fr": [
        "Chaque paire de balises p produit un paragraphe.",
        "Les retours à la ligne du fichier ne remplacent pas ces éléments."
      ],
      "inputs": []
    }
  ],
  "common_mistakes": [
    {
      "error": "Tout placer dans body",
      "why_fr": "Les métadonnées sont confondues avec le contenu.",
      "fix_fr": "Place title et meta dans head."
    },
    {
      "error": "Oublier une fermeture",
      "why_fr": "L’imbrication devient ambiguë.",
      "fix_fr": "Relis les paires de balises de l’intérieur vers l’extérieur."
    }
  ],
  "quiz": [
    {
      "question": "Où se place le nom de l’onglet ?",
      "options": [
        "Dans un paragraphe du body.",
        "Dans l’attribut lang.",
        "Dans le doctype.",
        "Dans title, à l’intérieur de head."
      ],
      "answer": 3,
      "explanation": "title fournit le nom de l’onglet ; le texte du corps est une autre information.",
      "id": "html-m1-01-q1"
    },
    {
      "question": "Que fait principalement HTML ?",
      "options": [
        "Il calcule automatiquement les inscriptions.",
        "Il remplace le navigateur.",
        "Il décrit la structure et le sens des contenus.",
        "Il fixe toujours les couleurs."
      ],
      "answer": 2,
      "explanation": "HTML balise le contenu ; CSS règle la présentation et JavaScript permet des traitements programmés.",
      "id": "html-m1-01-q2"
    },
    {
      "question": "Pourquoi un aperçu visible ne suffit-il pas à prouver un document correct ?",
      "options": [
        "Le titre n’a jamais d’importance.",
        "Le navigateur peut réparer certaines erreurs.",
        "Toute balise est toujours ignorée.",
        "L’indentation corrige les balises."
      ],
      "answer": 1,
      "explanation": "La tolérance du navigateur aide à afficher la page, mais elle ne remplace pas la relecture de sa structure.",
      "id": "html-m1-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "balise",
      "definition": "Marque délimitant un élément HTML."
    },
    {
      "term": "DOM",
      "definition": "Arbre d’éléments construit par le navigateur à partir du document."
    },
    {
      "term": "attribut",
      "definition": "Information attachée à une balise ouvrante."
    }
  ],
  "recap_fr": [
    "HTML balise les contenus.",
    "head et body ont des rôles distincts.",
    "L’aperçu et la structure doivent être vérifiés."
  ],
  "tags": [
    "html",
    "m1",
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

L’association fictive Graines ensemble souhaite annoncer ses ateliers. Avant de choisir des couleurs, tu dois donner une structure à sa première page. HTML est un langage de balisage : il décrit des contenus à l’aide d’éléments. Il ne faut pas le confondre avec CSS, qui règle leur présentation, ni avec JavaScript, qui peut programmer des comportements. Dans cette initiation, un navigateur suffit pour écrire, observer et corriger une petite page.

Un élément ordinaire possède une balise ouvrante, du contenu et une balise fermante. Dans <p>Bonjour</p>, p désigne un paragraphe ; la barre oblique annonce sa fermeture. Les balises ne sont pas affichées comme du texte. Le navigateur les interprète pour construire une représentation du document, appelée DOM. L’indentation ajoute des espaces dans le fichier pour rendre les relations lisibles ; elle ne crée pas, à elle seule, des sections ou des paragraphes.

Un document complet commence par <!doctype html>, qui demande le mode de rendu standard. L’élément html contient head puis body. L’attribut lang="fr" déclare la langue principale et aide notamment les outils de lecture vocale. head rassemble les renseignements sur la page : meta charset="utf-8" annonce l’encodage et title nomme l’onglet. body contient ce que l’utilisateur consulte dans la page. Le titre d’onglet et un titre visible sont donc deux informations distinctes.

Certains éléments n’entourent pas de contenu et n’ont pas de balise fermante. meta en fait partie. Tu n’as pas besoin de mémoriser tous ces cas aujourd’hui : reprends le squelette proposé et repère chaque rôle. Un attribut se place dans une balise ouvrante ; son nom et sa valeur sont séparés par un signe égal. Écrire les valeurs entre guillemets droits et conserver une indentation régulière facilite la relecture.

Lis le premier exemple, prédis le texte visible, puis ouvre l’aperçu. Le titre de l’onglet n’apparaît pas dans le corps. Modifie ensuite uniquement le paragraphe et relance l’aperçu pour comparer. Un navigateur peut réparer un balisage imparfait ; voir du texte ne prouve donc pas que la structure est correcte. Les activités inspectent les éléments utiles, pas les espaces de ton fichier. Termine en expliquant à voix haute où se trouvent la langue, le titre d’onglet et le contenu visible.

## Exemple guidé 1

```html
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Graines ensemble</title></head>
<body><p>Bienvenue au jardin.</p></body>
</html>
```

## Exemple guidé 2

```html
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Nos ateliers</title></head>
<body>
<p>Semer ensemble.</p>
<p>Partager les récoltes.</p>
</body></html>
```

## Vérifier et expliquer

Relis les titres et les textes, puis parcours les liens et contrôles avec Tab. Active un lien avec Entrée et vérifie sa destination. Les tests DOM ne garantissent pas à eux seuls l’accessibilité.

## Références techniques

Explications et activités originales Nunya. Les documents suivants ont servi à vérifier les mécanismes, sans reprise de leçons :

- [Standard HTML — structure et métadonnées](https://html.spec.whatwg.org/multipage/semantics.html)
- [Standard HTML — formulaires](https://html.spec.whatwg.org/multipage/forms.html)
- [Standard HTML — images et médias](https://html.spec.whatwg.org/multipage/embedded-content.html)
- [Standard HTML — tableaux](https://html.spec.whatwg.org/multipage/tables.html)
