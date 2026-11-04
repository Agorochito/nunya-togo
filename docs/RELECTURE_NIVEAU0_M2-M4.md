# Relecture — Découverte du numérique, modules 2 à 4

Document généré depuis `content/fr/decouverte/m2` à `m4` pour la relecture. Les bonnes réponses sont marquées ✅ ; à l’écran, les choix des questions sont mélangés. Pour corriger, modifier le fichier source indiqué puis relancer `npm run build`.

À vérifier pour chaque leçon : mots compris par un élève de seconde ? exemples parlants ? durée réaliste ? une seule bonne réponse possible ? explications justes ? Les conseils de sécurité suivent les recommandations générales, sans particularité nationale.

# Module 2 — Internet et le web

## 2.1 Internet, un réseau de réseaux · 8 min · 158 mots

Source : `content/fr/decouverte/m2/dec-m2-01.md` et `.activities.json`

**Objectifs**

- Expliquer comment un message voyage d’un téléphone à un autre.
- Distinguer données mobiles, Wi-Fi et serveur.

**L’idée en 30 secondes.** Internet relie des milliards d’appareils. Tes messages y voyagent découpés en petits paquets, par des antennes, des câbles et des serveurs.

**Comparaison.** Comme un long courrier découpé en enveloppes numérotées : chacune prend le premier taxi libre, et on les remet dans l’ordre à l’arrivée.

**Explication**

Un réseau, ce sont des appareils reliés entre eux qui échangent des informations. Internet est un réseau de réseaux : il relie les réseaux des opérateurs, des entreprises, des écoles et des maisons du monde entier.

Ton téléphone y entre de deux façons. Avec les données mobiles, il communique par ondes avec une antenne-relais de ton opérateur. Avec le Wi-Fi, il se connecte sans fil à un boîtier proche, relié lui-même à Internet. Ensuite, les informations voyagent par des câbles, dont certains passent sous la mer et arrivent sur la côte, à Lomé.

Les informations ne voyagent pas d’un seul bloc. Elles sont découpées en paquets, de petits morceaux numérotés. Chaque appareil connecté a une adresse IP, un numéro qui permet aux paquets de trouver leur chemin.

Beaucoup de services passent par des serveurs : des ordinateurs allumés jour et nuit, rangés dans des centres de données, qui gardent et distribuent les messages, les vidéos et les pages.

**Exemple guidé : Envoyer une photo à un cousin à Kara**

1. Ton téléphone découpe la photo en petits paquets.
2. Les paquets partent par l’antenne de ton opérateur ou par le Wi-Fi.
3. Ils traversent le réseau jusqu’au serveur de la messagerie.
4. Le serveur les transmet au téléphone de ton cousin, qui remet les morceaux dans l’ordre.

**Activités**

1. *Choix unique* — Qu’est-ce qu’un serveur ?
   - ✅ Un ordinateur allumé en permanence qui fournit un service.
   - Le câble qui relie ton chargeur au téléphone.
   - Une application pour regarder des vidéos.
   - Le code secret de ton Wi-Fi.
   - *Explication affichée après réussite :* Un serveur garde et distribue des informations : messages, vidéos, pages web.

2. *Remettre dans l’ordre* — Remets dans l’ordre le trajet d’une photo envoyée par messagerie. (ordre correct, mélangé à l’écran)
   1. Le téléphone découpe la photo en paquets.
   2. Les paquets partent par l’antenne de l’opérateur.
   3. Le serveur de la messagerie les reçoit.
   4. Le téléphone du destinataire reconstitue la photo.
   - *Explication affichée après réussite :* Découpage, envoi, passage par le serveur, puis reconstitution à l’arrivée.

3. *Vrai ou faux* — « Avec les données mobiles, ton téléphone se connecte à Internet par une antenne de ton opérateur. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : en Wi-Fi, il passe par un boîtier proche ; avec les données mobiles, par l’antenne-relais de l’opérateur.

4. *Associer* — Associe chaque mot à sa définition.
   - Wi-Fi → ✅ Connexion sans fil à un boîtier proche
   - Données mobiles → ✅ Connexion par l’antenne de l’opérateur
   - Adresse IP → ✅ Numéro d’un appareil sur le réseau
   - Paquet → ✅ Petit morceau d’une information
   - *Explication affichée après réussite :* Wi-Fi et données mobiles sont deux façons d’entrer sur Internet ; adresses et paquets permettent aux informations d’arriver.

**Explique avec tes mots.** Explique avec tes mots le chemin d’un message vocal que tu envoies à un ami, depuis ta bouche jusqu’à son oreille.

*Réponse possible :* Le micro enregistre ma voix, le téléphone la découpe en paquets et les envoie par l’antenne de mon opérateur. Ils passent par le serveur de la messagerie, puis arrivent sur le téléphone de mon ami, qui les remet dans l’ordre et fait jouer le son.

**Récapitulatif**

- Internet relie des réseaux du monde entier.
- On s’y connecte par les données mobiles ou par le Wi-Fi.
- Les informations voyagent en paquets et passent souvent par des serveurs.

**Mots nouveaux**

- **Réseau** : Appareils reliés entre eux qui échangent des informations.
- **Paquet** : Petit morceau numéroté d’une information qui voyage sur Internet.
- **Adresse IP** : Numéro qui identifie un appareil connecté.
- **Serveur** : Ordinateur allumé en permanence qui fournit un service à d’autres appareils.

---

## 2.2 Le web : pages, liens et adresses · 8 min · 187 mots

Source : `content/fr/decouverte/m2/dec-m2-02.md` et `.activities.json`

**Objectifs**

- Distinguer Internet et le web.
- Lire les parties d’une adresse web.

**L’idée en 30 secondes.** Le web est l’ensemble des pages reliées par des liens. Chaque page a une adresse, comme une maison.

**Comparaison.** Une adresse web se lit comme une adresse de maison : la ville (le site), puis la rue et la porte (la page).

**Explication**

On confond souvent Internet et le web. Internet est le réseau qui transporte les informations. Le web est l’un des services qui l’utilisent, comme la messagerie ou les appels.

Le web est fait de pages. Une page web peut contenir du texte, des images, des vidéos et des liens. Un lien est un mot ou un bouton sur lequel tu appuies pour ouvrir une autre page. Un site web est un ensemble de pages qui appartiennent à la même personne ou à la même organisation.

Chaque page a une adresse, appelée URL. Elle commence souvent par https, la manière dont ton appareil dialogue avec le site. Le « s » signifie que la connexion est chiffrée : les informations échangées sont protégées pendant le trajet. Vient ensuite le nom de domaine, qui désigne le site. Sa terminaison donne parfois le pays : .tg pour le Togo, .fr pour la France. Le chemin, après la barre oblique, mène à une page précise.

Lire l’adresse avant d’appuyer sur un lien est un bon réflexe : un faux site peut copier l’apparence d’un vrai, pas son nom de domaine exact.

**Exemple guidé : Lire l’adresse https://www.lycee-exemple.tg/resultats**

1. https : la façon de communiquer ; le « s » indique une connexion protégée.
2. lycee-exemple.tg : le nom de domaine, c’est-à-dire le site.
3. .tg : la terminaison du pays, ici le Togo.
4. /resultats : le chemin vers une page précise du site.

**Activités**

1. *Choix unique* — Dans https://www.lycee-exemple.tg/resultats, quel est le nom de domaine ?
   - https
   - ✅ lycee-exemple.tg
   - /resultats
   - www
   - *Explication affichée après réussite :* Le nom de domaine désigne le site : ici lycee-exemple.tg.

2. *Vrai ou faux* — « Internet et le web, c’est exactement la même chose. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : Internet est le réseau ; le web est un des services qui passent par ce réseau, comme la messagerie.

3. *Associer* — Associe chaque partie de l’adresse à son rôle.
   - https → ✅ Connexion protégée
   - lycee-exemple.tg → ✅ Nom du site
   - .tg → ✅ Pays : le Togo
   - /resultats → ✅ Chemin vers une page
   - *Explication affichée après réussite :* Une adresse se lit de gauche à droite : protocole, site, puis page.

4. *Choix unique* — À quoi sert un lien sur une page web ?
   - ✅ À ouvrir une autre page ou un autre endroit.
   - À recharger la batterie.
   - À fermer le navigateur.
   - À effacer la page.
   - *Explication affichée après réussite :* Un lien relie les pages entre elles : c’est ce qui fait du web une « toile ».

**Explique avec tes mots.** Ouvre une page web que tu connais. Recopie son adresse et explique avec tes mots chacune de ses parties.

*Réponse possible :* Dans https://fr.wikipedia.org/wiki/Togo, https veut dire que la connexion est protégée, fr.wikipedia.org est le site Wikipédia en français, et /wiki/Togo est le chemin vers l’article sur le Togo.

**Récapitulatif**

- Internet transporte ; le web est un service fait de pages reliées par des liens.
- Une adresse contient le protocole, le nom de domaine et le chemin.
- Lis le nom de domaine avant de faire confiance à une page.

**Mots nouveaux**

- **Web** : Ensemble des pages reliées par des liens et consultées avec un navigateur.
- **Lien** : Mot ou bouton qui ouvre une autre page.
- **URL** : Adresse d’une page web.
- **Nom de domaine** : Partie de l’adresse qui désigne le site, par exemple lycee-exemple.tg.

---

## 2.3 Navigateur et moteur de recherche · 8 min · 163 mots

Source : `content/fr/decouverte/m2/dec-m2-03.md` et `.activities.json`

**Objectifs**

- Distinguer un navigateur et un moteur de recherche.
- Reconnaître une publicité dans les résultats de recherche.

**L’idée en 30 secondes.** Le navigateur affiche les pages ; le moteur de recherche t’aide à trouver lesquelles ouvrir.

**Comparaison.** Le navigateur est le taxi qui t’emmène ; le moteur de recherche est la personne à qui tu demandes le chemin.

**Explication**

Un navigateur est l’application qui affiche les pages web : Chrome, Firefox, Safari ou Opera, par exemple. Il possède une barre d’adresse, des onglets pour ouvrir plusieurs pages à la fois, un historique des pages visitées et des favoris pour retrouver une page rapidement.

Un moteur de recherche est un site qui trouve des pages à partir de mots-clés : Google, Bing ou DuckDuckGo, par exemple. Il parcourt le web à l’avance et classe les pages. Quand tu poses une question, il te propose une liste de résultats.

Dans la barre d’adresse, si tu tapes une adresse exacte, le navigateur ouvre directement le site. Si tu tapes des mots, il lance une recherche avec le moteur choisi.

Les premiers résultats ne sont pas toujours les meilleurs. Certains portent la mention « Sponsorisé » ou « Annonce » : ce sont des publicités payées. Avant d’ouvrir un résultat, lis son titre et son adresse, et demande-toi s’il correspond vraiment à ce que tu cherches.

**Exemple guidé : Trouver le site d’une université**

1. Tu ouvres ton navigateur.
2. Dans la barre d’adresse, tu tapes « université de Lomé ».
3. Tu lis les résultats et l’adresse indiquée sous chaque titre.
4. Tu ouvres le site officiel et tu l’ajoutes à tes favoris.

**Activités**

1. *Associer* — Navigateur ou moteur de recherche ?
   - Chrome → ✅ Navigateur
   - Google → ✅ Moteur de recherche
   - Firefox → ✅ Navigateur
   - Bing → ✅ Moteur de recherche
   - *Explication affichée après réussite :* Chrome et Firefox affichent les pages ; Google et Bing cherchent des pages.

2. *Choix unique* — Un résultat de recherche porte la mention « Sponsorisé ». Qu’est-ce que cela veut dire ?
   - C’est le site le plus fiable.
   - ✅ C’est une publicité payée.
   - C’est un site du gouvernement.
   - C’est une page sans danger garanti.
   - *Explication affichée après réussite :* Une entreprise a payé pour apparaître en haut. Ce n’est pas forcément la meilleure réponse.

3. *Vrai ou faux* — « Si tu tapes une adresse exacte dans la barre d’adresse, le navigateur ouvre directement le site, sans faire de recherche. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : des mots lancent une recherche ; une adresse exacte mène directement au site.

4. *Remettre dans l’ordre* — Remets dans l’ordre pour retrouver facilement un site utile. (ordre correct, mélangé à l’écran)
   1. Ouvrir le navigateur.
   2. Taper des mots-clés dans la barre d’adresse.
   3. Vérifier l’adresse du résultat.
   4. Ajouter la page aux favoris.
   - *Explication affichée après réussite :* On cherche, on vérifie, puis on enregistre la page pour la prochaine fois.

**Explique avec tes mots.** Explique avec tes mots à un camarade la différence entre un navigateur et un moteur de recherche, avec un exemple de chacun.

*Réponse possible :* Le navigateur, comme Chrome, est l’application qui affiche les pages. Le moteur de recherche, comme Google, est un site qui m’aide à trouver quelles pages ouvrir quand je ne connais pas l’adresse.

**Récapitulatif**

- Navigateur : l’application qui affiche les pages.
- Moteur de recherche : le site qui trouve des pages à partir de mots-clés.
- Un résultat « Sponsorisé » est une publicité.

**Mots nouveaux**

- **Navigateur** : Application qui affiche les pages web.
- **Moteur de recherche** : Site qui trouve des pages à partir de mots-clés.
- **Onglet** : Page ouverte en parallèle dans le navigateur.
- **Favori** : Page enregistrée pour la retrouver vite.

---

## 2.4 Chercher efficacement et vérifier une source · 9 min · 164 mots

Source : `content/fr/decouverte/m2/dec-m2-04.md` et `.activities.json`

**Objectifs**

- Choisir des mots-clés précis pour une recherche.
- Vérifier une information avant de la croire ou de la partager.

**L’idée en 30 secondes.** Peu de mots bien choisis donnent de meilleurs résultats. Avant de croire, demande-toi qui parle, quand, pourquoi, et si d’autres le confirment.

**Comparaison.** Comme au marché : avant d’acheter, tu regardes la marchandise et tu compares chez plusieurs vendeurs.

**Explication**

Pour chercher, choisis deux à cinq mots importants plutôt qu’une longue phrase. Pour savoir comment calculer le périmètre d’un cercle, il suffit de taper : périmètre cercle formule. Ajoute un lieu ou une année si cela compte : bourse étudiants Togo 2026.

Quelques astuces aident beaucoup. Des guillemets droits autour de mots cherchent l’expression exacte : "mémoire vive". Un signe moins devant un mot exclut les pages qui le contiennent.

Trouver une page ne suffit pas : il faut vérifier sa source, c’est-à-dire son origine. Pose quatre questions. Qui a écrit ? Une personne nommée, une école, un ministère, un journal connu ? Quand ? Une information ancienne peut ne plus être vraie. Pourquoi ? Pour informer, pour vendre, ou pour faire réagir ? Ailleurs ? Recoupe : cherche si deux autres sources sérieuses disent la même chose.

Sur les messageries, une rumeur se reconnaît souvent : transférée de nombreuses fois, sans auteur, avec un ton urgent. Dans le doute, ne la partage pas.

**Exemple guidé : Un message annonce que les examens sont avancés**

1. Le message est transféré, sans nom d’auteur ni date.
2. Tu cherches l’information sur le site officiel du ministère ou de ton établissement.
3. Tu demandes à ton professeur principal.
4. Rien ne confirme le message : tu ne le partages pas.

**Activités**

1. *Choix unique* — Tu veux savoir comment calculer l’aire d’un triangle. Quels mots taper pour la recherche la plus efficace ?
   - Bonjour, est-ce que quelqu’un peut m’expliquer comment on fait ?
   - ✅ aire triangle formule
   - triangle
   - maths
   - *Explication affichée après réussite :* Trois mots précis décrivent exactement ce que tu cherches.

2. *Associer* — Associe chaque question à ce qu’elle vérifie.
   - Qui ? → ✅ L’auteur ou l’organisation
   - Quand ? → ✅ La date de publication
   - Pourquoi ? → ✅ Le but : informer, vendre ou faire réagir
   - Ailleurs ? → ✅ La confirmation par d’autres sources
   - *Explication affichée après réussite :* Ces quatre questions suffisent pour juger la plupart des informations.

3. *Vrai ou faux* — « Un message transféré par beaucoup de personnes est forcément vrai. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : une rumeur peut circuler très vite. Le nombre de partages ne prouve rien.

4. *Choix unique* — À quoi servent les guillemets dans une recherche, par exemple "mémoire vive" ?
   - ✅ À chercher l’expression exacte.
   - À rendre la recherche plus rapide.
   - À cacher la recherche.
   - À traduire les mots.
   - *Explication affichée après réussite :* Avec les guillemets, le moteur cherche les mots ensemble et dans cet ordre.

**Explique avec tes mots.** Pense à une information que tu as reçue récemment par message. Explique avec tes mots comment tu vérifierais si elle est vraie.

*Réponse possible :* Je regarderais qui l’a écrite et quand. Je chercherais la même information sur un site officiel ou un journal connu. Si personne de sérieux ne la confirme, je ne la partagerais pas.

**Récapitulatif**

- Deux à cinq mots-clés précis valent mieux qu’une longue phrase.
- Qui, quand, pourquoi, ailleurs : quatre questions pour vérifier une source.
- Dans le doute, ne partage pas.

**Mots nouveaux**

- **Mot-clé** : Mot important qui résume ce que tu cherches.
- **Source** : Origine d’une information : personne, organisation ou document.
- **Recouper** : Vérifier qu’une information est confirmée par d’autres sources.
- **Rumeur** : Information qui circule sans preuve ni source claire.

---

## 2.5 Données mobiles : comprendre et économiser ses Mo · 9 min · 174 mots

Source : `content/fr/decouverte/m2/dec-m2-05.md` et `.activities.json`

**Objectifs**

- Estimer ce que consomment les usages courants d’un forfait.
- Régler son téléphone pour économiser des données.

**L’idée en 30 secondes.** Chaque usage d’Internet consomme une partie de ton forfait. La vidéo consomme beaucoup ; quelques réglages évitent les mauvaises surprises.

**Comparaison.** Un forfait, c’est comme un bidon d’eau : un message en verse une goutte, une vidéo en verse un seau.

**Explication**

Un forfait de données se compte en mégaoctets (Mo) ou en gigaoctets (Go). Comme dans la leçon sur le stockage, on retient qu’un Go vaut environ 1 000 Mo.

Tous les usages ne consomment pas autant. Un message texte ne pèse presque rien. Une photo envoyée par messagerie pèse souvent quelques centaines de Ko. Une page web demande quelques Mo. La vidéo est la grande consommatrice : selon la qualité, une minute peut coûter de quelques Mo à plusieurs dizaines de Mo. Un appel vidéo consomme aussi beaucoup.

Quelques réglages protègent ton forfait. Coupe la lecture automatique des vidéos dans les réseaux sociaux. Dans ta messagerie, désactive le téléchargement automatique des photos et vidéos : elles ne se chargent que si tu appuies dessus. Autorise les mises à jour des applications seulement en Wi-Fi. Active l’économiseur de données de ton téléphone.

Enfin, surveille ta consommation : dans les réglages, la rubrique des données ou de la consommation montre quelles applications utilisent le plus de Mo. Le Wi-Fi, lui, ne touche pas à ton forfait.

**Exemple guidé : Ama et son forfait de 1 Go**

1. Ama regarde des vidéos qui consomment environ 10 Mo par minute.
2. En 100 minutes, elle a utilisé 1 000 Mo, soit tout son forfait.
3. Elle coupe le téléchargement automatique des photos et vidéos reçues.
4. Elle télécharge ses vidéos de cours sur le Wi-Fi du lycée pour les regarder ensuite.

**Activités**

1. *Choix unique* — Une vidéo consomme 10 Mo par minute. Combien de minutes peux-tu regarder avec 1 Go (environ 1 000 Mo) ?
   - 10 minutes
   - ✅ 100 minutes
   - 1 000 minutes
   - 10 000 minutes
   - *Explication affichée après réussite :* 1 000 ÷ 10 = 100 : environ 100 minutes, soit un peu plus d’une heure et demie.

2. *Associer* — Associe chaque réglage à son effet.
   - Lecture automatique coupée → ✅ Les vidéos ne démarrent que si tu appuies
   - Téléchargement automatique coupé → ✅ Les photos reçues ne se chargent pas seules
   - Mises à jour en Wi-Fi seulement → ✅ Les grosses mises à jour attendent le Wi-Fi
   - Économiseur de données → ✅ Les applications consomment moins en arrière-plan
   - *Explication affichée après réussite :* Ces quatre réglages évitent que ton forfait soit utilisé sans que tu le décides.

3. *Vrai ou faux* — « Une vidéo regardée avec le Wi-Fi du lycée ne consomme pas ton forfait de données mobiles. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : en Wi-Fi, ton téléphone passe par le boîtier du lycée, pas par ton forfait.

4. *Choix unique* — Où vois-tu quelles applications consomment le plus de données ?
   - Dans la galerie de photos.
   - ✅ Dans les réglages, rubrique données ou consommation.
   - Dans la calculatrice.
   - Sur l’écran de verrouillage.
   - *Explication affichée après réussite :* Les réglages affichent la consommation de chaque application sur la période choisie.

**Explique avec tes mots.** Ouvre la rubrique de consommation de données de ton téléphone. Explique avec tes mots quelle application consomme le plus et ce que tu pourrais changer.

*Réponse possible :* C’est l’application de vidéos qui consomme le plus. Je vais baisser la qualité des vidéos, couper la lecture automatique et télécharger les vidéos utiles quand je suis en Wi-Fi.

**Récapitulatif**

- 1 Go vaut environ 1 000 Mo ; la vidéo est le plus gros consommateur.
- Lecture automatique et téléchargement automatique coupés, mises à jour en Wi-Fi.
- Les réglages montrent quelle application consomme le plus.

**Mots nouveaux**

- **Forfait** : Quantité de données, d’appels ou de SMS achetée pour une durée.
- **Mo** : Mégaoctet, unité de quantité de données.
- **Économiseur de données** : Réglage qui limite ce que les applications consomment en arrière-plan.

---

# Module 3 — Fichiers, logiciels et sécurité de base

## 3.1 Fichiers, dossiers et extensions · 8 min · 180 mots

Source : `content/fr/decouverte/m3/dec-m3-01.md` et `.activities.json`

**Objectifs**

- Distinguer un fichier, un dossier et un chemin.
- Reconnaître le type d’un fichier grâce à son extension.

**L’idée en 30 secondes.** Tout ce que tu enregistres est un fichier. Les dossiers les rangent, et l’extension indique quel genre de fichier c’est.

**Comparaison.** Un dossier est comme un tiroir de classeur, un fichier comme une feuille rangée dedans, et l’extension comme l’étiquette « photo » ou « cours » collée dessus.

**Explication**

Un fichier est un ensemble d’informations enregistré sous un nom : une photo, un document, une chanson, une application. Un dossier sert à ranger des fichiers, et peut contenir d’autres dossiers. Le chemin d’un fichier indique la suite de dossiers à ouvrir pour le trouver, par exemple Documents › Lycée › Maths.

Le nom d’un fichier se termine souvent par une extension : quelques lettres après le dernier point. Elle indique le type de fichier, et donc l’application qui peut l’ouvrir. .pdf est un document à lire, .docx un document de traitement de texte, .jpg une photo, .mp3 un son, .mp4 une vidéo. Sur Android, .apk désigne une application à installer : comme tu l’as vu, un tel fichier reçu par message mérite la plus grande prudence.

Renommer l’extension ne transforme pas le fichier. Une photo renommée en .pdf reste une photo, et l’appareil risque de ne plus savoir l’ouvrir. Pour changer de format, il faut une application qui convertit.

Chaque fichier a aussi une taille, en Ko, Mo ou Go. Elle compte quand tu l’envoies avec tes données mobiles.

**Exemple guidé : Où se trouve ton exposé ?**

1. Ton exposé s’appelle expose-svt.docx.
2. Le nom est expose-svt et l’extension .docx indique un document de traitement de texte.
3. Il est rangé dans le dossier SVT, lui-même dans le dossier Lycée.
4. Son chemin est : Documents › Lycée › SVT › expose-svt.docx.

**Activités**

1. *Associer* — Associe chaque extension au type de fichier.
   - .pdf → ✅ Document à lire
   - .jpg → ✅ Photo
   - .mp3 → ✅ Son
   - .mp4 → ✅ Vidéo
   - *Explication affichée après réussite :* L’extension renseigne sur le contenu et sur l’application qui l’ouvre.

2. *Choix unique* — Quelle est l’extension du fichier rapport.final.docx ?
   - rapport
   - .final
   - ✅ .docx
   - rapport.final
   - *Explication affichée après réussite :* L’extension est ce qui suit le dernier point : .docx.

3. *Vrai ou faux* — « Renommer photo.jpg en photo.pdf la transforme en document PDF. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : le contenu reste une photo. Pour changer de format, il faut une application de conversion.

4. *Choix unique* — Tu reçois par message un fichier jeu-gratuit.apk. Qu’est-ce que c’est ?
   - Une photo du jeu.
   - ✅ Une application Android à installer : prudence.
   - Une chanson.
   - Un document PDF.
   - *Explication affichée après réussite :* Un .apk installe une application. Hors de la boutique officielle, il peut contenir un programme malveillant.

**Explique avec tes mots.** Ouvre l’application Fichiers ou Gestionnaire de fichiers de ton téléphone. Choisis un fichier et explique avec tes mots son nom, son extension, sa taille et son chemin.

*Réponse possible :* Le fichier releve-notes.pdf est un document PDF de 240 Ko. Il se trouve dans Stockage interne › Download, parce que je l’ai téléchargé depuis un message.

**Récapitulatif**

- Un fichier contient des informations ; un dossier range des fichiers.
- L’extension, après le point, indique le type de fichier.
- Changer l’extension ne convertit pas le fichier.

**Mots nouveaux**

- **Fichier** : Ensemble d’informations enregistré sous un nom.
- **Dossier** : Emplacement qui range des fichiers et d’autres dossiers.
- **Chemin** : Suite de dossiers qui mène à un fichier.
- **Extension** : Lettres après le point qui indiquent le type d’un fichier.

---

## 3.2 Ranger et retrouver ses documents · 8 min · 151 mots

Source : `content/fr/decouverte/m3/dec-m3-02.md` et `.activities.json`

**Objectifs**

- Donner à un fichier un nom clair et facile à trier.
- Organiser ses dossiers pour retrouver un document en quelques secondes.

**L’idée en 30 secondes.** Un nom clair et un dossier à sa place font gagner du temps le jour où tu cherches un document.

**Comparaison.** Comme dans une chambre bien rangée : chaque chose a sa place, et tu la retrouves même dans le noir.

**Explication**

Un fichier mal nommé est un fichier perdu. « IMG_2041 » ou « Nouveau document (3) » ne disent rien de leur contenu. Un bon nom répond à trois questions : quoi, sur quel sujet, et quand. Par exemple : maths_devoir-fonctions_2026-03-12.

Écris la date dans l’ordre année-mois-jour. Ainsi, quand l’appareil trie les noms par ordre alphabétique, il les range aussi dans l’ordre chronologique. Remplace les espaces par des tirets ou des traits de soulignement : certains sites les transforment mal.

Crée peu de dossiers, mais des dossiers logiques : un dossier par année, puis un par matière, et un dossier Administratif pour les reçus, bulletins et papiers importants. Le dossier Téléchargements se remplit tout seul : vide-le régulièrement en rangeant ce qui compte et en supprimant le reste.

Pour retrouver un document, utilise la recherche de l’application Fichiers : un bon nom permet de le trouver en tapant un seul mot.

**Exemple guidé : Kossi range ses photos de cours**

1. Sa galerie contient IMG_2041.jpg, IMG_2042.jpg et beaucoup d’autres.
2. Il crée un dossier Lycée › Physique.
3. Il renomme la photo en physique_ondes_2026-03-12.jpg.
4. Il la déplace dans le dossier Physique.

**Activités**

1. *Choix unique* — Quel nom de fichier est le plus clair ?
   - IMG_2041.jpg
   - Nouveau document (3).docx
   - ✅ svt_expose-photosynthese_2026-04-02.docx
   - truc final final.docx
   - *Explication affichée après réussite :* Il dit la matière, le sujet et la date, sans espaces.

2. *Remettre dans l’ordre* — Remets ces noms dans l’ordre où l’appareil les trie (ordre alphabétique). (ordre correct, mélangé à l’écran)
   1. notes_2025-11-03
   2. notes_2026-01-15
   3. notes_2026-02-09
   4. notes_2026-10-01
   - *Explication affichée après réussite :* Avec l’année d’abord, l’ordre alphabétique est aussi l’ordre des dates.

3. *Vrai ou faux* — « Le dossier Téléchargements range automatiquement tes fichiers par matière. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : tout y arrive en vrac. C’est à toi de ranger et de faire le tri.

4. *Associer* — Dans quel dossier ranger chaque fichier ?
   - Photo d’un cours de physique → ✅ Lycée › Physique
   - Reçu de paiement des frais de scolarité → ✅ Administratif
   - Exposé d’histoire → ✅ Lycée › Histoire
   - Bulletin du premier trimestre → ✅ Administratif
   - *Explication affichée après réussite :* Les cours vont dans leur matière ; les papiers officiels dans Administratif.

**Explique avec tes mots.** Propose avec tes mots une organisation de dossiers pour ton année scolaire, puis un nom clair pour ton prochain devoir.

*Réponse possible :* Un dossier Lycée-2026 avec un sous-dossier par matière, et un dossier Administratif. Pour mon devoir d’histoire du 20 mars : histoire_devoir-independance_2026-03-20.

**Récapitulatif**

- Un bon nom dit quoi, sur quel sujet et quand.
- La date en année-mois-jour se trie dans l’ordre.
- Range par année et par matière ; vide le dossier Téléchargements.

**Mots nouveaux**

- **Renommer** : Changer le nom d’un fichier ou d’un dossier.
- **Déplacer** : Mettre un fichier dans un autre dossier.
- **Trier** : Ranger des éléments dans un ordre : alphabétique, par date, par taille.

---

## 3.3 Mots de passe et double vérification · 9 min · 186 mots

Source : `content/fr/decouverte/m3/dec-m3-03.md` et `.activities.json`

**Objectifs**

- Créer un mot de passe solide et facile à retenir.
- Activer une double vérification sur un compte important.

**L’idée en 30 secondes.** Un mot de passe long et unique protège un compte. La double vérification ajoute une deuxième serrure.

**Comparaison.** Le mot de passe est la clé de ta maison ; la double vérification, c’est le gardien qui demande en plus à te reconnaître.

**Explication**

Un compte, c’est ton espace personnel sur une application ou un site : messagerie, e-mail, réseau social. Le mot de passe prouve que c’est bien toi.

Un mot de passe solide est d’abord long : au moins 12 caractères. Le plus simple est une phrase de passe, plusieurs mots sans lien entre eux, par exemple mangue-pirogue-lagune-73. Évite ton prénom, ta date de naissance, « 123456 » ou « motdepasse » : ce sont les premiers essayés.

Utilise un mot de passe différent pour chaque compte important. Si un site se fait voler ses données, les pirates essaient le même mot de passe partout ailleurs. Ne le donne à personne, même à un ami. Un gestionnaire de mots de passe peut les retenir pour toi.

La double vérification ajoute une étape : en plus du mot de passe, il faut un code reçu par SMS ou affiché par une application. Même si quelqu’un connaît ton mot de passe, il ne peut pas entrer sans ce code. Ce code de vérification ne se donne jamais, à personne : celui qui te le demande essaie de prendre ton compte.

**Exemple guidé : Protéger son compte WhatsApp**

1. Ouvre Paramètres, puis Compte.
2. Choisis « Vérification en deux étapes », puis Activer.
3. Choisis un code PIN à 6 chiffres que toi seul connais.
4. Ajoute une adresse e-mail pour pouvoir récupérer ce code.

**Activités**

1. *Choix unique* — Quel mot de passe est le plus solide ?
   - Kossi2008
   - 123456789
   - ✅ mangue-pirogue-lagune-73
   - motdepasse
   - *Explication affichée après réussite :* Il est long, mélange plusieurs mots sans lien et ne contient aucune information personnelle.

2. *Vrai ou faux* — « On peut donner le code de vérification reçu par SMS à un ami de confiance. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : ce code ouvre ton compte. Personne n’en a besoin à part toi.

3. *Remettre dans l’ordre* — Remets dans l’ordre l’activation de la vérification en deux étapes sur WhatsApp. (ordre correct, mélangé à l’écran)
   1. Ouvrir Paramètres, puis Compte.
   2. Choisir « Vérification en deux étapes ».
   3. Saisir un code PIN à 6 chiffres.
   4. Ajouter une adresse e-mail de secours.
   - *Explication affichée après réussite :* Le PIN protège le compte ; l’e-mail permet de le récupérer si tu l’oublies.

4. *Choix unique* — Tu utilises le même mot de passe partout, et un site se fait voler ses données. Quel est le risque ?
   - Aucun, ton téléphone est protégé.
   - ✅ Les pirates peuvent essayer ce mot de passe sur tes autres comptes.
   - Ton forfait va baisser.
   - Ton téléphone va s’éteindre.
   - *Explication affichée après réussite :* C’est pourquoi chaque compte important doit avoir son propre mot de passe.

**Explique avec tes mots.** Explique avec tes mots à un proche pourquoi il ne doit pas utiliser le même mot de passe partout, et comment en créer un solide.

*Réponse possible :* Si un site est piraté, le voleur essaiera le même mot de passe sur tous ses comptes. Il vaut mieux une phrase de passe longue, avec des mots sans lien, différente pour chaque compte important.

**Récapitulatif**

- Long et unique : une phrase de passe d’au moins 12 caractères.
- Un mot de passe ne se partage pas.
- La double vérification demande un code en plus ; ce code ne se donne jamais.

**Mots nouveaux**

- **Compte** : Espace personnel sur une application ou un site.
- **Phrase de passe** : Mot de passe fait de plusieurs mots, long et facile à retenir.
- **Double vérification** : Connexion qui demande le mot de passe et un code supplémentaire.

---

## 3.4 Repérer un message ou un appel suspect · 9 min · 206 mots

Source : `content/fr/decouverte/m3/dec-m3-04.md` et `.activities.json`

**Objectifs**

- Reconnaître les signes d’une tentative d’arnaque par message, e-mail ou appel.
- Réagir sans donner ses codes, ses comptes ni son argent.

**L’idée en 30 secondes.** Urgence, offre trop belle, demande de code ou lien inattendu : ces signes doivent t’arrêter. Vérifie toujours par un autre moyen avant d’agir.

**Comparaison.** Comme un inconnu qui sonne en se disant technicien et demande la clé : avant d’ouvrir, tu appelles toi-même l’entreprise pour vérifier.

**Explication**

Les escrocs utilisent des messages, des e-mails, des appels et de faux sites pour obtenir tes mots de passe, tes codes ou ton argent. On appelle cela l’hameçonnage : ils lancent un appât et attendent que tu mordes.

Quatre signes doivent t’alerter. L’urgence ou la menace : « réponds dans dix minutes », « ton compte sera fermé », pour t’empêcher de réfléchir. L’offre trop belle : un prix, un cadeau ou un travail que tu n’as jamais demandés. La demande d’informations secrètes : mot de passe, code de vérification, code de carte. Le lien ou la pièce jointe inattendus, avec une adresse étrange, raccourcie ou mal écrite.

Une règle ne change jamais : aucun service sérieux, banque, réseau social ou service client, ne te demande ton mot de passe ou un code secret par message ou par téléphone. Ne clique pas sur le lien : ouvre toi-même l’application ou le site officiel. Si quelqu’un se présente comme un proche avec un nouveau numéro, appelle-le sur le numéro que tu connais déjà.

Si tu as déjà cliqué ou donné un code, agis vite : change ton mot de passe, préviens le service concerné et parles-en à un adulte de confiance. Puis supprime et signale le message.

**Exemple guidé : Un message annonce que ton compte sera bloqué**

1. « Votre compte sera bloqué dans 24 h, cliquez ici pour le réactiver. »
2. Tu repères l’urgence et le lien inattendu.
3. Tu n’appuies pas sur le lien.
4. Tu ouvres toi-même l’application officielle du service : aucun problème n’est signalé. Tu supprimes et signales le message.

**Activités**

1. *Associer* — Associe chaque phrase au signe d’arnaque qu’elle montre.
   - « Réponds dans 10 minutes ou ton compte sera fermé » → ✅ Urgence ou menace
   - « Félicitations, tu as gagné un téléphone neuf » → ✅ Offre trop belle
   - « Envoie-moi le code que tu viens de recevoir » → ✅ Demande d’information secrète
   - « Ouvre vite ce lien : bit.ly/cadeau-promo » → ✅ Lien inattendu
   - *Explication affichée après réussite :* Un seul de ces signes suffit pour s’arrêter et vérifier.

2. *Vrai ou faux* — « Le service client d’une banque ou d’un réseau social peut te demander ton mot de passe par téléphone. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : aucun service sérieux n’en a besoin. Celui qui le demande essaie de prendre ton compte.

3. *Remettre dans l’ordre* — Tu reçois un message suspect. Remets les bonnes réactions dans l’ordre. (ordre correct, mélangé à l’écran)
   1. T’arrêter sans cliquer sur le lien.
   2. Repérer les signes : urgence, offre, demande de code.
   3. Vérifier par toi-même dans l’application ou sur le site officiel.
   4. Supprimer et signaler le message.
   - *Explication affichée après réussite :* On ne réagit pas dans la précipitation : on s’arrête, on observe, on vérifie, puis on signale.

4. *Choix unique* — Un numéro inconnu écrit : « C’est moi, ton cousin, j’ai changé de numéro, envoie-moi de l’argent vite. » Que fais-tu ?
   - J’envoie l’argent, c’est la famille.
   - ✅ J’appelle mon cousin sur le numéro que je connais pour vérifier.
   - Je donne mon code pour qu’il se serve.
   - Je transfère le message à tous mes contacts.
   - *Explication affichée après réussite :* Vérifier par un autre moyen déjoue la plupart des arnaques.

**Explique avec tes mots.** Explique avec tes mots à un membre de ta famille comment reconnaître un faux message, avec un exemple que tu as déjà vu ou entendu.

*Réponse possible :* Un message disait que j’avais gagné un téléphone et qu’il fallait payer les frais d’envoi avant ce soir. C’était une offre trop belle, avec de l’urgence. Il ne faut jamais payer ni donner de code ; on vérifie par un autre moyen et on supprime.

**Récapitulatif**

- Urgence, offre trop belle, demande de code, lien inattendu : stop.
- Aucun service sérieux ne demande ton mot de passe ou un code secret.
- Vérifie par un autre moyen ; si tu as cliqué, change ton mot de passe et préviens.

**Mots nouveaux**

- **Hameçonnage** : Arnaque qui imite une personne ou un service connu pour voler des codes, des comptes ou de l’argent.
- **Code secret** : Code que toi seul dois connaître, comme un mot de passe ou le code d’une carte.
- **Signaler** : Prévenir l’application ou le service qu’un message ou un compte est frauduleux.

---

## 3.5 Sauvegarder pour ne rien perdre · 8 min · 175 mots

Source : `content/fr/decouverte/m3/dec-m3-05.md` et `.activities.json`

**Objectifs**

- Expliquer ce qu’est une vraie sauvegarde.
- Mettre en place une routine de sauvegarde adaptée.

**L’idée en 30 secondes.** Un appareil peut être perdu, volé ou tomber en panne. Une sauvegarde est une copie gardée ailleurs, qu’on vérifie et qu’on refait régulièrement.

**Comparaison.** C’est comme confier un double de la clé de ta maison à un proche : si tu perds la tienne, tu peux quand même rentrer.

**Explication**

Un téléphone peut tomber dans l’eau, être volé ou refuser de s’allumer. Si tes photos et tes devoirs n’existent qu’à cet endroit, ils disparaissent avec lui. Sauvegarder, c’est faire une copie de tes fichiers importants ailleurs que sur l’appareil.

Retiens une règle simple : au moins deux copies, dont une hors de l’appareil. Plusieurs solutions existent. Le stockage en ligne, ou cloud, comme Google Drive ou iCloud, garde tes fichiers sur des serveurs : ils te suivent si tu changes de téléphone, mais il faut une connexion et l’espace gratuit est limité. Une clé USB ou l’ordinateur familial gardent une copie à la maison, sans Internet. Une carte SD rangée dans le téléphone ne protège pas contre le vol ou la perte : elle part avec lui.

Ta messagerie propose aussi une sauvegarde des conversations dans ses réglages. Programme-la en Wi-Fi pour ne pas consommer ton forfait.

Une sauvegarde n’est utile que si elle est récente et lisible : refais-la régulièrement, par exemple chaque semaine, et ouvre de temps en temps une copie pour vérifier.

**Exemple guidé : Afi protège ses exposés**

1. Ses exposés sont dans le dossier Lycée de son téléphone.
2. Chaque vendredi, elle les copie sur la clé USB familiale.
3. Quand elle a du Wi-Fi, elle les envoie aussi sur son espace en ligne.
4. Elle ouvre une copie pour vérifier qu’elle fonctionne.

**Activités**

1. *Choix unique* — Dans quelle situation la photo est-elle vraiment sauvegardée ?
   - Elle est seulement dans la galerie.
   - Elle est dans la galerie et sur la carte SD du même téléphone.
   - ✅ Elle est dans la galerie et sur un espace en ligne.
   - Elle est dans la corbeille.
   - *Explication affichée après réussite :* La copie en ligne existe hors du téléphone : elle survit à une perte ou à un vol.

2. *Vrai ou faux* — « Des fichiers copiés sur un espace en ligne restent disponibles si ton téléphone est volé. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : la copie est sur des serveurs, pas dans le téléphone. Tu la retrouves en te connectant à ton compte depuis un autre appareil.

3. *Associer* — Associe chaque solution à sa principale limite.
   - Stockage en ligne → ✅ Il faut une connexion et l’espace gratuit est limité
   - Clé USB → ✅ Petite, elle peut se perdre
   - Ordinateur familial → ✅ La copie reste à la maison
   - Carte SD dans le téléphone → ✅ Elle disparaît avec le téléphone
   - *Explication affichée après réussite :* Aucune solution n’est parfaite ; c’est pourquoi on garde au moins deux copies.

4. *Remettre dans l’ordre* — Remets dans l’ordre une bonne routine de sauvegarde. (ordre correct, mélangé à l’écran)
   1. Choisir les fichiers importants.
   2. Les copier sur un autre support.
   3. Vérifier que la copie s’ouvre.
   4. Recommencer la semaine suivante.
   - *Explication affichée après réussite :* Choisir, copier, vérifier, recommencer : une routine simple et efficace.

**Explique avec tes mots.** Fais la liste de ce que tu serais le plus triste de perdre sur ton téléphone. Explique avec tes mots où tu vas en garder une deuxième copie, et à quel rythme.

*Réponse possible :* Mes photos de famille et mes cours photographiés. Je vais activer la sauvegarde des photos en Wi-Fi et copier mes cours sur l’ordinateur de la maison chaque dimanche.

**Récapitulatif**

- Au moins deux copies, dont une hors de l’appareil.
- Cloud, clé USB, ordinateur : chacun a ses avantages ; une carte SD dans le téléphone ne suffit pas.
- Une sauvegarde se refait régulièrement et se vérifie.

**Mots nouveaux**

- **Sauvegarde** : Copie de fichiers gardée ailleurs, pour les retrouver en cas de problème.
- **Cloud** : Stockage en ligne sur des serveurs, accessible avec une connexion.
- **Restaurer** : Remettre des fichiers sur un appareil à partir d’une sauvegarde.

---

# Module 4 — Penser comme un programmeur

## 4.1 Un algorithme, une recette précise · 8 min · 171 mots

Source : `content/fr/decouverte/m4/dec-m4-01.md` et `.activities.json`

**Objectifs**

- Définir un algorithme avec tes mots.
- Rendre précise une instruction vague.

**L’idée en 30 secondes.** Un algorithme est une suite finie d’instructions précises qui mène à un résultat. Un ordinateur l’exécute à la lettre, sans rien deviner.

**Comparaison.** C’est une recette de cuisine écrite pour quelqu’un qui n’a jamais cuisiné : chaque quantité et chaque durée doivent être dites.

**Explication**

Depuis le début du cours, tu as vu qu’un appareil suit des instructions. Une suite d’instructions qui résout un problème s’appelle un algorithme. Un programme, c’est un algorithme écrit dans un langage que l’ordinateur comprend, comme Python.

Un bon algorithme a trois qualités. Il part d’entrées connues : les ingrédients, les données. Ses étapes sont précises et dans le bon ordre. Il se termine et donne un résultat.

La précision est essentielle. Une personne comprend « mets un peu de sucre » ; un ordinateur, non. Il lui faut une quantité : 2 cuillères. « Attends un moment » devient « attends 10 minutes ». Si une étape est floue ou manquante, l’ordinateur ne la complète pas avec son bon sens : il s’arrête, ou il fait exactement ce qui est écrit, même si c’est absurde.

Tu utilises déjà des algorithmes sans le savoir : la méthode de la division posée, l’itinéraire pour aller au lycée, la marche à suivre pour recharger ton crédit. Programmer, c’est d’abord savoir les écrire clairement.

**Exemple guidé : Préparer la bouillie de mil**

1. Faire bouillir 1 litre d’eau.
2. Délayer 4 cuillères de farine de mil dans un bol d’eau froide.
3. Verser le mélange dans l’eau bouillante en remuant.
4. Laisser cuire 10 minutes en remuant, puis ajouter 2 cuillères de sucre.

**Activités**

1. *Choix unique* — Qu’est-ce qu’un algorithme ?
   - Un appareil électronique.
   - ✅ Une suite d’instructions précises qui mène à un résultat.
   - Un mot de passe très long.
   - Une application de calcul.
   - *Explication affichée après réussite :* Un algorithme est une méthode, pas un objet : on peut l’écrire sur papier avant de le programmer.

2. *Associer* — Associe chaque instruction vague à sa version précise.
   - Mets un peu d’eau → ✅ Verse 1 litre d’eau
   - Attends un moment → ✅ Attends 10 minutes
   - Avance un peu → ✅ Avance de 200 mètres
   - Ajoute du sucre → ✅ Ajoute 2 cuillères de sucre
   - *Explication affichée après réussite :* Une instruction précise donne une quantité, une durée ou une distance.

3. *Vrai ou faux* — « Un ordinateur sait combien mettre quand on lui dit « mets un peu de sel ». » → ✅ Faux
   - *Explication affichée après réussite :* Faux : « un peu » n’a pas de valeur précise. Il faut écrire une quantité.

4. *Remettre dans l’ordre* — Remets dans l’ordre l’algorithme pour appeler quelqu’un. (ordre correct, mélangé à l’écran)
   1. Déverrouiller le téléphone.
   2. Ouvrir l’application Téléphone.
   3. Composer le numéro.
   4. Appuyer sur Appeler.
   - *Explication affichée après réussite :* Chaque étape a besoin de la précédente : l’ordre fait partie de l’algorithme.

**Explique avec tes mots.** Écris avec tes mots l’algorithme pour recharger du crédit sur un téléphone, comme pour quelqu’un qui ne l’a jamais fait. Chaque étape doit être précise.

*Réponse possible :* 1. Gratter la carte de recharge pour voir le code. 2. Ouvrir l’application Téléphone. 3. Taper le code de recharge de mon opérateur, puis les chiffres de la carte, puis la touche #. 4. Appuyer sur Appeler. 5. Lire le message qui confirme le nouveau solde.

**Récapitulatif**

- Un algorithme : des entrées, des étapes précises dans l’ordre, un résultat.
- Un ordinateur ne devine rien : chaque quantité et chaque durée doivent être écrites.
- Un programme est un algorithme écrit dans un langage informatique.

**Mots nouveaux**

- **Algorithme** : Suite finie d’instructions précises qui résout un problème.
- **Instruction** : Ordre simple donné à une personne ou à une machine.
- **Programme** : Algorithme écrit dans un langage que l’ordinateur comprend.

---

## 4.2 Découper un problème en étapes · 8 min · 160 mots

Source : `content/fr/decouverte/m4/dec-m4-02.md` et `.activities.json`

**Objectifs**

- Découper un problème en sous-problèmes simples.
- Ordonner ces sous-problèmes pour obtenir le résultat.

**L’idée en 30 secondes.** Un grand problème devient facile quand on le découpe en petits problèmes, résolus l’un après l’autre.

**Comparaison.** On ne mange pas un régime de bananes d’un coup : on le détache banane par banane.

**Explication**

Devant un problème qui paraît compliqué, les programmeurs ne cherchent pas tout d’un coup. Ils le découpent en sous-problèmes : des morceaux plus petits, chacun assez simple pour être résolu seul. Cette méthode s’appelle la décomposition.

Prends le calcul d’une moyenne avec coefficients. D’un bloc, cela semble long. Découpé, c’est simple : rassembler les notes et les coefficients, multiplier chaque note par son coefficient, additionner les points, additionner les coefficients, diviser le premier total par le second.

Pour découper, pose-toi deux questions. De quoi ai-je besoin au départ ? Quelles étapes transforment ce départ en résultat ? Puis vérifie l’ordre : on ne peut pas diviser avant d’avoir additionné.

Ce découpage a deux avantages. Chaque morceau se vérifie facilement : si la moyenne est fausse, tu sais où regarder. Et un même morceau peut resservir : « additionner une liste de nombres » sert dans beaucoup d’autres problèmes. En Python, ces morceaux deviendront des lignes de code, puis des fonctions.

**Exemple guidé : Calculer une moyenne avec coefficients**

1. Notes : maths 12 (coefficient 3), français 15 (coefficient 2), anglais 9 (coefficient 1).
2. Multiplier chaque note par son coefficient : 36, 30 et 9.
3. Additionner les points : 36 + 30 + 9 = 75 ; additionner les coefficients : 3 + 2 + 1 = 6.
4. Diviser : 75 ÷ 6 = 12,5. La moyenne est 12,5.

**Activités**

1. *Remettre dans l’ordre* — Remets dans l’ordre les étapes du calcul d’une moyenne avec coefficients. (ordre correct, mélangé à l’écran)
   1. Multiplier chaque note par son coefficient.
   2. Additionner les points obtenus.
   3. Additionner les coefficients.
   4. Diviser le total des points par le total des coefficients.
   - *Explication affichée après réussite :* La division se fait en dernier, quand les deux totaux sont connus.

2. *Choix unique* — Maths 12 (coefficient 3), français 15 (coefficient 2), anglais 9 (coefficient 1) : quel est le total des points ?
   - 36
   - 45
   - ✅ 75
   - 12,5
   - *Explication affichée après réussite :* 12 × 3 = 36, 15 × 2 = 30, 9 × 1 = 9 ; 36 + 30 + 9 = 75.

3. *Vrai ou faux* — « Un même sous-problème, comme additionner une liste de nombres, peut resservir dans d’autres problèmes. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : c’est un des grands avantages du découpage. En programmation, ces morceaux deviennent des fonctions.

4. *Choix unique* — Pour organiser une sortie de classe, tu as : choisir le lieu, demander l’autorisation, réserver le transport. Quel sous-problème manque ?
   - ✅ Calculer le coût et collecter l’argent.
   - Changer de lycée.
   - Acheter un téléphone.
   - Supprimer ses photos.
   - *Explication affichée après réussite :* Sans budget ni argent collecté, le transport ne peut pas être réservé.

**Explique avec tes mots.** Choisis un projet de ta vie quotidienne, comme organiser une sortie de classe. Découpe-le avec tes mots en quatre ou cinq sous-problèmes, dans l’ordre.

*Réponse possible :* Pour la sortie : choisir le lieu et la date, calculer le coût par élève, demander l’accord des parents et du proviseur, collecter l’argent, réserver le transport.

**Récapitulatif**

- Décomposer : transformer un grand problème en sous-problèmes simples.
- Chaque sous-problème se résout et se vérifie seul.
- L’ordre des étapes compte.

**Mots nouveaux**

- **Décomposition** : Méthode qui découpe un problème en sous-problèmes plus simples.
- **Sous-problème** : Petite partie d’un problème, résolue séparément.
- **Coefficient** : Nombre qui donne plus ou moins de poids à une note.

---

## 4.3 Décider : si… alors… sinon · 8 min · 187 mots

Source : `content/fr/decouverte/m4/dec-m4-03.md` et `.activities.json`

**Objectifs**

- Écrire une règle de décision avec si, alors et sinon.
- Appliquer une condition, y compris dans les cas limites.

**L’idée en 30 secondes.** Un programme choisit quoi faire grâce à des conditions : si une condition est vraie, il fait une chose ; sinon, il en fait une autre.

**Comparaison.** Comme toi le matin : si le ciel est gris, alors tu prends ton parapluie, sinon tu le laisses.

**Explication**

Un programme ne fait pas toujours la même chose : il réagit à la situation. Pour cela, il utilise une condition, une affirmation qui est soit vraie, soit fausse. « La note est supérieure ou égale à 10 » est une condition : pour 12, elle est vraie ; pour 8, elle est fausse.

On l’écrit sous la forme : si condition, alors action, sinon autre action. Par exemple : si la note est supérieure ou égale à 10, alors afficher « Admis », sinon afficher « Ajourné ».

Fais attention aux cas limites, ces valeurs juste à la frontière. Avec « supérieure ou égale à 10 », un 10 est admis. Avec « supérieure à 10 », il ne l’est pas. Un seul mot change le résultat.

On peut combiner des conditions. Avec « et », les deux doivent être vraies : pour entrer au match, il faut un billet et avoir plus de 12 ans. Avec « ou », une seule suffit : on peut payer en espèces ou par mobile money.

Tu retrouveras exactement cette idée en Python, avec les mots if et else.

**Exemple guidé : Rentrer du lycée**

1. Condition : il me reste au moins 300 F.
2. Si c’est vrai, alors je prends un taxi-moto.
3. Sinon, je rentre à pied.
4. Avec 500 F, la condition est vraie : je prends le taxi-moto.

**Activités**

1. *Choix unique* — Règle : si la note est supérieure ou égale à 10, alors « Admis », sinon « Ajourné ». La note est 10. Que s’affiche-t-il ?
   - ✅ Admis
   - Ajourné
   - Rien
   - Une erreur
   - *Explication affichée après réussite :* 10 est égal à 10 : la condition « supérieure ou égale » est vraie.

2. *Associer* — Règle : si la batterie est en dessous de 20 %, alors mode économie, sinon mode normal. Associe chaque niveau au mode.
   - 15 % → ✅ Mode économie
   - 20 % → ✅ Mode normal
   - 80 % → ✅ Mode normal
   - 5 % → ✅ Mode économie
   - *Explication affichée après réussite :* 20 % n’est pas en dessous de 20 % : c’est le cas limite, qui reste en mode normal.

3. *Vrai ou faux* — « Une condition est toujours soit vraie, soit fausse. » → ✅ Vrai
   - *Explication affichée après réussite :* Vrai : c’est ce qui permet à l’ordinateur de choisir sans hésiter entre « alors » et « sinon ».

4. *Choix unique* — Pour entrer au match, il faut un billet et avoir plus de 12 ans. Kodjo a 14 ans mais pas de billet. Peut-il entrer ?
   - Oui, il a plus de 12 ans.
   - ✅ Non, les deux conditions doivent être vraies.
   - Oui, une seule condition suffit.
   - On ne peut pas savoir.
   - *Explication affichée après réussite :* Avec « et », il faut que les deux conditions soient vraies. Ici, l’une est fausse.

**Explique avec tes mots.** Invente avec tes mots une règle « si… alors… sinon » que ton téléphone applique déjà, et donne un cas où la condition est vraie et un cas où elle est fausse.

*Réponse possible :* Si la batterie est en dessous de 20 %, alors le téléphone active l’économie d’énergie, sinon il reste normal. Avec 15 %, c’est vrai : il économise. Avec 60 %, c’est faux : rien ne change.

**Récapitulatif**

- Une condition est vraie ou fausse.
- Si… alors… sinon : deux chemins selon la condition.
- Vérifie les cas limites ; « et » exige les deux, « ou » une seule.

**Mots nouveaux**

- **Condition** : Affirmation qui est soit vraie, soit fausse.
- **Cas limite** : Valeur juste à la frontière d’une condition, comme 10 pour « au moins 10 ».
- **Et, ou** : Mots qui combinent deux conditions : « et » exige les deux, « ou » une seule.

---

## 4.4 Répéter : pour chaque, tant que · 9 min · 181 mots

Source : `content/fr/decouverte/m4/dec-m4-04.md` et `.activities.json`

**Objectifs**

- Reconnaître les trois façons de répéter des instructions.
- Repérer une répétition qui ne s’arrêterait jamais.

**L’idée en 30 secondes.** Une boucle répète des instructions : un nombre de fois connu, pour chaque élément d’une liste, ou tant qu’une condition reste vraie.

**Comparaison.** Comme arroser un jardin : tu verses de l’eau pour chaque plant de la rangée, et tu remplis l’arrosoir tant qu’il n’est pas plein.

**Explication**

Imagine devoir écrire « verser 1 litre d’eau » trente fois pour trente plants. Les programmeurs évitent cela avec une boucle : un bloc d’instructions que l’on répète.

Il existe trois grandes façons de répéter. Répéter un nombre de fois connu : « fais 10 pompes ». Répéter pour chaque élément d’une liste : « pour chaque élève de la classe, noter sa présence » ; la boucle s’arrête quand la liste est finie. Répéter tant qu’une condition est vraie : « tant que le réservoir n’est pas plein, pomper » ; ici, on ne sait pas toujours à l’avance combien de fois.

Une boucle « tant que » demande de l’attention. Quelque chose doit changer à chaque tour, pour que la condition finisse par devenir fausse. Sinon, la boucle tourne sans fin : on parle de boucle infinie. « Tant que le nombre est inférieur à 10, afficher le nombre », sans jamais augmenter le nombre, ne s’arrête jamais.

Pour vérifier une boucle, compte les tours sur un petit exemple. En Python, tu écriras ces boucles avec for et while.

**Exemple guidé : Arroser une rangée de 5 plants**

1. Pour chaque plant de la rangée : verser 1 litre d’eau.
2. La boucle s’exécute 5 fois, une fois par plant.
3. Avant de commencer : tant que l’arrosoir n’est pas plein, ajouter un gobelet d’eau.
4. Au total, il faut 5 litres : l’arrosoir doit en contenir au moins autant.

**Activités**

1. *Choix unique* — « Répète 3 fois : avance de 2 pas. » Combien de pas au total ?
   - 2
   - 3
   - 5
   - ✅ 6
   - *Explication affichée après réussite :* 3 tours de 2 pas : 3 × 2 = 6 pas.

2. *Associer* — Quel type de répétition pour chaque situation ?
   - Saluer chacun des 30 élèves → ✅ Pour chaque
   - Pomper tant que le réservoir n’est pas plein → ✅ Tant que
   - Faire 10 pompes → ✅ Nombre de fois connu
   - Lire chaque message non lu → ✅ Pour chaque
   - *Explication affichée après réussite :* Une liste à parcourir : pour chaque. Une condition à surveiller : tant que. Un nombre fixe : nombre de fois connu.

3. *Choix unique* — « Le nombre vaut 1. Tant que le nombre est inférieur à 10, afficher le nombre. » Que se passe-t-il ?
   - Le programme affiche 1 à 9.
   - ✅ Le programme affiche 1 sans jamais s’arrêter.
   - Le programme n’affiche rien.
   - Le programme affiche 10.
   - *Explication affichée après réussite :* Le nombre ne change jamais : la condition reste vraie. Il faudrait ajouter « augmenter le nombre de 1 ».

4. *Vrai ou faux* — « Avec une boucle « tant que », on connaît toujours à l’avance le nombre de répétitions. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : elle s’arrête quand la condition devient fausse, ce qui peut arriver après un nombre de tours inconnu au départ.

**Explique avec tes mots.** Trouve avec tes mots une répétition de ta journée pour chaque type de boucle : un nombre de fois connu, pour chaque élément, et tant que.

*Réponse possible :* Nombre connu : je fais 20 abdominaux. Pour chaque : je range chaque cahier dans mon sac. Tant que : je relis ma leçon tant que je ne peux pas la réciter sans erreur.

**Récapitulatif**

- Une boucle répète un bloc d’instructions.
- Nombre de fois connu, pour chaque élément, ou tant qu’une condition est vraie.
- Dans une boucle « tant que », quelque chose doit changer, sinon elle ne s’arrête jamais.

**Mots nouveaux**

- **Boucle** : Bloc d’instructions répété plusieurs fois.
- **Tour** : Une exécution du bloc d’une boucle.
- **Boucle infinie** : Boucle dont la condition ne devient jamais fausse.

---

## 4.5 Trouver et corriger une erreur de logique · 9 min · 170 mots

Source : `content/fr/decouverte/m4/dec-m4-05.md` et `.activities.json`

**Objectifs**

- Tester un algorithme avec des exemples dont on connaît la réponse.
- Localiser et corriger une erreur de logique.

**L’idée en 30 secondes.** Un algorithme peut fonctionner sans message d’erreur et donner pourtant un résultat faux. On le teste, on suit chaque étape et on corrige celle qui se trompe.

**Comparaison.** Comme un mécanicien qui cherche une panne : il essaie, observe où le moteur cale, répare cette pièce, puis réessaie.

**Explication**

Une erreur dans un programme s’appelle un bogue. Certaines empêchent le programme de démarrer. D’autres sont plus discrètes : le programme tourne, n’affiche aucun message d’erreur, mais donne un mauvais résultat. Ce sont des erreurs de logique : l’ordinateur fait exactement ce qui est écrit, mais ce qui est écrit ne correspond pas à ce qu’on voulait.

Pour les trouver, suis une méthode. D’abord, teste avec un exemple dont tu connais la bonne réponse. Compare le résultat obtenu au résultat attendu. S’ils diffèrent, suis l’algorithme étape par étape, en notant les valeurs, jusqu’à trouver la première étape qui se trompe. Corrige-la, puis refais le test, et d’autres encore.

Choisis bien tes exemples. Teste un cas ordinaire, mais aussi les cas limites : la valeur exactement à la frontière d’une condition, zéro, une liste vide. Beaucoup d’erreurs s’y cachent.

Se tromper fait partie du métier. Les programmeurs passent une grande partie de leur temps à tester et à corriger. Avec cette méthode, tu es prêt à commencer Python : les bases.

**Exemple guidé : Un élève admis refusé à tort**

1. Règle écrite : si la note est supérieure à 10, alors « Admis », sinon « Ajourné ».
2. Test avec 10 : on attend « Admis », la règle affiche « Ajourné ».
3. L’étape fautive est la condition : « supérieure à » exclut 10.
4. Correction : « supérieure ou égale à 10 ». Nouveau test avec 10 : « Admis ».

**Activités**

1. *Choix unique* — Algorithme : « additionner les 3 notes, puis diviser par 2 ». Où est l’erreur ?
   - Il ne faut pas additionner les notes.
   - ✅ Il faut diviser par 3, le nombre de notes.
   - Il faut multiplier par 2.
   - Il n’y a pas d’erreur.
   - *Explication affichée après réussite :* Pour une moyenne, on divise par le nombre de valeurs : ici 3.

2. *Remettre dans l’ordre* — Remets dans l’ordre la méthode pour trouver une erreur de logique. (ordre correct, mélangé à l’écran)
   1. Tester avec un exemple dont tu connais la réponse.
   2. Comparer le résultat obtenu au résultat attendu.
   3. Suivre les étapes une par une pour trouver celle qui se trompe.
   4. Corriger cette étape, puis refaire le test.
   - *Explication affichée après réussite :* On ne corrige pas au hasard : on observe d’abord où le résultat devient faux.

3. *Vrai ou faux* — « Si un programme n’affiche aucun message d’erreur, son résultat est forcément juste. » → ✅ Faux
   - *Explication affichée après réussite :* Faux : une erreur de logique laisse le programme fonctionner tout en donnant un mauvais résultat.

4. *Choix unique* — Pour tester la règle « si la note est supérieure ou égale à 10, alors Admis », quelle note est la plus utile à essayer ?
   - 15
   - ✅ 10
   - 18
   - 4
   - *Explication affichée après réussite :* 10 est le cas limite : c’est là qu’une confusion entre « supérieure » et « supérieure ou égale » se voit.

**Explique avec tes mots.** L’algorithme « additionner trois notes, puis diviser par 2 » doit calculer une moyenne. Explique avec tes mots comment tu trouves l’erreur avec un exemple, puis comment tu la corriges.

*Réponse possible :* Je teste avec 10, 10 et 10 : la moyenne attendue est 10, mais l’algorithme donne 30 ÷ 2 = 15. L’addition est juste, c’est la division qui se trompe. Il faut diviser par 3, le nombre de notes. Nouveau test : 30 ÷ 3 = 10.

**Récapitulatif**

- Une erreur de logique donne un résultat faux sans message d’erreur.
- Tester, comparer, suivre les étapes, corriger, retester.
- Les cas limites révèlent beaucoup d’erreurs.

**Mots nouveaux**

- **Bogue** : Erreur dans un programme ou un algorithme.
- **Erreur de logique** : Erreur qui donne un mauvais résultat sans empêcher le programme de fonctionner.
- **Tester** : Essayer un algorithme avec un exemple dont on connaît la bonne réponse.

---
