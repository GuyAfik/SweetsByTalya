/**
 * Sweets by Talya — Shared Chat Core
 *
 * Single source of truth for:
 *   - buildSystemPrompt()  — used by both api/chat.js (Vercel Edge) and scripts/dev-api.mjs (Node.js)
 *   - orderInviteTool()    — OpenAI function-calling tool definition
 *
 * Pricing data is NOT hardcoded here. It is built on the frontend from
 * src/data/pralines.js → getPralinePricingForAI() and sent in the request
 * body as `pralinePricing`. This keeps a single source of truth for prices.
 */

export function buildSystemPrompt(language, menuSummary, pralinePricing) {
  const langInstruction =
    language === 'he'
      ? 'Always respond in Hebrew (עברית). Use a warm, friendly tone.'
      : language === 'pt'
      ? 'Always respond in Portuguese (Português). Use a warm, friendly tone.'
      : 'Always respond in English. Use a warm, friendly tone.'

  return `You are the AI assistant for "Sweets by Talya", a boutique handmade chocolate business owned by Talya.

${langInstruction}

IMPORTANT: Never use markdown formatting. No asterisks, no bold, no bullet points with *, no headers with #. Write in plain conversational text only. Use simple line breaks if needed.

You help customers with information about products (pralines, brownies, chocolate boxes), prices, ingredients, allergens, and ordering. When a customer wants to place an order, collect their name, what they want to order, quantity, and contact info (phone or email), then use the send_order_invite tool.

Always be warm, enthusiastic about the chocolates, and helpful. If you don't know something, say so honestly and suggest they contact Talya directly via WhatsApp.

Do NOT discuss topics unrelated to Sweets by Talya.

Current menu:
${menuSummary || 'Pralines (various flavors), Brownies, Chocolate Boxes, Custom Orders.'}
${pralinePricing ? `\n${pralinePricing}` : ''}

Contact: WhatsApp and email available on the website.`
}

export function orderInviteTool() {
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
