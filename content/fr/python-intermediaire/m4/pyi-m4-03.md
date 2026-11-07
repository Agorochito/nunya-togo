---
{
  "id": "pyi-m4-03",
  "course": "python-intermediaire",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "language": "python",
  "runtime": "python",
  "level": "intermediaire",
  "title_fr": "Composer un petit catalogue d’objets",
  "prerequisites": [
    "pyi-m4-02"
  ],
  "outcomes": [
    "Composer un catalogue avec des instances d’Article et des identifiants stables.",
    "Assembler validations, méthodes et rapport sans exposer les objets au correcteur."
  ],
  "idea_fr": "Un objet peut organiser d’autres objets et déléguer à chacun les règles qui lui appartiennent.",
  "analogy_fr": "Le registre retrouve le matériel par son numéro ; la fiche du matériel garde son nom et sa quantité disponible.",
  "examples": [
    {
      "inputs": [],
      "expected_output": "A1 Badge\nB2 Badge bleu\n",
      "trace_fr": [
        "Le catalogue conserve deux objets sous les clés distinctes B2 et A1 malgré leurs noms identiques.",
        "chercher(\"B2\") retourne l’objet existant ; changer son nom ne change pas sa clé.",
        "sorted produit A1 puis B2, indépendamment de l’ordre d’insertion ; le nom modifié reste associé à B2."
      ]
    },
    {
      "inputs": [],
      "expected_output": "identifiant déjà présent\nAffiche\narticle absent\n",
      "trace_fr": [
        "Le premier ajout associe A1 à l’article « Affiche ».",
        "Le doublon est détecté avant toute affectation : le gestionnaire reçoit ValueError et le premier nom reste « Affiche ».",
        "Z9 est absent ; chercher lève KeyError, que l’appelant traduit ici en message lisible."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Prendre le nom pour une identité unique",
      "why_fr": "Un changement de nom ou deux noms identiques rendent les recherches incohérentes.",
      "fix_fr": "Garde une clé stable et indépendante du nom affiché."
    },
    {
      "error": "Remplacer puis signaler le doublon",
      "why_fr": "L’exception arrive après la perte de la première fiche.",
      "fix_fr": "Refuse l’identifiant déjà présent avant toute affectation au dictionnaire."
    },
    {
      "error": "Renvoyer les instances au correcteur",
      "why_fr": "Le résultat attendu est un bilan simple et déterministe, pas la représentation d’objets internes.",
      "fix_fr": "Reconstruis des dictionnaires avec leurs attributs et trie par identifiant."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi utiliser un identifiant plutôt que le nom comme clé ?",
      "options": [
        "Parce qu’un nom ne peut jamais changer",
        "Pour trier les quantités automatiquement",
        "Parce que deux noms peuvent être égaux et qu’un nom affiché peut évoluer"
      ],
      "answer": 2,
      "explanation": "L’identifiant porte l’identité stable ; le nom est une donnée de présentation qui peut être partagée ou modifiée.",
      "id": "pyi-m4-03-q1"
    },
    {
      "question": "Que signifie ici composer Catalogue avec Article ?",
      "options": [
        "Le catalogue contient et utilise des instances d’Article",
        "Article doit hériter de Catalogue",
        "Chaque recherche doit recopier toutes les fiches"
      ],
      "answer": 0,
      "explanation": "La composition décrit une relation de contenu et de délégation, sans imposer une relation d’héritage.",
      "id": "pyi-m4-03-q2"
    },
    {
      "question": "Après un ajout en doublon refusé, quelle fiche doit rester ?",
      "options": [
        "La seconde avec un message d’avertissement",
        "La première, entièrement inchangée",
        "Aucune des deux"
      ],
      "answer": 1,
      "explanation": "La méthode vérifie le doublon avant l’affectation : le refus ne remplace pas l’objet déjà enregistré.",
      "id": "pyi-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "composition",
      "definition": "Organisation dans laquelle un objet contient et utilise d’autres objets."
    },
    {
      "term": "identifiant stable",
      "definition": "Clé conservée pour suivre le même élément malgré une évolution de sa présentation."
    },
    {
      "term": "délégation",
      "definition": "Action de confier une opération à l’objet qui porte les données et les règles correspondantes."
    },
    {
      "term": "KeyError",
      "definition": "Exception adaptée ici à la recherche d’un identifiant absent du catalogue."
    }
  ],
  "recap_fr": [
    "Le catalogue organise des articles et délègue leurs opérations.",
    "Une clé stable n’est pas remplacée par un nom affiché.",
    "Le bilan expose des données triées et les refus laissent les objets cohérents."
  ],
  "tags": [
    "composition",
    "catalogue",
    "identifiants",
    "projet",
    "KeyError"
  ],
  "sources": [
    {
      "title": "Python — Classes",
      "url": "https://docs.python.org/fr/3/tutorial/classes.html",
      "scope": "Instances, attributs, méthodes et données mutables propres à chaque instance.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Erreurs et exceptions",
      "url": "https://docs.python.org/fr/3/tutorial/errors.html",
      "scope": "try/except ciblé, propagation et levée explicite des exceptions.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Exceptions natives",
      "url": "https://docs.python.org/fr/3/library/exceptions.html",
      "scope": "Différence entre TypeError, ValueError et KeyError.",
      "last_checked": "2026-11-06"
    },
    {
      "title": "Python — Fonctions natives",
      "url": "https://docs.python.org/fr/3/library/functions.html",
      "scope": "int, type, isinstance et lien entre bool et int.",
      "last_checked": "2026-11-06"
    }
  ],
  "environment_fr": "Python exécuté localement dans le navigateur. Données fictives en mémoire ; aucun réseau, fichier durable ou package tiers.",
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null
}
---

## Explication pas à pas

Un petit programme peut utiliser plusieurs classes sans créer une hiérarchie compliquée. Nous allons composer un Catalogue avec des objets Article. Un article connaît son identifiant, son nom et éventuellement son stock. Le catalogue conserve un dictionnaire dont les clés sont les identifiants et les valeurs sont les instances. Cette relation signifie « contient des articles » ; elle ne nécessite aucun héritage. Chaque objet garde un rôle limité et compréhensible.

L’identifiant sert à retrouver le même article au fil des opérations. Il reste stable lorsque le nom affiché change. Deux articles peuvent partager un nom, par exemple deux modèles appelés « Badge », sans devenir le même article. À l’inverse, ajouter une seconde fiche avec le même identifiant doit être refusé. Notre méthode ajouter vérifie d’abord la présence de la clé, puis insère l’objet seulement si elle est absente. Un refus ne remplace donc jamais la première fiche.

La recherche d’une clé absente est une situation différente d’une quantité interdite. Nous utilisons KeyError pour un identifiant introuvable et ValueError pour un doublon ou un stock insuffisant. Un message explicite accompagne chaque exception. Le catalogue retrouve l’article, puis lui délègue le retrait ; l’article valide la quantité et protège son propre stock. Cette répartition évite de recopier les règles de retrait à chaque endroit où le catalogue est utilisé.

La composition crée aussi des références. Retrouver un article dans le dictionnaire ne fabrique pas une copie de sa fiche. Modifier son nom par une méthode agit donc sur l’objet détenu par le catalogue. Cela convient à notre projet, car cet objet représente précisément l’article suivi. En revanche, nous ne stockons pas directement les dictionnaires reçus comme fiches d’entrée : nous construisons les instances avec leurs valeurs. Les arguments de la fonction de contrat restent ainsi intacts.

Pour rendre le résultat lisible et déterministe, le bilan parcourt les identifiants avec sorted. L’ordre de création n’influence pas l’ordre final d’affichage. La fonction de contrat reconstruit ensuite des dictionnaires simples contenant les attributs utiles. Les instances restent à l’intérieur du programme ; elles ne sont ni imprimées telles quelles ni renvoyées au correcteur. Les identifiants des activités sont des chaînes et sont comparés exactement, sans changement de casse implicite.

Le projet final prépare le catalogue puis traite une liste de demandes fictives. Une fiche initiale invalide arrête la préparation : on ne dispose pas encore d’un catalogue cohérent. Une demande invalide est au contraire ajoutée au rapport, et les suivantes sont traitées. Chaque refus garde l’état antérieur de l’article concerné. Le lot vide, les noms répétés, le retrait exact du stock, une clé absente et une demande nulle rendent les règles observables. Tout reste en mémoire ; ce projet n’effectue aucun achat, aucune réservation et aucun enregistrement permanent.

## Exemple guidé 1

```python
class Article:

    def __init__(self, identifiant, nom):
        self.identifiant = identifiant
        self.nom = nom


class Catalogue:

    def __init__(self):
        self.articles = {}

    def ajouter(self, article):
        if article.identifiant in self.articles:
            raise ValueError("identifiant déjà présent")
        self.articles[article.identifiant] = article

    def chercher(self, identifiant):
        if identifiant not in self.articles:
            raise KeyError("identifiant absent")
        return self.articles[identifiant]
catalogue = Catalogue()
catalogue.ajouter(Article("B2", "Badge"))
catalogue.ajouter(Article("A1", "Badge"))
catalogue.chercher("B2").nom = "Badge bleu"
for identifiant in sorted(catalogue.articles):
    article = catalogue.chercher(identifiant)
    print(article.identifiant, article.nom)
```

## Exemple guidé 2

```python
class Article:

    def __init__(self, identifiant, nom):
        self.identifiant = identifiant
        self.nom = nom


class Catalogue:

    def __init__(self):
        self.articles = {}

    def ajouter(self, article):
        if article.identifiant in self.articles:
            raise ValueError("identifiant déjà présent")
        self.articles[article.identifiant] = article

    def chercher(self, identifiant):
        if identifiant not in self.articles:
            raise KeyError("identifiant absent")
        return self.articles[identifiant]
catalogue = Catalogue()
catalogue.ajouter(Article("A1", "Affiche"))
try:
    catalogue.ajouter(Article("A1", "Remplacement"))
except ValueError as erreur:
    print(str(erreur))
print(catalogue.chercher("A1").nom)
try:
    catalogue.chercher("Z9")
except KeyError:
    print("article absent")
```
