---
{
  "id": "dom-m6-03",
  "title_fr": "Projet : un catalogue fictif cohérent et vérifiable",
  "course": "javascript-dom",
  "module": "m6",
  "order": 18,
  "minutes": 20,
  "prerequisites": [
    "dom-m6-02"
  ],
  "outcomes": [
    "Assembler un catalogue filtrable avec un ajout validé et un compteur explicite.",
    "Justifier les identifiants, les fonctions de rendu et les limites de la page temporaire."
  ],
  "idea_fr": "Assembler un catalogue filtrable avec un ajout validé et un compteur explicite.",
  "analogy_fr": "Une association fictive prépare une interface qui doit rester compréhensible quand les données ou les actions changent.",
  "examples": [
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"recherche\">Rechercher un atelier fictif</label><input id=\"recherche\" type=\"search\"><label for=\"categorie\">Catégorie</label><select id=\"categorie\"><option value=\"toutes\">Toutes</option><option value=\"code\">Code</option><option value=\"nature\">Nature</option><option value=\"creation\">Création</option></select><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Code puis py montre Python ; passer à Nature avec py actif montre zéro résultat, puis effacer montre Jardin.",
      "trace_fr": [
        "Le calcul combine deux critères indépendants.",
        "Le choix de catégorie ne vide pas la recherche.",
        "Les sorties proviennent de la sélection entière."
      ],
      "browser_test": {
        "description_fr": "Coopération des deux filtres",
        "steps": [
          {
            "action": "input",
            "selector": "#categorie",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python",
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "2 résultat(s)"
              }
            ],
            "value": "code"
          },
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Python"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": "py"
          },
          {
            "action": "input",
            "selector": "#categorie",
            "checks": [
              {
                "selector": "#liste li",
                "texts": []
              },
              {
                "selector": "#compte",
                "text": "0 résultat(s)"
              }
            ],
            "value": "nature"
          },
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Jardin"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 résultat(s)"
              }
            ],
            "value": ""
          }
        ]
      }
    },
    {
      "fixture_html": "<main><h1>Ateliers fictifs</h1><label for=\"recherche\">Rechercher un atelier fictif</label><input id=\"recherche\" type=\"search\"><label for=\"categorie\">Catégorie</label><select id=\"categorie\"><option value=\"toutes\">Toutes</option><option value=\"code\">Code</option><option value=\"nature\">Nature</option><option value=\"creation\">Création</option></select><form id=\"ajout\" novalidate><label for=\"titre\">Titre fictif à ajouter</label><input id=\"titre\" aria-describedby=\"aide-titre\"><p id=\"aide-titre\">2 à 30 caractères, titre unique sans distinction de casse.</p><label for=\"categorie-ajout\">Catégorie de la nouvelle fiche</label><select id=\"categorie-ajout\"><option value=\"code\">Code</option><option value=\"nature\">Nature</option><option value=\"creation\">Création</option></select><label for=\"places\">Places fictives</label><input id=\"places\" type=\"number\" min=\"0\" max=\"20\" step=\"1\" value=\"0\" aria-describedby=\"aide-places\"><p id=\"aide-places\">Un entier de 0 à 20 ; zéro signifie aucune place disponible.</p><p id=\"erreur\" aria-live=\"polite\"></p><button type=\"submit\">Ajouter à l’essai</button></form><p id=\"message\" role=\"status\" aria-live=\"polite\"></p><p id=\"compte\" role=\"status\" aria-live=\"polite\"></p><ul id=\"liste\"></ul><p id=\"vide\" hidden>Aucun atelier.</p><ul id=\"source\" hidden><li data-id=\"1\" data-categorie=\"code\" data-places=\"4\" data-duree=\"30\" data-prix=\"1000\">Python</li><li data-id=\"2\" data-categorie=\"nature\" data-places=\"0\" data-duree=\"20\" data-prix=\"500\">Jardin</li><li data-id=\"3\" data-categorie=\"code\" data-places=\"2\" data-duree=\"20\" data-prix=\"1500\">Web</li></ul></main>",
      "expected_output": "Avec web recherché, ajouter Couture ne change pas l’unique ligne Web mais porte le total à quatre ; rechercher couture révèle la nouvelle fiche.",
      "trace_fr": [
        "Le formulaire valide avant de modifier la collection.",
        "Le rendu conserve le critère web et distingue visible et total.",
        "La recherche suivante utilise aussi la nouvelle fiche, identifiée par 4."
      ],
      "browser_test": {
        "description_fr": "Ajout masqué puis retrouvé",
        "checks": [
          {
            "selector": "#compte",
            "text": "3 affiché(s) / 3 atelier(s)"
          }
        ],
        "steps": [
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 affiché(s) / 3 atelier(s)"
              }
            ],
            "value": "web"
          },
          {
            "action": "input",
            "selector": "#titre",
            "checks": [],
            "value": "Couture"
          },
          {
            "action": "input",
            "selector": "#categorie-ajout",
            "checks": [],
            "value": "creation"
          },
          {
            "action": "input",
            "selector": "#places",
            "checks": [],
            "value": "2"
          },
          {
            "action": "submit",
            "selector": "#ajout",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Web"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 affiché(s) / 4 atelier(s)"
              },
              {
                "selector": "#erreur",
                "text": ""
              },
              {
                "selector": "#message",
                "text": "Atelier ajouté à cet essai."
              },
              {
                "selector": "#titre",
                "value": "",
                "focused": true,
                "attributes": {
                  "aria-invalid": null,
                  "aria-describedby": "aide-titre"
                }
              },
              {
                "selector": "#places",
                "value": "0",
                "attributes": {
                  "aria-invalid": null,
                  "aria-describedby": "aide-places"
                }
              }
            ]
          },
          {
            "action": "input",
            "selector": "#recherche",
            "checks": [
              {
                "selector": "#liste li",
                "texts": [
                  "Couture"
                ]
              },
              {
                "selector": "#compte",
                "text": "1 affiché(s) / 4 atelier(s)"
              },
              {
                "selector": "#liste li",
                "attributes": {
                  "data-id": "4"
                }
              }
            ],
            "value": "couture"
          }
        ]
      }
    }
  ],
  "common_mistakes": [
    {
      "error": "Afficher directement un ajout sans les filtres",
      "why_fr": "La nouvelle ligne peut contredire les critères affichés.",
      "fix_fr": "Modifie la collection puis relance le calcul commun."
    },
    {
      "error": "Utiliser la longueur visible comme identifiant",
      "why_fr": "Le filtrage peut produire des identifiants déjà présents.",
      "fix_fr": "Calcule le maximum des identifiants de toute la collection."
    }
  ],
  "quiz": [
    {
      "question": "Une nouvelle fiche doit-elle toujours apparaître immédiatement ?",
      "options": [
        "Oui, même si elle ne correspond pas.",
        "Seulement si son identifiant vaut la longueur du tableau.",
        "Non, elle peut être exclue par les critères actifs."
      ],
      "answer": 2,
      "explanation": "Le compteur total peut augmenter tandis que le compte affiché reste inchangé.",
      "id": "dom-m6-03-q1"
    },
    {
      "question": "Comment calculer un prochain identifiant pour ces données ?",
      "options": [
        "Utiliser la position du premier résultat filtré.",
        "Prendre le maximum existant puis ajouter un.",
        "Prendre le nombre de lignes visibles puis ajouter un."
      ],
      "answer": 1,
      "explanation": "Un identifiant décrit une fiche et ne doit pas dépendre du filtre courant.",
      "id": "dom-m6-03-q2"
    },
    {
      "question": "Quel critère demande une vérification humaine complémentaire ?",
      "options": [
        "La clarté de l’explication des choix et des limites.",
        "La valeur exacte du compteur après une action définie.",
        "La présence de aria-invalid sur un champ invalide."
      ],
      "answer": 0,
      "explanation": "Les résultats DOM sont automatisables ; une explication complète et l’expérience accessible demandent aussi du jugement.",
      "id": "dom-m6-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "vue dérivée",
      "definition": "Présentation calculée depuis les données et les critères actuels."
    },
    {
      "term": "identifiant stable",
      "definition": "Valeur qui distingue une fiche indépendamment de sa position visible."
    },
    {
      "term": "grille de vérification",
      "definition": "Critères explicites pour examiner fonctionnement, clarté, tests et explication."
    }
  ],
  "recap_fr": [
    "Assembler un catalogue filtrable avec un ajout validé et un compteur explicite.",
    "Justifier les identifiants, les fonctions de rendu et les limites de la page temporaire.",
    "Vérifier plusieurs actions et garder les limites de la page temporaire explicites."
  ],
  "tags": [
    "vue dérivée",
    "identifiant stable",
    "grille de vérification"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "dom",
  "environment_fr": "JavaScript réel exécuté dans une page de navigateur isolée. Le HTML initial est fourni. Aucun serveur, compte, import de module ou réseau. Chaque essai et test recrée la page ; le code et la progression sont sauvegardés, pas les données temporaires de cette interface.",
  "sources": [
    {
      "title": "MDN — Array.some",
      "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — textContent",
      "url": "https://developer.mozilla.org/fr/docs/Web/API/Node/textContent",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "MDN — aria-describedby",
      "url": "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby",
      "scope": "Documentation primaire ; explications, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-06"
    }
  ]
}
---

## Explication pas à pas

Le projet rassemble une recherche, un filtre de catégorie, un ajout et des retours accessibles. Il représente des ateliers inventés pour une association. Il ne réserve aucune place, ne facture rien et ne transmet pas de donnée. La collection est lue au démarrage dans la liste cachée source. Les objets en mémoire deviennent ensuite la référence ; la liste visible reste une présentation dérivée. Un nouvel essai recrée les données initiales, même si Nunya conserve ton code et ta progression.

Construis le projet par étapes. D’abord, combine la recherche et la catégorie avec ET : le titre doit contenir le terme nettoyé et la catégorie doit correspondre, sauf pour Toutes. Ensuite, ajoute le formulaire séparé. Son choix de catégorie décrit la nouvelle fiche ; il ne change pas automatiquement le filtre du catalogue. Enfin, vérifie qu’un ajout relance le même calcul de sélection que les autres actions. Une fiche ajoutée peut légitimement rester invisible si les critères actuels l’excluent.

Le titre accepté contient de deux à trente unités de chaîne après trim et reste unique sans distinction de casse. La méthode some retourne vrai dès qu’un élément vérifie la condition ; elle sert ici à détecter un titre existant. Les places sont un entier de zéro à vingt : zéro est autorisé pour une fiche complète mais indisponible, contrairement à l’activité précédente qui demandait une quantité strictement positive. Le premier échec affiche son message, relie le champ à aide-ID et erreur, indique aria-invalid et y place le focus. Aucun objet ne doit être ajouté dans cette branche.

Sur succès, calcule un identifiant supérieur au maximum déjà présent. Math.max compare ici deux nombres au cours d’une boucle ; un identifiant n’est pas une position visible. Ajoute l’objet, vide le titre, remets les places à zéro, garde la catégorie choisie et les filtres actifs, puis rends la vue. Le message confirme seulement un ajout à cet essai. Le compteur distingue N affiché(s) et T atelier(s), afin qu’un ajout masqué par les critères reste explicable. Les titres sont toujours construits avec textContent.

La grille Fonctionnement vérifie recherche, catégorie, ajout valide, refus invalide et compte visible/total ensemble. La grille Clarté demande des fonctions de calcul et de présentation identifiables, des noms lisibles et des écouteurs installés une fois. La grille Tests attend des séquences : absence de résultat, correction d’erreur, ajout masqué puis visible, données initiales différentes. La grille Explication demande de justifier l’identité des fiches, l’ordre des opérations et la limite temporaire de la page.

Les quatre activités permettent de préparer puis d’assembler ces critères. Les vérifications automatiques contrôlent des résultats et des attributs, pas la qualité complète d’une explication orale ni l’expérience de chaque lecteur d’écran. Après le dernier test, relis le programme et explique un cas où la collection grandit sans que le nombre affiché augmente. Ce scénario résume la différence entre données, critères de sélection et rendu, et montre pourquoi afficher directement une ligne depuis le formulaire serait insuffisant.

## Exemple guidé 1

```javascript
const ateliers = Array.from(document.querySelectorAll('#source li'), el => ({id:Number(el.dataset.id), titre:el.textContent.trim(), categorie:el.dataset.categorie, places:Number(el.dataset.places), duree:Number(el.dataset.duree), prix:Number(el.dataset.prix)}));
function afficher(lignes) {
  const liste = document.querySelector('#liste');
  liste.replaceChildren();
  for (const atelier of lignes) {
    const li = document.createElement('li');
    li.dataset.id = String(atelier.id);
    li.textContent = atelier.titre;
    liste.append(li);
  }
  document.querySelector('#compte').textContent = lignes.length + ' résultat(s)';
  document.querySelector('#vide').hidden = lignes.length !== 0;
}
const recherche = document.querySelector('#recherche');
const categorie = document.querySelector('#categorie');
function selectionner(donnees, texte, choix) {
  const terme = texte.trim().toLowerCase();
  return donnees.filter(a => a.titre.toLowerCase().includes(terme) && (choix === 'toutes' || a.categorie === choix));
}
function rendre() { afficher(selectionner(ateliers, recherche.value, categorie.value)); }
recherche.addEventListener('input', rendre);
categorie.addEventListener('change', rendre);
rendre();
```

## Exemple guidé 2

```javascript
const ateliers = Array.from(document.querySelectorAll('#source li'), el => ({id:Number(el.dataset.id), titre:el.textContent.trim(), categorie:el.dataset.categorie, places:Number(el.dataset.places), duree:Number(el.dataset.duree), prix:Number(el.dataset.prix)}));
function afficher(lignes) {
  const liste = document.querySelector('#liste');
  liste.replaceChildren();
  for (const atelier of lignes) {
    const li = document.createElement('li');
    li.dataset.id = String(atelier.id);
    li.textContent = atelier.titre;
    liste.append(li);
  }
  document.querySelector('#compte').textContent = lignes.length + ' affiché(s) / ' + ateliers.length + ' atelier(s)';
  document.querySelector('#vide').hidden = lignes.length !== 0;
}
const recherche = document.querySelector('#recherche');
const categorie = document.querySelector('#categorie');
function selectionner(donnees, texte, choix) {
  const terme = texte.trim().toLowerCase();
  return donnees.filter(a => a.titre.toLowerCase().includes(terme) && (choix === 'toutes' || a.categorie === choix));
}
function rendre() { afficher(selectionner(ateliers, recherche.value, categorie.value)); }
recherche.addEventListener('input', rendre);
categorie.addEventListener('change', rendre);
const titre = document.querySelector('#titre');
const places = document.querySelector('#places');
const categorieAjout = document.querySelector('#categorie-ajout');
const erreur = document.querySelector('#erreur');
const message = document.querySelector('#message');
function refuser(champ, texte) {
  erreur.textContent = texte;
  champ.setAttribute('aria-invalid', 'true');
  champ.setAttribute('aria-describedby', 'aide-' + champ.id + ' erreur');
  champ.focus();
}
document.querySelector('#ajout').addEventListener('submit', event => {
  event.preventDefault();
  erreur.textContent = '';
  message.textContent = '';
  for (const champ of [titre, places]) {
    champ.removeAttribute('aria-invalid');
    champ.setAttribute('aria-describedby', 'aide-' + champ.id);
  }
  const nom = titre.value.trim();
  const quantite = Number(places.value);
  if (nom.length < 2 || nom.length > 30) {
    refuser(titre, 'Écris un titre de 2 à 30 caractères.');
    return;
  }
  if (ateliers.some(a => a.titre.toLowerCase() === nom.toLowerCase())) {
    refuser(titre, 'Ce titre existe déjà.');
    return;
  }
  if (places.value.trim() === '' || !Number.isInteger(quantite) || quantite < 0 || quantite > 20) {
    refuser(places, 'Choisis un entier de 0 à 20.');
    return;
  }
  let identifiant = 0;
  for (const atelier of ateliers) identifiant = Math.max(identifiant, atelier.id);
  ateliers.push({id:identifiant+1, titre:nom, categorie:categorieAjout.value, places:quantite, duree:0, prix:0});
  titre.value = '';
  places.value = '0';
  rendre();
  message.textContent = 'Atelier ajouté à cet essai.';
  titre.focus();
});
rendre();
```

