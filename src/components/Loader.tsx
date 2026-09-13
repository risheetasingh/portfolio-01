import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { playLoaderSound, unlockLoaderSound, isLoaderSoundUnlocked } from '../lib/loaderSound'

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
  const [soundOn, setSoundOn] = useState(isLoaderSoundUnlocked)

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    unlockLoaderSound()
    setSoundOn(true)
  }

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
      // Plays if the shared audio element has been unlocked by a gesture
      // anywhere in the session; silently does nothing otherwise. The
      // visual dissolve doesn't depend on it either way.
      playLoaderSound()
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
      <div className="loader-center">
        <motion.span
          className="loader-word"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 0, 1, 1, 1], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: WORD_END / 1000, times: WORD_TIMES, ease: 'easeOut' }}
        >
          Risheeta Singh
        </motion.span>

        <motion.button
          className="loader-sound-toggle"
          onClick={toggleSound}
          aria-label={soundOn ? 'Sound on' : 'Tap to enable sound'}
          aria-pressed={soundOn}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
      >
        {soundOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 7.2-2.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        )}
        </motion.button>
      </div>
    </motion.div>
  )
}
