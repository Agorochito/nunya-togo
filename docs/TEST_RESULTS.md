# Vérifications — version 5.1.0, 2 novembre 2026

32 tests Vitest, lint et TypeScript réussis. 22 leçons passent les contrôles de structure (300–700 mots par explication, deux exemples, quatre exercices, trois quiz, erreurs, glossaire et récapitulatif), le graphe de prérequis et les références du catalogue. Les 278 cas d’exécution des exemples et solutions passent avec Python 3. Les solutions sont vérifiées avec les saisies et sorties attendues ; ce contrôle ne prétend pas juger toute la pédagogie.

Chrome anonyme : première leçon depuis l’accueil et reprise en un clic ; réponse Python incorrecte puis correcte ; quatre exercices et quiz avant progression ; saisies `input()` et cas supplémentaires ; ancien lien physique redirigé dans le scolaire ; articles CSS puis Python ouverts depuis la bibliothèque sans actualisation. Zéro erreur JavaScript pendant ce scénario après correction des éléments historiques de navigation et de la recherche asynchrone.

Après téléchargement : contexte passé hors ligne, recherche et lecture accessibles, éditeur chargé, code Python exécuté avec moteur déjà enregistré. Le moteur reste facultatif et distinct du texte. Les vidéos ne sont pas téléchargées.

Seize vues axe A/AA : programme, carte du cours, première leçon et recherche, en 360/1440 px et clair/sombre. Zéro violation détectée et zéro débordement horizontal ; voir `AXE_CURRICULUM.json`. Ce n’est pas une certification d’accessibilité. Les tests sur téléphone réel restent à faire.

Navigation ralentie : viewport 360×640, CDP latence 150 ms, débit 200 Ko/s, CPU ×4. Les comptes de clics et temps sont dans `FINDABILITY_V5.json`. Temps synthétiques sur serveur local, après affichage de l’accueil et avec caches progressivement chauds : pas une mesure du réseau d’un élève togolais. Le questionnaire adaptatif de dix questions et les conditions de progression sont aussi testés. Les recherches vérifient les adresses des premières leçons : boucle → for/range ; variable et varible → nommer une valeur ; if → if/else ; FCFA → conversion avec f-string.

Captures avant : site public 5.0.2, visiteur anonyme. Captures après : version 5.1.0 locale. `docs/screenshots/v5-360-*` et `v5-1440-*` contiennent accueil, carte et leçon, dont des captures de page complète.

Relecture humaine, réussite M1–M2 en trois heures et maîtrise d’un débutant : non mesurées. Les contenus restent brouillons. La limite mémoire stricte du runtime navigateur n’est pas garantie. Les modules 5–10, les autres langages et la mise au niveau v5 complète du pilote de mathématiques restent à développer.

## Historique 5.0.2

# Vérifications — version 5.0.2, 2 novembre 2026

Lint, TypeScript, 27 tests Vitest et contrôles de contenu réussis. Les réponses des 27 questions numériques des trois nouvelles initiations sont vérifiées indépendamment, en plus des schémas, bornes des QCM, durées et identifiants.

Inventaire : 38 cours existants / 166 leçons, plus quatre cours originaux différés / 16 leçons = 42 cours uniques / 182 leçons. Les quinze parcours de métiers réemploient aussi ces contenus ; leurs 188 séances et 364 occurrences de questions ne sont pas autant de cours ou questions indépendants. Bibliothèque existante : 7 066 articles et 4 115 vidéos françaises uniques. Explorateur : 91 collections ou références avec sources, dont 77 groupes Khan.

## Parcours et navigation

Tests Playwright à 360 × 640, réseau limité à 200 000 octets/s, latence 150 ms et CPU ralenti ×4 : nouveau visiteur → parcours cybersécurité en deux clics, prérequis et cinq étapes après découverte ; réponse incorrecte puis correcte, déverrouillage et prochaine séance ; reprise depuis l’accueil en un clic ; redirections des liens partagés, entrée scolaire active. Aucun débordement horizontal ou erreur JavaScript détecté. Enregistrement vidéo local de la session : `/private/tmp/nunya-e2e-videos/page@072d8f15fdbf0d065835fa8a2bfeee9b.webm` (ne contient que des données fictives de test).

Autres tests : domaine santé → vrai parcours de découverte → leçon ; mini-test de cinq questions ; KaTeX local en mathématiques ; Python `print(6 * 7)` produit 42 après retrait de `unsafe-eval` ; checklist France et brouillon CV conservés après rechargement.

Nouvel explorateur : les 12 vues (trois routes × deux tailles × deux thèmes) passent axe A/AA sans violation et sans débordement. Les quatre cours pratiques s’ouvrent directement ; sélection Terminale et matières conservées ; lecteur officiel LearnFree présent à la demande ; recherche paginée change effectivement les résultats ; guide public lisible sans JavaScript. La présence de l’iframe ne prouve pas la lecture de chaque vidéo chez chaque élève.

## Hors ligne et présentation

Parcours et unité scolaire téléchargés, contexte navigateur passé hors ligne puis rechargé : textes et pratique accessibles. Les vidéos restent en ligne. Les caches de ressources et de Python ne sont pas supprimés par la mise à jour du shell.

44 vues finales supplémentaires (11 routes × deux tailles × deux thèmes) : zéro violation axe A/AA détectée, zéro débordement horizontal. Captures et rapports dans `docs/screenshots/`, `AXE_FINAL.json`, `AXE_SKILLS.json`. L’audit automatique ne remplace pas des essais avec lecteur d’écran et appareils physiques.

Lighthouse mobile local sur serveur Python sans compression : performance 80, accessibilité 100, bonnes pratiques 100 ; LCP 4,7 s, TBT 120 ms, CLS 0,095. Le seuil du brief de 80/95 est atteint ; la cible LCP < 3 s n’est pas atteinte. `LIGHTHOUSE_RESULTS.json` conserve la mesure et son contexte. Mesure ultérieure sur Vercel : performance 96, accessibilité 100, bonnes pratiques 100, LCP 1,8 s. Aucun essai Android physique n’est prétendu.

## Sources et outils internes

Rapport de disponibilité HTTP terminé le 2 novembre : 11 733 URL, 11 707 réponses concluantes, zéro 404/410 confirmé, 26 incertaines (réseau / limitation serveur). Un ancien PDF ANPE mort a été remplacé par le portail officiel. HEAD ne contrôle pas la qualité pédagogique, la lecture de chaque vidéo ou l’accès gratuit à une certification.

Générateur APC : schéma et somme des points réussis sur un exemple original, calculs déterministes testés ; absence d’empreintes de référence signalée, `publishable:false`, relecture obligatoire. 2 925 propositions lexicales de rapprochement ressources / parcours sont des CSV de revue, non publiés automatiquement.

## Limites

Relecture togolaise et alignement au programme à réaliser ; admissions, dates et coefficients non validés ; aucune collecte de vrais dossiers élèves. Pas de compte, de synchronisation cloud, d’IA distante ni d’envoi de candidature. Les brouillons métiers et contenus restent identifiés. Changer de domaine nécessite export/import des progrès locaux. GitHub et Vercel sont documentés séparément dans `DEPLOY_VERCEL.md` ; la préparation du fichier de configuration ne vaut pas un déploiement Vercel réussi.


Vercel production vérifiée le 2 novembre : https://nunya-togo.vercel.app, accès anonyme HTTP 200, 12 compétences présentes, ouverture d’un accompagnement français sans erreur JavaScript. Dépôt public : https://github.com/Agorochito/nunya-togo ; contrôle GitHub Actions réussi.
