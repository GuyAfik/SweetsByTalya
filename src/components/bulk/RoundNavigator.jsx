import { useTranslation } from 'react-i18next'
import './RoundNavigator.css'

export default function RoundNavigator({ activeRound, totalRounds, roundsComplete, onPrev, onNext }) {
  const { t } = useTranslation()
  const isCurrentComplete = roundsComplete[activeRound]
  const canGoNext = activeRound < totalRounds - 1
  const canGoPrev = activeRound > 0

  return (
    <div className="round-navigator">
      <div className="round-navigator__dots">
        {Array.from({ length: totalRounds }).map((_, i) => (
          <span
            key={i}
            className={[
              'round-navigator__dot',
              i === activeRound ? 'round-navigator__dot--active' : '',
              roundsComplete[i] ? 'round-navigator__dot--done' : '',
            ].filter(Boolean).join(' ')}
            aria-label={roundsComplete[i]
              ? t('bulk_order.round_complete', { n: i + 1 })
              : t('bulk_order.round_incomplete', { n: i + 1 })}
          >
            {roundsComplete[i] ? '✓' : i + 1}
          </span>
        ))}
      </div>

      <h3 className="round-navigator__label">
        {t('bulk_order.round_label', { current: activeRound + 1, total: totalRounds })}
      </h3>

      <div className="round-navigator__controls">
        <button
          type="button"
          className="round-navigator__btn round-navigator__btn--prev"
          onClick={onPrev}
          disabled={!canGoPrev}
        >
          {t('bulk_order.round_prev')}
        </button>

        <button
          type="button"
          className={['round-navigator__btn round-navigator__btn--next', isCurrentComplete ? 'round-navigator__btn--ready' : ''].filter(Boolean).join(' ')}
          onClick={onNext}
          disabled={!canGoNext || !isCurrentComplete}
        >
          {t('bulk_order.round_next')}
        </button>
      </div>
    </div>
  )
}
