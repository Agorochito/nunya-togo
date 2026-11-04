# Contenus et validations à poursuivre

Mise à jour du 4 novembre : voir `COURSE_COVERAGE_AUDIT.md` et `data/review/course_coverage_2026-11-04.json` pour le rapprochement avec le nouveau prompt maître (24 familles, 72 cours cibles par niveau, tous explicitement distingués des contenus réellement disponibles). Conserver Python M1–M4 ; compléter ses prérequis et modules suivants, éprouver le module fonctions et HTML/CSS, puis terminer les six cours fondamentaux avant les niveaux suivants.

Priorité v5 : faire relire et essayer les 22 leçons Python M1–M4 ; corriger à partir des essais, puis développer M5–M10, HTML, CSS et JavaScript. Les autres langages restent en préparation. Migrer ensuite le pilote de mathématiques vers la même profondeur et le même catalogue. Ne pas présenter les anciennes unités courtes comme déjà conformes à cette nouvelle barre.

- Revue d’interface du 3 novembre : la leçon 1 de Python demande environ onze écrans de défilement sur un téléphone de 360 px, loin des 5 à 10 minutes visées par le cahier de route. Étudier un découpage en sections plus courtes (ou un sommaire repliable) avec les premiers élèves testeurs.
- Faire relire les trois initiations originales et les douze découvertes par des enseignants / professionnels togolais ; tous restent `brouillon`, `reviewer:null`. Recueillir les erreurs des premiers élèves et prioriser les corrections.
- Valider matière par classe, série, unités, coefficients et calendriers dans les décisions officielles. Les dates communautaires ne doivent jamais activer un compte à rebours officiel. Le pilote scolaire est une unité de mathématiques seconde, pas un programme national complet.
- Vérifier les établissements, noms actuels, admissions et certifications des 43 métiers. Les 13 secteurs sont documentés sans classement de demande, salaire ou garantie d’emploi.
- Développer les découvertes non techniques en parcours plus longs avec projets spécifiques et relecture métier ; santé = sciences et orientation uniquement, pas de formation clinique.
- Demander une autorisation explicite avant toute traduction intégrale LearnFree ou autre contenu propriétaire. Ajouter des ressources francophones dont les droits et l’accès gratuit sont clairs. Aucun import massif Class Central/Coursera, aucun essai payant présenté comme gratuit.
- Revoir les 26 liens de disponibilité incertaine du rapport du 2 novembre. Aucun 404/410 confirmé dans le contrôle final de 11 733 URL. Les statuts HTTP ne prouvent pas la lecture d’une vidéo, l’existence d’un certificat gratuit ni l’admissibilité.
- Valider humainement les propositions `data/review/` avant tout rapprochement de ressource avec programme, parcours ou étape. Les 2 925 suggestions lexicales ne sont pas des associations approuvées.
- Réunir les documents autorisés et empreintes nécessaires au contrôle d’originalité APC. Sans cela, le générateur refuse toute qualité « publiable » ; ses calculs et barèmes sont testés, son originalité n’est pas certifiée.
- Tester sur Android peu puissant et Safari iOS réels, petits écrans, clavier et lecteur d’écran ; vérifier les PDF et vidéos chez les élèves.
- Lighthouse sur Vercel atteint 96/100/100 et un LCP de 1,8 s ; maintenir ces résultats et tester sur appareils réels. Les 56 vues axe sont un contrôle automatique, pas une certification complète d’accessibilité.
- Compléter progressivement l’anglais ; la langue d’enseignement prioritaire reste le français.
- Authentification, synchronisation, portfolio public opt-in, mentors et employeurs : après décision d’architecture, hébergement et financement. Ne pas simuler de candidatures ou d’échanges.


Vercel production vérifiée le 2 novembre : https://nunya-togo.vercel.app, accès anonyme HTTP 200, 12 compétences présentes, ouverture d’un accompagnement français sans erreur JavaScript. Dépôt public : https://github.com/Agorochito/nunya-togo ; contrôle GitHub Actions réussi.
