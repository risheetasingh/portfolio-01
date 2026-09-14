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
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any, delay: i * 0.07 },
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
      <div className="cs-mock-topbar" style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
        <div className="cs-mock-logo" style={{ color: '#f8fafc', fontSize: 13 }}>🏈 Fantasy Football.AI</div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ border: '1px solid #334155', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>Log in</div>
        </div>
      </div>
      <div style={{ background: '#0f172a', padding: '16px 20px 10px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontFamily: 'var(--mono)' }}>
          Hey, I'm Jordy — your NFL expert and Football companion.
        </div>
        <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'var(--mono)' }}>What would you like to know today?</div>
      </div>
      <div style={{ background: '#0f172a', padding: '10px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {widgets.map(w => (
          <div key={w.label} style={{ background: w.color, borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: w.text, fontFamily: 'var(--mono)', fontWeight: 500 }}>{w.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#0f172a', padding: '12px 20px 4px' }}>
        <div style={{ fontSize: 9, color: '#475569', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Recent</div>
        {conversations.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1e293b', flexShrink: 0 }} />
            <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>{c}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#0f172a', padding: '10px 20px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: '#1e293b', borderRadius: 6, padding: '8px 12px', fontSize: 10, color: '#475569', fontFamily: 'var(--mono)' }}>Ask Jordy anything…</div>
        <div style={{ background: BLUE, borderRadius: 4, padding: '6px 10px', fontSize: 10, color: '#fff', fontFamily: 'var(--mono)' }}>→</div>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
          <div style={{ background: BLUE, color: '#fff', borderRadius: '12px 12px 2px 12px', padding: '8px 14px', maxWidth: '55%', fontSize: 10, fontFamily: 'var(--mono)', lineHeight: 1.5 }}>
            Hey, when is the next match of Texans?
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1e3a8a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>J</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'var(--mono)', marginBottom: 5 }}>Jordy AI</div>
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
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['Who should I start?', 'Injury updates?'].map(p => (
            <div key={p} style={{ border: `1px solid ${BLUE}`, color: BLUE, borderRadius: 20, padding: '4px 12px', fontSize: 9, fontFamily: 'var(--mono)' }}>{p}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 20px 14px', background: '#fff', display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ flex: 1, background: '#f8fafc', borderRadius: 6, padding: '7px 12px', fontSize: 10, color: '#94a3b8', fontFamily: 'var(--mono)' }}>Message Jordy…</div>
        <div style={{ background: BLUE, borderRadius: 4, padding: '6px 10px', fontSize: 10, color: '#fff' }}>→</div>
      </div>
    </div>
  )
}

// ── ThemeComparisonBlock ───────────────────────────────────────────────────────

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

// ── ResponseFormatOptions ──────────────────────────────────────────────────────

function ResponseFormatOptions() {
  const options = [
    {
      label: 'Raw stats',
      verdict: 'Rejected',
      color: '#94a3b8',
      body: 'Fast to render, low system cost. But users re-asked the same question differently every time — "what does that mean for my lineup?"',
    },
    {
      label: 'Hybrid card + text',
      verdict: 'Rejected',
      color: '#94a3b8',
      body: 'Better comprehension in testing, but the extra text made conversations feel slow. Visual weight without visual payoff.',
    },
    {
      label: 'Widget-first',
      verdict: 'Shipped',
      color: '#16a34a',
      body: 'Answered the implicit follow-up before it was asked. Text reserved for context only. This is what shipped.',
    },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderRadius: 10, overflow: 'hidden', marginTop: 32 }}>
      {options.map(o => (
        <div key={o.label} style={{ background: o.verdict === 'Shipped' ? '#f0fdf4' : '#f8fafc', border: `1px solid ${o.verdict === 'Shipped' ? '#bbf7d0' : '#e5e7eb'}`, padding: '24px 22px' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: o.color, fontWeight: 700, marginBottom: 10 }}>{o.verdict}</p>
          <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{o.label}</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#475569', lineHeight: 1.6 }}>{o.body}</p>
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* 1 — Hero */}
      <motion.section className="cs-section cs-hero" custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-eyebrow">Fantasy Football.AI · NSL · 2025</p>
        <h1 className="cs-title">Turning Live Sports Into<br/>Instant Stories</h1>
        <p className="cs-subtitle">Fans juggled four tabs to answer one question on game day. Jordy answers it in one message.</p>
        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <img src="/jordy-hero.png" alt="NSL website with Jordy AI assistant" className="cs-hero-img" />
        </motion.div>
        <div className="cs-meta" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="cs-meta-col">
            <p className="cs-meta-label">What I did</p>
            <p className="cs-meta-value" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Research', 'Conversation Design', 'Design Systems', 'Usability Testing'].map(t => (
                <span key={t} style={{ border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px', fontSize: 11 }}>{t}</span>
              ))}
            </p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Team</p>
            <p className="cs-meta-value">1 PM, 2 engineers, 4-month engagement.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Duration</p>
            <p className="cs-meta-value">Feb – Jun 2025</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — The Problem */}
      <motion.section className="cs-section" custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>The problem</p>
        <h2 className="cs-heading">There's no structured way for fans to get live, contextual sports answers.</h2>
        <p className="cs-body-single">Fans are forced to juggle multiple apps, Twitter feeds, and stat sites to piece together a complete picture during game day. The information exists — but it's fragmented, slow, and impersonal.</p>
        <div style={{ marginTop: 40 }}>
          <img src="/jordy-problem.png" alt="Jordy AI chat showing a betting recommendation with match card" className="cs-hero-img" style={{ borderRadius: 8 }} />
          <p className="cs-mock-caption">Jordy answers "Who should I bet on?" with a structured match card — no tab-switching required.</p>
        </div>
        <div style={{ marginTop: 40 }}>
          <JordyChatMockup />
          <p className="cs-mock-caption">Jordy AI is a fantasy football and NFL companion chatbot — designed to give fans instant, visual answers instead of a search bar and a stats dump. It later expanded beyond NFL to NSL and other clients, proving the system's flexibility across sports and leagues.</p>
        </div>
      </motion.section>

      {/* 3 — Personas */}
      <motion.section className="cs-section" custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: BLUE }}>Who it's for</p>
        <h2 className="cs-heading">Three fans, three very different goals.</h2>
        <p className="cs-body-single">Six interviews revealed three distinct archetypes. Designing for all three without fragmenting the experience was the central challenge.</p>
        <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
          {[
            { title: 'Fantasy League Enthusiast', quote: '"I need quick start/sit decisions and injury updates before my lineup locks."', color: '#dbeafe' },
            { title: 'Matchday Superfan',         quote: '"I want to feel the pulse of the game in real time, even when I can\'t watch."', color: '#dcfce7' },
            { title: 'Data-Driven Strategist',    quote: '"Give me the numbers, the trends, and the edge — not the hype."', color: '#ede9fe' },
          ].map(p => (
            <div key={p.title} className="cs-takeaway-card" style={{ background: '#ffffff', border: `1px solid #e5e7eb`, borderTopWidth: 3, borderTopColor: p.color, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <p className="cs-takeaway-title">{p.title}</p>
              <p className="cs-takeaway-body">{p.quote}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4 — Research */}
      <motion.section className="cs-section" custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label">What we learned</p>
        <h2 className="cs-heading">Investigating the unmet needs of chatbot users.</h2>
        <p className="cs-body-single">We combined user interviews, white paper research, and a competitive audit to map the gap between what fans want and what existing tools deliver.</p>
        <div style={{ marginTop: 40 }}>
          <ResearchMethodsMockup />
        </div>
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

      {/* 5 — The Decision */}
      <motion.section className="cs-section" custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: BLUE }}>The decision</p>
        <h2 className="cs-heading">Three ways to answer. We bet on the riskiest one.</h2>
        <p className="cs-body-single">"Visuals beat text" was a finding, not a foregone conclusion — someone still had to decide how far to take it. Three response formats were tested against real questions.</p>
        <ResponseFormatOptions />
        <div style={{ marginTop: 40 }}>
          <ConversationMockup />
          <p className="cs-mock-caption">Widget-first, with follow-up chips replacing the mental work of deciding what to ask next. This pattern reduced session drop-off and increased decisions completed per session.</p>
        </div>
      </motion.section>

      {/* 6 — Design System */}
      <motion.section className="cs-section" custom={6} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label">Built to scale</p>
        <h2 className="cs-heading">Building a theming architecture for multi-sport adaptability.</h2>
        <p className="cs-body-single">Expanding from one sport to multiple leagues created a problem: visual identity had to change without redesigning components. The solution was a two-layer system — components that know nothing about color, and tokens that know everything about the brand.</p>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ background: '#0f172a', padding: '32px 36px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, marginBottom: 16 }}>Layer 01</p>
            <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Component Layer</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>Structure, layout, and interaction logic. Components are theme-agnostic — they reference token names, never raw hex values.</p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['ScoreCard', 'PlayerCard', 'RecentPerformance', 'HeadToHead'].map(c => (
                <div key={c} style={{ background: '#1e293b', borderRadius: 4, padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: BLUE }}>◻</span> {c}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#0a0f1e', padding: '32px 36px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 16 }}>Layer 02</p>
            <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Token Layer</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>Colors, gradients, and surfaces as semantic variables. Swapping a team theme means updating token values only.</p>
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

        <div style={{ marginTop: 2, background: '#070c17', borderRadius: '0 0 10px 10px', padding: '16px 36px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 10, color: '#334155' }}>
          <span style={{ color: '#a855f7' }}>Tokens</span>
          <span>→</span>
          <span style={{ color: BLUE }}>Applied to Components</span>
          <span>→</span>
          <span style={{ color: '#4ade80' }}>UI updates instantly</span>
        </div>

        <ThemeComparisonBlock />

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderRadius: 10, overflow: 'hidden' }}>
          {[
            { stat: '0', label: 'component redesigns', sub: 'New team themes applied via token updates only. Validated during NSL onboarding.' },
            { stat: '3+', label: 'clients onboarded', sub: 'NSL and two leagues live on the same component library, without additional design resource.' },
            { stat: '1 day', label: 'to theme a new sport', sub: 'Timed against the previous approach: manual redesign across all card components.' },
          ].map((o, i) => (
            <div key={i} style={{ background: '#ffffff', padding: '28px 24px', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
              <p style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 36, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 6 }}>{o.stat}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>{o.label}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#64748b', lineHeight: 1.6 }}>{o.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '20px 24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#92400e', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Trade-off</div>
          <p style={{ fontSize: 11, color: '#78350f', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>Semantic naming requires discipline — a token must mean the same thing across all themes or the system breaks. Some teams wanted brand colors that failed contrast requirements; we held the line and provided accessible alternatives. Less brand expression per team, more product consistency across all of them.</p>
        </div>
      </motion.section>

      {/* 7 — Outcome */}
      <motion.section className="cs-section" custom={7} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Outcome</p>
        <h2 className="cs-heading">One question to Jordy replaced four tabs.</h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640, marginTop: 16 }}>Users completed game-day decisions 60% faster — not because Jordy was faster to load, but because it reduced the number of queries needed to reach a decision.</p>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { stat: '5 of 6', finding: 'participants preferred widget cards over text replies. Moderated sessions; 6 participants across fantasy, casual fan, and data-analyst profiles. Tasks were identical — only the response format varied.' },
            { stat: 'Hours → mins', finding: 'theme-switching time reduced in design reviews after the variable system launched. Previous approach: manual redesign of all card components per new client.' },
            { stat: '100%', finding: 'of persona types completed 3 core tasks without guidance: find a player\'s injury status, make a start/sit decision, get a live score update.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '18px 24px', background: '#ffffff', border: '1px solid #e5e7eb', borderLeft: `3px solid ${AMBER}`, borderRadius: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0, minWidth: 100 }}>{item.stat}</span>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.finding}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: BLUE }}>Why it mattered</p>
          <p className="cs-body-single">Within three months of launch, NSL and two other clients adopted the platform using the variable system — no redesign required, only token updates. A decision made early ("every color is a variable, no hardcoded hex") became the reason the product could scale commercially without additional design resource. The flexibility wasn't a nice-to-have. It was the business case.</p>
        </div>
      </motion.section>

      {/* 8 — What I'd do differently */}
      <motion.section className="cs-section" custom={8} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>What I'd do differently</p>
        <h2 className="cs-heading">Six interviews wasn't enough.</h2>
        <div className="cs-body-block">
          <p>The widget-first decision was validated by six usability sessions — all participants were fantasy league players, skewing toward users who were already data-fluent. We never tested with the casual fan persona we'd defined. I'd push for at least 12 sessions across all three persona types before committing to a format that shapes the entire interaction model.</p>
          <p>The variable token system is the outcome I'm most proud of — but I'd be dishonest if I called it strategic foresight. It started as a response to a commercial ask: "can we white-label this for NSL without a redesign?" It worked, and I'd do it again — but I'd document the real origin rather than reframe it as planned modularity.</p>
        </div>
      </motion.section>

      {/* 9 — Closing */}
      <motion.section className="cs-section cs-closing" custom={9} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <p className="cs-closing-quote">
          "One question to Jordy replaced four tabs. That's the product."
        </p>
      </motion.section>

      {/* Next case study */}
      <motion.section className="cs-section cs-next-project" custom={10} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
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
