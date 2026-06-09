import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0
    const particles: Particle[] = []
    const COUNT = 100

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => {
      mouse.current = { x: e.clientX, y: e.clientY }
    })

    const mkParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      size: Math.random() * 1.4 + .3,
      opacity: Math.random() * .45 + .1,
    })
    for (let i = 0; i < COUNT; i++) particles.push(mkParticle())

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        // mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < 110) {
          const f = (110 - dist) / 110
          p.x += (dx / dist) * f * 1.8
          p.y += (dy / dist) * f * 1.8
        }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) Object.assign(p, mkParticle())
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${p.opacity})`
        ctx.fill()
      }
      // connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const d = Math.hypot(dx, dy)
          if (d < 95) {
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.strokeStyle = `rgba(212,175,55,${(1 - d / 95) * .13})`
            ctx.lineWidth = .5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 0, opacity: .35,
      }}
    />
  )
}
