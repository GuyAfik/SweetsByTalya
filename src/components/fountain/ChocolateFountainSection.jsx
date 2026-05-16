import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getWhatsAppOrderLink } from '../../config/social'
import './ChocolateFountainSection.css'

export default function ChocolateFountainSection({ variant = 'banner' }) {
  const { t } = useTranslation()

  const items = [
    { emoji: '🍓', key: 'item_fruits' },
    { emoji: '🍡', key: 'item_marshmallows' },
    { emoji: '🍫', key: 'item_brownies' },
    { emoji: '🥐', key: 'item_churros' },
  ]

  const occasions = [
    { emoji: '🎂', key: 'occasion_1' },
    { emoji: '🎉', key: 'occasion_2' },
    { emoji: '💼', key: 'occasion_3' },
    { emoji: '✨', key: 'occasion_4' },
  ]

  const waLink = getWhatsAppOrderLink(t('fountain.whatsapp_message'))

  if (variant === 'card') {
    return (
      <div className="offer-card offer-card--fountain">
        <div className="offer-card__image-wrap">
          <img
            src="/images/fountain/fountain-hero.jpg"
            alt={t('fountain.offer_title')}
            className="offer-card__image"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x450/3B1F0E/F2C4CE?text=🍫'
            }}
          />
        </div>
        <div className="offer-card__body">
          <div className="offer-card__emoji">🍫</div>
          <h3 className="offer-card__title">{t('fountain.offer_title')}</h3>
          <p className="offer-card__desc">{t('fountain.offer_desc')}</p>
          <ul className="offer-card__occasions">
            {occasions.map(({ emoji, key }) => (
              <li key={key}>{emoji} {t(`fountain.${key}`)}</li>
            ))}
          </ul>
          <Link to="/fountain" className="btn btn-caramel offer-card__cta">
            {t('fountain.cta')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="fountain-banner section">
      <div className="container">
        <div className="fountain-banner__inner">
          <div className="fountain-banner__image-wrap">
            <img
              src="/images/fountain/fountain-hero.jpg"
              alt={t('fountain.offer_title')}
              className="fountain-banner__image"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x500/3B1F0E/F2C4CE?text=🍫'
              }}
            />
          </div>

          <div className="fountain-banner__content">
            <div className="fountain-banner__emoji">🍫</div>
            <h2 className="fountain-banner__title">{t('fountain.offer_title')}</h2>
            <p className="fountain-banner__desc">{t('fountain.offer_desc')}</p>

            <div className="fountain-banner__lists">
              <div className="fountain-banner__list-group">
                <h4 className="fountain-banner__list-title">{t('fountain.includes_title')}</h4>
                <ul className="fountain-banner__list">
                  {items.map(({ emoji, key }) => (
                    <li key={key} className="fountain-banner__list-item">
                      <span className="fountain-banner__check">✅</span>
                      {emoji} {t(`fountain.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fountain-banner__list-group">
                <h4 className="fountain-banner__list-title">{t('fountain.occasions_title')}</h4>
                <ul className="fountain-banner__list">
                  {occasions.map(({ emoji, key }) => (
                    <li key={key} className="fountain-banner__list-item">
                      <span className="fountain-banner__check">✅</span>
                      {emoji} {t(`fountain.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="fountain-banner__service-note">
              ⭐ {t('fountain.full_service_note')}
            </p>

            <div className="fountain-banner__ctas">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                💬 {t('fountain.cta')}
              </a>
              <Link to="/fountain" className="btn btn-secondary">
                {t('fountain.nav_label')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
