import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// ── Organic brush texture ─────────────────────────────────────────────────────

function makeBrush(radius: number): OffscreenCanvas {
  const size = Math.ceil(radius * 3)
  const c    = new OffscreenCanvas(size, size)
  const ctx  = c.getContext('2d')!
  const cx   = size / 2, cy = size / 2

  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4
    const dist  = radius * (0.05 + Math.random() * 0.22)
    const bx    = cx + Math.cos(angle) * dist
    const by    = cy + Math.sin(angle) * dist
    const r     = radius * (0.55 + Math.random() * 0.55)
    const rx    = r * (0.75 + Math.random() * 0.5)
    const ry    = r * (0.75 + Math.random() * 0.5)
    const g     = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(rx, ry))
    g.addColorStop(0,   `rgba(0,0,0,${0.10 + Math.random() * 0.07})`)
    g.addColorStop(0.5, `rgba(0,0,0,${0.04 + Math.random() * 0.03})`)
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.ellipse(bx, by, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  }

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.68)
  core.addColorStop(0,    'rgba(0,0,0,1)')
  core.addColorStop(0.45, 'rgba(0,0,0,0.95)')
  core.addColorStop(0.72, 'rgba(0,0,0,0.45)')
  core.addColorStop(1,    'rgba(0,0,0,0)')
  ctx.fillStyle = core
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 0.68, 0, Math.PI * 2)
  ctx.fill()

  return c
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const brushRef      = useRef<OffscreenCanvas | null>(null)
  const lastPosRef    = useRef<{ x: number; y: number } | null>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200, visible: false })

  // Subtle parallax on the image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX   = useTransform(mouseX, [-1, 1], [-14, 14])
  const imgY   = useTransform(mouseY, [-1, 1], [-10, 10])

  // ── Stamp a single brush at (x, y) ─────────────────────────────────────────
  const stamp = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const brush = brushRef.current
    if (!brush) return
    ctx.globalCompositeOperation = 'destination-out'
    ctx.drawImage(brush, x - brush.width / 2, y - brush.height / 2)
  }, [])

  // ── Auto-reveal sketch: gestural strokes painted on load ───────────────────
  const playSketch = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !brushRef.current) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.width, h = canvas.height

    // Each entry: [x1, y1, x2, y2] — diagonal gestural strokes across the frame
    const strokes: [number, number, number, number][] = [
      [w * 0.05, h * 0.10, w * 0.42, h * 0.72],
      [w * 0.50, h * 0.05, w * 0.88, h * 0.60],
      [w * 0.18, h * 0.52, w * 0.58, h * 0.95],
      [w * 0.62, h * 0.28, w * 0.98, h * 0.82],
      [w * 0.00, h * 0.72, w * 0.30, h * 1.00],
      [w * 0.35, h * 0.18, w * 0.68, h * 0.55],
    ]

    let si = 0   // stroke index
    let pi = 0   // point index within stroke
    const STEP = 20

    const tick = () => {
      if (si >= strokes.length) return
      const [x1, y1, x2, y2] = strokes[si]
      const dx    = x2 - x1, dy = y2 - y1
      const total = Math.ceil(Math.sqrt(dx * dx + dy * dy) / STEP)

      if (pi <= total) {
        const t = pi / total
        stamp(ctx, x1 + dx * t, y1 + dy * t)
        pi++
        requestAnimationFrame(tick)
      } else {
        // pause between strokes, then continue
        si++
        pi = 0
        if (si < strokes.length) setTimeout(() => requestAnimationFrame(tick), 60)
      }
    }

    setTimeout(() => requestAnimationFrame(tick), 300)
  }, [stamp])

  // ── Canvas init ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    brushRef.current = makeBrush(90)

    const fill = () => {
      const ctx = canvas.getContext('2d')!
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      if (!w || !h) return
      canvas.width  = w
      canvas.height = h

      // White canvas-paper base
      ctx.fillStyle = '#f0ece5'
      ctx.fillRect(0, 0, w, h)

      // Paper grain — light warm noise, very subtle
      const n = Math.floor(w * h * 0.4)
      for (let i = 0; i < n; i++) {
        const v = Math.floor(180 + Math.random() * 40)
        ctx.fillStyle = `rgba(${v},${v - 4},${v - 10},${0.25 + Math.random() * 0.3})`
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
      }

      // Pencil sketch lines — thin horizontal hatching like a canvas underpainting
      ctx.strokeStyle = 'rgba(60,50,40,0.06)'
      ctx.lineWidth = 0.6
      for (let y = 0; y < h; y += 4 + Math.random() * 6) {
        ctx.beginPath()
        ctx.moveTo(0, y + Math.random() * 2)
        ctx.lineTo(w, y + Math.random() * 2)
        ctx.stroke()
      }

      // Loose diagonal sketch strokes suggesting depth / composition
      ctx.strokeStyle = 'rgba(50,40,30,0.05)'
      ctx.lineWidth = 0.8
      for (let i = 0; i < 18; i++) {
        const sx = Math.random() * w
        const sy = Math.random() * h
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(sx + (Math.random() - 0.5) * w * 0.4, sy + (Math.random() - 0.3) * h * 0.5)
        ctx.stroke()
      }

      lastPosRef.current = null
      playSketch()
    }

    const ro = new ResizeObserver(fill)
    ro.observe(canvas)
    fill()
    return () => ro.disconnect()
  }, [playSketch])

  // ── Mouse reveal ──────────────────────────────────────────────────────────
  const reveal = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || !brushRef.current) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const ctx = canvas.getContext('2d')!
    const last = lastPosRef.current

    if (last) {
      const dx = x - last.x, dy = y - last.y
      const dist  = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(1, Math.ceil(dist / 16))
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        stamp(ctx, last.x + dx * t, last.y + dy * t)
      }
    } else {
      stamp(ctx, x, y)
    }
    lastPosRef.current = { x, y }
  }, [stamp])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1
    const ny = ((e.clientY - rect.top)  / rect.height) * 2 - 1
    mouseX.set(nx)
    mouseY.set(ny)
    reveal(e.clientX, e.clientY)
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
    if (!hasEntered) setHasEntered(true)
  }, [mouseX, mouseY, reveal, hasEntered])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    lastPosRef.current = null
    setCursor(c => ({ ...c, visible: false }))
  }, [mouseX, mouseY])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const t = e.touches[0]
    reveal(t.clientX, t.clientY)
    if (!hasEntered) setHasEntered(true)
  }, [reveal, hasEntered])

  return (
    <section
      ref={sectionRef}
      className="hero-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      {/* Base: full-screen desk image */}
      <motion.img
        src="/desk-scene.jpg"
        alt="Designer's workspace"
        className="hero-desk-image"
        style={{ x: imgX, y: imgY }}
        draggable={false}
      />

      {/* Dark + grain canvas overlay — erased by brush */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Text — sits above canvas, gradient scrim for legibility */}
      <div className="hero-overlay">
        <motion.div
          className="hero-left-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-index">0.1</span>
          <h1 className="hero-headline">
            Hey, I'm<br />Risheeta.
          </h1>
          <p className="hero-sub">
            I design, collect stories, and run toward adrenaline
            at the intersection of AI, systems, and live experiences.
          </p>
        </motion.div>

        <motion.p
          className="hero-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {hasEntered ? 'keep exploring →' : 'move cursor to reveal →'}
        </motion.p>
      </div>

      {/* Custom cursor */}
      <div
        className="hero-cursor"
        style={{
          left: cursor.x,
          top:  cursor.y,
          opacity: cursor.visible ? 1 : 0,
        }}
      />
    </section>
  )
}
