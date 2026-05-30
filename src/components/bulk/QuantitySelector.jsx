import { useTranslation } from 'react-i18next'
import { getTartletBonus } from '../../data/pralines'
import './QuantitySelector.css'

const SET_OPTIONS = [1, 2, 3, 4, 5]
const PRALINES_PER_SET = 100

export default function QuantitySelector({ sets, onSetsChange }) {
  const { t } = useTranslation()

  return (
    <div className="quantity-selector">
      <div className="quantity-selector__header">
        <h2 className="quantity-selector__title">{t('bulk_order.sets_title')}</h2>
        <p className="quantity-selector__hint">{t('bulk_order.sets_hint')}</p>
      </div>
      <div className="quantity-selector__options">
        {SET_OPTIONS.map(n => {
          const totalPralines = n * PRALINES_PER_SET
          const tartlets = getTartletBonus(totalPralines)
          return (
            <button
              key={n}
              type="button"
              className={['quantity-selector__option', sets === n ? 'quantity-selector__option--active' : ''].filter(Boolean).join(' ')}
              onClick={() => onSetsChange(n)}
              aria-pressed={sets === n}
            >
              <span className="quantity-selector__option-qty">{totalPralines}</span>
              <span className="quantity-selector__option-label">
                {n === 1
                  ? t('bulk_order.sets_label', { sets: n, total: totalPralines })
                  : t('bulk_order.sets_label_plural', { sets: n, total: totalPralines })}
              </span>
              <span className="quantity-selector__option-tartlets">
                {t('bulk_order.tartlets_bonus', { count: tartlets })}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
