import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Hero } from '../components/Hero.jsx'
import { About } from '../components/About.jsx'
import { Skills } from '../components/Skills.jsx'
import { Projects } from '../components/Projects.jsx'
import { Internship } from '../components/Internship.jsx'
import { Contact } from '../components/Contact.jsx'
import { Footer } from '../components/Footer.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { recordSectionView, recordVisit } from '../utils/analytics.js'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'internship', 'contact']

export function Home() {
  const location = useLocation()
  const active = useActiveSection(SECTION_IDS)
  const hasRecordedVisit = useRef(false)

  // Record one visit per session load.
  useEffect(() => {
    if (hasRecordedVisit.current) return
    hasRecordedVisit.current = true
    recordVisit()
  }, [])

  // Track which section is currently in view for the private admin dashboard.
  useEffect(() => {
    if (active) recordSectionView(active)
  }, [active])

  // Support deep links like /#projects coming from another route.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      // Wait a tick so layout has settled before scrolling.
      window.requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Internship />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
