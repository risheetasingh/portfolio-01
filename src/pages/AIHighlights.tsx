import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  toggleTheme: () => void
}

const TEAL   = '#4CC9C8'
const ACCENT = '#b8d4bb'
const AMBER  = '#f59e0b'
const PURPLE = '#7c3aed'

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function DarkTopbar({ links = ['Media Library', 'Agentic Automation', 'Distribution'], extra }: { links?: string[], extra?: string }) {
  return (
    <div className="cs-mock-topbar cs-mock-topbar-dark">
      <div className="cs-mock-logo">⊙ SPECTATR</div>
      <div className="cs-mock-pill-purple">Pulse</div>
      {links.map(l => <div key={l} className="cs-mock-navlink">{l}</div>)}
      {extra && <div className="cs-mock-navlink" style={{ color: '#888' }}>{extra}</div>}
      <div style={{ marginLeft: 'auto' }}><div className="cs-mock-avatar-circle" /></div>
    </div>
  )
}

function LightTopbar({ active = 'Pulse' }: { active?: string }) {
  const links = ['Pulse', 'Media Library', 'Distribution', 'Ask', 'Agentic Automation']
  return (
    <div className="cs-mock-topbar" style={{ background: '#fff', borderBottom: '1px solid #e8e8e6' }}>
      <div className="cs-mock-logo" style={{ color: '#0a0a0a' }}>⊙ SPECTATR</div>
      {links.map(l => (
        <div key={l} className="cs-mock-navlink" style={{
          color: l === active ? PURPLE : '#555',
          borderBottom: l === active ? `2px solid ${PURPLE}` : 'none',
          paddingBottom: l === active ? 2 : 0,
          fontWeight: l === active ? 600 : 400,
        }}>{l}</div>
      ))}
      <div style={{ marginLeft: 'auto' }}>
        <div className="cs-mock-avatar-circle" style={{ background: TEAL }} />
      </div>
    </div>
  )
}

// ── Section 1: Hero mockup (abstract) ─────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide">
      <div className="cs-mock-topbar">
        <div className="cs-mock-dot" /><div className="cs-mock-dot" /><div className="cs-mock-dot" />
        <div className="cs-mock-bar cs-mock-bar-sm" style={{ marginLeft: 12, width: 80 }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div className="cs-mock-bar cs-mock-bar-sm" style={{ width: 48 }} />
          <div className="cs-mock-bar cs-mock-bar-sm" style={{ width: 36 }} />
        </div>
      </div>
      <div className="cs-mock-body">
        <div className="cs-mock-sidebar">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="cs-mock-clip-thumb" style={{ opacity: i === 1 ? 1 : 0.45 }}>
              <div className="cs-mock-clip-img" />
              <div style={{ flex: 1 }}>
                <div className="cs-mock-bar" style={{ width: '80%', marginBottom: 5 }} />
                <div className="cs-mock-bar cs-mock-bar-sm" style={{ width: '55%' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="cs-mock-main">
          <div className="cs-mock-video" />
          <div className="cs-mock-controls">
            {[60,40,80,50,70].map((w, i) => (
              <div key={i} className="cs-mock-bar" style={{ width: `${w}%`, marginBottom: 6 }} />
            ))}
          </div>
        </div>
        <div className="cs-mock-panel">
          <div className="cs-mock-bar" style={{ width: '70%', marginBottom: 8 }} />
          <div className="cs-mock-bar cs-mock-bar-sm" style={{ marginBottom: 16 }} />
          {[1,2,3].map(i => <div key={i} className="cs-mock-tag" />)}
        </div>
      </div>
      <div className="cs-mock-timeline">
        {[15,28,42,58,67,81].map((pos, i) => (
          <div key={i} className="cs-mock-event" style={{ left: `${pos}%` }}>
            <div className="cs-mock-event-marker" />
            <div className="cs-mock-clip-block" style={{ width: i % 2 === 0 ? 48 : 36 }} />
          </div>
        ))}
        <div className="cs-mock-timeline-bar" />
      </div>
    </div>
  )
}

// ── Section 3: Match list entry point ────────────────────────────────────────

function MatchListMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel">
      <DarkTopbar />
      <div className="cs-mock-match-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="cs-mock-league-icon" />
          <span className="cs-mock-league-name">Champions League</span>
        </div>
        <div className="cs-mock-create-btn">Create Video +</div>
      </div>
      <div className="cs-mock-tabs-row">
        <div className="cs-mock-tab cs-mock-tab-active">Live</div>
        <div className="cs-mock-tab">Upcoming</div>
        <div className="cs-mock-tab">Completed</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <div className="cs-mock-icon-btn">⊟</div>
          <div className="cs-mock-icon-btn">▦</div>
        </div>
      </div>
      {[{ date: 'Saturday, 15 March', count: 3 }, { date: 'Sunday, 16 March', count: 2 }].map(({ date, count }) => (
        <div key={date}>
          <div className="cs-mock-date-row">{date}</div>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="cs-mock-match-row">
              <span className="cs-mock-match-time">09:30 AM</span>
              <span className="cs-mock-live-badge">LIVE</span>
              <span className="cs-mock-team-name">mallorca</span>
              <span className="cs-mock-score-box">2-1</span>
              <span className="cs-mock-team-name">Barcelona</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.4, fontFamily: 'var(--mono)' }}>3 Playlists</span>
              <span className="cs-mock-row-chevron">›</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Section 4: Timeline before/after ─────────────────────────────────────────

function WorkspaceBeforeMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel">
      <DarkTopbar links={['Media Library', 'Agentic Automation', 'Distribution', 'Ask Jordy']} />
      <div className="cs-mock-workspace-row">
        <div className="cs-mock-video-area">
          <div className="cs-mock-video-banner">
            <span className="cs-mock-match-label">Argentina vs. France</span>
            <span className="cs-mock-live-badge">LIVE</span>
          </div>
          <div className="cs-mock-video-pitch" />
          <div className="cs-mock-video-scrubbar" />
          <div style={{ fontSize: 10, opacity: 0.35, marginTop: 6, fontFamily: 'var(--mono)' }}>Create new clip</div>
        </div>
        <div className="cs-mock-right-panel">
          <div className="cs-mock-panel-tabs">
            {['All Clips', 'My Clips', 'All Playlist', 'Transcript'].map(t => (
              <span key={t} className="cs-mock-panel-tab">{t}</span>
            ))}
          </div>
          <div className="cs-mock-search-row">
            <div className="cs-mock-search-bar" />
            <div className="cs-mock-filter-chip">Player</div>
            <div className="cs-mock-filter-chip">Event</div>
          </div>
          <div style={{ fontSize: 10, opacity: 0.4, marginBottom: 10, fontFamily: 'var(--mono)' }}>
            545 of 7654 Clips &nbsp;·&nbsp; <span style={{ color: TEAL }}>2 Live</span>
          </div>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="cs-mock-clip-item">
              <div className="cs-mock-clip-thumb-sm" />
              <div style={{ flex: 1 }}>
                <div className="cs-mock-bar" style={{ width: '78%', marginBottom: 4 }} />
                <div className="cs-mock-bar cs-mock-bar-sm" style={{ width: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkspaceAfterMockup() {
  const events = [
    { min: "49'", icon: '⚽', label: 'Memphis Depay (1-0)',    sub: 'Assist by Jordi Alba', clips: true  },
    { min: 'HT',  icon: '',   label: '1-0',                   sub: '',                     clips: false },
    { min: "43'", icon: '⇄',  label: 'Eric Garcia',           sub: 'Gerard Pique',         clips: true  },
    { min: "35'", icon: '🟨', label: 'Gavi',                  sub: '',                     clips: false },
    { min: "24'", icon: '⚽', label: 'Sergio Busquets (2-0)', sub: '',                     clips: false },
    { min: "20'", icon: '⇄',  label: 'Takefusa Kubo',        sub: 'J. Albert',            clips: false },
  ]
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel">
      <DarkTopbar links={['Media Library', 'Agentic Automation', 'Distribution', 'Ask Jordy']} />
      <div className="cs-mock-workspace-row">
        <div className="cs-mock-video-area">
          <div className="cs-mock-video-banner">
            <span className="cs-mock-match-label">Argentina vs. France</span>
            <span className="cs-mock-live-badge">LIVE</span>
          </div>
          <div className="cs-mock-video-pitch" />
          <div className="cs-mock-video-scrubbar" />
          <div style={{ fontSize: 10, opacity: 0.35, marginTop: 6, fontFamily: 'var(--mono)' }}>Create new clip</div>
        </div>
        <div className="cs-mock-right-panel">
          <div className="cs-mock-panel-tabs">
            {['All Clips', 'My Clips', 'All Playlist', 'Transcript'].map(t => (
              <span key={t} className="cs-mock-panel-tab">{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 10, opacity: 0.4, fontFamily: 'var(--mono)' }}>
              54 of 76 Events &nbsp;·&nbsp; <span style={{ color: TEAL }}>1 New</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 9, opacity: 0.4, fontFamily: 'var(--mono)' }}>Timeline</span>
              <div className="cs-mock-toggle-on" />
            </div>
          </div>
          {events.map((e, i) => (
            <div key={i}>
              {e.icon === '' ? (
                <div className="cs-mock-halftime-row">{e.min} &nbsp; {e.label}</div>
              ) : (
                <div className="cs-mock-event-row-item">
                  <span className="cs-mock-event-min-label">{e.min}</span>
                  <span className="cs-mock-event-char">{e.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, opacity: 0.8, fontFamily: 'var(--mono)' }}>{e.label}</div>
                    {e.sub && <div style={{ fontSize: 9, opacity: 0.4, fontFamily: 'var(--mono)' }}>{e.sub}</div>}
                  </div>
                  <span className="cs-mock-row-chevron">›</span>
                </div>
              )}
              {e.clips && (
                <div style={{ display: 'flex', gap: 5, marginLeft: 36, marginBottom: 6 }}>
                  {[1,2,3].map(j => <div key={j} className="cs-mock-event-clip-thumb" />)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section 5: Compilation modal ──────────────────────────────────────────────

function CompilationModalMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel" style={{ padding: 20 }}>
      <div className="cs-mock-modal">
        <div className="cs-mock-modal-header">
          <span>Manage Compilations</span>
          <span style={{ opacity: 0.4, fontSize: 11, fontFamily: 'var(--mono)' }}>Playlist Name</span>
          <span style={{ marginLeft: 'auto', opacity: 0.4, cursor: 'default' }}>✕</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16 }}>
          {/* Left: video + clip strip */}
          <div>
            <div className="cs-mock-video-pitch" style={{ height: 180, marginBottom: 8, borderRadius: 4 }} />
            <div style={{ display: 'flex', gap: 4, marginBottom: 12, overflowX: 'hidden' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="cs-mock-clip-thumb-sm" style={{ width: 38, height: 28, flexShrink: 0 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ border: '1px solid #333', borderRadius: 3, padding: '4px 10px', fontSize: 10, fontFamily: 'var(--mono)', color: '#aaa' }}>Edit in studio</div>
              <span style={{ fontSize: 10, opacity: 0.4, fontFamily: 'var(--mono)' }}>Clip length: 0:02:00:10</span>
            </div>
          </div>
          {/* Right: compiler settings panel */}
          <div className="cs-mock-compiler-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: '#ccc', letterSpacing: '0.02em' }}>Compiler Name: Untitled compiler</span>
              <span style={{ opacity: 0.35, fontSize: 12 }}>✕</span>
            </div>
            {[
              { label: 'Title of compiled video', type: 'input', value: 'FanCar_vs_PSMB_Goals_9:16' },
              { label: 'Select language', type: 'select', value: 'English' },
              { label: 'Aspect ratio', type: 'radio', value: '' },
              { label: 'Add Tags', type: 'input', value: '' },
              { label: 'Thumbnail', type: 'upload', value: '' },
            ].map(field => (
              <div key={field.label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, opacity: 0.45, fontFamily: 'var(--mono)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{field.label}</div>
                {field.type === 'radio' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ border: '1px solid #333', borderRadius: 3, padding: '3px 10px', fontSize: 9, fontFamily: 'var(--mono)', color: '#888' }}>9:16</div>
                    <div style={{ border: '1px solid #555', borderRadius: 3, padding: '3px 10px', fontSize: 9, fontFamily: 'var(--mono)', color: '#ddd', background: '#2a2a2a' }}>16:9</div>
                  </div>
                ) : field.type === 'upload' ? (
                  <div style={{ height: 36, background: '#111', border: '1px dashed #333', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, opacity: 0.3, fontFamily: 'var(--mono)' }}>Select or upload from asset library</span>
                  </div>
                ) : (
                  <div style={{ height: 24, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 3, padding: '4px 8px' }}>
                    {field.value && <span style={{ fontSize: 9, opacity: 0.6, fontFamily: 'var(--mono)', color: '#ccc' }}>{field.value}</span>}
                  </div>
                )}
              </div>
            ))}
            <div className="cs-mock-create-btn" style={{ textAlign: 'center', marginTop: 8 }}>Compile Video</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 6: Workspace / Media library ──────────────────────────────────────

function WorkspaceFoldersMockup() {
  const folders = ['UEFA Champions League', 'English Premier League', 'English League Championship', 'Folder name', 'Folder name']
  const sidebarItems = ['AFC Champions League Two', 'Usan vs Beijing Gaian', 'Port vs Jeombuk Motors', 'Persepolis vs Al-Hilal', 'AlPort vs Jeombuk Motors', 'Kashima vs Al Sadd']
  return (
    <div className="cs-mockup cs-mockup-wide cs-light-panel">
      <LightTopbar active="Pulse" />
      <div className="cs-mock-workspace-layout">
        {/* Sidebar */}
        <div className="cs-mock-workspace-sidebar">
          <div className="cs-mock-sidebar-section-label">Assets</div>
          {sidebarItems.map((item, i) => (
            <div key={i} className="cs-mock-sidebar-item" style={{ paddingLeft: i > 1 ? 16 : 8 }}>
              <span className="cs-mock-folder-icon">📁</span>
              <span className="cs-mock-sidebar-text">{item}</span>
            </div>
          ))}
          <div className="cs-mock-sidebar-section-label" style={{ marginTop: 12 }}>Collections</div>
          {['Match compilations', 'Player compilation', 'Team compilation'].map(c => (
            <div key={c} className="cs-mock-sidebar-item">
              <span className="cs-mock-folder-icon">□</span>
              <span className="cs-mock-sidebar-text">{c}</span>
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="cs-mock-workspace-main">
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#0a0a0a', marginBottom: 4 }}>Risheeta's Workspace</div>
            <div style={{ fontSize: 11, color: '#888', fontFamily: 'var(--mono)' }}>Easily access, organise, and search media files</div>
          </div>
          <div style={{ fontSize: 10, opacity: 0.5, fontFamily: 'var(--mono)', marginBottom: 12 }}>12 Folders · 42GB</div>
          <div className="cs-mock-folder-grid">
            {folders.map((name, i) => (
              <div key={i} className="cs-mock-folder-card">
                <div className="cs-mock-folder-thumb" />
                <div style={{ fontSize: 10, color: '#0a0a0a', marginTop: 6, fontFamily: 'var(--mono)' }}>{name}</div>
                <div style={{ fontSize: 9, color: '#aaa', fontFamily: 'var(--mono)' }}>245 items</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, opacity: 0.5, fontFamily: 'var(--mono)', margin: '16px 0 10px' }}>1233 Videos · 4GB</div>
          <div className="cs-mock-video-thumb-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="cs-mock-video-thumb-card">
                <div className="cs-mock-video-thumb-img" />
                <div style={{ fontSize: 9, color: '#666', fontFamily: 'var(--mono)', marginTop: 4 }}>Asset name</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 7: Share content / Distribution ───────────────────────────────────

function ShareContentMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel" style={{ padding: 20 }}>
      <div className="cs-mock-modal cs-mock-modal-light">
        <div className="cs-mock-modal-header" style={{ background: '#fff', color: '#0a0a0a', borderBottom: '1px solid #e8e8e6' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>Share content</span>
          <span style={{ marginLeft: 'auto', color: '#aaa', cursor: 'default' }}>✕</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0 }}>
          {/* Left: channel selector */}
          <div style={{ borderRight: '1px solid #e8e8e6', padding: 16 }}>
            <div style={{ fontSize: 10, color: '#888', fontFamily: 'var(--mono)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Select Channel</div>
            <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--mono)', marginBottom: 10 }}>Select social accounts you would like to post from</div>
            {[
              { name: 'YouTube', checked: true },
              { name: 'Instagram Post', checked: false },
              { name: 'Instagram Reel', checked: false },
            ].map(ch => (
              <div key={ch.name} className="cs-mock-channel-row">
                <span style={{ width: 12, height: 12, border: `1px solid ${ch.checked ? PURPLE : '#ccc'}`, borderRadius: 2, background: ch.checked ? PURPLE : 'transparent', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: '#333' }}>{ch.name}</span>
              </div>
            ))}
          </div>
          {/* Right: content generation */}
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ background: PURPLE, color: '#fff', fontSize: 10, padding: '4px 12px', borderRadius: 4, fontFamily: 'var(--mono)' }}>Catchy &amp; Engaging ▾</div>
              <div style={{ border: `1px solid ${PURPLE}`, color: PURPLE, fontSize: 10, padding: '4px 12px', borderRadius: 4, fontFamily: 'var(--mono)' }}>Regenerate Content with AI ✦</div>
            </div>
            {/* YouTube section */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a', fontFamily: 'var(--mono)' }}>◉ Youtube</span>
                <span style={{ fontSize: 10, color: PURPLE, fontFamily: 'var(--mono)' }}>More settings ⚙</span>
              </div>
              {['Title', 'Description'].map(field => (
                <div key={field} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: '#888', fontFamily: 'var(--mono)', marginBottom: 4 }}>{field}</div>
                  <div style={{ border: '1px solid #e8e8e6', borderRadius: 3, padding: '6px 8px', fontSize: 10, color: '#333', fontFamily: 'var(--mono)', lineHeight: 1.5 }}>
                    {field === 'Title' ? "Liverpool's 3-1 win vs Southampton at Anfield" : 'Watch extended highlights of Liverpool\'s 3-1 win vs Southampton...'}
                  </div>
                </div>
              ))}
            </div>
            {/* Instagram section */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a', fontFamily: 'var(--mono)' }}>◉ Instagram Post</span>
                <span style={{ fontSize: 10, color: PURPLE, fontFamily: 'var(--mono)' }}>More settings ⚙</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: '#888', fontFamily: 'var(--mono)', marginBottom: 4 }}>Caption</div>
                <div style={{ border: '1px solid #e8e8e6', borderRadius: 3, padding: '6px 8px', fontSize: 10, color: '#333', fontFamily: 'var(--mono)' }}>Liverpool's 3-1 win vs Southampton at Anfield</div>
              </div>
            </div>
            {/* Post actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, borderTop: '1px solid #e8e8e6', paddingTop: 12 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Post now', 'Schedule', 'Save as draft'].map((opt, i) => (
                  <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: i === 0 ? '#0a0a0a' : '#888', fontFamily: 'var(--mono)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${i === 0 ? '#0a0a0a' : '#ccc'}`, background: i === 0 ? '#0a0a0a' : 'transparent', display: 'inline-block', flexShrink: 0 }} />
                    {opt}
                  </div>
                ))}
              </div>
              <div style={{ background: PURPLE, color: '#fff', fontSize: 10, padding: '6px 16px', borderRadius: 4, fontFamily: 'var(--mono)' }}>Post Now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 8: Find clips faster ─────────────────────────────────────────────

function FilterClipsMockup() {
  return (
    <div className="cs-mockup cs-light-panel" style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: '#888', fontFamily: 'var(--mono)', marginBottom: 8 }}>Clip length: 0:02:00:10 &nbsp; <span style={{ color: PURPLE }}>Save Clip</span></div>
        <div className="cs-mock-tabs-row" style={{ borderBottom: '1px solid #e8e8e6', padding: '0', gap: 0, background: 'transparent' }}>
          {['Clips', 'Metadata', 'Compilations'].map((t, i) => (
            <div key={t} style={{ fontSize: 11, color: i === 0 ? '#0a0a0a' : '#aaa', padding: '8px 14px', borderBottom: i === 0 ? '2px solid #0a0a0a' : 'none', fontFamily: 'var(--mono)' }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a', marginBottom: 10, fontFamily: 'var(--mono)' }}>
        Filter Clips in Playlist &nbsp;
        <span style={{ fontSize: 10, color: PURPLE, fontWeight: 400 }}>Clear all ✕</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {[['Event', '8'], ['Rating', ''], ['Half', ''], ['Player', ''], ['Team', '']].map(([label, count]) => (
          <div key={label} style={{ border: '1px solid #e8e8e6', borderRadius: 3, padding: '3px 10px', fontSize: 10, color: '#333', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {label}
            {count && <span style={{ background: '#e8e8e6', borderRadius: 10, padding: '1px 6px', fontSize: 9, color: '#333' }}>{count}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: '#555', fontFamily: 'var(--mono)' }}>545 of 7654 Clips</span>
        <span style={{ fontSize: 10, color: TEAL, fontFamily: 'var(--mono)' }}>2 New clips ↺</span>
      </div>
      <div style={{ border: '1px solid #e8e8e6', borderRadius: 4, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 80, height: 52, background: '#e8e8e6', borderRadius: 3, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: '#0a0a0a', marginBottom: 4 }}>Assist_Dimaria_81_ARG vs C...</div>
          <div style={{ fontSize: 10, color: '#aaa', fontFamily: 'var(--mono)' }}>48' &nbsp; Long · Goals</div>
        </div>
      </div>
    </div>
  )
}

function DistributionLogMockup() {
  const rows = [
    { platform: 'YT', name: 'Channel Name', status: 'Published', date: '17 Apr 2024 10:00 am', color: '#ff0000' },
    { platform: 'YT', name: 'Channel Name', status: 'Draft',     date: '',                     color: '#ff0000' },
    { platform: 'IG', name: "Account's Name", status: 'Scheduled', date: '17 Apr 2024 10:00 am', color: '#e1306c' },
    { platform: 'YT', name: 'Channel Name', status: 'Published', date: '17 Apr 2024 10:00 am', color: '#ff0000' },
    { platform: 'YT', name: 'Channel Name', status: 'Published', date: '17 Apr 2024 10:00 am', color: '#ff0000' },
  ]
  const statusColor: Record<string, string> = { Published: '#166534', Draft: '#555', Scheduled: '#7c3aed' }
  const statusBg: Record<string, string>    = { Published: '#dcfce7', Draft: '#f3f3f3', Scheduled: '#ede9fe' }
  return (
    <div className="cs-mockup cs-light-panel" style={{ padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #e8e8e6', paddingBottom: 8, marginBottom: 8, gap: 8 }}>
        {['Platform', 'Status', 'Date'].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 600, color: '#0a0a0a', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 0', borderBottom: '1px solid #f3f3f3', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: row.color, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#555', fontFamily: 'var(--mono)' }}>{row.name}</span>
          </div>
          <div>
            <span style={{ fontSize: 9, fontFamily: 'var(--mono)', padding: '2px 8px', borderRadius: 10, background: statusBg[row.status], color: statusColor[row.status], fontWeight: 500 }}>{row.status}</span>
          </div>
          <div style={{ fontSize: 10, color: '#888', fontFamily: 'var(--mono)' }}>{row.date}</div>
        </div>
      ))}
    </div>
  )
}

// ── Section 9: Playlist builder ───────────────────────────────────────────────

function PlaylistBuilderMockup() {
  return (
    <div className="cs-mockup cs-mockup-wide cs-dark-panel" style={{ padding: 20 }}>
      <div className="cs-mock-modal cs-mock-modal-light" style={{ maxHeight: 420, overflow: 'hidden' }}>
        <div className="cs-mock-modal-header" style={{ background: '#fff', color: '#0a0a0a', borderBottom: '1px solid #e8e8e6' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>Playlist Builder</span>
          <span style={{ marginLeft: 'auto', color: '#aaa' }}>✕</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 0 }}>
          {/* Left: settings */}
          <div style={{ borderRight: '1px solid #e8e8e6', padding: 16 }}>
            <div style={{ fontSize: 10, color: '#555', fontFamily: 'var(--mono)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Batch playlist naming format</div>
            <div style={{ background: '#f3f0ff', border: '1px solid #ddd6fe', borderRadius: 3, padding: '4px 8px', fontSize: 9, fontFamily: 'var(--mono)', color: PURPLE, marginBottom: 10 }}>
              &#123;Match&#125; &#123;Type of Playlist&#125;...
            </div>
            {[
              { label: 'Match', value: 'MAL vs BAR, +2 more' },
              { label: 'Type of playlist', value: '' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: '#888', fontFamily: 'var(--mono)', marginBottom: 4 }}>{f.label}</div>
                {f.value ? (
                  <div style={{ fontSize: 10, color: '#0a0a0a', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>⚽</span> {f.value}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['Match Compilation', 'Team Compilation', 'Compilation'].map((opt, i) => (
                      <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: i === 0 ? '#0a0a0a' : '#888', fontFamily: 'var(--mono)' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${i === 0 ? '#0a0a0a' : '#ccc'}`, background: i === 0 ? '#0a0a0a' : 'transparent', display: 'inline-block', flexShrink: 0 }} />
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 9, color: '#888', fontFamily: 'var(--mono)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Action Filter</div>
              <div style={{ border: '1px solid #e8e8e6', borderRadius: 3, padding: '4px 8px', fontSize: 9, color: '#555', fontFamily: 'var(--mono)' }}>Goals, Tackles, Chances, Saves, Ta...</div>
            </div>
            <div style={{ marginBottom: 6 }}>
              {['Use default setting for compilation', 'Compile videos automatically'].map(opt => (
                <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 9, color: '#555', fontFamily: 'var(--mono)' }}>
                  <span style={{ width: 10, height: 10, border: '1px solid #ccc', borderRadius: 2, display: 'inline-block', background: '#e8e8e6', flexShrink: 0 }} />
                  {opt}
                </div>
              ))}
            </div>
          </div>
          {/* Right: playlist list */}
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: '#555', fontFamily: 'var(--mono)' }}>Creating Playlist for</span>
              <div style={{ background: PURPLE, color: '#fff', fontSize: 10, padding: '5px 12px', borderRadius: 4, fontFamily: 'var(--mono)' }}>Publish Playlists</div>
            </div>
            {[
              { date: 'Tuesday, 3 January', rows: [
                { match: 'mallorca vs Barcelona', type: 'Match Compilation', time: '01 min', half: 'First hal' },
                { match: 'Arg vs FRA best Goals', type: 'Match Compilation', time: '01 min', half: 'Second' },
              ]},
              { date: 'Wednesday, 4 January', rows: [
                { match: 'Arg vs FRA best Goals', type: 'Match Compilation', time: '01 min', half: 'First hal' },
                { match: 'Arg vs FRA best Goals', type: 'Player Compilation', time: '01 min', half: 'Second' },
                { match: 'Arg vs FRA best Goals', type: 'Team Compilation', time: '02 min', half: 'First half' },
              ]},
            ].map(group => (
              <div key={group.date}>
                <div style={{ fontSize: 10, color: '#555', fontFamily: 'var(--mono)', padding: '4px 0', borderBottom: '1px solid #e8e8e6', marginBottom: 6 }}>{group.date}</div>
                {group.rows.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '5px 0', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
                    <span style={{ fontSize: 9, color: '#888', fontFamily: 'var(--mono)' }}>{row.match}</span>
                    <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: PURPLE }}>{row.type}</span>
                    <span style={{ fontSize: 9, color: '#aaa', fontFamily: 'var(--mono)' }}>{row.time}</span>
                    <span style={{ fontSize: 9, color: '#aaa', fontFamily: 'var(--mono)' }}>{row.half}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 10: Key Takeaways ─────────────────────────────────────────────────

function TakeawayCards() {
  return (
    <div className="cs-takeaway-grid">
      <div className="cs-takeaway-card">
        <p className="cs-takeaway-title">Perks of being new to the domain</p>
        <p className="cs-takeaway-body">Doing this project was incredibly insightful and, at times, demanding. I successfully navigated a domain that was entirely new to me, requiring a significant shift to think like a media professional. This fresh perspective brought an unbiased opinion, unconstrained by traditional workflows.</p>
      </div>
      <div className="cs-takeaway-card">
        <p className="cs-takeaway-title">User research is your north star</p>
        <p className="cs-takeaway-body">I also learned to tackle complex design challenges smartly by structuring the vast array of features and intricate user flows. Deeply understanding how AI automation, comprehensive media management, and multi-platform publishing converged was crucial in streamlining the entire content lifecycle.</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AIHighlights({ theme, toggleTheme }: Props) {
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
        <h1 className="cs-title">Live sports move fast.<br/>Media workflows don't.</h1>
        <p className="cs-subtitle">Designed a system to turn live match data into publish-ready content in seconds.</p>
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
          <DashboardMockup />
        </motion.div>
        <div className="cs-meta">
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <ul className="cs-meta-list">
              {['Qualitative Research', 'Conceptualization', 'Design', 'Usability testing', 'Dev handoff'].map(r => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Duration</p>
            <p className="cs-meta-value">4 months</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Metrics */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="cs-metric-cards">
          {[
            { stat: '30mins to 2mins', desc: 'Reduced manual highlight creation to social sharing time' },
            { stat: '50secs to 2secs', desc: 'Reduced time to create, review, and publish highlights.' },
            { stat: '99%',             desc: 'Improved accuracy of AI-generated highlight clips.' },
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
          <p>Spectatr.AI set out to design a scalable media management system to simplify highlight creation and publishing for broadcasters. The product was built to support high-volume, real-time sports content — starting with football — and reduce the manual workload faced by editors and media teams during live events.</p>
          <p>The objective was to deliver an end-to-end platform that enables fast, structured, and collaborative highlight workflows across teams.</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <MatchListMockup />
          <p className="cs-mock-caption">Entry: Get started from here</p>
        </div>
      </motion.section>

      {/* 4 — Core Insight: Timeline alignment */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>The core insight</p>
        <h2 className="cs-heading">Align clips to the match, not just the clock.</h2>
        <p className="cs-body-single">Clips anchored to match events — goals, red cards, key plays — carry context automatically. The timeline became the spine of the system.</p>
        <div className="cs-workspace-stack">
          <div>
            <WorkspaceBeforeMockup />
            <p className="cs-workspace-caption">Live match: Clips are being received in real time during the live match, but they aren't aligned with the actual match timeline.</p>
          </div>
          <div>
            <WorkspaceAfterMockup />
            <p className="cs-workspace-caption">Live match: Clips are coming in during the live match and are now aligned with the match timeline.</p>
          </div>
        </div>
      </motion.section>

      {/* 5 — Compilation */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Compilation</p>
        <h2 className="cs-heading">Clips as inputs, not outputs.</h2>
        <p className="cs-body-single">The moment editors could combine clips into compilations inside the same tool, the workflow collapsed from three steps to one. A match montage — previously 45 minutes — became a 4-minute drag-and-drop.</p>
        <CompilationModalMockup />
        <p className="cs-mock-caption">Manage Compilers: This screen lets users compile highlight videos with selected clips, tags, and assets.</p>
      </motion.section>

      {/* 6 — Workspace */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Workspace</p>
        <h2 className="cs-heading">One workspace. Live clips, full context, instant control.</h2>
        <p className="cs-body-single">The core interface unified clip browsing, event-anchored timeline scrubbing, and metadata in a single view. Nothing left the screen to become a highlight.</p>
        <WorkspaceFoldersMockup />
        <p className="cs-mock-caption">Workspace: A clean, scalable media workspace designed for fast navigation, easy organisation, and collaborative team access.</p>
      </motion.section>

      {/* 7 — Distribution */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Distribution</p>
        <h2 className="cs-heading">Publishing becomes part of creation.</h2>
        <p className="cs-body-single">Distribution was surfaced inline — one action, multiple platforms, triggered the moment a compilation was ready. Publish time: 50 seconds to 2.</p>
        <ShareContentMockup />
        <p className="cs-mock-caption">Share Content: A streamlined content scheduler built for effortless cross-platform sharing, AI-powered editing, and precise publishing control.</p>
      </motion.section>

      {/* 8 — Find clips faster */}
      <motion.section className="cs-section" custom={8} initial="hidden" animate="visible" variants={sectionVariants}>
        <h2 className="cs-heading">Optimizing sports media production.</h2>
        <p className="cs-body-single">They want to quickly find relevant clips, efficiently edit content, and seamlessly publish to various platforms.</p>
        <div className="cs-two-col" style={{ marginTop: 40 }}>
          <div>
            <FilterClipsMockup />
            <p className="cs-mock-caption">Find relevant clips faster</p>
          </div>
          <div>
            <DistributionLogMockup />
            <p className="cs-mock-caption">Find relevant clips faster</p>
          </div>
        </div>
      </motion.section>

      {/* 9 — Focus Areas */}
      <motion.section className="cs-section" custom={9} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>Focus Areas</p>
        <h2 className="cs-heading">Crafting the ideal workflow dashboard for sports media professionals</h2>
        <p className="cs-body-single">Recognizing the need for speed and efficiency, we reimagined the core dashboard to act as a smart, personalized entry point for all sports content workflows. Users can instantly access live events, ongoing editing tasks, and scheduled publications, significantly reducing discovery time.</p>

        <div style={{ marginTop: 48, marginBottom: 40 }}>
          <h3 className="cs-sub-heading">The challenge of disparate workflows</h3>
          <p className="cs-body-single" style={{ marginBottom: 40 }}>Traditional methods forced sports editors and analysts to navigate fragmented systems, slowing down highlight creation and distribution. Critical information was scattered, leading to missed opportunities and increased manual effort.</p>
          <PlaylistBuilderMockup />
        </div>

        <h3 className="cs-sub-heading">Our solution: A centralized, intelligent overview</h3>
        <p className="cs-body-single">Through rigorous UX research, we designed a dashboard that intelligently surfaces the most relevant content and tools based on user activity and project status. This fosters a structured workflow, from live event monitoring to content publishing.</p>
      </motion.section>

      {/* 10 — Key Takeaways */}
      <motion.section className="cs-section" custom={10} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Signing off!</p>
        <h2 className="cs-heading">Key Takeaways</h2>
        <p className="cs-body-single">This project was challenging and rewarding, demanding extensive work, exploration, and discussions with stakeholders. It feels almost impossible to boil down my learning, but if I had to, here they are!</p>
        <TakeawayCards />

        <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid var(--border)' }}>
          <p className="cs-section-label" style={{ color: TEAL }}>UX Research Insights</p>
          <h3 className="cs-sub-heading">Mapping user mental models to platform navigation</h3>
          <p className="cs-body-single">Based on extensive card-sorting with sports editors and analysts, we identified their mental models for content organization, leading to four core categories that structure the platform's navigation.</p>
        </div>
      </motion.section>

      {/* 11 — System Flow */}
      <motion.section className="cs-section" custom={11} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">System thinking</p>
        <h2 className="cs-heading">The full loop.</h2>
        <div className="cs-flow">
          {['Live match', 'AI tagging', 'Clips', 'Compilation', 'Distribution'].map((node, i, arr) => (
            <div key={node} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="cs-flow-node">{node}</div>
              {i < arr.length - 1 && <span className="cs-flow-arrow">→</span>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 12 — Closing */}
      <motion.section className="cs-section cs-closing" custom={12} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "This evolved from a tool into a system for real-time storytelling."
        </p>
      </motion.section>

      {/* Next case study */}
      <motion.section className="cs-section cs-next-project" custom={13} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Next case study</p>
        <Link to="/work/axis" className="cs-next-link">
          <p className="cs-next-meta">Spectatr.ai · 2025</p>
          <h2 className="cs-next-title" style={{ fontSize: 40 }}>Designing a Scalable Content Intelligence System <span className="cs-next-arrow">→</span></h2>
          <p className="cs-next-type">Content Management System</p>
        </Link>
      </motion.section>
    </motion.div>
  )
}
