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

const VIOLET = '#7c3aed'
const ROSE   = '#f43f5e'

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any, delay: i * 0.07 },
  }),
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
      <div style={{ position: 'absolute', bottom: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' }}>
        {playing ? <Pause size={18} weight="fill" color="#fff" /> : <Play size={18} weight="fill" color="#fff" />}
      </div>
    </div>
  )
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* 1 — Hero */}
      <motion.section className="cs-section cs-hero" custom={0} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-eyebrow">Spectatr.ai · 2025</p>
        <h1 className="cs-title">Designing for One: Scaling an Enterprise Tool Down to a Single Creator</h1>
        <p className="cs-subtitle">Spectatr.ai's B2B product managed 50TB+ media libraries for sports organisations. The B2C brief was harder: make the same capability feel effortless for a single person with no team, no training, and no patience for onboarding.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <img src="/axis-b2c-hero.jpg" alt="Axis B2C Dashboard" className="cs-hero-img" style={{ borderRadius: 8 }} />
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
          <div className="cs-meta-col" style={{ gridColumn: '1 / -1', marginTop: 8 }}>
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">Team: 1 PM, 2 engineers, 1 designer (me). I owned research, IA, interaction design, and delivery. This was a 3-month project running in parallel with the B2B product — no dedicated eng resourcing; I shared engineers with the Axis team.</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Setting the Stage */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Setting the stage</p>
        <h2 className="cs-heading">Same technology. Different person.</h2>
        <div className="cs-body-block">
          <p>Individual creators — athletes, coaches, content teams of one — were already using the enterprise product in ways it wasn't built for. The brief was to design a version that fit how they actually worked.</p>
          <p>The challenge wasn't stripping the product down. It was identifying which decisions the enterprise version made for users — through process, training, and team structure — that the B2C version now had to make through design. Without an org to hold the product together, the interface had to carry that weight instead.</p>
        </div>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'From user interviews', value: 'I spend more time finding the clip than I do making the content.' },
            { label: 'From user interviews', value: 'The AI should just know what the best moments are — why do I have to tell it?' },
            { label: 'From user interviews', value: 'I get to the editing step and then give up. It\'s too many tools.' },
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
          <p>The product needed to be powerful enough for a media-savvy creator who wants to find a specific frame from a 3-hour game — and simple enough that someone uploading personal videos for the first time doesn't hit a wall on day one. These users live on the same platform. Sometimes they're the same person at different moments in their workflow.</p>
          <p>Two approaches were on the table. The first was a simplified mode — a stripped-down entry experience with an "advanced" toggle for users who wanted more. The second was making the most powerful feature the primary interface from the start. The first creates a ceiling. It implies the user needs to earn their way to capability. The second removes the floor entirely.</p>
          <p>AI Search became the home screen. Not a secondary tab. Not a feature in a dropdown. The first thing a user sees when they open the app is a text field. "Show me the goals from last Saturday." The full capability of the system is accessible immediately, without setup, without navigation, without reading anything. The interface is approachable because it's just a question — and capable because of what's answering it.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-b2c-search.mov" />
          <p className="cs-mock-caption">Search as the primary entry point — capability surfaced through a single prompt, not a navigation system.</p>
        </div>

      </motion.section>

      {/* 4 — Tension 02 */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: ROSE }}>Tension 02</p>
        <h2 className="cs-heading">Generated vs. Curated</h2>

        <TensionBar left="Generated" right="Curated" color={ROSE} />

        <div className="cs-body-block">
          <p>Highlight Creation is the product's most direct promise: upload a video, and the system assembles a highlight reel. No timeline scrubbing, no manual clip selection, no editor. But that promise carries a risk specific to individual creators — when the output doesn't feel like theirs, they don't just reject the clip. They lose confidence in the tool entirely.</p>
          <p>The first instinct was a confidence score — show the user how certain the AI was about each moment, let them filter by quality. We tested this. Users ignored low-confidence clips entirely, even when they were genuinely good moments. The score created an editorial hierarchy that didn't match how creators actually valued footage. A low-confidence frame of a goal is still a goal.</p>
          <p>Instead of confidence scores, the design surfaces editability. Every AI-generated reel opens in a trim state, not a preview state. The user's first interaction with the output is shaping it — not approving it. Video Cluster groups related moments by theme, so users can browse what happened rather than when it happened. That framing shift changes the emotional contract: the AI didn't make your highlight reel. It gave you a starting point that's already 80% there.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-b2c-highlights.mov" />
          <p className="cs-mock-caption">Highlight Creation — AI-assembled reels from uploaded footage, ready to trim and export.</p>
        </div>
      </motion.section>

      {/* 5 — Tension 03 */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: VIOLET }}>Tension 03</p>
        <h2 className="cs-heading">Generous vs. Sustainable</h2>

        <TensionBar left="Generous" right="Sustainable" color={VIOLET} />

        <div className="cs-body-block">
          <p>A credit-based free tier is a standard monetisation pattern — but it's also one of the most damaging experiences to get wrong. If a user discovers they've run out of credits mid-workflow, the product doesn't feel like it has limits. It feels broken. The moment you interrupt someone's creative momentum to ask them for money, you've already lost that user.</p>
          <p>Two patterns were considered. A hard paywall: lock features, show an upgrade modal when the user hits the limit. And soft limits: show the count permanently, never interrupt. The paywall creates a moment of disappointment tied directly to the product's most valuable action — that's the worst possible association to build. The aggressive credit counter creates anxiety and makes every action feel transactional before the user has seen any value.</p>
          <p>The resolution was ambient visibility. The credit balance lives in the sidebar footer — "500 | Free" — permanently in view, never in the way. It's not a notification. It's not a modal. It's a number that's always there, the way a battery indicator sits in the corner of your screen. Features approaching the paid tier get "Coming Soon" labels rather than locks, framing them as what the product is becoming rather than what's being withheld. The user always knows where they stand. They're never interrupted to be told.</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <VideoPlayer src="/axis-b2c-coming-soon.mov" />
          <p className="cs-mock-caption">"Coming Soon" framing on locked features — anticipation over restriction.</p>
        </div>
      </motion.section>

      {/* 5b — Metrics */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="cs-meta" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-value" style={{ fontSize: 32, fontWeight: 700, color: VIOLET }}>&lt; 10 min</p>
            <p className="cs-meta-label" style={{ marginTop: 6 }}>Time to first completed highlight from upload, without reading any documentation. The benchmark set before launch. Met by early access users.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-value" style={{ fontSize: 32, fontWeight: 700, color: VIOLET }}>3</p>
            <p className="cs-meta-label" style={{ marginTop: 6 }}>Core design tensions resolved. Each one had a rejected alternative that tested poorly — confidence scores, simplified mode, hard paywall.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-value" style={{ fontSize: 32, fontWeight: 700, color: VIOLET }}>0</p>
            <p className="cs-meta-label" style={{ marginTop: 6 }}>Documentation required to complete a first highlight. The design had to carry what onboarding used to.</p>
          </div>
        </div>
      </motion.section>

      {/* 5c — What I'd do differently */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: ROSE }}>What I'd do differently</p>
        <h2 className="cs-heading">Trim-first solved day one. It created a problem on day seven.</h2>
        <div className="cs-body-block">
          <p>The trim-first output was the right call for first-time users — it reframed AI output as a starting point, not a verdict. But it created friction for returning users who had already built trust with the system. By week two, users who were confident in the AI output still had to engage with the trim state before they could share. A 'use as-is' one-tap path would have served repeat users without undermining the first-time experience. I only discovered this in a follow-up session three weeks post-launch.</p>
          <p>The 'Coming Soon' label performed well in testing overall — but one participant described it as 'a little patronising.' They knew it was a paywall. The ambient framing reduced interruption anxiety but didn't eliminate the awareness that capability was being withheld. A more honest version might label it 'On the roadmap' with a visible release context, rather than language that implies imminence without committing to it.</p>
        </div>
      </motion.section>

      {/* 6 — Closing */}
      <motion.section className="cs-section cs-closing" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "The interface has to carry what a team used to."
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
            The B2C version of Axis didn't need fewer features. It needed fewer assumptions about who was holding them. AI Search removes the navigation burden. Highlight Creation removes the editing burden. The credit system removes the surprise. Each decision followed the same logic: find where the product was leaning on a team that no longer existed, and make the interface carry that weight instead. Success was defined before launch: a user who completes their first highlight within 10 minutes of uploading, without reading any documentation. Early access users hit that benchmark. The design decisions — search as entry point, trim-first output, ambient credit visibility — were validated against that single threshold.
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

      <Contact />
    </motion.div>
  )
}
