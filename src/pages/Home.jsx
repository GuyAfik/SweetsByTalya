import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { social } from '../config/social'
import './Home.css'

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero">
      {/* Left: text content */}
      <div className="hero__content">
        <p className="hero__brand-name">Sweets by Talya</p>
        <h1 className="hero__title">{t('hero.tagline')}</h1>
        <p className="hero__subtitle">{t('hero.subtitle')}</p>
        <div className="hero__ctas">
          <Link to="/build-your-box" className="btn btn-caramel btn-lg">
            🍫 {t('nav.build_box')}
          </Link>
          <Link to="/gallery" className="btn btn-secondary btn-lg hero__cta-secondary">
            {t('hero.cta_gallery')}
          </Link>
        </div>
      </div>

      {/* Right: photos in a horizontal row */}
      <div className="hero__photo">
        <img
          src="/images/gallery/talya-with-boxes.jpg"
          alt="Talya with her handcrafted chocolate boxes"
          className="hero__photo-img"
        />
        <img
          src="/images/hero-pralines.jpg"
          alt="Assorted handcrafted pralines"
          className="hero__photo-img"
        />
        <img
          src="/images/gallery/pralines-6.png"
          alt="Handcrafted pralines collection"
          className="hero__photo-img"
        />
      </div>
    </section>
  )
}

// ── Why Us ────────────────────────────────────────────────────────────────────
function WhyUs() {
  const { t } = useTranslation()

  const reasons = [
    {
      icon: '🤲',
      title: t('whyus.handmade_title'),
      desc: t('whyus.handmade_desc'),
    },
    {
      icon: '⭐',
      title: t('whyus.premium_title'),
      desc: t('whyus.premium_desc'),
    },
    {
      icon: '🎁',
      title: t('whyus.custom_title'),
      desc: t('whyus.custom_desc'),
    },
  ]

  return (
    <section className="whyus section">
      <div className="container">
        <h2 className="section-title">{t('whyus.title')}</h2>
        <div className="divider" />
        <div className="whyus__grid">
          {reasons.map(({ icon, title, desc }) => (
            <div key={title} className="whyus__card">
              <div className="whyus__icon">{icon}</div>
              <h3 className="whyus__title">{title}</h3>
              <p className="whyus__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Instagram Preview ─────────────────────────────────────────────────────────
// Shows real gallery photos that link to Instagram.
// Instagram's Basic Display API was deprecated Dec 2024 — live feed requires
// a paid third-party service. Replace `galleryPhotos` with API data if/when
// that is set up.
const galleryPhotos = [
  '/images/gallery/pralines-1.jpg',
  '/images/gallery/pralines-2.jpg',
  '/images/gallery/pralines-3.jpg',
  '/images/gallery/brownies-1.jpg',
  '/images/gallery/brownies-2.jpg',
  '/images/gallery/brownies-3.jpg',
]

function InstagramPreview() {
  const { t } = useTranslation()

  return (
    <section className="instagram section-sm">
      <div className="container">
        <h2 className="section-title">{t('instagram.title')}</h2>
        <p className="section-subtitle">{t('instagram.subtitle')}</p>

        <div className="instagram__grid">
          {galleryPhotos.map((src, i) => (
            <a
              key={src}
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram__item"
              aria-label="View on Instagram"
            >
              <img
                src={src}
                alt={`Sweets by Talya — photo ${i + 1}`}
                loading="lazy"
              />
              <div className="instagram__overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram__follow">
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            📸 {t('instagram.follow')}
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  const { t } = useTranslation()

  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">{t('cta_banner.title')}</h2>
          <p className="cta-banner__subtitle">{t('cta_banner.subtitle')}</p>
          <a
            href={social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            💬 {t('cta_banner.button')}
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <InstagramPreview />
      <CTABanner />
    </>
  )
}
