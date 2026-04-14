import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeSimple, LinkedinLogo, XLogo, FileText } from '@phosphor-icons/react'
import AsciiArt from './AsciiArt'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Contact() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  return (
    <footer className="footer" id="contact">
      {/* ASCII art as background layer */}
      <AsciiArt
        src="/hands.png"
        characters=" .,:-;rvnjcztxifkwLCG0@#"
        fgColor="#E60023"
        bgColor={isDark ? '#0a0a0a' : '#f7f7f5'}
        highlightColor="#ff6b4a"
        highlightRadius={200}
        parallaxIntensity={4}
        cellSize={7}
        className="footer-ascii-bg"
      />
      <div className="footer-content">
        <div className="footer-inner">
          {/* Left column */}
          <div className="footer-col">
            <motion.p className="footer-label" {...fade(0)}>Get in touch</motion.p>
            <motion.ul className="footer-icons" {...fade(0.06)}>
              <li><a href="mailto:risheetas.design@gmail.com" aria-label="Email"><EnvelopeSimple size={20} /></a></li>
              <li><a href="https://www.linkedin.com/in/risheeta-singh-aa9541141/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinLogo size={20} /></a></li>
              <li><a href="https://x.com/risheeta_singh" target="_blank" rel="noopener noreferrer" aria-label="X"><XLogo size={20} /></a></li>
              <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume"><FileText size={20} /></a></li>
            </motion.ul>
          </div>

          {/* Center column — removed, links merged into Get in touch */}

          {/* Right column */}
          <div className="footer-col footer-col--right">
            <motion.p className="footer-label" {...fade(0.2)}>Availability</motion.p>
            <motion.p className="footer-status" {...fade(0.26)}>
              Open to opportunities
            </motion.p>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div className="footer-bottom" {...fade(0.3)}>
          <p className="footer-tagline">
            Built somewhere between procrastination spirals, Claude Code prompts, and an unreasonable amount of Diet Coke.
          </p>
          <p className="footer-copy">RS — 2026</p>
        </motion.div>
      </div>
    </footer>
  )
}
