import { useLanguage } from '../context/LanguageContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { aboutText, careerObjective } from '../data/personal.js'
import { education, course } from '../data/education.js'
import { Reveal } from './Reveal.jsx'
import './About.css'

export function About() {
  const { t } = useLanguage()
  const [timelineRef, timelineVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="about" className="section" aria-label={t('about.aboutTitle')}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="section-kicker">{t('about.kicker')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal as="article" className="about-card" variant="left">
            <h3>{t('about.aboutTitle')}</h3>
            <p>{aboutText}</p>
          </Reveal>
          <Reveal as="article" className="about-card" variant="right" delay={80}>
            <h3>{t('about.careerTitle')}</h3>
            <p>{careerObjective}</p>
          </Reveal>
        </div>

        <div ref={timelineRef} className={`timeline ${timelineVisible ? 'is-visible' : ''}`}>
          <div className="timeline-item">
            <span className="timeline-node" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-card-head">
                <h4>
                  {education.degree} — {education.branch}
                </h4>
                <span className="timeline-years">
                  {education.startYear} – {education.endYear}
                </span>
              </div>
              <p>{education.college}</p>
              <p>{education.university}</p>
              <span className="cgpa-pill">
                {t('about.cgpaLabel')}: {education.cgpa}
              </span>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-node" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-card-head">
                <h4>{course.name}</h4>
              </div>
              <p>{course.institute}</p>
              <span style={{ display: 'block', marginTop: 10, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {t('about.topicsLabel')}
              </span>
              <div className="topics-list">
                {course.topics.map((topic) => (
                  <span key={topic} className="topic-chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
