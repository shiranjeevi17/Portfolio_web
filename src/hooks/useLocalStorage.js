import { useEffect, useState } from 'react'

/**
 * useLocalStorage — a useState-like hook whose value persists
 * in localStorage across page reloads. Fails safe (falls back to
 * the in-memory default) if localStorage is unavailable.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable (private mode, quota, etc.) — ignore
    }
  }, [key, value])

  return [value, setValue]
}
