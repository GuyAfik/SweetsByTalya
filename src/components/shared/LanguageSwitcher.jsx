import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../../i18n'
import './LanguageSwitcher.css'

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'he', label: 'HE', flag: '🇮🇱' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'he'

  const handleChange = (code) => {
    changeLanguage(code)
  }

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          className={`lang-switcher__btn${currentLang === code ? ' lang-switcher__btn--active' : ''}`}
          onClick={() => handleChange(code)}
          aria-pressed={currentLang === code}
          title={`Switch to ${label}`}
        >
          <span className="lang-switcher__flag">{flag}</span>
          <span className="lang-switcher__label">{label}</span>
        </button>
      ))}
    </div>
  )
}
