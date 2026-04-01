/**
 * Local API dev server — simulates Vercel Edge Functions for local development
 * without needing `vercel login`.
 *
 * Usage: node scripts/dev-api.mjs
 * Then run: npm run dev:vite (in another terminal)
 *
 * Or just use: vercel dev (recommended — runs everything together)
 */

import http from 'http'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = 3001

// Load .env.local manually
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [key, ...rest] = trimmed.split('=')
      if (key && rest.length) {
        process.env[key.trim()] = rest.join('=').trim()
      }
    }
    console.log('✅ Loaded .env.local')
  } catch {
    console.warn('⚠️  No .env.local found — using existing env vars')
  }
}

loadEnv()

const RESEND_API_URL = 'https://api.resend.com/emails'

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl }) {
  const waButton = whatsappReplyUrl
    ? `<div style="text-align:center;margin:28px 0;">
        <a href="${whatsappReplyUrl}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:16px;font-weight:700;">
          💬 Reply via WhatsApp
        </a>
       </div>`
    : ''

  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;background:#FDF6EC;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#3B1F0E,#6B3A2A);padding:36px;text-align:center;">
      <div style="font-size:48px;">🍫</div>
      <h1 style="color:#FDF6EC;margin:12px 0 6px;">New Order!</h1>
      <p style="color:#C8813A;margin:0;font-style:italic;">Someone placed an order on SweetsByTalya.com</p>
    </div>
    <div style="padding:32px;">
      <p><strong style="color:#C8813A;">Name:</strong> ${escapeHtml(name)}</p>
      <p><strong style="color:#C8813A;">Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong style="color:#C8813A;">Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong style="color:#C8813A;">Order:</strong> ${escapeHtml(product)}</p>
      ${notes ? `<p><strong style="color:#C8813A;">Notes:</strong> ${escapeHtml(notes)}</p>` : ''}
      ${waButton}
    </div>
    <div style="background:#F5E6D0;padding:16px;text-align:center;font-size:13px;color:#9B7B6A;">
      Sent from sweetsbytalya.com · ${new Date().toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' })}
    </div>
  </div>
</body></html>`
}

function buildTelemetryEmail(data) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#FDF6EC;padding:20px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;">
    <h2 style="color:#3B1F0E;">🍫 New visitor on SweetsByTalya.com!</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${Object.entries(data).filter(([k]) => k !== 'type').map(([k, v]) =>
        `<tr><td style="color:#C8813A;font-weight:700;padding:6px 0;width:110px;">${k}</td><td style="color:#3B1F0E;">${escapeHtml(String(v))}</td></tr>`
      ).join('')}
    </table>
  </div>
</body></html>`
}

async function sendEmail({ to, from, replyTo, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[dev-api] RESEND_API_KEY not set — email not sent (returning mock success)')
    return { success: true, warning: 'Email not configured' }
  }

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
  return res.json()
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  // Read body
  let body = ''
  for await (const chunk of req) body += chunk
  let data
  try { data = JSON.parse(body) } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Invalid JSON' }))
    return
  }

  const toEmail = process.env.CONTACT_EMAIL || 'talya@sweetsbytalya.com'
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
  const whatsappPhone = process.env.WHATSAPP_PHONE

  try {
    if (data.type === 'order') {
      const { name, phone, email, product, notes } = data
      let whatsappReplyUrl = null
      if (whatsappPhone) {
        const msg = `Hi ${name || 'there'}! 🍫 I received your order from SweetsByTalya.com.\n\n*Order:* ${product}\n${notes ? `*Notes:* ${notes}\n` : ''}\nLet me confirm the details!`
        whatsappReplyUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(msg)}`
      }
      const result = await sendEmail({
        to: toEmail,
        from: `Sweets by Talya <${fromEmail}>`,
        replyTo: email || undefined,
        subject: `🍫 New Order from ${name || 'Website visitor'}`,
        html: buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl }),
      })
      console.log(`[dev-api] Order email sent for ${name}`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, ...result }))
    } else if (data.type === 'telemetry') {
      const result = await sendEmail({
        to: toEmail,
        from: `Sweets by Talya <${fromEmail}>`,
        subject: '🍫 New Visit — SweetsByTalya.com',
        html: buildTelemetryEmail(data),
      })
      console.log('[dev-api] Telemetry email sent')
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, ...result }))
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Unknown type' }))
    }
  } catch (err) {
    console.error('[dev-api] Error:', err.message)
    res.writeHead(502, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: err.message }))
  }
})

server.listen(PORT, () => {
  console.log(`\n🍫 Local API server running at http://localhost:${PORT}`)
  console.log('   Handles: POST /api/send-order, POST /api/chat')
  console.log('   Now run: npm run dev:vite (in another terminal)\n')
})
