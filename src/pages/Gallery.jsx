import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Gallery.css'

// ── Gallery data ──────────────────────────────────────────────────────────────
// Each category has a labelKey, a cover photo, and a list of photos.
// Add new categories or photos here — no component changes needed.
const categories = [
  {
    id: 'pralines',
    labelKey: 'gallery.filter_pralines',
    cover: '/images/gallery/pralines-1.jpg',
    photos: [
      { src: '/images/gallery/pralines-1.jpg', caption: '' },
      { src: '/images/gallery/pralines-2.jpg', caption: '' },
      { src: '/images/gallery/pralines-3.jpg', caption: '' },
      { src: '/images/gallery/pralines-4.jpg', caption: '' },
      { src: '/images/gallery/pralines-5.jpg', caption: '' },
      { src: '/images/gallery/pralines-7.jpg', caption: '' },
      { src: '/images/gallery/pralines-8.jpg', caption: '' },
    ],
  },
  {
    id: 'workshops',
    labelKey: 'gallery.filter_workshops',
    cover: '/images/workshops/workshop-example-1.jpeg',
    photos: [
      { src: '/images/workshops/workshop-example-1.jpeg', caption: '' },
      { src: '/images/workshops/workshop-example-2.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart/workshop-12-1.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart/workshop-12-2.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart/workshop-12-3.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart-teens/workshop-14-1.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart-teens/workshop-14-2.jpeg', caption: '' },
      { src: '/images/workshops/friends-at-heart-teens/workshop-14-3.jpeg', caption: '' },
      { src: '/images/workshops/family-memories/workshop-family-1.jpeg', caption: '' },
      { src: '/images/workshops/family-memories/workshop-family-2.jpeg', caption: '' },
      { src: '/images/workshops/family-memories/workshop-family-3.jpeg', caption: '' },
      { src: '/images/workshops/surprise-egg-teens/sample-1.jpeg', caption: '' },
      { src: '/images/workshops/surprise-egg-teens/sample-2.jpeg', caption: '' },
    ],
  },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [openCategory, setOpenCategory] = useState(null) // category id
  const [lightbox, setLightbox] = useState(null)          // photo index within open category

  const activeCategory = categories.find((c) => c.id === openCategory)

  const openCat = (id) => {
    setOpenCategory(id)
    setLightbox(null)
  }

  const closeCat = () => {
    setOpenCategory(null)
    setLightbox(null)
  }

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevPhoto = () =>
    setLightbox((i) => (i - 1 + activeCategory.photos.length) % activeCategory.photos.length)
  const nextPhoto = () =>
    setLightbox((i) => (i + 1) % activeCategory.photos.length)

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="gallery-header">
        <div className="container">
          <h1>{t('gallery.title')}</h1>
          <p className="accent-text">{t('gallery.subtitle')}</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">

          {/* ── Category cards ─────────────────────────────────────────────── */}
          {!openCategory && (
            <div className="gallery-categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="gallery-cat-card"
                  onClick={() => openCat(cat.id)}
                  aria-label={t(cat.labelKey)}
                >
                  <img
                    src={cat.cover}
                    alt={t(cat.labelKey)}
                    className="gallery-cat-card__img"
                    loading="lazy"
                  />
                  <div className="gallery-cat-card__overlay">
                    <span className="gallery-cat-card__label">{t(cat.labelKey)}</span>
                    <span className="gallery-cat-card__count">
                      {cat.photos.length} {t('gallery.photos_count')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Expanded category photos ────────────────────────────────────── */}
          {openCategory && activeCategory && (
            <div className="gallery-expanded">
              <div className="gallery-expanded__header">
                <button className="gallery-expanded__back" onClick={closeCat}>
                  ← {t('gallery.back_to_categories')}
                </button>
                <h2 className="gallery-expanded__title">{t(activeCategory.labelKey)}</h2>
              </div>

              <div className="gallery-grid">
                {activeCategory.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    className="gallery-item"
                    onClick={() => openLightbox(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img
                      src={photo.src}
                      alt={t(activeCategory.labelKey)}
                      loading="lazy"
                    />
                    <div className="gallery-item__overlay">
                      <span className="gallery-item__zoom">🔍</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta section-sm">
        <div className="container">
          <div className="gallery-cta__inner">
            <h2>{t('gallery.cta_title')}</h2>
            <Link to="/order" className="btn btn-caramel btn-lg">
              🍫 {t('gallery.cta_button')}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && activeCategory && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeCategory.photos[lightbox].src}
              alt={t(activeCategory.labelKey)}
            />
            {activeCategory.photos[lightbox].caption && (
              <p className="lightbox__caption">{activeCategory.photos[lightbox].caption}</p>
            )}
          </div>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
