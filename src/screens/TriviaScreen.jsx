import { useState, useEffect, useRef } from 'react'

const QUESTIONS = [
  { id: 1, prompt: "In the Ocean exhibit, you don't just observe—you take control. What kind of vehicle can you pilot?", answers: ["rov", "underwater rov"] },
  { id: 2, prompt: "You don't need a time machine to meet this prehistoric celebrity at COSI—just a ticket. Which dinosaur steals the spotlight?", answers: ["t rex", "trex", "tyrannosaurus rex"] },
  { id: 3, prompt: "COSI is home to two experiences that are the largest of their kind in Ohio. What are they?", answers: ["john glenn giant screen theater and cosi planetarium", "giant screen theater and planetarium"] },
  { id: 4, prompt: "In the Progress exhibit, you can experience life in two different eras. One is 1898—what's the other year?", answers: ["1962"] },
  { id: 5, prompt: "In one COSI exhibit, the most powerful machine on display is actually yours. Which exhibit is it?", answers: ["gadgets"] },
  { id: 6, prompt: "If you've ever wondered what keeps the world running—literally—which exhibit should you visit?", answers: ["energy explorers"] },
  { id: 7, prompt: "Which exhibit invites you to explore the human body, life, and spirit?", answers: ["life"] },
  { id: 8, prompt: "No training required: where at COSI can you climb into a capsule and test your astronaut instincts?", answers: ["space"] },
  { id: 9, prompt: "Even COSI's youngest visitors get to take the wheel—what emergency vehicle can kids drive in Little Kidspace®?", answers: ["ambulance"] },
  { id: 10, prompt: "Looking for science on a larger-than-life scale—literally? Which COSI experience delivers that outdoors?", answers: ["big science park"] },
]

const TIE_BREAKERS = [
  { id: 1, type: 'closest', prompt: "COSI's building spans approximately how many square feet?", answer: 320000 },
  { id: 2, type: 'exact', prompt: "When was COSI founded? (Month and Year)", answer: "march 1964" },
  { id: 3, type: 'closest', prompt: "Approximately how many guests visit COSI each year?", answer: 750000 },
]

function normalize(s) { return (s || '').toLowerCase().trim() }
function isCorrect(input, accepted) { const n = normalize(input); return accepted.some(a => n.includes(a)) }

export default function TriviaScreen() {
  const [mode, setMode] = useState('active') // active | locked | tiebreaker
  const [playerName, setPlayerName] = useState('')
  const [nameSubmitted, setNameSubmitted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [leaderboard, setLeaderboard] = useState([])
  const [tbAnswers, setTbAnswers] = useState({})
  const [tbSubmitted, setTbSubmitted] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [tbQuestion, setTbQuestion] = useState(0)
  const startTime = useRef(null)

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('catalystTrivia')
    if (saved) {
      const data = JSON.parse(saved)
      setSubmitted(data.submitted || false)
      setScore(data.score || 0)
      setPlayerName(data.name || '')
      if (data.name) setNameSubmitted(true)
      setAnswers(data.answers || {})
    }
    const savedLB = localStorage.getItem('catalystLeaderboard')
    if (savedLB) setLeaderboard(JSON.parse(savedLB))
    const savedMode = localStorage.getItem('catalystTriviaMode')
    if (savedMode) setMode(savedMode)
  }, [])

  // Auto-refresh leaderboard every 60s
  useEffect(() => {
    const iv = setInterval(() => {
      const savedLB = localStorage.getItem('catalystLeaderboard')
      if (savedLB) setLeaderboard(JSON.parse(savedLB))
    }, 60000)
    return () => clearInterval(iv)
  }, [])

  function handleSubmit() {
    let s = 0
    QUESTIONS.forEach(q => { if (isCorrect(answers[q.id] || '', q.answers)) s++ })
    const elapsed = startTime.current ? (Date.now() - startTime.current) / 1000 : 999
    const entry = { name: playerName, score: s, time: elapsed, submittedAt: new Date().toISOString() }
    // Add to leaderboard
    const lb = JSON.parse(localStorage.getItem('catalystLeaderboard') || '[]')
    lb.push(entry)
    lb.sort((a, b) => b.score - a.score || a.time - b.time)
    const top10 = lb.slice(0, 10)
    localStorage.setItem('catalystLeaderboard', JSON.stringify(top10))
    setLeaderboard(top10)
    // Save state
    localStorage.setItem('catalystTrivia', JSON.stringify({ submitted: true, score: s, name: playerName, answers }))
    setScore(s)
    setSubmitted(true)
  }

  function handleTbSubmit() {
    localStorage.setItem('catalystTbAnswers', JSON.stringify({ name: playerName, answers: tbAnswers }))
    setTbSubmitted(true)
  }

  // Admin controls
  function setModeAdmin(m) {
    setMode(m)
    localStorage.setItem('catalystTriviaMode', m)
  }

  function clearLeaderboard() {
    localStorage.removeItem('catalystLeaderboard')
    setLeaderboard([])
  }

  const sortedLB = [...leaderboard].sort((a, b) => b.score - a.score || a.time - b.time)

  // Not yet named
  if (!nameSubmitted) {
    return (
      <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🧠</div>
          <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>CATALYST 2026</div>
          <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>COSI Trivia Challenge</h1>
          <p style={{ color: '#CFCDC9', fontSize: 14, lineHeight: 1.6 }}>10 questions · 10 points · Fastest correct score wins</p>
        </div>
        <div style={{ padding: '24px 24px', flex: 1 }}>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ color: '#ED8B00', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>How it works</div>
            {['Answer all 10 COSI trivia questions', '1 point per correct answer', 'Fastest time wins any ties', 'You can only submit once — make it count!'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#ED8B00', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ color: '#CFCDC9', fontSize: 13 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#CFCDC9', fontSize: 13, marginBottom: 8 }}>Enter your name to begin:</div>
            <input
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && playerName.trim()) { setNameSubmitted(true); startTime.current = Date.now() } }}
              placeholder="Your name"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 16, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box' }}
            />
          </div>
          <button className="btn-primary" disabled={!playerName.trim()} style={{ opacity: playerName.trim() ? 1 : 0.5 }}
            onClick={() => { setNameSubmitted(true); startTime.current = Date.now() }}>
            Start the Trivia!
          </button>
        </div>
      </div>
    )
  }

  // Tiebreaker mode
  if (mode === 'tiebreaker') {
    const tb = TIE_BREAKERS[tbQuestion]
    return (
      <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
        <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
          <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>TIEBREAKER</div>
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>Sudden Death</h1>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {tbSubmitted ? (
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
              <div style={{ color: '#00B2A9', fontSize: 16, fontWeight: 700 }}>Tiebreaker submitted!</div>
              <div style={{ color: '#CFCDC9', fontSize: 13, marginTop: 8 }}>Good luck, {playerName}!</div>
            </div>
          ) : (
            <div>
              <div style={{ background: 'rgba(237,139,0,0.1)', border: '1px solid rgba(237,139,0,0.3)', borderRadius: 12, padding: '20px', marginBottom: 20 }}>
                <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
                  {tb.type === 'closest' ? 'CLOSEST ANSWER WINS' : 'EXACT MATCH'}
                </div>
                <div style={{ color: '#fff', fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>{tb.prompt}</div>
              </div>
              <input
                value={tbAnswers[tb.id] || ''}
                onChange={e => setTbAnswers(p => ({ ...p, [tb.id]: e.target.value }))}
                placeholder="Your answer..."
                style={{ width: '100%', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 15, fontFamily: "'Open Sans',sans-serif", marginBottom: 16, boxSizing: 'border-box' }}
              />
              <button className="btn-primary" onClick={handleTbSubmit} disabled={!tbAnswers[tb.id]?.trim()} style={{ opacity: tbAnswers[tb.id]?.trim() ? 1 : 0.5 }}>
                Submit Answer
              </button>
            </div>
          )}
          <Leaderboard data={sortedLB} currentName={playerName} />
        </div>
      </div>
    )
  }

  // Locked — show leaderboard only
  if (mode === 'locked' || submitted) {
    return (
      <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
        <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
          <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>COSI TRIVIA</div>
          {submitted && <div style={{ color: '#00B2A9', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>You scored {score}/10!</div>}
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{mode === 'locked' ? 'Submissions Closed' : 'Leaderboard'}</h2>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <Leaderboard data={sortedLB} currentName={playerName} />
          <AdminToggle adminOpen={adminOpen} setAdminOpen={setAdminOpen} pin={pin} setPin={setPin}
            adminUnlocked={adminUnlocked} setAdminUnlocked={setAdminUnlocked}
            mode={mode} setModeAdmin={setModeAdmin} clearLeaderboard={clearLeaderboard}
            tbQuestion={tbQuestion} setTbQuestion={setTbQuestion} />
        </div>
      </div>
    )
  }

  // Active — questions
  const answeredCount = Object.keys(answers).filter(k => answers[k]?.trim()).length

  return (
    <div className="screen-fade-in" style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <div style={{ background: 'linear-gradient(160deg, #001a3a, var(--navy))', padding: '40px 24px 16px' }}>
        <div style={{ color: '#ED8B00', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>COSI TRIVIA</div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Hello, {playerName}!</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${(answeredCount / 10) * 100}%`, background: '#ED8B00', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
          <span style={{ color: '#CFCDC9', fontSize: 12 }}>{answeredCount}/10</span>
        </div>
      </div>

      <div style={{ padding: '12px 20px' }}>
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: answers[q.id]?.trim() ? '#ED8B00' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: answers[q.id]?.trim() ? '#002554' : '#CFCDC9', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{idx + 1}</div>
                <div style={{ color: '#fff', fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}>{q.prompt}</div>
              </div>
              <input
                value={answers[q.id] || ''}
                onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                placeholder="Your answer..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: `1px solid ${answers[q.id]?.trim() ? 'rgba(237,139,0,0.4)' : 'rgba(255,255,255,0.12)'}`, color: '#fff', fontSize: 14, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              />
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8, marginBottom: 16 }}>
          <button className="btn-primary"
            onClick={handleSubmit}
            disabled={answeredCount < 10}
            style={{ opacity: answeredCount < 10 ? 0.5 : 1, fontSize: 15 }}>
            {answeredCount < 10 ? `Answer all questions (${10 - answeredCount} remaining)` : 'Submit My Answers!'}
          </button>
          {answeredCount < 10 && (
            <div style={{ textAlign: 'center', color: '#CFCDC9', fontSize: 12, marginTop: 8 }}>Answer all 10 to unlock submission</div>
          )}
        </div>

        <Leaderboard data={sortedLB} currentName={playerName} />
        <AdminToggle adminOpen={adminOpen} setAdminOpen={setAdminOpen} pin={pin} setPin={setPin}
          adminUnlocked={adminUnlocked} setAdminUnlocked={setAdminUnlocked}
          mode={mode} setModeAdmin={setModeAdmin} clearLeaderboard={clearLeaderboard}
          tbQuestion={tbQuestion} setTbQuestion={setTbQuestion} />
      </div>
    </div>
  )
}

function Leaderboard({ data, currentName }) {
  if (!data.length) return (
    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '20px 0' }}>
      No submissions yet — be the first!
    </div>
  )
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ color: '#ED8B00', fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>🏆 LEADERBOARD</div>
      {data.slice(0, 10).map((entry, i) => {
        const isMe = normalize(entry.name) === normalize(currentName)
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, marginBottom: 6,
            background: isMe ? 'rgba(237,139,0,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isMe ? 'rgba(237,139,0,0.4)' : 'rgba(255,255,255,0.07)'}`,
          }}>
            <div style={{ width: 24, textAlign: 'center', fontSize: 14 }}>
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
            </div>
            <div style={{ flex: 1, color: isMe ? '#ED8B00' : '#fff', fontWeight: isMe ? 700 : 400, fontSize: 14 }}>
              {entry.name} {isMe && '(you)'}
            </div>
            <div style={{ color: '#00B2A9', fontWeight: 700, fontSize: 16 }}>{entry.score}<span style={{ color: '#CFCDC9', fontSize: 11 }}>/10</span></div>
          </div>
        )
      })}
    </div>
  )
}

function AdminToggle({ adminOpen, setAdminOpen, pin, setPin, adminUnlocked, setAdminUnlocked, mode, setModeAdmin, clearLeaderboard, tbQuestion, setTbQuestion }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setAdminOpen(!adminOpen)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.15)', fontSize: 11, cursor: 'pointer' }}>
          Trivia Admin
        </button>
      </div>
      {adminOpen && (
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 20, marginTop: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
          {!adminUnlocked ? (
            <div>
              <input type="password" value={pin} onChange={e => setPin(e.target.value)}
                placeholder="PIN"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 16, fontFamily: 'monospace', marginBottom: 10, boxSizing: 'border-box' }}
              />
              <button className="btn-primary" onClick={() => { if (pin === '1234') setAdminUnlocked(true) }}>Unlock</button>
            </div>
          ) : (
            <div>
              <div style={{ color: '#ED8B00', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>TRIVIA ADMIN</div>
              <div style={{ color: '#CFCDC9', fontSize: 11, marginBottom: 8 }}>Current mode: <strong style={{ color: '#fff' }}>{mode.toUpperCase()}</strong></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <button onClick={() => setModeAdmin('active')} className={mode === 'active' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: 13 }}>✅ Open Submissions</button>
                <button onClick={() => setModeAdmin('locked')} className={mode === 'locked' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: 13 }}>🔒 Lock — Leaderboard Only</button>
                <button onClick={() => setModeAdmin('tiebreaker')} className={mode === 'tiebreaker' ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: 13 }}>⚡ Trigger Tiebreaker</button>
              </div>
              {mode === 'tiebreaker' && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#CFCDC9', fontSize: 11, marginBottom: 8 }}>Active tiebreaker question:</div>
                  {TIE_BREAKERS.map((tb, i) => (
                    <button key={i} onClick={() => setTbQuestion(i)} style={{
                      width: '100%', padding: '8px 12px', borderRadius: 8, textAlign: 'left', marginBottom: 6, cursor: 'pointer',
                      background: tbQuestion === i ? 'rgba(237,139,0,0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${tbQuestion === i ? '#ED8B00' : 'rgba(255,255,255,0.1)'}`,
                      color: '#fff', fontSize: 12, fontFamily: "'Open Sans',sans-serif", boxSizing: 'border-box'
                    }}>
                      {tb.prompt}
                    </button>
                  ))}
                </div>
              )}
              <button onClick={clearLeaderboard} style={{ background: 'none', border: '1px solid rgba(220,68,5,0.4)', color: '#DC4405', borderRadius: 8, padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: "'Open Sans',sans-serif", width: '100%' }}>
                Clear Leaderboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
