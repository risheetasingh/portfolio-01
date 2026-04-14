import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import Nav from '../components/Nav'
import Contact from '../components/Contact'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

const BLUE   = '#2563eb'
const INDIGO = '#4338ca'
const AMBER  = '#f59e0b'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
}

// ── JordyChatMockup ────────────────────────────────────────────────────────────

function JordyChatMockup() {
  const widgets = [
    { label: 'Who should I start?', color: '#1e3a8a', text: '#93c5fd' },
    { label: 'Injury News',          color: '#14532d', text: '#86efac' },
    { label: 'DFS Lineup',           color: '#4c1d95', text: '#c4b5fd' },
    { label: 'Top Waiver Wire Pickups', color: '#7c2d12', text: '#fca5a5' },
  ]
  const conversations = [
    'Best QB picks for week 14?',
    'Should I drop Davante Adams?',
  ]
  return (
    <div className="cs-mockup cs-mockup-wide cs-light-panel">
      {/* Header */}
      <div className="cs-mock-topbar" style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
        <div className="cs-mock-logo" style={{ color: '#f8fafc', fontSize: 13 }}>🏈 Fantasy Football.AI</div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ border: '1px solid #334155', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>Log in</div>
        </div>
      </div>
      {/* Greeting */}
      <div style={{ background: '#0f172a', padding: '16px 20px 10px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontFamily: 'var(--mono)' }}>
          Hey, I'm Jordy — your NFL expert and Football companion.
        </div>
        <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'var(--mono)' }}>What would you like to know today?</div>
      </div>
      {/* 2×2 Widget grid */}
      <div style={{ background: '#0f172a', padding: '10px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {widgets.map(w => (
          <div key={w.label} style={{ background: w.color, borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: w.text, fontFamily: 'var(--mono)', fontWeight: 500 }}>{w.label}</div>
          </div>
        ))}
      </div>
      {/* Recent conversations */}
      <div style={{ background: '#0f172a', padding: '12px 20px 4px' }}>
        <div style={{ fontSize: 9, color: '#475569', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Recent</div>
        {conversations.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1e293b', flexShrink: 0 }} />
            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>{c}</div>
          </div>
        ))}
      </div>
      {/* Input bar */}
      <div style={{ background: '#0f172a', padding: '10px 20px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: '#1e293b', borderRadius: 6, padding: '8px 12px', fontSize: 10, color: '#475569', fontFamily: 'var(--mono)' }}>Ask Jordy anything…</div>
        <div style={{ background: BLUE, borderRadius: 4, padding: '6px 10px', fontSize: 10, color: '#fff', fontFamily: 'var(--mono)' }}>→</div>
      </div>
    </div>
  )
}

// ── ThemeMockup ────────────────────────────────────────────────────────────────

function ThemeMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel" style={{ display: 'flex', gap: 20, padding: 24, justifyContent: 'center', alignItems: 'stretch' }}>
      {/* Light theme phone */}
      <div style={{ flex: 1, background: '#ffffff', borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', maxWidth: 200 }}>
        <div style={{ background: '#f8fafc', padding: '8px 10px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--mono)' }}>🏈 Fantasy Football.AI</div>
        </div>
        <div style={{ padding: '10px 10px 6px' }}>
          <div style={{ fontSize: 8, color: '#0f172a', fontFamily: 'var(--mono)', marginBottom: 8, lineHeight: 1.4 }}>Hey, I'm Jordy — your NFL expert.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 8 }}>
            {['#dbeafe', '#dcfce7', '#ede9fe', '#fee2e2'].map((c, i) => (
              <div key={i} style={{ background: c, borderRadius: 4, height: 28 }} />
            ))}
          </div>
          <div style={{ fontSize: 7, color: '#94a3b8', fontFamily: 'var(--mono)', marginBottom: 4 }}>Recent conversations</div>
          {[1, 2].map(i => (
            <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '3px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#e2e8f0' }} />
              <div style={{ height: 5, background: '#e2e8f0', borderRadius: 2, flex: 1 }} />
            </div>
          ))}
        </div>
        <div style={{ padding: '0 10px 10px', textAlign: 'center', fontSize: 7, color: '#94a3b8', fontFamily: 'var(--mono)' }}>Light Mode</div>
      </div>
      {/* Dark theme phone */}
      <div style={{ flex: 1, background: '#0f1b2d', borderRadius: 10, overflow: 'hidden', border: '1px solid #1e3a5f', maxWidth: 200 }}>
        <div style={{ background: '#0a1628', padding: '8px 10px', borderBottom: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#f0f9ff', fontFamily: 'var(--mono)' }}>🏈 Fantasy Football.AI</div>
        </div>
        <div style={{ padding: '10px 10px 6px' }}>
          <div style={{ fontSize: 8, color: '#e0f2fe', fontFamily: 'var(--mono)', marginBottom: 8, lineHeight: 1.4 }}>Hey, I'm Jordy — your NFL expert.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 8 }}>
            {['#1e3a8a', '#14532d', '#4c1d95', '#7c2d12'].map((c, i) => (
              <div key={i} style={{ background: c, borderRadius: 4, height: 28 }} />
            ))}
          </div>
          <div style={{ fontSize: 7, color: '#475569', fontFamily: 'var(--mono)', marginBottom: 4 }}>Recent conversations</div>
          {[1, 2].map(i => (
            <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '3px 0', borderBottom: '1px solid #1e293b' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1e293b' }} />
              <div style={{ height: 5, background: '#1e293b', borderRadius: 2, flex: 1 }} />
            </div>
          ))}
        </div>
        <div style={{ padding: '0 10px 10px', textAlign: 'center', fontSize: 7, color: '#475569', fontFamily: 'var(--mono)' }}>Dark / Blue Mode</div>
      </div>
    </div>
  )
}

// ── ConversationMockup ─────────────────────────────────────────────────────────

function ConversationMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-light-panel">
      <div className="cs-mock-topbar" style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cs-mock-logo" style={{ color: '#0f172a' }}>🏈 FANTASY FOOTBALL.AI</div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>March 16, 2025</div>
      </div>
      <div style={{ padding: '16px 20px', background: '#f8fafc', minHeight: 240 }}>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
          <div style={{ background: BLUE, color: '#fff', borderRadius: '12px 12px 2px 12px', padding: '8px 14px', maxWidth: '55%', fontSize: 10, fontFamily: 'var(--mono)', lineHeight: 1.5 }}>
            Hey, when is the next match of Texans?
          </div>
        </div>
        {/* AI reply */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1e3a8a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>J</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'var(--mono)', marginBottom: 5 }}>Jordy AI</div>
            {/* Widget card */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#003087' }} />
                <div style={{ fontSize: 8, color: '#0f172a', fontFamily: 'var(--mono)' }}>Texans</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 8, color: '#64748b', fontFamily: 'var(--mono)' }}>Sun, Mar 23</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--mono)' }}>VS</div>
                <div style={{ fontSize: 8, color: '#64748b', fontFamily: 'var(--mono)' }}>1:00 PM ET</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#002147' }} />
                <div style={{ fontSize: 8, color: '#0f172a', fontFamily: 'var(--mono)' }}>Patriots</div>
              </div>
            </div>
            <div style={{ fontSize: 9, color: '#475569', fontFamily: 'var(--mono)', lineHeight: 1.5 }}>The Houston Texans play next on Sunday, March 23 against the New England Patriots at 1:00 PM ET.</div>
          </div>
        </div>
        {/* Follow-up */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['Who should I start?', 'Injury updates?'].map(p => (
            <div key={p} style={{ border: `1px solid ${BLUE}`, color: BLUE, borderRadius: 20, padding: '4px 12px', fontSize: 9, fontFamily: 'var(--mono)' }}>{p}</div>
          ))}
        </div>
      </div>
      {/* Input */}
      <div style={{ padding: '10px 20px 14px', background: '#fff', display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ flex: 1, background: '#f8fafc', borderRadius: 6, padding: '7px 12px', fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>Message Jordy…</div>
        <div style={{ background: BLUE, borderRadius: 4, padding: '6px 10px', fontSize: 10, color: '#fff' }}>→</div>
      </div>
    </div>
  )
}



// ── ThemeComparisonBlock ───────────────────────────────────────────────────────

const themes = {
  rise: {
    label: 'Rise FC',
    bg: '#052e16',
    surface: '#14532d',
    accent: '#16a34a',
    text: '#bbf7d0',
    muted: '#166534',
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
  },
  rapid: {
    label: 'Rapid FC',
    bg: '#083344',
    surface: '#164e63',
    accent: '#0891b2',
    text: '#a5f3fc',
    muted: '#0e7490',
    gradient: 'linear-gradient(135deg, #083344 0%, #164e63 100%)',
  },
}

function ThemeCard({ theme }: { theme: typeof themes.rise }) {
  return (
    <div style={{
      background: theme.gradient,
      borderRadius: 12,
      padding: 24,
      flex: 1,
      border: `1px solid ${theme.muted}`,
      transition: 'all 0.4s ease',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: theme.muted, marginBottom: 4 }}>Active Team</p>
          <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>{theme.label}</p>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: theme.accent, opacity: 0.3 }} />
      </div>
      {/* Score widget */}
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.muted, marginBottom: 10 }}>Live · 72'</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#f8fafc' }}>{theme.label}</span>
          <span style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 22, fontWeight: 800, color: theme.accent }}>3 – 1</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#f8fafc' }}>Tides FC</span>
        </div>
      </div>
      {/* Stat row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['Possession', 'Shots', 'Fouls'].map((s, i) => (
          <div key={s} style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{['62%','14','7'][i]}</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 8, color: theme.muted, letterSpacing: '0.08em' }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ThemeComparisonBlock() {
  return (
    <div style={{ marginTop: 48 }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#334155', marginBottom: 6 }}>Before / After</p>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 24 }}>Same components, different themes.</p>
      <img src="/jordy-theme-comparison.png" alt="Same PlayerCard component in Rise FC and Rapid FC themes" style={{ width: '100%', borderRadius: 10, display: 'block' }} />
      <p className="cs-mock-caption" style={{ marginTop: 16 }}>Same PlayerCard component — only token values change between Rise FC and Rapid FC.</p>
    </div>
  )
}



// ── ResearchMethodsMockup ──────────────────────────────────────────────────────

function ResearchMethodsMockup() {
  const methods = [
    { color: '#dbeafe', borderColor: '#93c5fd', label: 'Interview & Observe', question: 'What drives fans to seek real-time sports information?' },
    { color: '#dcfce7', borderColor: '#86efac', label: 'White Paper Research', question: 'What does literature say about sports chat engagement patterns?' },
    { color: '#fef9c3', borderColor: '#fde68a', label: 'Market & Tech Audit',  question: 'How do competitors handle live sports data and AI chat?' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
      {methods.map(m => (
        <div key={m.label} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderTop: `2px solid ${m.borderColor}`, borderRadius: 6, padding: '20px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 8, color: '#64748b', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{m.label}</div>
          <div style={{ fontSize: 11, color: '#0f172a', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>{m.question}</div>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Jordy({ theme, toggleTheme }: Props) {
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
        <p className="cs-eyebrow">Fantasy Football.AI · NSL · 2025</p>
        <h1 className="cs-title">Turning Live Sports Into<br/>Instant Stories</h1>
        <p className="cs-subtitle">A chat-first AI assistant that transforms live data into personalized, visual, and actionable sports intelligence.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <img src="/jordy-hero.png" alt="NSL website with Jordy AI assistant" className="cs-hero-img" />
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">I worked with 1 PM and 2 engineers across a 4-month engagement. I owned research, conversation design, the visual design system, and usability testing. Engineering owned API response handling and latency decisions; the PM owned sport partnership prioritisation.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Duration</p>
            <p className="cs-meta-value">Feb – Jun 2025</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Skills</p>
            <p className="cs-meta-value">Strategy Design, Product Design</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Overview */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Overview</p>
        <div className="cs-body-block">
          <p>Jordy AI is a fantasy football and NFL companion chatbot designed to give fans instant, visual answers to their most pressing game-day questions. Rather than searching through stats sites or navigating clunky apps, users simply ask Jordy — and get rich, contextual responses powered by live data.</p>
          <p>The project focused on building a chat-first experience that feels intelligent and personal, with a design system flexible enough to adapt to any sport or team's visual identity.</p>
          <p>While Jordy was originally designed for NFL fantasy football, the platform was later adopted by NSL and other clients — proving the system's flexibility across sports and leagues.</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <img src="/jordy-phones.webp" alt="Jordy AI app in dark and light mode" className="cs-hero-img" />
          <p className="cs-mock-caption">Jordy across NSL — live scores, player highlights, and contextual prompts in a single interface.</p>
        </div>
      </motion.section>

      {/* 3 — Research */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Research</p>
        <h2 className="cs-heading">Investigating the unmet needs of chatbot users.</h2>
        <p className="cs-body-single">We combined user interviews, white paper research, and a competitive audit to map the gap between what fans want and what existing tools deliver.</p>
        <div style={{ marginTop: 40 }}>
          <ResearchMethodsMockup />
          <p className="cs-mock-caption">Three research methods triangulated the same core finding: fans want answers, not data dumps.</p>
        </div>
        {/* 3 findings */}
        <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
          {[
            { n: '01', heading: 'Speed is everything', body: 'Fans make decisions in seconds during game day. Responses that take more than 3 seconds to appear feel broken.' },
            { n: '02', heading: 'Visuals beat text',   body: 'Stat tables are ignored. Visual cards — scores, timelines, player avatars — drive 3× more engagement than text-only replies.' },
            { n: '03', heading: 'Context is key',      body: 'Users don\'t want isolated stats. They want "what does this mean for my fantasy team?" baked into every answer.' },
          ].map(f => (
            <div key={f.n} className="cs-takeaway-card">
              <div style={{ fontSize: 11, color: BLUE, fontFamily: 'var(--mono)', fontWeight: 700, marginBottom: 6 }}>{f.n}</div>
              <p className="cs-takeaway-title">{f.heading}</p>
              <p className="cs-takeaway-body">{f.body}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4 — The Problem */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>The problem</p>
        <h2 className="cs-heading">There's no structured way for fans to get live, contextual sports answers.</h2>
        <p className="cs-body-single">Fans are forced to juggle multiple apps, Twitter feeds, and stat sites to piece together a complete picture during game day. The information exists — but it's fragmented, slow, and impersonal. Jordy was designed to change that.</p>
        <div style={{ marginTop: 40 }}>
          <img src="/jordy-problem.png" alt="Jordy AI chat showing a betting recommendation with match card" className="cs-hero-img" style={{ borderRadius: 8 }} />
          <p className="cs-mock-caption">Jordy answers "Who should I bet on?" with a structured match card — no tab-switching required.</p>
        </div>
      </motion.section>

      {/* 5 — The Strategy */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: BLUE }}>The strategy</p>
        <h2 className="cs-heading">Design a chat-first interface that turns raw data into visual stories.</h2>
        <div className="cs-body-block">
          <p>Three patterns were considered for how Jordy should respond to a query. Raw stats in a text reply — fast to render, low cognitive load on the system side. A hybrid card + text format — structured data with a text summary below. Pure widget cards — no text, all visual.</p>
          <p>Testing showed that text replies caused users to re-ask the question differently: "but what does that mean for my lineup?" Widget cards answered the implicit follow-up before it was asked. The hybrid format helped on comprehension but added visual weight that made conversations feel slow.</p>
          <p>The decision was widget-first, with text reserved for explanatory context only. Follow-up chips — pre-suggested questions surfaced after each response — replaced the mental work of deciding what to ask next. That pattern reduced session drop-off and increased the number of decisions users completed per session.</p>
        </div>
      </motion.section>

      {/* 6 — Design System */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Design System</p>
        <h2 className="cs-heading">Building a theming architecture for multi-sport adaptability.</h2>
        <p className="cs-body-single">Expanding from one sport to multiple leagues created a problem: visual identity had to change without redesigning components. The solution was a two-layer system — components that know nothing about color, and tokens that know everything about the brand.</p>

        {/* Two-layer system */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 10, overflow: 'hidden' }}>
          {/* Component Layer */}
          <div style={{ background: '#0f172a', padding: '32px 36px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, marginBottom: 16 }}>Layer 01</p>
            <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Component Layer</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>Structure, layout, and interaction logic. Components are theme-agnostic — they reference token names, never raw hex values. A card is always a card regardless of which league renders it.</p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['ScoreCard', 'PlayerCard', 'RecentPerformance', 'HeadToHead'].map(c => (
                <div key={c} style={{ background: '#1e293b', borderRadius: 4, padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: BLUE }}>◻</span> {c}
                </div>
              ))}
            </div>
          </div>
          {/* Token Layer */}
          <div style={{ background: '#0a0f1e', padding: '32px 36px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 16 }}>Layer 02</p>
            <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Token Layer</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>Colors, gradients, and surfaces as semantic variables. Swapping a team theme means updating token values only. Every component that references <span style={{ color: '#a855f7' }}>--color-highlight</span> updates instantly.</p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: '--color-highlight', val: '#2563eb' },
                { name: '--color-surface',   val: '#1e293b' },
                { name: '--color-gradient',  val: 'linear…' },
                { name: '--color-text-muted',val: '#94a3b8' },
              ].map(t => (
                <div key={t.name} style={{ background: '#111827', borderRadius: 4, padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#a855f7' }}>{t.name}</span>
                  <span style={{ color: '#475569' }}>{t.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flow indicator */}
        <div style={{ marginTop: 2, background: '#070c17', borderRadius: '0 0 10px 10px', padding: '16px 36px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 10, color: '#334155' }}>
          <span style={{ color: '#a855f7' }}>Tokens</span>
          <span>→</span>
          <span style={{ color: BLUE }}>Applied to Components</span>
          <span>→</span>
          <span style={{ color: '#4ade80' }}>UI updates instantly</span>
        </div>

        {/* Token table */}
        <div style={{ marginTop: 48, background: '#070c17', borderRadius: 10, overflow: 'hidden', border: '1px solid #1e293b' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#334155' }}>Token Map</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em', color: '#1e3a5f' }}>design.tokens/jordy.json</p>
          </div>
          <div style={{ padding: '0 28px 20px' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr 1fr', gap: 12, padding: '14px 0 10px', borderBottom: '1px solid #0f172a' }}>
              {['Token', 'Dark Default', 'Light Default', 'Team · Rise FC', 'Team · Rapid FC'].map(h => (
                <div key={h} style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1e3a5f' }}>{h}</div>
              ))}
            </div>
            {[
              { name: '--color-highlight',  dark: '#2563eb', light: '#1d4ed8', rise: '#84AE99', rapid: '#0891b2' },
              { name: '--color-surface-1',  dark: '#0f172a', light: '#f8fafc', rise: '#000000', rapid: '#083344' },
              { name: '--color-surface-2',  dark: '#1e293b', light: '#f1f5f9', rise: '#000000', rapid: '#164e63' },
              { name: '--color-gradient',   dark: '#3b82f6', light: '#bfdbfe', rise: '#7EBA9C', rapid: '#22d3ee' },
              { name: '--color-card-bg',    dark: '#1e3a8a', light: '#dbeafe', rise: '#DDCD8F', rapid: '#0e7490' },
              { name: '--color-text-muted', dark: '#475569', light: '#64748b', rise: '#475569', rapid: '#475569' },
            ].map((token, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid #0a0f1a', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#a855f7' }}>{token.name}</div>
                {[token.dark, token.light, token.rise, token.rapid].map((c, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: c, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#334155' }}>{c}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* System behaviour */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#334155', marginBottom: 20 }}>What changes on theme switch</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { token: '--color-highlight', desc: 'Accent & highlight colors' },
                { token: '--color-surface',   desc: 'Background and card surfaces' },
                { token: '--color-gradient',  desc: 'Hero gradients and overlays' },
                { token: 'all widget tokens', desc: 'Cards inherit automatically — no overrides' },
              ].map(r => (
                <div key={r.token} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#a855f7', paddingTop: 2, flexShrink: 0 }}>{r.token}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#334155', marginBottom: 20 }}>Trade-offs</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Semantic naming requires discipline — <span style={{ color: 'var(--text-primary)' }}>--color-highlight</span> must mean the same thing across all themes or the system breaks. Some teams wanted brand colors that failed contrast requirements — we held the line and provided accessible alternatives. The trade-off: less brand expression per team, more product consistency across all of them.
            </p>
          </div>
        </div>

        {/* Before / After */}
        <ThemeComparisonBlock />

        {/* Outcome */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderRadius: 10, overflow: 'hidden' }}>
          {[
            { stat: '0', label: 'component redesigns', sub: 'New team themes applied via token updates only. Validated during NSL onboarding — no design resource required.' },
            { stat: '3+', label: 'clients onboarded', sub: 'NSL and two leagues live on the same component library, without additional design resource.' },
            { stat: '1 day', label: 'to theme a new sport', sub: 'Timed against the previous approach: manual redesign across all card components. Measured with NSL during onboarding.' },
          ].map((o, i) => (
            <div key={i} style={{ background: '#ffffff', padding: '28px 24px', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
              <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 36, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 6 }}>{o.stat}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>{o.label}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#64748b', lineHeight: 1.6 }}>{o.sub}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 7 — Design Challenge */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Design Challenge</p>
        <h2 className="cs-heading">Delivering clarity in limited space.</h2>
        <p className="cs-body-single">Chat interfaces have tiny real estate. Every widget had to communicate maximum information with minimum visual noise. Four distinct card types — each scoped to a single question a fan might ask — had to work independently and feel like part of a coherent system.</p>
        <div style={{ marginTop: 48, background: '#f2f1ef', borderRadius: 12, padding: '40px 48px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {[
            {
              ghost: 'Match',
              widgets: [
                { src: '/jordy-widget-recent.webp', label: 'Recent Performance' },
                { src: '/jordy-widget-h2h.webp',    label: 'Head to Head' },
              ],
            },
            {
              ghost: 'Live',
              widgets: [
                { src: '/jordy-widget-live.webp',   label: 'Live Score' },
                { src: '/jordy-widget-player.webp', label: 'Player Card' },
              ],
            },
          ].map(row => (
            <div key={row.ghost} style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                fontSize: 120,
                fontWeight: 700,
                color: 'rgba(0,0,0,0.05)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}>{row.ghost}</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, position: 'relative', maxWidth: 560, margin: '0 auto' }}>
                {row.widgets.map(w => (
                  <div key={w.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <img src={w.src} alt={w.label} style={{ width: '100%', borderRadius: 10, display: 'block' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>{w.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 8 — Interaction Design */}
      <motion.section className="cs-section" custom={8} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Interaction Design</p>
        <h2 className="cs-heading">Engagement beyond information delivery.</h2>
        <div className="cs-body-block">
          <p>Every Jordy response includes contextual follow-up chips — pre-suggested questions that keep the conversation going without requiring the user to think of what to ask next. This pattern dramatically increased session depth in testing.</p>
          <p>We also designed micro-interactions for loading states, typing indicators, and card expansions — ensuring the chat felt alive, not just functional.</p>
        </div>
      </motion.section>

      {/* 9 — Behind the curtains: Personas */}
      <motion.section className="cs-section" custom={9} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: BLUE }}>Behind the curtains</p>
        <h2 className="cs-heading">Who are we designing for?</h2>
        <p className="cs-body-single">Six interviews revealed three distinct user archetypes, each with fundamentally different goals and interaction patterns. Designing for all three without fragmenting the experience was the central challenge.</p>
        {/* 3-column persona cards */}
        <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
          {[
            { title: 'Fantasy League Enthusiast', quote: '"I need quick start/sit decisions and injury updates before my lineup locks."', color: '#dbeafe' },
            { title: 'Matchday Superfan',         quote: '"I want to feel the pulse of the game in real time, even when I can\'t watch."', color: '#dcfce7' },
            { title: 'Data-Driven Strategist',    quote: '"Give me the numbers, the trends, and the edge — not the hype."', color: '#ede9fe' },
          ].map(p => (
            <div key={p.title} className="cs-takeaway-card" style={{ borderTop: `3px solid ${p.color}`, background: '#ffffff', border: `1px solid #e5e7eb`, borderTopWidth: 3, borderTopColor: p.color, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <p className="cs-takeaway-title">{p.title}</p>
              <p className="cs-takeaway-body">{p.quote}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 11 — System Thinking */}
      <motion.section className="cs-section" custom={11} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">System thinking</p>
        <h2 className="cs-heading">Transforming Jordy into a modular, sport-adaptive platform.</h2>
        <p className="cs-body-single">The long-term vision is a platform that scales beyond NFL — same chat engine, same variable system, different data feeds and color tokens. The architecture was designed from day one to support this.</p>

        {/* How Might We card */}
        <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '20px 24px', margin: '40px 0 32px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#92400e', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>HOW MIGHT WE…</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              "Design a single chat component that renders correctly for any sport's live data?",
              'Build a token system that non-designers can update for new team partnerships without breaking the UI?',
              "Ensure Jordy's responses feel personalized even when serving thousands of concurrent users?",
            ].map((q, i) => (
              <li key={i} style={{ fontSize: 11, color: '#78350f', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Implementation note */}
        <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: INDIGO, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Implementation approach</div>
          <p style={{ fontSize: 11, color: '#3730a3', fontFamily: 'var(--mono)', lineHeight: 1.6, margin: 0 }}>
            A component library built on Figma variables — each token mapped to a semantic role (primary, background, highlight) rather than a specific color. Swapping sports requires updating only the variable set, not individual components.
          </p>
        </div>

        {/* Flow */}
        <div className="cs-flow">
          {['User prompt', 'Intent detection', 'Data fetch', 'Widget rendering', 'Follow-up chips'].map((node, i, arr) => (
            <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="cs-flow-node">{node}</div>
              {i < arr.length - 1 && <span className="cs-flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 12 — Outcome */}
      <motion.section className="cs-section" custom={12} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Outcome</p>
        <h2 className="cs-heading">The clearest signal: one question to Jordy replaced four tabs.</h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640, marginTop: 16 }}>Users completed game-day decisions 60% faster — not because Jordy was faster to load, but because it reduced the number of queries needed to reach a decision. One question replaced four tabs.</p>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { stat: '5 of 6', finding: 'participants preferred widget cards over text replies. Moderated sessions; 6 participants across fantasy, casual fan, and data-analyst profiles. Tasks were identical — only the response format varied.' },
            { stat: 'Hours → mins', finding: 'theme-switching time reduced in design reviews after the variable system launched. Previous approach: manual redesign of all card components per new client.' },
            { stat: '100%', finding: 'of persona types completed 3 core tasks without guidance: find a player\'s injury status, make a start/sit decision, get a live score update. No instructions given after initial onboarding.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '18px 24px', background: '#ffffff', border: '1px solid #e5e7eb', borderLeft: `3px solid ${AMBER}`, borderRadius: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0, minWidth: 100 }}>{item.stat}</span>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.finding}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: BLUE }}>Why it mattered</p>
          <p className="cs-body-single">The design system decision had an outcome beyond Jordy. Within three months of launch, NSL and two other clients adopted the platform using the variable system — no redesign required, only token updates. A decision made early ("every color is a variable, no hardcoded hex") became the reason the product could scale commercially without additional design resource. The flexibility wasn't a nice-to-have. It was the business case.</p>
        </div>
      </motion.section>

      {/* 12b — What I'd do differently */}
      <motion.section className="cs-section" custom={13} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>What I'd do differently</p>
        <h2 className="cs-heading">Six interviews wasn't enough.</h2>
        <div className="cs-body-block">
          <p>The widget-first decision was validated by six usability sessions — all participants were fantasy league players, skewing toward users who were already data-fluent. We never tested with the casual fan persona we'd defined. The direction felt right and the test results were supportive, but we launched on directional evidence, not a validated sample. I'd push for at least 12 sessions across all three persona types before committing to a format that shapes the entire interaction model.</p>
          <p>The variable token system is the outcome I'm most proud of — but I'd be dishonest if I called it strategic foresight. It started as a response to a commercial ask: "can we white-label this for NSL without a redesign?" The architecture decision that made it possible was driven by a deadline, not a design principle. It worked, and I'd do it again — but I'd document the real origin rather than reframe it as planned modularity.</p>
        </div>
      </motion.section>

      {/* 13 — Closing */}
      <motion.section className="cs-section cs-closing" custom={14} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "One question to Jordy replaced four tabs. That's the product."
        </p>
      </motion.section>

      {/* Next case study */}
      <motion.section className="cs-section cs-next-project" custom={14} initial="hidden" animate="visible" variants={sectionVariants}>
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
