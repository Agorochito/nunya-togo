---
{
  "id": "net-m3-01",
  "title_fr": "Mesurer une connexion : ping, perte et gigue",
  "course": "reseaux-bases",
  "module": "m3",
  "order": 7,
  "minutes": 20,
  "prerequisites": [
    "net-m2-03"
  ],
  "outcomes": [
    "Calculer à partir de mesures de ping le taux de perte, la latence moyenne et la gigue.",
    "Traduire ces nombres en un verdict compréhensible : connexion bonne, moyenne, mauvaise ou coupée."
  ],
  "idea_fr": "Une connexion se juge sur trois nombres : combien de paquets se perdent, combien de temps ils mettent et à quel point ce temps varie.",
  "analogy_fr": "Un taxi-moto qui met toujours vingt minutes est fiable ; un autre qui met tantôt cinq, tantôt quarante minutes, et parfois ne vient pas, ne l’est pas, même si sa moyenne est la même.",
  "examples": [
    {
      "code": "mesures = [42, None, 38, 45, None, 41]\nrecues = [m for m in mesures if m is not None]\nprint(len(mesures) - len(recues), \"perdus sur\", len(mesures))\nprint(round(sum(recues) / len(recues), 1), \"ms en moyenne\")",
      "expected_output": "2 perdus sur 6\n41.5 ms en moyenne\n",
      "inputs": [],
      "trace_fr": [
        "None marque une réponse qui n’est pas revenue.",
        "La moyenne ne porte que sur les 4 réponses reçues.",
        "(42 + 38 + 45 + 41) / 4 = 41,5."
      ]
    },
    {
      "code": "mesures = [40, 90, 35, 95]\necarts = [mesures[i + 1] - mesures[i] for i in range(len(mesures) - 1)]\nprint(ecarts, sum(ecarts) / len(ecarts))\nprint(sum(abs(e) for e in ecarts) / len(ecarts))",
      "expected_output": "[50, -55, 60] 18.333333333333332\n55.0\n",
      "inputs": [],
      "trace_fr": [
        "Les écarts bruts se compensent : 18 ms seulement.",
        "En valeur absolue, l’écart moyen est de 55 ms.",
        "C’est cette seconde valeur, la gigue, qui décrit l’irrégularité."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Compter un paquet perdu comme 0 ms",
      "why_fr": "La moyenne paraît meilleure qu’en réalité.",
      "fix_fr": "Calcule la moyenne sur les réponses reçues."
    },
    {
      "error": "Oublier la valeur absolue dans la gigue",
      "why_fr": "Les hausses et les baisses s’annulent.",
      "fix_fr": "Utilise abs() sur chaque écart."
    },
    {
      "error": "Conclure qu’un serveur est éteint",
      "why_fr": "Beaucoup de serveurs bloquent ICMP.",
      "fix_fr": "Compare avec une autre destination, comme la passerelle."
    }
  ],
  "quiz": [
    {
      "question": "Sur 20 pings, 3 ne reviennent pas. Quel taux de perte ?",
      "options": [
        "3 %",
        "15 %",
        "17 %",
        "30 %"
      ],
      "answer": 1,
      "explanation": "3 / 20 = 0,15, soit 15 %.",
      "id": "net-m3-01-q1"
    },
    {
      "question": "Pourquoi la gigue gêne-t-elle un appel vocal ?",
      "options": [
        "Elle coupe le Wi-Fi",
        "Le son arrive de façon irrégulière et se hache",
        "Elle augmente la facture",
        "Elle ne gêne pas"
      ],
      "answer": 1,
      "explanation": "Les paquets arrivent à intervalles irréguliers.",
      "id": "net-m3-01-q2"
    },
    {
      "question": "Aucun ping ne revient d’un site web, qui s’ouvre pourtant. Pourquoi ?",
      "options": [
        "Le site est éteint",
        "Le serveur bloque probablement ICMP",
        "Le ping est cassé",
        "C’est impossible"
      ],
      "answer": 1,
      "explanation": "Beaucoup de serveurs refusent les pings par sécurité.",
      "id": "net-m3-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "ping",
      "definition": "Outil qui mesure l’aller-retour de paquets ICMP echo."
    },
    {
      "term": "latence",
      "definition": "Temps d’aller-retour d’un paquet, en millisecondes."
    },
    {
      "term": "perte",
      "definition": "Part des paquets envoyés sans réponse."
    },
    {
      "term": "gigue",
      "definition": "Irrégularité de la latence entre mesures successives."
    }
  ],
  "recap_fr": [
    "Calculer à partir de mesures de ping le taux de perte, la latence moyenne et la gigue.",
    "Traduire ces nombres en un verdict compréhensible : connexion bonne, moyenne, mauvaise ou coupée.",
    "Ne sonder ou scanner que des réseaux dont on a la responsabilité ou l’autorisation écrite."
  ],
  "tags": [
    "réseaux",
    "python",
    "IP",
    "ping",
    "latence",
    "perte",
    "gigue"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "debutant",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Les réseaux, mesures et configurations sont des données fictives : aucun paquet n’est envoyé et aucun appareil réel n’est sondé.",
  "references": [
    {
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792"
    },
    {
      "title": "MDN — Comment fonctionne Internet",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work"
    }
  ],
  "sources": [
    {
      "title": "RFC 792 — ICMP",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "scope": "Messages echo utilisés par ping et traceroute. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "MDN — Comment fonctionne Internet",
      "url": "https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
      "scope": "Paquets, routeurs et adresses. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

« Internet ne marche pas » peut vouloir dire beaucoup de choses. Pour diagnostiquer, on mesure. L’outil le plus simple est ping : il envoie de petits paquets ICMP, appelés echo, à une adresse, et chronomètre le retour de chaque réponse en millisecondes. Une réponse qui ne revient pas est un paquet perdu. Une série de pings fournit donc une liste de mesures, dont certaines manquent.

Trois indicateurs résument cette liste. Le taux de perte est la part de paquets sans réponse : 0 % est normal, quelques pour cent dégradent les appels vocaux, au-delà de 10 % la connexion devient pénible. La latence moyenne est le temps moyen des réponses reçues : un serveur proche répond en quelques dizaines de millisecondes, un serveur sur un autre continent en plus de 150, et une connexion par satellite géostationnaire dépasse 500. La gigue mesure l’irrégularité : on fait la moyenne des écarts, en valeur absolue, entre deux mesures consécutives. Une forte gigue hache les appels et la vidéo, même avec une bonne moyenne.

Attention aux pièges de calcul. La moyenne se calcule seulement sur les réponses reçues : compter un paquet perdu comme zéro milliseconde donnerait une connexion faussement rapide. Pour la gigue, il faut la valeur absolue des écarts : sans elle, les hausses et les baisses s’annulent, et une connexion très irrégulière paraît stable. Enfin, si aucune réponse n’arrive, il n’y a ni moyenne ni gigue : la connexion est coupée, ou la destination refuse les pings.

Ce dernier point mérite prudence. Beaucoup de serveurs et de pare-feu bloquent volontairement ICMP. Une absence de réponse ne prouve donc pas que le serveur est éteint ; elle prouve seulement que le ping ne passe pas. Un bon diagnostic compare avec une autre destination, par exemple la passerelle locale : si elle répond, le réseau de l’école fonctionne et le problème est plus loin.

Les seuils qui transforment ces nombres en verdict sont des choix. Ce cours propose une règle simple : coupée si rien ne revient ; mauvaise avec au moins 10 % de perte ou plus de 300 ms en moyenne ; moyenne avec un peu de perte, plus de 100 ms ou une gigue supérieure à 30 ms ; bonne sinon. En Python, None représente une réponse manquante dans la liste, et une compréhension de liste garde les seules réponses reçues.

## Exemple guidé 1

```python
mesures = [42, None, 38, 45, None, 41]
recues = [m for m in mesures if m is not None]
print(len(mesures) - len(recues), "perdus sur", len(mesures))
print(round(sum(recues) / len(recues), 1), "ms en moyenne")
```

Affichage attendu :

    2 perdus sur 6
    41.5 ms en moyenne

Trace :

- None marque une réponse qui n’est pas revenue.
- La moyenne ne porte que sur les 4 réponses reçues.
- (42 + 38 + 45 + 41) / 4 = 41,5.

## Exemple guidé 2

```python
mesures = [40, 90, 35, 95]
ecarts = [mesures[i + 1] - mesures[i] for i in range(len(mesures) - 1)]
print(ecarts, sum(ecarts) / len(ecarts))
print(sum(abs(e) for e in ecarts) / len(ecarts))
```

Affichage attendu :

    [50, -55, 60] 18.333333333333332
    55.0

Trace :

- Les écarts bruts se compensent : 18 ms seulement.
- En valeur absolue, l’écart moyen est de 55 ms.
- C’est cette seconde valeur, la gigue, qui décrit l’irrégularité.

## Vérifier et expliquer

Si tu as un ordinateur, lance ping vers ta box puis vers un site connu, et compare les deux séries avec ton programme.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [RFC 792 — ICMP](https://www.rfc-editor.org/rfc/rfc792)
- [MDN — Comment fonctionne Internet](https://developer.mozilla.org/fr/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
