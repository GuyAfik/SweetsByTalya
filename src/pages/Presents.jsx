import { useTranslation } from 'react-i18next'
import './Presents.css'

export default function Presents() {
  const { t } = useTranslation()
  return (
    <div className="presents-page">
      <section className="presents-hero">
        <div className="container presents-hero__content">
          <span className="presents-hero__icon">🎁</span>
          <h1 className="presents-hero__title">{t('presents.page_title')}</h1>
          <p className="presents-hero__subtitle">{t('presents.page_subtitle')}</p>
        </div>
      </section>
    </div>
  )
}
