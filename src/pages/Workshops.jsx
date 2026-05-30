import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { workshops } from '../data/workshops'
import WorkshopBookingModal from '../components/workshops/WorkshopBookingModal'
import './Workshops.css'

const STRUCTURE = [
  {
    id: 'ages-5-11',
    ageGroupKey: 'workshops.age_group_5_11',
    icon: '🎨',
    color: '#e65100',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 50%, #fff3e0 100%)',
    workshopSlug: 'chocolate-painting',
  },
  {
    id: 'ages-12-plus',
    ageGroupKey: 'workshops.age_group_12_plus',
    icon: '🌟',
    color: '#7b1fa2',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #f3e5f5 100%)',
    subGroups: [
      {
        id: 'girls',
        labelKey: 'workshops.gender_girls',
        icon: '💗',
        color: '#c2185b',
        bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)',
        workshopSlugs: ['friends-at-heart', 'surprise-egg-kids', 'chocolate-painting'],
      },
      {
        id: 'boys',
        labelKey: 'workshops.gender_boys',
        icon: '💙',
        color: '#1565c0',
        bgGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
        workshopSlugs: ['surprise-egg-kids', 'chocolate-painting'],
      },
    ],
  },
]

export default function Workshops() {
  const { t } = useTranslation()
  const [modal, setModal] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const openModal = (slug) => {
    const w = workshops.find(x => x.slug === slug)
    if (w) setModal(w)
  }

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
          <div className="ws-category-grid">

            {STRUCTURE.map((group) => {
              if (group.workshopSlug) {
                const w = workshops.find(x => x.slug === group.workshopSlug)
                return (
                  <button
                    key={group.id}
                    type="button"
                    className="ws-cat-btn"
                    style={{ '--ws-color': group.color, '--ws-bg': group.bgGradient }}
                    onClick={() => openModal(group.workshopSlug)}
                  >
                    <span className="ws-cat-btn__icon">{group.icon}</span>
                    <span className="ws-cat-btn__age">{t(group.ageGroupKey)}</span>
                    <span className="ws-cat-btn__name">{w ? t(w.titleKey) : ''}</span>
                    <span className="ws-cat-btn__cta">💬 {t('workshops.book_cta')}</span>
                  </button>
                )
              }

              return (
                <div key={group.id} className="ws-cat-group">
                  <div
                    className="ws-cat-group__header"
                    style={{ '--ws-color': group.color, '--ws-bg': group.bgGradient }}
                  >
                    <span className="ws-cat-btn__icon">{group.icon}</span>
                    <span className="ws-cat-btn__age">{t(group.ageGroupKey)}</span>
                  </div>
                  <div className="ws-cat-subgrid">
                    {group.subGroups.map((sub) => (
                      <div key={sub.id} className="ws-subcat">
                        <div
                          className="ws-subcat__header"
                          style={{ '--ws-color': sub.color }}
                        >
                          <span>{sub.icon}</span>
                          <span>{t(sub.labelKey)}</span>
                        </div>
                        <div className="ws-subcat__btns">
                          {sub.workshopSlugs.map((slug) => {
                            const w = workshops.find(x => x.slug === slug)
                            if (!w) return null
                            return (
                              <button
                                key={slug}
                                type="button"
                                className="ws-workshop-btn"
                                style={{ '--ws-color': sub.color, '--ws-bg': sub.bgGradient }}
                                onClick={() => openModal(slug)}
                              >
                                <span className="ws-workshop-btn__icon">{w.icon}</span>
                                <span className="ws-workshop-btn__name">{t(w.titleKey)}</span>
                                <span className="ws-workshop-btn__cta">💬 {t('workshops.book_cta')}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {modal && (
        <WorkshopBookingModal
          workshop={modal}
          onClose={() => setModal(null)}
        />
      )}

    </div>
  )
}
