import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { artPieces } from '../data/art'
import galleryBg from '../assets/art/gallery-bg.jpg'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

const VISIBLE_RANGE = 2

export default function Play({ theme, toggleTheme }: Props) {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const count = artPieces.length

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const go = useCallback((dir: number) => {
    setActive(a => (a + dir + count) % count)
  }, [count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, navigate])

  const piece = artPieces[active]

  return (
    <motion.div
      className="art-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="art-bg" style={{ backgroundImage: `url(${galleryBg})` }} />
      <div className="art-bg-overlay" />

      <Nav theme={theme} toggleTheme={toggleTheme} />

      <div className="art-stage">
        <button className="art-arrow art-arrow--left" onClick={() => go(-1)} aria-label="Previous piece">
          ‹
        </button>

        <div className="art-cards">
          {artPieces.map((p, i) => {
            let distance = i - active
            if (distance > count / 2) distance -= count
            if (distance < -count / 2) distance += count
            if (Math.abs(distance) > VISIBLE_RANGE) return null

            const isActive = distance === 0
            const x = distance * 210
            const scale = 1 - Math.abs(distance) * 0.22
            const rotate = distance * -9
            const blur = Math.abs(distance) * 5
            const opacity = 1 - Math.abs(distance) * 0.35

            return (
              <div
                key={p.id}
                className={`art-card${isActive ? ' art-card--active' : ''}`}
                style={{
                  transform: `translateX(${x}px) scale(${scale}) rotate(${rotate}deg)`,
                  filter: isActive ? 'none' : `blur(${blur}px)`,
                  opacity,
                  zIndex: 10 - Math.abs(distance),
                }}
                onClick={() => !isActive && setActive(i)}
              >
                <img src={p.image} alt={p.title} className="art-card-img" />
              </div>
            )
          })}
        </div>

        <button className="art-arrow art-arrow--right" onClick={() => go(1)} aria-label="Next piece">
          ›
        </button>
      </div>

      <motion.div
        key={piece.id}
        className="art-info"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="art-info-header">
          <h2 className="art-info-title">{piece.title}</h2>
          <span className="art-info-count">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
        </div>
        <p className="art-info-note">"{piece.note}"</p>
        <p className="art-info-medium">{piece.medium}</p>
      </motion.div>

      <div className="art-dots">
        {artPieces.map((p, i) => (
          <button
            key={p.id}
            className={`art-dot${i === active ? ' art-dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
