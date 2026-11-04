# Évolution après le pilote local

Le propriétaire a explicitement choisi de conserver la base locale. Le déploiement Sites ou Vercel sert aujourd’hui les mêmes fichiers statiques ; aucune clé serveur ni base externe n’est nécessaire.

1. Stabiliser les identifiants Domain → Career → Path → Stage → Step. Garder les anciens alias de routes et les identifiants de cours / ressources. Les schémas sont dans `schemas/` ; les séances sont des JSON indépendants, générés par `prepare-academy.py`.
2. Avant migration : export JSON par profil, tests de lecture de l’ancien format et sauvegarde sans écraser. `academySafeState` borne les imports ; IndexedDB conserve les snapshots existants. Documenter la version de schéma.
3. Backend : projet Supabase « nunya » provisionné le 3 novembre (offre gratuite, eu-west-3), migrations 001 à 006 appliquées ; le site ne l’utilise que pour Nunya Aide (session anonyme, quota). Authentification serveur réelle, politiques par propriétaire, séparation contenu public / notes et CV privés. Aucune clé privilégiée dans le navigateur.
4. Synchronisation explicite avec outbox, accusé serveur et conservation des versions en conflit. Le mode hors ligne fonctionne avant authentification ; la connexion ne doit pas effacer le profil local.
5. Migrer l’interface vers Next.js seulement si le besoin serveur le justifie ; garder pages légères, JSON différés, mêmes routes ou redirections et tests de progression / hors ligne.
6. Portfolio public : opt-in révocable, champs limités, prévisualisation avant publication. Mentorat / offres : modération, signalement, critères et sources. Aucun accès aux CV par défaut.
7. IA : Nunya Aide (5.4.0) passe par la fonction Supabase `nunya-aide`, une session anonyme, un quota par élève et un plafond global ; voir `docs/AI_STRATEGY.md`. Reste à faire : évaluation des réponses en français avec des enseignants. L’aide et la correction locales fonctionnent toujours sans IA.

Changer de domaine (Sites → Vercel) change l’origine navigateur. Les notes et caches locaux ne suivent pas automatiquement : exporter depuis l’ancien site, importer sur le nouveau. Aucune récupération automatique de données d’une autre origine n’est promise.
