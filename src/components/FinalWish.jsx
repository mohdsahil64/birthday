import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config, assets } from '../data'
import { fireFinale, fireCelebration, playBlast } from '../lib/celebrate'
import { track } from '../lib/track'
import ReplyBox from './ReplyBox'

// Typing hook — reveals text char by char (Hinglish message)
function useTyping(text, active, speed = 42) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, active, speed])

  return { shown, done }
}

export default function FinalWish() {
  const { finalWish, cakeWish, countdown } = config
  const [count, setCount] = useState(countdown.seconds)
  const [revealed, setRevealed] = useState(false)
  const [cakeOk, setCakeOk] = useState(true)

  // Countdown 5 -> 0, then blast + reveal
  useEffect(() => {
    if (revealed) return
    if (count <= 0) {
      // Blast + big celebration on reveal
      playBlast(assets.blastSound)
      fireCelebration()
      const t = setTimeout(() => fireFinale(), 500)
      setRevealed(true)
      track('final_wish') // Saima reached the final wish 🎂
      return () => clearTimeout(t)
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, revealed])

  // Typing starts only after the cake is revealed
  const { shown, done } = useTyping(finalWish.typingMessage, revealed)

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16 text-center">
      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ---------- COUNTDOWN ---------- */
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <p className="mb-8 font-body text-lg text-white/70">
              {countdown.caption}
            </p>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={count}
                initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 2.2, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="font-display text-[9rem] sm:text-[12rem] font-bold leading-none gold-text"
              >
                {count > 0 ? count : '🎉'}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ---------- CAKE REVEAL + WISH ---------- */
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.h1
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
              className="font-display text-4xl sm:text-6xl font-bold animate-glowPulse"
            >
              {finalWish.heading}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-1 font-script text-5xl sm:text-7xl gold-text"
            >
              {config.name} ❤️
            </motion.h2>

            {/* Cake image (animated). Falls back to emoji if image missing. */}
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 140, delay: 0.5 }}
              className="my-6 w-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {cakeOk ? (
                  <img
                    src={assets.cakeImage}
                    alt="Birthday cake"
                    onError={() => setCakeOk(false)}
                    className="mx-auto w-[85vw] max-w-md max-h-[70vh] rounded-3xl object-cover shadow-2xl ring-2 ring-white/15 drop-shadow-[0_15px_45px_rgba(255,93,143,0.55)]"
                  />
                ) : (
                  <div className="mx-auto flex aspect-[3/4] w-[85vw] max-w-md items-center justify-center rounded-3xl border-2 border-dashed border-white/30 bg-white/5 text-8xl">
                    🎂
                  </div>
                )}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl animate-glowPulse">
                  🕯️
                </span>
              </motion.div>
            </motion.div>

            {/* Manane / wish wala text — cake ke neeche */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="max-w-xl font-body text-base sm:text-lg leading-relaxed text-white/90"
            >
              {cakeWish}
            </motion.p>

            {/* Reply box — Saima can write back, delivered to Telegram */}
            <ReplyBox />

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="my-8 h-px w-24 bg-white/20"
            />

            {/* Shayari (typing) — readable font, italic */}
            <p
              className={`max-w-xl font-body text-lg sm:text-xl italic leading-relaxed text-white ${
                done ? '' : 'caret'
              }`}
            >
              {shown}
            </p>

            {/* Author name — appears after typing finishes */}
            {finalWish.author && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: done ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="mt-4 font-script text-2xl sm:text-3xl text-romance-gold"
              >
                {finalWish.author}
              </motion.p>
            )}

            {/* Optional shayari — sirf tab dikhega jab data.js me shayari ho */}
            {finalWish.shayari && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: done ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="mt-10 max-w-lg border-t border-white/15 pt-6"
              >
                {finalWish.shayari.lines.map((line, i) => (
                  <p
                    key={i}
                    className="font-script text-2xl sm:text-3xl text-romance-rose leading-snug"
                  >
                    {line}
                  </p>
                ))}
                <p className="mt-2 font-body text-sm italic text-white/60">
                  {finalWish.shayari.author}
                </p>
              </motion.div>
            )}

            <p className="mt-12 font-body text-xs text-white/50">
              {finalWish.footer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
