import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TAGLINE = 'SCIENCE IS EVERYWHERE AND FOR EVERYONE™'

const LINKEDIN_TEXT = `Proud to celebrate Jeffrey W. Edwards, recipient of the 2026 John Glenn Inspiration Award at COSI's CATALYST gala. Jeff's lifelong commitment to building community — from Columbus to Capitol Hill — is an inspiration to us all. ${TAGLINE} #CATALYST2026 #COSI #JohnGlennInspiration`

const FACEBOOK_TEXT = `Tonight I had the privilege of celebrating Jeff Edwards at COSI's CATALYST 2026 gala — recipient of the John Glenn Inspiration Award. His story reminds us that science belongs to everyone, and the work COSI does every day proves it. #CATALYST2026`

function ImgWithFallback({ src, alt, fallback, style }) {
  const [err, setErr] = useState(false)
  if (err) return fallback || null
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />
}

const EVENT_PHOTOS = [
  { src: '/catalyst/images/photo-1.jpg', alt: 'CATALYST 2025 — Youth attendees' },
  { src: '/catalyst/images/photo-2.jpg', alt: 'CATALYST 2025 — Platform graduates' },
  { src: '/catalyst/images/photo-3.jpg', alt: 'CATALYST 2025 — Award presentation' },
  { src: '/catalyst/images/photo-4.jpg', alt: 'CATALYST 2025 — Stage moment' },
  { src: '/catalyst/images/photo-5.jpg', alt: 'CATALYST 2025 — Attendees' },
  { src: '/catalyst/images/photo-6.jpg', alt: 'CATALYST 2025 — Community leaders' },
  { src: '/catalyst/images/photo-7.jpg', alt: 'CATALYST 2025 — Reception' },
  { src: '/catalyst/images/photo-8.jpg', alt: 'CATALYST 2025 — Guests' },
]

function PhotoGrid() {
  return (
    <div>
      <div style={{ color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>FROM CATALYST 2025</div>
      <div style={{ fontSize: 11, color: '#CFCDC9', marginBottom: 12 }}>Tonight's photos will appear here after the event.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {EVENT_PHOTOS.map((p, i) => (
          <div key={i} style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
            <ImgWithFallback
              src={p.src} alt={p.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              fallback={
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 20 }}>📷</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, textAlign: 'center', lineHeight: 1.4, padding: '0 6px' }}>Photo coming soon</span>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FollowUpScreen() {
  const [donated, setDonated] = useState(() => localStorage.getItem('catalystDonated') === 'true')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  function handleCopy() {
    navigator.clipboard.writeText(LINKEDIN_TEXT).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function shareLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://cosi.org&summary=${encodeURIComponent(LINKEDIN_TEXT)}`, '_blank')
  }

  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://cosi.org&quote=${encodeURIComponent(FACEBOOK_TEXT)}`, '_blank')
  }

  function markDonated() {
    localStorage.setItem('catalystDonated', 'true')
    setDonated(true)
  }

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>{donated ? '✨' : '🌟'}</div>
        <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>CATALYST 2026</div>
        <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>
          {donated ? 'Thank You for\nBeing Here Tonight' : "The Evening\nIsn't Over Yet"}
        </h1>
        <p style={{ color: '#CFCDC9', fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: '0 auto' }}>
          {donated
            ? "You made tonight possible. Now help us spread Jeff's story and COSI's mission."
            : 'Every gift tonight gives a family the chance to discover that science belongs to them.'}
        </p>
      </div>

      {donated ? (
        <div style={{ padding: '16px 20px' }}>
          {/* Jeff Card */}
          <div className="card" style={{ borderColor: 'rgba(237,139,0,0.3)', textAlign: 'center', padding: '20px', marginBottom: 16 }}>
            <ImgWithFallback
              src="/catalyst/images/jeff-edwards.jpg"
              alt="Jeffrey W. Edwards"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '3px solid #ED8B00', margin: '0 auto 12px', display: 'block' }}
              fallback={
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#ED8B00,#ff9d00)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 28, fontWeight: 800, color: '#002554' }}>JE</div>
              }
            />
            <div style={{ color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>2026 HONOREE</div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Jeffrey W. Edwards</div>
            <div style={{ color: '#00B2A9', fontSize: 12 }}>John Glenn Inspiration Award</div>
          </div>

          {/* Share text */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#CFCDC9', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>SHARE JEFF'S STORY</div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 1.7, margin: '0 0 10px' }}>{LINKEDIN_TEXT}</p>
              <button onClick={handleCopy} style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                color: copied ? '#00B2A9' : '#CFCDC9', borderRadius: 6,
                padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: "'Open Sans',sans-serif", transition: 'color 0.2s'
              }}>
                {copied ? '✓ Copied!' : 'Copy text'}
              </button>
            </div>
          </div>

          <button className="btn-primary" onClick={shareLinkedIn} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 14 }}>in</span> Share on LinkedIn
          </button>
          <button className="btn-secondary" onClick={shareFacebook} style={{ marginBottom: 24 }}>Share on Facebook</button>

          <PhotoGrid />

          <div style={{ textAlign: 'center', padding: '16px 0', color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>
            {TAGLINE}
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px 20px' }}>
          <div className="card" style={{ borderColor: 'rgba(237,139,0,0.25)', textAlign: 'center', padding: 24, marginBottom: 16 }}>
            <div style={{ color: '#ED8B00', fontSize: 38, fontWeight: 800, marginBottom: 4 }}>$50</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Gives One Family a Full Year</div>
            <div style={{ color: '#CFCDC9', fontSize: 13, lineHeight: 1.6 }}>A COSI Family Access Membership means unlimited visits, HIVE workshops, and the belief that science belongs to them.</div>
          </div>
          <button className="btn-primary" onClick={() => navigate('/give')} style={{ marginBottom: 14 }}>Give Now</button>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <button onClick={markDonated} style={{ background: 'none', border: 'none', color: '#00B2A9', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
              Already gave tonight? Tap here
            </button>
          </div>
          <PhotoGrid />
        </div>
      )}
    </div>
  )
}
