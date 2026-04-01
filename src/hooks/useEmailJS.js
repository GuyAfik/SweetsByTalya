import { useState } from 'react'
import emailjs from '@emailjs/browser'

/**
 * useEmailJS — reusable hook for sending emails via EmailJS.
 * Returns { send, loading, success, error, reset }
 */
export const useEmailJS = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const send = async (templateId, templateParams) => {
    if (!serviceId || !publicKey) {
      setError('Email service not configured.')
      return false
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setSuccess(true)
      return true
    } catch (err) {
      console.error('[EmailJS] Send failed:', err)
      setError(err?.text || 'Failed to send email. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSuccess(false)
    setError(null)
    setLoading(false)
  }

  return { send, loading, success, error, reset }
}
