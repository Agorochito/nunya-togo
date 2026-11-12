# Historique

## 5.28.2 — 12 novembre 2026

- **Sécurité (suite à un scan OWASP ZAP du site public)** :
  - **clickjacking** : aucune page de Nunya ne peut plus être affichée dans un cadre par un autre site. Toutes les pages HTML reçoivent `Content-Security-Policy: … frame-ancestors 'self'`, et tout le site reçoit `X-Frame-Options: SAMEORIGIN`. Les ateliers isolés (`dom-frame.html`, `react-frame.html`) restent utilisables dans Nunya ;
  - **CSP en en-tête HTTP** : l'accueil reçoit sa politique en en-tête, identique à la balise `meta` avec `frame-ancestors` en plus, puisqu'une balise `meta` ne peut pas porter `frame-ancestors`. `guide-public.html`, qui n'a pas de JavaScript, reçoit une politique qui interdit tout script ;
  - **CORS** : Vercel envoyait `Access-Control-Allow-Origin: *` sur tous les fichiers. Seul `https://nunya-togo.vercel.app` est désormais autorisé. Les contenus sont publics et sans cookie, donc le risque était faible ; l'application n'utilise que des requêtes de même origine ;
  - **Permissions-Policy** : caméra, micro, géolocalisation, paiement et USB sont désactivés, car Nunya ne s'en sert pas ;
  - **atelier isolé** : une URL encodée comme `/runtime/dom%2Dframe.html` échappait aux règles d'en-têtes propres à ce fichier. La page était donc servie sans `sandbox` et pouvait être encadrée par un autre site, qui aurait pu y faire exécuter du code sur l'origine de Nunya. `X-Frame-Options` bloque maintenant ce cadre. En plus, `lib/dom/frame.mjs` refuse d'exécuter du code si son origine n'est pas opaque, c'est-à-dire si la page n'est pas réellement isolée. Faille relevée par une relecture adverse du correctif ;
  - **pages de test retirées de la production** : `test-assessment.html`, `test-onboarding.html`, `test-results.html` et leurs données `_test-*-data.js` étaient des maquettes de développement de la 5.2.0. Elles étaient publiques mais n'étaient liées nulle part.
- **Contrôle** : `npm run check:headers`, ajouté à la CI, vérifie que chaque page HTML publiée refuse d'être encadrée ailleurs. Il vérifie aussi que la CSP d'en-tête de l'accueil reste celle de la balise `meta`, que les ateliers gardent `sandbox allow-scripts` et que deux règles de `vercel.json` ne fixent jamais le même en-tête pour un même fichier.
- **Tests** : `scripts/serve-test.py` lit maintenant les en-têtes directement dans `vercel.json`, au lieu d'en recopier une partie. Les tests navigateur locaux et ceux de la CI voient donc les mêmes en-têtes que la production.
- **CI** : le job `browser-regressions` a désormais 120 minutes au lieu de 90. La suite durait entre 75 et 90 minutes selon le runner, et un passage a été coupé à la limite alors qu'aucun test n'avait échoué.
- Cache `nunya-v5.28.2`.

## 5.28.1 — 11 novembre 2026

- **Accueil** : la barre tissée sous le grand bandeau et au-dessus des bandes sombres est retirée. À la place, des arcs doux : le grand bandeau se termine en arc, et chaque bande sombre s’ouvre en dôme par-dessus la section précédente (dont la couleur reste visible dans les coins) puis, sauf la dernière, se referme en arc. Rendu net dans les sept ambiances, en clair comme en sombre.
- **Tests** : les 21 tests d’interface qui enchaînent les exercices attendent désormais que l’exercice suivant soit réellement affiché avant de taper la solution, et relancent « Exercice suivant » si le clic est arrivé avant l’enregistrement de la réussite. Le test PHP échouait parfois en CI pour cette raison ; l’application, elle, ne change pas.
- Cache `nunya-v5.28.1`.

## 5.28.0 — 11 novembre 2026 · un vrai accueil

- **Nouvel accueil**, pour tout le monde, y compris à la première visite :
  - un bandeau sombre sous la barre du haut liste les technologies du catalogue (HTML, CSS, JavaScript, Python, SQL, PHP, Java, C++, Git, Linux, React, TypeScript, Node.js, IA…), chacune menant à son programme ; il défile au doigt, au clavier et à la molette ;
  - un grand bandeau « Apprends à coder. En français. » avec une recherche (vers la page Rechercher), « Commencer avec Python », « Personnaliser mon parcours » et « Voir les 28 cours » ; à droite, un petit programme Python et son résultat ;
  - pour qui revient : « Bon retour, <prénom>. On continue ? », « Reprendre la leçon N » (ou « Continuer avec la leçon N+1 ») et une carte de progression réelle : cours, leçon en cours, leçons terminées avec un anneau et un pourcentage, exercices réussis ces 7 derniers jours (s’il y en a), leçon suivante ; la reprise tient compte du dernier cours ouvert et de Git ;
  - « Que veux-tu apprendre ? » : des onglets HTML, CSS, JavaScript, Python et SQL (flèches du clavier ; une ligne qui défile sur téléphone), chacun avec un exemple original dans une fenêtre d’éditeur, son résultat exact, « Essayer dans Nunya » et « Voir le programme » ;
  - « Tous les cours » : une tuile par technologie (le DOM rejoint JavaScript, les deux projets guidés partagent une tuile), rangées par domaine sous un titre coloré ; chaque tuile a une tête teintée avec la marque Nunya, une phrase de présentation et un lien par niveau (leçons, avancement) ; 2 colonnes sur téléphone, 4 sur ordinateur ;
  - des bandes d’une seule idée chacune, fond de page et surface en alternance (surface relevée en mode sombre) : ton travail reste sur ton appareil (sans compte ; lecture hors connexion ; C++, Java, Linux, Node.js et TypeScript exécutent le code en ligne), l’attestation Nunya de fin de cours (pas un diplôme ; Git n’en délivre pas), Nunya Aide (des indices, 15 questions par jour, avec connexion), les parcours métiers, puis Mes cours & examens, Mon avenir et la révision du jour ;
  - une bande de fin : une dernière invitation et toutes les technologies.
- **Première visite** : l’accueil remplace l’écran de préférences. « Personnaliser mon parcours », « J’ai déjà une sauvegarde », « Passer et choisir moi-même » et le choix de l’ambiance restent sur la page ; le parcours de personnalisation et le message aux moins de 13 ans ne changent pas.
- **Titres** : police sans empattement du système, en graisse forte, sur tout le site (plus de mélange serif / sans-serif) ; titres équilibrés sur leurs lignes.
- **Accessibilité** : anneau de focus de la recherche lisible sur le champ clair, anneaux du bouton « Essayer ce programme » et des onglets non coupés.
- L’accueil est chargé à la demande (`runtime/home-landing.js` et `.css`, précachés) ; le catalogue, le module et la feuille partent en même temps. Contrôle de contraste élargi aux couleurs de l’accueil ; la feuille de l’accueil est soumise au cliquet CSS.
- **Budget du JavaScript du cœur** relevé de 150 000 à 300 000 octets gzip (décision du propriétaire) ; le cœur en pèse environ 150 000.
- Cache `nunya-v5.28.0`.

## 5.27.1 — 11 novembre 2026

- Écran d’accueil : les trois choix (« Personnaliser mon parcours », « Passer et choisir moi-même », « J’ai déjà une sauvegarde ») ne sont plus collés ; deux boutons de même taille côte à côte, le lien de restauration centré dessous, empilés sur téléphone ; libellés traduits en anglais.
- Cache `nunya-v5.27.1`.

## 5.27.0 — 11 novembre 2026 · nouvelle apparence (refonte visuelle, phases 0 et 1)

- **Palette « forêt, latérite, soleil »** dans les sept ambiances, en clair et en sombre : la latérite marque ce qui est « en cours » (barres de progression, surtitres, leçon actuelle, menu actif), le soleil les boutons principaux des grands panneaux et les badges obtenus. Nunya passe sur un fond crème et un sombre plus profond.
- **Un panneau « moment »** sombre par page clé (reprise sur l’accueil, en-tête du catalogue, en-tête d’un programme) : un repère visuel clair au lieu du même panneau vert pâle partout.
- **Lisibilité** : plus aucun texte sous 12 px (surtitres, notes, menus, petits libellés) ; les paragraphes et le texte des leçons passent en couleur d’encre (16 px, interligne 1,65) au lieu du gris imposé partout ; bordures des champs, listes et boutons secondaires visibles (contraste 3:1).
- **Badges** : verrouillé (pointillés, discret) et obtenu (doré) se distinguent enfin.
- Corrections : la note grise de « Ma progression » et l’onglet « Coder » en Verre liquide sont lisibles ; la barre du bas ne cache plus la fin des leçons sur téléphone ; « 4,4 h » au lieu de « 4.4 h » ; « 6 Séances » au pluriel ; icônes distinctes pour Santé, Agriculture et Environnement ; boutons d’export d’une leçon séparés ; interrupteur et sélection de texte lisibles en Verre sombre.
- CSS ramené à 39,6 Ko gzip (budget 40 Ko) en retirant d’anciennes surcharges ; JS du cœur en baisse.
- Cache `nunya-v5.27.0`.

### Fondations (phase 0)

- Plan de refonte visuelle et décisions du propriétaire : docs/PLAN_REFONTE_VISUELLE.md (palette forêt, latérite, soleil ; motif tissage ; une dizaine de jalons ; les sept ambiances conservées).
- Nouveaux jetons générés pour les sept ambiances, en clair et en sombre (couleurs chaudes, panneau « moment », bordures fortes, couleurs de domaine, échelles de texte, d’espacement et de rayons), encore inutilisés : l’apparence du site ne change pas. Le contrôle de contraste couvre aussi les éléments non textuels.
- Garde-fou CSS (npm run check:css) : budget gzip et cliquet sur les !important, les couleurs en dur et les textes de moins de 12 px.
- Captures de référence et axe portables, y compris sous Windows (npm run test:visual) ; axe tourne aussi en CI. Deux défauts de contraste repérés, corrigés en phase 1 : la note grise de « Ma progression » et l’onglet actif « Coder » en Verre liquide.
- Fins de ligne LF imposées (.gitattributes) pour des constructions identiques sous Windows, macOS et Linux.

## 5.26.0 — 11 novembre 2026

- **Attestation de fin de cours** : quand toutes les leçons d’un cours sont validées, la page du programme propose « Mon attestation Nunya ». L’élève tape le nom à afficher (non vérifié, jamais envoyé), puis imprime, enregistre en PDF ou télécharge un fichier HTML autonome. Le document est titré « Attestation Nunya — pas un diplôme » et liste les compétences et les modules du cours.
- **Imprimer ou PDF depuis une leçon** : nouveau bouton à côté de la fiche de lecture, avec ou sans indices et corrigés. Ctrl+P sur une page de cours n’imprime plus une page blanche (la règle d’impression du CV ne s’applique plus qu’au CV) ; menus et éditeur sont masqués.
- **Changement de parcours** : la fenêtre distingue un premier choix (« Commencer ce parcours »), le parcours déjà suivi (« Reprendre le parcours ») et un changement (« Rester sur « X » » / « Changer et commencer », avec le rappel que la progression du parcours actuel est conservée).
- Prérequis de leçon venant d’un autre cours : le titre du cours et de la leçon s’affiche au lieu de l’identifiant brut (par ex. « css-m4-03 »). Le contrôle des prérequis refuse désormais un identifiant de cours écrit dans les prérequis en texte.
- Titres en police serif déjà présente sur l’appareil (aucun téléchargement), distincte du texte courant.
- Le choix de langue EN est conservé après rechargement ; menu et fil d’Ariane affichent « Learn to code » en anglais. Les parcours full-stack et ingénieur·e logiciel choisis ne sont plus oubliés au rechargement.
- Cache `nunya-v5.26.0`.

## 5.25.0 — 10 novembre 2026

- Nouveau cours : **Backend en ligne : PostgreSQL et Supabase**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux : types, contraintes et identités PostgreSQL, RETURNING et agrégats filtrés, vues, fonctions et déclencheurs PL/pgSQL, UPSERT et transactions, puis rôles et privilèges, sécurité par ligne avec auth.uid(), politiques d’écriture WITH CHECK, traduction des appels supabase-js, fonctions SECURITY DEFINER appelées par RPC et migration de sécurité d’une boutique prête pour la production.
- Nouveau moteur : vrai PostgreSQL 18 (PGlite, WebAssembly) dans un Worker du navigateur, sans Docker ni serveur ; environ 6 Mo compressés, téléchargés seulement pour ce cours et disponibles hors ligne une fois enregistrés. Les rôles anon, authenticated et service_role et la fonction auth.uid() reproduisent Supabase : chaque politique est vérifiée sous plusieurs identités (client, autre client, vendeur, visiteur).
- Un script qui laisse une transaction ouverte échoue avec un message clair, comme dans l’atelier SQLite.
- Parcours Backend et Full-stack : le cours s’ajoute après SQL. L’étape « Docker et déploiement » reste annoncée.

## 5.24.0 — 10 novembre 2026

- Nouveau cours : **Projet complet : une boutique en ligne full-stack**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, sur Node.js 20 en ligne : routeur à paramètres, modèle de données validé avec identifiants sûrs, pages HTML générées par le serveur et échappées, formulaire selon Post/Redirect/Get (303) avec erreurs et valeurs réaffichées, API JSON avec recherche, panier en cookie HttpOnly et SameSite dont les prix viennent toujours du serveur, pagination bornée, filet d’erreurs (500 sans détail technique), limite de taille (413), en-têtes de sécurité (CSP, nosniff), configuration par variables d’environnement et application complète testée par des parcours de bout en bout.
- Complète le parcours Développeur·se full-stack : l’étape « Projet complet — en préparation » est remplacée par ce cours.
- Atelier Node.js : l’outil d’essai nunyaEchange montre aussi les redirections, les cookies et les en-têtes de sécurité d’une réponse.

## 5.23.0 — 10 novembre 2026

- Nouveau cours : **TypeScript : du JavaScript sûr**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, compilés par TypeScript 5.6 en mode strict puis exécutés en ligne (Wandbox) : annotations et inférence, tableaux, tuples, any et unknown, fonctions typées, interfaces, unions et rétrécissement, null et undefined en mode strict, unions discriminées avec vérification d’exhaustivité, génériques, types utilitaires, classes, gardes de type pour les données externes et suivi de commandes typé. Certaines vérifications contrôlent qu’un appel incorrect est bien refusé par les types de l’élève : des types trop larges, comme any, les font échouer. Les erreurs de type sont expliquées en français avec la ligne de l’élève.
- Remplace la série « TypeScript : démarrer avec les types — en préparation » et l’étape TypeScript prévue du parcours front-end.

## 5.22.0 — 10 novembre 2026

- Nouveau cours : **Node.js : le serveur en JavaScript**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, sur Node.js 20 en ligne (Wandbox) : modules et module.exports, JSON et validation, boucle d’événements et rappels erreur d’abord, promesses, async/await et Promise.allSettled, fichiers avec fs.promises, premier serveur HTTP, routes et paramètres avec URL, API JSON qui lit et valide un corps POST (201, 400, 404, 405), EventEmitter, échappement HTML, noms de fichiers sûrs, validation d’inscription et API de boutique complète. Les serveurs écrits par l’élève sont réellement démarrés et interrogés par l’atelier sur un port local temporaire.
- Remplace la série « Node.js : les bases du serveur — en préparation » et l’étape Node.js prévue du parcours full-stack.
- Atelier Node.js : les erreurs, y compris dans les vérifications, sont expliquées en français avec la ligne de l’élève ; une erreur dans un gestionnaire asynchrone n’interrompt plus les cas suivants.

## 5.21.0 — 10 novembre 2026

- Nouveau cours : **Intelligence artificielle : comprendre, vérifier, se protéger**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne, sans aucun service d’IA en ligne : seuil appris, plus proches voisins, exactitude, précision et rappel, régression comparée à un modèle de référence, filtre d’arnaques par sac de mots, perceptron entraîné pas à pas, biais mesurés groupe par groupe, sur-apprentissage, mini-modèle de langage et hallucinations, masquage des données personnelles, arnaques à fausse voix et injection de consignes.
- Remplace la série « Introduction à l’IA et à la cybersécurité — en préparation » ; ajouté aux parcours Analyste de données et Cybersécurité.

## 5.20.0 — 10 novembre 2026

- Nouveau cours : **Projet web : ma page personnelle**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, dans le vrai moteur de rendu de Nunya : plan et squelette sémantique, présentation avec image décrite et listes, projets et liens sûrs, feuille de style avec variables CSS, contraste et typographie, cartes en grille, mobile d’abord et requêtes média vérifiées à 360 et 1 000 pixels, images et mots longs qui ne débordent pas, volets details, focus clavier visible, formulaire de contact accessible, liste de contrôle et publication sur GitHub Pages.
- La série « Projet web : ma page personnelle — en préparation » et l’étape « Projet web : mon portfolio » du parcours front-end sont remplacées par ce cours.

## 5.19.0 — 10 novembre 2026

- Nouveau cours : **Statistiques avec Python : décrire, relier, estimer**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne : moyenne, médiane et mode, étendue, variance et écart-type (population et échantillon), quartiles et valeurs aberrantes, effectifs et fréquences cumulées, classes et histogrammes, nettoyage d’un fichier CSV (virgule décimale, valeurs manquantes, doublons), covariance, corrélation et ses pièges, droite de régression et résidus, probabilités et simulation reproductible, marge d’erreur et intervalle de confiance, puis enquête complète d’un lycée.
- Le cours remplace l’étape « Statistiques avec Python — en préparation » du parcours Analyste de données.
- Catalogue : chaque grand domaine (Web, Langages, Données, Cybersécurité, Outils) se replie ou se déplie d’un clic sur son titre, avec le nombre de cours affiché ; un bouton « Tout replier / Tout déplier » permet de passer d’un défilement complet à une vue compacte. Le choix reste sur l’appareil.
- Barre latérale repliée : les liens du bas (« Donner mon avis », « Un coup de pouce ? ») se replient aussi en icônes, avec info-bulle et nom accessible, au lieu d’afficher leur texte mot par mot.

## 5.18.0 — 10 novembre 2026

- Nouveau cours : **PHP intermédiaire : objets et données**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, sur le vrai PHP 8.3 hors ligne : declare(strict_types=1), types nullables et arguments nommés, array_map/array_filter/array_reduce/usort et <=>, sprintf, number_format et match, classes avec constructeur promu, private et readonly, constantes et fabriques statiques, héritage, classes abstraites et interfaces, exceptions personnalisées et finally, JSON avec JSON_THROW_ON_ERROR, énumérations et transitions d’état, collections d’objets, validation avec filter_var et échappement avec htmlspecialchars, puis gestion des inscriptions d’une association.
- L’atelier PHP accepte declare(strict_types=1) sur la ligne qui suit <?php, comme on l’écrit d’habitude (les numéros de ligne des erreurs restent exacts).
- Le cours remplace l’étape « PHP intermédiaire — en préparation » du parcours back-end.
- Nouveau cours : **Algorithmes et structures de données**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne : complexité, recherche dichotomique, tris simples, récursivité, tri fusion, tri rapide, piles, files, dictionnaires et ensembles, graphes, parcours en largeur et en profondeur, tri topologique et plus court chemin entre villes du Togo.
- Nouveau cours : **Qualité logicielle : tester, déboguer, relire**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne : assert et tests en tableau, cas limites et classes d’équivalence, lecture des traces, débogage par hypothèses et par dichotomie, pièges classiques de Python, noms et petites fonctions, constantes, docstrings, doctests et annotations, développement piloté par les tests, revue de code et petit linter. Les tests écrits par l’élève sont éprouvés par des versions volontairement défectueuses du code (test par mutation).
- Le parcours Ingénieur·e logiciel est complet : les deux étapes « en préparation » sont devenues ces deux cours.
- Ambiance **Verre liquide** redessinée : plus aucune teinte verte. Le mode sombre passe sur un fond nuit traversé de bleu, violet, rose et ambre ; le mode clair devient un verre blanc dépoli à accent saphir. Panneaux plus flous et plus lumineux sur leurs bords ; tous les textes restent au-dessus de 4,5:1 sur chaque zone de couleur.
- Sur ordinateur, la barre latérale se replie en un rail d’icônes (bouton en haut de la barre) ; les liens gardent leur nom accessible et une info-bulle, et le choix reste sur l’appareil.
- Une réussite d’exercice est maintenant célébrée : le message de réussite apparaît avec une petite animation et le bouton « exercice suivant » s’illumine. Les animations respectent la préférence « réduire les animations ».

## 5.17.0 — 10 novembre 2026

- Nouveau cours : **SQL intermédiaire : analyser les données d’une boutique**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, sur le vrai SQLite hors ligne : CASE et agrégation conditionnelle, fonctions de texte et de dates, UNION/INTERSECT/EXCEPT, sous-requêtes scalaires et corrélées, WITH et requêtes récursives (chaîne de parrainage, calendrier), ROW_NUMBER/RANK/DENSE_RANK, cumuls et moyennes glissantes, LAG/LEAD, vues et index (dont unique), UPSERT, déclencheurs qui tiennent le stock à jour et refusent une vente impossible, puis tableau de bord complet.
- Deux nouvelles bases fictives, `boutique` et `boutique-variation` (produits, clients avec parrainage, ventes datées), à côté des bases du cours débutant. Les bases initiales déclarent désormais leur propre schéma, et le contrôle de construction SQL vérifie tous les cours SQL.
- Le cours rejoint les parcours analyste de données (il remplace l’étape « SQL intermédiaire — en préparation ») et back-end.

## 5.16.0 — 10 novembre 2026

- Nouveau cours : **Réseaux informatiques : comprendre et diagnostiquer**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne avec le module ipaddress et des relevés fictifs : adresses IPv4 privées et publiques, masques et notation CIDR, plan d’adressage d’une école en sous-réseaux, couches TCP/IP et encapsulation (MTU, TTL), ports et protocoles, DNS et alias, ping (perte, latence, gigue), traceroute, vérification de configurations et conflits d’adresses, règles de pare-feu à première correspondance, Wi-Fi sécurisé et matrice de flux entre zones, puis diagnostic complet du réseau d’un collège.
- Le cours complète le parcours cybersécurité (il remplace sa dernière étape en préparation) et rejoint le domaine « Outils et systèmes » du catalogue.

## 5.15.0 — 10 novembre 2026

- **Sept ambiances visuelles** remplacent l’ancien choix de couleur : Nunya (vert forêt et orange, nouvelle apparence par défaut), Lagune, Kente, Sauge, Prune, Nuit et **Verre liquide** (panneaux translucides sur des champs de couleur animés). Chaque ambiance existe en clair et en sombre ; le choix se fait dès l’écran d’accueil ou dans « Mon profil & confort », avec un aperçu par carte, et reste sur l’appareil. La couleur personnalisée reste disponible (« Ou compose ta propre couleur ») et les anciens choix sont conservés.
- Cartes avec relief et léger soulèvement au survol, barres de progression plus visibles, boutons animés ; tout mouvement s’arrête si le système demande moins d’animations.
- Verre liquide léger automatique (panneaux opaques, fond immobile) sur les appareils de 2 Go de mémoire ou moins, en mode économie de données du navigateur ou si le système demande moins de transparence ; réglage manuel « Verre léger ».
- Les palettes sont générées par `scripts/build-ambiances.py`, qui refuse la construction si un texte passe sous 4,5:1 dans une ambiance, y compris sur le verre au-dessus de ses couleurs les plus vives.
- Nouveau cours : **Cybersécurité : défendre une petite organisation**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux, en Python hors ligne et sur données fictives : triade confidentialité-intégrité-disponibilité et score de risque, mots de passe et listes interdites, hachage salé, hameçonnage et domaines sosies, journaux de connexion et force brute, connexions inhabituelles, moindre privilège et séparation des tâches, validation des entrées et échappement, encodage/chiffrement/hachage et intégrité des fichiers, sauvegardes 3-2-1, réponse aux incidents, puis audit complet d’une coopérative. Cadre légal togolais rappelé (loi n° 2018-026, CERT.tg).
- Le cours remplace l’étape « Cybersécurité — en préparation » du parcours cybersécurité et ouvre le domaine « Cybersécurité » du catalogue.

## 5.14.0 — 10 novembre 2026

- Nouveau cours : **Java : premiers programmes**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux en français : `System.out.println`, types et `final`, calculs et division entière, saisies avec `Scanner` et `Integer.parseInt`, `if`/`else` et `equals`, `switch` en flèche, `while`, `for`, méthodes et surcharge, tableaux, `String` et `ArrayList`, classes et constructeurs, encapsulation, exceptions avec `try`/`catch`, et projet de gestion d’une boutique de quartier (stock, ventes refusées, rapport).
- Java 21 (OpenJDK) compilé sur Wandbox par le Worker en ligne partagé, en une requête par vérification. Les erreurs du compilateur gardent la ligne de l’élève ; les exceptions (division par zéro, indice hors du tableau, `null`, conversion impossible…) sont expliquées en français avec leur ligne, et chaque cas est arrêté au-delà de 5 secondes sans bloquer les autres explications. Les méthodes et les objets de l’élève sont vérifiés directement, par exemple `new Champ(5, 8).surface()`.
- Le cours remplace l’étape « Java — en préparation » du parcours ingénieur·e logiciel et rejoint le parcours back-end. Il apparaît dans le domaine « Langages de programmation » du catalogue.
- La page « Tes données, en clair » cite aussi Java parmi les ateliers en ligne. Explications ajoutées pour 13 exceptions Java.

## 5.13.0 — 9 novembre 2026

- Nouveau cours : **Terminal et Linux : les bases**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux en français : commandes et arguments, dossiers et chemins, `mkdir`/`cp`/`mv`/`rm`, `cat`/`head`/`tail`/`wc`, `grep`, tubes avec `sort`/`uniq`/`cut`, redirections, variables et `read`, `if`, boucles, droits avec `chmod`, et projet d’analyse d’un journal de connexions qui signale les adresses suspectes.
- Les commandes s’exécutent dans un vrai Linux (Bash 5.2) sur Wandbox, en une requête par vérification : chaque cas démarre dans un dossier neuf avec ses fichiers et leurs droits de départ, puis des commandes de vérification inspectent le résultat. Erreurs de commande signalées avec leur ligne ; script arrêté au-delà de 5 secondes. Les fichiers de départ sont visibles sous l’éditeur.
- Le cours remplace l’étape « Terminal et Linux — en préparation » des parcours back-end et cybersécurité, et rejoint le parcours ingénieur·e logiciel. Le catalogue gagne le domaine « Outils et systèmes ».
- La page « Tes données, en clair » précise ce qui est envoyé à Wandbox pour les ateliers C++ et Terminal.

## 5.12.0 — 9 novembre 2026

- Six **parcours métiers** au lieu de quatre : développeur·se web front-end, back-end, full-stack (nouveau), ingénieur·e logiciel (nouveau), analyste de données et cybersécurité. Chaque carte indique les métiers visés et le nombre d’étapes encore en préparation.
- La fenêtre d’un parcours numérote les étapes, déplie les modules de chaque cours avec leur nombre de leçons, puis affiche les étapes à venir (Terminal et Linux, Docker, TypeScript, Java, algorithmes, réseaux…) avec la mention « En préparation ». Ces étapes ne comptent pas dans la progression et ne peuvent pas être commencées.
- Un lien vers le niveau 0, Découverte du numérique, est proposé dans chaque parcours aux personnes qui débutent complètement.
- Le catalogue range les cours par domaine (Web : sites et applications, Langages de programmation, Données) quand aucune recherche ni filtre n’est actif. Les identifiants des anciens parcours sont conservés : un objectif déjà choisi reste actif.

## 5.11.0 — 9 novembre 2026

- Nouveau langage : **C++ : les fondamentaux**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux en français : compilation et affichage, types, saisies et division entière, `if`, `switch`, boucles et validation, fonctions, `std::vector`, `std::string`, références, `struct` et projet de bulletin de classe.
- Premier atelier **compilé en ligne** : GCC 13 sur le service gratuit Wandbox (wandbox.org), qui autorise un usage pédagogique. Une seule requête par vérification : tous les cas d’un exercice et les vérifications de fonctions s’exécutent dans une même compilation, séparés par des marqueurs aléatoires. Les numéros de ligne des erreurs restent ceux du code de l’élève.
- Le cours reste lisible hors ligne ; une exécution sans connexion affiche un message clair. La page « Tes données, en clair » et le README indiquent ce qui est envoyé à Wandbox : le programme et ses saisies de test, sans pseudo ni progression.
- Le contrôle de compilation et les tests de navigateur compilent avec un compilateur local au format de Wandbox : la suite de tests ne sollicite jamais le service public.
- C++ quitte les séries « en préparation ».

## 5.10.0 — 9 novembre 2026

- Nouveau langage : **PHP : les bases**. Quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux en français, de `echo` à la caisse d’une boutique : variables et types, calculs et saisies, `if` et `match`, boucles, tableaux indexés et associatifs, fonctions natives, fonctions typées et projet final avec validation des saisies.
- Vrai interpréteur PHP 8.3 (`php-wasm`, licence Apache-2.0) dans un Worker isolé, sans serveur : 3,1 Mo compressés, téléchargés seulement en ouvrant le cours et conservés pour l’usage hors ligne. Réseau et stockage coupés pour le code de l’élève, boucles infinies arrêtées, affichage limité, erreurs PHP expliquées en français avec leur ligne.
- Les saisies se lisent comme en PHP en ligne de commande, avec `trim(fgets(STDIN))`. Les exercices vérifient l’affichage, mais aussi les valeurs et les types renvoyés par les fonctions et contenus dans les variables.
- Le parcours « Back-end : les fondations » inclut PHP. Java, C++ et PHP intermédiaire rejoignent les séries annoncées « en préparation ».
- Correction : dans le résultat d’une vérification, l’intitulé du cas et le nom de l’erreur n’étaient plus collés (« à revoirParseError »).
- Contenu en brouillon, à relire (`reviewer: null`).

## 5.9.0 — 9 novembre 2026

- HTML intermédiaire : quatre modules, 12 leçons, 48 exercices, 36 questions et 24 exemples originaux en français. Régions et titres, formulaires reliés à leurs aides et erreurs, tableaux à en-têtes multiples, images, langue et projet d’annuaire associatif.
- CSS intermédiaire : six modules, 18 leçons, 72 exercices, 54 questions et 36 exemples originaux. Cascade et propriétés logiques, Flexbox robuste, grilles avec minmax() et zones nommées, media queries, typographie fluide, images, états accessibles, thème sombre local et projet de tableau de club.
- Chaque exemple et chaque solution des deux programmes est rendu dans un vrai navigateur ; les contrôles lisent les styles calculés à 360 et 720 px, et un vrai focus pour les états. Les codes de départ sont refusés.
- Catalogue : filtre par niveau, recherche par niveau, saisie conservée lors d’une actualisation et prérequis plus courts. Le parcours front-end enchaîne maintenant les socles et les deux suites intermédiaires ; les socles HTML et CSS annoncent leur suite.
- Correction d’un contrôle de focus qui supposait à tort une largeur de contour nulle, et du test d’interface qui comptait les leçons terminées du mauvais programme.
- Les contenus restent des brouillons à relire (`reviewer: null`). Aucun cours vide ni moteur fictif ajouté.

## 5.8.0 — 7 novembre 2026

- Python intermédiaire : six modules, 18 leçons détaillées, 72 exercices, 54 questions et 36 exemples originaux en français. Collections, fonctions, exceptions, objets, JSON/CSV, tests et projet de club. Relecture pédagogique encore nécessaire.
- Quatre parcours entre les programmes disponibles, avec aperçu chronologique, confirmation du changement d’objectif, reprise du premier cours inachevé et sauvegarde des travaux antérieurs.
- Export HTML autonome d’une leçon ou d’un cours : explications, exemples, exercices et corrigés consultables sans connexion, impression possible en PDF. Bilan local de progression à la fin d’un parcours, sans équivalence de diplôme.
- Conservation et ouverture hors ligne des anciennes versions de cours téléchargées après mise à jour du catalogue ; récupération de la dernière version au retour en ligne.
- Les deux niveaux Python sont distincts dans le catalogue. Aucun moteur serveur Node ni cours avancé fictif ajouté.

## 5.7.0 — 6 novembre 2026

- Deux programmes originaux disponibles dans le catalogue : JavaScript DOM et React,18leçons/72exercices/54QCM/36exemples chacun. Les textes restent en relecture pédagogique.
- DOM et React réels dans le navigateur : boutons, formulaires, listes, clés stables, focus, effets et nettoyage, tests d’états intermédiaires et projets. Service asynchrone React explicitement simulé, avec erreurs/reprise/réponses obsolètes.
- Ateliers isolés par CSP HTTP, réseau refusé, budgets de boucles/fonctions et bouton Arrêter ; téléchargement des moteurs et redémarrage à froid hors ligne corrigés. Empreinte de moteur liée à la révision du cours.
- Coloration adaptée à Python, HTML, CSS, JavaScript/JSX et SQL. Raccourcis directs et filtres distincts pour DOM et React ; export de code React en JSX.
- La cible globale72cours et les technologies/niveaux restants restent suivis dans la matrice de couverture ; aucun cours vide déclaré terminé.

## 5.6.1 — 6 novembre 2026

- Correction du catalogue restant sur Python après la mise à jour : métadonnées et vues liées à la version, actualisation au changement de service worker et retour réseau, sans effacer la progression.
- Raccourcis directs vers Python, HTML, CSS, JavaScript, HTTP/API, SQL et Git/GitHub en haut du catalogue ; bouton d’actualisation.
- Découverte du numérique reste visible après filtrage. La recherche conserve sa saisie lors d’une mise à jour.
- Migrations réelles depuis les caches 5.4.3 et 5.6.0 testées ; accès SQL, brouillons et position conservés, repli hors ligne sur le catalogue enregistré.

## 5.6.0 — 5 novembre 2026

- SQL : 6 modules, 18 leçons, 72 exercices, 54 questions et 36 exemples originaux. Vrai moteur SQLite auto-hébergé, résultats tabulaires et base initiale consultable.
- Comparaison des requêtes et mutations, contraintes réellement testées, transactions exécutées ; arrêt, sauvegarde du code et téléchargement hors ligne.
- Intégration des protections Nunya Aide et de la documentation du collaborateur jusqu’à `2df60ddf`.
- React, TypeScript et DOM explicitement dans les prochaines séries ; niveaux supérieurs et autres technologies à poursuivre.

## 5.5.0 — travaux locaux des 4–5 novembre 2026

- HTTP/API : 12 leçons, 48 exercices et 24 exemples en JavaScript asynchrone sur une API locale réelle du service worker ; erreurs, statuts, JSON et annulation. Confirmation locale par message avant tout échange, journal des requêtes et CSP propre aux Workers JavaScript.
- Intégration de main jusqu’à 6488b35c : accueil simplifié, diagnostic chargé à la demande et menu mobile fermé au toucher extérieur. Bouton Passer rétabli quand les préférences sont ouvertes plus tard.
- Git/GitHub : 12 leçons originales, 32 ateliers sur de vrais dépôts locaux et 16 QCM ; 36 questions de compréhension. Archives transférables, opérations sérialisées, persistance après fermeture et fonctionnement hors ligne vérifiés.
- Catalogue de bibliothèque : programmes approfondis et introductions regroupés sans présenter des notices comme des cours complets.
- Réparation commune de la navigation, positions d’exercice et de quiz persistantes, retour à la leçon adjacente lors des révisions.
- Modules nommés pour 42 unités et 348 questions originales supplémentaires ; couverture mobile et ordinateur de toutes leurs questions.
- Python étendu aux collections, fonctions, résolution de problèmes, débogage, inventaire et réservation : 31 nouvelles leçons, 124 exercices.
- Nouveaux socles HTML/CSS et JavaScript synchrone (24 leçons, 96 exercices, questionnaire final), avec aperçus et moteurs réels ; suites DOM/Node et niveaux supérieurs distincts.
- Registre et compilation multi-cours ; assertions Python sur retours, types et copies ; ancien contrôle de conversion par commentaire rejeté.
- Unités de collections partageables, cache de packs par révision, bilan de parcours métier à la fin.
- Ressources sans rafraîchissement manuel, écran clair pour un lien invalide ; visite d’un guide sans écraser la page d’accueil hors ligne.
- 16 anciens exercices Python sur variables et types renforcés ; 274 cas JavaScript et 743 cas Python vérifiés.
- Sauvegardes v1/v2 complètes et de code restaurées sans perdre Python ou Découverte ; préférences et niveaux conservés.
- Questionnaire facultatif, diagnostic quittable et liens partagés directs ; consultation libre sans validation artificielle.
- Fusion des ajouts du collaborateur : niveau 0, bibliothèque libre, opportunités, études à l’étranger et Nunya Aide préservés sans activation serveur.
- Choix de quiz mélangés avec identités de réponses conservées ; demande de stockage persistant lors du téléchargement.
- Tests de navigateur portables ajoutés à la CI ; relecture pédagogique et autres niveaux toujours à poursuivre.

## 5.4.3 — 5 novembre 2026 · Nunya Aide prêt à activer

- Fonction `nunya-aide` : la question réservée est rendue à l’élève dans tous les cas où aucune réponse ne part (réponse illisible, délai dépassé, erreur inattendue) ; chaque modèle a son propre délai (12 s, 25 s au total) pour que le modèle de secours ait sa chance ; délai sur les appels à Supabase ; erreurs inattendues renvoyées avec les en-têtes CORS et journalisées sans contenu d’élève. 5 tests de plus.
- Panneau : délai maximal de 40 s, bouton « Annuler » pendant la réflexion, fermeture du panneau = annulation ; une annulation ne recrée jamais de session anonyme.
- Migration `007_anonymous_protection.sql` (à appliquer avant d’ouvrir les connexions anonymes) : les sessions anonymes n’accèdent pas aux tables de synchronisation ni aux profils, enregistrements limités à 32 Ko, suppression nocturne des comptes anonymes sans activité depuis 30 jours.
- Confidentialité : nouvelle section « Nunya Aide » (Supabase à Paris, Groq aux États-Unis, ce qui est envoyé, ce qui est gardé) ; l’écran d’information de l’assistant renvoie vers cette page.
- Cache `nunya-v5.4.3`.

## 5.4.2 — 5 novembre 2026 · menu sur téléphone

- Le menu ouvert sur téléphone (bouton « Plus » ou ☰) se ferme en touchant à côté, sans activer ce qui se trouve dessous. Échap le fermait déjà ; la barre du bas reste utilisable.
- Cache `nunya-v5.4.2`.

## 5.4.1 — 5 novembre 2026 · accueil et menu allégés

- Questions de départ facultatives : « Passer pour l’instant » (avec confirmation « J’ai 13 ans ou plus »), retour à la page demandée, personnalisation possible plus tard depuis l’accueil. Le test est chargé au début du test (`runtime/assessment.js`).
- Accueil : le bonjour d’abord, puis une seule carte « Par où commencer ? » (Python, ou « Reprendre » si une leçon est en cours, et « Personnaliser mon parcours » tant que ce n’est pas fait). La bande « Commence ici » et la carte séparée de personnalisation sont retirées.
- Menu : le groupe « Préparer mon futur » disparaît ; Études à l’étranger et Opportunités s’ouvrent depuis Mon avenir, qui reste surligné dans le menu. Le portfolio (masqué) rejoint « Mon espace ».
- Cache `nunya-v5.4.1`.

## 5.4.0 — compléments du 4 novembre 2026

- Bibliothèque : nouvelle page **Tous les cours Nunya** (`#/bibliotheque/cours`), avec les 42 cours en lecture libre, sans programme ni test, en trois familles (programmation et numérique, révisions scolaires, métiers et compétences pratiques). Entrée « Voir tous les cours » sur l’accueil de la bibliothèque. Les cours restent des brouillons à relire.
- Intègre la 5.2.1 publiée sur `main` (navigation question par question, séries de maths). Cache `nunya-v5.4.0` pour l’ensemble.
- **Études à l’étranger** et **Opportunités** réouvertes dans le menu (`FEATURES.showAbroad`, `FEATURES.showOpportunities`). Le portfolio reste masqué.
- Poids du site : les vues de la Découverte et les pages de la bibliothèque (compétences, thèmes, collections, tous les cours) sont chargées à la demande et précachées. Bundle principal : 148 677 octets gzip pour un budget unique de 150 000 (`scripts/js-budget.mjs`).

## 5.4.0 — 3 novembre 2026 · Nunya Aide

- Nouvel assistant **Nunya Aide**, IA open source (Groq, modèles à poids ouverts gpt-oss) : explique une notion floue, reformule la leçon, donne un autre exemple et des indices pour les exercices, sans donner la solution complète.
- Accès sans compte (session anonyme), écran d’information avant la première question, 15 questions par jour et par appareil ; aucune question enregistrée par Nunya.
- Bouton en haut de chaque page, carte sur la page Aide, appels dans les leçons Découverte et Python (après l’explication, après une activité ratée, dans l’atelier de code avec le code joint si l’élève le veut).
- Serveur : fonction Supabase `nunya-aide`, migrations 004 à 006 (plafond global, quota réservé côté serveur, question rendue si le modèle ne répond pas).
- Le panneau est chargé au premier clic pour garder le site léger. Cache `nunya-v5.4.0`.
- À activer par l’équipe : clé Groq dans les secrets Supabase et connexion anonyme (voir `docs/AI_STRATEGY.md`).

## 5.3.0 — 3 novembre 2026 · niveau 0 (brouillon, module 1 validé par l’équipe)

- Nouveau cours « Découverte du numérique » (niveau 0, aucun prérequis), en tête d’Apprendre à coder. 4 modules et 20 leçons de 8 à 10 minutes (≈ 2 h 50) : Ordinateur et téléphone ; Internet et le web ; Fichiers, logiciels et sécurité de base ; Penser comme un programmeur. Les leçons s’ouvrent dans l’ordre.
- Chaque leçon : idée en 30 secondes, comparaison du quotidien, explication courte, exemple guidé, 4 activités corrigées (choix unique, vrai ou faux, remettre dans l’ordre, associer), « Explique avec tes mots » gardé sur l’appareil avec une réponse possible, récapitulatif et mots nouveaux. La leçon suivante s’ouvre quand les 4 activités sont réussies.
- Les anciennes entrées « Bien démarrer avec l’ordinateur » et « Penser comme un programmeur » sont remplacées par ce cours ; leurs adresses redirigent vers lui. Leçons trouvables dans la recherche ; progression visible dans Ma progression ; « Emporter le cours » pour lire hors ligne.
- Les choix des questions sont mélangés (ordre fixe par question) ; la ponctuation française ne se retrouve plus seule en début de ligne dans les leçons.
- Correction : après le test d’accueil, tant que l’élève n’avait pas cliqué « Terminer », les cartes principales d’Apprendre à coder étaient masquées sur toutes les pages.
- Cache `nunya-v5.3.0` et ressources `?v=5.3.0`.
## 5.2.1 — 4 novembre 2026

- Une question à la fois, compteur, vérification, précédent et suivant dans la même leçon.
- Série de cinq questions pour chacune des huit leçons du pilote de maths : 32 questions originales supplémentaires.
- Sauvegarde des réponses et de la position, préservation des validations précédentes, progression scolaire correctement indiquée dans le sommaire.
- Passage explicite à la leçon suivante uniquement après la série ; parcours métier utilisant la même navigation.
- Audit du nouveau prompt maître et matrice interne des cours cibles par niveau, sans publier de formations vides.

## 5.2.0 — 3 novembre 2026

- Navigation mobile : « Coder » dans la barre du bas, Bibliothèque dans « Plus » ; loupe avec curseur dans le champ ; titres de page corrigés (Confidentialité, page introuvable).
- Leçons : en-tête compact sur téléphone, bandeau « Mon parcours » limité à Mon avenir, résultat de vérification rendu visible, onglets collés en haut.
- Mini-quiz et question de fin de chapitre : options en cartes avec bouton radio aligné ; variables de couleur manquantes définies.
- Orientation : Programmation & données → Python : les bases (module 1, mini-test proposé si les bases sont solides) ; résultats en mots ; second test de départ retiré ; ancien cours Python remplacé dans les listes ; recherche « Cours » enrichie.
- Carte du cours : leçons verrouillées alignées avec cadenas, règle expliquée une fois ; « Prochains cours » non cliquables ; page du mini-test centrée sur les questions. Correction : le mini-test ouvert directement restait bloqué.
- Cohérence visuelle : test de départ, révision et Mes cours alignés sur la palette ; césure des titres de compétences ; recherche vide avec suggestions ; espaces insécables avant ? ! : ; dans les titres.
- Textes : sous-titre de Mon avenir, leçon 1, Aide, carnet d’erreurs, apostrophes du test, message moins de 13 ans.
- Cache `nunya-v5.2.0` et ressources `?v=5.2.0`.

## 5.1.0 — 2 novembre 2026

- Programme de code distinct du scolaire et de l’orientation ; liens historiques redirigés.
- Python original M1–M4 : 22 leçons, 44 exemples, 88 exercices, 66 quiz, projets et points d’étape.
- Éditeur local, exécution Pyodide, saisies, indices, erreurs expliquées et progression exportable.
- Carte des modules, reprise en un clic, recherche groupée et point de départ adaptatif.
- Correction du chargement des articles sans actualisation.
- Markdown canonique, exercices JSON, schémas, contrôles et tests de code intégrés à CI.
- Brouillons à relire ; M5–M10 et autres langages en préparation.
