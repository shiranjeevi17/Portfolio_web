import { useState } from 'react'
import { FiCheckCircle, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/personal.js'
import { Reveal } from './Reveal.jsx'
import './Contact.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { t } = useLanguage()
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (submitted) setSubmitted(false)
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = t('contact.errors.name')
    if (!EMAIL_RE.test(values.email.trim())) next.email = t('contact.errors.email')
    if (!values.subject.trim()) next.subject = t('contact.errors.subject')
    if (!values.message.trim()) next.message = t('contact.errors.message')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      setSubmitted(false)
      return
    }

    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    setSubmitted(true)
  }

  return (
    <section id="contact" className="section" aria-label={t('contact.title')}>
      <div className="container">
        <div className="contact-grid">
          <Reveal as="div" variant="left">
            <h2 className="contact-info-title">{t('contact.title')}</h2>
            <p className="contact-info-sub">{t('contact.sub')}</p>

            <a className="contact-detail" href={`mailto:${personal.email}`}>
              <span className="contact-detail-icon">
                <FiMail size={16} />
              </span>
              {personal.email}
            </a>
            <a className="contact-detail" href={`tel:+91${personal.phone}`}>
              <span className="contact-detail-icon">
                <FiPhone size={16} />
              </span>
              {personal.phone}
            </a>
            <div className="contact-detail">
              <span className="contact-detail-icon">
                <FiMapPin size={16} />
              </span>
              {personal.location}
            </div>

            <div className="contact-socials">
              <a href={personal.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile">
                <FiGithub size={18} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile">
                <FiLinkedin size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal as="form" variant="right" delay={80} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cf-name">{t('contact.name')}</label>
                <input
                  id="cf-name"
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'cf-name-error' : undefined}
                />
                {errors.name && (
                  <span id="cf-name-error" className="form-error">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">{t('contact.email')}</label>
                <input
                  id="cf-email"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'cf-email-error' : undefined}
                />
                {errors.email && (
                  <span id="cf-email-error" className="form-error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="cf-subject">{t('contact.subject')}</label>
              <input
                id="cf-subject"
                type="text"
                value={values.subject}
                onChange={handleChange('subject')}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'cf-subject-error' : undefined}
              />
              {errors.subject && (
                <span id="cf-subject-error" className="form-error">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="cf-message">{t('contact.message')}</label>
              <textarea
                id="cf-message"
                rows={5}
                value={values.message}
                onChange={handleChange('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'cf-message-error' : undefined}
              />
              {errors.message && (
                <span id="cf-message-error" className="form-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary form-submit">
              <FiSend size={16} />
              {t('contact.send')}
            </button>

            {submitted && (
              <p className="form-success" role="status">
                <FiCheckCircle size={18} />
                {t('contact.success')}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
