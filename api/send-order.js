// Vercel Edge Function — Send Order Email via Resend
// Resend free tier: 3,000 emails/month, no credit card needed
// Sign up at https://resend.com — get your API key in 2 minutes

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
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500,
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

  const { name, phone, email, product, notes, type = 'order' } = body

  const toEmail = process.env.CONTACT_EMAIL || 'talya@sweetsbytalya.com'
  const fromEmail = process.env.FROM_EMAIL || 'orders@sweetsbytalya.com'

  const isOrder = type === 'order'
  const subject = isOrder
    ? `🍫 New Order from ${name || 'Website visitor'}`
    : `🍫 New Visit — SweetsByTalya.com`

  const html = isOrder
    ? buildOrderEmail({ name, phone, email, product, notes })
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

function buildOrderEmail({ name, phone, email, product, notes }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Georgia', serif; background: #FDF6EC; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(59,31,14,0.1); }
    .header { background: linear-gradient(135deg, #3B1F0E, #6B3A2A); padding: 32px; text-align: center; }
    .header h1 { color: #FDF6EC; font-size: 28px; margin: 0; }
    .header p { color: #C8813A; font-size: 16px; margin: 8px 0 0; font-style: italic; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #F5E6D0; padding-bottom: 16px; }
    .field:last-child { border-bottom: none; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #C8813A; margin-bottom: 4px; }
    .value { font-size: 16px; color: #3B1F0E; line-height: 1.5; }
    .footer { background: #F5E6D0; padding: 20px 32px; text-align: center; font-size: 13px; color: #9B7B6A; }
    .emoji { font-size: 24px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="emoji">🍫</div>
      <h1>New Order!</h1>
      <p>Someone wants to order from Sweets by Talya</p>
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
        <div class="value">${escapeHtml(email || 'Not provided')}</div>
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
    </div>
    <div class="footer">
      Sent from <strong>sweetsbytalya.com</strong> · ${new Date().toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' })}
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
    .wrapper { max-width: 500px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 24px; }
    .title { color: #3B1F0E; font-size: 20px; margin-bottom: 16px; }
    .row { display: flex; gap: 8px; margin-bottom: 8px; font-size: 14px; }
    .key { color: #C8813A; font-weight: bold; min-width: 100px; }
    .val { color: #3B1F0E; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="title">🍫 New visitor on SweetsByTalya.com!</div>
    <div class="row"><span class="key">Time:</span><span class="val">${escapeHtml(timestamp || new Date().toISOString())}</span></div>
    <div class="row"><span class="key">Page:</span><span class="val">${escapeHtml(page || '/')}</span></div>
    <div class="row"><span class="key">Referrer:</span><span class="val">${escapeHtml(referrer || 'Direct')}</span></div>
    <div class="row"><span class="key">Device:</span><span class="val">${escapeHtml(device || 'Unknown')}</span></div>
    <div class="row"><span class="key">Language:</span><span class="val">${escapeHtml(language || 'Unknown')}</span></div>
    <div class="row"><span class="key">Timezone:</span><span class="val">${escapeHtml(timezone || 'Unknown')}</span></div>
    <div class="row"><span class="key">URL:</span><span class="val">${escapeHtml(url || '')}</span></div>
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
