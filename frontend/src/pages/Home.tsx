import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'

const roles = [
  'Software Engineer',
  'System Architect',
  'Cloud Specialist',
  'Automation Expert',
  'Full-Stack Developer',
]

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [speed, setSpeed] = useState(80)

  useEffect(() => {
    const current = roles[roleIndex]
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setSpeed(1800)
          setDeleting(true)
        } else {
          setSpeed(80)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        setSpeed(40)
        if (text.length === 0) {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, deleting, roleIndex, speed])

  return (
    <span className="text-electric">
      {text}
      <span className="typing-cursor" />
    </span>
  )
}

const stats = [
  { label: 'Projects Delivered', value: '20+' },
  { label: 'Technologies Mastered', value: '15+' },
  { label: 'Years of Experience', value: '4+' },
  { label: 'Cloud Deployments', value: '10+' },
]

const techLogos = [
  { name: 'React', icon: '⚛️' },
  { name: 'Python', icon: '🐍' },
  { name: 'Docker', icon: '🐳' },
  { name: 'FastAPI', icon: '🚀' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'PostgreSQL', icon: '🗄️' },
  { name: 'n8n', icon: '🟢' },
  { name: 'Nginx', icon: '⚙️' },
]

export default function Home() {
  return (
    <PageTransition>
      <div>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute inset-0 hero-glow" />

          {/* Animated orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #00d4ff, transparent)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #0066ff, transparent)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                  <span className="font-mono text-xs text-electric/80 tracking-widest uppercase">
                    Available for Freelance
                  </span>
                </motion.div>

                <motion.h1
                  className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  Hi, I'm{' '}
                  <span className="neon-text">Allan</span>
                  <br />
                  <TypingEffect />
                </motion.h1>

                <motion.blockquote
                  className="mt-8 border-l-2 border-electric pl-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="font-display text-xl text-white/90 italic leading-relaxed">
                    "We build simplicity for users.{' '}
                    <span className="text-electric not-italic">Complexity is our responsibility.</span>"
                  </p>
                </motion.blockquote>

                <motion.p
                  className="mt-6 text-white/50 font-body text-base leading-relaxed max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  I transform research into functional solutions. I design systems that scale,
                  automate processes, and deliver real-world impact. As a freelance software
                  engineer, I don't just write code — I architect digital ecosystems.
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to="/skills" className="btn-primary flex items-center gap-2">
                    View My Work <FiArrowRight />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-8 py-3 bg-electric/10 border border-electric/20 text-white/80 font-mono text-xs tracking-widest uppercase hover:bg-electric/20 transition-all duration-300"
                  >
                    Let's Talk
                  </Link>
                </motion.div>

                <motion.div
                  className="mt-8 flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <a
                    href="https://github.com/allan4931"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-electric transition-colors"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/allanmarimo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-electric transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="font-mono text-[10px] text-white/20">allan4931 on GitHub</span>
                </motion.div>
              </div>

              {/* Right: Avatar */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-electric/20"
                    style={{ margin: '-30px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Middle ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-electric/10"
                    style={{ margin: '-60px' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Avatar circle */}
                  <motion.div
                    className="w-56 h-56 md:w-72 md:h-72 rounded-full glass-card neon-border flex flex-col items-center justify-center relative overflow-hidden"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ boxShadow: '0 0 60px rgba(0,212,255,0.15), inset 0 0 60px rgba(0,212,255,0.03)' }}
                  >
                    {/* Avatar icon */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-28 h-28 md:w-36 md:h-36 text-electric/40"
                      fill="currentColor"
                    >
                      <circle cx="50" cy="38" r="18" />
                      <path d="M15 85c0-20 15-35 35-35s35 15 35 35" />
                    </svg>
                    <div className="absolute bottom-6 font-mono text-xs text-electric/50 text-center">
                      <div className="text-[9px] tracking-widest">ALLAN MARIMO</div>
                    </div>
                  </motion.div>

                  {/* Floating badges */}
                  {[
                    { label: 'React Native', pos: '-top-4 -left-8 md:-left-16', delay: 0 },
                    { label: 'FastAPI', pos: '-bottom-4 -right-6 md:-right-14', delay: 0.3 },
                    { label: 'Docker', pos: 'top-1/2 -right-10 md:-right-20', delay: 0.6 },
                  ].map(({ label, pos, delay }) => (
                    <motion.div
                      key={label}
                      className={`absolute ${pos} glass-card border border-electric/20 px-3 py-1.5 rounded-full`}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
                    >
                      <span className="font-mono text-[10px] text-electric/80">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="glass-card p-6 text-center group hover:border-electric/30 transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="font-display text-4xl font-bold text-electric group-hover:text-shadow-neon">
                    {value}
                  </div>
                  <div className="font-body text-sm text-white/40 mt-1">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-electric/40 to-transparent" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-32 relative">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <motion.div
                  className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.div>
                <motion.h2
                  className="font-display text-4xl md:text-5xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Independent Engineer
                  <br />
                  <span className="text-electric">Building What Matters</span>
                </motion.h2>

                <motion.p
                  className="mt-6 text-white/50 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  I am an independent software engineer and system architect with deep expertise
                  in cloud infrastructure, automation workflows, and full-stack development.
                  I specialise in building solutions that are not just functional — but resilient,
                  scalable, and built to last in production environments.
                </motion.p>

                <motion.p
                  className="mt-4 text-white/50 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Whether it's an offline-first mobile data collection system deployed on a 
                  secured Ubuntu VPS, a school management platform serving hundreds of students, 
                  or an automated business workflow — I engineer solutions from architecture to 
                  deployment, and I own the entire lifecycle.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: '🏗️',
                    title: 'System Architect',
                    desc: 'I design full system blueprints before writing a single line of code.',
                  },
                  {
                    icon: '☁️',
                    title: 'Cloud & VPS Specialist',
                    desc: 'Production-grade deployments on Ubuntu VPS with Nginx, Docker & HTTPS.',
                  },
                  {
                    icon: '🤖',
                    title: 'Automation Engineer',
                    desc: 'n8n workflows, API orchestration, zero-touch business process automation.',
                  },
                  {
                    icon: '📱',
                    title: 'Offline-First Mobile Dev',
                    desc: 'React Native apps that work seamlessly without internet connectivity.',
                  },
                ].map(({ icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    className="glass-card p-5 flex gap-4 hover:border-electric/25 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="text-2xl">{icon}</div>
                    <div>
                      <div className="font-display font-semibold text-white group-hover:text-electric transition-colors">
                        {title}
                      </div>
                      <div className="text-sm text-white/40 mt-1">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="py-16 border-y border-white/5 overflow-hidden">
          <div className="font-mono text-center text-xs text-white/20 tracking-widest uppercase mb-8">
            Tech Stack
          </div>
          <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...techLogos, ...techLogos].map(({ name, icon }, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 text-white/30 hover:text-electric transition-colors shrink-0"
              >
                <span className="text-xl">{icon}</span>
                <span className="font-mono text-sm">{name}</span>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #00d4ff, transparent)',
            }}
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-4">
                Ready to Build?
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Have a system in mind?
                <br />
                <span className="text-electric">Let's architect it.</span>
              </h2>
              <p className="mt-6 text-white/40 text-base">
                From idea to deployed, production-ready system — let's build something powerful together.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 mt-10">
                Start a Project <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}