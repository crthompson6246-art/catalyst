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
        padding: '48px 24px 36px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(237,139,0,0.2)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, color: '#CFCDC9', textTransform: 'uppercase', marginBottom: 12 }}>2026 Honoree</div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 6, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: 10 }}>JEFF EDWARDS</div>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #ED8B00, transparent)', margin: '0 40px 16px' }} />
        <div style={{ fontSize: 14, color: '#00B2A9', fontWeight: 600, letterSpacing: 0.5 }}>2026 John Glenn Inspiration Award</div>
      </div>

      <div style={{ padding: '24px 20px 32px' }}>

        <Section label="A Builder From Columbus">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            Jeff Edwards grew up believing that the right foundation changes everything. Over 30+ years, he transformed a family business into <strong style={{ color: '#FFFFFF' }}>Installed Building Products (IBP)</strong>, one of America's leading construction companies — not by luck, but by understanding that great structures require both precision and purpose.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="Building More Than Buildings">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
            Jeff never stopped at the balance sheet. He joined <strong style={{ color: '#FFFFFF' }}>The Columbus Partnership</strong>, shaping the city's economic future. He guided grants through <strong style={{ color: '#FFFFFF' }}>The Columbus Foundation</strong>. He served the arts through the <strong style={{ color: '#FFFFFF' }}>Columbus Museum of Art</strong>. He fought for at-risk youth through the <strong style={{ color: '#FFFFFF' }}>Salvation Army</strong> and <strong style={{ color: '#FFFFFF' }}>Huckleberry House</strong>.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="A Voice for the Future">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            At <strong style={{ color: '#FFFFFF' }}>Harvard's Joint Center for Housing Studies</strong>, Jeff bridges the gap between the construction industry and national housing policy — advocating for affordable, energy-efficient homes that give every family a foundation worth standing on.
          </p>
        </Section>

        <div className="orange-divider" />

        <Section label="Why Jeff, Why Now">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            The John Glenn Inspiration Award honors those who embody the belief that one person's vision can lift an entire community. Jeff Edwards has spent his career proving that science, industry, and humanity belong together.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
            That's why COSI honors him tonight.
          </p>
        </Section>

        <div className="orange-divider" />

        {/* Pull Quote */}
        <div style={{
          padding: '28px 24px',
          margin: '8px 0 16px',
          background: '#002554',
          borderRadius: 16,
          border: '1px solid rgba(237,139,0,0.2)',
          borderLeft: '4px solid #ED8B00',
        }}>
          <div style={{ fontSize: 48, lineHeight: 0.5, color: '#ED8B00', marginBottom: 16, fontFamily: 'Georgia, serif' }}>"</div>
          <div style={{ fontSize: 20, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.6, fontWeight: 400, marginBottom: 16 }}>
            Science is everywhere. And it belongs to everyone.
          </div>
          <div style={{ fontSize: 13, color: '#CFCDC9', fontWeight: 600 }}>— Jeff Edwards</div>
        </div>

      </div>
    </div>
  )
}
