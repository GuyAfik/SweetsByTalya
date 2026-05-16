import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/menu'
import './Menu.css'

const PLACEHOLDER = (name) =>
  `https://placehold.co/400x300/F2C4CE/3B1F0E?text=${encodeURIComponent(name)}`

function ProductCard({ product }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const allergenLabels = product.allergens.map((a) => t(`allergens.${a}`)).join(', ')

  return (
    <div className="product-card card">
      <div className="product-card__img">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER(product.name) }}
        />
        {product.price ? (
          <span className="product-card__price">
            {product.price}{product.currency}
            <small> / {t('common.per_piece')}</small>
          </span>
        ) : (
          <span className="product-card__price product-card__price--request">
            {t('menu.price_on_request')}
          </span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        {/* Expandable ingredients */}
        <button
          className="product-card__toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {t('menu.ingredients')} {expanded ? '▲' : '▼'}
        </button>

        {expanded && (
          <div className="product-card__details">
            <p className="product-card__ingredients">
              {product.ingredients.join(' · ')}
            </p>
            {allergenLabels && (
              <p className="product-card__allergens">
                ⚠️ {t('menu.allergens')}: {allergenLabels}
              </p>
            )}
          </div>
        )}

        <Link
          to="/contact"
          className="btn btn-primary btn-sm product-card__cta"
        >
          {t('menu.order_this')}
        </Link>
      </div>
    </div>
  )
}

export default function Menu() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')

  const products = getProductsByCategory(activeCategory)

  return (
    <div className="menu-page">
      {/* Header */}
      <section className="menu-header">
        <div className="container">
          <h1>{t('menu.title')}</h1>
          <p className="accent-text">{t('menu.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Tabs */}
          <div className="menu-tabs">
            {categories.map(({ id, labelKey }) => (
              <button
                key={id}
                className={`menu-tab${activeCategory === id ? ' menu-tab--active' : ''}`}
                onClick={() => setActiveCategory(id)}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="menu-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Allergen notice */}
          <p className="menu-allergen-note">
            ⚠️ {t('menu.allergen_note')}
          </p>
        </div>
      </section>
    </div>
  )
}
