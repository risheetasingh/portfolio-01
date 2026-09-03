import React from 'react'
import { motion } from 'framer-motion'

type Theme = 'light' | 'dark'

export default function Hero({ theme }: { theme: Theme }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const themeRef  = React.useRef(theme)
  React.useEffect(() => { themeRef.current = theme }, [theme])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 }

    class Particle {
      x: number
      y: number
      directionX: number
      directionY: number
      size: number
      color: string

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx!.fillStyle = this.color
        ctx!.fill()
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius
            this.x -= (dx / distance) * force * 5
            this.y -= (dy / distance) * force * 5
          }
        }

        this.x += this.directionX
        this.y += this.directionY
        this.draw()
      }
    }

    let particles: Particle[] = []

    function init() {
      particles = []
      const count = (canvas!.height * canvas!.width) / 9000
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1
        const x = Math.random() * (innerWidth - size * 4) + size * 2
        const y = Math.random() * (innerHeight - size * 4) + size * 2
        const directionX = Math.random() * 0.4 - 0.2
        const directionY = Math.random() * 0.4 - 0.2
        particles.push(new Particle(x, y, directionX, directionY, size, 'rgba(244, 0, 9, 0.5)'))
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          if (dist < (canvas.width / 7) * (canvas.height / 7)) {
            const opacity = 1 - dist / 20000
            if (mouse.x !== null && mouse.y !== null) {
              const dxm = particles[a].x - mouse.x
              const dym = particles[a].y - mouse.y
              const distMouse = Math.sqrt(dxm * dxm + dym * dym)
              const lineColor = themeRef.current === 'dark' ? '60, 60, 60' : '230, 230, 229'
              ctx.strokeStyle =
                distMouse < mouse.radius
                  ? `rgba(247, 0, 0, ${opacity})`
                  : `rgba(${lineColor}, ${opacity})`
            } else {
              const lineColor = themeRef.current === 'dark' ? '60, 60, 60' : '230, 230, 229'
              ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            }
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.fillStyle = themeRef.current === 'dark' ? '#0a0a0a' : 'white'
      ctx.fillRect(0, 0, innerWidth, innerHeight)
      particles.forEach(p => p.update())
      connect()
    }

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const handleMouseOut  = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.5, duration: 0.8, ease: 'easeInOut' as const },
    }),
  }

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 text-center px-6">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="block text-sm font-mono text-gray-400 mb-4 tracking-widest"
        >
          0.1
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-12" style={{ color: '#E60023' }}
        >
          Hey, I'm<br />Risheeta.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto text-lg font-mono" style={{ color: '#A7A7A7', fontFamily: 'var(--mono)', letterSpacing: '-0.02em' }}
        >
          I design, collect stories and run toward adrenaline
          at the intersection of AI, systems, and live experiences.
        </motion.p>
      </div>
    </section>
  )
}
