import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CURTAIN_DELAY = 0.6
const CURTAIN_DURATION = 0.8
const TOTAL_DURATION = (CURTAIN_DELAY + CURTAIN_DURATION) * 1000 + 200

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  useEffect(() => {
    const timer = setTimeout(finish, TOTAL_DURATION)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(timer)
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
      <motion.div
        className="loader-curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: CURTAIN_DURATION, delay: CURTAIN_DELAY, ease: [0.76, 0, 0.24, 1] }}
      />
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
