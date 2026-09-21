import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/personal.js'
import { Reveal } from './Reveal.jsx'
import './Footer.css'

const LINK_IDS = ['home', 'about', 'skills', 'projects', 'internship', 'contact']

export function Footer() {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const year = new Date().getFullYear()

  const goToSection = (id) => (e) => {
    e.preventDefault()
    if (!onHome) {
      navigate(`/#${id}`)
      return
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Reveal as="div" className="footer-brand-col">
            <p className="footer-brand">
              {personal.name} <span>/{personal.title}</span>
            </p>
            <p className="footer-role">{personal.location}</p>
            <div className="footer-socials">
              <a href={personal.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile">
                <FiGithub size={16} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile">
                <FiLinkedin size={16} />
              </a>
              <a href={`mailto:${personal.email}`} aria-label="Send an email">
                <FiMail size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal as="div" className="footer-col" delay={60}>
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {LINK_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={goToSection(id)}>
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="footer-col" delay={120}>
            <h4>{t('footer.getInTouch')}</h4>
            <ul>
              <li>
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </li>
              <li>
                <span>{personal.phone}</span>
              </li>
              <li>
                <span>{personal.location}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {year} {personal.name}. {t('footer.rights')}
          </span>
          <button type="button" className="footer-top-btn" onClick={goToSection('home')}>
            <FiArrowUp size={14} />
            {t('footer.backToTop')}
          </button>
        </div>
      </div>
    </footer>
  )
}
