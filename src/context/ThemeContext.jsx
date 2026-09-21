import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('portfolio-theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
