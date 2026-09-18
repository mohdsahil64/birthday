import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { config, assets } from './data'
import { track } from './lib/track'
import GiftScreen from './components/GiftScreen'
import WelcomeScreen from './components/WelcomeScreen'
import CelebrationScreen from './components/CelebrationScreen'
import FinalWish from './components/FinalWish'

export default function App() {
  const [screen, setScreen] = useState(0)
  const audioRef = useRef(null)

  const next = () => setScreen((s) => s + 1)

  const startMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false // kabhi mute na rahe
    audio.volume = 1 // FULL volume, kam nahi
    audio.loop = true
    const p = audio.play()
    if (p && p.catch) p.catch(() => {})
  }

  // Safety net: agar autoplay/first-play block ho jaye, to website me
  // kisi bhi tap/click/scroll pe music FULL volume se chala do.
  useEffect(() => {
    const ensurePlaying = () => {
      const audio = audioRef.current
      if (!audio) return
      audio.muted = false
      audio.volume = 1
      if (audio.paused) {
        const p = audio.play()
        if (p && p.catch) p.catch(() => {})
      }
    }
    const events = ['pointerdown', 'touchstart', 'click', 'keydown']
    events.forEach((e) => document.addEventListener(e, ensurePlaying))
    return () =>
      events.forEach((e) => document.removeEventListener(e, ensurePlaying))
  }, [])

  // Gift box khulne pe — music start (first user gesture) + notify + next
  const openGift = () => {
    track('opened')
    startMusic()
    next()
  }

  const renderScreen = () => {
    if (screen === 0) return <GiftScreen onOpened={openGift} />
    if (screen === 1) return <WelcomeScreen onNext={next} />
    if (screen === 2) return <CelebrationScreen onNext={next} />
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
