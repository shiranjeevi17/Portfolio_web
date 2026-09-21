import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 40,
        height: 40,
        borderRadius: '999px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        transition: 'border-color 180ms ease, color 180ms ease, transform 180ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
    </button>
  )
}
