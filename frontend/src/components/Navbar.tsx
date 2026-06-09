import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/skills',  label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <Link to="/" className="nav__logo">
        ALLAN<span>.</span>
      </Link>

      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/contact" className="btn btn--primary nav__cta">
        <span>Hire Me</span>
      </Link>

      <button
        className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span/><span/><span/>
      </button>
    </header>
  )
}
