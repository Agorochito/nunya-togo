# Partager Nunya avec GitHub et Vercel

Déploiement effectué le 2 novembre 2026 : [site public](https://nunya-togo.vercel.app) et [dépôt public](https://github.com/Agorochito/nunya-togo). Accès sans compte vérifié. Les réglages ci-dessous sont déjà appliqués.

Le dépôt GitHub contient le code ; Vercel sert le site aux élèves. Un lien localhost ne fonctionne que sur l’ordinateur qui exécute le serveur. Le lien de production HTTPS reste disponible quand cet ordinateur est éteint.

## Importer sur Vercel

1. Se connecter à https://vercel.com/new avec son compte habituel.
2. Importer le dépôt public `nunya-togo` depuis GitHub. Pour la connexion GitHub, limiter l’application Vercel au seul dépôt demandé si le choix est proposé.
3. Racine du projet : racine du dépôt. Framework : Other. La configuration `vercel.json` indique `npm ci`, `npm run build`, dossier de sortie `dist`. Aucune variable d’environnement requise dans ce pilote.
4. Déployer, attendre Ready, puis ouvrir l’adresse de production fournie par Vercel. Partager cette adresse HTTPS, pas celle de localhost ni seulement le lien du code GitHub. Aucun achat de domaine n’est nécessaire pour utiliser l’adresse générée.
5. Vérifier en fenêtre privée que la production est accessible sans compte. Si Vercel affiche une protection d’accès, choisir la production publique destinée aux élèves ; ne pas partager une prévisualisation protégée.

Après connexion Git, les changements fusionnés sur la branche de production déclenchent un nouveau déploiement. Ton ami peut ouvrir des issues et proposer des pull requests depuis un fork public. Lui donner un accès en écriture n’est pas nécessaire pour une revue.

Les progrès restent dans chaque navigateur. Avant de passer de l’ancienne adresse Sites à Vercel, exporter sa sauvegarde et l’importer sur la nouvelle adresse. Ne pas publier notes, CV ou exports personnels dans GitHub.

Documentation officielle consultée le 2 novembre 2026 : https://vercel.com/docs/git et https://vercel.com/docs/project-configuration/vercel-json. Les offres et limites de Vercel dépendent du compte ; aucune option payante ni domaine n’est acheté par ce projet.
