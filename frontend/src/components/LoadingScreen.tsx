import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-60"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Logo */}
      <div className="relative z-10 text-center">
        <motion.div
          className="font-mono text-xs tracking-[0.4em] text-electric/60 mb-6 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Initializing
        </motion.div>

        <motion.h1
          className="font-display text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-white">Allan</span>{' '}
          <span className="neon-text">Marimo</span>
        </motion.h1>

        <motion.div
          className="mt-2 font-mono text-xs tracking-[0.3em] text-white/30 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Software Engineer
        </motion.div>

        {/* Progress bar */}
        <div className="mt-12 w-48 mx-auto h-px bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-electric"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ boxShadow: '0 0 10px #00d4ff' }}
          />
        </div>

        <motion.div
          className="mt-4 font-mono text-[10px] text-electric/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading digital ecosystem...
        </motion.div>
      </div>

      {/* Corner decorations */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-8 h-8 border-electric/30`}
          style={{
            borderTop: pos.includes('top') ? '1px solid' : 'none',
            borderBottom: pos.includes('bottom') ? '1px solid' : 'none',
            borderLeft: pos.includes('left') ? '1px solid' : 'none',
            borderRight: pos.includes('right') ? '1px solid' : 'none',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
        />
      ))}
    </motion.div>
  )
}
