# Niveau 0 — Découverte du numérique

Cours d’entrée du cahier de route (« 0. Découverte »). Il se place avant « Python : les bases » dans Apprendre à coder, sans le bloquer : un élève peut ouvrir Python directement.

## Format d’une leçon

- 5 à 10 minutes, 120 à 300 mots d’explication, vocabulaire défini avant d’être utilisé.
- L’idée en 30 secondes et une comparaison du quotidien au Togo.
- Un exemple guidé en étapes.
- 4 activités corrigées, essais illimités : choix unique, vrai ou faux, remettre dans l’ordre, associer.
- « Explique avec tes mots » : réponse libre gardée sur l’appareil, avec une réponse possible à afficher. Pas de correction automatique ni d’IA.
- Récapitulatif et mots nouveaux.
- La leçon suivante s’ouvre quand les 4 activités sont réussies.

Sources : `content/fr/decouverte/<module>/<id>.md` (texte et métadonnées) et `<id>.activities.json`. `scripts/prepare-discovery.py` vérifie et génère `dist/data/decouverte/`.

## Plan

### Module 1 — Ordinateur et téléphone (validé par l’équipe le 3 novembre)

| Leçon | Objectif |
|---|---|
| Un appareil qui suit des instructions | Décrire entrée, traitement, sortie et stockage sur un exemple. |
| Matériel et logiciel | Distinguer pièces et programmes ; rôle du système d’exploitation. |
| Mémoire vive et stockage | Distinguer RAM et stockage ; ordres de grandeur en Mo et Go. |
| Installer une application sans risque | Boutique officielle, autorisations, mises à jour. |
| Mini-projet : la fiche de mon appareil | Réunir les notions sur un appareil réel. |

### Module 2 — Internet et le web (rédigé, à relire)

Internet, un réseau de réseaux · Le web : pages, liens et adresses · Navigateur et moteur de recherche · Chercher efficacement et vérifier une source · Données mobiles : comprendre et économiser ses Mo.

### Module 3 — Fichiers, logiciels et sécurité de base (rédigé, à relire ; conseils de sécurité généraux, sans particularité nationale)

Fichiers, dossiers et extensions · Ranger et retrouver ses documents · Mots de passe et double vérification · Repérer un message ou un appel suspect · Sauvegarder pour ne rien perdre.

### Module 4 — Penser comme un programmeur (rédigé, à relire)

Un algorithme, une recette précise · Découper un problème en étapes · Décider : si… alors… sinon · Répéter : pour chaque, tant que · Trouver et corriger une erreur de logique.

## Relecture

Les 20 leçons sont en ligne avec le statut `brouillon`, `reviewer: null`. Documents de relecture : `docs/RELECTURE_NIVEAU0_M1.md` (validé par l’équipe) et `docs/RELECTURE_NIVEAU0_M2-M4.md`. À faire relire par un enseignant et à tester avec des élèves de seconde : compréhension des mots, durée réelle, exemples locaux, difficulté des activités. Les anciennes unités courtes (`digital`, `algorithms`, `security`) restent des repères de la bibliothèque.

Affichage : les choix des questions à choix unique sont mélangés dans un ordre fixe par question, pour que la bonne réponse ne soit pas toujours au même rang. Les espaces avant « ? ! : ; » et autour des guillemets sont rendus insécables à la génération.
