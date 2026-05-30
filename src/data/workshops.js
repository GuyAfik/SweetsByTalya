// ============================================================
// Sweets by Talya — Workshop Registry
// Add new workshops here. Each entry drives both the listing
// card on /workshops and the full detail page at /workshops/:slug
// ============================================================

// ── Age group categories (controls listing page sections) ────────────────────
export const ageGroups = [
  {
    id: 'ages-5-11',
    labelKey: 'workshops.age_group_5_11',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
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
    slug: 'chocolate-painting',
    ageGroupId: 'ages-5-11',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    titleKey: 'workshops.w5_title',
    agesKey: 'workshops.w5_ages',
    subtitleKey: 'workshops.w5_subtitle',
    available: true,
    hidePhotos: true,
    listingPhoto: '/images/workshops/chocolate-painting/workshop-1.jpeg',
    coverPhoto: '/images/workshops/chocolate-painting/workshop-1.jpeg',
    samplePhotos: [],
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
    slug: 'chocolate-painting-teens',
    ageGroupId: 'ages-12-plus',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    titleKey: 'workshops.w5_title',
    agesKey: 'workshops.w5_ages_teens',
    subtitleKey: 'workshops.w5_subtitle',
    available: true,
    hidePhotos: true,
    listingPhoto: '/images/workshops/chocolate-painting/workshop-12plus.jpeg',
    coverPhoto: '/images/workshops/chocolate-painting/workshop-12plus.jpeg',
    samplePhotos: [],
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
    slug: 'friends-at-heart',
    ageGroupId: 'ages-10-13',
    icon: '💗',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w1_title',
    agesKey: 'workshops.w1_ages',
    subtitleKey: 'workshops.w1_subtitle',
    available: true,
    hidePhotos: true,
    coverPhoto: '/images/workshops/friends-at-heart/workshop-cover.jpeg',
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
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
    ],
  },
  {
    slug: 'surprise-egg-kids',
    ageGroupId: 'ages-10-13',
    icon: '🥚',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w4_title',
    agesKey: 'workshops.w4_kids_ages',
    subtitleKey: 'workshops.w4_subtitle',
    available: true,
    hidePhotos: true,
    coverPhoto: '/images/workshops/surprise-egg/workshop-cover.jpeg',
    closingKey: 'workshops.w4_activities_closing',
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
    requirements: [
      { icon: '❄️', key: 'w3_req4' },
      { icon: '🪑', key: 'w3_req3' },
      { icon: '📡', key: 'w3_req2' },
      { icon: '🧊', key: 'w3_req1' },
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
