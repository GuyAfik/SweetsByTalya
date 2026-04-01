// ============================================================
// Sweets by Talya — Feature Flags
// Control features via environment variables.
// ============================================================

export const flags = {
  /** Send email to Talya on every website visit */
  telemetry: import.meta.env.VITE_TELEMETRY_ENABLED !== 'false',

  /** Show AI chatbot widget */
  chatbot: import.meta.env.VITE_CHATBOT_ENABLED !== 'false',

  /** Enable Stripe payment flow (future) */
  payments: import.meta.env.VITE_PAYMENTS_ENABLED === 'true',
}
