import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config, assets } from '../data'

// Auto slideshow — 3 (ya jitni) photos, har 2 second me loop pe slide.
// Same size/style jaisa pehle cake photo ka tha.
export default function Slideshow() {
  const images =
    config.slideshow && config.slideshow.length
      ? config.slideshow
      : [assets.cakeImage]

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 2000) // 2 second per slide
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative mx-auto w-[85vw] max-w-md">
      {/* Fixed-size box so har photo same jagah, same size me dikhe */}
      <div className="relative h-[70vh] max-h-[70vh] w-full overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/15 drop-shadow-[0_15px_45px_rgba(255,93,143,0.55)]">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-8xl">
            🎂
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`Memory ${index + 1}`}
              onError={() => setFailed(true)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        )}
      </div>

      {/* Chhote dots — kaunsi slide chal rahi hai */}
      {images.length > 1 && !failed && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-romance-pink' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Candle glow upar */}
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl animate-glowPulse">
        🕯️
      </span>
    </div>
  )
}
