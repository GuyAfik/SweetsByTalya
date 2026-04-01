import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useEmailJS } from '../hooks/useEmailJS'
import { getWhatsAppOrderLink } from '../config/social'
import './Order.css'

export default function Order() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { send, loading, success, error, reset } = useEmailJS()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    product: searchParams.get('product') || '',
    notes: '',
    contactMethod: 'whatsapp',
  })

  const [validationError, setValidationError] = useState('')

  // Update product if URL param changes
  useEffect(() => {
    const p = searchParams.get('product')
    if (p) setForm((f) => ({ ...f, product: p }))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setValidationError('')
    if (success) reset()
  }

  const validate = () => {
    if (!form.name.trim()) return t('order.validation_name')
    if (!form.product.trim()) return t('order.validation_product')
    if (!form.phone.trim() && !form.email.trim()) return t('order.required_contact')
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setValidationError(err); return }

    if (form.contactMethod === 'whatsapp') {
      // Build WhatsApp message
      const msg = [
        `🍫 *New Order from Sweets by Talya website*`,
        ``,
        `*Name:* ${form.name}`,
        form.phone ? `*Phone:* ${form.phone}` : '',
        form.email ? `*Email:* ${form.email}` : '',
        `*Order:* ${form.product}`,
        form.notes ? `*Notes:* ${form.notes}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      const url = getWhatsAppOrderLink(msg)
      window.open(url, '_blank', 'noopener,noreferrer')
      // Show success state
      reset()
      setForm((f) => ({ ...f, product: '', notes: '' }))
    } else {
      // Send via EmailJS
      const templateId = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID
      await send(templateId, {
        from_name: form.name,
        phone: form.phone || 'Not provided',
        email: form.email || 'Not provided',
        product: form.product,
        notes: form.notes || 'None',
        contact_method: form.contactMethod,
      })
    }
  }

  return (
    <div className="order-page">
      {/* Header */}
      <section className="order-header">
        <div className="container">
          <h1>{t('order.title')}</h1>
          <p className="accent-text">{t('order.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container order-layout">
          {/* Form */}
          <div className="order-form-wrap">
            {success ? (
              <div className="order-success">
                <div className="order-success__icon">🍫</div>
                <h2>{t('order.success_title')}</h2>
                <p>{t('order.success_message')}</p>
                <button className="btn btn-caramel" onClick={reset}>
                  {t('common.order_now')}
                </button>
              </div>
            ) : (
              <form className="order-form" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    {t('order.name_label')} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder={t('order.name_placeholder')}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    {t('order.phone_label')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder={t('order.phone_placeholder')}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    {t('order.email_label')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder={t('order.email_placeholder')}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Product */}
                <div className="form-group">
                  <label className="form-label" htmlFor="product">
                    {t('order.product_label')} *
                  </label>
                  <textarea
                    id="product"
                    name="product"
                    className="form-textarea"
                    placeholder={t('order.product_placeholder')}
                    value={form.product}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    {t('order.notes_label')}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-textarea"
                    placeholder={t('order.notes_placeholder')}
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                {/* Contact method */}
                <div className="form-group">
                  <label className="form-label">{t('order.contact_method_label')}</label>
                  <div className="order-contact-methods">
                    <label className={`order-method${form.contactMethod === 'whatsapp' ? ' order-method--active' : ''}`}>
                      <input
                        type="radio"
                        name="contactMethod"
                        value="whatsapp"
                        checked={form.contactMethod === 'whatsapp'}
                        onChange={handleChange}
                      />
                      <span>💬 {t('order.whatsapp')}</span>
                    </label>
                    <label className={`order-method${form.contactMethod === 'email' ? ' order-method--active' : ''}`}>
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={form.contactMethod === 'email'}
                        onChange={handleChange}
                      />
                      <span>📧 {t('order.email_method')}</span>
                    </label>
                  </div>
                </div>

                {/* Errors */}
                {(validationError || error) && (
                  <div className="order-error">
                    ⚠️ {validationError || t('order.error_message')}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn btn-lg order-submit${form.contactMethod === 'whatsapp' ? ' btn-whatsapp' : ' btn-caramel'}`}
                  disabled={loading}
                >
                  {loading ? t('common.loading') : (
                    form.contactMethod === 'whatsapp'
                      ? `💬 ${t('order.submit_whatsapp')}`
                      : `📧 ${t('order.submit_email')}`
                  )}
                </button>
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
            <div className="order-info__note">
              <p>🔒 {t('order.required_contact')}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
