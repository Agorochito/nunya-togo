---
{
  "id": "phpi-m4-03",
  "title_fr": "Projet : les inscriptions d’une association",
  "course": "php-intermediaire",
  "module": "m4",
  "order": 12,
  "minutes": 20,
  "prerequisites": [
    "phpi-m4-02"
  ],
  "outcomes": [
    "Assembler classes, enum, exceptions, JSON et validation dans un programme complet.",
    "Produire un rapport fiable même quand une partie des données est invalide."
  ],
  "idea_fr": "Un programme robuste accepte ce qui est valide, explique ce qui ne l’est pas, et ne s’arrête jamais à la première erreur.",
  "analogy_fr": "Le trésorier d’une association reçoit des fiches d’inscription. Il enregistre les fiches complètes, met de côté les autres avec une note, puis présente un bilan à l’assemblée.",
  "examples": [
    {
      "code": "<?php\nenum Statut: string\n{\n    case Paye = \"paye\";\n    case Attente = \"attente\";\n    case Annule = \"annule\";\n\n    public function libelle(): string\n    {\n        return match ($this) {\n            Statut::Paye => \"payé\",\n            Statut::Attente => \"en attente\",\n            Statut::Annule => \"annulé\",\n        };\n    }\n}\n\nclass Inscription\n{\n    public function __construct(\n        public readonly string $nom,\n        public readonly string $courriel,\n        public readonly Statut $statut,\n        public readonly int $cotisation,\n    ) {\n        if (trim($nom) === \"\") {\n            throw new InvalidArgumentException(\"nom requis\");\n        }\n        if (filter_var($courriel, FILTER_VALIDATE_EMAIL) === false) {\n            throw new InvalidArgumentException(\"courriel invalide\");\n        }\n        if ($cotisation < 0) {\n            throw new InvalidArgumentException(\"cotisation invalide\");\n        }\n    }\n\n    public static function depuisTableau(array $d): self\n    {\n        $statut = Statut::tryFrom($d[\"statut\"] ?? \"\");\n        if ($statut === null) {\n            throw new InvalidArgumentException(\"statut invalide\");\n        }\n        return new self($d[\"nom\"] ?? \"\", $d[\"courriel\"] ?? \"\", $statut, (int) ($d[\"cotisation\"] ?? 0));\n    }\n}\n\ntry {\n    $i = Inscription::depuisTableau([\"nom\" => \"Afi\", \"courriel\" => \"afi@asso.tg\", \"statut\" => \"paye\", \"cotisation\" => 2000]);\n    echo $i->nom, \" : \", $i->statut->libelle(), \", \", $i->cotisation, \" FCFA\\n\";\n    Inscription::depuisTableau([\"nom\" => \"Kofi\", \"courriel\" => \"kofi@asso\", \"statut\" => \"paye\"]);\n} catch (InvalidArgumentException $e) {\n    echo \"Refusé : \", $e->getMessage(), \"\\n\";\n}",
      "expected_output": "Afi : payé, 2000 FCFA\nRefusé : courriel invalide",
      "inputs": [],
      "trace_fr": [
        "La première fiche est valide : un objet est créé.",
        "Le statut est un enum, avec son libellé.",
        "Le courriel de Kofi est refusé par le constructeur."
      ]
    },
    {
      "code": "<?php\nenum Statut: string\n{\n    case Paye = \"paye\";\n    case Attente = \"attente\";\n    case Annule = \"annule\";\n\n    public function libelle(): string\n    {\n        return match ($this) {\n            Statut::Paye => \"payé\",\n            Statut::Attente => \"en attente\",\n            Statut::Annule => \"annulé\",\n        };\n    }\n}\n\nclass Inscription\n{\n    public function __construct(\n        public readonly string $nom,\n        public readonly string $courriel,\n        public readonly Statut $statut,\n        public readonly int $cotisation,\n    ) {\n        if (trim($nom) === \"\") {\n            throw new InvalidArgumentException(\"nom requis\");\n        }\n        if (filter_var($courriel, FILTER_VALIDATE_EMAIL) === false) {\n            throw new InvalidArgumentException(\"courriel invalide\");\n        }\n        if ($cotisation < 0) {\n            throw new InvalidArgumentException(\"cotisation invalide\");\n        }\n    }\n\n    public static function depuisTableau(array $d): self\n    {\n        $statut = Statut::tryFrom($d[\"statut\"] ?? \"\");\n        if ($statut === null) {\n            throw new InvalidArgumentException(\"statut invalide\");\n        }\n        return new self($d[\"nom\"] ?? \"\", $d[\"courriel\"] ?? \"\", $statut, (int) ($d[\"cotisation\"] ?? 0));\n    }\n}\n\nfunction charger(string $json): array\n{\n    try {\n        $lignes = json_decode($json, true, 512, JSON_THROW_ON_ERROR);\n    } catch (JsonException $e) {\n        return [[], [\"JSON invalide\"]];\n    }\n    $inscriptions = [];\n    $erreurs = [];\n    foreach ($lignes as $i => $ligne) {\n        try {\n            $inscriptions[] = Inscription::depuisTableau($ligne);\n        } catch (InvalidArgumentException $e) {\n            $erreurs[] = \"ligne \" . ($i + 1) . \" : \" . $e->getMessage();\n        }\n    }\n    return [$inscriptions, $erreurs];\n}\n\n[$valides, $erreurs] = charger('[{\"nom\": \"Afi\", \"courriel\": \"afi@asso.tg\", \"statut\": \"paye\", \"cotisation\": 2000}, {\"nom\": \"Kofi\", \"courriel\": \"kofi@asso\", \"statut\": \"paye\", \"cotisation\": 2000}, {\"nom\": \"Esi\", \"courriel\": \"esi@asso.tg\", \"statut\": \"attente\", \"cotisation\": 2000}, {\"nom\": \"Yao\", \"courriel\": \"yao@asso.tg\", \"statut\": \"rembourse\", \"cotisation\": 1000}, {\"nom\": \"Ama\", \"courriel\": \"ama@asso.tg\", \"statut\": \"paye\", \"cotisation\": 1500}]');\necho count($valides), \" valides\\n\";\necho implode(\"\\n\", $erreurs), \"\\n\";",
      "expected_output": "3 valides\nligne 2 : courriel invalide\nligne 4 : statut invalide",
      "inputs": [],
      "trace_fr": [
        "Chaque ligne est tentée séparément.",
        "Les lignes invalides deviennent des messages numérotés.",
        "Le chargement ne s’arrête jamais à la première erreur."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Arrêter tout le chargement à la première erreur",
      "why_fr": "Les fiches valides suivantes sont perdues.",
      "fix_fr": "Intercepte l’exception de chaque ligne."
    },
    {
      "error": "Compter toutes les cotisations",
      "why_fr": "Les paiements en attente ne sont pas encaissés.",
      "fix_fr": "Ne compte que le statut payé."
    },
    {
      "error": "Rendre les propriétés modifiables",
      "why_fr": "Une inscription peut devenir invalide après sa création.",
      "fix_fr": "Utilise readonly et valide dans le constructeur."
    }
  ],
  "quiz": [
    {
      "question": "Pourquoi valider dans le constructeur ?",
      "options": [
        "Pour aller plus vite",
        "Pour qu’aucun objet invalide ne puisse exister",
        "Par obligation",
        "Pour éviter les enums"
      ],
      "answer": 1,
      "explanation": "Tout objet créé est alors garanti valide.",
      "id": "phpi-m4-03-q1"
    },
    {
      "question": "Que doit faire le chargement d’une ligne invalide ?",
      "options": [
        "Arrêter le programme",
        "L’ignorer en silence",
        "La refuser avec un message et continuer",
        "La corriger au hasard"
      ],
      "answer": 2,
      "explanation": "Chaque erreur est expliquée, les autres lignes sont traitées.",
      "id": "phpi-m4-03-q2"
    },
    {
      "question": "Quelles cotisations compter comme encaissées ?",
      "options": [
        "Toutes",
        "Celles au statut payé",
        "Celles en attente",
        "Aucune"
      ],
      "answer": 1,
      "explanation": "Seules les inscriptions payées ont versé leur cotisation.",
      "id": "phpi-m4-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "fiche valide",
      "definition": "Donnée qui respecte toutes les règles et devient un objet."
    },
    {
      "term": "chargement",
      "definition": "Transformation des données brutes en objets du programme."
    },
    {
      "term": "relance",
      "definition": "Rappel envoyé aux inscriptions dont le paiement est en attente."
    },
    {
      "term": "robustesse",
      "definition": "Capacité d’un programme à continuer malgré des données imparfaites."
    }
  ],
  "recap_fr": [
    "Assembler classes, enum, exceptions, JSON et validation dans un programme complet.",
    "Produire un rapport fiable même quand une partie des données est invalide.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "fiche valide",
    "chargement",
    "relance",
    "robustesse"
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
      "title": "Énumérations",
      "url": "https://www.php.net/manual/fr/language.enumerations.php"
    },
    {
      "title": "json_decode",
      "url": "https://www.php.net/manual/fr/function.json-decode.php"
    },
    {
      "title": "filter_var",
      "url": "https://www.php.net/manual/fr/function.filter-var.php"
    },
    {
      "title": "La classe Exception",
      "url": "https://www.php.net/manual/fr/class.exception.php"
    }
  ],
  "sources": [
    {
      "title": "Énumérations",
      "url": "https://www.php.net/manual/fr/language.enumerations.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "json_decode",
      "url": "https://www.php.net/manual/fr/function.json-decode.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "filter_var",
      "url": "https://www.php.net/manual/fr/function.filter-var.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "La classe Exception",
      "url": "https://www.php.net/manual/fr/class.exception.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Ce projet réunit tout le cours. Une association de jeunes de Kpalimé reçoit ses inscriptions depuis un formulaire en ligne, exportées en JSON. Chaque fiche contient un nom, un courriel, un statut de paiement et une cotisation. Le trésorier veut savoir combien d’inscriptions sont valides, combien de cotisations ont été encaissées, et quelles fiches posent problème.

La conception suit les leçons précédentes. L’enum Statut liste les états possibles du paiement : payé, en attente, annulé. La classe Inscription représente une fiche valide : ses propriétés sont readonly, car une inscription enregistrée ne change pas en douce, et son constructeur refuse les données invalides avec une InvalidArgumentException au message précis. Une méthode statique depuisTableau crée une inscription à partir d’une ligne JSON, en convertissant le statut avec tryFrom. Ainsi, un objet Inscription est toujours valide : il est impossible d’en créer un qui ne l’est pas.

Le chargement transforme le texte JSON en objets. Il intercepte JsonException pour un fichier illisible, puis tente de créer chaque inscription. Une ligne invalide ne fait pas échouer tout le chargement : son exception est interceptée, et un message « ligne 2 : courriel invalide » est ajouté à une liste d’erreurs. Le chargement renvoie donc deux listes : les inscriptions valides et les erreurs expliquées. C’est le comportement attendu d’un programme qui traite des données réelles, toujours imparfaites.

Le rapport utilise ensuite les fonctions de tableaux sur les objets valides : nombre d’inscriptions, total encaissé, en ne comptant que les statuts payés, répartition par statut avec un compteur initialisé pour chaque cas de l’enum, et liste des personnes à relancer, dont le paiement est en attente, triées par nom. Les libellés de l’enum rendent ce rapport lisible.

Chaque partie se teste séparément, comme dans les exercices : la classe seule, le chargement, puis le rapport complet. Une erreur se localise ainsi rapidement. Et parce que les règles vivent dans la classe et l’enum, ajouter un statut ou une règle de validation se fait à un seul endroit.

Après ce cours, tu sais écrire du PHP structuré et fiable : fonctions typées, objets protégés, erreurs explicites, données échangées en JSON et entrées validées. La suite naturelle est de connecter ce code à une vraie base de données avec des requêtes préparées, et de découvrir un framework web, qui organise ces mêmes idées à plus grande échelle.

## Exemple guidé 1

```php
<?php
enum Statut: string
{
    case Paye = "paye";
    case Attente = "attente";
    case Annule = "annule";

    public function libelle(): string
    {
        return match ($this) {
            Statut::Paye => "payé",
            Statut::Attente => "en attente",
            Statut::Annule => "annulé",
        };
    }
}

class Inscription
{
    public function __construct(
        public readonly string $nom,
        public readonly string $courriel,
        public readonly Statut $statut,
        public readonly int $cotisation,
    ) {
        if (trim($nom) === "") {
            throw new InvalidArgumentException("nom requis");
        }
        if (filter_var($courriel, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException("courriel invalide");
        }
        if ($cotisation < 0) {
            throw new InvalidArgumentException("cotisation invalide");
        }
    }

    public static function depuisTableau(array $d): self
    {
        $statut = Statut::tryFrom($d["statut"] ?? "");
        if ($statut === null) {
            throw new InvalidArgumentException("statut invalide");
        }
        return new self($d["nom"] ?? "", $d["courriel"] ?? "", $statut, (int) ($d["cotisation"] ?? 0));
    }
}

try {
    $i = Inscription::depuisTableau(["nom" => "Afi", "courriel" => "afi@asso.tg", "statut" => "paye", "cotisation" => 2000]);
    echo $i->nom, " : ", $i->statut->libelle(), ", ", $i->cotisation, " FCFA\n";
    Inscription::depuisTableau(["nom" => "Kofi", "courriel" => "kofi@asso", "statut" => "paye"]);
} catch (InvalidArgumentException $e) {
    echo "Refusé : ", $e->getMessage(), "\n";
}
```

Affichage attendu :

    Afi : payé, 2000 FCFA
    Refusé : courriel invalide

Trace :

- La première fiche est valide : un objet est créé.
- Le statut est un enum, avec son libellé.
- Le courriel de Kofi est refusé par le constructeur.

## Exemple guidé 2

```php
<?php
enum Statut: string
{
    case Paye = "paye";
    case Attente = "attente";
    case Annule = "annule";

    public function libelle(): string
    {
        return match ($this) {
            Statut::Paye => "payé",
            Statut::Attente => "en attente",
            Statut::Annule => "annulé",
        };
    }
}

class Inscription
{
    public function __construct(
        public readonly string $nom,
        public readonly string $courriel,
        public readonly Statut $statut,
        public readonly int $cotisation,
    ) {
        if (trim($nom) === "") {
            throw new InvalidArgumentException("nom requis");
        }
        if (filter_var($courriel, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException("courriel invalide");
        }
        if ($cotisation < 0) {
            throw new InvalidArgumentException("cotisation invalide");
        }
    }

    public static function depuisTableau(array $d): self
    {
        $statut = Statut::tryFrom($d["statut"] ?? "");
        if ($statut === null) {
            throw new InvalidArgumentException("statut invalide");
        }
        return new self($d["nom"] ?? "", $d["courriel"] ?? "", $statut, (int) ($d["cotisation"] ?? 0));
    }
}

function charger(string $json): array
{
    try {
        $lignes = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        return [[], ["JSON invalide"]];
    }
    $inscriptions = [];
    $erreurs = [];
    foreach ($lignes as $i => $ligne) {
        try {
            $inscriptions[] = Inscription::depuisTableau($ligne);
        } catch (InvalidArgumentException $e) {
            $erreurs[] = "ligne " . ($i + 1) . " : " . $e->getMessage();
        }
    }
    return [$inscriptions, $erreurs];
}

[$valides, $erreurs] = charger('[{"nom": "Afi", "courriel": "afi@asso.tg", "statut": "paye", "cotisation": 2000}, {"nom": "Kofi", "courriel": "kofi@asso", "statut": "paye", "cotisation": 2000}, {"nom": "Esi", "courriel": "esi@asso.tg", "statut": "attente", "cotisation": 2000}, {"nom": "Yao", "courriel": "yao@asso.tg", "statut": "rembourse", "cotisation": 1000}, {"nom": "Ama", "courriel": "ama@asso.tg", "statut": "paye", "cotisation": 1500}]');
echo count($valides), " valides\n";
echo implode("\n", $erreurs), "\n";
```

Affichage attendu :

    3 valides
    ligne 2 : courriel invalide
    ligne 4 : statut invalide

Trace :

- Chaque ligne est tentée séparément.
- Les lignes invalides deviennent des messages numérotés.
- Le chargement ne s’arrête jamais à la première erreur.

## Vérifier et expliquer

Ajoute une sixième fiche invalide de ton invention au JSON et vérifie que le rapport l’explique sans perdre les autres.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Énumérations](https://www.php.net/manual/fr/language.enumerations.php)
- [json_decode](https://www.php.net/manual/fr/function.json-decode.php)
- [filter_var](https://www.php.net/manual/fr/function.filter-var.php)
- [La classe Exception](https://www.php.net/manual/fr/class.exception.php)
