import { useEffect, useState } from 'react'

/**
 * useActiveSection — watches a list of section ids and returns
 * whichever one currently sits closest to the top of the viewport.
 */
export function useActiveSection(sectionIds, offset = 120) {
  const [active, setActive] = useState(sectionIds[0] || '')

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleScroll = () => {
      let current = sectionIds[0] || ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) {
          current = id
        }
      }
      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds, offset])

  return active
}
