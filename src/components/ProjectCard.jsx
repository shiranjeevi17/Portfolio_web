import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiCode, FiDatabase, FiFilm, FiGithub } from 'react-icons/fi'
import { FaJava, FaReact } from 'react-icons/fa'
import { SiSpring } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext.jsx'

const GRADIENTS = [
  'linear-gradient(135deg, #111a38, #6d3df5)',
  'linear-gradient(135deg, #10182e, #8a3ffc)',
  'linear-gradient(135deg, #101a2d, #0f8a86)',
  'linear-gradient(135deg, #21133d, #7547ff)',
  'linear-gradient(135deg, #10182e, #2563eb)',
]

function pickIcon(technologies) {
  const joined = technologies.join(' ').toLowerCase()
  if (joined.includes('react')) return FaReact
  if (joined.includes('spring')) return SiSpring
  if (joined.includes('java') || joined.includes('jdbc')) return FaJava
  if (joined.includes('recommendation') || joined.includes('tmdb') || joined.includes('movie')) return FiFilm
  if (joined.includes('sql') || joined.includes('database') || joined.includes('storage')) return FiDatabase
  return FiCode
}

export function ProjectCard({ project, index }) {
  const { t } = useLanguage()
  const [imgFailed, setImgFailed] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const Icon = pickIcon(project.technologies)
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const gallery = project.gallery?.length ? project.gallery : [project.image]

  useEffect(() => {
    if (gallery.length < 2) return undefined
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % gallery.length)
    }, 3600)
    return () => window.clearInterval(timer)
  }, [gallery.length])

  const currentImage = gallery[activeImage] || project.image

  return (
    <article className="project-card">
      <div className={`project-media ${gallery.length > 1 ? 'has-gallery' : ''}`}>
        {!imgFailed ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${project.title} project preview ${gallery.length > 1 ? activeImage + 1 : ''}`}
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="project-fallback" style={{ background: gradient }}>
            <span className="project-fallback-icon" aria-hidden="true">
              <Icon size={26} />
            </span>
            <span className="project-fallback-label">{project.title}</span>
          </div>
        )}

        {gallery.length > 1 && (
          <div className="project-gallery-strip" aria-label={`${project.title} screenshots`}>
            {gallery.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                className={`project-gallery-thumb ${activeImage === imageIndex ? 'is-active' : ''}`}
                onClick={() => setActiveImage(imageIndex)}
                aria-label={`Show screenshot ${imageIndex + 1}`}
                aria-pressed={activeImage === imageIndex}
              >
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="project-overlay" aria-hidden="true">
          <span className="project-overlay-arrow">
            <FiArrowUpRight size={18} />
          </span>
        </div>
      </div>

      <div className="project-body">
        <div className="project-heading-row">
          <h3 className="project-title">{project.title}</h3>
        </div>

        <p className="project-desc">{project.description}</p>

        <div className="project-tech" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span className="tech-tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        {project.features?.length > 0 && (
          <p className="project-features">
            {t('projects.features')}: {project.features.slice(0, 4).join(' · ')}
          </p>
        )}

        <div className="project-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer noopener" className="btn btn-ghost btn-sm">
              <FiGithub size={15} />
              {t('projects.viewCode')}
            </a>
          )}

          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noreferrer noopener" className="btn btn-primary btn-sm">
              <FiArrowUpRight size={15} />
              {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
