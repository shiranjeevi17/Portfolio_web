import { FiFileText } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { internship } from '../data/internship.js'
import { Reveal } from './Reveal.jsx'
import './Internship.css'

export function Internship() {
  const { t } = useLanguage()
  const [listRef, listVisible] = useScrollReveal({ threshold: 0.15 })

  return (
    <section id="internship" className="section" aria-label={t('internship.title')}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="section-kicker">{t('internship.kicker')}</span>
          <h2 className="section-title">{t('internship.title')}</h2>
          <p className="section-sub">{t('internship.sub')}</p>
        </Reveal>

        <Reveal as="div" className="internship-card" variant="scale">
          <div className="internship-head">
            <h3 className="internship-company">{internship.company}</h3>
            <span className="internship-role">{internship.title}</span>
            <div className="internship-meta">
              <span>
                {t('internship.duration')}: {internship.duration}
              </span>
              {internship.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="internship-cert">
              <FiFileText size={18} aria-hidden="true" />
              <span>
                {t('internship.certificateTitle')}: {internship.certificate ? internship.certificate : t('internship.certificateComingSoon')}
              </span>
            </div>
          </div>

          <div ref={listRef} className={`internship-list ${listVisible ? 'is-visible' : ''}`}>
            <h4>{t('internship.responsibilitiesTitle')}</h4>
            <ul>
              {internship.responsibilities.map((item, i) => (
                <li key={item} style={{ transitionDelay: `${i * 70}ms` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
