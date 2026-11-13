import { useTranslation } from 'react-i18next'
import './Presents.css'

const GIFTS = [
  { id: 'cupcake_kit',    icon: '🧁',   image: '/images/presents/cupcake-kit-1.jpeg' },
  { id: 'cookie_kit',     icon: '🍪',   image: '/images/presents/cookie-kit-1.jpeg' },
  { id: 'bear_romantic',  icon: '🧸🌹', image: '/images/presents/bear-romantic-gold.jpeg' },
  { id: 'bear_trio',      icon: '🧸🍫', image: '/images/presents/bear-trio-1.jpeg' },
  { id: 'choco_egg',      icon: '🍫🥚', image: '/images/presents/choco-egg-open.jpeg' },
  { id: 'hearts_duo',     icon: '❤️🍫', image: '/images/presents/hearts-duo-top.jpeg' },
  { id: 'remote_choco',   icon: '🍫',   image: '/images/presents/remote-choco-1.jpeg' },
  { id: 'praline_box',    icon: '🍫',   image: '/images/presents/praline-box-label.jpeg' },
]

function GiftCard({ gift }) {
  const { t } = useTranslation()
  const base = `presents.${gift.id}`

  return (
    <div className="gift-card">
      {/* Image placeholder — left side */}
      <div className="gift-card__image-wrap">
        {gift.image ? (
          <img src={gift.image} alt={t(`${base}.title`)} className="gift-card__image" loading="lazy" />
        ) : (
          <div className="gift-card__image-placeholder">
            <span>{gift.icon}</span>
            <span className="gift-card__placeholder-label">📸 Photo coming soon</span>
          </div>
        )}
      </div>

      {/* Text — right side */}
      <div className="gift-card__body">
        <h2 className="gift-card__title">{t(`${base}.title`)}</h2>
        <p className="gift-card__tagline">{t(`${base}.tagline`)}</p>

        {/* What's included list */}
        <ul className="gift-card__includes">
          {t(`${base}.includes`, { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {t(`${base}.note`) && (
          <p className="gift-card__note">{t(`${base}.note`)}</p>
        )}

        <div className="gift-card__price">{t(`${base}.price`)}</div>
      </div>
    </div>
  )
}

export default function Presents() {
  const { t } = useTranslation()
  return (
    <div className="presents-page">
      <section className="presents-hero">
        <div className="container presents-hero__content">
          <span className="presents-hero__icon">🎁</span>
          <h1 className="presents-hero__title">{t('presents.page_title')}</h1>
          <p className="presents-hero__subtitle">{t('presents.page_subtitle')}</p>
        </div>
      </section>

      <section className="section presents-list">
        <div className="container">
          {GIFTS.map(gift => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>
    </div>
  )
}
