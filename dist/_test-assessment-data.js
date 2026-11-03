window._assessmentLabels = {
  "introTitle": {
    "fr": "Avant de commencerΓÇª",
    "en": "Before we startΓÇª"
  },
  "introBody": {
    "fr": "Ce n'est pas un examen ! Il n'y a pas de note et pas de chrono. Ces quelques questions servent juste ├á trouver le meilleur point de d├⌐part pour toi.",
    "en": "This is not an exam! There are no grades and no timer. These few questions just help us find the best starting point for you."
  },
  "introAction": {
    "fr": "C'est parti !",
    "en": "Let's go!"
  },
  "questionIndicator": {
    "fr": "Question {current} sur {total}",
    "en": "Question {current} of {total}"
  },
  "iDontKnow": {
    "fr": "Je ne sais pas",
    "en": "I don't know"
  },
  "nextQuestion": {
    "fr": "Question suivante",
    "en": "Next question"
  },
  "finishTest": {
    "fr": "Terminer",
    "en": "Finish"
  },
  "feedbackCorrect": {
    "fr": "Bonne r├⌐ponse !",
    "en": "Correct answer!"
  },
  "feedbackWrong": {
    "fr": "Pas tout ├á fait, mais c'est en essayant qu'on apprend !",
    "en": "Not quite, but we learn by trying!"
  },
  "feedbackDontKnow": {
    "fr": "C'est courageux de le dire ! Voici l'explication :",
    "en": "It's brave to say so! Here's the explanation:"
  },
  "encouragements": {
    "fr": [
      "Tu avances bien, continue ! ≡ƒÆ¬",
      "Chaque question est une occasion d'apprendre.",
      "Tu g├¿res ! ≡ƒîƒ",
      "Bien jou├⌐, on continue ! ≡ƒÜÇ",
      "Tu es sur la bonne voie !",
      "Super, encore quelques questions !",
      "Bravo, tu t'en sors tr├¿s bien !",
      "Tu fais des progr├¿s, c'est top ! Γ£¿",
      "Continue comme ├ºa !",
      "G├⌐nial, plus que quelques questions !"
    ],
    "en": [
      "You're doing well, keep going! ≡ƒÆ¬",
      "Every question is a chance to learn.",
      "You've got this! ≡ƒîƒ",
      "Well done, let's keep going! ≡ƒÜÇ",
      "You're on the right track!",
      "Great, just a few more questions!",
      "Bravo, you're doing very well!",
      "You're making progress, awesome! Γ£¿",
      "Keep it up!",
      "Awesome, just a few more to go!"
    ]
  },
  "resumeTitle": {
    "fr": "Tu avais commenc├⌐ un test",
    "en": "You had started a test"
  },
  "resumeBody": {
    "fr": "On dirait que tu as ├⌐t├⌐ interrompu┬╖e. Veux-tu reprendre l├á o├╣ tu en ├⌐tais ?",
    "en": "It looks like you were interrupted. Would you like to pick up where you left off?"
  },
  "resumeYes": {
    "fr": "Reprendre",
    "en": "Resume"
  },
  "resumeNo": {
    "fr": "Recommencer",
    "en": "Start over"
  },
  "introEmoji": "≡ƒô¥",
  "backLabel": {
    "fr": "Retour",
    "en": "Back"
  }
};

window._assessmentBank = [
  {
    "id": "algo1a", "category": "algo", "difficulty": 1,
    "question": "Qu'est-ce qu'un algorithme ?",
    "choices": [
      { "id": "a", "text": "Un type de virus informatique" },
      { "id": "b", "text": "Une s├⌐rie d'├⌐tapes pour r├⌐soudre un probl├¿me" },
      { "id": "c", "text": "Un composant physique de l'ordinateur" }
    ],
    "correctId": "b",
    "explanation": "Un algorithme, c'est comme une recette : une suite d'instructions pour arriver ├á un r├⌐sultat."
  },
  {
    "id": "algo1b", "category": "algo", "difficulty": 1,
    "question": "├Ç quoi sert une variable en programmation ?",
    "choices": [
      { "id": "a", "text": "├Ç stocker une valeur en m├⌐moire" },
      { "id": "b", "text": "├Ç dessiner des formes ├á l'├⌐cran" },
      { "id": "c", "text": "├Ç connecter l'ordinateur ├á Internet" }
    ],
    "correctId": "a",
    "explanation": "Une variable est comme une bo├«te dans laquelle on range une information (un nombre, un texteΓÇª) pour l'utiliser plus tard."
  },
  {
    "id": "algo2a", "category": "algo", "difficulty": 2,
    "question": "Que fait une boucle dans un programme ?",
    "choices": [
      { "id": "a", "text": "Elle arr├¬te le programme" },
      { "id": "b", "text": "Elle r├⌐p├¿te des instructions plusieurs fois" },
      { "id": "c", "text": "Elle affiche des images" },
      { "id": "d", "text": "Elle supprime des fichiers" }
    ],
    "correctId": "b",
    "explanation": "Une boucle permet de r├⌐p├⌐ter un bloc d'instructions sans avoir ├á les r├⌐├⌐crire. Par exemple, afficher les nombres de 1 ├á 100."
  },
  {
    "id": "algo2b", "category": "algo", "difficulty": 2,
    "question": "En Python, que fait l'instruction print(\"Bonjour\") ?",
    "choices": [
      { "id": "a", "text": "Elle imprime une feuille" },
      { "id": "b", "text": "Elle affiche ┬½ Bonjour ┬╗ ├á l'├⌐cran" },
      { "id": "c", "text": "Elle enregistre ┬½ Bonjour ┬╗ dans un fichier" }
    ],
    "correctId": "b",
    "explanation": "print() affiche du texte dans la console. C'est souvent la premi├¿re commande qu'on apprend en Python !"
  },
  {
    "id": "algo3a", "category": "algo", "difficulty": 3,
    "question": "Qu'est-ce qu'une fonction en programmation ?",
    "choices": [
      { "id": "a", "text": "Un bloc de code r├⌐utilisable qui effectue une t├óche pr├⌐cise" },
      { "id": "b", "text": "Un fichier qui contient des images" },
      { "id": "c", "text": "Un type de boucle sp├⌐ciale" },
      { "id": "d", "text": "Un message d'erreur" }
    ],
    "correctId": "a",
    "explanation": "Une fonction regroupe des instructions qu'on peut appeler par leur nom. ├ça ├⌐vite de copier-coller le m├¬me code partout."
  },
  {
    "id": "algo3b", "category": "algo", "difficulty": 3,
    "question": "En Python, que contient la variable x apr├¿s : x = [3, 7, 1] ?",
    "choices": [
      { "id": "a", "text": "Le nombre 371" },
      { "id": "b", "text": "Une liste de trois ├⌐l├⌐ments : 3, 7 et 1" },
      { "id": "c", "text": "Une erreur" }
    ],
    "correctId": "b",
    "explanation": "Les crochets [ ] cr├⌐ent une liste en Python. Ici, x contient trois ├⌐l├⌐ments auxquels on peut acc├⌐der un par un."
  },

  {
    "id": "web1a", "category": "web", "difficulty": 1,
    "question": "Que signifie HTML ?",
    "choices": [
      { "id": "a", "text": "High Tech Modern Language" },
      { "id": "b", "text": "HyperText Markup Language" },
      { "id": "c", "text": "Home Tool for Making Layouts" }
    ],
    "correctId": "b",
    "explanation": "HTML (HyperText Markup Language) est le langage qui structure le contenu des pages web : titres, paragraphes, imagesΓÇª"
  },
  {
    "id": "web1b", "category": "web", "difficulty": 1,
    "question": "Quel langage sert ├á mettre en forme (couleurs, taillesΓÇª) une page web ?",
    "choices": [
      { "id": "a", "text": "Python" },
      { "id": "b", "text": "CSS" },
      { "id": "c", "text": "Excel" }
    ],
    "correctId": "b",
    "explanation": "CSS (Cascading Style Sheets) permet de changer les couleurs, les polices, les espacements et l'apparence d'une page web."
  },
  {
    "id": "web2a", "category": "web", "difficulty": 2,
    "question": "Quelle balise HTML cr├⌐e un lien vers un autre site ?",
    "choices": [
      { "id": "a", "text": "<link>" },
      { "id": "b", "text": "<a>" },
      { "id": "c", "text": "<p>" },
      { "id": "d", "text": "<img>" }
    ],
    "correctId": "b",
    "explanation": "La balise <a> (pour ┬½ anchor ┬╗) cr├⌐e un lien hypertexte. On ├⌐crit par exemple <a href=\"https://...\">Cliquez ici</a>."
  },
  {
    "id": "web2b", "category": "web", "difficulty": 2,
    "question": "Que fait la propri├⌐t├⌐ CSS ┬½ color: red; ┬╗ ?",
    "choices": [
      { "id": "a", "text": "Elle change le fond en rouge" },
      { "id": "b", "text": "Elle change la couleur du texte en rouge" },
      { "id": "c", "text": "Elle ajoute une bordure rouge" }
    ],
    "correctId": "b",
    "explanation": "┬½ color ┬╗ en CSS change la couleur du texte. Pour le fond, on utilise ┬½ background-color ┬╗."
  },
  {
    "id": "web3a", "category": "web", "difficulty": 3,
    "question": "├Ç quoi sert JavaScript sur une page web ?",
    "choices": [
      { "id": "a", "text": "├Ç structurer le contenu (comme HTML)" },
      { "id": "b", "text": "├Ç ajouter de l'interactivit├⌐ (menus, animations, formulairesΓÇª)" },
      { "id": "c", "text": "├Ç stocker les images du site" }
    ],
    "correctId": "b",
    "explanation": "JavaScript rend les pages interactives : r├⌐agir aux clics, valider un formulaire, afficher des animations, etc."
  },
  {
    "id": "web3b", "category": "web", "difficulty": 3,
    "question": "Qu'est-ce que le ┬½ responsive design ┬╗ ?",
    "choices": [
      { "id": "a", "text": "Un site qui r├⌐pond tr├¿s vite" },
      { "id": "b", "text": "Un design qui s'adapte ├á la taille de l'├⌐cran (t├⌐l├⌐phone, tablette, ordinateur)" },
      { "id": "c", "text": "Un site qui fonctionne sans Internet" },
      { "id": "d", "text": "Un site disponible dans plusieurs langues" }
    ],
    "correctId": "b",
    "explanation": "Le responsive design permet ├á un site de s'afficher correctement aussi bien sur un petit t├⌐l├⌐phone que sur un grand ├⌐cran."
  },

  {
    "id": "dig1a", "category": "digital", "difficulty": 1,
    "question": "Qu'est-ce qu'un navigateur web ?",
    "choices": [
      { "id": "a", "text": "Un c├óble qui connecte l'ordinateur ├á Internet" },
      { "id": "b", "text": "Un logiciel pour consulter des sites web (Chrome, FirefoxΓÇª)" },
      { "id": "c", "text": "Un moteur de recherche comme Google" }
    ],
    "correctId": "b",
    "explanation": "Un navigateur est le logiciel qui affiche les pages web. Google est un moteur de recherche, pas un navigateur."
  },
  {
    "id": "dig1b", "category": "digital", "difficulty": 1,
    "question": "Parmi ces ├⌐l├⌐ments, lequel est un p├⌐riph├⌐rique d'entr├⌐e ?",
    "choices": [
      { "id": "a", "text": "L'├⌐cran" },
      { "id": "b", "text": "L'imprimante" },
      { "id": "c", "text": "Le clavier" }
    ],
    "correctId": "c",
    "explanation": "Un p├⌐riph├⌐rique d'entr├⌐e envoie des informations ├á l'ordinateur. Le clavier et la souris en sont des exemples."
  },
  {
    "id": "dig2a", "category": "digital", "difficulty": 2,
    "question": "Qu'est-ce qu'une adresse IP ?",
    "choices": [
      { "id": "a", "text": "Le nom d'un site web" },
      { "id": "b", "text": "Un identifiant unique attribu├⌐ ├á un appareil sur un r├⌐seau" },
      { "id": "c", "text": "Un mot de passe pour se connecter ├á Internet" }
    ],
    "correctId": "b",
    "explanation": "Chaque appareil connect├⌐ ├á un r├⌐seau re├ºoit une adresse IP, un peu comme une adresse postale pour recevoir des donn├⌐es."
  },
  {
    "id": "dig2b", "category": "digital", "difficulty": 2,
    "question": "├Ç quoi sert la m├⌐moire RAM d'un ordinateur ?",
    "choices": [
      { "id": "a", "text": "├Ç stocker les fichiers de fa├ºon permanente" },
      { "id": "b", "text": "├Ç garder temporairement les donn├⌐es en cours d'utilisation" },
      { "id": "c", "text": "├Ç afficher les images ├á l'├⌐cran" },
      { "id": "d", "text": "├Ç se connecter au Wi-Fi" }
    ],
    "correctId": "b",
    "explanation": "La RAM est une m├⌐moire rapide mais temporaire : elle garde les donn├⌐es des applications ouvertes et se vide quand on ├⌐teint l'ordinateur."
  },
  {
    "id": "dig3a", "category": "digital", "difficulty": 3,
    "question": "Qu'est-ce que le chiffrement des donn├⌐es ?",
    "choices": [
      { "id": "a", "text": "Compresser un fichier pour qu'il prenne moins de place" },
      { "id": "b", "text": "Transformer des donn├⌐es pour que seul le destinataire puisse les lire" },
      { "id": "c", "text": "Supprimer d├⌐finitivement des fichiers" }
    ],
    "correctId": "b",
    "explanation": "Le chiffrement prot├¿ge les donn├⌐es en les rendant illisibles sans la bonne cl├⌐. C'est utilis├⌐ pour les messages, les paiements en ligne, etc."
  },
  {
    "id": "dig3b", "category": "digital", "difficulty": 3,
    "question": "Qu'est-ce qu'un logiciel ┬½ open source ┬╗ ?",
    "choices": [
      { "id": "a", "text": "Un logiciel gratuit sans publicit├⌐" },
      { "id": "b", "text": "Un logiciel dont le code source est librement accessible et modifiable" },
      { "id": "c", "text": "Un logiciel qui fonctionne uniquement en ligne" },
      { "id": "d", "text": "Un logiciel cr├⌐├⌐ par le gouvernement" }
    ],
    "correctId": "b",
    "explanation": "┬½ Open source ┬╗ signifie que n'importe qui peut lire, modifier et partager le code du logiciel. Firefox et Linux en sont des exemples."
  }
];
