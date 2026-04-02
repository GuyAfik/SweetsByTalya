import { useTranslation } from 'react-i18next'
import './BuilderProgressBar.css'

export default function BuilderProgressBar({ filled, total, runningTotal }) {
  const { t } = useTranslation()
  const pct = total > 0 ? Math.round((filled / total) * 100) : 0
  const isComplete = filled === total && total > 0

  return (
    <div className={`builder-progress${isComplete ? ' builder-progress--complete' : ''}`}>
      <div className="builder-progress__label">
        {isComplete ? (
          <span>
            {t('praline_builder.progress_complete')}{' '}
            <strong>· ₪{runningTotal}</strong>
          </span>
        ) : (
          <span>
            {t('praline_builder.progress_label', { filled, total })}
            {runningTotal > 0 && (
              <strong> · ₪{runningTotal}</strong>
            )}
          </span>
        )}
        <span className="builder-progress__pct">{pct}%</span>
      </div>
      <div className="builder-progress__track">
        <div
          className="builder-progress__fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
