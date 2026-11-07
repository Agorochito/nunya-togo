---
{
  "id": "dom-m1-02",
  "title_fr": "Distinguer texte, valeurs et attributs",
  "course": "javascript-dom",
  "module": "m1",
  "order": 2,
  "minutes": 20,
  "prerequisites": [
    "dom-m1-01"
  ],
  "outcomes": [
    "Lire la valeur d’un champ et les données dataset.",
    "Choisir une propriété ou un attribut selon le changement demandé."
  ],
  "idea_fr": "Un contrôle, un texte et un attribut ne se lisent pas tous avec la même propriété.",
  "analogy_fr": "Une fiche possède un intitulé visible, une case remplie et des annotations : chaque information a son emplacement.",
  "examples": [
    {
      "fixture_html": "<main><label for=\"nom\">Atelier</label><input id=\"nom\" value=\"Couture\"><p id=\"apercu\">À préparer</p></main>",
      "expected_output": "L’aperçu affiche « Atelier : Couture », puis le champ contient « Couture débutante ».",
      "trace_fr": [
        "Ligne 1 : champ référence le contrôle associé au label.",
        "Ligne 2 : texte reçoit Couture, sous forme de chaîne.",
        "Ligne 3 : le paragraphe reçoit le résumé construit.",
        "Ligne 4 : seule la valeur courante du champ change ; le résumé déjà écrit reste identique."
      ],
      "browser_test": {
        "description_fr": "Valeur courante et copie du texte",
        "checks": [
          {
            "selector": "#nom",
            "value": "Couture débutante",
            "attributes": {
              "value": "Couture"
            }
          },
          {
            "selector": "#apercu",
            "text": "Atelier : Couture"
          }
        ]
      }
    },
    {
      "fixture_html": "<main><article id=\"fiche\" data-ville=\"Kara\" data-lien=\"#programme\"><a id=\"lien\" href=\"#ancien\">Ancien</a></article><section id=\"programme\"><h2>Programme</h2></section></main>",
      "expected_output": "Le lien affiche « Programme de Kara », vise #programme et la fiche porte data-etat=\"prepare\".",
      "trace_fr": [
        "Ligne 1 : la fiche donne accès à ses données propres à cette démonstration et visibles dans le DOM.",
        "Ligne 2 : le lien est une autre référence.",
        "Ligne 3 : dataset.ville fournit la chaîne Kara.",
        "Ligne 4 : setAttribute copie l’ancre locale.",
        "Ligne 5 : dataset écrit l’état sur la fiche."
      ],
      "browser_test": {
        "description_fr": "Attributs et données propres à la fiche",
        "checks": [
          {
            "selector": "#lien",
            "text": "Programme de Kara",
            "attributes": {
              "href": "#programme"
            }
          },
          {
            "selector": "#fiche",
            "attributes": {
              "data-etat": "prepare"
            }
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Lire textContent sur input",
      "why_fr": "Ce n’est pas la valeur du contrôle.",
      "fix_fr": "Lis value."
    },
    {
      "error": "Croire dataset numérique",
      "why_fr": "Les valeurs data-* sont des chaînes.",
      "fix_fr": "Prévois une conversion lors d’un calcul."
    },
    {
      "error": "Écrire disabled=\"false\"",
      "why_fr": "L’attribut reste présent.",
      "fix_fr": "Affecte false à la propriété disabled."
    }
  ],
  "quiz": [
    {
      "question": "Quelle propriété lit la valeur courante d’un input ?",
      "options": [
        "textContent.",
        "dataset.value dans tous les cas.",
        "value."
      ],
      "answer": 2,
      "explanation": "value décrit le contenu courant du contrôle.",
      "id": "dom-m1-02-q1"
    },
    {
      "question": "Quelle expression lit data-nom-court ?",
      "options": [
        "element.nom-court.",
        "element.dataset.nomCourt.",
        "element.dataset[\"data-nom-court\"]."
      ],
      "answer": 1,
      "explanation": "Le tiret est transformé en majuscule pour l’accès par dataset.",
      "id": "dom-m1-02-q2"
    },
    {
      "question": "Quel code réactive un bouton ?",
      "options": [
        "bouton.disabled = false;",
        "bouton.setAttribute(\"disabled\", \"false\");",
        "bouton.textContent = \"false\";"
      ],
      "answer": 0,
      "explanation": "La propriété reçoit un booléen ; l’attribut présent désactive le bouton.",
      "id": "dom-m1-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "value",
      "definition": "Valeur courante d’un contrôle de saisie."
    },
    {
      "term": "attribut",
      "definition": "Information nommée inscrite sur un élément HTML."
    },
    {
      "term": "dataset",
      "definition": "Accès aux attributs data-* sous forme de propriétés chaînes."
    },
    {
      "term": "propriété booléenne",
      "definition": "Propriété qui représente un état par true ou false."
    }
  ],
  "recap_fr": [
    "Lire la valeur d’un champ et les données dataset.",
    "Choisir une propriété ou un attribut selon le changement demandé.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "value",
    "attribut",
    "dataset",
    "propriété booléenne"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — value",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement/value",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — dataset",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — setAttribute",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — getAttribute",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Element/getAttribute",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — disabled",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLButtonElement/disabled",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un élément DOM est un objet avec des propriétés adaptées à son rôle. Le paragraphe présente du texte avec textContent ; un champ input expose sa valeur courante avec value. Un input n’affiche pas son contenu comme un paragraphe contenant des enfants. Lui affecter textContent ne remplit donc pas la case visible. Avant d’écrire du code, demande-toi si tu changes une phrase, une valeur de contrôle ou une information attachée à l’élément.

Lire champ.value fournit une chaîne, même si le contenu ressemble à un nombre. L’affectation champ.value = "Lecture" change la valeur courante du contrôle. Dans le premier exemple, le résumé est calculé avant cette affectation : il conserve donc le texte lu précédemment. Une variable contenant une chaîne n’est pas un lien vivant qui se recalcule quand le champ change. L’ordre des lectures et des écritures explique le résultat.

Les attributs sont les couples nom-valeur présents dans le balisage, comme href="#programme". La méthode getAttribute("href") lit cette valeur et setAttribute("href", destination) l’écrit. L’attribut value d’un input représente sa valeur initiale ; la propriété value représente sa valeur courante. Elles peuvent différer après une modification. N’utilise pas getAttribute("value") pour savoir ce que le contrôle contient actuellement.

Les attributs data-* transportent de petites données propres à notre interface. data-ville se lit avec element.dataset.ville ; data-nom-court devient dataset.nomCourt. Ces valeurs sont des chaînes. Écrire fiche.dataset.etat = "prepare" met aussi à jour l’attribut data-etat. Cette donnée n’est ni un secret ni une base distante : elle est visible dans le document de démonstration. Les noms et lieux utilisés ici décrivent des fiches fictives.

Certaines propriétés sont booléennes. bouton.disabled = false réactive un bouton ; true le désactive. La présence de l’attribut HTML disabled suffit à le désactiver, même si quelqu’un écrit disabled="false". Écrire la propriété booléenne évite cette confusion. Le test du navigateur vérifie ensuite la présence ou l’absence de cet attribut, ce qui rend la conséquence observable sans inventer une propriété de test.

Préserve les informations qui ne sont pas concernées par la consigne. Changer la destination d’un lien ne demande pas de remplacer toute sa carte. Les destinations de cette leçon sont des ancres locales fournies par la fixture ; tu ne dois pas fabriquer de requête ou naviguer vers un service. Une bonne solution copie la donnée attendue vers la propriété adaptée et conserve les autres éléments utiles.

Ces scripts s’exécutent une seule fois. Modifier ensuite un champ à la main ne relance pas automatiquement le résumé : les événements seront étudiés au prochain module. Observe d’abord l’état obtenu immédiatement après le lancement. Les tests utilisent d’autres valeurs initiales pour vérifier la lecture réelle des données ; une correction qui écrit partout Lecture peut paraître correcte sur un exemple et échouer sur une autre fiche.

## Exemple guidé 1

```javascript
const champ = document.querySelector("#nom"); // 1
const texte = champ.value; // 2
document.querySelector("#apercu").textContent = "Atelier : " + texte; // 3
champ.value = "Couture débutante"; // 4
```

Résultat attendu dans la page : L’aperçu affiche « Atelier : Couture », puis le champ contient « Couture débutante ».

Trace :

- Ligne 1 : champ référence le contrôle associé au label.
- Ligne 2 : texte reçoit Couture, sous forme de chaîne.
- Ligne 3 : le paragraphe reçoit le résumé construit.
- Ligne 4 : seule la valeur courante du champ change ; le résumé déjà écrit reste identique.

## Exemple guidé 2

```javascript
const fiche = document.querySelector("#fiche"); // 1
const lien = document.querySelector("#lien"); // 2
lien.textContent = "Programme de " + fiche.dataset.ville; // 3
lien.setAttribute("href", fiche.dataset.lien); // 4
fiche.dataset.etat = "prepare"; // 5
```

Résultat attendu dans la page : Le lien affiche « Programme de Kara », vise #programme et la fiche porte data-etat="prepare".

Trace :

- Ligne 1 : la fiche donne accès à ses données propres à cette démonstration et visibles dans le DOM.
- Ligne 2 : le lien est une autre référence.
- Ligne 3 : dataset.ville fournit la chaîne Kara.
- Ligne 4 : setAttribute copie l’ancre locale.
- Ligne 5 : dataset écrit l’état sur la fiche.

