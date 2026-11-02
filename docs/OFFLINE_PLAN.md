# Hors ligne

Le service worker garde le cœur de l’application. Les 11 181 notices ne chargent ni article ni vidéo au premier affichage de l’accueil. La bibliothèque est paginée, puis les articles sont récupérés à la demande. Les fichiers MDN gardent l’attribution et la licence CC BY-SA 2.5. Les vidéos ne sont jamais téléchargées par le pilote.

Les articles enregistrés sont copiés dans CacheStorage ; progrès, avis et notes restent locaux. L’atelier Python charge le moteur séparément (~12 Mo) et peut enregistrer ses fichiers après action explicite. JavaScript utilise un Worker éphémère avec arrêt après deux secondes. Python est interrompu après huit secondes d’exécution ; le démarrage peut demander davantage de temps. Une limite stricte de mémoire WASM n’est pas garantie : utiliser les quiz légers sur les appareils limités.

Le partage de parcours Nunya exporte un fichier JSON. L’import vérifie le format, la taille, les champs et les QCM ; aucun HTML ou code de leçon n’est exécuté à l’import. Les textes restent échappés dans le lecteur. Les articles tiers conservent leurs licences et ne sont pas intégrés à cet export de parcours original.

Synchronisation future : IndexedDB outbox de records horodatés, idempotence par utilisateur/clé, dernière écriture par champ ; conserver la version conflictuelle dans une archive avant fusion. Ne pas afficher « synchronisé » avant confirmation du serveur. Aucun serveur n’étant configuré dans le pilote, aucune promesse de synchronisation automatique n’est faite.

Hub scolaire futur : même paquet statique servi sur un réseau local depuis un ordinateur ou Raspberry Pi, catalogue et packs préchargés, profils locaux. HTTPS ou localhost est nécessaire au service worker ; prévoir un certificat reconnu pour un hub réseau. Aucun dispositif réseau n’a été installé sur l’appareil de l’utilisateur.

## Packs Académie

`nunya-academy-v1` conserve le JSON complet du parcours, ses séances directes, les libellés et KaTeX local. Les unités scolaires utilisent les packs de cours existants. Les mises à jour du shell suppriment seulement les anciens caches versionnés du shell ; les articles, packs et Python facultatif sont conservés. Le test en contexte navigateur hors ligne confirme rechargement d’un parcours et d’une unité scolaire enregistrés.

Pour un hub scolaire / partage USB ou Bluetooth : transférer le paquet statique ou les exports JSON autorisés, puis servir le paquet avec une origine locale sûre. Ce flux matériel n’est pas testé ; les vidéos ne font pas partie du paquet. Prévoir sauvegardes des profils et un plan de mise à jour des licences. Une nouvelle origine Vercel nécessite export/import des progrès ; les caches d’un autre domaine ne sont pas transférables automatiquement.
