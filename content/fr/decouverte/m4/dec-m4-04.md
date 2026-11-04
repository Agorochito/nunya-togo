---
{
  "id": "dec-m4-04",
  "title_fr": "Répéter : pour chaque, tant que",
  "course": "decouverte",
  "module": "m4",
  "order": 4,
  "minutes": 9,
  "outcomes": [
    "Reconnaître les trois façons de répéter des instructions.",
    "Repérer une répétition qui ne s’arrêterait jamais."
  ],
  "idea_fr": "Une boucle répète des instructions : un nombre de fois connu, pour chaque élément d’une liste, ou tant qu’une condition reste vraie.",
  "analogy_fr": "Comme arroser un jardin : tu verses de l’eau pour chaque plant de la rangée, et tu remplis l’arrosoir tant qu’il n’est pas plein.",
  "example": {
    "title_fr": "Arroser une rangée de 5 plants",
    "steps_fr": [
      "Pour chaque plant de la rangée : verser 1 litre d’eau.",
      "La boucle s’exécute 5 fois, une fois par plant.",
      "Avant de commencer : tant que l’arrosoir n’est pas plein, ajouter un gobelet d’eau.",
      "Au total, il faut 5 litres : l’arrosoir doit en contenir au moins autant."
    ]
  },
  "reflect": {
    "question_fr": "Trouve avec tes mots une répétition de ta journée pour chaque type de boucle : un nombre de fois connu, pour chaque élément, et tant que.",
    "model_fr": "Nombre connu : je fais 20 abdominaux. Pour chaque : je range chaque cahier dans mon sac. Tant que : je relis ma leçon tant que je ne peux pas la réciter sans erreur."
  },
  "recap_fr": [
    "Une boucle répète un bloc d’instructions.",
    "Nombre de fois connu, pour chaque élément, ou tant qu’une condition est vraie.",
    "Dans une boucle « tant que », quelque chose doit changer, sinon elle ne s’arrête jamais."
  ],
  "glossary": [
    {
      "term": "Boucle",
      "definition": "Bloc d’instructions répété plusieurs fois."
    },
    {
      "term": "Tour",
      "definition": "Une exécution du bloc d’une boucle."
    },
    {
      "term": "Boucle infinie",
      "definition": "Boucle dont la condition ne devient jamais fausse."
    }
  ],
  "tags": [
    "boucle",
    "répéter",
    "pour chaque",
    "tant que",
    "for",
    "while",
    "logique"
  ],
  "status": "brouillon",
  "reviewer": null
}
---
Imagine devoir écrire « verser 1 litre d’eau » trente fois pour trente plants. Les programmeurs évitent cela avec une boucle : un bloc d’instructions que l’on répète.

Il existe trois grandes façons de répéter. Répéter un nombre de fois connu : « fais 10 pompes ». Répéter pour chaque élément d’une liste : « pour chaque élève de la classe, noter sa présence » ; la boucle s’arrête quand la liste est finie. Répéter tant qu’une condition est vraie : « tant que le réservoir n’est pas plein, pomper » ; ici, on ne sait pas toujours à l’avance combien de fois.

Une boucle « tant que » demande de l’attention. Quelque chose doit changer à chaque tour, pour que la condition finisse par devenir fausse. Sinon, la boucle tourne sans fin : on parle de boucle infinie. « Tant que le nombre est inférieur à 10, afficher le nombre », sans jamais augmenter le nombre, ne s’arrête jamais.

Pour vérifier une boucle, compte les tours sur un petit exemple. En Python, tu écriras ces boucles avec for et while.
