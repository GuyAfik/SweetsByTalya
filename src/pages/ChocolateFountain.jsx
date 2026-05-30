import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FountainOrderModal from '../components/fountain/FountainOrderModal'
import './ChocolateFountain.css'

const COLOR_OPTIONS = [
  { key: 'pink',   hex: '#F48FB1' },
  { key: 'red',    hex: '#E53935' },
  { key: 'green',  hex: '#43A047' },
  { key: 'blue',   hex: '#1E88E5' },
  { key: 'yellow', hex: '#FDD835' },
]

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

export default function ChocolateFountain() {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="fountain-page">

      <section className="fountain-hero">
        <div className="container fountain-hero__content">
          <div className="fountain-hero__emoji">🍫</div>
          <h1 className="fountain-hero__title">{t('fountain.page_title')}</h1>
          <p className="fountain-hero__subtitle">{t('fountain.page_subtitle')}</p>
          <button type="button" className="btn btn-whatsapp btn-lg" onClick={() => setShowModal(true)}>
            💬 {t('fountain.cta')}
          </button>
        </div>
      </section>

      <section className="section fountain-about">
        <div className="container">
          <div className="fountain-about__inner">
            <div className="fountain-about__image-wrap">
              <img
                src="/images/fountain/fountain-table.jpg"
                alt="Chocolate fountain sweet table setup"
                className="fountain-about__image"
                loading="lazy"
              />
            </div>
            <div className="fountain-about__text">
              <h2 className="fountain-about__title">{t('fountain.offer_title')}</h2>
              <div className="divider" style={{ margin: '1rem 0' }} />
              <p className="fountain-about__desc">{t('fountain.offer_desc')}</p>
              <p className="fountain-about__service-note">
                ⭐ {t('fountain.full_service_note')}
              </p>
              <p className="fountain-about__price">
                💰 {t('fountain.price_label')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section fountain-details">
        <div className="container">
          <div className="fountain-details__grid">

            <div className="fountain-details__card">
              <h3 className="fountain-details__card-title">{t('fountain.includes_title')}</h3>
              <ul className="fountain-details__list">
                {items.map(({ emoji, key }) => (
                  <li key={key} className="fountain-details__list-item">
                    <span className="fountain-details__check">✅</span>
                    <span className="fountain-details__item-emoji">{emoji}</span>
                    {t(`fountain.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fountain-details__card">
              <h3 className="fountain-details__card-title">{t('fountain.occasions_title')}</h3>
              <ul className="fountain-details__list">
                {occasions.map(({ emoji, key }) => (
                  <li key={key} className="fountain-details__list-item">
                    <span className="fountain-details__check">✅</span>
                    <span className="fountain-details__item-emoji">{emoji}</span>
                    {t(`fountain.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fountain-details__card">
              <h3 className="fountain-details__card-title">{t('fountain.chocolate_type_title')}</h3>
              <ul className="fountain-details__list">
                <li className="fountain-details__list-item">
                  <span className="fountain-details__check">✅</span>
                  {t('fountain.chocolate_dark')}
                </li>
                <li className="fountain-details__list-item">
                  <span className="fountain-details__check">✅</span>
                  {t('fountain.chocolate_milk')}
                </li>
                <li className="fountain-details__list-item">
                  <span className="fountain-details__check">✅</span>
                  {t('fountain.chocolate_white')}
                </li>
              </ul>
            </div>

            <div className="fountain-details__card">
              <h3 className="fountain-details__card-title">{t('fountain.color_addon_title')}</h3>
              <p className="fountain-details__addon-desc">{t('fountain.color_addon_desc')}</p>
              <div className="fountain-color-swatches">
                {COLOR_OPTIONS.map(({ key, hex }) => (
                  <div key={key} className="fountain-color-swatch" style={{ background: hex }}>
                    <span className="fountain-color-swatch__label">{t(`fountain.color_${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="fountain-cta-banner">
        <div className="container fountain-cta-banner__inner">
          <h2 className="fountain-cta-banner__title">{t('cta_banner.title')}</h2>
          <p className="fountain-cta-banner__subtitle">{t('fountain.full_service_note')}</p>
          <button type="button" className="btn btn-whatsapp btn-lg" onClick={() => setShowModal(true)}>
            💬 {t('fountain.cta')}
          </button>
        </div>
      </section>

      {showModal && <FountainOrderModal onClose={() => setShowModal(false)} />}

    </div>
  )
}
