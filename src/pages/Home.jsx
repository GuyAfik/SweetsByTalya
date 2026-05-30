import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { social } from '../config/social'
import { flags } from '../config/featureFlags'
import ChocolateFountainSection from '../components/fountain/ChocolateFountainSection'
import './Home.css'

const heroSlides = [
  { src: '/images/hero/hero-1.jpeg', alt: 'Sweets by Talya' },
  { src: '/images/hero/hero-2.jpeg', alt: 'Sweets by Talya' },
  { src: '/images/hero/hero-3.jpeg', alt: 'Sweets by Talya' },
  { src: '/images/hero/hero-4.jpeg', alt: 'Sweets by Talya' },
  { src: '/images/hero/hero-5.jpeg', alt: 'Sweets by Talya' },
]

function HeroSlideshow() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => {
    setActive(i => (i + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="hero__slideshow">
      {heroSlides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={['hero__slide', i === active ? 'hero__slide--active' : ''].filter(Boolean).join(' ')}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="hero__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={['hero__dot', i === active ? 'hero__dot--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">{t('hero.tagline')}</h1>
        <div className="hero__ctas">
          {flags.bulkOrder.enabled && (
            <Link to="/bulk-order" className="btn btn-caramel btn-lg">
              🍫 {t('nav.bulk_order')}
            </Link>
          )}
          <Link to="/workshops" className="btn btn-secondary btn-lg">
            🎨 {t('nav.workshops')}
          </Link>
        </div>
      </div>
      <HeroSlideshow />
    </section>
  )
}

function WhatWeOffer() {
  const { t } = useTranslation()
  return (
    <section className="what-we-offer section">
      <div className="container">
        <h2 className="section-title">{t('home.offer_title')}</h2>
        <p className="section-subtitle">{t('home.offer_subtitle')}</p>

        <div className="offer-cards">
          <div className="offer-card offer-card--pralines">
            <div className="offer-card__image-wrap">
              <img
                src="/images/gallery/pralines-8.jpg"
                alt="Handcrafted pralines for events"
                className="offer-card__image"
                loading="lazy"
              />
            </div>
            <div className="offer-card__body">
              <div className="offer-card__emoji">🍫</div>
              <h3 className="offer-card__title">{t('home.pralines_title')}</h3>
              <p className="offer-card__desc">{t('home.pralines_desc')}</p>
              <ul className="offer-card__occasions">
                <li>🎂 {t('home.pralines_occasion_1')}</li>
                <li>💍 {t('home.pralines_occasion_2')}</li>
                <li>🏢 {t('home.pralines_occasion_3')}</li>
                <li>🎁 {t('home.pralines_occasion_4')}</li>
              </ul>
              {flags.bulkOrder.enabled && (
                <Link to="/bulk-order" className="btn btn-caramel offer-card__cta">
                  {t('home.pralines_cta')}
                </Link>
              )}
            </div>
          </div>

          <div className="offer-card offer-card--workshops">
            <div className="offer-card__image-wrap">
              <img
                src="/images/workshops/workshop-example-1.jpeg"
                alt="Chocolate workshops for events"
                className="offer-card__image"
                loading="lazy"
              />
            </div>
            <div className="offer-card__body">
              <div className="offer-card__emoji">🎨</div>
              <h3 className="offer-card__title">{t('home.workshops_title')}</h3>
              <p className="offer-card__desc">{t('home.workshops_desc')}</p>
              <ul className="offer-card__occasions">
                <li>🎂 {t('home.workshops_occasion_1')}</li>
                <li>👧 {t('home.workshops_occasion_2')}</li>
                <li>👨‍👩‍👧 {t('home.workshops_occasion_3')}</li>
                <li>🎓 {t('home.workshops_occasion_4')}</li>
              </ul>
              <Link to="/workshops" className="btn btn-caramel offer-card__cta">
                {t('home.workshops_cta')}
              </Link>
            </div>
          </div>

          {flags.chocolateFountain && (
            <ChocolateFountainSection variant="card" />
          )}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const { t } = useTranslation()
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">{t('cta_banner.title')}</h2>
          <p className="cta-banner__subtitle">{t('cta_banner.subtitle')}</p>
          <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
            💬 {t('cta_banner.button')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeOffer />
      <CTABanner />
    </>
  )
}
