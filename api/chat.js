// Vercel Edge Function — OpenAI Chat Proxy
// This keeps the OpenAI API key server-side only.
// Locally: run `vercel dev` or the Vite proxy will forward to localhost:3001
// In production: deployed automatically by Vercel

export const config = { runtime: 'edge' }

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
      status: 500,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  const { messages, language = 'en', menuSummary = '' } = body

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  }

  const systemPrompt = buildSystemPrompt(language, menuSummary)

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
      return new Response(JSON.stringify({ error: 'OpenAI request failed' }), {
        status: 502,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      })
    }

    const data = await openaiRes.json()
    const choice = data.choices?.[0]

    // Handle tool call: send_order_invite
    if (choice?.finish_reason === 'tool_calls') {
      const toolCall = choice.message.tool_calls?.[0]
      if (toolCall?.function?.name === 'send_order_invite') {
        let args = {}
        try { args = JSON.parse(toolCall.function.arguments) } catch {}
        return new Response(
          JSON.stringify({
            type: 'order_invite',
            orderData: args,
            message: choice.message,
          }),
          {
            status: 200,
            headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
          }
        )
      }
    }

    return new Response(JSON.stringify({ message: choice?.message }), {
      status: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[ChatProxy] Unexpected error:', err)
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

function buildSystemPrompt(language, menuSummary) {
  const langInstruction =
    language === 'he'
      ? 'Always respond in Hebrew (עברית). Use a warm, friendly tone.'
      : language === 'pt'
      ? 'Always respond in Portuguese (Português). Use a warm, friendly tone.'
      : 'Always respond in English. Use a warm, friendly tone.'

  return `You are the AI assistant for "Sweets by Talya", a boutique handmade chocolate business owned by Talya.

${langInstruction}

You help customers with:
- Information about our products (pralines, brownies, chocolate boxes)
- Prices and ingredients
- Allergen information
- How to place an order
- Custom order requests

When a customer wants to place an order, collect their name, what they want to order, quantity, and contact info (phone or email), then use the send_order_invite tool.

Always be warm, enthusiastic about the chocolates, and helpful. If you don't know something, say so honestly and suggest they contact Talya directly via WhatsApp.

Do NOT discuss topics unrelated to Sweets by Talya.

Current menu:
${menuSummary || 'Pralines (various flavors), Brownies, Chocolate Boxes, Custom Orders. Prices range from 8₪ per praline to 120₪ for gift boxes.'}

Contact: WhatsApp and email available on the website.`
}

function orderInviteTool() {
  return {
    type: 'function',
    function: {
      name: 'send_order_invite',
      description:
        'Collect order details from the customer and prepare an order summary to send via WhatsApp or email.',
      parameters: {
        type: 'object',
        properties: {
          customer_name: { type: 'string', description: 'Customer full name' },
          product: { type: 'string', description: 'Product(s) they want to order' },
          quantity: { type: 'string', description: 'Quantity or amount' },
          contact: { type: 'string', description: 'Phone number or email' },
          notes: { type: 'string', description: 'Any special requests or notes' },
        },
        required: ['customer_name', 'product'],
      },
    },
  }
}
