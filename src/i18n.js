import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

const SUPPORTED_LANGUAGES = ['en', 'he', 'pt']
const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || 'en'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Order of detection strategies
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache the detected language in localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'sbt_language',
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: true,
    },
  })

/**
 * Switch language and update document direction for RTL (Hebrew)
 */
export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
}

/**
 * Get the current language direction
 */
export const getCurrentDir = () => (i18n.language === 'he' ? 'rtl' : 'ltr')

export default i18n
