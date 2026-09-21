import { FaBootstrap, FaCss3Alt, FaDatabase, FaGitAlt, FaGithub, FaHtml5, FaJava, FaReact } from 'react-icons/fa'
import { SiApachemaven, SiHibernate, SiJavascript, SiMysql, SiPostman, SiRender, SiSpring, SiVercel } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext.jsx'
import { skillCategories } from '../data/skills.js'
import { Reveal } from './Reveal.jsx'
import './Skills.css'

const ICONS = {
  html5: FaHtml5,
  css3: FaCss3Alt,
  javascript: SiJavascript,
  react: FaReact,
  bootstrap: FaBootstrap,
  java: FaJava,
  spring: SiSpring,
  database: FaDatabase,
  hibernate: SiHibernate,
  mysql: SiMysql,
  oracle: FaDatabase,
  git: FaGitAlt,
  github: FaGithub,
  maven: SiApachemaven,
  postman: SiPostman,
  vercel: SiVercel,
  render: SiRender,
}

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="section" aria-label={t('skills.title')}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="section-kicker">{t('skills.kicker')}</span>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-sub">{t('skills.sub')}</p>
        </Reveal>

        {skillCategories.map((category, catIndex) => (
          <div className="skills-category" key={category.id}>
            <Reveal as="div" className="skills-category-head" delay={catIndex * 40}>
              <h3>{t(category.labelKey)}</h3>
              <span className="skills-category-line" aria-hidden="true" />
            </Reveal>
            <div className="skills-grid">
              {category.items.map((skill, i) => {
                const Icon = ICONS[skill.icon] || FaDatabase
                return (
                  <Reveal as="div" key={skill.name} variant="scale" delay={i * 55} className="skill-card">
                    <span className="skill-card-icon" aria-hidden="true">
                      <Icon size={19} />
                    </span>
                    <span className="skill-card-name">{skill.name}</span>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
