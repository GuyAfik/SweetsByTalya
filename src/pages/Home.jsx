import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { social } from '../config/social'
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
    <>
      {heroSlides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={['hero__bg-slide', i === active ? 'hero__bg-slide--active' : ''].filter(Boolean).join(' ')}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="hero__overlay" />
    </>
  )
}

function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero hero--fullscreen">
      <HeroSlideshow />
      <div className="hero__content hero__content--centered">
        <h1 className="hero__headline">{t('home.hero_headline')}</h1>
        <p className="hero__sub">{t('home.hero_sub')}</p>
        <div className="hero__ctas">
          <Link to="/workshops" className="btn btn-caramel btn-lg">
            🎨 {t('nav.workshops')}
          </Link>
          <Link to="/presents" className="btn btn-outline-white btn-lg">
            🎁 {t('nav.presents')}
          </Link>
        </div>
      </div>
      {/* Scroll hint */}
      <div className="hero__scroll-hint">↓</div>
    </section>
  )
}

const OFFER_TILES = [
  {
    id: 'workshops',
    emoji: '🎨',
    titleKey: 'home.tile_workshops_title',
    descKey: 'home.tile_workshops_desc',
    to: '/workshops',
    ctaKey: 'home.tile_workshops_cta',
    image: '/images/workshops/workshop-example-1.jpeg',
    color: '#e65100',
  },
  {
    id: 'presents',
    emoji: '🎁',
    titleKey: 'home.tile_presents_title',
    descKey: 'home.tile_presents_desc',
    to: '/presents',
    ctaKey: 'home.tile_presents_cta',
    image: '/images/presents/praline-box-label.jpeg',
    color: '#c2185b',
  },
  {
    id: 'contact',
    emoji: '💬',
    titleKey: 'home.tile_contact_title',
    descKey: 'home.tile_contact_desc',
    to: '/contact',
    ctaKey: 'home.tile_contact_cta',
    image: '/images/workshops/sadnaot-3.jpg',
    color: '#3b1f0e',
  },
]

function OfferTiles() {
  const { t } = useTranslation()
  return (
    <section className="offer-tiles section">
      <div className="container">
        <h2 className="offer-tiles__title section-title">{t('home.offer_title')}</h2>
        <div className="offer-tiles__grid">
          {OFFER_TILES.map(tile => (
            <Link key={tile.id} to={tile.to} className="offer-tile">
              <div className="offer-tile__image-wrap">
                <img
                  src={tile.image}
                  alt={t(tile.titleKey)}
                  className="offer-tile__image"
                  loading="lazy"
                />
                <div className="offer-tile__image-overlay" style={{ background: `${tile.color}99` }} />
              </div>
              <div className="offer-tile__body">
                <span className="offer-tile__emoji">{tile.emoji}</span>
                <h3 className="offer-tile__title">{t(tile.titleKey)}</h3>
                <p className="offer-tile__desc">{t(tile.descKey)}</p>
                <span className="offer-tile__cta" style={{ color: tile.color }}>
                  {t(tile.ctaKey)} →
                </span>
              </div>
            </Link>
          ))}
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
      <OfferTiles />
      <CTABanner />
    </>
  )
}
