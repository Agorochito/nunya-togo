---
{
  "id": "react-m6-03",
  "title_fr": "Projet : un tableau d’ateliers favoris expliqué et testé",
  "course": "react-bases",
  "module": "m6",
  "order": 18,
  "minutes": 20,
  "prerequisites": [
    "react-m6-02"
  ],
  "outcomes": [
    "Composer un tableau asynchrone filtrable avec favoris et validation accessible.",
    "Expliquer les états, les identités, les effets nettoyés et les limites du laboratoire."
  ],
  "idea_fr": "Composer un tableau asynchrone filtrable avec favoris et validation accessible.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Après le chargement, ajouter Python donne un favori et aria-pressed=true ; le retirer revient à zéro.",
      "trace_fr": [
        "Le parent possède les identifiants favoris.",
        "Carte reçoit une valeur et un callback.",
        "La mise à jour produit un nouveau tableau et le JSX suit."
      ],
      "browser_test": {
        "description_fr": "Bascule réversible",
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
                "selector": "#liste h2",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#favoris-compte",
                "text": "0 favori(s)"
              }
            ],
            "wait_ms": 200
          },
          {
            "action": "click",
            "selector": "#favori-py",
            "checks": [
              {
                "selector": "#favoris-compte",
                "text": "1 favori(s)"
              },
              {
                "selector": "#favori-py",
                "attributes": {
                  "aria-pressed": "true"
                }
              }
            ]
          },
          {
            "action": "click",
            "selector": "#favori-py",
            "checks": [
              {
                "selector": "#favoris-compte",
                "text": "0 favori(s)"
              },
              {
                "selector": "#favori-py",
                "attributes": {
                  "aria-pressed": "false"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\" data-mode=\"erreur\"></div>",
      "expected_output": "Une erreur de service n’empêche pas de nommer la liste ; une nouvelle tentative rend ensuite les ateliers et permet de choisir Web.",
      "trace_fr": [
        "Le nom local et le service sont des responsabilités indépendantes.",
        "La tentative annonce une nouvelle attente.",
        "Le favori est ensuite manipulé depuis une carte réellement reçue."
      ],
      "browser_test": {
        "description_fr": "Nom local, reprise et favori",
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
              }
            ],
            "wait_ms": 200
          },
          {
            "action": "input",
            "selector": "#nom-liste",
            "checks": [],
            "value": "Ma sélection"
          },
          {
            "action": "focus",
            "selector": "#nom-formulaire button[type=\"submit\"]",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#nom-formulaire",
            "checks": [
              {
                "selector": "#nom-valide",
                "text": "Ma sélection"
              },
              {
                "selector": "#nom-liste",
                "value": "",
                "focused": true,
                "attributes": {
                  "aria-invalid": null,
                  "aria-describedby": "aide-nom"
                }
              },
              {
                "selector": "#erreur-nom",
                "text": ""
              },
              {
                "selector": "#confirmation",
                "text": "Nom de liste enregistré pour cet essai."
              }
            ]
          },
          {
            "action": "click",
            "selector": "#retenter",
            "checks": [
              {
                "selector": "#etat",
                "text": "Chargement..."
              }
            ]
          },
          {
            "action": "focus",
            "selector": "#titre",
            "checks": [
              {
                "selector": "#liste h2",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "2 affiché(s) / 2 reçu(s)"
              }
            ],
            "wait_ms": 200
          },
          {
            "action": "click",
            "selector": "#favori-web",
            "checks": [
              {
                "selector": "#favoris-compte",
                "text": "1 favori(s)"
              },
              {
                "selector": "#favori-web",
                "attributes": {
                  "aria-pressed": "true"
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
      "error": "Confondre filtrage et suppression de favori",
      "why_fr": "Les choix disparaissent en changeant seulement la recherche.",
      "fix_fr": "Garde les identifiants favoris dans un état indépendant."
    },
    {
      "error": "Muter le tableau favoris en place",
      "why_fr": "React ne reçoit pas une mise à jour décrite clairement.",
      "fix_fr": "Retourne un nouveau tableau dans la mise à jour fonctionnelle."
    }
  ],
  "quiz": [
    {
      "question": "Que doit conserver un filtre qui masque une carte favorite ?",
      "options": [
        "Uniquement le texte visible de la carte.",
        "Aucune donnée car le filtre supprime la fiche.",
        "Son identifiant dans l’état favoris."
      ],
      "answer": 2,
      "explanation": "Une sélection change la vue, pas le choix enregistré dans l’état de cet essai.",
      "id": "react-m6-03-q1"
    },
    {
      "question": "Pourquoi la carte reçoit-elle un callback ?",
      "options": [
        "Pour lancer un service réseau obligatoire.",
        "Pour signaler une intention au parent qui possède les favoris.",
        "Pour modifier les props en place."
      ],
      "answer": 1,
      "explanation": "La donnée et sa mise à jour restent dans le composant responsable.",
      "id": "react-m6-03-q2"
    },
    {
      "question": "Qu’apporte la grille en plus des checks automatiques ?",
      "options": [
        "Une relecture de la clarté, de l’accessibilité vécue et de l’explication.",
        "Une certification professionnelle garantie.",
        "Une sauvegarde réelle des favoris sur serveur."
      ],
      "answer": 0,
      "explanation": "Les tests locaux donnent des preuves limitées sur des comportements définis, complétées par le jugement humain.",
      "id": "react-m6-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "favori",
      "definition": "Identifiant choisi localement sans réservation ni inscription."
    },
    {
      "term": "callback",
      "definition": "Fonction transmise pour signaler une action au composant responsable."
    },
    {
      "term": "grille de projet",
      "definition": "Critères de fonctionnement, clarté, accessibilité, tests et explication."
    }
  ],
  "recap_fr": [
    "Composer un tableau asynchrone filtrable avec favoris et validation accessible.",
    "Expliquer les états, les identités, les effets nettoyés et les limites du laboratoire.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "favori",
    "callback",
    "grille de projet"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrais React19.3.1 et ReactDOM19.3.1 auto-hébergés ; JSX transformé localement dans une interface isolée. React, useState, useEffect, useRef et root sont fournis. Sans import, installation, serveur ni compte. Le service chargerAteliers de M6 est simulé et local, sans requête HTTP. Chaque essai recrée l’interface ; source et progression sont conservées, pas l’état temporaire des composants.",
  "sources": [
    {
      "title": "React — Sharing State Between Components",
      "url": "https://react.dev/learn/sharing-state-between-components",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Updating Arrays in State",
      "url": "https://react.dev/learn/updating-arrays-in-state",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — useEffect",
      "url": "https://react.dev/reference/react/useEffect",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le projet final est un tableau d’ateliers fictifs que la personne peut rechercher et marquer comme favoris. Il ne réserve aucune place, ne publie rien et ne constitue pas un dossier d’inscription. Les ateliers viennent uniquement de chargerAteliers, le service simulé local déjà étudié. Un état de chargement, un succès, une réponse vide et un rejet restent distincts. Le bouton Nouvelle tentative choisit explicitement le succès simulé et lance une nouvelle demande ; il ne prétend pas rétablir une connexion réelle.

Construis d’abord une Carte qui reçoit un atelier, un booléen choisi et un callback onBasculer. Elle affiche le titre et un vrai bouton dont aria-pressed reflète le choix. Le parent conserve un tableau d’identifiants favoris. Pour basculer un identifiant, une mise à jour fonctionnelle retourne soit une copie sans lui, soit une copie qui l’ajoute. Ne modifie pas le tableau existant en place. Les clés des cartes restent les identifiants des données, pas les positions visibles.

Ajoute ensuite deux critères indépendants : recherche nettoyée et case Favoris seulement. La sélection est calculée pendant le rendu, à partir des ateliers reçus et des identifiants favoris. Le compte visible/reçu décrit les critères actuels ; le nombre de favoris décrit les choix conservés. Masquer un atelier par la recherche ne doit pas effacer son favori. Retirer un favori alors que la case est active peut faire disparaître sa carte immédiatement, sans supprimer l’atelier de la collection reçue.

Le composant NomListe propose un formulaire contrôlé pour un nom fictif de deux à trente unités de chaîne après trim. Une erreur garde l’ancien nom accepté, affiche une règle, relie aide et erreur au champ et y place le focus. Un succès transmet le texte au parent, efface l’erreur, vide le contrôle et confirme uniquement une modification dans cet essai. Le texte saisi reste du texte JSX, même s’il contient des chevrons. Cette validation ne dépend pas du service : elle reste utilisable pendant une erreur de chargement.

Assemble les composants avec un effet de demande protégé par une garde locale et son nettoyage. Les états de recherche, de nom et de favoris restent distincts de la réponse du service. Dans cet exercice, les mêmes identifiants de fixture sont réutilisés à chaque succès ; les favoris peuvent donc être conservés entre deux tentatives. Une application recevant de nouvelles identités devrait définir une politique explicite de rapprochement.

La grille Fonctionnement vérifie modes, nouvelle tentative, filtres et bascule sans doublon. La grille Clarté examine les responsabilités parent/enfants et les données dérivées. La grille Accessibilité examine labels, boutons natifs, aria-pressed, messages reliés et focus. La grille Tests demande erreurs, corrections, retraits et données différentes dans une même séquence. La grille Explication demande de justifier état, identité, effet et nettoyage, puis de dire ce qui disparaît au nouvel essai. Les tests automatiques n’accordent ni diplôme ni maîtrise professionnelle ; ils donnent un retour formatif local, complété par la relecture et l’usage humain. Nunya sauvegarde le code et la progression, pas ce tableau temporaire.

## Exemple guidé 1

```jsx
function Carte({atelier, choisi, onBasculer}) {
  return <li data-id={atelier.id}><h2>{atelier.titre}</h2><button id={'favori-' + atelier.id} type="button" aria-pressed={choisi} onClick={() => onBasculer(atelier.id)}>{choisi ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button></li>;
}
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  const [favoris, setFavoris] = useState([]);
  function basculer(id) { setFavoris(ids => ids.includes(id) ? ids.filter(cle => cle !== id) : [...ids, id]); }
  useEffect(() => {
    let ignorer = false;
    setResultat({statut:'chargement', ateliers:[], message:''});
    chargerAteliers().then(lignes => {
      if (ignorer) return;
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      if (ignorer) return;
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
    return () => { ignorer = true; };
  }, []);
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><ul id="liste">{resultat.ateliers.map(a => <Carte key={a.id} atelier={a} choisi={favoris.includes(a.id)} onBasculer={basculer} />)}</ul><p id="favoris-compte" role="status">{favoris.length} favori(s)</p><p id="compte">{resultat.ateliers.length} atelier(s)</p>{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

## Exemple guidé 2

```jsx
function NomListe({onValider}) {
  const [texte, setTexte] = useState('');
  const [erreur, setErreur] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const champ = useRef(null);
  function soumettre(event) {
    event.preventDefault();
    const nom = texte.trim();
    if (nom.length < 2 || nom.length > 30) {
      setErreur('Écris un nom de 2 à 30 caractères.');
      setConfirmation(''); champ.current.focus(); return;
    }
    onValider(nom); setErreur(''); setConfirmation('Nom de liste enregistré pour cet essai.'); setTexte(''); champ.current.focus();
  }
  return <form id="nom-formulaire" noValidate onSubmit={soumettre}><label htmlFor="nom-liste">Nom fictif de la liste</label><input id="nom-liste" ref={champ} value={texte} onChange={e => setTexte(e.target.value)} aria-describedby={erreur ? 'aide-nom erreur-nom' : 'aide-nom'} aria-invalid={erreur ? 'true' : undefined} /><p id="aide-nom">2 à 30 caractères après retrait des espaces extérieurs.</p><p id="erreur-nom" aria-live="polite">{erreur}</p><button type="submit">Nommer la liste</button><p id="confirmation" role="status">{confirmation}</p></form>;
}
function Carte({atelier, choisi, onBasculer}) {
  return <li data-id={atelier.id}><h2>{atelier.titre}</h2><button id={'favori-' + atelier.id} type="button" aria-pressed={choisi} onClick={() => onBasculer(atelier.id)}>{choisi ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button></li>;
}
const modeInitial = document.getElementById('app').dataset.mode || 'succes';
function App() {
  const [resultat, setResultat] = useState({statut:'chargement', ateliers:[], message:''});
  const [nomListe, setNomListe] = useState('Mes favoris');
  const [mode, setMode] = useState(modeInitial);
  const [essai, setEssai] = useState(0);
  const [favoris, setFavoris] = useState([]);
  function basculer(id) { setFavoris(ids => ids.includes(id) ? ids.filter(cle => cle !== id) : [...ids, id]); }
  const [recherche, setRecherche] = useState('');
  const [seulement, setSeulement] = useState(false);
  useEffect(() => {
    let ignorer = false;
    setResultat({statut:'chargement', ateliers:[], message:''});
    chargerAteliers({mode,delai:150}).then(lignes => {
      if (ignorer) return;
      setResultat({statut:lignes.length ? 'succes' : 'vide', ateliers:lignes, message:''});
    }).catch(erreur => {
      if (ignorer) return;
      setResultat({statut:'erreur', ateliers:[], message:erreur.message});
    });
    return () => { ignorer = true; };
  }, [mode, essai]);
  const terme = recherche.trim().toLowerCase();
  const selection = resultat.ateliers.filter(a => a.titre.toLowerCase().includes(terme) && (!seulement || favoris.includes(a.id)));
  const textes = {chargement:'Chargement...', succes:'Catalogue prêt.', vide:'Aucun atelier.', erreur:'Catalogue indisponible.'};
  return <main><h1 id="titre" tabIndex={-1}>Catalogue fictif</h1><h2 id="nom-valide">{nomListe}</h2><NomListe onValider={setNomListe} /><label htmlFor="mode">Mode du service simulé</label><select id="mode" value={mode} onChange={e => setMode(e.target.value)}><option value="succes">Succès</option><option value="vide">Vide</option><option value="erreur">Erreur</option></select><button id="retenter" type="button" onClick={() => { setMode('succes'); setEssai(n => n + 1); }}>Nouvelle tentative simulée</button><p id="etat" role="status" aria-live="polite">{textes[resultat.statut]}</p><label htmlFor="recherche">Rechercher</label><input id="recherche" value={recherche} onChange={e => setRecherche(e.target.value)} /><label><input id="seulement" type="checkbox" checked={seulement} onChange={e => setSeulement(e.target.checked)} /> Favoris seulement</label><ul id="liste">{selection.map(a => <Carte key={a.id} atelier={a} choisi={favoris.includes(a.id)} onBasculer={basculer} />)}</ul><p id="favoris-compte" role="status">{favoris.length} favori(s)</p><p id="compte">{selection.length} affiché(s) / {resultat.ateliers.length} reçu(s)</p>{resultat.statut === 'succes' && selection.length === 0 && <p id="sans-resultat">Aucun atelier ne correspond aux critères.</p>}{resultat.statut === 'vide' && <p id="vide">Aucun atelier reçu.</p>}{resultat.statut === 'erreur' && <p id="erreur" role="alert">{resultat.message}</p>}</main>;
}
root.render(<App />);
```

