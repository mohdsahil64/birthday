import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { config, assets } from './data'
import { track } from './lib/track'
import WelcomeScreen from './components/WelcomeScreen'
import CelebrationScreen from './components/CelebrationScreen'
import FinalWish from './components/FinalWish'

// Screen order:
// 0 = welcome
// 1 = celebration (blast + confetti)
// 2 = final wish (countdown + cake)
export default function App() {
  const [screen, setScreen] = useState(0)
  const audioRef = useRef(null)

  const next = () => setScreen((s) => s + 1)

  // Called by the "Open Your Surprise" button on the welcome screen.
  // NOTE: notification sirf yahan (button click) pe jaata hai — page
  // load / reload pe kabhi nahi.
  const startFromWelcome = () => {
    track('opened')
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.45
      audio.loop = true
      audio.play().catch(() => {})
    }
    next()
  }

  const renderScreen = () => {
    if (screen === 0) return <WelcomeScreen onNext={startFromWelcome} />
    if (screen === 1) return <CelebrationScreen onNext={next} />
    return <FinalWish />
  }

  return (
    <main className="romance-bg relative min-h-[100dvh] w-full overflow-hidden">
      {/* Romantic background — visible on every page */}
      <div className="romance-glows" aria-hidden="true">
        <span className="glow glow-1" />
        <span className="glow glow-2" />
        <span className="glow glow-3" />
        <div className="romance-stars" />
        <div className="romance-vignette" />
      </div>

      {/* Persistent audio element — never unmounts, so music keeps playing */}
      <audio ref={audioRef} src={assets.music} preload="auto" />

      <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
    </main>
  )
}
