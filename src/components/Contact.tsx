import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="contact-heading">
            Let's make<br />something.
          </h2>
          <div>
            <a
              className="contact-email"
              href="mailto:hello@spectatr.ai"
            >
              hello@spectatr.ai
            </a>
          </div>
          <ul className="contact-socials">
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter / X
              </a>
            </li>
            <li>
              <a href="https://read.cv" target="_blank" rel="noopener noreferrer">
                Read.cv
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
