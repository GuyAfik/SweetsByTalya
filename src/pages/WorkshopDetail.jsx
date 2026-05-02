import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getWorkshopBySlug } from '../data/workshops'
import { social } from '../config/social'
import './WorkshopDetail.css'

export default function WorkshopDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const workshop = getWorkshopBySlug(slug)

  if (!workshop) return <Navigate to="/workshops" replace />

  const { icon, color, bgGradient, titleKey, agesKey, subtitleKey,
          occasions, activities, samplePhotos, pricingTiers,
          pricingType = 'tiered', requirements = [] } = workshop

  return (
    <div className="wd-page">

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <div className="wd-back container">
        <Link to="/workshops" className="wd-back__link">
          ← {t('workshops.all_workshops')}
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — title + subtitle + CTA + photos side by side
             Immediate visual impact. CTA above the fold on desktop.
         ══════════════════════════════════════════════════════════════════ */}
      <section className="wd-hero" style={{ background: bgGradient }}>
        <div className="container wd-hero__inner">

          {/* Left: text + CTA */}
          <div className="wd-hero__text">
            <div className="wd-hero__badge">{icon}</div>
            <h1 className="wd-hero__title">{t(titleKey)}</h1>
            <p className="wd-hero__ages">{t(agesKey)}</p>
            <p className="wd-hero__subtitle">{t(subtitleKey)}</p>
            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg wd-hero__cta"
              style={{ background: color, color: '#fff' }}
            >
              💬 {t('workshops.book_cta')}
            </a>
          </div>

          {/* Right: photos (up to 2 shown in hero) */}
          {samplePhotos.length > 0 && (
            <div className="wd-hero__photos">
              {samplePhotos.slice(0, 2).map((src, i) => (
                <div key={i} className="wd-hero__photo-item">
                  <img
                    src={src}
                    alt={t('workshops.photo_alt', { n: i + 1 })}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={(e) => { e.target.parentElement.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. WHAT YOU GET — activities
             Answer "what am I paying for?" immediately after the hook.
         ══════════════════════════════════════════════════════════════════ */}
      {activities.length > 0 && (
        <section className="section wd-activities">
          <div className="container">
            <h2 className="section-title">{t('workshops.activities_title')}</h2>
            <div className="wd-activities__list">
              {activities.map(({ num, icon: aIcon, key }) => (
                <div key={key} className="wd-activity">
                  <div className="wd-activity__num" style={{ background: color }}>{num}</div>
                  <div className="wd-activity__icon">{aIcon}</div>
                  <div className="wd-activity__body">
                    <h3 className="wd-activity__title">{t(`workshops.${key}_title`)}</h3>
                    <p className="wd-activity__desc">{t(`workshops.${key}_desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="wd-activities__closing">{t('workshops.activities_closing')}</p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3. PHOTOS — full gallery
             Social proof. Show the real experience after describing it.
             Show remaining photos (beyond the 2 in the hero).
         ══════════════════════════════════════════════════════════════════ */}
      {samplePhotos.length > 0 && (
        <section className="wd-photos" style={{ background: bgGradient }}>
          <div className="container">
            <h2 className="section-title">{t('workshops.photos_title')}</h2>
            <div className="wd-photos__grid">
              {samplePhotos.map((src, i) => (
                <div key={i} className="wd-photos__item">
                  <img
                    src={src}
                    alt={t('workshops.photo_alt', { n: i + 1 })}
                    loading="lazy"
                    onError={(e) => { e.target.parentElement.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          4. FOR WHOM — occasions
             Now that they're interested, confirm it's right for them.
         ══════════════════════════════════════════════════════════════════ */}
      {occasions.length > 0 && (
        <section className="section wd-occasions">
          <div className="container">
            <h2 className="section-title">{t('workshops.occasions_title')}</h2>
            <div className="wd-occasions__grid">
              {occasions.map(({ icon: oIcon, key }) => (
                <div key={key} className="wd-occasion-card" style={{ '--ws-color': color }}>
                  <span className="wd-occasion-card__icon">{oIcon}</span>
                  <p className="wd-occasion-card__label">{t(`workshops.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          5. PRICING — clear and prominent
             Transparent pricing builds trust. Show before the final CTA.
         ══════════════════════════════════════════════════════════════════ */}
      {pricingTiers.length > 0 && (
        <section className="section wd-pricing">
          <div className="container">
            <h2 className="section-title">{t('workshops.pricing_title')}</h2>

            {pricingType === 'flat' ? (
              <div className="wd-pricing__flat" style={{ borderColor: color }}>
                <span className="wd-pricing__flat-label">{t('workshops.pricing_per_pair')}</span>
                <span className="wd-pricing__flat-price" style={{ color }}>
                  {t(`workshops.${pricingTiers[0].priceKey}`)}
                </span>
              </div>
            ) : (
              <div className="wd-pricing__table">
                <div className="wd-pricing__header" style={{ background: color }}>
                  <span>{t('workshops.pricing_col_participants')}</span>
                  <span>{t('workshops.pricing_col_price')}</span>
                </div>
                {pricingTiers.map(({ participants, priceKey }, i) => (
                  <div key={i} className="wd-pricing__row">
                    <span className="wd-pricing__participants">
                      {participants} {t('workshops.pricing_participants_label')}
                    </span>
                    <span className="wd-pricing__price" style={{ color }}>
                      {t(`workshops.${priceKey}`)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="wd-pricing__note">{t('workshops.pricing_note')}</p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          6. REQUIREMENTS (home-visit workshops only)
             Practical info — shown only when relevant.
         ══════════════════════════════════════════════════════════════════ */}
      {requirements.length > 0 && (
        <section className="section wd-requirements">
          <div className="container">
            <h2 className="section-title">{t('workshops.requirements_title')}</h2>
            <div className="wd-requirements__grid">
              {requirements.map(({ icon: rIcon, key }) => (
                <div key={key} className="wd-req-card" style={{ '--ws-color': color }}>
                  <span className="wd-req-card__icon">{rIcon}</span>
                  <p className="wd-req-card__label">{t(`workshops.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          7. WHY US — reinforce the decision
         ══════════════════════════════════════════════════════════════════ */}
      <section className="section wd-why">
        <div className="container">
          <h2 className="section-title">{t('workshops.why_title')}</h2>
          <p className="wd-why__text">{t('workshops.why_text')}</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          8. FINAL CTA BANNER — strong close
         ══════════════════════════════════════════════════════════════════ */}
      <section className="wd-cta-banner" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
        <div className="container wd-cta-banner__inner">
          <h2 className="wd-cta-banner__title">{t('workshops.cta_title')}</h2>
          <p className="wd-cta-banner__subtitle">{t('workshops.cta_subtitle')}</p>
          <a
            href={social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg wd-cta-banner__btn"
          >
            💬 {t('workshops.book_cta')}
          </a>
        </div>
      </section>

    </div>
  )
}
