/**
 * Sweets by Talya — Local API Dev Server
 *
 * Sends emails via Gmail SMTP using nodemailer + Gmail App Password.
 * No external service needed — just Gmail credentials.
 *
 * Setup:
 *   1. Enable 2-Step Verification on sweetsbytalya@gmail.com
 *   2. Go to myaccount.google.com/apppasswords → Create → copy the 16-char password
 *   3. Add to .env.local:
 *        GMAIL_USER=sweetsbytalya@gmail.com
 *        GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 *        CONTACT_EMAIL=sweetsbytalya@gmail.com
 */

import http from 'http'
import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { buildSystemPrompt, orderInviteTool } from '../api/_chatCore.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = parseInt(process.env.PORT || '3001', 10)

// ── Load .env.local ───────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (key) process.env[key] = val
    }
    console.log('✅ Loaded .env.local')
  } catch {
    console.warn('⚠️  No .env.local found — using existing env vars')
  }
}

loadEnv()

// ── Gmail transporter ─────────────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) return null

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

// ── Send email ────────────────────────────────────────────────────────────────
async function sendEmail({ to, from, replyTo, subject, html }) {
  const transporter = createTransporter()

  if (!transporter) {
    console.warn('[dev-api] GMAIL_USER / GMAIL_APP_PASSWORD not set — mock success')
    return { success: true, warning: 'Email not configured' }
  }

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: replyTo || undefined,
    subject,
    html,
  })

  console.log(`[dev-api] ✉️  Email sent: ${info.messageId}`)
  return { success: true, messageId: info.messageId }
}

// ── HTML builders ─────────────────────────────────────────────────────────────
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

// ── OpenAI Chat proxy — logic shared via api/_chatCore.js ────────────────────
async function handleChat(data, res) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }))
    return
  }

  const { messages, language = 'en', menuSummary = '', pralinePricing = '' } = data
  const systemPrompt = buildSystemPrompt(language, menuSummary, pralinePricing)

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
        tools: [orderInviteTool()],
        tool_choice: 'auto',
      }),
    })

    if (!openaiRes.ok) {
      const err = await openaiRes.text()
      console.error('[dev-api] OpenAI error:', err)
      res.writeHead(502, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'OpenAI request failed' }))
      return
    }

    const result = await openaiRes.json()
    const choice = result.choices?.[0]

    if (choice?.finish_reason === 'tool_calls') {
      const toolCall = choice.message.tool_calls?.[0]
      let args = {}
      try { args = JSON.parse(toolCall.function.arguments) } catch {}
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ type: 'order_invite', orderData: args, message: choice.message }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: choice?.message }))
    }
  } catch (err) {
    console.error('[dev-api] Chat error:', err.message)
    res.writeHead(502, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: err.message }))
  }
}

// ── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  let body = ''
  for await (const chunk of req) body += chunk
  let data
  try { data = JSON.parse(body) } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Invalid JSON' }))
    return
  }

  // Route: /api/chat
  if (req.url === '/api/chat') {
    await handleChat(data, res)
    return
  }

  const toEmail = process.env.CONTACT_EMAIL || 'sweetsbytalya@gmail.com'
  const fromEmail = process.env.GMAIL_USER || 'sweetsbytalya@gmail.com'
  const whatsappPhone = process.env.WHATSAPP_PHONE

  try {
    if (data.type === 'order') {
      const { name, phone, email, product, notes } = data

      // Build WhatsApp link to the CUSTOMER's phone (so Talya can reply to them)
      // Use simple wa.me/{phone} without ?text= to avoid URL corruption in email clients
      let whatsappReplyUrl = null
      const customerPhone = phone ? phone.replace(/[\s\-().+]/g, '') : null
      if (customerPhone) {
        whatsappReplyUrl = `https://wa.me/${customerPhone}`
      }

      const result = await sendEmail({
        to: toEmail,
        from: `Sweets by Talya <${fromEmail}>`,
        replyTo: email || undefined,
        subject: `🍫 New Order from ${name || 'Website visitor'}`,
        html: buildOrderEmail({ name, phone, email, product, notes, whatsappReplyUrl }),
      })
      console.log(`[dev-api] Order processed for: ${name}`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, ...result }))

    } else if (data.type === 'telemetry') {
      const result = await sendEmail({
        to: toEmail,
        from: `Sweets by Talya <${fromEmail}>`,
        subject: '🍫 New Visit — SweetsByTalya.com',
        html: buildTelemetryEmail(data),
      })
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
  const gmailUser = process.env.GMAIL_USER
  console.log(`\n🍫 Local API server → http://localhost:${PORT}`)
  if (gmailUser) {
    console.log(`   📧 Gmail: ${gmailUser}`)
  } else {
    console.log(`   ⚠️  No Gmail configured — set GMAIL_USER + GMAIL_APP_PASSWORD in .env.local`)
  }
  console.log()
})
