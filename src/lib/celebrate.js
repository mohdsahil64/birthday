import confetti from 'canvas-confetti'

// Colorful firecracker / winning-style explosion from both sides + center bursts
export function fireCelebration() {
  const colors = ['#ff5d8f', '#ffd66b', '#b14aed', '#ff8fab', '#7afcff', '#fff']

  // Big center blast
  confetti({
    particleCount: 160,
    spread: 100,
    startVelocity: 55,
    origin: { y: 0.6 },
    colors,
  })

  // Side cannons (like a winning screen)
  const end = Date.now() + 1200
  ;(function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

// Continuous gentle confetti rain for the final screen
export function fireFinale() {
  const colors = ['#ff5d8f', '#ffd66b', '#b14aed', '#ff8fab', '#7afcff', '#fff']
  const duration = 2500
  const end = Date.now() + duration
  ;(function frame() {
    confetti({
      particleCount: 4,
      startVelocity: 30,
      spread: 360,
      ticks: 90,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      colors,
      scalar: 1.1,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

// Plays a blast sound. Falls back to a synthesized boom if file missing.
export function playBlast(src) {
  try {
    const audio = new Audio(src)
    audio.volume = 0.6
    audio.play().catch(() => synthBoom())
  } catch {
    synthBoom()
  }
}

// Synthesized "boom" using Web Audio API (no file needed)
function synthBoom() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    // Low boom
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5)
    gain.gain.setValueAtTime(0.9, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.6)

    // Sparkle crackle (white noise burst)
    const bufferSize = ctx.sampleRate * 0.4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.35, ctx.currentTime + 0.05)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
    noise.connect(noiseGain).connect(ctx.destination)
    noise.start(ctx.currentTime + 0.03)
  } catch {
    /* no-op */
  }
}
