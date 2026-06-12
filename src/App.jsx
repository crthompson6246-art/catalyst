import { HashRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import StoryScreen from './screens/StoryScreen.jsx'
import EveningScreen from './screens/EveningScreen.jsx'
import GiveScreen from './screens/GiveScreen.jsx'
import FollowUpScreen from './screens/FollowUpScreen.jsx'
import TriviaScreen from './screens/TriviaScreen.jsx'

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <div className="screen">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/story" element={<StoryScreen />} />
            <Route path="/evening" element={<EveningScreen />} />
            <Route path="/give" element={<GiveScreen />} />
            <Route path="/followup" element={<FollowUpScreen />} />
            <Route path="/trivia" element={<TriviaScreen />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
