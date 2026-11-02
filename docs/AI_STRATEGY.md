# Nunya Aide

Le guide actuel est local et utilise des indices préparés. L’adaptateur TypeScript dans lib/ai/provider.ts est un composant serveur préparé, pas une IA active dans le site. Aucune clé n’est demandée ou stockée dans dist/.

Configurer un fournisseur compatible après évaluation de petits modèles multilingues ouverts (familles Qwen, Mistral ou Llama). Vérifier le français, la pertinence et les limites sur des questions relues par des enseignants. La banque d’évaluation est dérivée des exercices originaux ; elle n’est pas encore un étalon validé.

Le contrat impose : contexte limité aux leçons, indice avant solution, sortie courte, délai maximal, quota réservé atomiquement par utilisateur et RLS côté base. Ajouter une authentification serveur validée, un filtrage des demandes et un suivi des erreurs avant activation. Le quota de démonstration de la migration vaut 15 requêtes par jour ; adapter après mesure des coûts. Les données inutiles ne sont pas envoyées au modèle.

Quand l’IA est absente, hors ligne ou saturée, garder l’article, les étapes et les indices locaux. Ne pas prétendre qu’une réponse préparée vient d’un modèle.

À terme : cache des questions fréquentes, évaluation continue, financement par partenariats ; expérimenter des modèles locaux seulement après validation des performances sur téléphones modestes. Aucun GPU ou abonnement payant n’est engagé.
