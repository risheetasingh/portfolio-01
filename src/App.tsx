import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Loader from './components/Loader'
import AIHighlights from './pages/AIHighlights'
import Jordy from './pages/Jordy'
import Axis from './pages/Axis'
import AxisB2C from './pages/AxisB2C'
import AboutPage from './pages/AboutPage'
import './App.css'

type Theme = 'light' | 'dark'

const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
}

function Portfolio({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  return (
    <motion.div {...pageTransition}>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Work />
      <About compact />
      <Contact />
    </motion.div>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ minHeight: '100svh' }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Portfolio theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/work/ai-highlights" element={<AIHighlights theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/work/jordy" element={<Jordy theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/work/axis" element={<Axis theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/work/axis-b2c" element={<AxisB2C theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/about" element={<AboutPage theme={theme} toggleTheme={toggleTheme} />} />
            </Routes>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
