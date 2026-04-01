import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getMenuSummaryForAI } from '../../data/menu'
import { getWhatsAppOrderLink } from '../../config/social'
import './ChatWidget.css'

const MAX_HISTORY = 20 // keep last 20 messages in context

export default function ChatWidget() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chatbot.greeting') }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const currentLang = i18n.language?.split('-')[0] || 'en'

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg].slice(-MAX_HISTORY)

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          language: currentLang,
          menuSummary: getMenuSummaryForAI(),
        }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      // Handle order invite tool call
      if (data.type === 'order_invite' && data.orderData) {
        const { customer_name, product, quantity, contact, notes } = data.orderData
        const msgParts = [
          `🍫 *Order from ${customer_name || 'Website visitor'}*`,
          product ? `*Product:* ${product}` : '',
          quantity ? `*Quantity:* ${quantity}` : '',
          contact ? `*Contact:* ${contact}` : '',
          notes ? `*Notes:* ${notes}` : '',
        ].filter(Boolean).join('\n')

        const waUrl = getWhatsAppOrderLink(msgParts)

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message?.content || t('chatbot.greeting'),
            orderLink: waUrl,
          },
        ])
      } else if (data.message?.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message.content }])
      } else {
        throw new Error('Empty response')
      }
    } catch (err) {
      console.error('[ChatWidget]', err)
      setError(t('chatbot.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
        title={open ? t('chatbot.close') : t('chatbot.open')}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!open && <span className="chat-fab__pulse" />}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`} role="dialog" aria-label={t('chatbot.title')}>
        {/* Header */}
        <div className="chat-panel__header">
          <div className="chat-panel__header-info">
            <span className="chat-panel__avatar">🍫</span>
            <div>
              <p className="chat-panel__title">{t('chatbot.title')}</p>
              <p className="chat-panel__status">● Online</p>
            </div>
          </div>
          <button
            className="chat-panel__close"
            onClick={() => setOpen(false)}
            aria-label={t('chatbot.close')}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chat-panel__messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg chat-msg--${msg.role}`}
            >
              {msg.role === 'assistant' && (
                <span className="chat-msg__avatar">🍫</span>
              )}
              <div className="chat-msg__bubble">
                <p>{msg.content}</p>
                {msg.orderLink && (
                  <a
                    href={msg.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm chat-msg__order-btn"
                  >
                    💬 Send Order via WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg chat-msg--assistant">
              <span className="chat-msg__avatar">🍫</span>
              <div className="chat-msg__bubble chat-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {error && (
            <div className="chat-error">{error}</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-panel__input-area">
          <textarea
            ref={inputRef}
            className="chat-panel__input"
            placeholder={t('chatbot.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-panel__send"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label={t('chatbot.send')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="chat-panel__footer">
          <span>{t('chatbot.powered_by')}</span>
          <span>✨ GPT-4o mini</span>
        </div>
      </div>
    </>
  )
}
