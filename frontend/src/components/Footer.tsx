import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUpRight, FiMapPin, FiClock } from 'react-icons/fi'

// ─── ANIMATED LOGO ────────────────────────────────────────────────────────────
function AnimatedLogo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative select-none overflow-hidden">
      {/* Outer decorative ring */}
      <div className="flex items-center justify-center mb-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Rotating outer ring */}
          <motion.div
            className="absolute rounded-full border border-electric/8"
            style={{ inset: '-48px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          {/* Rotating middle ring (opposite) */}
          <motion.div
            className="absolute rounded-full border border-electric/5"
            style={{ inset: '-24px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          {/* Pulsing inner glow */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: '-12px', background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Central avatar icon */}
          <div
            className="relative z-10 w-24 h-24 rounded-full border border-electric/25 flex items-center justify-center"
            style={{
              background: 'rgba(0,212,255,0.04)',
              boxShadow: '0 0 60px rgba(0,212,255,0.12), inset 0 0 40px rgba(0,212,255,0.03)',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-14 h-14 text-electric/40" fill="currentColor">
              <circle cx="50" cy="36" r="16" />
              <path d="M14 83c0-19 16-33 36-33s36 14 36 33" />
            </svg>

            {/* Orbit dot */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-electric"
              style={{
                top: '50%', left: '50%',
                boxShadow: '0 0 8px #00d4ff',
                transformOrigin: '0 0',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              initial={{ rotate: 0 }}
            >
              <div style={{ position: 'absolute', left: '-50px', top: '-1px', width: '50px', height: '2px' }} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* The giant ALLAN MARIMO text */}
      <div className="text-center relative">
        {/* Behind-text glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05), transparent)' }}
        />

        {'ALLAN MARIMO'.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block font-display font-black"
            style={{
              fontSize: 'clamp(40px, 8vw, 100px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: char === ' ' ? 'transparent' : 'white',
              textShadow: char !== ' ' ? '0 0 80px rgba(0,212,255,0.06)' : 'none',
            }}
            initial={{ opacity: 0, y: 40, rotateX: -60 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{
              color: '#00d4ff',
              textShadow: '0 0 30px rgba(0,212,255,0.8), 0 0 60px rgba(0,212,255,0.3)',
              y: -4,
              transition: { duration: 0.2 },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}

        {/* Subtitle */}
        <motion.div
          className="mt-4 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="h-px w-12 bg-electric/30" />
          <span className="font-mono text-xs tracking-[0.5em] text-electric/50 uppercase">
            Independent Software Engineer
          </span>
          <div className="h-px w-12 bg-electric/30" />
        </motion.div>

        {/* Philosophy */}
        <motion.p
          className="mt-5 font-display text-white/20 italic text-lg font-light"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          "We build simplicity for users. Complexity is our responsibility."
        </motion.p>
      </div>
    </div>
  )
}

// ─── FOOTER COLUMNS DATA ──────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home', to: '/', desc: 'Start here' },
  { label: 'Skills & Projects', to: '/skills', desc: 'Technical capabilities' },
  { label: 'Contact', to: '/contact', desc: 'Get in touch' },
]

const capabilities = [
  'Full-Stack Web Applications',
  'React Native Mobile Apps',
  'School Management ERP',
  'FastAPI Backend Systems',
  'n8n Workflow Automation',
  'VPS Cloud Deployment',
  'Docker Containerisation',
  'System Architecture',
  'DevOps & Security',
  'Database Design',
]

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Nginx', category: 'Infrastructure' },
  { name: 'Ubuntu', category: 'Server' },
  { name: 'n8n', category: 'Automation' },
  { name: 'Python', category: 'Language' },
  { name: 'Tailwind', category: 'CSS' },
]

const socials = [
  { Icon: FiGithub, href: 'https://github.com/allan4931', label: 'GitHub', handle: '@allan4931' },
  { Icon: FiLinkedin, href: 'https://linkedin.com/in/allanmarimo', label: 'LinkedIn', handle: 'allanmarimo' },
  { Icon: FiMail, href: 'mailto:allanmarimo455@gmail.com', label: 'Email', handle: 'allanmarimo455@gmail.com' },
  { Icon: FiPhone, href: 'tel:+263788447689', label: 'WhatsApp', handle: '+263 788 447 689' },
]

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const marqueeItems = [
  '⚡ Available for Projects',
  '◈ React + FastAPI + Docker',
  '⚡ School Management ERP',
  '◈ Offline-First Mobile Apps',
  '⚡ Ubuntu VPS Deployments',
  '◈ n8n Workflow Automation',
  '⚡ System Architecture',
  '◈ github.com/allan4931',
]

function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-electric/10 py-4" style={{ background: 'rgba(0,212,255,0.02)' }}>
      <div
        className="flex gap-10 whitespace-nowrap font-mono text-xs text-electric/40 tracking-widest"
        style={{ animation: 'marqueeScroll 30s linear infinite' }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="shrink-0">{item}</span>
        ))}
      </div>
    </div>
  )
}

// ─── STAT PILL ────────────────────────────────────────────────────────────────
function StatPill({ val, label }: { val: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      className="text-center p-5 border border-white/5"
      style={{ background: 'rgba(255,255,255,0.015)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="font-display font-black text-3xl text-electric mb-1">{val}</div>
      <div className="font-mono text-[9px] text-white/25 tracking-widest uppercase">{label}</div>
    </motion.div>
  )
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,212,255,0.03), transparent)' }} />

      {/* ── ANIMATED LOGO SECTION ── */}
      <div className="relative z-10 py-20 px-6 border-b border-white/5">
        <AnimatedLogo />
      </div>

      {/* ── MARQUEE ── */}
      <div className="relative z-10">
        <MarqueeStrip />
      </div>

      {/* ── STATS ROW ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatPill val="20+" label="Projects Shipped" />
          <StatPill val="4+" label="Years Building" />
          <StatPill val="42d" label="Longest Server Uptime" />
          <StatPill val="15+" label="Technologies Mastered" />
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-display font-black text-2xl text-white mb-1">
                Allan <span className="text-electric">Marimo</span>
              </div>
              <div className="font-mono text-[9px] text-electric/40 tracking-[0.35em] uppercase">
                Software Engineer
              </div>
            </div>

            <p className="text-white/35 text-sm leading-relaxed mb-6">
              Independent software engineer specialising in full-stack systems,
              offline-first mobile applications, school management ERP platforms
              and cloud infrastructure.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <FiMapPin size={11} className="text-electric/40" />
                Zimbabwe · Available Globally
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <FiClock size={11} className="text-electric/40" />
                Response within 24 hours
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="text-green-400/70 font-mono text-[10px] tracking-widest uppercase">Available Now</span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/8 flex items-center justify-center text-white/30 hover:text-electric hover:border-electric/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-6">Navigation</div>
            <div className="space-y-4">
              {navLinks.map(({ label, to, desc }) => (
                <Link key={to} to={to}
                  className="group flex items-start gap-3 text-white/40 hover:text-white transition-colors duration-200">
                  <FiArrowUpRight size={12} className="mt-0.5 shrink-0 text-electric/30 group-hover:text-electric transition-colors" />
                  <div>
                    <div className="text-sm font-display font-semibold group-hover:text-white transition-colors">{label}</div>
                    <div className="text-xs text-white/20 font-mono">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-6">Contact</div>
              <div className="space-y-3">
                {socials.map(({ Icon, href, label, handle }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/30 hover:text-electric transition-colors">
                    <Icon size={12} className="shrink-0" />
                    <span className="font-mono text-xs truncate">{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Capabilities */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-6">Capabilities</div>
            <div className="space-y-2.5">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  className="flex items-center gap-2.5 text-xs text-white/35 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="w-1 h-1 rounded-full bg-electric/30 group-hover:bg-electric/70 transition-colors shrink-0" />
                  <span className="group-hover:text-white/60 transition-colors">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Col 4: Tech Stack */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-6">Tech Stack</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map(({ name, category }) => (
                <div key={name}
                  className="group flex flex-col border border-white/5 px-2.5 py-1.5 hover:border-electric/20 transition-colors">
                  <span className="font-mono text-xs text-white/50 group-hover:text-electric/80 transition-colors">{name}</span>
                  <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">{category}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="border border-electric/15 p-5" style={{ background: 'rgba(0,212,255,0.03)' }}>
              <div className="font-mono text-[10px] text-electric/50 tracking-widest uppercase mb-3">Ready to start?</div>
              <p className="text-xs text-white/40 mb-4 leading-relaxed">
                Bring your project idea. I'll bring the architecture, the code and the deployment.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 font-mono text-xs text-electric border border-electric/30 px-4 py-2.5 hover:bg-electric/8 hover:border-electric/60 transition-all duration-300">
                Let's Build <FiArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-[10px] text-white/20 text-center md:text-left">
              © {new Date().getFullYear()} Allan Marimo. All rights reserved.
              <span className="mx-2 text-white/10">·</span>
              Built with React, TypeScript & Framer Motion.
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">All systems operational</span>
              </div>
              <div className="font-mono text-[9px] text-electric/30 tracking-widest uppercase">
                allan4931 · github
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── VERY BOTTOM: giant faded wordmark ── */}
      <div className="relative z-10 pb-0 overflow-hidden border-t border-white/[0.03]">
        <div
          className="text-center font-display font-black pointer-events-none select-none leading-none"
          style={{
            fontSize: 'clamp(60px, 16vw, 200px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.03)',
            letterSpacing: '-0.02em',
            marginBottom: '-0.08em',
          }}
        >
          MARIMO
        </div>
      </div>
    </footer>
  )
}