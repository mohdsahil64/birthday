import { motion } from 'framer-motion'
import { config } from '../data'

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
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-script text-3xl sm:text-4xl text-romance-rose"
      >
        {config.welcome.small}
      </motion.p>

      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
        className="mt-4 max-w-2xl font-display text-3xl sm:text-5xl leading-tight animate-glowPulse"
      >
        {config.welcome.big}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-4 max-w-md font-body text-sm sm:text-base text-white/70"
      >
        {config.welcome.sub}
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        className="mt-6 text-6xl"
      >
        💝
      </motion.div>

      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        onClick={onNext}
        className="glow-btn mt-10 rounded-full bg-gradient-to-r from-romance-pink to-romance-purple px-10 py-4 font-body text-lg font-medium text-white"
      >
        {config.welcome.button}
      </motion.button>

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
