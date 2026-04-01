import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Gallery.css'

// Placeholder gallery items — replace src with real photos
const galleryItems = [
  { id: 1, category: 'pralines', src: '/images/gallery/praline-1.jpg', alt: 'Hazelnut Pralines' },
  { id: 2, category: 'pralines', src: '/images/gallery/praline-2.jpg', alt: 'Raspberry Pralines' },
  { id: 3, category: 'brownies', src: '/images/gallery/brownie-1.jpg', alt: 'Classic Brownies' },
  { id: 4, category: 'chocolate', src: '/images/gallery/box-1.jpg', alt: 'Chocolate Gift Box' },
  { id: 5, category: 'pralines', src: '/images/gallery/praline-3.jpg', alt: 'Salted Caramel Pralines' },
  { id: 6, category: 'brownies', src: '/images/gallery/brownie-2.jpg', alt: 'Nutella Brownies' },
  { id: 7, category: 'chocolate', src: '/images/gallery/bark-1.jpg', alt: 'Chocolate Bark' },
  { id: 8, category: 'custom', src: '/images/gallery/custom-1.jpg', alt: 'Custom Order Box' },
  { id: 9, category: 'pralines', src: '/images/gallery/praline-4.jpg', alt: 'Pistachio Pralines' },
  { id: 10, category: 'brownies', src: '/images/gallery/brownie-3.jpg', alt: 'Cheesecake Brownies' },
  { id: 11, category: 'chocolate', src: '/images/gallery/box-2.jpg', alt: 'Assorted Box' },
  { id: 12, category: 'custom', src: '/images/gallery/custom-2.jpg', alt: 'Wedding Chocolates' },
]

const PLACEHOLDER = (alt) =>
  `https://placehold.co/600x600/F2C4CE/3B1F0E?text=${encodeURIComponent(alt)}`

export default function Gallery() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // index into filtered array

  const filters = [
    { id: 'all', label: t('gallery.filter_all') },
    { id: 'pralines', label: t('gallery.filter_pralines') },
    { id: 'brownies', label: t('gallery.filter_brownies') },
    { id: 'chocolate', label: t('gallery.filter_chocolate') },
    { id: 'custom', label: t('gallery.filter_custom') },
  ]

  const filtered =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

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
                  onError={(e) => { e.target.src = PLACEHOLDER(item.alt) }}
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
              onError={(e) => { e.target.src = PLACEHOLDER(filtered[lightbox].alt) }}
            />
            <p className="lightbox__caption">{filtered[lightbox].alt}</p>
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
