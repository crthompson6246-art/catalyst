import { useState, useEffect, useRef } from 'react'

const TAGLINE = 'SCIENCE IS EVERYWHERE AND FOR EVERYONE™'

const AMOUNTS = [
  { value: 50, label: '$50', impact: '1 Family Access Membership', sub: 'A full year of wonder for one family' },
  { value: 100, label: '$100', impact: '2 Family Memberships', sub: 'Two families discover science together' },
  { value: 250, label: '$250', impact: '5 Families + HIVE Workshop', sub: 'Hands-on STEM for an entire classroom' },
  { value: 500, label: '$500', impact: '10 Families + Program Recognition', sub: "Named in tonight's program" },
]

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    const diff = value - prev.current
    if (diff <= 0) { setDisplay(value); return }
    const steps = 20, step = diff / steps
    let current = prev.current, count = 0
    const iv = setInterval(() => {
      count++; current += step; setDisplay(Math.round(current))
      if (count >= steps) { setDisplay(value); clearInterval(iv) }
    }, 30)
    prev.current = value
    return () => clearInterval(iv)
  }, [value])

  return <span>{display.toLocaleString()}</span>
}

export default function GiveScreen() {
  const [total, setTotal] = useState(12450)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [custom, setCustom] = useState('')
  const [donated, setDonated] = useState(() => localStorage.getItem('catalystDonated') === 'true')

  useEffect(() => {
    const tick = () => {
      setTotal(t => t + Math.floor(Math.random() * 100) + 50)
      setTimeout(tick, Math.random() * 7000 + 8000)
    }
    const t = setTimeout(tick, Math.random() * 7000 + 8000)
    return () => clearTimeout(t)
  }, [])

  const memberships = Math.floor(total / 50)

  function handleDonate() {
    localStorage.setItem('catalystDonated', 'true')
    setDonated(true)
    setShowModal(false)
    window.open('https://secure.qgiv.com/for/jg4', '_blank')
  }

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 24px' }}>
        <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>MAKE AN IMPACT</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Inspire the Next<br />Generation</h1>
        <p style={{ color: '#CFCDC9', fontSize: 13, lineHeight: 1.6 }}>Every dollar you give tonight opens a door for a family who needs it most.</p>
      </div>

      {/* Tagline */}
      <div style={{ margin: '0 20px 4px' }}>
        <div style={{ background: 'rgba(237,139,0,0.08)', border: '1px solid rgba(237,139,0,0.2)', borderRadius: 8, padding: '8px 14px', textAlign: 'center', color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
          {TAGLINE}
        </div>
      </div>

      {/* Live Ticker */}
      <div style={{ margin: '12px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(237,139,0,0.14), rgba(0,178,169,0.08))',
          border: '1px solid rgba(237,139,0,0.35)', borderRadius: 16, padding: '24px 20px', textAlign: 'center'
        }}>
          <div style={{ color: '#CFCDC9', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>RAISED TONIGHT</div>
          <div style={{ color: '#ED8B00', fontSize: 52, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
            $<AnimatedCounter value={total} />
          </div>
          <div className="orange-divider" style={{ margin: '10px 0' }} />
          <div style={{ color: '#00B2A9', fontSize: 15, fontWeight: 700 }}>= {memberships.toLocaleString()} COSI Family Access Memberships</div>
          <div style={{ color: '#CFCDC9', fontSize: 12, marginTop: 4 }}>given to families in need tonight</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px 20px' }}>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ fontSize: 15 }}>
          Give Now — $50 Gives One Family a Year of Wonder
        </button>
        {donated && (
          <div style={{ textAlign: 'center', color: '#00B2A9', fontSize: 13, fontWeight: 600, marginTop: 10 }}>
            ✓ Thank you for your gift tonight
          </div>
        )}
      </div>

      {/* Programs */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>WHERE YOUR GIFT GOES</div>
        {[
          { icon: '🔬', name: 'HIVE', desc: "Hands-on innovation programs bringing STEM to underserved communities across Central Ohio. Every session sparks a belief: 'science is for me.'" },
          { icon: '🎓', name: 'Platform Graduates', desc: "Young leaders who completed COSI's workforce development programs are now driving innovation across Columbus — proof that investing in people changes cities." },
          { icon: '🏠', name: 'Family Access Memberships', desc: 'Giving every family, regardless of income, the chance to discover that science belongs to them. No family should miss out because of a price tag.' },
        ].map(p => (
          <div key={p.name} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
              <div>
                <div style={{ color: '#ED8B00', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: '#CFCDC9', fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recap Video */}
      <div style={{ margin: '8px 20px 40px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#ED8B00', marginBottom: 10 }}>CATALYST 2025 RECAP</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', position: 'relative', paddingTop: '56.25%' }}>
          <video
            src="https://cosi.org/MOBILEAPP/catalyst/img/2026/Catalyst2025EventRecapSlideshow.mp4"
            controls
            playsInline
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: 24 }}>
            <div style={{ color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>INSPIRE TOMORROW</div>
            <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Choose Your Impact</h2>
            <p style={{ color: '#CFCDC9', fontSize: 13, marginBottom: 18 }}>A general donation to inspire the next generation of leaders.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {AMOUNTS.map(a => (
                <button key={a.value} onClick={() => { setSelected(a.value); setCustom('') }} style={{
                  padding: '14px 10px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: `2px solid ${selected === a.value ? '#ED8B00' : 'rgba(255,255,255,0.12)'}`,
                  background: selected === a.value ? 'rgba(237,139,0,0.12)' : 'rgba(255,255,255,0.04)', transition: 'all 0.2s'
                }}>
                  <div style={{ color: '#ED8B00', fontWeight: 800, fontSize: 18 }}>{a.label}</div>
                  <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{a.impact}</div>
                  <div style={{ color: '#CFCDC9', fontSize: 11, marginTop: 2, lineHeight: 1.3 }}>{a.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ color: '#CFCDC9', fontSize: 12, marginBottom: 6 }}>Or enter a custom amount:</div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#ED8B00', fontWeight: 700 }}>$</span>
                <input type="number" value={custom} onChange={e => { setCustom(e.target.value); setSelected(null) }}
                  placeholder="0"
                  style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: `1px solid ${custom ? '#ED8B00' : 'rgba(255,255,255,0.15)'}`, color: '#fff', fontSize: 16, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <button className="btn-primary" onClick={handleDonate} disabled={!selected && !custom} style={{ opacity: (!selected && !custom) ? 0.5 : 1, marginBottom: 10 }}>
              Donate {selected ? `$${selected}` : custom ? `$${custom}` : ''}
            </button>
            <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ fontSize: 14 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
