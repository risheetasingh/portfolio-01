import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

const VIOLET = '#7c3aed'
const ROSE   = '#f43f5e'

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

function TensionBar({ left, right, color }: { left: string; right: string; color: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      margin: '40px 0',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}>
      <span style={{
        padding: '10px 20px',
        border: `1px solid ${color}`,
        color,
        borderRadius: '2px 0 0 2px',
      }}>{left}</span>
      <span style={{
        padding: '10px 16px',
        background: color,
        color: '#fff',
        fontSize: 14,
        lineHeight: 1,
      }}>↔</span>
      <span style={{
        padding: '10px 20px',
        border: `1px solid ${color}`,
        color,
        borderRadius: '0 2px 2px 0',
      }}>{right}</span>
    </div>
  )
}

export default function AxisB2C({ theme, toggleTheme }: Props) {
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
        <h1 className="cs-title">How People Find Moments Instantly</h1>
        <p className="cs-subtitle">What changes when the user isn't a media team — they're a person.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <Placeholder label="Hero — B2C Dashboard" />
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Company</p>
            <p className="cs-meta-value">Spectatr.ai</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Year</p>
            <p className="cs-meta-value">2025</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Type</p>
            <p className="cs-meta-value">B2C Digital Asset Management</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Platform</p>
            <p className="cs-meta-value">Web App</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Setting the Stage */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Setting the stage</p>
        <h2 className="cs-heading">Same technology. Different person.</h2>
        <div className="cs-body-block">
          <p>Axis was built for enterprise media teams — organisations managing 50TB+ of sports footage with dedicated workflows, IT support, and trained staff. The B2C version asked what happens when you hand that same capability to a single person: a content creator, an athlete, a journalist working alone.</p>
          <p>The challenge wasn't stripping the product down. It was identifying which decisions the enterprise version made for users — through process, training, and team structure — that the B2C version now had to make through design. Without an org to hold the product together, the interface had to do more.</p>
        </div>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Pain point', value: 'Hard to find the exact moment I need' },
            { label: 'Pain point', value: 'Managing transcripts and notes is painful' },
            { label: 'Pain point', value: 'Sharing and collaborating is messy' },
          ].map((item, i) => (
            <div key={i} className="cs-takeaway-card" style={{ borderLeft: `2px solid ${VIOLET}` }}>
              <p className="cs-meta-label" style={{ marginBottom: 12 }}>{item.label}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, letterSpacing: '0.01em' }}>"{item.value}"</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3 — Tension 01 */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: VIOLET }}>Tension 01</p>
        <h2 className="cs-heading">Capable vs. Approachable</h2>

        <TensionBar left="Capable" right="Approachable" color={VIOLET} />

        <div className="cs-body-block">
          <p>The product needed to be powerful enough for a media-savvy creator who wants to find a specific frame from a 3-hour game — and simple enough that someone uploading personal videos for the first time doesn't hit a wall on day one. These users live on the same platform, sometimes they're the same person at different moments in their workflow.</p>
          <p>The temptation was to design a tiered experience — a "simple mode" and an "advanced mode." But mode-switching creates friction and implies the user needs to level up before they get value. The better question was: what if the interface itself was the simplest possible thing, and the capability was always just one query away?</p>
          <p>The resolution was making AI Search the front door. Instead of navigating folders, filters, and tags to find content, a user opens the app and types. "Show me Messi's goals with crowd noise." The full capability of the system is accessible immediately, without any prior setup. The interface is approachable because it's just a question — and capable because of what's answering it.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <Placeholder label="AI Search — Natural Language Entry" />
          <p className="cs-mock-caption">Search as the primary entry point — capability surfaced through a single prompt, not a navigation system.</p>
        </div>

        <div style={{ marginTop: 40 }}>
          <Placeholder label="AI Search — Results State" />
          <p className="cs-mock-caption">Results scoped by library and output format — depth available, but never required to get started.</p>
        </div>
      </motion.section>

      {/* 4 — Tension 02 */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: ROSE }}>Tension 02</p>
        <h2 className="cs-heading">Automated vs. Trustworthy</h2>

        <TensionBar left="Automated" right="Trustworthy" color={ROSE} />

        <div className="cs-body-block">
          <p>AI tagging and metadata generation is the core value proposition — users upload a video and the system immediately understands what's in it. But automated output carries a specific design risk: when it's wrong, users don't just lose confidence in that tag. They lose confidence in the entire system.</p>
          <p>The question wasn't whether to use AI — it was how to present AI output so that users engage with it as a starting point rather than a verdict. Enterprise teams have editors who review and correct metadata as part of their job. Individual users don't have that buffer. The design had to be the buffer.</p>
          <p>The resolution was a metadata layer that is automated by default, visibly editable by design. Every AI-generated label is surfaced clearly — name, category, duration — as a baseline the user can act on immediately or refine over time. The system doesn't hide that AI did the work. It shows it, and makes correcting it feel like part of the flow rather than an error state. Trust is built by making the AI's reasoning visible and the user's override effortless.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <Placeholder label="Upload Library — AI Metadata Layer" />
          <p className="cs-mock-caption">AI-generated metadata surfaced per file — automated by default, correctable without disrupting the workflow.</p>
        </div>

        <div style={{ marginTop: 40 }}>
          <Placeholder label="Video Library — Tagged Thumbnails" />
          <p className="cs-mock-caption">Thumbnail labels carry AI-assigned categories — visible, consistent, and editable at any point.</p>
        </div>
      </motion.section>

      {/* 5 — Tension 03 */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: VIOLET }}>Tension 03</p>
        <h2 className="cs-heading">Generous vs. Sustainable</h2>

        <TensionBar left="Generous" right="Sustainable" color={VIOLET} />

        <div className="cs-body-block">
          <p>A credit-based free tier is a standard monetisation pattern — but it's also one of the most damaging experiences to get wrong. If a user discovers they've run out of credits mid-workflow, the product doesn't feel like it has limits. It feels broken. The moment you interrupt someone's creative momentum to ask them for money, you've already lost.</p>
          <p>The instinct in many products is to hide the limit until it becomes relevant — reveal the paywall only when the user tries to exceed it. This feels efficient until you realise it means users build habits without understanding the cost, then get surprised at the worst possible time. The opposite instinct — surfacing credits aggressively — creates anxiety and makes every interaction feel transactional.</p>
          <p>The resolution was ambient visibility. The credit balance lives in the sidebar footer — "500 | Free" — permanently in view, never in the way. It's not a notification. It's not a modal. It's just a number that's always there, the way a battery indicator is always in the corner of your screen. Features approaching the paid tier get "Coming Soon" labels rather than locks, framing them as what the product is becoming rather than what's being withheld. The user always knows where they stand. They never feel interrupted to be told.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <Placeholder label="Sidebar — Ambient Credit Indicator" />
          <p className="cs-mock-caption">Credit balance in the sidebar footer — always visible, never intrusive, never a surprise.</p>
        </div>

        <div style={{ marginTop: 40 }}>
          <Placeholder label="Navigation — Coming Soon Labels" />
          <p className="cs-mock-caption">"Coming Soon" framing on locked features — anticipation over restriction.</p>
        </div>
      </motion.section>

      {/* 6 — Closing */}
      <motion.section className="cs-section cs-closing" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "When you remove the org and give the tool to a person, everything that was structural becomes friction."
        </p>
        <div style={{
          marginTop: 56,
          paddingTop: 40,
          borderTop: '1px solid var(--border)',
          textAlign: 'left',
          maxWidth: 640,
          margin: '56px auto 0',
        }}>
          <p className="cs-section-label" style={{ color: ROSE, marginBottom: 20 }}>What this showed</p>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: 13,
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
          }}>
            The B2C version of Axis didn't need fewer features. It needed fewer assumptions. Every tension in this case study came from a place where the enterprise product leaned on organisational structure to resolve a design problem — and the B2C version had to resolve it through the interface instead. The product shipped recently, with no outcome data yet. But the decisions made here reflect a clear design principle: capability earns trust only when it doesn't require explanation.
          </p>
        </div>
      </motion.section>

      {/* 7 — Next case study */}
      <motion.section className="cs-section cs-next-project" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Next case study</p>
        <Link to="/work/ai-highlights" className="cs-next-link">
          <p className="cs-next-meta">Spectatr.ai · 2025</p>
          <h2 className="cs-next-title" style={{ fontSize: 40 }}>Live sports move fast. Media workflows don't. <span className="cs-next-arrow">→</span></h2>
          <p className="cs-next-type">Real-time Highlights System</p>
        </Link>
      </motion.section>

    </motion.div>
  )
}
