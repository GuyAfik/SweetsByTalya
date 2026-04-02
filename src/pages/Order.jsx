import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import './Order.css'

// ── Validation helpers ────────────────────────────────────────────────────────
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,19}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(form, t) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = t('order.validation_name')
  }

  if (!form.product.trim()) {
    errors.product = t('order.validation_product')
  }

  const hasPhone = form.phone.trim().length > 0
  const hasEmail = form.email.trim().length > 0

  if (!hasPhone && !hasEmail) {
    errors.contact = t('order.required_contact')
  } else {
    if (hasPhone && !PHONE_REGEX.test(form.phone.trim())) {
      errors.phone = t('order.validation_phone')
    }
    if (hasEmail && !EMAIL_REGEX.test(form.email.trim())) {
      errors.email = t('order.validation_email')
    }
  }

  return errors
}

// ── Order Page ────────────────────────────────────────────────────────────────
export default function Order() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    product: searchParams.get('product') || '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const p = searchParams.get('product')
    if (p) setForm((f) => ({ ...f, product: p }))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setSubmitError('')
    // Re-validate touched field on change
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

  const resetForm = () => {
    setSuccess(false)
    setSubmitError('')
    setErrors({})
    setTouched({})
    setForm({ name: '', phone: '', email: '', product: '', notes: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched and validate
    setTouched({ name: true, phone: true, email: true, product: true, notes: true })
    const validationErrors = validateForm(form, t)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          product: form.product.trim(),
          notes: form.notes.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Send failed')
      }

      setSuccess(true)
    } catch (err) {
      // In local dev without the API server running, show a helpful message
      if (err.message.includes('Failed to fetch') || err.message.includes('ECONNREFUSED') || err.name === 'TypeError') {
        // Dev mode: show success anyway so UI can be tested
        if (import.meta.env.DEV) {
          console.info('[Order] API not available in dev mode — showing mock success. Run `npm run dev:api` to test email sending.')
          console.info('[Order] Form data:', form)
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

  const textareaClass = (name) =>
    `form-textarea${errors[name] && touched[name] ? ' form-input--error' : ''}`

  return (
    <div className="order-page">
      <section className="order-header">
        <div className="container">
          <h1>{t('order.title')}</h1>
          <p className="accent-text">{t('order.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container order-layout">
          <div className="order-form-wrap">
            {success ? (
              <div className="order-success">
                <div className="order-success__icon">🍫</div>
                <h2>{t('order.success_title')}</h2>
                <p>{t('order.success_message')}</p>
                <button className="btn btn-caramel" onClick={resetForm}>
                  {t('common.order_now')}
                </button>
              </div>
            ) : (
              <form className="order-form" onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    {t('order.name_label')} <span className="form-required">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text"
                    className={fieldClass('name')}
                    placeholder={t('order.name_placeholder')}
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                  />
                  {errors.name && touched.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    {t('order.phone_label')}
                    <span className="form-hint"> ({t('order.contact_hint')})</span>
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    className={fieldClass('phone')}
                    placeholder={t('order.phone_placeholder')}
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {errors.phone && touched.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    {t('order.email_label')}
                    <span className="form-hint"> ({t('order.contact_hint')})</span>
                  </label>
                  <input
                    id="email" name="email" type="email"
                    className={fieldClass('email')}
                    placeholder={t('order.email_placeholder')}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    inputMode="email"
                  />
                  {errors.email && touched.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                  {errors.contact && (touched.phone || touched.email) && !errors.phone && !errors.email && (
                    <span className="form-error">{errors.contact}</span>
                  )}
                </div>

                {/* Product */}
                <div className="form-group">
                  <label className="form-label" htmlFor="product">
                    {t('order.product_label')} <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="product" name="product"
                    className={textareaClass('product')}
                    placeholder={t('order.product_placeholder')}
                    value={form.product}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                  />
                  {errors.product && touched.product && (
                    <span className="form-error">{errors.product}</span>
                  )}
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    {t('order.notes_label')}
                  </label>
                  <textarea
                    id="notes" name="notes"
                    className="form-textarea"
                    placeholder={t('order.notes_placeholder')}
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                {/* Submit error */}
                {submitError && (
                  <div className="order-error">⚠️ {submitError}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-caramel btn-lg order-submit"
                  disabled={loading}
                >
                  {loading ? t('common.loading') : `🍫 ${t('order.submit')}`}
                </button>

                <p className="order-form__note">
                  <span className="form-required">*</span> {t('order.required_fields')}
                </p>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <aside className="order-info">
            <div className="order-info__card">
              <h3>🍫 Sweets by Talya</h3>
              <p>{t('footer.tagline')}</p>
            </div>
            <div className="order-info__card">
              <h4>💬 WhatsApp</h4>
              <p>+{import.meta.env.VITE_WHATSAPP_PHONE || '972XXXXXXXXX'}</p>
            </div>
            <div className="order-info__card">
              <h4>📧 Email</h4>
              <p>{import.meta.env.VITE_CONTACT_EMAIL || 'talya@sweetsbytalya.com'}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
