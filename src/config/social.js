// ============================================================
// Sweets by Talya — Social Media & Contact Config
// Update links here — no component changes needed.
// ============================================================

export const social = {
  instagram: 'https://www.instagram.com/sweets.by.talya/',
  facebook: 'https://www.facebook.com/sweetsbytalya',
  whatsapp: `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE}`,
  email: import.meta.env.VITE_CONTACT_EMAIL || 'talya@sweetsbytalya.com',
}

export const getWhatsAppOrderLink = (message = '') => {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}
