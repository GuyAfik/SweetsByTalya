import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { boxTotal } from '../data/pralines'
import BoxSizeSelector from '../components/praline/BoxSizeSelector'
import PralineSlotGrid from '../components/praline/PralineSlotGrid'
import PralineConfigurator from '../components/praline/PralineConfigurator'
import BuilderProgressBar from '../components/praline/BuilderProgressBar'
import BoxSummary from '../components/praline/BoxSummary'
import './PralineBuilder.css'

export default function PralineBuilder() {
  const { t } = useTranslation()

  // ── Core state ──────────────────────────────────────────────────────────────
  const [boxSize, setBoxSize]       = useState(null)   // 8 | 16
  const [slots, setSlots]           = useState([])     // Array<null | { base, filling }>
  const [activeSlot, setActiveSlot] = useState(null)   // index | null
  const [showSummary, setShowSummary] = useState(false)

  // ── Derived values ──────────────────────────────────────────────────────────
  const filledCount   = useMemo(() => slots.filter(Boolean).length, [slots])
  const runningTotal  = useMemo(() => boxTotal(slots), [slots])
  const isBoxComplete = boxSize !== null && filledCount === boxSize

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSizeSelect = (size) => {
    setBoxSize(size)
    setSlots(Array(size).fill(null))
    setActiveSlot(null)
    setShowSummary(false)
  }

  const handleSlotClick = (index) => {
    setActiveSlot(index)
  }

  const handleConfiguratorConfirm = (index, config) => {
    setSlots((prev) => {
      const next = [...prev]
      next[index] = config
      return next
    })
    setActiveSlot(null)
  }

  const handleConfiguratorClose = () => {
    setActiveSlot(null)
  }

  const handleOrderBox = () => {
    setShowSummary(true)
  }

  const handleEditBox = () => {
    setShowSummary(false)
  }

  const handleReset = () => {
    setBoxSize(null)
    setSlots([])
    setActiveSlot(null)
    setShowSummary(false)
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="praline-builder-page">
      {/* Page header */}
      <section className="praline-builder-page__header">
        <div className="container">
          <h1>{t('praline_builder.title')}</h1>
          <p className="accent-text">{t('praline_builder.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ── Phase 1: Choose box size ─────────────────────────────────── */}
          {boxSize === null && (
            <BoxSizeSelector onSelect={handleSizeSelect} />
          )}

          {/* ── Phase 2: Build the box ───────────────────────────────────── */}
          {boxSize !== null && !showSummary && (
            <div className="praline-builder-page__builder">

              {/* Progress bar */}
              <BuilderProgressBar
                filled={filledCount}
                total={boxSize}
                runningTotal={runningTotal}
              />

              {/* Slot grid */}
              <PralineSlotGrid
                slots={slots}
                boxSize={boxSize}
                activeSlot={activeSlot}
                onSlotClick={handleSlotClick}
              />

              {/* Action buttons */}
              <div className="praline-builder-page__actions">
                <button
                  type="button"
                  className="btn btn-outline praline-builder-page__reset"
                  onClick={handleReset}
                >
                  ↩ {t('praline_builder.choose_size')}
                </button>

                {isBoxComplete && (
                  <button
                    type="button"
                    className="btn btn-caramel btn-lg"
                    onClick={handleOrderBox}
                  >
                    🍫 {t('praline_builder.order_box')}
                  </button>
                )}
              </div>

              {/* Configurator panel (portal-like, rendered in-place) */}
              {activeSlot !== null && (
                <PralineConfigurator
                  slotIndex={activeSlot}
                  existingSlot={slots[activeSlot]}
                  onConfirm={handleConfiguratorConfirm}
                  onClose={handleConfiguratorClose}
                />
              )}
            </div>
          )}

          {/* ── Phase 3: Summary + order form ───────────────────────────── */}
          {boxSize !== null && showSummary && (
            <BoxSummary
              slots={slots}
              boxSize={boxSize}
              onEditBox={handleEditBox}
            />
          )}

        </div>
      </section>
    </div>
  )
}
