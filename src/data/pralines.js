export const chocolateBases = [
  {
    id: 'dark_70',
    labelKey: 'praline.bases.dark_70',
    color: '#3B1F0E',
    textColor: '#FFF5DC',
    emoji: '🍫',
    price: 5,
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
    id: 'strawberry',
    labelKey: 'praline.fillings.strawberry',
    color: '#E8435A',
    emoji: '🍓',
    price: 5,
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
    id: 'lotus',
    labelKey: 'praline.fillings.lotus',
    color: '#D4A017',
    emoji: '✨',
    price: 6,
  },
  {
    id: 'nutella',
    labelKey: 'praline.fillings.nutella',
    color: '#6B3A2A',
    emoji: '🍫',
    price: 6,
  },
  {
    id: 'caramel',
    labelKey: 'praline.fillings.caramel',
    color: '#C19A6B',
    emoji: '🍮',
    price: 4,
  },
  {
    id: 'vanilla',
    labelKey: 'praline.fillings.vanilla',
    color: '#F3E5AB',
    emoji: '🌼',
    price: 4,
  },
  {
    id: 'pistachio',
    labelKey: 'praline.fillings.pistachio',
    color: '#93C572',
    emoji: '💚',
    price: 5,
  },
  {
    id: 'coconut',
    labelKey: 'praline.fillings.coconut',
    color: '#FAFAFA',
    emoji: '🥥',
    price: 4,
  },
  {
    id: 'nuts',
    labelKey: 'praline.fillings.nuts',
    color: '#8B6914',
    emoji: '🌰',
    price: 5,
  },
  {
    id: 'halva',
    labelKey: 'praline.fillings.halva',
    color: '#E8D5B7',
    emoji: '✨',
    price: 4,
  },
  {
    id: 'cafe',
    labelKey: 'praline.fillings.cafe',
    color: '#6F4E37',
    emoji: '☕',
    price: 5,
  },
  {
    id: 'caipirinha',
    labelKey: 'praline.fillings.caipirinha',
    color: '#A8D5A2',
    emoji: '🍋',
    price: 6,
  },
  {
    id: 'wine_cinnamon',
    labelKey: 'praline.fillings.wine_cinnamon',
    color: '#722F37',
    emoji: '🍷',
    price: 6,
  },
  {
    id: 'mascarpone',
    labelKey: 'praline.fillings.mascarpone',
    color: '#F5F0E8',
    emoji: '🤍',
    price: 5,
  },
  {
    id: 'lemon_sicilian',
    labelKey: 'praline.fillings.lemon_sicilian',
    color: '#FFF44F',
    emoji: '🍋',
    price: 5,
  },
]

export const predefinedCombinations = [
  {
    id: 'classic',
    nameKey: 'bulk_order.combos.classic.name',
    descKey: 'bulk_order.combos.classic.desc',
    emoji: '🎩',
    selections: [
      { filling: 'pistachio',  base: 'dark_70' },
      { filling: 'caramel',    base: 'milk'    },
      { filling: 'vanilla',    base: 'white'   },
      { filling: 'cherry',     base: 'dark_50' },
      { filling: 'halva',      base: 'dark_70' },
    ],
  },
  {
    id: 'tropical',
    nameKey: 'bulk_order.combos.tropical.name',
    descKey: 'bulk_order.combos.tropical.desc',
    emoji: '🌴',
    selections: [
      { filling: 'mango',          base: 'white' },
      { filling: 'coconut',        base: 'white' },
      { filling: 'strawberry',     base: 'milk'  },
      { filling: 'caipirinha',     base: 'white' },
      { filling: 'lemon_sicilian', base: 'white' },
    ],
  },
  {
    id: 'indulgent',
    nameKey: 'bulk_order.combos.indulgent.name',
    descKey: 'bulk_order.combos.indulgent.desc',
    emoji: '🍫',
    selections: [
      { filling: 'nutella',    base: 'dark_70' },
      { filling: 'lotus',      base: 'milk'    },
      { filling: 'caramel',    base: 'dark_50' },
      { filling: 'nuts',       base: 'dark_70' },
      { filling: 'mascarpone', base: 'white'   },
    ],
  },
  {
    id: 'festive',
    nameKey: 'bulk_order.combos.festive.name',
    descKey: 'bulk_order.combos.festive.desc',
    emoji: '🎉',
    selections: [
      { filling: 'cherry',        base: 'dark_70' },
      { filling: 'wine_cinnamon', base: 'dark_50' },
      { filling: 'cafe',          base: 'milk'    },
      { filling: 'pistachio',     base: 'white'   },
      { filling: 'strawberry',    base: 'dark_70' },
    ],
  },
  {
    id: 'dark_intense',
    nameKey: 'bulk_order.combos.dark_intense.name',
    descKey: 'bulk_order.combos.dark_intense.desc',
    emoji: '✨',
    selections: [
      { filling: 'cafe',          base: 'dark_70' },
      { filling: 'wine_cinnamon', base: 'dark_70' },
      { filling: 'caramel',       base: 'dark_70' },
      { filling: 'nuts',          base: 'dark_70' },
      { filling: 'cherry',        base: 'dark_70' },
    ],
  },
  {
    id: 'white_collection',
    nameKey: 'bulk_order.combos.white_collection.name',
    descKey: 'bulk_order.combos.white_collection.desc',
    emoji: '🤍',
    selections: [
      { filling: 'lemon_sicilian', base: 'white' },
      { filling: 'coconut',        base: 'white' },
      { filling: 'caramel',        base: 'white' },
      { filling: 'pistachio',      base: 'white' },
      { filling: 'cafe',           base: 'white' },
    ],
  },
  {
    id: 'fresh_fruity',
    nameKey: 'bulk_order.combos.fresh_fruity.name',
    descKey: 'bulk_order.combos.fresh_fruity.desc',
    emoji: '🍓',
    selections: [
      { filling: 'strawberry',  base: 'milk'    },
      { filling: 'mango',       base: 'white'   },
      { filling: 'caipirinha',  base: 'white'   },
      { filling: 'halva',       base: 'milk'    },
      { filling: 'cherry',      base: 'dark_50' },
    ],
  },
]

export function pralinePrice(slot) {
  const base = chocolateBases.find((b) => b.id === slot.base)
  const filling = fillings.find((f) => f.id === slot.filling)
  if (!base || !filling) return 0
  return base.price + filling.price
}

export function boxTotal(slots) {
  return slots.filter(Boolean).reduce((sum, slot) => sum + pralinePrice(slot), 0)
}

export function getPralinePricingForAI() {
  const baseLines = chocolateBases
    .map((b) => `  - ${b.id.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}: ₪${b.price}`)
    .join('\n')

  const fillingLines = fillings
    .map((f) => `  - ${f.id.charAt(0).toUpperCase() + f.id.slice(1)}: ₪${f.price}`)
    .join('\n')

  const examples = [
    [chocolateBases[0], fillings[7]],
    [chocolateBases[3], fillings[4]],
    [chocolateBases[2], fillings[5]],
  ].map(([b, f]) => {
    const baseName = b.id.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    const fillingName = f.id.charAt(0).toUpperCase() + f.id.slice(1)
    return `  - ${baseName} + ${fillingName} = ₪${b.price + f.price} per praline`
  }).join('\n')

  return `PRALINE BULK ORDER — "Pick Your 5" pricing:
Minimum order: 100 pralines (5 flavors × 20 each).
Each praline price = chocolate base price + filling price.

Chocolate bases (price per praline):
${baseLines}

Fillings (price per praline, added to base):
${fillingLines}

Examples:
${examples}

Customers choose 5 flavors from 16 options, 20 pralines of each flavor.
They also choose a chocolate base for each flavor.
Direct them to the "Order Pralines" page on the website.`
}
