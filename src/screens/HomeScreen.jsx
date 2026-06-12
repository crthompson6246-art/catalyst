import { useState } from 'react'

const TAGLINE = 'SCIENCE IS EVERYWHERE AND FOR EVERYONE™'

function ImgWithFallback({ src, alt, fallback, style }) {
  const [err, setErr] = useState(false)
  if (err) return fallback || null
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />
}

function CatalystLogo({ size = 'large' }) {
  const isLarge = size === 'large'
  return (
    <div style={{ textAlign: 'center', marginBottom: isLarge ? 8 : 0 }}>
      <ImgWithFallback
        src="/catalyst/images/Catalyst_logo_NAVY.png"
        alt="Catalyst — COSI's Celebration of Inspiration"
        style={{ width: isLarge ? 260 : 180, maxWidth: '80%' }}
        fallback={
          <div>
            <div style={{ fontSize: isLarge ? 44 : 30, fontWeight: 800, color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1 }}>Catalyst</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', marginTop: 2 }}>COSI'S CELEBRATION OF INSPIRATION</div>
          </div>
        }
      />
    </div>
  )
}

function CosiLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
      <ImgWithFallback
        src="/catalyst/images/cosi-logo-orange.png"
        alt="COSI — Center of Science and Industry"
        style={{ height: 36 }}
        fallback={
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#ED8B00', letterSpacing: 2 }}>COSI</span>
            <span style={{ fontSize: 8, color: '#CFCDC9', letterSpacing: 1, display: 'block' }}>CENTER OF SCIENCE AND INDUSTRY</span>
          </div>
        }
      />
    </div>
  )
}

function TicketModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ background: '#001a3a', padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #ED8B00 0%, #ff9d00 100%)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#002554' }}>COSI GALA</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#002554', letterSpacing: 1 }}>CATALYST 2026</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(0,37,84,0.2)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#002554', fontSize: 18, fontWeight: 700 }}>×</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, color: '#CFCDC9' }}>✦ ADMIT ONE ✦</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#CFCDC9', marginBottom: 4 }}>ATTENDEE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Valued Guest</div>
          </div>
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', margin: '12px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'DATE', value: 'Monday, June 22' },
              { label: 'TIME', value: '5:00 – 8:00 PM' },
              { label: 'VENUE', value: 'COSI, Gallery 1', full: true },
              { label: 'ADDRESS', value: '333 W Broad St, Columbus OH', full: true },
            ].map(({ label, value, full }) => (
              <div key={label} style={full ? { gridColumn: '1/-1' } : {}}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', margin: '12px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 96, height: 96,
              background: 'repeating-conic-gradient(#fff 0% 25%, #002554 0% 50%) 0 0 / 10px 10px',
              borderRadius: 4, border: '3px solid #fff',
            }} />
            <div style={{ fontSize: 9, color: '#CFCDC9', letterSpacing: 2 }}>SCAN AT CHECK-IN</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>CAT2026-0001</div>
          </div>
          <div style={{ borderTop: '2px dashed rgba(255,255,255,0.15)', margin: '12px 0' }} />
          <div style={{ textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{TAGLINE}</div>
        </div>
      </div>
    </div>
  )
}

export default function HomeScreen() {
  const [showTicket, setShowTicket] = useState(false)

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #001a3a 0%, #002554 50%)' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative stars */}
        <div style={{ position: 'absolute', top: 20, left: 20, color: 'rgba(237,139,0,0.3)', fontSize: 10 }}>✦</div>
        <div style={{ position: 'absolute', top: 40, right: 24, color: 'rgba(237,139,0,0.2)', fontSize: 14 }}>✦</div>
        <div style={{ position: 'absolute', top: 80, left: 40, color: 'rgba(237,139,0,0.15)', fontSize: 8 }}>✦</div>

        <CosiLogo />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(237,139,0,0.4), transparent)', margin: '0 40px 20px' }} />
        <CatalystLogo size="large" />
        <div style={{ marginTop: 16, marginBottom: 12 }}>
          <span style={{
            background: 'rgba(237,139,0,0.15)', border: '1px solid rgba(237,139,0,0.4)',
            color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2,
            padding: '4px 14px', borderRadius: 20
          }}>AWARD CEREMONY & RECEPTION</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, letterSpacing: 0.5 }}>
          Monday, June 22, 2026 &nbsp;|&nbsp; 5:00 – 8:00 PM
        </div>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', padding: '0 24px 20px' }}>
        <div style={{
          background: 'rgba(237,139,0,0.08)', border: '1px solid rgba(237,139,0,0.2)',
          borderRadius: 10, padding: '10px 16px',
          color: '#ED8B00', fontSize: 12, fontWeight: 700, letterSpacing: 1.5
        }}>
          {TAGLINE}
        </div>
      </div>

      {/* Event Details Card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div className="card" style={{ borderLeft: '3px solid #ED8B00' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', marginBottom: 14 }}>EVENT DETAILS</div>
          {[
            { icon: '📅', label: 'Date', value: 'Monday, June 22, 2026' },
            { icon: '🕔', label: 'Time', value: '5:00 PM – 8:00 PM' },
            { icon: '📍', label: 'Location', value: 'COSI — Gallery 1', sub: '333 W Broad St, Columbus, OH 43215' },
            { icon: '🚗', label: 'Parking', value: 'Surface lot (west side of building)', sub: 'Valet available at main entrance' },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#CFCDC9', letterSpacing: 1, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{value}</div>
                {sub && <div style={{ fontSize: 12, color: '#CFCDC9', marginTop: 1 }}>{sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Button */}
      <div style={{ padding: '0 20px 16px' }}>
        <button className="btn-primary" onClick={() => setShowTicket(true)} style={{ fontSize: 16, boxShadow: '0 4px 24px rgba(237,139,0,0.3)' }}>
          View My Ticket
        </button>
      </div>

      {/* Honoree Teaser */}
      <div style={{ padding: '0 20px 40px' }}>
        <div className="card" style={{ borderColor: 'rgba(237,139,0,0.3)', background: 'rgba(237,139,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <ImgWithFallback
            src="/catalyst/images/jeff edwards.jpg"
            alt="Jeff Edwards"
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #ED8B00', flexShrink: 0 }}
            fallback={
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#ED8B00,#ff9d00)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#002554', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>JE</div>
            }
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#ED8B00', letterSpacing: 2, marginBottom: 3 }}>2026 HONOREE</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Jeffrey W. Edwards</div>
            <div style={{ fontSize: 12, color: '#00B2A9' }}>John Glenn Inspiration Award</div>
          </div>
          <div style={{ color: '#ED8B00', fontSize: 20 }}>→</div>
        </div>
      </div>

      {showTicket && <TicketModal onClose={() => setShowTicket(false)} />}
    </div>
  )
}
