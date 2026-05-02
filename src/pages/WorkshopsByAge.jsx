import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAgeGroupById, getWorkshopsByAgeGroup } from '../data/workshops'
import './WorkshopsByAge.css'

export default function WorkshopsByAge() {
  const { ageGroupId } = useParams()
  const { t } = useTranslation()
  const group = getAgeGroupById(ageGroupId)

  if (!group) return <Navigate to="/workshops" replace />

  const groupWorkshops = getWorkshopsByAgeGroup(ageGroupId)

  return (
    <div className="wba-page">

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <div className="wba-back container">
        <Link to="/workshops" className="wba-back__link">
          ← {t('workshops.all_workshops')}
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="wba-hero" style={{ background: group.bgGradient }}>
        <div className="container wba-hero__content">
          <div className="wba-hero__icon">{group.icon}</div>
          <h1 className="wba-hero__title">{t(group.labelKey)}</h1>
        </div>
      </section>

      {/* ── Workshop cards ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {groupWorkshops.length === 0 ? (
            <div className="wba-empty">
              <p>{t('workshops.coming_soon_desc')}</p>
            </div>
          ) : (
            <div className="wba-grid">
              {groupWorkshops.map((w) => (
                <div
                  key={w.slug}
                  className="ws-card"
                  style={{ '--ws-color': w.color, '--ws-bg': w.bgGradient }}
                >
                  <div className="ws-card__icon">{w.icon}</div>
                  <h2 className="ws-card__title">{t(w.titleKey)}</h2>
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
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
