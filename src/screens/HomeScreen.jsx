import { useState } from 'react'

function TicketModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ background: '#001a3a', padding: 0, overflow: 'hidden' }}>
        {/* Orange top stripe */}
        <div style={{ background: 'linear-gradient(135deg, #ED8B00 0%, #ff9d00 100%)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#002554', textTransform: 'uppercase' }}>COSI Gala</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#002554', letterSpacing: 2 }}>CATALYST 2026</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(0,37,84,0.2)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#002554', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>×</button>
        </div>

        {/* Dashed divider */}
        <div style={{ borderTop: '2px dashed rgba(255,255,255,0.15)', margin: '0 24px' }} />

        <div style={{ padding: '20px 24px' }}>
          {/* ADMIT ONE */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: '#CFCDC9', textTransform: 'uppercase' }}>✦ ADMIT ONE ✦</div>
          </div>

          {/* Attendee */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#CFCDC9', marginBottom: 4 }}>ATTENDEE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF' }}>Guest</div>
          </div>

          {/* Dashed divider */}
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', margin: '16px 0' }} />

          {/* Event Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', textTransform: 'uppercase', marginBottom: 4 }}>DATE</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Saturday, TBD</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', textTransform: 'uppercase', marginBottom: 4 }}>TIME</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>6:00 – 9:30 PM</div>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', textTransform: 'uppercase', marginBottom: 4 }}>VENUE</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>COSI Columbus</div>
              <div style={{ fontSize: 12, color: '#CFCDC9' }}>333 W Broad St, Columbus, OH</div>
            </div>
          </div>

          {/* Dashed divider */}
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', margin: '16px 0' }} />

          {/* QR Code placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 100,
              height: 100,
              background: `repeating-conic-gradient(#FFFFFF 0% 25%, #002554 0% 50%) 0 0 / 10px 10px`,
              borderRadius: 4,
              border: '3px solid #FFFFFF',
              boxShadow: '0 0 0 2px #001a3a',
            }} />
            <div style={{ fontSize: 10, color: '#CFCDC9', letterSpacing: 2, textTransform: 'uppercase' }}>Scan at Check-In</div>
          </div>

          {/* Dashed divider */}
          <div style={{ borderTop: '2px dashed rgba(255,255,255,0.15)', margin: '16px 0' }} />

          {/* COSI footer */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 6, color: '#ED8B00' }}>COSI</div>
            <div style={{ fontSize: 10, color: '#CFCDC9', letterSpacing: 1 }}>Science is everywhere. And it belongs to everyone.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomeScreen() {
  const [showTicket, setShowTicket] = useState(false)

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #001a3a 0%, #002554 40%, #002554 100%)', padding: '0 24px 32px' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', paddingTop: 56 }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 6, color: '#ED8B00', marginBottom: 8 }}>COSI</div>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #ED8B00, transparent)', margin: '0 40px 24px' }} />
        <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: 8, color: '#FFFFFF', lineHeight: 1, marginBottom: 8 }}>CATALYST</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#ED8B00', letterSpacing: 4, marginBottom: 16 }}>2026</div>
        <div style={{ fontSize: 15, fontWeight: 400, color: '#00B2A9', letterSpacing: 0.5, marginBottom: 40 }}>The John Glenn Inspiration Award Gala</div>
      </div>

      {/* Star decorative element */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
        <div style={{ color: '#ED8B00', fontSize: 12 }}>✦ ✦ ✦</div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
      </div>

      {/* Event Details Card */}
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: '4px solid #ED8B00',
        overflow: 'hidden',
        marginBottom: 32,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <div style={{ background: 'rgba(237,139,0,0.1)', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#ED8B00', textTransform: 'uppercase' }}>Event Details</div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <DetailRow icon="📅" label="Date" value="Saturday, TBD" />
            <DetailRow icon="🕕" label="Time" value="6:00 PM – 9:30 PM" />
            <DetailRow icon="📍" label="Location" value="COSI, 333 W Broad St" subValue="Columbus, OH 43215" />
            <DetailRow icon="🚗" label="Parking" value="Complimentary valet available" />
          </div>
        </div>
      </div>

      {/* View Ticket Button */}
      <button
        className="btn-primary"
        onClick={() => setShowTicket(true)}
        style={{ fontSize: 17, letterSpacing: 0.5, boxShadow: '0 4px 24px rgba(237,139,0,0.35)' }}
      >
        View My Ticket
      </button>

      {/* Tagline */}
      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, fontStyle: 'italic' }}>
        Science is everywhere. And it belongs to everyone.
      </div>

      {showTicket && <TicketModal onClose={() => setShowTicket(false)} />}
    </div>
  )
}

function DetailRow({ icon, label, value, subValue }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 20, fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#CFCDC9', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{value}</div>
        {subValue && <div style={{ fontSize: 13, color: '#CFCDC9' }}>{subValue}</div>}
      </div>
    </div>
  )
}
