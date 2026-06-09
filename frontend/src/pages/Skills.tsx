import { useEffect } from 'react'
import './Skills.css'
import globeSvg  from '../assets/svg/skill-globe.svg'
import laptopSvg from '../assets/svg/laptop-3d.svg'

const SKILLS: { name: string; level: string; pct: number; cat: string; icon: string }[] = [
  { name: 'React 18',     level: 'Expert',       pct: 92, cat: 'Frontend',  icon: '⚛' },
  { name: 'TypeScript',   level: 'Expert',       pct: 88, cat: 'Frontend',  icon: '🔷' },
  { name: 'Tailwind CSS', level: 'Expert',       pct: 93, cat: 'Frontend',  icon: '🌊' },
  { name: 'Framer Motion',level: 'Advanced',     pct: 76, cat: 'Frontend',  icon: '🎭' },
  { name: 'Python 3.12',  level: 'Expert',       pct: 90, cat: 'Backend',   icon: '🐍' },
  { name: 'FastAPI',      level: 'Expert',       pct: 85, cat: 'Backend',   icon: '⚡' },
  { name: 'Pydantic v2',  level: 'Advanced',     pct: 83, cat: 'Backend',   icon: '📐' },
  { name: 'REST APIs',    level: 'Expert',       pct: 94, cat: 'Backend',   icon: '🌐' },
  { name: 'PostgreSQL',   level: 'Advanced',     pct: 84, cat: 'Database',  icon: '🐘' },
  { name: 'Redis',        level: 'Advanced',     pct: 78, cat: 'Database',  icon: '🔴' },
  { name: 'SQLAlchemy',   level: 'Advanced',     pct: 80, cat: 'Database',  icon: '⚙' },
  { name: 'Docker',       level: 'Expert',       pct: 87, cat: 'DevOps',    icon: '🐳' },
  { name: 'Nginx',        level: 'Advanced',     pct: 82, cat: 'DevOps',    icon: '☁' },
  { name: 'Linux/Ubuntu', level: 'Expert',       pct: 89, cat: 'DevOps',    icon: '🔧' },
  { name: 'Git / GitHub', level: 'Expert',       pct: 95, cat: 'DevOps',    icon: '🔗' },
  { name: 'JWT / OAuth',  level: 'Advanced',     pct: 80, cat: 'Security',  icon: '🔑' },
  { name: 'Let\'s Encrypt',level: 'Advanced',    pct: 86, cat: 'Security',  icon: '🔒' },
]

const CATS = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Security']

export default function Skills() {
  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Skill bar animation on enter
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const bar = e.target.querySelector<HTMLElement>('.skill-bar__fill')
            if (bar) {
              const w = bar.dataset.width ?? '0'
              setTimeout(() => { bar.style.width = w + '%' }, 150)
            }
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.skill-card').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="section skills-hero">
        <div className="skills-hero__bg" />
        <div className="skills-hero__content">
          <div className="section-tag reveal">
            <div className="section-tag__line" />
            <span className="section-tag__text">Technical Arsenal</span>
          </div>
          <h1 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
            MY <span>STACK</span>
          </h1>
          <p className="section-body reveal" style={{ transitionDelay: '.2s' }}>
            Sixteen battle-tested technologies wielded across every layer of modern software —
            from pixel-perfect UIs to cloud infrastructure and database architecture.
          </p>
        </div>
        <div className="skills-hero__globe reveal-right" style={{ transitionDelay: '.3s' }}>
          <img src={globeSvg} alt="Technology skill globe" className="globe-img" />
          <div className="globe-glow" />
        </div>
      </section>

      {/* ── SKILL CARDS ── */}
      <section className="section section--dark">
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="skill-card reveal"
              style={{ transitionDelay: `${(i % 8) * 0.07}s` }}
            >
              <div className="skill-card__header">
                <span className="skill-card__icon">{s.icon}</span>
                <span className="skill-card__cat">{s.cat}</span>
              </div>
              <div className="skill-card__name">{s.name}</div>
              <div className="skill-card__level">{s.level}</div>
              <div className="skill-bar">
                <div
                  className="skill-bar__fill"
                  data-width={s.pct}
                  style={{ width: 0 }}
                />
              </div>
              <span className="skill-card__pct">{s.pct}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS & SOFTWARE ── */}
      <section className="section tools-section">
        <div className="tools-inner">
          <div>
            <div className="section-tag reveal">
              <div className="section-tag__line" />
              <span className="section-tag__text">Tools & Environment</span>
            </div>
            <h2 className="section-title reveal" style={{ transitionDelay: '.1s' }}>
              HOW I <span>WORK</span>
            </h2>
            <p className="section-body reveal" style={{ transitionDelay: '.2s' }}>
              My daily driver setup for productive, distraction-free engineering.
            </p>
            <div className="tools-list">
              {TOOLS.map((t, i) => (
                <div key={t.name} className="tool-row reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <span className="tool-row__icon">{t.icon}</span>
                  <span className="tool-row__name">{t.name}</span>
                  <span className="tool-row__desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tools-laptop reveal-right">
            <img src={laptopSvg} alt="Developer laptop" className="tools-laptop__img" />
            <div className="tools-laptop__glow" />
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="section section--darker philosophy">
        <div className="section-tag reveal" style={{ justifyContent: 'center' }}>
          <div className="section-tag__line" />
          <span className="section-tag__text">Engineering Philosophy</span>
          <div className="section-tag__line" />
        </div>
        <h2 className="section-title reveal" style={{ transitionDelay: '.1s', textAlign: 'center' }}>
          HOW I <span>THINK</span>
        </h2>
        <div className="philosophy-grid">
          {PHILOSOPHY.map((p, i) => (
            <div key={p.title} className="philosophy-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="philosophy-card__num">0{i + 1}</span>
              <h3 className="philosophy-card__title">{p.title}</h3>
              <p className="philosophy-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const TOOLS = [
  { icon: '💻', name: 'VS Code',       desc: 'Primary IDE with Vim keybindings' },
  { icon: '🐧', name: 'Ubuntu Linux',  desc: 'Daily driver OS' },
  { icon: '🐳', name: 'Docker Desktop',desc: 'Local containerisation & testing' },
  { icon: '📮', name: 'Postman',       desc: 'API development & testing' },
  { icon: '🐙', name: 'GitHub',        desc: 'Version control & CI/CD' },
  { icon: '🖥',  name: 'Terminal',      desc: 'Zsh + Oh-My-Zsh + tmux' },
  { icon: '🗃',  name: 'TablePlus',    desc: 'Database GUI' },
  { icon: '🌐', name: 'Figma',         desc: 'UI design & wireframing' },
]

const PHILOSOPHY = [
  {
    title: 'Precision Over Speed',
    desc: 'Every decision is deliberate. I write code I can read six months later and defend to a senior reviewer.',
  },
  {
    title: 'Own the Full Chain',
    desc: 'From Figma file to nginx.conf — understanding the full delivery chain means no blind spots.',
  },
  {
    title: 'Fail Loudly in Dev',
    desc: 'Hard errors in development. Silent recovery in production. Monitoring for everything in between.',
  },
  {
    title: 'Ship Then Improve',
    desc: 'Perfect is the enemy of shipped. I balance engineering rigour with real-world delivery timelines.',
  },
  {
    title: 'Security by Default',
    desc: 'CORS, rate limiting, SSL, JWT scopes, and input validation are not afterthoughts — they\'re in the template.',
  },
  {
    title: 'Document Everything',
    desc: 'Clear READMEs, inline comments for the non-obvious, and thorough API docs as a first-class deliverable.',
  },
]
