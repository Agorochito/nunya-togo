---
{
  "id": "phpi-m2-02",
  "title_fr": "Encapsulation : private, readonly et validation",
  "course": "php-intermediaire",
  "module": "m2",
  "order": 5,
  "minutes": 20,
  "prerequisites": [
    "phpi-m2-01"
  ],
  "outcomes": [
    "Protéger l’état d’un objet avec private et readonly, et l’exposer par des méthodes.",
    "Refuser une valeur invalide avec une exception, et utiliser constantes de classe et méthodes statiques."
  ],
  "idea_fr": "Un objet bien conçu protège ses données : on ne peut le modifier qu’en passant par des méthodes qui vérifient les règles.",
  "analogy_fr": "À la caisse populaire, on ne se sert pas dans le coffre : on demande au guichet, qui vérifie le solde avant chaque retrait.",
  "examples": [
    {
      "code": "<?php\nclass Compte\n{\n    public const DECOUVERT_MAX = 0;\n\n    private int $solde = 0;\n\n    public function __construct(public readonly string $titulaire)\n    {\n    }\n\n    public function solde(): int\n    {\n        return $this->solde;\n    }\n\n    public function deposer(int $montant): void\n    {\n        if ($montant <= 0) {\n            throw new InvalidArgumentException(\"Montant invalide\");\n        }\n        $this->solde += $montant;\n    }\n\n    public function retirer(int $montant): bool\n    {\n        if ($montant <= 0 || $this->solde - $montant < self::DECOUVERT_MAX) {\n            return false;\n        }\n        $this->solde -= $montant;\n        return true;\n    }\n}\n\n$c = new Compte(\"Afi\");\n$c->deposer(5000);\nvar_dump($c->retirer(8000));\nvar_dump($c->retirer(2000));\necho $c->solde(), \"\\n\";\ntry {\n    $c->deposer(-100);\n} catch (InvalidArgumentException $e) {\n    echo \"Refusé : \", $e->getMessage(), \"\\n\";\n}",
      "expected_output": "bool(false)\nbool(true)\n3000\nRefusé : Montant invalide",
      "inputs": [],
      "trace_fr": [
        "Le dépôt de 5000 passe par la méthode.",
        "Le retrait de 8000 dépasse le solde : refusé.",
        "Le dépôt négatif lève une exception, sans toucher au solde."
      ]
    },
    {
      "code": "<?php\nclass Compte\n{\n    public const DECOUVERT_MAX = 0;\n\n    private int $solde = 0;\n\n    public function __construct(public readonly string $titulaire)\n    {\n    }\n\n    public function solde(): int\n    {\n        return $this->solde;\n    }\n\n    public function deposer(int $montant): void\n    {\n        if ($montant <= 0) {\n            throw new InvalidArgumentException(\"Montant invalide\");\n        }\n        $this->solde += $montant;\n    }\n\n    public function retirer(int $montant): bool\n    {\n        if ($montant <= 0 || $this->solde - $montant < self::DECOUVERT_MAX) {\n            return false;\n        }\n        $this->solde -= $montant;\n        return true;\n    }\n}\n\n$c = new Compte(\"Kossi\");\necho $c->titulaire, \"\\n\";\ntry {\n    $c->titulaire = \"Yao\";\n} catch (Error $e) {\n    echo \"Modification refusée\\n\";\n}\necho Compte::DECOUVERT_MAX, \"\\n\";",
      "expected_output": "Kossi\nModification refusée\n0",
      "inputs": [],
      "trace_fr": [
        "La propriété readonly se lit librement.",
        "L’écrire une seconde fois provoque une erreur.",
        "La constante se lit avec le nom de la classe."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Laisser les propriétés publiques",
      "why_fr": "N’importe quel code peut mettre une valeur absurde.",
      "fix_fr": "Rends-les private et passe par des méthodes."
    },
    {
      "error": "Modifier avant de vérifier",
      "why_fr": "L’objet change même quand la demande est refusée.",
      "fix_fr": "Vérifie d’abord, modifie ensuite."
    },
    {
      "error": "Écrire une valeur magique répétée",
      "why_fr": "Un changement de règle oublie un endroit.",
      "fix_fr": "Utilise une constante de classe."
    }
  ],
  "quiz": [
    {
      "question": "Qui peut modifier une propriété private ?",
      "options": [
        "Tout le programme",
        "Les méthodes de la classe",
        "Personne",
        "Les fonctions globales"
      ],
      "answer": 1,
      "explanation": "private limite l’accès à la classe.",
      "id": "phpi-m2-02-q1"
    },
    {
      "question": "Quand peut-on écrire une propriété readonly ?",
      "options": [
        "Toujours",
        "Une seule fois, à l’initialisation",
        "Jamais",
        "Seulement depuis l’extérieur"
      ],
      "answer": 1,
      "explanation": "Elle devient ensuite non modifiable.",
      "id": "phpi-m2-02-q2"
    },
    {
      "question": "Comment lire une constante de classe depuis l’extérieur ?",
      "options": [
        "$c->CONSTANTE",
        "Compte::CONSTANTE",
        "Compte->CONSTANTE",
        "self::CONSTANTE"
      ],
      "answer": 1,
      "explanation": "Avec le nom de la classe et ::.",
      "id": "phpi-m2-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "encapsulation",
      "definition": "Protection de l’état d’un objet derrière ses méthodes."
    },
    {
      "term": "private",
      "definition": "Visibilité limitée à la classe elle-même."
    },
    {
      "term": "readonly",
      "definition": "Propriété écrite une seule fois puis non modifiable."
    },
    {
      "term": "méthode statique",
      "definition": "Méthode de la classe, appelée sans objet avec ::."
    }
  ],
  "recap_fr": [
    "Protéger l’état d’un objet avec private et readonly, et l’exposer par des méthodes.",
    "Refuser une valeur invalide avec une exception, et utiliser constantes de classe et méthodes statiques.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "encapsulation",
    "private",
    "readonly",
    "méthode statique"
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
      "title": "Visibilité",
      "url": "https://www.php.net/manual/fr/language.oop5.visibility.php"
    },
    {
      "title": "Propriétés et readonly",
      "url": "https://www.php.net/manual/fr/language.oop5.properties.php"
    },
    {
      "title": "Constantes de classe",
      "url": "https://www.php.net/manual/fr/language.oop5.constants.php"
    },
    {
      "title": "Le mot-clé static",
      "url": "https://www.php.net/manual/fr/language.oop5.static.php"
    }
  ],
  "sources": [
    {
      "title": "Visibilité",
      "url": "https://www.php.net/manual/fr/language.oop5.visibility.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Propriétés et readonly",
      "url": "https://www.php.net/manual/fr/language.oop5.properties.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Constantes de classe",
      "url": "https://www.php.net/manual/fr/language.oop5.constants.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Le mot-clé static",
      "url": "https://www.php.net/manual/fr/language.oop5.static.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Avec des propriétés publiques, n’importe quelle partie du programme peut écrire $compte->solde = -50000. Rien n’empêche une valeur absurde. L’encapsulation corrige cela : on rend les propriétés private, accessibles seulement depuis l’intérieur de la classe, et on expose des méthodes qui vérifient chaque changement.

private int $solde = 0; ne peut être lu ou modifié que par les méthodes de la classe. Depuis l’extérieur, $compte->solde provoque une erreur Cannot access private property. Pour permettre la lecture, on ajoute une méthode, souvent appelée comme la donnée : solde(): int. Pour les modifications, on préfère des méthodes qui ont un sens métier, comme deposer et retirer, plutôt qu’un simple setSolde.

Chaque méthode vérifie sa demande avant d’agir. Une valeur absurde, comme un dépôt négatif, est une erreur de l’appelant : on lève une exception, throw new InvalidArgumentException("Montant invalide"), et l’état de l’objet reste intact. Un refus prévu par les règles, comme un retrait supérieur au solde, peut simplement renvoyer false, que l’appelant teste. Le module suivant approfondira les exceptions.

Le mot readonly, apparu en PHP 8.1, crée une propriété qu’on ne peut écrire qu’une seule fois, dans le constructeur. public readonly string $titulaire se lit librement mais ne se modifie plus : toute tentative provoque une erreur. C’est idéal pour les identifiants, les dates de création ou le nom du titulaire.

Une constante de classe, déclarée avec const, donne un nom à une valeur fixe liée au concept : public const DECOUVERT_MAX = 0;. On la lit avec self::DECOUVERT_MAX à l’intérieur de la classe et Compte::DECOUVERT_MAX à l’extérieur. Le jour où la règle change, une seule ligne est modifiée.

Une méthode statique, déclarée static, appartient à la classe et non à un objet ; on l’appelle avec Compte::ouvrir(…). Un usage fréquent est la fabrique : une méthode statique qui crée un objet à partir d’un tableau, en vérifiant les données. Elle renvoie new static(…) ou new self(…).

L’encapsulation n’est pas une formalité. Elle garantit qu’un objet est toujours dans un état valide, quelle que soit la partie du programme qui l’utilise. Quand une règle change, on la modifie à un seul endroit, dans la classe, et tout le programme en profite.

## Exemple guidé 1

```php
<?php
class Compte
{
    public const DECOUVERT_MAX = 0;

    private int $solde = 0;

    public function __construct(public readonly string $titulaire)
    {
    }

    public function solde(): int
    {
        return $this->solde;
    }

    public function deposer(int $montant): void
    {
        if ($montant <= 0) {
            throw new InvalidArgumentException("Montant invalide");
        }
        $this->solde += $montant;
    }

    public function retirer(int $montant): bool
    {
        if ($montant <= 0 || $this->solde - $montant < self::DECOUVERT_MAX) {
            return false;
        }
        $this->solde -= $montant;
        return true;
    }
}

$c = new Compte("Afi");
$c->deposer(5000);
var_dump($c->retirer(8000));
var_dump($c->retirer(2000));
echo $c->solde(), "\n";
try {
    $c->deposer(-100);
} catch (InvalidArgumentException $e) {
    echo "Refusé : ", $e->getMessage(), "\n";
}
```

Affichage attendu :

    bool(false)
    bool(true)
    3000
    Refusé : Montant invalide

Trace :

- Le dépôt de 5000 passe par la méthode.
- Le retrait de 8000 dépasse le solde : refusé.
- Le dépôt négatif lève une exception, sans toucher au solde.

## Exemple guidé 2

```php
<?php
class Compte
{
    public const DECOUVERT_MAX = 0;

    private int $solde = 0;

    public function __construct(public readonly string $titulaire)
    {
    }

    public function solde(): int
    {
        return $this->solde;
    }

    public function deposer(int $montant): void
    {
        if ($montant <= 0) {
            throw new InvalidArgumentException("Montant invalide");
        }
        $this->solde += $montant;
    }

    public function retirer(int $montant): bool
    {
        if ($montant <= 0 || $this->solde - $montant < self::DECOUVERT_MAX) {
            return false;
        }
        $this->solde -= $montant;
        return true;
    }
}

$c = new Compte("Kossi");
echo $c->titulaire, "\n";
try {
    $c->titulaire = "Yao";
} catch (Error $e) {
    echo "Modification refusée\n";
}
echo Compte::DECOUVERT_MAX, "\n";
```

Affichage attendu :

    Kossi
    Modification refusée
    0

Trace :

- La propriété readonly se lit librement.
- L’écrire une seconde fois provoque une erreur.
- La constante se lit avec le nom de la classe.

## Vérifier et expliquer

Essaie d’écrire directement une propriété private depuis l’extérieur et lis le message d’erreur, puis passe par la méthode prévue.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Visibilité](https://www.php.net/manual/fr/language.oop5.visibility.php)
- [Propriétés et readonly](https://www.php.net/manual/fr/language.oop5.properties.php)
- [Constantes de classe](https://www.php.net/manual/fr/language.oop5.constants.php)
- [Le mot-clé static](https://www.php.net/manual/fr/language.oop5.static.php)
