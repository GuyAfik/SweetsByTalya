// Vercel Serverless Function (Node.js runtime) — Send Order Email via Gmail SMTP
//
// Uses nodemailer with Gmail App Password — no external service needed.
// sweetsbytalya@gmail.com sends an email to itself on every order.
//
// Setup (one-time):
//   1. Enable 2-Step Verification on sweetsbytalya@gmail.com
//   2. Go to myaccount.google.com/apppasswords → Create → copy 16-char password
//   3. Add to Vercel env vars:
//        GMAIL_USER=sweetsbytalya@gmail.com
//        GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
//        CONTACT_EMAIL=sweetsbytalya@gmail.com
//        WHATSAPP_PHONE=972XXXXXXXXX

import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type = 'order', name, phone, email, product, notes, ...rest } = req.body || {}

  const toEmail = process.env.CONTACT_EMAIL || 'sweetsbytalya@gmail.com'
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  const whatsappPhone = process.env.WHATSAPP_PHONE

  // Build WhatsApp reply link
  let whatsappReplyUrl = null
  if (type === 'order' && whatsappPhone) {
    const msg = [
      `Hi ${name || 'there'}! 🍫 I received your order from SweetsByTalya.com.`,
      ``,
      `*Order:* ${product}`,
      notes ? `*Notes:* ${notes}` : '',
      ``,
      `Let me confirm the details and get back to you shortly!`,
    ].filter(l => l !== undefined).join('\n')
    whatsappReplyUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(msg)}`
  }

  const subject = type === 'order'
    ? `🍫 New Order from ${name || 'Website visitor'}`
    : `🍫 New Visit — SweetsByTalya.com`

  const html = type === 'order'
    ? buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl })
    : buildTelemetryEmail({ type, ...rest })

  // If Gmail not configured, return mock success (dev mode)
  if (!gmailUser || !gmailPass) {
    console.warn('[send-order] Gmail not configured — returning mock success')
    return res.status(200).json({ success: true, warning: 'Email not configured' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    })

    const info = await transporter.sendMail({
      from: `Sweets by Talya <${gmailUser}>`,
      to: toEmail,
      replyTo: email || undefined,
      subject,
      html,
    })

    console.log(`[send-order] Email sent: ${info.messageId}`)
    return res.status(200).json({ success: true, messageId: info.messageId })
  } catch (err) {
    console.error('[send-order] Gmail error:', err.message)
    return res.status(502).json({ error: 'Failed to send email', detail: err.message })
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl }) {
  const waButton = whatsappReplyUrl
    ? `<div style="text-align:center;margin:28px 0;">
        <a href="${whatsappReplyUrl}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:16px;font-weight:700;font-family:Arial,sans-serif;">
          💬 Reply via WhatsApp
        </a>
        <p style="font-size:12px;color:#9B7B6A;margin-top:8px;font-family:Arial,sans-serif;">Click to open WhatsApp with a pre-filled reply to this customer</p>
       </div>`
    : ''

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Georgia,serif;background:#FDF6EC;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(59,31,14,0.12);">
    <div style="background:linear-gradient(135deg,#3B1F0E,#6B3A2A);padding:36px;text-align:center;">
      <div style="font-size:48px;">🍫</div>
      <h1 style="color:#FDF6EC;margin:12px 0 6px;font-family:Georgia,serif;">New Order!</h1>
      <p style="color:#C8813A;margin:0;font-style:italic;font-family:Arial,sans-serif;">Someone placed an order on SweetsByTalya.com</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#C8813A;font-weight:700;font-family:Arial,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:140px;">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#3B1F0E;font-size:16px;">${escapeHtml(name || '—')}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#C8813A;font-weight:700;font-family:Arial,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Phone</td>
            <td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#3B1F0E;font-size:16px;">${escapeHtml(phone || 'Not provided')}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#C8813A;font-weight:700;font-family:Arial,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#3B1F0E;font-size:16px;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#C8813A;">${escapeHtml(email)}</a>` : 'Not provided'}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#C8813A;font-weight:700;font-family:Arial,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Order</td>
            <td style="padding:12px 0;border-bottom:1px solid #F5E6D0;color:#3B1F0E;font-size:16px;">${escapeHtml(product || '—')}</td></tr>
        ${notes ? `<tr><td style="padding:12px 0;color:#C8813A;font-weight:700;font-family:Arial,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Notes</td>
            <td style="padding:12px 0;color:#3B1F0E;font-size:16px;">${escapeHtml(notes)}</td></tr>` : ''}
      </table>
      ${waButton}
    </div>
    <div style="background:#F5E6D0;padding:16px 32px;text-align:center;font-size:13px;color:#9B7B6A;font-family:Arial,sans-serif;">
      Sent from <strong>sweetsbytalya.com</strong> &nbsp;·&nbsp; ${new Date().toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' })}
    </div>
  </div>
</body></html>`
}

function buildTelemetryEmail(data) {
  const rows = Object.entries(data)
    .filter(([k]) => k !== 'type')
    .map(([k, v]) => `<tr><td style="color:#C8813A;font-weight:700;padding:6px 12px 6px 0;font-family:Arial,sans-serif;font-size:13px;width:110px;">${escapeHtml(k)}</td><td style="color:#3B1F0E;font-size:14px;">${escapeHtml(String(v))}</td></tr>`)
    .join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#FDF6EC;padding:20px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(59,31,14,0.08);">
    <h2 style="color:#3B1F0E;font-family:Georgia,serif;margin:0 0 20px;">🍫 New visitor on SweetsByTalya.com!</h2>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
  </div>
</body></html>`
}
