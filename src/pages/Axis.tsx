import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause } from '@phosphor-icons/react'
import Nav from '../components/Nav'
import Contact from '../components/Contact'

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

function FragmentedWorkflow() {
  return (
    <svg
      viewBox="-40 -40 940 500"
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Fragmented media workflow diagram"
    >
      <defs>
        <marker id="arr-gray" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L6.5,3 z" fill="#bbb" />
        </marker>
        <marker id="arr-amber" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L6.5,3 z" fill="#f59e0b" opacity="0.6" />
        </marker>
      </defs>

      {/* ── Broken arrows ───────────────────────────── */}

      {/* N1 → N2: long scenic arc over the top */}
      <path d="M 190,75 C 360,-20 500,-20 656,63"
        stroke="#bbb" strokeWidth="1.5" strokeDasharray="8,5" fill="none"
        markerEnd="url(#arr-gray)" />
      <text x="393" y="-4" fontFamily="var(--mono)" fontSize="9" fill="#bbb" textAnchor="middle" letterSpacing="0.06em">
        CC: ALL@TEAM.COM
      </text>

      {/* N2 → N3: loops wide right before arriving */}
      <path d="M 733,86 C 820,160 600,120 427,196"
        stroke="#bbb" strokeWidth="1.5" strokeDasharray="5,4" fill="none"
        markerEnd="url(#arr-gray)" />

      {/* N3 → N4: curves awkwardly before reaching destination */}
      <path d="M 350,219 C 260,290 200,248 123,330"
        stroke="#bbb" strokeWidth="1.5" strokeDasharray="5,4" fill="none"
        markerEnd="url(#arr-gray)" />

      {/* N4 → N1: back-cycle up left edge (amber = broken cycle) */}
      <path d="M 46,353 C -28,290 -28,138 36,98"
        stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" fill="none" opacity="0.65"
        markerEnd="url(#arr-amber)" />
      <text fontFamily="var(--mono)" fontSize="9" fill="#f59e0b" opacity="0.7" letterSpacing="0.06em">
        <textPath href="#retag-path" startOffset="50%" textAnchor="middle">RE-TAG MANUALLY</textPath>
      </text>
      {/* invisible path for textPath reference */}
      <path id="retag-path" d="M 46,353 C -28,290 -28,138 36,98" fill="none" stroke="none" />

      {/* N3 → N5: wide arc, goes up before swooping down */}
      <path d="M 504,219 C 600,148 752,228 729,318"
        stroke="#bbb" strokeWidth="1.5" strokeDasharray="5,4" fill="none"
        markerEnd="url(#arr-gray)" />

      {/* N5 → N2: second cycle loops right edge (amber) */}
      <path d="M 806,341 C 850,260 850,120 810,63"
        stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" fill="none" opacity="0.65"
        markerEnd="url(#arr-amber)" />

      {/* ── Nodes ───────────────────────────────────── */}

      {/* N1 — Spreadsheet Tags */}
      <rect x="36" y="52" width="154" height="46" rx="3" fill="var(--bg-elevated,#f9f9f7)" stroke="var(--border,#e0e0dc)" strokeWidth="1" />
      <text x="113" y="73" fontFamily="var(--mono)" fontSize="11" fill="var(--text-primary,#222)" textAnchor="middle" letterSpacing="0.04em" fontWeight="500">SPREADSHEET TAGS</text>
      <text x="113" y="88" fontFamily="var(--mono)" fontSize="9" fill="#aaa" textAnchor="middle" letterSpacing="0.04em">v12_FINAL_v2.xlsx</text>

      {/* N2 — Email Requests */}
      <rect x="656" y="40" width="154" height="46" rx="3" fill="var(--bg-elevated,#f9f9f7)" stroke="var(--border,#e0e0dc)" strokeWidth="1" />
      <text x="733" y="61" fontFamily="var(--mono)" fontSize="11" fill="var(--text-primary,#222)" textAnchor="middle" letterSpacing="0.04em" fontWeight="500">EMAIL REQUESTS</text>
      <text x="733" y="76" fontFamily="var(--mono)" fontSize="9" fill="#aaa" textAnchor="middle" letterSpacing="0.04em">47 unread</text>

      {/* N3 — Shared Drive */}
      <rect x="350" y="196" width="154" height="46" rx="3" fill="var(--bg-elevated,#f9f9f7)" stroke="var(--border,#e0e0dc)" strokeWidth="1" />
      <text x="427" y="217" fontFamily="var(--mono)" fontSize="11" fill="var(--text-primary,#222)" textAnchor="middle" letterSpacing="0.04em" fontWeight="500">SHARED DRIVE</text>
      <text x="427" y="232" fontFamily="var(--mono)" fontSize="9" fill="#f59e0b" textAnchor="middle" letterSpacing="0.04em" opacity="0.8">↻ 589 untagged</text>

      {/* N4 — Manual Export */}
      <rect x="46" y="330" width="154" height="46" rx="3" fill="var(--bg-elevated,#f9f9f7)" stroke="var(--border,#e0e0dc)" strokeWidth="1" />
      <text x="123" y="351" fontFamily="var(--mono)" fontSize="11" fill="var(--text-primary,#222)" textAnchor="middle" letterSpacing="0.04em" fontWeight="500">MANUAL EXPORT</text>
      <text x="123" y="366" fontFamily="var(--mono)" fontSize="9" fill="#aaa" textAnchor="middle" letterSpacing="0.04em">export_final(3).zip</text>

      {/* N5 — Folder Browse */}
      <rect x="652" y="318" width="154" height="46" rx="3" fill="var(--bg-elevated,#f9f9f7)" stroke="var(--border,#e0e0dc)" strokeWidth="1" />
      <text x="729" y="339" fontFamily="var(--mono)" fontSize="11" fill="var(--text-primary,#222)" textAnchor="middle" letterSpacing="0.04em" fontWeight="500">FOLDER BROWSE</text>
      <text x="729" y="354" fontFamily="var(--mono)" fontSize="9" fill="#aaa" textAnchor="middle" letterSpacing="0.04em">…/archive/2024/Q3/v2</text>
    </svg>
  )
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  return (
    <div className="video-wrap" style={{ cursor: 'pointer' }} onClick={toggle}>
      <video ref={videoRef} src={src} autoPlay loop muted playsInline className="cs-hero-img" />
      <div style={{
        position: 'absolute', bottom: 16, right: 16,
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.2s',
      }}>
        {playing ? <Pause size={18} weight="fill" color="#fff" /> : <Play size={18} weight="fill" color="#fff" />}
      </div>
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
          <div style={{ background: '#ffffff', borderRadius: 8, overflow: 'hidden' }}>
            <img src="/axis-hero.webp" alt="Axis content intelligence system" style={{ width: '100%', display: 'block' }} />
          </div>
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">Team: 1 PM, 3 engineers, and 1 designer (me). I led research, IA, and designed the search and tagging experience end-to-end, through to delivery. The distribution logic and AI model behaviour were defined by engineering constraints — I focused on shaping the UI around these systems rather than defining them.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Company</p>
            <p className="cs-meta-value">Spectatr.ai</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Year</p>
            <p className="cs-meta-value">2025</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Overview */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Overview</p>
        <div className="cs-body-block">
          <p>AXIS is Spectatr's content intelligence platform — built for media teams managing massive volumes of sports footage. The challenge wasn't producing content. It was making it usable: findable, taggable, and distributable at the speed of live sport.</p>
          <p>The system needed to handle 50TB+ of media, support AI-assisted tagging, and connect content directly to distribution workflows. Every design decision centred one question: how do we make retrieval feel instant?</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-overview.mov" />
          <p className="cs-mock-caption">AI Tagging in action — athletes automatically profiled with jersey numbers, teams, sport, and roles the moment content enters the system.</p>
        </div>
      </motion.section>

      {/* 3 — Research */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>Research</p>
        <h2 className="cs-heading">What we learned from media teams before building anything</h2>
        <p className="cs-body-single">We embedded with media professionals across live events — observing how footage moved from camera to publish, where handoffs broke down, and which parts of the workflow teams had learned to work around rather than fix.</p>

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
              { n: '02', heading: 'Manual tagging bred unreliable metadata', body: 'Tag quality depended on who last touched the file. Inconsistent metadata made content hard to trust and harder to search — especially under time pressure.' },
              { n: '03', heading: 'Tools were built for storage, not usage', body: 'Most systems optimised for organising content, not acting on it. The gap between finding a clip and distributing it required switching tools entirely.' },
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

      {/* 4 — The Problem */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>The problem</p>
        <h2 className="cs-heading">Content existed. But it wasn't usable.</h2>
        <p className="cs-body-single">Media teams had footage — lots of it. But finding the right clip during a live event was slow, inconsistent, and dependent on whoever had tagged it last. Metadata quality varied. Search was folder-based. Distribution was manual. The content lifecycle was broken at retrieval, not at production.</p>
        <div style={{ marginTop: 48 }}>
          <FragmentedWorkflow />
          <p className="cs-mock-caption">Fragmented workflows: content existed across siloed systems with no unified way to find, trust, or act on it.</p>
        </div>
      </motion.section>

      {/* 5 — The Strategy */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>The strategy</p>
        <h2 className="cs-heading">Retrieval-first. AI as infrastructure, not a feature.</h2>
        <div className="cs-body-block">
          <p>Research made two things clear: the problem wasn't storage — it was access. And the reason access was broken was that metadata was too unreliable to search against. Two approaches were on the table: improve the tagging workflow so humans produced better metadata, or make metadata generation automatic so the quality floor was always high enough to search.</p>
          <p>We chose the second. Improving human tagging meant the system was only as good as the slowest editor under the most time pressure. AI tagging meant every piece of content was instantly queryable the moment it entered the system, regardless of who uploaded it or when. Search became the primary interface — not a feature inside a file browser, but the front door. Every other surface was built to support that entry point.</p>
        </div>

        <div className="cs-takeaway-card" style={{ marginTop: 40, marginBottom: 0, background: '#f9f9f7' }}>
          <p className="cs-takeaway-title" style={{ color: TEAL, marginBottom: 12 }}>Design questions that shaped the system</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'How do we make search feel as fast as memory — not as slow as a file browser?',
              'How do we make AI tagging reliable enough that teams trust it without reviewing every tag?',
              'How do we build a media library that scales to 50TB+ without losing navigation clarity?',
            ].map((q, i) => (
              <li key={i} style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#555', lineHeight: 1.6 }}>
                <span style={{ color: TEAL, marginRight: 8 }}>→</span>{q}
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-flow" style={{ marginTop: 40 }}>
          {['Search', 'AI Tagging', 'Media Library', 'Distribution', 'Stories'].map((node, i, arr) => (
            <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="cs-flow-node">{node}</div>
              {i < arr.length - 1 && <span className="cs-flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6 — Upload */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Upload</p>
        <h2 className="cs-heading">Starting point: getting content into the system</h2>
        <p className="cs-body-single">Before content can be found, it has to land somewhere. The upload experience was designed to feel immediate — drag, drop, and the system gets to work. AI tagging begins in the background the moment a file is received. The user doesn't configure anything. The system handles classification automatically.</p>
        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-upload.mov" />
          <p className="cs-mock-caption">Upload flow: content enters the system and AI processing begins immediately — no manual tagging required.</p>
        </div>
      </motion.section>

      {/* 7 — Search */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Search</p>
        <h2 className="cs-heading">Search as the primary interface</h2>
        <p className="cs-body-single">We replaced folder navigation with natural language search. The decision wasn't just about UX — it was about what the metadata layer could now support. Because AI tagging made every asset consistently structured, search could be reliable. Users query by player, event, time range, or mood. Results surface instantly. Finding a clip became as fast as remembering it.</p>
        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-search.mov" />
          <p className="cs-mock-caption">Natural language search: users query content the same way they'd describe it to a colleague.</p>
        </div>
      </motion.section>

      {/* 8 — AI Tagging */}
      <motion.section className="cs-section" custom={8} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">AI Tagging</p>
        <h2 className="cs-heading">Making automation trustworthy, not just fast</h2>
        <p className="cs-body-single">The risk with AI tagging isn't accuracy — it's trust. A team that doesn't believe the tags won't use the search. We designed a review layer that made the AI's output visible and correctable: suggested tags surfaced per asset, one-click to confirm or edit. The goal wasn't to make editors approve everything. It was to make the first correction feel so easy that teams did it without thinking, and eventually stopped needing to.</p>
        <div style={{ marginTop: 48 }}>
          <img src="/axis-tagging.webp" alt="AI tagging tag review panel" style={{ width: '100%', borderRadius: 8, display: 'block' }} />
          <p className="cs-mock-caption">Tag review panel: AI-suggested metadata with one-click confirmation or correction — correction feels like part of the flow, not an error state.</p>
        </div>
      </motion.section>

      {/* 9 — Media Library */}
      <motion.section className="cs-section" custom={9} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Media Library</p>
        <h2 className="cs-heading">Structuring scale without losing clarity</h2>
        <p className="cs-body-single">At 50TB+, a traditional folder structure breaks down — not because folders don't work, but because the mental model of "browse to find" fails at scale. We designed a grid-first library with dynamic filtering, smart collections, and contextual grouping by match, team, and event. The constraint was this: navigating 50,000 clips had to feel identical to navigating 50.</p>
        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-library.mov" />
          <p className="cs-mock-caption">Media library grid: volume doesn't change the experience — the filtering layer does the work instead.</p>
        </div>
      </motion.section>

      {/* 10 — Distribution */}
      <motion.section className="cs-section" custom={10} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Distribution</p>
        <h2 className="cs-heading">From finding to publishing in one action</h2>
        <p className="cs-body-single">Before AXIS, distribution was a separate workflow. Teams would find a clip, export it, move to another tool, and route it manually to the right destination. We eliminated that gap. From the library, users route clips directly to athletes, teams, sponsors, or social channels in a single action — without leaving the context of what they were doing. Finding and publishing became continuous, not sequential.</p>
        <div style={{ marginTop: 48 }}>
          <iframe
            src="/distribution-flow.html"
            style={{ width: '100%', height: 560, border: '1px solid var(--border)', borderRadius: 8, display: 'block' }}
            title="Distribution routing flow"
          />
          <p className="cs-mock-caption">One action routes content to athletes, teams, sponsors, and social — no context switch, no separate tool.</p>
        </div>
      </motion.section>

      {/* 11 — Outcome */}
      <motion.section className="cs-section" custom={11} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Outcome</p>
        <h2 className="cs-heading">What changed after AXIS shipped</h2>
        <p className="cs-body-single">The most meaningful shift wasn't a metric — it was a behavioural one. Teams stopped managing footage and started telling stories. The time from clip capture to published story dropped to minutes. Distribution became something editors did in the same breath as finding content, not a separate job at the end of the day.</p>

        <div style={{ marginTop: 40 }}>
          <div className="cs-metric-cards">
            {[
              { stat: '50TB+', desc: 'Sports content made instantly searchable across 3 client organisations at launch. Searchability depended on the AI tagging pipeline — I designed the interface that made tags trustworthy enough for editors to rely on.' },
              { stat: '15K+',  desc: 'Stories distributed across NSL and two partner leagues over 6 months post-launch. Attribution to design is partial — the inline distribution feature reduced tool-switching friction that previously caused editors to defer or skip distribution.' },
              { stat: '50%',   desc: 'Reported increase in social interactions by client social teams. Causal link is directional, not controlled — faster content turnaround was one factor among several, including platform algorithm changes during the same period.' },
            ].map(m => (
              <div key={m.stat} className="cs-metric-card">
                <div className="cs-metric-stat">{m.stat}</div>
                <p className="cs-metric-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: TEAL }}>What I'd do differently</p>
          <p className="cs-body-single">The AI tagging review layer was designed for adoption — making correction easy enough that teams did it. In retrospect, it should have been designed for deprecation: tracking correction rates per tag type so the model could surface which categories still needed human review and which had earned automatic trust. Trust wasn't binary. The interface treated it like it was.</p>
        </div>
      </motion.section>

      {/* 13 — Closing */}
      <motion.section className="cs-section cs-closing" custom={13} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "The retrieval problem was real. But the trust problem was harder. Editors didn't stop using manual tags because search got better — they stopped when they saw the AI get it right enough times in a row that checking felt unnecessary. That threshold is a design problem. We solved it accidentally. I'd design for it deliberately next time."
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

      <Contact />
    </motion.div>
  )
}
