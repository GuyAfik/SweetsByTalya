import { useTranslation } from 'react-i18next'
import { chocolateBases, fillings } from '../../data/pralines'
import './PralineSlot.css'

export default function PralineSlot({ slot, index, isActive, onClick }) {
  const { t } = useTranslation()

  const base    = slot ? chocolateBases.find((b) => b.id === slot.base)    : null
  const filling = slot ? fillings.find((f) => f.id === slot.filling) : null

  return (
    <button
      type="button"
      className={[
        'praline-slot',
        slot    ? 'praline-slot--filled'  : 'praline-slot--empty',
        isActive ? 'praline-slot--active' : '',
      ].join(' ')}
      style={base ? { backgroundColor: base.color, color: base.textColor } : undefined}
      onClick={() => onClick(index)}
      aria-label={
        slot
          ? `${t('praline_builder.slot_label', { n: index + 1 })}: ${t(base.labelKey)} / ${t(filling.labelKey)}`
          : t('praline_builder.slot_empty')
      }
    >
      {slot ? (
        <span className="praline-slot__content">
          <span className="praline-slot__filling-emoji">{filling.emoji}</span>
          <span className="praline-slot__filling-label">{t(filling.labelKey)}</span>
        </span>
      ) : (
        <span className="praline-slot__content praline-slot__content--empty">
          <span className="praline-slot__plus">+</span>
          <span className="praline-slot__hint">{t('praline_builder.slot_empty')}</span>
        </span>
      )}
    </button>
  )
}
