// ============================================================
// Sweets by Talya — Feature Flags
// Control features via environment variables.
// ============================================================

export const flags = {
  /** Send email to Talya on every website visit */
  telemetry: import.meta.env.VITE_TELEMETRY_ENABLED !== 'false',

  /** Show AI chatbot widget */
  chatbot: import.meta.env.VITE_CHATBOT_ENABLED !== 'false',

  /** Build Your Own Box praline builder (hidden by default — set VITE_FEATURE_PRALINE_BUILDER=true to show) */
  pralineBuilder: import.meta.env.VITE_FEATURE_PRALINE_BUILDER === 'true',

  /** Require payment before sending the order email to Talya (on by default) */
  requirePaymentBeforeOrder: import.meta.env.VITE_REQUIRE_PAYMENT_BEFORE_ORDER !== 'false',

  /** Bulk praline order — "Pick Your 5" feature */
  bulkOrder: {
    enabled:      import.meta.env.VITE_BULK_ORDER_ENABLED      !== 'false',
    qtyPerFlavor: Number(import.meta.env.VITE_BULK_ORDER_QTY_PER_FLAVOR) || 20,
    maxFlavors:   Number(import.meta.env.VITE_BULK_ORDER_MAX_FLAVORS)    || 5,
  },

  /** Chocolate Fountain hospitality service */
  chocolateFountain: import.meta.env.VITE_CHOCOLATE_FOUNTAIN_ENABLED !== 'false',
}
