import { useEffect, useRef, useState } from 'react'
import { assets } from '../data'

// Auto slideshow — full width, sab photos SAME size, har 2 second me
// loop pe slide. Pure CSS opacity crossfade (framer-motion nahi, taaki
// nested AnimatePresence se koi conflict na ho).
export default function Slideshow() {
  const images =
    assets.slideshow && assets.slideshow.length
      ? assets.slideshow
      : [assets.cakeImage]

  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % images.length
      setIndex(indexRef.current)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="relative h-[60vh] w-full overflow-hidden bg-black/40 shadow-2xl">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Memory ${i + 1}`}
            style={{
              opacity: i === index ? 1 : 0,
              transition: 'opacity 800ms ease-in-out',
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-romance-bg/60 via-transparent to-transparent" />
      </div>

      {/* Dots */}
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
