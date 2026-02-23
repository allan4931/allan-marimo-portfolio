import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiChevronDown, FiArrowRight, FiCheck } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Skill {
  icon: string
  title: string
  category: string
  level: number
  summary: string
  advantage: string
  tags: string[]
  color: string
}

interface Project {
  title: string
  status: 'Production' | 'Active Development' | 'Deployed'
  icon: string
  tagline: string
  description: string
  longDescription: string
  stack: string[]
  domains?: string[]
  features: string[]
  metrics?: { label: string; value: string }[]
  color: string
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const skills: Skill[] = [
  { icon: '🟢', title: 'n8n Automation', category: 'Automation', level: 90, color: '#22c55e',
    summary: 'Workflow automation, API orchestration and business process automation using n8n self-hosted instances.',
    advantage: 'Eliminates repetitive manual work. Operations that took hours now run unattended in seconds.',
    tags: ['Workflows', 'API Hooks', 'Scheduling', 'Integration', 'Webhooks'],
  },
  { icon: '⚛️', title: 'React & React Native', category: 'Frontend', level: 95, color: '#61dafb',
    summary: 'Cross-platform web and mobile from a unified TypeScript codebase. Components built to last.',
    advantage: 'One codebase, two platforms. Scalable component architecture that survives a growing team.',
    tags: ['React 18', 'React Native', 'Hooks', 'Context', 'Navigation'],
  },
  { icon: '🔷', title: 'TypeScript', category: 'Language', level: 92, color: '#3178c6',
    summary: 'Typed JavaScript powering every frontend and backend. No runtime surprises.',
    advantage: 'Fewer bugs discovered in production. Codebase that new developers can onboard to in hours.',
    tags: ['Type Safety', 'Generics', 'Interfaces', 'Zod', 'Pydantic'],
  },
  { icon: '🐳', title: 'Docker', category: 'DevOps', level: 88, color: '#2496ed',
    summary: 'Containerized deployment with Docker Compose. Multi-instance orchestration on a single VPS.',
    advantage: 'Zero environment drift. What runs on my machine runs identically on the production server.',
    tags: ['Compose', 'Multi-instance', 'Build', 'Networking', 'Volumes'],
  },
  { icon: '🚀', title: 'FastAPI', category: 'Backend', level: 93, color: '#009688',
    summary: 'High-performance async Python APIs with automatic OpenAPI documentation and Pydantic validation.',
    advantage: 'Faster than Django and Flask by default. Self-documenting APIs that clients can explore immediately.',
    tags: ['Async', 'OpenAPI', 'Pydantic', 'REST', 'WebSocket'],
  },
  { icon: '🎨', title: 'Tailwind CSS', category: 'Frontend', level: 96, color: '#38bdf8',
    summary: 'Utility-first CSS enabling rapid, consistent UI development without context switching.',
    advantage: 'Ship UI 3x faster. Zero dead CSS. Consistent design tokens enforced at build time.',
    tags: ['Responsive', 'Dark Mode', 'JIT', 'Animations', 'Custom'],
  },
  { icon: '🐍', title: 'Python', category: 'Language', level: 91, color: '#f7cc42',
    summary: 'Backend systems, automation scripting, data processing pipelines and CLI tooling.',
    advantage: 'Elegant syntax that reads like intent. Powers everything from a 10-line script to a 50k-line API.',
    tags: ['Scripting', 'Automation', 'Data', 'CLI', 'Backend'],
  },
  { icon: '💻', title: 'JavaScript', category: 'Language', level: 94, color: '#f0db4f',
    summary: 'Dynamic web applications, browser APIs, and server-side Node.js when needed.',
    advantage: 'The universal runtime. Runs everywhere — browser, server, edge, embedded.',
    tags: ['ES2024', 'DOM', 'Async/Await', 'Modules', 'Node.js'],
  },
  { icon: '🗄️', title: 'Databases', category: 'Data', level: 87, color: '#336791',
    summary: 'PostgreSQL, Supabase, Appwrite, SQLite — structured data across local and cloud environments.',
    advantage: 'Right database for the right context. ACID-compliant, indexed and query-optimised.',
    tags: ['PostgreSQL', 'Supabase', 'Appwrite', 'SQLite', 'SQL'],
  },
  { icon: '🏗️', title: 'System Architecture', category: 'Architecture', level: 89, color: '#a855f7',
    summary: 'Designing modular, scalable system blueprints before a single line of production code is written.',
    advantage: 'Avoids expensive rewrites. Every decision documented, every tradeoff considered upfront.',
    tags: ['Design Patterns', 'Modularity', 'DDD', 'Scalability', 'Blueprints'],
  },
  { icon: '☁️', title: 'Cloud & VPS Deployment', category: 'DevOps', level: 90, color: '#f97316',
    summary: 'Ubuntu 24.04 VPS configuration, Nginx reverse proxy, multi-instance deployments with zero downtime.',
    advantage: 'Full ownership of the stack. No vendor lock-in, no surprise bills, production from day one.',
    tags: ['Ubuntu', 'VPS', 'Nginx', 'SSL', 'Multi-Instance'],
  },
  { icon: '🔐', title: 'DevOps & Security', category: 'DevOps', level: 86, color: '#ef4444',
    summary: 'SSH key authentication, root login disabled, UFW firewall, Let\'s Encrypt HTTPS, Nginx hardening.',
    advantage: 'Secure-by-default infrastructure. Every server hardened before the first deployment goes live.',
    tags: ['SSH Keys', 'UFW', "Let's Encrypt", 'Hardening', 'Certbot'],
  },
  { icon: '🔁', title: 'GitHub & Version Control', category: 'Collaboration', level: 94, color: '#e2e8f0',
    summary: 'GitHub-based deployment pipelines. Branch strategies, PR reviews and CI/CD-ready repositories.',
    advantage: 'Every change tracked. Rollbacks in seconds. GitHub Actions ready from project day one.',
    tags: ['GitHub', 'Branching', 'Actions', 'CI/CD', 'Pull Requests'],
  },
  { icon: '🎨', title: 'Figma', category: 'Design', level: 78, color: '#f24e1e',
    summary: 'UI/UX prototyping and wireframing before any frontend code is written.',
    advantage: 'Clients see the product before it\'s built. Design decisions resolved cheaply, in Figma.',
    tags: ['Wireframes', 'Prototyping', 'Design Systems', 'Components', 'Handoff'],
  },
  { icon: '🧩', title: 'Problem Solving', category: 'Methodology', level: 95, color: '#10b981',
    summary: 'Research-driven solution design. Mapping data flows and constraints before touching the keyboard.',
    advantage: 'Solutions grounded in evidence, not assumption. No rework because the problem was misunderstood.',
    tags: ['Research', 'Analysis', 'Decomposition', 'Logic', 'Documentation'],
  },
  { icon: '🏫', title: 'School Management ERP', category: 'Specialization', level: 88, color: '#f59e0b',
    summary: 'Full school ERP: students, timetables, fees, results, staff, attendance and parent portals.',
    advantage: 'Replaces entire paper-based administrative operations with structured, auditable digital systems.',
    tags: ['Multi-Role', 'ERP', 'Education', 'Reports', 'Offline-First'],
  },
]

const projects: Project[] = [
  {
    title: 'Offline Mobile Data Collection System',
    status: 'Production',
    icon: '📱',
    color: '#00d4ff',
    tagline: 'Zero-connectivity field data collection at scale.',
    description: 'An offline-first mobile application for agricultural field operations — collecting farmer data where internet doesn\'t exist, syncing when it does.',
    longDescription: 'This system was engineered for the reality of rural Zimbabwe, where field agents work in areas with zero mobile coverage. The application stores all data locally, presents the full UI without a network request, and triggers a sync the moment connectivity is detected. The backend runs on a hardened Ubuntu 24.04 VPS with two simultaneous FastAPI instances behind Nginx, each with their own HTTPS certificate. Deployment is entirely GitHub-based — no file copying, no manual steps.',
    stack: ['React Native', 'FastAPI', 'PostgreSQL', 'Docker', 'Ubuntu 24.04', 'Nginx', "Let's Encrypt", 'SQLite'],
    domains: ['allan.zivo.cloud', 'sandbox.allan.zivo.cloud'],
    metrics: [
      { label: 'Uptime', value: '42+ days' },
      { label: 'Backend instances', value: '2 simultaneous' },
      { label: 'Sync accuracy', value: '100%' },
      { label: 'Offline support', value: 'Full UI' },
    ],
    features: [
      'Offline-first architecture — full functionality without any internet connection',
      'Clerk role: capture Farmer Name, National ID, Farm Type, Crop, GPS Location',
      'Admin role: dynamically configure crop types and farm categories',
      'Intelligent sync engine — queues changes locally, pushes to backend when online',
      'JWT authentication with role-based access control',
      'Two simultaneous backend instances: production + sandbox on single VPS',
      'GitHub-based deployment pipeline — git push deploys automatically',
      'Nginx reverse proxy with HTTPS on both domains',
      'SSH key-only access — root login permanently disabled',
      'Dockerized for reproducible, consistent deployments',
      'Ubuntu 24.04 server hostname mapped to production subdomain',
    ],
  },
  {
    title: 'School Management System',
    status: 'Active Development',
    icon: '🏫',
    color: '#f59e0b',
    tagline: 'Complete ERP replacing paper chaos in African schools.',
    description: 'A comprehensive school management platform handling every administrative function — from student enrollment to final results publication — built for African educational institutions.',
    longDescription: 'Most schools in Zimbabwe still manage students, fees, timetables and results using physical registers and spreadsheets. This system replaces that entirely. The platform is multi-role — Principals see institution-wide analytics, Teachers manage their classes and grade results, Admins handle billing and enrollment, Parents track their children in real time, and Students access their own academic records. Designed for offline use from the start, because school admin doesn\'t stop when the internet does.',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'React Native', 'ReportLab'],
    domains: [],
    metrics: [
      { label: 'User roles', value: '5 distinct' },
      { label: 'Modules', value: '10+ built' },
      { label: 'Report types', value: 'PDF + CSV' },
      { label: 'Offline support', value: 'Full admin' },
    ],
    features: [
      'Student enrollment, record management and academic history tracking',
      'Intelligent timetable builder with conflict detection',
      'Fee billing, payment tracking, receipt generation and arrears management',
      'Term and annual result entry with automatic report card generation',
      'Multi-role access: Principal, Teacher, Admin, Parent, Student',
      'Staff management, subject assignment and workload tracking',
      'Parent portal with real-time academic and financial visibility',
      'Attendance capture with automated absence notification',
      'Offline-capable — full admin functionality without internet',
      'PDF report card export with school letterhead branding',
      'Multi-campus support with centralised data and role separation',
    ],
  },
]

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ label, title, accent, sub }: { label: string; title: string; accent?: string; sub?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className="mb-20">
      <motion.div className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
        <div className="w-8 h-px bg-electric" />
        <span className="font-mono text-xs text-electric/70 tracking-[0.35em] uppercase">{label}</span>
        <div className="flex-1 h-px bg-white/5" />
      </motion.div>
      <motion.h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
        initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
        {title}{' '}{accent && <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-[#0066ff]">{accent}</span>}
      </motion.h2>
      {sub && (
        <motion.p className="mt-5 text-white/40 text-base md:text-lg max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
          {sub}
        </motion.p>
      )}
    </div>
  )
}

// ─── SKILL CARD ───────────────────────────────────────────────────────────────
function SkillCard({ skill, idx }: { skill: Skill; idx: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative border border-white/5 p-6 group overflow-hidden cursor-default"
      style={{ background: 'rgba(255,255,255,0.015)' }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.07 }}
      whileHover={{ y: -8, borderColor: `${skill.color}30` }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Hover background */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% -5%, ${skill.color}07, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} />

      {/* Top accent */}
      <motion.div className="absolute top-0 left-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${skill.color}, transparent)` }}
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : '30%' }}
        transition={{ duration: 0.5 }} />

      {/* Category badge */}
      <div className="flex items-start justify-between mb-5">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300"
          style={{ filter: hovered ? `drop-shadow(0 0 10px ${skill.color}80)` : 'none', transition: 'filter 0.3s' }}>
          {skill.icon}
        </div>
        <span className="font-mono text-[9px] border px-2 py-0.5 tracking-widest uppercase"
          style={{ borderColor: `${skill.color}20`, color: `${skill.color}60` }}>
          {skill.category}
        </span>
      </div>

      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-white transition-colors">
        {skill.title}
      </h3>

      {/* Level bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">Proficiency</span>
          <span className="font-mono text-[9px]" style={{ color: `${skill.color}80` }}>{skill.level}%</span>
        </div>
        <div className="h-[2px] bg-white/5 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(to right, ${skill.color}, ${skill.color}80)` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: (idx % 4) * 0.07 + 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <p className="text-sm text-white/45 leading-relaxed mb-4">{skill.summary}</p>

      <div className="p-3 border border-white/5 mb-4" style={{ background: `${skill.color}04` }}>
        <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: `${skill.color}70` }}>Advantage</div>
        <p className="text-xs text-white/50 leading-relaxed">{skill.advantage}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skill.tags.map(tag => (
          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/8 text-white/25 hover:text-white/60 hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="relative border border-white/5 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.015)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.15 }}
    >
      {/* Top coloured bar */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}30, transparent)` }} />

      {/* Header */}
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="text-5xl" style={{ filter: `drop-shadow(0 0 16px ${project.color}50)` }}>{project.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="font-display text-2xl font-black text-white">{project.title}</h3>
                <span className={`font-mono text-[9px] px-3 py-1 border tracking-widest uppercase ${
                  project.status === 'Production'
                    ? 'border-green-400/30 text-green-400/70 bg-green-400/5'
                    : 'border-yellow-400/30 text-yellow-400/70 bg-yellow-400/5'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="font-mono text-sm mb-3" style={{ color: `${project.color}80` }}>{project.tagline}</p>
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{project.description}</p>
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {project.metrics.map(({ label, value }) => (
                <div key={label} className="text-center p-3 border border-white/5" style={{ background: `${project.color}05` }}>
                  <div className="font-display font-black text-lg" style={{ color: project.color }}>{value}</div>
                  <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech stack */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span key={tech} className="font-mono text-xs px-3 py-1.5 border"
              style={{ borderColor: `${project.color}20`, color: `${project.color}80`, background: `${project.color}05` }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Domains */}
        {project.domains && project.domains.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {project.domains.map(domain => (
              <a key={domain} href={`https://${domain}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs transition-colors"
                style={{ color: `${project.color}60` }}
                onMouseOver={e => (e.currentTarget.style.color = project.color)}
                onMouseOut={e => (e.currentTarget.style.color = `${project.color}60`)}
              >
                <FiExternalLink size={11} />{domain}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Expand toggle */}
      <div className="border-t border-white/5">
        <button onClick={() => setOpen(!open)}
          className="w-full px-10 py-4 flex items-center justify-between text-white/30 hover:text-white/70 transition-colors group">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] uppercase">
              {open ? 'Close Case Study' : 'Read Full Case Study'}
            </span>
            <div className="h-px w-8 bg-white/10 group-hover:bg-electric/40 transition-colors" />
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronDown size={16} />
          </motion.div>
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-10 border-t border-white/5" style={{ background: `${project.color}03` }}>
              <p className="text-white/50 text-sm leading-relaxed mt-8 mb-8 max-w-3xl">{project.longDescription}</p>

              <div className="font-mono text-xs text-electric/50 tracking-[0.35em] uppercase mb-5">
                ── Key Features
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <motion.div key={i}
                    className="flex items-start gap-3 text-sm text-white/50 group/feat"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}>
                    <FiCheck size={14} className="mt-0.5 shrink-0 group-hover/feat:text-electric transition-colors"
                      style={{ color: `${project.color}70` }} />
                    <span className="group-hover/feat:text-white/70 transition-colors">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── SCHOOL ERP SPOTLIGHT ─────────────────────────────────────────────────────
function SchoolERPSpotlight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const modules = [
    { icon: '🎓', name: 'Student Management', desc: 'Enrollment, records, academic history, transfers' },
    { icon: '📅', name: 'Timetable Engine', desc: 'Auto-scheduling with conflict detection' },
    { icon: '💰', name: 'Fee & Billing', desc: 'Invoices, payments, receipts, arrears' },
    { icon: '📊', name: 'Results System', desc: 'Grade entry, report cards, term analysis' },
    { icon: '👨‍🏫', name: 'Staff Management', desc: 'Profiles, subjects, workload allocation' },
    { icon: '👪', name: 'Parent Portal', desc: 'Real-time academic and financial visibility' },
    { icon: '📋', name: 'Attendance', desc: 'Daily capture, absence notifications, analytics' },
    { icon: '📄', name: 'PDF Reports', desc: 'Report cards with school letterhead branding' },
    { icon: '🔐', name: 'Multi-Role Auth', desc: 'Principal, Teacher, Admin, Parent, Student' },
    { icon: '📶', name: 'Offline Sync', desc: 'Full admin capability without internet' },
  ]

  return (
    <motion.div
      ref={ref}
      className="relative border border-white/5 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.01)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="h-[3px]" style={{ background: 'linear-gradient(to right, #f59e0b, #f59e0b30, transparent)' }} />

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="font-display font-black text-[200px] text-white/[0.012] select-none">ERP</div>
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 16px rgba(245,158,11,0.5))' }}>🏫</span>
              <div>
                <div className="font-mono text-xs text-amber-400/60 tracking-widest uppercase">Specialisation Spotlight</div>
                <h3 className="font-display text-3xl font-black text-white">
                  School Management <span className="text-amber-400">ERP</span>
                </h3>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Allan has deep, specialised experience designing and building comprehensive school
              management ERP platforms tailored for African educational institutions. These are not
              simple CRUD apps — they are full administrative operating systems.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              A typical school carries thousands of student records, complex fee structures, multi-teacher
              timetables and parents demanding real-time visibility. This ERP handles all of it — in a
              single, coherent system that works even when the internet doesn't.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              The system is being designed to scale from a single rural school to a multi-campus
              institution, with data isolation between campuses and centralised reporting for administrators.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { val: '5', label: 'User Roles' },
                { val: '10+', label: 'Modules' },
                { val: '100%', label: 'Offline Ready' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center p-4 border border-amber-400/10 bg-amber-400/3">
                  <div className="font-display font-black text-2xl text-amber-400">{val}</div>
                  <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Module grid */}
          <div>
            <div className="font-mono text-xs text-white/20 tracking-widest uppercase mb-5">System Modules</div>
            <div className="grid grid-cols-2 gap-3">
              {modules.map(({ icon, name, desc }, i) => (
                <motion.div
                  key={name}
                  className="p-3 border border-white/5 group hover:border-amber-400/20 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  whileHover={{ x: 3 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{icon}</span>
                    <span className="font-display text-xs font-bold text-white/70 group-hover:text-white transition-colors">{name}</span>
                  </div>
                  <p className="text-[11px] text-white/30 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── CREATIVE CREDENTIALS BANNER ─────────────────────────────────────────────
function CredentialsBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const credentials = [
    { symbol: '◈', text: 'Multi-instance VPS orchestration on a single server' },
    { symbol: '◈', text: 'GitHub-only deployments — zero manual file operations' },
    { symbol: '◈', text: 'Systems that run in Zimbabwe\'s most remote fields' },
    { symbol: '◈', text: 'APIs documented automatically via FastAPI + OpenAPI' },
    { symbol: '◈', text: 'ERP platforms replacing paper-based school administration' },
    { symbol: '◈', text: 'SSH hardening before the first endpoint is written' },
  ]

  return (
    <motion.div
      ref={ref}
      className="relative border border-electric/10 overflow-hidden p-10"
      style={{ background: 'rgba(0,212,255,0.02)' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)' }} />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-4">What sets this work apart</div>
          <h3 className="font-display text-3xl font-black text-white">
            Real Systems.<br />
            <span className="text-electric">Real Production.</span>
          </h3>
          <p className="mt-4 text-white/40 text-sm leading-relaxed">
            These aren't portfolio projects that live on localhost. They run on secured VPS instances,
            serve real users and have uptime measured in months — not demos.
          </p>
        </div>
        <div className="space-y-3">
          {credentials.map((c, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 text-sm text-white/50"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-electric/40 shrink-0 mt-0.5">{c.symbol}</span>
              {c.text}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── SKILLS PAGE ─────────────────────────────────────────────────────────────
export default function Skills() {
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))]
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active)

  return (
    <PageTransition>
      <div className="pt-28 pb-32">
        {/* ── PAGE HERO ── */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.08), transparent)' }} />

          {/* Giant watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="font-display font-black select-none"
              style={{ fontSize: 'clamp(100px, 22vw, 280px)', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.04)', letterSpacing: '-0.03em' }}>
              SKILLS
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-electric" />
                <span className="font-mono text-xs text-electric/70 tracking-[0.35em] uppercase">Technical Capabilities</span>
              </div>

              <h1 className="font-display font-black leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}>
                <span className="text-white">Skills</span> <span className="text-white/10">&</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-[#0055ff]">Expertise</span>
              </h1>

              <p className="mt-6 text-white/40 text-lg max-w-2xl leading-relaxed">
                Sixteen technical disciplines — each with a measurable proficiency level, a professional
                summary, and a concrete competitive advantage. No filler. No fluff.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs text-white/20 tracking-widest uppercase mr-2">Filter:</span>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 tracking-widest uppercase ${
                  active === cat
                    ? 'border-electric text-electric bg-electric/8 shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                    : 'border-white/8 text-white/30 hover:border-electric/30 hover:text-white/60'
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
                {active === cat && (
                  <motion.span className="ml-2 text-electric/40"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ({filtered.length})
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── SKILLS GRID ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence>
              {filtered.map((skill, i) => (
                <motion.div key={skill.title} layout>
                  <SkillCard skill={skill} idx={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── CREDENTIALS BANNER ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <CredentialsBanner />
        </div>

        {/* ── PROJECTS SECTION ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Featured Projects"
            title="Case"
            accent="Studies"
            sub="Production systems built, deployed and running. Every feature documented, every decision justified. Not experiments — infrastructure."
          />

          <div className="space-y-6 mb-16">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} idx={i} />
            ))}
          </div>

          {/* ── SCHOOL ERP SPOTLIGHT ── */}
          <SchoolERPSpotlight />
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
          <div className="border border-white/5 p-12 text-center relative overflow-hidden"
            style={{ background: 'rgba(0,212,255,0.02)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.05), transparent)' }} />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                Need one of these skills for your project?
              </h2>
              <p className="text-white/40 mb-8 max-w-xl mx-auto">
                Let's talk scope, timeline and architecture. I respond within 24 hours.
              </p>
              <a href="/contact"
                className="inline-flex items-center gap-3 border border-electric px-10 py-4 font-mono text-sm text-electric tracking-widest uppercase hover:bg-electric/8 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-400">
                Get in Touch <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}