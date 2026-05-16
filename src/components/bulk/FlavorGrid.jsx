import { fillings } from '../../data/pralines'
import FlavorCard from './FlavorCard'
import './FlavorGrid.css'

export default function FlavorGrid({ selections, maxFlavors, onSelect, onDeselect, onChangeBase }) {
  const selectedCount = Object.values(selections).filter(v => v !== null).length

  return (
    <div className="flavor-grid">
      {fillings.map(filling => (
        <FlavorCard
          key={filling.id}
          filling={filling}
          selectedBase={selections[filling.id]}
          isLocked={selections[filling.id] === null && selectedCount >= maxFlavors}
          onSelect={onSelect}
          onDeselect={onDeselect}
          onChangeBase={onChangeBase}
        />
      ))}
    </div>
  )
}
