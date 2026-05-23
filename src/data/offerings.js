// ============================================================
// Sweets by Talya — Full Offerings Knowledge Base
// Builds a comprehensive summary of EVERY offering on the site
// for the AI chatbot, derived from the existing data files.
// Single source of truth — never hardcode prices/flavors here.
// ============================================================

import { products } from './menu.js'
import {
  chocolateBases,
  fillings,
  predefinedCombinations,
  pralinePrice,
} from './pralines.js'
import { workshops, ageGroups, getAgeGroupById } from './workshops.js'

// ── Helpers ──────────────────────────────────────────────────────────────────
function titleCase(str) {
  return String(str || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function pickLocalized(i18n, key, fallback = '') {
  if (!i18n || typeof i18n.t !== 'function') return fallback
  const value = i18n.t(key, { defaultValue: fallback })
  return value || fallback
}

// ── Section: Brand & overview ────────────────────────────────────────────────
function brandSection() {
  return `BRAND OVERVIEW
Sweets by Talya is a boutique handmade chocolate business owned by Talya, who brought her chocolate passion from Brazil. Every praline and creation is handcrafted using premium Belgian chocolate and fresh local ingredients. Based in Israel, prices are in shekels (₪).`
}

// ── Section: Pralines (the flagship offering) ────────────────────────────────
function pralinesSection(i18n) {
  const basesList = chocolateBases
    .map((b) => {
      const label = pickLocalized(i18n, b.labelKey, titleCase(b.id))
      return `  - ${label}: ₪${b.price}`
    })
    .join('\n')

  const fillingsList = fillings
    .map((f) => {
      const label = pickLocalized(i18n, f.labelKey, titleCase(f.id))
      return `  - ${label}: ₪${f.price}`
    })
    .join('\n')

  const examples = [
    [chocolateBases[0], fillings.find((f) => f.id === 'pistachio')],
    [chocolateBases[2], fillings.find((f) => f.id === 'caramel')],
    [chocolateBases[3], fillings.find((f) => f.id === 'lemon_sicilian')],
  ]
    .filter(([b, f]) => b && f)
    .map(([b, f]) => {
      const bn = pickLocalized(i18n, b.labelKey, titleCase(b.id))
      const fn = pickLocalized(i18n, f.labelKey, titleCase(f.id))
      return `  - ${bn} + ${fn} = ₪${b.price + f.price} per praline`
    })
    .join('\n')

  const combos = predefinedCombinations
    .map((c) => {
      const name = pickLocalized(i18n, c.nameKey, titleCase(c.id))
      const desc = pickLocalized(i18n, c.descKey, '')
      const total = c.selections.reduce(
        (sum, sel) => sum + pralinePrice(sel),
        0,
      )
      const perSet = total * 20 // 20 of each = full 100-praline set
      const flavorList = c.selections
        .map((sel) => {
          const fl = fillings.find((f) => f.id === sel.filling)
          const bs = chocolateBases.find((b) => b.id === sel.base)
          if (!fl || !bs) return null
          return `${pickLocalized(i18n, fl.labelKey, titleCase(fl.id))} on ${pickLocalized(i18n, bs.labelKey, titleCase(bs.id))}`
        })
        .filter(Boolean)
        .join(', ')
      return `  - ${name}${desc ? ` — ${desc}` : ''}. Flavors: ${flavorList}. Approx. ₪${perSet} per set of 100.`
    })
    .join('\n')

  return `OFFERING 1: HANDCRAFTED PRALINES (bulk orders)
Minimum order: 100 pralines (one "set" = 5 flavors × 20 pralines each). Customers can order multiple sets.
Each praline price = chocolate base price + filling price.

Chocolate bases (price per praline):
${basesList}

Available fillings (16 total, price per praline added to base):
${fillingsList}

Pricing examples:
${examples}

Chef's predefined collections (great for indecisive customers):
${combos}

Where to order: direct customers to the "Order Pralines" page (/bulk-order) on the website. They can pick a Chef's collection OR build their own from 16 fillings × 4 bases.`
}

// ── Section: Workshops ───────────────────────────────────────────────────────
function workshopsSection(i18n) {
  const groups = ageGroups
    .map((g) => {
      const label = pickLocalized(i18n, g.labelKey, g.id)
      return `${label}${g.comingSoon ? ' (coming soon)' : ''}`
    })
    .join(', ')

  const tiers = (w) =>
    (w.pricingTiers || [])
      .map((t) => `${t.participants} ppl: ${pickLocalized(i18n, `workshops.${t.priceKey}`, '?')}`)
      .join(' | ')

  const workshopLines = workshops
    .filter((w) => w.available !== false)
    .map((w) => {
      const title = pickLocalized(i18n, w.titleKey, w.slug)
      const ages = pickLocalized(i18n, w.agesKey, '')
      const subtitle = pickLocalized(i18n, w.subtitleKey, '')
      const group = getAgeGroupById(w.ageGroupId)
      const groupLabel = group ? pickLocalized(i18n, group.labelKey, group.id) : ''
      return `  - ${title} [${groupLabel}${ages ? `, ${ages}` : ''}]
    ${subtitle}
    Pricing: ${tiers(w) || 'on request'}
    Link: /workshops/${w.slug}`
    })
    .join('\n')

  return `OFFERING 2: CHOCOLATE WORKSHOPS
Hands-on chocolate-making experiences hosted at the customer's location. Age groups available: ${groups}.
Workshops include all materials, facilitation, decorations, and the gift box each participant takes home.

Available workshops:
${workshopLines}

Important notes for customers:
  - Kashrut is NOT guaranteed. Materials may contain allergens (nuts, peanuts, etc.). Customers with allergies must consult before booking.
  - Hosting requirements: fridge with one free shelf, microwave, tables/chairs, climate-controlled space (chocolate melts).
Where to book: direct customers to /workshops or have them message Talya via WhatsApp.`
}

// ── Section: Chocolate Fountain ──────────────────────────────────────────────
function fountainSection(i18n) {
  const desc = pickLocalized(
    i18n,
    'fountain.offer_desc',
    'A flowing chocolate fountain with styled sweet table, dipping treats and full service for any event.',
  )
  const includes = ['item_fruits', 'item_marshmallows', 'item_brownies', 'item_churros']
    .map((k) => pickLocalized(i18n, `fountain.${k}`, k))
    .join(', ')
  const occasions = ['occasion_1', 'occasion_2', 'occasion_3', 'occasion_4']
    .map((k) => pickLocalized(i18n, `fountain.${k}`, k))
    .join(', ')

  return `OFFERING 3: CHOCOLATE FOUNTAIN HOSPITALITY
${desc}
Includes: ${includes}.
Perfect for: ${occasions}.
Pricing: on request — depends on guest count and event location. Talya handles everything — setup, fresh dipping treats, full service, and cleanup.
Where to book: /fountain page on the website, or message via WhatsApp with event date, guest count, and location.`
}

// ── Section: Menu (retail / single items) ────────────────────────────────────
function menuSection() {
  const available = products.filter((p) => p.available)
  if (!available.length) return ''
  const lines = available
    .map((p) => {
      const priceText = p.price
        ? `${p.currency}${p.price} ${p.unit}`
        : 'Price on request'
      const allergens = p.allergens?.length ? p.allergens.join(', ') : 'none'
      return `  - ${p.name}: ${p.description}. ${priceText}. Allergens: ${allergens}.`
    })
    .join('\n')
  return `OFFERING 4: RETAIL MENU (single-item purchases, brownies, chocolate boxes)
${lines}`
}

// ── Section: Contact & site navigation ───────────────────────────────────────
function contactSection() {
  return `CONTACT & LINKS
  - Order pralines in bulk: /bulk-order
  - Workshops: /workshops
  - Chocolate fountain: /fountain
  - Full menu: /menu
  - About Talya: /about
  - Gallery: /gallery
  - Contact form / WhatsApp: /contact
  - All inquiries can also go via WhatsApp directly.`
}

// ── Public API ───────────────────────────────────────────────────────────────
/**
 * Build a comprehensive offerings summary string used by the AI chatbot.
 * Pass the i18next instance to get localized labels in the user's current
 * language; otherwise English fallbacks are used.
 */
export function getOfferingsSummaryForAI(i18n) {
  return [
    brandSection(),
    pralinesSection(i18n),
    workshopsSection(i18n),
    fountainSection(i18n),
    menuSection(),
    contactSection(),
  ]
    .filter(Boolean)
    .join('\n\n')
}
