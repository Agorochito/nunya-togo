# Passage entre questions — 4 novembre 2026

Périmètre demandé : corriger la résolution et le passage à la question suivante sur la version réellement déployée ; conserver les éléments qui fonctionnent. Le prompt maître joint sert de référence de progression et de sauvegarde (sections 8, 16, 17 et 25), sans engager sa refonte générale dans ce correctif.

## Diagnostic avant modification

Production Vercel : projet nunya-togo, branche main, commit c4c548ba282fb9d00913fd5916f3775c85826b6e, interface 5.2.0. La copie Sites 5.1.0 est plus ancienne : elle n’est pas utilisée pour écraser les changements de main.

Fonctionnel : correction des QCM et réponses numériques, persistance locale, onglets Lire / Pas à pas / Pratiquer, cours Python avec son propre moteur, nouvelle personnalisation. Partiel : les exercices des étapes métier s’affichent tous ensemble. Manquant : une navigation explicite entre questions d’une même leçon. La leçon « Résoudre une équation » ne possède qu’un QCM ; le bouton « Prochaine étape » valide ce QCM puis change de leçon. Le menu scolaire utilise aussi les clés de progression métier au lieu des validations scolaires.

## Correction prévue

Ajouter quatre questions originales à chacune des huit leçons du pilote de maths, sans dupliquer la question existante ni modifier son identifiant. Présenter une question à la fois, compteur, vérification, question suivante / précédente, puis passage explicite à la leçon suivante après validation de la série. Réutiliser cette navigation pour les étapes métier. Conserver réponses, indices et position au rechargement ; garder les anciennes validations. Les données et les sauvegardes restent locales. Le moteur Python et la personnalisation 5.2 ne sont pas refondus.

## Vérifications

Reproduction en production confirmée : une question puis changement de leçon. Correctif local : 82 tests passent, dont 7 nouveaux contrôles de progression et de réponses mathématiques. Chrome 360/1440 px : cinq questions, mauvaise réponse, précédent, sauvegarde, rechargement, hors ligne et transition finale réussis ; une étape métier passe à sa deuxième question sans changer de route. Zéro erreur JavaScript, zéro violation axe A/AA détectée sur les deux vues et aucun débordement. Lint, TypeScript, contenu, catalogue et prérequis passent. Les 278 cas de code Python restent réussis. La vérification de production suit le déploiement.

## Suite distincte

La matrice élargie, les nouveaux cours complets et les lots du prompt maître restent des travaux futurs, décrits dans CONTENT_TODO.md. Ce correctif ne les annonce pas comme achevés. Les nouvelles questions restent des brouillons à relire humainement.
