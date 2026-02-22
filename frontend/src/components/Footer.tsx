import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const socials = [
    { icon: FiGithub, href: 'https://github.com/allan4931', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/allanmarimo', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:allanmarimo455@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-bold text-lg">
              <span className="text-white">Allan</span>{' '}
              <span className="text-electric">Marimo</span>
            </div>
            <div className="font-mono text-xs text-white/30 mt-1">
              We build simplicity for users.
            </div>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/40 hover:text-electric transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          <div className="font-mono text-[10px] text-white/20 text-center md:text-right">
            <div>© {new Date().getFullYear()} Allan Marimo</div>
            <div className="text-electric/30 mt-0.5">All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
