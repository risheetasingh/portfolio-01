import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroIntro() {
  const groupRef = useRef<HTMLDivElement>(null)
  const [dissolve, setDissolve] = useState(1)

  useEffect(() => {
    function onScroll() {
      const el = groupRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const exited = Math.min(1, Math.max(0, -rect.top / rect.height))
      setDissolve(1 - exited)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div className="hero-intro-group" ref={groupRef} style={{ opacity: dissolve }}>
      <motion.p
        className="hero-intro"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Hey, I'm Risheeta, a product designer. I design, collect stories, and run
        toward the adrenaline at the intersection of AI, systems, and live experiences.
      </motion.p>

      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16M6 14l6 6 6-6" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
