import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import ChatWidget from './components/chatbot/ChatWidget'
import { useTelemetry } from './hooks/useTelemetry'
import { flags } from './config/featureFlags'
import { changeLanguage } from './i18n'

// Lazy-load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Workshops = lazy(() => import('./pages/Workshops'))
const WorkshopDetail = lazy(() => import('./pages/WorkshopDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Order = lazy(() => import('./pages/Order'))
const PralineBuilder = lazy(() => import('./pages/PralineBuilder'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  const { i18n } = useTranslation()

  // Fire telemetry on mount
  useTelemetry()

  // Sync document dir/lang whenever language changes
  useEffect(() => {
    const lang = i18n.language?.split('-')[0] || 'he'
    changeLanguage(lang)
  }, [i18n.language])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="page-wrapper">
        <Suspense fallback={<div className="spinner" style={{ marginTop: '20vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:slug" element={<WorkshopDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Order />} />
            {flags.pralineBuilder && (
              <Route path="/build-your-box" element={<PralineBuilder />} />
            )}
            {/* Catch-all → Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Always-visible WhatsApp floating button */}
      <WhatsAppButton />

      {/* AI Chatbot — feature-flagged */}
      {flags.chatbot && <ChatWidget />}
    </>
  )
}
