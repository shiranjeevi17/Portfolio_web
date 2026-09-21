import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — returns a ref to attach to an element and a
 * boolean that flips to true once the element enters the viewport.
 * Falls back to "already visible" if IntersectionObserver isn't
 * available, so content never gets stuck hidden.
 */
export function useScrollReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}
