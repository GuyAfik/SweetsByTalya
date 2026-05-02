// ============================================================
// Sweets by Talya — Workshop Registry
// Add new workshops here. Each entry drives both the listing
// card on /workshops and the full detail page at /workshops/:slug
// ============================================================

export const workshops = [
  {
    slug: 'friends-at-heart',
    icon: '💗',
    color: '#c2185b',          // accent colour for this workshop
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w1_title',
    agesKey: 'workshops.w1_ages',
    subtitleKey: 'workshops.w1_subtitle',
    available: true,
    samplePhotos: [
      '/images/workshops/friends-at-heart/workshop-12-1.jpeg',
      '/images/workshops/friends-at-heart/workshop-12-2.jpeg',
      '/images/workshops/friends-at-heart/workshop-12-3.jpeg',
    ],
    occasions: [
      { icon: '✡️', key: 'occasion_batmitzvah' },
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '👯‍♀️', key: 'occasion_friends' },
      { icon: '🌟', key: 'occasion_other' },
    ],
    activities: [
      { num: 1, icon: '💗', key: 'activity1' },
      { num: 2, icon: '🍫', key: 'activity2' },
      { num: 3, icon: '🎨', key: 'activity3' },
      { num: 4, icon: '🎁', key: 'activity4' },
      { num: 5, icon: '💌', key: 'activity5' },
    ],
    pricingTiers: [
      { participants: '1–6',  priceKey: 'workshop1_price_tier1' },
      { participants: '7–10', priceKey: 'workshop1_price_tier2' },
      { participants: '11–16',priceKey: 'workshop1_price_tier3' },
      { participants: '17+',  priceKey: 'workshop1_price_tier4' },
    ],
  },
  {
    slug: 'friends-at-heart-teens',
    icon: '💜',
    color: '#7b1fa2',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #f3e5f5 100%)',
    titleKey: 'workshops.w2_title',
    agesKey: 'workshops.w2_ages',
    subtitleKey: 'workshops.w2_subtitle',
    available: true,
    samplePhotos: [
      '/images/workshops/friends-at-heart-teens/workshop-14-1.jpeg',
      '/images/workshops/friends-at-heart-teens/workshop-14-2.jpeg',
      '/images/workshops/friends-at-heart-teens/workshop-14-3.jpeg',
    ],
    occasions: [
      { icon: '🤝', key: 'w2_occasion_teambuilding' },
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '👯‍♀️', key: 'occasion_friends' },
      { icon: '🌟', key: 'occasion_other' },
    ],
    activities: [
      { num: 1, icon: '💜', key: 'w2_activity1' },
      { num: 2, icon: '🍫', key: 'w2_activity2' },
      { num: 3, icon: '🎨', key: 'activity3' },
      { num: 4, icon: '🎁', key: 'activity4' },
      { num: 5, icon: '💌', key: 'activity5' },
    ],
    pricingTiers: [
      { participants: '1–6',  priceKey: 'workshop1_price_tier1' },
      { participants: '7–10', priceKey: 'workshop1_price_tier2' },
      { participants: '11–16',priceKey: 'workshop1_price_tier3' },
      { participants: '17+',  priceKey: 'workshop1_price_tier4' },
    ],
  },
  {
    slug: 'family-memories',
    icon: '🥚',
    color: '#2e7d32',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #e8f5e9 100%)',
    titleKey: 'workshops.w3_title',
    agesKey: 'workshops.w3_ages',
    subtitleKey: 'workshops.w3_subtitle',
    available: true,
    pricingType: 'flat',   // 'tiered' (default) | 'flat' — single price per pair
    samplePhotos: [
      '/images/workshops/family-memories/sample-1.jpeg',
      '/images/workshops/family-memories/sample-2.jpeg',
      '/images/workshops/family-memories/sample-3.jpeg',
    ],
    occasions: [
      { icon: '👨‍👩‍👧', key: 'w3_occasion_parent_child' },
      { icon: '👴👵', key: 'w3_occasion_grandparents' },
      { icon: '🎂', key: 'w3_occasion_family_birthday' },
    ],
    activities: [
      { num: 1, icon: '🥚', key: 'w3_activity1' },
      { num: 2, icon: '🍭', key: 'w3_activity2' },
      { num: 3, icon: '💌', key: 'w3_activity3' },
      { num: 4, icon: '🍬', key: 'w3_activity4' },
      { num: 5, icon: '🎨', key: 'w3_activity5' },
    ],
    pricingTiers: [
      { participants: null, priceKey: 'w3_price_flat' },
    ],
    requirements: [
      { icon: '🧊', key: 'w3_req1' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '❄️', key: 'w3_req4' },
    ],
  },
]

/**
 * Find a workshop by its URL slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
export function getWorkshopBySlug(slug) {
  return workshops.find((w) => w.slug === slug)
}
