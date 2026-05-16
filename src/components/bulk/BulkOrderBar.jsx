import { useTranslation } from 'react-i18next'
import './BulkOrderBar.css'

export default function BulkOrderBar({ selectedCount, maxFlavors, estimatedTotal, isComplete, onComplete }) {
  const { t } = useTranslation()

  return (
    <div className="bulk-order-bar">
      <div className="bulk-order-bar__dots">
        {Array.from({ length: maxFlavors }).map((_, i) => (
          <span
            key={i}
            className={['bulk-order-bar__dot', i < selectedCount ? 'bulk-order-bar__dot--filled' : ''].filter(Boolean).join(' ')}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="bulk-order-bar__info">
        <span className={['bulk-order-bar__count', isComplete ? 'bulk-order-bar__count--complete' : ''].filter(Boolean).join(' ')}>
          {isComplete
            ? '✓ ' + t('bulk_order.selected_check')
            : t('bulk_order.selected_count', { count: selectedCount, max: maxFlavors })}
        </span>
        {estimatedTotal > 0 && (
          <span className="bulk-order-bar__price">
            {t('bulk_order.summary_total', { qty: maxFlavors * 20, price: estimatedTotal })}
          </span>
        )}
      </div>

      <button
        type="button"
        className="bulk-order-bar__cta"
        disabled={!isComplete}
        onClick={onComplete}
      >
        {t('bulk_order.complete_order')} →
      </button>
    </div>
  )
}
