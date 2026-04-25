// ============================================================
// Sweets by Talya — Feature Flags
// Control features via environment variables.
// ============================================================

export const flags = {
  /** Send email to Talya on every website visit */
  telemetry: import.meta.env.VITE_TELEMETRY_ENABLED !== 'false',

  /** Show AI chatbot widget */
  chatbot: import.meta.env.VITE_CHATBOT_ENABLED !== 'false',

  /** Build Your Own Box praline builder */
  pralineBuilder: import.meta.env.VITE_FEATURE_PRALINE_BUILDER !== 'false',

  /** Require payment before sending the order email to Talya (on by default) */
  requirePaymentBeforeOrder: import.meta.env.VITE_REQUIRE_PAYMENT_BEFORE_ORDER !== 'false',
}
