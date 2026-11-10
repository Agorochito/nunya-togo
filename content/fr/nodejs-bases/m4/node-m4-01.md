---
{
  "id": "node-m4-01",
  "title_fr": "Les événements : découpler son programme",
  "course": "nodejs-bases",
  "module": "m4",
  "order": 10,
  "minutes": 20,
  "prerequisites": [
    "node-m3-03"
  ],
  "outcomes": [
    "Utiliser EventEmitter pour émettre et écouter des événements.",
    "Séparer la logique métier des réactions qu’elle déclenche."
  ],
  "idea_fr": "Avec les événements, une partie du programme annonce ce qui se passe, et d’autres parties décident d’y réagir, sans dépendre les unes des autres.",
  "analogy_fr": "Au marché, le crieur annonce l’arrivée du camion de poisson. Il ne connaît pas les clients : chacun réagit comme il veut, ou pas du tout.",
  "examples": [
    {
      "code": "const EventEmitter = require(\"events\");\n\nconst marche = new EventEmitter();\nmarche.on(\"arrivage\", produit => console.log(\"Client 1 achète\", produit));\nmarche.on(\"arrivage\", produit => console.log(\"Client 2 note\", produit));\nmarche.emit(\"arrivage\", \"poisson\");\nconsole.log(\"fin de l’annonce\");",
      "expected_output": "Client 1 achète poisson\nClient 2 note poisson\nfin de l’annonce\n",
      "inputs": [],
      "trace_fr": [
        "Deux écouteurs sont abonnés au même événement.",
        "emit les appelle dans l’ordre d’abonnement.",
        "emit est synchrone : « fin » s’affiche après."
      ]
    },
    {
      "code": "const EventEmitter = require(\"events\");\n\nclass Caisse extends EventEmitter {\n  constructor(seuil) {\n    super();\n    this.seuil = seuil;\n    this.total = 0;\n  }\n\n  vendre(montant) {\n    this.total += montant;\n    this.emit(\"vente\", montant);\n    if (this.total >= this.seuil && this.total - montant < this.seuil) {\n      this.emit(\"objectif\", this.total);\n    }\n  }\n}\n\nconst caisse = new Caisse(5000);\ncaisse.on(\"vente\", m => console.log(\"vente\", m));\ncaisse.once(\"objectif\", total => console.log(\"Objectif atteint :\", total));\n[2000, 2500, 1500, 800].forEach(m => caisse.vendre(m));",
      "expected_output": "vente 2000\nvente 2500\nvente 1500\nObjectif atteint : 6000\nvente 800\n",
      "inputs": [],
      "trace_fr": [
        "La caisse émet « vente » à chaque vente.",
        "Elle émet « objectif » quand le total franchit le seuil.",
        "L’écouteur once ne réagit qu’une fois."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Émettre \"error\" sans écouteur",
      "why_fr": "Le programme peut s’arrêter.",
      "fix_fr": "Abonne toujours un écouteur d’erreur."
    },
    {
      "error": "on à la place de once",
      "why_fr": "Une alerte se répète à chaque fois.",
      "fix_fr": "Utilise once pour une réaction unique."
    },
    {
      "error": "Abonner un écouteur à chaque requête",
      "why_fr": "Fuite de mémoire et avertissement.",
      "fix_fr": "Abonne une fois, ou désabonne avec off."
    }
  ],
  "quiz": [
    {
      "question": "Que fait emit(\"vente\", 1500) ?",
      "options": [
        "Programme une vente",
        "Appelle tous les écouteurs de « vente » avec 1500",
        "Supprime les écouteurs",
        "Rien sans serveur"
      ],
      "answer": 1,
      "explanation": "Immédiatement.",
      "id": "node-m4-01-q1"
    },
    {
      "question": "Différence entre on et once ?",
      "options": [
        "Aucune",
        "once ne réagit qu’une fois",
        "on est asynchrone",
        "once est plus rapide"
      ],
      "answer": 1,
      "explanation": "Retiré après le premier appel.",
      "id": "node-m4-01-q2"
    },
    {
      "question": "Pourquoi utiliser des événements ?",
      "options": [
        "Pour aller plus vite",
        "Pour découpler l’émetteur de ses réactions",
        "C’est obligatoire",
        "Pour les fichiers"
      ],
      "answer": 1,
      "explanation": "On ajoute des réactions sans toucher l’émetteur.",
      "id": "node-m4-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "EventEmitter",
      "definition": "Classe de Node.js qui émet et gère des événements."
    },
    {
      "term": "écouteur",
      "definition": "Fonction abonnée à un événement."
    },
    {
      "term": "emit",
      "definition": "Méthode qui déclenche un événement."
    },
    {
      "term": "découplage",
      "definition": "Indépendance entre les parties d’un programme."
    }
  ],
  "recap_fr": [
    "Utiliser EventEmitter pour émettre et écouter des événements.",
    "Séparer la logique métier des réactions qu’elle déclenche.",
    "Un serveur fiable vérifie tout ce qu’il reçoit et répond toujours, même quand la demande est mauvaise."
  ],
  "tags": [
    "node.js",
    "serveur",
    "javascript",
    "EventEmitter",
    "écouteur",
    "emit",
    "découplage"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "javascript",
  "runtime": "node",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Node.js 20 exécuté en ligne sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seul le code du programme est envoyé. Les serveurs sont démarrés par l’atelier sur un port local temporaire : n’appelle pas listen() dans les exercices.",
  "references": [
    {
      "title": "Node.js — events",
      "url": "https://nodejs.org/docs/latest-v20.x/api/events.html"
    },
    {
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html"
    }
  ],
  "sources": [
    {
      "title": "Node.js — events",
      "url": "https://nodejs.org/docs/latest-v20.x/api/events.html",
      "scope": "EventEmitter et événements. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Node.js — modules CommonJS",
      "url": "https://nodejs.org/docs/latest-v20.x/api/modules.html",
      "scope": "require, module.exports et organisation en fichiers. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Tu as déjà rencontré des événements sans les nommer : req.on("data", …) et req.on("end", …) dans le module précédent. Node.js repose largement sur ce modèle. Le module events fournit la classe EventEmitter, qui permet à n’importe quel objet d’émettre des événements et à d’autres parties du programme de les écouter.

Un émetteur annonce un événement avec emit(nom, données) : caisse.emit("vente", 1500). Un écouteur s’abonne avec on(nom, fonction) : caisse.on("vente", montant => …). Quand l’événement est émis, toutes les fonctions abonnées sont appelées, dans l’ordre de leur abonnement, avec les données transmises. once(nom, fonction) abonne une fonction pour une seule fois : elle est retirée après le premier déclenchement. off, ou removeListener, désabonne une fonction.

L’intérêt principal est le découplage. Une classe Caisse se contente d’enregistrer les ventes et d’annoncer « vente » ou « objectif atteint ». Elle ne sait rien de ce qui suit : enregistrer dans un fichier, envoyer une notification, mettre à jour un tableau de bord. On peut ajouter ou retirer ces réactions sans toucher à la caisse, et tester la caisse seule. C’est le même principe que les clics dans le navigateur, où un bouton émet click sans savoir qui l’écoute.

On crée ses propres émetteurs en héritant de la classe : class Caisse extends EventEmitter, avec super() au début du constructeur. Les méthodes de la classe appellent this.emit au bon moment.

Quelques règles évitent les surprises. emit est synchrone : les écouteurs s’exécutent immédiatement, avant la ligne suivante. Un écouteur lent bloque donc l’émetteur ; on y lance plutôt une opération asynchrone. L’événement spécial "error" est traité à part : s’il est émis sans aucun écouteur, Node.js lève l’erreur et le programme peut s’arrêter. Toute classe qui émet "error" doit donc être utilisée avec un écouteur d’erreur. Enfin, ajouter des écouteurs sans jamais les retirer, par exemple à chaque requête, provoque une fuite de mémoire : Node.js affiche un avertissement au-delà de dix écouteurs pour le même événement.

Choisir entre on et once est une vraie décision : une alerte « objectif atteint » ne doit sonner qu’une fois, alors qu’un journal des ventes doit tout enregistrer.

## Exemple guidé 1

```javascript
const EventEmitter = require("events");

const marche = new EventEmitter();
marche.on("arrivage", produit => console.log("Client 1 achète", produit));
marche.on("arrivage", produit => console.log("Client 2 note", produit));
marche.emit("arrivage", "poisson");
console.log("fin de l’annonce");
```

Affichage attendu :

    Client 1 achète poisson
    Client 2 note poisson
    fin de l’annonce

Trace :

- Deux écouteurs sont abonnés au même événement.
- emit les appelle dans l’ordre d’abonnement.
- emit est synchrone : « fin » s’affiche après.

## Exemple guidé 2

```javascript
const EventEmitter = require("events");

class Caisse extends EventEmitter {
  constructor(seuil) {
    super();
    this.seuil = seuil;
    this.total = 0;
  }

  vendre(montant) {
    this.total += montant;
    this.emit("vente", montant);
    if (this.total >= this.seuil && this.total - montant < this.seuil) {
      this.emit("objectif", this.total);
    }
  }
}

const caisse = new Caisse(5000);
caisse.on("vente", m => console.log("vente", m));
caisse.once("objectif", total => console.log("Objectif atteint :", total));
[2000, 2500, 1500, 800].forEach(m => caisse.vendre(m));
```

Affichage attendu :

    vente 2000
    vente 2500
    vente 1500
    Objectif atteint : 6000
    vente 800

Trace :

- La caisse émet « vente » à chaque vente.
- Elle émet « objectif » quand le total franchit le seuil.
- L’écouteur once ne réagit qu’une fois.

## Vérifier et expliquer

Liste trois événements d’une application de boutique et, pour chacun, deux réactions possibles.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [Node.js — events](https://nodejs.org/docs/latest-v20.x/api/events.html)
- [Node.js — modules CommonJS](https://nodejs.org/docs/latest-v20.x/api/modules.html)
