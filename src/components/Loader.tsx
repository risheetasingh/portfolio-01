import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HOLD_DELAY = 2500
const DISSOLVE_DURATION = 950
const TOTAL_DURATION = HOLD_DELAY + DISSOLVE_DURATION + 150
const COLUMNS = 10
const CURTAIN_COLOR = '#3d0304'

// Word timing: pop in quickly, HOLD at full opacity so the name is actually
// readable, then fade out right as the dissolve begins.
const WORD_POP_DELAY = 100
const WORD_POP_DURATION = 500
const WORD_FADE_OUT = 250
const WORD_END = HOLD_DELAY + WORD_FADE_OUT
const WORD_TIMES: [number, number, number, number, number] = [
  0,
  WORD_POP_DELAY / WORD_END,
  (WORD_POP_DELAY + WORD_POP_DURATION) / WORD_END,
  HOLD_DELAY / WORD_END,
  1,
]

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const doneRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

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
    // mostly driven by its diagonal position, with a little per-block jitter
    // to stagger the boundary into an irregular, blocky front (not too much,
    // or the front reads as messy scatter instead of a clean diagonal sweep).
    const BLOCK_TRANSITION = 110
    const blocks: { x: number; y: number; priority: number; startTime: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols
        const ny = r / rows
        const jitter = (Math.random() - 0.5) * 0.3
        blocks.push({ x: c * blockSize, y: r * blockSize, priority: (1 - nx) + (1 - ny) + jitter, startTime: 0 })
      }
    }
    blocks.sort((a, b) => a.priority - b.priority)

    const spread = Math.max(1, DISSOLVE_DURATION - BLOCK_TRANSITION)
    blocks.forEach((block, i) => {
      block.startTime = (i / Math.max(1, blocks.length - 1)) * spread
    })

    let raf: number
    let start: number | null = null

    const drawFrame = (elapsed: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const block of blocks) {
        const localProgress = Math.min(1, Math.max(0, (elapsed - block.startTime) / BLOCK_TRANSITION))
        if (localProgress >= 1) continue
        const scale = 1 - localProgress * 0.55
        const w = blockSize * scale
        const h = blockSize * scale
        const cx = block.x + blockSize / 2
        const cy = block.y + blockSize / 2
        ctx.globalAlpha = 1 - localProgress
        ctx.fillStyle = CURTAIN_COLOR
        ctx.fillRect(cx - w / 2, cy - h / 2, w + 1, h + 1)
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start
      drawFrame(elapsed)
      if (elapsed < spread + BLOCK_TRANSITION) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }

    const holdTimer = setTimeout(() => {
      // Autoplay-with-sound is blocked by browsers without a prior user
      // gesture, so this can silently fail on first load - that's fine, the
      // visual dissolve doesn't depend on it.
      audioRef.current?.play().catch(() => {})
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
      <audio ref={audioRef} src="/loader-glitch.wav" preload="auto" />
      <motion.span
        className="loader-word"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 1, 1, 1], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: WORD_END / 1000, times: WORD_TIMES, ease: 'easeOut' }}
      >
        Risheeta Singh
      </motion.span>
    </motion.div>
  )
}
