import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Designing How Fans Interact with Live Sports',
    headline: 'Turning Live Sports Into Instant Stories',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Conversational AI Agent',
    bg: '#1a1a1a',
    accent: '#e8e4da',
  },
  {
    title: "Live sports move fast. Media workflows don't.",
    headline: "Live sports move fast. Media workflows don't.",
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Real-time Highlights System',
    bg: '#0d1a0f',
    accent: '#b8d4bb',
  },
  {
    title: 'Designing a Scalable Content Intelligence System',
    headline: 'One system for the entire content lifecycle.',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Content Management System',
    bg: '#0f0f1a',
    accent: '#c4c0e8',
  },
  {
    title: 'How People Find Moments Instantly',
    headline: 'How People Find Moments Instantly',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'B2C Digital Asset Management',
    bg: '#1a100d',
    accent: '#e8c4b8',
  },
]

const projectRoutes: Record<string, string> = {
  'Designing How Fans Interact with Live Sports': '/work/jordy',
  "Live sports move fast. Media workflows don't.": '/work/ai-highlights',
  'Designing a Scalable Content Intelligence System': '/work/axis',
  'How People Find Moments Instantly': '/work/axis-b2c',
}

export default function Work() {
  const [activeProject, setActiveProject] = useState(0)
  const navigate = useNavigate()
  const p = projects[activeProject]
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const rightPanelRef = useRef<HTMLDivElement>(null)

  // Compute rounded notch path — clip-path: path() uses absolute pixels
  // so we recalculate on resize for a perfectly circular corner radius.
  useEffect(() => {
    const panel = rightPanelRef.current
    if (!panel) return

    const buildPath = () => {
      const { width: w, height: h } = panel.getBoundingClientRect()
      const r   = 16   // outer corner radius
      const rn  = 8    // notch inner corner radius
      const nW  = w * 0.055   // notch depth
      const nT  = h * 0.38    // notch top Y
      const nB  = h * 0.62    // notch bottom Y

      const d = [
        `M ${r} 0`,
        `H ${w - r}`, `Q ${w} 0 ${w} ${r}`,
        `V ${h - r}`, `Q ${w} ${h} ${w - r} ${h}`,
        `H ${r}`,     `Q 0 ${h} 0 ${h - r}`,
        `V ${nB + rn}`, `Q 0 ${nB} ${rn} ${nB}`,
        `H ${nW - rn}`, `Q ${nW} ${nB} ${nW} ${nB - rn}`,
        `V ${nT + rn}`, `Q ${nW} ${nT} ${nW - rn} ${nT}`,
        `H ${rn}`,      `Q 0 ${nT} 0 ${nT - rn}`,
        `V ${r}`,       `Q 0 0 ${r} 0`,
        `Z`,
      ].join(' ')

      panel.style.clipPath = `path('${d}')`
    }

    buildPath()
    const ro = new ResizeObserver(buildPath)
    ro.observe(panel)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex(el => el === entry.target)
            if (index !== -1) setActiveProject(index)
          }
        })
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    )
    const refs = itemRefs.current
    refs.forEach(el => { if (el) observer.observe(el) })
    return () => refs.forEach(el => { if (el) observer.unobserve(el) })
  }, [])

  const handleProjectClick = (title: string) => {
    const route = projectRoutes[title]
    if (route) {
      sessionStorage.setItem('portfolioScroll', String(window.scrollY))
      navigate(route)
    }
  }

  return (
    <section className="work" id="work">
      <div className="work-inner">
        {/* Left */}
        <div className="work-left">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>
          <ul className="work-list">
            {projects.map((project, i) => {
              const distance = Math.abs(i - activeProject)
              const opacity = distance === 0 ? 1 : distance === 1 ? 0.3 : 0.15
              return (
                <li
                  key={project.title}
                  ref={el => { itemRefs.current[i] = el }}
                  className={`work-item${activeProject === i ? ' active' : ''}${projectRoutes[project.title] ? ' linked' : ''}`}
                  style={{ opacity, transition: 'opacity 0.4s ease' }}
                  onClick={() => handleProjectClick(project.title)}
                >
                  <div className="work-item-header">
                    <span className="work-item-title">{project.title}</span>
                    <span className="work-item-arrow">→</span>
                  </div>
                  <p className="work-item-meta">
                    {project.type} &nbsp;·&nbsp; {project.company} &nbsp;·&nbsp; {project.year}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right */}
        <div className="work-right">
          <div className="work-right-inner" ref={rightPanelRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                className="work-visual-wrap"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="work-visual"
                  style={{
                    background: `linear-gradient(160deg, ${p.bg} 0%, ${p.accent}22 100%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '56px 64px',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: p.accent,
                    opacity: 0.5,
                    marginBottom: '14px',
                  }}>
                    {p.type}
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    color: p.accent,
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                  }}>
                    {p.headline}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="work-counter">
              {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
