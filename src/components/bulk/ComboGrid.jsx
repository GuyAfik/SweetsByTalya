import { predefinedCombinations } from '../../data/pralines'
import ComboCard from './ComboCard'
import './ComboGrid.css'

export default function ComboGrid({ selectedComboId, onSelect }) {
  return (
    <div className="combo-grid">
      {predefinedCombinations.map(combo => (
        <ComboCard
          key={combo.id}
          combo={combo}
          isSelected={selectedComboId === combo.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
