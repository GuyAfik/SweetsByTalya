import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import './Order.css'

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

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    const p = searchParams.get('product')
    if (p) setForm((f) => ({ ...f, product: p }))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setValidationError('')
    setError('')
  }

  const validate = () => {
    if (!form.name.trim()) return t('order.validation_name')
    if (!form.product.trim()) return t('order.validation_product')
    if (!form.phone.trim() && !form.email.trim()) return t('order.required_contact')
    return ''
  }

  const resetForm = () => {
    setSuccess(false)
    setError('')
    setValidationError('')
    setForm({ name: '', phone: '', email: '', product: '', notes: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setValidationError(err); return }

    setLoading(true)
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: form.name,
          phone: form.phone,
          email: form.email,
          product: form.product,
          notes: form.notes,
        }),
      })

      if (!res.ok) throw new Error('Send failed')
      setSuccess(true)
    } catch {
      setError(t('order.error_message'))
    } finally {
      setLoading(false)
    }
  }

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
                <div className="form-group">
                  <label className="form-label" htmlFor="name">{t('order.name_label')} *</label>
                  <input
                    id="name" name="name" type="text"
                    className="form-input"
                    placeholder={t('order.name_placeholder')}
                    value={form.name} onChange={handleChange} required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">{t('order.phone_label')}</label>
                  <input
                    id="phone" name="phone" type="tel"
                    className="form-input"
                    placeholder={t('order.phone_placeholder')}
                    value={form.phone} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">{t('order.email_label')}</label>
                  <input
                    id="email" name="email" type="email"
                    className="form-input"
                    placeholder={t('order.email_placeholder')}
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="product">{t('order.product_label')} *</label>
                  <textarea
                    id="product" name="product"
                    className="form-textarea"
                    placeholder={t('order.product_placeholder')}
                    value={form.product} onChange={handleChange}
                    rows={3} required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">{t('order.notes_label')}</label>
                  <textarea
                    id="notes" name="notes"
                    className="form-textarea"
                    placeholder={t('order.notes_placeholder')}
                    value={form.notes} onChange={handleChange}
                    rows={3}
                  />
                </div>

                {(validationError || error) && (
                  <div className="order-error">⚠️ {validationError || error}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-caramel btn-lg order-submit"
                  disabled={loading}
                >
                  {loading ? t('common.loading') : `🍫 ${t('order.submit')}`}
                </button>
              </form>
            )}
          </div>

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
            <div className="order-info__note">
              <p>🔒 {t('order.required_contact')}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
