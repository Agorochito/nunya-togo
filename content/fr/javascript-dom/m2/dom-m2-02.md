---
{
  "id": "dom-m2-02",
  "title_fr": "Calculer un état numérique et rendre un affichage cohérent",
  "course": "javascript-dom",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "dom-m2-01"
  ],
  "outcomes": [
    "Convertir les chaînes du DOM avant un calcul numérique.",
    "Mettre à jour plusieurs sorties depuis une seule fonction de rendu."
  ],
  "idea_fr": "L’état numérique décrit la situation ; une fonction de rendu en présente toutes les conséquences.",
  "analogy_fr": "Un tableau de suivi possède un nombre de référence dont plusieurs panneaux tirent leurs indications.",
  "examples": [
    {
      "fixture_html": "<main id=\"suivi\" data-depart=\"2\"><button id=\"plus\" type=\"button\">Ajouter une présence</button><p id=\"total\">2</p><p id=\"resume\">2 présences</p></main>",
      "expected_output": "Le total commence à 2 ; les deux clics donnent 3 puis 4, avec le résumé correspondant.",
      "trace_fr": [
        "Lignes 1–2 : la chaîne \"2\" du dataset devient le nombre 2.",
        "Lignes 3–5 : rendre écrit les deux représentations, sans changer total.",
        "Ligne 6 : les sorties initiales sont synchronisées.",
        "Premier clic, lignes 8–9 : total devient 3 puis les deux sorties sont actualisées.",
        "Second clic : total devient 4, sans concaténation."
      ],
      "browser_test": {
        "description_fr": "Deux représentations du même nombre",
        "checks": [
          {
            "selector": "#total",
            "text": "2"
          },
          {
            "selector": "#resume",
            "text": "2 présences"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "3"
              },
              {
                "selector": "#resume",
                "text": "3 présences"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#plus",
            "checks": [
              {
                "selector": "#total",
                "text": "4"
              },
              {
                "selector": "#resume",
                "text": "4 présences"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<main id=\"stock\" data-capacite=\"2\"><button id=\"prendre\" type=\"button\">Prendre un cahier</button><p id=\"reste\">2</p></main>",
      "expected_output": "Le stock passe de 2 à 1 puis 0 ; le bouton devient désactivé à zéro.",
      "trace_fr": [
        "Lignes 1–3 : le stock numérique et le bouton sont préparés.",
        "Lignes 4–6 : rendre affiche le stock et calcule disabled depuis la même valeur.",
        "Ligne 7 : le bouton est actif avec deux cahiers.",
        "Premier clic, lignes 9–10 : reste vaut 1 et le bouton reste actif.",
        "Second clic : reste vaut 0 et disabled devient true."
      ],
      "browser_test": {
        "description_fr": "Borne basse et état du bouton",
        "checks": [
          {
            "selector": "#reste",
            "text": "2"
          },
          {
            "selector": "#prendre",
            "attributes": {
              "disabled": null
            }
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#prendre",
            "checks": [
              {
                "selector": "#reste",
                "text": "1"
              },
              {
                "selector": "#prendre",
                "attributes": {
                  "disabled": null
                }
              }
            ]
          },
          {
            "action": "click",
            "selector": "#prendre",
            "checks": [
              {
                "selector": "#reste",
                "text": "0"
              },
              {
                "selector": "#prendre",
                "attributes": {
                  "disabled": ""
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Concaténer le pas",
      "why_fr": "dataset fournit une chaîne.",
      "fix_fr": "Convertis chaque donnée utilisée dans l’addition."
    },
    {
      "error": "Modifier au rendu",
      "why_fr": "Un affichage change lui-même le compteur.",
      "fix_fr": "Sépare mutation de l’état et présentation."
    },
    {
      "error": "Oublier un résumé après reset",
      "why_fr": "Les sorties affichent des états contradictoires.",
      "fix_fr": "Passe toujours par la même fonction de rendu."
    }
  ],
  "quiz": [
    {
      "question": "Que donne Number(\"2\") + 1 ?",
      "options": [
        "\"21\".",
        "\"3 présences\".",
        "3."
      ],
      "answer": 2,
      "explanation": "Number transforme la chaîne valide en valeur numérique avant l’addition.",
      "id": "dom-m2-02-q1"
    },
    {
      "question": "Que doit faire une fonction de rendu dans ce modèle ?",
      "options": [
        "Relire uniquement une ancienne phrase de résumé.",
        "Écrire les conséquences de l’état sans ajouter de points.",
        "Ajouter systématiquement un point à chaque affichage."
      ],
      "answer": 1,
      "explanation": "Le rendu peut être appelé plusieurs fois pour le même état.",
      "id": "dom-m2-02-q2"
    },
    {
      "question": "Pourquoi calculer sortis = capacite - reste au rendu ?",
      "options": [
        "Pour dériver le bilan depuis des valeurs de référence cohérentes.",
        "Pour faire évoluer automatiquement la capacité.",
        "Pour convertir le stock en texte avant toute soustraction."
      ],
      "answer": 0,
      "explanation": "Le nombre sorti n’a pas besoin d’une troisième mémoire indépendante.",
      "id": "dom-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "conversion",
      "definition": "Transformation explicite d’une valeur vers un type choisi."
    },
    {
      "term": "rendu",
      "definition": "Mise à jour du document à partir de l’état actuel."
    },
    {
      "term": "borne",
      "definition": "Limite qu’un état doit respecter."
    },
    {
      "term": "valeur dérivée",
      "definition": "Valeur calculée depuis d’autres valeurs, sans mémoire changeante supplémentaire."
    }
  ],
  "recap_fr": [
    "Convertir les chaînes du DOM avant un calcul numérique.",
    "Mettre à jour plusieurs sorties depuis une seule fonction de rendu.",
    "Vérifier le résultat sur la fixture fournie et sur des données alternatives."
  ],
  "tags": [
    "conversion",
    "rendu",
    "borne",
    "valeur dérivée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "Vrai JavaScript dans un document HTML de démonstration isolé. Chaque essai et chaque test repart de sa fixture HTML. Le code et la progression sont conservés, pas cet état temporaire. Aucun réseau, import, serveur, compte ou stockage applicatif ; aucun terminal simulé.",
  "sources": [
    {
      "title": "MDN — Number",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number",
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
      "title": "MDN — disabled",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/HTMLButtonElement/disabled",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — addEventListener",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener",
      "scope": "Référence technique ; explication, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Les attributs dataset et les valeurs de champs fournissent des chaînes. Le texte "2" ressemble au nombre 2, mais l’expression "2" + 1 produit "21" : le signe + peut concaténer. Number("2") produit le nombre 2 ; 2 + 1 donne alors 3. Une conversion explicite au moment de lire les données évite de découvrir l’erreur après plusieurs clics. Les fixtures de cette leçon garantissent des entiers valides, non vides et dans les bornes annoncées.

On pourrait relire le texte affiché à chaque action pour connaître le compteur. Cela mélange le calcul et sa présentation. Dès que le paragraphe affiche "3 présences", sa chaîne ne constitue plus directement un nombre. Conserve plutôt let total dans le contexte du script. Le clic modifie total ; une fonction distincte présente sa valeur. Les éléments DOM sont alors des destinations d’affichage et ne servent plus de mémoire principale du calcul.

Appelons rendre cette fonction de présentation. Elle lit l’état actuel et met à jour toutes les sorties concernées : le nombre seul, une phrase et éventuellement la disponibilité d’un bouton. Elle n’augmente pas elle-même le compteur. Cette séparation permet de l’appeler au lancement puis après chaque action sans compter deux fois. Une fonction qui change l’état en rendant la page produirait une valeur différente selon le nombre d’affichages réalisés.

Le premier appel à rendre assure aussi un état initial cohérent. Le HTML peut contenir un texte provisoire ; le script le remplace à partir de la donnée initiale. Après un clic, l’ordre reste constant : vérifier la règle, modifier l’état, rendre. Oublier le rendu après une remise à zéro laisserait une ancienne phrase visible alors que la variable vaut déjà zéro. Les tests comparent donc plusieurs sorties à chaque étape importante.

Un état peut avoir des bornes. Pour un stock fictif, reste ne doit pas descendre sous zéro ni dépasser la capacité initiale. La condition dans l’écouteur applique cette règle avant la modification. Rendre peut ensuite désactiver le bouton Prendre quand reste vaut zéro. Le contrôle devient compréhensible pour l’utilisateur ; la condition conserve également une règle explicite dans le code. Un bouton réactivé après un retour doit retrouver la possibilité d’agir.

La capacité et le nombre restant n’ont pas le même rôle : la première reste fixe, le second évolue. Le nombre de cahiers sortis se calcule par capacite - reste. Il est inutile de maintenir trois variables changeantes pour ces trois informations ; une valeur dérivée peut être recalculée au rendu. Moins de mémoires indépendantes signifie moins de risques qu’elles se contredisent après une action.

Vérifie les conversions à la lecture, puis trace les états successifs à la main. Avec un départ à trois, deux ajouts donnent quatre puis cinq, jamais trente-et-un. Les exercices changent le départ, le pas ou l’objectif, et mélangent plusieurs commandes. Leurs comptes concernent uniquement une démonstration locale ; aucune présence, attribution de matériel ou récompense réelle n’est enregistrée.

## Exemple guidé 1

```javascript
const suivi = document.querySelector("#suivi"); // 1
let total = Number(suivi.dataset.depart); // 2
function rendre() { // 3
  document.querySelector("#total").textContent = total; // 4
  document.querySelector("#resume").textContent = total + " présences"; // 5
}
rendre(); // 6
document.querySelector("#plus").addEventListener("click", function () { // 7
  total = total + 1; // 8
  rendre(); // 9
});
```

Résultat attendu dans la page : Le total commence à 2 ; les deux clics donnent 3 puis 4, avec le résumé correspondant.

Trace :

- Lignes 1–2 : la chaîne "2" du dataset devient le nombre 2.
- Lignes 3–5 : rendre écrit les deux représentations, sans changer total.
- Ligne 6 : les sorties initiales sont synchronisées.
- Premier clic, lignes 8–9 : total devient 3 puis les deux sorties sont actualisées.
- Second clic : total devient 4, sans concaténation.

## Exemple guidé 2

```javascript
const stock = document.querySelector("#stock"); // 1
let reste = Number(stock.dataset.capacite); // 2
const bouton = document.querySelector("#prendre"); // 3
function rendre() { // 4
  document.querySelector("#reste").textContent = reste; // 5
  bouton.disabled = reste === 0; // 6
}
rendre(); // 7
bouton.addEventListener("click", function () { // 8
  if (reste > 0) { reste = reste - 1; } // 9
  rendre(); // 10
});
```

Résultat attendu dans la page : Le stock passe de 2 à 1 puis 0 ; le bouton devient désactivé à zéro.

Trace :

- Lignes 1–3 : le stock numérique et le bouton sont préparés.
- Lignes 4–6 : rendre affiche le stock et calcule disabled depuis la même valeur.
- Ligne 7 : le bouton est actif avec deux cahiers.
- Premier clic, lignes 9–10 : reste vaut 1 et le bouton reste actif.
- Second clic : reste vaut 0 et disabled devient true.

