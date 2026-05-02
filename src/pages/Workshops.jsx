import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ageGroups, getWorkshopsByAgeGroup } from '../data/workshops'
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

      {/* ── Workshop cards grid — one card per age group ─────────────────── */}
      <section className="section">
        <div className="container">
          <div className="ws-list__grid">
            {ageGroups.map((group) => {
              const groupWorkshops = getWorkshopsByAgeGroup(group.id)
              const isComingSoon = group.comingSoon || groupWorkshops.length === 0

              if (isComingSoon) {
                return (
                  <div key={group.id} className="ws-card ws-card--coming-soon">
                    <div className="ws-card__age-badge">{t(group.labelKey)}</div>
                    <div className="ws-card__icon">{group.icon}</div>
                    <h3 className="ws-card__title">{t('workshops.coming_soon_title')}</h3>
                    <p className="ws-card__subtitle">{t('workshops.coming_soon_desc')}</p>
                    <span className="ws-card__coming-soon">{t('workshops.coming_soon')}</span>
                  </div>
                )
              }

              return groupWorkshops.map((w) => (
                <div
                  key={w.slug}
                  className="ws-card"
                  style={{ '--ws-color': w.color, '--ws-bg': w.bgGradient }}
                >
                  <div className="ws-card__age-badge">{t(group.labelKey)}</div>
                  <div className="ws-card__icon">{w.icon}</div>
                  <h3 className="ws-card__title">{t(w.titleKey)}</h3>
                  <p className="ws-card__ages">{t(w.agesKey)}</p>
                  <p className="ws-card__subtitle">{t(w.subtitleKey)}</p>

                  {w.available ? (
                    <Link
                      to={`/workshops/${w.slug}`}
                      className="btn ws-card__btn"
                      style={{ background: w.color, color: '#fff' }}
                    >
                      {t('workshops.view_workshop')} →
                    </Link>
                  ) : (
                    <span className="ws-card__coming-soon">{t('workshops.coming_soon')}</span>
                  )}
                </div>
              ))
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
