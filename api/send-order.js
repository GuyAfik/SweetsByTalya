// Vercel Edge Function — Send Order Email via Resend
// On every order:
//   1. Sends a formatted HTML email to Talya's inbox (via Resend)
//   2. Embeds a one-click WhatsApp reply link inside the email (free, no API needed)
//
// Resend free tier: 3,000 emails/month — https://resend.com

export const config = { runtime: 'edge' }

const RESEND_API_URL = 'https://api.resend.com/emails'

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[send-order] RESEND_API_KEY not set — email not sent')
    // Return success anyway so the user doesn't see an error during local dev
    return new Response(JSON.stringify({ success: true, warning: 'Email not configured' }), {
      status: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  const { type = 'order', name, phone, email, product, notes } = body

  const toEmail = process.env.CONTACT_EMAIL || 'talya@sweetsbytalya.com'
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
  const whatsappPhone = process.env.WHATSAPP_PHONE // server-side, no VITE_ prefix

  const isOrder = type === 'order'
  const subject = isOrder
    ? `🍫 New Order from ${name || 'Website visitor'}`
    : `🍫 New Visit — SweetsByTalya.com`

  // Build WhatsApp reply link (embedded in the email for Talya to click)
  let whatsappReplyUrl = null
  if (isOrder && whatsappPhone) {
    const waMsg = [
      `Hi ${name || 'there'}! 🍫 I received your order request from SweetsByTalya.com.`,
      ``,
      `*Your order:* ${product || '—'}`,
      notes ? `*Notes:* ${notes}` : '',
      ``,
      `Let me confirm the details and get back to you shortly!`,
    ]
      .filter((l) => l !== undefined)
      .join('\n')
    whatsappReplyUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMsg)}`
  }

  const html = isOrder
    ? buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl })
    : buildTelemetryEmail(body)

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Sweets by Talya <${fromEmail}>`,
        to: [toEmail],
        reply_to: email || undefined,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[send-order] Resend error:', err)
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 502,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()
    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[send-order] Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl }) {
  const waButton = whatsappReplyUrl
    ? `
      <div style="text-align:center; margin: 28px 0;">
        <a href="${whatsappReplyUrl}"
           style="display:inline-block; background:#25D366; color:#fff; text-decoration:none;
                  padding:14px 32px; border-radius:50px; font-size:16px; font-weight:700;
                  font-family:Arial,sans-serif;">
          💬 Reply via WhatsApp
        </a>
        <p style="font-size:12px; color:#9B7B6A; margin-top:8px;">
          Click to open WhatsApp with a pre-filled reply to this customer
        </p>
      </div>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: 'Georgia', serif; background: #FDF6EC; margin: 0; padding: 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(59,31,14,0.12); }
    .header { background: linear-gradient(135deg, #3B1F0E, #6B3A2A); padding: 36px 32px; text-align: center; }
    .header-emoji { font-size: 48px; display: block; margin-bottom: 12px; }
    .header h1 { color: #FDF6EC; font-size: 28px; margin: 0 0 6px; font-family: Georgia, serif; }
    .header p { color: #C8813A; font-size: 15px; margin: 0; font-style: italic; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #F5E6D0; }
    .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #C8813A; margin-bottom: 6px; font-family: Arial, sans-serif; }
    .value { font-size: 16px; color: #3B1F0E; line-height: 1.6; }
    .footer { background: #F5E6D0; padding: 20px 32px; text-align: center; font-size: 13px; color: #9B7B6A; font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="header-emoji">🍫</span>
      <h1>New Order!</h1>
      <p>Someone placed an order on SweetsByTalya.com</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value">${escapeHtml(name || '—')}</div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${escapeHtml(phone || 'Not provided')}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#C8813A;">${escapeHtml(email)}</a>` : 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">What They Want to Order</div>
        <div class="value">${escapeHtml(product || '—')}</div>
      </div>
      ${notes ? `
      <div class="field">
        <div class="label">Additional Notes</div>
        <div class="value">${escapeHtml(notes)}</div>
      </div>` : ''}
      ${waButton}
    </div>
    <div class="footer">
      Sent from <strong>sweetsbytalya.com</strong> &nbsp;·&nbsp; ${new Date().toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' })}
    </div>
  </div>
</body>
</html>`
}

function buildTelemetryEmail({ timestamp, page, referrer, device, language, timezone, url }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #FDF6EC; margin: 0; padding: 20px; }
    .wrapper { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 28px; box-shadow: 0 2px 12px rgba(59,31,14,0.08); }
    .title { color: #3B1F0E; font-size: 20px; margin: 0 0 20px; font-family: Georgia, serif; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #F5E6D0; }
    td:first-child { color: #C8813A; font-weight: 700; width: 110px; }
    td:last-child { color: #3B1F0E; }
    tr:last-child td { border-bottom: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="title">🍫 New visitor on SweetsByTalya.com!</div>
    <table>
      <tr><td>Time</td><td>${escapeHtml(timestamp || new Date().toISOString())}</td></tr>
      <tr><td>Page</td><td>${escapeHtml(page || '/')}</td></tr>
      <tr><td>Referrer</td><td>${escapeHtml(referrer || 'Direct')}</td></tr>
      <tr><td>Device</td><td>${escapeHtml(device || 'Unknown')}</td></tr>
      <tr><td>Language</td><td>${escapeHtml(language || 'Unknown')}</td></tr>
      <tr><td>Timezone</td><td>${escapeHtml(timezone || 'Unknown')}</td></tr>
      <tr><td>URL</td><td style="word-break:break-all;">${escapeHtml(url || '')}</td></tr>
    </table>
  </div>
</body>
</html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
