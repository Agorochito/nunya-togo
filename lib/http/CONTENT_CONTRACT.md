# HTTP/API — contrat éditorial et technique

Cours original `http-bases`, en français, débutant après JavaScript : fonctions, objets, tableaux. 4 modules × 3 leçons. Chaque leçon : 300–700 mots d’explication progressive, deux exemples avec code JavaScript, trace et sortie, 4 exercices de difficulté progressive et 3 QCM. Même schéma Markdown/frontmatter JSON et `.exercises.json` que `javascript-bases`. `status:brouillon`, `reviewer:null`. Identifiants `http-m1-01` … `http-m4-03`, exercices suffixe `-e1` … `-e4` ; quiz `-q1`…`-q3`. Tous les exercices ont au moins un test visible et un cas supplémentaire. Ne pas recopier des textes tiers.

## Environnement réel

Worker JavaScript asynchrone, `await` autorisé au niveau de l’atelier. `fetch`, `Request`, `Response`, `Headers`, `URL`, `URLSearchParams`, `AbortController` sont réels. `input()` est l’aide Nunya pour les essais, pas une API JavaScript standard. Pas de DOM, Node.js ou serveur distant. L’**API pédagogique locale** est fournie par le service worker de Nunya, fonctionne hors ligne après téléchargement et contient uniquement des données fictives. Aucune écriture n’est conservée entre requêtes. Présenter honnêtement ces limites. Aucun exemple de mot de passe réel ou donnée personnelle ; noms fictifs seulement.

Préfixe des URL : `/api-pedagogique/v1/` (même origine). Les autres requêtes sont refusées par l’atelier.

## API stable

- `GET /ping` → 200 `{version:"locale-v1"}`.
- `GET /texte` → 200, `Content-Type: text/plain; charset=utf-8`, corps `Bonjour depuis l’API locale.\n`.
- `GET /ateliers` → 200 tableau `[{id:1,titre:"Python",ville:"Lomé",places:4},{id:2,titre:"Jardin",ville:"Kara",places:0},{id:3,titre:"Web",ville:"Lomé",places:2}]`. Paramètre `ville` : égalité exacte, vide ou absent = tout. Paramètre `limite` : entier de 1 à 3, sinon 422 `{erreur:"Limite invalide"}`. Filtre avant limite.
- `GET /ateliers/1`, `/2`, `/3` → 200 objet correspondant ; autre identifiant → 404 `{erreur:"Atelier introuvable"}`.
- `POST /inscriptions` : exige `Content-Type: application/json` ; corps JSON `{atelierId:1,nom:"Afi"}`. Nom fictif texte après trim, longueur 1–40 ; identifiant entier connu. Mauvais type ou valeurs → 422 `{erreur:"Données invalides"}` ; atelier inconnu → 404 ; zéro place (atelier 2) → 409 `{erreur:"Complet"}`. Succès 201 `{id:"demo-1",atelierId:1,nom:"Afi"}`. Réponse de démonstration, pas de réservation réelle.
- `PUT /brouillon` : exige JSON `{titre:"Club",places:3}` ; titre texte trim 1–60 ; places entier 0–20. Succès 200 objet nettoyé, erreur 422 `{erreur:"Données invalides"}`. Écho validé sans stockage.
- `DELETE /brouillon` → 204 sans corps. Ne pas appeler `.json()` sur ce corps vide.
- `GET /erreur` → 503 `{erreur:"Indisponible"}`.
- `GET /json-invalide` → 200 application/json, corps `{incomplet` ; `.json()` rejette.
- `GET /interruption` → erreur de réseau locale volontaire (`Response.error()`), `fetch` rejette. Aucun serveur externe contacté.
- `GET /lent` → même JSON que `/ping` après 250 ms ; permet d’essayer un vrai `AbortController` et un signal déjà annulé.
- Méthode non prévue pour une route connue → 405 `{erreur:"Méthode non autorisée"}`, en-tête `Allow`. Autre route → 404 `{erreur:"Route introuvable"}`.
- JSON invalide envoyé à POST/PUT → 400 `{erreur:"JSON invalide"}` ; Content-Type autre que JSON → 415 `{erreur:"Format JSON requis"}`.
- Toutes les réponses ont `X-Nunya-Api: locale-v1` et `Cache-Control: no-store` (sauf erreur réseau volontaire).

## Tests des exercices

Même structure que les exercices JS : `starter_code`, `solution`, `visible_tests`, `hidden_tests`, `hints` (3), `explanation_fr`. Tests : `inputs:[]`, `expected_output:""` si rien affiché, `calls:[{name:"fonction",args:[...],expected:...}]` pour appeler et attendre une fonction async, ou une variable. Assertions attendues sur les valeurs retournées. `http_requests:[{method:"GET",path:"/api-pedagogique/v1/ateliers",status:200,query:{ville:"Lomé"}}]` impose qu’une requête réelle de chaque forme soit observée pendant ce cas ; `query` facultatif, sous-ensemble exact. Les requêtes sont aussi montrées à l’élève. Pour une erreur réseau le statut vaut 0. Éviter les tests qui se valident avec une simple constante affichée.

Exemple de solution : `async function titres(ville) { const url = new URL("/api-pedagogique/v1/ateliers", "https://exemple.invalid"); url.searchParams.set("ville", ville); const r = await fetch(url.pathname + url.search); const donnees = await r.json(); return donnees.map(a => a.titre); }` ; test appel `titres("Lomé")` → `["Python","Web"]`, requête GET path ateliers query ville Lomé. URL de construction illustrative ; seul pathname+search est transmis.

## Plan

M1 : 01 requête/réponse/texte ; 02 promesse et await ; 03 JSON et tableaux.
M2 : 01 paramètres URL et encodage ; 02 status/ok/404/503 ; 03 fonctions clientes et transformation/filtrage.
M3 : 01 POST JSON ; 02 validation/400/415/422/409 ; 03 PUT/DELETE/204 et absence de persistance.
M4 : 01 erreurs JSON/réseau et try/catch ; 02 AbortController/annulation ; 03 projet client de catalogue/inscription fictive et bilan.

Références primaires à consulter : MDN Fetch en français, MDN async/await, WHATWG Fetch. Articles originaux et références naturelles, aucune traduction intégrale copiée.
