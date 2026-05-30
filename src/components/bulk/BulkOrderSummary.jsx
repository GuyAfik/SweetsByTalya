import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fillings, chocolateBases, pralinePrice, getTartletBonus } from '../../data/pralines'
import { flags } from '../../config/featureFlags'
import { getWhatsAppOrderLink } from '../../config/social'
import './BulkOrderSummary.css'

const PHONE_REGEX = /^[+\d][\d\s\-().]{6,19}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildWhatsAppMessage(activeSelections, form, t, qtyPerFlavor, sets) {
  const totalPralines = activeSelections.length * qtyPerFlavor
  const tartlets = getTartletBonus(totalPralines)

  const lines = activeSelections.map(s => {
    const filling = fillings.find(f => f.id === s.filling)
    const base = chocolateBases.find(b => b.id === s.base)
    const price = pralinePrice(s)
    return `• ${qtyPerFlavor}x ${t(filling?.labelKey)} (${t(base?.labelKey)}) — ₪${qtyPerFlavor * price}`
  })

  const total = activeSelections.reduce((sum, s) => sum + qtyPerFlavor * pralinePrice(s), 0)

  return [
    `🍫 *Chocolate Jewelleries Order — ${totalPralines} pieces (${sets} set${sets > 1 ? 's' : ''})*`,
    '',
    ...lines,
    '',
    `🎁 *Bonus: ${tartlets} Tartlets included!*`,
    '',
    `*Total: ₪${total}*`,
    '',
    `👤 Name: ${form.name}`,
    form.eventDate ? `📅 Event Date: ${form.eventDate}` : '',
    form.phone ? `📞 Phone: ${form.phone}` : '',
    form.email ? `📧 Email: ${form.email}` : '',
    form.notes ? `📝 Notes: ${form.notes}` : '',
  ].filter(l => l !== null && l !== undefined && l !== '').join('\n').trim()
}

export default function BulkOrderSummary({ activeSelections, sets }) {
  const { t } = useTranslation()
  const qtyPerFlavor = flags.bulkOrder.qtyPerFlavor
  const totalPralines = activeSelections.length * qtyPerFlavor
  const tartlets = getTartletBonus(totalPralines)

  const [form, setForm] = useState({ name: '', eventDate: '', phone: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const totalPrice = activeSelections.reduce((sum, s) => sum + qtyPerFlavor * pralinePrice(s), 0)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('order.validation_name')
    const hasPhone = form.phone.trim().length > 0
    const hasEmail = form.email.trim().length > 0
    if (!hasPhone && !hasEmail) e.contact = t('order.required_contact')
    else {
      if (hasPhone && !PHONE_REGEX.test(form.phone.trim())) e.phone = t('order.validation_phone')
      if (hasEmail && !EMAIL_REGEX.test(form.email.trim())) e.email = t('order.validation_email')
    }
    return e
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  const handleWhatsApp = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const msg = buildWhatsAppMessage(activeSelections, form, t, qtyPerFlavor, sets)
    window.open(getWhatsAppOrderLink(msg), '_blank')
    setSubmitted(true)
  }

  const handleEmail = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const msg = buildWhatsAppMessage(activeSelections, form, t, qtyPerFlavor, sets)
    try {
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          product: `Chocolate Jewelleries Order — ${totalPralines} pieces (${sets} set${sets > 1 ? 's' : ''}) + ${tartlets} Tartlets`,
          notes: msg,
        }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bulk-summary bulk-summary--success">
        <div className="bulk-summary__success-icon">🍫</div>
        <h2>{t('bulk_order.success_title')}</h2>
        <p>{t('bulk_order.success_message')}</p>
      </div>
    )
  }

  return (
    <div className="bulk-summary">
      <h2 className="bulk-summary__title">{t('bulk_order.summary_title')}</h2>

      {sets > 1 && (
        <p className="bulk-summary__sets-note">
          {t('bulk_order.sets_label_plural', { sets, total: totalPralines })}
        </p>
      )}

      <ul className="bulk-summary__lines">
        {activeSelections.map((s, idx) => {
          const filling = fillings.find(f => f.id === s.filling)
          const base = chocolateBases.find(b => b.id === s.base)
          const lineTotal = qtyPerFlavor * pralinePrice(s)
          return (
            <li key={`${s.filling}-${idx}`} className="bulk-summary__line">
              <span className="bulk-summary__line-emoji">{filling?.emoji}</span>
              <span className="bulk-summary__line-desc">
                {qtyPerFlavor}× {t(filling?.labelKey)}
                <span className="bulk-summary__line-base"> ({t(base?.labelKey)})</span>
              </span>
              <span className="bulk-summary__line-price">₪{lineTotal}</span>
            </li>
          )
        })}
      </ul>

      <div className="bulk-summary__tartlets-bonus">
        🎁 {t('bulk_order.tartlets_bonus', { count: tartlets })}
      </div>

      <div className="bulk-summary__total">
        <span>{t('bulk_order.summary_total', { qty: totalPralines, price: totalPrice })}</span>
      </div>

      <div className="bulk-summary__form">
        <div className="bulk-summary__field">
          <label>{t('bulk_order.name_label')}</label>
          <input
            type="text"
            placeholder={t('bulk_order.name_placeholder')}
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            className={errors.name ? 'bulk-summary__input--error' : ''}
          />
          {errors.name && <span className="bulk-summary__error">{errors.name}</span>}
        </div>

        <div className="bulk-summary__field">
          <label>{t('bulk_order.event_date_label')}</label>
          <input
            type="date"
            value={form.eventDate}
            onChange={e => handleChange('eventDate', e.target.value)}
          />
        </div>

        <div className="bulk-summary__field">
          <label>{t('bulk_order.phone_label')}</label>
          <input
            type="tel"
            placeholder={t('bulk_order.phone_placeholder')}
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className={errors.phone ? 'bulk-summary__input--error' : ''}
          />
          {errors.phone && <span className="bulk-summary__error">{errors.phone}</span>}
        </div>

        <div className="bulk-summary__field">
          <label>{t('bulk_order.email_label')}</label>
          <input
            type="email"
            placeholder={t('bulk_order.email_placeholder')}
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            className={errors.email ? 'bulk-summary__input--error' : ''}
          />
          {errors.email && <span className="bulk-summary__error">{errors.email}</span>}
        </div>

        {errors.contact && <span className="bulk-summary__error">{errors.contact}</span>}

        <div className="bulk-summary__field">
          <label>{t('bulk_order.notes_label')}</label>
          <textarea
            placeholder={t('bulk_order.notes_placeholder')}
            value={form.notes}
            onChange={e => handleChange('notes', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="bulk-summary__actions">
        <button type="button" className="bulk-summary__btn bulk-summary__btn--whatsapp" onClick={handleWhatsApp}>
          💬 {t('bulk_order.send_whatsapp')}
        </button>
        <button type="button" className="bulk-summary__btn bulk-summary__btn--email" onClick={handleEmail}>
          ✉️ {t('bulk_order.send_email')}
        </button>
      </div>
    </div>
  )
}
