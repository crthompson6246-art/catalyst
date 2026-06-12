import { useState, useEffect } from 'react'

const DEFAULT_SCHEDULE = [
  { id: 1, time: '6:00 PM', title: 'Doors Open & Cocktail Hour', detail: 'Welcome drinks and networking in the atrium', type: 'event' },
  { id: 2, time: '6:00 PM', title: 'Passed Appetizers Begin', detail: 'Crab cakes · Caprese skewers · Bacon-wrapped dates', type: 'food' },
  { id: 3, time: '7:00 PM', title: 'Welcome Remarks', detail: 'Please find your seats — dinner service begins', type: 'event' },
  { id: 4, time: '7:15 PM', title: 'COSI Impact Video', detail: '"Science for Everyone" — stories from the field', type: 'highlight' },
  { id: 5, time: '7:30 PM', title: 'Dinner Service', detail: 'Filet Mignon or Pan-Seared Salmon · Roasted vegetables · Truffle mashed potatoes', type: 'food' },
  { id: 6, time: '8:00 PM', title: 'Presentation of the John Glenn Inspiration Award', detail: 'Honoring Jeff Edwards', type: 'highlight' },
  { id: 7, time: '8:15 PM', title: 'Fireside Chat', detail: 'Jeff Edwards in conversation with COSI CEO', type: 'event' },
  { id: 8, time: '8:45 PM', title: 'Live Giving Moment', detail: 'Help inspire the next generation of leaders', type: 'give' },
  { id: 9, time: '9:00 PM', title: 'Dessert & Reception', detail: 'Chocolate lava cake · Seasonal fruit tart · Coffee & cordials', type: 'food' },
  { id: 10, time: '9:30 PM', title: 'Event Concludes', detail: 'Safe travels — thank you for being here tonight', type: 'event' },
]

const TYPE_COLORS = {
  event: 'var(--aqua)',
  food: '#ED8B00',
  highlight: '#ED8B00',
  give: '#00B2A9',
}

const TYPE_ICONS = {
  event: '◆',
  food: '◆',
  highlight: '★',
  give: '♥',
}

function parseTime(str) {
  const [time, period] = str.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return h * 60 + m
}

export default function EveningScreen() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE)
  const [liveMessage, setLiveMessage] = useState('')
  const [adminOpen, setAdminOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [adminMsg, setAdminMsg] = useState('')
  const [activeId, setActiveId] = useState(null)

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const eventStart = parseTime('6:00 PM')
  const eventEnd = parseTime('9:30 PM')
  const eventActive = currentMinutes >= eventStart && currentMinutes <= eventEnd

  function getItemState(item, idx) {
    if (!eventActive) return 'upcoming'
    const itemMin = parseTime(item.time)
    const nextMin = idx < schedule.length - 1 ? parseTime(schedule[idx + 1].time) : eventEnd + 1
    if (currentMinutes >= nextMin) return 'past'
    if (currentMinutes >= itemMin) return 'current'
    return 'upcoming'
  }

  function pushLive(item, msg) {
    setActiveId(item.id)
    setLiveMessage(msg || `Now: ${item.title}`)
    setAdminMsg('')
  }

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #001a3a 0%, var(--navy) 100%)', padding: '40px 24px 24px' }}>
        <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>CATALYST 2026</div>
        <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Your Evening</h1>
        <p style={{ color: 'var(--gray)', fontSize: 14 }}>Run of show — live updates tonight</p>
      </div>

      {/* Live Notification Banner */}
      <div style={{ margin: '0 20px 8px', marginTop: 8 }}>
        <div style={{
          background: liveMessage ? 'rgba(0,178,169,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${liveMessage ? 'var(--aqua)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 10, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{ fontSize: 16 }}>{liveMessage ? '🔔' : '📢'}</span>
          <span style={{ color: liveMessage ? 'var(--aqua)' : 'var(--gray)', fontSize: 13, fontWeight: liveMessage ? 600 : 400 }}>
            {liveMessage || 'Live updates will appear here during the event'}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '16px 20px' }}>
        {schedule.map((item, idx) => {
          const state = activeId === item.id ? 'current' : getItemState(item, idx)
          const isPast = state === 'past'
          const isCurrent = state === 'current'
          const dotColor = isCurrent ? 'var(--orange)' : isPast ? 'rgba(255,255,255,0.2)' : TYPE_COLORS[item.type]

          return (
            <div key={item.id} style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
              {/* Timeline spine */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
                <div style={{
                  width: isCurrent ? 16 : 12, height: isCurrent ? 16 : 12,
                  borderRadius: '50%',
                  background: dotColor,
                  flexShrink: 0,
                  boxShadow: isCurrent ? `0 0 12px ${dotColor}` : 'none',
                  transition: 'all 0.3s ease',
                  marginTop: 18
                }} />
                {idx < schedule.length - 1 && (
                  <div style={{
                    width: 2, flex: 1, minHeight: 32,
                    background: isPast ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
                    marginTop: 4
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{
                flex: 1, paddingBottom: 16,
                opacity: isPast ? 0.45 : 1,
                transition: 'opacity 0.3s ease'
              }}>
                <div style={{
                  background: isCurrent ? 'rgba(237,139,0,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isCurrent ? 'rgba(237,139,0,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '12px 14px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: isCurrent ? 'var(--orange)' : 'var(--aqua)', fontSize: 12, fontWeight: 700 }}>
                      {item.time}
                    </span>
                    {isCurrent && (
                      <span style={{
                        background: 'var(--orange)', color: 'var(--navy)',
                        fontSize: 9, fontWeight: 800, letterSpacing: 1,
                        padding: '2px 8px', borderRadius: 10
                      }}>NOW</span>
                    )}
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.5 }}>{item.detail}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Admin Link */}
      <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
        <button
          onClick={() => setAdminOpen(!adminOpen)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: 12, cursor: 'pointer' }}
        >
          Event Staff
        </button>
      </div>

      {/* Admin Panel */}
      {adminOpen && (
        <div style={{ margin: '0 20px 32px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>BACKSTAGE CONTROL</div>
          {!adminUnlocked ? (
            <div>
              <div style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 10 }}>Enter PIN to unlock:</div>
              <input
                type="password" value={pin} onChange={e => setPin(e.target.value)}
                placeholder="PIN"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white', fontSize: 16, marginBottom: 10, fontFamily: 'monospace'
                }}
              />
              <button
                className="btn-primary"
                onClick={() => { if (pin === '1234') setAdminUnlocked(true) }}
              >Unlock</button>
            </div>
          ) : (
            <div>
              <div style={{ color: 'var(--gray)', fontSize: 12, marginBottom: 12 }}>Tap an item to mark it live and push a notification:</div>
              {schedule.map(item => (
                <div key={item.id} style={{ marginBottom: 10 }}>
                  <button
                    onClick={() => pushLive(item, adminMsg || undefined)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 8, textAlign: 'left',
                      background: activeId === item.id ? 'rgba(237,139,0,0.2)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${activeId === item.id ? 'var(--orange)' : 'rgba(255,255,255,0.1)'}`,
                      color: 'white', cursor: 'pointer', fontSize: 13, fontFamily: "'Open Sans', sans-serif"
                    }}
                  >
                    <span style={{ color: 'var(--aqua)', marginRight: 8 }}>{item.time}</span>{item.title}
                  </button>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div style={{ color: 'var(--gray)', fontSize: 12, marginBottom: 6 }}>Custom notification message (optional):</div>
                <input
                  value={adminMsg} onChange={e => setAdminMsg(e.target.value)}
                  placeholder="e.g. Please find your seats..."
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: 14, fontFamily: "'Open Sans', sans-serif"
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
