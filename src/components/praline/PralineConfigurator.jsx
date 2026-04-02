import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { chocolateBases, fillings } from '../../data/pralines'
import './PralineConfigurator.css'

export default function PralineConfigurator({ slotIndex, existingSlot, onConfirm, onClose }) {
  const { t } = useTranslation()
  const [step, setStep] = useState('base')           // 'base' | 'filling'
  const [selectedBase, setSelectedBase] = useState(existingSlot?.base || null)
  const [selectedFilling, setSelectedFilling] = useState(existingSlot?.filling || null)

  // Reset when a new slot is opened
  useEffect(() => {
    setStep(existingSlot?.base ? 'filling' : 'base')
    setSelectedBase(existingSlot?.base || null)
    setSelectedFilling(existingSlot?.filling || null)
  }, [slotIndex, existingSlot])

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleBaseSelect = (baseId) => {
    setSelectedBase(baseId)
    setSelectedFilling(null)
    setStep('filling')
  }

  const handleFillingSelect = (fillingId) => {
    setSelectedFilling(fillingId)
  }

  const handleConfirm = () => {
    if (selectedBase && selectedFilling) {
      onConfirm(slotIndex, { base: selectedBase, filling: selectedFilling })
    }
  }

  const baseObj    = selectedBase    ? chocolateBases.find((b) => b.id === selectedBase)    : null
  const fillingObj = selectedFilling ? fillings.find((f) => f.id === selectedFilling) : null

  return (
    <>
      {/* Backdrop */}
      <div className="configurator-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="configurator" role="dialog" aria-modal="true"
        aria-label={t('praline_builder.configure_title', { n: slotIndex + 1 })}>

        {/* Header */}
        <div className="configurator__header">
          {step === 'filling' && (
            <button
              type="button"
              className="configurator__back"
              onClick={() => setStep('base')}
              aria-label={t('praline_builder.back')}
            >
              ← {t('praline_builder.back')}
            </button>
          )}
          <h3 className="configurator__title">
            {t('praline_builder.configure_title', { n: slotIndex + 1 })}
          </h3>
          <button type="button" className="configurator__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="configurator__step-label">
          {step === 'base' ? (
            <span>{t('praline_builder.step_base')}</span>
          ) : (
            <span>
              <span
                className="configurator__base-badge"
                style={{ background: baseObj?.color, color: baseObj?.textColor }}
              >
                {t(baseObj?.labelKey)}
              </span>
              {' · '}
              {t('praline_builder.step_filling')}
            </span>
          )}
        </div>

        {/* Step 1 — Base selection */}
        {step === 'base' && (
          <div className="configurator__grid configurator__grid--bases">
            {chocolateBases.map((base) => (
              <button
                key={base.id}
                type="button"
                className={`configurator__option${selectedBase === base.id ? ' configurator__option--selected' : ''}`}
                style={{ '--swatch': base.color, '--swatch-text': base.textColor }}
                onClick={() => handleBaseSelect(base.id)}
              >
                <span className="configurator__swatch" style={{ background: base.color }} />
                <span className="configurator__option-label">{t(base.labelKey)}</span>
                <span className="configurator__option-price">+₪{base.price}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Filling selection */}
        {step === 'filling' && (
          <div className="configurator__grid configurator__grid--fillings">
            {fillings.map((filling) => (
              <button
                key={filling.id}
                type="button"
                className={`configurator__option${selectedFilling === filling.id ? ' configurator__option--selected' : ''}`}
                onClick={() => handleFillingSelect(filling.id)}
              >
                <span className="configurator__filling-dot" style={{ background: filling.color }} />
                <span className="configurator__filling-emoji">{filling.emoji}</span>
                <span className="configurator__option-label">{t(filling.labelKey)}</span>
                <span className="configurator__option-price">+₪{filling.price}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer — confirm button (only on filling step) */}
        {step === 'filling' && (
          <div className="configurator__footer">
            {selectedBase && selectedFilling && (
              <div className="configurator__total-preview">
                {t(baseObj.labelKey)} + {t(fillingObj.labelKey)} ={' '}
                <strong>₪{baseObj.price + fillingObj.price}</strong>
              </div>
            )}
            <button
              type="button"
              className="btn btn-caramel configurator__confirm"
              disabled={!selectedBase || !selectedFilling}
              onClick={handleConfirm}
            >
              {t('praline_builder.confirm_slot')} ✓
            </button>
          </div>
        )}
      </div>
    </>
  )
}
