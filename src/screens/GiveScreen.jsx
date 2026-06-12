import { useState, useEffect, useRef } from 'react'

const AMOUNTS = [
  { value: 50, label: '$50', impact: '1 Family Access Membership', sub: 'A full year of wonder for one family' },
  { value: 100, label: '$100', impact: '2 Family Memberships', sub: 'Two families discover science together' },
  { value: 250, label: '$250', impact: '5 Families + HIVE Workshop', sub: 'Hands-on STEM for an entire classroom' },
  { value: 500, label: '$500', impact: '10 Families + Program Recognition', sub: 'Named in tonight\'s program forever' },
]

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    const diff = value - prev.current
    if (diff <= 0) { setDisplay(value); return }
    const steps = 20
    const step = diff / steps
    let current = prev.current
    let count = 0
    const interval = setInterval(() => {
      count++
      current += step
      setDisplay(Math.round(current))
      if (count >= steps) { setDisplay(value); clearInterval(interval) }
    }, 30)
    prev.current = value
    return () => clearInterval(interval)
  }, [value])

  return (
    <span>{display.toLocaleString()}</span>
  )
}

export default function GiveScreen() {
  const [total, setTotal] = useState(12450)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [custom, setCustom] = useState('')
  const [donated, setDonated] = useState(() => localStorage.getItem('catalystDonated') === 'true')

  useEffect(() => {
    const interval = setInterval(() => {
      const bump = Math.floor(Math.random() * 100) + 50
      setTotal(t => t + bump)
    }, (Math.random() * 7000) + 8000)
    return () => clearInterval(interval)
  }, [])

  const memberships = Math.floor(total / 50)

  function handleDonate() {
    localStorage.setItem('catalystDonated', 'true')
    setDonated(true)
    setShowModal(false)
    // In production: open GiveButter URL
    window.open('https://givebutter.com', '_blank')
  }

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #001a3a 0%, var(--navy) 100%)', padding: '40px 24px 28px' }}>
        <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>MAKE AN IMPACT</div>
        <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Inspire the Next<br />Generation
        </h1>
        <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6 }}>
          Every dollar you give tonight opens a door for a family who needs it most.
        </p>
      </div>

      {/* Live Giving Ticker */}
      <div style={{ margin: '0 20px', marginTop: -1 }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(237,139,0,0.15) 0%, rgba(0,178,169,0.1) 100%)',
          border: '1px solid rgba(237,139,0,0.35)',
          borderRadius: 16, padding: '24px 20px', textAlign: 'center'
        }}>
          <div style={{ color: 'var(--gray)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>RAISED TONIGHT</div>
          <div style={{ color: 'var(--orange)', fontSize: 48, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
            $<AnimatedCounter value={total} />
          </div>
          <div className="orange-divider" style={{ margin: '12px 0' }} />
          <div style={{ color: 'var(--aqua)', fontSize: 15, fontWeight: 700 }}>
            = {memberships.toLocaleString()} COSI Family Access Memberships
          </div>
          <div style={{ color: 'var(--gray)', fontSize: 12, marginTop: 6 }}>
            given to families in need tonight
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ padding: '20px 20px 0' }}>
        <button
          className="btn-primary"
          onClick={() => setShowModal(true)}
          style={{ fontSize: 15 }}
        >
          Give Now — $50 Gives One Family a Year of Wonder
        </button>
        {donated && (
          <div style={{
            textAlign: 'center', color: 'var(--aqua)', fontSize: 13, fontWeight: 600,
            marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            ✓ Thank you for your gift tonight
          </div>
        )}
      </div>

      {/* COSI Programs */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
          WHERE YOUR GIFT GOES
        </div>

        {[
          {
            name: 'HIVE',
            desc: 'Hands-on innovation programs bringing STEM to underserved communities across Central Ohio. Every session sparks a new belief: "science is for me."',
            icon: '🔬'
          },
          {
            name: 'Platform Graduates',
            desc: 'Young leaders who completed COSI\'s workforce development programs and are now driving innovation across Columbus — proof that investing in people changes cities.',
            icon: '🎓'
          },
          {
            name: 'Family Access Memberships',
            desc: 'Giving every family, regardless of income, the chance to discover that science belongs to them. No family should miss out because of a price tag.',
            icon: '🏠'
          },
        ].map(prog => (
          <div key={prog.name} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{prog.icon}</span>
              <div>
                <div style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{prog.name}</div>
                <div style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.6 }}>{prog.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Placeholder */}
      <div style={{ margin: '0 20px 40px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '32px 20px', textAlign: 'center'
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(237,139,0,0.15)', border: '2px solid var(--orange)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: 22
          }}>▶</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Impact Stories</div>
          <div style={{ color: 'var(--gray)', fontSize: 13 }}>Video will play during dinner service tonight</div>
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: 24 }}>
            <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
              INSPIRE TOMORROW
            </div>
            <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Choose Your Impact</h2>
            <p style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 20 }}>
              A general donation to inspire the next generation of leaders.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {AMOUNTS.map(a => (
                <button
                  key={a.value}
                  onClick={() => { setSelected(a.value); setCustom('') }}
                  style={{
                    padding: '14px 10px', borderRadius: 10, border: `2px solid ${selected === a.value ? 'var(--orange)' : 'rgba(255,255,255,0.12)'}`,
                    background: selected === a.value ? 'rgba(237,139,0,0.12)' : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
                  }}
                >
                  <div style={{ color: 'var(--orange)', fontWeight: 800, fontSize: 18 }}>{a.label}</div>
                  <div style={{ color: 'white', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{a.impact}</div>
                  <div style={{ color: 'var(--gray)', fontSize: 11, marginTop: 2, lineHeight: 1.3 }}>{a.sub}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ color: 'var(--gray)', fontSize: 12, marginBottom: 6 }}>Or enter a custom amount:</div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--orange)', fontWeight: 700 }}>$</span>
                <input
                  type="number" value={custom}
                  onChange={e => { setCustom(e.target.value); setSelected(null) }}
                  placeholder="0"
                  style={{
                    width: '100%', padding: '12px 14px 12px 28px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    border: `1px solid ${custom ? 'var(--orange)' : 'rgba(255,255,255,0.15)'}`,
                    color: 'white', fontSize: 16, fontFamily: "'Open Sans', sans-serif"
                  }}
                />
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleDonate}
              disabled={!selected && !custom}
              style={{ opacity: (!selected && !custom) ? 0.5 : 1, marginBottom: 10 }}
            >
              Donate {selected ? `$${selected}` : custom ? `$${custom}` : ''}
            </button>
            <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ fontSize: 14 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
