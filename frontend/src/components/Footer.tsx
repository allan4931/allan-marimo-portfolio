import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">ALLAN<span>.</span></Link>
          <p className="footer__tagline">
            Built with precision.<br/>Deployed with confidence.
          </p>
        </div>

        <nav className="footer__nav">
          <span className="footer__nav-label">Navigate</span>
          <Link to="/">Home</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer__contact-col">
          <span className="footer__nav-label">Contact</span>
          <a href="mailto:allanmarimo455@gmail.com">allanmarimo455@gmail.com</a>
          <a href="https://github.com/allan4931" target="_blank" rel="noreferrer">github.com/allan4931</a>
          <a href="https://linkedin.com/in/allanmarimo" target="_blank" rel="noreferrer">linkedin.com/in/allanmarimo</a>
          <a href="tel:+263788447689">+263 788 447 689</a>
        </div>
      </div>

      <div className="gold-divider" style={{ margin: '2rem 0 1.5rem' }} />

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Allan Marimo. All rights reserved.</span>
        <span className="footer__motto">Zimbabwe 🇿🇼 &nbsp;·&nbsp; Independent Software Engineer</span>
      </div>
    </footer>
  )
}
