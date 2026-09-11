import { motion } from 'framer-motion'

const pop = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.6, rotate: -8 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] as any },
})

export default function HeroCollage() {
  return (
    <div className="hero-collage">
      <div className="hero-collage-block">
        <motion.img
          src="/risheeta-doodle.jpg"
          alt="Risheeta"
          className="hero-collage-photo"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div className="hero-sticker hero-sticker--star" {...pop(0.3)} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="#ffce45" stroke="#0a0a0a" strokeWidth="1">
            <path d="M12 2l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 13.6l-5 3.6 1.9-5.8L4 7.8h6.1z" />
          </svg>
        </motion.div>

        <motion.div className="hero-sticker hero-sticker--spiral" {...pop(0.4)} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4d7cff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 12c3 0 3-3 0-3s-5 3-2 6 8 1 7-4-6-8-11-5" />
          </svg>
        </motion.div>

        <motion.div className="hero-sticker hero-sticker--squiggle" {...pop(0.5)} aria-hidden="true">
          <svg viewBox="0 0 40 16" fill="none" stroke="#3bb273" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 8c3-6 6-6 9 0s6 6 9 0 6-6 9 0 6 6 9 0" />
          </svg>
        </motion.div>

        <motion.div className="hero-sticker hero-sticker--star2" {...pop(0.7)} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="#ffce45" stroke="#0a0a0a" strokeWidth="1">
            <path d="M12 2l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 13.6l-5 3.6 1.9-5.8L4 7.8h6.1z" />
          </svg>
        </motion.div>

        <motion.div className="hero-sticker hero-sticker--spiral2" {...pop(0.8)} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4d7cff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 12c3 0 3-3 0-3s-5 3-2 6 8 1 7-4-6-8-11-5" />
          </svg>
        </motion.div>

        <motion.div className="hero-sticker hero-sticker--squiggle2" {...pop(0.9)} aria-hidden="true">
          <svg viewBox="0 0 40 16" fill="none" stroke="#3bb273" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 8c3-6 6-6 9 0s6 6 9 0 6-6 9 0 6 6 9 0" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
