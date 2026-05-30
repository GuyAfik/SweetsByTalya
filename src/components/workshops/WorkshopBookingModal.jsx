import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getWhatsAppOrderLink } from '../../config/social'
import './WorkshopBookingModal.css'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  contactMethod: 'whatsapp',
  eventDate: '',
  participants: '',
  occasion: '',
  notes: '',
}

export default function WorkshopBookingModal({ workshop, onClose }) {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const workshopTitle = t(workshop.titleKey)
  const workshopAges = t(workshop.agesKey)

  const minDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().split('T')[0]
  })()

  const buildWhatsAppMessage = () => {
    return [
      `🎨 ${t('workshop_booking.modal_title')}`,
      `📋 ${workshopTitle} (${workshopAges})`,
      ``,
      `👤 ${t('workshop_booking.modal_name')}: ${form.name}`,
      `📞 ${t('workshop_booking.modal_phone')}: ${form.phone}`,
      form.email ? `📧 ${t('workshop_booking.modal_email')}: ${form.email}` : '',
      `📅 ${t('workshop_booking.modal_event_date')}: ${form.eventDate || t('workshop_booking.modal_tbd')}`,
      `👥 ${t('workshop_booking.modal_participants')}: ${form.participants || t('workshop_booking.modal_tbd')}`,
      form.occasion ? `🎉 ${t('workshop_booking.modal_occasion')}: ${form.occasion}` : '',
      form.notes ? `📝 ${t('workshop_booking.modal_notes')}: ${form.notes}` : '',
    ].filter(Boolean).join('\n')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return
    setLoading(true)

    const product = [
      workshopTitle,
      workshopAges,
      form.participants ? `${t('workshop_booking.modal_participants')}: ${form.participants}` : '',
      form.eventDate ? `${t('workshop_booking.modal_event_date')}: ${form.eventDate}` : '',
      form.occasion ? `${t('workshop_booking.modal_occasion')}: ${form.occasion}` : '',
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
          notes: form.notes || '',
        }),
      })
    } catch {}

    if (form.contactMethod === 'whatsapp' || form.contactMethod === 'both') {
      window.open(getWhatsAppOrderLink(buildWhatsAppMessage()), '_blank', 'noopener,noreferrer')
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="wbm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="wbm-sheet" onClick={e => e.stopPropagation()}>
          <button className="wbm-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="wbm-success">
            <div className="wbm-success__icon">{workshop.icon}</div>
            <h2>{t('workshop_booking.modal_success_title')}</h2>
            <p>{t('workshop_booking.modal_success_desc')}</p>
            <button className="btn btn-caramel" onClick={onClose}>{t('workshop_booking.modal_close')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wbm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="wbm-sheet" onClick={e => e.stopPropagation()}>
        <button className="wbm-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="wbm-header" style={{ background: workshop.bgGradient }}>
          <span className="wbm-header__icon">{workshop.icon}</span>
          <h2 className="wbm-header__title">{t('workshop_booking.modal_title')}</h2>
          <p className="wbm-header__workshop">{workshopTitle}</p>
        </div>

        <div className="wbm-body">

          <div className="wbm-section">
            <h3 className="wbm-section__title">{t('workshop_booking.modal_event_details')}</h3>

            <div className="wbm-field-row">
              <div className="wbm-field">
                <label className="wbm-label">{t('workshop_booking.modal_event_date')}</label>
                <input
                    className="wbm-input"
                    type="date"
                    value={form.eventDate}
                    min={minDate}
                    onChange={e => set('eventDate', e.target.value)}
                    dir="ltr"
                  />
              </div>
              <div className="wbm-field">
                <label className="wbm-label">{t('workshop_booking.modal_participants')}</label>
                <input
                  className="wbm-input"
                  type="number"
                  min="1"
                  max="100"
                  value={form.participants}
                  onChange={e => set('participants', e.target.value)}
                  placeholder="5–20"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_occasion')}</label>
              <input
                className="wbm-input"
                type="text"
                value={form.occasion}
                onChange={e => set('occasion', e.target.value)}
                placeholder={t('workshop_booking.modal_occasion_placeholder')}
              />
            </div>
          </div>

          <div className="wbm-section">
            <h3 className="wbm-section__title">{t('workshop_booking.modal_contact_title')}</h3>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_name')} *</label>
              <input
                className="wbm-input"
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder={t('workshop_booking.modal_name_placeholder')}
              />
            </div>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_phone')} *</label>
              <input
                className="wbm-input"
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="050-000-0000"
                dir="ltr"
              />
            </div>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_email')}</label>
              <input
                className="wbm-input"
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                dir="ltr"
              />
            </div>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_contact_method')}</label>
              <div className="wbm-methods">
                {['whatsapp', 'email', 'both'].map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`wbm-method-btn${form.contactMethod === m ? ' wbm-method-btn--active' : ''}`}
                    style={form.contactMethod === m ? { borderColor: workshop.color, background: `${workshop.color}18` } : {}}
                    onClick={() => set('contactMethod', m)}
                  >
                    {t(`workshop_booking.modal_method_${m}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="wbm-field">
              <label className="wbm-label">{t('workshop_booking.modal_notes')}</label>
              <textarea
                className="wbm-input wbm-textarea"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder={t('workshop_booking.modal_notes_placeholder')}
                rows={3}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-lg wbm-submit"
            style={{ background: workshop.color, color: '#fff' }}
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.phone}
          >
            {loading ? '...' : `💬 ${t('workshop_booking.modal_submit')}`}
          </button>
        </div>
      </div>
    </div>
  )
}
