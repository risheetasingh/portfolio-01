import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Cursor from './components/Cursor'
import { CursorProvider } from './context/CursorContext'
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
import AetherFlowDemo from './pages/AetherFlowDemo'
import PrismaDemo from './pages/PrismaDemo'
import './App.css'

const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any },
}

function Portfolio() {
  return (
    <motion.div {...pageTransition}>
      <Nav />
      <Hero />
      <Work />
      <About compact />
      <Contact />
    </motion.div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  return (
    <CursorProvider>
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
            <Cursor />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio />} />
                <Route path="/work/ai-highlights" element={<AIHighlights />} />
                <Route path="/work/jordy" element={<Jordy />} />
                <Route path="/work/axis" element={<Axis />} />
                <Route path="/work/axis-b2c" element={<AxisB2C />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/demo/aether-flow" element={<AetherFlowDemo />} />
                <Route path="/demo/prisma" element={<PrismaDemo />} />
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </CursorProvider>
  )
}

export default App
