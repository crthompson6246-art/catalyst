import { useEffect, useRef } from 'react'

function OrbitalAnimation() {
  return (
    <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 24px' }}>
      <style>{`
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(45px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(120deg) translateX(35px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(35px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(240deg) translateX(55px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(55px) rotate(-600deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>

      {/* Orbital rings */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '1px solid rgba(237,139,0,0.25)',
        top: '50%', left: '50%',
        width: 90, height: 90,
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 70, height: 70,
        borderRadius: '50%',
        border: '1px solid rgba(0,178,169,0.2)',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Center core */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 24, height: 24,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ED8B00, #ff9d00)',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 16px rgba(237,139,0,0.8)',
        animation: 'pulse-core 2s ease-in-out infinite',
      }} />

      {/* Orbiting dots */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 8, height: 8,
        borderRadius: '50%',
        background: '#ED8B00',
        marginTop: -4, marginLeft: -4,
        animation: 'orbit1 3s linear infinite',
        boxShadow: '0 0 8px rgba(237,139,0,0.6)',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 6, height: 6,
        borderRadius: '50%',
        background: '#00B2A9',
        marginTop: -3, marginLeft: -3,
        animation: 'orbit2 4s linear infinite',
        boxShadow: '0 0 6px rgba(0,178,169,0.6)',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 5, height: 5,
        borderRadius: '50%',
        background: '#FFFFFF',
        marginTop: -2.5, marginLeft: -2.5,
        animation: 'orbit3 5s linear infinite',
        opacity: 0.7,
      }} />
    </div>
  )
}

function Section({ label, title, children }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.25)',
      borderRadius: 14,
      padding: '20px',
      marginBottom: 16,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#ED8B00', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      {title && <div style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  )
}

export default function StoryScreen() {
  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #001a3a 0%, #002554 30%)' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(180deg, #001a3a 0%, #002554 100%)',
        padding: '40px 24px 32px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(237,139,0,0.2)',
      }}>
        <OrbitalAnimation />
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, color: '#CFCDC9', textTransform: 'uppercase', marginBottom: 8 }}>2026 Honoree</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: '#FFFFFF', fontVariant: 'small-caps', marginBottom: 6 }}>Jeff Edwards</div>
        <div style={{ fontSize: 14, color: '#00B2A9', fontWeight: 600, letterSpacing: 0.5 }}>John Glenn Inspiration Award</div>
      </div>

      <div style={{ padding: '24px 20px 32px' }}>

        <Section label="A Builder From Columbus" title="From Columbus, For Columbus">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            Jeff Edwards grew up believing that the right foundation changes everything. As a Columbus native, he watched his city grow — and committed his life to making sure that growth reached everyone.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            Over 30+ years, he transformed a family business into <strong style={{ color: '#FFFFFF' }}>Installed Building Products (IBP)</strong>, one of the nation's largest installation services companies, headquartered right here in Columbus.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
            But Jeff's greatest investment has never been in buildings. It's been in <em style={{ color: '#ED8B00' }}>people</em>.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="Building More Than Buildings" title="Community Leadership">
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
            Jeff's community leadership spans institutions that define Columbus:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { org: 'Columbus Partnership', desc: 'Helping drive economic growth citywide' },
              { org: 'Columbus Foundation', desc: 'Supporting nonprofits across Central Ohio' },
              { org: 'Columbus Museum of Art', desc: 'Making art accessible to all' },
              { org: 'Salvation Army', desc: 'Serving families in crisis' },
              { org: 'Huckleberry House', desc: 'Providing shelter for runaway youth' },
            ].map(item => (
              <div key={item.org} style={{
                display: 'flex',
                gap: 12,
                padding: '10px 14px',
                background: 'rgba(237,139,0,0.08)',
                borderRadius: 8,
                borderLeft: '3px solid #ED8B00',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>{item.org}</div>
                  <div style={{ fontSize: 12, color: '#CFCDC9', marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="orange-divider" />

        <Section label="A Voice for the Future" title="National Impact">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            At Harvard's Joint Center for Housing Studies, Jeff brings a builder's perspective to national conversations on affordable housing.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
            He doesn't just write checks — he testifies before Congress, advocates for policy change, and shows up wherever he can make a difference.
          </p>
        </Section>

        <div className="orange-divider" />

        {/* Pull Quote */}
        <div style={{
          padding: '28px 24px',
          margin: '8px 0 16px',
          background: 'rgba(237,139,0,0.06)',
          borderRadius: 16,
          border: '1px solid rgba(237,139,0,0.2)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, lineHeight: 0.5, color: '#ED8B00', marginBottom: 12, fontFamily: 'Georgia, serif' }}>"</div>
          <div style={{ fontSize: 18, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.6, fontWeight: 400, marginBottom: 16 }}>
            Science is everywhere. And it belongs to everyone.
          </div>
          <div style={{ fontSize: 48, lineHeight: 0.5, color: '#ED8B00', marginTop: 4, fontFamily: 'Georgia, serif', transform: 'rotate(180deg)', display: 'inline-block' }}>"</div>
        </div>

        <div className="orange-divider" />

        <Section label="Why Jeff, Why Now" title="The Spirit of CATALYST">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            COSI's John Glenn Inspiration Award celebrates individuals who embody the spirit of exploration — not just of space or science, but of <em style={{ color: '#00B2A9' }}>human potential</em>.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            Jeff Edwards has spent a lifetime asking: how do we build something better? For his family, his company, his city, and the nation.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
            That question — <em style={{ color: '#ED8B00' }}>curious, generous, restless</em> — is exactly what COSI is all about.
          </p>
        </Section>

      </div>
    </div>
  )
}
