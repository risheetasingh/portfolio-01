import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Theme = 'light' | 'dark'

interface NavProps {
  theme?: Theme
  toggleTheme?: () => void
}

export default function Nav(_props: NavProps) {
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
          <li><Link to="/play">Play</Link></li>
        </ul>
      </div>
    </nav>
  )
}
