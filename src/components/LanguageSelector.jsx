import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext.jsx'
import { languageList } from '../i18n/index.js'
import './LanguageSelector.css'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = languageList.find((l) => l.code === language) || languageList[0]

  useEffect(() => {
    const handleClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div className="lang-selector" ref={rootRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <FiChevronDown size={14} />
      </button>
      <div className={`lang-dropdown ${open ? 'is-open' : ''}`} role="listbox" aria-label="Select language">
        {languageList.map((l) => (
          <button
            key={l.code}
            type="button"
            role="option"
            aria-selected={l.code === language}
            className={`lang-option ${l.code === language ? 'is-active' : ''}`}
            onClick={() => {
              setLanguage(l.code)
              setOpen(false)
            }}
          >
            <span aria-hidden="true">{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
