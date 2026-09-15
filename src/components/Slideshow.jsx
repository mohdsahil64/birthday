import { useEffect, useState } from 'react'
import { config, assets } from '../data'

// Auto slideshow — full width (left-right chipki), sab photos SAME size,
// har 2 second me loop pe slide. Reliable crossfade (opacity) use kiya hai.
export default function Slideshow() {
  const images =
    config.slideshow && config.slideshow.length
      ? config.slideshow
      : [assets.cakeImage]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 2000) // 2 second per slide
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {/* Fixed-height box so har photo bilkul SAME size me dikhe */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-black/30 shadow-2xl">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Memory ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Halka gradient neeche taaki dots + text saaf dikhe */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-romance-bg/60 via-transparent to-transparent" />
      </div>

      {/* Dots — kaunsi slide chal rahi hai */}
      {images.length > 1 && (
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
    </div>
  )
}
