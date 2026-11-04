/* Nunya feature flags — central toggles for progressive rollout.
   Set a section flag to true to show it in the application. */
const FEATURES = {
  /** Show the onboarding welcome flow on first visit. */
  onboarding: true,

  /** Show the "Études à l'étranger" section in the sidebar. Réouverte le 4 novembre 2026 (décision du propriétaire). */
  showAbroad: true,

  /** Show the "Opportunités" section in the sidebar. Réouverte le 4 novembre 2026 (décision du propriétaire). */
  showOpportunities: true,

  /** Show the "Portfolio & CV" section in the sidebar. */
  showPortfolio: false,

  /** Nunya Aide : assistant IA open source (fonction Supabase « nunya-aide »). */
  aide: true,

  /** Show non-IT domains as "bientôt" during the IT-focused launch. */
  otherDomainsComingSoon: true
};
