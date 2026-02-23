import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiArrowDownRight, FiGithub, FiLinkedin,
  FiCode, FiServer, FiCloud, FiZap, FiTerminal, FiLayers,
  FiCpu, FiActivity, FiShield, FiDatabase
} from 'react-icons/fi'
import PageTransition from '../components/PageTransition'

// ─── TYPING EFFECT ───────────────────────────────────────────────────────────
const roles = [
  'Software Engineer',
  'System Architect',
  'Cloud Specialist',
  'Automation Engineer',
  'Full-Stack Builder',
  'Problem Solver',
]

function TypingEffect() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  const [spd, setSpd] = useState(80)

  useEffect(() => {
    const cur = roles[idx]
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1))
        if (text.length + 1 === cur.length) { setSpd(2000); setDel(true) } else setSpd(80)
      } else {
        setText(cur.slice(0, text.length - 1))
        setSpd(40)
        if (text.length === 0) { setDel(false); setIdx(i => (i + 1) % roles.length) }
      }
    }, spd)
    return () => clearTimeout(t)
  }, [text, del, idx, spd])

  return (
    <span className="relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#00aaff] to-[#0066ff]">
        {text}
      </span>
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
        style={{
          background: '#00d4ff',
          boxShadow: '0 0 12px #00d4ff, 0 0 24px #00d4ff',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  )
}

// ─── PARTICLE FIELD ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    const count = Math.min(80, Math.floor((w * h) / 12000))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 60
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 text-[#ff0040] opacity-0 group-hover:opacity-60 transition-none pointer-events-none"
        style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)', transform: 'translateX(-2px)', animation: 'none' }}
        aria-hidden
      >{children}</span>
      <span
        className="absolute inset-0 text-[#00d4ff] opacity-0 group-hover:opacity-60 transition-none pointer-events-none"
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 75%, 0 75%)', transform: 'translateX(2px)' }}
        aria-hidden
      >{children}</span>
    </span>
  )
}

// ─── MAGNETIC BUTTON ─────────────────────────────────────────────────────────
function MagneticButton({ children, className, to }: { children: React.ReactNode; className?: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div style={{ x: sx, y: sy }}>
        <Link to={to} className={className}>{children}</Link>
      </motion.div>
    </div>
  )
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ label, title, accent, sub }: { label: string; title: string; accent?: string; sub?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mb-20">
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="w-8 h-px bg-electric" />
        <span className="font-mono text-xs text-electric/70 tracking-[0.35em] uppercase">{label}</span>
        <div className="flex-1 h-px bg-white/5" />
      </motion.div>

      <motion.h2
        className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {title}{' '}
        {accent && <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-[#0066ff]">{accent}</span>}
      </motion.h2>

      {sub && (
        <motion.p
          className="mt-5 text-white/40 text-base md:text-lg max-w-2xl leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: FiLayers, num: '01',
    title: 'Full-Stack Architecture',
    desc: 'I don\'t build features — I engineer entire digital systems. From database schema to deployment pipeline, I own the whole stack.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    color: '#00d4ff',
  },
  {
    icon: FiCloud, num: '02',
    title: 'Cloud & VPS Infrastructure',
    desc: 'Production-grade Ubuntu servers, Nginx reverse proxies, SSL certificates, and multi-instance deployments that run 24/7 without hand-holding.',
    tags: ['Ubuntu', 'Nginx', 'Let\'s Encrypt', 'SSH'],
    color: '#0099ff',
  },
  {
    icon: FiZap, num: '03',
    title: 'Workflow Automation',
    desc: 'n8n pipelines that eliminate repetitive human tasks. API orchestration that connects disparate systems into seamless, self-operating workflows.',
    tags: ['n8n', 'API', 'Webhooks', 'Scheduling'],
    color: '#00ccaa',
  },
  {
    icon: FiDatabase, num: '04',
    title: 'Offline-First Mobile Apps',
    desc: 'React Native applications that work in zero-connectivity environments. Field-grade, battle-tested, syncing data the moment signal returns.',
    tags: ['React Native', 'SQLite', 'Sync', 'Offline'],
    color: '#6633ff',
  },
  {
    icon: FiShield, num: '05',
    title: 'School Management Systems',
    desc: 'Complete ERP platforms for African educational institutions — multi-role, multi-campus, multi-term. Replacing paper chaos with digital clarity.',
    tags: ['ERP', 'Multi-Role', 'Reports', 'Offline'],
    color: '#ff6600',
  },
  {
    icon: FiCpu, num: '06',
    title: 'DevOps & Security',
    desc: 'Hardened infrastructure with SSH key-only access, disabled root login, automated certificate renewal and firewall rules locked down tight.',
    tags: ['UFW', 'SSH Keys', 'Certbot', 'Hardening'],
    color: '#ff3366',
  },
]

function ServiceCard({ svc, idx }: { svc: typeof services[0]; idx: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <motion.div
      ref={ref}
      className="relative group border border-white/5 p-8 overflow-hidden transition-all duration-500"
      style={{ background: 'rgba(255,255,255,0.015)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, borderColor: `${svc.color}30` }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% -10%, ${svc.color}08, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${svc.color}, transparent)` }}
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : '40%' }}
        transition={{ duration: 0.4 }}
      />

      {/* Number */}
      <div className="flex items-start justify-between mb-8">
        <motion.div
          className="w-12 h-12 flex items-center justify-center border"
          style={{ borderColor: `${svc.color}30`, background: `${svc.color}08` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon size={20} style={{ color: svc.color }} />
        </motion.div>
        <span
          className="font-mono text-5xl font-black leading-none opacity-10 group-hover:opacity-20 transition-opacity"
          style={{ color: svc.color }}
        >
          {svc.num}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
        {svc.title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed mb-6">{svc.desc}</p>

      <div className="flex flex-wrap gap-2">
        {svc.tags.map(tag => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2.5 py-1 border tracking-widest uppercase"
            style={{ borderColor: `${svc.color}25`, color: `${svc.color}80` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Corner decoration */}
      <div
        className="absolute bottom-4 right-4 w-8 h-8 border-b border-r opacity-20 group-hover:opacity-60 transition-opacity"
        style={{ borderColor: svc.color }}
      />
    </motion.div>
  )
}

// ─── PHILOSOPHY SECTION ──────────────────────────────────────────────────────
const philosophyItems = [
  {
    symbol: '∑',
    title: 'Systems Over Features',
    body: 'I think in ecosystems, not components. Every module I write anticipates what comes next — the integrations, the edge cases, the day it needs to scale 10x without rewriting anything.',
  },
  {
    symbol: '∞',
    title: 'Offline Is a Right',
    body: 'Internet access is not guaranteed. I build applications that function fully without connectivity and sync gracefully when signal returns. Reliability is non-negotiable.',
  },
  {
    symbol: '⟁',
    title: 'Security by Default',
    body: 'I disable root login before I write my first endpoint. SSH keys before passwords. HTTPS before anything goes live. Security is architecture, not an afterthought.',
  },
  {
    symbol: '◈',
    title: 'Research-Driven Solutions',
    body: 'I don\'t guess. I study the problem domain, map the data flows, prototype the architecture, and then I build. Every solution is grounded in evidence, not assumption.',
  },
]

function PhilosophyCard({ item, idx }: { item: typeof philosophyItems[0]; idx: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="relative p-8 border border-white/5 group"
      style={{ background: 'rgba(255,255,255,0.015)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
    >
      <div className="font-display text-6xl font-black text-electric/10 group-hover:text-electric/20 transition-colors mb-6 leading-none">
        {item.symbol}
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-3">{item.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
      />
    </motion.div>
  )
}

// ─── LIVE TERMINAL ────────────────────────────────────────────────────────────
const termLines = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: 'allan-marimo :: software-engineer' },
  { type: 'cmd', text: '$ cat skills.json | jq \'.top\'', delay: 600 },
  { type: 'out', text: '["FastAPI", "React", "Docker", "PostgreSQL", "n8n"]', delay: 800 },
  { type: 'cmd', text: '$ docker ps', delay: 1400 },
  { type: 'out', text: 'CONTAINER   IMAGE       STATUS      PORTS', delay: 1600 },
  { type: 'out', text: 'portfolio   nginx       Up 42d      0.0.0.0:443->80', delay: 1700 },
  { type: 'out', text: 'api-prod    fastapi     Up 42d      0.0.0.0:8000->8000', delay: 1800 },
  { type: 'cmd', text: '$ git log --oneline -3', delay: 2400 },
  { type: 'out', text: 'a7f3c2b feat: offline sync implemented ✓', delay: 2600 },
  { type: 'out', text: 'd94e1a0 feat: school ERP multi-role auth', delay: 2700 },
  { type: 'out', text: '8bc23f1 deploy: vps hardened, ssl live', delay: 2800 },
  { type: 'cmd', text: '$ echo "ready for your project"', delay: 3400 },
  { type: 'out', text: 'ready for your project ✦', delay: 3600 },
]

function LiveTerminal() {
  const [visible, setVisible] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    termLines.forEach((_, i) => {
      setTimeout(() => setVisible(v => v + 1), (i * 200) + (termLines[i]?.delay || 0) - (i * 200) + i * 180)
    })
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative rounded-none border border-white/8 overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="font-mono text-xs text-white/20 ml-3 tracking-widest">allan@vps-production:~</span>
        <div className="ml-auto flex items-center gap-1">
          <FiActivity size={10} className="text-green-400/50" />
          <span className="font-mono text-[9px] text-green-400/50">LIVE</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-64 font-mono text-sm space-y-1.5">
        {termLines.slice(0, visible).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={line.type === 'cmd' ? 'text-electric' : 'text-white/50'}
          >
            {line.text}
          </motion.div>
        ))}
        {visible < termLines.length && (
          <span className="inline-block w-2 h-4 bg-electric animate-pulse align-middle" />
        )}
      </div>
    </div>
  )
}

// ─── TESTIMONIAL / IMPACT STATEMENTS ─────────────────────────────────────────
const impacts = [
  { quote: 'Systems that run in the field without internet. Data that syncs when signal returns. Applications that don\'t apologise for the environment they\'re deployed in.', attr: 'Offline-First Philosophy' },
  { quote: 'A school management platform doesn\'t just store grades — it replaces the entire paper-based administrative chaos of a real institution with structured digital clarity.', attr: 'ERP System Design' },
  { quote: 'When I deploy to production, I\'m not copying files. I push to GitHub, the pipeline runs, containers rebuild. No SSH file drops. No manual steps. Reproducible, always.', attr: 'Deployment Philosophy' },
]

function ImpactSlider() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % impacts.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="min-h-[160px] flex flex-col justify-between"
        >
          <p className="font-display text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
            "{impacts[active].quote}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-px bg-electric" />
            <span className="font-mono text-xs text-electric/60 tracking-widest uppercase">
              {impacts[active].attr}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mt-8">
        {impacts.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-px transition-all duration-500 ${i === active ? 'w-12 bg-electric' : 'w-4 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── TECH ORBIT ───────────────────────────────────────────────────────────────
const orbitTechs = [
  { label: 'React', angle: 0 },
  { label: 'FastAPI', angle: 45 },
  { label: 'Docker', angle: 90 },
  { label: 'PostgreSQL', angle: 135 },
  { label: 'Nginx', angle: 180 },
  { label: 'Ubuntu', angle: 225 },
  { label: 'TypeScript', angle: 270 },
  { label: 'n8n', angle: 315 },
]

function TechOrbit() {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-electric/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border border-electric/5"
        style={{ inset: '20%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Centre avatar */}
      <div className="absolute inset-[30%] rounded-full border border-electric/30 flex items-center justify-center"
        style={{ background: 'rgba(0,212,255,0.05)', boxShadow: '0 0 40px rgba(0,212,255,0.1)' }}>
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-electric/50" fill="currentColor">
          <circle cx="50" cy="36" r="17" />
          <path d="M14 84c0-19 16-34 36-34s36 15 36 34" />
        </svg>
      </div>

      {/* Orbiting techs */}
      {orbitTechs.map(({ label, angle }, i) => {
        const rad = ((angle) * Math.PI) / 180
        const r = 120
        const cx = 144 + Math.cos(rad) * r
        const cy = 144 + Math.sin(rad) * r
        return (
          <motion.div
            key={label}
            className="absolute font-mono text-[10px] text-electric/60 px-2 py-0.5 border border-electric/15 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${((cx / 288) * 100)}%`, top: `${((cy / 288) * 100)}%`, background: 'rgba(0,0,0,0.8)' }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
          >
            {label}
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── MAIN HOMEPAGE COMPONENT ──────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  const stats = [
    { val: 20, suffix: '+', label: 'Projects Shipped', icon: FiCode },
    { val: 15, suffix: '+', label: 'Technologies', icon: FiLayers },
    { val: 42, suffix: 'd', label: 'Longest Uptime', icon: FiServer },
    { val: 4, suffix: '+', label: 'Years Building', icon: FiTerminal },
  ]

  return (
    <PageTransition>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gridPulse { 0%,100%{opacity:0.03} 50%{opacity:0.06} }
        @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Layered backgrounds */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            animation: 'gridPulse 4s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0,212,255,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,80,255,0.06) 0%, transparent 60%)' }} />

        {/* Particle canvas */}
        <ParticleField />

        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)' }}
          animate={{ top: ['-2%', '102%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        />

        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-10 w-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT ── */}
            <div>
              {/* Status badge */}
              <motion.div
                className="inline-flex items-center gap-3 border border-electric/20 px-5 py-2.5 mb-10"
                style={{ background: 'rgba(0,212,255,0.04)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="font-mono text-xs text-white/60 tracking-[0.3em] uppercase">Available for Projects</span>
                <span className="font-mono text-xs text-electric/40">·</span>
                <span className="font-mono text-xs text-white/30">ZW / Remote</span>
              </motion.div>

              {/* Name headline */}
              <div className="overflow-hidden mb-2">
                <motion.div
                  className="font-mono text-sm text-electric/40 tracking-[0.4em] uppercase mb-3"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  &lt;engineer/&gt;
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="font-display font-black leading-[0.9] tracking-tight"
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="block text-6xl md:text-7xl xl:text-8xl text-white"><GlitchText>Allan</GlitchText></span>
                  <span className="block text-6xl md:text-7xl xl:text-8xl text-white"><GlitchText>Marimo</GlitchText></span>
                </motion.h1>
              </div>

              {/* Role typing */}
              <motion.div
                className="mt-6 text-2xl md:text-3xl font-display font-light h-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <TypingEffect />
              </motion.div>

              {/* Philosophy quote */}
              <motion.div
                className="mt-10 relative pl-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: 'linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.1))' }} />
                <p className="font-display text-xl text-white/70 italic leading-relaxed">
                  "We build simplicity for users.<br />
                  <span className="text-electric not-italic font-medium">Complexity is our responsibility.</span>"
                </p>
              </motion.div>

              <motion.p
                className="mt-6 text-white/40 leading-relaxed text-base max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                I transform research into functional solutions. I design systems that scale,
                automate processes, and deliver real-world impact. As a freelance software
                engineer, I don't just write code — I architect digital ecosystems.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-12 flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <MagneticButton
                  to="/skills"
                  className="group flex items-center gap-3 border border-electric px-8 py-4 font-mono text-sm text-electric tracking-widest uppercase transition-all duration-300 hover:bg-electric/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                >
                  Explore My Work
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </MagneticButton>

                <MagneticButton
                  to="/contact"
                  className="group flex items-center gap-3 px-8 py-4 font-mono text-sm text-white/50 tracking-widest uppercase transition-all duration-300 hover:text-electric"
                >
                  Let's Build
                  <FiArrowDownRight className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </MagneticButton>
              </motion.div>

              {/* Socials */}
              <motion.div
                className="mt-10 flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                {[
                  { Icon: FiGithub, href: 'https://github.com/allan4931', label: 'github.com/allan4931' },
                  { Icon: FiLinkedin, href: 'https://linkedin.com/in/allanmarimo', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/25 hover:text-electric transition-colors duration-300 group">
                    <Icon size={16} />
                    <span className="font-mono text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Tech Orbit + Terminal ── */}
            <motion.div
              className="hidden lg:flex flex-col gap-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <TechOrbit />
              <LiveTerminal />
            </motion.div>
          </div>

          {/* ── STATS BAR ── */}
          <motion.div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px border border-white/5"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {stats.map(({ val, suffix, label, icon: Icon }, i) => (
              <div key={label} className={`p-8 relative group border-white/5 ${i < 3 ? 'border-r' : ''}`}>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.05), transparent)' }}
                />
                <Icon size={16} className="text-electric/40 mb-3" />
                <div className="font-display text-5xl font-black text-white mb-1">
                  <Counter value={val} suffix={suffix} />
                </div>
                <div className="font-mono text-xs text-white/30 tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div
            className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Scroll
          </motion.div>
          <motion.div
            className="w-px h-16 origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </section>

      {/* ── SERVICES SECTION ────────────────────────────────────────────────── */}
      <section className="py-36 relative">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="What I Do"
            title="Services &"
            accent="Specialisations"
            sub="Six disciplines. Every one built on real production experience — not tutorials, not sandboxes. Live systems serving real users."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY SECTION ──────────────────────────────────────────────── */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.04), transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <SectionHeader
                label="Engineering Principles"
                title="How I"
                accent="Think"
                sub="Four principles that shape every system I build. Not buzzwords — real commitments that determine architecture decisions from day one."
              />

              <ImpactSlider />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {philosophyItems.map((item, i) => (
                <PhilosophyCard key={item.title} item={item} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IDENTITY STRIP ──────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5 overflow-hidden relative">
        <div className="absolute inset-0" style={{ background: 'rgba(0,212,255,0.015)' }} />

        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div
            className="font-display font-black whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(80px, 18vw, 220px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,212,255,0.04)',
              letterSpacing: '-0.02em',
            }}
          >
            ARCHITECT
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { emoji: '🏗️', title: 'Independent Software Engineer', desc: 'Freelance. Contract. Consulting. I work with clients directly — no agency middlemen, no inflated timelines.' },
              { emoji: '🌍', title: 'Based in Zimbabwe, Working Globally', desc: 'Remote-first. VPS deployments, GitHub-based workflows and async communication make geography irrelevant.' },
              { emoji: '📐', title: 'Blueprint Before Brick', desc: 'I prototype the architecture before writing production code. Every system starts with a diagram, not a keyboard.' },
            ].map(({ emoji, title, desc }, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true })
              return (
                <motion.div key={title} ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.4))' }}>{emoji}</div>
                  <h3 className="font-display font-bold text-lg text-white mb-3">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────────────────── */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,212,255,0.06), transparent)' }} />

        {/* Horizontal lines */}
        {[15, 35, 55, 75].map(pct => (
          <div key={pct} className="absolute left-0 right-0 h-px" style={{ top: `${pct}%`, background: `rgba(0,212,255,0.04)` }} />
        ))}

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-xs text-electric/50 tracking-[0.5em] uppercase mb-8">
              ◆ Let's Collaborate ◆
            </div>

            <h2
              className="font-display font-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
            >
              <span className="text-white">Have a system</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-[#00aaff] to-[#0055ff]">
                in mind?
              </span>
            </h2>

            <p className="mt-10 text-white/40 text-lg leading-relaxed max-w-2xl mx-auto">
              From architecture blueprint to production deployment — I handle the full lifecycle.
              Bring your idea. I'll bring the system.
            </p>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/contact"
                className="group relative flex items-center gap-3 border border-electric px-10 py-5 font-mono text-sm text-electric tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,212,255,0.25)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Let's Architect It
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.1), rgba(0,212,255,0.05))' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </Link>

              <a
                href="mailto:allanmarimo455@gmail.com"
                className="font-mono text-sm text-white/30 tracking-widest uppercase hover:text-electric transition-colors flex items-center gap-2"
              >
                allanmarimo455@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}