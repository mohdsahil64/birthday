import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { config, assets } from '../data'
import { fireCelebration, playBlast } from '../lib/celebrate'

export default function CelebrationScreen({ onNext }) {
  // Fire the blast + confetti as soon as this screen appears
  useEffect(() => {
    playBlast(assets.blastSound)
    fireCelebration()
    const t = setTimeout(() => fireCelebration(), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      key="celebration"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Party emoji with soft glow behind */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, delay: 0.1 }}
        className="relative"
      >
        <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-romance-gold/25 blur-2xl" />
        <span className="relative block text-6xl sm:text-7xl">🎉</span>
      </motion.div>

      {/* Big birthday title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-[90vw] font-script text-[2.75rem] leading-[1.1] sm:text-7xl font-bold gold-text"
      >
        {config.celebration.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 max-w-sm font-body text-sm leading-relaxed text-white/80 sm:text-lg"
      >
        {config.celebration.subtitle}
      </motion.p>

      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="glow-btn mt-11 rounded-full bg-gradient-to-r from-romance-gold to-romance-pink px-10 py-4 font-body text-lg font-semibold text-[#2b0a3d]"
      >
        {config.celebration.button}
      </motion.button>
    </motion.div>
  )
}
