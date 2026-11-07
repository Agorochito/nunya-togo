# JavaScript : interfaces et événements — contrat

Cours original `javascript-dom`, runtime `dom`, language `javascript`, niveau intermédiaire après les socles HTML, CSS et JavaScript. Six modules de trois leçons : `dom-m1-01`…`dom-m6-03`, order1…18,20min par leçon. Format identique aux leçons `content/fr/http-bases` : métadonnées JSON entre `---`, deux blocs javascript ; 300–700 mots d'explication, 2 exemples avec trace et sortie descriptive, 4 exercices, 3 QCM, erreurs fréquentes, glossaire et récapitulatif. IDs ex `-e1`…`-e4`, quiz `-q1`…`-q3`. Statut brouillon, reviewer:null, français ; sources MDN primaires. Les apprenants connaissent fonctions, objets, tableaux, boucles ; expliquer les nouvelles API DOM. Pas de serveur, compte, stockage réel ou module importé.

L'apprenant écrit du vrai JavaScript exécuté dans un document de navigateur isolé. Une nouvelle page de démonstration est créée à chaque essai/test. HTML fourni dans `fixture_html` (exercice et exemple). Le code source et la progression sont sauvegardés, pas l'état temporaire de cette interface. Pas de `import`, `export`, eval, new Function, requêtes réseau, worker ni dépendance. N'invente pas un terminal. Préférer textContent/createElement aux chaînes HTML issues de saisies. IDs et textes demandés sont explicites dans la consigne.

## Format des exercices

Même shape que HTTP, mais tests de navigateur réels, sans inputs/expected_output :

```json
{
 "id":"dom-m1-01-e1","kind":"practice","title_fr":"...","instruction_fr":"...",
 "fixture_html":"<main><h1 id=message>Avant</h1></main>",
 "starter_code":"...","solution":"...",
 "visible_tests":[{"description_fr":"...","checks":[{"selector":"#message","text":"Bonjour"}]}],
 "hidden_tests":[{"description_fr":"...","fixture_html":"...autres valeurs...","checks":[...]}],
 "hints":["...","...","..."],"explanation_fr":"...","common_wrong_answers":[]
}
```

Un test peut vérifier un état initial avec `checks`, puis une suite de `steps` :

```json
{"description_fr":"Deux clics incrémentent vraiment","checks":[{"selector":"#total","text":"0"}],"steps":[
 {"action":"click","selector":"#plus","checks":[{"selector":"#total","text":"1"}]},
 {"action":"click","selector":"#plus","checks":[{"selector":"#total","text":"2"}]}
]}
```

Actions : click ; input avec `value` chaîne (saisie dans input/textarea/select et vrais événements input/change) ; submit sur un form ; keydown avec `key` ; focus. Pas d'action inventée. Si nécessaire `wait_ms` entier0…200 après une action pour une tâche réellement asynchrone. Checks supportés : selector obligatoire ; `exists:false` ; `count` ; `text` EXACT après normalisation espaces ; `textIncludes` ; `texts` tableau exact des textes de tous les éléments ; `value` du premier contrôle ; `attributes` (valeurs chaînes ou null pour absent) ; `classes` tableau de classes attendues ; `checked` booléen ; `focused:true`. Les checks sont cumulés ET et un check doit vérifier au moins une propriété en plus du selector. Si `exists:false`, ne pas lui demander autre chose. Un champ disabled s'évalue par attributes:{disabled:""} (présent) ou null (absent).

Minimum 1test visible+1caché avec de vrais cas différents (autres données initiales, autres textes saisis ou séquence d'actions). Détecter le code statique sans événements en testant plusieurs états. 4ex variés par leçon : guidé, transfert, débogage, mini-projet. Les solutions sont testables uniquement avec ces actions/checks. Ne pas compter une capture d'écran comme une preuve. Chaque exemple fournit fixture_html, expected_output descriptif, trace_fr ; inclure `browser_test` avec checks/steps vérifiables qui démontre le comportement décrit, pour l'exécution automatique de l'exemple. Le texte explique quand cliquer/taper pour observer.

## Programme

M1 : 01 DOM/arbre/document/querySelector/textContent ; 02 lire/écrire propriétés et attributs,value,dataset (pas événements encore) ; 03 querySelectorAll et boucles, états vides.
M2 : 01 addEventListener click et closures ; 02 état numérique et rendu cohérent, conversions Number ; 03 événement,currentTarget/target, délégation avec closest, vérifier cible avec contains.
M3 : 01 saisie input et aperçu via événement input ; 02 submit,preventDefault,trim, contraintes simples+retour accessible ; 03 clavier/focus, touches et commandes natives, privilégier button plutôt que div cliquable.
M4 : 01 classList et hidden, état explicite + aria-expanded ; 02 createElement,append,replaceChildren,textContent ; 03 retirer/mettre à jour liste à partir d'un état, délégation, pas indices instables.
M5 : 01 filtrage et états vides à partir d'un tableau ; 02 tri et copie sans détruire l'état source ; 03 composition de fonctions de rendu, séparer calcul et DOM (pas encore import/export).
M6 : 01 validation accessible, aria-live et liens label/erreur ; 02 déboguer un listener répété et état, écouteurs ajoutés une fois ; 03 projet catalogue d'ateliers fictifs : filtre,recherche,ajout/compteur,retours accessibles. Projet final avec étapes possibles et grille (fonctionnement,clarté,tests,explication), intégré aux 4 activités de la leçon.

Prérequis de chaque leçon = précédente dans ce cours ; premier[]. M1/m2 puisM3/m4 puisM5/m6 sont rédigés en parallèle sans dépendance aux fixtures des autres. Fournir tous les HTML dans chaque exercice/exemple. Les datasets et noms sont fictifs, adaptés à des associations et élèves francophones/Togo sans promesse d'emploi ou de diplôme. Les niveaux avancés et les modules/imports réels restent une suite distincte. Chaque fichier contient la correction pour la génération, pas du contenu tiers recopié.
