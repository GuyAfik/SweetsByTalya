import { useState, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fillings, predefinedCombinations, pralinePrice } from '../data/pralines'
import { flags } from '../config/featureFlags'
import TabSwitcher from '../components/bulk/TabSwitcher'
import ComboGrid from '../components/bulk/ComboGrid'
import FlavorGrid from '../components/bulk/FlavorGrid'
import BulkOrderBar from '../components/bulk/BulkOrderBar'
import BulkOrderSummary from '../components/bulk/BulkOrderSummary'
import './BulkPralineOrder.css'

const { qtyPerFlavor, maxFlavors } = flags.bulkOrder
const hasCombos = predefinedCombinations.length > 0

const initialSelections = Object.fromEntries(fillings.map(f => [f.id, null]))

export default function BulkPralineOrder() {
  const { t } = useTranslation()
  const summaryRef = useRef(null)

  const [activeTab, setActiveTab] = useState(hasCombos ? 'chef' : 'custom')
  const [selectedComboId, setSelectedComboId] = useState(null)
  const [selections, setSelections] = useState(initialSelections)
  const [showSummary, setShowSummary] = useState(false)

  const selectedFlavors = useMemo(
    () => Object.entries(selections).filter(([, base]) => base !== null),
    [selections]
  )
  const selectedCount = selectedFlavors.length
  const isChefComplete = selectedComboId !== null
  const isCustomComplete = selectedCount === maxFlavors
  const isComplete = activeTab === 'chef' ? isChefComplete : isCustomComplete

  const activeSelections = useMemo(() => {
    if (activeTab === 'chef') {
      const combo = predefinedCombinations.find(c => c.id === selectedComboId)
      return combo ? combo.selections : []
    }
    return selectedFlavors.map(([id, base]) => ({ filling: id, base }))
  }, [activeTab, selectedComboId, selectedFlavors])

  const estimatedTotal = useMemo(
    () => activeSelections.reduce((sum, s) => sum + qtyPerFlavor * pralinePrice(s), 0),
    [activeSelections]
  )

  const dotCount = activeTab === 'chef'
    ? (isChefComplete ? maxFlavors : 0)
    : selectedCount

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setShowSummary(false)
  }

  const handleComboSelect = (id) => {
    setSelectedComboId(prev => prev === id ? null : id)
    setShowSummary(false)
  }

  const handleFlavorSelect = (id) => {
    if (selectedCount >= maxFlavors) return
    setSelections(prev => ({ ...prev, [id]: 'dark_70' }))
    setShowSummary(false)
  }

  const handleFlavorDeselect = (id) => {
    setSelections(prev => ({ ...prev, [id]: null }))
    setShowSummary(false)
  }

  const handleBaseChange = (fillingId, baseId) => {
    setSelections(prev => ({ ...prev, [fillingId]: baseId }))
  }

  const handleComplete = () => {
    setShowSummary(true)
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="bulk-order-page">
      <section className="bulk-order-page__header">
        <div className="container">
          <h1>{t('bulk_order.title')}</h1>
          <p className="accent-text">{t('bulk_order.subtitle')}</p>
        </div>
      </section>

      <section className="section bulk-order-page__body">
        <div className="container">

          {hasCombos && (
            <div className="bulk-order-page__tabs">
              <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}

          {activeTab === 'chef' && hasCombos && (
            <div className="bulk-order-page__section">
              <ComboGrid
                selectedComboId={selectedComboId}
                onSelect={handleComboSelect}
              />
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="bulk-order-page__section">
              <p className="bulk-order-page__hint">{t('bulk_order.choose_flavors')}</p>
              <FlavorGrid
                selections={selections}
                maxFlavors={maxFlavors}
                onSelect={handleFlavorSelect}
                onDeselect={handleFlavorDeselect}
                onChangeBase={handleBaseChange}
              />
            </div>
          )}

          {showSummary && isComplete && (
            <BulkOrderSummary
              activeSelections={activeSelections}
              summaryRef={summaryRef}
            />
          )}

        </div>
      </section>

      <BulkOrderBar
        selectedCount={dotCount}
        maxFlavors={maxFlavors}
        estimatedTotal={estimatedTotal}
        isComplete={isComplete}
        onComplete={handleComplete}
      />
    </div>
  )
}
