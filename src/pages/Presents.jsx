import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Presents.css'

export const GIFTS = [
  { id: 'praline_box',    icon: '🍫',   image: '/images/presents/praline-box-label.jpeg',   price: 140, configurable: true },
  { id: 'cupcake_kit',    icon: '🧁',   image: '/images/presents/cupcake-kit-1.jpeg',        price: 80 },
  { id: 'cookie_kit',     icon: '🍪',   image: '/images/presents/cookie-kit-1.jpeg',         price: 90 },
  { id: 'bear_romantic',  icon: '🧸🌹', image: '/images/presents/bear-romantic-gold.jpeg',   price: 160 },
  { id: 'bear_trio',      icon: '🧸🍫', image: '/images/presents/hearts-duo-top.jpeg',       price: 100 },
  { id: 'choco_egg',      icon: '🍫🥚', image: '/images/presents/choco-egg-open.jpeg',       price: 160 },
  { id: 'hearts_duo',     icon: '❤️🍫', image: '/images/presents/hearts-duo-open.jpeg',      price: 120 },
  { id: 'remote_choco',   icon: '🍫',   image: '/images/presents/remote-choco-1.jpeg',       price: 120 },
]

const SHELLS = ['white', 'milk', 'dark', 'mix']
const FLAVORS = ['pistachio', 'vanilla', 'coffee', 'red_fruits', 'white_choco_ganache', 'coconut', 'nutella', 'peanut', 'dark_choco', 'halva', 'mango']
const MAX_FLAVORS = 4

function PralineBoxConfigurator({ gift, onClose }) {
  const { t } = useTranslation()
  const { addItem, items } = useCart()
  const [shell, setShell] = useState(null)
  const [selectedFlavors, setSelectedFlavors] = useState([])
  const [added, setAdded] = useState(false)

  const toggleFlavor = (f) => {
    if (selectedFlavors.includes(f)) {
      setSelectedFlavors(prev => prev.filter(x => x !== f))
    } else if (selectedFlavors.length < MAX_FLAVORS) {
      setSelectedFlavors(prev => [...prev, f])
    }
  }

  const isReady = shell && selectedFlavors.length === MAX_FLAVORS

  const handleAdd = () => {
    if (!isReady) return
    const config = { shell, flavors: selectedFlavors }
    addItem({
      id: gift.id,
      icon: gift.icon,
      image: gift.image,
      price: gift.price,
      config,
    })
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1500)
  }

  const inCart = items.find(i => i.id === gift.id)

  return (
    <div className="praline-configurator">
      {/* Shell selection */}
      <div className="praline-step">
        <h4 className="praline-step__label">{t('praline_box_config.choose_shell')}</h4>
        <div className="praline-shells">
          {SHELLS.map(s => (
            <button
              key={s}
              type="button"
              className={`praline-shell-btn${shell === s ? ' praline-shell-btn--active' : ''}`}
              onClick={() => setShell(s)}
            >
              {t(`praline_box_config.shell_${s}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor selection */}
      <div className="praline-step">
        <h4 className="praline-step__label">
          {t('praline_box_config.choose_flavors')}
          <span className="praline-step__count">
            {selectedFlavors.length}/{MAX_FLAVORS}
          </span>
        </h4>
        <div className="praline-flavors">
          {FLAVORS.map(f => {
            const isSelected = selectedFlavors.includes(f)
            const isDisabled = !isSelected && selectedFlavors.length >= MAX_FLAVORS
            return (
              <button
                key={f}
                type="button"
                disabled={isDisabled}
                className={`praline-flavor-btn${isSelected ? ' praline-flavor-btn--active' : ''}${isDisabled ? ' praline-flavor-btn--disabled' : ''}`}
                onClick={() => toggleFlavor(f)}
              >
                {t(`praline_box_config.flavor_${f}`)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="praline-configurator__footer">
        <button
          type="button"
          className={`btn praline-add-btn${added ? ' praline-add-btn--added' : ''}`}
          disabled={!isReady}
          onClick={handleAdd}
        >
          {added ? `✓ ${t('cart.added')}` : `🛒 ${t('cart.add_to_cart')}`}
        </button>
        {inCart && (
          <Link to="/cart" className="gift-card__view-cart">
            {t('cart.in_cart', { qty: inCart.qty })} →
          </Link>
        )}
      </div>
    </div>
  )
}

function GiftCard({ gift }) {
  const { t } = useTranslation()
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const base = `presents.${gift.id}`

  const inCart = items.find(i => i.id === gift.id)

  const handleAdd = () => {
    addItem({ id: gift.id, icon: gift.icon, image: gift.image, price: gift.price })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="gift-card">
      {/* Image — left side */}
      <div className="gift-card__image-wrap">
        {gift.image ? (
          <img src={gift.image} alt={t(`${base}.title`)} className="gift-card__image" loading="lazy" />
        ) : (
          <div className="gift-card__image-placeholder">
            <span>{gift.icon}</span>
          </div>
        )}
      </div>

      {/* Text — right side */}
      <div className="gift-card__body">
        <h2 className="gift-card__title">{t(`${base}.title`)}</h2>
        <p className="gift-card__tagline">{t(`${base}.tagline`)}</p>

        <ul className="gift-card__includes">
          {t(`${base}.includes`, { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {t(`${base}.note`) && (
          <p className="gift-card__note">{t(`${base}.note`)}</p>
        )}

        <div className="gift-card__footer">
          <div className="gift-card__price">{t(`${base}.price`)}</div>
          <div className="gift-card__cart-actions">
            {gift.configurable ? (
              <button
                type="button"
                className="btn gift-card__add-btn"
                onClick={() => setShowConfig(v => !v)}
              >
                {showConfig ? `✕ ${t('praline_box_config.close')}` : `🍫 ${t('praline_box_config.configure')}`}
              </button>
            ) : (
              <button
                type="button"
                className={`btn gift-card__add-btn${added ? ' gift-card__add-btn--added' : ''}`}
                onClick={handleAdd}
              >
                {added ? `✓ ${t('cart.added')}` : `🛒 ${t('cart.add_to_cart')}`}
              </button>
            )}
            {!gift.configurable && inCart && (
              <Link to="/cart" className="gift-card__view-cart">
                {t('cart.in_cart', { qty: inCart.qty })} →
              </Link>
            )}
          </div>
        </div>

        {/* Inline configurator for praline box */}
        {gift.configurable && showConfig && (
          <PralineBoxConfigurator gift={gift} onClose={() => setShowConfig(false)} />
        )}
      </div>
    </div>
  )
}

export default function Presents() {
  const { t } = useTranslation()
  return (
    <div className="presents-page">
      <section className="presents-hero">
        <div className="container presents-hero__content">
          <span className="presents-hero__icon">🎁</span>
          <h1 className="presents-hero__title">{t('presents.page_title')}</h1>
          <p className="presents-hero__subtitle">{t('presents.page_subtitle')}</p>
        </div>
      </section>

      <section className="section presents-list">
        <div className="container">
          {GIFTS.map(gift => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>
    </div>
  )
}
