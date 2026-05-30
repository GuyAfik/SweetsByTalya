import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getWhatsAppOrderLink } from '../../config/social'
import './FountainOrderModal.css'

const CHOCOLATE_TYPES = ['dark', 'milk', 'white']
const COLORS = ['pink', 'red', 'green', 'blue', 'yellow']

const COLOR_HEX = {
  pink:   '#F48FB1',
  red:    '#E53935',
  green:  '#43A047',
  blue:   '#1E88E5',
  yellow: '#FDD835',
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  contactMethod: 'whatsapp',
  eventDate: '',
  guests: '',
  chocolateType: '',
  addColor: null,
  color: '',
  notes: '',
}

export default function FountainOrderModal({ onClose }) {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState(INITIAL_FORM)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const lang = i18n.language?.split('-')[0] || 'he'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const totalPrice = () => {
    let price = 1000
    if (form.addColor === true && form.color) price += 50
    return price
  }

  const buildWhatsAppMessage = () => {
    const chocLabel = form.chocolateType ? t(`fountain.chocolate_${form.chocolateType}`) : ''
    const colorLine = form.addColor && form.color
      ? `\n🎨 ${t('fountain.modal_color_label')}: ${t(`fountain.color_${form.color}`)} (+₪50)`
      : `\n🎨 ${t('fountain.modal_color_label')}: ${t('fountain.modal_no_color')}`
    const lines = [
      `🍫 ${t('fountain.modal_title')}`,
      ``,
      `👤 ${t('fountain.modal_name')}: ${form.name}`,
      `📞 ${t('fountain.modal_phone')}: ${form.phone}`,
      form.email ? `📧 ${t('fountain.modal_email')}: ${form.email}` : '',
      `📅 ${t('fountain.modal_event_date')}: ${form.eventDate || t('fountain.modal_tbd')}`,
      `👥 ${t('fountain.modal_guests')}: ${form.guests || t('fountain.modal_tbd')}`,
      `🍫 ${t('fountain.chocolate_type_title')}: ${chocLabel}`,
      colorLine,
      form.notes ? `\n📝 ${t('fountain.modal_notes')}: ${form.notes}` : '',
      ``,
      `💰 ${t('fountain.modal_total')}: ₪${totalPrice()}`,
    ].filter(l => l !== '').join('\n')
    return lines
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.chocolateType) return
    setLoading(true)
    setError(null)

    const chocLabel = t(`fountain.chocolate_${form.chocolateType}`)
    const colorLine = form.addColor && form.color
      ? `${t(`fountain.color_${form.color}`)} (+₪50)`
      : t('fountain.modal_no_color')

    const product = [
      `${t('fountain.modal_title')}`,
      `${t('fountain.chocolate_type_title')}: ${chocLabel}`,
      `${t('fountain.modal_color_label')}: ${colorLine}`,
      form.eventDate ? `${t('fountain.modal_event_date')}: ${form.eventDate}` : '',
      form.guests ? `${t('fountain.modal_guests')}: ${form.guests}` : '',
    ].filter(Boolean).join(' | ')

    try {
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: form.name,
          phone: form.phone,
          email: form.email,
          product,
          notes: `${t('fountain.modal_total')}: ₪${totalPrice()}${form.notes ? ` | ${form.notes}` : ''}`,
        }),
      })
    } catch {
    }

    if (form.contactMethod === 'whatsapp' || form.contactMethod === 'both') {
      window.open(getWhatsAppOrderLink(buildWhatsAppMessage()), '_blank', 'noopener,noreferrer')
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="fm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="fm-sheet" onClick={e => e.stopPropagation()}>
          <button className="fm-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="fm-success">
            <div className="fm-success__icon">🍫</div>
            <h2>{t('fountain.modal_success_title')}</h2>
            <p>{t('fountain.modal_success_desc')}</p>
            <button className="btn btn-caramel" onClick={onClose}>{t('fountain.modal_close')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="fm-sheet" onClick={e => e.stopPropagation()}>
        <button className="fm-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="fm-header">
          <span className="fm-header__emoji">🍫</span>
          <h2 className="fm-header__title">{t('fountain.modal_title')}</h2>
          <p className="fm-header__price">₪1,000 · 20–30 {t('fountain.modal_guests_label')}</p>
        </div>

        <div className="fm-body">

          {/* Step 1 — Chocolate type */}
          <div className="fm-section">
            <h3 className="fm-section__title">{t('fountain.chocolate_type_title')} *</h3>
            <div className="fm-choc-grid">
              {CHOCOLATE_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  className={`fm-choc-btn${form.chocolateType === type ? ' fm-choc-btn--active' : ''}`}
                  onClick={() => set('chocolateType', type)}
                >
                  {t(`fountain.chocolate_${type}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Color add-on */}
          <div className="fm-section">
            <h3 className="fm-section__title">{t('fountain.color_addon_title')}</h3>
            <p className="fm-section__hint">{t('fountain.color_addon_desc')}</p>
            <div className="fm-color-choice">
              <button
                type="button"
                className={`fm-yn-btn${form.addColor === false ? ' fm-yn-btn--active' : ''}`}
                onClick={() => { set('addColor', false); set('color', '') }}
              >
                {t('fountain.modal_no_color')}
              </button>
              <button
                type="button"
                className={`fm-yn-btn fm-yn-btn--yes${form.addColor === true ? ' fm-yn-btn--active' : ''}`}
                onClick={() => set('addColor', true)}
              >
                {t('fountain.modal_yes_color')} +₪50
              </button>
            </div>
            {form.addColor === true && (
              <div className="fm-color-swatches">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`fm-swatch${form.color === c ? ' fm-swatch--active' : ''}`}
                    style={{ background: COLOR_HEX[c] }}
                    onClick={() => set('color', c)}
                    aria-label={t(`fountain.color_${c}`)}
                    title={t(`fountain.color_${c}`)}
                  />
                ))}
                {form.color && (
                  <span className="fm-color-label">{t(`fountain.color_${form.color}`)}</span>
                )}
              </div>
            )}
          </div>

          {/* Contact details */}
          <div className="fm-section">
            <h3 className="fm-section__title">{t('fountain.modal_contact_title')}</h3>

            <div className="fm-field">
              <label className="fm-label">{t('fountain.modal_name')} *</label>
              <input
                className="fm-input"
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder={t('fountain.modal_name_placeholder')}
              />
            </div>

            <div className="fm-field">
              <label className="fm-label">{t('fountain.modal_phone')} *</label>
              <input
                className="fm-input"
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="050-000-0000"
                dir="ltr"
              />
            </div>

            <div className="fm-field">
              <label className="fm-label">{t('fountain.modal_email')}</label>
              <input
                className="fm-input"
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                dir="ltr"
              />
            </div>

            <div className="fm-field-row">
              <div className="fm-field">
                <label className="fm-label">{t('fountain.modal_event_date')}</label>
                <input
                  className="fm-input"
                  type="date"
                  value={form.eventDate}
                  onChange={e => set('eventDate', e.target.value)}
                  dir="ltr"
                />
              </div>
              <div className="fm-field">
                <label className="fm-label">{t('fountain.modal_guests')}</label>
                <input
                  className="fm-input"
                  type="number"
                  min="1"
                  max="200"
                  value={form.guests}
                  onChange={e => set('guests', e.target.value)}
                  placeholder="20–30"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="fm-field">
              <label className="fm-label">{t('fountain.modal_contact_method')}</label>
              <div className="fm-contact-methods">
                {['whatsapp', 'email', 'both'].map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`fm-method-btn${form.contactMethod === m ? ' fm-method-btn--active' : ''}`}
                    onClick={() => set('contactMethod', m)}
                  >
                    {t(`fountain.modal_method_${m}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="fm-field">
              <label className="fm-label">{t('fountain.modal_notes')}</label>
              <textarea
                className="fm-input fm-textarea"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder={t('fountain.modal_notes_placeholder')}
                rows={3}
              />
            </div>
          </div>

          {/* Total */}
          <div className="fm-total">
            <span>{t('fountain.modal_total')}:</span>
            <strong>₪{totalPrice()}</strong>
          </div>

          {error && <p className="fm-error">{error}</p>}

          <button
            type="button"
            className="btn btn-whatsapp btn-lg fm-submit"
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.phone || !form.chocolateType}
          >
            {loading ? '...' : `💬 ${t('fountain.modal_submit')}`}
          </button>
        </div>
      </div>
    </div>
  )
}
