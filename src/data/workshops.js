// ============================================================
// Sweets by Talya — Workshop Registry
// Add new workshops here. Each entry drives both the listing
// card on /workshops and the full detail page at /workshops/:slug
// ============================================================

// ── Age group categories (controls listing page sections) ────────────────────
export const ageGroups = [
  {
    id: 'ages-5-9',
    labelKey: 'workshops.age_group_5_9',
    icon: '🌟',
    color: '#f57f17',
    bgGradient: 'linear-gradient(135deg, #fff9c4 0%, #fff176 50%, #fff9c4 100%)',
    comingSoon: true,
  },
  {
    id: 'ages-7-family',
    labelKey: 'workshops.age_group_7_family',
    icon: '👨‍👩‍👧',
    color: '#2e7d32',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #e8f5e9 100%)',
    comingSoon: false,
  },
  {
    id: 'ages-10-13',
    labelKey: 'workshops.age_group_10_13',
    icon: '💗',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    comingSoon: false,
  },
  {
    id: 'ages-14-plus',
    labelKey: 'workshops.age_group_14_plus',
    icon: '💜',
    color: '#7b1fa2',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #f3e5f5 100%)',
    comingSoon: false,
  },
]

/**
 * Find an age group by its id.
 * @param {string} id
 * @returns {object|undefined}
 */
export function getAgeGroupById(id) {
  return ageGroups.find((g) => g.id === id)
}

export const workshops = [
  {
    slug: 'friends-at-heart',
    ageGroupId: 'ages-10-13',
    icon: '💗',
    color: '#c2185b',
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
      { participants: '5–6',  priceKey: 'workshop1_price_tier1' },
      { participants: '7–10', priceKey: 'workshop1_price_tier2' },
      { participants: '11–16',priceKey: 'workshop1_price_tier3' },
      { participants: '17+',  priceKey: 'workshop1_price_tier4' },
    ],
  },
  {
    slug: 'friends-at-heart-teens',
    ageGroupId: 'ages-14-plus',
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
      { participants: '5–6',  priceKey: 'workshop1_price_tier1' },
      { participants: '7–10', priceKey: 'workshop1_price_tier2' },
      { participants: '11–16',priceKey: 'workshop1_price_tier3' },
      { participants: '17+',  priceKey: 'workshop1_price_tier4' },
    ],
  },
  {
    slug: 'surprise-egg-teens',
    ageGroupId: 'ages-14-plus',
    icon: '🥚',
    color: '#6a1b9a',
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 50%, #ede7f6 100%)',
    titleKey: 'workshops.w4_title',
    agesKey: 'workshops.w4_ages',
    subtitleKey: 'workshops.w4_subtitle',
    available: true,
    samplePhotos: [
      '/images/workshops/family-memories/workshop-family-1.jpeg',
      '/images/workshops/family-memories/workshop-family-2.jpeg',
      '/images/workshops/family-memories/workshop-family-3.jpeg',
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
      { participants: '5–6',  priceKey: 'workshop1_price_tier1' },
      { participants: '7–10', priceKey: 'workshop1_price_tier2' },
      { participants: '11–16',priceKey: 'workshop1_price_tier3' },
      { participants: '17+',  priceKey: 'workshop1_price_tier4' },
    ],
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'family-memories',
    ageGroupId: 'ages-7-family',
    icon: '🥚',
    color: '#2e7d32',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #e8f5e9 100%)',
    titleKey: 'workshops.w3_title',
    agesKey: 'workshops.w3_ages',
    subtitleKey: 'workshops.w3_subtitle',
    available: true,
    pricingType: 'flat',   // 'tiered' (default) | 'flat' — single price per pair
    samplePhotos: [
      '/images/workshops/family-memories/workshop-family-1.jpeg',
      '/images/workshops/family-memories/workshop-family-2.jpeg',
      '/images/workshops/family-memories/workshop-family-3.jpeg',
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

/**
 * Returns workshops belonging to a given age group id.
 * @param {string} ageGroupId
 * @returns {object[]}
 */
export function getWorkshopsByAgeGroup(ageGroupId) {
  return workshops.filter((w) => w.ageGroupId === ageGroupId)
}
