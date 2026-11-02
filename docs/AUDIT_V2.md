# Audit V2 — organisation et profondeur

2 novembre 2026. Référence : brief v5. Audit des sources du site public ; les temps ci-dessous sont à compléter par mesures navigateur, pas des durées inventées.

## Trouver et reprendre

| Tâche | Chemin du prototype avant v5 | Clics de parcours | Constat |
|---|---|---:|---|
| Première leçon Python | Accueil → Bibliothèque → carte Python → Commencer | 3 | Trop indirect ; la recherche peut proposer un glossaire Python à la place du cours. |
| Reprendre une leçon de code | Pas de reprise de leçon Python dans la carte carrière | non disponible | Le suivi carrière ne reprend pas le cours Python autonome. |
| Maths de la classe | Accueil → Mes cours → unité maths → Commencer | 3 | Bon budget ; classe et série dans un autre sous-écran. |
| Cybersécurité | Accueil → parcours cybersécurité → Commencer | 2 | Visible, mais concurrence les cours de base. |
| Cours hors ligne | Accueil → parcours → Emporter | 2 | Visible pour les parcours, moins clair pour les cours. |
| Boucle / variable | Recherche → notices externes | 1 + saisie | Pas de groupes Cours / Leçons ; ne privilégie pas un apprentissage depuis zéro. |
| Où suis-je ? | Cours → leçon | — | Fil incomplet : pas de module thématique ni position dans un programme global. |

Ces comptes viennent des contrôles et liens du code. Les mesures chronométrées et captures avant/après sont conservées avec les tests navigateur v5 ; ne pas assimiler cette inspection à une étude d’utilisabilité.

## Blocage reproduit

Recherche « La mise en page avec CSS » → clic sur mdn-03388f77d9c35869 : état « Préparation de ton espace… » permanent, erreur JavaScript `Cannot set properties of null`. Le rendu historique cherche `.nav-pill` et `[data-i=explore]` après leur remplacement par la navigation Académie. Un rechargement masque le défaut en restaurant temporairement l’ancien DOM. Gardes ajoutées ; test de régression nécessaire sur navigation interne et liens de l’article.

## Profondeur avant v5

Rubrique /8 : longueur, exemple, exercice corrigé, prérequis, glossaire lié, erreurs fréquentes, trace, ≥4 exercices automatiques. Présence structurelle seulement ; aucun score ne vaut validation pédagogique humaine. Les QCM ne sont pas comptés comme quatre exercices de code.

| Leçon | Mots d’explication | Exemples identifiés | Pratique | Score structurel | Manques |
|---|---:|---:|---|---:|---|
| terminale-analyse / 1 — Le domaine avant le calcul | 68 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| terminale-analyse / 2 — Une limite sans valeur au point | 66 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| terminale-analyse / 3 — Calculer une dérivée et une tangente | 68 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| terminale-analyse / 4 — Du signe de la dérivée aux variations | 65 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| terminale-analyse / 5 — Reconnaître une suite arithmétique | 66 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| terminale-analyse / 6 — Une suite géométrique et ses hypothèses | 73 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 1 — Calculer dans le bon ordre | 41 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 2 — Résoudre une équation | 36 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 3 — Développer et factoriser | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 4 — Comprendre une fonction | 39 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 5 — La méthode de proportionnalité | 36 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 6 — Utiliser le théorème de Pythagore | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 7 — Lire des statistiques | 38 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| maths-seconde / 8 — Situation-problème : préparer une sortie | 39 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| security / 1 — Repérer une demande suspecte | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| security / 2 — Une sauvegarde, une deuxième chance | 34 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| security / 3 — Gérer les autorisations | 30 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| security / 4 — Partager avec discernement | 31 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| algorithms / 1 — Une recette pour résoudre un problème | 45 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| algorithms / 2 — Repérer les informations utiles | 37 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| algorithms / 3 — Choisir et répéter | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| algorithms / 4 — Trouver une erreur de logique | 40 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| data / 1 — Une donnée a un contexte | 32 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| data / 2 — Calculer une moyenne | 30 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| data / 3 — Choisir un graphique | 33 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| data / 4 — Interpréter avec prudence | 32 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 1 — Le web, comment ça marche ? | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 2 — Tes premières balises HTML | 31 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 3 — Mettre des couleurs avec CSS | 34 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 4 — Découvrir JavaScript | 32 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 5 — Un bouton qui réagit | 27 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| web / 6 — Mini-projet : ta carte de présentation | 52 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| sql / 1 — Des informations en tableau | 37 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| sql / 2 — Choisir des colonnes | 28 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| sql / 3 — Filtrer avec WHERE | 33 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| sql / 4 — Compter et interpréter | 28 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| javascript / 1 — Garder une valeur | 38 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| javascript / 2 — Choisir avec une condition | 37 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| javascript / 3 — Réutiliser une fonction | 31 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| javascript / 4 — Parcourir une liste | 28 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| physics / 1 — Mesurer pour comprendre | 32 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| physics / 2 — Un circuit, une boucle | 43 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| physics / 3 — Puissance et énergie | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| physics / 4 — Découvrir le solaire | 37 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 1 — Comprendre ton appareil | 33 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 2 — Organiser tes fichiers | 47 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 3 — Économiser ses données | 34 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 4 — Protéger ses comptes | 41 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 5 — Vérifier une information | 41 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| digital / 6 — Créer avec responsabilité | 41 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| git / 1 — Pourquoi conserver des versions ? | 40 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| git / 2 — Comprendre un commit | 30 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| git / 3 — Explorer une branche | 34 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| git / 4 — Collaborer avec attention | 39 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 1 — Bonjour, le monde ! | 35 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 2 — Les variables : des petites boîtes | 42 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 3 — Calculer avec Python | 32 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 4 — Faire des choix avec if | 50 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 5 — Répéter avec une boucle | 34 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 6 — Rassembler des données | 31 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 7 — Créer une fonction | 30 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |
| python / 8 — Ton mini-projet : un budget | 43 | 1 | 1 QCM | 2/8 | Explication 300–700 mots, 4 exercices de code, glossaire lié, erreurs fréquentes, prérequis, trace et quiz complet à ajouter. |

## Structure

- `#/parcours/cours-physics/etape/1` utilise le même préfixe que les métiers ; les cours doivent avoir des routes scolaires et coder distinctes.
- Le même contenu apparaît dans les tableaux JavaScript et les packs de parcours. Les packs doivent devenir des dérivés générés de références stables, jamais des copies éditées indépendamment.
- Une notice de glossaire et un cours débutant ne sont pas interchangeables. Garder les notices dans Ressources ; la recherche pédagogique doit renvoyer d’abord le catalogue de cours/leçons.
- Le catalogue expose des cours courts comme s’ils enseignaient tout un langage ; v5 masque leur statut complet et présente une profondeur explicite.
- Chaque nouvelle leçon aura une position, un plan, une action suivante et une progression par exercice.

## Décision de périmètre

V5 demande des contenus originaux uniquement et la profondeur avant le nombre. Les 18 adaptations historiques FCC préparées pendant la demande précédente ne seront donc pas publiées. Priorité : Python M1–M4 et moteur, puis M5–M10 ; les autres langues restent des plans clairement annoncés. Les articles MDN et les anciennes ressources restent identifiés comme ressources de référence, pas comme le cours Python.

## Après — programme Python M1–M4

Les nouvelles leçons satisfont les huit critères structurels contrôlables de la grille : longueur, exemples, exercices automatiques, prérequis explicites, glossaire lié dans la vue, erreurs, traces et tests exécutés. Le score ci-dessous ne certifie ni le niveau de lecture ni la compréhension humaine ; statut brouillon pour chacune.

| Leçon | Mots d’explication | Exemples | Exercices auto-vérifiés | Quiz | Score structurel | Relecture |
|---|---:|---:|---:|---:|---:|---|
| py-m1-01 — Comprendre le programme, l’éditeur et la console | 328 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m1-02 — Afficher un texte avec print et les guillemets | 318 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m1-03 — Commenter un programme pour expliquer son intention | 347 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m1-04 — Lire une erreur de syntaxe et la corriger | 336 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m1-05 — Créer une carte de présentation dans la console | 345 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-01 — Donner un nom à une valeur | 333 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-02 — Distinguer entiers, décimaux et conversions | 335 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-03 — Assembler et lire des chaînes de caractères | 334 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-04 — Poser une question qui vaut True ou False | 344 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-05 — Lire une saisie avec input puis la convertir | 342 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-06 — Calculer avec les opérateurs arithmétiques | 346 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m2-07 — Présenter un résultat avec une f-string | 340 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m3-01 — Comparer des valeurs | 343 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m3-02 — Choisir avec if et else | 320 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m3-03 — Classer avec elif | 318 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m3-04 — Combiner les conditions | 317 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m3-05 — Créer un bilan d’entraînement | 328 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m4-01 — Répéter avec for et range | 309 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m4-02 — Continuer avec while | 333 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m4-03 — Utiliser break et continue | 326 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m4-04 — Calculer un total et un compteur | 328 | 2 | 4 | 3 | 8/8 | humaine à faire |
| py-m4-05 — Créer un jeu de devinette | 328 | 2 | 4 | 3 | 8/8 | humaine à faire |

### Mesures et captures

Le test `scripts/test-curriculum-findability.mjs` consigne ses durées et conditions dans `FINDABILITY_V5.json`. Depuis l’accueil : première leçon Python 1 clic, reprise 1, maths seconde 3, cybersécurité 1, téléchargement du cours 3. La recherche vérifie les premières destinations et non la seule présence d’un résultat. Le chronométrage commence après affichage de l’accueil ; cache progressivement chaud, serveur local, CDP réseau/CPU ralenti. Ne pas interpréter ces secondes comme des résultats sur téléphone ou réseau réel au Togo.

Avant : `v5-360-before-*` et `v5-1440-before-*`, site public anonyme 5.0.2. Après : `v5-360-after-*` et `v5-1440-after-*`, nouvelle version locale, accueil/carte/leçon complets. Les 16 vues supplémentaires clair/sombre sont dans `AXE_CURRICULUM.json`.

### Migration encore nécessaire

Les anciennes unités scolaires et découvertes métiers gardent leurs sources historiques ; elles ne sont pas annoncées comme conformes à la nouvelle grille de code. Seuls les nouveaux modules Python sont au format canonique complet. Trois parcours techniques référencent leurs modules ; deux séances d’application pointent aussi vers les mêmes identifiants. Les modules suivants et les autres langages n’ont pas de fausses leçons ouvertes.
