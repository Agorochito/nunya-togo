---
{
  "id": "cssi-m4-03",
  "title_fr": "Garder des images fluides et des cadres stables",
  "course": "css-intermediaire",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "cssi-m4-02"
  ],
  "outcomes": [
    "Rendre une image fluide avec max-width et height: auto sans la déformer.",
    "Réserver un cadre avec aspect-ratio, choisir object-fit et traiter un débordement à sa source."
  ],
  "idea_fr": "Une image adaptable ne dépasse jamais son conteneur, garde ses proportions et occupe un cadre connu avant même d’être chargée.",
  "analogy_fr": "Une photo glissée dans un cadre : on peut la réduire pour qu’elle entre, ou la recadrer, mais on ne l’étire pas.",
  "examples": [
    {
      "code": "body { margin: 0; }\n.carte { padding: 20px; }\n.carte img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}",
      "expected_output": "À 360px, l’image de 640 × 360 s’affiche en 320 × 180 sans déformation.",
      "inputs": [],
      "trace_fr": [
        "La carte retire 20px de chaque côté : il reste 320px.",
        "max-width: 100% limite l’image à 320px.",
        "height: auto applique les proportions 16:9.",
        "La hauteur vaut 320 × 9 / 16 = 180px."
      ],
      "browser_test": {
        "description_fr": "Image fluide à 360px",
        "checks": [
          {
            "selector": "#photo",
            "style": {
              "width": "320px",
              "height": "180px",
              "display": "block"
            },
            "attributes": {
              "alt": "Schéma du jardin du club"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main class=\"carte\" id=\"carte\"><img id=\"photo\" alt=\"Schéma du jardin du club\" width=\"640\" height=\"360\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23164e63'/%3E%3C/svg%3E\"><p>Plan fictif du jardin partagé.</p></main>"
    },
    {
      "code": "body { margin: 0; }\n.vignette {\n  display: block;\n  width: 160px;\n  aspect-ratio: 1 / 1;\n  object-fit: cover;\n}",
      "expected_output": "La vignette occupe un cadre carré de 160px ; l’image le remplit sans déformation, ses bords latéraux sont rognés.",
      "inputs": [],
      "trace_fr": [
        "width fixe la largeur du cadre à 160px.",
        "aspect-ratio: 1 / 1 en déduit une hauteur de 160px.",
        "L’image d’origine est en 16:9 : elle ne correspond pas au cadre.",
        "object-fit: cover la recadre au lieu de l’étirer."
      ],
      "browser_test": {
        "description_fr": "Cadre carré recadré",
        "checks": [
          {
            "selector": "#vignette",
            "style": {
              "width": "160px",
              "height": "160px",
              "aspect-ratio": "1 / 1",
              "object-fit": "cover"
            }
          }
        ],
        "viewport": {
          "width": 360,
          "height": 800
        }
      },
      "fixture_html": "<main><img class=\"vignette\" id=\"vignette\" alt=\"Jardin du club\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23164e63'/%3E%3C/svg%3E\"></main>"
    }
  ],
  "common_mistakes": [
    {
      "error": "Fixer une largeur en pixels sur une image",
      "why_fr": "Elle dépasse des petits écrans.",
      "fix_fr": "Utilise max-width: 100% et height: auto."
    },
    {
      "error": "Limiter la largeur sans libérer la hauteur",
      "why_fr": "La hauteur fixe déforme l’image.",
      "fix_fr": "Ajoute height: auto pour conserver les proportions."
    },
    {
      "error": "Masquer le débordement du conteneur",
      "why_fr": "L’information qui dépasse est coupée, pas corrigée.",
      "fix_fr": "Rends fluide l’élément trop large."
    }
  ],
  "quiz": [
    {
      "question": "Que fait max-width: 100% sur une image ?",
      "options": [
        "Elle l’agrandit toujours à la largeur du conteneur.",
        "Elle supprime l’image sur téléphone.",
        "Elle l’empêche de dépasser son conteneur sans l’agrandir au-delà de sa taille propre.",
        "Elle la rend carrée."
      ],
      "answer": 2,
      "explanation": "max-width est une limite, pas une taille imposée.",
      "id": "cssi-m4-03-q1"
    },
    {
      "question": "Quelle valeur de object-fit remplit le cadre sans déformer, en rognant si nécessaire ?",
      "options": [
        "cover",
        "fill",
        "none",
        "contain"
      ],
      "answer": 0,
      "explanation": "cover conserve les proportions et recadre ; contain montre tout avec d’éventuelles bandes.",
      "id": "cssi-m4-03-q2"
    },
    {
      "question": "Pourquoi conserver les attributs width et height dans le HTML ?",
      "options": [
        "Ils remplacent le texte alternatif.",
        "Ils permettent de réserver la bonne hauteur avant le chargement.",
        "Ils empêchent le CSS de s’appliquer.",
        "Ils téléchargent l’image plus vite."
      ],
      "answer": 1,
      "explanation": "Le navigateur en déduit les proportions et évite un saut du contenu.",
      "id": "cssi-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "image fluide",
      "definition": "Image qui rétrécit avec son conteneur en gardant ses proportions."
    },
    {
      "term": "aspect-ratio",
      "definition": "Propriété qui fixe le rapport largeur / hauteur d’une boîte."
    },
    {
      "term": "object-fit",
      "definition": "Propriété qui décide comment une image occupe une boîte de proportions différentes."
    },
    {
      "term": "débordement",
      "definition": "Contenu qui dépasse de la boîte qui le contient."
    }
  ],
  "recap_fr": [
    "Rendre une image fluide avec max-width et height: auto sans la déformer.",
    "Réserver un cadre avec aspect-ratio, choisir object-fit et traiter un débordement à sa source.",
    "Expliquer le choix réalisé et compléter les contrôles par une revue de l’usage."
  ],
  "tags": [
    "css",
    "intermédiaire",
    "image fluide",
    "aspect-ratio",
    "object-fit",
    "débordement"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "css",
  "runtime": "css",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-09",
  "environment_fr": "Feuille CSS réelle appliquée à la fixture HTML fournie dans une iframe isolée. Les contrôles lisent les styles calculés du navigateur aux dimensions annoncées. Aucun script, média distant, police distante, requête réseau ni envoi de formulaire. Les textes et structures sont fictifs.",
  "references": [
    {
      "title": "MDN — object-fit",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/object-fit"
    },
    {
      "title": "MDN — aspect-ratio",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/aspect-ratio"
    },
    {
      "title": "MDN — overflow",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/overflow"
    },
    {
      "title": "W3C — CSS Box Sizing",
      "url": "https://www.w3.org/TR/css-sizing-4/"
    },
    {
      "title": "W3C — CSS Images",
      "url": "https://www.w3.org/TR/css-images-3/"
    }
  ],
  "sources": [
    {
      "title": "MDN — object-fit",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/object-fit",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — aspect-ratio",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/aspect-ratio",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "MDN — overflow",
      "url": "https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/overflow",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "W3C — CSS Box Sizing",
      "url": "https://www.w3.org/TR/css-sizing-4/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    },
    {
      "title": "W3C — CSS Images",
      "url": "https://www.w3.org/TR/css-images-3/",
      "scope": "Référence technique primaire ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-09"
    }
  ],
  "technical_scope_fr": "Sous-ensemble intermédiaire des standards cités ; mécanismes consultés le 9 novembre 2026. Les contrôles locaux ne constituent pas une certification d’accessibilité."
}
---


## Explication pas à pas

Une image possède des dimensions propres, inscrites dans son fichier. Sans règle particulière, le navigateur l’affiche à cette taille : une illustration de 640px dépasse d’un écran de 360px et provoque un défilement horizontal. Le texte s’adapte seul à la largeur ; les images ont besoin d’une instruction.

La règle de base tient en deux déclarations. max-width: 100% interdit à l’image de dépasser la largeur de son conteneur, sans jamais l’agrandir au-delà de sa taille propre. height: auto demande au navigateur de calculer la hauteur à partir des proportions de l’image. Dans le premier exemple, une illustration de 640 × 360 placée dans une carte dont l’intérieur mesure 320px s’affiche en 320 × 180 : les proportions 16:9 sont conservées. Oublier height: auto alors que le HTML indique une hauteur produit une image écrasée, car la largeur diminue et la hauteur reste fixe.

Conserve les attributs width et height dans le HTML. Ils ne figent pas la taille affichée : ils indiquent les proportions avant le chargement. Le navigateur réserve ainsi la bonne hauteur et le texte situé dessous ne saute pas quand l’image arrive, ce qui compte beaucoup sur une connexion lente. display: block supprime enfin le petit espace que laisse sous elle une image traitée comme du texte.

Une galerie demande parfois des cadres identiques pour des images de proportions différentes. aspect-ratio fixe les proportions du cadre : avec width: 160px et aspect-ratio: 1 / 1, la boîte mesure 160 × 160. L’image d’origine, plus large que haute, ne correspond plus à ce cadre. object-fit décide alors du compromis. La valeur par défaut, fill, déforme l’image pour remplir la boîte. cover remplit le cadre en conservant les proportions, quitte à rogner les bords. contain montre l’image entière, quitte à laisser des bandes vides. Le second exemple utilise cover.

Recadrer est un choix éditorial. cover convient à une photo d’ambiance ; il ne convient pas à un schéma, une carte ou une capture dont chaque bord porte une information. Pour ces images, garde la règle fluide, ou utilise contain.

Reste le débordement. Quand un contenu dépasse, la tentation est d’écrire overflow: hidden sur le conteneur : le défilement disparaît, mais la partie qui dépasse aussi. L’information est coupée, et un contour de focus peut être rogné. Traite la cause : c’est l’élément trop large qu’il faut rendre fluide. Le débogage de cette leçon retire un masquage global et corrige l’image elle-même.

Les fixtures utilisent de petites images intégrées au document, car l’aperçu bloque le réseau. Les contrôles lisent la largeur et la hauteur réellement calculées à 360px et à 720px : une image déformée ou figée donne aussitôt une mesure différente. Pense aussi au texte alternatif : une image adaptée mais sans alt pertinent reste inaccessible à une partie des lecteurs.

## Exemple guidé 1

```css
body { margin: 0; }
.carte { padding: 20px; }
.carte img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

HTML de cet exemple :

```html
<main class="carte" id="carte"><img id="photo" alt="Schéma du jardin du club" width="640" height="360" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23164e63'/%3E%3C/svg%3E"><p>Plan fictif du jardin partagé.</p></main>
```

Résultat attendu : À 360px, l’image de 640 × 360 s’affiche en 320 × 180 sans déformation.

Trace :

- La carte retire 20px de chaque côté : il reste 320px.
- max-width: 100% limite l’image à 320px.
- height: auto applique les proportions 16:9.
- La hauteur vaut 320 × 9 / 16 = 180px.

## Exemple guidé 2

```css
body { margin: 0; }
.vignette {
  display: block;
  width: 160px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
```

HTML de cet exemple :

```html
<main><img class="vignette" id="vignette" alt="Jardin du club" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23164e63'/%3E%3C/svg%3E"></main>
```

Résultat attendu : La vignette occupe un cadre carré de 160px ; l’image le remplit sans déformation, ses bords latéraux sont rognés.

Trace :

- width fixe la largeur du cadre à 160px.
- aspect-ratio: 1 / 1 en déduit une hauteur de 160px.
- L’image d’origine est en 16:9 : elle ne correspond pas au cadre.
- object-fit: cover la recadre au lieu de l’étirer.

## Vérifier et expliquer

Mesure largeur et hauteur aux deux largeurs et vérifie le rapport entre elles. Demande-toi pour chaque image si un recadrage ferait perdre une information.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans les sources primaires suivantes :

- [MDN — object-fit](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/object-fit)
- [MDN — aspect-ratio](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/aspect-ratio)
- [MDN — overflow](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties/overflow)
- [W3C — CSS Box Sizing](https://www.w3.org/TR/css-sizing-4/)
- [W3C — CSS Images](https://www.w3.org/TR/css-images-3/)
