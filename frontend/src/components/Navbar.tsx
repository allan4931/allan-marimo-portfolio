import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiZap } from 'react-icons/fi'

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: '/',        label: 'HOME',    num: '01', path: '/index' },
  { to: '/skills',  label: 'SKILLS',  num: '02', path: '/capabilities' },
  { to: '/contact', label: 'CONTACT', num: '03', path: '/connect' },
]

// ─── CORNER BRACKET ───────────────────────────────────────────────────────────
function CornerBracket({
  position,
  size = 10,
  color = 'rgba(0,212,255,0.5)',
  animated = false,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
  color?: string
  animated?: boolean
}) {
  const borders: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, ...borders[position] }}
      animate={animated ? {
        opacity: [0.4, 1, 0.4],
      } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ─── LOGO MONOGRAM ────────────────────────────────────────────────────────────
function LogoMonogram({ small = false }: { small?: boolean }) {
  const size = small ? 36 : 42

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Diamond shape */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,212,255,0.06)',
          border: '1px solid rgba(0,212,255,0.3)',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 16px rgba(0,212,255,0.08), inset 0 0 12px rgba(0,212,255,0.04)',
        }}
        animate={{
          boxShadow: [
            '0 0 16px rgba(0,212,255,0.08)',
            '0 0 24px rgba(0,212,255,0.2)',
            '0 0 16px rgba(0,212,255,0.08)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Rotating outer diamond */}
      <motion.div
        className="absolute inset-[-4px]"
        style={{
          border: '1px solid rgba(0,212,255,0.12)',
          transform: 'rotate(45deg)',
        }}
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Letter */}
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-black text-electric"
        style={{ fontSize: small ? 14 : 17, letterSpacing: '-0.02em', textShadow: '0 0 12px rgba(0,212,255,0.6)' }}
      >
        A
      </div>
    </div>
  )
}

// ─── DESKTOP NAVBAR ───────────────────────────────────────────────────────────
function DesktopNav({ scrolled }: { scrolled: boolean }) {
  const location = useLocation()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const activeIdx = NAV_ITEMS.findIndex(n => n.to === location.pathname)

  // Sliding active indicator tracking
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const targetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx
    const el = itemRefs.current[targetIdx]
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [hoveredIdx, activeIdx, location.pathname])

  const currentItem = NAV_ITEMS[activeIdx]

  return (
    <div className="hidden lg:flex items-start justify-between px-8 pt-5 w-full pointer-events-none">

      {/* ── LEFT ISLAND: Logo ── */}
      <motion.div
        className="relative pointer-events-auto"
        initial={{ opacity: 0, x: -30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <NavLink to="/" className="block group">
          <div
            className="relative flex items-center gap-4 px-5 py-3.5 transition-all duration-500"
            style={{
              background: scrolled
                ? 'rgba(0,0,0,0.75)'
                : 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,212,255,0.12)',
              boxShadow: scrolled
                ? '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.06)'
                : '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Animated corner brackets */}
            <CornerBracket position="tl" animated />
            <CornerBracket position="br" animated />
            <CornerBracket position="tr" size={6} color="rgba(0,212,255,0.2)" />
            <CornerBracket position="bl" size={6} color="rgba(0,212,255,0.2)" />

            {/* Top scanning line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)' }}
              animate={{ opacity: [0, 1, 0], scaleX: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <LogoMonogram />

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-display font-black text-white tracking-tight transition-colors duration-300 group-hover:text-electric"
                  style={{ fontSize: 16, letterSpacing: '-0.02em' }}
                >
                  ALLAN<span className="text-electric">.</span>MARIMO
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Status dot */}
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="font-mono text-[9px] text-green-400/60 tracking-[0.25em] uppercase">
                  Available
                </span>
                <span className="font-mono text-[9px] text-white/15 mx-1">·</span>
                <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">ZW / Remote</span>
              </div>
            </div>
          </div>
        </NavLink>
      </motion.div>

      {/* ── CENTER: Current page HUD ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-5 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-px w-6 bg-electric/20" />
            <span className="font-mono text-[9px] text-white/15 tracking-[0.5em] uppercase">
              {currentItem?.path || '/index'}
            </span>
            <div className="h-px w-6 bg-electric/20" />
          </motion.div>
        </AnimatePresence>
        {/* Vertical line going down */}
        <div className="w-px h-4 bg-gradient-to-b from-electric/15 to-transparent mt-1" />
      </motion.div>

      {/* ── RIGHT ISLAND: Navigation ── */}
      <motion.div
        className="relative pointer-events-auto"
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="relative flex items-stretch transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(0,0,0,0.75)'
              : 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,212,255,0.12)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.06)'
              : '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          <CornerBracket position="tl" animated />
          <CornerBracket position="br" animated />
          <CornerBracket position="tr" size={6} color="rgba(0,212,255,0.2)" />
          <CornerBracket position="bl" size={6} color="rgba(0,212,255,0.2)" />

          {/* Sliding active indicator bar — bottom of the nav panel */}
          <motion.div
            className="absolute bottom-0 h-[2px] pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }}
            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {/* Nav items */}
          <div className="flex items-stretch divide-x divide-white/[0.06]">
            {NAV_ITEMS.map((item, i) => {
              const isActive = location.pathname === item.to
              return (
                <div
                  key={item.to}
                  ref={el => { itemRefs.current[i] = el }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <NavLink
                    to={item.to}
                    className="relative flex flex-col items-center justify-center gap-1 px-8 py-3.5 group transition-all duration-200"
                  >
                    {/* Active top accent */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-3 right-3 h-[2px]"
                          style={{
                            background: 'linear-gradient(to right, transparent, #00d4ff, transparent)',
                            boxShadow: '0 0 8px rgba(0,212,255,0.6)',
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Item number */}
                    <span
                      className="font-mono leading-none transition-all duration-300"
                      style={{
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        color: isActive ? 'rgba(0,212,255,0.8)' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Item label */}
                    <span
                      className="font-display font-bold transition-all duration-300"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        color: isActive
                          ? '#00d4ff'
                          : hoveredIdx === i
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.45)',
                        textShadow: isActive ? '0 0 12px rgba(0,212,255,0.5)' : 'none',
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Hover underline */}
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: 'rgba(0,212,255,0.3)' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredIdx === i && !isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </NavLink>
                </div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="w-px bg-white/[0.06] self-stretch" />

          {/* HIRE button */}
          <NavLink
            to="/contact"
            className="group relative flex items-center gap-2.5 px-6 py-3.5 overflow-hidden"
            onMouseEnter={() => setHoveredIdx(null)}
          >
            {/* Button fill animation */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,212,255,0.08)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <FiZap
              size={11}
              className="relative z-10 text-electric/60 group-hover:text-electric transition-colors"
            />
            <span
              className="relative z-10 font-mono font-bold tracking-[0.2em] transition-colors duration-200 group-hover:text-white"
              style={{ fontSize: 10, color: 'rgba(0,212,255,0.7)' }}
            >
              HIRE
            </span>

            {/* Right corner accent */}
            <CornerBracket position="tr" size={6} color="rgba(0,212,255,0.4)" />
            <CornerBracket position="bl" size={6} color="rgba(0,212,255,0.4)" />
          </NavLink>
        </div>

        {/* GitHub link below the nav island */}
        <motion.div
          className="flex justify-end mt-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <a
            href="https://github.com/allan4931"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/15 hover:text-electric/60 transition-colors duration-200 group"
          >
            <FiGithub size={9} />
            <span className="font-mono text-[8px] tracking-widest uppercase">allan4931</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── MOBILE MENU OVERLAY ─────────────────────────────────────────────────────
function MobileMenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => { onClose() }, [location.pathname])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Full-screen menu panel */}
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Corner decorations */}
            {(['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
              <motion.div
                key={pos}
                className={`absolute ${pos.includes('t') ? 'top-6' : 'bottom-6'} ${pos.includes('l') ? 'left-6' : 'right-6'} w-10 h-10`}
                style={{
                  borderTop: pos.includes('t') ? '1px solid rgba(0,212,255,0.3)' : 'none',
                  borderBottom: pos.includes('b') ? '1px solid rgba(0,212,255,0.3)' : 'none',
                  borderLeft: pos.includes('l') ? '1px solid rgba(0,212,255,0.3)' : 'none',
                  borderRight: pos.includes('r') ? '1px solid rgba(0,212,255,0.3)' : 'none',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              />
            ))}

            {/* Scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Grid background */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 pt-24 pb-12 pointer-events-auto">

              {/* System label */}
              <motion.div
                className="flex items-center gap-3 mb-16"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-8 h-px bg-electric/40" />
                <span className="font-mono text-[10px] text-electric/40 tracking-[0.4em] uppercase">
                  Navigation System
                </span>
              </motion.div>

              {/* Nav links — large dramatic */}
              <nav className="flex-1 flex flex-col justify-center space-y-2">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = location.pathname === item.to
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <NavLink
                        to={item.to}
                        className="group relative flex items-baseline gap-6 py-5 border-b border-white/[0.06] hover:border-electric/20 transition-colors duration-300"
                      >
                        {/* Active left bar */}
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[2px]"
                          style={{ background: 'linear-gradient(to bottom, transparent, #00d4ff, transparent)' }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        <span
                          className="font-mono font-bold shrink-0 transition-colors duration-300"
                          style={{
                            fontSize: 11,
                            letterSpacing: '0.3em',
                            color: isActive ? '#00d4ff' : 'rgba(0,212,255,0.2)',
                          }}
                        >
                          {item.num}
                        </span>

                        <span
                          className="font-display font-black transition-all duration-300 group-hover:text-white"
                          style={{
                            fontSize: 'clamp(36px, 10vw, 72px)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                          }}
                        >
                          {item.label}
                        </span>

                        {/* Arrow indicator */}
                        <motion.span
                          className="ml-auto font-mono text-sm text-electric/40"
                          initial={{ opacity: 0, x: -8 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </NavLink>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom info */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Contact quick links */}
                <div className="flex flex-wrap gap-6 text-xs font-mono text-white/20">
                  <a href="mailto:allanmarimo455@gmail.com" className="hover:text-electric transition-colors">
                    allanmarimo455@gmail.com
                  </a>
                  <a href="https://github.com/allan4931" target="_blank" rel="noopener noreferrer" className="hover:text-electric transition-colors flex items-center gap-1">
                    <FiGithub size={10} /> allan4931
                  </a>
                  <span className="text-white/10">+263 788 447 689</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="font-mono text-[9px] text-green-400/50 tracking-[0.3em] uppercase">
                    Available for Projects · Zimbabwe / Remote
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── MOBILE HEADER ────────────────────────────────────────────────────────────
function MobileHeader({
  open,
  setOpen,
  scrolled,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  scrolled: boolean
}) {
  return (
    <div
      className="lg:hidden flex items-center justify-between px-5 py-4 transition-all duration-500"
      style={{
        background: scrolled || open ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,212,255,0.08)',
      }}
    >
      {/* Mobile logo */}
      <NavLink to="/" className="flex items-center gap-3 group">
        <LogoMonogram small />
        <div>
          <div
            className="font-display font-black text-white group-hover:text-electric transition-colors"
            style={{ fontSize: 14, letterSpacing: '-0.01em' }}
          >
            ALLAN<span className="text-electric">.</span>MARIMO
          </div>
          <div className="font-mono text-[8px] text-white/20 tracking-[0.25em] uppercase">
            Software Engineer
          </div>
        </div>
      </NavLink>

      {/* Hamburger — styled as a command interface */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex flex-col gap-1.5 p-3 group"
        aria-label="Toggle menu"
      >
        {/* Current status text */}
        <span className="absolute -top-1 right-0 font-mono text-[7px] text-electric/30 tracking-widest uppercase">
          {open ? 'CLOSE' : 'MENU'}
        </span>

        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-px transition-colors duration-300"
            style={{ width: i === 1 ? 16 : 24, background: open ? '#00d4ff' : 'rgba(255,255,255,0.5)' }}
            animate={{
              rotate:
                open && i === 0 ? 45
                : open && i === 2 ? -45
                : 0,
              y:
                open && i === 0 ? 8
                : open && i === 2 ? -8
                : 0,
              opacity: open && i === 1 ? 0 : 1,
              width: open ? 24 : i === 1 ? 16 : 24,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ))}
      </button>
    </div>
  )
}

// ─── PAGE PROGRESS BAR ────────────────────────────────────────────────────────
function PageProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[2px] pointer-events-none">
      <motion.div
        className="h-full"
        style={{
          background: 'linear-gradient(to right, #00d4ff, #0066ff)',
          boxShadow: '0 0 8px rgba(0,212,255,0.6)',
          transformOrigin: 'left',
          width: `${progress}%`,
        }}
        transition={{ duration: 0.05 }}
      />
    </div>
  )
}

// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <>
      {/* Page scroll progress bar */}
      <PageProgressBar />

      {/* ── DESKTOP: Floating dual-island layout ── */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden lg:block pointer-events-none">
        <DesktopNav scrolled={scrolled} />
      </div>

      {/* ── MOBILE: Top bar + fullscreen overlay ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileHeader open={mobileOpen} setOpen={setMobileOpen} scrolled={scrolled} />
      </div>

      <MobileMenuOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}