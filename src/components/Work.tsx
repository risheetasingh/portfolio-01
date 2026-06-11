import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { JordyPreview, HighlightsPreview, AxisPreview, AxisB2CPreview } from './WorkAnimations'

const projects = [
  {
    title: 'Designing How Fans Interact with Live Sports',
    headline: 'Turning Live Sports Into Instant Stories',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Conversational AI Agent',
    bg: '#1a1a1a',
    accent: '#e8e4da',
    preview: JordyPreview,
  },
  {
    title: "Live sports move fast. Media workflows don't.",
    headline: "Live sports move fast. Media workflows don't.",
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Real-time Highlights System',
    bg: '#0d1a0f',
    accent: '#b8d4bb',
    preview: HighlightsPreview,
  },
  {
    title: 'Designing a Scalable Content Intelligence System',
    headline: 'One system for the entire content lifecycle.',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'Content Management System',
    bg: '#0f0f1a',
    accent: '#c4c0e8',
    preview: AxisPreview,
  },
  {
    title: 'How People Find Moments Instantly',
    headline: 'How People Find Moments Instantly',
    company: 'Spectatr.ai',
    year: '2025',
    type: 'B2C Digital Asset Management',
    bg: '#1a100d',
    accent: '#e8c4b8',
    preview: AxisB2CPreview,
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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const displayProject = hoveredProject !== null ? hoveredProject : activeProject
  const navigate = useNavigate()
  const p = projects[displayProject]
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const notchCenterRef = useRef(0.5)

  // Scroll-driven notch position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const notchCenter = useTransform(scrollYProgress, [0.15, 0.85], [0.20, 0.80])

  const buildPath = useCallback(() => {
    const panel = rightPanelRef.current
    if (!panel) return
    const { width: w, height: h } = panel.getBoundingClientRect()
    const r      = 16     // outer corner radius
    const nW     = w * 0.065  // notch depth
    const rn     = 12     // notch corner radius
    const center = notchCenterRef.current
    const notchH = h * 0.30
    const nT     = Math.max(r + rn + 10, h * center - notchH / 2)
    const nB     = Math.min(h - r - rn - 10, h * center + notchH / 2)
    const slant  = notchH * 0.12  // inward taper on each side

    // Inner edge Y positions (trapezoid: narrower inside)
    const nTi = nT + slant
    const nBi = nB - slant

    // Unit vectors along the slanted edges
    const sLen = Math.sqrt(nW * nW + slant * slant)
    const sUx  = nW / sLen       // horizontal component
    const sUy  = slant / sLen    // vertical component

    // Path goes clockwise. Notch traversed bottom→top (upward along left edge).
    // Vertices: P4(0,nB) → P3(nW,nBi) → P2(nW,nTi) → P1(0,nT)
    const d = [
      `M ${r} 0`,
      `H ${w - r}`, `Q ${w} 0 ${w} ${r}`,
      `V ${h - r}`, `Q ${w} ${h} ${w - r} ${h}`,
      `H ${r}`,     `Q 0 ${h} 0 ${h - r}`,
      // Up left edge to P4 (bottom-left of notch)
      `V ${nB + rn}`,
      `Q 0 ${nB} ${rn * sUx} ${nB - rn * sUy}`,
      // Slanted line up-right to near P3 (inner bottom-right)
      `L ${nW - rn * sUx} ${nBi + rn * sUy}`,
      `Q ${nW} ${nBi} ${nW} ${nBi - rn}`,
      // Up inner edge to P2 (inner top-right)
      `V ${nTi + rn}`,
      `Q ${nW} ${nTi} ${nW - rn * sUx} ${nTi - rn * sUy}`,
      // Slanted line up-left to near P1 (top-left of notch)
      `L ${rn * sUx} ${nT + rn * sUy}`,
      `Q 0 ${nT} 0 ${nT - rn}`,
      // Continue up left edge
      `V ${r}`, `Q 0 0 ${r} 0`,
      `Z`,
    ].join(' ')

    panel.style.clipPath = `path('${d}')`
  }, [])

  // Subscribe to scroll-driven notch center changes
  useEffect(() => {
    return notchCenter.on('change', (v) => {
      notchCenterRef.current = v
      buildPath()
    })
  }, [notchCenter, buildPath])

  // Rebuild clip-path on resize
  useEffect(() => {
    const panel = rightPanelRef.current
    if (!panel) return
    buildPath()
    const ro = new ResizeObserver(buildPath)
    ro.observe(panel)
    return () => ro.disconnect()
  }, [buildPath])

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
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
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
    <section className="work" id="work" ref={sectionRef}>
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
              return (
                <li
                  key={project.title}
                  ref={el => { itemRefs.current[i] = el }}
                  className={`work-item${activeProject === i ? ' active' : ''}${projectRoutes[project.title] ? ' linked' : ''}`}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
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
            <AnimatePresence mode="sync">
              <motion.div
                key={displayProject}
                className="work-visual-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <div
                  className="work-visual"
                  style={{ background: p.bg, position: 'relative', overflow: 'hidden' }}
                >
                  {/* Animated preview */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <p.preview />
                  </div>
                  {/* Gradient + text overlay at bottom */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, ${p.bg}dd 70%, ${p.bg} 88%)`,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '56px 64px', zIndex: 1,
                  }}>
                    <div style={{
                      fontFamily: 'var(--mono)', fontSize: '11px',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: p.accent, opacity: 0.5, marginBottom: '14px',
                    }}>
                      {p.type}
                    </div>
                    <div style={{
                      fontSize: '32px', fontWeight: 600,
                      color: p.accent, lineHeight: 1.25, letterSpacing: '-0.02em',
                    }}>
                      {p.headline}
                    </div>
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
