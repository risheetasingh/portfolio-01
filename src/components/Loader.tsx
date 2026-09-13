import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HOLD_DELAY = 1500
const DISSOLVE_DURATION = 950
const TOTAL_DURATION = HOLD_DELAY + DISSOLVE_DURATION + 150
const COLUMNS = 10
const CURTAIN_COLOR = '#3d0304'

// Word timing: pop in, hold, then fade out right as the dissolve begins
// (rather than lingering through the whole reveal).
const WORD_POP_DELAY = 100
const WORD_FADE_OUT = 250
const WORD_END = HOLD_DELAY + WORD_FADE_OUT
const WORD_TIMES: [number, number, number, number] = [0, WORD_POP_DELAY / WORD_END, HOLD_DELAY / WORD_END, 1]

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const doneRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) {
      const fallback = setTimeout(finish, TOTAL_DURATION)
      return () => clearTimeout(fallback)
    }

    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const blockSize = width / COLUMNS
    const cols = COLUMNS
    const rows = Math.ceil(height / blockSize)

    ctx.fillStyle = CURTAIN_COLOR
    ctx.fillRect(0, 0, width, height)

    // Sweep bottom-right -> top-left with a jagged, noisy edge rather than a
    // straight line or a fully random scatter: each block's erase priority is
    // mostly driven by its diagonal position, with enough per-block jitter to
    // stagger the boundary into an irregular, blocky front.
    const blocks: { x: number; y: number; priority: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols
        const ny = r / rows
        const jitter = (Math.random() - 0.5) * 0.6
        blocks.push({ x: c * blockSize, y: r * blockSize, priority: (1 - nx) + (1 - ny) + jitter })
      }
    }
    blocks.sort((a, b) => a.priority - b.priority)

    let raf: number
    let start: number | null = null
    let erased = 0

    const erase = (block: { x: number; y: number }) => {
      ctx.clearRect(block.x, block.y, blockSize + 1, blockSize + 1)
    }

    const tick = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start
      const progress = Math.min(1, elapsed / DISSOLVE_DURATION)
      const targetCount = Math.floor(progress * blocks.length)
      while (erased < targetCount) {
        erase(blocks[erased])
        erased++
      }
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }

    const holdTimer = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, HOLD_DELAY)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(holdTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
      onClick={finish}
      role="button"
      aria-label="Skip loading animation"
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="loader-curtain-canvas" />
      <motion.span
        className="loader-word"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 1, 1], opacity: [0, 0, 1, 0] }}
        transition={{ duration: WORD_END / 1000, times: WORD_TIMES, ease: 'easeOut' }}
      >
        Risheeta Singh
      </motion.span>
    </motion.div>
  )
}
