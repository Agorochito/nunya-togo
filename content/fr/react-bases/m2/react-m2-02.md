---
{
  "id": "react-m2-02",
  "title_fr": "Raisonner sur un instantané et cumuler des mises à jour",
  "course": "react-bases",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "react-m2-01"
  ],
  "outcomes": [
    "Expliquer pourquoi plusieurs lectures d’un état dans le même clic gardent la même valeur.",
    "Enchaîner des mises à jour fonctionnelles pures dans leur ordre de demande."
  ],
  "idea_fr": "Un gestionnaire voit l’instantané de son rendu ; une fonction de mise à jour reçoit la valeur en attente dans la file.",
  "analogy_fr": "Plusieurs transformations écrites sur une feuille se suivent dans un ordre précis, sans réécrire la photo de départ.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le total part de 2 ; un clic affiche 4, puis le suivant affiche 6, malgré deux demandes identiques par clic.",
      "trace_fr": [
        "Ligne 2 : le premier instantané possède total=2.",
        "Premier clic, lignes 4–5 : les deux expressions lisent 2 et demandent chacune 4.",
        "Après le gestionnaire, le rendu suivant présente 4.",
        "Second clic : le nouvel instantané vaut 4 ; les deux demandes proposent chacune 6.",
        "Lignes 6–7 : le bouton utilise le gestionnaire et le root monte App."
      ],
      "browser_test": {
        "description_fr": "Deux remplacements ne sont pas deux additions cumulées",
        "checks": [
          {
            "selector": "#total",
            "text": "2"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#demander",
            "checks": [
              {
                "selector": "#total",
                "text": "4"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#demander",
            "checks": [
              {
                "selector": "#total",
                "text": "6"
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le calcul passe de 1 à 9 au premier clic, puis de 9 à 33 au second.",
      "trace_fr": [
        "Ligne 2 : la mémoire commence à 1.",
        "Premier clic, ligne 4 : la première transformation propose 1+2=3.",
        "Ligne 5 : la seconde reçoit 3 et propose 3×3=9.",
        "Second clic : les étapes sont 9+2=11 puis 11×3=33.",
        "Lignes 6–7 : les nombres calculés sont rendus dans le paragraphe."
      ],
      "browser_test": {
        "description_fr": "Ordre de transformations fonctionnelles",
        "checks": [
          {
            "selector": "#valeur",
            "text": "1"
          }
        ],
        "steps": [
          {
            "action": "click",
            "selector": "#transformer",
            "checks": [
              {
                "selector": "#valeur",
                "text": "9"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#transformer",
            "checks": [
              {
                "selector": "#valeur",
                "text": "33"
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Répéter une valeur calculée",
      "why_fr": "Les lectures appartiennent au même rendu.",
      "fix_fr": "Passe une transformation pour cumuler les changements."
    },
    {
      "error": "Inverser les opérations",
      "why_fr": "Les transformations ne sont pas toutes commutatives.",
      "fix_fr": "Trace chaque résultat intermédiaire dans l’ordre."
    },
    {
      "error": "Produire des effets dans l’updater",
      "why_fr": "Un appel de vérification peut répéter cet effet.",
      "fix_fr": "Retourne seulement la prochaine valeur."
    }
  ],
  "quiz": [
    {
      "question": "total vaut 2 : que demandent deux setTotal(total+2) dans le même clic ?",
      "options": [
        "Une valeur 4 puis une valeur 6.",
        "Un nouveau rendu au milieu de chaque addition.",
        "Deux remplacements par 4."
      ],
      "answer": 2,
      "explanation": "Les deux expressions lisent le même instantané.",
      "id": "react-m2-02-q1"
    },
    {
      "question": "Que reçoit le paramètre v dans une mise à jour fonctionnelle ?",
      "options": [
        "Le bouton DOM cliqué.",
        "La valeur en attente au moment de cette transformation.",
        "Toujours la valeur initiale du premier montage."
      ],
      "answer": 1,
      "explanation": "La file transmet le résultat précédent à la transformation suivante.",
      "id": "react-m2-02-q2"
    },
    {
      "question": "Quelle propriété doit respecter une fonction de mise à jour ?",
      "options": [
        "Calculer son résultat sans effet de bord.",
        "Modifier aussi une prop pour forcer le rendu.",
        "Écrire directement dans le paragraphe."
      ],
      "answer": 0,
      "explanation": "La pureté garde le calcul fiable, même si React le vérifie plusieurs fois.",
      "id": "react-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "instantané",
      "definition": "Valeurs de props et d’état utilisées par un rendu et ses gestionnaires."
    },
    {
      "term": "mise à jour fonctionnelle",
      "definition": "Demande calculant la prochaine valeur depuis la valeur en attente."
    },
    {
      "term": "file de mises à jour",
      "definition": "Suite ordonnée de remplacements et transformations à traiter."
    },
    {
      "term": "pureté",
      "definition": "Calcul qui ne modifie pas des données ou systèmes extérieurs."
    }
  ],
  "recap_fr": [
    "Expliquer pourquoi plusieurs lectures d’un état dans le même clic gardent la même valeur.",
    "Enchaîner des mises à jour fonctionnelles pures dans leur ordre de demande.",
    "Vérifier le DOM rendu avec les fixtures et les actions annoncées."
  ],
  "tags": [
    "instantané",
    "mise à jour fonctionnelle",
    "file de mises à jour",
    "pureté"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "React et ReactDOM 19.3.1 réels, auto-hébergés dans un document isolé. React, useState, useEffect, useRef et root sont fournis ; aucun import ni installation. Le JSX est transformé avant son exécution. Chaque test recrée la fixture et les composants. Le script et la progression sont sauvegardés, pas cet état temporaire. Aucun réseau, serveur, compte ni stockage applicatif.",
  "sources": [
    {
      "title": "React — L’état comme instantané",
      "url": "https://react.dev/learn/state-as-a-snapshot",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Cumuler des mises à jour",
      "url": "https://react.dev/learn/queueing-a-series-of-state-updates",
      "scope": "Référence technique officielle ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Lorsqu’un composant est rendu, ses variables d’état décrivent cet instantané. Le gestionnaire créé pendant ce rendu lit les mêmes valeurs, même après un appel à leur fonction de mise à jour. setTotal(total + 2) demande un prochain état ; il ne réaffecte pas la variable total déjà présente dans cette fonction. Cette distinction explique le comportement du premier exemple sans supposer un calcul aléatoire ou un clic manquant.

Si total vaut deux, deux appels setTotal(total + 2) demandent chacun la valeur quatre. Le second ne lit pas un total déjà devenu quatre : il utilise toujours le deux de son rendu. React regroupe ces demandes pendant ce gestionnaire. L’interface suivante affiche quatre, pas six. Au clic suivant, le gestionnaire du nouveau rendu voit quatre et les deux demandes identiques proposent six. Les clics intentionnels distincts sont traités séparément.

Pour calculer à partir de la valeur en attente, on peut passer une fonction à setTotal. L’écriture setTotal(t => t + 1) demande une transformation plutôt qu’une valeur déjà calculée. Le paramètre t représente la valeur courante de la file à cette étape ; il n’est pas obligé de porter le même nom que total. Si une autre transformation est déjà prévue, cette fonction reçoit son résultat.

Deux mises à jour fonctionnelles successives sont appliquées dans l’ordre demandé. Dans le second exemple, ajouter deux puis multiplier par trois transforme un en trois, puis trois en neuf. Multiplier par trois puis ajouter deux donnerait cinq. Pour vérifier le programme, écris les étapes intermédiaires sur papier : c’est la composition des calculs qui détermine le résultat, et non le nombre de lignes JSX ou le nombre de rendus observés.

Une demande de remplacement peut aussi précéder une transformation. setValeur(10), suivi de setValeur(v => v + 1), conduit à onze. Le remplacement annonce une base pour la suite de cette file. En revanche, terminer par setValeur(valeur + 1) réutiliserait l’ancien instantané, sans tenir compte de ce dix demandé. Les exercices te font comparer ces deux lectures pour repérer le défaut exact.

Les fonctions de mise à jour doivent seulement calculer la prochaine valeur. N’y modifie pas le DOM, une prop ou une variable extérieure et n’y déclenche pas d’autre action. React peut les appeler davantage en développement pour détecter des impuretés. Une fonction pure, comme v => v * 2, donne le même résultat à partir de la même entrée et reste indépendante du nombre d’appels de vérification.

Ces exemples ne demandent ni minuterie ni Promise : la difficulté vient déjà de plusieurs demandes synchrones dans un seul clic. Les tests alternent commandes, répétitions et remise au départ, avec plusieurs valeurs initiales. Après chaque action, observe la valeur réellement rendue. Une addition globale équivalente peut parfois produire le même nombre ; l’objectif pédagogique reste d’expliquer et d’écrire la file de transformations annoncée.

## Exemple guidé 1

```javascript
function App() { // 1
  const [total, setTotal] = useState(2); // 2
  function demander() { // 3
    setTotal(total + 2); // 4
    setTotal(total + 2); // 5
  }
  return <main><p id="total">{total}</p><button id="demander" type="button" onClick={demander}>Deux demandes identiques</button></main>; // 6
}
root.render(<App />); // 7
```

Résultat attendu dans l’aperçu : Le total part de 2 ; un clic affiche 4, puis le suivant affiche 6, malgré deux demandes identiques par clic.

Trace :

- Ligne 2 : le premier instantané possède total=2.
- Premier clic, lignes 4–5 : les deux expressions lisent 2 et demandent chacune 4.
- Après le gestionnaire, le rendu suivant présente 4.
- Second clic : le nouvel instantané vaut 4 ; les deux demandes proposent chacune 6.
- Lignes 6–7 : le bouton utilise le gestionnaire et le root monte App.

## Exemple guidé 2

```javascript
function App() { // 1
  const [valeur, setValeur] = useState(1); // 2
  function transformer() { // 3
    setValeur(v => v + 2); // 4
    setValeur(v => v * 3); // 5
  }
  return <main><p id="valeur">{valeur}</p><button id="transformer" type="button" onClick={transformer}>Ajouter deux puis tripler</button></main>; // 6
}
root.render(<App />); // 7
```

Résultat attendu dans l’aperçu : Le calcul passe de 1 à 9 au premier clic, puis de 9 à 33 au second.

Trace :

- Ligne 2 : la mémoire commence à 1.
- Premier clic, ligne 4 : la première transformation propose 1+2=3.
- Ligne 5 : la seconde reçoit 3 et propose 3×3=9.
- Second clic : les étapes sont 9+2=11 puis 11×3=33.
- Lignes 6–7 : les nombres calculés sont rendus dans le paragraphe.

