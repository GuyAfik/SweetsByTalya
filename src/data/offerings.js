// ============================================================
// Sweets by Talya — Full Offerings Knowledge Base for AI
// Builds a comprehensive summary of EVERY offering on the site.
// Uses the English translation JSON directly (no i18n runtime
// dependency) so the knowledge base is always complete and
// accurate regardless of language or initialization state.
// The full summary is sent as `offeringsSummary` to the API.
// ============================================================

import en from '../../public/locales/en/translation.json' with { type: 'json' }
import {
  chocolateBases,
  fillings,
  predefinedCombinations,
  pralinePrice,
} from './pralines.js'
import { workshops, ageGroups } from './workshops.js'
import { products } from './menu.js'

function t(key) {
  const parts = key.split('.')
  let obj = en
  for (const part of parts) {
    if (obj == null || typeof obj !== 'object') return key
    obj = obj[part]
  }
  return typeof obj === 'string' ? obj : key
}

// ── Section: Brand overview ──────────────────────────────────────────────────
function brandSection() {
  return `BRAND OVERVIEW
Sweets by Talya is a boutique handmade chocolate business owned by Talya, who brought her chocolate passion from Brazil. Every praline and creation is handcrafted using premium Belgian chocolate and fresh local ingredients. Based in Israel — prices are in shekels (₪). Not kosher-certified.`
}

// ── Section: Pralines bulk order ─────────────────────────────────────────────
function pralinesSection() {
  const basesList = chocolateBases
    .map((b) => `  • ${t(b.labelKey)}: ₪${b.price} per praline`)
    .join('\n')

  const fillingsList = fillings
    .map((f) => `  • ${t(f.labelKey)}: ₪${f.price} per praline`)
    .join('\n')

  const examples = [
    [chocolateBases.find((b) => b.id === 'dark_70'), fillings.find((f) => f.id === 'pistachio')],
    [chocolateBases.find((b) => b.id === 'milk'),    fillings.find((f) => f.id === 'caramel')],
    [chocolateBases.find((b) => b.id === 'white'),   fillings.find((f) => f.id === 'lemon_sicilian')],
  ]
    .filter(([b, f]) => b && f)
    .map(([b, f]) => `  • ${t(b.labelKey)} + ${t(f.labelKey)} = ₪${b.price + f.price} per praline`)
    .join('\n')

  const combos = predefinedCombinations
    .map((c) => {
      const name = t(c.nameKey)
      const desc = t(c.descKey)
      const totalPerPraline = c.selections.reduce((sum, sel) => sum + pralinePrice(sel), 0)
      const setPrice = totalPerPraline * 20
      const flavorList = c.selections
        .map((sel) => {
          const fl = fillings.find((f) => f.id === sel.filling)
          const bs = chocolateBases.find((b) => b.id === sel.base)
          if (!fl || !bs) return null
          return `${t(fl.labelKey)} on ${t(bs.labelKey)}`
        })
        .filter(Boolean)
        .join(', ')
      return `  • ${name} — ${desc}. Flavors: ${flavorList}. Approx. ₪${setPrice} per set of 100.`
    })
    .join('\n')

  return `OFFERING 1: HANDCRAFTED PRALINES (bulk orders — minimum 100 pieces)
How it works: customers choose 5 flavors, get 20 of each = 100 pralines per set. Multiple sets can be ordered.
Each praline price = chocolate base price + filling price.

Chocolate bases (4 options):
${basesList}

Fillings (16 options):
${fillingsList}

Pricing examples:
${examples}

Chef's predefined collections (7 options — great for customers who want a recommendation):
${combos}

Occasions: birthday parties, weddings, engagements, corporate events, gifts, any special occasion.
Where to order: the "Order Pralines" page (Hebrew: "הזמנת פרלינים") — customers can visually build their set or pick a Chef's collection. Never say "/bulk-order".`
}

// ── Section: Workshops ───────────────────────────────────────────────────────
function workshopsSection() {
  const priceTiers = {
    workshop1_price_tier1: t('workshops.workshop1_price_tier1'),
    workshop1_price_tier2: t('workshops.workshop1_price_tier2'),
    workshop1_price_tier3: t('workshops.workshop1_price_tier3'),
    workshop1_price_tier4: t('workshops.workshop1_price_tier4'),
  }

  const workshopLines = workshops
    .filter((w) => w.available !== false)
    .map((w) => {
      const title = t(w.titleKey)
      const ages = t(w.agesKey)
      const subtitle = t(w.subtitleKey)
      const group = ageGroups.find((g) => g.id === w.ageGroupId)
      const groupLabel = group ? t(group.labelKey) : ''
      const tiers = (w.pricingTiers || [])
        .map((tier) => `${tier.participants} participants: ${priceTiers[tier.priceKey] || '?'}`)
        .join(', ')
      return `  • ${title} [${groupLabel}${ages ? `, ${ages}` : ''}]
    ${subtitle}
    Pricing: ${tiers || 'on request'}
    URL: /workshops/${w.slug}`
    })
    .join('\n')

  return `OFFERING 2: CHOCOLATE WORKSHOPS (hosted at the customer's location)
Hands-on chocolate-making experiences. Talya comes to you with all materials.
Age groups: Ages 5–9 (coming soon), Ages 10–13, Ages 14+.

Available workshops:
${workshopLines}

What participants take home: decorated gift box with their creations, ribbon, and a "Young Chocolatier" certificate.
Hosting requirements: fridge with one free shelf, microwave, tables/chairs for children, climate-controlled space (chocolate melts in heat).
Allergen note: kashrut is NOT guaranteed. Materials may contain nuts, peanuts and other allergens. Customers with allergies must consult before booking.
Occasions: birthday parties, bat mitzvahs, girls' events, team building, family experiences.
Where to book: the "Workshops" page (Hebrew: "סדנאות") or WhatsApp.`
}

// ── Section: Chocolate Fountain ──────────────────────────────────────────────
function fountainSection() {
  const includes = ['item_fruits', 'item_marshmallows', 'item_brownies', 'item_churros']
    .map((k) => t(`fountain.${k}`))
    .join(', ')
  const occasions = ['occasion_1', 'occasion_2', 'occasion_3', 'occasion_4']
    .map((k) => t(`fountain.${k}`))
    .join(', ')

  return `OFFERING 3: CHOCOLATE FOUNTAIN HOSPITALITY
${t('fountain.offer_desc')}
Includes: ${includes}.
Perfect for: ${occasions}.
Pricing: ₪1,000 for 20–30 guests. Price covers the full event service.
Chocolate type: customers choose one — Dark Chocolate, Milk Chocolate, or White Chocolate.
Color add-on: any color can be added to the fountain for an additional ₪50.
Full service: Talya handles everything — setup, fresh dipping treats, service during the event, and cleanup. You just enjoy with your guests.
Where to book: the "Chocolate Fountain" page (Hebrew: "מזרקת שוקולד") or WhatsApp with event date, guest count, chocolate type, and whether they want a color add-on.`
}

// ── Section: Retail menu ─────────────────────────────────────────────────────
function menuSection() {
  const available = products.filter((p) => p.available)
  if (!available.length) return ''
  const lines = available
    .map((p) => {
      const priceText = p.price ? `₪${p.price} ${p.unit}` : 'Price on request'
      const allergens = p.allergens?.length ? p.allergens.join(', ') : 'none'
      return `  • ${p.name}: ${p.description}. ${priceText}. Allergens: ${allergens}.`
    })
    .join('\n')
  return `OFFERING 4: RETAIL MENU (individual items)
${lines}`
}

// ── Section: Site navigation ─────────────────────────────────────────────────
function navigationSection() {
  return `WEBSITE PAGES — use the page NAME when directing customers, not the URL path.
  • "הזמנת פרלינים" / "Order Pralines" → /bulk-order — interactive praline builder
  • "סדנאות" / "Workshops" → /workshops — browse and book workshops
  • "מזרקת שוקולד" / "Chocolate Fountain" → /fountain — fountain hospitality service
  • "תפריט" / "Menu" → /menu — full retail menu
  • "אודות" / "About" → /about — about Talya and the brand
  • "גלריה" / "Gallery" → /gallery — photo gallery
  • "צור קשר" / "Contact" → /contact — contact form and WhatsApp

When directing a customer to a page, say the page name in their language (e.g. in Hebrew say "עמוד הזמנת פרלינים", in English say "Order Pralines page"). Never say the raw URL like "/bulk-order".`
}

// ── Public API ───────────────────────────────────────────────────────────────
/**
 * Returns a comprehensive plain-text knowledge base of all Sweets by Talya
 * offerings. Pass this as `offeringsSummary` in the chat API request body.
 * The i18n parameter is accepted for API compatibility but not used —
 * English text is sourced directly from the translation JSON.
 */
export function getOfferingsSummaryForAI(_i18n) {
  return [
    brandSection(),
    pralinesSection(),
    workshopsSection(),
    fountainSection(),
    menuSection(),
    navigationSection(),
  ]
    .filter(Boolean)
    .join('\n\n')
}
