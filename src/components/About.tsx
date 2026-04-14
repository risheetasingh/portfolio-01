import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

interface Props {
  compact?: boolean
}

export default function About({ compact = false }: Props) {
  if (compact) {
    return (
      <section className="about about--compact" id="about">
        <div className="about-compact-inner">
          <motion.p className="section-label" {...fade(0)}>About</motion.p>
          <motion.h2 className="about-heading" {...fade(0.06)}>
            Designer.<br />Over-thinker.<br />Perpetually caffeinated.
          </motion.h2>
          <motion.p className="about-bio" {...fade(0.12)}>
            Product designer at Spectatr.ai, building AI-powered sports products
            at the intersection of live data, machine intelligence, and the moments
            fans actually care about.
          </motion.p>
          <motion.div {...fade(0.18)}>
            <Link to="/about" className="about-compact-link">
              More about me →
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="about" id="about">
      <div className="about-split">

        {/* ── Left: sticky photo ── */}
        <div className="about-photo-col">
          <motion.div
            className="about-photo-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/risheeta.jpg"
              alt="Risheeta"
              className="about-photo"
            />
          </motion.div>
        </div>

        {/* ── Right: scrollable content ── */}
        <div className="about-content-col">
          <motion.p className="section-label" {...fade(0)}>About</motion.p>

          <motion.h2 className="about-heading" {...fade(0.08)}>
            Designer.<br />
            Over-thinker.<br />
            Perpetually<br />
            caffeinated.
          </motion.h2>

          <motion.p className="about-bio" {...fade(0.14)}>
            Product designer at Spectatr.ai, building AI-powered sports products
            at the intersection of live data, machine intelligence, and the moments
            fans actually care about. I obsess over the gap between what's technically
            possible and what's genuinely useful — and I believe the best products
            make hard things feel inevitable.
          </motion.p>

          <motion.div className="about-divider" {...fade(0.18)} />

          {/* Personal */}
          <motion.div className="about-section" {...fade(0.22)}>
            <p className="about-section-label">Outside design</p>
            <ul className="about-traits">
              <li>
                <span className="trait-mark">—</span>
                Diet Coke or coffee in hand. Always. Non-negotiable.
              </li>
              <li>
                <span className="trait-mark">—</span>
                Films and psychology: I over-analyse characters, motivations,
                and subtext until the people around me ask me to stop.
              </li>
              <li>
                <span className="trait-mark">—</span>
                Equal parts adrenaline and dessert. I'll try anything once,
                especially if it ends at a new café.
              </li>
              <li>
                <span className="trait-mark">—</span>
                Functions like a plant. Sunlight = operational.
                No sunlight = dramatic decline.
              </li>
            </ul>
          </motion.div>

          <motion.div className="about-divider" {...fade(0.26)} />

          {/* Skills */}
          <motion.div className="about-section" {...fade(0.3)}>
            <p className="about-section-label">What I bring</p>
            <ul className="about-attrs">
              <li>Product Design &amp; Systems Thinking</li>
              <li>Conversational AI Interfaces</li>
              <li>Real-time Data Visualization</li>
              <li>Zero-to-one Product Development</li>
            </ul>
          </motion.div>

          <motion.div className="about-divider" {...fade(0.34)} />

          {/* Links */}
          <motion.div className="about-links" {...fade(0.38)}>
            <a href="https://x.com/risheeta_singh" target="_blank" rel="noopener noreferrer" className="about-link">
              X ↗
            </a>
            <a href="https://www.linkedin.com/in/risheeta-singh-aa9541141/" target="_blank" rel="noopener noreferrer" className="about-link">
              LinkedIn ↗
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="about-link">
              Resume ↗
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
