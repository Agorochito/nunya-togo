---
{
  "id": "react-m4-02",
  "title_fr": "Valider une demande et annoncer son résultat local",
  "course": "react-bases",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "react-m4-01"
  ],
  "outcomes": [
    "Traiter et valider un formulaire contrôlé sans navigation.",
    "Associer messages explicites et état d’erreur aux champs."
  ],
  "idea_fr": "Le formulaire conserve un brouillon contrôlé ; onSubmit vérifie une demande précise et met à jour un retour accessible.",
  "analogy_fr": "Le brouillon reste sur la table pendant qu’un accueil vérifie les règles et indique la correction attendue.",
  "examples": [
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Une demande vide est refusée ; saisir Afi avec des espaces extérieurs puis vérifier affiche son nom nettoyé.",
      "trace_fr": [
        "Le brouillon de nom est contrôlé.",
        "La soumission empêche la navigation puis nettoie la valeur pour sa règle.",
        "Le retour regroupe type et texte dans une mise à jour cohérente.",
        "Le rendu transmet aussi l’état d’erreur au champ."
      ],
      "browser_test": {
        "description_fr": "Refus puis correction",
        "checks": [],
        "steps": [
          {
            "action": "submit",
            "selector": "#demande",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#retour",
                "text": "Prénom fictif de 1 à 20 caractères requis."
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": "true"
                }
              }
            ]
          },
          {
            "action": "input",
            "selector": "#nom",
            "wait_ms": 40,
            "value": " Afi ",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#demande",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#retour",
                "text": "Demande fictive : Afi"
              },
              {
                "selector": "#nom",
                "attributes": {
                  "aria-invalid": "false"
                },
                "value": " Afi "
              }
            ]
          }
        ]
      }
    },
    {
      "fixture_html": "<div id=\"app\"></div>",
      "expected_output": "Le formulaire demande d’abord un prénom puis un atelier ; Effacer le brouillon remet les champs et le message à leur départ.",
      "trace_fr": [
        "Les deux contrôles ont chacun une valeur d’état.",
        "La première règle non satisfaite produit un message ciblé.",
        "La sélection vide n’est pas un choix d’atelier.",
        "La remise à zéro utilise les setters, sans requête ni effet."
      ],
      "browser_test": {
        "description_fr": "Choix puis remise à zéro",
        "checks": [],
        "steps": [
          {
            "action": "input",
            "selector": "#nom",
            "wait_ms": 40,
            "value": "Lina",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#demande",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#retour",
                "text": "Choisis un atelier."
              }
            ]
          },
          {
            "action": "input",
            "selector": "#atelier",
            "wait_ms": 40,
            "value": "compost",
            "checks": []
          },
          {
            "action": "submit",
            "selector": "#demande",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#retour",
                "text": "Lina · compost · démonstration"
              }
            ]
          },
          {
            "action": "click",
            "selector": "#effacer",
            "wait_ms": 40,
            "checks": [
              {
                "selector": "#nom",
                "value": ""
              },
              {
                "selector": "#atelier",
                "value": ""
              },
              {
                "selector": "#retour",
                "text": "En attente."
              }
            ]
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Traiter seulement les succès",
      "why_fr": "Un ancien message reste affiché après un refus.",
      "fix_fr": "Renseigne le retour dans chaque chemin."
    },
    {
      "error": "Confondre plage et entier",
      "why_fr": "Une décimale peut rester dans les bornes sans satisfaire le contrat.",
      "fix_fr": "Teste aussi Number.isInteger."
    }
  ],
  "quiz": [
    {
      "question": "Que fait preventDefault dans ce formulaire ?",
      "options": [
        "Il empêche son action native, sans valider ni enregistrer automatiquement.",
        "Il confirme une inscription réelle.",
        "Il supprime toujours le brouillon."
      ],
      "answer": 0,
      "explanation": "Le composant doit encore appliquer les règles et rendre son message.",
      "id": "react-m4-02-q1"
    },
    {
      "question": "Faut-il convertir tout de suite chaque frappe de quantité en nombre ?",
      "options": [
        "Oui, sinon JSX ne rend plus rien.",
        "Pas ici : garder le texte facilite la présence, le vide et la conversion au submit.",
        "Oui, même pour un prénom."
      ],
      "answer": 1,
      "explanation": "Le texte du champ et la quantité vérifiée ont des rôles distincts.",
      "id": "react-m4-02-q2"
    },
    {
      "question": "Que doit faire la nouvelle erreur après un succès ?",
      "options": [
        "Conserver toujours le message de succès.",
        "Modifier le nom du composant.",
        "Remplacer le retour pour décrire la dernière demande."
      ],
      "answer": 2,
      "explanation": "Le résultat affiché doit correspondre à la demande effectivement traitée.",
      "id": "react-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "onSubmit",
      "definition": "Prop de traitement de la soumission du formulaire."
    },
    {
      "term": "retour de validation",
      "definition": "Message et état décrivant le contrôle de la demande traitée."
    },
    {
      "term": "description associée",
      "definition": "Texte référencé par aria-describedby pour compléter le nom du contrôle."
    }
  ],
  "recap_fr": [
    "Traiter et valider un formulaire contrôlé sans navigation.",
    "Associer messages explicites et état d’erreur aux champs.",
    "Vérifier refus, correction et remise à zéro."
  ],
  "tags": [
    "onSubmit",
    "retour de validation",
    "description associée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "react",
  "environment_fr": "Vrai React 19.3.1 et ReactDOM 19.3.1 auto-hébergés, JSX transformé dans un document isolé. React, useState, useEffect, useRef et root sont fournis, sans import ni paquet à installer. Chaque essai recrée son interface et son état temporaire. Code et progression sauvegardables ; aucune inscription, requête ou donnée personnelle réelle.",
  "sources": [
    {
      "title": "React — Champs input contrôlés",
      "url": "https://react.dev/reference/react-dom/components/input",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Listes select contrôlées",
      "url": "https://react.dev/reference/react-dom/components/select",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "React — Répondre aux événements",
      "url": "https://react.dev/learn/responding-to-events",
      "scope": "Documentation officielle vérifiée ; cours, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Un champ contrôlé permet de saisir ; il reste à traiter l’intention de soumettre un formulaire. La prop onSubmit appartient au form et reçoit un événement. Appeler preventDefault garde ici la démonstration dans la page au lieu de déclencher la navigation native. Cela ne crée ni compte ni enregistrement. Le composant doit encore appliquer ses règles et rendre un message qui correspond à la dernière demande traitée.

Le brouillon et le retour n’ont pas le même instant de référence. Le nom contrôlé évolue pendant la saisie ; le message de cette leçon est recalculé lors de la soumission. trim produit la version sans espaces extérieurs pour la vérification, sans obliger à modifier le texte conservé dans le champ. Une chaîne composée seulement d’espaces doit être refusée quand un nom est demandé. Les bornes de longueur restent celles annoncées par la consigne.

Pour une quantité, garde d’abord un texte dans l’état. Vérifie sa présence, convertis puis teste Number.isInteger et les bornes. Une chaîne vide convertie en zéro n’est pas la preuve d’une réponse réelle. Le code de ces formulaires utilise noValidate pour isoler les règles programmées ; un vrai produit peut combiner contraintes natives, aide locale et traitement du service. Notre exercice ne fournit aucun serveur et n’énonce pas une validation complète de données externes.

Les messages doivent rester visibles et reliés aux champs concernés. aria-describedby peut référencer la région de retour et aria-invalid indique une erreur selon le résultat courant. role=status et aria-live=polite préparent l’annonce d’une mise à jour sans exiger un déplacement de focus à chaque message. Ces relations ne garantissent pas seules toute l’accessibilité : elles complètent les labels, les textes explicites et le parcours clavier. La gestion programmée du focus sera étudiée avec les références React.

Un select peut aussi être contrôlé par value et onChange. Son option vide représente l’absence de choix, pas un atelier réel. Un bouton type=button permet de remettre explicitement les états de brouillon et de retour à leurs valeurs de départ. Dans les tests, soumets un cas invalide, corrige-le, puis provoque une autre erreur pour vérifier qu’un ancien succès ne reste pas affiché. Chaque essai reconstruit son interface ; les noms et ateliers sont fictifs. Explique ce qui a été validé localement, ce que le message décrit et pourquoi aucun résultat de ce module ne constitue une inscription réelle.

## Exemple guidé 1

```javascript
function App() {
  const [nom, setNom] = useState("");
  const [retour, setRetour] = useState({type:"attente",texte:"En attente."});
  function traiter(evenement) {
    evenement.preventDefault();
    const propre = nom.trim();
    if (propre.length < 1 || propre.length > 20) { setRetour({type:"erreur",texte:"Prénom fictif de 1 à 20 caractères requis."}); return; }
    setRetour({type:"ok",texte:"Demande fictive : " + propre});
  }
  return <main><form id="demande" noValidate onSubmit={traiter}><label htmlFor="nom">Prénom fictif, de 1 à 20 caractères</label><input id="nom" value={nom} onChange={e => setNom(e.target.value)} aria-describedby="retour" aria-invalid={retour.type === "erreur"} /><button type="submit">Vérifier</button></form><p id="retour" role="status" aria-live="polite">{retour.texte}</p><p>Aucune inscription réelle.</p></main>;
}
root.render(<App />);
```

## Exemple guidé 2

```javascript
function App() {
  const [nom, setNom] = useState("");
  const [atelier, setAtelier] = useState("");
  const [retour, setRetour] = useState({champ:null,texte:"En attente."});
  function traiter(evenement) {
    evenement.preventDefault();
    const propre = nom.trim();
    if (propre === "") { setRetour({champ:"nom",texte:"Prénom requis."}); return; }
    if (atelier === "") { setRetour({champ:"atelier",texte:"Choisis un atelier."}); return; }
    setRetour({champ:null,texte:propre + " · " + atelier + " · démonstration"});
  }
  function effacer() { setNom(""); setAtelier(""); setRetour({champ:null,texte:"En attente."}); }
  return <main><form id="demande" noValidate onSubmit={traiter}><label htmlFor="nom">Prénom fictif</label><input id="nom" value={nom} onChange={e => setNom(e.target.value)} aria-describedby="retour" aria-invalid={retour.champ === "nom"} /><label htmlFor="atelier">Atelier fictif</label><select id="atelier" value={atelier} onChange={e => setAtelier(e.target.value)} aria-describedby="retour" aria-invalid={retour.champ === "atelier"}><option value="">Choisir</option><option value="semis">Semis</option><option value="compost">Compost</option></select><button type="submit">Vérifier la demande</button><button id="effacer" type="button" onClick={effacer}>Effacer le brouillon</button></form><p id="retour" role="status" aria-live="polite">{retour.texte}</p><p>Aucune donnée envoyée.</p></main>;
}
root.render(<App />);
```

