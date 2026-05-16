import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import BulkOrderSummary from './BulkOrderSummary'
import './BulkOrderModal.css'

export default function BulkOrderModal({ activeSelections, sets, onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="bulk-modal" role="dialog" aria-modal="true">
      <div className="bulk-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="bulk-modal__sheet">
        <div className="bulk-modal__header">
          <button
            type="button"
            className="bulk-modal__close"
            onClick={onClose}
            aria-label={t('bulk_order.edit_order')}
          >
            ✕
          </button>
          <span className="bulk-modal__handle" aria-hidden="true" />
        </div>
        <div className="bulk-modal__body">
          <BulkOrderSummary activeSelections={activeSelections} sets={sets} />
        </div>
      </div>
    </div>
  )
}
