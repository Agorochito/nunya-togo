---
{
  "id": "phpi-m3-03",
  "title_fr": "Énumérations et match",
  "course": "php-intermediaire",
  "module": "m3",
  "order": 9,
  "minutes": 20,
  "prerequisites": [
    "phpi-m3-02"
  ],
  "outcomes": [
    "Déclarer une énumération à valeurs (backed enum), avec ses cas et ses méthodes.",
    "Convertir une valeur reçue avec from et tryFrom, et décider avec match sur un enum."
  ],
  "idea_fr": "Un enum liste toutes les valeurs permises d’un concept ; PHP refuse alors les fautes de frappe et les valeurs inventées.",
  "analogy_fr": "Au feu tricolore, il n’existe que trois couleurs. Personne ne peut inventer un « orange clair ».",
  "examples": [
    {
      "code": "<?php\nenum Statut: string\n{\n    case Paye = \"paye\";\n    case Attente = \"attente\";\n    case Annule = \"annule\";\n\n    public function libelle(): string\n    {\n        return match ($this) {\n            Statut::Paye => \"payé\",\n            Statut::Attente => \"en attente\",\n            Statut::Annule => \"annulé\",\n        };\n    }\n}\n\n$s = Statut::from(\"attente\");\necho $s->libelle(), \" (\", $s->value, \")\\n\";\nvar_dump(Statut::tryFrom(\"payé\"));\necho implode(\", \", array_map(fn($c) => $c->value, Statut::cases())), \"\\n\";",
      "expected_output": "en attente (attente)\nNULL\npaye, attente, annule",
      "inputs": [],
      "trace_fr": [
        "from convertit un texte valide en cas d’enum.",
        "tryFrom renvoie NULL pour une valeur inconnue.",
        "cases liste tous les cas."
      ]
    },
    {
      "code": "<?php\nenum Statut: string\n{\n    case Paye = \"paye\";\n    case Attente = \"attente\";\n    case Annule = \"annule\";\n\n    public function libelle(): string\n    {\n        return match ($this) {\n            Statut::Paye => \"payé\",\n            Statut::Attente => \"en attente\",\n            Statut::Annule => \"annulé\",\n        };\n    }\n}\n\nfunction peutPasser(Statut $de, Statut $vers): bool\n{\n    return match ($de) {\n        Statut::Attente => $vers !== Statut::Attente,\n        Statut::Paye => $vers === Statut::Annule,\n        Statut::Annule => false,\n    };\n}\n\nvar_dump(peutPasser(Statut::Attente, Statut::Paye));\nvar_dump(peutPasser(Statut::Annule, Statut::Paye));",
      "expected_output": "bool(true)\nbool(false)",
      "inputs": [],
      "trace_fr": [
        "Une commande en attente peut être payée.",
        "Une commande annulée ne change plus.",
        "match couvre les trois cas de l’enum."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Utiliser from sur des données extérieures",
      "why_fr": "Une valeur inconnue lève ValueError.",
      "fix_fr": "Utilise tryFrom puis teste null."
    },
    {
      "error": "Comparer avec des textes",
      "why_fr": "On réintroduit les fautes de frappe.",
      "fix_fr": "Compare des cas : $s === Statut::Paye."
    },
    {
      "error": "Oublier un cas dans match",
      "why_fr": "Une valeur provoque UnhandledMatchError.",
      "fix_fr": "Traite chaque cas ou ajoute default."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie Statut::tryFrom(\"inconnu\") ?",
      "options": [
        "Une ValueError",
        "null",
        "Statut::Attente",
        "false"
      ],
      "answer": 1,
      "explanation": "tryFrom ne lève pas d’erreur.",
      "id": "phpi-m3-03-q1"
    },
    {
      "question": "Comment lire la valeur texte d’un cas ?",
      "options": [
        "$s->name",
        "$s->value",
        "(string) $s",
        "$s()"
      ],
      "answer": 1,
      "explanation": "Les enums à valeurs exposent ->value.",
      "id": "phpi-m3-03-q2"
    },
    {
      "question": "Que renvoie Statut::cases() ?",
      "options": [
        "Le nombre de cas",
        "La liste de tous les cas",
        "Le premier cas",
        "Les valeurs texte"
      ],
      "answer": 1,
      "explanation": "Une liste d’objets enum.",
      "id": "phpi-m3-03-q3"
    }
  ],
  "glossary": [
    {
      "term": "enum",
      "definition": "Type qui n’admet qu’une liste fermée de valeurs."
    },
    {
      "term": "backed enum",
      "definition": "Enum dont chaque cas a une valeur texte ou entière."
    },
    {
      "term": "tryFrom",
      "definition": "Conversion qui renvoie null pour une valeur inconnue."
    },
    {
      "term": "transition",
      "definition": "Passage autorisé d’un état à un autre."
    }
  ],
  "recap_fr": [
    "Déclarer une énumération à valeurs (backed enum), avec ses cas et ses méthodes.",
    "Convertir une valeur reçue avec from et tryFrom, et décider avec match sur un enum.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "enum",
    "backed enum",
    "tryFrom",
    "transition"
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
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php"
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
      "title": "match",
      "url": "https://www.php.net/manual/fr/control-structures.match.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Un statut de commande s’écrivait souvent sous forme de texte : "paye", "attente", "annule". Mais rien n’empêche d’écrire "payé" avec un accent, "Paye" avec une majuscule ou "pay" par erreur, et le programme se comporte alors de travers sans prévenir. Depuis PHP 8.1, les énumérations, ou enums, règlent ce problème.

enum Statut: string { case Paye = "paye"; case Attente = "attente"; case Annule = "annule"; } déclare un type qui n’a que trois valeurs possibles, Statut::Paye, Statut::Attente et Statut::Annule. Le : string fait de Statut un enum à valeurs : chaque cas est associé à un texte, qu’on lit avec ->value. C’est cette valeur qu’on stocke dans une base de données ou qu’on échange en JSON.

Pour transformer une valeur reçue en cas d’enum, deux méthodes existent. Statut::from("paye") renvoie Statut::Paye, mais lève une ValueError si la valeur n’existe pas. Statut::tryFrom("payé") renvoie simplement null pour une valeur inconnue. On utilise from quand une valeur invalide est une erreur de programmation, et tryFrom pour des données extérieures, qu’on vérifie ensuite avec l’opérateur ?? ou un test de null.

Un enum peut avoir des méthodes, comme une classe. Une méthode libelle() qui renvoie "payé", "en attente" ou "annulé" garde l’affichage au même endroit que les valeurs. À l’intérieur, $this désigne le cas courant, et match($this) choisit naturellement le texte. Si l’on ajoute un jour un cas Rembourse, PHP signale tous les match qui ne le traitent pas, grâce à l’erreur UnhandledMatchError : aucun cas n’est oublié en silence.

Les cas d’un enum se comparent avec === : $statut === Statut::Paye. La méthode statique Statut::cases() renvoie la liste de tous les cas, pratique pour construire un menu ou initialiser des compteurs.

Une fonction peut exiger un enum en paramètre : function peutRembourser(Statut $s): bool. Il devient alors impossible de lui passer un texte quelconque : la validation a lieu une fois, à l’entrée, quand on convertit avec tryFrom, et le reste du programme manipule des valeurs sûres.

Les enums se combinent bien avec les règles de transition. Une commande en attente peut être payée ou annulée ; une commande annulée ne change plus. Ces règles, écrites dans une méthode de l’enum ou dans une fonction qui reçoit deux statuts, deviennent explicites et faciles à tester, au lieu d’être dispersées dans des if comparant des textes.

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

$s = Statut::from("attente");
echo $s->libelle(), " (", $s->value, ")\n";
var_dump(Statut::tryFrom("payé"));
echo implode(", ", array_map(fn($c) => $c->value, Statut::cases())), "\n";
```

Affichage attendu :

    en attente (attente)
    NULL
    paye, attente, annule

Trace :

- from convertit un texte valide en cas d’enum.
- tryFrom renvoie NULL pour une valeur inconnue.
- cases liste tous les cas.

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

function peutPasser(Statut $de, Statut $vers): bool
{
    return match ($de) {
        Statut::Attente => $vers !== Statut::Attente,
        Statut::Paye => $vers === Statut::Annule,
        Statut::Annule => false,
    };
}

var_dump(peutPasser(Statut::Attente, Statut::Paye));
var_dump(peutPasser(Statut::Annule, Statut::Paye));
```

Affichage attendu :

    bool(true)
    bool(false)

Trace :

- Une commande en attente peut être payée.
- Une commande annulée ne change plus.
- match couvre les trois cas de l’enum.

## Vérifier et expliquer

Ajoute un cas Rembourse à l’enum de l’exemple sans modifier libelle, lance le programme et lis l’erreur signalée.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [Énumérations](https://www.php.net/manual/fr/language.enumerations.php)
- [match](https://www.php.net/manual/fr/control-structures.match.php)
