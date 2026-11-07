---
{
  "id": "dom-m6-01",
  "title_fr": "Valider avec des retours accessibles et corrigeables",
  "course": "javascript-dom",
  "module": "m6",
  "order": 16,
  "minutes": 20,
  "prerequisites": [
    "dom-m5-03"
  ],
  "outcomes": [
    "Relier labels, aides et erreurs à leurs champs sans effacer l’aide.",
    "Permettre échec puis correction et bloquer les ajouts invalides."
  ],
  "idea_fr": "Relier labels, aides et erreurs à leurs champs sans effacer l’aide.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Nom fictif</h1><form id=\"formulaire\" novalidate><label for=\"nom\">Nom d’affichage fictif</label><input id=\"nom\" aria-describedby=\"aide\"><p id=\"aide\">De 2 à 20 caractères après retrait des espaces extérieurs.</p><p id=\"erreur\" aria-live=\"polite\"></p><button type=\"submit\">Vérifier</button></form><p id=\"retour\" role=\"status\" aria-live=\"polite\"></p></main>",
      "expected_output": "Soumettre un nom vide affiche l’erreur et place le focus sur le champ ; Afi est ensuite accepté et l’ancienne erreur disparaît.",
      "trace_fr": [
        "submit est intercepté, sans navigation.",
        "Le champ invalide est relié à son aide et à son erreur.",
        "Le succès retire aria-invalid et conserve l’aide."
      ],
      "browser_test": {
        "description_fr": "Échec puis correction",
        "checks": [
          {
            "selector": "label[for=\"nom\"]",
            "text": "Nom d’affichage fictif"
          }
        ],
        "steps": [
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#erreur",
                "text": "Écris un nom de 2 à 20 caractères."
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": "true",
                  "aria-describedby": "aide erreur"
                },
                "focused": true
              },
              {
                "selector": "#retour",
                "text": ""
              }
            ]
          },
          {
            "action": "input",
            "selector": "#nom",
            "checks": [],
            "value": " Afi "
          },
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#erreur",
                "text": ""
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": null,
                  "aria-describedby": "aide"
                }
              },
              {
                "selector": "#retour",
                "text": "Nom accepté : Afi"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Places fictives</h1><form id=\"formulaire\" novalidate><label for=\"places\">Nombre de places</label><input id=\"places\" type=\"number\" min=\"1\" max=\"8\" step=\"1\" aria-describedby=\"aide\"><p id=\"aide\">Un entier de 1 à 8.</p><p id=\"erreur\" aria-live=\"polite\"></p><button type=\"submit\">Vérifier</button></form><p id=\"retour\" role=\"status\" aria-live=\"polite\"></p></main>",
      "expected_output": "1,5 place est refusé ; 8 places sont acceptées, avec un retour distinct de l’erreur.",
      "trace_fr": [
        "La chaîne vide est vérifiée avant la conversion.",
        "Number.isInteger exclut une quantité fractionnaire.",
        "Les bornes un et huit sont incluses."
      ],
      "browser_test": {
        "description_fr": "Entier et borne supérieure",
        "steps": [
          {
            "action": "input",
            "selector": "#places",
            "checks": [],
            "value": "1.5"
          },
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#erreur",
                "text": "Choisis un entier de 1 à 8."
              },
              {
                "selector": "#places",
                "attributes": {
                  "aria-invalid": "true",
                  "aria-describedby": "aide erreur"
                },
                "focused": true
              },
              {
                "selector": "#retour",
                "text": ""
              }
            ]
          },
          {
            "action": "input",
            "selector": "#places",
            "checks": [],
            "value": "8"
          },
          {
            "action": "submit",
            "selector": "#formulaire",
            "checks": [
              {
                "selector": "#erreur",
                "text": ""
              },
              {
                "selector": "#places",
                "attributes": {
                  "aria-invalid": null,
                  "aria-describedby": "aide"
                }
              },
              {
                "selector": "#retour",
                "text": "Places acceptées : 8"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Laisser une erreur périmée après succès",
      "why_fr": "Les attributs contredisent la valeur acceptée.",
      "fix_fr": "Restaure textes et attributs dans chaque branche."
    },
    {
      "error": "Convertir un champ numérique sans vérifier son contrat",
      "why_fr": "Un vide, une fraction ou une valeur hors borne peut passer.",
      "fix_fr": "Teste séparément présence, entier et bornes."
    }
  ],
  "quiz": [
    {
      "question": "Que contient aria-describedby ?",
      "options": [
        "Un booléen qui bloque submit.",
        "Des identifiants d’éléments descriptifs, séparés par des espaces.",
        "Le texte complet qui remplace le label."
      ],
      "answer": 1,
      "explanation": "Le lien garde l’aide et peut y ajouter l’élément qui explique l’erreur.",
      "id": "dom-m6-01-q1"
    },
    {
      "question": "Que faire de aria-invalid après une correction acceptée ?",
      "options": [
        "Le retirer ou le remettre à un état valide explicite.",
        "Le laisser true pour garder un historique.",
        "Le remplacer par une couleur rouge."
      ],
      "answer": 0,
      "explanation": "Les attributs doivent décrire la valeur actuelle, pas un ancien échec.",
      "id": "dom-m6-01-q2"
    },
    {
      "question": "Que garantit le test de aria-live et du texte ?",
      "options": [
        "La phrase exacte prononcée par tout lecteur d’écran.",
        "Une validation réelle sur un serveur.",
        "La présence de la structure et du message attendus."
      ],
      "answer": 2,
      "explanation": "Les essais vérifient le DOM ; l’expérience avec des aides techniques demande aussi une vérification humaine.",
      "id": "dom-m6-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "aria-describedby",
      "definition": "Attribut qui relie un contrôle aux éléments décrivant son usage ou son erreur."
    },
    {
      "term": "aria-invalid",
      "definition": "Indication accessible qu’une valeur est considérée incorrecte."
    },
    {
      "term": "validation",
      "definition": "Vérification de règles annoncées avant une modification d’état."
    }
  ],
  "recap_fr": [
    "Relier labels, aides et erreurs à leurs champs sans effacer l’aide.",
    "Permettre échec puis correction et bloquer les ajouts invalides.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "aria-describedby",
    "aria-invalid",
    "validation"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — aria-invalid",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — aria-describedby",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — aria-live",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un formulaire utile explique ce qui est demandé, ce qui doit être corrigé et ce qui vient de réussir. La couleur seule ne suffit pas. Les exemples utilisent des données fictives et ne réalisent aucune inscription. Le HTML fournit des labels reliés aux identifiants des champs : for dans le label désigne id dans le contrôle. Cliquer sur le label permet aussi d’atteindre ce contrôle. Un texte d’aide décrit les contraintes avant la soumission.

Le formulaire porte novalidate afin que les essais observent notre validation JavaScript plutôt que des bulles natives variables. Dans un vrai projet, ce choix doit être réfléchi : les contraintes HTML peuvent souvent aider. L’écouteur submit appelle preventDefault pour rester dans le document. Le nom est nettoyé avec trim, puis sa longueur est vérifiée. La règle de cet exercice compte les unités de chaîne JavaScript, pas les lettres de toutes les écritures humaines ; elle reste une règle pédagogique simple, annoncée explicitement.

Lors d’un échec, place un message précis dans l’élément erreur déjà présent. aria-live="polite" demande aux technologies d’assistance d’annoncer les changements quand cela convient, sans interrompre systématiquement. L’annonce exacte dépend du navigateur et de l’outil de lecture ; nos tests vérifient les attributs et le texte, pas une parole produite. aria-invalid="true" indique que le champ contient une valeur jugée incorrecte. Cet attribut ne bloque aucune action à lui seul.

Le lien aria-describedby contient des identifiants de descriptions, séparés par des espaces. Avec « aide erreur », le champ garde son aide et reçoit aussi son explication d’échec. Une correction réussie efface l’erreur, retire aria-invalid et restaure « aide ». Ne laisse pas une ancienne erreur attachée à une valeur désormais acceptée. Le focus va au premier champ incorrect pour permettre de le corriger ; sur succès, le retour accessible confirme l’action avec textContent.

Pour les places, vérifie d’abord que le texte n’est pas vide : Number d’une chaîne vide vaut zéro. Convertis ensuite et vérifie Number.isInteger ainsi que les bornes incluses. Une valeur décimale ou négative doit échouer même si elle peut être représentée comme nombre. Les attributs min, max et step documentent aussi la règle, mais les essais JavaScript doivent appliquer le contrat annoncé.

Avec deux champs, calcule les deux erreurs, mets leurs descriptions à jour, puis décide si l’ajout est possible. Un formulaire invalide ne doit créer aucune ligne. Un formulaire corrigé peut ensuite réussir sans devoir recharger la page. Vérifie donc échec, correction partielle et succès dans le même essai. Les noms restent du texte, même s’ils ressemblent à des balises. Le code et la progression sont conservés par Nunya ; les ajouts à ce formulaire disparaissent au prochain essai.

## Exemple guidé 1

```javascript
const formulaire = document.querySelector('#formulaire');
const nom = document.querySelector('#nom');
const erreur = document.querySelector('#erreur');
const retour = document.querySelector('#retour');
formulaire.addEventListener('submit', event => {
  event.preventDefault();
  const texte = nom.value.trim();
  if (texte.length < 2 || texte.length > 20) {
    erreur.textContent = 'Écris un nom de 2 à 20 caractères.';
    nom.setAttribute('aria-invalid', 'true');
    nom.setAttribute('aria-describedby', 'aide erreur');
    retour.textContent = '';
    nom.focus();
    return;
  }
  erreur.textContent = '';
  nom.removeAttribute('aria-invalid');
  nom.setAttribute('aria-describedby', 'aide');
  retour.textContent = 'Nom accepté : ' + texte;
});
```

## Exemple guidé 2

```javascript
const places = document.querySelector('#places');
const erreur = document.querySelector('#erreur');
const retour = document.querySelector('#retour');
document.querySelector('#formulaire').addEventListener('submit', event => {
  event.preventDefault();
  const texte = places.value.trim();
  const nombre = Number(texte);
  if (texte === '' || !Number.isInteger(nombre) || nombre < 1 || nombre > 8) {
    erreur.textContent = 'Choisis un entier de 1 à 8.';
    places.setAttribute('aria-invalid', 'true');
    places.setAttribute('aria-describedby', 'aide erreur');
    retour.textContent = '';
    places.focus();
    return;
  }
  erreur.textContent = '';
  places.removeAttribute('aria-invalid');
  places.setAttribute('aria-describedby', 'aide');
  retour.textContent = 'Places acceptées : ' + nombre;
});
```

