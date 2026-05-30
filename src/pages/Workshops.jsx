import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { workshops } from '../data/workshops'
import './Workshops.css'

export default function Workshops() {
  const { t } = useTranslation()

  const available = workshops.filter((w) => w.available !== false)

  return (
    <div className="workshops-page">

      <section className="ws-list-hero">
        <div className="container ws-list-hero__content">
          <h1 className="ws-list-hero__title">{t('workshops.page_title')}</h1>
          <p className="ws-list-hero__subtitle">{t('workshops.page_subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ws-cards-grid">
            {available.map((w) => (
              <Link
                key={w.slug}
                to={`/workshops/${w.slug}`}
                className="ws-workshop-card"
                style={{
                  '--ws-bg': w.bgGradient || 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
                  '--ws-color': w.color || '#c2185b',
                }}
              >
                {w.samplePhotos?.[0] && (
                  <div className="ws-workshop-card__photo-wrap">
                    <img
                      src={w.samplePhotos[0]}
                      alt={t(w.titleKey)}
                      className="ws-workshop-card__photo"
                      loading="lazy"
                      onError={(e) => { e.target.parentElement.style.display = 'none' }}
                    />
                  </div>
                )}
                <div className="ws-workshop-card__body">
                  <span className="ws-workshop-card__icon">{w.icon}</span>
                  <span className="ws-workshop-card__ages">{t(w.agesKey)}</span>
                  <h2 className="ws-workshop-card__title">{t(w.titleKey)}</h2>
                  <p className="ws-workshop-card__subtitle">{t(w.subtitleKey)}</p>
                  <span className="ws-workshop-card__cta">{t('workshops.view_workshop')} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
