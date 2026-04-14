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

// ── VideoPlayer ──────────────────────────────────────────────────────────────

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
          <img src="/highlights-hero.webp" alt="Spectatr media collection dashboard" className="cs-hero-img" />
        </motion.div>
        <div className="cs-meta">
          <div className="cs-meta-col">
            <p className="cs-meta-label">My Role</p>
            <p className="cs-meta-value">Team: 1 PM, 2 backend engineers, 2 front-end engineers, 1 data engineer, 2 designers (including me). I owned research, information architecture, interaction design, and dev handoff. I did not own the AI clip-tagging model — that was an engineering decision I designed around.</p>
          </div>
          <div className="cs-meta-col">
            <p className="cs-meta-label">Duration</p>
            <p className="cs-meta-value">4 months</p>
          </div>
        </div>
      </motion.section>

      {/* 2 — Overview */}
      <motion.section className="cs-section" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Overview</p>
        <div className="cs-body-block">
          <p>Spectatr.AI needed a media management system that could keep pace with live sport. The product was built for broadcast teams managing high-volume, real-time football content — editors working across multiple concurrent matches, expected to produce, compile, and publish highlights before the post-match conversation moved on.</p>
          <p>The problem wasn't capability. Existing tools could handle the content. They couldn't handle the speed. Every step — finding a clip, compiling it, distributing it — required leaving the current tool and switching to another. The brief was to collapse that into a single, continuous workflow.</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <img src="/highlights-pulse.png" alt="Spectatr Pulse dashboard" className="cs-hero-img" />
          <p className="cs-mock-caption">Pulse dashboard — the entry point to live matches, active compilations, and scheduled publications in one view.</p>
        </div>
      </motion.section>

      {/* 3 — Research */}
      <motion.section className="cs-section" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>Research</p>
        <h2 className="cs-heading">What we observed before building anything</h2>
        <p className="cs-body-single">We embedded with editorial teams during live events — observing how they moved between tools, where they paused, and what they gave up on entirely. The goal was to find where the workflow broke, not where users said it broke.</p>

        <div className="cs-takeaway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 40 }}>
          {[
            { n: '01', heading: 'Context switching was the biggest time sink', body: 'Editors used 3–5 separate tools per match. Every switch cost 30–90 seconds and broke focus. The cumulative delay per event was 25+ minutes.' },
            { n: '02', heading: 'Clips had no match context', body: 'Files were timestamped by upload time, not match event. Finding "the Mbappe goal" meant scrubbing manually — there was no way to navigate by what happened.' },
            { n: '03', heading: 'Distribution was done last, not inline', body: 'Publishing was a separate step after compilation — a task editors deferred until everything else was done. By then, the moment had often passed.' },
          ].map(f => (
            <div key={f.n} className="cs-takeaway-card">
              <p className="cs-takeaway-title" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: TEAL, marginBottom: 8 }}>{f.n}</p>
              <p className="cs-takeaway-title">{f.heading}</p>
              <p className="cs-takeaway-body">{f.body}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4 — Core Insight */}
      <motion.section className="cs-section" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>The core insight</p>
        <h2 className="cs-heading">Align clips to the match, not just the clock.</h2>
        <p className="cs-body-single">Clips anchored to match events — goals, red cards, key plays — carry context automatically. An editor looking for the 49th minute goal doesn't need to remember the timestamp. They navigate to the event. The timeline became the spine of the entire system: the way content was organised, searched, and compiled.</p>
        <div className="cs-workspace-stack">
          <div>
            <img src="/highlights-clips.png" alt="Spectatr playlist clips view" className="cs-hero-img" />
            <p className="cs-workspace-caption">Live match: clips arriving in real time, automatically aligned to match events as they happen.</p>
          </div>
          <div>
            <img src="/highlights-timeline.webp" alt="Spectatr live match timeline with aligned clips" className="cs-hero-img" />
            <p className="cs-workspace-caption">Event-anchored timeline: each clip maps to a specific moment — goal, substitution, card — not just a timestamp.</p>
          </div>
        </div>
      </motion.section>

      {/* 5 — Compilation */}
      <motion.section className="cs-section" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Compilation</p>
        <h2 className="cs-heading">Clips as inputs, not outputs.</h2>
        <p className="cs-body-single">The moment editors could combine clips into compilations inside the same tool — without exporting, without switching — the workflow collapsed from three steps to one. A match montage that previously took 45 minutes of tool-switching became a 4-minute operation in a single screen. The key design decision was treating the compilation modal not as a settings panel but as an editing surface: the clip strip, the preview, and the publish controls all in the same view.</p>
        <img src="/highlights-compiler.webp" alt="Spectatr manage compilations modal" className="cs-hero-img" />
        <p className="cs-mock-caption">Compilation modal: clip selection, preview, metadata, and export settings in one surface — no context switch required.</p>
      </motion.section>

      {/* 6 — Workspace */}
      <motion.section className="cs-section" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Workspace</p>
        <h2 className="cs-heading">One workspace. Live clips, full context, instant control.</h2>
        <p className="cs-body-single">The core interface unified clip browsing, event-anchored timeline scrubbing, and metadata in a single view. The constraint was: nothing should require the editor to leave this screen to produce a highlight. Searching, reviewing, and starting a compilation all happen in the same place. The workspace is where the time reduction was actually earned.</p>
        <VideoPlayer src="/highlights-workspace.mov" />
        <p className="cs-mock-caption">Workspace: browse by event, review clips in context, and begin compilation without leaving the screen.</p>
      </motion.section>

      {/* 7 — Distribution */}
      <motion.section className="cs-section" custom={7} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Distribution</p>
        <h2 className="cs-heading">Publishing becomes part of creation.</h2>
        <p className="cs-body-single">Before this system, distribution was a separate step — something editors did after compilation was finished, using a different tool. We moved it inline. The moment a compilation was ready, a single action triggered multi-platform publishing without switching context. The 50-second-to-2-second reduction in publish time came from this decision, not from a faster server.</p>
        <VideoPlayer src="/highlights-publishing.mov" />
        <p className="cs-mock-caption">Inline distribution: YouTube, Instagram, and other platforms configured and published without leaving the workspace.</p>
      </motion.section>

      {/* 8 — Clip Management */}
      <motion.section className="cs-section" custom={8} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label">Clip Management</p>
        <h2 className="cs-heading">Find the right clip, fast.</h2>
        <p className="cs-body-single">With 7,654 clips per match session, the filter layer had to work as fast as a mental search. Editors navigate by event type, player, rating, and half — narrowing thousands of clips to a handful in seconds. The distribution log surfaces status across all platforms at a glance: published, scheduled, and draft — without opening a separate reporting tool.</p>
        <div className="cs-two-col" style={{ marginTop: 40 }}>
          <div>
            <FilterClipsMockup />
            <p className="cs-mock-caption">Filter panel: 7,654 clips narrowed by event, player, rating, and half — without leaving the workspace.</p>
          </div>
          <div>
            <DistributionLogMockup />
            <p className="cs-mock-caption">Distribution log: published, scheduled, and draft states visible at a glance across all platforms.</p>
          </div>
        </div>
      </motion.section>

      {/* 9 — Dashboard */}
      <motion.section className="cs-section" custom={9} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: TEAL }}>Dashboard</p>
        <h2 className="cs-heading">Status, not recency.</h2>
        <p className="cs-body-single">The dashboard existed before this project. It was a list of recent files. The problem wasn't that editors couldn't access content — it was that they couldn't understand its status at a glance: what was live, what was in progress, what was ready to publish. We rebuilt the entry point around status, not recency.</p>

        <div style={{ marginTop: 48, marginBottom: 40 }}>
          <VideoPlayer src="/highlights-disparate.mov" />
          <p className="cs-mock-caption">Before: editors navigated fragmented systems with no unified view of what was live, in progress, or ready to publish.</p>
        </div>

        <p className="cs-body-single">The constraint was that editors managed content across 3+ concurrent live matches. The interface had to surface urgency — a clip from a live match in the 89th minute ranks differently than a clip from yesterday's training session — without requiring the editor to manually sort or tag priority. Status became the primary organisational axis.</p>
      </motion.section>

      {/* 10 — System Flow */}
      <motion.section className="cs-section" custom={10} initial="hidden" animate="visible" variants={sectionVariants}>
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

      {/* 11 — Outcome */}
      <motion.section className="cs-section" custom={11} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-section-label" style={{ color: AMBER }}>Outcome</p>
        <h2 className="cs-heading">What the numbers actually measure</h2>
        <p className="cs-body-single">The metrics below were measured by observing the same editorial teams before and after launch during live events. The reductions didn't come from faster hardware or better AI — they came from removing the steps between finding a clip and publishing it.</p>

        <div style={{ marginTop: 40 }}>
          <div className="cs-metric-cards">
            {[
              { stat: '30min → 2min', desc: 'Time from final whistle to first published highlight — measured against pre-launch baseline with the same editorial teams.' },
              { stat: '50sec → 2sec', desc: 'Distribution time per platform once a compilation was ready — result of inline publishing replacing a separate tool.' },
              { stat: '99%',          desc: 'AI clip accuracy across a sample of 500 tagged events, validated by independent editorial review.' },
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
          <p className="cs-body-single">The playlist builder's "compile automatically" toggle was buried in a modal that most editors opened once during setup and never revisited. In testing, teams were still manually triggering compilation after it had already been set to auto — they didn't know it was running. The toggle needed to be a persistent status indicator in the workspace header, not a one-time checkbox in a settings panel.</p>
        </div>
      </motion.section>

      {/* 12 — Closing */}
      <motion.section className="cs-section cs-closing" custom={12} initial="hidden" animate="visible" variants={sectionVariants}>
        <p className="cs-closing-quote">
          "The 30-minute baseline wasn't a design failure — it was the product before design. Every decision in this system was about removing one more handoff, one more tool switch, one more moment where an editor had to stop thinking about the story and start managing the workflow."
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

      <Contact />
    </motion.div>
  )
}
