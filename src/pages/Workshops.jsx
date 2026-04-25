import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Workshops.css'

const WORKSHOPS = [
  { id: 1, icon: '🍫', key: 'workshop1' },
  { id: 2, icon: '🍬', key: 'workshop2' },
  { id: 3, icon: '🎨', key: 'workshop3' },
  { id: 4, icon: '🎁', key: 'workshop4' },
  { id: 5, icon: '👨‍👩‍👧', key: 'workshop5' },
]

export default function Workshops() {
  const { t } = useTranslation()

  return (
    <div className="workshops">
      <section className="workshops-hero">
        <div className="workshops-hero__overlay" />
        <div className="container workshops-hero__content">
          <h1 className="workshops-hero__title">{t('workshops.hero_title')}</h1>
          <p className="workshops-hero__subtitle accent-text">{t('workshops.hero_subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="workshops__intro">
            <h2 className="workshops__intro-title">{t('workshops.intro_title')}</h2>
            <p className="workshops__intro-text">{t('workshops.intro_text')}</p>
          </div>

          <div className="workshops__grid">
            {WORKSHOPS.map(({ id, icon, key }) => (
              <div key={id} className="workshop-card">
                <div className="workshop-card__icon">{icon}</div>
                <h3 className="workshop-card__title">{t(`workshops.${key}_title`)}</h3>
                <p className="workshop-card__desc">{t(`workshops.${key}_desc`)}</p>
                <span className="workshop-card__badge">{t('workshops.coming_soon')}</span>
              </div>
            ))}
          </div>

          <div className="workshops__cta">
            <p className="workshops__cta-text">{t('workshops.cta_text')}</p>
            <Link to="/order" className="btn btn--primary">{t('workshops.cta_button')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
