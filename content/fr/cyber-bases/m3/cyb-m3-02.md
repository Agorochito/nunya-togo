---
{
  "id": "cyb-m3-02",
  "title_fr": "Ne jamais faire confiance aux entrées",
  "course": "cyber-bases",
  "module": "m3",
  "order": 8,
  "minutes": 20,
  "prerequisites": [
    "cyb-m3-01"
  ],
  "outcomes": [
    "Valider une saisie avec une liste autorisée et re.fullmatch.",
    "Échapper un texte avant de l’afficher dans une page web, et expliquer le principe des requêtes paramétrées."
  ],
  "idea_fr": "Tout ce qui vient de l’extérieur — formulaire, fichier, message — peut être malveillant ; on vérifie ce qui est permis au lieu de deviner ce qui est dangereux.",
  "analogy_fr": "À l’entrée d’un examen, on vérifie la carte de chaque candidat. On ne cherche pas à reconnaître les fraudeurs : on laisse entrer seulement ceux qui ont la bonne carte.",
  "examples": [
    {
      "code": "import re\n\nmotif = r\"[a-z][a-z0-9_]{2,15}\"\nfor texte in [\"ama_2026\", \"ama;DROP\", \"2ama\"]:\n    print(texte, bool(re.search(motif, texte)), bool(re.fullmatch(motif, texte)))",
      "expected_output": "ama_2026 True True\nama;DROP True False\n2ama True False\n",
      "inputs": [],
      "trace_fr": [
        "search trouve ama au début de ama;DROP et accepte.",
        "fullmatch exige que tout le texte corresponde : refus.",
        "2ama : search trouve ama à l’intérieur, fullmatch refuse car le texte commence par un chiffre."
      ]
    },
    {
      "code": "import html\n\ncommentaire = \"<script>voler()</script> Bravo !\"\nprint(html.escape(commentaire))",
      "expected_output": "&lt;script&gt;voler()&lt;/script&gt; Bravo !\n",
      "inputs": [],
      "trace_fr": [
        "escape remplace < et > par des entités.",
        "Le navigateur affichera le texte sans exécuter de script."
      ]
    }
  ],
  "common_mistakes": [
    {
      "error": "Valider avec re.search",
      "why_fr": "Un texte qui contient un morceau valide passe.",
      "fix_fr": "Utilise re.fullmatch."
    },
    {
      "error": "Chercher les caractères dangereux",
      "why_fr": "La liste interdite oublie toujours un cas.",
      "fix_fr": "Décris ce qui est permis et refuse le reste."
    },
    {
      "error": "Valider seulement dans le navigateur",
      "why_fr": "Un attaquant envoie ses données directement.",
      "fix_fr": "Valide aussi côté serveur."
    }
  ],
  "quiz": [
    {
      "question": "Quelle fonction valide un texte entier ?",
      "options": [
        "re.search",
        "re.fullmatch",
        "re.findall",
        "str.find"
      ],
      "answer": 1,
      "explanation": "fullmatch exige que tout le texte corresponde au motif.",
      "id": "cyb-m3-02-q1"
    },
    {
      "question": "Que protège html.escape ?",
      "options": [
        "Les mots de passe",
        "L’affichage d’un texte dans une page web",
        "Les sauvegardes",
        "Les adresses IP"
      ],
      "answer": 1,
      "explanation": "Il empêche un texte d’être interprété comme du HTML.",
      "id": "cyb-m3-02-q2"
    },
    {
      "question": "Comment se protéger de l’injection SQL ?",
      "options": [
        "Retirer les apostrophes",
        "Utiliser des requêtes paramétrées",
        "Mettre la saisie en majuscules",
        "Limiter la longueur"
      ],
      "answer": 1,
      "explanation": "Les valeurs sont transmises séparément de la requête.",
      "id": "cyb-m3-02-q3"
    }
  ],
  "glossary": [
    {
      "term": "injection",
      "definition": "Faille où une saisie est exécutée comme du code."
    },
    {
      "term": "liste autorisée",
      "definition": "Description précise de ce qui est permis ; tout le reste est refusé."
    },
    {
      "term": "échappement",
      "definition": "Transformation des caractères spéciaux pour qu’ils soient affichés, pas interprétés."
    },
    {
      "term": "requête paramétrée",
      "definition": "Requête où les valeurs sont transmises séparément du texte SQL."
    }
  ],
  "recap_fr": [
    "Valider une saisie avec une liste autorisée et re.fullmatch.",
    "Échapper un texte avant de l’afficher dans une page web, et expliquer le principe des requêtes paramétrées.",
    "Défendre uniquement des systèmes que l’on a le droit d’examiner, et documenter chaque constat."
  ],
  "tags": [
    "cybersécurité",
    "python",
    "défense",
    "injection",
    "liste autorisée",
    "échappement",
    "requête paramétrée"
  ],
  "status": "brouillon",
  "reviewer": null,
  "last_reviewed": null,
  "language": "python",
  "runtime": "python",
  "level": "debutant",
  "technical_checked_on": "2026-11-10",
  "environment_fr": "Python exécuté localement dans le navigateur, hors ligne. Journaux, comptes, adresses et messages sont fictifs ; aucun réseau, aucun système réel n’est sondé ni attaqué.",
  "references": [
    {
      "title": "OWASP — Validation des entrées",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
    },
    {
      "title": "Python — expressions régulières (re)",
      "url": "https://docs.python.org/fr/3/library/re.html"
    },
    {
      "title": "Python — html",
      "url": "https://docs.python.org/fr/3/library/html.html"
    },
    {
      "title": "OWASP Top 10",
      "url": "https://owasp.org/www-project-top-ten/"
    }
  ],
  "sources": [
    {
      "title": "OWASP — Validation des entrées",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
      "scope": "Listes autorisées plutôt que listes interdites. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — expressions régulières (re)",
      "url": "https://docs.python.org/fr/3/library/re.html",
      "scope": "fullmatch et classes de caractères. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "Python — html",
      "url": "https://docs.python.org/fr/3/library/html.html",
      "scope": "Échapper les caractères spéciaux avant affichage. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    },
    {
      "title": "OWASP Top 10",
      "url": "https://owasp.org/www-project-top-ten/",
      "scope": "Grandes familles de failles des applications web. Texte, exemples et exercices originaux Nunya.",
      "last_checked": "2026-11-10"
    }
  ]
}
---


## Explication pas à pas

Beaucoup de failles graves ont la même origine : un programme traite une saisie comme du code. L’OWASP, une fondation qui recense les risques des applications web, place l’injection parmi les familles de failles les plus fréquentes. Le principe est toujours le même. Un formulaire attend un nom ; quelqu’un écrit à la place un morceau de commande que le programme exécute.

Le premier exemple est l’injection SQL. Si un programme construit sa requête en collant le texte saisi, comme "SELECT * FROM eleves WHERE nom = '" + saisie + "'", une saisie comme x' OR '1'='1 change le sens de la requête et peut afficher toute la table. La parade n’est pas de chercher les apostrophes : c’est d’utiliser des requêtes paramétrées, où la base reçoit la requête et les valeurs séparément. Le texte saisi reste alors une simple valeur, quoi qu’il contienne. Le cours SQL de Nunya utilise ce principe.

Le deuxième exemple est l’injection dans une page web, appelée XSS. Si un site affiche un commentaire tel quel, un commentaire contenant une balise script s’exécute chez chaque visiteur. La parade est d’échapper le texte avant de l’insérer dans le HTML : les caractères spéciaux comme < et > deviennent &lt; et &gt;, qui s’affichent sans être interprétés. En Python, html.escape le fait.

Avant l’échappement, il y a la validation. La bonne méthode est la liste autorisée : on décrit précisément ce qui est permis et on refuse le reste. Un identifiant commence par une lettre minuscule, puis contient de 2 à 15 lettres, chiffres ou tirets bas. Un numéro togolais contient 8 chiffres, avec ou sans l’indicatif +228. L’inverse, la liste interdite, qui chercherait les caractères dangereux, oublie toujours un cas.

Les expressions régulières décrivent ces formats. [a-z] désigne une lettre minuscule, \d un chiffre, {2,15} une répétition de 2 à 15 fois. Attention au choix de la fonction : re.search trouve le motif n’importe où dans le texte, donc ama;DROP serait accepté parce qu’il commence par ama. re.fullmatch exige que tout le texte corresponde : c’est elle qu’il faut pour valider.

Enfin, la validation se fait côté serveur. Un contrôle dans le navigateur améliore le confort de la personne qui remplit le formulaire, mais un attaquant peut l’éviter facilement en envoyant directement ses données. Le programme qui reçoit la saisie doit toujours vérifier lui-même.

## Exemple guidé 1

```python
import re

motif = r"[a-z][a-z0-9_]{2,15}"
for texte in ["ama_2026", "ama;DROP", "2ama"]:
    print(texte, bool(re.search(motif, texte)), bool(re.fullmatch(motif, texte)))
```

Affichage attendu :

    ama_2026 True True
    ama;DROP True False
    2ama True False

Trace :

- search trouve ama au début de ama;DROP et accepte.
- fullmatch exige que tout le texte corresponde : refus.
- 2ama : search trouve ama à l’intérieur, fullmatch refuse car le texte commence par un chiffre.

## Exemple guidé 2

```python
import html

commentaire = "<script>voler()</script> Bravo !"
print(html.escape(commentaire))
```

Affichage attendu :

    &lt;script&gt;voler()&lt;/script&gt; Bravo !

Trace :

- escape remplace < et > par des entités.
- Le navigateur affichera le texte sans exécuter de script.

## Vérifier et expliquer

Pour chaque motif, écris trois textes qui doivent passer et trois qui doivent échouer, puis vérifie avec fullmatch.

## Références techniques

Explications et activités originales Nunya. Notions vérifiées dans ces sources :

- [OWASP — Validation des entrées](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Python — expressions régulières (re)](https://docs.python.org/fr/3/library/re.html)
- [Python — html](https://docs.python.org/fr/3/library/html.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
