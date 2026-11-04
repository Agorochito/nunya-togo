// Point d'entrée Supabase Edge Function. La logique est dans handler.ts.
// Secrets à définir dans Supabase (Edge Functions › Secrets) : NUNYA_AI_KEY (clé Groq).
// Facultatifs : NUNYA_AI_BASE_URL, NUNYA_AI_MODELS, NUNYA_ALLOWED_ORIGINS.
import { createHandler, envFrom } from './handler.ts';

Deno.serve(createHandler(envFrom((k) => Deno.env.get(k))));
