---
{
  "id": "react-m6-02",
  "title_fr": "Retenter et ignorer les résultats devenus obsolètes",
  "course": "react-bases",
  "module": "m6",
  "order": 17,
  "minutes": 20,
  "prerequisites": [
    "react-m6-01"
  ],
  "outcomes": [
    "Ignorer succès et rejets obsolètes au changement ou au démontage.",
    "Tester les courses avec des délais simulés explicitement différents."
  ],
  "idea_fr": "Ignorer succès et rejets obsolètes au changement ou au démontage.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\" data-mode=\"erreur\"></div>",
      "expected_output": "Après le rejet initial, Nouvelle tentative simulée affiche Chargement..., puis Python et Web.",
      "trace_fr": [
        "Le bouton modifie essai, dépendance de l’effet.",
        "La nouvelle demande choisit explicitement succes.",
        "Le cleanup interdit aux suites de l’ancienne exécution d’écrire."
      ],
      "browser_test": {
        "description_fr": "Rejet puis nouvelle tentative",
        "checks": [
          {
            "selector": "#etat",
            "text": "Chargement..."
          }
        ],
        "steps": [
          {
            "action": "focus",
            "selector": "#titre",
            "checks": [
              {
                "selector": "#etat",
                "text": "Catalogue indisponible."
              },
              {
                "selector": "#liste li",
                "texts": []
              },
              {
                "selector": "#compte",
                "text": "0 atelier(s)"
              },
              {
                "selector": "#erreur",
                "text": "Le catalogue est indisponible."
              },
              {
                "selector": "#vide",
                "exists": false
              }
            ],
            "wait_ms": 200
          },
          {
            "action": "click",
            "selector": "#retenter",
            "checks": [
              {
                "selector": "#etat",
                "text": "Chargement..."
              },
              {
                "selector": "#tentatives",
                "text": "1 nouvelle(s) tentative(s)"
              }
            ]
          },
          {
            "action": "focus",
            "selector": "#titre",
            "checks": [
              {
                "selector": "#etat",
                "text": "Catalogue prêt."
              },
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "2 atelier(s)"
              },
              {
                "selector": "#vide",
                "exists": false
              },
              {
                "selector": "#erreur",
                "exists": false
              }
            ],
            "wait_ms": 200
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Choisir Vide rapide pendant le succès lent laisse Aucun atelier. même après l’arrivée de l’ancienne réponse.",
      "trace_fr": [
        "Le succès prend180ms, la demande vide40ms.",
        "Le changement nettoie la première exécution.",
        "Le booléen local empêche son résultat tardif d’écraser le vide récent."
      ],
      "browser_test": {
        "description_fr": "La réponse obsolète ne revient pas",
        "checks": [
          {
            "selector": "#etat",
            "text": "Chargement..."
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#mode",
            "checks": [
              {
                "selector": "#etat",
                "text": "Aucun atelier."
              },
              {
                "selector": "#liste li",
                "texts": []
              },
              {
                "selector": "#compte",
                "text": "0 atelier(s)"
              },
              {
                "selector": "#vide",
                "text": "Aucun atelier reçu."
              },
              {
                "selector": "#erreur",
                "exists": false
              },
              {
                "selector": "#mode",
                "value": "vide"
              }
            ],
            "value": "vide",
            "wait_ms": 200
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Partager une garde globale entre tentatives",
      "why_fr": "Une nouvelle demande peut réautoriser une ancienne réponse.",
      "fix_fr": "Crée le booléen dans chaque exécution de l’effet."
    },
    {
      "error": "Protéger seulement then",
      "why_fr": "Un ancien rejet peut encore remplacer l’état récent.",
      "fix_fr": "Vérifie la garde dans then et catch."
    }
  ],
  "quiz": [
    {
      "question": "Le booléen ignorer annule-t-il la Promise ?",
      "options": [
        "Non, il interdit seulement à ses suites d’écrire un résultat obsolète.",
        "Oui, il stoppe toujours le service lui-même.",
        "Seulement si son nom est global."
      ],
      "answer": 0,
      "explanation": "L’opération peut finir, mais son résultat n’est plus appliqué.",
      "id": "react-m6-02-q1"
    },
    {
      "question": "Où doit vivre la garde d’une tentative ?",
      "options": [
        "Dans une variable globale réactivée par chaque nouvelle demande.",
        "Dans le texte du titre de la page.",
        "Dans l’exécution locale de l’effet qui lance cette tentative."
      ],
      "answer": 2,
      "explanation": "Chaque exécution possède son droit d’écrire, invalidé par son propre nettoyage.",
      "id": "react-m6-02-q2"
    },
    {
      "question": "Quel test prouve l’ignorance d’une réponse obsolète ?",
      "options": [
        "La présence du mot nettoyage dans une variable.",
        "Une demande lente puis une rapide, avec contrôle après les deux échéances.",
        "Un succès unique sans changement."
      ],
      "answer": 1,
      "explanation": "L’ancien résultat doit rester sans effet même après son arrivée effective.",
      "id": "react-m6-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "obsolète",
      "definition": "Résultat qui ne correspond plus à la demande actuellement pertinente."
    },
    {
      "term": "garde locale",
      "definition": "Booléen propre à une exécution qui autorise ou ignore ses suites."
    },
    {
      "term": "nouvelle tentative",
      "definition": "Nouvelle opération et nouvelle attente, distinctes de l’ancien écran."
    }
  ],
  "recap_fr": [
    "Ignorer succès et rejets obsolètes au changement ou au démontage.",
    "Tester les courses avec des délais simulés explicitement différents.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "obsolète",
    "garde locale",
    "nouvelle tentative"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrais React19.3.1 et ReactDOM19.3.1 auto-hébergés ; JSX transformé localement dans une interface isolée. React, useState, useEffect, useRef et root sont fournis. Sans import, installation, serveur ni compte. Le service chargerAteliers de M6 est simulé et local, sans requête HTTP. Chaque essai recrée l’interface ; source et progression sont conservées, pas l’état temporaire des composants.",
  "sources": [
    {
      "title": "React — useEffect, fetching data with Effects",
      "url": "https://react.dev/reference/react/useEffect",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Synchronizing with Effects",
      "url": "https://react.dev/learn/synchronizing-with-effects",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Une nouvelle tentative ne doit pas réutiliser simplement l’ancien écran. Elle déclenche une nouvelle opération, annonce Chargement et efface les anciens résultats ou erreurs selon le contrat de l’interface. Le premier exemple possède un compteur essai. Le bouton l’augmente ; l’effet dépend de cette valeur et lance chargerAteliers de nouveau. Après la première tentative, il demande explicitement le mode succes pour montrer une récupération pédagogique. Ce choix simule une issue différente : il ne répare aucun serveur réel.

Le service local accepte un objet d’options. mode choisit succes, vide ou erreur ; delai est un nombre de millisecondes de zéro à deux cents, cent cinquante par défaut. Cette option règle seulement le délai de la Promise simulée. Dans les activités de course, le succès prend cent quatre-vingts millisecondes et le vide ou l’erreur quarante. La personne peut donc changer de mode avant la première réponse. Une ancienne opération lente peut se terminer après la nouvelle opération rapide.

Sans protection, la réponse ancienne remplacerait la plus récente. Un tableau Python et Web pourrait réapparaître après le choix Vide, alors que l’interface annonce encore ce choix. Chaque exécution de l’effet crée donc son propre booléen ignorer, initialement faux. Les branches then et catch le vérifient avant de modifier l’état. Le nettoyage le passe à vrai. Quand les dépendances changent, React nettoie l’ancienne exécution puis crée une nouvelle variable locale pour la suivante.

Cette technique ignore le résultat ; elle n’annule pas la Promise ni le travail du service. L’ancienne opération finit encore, mais ses suites ne mettent plus l’interface à jour. Un booléen global partagé entre toutes les tentatives serait incorrect : une nouvelle demande pourrait réactiver le droit d’écrire d’une ancienne. La variable doit appartenir à l’exécution précise de l’effet. La même garde s’applique au succès et au rejet.

Le démontage demande la même discipline. L’activité dédiée garde un compteur de réponses traitées dans le parent. Masquer l’enfant avant sa réponse doit laisser ce compteur inchangé. Remonter l’enfant crée une nouvelle demande qui peut être traitée normalement. Ce résultat est observable ; se contenter d’une mise à jour d’état dans un enfant déjà disparu ne montrerait pas clairement le défaut.

Le mini-projet combine modes, nouvelle tentative et recherche contrôlée. Les données reçues appartiennent à la dernière demande encore pertinente ; la sélection reste un calcul de rendu. Les tests provoquent volontairement une réponse lente suivie d’une rapide, puis attendent aussi l’ancienne échéance pour vérifier qu’elle ne reprend pas la main. Les données et délais sont entièrement fictifs et locaux. Nunya conserve le code et la progression ; chaque nouvel essai recrée les composants et toutes ces opérations temporaires.

## Exemple guidé 1

```jsx
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  const [essai, setEssai] = useState(0);
  useEffect(() => {
    let ignorer = false;
    setResultat({statut:'chargement', ateliers:[], message:''});
    chargerAteliers(essai === 0 ? {} : {mode:'succes'}).then(lignes => {
      if (ignorer) return;
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      if (ignorer) return;
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
    return () => { ignorer = true; };
  }, [essai]);
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><button id="retenter" type="button" onClick={() => setEssai(n => n + 1)}>Nouvelle tentative simulée</button><p id="tentatives">{essai} nouvelle(s) tentative(s)</p><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><ul id="liste">{resultat.ateliers.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="compte">{resultat.ateliers.length} atelier(s)</p>{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
const modeInitial = document.getElementById('app').dataset.mode || 'succes';
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  const [mode, setMode] = useState(modeInitial);
  useEffect(() => {
    let ignorer = false;
    setResultat({statut:'chargement', ateliers:[], message:''});
    chargerAteliers({mode, delai:mode === 'succes' ? 180 : 40}).then(lignes => {
      if (ignorer) return;
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      if (ignorer) return;
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
    return () => { ignorer = true; };
  }, [mode]);
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><label htmlFor="mode">Mode simulé</label><select id="mode" value={mode} onChange={e => setMode(e.target.value)}><option value="succes">Succès lent</option><option value="vide">Vide rapide</option><option value="erreur">Erreur rapide</option></select><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><ul id="liste">{resultat.ateliers.map(a => <li key={a.id}>{a.titre}</li>)}</ul><p id="compte">{resultat.ateliers.length} atelier(s)</p>{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

