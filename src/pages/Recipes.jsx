import { useTranslation } from 'react-i18next'
import './Recipes.css'

export default function Recipes() {
  const { t } = useTranslation()
  return (
    <div className="recipes-page">
      <section className="recipes-hero">
        <div className="container recipes-hero__content">
          <span className="recipes-hero__icon">📖</span>
          <h1 className="recipes-hero__title">{t('recipes.page_title')}</h1>
          <p className="recipes-hero__subtitle">{t('recipes.page_subtitle')}</p>
        </div>
      </section>

      <section className="section recipes-empty">
        <div className="container recipes-empty__inner">
          <span className="recipes-empty__icon">🍫</span>
          <p className="recipes-empty__text">{t('recipes.coming_soon')}</p>
        </div>
      </section>
    </div>
  )
}
