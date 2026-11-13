import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Workshops.css'

// Each merged card represents one workshop type, showing both age variants
const MERGED_WORKSHOPS = [
  {
    id: 'chocolate-painting',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    titleKey: 'workshops.w5_title',
    subtitleKey: 'workshops.w5_subtitle',
    variants: [
      {
        labelKey: 'workshops.age_group_5_11',
        slug: 'chocolate-painting',
        photo: '/images/workshops/chocolate-painting/workshop-1.jpeg',
      },
      {
        labelKey: 'workshops.age_group_12_plus',
        slug: 'chocolate-painting-teens',
        photo: '/images/workshops/chocolate-painting/workshop-12plus.jpeg',
      },
    ],
  },
  {
    id: 'friends-at-heart',
    icon: '💗',
    color: '#c2185b',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
    titleKey: 'workshops.w1_title',
    subtitleKey: 'workshops.w1_subtitle',
    variants: [
      {
        labelKey: 'workshops.age_group_10_13',
        slug: 'friends-at-heart',
        photo: '/images/workshops/friends-at-heart/workshop-cover.jpeg',
      },
      {
        labelKey: 'workshops.age_group_14_plus',
        slug: 'friends-at-heart-teens',
        photo: '/images/workshops/friends-at-heart-teens/workshop-14-1.jpeg',
      },
    ],
  },
  {
    id: 'surprise-egg',
    icon: '🥚',
    color: '#6a1b9a',
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 50%, #ede7f6 100%)',
    titleKey: 'workshops.w4_title',
    subtitleKey: 'workshops.w4_subtitle',
    variants: [
      {
        labelKey: 'workshops.age_group_10_13',
        slug: 'surprise-egg-kids',
        photo: '/images/workshops/surprise-egg/workshop-cover.jpeg',
      },
      {
        labelKey: 'workshops.age_group_14_plus',
        slug: 'surprise-egg-teens',
        photo: '/images/workshops/family-memories/workshop-family-1.jpeg',
      },
    ],
  },
]

function MergedWorkshopCard({ workshop }) {
  const { t } = useTranslation()
  return (
    <div
      className="ws-merged-card"
      style={{ '--ws-color': workshop.color, '--ws-bg': workshop.bgGradient }}
    >
      {/* Header */}
      <div className="ws-merged-card__header">
        <span className="ws-merged-card__icon">{workshop.icon}</span>
        <div>
          <h3 className="ws-merged-card__title">{t(workshop.titleKey)}</h3>
          <p className="ws-merged-card__subtitle">{t(workshop.subtitleKey)}</p>
        </div>
      </div>

      {/* Two age-variant panels side by side */}
      <div className="ws-merged-card__variants">
        {workshop.variants.map((v) => (
          <Link
            key={v.slug}
            to={`/workshops/${v.slug}`}
            className="ws-variant-panel"
          >
            <div className="ws-variant-panel__photo-wrap">
              <img
                src={v.photo}
                alt={t(v.labelKey)}
                loading="lazy"
                className="ws-variant-panel__photo"
                onError={(e) => { e.target.parentElement.style.background = '#e0c4a0' }}
              />
              <div className="ws-variant-panel__overlay" />
            </div>
            <div className="ws-variant-panel__label">
              <span>{t(v.labelKey)}</span>
              <span className="ws-variant-panel__arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Workshops() {
  const { t } = useTranslation()

  return (
    <div className="workshops-page">

      <section className="ws-list-hero">
        <div className="container ws-list-hero__content">
          <h1 className="ws-list-hero__title">{t('workshops.page_title')}</h1>
          <p className="ws-list-hero__subtitle">{t('workshops.page_subtitle')}</p>
        </div>
      </section>

      <section className="ws-category-section ws-category-section--chocolate">
        <div className="container">
          <div className="ws-category-header">
            <span className="ws-category-header__icon">🍫</span>
            <h2 className="ws-category-header__title">{t('workshops.category_chocolate')}</h2>
          </div>
          <div className="ws-merged-grid">
            {MERGED_WORKSHOPS.map(w => (
              <MergedWorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
