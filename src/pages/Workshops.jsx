import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ageGroups } from '../data/workshops'
import './Workshops.css'

export default function Workshops() {
  const { t } = useTranslation()

  return (
    <div className="workshops-page">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="ws-list-hero">
        <div className="container ws-list-hero__content">
          <h1 className="ws-list-hero__title">{t('workshops.page_title')}</h1>
          <p className="ws-list-hero__subtitle">{t('workshops.page_subtitle')}</p>
        </div>
      </section>

      {/* ── Age group cards ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="ws-list__grid">
            {ageGroups.map((group) => (
              group.comingSoon ? (
                <div key={group.id} className="ws-age-card ws-age-card--coming-soon">
                  <div className="ws-age-card__icon">{group.icon}</div>
                  <h2 className="ws-age-card__label">{t(group.labelKey)}</h2>
                  <span className="ws-card__coming-soon">{t('workshops.coming_soon')}</span>
                </div>
              ) : (
                <Link
                  key={group.id}
                  to={`/workshops/age/${group.id}`}
                  className="ws-age-card"
                  style={{ '--ws-bg': group.bgGradient || 'linear-gradient(135deg, #fce4ec, #f8bbd0)', '--ws-color': group.color || '#c2185b' }}
                >
                  <div className="ws-age-card__icon">{group.icon}</div>
                  <h2 className="ws-age-card__label">{t(group.labelKey)}</h2>
                  <span className="ws-age-card__cta">{t('workshops.view_workshops')} →</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
