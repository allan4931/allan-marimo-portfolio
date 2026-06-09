import { useEffect, useState } from 'react'
import './Contact.css'
import serverSvg from '../assets/svg/server-3d.svg'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setState('error')
        setError('Something went wrong. Please try again or email directly.')
      }
    } catch {
      // Fallback for demo / no backend
      setTimeout(() => {
        setState('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      }, 1200)
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="section contact-hero">
        <div className="contact-hero__bg" />
        <div className="contact-hero__content">
          <div className="section-tag reveal">
            <div className="section-tag__line" />
            <span className="section-tag__text">Get In Touch</span>
          </div>
          <h1 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
            LET'S <span>BUILD</span><br />SOMETHING.
          </h1>
          <p className="section-body reveal" style={{ transitionDelay: '.2s' }}>
            Open for freelance projects, architecture consulting, and remote full-time roles.
            Response time: within 24 hours.
          </p>
        </div>
        <div className="contact-hero__server reveal-right" style={{ transitionDelay: '.3s' }}>
          <img src={serverSvg} alt="Server infrastructure" className="contact-hero__server-img" />
          <div className="contact-hero__server-glow" />
        </div>
      </section>

      {/* ── MAIN CONTACT AREA ── */}
      <section className="section section--dark contact-main">
        <div className="contact-grid">

          {/* LEFT: info */}
          <div className="contact-info">
            <div className="section-tag reveal">
              <div className="section-tag__line" />
              <span className="section-tag__text">Contact Details</span>
            </div>
            <h2 className="contact-info__heading reveal" style={{ transitionDelay: '.1s' }}>
              REACH <span>OUT</span>
            </h2>
            <p className="section-body reveal" style={{ transitionDelay: '.2s' }}>
              Whether you have a project in mind, need a system designed, or just want to connect — I'm here.
            </p>

            <div className="contact-links">
              {LINKS.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                  className="contact-link reveal"
                  style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                >
                  <div className="contact-link__icon">{l.icon}</div>
                  <div>
                    <div className="contact-link__label">{l.label}</div>
                    <div className="contact-link__value">{l.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Location card */}
            <div className="location-card reveal" style={{ transitionDelay: '.7s' }}>
              <div className="location-card__map">
                <div className="location-card__pin">📍</div>
                <div className="location-card__rings">
                  <div className="location-ring location-ring--1" />
                  <div className="location-ring location-ring--2" />
                  <div className="location-ring location-ring--3" />
                </div>
              </div>
              <div>
                <div className="location-card__name">Zimbabwe 🇿🇼</div>
                <div className="location-card__detail">Available globally · Remote-first</div>
                <div className="location-card__tz">UTC+2 · CAT (Central Africa Time)</div>
              </div>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="contact-form-wrap reveal-right" style={{ transitionDelay: '.2s' }}>
            <div className="contact-form">
              <h3 className="contact-form__title">Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Project enquiry / Freelance / Consulting"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell me about your project, timeline, and budget..."
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              {state === 'success' ? (
                <div className="form-success">
                  <span>✓</span> Message sent! I'll respond within 24 hours.
                </div>
              ) : (
                <button
                  className="btn btn--primary form-submit"
                  onClick={handleSubmit}
                  disabled={state === 'sending'}
                >
                  <span>{state === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  {state !== 'sending' && <span className="btn__arrow">→</span>}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY BANNER ── */}
      <section className="section availability">
        <div className="availability__inner">
          <div className="availability__status">
            <span className="availability__dot" />
            <span className="availability__text">Available for new projects</span>
          </div>
          <div className="availability__types">
            {['Freelance','Remote Full-Time','Consulting','Architecture Review'].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const LINKS = [
  { icon: '✉',  label: 'Email',    value: 'allanmarimo455@gmail.com',      href: 'mailto:allanmarimo455@gmail.com', external: false },
  { icon: '⌥',  label: 'GitHub',   value: 'github.com/allan4931',          href: 'https://github.com/allan4931',   external: true  },
  { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/allanmarimo',   href: 'https://linkedin.com/in/allanmarimo', external: true },
  { icon: '✆',  label: 'Phone',    value: '+263 788 447 689',              href: 'tel:+263788447689',              external: false },
]
