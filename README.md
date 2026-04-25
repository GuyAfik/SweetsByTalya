# 🍫 Sweets by Talya — Website

A beautiful, AI-powered website for **Sweets by Talya**, a boutique handmade chocolate business. Built with React + Vite, deployed on Vercel via GitHub Actions.

**Live site:** [sweetsbytalya.com](https://sweetsbytalya.com)  
**Instagram:** [@sweets.by.talya](https://www.instagram.com/sweets.by.talya/)

---

## ✨ Features

- 🌍 **Trilingual** — English, Hebrew (RTL), Portuguese with auto browser detection
- 🤖 **AI Chatbot** — GPT-powered assistant that knows the full menu and can collect orders
- 📧 **Order emails** — Orders sent directly to Talya's inbox via Gmail SMTP
- 💬 **WhatsApp reply button** — Every order email includes a one-click WhatsApp reply link
- 💳 **Payments** — Bit, Paybox, Google Pay, Apple Pay (no backend required)
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
# Frontend (shown in browser — baked into the JS bundle at build time)
VITE_WHATSAPP_PHONE=972XXXXXXXXX       # WhatsApp number (no + or spaces)
VITE_CONTACT_EMAIL=talya@...           # Contact email shown in UI
VITE_TELEMETRY_ENABLED=true            # Send visit notification emails
VITE_CHATBOT_ENABLED=true              # Show AI chat widget
VITE_DEFAULT_LANGUAGE=he               # Default language (he = Hebrew)
VITE_BIT_PHONE=972XXXXXXXXX            # Talya's phone for Bit payments
VITE_PAYBOX_PHONE=972XXXXXXXXX         # Talya's phone for Paybox payments
VITE_REQUIRE_PAYMENT_BEFORE_ORDER=true # Send order email only after payment (default: true)

# Server-side only (Vercel env vars — never exposed to the browser)
GMAIL_USER=sweetsbytalya@gmail.com     # Gmail account for sending emails
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx # Gmail App Password (not your login password)
CONTACT_EMAIL=talya@sweetsbytalya.com  # Where orders land
WHATSAPP_PHONE=972XXXXXXXXX            # For WhatsApp reply button in emails
OPENAI_API_KEY=sk-proj-...             # From platform.openai.com
```

---

## 📧 Setting Up Email (Gmail SMTP)

Order emails, contact messages, and visit notifications are sent via Gmail using an **App Password** (no third-party service needed).

### Step 1 — Enable 2-Step Verification
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** on `sweetsbytalya@gmail.com`

### Step 2 — Create an App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Click **Create** → name it "SweetsByTalya Website"
3. Copy the 16-character password
4. Add to `.env.local` as `GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx`

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
| `GMAIL_USER` | `sweetsbytalya@gmail.com` |
| `GMAIL_APP_PASSWORD` | Your 16-char App Password |
| `CONTACT_EMAIL` | `sweetsbytalya@gmail.com` |
| `WHATSAPP_PHONE` | `972XXXXXXXXX` |
| `OPENAI_API_KEY` | Your OpenAI API key |

3. Add the **frontend** variables too (these get baked into the build):

| Variable | Value |
|---|---|
| `VITE_WHATSAPP_PHONE` | `972XXXXXXXXX` |
| `VITE_CONTACT_EMAIL` | `sweetsbytalya@gmail.com` |
| `VITE_TELEMETRY_ENABLED` | `true` |
| `VITE_CHATBOT_ENABLED` | `true` |
| `VITE_DEFAULT_LANGUAGE` | `he` |
| `VITE_BIT_PHONE` | `972XXXXXXXXX` |
| `VITE_PAYBOX_PHONE` | `972XXXXXXXXX` |
| `VITE_REQUIRE_PAYMENT_BEFORE_ORDER` | `true` |

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
| `VITE_CONTACT_EMAIL` | `sweetsbytalya@gmail.com` |
| `VITE_TELEMETRY_ENABLED` | `true` |
| `VITE_CHATBOT_ENABLED` | `true` |
| `VITE_DEFAULT_LANGUAGE` | `he` |
| `VITE_BIT_PHONE` | `972XXXXXXXXX` |
| `VITE_PAYBOX_PHONE` | `972XXXXXXXXX` |
| `VITE_REQUIRE_PAYMENT_BEFORE_ORDER` | `true` |

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

## 💳 Payment Security

### How payments work (no backend required)

The payment flow uses **client-side deep links and the Web Payments API** — no payment data ever touches our servers:

| Method | Mechanism | Security |
|---|---|---|
| **Bit** | Deep link to `bitpay.co.il` with phone + amount | Bit's own app handles auth & transfer |
| **Paybox** | Deep link to `payboxapp.page.link` with phone + amount | Paybox's own app handles auth & transfer |
| **Google Pay** | Browser `PaymentRequest` API | Google's servers process the payment |
| **Apple Pay** | Browser `PaymentRequest` API | Apple's servers process the payment |

### Do we need SSL?

**Yes — and it's already handled automatically.**

- Vercel provisions a **free TLS/SSL certificate** (via Let's Encrypt) for every deployment, including custom domains. All traffic is HTTPS by default.
- The `PaymentRequest` API (Google Pay / Apple Pay) **requires HTTPS** — browsers will refuse to run it on plain HTTP. This is enforced by the browser itself.
- Bit and Paybox deep links open their own apps over HTTPS — our site only passes the phone number and amount as URL parameters (no card data, no tokens).

### What we do NOT handle

- ❌ No card numbers, CVVs, or bank credentials ever pass through this site
- ❌ No payment tokens are stored anywhere
- ❌ No PCI-DSS compliance required (we never touch card data)

### Order gating — payment before confirmation

The flag `VITE_REQUIRE_PAYMENT_BEFORE_ORDER` (default: `true`) controls when the order email is sent to Talya:

| Flag value | Behaviour |
|---|---|
| `true` (default) | Customer fills the form → payment selector shown → **email sent only after a payment button is clicked** |
| `false` | Email sent immediately on form submit (old behaviour) |

**How it works technically:**
1. Customer submits the order form — data is validated and held in memory (no email yet)
2. Payment selector is shown with the total amount
3. Customer clicks Bit, Paybox, Google Pay, or Apple Pay
4. The payment app opens **and simultaneously** the order email is sent to Talya
5. Success screen is shown

> **Limitation:** We cannot programmatically verify that the payment was actually completed (Bit/Paybox don't provide webhooks for personal accounts). The email is sent when the customer *initiates* payment, not when it *completes*. Talya should cross-reference her Bit/Paybox app notifications with order emails before preparing orders.

To disable (send email on form submit regardless of payment):
```env
VITE_REQUIRE_PAYMENT_BEFORE_ORDER=false
```

### Future: server-side payment verification

If stronger verification is needed in the future (e.g., webhook confirmation), options include:
- **Stripe** — full payment processing with webhooks
- **Tranzila** — Israeli payment gateway with ILS support
- **PayMe** — Israeli mobile payment platform with API

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
