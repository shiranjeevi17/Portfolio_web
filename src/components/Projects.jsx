import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projects, projectFilters } from '../data/projects.js'
import { ProjectCard } from './ProjectCard.jsx'
import { Reveal } from './Reveal.jsx'
import './Projects.css'

export function Projects() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesFilter = filter === 'All' || project.category.includes(filter)
      if (!matchesFilter) return false
      if (!q) return true
      const haystack = [project.title, project.description, ...project.technologies, ...project.category].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [query, filter])

  return (
    <section id="projects" className="section" aria-label={t('projects.title')}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="section-kicker">{t('projects.kicker')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-sub">{t('projects.sub')}</p>
        </Reveal>

        <Reveal as="div" className="projects-toolbar">
          <div className="projects-search">
            <FiSearch size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('projects.searchPlaceholder')}
              aria-label={t('projects.searchPlaceholder')}
            />
          </div>
          <div className="projects-filters" role="group" aria-label="Filter projects by technology">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-chip ${filter === f ? 'is-active' : ''}`}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {t(`projects.filters.${f}`)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid" key={`${filter}-${query}`}>
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <Reveal as="div" variant="scale" delay={Math.min(i, 6) * 60} key={project.id}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))
          ) : (
            <div className="projects-empty">
              <p>{t('projects.noResults')}</p>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setQuery('')
                  setFilter('All')
                }}
              >
                {t('projects.resetSearch')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
