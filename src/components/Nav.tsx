import { Link, useLocation } from 'react-router-dom'

type Theme = 'light' | 'dark'

interface NavProps {
  theme?: Theme
  toggleTheme?: () => void
}

export default function Nav(_props: NavProps) {
  const location = useLocation()
  const isPortfolio = location.pathname === '/'

  const scrollTo = (id: string) => {
    if (isPortfolio) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav-pill">
      <Link to="/" className="nav-pill-wordmark">Risheeta Singh</Link>
      <ul className="nav-pill-links">
        <li>
          {isPortfolio
            ? <a href="#work" onClick={e => { e.preventDefault(); scrollTo('work') }}>Work</a>
            : <Link to="/#work" onClick={() => { setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100) }}>Work</Link>
          }
        </li>
        <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
        <li><Link to="/about">Off-Duty</Link></li>
      </ul>
    </nav>
  )
}
