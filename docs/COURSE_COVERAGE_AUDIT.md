# Couverture des cours — livraison 5.3.0, 4 novembre 2026

Le prompt maître impose une réalisation par lots, avec une cible finale de 72 cours par niveau et des séries complémentaires. Cette livraison ne termine pas cette cible. L’audit initial est conservé dans [BASELINE_COURSE_AUDIT_5.2.1.md](BASELINE_COURSE_AUDIT_5.2.1.md).

## Contenu réel de ce lot

| Programme | Modules | Leçons | Exercices | Périmètre |
|---|---:|---:|---:|---|
| Python : les bases | 12 | 53 | 212 | Contenu original rédigé ; relecture pédagogique en cours. |
| CSS : premières interfaces | 4 | 12 | 48 | Contenu original rédigé ; relecture pédagogique en cours. |
| HTML : premières pages accessibles | 4 | 12 | 48 | Contenu original rédigé ; relecture pédagogique en cours. |
| JavaScript : premiers programmes et décisions | 2 | 6 | 24 | Première série seulement ; suite en préparation. |

Les leçons possèdent chacune 300–700 mots d’explication, deux exemples commentés, quatre exercices, trois questions de compréhension, des erreurs fréquentes, un glossaire et un récapitulatif. Elles sont des brouillons originaux : aucun enseignant réviseur, partenariat ou certificat externe n’est inventé. Les 22 chapitres Python antérieurs, leurs identifiants et leurs questions de fin de chapitre restent conservés.

Les 42 unités historiques de découverte possèdent maintenant 91 modules nommés qui répartissent leurs 182 leçons dans l’ordre. Une banque de 348 questions supplémentaires porte ces unités à 562 questions, en incluant les cinq questions de chaque leçon du pilote de maths. Ces introductions restent signalées comme découvertes ; elles ne deviennent pas des formations professionnelles complètes. Les 15 parcours métier et la bibliothèque gardent leur fonction propre. Les collections de ressources possèdent désormais un choix d’unité avec lien partageable.

## Ce qui reste à construire

Git/GitHub et SQL ont toujours des introductions courtes, avec modules et exercices de compréhension ; leurs cours approfondis restent à écrire. Node.js, HTTP et les autres familles ne possèdent pas encore leurs cours complets. Aucun cours intermédiaire ou avancé complet n’est annoncé comme disponible. La première série JavaScript reste explicitement partielle.

La suite doit terminer JavaScript, puis produire et éprouver les socles SQL et Git/GitHub, puis les séries HTTP/API et Node.js après leurs prérequis. Les niveaux intermédiaire et avancé doivent avoir leurs propres leçons, projets et évaluations ; une sélection de niveau ne doit pas réutiliser artificiellement le même contenu. Les autres familles restent suivies dans la matrice JSON de 72 entrées, avec les 20 séries complémentaires. Aucun cours vide n’est ajouté pour augmenter le compteur.

## Vérifications et limites

- Audit initial de 78 écrans de production avant les changements.
- 130 tests unitaires ; schémas, ordre des prérequis, propriété des modules et liens internes contrôlés.
- 743 cas Python en CPython, exemples et solutions ; 64 cas JavaScript dans le même protocole que le Worker.
- 96 solutions HTML/CSS acceptées et 96 codes de départ rejetés par le vrai vérificateur de navigateur.
- 42 unités / 182 leçons / 562 questions parcourues sur 360 et 1440 px ; aucun saut vers une leçon suivante avant la fin des questions.
- Quatre séries / 83 leçons affichées ; navigation des exercices et mini-quiz, mauvaise réponse, retour, rechargement, ancien chapitre revu et reprise hors ligne testés. Axe : zéro violation sur les vues de leçon testées, sans prétention de certification complète.
- Fonctions Python, absence de mutation/copie, réservation et JavaScript vérifiés dans les vrais Workers. Délai et arrêt JavaScript testés. Les tests sont formatifs, livrés au navigateur ; ils ne sont pas une frontière d’intégrité d’examen.

Les correspondances aux programmes scolaires, la relecture des nouveaux contenus et les essais avec de vrais élèves restent nécessaires. Les contrôles de liens externes sous réseau restreint retournent des liens non confirmés ; cela ne prouve pas que tous les fournisseurs sont joignables. Comptes et synchronisation distante restent hors de ce lot, conformément au choix de conservation locale.
