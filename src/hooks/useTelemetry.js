import { useEffect } from 'react'
import { flags } from '../config/featureFlags'

/**
 * useTelemetry — fires a visit notification email to Talya once per session.
 * Uses sessionStorage to prevent duplicate sends on re-renders / navigation.
 * Sends via /api/send-order (Resend) — no EmailJS needed.
 */
export const useTelemetry = () => {
  useEffect(() => {
    if (!flags.telemetry) return

    // Only fire once per browser session
    const key = 'sbt_visit_sent'
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')

    const now = new Date()
    const payload = {
      type: 'telemetry',
      timestamp: now.toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' }),
      page: window.location.pathname || '/',
      referrer: document.referrer || 'Direct',
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      language: navigator.language || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
      url: window.location.href,
    }

    fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => {
      // Silent fail — telemetry should never break the user experience
      console.warn('[Telemetry] Failed to send visit notification:', err)
    })
  }, [])
}
