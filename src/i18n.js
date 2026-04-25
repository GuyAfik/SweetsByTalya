import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

const SUPPORTED_LANGUAGES = ['en', 'he', 'pt']
const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || 'he'

const savedLanguage = localStorage.getItem('sbt_language')
const initialLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    lng: initialLanguage,
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  })

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang)
  localStorage.setItem('sbt_language', lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
}

export const getCurrentDir = () => (i18n.language === 'he' ? 'rtl' : 'ltr')

export default i18n
