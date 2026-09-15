// Sends a tracking "stage" event to our serverless function,
// which forwards a Telegram message. De-duplicates so each stage
// only fires once per session.

const sent = new Set()

// Sends Saima's free-text reply to Telegram. Returns true on success.
export async function sendReply(message) {
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: 'reply', message }),
    })
    const data = await res.json().catch(() => ({}))
    return !!(res.ok && data.ok)
  } catch {
    return false
  }
}

export function track(stage) {
  if (sent.has(stage)) return
  sent.add(stage)

  const payload = JSON.stringify({ stage })

  // sendBeacon is most reliable (works even while navigating away).
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      const ok = navigator.sendBeacon('/api/notify', blob)
      if (ok) return
    }
  } catch {
    /* fall through to fetch */
  }

  // Fallback: fetch with keepalive
  try {
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* give up silently — never break the user experience */
  }
}
