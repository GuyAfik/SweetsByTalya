import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { flags } from '../config/featureFlags'

/**
 * useTelemetry — fires a visit notification email to Talya once per session.
 * Uses sessionStorage to prevent duplicate sends on re-renders / navigation.
 */
export const useTelemetry = () => {
  useEffect(() => {
    if (!flags.telemetry) return

    // Only fire once per browser session
    const key = 'sbt_visit_sent'
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TELEMETRY_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.warn('[Telemetry] EmailJS env vars not configured — skipping.')
      return
    }

    const now = new Date()
    const templateParams = {
      timestamp: now.toLocaleString('en-IL', { timeZone: 'Asia/Jerusalem' }),
      page: window.location.pathname || '/',
      referrer: document.referrer || 'Direct',
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      language: navigator.language || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
      url: window.location.href,
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .catch((err) => {
        // Silent fail — telemetry should never break the user experience
        console.warn('[Telemetry] Failed to send visit notification:', err)
      })
  }, [])
}
