import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setErrorMsg(data.detail || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error — please try again or email me directly.')
      setStatus('error')
    }
  }

  const contacts = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'allanmarimo455@gmail.com',
      href: 'mailto:allanmarimo455@gmail.com',
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'github.com/allan4931',
      href: 'https://github.com/allan4931',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/allanmarimo',
      href: 'https://linkedin.com/in/allanmarimo',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+263 788 447 689',
      href: 'tel:+263788447689',
    },
  ]

  const inputClass =
    'w-full bg-black/60 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-electric/60 transition-colors duration-300'

  return (
    <PageTransition>
      <div className="pt-28 pb-24 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center max-w-2xl mx-auto"
          >
            <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-3">
              Get In Touch
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold">
              Have a system in mind?
              <br />
              <span className="text-electric">Let's architect it.</span>
            </h1>
            <p className="mt-6 text-white/40 leading-relaxed">
              Whether you need a full-stack web application, a mobile app, cloud infrastructure, 
              school management system, or workflow automation — I'd love to hear about your project.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT: Contact info */}
            <div>
              <div className="space-y-4">
                {contacts.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 glass-card p-5 hover:border-electric/30 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 6 }}
                  >
                    <div className="w-10 h-10 border border-electric/20 flex items-center justify-center text-electric group-hover:bg-electric/10 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        {label}
                      </div>
                      <div className="font-body text-sm text-white/70 group-hover:text-electric transition-colors mt-0.5">
                        {value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div
                className="mt-8 glass-card p-6 border-electric/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400/80 tracking-widest uppercase">
                    Available for Projects
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Currently accepting new freelance and contract projects. 
                  Typical response time is <span className="text-electric">within 24 hours.</span>
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {['Freelance Projects', 'Contract Work', 'Consulting', 'System Architecture'].map((item) => (
                    <div key={item} className="text-xs text-white/40 flex items-center gap-2">
                      <span className="text-electric">✓</span> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

                <div className="font-mono text-xs text-electric/60 uppercase tracking-widest mb-6">
                  Send a Message
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-1.5">
                        Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass + ' appearance-none'}
                    >
                      <option value="">Select a service...</option>
                      <option>Full-Stack Web Application</option>
                      <option>Mobile App (React Native)</option>
                      <option>School Management System</option>
                      <option>Cloud / VPS Infrastructure</option>
                      <option>Workflow Automation (n8n)</option>
                      <option>System Architecture Consulting</option>
                      <option>API Development (FastAPI)</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-white/30 tracking-widest uppercase block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project, timeline, and goals..."
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary flex items-center justify-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border border-electric border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={14} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Success / Error feedback */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <FiCheckCircle size={48} className="text-electric mb-4" />
                      </motion.div>
                      <div className="font-display text-xl font-bold text-white mb-2">
                        Message Sent!
                      </div>
                      <p className="text-sm text-white/50 text-center max-w-xs">
                        Thank you for reaching out. I'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 font-mono text-xs text-electric border border-electric/30 px-4 py-2 hover:bg-electric/10 transition-colors"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      className="mt-4 flex items-start gap-3 p-4 border border-red-500/20 bg-red-500/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FiAlertCircle className="text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-red-400 font-medium">Failed to send</div>
                        <div className="text-xs text-white/40 mt-1">{errorMsg}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
