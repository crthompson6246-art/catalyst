import { useState } from 'react'

const SCHEDULE = [
  { id: 1, time: '5:00 PM', title: 'Arrive & Gather', detail: 'Welcome drinks & networking in Gallery 1', theme: 'Gather', type: 'social' },
  { id: 2, time: '5:35 PM', title: 'Welcome', detail: 'Kerry Charles, NBC 4', theme: 'Program', type: 'speaker' },
  { id: 3, time: '5:40 PM', title: 'Erica Conroy', detail: 'COSI Board President', theme: 'Program', type: 'speaker' },
  { id: 4, time: '5:45 PM', title: 'John Glenn Video', detail: 'John Glenn biographical video — his legacy and the Award', theme: 'Program', type: 'video' },
  { id: 5, time: '5:50 PM', title: 'Dr. Frederic Bertley', detail: 'COSI CEO & President', theme: 'Program', type: 'speaker' },
  { id: 6, time: '5:55 PM', title: 'Jade Perron', detail: 'Valedictorian, The Platform Class of 2026', theme: 'Program', type: 'highlight' },
  { id: 7, time: '6:00 PM', title: 'Tribute Video', detail: 'Video tribute honoring Jeff Edwards', theme: 'Program', type: 'video' },
  { id: 8, time: '6:05 PM', title: 'Award Presentation & Fireside Chat', detail: 'John Glenn Inspiration Award presentation followed by a conversation with Jeff Edwards', theme: 'Program', type: 'highlight' },
  { id: 9, time: '6:15 PM', title: 'Closing', detail: '', theme: 'Program', type: 'speaker' },
  { id: 10, time: '6:20 PM', title: 'Reception — Atrium', detail: 'Program concludes · Guests move to the Atrium', theme: 'Reception', type: 'social' },
]

const TYPE_DOT = {
  social: '#00B2A9',
  video: '#ED8B00',
  speaker: '#CFCDC9',
  highlight: '#ED8B00',
}

const TYPE_ICON = {
  social: '🥂',
  video: '🎬',
  speaker: '🎤',
  highlight: '⭐',
}

function parseMinutes(t) {
  const [time, period] = t.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (period === 'PM' && h !== 12) h += 12
  return h * 60 + m
}

export default function EveningScreen() {
  const [liveMessage, setLiveMessage] = useState('')
  const [activeId, setActiveId] = useState(null)
  const [adminOpen, setAdminOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [customMsg, setCustomMsg] = useState('')

  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  const eventStart = parseMinutes('5:00 PM')
  const eventEnd = parseMinutes('6:17 PM')
  const isEventTime = cur >= eventStart && cur <= eventEnd + 60

  function getState(item, idx) {
    if (activeId === item.id) return 'current'
    if (!isEventTime) return 'upcoming'
    const itemMin = parseMinutes(item.time)
    const nextMin = idx < SCHEDULE.length - 1 ? parseMinutes(SCHEDULE[idx + 1].time) : eventEnd + 1
    if (cur >= nextMin) return 'past'
    if (cur >= itemMin) return 'current'
    return 'upcoming'
  }

  function pushActive(item) {
    setActiveId(item.id)
    setLiveMessage(customMsg || `Now: ${item.title}`)
    setCustomMsg('')
  }

  let lastTheme = ''

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 20px' }}>
        <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>CATALYST 2026</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Your Evening</h1>
        <p style={{ color: '#CFCDC9', fontSize: 13 }}>Monday, June 22 · 5:00 – 8:00 PM · Gallery 1 → Atrium</p>
      </div>

      {/* Live notification banner */}
      <div style={{ margin: '0 20px 8px' }}>
        <div style={{
          background: liveMessage ? 'rgba(0,178,169,0.12)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${liveMessage ? '#00B2A9' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{ fontSize: 16 }}>{liveMessage ? '🔔' : '📢'}</span>
          <span style={{ color: liveMessage ? '#00B2A9' : '#CFCDC9', fontSize: 13, fontWeight: liveMessage ? 600 : 400 }}>
            {liveMessage || 'Live updates from the event team will appear here'}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '12px 20px' }}>
        {SCHEDULE.map((item, idx) => {
          const state = getState(item, idx)
          const isPast = state === 'past'
          const isCurrent = state === 'current'
          const showTheme = item.theme !== lastTheme
          lastTheme = item.theme
          const dot = isCurrent ? '#ED8B00' : isPast ? 'rgba(255,255,255,0.15)' : TYPE_DOT[item.type]

          return (
            <div key={item.id}>
              {showTheme && (
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(237,139,0,0.6)', marginTop: 8, marginBottom: 4, paddingLeft: 36 }}>
                  {item.theme.toUpperCase()}
                </div>
              )}
              <div style={{ display: 'flex', gap: 14, marginBottom: 4 }}>
                {/* Spine */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
                  <div style={{
                    width: isCurrent ? 16 : 12, height: isCurrent ? 16 : 12,
                    borderRadius: '50%', background: dot, marginTop: 16, flexShrink: 0,
                    boxShadow: isCurrent ? `0 0 12px ${dot}` : 'none',
                    transition: 'all 0.3s'
                  }} />
                  {idx < SCHEDULE.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 28, background: isPast ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)', marginTop: 4 }} />
                  )}
                </div>
                {/* Card */}
                <div style={{ flex: 1, paddingBottom: 10, opacity: isPast ? 0.4 : 1, transition: 'opacity 0.3s' }}>
                  <div style={{
                    background: isCurrent ? 'rgba(237,139,0,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isCurrent ? 'rgba(237,139,0,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 10, padding: '10px 12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11 }}>{TYPE_ICON[item.type]}</span>
                        <span style={{ color: isCurrent ? '#ED8B00' : '#00B2A9', fontSize: 12, fontWeight: 700 }}>{item.time}</span>
                      </div>
                      {isCurrent && (
                        <span style={{ background: '#ED8B00', color: '#002554', fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: '2px 7px', borderRadius: 10 }}>NOW</span>
                      )}
                    </div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ color: '#CFCDC9', fontSize: 12, lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Admin link */}
      <div style={{ textAlign: 'center', padding: '4px 0 20px' }}>
        <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.18)', fontSize: 11, cursor: 'pointer' }}>
          Event Staff
        </button>
      </div>

      {/* Admin Panel */}
      {adminOpen && (
        <div style={{ margin: '0 20px 40px', background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#ED8B00', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>BACKSTAGE CONTROL</div>
          {!adminUnlocked ? (
            <div>
              <input type="password" value={pin} onChange={e => setPin(e.target.value)}
                placeholder="Enter PIN"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 16, marginBottom: 10, fontFamily: 'monospace', boxSizing: 'border-box' }}
              />
              <button className="btn-primary" onClick={() => { if (pin === '1234') setAdminUnlocked(true) }}>Unlock</button>
            </div>
          ) : (
            <div>
              <div style={{ color: '#CFCDC9', fontSize: 12, marginBottom: 10 }}>Tap to mark live and push notification:</div>
              {SCHEDULE.map(item => (
                <button key={item.id} onClick={() => pushActive(item)} style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8, textAlign: 'left', marginBottom: 8,
                  background: activeId === item.id ? 'rgba(237,139,0,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeId === item.id ? '#ED8B00' : 'rgba(255,255,255,0.1)'}`,
                  color: '#fff', cursor: 'pointer', fontSize: 13, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box'
                }}>
                  <span style={{ color: '#00B2A9', marginRight: 8 }}>{item.time}</span>{item.title}
                </button>
              ))}
              <div style={{ marginTop: 12 }}>
                <div style={{ color: '#CFCDC9', fontSize: 11, marginBottom: 6 }}>Custom message (optional):</div>
                <input value={customMsg} onChange={e => setCustomMsg(e.target.value)}
                  placeholder="e.g. Please move to the Atrium..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box' }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
