import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HOLD_DELAY = 600
const DISSOLVE_DURATION = 750
const TOTAL_DURATION = HOLD_DELAY + DISSOLVE_DURATION + 150
const COLUMNS = 14
const CURTAIN_COLOR = '#750608'

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

    const blocks: { x: number; y: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        blocks.push({ x: c * blockSize, y: r * blockSize })
      }
    }
    // Fisher-Yates shuffle so blocks erase in a scattered, non-linear order
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    }

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
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        Risheeta Singh
      </motion.span>
    </motion.div>
  )
}
