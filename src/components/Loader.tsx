import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { line1: "Designed with AI.", line2: "Directed by taste." },
  { line1: "Teaching machines to behave.", line2: "Politely." },
  { line1: "Give me a second.", line2: "Arranging pixels." },
]

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const totalDuration = 1500
      const steps = 100
      const interval = totalDuration / steps
      let current = 0
      const timer = setInterval(() => {
        current += 1
        setPercent(current)
        if (current >= 100) clearInterval(timer)
      }, interval)
      return () => clearInterval(timer)
    }, 300)

    const completeTimer = setTimeout(onComplete, 2600)

    return () => {
      clearTimeout(startDelay)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeIn' }}
    >
      <div className="loader-text">
        <motion.div
          className="loader-line1"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0 }}
        >
          {quote.line1}
        </motion.div>
        <motion.div
          className="loader-line2"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.45 }}
        >
          <span style={{ position: 'relative', display: 'inline-block' }}>
            {quote.line2}
            <span className="loader-cursor" style={{ color: '#e65f2e', position: 'absolute', left: '100%' }}>|</span>
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
      </div>
    </motion.div>
  )
}
