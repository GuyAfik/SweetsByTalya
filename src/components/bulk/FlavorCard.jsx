import { useTranslation } from 'react-i18next'
import { chocolateBases, PRALINE_FLAT_PRICE } from '../../data/pralines'
import './FlavorCard.css'

export default function FlavorCard({ filling, selectedBase, isLocked, onSelect, onDeselect, onChangeBase }) {
  const { t } = useTranslation()
  const isSelected = selectedBase !== null

  const handleCardClick = () => {
    if (isLocked) return
    if (isSelected) {
      onDeselect(filling.id)
    } else {
      onSelect(filling.id)
    }
  }

  const handleBaseClick = (e, baseId) => {
    e.stopPropagation()
    onChangeBase(filling.id, baseId)
  }

  const selectedBaseObj = isSelected ? chocolateBases.find(b => b.id === selectedBase) : null
  const pricePerPraline = PRALINE_FLAT_PRICE

  return (
    <div
      className={[
        'flavor-card',
        isSelected ? 'flavor-card--selected' : '',
        isLocked  ? 'flavor-card--locked'   : '',
      ].filter(Boolean).join(' ')}
      style={isSelected ? { '--flavor-color': filling.color } : undefined}
      onClick={handleCardClick}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isLocked}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick() } }}
    >
      <div className="flavor-card__emoji">{filling.emoji}</div>
      <div className="flavor-card__name">{t(filling.labelKey)}</div>

      {!isSelected && !isLocked && (
        <div className="flavor-card__price">{t('bulk_order.per_praline', { price: pricePerPraline })}</div>
      )}

      {isLocked && (
        <div className="flavor-card__locked-label">{t('bulk_order.max_reached')}</div>
      )}

      {isSelected && (
        <>
          <div className="flavor-card__qty">{t('bulk_order.qty_label')}</div>

          <div className="flavor-card__bases" onClick={e => e.stopPropagation()}>
            {chocolateBases.map(base => (
              <button
                key={base.id}
                type="button"
                className={['flavor-card__base-chip', selectedBase === base.id ? 'flavor-card__base-chip--active' : ''].filter(Boolean).join(' ')}
                style={{ background: base.color, borderColor: base.color }}
                title={t(base.labelKey)}
                aria-label={t(base.labelKey)}
                aria-pressed={selectedBase === base.id}
                onClick={e => handleBaseClick(e, base.id)}
              />
            ))}
          </div>

          <div className="flavor-card__base-name">{t(selectedBaseObj?.labelKey)}</div>

          <div className="flavor-card__subtotal">
            {t('bulk_order.subtotal', {
              price: PRALINE_FLAT_PRICE,
              subtotal: 20 * PRALINE_FLAT_PRICE,
            })}
          </div>

          <button
            type="button"
            className="flavor-card__remove"
            onClick={e => { e.stopPropagation(); onDeselect(filling.id) }}
            aria-label={t('bulk_order.remove')}
          >
            {t('bulk_order.remove')}
          </button>
        </>
      )}

      {!isSelected && !isLocked && (
        <button
          type="button"
          className="flavor-card__select"
          onClick={e => { e.stopPropagation(); onSelect(filling.id) }}
          aria-label={t('bulk_order.select')}
        >
          + {t('bulk_order.select')}
        </button>
      )}
    </div>
  )
}
