import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './PaymentSelector.css'

const BIT_PHONE    = import.meta.env.VITE_BIT_PHONE
const PAYBOX_PHONE = import.meta.env.VITE_PAYBOX_PHONE

function getBitUrl(amount) {
  const phone = BIT_PHONE?.replace(/\D/g, '')
  if (!phone) return null
  return `https://www.bitpay.co.il/app/pay?phone=${phone}&sum=${amount}`
}

function getPayboxUrl(amount) {
  const phone = PAYBOX_PHONE?.replace(/\D/g, '')
  if (!phone) return null
  return `https://payboxapp.page.link/?phone=${phone}&sum=${amount}`
}

async function requestGoogleApplePay(amount, label, method) {
  if (!window.PaymentRequest) return false
  const methodData = [{ supportedMethods: method }]
  const details = {
    total: { label, amount: { currency: 'ILS', value: String(amount) } },
  }
  try {
    const request = new PaymentRequest(methodData, details)
    const canPay = await request.canMakePayment()
    if (!canPay) return false
    await request.show()
    return true
  } catch {
    return false
  }
}

export default function PaymentSelector({ amount, label = 'Sweets by Talya', onPaymentChosen }) {
  const { t } = useTranslation()
  const [paying, setPaying] = useState(null)

  const bitUrl    = getBitUrl(amount)
  const payboxUrl = getPayboxUrl(amount)

  const handleDeepLink = (method, url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    if (onPaymentChosen) onPaymentChosen(method)
  }

  const handleWebPay = async (method, paymentMethod) => {
    setPaying(method)
    const success = await requestGoogleApplePay(amount, label, paymentMethod)
    setPaying(null)
    if (success && onPaymentChosen) onPaymentChosen(method)
  }

  return (
    <div className="payment-selector">
      <h3 className="payment-selector__title">{t('payment.title')}</h3>
      <p className="payment-selector__subtitle">{t('payment.subtitle', { amount })}</p>

      <div className="payment-selector__options">
        {bitUrl && (
          <button
            type="button"
            className="payment-selector__btn payment-selector__btn--bit"
            onClick={() => handleDeepLink('bit', bitUrl)}
          >
            <span className="payment-selector__btn-logo">bit</span>
            <span className="payment-selector__btn-label">{t('payment.pay_with_bit')}</span>
            <span className="payment-selector__btn-amount">₪{amount}</span>
          </button>
        )}

        {payboxUrl && (
          <button
            type="button"
            className="payment-selector__btn payment-selector__btn--paybox"
            onClick={() => handleDeepLink('paybox', payboxUrl)}
          >
            <span className="payment-selector__btn-logo">Paybox</span>
            <span className="payment-selector__btn-label">{t('payment.pay_with_paybox')}</span>
            <span className="payment-selector__btn-amount">₪{amount}</span>
          </button>
        )}

        <button
          type="button"
          className="payment-selector__btn payment-selector__btn--gpay"
          disabled={paying === 'gpay'}
          onClick={() => handleWebPay('gpay', 'https://google.com/pay')}
        >
          <span className="payment-selector__btn-logo payment-selector__btn-logo--gpay">G Pay</span>
          <span className="payment-selector__btn-label">{t('payment.pay_with_gpay')}</span>
          <span className="payment-selector__btn-amount">₪{amount}</span>
        </button>

        <button
          type="button"
          className="payment-selector__btn payment-selector__btn--applepay"
          disabled={paying === 'applepay'}
          onClick={() => handleWebPay('applepay', 'https://apple.com/apple-pay')}
        >
          <span className="payment-selector__btn-logo"> Pay</span>
          <span className="payment-selector__btn-label">{t('payment.pay_with_applepay')}</span>
          <span className="payment-selector__btn-amount">₪{amount}</span>
        </button>
      </div>

      <p className="payment-selector__note">{t('payment.note')}</p>
    </div>
  )
}
