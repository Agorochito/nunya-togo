# Point de reprise — 6 novembre 2026, livraison5.7.0

## Livré dans ce lot

Deux cours originaux en français : JavaScript DOM et React,18leçons/72exercices/54QCM/36exemples chacun, six modules et projet. Bibliothèques réelles, état temporaire distinct de la sauvegarde du code, éditeur coloré, isolation CSP HTTP et reprise à froid hors ligne. Les notices techniques de l’atelier sont condensées pour laisser de la place au code. Les sources restent en brouillon avec reviewer:null.

Catalogue principal :8programmes,50modules,167leçons,668exercices,501QCM. Git/GitHub (12leçons) et Découverte du numérique (20leçons) sont séparés. Les ressources de bibliothèque ne sont pas comptées comme des cours Nunya terminés.

## Vérifié avant publication

182tests unitaires, TypeScript, ESLint, compilation, structure, prérequis et liens internes. Tous les exemples/solutions DOM et React ont été exécutés dans Chrome ;144codes initiaux incomplets ont été refusés. Les36leçons et144exercices ont été parcourus dans le site à360px et1440px, avec108QCM par taille, rechargement et téléchargement puis exécution hors ligne. Zéro erreurJavaScript dans ces parcours, zéro violationaxe sur les vues contrôlées.

Les régressions HTML/CSS, Python, JavaScript,42introductions/182leçons/562questions, sauvegardes, bibliothèque, Git, HTTP et SQL passent. Catalogue8cours/9raccourcis, filtres et repli hors ligne passent. Migrations2df60ddf (1cours),842013e5 (6cours),baf7aa91 (6cours) vers8cours : ouverture sans deuxième actualisation, brouillon et position conservés. Les rapports dans docs donnent le détail ; les contrôles automatiques ne remplacent pas une relecture humaine.

`6608f085` est le point de contenu envoyé à la branche de revue avant les derniers rapports et l’allègement visuel. La version finale comprend le commit suivant de vérification. Le dépôt GitHub déclenche Vercel automatiquement depuis main. Le script `scripts/test-production-interactive.mjs` vérifie ensuite l’accès public, DOM/React/SQL et le hors-ligne ; son résultat local va dans artifacts/.

## Reste du prompt

La cible globale72cours dans24familles et les séries complémentaires n’est pas terminée. Node/Express, TypeScript, les niveaux supérieurs et les autres langages restent dans la matrice de couverture. Ne pas déclarer une introduction complète pour tous les niveaux ou inventer un moteur Node à partir du Worker JavaScript. Pour la prochaine série Node, reprendre `NEXT_RUNTIME_DECISIONS.md` et valider d’abord le moteur, les appareils ciblés et l’offline.

Poursuivre aussi les parcours longs des secteurs non techniques, la couverture scolaire précise par classe/série/examen et la relecture avec des enseignants/professionnels togolais. Préserver les programmes disponibles, les IDs, les sauvegardes, Nunya Aide et le choix local sans compte. Garder les programmes non rédigés dans la section repliée « en préparation », sans cartes de cours vides ni fausse certification.
