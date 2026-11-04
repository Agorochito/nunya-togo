---
{
  "id": "dec-m4-02",
  "title_fr": "Découper un problème en étapes",
  "course": "decouverte",
  "module": "m4",
  "order": 2,
  "minutes": 8,
  "outcomes": [
    "Découper un problème en sous-problèmes simples.",
    "Ordonner ces sous-problèmes pour obtenir le résultat."
  ],
  "idea_fr": "Un grand problème devient facile quand on le découpe en petits problèmes, résolus l’un après l’autre.",
  "analogy_fr": "On ne mange pas un régime de bananes d’un coup : on le détache banane par banane.",
  "example": {
    "title_fr": "Calculer une moyenne avec coefficients",
    "steps_fr": [
      "Notes : maths 12 (coefficient 3), français 15 (coefficient 2), anglais 9 (coefficient 1).",
      "Multiplier chaque note par son coefficient : 36, 30 et 9.",
      "Additionner les points : 36 + 30 + 9 = 75 ; additionner les coefficients : 3 + 2 + 1 = 6.",
      "Diviser : 75 ÷ 6 = 12,5. La moyenne est 12,5."
    ]
  },
  "reflect": {
    "question_fr": "Choisis un projet de ta vie quotidienne, comme organiser une sortie de classe. Découpe-le avec tes mots en quatre ou cinq sous-problèmes, dans l’ordre.",
    "model_fr": "Pour la sortie : choisir le lieu et la date, calculer le coût par élève, demander l’accord des parents et du proviseur, collecter l’argent, réserver le transport."
  },
  "recap_fr": [
    "Décomposer : transformer un grand problème en sous-problèmes simples.",
    "Chaque sous-problème se résout et se vérifie seul.",
    "L’ordre des étapes compte."
  ],
  "glossary": [
    {
      "term": "Décomposition",
      "definition": "Méthode qui découpe un problème en sous-problèmes plus simples."
    },
    {
      "term": "Sous-problème",
      "definition": "Petite partie d’un problème, résolue séparément."
    },
    {
      "term": "Coefficient",
      "definition": "Nombre qui donne plus ou moins de poids à une note."
    }
  ],
  "tags": [
    "décomposition",
    "problème",
    "étapes",
    "moyenne",
    "coefficient",
    "logique"
  ],
  "status": "brouillon",
  "reviewer": null
}
---
Devant un problème qui paraît compliqué, les programmeurs ne cherchent pas tout d’un coup. Ils le découpent en sous-problèmes : des morceaux plus petits, chacun assez simple pour être résolu seul. Cette méthode s’appelle la décomposition.

Prends le calcul d’une moyenne avec coefficients. D’un bloc, cela semble long. Découpé, c’est simple : rassembler les notes et les coefficients, multiplier chaque note par son coefficient, additionner les points, additionner les coefficients, diviser le premier total par le second.

Pour découper, pose-toi deux questions. De quoi ai-je besoin au départ ? Quelles étapes transforment ce départ en résultat ? Puis vérifie l’ordre : on ne peut pas diviser avant d’avoir additionné.

Ce découpage a deux avantages. Chaque morceau se vérifie facilement : si la moyenne est fausse, tu sais où regarder. Et un même morceau peut resservir : « additionner une liste de nombres » sert dans beaucoup d’autres problèmes. En Python, ces morceaux deviendront des lignes de code, puis des fonctions.
