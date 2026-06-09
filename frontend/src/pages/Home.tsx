import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCounter } from '../hooks/useCounter'
import './Home.css'

// SVG imports (Vite handles these as URLs)
import coderSvg   from '../assets/svg/coder-3d.svg'
import laptopSvg  from '../assets/svg/laptop-3d.svg'
import serverSvg  from '../assets/svg/server-3d.svg'
import globeSvg   from '../assets/svg/skill-globe.svg'

/* ── Animated counter cell ── */
function StatCell({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target, 1600, suffix)
  return (
    <div className="stat-cell reveal" ref={ref as React.RefObject<HTMLDivElement>}>
      <span className="stat-cell__num">{count}{suffix}</span>
      <span className="stat-cell__label">{label}</span>
    </div>
  )
}

/* ── scroll reveal helper ── */
function useRevealAll(selector: string) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll(selector).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
}

export default function Home() {
  useRevealAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')

  /* parallax on hero ghost-number */
  const ghostRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const onScroll = () => {
      if (ghostRef.current)
        ghostRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero" id="home">
        <div className="hero__bg" />
        <div className="hero__grid-lines" aria-hidden="true" />

        {/* Ghost number */}
        <span className="hero__ghost" ref={ghostRef} aria-hidden="true">01</span>

        <div className="hero__content">
          <div className="hero__eyebrow">
            <div className="hero__eyebrow-line" />
            <span>Independent Software Engineer</span>
          </div>

          <h1 className="hero__name">
            Allan<br />
            <span>Marimo</span>
          </h1>

          <p className="hero__sub">
            System Architect &amp; Cloud Specialist — Zimbabwe 🇿🇼<br />
            <em>"We build simplicity for users. Complexity is our responsibility."</em>
          </p>

          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">
              <span>Let's Work</span><span className="btn__arrow">→</span>
            </Link>
            <Link to="/skills" className="btn btn--outline">
              <span>View Stack</span>
            </Link>
          </div>
        </div>

        {/* 3D Coder illustration */}
        <div className="hero__scene">
          <img src={coderSvg} alt="Developer at workstation with side lighting" className="hero__coder" />
          {/* Side light effects */}
          <div className="hero__light hero__light--gold" aria-hidden="true" />
          <div className="hero__light hero__light--blue" aria-hidden="true" />
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ══ STATS RIBBON ══ */}
      <div className="stats-ribbon">
        <StatCell target={5}   suffix="+" label="Years Experience" />
        <StatCell target={30}  suffix="+" label="Projects Shipped" />
        <StatCell target={16}  suffix=""  label="Technologies" />
        <StatCell target={100} suffix="%" label="Uptime Obsession" />
      </div>

      {/* ══ ABOUT ══ */}
      <section className="section about" id="about">
        <div className="about__grid">
          <div className="about__image-col reveal-left">
            <div className="about__frame">
              <img src={coderSvg} alt="Allan Marimo at his workstation" className="about__img" />
              <div className="about__frame-border" />
              <div className="about__badge">Zimbabwe 🇿🇼</div>
            </div>
          </div>
          <div className="about__text-col">
            <div className="section-tag reveal">
              <div className="section-tag__line" />
              <span className="section-tag__text">About Me</span>
            </div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
              WHO I <span>AM</span>
            </h2>
            <blockquote className="about__quote reveal" style={{ transitionDelay: '.2s' }}>
              "We build simplicity for users.<br />Complexity is our responsibility."
            </blockquote>
            <p className="section-body reveal" style={{ transitionDelay: '.3s' }}>
              I'm Allan Marimo — an independent software engineer, system architect, and cloud specialist.
              I design and ship production-grade systems end-to-end: from pixel-perfect frontends to
              hardened VPS infrastructure with SSL, Docker, and zero-downtime deployments.
            </p>
            <p className="section-body reveal" style={{ transitionDelay: '.4s', marginTop: '1rem' }}>
              Based in Zimbabwe, available globally for remote freelance, consulting, or full-time roles.
            </p>
            <div className="about__pills reveal" style={{ transitionDelay: '.5s' }}>
              {['Full-Stack Dev','Cloud Specialist','System Architect','DevOps','API Design','Linux/VPS'].map(p => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT I DO — 3 image cards ══ */}
      <section className="section section--dark what-i-do">
        <div className="section-tag reveal">
          <div className="section-tag__line" />
          <span className="section-tag__text">What I Do</span>
        </div>
        <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
          CORE <span>SERVICES</span>
        </h2>
        <div className="services-grid">
          {/* Card 1 */}
          <div className="service-card reveal">
            <div className="service-card__img-wrap">
              <img src={laptopSvg} alt="Full-stack web development" className="service-card__img" />
              <div className="service-card__glow service-card__glow--blue" />
            </div>
            <div className="service-card__body">
              <span className="service-card__num">01</span>
              <h3 className="service-card__title">Full-Stack Development</h3>
              <p className="service-card__desc">
                React + TypeScript frontends paired with FastAPI backends.
                Clean, typed, performant, and production-ready from day one.
              </p>
              <div className="service-card__tags">
                {['React','TypeScript','FastAPI','Python'].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-card reveal" style={{ transitionDelay: '.15s' }}>
            <div className="service-card__img-wrap">
              <img src={serverSvg} alt="Cloud and DevOps infrastructure" className="service-card__img" />
              <div className="service-card__glow service-card__glow--gold" />
            </div>
            <div className="service-card__body">
              <span className="service-card__num">02</span>
              <h3 className="service-card__title">Cloud &amp; DevOps</h3>
              <p className="service-card__desc">
                Ubuntu VPS setup, Docker Compose orchestration, Nginx reverse proxy,
                auto-renewing SSL, UFW firewall, and zero-downtime deployments.
              </p>
              <div className="service-card__tags">
                {['Docker','Nginx','Ubuntu','Certbot'].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-card reveal" style={{ transitionDelay: '.3s' }}>
            <div className="service-card__img-wrap">
              <img src={globeSvg} alt="System architecture and API design" className="service-card__img" />
              <div className="service-card__glow service-card__glow--green" />
            </div>
            <div className="service-card__body">
              <span className="service-card__num">03</span>
              <h3 className="service-card__title">System Architecture</h3>
              <p className="service-card__desc">
                API design, database modelling, microservice layouts, and security
                hardening. I architect for scale and own the full delivery chain.
              </p>
              <div className="service-card__tags">
                {['REST APIs','PostgreSQL','Redis','Pydantic'].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="section projects" id="projects">
        <div className="section-tag reveal">
          <div className="section-tag__line" />
          <span className="section-tag__text">Selected Work</span>
        </div>
        <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
          PROJECT<span>S</span>
        </h2>
        <p className="section-body reveal" style={{ transitionDelay: '.2s' }}>
          Production systems built with precision and deployed with confidence.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.num} className="project-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="project-card__num">{p.num}</div>
              <div className="project-card__tag">{p.tag}</div>
              <h3 className="project-card__name">{p.name}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__stack">
                {p.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
              </div>
              <a href={p.link} className="project-card__link" target="_blank" rel="noreferrer">
                {p.linkLabel} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="section section--dark experience" id="experience">
        <div className="experience__inner">
          <div>
            <div className="section-tag reveal">
              <div className="section-tag__line" />
              <span className="section-tag__text">Career</span>
            </div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
              EXPERI<span>ENCE</span>
            </h2>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <div key={e.role} className="timeline__item exp-item" style={{ transitionDelay: `${i * 0.2}s` }}>
                  <div className="timeline__dot" />
                  <div className="timeline__year">{e.year}</div>
                  <div className="timeline__role">{e.role}</div>
                  <div className="timeline__company">{e.company}</div>
                  <p className="timeline__desc">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: server illustration + values */}
          <div className="experience__right">
            <div className="experience__server-wrap reveal-right">
              <img src={serverSvg} alt="Server infrastructure" className="experience__server" />
              <div className="experience__server-glow" />
            </div>
            <div className="values">
              {VALUES.map((v, i) => (
                <div key={v.title} className="value-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="value-item__title">{v.title}</span>
                  <p className="value-item__desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="cta-banner">
        <div className="cta-banner__bg" />
        <div className="cta-banner__content">
          <h2 className="cta-banner__title reveal">
            READY TO <span>BUILD</span>?
          </h2>
          <p className="cta-banner__sub reveal" style={{ transitionDelay: '.1s' }}>
            Open for freelance projects, remote roles, and architecture consulting.
          </p>
          <div className="cta-banner__actions reveal" style={{ transitionDelay: '.2s' }}>
            <Link to="/contact" className="btn btn--primary">
              <span>Start a Project</span><span className="btn__arrow">→</span>
            </Link>
            <a href="https://github.com/allan4931" target="_blank" rel="noreferrer" className="btn btn--outline">
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── DATA ── */
const PROJECTS = [
  {
    num: '01', tag: 'Full-Stack / DevOps', name: 'Allan Marimo Portfolio',
    desc: 'Production-ready personal portfolio — React + FastAPI + Docker + Nginx on Ubuntu VPS with SSL and CORS hardening.',
    stack: ['React 18','TypeScript','FastAPI','Docker','Nginx'],
    link: 'https://github.com/allan4931/allan-marimo-portfolio', linkLabel: 'View on GitHub',
  },
  {
    num: '02', tag: 'Backend / API', name: 'Contact Service API',
    desc: 'Hardened RESTful contact endpoint with Gmail SMTP, Pydantic v2 validation, rate-limit middleware, and zero-spam policy.',
    stack: ['FastAPI','Python 3.12','Pydantic v2','Gmail SMTP'],
    link: '#contact', linkLabel: 'See live',
  },
  {
    num: '03', tag: 'Infrastructure', name: 'VPS Deployment Stack',
    desc: 'Ubuntu 24.04 server setup: Docker Compose, Nginx reverse proxy, auto-renewing SSL, UFW firewall, SSH hardening.',
    stack: ['Ubuntu 24.04','Docker Compose','Certbot','UFW'],
    link: 'https://github.com/allan4931/allan-marimo-portfolio', linkLabel: 'View Config',
  },
  {
    num: '04', tag: 'Frontend / UX', name: 'Design System UI',
    desc: 'Component library with glassmorphism utilities, custom cursor, page transitions, and animation system built on Tailwind + Framer Motion.',
    stack: ['React','Tailwind','Framer Motion','TypeScript'],
    link: '/skills', linkLabel: 'Explore Stack',
  },
]

const EXPERIENCE = [
  {
    year: '2023 – Present', role: 'Independent Software Engineer',
    company: 'Freelance / Self-Employed — Zimbabwe',
    desc: 'Designing and delivering end-to-end systems for clients — from architecture to production deployment, specialising in React + FastAPI stacks and cloud infrastructure.',
  },
  {
    year: '2022 – 2023', role: 'Full-Stack Developer',
    company: 'Client Projects — Remote',
    desc: 'Built and maintained multiple client web applications. Introduced Docker-based deployment pipelines that cut deployment time by 60%.',
  },
  {
    year: '2021 – 2022', role: 'Junior Web Developer',
    company: 'Entry Level — Zimbabwe',
    desc: 'Started professional career building responsive frontends and REST APIs. Deep-dived into Linux server administration and networking fundamentals.',
  },
]

const VALUES = [
  { title: 'Precision First', desc: 'Every line is deliberate. I don\'t ship what I can\'t explain or defend.' },
  { title: 'Own the Full Stack', desc: 'From Figma mockup to nginx.conf — I understand and own the entire delivery chain.' },
  { title: 'Shipped > Perfect', desc: 'Engineering rigour balanced with product velocity — quality ships on a deadline.' },
]
