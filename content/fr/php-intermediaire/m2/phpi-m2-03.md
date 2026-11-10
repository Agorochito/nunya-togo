---
{
  "id": "phpi-m2-03",
  "title_fr": "Héritage, classes abstraites et interfaces",
  "course": "php-intermediaire",
  "module": "m2",
  "order": 6,
  "minutes": 20,
  "prerequisites": [
    "phpi-m2-02"
  ],
  "outcomes": [
    "Spécialiser une classe avec extends et parent::, et imposer des méthodes avec abstract.",
    "Définir un contrat avec une interface et traiter des objets différents de la même façon."
  ],
  "idea_fr": "L’héritage partage ce qui est commun ; l’interface promet ce que chaque objet sait faire, et le programme s’appuie seulement sur cette promesse.",
  "analogy_fr": "Au marché, chaque vendeur fixe son prix à sa façon — à l’unité, au tas, au lot — mais tous répondent à la même question : « c’est combien ? ».",
  "examples": [
    {
      "code": "<?php\ninterface Affichable\n{\n    public function libelle(): string;\n}\n\nabstract class Article implements Affichable\n{\n    public function __construct(public readonly string $nom)\n    {\n    }\n\n    abstract public function prix(): int;\n\n    public function libelle(): string\n    {\n        return $this->nom . \" : \" . $this->prix() . \" FCFA\";\n    }\n}\n\nclass ArticleSimple extends Article\n{\n    public function __construct(string $nom, private int $prixUnitaire)\n    {\n        parent::__construct($nom);\n    }\n\n    public function prix(): int\n    {\n        return $this->prixUnitaire;\n    }\n}\n\nclass Lot extends Article\n{\n    public function __construct(string $nom, private int $prixUnitaire, private int $quantite, private float $remise)\n    {\n        parent::__construct($nom);\n    }\n\n    public function prix(): int\n    {\n        return (int) round($this->prixUnitaire * $this->quantite * (1 - $this->remise));\n    }\n}\n\n$articles = [new ArticleSimple(\"Savon\", 250), new Lot(\"Lot de 6 cahiers\", 300, 6, 0.10)];\nforeach ($articles as $a) {\n    echo $a->libelle(), \"\\n\";\n}",
      "expected_output": "Savon : 250 FCFA\nLot de 6 cahiers : 1620 FCFA",
      "inputs": [],
      "trace_fr": [
        "Les deux objets partagent libelle, héritée d’Article.",
        "libelle appelle prix(), propre à chaque classe.",
        "Le lot applique 10 % de remise : 300 × 6 × 0,9."
      ]
    },
    {
      "code": "<?php\ninterface Affichable\n{\n    public function libelle(): string;\n}\n\nabstract class Article implements Affichable\n{\n    public function __construct(public readonly string $nom)\n    {\n    }\n\n    abstract public function prix(): int;\n\n    public function libelle(): string\n    {\n        return $this->nom . \" : \" . $this->prix() . \" FCFA\";\n    }\n}\n\nclass ArticleSimple extends Article\n{\n    public function __construct(string $nom, private int $prixUnitaire)\n    {\n        parent::__construct($nom);\n    }\n\n    public function prix(): int\n    {\n        return $this->prixUnitaire;\n    }\n}\n\nclass Lot extends Article\n{\n    public function __construct(string $nom, private int $prixUnitaire, private int $quantite, private float $remise)\n    {\n        parent::__construct($nom);\n    }\n\n    public function prix(): int\n    {\n        return (int) round($this->prixUnitaire * $this->quantite * (1 - $this->remise));\n    }\n}\n\nfunction afficher(Affichable $x): string\n{\n    return \"[\" . $x->libelle() . \"]\";\n}\n\n$lot = new Lot(\"Pack savon\", 250, 4, 0.0);\necho afficher($lot), \"\\n\";\nvar_dump($lot instanceof Article, $lot instanceof ArticleSimple);",
      "expected_output": "[Pack savon : 1000 FCFA]\nbool(true)\nbool(false)",
      "inputs": [],
      "trace_fr": [
        "afficher accepte tout objet Affichable.",
        "Un Lot est un Article.",
        "Mais ce n’est pas un ArticleSimple."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Oublier parent::__construct",
      "why_fr": "Les propriétés de la classe mère restent vides.",
      "fix_fr": "Appelle le constructeur parent dans la fille."
    },
    {
      "error": "Instancier une classe abstraite",
      "why_fr": "PHP refuse : elle sert de base.",
      "fix_fr": "Crée une classe fille concrète."
    },
    {
      "error": "Hériter pour une relation « a un »",
      "why_fr": "Les classes deviennent rigides.",
      "fix_fr": "Utilise une propriété qui contient l’objet."
    }
  ],
  "quiz": [
    {
      "question": "Combien de classes une classe peut-elle étendre ?",
      "options": [
        "Une",
        "Deux",
        "Autant qu’elle veut",
        "Aucune"
      ],
      "answer": 0,
      "explanation": "PHP n’autorise qu’un seul parent, mais plusieurs interfaces.",
      "id": "phpi-m2-03-q1"
    },
    {
      "question": "Que contient une interface ?",
      "options": [
        "Des propriétés",
        "Des signatures de méthodes",
        "Du code complet",
        "Des objets"
      ],
      "answer": 1,
      "explanation": "C’est un contrat, sans implémentation.",
      "id": "phpi-m2-03-q2"
    },
    {
      "question": "Qu’est-ce que le polymorphisme ?",
      "options": [
        "Copier une classe",
        "Un même appel qui produit le comportement adapté à chaque objet",
        "Supprimer une méthode",
        "Un type de boucle"
      ],
      "answer": 1,
      "explanation": "$a->prix() dépend de la classe réelle de $a.",
      "id": "phpi-m2-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "héritage",
      "definition": "Mécanisme par lequel une classe reçoit les membres d’une autre."
    },
    {
      "term": "classe abstraite",
      "definition": "Classe de base non instanciable, qui peut imposer des méthodes."
    },
    {
      "term": "interface",
      "definition": "Contrat de méthodes qu’une classe s’engage à fournir."
    },
    {
      "term": "polymorphisme",
      "definition": "Même appel, comportement propre à chaque objet."
    }
  ],
  "recap_fr": [
    "Spécialiser une classe avec extends et parent::, et imposer des méthodes avec abstract.",
    "Définir un contrat avec une interface et traiter des objets différents de la même façon.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "héritage",
    "classe abstraite",
    "interface",
    "polymorphisme"
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
      "title": "Héritage",
      "url": "https://www.php.net/manual/fr/language.oop5.inheritance.php"
    },
    {
      "title": "Classes abstraites",
      "url": "https://www.php.net/manual/fr/language.oop5.abstract.php"
    },
    {
      "title": "Interfaces",
      "url": "https://www.php.net/manual/fr/language.oop5.interfaces.php"
    }
  ],
  "sources": [
    {
      "title": "Héritage",
      "url": "https://www.php.net/manual/fr/language.oop5.inheritance.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Classes abstraites",
      "url": "https://www.php.net/manual/fr/language.oop5.abstract.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Interfaces",
      "url": "https://www.php.net/manual/fr/language.oop5.interfaces.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Une boutique vend des articles à l’unité et des lots avec remise. Les deux ont un nom et une étiquette, mais leur prix se calcule différemment. Copier la même classe deux fois en changeant une méthode dupliquerait le code commun. L’héritage évite cette répétition.

class Lot extends Article déclare que Lot hérite d’Article : il reçoit ses propriétés et ses méthodes, et peut en ajouter ou en redéfinir. Dans le constructeur de la classe fille, parent::__construct($nom) appelle le constructeur de la classe mère pour initialiser la partie commune. Une méthode redéfinie dans la fille remplace celle de la mère pour les objets de la fille.

Une classe abstraite, déclarée abstract class, sert de base sans pouvoir être instanciée : new Article(…) est refusé. Elle peut déclarer des méthodes abstraites, sans corps : abstract public function prix(): int;. Chaque classe fille concrète doit alors les écrire, sinon PHP refuse la classe. C’est un moyen de garantir que chaque type d’article saura calculer son prix.

Le grand intérêt apparaît dans les méthodes communes. La méthode libelle d’Article appelle $this->prix() sans savoir de quel article il s’agit. Pour un article simple, c’est le prix unitaire ; pour un lot, le prix remisé. On appelle cela le polymorphisme : un même appel produit le comportement adapté à chaque objet.

Une interface va plus loin dans la séparation. Elle ne contient que des signatures de méthodes, sans code ni propriété : interface Affichable { public function libelle(): string; }. Une classe déclare qu’elle respecte ce contrat avec implements Affichable, et doit fournir toutes les méthodes promises. Une classe ne peut hériter que d’une seule classe, mais peut implémenter plusieurs interfaces. Une fonction typée function afficher(Affichable $x) accepte alors n’importe quel objet qui respecte le contrat, quelle que soit sa classe.

L’opérateur instanceof teste si un objet appartient à une classe ou respecte une interface : $a instanceof Lot. Utilise-le avec modération : si ton code teste sans cesse le type exact des objets, c’est souvent qu’une méthode polymorphe manque.

Garde l’héritage pour une vraie relation « est un » : un lot est un article. Pour une relation « a un », comme un panier qui contient des articles, on préfère une propriété qui contient d’autres objets. Un héritage forcé rend les classes rigides et difficiles à modifier.

## Exemple guidé 1

```php
<?php
interface Affichable
{
    public function libelle(): string;
}

abstract class Article implements Affichable
{
    public function __construct(public readonly string $nom)
    {
    }

    abstract public function prix(): int;

    public function libelle(): string
    {
        return $this->nom . " : " . $this->prix() . " FCFA";
    }
}

class ArticleSimple extends Article
{
    public function __construct(string $nom, private int $prixUnitaire)
    {
        parent::__construct($nom);
    }

    public function prix(): int
    {
        return $this->prixUnitaire;
    }
}

class Lot extends Article
{
    public function __construct(string $nom, private int $prixUnitaire, private int $quantite, private float $remise)
    {
        parent::__construct($nom);
    }

    public function prix(): int
    {
        return (int) round($this->prixUnitaire * $this->quantite * (1 - $this->remise));
    }
}

$articles = [new ArticleSimple("Savon", 250), new Lot("Lot de 6 cahiers", 300, 6, 0.10)];
foreach ($articles as $a) {
    echo $a->libelle(), "\n";
}
```

Affichage attendu :

    Savon : 250 FCFA
    Lot de 6 cahiers : 1620 FCFA

Trace :

- Les deux objets partagent libelle, héritée d’Article.
- libelle appelle prix(), propre à chaque classe.
- Le lot applique 10 % de remise : 300 × 6 × 0,9.

## Exemple guidé 2

```php
<?php
interface Affichable
{
    public function libelle(): string;
}

abstract class Article implements Affichable
{
    public function __construct(public readonly string $nom)
    {
    }

    abstract public function prix(): int;

    public function libelle(): string
    {
        return $this->nom . " : " . $this->prix() . " FCFA";
    }
}

class ArticleSimple extends Article
{
    public function __construct(string $nom, private int $prixUnitaire)
    {
        parent::__construct($nom);
    }

    public function prix(): int
    {
        return $this->prixUnitaire;
    }
}

class Lot extends Article
{
    public function __construct(string $nom, private int $prixUnitaire, private int $quantite, private float $remise)
    {
        parent::__construct($nom);
    }

    public function prix(): int
    {
        return (int) round($this->prixUnitaire * $this->quantite * (1 - $this->remise));
    }
}

function afficher(Affichable $x): string
{
    return "[" . $x->libelle() . "]";
}

$lot = new Lot("Pack savon", 250, 4, 0.0);
echo afficher($lot), "\n";
var_dump($lot instanceof Article, $lot instanceof ArticleSimple);
```

Affichage attendu :

    [Pack savon : 1000 FCFA]
    bool(true)
    bool(false)

Trace :

- afficher accepte tout objet Affichable.
- Un Lot est un Article.
- Mais ce n’est pas un ArticleSimple.

## Vérifier et expliquer

Ajoute une troisième classe d’article, par exemple un article en promotion, et vérifie que la boucle d’affichage fonctionne sans modification.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Héritage](https://www.php.net/manual/fr/language.oop5.inheritance.php)
- [Classes abstraites](https://www.php.net/manual/fr/language.oop5.abstract.php)
- [Interfaces](https://www.php.net/manual/fr/language.oop5.interfaces.php)
