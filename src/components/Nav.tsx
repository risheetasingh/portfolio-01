import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Theme = 'light' | 'dark'

interface NavProps {
  theme: Theme
  toggleTheme: () => void
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  const location = useLocation()
  const isPortfolio = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    if (isPortfolio) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <Link to="/" className="nav-wordmark">RS —</Link>
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            {isPortfolio
              ? <a href="#work" onClick={e => { e.preventDefault(); scrollTo('work') }}>Work</a>
              : <Link to="/#work" onClick={() => { setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100) }}>Work</Link>
            }
          </li>
          <li><Link to="/about">About</Link></li>
          <li><a href="mailto:risheetas.design@gmail.com">Contact</a></li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.25" />
              <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="3.05" y1="3.05" x2="4.11" y2="4.11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="11.89" y1="11.89" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="12.95" y1="3.05" x2="11.89" y2="4.11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="4.11" y1="11.89" x2="3.05" y2="12.95" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 9.5a6 6 0 1 1-7-7 4.5 4.5 0 0 0 7 7z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
