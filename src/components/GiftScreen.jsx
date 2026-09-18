import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../data'
import { fireCelebration } from '../lib/celebrate'

/* Envelope tied with a rubber band / dori.
   Tap -> dori khulti hai (straps snap away) -> flap opens -> letter lifts. */
function Envelope({ opening }) {
  return (
    <div className="relative" style={{ width: 300, height: 220 }}>
      {/* Glow burst on open */}
      <AnimatePresence>
        {opening && (
          <motion.span
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 7, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-romance-gold blur-3xl"
          />
        )}
      </AnimatePresence>

      <svg viewBox="0 0 300 220" className="h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
        <defs>
          <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d0f28" />
            <stop offset="100%" stopColor="#24081a" />
          </linearGradient>
          <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f1435" />
            <stop offset="100%" stopColor="#340d24" />
          </linearGradient>
          <linearGradient id="letter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6fb" />
            <stop offset="100%" stopColor="#ffe3ef" />
          </linearGradient>
          <linearGradient id="band" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb0c8" />
            <stop offset="50%" stopColor="#ff5d8f" />
            <stop offset="100%" stopColor="#c8356c" />
          </linearGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="150" cy="205" rx="105" ry="10" fill="#000" opacity="0.35" />

        {/* 1) envelope back body */}
        <rect x="30" y="72" width="240" height="120" rx="12" fill="url(#envBody)" />

        {/* 2) top flap — opens after band snaps */}
        <motion.path
          d="M30 84 L150 14 L270 84 L150 154 Z"
          fill="url(#envFlap)"
          stroke="#ff8fab"
          strokeOpacity="0.25"
          strokeWidth="1"
          animate={
            opening
              ? { y: -34, scaleY: -0.85, opacity: 0.85 }
              : { y: 0, scaleY: 1, opacity: 1 }
          }
          transition={{ duration: 0.5, delay: opening ? 0.35 : 0, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 84px' }}
        />

        {/* 3) letter — slides up out of the pocket */}
        <motion.g
          initial={false}
          animate={opening ? { y: -80, opacity: 1 } : { y: 25, opacity: 0 }}
          transition={{ duration: 0.7, delay: opening ? 0.7 : 0, ease: 'easeOut' }}
        >
          <rect x="55" y="74" width="190" height="120" rx="8" fill="url(#letter)" />
          <rect x="72" y="96" width="120" height="7" rx="3.5" fill="#ff9ec1" opacity="0.6" />
          <rect x="72" y="114" width="156" height="6" rx="3" fill="#e9b7cd" opacity="0.5" />
          <rect x="72" y="130" width="140" height="6" rx="3" fill="#e9b7cd" opacity="0.5" />
          <text x="150" y="172" textAnchor="middle" fontSize="28" fill="#ff5d8f">♥</text>
        </motion.g>

        {/* 4) front pocket */}
        <path d="M30 84 L150 167 L270 84 L270 192 L30 192 Z" fill="#340d24" />
        <path d="M30 84 L150 167 L270 84" fill="none" stroke="#ff8fab" strokeWidth="1" opacity="0.25" />

        {/* 5) RUBBER BAND / DORI — vertical + horizontal straps.
              Open pe ye snap hoke gayab ho jaate hain (dori khul gayi). */}
        {/* vertical strap */}
        <motion.rect
          x="140"
          y="60"
          width="20"
          height="144"
          rx="4"
          fill="url(#band)"
          animate={
            opening
              ? { x: 200, rotate: 18, opacity: 0 }
              : { x: 140, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: 'easeIn' }}
          style={{ transformOrigin: '150px 130px' }}
        />
        {/* horizontal strap */}
        <motion.rect
          x="20"
          y="120"
          width="260"
          height="20"
          rx="4"
          fill="url(#band)"
          animate={
            opening
              ? { x: -40, y: 60, rotate: -14, opacity: 0 }
              : { x: 20, y: 120, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: 'easeIn' }}
          style={{ transformOrigin: '150px 130px' }}
        />
        {/* band highlights */}
        <motion.rect
          x="144" y="60" width="5" height="144" rx="2" fill="#fff" opacity="0.25"
          animate={opening ? { opacity: 0 } : { opacity: 0.25 }}
          transition={{ duration: 0.3 }}
        />
      </svg>

      {/* Center knot — the tap target (chhota, subtle) */}
      <div className="absolute left-1/2 top-[130px] z-20 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            opening
              ? { scale: 0, opacity: 0, transition: { duration: 0.35 } }
              : { scale: [1, 1.08, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
          }
          className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb0c8,#ff5d8f_60%,#a52a58)] shadow-[0_4px_12px_rgba(255,93,143,0.6)] ring-2 ring-white/20"
        />
      </div>
    </div>
  )
}

export default function GiftScreen({ onOpened }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    fireCelebration()
    setTimeout(() => onOpened(), 1700)
  }

  return (
    <motion.div
      key="gift"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Text block */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1, y: opening ? -20 : 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 flex flex-col items-center"
      >
        <motion.h1
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight animate-glowPulse"
        >
          {config.gift.caption}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 font-script text-3xl text-romance-pink"
        >
          {config.gift.hint}
        </motion.p>
      </motion.div>

      {/* Envelope — tap to untie the band */}
      <button
        onClick={handleOpen}
        aria-label="Open the envelope"
        className="relative outline-none"
      >
        <Envelope opening={opening} />
      </button>

      {/* Tap hint */}
      <AnimatePresence>
        {!opening && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="mt-14 font-body text-xs tracking-[0.3em] text-white/60"
          >
            {config.gift.tap}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
