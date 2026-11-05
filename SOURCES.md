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


## Lot 5.3.0 — cours et correcteurs

Les nouveaux textes, exemples, exercices et projets sont originaux Nunya, en français, avec statut brouillon et réviseur non renseigné. Les références techniques par leçon sont conservées dans leurs métadonnées. Les collections externes restent attribuées à leurs fournisseurs ; leurs ressources ne sont pas comptées comme des cours complets Nunya.

- Python : documentation officielle du langage et des bibliothèques, https://docs.python.org/fr/3/ ; AST pour les constructions effectivement utilisées : https://docs.python.org/3/library/ast.html .
- HTML : norme WHATWG, https://html.spec.whatwg.org/ ; CSS : spécifications W3C, https://www.w3.org/Style/CSS/specs.en.html .
- JavaScript : guide MDN en français, https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide ; ECMAScript, https://tc39.es/ecma262/ .
- Iframes et restrictions : https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe ; Workers : https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers . Le vérificateur HTML/CSS utilise un script fixe externe sous CSP et une iframe sans accès à l’origine parent. Le code HTML/CSS de l’élève n’exécute pas de JavaScript.

Les données de projets (prix, stocks, réservations et formulaires d’association) sont fictives. Les tests natifs et de navigateur apportent une vérification technique ; ils ne remplacent pas une relecture pédagogique indépendante.

## Atelier Git — 5 novembre 2026

12 leçons et activités originales Nunya, en français et en relecture. Références primaires conservées dans les leçons : [livre Git en français](https://git-scm.com/book/fr/v2), [documentation Git](https://git-scm.com/docs) et [documentation GitHub](https://docs.github.com/fr). Aucun manuel tiers n’est copié.

Le moteur utilise `isomorphic-git@1.44.10`, `@isomorphic-git/lightning-fs@4.10.5` et `buffer@6.0.3`, épinglés et regroupés localement avec leurs dépendances. Les notices complètes sont générées dans `dist/runtime/git-THIRD-PARTY.txt`. Le moteur ne contacte ni GitHub ni un serveur Git ; les dépôts sont isolés dans le stockage du navigateur. Sources : https://github.com/isomorphic-git/isomorphic-git et https://github.com/isomorphic-git/lightning-fs .

## HTTP/API — 5 novembre 2026

12 leçons, 24 exemples et 48 exercices originaux Nunya, en français et en relecture. Les métadonnées de chaque leçon indiquent ses références : [MDN Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch), [async/await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await), [WHATWG Fetch](https://fetch.spec.whatwg.org/) et [URL](https://url.spec.whatwg.org/). Aucun article tiers n’est recopié. Le contrat et l’API de démonstration stateless sont originaux, avec des ateliers et des noms fictifs. Aucun service externe ou compte nouveau n’est utilisé.

## SQL — SQLite local, version 5.6

18 leçons, 36 exemples et 72 exercices originaux en français, en relecture. Références primaires dans les leçons : [SELECT](https://sqlite.org/lang_select.html), [expressions et NULL](https://sqlite.org/lang_expr.html), [agrégats](https://sqlite.org/lang_aggfunc.html), [contraintes](https://sqlite.org/lang_createtable.html), [transactions](https://sqlite.org/lang_transaction.html) et [limites SQLite](https://sqlite.org/pragma.html#pragma_hard_heap_limit). Aucun texte de cours tiers recopié. Les données de club sont fictives.

`sql.js@1.15.2` (MIT) fournit SQLite compilé en WebAssembly, auto-hébergé. Licence conservée dans `dist/runtime/sql/LICENSE.txt` ; [projet sql.js](https://github.com/sql-js/sql.js). Worker et WASM représentent environ 355 Ko gzip, téléchargés à la demande avec le cours. Chaque essai repart d’une base temporaire ; le script et les progrès sont conservés. La limite native de 16 Mio concerne l’allocateur SQLite, pas toute la mémoire du navigateur.
