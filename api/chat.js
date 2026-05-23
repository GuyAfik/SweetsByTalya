// Vercel Serverless Function — OpenAI Chat Proxy
// Shared logic lives in api/_chatCore.js (single source of truth).
// Locally: scripts/dev-api.mjs imports the same _chatCore.js.

import { buildSystemPrompt, orderInviteTool } from './_chatCore.js'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  const {
    messages,
    language = 'en',
    menuSummary = '',
    pralinePricing = '',
    offeringsSummary = '',
  } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }

  const systemPrompt = buildSystemPrompt(language, menuSummary, pralinePricing, offeringsSummary)

  try {
    const openaiRes = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
        tools: [orderInviteTool()],
        tool_choice: 'auto',
      }),
    })

    if (!openaiRes.ok) {
      const errText = await openaiRes.text()
      console.error('[ChatProxy] OpenAI error:', errText)
      return res.status(502).json({ error: 'OpenAI request failed' })
    }

    const data = await openaiRes.json()
    const choice = data.choices?.[0]

    // Handle tool call: send_order_invite
    if (choice?.finish_reason === 'tool_calls') {
      const toolCall = choice.message.tool_calls?.[0]
      if (toolCall?.function?.name === 'send_order_invite') {
        let args = {}
        try { args = JSON.parse(toolCall.function.arguments) } catch {}
        return res.status(200).json({
          type: 'order_invite',
          orderData: args,
          message: choice.message,
        })
      }
    }

    return res.status(200).json({ message: choice?.message })
  } catch (err) {
    console.error('[ChatProxy] Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
