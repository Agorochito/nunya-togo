---
{
  "id": "phpi-m4-02",
  "title_fr": "Valider et sécuriser les données reçues",
  "course": "php-intermediaire",
  "module": "m4",
  "order": 11,
  "minutes": 20,
  "prerequisites": [
    "phpi-m4-01"
  ],
  "outcomes": [
    "Valider un courriel, un entier dans un intervalle et un numéro avec filter_var et preg_match.",
    "Échapper un texte avec htmlspecialchars avant de l’afficher dans une page."
  ],
  "idea_fr": "Tout ce qui arrive de l’extérieur peut être faux ou malveillant : on valide à l’entrée et on échappe à la sortie.",
  "analogy_fr": "Le contrôleur du car vérifie chaque billet à la montée, et le chauffeur ne lit à voix haute que ce qui est écrit sur la liste officielle.",
  "examples": [
    {
      "code": "<?php\nforeach ([\"ama@ecole.tg\", \"ama@\", \"kofi.agbo@exemple.com\"] as $c) {\n    echo $c, \" : \", filter_var($c, FILTER_VALIDATE_EMAIL) === false ? \"refusé\" : \"accepté\", \"\\n\";\n}\n$options = [\"options\" => [\"min_range\" => 10, \"max_range\" => 99]];\nvar_dump(filter_var(\"16\", FILTER_VALIDATE_INT, $options));\nvar_dump(filter_var(\"7\", FILTER_VALIDATE_INT, $options));",
      "expected_output": "ama@ecole.tg : accepté\nama@ : refusé\nkofi.agbo@exemple.com : accepté\nint(16)\nbool(false)",
      "inputs": [],
      "trace_fr": [
        "filter_var renvoie le courriel valide ou false.",
        "Avec FILTER_VALIDATE_INT, \"16\" devient l’entier 16.",
        "7 est hors de l’intervalle : false."
      ]
    },
    {
      "code": "<?php\n$nom = \"<b>Afi</b>\";\n$commentaire = \"Super ! <script>voler()</script>\";\necho \"<p>\", htmlspecialchars($nom, ENT_QUOTES), \" : \", htmlspecialchars($commentaire, ENT_QUOTES), \"</p>\\n\";",
      "expected_output": "<p>&lt;b&gt;Afi&lt;/b&gt; : Super ! &lt;script&gt;voler()&lt;/script&gt;</p>",
      "inputs": [],
      "trace_fr": [
        "Les chevrons du nom et du commentaire sont transformés.",
        "Le navigateur affichera le texte sans l’exécuter."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Tester filter_var avec un simple if",
      "why_fr": "La valeur 0 est prise pour un échec.",
      "fix_fr": "Compare avec === false."
    },
    {
      "error": "Oublier les ancres ^ et $",
      "why_fr": "Un morceau valide suffit à accepter le texte.",
      "fix_fr": "Encadre le motif par ^ et $."
    },
    {
      "error": "N’échapper que certains champs",
      "why_fr": "Une seule donnée oubliée ouvre une faille XSS.",
      "fix_fr": "Échappe chaque donnée affichée."
    }
  ],
  "quiz": [
    {
      "question": "Que renvoie filter_var(\"ama@\", FILTER_VALIDATE_EMAIL) ?",
      "options": [
        "\"ama@\"",
        "false",
        "true",
        "null"
      ],
      "answer": 1,
      "explanation": "Le courriel est invalide.",
      "id": "phpi-m4-02-q1"
    },
    {
      "question": "Que fait htmlspecialchars ?",
      "options": [
        "Valide un courriel",
        "Transforme les caractères spéciaux HTML pour l’affichage",
        "Chiffre un texte",
        "Supprime les espaces"
      ],
      "answer": 1,
      "explanation": "Il protège contre l’injection dans une page.",
      "id": "phpi-m4-02-q2"
    },
    {
      "question": "Pourquoi valider côté serveur ?",
      "options": [
        "C’est plus joli",
        "Les contrôles du navigateur se contournent",
        "C’est plus rapide",
        "Ce n’est pas utile"
      ],
      "answer": 1,
      "explanation": "Seul le serveur est sous ton contrôle.",
      "id": "phpi-m4-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "validation",
      "definition": "Vérification qu’une donnée respecte le format permis."
    },
    {
      "term": "filter_var",
      "definition": "Fonction PHP de validation et de filtrage des valeurs."
    },
    {
      "term": "échappement",
      "definition": "Transformation des caractères spéciaux avant affichage."
    },
    {
      "term": "XSS",
      "definition": "Faille où un texte injecté s’exécute dans la page d’un visiteur."
    }
  ],
  "recap_fr": [
    "Valider un courriel, un entier dans un intervalle et un numéro avec filter_var et preg_match.",
    "Échapper un texte avec htmlspecialchars avant de l’afficher dans une page.",
    "Lire un message d’erreur PHP, retrouver la ligne indiquée et corriger la cause."
  ],
  "tags": [
    "php",
    "intermédiaire",
    "validation",
    "filter_var",
    "échappement",
    "XSS"
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
      "title": "filter_var",
      "url": "https://www.php.net/manual/fr/function.filter-var.php"
    },
    {
      "title": "htmlspecialchars",
      "url": "https://www.php.net/manual/fr/function.htmlspecialchars.php"
    }
  ],
  "sources": [
    {
      "title": "filter_var",
      "url": "https://www.php.net/manual/fr/function.filter-var.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "htmlspecialchars",
      "url": "https://www.php.net/manual/fr/function.htmlspecialchars.php",
      "scope": "Manuel PHP officiel, référence technique ; texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

PHP est le langage de nombreux sites : formulaires d’inscription, espaces membres, boutiques. Chaque donnée envoyée par un formulaire arrive sous forme de texte, et rien ne garantit qu’elle a le format attendu. Un champ âge peut contenir « douze », un champ courriel « ama@ », un commentaire un morceau de code. La règle d’or tient en deux mots : valider à l’entrée, échapper à la sortie.

Valider, c’est vérifier qu’une donnée respecte le format permis, et la refuser sinon. La fonction filter_var couvre les cas courants. filter_var($courriel, FILTER_VALIDATE_EMAIL) renvoie le courriel s’il est valide et false sinon. filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 10, "max_range" => 99]]) renvoie l’entier converti s’il est dans l’intervalle, false sinon. Attention : ces fonctions renvoient la valeur ou false, et non true ou false ; teste donc avec === false, car l’entier 0 serait faux dans un simple if.

Pour un format propre au pays, comme un numéro de téléphone togolais de huit chiffres avec ou sans +228, une expression régulière décrit la forme permise : preg_match('/^(\+228)?\d{8}$/', $numero). Les ancres ^ et $ obligent tout le texte à correspondre, pas seulement un morceau. Retire d’abord les espaces avec str_replace ou trim, pour accepter les écritures courantes.

Échapper, c’est transformer les caractères spéciaux avant d’insérer un texte dans une page HTML. htmlspecialchars($texte, ENT_QUOTES) remplace < par &lt;, > par &gt;, & par &amp; et les guillemets par leurs entités. Un commentaire contenant une balise script s’affiche alors comme du texte au lieu de s’exécuter : c’est la protection contre les failles XSS. Échappe chaque donnée au moment de l’afficher, y compris un nom ou un titre, même si elle a déjà été validée.

Une bonne validation renvoie toutes les erreurs d’un coup, dans un ordre fixe et avec des messages clairs, pour que la personne corrige son formulaire en une fois. Elle ne révèle pas d’information inutile, et elle se fait toujours côté serveur, car les contrôles du navigateur se contournent facilement.

Enfin, pour une base de données, on n’assemble jamais une requête SQL en collant des textes reçus : on utilise des requêtes préparées, où les valeurs sont transmises séparément, comme dans les cours SQL et Cybersécurité de Nunya. Validation, échappement et requêtes préparées forment ensemble la base de la sécurité d’une application PHP.

## Exemple guidé 1

```php
<?php
foreach (["ama@ecole.tg", "ama@", "kofi.agbo@exemple.com"] as $c) {
    echo $c, " : ", filter_var($c, FILTER_VALIDATE_EMAIL) === false ? "refusé" : "accepté", "\n";
}
$options = ["options" => ["min_range" => 10, "max_range" => 99]];
var_dump(filter_var("16", FILTER_VALIDATE_INT, $options));
var_dump(filter_var("7", FILTER_VALIDATE_INT, $options));
```

Affichage attendu :

    ama@ecole.tg : accepté
    ama@ : refusé
    kofi.agbo@exemple.com : accepté
    int(16)
    bool(false)

Trace :

- filter_var renvoie le courriel valide ou false.
- Avec FILTER_VALIDATE_INT, "16" devient l’entier 16.
- 7 est hors de l’intervalle : false.

## Exemple guidé 2

```php
<?php
$nom = "<b>Afi</b>";
$commentaire = "Super ! <script>voler()</script>";
echo "<p>", htmlspecialchars($nom, ENT_QUOTES), " : ", htmlspecialchars($commentaire, ENT_QUOTES), "</p>\n";
```

Affichage attendu :

    <p>&lt;b&gt;Afi&lt;/b&gt; : Super ! &lt;script&gt;voler()&lt;/script&gt;</p>

Trace :

- Les chevrons du nom et du commentaire sont transformés.
- Le navigateur affichera le texte sans l’exécuter.

## Vérifier et expliquer

Pour chaque règle, écris trois valeurs qui doivent passer et trois qui doivent échouer, puis vérifie-les une à une.

## Références techniques

Explications et activités originales Nunya. Mécanismes vérifiés dans le manuel PHP officiel :

- [filter_var](https://www.php.net/manual/fr/function.filter-var.php)
- [htmlspecialchars](https://www.php.net/manual/fr/function.htmlspecialchars.php)
