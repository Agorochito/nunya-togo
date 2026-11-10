---
{
  "id": "phpi-m2-01",
  "title_fr": "Classes et objets en PHP",
  "course": "php-intermediaire",
  "module": "m2",
  "order": 4,
  "minutes": 20,
  "prerequisites": [
    "phpi-m1-03"
  ],
  "outcomes": [
    "Définir une classe avec des propriétés typées, un constructeur promu et des méthodes.",
    "Créer des objets avec new, appeler leurs méthodes et comprendre qu’un objet est partagé, pas copié."
  ],
  "idea_fr": "Une classe décrit un type d’objet ; chaque objet créé avec new porte ses propres valeurs et sait faire ce que la classe prévoit.",
  "analogy_fr": "Le plan d’une case est unique, mais chaque case construite à partir de ce plan a ses propres habitants et sa propre couleur de porte.",
  "examples": [
    {
      "code": "<?php\nclass Produit\n{\n    public function __construct(public string $nom, public int $prix, public int $stock)\n    {\n    }\n\n    public function valeurStock(): int\n    {\n        return $this->prix * $this->stock;\n    }\n}\n\n$riz = new Produit(\"Riz\", 600, 40);\n$huile = new Produit(nom: \"Huile\", prix: 1200, stock: 12);\necho $riz->nom, \" : \", $riz->valeurStock(), \"\\n\";\necho $huile->nom, \" : \", $huile->valeurStock(), \"\\n\";",
      "expected_output": "Riz : 24000\nHuile : 14400",
      "inputs": [],
      "trace_fr": [
        "Le constructeur promu déclare et remplit les trois propriétés.",
        "valeurStock utilise $this pour lire les propriétés de l’objet.",
        "Chaque objet garde ses propres valeurs."
      ]
    },
    {
      "code": "<?php\nclass Compteur\n{\n    public function __construct(public int $valeur = 0)\n    {\n    }\n}\n\n$a = new Compteur();\n$b = $a;\n$b->valeur = 5;\n$c = clone $a;\n$c->valeur = 9;\necho $a->valeur, \" \", $b->valeur, \" \", $c->valeur, \"\\n\";",
      "expected_output": "5 5 9",
      "inputs": [],
      "trace_fr": [
        "$b désigne le même objet que $a.",
        "Modifier $b modifie donc $a.",
        "clone crée une copie indépendante."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier $this->",
      "why_fr": "La variable locale $prix n’existe pas dans la méthode.",
      "fix_fr": "Écris $this->prix."
    },
    {
      "error": "Croire qu’une affectation copie l’objet",
      "why_fr": "Les deux variables désignent le même objet.",
      "fix_fr": "Utilise clone pour une copie."
    },
    {
      "error": "Modifier la fonction verifier fournie",
      "why_fr": "Le contrat avec le correcteur est rompu.",
      "fix_fr": "Écris seulement la classe demandée."
    }
  ],
  "quiz": [
    {
      "question": "Que désigne $this dans une méthode ?",
      "options": [
        "La classe",
        "L’objet sur lequel la méthode est appelée",
        "Le constructeur",
        "Une variable globale"
      ],
      "answer": 1,
      "explanation": "$this est l’objet courant.",
      "id": "phpi-m2-01-q1"
    },
    {
      "question": "Que fait public function __construct(public int $prix) {} ?",
      "options": [
        "Rien",
        "Déclare la propriété $prix et la remplit",
        "Crée une méthode prix",
        "Lève une erreur"
      ],
      "answer": 1,
      "explanation": "C’est la promotion de constructeur.",
      "id": "phpi-m2-01-q2"
    },
    {
      "question": "Après $b = $a; $b->x = 3;, que vaut $a->x ?",
      "options": [
        "L’ancienne valeur",
        "3",
        "null",
        "Une erreur"
      ],
      "answer": 1,
      "explanation": "Les deux variables désignent le même objet.",
      "id": "phpi-m2-01-q3"
    }
  ],
  "glossary": [
    {
      "term": "classe",
      "definition": "Modèle qui décrit les propriétés et méthodes d’un type d’objet."
    },
    {
      "term": "promotion de constructeur",
      "definition": "Déclaration des propriétés directement dans les paramètres du constructeur."
    },
    {
      "term": "$this",
      "definition": "Objet courant à l’intérieur d’une méthode."
    },
    {
      "term": "clone",
      "definition": "Mot-clé qui crée une copie indépendante d’un objet."
    }
  ],
  "recap_fr": [
    "Définir une classe avec des propriétés typées, un constructeur promu et des méthodes.",
    "Créer des objets avec new, appeler leurs méthodes et comprendre qu’un objet est partagé, pas copié.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "classe",
    "promotion de constructeur",
    "$this",
    "clone"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "php",
  "runtime": "php",
  "level": "intermediaire",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "PHP 8.3 réel, exécuté sur cet appareil dans un Worker isolé, comme en ligne de commande. Chaque saisie se lit avec trim(fgets(STDIN)). Pas de serveur web, de réseau ni de fichiers conservés : les données JSON sont écrites dans le programme. Les données sont fictives.",
  "references": [
    {
      "title": "Les bases des classes et objets",
      "url": "https://www.php.net/manual/fr/language.oop5.basic.php"
    },
    {
      "title": "Constructeurs et promotion",
      "url": "https://www.php.net/manual/fr/language.oop5.decon.php"
    }
  ],
  "sources": [
    {
      "title": "Les bases des classes et objets",
      "url": "https://www.php.net/manual/fr/language.oop5.basic.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Constructeurs et promotion",
      "url": "https://www.php.net/manual/fr/language.oop5.decon.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Les tableaux associatifs ont bien servi au niveau débutant, mais ils ont des limites : rien n’empêche d’écrire "prx" au lieu de "prix", et les calculs liés à un produit sont dispersés dans le programme. Une classe regroupe les données et les comportements d’un même concept, et PHP vérifie les noms et les types.

Une classe se déclare avec class Produit { … }. À l’intérieur, les propriétés sont les données de chaque objet, avec leur type : public string $nom;. Les méthodes sont des fonctions attachées à l’objet ; elles accèdent à ses propriétés avec $this : return $this->prix * $this->stock;. La flèche -> désigne une propriété ou une méthode d’un objet.

Le constructeur, __construct, prépare un nouvel objet. Depuis PHP 8, la promotion de constructeur évite de tout écrire deux fois : public function __construct(public string $nom, public int $prix, public int $stock) {} déclare les trois propriétés et les remplit d’un coup. Le corps du constructeur peut rester vide ou contenir des vérifications.

On crée un objet avec new : $riz = new Produit("Riz", 600, 40);. On lit ses propriétés avec $riz->nom et on appelle ses méthodes avec $riz->valeurStock(). Les arguments nommés fonctionnent aussi avec new, ce qui rend la création lisible : new Produit(nom: "Riz", prix: 600, stock: 40).

Un point surprend souvent. Quand on passe un objet à une fonction ou qu’on l’affecte à une autre variable, PHP ne le copie pas : les deux variables désignent le même objet. Modifier $b->stock modifie donc aussi $a->stock si $b = $a. C’est différent des tableaux, qui sont copiés. Pour obtenir une vraie copie, on écrit clone $a.

Dans les exercices, une fonction verifier est fournie : elle crée un objet à partir de ta classe et renvoie quelques résultats, que le correcteur compare. Tu n’as qu’à écrire la classe demandée, sans modifier verifier. C’est une situation réaliste : en équipe, d’autres parties du programme utilisent ta classe selon un contrat précis, ses noms de propriétés et de méthodes.

Enfin, une convention : un nom de classe commence par une majuscule, en un seul mot, comme Produit ou CompteEpargne ; les méthodes et propriétés commencent par une minuscule, comme valeurStock. Une classe par concept, avec des méthodes courtes qui portent le nom de ce qu’elles calculent.

## Exemple guidé 1

```php
<?php
class Produit
{
    public function __construct(public string $nom, public int $prix, public int $stock)
    {
    }

    public function valeurStock(): int
    {
        return $this->prix * $this->stock;
    }
}

$riz = new Produit("Riz", 600, 40);
$huile = new Produit(nom: "Huile", prix: 1200, stock: 12);
echo $riz->nom, " : ", $riz->valeurStock(), "\n";
echo $huile->nom, " : ", $huile->valeurStock(), "\n";
```

Affichage attendu :

    Riz : 24000
    Huile : 14400

Trace :

- Le constructeur promu déclare et remplit les trois propriétés.
- valeurStock utilise $this pour lire les propriétés de l’objet.
- Chaque objet garde ses propres valeurs.

## Exemple guidé 2

```php
<?php
class Compteur
{
    public function __construct(public int $valeur = 0)
    {
    }
}

$a = new Compteur();
$b = $a;
$b->valeur = 5;
$c = clone $a;
$c->valeur = 9;
echo $a->valeur, " ", $b->valeur, " ", $c->valeur, "\n";
```

Affichage attendu :

    5 5 9

Trace :

- $b désigne le même objet que $a.
- Modifier $b modifie donc $a.
- clone crée une copie indépendante.

## Vérifier et expliquer

Crée deux objets, affecte l’un à une autre variable, modifie-la, et explique le résultat avant de le lancer.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Les bases des classes et objets](https://www.php.net/manual/fr/language.oop5.basic.php)
- [Constructeurs et promotion](https://www.php.net/manual/fr/language.oop5.decon.php)
