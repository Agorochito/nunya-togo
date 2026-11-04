---
{
  "id": "dec-m4-03",
  "title_fr": "Décider : si… alors… sinon",
  "course": "decouverte",
  "module": "m4",
  "order": 3,
  "minutes": 8,
  "outcomes": [
    "Écrire une règle de décision avec si, alors et sinon.",
    "Appliquer une condition, y compris dans les cas limites."
  ],
  "idea_fr": "Un programme choisit quoi faire grâce à des conditions : si une condition est vraie, il fait une chose ; sinon, il en fait une autre.",
  "analogy_fr": "Comme toi le matin : si le ciel est gris, alors tu prends ton parapluie, sinon tu le laisses.",
  "example": {
    "title_fr": "Rentrer du lycée",
    "steps_fr": [
      "Condition : il me reste au moins 300 F.",
      "Si c’est vrai, alors je prends un taxi-moto.",
      "Sinon, je rentre à pied.",
      "Avec 500 F, la condition est vraie : je prends le taxi-moto."
    ]
  },
  "reflect": {
    "question_fr": "Invente avec tes mots une règle « si… alors… sinon » que ton téléphone applique déjà, et donne un cas où la condition est vraie et un cas où elle est fausse.",
    "model_fr": "Si la batterie est en dessous de 20 %, alors le téléphone active l’économie d’énergie, sinon il reste normal. Avec 15 %, c’est vrai : il économise. Avec 60 %, c’est faux : rien ne change."
  },
  "recap_fr": [
    "Une condition est vraie ou fausse.",
    "Si… alors… sinon : deux chemins selon la condition.",
    "Vérifie les cas limites ; « et » exige les deux, « ou » une seule."
  ],
  "glossary": [
    {
      "term": "Condition",
      "definition": "Affirmation qui est soit vraie, soit fausse."
    },
    {
      "term": "Cas limite",
      "definition": "Valeur juste à la frontière d’une condition, comme 10 pour « au moins 10 »."
    },
    {
      "term": "Et, ou",
      "definition": "Mots qui combinent deux conditions : « et » exige les deux, « ou » une seule."
    }
  ],
  "tags": [
    "condition",
    "si alors sinon",
    "décision",
    "if",
    "logique"
  ],
  "status": "brouillon",
  "reviewer": null
}
---
Un programme ne fait pas toujours la même chose : il réagit à la situation. Pour cela, il utilise une condition, une affirmation qui est soit vraie, soit fausse. « La note est supérieure ou égale à 10 » est une condition : pour 12, elle est vraie ; pour 8, elle est fausse.

On l’écrit sous la forme : si condition, alors action, sinon autre action. Par exemple : si la note est supérieure ou égale à 10, alors afficher « Admis », sinon afficher « Ajourné ».

Fais attention aux cas limites, ces valeurs juste à la frontière. Avec « supérieure ou égale à 10 », un 10 est admis. Avec « supérieure à 10 », il ne l’est pas. Un seul mot change le résultat.

On peut combiner des conditions. Avec « et », les deux doivent être vraies : pour entrer au match, il faut un billet et avoir plus de 12 ans. Avec « ou », une seule suffit : on peut payer en espèces ou par mobile money.

Tu retrouveras exactement cette idée en Python, avec les mots if et else.
