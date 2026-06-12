import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LINKEDIN_TEXT = `Proud to celebrate Jeff Edwards, recipient of the 2026 John Glenn Inspiration Award at COSI's CATALYST gala. Jeff's lifelong commitment to building community — from Columbus to Capitol Hill — is an inspiration to us all. Science is everywhere, and it belongs to everyone. #CATALYST2026 #COSI #JohnGlennInspiration`

const FACEBOOK_TEXT = `Tonight I had the privilege of celebrating Jeff Edwards at COSI's CATALYST 2026 gala — recipient of the John Glenn Inspiration Award. His story reminds us that science belongs to everyone, and the work COSI does every day proves it. #CATALYST2026`

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
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://cosi.org&summary=${encodeURIComponent(LINKEDIN_TEXT)}`
    window.open(url, '_blank')
  }

  function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://cosi.org&quote=${encodeURIComponent(FACEBOOK_TEXT)}`
    window.open(url, '_blank')
  }

  function markDonated() {
    localStorage.setItem('catalystDonated', 'true')
    setDonated(true)
  }

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #001a3a 0%, var(--navy) 100%)', padding: '40px 24px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{donated ? '✨' : '🌟'}</div>
        <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>CATALYST 2026</div>
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          {donated ? 'Thank You for\nBeing Here' : 'The Evening\nIsn\'t Over Yet'}
        </h1>
        <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: '0 auto' }}>
          {donated
            ? 'You made tonight possible. Now help us spread the word about Jeff\'s story and COSI\'s mission.'
            : 'Every gift tonight gives a family the chance to discover that science belongs to them.'}
        </p>
      </div>

      {donated ? (
        /* Share Path */
        <div style={{ padding: '24px 20px' }}>
          {/* Jeff Card */}
          <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(237,139,0,0.3)', textAlign: 'center', padding: '24px 20px' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--orange), #ff9d00)',
              margin: '0 auto 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: 'var(--navy)', fontWeight: 800
            }}>JE</div>
            <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>2026 HONOREE</div>
            <div style={{ color: 'white', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Jeff Edwards</div>
            <div style={{ color: 'var(--aqua)', fontSize: 13 }}>John Glenn Inspiration Award</div>
          </div>

          {/* Share Text Box */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: 'var(--gray)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>
              SHARE JEFF'S STORY
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10, padding: '14px 16px', position: 'relative'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {LINKEDIN_TEXT}
              </p>
              <button
                onClick={handleCopy}
                style={{
                  marginTop: 12, background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                  color: copied ? 'var(--aqua)' : 'var(--gray)', borderRadius: 6,
                  padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif",
                  transition: 'color 0.2s'
                }}
              >
                {copied ? '✓ Copied!' : 'Copy text'}
              </button>
            </div>
          </div>

          {/* Social Buttons */}
          <button
            className="btn-primary"
            onClick={shareLinkedIn}
            style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <span style={{ fontWeight: 800 }}>in</span> Share on LinkedIn
          </button>

          <button
            className="btn-secondary"
            onClick={shareFacebook}
            style={{ marginBottom: 24 }}
          >
            Share on Facebook
          </button>

          {/* Photo Gallery Placeholder */}
          <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
            EVENT PHOTOS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4
              }}>
                <span style={{ fontSize: 20 }}>📷</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, textAlign: 'center', lineHeight: 1.3 }}>
                  Photos<br />coming<br />soon
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', color: 'var(--gray)', fontSize: 12 }}>
            Professional photos from tonight will appear here. Check back later this evening.
          </div>
        </div>
      ) : (
        /* Give Path */
        <div style={{ padding: '24px 20px' }}>
          {/* Impact Reminder */}
          <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(237,139,0,0.25)', textAlign: 'center', padding: '24px' }}>
            <div style={{ color: 'var(--orange)', fontSize: 36, fontWeight: 800, marginBottom: 4 }}>$50</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Gives One Family a Full Year</div>
            <div style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.6 }}>
              A COSI Family Access Membership means unlimited visits, HIVE workshops, and the chance to believe that science belongs to them.
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate('/give')}
            style={{ marginBottom: 16 }}
          >
            Give Now
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={markDonated}
              style={{ background: 'none', border: 'none', color: 'var(--aqua)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Already gave tonight? Tap here
            </button>
          </div>

          {/* Photo Gallery Placeholder */}
          <div style={{ marginTop: 32 }}>
            <div style={{ color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
              EVENT PHOTOS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4
                }}>
                  <span style={{ fontSize: 20 }}>📷</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, textAlign: 'center', lineHeight: 1.3 }}>
                    Photos<br />coming<br />soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
