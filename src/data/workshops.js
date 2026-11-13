// ============================================================
// Sweets by Talya — Workshop Registry
// Add new workshops here. Each entry drives both the listing
// card on /workshops and the full detail page at /workshops/:slug
// ============================================================

// Kept for backward-compat (used by offerings.js AI knowledge base)
export const ageGroups = []

export const workshops = [
  {
    slug: 'chocolate-painting',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    titleKey: 'workshops.w5_title',
    subtitleKey: 'workshops.w5_subtitle',
    available: true,
    hidePhotos: false,
    listingPhoto: '/images/workshops/chocolate-painting/workshop-1.jpeg',
    coverPhoto: '/images/workshops/chocolate-painting/workshop-1.jpeg',
    samplePhotos: [
      '/images/workshops/sadnaot-1.jpg',
      '/images/workshops/sadnaot-2.jpg',
      '/images/workshops/workshop-example-1.jpeg',
      '/images/workshops/sadnaot-3.jpg',
    ],
    occasions: [
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '🏫', key: 'w5_occasion_school' },
      { icon: '👨‍👩‍👧', key: 'w4_occasion_family' },
      { icon: '🌟', key: 'occasion_other' },
    ],
    activities: [
      { num: 1, icon: '🍫', key: 'w5_activity1' },
      { num: 2, icon: '🎨', key: 'w5_activity2' },
      { num: 3, icon: '🖌️', key: 'w5_activity3' },
      { num: 4, icon: '🏛️', key: 'w5_activity4' },
    ],
    closingKey: 'workshops.w5_activities_closing',
    pricingTiers: [
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'chocolate-painting-teens',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    titleKey: 'workshops.w5_title',
    subtitleKey: 'workshops.w5_subtitle_teens',
    available: true,
    hidePhotos: false,
    listingPhoto: '/images/workshops/chocolate-painting/workshop-12plus.jpeg',
    coverPhoto: '/images/workshops/chocolate-painting/workshop-12plus.jpeg',
    samplePhotos: [
      '/images/workshops/workshop-example-1.jpeg',
      '/images/workshops/workshop-example-2.jpeg',
      '/images/workshops/sadnaot-1.jpg',
    ],
    occasions: [
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '🏫', key: 'w5_occasion_school' },
      { icon: '👨‍👩‍👧', key: 'w4_occasion_family' },
      { icon: '🌟', key: 'occasion_other' },
    ],
    activities: [
      { num: 1, icon: '🍫', key: 'w5_activity1' },
      { num: 2, icon: '🎨', key: 'w5_activity2' },
      { num: 3, icon: '🖌️', key: 'w5_activity3' },
      { num: 4, icon: '🏛️', key: 'w5_activity4' },
    ],
    closingKey: 'workshops.w5_activities_closing',
    pricingTiers: [
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'friends-at-heart',
    icon: '💗',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w1_title',
    subtitleKey: 'workshops.w1_subtitle',
    available: true,
    hidePhotos: false,
    coverPhoto: '/images/workshops/friends-at-heart/workshop-cover.jpeg',
    samplePhotos: [
      '/images/workshops/friends-at-heart/workshop-12-1.jpeg',
      '/images/workshops/friends-at-heart-teens/workshop-14-3.jpeg',
      '/images/workshops/surprise-egg-teens/sample-1.jpeg',
      '/images/workshops/friends-at-heart/workshop-12-2.jpeg',
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
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'surprise-egg-kids',
    icon: '🥚',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w4_title',
    subtitleKey: 'workshops.w4_subtitle',
    available: true,
    hidePhotos: false,
    coverPhoto: '/images/workshops/surprise-egg/workshop-cover.jpeg',
    closingKey: 'workshops.w4_activities_closing',
    samplePhotos: [
      '/images/workshops/friends-at-heart/workshop-12-3.jpeg',
      '/images/workshops/family-memories/workshop-family-3.jpeg',
    ],
    occasions: [
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '🤝', key: 'w2_occasion_teambuilding' },
      { icon: '👯‍♀️', key: 'occasion_friends' },
      { icon: '👨‍👩‍👧', key: 'w4_occasion_family' },
    ],
    activities: [
      { num: 1, icon: '🥚', key: 'w4_activity1' },
      { num: 2, icon: '🍬', key: 'w4_activity2' },
      { num: 3, icon: '🎨', key: 'w4_activity3' },
      { num: 4, icon: '🍭', key: 'w4_activity4' },
    ],
    pricingTiers: [
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'friends-at-heart-teens',
    icon: '💜',
    color: '#7b1fa2',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #f3e5f5 100%)',
    titleKey: 'workshops.w2_title',
    subtitleKey: 'workshops.w2_subtitle',
    available: true,
    hidePhotos: false,
    samplePhotos: [
      '/images/workshops/friends-at-heart-teens/workshop-14-1.jpeg',
      '/images/workshops/friends-at-heart-teens/workshop-14-2.jpeg',
      '/images/workshops/family-memories/workshop-family-2.jpeg',
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
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'surprise-egg-teens',
    icon: '🥚',
    color: '#6a1b9a',
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 50%, #ede7f6 100%)',
    titleKey: 'workshops.w4_title',
    subtitleKey: 'workshops.w4_subtitle',
    available: true,
    hidePhotos: false,
    samplePhotos: [
      '/images/workshops/family-memories/workshop-family-1.jpeg',
      '/images/workshops/family-memories/workshop-family-3.jpeg',
      '/images/workshops/surprise-egg-teens/sample-1.jpeg',
    ],
    occasions: [
      { icon: '🎂', key: 'occasion_birthday' },
      { icon: '🤝', key: 'w2_occasion_teambuilding' },
      { icon: '👯‍♀️', key: 'occasion_friends' },
      { icon: '👨‍👩‍👧', key: 'w4_occasion_family' },
    ],
    closingKey: 'workshops.w4_activities_closing',
    activities: [
      { num: 1, icon: '🥚', key: 'w4_activity1' },
      { num: 2, icon: '🍬', key: 'w4_activity2' },
      { num: 3, icon: '🎨', key: 'w4_activity3' },
      { num: 4, icon: '🍭', key: 'w4_activity4' },
    ],
    pricingTiers: [
      { participants: '5–6',   priceKey: 'workshop1_price_tier1' },
      { participants: '7–10',  priceKey: 'workshop1_price_tier2' },
      { participants: '11–16', priceKey: 'workshop1_price_tier3' },
      { participants: '17+',   priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
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
