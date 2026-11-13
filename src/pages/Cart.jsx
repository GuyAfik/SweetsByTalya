import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { social } from '../config/social'
import './Cart.css'

export default function Cart() {
  const { t } = useTranslation()
  const { items, removeItem, setQty, clearCart, totalItems, totalPrice } = useCart()

  const buildWhatsAppMessage = () => {
    const lines = items.map(item => {
      const title = t(`presents.${item.id}.title`)
      return `• ${title} ×${item.qty} — ₪${item.price * item.qty}`
    })
    lines.push(`\n${t('cart.total')}: ₪${totalPrice}`)
    return encodeURIComponent(lines.join('\n'))
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container cart-empty">
          <span className="cart-empty__icon">🛒</span>
          <h2>{t('cart.empty_title')}</h2>
          <p>{t('cart.empty_subtitle')}</p>
          <Link to="/presents" className="btn btn-caramel btn-lg">
            {t('cart.browse_gifts')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">{t('cart.title')} ({totalItems})</h1>

        <div className="cart-layout">
          {/* Item list */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                {/* Image */}
                <div className="cart-item__image-wrap">
                  {item.image ? (
                    <img src={item.image} alt={t(`presents.${item.id}.title`)} className="cart-item__image" />
                  ) : (
                    <div className="cart-item__image-placeholder">{item.icon}</div>
                  )}
                </div>

                {/* Info */}
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{t(`presents.${item.id}.title`)}</h3>
                  <p className="cart-item__unit-price">₪{item.price} {t('cart.each')}</p>
                </div>

                {/* Qty controls */}
                <div className="cart-item__controls">
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label="Decrease"
                  >−</button>
                  <span className="cart-qty-value">{item.qty}</span>
                  <button
                    type="button"
                    className="cart-qty-btn"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    aria-label="Increase"
                  >+</button>
                </div>

                {/* Line total */}
                <div className="cart-item__line-total">₪{item.price * item.qty}</div>

                {/* Remove */}
                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={t('cart.remove')}
                >✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">{t('cart.summary_title')}</h2>

            <div className="cart-summary__rows">
              {items.map(item => (
                <div key={item.id} className="cart-summary__row">
                  <span>{t(`presents.${item.id}.title`)} ×{item.qty}</span>
                  <span>₪{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="cart-summary__divider" />

            <div className="cart-summary__total">
              <span>{t('cart.total')}</span>
              <span>₪{totalPrice}</span>
            </div>

            <a
              href={`${social.whatsapp}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg cart-summary__checkout"
            >
              💬 {t('cart.checkout_whatsapp')}
            </a>

            <button
              type="button"
              className="cart-summary__clear"
              onClick={clearCart}
            >
              {t('cart.clear_cart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
