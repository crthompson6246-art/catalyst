import { useState } from 'react'

const TAGLINE = 'SCIENCE IS EVERYWHERE AND FOR EVERYONE™'

function ImgWithFallback({ src, alt, fallback, style }) {
  const [err, setErr] = useState(false)
  if (err) return fallback || null
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#ED8B00', marginBottom: 8 }}>{label}</div>
      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.07)' }}>
        {children}
      </div>
    </div>
  )
}

export default function StoryScreen() {
  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #001a3a 0%, #002554 40%)' }}>

      {/* Jeff Edwards Photo — TOP */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', background: '#001a3a' }}>
        <ImgWithFallback
          src="/catalyst/images/jeff edwards.jpg"
          alt="Jeffrey W. Edwards"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          fallback={
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #001a3a, #002554)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #ED8B00, #ff9d00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 800, color: '#002554' }}>JE</div>
            </div>
          }
        />
        {/* Gradient overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(transparent, #001a3a)' }} />
        {/* Name overlay */}
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#ED8B00', marginBottom: 4 }}>2026 HONOREE</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Jeffrey W. Edwards</div>
        </div>
      </div>

      {/* Title & Award */}
      <div style={{ textAlign: 'center', padding: '16px 24px 8px' }}>
        <div style={{ color: '#00B2A9', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>John Glenn Inspiration Award — 2026</div>
        <div style={{ color: '#CFCDC9', fontSize: 12, lineHeight: 1.6 }}>
          President, CEO & Chairman · Installed Building Products<br />
          President & CEO · Edwards Companies
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(237,139,0,0.4), transparent)', margin: '14px 40px 0' }} />
      </div>

      {/* Story Sections */}
      <div style={{ padding: '16px 20px' }}>

        <Section label="A BUILDER FROM COLUMBUS">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            Jeff Edwards grew up believing that the right foundation changes everything. Over 30+ years, he transformed a family business into <strong style={{ color: '#fff' }}>Installed Building Products (IBP)</strong>, one of America's leading construction companies — not by luck, but by understanding that great structures require both precision and purpose.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="BUILDING MORE THAN BUILDINGS">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            Jeff never stopped at the balance sheet. He joined <strong style={{ color: '#fff' }}>The Columbus Partnership</strong>, shaping the city's economic future. He guided grants through <strong style={{ color: '#fff' }}>The Columbus Foundation</strong>. He served the arts through the <strong style={{ color: '#fff' }}>Columbus Museum of Art</strong>. He fought for at-risk youth through the <strong style={{ color: '#fff' }}>Salvation Army</strong> and <strong style={{ color: '#fff' }}>Huckleberry House</strong>.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="A VOICE FOR THE FUTURE">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            At <strong style={{ color: '#fff' }}>Harvard's Joint Center for Housing Studies</strong>, Jeff bridges the gap between the construction industry and national housing policy — advocating for affordable, energy-efficient homes that give every family a foundation worth standing on.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="WHY JEFF. WHY NOW.">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            The John Glenn Inspiration Award honors those who embody the belief that one person's vision can lift an entire community. Jeff Edwards has spent his career proving that science, industry, and humanity belong together. Tonight, COSI celebrates a man who has done exactly that.
          </p>
        </Section>

        {/* Pull Quote */}
        <div style={{
          background: '#002554', borderLeft: '4px solid #ED8B00',
          borderRadius: '0 12px 12px 0', padding: '20px 20px 20px 24px',
          margin: '24px 0', boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: 28, color: '#ED8B00', lineHeight: 1, marginBottom: 8 }}>"</div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#fff', fontStyle: 'italic', margin: 0, marginBottom: 10 }}>
            Science is everywhere. And it belongs to everyone.
          </p>
          <div style={{ fontSize: 11, color: '#00B2A9', fontWeight: 700, letterSpacing: 1 }}>— COSI</div>
        </div>

        {/* John Glenn Inspiration Award Logo */}
        <div style={{ textAlign: 'center', margin: '24px 0 16px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#CFCDC9', letterSpacing: 2, marginBottom: 12 }}>PRESENTED BY</div>
          <ImgWithFallback
            src="/catalyst/images/john-glenn-award-logo.png"
            alt="COSI's John Glenn Inspiration Award"
            style={{ width: 140, height: 140, objectFit: 'contain' }}
            fallback={
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
                  COSI's<br /><span style={{ color: '#ED8B00', fontSize: 18 }}>John Glenn</span><br />Inspiration Award
                </div>
              </div>
            }
          />
        </div>

        {/* John Glenn B&W Photo — BOTTOM */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
          <ImgWithFallback
            src="/catalyst/images/john-glenn.jpg"
            alt="Major John H. Glenn, USMC — Project Bullet"
            style={{ width: '100%', height: 280, objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)' }}
            fallback={
              <div style={{ height: 200, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                <div style={{ textAlign: 'center', color: '#CFCDC9' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
                  <div style={{ fontSize: 13 }}>Major John H. Glenn, USMC</div>
                </div>
              </div>
            }
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '24px 16px 14px' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Major John H. Glenn, USMC</div>
            <div style={{ color: '#CFCDC9', fontSize: 11, marginTop: 2 }}>Project Bullet · First American to orbit Earth · Ohio's Eternal Hero</div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', padding: '8px 0 24px', color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>
          {TAGLINE}
        </div>

      </div>
    </div>
  )
}
