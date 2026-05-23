// ============================================================
// Sweets by Talya — Social Media & Contact Config
// Update links here — no component changes needed.
// ============================================================

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '972586665191'

export const social = {
  instagram: 'https://www.instagram.com/sweets.by.talya/',
  facebook: 'https://www.facebook.com/share/1CRaLNhq4h/?mibextid=wwXIfr',
  whatsapp: `https://wa.me/${WHATSAPP_PHONE}`,
  email: import.meta.env.VITE_CONTACT_EMAIL || 'sweetsbytalya@gmail.com',
}

export const getWhatsAppOrderLink = (message = '') => {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`
}
