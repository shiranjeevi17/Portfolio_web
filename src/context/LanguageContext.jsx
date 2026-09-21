import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { translations, defaultLanguage } from '../i18n/index.js'

const LanguageContext = createContext(null)

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [language, setLanguageStored] = useLocalStorage('portfolio-language', defaultLanguage)
  const [fading, setFading] = useState(false)

  const setLanguage = useCallback(
    (code) => {
      if (!translations[code] || code === language) return
      setFading(true)
      window.setTimeout(() => {
        setLanguageStored(code)
        window.setTimeout(() => setFading(false), 20)
      }, 140)
    },
    [language, setLanguageStored]
  )

  const t = useCallback(
    (path) => {
      const dict = translations[language] || translations[defaultLanguage]
      const value = getByPath(dict, path)
      if (value !== undefined) return value
      const fallback = getByPath(translations[defaultLanguage], path)
      return fallback !== undefined ? fallback : path
    },
    [language]
  )

  useEffect(() => {
    document.documentElement.classList.toggle('lang-fading', fading)
  }, [fading])

  const value = useMemo(
    () => ({ language, setLanguage, t, fading }),
    [language, setLanguage, t, fading]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
