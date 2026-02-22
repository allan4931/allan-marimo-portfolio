import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'

interface Skill {
  icon: string
  title: string
  category: string
  summary: string
  advantage: string
  tags?: string[]
}

const skills: Skill[] = [
  {
    icon: '🟢',
    title: 'n8n Automation',
    category: 'Automation',
    summary: 'Workflow automation, API orchestration, and business process automation using n8n.',
    advantage: 'Reduces manual work, increases operational efficiency and business velocity.',
    tags: ['Workflows', 'API', 'Integration', 'Automation'],
  },
  {
    icon: '⚛️',
    title: 'React & React Native',
    category: 'Frontend',
    summary: 'Cross-platform web and mobile development from a single TypeScript codebase.',
    advantage: 'Single codebase powers web and mobile with consistent, scalable UI systems.',
    tags: ['React', 'React Native', 'Mobile', 'Web'],
  },
  {
    icon: '🔷',
    title: 'TypeScript',
    category: 'Language',
    summary: 'Typed JavaScript for scalable, maintainable enterprise-grade applications.',
    advantage: 'Fewer runtime bugs, better tooling and long-term code maintainability.',
    tags: ['Type Safety', 'Scalability', 'Enterprise'],
  },
  {
    icon: '🐳',
    title: 'Docker',
    category: 'DevOps',
    summary: 'Containerized deployment ensuring consistent environments across all stages.',
    advantage: 'Identical behaviour from development to production, no environment drift.',
    tags: ['Containers', 'DevOps', 'Compose', 'Portability'],
  },
  {
    icon: '🚀',
    title: 'FastAPI',
    category: 'Backend',
    summary: 'High-performance, async-ready Python backend framework with auto documentation.',
    advantage: 'Blazing fast APIs, automatic OpenAPI docs, built for production scale.',
    tags: ['Python', 'REST API', 'Async', 'OpenAPI'],
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    category: 'Frontend',
    summary: 'Utility-first CSS framework enabling rapid, consistent UI development.',
    advantage: 'Rapid UI development with zero-bloat, design-system-level consistency.',
    tags: ['CSS', 'UI', 'Responsive', 'Design System'],
  },
  {
    icon: '🐍',
    title: 'Python',
    category: 'Language',
    summary: 'Backend systems, automation scripts, data processing and scripting.',
    advantage: 'Clean, powerful, versatile backend logic that scales from scripts to services.',
    tags: ['Backend', 'Scripting', 'Automation', 'Data'],
  },
  {
    icon: '💻',
    title: 'JavaScript',
    category: 'Language',
    summary: 'Dynamic, interactive frontend systems and full-stack JavaScript applications.',
    advantage: 'Universal language enabling powerful interactive frontend experiences.',
    tags: ['Frontend', 'Dynamic', 'DOM', 'Full-Stack'],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    category: 'Data',
    summary: 'PostgreSQL, Supabase, Appwrite, SQLite — local and cloud SQL data management.',
    advantage: 'Structured, secure, scalable data management across any environment.',
    tags: ['PostgreSQL', 'Supabase', 'Appwrite', 'SQLite'],
  },
  {
    icon: '🏗️',
    title: 'System Architecture',
    category: 'Architecture',
    summary: 'Designing modular, scalable systems with long-term maintainability in mind.',
    advantage: 'Future-proof architecture that supports growth, security and team expansion.',
    tags: ['Architecture', 'Design', 'Scalability', 'Patterns'],
  },
  {
    icon: '☁️',
    title: 'Cloud & VPS Deployment',
    category: 'DevOps',
    summary: 'VM hosting, VPS configuration, multi-instance application deployment.',
    advantage: 'Production-ready infrastructure from day one, on any cloud or bare metal.',
    tags: ['VPS', 'Ubuntu', 'Cloud', 'Multi-Instance'],
  },
  {
    icon: '🔐',
    title: 'DevOps & Security',
    category: 'DevOps',
    summary: 'SSH keys, Nginx reverse proxy, Let\'s Encrypt HTTPS, root login disabled.',
    advantage: 'Secure-by-default infrastructure hardened for real-world threats.',
    tags: ['SSH', 'Nginx', 'HTTPS', 'Security'],
  },
  {
    icon: '🔁',
    title: 'GitHub & Version Control',
    category: 'Collaboration',
    summary: 'Heavy GitHub user (allan4931) — branch strategies, CI/CD pipelines, deployments.',
    advantage: 'Clean collaboration history, audit trails and CI/CD-ready repositories.',
    tags: ['Git', 'GitHub', 'CI/CD', 'Branching'],
  },
  {
    icon: '🎨',
    title: 'Figma',
    category: 'Design',
    summary: 'UI/UX prototyping, wireframing and design system creation before development.',
    advantage: 'Clear product visualization eliminates assumption-based development.',
    tags: ['UI/UX', 'Prototyping', 'Wireframes', 'Design'],
  },
  {
    icon: '🧩',
    title: 'Problem Solving & Research',
    category: 'Methodology',
    summary: 'Transforming research and requirements into structured, functional systems.',
    advantage: 'Solutions grounded in logic and evidence, not assumptions.',
    tags: ['Analysis', 'Research', 'Logic', 'Solutions'],
  },
  {
    icon: '🏫',
    title: 'School Management Systems',
    category: 'Specialization',
    summary: 'Full-featured school ERP: student records, timetables, fees, staff management, results and parent portals.',
    advantage: 'End-to-end academic management from enrollment to graduation — offline-capable.',
    tags: ['ERP', 'Education', 'Multi-Role', 'Reports'],
  },
]

interface Project {
  title: string
  status: string
  description: string
  longDescription: string
  stack: string[]
  features: string[]
  domains?: string[]
  icon: string
}

const projects: Project[] = [
  {
    title: 'Offline Mobile Data Collection System',
    status: 'Production',
    icon: '📱',
    description:
      'An offline-first mobile data collection platform for agricultural field operations, with multi-role access, secure sync, and a production-hardened VPS backend.',
    longDescription:
      'Built for field environments with zero internet connectivity. Clerks collect farmer data offline; Admins configure crop and farm types. All data syncs automatically when connectivity is restored. The backend runs on a hardened Ubuntu 24.04 VPS with two simultaneous instances, GitHub-based deployment, and full HTTPS security.',
    stack: ['React Native', 'FastAPI', 'PostgreSQL', 'Docker', 'Ubuntu 24.04', 'Nginx', "Let's Encrypt"],
    domains: ['allan.zivo.cloud', 'sandbox.allan.zivo.cloud'],
    features: [
      'Offline-first mobile app (no internet required in the field)',
      'Clerk role: collect Farmer Name, ID, Farm Type, Crop, Location',
      'Admin role: configure crops & farm types dynamically',
      'Auto-sync to backend when connectivity is detected',
      'GitHub-based CI/CD deployment (no manual file copying)',
      'Nginx reverse proxy with HTTPS on both subdomains',
      'SSH key authentication — root login disabled',
      'Two simultaneous backend instances on one VPS',
      'Dockerized for consistent deployments',
      'Ubuntu 24.04 server with hostname mapped to subdomain',
    ],
  },
  {
    title: 'School Management System',
    status: 'Active Development',
    icon: '🏫',
    description:
      'A comprehensive school ERP system covering student lifecycle management, academic records, fee billing, staff scheduling, and a dedicated parent portal — built for African schools.',
    longDescription:
      'Designed to replace paper-based administrative processes in schools across Zimbabwe and beyond. The system handles everything from student enrollment to final results publication. Multi-role access control ensures principals, teachers, admins, parents and students each see exactly what they need. Works offline for schools with unreliable internet.',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'React Native'],
    features: [
      'Student enrollment, records and academic history',
      'Timetable builder and class scheduling engine',
      'Fee billing, payment tracking and receipts generation',
      'Results & report card generation per term/year',
      'Multi-role access: Principal, Teacher, Admin, Parent, Student',
      'Staff management and subject assignment',
      'Parent portal with real-time student progress visibility',
      'Attendance tracking with absence notifications',
      'Offline-capable with sync for low-connectivity schools',
      'Secure deployment on VPS with Docker and HTTPS',
      'Exportable reports in PDF format',
    ],
  },
]

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      className="glass-card p-6 group hover:border-electric/30 transition-all duration-400 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.06), transparent)' }}
      />

      {/* Category badge */}
      <div className="absolute top-4 right-4">
        <span className="font-mono text-[9px] text-electric/40 tracking-widest uppercase border border-electric/15 px-2 py-0.5">
          {skill.category}
        </span>
      </div>

      <div className="skill-icon text-3xl mb-4 inline-block transition-all duration-300">
        {skill.icon}
      </div>

      <h3 className="font-display font-bold text-lg text-white group-hover:text-electric transition-colors duration-300">
        {skill.title}
      </h3>

      <p className="mt-2 text-sm text-white/50 leading-relaxed">{skill.summary}</p>

      <div className="mt-4 p-3 border border-electric/10 bg-electric/3 rounded-sm">
        <div className="font-mono text-[10px] text-electric/60 uppercase tracking-widest mb-1">
          Advantage
        </div>
        <p className="text-xs text-white/60 leading-relaxed">{skill.advantage}</p>
      </div>

      {skill.tags && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] px-2 py-0.5 border border-white/10 text-white/30 hover:border-electric/30 hover:text-electric/60 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      {/* Header */}
      <div className="p-8 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{project.icon}</div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-electric transition-colors">
                  {project.title}
                </h3>
                <span
                  className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest border ${
                    project.status === 'Production'
                      ? 'border-green-400/30 text-green-400/70'
                      : 'border-yellow-400/30 text-yellow-400/70'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-3 py-1 glass-card border border-electric/15 text-electric/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Domains */}
        {project.domains && (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.domains.map((domain) => (
              <a
                key={domain}
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-electric/60 hover:text-electric transition-colors"
              >
                <FiExternalLink size={10} />
                {domain}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Expandable details */}
      <div className="border-t border-white/5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-8 py-4 flex items-center justify-between text-sm text-white/40 hover:text-electric transition-colors"
        >
          <span className="font-mono text-xs tracking-widest uppercase">
            {expanded ? 'Hide Details' : 'View Full Case Study'}
          </span>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expanded && (
          <motion.div
            className="px-8 pb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-white/50 leading-relaxed mb-6">{project.longDescription}</p>

            <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-4">
              Key Features
            </div>
            <ul className="space-y-2">
              {project.features.map((feat, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span className="text-electric mt-0.5 shrink-0">▸</span>
                  {feat}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory)

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative mb-20">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-3">
                Capabilities
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold">
                Skills &{' '}
                <span className="text-electric">Expertise</span>
              </h1>
              <p className="mt-4 text-white/40 max-w-2xl text-base leading-relaxed">
                A comprehensive toolkit spanning frontend, backend, cloud infrastructure, 
                automation, and system design. Every skill paired with a real competitive advantage.
              </p>
            </motion.div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-electric text-electric bg-electric/10'
                    : 'border-white/10 text-white/40 hover:border-electric/30 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.title} skill={skill} index={i} />
            ))}
          </div>

          {/* Projects Section */}
          <div className="mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-3">
                Featured Projects
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Case Studies
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl text-base leading-relaxed">
                Real-world systems designed, built and deployed to production. Not demos — 
                actual systems solving actual problems.
              </p>
            </motion.div>

            <div className="space-y-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>

          {/* School Management Deep-Dive */}
          <motion.div
            className="mt-16 glass-card p-8 border-electric/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #00d4ff, transparent)', filter: 'blur(40px)', transform: 'translate(30%, -30%)' }}
            />

            <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
              <div>
                <div className="font-mono text-xs text-electric/60 tracking-widest uppercase mb-3">
                  Specialisation Spotlight
                </div>
                <h2 className="font-display text-3xl font-bold">
                  School Management <br />
                  <span className="text-electric">ERP Systems</span>
                </h2>
                <p className="mt-4 text-white/50 text-sm leading-relaxed">
                  Allan has deep specialisation in building comprehensive school management systems 
                  tailored for African educational institutions. These systems replace fragile 
                  spreadsheet-based workflows with a secure, multi-role ERP that works even in 
                  low-connectivity environments.
                </p>
                <p className="mt-3 text-white/50 text-sm leading-relaxed">
                  From a rural school in Zimbabwe to a multi-campus institution, the architecture 
                  scales accordingly — with each role getting precisely the interface and data 
                  access they need.
                </p>
              </div>
              <div>
                <div className="font-mono text-xs text-electric/50 uppercase tracking-widest mb-4">
                  System Modules
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    '🎓 Student Management',
                    '📅 Timetabling Engine',
                    '💰 Fee & Billing System',
                    '📊 Results & Report Cards',
                    '👨‍🏫 Staff Management',
                    '👪 Parent Portal',
                    '📋 Attendance Tracking',
                    '📄 PDF Report Export',
                    '🔐 Multi-Role Access',
                    '📶 Offline-First Sync',
                  ].map((mod) => (
                    <div
                      key={mod}
                      className="text-xs text-white/50 flex items-center gap-2 p-2 border border-white/5 hover:border-electric/20 hover:text-white/70 transition-all"
                    >
                      {mod}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
