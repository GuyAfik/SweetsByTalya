import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './About.css'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'The pralines are absolutely divine! I ordered a box for my mother\'s birthday and she couldn\'t stop raving about them.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Miriam L.',
    text: 'Ordered a custom chocolate box for our wedding. Talya was so professional and the result was breathtaking.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Yael R.',
    text: 'The chocolate workshop for my daughter\'s birthday was incredible. The kids had so much fun and went home with beautiful creations!',
    stars: 5,
  },
]

export default function About() {
  const { t } = useTranslation()

  const values = [
    { icon: '🤲', title: t('about.value1_title'), desc: t('about.value1_desc') },
    { icon: '⭐', title: t('about.value2_title'), desc: t('about.value2_desc') },
    { icon: '❤️', title: t('about.value3_title'), desc: t('about.value3_desc') },
    { icon: '🎁', title: t('about.value4_title'), desc: t('about.value4_desc') },
  ]

  const steps = [
    { icon: '🌱', label: t('about.process_step1'), desc: t('about.process_step1_desc') },
    { icon: '🍫', label: t('about.process_step2'), desc: t('about.process_step2_desc') },
    { icon: '📦', label: t('about.process_step3'), desc: t('about.process_step3_desc') },
  ]

  return (
    <div className="about">
      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <div className="about-story__image">
            <img
              src="/images/talya-about.jpg"
              alt="Talya"
              onError={(e) => {
                e.target.src = 'https://placehold.co/500x600/F2C4CE/3B1F0E?text=🍫+Talya'
              }}
            />
          </div>
          <div className="about-story__text">
            <h2>{t('about.story_title')}</h2>
            <div className="divider" style={{ margin: '1rem 0' }} />
            <p>{t('about.story_p1')}</p>
            <p style={{ marginTop: '1rem' }}>{t('about.story_p2')}</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/bulk-order" className="btn btn-caramel">
                🍫 {t('nav.bulk_order')}
              </Link>
              <Link to="/workshops" className="btn btn-secondary">
                🎨 {t('nav.workshops')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values — hidden for now */}
      {false && (
      <section className="section about-values">
        <div className="container">
          <h2 className="section-title">{t('about.values_title')}</h2>
          <div className="divider" />
          <div className="about-values__grid">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="about-values__card">
                <div className="about-values__icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Process (How We Work) — hidden for now */}
      {false && (
      <section className="section about-process">
        <div className="container">
          <h2 className="section-title">{t('about.process_title')}</h2>
          <div className="divider" />
          <div className="about-process__steps">
            {steps.map(({ icon, label, desc }, i) => (
              <div key={label} className="about-process__step">
                <div className="about-process__step-num">{i + 1}</div>
                <div className="about-process__step-icon">{icon}</div>
                <h3>{label}</h3>
                <p>{desc}</p>
                {i < steps.length - 1 && <div className="about-process__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Testimonials — hidden for now */}
      {false && (
      <section className="section about-testimonials">
        <div className="container">
          <h2 className="section-title">{t('about.testimonials_title')}</h2>
          <div className="divider" />
          <div className="about-testimonials__grid">
            {testimonials.map(({ id, name, text, stars }) => (
              <div key={id} className="about-testimonials__card card">
                <div className="about-testimonials__stars">
                  {'★'.repeat(stars)}
                </div>
                <p className="about-testimonials__text">"{text}"</p>
                <p className="about-testimonials__name">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  )
}
