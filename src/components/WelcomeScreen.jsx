import { motion } from 'framer-motion'
import { config } from '../data'

// Animated beating heart (SVG) — glowing gradient dil jo dhadakta hai
function BeatingHeart() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 180 }}
      className="relative mt-8 flex items-center justify-center"
    >
      {/* Soft glow behind the heart */}
      <span className="absolute h-28 w-28 rounded-full bg-romance-pink/40 blur-2xl" />

      {/* Pulsing rings */}
      <motion.span
        className="absolute h-24 w-24 rounded-full border border-romance-pink/40"
        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* The heart itself — heartbeat scale animation */}
      <motion.svg
        viewBox="0 0 32 29"
        className="relative h-24 w-24 drop-shadow-[0_6px_20px_rgba(255,93,143,0.7)]"
        animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.45, 1],
        }}
      >
        <defs>
          <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8fab" />
            <stop offset="55%" stopColor="#ff5d8f" />
            <stop offset="100%" stopColor="#b14aed" />
          </linearGradient>
        </defs>
        <path
          fill="url(#heartGrad)"
          d="M16 29s-13-8.4-13-17.2C3 6.6 6.6 3 11 3c2.9 0 5 1.6 5 3.9C16 4.6 18.1 3 21 3c4.4 0 8 3.6 8 8.8C29 20.6 16 29 16 29z"
        />
      </motion.svg>
    </motion.div>
  )
}

export default function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Elegant glass card wrapping the hero content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md rounded-[2rem] border border-white/15 bg-white/5 px-8 py-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        {/* thin gradient top accent */}
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-romance-pink to-romance-purple" />

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-script text-3xl sm:text-4xl text-romance-rose"
        >
          {config.welcome.small}
        </motion.p>

        <motion.h1
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
          className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight animate-glowPulse"
        >
          {config.welcome.big}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-4 font-body text-sm sm:text-base text-white/70"
        >
          {config.welcome.sub}
        </motion.p>

        {/* Animated beating heart */}
        <BeatingHeart />

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="glow-btn mt-10 w-full rounded-full bg-gradient-to-r from-romance-pink to-romance-purple px-10 py-4 font-body text-lg font-semibold text-white"
        >
          {config.welcome.button}
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 text-xs text-white/50"
      >
        🎧 Best experienced with sound on
      </motion.p>
    </motion.div>
  )
}
