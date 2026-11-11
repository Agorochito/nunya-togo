# Nunya : plan de refonte visuelle (de « fade » à « vivant »)

*11 novembre 2026. Diagnostic fait sur la 5.19.0 (branche interface-5.2) à partir de 24 captures (8 pages, ordinateur clair et sombre, mobile), du CSS et du JS, par quatre relectures indépendantes (identité visuelle, motivation, mise en page, faisabilité) puis une synthèse revérifiée. Contrastes calculés avec la formule WCAG.*

**État d’avancement :** Phase 0 et Phase 1 faites (version 5.27.0, branche refonte-phase1). Écarts par rapport aux valeurs ci-dessous, imposés par le contrôle de contraste élargi aux panneaux surélevés : bordure forte de Nunya sombre #748279 (au lieu de #66766c) ; latérite de Verre sombre #ffc8ae. Prochaine étape : Phase 2 (accueil et progression vivants).

## 0. Les autres chantiers, et leur place dans ce plan

- **Avant tout (Phase 0)** : fichier `.gitattributes` (fins de ligne LF) pour que la construction donne le même résultat sous Windows et macOS ; protection de la branche `main` sur GitHub (PR et contrôles « Quality » obligatoires), à activer par le propriétaire du dépôt.
- **Interface anglaise d’« Apprendre à coder »** : après la Phase 3, pour ne traduire qu’une fois les nouveaux textes du catalogue et du programme.
- **Git comme carte du catalogue** : inclus dans la Phase 3 (refonte du catalogue).
- **Docker** : à coordonner avec le collaborateur, qui l’annonce « en préparation ».
- **Côté propriétaire** : régénérer la clé Groq ; activer la protection contre les mots de passe divulgués dans Supabase.

## 1. Diagnostic : pourquoi l'interface paraît fade

1. **Une seule teinte, sans relief.** Dans l'ambiance Nunya (`dist/ambiances.css:2`), les couleurs de fond (#f6f4ee), des cartes (#fff) et des panneaux pâles (#e2efe6) sont presque identiques : entre 1,08 et 1,10:1 de contraste. L'unique couleur chaude, l'orange #f08a4b, n'atteint que 2,49:1 sur blanc. Elle échoue au seuil de 3:1 exigé pour les éléments graphiques, et on ne la voit en pratique que dans le cœur du pied de page.
2. **Le thème écrase volontairement les différences.** `dist/theme-system.css` (28 lignes avec `!important`) l'annonce dès sa ligne 1 : « One accent ». Le reste suit :
   - tout paragraphe passe en gris (l.8) et tout lien en vert (l.10) ;
   - une vingtaine de bandeaux reçoivent le même fond pâle (l.5) ;
   - les illustrations sont masquées : `.hero-art,.catalog-art{display:none}` (l.22) ;
   - les badges sont aplatis (l.30), si bien que l'état doré « obtenu » défini dans `styles.css` (`.achievement.earned`) n'apparaît jamais.
3. **Toutes les pages se ressemblent.** On retrouve le même panneau vert pâle en tête de l'accueil, du catalogue, du programme, de la Bibliothèque, de Mes cours et de Mon avenir (desktop-light-*.png). Le catalogue aligne 21 cartes blanches identiques : environ 10 100 px de haut sur ordinateur, 21 400 px sur mobile. Aucune page ne contient d'image.
4. **La typographie n'a pas d'échelle.**
   - Les surtitres font 7 à 9 px avec un large espacement des lettres (`styles.css` : `.eyebrow{font-size:8px;letter-spacing:1.7px}`), donc « Bonjour, Afi » est illisible sur un petit téléphone.
   - Le titre de domaine et les titres de cartes ont la même taille, 20 px (`course-catalogue.css:53` et `:122`).
   - Les polices serif et sans-serif sont mélangées sans règle : « Mes cours & examens » est en serif, « Cybersécurité… » en sans-serif juste en dessous.
5. **L'accueil ne parle pas à l'apprenant.** La carte de reprise est un texte fixe (`coding-curriculum.js:27`) : « Reprends exactement où tu en étais. », sans le nom du cours ni de la leçon, sans progression. Le catalogue, lui, sait déjà afficher « Python : les bases · 2/53 ». Deux tuiles répètent le menu (« 01 → », « 02 → »). Santé et Agriculture partagent la même icône en histogramme (`academy-app.js:19`).
6. **La progression se contredit.** Une même page affiche « 2/53 leçons » puis « 0 leçons terminées · 0 jour · 0 min ».
   - Cause : la série et les minutes ne sont alimentées que par l'ancien `verify()` (`app.js:63`). La fin d'une leçon de code (`coding-curriculum.js:53`) n'écrit que `completed[l.id]=true`.
   - Les 21 cours s'affichent même à 0, avec un bouton « Reprendre » sur des cours jamais commencés.
   - La note « Temps indicatif » est en 9 px #a1ab97 (`app.js:54`), soit environ 2,3:1, ce qui échoue à l'AA.
7. **Accessibilité.** Les bordures des champs et des listes déroulantes (#dde3d8 sur blanc) n'ont que 1,31:1, sous le minimum de 3:1 (WCAG 1.4.11). Le contrôle de contraste de `build-ambiances.py` ne vérifie que le texte. On trouve aussi deux libellés collés (« fiche de lectureImprimer ou PDF »), « 6 Séance » sans pluriel et « 4.4 h » écrit à l'anglaise (`toFixed(1)`, 6 occurrences).

**Contraintes vérifiées :**
- JS cœur à environ 149 200 o gzip pour un budget de 150 000 o (`scripts/js-budget.mjs`). Toute nouvelle logique va donc en CSS ou dans des modules chargés à la demande (`dist/runtime/*.js` existe déjà pour le catalogue, le programme et la leçon).
- CSS : 37 831 o gzip, sans budget défini.

## 2. Direction visuelle proposée : « Forêt, latérite, soleil »

### Palette (Nunya clair, contrastes recalculés)

| Jeton | Valeur | Usage | Contraste |
|---|---|---|---|
| `--brand` | #1f5e46 | Actions principales (inchangé) | 6,45 sur #e2efe6 |
| `--warm` (latérite) | #a8401a | « En cours / prochaine étape », barres de progression, surtitres | 6,15 sur blanc, 5,47 sur fond |
| `--warm-soft` | #fbe7dc | Ligne « leçon actuelle » | latérite dessus : 5,15 |
| `--sun` (soleil) | #f2b134 | Remplissage seulement (badges, objectif atteint) | texte `--sun-on` #1b1208 : 9,78 |
| `--hero-bg` | #173f31 | Un panneau « moment » sombre par page | crème #f7f1e6 : 10,43 ; soleil : 6,2 |
| `--theme-bg` | #f7f1e6 (crème) | Fond | encre 14,5 ; gris 6,17 |
| `--line-strong` | #7d8a80 | Bordures des champs, listes, boutons secondaires | 3,61 sur blanc, 3,21 sur fond |

- `--accent-2` devient un alias de `--warm`, ce qui corrige d'un coup ses 6 usages.
- **Sombre :** fond #0e1411, surface #1a2520, surélevé #24332c, `--warm` #ff9f78 (7,89), `--sun` #f2c35b, ligne forte #66766c (3,29). La menthe reste réservée au bouton principal. L'élément de menu actif devient une barre latérale latérite.
- **Relief :** le blanc sur crème ne donne que 1,12:1. La séparation viendra donc de l'ombre `--amb-shadow` et de bordures, pas de la luminosité seule.
- **Couleurs de domaine :** couleur foncée / teinte claire, contrastes en clair :
  - Web : indigo #2f45a3 / #e6eafb (7,0)
  - Langages : forêt
  - Données : lagune #0b6670 / #ddf1f1 (5,7)
  - Sécurité : latérite
  - Outils : aubergine #6b3a78 / #f1e4f4 (6,9)
  - Algo et qualité : ocre #7d5200 / #fbefd2 (6,0)

  Aucune couleur de marque réelle (pas de jaune Python ni JS). La couleur n'est jamais le seul indice : le nom du domaine reste affiché.
- Les 7 ambiances reçoivent ces rôles via `scripts/build-ambiances.py`.

### Typographie (polices système, aucune police web)

- **Échelle** de rapport 1,25 : 12, 14, 16, 20, 25, 31, 39 px (`--fs-1` à `--fs-7`, `clamp()` pour les trois plus grandes). Aucun texte sous 12 px.
- **Serif** (`--font-heading`, Noto Serif sous Android, graisse 700) pour h1, h2 et tous les titres de cours ou de cartes. **Sans-serif** pour l'interface, les métadonnées et les chiffres (`tabular-nums`).
- **Surtitres :** 12 px, graisse 650, espacement 0,06em, en latérite.
- **Leçon :** corps 16 px, interligne 1,65, couleur encre (et non grise). Le gris est réservé aux métadonnées.
- **Hiérarchie :** un titre de section a au moins deux crans de plus qu'un titre de carte.

### Motif et illustrations

- **Motif « tissage »** : inspiré de la structure du tissage en bandes (blocs alternés cousus bord à bord), géométrique, original, sans reprendre de motif kente nommé.
  - Il correspond au modèle pédagogique : leçon = bloc, module = bande, cours = étoffe.
  - 3 ou 4 tuiles SVG de 200 à 350 o en data-URI.
  - Utilisé seulement sur les bords du panneau sombre (opacité 8 à 12 %, 6 % en sombre), sur les couvertures et sur les états vides. Jamais derrière du texte.
- **Couvertures de cours générées** : SVG d'environ 300 o produit par une fonction `coverSVG()` dans `lib/runtime/coding-views.mjs` (module à la demande). Fond de la couleur du domaine, symbole de la technologie (`Py`, `</>`), un bloc par module qui se remplit avec la progression.
- **4 illustrations d'état vide** en SVG inline de 1,5 Ko maximum, colorées par `currentColor` : graine, carnet, métier à tisser, chemin.
- **Icônes** : une dizaine d'icônes au trait ajoutées (santé, pousse, camion, étal…) via `mask-image` en CSS, sans JS dans le cœur. Plus d'emoji dans les badges.

### Composants clés

Panneau « moment » sombre, carte de cours compacte, anneau de progression (`conic-gradient`), frise « Ta bande », rythme sur 7 jours, badge verrouillé ou obtenu.

## 3. Plan par phases

Ces critères s'appliquent à **chaque phase** :
- axe : 0 violation, sur 8 pages × {360, 1440} × {clair, sombre} × 7 ambiances ;
- texte ≥ 4,5:1 et éléments non textuels ≥ 3:1 ;
- budget JS cœur inchangé (≤ 150 000 o) ;
- CSS : budget de 42 Ko gzip pendant la Phase 0 (jetons ajoutés, pas encore utilisés), puis ≤ 40 Ko dès la Phase 1, et en baisse ensuite ;
- `prefers-reduced-motion` respecté ;
- captures de référence relues.

### Phase 0 : fondations techniques (M)

- **Objectif :** pouvoir changer le style sans casse.
- **Changements :**
  - remplacer `scripts/audit-ui.mjs`, dont le chemin Chrome est figé sur macOS, par `scripts/visual-baseline.mjs` (Chromium de Playwright, axe et comparaison de captures sur Nunya et Verre, état seedé « 2 leçons Python ») ;
  - ajouter un budget CSS gzip dans `js-budget.mjs` ;
  - ajouter un « cliquet » `check-css.mjs` qui bloque toute hausse du nombre de `!important`, de couleurs hex en dur et de tailles inférieures à 12 px ;
  - étendre le contrôle de contraste de `build-ambiances.py` aux éléments non textuels (ligne forte, remplissage contre piste, anneau de focus, paires domaine) ;
  - générer les nouveaux jetons (rôles, échelles d'espacement 4 à 64, rayons 8/14/24/pill, typo) **sans encore les utiliser**.
- **Risque :** faible.
- **Critères :** captures identiques à la version actuelle ; le script tourne sous Windows.

### Phase 1 : gains rapides visibles, en une PR (S)

- **Changements :**
  - nouvelle palette chaude dans les 7 ambiances ;
  - bordures fortes sur les champs ;
  - échelle typographique et plancher de 12 px ;
  - retrait de `p` et `a` des blocs `!important` (`theme-system.css` l.8 et l.10), texte de leçon en encre ;
  - badges : distinction verrouillé / obtenu en CSS ;
  - progression en latérite ;
  - corrections : pluriel « séances », `toLocaleString` (« 4,4 h »), écart entre les libellés collés, icônes Santé et Agriculture ;
  - note 9 px #a1ab97 remplacée par des jetons.
- **Fichiers :** `build-ambiances.py`, `ambiances.css`, `theme-system.css`, `academy-layout.css`, `course-catalogue.css`, `coding-views.mjs`, `data/ui-academy.json`.
- **Risque :** moyen. Retirer les `!important` peut faire réapparaître d'anciennes couleurs de `styles.css`, d'où la revue des 7 ambiances.
- **Critères :** champs ≥ 3:1 ; aucun texte < 12 px ; JS cœur ≤ +40 o.

### Phase 2 : accueil et progression vivants (M)

- **Données :** une fonction utilitaire `aTick(min)` dans le cœur (environ 80 o), appelée à la fin d'une leçon de code, de Git ou de découverte. Elle alimente `state.activity` et `state.minutes`, une seule fois par leçon.
- **Nouveau module `lib/runtime/momentum.mjs`** (précaché dans `sw.js`) :
  - accueil : panneau sombre « Reprendre : Leçon 3, Commenter un programme », barre 2/53, un seul bouton principal ; anneau « x/15 min », 7 points de rythme, prochain badge ;
  - « Ma progression » ordonnée ainsi : « Cette semaine », « En cours », badges, « Pas encore commencés (20) » dans un `<details>` fermé.
- **Rythme hebdomadaire bienveillant** à la place d'une série stricte : aucune formule de perte du type « tu as perdu ta série ».
- **Financement des octets :** déplacer `progressView` (`app.js:54`, environ 1,4 Ko gzip) et `coding-curriculum.js:72` vers le module libère le budget cœur.
- **Suppressions :** les tuiles 01/02 de l'accueil.
- **Risques :** 5 surcharges `progressView` chaînées à préserver ; tests qui lisent le texte ; repli en liste simple si le module manque hors ligne.
- **Critères :**
  - les compteurs concordent (2 partout) ;
  - Progression fait ≤ 2 500 px sur ordinateur (aujourd'hui 9 774) ;
  - JS cœur ≤ budget, avec un gain net ;
  - le module est annoncé en `aria-live=polite`.

### Phase 3 : catalogue et page programme (M)

Uniquement dans des modules à la demande (`course-catalogue.mjs`, `coding-views.mjs`), donc 0 o dans le cœur.

- **Catalogue :**
  - recherche et filtres dans l'en-tête, puis « Continuer », puis « Pour bien commencer » (3 cartes vedettes avec couverture), puis domaines ;
  - Git déplacé dans « Outils » ;
  - la liste de pastilles en double est supprimée ;
  - la sauvegarde et la restauration vont dans Progression.
- **Carte compacte** (environ 220 px) : bande de domaine et symbole, titre serif, résumé limité à 2 lignes, une seule ligne de métadonnées, progression seulement si le cours est commencé, carte entièrement cliquable. « Relecture en cours » devient une note unique en haut du catalogue. Les attributs `data-domain`/`data-tech` portent la couleur.
- **Programme :**
  - frise verticale des modules dans la couleur du domaine (fait / ici en latérite / à venir) ;
  - seul le module courant est ouvert, les autres restent dans un `<details>` avec « 0/7 leçons » ;
  - `aria-current="step"` et étiquette « Prochaine leçon » ;
  - la fiche imprimable rend toujours tout.
- **Risques :** tests liés à l'ordre des éléments ; Ctrl+F dans les modules repliés.
- **Critères :** catalogue ≤ 4 000 px sur ordinateur ; `content-visibility:auto` sur les listes.

### Phase 4 : leçon et mobile (M)

- **Changements :**
  - en-tête de leçon raccourci (fil d'Ariane sur une ligne, export dans un menu « ⋯ ») ;
  - pastille « ✓ Leçon terminée » quand la leçon est déjà validée ;
  - bandeau non bloquant « Leçon terminée · Module 1 : 3/5 » avec choix « Continuer / Faire une pause » ;
  - sur ordinateur, le panneau de pratique devient une colonne flex avec la barre « Vérifier mon code » toujours visible (aujourd'hui coupée à 900 px de haut) ;
  - exercices en pastilles numérotées ;
  - sur mobile, `padding-bottom` avec `env(safe-area-inset-bottom)`.
- **Fichiers :** `coding-views.mjs`, `academy-layout.css`, `coding-curriculum.js` (≤ 40 o).
- **Risques :** le focus reste sur le h1 de la leçon ; cibles tactiles ≥ 44 px.
- **Critères :** sur un écran 360×640, la première ligne de contenu apparaît au-dessus de la ligne de flottaison ; testé à 1366×768.

### Phase 5 : finitions et illustrations (M)

- **Changements :**
  - motif tissage, couvertures complètes (en-tête du programme, vignettes de progression) ;
  - 4 illustrations d'état vide ;
  - médaillons SVG pour les badges, icônes de domaine ;
  - cartes « Bientôt » de Mon avenir regroupées en une seule ligne ;
  - Bibliothèque : le h1 passe avant la promotion.
- **Ensuite :** encapsuler le CSS en `@layer` au moment de la construction, puis vider `theme-system.css` de ses `!important` groupe par groupe ; supprimer le CSS mort repéré par mesure de couverture.
- **Risques :** mauvaise lecture culturelle du motif, d'où une co-conception avec des lycéens et un ou une designer togolais ; bruit visuel, d'où une opacité plafonnée ; masquage en `.low-data`.
- **Critères :** illustrations ≤ 25 Ko au total et précachées ; aucun filtre ni flou ; Verre en version allégée si `deviceMemory ≤ 2`.

## 4. Ce qui est volontairement écarté

- **Polices web, images distantes, photos** : contraires au fonctionnement hors ligne et coûteuses en données.
- **Classements, points, rareté, badge « sans indice »** : contraires à la promesse « sans classement, sans comparaison » et dissuasifs.
- **Série stricte de jours consécutifs** : elle pénalise l'accès partagé au téléphone et le coût des données.
- **Double interface v6 activable par l'apprenant** : elle doublerait les captures de référence. On utilise plutôt des drapeaux internes par page.
- **Script de thème avant le premier affichage dans `boot-guard.js`** : il coûterait des octets au cœur. On se contente d'un défaut CSS `prefers-color-scheme`.
- **Défilement horizontal des domaines sur ordinateur et barre de lecture animée par le défilement** : bénéfice faible et prise en charge inégale sur les anciens WebView Android.
- **Nouveaux `backdrop-filter`** : trop coûteux sur un Android d'entrée de gamme.

## 5. Décisions du propriétaire (11 novembre 2026)

1. **Palette :** « Forêt, latérite, soleil ».
2. **Motif tissage :** oui, montré à quelques lycéens ou à un·e designer togolais·e avant la mise en ligne.
3. **Badges :** une dizaine de jalons calculés à partir des leçons réellement validées, sans points ni classement.
4. **Ambiances :** les 7 sont conservées (Nunya, Lagune, Kente, Sauge, Prune, Nuit, Verre liquide). Chaque phase doit donc régler et tester les 7, en clair et en sombre quand l’ambiance l’a.

Reste ouvert : faut-il garder le bouton direct « Commencer » sur chaque carte de cours, ou seulement sur les cartes vedettes et « Continuer » ? Par défaut, on le garde (Phase 3).