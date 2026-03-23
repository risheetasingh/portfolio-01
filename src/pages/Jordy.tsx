import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import Nav from '../components/Nav'

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

// ── VariableSystemMockup ───────────────────────────────────────────────────────

function VariableSystemMockup() {
  const headers = ['Name', 'Dark Default', 'Light Default', 'Dark Red', 'Light Red']
  const tokens = [
    { name: 'Highlight',       colors: ['#2563eb', '#dbeafe', '#dc2626', '#fee2e2'] },
    { name: 'BG Colour 1',     colors: ['#0f172a', '#f8fafc', '#1a0a0a', '#fff5f5'] },
    { name: 'BG Colour 2',     colors: ['#1e293b', '#f1f5f9', '#2a0f0f', '#fef2f2'] },
    { name: 'Linear colour 1', colors: ['#3b82f6', '#bfdbfe', '#ef4444', '#fca5a5'] },
    { name: 'Primary Card',    colors: ['#1e3a8a', '#dbeafe', '#7f1d1d', '#fee2e2'] },
    { name: 'Secondary Card',  colors: ['#0f2a6b', '#eff6ff', '#6b1a1a', '#fff1f2'] },
    { name: 'Background',      colors: ['#0a0f1e', '#ffffff', '#110606', '#fffbfb'] },
  ]
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 1fr', gap: 8, marginBottom: 8, borderBottom: '1px solid #2a2a2a', paddingBottom: 8 }}>
          {headers.map(h => (
            <div key={h} style={{ fontSize: 9, color: '#555', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
          ))}
        </div>
        {tokens.map((token, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 1fr', gap: 8, padding: '7px 0', borderBottom: '1px solid #1a1a1a', alignItems: 'center' }}>
            <div style={{ fontSize: 10, color: '#ccc', fontFamily: 'var(--mono)' }}>{token.name}</div>
            {token.colors.map((c, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: c, flexShrink: 0, border: '1px solid #333' }} />
                <div style={{ fontSize: 8, color: '#555', fontFamily: 'var(--mono)' }}>{c}</div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '10px 0', fontSize: 10, color: BLUE, fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
          + Create variable
        </div>
      </div>
    </div>
  )
}

// ── PlayerComparisonMockup ─────────────────────────────────────────────────────

function PlayerComparisonMockup() {
  const stats = [
    { label: 'Passing', val: '312 YDS' }, { label: 'Rushing', val: '24 YDS' },
    { label: 'Receiving', val: '—' },     { label: 'Scoring', val: '2 TD' },
    { label: 'COMP', val: '24/36' },      { label: 'YDS', val: '312' },
    { label: 'TD', val: '2' },            { label: 'INT', val: '0' },
  ]
  return (
    <div className="cs-mockup cs-mockup-wide cs-light-panel">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 240 }}>
        {/* Left */}
        <div style={{ borderRight: '1px solid #e2e8f0', padding: '16px 20px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--mono)', marginBottom: 12 }}>C.J. Stroud</div>
          {[{ label: 'Fantasy Pts', val: '24.6' }, { label: 'Proj. Pts', val: '22.1' }].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 10, fontFamily: 'var(--mono)' }}>
              <span style={{ color: '#64748b' }}>{s.label}</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{s.val}</span>
            </div>
          ))}
          <div style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'var(--mono)', marginTop: 12, marginBottom: 6 }}>OTHER PLAYERS</div>
          {['Lamar Jackson', 'Josh Allen', 'Dak Prescott', 'Jalen Hurts'].map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e2e8f0' }} />
              <div style={{ fontSize: 10, color: '#334155', fontFamily: 'var(--mono)' }}>{p}</div>
            </div>
          ))}
        </div>
        {/* Right */}
        <div style={{ padding: '16px 20px', background: '#f8fafc' }}>
          <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'var(--mono)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Starters</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#003087' }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--mono)' }}>C.J. Stroud</div>
              <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'var(--mono)' }}>QB · Houston Texans</div>
            </div>
            <div style={{ marginLeft: 'auto', background: '#dcfce7', color: '#166534', fontSize: 9, padding: '2px 8px', borderRadius: 10, fontFamily: 'var(--mono)' }}>24.6 pts</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 4, padding: '6px 8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 8, color: '#94a3b8', fontFamily: 'var(--mono)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0f172a', fontFamily: 'var(--mono)' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <div className="cs-mockup cs-mockup-wide cs-light-panel">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: 24 }}>
        {methods.map(m => (
          <div key={m.label}>
            <div style={{ height: 80, background: m.color, border: `1px solid ${m.borderColor}`, borderRadius: 8, marginBottom: 10 }} />
            <div style={{ fontSize: 8, color: '#64748b', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 10, color: '#0f172a', fontFamily: 'var(--mono)', lineHeight: 1.5 }}>{m.question}</div>
          </div>
        ))}
      </div>
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
        <p className="cs-eyebrow">Fantasy Football.AI · 2025</p>
        <h1 className="cs-title">Turning Live Sports Into<br/>Instant Stories</h1>
        <p className="cs-subtitle">A chat-first AI assistant that transforms live NFL data into personalized, visual, and actionable sports intelligence.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <JordyChatMockup />
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">Product Designer</p>
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

      {/* 2 — Metrics */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="cs-metric-cards">
          {[
            { stat: '4 sports',     desc: 'Platform designed to scale from NFL to football, cricket, basketball, and more.' },
            { stat: '6 interviews', desc: 'Conducted with casual fans, die-hard fantasy players, and data enthusiasts.' },
            { stat: '1 system',     desc: 'Variable-based design system that adapts to any sport or team theme automatically.' },
          ].map(m => (
            <div key={m.stat} className="cs-metric-card">
              <div className="cs-metric-stat">{m.stat}</div>
              <p className="cs-metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3 — Introduction */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Overview</p>
        <div className="cs-body-block">
          <p>Jordy AI is a fantasy football and NFL companion chatbot designed to give fans instant, visual answers to their most pressing game-day questions. Rather than searching through stats sites or navigating clunky apps, users simply ask Jordy — and get rich, contextual responses powered by live data.</p>
          <p>The project focused on building a chat-first experience that feels intelligent and personal, with a design system flexible enough to adapt to any sport or team's visual identity.</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <ThemeMockup />
          <p className="cs-mock-caption">Light & Dark themes: Jordy adapts to any team palette through a token-based variable system.</p>
        </div>
      </motion.section>

      {/* 4 — The Problem */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>The problem</p>
        <h2 className="cs-heading">There's no structured way for fans to get live, contextual sports answers.</h2>
        <p className="cs-body-single">Fans are forced to juggle multiple apps, Twitter feeds, and stat sites to piece together a complete picture during game day. The information exists — but it's fragmented, slow, and impersonal. Jordy was designed to change that.</p>
        <div style={{ marginTop: 40 }}>
          <ConversationMockup />
          <p className="cs-mock-caption">Conversation flow: A user asks about upcoming matches and Jordy responds with a rich visual widget — no link-clicking required.</p>
        </div>
      </motion.section>

      {/* 5 — The Strategy */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: BLUE }}>The strategy</p>
        <h2 className="cs-heading">Design a chat-first interface that turns raw data into visual stories.</h2>
        <div className="cs-body-block">
          <p>The core insight was that fans don't want raw data — they want answers. Jordy's interface was designed around conversational patterns: short prompts, rich visual cards, and smart follow-up suggestions that guide users deeper into the information they care about.</p>
          <p>By treating every response as a "story beat," we ensured that Jordy never just answered a question — it opened a conversation.</p>
        </div>
      </motion.section>

      {/* 6 — Design System */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Design System</p>
        <h2 className="cs-heading">How our variable system made Jordy adaptable.</h2>
        <p className="cs-body-single">Rather than designing for one team or one sport, we built a token-based color system that could swap entire visual themes — dark mode, light mode, team colors — without touching a single component. Every color was a variable.</p>
        <div style={{ marginTop: 40 }}>
          <VariableSystemMockup />
          <p className="cs-mock-caption">Variable table: Design tokens mapped to dark/light themes and sport-specific color modes.</p>
        </div>
      </motion.section>

      {/* 7 — Design Challenge */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Design Challenge</p>
        <h2 className="cs-heading">Delivering clarity in limited space.</h2>
        <p className="cs-body-single">Chat interfaces have tiny real estate. Every widget had to communicate maximum information with minimum visual noise. The player comparison card — with stats, projections, and roster context — was the hardest problem to solve in the smallest space.</p>
        <div style={{ marginTop: 40 }}>
          <PlayerComparisonMockup />
          <p className="cs-mock-caption">Player comparison: Stats, projections, and roster context in a single, scannable card.</p>
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
            <div key={p.title} className="cs-takeaway-card" style={{ borderTop: `3px solid ${p.color}` }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.color, marginBottom: 12 }} />
              <p className="cs-takeaway-title">{p.title}</p>
              <p className="cs-takeaway-body">{p.quote}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 10 — Research */}
      <motion.section className="cs-section" custom={10} initial="hidden" animate="visible" variants={sectionVariants}>
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

      {/* 12 — Signing off */}
      <motion.section className="cs-section" custom={12} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Signing off!</p>
        <h2 className="cs-heading">The Outcome</h2>
        <p className="cs-body-single">Jordy shipped as a functional prototype validated across six user sessions. Key outcomes from the research and design process:</p>
        <ul style={{ margin: '24px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Users completed game-day decisions 60% faster compared to their current app stack',
            'Visual widget cards were preferred over text responses by 5 of 6 participants',
            'The variable system reduced theme-switching time from hours to minutes in design reviews',
            'All three persona types could complete core tasks without guidance in usability testing',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>

        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: BLUE }}>Why it mattered</p>
          <p className="cs-body-single">Fantasy sports is a $9B industry driven by split-second decisions and emotional investment. Jordy proved that a thoughtfully designed chat interface — with the right data, the right visuals, and the right speed — can become the fan's most trusted companion on game day.</p>
        </div>
      </motion.section>

      {/* 13 — Closing */}
      <motion.section className="cs-section cs-closing" custom={13} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "Jordy's visual-first chatbot redefines how fans consume sports data — making insights faster, clearer, and more interactive."
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
    </motion.div>
  )
}
