import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { workshops } from '../data/workshops'
import './Workshops.css'

const STRUCTURE = [
  {
    id: 'ages-5-11',
    ageGroupKey: 'workshops.age_group_5_11',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    slugs: ['chocolate-painting'],
  },
  {
    id: 'ages-12-plus',
    ageGroupKey: 'workshops.age_group_12_plus',
    icon: '🌟',
    color: '#7b1fa2',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #f3e5f5 100%)',
    coverImage: '/images/workshops/12plus-cover.jpeg',
    subGroups: [
      {
        id: 'girls',
        labelKey: 'workshops.gender_girls',
        icon: '💗',
        color: '#c2185b',
        bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
        slugs: ['friends-at-heart', 'surprise-egg-kids', 'chocolate-painting-teens'],
      },
      {
        id: 'boys',
        labelKey: 'workshops.gender_boys',
        icon: '💙',
        color: '#1565c0',
        bgGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
        slugs: ['surprise-egg-kids', 'chocolate-painting-teens'],
      },
    ],
  },
]

function WorkshopCard({ workshop }) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/workshops/${workshop.slug}`}
      className="ws-workshop-card"
      style={{
        '--ws-bg': workshop.bgGradient || 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
        '--ws-color': workshop.color || '#c2185b',
      }}
    >
      {workshop.samplePhotos?.[0] && (
        <div className="ws-workshop-card__photo-wrap">
          <img
            src={workshop.samplePhotos[0]}
            alt={t(workshop.titleKey)}
            className="ws-workshop-card__photo"
            loading="lazy"
            onError={(e) => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div className="ws-workshop-card__body">
        <span className="ws-workshop-card__icon">{workshop.icon}</span>
        <h3 className="ws-workshop-card__title">{t(workshop.titleKey)}</h3>
        <p className="ws-workshop-card__subtitle">{t(workshop.subtitleKey)}</p>
        <span className="ws-workshop-card__cta">{t('workshops.view_workshop')} →</span>
      </div>
    </Link>
  )
}

export default function Workshops() {
  const { t } = useTranslation()
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)

  const selectAge = (id) => {
    setSelectedAge(id)
    setSelectedGender(null)
  }

  const activeGroup = STRUCTURE.find(g => g.id === selectedAge)
  const activeSubGroup = activeGroup?.subGroups?.find(s => s.id === selectedGender)

  const resolvedWorkshops = (slugs) =>
    slugs.map(s => workshops.find(w => w.slug === s)).filter(Boolean)

  return (
    <div className="workshops-page">

      <section className="ws-list-hero">
        <div className="container ws-list-hero__content">
          <h1 className="ws-list-hero__title">{t('workshops.page_title')}</h1>
          <p className="ws-list-hero__subtitle">{t('workshops.page_subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ── Step 1: Age category buttons ─────────────────────────────── */}
          <div className="ws-step-label">{t('workshops.step_choose_age')}</div>
          <div className="ws-age-btns">
            {STRUCTURE.map((group) => (
              <button
                key={group.id}
                type="button"
                className={`ws-age-btn${selectedAge === group.id ? ' ws-age-btn--active' : ''}`}
                style={{ '--ws-color': group.color, '--ws-bg': group.bgGradient }}
                onClick={() => selectAge(group.id)}
              >
                <span className="ws-age-btn__icon">{group.icon}</span>
                <span className="ws-age-btn__label">{t(group.ageGroupKey)}</span>
              </button>
            ))}
          </div>

          {/* ── Step 2a: If 12+, show gender buttons ─────────────────────── */}
          {activeGroup?.subGroups && (
            <>
              <div className="ws-step-label ws-step-label--sub">{t('workshops.step_choose_gender')}</div>
              <div className="ws-gender-btns">
                {activeGroup.subGroups.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    className={`ws-gender-btn${selectedGender === sub.id ? ' ws-gender-btn--active' : ''}`}
                    style={{ '--ws-color': sub.color, '--ws-bg': sub.bgGradient }}
                    onClick={() => setSelectedGender(sub.id)}
                  >
                    <span className="ws-gender-btn__icon">{sub.icon}</span>
                    <span className="ws-gender-btn__label">{t(sub.labelKey)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Step 2b: If 5–11, show workshops directly ────────────────── */}
          {activeGroup && !activeGroup.subGroups && (
            <div className="ws-cards-grid ws-cards-grid--mt">
              {resolvedWorkshops(activeGroup.slugs).map(w => (
                <WorkshopCard key={w.slug} workshop={w} />
              ))}
            </div>
          )}

          {/* ── Step 3: Show workshops for selected gender ────────────────── */}
          {activeSubGroup && (
            <div className="ws-cards-grid ws-cards-grid--mt">
              {resolvedWorkshops(activeSubGroup.slugs).map(w => (
                <WorkshopCard key={w.slug} workshop={w} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  )
}
