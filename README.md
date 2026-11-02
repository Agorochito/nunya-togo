# Nunya — pilote TIA pour le Togo

[Ouvrir le site](https://nunya-togo.vercel.app) · [Dépôt public](https://github.com/Agorochito/nunya-togo)

Apprendre en français, réviser ses cours et explorer des métiers, d’abord pour les lycéens, puis les étudiants. Les élèves plus jeunes restent une étape ultérieure du déploiement, même si les classes du primaire et le CEPD sont modélisés.

## Démarrer et vérifier

Le dossier dist/ est prêt à servir. Après modification du JavaScript/CSS, exécuter `npm run build`. Pour servir dist/ : `python3 -m http.server 4173 --directory dist`. Ouvrir http://localhost:4173. HTTPS ou localhost est nécessaire au service worker. Les outils de développement utilisent `npm ci`, puis `npm run lint`, `npm run typecheck`, `npm test` et `npm run check:content`.

## Fonctions du pilote

- 42 cours guidés : 40 originaux et 2 adaptations françaises partielles OpenLearn ; 182 leçons avec articles, exemples, raisonnement pas à pas et QCM. Contenus à relire par des enseignants.
- 11 181 ressources tierces réelles : 7 066 articles français MDN lisibles dans Nunya et 4 115 vidéos françaises Khan Academy, dédupliquées. Recherche, sujets, formats, niveaux et pagination.
- Mathématiques, physique, chimie, SVT, économie, numérique ; parcours guidés aussi en langues, humanités, commerce, agriculture, santé, transport, énergie, design, télécoms, finance numérique, éducation, environnement et bâtiment. La profondeur varie selon les domaines.
- 13 domaines métiers, 30 chemins composés de cours ouvrables dans Nunya, avec références institutionnelles togolaises et matières scolaires associées.
- Mes cours / Mon avenir ; profil, classe et série ; 492 documents officiels consultables depuis le site : CEPD 64, BEPC 118, BAC I 282, Terminale / préparation BAC II 28. Ces derniers sont des compositions régionales et corrigés, distincts des annales nationales.
- Deux parcours ciblés de Terminale en analyse et mécanique, inspirés des rubriques du portail officiel. Couverture partielle, à relire ; pas un programme complet garanti.
- Espace de ressource : lecteur vidéo facultatif, texte, étapes et pratique dans une même page. Articles MDN complets découpés en sections. Les vidéos utilisent leur présentation française et, pour 1 267 vidéos, une fiche de notion associée parmi 61 fiches originales avec QCM corrigé. Les autres proposent une pratique écrite avec repère et auto-évaluation ; pas de transcription intégrale ni de correction automatique inventée. Miniatures YouTube chargées à la demande dans le catalogue.
- Éditeur et résultat dans les leçons Python, JavaScript et HTML/CSS ; aucun onglet de code global. Dans les articles MDN, un éditeur contextualisé permet d’essayer un exemple. SQL, pseudocode, dépendances et input() ne sont pas exécutés par le pilote.
- Python local facultatif (~12 Mo), JavaScript dans un Worker éphémère, HTML en iframe sandbox sans script ni réseau. Arrêt des boucles : Python 8 secondes après démarrage, JavaScript 2 secondes. Aucune limite stricte de mémoire WASM garantie.
- Point de départ adaptatif de 10 questions, banque de plus de 40 questions ; progression séquentielle, mini-tests pour sauter les acquis, notes, révisions espacées et carnet d’erreurs.
- Palette complète (fonds, cartes et textes) coordonnée à une seule couleur en clair et sombre ; cuivre par défaut. Couleur d’accent personnalisable dans les réglages (préréglages et code hexadécimal), thème sombre, taille de texte, police espacée, voix française locale si installée, profils locaux séparés et glossaire FR/EN.
- 13 mini-projets liés aux domaines, portfolio local, canevas et simulation de budget. Activités originales fondées sur l’analyse de 9 plateformes et organismes togolais, dont ADACE/FAIEJ, AED/IFAD et FOCEN.
- Deux adaptations françaises partielles de cours gratuits OpenLearn : électronique et préparation de projet. Cours source en anglais, attribution visible ; aucune traduction complète, attestation ou certification Open University revendiquée.
- Données locales : IndexedDB et compatibilité localStorage. Export/restauration JSON, partage de parcours originaux par fichier, avis anonymes locaux exportables. Aucun compte ni serveur de données actif.
- Ouverture directe des notices sans charger tout le catalogue ; index compact de 1,08 Mo au lieu de 3,72 Mo. Cœur hors ligne, fiches vidéo et articles enregistrables et moteur Python facultatif enregistrable. Les vidéos et PDF distants ne sont pas téléchargés par Nunya. L’iframe PDF dépend du navigateur ; le lecteur de l’IAB est resté vide lors du test, donc une ouverture directe du document officiel reste proposée.

## Tester avec des élèves

Ouvrir le site avec une connexion ; choisir un parcours scolaire ou métier ; lire puis pratiquer sans vidéo ; ouvrir éventuellement une vidéo ; exécuter une petite modification de code dans une leçon de programmation ; enregistrer un parcours et un article ; activer le mode avion et rouvrir le même site dans le même navigateur ; vérifier les progrès après rechargement. Exporter un avis pour le remettre à l’équipe et conserver une sauvegarde de progression.

Les profils locaux sont pratiques sur un appareil partagé, mais ne sont pas des comptes protégés par mot de passe. Les avis ne sont pas automatiquement transmis. Les téléchargements doivent être recréés sur un nouvel appareil. L’éviction des données du navigateur reste possible ; exporter régulièrement.

## Préparation de la suite

Le propriétaire a demandé une base locale pour commencer. Aucune infrastructure payante n’a été créée. Le schéma Supabase, les politiques RLS et le contrat serveur d’aide IA sont préparés, sans activation ni clé. Le guide actuel donne des indices prédéfinis et ne se présente pas comme une IA. Une migration doit préserver les profils et exiger une vraie confirmation serveur avant d’indiquer une synchronisation.

Les outils d’équipe dans tools/ et scripts/generate-exercise.mjs produisent uniquement des brouillons locaux à valider, sans interface d’administration publique. Voir docs/DECISIONS.md, docs/OFFLINE_PLAN.md, docs/VERIFICATION_CHECKLIST.md et docs/SOURCES_AND_LICENSES.md.

Après chaque modification déployée, changer la version du cache dans dist/sw.js. Les packs explicitement enregistrés sont préservés lors de la mise à jour du cœur.

## Académie 5.0.2

Deux espaces : Mes cours & examens et Mon avenir. Quinze parcours dans treize domaines, 43 métiers documentés, quatre destinations d’études et neuf portes d’entrée d’opportunités. Trois initiations approfondies et douze découvertes courtes, toutes à relire. Le nombre de séances réassemblées n’augmente pas artificiellement les cours uniques.

Dans Bibliothèque → Explorer les compétences : douze thèmes, 91 collections ou références de cours, sources et langues visibles. Les accompagnements originaux français incluent lecture, étapes et pratique ; les vidéos sont facultatives. LearnFree et Class Central ne sont pas aspirés ou traduits intégralement. Voir `docs/SOURCES_AND_LICENSES.md`.

Construire : `npm ci`, `npm run build`. Vérifier : `npm run lint`, `npm run typecheck`, `npm test`, `npm run check:content`, `npm run check:academy`. Les scripts navigateur utilisent Chrome local sur macOS ; adapter `executablePath` sur une autre machine avant de les lancer. `npm run check:links -- --all` contrôle aussi les URL de la bibliothèque et conserve un rapport ; ce n’est pas un test de lecture de toutes les vidéos.

Publier sur Vercel : voir [le guide](docs/DEPLOY_VERCEL.md). `vercel.json` fournit le build et le dossier `dist`, aucune clé ni base externe requise. Contribuer : voir [CONTRIBUTING](docs/CONTRIBUTING.md), [résultats](docs/TEST_RESULTS.md) et [travail restant](docs/CONTENT_TODO.md). Les contenus tiers conservent leurs licences ; aucune licence unique ne remplace les attributions MDN, Khan Academy, OpenLearn ou Pyodide.
