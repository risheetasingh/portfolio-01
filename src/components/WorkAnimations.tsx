import { useEffect, useState } from 'react'

// ── Orb keyframes (injected once) ──────────────────────────────────────────────

const ORB_STYLE = `
@keyframes drift1 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  33%       { transform: translate(8%, -12%) scale(1.08); }
  66%       { transform: translate(-6%, 8%) scale(0.95); }
}
@keyframes drift2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  50%       { transform: translate(-10%, 6%) scale(1.1); }
}
@keyframes drift3 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  40%       { transform: translate(6%, 10%) scale(0.92); }
  80%       { transform: translate(-4%, -8%) scale(1.05); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40%            { opacity: 1;   transform: scale(1); }
}
`

if (typeof document !== 'undefined' && !document.getElementById('jordy-orb-styles')) {
  const s = document.createElement('style')
  s.id = 'jordy-orb-styles'
  s.textContent = ORB_STYLE
  document.head.appendChild(s)
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

function BigText({ text, gradient, visible }: { text: string; gradient: string; visible: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 56px 40px 96px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.94)',
      transition: `opacity 0.55s ${ease}, transform 0.55s ${ease}`,
      pointerEvents: 'none',
    }}>
      <div style={{
        fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em',
        textAlign: 'center', fontFamily: 'sans-serif',
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

function UIFrame({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 40px 40px 88px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 0.55s ${ease}, transform 0.55s ${ease}`,
      pointerEvents: 'none',
    }}>
      {children}
    </div>
  )
}

// Phase timing (ms)
const T_TEXT   = 1600  // how long big text is shown
const T_UI     = 2000  // how long UI moment is shown
const T_TRANS  = 600   // transition overlap (handled by CSS)

// ── Jordy Preview ─────────────────────────────────────────────────────────────

const JORDY_SCENES = [
  {
    text: 'One question.<br/>Instant answer.',
    query: 'Who should I start this weekend?',
    accent: '#e8e4da',
    widgetImg: '/jordy-widget-recent.webp',
  },
  {
    text: 'Ask about<br/>any match.',
    query: 'How did Rapid FC vs Roses FC go?',
    accent: '#c9c4b6',
    widgetImg: '/jordy-widget-h2h.webp',
  },
]

export function JordyPreview() {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'thinking' | 'response' | 'hold' | 'exit'>('typing')
  const [typedCount, setTypedCount] = useState(0)

  useEffect(() => {
    const s = JORDY_SCENES[scene]
    const query = s.query
    let interval: ReturnType<typeof setInterval>
    let t: ReturnType<typeof setTimeout>

    // Reset
    setTypedCount(0)
    setPhase('typing')

    // Type out characters
    let count = 0
    interval = setInterval(() => {
      count++
      setTypedCount(count)
      if (count >= query.length) {
        clearInterval(interval)
        // Switch to thinking
        t = setTimeout(() => {
          setPhase('thinking')
          // After thinking hold, show response
          t = setTimeout(() => {
            setPhase('response')
            // After slide-in, enter hold
            t = setTimeout(() => {
              setPhase('hold')
              // After hold, exit
              t = setTimeout(() => {
                setPhase('exit')
                // Reset to next scene
                t = setTimeout(() => {
                  setScene(i => (i + 1) % JORDY_SCENES.length)
                }, 500)
              }, 2200)
            }, 500)
          }, 900)
        }, 100)
      }
    }, 40)

    return () => {
      clearInterval(interval)
      clearTimeout(t)
    }
  }, [scene])

  const s = JORDY_SCENES[scene]
  const showBubble = phase !== 'exit'
  const showDots = phase === 'thinking'
  const showWidget = phase === 'response' || phase === 'hold'

  return (
    <div style={{ width: '100%', height: '100%', background: '#0c1220', position: 'relative', overflow: 'hidden' }}>
      {/* Orb 1 — purple, top-left */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '55%', height: '55%',
        background: 'radial-gradient(circle, #7c3aed88, transparent 70%)',
        filter: 'blur(48px)',
        animation: 'drift1 12s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      {/* Orb 2 — blue, bottom-right */}
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: '45%', height: '45%',
        background: 'radial-gradient(circle, #2563eb66, transparent 70%)',
        filter: 'blur(56px)',
        animation: 'drift2 16s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      {/* Orb 3 — pink, center-right */}
      <div style={{
        position: 'absolute', top: '25%', right: '5%',
        width: '40%', height: '40%',
        background: 'radial-gradient(circle, #ec489966, transparent 70%)',
        filter: 'blur(44px)',
        animation: 'drift3 20s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Glass container */}
      <div style={{
        position: 'absolute', inset: '15% 12%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 14,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        padding: 16,
        overflow: 'hidden',
      }}>
        {/* Chat bubble */}
        <div style={{
          opacity: showBubble ? 1 : 0,
          transform: showBubble ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 0.3s ease, transform 0.3s ease`,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          marginBottom: 10,
        }}>
          <div style={{
            background: '#1e293b', borderRadius: '10px 10px 3px 10px',
            padding: '7px 12px', fontSize: 11, color: '#cbd5e1',
            maxWidth: '85%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            fontFamily: 'var(--mono)',
            minHeight: 28,
            lineHeight: 1.4,
          }}>
            {s.query.slice(0, typedCount)}
            {phase === 'typing' && (
              <span style={{ animation: 'blink 0.9s step-end infinite', marginLeft: 1 }}>|</span>
            )}
          </div>
        </div>

        {/* Thinking dots */}
        <div style={{
          opacity: showDots ? 1 : 0,
          transition: 'opacity 0.25s ease',
          display: 'flex', gap: 4, paddingLeft: 2, marginBottom: 10, height: 16,
          alignItems: 'center',
        }}>
          {[0, 160, 320].map(delay => (
            <span key={delay} style={{
              display: 'inline-block',
              width: 6, height: 6, borderRadius: '50%',
              background: '#94a3b8',
              animation: showDots ? `dotPulse 1.2s ease-in-out infinite` : 'none',
              animationDelay: `${delay}ms`,
            }} />
          ))}
        </div>

        {/* Widget image */}
        <img
          src={s.widgetImg}
          style={{
            width: '72%', borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            display: 'block', alignSelf: 'center',
            opacity: showWidget ? 1 : 0,
            transform: showWidget ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

// ── Shared orb + glass wrapper ─────────────────────────────────────────────────

function GlassPanel({ bg, orbs, children }: {
  bg: string
  orbs: { color: string; top?: string; bottom?: string; left?: string; right?: string; w: string; h: string; blur: number; anim: string }[]
  children: React.ReactNode
}) {
  return (
    <div style={{ width: '100%', height: '100%', background: bg, position: 'relative', overflow: 'hidden' }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: o.top, bottom: o.bottom, left: o.left, right: o.right,
          width: o.w, height: o.h,
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          filter: `blur(${o.blur}px)`,
          animation: `${o.anim} ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}
      <div style={{
        position: 'absolute', inset: '15% 12%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 14,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        padding: 16, overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  )
}

function SlideImg({ src, visible }: { src: string; visible: boolean }) {
  return (
    <img src={src} style={{
      width: '72%', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
      display: 'block', alignSelf: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }} />
  )
}

// ── AI Highlights Preview ──────────────────────────────────────────────────────

const HIGHLIGHTS_ORBS = [
  { color: '#16a34a88', top: '-10%', left: '-5%',    w: '55%', h: '55%', blur: 48, anim: 'drift1 13s' },
  { color: '#4ade8055', bottom: '-10%', right: '-5%', w: '45%', h: '45%', blur: 56, anim: 'drift2 17s' },
  { color: '#bbf7d044', top: '25%',  right: '5%',    w: '40%', h: '40%', blur: 44, anim: 'drift3 21s' },
]

const CLIPS = [
  { label: "Goal  78'",  color: '#4ade80' },
  { label: "Card  82'",  color: '#facc15' },
  { label: "Sub   85'",  color: '#60a5fa' },
]

export function HighlightsPreview() {
  const [scene, setScene] = useState(0)
  // phases: 'setup' → 'response' → 'hold' → 'exit'
  const [phase, setPhase] = useState<'setup' | 'response' | 'hold' | 'exit'>('setup')
  const [clipsVisible, setClipsVisible] = useState([false, false, false])

  useEffect(() => {
    let ts: ReturnType<typeof setTimeout>[] = []
    setPhase('setup')
    setClipsVisible([false, false, false])

    if (scene === 0) {
      // Stagger 3 clips appearing
      ts.push(setTimeout(() => setClipsVisible([true, false, false]), 300))
      ts.push(setTimeout(() => setClipsVisible([true, true, false]), 700))
      ts.push(setTimeout(() => setClipsVisible([true, true, true]), 1100))
      ts.push(setTimeout(() => setPhase('response'), 1600))
    } else {
      // Scene 1: "compile" button pulses, then image
      ts.push(setTimeout(() => setPhase('response'), 1400))
    }

    ts.push(setTimeout(() => setPhase('hold'), 2100))
    ts.push(setTimeout(() => setPhase('exit'), 4300))
    ts.push(setTimeout(() => {
      setScene(s => (s + 1) % 2)
    }, 4800))

    return () => ts.forEach(clearTimeout)
  }, [scene])

  const showImg = phase === 'response' || phase === 'hold'
  const showSetup = phase === 'setup' || phase === 'response'

  return (
    <GlassPanel bg="#051209" orbs={HIGHLIGHTS_ORBS}>
      {scene === 0 ? (
        // Scene 0: live timeline clips arriving
        <div style={{ opacity: showSetup ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          {/* LIVE badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 6px #ef4444' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: '#ef4444' }}>LIVE</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#64748b', marginLeft: 4 }}>Match ending · 85'</span>
          </div>
          {/* Clip strips */}
          {CLIPS.map((clip, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7,
              opacity: clipsVisible[i] ? 1 : 0,
              transform: clipsVisible[i] ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}>
              <div style={{ width: 3, height: 20, borderRadius: 2, background: clip.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#94a3b8' }}>{clip.label}</span>
              <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />
            </div>
          ))}
        </div>
      ) : (
        // Scene 1: compile action
        <div style={{ opacity: showSetup ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#64748b', marginBottom: 10 }}>3 clips selected</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#16a34a22', border: '1px solid #16a34a55',
            borderRadius: 6, padding: '6px 14px',
            fontFamily: 'var(--mono)', fontSize: 11, color: '#4ade80',
          }}>
            Compile → Publish
          </div>
        </div>
      )}
      <SlideImg src={scene === 0 ? '/highlights-timeline.webp' : '/highlights-compiler.webp'} visible={showImg} />
    </GlassPanel>
  )
}

// ── Axis Preview ───────────────────────────────────────────────────────────────

const AXIS_ORBS = [
  { color: '#6d68a888', top: '-10%', left: '-5%',    w: '55%', h: '55%', blur: 48, anim: 'drift1 14s' },
  { color: '#4338ca55', bottom: '-10%', right: '-5%', w: '45%', h: '45%', blur: 56, anim: 'drift2 18s' },
  { color: '#c4c0e844', top: '25%',  right: '5%',    w: '40%', h: '40%', blur: 44, anim: 'drift3 22s' },
]

const DIST_ROUTES = ['Athletes', 'Teams', 'Sponsors']

export function AxisPreview() {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'response' | 'hold' | 'exit'>('typing')
  const [typedCount, setTypedCount] = useState(0)
  const [routesLit, setRoutesLit] = useState([false, false, false])

  const QUERY = 'goals from last Saturday'

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    let ts: ReturnType<typeof setTimeout>[] = []

    setPhase('typing')
    setTypedCount(0)
    setRoutesLit([false, false, false])

    if (scene === 0) {
      // Scene 0: search bar typewriter
      let count = 0
      interval = setInterval(() => {
        count++
        setTypedCount(count)
        if (count >= QUERY.length) {
          clearInterval(interval)
          ts.push(setTimeout(() => setPhase('response'), 400))
          ts.push(setTimeout(() => setPhase('hold'), 900))
          ts.push(setTimeout(() => setPhase('exit'), 3100))
          ts.push(setTimeout(() => setScene(1), 3600))
        }
      }, 45)
    } else {
      // Scene 1: distribution routes light up one by one
      ts.push(setTimeout(() => setRoutesLit([true, false, false]), 300))
      ts.push(setTimeout(() => setRoutesLit([true, true, false]), 700))
      ts.push(setTimeout(() => setRoutesLit([true, true, true]), 1100))
      ts.push(setTimeout(() => setPhase('response'), 1500))
      ts.push(setTimeout(() => setPhase('hold'), 2000))
      ts.push(setTimeout(() => setPhase('exit'), 4200))
      ts.push(setTimeout(() => setScene(0), 4700))
    }

    return () => { clearInterval(interval); ts.forEach(clearTimeout) }
  }, [scene])

  const showImg = phase === 'response' || phase === 'hold'
  const panelVisible = phase !== 'exit'

  return (
    <GlassPanel bg="#06060f" orbs={AXIS_ORBS}>
      {scene === 0 ? (
        // Scene 0: search bar
        <div style={{ opacity: panelVisible ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6d68a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Content search</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(109,104,168,0.3)',
            borderRadius: 6, padding: '7px 10px',
          }}>
            <span style={{ color: '#6d68a8', fontSize: 12 }}>⌕</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c4c0e8' }}>
              {QUERY.slice(0, typedCount)}
              {phase === 'typing' && <span style={{ animation: 'blink 0.9s step-end infinite' }}>|</span>}
            </span>
          </div>
        </div>
      ) : (
        // Scene 1: distribution flow
        <div style={{ opacity: panelVisible ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6d68a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Distributing</div>
          {DIST_ROUTES.map((route, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: routesLit[i] ? '#c4c0e8' : 'rgba(255,255,255,0.1)',
                boxShadow: routesLit[i] ? '0 0 6px #c4c0e8' : 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
              }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: routesLit[i] ? '#c4c0e8' : '#475569', transition: 'color 0.3s ease' }}>{route}</span>
              <div style={{ flex: 1, height: 1, background: routesLit[i] ? 'rgba(196,192,232,0.3)' : 'rgba(255,255,255,0.05)', transition: 'background 0.3s ease' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: routesLit[i] ? '#4ade80' : '#334155', transition: 'color 0.3s ease' }}>{routesLit[i] ? '✓' : '·'}</span>
            </div>
          ))}
        </div>
      )}
      <SlideImg src={scene === 0 ? '/axis-tagging.webp' : '/axis-hero.webp'} visible={showImg} />
    </GlassPanel>
  )
}

// ── Axis B2C Preview ───────────────────────────────────────────────────────────

const VIOLET = '#7c3aed'
const ROSE   = '#f43f5e'

const AXIS_B2C_ORBS = [
  { color: `${VIOLET}88`, top: '-10%', left: '-5%',    w: '55%', h: '55%', blur: 48, anim: 'drift1 12s' },
  { color: `${ROSE}55`,   bottom: '-10%', right: '-5%', w: '45%', h: '45%', blur: 56, anim: 'drift2 16s' },
  { color: '#e8c4b844',   top: '25%',  right: '5%',    w: '40%', h: '40%', blur: 44, anim: 'drift3 20s' },
]

export function AxisB2CPreview() {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'thinking' | 'response' | 'hold' | 'exit'>('typing')
  const [typedCount, setTypedCount] = useState(0)
  const [progress, setProgress] = useState(0)

  const QUERY = 'Show me goals from last Saturday'

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    let ts: ReturnType<typeof setTimeout>[] = []

    setPhase('typing')
    setTypedCount(0)
    setProgress(0)

    if (scene === 0) {
      // Scene 0: AI search typewriter → thinking dots → results
      let count = 0
      interval = setInterval(() => {
        count++
        setTypedCount(count)
        if (count >= QUERY.length) {
          clearInterval(interval)
          ts.push(setTimeout(() => setPhase('thinking'), 100))
          ts.push(setTimeout(() => setPhase('response'), 1000))
          ts.push(setTimeout(() => setPhase('hold'), 1500))
          ts.push(setTimeout(() => setPhase('exit'), 3700))
          ts.push(setTimeout(() => setScene(1), 4200))
        }
      }, 38)
    } else {
      // Scene 1: "AI is generating your reel…" progress bar → image
      let t1: ReturnType<typeof setTimeout>
      let t2: ReturnType<typeof setTimeout>
      let t3: ReturnType<typeof setTimeout>
      let t4: ReturnType<typeof setTimeout>
      t1 = setTimeout(() => {
        let p = 0
        interval = setInterval(() => {
          p += 4
          setProgress(Math.min(p, 100))
          if (p >= 100) {
            clearInterval(interval)
            t2 = setTimeout(() => setPhase('response'), 200)
            t3 = setTimeout(() => setPhase('hold'), 700)
            t4 = setTimeout(() => { setPhase('exit'); setTimeout(() => setScene(0), 500) }, 2900)
          }
        }, 40)
      }, 200)
      ts.push(t1)
      return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }

    return () => { clearInterval(interval); ts.forEach(clearTimeout) }
  }, [scene])

  const showImg = phase === 'response' || phase === 'hold'
  const showDots = phase === 'thinking'
  const panelVisible = phase !== 'exit'

  return (
    <GlassPanel bg="#0a060f" orbs={AXIS_B2C_ORBS}>
      {scene === 0 ? (
        // Scene 0: prominent AI search bar (this IS the product's home screen)
        <div style={{ opacity: panelVisible ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid rgba(124,58,237,0.4)`,
            borderRadius: 8, padding: '9px 12px',
            boxShadow: '0 0 16px rgba(124,58,237,0.1)',
          }}>
            <span style={{ fontSize: 13, background: `linear-gradient(135deg, ${VIOLET}, ${ROSE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#e2d9f3', flex: 1 }}>
              {QUERY.slice(0, typedCount)}
              {phase === 'typing' && <span style={{ animation: 'blink 0.9s step-end infinite' }}>|</span>}
            </span>
          </div>
          {/* Thinking dots below search bar */}
          <div style={{ opacity: showDots ? 1 : 0, transition: 'opacity 0.25s ease', display: 'flex', gap: 4, paddingLeft: 4, marginTop: 10, height: 14, alignItems: 'center' }}>
            {[0, 160, 320].map(delay => (
              <span key={delay} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: VIOLET, animation: showDots ? 'dotPulse 1.2s ease-in-out infinite' : 'none', animationDelay: `${delay}ms` }} />
            ))}
          </div>
        </div>
      ) : (
        // Scene 1: highlight generation progress
        <div style={{ opacity: panelVisible ? 1 : 0, transition: 'opacity 0.4s ease', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#9d8ec4', marginBottom: 10 }}>AI is generating your reel...</div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${VIOLET}, ${ROSE})`, borderRadius: 2, transition: 'width 0.04s linear' }} />
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6d5a8a', marginTop: 6 }}>{progress}% complete</div>
        </div>
      )}
      <SlideImg src="/axis-b2c-hero.webp" visible={showImg} />
    </GlassPanel>
  )
}
