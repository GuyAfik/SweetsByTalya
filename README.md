# 🍫 Sweets by Talya — Website

A beautiful, AI-powered website for **Sweets by Talya**, a boutique handmade chocolate business. Built with React + Vite, deployed on Vercel via GitHub Actions.

**Live site:** [sweetsbytalya.com](https://sweetsbytalya.com)  
**Instagram:** [@sweets.by.talya](https://www.instagram.com/sweets.by.talya/)

---

## ✨ Features

- 🌍 **Trilingual** — English, Hebrew (RTL), Portuguese with auto browser detection
- 🤖 **AI Chatbot** — GPT-powered assistant that knows the full menu and can collect orders
- 📧 **Order emails** — Orders sent directly to Talya's inbox via Resend (free)
- 💬 **WhatsApp reply button** — Every order email includes a one-click WhatsApp reply link
- 📊 **Visit telemetry** — Email notification on every website visit (feature-flagged)
- 📱 **Mobile-first** — Fully responsive, works on all devices
- 🎨 **Warm chocolate design** — Custom CSS design system with Playfair Display typography
- 🚀 **CI/CD** — GitHub Actions builds and deploys to Vercel on every push to `main`

---

## 🗂️ Project Structure

```
SweetsByTalya/
├── api/
│   ├── chat.js           ← AI chatbot proxy (OpenAI, server-side key)
│   └── send-order.js     ← Order + telemetry emails (Resend)
├── public/
│   └── locales/          ← Translation files (en, he, pt)
│       ├── en/translation.json
│       ├── he/translation.json
│       └── pt/translation.json
├── src/
│   ├── components/
│   │   ├── chatbot/      ← AI chat widget
│   │   ├── layout/       ← Navbar, Footer
│   │   └── shared/       ← WhatsApp button, Language switcher
│   ├── config/           ← Social links, feature flags
│   ├── data/
│   │   └── menu.js       ← ⭐ Edit this to update products & prices
│   ├── hooks/            ← useTelemetry, useEmailJS
│   └── pages/            ← Home, About, Gallery, Menu, Order
├── .env.example          ← Copy to .env.local and fill in values
├── .github/workflows/
│   └── deploy.yml        ← GitHub Actions CI/CD
└── plans/design.md       ← Full design document
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 20+
- npm
- Vercel CLI (installed globally via `npm install -g vercel`)

### Why `vercel dev` instead of `npm run dev`?

The `/api/` folder contains **Vercel Edge Functions** (for email sending and the AI chatbot proxy). These only run inside Vercel's runtime. `vercel dev` starts both the Vite frontend **and** the Edge Functions together locally, so everything works end-to-end.

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/SweetsByTalya.git
cd SweetsByTalya

# 2. Install dependencies
npm install

# 3. Install Vercel CLI (if not already installed)
npm install -g vercel

# 4. Log in to Vercel (one-time setup)
vercel login
# Follow the browser prompt to authenticate

# 5. Link to your Vercel project (one-time setup)
vercel link
# Select your team/account and project, or create a new one

# 6. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your real values (see Environment Variables section below)

# 7. Start the full dev server (frontend + API functions)
npm run dev
# This runs: vercel dev
```

The site will be available at **http://localhost:3000**
The API functions will be available at **http://localhost:3000/api/***

> **Frontend-only mode** (no API functions): If you just want to work on the UI without email/chatbot, run `npm run dev:vite`. The order form will show an error on submit, but all pages and navigation work fine.

> **Without API keys**: The site works fully — the chatbot shows a connection error and emails don't send, but all pages, navigation, gallery, menu, and translations work normally.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# Frontend (shown in browser)
VITE_WHATSAPP_PHONE=972XXXXXXXXX       # WhatsApp number (no + or spaces)
VITE_CONTACT_EMAIL=talya@...           # Contact email shown in UI
VITE_TELEMETRY_ENABLED=true            # Send visit notification emails
VITE_CHATBOT_ENABLED=true              # Show AI chat widget
VITE_PAYMENTS_ENABLED=false            # Future Stripe payments (keep false)
VITE_DEFAULT_LANGUAGE=en               # Fallback language

# Server-side only (Vercel env vars in production)
RESEND_API_KEY=re_...                  # From resend.com (free)
CONTACT_EMAIL=talya@sweetsbytalya.com  # Where orders land
FROM_EMAIL=onboarding@resend.dev       # Sender (use resend.dev for testing)
WHATSAPP_PHONE=972XXXXXXXXX            # For WhatsApp reply button in emails
OPENAI_API_KEY=sk-proj-...             # From platform.openai.com
```

---

## 📧 Setting Up Email (Resend) — Free

Resend sends order emails and visit notifications. **Free tier: 3,000 emails/month.**

### Step 1 — Create a Resend account
1. Go to [resend.com](https://resend.com) and sign up (free, no credit card)
2. Go to **API Keys** → **Create API Key**
3. Copy the key → add to `.env.local` as `RESEND_API_KEY`

### Step 2 — Test without domain verification
For local testing and initial deployment, use Resend's built-in test sender:
```env
FROM_EMAIL=onboarding@resend.dev
```
This works immediately with no setup. Emails will arrive from `onboarding@resend.dev`.

### Step 3 — Use your own domain (production)
To send from `orders@sweetsbytalya.com`:
1. In Resend dashboard → **Domains** → **Add Domain** → enter `sweetsbytalya.com`
2. Add the 2 DNS records shown (takes ~5 minutes to verify)
3. Update `FROM_EMAIL=orders@sweetsbytalya.com` in Vercel env vars

### How orders work
When a customer submits the order form:
1. **Email** is sent to Talya's inbox with all order details
2. **WhatsApp reply button** is embedded in the email — Talya clicks it to open WhatsApp with a pre-filled reply to the customer (free, no API needed)

---

## 🤖 Setting Up the AI Chatbot (OpenAI)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account → **API Keys** → **Create new secret key**
3. Add to `.env.local` as `OPENAI_API_KEY`
4. Add billing (the chatbot uses GPT-4o-mini — very cheap, ~$0.001 per conversation)

The chatbot knows the full menu from [`src/data/menu.js`](src/data/menu.js) and responds in the user's language (EN/HE/PT).

To **disable** the chatbot: set `VITE_CHATBOT_ENABLED=false`

---

## 🚀 Deploying to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/SweetsByTalya.git
git push -u origin main
```

### Step 2 — Create a Vercel project
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New Project** → Import your `SweetsByTalya` repository
3. Vercel auto-detects Vite — click **Deploy**

### Step 3 — Add Environment Variables in Vercel
1. In your Vercel project → **Settings** → **Environment Variables**
2. Add all the **server-side** variables (these are NOT in GitHub):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | `talya@sweetsbytalya.com` |
| `FROM_EMAIL` | `onboarding@resend.dev` (or your domain) |
| `WHATSAPP_PHONE` | `972XXXXXXXXX` |
| `OPENAI_API_KEY` | Your OpenAI API key |

3. Add the **frontend** variables too (these get baked into the build):

| Variable | Value |
|---|---|
| `VITE_WHATSAPP_PHONE` | `972XXXXXXXXX` |
| `VITE_CONTACT_EMAIL` | `talya@sweetsbytalya.com` |
| `VITE_TELEMETRY_ENABLED` | `true` |
| `VITE_CHATBOT_ENABLED` | `true` |
| `VITE_PAYMENTS_ENABLED` | `false` |
| `VITE_DEFAULT_LANGUAGE` | `en` |

### Step 4 — Connect GitHub Actions (optional but recommended)
GitHub Actions gives you more control over the CI/CD pipeline.

1. In Vercel → **Settings** → **General** → copy your **Project ID** and **Org ID**
2. In Vercel → **Account Settings** → **Tokens** → create a token
3. In GitHub → your repo → **Settings** → **Secrets and variables** → **Actions** → add:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Your Vercel token |
| `VERCEL_ORG_ID` | Your Vercel org ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |
| `VITE_WHATSAPP_PHONE` | `972XXXXXXXXX` |
| `VITE_CONTACT_EMAIL` | `talya@sweetsbytalya.com` |
| `VITE_TELEMETRY_ENABLED` | `true` |
| `VITE_CHATBOT_ENABLED` | `true` |
| `VITE_PAYMENTS_ENABLED` | `false` |
| `VITE_DEFAULT_LANGUAGE` | `en` |

Now every push to `main` triggers a build + deploy. Pull requests get preview URLs automatically.

---

## 🌐 Custom Domain Setup

1. Buy your domain (e.g., from [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google))
2. In Vercel → your project → **Settings** → **Domains** → **Add** → enter `sweetsbytalya.com`
3. Vercel shows you DNS records to add. At your domain registrar, add:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
4. Wait 5–30 minutes for DNS propagation
5. Vercel auto-provisions an SSL certificate (HTTPS) — no action needed

---

## 📋 Updating Products & Prices

All products are in **[`src/data/menu.js`](src/data/menu.js)** — no code changes needed, just edit the data:

```js
{
  id: 1,
  name: 'Hazelnut Praline',
  description: 'Smooth dark chocolate shell...',
  price: 8,           // ← change price here
  currency: '₪',
  ingredients: ['Dark chocolate', 'Hazelnuts', ...],
  allergens: ['nuts', 'dairy'],
  available: true,    // ← set false to hide from menu
  featured: true,     // ← show on home page
}
```

After editing, commit and push — the site redeploys automatically.

---

## 🌍 Adding/Editing Translations

Translation files are in `public/locales/`:
- `en/translation.json` — English
- `he/translation.json` — Hebrew
- `pt/translation.json` — Portuguese

Edit any key to update the text. The structure mirrors the UI sections (`nav`, `hero`, `menu`, `order`, etc.).

---

## 🎨 Updating Colors & Design

All design tokens are CSS variables in [`src/index.css`](src/index.css):

```css
:root {
  --color-chocolate-dark: #3B1F0E;
  --color-caramel: #C8813A;
  --color-cream: #FDF6EC;
  /* ... */
}
```

Change any value and it updates everywhere instantly.

---

## 📊 Telemetry (Visit Notifications)

When `VITE_TELEMETRY_ENABLED=true`, Talya receives an email on every website visit containing:
- Timestamp (Israel time)
- Page visited
- Referrer (where they came from)
- Device type (Mobile/Desktop)
- Browser language
- Timezone

To disable: set `VITE_TELEMETRY_ENABLED=false` in Vercel env vars.

---

## 🔮 Future: Credit Card Payments (Stripe)

The order form is already structured for Stripe. When ready:
1. Set `VITE_PAYMENTS_ENABLED=true`
2. Add `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` env vars
3. Map products in `menu.js` to Stripe Price IDs
4. Add a Stripe Checkout step after the order form

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Styling | CSS Modules + CSS Variables |
| i18n | i18next + react-i18next |
| AI Chatbot | OpenAI GPT-4o-mini (via Vercel Edge Function) |
| Email | Resend (via Vercel Edge Function) |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

---

## 📞 Support

For questions about the website, contact the developer.  
For chocolate orders, contact Talya via [Instagram](https://www.instagram.com/sweets.by.talya/) or WhatsApp.
