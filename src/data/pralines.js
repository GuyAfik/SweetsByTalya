// ============================================================
// Sweets by Talya — Praline Builder Data
// Edit this file to update chocolate bases, fillings, and prices.
// Pricing: praline price = base.price + filling.price (in ₪)
// ============================================================

export const chocolateBases = [
  {
    id: 'dark_70',
    labelKey: 'praline.bases.dark_70',
    color: '#3B1F0E',
    textColor: '#FFF5DC',
    emoji: '🍫',
    price: 5, // ← update when Talya provides real prices
  },
  {
    id: 'dark_50',
    labelKey: 'praline.bases.dark_50',
    color: '#5C3317',
    textColor: '#FFF5DC',
    emoji: '🍫',
    price: 5,
  },
  {
    id: 'milk',
    labelKey: 'praline.bases.milk',
    color: '#C68642',
    textColor: '#3B1F0E',
    emoji: '🍫',
    price: 5,
  },
  {
    id: 'white',
    labelKey: 'praline.bases.white',
    color: '#FFF5DC',
    textColor: '#3B1F0E',
    emoji: '🤍',
    price: 5,
  },
]

export const fillings = [
  {
    id: 'pistachio',
    labelKey: 'praline.fillings.pistachio',
    color: '#93C572',
    emoji: '🌿',
    price: 5, // ← update when Talya provides real prices
  },
  {
    id: 'vanilla',
    labelKey: 'praline.fillings.vanilla',
    color: '#F3E5AB',
    emoji: '🌼',
    price: 4,
  },
  {
    id: 'caramel',
    labelKey: 'praline.fillings.caramel',
    color: '#C19A6B',
    emoji: '🍯',
    price: 4,
  },
  {
    id: 'mango',
    labelKey: 'praline.fillings.mango',
    color: '#FFB347',
    emoji: '🥭',
    price: 5,
  },
  {
    id: 'cherry',
    labelKey: 'praline.fillings.cherry',
    color: '#C0392B',
    emoji: '🍒',
    price: 6,
  },
  {
    id: 'dubai',
    labelKey: 'praline.fillings.dubai',
    color: '#D4A017',
    emoji: '✨',
    price: 7,
  },
  {
    id: 'halva',
    labelKey: 'praline.fillings.halva',
    color: '#E8D5B7',
    emoji: '🌾',
    price: 4,
  },
  {
    id: 'pecan',
    labelKey: 'praline.fillings.pecan',
    color: '#8B6914',
    emoji: '🥜',
    price: 5,
  },
  {
    id: 'coconut',
    labelKey: 'praline.fillings.coconut',
    color: '#FAFAFA',
    emoji: '🥥',
    price: 4,
  },
]

// ── Pricing helpers ────────────────────────────────────────────────────────────

/**
 * Returns the price of a single configured praline slot.
 * @param {{ base: string, filling: string }} slot
 * @returns {number} price in ₪
 */
export function pralinePrice(slot) {
  const base = chocolateBases.find((b) => b.id === slot.base)
  const filling = fillings.find((f) => f.id === slot.filling)
  if (!base || !filling) return 0
  return base.price + filling.price
}

/**
 * Returns the total price for all filled slots.
 * @param {Array<null | { base: string, filling: string }>} slots
 * @returns {number} total in ₪
 */
export function boxTotal(slots) {
  return slots.filter(Boolean).reduce((sum, slot) => sum + pralinePrice(slot), 0)
}
