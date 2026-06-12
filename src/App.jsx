import { HashRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import StoryScreen from './screens/StoryScreen.jsx'
import EveningScreen from './screens/EveningScreen.jsx'
import GiveScreen from './screens/GiveScreen.jsx'
import FollowUpScreen from './screens/FollowUpScreen.jsx'

function App() {
  return (
    <HashRouter>
      <div className="app">
        <div className="screen-content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/story" element={<StoryScreen />} />
            <Route path="/evening" element={<EveningScreen />} />
            <Route path="/give" element={<GiveScreen />} />
            <Route path="/followup" element={<FollowUpScreen />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
