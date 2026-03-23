import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

const TEAL  = '#0d9488'
const AMBER = '#f59e0b'

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
}

function Placeholder({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      background: '#f5f5f3',
      border: '2px dashed #d8d8d4',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: '#aaa',
      letterSpacing: '0.06em',
    }}>
      {label}
    </div>
  )
}

export default function Axis({ theme, toggleTheme }: Props) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      className="cs-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* 1 — Hero */}
      <motion.section className="cs-section cs-hero" custom={0} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-eyebrow">Spectatr.ai · 2025</p>
        <h1 className="cs-title">Designing a Scalable Content Intelligence System</h1>
        <p className="cs-subtitle">Built for media teams that need to find, tag, and distribute 50TB+ of sports content at live-event speed.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <Placeholder label="Hero — Media Library View" />
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">Product Designer</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Duration</p>
            <p className="cs-meta-value">2025</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Skills</p>
            <p className="cs-meta-value">Product Design, UX Research, Design Systems</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Metrics */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="cs-metric-cards">
          {[
            { stat: '50TB+', desc: 'Sports content processed and made instantly searchable through the AXIS platform.' },
            { stat: '15K+',  desc: 'Stories delivered to athletes, teams, and sponsors via intelligent distribution.' },
            { stat: '50%',   desc: 'Higher social interactions achieved through faster, smarter content workflows.' },
          ].map(m => (
            <div key={m.stat} className="cs-metric-card">
              <div className="cs-metric-stat">{m.stat}</div>
              <p className="cs-metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3 — Overview */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Overview</p>
        <div className="cs-body-block">
          <p>AXIS is Spectatr's content intelligence platform — built for media teams managing massive volumes of sports footage. The challenge wasn't producing content. It was making it usable: findable, taggable, and distributable at the speed of live sport.</p>
          <p>The system needed to handle 50TB+ of media, support AI-assisted tagging, and connect content directly to distribution workflows. Every design decision centred one question: how do we make retrieval feel instant?</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="Overview — Search Interface" />
          <p className="cs-mock-caption">The search interface as the primary entry point into the AXIS content library.</p>
        </div>
      </motion.section>

      {/* 4 — The Problem */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>The problem</p>
        <h2 className="cs-heading">Content existed. But it wasn't usable.</h2>
        <p className="cs-body-single">Media teams had footage — lots of it. But finding the right clip during a live event was slow, inconsistent, and dependent on whoever had tagged it last. Metadata quality varied. Search was folder-based. Distribution was manual. The content lifecycle was broken at retrieval.</p>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="Problem — Fragmented Workflow" />
          <p className="cs-mock-caption">Fragmented workflows: content existed across siloed systems with no unified way to find or act on it.</p>
        </div>
      </motion.section>

      {/* 5 — The Strategy */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>The strategy</p>
        <h2 className="cs-heading">Design for retrieval-first, AI-first.</h2>
        <p className="cs-body-single">We reoriented the entire system around finding content, not storing it. Search became the primary interface. AI tagging handled the metadata layer. The media library was rebuilt to scale without sacrificing clarity. Distribution was surfaced inline — not hidden in a separate tool.</p>
        <p className="cs-body-single">Every feature was evaluated against one test: does this make content more immediately usable?</p>
      </motion.section>

      {/* 6 — Search */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Search</p>
        <h2 className="cs-heading">Search as the primary interface</h2>
        <p className="cs-body-single">We replaced folder navigation with natural language search. Users could query by player, event type, time range, or mood. Results surfaced instantly — ranked by relevance, filtered by context. Finding a clip became as fast as remembering it.</p>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="Search — Natural Language Query" />
          <p className="cs-mock-caption">Natural language search: users query content the same way they'd describe it out loud.</p>
        </div>
      </motion.section>

      {/* 7 — AI Tagging */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">AI Tagging</p>
        <h2 className="cs-heading">Balancing automation with trust</h2>
        <p className="cs-body-single">AI tagging reduced manual metadata work significantly — but we knew teams wouldn't trust it blindly. We designed a review layer: AI suggested tags, editors confirmed or corrected them. Over time, the model improved. Over time, teams stopped reviewing every tag because they didn't need to.</p>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="AI Tagging — Tag Review Panel" />
          <p className="cs-mock-caption">Tag review panel: AI-suggested metadata with one-click confirmation or correction.</p>
        </div>
      </motion.section>

      {/* 8 — Media Library */}
      <motion.section className="cs-section" custom={8} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Media Library</p>
        <h2 className="cs-heading">Structuring scale without losing clarity</h2>
        <p className="cs-body-single">At 50TB+, a traditional folder structure breaks down. We designed a grid-first library with dynamic filtering, smart collections, and contextual grouping by match, team, and event. Navigating 50,000 clips felt no different than navigating 50.</p>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="Media Library — Grid View" />
          <p className="cs-mock-caption">Media library grid: built to scale to any volume without losing navigation clarity.</p>
        </div>
      </motion.section>

      {/* 9 — Distribution */}
      <motion.section className="cs-section" custom={9} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Distribution</p>
        <h2 className="cs-heading">From finding to publishing in one flow</h2>
        <p className="cs-body-single">We eliminated the gap between finding content and distributing it. From the library, users could route clips directly to athletes, teams, sponsors, or social channels — without leaving the context of their search. Finding and publishing became a single, continuous action.</p>
        <div style={{ marginTop: 48 }}>
          <Placeholder label="Distribution — Routing Flow" />
          <p className="cs-mock-caption">Distribution routing: one action sends content to the right destination without breaking the workflow.</p>
        </div>
      </motion.section>

      {/* 10 — Research */}
      <motion.section className="cs-section" custom={10} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>Research</p>
        <h2 className="cs-heading">What we learned from media teams</h2>
        <p className="cs-body-single">We embedded with media professionals across live events, observing workflows, mapping pain points, and testing assumptions before building anything.</p>

        <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
          {[
            { method: 'User Interviews & Observation', question: 'How do media teams currently find and use footage during live events?' },
            { method: 'Workflow Mapping', question: 'Where are the biggest delays in the content lifecycle, from capture to publish?' },
            { method: 'Competitive Analysis', question: 'How do existing tools handle tagging, search, and distribution — and where do they fall short?' },
          ].map(r => (
            <div key={r.method} className="cs-takeaway-card">
              <p className="cs-takeaway-title">{r.method}</p>
              <p className="cs-takeaway-body">"{r.question}"</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="cs-sub-heading">What we found</h3>
          <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 24 }}>
            {[
              { n: '01', heading: 'Retrieval was the biggest bottleneck', body: "Teams weren't struggling to create content — they were struggling to find it. Search was either too manual or too rigid to work at live-event speed." },
              { n: '02', heading: 'Manual tagging bred unreliable metadata', body: 'Tag quality depended on individuals. Inconsistent metadata made content hard to trust and harder to search.' },
              { n: '03', heading: 'Tools were built for storage, not usage', body: 'Most systems focused on organizing content, not making it instantly actionable. Teams needed a system that moved from finding → using → distributing without friction.' },
            ].map(f => (
              <div key={f.n} className="cs-takeaway-card">
                <p className="cs-takeaway-title" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: TEAL, marginBottom: 8 }}>{f.n}</p>
                <p className="cs-takeaway-title">{f.heading}</p>
                <p className="cs-takeaway-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 11 — System Thinking */}
      <motion.section className="cs-section" custom={11} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">System thinking</p>
        <h2 className="cs-heading">Building for growth, not just today</h2>

        <div className="cs-takeaway-card" style={{ marginTop: 32, marginBottom: 40, background: '#f9f9f7' }}>
          <p className="cs-takeaway-title" style={{ color: TEAL, marginBottom: 12 }}>How Might We</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Design a search experience that feels as fast as memory — not as slow as a file browser?',
              'Make AI tagging reliable enough that teams trust it without reviewing every tag?',
              'Build a media library that scales to 50TB+ without losing clarity or navigation speed?',
            ].map((q, i) => (
              <li key={i} style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555', lineHeight: 1.6 }}>
                <span style={{ color: TEAL, marginRight: 8 }}>→</span>{q}
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-flow">
          {['Search', 'AI Tagging', 'Media Library', 'Distribution', 'Stories'].map((node, i, arr) => (
            <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="cs-flow-node">{node}</div>
              {i < arr.length - 1 && <span className="cs-flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 12 — Signing off / The Outcome */}
      <motion.section className="cs-section" custom={12} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Signing off!</p>
        <h2 className="cs-heading">The Outcome</h2>
        <p className="cs-body-single">AXIS became the operational backbone for sports media teams — a system that made 50TB of footage instantly usable and reduced the time from capture to distribution to minutes.</p>

        <div style={{ marginTop: 40 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              '50TB+ of sports content made instantly searchable',
              '15K+ stories delivered through intelligent distribution workflows',
              '50% increase in social interactions from faster content turnaround',
              'AI tagging reduced manual metadata work across content teams',
              'Search became the primary entry point, replacing folder-based navigation',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: 'var(--mono)', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                <span style={{ color: AMBER, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: TEAL }}>Why it mattered</p>
          <p className="cs-body-single">The sports media industry moves at the speed of live events. Every minute of delay between a goal and a published clip is a missed moment. AXIS made sure teams never had to choose between speed and quality — they could have both.</p>
        </div>
      </motion.section>

      {/* 13 — Closing */}
      <motion.section className="cs-section cs-closing" custom={13} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "When content becomes instantly findable, teams stop managing media and start telling stories."
        </p>
      </motion.section>

      {/* 14 — Next case study */}
      <motion.section className="cs-section cs-next-project" custom={14} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Next case study</p>
        <Link to="/work/jordy" className="cs-next-link">
          <p className="cs-next-meta">Spectatr.ai · 2025</p>
          <h2 className="cs-next-title" style={{ fontSize: 40 }}>Turning Live Sports Into Instant Stories <span className="cs-next-arrow">→</span></h2>
          <p className="cs-next-type">Conversational AI Agent</p>
        </Link>
      </motion.section>
    </motion.div>
  )
}
