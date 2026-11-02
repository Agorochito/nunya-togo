# Sources, droits et portée

Consultation et import : 1er novembre 2026. Les 36 parcours originaux Nunya et leurs 158 leçons sont des rédactions originales au statut brouillon, sans relecteur pédagogique nommé. Les ressources tierces gardent leur attribution ; leur présence ne signifie pas conformité au programme togolais.

| Ensemble | Contenu / volume | Source exacte | Droits / traitement | Vérification et limites |
| --- | --- | --- | --- | --- |
| MDN Web Docs, contributeurs | 7 066 articles français complets | https://github.com/mdn/translated-content/tree/69528c889dedf3815064bb25f2c17e441336396e/files/fr | Prose CC BY-SA 2.5. Code : voir dist/library/MDN-LICENSE.md, dont CC0 pour les exemples récents. HTML assaini, macros, images et interactions omises ; attribution, URL et modifications indiquées dans chaque lecteur et fichier. Les adaptations du texte restent CC BY-SA 2.5. | Import reproductible scripts/import-mdn.mjs. Quelques références longues dépassent le budget de 50 Ko ; lecture à la demande, pas de téléchargement global initial. |
| Khan Academy | 4 115 vidéos uniques à audio français, 84 collections dans la bibliothèque combinée | https://storage.googleapis.com/public-content-export-data/fr-export-recent.tsv | Métadonnées publiques filtrées sur fully_translated, dubbed, listed_anywhere et cc-by-nc-sa ; déduplication par identifiant YouTube traduit. CC BY-NC-SA ; usage éducatif gratuit. Aucun fichier vidéo copié. Lecteur officiel YouTube à chargement volontaire. | Méthode d’export documentée par https://github.com/learningequality/sushi-chef-khan-academy/blob/master/tsvkhan.py. Français selon métadonnées du fournisseur, pas contrôle humain de chaque vidéo. Certaines vidéos peuvent devenir indisponibles. |
| École numérique Togo : CEPD | 64 PDF référencés | https://ecole.gouv.tg/primaire/mod/folder/view.php?id=4 | PDF maintenus à la source, affichage distant ; aucune copie ou traduction des annales | Les noms des fichiers sont conservés. Pas de corrigé inventé. |
| École numérique Togo : BEPC | 118 PDF référencés | https://ecole.gouv.tg/college/mod/folder/view.php?id=22&lang=fr | Même traitement | Ne pas assimiler le programme de ces annales à chaque classe du pilote. |
| École numérique Togo : BAC I | 282 PDF référencés | https://ecole.gouv.tg/lycee/mod/folder/view.php?id=1&lang=fr | Même traitement, filtres année et série | Les répertoires BAC II de ce dossier ne contenaient pas de fichiers lors de la consultation. |
| École numérique Togo : Terminale / préparation BAC II | 28 compositions régionales et corrigés | https://ecole.gouv.tg/lycee/mod/folder/view.php?id=2 | Même traitement ; documents étiquetés composition régionale, jamais annale nationale | Le nom du fichier indique les corrigés. A4, C4 et D ; sujets de Terminale uniquement, pas les documents de seconde/première du même dossier. |
| Programme Terminale D, analyse | Rubriques fonctions, limites, dérivation, étude de fonctions, suites | https://ecole.gouv.tg/lycee/course/view.php?id=407 | Métadonnées thématiques ; aucun cours tiers copié | Source pour le choix des notions du parcours original terminale-analyse ; couverture partielle à relire. |
| Programme Terminale D, mécanique | Rubriques travail, puissance, énergie cinétique et mécanique | https://ecole.gouv.tg/lycee/course/view.php?id=413 | Même traitement | Aucune revendication de couverture complète du BAC II. |
| Office du Baccalauréat du Togo | Démarches et résultats | https://officedubactogo.net/Views/index.php | Source institutionnelle consultée ; aucune donnée de candidat collectée | Pas de banque publique de sujets identifiée sur cette page. |
| Secteurs togolais | 13 domaines, 30 chemins indicatifs | data/togo_sectors.json contient chaque URL ministérielle et la portée de sa preuve | Métadonnées contextuelles, rédaction originale des chemins | Existence d’un secteur ou d’une formation, pas mesure de recrutement ni d’inscriptions ouvertes. |
| Pyodide | Moteur Python facultatif 314.0.7 | https://www.npmjs.com/package/pyodide | MPL-2.0 pour Pyodide ; notices conservées dans dist/runtime/python/NOTICE.txt. Python et bibliothèques conservent leurs licences intégrées. | ~12 Mo, chargé séparément. Aucun paquet supplémentaire activé. |

## Autres inspirations et exclusions

Khan Academy : progression par unités ; freeCodeCamp : exercices et pratique ; Class Central : découverte par sujets. Ces inspirations ne créent aucune affiliation. Le curriculum freeCodeCamp n’est pas importé ; la disponibilité linguistique varie. Les contenus propriétaires de Coddy ne sont ni copiés ni traduits : https://coddy.tech/terms. La bibliothèque n’affiche pas des liens comme des cours complets.

Les neuf premières vidéos complémentaires, par Graven, Grafikart, Khan Academy Francophone, Yvan Monka et Dessine-moi l’éco, restent référencées dans dist/curriculum.js avec titre, auteur, identifiant et source par leçon. Elles utilisent le lecteur officiel ; aucune vidéo n’est téléchargée.

Les dates 2027 et coefficients du brief sont non vérifiés dans data/togo_exams.json : calculateur et compte à rebours officiels désactivés. Les calendriers historiques officiels ne sont pas recyclés comme dates futures.

Le cahier de route et codex_prompt_nunya.md sont des références produit adoptées par le propriétaire. Les demandes directes étendent leur périmètre initial ; elles ont aussi fixé le stockage local avant une éventuelle synchronisation. Aucune prise de contact n’a été effectuée.

## Extensions OpenLearn et plateformes togolaises

Deux parcours guidés supplémentaires, huit leçons, sont des adaptations françaises partielles de cours gratuits de The Open University / OpenLearn :

- An introduction to electronics : https://www.open.edu/openlearn/science-maths-technology/an-introduction-electronics/content-section-0 ; notions tension/courant, loi d’Ohm, diviseur de tension et chaîne capteur-logique-action.
- Project management: the start of the project journey : https://www.open.edu/openlearn/money-business/leadership-management/project-management-the-start-the-project-journey/content-section-0 ; définition, acteurs, faisabilité et étapes.

Les pages affichent une licence Creative Commons BY-NC. Conditions : https://about.open.ac.uk/strategy-and-policies/policies-and-statements/copyright-openlearn. Attribution à The Open University, marque textuelle conservée, liens naturels à la source. Le pilote est en noindex pour éviter de concurrencer les originaux dans les recherches. Sélection et reformulation françaises non officielles, exemples et quiz Nunya ; aucun média tiers, logo, attestation ou contenu propriétaire reproduit. Les deux adaptations ne sont pas comptées parmi les 36 cours originaux. Les durées des cours complets d’origine (10 et 35 heures) ne sont pas attribuées à ces extraits adaptés.

Le lien fourni par le propriétaire est un catalogue universitaire et ne permet pas de supposer que chaque qualification est gratuite. La branche OpenLearn est explicitement gratuite ; la sélection n’est pas l’import intégral de ses quelque 900 cours. Le cours An introduction to sustainable energy a été écarté après redirection vers une page de retrait.

Neuf plateformes ou organismes togolais sont documentés avec URL, portée, accès et idée réellement mise en œuvre dans data/togo_platforms.json. Treize projets originaux dans data/togo_projects.json associent une mission, trois étapes, un livrable et une auto-évaluation. ADACE/FAIEJ inspire le canevas et la simulation ; AED/IFAD les projets de filière et la bureautique ; FOCEN/DPIP la mini-leçon ; les ressources de santé spécialisées ne sont pas importées comme formation clinique. Aucun cours fermé n’a été copié, aucun compte tiers créé.

## Espace de ressources 4.0.3

Les présentations françaises des vidéos proviennent du même export public Khan Academy que les métadonnées déjà utilisées. Elles ne sont pas annoncées comme des transcriptions. Les miniatures sont affichées depuis i.ytimg.com, avec chargement différé ; les vidéos restent dans le lecteur officiel YouTube. Les 61 fiches de notion et leurs exercices sont des compléments originaux Nunya, avec statut de brouillon. Une correspondance de notion n’implique ni une équivalence intégrale avec la vidéo ni une conformité certifiée au programme togolais.

## Sélection de compétences — 2 novembre 2026

91 collections ou références, pas 91 traductions intégrales : 77 groupes du catalogue Khan français déjà importé ; huit références LearnFree choisies manuellement ; trois modules Microsoft Learn français ; un cours vidéo freeCodeCamp / LearnFree ; deux adaptations partielles OpenLearn existantes. `data/curated_courses.json` conserve URL exacte, langue source, guide, traitement et statut.

- LearnFree : https://www.learnfree.org/ et https://www.learnfree.org/terms-conditions. Les sections 2.1 et 2.4 limitent la réutilisation et interdisent l’aspiration/indexation. Aucun texte, illustration, photo ou cours complet LearnFree n’est copié ou traduit. Fiches originales françaises Nunya et liens source ; vidéo publique officielle facultative https://www.youtube.com/watch?v=Cu3R5it4cQs, en anglais, lecteur officiel.
- freeCodeCamp : page officielle https://www.freecodecamp.org/news/computer-basics-for-absolute-beginners/ et vidéo qu’elle référence https://www.youtube.com/watch?v=i084Z2ImqNI. Vidéo anglaise signalée, accompagnement Nunya français. La licence du dépôt logiciel freeCodeCamp ne s’applique pas automatiquement à toutes ses vidéos.
- Microsoft Learn : https://learn.microsoft.com/fr-fr/training/modules/write-first-python-code/, https://learn.microsoft.com/fr-fr/training/modules/work-with-data-python/, https://learn.microsoft.com/fr-fr/training/modules/add-decision-making-python/. Sources françaises à accès libre ; compagnon Nunya, pas republication ou certification Microsoft. Comptes et examens éventuels dépendent du fournisseur.
- Class Central : https://www.classcentral.com/report/big-tech-free-courses/ utilisé pour découvrir les organismes ; pas d’aspiration de ses descriptions, aucune promesse que tous les cours ou certificats recensés soient gratuits. Les essais payants et abonnements ne sont pas importés comme cours gratuits.

Les quatre nouveaux cours CV / entretien / documents / tableurs et les trois initiations sont des rédactions Nunya originales à relire. Douze découvertes réassemblent surtout les leçons Nunya existantes ; elles ne gonflent pas le nombre de cours uniques. Les captures de référence du propriétaire ont guidé la navigation et l’organisation, sans copie de photos ou de marque tierce.
