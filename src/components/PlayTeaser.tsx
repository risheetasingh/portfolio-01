import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { artPieces } from '../data/art'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as any },
})

const preview = artPieces.slice(0, 4)

export default function PlayTeaser() {
  return (
    <section className="art-teaser" id="play">
      <div className="art-teaser-inner">
        <motion.p className="section-label" {...fade(0)}>side effects of overthinking</motion.p>
        <motion.h2 className="art-teaser-heading" {...fade(0.06)}>
          beating imposter syndrome, one painting at a time.
        </motion.h2>

        <motion.div className="art-teaser-strip" {...fade(0.12)}>
          {preview.map(p => (
            <Link to="/play" key={p.id} className="art-teaser-thumb">
              <img src={p.image} alt={p.title} />
            </Link>
          ))}
        </motion.div>

        <motion.div {...fade(0.18)}>
          <Link to="/play" className="art-teaser-link">
            see them →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
