import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills & Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-electric/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="group flex items-center gap-3">
            <motion.div
              className="w-8 h-8 border border-electric/60 flex items-center justify-center relative"
              whileHover={{ scale: 1.1, borderColor: '#00d4ff' }}
              style={{ boxShadow: '0 0 10px rgba(0,212,255,0.2)' }}
            >
              <span className="font-display font-bold text-electric text-sm">A</span>
              <motion.div
                className="absolute inset-0 border border-electric/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <div>
              <span className="font-display font-bold text-white text-lg tracking-tight group-hover:text-electric transition-colors duration-300">
                Allan Marimo
              </span>
              <div className="font-mono text-[9px] text-electric/50 tracking-[0.25em] uppercase -mt-0.5">
                Software Engineer
              </div>
            </div>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link font-body text-sm tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-electric active' : 'text-white/60 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.a
              href="/contact"
              className="btn-primary text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-6 h-px bg-white group-hover:bg-electric transition-colors"
                animate={{
                  rotate: mobileOpen && i === 0 ? 45 : mobileOpen && i === 2 ? -45 : 0,
                  y: mobileOpen && i === 0 ? 5 : mobileOpen && i === 2 ? -5 : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-electric/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `font-display text-xl font-medium ${isActive ? 'text-electric' : 'text-white/70'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
