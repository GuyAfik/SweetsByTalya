import { useTranslation } from 'react-i18next'
import './BoxSizeSelector.css'

const BOX_SIZES = [
  {
    size: 8,
    grid: [2, 4], // rows × cols
    labelKey: 'praline_builder.size_8',
    descKey: 'praline_builder.size_8_desc',
    emoji: '🎁',
  },
  {
    size: 16,
    grid: [4, 4],
    labelKey: 'praline_builder.size_16',
    descKey: 'praline_builder.size_16_desc',
    emoji: '🎀',
  },
]

function MiniGrid({ rows, cols }) {
  const cells = rows * cols
  return (
    <div
      className="box-size-selector__mini-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: cells }).map((_, i) => (
        <div key={i} className="box-size-selector__mini-cell" />
      ))}
    </div>
  )
}

export default function BoxSizeSelector({ onSelect }) {
  const { t } = useTranslation()

  return (
    <div className="box-size-selector">
      <h2 className="box-size-selector__heading">{t('praline_builder.choose_size')}</h2>
      <div className="box-size-selector__cards">
        {BOX_SIZES.map(({ size, grid, labelKey, descKey, emoji }) => (
          <button
            key={size}
            className="box-size-selector__card"
            onClick={() => onSelect(size)}
            type="button"
          >
            <span className="box-size-selector__emoji">{emoji}</span>
            <MiniGrid rows={grid[0]} cols={grid[1]} />
            <strong className="box-size-selector__label">{t(labelKey)}</strong>
            <p className="box-size-selector__desc">{t(descKey)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
