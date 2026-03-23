import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import About from '../components/About'
import Contact from '../components/Contact'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

export default function AboutPage({ theme, toggleTheme }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <About />
      <Contact />
    </motion.div>
  )
}
