# Ateliers DOM et React — 5.7.0

Deux programmes originaux en français prolongent HTML, CSS et JavaScript : `javascript-dom` et `react-bases`. Chacun possède six modules de trois leçons, deux exemples commentés par leçon, quatre exercices, trois QCM, un glossaire et un projet final. Les textes et activités restent en brouillon, avec relecture pédagogique indépendante à organiser.

## Exécution réelle

Le navigateur exécute JavaScript et manipule son vrai DOM. React et ReactDOM19.3.1 sont regroupés localement en version production ; Sucrase3.35.1 transforme JSX, Acorn8.19.0 analyse le programme. Les fonctions et boucles reçoivent un compteur de passages (20000). Chaque test reconstruit une nouvelle interface et effectue des clics, saisies, soumissions et contrôles du rendu. Le correcteur compare aussi les états intermédiaires : afficher une réponse fixe ne suffit pas pour un exercice d’interaction.

Les activités n’utilisent ni installation npm, ni terminal fictif, ni serveur Node. Les bibliothèques sont déjà fournies. Les imports supplémentaires sont refusés. L’atelier fournit `React`, `useState`, `useEffect`, `useRef` et `root` ; l’apprenant écrit les composants puis `root.render(...)`.

`chargerAteliers({mode,delai})` est un service pédagogique **simulé**, sans accès internet : Promise, délai150ms par défaut (option bornée0–200ms), succès/vide/erreur. Les activités avancées vérifient qu’une réponse ancienne n’écrase pas une demande plus récente. Le cours HTTP/API enseigne séparément les vraies requêtes natives.

## Isolation et hors ligne

La CSP HTTP des deux documents `runtime/dom-frame.html` et `runtime/react-frame.html` impose `sandbox allow-scripts` et refuse réseau, sous-frames, formulaires distants et Workers. Le parent vérifie cette politique avant de charger l’aperçu. L’origine du document enfant est opaque : l’accès au document parent et aux cookies est refusé. Les messages vérifient leur fenêtre source et un jeton propre à chaque essai. La page principale conserve sa politique sans scripts inline ni eval.

Le sandbox est appliqué par l’en-tête de réponse, après la navigation. Un attribut iframe imposant l’origine opaque avant la requête contournerait le service worker et empêcherait le redémarrage à froid hors ligne. Les réponses avec leur CSP sont conservées dans CacheStorage ; ces documents bénéficient d’une lecture du cache avant réseau. La configuration Vercel et `scripts/serve-test.py` doivent conserver exactement cette politique HTTP : le méta HTML ne remplace pas la directive HTTP sandbox.

L’éditeur et les deux moteurs se chargent à la demande. « Emporter ce cours » enregistre le pack, l’éditeur, le moteur, le document isolé et ses notices. Les URL des moteurs portent une empreinte calculée à partir de leurs sources et dépendances ; une évolution du moteur renouvelle aussi la révision du cours. La progression et le code restent sauvegardés ; les clics et l’état du document de démonstration sont temporaires.

## Limites

Les compteurs interrompent les boucles et fonctions instrumentées. Ils ne constituent pas un plafond strict de mémoire ou une garantie contre toutes les opérations natives coûteuses (allocation, expression régulière, etc.). Les tests sont formatifs et inspectables dans le navigateur, sans intégrité d’examen. Les appareils Android modestes et Safari iOS réels restent à tester avec des élèves.

## Vérification

- `scripts/test-interactive-engine.mjs` : événements natifs, React, champs contrôlés, Promise, collections vides, arrêt, refus réseau et accès parent, reprise à froid hors ligne.
- `scripts/test-interactive-content.mjs` : exemples et solutions exécutés dans Chrome, codes de départ incomplets refusés.
- `scripts/test-interactive-ui.mjs <course-id>` : tous les exercices et QCM dans le site à360/1440px, navigation interne, rechargement, téléchargement puis reprise hors ligne et contrôle axe.

Les rapports JSON correspondants dans `docs/` indiquent les résultats réellement obtenus.
