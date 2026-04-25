import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { social, getWhatsAppOrderLink } from '../config/social'
import './Contact.css'

const INITIAL = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      })

      if (!res.ok) throw new Error('Failed')

      const waMessage = `היי טליה! שמי ${form.name}.\n\n${form.message}${form.phone ? `\n\nטלפון: ${form.phone}` : ''}`
      window.open(getWhatsAppOrderLink(waMessage), '_blank', 'noopener,noreferrer')

      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
      setError(t('contact.error'))
    }
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="container contact-hero__content">
          <h1 className="contact-hero__title">{t('contact.hero_title')}</h1>
          <p className="contact-hero__subtitle accent-text">{t('contact.hero_subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact__layout">
          <div className="contact__info">
            <h2 className="contact__info-title">{t('contact.info_title')}</h2>
            <p className="contact__info-text">{t('contact.info_text')}</p>

            <div className="contact__channels">
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="contact__channel">
                <span className="contact__channel-icon">💬</span>
                <div>
                  <div className="contact__channel-label">WhatsApp</div>
                  <div className="contact__channel-value">{t('contact.whatsapp_label')}</div>
                </div>
              </a>
              <a href={`mailto:${social.email}`} className="contact__channel">
                <span className="contact__channel-icon">✉️</span>
                <div>
                  <div className="contact__channel-label">Email</div>
                  <div className="contact__channel-value">{social.email}</div>
                </div>
              </a>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="contact__channel">
                <span className="contact__channel-icon">📸</span>
                <div>
                  <div className="contact__channel-label">Instagram</div>
                  <div className="contact__channel-value">@sweets.by.talya</div>
                </div>
              </a>
            </div>
          </div>

          <div className="contact__form-wrap">
            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon">🍫</div>
                <h3>{t('contact.success_title')}</h3>
                <p>{t('contact.success_text')}</p>
                <button className="btn btn-caramel" onClick={() => setStatus('idle')}>
                  {t('contact.send_another')}
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <h2 className="contact__form-title">{t('contact.form_title')}</h2>

                <div className="contact__field">
                  <label htmlFor="contact-name">{t('contact.field_name')} *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.placeholder_name')}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-email">{t('contact.field_email')}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholder_email')}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-phone">{t('contact.field_phone')}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('contact.placeholder_phone')}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message">{t('contact.field_message')} *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.placeholder_message')}
                  />
                </div>

                {error && <p className="contact__error">{error}</p>}

                <button
                  type="submit"
                  className="btn btn-caramel contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                </button>

                <p className="contact__note">{t('contact.whatsapp_note')}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
