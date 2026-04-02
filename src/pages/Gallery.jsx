import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Gallery.css'

// Real gallery photos — add new images to public/images/gallery/ and list them here.
// caption: shown in the lightbox below the image. Leave as '' to show nothing.
// alt: used for screen readers only (not displayed).
const galleryItems = [
  { id: 1, category: 'pralines', src: '/images/gallery/pralines-1.jpg', alt: 'Pralines', caption: '' },
  { id: 2, category: 'pralines', src: '/images/gallery/pralines-2.jpg', alt: 'Pralines', caption: '' },
  { id: 3, category: 'pralines', src: '/images/gallery/pralines-3.jpg', alt: 'Pralines', caption: '' },
  { id: 4, category: 'brownies', src: '/images/gallery/brownies-1.jpg', alt: 'Brownies', caption: '' },
  { id: 5, category: 'brownies', src: '/images/gallery/brownies-2.jpg', alt: 'Brownies', caption: '' },
  { id: 6, category: 'brownies', src: '/images/gallery/brownies-3.jpg', alt: 'Brownies', caption: '' },
  { id: 7, category: 'all',      src: '/images/gallery/talya-with-boxes.jpg', alt: 'Talya with chocolate boxes', caption: '' },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // index into filtered array

  const filters = [
    { id: 'all',      label: t('gallery.filter_all') },
    { id: 'pralines', label: t('gallery.filter_pralines') },
    { id: 'brownies', label: t('gallery.filter_brownies') },
  ]

  const filtered =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter || item.category === 'all')

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightbox((i) => (i + 1) % filtered.length)

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="gallery-header">
        <div className="container">
          <h1>{t('gallery.title')}</h1>
          <p className="accent-text">{t('gallery.subtitle')}</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-sm">
        <div className="container">
          <div className="gallery-filters">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                className={`gallery-filter-btn${activeFilter === id ? ' gallery-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="gallery-grid">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                className="gallery-item"
                onClick={() => openLightbox(idx)}
                aria-label={`View ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__zoom">🔍</span>
                </div>
              </button>
            ))}
          </div>
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
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
            />
            {filtered[lightbox].caption && (
              <p className="lightbox__caption">{filtered[lightbox].caption}</p>
            )}
          </div>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
