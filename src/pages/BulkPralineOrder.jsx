import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { fillings, predefinedCombinations, pralinePrice } from '../data/pralines'
import { flags } from '../config/featureFlags'
import TabSwitcher from '../components/bulk/TabSwitcher'
import ComboGrid from '../components/bulk/ComboGrid'
import FlavorGrid from '../components/bulk/FlavorGrid'
import BulkOrderBar from '../components/bulk/BulkOrderBar'
import BulkOrderModal from '../components/bulk/BulkOrderModal'
import QuantitySelector from '../components/bulk/QuantitySelector'
import RoundNavigator from '../components/bulk/RoundNavigator'
import './BulkPralineOrder.css'

const { qtyPerFlavor, maxFlavors } = flags.bulkOrder
const hasCombos = predefinedCombinations.length > 0

const emptySelections = () => Object.fromEntries(fillings.map(f => [f.id, null]))
const makeRounds = (n) => Array.from({ length: n }, () => ({ selections: emptySelections() }))
const makeComboRounds = (n) => Array(n).fill(null)

function isRoundComplete(round) {
  return Object.values(round.selections).filter(v => v !== null).length === maxFlavors
}

export default function BulkPralineOrder() {
  const { t } = useTranslation()

  const [sets, setSets] = useState(1)
  const [activeTab, setActiveTab] = useState(hasCombos ? 'chef' : 'custom')
  const [activeRound, setActiveRound] = useState(0)

  const [customRounds, setCustomRounds] = useState(makeRounds(1))
  const [comboRounds, setComboRounds] = useState(makeComboRounds(1))

  const [showSummary, setShowSummary] = useState(false)

  const currentCustomRound = customRounds[activeRound] ?? { selections: emptySelections() }
  const currentComboId = comboRounds[activeRound] ?? null

  const customRoundsComplete = useMemo(() => customRounds.map(isRoundComplete), [customRounds])
  const comboRoundsComplete = useMemo(() => comboRounds.map(id => id !== null), [comboRounds])

  const roundsComplete = activeTab === 'chef' ? comboRoundsComplete : customRoundsComplete
  const allComplete = roundsComplete.every(Boolean)
  const completedCount = roundsComplete.filter(Boolean).length

  const activeSelections = useMemo(() => {
    if (activeTab === 'chef') {
      return comboRounds.flatMap(id => {
        const combo = predefinedCombinations.find(c => c.id === id)
        return combo ? combo.selections : []
      })
    }
    return customRounds.flatMap(round =>
      Object.entries(round.selections)
        .filter(([, base]) => base !== null)
        .map(([id, base]) => ({ filling: id, base }))
    )
  }, [activeTab, comboRounds, customRounds])

  const estimatedTotal = useMemo(
    () => activeSelections.reduce((sum, s) => sum + qtyPerFlavor * pralinePrice(s), 0),
    [activeSelections]
  )

  const totalPralines = sets * maxFlavors * qtyPerFlavor

  const handleSetsChange = (n) => {
    setSets(n)
    setActiveRound(0)
    setCustomRounds(makeRounds(n))
    setComboRounds(makeComboRounds(n))
    setShowSummary(false)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setActiveRound(0)
    setShowSummary(false)
  }

  const handleComboSelect = (id) => {
    setComboRounds(prev => {
      const next = [...prev]
      next[activeRound] = next[activeRound] === id ? null : id
      return next
    })
    setShowSummary(false)
  }

  const handleFlavorSelect = (id) => {
    const count = Object.values(currentCustomRound.selections).filter(v => v !== null).length
    if (count >= maxFlavors) return
    setCustomRounds(prev => {
      const next = prev.map((r, i) => i === activeRound
        ? { selections: { ...r.selections, [id]: 'dark_70' } }
        : r)
      return next
    })
    setShowSummary(false)
  }

  const handleFlavorDeselect = (id) => {
    setCustomRounds(prev => prev.map((r, i) => i === activeRound
      ? { selections: { ...r.selections, [id]: null } }
      : r))
    setShowSummary(false)
  }

  const handleBaseChange = (fillingId, baseId) => {
    setCustomRounds(prev => prev.map((r, i) => i === activeRound
      ? { selections: { ...r.selections, [fillingId]: baseId } }
      : r))
  }

  const handleComplete = () => setShowSummary(true)
  const handleCloseModal = () => setShowSummary(false)

  const selectedCount = Object.values(currentCustomRound.selections).filter(v => v !== null).length
  const dotCount = activeTab === 'chef'
    ? (currentComboId !== null ? maxFlavors : 0)
    : selectedCount

  return (
    <div className="bulk-order-page">
      <section className="bulk-order-page__header">
        <div className="container">
          <h1>{t('bulk_order.title')}</h1>
          <p className="accent-text">{t('bulk_order.subtitle')}</p>
          <p className="bulk-order-page__service-desc">{t('bulk_order.service_desc')}</p>
        </div>
      </section>

      <section className="bulk-order-page__ad-banner">
        <div className="container">
          <img
            src="/images/bulk-order-ad.jpeg"
            alt="Chocolate Jewelleries for Events"
            className="bulk-order-page__ad-image"
          />
        </div>
      </section>

      <section className="section bulk-order-page__body">
        <div className="container">

          <QuantitySelector sets={sets} onSetsChange={handleSetsChange} />

          {hasCombos && (
            <div className="bulk-order-page__tabs">
              <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}

          {sets > 1 && (
            <RoundNavigator
              activeRound={activeRound}
              totalRounds={sets}
              roundsComplete={roundsComplete}
              onPrev={() => setActiveRound(r => Math.max(0, r - 1))}
              onNext={() => setActiveRound(r => Math.min(sets - 1, r + 1))}
            />
          )}

          {activeTab === 'chef' && hasCombos && (
            <div className="bulk-order-page__section">
              <ComboGrid
                selectedComboId={currentComboId}
                onSelect={handleComboSelect}
              />
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="bulk-order-page__section">
              <p className="bulk-order-page__hint">{t('bulk_order.choose_flavors')}</p>
              <FlavorGrid
                selections={currentCustomRound.selections}
                maxFlavors={maxFlavors}
                onSelect={handleFlavorSelect}
                onDeselect={handleFlavorDeselect}
                onChangeBase={handleBaseChange}
              />
            </div>
          )}

        </div>
      </section>

      <BulkOrderBar
        selectedCount={dotCount}
        maxFlavors={maxFlavors}
        estimatedTotal={estimatedTotal}
        totalPralines={totalPralines}
        sets={sets}
        completedCount={completedCount}
        isComplete={allComplete}
        onComplete={handleComplete}
      />

      {showSummary && allComplete && (
        <BulkOrderModal
          activeSelections={activeSelections}
          sets={sets}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
