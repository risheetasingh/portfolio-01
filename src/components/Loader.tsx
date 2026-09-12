import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const QUOTES = [
  { line1: "Designed with AI.", line2: "Directed by taste." },
  { line1: "Teaching machines to behave.", line2: "Politely." },
  { line1: "Give me a second.", line2: "Arranging pixels." },
]

const TOTAL_DURATION = 900

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [percent, setPercent] = useState(0)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / TOTAL_DURATION)
      setPercent(Math.round(progress * 100))
      if (progress >= 1) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      onClick={finish}
      role="button"
      aria-label="Skip loading animation"
      tabIndex={0}
    >
      <div className="loader-text">
        <motion.div
          className="loader-line1"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0 }}
        >
          {quote.line1}
        </motion.div>
        <motion.div
          className="loader-line2"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        >
          <span style={{ position: 'relative', display: 'inline-block' }}>
            {quote.line2}
            <span className="loader-cursor" style={{ color: '#e60023', position: 'absolute', left: '100%' }}>|</span>
          </span>
        </motion.div>
      </div>

      <div className="loader-indicator">
        <motion.svg
          className="loader-spinner"
          viewBox="0 0 14 14"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
        >
          <circle cx="7" cy="7" r="5.5" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 15" />
        </motion.svg>
        <span className="loader-percent">Loading {String(percent).padStart(2, '0')}%</span>
        <span className="loader-skip">(click to skip)</span>
      </div>
    </motion.div>
  )
}
