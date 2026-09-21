import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { personal } from '../data/personal.js'
import { ThemeToggle } from './ThemeToggle.jsx'
import { LanguageSelector } from './LanguageSelector.jsx'
import './Navbar.css'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'internship', 'contact']

export function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const active = useActiveSection(onHome ? SECTION_IDS : [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const goToSection = (id) => {
    setMobileOpen(false)
    if (!onHome) {
      navigate(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar-inner" aria-label="Primary">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault()
            goToSection('home')
          }}
        >
          {'<'}ShiranJeevi<span>.dev</span>{'/>'}
        </a>

        <ul className="navbar-menu" role="list">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`navbar-link ${onHome && active === id ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  goToSection(id)
                }}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <LanguageSelector />
          <ThemeToggle />
          <button
            type="button"
            className={`navbar-hamburger ${mobileOpen ? 'is-open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`navbar-mobile ${mobileOpen ? 'is-open' : ''}`}>
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="navbar-mobile-link"
            onClick={(e) => {
              e.preventDefault()
              goToSection(id)
            }}
          >
            {t(`nav.${id}`)}
          </a>
        ))}
        <div className="navbar-mobile-actions">
          <a href={`mailto:${personal.email}`} className="btn btn-ghost btn-sm">
            {personal.email}
          </a>
        </div>
      </div>
    </header>
  )
}
