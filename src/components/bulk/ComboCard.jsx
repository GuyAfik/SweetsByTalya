import { useTranslation } from 'react-i18next'
import { fillings, chocolateBases, pralinePrice } from '../../data/pralines'
import { flags } from '../../config/featureFlags'
import './ComboCard.css'

export default function ComboCard({ combo, isSelected, onSelect }) {
  const { t } = useTranslation()
  const qtyPerFlavor = flags.bulkOrder.qtyPerFlavor

  const estimatedTotal = combo.selections.reduce((sum, s) => {
    return sum + qtyPerFlavor * pralinePrice(s)
  }, 0)

  return (
    <div
      className={['combo-card', isSelected ? 'combo-card--selected' : ''].filter(Boolean).join(' ')}
      onClick={() => onSelect(combo.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(combo.id) } }}
    >
      {isSelected && <div className="combo-card__check">✓</div>}

      <div className="combo-card__emoji">{combo.emoji}</div>
      <div className="combo-card__name">{t(combo.nameKey)}</div>
      <div className="combo-card__desc">{t(combo.descKey)}</div>

      <ul className="combo-card__flavors">
        {combo.selections.map(s => {
          const filling = fillings.find(f => f.id === s.filling)
          const base = chocolateBases.find(b => b.id === s.base)
          return (
            <li key={s.filling} className="combo-card__flavor-line">
              <span className="combo-card__flavor-emoji">{filling?.emoji}</span>
              <span className="combo-card__flavor-name">{t(filling?.labelKey)}</span>
              <span className="combo-card__flavor-base">· {t(base?.labelKey)}</span>
            </li>
          )
        })}
      </ul>

      <div className="combo-card__footer">
        <span className="combo-card__total">₪{estimatedTotal}</span>
        <button
          type="button"
          className={['combo-card__btn', isSelected ? 'combo-card__btn--selected' : ''].filter(Boolean).join(' ')}
          onClick={e => { e.stopPropagation(); onSelect(combo.id) }}
        >
          {isSelected ? t('bulk_order.selected_check') : t('bulk_order.select_this_box')}
        </button>
      </div>
    </div>
  )
}
