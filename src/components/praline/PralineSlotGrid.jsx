import PralineSlot from './PralineSlot'
import './PralineSlotGrid.css'

export default function PralineSlotGrid({ slots, boxSize, activeSlot, onSlotClick }) {
  // Always 4 columns: 8-piece = 2 rows × 4 cols, 16-piece = 4 rows × 4 cols
  return (
    <div
      className="praline-slot-grid"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
      aria-label={`Praline box — ${boxSize} slots`}
    >
      {slots.map((slot, index) => (
        <PralineSlot
          key={index}
          slot={slot}
          index={index}
          isActive={activeSlot === index}
          onClick={onSlotClick}
        />
      ))}
    </div>
  )
}
