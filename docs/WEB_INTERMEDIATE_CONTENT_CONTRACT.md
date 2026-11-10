# Lot 5.9 : contenus originaux HTML/CSS intermédiaires

Rédaction bornée de fichiers pédagogiques uniquement. Ne modifier ni le moteur, ni le catalogue, ni les autres cours. Utiliser le schéma des sources `content/fr/html-bases` et `content/fr/css-bases`. Le propriétaire de l’intégration produit les manifestes, exécute les vrais correcteurs et publie.

Deux cours : `html-intermediaire`, préfixe `htmi`, 4 modules × 3 leçons = 12 ; `css-intermediaire`, préfixe `cssi`, 6 modules × 3 = 18. Fichiers `content/fr/<cours>/mN/<prefix>-mN-01.md` et `.exercises.json`. Ordre global `(N-1)*3+1..3`. Prérequis : première leçon HTML `html-m4-03`, première CSS `css-m4-03`, puis identifiant immédiatement précédent (y compris module précédent).

Chaque leçon : JSON front matter entre --- ; titre français, minutes:20, status:brouillon, reviewer:null,last_reviewed:null, language/runtime html ou css, environnement précis. Explication originale 350–600 mots sous `## Explication pas à pas`, avec progression concrète, lecture d’exemple et décision d’usage, jamais un gabarit répétitif. Deux exemples avec blocs ```html ou ```css, metadata examples avec expected_output, trace_fr, inputs:[], et fixture_html pour CSS. Deux erreurs fréquentes, glossaire ≥2 termes, récapitulatif ≥3, sources primaires MDN/WHATWG/W3C consultées. Trois QCM avec explication et quatre choix ; identifiants -q1..3. Respecter les rubriques du schéma existant.

Quatre exercices par leçon : guided, practice, debug, project, IDs -e1..4 ; consigne autonome et précise, starter_code non résolu, solution lisible, trois indices progressifs, explication, visible_tests et hidden_tests pertinents, common_wrong_answers:[] ; fixture_html sur chacun des CSS. Les exemples et solutions doivent réellement rendre ce qu’ils annoncent. Données fictives, aucune collecte ou serveur annoncé.

Correcteur disponible : tests {description_fr,checks:[{selector,exists/count/textIncludes/attributes/style}],viewport:{width,height},focus_selector}. `style` compare getComputedStyle ; valeurs calculées réelles, couleurs normalisées. Sélecteurs CSS valides, attributes:null teste absence. Les tests CSS peuvent utiliser viewport360/720 pour prouver une adaptation réelle. Ne pas demander des assertions que le moteur ne connaît pas. Les médias distants, scripts, formulaires envoyés et réseau sont bloqués ; ne pas prétendre qu’ils fonctionnent dans cet aperçu. Les exemples n’ont pas de browser_test obligatoire pour HTML/CSS, mais doivent être cohérents et inspectables. Ne pas faire dépendre les exercices de fichiers absents.

HTML :
- m1 Structure accessible : 01 régions nommées + lien d’évitement ; 02 articles et sections avec titres cohérents ; 03 texte sémantique, time/datetime, abbr et liens explicites.
- m2 Formulaires robustes : 01 fieldset/legend pour groupes ; 02 name/type/autocomplete/inputmode avec libellés ; 03 aides et erreurs reliées par aria-describedby/aria-invalid, état statique clairement expliqué.
- m3 Documents et données : 01 tableaux avec caption/scope ; 02 cellules à plusieurs en-têtes avec id/headers ; 03 images dimensionnées, alt pertinent, lazy loading et figure/figcaption sans dépendance réseau (SVG data URI possible).
- m4 Documents complets : 01 langue, dir et bdi ; 02 métadonnées title/description/viewport et navigation locale ; 03 projet final annuaire associatif accessible réunissant régions, formulaire, tableau et localisation.

CSS :
- m1 Cascade maîtrisée : 01 variables locales/fallback ; 02 sélecteurs :where/:is et spécificité ; 03 propriétés logiques et direction RTL.
- m2 Flexbox robuste : 01 flex-basis/grow/shrink et wrap ; 02 min-width:0 et contenus longs ; 03 composants à axes/alignements multiples sans ordre visuel incohérent.
- m3 Grilles composables : 01 minmax et pistes robustes ; 02 zones nommées et placements ; 03 grilles imbriquées et espacements cohérents.
- m4 Interfaces adaptatives : 01 media queries réellement testées à deux largeurs ; 02 typographie clamp/rem et longueur de ligne ; 03 images fluides/object-fit/aspect-ratio et débordements.
- m5 États accessibles : 01 focus visible au clavier ; 02 disabled/checked/invalid sans couleur seule ; 03 tokens de thème clair/sombre via attribut local, contrastes expliqués sans prétendre certification automatique.
- m6 Projet tableau de club : 01 structure CSS et composants réutilisables ; 02 navigation et cartes adaptatives ; 03 livraison intégrée, états accessibles et revue aux deux largeurs.

Ne pas réexpliquer seulement les bases déjà enseignées. Chaque module doit ajouter une décision de conception et un problème nouveau. Tous les programmes restent consultables sans verrou strict ; prérequis servent à l’orientation.
