import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { chocolateBases, fillings, pralinePrice, boxTotal } from '../../data/pralines'
import './BoxSummary.css'

// ── Validation helpers (same as Order page) ───────────────────────────────────
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,19}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(form, t) {
  const errors = {}
  if (!form.name.trim()) errors.name = t('order.validation_name')
  const hasPhone = form.phone.trim().length > 0
  const hasEmail = form.email.trim().length > 0
  if (!hasPhone && !hasEmail) {
    errors.contact = t('order.required_contact')
  } else {
    if (hasPhone && !PHONE_REGEX.test(form.phone.trim())) errors.phone = t('order.validation_phone')
    if (hasEmail && !EMAIL_REGEX.test(form.email.trim())) errors.email = t('order.validation_email')
  }
  return errors
}

// ── Serialize box config to human-readable product string ─────────────────────
function serializeBox(slots, boxSize, t) {
  const total = boxTotal(slots)
  const lines = slots.map((slot, i) => {
    const base    = chocolateBases.find((b) => b.id === slot.base)
    const filling = fillings.find((f) => f.id === slot.filling)
    const price   = pralinePrice(slot)
    return `  ${i + 1}. ${t(base.labelKey)} / ${t(filling.labelKey)} — ₪${price}`
  })
  return `Custom Praline Box (${boxSize}-piece) — Total: ₪${total}\n\n${lines.join('\n')}`
}

export default function BoxSummary({ slots, boxSize, onEditBox }) {
  const { t } = useTranslation()
  const total = boxTotal(slots)

  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setSubmitError('')
    if (touched[name]) {
      const newErrors = validateForm({ ...form, [name]: value }, t)
      setErrors((prev) => ({ ...prev, [name]: newErrors[name], contact: newErrors.contact }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validateForm(form, t)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name], contact: newErrors.contact }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, phone: true, email: true })
    const validationErrors = validateForm(form, t)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    setSubmitError('')

    try {
      const product = serializeBox(slots, boxSize, t)
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          product,
          notes: form.notes.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Send failed')
      }

      setSuccess(true)
    } catch (err) {
      if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('ECONNREFUSED') ||
        err.name === 'TypeError'
      ) {
        if (import.meta.env.DEV) {
          console.info('[BoxSummary] API not available — showing mock success.')
          console.info('[BoxSummary] Box:', serializeBox(slots, boxSize, t))
          setSuccess(true)
        } else {
          setSubmitError(t('order.error_message'))
        }
      } else {
        setSubmitError(t('order.error_message'))
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name) =>
    `form-input${errors[name] && touched[name] ? ' form-input--error' : ''}`

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="box-summary__success">
        <div className="box-summary__success-icon">🍫</div>
        <h2>{t('praline_builder.success_title')}</h2>
        <p>{t('praline_builder.success_message')}</p>
      </div>
    )
  }

  // ── Summary + order form ────────────────────────────────────────────────────
  return (
    <div className="box-summary">
      {/* Summary header */}
      <div className="box-summary__header">
        <h2 className="box-summary__title">{t('praline_builder.summary_title')}</h2>
        <button type="button" className="btn-link box-summary__edit" onClick={onEditBox}>
          ✏️ {t('praline_builder.edit_box')}
        </button>
      </div>

      {/* Praline list */}
      <ol className="box-summary__list">
        {slots.map((slot, i) => {
          const base    = chocolateBases.find((b) => b.id === slot.base)
          const filling = fillings.find((f) => f.id === slot.filling)
          const price   = pralinePrice(slot)
          return (
            <li key={i} className="box-summary__item">
              <span
                className="box-summary__swatch"
                style={{ background: base.color }}
                title={t(base.labelKey)}
              />
              <span className="box-summary__item-desc">
                {t(base.labelKey)} / {filling.emoji} {t(filling.labelKey)}
              </span>
              <span className="box-summary__item-price">₪{price}</span>
            </li>
          )
        })}
      </ol>

      {/* Total */}
      <div className="box-summary__total">
        <span>{t('praline_builder.box_total', 'Box Total')}</span>
        <strong>₪{total}</strong>
      </div>

      {/* Order form */}
      <div className="box-summary__form-section">
        <h3 className="box-summary__form-title">{t('praline_builder.your_details')}</h3>
        <form className="order-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="bs-name">
              {t('order.name_label')} <span className="form-required">*</span>
            </label>
            <input
              id="bs-name" name="name" type="text"
              className={fieldClass('name')}
              placeholder={t('order.name_placeholder')}
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
            {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label" htmlFor="bs-phone">
              {t('order.phone_label')}
              <span className="form-hint"> ({t('order.contact_hint')})</span>
            </label>
            <input
              id="bs-phone" name="phone" type="tel"
              className={fieldClass('phone')}
              placeholder={t('order.phone_placeholder')}
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
              inputMode="tel"
            />
            {errors.phone && touched.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="bs-email">
              {t('order.email_label')}
              <span className="form-hint"> ({t('order.contact_hint')})</span>
            </label>
            <input
              id="bs-email" name="email" type="email"
              className={fieldClass('email')}
              placeholder={t('order.email_placeholder')}
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
            {errors.contact && (touched.phone || touched.email) && !errors.phone && !errors.email && (
              <span className="form-error">{errors.contact}</span>
            )}
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="bs-notes">
              {t('order.notes_label')}
            </label>
            <textarea
              id="bs-notes" name="notes"
              className="form-textarea"
              placeholder={t('praline_builder.notes_placeholder')}
              value={form.notes}
              onChange={handleChange}
              rows={2}
            />
          </div>

          {submitError && <div className="order-error">⚠️ {submitError}</div>}

          <button
            type="submit"
            className="btn btn-caramel btn-lg order-submit"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('praline_builder.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
