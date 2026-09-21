import { useState } from 'react'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/personal.js'
import './Hero.css'

export function Hero() {
  const { t } = useLanguage()
  const [photoFailed, setPhotoFailed] = useState(false)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-rings" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="98" stroke="var(--primary)" strokeOpacity="0.25" strokeDasharray="2 10" />
          <circle cx="100" cy="100" r="72" stroke="var(--primary-soft)" strokeOpacity="0.2" strokeDasharray="1 8" />
        </svg>
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-badge" style={{ animation: 'heroFadeUp 700ms var(--ease) both' }}>
            <span className="hero-badge-dot" />
            {t('hero.badge')}
          </span>

          <h1 className="hero-name" style={{ animation: 'heroFadeUp 700ms 90ms var(--ease) both' }}>
            {personal.name}
          </h1>

          <p className="hero-title" style={{ animation: 'heroFadeUp 700ms 170ms var(--ease) both' }}>
            {personal.title}
          </p>

          <p className="hero-intro" style={{ animation: 'heroFadeUp 700ms 250ms var(--ease) both' }}>
            {t('hero.intro')}
          </p>

          <div className="hero-cta" style={{ animation: 'heroFadeUp 700ms 330ms var(--ease) both' }}>
            <button type="button" className="btn btn-primary" onClick={scrollToProjects}>
              {t('hero.viewProjects')}
              <FiArrowRight size={17} />
            </button>
            <ResumeButton label={t('hero.downloadResume')} comingSoon={t('hero.resumeComingSoon')} />
          </div>

          <div className="hero-social" style={{ animation: 'heroFadeUp 700ms 400ms var(--ease) both' }}>
            <a href={personal.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile">
              <FiGithub size={18} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile">
              <FiLinkedin size={18} />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Send an email">
              <FiMail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual" style={{ animation: 'heroScaleIn 800ms 150ms var(--ease) both' }}>
          <div className="hero-portrait-frame">
            <div className="hero-portrait-inner">
              {!photoFailed ? (
                <img
                  src={personal.photo}
                  alt={personal.name}
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <span className="hero-portrait-monogram" aria-hidden="true">
                  {personal.initials}
                </span>
              )}
            </div>
          </div>
          <span className="hero-portrait-badge">
            <span className="hero-badge-dot" />
            {personal.title}
          </span>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <span className="hero-scroll-line" />
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-copy > *, .hero-visual { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  )
}

function ResumeButton({ label, comingSoon }) {
  const [status, setStatus] = useState('idle') // idle | checking | missing

  const handleClick = (e) => {
    e.preventDefault()
    if (status === 'checking') return
    setStatus('checking')
    fetch(personal.resume, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          const link = document.createElement('a')
          link.href = personal.resume
          link.download = ''
          document.body.appendChild(link)
          link.click()
          link.remove()
          setStatus('idle')
        } else {
          setStatus('missing')
          window.setTimeout(() => setStatus('idle'), 2500)
        }
      })
      .catch(() => {
        setStatus('missing')
        window.setTimeout(() => setStatus('idle'), 2500)
      })
  }

  return (
    <a href={personal.resume} className="btn btn-ghost" onClick={handleClick} aria-disabled={status === 'checking'}>
      <FiDownload size={16} />
      {status === 'missing' ? comingSoon : label}
    </a>
  )
}
